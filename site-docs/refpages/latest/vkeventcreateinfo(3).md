# VkEventCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkEventCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkEventCreateInfo - Structure specifying parameters of a newly created event

The `VkEventCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkEventCreateInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkEventCreateFlags    flags;
} VkEventCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkEventCreateFlagBits](VkEventCreateFlagBits.html) defining
additional creation parameters.

Valid Usage

* 
[](#VUID-VkEventCreateInfo-pNext-06790) VUID-VkEventCreateInfo-pNext-06790

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkEventCreateInfo-sType-sType) VUID-VkEventCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EVENT_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkEventCreateInfo-pNext-pNext) VUID-VkEventCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) or [VkImportMetalSharedEventInfoEXT](VkImportMetalSharedEventInfoEXT.html)

* 
[](#VUID-VkEventCreateInfo-sType-unique) VUID-VkEventCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html)

* 
[](#VUID-VkEventCreateInfo-flags-parameter) VUID-VkEventCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkEventCreateFlagBits](VkEventCreateFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkEventCreateFlags](VkEventCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreateEvent](vkCreateEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkEventCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
