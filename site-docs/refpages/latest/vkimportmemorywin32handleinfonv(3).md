# VkImportMemoryWin32HandleInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportMemoryWin32HandleInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportMemoryWin32HandleInfoNV - Import Win32 memory created on the same physical device

To import memory created on the same physical device but outside of the
current Vulkan instance, add a [VkImportMemoryWin32HandleInfoNV](#)
structure to the `pNext` chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)
structure, specifying a handle to and the type of the memory.

The `VkImportMemoryWin32HandleInfoNV` structure is defined as:

// Provided by VK_NV_external_memory_win32
typedef struct VkImportMemoryWin32HandleInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExternalMemoryHandleTypeFlagsNV    handleType;
    HANDLE                               handle;
} VkImportMemoryWin32HandleInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is `0` or a [VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html)
value specifying the type of memory handle in `handle`.

* 
`handle` is a Windows `HANDLE` referring to the memory.

If `handleType` is `0`, this structure is ignored by consumers of the
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure it is chained from.

Valid Usage

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-handleType-01327) VUID-VkImportMemoryWin32HandleInfoNV-handleType-01327

`handleType` **must** not have more than one bit set

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-handle-01328) VUID-VkImportMemoryWin32HandleInfoNV-handle-01328

`handle` **must** be a valid handle to memory, obtained as specified by
`handleType`

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-sType-sType) VUID-VkImportMemoryWin32HandleInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_WIN32_HANDLE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-handleType-parameter) VUID-VkImportMemoryWin32HandleInfoNV-handleType-parameter

 `handleType` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](VkExternalMemoryHandleTypeFlagBitsNV.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_NV_external_memory_win32](VK_NV_external_memory_win32.html), [VkExternalMemoryHandleTypeFlagsNV](VkExternalMemoryHandleTypeFlagsNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkImportMemoryWin32HandleInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
