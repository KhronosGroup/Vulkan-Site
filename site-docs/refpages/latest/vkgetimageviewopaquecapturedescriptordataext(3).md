# vkGetImageViewOpaqueCaptureDescriptorDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageViewOpaqueCaptureDescriptorDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageViewOpaqueCaptureDescriptorDataEXT - Get image view opaque capture descriptor data

To get the opaque capture descriptor data for an image view, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetImageViewOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkImageViewCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkImageViewCaptureDescriptorDataInfoEXT](VkImageViewCaptureDescriptorDataInfoEXT.html) structure specifying the
image view.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-None-08080) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-None-08080

The [    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-08081) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-08081

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`imageViewCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-08082) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-08082

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageViewCaptureDescriptorDataInfoEXT](VkImageViewCaptureDescriptorDataInfoEXT.html) structure

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-parameter

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

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDevice](VkDevice.html), [VkImageViewCaptureDescriptorDataInfoEXT](VkImageViewCaptureDescriptorDataInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkGetImageViewOpaqueCaptureDescriptorDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
