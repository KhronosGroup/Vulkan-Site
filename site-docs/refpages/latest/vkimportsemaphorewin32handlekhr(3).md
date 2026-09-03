# vkImportSemaphoreWin32HandleKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkImportSemaphoreWin32HandleKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkImportSemaphoreWin32HandleKHR - Import a semaphore from a Windows HANDLE

To import a semaphore payload from a Windows handle, call:

// Provided by VK_KHR_external_semaphore_win32
VkResult vkImportSemaphoreWin32HandleKHR(
    VkDevice                                    device,
    const VkImportSemaphoreWin32HandleInfoKHR*  pImportSemaphoreWin32HandleInfo);

* 
`device` is the logical device that created the semaphore.

* 
`pImportSemaphoreWin32HandleInfo` is a pointer to a
[VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html) structure specifying the
semaphore and import parameters.

Importing a semaphore payload from Windows handles does not transfer
ownership of the handle to the Vulkan implementation.
For handle types defined as NT handles, the application **must** release
ownership using the `CloseHandle` system call when the handle is no
longer needed.

Applications **can** import the same semaphore payload into multiple instances
of Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage (Implicit)

* 
[](#VUID-vkImportSemaphoreWin32HandleKHR-device-parameter) VUID-vkImportSemaphoreWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkImportSemaphoreWin32HandleKHR-pImportSemaphoreWin32HandleInfo-parameter) VUID-vkImportSemaphoreWin32HandleKHR-pImportSemaphoreWin32HandleInfo-parameter

 `pImportSemaphoreWin32HandleInfo` **must** be a valid pointer to a valid [VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_external_semaphore_win32](VK_KHR_external_semaphore_win32.html), [VkDevice](VkDevice.html), [VkImportSemaphoreWin32HandleInfoKHR](VkImportSemaphoreWin32HandleInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkImportSemaphoreWin32HandleKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
