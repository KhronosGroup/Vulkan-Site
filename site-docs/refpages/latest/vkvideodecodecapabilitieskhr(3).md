# VkVideoDecodeCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeCapabilitiesKHR - Structure describing general video decode capabilities for a video profile

When calling [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) with
`pVideoProfile->videoCodecOperation` specifying a decode operation, the
`VkVideoDecodeCapabilitiesKHR` structure **must** be included in the
`pNext` chain of the [VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html) structure to retrieve
capabilities specific to video decoding.

The `VkVideoDecodeCapabilitiesKHR` structure is defined as:

// Provided by VK_KHR_video_decode_queue
typedef struct VkVideoDecodeCapabilitiesKHR {
    VkStructureType                    sType;
    void*                              pNext;
    VkVideoDecodeCapabilityFlagsKHR    flags;
} VkVideoDecodeCapabilitiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkVideoDecodeCapabilityFlagBitsKHR](VkVideoDecodeCapabilityFlagBitsKHR.html)
describing the supported video decoding capabilities.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeCapabilitiesKHR-sType-sType) VUID-VkVideoDecodeCapabilitiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_CAPABILITIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkVideoCapabilitiesKHR](VkVideoCapabilitiesKHR.html)

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoDecodeCapabilityFlagsKHR](VkVideoDecodeCapabilityFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
