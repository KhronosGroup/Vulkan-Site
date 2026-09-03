# VkVideoEncodeH265RateControlInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265RateControlInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265RateControlInfoKHR - Structure describing H.265 stream rate control parameters

The `VkVideoEncodeH265RateControlInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265RateControlInfoKHR {
    VkStructureType                         sType;
    const void*                             pNext;
    VkVideoEncodeH265RateControlFlagsKHR    flags;
    uint32_t                                gopFrameCount;
    uint32_t                                idrPeriod;
    uint32_t                                consecutiveBFrameCount;
    uint32_t                                subLayerCount;
} VkVideoEncodeH265RateControlInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkVideoEncodeH265RateControlFlagBitsKHR](VkVideoEncodeH265RateControlFlagBitsKHR.html) specifying H.265 rate
control flags.

* 
`gopFrameCount` is the number of frames within a [    group of pictures (GOP)](../../../../spec/latest/chapters/videocoding.html#encode-h265-gop) intended to be used by the application.
If it is 0, the rate control algorithm **may** assume an
implementation-dependent GOP length.
If it is `UINT32_MAX`, the GOP length is treated as infinite.

* 
`idrPeriod` is the interval, in terms of number of frames, between
two [IDR frames](../../../../spec/latest/chapters/videocoding.html#encode-h265-idr-pic) (see [IDR    period](../../../../spec/latest/chapters/videocoding.html#encode-h265-idr-period)).
If it is 0, the rate control algorithm **may** assume an
implementation-dependent IDR period.
If it is `UINT32_MAX`, the IDR period is treated as infinite.

* 
`consecutiveBFrameCount` is the number of consecutive B frames
between I and/or P frames within the [GOP](../../../../spec/latest/chapters/videocoding.html#encode-h265-gop).

* 
`subLayerCount` specifies the number of H.265 sub-layers that the
application intends to use.

When an instance of this structure is included in the `pNext` chain of
the [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) structure passed to the
[vkCmdControlVideoCodingKHR](vkCmdControlVideoCodingKHR.html) command, and
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)::`flags` includes
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](VkVideoCodingControlFlagBitsKHR.html), the parameters in
this structure are used as guidance for the implementation’s rate control
algorithm (see [Video Coding Control](../../../../spec/latest/chapters/videocoding.html#video-coding-control)).

If `flags` includes
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_ATTEMPT_HRD_COMPLIANCE_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html), then
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
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08291) VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08291

If [VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags`, as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile, does not include
[VK_VIDEO_ENCODE_H265_CAPABILITY_HRD_COMPLIANCE_BIT_KHR](VkVideoEncodeH265CapabilityFlagBitsKHR.html), then
`flags` **must** not contain
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_ATTEMPT_HRD_COMPLIANCE_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08292) VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08292

If `flags` contains
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html)
or
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html),
then it **must** also contain
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_REGULAR_GOP_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08293) VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08293

If `flags` contains
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html),
then it **must** not also contain
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html)

* 
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08294) VUID-VkVideoEncodeH265RateControlInfoKHR-flags-08294

If `flags` contains
[VK_VIDEO_ENCODE_H265_RATE_CONTROL_REGULAR_GOP_BIT_KHR](VkVideoEncodeH265RateControlFlagBitsKHR.html), then
`gopFrameCount` **must** be greater than `0`

* 
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-idrPeriod-08295) VUID-VkVideoEncodeH265RateControlInfoKHR-idrPeriod-08295

If `idrPeriod` is not `0`, then it **must** be greater than or equal to
`gopFrameCount`

* 
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-consecutiveBFrameCount-08296) VUID-VkVideoEncodeH265RateControlInfoKHR-consecutiveBFrameCount-08296

If `consecutiveBFrameCount` is not `0`, then it **must** be less than
`gopFrameCount`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-sType-sType) VUID-VkVideoEncodeH265RateControlInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_RATE_CONTROL_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeH265RateControlInfoKHR-flags-parameter) VUID-VkVideoEncodeH265RateControlInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkVideoEncodeH265RateControlFlagBitsKHR](VkVideoEncodeH265RateControlFlagBitsKHR.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoBeginCodingInfoKHR](VkVideoBeginCodingInfoKHR.html)

* 
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeH265RateControlFlagsKHR](VkVideoEncodeH265RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265RateControlInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
