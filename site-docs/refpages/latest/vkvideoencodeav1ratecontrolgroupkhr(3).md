# VkVideoEncodeAV1RateControlGroupKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1RateControlGroupKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1RateControlGroupKHR - AV1 encode rate control group

Possible AV1 encode rate control groups are as follows:

// Provided by VK_KHR_video_encode_av1
typedef enum VkVideoEncodeAV1RateControlGroupKHR {
    VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_INTRA_KHR = 0,
    VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_PREDICTIVE_KHR = 1,
    VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_BIPREDICTIVE_KHR = 2,
} VkVideoEncodeAV1RateControlGroupKHR;

* 
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_INTRA_KHR](#) **should** be
specified when encoding AV1 frames that use intra-only prediction (e.g.
when encoding AV1 frames of type `STD_VIDEO_AV1_FRAME_TYPE_KEY` or
`STD_VIDEO_AV1_FRAME_TYPE_INTRA_ONLY`).

* 
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_PREDICTIVE_KHR](#) **should** be
specified when encoding AV1 frames that only have forward references in
display order.

* 
[VK_VIDEO_ENCODE_AV1_RATE_CONTROL_GROUP_BIPREDICTIVE_KHR](#) **should** be
specified when encoding AV1 frames that have backward references in
display order.

|  | While the application can specify any rate control group for any frame,
| --- | --- |
regardless of the frame type, prediction mode, or prediction direction,
specifying a rate control group that does not reflect the prediction
direction used by the encoded frame may result in unexpected behavior of the
implementation’s rate control algorithm. |

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkVideoEncodeAV1PictureInfoKHR](VkVideoEncodeAV1PictureInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1RateControlGroupKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
