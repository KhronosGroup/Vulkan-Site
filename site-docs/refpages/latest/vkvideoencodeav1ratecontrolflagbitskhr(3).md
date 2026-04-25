# VkVideoEncodeAV1RateControlFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1RateControlFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1RateControlFlagBitsKHR - AV1 encode rate control bits

Bits which **can** be set in
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html)::`flags`, specifying AV1 rate
control flags, are:

// Provided by VK_KHR_video_encode_av1
typedef enum VkVideoEncodeAV1RateControlFlagBitsKHR {
    VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REGULAR_GOP_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_AV1_RATE_CONTROL_TEMPORAL_LAYER_PATTERN_DYADIC_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR = 0x00000008,
} VkVideoEncodeAV1RateControlFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REGULAR_GOP_BIT_KHR](#) specifies
that the application intends to use a [regular    GOP structure](../../../../spec/latest/chapters/videocoding.html#encode-av1-regular-gop) according to the parameters specified in the
`gopFrameCount` and `keyFramePeriod` members of the
[VkVideoEncodeAV1RateControlInfoKHR](VkVideoEncodeAV1RateControlInfoKHR.html) structure.

* 
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_TEMPORAL_LAYER_PATTERN_DYADIC_BIT_KHR](#)
specifies that the application intends to follow a
[dyadic temporal layer pattern](../../../../spec/latest/chapters/videocoding.html#encode-av1-layer-pattern-dyadic).

* 
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_FLAT_BIT_KHR](#)
specifies that the application intends to follow a
[flat reference pattern](../../../../spec/latest/chapters/videocoding.html#encode-av1-ref-pattern-flat) in the GOP.

* 
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_REFERENCE_PATTERN_DYADIC_BIT_KHR](#)
specifies that the application intends to follow a
[dyadic reference pattern](../../../../spec/latest/chapters/videocoding.html#encode-av1-ref-pattern-dyadic) in the GOP.

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkVideoEncodeAV1RateControlFlagsKHR](VkVideoEncodeAV1RateControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1RateControlFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
