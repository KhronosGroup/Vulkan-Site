# vkImportFenceWin32HandleKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkImportFenceWin32HandleKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkImportFenceWin32HandleKHR - Import a fence from a Windows HANDLE

To import a fence payload from a Windows handle, call:

// Provided by VK_KHR_external_fence_win32
VkResult vkImportFenceWin32HandleKHR(
    VkDevice                                    device,
    const VkImportFenceWin32HandleInfoKHR*      pImportFenceWin32HandleInfo);

* 
`device` is the logical device that created the fence.

* 
`pImportFenceWin32HandleInfo` is a pointer to a
[VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html) structure specifying the fence and
import parameters.

Importing a fence payload from Windows handles does not transfer ownership
of the handle to the Vulkan implementation.
For handle types defined as NT handles, the application **must** release
ownership using the `CloseHandle` system call when the handle is no
longer needed.

Applications **can** import the same fence payload into multiple instances of
Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.

Valid Usage

* 
[](#VUID-vkImportFenceWin32HandleKHR-fence-04448) VUID-vkImportFenceWin32HandleKHR-fence-04448

`fence` **must** not be associated with any queue command that has not
yet completed execution on that queue

Valid Usage (Implicit)

* 
[](#VUID-vkImportFenceWin32HandleKHR-device-parameter) VUID-vkImportFenceWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkImportFenceWin32HandleKHR-pImportFenceWin32HandleInfo-parameter) VUID-vkImportFenceWin32HandleKHR-pImportFenceWin32HandleInfo-parameter

 `pImportFenceWin32HandleInfo` **must** be a valid pointer to a valid [VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html) structure

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

[VK_KHR_external_fence_win32](VK_KHR_external_fence_win32.html), [VkDevice](VkDevice.html), [VkImportFenceWin32HandleInfoKHR](VkImportFenceWin32HandleInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkImportFenceWin32HandleKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
