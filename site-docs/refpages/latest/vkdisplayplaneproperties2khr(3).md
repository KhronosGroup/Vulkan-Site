# VkDisplayPlaneProperties2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPlaneProperties2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPlaneProperties2KHR - Structure describing an available display plane

The `VkDisplayPlaneProperties2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayPlaneProperties2KHR {
    VkStructureType                sType;
    void*                          pNext;
    VkDisplayPlanePropertiesKHR    displayPlaneProperties;
} VkDisplayPlaneProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayPlaneProperties` is a [VkDisplayPlanePropertiesKHR](VkDisplayPlanePropertiesKHR.html)
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPlaneProperties2KHR-sType-sType) VUID-VkDisplayPlaneProperties2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PLANE_PROPERTIES_2_KHR](VkStructureType.html)

* 
[](#VUID-VkDisplayPlaneProperties2KHR-pNext-pNext) VUID-VkDisplayPlaneProperties2KHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayPlanePropertiesKHR](VkDisplayPlanePropertiesKHR.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceDisplayPlaneProperties2KHR](vkGetPhysicalDeviceDisplayPlaneProperties2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPlaneProperties2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
