# VkExportMemoryWin32HandleInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMemoryWin32HandleInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMemoryWin32HandleInfoKHR - Structure specifying additional attributes of Windows handles exported from a memory

To specify additional attributes of NT handles exported from a memory
object, add a [VkExportMemoryWin32HandleInfoKHR](#) structure to the
`pNext` chain of the [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) structure.
The `VkExportMemoryWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_win32
typedef struct VkExportMemoryWin32HandleInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    const SECURITY_ATTRIBUTES*    pAttributes;
    DWORD                         dwAccess;
    LPCWSTR                       name;
} VkExportMemoryWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pAttributes` is a pointer to a Windows `SECURITY_ATTRIBUTES`
structure specifying security attributes of the handle.

* 
`dwAccess` is a `DWORD` specifying access rights of the handle.

* 
`name` is a null-terminated UTF-16 string to associate with the
payload referenced by NT handles exported from the created memory.

If [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html) is not included in the same `pNext`
chain, this structure is ignored.

If [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html) is included in the `pNext` chain of
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html) with a Windows `handleType`, but either
`VkExportMemoryWin32HandleInfoKHR` is not included in the `pNext`
chain, or it is included but `pAttributes` is set to `NULL`, default
security descriptor values will be used, and child processes created by the
application will not inherit the handle, as described in the MSDN
documentation for “Synchronization Object Security and Access Rights”1.
Further, if the structure is not present, the access rights used depend on
the handle type.

For handles of the following types:

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalMemoryHandleTypeFlagBits.html)

The implementation **must** ensure the access rights allow read and write
access to the memory.

1

[https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights](https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights)

Valid Usage

* 
[](#VUID-VkExportMemoryWin32HandleInfoKHR-handleTypes-00657) VUID-VkExportMemoryWin32HandleInfoKHR-handleTypes-00657

If [VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` does not include
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalMemoryHandleTypeFlagBits.html), a
`VkExportMemoryWin32HandleInfoKHR` structure **must** not be included
in the `pNext` chain of [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryWin32HandleInfoKHR-sType-sType) VUID-VkExportMemoryWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkExportMemoryWin32HandleInfoKHR-pAttributes-parameter) VUID-VkExportMemoryWin32HandleInfoKHR-pAttributes-parameter

 If `pAttributes` is not `NULL`, `pAttributes` **must** be a valid pointer to a valid `SECURITY_ATTRIBUTES` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMemoryWin32HandleInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
