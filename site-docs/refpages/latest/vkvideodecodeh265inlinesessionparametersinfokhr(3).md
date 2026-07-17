# VkVideoDecodeH265InlineSessionParametersInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH265InlineSessionParametersInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH265InlineSessionParametersInfoKHR - Structure specifies inline H.265 decoder parameter set information

The `VkVideoDecodeH265InlineSessionParametersInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_decode_h265 with VK_KHR_video_maintenance2
typedef struct VkVideoDecodeH265InlineSessionParametersInfoKHR {
    VkStructureType                            sType;
    const void*                                pNext;
    const StdVideoH265VideoParameterSet*       pStdVPS;
    const StdVideoH265SequenceParameterSet*    pStdSPS;
    const StdVideoH265PictureParameterSet*     pStdPPS;
} VkVideoDecodeH265InlineSessionParametersInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdVPS` is `NULL` or a pointer to an instance of the
`StdVideoH265VideoParameterSet` structure describing the
[active H.265 VPS](../../../../spec/latest/chapters/videocoding.html#decode-h265-active-vps).

* 
`pStdSPS` is `NULL` or a pointer to an instance of the
`StdVideoH265SequenceParameterSet` structure describing the
[active H.265 SPS](../../../../spec/latest/chapters/videocoding.html#decode-h265-active-sps).

* 
`pStdPPS` is `NULL` or a pointer to an instance of the
`StdVideoH265PictureParameterSet` structure describing the
[active H.265 PPS](../../../../spec/latest/chapters/videocoding.html#decode-h265-active-pps).

If `pStdVPS`, `pStdSPS`, or `pStdPPS` is not `NULL`, the issued
video decode operations will use the parameter sets specified by them,
respectively, instead of the corresponding active parameter sets being
sourced from the bound video session parameters object.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-sType-sType) VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_INLINE_SESSION_PARAMETERS_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-pStdVPS-parameter) VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-pStdVPS-parameter

 If `pStdVPS` is not `NULL`, `pStdVPS` **must** be a valid pointer to a valid `StdVideoH265VideoParameterSet` value

* 
[](#VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-pStdSPS-parameter) VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-pStdSPS-parameter

 If `pStdSPS` is not `NULL`, `pStdSPS` **must** be a valid pointer to a valid `StdVideoH265SequenceParameterSet` value

* 
[](#VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-pStdPPS-parameter) VUID-VkVideoDecodeH265InlineSessionParametersInfoKHR-pStdPPS-parameter

 If `pStdPPS` is not `NULL`, `pStdPPS` **must** be a valid pointer to a valid `StdVideoH265PictureParameterSet` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)

[VK_KHR_video_decode_h265](VK_KHR_video_decode_h265.html), [VK_KHR_video_maintenance2](VK_KHR_video_maintenance2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH265InlineSessionParametersInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
