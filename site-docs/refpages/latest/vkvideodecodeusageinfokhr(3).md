# VkVideoDecodeUsageInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkVideoDecodeUsageInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkVideoDecodeUsageInfoKHR - Structure specifying video decode usage information

Additional information about the video decode use case **can** be provided by
adding a `VkVideoDecodeUsageInfoKHR` structure to the `pNext` chain
of [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html).

The `VkVideoDecodeUsageInfoKHR` structure is defined as:

// Provided by VK_KHR_video_decode_queue
typedef struct VkVideoDecodeUsageInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    VkVideoDecodeUsageFlagsKHR    videoUsageHints;
} VkVideoDecodeUsageInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`videoUsageHints` is a bitmask of
[VkVideoDecodeUsageFlagBitsKHR](VkVideoDecodeUsageFlagBitsKHR.html) specifying hints about the intended
use of the video decode profile.

Valid Usage (Implicit)

* 
[](#VUID-VkVideoDecodeUsageInfoKHR-sType-sType) VUID-VkVideoDecodeUsageInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VIDEO_DECODE_USAGE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkVideoDecodeUsageInfoKHR-videoUsageHints-parameter) VUID-VkVideoDecodeUsageInfoKHR-videoUsageHints-parameter

 `videoUsageHints` **must** be a valid combination of [VkVideoDecodeUsageFlagBitsKHR](VkVideoDecodeUsageFlagBitsKHR.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

[VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoDecodeUsageFlagsKHR](VkVideoDecodeUsageFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/videocoding.html#VkVideoDecodeUsageInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
