# vkGetSemaphoreFdKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSemaphoreFdKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSemaphoreFdKHR - Get a POSIX file descriptor handle for a semaphore

To export a POSIX file descriptor representing the payload of a semaphore,
call:

// Provided by VK_KHR_external_semaphore_fd
VkResult vkGetSemaphoreFdKHR(
    VkDevice                                    device,
    const VkSemaphoreGetFdInfoKHR*              pGetFdInfo,
    int*                                        pFd);

* 
`device` is the logical device that created the semaphore being
exported.

* 
`pGetFdInfo` is a pointer to a [VkSemaphoreGetFdInfoKHR](VkSemaphoreGetFdInfoKHR.html)
structure containing parameters of the export operation.

* 
`pFd` will return the file descriptor representing the semaphore
payload.

Each call to `vkGetSemaphoreFdKHR` **must** create a new file descriptor
and transfer ownership of it to the application.
To avoid leaking resources, the application **must** release ownership of the
file descriptor when it is no longer needed.

|  | Ownership can be released in many ways.
| --- | --- |
For example, the application can call `close`() on the file descriptor,
or transfer ownership back to Vulkan by using the file descriptor to import
a semaphore payload. |

Where supported by the operating system, the implementation **must** set the
file descriptor to be closed automatically when an `execve` system call
is made.

Exporting a file descriptor from a semaphore **may** have side effects
depending on the transference of the specified handle type, as described in
[Importing Semaphore State](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetSemaphoreFdKHR-device-parameter) VUID-vkGetSemaphoreFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSemaphoreFdKHR-pGetFdInfo-parameter) VUID-vkGetSemaphoreFdKHR-pGetFdInfo-parameter

 `pGetFdInfo` **must** be a valid pointer to a valid [VkSemaphoreGetFdInfoKHR](VkSemaphoreGetFdInfoKHR.html) structure

* 
[](#VUID-vkGetSemaphoreFdKHR-pFd-parameter) VUID-vkGetSemaphoreFdKHR-pFd-parameter

 `pFd` **must** be a valid pointer to an `int` value

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

[VK_KHR_external_semaphore_fd](VK_KHR_external_semaphore_fd.html), [VkDevice](VkDevice.html), [VkSemaphoreGetFdInfoKHR](VkSemaphoreGetFdInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetSemaphoreFdKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
