# VkDisplayProperties2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayProperties2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayProperties2KHR - Structure describing an available display device

The `VkDisplayProperties2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayProperties2KHR {
    VkStructureType           sType;
    void*                     pNext;
    VkDisplayPropertiesKHR    displayProperties;
} VkDisplayProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayProperties` is a [VkDisplayPropertiesKHR](VkDisplayPropertiesKHR.html) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayProperties2KHR-sType-sType) VUID-VkDisplayProperties2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PROPERTIES_2_KHR](VkStructureType.html)

* 
[](#VUID-VkDisplayProperties2KHR-pNext-pNext) VUID-VkDisplayProperties2KHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayPropertiesKHR](VkDisplayPropertiesKHR.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceDisplayProperties2KHR](vkGetPhysicalDeviceDisplayProperties2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayProperties2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
