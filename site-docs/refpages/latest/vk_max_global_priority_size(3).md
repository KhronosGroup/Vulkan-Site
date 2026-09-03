# VK_MAX_GLOBAL_PRIORITY_SIZE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_MAX_GLOBAL_PRIORITY_SIZE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_MAX_GLOBAL_PRIORITY_SIZE - Length of an array of global queue priorities

[VK_MAX_GLOBAL_PRIORITY_SIZE](#) is the length of an array of
[VkQueueGlobalPriority](VkQueueGlobalPriority.html) enumerants representing supported queue
priorities, as returned in
[VkQueueFamilyGlobalPriorityProperties](VkQueueFamilyGlobalPriorityProperties.html)::`priorities`.

#define VK_MAX_GLOBAL_PRIORITY_SIZE       16U

#define VK_MAX_GLOBAL_PRIORITY_SIZE_KHR   VK_MAX_GLOBAL_PRIORITY_SIZE

#define VK_MAX_GLOBAL_PRIORITY_SIZE_EXT   VK_MAX_GLOBAL_PRIORITY_SIZE

[VK_EXT_global_priority_query](VK_EXT_global_priority_query.html), [VK_KHR_global_priority](VK_KHR_global_priority.html), [VK_VERSION_1_4](VK_VERSION_1_4.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VK_MAX_GLOBAL_PRIORITY_SIZE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
