# VkImageViewAddressPropertiesNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewAddressPropertiesNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewAddressPropertiesNVX - Structure specifying the image view for handle queries

The `VkImageViewAddressPropertiesNVX` structure is defined as:

// Provided by VK_NVX_image_view_handle
typedef struct VkImageViewAddressPropertiesNVX {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceAddress    deviceAddress;
    VkDeviceSize       size;
} VkImageViewAddressPropertiesNVX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceAddress` is the device address of the image view.

* 
`size` is the size in bytes of the image view device memory.

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewAddressPropertiesNVX-sType-sType) VUID-VkImageViewAddressPropertiesNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_ADDRESS_PROPERTIES_NVX](VkStructureType.html)

* 
[](#VUID-VkImageViewAddressPropertiesNVX-pNext-pNext) VUID-VkImageViewAddressPropertiesNVX-pNext-pNext

 `pNext` **must** be `NULL`

[VK_NVX_image_view_handle](VK_NVX_image_view_handle.html), `VkDeviceAddress`, `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetImageViewAddressNVX](vkGetImageViewAddressNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewAddressPropertiesNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
