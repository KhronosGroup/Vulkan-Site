# VkDisplayModeProperties2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayModeProperties2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayModeProperties2KHR - Structure describing an available display mode

The `VkDisplayModeProperties2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayModeProperties2KHR {
    VkStructureType               sType;
    void*                         pNext;
    VkDisplayModePropertiesKHR    displayModeProperties;
} VkDisplayModeProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`displayModeProperties` is a [VkDisplayModePropertiesKHR](VkDisplayModePropertiesKHR.html)
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayModeProperties2KHR-sType-sType) VUID-VkDisplayModeProperties2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_MODE_PROPERTIES_2_KHR](VkStructureType.html)

* 
[](#VUID-VkDisplayModeProperties2KHR-pNext-pNext) VUID-VkDisplayModeProperties2KHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDisplayModeStereoPropertiesNV](VkDisplayModeStereoPropertiesNV.html)

* 
[](#VUID-VkDisplayModeProperties2KHR-sType-unique) VUID-VkDisplayModeProperties2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayModePropertiesKHR](VkDisplayModePropertiesKHR.html), [VkStructureType](VkStructureType.html), [vkGetDisplayModeProperties2KHR](vkGetDisplayModeProperties2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayModeProperties2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
