# vkGetTensorOpaqueCaptureDescriptorDataARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetTensorOpaqueCaptureDescriptorDataARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetTensorOpaqueCaptureDescriptorDataARM - Get tensor opaque capture descriptor data

To get the opaque capture descriptor data for a tensor, call:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
VkResult vkGetTensorOpaqueCaptureDescriptorDataARM(
    VkDevice                                    device,
    const VkTensorCaptureDescriptorDataInfoARM* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkTensorCaptureDescriptorDataInfoARM](VkTensorCaptureDescriptorDataInfoARM.html)
structure specifying the tensor.

* 
`pData` is a pointer to a user-allocated buffer where the data will
be written.

Valid Usage

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09702) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09702

The [`descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer)
and [    `descriptorBufferTensorDescriptors`](../../../../spec/latest/chapters/features.html#features-descriptorBufferTensorDescriptors) features **must** be enabled

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-09703) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-09703

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferTensorPropertiesARM](VkPhysicalDeviceDescriptorBufferTensorPropertiesARM.html)::`tensorCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-09704) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-09704

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pInfo-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkTensorCaptureDescriptorDataInfoARM](VkTensorCaptureDescriptorDataInfoARM.html) structure

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-parameter

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

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDevice](VkDevice.html), [VkTensorCaptureDescriptorDataInfoARM](VkTensorCaptureDescriptorDataInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkGetTensorOpaqueCaptureDescriptorDataARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
