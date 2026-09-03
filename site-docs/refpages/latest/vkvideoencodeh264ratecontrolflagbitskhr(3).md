# VkVideoEncodeH264RateControlFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264RateControlFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264RateControlFlagBitsKHR - H.264 encode rate control bits

Bits which **can** be set in
[VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html)::`flags`, specifying H.264
rate control flags, are:

// Provided by VK_KHR_video_encode_h264
typedef enum VkVideoEncodeH264RateControlFlagBitsKHR {
    VK_VIDEO_ENCODE_H264_RATE_CONTROL_ATTEMPT_HRD_COMPLIANCE_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_H264_RATE_CONTROL_REGULAR_GOP_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR = 0x00000008,
    VK_VIDEO_ENCODE_H264_RATE_CONTROL_TEMPORAL_LAYER_PATTERN_DYADIC_BIT_KHR = 0x00000010,
} VkVideoEncodeH264RateControlFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_ATTEMPT_HRD_COMPLIANCE_BIT_KHR](#)
specifies that rate control **should** attempt to produce an HRD compliant
bitstream, as defined in annex C of the [ITU-T H.264    Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264).

* 
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REGULAR_GOP_BIT_KHR](#) specifies
that the application intends to use a [regular    GOP structure](../../../../spec/latest/chapters/videocoding.html#encode-h264-regular-gop) according to the parameters specified in the
`gopFrameCount`, `idrPeriod`, and `consecutiveBFrameCount`
members of the [VkVideoEncodeH264RateControlInfoKHR](VkVideoEncodeH264RateControlInfoKHR.html) structure.

* 
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](#)
specifies that the application intends to follow a
[flat reference pattern](../../../../spec/latest/chapters/videocoding.html#encode-h264-ref-pattern-flat) in the GOP.

* 
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](#)
specifies that the application intends to follow a
[dyadic reference pattern](../../../../spec/latest/chapters/videocoding.html#encode-h264-ref-pattern-dyadic) in the GOP.

* 
[VK_VIDEO_ENCODE_H264_RATE_CONTROL_TEMPORAL_LAYER_PATTERN_DYADIC_BIT_KHR](#)
specifies that the application intends to follow a
[dyadic temporal layer pattern](../../../../spec/latest/chapters/videocoding.html#encode-h264-layer-pattern-dyadic).

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkVideoEncodeH264RateControlFlagsKHR](VkVideoEncodeH264RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264RateControlFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
