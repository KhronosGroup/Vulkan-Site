# VkVideoEncodeAV1StdFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1StdFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1StdFlagBitsKHR - Video encode AV1 syntax capability flags

Bits which **may** be set in
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`stdSyntaxFlags`, indicating the
capabilities related to the AV1 syntax elements, are:

// Provided by VK_KHR_video_encode_av1
typedef enum VkVideoEncodeAV1StdFlagBitsKHR {
    VK_VIDEO_ENCODE_AV1_STD_UNIFORM_TILE_SPACING_FLAG_SET_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_AV1_STD_SKIP_MODE_PRESENT_UNSET_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_AV1_STD_PRIMARY_REF_FRAME_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_AV1_STD_DELTA_Q_BIT_KHR = 0x00000008,
} VkVideoEncodeAV1StdFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_AV1_STD_UNIFORM_TILE_SPACING_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoAV1TileInfoFlags`::`uniform_tile_spacing_flag` in the
[AV1 tile parameters](../../../../spec/latest/chapters/videocoding.html#encode-av1-tile-params) when that value is `1`,
regardless of the coded extent of the [encode    input picture](../../../../spec/latest/chapters/videocoding.html#encode-input-picture) and the number of tile columns and rows requested in the
`TileCols` and `TileRows` members of `StdVideoAV1TileInfo`.

* 
[VK_VIDEO_ENCODE_AV1_STD_SKIP_MODE_PRESENT_UNSET_BIT_KHR](#) specifies
whether the implementation supports using the application-provided value
for `StdVideoEncodeAV1PictureInfoFlags`::`skip_mode_present` when
that value is `0`.

* 
[VK_VIDEO_ENCODE_AV1_STD_PRIMARY_REF_FRAME_BIT_KHR](#) specifies
whether the implementation supports using the application-provided value
for `StdVideoEncodeAV1PictureInfo`::`primary_ref_frame`.

* 
[VK_VIDEO_ENCODE_AV1_STD_DELTA_Q_BIT_KHR](#) specifies whether the
implementation supports using the application-provided values for the
`DeltaQYDc`, `DeltaQUDc`, `DeltaQUAc`, `DeltaQVDc`, and
`DeltaQVAc` members of `StdVideoAV1Quantization`.

These capability flags provide information to the application about specific
AV1 syntax element values that the implementation supports without having to
[override](../../../../spec/latest/chapters/videocoding.html#encode-av1-overrides) them and do not otherwise restrict the
values that the application **can** specify for any of the mentioned AV1 syntax
elements.

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkVideoEncodeAV1StdFlagsKHR](VkVideoEncodeAV1StdFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1StdFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
