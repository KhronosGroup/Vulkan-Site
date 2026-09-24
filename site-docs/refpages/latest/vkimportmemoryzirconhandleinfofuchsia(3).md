# VkImportMemoryZirconHandleInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMemoryZirconHandleInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMemoryZirconHandleInfoFUCHSIA - Structure specifying import parameters for Zircon handle to external memory

The `VkImportMemoryZirconHandleInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_memory
typedef struct VkImportMemoryZirconHandleInfoFUCHSIA {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    zx_handle_t                           handle;
} VkImportMemoryZirconHandleInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of `handle`.

* 
`handle` is a `zx_handle_t` (Zircon) handle to the external
memory.

Valid Usage

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-04771) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-04771

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](VkExternalMemoryHandleTypeFlagBits.html)

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handle-04772) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handle-04772

`handle` **must** be a valid VMO handle

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-sType-sType) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_FUCHSIA_external_memory](VK_FUCHSIA_external_memory.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMemoryZirconHandleInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
