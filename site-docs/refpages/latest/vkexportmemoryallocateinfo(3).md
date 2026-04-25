# VkExportMemoryAllocateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMemoryAllocateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMemoryAllocateInfo - Specify exportable handle types for a device memory object

When allocating memory whose payload **may** be exported to another process or
Vulkan instance, add a [VkExportMemoryAllocateInfo](#) structure to the
`pNext` chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure, specifying
the handle types that **may** be exported.

The [VkExportMemoryAllocateInfo](#) structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExportMemoryAllocateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExportMemoryAllocateInfo;

// Provided by VK_KHR_external_memory
// Equivalent to VkExportMemoryAllocateInfo
typedef VkExportMemoryAllocateInfo VkExportMemoryAllocateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) specifying one or more memory
handle types the application **can** export from the resulting allocation.
The application **can** request multiple handle types for the same
allocation.

Valid Usage

* 
[](#VUID-VkExportMemoryAllocateInfo-handleTypes-09860) VUID-VkExportMemoryAllocateInfo-handleTypes-09860

    The bits in `handleTypes` **must** be supported and compatible, as
    reported by
[VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html),
    [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html), or
    [VkExternalBufferProperties](VkExternalBufferProperties.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryAllocateInfo-sType-sType) VUID-VkExportMemoryAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO](VkStructureType.html)

* 
[](#VUID-VkExportMemoryAllocateInfo-handleTypes-parameter) VUID-VkExportMemoryAllocateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_KHR_external_memory](VK_KHR_external_memory.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMemoryAllocateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
