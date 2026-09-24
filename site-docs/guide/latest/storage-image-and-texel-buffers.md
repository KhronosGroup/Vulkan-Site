# Storage Image and Texel Buffers

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/storage_image_and_texel_buffers.html

## Table of Contents

- [Storage Images](#_storage_images)
- [Creating a Storage Image](#_creating_a_storage_image)
- [Creating_a_Storage_Image](#_creating_a_storage_image)
- [Using Storage Images in Shaders](#_using_storage_images_in_shaders)
- [Using_Storage_Images_in_Shaders](#_using_storage_images_in_shaders)
- [Image Formats for Storage Images](#_image_formats_for_storage_images)
- [Image_Formats_for_Storage_Images](#_image_formats_for_storage_images)
- [Synchronization with Storage Images](#_synchronization_with_storage_images)
- [Synchronization_with_Storage_Images](#_synchronization_with_storage_images)
- [Texel Buffers](#_texel_buffers)
- [Creating a Texel Buffer](#_creating_a_texel_buffer)
- [Creating_a_Texel_Buffer](#_creating_a_texel_buffer)
- [Using Uniform Texel Buffers in Shaders](#_using_uniform_texel_buffers_in_shaders)
- [Using_Uniform_Texel_Buffers_in_Shaders](#_using_uniform_texel_buffers_in_shaders)
- [Using Storage Texel Buffers in Shaders](#_using_storage_texel_buffers_in_shaders)
- [Using_Storage_Texel_Buffers_in_Shaders](#_using_storage_texel_buffers_in_shaders)
- [Using non-rgba Format for Texel Buffer](#_using_non_rgba_format_for_texel_buffer)
- [Using_non-rgba_Format_for_Texel_Buffer](#_using_non_rgba_format_for_texel_buffer)
- [Formats for Texel Buffers](#_formats_for_texel_buffers)
- [Formats_for_Texel_Buffers](#_formats_for_texel_buffers)
- [Synchronization with Texel Buffers](#_synchronization_with_texel_buffers)
- [Synchronization_with_Texel_Buffers](#_synchronization_with_texel_buffers)
- [Comparison with Other Buffer Types](#_comparison_with_other_buffer_types)
- [Comparison_with_Other_Buffer_Types](#_comparison_with_other_buffer_types)
- [Storage Image vs. Storage Buffer](#_storage_image_vs_storage_buffer)
- [Storage_Image_vs._Storage_Buffer](#_storage_image_vs_storage_buffer)
- [Texel Buffer vs. Storage Buffer](#_texel_buffer_vs_storage_buffer)
- [Texel_Buffer_vs._Storage_Buffer](#_texel_buffer_vs_storage_buffer)
- [Considerations for Tile-Based Renderers](#_considerations_for_tile_based_renderers)
- [Considerations_for_Tile-Based_Renderers](#_considerations_for_tile_based_renderers)
- [What is Tile-Based Rendering?](#_what_is_tile_based_rendering)
- [What_is_Tile-Based_Rendering?](#_what_is_tile_based_rendering)
- [Storage Images in Tile-Based Renderers](#_storage_images_in_tile_based_renderers)
- [Storage_Images_in_Tile-Based_Renderers](#_storage_images_in_tile_based_renderers)
- [Texel Buffers in Tile-Based Renderers](#_texel_buffers_in_tile_based_renderers)
- [Texel_Buffers_in_Tile-Based_Renderers](#_texel_buffers_in_tile_based_renderers)
- [Performance Optimization for Tile-Based Renderers](#_performance_optimization_for_tile_based_renderers)
- [Performance_Optimization_for_Tile-Based_Renderers](#_performance_optimization_for_tile_based_renderers)
- [Format Compatibility Requirements](#_format_compatibility_requirements)
- [Format_Compatibility_Requirements](#_format_compatibility_requirements)
- [Differences in Format Compatibility Rules](#_differences_in_format_compatibility_rules)
- [Differences_in_Format_Compatibility_Rules](#_differences_in_format_compatibility_rules)
- [SPIR-V Image Format and Vulkan Format Compatibility](#_spir_v_image_format_and_vulkan_format_compatibility)
- [SPIR-V_Image_Format_and_Vulkan_Format_Compatibility](#_spir_v_image_format_and_vulkan_format_compatibility)
- [Storage Images Format Requirements](#_storage_images_format_requirements)
- [Storage_Images_Format_Requirements](#_storage_images_format_requirements)
- [Texel Buffers Format Requirements](#_texel_buffers_format_requirements)
- [Texel_Buffers_Format_Requirements](#_texel_buffers_format_requirements)
- [Component Swizzling](#_component_swizzling)
- [Common Format Mismatch Cases](#_common_format_mismatch_cases)
- [Common_Format_Mismatch_Cases](#_common_format_mismatch_cases)
- [How to Fix Format Mismatches](#_how_to_fix_format_mismatches)
- [How_to_Fix_Format_Mismatches](#_how_to_fix_format_mismatches)
- [For Storage Images](#_for_storage_images)
- [For_Storage_Images](#_for_storage_images)
- [For Texel Buffers](#_for_texel_buffers)
- [For_Texel_Buffers](#_for_texel_buffers)
- [Important Considerations](#_important_considerations)
- [Best Practices](#_best_practices)
- [Performance Considerations](#_performance_considerations)
- [Common Pitfalls](#_common_pitfalls)
- [Example Use Cases](#_example_use_cases)
- [Example_Use_Cases](#_example_use_cases)
- [Image Processing with Storage Images](#_image_processing_with_storage_images)
- [Image_Processing_with_Storage_Images](#_image_processing_with_storage_images)
- [Particle Systems with Storage Texel Buffers](#_particle_systems_with_storage_texel_buffers)
- [Particle_Systems_with_Storage_Texel_Buffers](#_particle_systems_with_storage_texel_buffers)
- [Lookup Tables with Uniform Texel Buffers](#_lookup_tables_with_uniform_texel_buffers)
- [Lookup_Tables_with_Uniform_Texel_Buffers](#_lookup_tables_with_uniform_texel_buffers)

## Content

This chapter covers storage images and texel buffers in Vulkan, explaining their purpose, how to use them, and best practices.

A storage image is a descriptor type (`VK_DESCRIPTOR_TYPE_STORAGE_IMAGE`) that allows shaders to read from and write to an image without using a fixed-function graphics pipeline. This is particularly useful for compute shaders and advanced rendering techniques.

To create a storage image, you need to:

Create a `VkImage` with the `VK_IMAGE_USAGE_STORAGE_BIT` flag

Create a `VkImageView` for the image

Create a descriptor set layout with a binding of type `VK_DESCRIPTOR_TYPE_STORAGE_IMAGE`

Update the descriptor set with the image view

// Create the image with storage usage flag
VkImageCreateInfo imageInfo = {};
imageInfo.sType = VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO;
imageInfo.imageType = VK_IMAGE_TYPE_2D;
imageInfo.format = VK_FORMAT_R32G32B32A32_SFLOAT; // Choose a format that supports storage operations
imageInfo.extent = {width, height, 1};
imageInfo.mipLevels = 1;
imageInfo.arrayLayers = 1;
imageInfo.samples = VK_SAMPLE_COUNT_1_BIT;
imageInfo.tiling = VK_IMAGE_TILING_OPTIMAL;
imageInfo.usage = VK_IMAGE_USAGE_STORAGE_BIT | VK_IMAGE_USAGE_TRANSFER_SRC_BIT;
imageInfo.sharingMode = VK_SHARING_MODE_EXCLUSIVE;
imageInfo.initialLayout = VK_IMAGE_LAYOUT_UNDEFINED;

// Create image view
VkImageViewCreateInfo viewInfo = {};
viewInfo.sType = VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO;
viewInfo.image = storageImage;
viewInfo.viewType = VK_IMAGE_VIEW_TYPE_2D;
viewInfo.format = VK_FORMAT_R32G32B32A32_SFLOAT;
viewInfo.subresourceRange.aspectMask = VK_IMAGE_ASPECT_COLOR_BIT;
viewInfo.subresourceRange.baseMipLevel = 0;
viewInfo.subresourceRange.levelCount = 1;
viewInfo.subresourceRange.baseArrayLayer = 0;
viewInfo.subresourceRange.layerCount = 1;

In GLSL, storage images are declared using the `image` type with a format qualifier. The `imageLoad` and `imageStore` functions are used to read from and write to the image.

// VK_FORMAT_R32G32B32A32_SFLOAT
layout(set = 0, binding = 0, rgba32f) uniform image2D storageImage;

void main() {
    ivec2 texelCoord = ivec2(gl_GlobalInvocationID.xy);

    // Read from the image
    vec4 value = imageLoad(storageImage, texelCoord);

    // Modify the value
    value = value * 2.0;

    // Write back to the image
    imageStore(storageImage, texelCoord, value);
}

In Slang, storage images are declared similarly to HLSL, using the `RWTexture2D` type. The `Load` and `Store` methods are used to read from and write to the image.

// VK_FORMAT_R32G32B32A32_SFLOAT
[[vk::binding(0, 0)]]
[[vk::image_format("rgba32f")]]
RWTexture2D storageImage;

[numthreads(8, 8, 1)]
void main(uint3 dispatchThreadID : SV_DispatchThreadID)
{
    int2 texelCoord = int2(dispatchThreadID.xy);

    // Read from the image
    float4 value = storageImage.Load(texelCoord);

    // Modify the value
    value = value * 2.0;

    // Write back to the image
    storageImage[texelCoord] = value;
}

The corresponding SPIR-V assembly:

OpDecorate %storageImage DescriptorSet 0
OpDecorate %storageImage Binding 0

%rgba32f      = OpTypeImage %float 2D 0 0 0 2 Rgba32f
%ptr          = OpTypePointer UniformConstant %rgba32f
%storageImage = OpVariable %ptr UniformConstant

Not all image formats support storage operations. The `VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT` flag in `VkFormatProperties` indicates whether a format can be used for storage images.

VkFormatProperties formatProperties;
vkGetPhysicalDeviceFormatProperties(physicalDevice, format, &formatProperties);
if (!(formatProperties.optimalTilingFeatures & VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT)) {
    // Format does not support storage image operations
}

Common formats that typically support storage operations include:

* 
`VK_FORMAT_R32G32B32A32_SFLOAT`

* 
`VK_FORMAT_R32G32B32A32_UINT`

* 
`VK_FORMAT_R32G32B32A32_SINT`

* 
`VK_FORMAT_R8G8B8A8_UNORM`

* 
`VK_FORMAT_R8G8B8A8_UINT`

When using storage images, proper synchronization is crucial to avoid race conditions. Storage images typically use the `VK_IMAGE_LAYOUT_GENERAL` layout for both reading and writing.

VkImageMemoryBarrier barrier = {};
barrier.sType = VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER;
barrier.oldLayout = VK_IMAGE_LAYOUT_UNDEFINED;
barrier.newLayout = VK_IMAGE_LAYOUT_GENERAL;
barrier.srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED;
barrier.dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED;
barrier.image = storageImage;
barrier.subresourceRange.aspectMask = VK_IMAGE_ASPECT_COLOR_BIT;
barrier.subresourceRange.baseMipLevel = 0;
barrier.subresourceRange.levelCount = 1;
barrier.subresourceRange.baseArrayLayer = 0;
barrier.subresourceRange.layerCount = 1;
barrier.srcAccessMask = 0;
barrier.dstAccessMask = VK_ACCESS_SHADER_WRITE_BIT;

vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_TOP_OF_PIPE_BIT,
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT,
    0,
    0, nullptr,
    0, nullptr,
    1, &barrier
);

When transitioning between compute shader writes and reads:

barrier.srcAccessMask = VK_ACCESS_SHADER_WRITE_BIT;
barrier.dstAccessMask = VK_ACCESS_SHADER_READ_BIT;

vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT,
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT,
    0,
    0, nullptr,
    0, nullptr,
    1, &barrier
);

Texel buffers are a way to access buffer data with texture-like operations in shaders. There are two types of texel buffers:

**Uniform Texel Buffers** (`VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER`): Read-only access

**Storage Texel Buffers** (`VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER`): Read-write access

To create a texel buffer, you need to:

Create a `VkBuffer` with appropriate usage flags

Create a `VkBufferView` for the buffer

Create a descriptor set layout with a binding of the appropriate texel buffer type

Update the descriptor set with the buffer view

// Create buffer
VkBufferCreateInfo bufferInfo = {};
bufferInfo.sType = VK_STRUCTURE_TYPE_BUFFER_CREATE_INFO;
bufferInfo.size = size;
bufferInfo.usage = VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT; // or VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT
bufferInfo.sharingMode = VK_SHARING_MODE_EXCLUSIVE;

// Create buffer view
VkBufferViewCreateInfo viewInfo = {};
viewInfo.sType = VK_STRUCTURE_TYPE_BUFFER_VIEW_CREATE_INFO;
viewInfo.buffer = buffer;
viewInfo.format = VK_FORMAT_R32G32B32A32_SFLOAT; // Choose a format that supports texel buffer operations
viewInfo.offset = 0;
viewInfo.range = size;

VkBufferView bufferView;
vkCreateBufferView(device, &viewInfo, nullptr, &bufferView);

In GLSL, uniform texel buffers are declared using the `textureBuffer` type. The `texelFetch` function is used to read from the buffer.

layout(set = 0, binding = 0) uniform textureBuffer uniformTexelBuffer;

void main() {
    // Read from the texel buffer
    vec4 value = texelFetch(uniformTexelBuffer, int(gl_GlobalInvocationID.x));

    // Use the value
    // ...
}

In Slang, uniform texel buffers are declared using the `Buffer` type. The `Load` method is used to read from the buffer.

[[vk::binding(0, 0)]]
Buffer uniformTexelBuffer;

[numthreads(64, 1, 1)]
void main(uint3 dispatchThreadID : SV_DispatchThreadID)
{
    // Read from the texel buffer
    float4 value = uniformTexelBuffer.Load(dispatchThreadID.x);

    // Use the value
    // ...
}

The corresponding SPIR-V assembly:

OpDecorate %uniformTexelBuffer DescriptorSet 0
OpDecorate %uniformTexelBuffer Binding 0

%texelBuffer        = OpTypeImage %float Buffer 0 0 0 1 Unknown
%ptr                = OpTypePointer UniformConstant %texelBuffer
%uniformTexelBuffer = OpVariable %ptr UniformConstant

In GLSL, storage texel buffers are declared using the `imageBuffer` type with a format qualifier. The `imageLoad` and `imageStore` functions are used to read from and write to the buffer.

// VK_FORMAT_R32G32B32A32_SFLOAT
layout(set = 0, binding = 0, rgba32f) uniform imageBuffer storageTexelBuffer;

void main() {
    int index = int(gl_GlobalInvocationID.x);

    // Read from the texel buffer
    vec4 value = imageLoad(storageTexelBuffer, index);

    // Modify the value
    value = value * 2.0;

    // Write back to the texel buffer
    imageStore(storageTexelBuffer, index, value);
}

In Slang, storage texel buffers are declared using the `RWBuffer` type. The `Load` method and array indexing are used to read from and write to the buffer.

// VK_FORMAT_R32G32B32A32_SFLOAT
[[vk::binding(0, 0)]]
[[vk::image_format("rgba32f")]]
RWBuffer storageTexelBuffer;

[numthreads(64, 1, 1)]
void main(uint3 dispatchThreadID : SV_DispatchThreadID)
{
    int index = int(dispatchThreadID.x);

    // Read from the texel buffer
    float4 value = storageTexelBuffer.Load(index);

    // Modify the value
    value = value * 2.0;

    // Write back to the texel buffer
    storageTexelBuffer[index] = value;
}

The corresponding SPIR-V assembly:

OpDecorate %storageTexelBuffer DescriptorSet 0
OpDecorate %storageTexelBuffer Binding 0

%rgba32f           = OpTypeImage %float Buffer 0 0 0 2 Rgba32f
%ptr               = OpTypePointer UniformConstant %rgba32f
%storageTexelBuffer = OpVariable %ptr UniformConstant

A common mistake when dealing with Texel Buffers is forgetting you are accessing a single texel at a time.
This texel format can have 1 to 4 components (`R8` vs `RGBA8`).
Some shading languages, such as GLSL, require you to write all 4 components where the extra components are ignored.

// VK_FORMAT_R32_UINT
layout(set = 0, binding = 0, r32ui) uniform uimageBuffer storageTexelBuffer;

void main() {
    // Invalid in GLSL, need to use a uvec4
    uint a = 1;
    imageStore(storageTexelBuffer, 0, a);

    // Common mistake is to assume this will write all 4 values to 4 consecutive texels.
    // Only "1" is written and the other 3 components are discarded because the format only contains 1 component
    uvec4 b = uvec4(1, 2, 3, 4);
    imageStore(storageTexelBuffer, 0, b);
}

Not all formats support texel buffer operations. The `VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT` and `VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT` flags in `VkFormatProperties` indicate whether a format can be used for uniform and storage texel buffers, respectively.

VkFormatProperties formatProperties;
vkGetPhysicalDeviceFormatProperties(physicalDevice, format, &formatProperties);
if (!(formatProperties.bufferFeatures & VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT)) {
    // Format does not support uniform texel buffer operations
}
if (!(formatProperties.bufferFeatures & VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT)) {
    // Format does not support storage texel buffer operations
}

|  | The code above is using the `bufferFeatures` member of `VkFormatProperties` to check for texel buffer support, as opposed to `optimalTilingFeatures` or `linearTilingFeatures` which are used for images. |
| --- | --- |

When using storage texel buffers, proper synchronization is crucial to avoid race conditions.

VkBufferMemoryBarrier barrier = {};
barrier.sType = VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER;
barrier.srcAccessMask = VK_ACCESS_SHADER_WRITE_BIT;
barrier.dstAccessMask = VK_ACCESS_SHADER_READ_BIT;
barrier.srcQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED;
barrier.dstQueueFamilyIndex = VK_QUEUE_FAMILY_IGNORED;
barrier.buffer = buffer;
barrier.offset = 0;
barrier.size = VK_WHOLE_SIZE;

vkCmdPipelineBarrier(
    commandBuffer,
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT,
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT,
    0,
    0, nullptr,
    1, &barrier,
    0, nullptr
);

While both storage images and storage buffers allow for read-write access in shaders, they have different use cases:

* 
**Storage Images**: Ideal for 2D or 3D data that benefits from texture operations like filtering or addressing modes.

* 
**Storage Buffers**: Better for arbitrary structured data or when you need to access data in a non-uniform pattern.

Texel buffers and storage buffers also have different strengths:

* 
**Texel Buffers**: Provide texture-like access to buffer data, allowing for operations like filtering.

* 
**Storage Buffers**: More flexible for general-purpose data storage and manipulation.

Many mobile GPUs and some desktop GPUs use a tile-based rendering architecture, which has important implications for how storage images and texel buffers should be used.

In tile-based rendering (TBR) or tile-based deferred rendering (TBDR), the GPU divides the framebuffer into small rectangular regions called tiles. Each tile is processed completely (all draw calls affecting that tile) before moving to the next tile. This approach:

* 
Reduces memory bandwidth by keeping tile data in fast on-chip memory

* 
Improves power efficiency, which is particularly important for mobile devices

* 
Allows for efficient implementation of certain rendering techniques

When using storage images with tile-based renderers, consider the following:

**Tile Memory Flushing**: Writing to storage images may cause the GPU to flush tile memory to main memory, reducing the benefits of tile-based rendering.

* 
This can significantly impact performance, especially if done frequently

* 
Try to batch storage image operations to minimize tile memory flushes

**Transient Attachments**: Some tile-based renderers support special "transient" attachments that exist only in tile memory.

* 
These cannot be used as storage images since they don’t have backing memory

* 
If you need to process render results, consider using input attachments instead where possible

**Pixel Local Storage Extensions**: Some tile-based GPUs offer extensions like `VK_EXT_shader_pixel_local_storage` that provide more efficient alternatives to storage images for certain use cases.

* 
These extensions allow shaders to access per-pixel data that stays in tile memory

* 
Check for and use these extensions when available on tile-based hardware

**Render Pass Coherency**: In tile-based renderers, data written to storage images during a render pass may not be visible to subsequent draw calls in the same render pass.

* 
Use appropriate memory barriers or split your work into multiple render passes

* 
Be aware that these barriers may be more expensive on tile-based renderers

Texel buffers generally work similarly on tile-based and immediate mode renderers, but there are still some considerations:

**Cache Coherency**: Tile-based renderers may have different caching behaviors for texel buffer access.

* 
Ensure proper synchronization when writing to and reading from texel buffers

* 
Be aware that cache flushes may be more expensive on tile-based architectures

**Memory Access Patterns**: Tile-based renderers may be more sensitive to non-coherent memory access patterns.

* 
Organize your data to maximize locality for the tile being processed

* 
Consider the tile size when designing your algorithms

**Minimize Framebuffer Resolves**: Each time you need to access framebuffer contents as a storage image, the tile-based renderer must "resolve" (write) the tile memory to main memory.

* 
Try to complete all operations that modify a particular image before reading from it

* 
Consider using subpasses and input attachments instead of storage images for operations within a render pass

**Prefer Render Passes Over Compute for Image Processing**: On tile-based renderers, operations within a render pass can often be more efficient than compute shaders using storage images.

* 
Consider implementing image processing as fragment shaders in a render pass

* 
Use multiple subpasses to keep intermediate results in tile memory

**Be Careful with Mixed Access Patterns**: Mixing reads and writes to the same storage image can be particularly expensive on tile-based renderers.

* 
Try to separate read and write phases

* 
Consider double-buffering techniques to avoid read-after-write hazards

When using storage images and texel buffers, it’s crucial to understand the format compatibility rules, which differ slightly between these resource types. Mismatches between shader formats and resource formats can lead to undefined behavior and potential validation warnings.

The format compatibility rules for storage images and texel buffers are the same:

**Storage Images**: The format specified in the shader (SPIR-V Image Format) must **exactly match** the format used when creating the VkImageView (Vulkan Format).

**Texel Buffers**: The format specified in the shader (SPIR-V Image Format) must **exactly match** the format used when creating the VkBufferView (Vulkan Format).

Both resource types require exact format matching between the shader and the view. The views must always match the shader exactly.

The Vulkan Specification defines a table of [Compatibility Between SPIR-V Image Formats and Vulkan Formats](https://docs.vulkan.org/spec/latest/chapters/textures.html#formats-compatibility-classes) that shows the exact mapping between SPIR-V Image Formats and Vulkan Formats.

For storage images, the format specified in the shader must exactly match the format of the image view according to this table. There is no automatic format conversion or component swizzling.

// SPIR-V format Rgba8 (maps to VK_FORMAT_R8G8B8A8_UNORM)
layout(set = 0, binding = 0, rgba8) uniform image2D storageImage;

// The VkImageView must be created with VK_FORMAT_R8G8B8A8_UNORM
// Using VK_FORMAT_B8G8R8A8_UNORM would result in undefined behavior

For texel buffers, just like storage images, the format specified in the shader must exactly match the format of the buffer view according to the SPIR-V Image Format and Vulkan Format compatibility table. There is no automatic format conversion or component swizzling.

// For uniform texel buffers, the format is not specified in the shader
layout(set = 0, binding = 0) uniform textureBuffer uniformTexelBuffer;

// The VkBufferView must be created with a format that exactly matches what the shader expects
// For example, if the shader expects RGBA data, VK_FORMAT_R8G8B8A8_UNORM must be used

For storage texel buffers, a format is specified in the shader, and it must exactly match the format used for the VkBufferView:

// SPIR-V format Rgba8 (maps to VK_FORMAT_R8G8B8A8_UNORM)
layout(set = 0, binding = 0, rgba8) uniform imageBuffer storageTexelBuffer;

// The VkBufferView must be created with VK_FORMAT_R8G8B8A8_UNORM
// Using a different format, even in the same compatibility class, results in undefined behavior

For both storage images and texel buffers, component swizzling works the same way:

**Storage Images**: No automatic component swizzling occurs. The components are accessed exactly as they are stored in memory. If you need to swizzle components, (e.g., convert between RGBA and BGRA), you must do it manually in your shader code.

**Texel Buffers**: Just like storage images, no automatic component swizzling occurs. The components are accessed exactly as they are stored in memory. If you need to swizzle components, you must do it manually in your shader code.

**Image Views**: For sampled images (not storage images), you can use the `VkComponentMapping` structure in `VkImageViewCreateInfo` to specify component swizzling. This is not applicable to storage images or texel buffers.

Several types of format mismatches can occur, all of which result in undefined behavior:

**Component Size Mismatch**: When the component size in the SPIR-V format differs from the Vulkan format.

* 
Example: SPIR-V format `Rgba32f` (32-bit float components) with `VK_FORMAT_R8G8B8A8_UNORM` (8-bit components)

* 
Example: SPIR-V format `R32ui` (32-bit unsigned int) with `VK_FORMAT_R8_UINT` (8-bit unsigned int) - this is invalid, resulting in undefined behavior with no implicit bitcasting

**Component Count Mismatch**: When the number of components in the SPIR-V format differs from the Vulkan format.

* 
**More Components Written**: SPIR-V format `Rgba8` (4 components) with `VK_FORMAT_R8_UNORM` (1 component)

* 
**Less Components Written**: SPIR-V format `R8` (1 component) with `VK_FORMAT_R8G8B8A8_UNORM` (4 components)

**Numeric Format Mismatch**: When the numeric format (normalized, float, int) in the SPIR-V format differs from the Vulkan format.

* 
Example: SPIR-V format `Rgba8` (UNORM) with `VK_FORMAT_R8G8B8A8_SNORM` (SNORM)

**Numeric Type Mismatch**: When the numeric type (float, int, uint) in the SPIR-V format differs from the Vulkan format.

* 
Example: SPIR-V format `R8` (float) with `VK_FORMAT_R8_SINT` (signed int)

* 
Example: SPIR-V format `R8ui` (unsigned int) with `VK_FORMAT_R8_SINT` (signed int)

**Channel Order Mismatch**: When the channel order in the SPIR-V format differs from the Vulkan format.

* 
Example: SPIR-V format `Rgba8` (RGBA order) with `VK_FORMAT_B8G8R8A8_UNORM` (BGRA order)

* 
This is particularly problematic for storage images, where no automatic swizzling occurs

There are different approaches to fix format mismatches depending on the resource type:

* 
**Match the Formats Exactly**: Ensure that the VkImageView format exactly
matches the SPIR-V Image Format as defined in the compatibility table.

For example, if your shader uses `rgba8` (SPIR-V format `Rgba8`),
create your VkImageView with `VK_FORMAT_R8G8B8A8_UNORM`.

* 
If you need to work with a different format (e.g.,
`VK_FORMAT_B8G8R8A8_UNORM`), you’ll need to manually swizzle the components in your shader code:

// Manual swizzling for BGRA to RGBA conversion
vec4 value = imageLoad(storageImage, texelCoord);
vec4 swizzled = value.bgra; // Manually swizzle components
// Use swizzled value

* 
**Use the Unknown Format in SPIR-V**: If you need flexibility in the
formats you use, you can use the `Unknown` format in SPIR-V, which is compatible with any Vulkan format.

This requires enabling the `shaderStorageImageWriteWithoutFormat` feature.

* 
In GLSL, this means omitting the format qualifier:

// No format specified, uses Unknown in SPIR-V
layout(set = 0, binding = 0) uniform image2D storageImage;

* 
Note that when using the Unknown format, you’re responsible for ensuring that the data you read from or write to the image is compatible with the actual format of the image.

**Match the Formats Exactly**: Ensure that the VkBufferView format exactly matches the SPIR-V Image Format as defined in the compatibility table, just as with storage images.

* 
For example, if your shader uses `rgba8` (SPIR-V format `Rgba8`), create your VkBufferView with `VK_FORMAT_R8G8B8A8_UNORM`.

* 
Using a different format, even in the same compatibility class, results in undefined behavior.

**Handle Component Swizzling in Shader**: If you need to work with formats that have different component orders (e.g., RGBA vs. BGRA), handle the swizzling explicitly in your shader code, as no automatic swizzling occurs.

* 
When a format mismatch occurs with either storage images or texel buffers, the entire memory becomes undefined, not just the texels being written.

* 
Even formats that are in the same compatibility class (e.g., `VK_FORMAT_R8G8B8A8_UNORM` and `VK_FORMAT_B8G8R8A8_UNORM`) must match exactly for both storage images and texel buffers.

* 
Both storage images and texel buffers have the same strict format compatibility rules - the formats specified in the shader must exactly match the formats used in the views.

* 
The validation warnings for format mismatches are intended to help developers identify potential issues, as these mismatches can lead to subtle bugs that might not be immediately clear.

* 
Component swizzling must be handled manually for both storage images and texel buffers, as no automatic swizzling occurs for either resource type.

**Format Selection**: Choose formats that are natively supported by the hardware for better performance.

* 
Prefer formats with native hardware support (check `VkFormatProperties`)

* 
For storage images, 32-bit formats (`R32_*`) often have better performance than packed formats

* 
Consider using single-channel formats when only one channel is needed to reduce memory bandwidth

**Memory Access Patterns**: Try to ensure coalesced memory access patterns when reading from or writing to storage images and texel buffers.

* 
Group memory accesses to adjacent locations to maximize cache efficiency

* 
In compute shaders, align work group sizes with hardware warp/wavefront sizes

* 
Consider the memory layout when accessing 2D images (row-major vs. column-major access)

* 
For texel buffers, sequential access is generally faster than random access

**Synchronization**: Use the minimal necessary synchronization to avoid performance penalties.

* 
Use the most specific access flags and pipeline stages possible

* 
Batch operations to reduce the number of barriers needed

* 
Consider using `VK_PIPELINE_STAGE_ALL_COMMANDS_BIT` only when absolutely necessary

* 
For compute workloads, try to design algorithms that minimize synchronization points

**Resource Reuse**: Reuse storage images and texel buffers when possible to reduce memory allocation overhead.

* 
Consider implementing a resource pool for frequently created/destroyed resources

* 
Use double or triple buffering techniques for resources that are updated every frame

**Workload Balancing**: Distribute work evenly across compute shader invocations.

* 
Choose appropriate workgroup sizes based on your hardware (typically multiples of 32 or 64)

* 
Avoid divergent execution paths within a workgroup

* 
Consider tiled processing for large images to improve cache locality

**Format Support**: Not all formats support storage operations. Always check format features.

* 
Use `vkGetPhysicalDeviceFormatProperties` to verify format support before creating resources

* 
Some formats may support storage operations but with reduced performance

* 
Be aware that format support can vary between different hardware vendors

**Memory Barriers**: Missing or incorrect memory barriers can lead to race conditions and undefined behavior.

* 
Always use appropriate memory barriers between writes and subsequent reads

* 
Remember that barriers are needed even when operations are in the same shader

* 
For compute shaders, use `memoryBarrierImage()` or `memoryBarrierBuffer()` in GLSL when appropriate

* 
Be careful with multiple queue submissions that access the same resources

**Layout Transitions**: Storage images typically use `VK_IMAGE_LAYOUT_GENERAL`, but transitioning to this layout is still required.

* 
Always transition images to the correct layout before use

* 
Be aware that `VK_IMAGE_LAYOUT_GENERAL` may be less efficient than specialized layouts

* 
Consider using `VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL` if you only need read access

**Atomic Operations**: Atomic operations on storage images and buffers can be expensive.

* 
Minimize the use of atomic operations when possible

* 
Consider alternative algorithms that don’t require atomics

* 
Be aware that atomic performance varies significantly between hardware vendors

* 
Group atomic operations to minimize memory contention

**Resource Limits**: Be aware of device limits for storage images and texel buffers.

* 
Check `maxPerStageDescriptorStorageImages` and related limits

* 
Some devices may have restrictions on the number of storage resources that can be written to

* 
Consider the impact on descriptor set layout when using many storage resources

**Validation Layers**: Use validation layers during development to catch common errors.

* 
Enable synchronization validation to detect barrier issues

* 
Pay attention to warnings about format support and usage flags

* 
Test on multiple hardware vendors if possible to catch implementation-specific issues

**Shader Compilation**: Be aware of shader compilation implications.

* 
Complex storage image and texel buffer operations may increase register pressure

* 
Consider splitting complex shaders into multiple passes

* 
Profile shader performance to identify bottlenecks

Storage images are ideal for image processing tasks like filters, blurs, and other post-processing effects.

Storage texel buffers can be used to store and update particle data in a compute shader, which can then be read by a vertex shader for rendering.

Uniform texel buffers are useful for implementing lookup tables that need to be accessed with texture-like operations.
