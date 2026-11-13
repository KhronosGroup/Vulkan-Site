# VkVideoEncodeIntraRefreshModeFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeIntraRefreshModeFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeIntraRefreshModeFlagBitsKHR - Video encode intra refresh modes

The intra refresh modes are defined with the following enums:

// Provided by VK_KHR_video_encode_intra_refresh
typedef enum VkVideoEncodeIntraRefreshModeFlagBitsKHR {
    VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_NONE_KHR = 0,
    VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_BASED_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_ROW_BASED_BIT_KHR = 0x00000004,
    VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_COLUMN_BASED_BIT_KHR = 0x00000008,
} VkVideoEncodeIntraRefreshModeFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_NONE_KHR](#) specifies that intra
refresh **must** not be used.

* 
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_PER_PICTURE_PARTITION_BIT_KHR](#)
specifies the use of *per picture partition intra refresh*.
In this mode each intra refresh region i corresponds to the
encoded picture partition i.

* 
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_BASED_BIT_KHR](#) specifies
the use of any *block-based intra refresh*.
In this mode each intra refresh region encompasses a set of coding
blocks, independent of encoded picture partitions but without any
additional guarantees on the granularity at which the picture is split
into intra refresh regions.
When using this mode, the set of coding blocks comprising the intra
refresh regions and the direction of intra refresh are
implementation-defined.

* 
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_ROW_BASED_BIT_KHR](#)
specifies the use of *block-row-based intra refresh*.
This mode is a block-based intra refresh mode where each intra refresh
region encompasses a set of coding block rows.

* 
[VK_VIDEO_ENCODE_INTRA_REFRESH_MODE_BLOCK_COLUMN_BASED_BIT_KHR](#)
specifies the use of *block-column-based intra refresh*.
This mode is a block-based intra refresh mode where each intra refresh
region encompasses a set of coding block columns.

[VK_KHR_video_encode_intra_refresh](VK_KHR_video_encode_intra_refresh.html), [VkVideoEncodeIntraRefreshModeFlagsKHR](VkVideoEncodeIntraRefreshModeFlagsKHR.html), [VkVideoEncodeSessionIntraRefreshCreateInfoKHR](VkVideoEncodeSessionIntraRefreshCreateInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeIntraRefreshModeFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
