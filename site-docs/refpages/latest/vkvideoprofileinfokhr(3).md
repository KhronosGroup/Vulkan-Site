# VkVideoProfileInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoProfileInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoProfileInfoKHR - Structure specifying a video profile

The `VkVideoProfileInfoKHR` structure is defined as follows:

// Provided by VK_KHR_video_queue
typedef struct VkVideoProfileInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    VkVideoCodecOperationFlagBitsKHR    videoCodecOperation;
    VkVideoChromaSubsamplingFlagsKHR    chromaSubsampling;
    VkVideoComponentBitDepthFlagsKHR    lumaBitDepth;
    VkVideoComponentBitDepthFlagsKHR    chromaBitDepth;
} VkVideoProfileInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`videoCodecOperation` is a [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html)
value specifying a video codec operation.

* 
`chromaSubsampling` is a bitmask of
[VkVideoChromaSubsamplingFlagBitsKHR](VkVideoChromaSubsamplingFlagBitsKHR.html) specifying video chroma
subsampling information.

* 
`lumaBitDepth` is a bitmask of
[VkVideoComponentBitDepthFlagBitsKHR](VkVideoComponentBitDepthFlagBitsKHR.html) specifying video luma bit
depth information.

* 
`chromaBitDepth` is a bitmask of
[VkVideoComponentBitDepthFlagBitsKHR](VkVideoComponentBitDepthFlagBitsKHR.html) specifying video chroma bit
depth information.

Video profiles are provided as input to video capability queries such as
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) or
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html), as well as when creating
resources to be used by video coding operations such as images, buffers,
query pools, and video sessions.

The full description of a video profile is specified by an instance of this
structure, and the codec-specific and auxiliary structures provided in its
`pNext` chain.

When this structure is specified as an input parameter to
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html), or through the
`pProfiles` member of a [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure in the
`pNext` chain of the input parameter of a query command such as
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](vkGetPhysicalDeviceVideoFormatPropertiesKHR.html) or
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html), the following error codes
indicate specific causes of the failure of the query operation:

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](VkResult.html) specifies that the
requested video picture layout
(e.g. through the `pictureLayout` member of a
[VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html) structure included in the
`pNext` chain of `VkVideoProfileInfoKHR`)
is not supported.

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](VkResult.html) specifies that
a video profile operation specified by `videoCodecOperation` is not
supported.

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](VkResult.html) specifies that
video format parameters specified by `chromaSubsampling`,
`lumaBitDepth`, or `chromaBitDepth` are not supported.

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](VkResult.html) specifies that the
codec-specific parameters corresponding to the video codec operation are
not supported.

Valid Usage

* 
[](#VUID-VkVideoProfileInfoKHR-chromaSubsampling-07013) VUID-VkVideoProfileInfoKHR-chromaSubsampling-07013

`chromaSubsampling` **must** have a single bit set

* 
[](#VUID-VkVideoProfileInfoKHR-lumaBitDepth-07014) VUID-VkVideoProfileInfoKHR-lumaBitDepth-07014

`lumaBitDepth` **must** have a single bit set

* 
[](#VUID-VkVideoProfileInfoKHR-chromaSubsampling-07015) VUID-VkVideoProfileInfoKHR-chromaSubsampling-07015

If `chromaSubsampling` is not
[VK_VIDEO_CHROMA_SUBSAMPLING_MONOCHROME_BIT_KHR](VkVideoChromaSubsamplingFlagBitsKHR.html), then
`chromaBitDepth` **must** have a single bit set

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-07179) VUID-VkVideoProfileInfoKHR-videoCodecOperation-07179

If `videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain **must** include a [VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html) structure

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-07180) VUID-VkVideoProfileInfoKHR-videoCodecOperation-07180

If `videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain **must** include a [VkVideoDecodeH265ProfileInfoKHR](VkVideoDecodeH265ProfileInfoKHR.html) structure

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-10791) VUID-VkVideoProfileInfoKHR-videoCodecOperation-10791

If `videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain **must** include a [VkVideoDecodeVP9ProfileInfoKHR](VkVideoDecodeVP9ProfileInfoKHR.html) structure

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-09256) VUID-VkVideoProfileInfoKHR-videoCodecOperation-09256

If `videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain **must** include a [VkVideoDecodeAV1ProfileInfoKHR](VkVideoDecodeAV1ProfileInfoKHR.html) structure

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-07181) VUID-VkVideoProfileInfoKHR-videoCodecOperation-07181

If `videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain **must** include a [VkVideoEncodeH264ProfileInfoKHR](VkVideoEncodeH264ProfileInfoKHR.html) structure

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-07182) VUID-VkVideoProfileInfoKHR-videoCodecOperation-07182

If `videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain **must** include a [VkVideoEncodeH265ProfileInfoKHR](VkVideoEncodeH265ProfileInfoKHR.html) structure

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-10262) VUID-VkVideoProfileInfoKHR-videoCodecOperation-10262

If `videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the `pNext`
chain **must** include a [VkVideoEncodeAV1ProfileInfoKHR](VkVideoEncodeAV1ProfileInfoKHR.html) structure

Valid Usage (Implicit)

* 
[](#VUID-VkVideoProfileInfoKHR-sType-sType) VUID-VkVideoProfileInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoProfileInfoKHR-videoCodecOperation-parameter) VUID-VkVideoProfileInfoKHR-videoCodecOperation-parameter

 `videoCodecOperation` **must** be a valid [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html) value

* 
[](#VUID-VkVideoProfileInfoKHR-chromaSubsampling-parameter) VUID-VkVideoProfileInfoKHR-chromaSubsampling-parameter

 `chromaSubsampling` **must** be a valid combination of [VkVideoChromaSubsamplingFlagBitsKHR](VkVideoChromaSubsamplingFlagBitsKHR.html) values

* 
[](#VUID-VkVideoProfileInfoKHR-chromaSubsampling-requiredbitmask) VUID-VkVideoProfileInfoKHR-chromaSubsampling-requiredbitmask

 `chromaSubsampling` **must** not be `0`

* 
[](#VUID-VkVideoProfileInfoKHR-lumaBitDepth-parameter) VUID-VkVideoProfileInfoKHR-lumaBitDepth-parameter

 `lumaBitDepth` **must** be a valid combination of [VkVideoComponentBitDepthFlagBitsKHR](VkVideoComponentBitDepthFlagBitsKHR.html) values

* 
[](#VUID-VkVideoProfileInfoKHR-lumaBitDepth-requiredbitmask) VUID-VkVideoProfileInfoKHR-lumaBitDepth-requiredbitmask

 `lumaBitDepth` **must** not be `0`

* 
[](#VUID-VkVideoProfileInfoKHR-chromaBitDepth-parameter) VUID-VkVideoProfileInfoKHR-chromaBitDepth-parameter

 `chromaBitDepth` **must** be a valid combination of [VkVideoComponentBitDepthFlagBitsKHR](VkVideoComponentBitDepthFlagBitsKHR.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR](VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR.html), [VkStructureType](VkStructureType.html), [VkVideoChromaSubsamplingFlagsKHR](VkVideoChromaSubsamplingFlagsKHR.html), [VkVideoCodecOperationFlagBitsKHR](VkVideoCodecOperationFlagBitsKHR.html), [VkVideoComponentBitDepthFlagsKHR](VkVideoComponentBitDepthFlagsKHR.html), [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html), [VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html), [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoProfileInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
