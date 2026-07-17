# vkGetBufferOpaqueCaptureDescriptorDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetBufferOpaqueCaptureDescriptorDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetBufferOpaqueCaptureDescriptorDataEXT - Get buffer opaque capture descriptor data

To get the opaque descriptor data for a buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetBufferOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkBufferCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkBufferCaptureDescriptorDataInfoEXT](VkBufferCaptureDescriptorDataInfoEXT.html)
structure specifying the buffer.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-None-08072) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-None-08072

The [    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-08073) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-08073

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`bufferCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-08074) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-08074

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferCaptureDescriptorDataInfoEXT](VkBufferCaptureDescriptorDataInfoEXT.html) structure

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkBufferCaptureDescriptorDataInfoEXT](VkBufferCaptureDescriptorDataInfoEXT.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkGetBufferOpaqueCaptureDescriptorDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
