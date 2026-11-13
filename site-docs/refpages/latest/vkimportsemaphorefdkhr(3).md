# vkImportSemaphoreFdKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkImportSemaphoreFdKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkImportSemaphoreFdKHR - Import a semaphore from a POSIX file descriptor

To import a semaphore payload from a POSIX file descriptor, call:

// Provided by VK_KHR_external_semaphore_fd
VkResult vkImportSemaphoreFdKHR(
    VkDevice                                    device,
    const VkImportSemaphoreFdInfoKHR*           pImportSemaphoreFdInfo);

* 
`device` is the logical device that created the semaphore.

* 
`pImportSemaphoreFdInfo` is a pointer to a
[VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html) structure specifying the semaphore and
import parameters.

Importing a semaphore payload from a file descriptor transfers ownership of
the file descriptor from the application to the Vulkan implementation.
The application **must** not perform any operations on the file descriptor
after a successful import.

Applications **can** import the same semaphore payload into multiple instances
of Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportSemaphoreFdKHR-semaphore-01142) VUID-vkImportSemaphoreFdKHR-semaphore-01142

`semaphore` **must** not be associated with any queue command that has
not yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportSemaphoreFdKHR-device-parameter) VUID-vkImportSemaphoreFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkImportSemaphoreFdKHR-pImportSemaphoreFdInfo-parameter) VUID-vkImportSemaphoreFdKHR-pImportSemaphoreFdInfo-parameter

 `pImportSemaphoreFdInfo` **must** be a valid pointer to a valid [VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html) structure

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

[VK_KHR_external_semaphore_fd](VK_KHR_external_semaphore_fd.html), [VkDevice](VkDevice.html), [VkImportSemaphoreFdInfoKHR](VkImportSemaphoreFdInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkImportSemaphoreFdKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
