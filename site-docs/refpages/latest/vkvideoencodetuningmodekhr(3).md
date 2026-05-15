# VkVideoEncodeTuningModeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeTuningModeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeTuningModeKHR - Video encode tuning mode

Possible video encode tuning mode values are as follows:

// Provided by VK_KHR_video_encode_queue
typedef enum VkVideoEncodeTuningModeKHR {
    VK_VIDEO_ENCODE_TUNING_MODE_DEFAULT_KHR = 0,
    VK_VIDEO_ENCODE_TUNING_MODE_HIGH_QUALITY_KHR = 1,
    VK_VIDEO_ENCODE_TUNING_MODE_LOW_LATENCY_KHR = 2,
    VK_VIDEO_ENCODE_TUNING_MODE_ULTRA_LOW_LATENCY_KHR = 3,
    VK_VIDEO_ENCODE_TUNING_MODE_LOSSLESS_KHR = 4,
} VkVideoEncodeTuningModeKHR;

* 
[VK_VIDEO_ENCODE_TUNING_MODE_DEFAULT_KHR](#) specifies the default
tuning mode.

* 
[VK_VIDEO_ENCODE_TUNING_MODE_HIGH_QUALITY_KHR](#) specifies that video
encoding is tuned for high quality.
When using this tuning mode, the implementation **may** compromise the
latency of video encoding operations to improve quality.

* 
[VK_VIDEO_ENCODE_TUNING_MODE_LOW_LATENCY_KHR](#) specifies that video
encoding is tuned for low latency.
When using this tuning mode, the implementation **may** compromise quality
to increase the performance and lower the latency of video encode
operations.

* 
[VK_VIDEO_ENCODE_TUNING_MODE_ULTRA_LOW_LATENCY_KHR](#) specifies that
video encoding is tuned for ultra-low latency.
When using this tuning mode, the implementation **may** compromise quality
to maximize the performance and minimize the latency of video encoding
operations.

* 
[VK_VIDEO_ENCODE_TUNING_MODE_LOSSLESS_KHR](#) specifies that video
encoding is tuned for lossless encoding.
When using this tuning mode, video encode operations produce lossless
output.

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkVideoEncodeUsageInfoKHR](VkVideoEncodeUsageInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeTuningModeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
