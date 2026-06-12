# VkQueryPoolVideoEncodeFeedbackCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPoolVideoEncodeFeedbackCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPoolVideoEncodeFeedbackCreateInfoKHR - Structure specifying enabled video encode feedback values

The `VkQueryPoolVideoEncodeFeedbackCreateInfoKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkQueryPoolVideoEncodeFeedbackCreateInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkVideoEncodeFeedbackFlagsKHR    encodeFeedbackFlags;
} VkQueryPoolVideoEncodeFeedbackCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`encodeFeedbackFlags` is a bitmask of
[VkVideoEncodeFeedbackFlagBitsKHR](VkVideoEncodeFeedbackFlagBitsKHR.html) values specifying the set of
enabled video encode feedback values captured by queries of the new
pool.

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-sType-sType) VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_FEEDBACK_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-parameter) VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-parameter

 `encodeFeedbackFlags` **must** be a valid combination of [VkVideoEncodeFeedbackFlagBitsKHR](VkVideoEncodeFeedbackFlagBitsKHR.html) values

* 
[](#VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-requiredbitmask) VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-requiredbitmask

 `encodeFeedbackFlags` **must** not be `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

[VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html), [VkStructureType](VkStructureType.html), [VkVideoEncodeFeedbackFlagsKHR](VkVideoEncodeFeedbackFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
