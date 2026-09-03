# vkGetNativeBufferPropertiesOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetNativeBufferPropertiesOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetNativeBufferPropertiesOHOS - Obtain the properties of an OH_NativeBuffer Object

To determine the memory parameters to use when importing an Open Harmony OS
native buffer:

// Provided by VK_OHOS_external_memory
VkResult vkGetNativeBufferPropertiesOHOS(
    VkDevice                                    device,
    const struct OH_NativeBuffer*               buffer,
    VkNativeBufferPropertiesOHOS*               pProperties);

* 
`device` is the logical device that will be importing `buffer`.

* 
`buffer` is the `OH_NativeBuffer` object specifies the buffer
for which its properties are to be queried.

* 
`pProperties` is a pointer to a [VkNativeBufferPropertiesOHOS](VkNativeBufferPropertiesOHOS.html)
structure in which the properties of `buffer` are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetNativeBufferPropertiesOHOS-device-parameter) VUID-vkGetNativeBufferPropertiesOHOS-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetNativeBufferPropertiesOHOS-buffer-parameter) VUID-vkGetNativeBufferPropertiesOHOS-buffer-parameter

 `buffer` **must** be a valid pointer to a valid `OH_NativeBuffer` value

* 
[](#VUID-vkGetNativeBufferPropertiesOHOS-pProperties-parameter) VUID-vkGetNativeBufferPropertiesOHOS-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkNativeBufferPropertiesOHOS](VkNativeBufferPropertiesOHOS.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), [VkDevice](VkDevice.html), [VkNativeBufferPropertiesOHOS](VkNativeBufferPropertiesOHOS.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetNativeBufferPropertiesOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
