# VkVideoDecodeH264InlineSessionParametersInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH264InlineSessionParametersInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH264InlineSessionParametersInfoKHR - Structure specifies inline H.264 decoder parameter set information

The `VkVideoDecodeH264InlineSessionParametersInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_decode_h264 with VK_KHR_video_maintenance2
typedef struct VkVideoDecodeH264InlineSessionParametersInfoKHR {
    VkStructureType                            sType;
    const void*                                pNext;
    const StdVideoH264SequenceParameterSet*    pStdSPS;
    const StdVideoH264PictureParameterSet*     pStdPPS;
} VkVideoDecodeH264InlineSessionParametersInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdSPS` is `NULL` or a pointer to an instance of the
`StdVideoH264SequenceParameterSet` structure describing the
[active H.264 SPS](../../../../spec/latest/chapters/videocoding.html#decode-h264-active-sps).

* 
`pStdPPS` is `NULL` or a pointer to an instance of the
`StdVideoH264PictureParameterSet` structure describing the
[active H.264 PPS](../../../../spec/latest/chapters/videocoding.html#decode-h264-active-pps).

If `pStdSPS` or `pStdPPS` is not `NULL`, the issued video decode
operations will use the parameter sets specified by them, respectively,
instead of the corresponding parameter sets being sourced from the bound
video session parameters object.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeH264InlineSessionParametersInfoKHR-sType-sType) VUID-VkVideoDecodeH264InlineSessionParametersInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_INLINE_SESSION_PARAMETERS_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeH264InlineSessionParametersInfoKHR-pStdSPS-parameter) VUID-VkVideoDecodeH264InlineSessionParametersInfoKHR-pStdSPS-parameter

 If `pStdSPS` is not `NULL`, `pStdSPS` **must** be a valid pointer to a valid `StdVideoH264SequenceParameterSet` value

* 
[](#VUID-VkVideoDecodeH264InlineSessionParametersInfoKHR-pStdPPS-parameter) VUID-VkVideoDecodeH264InlineSessionParametersInfoKHR-pStdPPS-parameter

 If `pStdPPS` is not `NULL`, `pStdPPS` **must** be a valid pointer to a valid `StdVideoH264PictureParameterSet` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)

[VK_KHR_video_decode_h264](VK_KHR_video_decode_h264.html), [VK_KHR_video_maintenance2](VK_KHR_video_maintenance2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH264InlineSessionParametersInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
