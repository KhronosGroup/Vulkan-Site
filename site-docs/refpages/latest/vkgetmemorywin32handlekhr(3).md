# vkGetMemoryWin32HandleKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryWin32HandleKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryWin32HandleKHR - Get a Windows HANDLE for a memory object

To export a Windows handle representing the payload of a Vulkan device
memory object, call:

// Provided by VK_KHR_external_memory_win32
VkResult vkGetMemoryWin32HandleKHR(
    VkDevice                                    device,
    const VkMemoryGetWin32HandleInfoKHR*        pGetWin32HandleInfo,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pGetWin32HandleInfo` is a pointer to a
[VkMemoryGetWin32HandleInfoKHR](VkMemoryGetWin32HandleInfoKHR.html) structure containing parameters of
the export operation.

* 
`pHandle` will return the Windows handle representing the payload of
the device memory object.

For handle types defined as NT handles, the handles returned by
`vkGetMemoryWin32HandleKHR` are owned by the application and hold a
reference to their payload.
To avoid leaking resources, the application **must** release ownership of them
using the `CloseHandle` system call when they are no longer needed.

|  | Non-NT handle types do not add a reference to their associated payload.
| --- | --- |
If the original object owning the payload is destroyed, all resources and
handles sharing that payload will become invalid. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryWin32HandleKHR-device-parameter) VUID-vkGetMemoryWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryWin32HandleKHR-pGetWin32HandleInfo-parameter) VUID-vkGetMemoryWin32HandleKHR-pGetWin32HandleInfo-parameter

 `pGetWin32HandleInfo` **must** be a valid pointer to a valid [VkMemoryGetWin32HandleInfoKHR](VkMemoryGetWin32HandleInfoKHR.html) structure

* 
[](#VUID-vkGetMemoryWin32HandleKHR-pHandle-parameter) VUID-vkGetMemoryWin32HandleKHR-pHandle-parameter

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

[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html), [VkDevice](VkDevice.html), [VkMemoryGetWin32HandleInfoKHR](VkMemoryGetWin32HandleInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryWin32HandleKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
