# VkPhysicalDeviceOpacityMicromapPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceOpacityMicromapPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceOpacityMicromapPropertiesEXT - Structure describing the opacity micromap properties of a physical device

The `VkPhysicalDeviceOpacityMicromapPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkPhysicalDeviceOpacityMicromapPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxOpacity2StateSubdivisionLevel;
    uint32_t           maxOpacity4StateSubdivisionLevel;
} VkPhysicalDeviceOpacityMicromapPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxOpacity2StateSubdivisionLevel` is the maximum allowed
`subdivisionLevel` when `format` is
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VkOpacityMicromapFormatEXT.html)

* 
`maxOpacity4StateSubdivisionLevel` is the maximum allowed
`subdivisionLevel` when `format` is
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VkOpacityMicromapFormatEXT.html)

If the `VkPhysicalDeviceOpacityMicromapPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceOpacityMicromapPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceOpacityMicromapPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceOpacityMicromapPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
