# VkVideoEncodeH265TransformBlockSizeFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265TransformBlockSizeFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265TransformBlockSizeFlagBitsKHR - Supported transform block sizes for H.265 video encode

Bits which **may** be set in
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`transformBlockSizes`,
indicating the transform block sizes supported by the implementation, are:

// Provided by VK_KHR_video_encode_h265
typedef enum VkVideoEncodeH265TransformBlockSizeFlagBitsKHR {
    VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_4_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_8_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_16_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_32_BIT_KHR = 0x00000008,
} VkVideoEncodeH265TransformBlockSizeFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_4_BIT_KHR](#) specifies that
a transform block size of 4x4 is supported.

* 
[VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_8_BIT_KHR](#) specifies that
a transform block size of 8x8 is supported.

* 
[VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_16_BIT_KHR](#) specifies
that a transform block size of 16x16 is supported.

* 
[VK_VIDEO_ENCODE_H265_TRANSFORM_BLOCK_SIZE_32_BIT_KHR](#) specifies
that a transform block size of 32x32 is supported.

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkVideoEncodeH265TransformBlockSizeFlagsKHR](VkVideoEncodeH265TransformBlockSizeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265TransformBlockSizeFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
