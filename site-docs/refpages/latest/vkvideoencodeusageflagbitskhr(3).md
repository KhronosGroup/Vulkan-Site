# VkVideoEncodeUsageFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeUsageFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeUsageFlagBitsKHR - Video encode usage flags

The following bits **can** be specified in
[VkVideoEncodeUsageInfoKHR](VkVideoEncodeUsageInfoKHR.html)::`videoUsageHints` as a hint about the
video encode use case:

// Provided by VK_KHR_video_encode_queue
typedef enum VkVideoEncodeUsageFlagBitsKHR {
    VK_VIDEO_ENCODE_USAGE_DEFAULT_KHR = 0,
    VK_VIDEO_ENCODE_USAGE_TRANSCODING_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_USAGE_STREAMING_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_USAGE_RECORDING_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_USAGE_CONFERENCING_BIT_KHR = 0x00000008,
} VkVideoEncodeUsageFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_USAGE_TRANSCODING_BIT_KHR](#) specifies that video
encoding is intended to be used in conjunction with video decoding to
transcode a video bitstream with the same and/or different codecs.

* 
[VK_VIDEO_ENCODE_USAGE_STREAMING_BIT_KHR](#) specifies that video
encoding is intended to be used to produce a video bitstream that is
expected to be sent as a continuous flow over network.

* 
[VK_VIDEO_ENCODE_USAGE_RECORDING_BIT_KHR](#) specifies that video
encoding is intended to be used for real-time recording for offline
consumption.

* 
[VK_VIDEO_ENCODE_USAGE_CONFERENCING_BIT_KHR](#) specifies that video
encoding is intended to be used in a video conferencing scenario.

|  | There are no restrictions on the combination of bits that **can** be specified
| --- | --- |
by the application.
However, applications **should** use reasonable combinations in order for the
implementation to be able to select the most appropriate mode of operation
for the particular use case. |

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkVideoEncodeUsageFlagsKHR](VkVideoEncodeUsageFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeUsageFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
