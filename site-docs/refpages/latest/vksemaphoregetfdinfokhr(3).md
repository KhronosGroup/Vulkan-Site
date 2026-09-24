# VkSemaphoreGetFdInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreGetFdInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreGetFdInfoKHR - Structure describing a POSIX FD semaphore export operation

The `VkSemaphoreGetFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_fd
typedef struct VkSemaphoreGetFdInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkSemaphoreGetFdInfoKHR;

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

The properties of the file descriptor returned depend on the value of
`handleType`.
See [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) for a description of the
properties of the defined external semaphore handle types.

Valid Usage

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01132) VUID-VkSemaphoreGetFdInfoKHR-handleType-01132

`handleType` **must** have been included in
[VkExportSemaphoreCreateInfo](VkExportSemaphoreCreateInfo.html)::`handleTypes` when
`semaphore`’s current payload was created

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-semaphore-01133) VUID-VkSemaphoreGetFdInfoKHR-semaphore-01133

`semaphore` **must** not currently have its payload replaced by an
imported payload as described below in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing)
unless that imported payload’s handle type was included in
[VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html)::`exportFromImportedHandleTypes`
for `handleType`

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01134) VUID-VkSemaphoreGetFdInfoKHR-handleType-01134

If `handleType` refers to a handle type with copy payload
transference semantics, as defined below in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing),
there **must** be no queue waiting on `semaphore`

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01135) VUID-VkSemaphoreGetFdInfoKHR-handleType-01135

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** be signaled, or have an
associated [semaphore signal    operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) pending execution

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-01136) VUID-VkSemaphoreGetFdInfoKHR-handleType-01136

`handleType` **must** be defined as a POSIX file descriptor handle

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-03253) VUID-VkSemaphoreGetFdInfoKHR-handleType-03253

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** have been created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html)

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-03254) VUID-VkSemaphoreGetFdInfoKHR-handleType-03254

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** have an associated
semaphore signal operation that has been submitted for execution and any
semaphore signal operations on which it depends **must** have also been
submitted for execution

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-sType-sType) VUID-VkSemaphoreGetFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_GET_FD_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-pNext-pNext) VUID-VkSemaphoreGetFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-semaphore-parameter) VUID-VkSemaphoreGetFdInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkSemaphoreGetFdInfoKHR-handleType-parameter) VUID-VkSemaphoreGetFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value

[VK_KHR_external_semaphore_fd](VK_KHR_external_semaphore_fd.html), [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [vkGetSemaphoreFdKHR](vkGetSemaphoreFdKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreGetFdInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
