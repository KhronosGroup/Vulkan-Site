# VkVideoEncodeH264SessionCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH264SessionCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH264SessionCreateInfoKHR - Structure specifies H.264 encode session parameters

The `VkVideoEncodeH264SessionCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h264
typedef struct VkVideoEncodeH264SessionCreateInfoKHR {
    VkStructureType         sType;
    const void*             pNext;
    VkBool32                useMaxLevelIdc;
    StdVideoH264LevelIdc    maxLevelIdc;
} VkVideoEncodeH264SessionCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`useMaxLevelIdc` indicates whether the value of `maxLevelIdc`
should be used by the implementation.
When it is [VK_FALSE](VK_FALSE.html), the implementation ignores the value of
`maxLevelIdc` and uses the value of
[VkVideoEncodeH264CapabilitiesKHR](VkVideoEncodeH264CapabilitiesKHR.html)::`maxLevelIdc`, as reported
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile.

* 
`maxLevelIdc` is a `StdVideoH264LevelIdc` value specifying the
upper bound on the H.264 level for the video bitstreams produced by the
created video session, where enum constant
`STD_VIDEO_H264_LEVEL_IDC__` identifies H.264 level
`.` as defined in section A.3 of the [ITU-T    H.264 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h264).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH264SessionCreateInfoKHR-sType-sType) VUID-VkVideoEncodeH264SessionCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_CREATE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)

[VK_KHR_video_encode_h264](VK_KHR_video_encode_h264.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH264SessionCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
