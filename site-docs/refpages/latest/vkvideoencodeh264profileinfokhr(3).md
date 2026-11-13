# VkVideoEncodeH264ProfileInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264ProfileInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264ProfileInfoKHR - Structure specifying H.264 encode-specific video profile parameters

A video profile supporting H.264 video encode operations is specified by
setting [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`videoCodecOperation` to
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and adding a
`VkVideoEncodeH264ProfileInfoKHR` structure to the
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`pNext` chain.

The `VkVideoEncodeH264ProfileInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264ProfileInfoKHR {
    VkStructureType           sType;
    const void*               pNext;
    StdVideoH264ProfileIdc    stdProfileIdc;
} VkVideoEncodeH264ProfileInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stdProfileIdc` is a `StdVideoH264ProfileIdc` value specifying
the H.264 codec profile IDC, where enum constant
`STD_VIDEO_H264_PROFILE_IDC_BASELINE` identifies the Constrained
Baseline profile as defined in A.2.1.1 of the [ITU-T H.264    Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264), and all other values correspond to profiles defined in
section A.2 of the [ITU-T H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264ProfileInfoKHR-sType-sType) VUID-VkVideoEncodeH264ProfileInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_PROFILE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264ProfileInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
