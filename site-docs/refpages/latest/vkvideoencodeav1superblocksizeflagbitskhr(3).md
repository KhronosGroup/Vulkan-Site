# VkVideoEncodeAV1SuperblockSizeFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1SuperblockSizeFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1SuperblockSizeFlagBitsKHR - Supported superblock sizes for AV1 video encode

Bits which **may** be set in
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`superblockSizes`, indicating the
superblock sizes supported by the implementation, are:

// Provided by VK_KHR_video_encode_av1
typedef enum VkVideoEncodeAV1SuperblockSizeFlagBitsKHR {
    VK_VIDEO_ENCODE_AV1_SUPERBLOCK_SIZE_64_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_AV1_SUPERBLOCK_SIZE_128_BIT_KHR = 0x00000002,
} VkVideoEncodeAV1SuperblockSizeFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_AV1_SUPERBLOCK_SIZE_64_BIT_KHR](#) specifies that a
superblock size of 64x64 is supported.

* 
[VK_VIDEO_ENCODE_AV1_SUPERBLOCK_SIZE_128_BIT_KHR](#) specifies that a
superblock size of 128x128 is supported.

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), [VkVideoEncodeAV1SuperblockSizeFlagsKHR](VkVideoEncodeAV1SuperblockSizeFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1SuperblockSizeFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
