# VkSubresourceLayout2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubresourceLayout2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubresourceLayout2 - Structure specifying subresource layout

Information about the layout of the image subresource is returned in a
`VkSubresourceLayout2` structure:

// Provided by VK_VERSION_1_4
typedef struct VkSubresourceLayout2 {
    VkStructureType        sType;
    void*                  pNext;
    VkSubresourceLayout    subresourceLayout;
} VkSubresourceLayout2;

// Provided by VK_KHR_maintenance5
// Equivalent to VkSubresourceLayout2
typedef VkSubresourceLayout2 VkSubresourceLayout2KHR;

// Provided by VK_EXT_host_image_copy, VK_EXT_image_compression_control
// Equivalent to VkSubresourceLayout2
typedef VkSubresourceLayout2 VkSubresourceLayout2EXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`subresourceLayout` is a [VkSubresourceLayout](VkSubresourceLayout.html) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkSubresourceLayout2-sType-sType) VUID-VkSubresourceLayout2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2](VkStructureType.html)

* 
[](#VUID-VkSubresourceLayout2-pNext-pNext) VUID-VkSubresourceLayout2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkImageCompressionPropertiesEXT](VkImageCompressionPropertiesEXT.html) or [VkSubresourceHostMemcpySize](VkSubresourceHostMemcpySize.html)

* 
[](#VUID-VkSubresourceLayout2-sType-unique) VUID-VkSubresourceLayout2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_EXT_image_compression_control](VK_EXT_image_compression_control.html), [VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkStructureType](VkStructureType.html), [VkSubresourceLayout](VkSubresourceLayout.html), [vkGetDeviceImageSubresourceLayout](vkGetDeviceImageSubresourceLayout.html), [vkGetDeviceImageSubresourceLayout](vkGetDeviceImageSubresourceLayout.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html), [vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkSubresourceLayout2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
