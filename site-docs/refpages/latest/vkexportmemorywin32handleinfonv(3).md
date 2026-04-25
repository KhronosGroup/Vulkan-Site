# VkExportMemoryWin32HandleInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportMemoryWin32HandleInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportMemoryWin32HandleInfoNV - Specify security attributes and access rights for Win32 memory handles

When [VkExportMemoryAllocateInfoNV](VkExportMemoryAllocateInfoNV.html)::`handleTypes` includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV](VkExternalMemoryHandleTypeFlagBitsNV.html), add a
`VkExportMemoryWin32HandleInfoNV` structure to the `pNext` chain of
the [VkExportMemoryAllocateInfoNV](VkExportMemoryAllocateInfoNV.html) structure to specify security
attributes and access rights for the memory object’s external handle.

The `VkExportMemoryWin32HandleInfoNV` structure is defined as:

// Provided by VK_NV_external_memory_win32
typedef struct VkExportMemoryWin32HandleInfoNV {
    VkStructureType               sType;
    const void*                   pNext;
    const SECURITY_ATTRIBUTES*    pAttributes;
    DWORD                         dwAccess;
} VkExportMemoryWin32HandleInfoNV;

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

If this structure is not present, or if `pAttributes` is `NULL`, default
security descriptor values will be used, and child processes created by the
application will not inherit the handle, as described in the MSDN
documentation for “Synchronization Object Security and Access Rights”1.
Further, if the structure is not present, the access rights will be

`DXGI_SHARED_RESOURCE_READ` | `DXGI_SHARED_RESOURCE_WRITE`

1

[https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights](https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights)

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryWin32HandleInfoNV-sType-sType) VUID-VkExportMemoryWin32HandleInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkExportMemoryWin32HandleInfoNV-pAttributes-parameter) VUID-VkExportMemoryWin32HandleInfoNV-pAttributes-parameter

 If `pAttributes` is not `NULL`, `pAttributes` **must** be a valid pointer to a valid `SECURITY_ATTRIBUTES` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_NV_external_memory_win32](VK_NV_external_memory_win32.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkExportMemoryWin32HandleInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
