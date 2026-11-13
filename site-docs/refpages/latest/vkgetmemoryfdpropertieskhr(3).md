# vkGetMemoryFdPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryFdPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryFdPropertiesKHR - Get Properties of External Memory File Descriptors

POSIX file descriptor memory handles compatible with Vulkan **may** also be
created by non-Vulkan APIs using methods beyond the scope of this
specification.
To determine the correct parameters to use when importing such handles,
call:

// Provided by VK_KHR_external_memory_fd
VkResult vkGetMemoryFdPropertiesKHR(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    int                                         fd,
    VkMemoryFdPropertiesKHR*                    pMemoryFdProperties);

* 
`device` is the logical device that will be importing `fd`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the type of the handle `fd`.

* 
`fd` is the handle which will be imported.

* 
`pMemoryFdProperties` is a pointer to a
[VkMemoryFdPropertiesKHR](VkMemoryFdPropertiesKHR.html) structure in which the properties of the
handle `fd` are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-fd-00673) VUID-vkGetMemoryFdPropertiesKHR-fd-00673

`fd` **must** point to a valid POSIX file descriptor memory handle

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-handleType-00674) VUID-vkGetMemoryFdPropertiesKHR-handleType-00674

`handleType` **must** not be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](VkExternalMemoryHandleTypeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-device-parameter) VUID-vkGetMemoryFdPropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-handleType-parameter) VUID-vkGetMemoryFdPropertiesKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-pMemoryFdProperties-parameter) VUID-vkGetMemoryFdPropertiesKHR-pMemoryFdProperties-parameter

 `pMemoryFdProperties` **must** be a valid pointer to a [VkMemoryFdPropertiesKHR](VkMemoryFdPropertiesKHR.html) structure

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

[VK_KHR_external_memory_fd](VK_KHR_external_memory_fd.html), [VkDevice](VkDevice.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkMemoryFdPropertiesKHR](VkMemoryFdPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryFdPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
