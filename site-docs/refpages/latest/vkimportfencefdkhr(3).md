# vkImportFenceFdKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkImportFenceFdKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkImportFenceFdKHR - Import a fence from a POSIX file descriptor

To import a fence payload from a POSIX file descriptor, call:

// Provided by VK_KHR_external_fence_fd
VkResult vkImportFenceFdKHR(
    VkDevice                                    device,
    const VkImportFenceFdInfoKHR*               pImportFenceFdInfo);

* 
`device` is the logical device that created the fence.

* 
`pImportFenceFdInfo` is a pointer to a [VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html)
structure specifying the fence and import parameters.

Importing a fence payload from a file descriptor transfers ownership of the
file descriptor from the application to the Vulkan implementation.
The application **must** not perform any operations on the file descriptor
after a successful import.

Applications **can** import the same fence payload into multiple instances of
Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportFenceFdKHR-fence-01463) VUID-vkImportFenceFdKHR-fence-01463

`fence` **must** not be associated with any queue command that has not
yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportFenceFdKHR-device-parameter) VUID-vkImportFenceFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkImportFenceFdKHR-pImportFenceFdInfo-parameter) VUID-vkImportFenceFdKHR-pImportFenceFdInfo-parameter

 `pImportFenceFdInfo` **must** be a valid pointer to a valid [VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html) structure

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

[VK_KHR_external_fence_fd](VK_KHR_external_fence_fd.html), [VkDevice](VkDevice.html), [VkImportFenceFdInfoKHR](VkImportFenceFdInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkImportFenceFdKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
