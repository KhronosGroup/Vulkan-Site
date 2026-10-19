# VkQueryResultFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryResultFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryResultFlagBits - Bitmask specifying how and when query results are returned

Bits which **can** be set in [vkGetQueryPoolResults](vkGetQueryPoolResults.html)::`flags` and
[vkCmdCopyQueryPoolResults](vkCmdCopyQueryPoolResults.html)::`flags`, specifying how and when
results are returned, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryResultFlagBits {
    VK_QUERY_RESULT_64_BIT = 0x00000001,
    VK_QUERY_RESULT_WAIT_BIT = 0x00000002,
    VK_QUERY_RESULT_WITH_AVAILABILITY_BIT = 0x00000004,
    VK_QUERY_RESULT_PARTIAL_BIT = 0x00000008,
  // Provided by VK_KHR_video_queue
    VK_QUERY_RESULT_WITH_STATUS_BIT_KHR = 0x00000010,
} VkQueryResultFlagBits;

* 
[VK_QUERY_RESULT_64_BIT](#) specifies the results will be written as an
array of 64-bit unsigned integer values.
If this bit is not set, the results will be written as an array of
32-bit unsigned integer values.

* 
[VK_QUERY_RESULT_WAIT_BIT](#) specifies that Vulkan will wait for each
query’s status to become available before retrieving its results.

* 
[VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#) specifies that the
availability status accompanies the results.

* 
[VK_QUERY_RESULT_PARTIAL_BIT](#) specifies that returning partial
results is acceptable.

* 
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#) specifies that the last value
returned in the query is a [VkQueryResultStatusKHR](VkQueryResultStatusKHR.html) value.
See [result status query](../../../../spec/latest/chapters/queries.html#queries-result-status-only) for information
on how an application can determine whether the use of this flag bit is
supported.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkQueryResultFlags](VkQueryResultFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryResultFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
