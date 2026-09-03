# VkImageSubresource(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageSubresource.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageSubresource - Structure specifying an image subresource

The `VkImageSubresource` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageSubresource {
    VkImageAspectFlags    aspectMask;
    uint32_t              mipLevel;
    uint32_t              arrayLayer;
} VkImageSubresource;

* 
`aspectMask` is a [VkImageAspectFlags](VkImageAspectFlags.html) value selecting the image
*aspect*.

* 
`mipLevel` selects the mipmap level.

* 
`arrayLayer` selects the array layer.

Valid Usage (Implicit)

* 
[](#VUID-VkImageSubresource-aspectMask-parameter) VUID-VkImageSubresource-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](VkImageAspectFlagBits.html) values

* 
[](#VUID-VkImageSubresource-aspectMask-requiredbitmask) VUID-VkImageSubresource-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkImageAspectFlags](VkImageAspectFlags.html), [VkImageSubresource2](VkImageSubresource2.html), [VkSparseImageMemoryBind](VkSparseImageMemoryBind.html), [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageSubresource).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
