# VkVideoChromaSubsamplingFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoChromaSubsamplingFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoChromaSubsamplingFlagBitsKHR - Video format chroma subsampling bits

The video format chroma subsampling is defined with the following enums:

// Provided by VK_KHR_video_queue
typedef enum VkVideoChromaSubsamplingFlagBitsKHR {
    VK_VIDEO_CHROMA_SUBSAMPLING_INVALID_KHR = 0,
    VK_VIDEO_CHROMA_SUBSAMPLING_MONOCHROME_BIT_KHR = 0x00000001,
    VK_VIDEO_CHROMA_SUBSAMPLING_420_BIT_KHR = 0x00000002,
    VK_VIDEO_CHROMA_SUBSAMPLING_422_BIT_KHR = 0x00000004,
    VK_VIDEO_CHROMA_SUBSAMPLING_444_BIT_KHR = 0x00000008,
} VkVideoChromaSubsamplingFlagBitsKHR;

* 
[VK_VIDEO_CHROMA_SUBSAMPLING_MONOCHROME_BIT_KHR](#) specifies that the
format is monochrome.

* 
[VK_VIDEO_CHROMA_SUBSAMPLING_420_BIT_KHR](#) specified that the format
is 4:2:0 chroma subsampled, i.e. the two chroma components are sampled
horizontally and vertically at half the sample rate of the luma
component.

* 
[VK_VIDEO_CHROMA_SUBSAMPLING_422_BIT_KHR](#) - the format is 4:2:2
chroma subsampled, i.e. the two chroma components are sampled
horizontally at half the sample rate of luma component.

* 
[VK_VIDEO_CHROMA_SUBSAMPLING_444_BIT_KHR](#) - the format is 4:4:4
chroma sampled, i.e. all three components of the Y′CBCR format are
sampled at the same rate, thus there is no chroma subsampling.

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkVideoChromaSubsamplingFlagsKHR](VkVideoChromaSubsamplingFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoChromaSubsamplingFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
