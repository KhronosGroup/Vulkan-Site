# VkImportSemaphoreWin32HandleInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportSemaphoreWin32HandleInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportSemaphoreWin32HandleInfoKHR - Structure specifying Windows handle to import to a semaphore

The `VkImportSemaphoreWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_win32
typedef struct VkImportSemaphoreWin32HandleInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkSemaphoreImportFlags                   flags;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
    HANDLE                                   handle;
    LPCWSTR                                  name;
} VkImportSemaphoreWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore into which the payload will be
imported.

* 
`flags` is a bitmask of [VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html) specifying
additional parameters for the semaphore payload import operation.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value
specifying the type of `handle`.

* 
`handle` is `NULL` or the external handle to import.

* 
`name` is `NULL` or a null-terminated UTF-16 string naming the
underlying synchronization primitive to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) | Reference | Temporary,Permanent |

Valid Usage

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01140) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01140

`handleType` **must** be a value included in the
[Handle Types Supported by    `VkImportSemaphoreWin32HandleInfoKHR`](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphore-handletypes-win32) table

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01466) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01466

If `handleType` is not
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) or
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](VkExternalSemaphoreHandleTypeFlagBits.html), `name`
**must** be `NULL`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01467) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01467

If `handle` is `NULL`, `name` **must** name a valid synchronization
primitive of the type specified by `handleType`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01468) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-01468

If `name` is `NULL`, `handle` **must** be a valid handle of the
type specified by `handleType`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01469) VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01469

If `handle` is not `NULL`, `name` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01542) VUID-VkImportSemaphoreWin32HandleInfoKHR-handle-01542

If `handle` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external semaphore handle types compatibility](../../../../spec/latest/chapters/capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-name-01543) VUID-VkImportSemaphoreWin32HandleInfoKHR-name-01543

If `name` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external semaphore handle types compatibility](../../../../spec/latest/chapters/capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03261) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03261

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) or
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](VkExternalSemaphoreHandleTypeFlagBits.html), the
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)::`flags` field **must** match that of the
semaphore from which `handle` or `name` was exported

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03262) VUID-VkImportSemaphoreWin32HandleInfoKHR-handleType-03262

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) or
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](VkExternalSemaphoreHandleTypeFlagBits.html), the
[VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)::`semaphoreType` field **must** match
that of the semaphore from which `handle` or `name` was exported

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-03322) VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-03322

If `flags` contains [VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](VkSemaphoreImportFlagBits.html), the
[VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)::`semaphoreType` field of the
semaphore from which `handle` or `name` was exported **must** not
be [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-sType-sType) VUID-VkImportSemaphoreWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-pNext-pNext) VUID-VkImportSemaphoreWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-semaphore-parameter) VUID-VkImportSemaphoreWin32HandleInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-parameter) VUID-VkImportSemaphoreWin32HandleInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html) values

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html), [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html), [VkSemaphore](VkSemaphore.html), [VkSemaphoreImportFlags](VkSemaphoreImportFlags.html), [VkStructureType](VkStructureType.html), [vkImportSemaphoreWin32HandleKHR](vkImportSemaphoreWin32HandleKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkImportSemaphoreWin32HandleInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
