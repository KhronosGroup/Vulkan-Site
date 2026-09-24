# VkVideoDecodeVP9ProfileInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeVP9ProfileInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeVP9ProfileInfoKHR - Structure specifying VP9 decode profile

A video profile supporting VP9 video decode operations is specified by
setting [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`videoCodecOperation` to
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and adding a
`VkVideoDecodeVP9ProfileInfoKHR` structure to the
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`pNext` chain.

The `VkVideoDecodeVP9ProfileInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_vp9
typedef struct VkVideoDecodeVP9ProfileInfoKHR {
    VkStructureType       sType;
    const void*           pNext;
    StdVideoVP9Profile    stdProfile;
} VkVideoDecodeVP9ProfileInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stdProfile` is a `StdVideoVP9Profile` value specifying the VP9
codec profile, as defined in section 7.2 of the [VP9    Specification](../../../../spec/latest/chapters/introduction.html#google-vp9).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeVP9ProfileInfoKHR-sType-sType) VUID-VkVideoDecodeVP9ProfileInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PROFILE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_KHR_video_decode_vp9](VK_KHR_video_decode_vp9.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeVP9ProfileInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
