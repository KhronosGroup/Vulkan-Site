# VkVideoDecodeAV1ProfileInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeAV1ProfileInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeAV1ProfileInfoKHR - Structure specifying AV1 decode profile

A video profile supporting AV1 video decode operations is specified by
setting [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`videoCodecOperation` to
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and adding a
`VkVideoDecodeAV1ProfileInfoKHR` structure to the
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`pNext` chain.

The `VkVideoDecodeAV1ProfileInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_av1
typedef struct VkVideoDecodeAV1ProfileInfoKHR {
    VkStructureType       sType;
    const void*           pNext;
    StdVideoAV1Profile    stdProfile;
    VkBool32              filmGrainSupport;
} VkVideoDecodeAV1ProfileInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stdProfile` is a `StdVideoAV1Profile` value specifying the AV1
codec profile, as defined in section A.2 of the [AV1    Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

* 
 `filmGrainSupport` specifies
whether AV1 film grain, as defined in section 7.8.3 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1), **can** be used with the video profile.
When this member is [VK_TRUE](VK_TRUE.html), video session objects created against
the video profile will be able to decode pictures that have
[film grain](../../../../spec/latest/chapters/videocoding.html#decode-av1-film-grain) enabled.

|  | Enabling `filmGrainSupport` **may** increase the memory requirements of
| --- | --- |
video sessions and/or video picture resources on some implementations. |

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeAV1ProfileInfoKHR-sType-sType) VUID-VkVideoDecodeAV1ProfileInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_PROFILE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeAV1ProfileInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
