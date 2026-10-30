# VkSemaphoreCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreCreateInfo - Structure specifying parameters of a newly created semaphore

The `VkSemaphoreCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSemaphoreCreateInfo {
    VkStructureType           sType;
    const void*               pNext;
    VkSemaphoreCreateFlags    flags;
} VkSemaphoreCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

Valid Usage

* 
[](#VUID-VkSemaphoreCreateInfo-pNext-06789) VUID-VkSemaphoreCreateInfo-pNext-06789

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreCreateInfo-sType-sType) VUID-VkSemaphoreCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkSemaphoreCreateInfo-pNext-pNext) VUID-VkSemaphoreCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html), [VkExportSemaphoreCreateInfo](VkExportSemaphoreCreateInfo.html), [VkExportSemaphoreWin32HandleInfoKHR](VkExportSemaphoreWin32HandleInfoKHR.html), [VkImportMetalSharedEventInfoEXT](VkImportMetalSharedEventInfoEXT.html), [VkQueryLowLatencySupportNV](VkQueryLowLatencySupportNV.html), or [VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)

* 
[](#VUID-VkSemaphoreCreateInfo-sType-unique) VUID-VkSemaphoreCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html)

* 
[](#VUID-VkSemaphoreCreateInfo-flags-zerobitmask) VUID-VkSemaphoreCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSemaphoreCreateFlags](VkSemaphoreCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreateSemaphore](vkCreateSemaphore.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
