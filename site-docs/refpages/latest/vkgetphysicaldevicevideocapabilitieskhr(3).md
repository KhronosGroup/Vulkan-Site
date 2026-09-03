# vkGetPhysicalDeviceVideoCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceVideoCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceVideoCapabilitiesKHR - Query video coding capabilities

To query video coding capabilities for a specific video profile, call:

// Provided by VK_KHR_video_queue
VkResult vkGetPhysicalDeviceVideoCapabilitiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkVideoProfileInfoKHR*                pVideoProfile,
    VkVideoCapabilitiesKHR*                     pCapabilities);

* 
`physicalDevice` is the physical device from which to query the
video decode or encode capabilities.

* 
`pVideoProfile` is a pointer to a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structure.

* 
`pCapabilities` is a pointer to a [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)
structure in which the capabilities are returned.

If the [video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles) described by `pVideoProfile` is
supported by the implementation, then this command returns [VK_SUCCESS](VkResult.html)
and `pCapabilities` is filled with the capabilities supported with the
specified video profile.
Otherwise, one of the [video-profile-specific error codes](../../../../spec/latest/chapters/videocoding.html#video-profile-error-codes) are returned.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07183) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07183

If `pVideoProfile->videoCodecOperation` specifies a decode
operation, then the `pNext` chain of `pCapabilities` **must**
include a [VkVideoDecodeCapabilitiesKHR](VkVideoDecodeCapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07184) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07184

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pCapabilities` **must** include a
[VkVideoDecodeH264CapabilitiesKHR](VkVideoDecodeH264CapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07185) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07185

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pCapabilities` **must** include a
[VkVideoDecodeH265CapabilitiesKHR](VkVideoDecodeH265CapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-10792) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-10792

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pCapabilities` **must** include a
[VkVideoDecodeVP9CapabilitiesKHR](VkVideoDecodeVP9CapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-09257) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-09257

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pCapabilities` **must** include a
[VkVideoDecodeAV1CapabilitiesKHR](VkVideoDecodeAV1CapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07186) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07186

If `pVideoProfile->videoCodecOperation` specifies an encode
operation, then the `pNext` chain of `pCapabilities` **must**
include a [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07187) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07187

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pCapabilities` **must** include a
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07188) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-07188

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pCapabilities` **must** include a
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-10263) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-10263

If `pVideoProfile->videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain of `pCapabilities` **must** include a
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pNext-10921) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pNext-10921

If the `pNext` chain of `pVideoProfile` includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html) structure, then the
[`videoEncodeRgbConversion`](../../../../spec/latest/chapters/features.html#features-videoEncodeRgbConversion)
feature **must** be supported

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-parameter) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pVideoProfile-parameter

 `pVideoProfile` **must** be a valid pointer to a valid [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pCapabilities-parameter) VUID-vkGetPhysicalDeviceVideoCapabilitiesKHR-pCapabilities-parameter

 `pCapabilities` **must** be a valid pointer to a [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html) structure

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

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html), [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#vkGetPhysicalDeviceVideoCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
