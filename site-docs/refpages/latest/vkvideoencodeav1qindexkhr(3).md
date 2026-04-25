# VkVideoEncodeAV1QIndexKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1QIndexKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1QIndexKHR - Structure describing AV1 quantizer index values per prediction mode

The `VkVideoEncodeAV1QIndexKHR` structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkVideoEncodeAV1QIndexKHR {
    uint32_t    intraQIndex;
    uint32_t    predictiveQIndex;
    uint32_t    bipredictiveQIndex;
} VkVideoEncodeAV1QIndexKHR;

* 
`intraQIndex` is the quantizer index to be used for frames encoded
with [VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_INTRA_KHR](VkVideoEncodeAV1RateControlGroupKHR.html).

* 
`predictiveQIndex` is the quantizer index to be used for frames
encoded with
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_PREDICTIVE_KHR](VkVideoEncodeAV1RateControlGroupKHR.html).

* 
`bipredictiveQIndex` is the quantizer index to be used for frames
encoded with
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_BIPREDICTIVE_KHR](VkVideoEncodeAV1RateControlGroupKHR.html).

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkVideoEncodeAV1QualityLevelPropertiesKHR](VkVideoEncodeAV1QualityLevelPropertiesKHR.html), [VkVideoEncodeAV1RateControlLayerInfoKHR](VkVideoEncodeAV1RateControlLayerInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1QIndexKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
