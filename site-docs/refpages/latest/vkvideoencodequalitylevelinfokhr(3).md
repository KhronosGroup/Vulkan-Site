# VkVideoEncodeQualityLevelInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeQualityLevelInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeQualityLevelInfoKHR - Structure specifying used video encode quality level

The `VkVideoEncodeQualityLevelInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkVideoEncodeQualityLevelInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           qualityLevel;
} VkVideoEncodeQualityLevelInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`qualityLevel` is the used video encode quality level.

This structure **can** be specified in the following places:

* 
In the `pNext` chain of [VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)
to specify the video encode quality level to use for a video session
parameters object created for a video encode session.
If no instance of this structure is included in the `pNext` chain of
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html), then the video session
parameters object is created with a video encode quality level of zero.

* 
In the `pNext` chain of [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html) to change
the video encode quality level state of the bound video session.

Valid Usage

* 
[](#VUID-VkVideoEncodeQualityLevelInfoKHR-qualityLevel-08311) VUID-VkVideoEncodeQualityLevelInfoKHR-qualityLevel-08311

`qualityLevel` **must** be less than
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`maxQualityLevels`, as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the used video
profile

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeQualityLevelInfoKHR-sType-sType) VUID-VkVideoEncodeQualityLevelInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)

* 
[VkVideoSessionParametersCreateInfoKHR](VkVideoSessionParametersCreateInfoKHR.html)

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeQualityLevelInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
