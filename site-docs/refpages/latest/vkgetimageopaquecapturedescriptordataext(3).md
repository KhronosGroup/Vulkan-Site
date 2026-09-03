# vkGetImageOpaqueCaptureDescriptorDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageOpaqueCaptureDescriptorDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageOpaqueCaptureDescriptorDataEXT - Get image opaque capture descriptor data

To get the opaque capture descriptor data for an image, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetImageOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkImageCaptureDescriptorDataInfoEXT*  pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkImageCaptureDescriptorDataInfoEXT](VkImageCaptureDescriptorDataInfoEXT.html)
structure specifying the image.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-None-08076) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-None-08076

The [    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-08077) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-08077

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`imageCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-08078) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-08078

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageCaptureDescriptorDataInfoEXT](VkImageCaptureDescriptorDataInfoEXT.html) structure

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-parameter

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

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDevice](VkDevice.html), [VkImageCaptureDescriptorDataInfoEXT](VkImageCaptureDescriptorDataInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkGetImageOpaqueCaptureDescriptorDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
