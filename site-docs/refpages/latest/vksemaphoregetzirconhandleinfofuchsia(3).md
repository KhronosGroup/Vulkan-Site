# VkSemaphoreGetZirconHandleInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreGetZirconHandleInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreGetZirconHandleInfoFUCHSIA - Structure describing a Zircon event handle semaphore export operation

The `VkSemaphoreGetZirconHandleInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_semaphore
typedef struct VkSemaphoreGetZirconHandleInfoFUCHSIA {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkSemaphoreGetZirconHandleInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is the semaphore from which state will be exported.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value
specifying the type of handle requested.

The properties of the Zircon event handle returned depend on the value of
`handleType`.
See [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) for a description of the
properties of the defined external semaphore handle types.

Valid Usage

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04758) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04758

`handleType` **must** have been included in
[VkExportSemaphoreCreateInfo](VkExportSemaphoreCreateInfo.html)::`handleTypes` when
`semaphore`’s current payload was created

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04759) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04759

`semaphore` **must** not currently have its payload replaced by an
imported payload as described below in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing)
unless that imported payload’s handle type was included in
[VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html)::`exportFromImportedHandleTypes`
for `handleType`

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04760) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04760

If `handleType` refers to a handle type with copy payload
transference semantics, as defined below in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing),
there **must** be no queue waiting on `semaphore`

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04761) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04761

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** be signaled, or have an
associated [semaphore signal    operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) pending execution

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04762) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-04762

`handleType` **must** be defined as a Zircon event handle

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04763) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-04763

`semaphore` **must** have been created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-sType-sType) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_GET_ZIRCON_HANDLE_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-pNext-pNext) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-parameter) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkSemaphoreGetZirconHandleInfoFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value

[VK_FUCHSIA_external_semaphore](VK_FUCHSIA_external_semaphore.html), [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [vkGetSemaphoreZirconHandleFUCHSIA](vkGetSemaphoreZirconHandleFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreGetZirconHandleInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
