# VkVideoEncodeAV1CapabilityFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1CapabilityFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1CapabilityFlagBitsKHR - AV1 encode capability flags

Bits which **may** be set in
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`flags`, indicating the AV1
encoding capabilities supported, are:

// Provided by VK_KHR_video_encode_av1
typedef enum VkVideoEncodeAV1CapabilityFlagBitsKHR {
    VK_VIDEO_ENCODE_AV1_CAPABILITY_PER_RATE_CONTROL_GROUP_MIN_MAX_Q_INDEX_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_AV1_CAPABILITY_GENERATE_OBU_EXTENSION_HEADER_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_AV1_CAPABILITY_PRIMARY_REFERENCE_CDF_ONLY_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_AV1_CAPABILITY_FRAME_SIZE_OVERRIDE_BIT_KHR = 0x00000008,
    VK_VIDEO_ENCODE_AV1_CAPABILITY_MOTION_VECTOR_SCALING_BIT_KHR = 0x00000010,
  // Provided by VK_KHR_video_encode_av1 with VK_KHR_video_encode_intra_refresh
    VK_VIDEO_ENCODE_AV1_CAPABILITY_COMPOUND_PREDICTION_INTRA_REFRESH_BIT_KHR = 0x00000020,
} VkVideoEncodeAV1CapabilityFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_AV1_CAPABILITY_PER_RATE_CONTROL_GROUP_MIN_MAX_Q_INDEX_BIT_KHR](#)
specifies support for specifying different quantizer index values in the
members of [VkVideoEncodeAV1QIndexKHR](VkVideoEncodeAV1QIndexKHR.html).

* 
[VK_VIDEO_ENCODE_AV1_CAPABILITY_GENERATE_OBU_EXTENSION_HEADER_BIT_KHR](#)
specifies support for generating OBU extension headers, as defined in
section 5.3.3 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

* 
[VK_VIDEO_ENCODE_AV1_CAPABILITY_PRIMARY_REFERENCE_CDF_ONLY_BIT_KHR](#)
specifies support for using the primary reference frame indicated by the
value of `StdVideoEncodeAV1PictureInfo`::`primary_ref_frame` in
the [AV1 picture information](../../../../spec/latest/chapters/videocoding.html#encode-av1-picture-info) only for CDF
data reference, as defined in section 6.8.2 of the [AV1    Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

* 
[VK_VIDEO_ENCODE_AV1_CAPABILITY_FRAME_SIZE_OVERRIDE_BIT_KHR](#)
specifies support for encoding a picture with a frame size different
from the maximum frame size defined in the
[active AV1 sequence header](../../../../spec/latest/chapters/videocoding.html#encode-av1-active-sequence-header).
If this capability is not supported, then `frame_size_override_flag`
**must** not be set in the [AV1 picture    information](../../../../spec/latest/chapters/videocoding.html#encode-av1-picture-info) of the encoded frame and the coded extent of the
[encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) **must** match the maximum
coded extent allowed by the [active    AV1 sequence header](../../../../spec/latest/chapters/videocoding.html#encode-av1-active-sequence-header), i.e. (`max_frame_width_minus_1` +  1,
`max_frame_height_minus_1` +  1).

* 
[VK_VIDEO_ENCODE_AV1_CAPABILITY_MOTION_VECTOR_SCALING_BIT_KHR](#)
specifies support for motion vector scaling, as defined in section
7.11.3.3 of the [AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).
If this capability is not supported, then the coded extent of all
[active reference pictures](../../../../spec/latest/chapters/videocoding.html#active-reference-pictures) **must** match the
coded extent of the [encode input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture).
This capability **may** only be supported by a video profile when
[VK_VIDEO_ENCODE_AV1_CAPABILITY_FRAME_SIZE_OVERRIDE_BIT_KHR](#) is also
supported.

* 
[VK_VIDEO_ENCODE_AV1_CAPABILITY_COMPOUND_PREDICTION_INTRA_REFRESH_BIT_KHR](#)
indicates support for encoding frames using
[unidirectional or bidirectional compound    prediction mode](../../../../spec/latest/chapters/videocoding.html#encode-av1-prediction-modes) with [intra refresh](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh) enabled.

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkVideoEncodeAV1CapabilityFlagsKHR](VkVideoEncodeAV1CapabilityFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1CapabilityFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
