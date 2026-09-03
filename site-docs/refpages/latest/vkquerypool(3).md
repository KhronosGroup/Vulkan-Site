# VkQueryPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPool - Opaque handle to a query pool object

Queries are managed using *query pool* objects.
Each query pool is a collection of a specific number of queries of a
particular type.

Query pools are represented by `VkQueryPool` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkQueryPool)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkVideoInlineQueryInfoKHR](VkVideoInlineQueryInfoKHR.html), [vkCmdBeginQuery](vkCmdBeginQuery.html), [vkCmdBeginQueryIndexedEXT](vkCmdBeginQueryIndexedEXT.html), [vkCmdCopyQueryPoolResults](vkCmdCopyQueryPoolResults.html), [vkCmdCopyQueryPoolResultsToMemoryKHR](vkCmdCopyQueryPoolResultsToMemoryKHR.html), [vkCmdEndQuery](vkCmdEndQuery.html), [vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html), [vkCmdResetQueryPool](vkCmdResetQueryPool.html), [vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html), [vkCmdWriteAccelerationStructuresPropertiesNV](vkCmdWriteAccelerationStructuresPropertiesNV.html), [vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html), [vkCmdWriteTimestamp](vkCmdWriteTimestamp.html), [vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html), [vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html), [vkCreateQueryPool](vkCreateQueryPool.html), [vkDestroyQueryPool](vkDestroyQueryPool.html), [vkGetQueryPoolResults](vkGetQueryPoolResults.html), [vkResetQueryPool](vkResetQueryPool.html), [vkResetQueryPool](vkResetQueryPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
