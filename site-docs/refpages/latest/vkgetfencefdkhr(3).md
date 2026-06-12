# vkGetFenceFdKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetFenceFdKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetFenceFdKHR - Get a POSIX file descriptor handle for a fence

To export a POSIX file descriptor representing the payload of a fence, call:

// Provided by VK_KHR_external_fence_fd
VkResult vkGetFenceFdKHR(
    VkDevice                                    device,
    const VkFenceGetFdInfoKHR*                  pGetFdInfo,
    int*                                        pFd);

* 
`device` is the logical device that created the fence being
exported.

* 
`pGetFdInfo` is a pointer to a [VkFenceGetFdInfoKHR](VkFenceGetFdInfoKHR.html) structure
containing parameters of the export operation.

* 
`pFd` will return the file descriptor representing the fence
payload.

Each call to `vkGetFenceFdKHR` **must** create a new file descriptor and
transfer ownership of it to the application.
To avoid leaking resources, the application **must** release ownership of the
file descriptor when it is no longer needed.

|  | Ownership can be released in many ways.
| --- | --- |
For example, the application can call `close`() on the file descriptor,
or transfer ownership back to Vulkan by using the file descriptor to import
a fence payload. |

If `pGetFdInfo->handleType` is
[VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](VkExternalFenceHandleTypeFlagBits.html) and the fence is signaled at
the time `vkGetFenceFdKHR` is called, `pFd` **may** return the value
`-1` instead of a valid file descriptor.

Where supported by the operating system, the implementation **must** set the
file descriptor to be closed automatically when an `execve` system call
is made.

Exporting a file descriptor from a fence **may** have side effects depending on
the transference of the specified handle type, as described in
[Importing Fence State](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-importing).

Valid Usage (Implicit)

* 
[](#VUID-vkGetFenceFdKHR-device-parameter) VUID-vkGetFenceFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetFenceFdKHR-pGetFdInfo-parameter) VUID-vkGetFenceFdKHR-pGetFdInfo-parameter

 `pGetFdInfo` **must** be a valid pointer to a valid [VkFenceGetFdInfoKHR](VkFenceGetFdInfoKHR.html) structure

* 
[](#VUID-vkGetFenceFdKHR-pFd-parameter) VUID-vkGetFenceFdKHR-pFd-parameter

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

[VK_KHR_external_fence_fd](VK_KHR_external_fence_fd.html), [VkDevice](VkDevice.html), [VkFenceGetFdInfoKHR](VkFenceGetFdInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkGetFenceFdKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
