# VkVideoEncodeCapabilityFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeCapabilityFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeCapabilityFlagBitsKHR - Video encode capability flags

Bits which **may** be set in [VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`flags`,
indicating the encoding tools supported, are:

// Provided by VK_KHR_video_encode_queue
typedef enum VkVideoEncodeCapabilityFlagBitsKHR {
    VK_VIDEO_ENCODE_CAPABILITY_PRECEDING_EXTERNALLY_ENCODED_BYTES_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_CAPABILITY_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_DETECTION_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_VIDEO_ENCODE_CAPABILITY_QUANTIZATION_DELTA_MAP_BIT_KHR = 0x00000004,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_VIDEO_ENCODE_CAPABILITY_EMPHASIS_MAP_BIT_KHR = 0x00000008,
} VkVideoEncodeCapabilityFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_CAPABILITY_PRECEDING_EXTERNALLY_ENCODED_BYTES_BIT_KHR](#)
specifies that the implementation supports the use of
[VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`precedingExternallyEncodedBytes`.

* 
[VK_VIDEO_ENCODE_CAPABILITY_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_DETECTION_BIT_KHR](#)
specifies that the implementation is able to detect and report when the
destination video bitstream buffer range provided by the application is
not sufficiently large to fit the encoded bitstream data produced by a
video encode operation by reporting the
[VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR](VkQueryResultStatusKHR.html)
[query result status code](../../../../spec/latest/chapters/queries.html#query-result-status-codes).

|  | Some implementations **may** not be able to reliably detect insufficient
| --- | --- |
bitstream buffer range conditions in all situations.
Such implementations will not report support for the
[VK_VIDEO_ENCODE_CAPABILITY_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_DETECTION_BIT_KHR](#)
encode capability flag for the video profile, but **may** still report the
[VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR](VkQueryResultStatusKHR.html) query
result status code in certain cases.
Applications **should** always check for the specific query result status code
[VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR](VkQueryResultStatusKHR.html) even
when this encode capability flag is not supported by the implementation for
the video profile in question.
However, applications **must** not assume that a different negative query
result status code indicating an unsuccessful completion of a video encode
operation is not the result of an insufficient bitstream buffer condition
unless this encode capability flag is supported. |

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkVideoEncodeCapabilityFlagsKHR](VkVideoEncodeCapabilityFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeCapabilityFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
