# VkVideoDecodeH264CapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeH264CapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeH264CapabilitiesKHR - Structure describing H.264 decode capabilities

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) to query the
capabilities for an [H.264 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-h264-profile), the
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`pNext` chain **must** include a
`VkVideoDecodeH264CapabilitiesKHR` structure that will be filled with
the profile-specific capabilities.

The `VkVideoDecodeH264CapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_video_decode_h264
typedef struct VkVideoDecodeH264CapabilitiesKHR {
    VkStructureType         sType;
    void*                   pNext;
    StdVideoH264LevelIdc    maxLevelIdc;
    VkOffset2D              fieldOffsetGranularity;
} VkVideoDecodeH264CapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxLevelIdc` is a `StdVideoH264LevelIdc` value indicating the
maximum H.264 level supported by the profile, where enum constant
`STD_VIDEO_H264_LEVEL_IDC__` identifies H.264 level
`.` as defined in section A.3 of the [ITU-T    H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264).

* 
`fieldOffsetGranularity` is the minimum alignment for
[VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html)::`codedOffset` specified for a
[video picture resource](../../../../spec/latest/chapters/videocoding.html#video-picture-resources) when using the
picture layout
[VK_VIDEO_DECODE_H264_PICTURE_LAYOUT_INTERLACED_SEPARATE_PLANES_BIT_KHR](VkVideoDecodeH264PictureLayoutFlagBitsKHR.html).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeH264CapabilitiesKHR-sType-sType) VUID-VkVideoDecodeH264CapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_decode_h264](VK_KHR_video_decode_h264.html), [VkOffset2D](VkOffset2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeH264CapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
