# VkVideoSessionParametersUpdateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoSessionParametersUpdateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoSessionParametersUpdateInfoKHR - Structure specifying video session parameters update information

The `VkVideoSessionParametersUpdateInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoSessionParametersUpdateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           updateSequenceCount;
} VkVideoSessionParametersUpdateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`updateSequenceCount` is the new [update    sequence count](../../../../spec/latest/chapters/videocoding.html#video-session-parameters) to set for the video session parameters object.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoSessionParametersUpdateInfoKHR-sType-sType) VUID-VkVideoSessionParametersUpdateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_UPDATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoSessionParametersUpdateInfoKHR-pNext-pNext) VUID-VkVideoSessionParametersUpdateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoDecodeH264SessionParametersAddInfoKHR](VkVideoDecodeH264SessionParametersAddInfoKHR.html), [VkVideoDecodeH265SessionParametersAddInfoKHR](VkVideoDecodeH265SessionParametersAddInfoKHR.html), [VkVideoEncodeH264SessionParametersAddInfoKHR](VkVideoEncodeH264SessionParametersAddInfoKHR.html), or [VkVideoEncodeH265SessionParametersAddInfoKHR](VkVideoEncodeH265SessionParametersAddInfoKHR.html)

* 
[](#VUID-VkVideoSessionParametersUpdateInfoKHR-sType-unique) VUID-VkVideoSessionParametersUpdateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkStructureType](VkStructureType.html), [vkUpdateVideoSessionParametersKHR](vkUpdateVideoSessionParametersKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoSessionParametersUpdateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
