# VkVideoComponentBitDepthFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoComponentBitDepthFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoComponentBitDepthFlagBitsKHR - Video format component bit depth

Possible values for the video format component bit depth are:

// Provided by VK_KHR_video_queue
typedef enum VkVideoComponentBitDepthFlagBitsKHR {
    VK_VIDEO_COMPONENT_BIT_DEPTH_INVALID_KHR = 0,
    VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR = 0x00000001,
    VK_VIDEO_COMPONENT_BIT_DEPTH_10_BIT_KHR = 0x00000004,
    VK_VIDEO_COMPONENT_BIT_DEPTH_12_BIT_KHR = 0x00000010,
} VkVideoComponentBitDepthFlagBitsKHR;

* 
[VK_VIDEO_COMPONENT_BIT_DEPTH_8_BIT_KHR](#) specifies a component bit
depth of 8 bits.

* 
[VK_VIDEO_COMPONENT_BIT_DEPTH_10_BIT_KHR](#) specifies a component bit
depth of 10 bits.

* 
[VK_VIDEO_COMPONENT_BIT_DEPTH_12_BIT_KHR](#) specifies a component bit
depth of 12 bits.

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkVideoComponentBitDepthFlagsKHR](VkVideoComponentBitDepthFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoComponentBitDepthFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
