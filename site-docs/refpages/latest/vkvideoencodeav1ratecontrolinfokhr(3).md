# VkVideoEncodeAV1RateControlInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1RateControlInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1RateControlInfoKHR - Structure describing AV1 stream rate control parameters

The `VkVideoEncodeAV1RateControlInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkVideoEncodeAV1RateControlInfoKHR {
    VkStructureType                        sType;
    const void*                            pNext;
    VkVideoEncodeAV1RateControlFlagsKHR    flags;
    uint32_t                               gopFrameCount;
    uint32_t                               keyFramePeriod;
    uint32_t                               consecutiveBipredictiveFrameCount;
    uint32_t                               temporalLayerCount;
} VkVideoEncodeAV1RateControlInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkVideoEncodeAV1RateControlFlagBitsKHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html)
specifying AV1 rate control flags.

* 
`gopFrameCount` is the number of frames within a [    group of pictures (GOP)](../../../../spec/latest/chapters/videocoding.html#encode-av1-gop) intended to be used by the application.
If it is set to 0, the rate control algorithm **may** assume an
implementation-dependent GOP length.
If it is set to `UINT32_MAX`, the GOP length is treated as infinite.

* 
`keyFramePeriod` is the interval, in terms of number of frames,
between two frames with the AV1 frame type
`STD_VIDEO_AV1_FRAME_TYPE_KEY` (see [key    frame period](../../../../spec/latest/chapters/videocoding.html#encode-av1-key-frame-period)).
If it is set to 0, the rate control algorithm **may** assume an
implementation-dependent key frame period.
If it is set to `UINT32_MAX`, the key frame period is treated as
infinite.

* 
`consecutiveBipredictiveFrameCount` is the number of consecutive
frames encoded with
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_BIPREDICTIVE_KHR](VkVideoEncodeAV1RateControlGroupKHR.html) between
frames encoded with other [rate control    groups](../../../../spec/latest/chapters/videocoding.html#encode-av1-rate-control-group) within the [GOP](../../../../spec/latest/chapters/videocoding.html#encode-av1-gop).

* 
`temporalLayerCount` specifies the number of AV1 temporal layers
that the application intends to use.

When an instance of this structure is included in the `pNext` chain of
the [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) structure passed to the
[vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html) command, and
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)::`flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), the parameters in
this structure are used as guidance for the implementation’s rate control
algorithm (see [Video Coding Control](../../../../spec/latest/chapters/videocoding.html#video-coding-control)).

Valid Usage

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-10294) VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-10294

If `flags` contains
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html) or
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html),
then it **must** also contain
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REGULAR_GOP_BIT_KHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-10295) VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-10295

If `flags` contains
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html),
then it **must** not also contain
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-10296) VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-10296

If `flags` contains
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REGULAR_GOP_BIT_KHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html), then
`gopFrameCount` **must** be greater than `0`

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-keyFramePeriod-10297) VUID-VkVideoEncodeAV1RateControlInfoKHR-keyFramePeriod-10297

If `keyFramePeriod` is not `0`, then it **must** be greater than or
equal to `gopFrameCount`

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-consecutiveBipredictiveFrameCount-10298) VUID-VkVideoEncodeAV1RateControlInfoKHR-consecutiveBipredictiveFrameCount-10298

If `consecutiveBipredictiveFrameCount` is not `0`, then it **must** be
less than `gopFrameCount`

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-temporalLayerCount-10299) VUID-VkVideoEncodeAV1RateControlInfoKHR-temporalLayerCount-10299

`temporalLayerCount` **must** be less than or equal to
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxTemporalLayerCount`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used
video profile

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-sType-sType) VUID-VkVideoEncodeAV1RateControlInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_RATE_CONTROL_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-parameter) VUID-VkVideoEncodeAV1RateControlInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkVideoEncodeAV1RateControlFlagBitsKHR](VkVideoEncodeAV1RateControlFlagBitsKHR.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)

* 
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeAV1RateControlFlagsKHR](VkVideoEncodeAV1RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1RateControlInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
