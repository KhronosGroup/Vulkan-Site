# VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR - Structure describing the video encode profile and quality level to query properties for

The `VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR {
    VkStructureType                 sType;
    const void*                     pNext;
    const VkVideoProfileInfoKHR*    pVideoProfile;
    uint32_t                        qualityLevel;
} VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pVideoProfile` is a pointer to a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structure specifying the video profile to query the video encode quality
level properties for.

* 
`qualityLevel` is the video encode quality level to query properties
for.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pVideoProfile-08259) VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pVideoProfile-08259

`pVideoProfile` **must** be a [supported video    profile](../../../../spec/latest/chapters/videocoding.html#video-profile-support)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pVideoProfile-08260) VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pVideoProfile-08260

`pVideoProfile->videoCodecOperation` **must** specify an encode
operation

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-qualityLevel-08261) VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-qualityLevel-08261

`qualityLevel` **must** be less than
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`maxQualityLevels`, as returned
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile
specified in `pVideoProfile`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pNext-pNext) VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pVideoProfile-parameter) VUID-VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR-pVideoProfile-parameter

 `pVideoProfile` **must** be a valid pointer to a valid [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html), [vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR](vkGetPhysicalDeviceVideoEncodeQualityLevelPropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkPhysicalDeviceVideoEncodeQualityLevelInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
