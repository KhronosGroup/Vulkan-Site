# VkVideoDecodeUsageFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeUsageFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeUsageFlagBitsKHR - Video decode usage flags

The following bits **can** be specified in
[VkVideoDecodeUsageInfoKHR](VkVideoDecodeUsageInfoKHR.html)::`videoUsageHints` as a hint about the
video decode use case:

// Provided by VK_KHR_video_decode_queue
typedef enum VkVideoDecodeUsageFlagBitsKHR {
    VK_VIDEO_DECODE_USAGE_DEFAULT_KHR = 0,
    VK_VIDEO_DECODE_USAGE_TRANSCODING_BIT_KHR = 0x00000001,
    VK_VIDEO_DECODE_USAGE_OFFLINE_BIT_KHR = 0x00000002,
    VK_VIDEO_DECODE_USAGE_STREAMING_BIT_KHR = 0x00000004,
} VkVideoDecodeUsageFlagBitsKHR;

* 
[VK_VIDEO_DECODE_USAGE_TRANSCODING_BIT_KHR](#) specifies that video
decoding is intended to be used in conjunction with video encoding to
transcode a video bitstream with the same and/or different codecs.

* 
[VK_VIDEO_DECODE_USAGE_OFFLINE_BIT_KHR](#) specifies that video
decoding is intended to be used to consume a local video bitstream.

* 
[VK_VIDEO_DECODE_USAGE_STREAMING_BIT_KHR](#) specifies that video
decoding is intended to be used to consume a video bitstream received as
a continuous flow over network.

|  | There are no restrictions on the combination of bits that **can** be specified
| --- | --- |
by the application.
However, applications **should** use reasonable combinations in order for the
implementation to be able to select the most appropriate mode of operation
for the particular use case. |

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html), [VkVideoDecodeUsageFlagsKHR](VkVideoDecodeUsageFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeUsageFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
