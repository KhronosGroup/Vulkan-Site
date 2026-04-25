# VkDeviceQueueGlobalPriorityCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceQueueGlobalPriorityCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceQueueGlobalPriorityCreateInfo - Specify a system wide priority

Queues **can** be created with a system-wide priority by adding a
`VkDeviceQueueGlobalPriorityCreateInfo` structure to the `pNext`
chain of [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html).

The `VkDeviceQueueGlobalPriorityCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkDeviceQueueGlobalPriorityCreateInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkQueueGlobalPriority    globalPriority;
} VkDeviceQueueGlobalPriorityCreateInfo;

// Provided by VK_KHR_global_priority
// Equivalent to VkDeviceQueueGlobalPriorityCreateInfo
typedef VkDeviceQueueGlobalPriorityCreateInfo VkDeviceQueueGlobalPriorityCreateInfoKHR;

// Provided by VK_EXT_global_priority
// Equivalent to VkDeviceQueueGlobalPriorityCreateInfo
typedef VkDeviceQueueGlobalPriorityCreateInfo VkDeviceQueueGlobalPriorityCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`globalPriority` is the system-wide priority associated to these
queues as specified by [VkQueueGlobalPriority](VkQueueGlobalPriority.html)

Queues created without specifying
`VkDeviceQueueGlobalPriorityCreateInfo` will default to
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM](VkQueueGlobalPriority.html).

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceQueueGlobalPriorityCreateInfo-sType-sType) VUID-VkDeviceQueueGlobalPriorityCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDeviceQueueGlobalPriorityCreateInfo-globalPriority-parameter) VUID-VkDeviceQueueGlobalPriorityCreateInfo-globalPriority-parameter

 `globalPriority` **must** be a valid [VkQueueGlobalPriority](VkQueueGlobalPriority.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)

[VK_EXT_global_priority](VK_EXT_global_priority.html), [VK_KHR_global_priority](VK_KHR_global_priority.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkQueueGlobalPriority](VkQueueGlobalPriority.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceQueueGlobalPriorityCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
