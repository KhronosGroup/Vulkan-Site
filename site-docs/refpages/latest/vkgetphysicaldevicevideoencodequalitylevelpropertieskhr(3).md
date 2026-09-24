# vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR - Query video encode quality level properties

To query properties for a specific video encode quality level supported by a
video encode profile, call:

// Provided by VK_KHR_video_encode_queue
VkResult vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR* pQualityLevelInfo,
    VkVideoEncodeQualityLevelPropertiesKHR*     pQualityLevelProperties);

* 
`physicalDevice` is the physical device to query the video encode
quality level properties for.

* 
`pQualityLevelInfo` is a pointer to a
[VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR](VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR.html) structure
specifying the video encode profile and quality level to query
properties for.

* 
`pQualityLevelProperties` is a pointer to a
[VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html) structure in which the
properties are returned.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-08257) VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-08257

If `pQualityLevelInfo->pVideoProfile→videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pQualityLevelProperties` **must** include a
[VkVideoEncodeH264QualityLevelPropertiesKHR](VkVideoEncodeH264QualityLevelPropertiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-08258) VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-08258

If `pQualityLevelInfo->pVideoProfile→videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pQualityLevelProperties` **must** include a
[VkVideoEncodeH265QualityLevelPropertiesKHR](VkVideoEncodeH265QualityLevelPropertiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-10305) VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-10305

If `pQualityLevelInfo->pVideoProfile→videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pQualityLevelProperties` **must** include a
[VkVideoEncodeAV1QualityLevelPropertiesKHR](VkVideoEncodeAV1QualityLevelPropertiesKHR.html) structure

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-parameter) VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelInfo-parameter

 `pQualityLevelInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR](VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelProperties-parameter) VUID-vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR-pQualityLevelProperties-parameter

 `pQualityLevelProperties` **must** be a valid pointer to a [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html) structure

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

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](VkResult.html)

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](VkResult.html)

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR](VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR.html), [VkVideoEncodeQualityLevelPropertiesKHR](VkVideoEncodeQualityLevelPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
