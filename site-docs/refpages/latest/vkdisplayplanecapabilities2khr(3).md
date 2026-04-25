# VkDisplayPlaneCapabilities2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPlaneCapabilities2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPlaneCapabilities2KHR - Structure describing the capabilities of a mode and plane combination

The `VkDisplayPlaneCapabilities2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayPlaneCapabilities2KHR {
    VkStructureType                  sType;
    void*                            pNext;
    VkDisplayPlaneCapabilitiesKHR    capabilities;
} VkDisplayPlaneCapabilities2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`capabilities` is a [VkDisplayPlaneCapabilitiesKHR](VkDisplayPlaneCapabilitiesKHR.html) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPlaneCapabilities2KHR-sType-sType) VUID-VkDisplayPlaneCapabilities2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PLANE_CAPABILITIES_2_KHR](VkStructureType.html)

* 
[](#VUID-VkDisplayPlaneCapabilities2KHR-pNext-pNext) VUID-VkDisplayPlaneCapabilities2KHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayPlaneCapabilitiesKHR](VkDisplayPlaneCapabilitiesKHR.html), [VkStructureType](VkStructureType.html), [vkGetDisplayPlaneCapabilities2KHR](vkGetDisplayPlaneCapabilities2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPlaneCapabilities2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
