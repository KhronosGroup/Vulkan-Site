# VkVideoCodingControlFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoCodingControlFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoCodingControlFlagBitsKHR - Video coding control flags

Bits which **can** be set in [VkVideoCodingControlInfoKHR](VkVideoCodingControlInfoKHR.html)::`flags`,
specifying the video coding control parameters to be modified, are:

// Provided by VK_KHR_video_queue
typedef enum VkVideoCodingControlFlagBitsKHR {
    VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR = 0x00000001,
  // Provided by VK_KHR_video_encode_queue
    VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_video_encode_queue
    VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR = 0x00000004,
} VkVideoCodingControlFlagBitsKHR;

* 
[VK_VIDEO_CODING_CONTROL_RESET_BIT_KHR](#) specifies a request for the
bound video session to be reset before other coding control parameters
are applied.

* 
[VK_VIDEO_CODING_CONTROL_ENCODE_RATE_CONTROL_BIT_KHR](#) specifies that
the coding control parameters include video encode rate control
parameters (see [VkVideoEncodeRateControlInfoKHR](VkVideoEncodeRateControlInfoKHR.html)).

* 
[VK_VIDEO_CODING_CONTROL_ENCODE_QUALITY_LEVEL_BIT_KHR](#) specifies
that the coding control parameters include video encode quality level
parameters (see [VkVideoEncodeQualityLevelInfoKHR](VkVideoEncodeQualityLevelInfoKHR.html)).

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkVideoCodingControlFlagsKHR](VkVideoCodingControlFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoCodingControlFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
