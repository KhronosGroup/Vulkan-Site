# VkVideoDecodeAV1CapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeAV1CapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeAV1CapabilitiesKHR - Structure describing AV1 decode capabilities

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) to query the
capabilities for an [AV1 decode profile](../../../../spec/latest/chapters/videocoding.html#decode-av1-profile), the
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)::`pNext` chain **must** include a
`VkVideoDecodeAV1CapabilitiesKHR` structure that will be filled with the
profile-specific capabilities.

The `VkVideoDecodeAV1CapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_video_decode_av1
typedef struct VkVideoDecodeAV1CapabilitiesKHR {
    VkStructureType     sType;
    void*               pNext;
    StdVideoAV1Level    maxLevel;
} VkVideoDecodeAV1CapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxLevel` is a `StdVideoAV1Level` value specifying the maximum
AV1 level supported by the profile, as defined in section A.3 of the
[AV1 Specification](../../../../spec/latest/chapters/introduction.html#aomedia-av1).

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeAV1CapabilitiesKHR-sType-sType) VUID-VkVideoDecodeAV1CapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_decode_av1](VK_KHR_video_decode_av1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeAV1CapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
