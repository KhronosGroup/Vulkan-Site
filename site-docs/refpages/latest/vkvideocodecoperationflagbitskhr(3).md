# VkVideoCodecOperationFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoCodecOperationFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoCodecOperationFlagBitsKHR - Video codec operation bits

Possible values of [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)::`videoCodecOperation`,
specifying the type of video coding operation and video compression standard
used by a video profile, are:

// Provided by VK_KHR_video_queue
typedef enum VkVideoCodecOperationFlagBitsKHR {
    VK_VIDEO_CODEC_OPERATION_NONE_KHR = 0,
  // Provided by VK_KHR_video_encode_h264
    VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR = 0x00010000,
  // Provided by VK_KHR_video_encode_h265
    VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR = 0x00020000,
  // Provided by VK_KHR_video_decode_h264
    VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR = 0x00000001,
  // Provided by VK_KHR_video_decode_h265
    VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR = 0x00000002,
  // Provided by VK_KHR_video_decode_av1
    VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR = 0x00000004,
  // Provided by VK_KHR_video_encode_av1
    VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR = 0x00040000,
  // Provided by VK_KHR_video_decode_vp9
    VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR = 0x00000008,
} VkVideoCodecOperationFlagBitsKHR;

* 
[VK_VIDEO_CODEC_OPERATION_NONE_KHR](#) specifies that no video codec
operations are supported.

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_H264_BIT_KHR](#) specifies support for
[H.264 decode operations](../../../../spec/latest/chapters/videocoding.html#decode-h264).

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_H265_BIT_KHR](#) specifies support for
[H.265 decode operations](../../../../spec/latest/chapters/videocoding.html#decode-h265).

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](#) specifies support for
[VP9 decode operations](../../../../spec/latest/chapters/videocoding.html#decode-vp9).

* 
[VK_VIDEO_CODEC_OPERATION_DECODE_AV1_BIT_KHR](#) specifies support for
[AV1 decode operations](../../../../spec/latest/chapters/videocoding.html#decode-av1).

* 
[VK_VIDEO_CODEC_OPERATION_ENCODE_H264_BIT_KHR](#) specifies support for
[H.264 encode operations](../../../../spec/latest/chapters/videocoding.html#encode-h264).

* 
[VK_VIDEO_CODEC_OPERATION_ENCODE_H265_BIT_KHR](#) specifies support for
[H.265 encode operations](../../../../spec/latest/chapters/videocoding.html#encode-h265).

* 
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](#) specifies support for
[AV1 encode operations](../../../../spec/latest/chapters/videocoding.html#encode-av1).

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkVideoCodecOperationFlagsKHR](VkVideoCodecOperationFlagsKHR.html), [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoCodecOperationFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
