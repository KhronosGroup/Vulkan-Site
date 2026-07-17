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
  // Provided by VK_KHR_video_encode_feedback2
    VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR = 0x00000008,
  // Provided by VK_KHR_video_encode_feedback2
    VK_VIDEO_ENCODE_FEEDBACK_MIN_QUANTIZATION_BIT_KHR = 0x00000010,
  // Provided by VK_KHR_video_encode_feedback2
    VK_VIDEO_ENCODE_FEEDBACK_MAX_QUANTIZATION_BIT_KHR = 0x00000020,
  // Provided by VK_KHR_video_encode_feedback2
    VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR = 0x00000040,
  // Provided by VK_KHR_video_encode_feedback2
    VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR = 0x00000080,
  // Provided by VK_KHR_video_encode_feedback2
    VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR = 0x00000100,
  // Provided by VK_KHR_video_encode_feedback2
    VK_VIDEO_ENCODE_FEEDBACK_PICTURE_PARTITION_COUNT_BIT_KHR = 0x00000200,
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

* 
[VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR](#) specifies
that queries managed by the pool will capture the average quantization
used across the encoded coding blocks.

* 
[VK_VIDEO_ENCODE_FEEDBACK_MIN_QUANTIZATION_BIT_KHR](#) specifies that
queries managed by the pool will capture the minimum quantization used
across the encoded coding blocks.

* 
[VK_VIDEO_ENCODE_FEEDBACK_MAX_QUANTIZATION_BIT_KHR](#) specifies that
queries managed by the pool will capture the maximum quantization used
across the encoded coding blocks.

* 
[VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR](#) specifies that
queries managed by the pool will capture the number of pixels encoded as
intra blocks, including or excluding any skipped blocks, as described
below.

* 
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#) specifies that
queries managed by the pool will capture the number of pixels encoded as
inter blocks, including or excluding any skipped blocks, as described
below.

* 
[VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR](#) specifies that
queries managed by the pool will capture the number of pixels encoded as
skipped blocks.

* 
[VK_VIDEO_ENCODE_FEEDBACK_PICTURE_PARTITION_COUNT_BIT_KHR](#) specifies
that queries managed by the pool will capture the number of encoded
picture partitions.

The average, minimum, and maximum quantization values captured when
[VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR](#),
[VK_VIDEO_ENCODE_FEEDBACK_MIN_QUANTIZATION_BIT_KHR](#), and/or
[VK_VIDEO_ENCODE_FEEDBACK_MAX_QUANTIZATION_BIT_KHR](#) are specified,
respectively, depend on the used video profile:

* 
In case of [H.264 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile), this value is
a signed integer indicating the average, minimum, or maximum QP used
across the encoded coding blocks, respectively.

* 
In case of [H.265 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-h265-profile) this value is a
signed integer indicating the average, minimum, or maximum QP used
across the encoded coding blocks, respectively.

* 
In case of [AV1 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile) this value is an
unsigned integer indicating the average, minimum, or maximum quantizer
index used across the encoded coding blocks, respectively.

The rounding mode used to calculate the average value captured when
[VK_VIDEO_ENCODE_FEEDBACK_AVERAGE_QUANTIZATION_BIT_KHR](#) is specified is
**undefined**.

The number of pixels captured when
[VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR](#),
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#), and/or
[VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR](#) are specified include
padding pixels beyond the requested coded extent that are part of the
complete coding blocks encoded for the picture.

If [VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR](#) is not supported
for a video encode profile, then the results captured for
[VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR](#) and
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#) will always include
pixels in any intra or inter blocks, respectively, that are encoded as
skipped blocks.
Otherwise, the behavior depends on the used video profile:

* 
In case of [H.264 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-h264-profile), skipped blocks
are always inter blocks and the results captured for
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#) will always include
pixels encoded as skipped blocks.

|  | Implementations that would otherwise not count skipped pixels as inter
| --- | --- |
pixels can simply sum the captured non-skipped inter pixel count and skipped
pixel counts in the reported value for
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#). |

* 
In case of [H.265 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-h265-profile), skipped blocks
are always inter blocks and the results captured for
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#) will always include
pixels encoded as skipped blocks.

|  | Implementations that would otherwise not count skipped pixels as inter
| --- | --- |
pixels can simply sum the captured non-skipped inter pixel count and skipped
pixel counts in the reported value for
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#). |

* 
In case of [AV1 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile), both inter and
intra blocks **can** be skipped blocks.
Implementations **should** include any pixels encoded as skipped intra or
inter blocks in the results captured for
[VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR](#) and
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#), respectively, if
possible.
However, some implementations **may** not be able to do so if they do not
differentiate between skipped intra and inter blocks.
Therefore, in case of [AV1 encode profiles](../../../../spec/latest/chapters/videocoding.html#encode-av1-profile) that do
support [VK_VIDEO_ENCODE_FEEDBACK_SKIPPED_PIXELS_BIT_KHR](#)
implementations **must** either include skipped pixels part of intra and
inter blocks in both or neither of the results captured by
[VK_VIDEO_ENCODE_FEEDBACK_INTRA_PIXELS_BIT_KHR](#) and
[VK_VIDEO_ENCODE_FEEDBACK_INTER_PIXELS_BIT_KHR](#), respectively.

|  | Applications can detect whether the reported intra and inter pixel counts
| --- | --- |
include the skipped pixels or not, by checking whether the sum of the intra
and pixel pixels adds up to the coded extent padded to entire coding blocks. |

When retrieving the results of video encode feedback queries, the values
corresponding to each enabled video encode feedback are written in the order
of the bits defined above, followed by an optional value indicating
availability or result status if [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html)
or [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) is specified, respectively.
If [per picture partition feedback](../../../../spec/latest/chapters/queries.html#queries-video-encode-per-partition-feedback) is enabled, this is followed by the values corresponding to each
enabled per picture partition video encode feedback for each encoded picture
partition but at most for
[VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR](VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR.html)::`maxPerPartitionFeedbackEntries`
number of picture partitions, in picture-partition-major order.

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
