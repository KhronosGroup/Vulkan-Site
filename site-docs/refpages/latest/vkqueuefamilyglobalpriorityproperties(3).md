# VkQueueFamilyGlobalPriorityProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyGlobalPriorityProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyGlobalPriorityProperties - Return structure for queue family global priority information query

The [VkQueueFamilyGlobalPriorityProperties](#) structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkQueueFamilyGlobalPriorityProperties {
    VkStructureType          sType;
    void*                    pNext;
    uint32_t                 priorityCount;
    VkQueueGlobalPriority    priorities[VK_MAX_GLOBAL_PRIORITY_SIZE];
} VkQueueFamilyGlobalPriorityProperties;

// Provided by VK_KHR_global_priority
// Equivalent to VkQueueFamilyGlobalPriorityProperties
typedef VkQueueFamilyGlobalPriorityProperties VkQueueFamilyGlobalPriorityPropertiesKHR;

// Provided by VK_EXT_global_priority_query
// Equivalent to VkQueueFamilyGlobalPriorityProperties
typedef VkQueueFamilyGlobalPriorityProperties VkQueueFamilyGlobalPriorityPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`priorityCount` is the number of supported global queue priorities
in this queue family, and it **must** be greater than 0.

* 
`priorities` is an array of [VK_MAX_GLOBAL_PRIORITY_SIZE](VK_MAX_GLOBAL_PRIORITY_SIZE.html)
[VkQueueGlobalPriority](VkQueueGlobalPriority.html) enums representing all supported global
queue priorities in this queue family.
The first `priorityCount` elements of the array will be valid.

If the `VkQueueFamilyGlobalPriorityProperties` structure is included in
the `pNext` chain of the [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html) structure passed
to [vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html), it is filled in with the
list of supported global queue priorities for the indicated family.

The valid elements of `priorities` **must** not contain any duplicate
values.

The valid elements of `priorities` **must** be a continuous sequence of
[VkQueueGlobalPriority](VkQueueGlobalPriority.html) enums in ascending order.

|  | For example, returning `priorityCount` as 3 with supported
| --- | --- |
`priorities` as [VK_QUEUE_GLOBAL_PRIORITY_LOW](VkQueueGlobalPriority.html),
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM](VkQueueGlobalPriority.html) and
[VK_QUEUE_GLOBAL_PRIORITY_REALTIME](VkQueueGlobalPriority.html) is not allowed. |

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyGlobalPriorityProperties-sType-sType) VUID-VkQueueFamilyGlobalPriorityProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

[VK_EXT_global_priority_query](VK_EXT_global_priority_query.html), [VK_KHR_global_priority](VK_KHR_global_priority.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkQueueGlobalPriority](VkQueueGlobalPriority.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyGlobalPriorityProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
