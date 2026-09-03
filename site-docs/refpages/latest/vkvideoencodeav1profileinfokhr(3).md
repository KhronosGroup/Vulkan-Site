# VkVideoEncodeAV1ProfileInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1ProfileInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1ProfileInfoKHR - Structure specifying AV1 encode-specific video profile parameters

A video profile supporting AV1 video encode operations is specified by
setting [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`videoCodecOperation` to
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html) and adding a
`VkVideoEncodeAV1ProfileInfoKHR` structure to the
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`pNext` chain.

The `VkVideoEncodeAV1ProfileInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkVideoEncodeAV1ProfileInfoKHR {
    VkStructureType       sType;
    const void*           pNext;
    StdVideoAV1Profile    stdProfile;
} VkVideoEncodeAV1ProfileInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stdProfile` is a `StdVideoAV1Profile` value specifying the AV1
codec profile, as defined in section A.2 of the [AV1    Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeAV1ProfileInfoKHR-sType-sType) VUID-VkVideoEncodeAV1ProfileInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_PROFILE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1ProfileInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
