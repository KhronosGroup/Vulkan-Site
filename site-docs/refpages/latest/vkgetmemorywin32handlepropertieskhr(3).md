# vkGetMemoryWin32HandlePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryWin32HandlePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryWin32HandlePropertiesKHR - Get Properties of External Memory Win32 Handles

Windows memory handles compatible with Vulkan **may** also be created by
non-Vulkan APIs using methods beyond the scope of this specification.
To determine the correct parameters to use when importing such handles,
call:

// Provided by VK_KHR_external_memory_win32
VkResult vkGetMemoryWin32HandlePropertiesKHR(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    HANDLE                                      handle,
    VkMemoryWin32HandlePropertiesKHR*           pMemoryWin32HandleProperties);

* 
`device` is the logical device that will be importing `handle`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of the handle `handle`.

* 
`handle` is the handle which will be imported.

* 
`pMemoryWin32HandleProperties` is a pointer to a
[VkMemoryWin32HandlePropertiesKHR](VkMemoryWin32HandlePropertiesKHR.html) structure in which properties of
`handle` are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-handle-00665) VUID-vkGetMemoryWin32HandlePropertiesKHR-handle-00665

`handle` **must** point to a valid Windows memory handle

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-00666) VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-00666

`handleType` **must** not be one of the handle types defined as opaque

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-device-parameter) VUID-vkGetMemoryWin32HandlePropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-parameter) VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-pMemoryWin32HandleProperties-parameter) VUID-vkGetMemoryWin32HandlePropertiesKHR-pMemoryWin32HandleProperties-parameter

 `pMemoryWin32HandleProperties` **must** be a valid pointer to a [VkMemoryWin32HandlePropertiesKHR](VkMemoryWin32HandlePropertiesKHR.html) structure

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

[VK_KHR_external_memory_win32](VK_KHR_external_memory_win32.html), [VkDevice](VkDevice.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkMemoryWin32HandlePropertiesKHR](VkMemoryWin32HandlePropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryWin32HandlePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
