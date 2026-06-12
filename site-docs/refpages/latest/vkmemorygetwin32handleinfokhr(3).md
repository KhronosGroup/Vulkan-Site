# VkMemoryGetWin32HandleInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryGetWin32HandleInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryGetWin32HandleInfoKHR - Structure describing a Win32 handle memory export operation

The `VkMemoryGetWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_win32
typedef struct VkMemoryGetWin32HandleInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the handle will be
exported.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of handle requested.

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) for a description of the
properties of the defined external memory handle types.

Valid Usage

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00662) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00662

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00663) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00663

If `handleType` is defined as an NT handle,
[vkGetMemoryWin32HandleKHR](vkGetMemoryWin32HandleKHR.html) **must** be called no more than once for
each valid unique combination of `memory` and `handleType`

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00664) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00664

`handleType` **must** be defined as an NT handle or a global share
handle

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-sType-sType) VUID-VkMemoryGetWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-pNext-pNext) VUID-VkMemoryGetWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-memory-parameter) VUID-VkMemoryGetWin32HandleInfoKHR-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-parameter) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html), [VkDeviceMemory](VkDeviceMemory.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetMemoryWin32HandleKHR](vkGetMemoryWin32HandleKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryGetWin32HandleInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
