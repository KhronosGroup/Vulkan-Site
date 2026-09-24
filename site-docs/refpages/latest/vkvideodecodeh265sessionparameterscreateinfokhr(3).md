# VkVideoDecodeH265SessionParametersCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH265SessionParametersCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH265SessionParametersCreateInfoKHR - Structure specifies H.265 decoder parameter set information

When a [video session parameters](../../../../spec/latest/chapters/videocoding.html#video-session-parameters) object is
created with the codec operation
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), the
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)::`pNext` chain **must** include
a `VkVideoDecodeH265SessionParametersCreateInfoKHR` structure specifying
the capacity and initial contents of the object.

The `VkVideoDecodeH265SessionParametersCreateInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_decode_h265
typedef struct VkVideoDecodeH265SessionParametersCreateInfoKHR {
    VkStructureType                                        sType;
    const void*                                            pNext;
    uint32_t                                               maxStdVPSCount;
    uint32_t                                               maxStdSPSCount;
    uint32_t                                               maxStdPPSCount;
    const VkVideoDecodeH265SessionParametersAddInfoKHR*    pParametersAddInfo;
} VkVideoDecodeH265SessionParametersCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxStdVPSCount` is the maximum number of [H.265    VPS](../../../../spec/latest/chapters/videocoding.html#decode-h265-vps) entries the created `VkVideoSessionParametersKHR` **can**
contain.

* 
`maxStdSPSCount` is the maximum number of [H.265    SPS](../../../../spec/latest/chapters/videocoding.html#decode-h265-sps) entries the created `VkVideoSessionParametersKHR` **can**
contain.

* 
`maxStdPPSCount` is the maximum number of [H.265    PPS](../../../../spec/latest/chapters/videocoding.html#decode-h265-pps) entries the created `VkVideoSessionParametersKHR` **can**
contain.

* 
`pParametersAddInfo` is `NULL` or a pointer to a
[VkVideoDecodeH265SessionParametersAddInfoKHR](VkVideoDecodeH265SessionParametersAddInfoKHR.html) structure specifying
H.265 parameters to add upon object creation.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeH265SessionParametersCreateInfoKHR-sType-sType) VUID-VkVideoDecodeH265SessionParametersCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_SESSION_PARAMETERS_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeH265SessionParametersCreateInfoKHR-pParametersAddInfo-parameter) VUID-VkVideoDecodeH265SessionParametersCreateInfoKHR-pParametersAddInfo-parameter

 If `pParametersAddInfo` is not `NULL`, `pParametersAddInfo` **must** be a valid pointer to a valid [VkVideoDecodeH265SessionParametersAddInfoKHR](VkVideoDecodeH265SessionParametersAddInfoKHR.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)

[VK_KHR_video_decode_h265](VK_KHR_video_decode_h265.html), [VkStructureType](VkStructureType.html), [VkVideoDecodeH265SessionParametersAddInfoKHR](VkVideoDecodeH265SessionParametersAddInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH265SessionParametersCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
