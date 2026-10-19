# VkQueueGlobalPriority(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueGlobalPriority.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueGlobalPriority - Values specifying a system-wide queue priority

Possible values of
[VkDeviceQueueGlobalPriorityCreateInfo](VkDeviceQueueGlobalPriorityCreateInfo.html)::`globalPriority`,
specifying a system-wide priority level are:

// Provided by VK_VERSION_1_4
typedef enum VkQueueGlobalPriority {
    VK_QUEUE_GLOBAL_PRIORITY_LOW = 128,
    VK_QUEUE_GLOBAL_PRIORITY_MEDIUM = 256,
    VK_QUEUE_GLOBAL_PRIORITY_HIGH = 512,
    VK_QUEUE_GLOBAL_PRIORITY_REALTIME = 1024,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_LOW_EXT = VK_QUEUE_GLOBAL_PRIORITY_LOW,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT = VK_QUEUE_GLOBAL_PRIORITY_MEDIUM,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_HIGH_EXT = VK_QUEUE_GLOBAL_PRIORITY_HIGH,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_REALTIME_EXT = VK_QUEUE_GLOBAL_PRIORITY_REALTIME,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_LOW_KHR = VK_QUEUE_GLOBAL_PRIORITY_LOW,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_KHR = VK_QUEUE_GLOBAL_PRIORITY_MEDIUM,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_HIGH_KHR = VK_QUEUE_GLOBAL_PRIORITY_HIGH,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_REALTIME_KHR = VK_QUEUE_GLOBAL_PRIORITY_REALTIME,
} VkQueueGlobalPriority;

// Provided by VK_KHR_global_priority
// Equivalent to VkQueueGlobalPriority
typedef VkQueueGlobalPriority VkQueueGlobalPriorityKHR;

// Provided by VK_EXT_global_priority
// Equivalent to VkQueueGlobalPriority
typedef VkQueueGlobalPriority VkQueueGlobalPriorityEXT;

Priority values are sorted in ascending order.
A comparison operation on the enum values can be used to determine the
priority order.

* 
[VK_QUEUE_GLOBAL_PRIORITY_LOW](#) is below the system default.
Useful for non-interactive tasks.

* 
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM](#) is the system default priority.

* 
[VK_QUEUE_GLOBAL_PRIORITY_HIGH](#) is above the system default.

* 
[VK_QUEUE_GLOBAL_PRIORITY_REALTIME](#) is the highest priority.
Useful for critical tasks.

[VK_EXT_global_priority](VK_EXT_global_priority.html), [VK_KHR_global_priority](VK_KHR_global_priority.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDeviceQueueGlobalPriorityCreateInfo](VkDeviceQueueGlobalPriorityCreateInfo.html), [VkQueueFamilyGlobalPriorityProperties](VkQueueFamilyGlobalPriorityProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueGlobalPriority).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
