# VkVideoEncodeSessionParametersGetInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeSessionParametersGetInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeSessionParametersGetInfoKHR - Structure specifying parameters for retrieving encoded video session parameter data

The `VkVideoEncodeSessionParametersGetInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeSessionParametersGetInfoKHR {
    VkStructureType                sType;
    const void*                    pNext;
    VkVideoSessionParametersKHR    videoSessionParameters;
} VkVideoEncodeSessionParametersGetInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`videoSessionParameters` is the [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html)
object to retrieve encoded parameter data from.

Depending on the used video encode operation, additional codec-specific
structures **may** need to be included in the `pNext` chain of this
structure to identify the specific video session parameters to retrieve
encoded parameter data for, as described in the corresponding sections.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeSessionParametersGetInfoKHR-sType-sType) VUID-VkVideoEncodeSessionParametersGetInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_GET_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEncodeSessionParametersGetInfoKHR-pNext-pNext) VUID-VkVideoEncodeSessionParametersGetInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkVideoEncodeH264SessionParametersGetInfoKHR](VkVideoEncodeH264SessionParametersGetInfoKHR.html) or [VkVideoEncodeH265SessionParametersGetInfoKHR](VkVideoEncodeH265SessionParametersGetInfoKHR.html)

* 
[](#VUID-VkVideoEncodeSessionParametersGetInfoKHR-sType-unique) VUID-VkVideoEncodeSessionParametersGetInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkVideoEncodeSessionParametersGetInfoKHR-videoSessionParameters-parameter) VUID-VkVideoEncodeSessionParametersGetInfoKHR-videoSessionParameters-parameter

 `videoSessionParameters` **must** be a valid [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html) handle

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html), [vkGetEncodedVideoSessionParametersKHR](vkGetEncodedVideoSessionParametersKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeSessionParametersGetInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
