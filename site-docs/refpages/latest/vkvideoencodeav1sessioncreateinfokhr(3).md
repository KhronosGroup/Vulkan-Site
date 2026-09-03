# VkVideoEncodeAV1SessionCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEncodeAV1SessionCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEncodeAV1SessionCreateInfoKHR - Structure specifies AV1 encode session parameters

The `VkVideoEncodeAV1SessionCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkVideoEncodeAV1SessionCreateInfoKHR {
    VkStructureType     sType;
    const void*         pNext;
    VkBool32            useMaxLevel;
    StdVideoAV1Level    maxLevel;
} VkVideoEncodeAV1SessionCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`useMaxLevel` indicates whether the value of `maxLevel` should
be used by the implementation.
When it is set to [VK_FALSE](VK_FALSE.html), the implementation ignores the value
of `maxLevel` and uses the value of
[VkVideoEncodeAV1CapabilitiesKHR](VkVideoEncodeAV1CapabilitiesKHR.html)::`maxLevel`, as reported by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the video profile.

* 
`maxLevel` is a `StdVideoAV1Level` value specifying the upper
bound on the AV1 level for the video bitstreams produced by the created
video session.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEncodeAV1SessionCreateInfoKHR-sType-sType) VUID-VkVideoEncodeAV1SessionCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_SESSION_CREATE_INFO_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)

[VK_KHR_video_encode_av1](VK_KHR_video_encode_av1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEncodeAV1SessionCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
