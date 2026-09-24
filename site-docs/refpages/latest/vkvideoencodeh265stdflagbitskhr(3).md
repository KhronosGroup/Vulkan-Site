# VkVideoEncodeH265StdFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265StdFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265StdFlagBitsKHR - Video encode H.265 syntax capability flags

Bits which **may** be set in
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`stdSyntaxFlags`, indicating the
capabilities related to the H.265 syntax elements, are:

// Provided by VK_KHR_video_encode_h265
typedef enum VkVideoEncodeH265StdFlagBitsKHR {
    VK_VIDEO_ENCODE_H265_STD_SEPARATE_COLOR_PLANE_FLAG_SET_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_H265_STD_SAMPLE_ADAPTIVE_OFFSET_ENABLED_FLAG_SET_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_H265_STD_SCALING_LIST_DATA_PRESENT_FLAG_SET_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_H265_STD_PCM_ENABLED_FLAG_SET_BIT_KHR = 0x00000008,
    VK_VIDEO_ENCODE_H265_STD_SPS_TEMPORAL_MVP_ENABLED_FLAG_SET_BIT_KHR = 0x00000010,
    VK_VIDEO_ENCODE_H265_STD_INIT_QP_MINUS26_BIT_KHR = 0x00000020,
    VK_VIDEO_ENCODE_H265_STD_WEIGHTED_PRED_FLAG_SET_BIT_KHR = 0x00000040,
    VK_VIDEO_ENCODE_H265_STD_WEIGHTED_BIPRED_FLAG_SET_BIT_KHR = 0x00000080,
    VK_VIDEO_ENCODE_H265_STD_LOG2_PARALLEL_MERGE_LEVEL_MINUS2_BIT_KHR = 0x00000100,
    VK_VIDEO_ENCODE_H265_STD_SIGN_DATA_HIDING_ENABLED_FLAG_SET_BIT_KHR = 0x00000200,
    VK_VIDEO_ENCODE_H265_STD_TRANSFORM_SKIP_ENABLED_FLAG_SET_BIT_KHR = 0x00000400,
    VK_VIDEO_ENCODE_H265_STD_TRANSFORM_SKIP_ENABLED_FLAG_UNSET_BIT_KHR = 0x00000800,
    VK_VIDEO_ENCODE_H265_STD_PPS_SLICE_CHROMA_QP_OFFSETS_PRESENT_FLAG_SET_BIT_KHR = 0x00001000,
    VK_VIDEO_ENCODE_H265_STD_TRANSQUANT_BYPASS_ENABLED_FLAG_SET_BIT_KHR = 0x00002000,
    VK_VIDEO_ENCODE_H265_STD_CONSTRAINED_INTRA_PRED_FLAG_SET_BIT_KHR = 0x00004000,
    VK_VIDEO_ENCODE_H265_STD_ENTROPY_CODING_SYNC_ENABLED_FLAG_SET_BIT_KHR = 0x00008000,
    VK_VIDEO_ENCODE_H265_STD_DEBLOCKING_FILTER_OVERRIDE_ENABLED_FLAG_SET_BIT_KHR = 0x00010000,
    VK_VIDEO_ENCODE_H265_STD_DEPENDENT_SLICE_SEGMENTS_ENABLED_FLAG_SET_BIT_KHR = 0x00020000,
    VK_VIDEO_ENCODE_H265_STD_DEPENDENT_SLICE_SEGMENT_FLAG_SET_BIT_KHR = 0x00040000,
    VK_VIDEO_ENCODE_H265_STD_SLICE_QP_DELTA_BIT_KHR = 0x00080000,
    VK_VIDEO_ENCODE_H265_STD_DIFFERENT_SLICE_QP_DELTA_BIT_KHR = 0x00100000,
} VkVideoEncodeH265StdFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_H265_STD_SEPARATE_COLOR_PLANE_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265SpsFlags`::`separate_colour_plane_flag` in the
[SPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_SAMPLE_ADAPTIVE_OFFSET_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265SpsFlags`::`sample_adaptive_offset_enabled_flag` in
the [SPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_SCALING_LIST_DATA_PRESENT_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for the `scaling_list_enabled_flag` and
`sps_scaling_list_data_present_flag` members of
`StdVideoH265SpsFlags` in the [SPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps), and the
application-provided value for
`StdVideoH265PpsFlags`::`pps_scaling_list_data_present_flag` in
the [PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when those values are `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_PCM_ENABLED_FLAG_SET_BIT_KHR](#) specifies
whether the implementation supports using the application-provided value
for `StdVideoH265SpsFlags`::`pcm_enable_flag` in the
[SPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_SPS_TEMPORAL_MVP_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265SpsFlags`::`sps_temporal_mvp_enabled_flag` in the
[SPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_INIT_QP_MINUS26_BIT_KHR](#) specifies whether
the implementation supports using the application-provided value for
`StdVideoH265PictureParameterSet`::`init_qp_minus26` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is non-zero.

* 
[VK_VIDEO_ENCODE_H265_STD_WEIGHTED_PRED_FLAG_SET_BIT_KHR](#) specifies
whether the implementation supports using the application-provided value
for `StdVideoH265PpsFlags`::`weighted_pred_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_WEIGHTED_BIPRED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`weighted_bipred_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_LOG2_PARALLEL_MERGE_LEVEL_MINUS2_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PictureParameterSet`::`log2_parallel_merge_level_minus2`
in the [PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is non-zero.

* 
[VK_VIDEO_ENCODE_H265_STD_SIGN_DATA_HIDING_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`sign_data_hiding_enabled_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_TRANSFORM_SKIP_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`transform_skip_enabled_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_TRANSFORM_SKIP_ENABLED_FLAG_UNSET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`transform_skip_enabled_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `0`.

* 
[VK_VIDEO_ENCODE_H265_STD_PPS_SLICE_CHROMA_QP_OFFSETS_PRESENT_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`pps_slice_chroma_qp_offsets_present_flag`
in the [PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_TRANSQUANT_BYPASS_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`transquant_bypass_enabled_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_CONSTRAINED_INTRA_PRED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`constrained_intra_pred_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_ENTROPY_CODING_SYNC_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`entropy_coding_sync_enabled_flag` in the
[PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_DEBLOCKING_FILTER_OVERRIDE_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`deblocking_filter_override_enabled_flag`
in the [PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_DEPENDENT_SLICE_SEGMENTS_ENABLED_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoH265PpsFlags`::`dependent_slice_segments_enabled_flag` in
the [PPS](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_DEPENDENT_SLICE_SEGMENT_FLAG_SET_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoEncodeH265SliceSegmentHeader`::`dependent_slice_segment_flag`
in the [H.265 slice segment    header parameters](../../../../spec/latest/chapters/videocoding.html#encode-h265-slice-segment-header-params) when that value is `1`.

* 
[VK_VIDEO_ENCODE_H265_STD_SLICE_QP_DELTA_BIT_KHR](#) specifies whether
the implementation supports using the application-provided value for
`StdVideoEncodeH265SliceSegmentHeader`::`slice_qp_delta` in the
[H.265 slice segment header    parameters](../../../../spec/latest/chapters/videocoding.html#encode-h265-slice-segment-header-params) when that value is identical across the slice segments of
the encoded frame.

* 
[VK_VIDEO_ENCODE_H265_STD_DIFFERENT_SLICE_QP_DELTA_BIT_KHR](#)
specifies whether the implementation supports using the
application-provided value for
`StdVideoEncodeH265SliceSegmentHeader`::`slice_qp_delta` in the
[H.265 slice segment header    parameters](../../../../spec/latest/chapters/videocoding.html#encode-h265-slice-segment-header-params) when that value is different across the slice segments of
the encoded frame.

These capability flags provide information to the application about specific
H.265 syntax element values that the implementation supports without having
to [override](../../../../spec/latest/chapters/videocoding.html#encode-h265-overrides) them and do not otherwise restrict the
values that the application **can** specify for any of the mentioned H.265
syntax elements.

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkVideoEncodeH265StdFlagsKHR](VkVideoEncodeH265StdFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265StdFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
