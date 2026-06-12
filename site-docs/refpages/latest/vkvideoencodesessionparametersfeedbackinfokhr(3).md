# VkVideoEncodeSessionParametersFeedbackInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeSessionParametersFeedbackInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeSessionParametersFeedbackInfoKHR - Structure providing feedback about the requested video session parameters

The `VkVideoEncodeSessionParametersFeedbackInfoKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeSessionParametersFeedbackInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hasOverrides;
} VkVideoEncodeSessionParametersFeedbackInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hasOverrides` indicates whether any of the requested parameter data
were [overridden](../../../../spec/latest/chapters/videocoding.html#encode-overrides) by the implementation.

Depending on the used video encode operation, additional codec-specific
structures **can** be included in the `pNext` chain of this structure to
capture codec-specific feedback information about the requested parameter
data, as described in the corresponding sections.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeSessionParametersFeedbackInfoKHR-sType-sType) VUID-VkVideoEncodeSessionParametersFeedbackInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_FEEDBACK_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeSessionParametersFeedbackInfoKHR-pNext-pNext) VUID-VkVideoEncodeSessionParametersFeedbackInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeH264SessionParametersFeedbackInfoKHR](VkVideoEncodeH264SessionParametersFeedbackInfoKHR.html) or [VkVideoEncodeH265SessionParametersFeedbackInfoKHR](VkVideoEncodeH265SessionParametersFeedbackInfoKHR.html)

* 
[](#VUID-VkVideoEncodeSessionParametersFeedbackInfoKHR-sType-unique) VUID-VkVideoEncodeSessionParametersFeedbackInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), `VkBool32`, [VkStructureType](VkStructureType.html), [vkGetEncodedVideoSessionParametersKHR](vkGetEncodedVideoSessionParametersKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeSessionParametersFeedbackInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
