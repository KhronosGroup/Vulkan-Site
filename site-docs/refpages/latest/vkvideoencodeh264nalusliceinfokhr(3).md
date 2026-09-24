# VkVideoEncodeH264NaluSliceInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264NaluSliceInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264NaluSliceInfoKHR - Structure specifies H.264 encode slice NALU parameters

The [VkVideoEncodeH264NaluSliceInfoKHR](#) structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264NaluSliceInfoKHR {
    VkStructureType                         sType;
    const void*                             pNext;
    int32_t                                 constantQp;
    const StdVideoEncodeH264SliceHeader*    pStdSliceHeader;
} VkVideoEncodeH264NaluSliceInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`constantQp` is the QP to use for the slice if the current
[rate control mode](../../../../spec/latest/chapters/videocoding.html#encode-rate-control-modes) configured for the video
session is [VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](VkVideoEncodeRateControlModeFlagBitsKHR.html).

* 
`pStdSliceHeader` is a pointer to a
`StdVideoEncodeH264SliceHeader` structure specifying
[H.264 slice header parameters](../../../../spec/latest/chapters/videocoding.html#encode-h264-slice-header-params) for
the slice.

Std Slice Header Parameters

The members of the `StdVideoEncodeH264SliceHeader` structure pointed to
by `pStdSliceHeader` are interpreted as follows:

* 
`flags.reserved` and `reserved1` are used only for padding
purposes and are otherwise ignored;

* 
if `pWeightTable` is not `NULL`, then it is a pointer to a
`StdVideoEncodeH264WeightTable` that is interpreted as follows:

`flags.reserved` is used only for padding purposes and is otherwise
ignored;

* 
all other members of `StdVideoEncodeH264WeightTable` are interpreted
as defined in section 7.4.3.2 of the [ITU-T H.264     Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264);

all other members are interpreted as defined in section 7.4.3 of the
[ITU-T H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264NaluSliceInfoKHR-sType-sType) VUID-VkVideoEncodeH264NaluSliceInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_NALU_SLICE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeH264NaluSliceInfoKHR-pNext-pNext) VUID-VkVideoEncodeH264NaluSliceInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkVideoEncodeH264NaluSliceInfoKHR-pStdSliceHeader-parameter) VUID-VkVideoEncodeH264NaluSliceInfoKHR-pStdSliceHeader-parameter

 `pStdSliceHeader` **must** be a valid pointer to a valid `StdVideoEncodeH264SliceHeader` value

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeH264PictureInfoKHR](VkVideoEncodeH264PictureInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264NaluSliceInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
