# VkVideoEncodeAV1FrameSizeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1FrameSizeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1FrameSizeKHR - Structure describing frame size values per AV1 prediction mode

The `VkVideoEncodeAV1FrameSizeKHR` structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkVideoEncodeAV1FrameSizeKHR {
    uint32_t    intraFrameSize;
    uint32_t    predictiveFrameSize;
    uint32_t    bipredictiveFrameSize;
} VkVideoEncodeAV1FrameSizeKHR;

* 
`intraFrameSize` is the size in bytes to be used for frames encoded
with [VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_INTRA_KHR](VkVideoEncodeAV1RateControlGroupKHR.html).

* 
`predictiveFrameSize` is the size in bytes to be used for frames
encoded with
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_PREDICTIVE_KHR](VkVideoEncodeAV1RateControlGroupKHR.html).

* 
`bipredictiveFrameSize` is the size in bytes to be used for frames
encoded with
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_BIPREDICTIVE_KHR](VkVideoEncodeAV1RateControlGroupKHR.html).

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkVideoEncodeAV1RateControlLayerInfoKHR](VkVideoEncodeAV1RateControlLayerInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1FrameSizeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
