# vkGetScreenBufferPropertiesQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetScreenBufferPropertiesQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetScreenBufferPropertiesQNX - Get Properties of External Memory QNX Screen Buffers

To determine the memory parameters to use when importing a QNX Screen
buffer, call:

// Provided by VK_QNX_external_memory_screen_buffer
VkResult vkGetScreenBufferPropertiesQNX(
    VkDevice                                    device,
    const struct _screen_buffer*                buffer,
    VkScreenBufferPropertiesQNX*                pProperties);

* 
`device` is the logical device that will be importing `buffer`.

* 
`buffer` is the QNX Screen buffer which will be imported.

* 
`pProperties` is a pointer to a [VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html)
structure in which the properties of `buffer` are returned.

Valid Usage

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-buffer-08968) VUID-vkGetScreenBufferPropertiesQNX-buffer-08968

`buffer` **must** be a [valid    QNX Screen buffer](../../../../spec/latest/chapters/memory.html#memory-external-screen-buffer-validity)

Valid Usage (Implicit)

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-device-parameter) VUID-vkGetScreenBufferPropertiesQNX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-buffer-parameter) VUID-vkGetScreenBufferPropertiesQNX-buffer-parameter

 `buffer` **must** be a valid pointer to a valid `_screen_buffer` value

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-pProperties-parameter) VUID-vkGetScreenBufferPropertiesQNX-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_QNX_external_memory_screen_buffer](VK_QNX_external_memory_screen_buffer.html), [VkDevice](VkDevice.html), [VkScreenBufferPropertiesQNX](VkScreenBufferPropertiesQNX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetScreenBufferPropertiesQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
