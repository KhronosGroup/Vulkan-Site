# VkSemaphoreGetWin32HandleInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSemaphoreGetWin32HandleInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSemaphoreGetWin32HandleInfoKHR - Structure describing a Win32 handle semaphore export operation

The `VkSemaphoreGetWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_semaphore_win32
typedef struct VkSemaphoreGetWin32HandleInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkSemaphore                              semaphore;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkSemaphoreGetWin32HandleInfoKHR;

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

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) for a description of the
properties of the defined external semaphore handle types.

Valid Usage

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01126) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01126

`handleType` **must** have been included in
[VkExportSemaphoreCreateInfo](VkExportSemaphoreCreateInfo.html)::`handleTypes` when the
`semaphore`’s current payload was created

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01127) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01127

If `handleType` is defined as an NT handle,
[vkGetSemaphoreWin32HandleKHR](vkGetSemaphoreWin32HandleKHR.html) **must** be called no more than once for
each valid unique combination of `semaphore` and `handleType`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-01128) VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-01128

`semaphore` **must** not currently have its payload replaced by an
imported payload as described below in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing)
unless that imported payload’s handle type was included in
[VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html)::`exportFromImportedHandleTypes`
for `handleType`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01129) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01129

If `handleType` refers to a handle type with copy payload
transference semantics, as defined below in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing),
there **must** be no queue waiting on `semaphore`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01130) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01130

If `handleType` refers to a handle type with copy payload
transference semantics, `semaphore` **must** be signaled, or have an
associated [semaphore signal    operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) pending execution

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01131) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-01131

`handleType` **must** be defined as an NT handle or a global share
handle

Valid Usage (Implicit)

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-sType-sType) VUID-VkSemaphoreGetWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SEMAPHORE_GET_WIN32_HANDLE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-pNext-pNext) VUID-VkSemaphoreGetWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-parameter) VUID-VkSemaphoreGetWin32HandleInfoKHR-semaphore-parameter

 `semaphore` **must** be a valid [VkSemaphore](VkSemaphore.html) handle

* 
[](#VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-parameter) VUID-VkSemaphoreGetWin32HandleInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html) value

[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html), [VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html), [VkSemaphore](VkSemaphore.html), [VkStructureType](VkStructureType.html), [vkGetSemaphoreWin32HandleKHR](vkGetSemaphoreWin32HandleKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkSemaphoreGetWin32HandleInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
