# VkVideoEncodeH264SessionParametersFeedbackInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264SessionParametersFeedbackInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264SessionParametersFeedbackInfoKHR - Structure providing feedback about the requested H.264 video session parameters

The `VkVideoEncodeH264SessionParametersFeedbackInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264SessionParametersFeedbackInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hasStdSPSOverrides;
    VkBool32           hasStdPPSOverrides;
} VkVideoEncodeH264SessionParametersFeedbackInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hasStdSPSOverrides` indicates whether any of the parameters of the
requested [H.264 sequence parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h264-sps), if one was
requested via
[VkVideoEncodeH264SessionParametersGetInfoKHR](VkVideoEncodeH264SessionParametersGetInfoKHR.html)::`writeStdSPS`,
were [overridden](../../../../spec/latest/chapters/videocoding.html#encode-overrides) by the implementation.

* 
`hasStdPPSOverrides` indicates whether any of the parameters of the
requested [H.264 picture parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h264-pps), if one was
requested via
[VkVideoEncodeH264SessionParametersGetInfoKHR](VkVideoEncodeH264SessionParametersGetInfoKHR.html)::`writeStdPPS`,
were [overridden](../../../../spec/latest/chapters/videocoding.html#encode-overrides) by the implementation.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264SessionParametersFeedbackInfoKHR-sType-sType) VUID-VkVideoEncodeH264SessionParametersFeedbackInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_FEEDBACK_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeSessionParametersFeedbackInfoKHR](VkVideoEncodeSessionParametersFeedbackInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264SessionParametersFeedbackInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
