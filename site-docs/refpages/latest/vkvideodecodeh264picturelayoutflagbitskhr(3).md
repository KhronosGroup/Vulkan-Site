# VkVideoDecodeH264PictureLayoutFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH264PictureLayoutFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH264PictureLayoutFlagBitsKHR - H.264 video decode picture layout flags

The H.264 video decode picture layout flags are defined as follows:

// Provided by VK_KHR_video_decode_h264
typedef enum VkVideoDecodeH264PictureLayoutFlagBitsKHR {
    VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_PROGRESSIVE_KHR = 0,
    VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR = 0x00000001,
    VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR = 0x00000002,
} VkVideoDecodeH264PictureLayoutFlagBitsKHR;

* 
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_PROGRESSIVE_KHR](#) specifies
support for progressive content.
This flag has the value `0`.

* 
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_INTERLEAVED_LINES_BIT_KHR](#)
specifies support for or use of a picture layout for interlaced content
where all lines belonging to the top field are decoded to the
even-numbered lines within the picture resource, and all lines belonging
to the bottom field are decoded to the odd-numbered lines within the
picture resource.

* 
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR](#)
specifies support for or use of a picture layout for interlaced content
where all lines belonging to a field are grouped together in a single
image subregion, and the two fields comprising the frame **can** be stored
in separate image subregions of the same image subresource or in
separate image subresources.

[VK_KHR_video_decode_h264](VK_KHR_video_decode_h264.html), [VkVideoDecodeH264PictureLayoutFlagsKHR](VkVideoDecodeH264PictureLayoutFlagsKHR.html), [VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH264PictureLayoutFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
