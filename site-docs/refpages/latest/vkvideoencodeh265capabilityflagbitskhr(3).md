# VkVideoEncodeH265CapabilityFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265CapabilityFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265CapabilityFlagBitsKHR - Video encode H.265 capability flags

Bits which **may** be set in
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`flags`, indicating the H.265
encoding capabilities supported, are:

// Provided by VK_KHR_video_encode_h265
typedef enum VkVideoEncodeH265CapabilityFlagBitsKHR {
    VK_VIDEO_ENCODE_H265_CAPABILITY_HRD_COMPLIANCE_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_H265_CAPABILITY_PREDICTION_WEIGHT_TABLE_GENERATED_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_H265_CAPABILITY_ROW_UNALIGNED_SLICE_SEGMENT_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_H265_CAPABILITY_DIFFERENT_SLICE_SEGMENT_TYPE_BIT_KHR = 0x00000008,
    VK_VIDEO_ENCODE_H265_CAPABILITY_B_FRAME_IN_L0_LIST_BIT_KHR = 0x00000010,
    VK_VIDEO_ENCODE_H265_CAPABILITY_B_FRAME_IN_L1_LIST_BIT_KHR = 0x00000020,
    VK_VIDEO_ENCODE_H265_CAPABILITY_PER_PICTURE_TYPE_MIN_MAX_QP_BIT_KHR = 0x00000040,
    VK_VIDEO_ENCODE_H265_CAPABILITY_PER_SLICE_SEGMENT_CONSTANT_QP_BIT_KHR = 0x00000080,
    VK_VIDEO_ENCODE_H265_CAPABILITY_MULTIPLE_TILES_PER_SLICE_SEGMENT_BIT_KHR = 0x00000100,
    VK_VIDEO_ENCODE_H265_CAPABILITY_MULTIPLE_SLICE_SEGMENTS_PER_TILE_BIT_KHR = 0x00000200,
  // Provided by VK_KHR_video_encode_h265 with VK_KHR_video_encode_intra_refresh
    VK_VIDEO_ENCODE_H265_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR = 0x00000800,
  // Provided by VK_KHR_video_encode_h265 with VK_KHR_video_encode_quantization_map
    VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR = 0x00000400,
} VkVideoEncodeH265CapabilityFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_HRD_COMPLIANCE_BIT_KHR](#) specifies
whether the implementation **may** be able to generate HRD compliant
bitstreams if any of the `nal_hrd_parameters_present_flag`,
`vcl_hrd_parameters_present_flag`, or
`sub_pic_hrd_params_present_flag` members of
`StdVideoH265HrdFlags` are set to `1` in the HRD parameters of the
[active VPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-active-vps) or [active    SPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-active-sps), or if
`StdVideoH265SpsVuiFlags`::`vui_hrd_parameters_present_flag` is
set to `1` in the [active SPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-active-sps).

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_PREDICTION_WEIGHT_TABLE_GENERATED_BIT_KHR](#)
specifies that if the `weighted_pred_flag` or the
`weighted_bipred_flag` member of `StdVideoH265PpsFlags` is set to
`1` in the [active PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-active-pps) when encoding a
[P picture](../../../../spec/latest/chapters/videocoding.html#encode-h265-p-pic) or [B picture](../../../../spec/latest/chapters/videocoding.html#encode-h265-b-pic),
respectively, then the implementation is able to internally decide
syntax for `pred_weight_table`, as defined in section 7.4.7.3 of the
[ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265), and the application is not
**required** to provide a weight table in the
[H.265 slice segment header    parameters](../../../../spec/latest/chapters/videocoding.html#encode-h265-slice-segment-header-params).

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_ROW_UNALIGNED_SLICE_SEGMENT_BIT_KHR](#)
specifies that each slice segment in a frame with a single or multiple
tiles per slice may begin or finish at any offset in a CTB row.
If not supported, all slice segments in such a frame **must** begin at the
start of a CTB row (and hence each slice segment **must** finish at the end
of a CTB row).
Also indicates that each slice segment in a frame with multiple slices
per tile may begin or finish at any offset within the enclosing tile’s
CTB row.
If not supported, slice segments in such a frame **must** begin at the
start of the enclosing tile’s CTB row (and hence each slice segment
**must** finish at the end of the enclosing tile’s CTB row).
When a picture is encoded with [intra refresh](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh),
encoding non-rectangular slice segments also requires: support for the
[VkVideoEncodeIntraRefreshCapabilitiesKHR](VkVideoEncodeIntraRefreshCapabilitiesKHR.html)::`nonRectangularIntraRefreshRegions`
capability.

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_DIFFERENT_SLICE_SEGMENT_TYPE_BIT_KHR](#)
specifies that when a frame is encoded with multiple slice segments, the
implementation allows encoding each slice segment with a different
`StdVideoEncodeH265SliceSegmentHeader`::`slice_type` specified in
the [H.265 slice segment header    parameters](../../../../spec/latest/chapters/videocoding.html#encode-h265-slice-segment-header-params).
If not supported, all slice segments of the frame **must** be encoded with
the same `slice_type` which corresponds to the picture type of the
frame.
There is one exception to this rule: if the picture is encoded with the
[intra refresh mode](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh-modes)
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](VkVideoEncodeIntraRefreshModeFlagBitsKHR.html),
then the currently refreshed slice segment **must** specify the
`slice_type` `STD_VIDEO_H265_SLICE_TYPE_I` and **can** differ from
the `slice_type` of the other slice segments regardless of whether
[VK_VIDEO_ENCODE_H265_CAPABILITY_DIFFERENT_SLICE_SEGMENT_TYPE_BIT_KHR](#)
is supported.

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_B_FRAME_IN_L0_LIST_BIT_KHR](#)
specifies support for using a [B frame](../../../../spec/latest/chapters/videocoding.html#encode-h265-b-pic) as L0
reference, as specified in
`StdVideoEncodeH265ReferenceListsInfo`::`RefPicList0` in the
[H.265 picture information](../../../../spec/latest/chapters/videocoding.html#encode-h265-picture-info).

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_B_FRAME_IN_L1_LIST_BIT_KHR](#)
specifies support for using a [B frame](../../../../spec/latest/chapters/videocoding.html#encode-h265-b-pic) as L1
reference, as specified in
`StdVideoEncodeH265ReferenceListsInfo`::`RefPicList1` in the
[H.265 picture information](../../../../spec/latest/chapters/videocoding.html#encode-h265-picture-info).

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_PER_PICTURE_TYPE_MIN_MAX_QP_BIT_KHR](#)
specifies support for specifying different QP values in the members of
[VkVideoEncodeH265QpKHR](VkVideoEncodeH265QpKHR.html).

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_PER_SLICE_SEGMENT_CONSTANT_QP_BIT_KHR](#)
specifies support for specifying different constant QP values for each
slice segment.

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_MULTIPLE_TILES_PER_SLICE_SEGMENT_BIT_KHR](#)
specifies whether encoding multiple tiles per slice segment, as defined
in section 6.3.1 of the [ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265), is
supported.
If this capability flag is not present, then the implementation is only
able to encode a single tile for each slice segment.

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_MULTIPLE_SLICE_SEGMENTS_PER_TILE_BIT_KHR](#)
specifies whether encoding multiple slice segments per tile, as defined
in section 6.3.1 of the [ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265), is
supported.
If this capability flag is not present, then the implementation is only
able to encode a single slice segment for each tile.

* 

[VK_VIDEO_ENCODE_H265_CAPABILITY_CU_QP_DIFF_WRAPAROUND_BIT_KHR](#)
indicates support for wraparound during the calculation of the QP values
of subsequently encoded coding units, as defined in section 7.4.9.14 of
the [ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265).
If not supported, equation 8-283 of the [ITU-T H.265    Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265) is effectively reduced to the following:

QpY = qPY_PRED +  `CuQpDeltaVal`

|  | The effect of this is that the maximum QP difference across subsequent
| --- | --- |
coding units is limited to the [-(26 +  QpBdOffsetY / 2), 25
+  QpBdOffsetY / 2] range. |

* 
[VK_VIDEO_ENCODE_H265_CAPABILITY_B_PICTURE_INTRA_REFRESH_BIT_KHR](#)
indicates support for encoding [B pictures](../../../../spec/latest/chapters/videocoding.html#encode-h265-b-pic) with
[intra refresh](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh) enabled.

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkVideoEncodeH265CapabilityFlagsKHR](VkVideoEncodeH265CapabilityFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265CapabilityFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
