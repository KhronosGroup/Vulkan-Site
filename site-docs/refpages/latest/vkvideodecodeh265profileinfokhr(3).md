# VkVideoDecodeH265ProfileInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH265ProfileInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH265ProfileInfoKHR - Structure specifying H.265 decode profile

A video profile supporting H.265 video decode operations is specified by
setting [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`videoCodecOperation` to
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and adding a
`VkVideoDecodeH265ProfileInfoKHR` structure to the
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`pNext` chain.

The `VkVideoDecodeH265ProfileInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_h265
typedef struct VkVideoDecodeH265ProfileInfoKHR {
    VkStructureType           sType;
    const void*               pNext;
    StdVideoH265ProfileIdc    stdProfileIdc;
} VkVideoDecodeH265ProfileInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stdProfileIdc` is a `StdVideoH265ProfileIdc` value specifying
the H.265 codec profile IDC, as defined in section A.3 of the
[ITU-T H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeH265ProfileInfoKHR-sType-sType) VUID-VkVideoDecodeH265ProfileInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PROFILE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_KHR_video_decode_h265](VK_KHR_video_decode_h265.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH265ProfileInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
