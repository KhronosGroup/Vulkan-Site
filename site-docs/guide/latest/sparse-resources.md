# Sparse Resources

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/sparse_resources.html

## Table of Contents

- [Binding Sparse Memory](#_binding_sparse_memory)
- [Binding_Sparse_Memory](#_binding_sparse_memory)
- [Sparse Buffers](#_sparse_buffers)
- [Sparse Images](#_sparse_images)
- [Mip Tail Regions](#_mip_tail_regions)
- [Mip_Tail_Regions](#_mip_tail_regions)
- [Basic Sparse Resources Example](#_basic_sparse_resources_example)
- [Basic_Sparse_Resources_Example](#_basic_sparse_resources_example)
- [Advanced Sparse Resources](#_advanced_sparse_resources)
- [Advanced_Sparse_Resources](#_advanced_sparse_resources)

## Content

Vulkan [sparse resources](https://docs.vulkan.org/spec/latest/chapters/sparsemem.html) are a way to create `VkBuffer` and `VkImage` objects which can be bound non-contiguously to one or more `VkDeviceMemory` allocations. There are many aspects and features of sparse resources which the [spec](https://docs.vulkan.org/spec/latest/chapters/sparsemem.html#sparsememory-sparseresourcefeatures) does a good job explaining. As the [implementation guidelines](https://registry.khronos.org/vulkan/specs/latest/html/vkspec.html#_sparse_resource_implementation_guidelines_informative) point out, most implementations use sparse resources to expose a linear virtual address range of memory to the application while mapping each sparse block to physical pages when bound.

Unlike normal resources that call `vkBindBufferMemory()` or `vkBindImageMemory()`, sparse memory is bound via a [queue operation](https://docs.vulkan.org/spec/latest/chapters/sparsemem.html#sparsememory-resource-binding) `vkQueueBindSparse()`. The main advantage of this is that an application can rebind memory to a sparse resource throughout its lifetime.

It is important to notice that this requires some extra consideration from the application. Applications **must** use synchronization primitives to guarantee that other queues do not access ranges of memory concurrently with a binding change. Also, freeing a `VkDeviceMemory` object with `vkFreeMemory()` will **not** cause resources (or resource regions) bound to the memory object to become unbound. Applications must not access resources bound to memory that has been freed.

The following example is used to help visually showcase how a sparse `VkBuffer` looks in memory. Note, it is not required, but most implementations will use sparse block sizes of 64 KB for `VkBuffer` (actual size is returned in `VkMemoryRequirements::alignment`).

Imagine a 256 KB `VkBuffer` where there are 3 parts that an application wants to update separately.

* 
Section A - 64 KB

* 
Section B - 128 KB

* 
Section C - 64 KB

The following showcases how the application views the `VkBuffer`:

![sparse_resources_buffer.png](_images/sparse_resources_buffer.png)

Sparse images can be used to update mip levels separately which results in a [mip tail region](https://docs.vulkan.org/spec/latest/chapters/sparsemem.html#sparsememory-miptail). The spec describes the various examples that can occur with diagrams.

The following examples illustrate basic creation of sparse images and binding them to physical memory.

This basic example creates a normal `VkImage` object but uses fine-grained memory allocation to back the resource with multiple memory ranges.

VkDevice                device;
VkQueue                 queue;
VkImage                 sparseImage;
VkAllocationCallbacks*  pAllocator = NULL;
VkMemoryRequirements    memoryRequirements = {};
VkDeviceSize            offset = 0;
VkSparseMemoryBind      binds[MAX_CHUNKS] = {}; // MAX_CHUNKS is NOT part of Vulkan
uint32_t                bindCount = 0;

// ...

// Allocate image object
const VkImageCreateInfo sparseImageInfo =
{
    VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO,        // sType
    NULL,                                       // pNext
    VK_IMAGE_CREATE_SPARSE_BINDING_BIT | ...,   // flags
    ...
};
vkCreateImage(device, &sparseImageInfo, pAllocator, &sparseImage);

// Get memory requirements
vkGetImageMemoryRequirements(
    device,
    sparseImage,
    &memoryRequirements);

// Bind memory in fine-grained fashion, find available memory ranges
// from potentially multiple VkDeviceMemory pools.
// (Illustration purposes only, can be optimized for perf)
while (memoryRequirements.size && bindCount resourceOffset = offset;

    AllocateOrGetMemoryRange(
        device,
        &memoryRequirements,
        &pBind->memory,
        &pBind->memoryOffset,
        &pBind->size);

    // memory ranges must be sized as multiples of the alignment
    assert(IsMultiple(pBind->size, memoryRequirements.alignment));
    assert(IsMultiple(pBind->memoryOffset, memoryRequirements.alignment));

    memoryRequirements.size -= pBind->size;
    offset                  += pBind->size;
    bindCount++;
}

// Ensure entire image has backing
if (memoryRequirements.size)
{
    // Error condition - too many chunks
}

const VkSparseImageOpaqueMemoryBindInfo opaqueBindInfo =
{
    sparseImage,                                // image
    bindCount,                                  // bindCount
    binds                                       // pBinds
};

const VkBindSparseInfo bindSparseInfo =
{
    VK_STRUCTURE_TYPE_BIND_SPARSE_INFO,         // sType
    NULL,                                       // pNext
    ...
    1,                                          // imageOpaqueBindCount
    &opaqueBindInfo,                            // pImageOpaqueBinds
    ...
};

// vkQueueBindSparse is externally synchronized per queue object.
AcquireQueueOwnership(queue);

// Actually bind memory
vkQueueBindSparse(queue, 1, &bindSparseInfo, VK_NULL_HANDLE);

ReleaseQueueOwnership(queue);

This more advanced example creates an arrayed color attachment / texture image and binds only LOD zero and the required metadata to physical memory.

VkDevice                            device;
VkQueue                             queue;
VkImage                             sparseImage;
VkAllocationCallbacks*              pAllocator = NULL;
VkMemoryRequirements                memoryRequirements = {};
uint32_t                            sparseRequirementsCount = 0;
VkSparseImageMemoryRequirements*    pSparseReqs = NULL;
VkSparseMemoryBind                  binds[MY_IMAGE_ARRAY_SIZE] = {};
VkSparseImageMemoryBind             imageBinds[MY_IMAGE_ARRAY_SIZE] = {};
uint32_t                            bindCount = 0;

// Allocate image object (both renderable and sampleable)
const VkImageCreateInfo sparseImageInfo =
{
    VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO,        // sType
    NULL,                                       // pNext
    VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT | ..., // flags
    ...
    VK_FORMAT_R8G8B8A8_UNORM,                   // format
    ...
    MY_IMAGE_ARRAY_SIZE,                        // arrayLayers
    ...
    VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT |
    VK_IMAGE_USAGE_SAMPLED_BIT,                 // usage
    ...
};
vkCreateImage(device, &sparseImageInfo, pAllocator, &sparseImage);

// Get memory requirements
vkGetImageMemoryRequirements(
    device,
    sparseImage,
    &memoryRequirements);

// Get sparse image aspect properties
vkGetImageSparseMemoryRequirements(
    device,
    sparseImage,
    &sparseRequirementsCount,
    NULL);

pSparseReqs = (VkSparseImageMemoryRequirements*)
    malloc(sparseRequirementsCount * sizeof(VkSparseImageMemoryRequirements));

vkGetImageSparseMemoryRequirements(
    device,
    sparseImage,
    &sparseRequirementsCount,
    pSparseReqs);

// Bind LOD level 0 and any required metadata to memory
for (uint32_t i = 0; i memorySize = pSparseReqs[i].imageMipTailSize;
            bindCount++;

            // ... Allocate memory range

            pBind->resourceOffset = pSparseReqs[i].imageMipTailOffset;
            pBind->memoryOffset = /* allocated memoryOffset */;
            pBind->memory = /* allocated memory */;
            pBind->flags = VK_SPARSE_MEMORY_BIND_METADATA_BIT;

        }
        else
        {
            // Need a mip tail region per array layer.
            for (uint32_t a = 0; a memorySize = pSparseReqs[i].imageMipTailSize;
                bindCount++;

                // ... Allocate memory range

                pBind->resourceOffset = pSparseReqs[i].imageMipTailOffset +
                                        (a * pSparseReqs[i].imageMipTailStride);

                pBind->memoryOffset = /* allocated memoryOffset */;
                pBind->memory = /* allocated memory */
                pBind->flags = VK_SPARSE_MEMORY_BIND_METADATA_BIT;
            }
        }
    }
    else
    {
        // resource data
        VkExtent3D lod0BlockSize =
        {
            AlignedDivide(
                sparseImageInfo.extent.width,
                pSparseReqs[i].formatProperties.imageGranularity.width);
            AlignedDivide(
                sparseImageInfo.extent.height,
                pSparseReqs[i].formatProperties.imageGranularity.height);
            AlignedDivide(
                sparseImageInfo.extent.depth,
                pSparseReqs[i].formatProperties.imageGranularity.depth);
        }
        size_t totalBlocks =
            lod0BlockSize.width *
            lod0BlockSize.height *
            lod0BlockSize.depth;

        // Each block is the same size as the alignment requirement,
        // calculate total memory size for level 0
        VkDeviceSize lod0MemSize = totalBlocks * memoryRequirements.alignment;

        // Allocate memory for each array layer
        for (uint32_t a = 0; a subresource.aspectMask = pSparseReqs[i].formatProperties.aspectMask;
            pBind->subresource.mipLevel = 0;
            pBind->subresource.arrayLayer = a;

            pBind->offset = (VkOffset3D){0, 0, 0};
            pBind->extent = sparseImageInfo.extent;
            pBind->memoryOffset = /* allocated memoryOffset */;
            pBind->memory = /* allocated memory */;
            pBind->flags = 0;
        }
    }

    free(pSparseReqs);
}

const VkSparseImageOpaqueMemoryBindInfo opaqueBindInfo =
{
    sparseImage,                                // image
    bindCount,                                  // bindCount
    binds                                       // pBinds
};

const VkSparseImageMemoryBindInfo imageBindInfo =
{
    sparseImage,                                // image
    sparseImageInfo.arrayLayers,                // bindCount
    imageBinds                                  // pBinds
};

const VkBindSparseInfo bindSparseInfo =
{
    VK_STRUCTURE_TYPE_BIND_SPARSE_INFO,         // sType
    NULL,                                       // pNext
    ...
    1,                                          // imageOpaqueBindCount
    &opaqueBindInfo,                            // pImageOpaqueBinds
    1,                                          // imageBindCount
    &imageBindInfo,                             // pImageBinds
    ...
};

// vkQueueBindSparse is externally synchronized per queue object.
AcquireQueueOwnership(queue);

// Actually bind memory
vkQueueBindSparse(queue, 1, &bindSparseInfo, VK_NULL_HANDLE);

ReleaseQueueOwnership(queue);
