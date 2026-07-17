# VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR - Structure specifying enabled per picture partition video encode feedback values

The `VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR` structure
is defined as:

// Provided by VK_KHR_video_encode_feedback2
typedef struct VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR {
    VkStructureType                              sType;
    const void*                                  pNext;
    uint32_t                                     maxPerPartitionFeedbackEntries;
    VkVideoEncodePerPartitionFeedbackFlagsKHR    perPartitionEncodeFeedbackFlags;
} VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxPerPartitionFeedbackEntries` specifies the maximum number of
picture partitions for which per picture partition video encode feedback
values **can** be captured by queries of the new pool.

* 
`perPartitionEncodeFeedbackFlags` is a bitmask of
[VkVideoEncodePerPartitionFeedbackFlagBitsKHR](VkVideoEncodePerPartitionFeedbackFlagBitsKHR.html) values specifying the
set of enabled per picture partition video encode feedback values
captured by queries of the new pool.

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR-sType-sType) VUID-VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_PER_PARTITION_FEEDBACK_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR-perPartitionEncodeFeedbackFlags-parameter) VUID-VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR-perPartitionEncodeFeedbackFlags-parameter

 `perPartitionEncodeFeedbackFlags` **must** be a valid combination of [VkVideoEncodePerPartitionFeedbackFlagBitsKHR](VkVideoEncodePerPartitionFeedbackFlagBitsKHR.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

[VK_KHR_video_encode_feedback2](VK_KHR_video_encode_feedback2.html), [VkStructureType](VkStructureType.html), [VkVideoEncodePerPartitionFeedbackFlagsKHR](VkVideoEncodePerPartitionFeedbackFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPoolVideoEncodePerPartitionFeedbackCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
