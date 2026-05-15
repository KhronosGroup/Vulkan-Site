# VkVideoEncodeFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeFlagBitsKHR - Video encode flags

Bits which **can** be set in [VkVideoEncodeInfoKHR](VkVideoEncodeInfoKHR.html)::`flags`,
specifying video encode flags, are:

// Provided by VK_KHR_video_encode_quantization_map
typedef enum VkVideoEncodeFlagBitsKHR {
  // Provided by VK_KHR_video_encode_intra_refresh
    VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR = 0x00000004,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR = 0x00000001,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR = 0x00000002,
} VkVideoEncodeFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_WITH_QUANTIZATION_DELTA_MAP_BIT_KHR](#) specifies the
use of a [quantization delta map](../../../../spec/latest/chapters/videocoding.html#encode-quantization-delta-map) in the
issued [video encode operations](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_VIDEO_ENCODE_WITH_EMPHASIS_MAP_BIT_KHR](#) specifies the use of an
[emphasis map](../../../../spec/latest/chapters/videocoding.html#encode-emphasis-map) in the issued
[video encode operations](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_VIDEO_ENCODE_INTRA_REFRESH_BIT_KHR](#) enables
[intra refresh](../../../../spec/latest/chapters/videocoding.html#encode-intra-refresh) for the encoded picture.

[VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html), [VkVideoEncodeFlagsKHR](VkVideoEncodeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
