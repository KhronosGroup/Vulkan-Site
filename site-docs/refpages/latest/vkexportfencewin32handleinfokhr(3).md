# VkExportFenceWin32HandleInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExportFenceWin32HandleInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExportFenceWin32HandleInfoKHR - Structure specifying additional attributes of Windows handles exported from a fence

To specify additional attributes of NT handles exported from a fence, add a
[VkExportFenceWin32HandleInfoKHR](#) structure to the `pNext` chain of
the [VkFenceCreateInfo](VkFenceCreateInfo.html) structure.
The `VkExportFenceWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_win32
typedef struct VkExportFenceWin32HandleInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    const SECURITY_ATTRIBUTES*    pAttributes;
    DWORD                         dwAccess;
    LPCWSTR                       name;
} VkExportFenceWin32HandleInfoKHR;

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
underlying synchronization primitive referenced by NT handles exported
from the created fence.

If [VkExportFenceCreateInfo](VkExportFenceCreateInfo.html) is not included in the same `pNext`
chain, this structure is ignored.

If [VkExportFenceCreateInfo](VkExportFenceCreateInfo.html) is included in the `pNext` chain of
[VkFenceCreateInfo](VkFenceCreateInfo.html) with a Windows `handleType`, but either
`VkExportFenceWin32HandleInfoKHR` is not included in the `pNext`
chain, or it is included but `pAttributes` is `NULL`, default security
descriptor values will be used, and child processes created by the
application will not inherit the handle, as described in the MSDN
documentation for “Synchronization Object Security and Access Rights”1.
Further, if the structure is not present, the access rights will be

`DXGI_SHARED_RESOURCE_READ` | `DXGI_SHARED_RESOURCE_WRITE`

for handles of the following types:

[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalFenceHandleTypeFlagBits.html)

1

[https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights](https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights)

Valid Usage

* 
[](#VUID-VkExportFenceWin32HandleInfoKHR-handleTypes-01447) VUID-VkExportFenceWin32HandleInfoKHR-handleTypes-01447

If [VkExportFenceCreateInfo](VkExportFenceCreateInfo.html)::`handleTypes` does not include
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalFenceHandleTypeFlagBits.html), a
`VkExportFenceWin32HandleInfoKHR` structure **must** not be included in
the `pNext` chain of [VkFenceCreateInfo](VkFenceCreateInfo.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExportFenceWin32HandleInfoKHR-sType-sType) VUID-VkExportFenceWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_FENCE_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkExportFenceWin32HandleInfoKHR-pAttributes-parameter) VUID-VkExportFenceWin32HandleInfoKHR-pAttributes-parameter

 If `pAttributes` is not `NULL`, `pAttributes` **must** be a valid pointer to a valid `SECURITY_ATTRIBUTES` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFenceCreateInfo](VkFenceCreateInfo.html)

[VK_KHR_external_fence_win32](VK_KHR_external_fence_win32.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkExportFenceWin32HandleInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
