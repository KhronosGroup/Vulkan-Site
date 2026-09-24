# VkVideoDecodeAV1InlineSessionParametersInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeAV1InlineSessionParametersInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeAV1InlineSessionParametersInfoKHR - Structure specifies inline AV1 decoder parameter set information

The `VkVideoDecodeAV1InlineSessionParametersInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_decode_av1 with VK_KHR_video_maintenance2
typedef struct VkVideoDecodeAV1InlineSessionParametersInfoKHR {
    VkStructureType                     sType;
    const void*                         pNext;
    const StdVideoAV1SequenceHeader*    pStdSequenceHeader;
} VkVideoDecodeAV1InlineSessionParametersInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pStdSequenceHeader` is `NULL` or a pointer to an instance of the
`StdVideoAV1SequenceHeader` structure describing the
[active AV1 sequence header](../../../../spec/latest/chapters/videocoding.html#decode-av1-active-sequence-header).

If `pStdSequenceHeader` is not `NULL`, the issued video decode
operations will use the specified sequence header parameters instead of the
active sequence header being sourced from the bound video session parameters
object.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeAV1InlineSessionParametersInfoKHR-sType-sType) VUID-VkVideoDecodeAV1InlineSessionParametersInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_INLINE_SESSION_PARAMETERS_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeAV1InlineSessionParametersInfoKHR-pStdSequenceHeader-parameter) VUID-VkVideoDecodeAV1InlineSessionParametersInfoKHR-pStdSequenceHeader-parameter

 If `pStdSequenceHeader` is not `NULL`, `pStdSequenceHeader` **must** be a valid pointer to a valid `StdVideoAV1SequenceHeader` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoDecodeInfoKHR](VkVideoDecodeInfoKHR.html)

[VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html), [VK_KHR_video_maintenance2](VK_KHR_video_maintenance2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeAV1InlineSessionParametersInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
