# VkVideoEncodePerPartitionFeedbackFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodePerPartitionFeedbackFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodePerPartitionFeedbackFlagBitsKHR - Bits specifying queried per picture partition video encode feedback values

Bits which **can** be set in
[VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR](VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR.html)::`perPartitionEncodeFeedbackFlags`
for video encode feedback query pools are:

// Provided by VK_KHR_video_encode_feedback2
typedef enum VkVideoEncodePerPartitionFeedbackFlagBitsKHR {
    VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_STATUS_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR = 0x00000004,
} VkVideoEncodePerPartitionFeedbackFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_STATUS_BIT_KHR](#) specifies
that queries managed by the pool will capture the result status of each
encoded picture partition.
These result status values are reported as [VkQueryResultStatusKHR](VkQueryResultStatusKHR.html)
values, similar to [result status queries](../../../../spec/latest/chapters/queries.html#queries-result-status-only)
but indicate the result status of the encoding of individual picture
partitions instead of that of the whole video encode operation.

* 
[VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR](#)
specifies that queries managed by the pool will capture the byte offset
of the bitstream data of the corresponding picture partition written to
the bitstream buffer specified in
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBuffer` relative to the offset
specified in [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBufferOffset`.

* 
[VK_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR](#)
specifies that queries managed by the pool will capture the number of
bytes written by the video encode operation for the corresponding
picture partition to the bitstream buffer specified in
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`dstBuffer`.

The bitstream offsets reported for subsequent picture partitions are always
monotonically increasing and the bitstream buffer ranges corresponding to
individual picture partitions do not overlap.

|  | The bitstream range corresponding to the entire frame, as reported through
| --- | --- |
the [VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html) and
[VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR](VkVideoEncodeFeedbackFlagBitsKHR.html) feedback
values may contain additional data such as frame headers.
In addition, certain implementations or video compression standards may have
additional payloads in between subsequent picture partitions.
For example, AV1 bitstreams contain the `tile_size_minus_1` syntax
element in between subsequent tiles that are not part of the actual tile
data.
Therefore the specification only guarantees monotonically increasing offsets
and non-overlapping ranges for picture partitions but does not guarantee
that the picture partition ranges are tightly packed or that the union of
the picture partition ranges covers the entire range of the bitstream
output. |

When retrieving the results of video encode feedback queries with per
picture partition video encode feedback values, the values corresponding to
each enabled per picture partition video encode feedback are written for
each encoded picture partition in the order of the bits defined above, in
picture-partition-major order.

If the video encode operation results in more encoded picture partitions
than the `maxPerPartitionFeedbackEntries` specified in the
[VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR](VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR.html) structure the
query pool was created with, then the per picture partition feedback values
corresponding to additional picture partitions are not available for
retrieval.

If the per picture partition feedback status is negative, then all other per
partition feedback values corresponding to that picture partition will be
**undefined**.
Specifically, implementations **may** report a per picture partition feedback
status of
[VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR](VkQueryResultStatusKHR.html) for the
picture partition(s) whose encoded bitstream data no longer fit into the
destination video bitstream buffer range.

[VK_KHR_video_encode_feedback2](VK_KHR_video_encode_feedback2.html), [VkVideoEncodePerPartitionFeedbackFlagsKHR](VkVideoEncodePerPartitionFeedbackFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkVideoEncodePerPartitionFeedbackFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
