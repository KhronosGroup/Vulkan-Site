# VkVideoEncodeH264RateControlInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264RateControlInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264RateControlInfoKHR - Structure describing H.264 stream rate control parameters

The `VkVideoEncodeH264RateControlInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264RateControlInfoKHR {
    VkStructureType                         sType;
    const void*                             pNext;
    VkVideoEncodeH264RateControlFlagsKHR    flags;
    uint32_t                                gopFrameCount;
    uint32_t                                idrPeriod;
    uint32_t                                consecutiveBFrameCount;
    uint32_t                                temporalLayerCount;
} VkVideoEncodeH264RateControlInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkVideoEncodeH264RateControlFlagBitsKHR](VkVideoEncodeH264RateControlFlagBitsKHR.html) specifying H.264 rate
control flags.

* 
`gopFrameCount` is the number of frames within a [    group of pictures (GOP)](../../../../spec/latest/chapters/videocoding.html#encode-h264-gop) intended to be used by the application.
If it is 0, the rate control algorithm **may** assume an
implementation-dependent GOP length.
If it is `UINT32_MAX`, the GOP length is treated as infinite.

* 
`idrPeriod` is the interval, in terms of number of frames, between
two [IDR frames](../../../../spec/latest/chapters/videocoding.html#encode-h264-idr-pic) (see [IDR    period](../../../../spec/latest/chapters/videocoding.html#encode-h264-idr-period)).
If it is 0, the rate control algorithm **may** assume an
implementation-dependent IDR period.
If it is `UINT32_MAX`, the IDR period is treated as infinite.

* 
`consecutiveBFrameCount` is the number of consecutive B frames
between I and/or P frames within the [GOP](../../../../spec/latest/chapters/videocoding.html#encode-h264-gop).

* 
`temporalLayerCount` specifies the number of H.264 temporal layers
that the application intends to use.

When an instance of this structure is included in the `pNext` chain of
the [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) structure passed to the
[vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html) command, and
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)::`flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), the parameters in
this structure are used as guidance for the implementation’s rate control
algorithm (see [Video Coding Control](../../../../spec/latest/chapters/videocoding.html#video-coding-control)).

If `flags` includes
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_ATTEMPT_HRD_COMPLIANCE_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html), then
the rate control state is reset to an initial state to meet HRD compliance
requirements.
Otherwise the new rate control state **may** be applied without a reset
depending on the implementation and the specified rate control parameters.

|  | It would be possible to infer the picture type to be used when encoding a
| --- | --- |
frame, on the basis of the values provided for `consecutiveBFrameCount`,
`idrPeriod`, and `gopFrameCount`, but this inferred picture type
will not be used by implementations to override the picture type provided to
the video encode operation. |

Valid Usage

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08280) VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08280

If [VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile, does not include
[VK_VIDEO_ENCODE_H264_CAPABILITY_HRD_COMPLIANCE_BIT_KHR](VkVideoEncodeH264CapabilityFlagBitsKHR.html), then
`flags` **must** not contain
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_ATTEMPT_HRD_COMPLIANCE_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08281) VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08281

If `flags` contains
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html)
or
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html),
then it **must** also contain
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REGULAR_GOP_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08282) VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08282

If `flags` contains
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html),
then it **must** not also contain
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08283) VUID-VkVideoEncodeH264RateControlInfoKHR-flags-08283

If `flags` contains
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REGULAR_GOP_BIT_KHR](VkVideoEncodeH264RateControlFlagBitsKHR.html), then
`gopFrameCount` **must** be greater than `0`

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-idrPeriod-08284) VUID-VkVideoEncodeH264RateControlInfoKHR-idrPeriod-08284

If `idrPeriod` is not `0`, then it **must** be greater than or equal to
`gopFrameCount`

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-consecutiveBFrameCount-08285) VUID-VkVideoEncodeH264RateControlInfoKHR-consecutiveBFrameCount-08285

If `consecutiveBFrameCount` is not `0`, then it **must** be less than
`gopFrameCount`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-sType-sType) VUID-VkVideoEncodeH264RateControlInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_RATE_CONTROL_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeH264RateControlInfoKHR-flags-parameter) VUID-VkVideoEncodeH264RateControlInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkVideoEncodeH264RateControlFlagBitsKHR](VkVideoEncodeH264RateControlFlagBitsKHR.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)

* 
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeH264RateControlFlagsKHR](VkVideoEncodeH264RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264RateControlInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
