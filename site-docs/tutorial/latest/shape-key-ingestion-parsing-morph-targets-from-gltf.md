# Shape Key Ingestion: Parsing Morph Targets from glTF

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_glTF/Morph_Targets_Facial_Animation/02_shape_key_ingestion.html

## Table of Contents

- [The Sparse Accessor Problem](#_the_sparse_accessor_problem)
- [The_Sparse_Accessor_Problem](#_the_sparse_accessor_problem)
- [Reading Morph Target Names](#_reading_morph_target_names)
- [Reading_Morph_Target_Names](#_reading_morph_target_names)
- [Loading All Morph Targets for a Mesh](#_loading_all_morph_targets_for_a_mesh)
- [Loading_All_Morph_Targets_for_a_Mesh](#_loading_all_morph_targets_for_a_mesh)
- [Uploading to the GPU](#_uploading_to_the_gpu)
- [Uploading_to_the_GPU](#_uploading_to_the_gpu)
- [The Weight Animation Channel](#_the_weight_animation_channel)
- [The_Weight_Animation_Channel](#_the_weight_animation_channel)

## Content

When you export a character from Blender with 60 morph targets and open the resulting glTF file, you might notice that the displacement arrays are far smaller than you expected. A face mesh with 50,000 vertices and a "smile" morph target might produce a displacement buffer with only 800 entries, not 50,000. This is because glTF supports **sparse accessors**: a way of storing only the entries in an array that differ from a default value (in this case, the zero vector, since vertices that don’t move in a given morph target have zero displacement).

Understanding sparse accessors is essential because tinygltf does not automatically expand them for you—you receive the raw sparse data and are responsible for building the full dense array yourself. The sparse accessor structure in glTF has three components: a count (the number of elements in the conceptual array), an indices sub-accessor (a list of element indices that have non-default values), and a values sub-accessor (the corresponding non-default values, in the same order as the indices). To reconstruct the full array, you allocate a zero-initialized buffer of size `count`, then scatter the values into the positions indicated by the indices.

Let’s look at this in practice. In tinygltf, after loading a model, each mesh primitive’s `targets` array contains one entry per morph target. Each entry is a map from attribute name (e.g., `"POSITION"`, `"NORMAL"`) to accessor index. We need to walk this structure carefully:

struct MorphTargetData {
    std::string              name;            // From mesh's target names, if present
    std::vector   position_deltas; // Size = vertex count; zero where unchanged
    std::vector   normal_deltas;   // May be empty if no normal targets
    VkBuffer                 gpu_buffer     = VK_NULL_HANDLE;
    VmaAllocation            gpu_allocation = VK_NULL_HANDLE;
};

// Expand a potentially-sparse accessor into a dense vector of vec3.
// Returns a vector of 'vertex_count' elements.
static std::vector expand_sparse_accessor(
    const tinygltf::Model&    model,
    int                       accessor_index,
    uint32_t                  vertex_count)
{
    std::vector result(vertex_count, glm::vec3(0.0f));
    if (accessor_index  0
                         ? accessor.ByteStride(view)
                         : sizeof(glm::vec3);

        for (uint32_t i = 0; i (accessor.count); ++i) {
            std::memcpy(&result[i], data + i * stride, sizeof(glm::vec3));
        }
    } else {
        // Sparse accessor: first read the index list, then scatter values
        const tinygltf::AccessorSparse& sparse = accessor.sparse;

        // Read the indices (which vertices are non-zero)
        std::vector indices(sparse.count);
        {
            const tinygltf::BufferView& idx_view =
                model.bufferViews[sparse.indices.bufferView];
            const uint8_t* idx_data = model.buffers[idx_view.buffer].data.data()
                                    + idx_view.byteOffset
                                    + sparse.indices.byteOffset;

            for (int i = 0; i (idx_data)[i];
                        break;
                    case TINYGLTF_COMPONENT_TYPE_UNSIGNED_INT:
                        indices[i] = reinterpret_cast(idx_data)[i];
                        break;
                }
            }
        }

        // Read the displacement values and scatter into result
        {
            const tinygltf::BufferView& val_view =
                model.bufferViews[sparse.values.bufferView];
            const uint8_t* val_data = model.buffers[val_view.buffer].data.data()
                                    + val_view.byteOffset
                                    + sparse.values.byteOffset;

            for (int i = 0; i 

The switch statement on the index component type is important—do not assume all glTF exporters use the same index width. Blender typically uses `UNSIGNED_SHORT` for meshes with fewer than 65,536 vertices, but other exporters may use `UNSIGNED_INT` by default.

glTF allows—but does not require—morph target names to be stored in the mesh’s `extras` field as a JSON array. Blender exports them this way, under the key `"targetNames"`. These names are important: they are the strings you will use to map animation channels (which reference morph targets by index) to human-readable names for debugging, and to connect lip sync events to the correct morph target.

std::vector read_morph_target_names(const tinygltf::Mesh& mesh)
{
    std::vector names;
    if (!mesh.extras.Has("targetNames")) return names;

    const tinygltf::Value& target_names = mesh.extras.Get("targetNames");
    for (int i = 0; i (target_names.ArrayLen()); ++i) {
        names.push_back(target_names.Get(i).Get());
    }
    return names;
}

With the sparse accessor expansion and name reading in place, we can write the top-level function that loads all morph targets for a mesh primitive:

std::vector load_morph_targets(
    const tinygltf::Model&     model,
    const tinygltf::Primitive& primitive,
    const tinygltf::Mesh&      mesh,
    uint32_t                   vertex_count)
{
    std::vector targets;
    std::vector     names = read_morph_target_names(mesh);

    for (size_t t = 0; t second, vertex_count);
        } else {
            data.position_deltas.assign(vertex_count, glm::vec3(0.0f));
        }

        auto nrm_it = primitive.targets[t].find("NORMAL");
        if (nrm_it != primitive.targets[t].end()) {
            data.normal_deltas = expand_sparse_accessor(
                model, nrm_it->second, vertex_count);
        }

        targets.push_back(std::move(data));
    }

    return targets;
}

Once we have the morph target data on the CPU, we upload each target’s displacement array to a dedicated GPU buffer. Because we plan to use bindless access, we do not need to pack all targets into a single buffer—each target gets its own `VkBuffer`, and we store the buffer address (or descriptor index) for later shader use.

void upload_morph_target_to_gpu(
    VmaAllocator    allocator,
    VkDevice        device,
    VkCommandBuffer cmd,
    MorphTargetData& target)
{
    VkDeviceSize buffer_size =
        target.position_deltas.size() * sizeof(glm::vec3);

    // Create a host-visible staging buffer
    VkBuffer      staging_buf;
    VmaAllocation staging_alloc;
    create_buffer(allocator,
                  buffer_size,
                  VK_BUFFER_USAGE_TRANSFER_SRC_BIT,
                  VMA_MEMORY_USAGE_CPU_TO_GPU,
                  staging_buf, staging_alloc);

    void* mapped;
    vmaMapMemory(allocator, staging_alloc, &mapped);
    std::memcpy(mapped, target.position_deltas.data(), buffer_size);
    vmaUnmapMemory(allocator, staging_alloc);

    // Create the device-local GPU buffer
    create_buffer(allocator,
                  buffer_size,
                  VK_BUFFER_USAGE_STORAGE_BUFFER_BIT |
                  VK_BUFFER_USAGE_TRANSFER_DST_BIT   |
                  VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT,
                  VMA_MEMORY_USAGE_GPU_ONLY,
                  target.gpu_buffer, target.gpu_allocation);

    // Copy staging → GPU
    VkBufferCopy region { 0, 0, buffer_size };
    vkCmdCopyBuffer(cmd, staging_buf, target.gpu_buffer, 1, &region);

    // (Staging buffer cleanup deferred until after command submission)
}

The `VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT` flag is what allows us to use this buffer’s GPU address in the bindless approach we will build in the next section. With this flag set, we can call `vkGetBufferDeviceAddress` to retrieve a 64-bit GPU pointer that the compute shader can dereference directly, without needing a descriptor.

Morph target weights are driven by a glTF animation channel targeting the `WEIGHTS` path on a mesh node. Parsing and interpolating this channel uses the same accessor and sampler infrastructure we built for the joint rotation channels in Chapter 3—the only difference is that instead of writing a quaternion to a joint’s local rotation, we write a scalar float to a morph target weight array.

A common pattern is to maintain a per-mesh `std::vector` of morph weights, one per target, that the animation system updates each frame. This array is then uploaded to the GPU as a small uniform or push constant before each skinning dispatch:

struct MorphWeightBlock {
    float    weights[24];     // Up to 24 active morph targets
    uint32_t activeCount;     // How many entries in weights[] are valid
    uint32_t applySkinning;   // 1 = also apply skeletal skinning, 0 = morph only
    uint32_t pad[2];          // Align to 16 bytes
};

Having the weights in a simple flat array makes the compute shader straightforward: for each vertex, iterate over `active_count` morph targets, read the weight and the displacement, add the weighted displacement to the base position. We will write this shader code in the next section.

[Previous: Introduction](01_introduction.html) | [Next: Bindless Morph Buffers](03_bindless_morph_buffers.html)
