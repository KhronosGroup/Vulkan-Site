# VkExportMemoryAllocateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMemoryAllocateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMemoryAllocateInfoNV - Specify memory handle types that may be exported

The [VkExportMemoryAllocateInfoNV](#) structure is defined as:

// Provided by VK_NV_external_memory
typedef struct VkExportMemoryAllocateInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExternalMemoryHandleTypeFlagsNV    handleTypes;
} VkExportMemoryAllocateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) specifying one or more memory
handle types that **may** be exported.
Multiple handle types **may** be requested for the same allocation as long
as they are compatible, as reported by
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](vkGetPhysicalDeviceExternalImageFormatPropertiesNV.html).

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryAllocateInfoNV-sType-sType) VUID-VkExportMemoryAllocateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkExportMemoryAllocateInfoNV-handleTypes-parameter) VUID-VkExportMemoryAllocateInfoNV-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_NV_external_memory](VK_NV_external_memory.html), [VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMemoryAllocateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
