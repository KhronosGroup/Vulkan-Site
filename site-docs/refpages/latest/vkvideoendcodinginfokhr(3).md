# VkVideoEndCodingInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoEndCodingInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoEndCodingInfoKHR - Structure specifying video coding scope end information

The `VkVideoEndCodingInfoKHR` structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkVideoEndCodingInfoKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkVideoEndCodingFlagsKHR    flags;
} VkVideoEndCodingInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoEndCodingInfoKHR-sType-sType) VUID-VkVideoEndCodingInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_END_CODING_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoEndCodingInfoKHR-pNext-pNext) VUID-VkVideoEndCodingInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkVideoEndCodingInfoKHR-flags-zerobitmask) VUID-VkVideoEndCodingInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

[VK_KHR_video_queue](VK_KHR_video_queue.html), [VkStructureType](VkStructureType.html), [VkVideoEndCodingFlagsKHR](VkVideoEndCodingFlagsKHR.html), [vkCmdEndVideoCodingKHR](vkCmdEndVideoCodingKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoEndCodingInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
