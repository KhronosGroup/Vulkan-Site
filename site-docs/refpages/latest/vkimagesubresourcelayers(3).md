# VkImageSubresourceLayers(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageSubresourceLayers.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageSubresourceLayers - Structure specifying an image subresource layers

The `VkImageSubresourceLayers` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageSubresourceLayers {
    VkImageAspectFlags    aspectMask;
    uint32_t              mipLevel;
    uint32_t              baseArrayLayer;
    uint32_t              layerCount;
} VkImageSubresourceLayers;

* 
`aspectMask` is a combination of [VkImageAspectFlagBits](VkImageAspectFlagBits.html),
selecting the color, depth and/or stencil aspects to be copied.

* 
`mipLevel` is the mipmap level to copy

* 
`baseArrayLayer` and `layerCount` are the starting layer and
number of layers to copy.

Valid Usage

* 
[](#VUID-VkImageSubresourceLayers-aspectMask-00167) VUID-VkImageSubresourceLayers-aspectMask-00167

If `aspectMask` contains [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html), it **must**
not contain either of [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageSubresourceLayers-aspectMask-00168) VUID-VkImageSubresourceLayers-aspectMask-00168

`aspectMask` **must** not contain [VK_IMAGE_ASPECT_METADATA_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkImageSubresourceLayers-aspectMask-02247) VUID-VkImageSubresourceLayers-aspectMask-02247

`aspectMask` **must** not include
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for any index *i*

* 
[](#VUID-VkImageSubresourceLayers-layerCount-09243) VUID-VkImageSubresourceLayers-layerCount-09243

If the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is not
enabled,
`layerCount` **must** not be [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html)

* 
[](#VUID-VkImageSubresourceLayers-layerCount-01700) VUID-VkImageSubresourceLayers-layerCount-01700

If `layerCount` is not [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), it **must** be
greater than 0

Valid Usage (Implicit)

* 
[](#VUID-VkImageSubresourceLayers-aspectMask-parameter) VUID-VkImageSubresourceLayers-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](VkImageAspectFlagBits.html) values

* 
[](#VUID-VkImageSubresourceLayers-aspectMask-requiredbitmask) VUID-VkImageSubresourceLayers-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBufferImageCopy](VkBufferImageCopy.html), [VkBufferImageCopy2](VkBufferImageCopy2.html), [VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html), [VkCopyMemoryToImageIndirectInfoKHR](VkCopyMemoryToImageIndirectInfoKHR.html), [VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html), [VkImageAspectFlags](VkImageAspectFlags.html), [VkImageBlit](VkImageBlit.html), [VkImageBlit2](VkImageBlit2.html), [VkImageCopy](VkImageCopy.html), [VkImageCopy2](VkImageCopy2.html), [VkImageResolve](VkImageResolve.html), [VkImageResolve2](VkImageResolve2.html), [VkImageToMemoryCopy](VkImageToMemoryCopy.html), [VkMemoryToImageCopy](VkMemoryToImageCopy.html), [vkCmdCopyMemoryToImageIndirectNV](vkCmdCopyMemoryToImageIndirectNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkImageSubresourceLayers).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
