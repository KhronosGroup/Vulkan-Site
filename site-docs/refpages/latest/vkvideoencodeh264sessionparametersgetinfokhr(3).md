# VkVideoEncodeH264SessionParametersGetInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264SessionParametersGetInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264SessionParametersGetInfoKHR - Structure specifying parameters for retrieving encoded H.264 parameter set data

The `VkVideoEncodeH264SessionParametersGetInfoKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264SessionParametersGetInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           writeStdSPS;
    VkBool32           writeStdPPS;
    uint32_t           stdSPSId;
    uint32_t           stdPPSId;
} VkVideoEncodeH264SessionParametersGetInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`writeStdSPS` indicates whether the encoded [H.264    sequence parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h264-sps) identified by `stdSPSId` is requested to be
retrieved.

* 
`writeStdPPS` indicates whether the encoded [H.264    picture parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h264-pps) identified by the pair constructed from
`stdSPSId` and `stdPPSId` is requested to be retrieved.

* 
`stdSPSId` specifies the H.264 sequence parameter set ID used to
identify the retrieved H.264 sequence and/or picture parameter set(s).

* 
`stdPPSId` specifies the H.264 picture parameter set ID used to
identify the retrieved H.264 picture parameter set when
`writeStdPPS` is [VK_TRUE](VK_TRUE.html).

When this structure is specified in the `pNext` chain of the
[VkVideoEncodeSessionParametersGetInfoKHR](VkVideoEncodeSessionParametersGetInfoKHR.html) structure passed to
[vkGetEncodedVideoSessionParametersKHR](vkGetEncodedVideoSessionParametersKHR.html), the command will write encoded
parameter data to the output buffer in the following order:

The [H.264 sequence parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h264-sps) identified by
`stdSPSId`, if `writeStdSPS` is [VK_TRUE](VK_TRUE.html).

The [H.264 picture parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h264-pps) identified by the
pair constructed from `stdSPSId` and `stdPPSId`, if
`writeStdPPS` is [VK_TRUE](VK_TRUE.html).

Valid Usage

* 
[](#VUID-VkVideoEncodeH264SessionParametersGetInfoKHR-writeStdSPS-08279) VUID-VkVideoEncodeH264SessionParametersGetInfoKHR-writeStdSPS-08279

At least one of `writeStdSPS` and `writeStdPPS` **must** be
[VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264SessionParametersGetInfoKHR-sType-sType) VUID-VkVideoEncodeH264SessionParametersGetInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_GET_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeSessionParametersGetInfoKHR](VkVideoEncodeSessionParametersGetInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264SessionParametersGetInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
