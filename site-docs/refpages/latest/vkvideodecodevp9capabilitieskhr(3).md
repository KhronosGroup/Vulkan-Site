# VkVideoDecodeVP9CapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeVP9CapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeVP9CapabilitiesKHR - Structure describing VP9 decode capabilities

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) to query the
capabilities for an [VP9 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-vp9-profile), the
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`pNext` chain **must** include a
`VkVideoDecodeVP9CapabilitiesKHR` structure that will be filled with the
profile-specific capabilities.

The `VkVideoDecodeVP9CapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_video_decode_vp9
typedef struct VkVideoDecodeVP9CapabilitiesKHR {
    VkStructureType     sType;
    void*               pNext;
    StdVideoVP9Level    maxLevel;
} VkVideoDecodeVP9CapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxLevel` is a `StdVideoVP9Level` value specifying the maximum
VP9 level supported by the profile, as defined in section A.1 of the
[VP9 Specification](../../../../spec/latest/chapters/introduction.html#google-vp9).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeVP9CapabilitiesKHR-sType-sType) VUID-VkVideoDecodeVP9CapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_decode_vp9](VK_KHR_video_decode_vp9.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeVP9CapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
