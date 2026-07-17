# vkGetMemoryNativeBufferOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryNativeBufferOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryNativeBufferOHOS - Obtain an OH_NativeBuffer object

To obtain an OH_NativeBuffer object, call:

// Provided by VK_OHOS_external_memory
VkResult vkGetMemoryNativeBufferOHOS(
    VkDevice                                    device,
    const VkMemoryGetNativeBufferInfoOHOS*      pInfo,
    struct OH_NativeBuffer**                    pBuffer);

* 
`device` is a valid Vulkan device object.

* 
`pInfo` is a pointer pointing to a
`VkMemoryGetNativeBufferInfoOHOS` structure.

* 
`pBuffer` is a pointer to an `OH_NativeBuffer` object.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryNativeBufferOHOS-device-parameter) VUID-vkGetMemoryNativeBufferOHOS-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryNativeBufferOHOS-pInfo-parameter) VUID-vkGetMemoryNativeBufferOHOS-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkMemoryGetNativeBufferInfoOHOS](VkMemoryGetNativeBufferInfoOHOS.html) structure

* 
[](#VUID-vkGetMemoryNativeBufferOHOS-pBuffer-parameter) VUID-vkGetMemoryNativeBufferOHOS-pBuffer-parameter

 `pBuffer` **must** be a valid pointer to a valid pointer to an `OH_NativeBuffer` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), [VkDevice](VkDevice.html), [VkMemoryGetNativeBufferInfoOHOS](VkMemoryGetNativeBufferInfoOHOS.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetMemoryNativeBufferOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
