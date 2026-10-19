# VkVideoDecodeH264SessionParametersCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH264SessionParametersCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH264SessionParametersCreateInfoKHR - Structure specifies H.264 decoder parameter set information

When a [video session parameters](../../../../spec/latest/chapters/videocoding.html#video-session-parameters) object is
created with the codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)::`pNext` chain **must** include
a `VkVideoDecodeH264SessionParametersCreateInfoKHR` structure specifying
the capacity and initial contents of the object.

The `VkVideoDecodeH264SessionParametersCreateInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_decode_h264
typedef struct VkVideoDecodeH264SessionParametersCreateInfoKHR {
    VkStructureType                                        sType;
    const void*                                            pNext;
    uint32_t                                               maxStdSPSCount;
    uint32_t                                               maxStdPPSCount;
    const VkVideoDecodeH264SessionParametersAddInfoKHR*    pParametersAddInfo;
} VkVideoDecodeH264SessionParametersCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxStdSPSCount` is the maximum number of [H.264    SPS](../../../../spec/latest/chapters/videocoding.html#decode-h264-sps) entries the created `VkVideoSessionParametersKHR` **can**
contain.

* 
`maxStdPPSCount` is the maximum number of [H.264    PPS](../../../../spec/latest/chapters/videocoding.html#decode-h264-pps) entries the created `VkVideoSessionParametersKHR` **can**
contain.

* 
`pParametersAddInfo` is `NULL` or a pointer to a
[VkVideoDecodeH264SessionParametersAddInfoKHR](VkVideoDecodeH264SessionParametersAddInfoKHR.html) structure specifying
H.264 parameters to add upon object creation.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeH264SessionParametersCreateInfoKHR-sType-sType) VUID-VkVideoDecodeH264SessionParametersCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeH264SessionParametersCreateInfoKHR-pParametersAddInfo-parameter) VUID-VkVideoDecodeH264SessionParametersCreateInfoKHR-pParametersAddInfo-parameter

 If `pParametersAddInfo` is not `NULL`, `pParametersAddInfo` **must** be a valid pointer to a valid [VkVideoDecodeH264SessionParametersAddInfoKHR](VkVideoDecodeH264SessionParametersAddInfoKHR.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)

[VK_KHR_video_decode_h264](VK_KHR_video_decode_h264.html), [VkStructureType](VkStructureType.html), [VkVideoDecodeH264SessionParametersAddInfoKHR](VkVideoDecodeH264SessionParametersAddInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH264SessionParametersCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
