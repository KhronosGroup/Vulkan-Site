# vkGetFenceWin32HandleKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetFenceWin32HandleKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetFenceWin32HandleKHR - Get a Windows HANDLE for a fence

To export a Windows handle representing the state of a fence, call:

// Provided by VK_KHR_external_fence_win32
VkResult vkGetFenceWin32HandleKHR(
    VkDevice                                    device,
    const VkFenceGetWin32HandleInfoKHR*         pGetWin32HandleInfo,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that created the fence being
exported.

* 
`pGetWin32HandleInfo` is a pointer to a
[VkFenceGetWin32HandleInfoKHR](VkFenceGetWin32HandleInfoKHR.html) structure containing parameters of
the export operation.

* 
`pHandle` will return the Windows handle representing the fence
state.

For handle types defined as NT handles, the handles returned by
`vkGetFenceWin32HandleKHR` are owned by the application.
To avoid leaking resources, the application **must** release ownership of them
using the `CloseHandle` system call when they are no longer needed.

Exporting a Windows handle from a fence **may** have side effects depending on
the transference of the specified handle type, as described in
[Importing Fence Payloads](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFenceWin32HandleKHR-device-parameter) VUID-vkGetFenceWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetFenceWin32HandleKHR-pGetWin32HandleInfo-parameter) VUID-vkGetFenceWin32HandleKHR-pGetWin32HandleInfo-parameter

 `pGetWin32HandleInfo` **must** be a valid pointer to a valid [VkFenceGetWin32HandleInfoKHR](VkFenceGetWin32HandleInfoKHR.html) structure

* 
[](#VUID-vkGetFenceWin32HandleKHR-pHandle-parameter) VUID-vkGetFenceWin32HandleKHR-pHandle-parameter

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

[VK_KHR_external_fence_win32](VK_KHR_external_fence_win32.html), [VkDevice](VkDevice.html), [VkFenceGetWin32HandleInfoKHR](VkFenceGetWin32HandleInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetFenceWin32HandleKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
