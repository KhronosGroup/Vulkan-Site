# VkImportFenceFdInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportFenceFdInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportFenceFdInfoKHR - (None)

The `VkImportFenceFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_fence_fd
typedef struct VkImportFenceFdInfoKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    VkFence                              fence;
    VkFenceImportFlags                   flags;
    VkExternalFenceHandleTypeFlagBits    handleType;
    int                                  fd;
} VkImportFenceFdInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fence` is the fence into which the payload will be imported.

* 
`flags` is a bitmask of [VkFenceImportFlagBits](VkFenceImportFlagBits.html) specifying
additional parameters for the fence payload import operation.

* 
`handleType` is a [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) value
specifying the type of `fd`.

* 
`fd` is the external handle to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalFenceHandleTypeFlagBits.html) | Reference | Temporary,Permanent |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](VkExternalFenceHandleTypeFlagBits.html) | Copy | Temporary |

Valid Usage

* 
[](#VUID-VkImportFenceFdInfoKHR-handleType-01464) VUID-VkImportFenceFdInfoKHR-handleType-01464

`handleType` **must** be a value included in the
[Handle Types Supported by    `VkImportFenceFdInfoKHR`](../../../../spec/latest/chapters/synchronization.html#synchronization-fence-handletypes-fd) table

* 
[](#VUID-VkImportFenceFdInfoKHR-fd-01541) VUID-VkImportFenceFdInfoKHR-fd-01541

`fd` **must** obey any requirements listed for `handleType` in
[external fence handle types    compatibility](../../../../spec/latest/chapters/capabilities.html#external-fence-handle-types-compatibility)

* 
[](#VUID-VkImportFenceFdInfoKHR-handleType-07306) VUID-VkImportFenceFdInfoKHR-handleType-07306

If `handleType` refers to a handle type with copy payload
transference semantics, `flags` **must** contain
[VK_FENCE_IMPORT_TEMPORARY_BIT](VkFenceImportFlagBits.html)

If `handleType` is [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](VkExternalFenceHandleTypeFlagBits.html), the
special value `-1` for `fd` is treated like a valid sync file descriptor
referring to an object that has already signaled.
The import operation will succeed and the `VkFence` will have a
temporarily imported payload as if a valid file descriptor had been
provided.

|  | This special behavior for importing an invalid sync file descriptor allows
| --- | --- |
easier interoperability with other system APIs which use the convention that
an invalid sync file descriptor represents work that has already completed
and does not need to be waited for.
It is consistent with the option for implementations to return a `-1` file
descriptor when exporting a [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](VkExternalFenceHandleTypeFlagBits.html)
from a `VkFence` which is signaled. |

Valid Usage (Implicit)

* 
[](#VUID-VkImportFenceFdInfoKHR-sType-sType) VUID-VkImportFenceFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_FENCE_FD_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkImportFenceFdInfoKHR-pNext-pNext) VUID-VkImportFenceFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportFenceFdInfoKHR-fence-parameter) VUID-VkImportFenceFdInfoKHR-fence-parameter

 `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-VkImportFenceFdInfoKHR-flags-parameter) VUID-VkImportFenceFdInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkFenceImportFlagBits](VkFenceImportFlagBits.html) values

* 
[](#VUID-VkImportFenceFdInfoKHR-handleType-parameter) VUID-VkImportFenceFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html) value

Host Synchronization

* 
Host access to `fence` **must** be externally synchronized

[VK_KHR_external_fence_fd](VK_KHR_external_fence_fd.html), [VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html), [VkFence](VkFence.html), [VkFenceImportFlags](VkFenceImportFlags.html), [VkStructureType](VkStructureType.html), [vkImportFenceFdKHR](vkImportFenceFdKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkImportFenceFdInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
