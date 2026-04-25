# VkFormatProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFormatProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFormatProperties2 - Structure specifying image format properties

The `VkFormatProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkFormatProperties2 {
    VkStructureType       sType;
    void*                 pNext;
    VkFormatProperties    formatProperties;
} VkFormatProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkFormatProperties2
typedef VkFormatProperties2 VkFormatProperties2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`formatProperties` is a [VkFormatProperties](VkFormatProperties.html) structure
describing features supported by the requested format.

Valid Usage (Implicit)

* 
[](#VUID-VkFormatProperties2-sType-sType) VUID-VkFormatProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2](VkStructureType.html)

* 
[](#VUID-VkFormatProperties2-pNext-pNext) VUID-VkFormatProperties2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDrmFormatModifierPropertiesList2EXT](VkDrmFormatModifierPropertiesList2EXT.html), [VkDrmFormatModifierPropertiesListEXT](VkDrmFormatModifierPropertiesListEXT.html), [VkFormatProperties3](VkFormatProperties3.html), [VkSubpassResolvePerformanceQueryEXT](VkSubpassResolvePerformanceQueryEXT.html), or [VkTensorFormatPropertiesARM](VkTensorFormatPropertiesARM.html)

* 
[](#VUID-VkFormatProperties2-sType-unique) VUID-VkFormatProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkFormatProperties](VkFormatProperties.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html), [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkFormatProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
