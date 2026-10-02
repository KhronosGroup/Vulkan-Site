# VkVideoEncodeH265CtbSizeFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265CtbSizeFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265CtbSizeFlagBitsKHR - Supported CTB sizes for H.265 video encode

Bits which **may** be set in
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`ctbSizes`, indicating the CTB
sizes supported by the implementation, are:

// Provided by VK_KHR_video_encode_h265
typedef enum VkVideoEncodeH265CtbSizeFlagBitsKHR {
    VK_VIDEO_ENCODE_H265_CTB_SIZE_16_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_H265_CTB_SIZE_32_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_H265_CTB_SIZE_64_BIT_KHR = 0x00000004,
} VkVideoEncodeH265CtbSizeFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_H265_CTB_SIZE_16_BIT_KHR](#) specifies that a CTB size
of 16x16 is supported.

* 
[VK_VIDEO_ENCODE_H265_CTB_SIZE_32_BIT_KHR](#) specifies that a CTB size
of 32x32 is supported.

* 
[VK_VIDEO_ENCODE_H265_CTB_SIZE_64_BIT_KHR](#) specifies that a CTB size
of 64x64 is supported.

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), [VkVideoEncodeH265CtbSizeFlagsKHR](VkVideoEncodeH265CtbSizeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265CtbSizeFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
