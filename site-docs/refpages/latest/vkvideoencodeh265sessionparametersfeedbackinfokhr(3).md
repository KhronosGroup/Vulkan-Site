# VkVideoEncodeH265SessionParametersFeedbackInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265SessionParametersFeedbackInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265SessionParametersFeedbackInfoKHR - Structure providing feedback about the requested H.265 video session parameters

The `VkVideoEncodeH265SessionParametersFeedbackInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265SessionParametersFeedbackInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hasStdVPSOverrides;
    VkBool32           hasStdSPSOverrides;
    VkBool32           hasStdPPSOverrides;
} VkVideoEncodeH265SessionParametersFeedbackInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hasStdVPSOverrides` indicates whether any of the parameters of the
requested [H.265 video parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-vps), if one was
requested via
[VkVideoEncodeH265SessionParametersGetInfoKHR](VkVideoEncodeH265SessionParametersGetInfoKHR.html)::`writeStdVPS`,
were [overridden](../../../../spec/latest/chapters/videocoding.html#encode-overrides) by the implementation.

* 
`hasStdSPSOverrides` indicates whether any of the parameters of the
requested [H.265 sequence parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-sps), if one was
requested via
[VkVideoEncodeH265SessionParametersGetInfoKHR](VkVideoEncodeH265SessionParametersGetInfoKHR.html)::`writeStdSPS`,
were [overridden](../../../../spec/latest/chapters/videocoding.html#encode-overrides) by the implementation.

* 
`hasStdPPSOverrides` indicates whether any of the parameters of the
requested [H.265 picture parameter set](../../../../spec/latest/chapters/videocoding.html#encode-h265-pps), if one was
requested via
[VkVideoEncodeH265SessionParametersGetInfoKHR](VkVideoEncodeH265SessionParametersGetInfoKHR.html)::`writeStdPPS`,
were [overridden](../../../../spec/latest/chapters/videocoding.html#encode-overrides) by the implementation.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265SessionParametersFeedbackInfoKHR-sType-sType) VUID-VkVideoEncodeH265SessionParametersFeedbackInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_PARAMETERS_FEEDBACK_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoEncodeSessionParametersFeedbackInfoKHR](VkVideoEncodeSessionParametersFeedbackInfoKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265SessionParametersFeedbackInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
