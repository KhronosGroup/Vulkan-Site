# VkImportSemaphoreFdInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportSemaphoreFdInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportSemaphoreFdInfoKHR - Structure specifying POSIX file descriptor to import to a semaphore

The `VkImportSemaphoreFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_fd
typedef struct VkImportSemaphoreFdInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkSemaphoreImportFlags                   flags;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
    int                                      fd;
} VkImportSemaphoreFdInfoKHR;

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
specifying the type of `fd`.

* 
`fd` is the external handle to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) | Copy | Temporary |

Valid Usage

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-01143) VUID-VkImportSemaphoreFdInfoKHR-handleType-01143

`handleType` **must** be a value included in the
[Handle Types Supported by    `VkImportSemaphoreFdInfoKHR`](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphore-handletypes-fd) table

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-fd-01544) VUID-VkImportSemaphoreFdInfoKHR-fd-01544

`fd` **must** obey any requirements listed for `handleType` in
[external semaphore    handle types compatibility](../../../../spec/latest/chapters/capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-03263) VUID-VkImportSemaphoreFdInfoKHR-handleType-03263

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalSemaphoreHandleTypeFlagBits.html), the
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)::`flags` field **must** match that of the
semaphore from which `fd` was exported

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-07307) VUID-VkImportSemaphoreFdInfoKHR-handleType-07307

If `handleType` refers to a handle type with copy payload
transference semantics, `flags` **must** contain
[VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](VkSemaphoreImportFlagBits.html)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-03264) VUID-VkImportSemaphoreFdInfoKHR-handleType-03264

If `handleType` is
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalSemaphoreHandleTypeFlagBits.html), the
[VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)::`semaphoreType` field **must** match
that of the semaphore from which `fd` was exported

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-flags-03323) VUID-VkImportSemaphoreFdInfoKHR-flags-03323

If `flags` contains [VK_SEMAPHORE_IMPORT_TEMPORARY_BIT](VkSemaphoreImportFlagBits.html), the
[VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)::`semaphoreType` field of the
semaphore from which `fd` was exported **must** not be
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)

If `handleType` is [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](VkExternalSemaphoreHandleTypeFlagBits.html),
the special value `-1` for `fd` is treated like a valid sync file
descriptor referring to an object that has already signaled.
The import operation will succeed and the `VkSemaphore` will have a
temporarily imported payload as if a valid file descriptor had been
provided.

|  | This special behavior for importing an invalid sync file descriptor allows
| --- | --- |
easier interoperability with other system APIs which use the convention that
an invalid sync file descriptor represents work that has already completed
and does not need to be waited for.
It is consistent with the option for implementations to return a `-1` file
descriptor when exporting a
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](VkExternalSemaphoreHandleTypeFlagBits.html) from a `VkSemaphore`
which is signaled. |

Valid Usage (Implicit)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-sType-sType) VUID-VkImportSemaphoreFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_FD_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-pNext-pNext) VUID-VkImportSemaphoreFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-semaphore-parameter) VUID-VkImportSemaphoreFdInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-flags-parameter) VUID-VkImportSemaphoreFdInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html) values

* 
[](#VUID-VkImportSemaphoreFdInfoKHR-handleType-parameter) VUID-VkImportSemaphoreFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

[VK_KHR_external_semaphore_fd](VK_KHR_external_semaphore_fd.html), [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html), [VkSemaphore](VkSemaphore.html), [VkSemaphoreImportFlags](VkSemaphoreImportFlags.html), [VkStructureType](VkStructureType.html), [vkImportSemaphoreFdKHR](vkImportSemaphoreFdKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkImportSemaphoreFdInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
