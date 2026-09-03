# vkGetSemaphoreWin32HandleKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSemaphoreWin32HandleKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSemaphoreWin32HandleKHR - Get a Windows HANDLE for a semaphore

To export a Windows handle representing the payload of a semaphore, call:

// Provided by VK_KHR_external_semaphore_win32
VkResult vkGetSemaphoreWin32HandleKHR(
    VkDevice                                    device,
    const VkSemaphoreGetWin32HandleInfoKHR*     pGetWin32HandleInfo,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that created the semaphore being
exported.

* 
`pGetWin32HandleInfo` is a pointer to a
[VkSemaphoreGetWin32HandleInfoKHR](VkSemaphoreGetWin32HandleInfoKHR.html) structure containing parameters
of the export operation.

* 
`pHandle` will return the Windows handle representing the semaphore
state.

For handle types defined as NT handles, the handles returned by
`vkGetSemaphoreWin32HandleKHR` are owned by the application.
To avoid leaking resources, the application **must** release ownership of them
using the `CloseHandle` system call when they are no longer needed.

Exporting a Windows handle from a semaphore **may** have side effects depending
on the transference of the specified handle type, as described in
[Importing Semaphore Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreWin32HandleKHR-device-parameter) VUID-vkGetSemaphoreWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSemaphoreWin32HandleKHR-pGetWin32HandleInfo-parameter) VUID-vkGetSemaphoreWin32HandleKHR-pGetWin32HandleInfo-parameter

 `pGetWin32HandleInfo` **must** be a valid pointer to a valid [VkSemaphoreGetWin32HandleInfoKHR](VkSemaphoreGetWin32HandleInfoKHR.html) structure

* 
[](#VUID-vkGetSemaphoreWin32HandleKHR-pHandle-parameter) VUID-vkGetSemaphoreWin32HandleKHR-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `HANDLE` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html), [VkDevice](VkDevice.html), [VkSemaphoreGetWin32HandleInfoKHR](VkSemaphoreGetWin32HandleInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetSemaphoreWin32HandleKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
