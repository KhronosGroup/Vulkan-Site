# vkGetTensorOpaqueCaptureDataARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetTensorOpaqueCaptureDataARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetTensorOpaqueCaptureDataARM - Get tensor opaque capture descriptor data for descriptor heap replay

To get the opaque capture descriptor data for tensors, call:

// Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
VkResult vkGetTensorOpaqueCaptureDataARM(
    VkDevice                                    device,
    uint32_t                                    tensorCount,
    const VkTensorARM*                          pTensors,
    VkHostAddressRangeEXT*                      pDatas);

* 
`device` is the logical device that gets the data.

* 
`tensorCount` is the number of tensors to retrieve data from.

* 
`pTensors` is a pointer to an array of [VkTensorARM](VkTensorARM.html) objects to
retrieve the opaque capture data from.

* 
`pDatas` is a pointer to an array of [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html)
structures defining the host address ranges where each tensor’s opaque
capture data will be written.

Valid Usage

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-descriptorHeapCaptureReplay-11391) VUID-vkGetTensorOpaqueCaptureDataARM-descriptorHeapCaptureReplay-11391

The [    `descriptorHeapCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorHeapCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-size-11392) VUID-vkGetTensorOpaqueCaptureDataARM-size-11392

The `size` member of each element of `pDatas` **must** be equal to
[    `tensorCaptureReplayOpaqueDataSize`](../../../../spec/latest/chapters/limits.html#limits-tensorCaptureReplayOpaqueDataSize)

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-device-11393) VUID-vkGetTensorOpaqueCaptureDataARM-device-11393

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-11394) VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-11394

Each element of `pTensors` **must** have been created with
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) set in
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-device-parameter) VUID-vkGetTensorOpaqueCaptureDataARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parameter) VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parameter

 `pTensors` **must** be a valid pointer to an array of `tensorCount` valid [VkTensorARM](VkTensorARM.html) handles

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pDatas-parameter) VUID-vkGetTensorOpaqueCaptureDataARM-pDatas-parameter

 `pDatas` **must** be a valid pointer to an array of `tensorCount` [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html) structures

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-tensorCount-arraylength) VUID-vkGetTensorOpaqueCaptureDataARM-tensorCount-arraylength

 `tensorCount` **must** be greater than `0`

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parent) VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parent

 Each element of `pTensors` **must** have been created, allocated, or retrieved from `device`

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

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDevice](VkDevice.html), [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html), [VkTensorARM](VkTensorARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetTensorOpaqueCaptureDataARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
