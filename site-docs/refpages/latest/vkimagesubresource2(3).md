# VkImageSubresource2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageSubresource2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageSubresource2 - Structure specifying an image subresource

The `VkImageSubresource2` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkImageSubresource2 {
    VkStructureType       sType;
    void*                 pNext;
    VkImageSubresource    imageSubresource;
} VkImageSubresource2;

// Provided by VK_KHR_maintenance5
// Equivalent to VkImageSubresource2
typedef VkImageSubresource2 VkImageSubresource2KHR;

// Provided by VK_EXT_host_image_copy, VK_EXT_image_compression_control
// Equivalent to VkImageSubresource2
typedef VkImageSubresource2 VkImageSubresource2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageSubresource` is a [VkImageSubresource](VkImageSubresource.html) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkImageSubresource2-sType-sType) VUID-VkImageSubresource2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2](VkStructureType.html)

* 
[](#VUID-VkImageSubresource2-pNext-pNext) VUID-VkImageSubresource2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageSubresource2-imageSubresource-parameter) VUID-VkImageSubresource2-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresource](VkImageSubresource.html) structure

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_EXT_image_compression_control](VK_EXT_image_compression_control.html), [VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDeviceImageSubresourceInfo](VkDeviceImageSubresourceInfo.html), [VkImageSubresource](VkImageSubresource.html), [VkStructureType](VkStructureType.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageSubresource2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
