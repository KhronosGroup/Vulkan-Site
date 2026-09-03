# vkGetImageOpaqueCaptureDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetImageOpaqueCaptureDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetImageOpaqueCaptureDataEXT - Get image opaque capture descriptor data for descriptor heap replay

To get the opaque capture descriptor data for images, call:

// Provided by VK_EXT_descriptor_heap
VkResult vkGetImageOpaqueCaptureDataEXT(
    VkDevice                                    device,
    uint32_t                                    imageCount,
    const VkImage*                              pImages,
    VkHostAddressRangeEXT*                      pDatas);

* 
`device` is the logical device that gets the data.

* 
`imageCount` is the number of images to retrieve data from.

* 
`pImages` is a pointer to an array of [VkImage](VkImage.html) objects to
retrieve the opaque capture data from.

* 
`pDatas` is a pointer to an array of [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html)
structures defining the host address ranges where each image’s opaque
capture data will be written.

Valid Usage

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-descriptorHeapCaptureReplay-11282) VUID-vkGetImageOpaqueCaptureDataEXT-descriptorHeapCaptureReplay-11282

The [    `descriptorHeapCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorHeapCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-size-11283) VUID-vkGetImageOpaqueCaptureDataEXT-size-11283

The `size` member of each element of `pDatas` **must** be equal to
[    `imageCaptureReplayOpaqueDataSize`](../../../../spec/latest/chapters/limits.html#limits-imageCaptureReplayOpaqueDataSize)

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-device-11284) VUID-vkGetImageOpaqueCaptureDataEXT-device-11284

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pImages-11285) VUID-vkGetImageOpaqueCaptureDataEXT-pImages-11285

Each element of `pImages` **must** have been created with
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) set in
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-device-parameter) VUID-vkGetImageOpaqueCaptureDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parameter) VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parameter

 `pImages` **must** be a valid pointer to an array of `imageCount` valid [VkImage](VkImage.html) handles

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pDatas-parameter) VUID-vkGetImageOpaqueCaptureDataEXT-pDatas-parameter

 `pDatas` **must** be a valid pointer to an array of `imageCount` [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html) structures

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-imageCount-arraylength) VUID-vkGetImageOpaqueCaptureDataEXT-imageCount-arraylength

 `imageCount` **must** be greater than `0`

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parent) VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parent

 Each element of `pImages` **must** have been created, allocated, or retrieved from `device`

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

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDevice](VkDevice.html), [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html), [VkImage](VkImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetImageOpaqueCaptureDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
