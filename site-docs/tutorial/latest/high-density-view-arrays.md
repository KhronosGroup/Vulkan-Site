# High-Density View Arrays

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/OpenXR_Vulkan_Spatial_Computing/14_LightField_Theory/03_high_density_view_arrays.html

## Table of Contents

- [Ecosystem Perspective](#_ecosystem_perspective)
- [The Gigabyte Problem](#_the_gigabyte_problem)
- [The_Gigabyte_Problem](#_the_gigabyte_problem)
- [FP16 and Quantization: Bandwidth Savings](#_fp16_and_quantization_bandwidth_savings)
- [FP16_and_Quantization:_Bandwidth_Savings](#_fp16_and_quantization_bandwidth_savings)
- [Buffer Device Address (BDA): Pointer-Based Access](#_buffer_device_address_bda_pointer_based_access)
- [Buffer_Device_Address_(BDA):_Pointer-Based_Access](#_buffer_device_address_bda_pointer_based_access)
- [Advanced: Neural Compression and 4D Cache Locality](#_advanced_neural_compression_and_4d_cache_locality)
- [Advanced:_Neural_Compression_and_4D_Cache_Locality](#_advanced_neural_compression_and_4d_cache_locality)
- [Cache Locality: Spatial-Directional Tiling](#_cache_locality_spatial_directional_tiling)
- [Cache_Locality:_Spatial-Directional_Tiling](#_cache_locality_spatial_directional_tiling)

## Content

Managing a 4D lightfield requires optimizing both storage and access to handle datasets that can easily reach gigabytes in size.

This chapter falls under the category: **Beyond the OpenXR Standard**.

Standard OpenXR runtimes are focused on fixed-resolution projection layers. You use Vulkan’s Buffer Device Address (BDA) and Sparse Residency to manage the high-density view arrays required for plenoptic data, allowing for spatial detail that exceeds the standard OpenXR buffer model.

Managing a 4D lightfield poses a significant memory challenge. A modest lightfield with    entry points and    angles contains roughly 1 billion rays. At 16 bytes per ray (RGBA FP32), that is **16 GB of VRAM**—exceeding the capacity of many consumer GPUs.

The runtime work closely with the OS to "Pin" these massive buffers in VRAM, often using **Sparse Residency** (via `VK_KHR_sparse_binding`) to load only the visible tiles.

Reducing precision is the first step in optimization. Using `half4` instead of `float4` in Slang immediately halves the VRAM footprint. Adjacent rays in a lightfield are often very similar, allowing for high-quality compression without significant visual loss.

With such large datasets, the overhead of standard Vulkan Descriptor Sets can become a bottleneck. By using **Buffer Device Address**, we can pass a raw 64-bit pointer to our data directly into our shaders.

// Using BDA to get a raw pointer using designated initializers
vk::BufferDeviceAddressInfo addressInfo{
    .buffer = *lightFieldBuffer
};
uint64_t gpuAddress = device.getBufferAddress(addressInfo);

// Passing the pointer to a Slang shader via Push Constants
struct PushConstants {
    uint64_t lightFieldPtr;
    uint2 stRes;
    uint2 uvRes;
};
commandBuffer.pushConstants(*pipelineLayout, vk::ShaderStageFlagBits::eCompute, 0, pc);

Vulkan allows for memory optimizations beyond standard linear buffer models:

* 
**Neural Lightfield Compression**: Using Vulkan’s **Video Decode** and **Compression** extensions, you can implement custom compute-based decompressors. This allows you to fit significantly more spatial detail into the same VRAM footprint.

* 
**4D Tiling and Swizzling**: You can use compute shaders to implement custom swizzling (like Morton-order indexing), keeping GPU caches efficient when sampling high-density lightfield arrays.

A standard 4D array layout is terrible for GPU caches. To fix this, we implement **4D Tiling**, reorganizing data so that small spatial and directional blocks are contiguous.

// Tiled 4D indexing example in Slang
uint getTiledIndex(uint2 st, uint2 uv) {
    uint2 tileSize = uint2(8, 8);
    uint2 tileCoord = st / tileSize;
    uint2 localCoord = st % tileSize;

    // Reorganizing memory to keep spatial neighbors together
    return (tileCoord.x + tileCoord.y * stResTiles) * (tileSize.x * tileSize.y) +
           (localCoord.x + localCoord.y * tileSize.x);
}

|  | For more information on BDA and sparse resources, check out the official [Vulkan Specification on Device Addresses](https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#memory-device-address), the [Vulkan Guide](https://docs.vulkan.org/guide/latest/index.html), and our [main tutorial series](00_introduction.adoc). |
| --- | --- |

[Previous](02_4d_lightfield_representation.html) | [Next](04_incorporating_into_the_engine.html)
