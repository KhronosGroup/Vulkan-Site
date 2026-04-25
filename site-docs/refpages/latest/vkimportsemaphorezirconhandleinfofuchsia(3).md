# VkImportSemaphoreZirconHandleInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImportSemaphoreZirconHandleInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImportSemaphoreZirconHandleInfoFUCHSIA - Structure specifying Zircon event handle to import to a semaphore

The `VkImportSemaphoreZirconHandleInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_semaphore
typedef struct VkImportSemaphoreZirconHandleInfoFUCHSIA {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkSemaphoreImportFlags                   flags;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
    zx_handle_t                              zirconHandle;
} VkImportSemaphoreZirconHandleInfoFUCHSIA;

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
specifying the type of `zirconHandle`.

* 
`zirconHandle` is the external handle to import.

The handle types supported by `handleType` are:

| Handle Type | Transference | Permanence Supported |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA](VkExternalSemaphoreHandleTypeFlagBits.html) | Reference | Temporary,Permanent |

Valid Usage

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-04765) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-04765

`handleType` **must** be a value included in the
[Handle Types Supported    by `VkImportSemaphoreZirconHandleInfoFUCHSIA`](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphore-handletypes-fuchsia) table

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04766) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04766

`zirconHandle` **must** obey any requirements listed for
`handleType` in [    external semaphore handle types compatibility](../../../../spec/latest/chapters/capabilities.html#external-semaphore-handle-types-compatibility)

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04767) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-zirconHandle-04767

`zirconHandle` **must** have `ZX_RIGHTS_BASIC` and
`ZX_RIGHTS_SIGNAL` rights

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphoreType-04768) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphoreType-04768

The [VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)::`semaphoreType` field **must** not
be [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-sType-sType) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-pNext-pNext) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphore-parameter) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-flags-parameter) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-flags-parameter

 `flags` **must** be a valid combination of [VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html) values

* 
[](#VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkImportSemaphoreZirconHandleInfoFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value

Host Synchronization

* 
Host access to `semaphore` **must** be externally synchronized

[VK_FUCHSIA_external_semaphore](VK_FUCHSIA_external_semaphore.html), [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html), [VkSemaphore](VkSemaphore.html), [VkSemaphoreImportFlags](VkSemaphoreImportFlags.html), [VkStructureType](VkStructureType.html), [vkImportSemaphoreZirconHandleFUCHSIA](vkImportSemaphoreZirconHandleFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkImportSemaphoreZirconHandleInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
