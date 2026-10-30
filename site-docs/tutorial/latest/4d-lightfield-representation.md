# 4D LightField Representation

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/14_LightField_Theory/02_4d_lightfield_representation.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The 7D Plenoptic Function: The Starting Point](#_the_7d_plenoptic_function_the_starting_point)
- [The_7D_Plenoptic_Function:_The_Starting_Point](#_the_7d_plenoptic_function_the_starting_point)
- [Mapping to Vulkan Memory](#_mapping_to_vulkan_memory)
- [Mapping_to_Vulkan_Memory](#_mapping_to_vulkan_memory)
- [Indexing the 4th Dimension](#_indexing_the_4th_dimension)
- [Indexing_the_4th_Dimension](#_indexing_the_4th_dimension)
- [Advanced: Sparse LightField Residency](#_advanced_sparse_lightfield_residency)
- [Advanced:_Sparse_LightField_Residency](#_advanced_sparse_lightfield_residency)

## Content

Representing a lightfield requires mapping a 4D light ray into a linear memory address that the GPU can process efficiently.

This chapter falls under the category: **Beyond the OpenXR Standard**.

Standard OpenXR runtimes are focused on 2D projection layers. You use Vulkan’s raw buffer management and custom shader indexing to implement high-dimensional 4D lightfields, which allows for true holographic representations that go beyond the standard spatial rendering model.

To understand lightfields, we must first look at the **Plenoptic Function** (from the Latin **plenus** meaning full). This is a 7D function    that describes every photon in the universe.

Storing 7 dimensions is impossible. For a GPU, we make three assumptions:
1.  **Static Scene**: We ignore time.
2.  **RGB Color**: We reduce wavelength to three channels.
3.  **Empty Space**: We assume light doesn’t change color in air, only needing to know where a ray enters and leaves a "Light Box."

This leaves us with **4 Dimensions**: two for the entry point (**ST plane**) and two for the entry direction (**UV plane**).

In Vulkan, we represent this 4D structure as a massive `vk::raii::Buffer`. We use designated initializers to configure this high-bandwidth storage:

// Initializing a 4D LightField buffer using designated initializers
vk::BufferCreateInfo bufferInfo{
    .size = spatialRes * directionalRes * sizeof(glm::vec4),
    .usage = vk::BufferUsageFlagBits::eStorageBuffer | vk::BufferUsageFlagBits::eShaderDeviceAddress,
    .sharingMode = vk::SharingMode::eExclusive
};
vk::raii::Buffer lightFieldBuffer(device, bufferInfo);

The runtime ensures that your "Light Box" remains perfectly stationary in physical space (the Stage Space), allowing the lightfield to maintain its directional integrity even as the user’s head moves.

In our Slang shaders, we map 4D coordinates to a linear index in this buffer:

struct LightFieldRay {
    float4 color;
};

RWStructuredBuffer lightFieldData;

// Mapping 4D coordinates to a linear index
uint getLinearIndex(uint2 st, uint2 uv, uint2 stRes, uint2 uvRes) {
    return st.x + st.y * stRes.x +
           uv.x * (stRes.x * stRes.y) +
           uv.y * (stRes.x * stRes.y * uvRes.x);
}

Vulkan allows you to manage gigabyte-scale lightfields beyond standard buffer limits:

* 
**Holographic Virtual Texturing**: Using Vulkan’s **Sparse Resident Resources**, you can keep only the currently visible rays resident in VRAM. This allows you to swap data in and out of the GPU based on the user’s predicted movement.

* 
**Real-Time Generation**: You can use Vulkan’s **Mesh Shaders** to "bake" lightfield updates in real-time for dynamic objects, ensuring moving actors and changing lighting are captured in your plenoptic representation.

|  | For more information on lightfield theory and buffer management, consult the official [Vulkan Specification](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#resources-buffers), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](01_introduction.html) | [Next](03_high_density_view_arrays.html)
