# VkVideoEncodeH265SessionParametersGetInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265SessionParametersGetInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265SessionParametersGetInfoKHR - Structure specifying parameters for retrieving encoded H.265 parameter set data

The `VkVideoEncodeH265SessionParametersGetInfoKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265SessionParametersGetInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           writeStdVPS;
    VkBool32           writeStdSPS;
    VkBool32           writeStdPPS;
    uint32_t           stdVPSId;
    uint32_t           stdSPSId;
    uint32_t           stdPPSId;
} VkVideoEncodeH265SessionParametersGetInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`writeStdVPS` indicates whether the encoded [H.265    video parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-vps) identified by `stdVPSId` is requested to be
retrieved.

* 
`writeStdSPS` indicates whether the encoded [H.265    sequence parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps) identified by the pair constructed from
`stdVPSId` and `stdSPSId` is requested to be retrieved.

* 
`writeStdPPS` indicates whether the encoded [H.265    picture parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) identified by the triplet constructed from
`stdVPSId`, `stdSPSId`, and `stdPPSId` is requested to be
retrieved.

* 
`stdVPSId` specifies the H.265 video parameter set ID used to
identify the retrieved H.265 video, sequence, and/or picture parameter
set(s).

* 
`stdSPSId` specifies the H.265 sequence parameter set ID used to
identify the retrieved H.265 sequence and/or picture parameter set(s)
when `writeStdSPS` and/or `writeStdPPS` is [VK_TRUE](VK_TRUE.html).

* 
`stdPPSId` specifies the H.265 picture parameter set ID used to
identify the retrieved H.265 picture parameter set when
`writeStdPPS` is [VK_TRUE](VK_TRUE.html).

When this structure is specified in the `pNext` chain of the
[VkVideoEncodeSessionParametersGetInfoKHR](VkVideoEncodeSessionParametersGetInfoKHR.html) structure passed to
[vkGetEncodedVideoSessionParametersKHR](vkGetEncodedVideoSessionParametersKHR.html), the command will write encoded
parameter data to the output buffer in the following order:

The [H.265 video parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-vps) identified by
`stdVPSId`, if `writeStdVPS` is [VK_TRUE](VK_TRUE.html).

The [H.265 sequence parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps) identified by the
pair constructed from `stdVPSId` and `stdSPSId`, if
`writeStdSPS` is [VK_TRUE](VK_TRUE.html).

The [H.265 picture parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps) identified by the
triplet constructed from `stdVPSId`, `stdSPSId`, and
`stdPPSId`, if `writeStdPPS` is [VK_TRUE](VK_TRUE.html).

Valid Usage

* 
[](#VUID-VkVideoEncodeH265SessionParametersGetInfoKHR-writeStdVPS-08290) VUID-VkVideoEncodeH265SessionParametersGetInfoKHR-writeStdVPS-08290

At least one of `writeStdVPS`, `writeStdSPS`, and
`writeStdPPS` **must** be [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265SessionParametersGetInfoKHR-sType-sType) VUID-VkVideoEncodeH265SessionParametersGetInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_PARAMETERS_GET_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeSessionParametersGetInfoKHR](VkVideoEncodeSessionParametersGetInfoKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265SessionParametersGetInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
