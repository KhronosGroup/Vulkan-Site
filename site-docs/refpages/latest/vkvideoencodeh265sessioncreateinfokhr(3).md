# VkVideoEncodeH265SessionCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeH265SessionCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeH265SessionCreateInfoKHR - Structure specifies H.265 encode session parameters

The `VkVideoEncodeH265SessionCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_h265
typedef struct VkVideoEncodeH265SessionCreateInfoKHR {
    VkStructureType         sType;
    const void*             pNext;
    VkBool32                useMaxLevelIdc;
    StdVideoH265LevelIdc    maxLevelIdc;
} VkVideoEncodeH265SessionCreateInfoKHR;

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
[VkVideoEncodeH265CapabilitiesKHR](VkVideoEncodeH265CapabilitiesKHR.html)::`maxLevelIdc`, as reported
by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile.

* 
`maxLevelIdc` is a `StdVideoH265LevelIdc` value specifying the
upper bound on the H.265 level for the video bitstreams produced by the
created video session, where enum constant
`STD_VIDEO_H265_LEVEL_IDC__` identifies H.265 level
`.` as defined in section A.4 of the [ITU-T    H.265 Specification](../../../../spec/latest/chapters/introduction.html#itu-t-h265).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeH265SessionCreateInfoKHR-sType-sType) VUID-VkVideoEncodeH265SessionCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_CREATE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)

[VK_KHR_video_encode_h265](VK_KHR_video_encode_h265.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeH265SessionCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
