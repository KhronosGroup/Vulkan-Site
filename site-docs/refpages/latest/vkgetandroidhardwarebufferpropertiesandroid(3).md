# vkGetAndroidHardwareBufferPropertiesANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetAndroidHardwareBufferPropertiesANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetAndroidHardwareBufferPropertiesANDROID - Get Properties of External Memory Android Hardware Buffers

To determine the memory parameters to use when importing an Android hardware
buffer, call:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
VkResult vkGetAndroidHardwareBufferPropertiesANDROID(
    VkDevice                                    device,
    const struct AHardwareBuffer*               buffer,
    VkAndroidHardwareBufferPropertiesANDROID*   pProperties);

* 
`device` is the logical device that will be importing `buffer`.

* 
`buffer` is the Android hardware buffer which will be imported.

* 
`pProperties` is a pointer to a
[VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html) structure in which the
properties of `buffer` are returned.

Valid Usage

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-01884) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-01884

`buffer` **must** be a valid Android hardware buffer object with at
least one of the `AHARDWAREBUFFER_USAGE_GPU_*` flags in its
`AHardwareBuffer_Desc`::`usage`

Valid Usage (Implicit)

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-device-parameter) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-parameter) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-parameter

 `buffer` **must** be a valid pointer to a valid `AHardwareBuffer` value

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-pProperties-parameter) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html) structure

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

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VkAndroidHardwareBufferPropertiesANDROID](VkAndroidHardwareBufferPropertiesANDROID.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetAndroidHardwareBufferPropertiesANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
