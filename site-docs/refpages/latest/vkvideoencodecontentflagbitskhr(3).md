# VkVideoEncodeContentFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeContentFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeContentFlagBitsKHR - Video encode content flags

The following bits **can** be specified in
[VkVideoEncodeUsageInfoKHR](VkVideoEncodeUsageInfoKHR.html)::`videoContentHints` as a hint about the
encoded video content:

// Provided by VK_KHR_video_encode_queue
typedef enum VkVideoEncodeContentFlagBitsKHR {
    VK_VIDEO_ENCODE_CONTENT_DEFAULT_KHR = 0,
    VK_VIDEO_ENCODE_CONTENT_CAMERA_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_CONTENT_DESKTOP_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_CONTENT_RENDERED_BIT_KHR = 0x00000004,
} VkVideoEncodeContentFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_CONTENT_CAMERA_BIT_KHR](#) specifies that video
encoding is intended to be used to encode camera content.

* 
[VK_VIDEO_ENCODE_CONTENT_DESKTOP_BIT_KHR](#) specifies that video
encoding is intended to be used to encode desktop content.

* 
[VK_VIDEO_ENCODE_CONTENT_RENDERED_BIT_KHR](#) specified that video
encoding is intended to be used to encode rendered (e.g. game) content.

|  | There are no restrictions on the combination of bits that **can** be specified
| --- | --- |
by the application.
However, applications **should** use reasonable combinations in order for the
implementation to be able to select the most appropriate mode of operation
for the particular content type. |

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkVideoEncodeContentFlagsKHR](VkVideoEncodeContentFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeContentFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
