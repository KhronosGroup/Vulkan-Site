# VkVideoEncodeH264SessionParametersAddInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264SessionParametersAddInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264SessionParametersAddInfoKHR - Structure specifies H.264 encoder parameter set information

The `VkVideoEncodeH264SessionParametersAddInfoKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264SessionParametersAddInfoKHR {
    VkStructureType                            sType;
    const void*                                pNext;
    uint32_t                                   stdSPSCount;
    const StdVideoH264SequenceParameterSet*    pStdSPSs;
    uint32_t                                   stdPPSCount;
    const StdVideoH264PictureParameterSet*     pStdPPSs;
} VkVideoEncodeH264SessionParametersAddInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stdSPSCount` is the number of elements in the `pStdSPSs` array.

* 
`pStdSPSs` is a pointer to an array of
`StdVideoH264SequenceParameterSet` structures describing the
[H.264 SPS](../../../../spec/latest/chapters/videocoding.html#encode-h264-sps) entries to add.

* 
`stdPPSCount` is the number of elements in the `pStdPPSs` array.

* 
`pStdPPSs` is a pointer to an array of
`StdVideoH264PictureParameterSet` structures describing the
[H.264 PPS](../../../../spec/latest/chapters/videocoding.html#encode-h264-pps) entries to add.

This structure **can** be specified in the following places:

* 
In the `pParametersAddInfo` member of the
[VkVideoEncodeH264SessionParametersCreateInfoKHR](VkVideoEncodeH264SessionParametersCreateInfoKHR.html) structure
specified in the `pNext` chain of
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html) used to create a
[video session parameters](../../../../spec/latest/chapters/videocoding.html#video-session-parameters) object.
In this case, if the video codec operation the video session parameters
object is created with is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then it defines the
set of initial parameters to add to the created object (see
[Creating Video Session    Parameters](../../../../spec/latest/chapters/videocoding.html#creating-video-session-parameters)).

* 
In the `pNext` chain of [VkVideoSessionParametersUpdateInfoKHR](VkVideoSessionParametersUpdateInfoKHR.html).
In this case, if the video codec operation the
[video session parameters](../../../../spec/latest/chapters/videocoding.html#video-session-parameters) object to be
updated was created with is
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then it defines the
set of parameters to add to it (see
[Updating Video Session Parameters](../../../../spec/latest/chapters/videocoding.html#video-session-parameters-update)).

Valid Usage

* 
[](#VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-None-04837) VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-None-04837

The `seq_parameter_set_id` member of each
`StdVideoH264SequenceParameterSet` structure specified in the
elements of `pStdSPSs` **must** be unique within `pStdSPSs`

* 
[](#VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-None-04838) VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-None-04838

The pair constructed from the `seq_parameter_set_id` and
`pic_parameter_set_id` members of each
`StdVideoH264PictureParameterSet` structure specified in the elements
of `pStdPPSs` **must** be unique within `pStdPPSs`

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-sType-sType) VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_ADD_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-pStdSPSs-parameter) VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-pStdSPSs-parameter

 If `stdSPSCount` is not `0`, and `pStdSPSs` is not `NULL`, `pStdSPSs` **must** be a valid pointer to an array of `stdSPSCount` `StdVideoH264SequenceParameterSet` values

* 
[](#VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-pStdPPSs-parameter) VUID-VkVideoEncodeH264SessionParametersAddInfoKHR-pStdPPSs-parameter

 If `stdPPSCount` is not `0`, and `pStdPPSs` is not `NULL`, `pStdPPSs` **must** be a valid pointer to an array of `stdPPSCount` `StdVideoH264PictureParameterSet` values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionParametersUpdateInfoKHR](VkVideoSessionParametersUpdateInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeH264SessionParametersCreateInfoKHR](VkVideoEncodeH264SessionParametersCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264SessionParametersAddInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
