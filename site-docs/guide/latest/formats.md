# Formats

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/formats.html

## Table of Contents

- [Feature Support](#feature-support)
- [Format Feature Query Example](#_format_feature_query_example)
- [Format_Feature_Query_Example](#_format_feature_query_example)
- [Variations of Formats](#_variations_of_formats)
- [Variations_of_Formats](#_variations_of_formats)
- [Color](#_color)
- [Depth and Stencil](#_depth_and_stencil)
- [Depth_and_Stencil](#_depth_and_stencil)
- [Compressed](#_compressed)
- [Planar](#_planar)
- [Packed](#_packed)
- [External](#_external)

## Content

Vulkan formats are used to describe how memory is laid out. This chapter aims to give a high-level overview of the variations of formats in Vulkan and some logistical information for how to use them. All details are already well specified in both the [Vulkan Spec format chapter](https://docs.vulkan.org/spec/latest/chapters/formats.html) and the [Khronos Data Format Specification](https://registry.khronos.org/DataFormat/specs/1.3/dataformat.1.3.html).

The most common use case for a `VkFormat` is when creating a `VkImage`. Because the `VkFormat`​s are well defined, they are also used when describing the memory layout for things such as a `VkBufferView`, [vertex input attribute](vertex_input_data_processing.html#input-attribute-format), [mapping SPIR-V image formats](https://docs.vulkan.org/spec/latest/appendices/spirvenv.html#spirvenv-image-formats), creating [triangle geometry in a bottom-level acceleration structure](https://registry.khronos.org/vulkan/specs/latest/man/html/VkAccelerationStructureGeometryTrianglesDataKHR.html), etc.

It is important to understand that "format support" is not a single binary value per format, but rather each format has a set of [VkFormatFeatureFlagBits](https://registry.khronos.org/vulkan/specs/latest/man/html/VkFormatFeatureFlagBits.html) that each describes which features are supported for a format.

The supported formats may vary across implementations, but a [minimum set of format features are guaranteed](https://docs.vulkan.org/spec/latest/chapters/features.html#features-required-format-support). An application can [query](https://docs.vulkan.org/spec/latest/chapters/formats.html#formats-properties) for the supported format properties.

|  | Both [VK_KHR_get_physical_device_properties2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_get_physical_device_properties2.html) and [VK_KHR_format_feature_flags2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_format_feature_flags2.html) expose another way to query for format features. |
| --- | --- |

In this example, the code will check if the `VK_FORMAT_R8_UNORM` format supports being sampled from a `VkImage` created with `VK_IMAGE_TILING_LINEAR` for `VkImageCreateInfo::tiling`. To do this, the code will query the `linearTilingFeatures` flags for `VK_FORMAT_R8_UNORM` to see if the `VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT` is supported by the implementation.

// Using core Vulkan 1.0
VkFormatProperties formatProperties;
vkGetPhysicalDeviceFormatProperties(physicalDevice, VK_FORMAT_R8_UNORM, &formatProperties);
if ((formatProperties.linearTilingFeatures & VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT) != 0) {
    // supported
} else {
    // not supported
}

// Using core Vulkan 1.1 or VK_KHR_get_physical_device_properties2
VkFormatProperties2 formatProperties2;
formatProperties2.sType = VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2;
formatProperties2.pNext = nullptr; // used for possible extensions

vkGetPhysicalDeviceFormatProperties2(physicalDevice, VK_FORMAT_R8_UNORM, &formatProperties2);
if ((formatProperties2.formatProperties.linearTilingFeatures & VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT) != 0) {
    // supported
} else {
    // not supported
}

// Using VK_KHR_format_feature_flags2
VkFormatProperties3KHR formatProperties3;
formatProperties3.sType = VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3_KHR;
formatProperties3.pNext = nullptr;

VkFormatProperties2 formatProperties2;
formatProperties2.sType = VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2;
formatProperties2.pNext = &formatProperties3;

vkGetPhysicalDeviceFormatProperties2(physicalDevice, VK_FORMAT_R8_UNORM, &formatProperties2);
if ((formatProperties3.linearTilingFeatures & VK_FORMAT_FEATURE_2_STORAGE_IMAGE_BIT_KHR) != 0) {
    // supported
} else {
    // not supported
}

Formats come in many variations, most can be grouped by the [name of the format](https://docs.vulkan.org/spec/latest/chapters/formats.html#_identification_of_formats). When dealing with images, the  [VkImageAspectFlagBits](https://registry.khronos.org/vulkan/specs/latest/man/html/VkImageAspectFlagBits.html) values are used to represent which part of the data is being accessed for operations such as clears and copies.

Format with a `R`, `G`, `B` or `A` component and accessed with the `VK_IMAGE_ASPECT_COLOR_BIT`

Formats with a `D` or `S` component. These formats are [considered opaque](https://docs.vulkan.org/spec/latest/chapters/formats.html#formats-depth-stencil) and have special rules when it comes to [copy to and from](https://docs.vulkan.org/spec/latest/chapters/copies.html#VkBufferImageCopy) depth/stencil images.

Some formats have both a depth and stencil component and can be accessed separately with `VK_IMAGE_ASPECT_DEPTH_BIT` and `VK_IMAGE_ASPECT_STENCIL_BIT`.

|  | [VK_KHR_separate_depth_stencil_layouts](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_separate_depth_stencil_layouts.html) and [VK_EXT_separate_stencil_usage](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_separate_stencil_usage.html), which are both promoted to Vulkan 1.2, can be used to have finer control between the depth and stencil components. |
| --- | --- |

More information about depth format can also be found in the [depth chapter](depth.html#depth-formats).

[Compressed image formats](https://docs.vulkan.org/spec/latest/appendices/compressedtex.html)
representation of multiple pixels encoded interdependently within a region.

| Format | How to enable |
| --- | --- |
| [BC (Block-Compressed)](https://docs.vulkan.org/spec/latest/appendices/compressedtex.html#appendix-compressedtex-bc) | `VkPhysicalDeviceFeatures::textureCompressionBC` |
| [ETC2 and EAC](https://docs.vulkan.org/spec/latest/appendices/compressedtex.html#appendix-compressedtex-etc2) | `VkPhysicalDeviceFeatures::textureCompressionETC2` |
| [ASTC LDR](https://docs.vulkan.org/spec/latest/appendices/compressedtex.html#appendix-compressedtex-astc) | `VkPhysicalDeviceFeatures::textureCompressionASTC_LDR` |
| [ASTC HDR](https://docs.vulkan.org/spec/latest/appendices/compressedtex.html#appendix-compressedtex-astc) | [VK_EXT_texture_compression_astc_hdr](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_texture_compression_astc_hdr.html) |
| [PVRTC](https://docs.vulkan.org/spec/latest/appendices/compressedtex.html#appendix-compressedtex-pvrtc) | [VK_IMG_format_pvrtc](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_IMG_format_pvrtc.html) |

[VK_KHR_sampler_ycbcr_conversion](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_sampler_ycbcr_conversion.html) and [VK_EXT_ycbcr_2plane_444_formats](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_ycbcr_2plane_444_formats.html) add [multi-planar formats](extensions/VK_KHR_sampler_ycbcr_conversion.html#multi-planar-formats) to Vulkan. The planes can be accessed separately with `VK_IMAGE_ASPECT_PLANE_0_BIT`, `VK_IMAGE_ASPECT_PLANE_1_BIT`, and `VK_IMAGE_ASPECT_PLANE_2_BIT`.

[Packed formats](https://docs.vulkan.org/spec/latest/chapters/formats.html#formats-packed) are for the purposes of address alignment. As an example, `VK_FORMAT_A8B8G8R8_UNORM_PACK32` and `VK_FORMAT_R8G8B8A8_UNORM` might seem very similar, but when using the formula from the [Vertex Input Extraction section of the spec](https://docs.vulkan.org/spec/latest/chapters/fxvertex.html#fxvertex-input-extraction)

> 

attribAddress = bufferBindingAddress + vertexOffset + attribDesc.offset;

For `VK_FORMAT_R8G8B8A8_UNORM` the `attribAddress` has to be a multiple of the component size (8 bits) while `VK_FORMAT_A8B8G8R8_UNORM_PACK32` has to be a multiple of the packed size (32 bits).

Currently only supported with the `VK_ANDROID_external_memory_android_hardware_buffer` extension. This extension allows Android applications to import implementation-defined external formats to be used with a [VkSamplerYcbcrConversion](extensions/VK_KHR_sampler_ycbcr_conversion.html). There are many restrictions what are allowed with these external formats which are [documented in the spec](https://docs.vulkan.org/spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats).
