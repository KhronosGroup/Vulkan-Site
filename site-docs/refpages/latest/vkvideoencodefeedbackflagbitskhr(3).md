# VkVideoEncodeFeedbackFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeFeedbackFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeFeedbackFlagBitsKHR - Bits specifying queried video encode feedback values

Bits which **can** be set in
[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](VkQueryPoolVideoEncodeFeedbackCreateInfoKHR.html)::`encodeFeedbackFlags`
for video encode feedback query pools are:

// Provided by VK_KHR_video_encode_queue
typedef enum VkVideoEncodeFeedbackFlagBitsKHR {
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR = 0x00000004,
} VkVideoEncodeFeedbackFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR](#) specifies
that queries managed by the pool will capture the byte offset of the
bitstream data written by the video encode operation to the bitstream
buffer specified in [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBuffer` relative
to the offset specified in
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBufferOffset`.
For the first video encode operation issued by any
[video encode command](../../../../spec/latest/chapters/videocoding.html#video-encode-commands), this value will always
be zero, meaning that bitstream data is always written to the buffer
specified in [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBuffer` starting from
the offset specified in
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBufferOffset`.

* 
[VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR](#) specifies
that queries managed by the pool will capture the number of bytes
written by the video encode operation to the bitstream buffer specified
in [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBuffer`.

* 
[VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR](#) specifies
that queries managed by the pool will capture a boolean value indicating
that the data written to the bitstream buffer specified in
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBuffer` contains
[overridden parameters](../../../../spec/latest/chapters/videocoding.html#encode-overrides).

When retrieving the results of video encode feedback queries, the values
corresponding to each enabled video encode feedback are written in the order
of the bits defined above, followed by an optional value indicating
availability or result status if [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html)
or [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) is specified, respectively.

If the result status of a video encode feedback query is negative, then the
results of all enabled video encode feedback values will be **undefined**.

|  | Applications should always specify [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)
| --- | --- |
when retrieving the results of video encode feedback queries and ignore such
**undefined** video encode feedback values for any
[unsuccessfully](../../../../spec/latest/chapters/videocoding.html#encode-unsuccessful) completed video encode operations. |

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkVideoEncodeFeedbackFlagsKHR](VkVideoEncodeFeedbackFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkVideoEncodeFeedbackFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
