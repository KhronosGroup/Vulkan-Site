# VkQueueFamilyQueryResultStatusPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyQueryResultStatusPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyQueryResultStatusPropertiesKHR - Structure specifying support for result status query

The [VkQueueFamilyQueryResultStatusPropertiesKHR](#) structure is defined
as:

// Provided by VK_KHR_video_queue
typedef struct VkQueueFamilyQueryResultStatusPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           queryResultStatusSupport;
} VkQueueFamilyQueryResultStatusPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queryResultStatusSupport` reports [VK_TRUE](VK_TRUE.html) if query type
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html) and use of
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) are supported.

If this structure is included in the `pNext` chain of the
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html) structure passed to
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html), then it is filled with
information about whether [result status queries](../../../../spec/latest/chapters/queries.html#queries-result-status-only) are supported by the specified queue family.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyQueryResultStatusPropertiesKHR-sType-sType) VUID-VkQueueFamilyQueryResultStatusPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_QUERY_RESULT_STATUS_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

[VK_KHR_video_queue](VK_KHR_video_queue.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyQueryResultStatusPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
