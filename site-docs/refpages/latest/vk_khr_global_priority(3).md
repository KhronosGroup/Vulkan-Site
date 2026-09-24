# VK_KHR_global_priority(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_global_priority.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_global_priority](#VK_KHR_global_priority)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_global_priority - device extension

**Name String**

`VK_KHR_global_priority`

**Extension Type**

Device extension

**Registered Extension Number**

189

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_global_priority] @tobski%0A*Here describe the issue or question you have about the VK_KHR_global_priority extension*)

**Last Modified Date**

2021-10-22

**Contributors**

* 
Tobias Hector, AMD

* 
Contributors to `[VK_EXT_global_priority](VK_EXT_global_priority.html)`

* 
Contributors to `[VK_EXT_global_priority_query](VK_EXT_global_priority_query.html)`

In Vulkan, users can specify device-scope queue priorities.
In some cases it may be useful to extend this concept to a system-wide
scope.
This device extension allows applications to query the global queue
priorities supported by a queue family, and then set a priority when
creating queues.
The default queue priority is [VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT](VkQueueGlobalPriority.html).

Implementations can report which global priority levels are treated
differently by the implementation.
It is intended primarily for use in system integration along with certain
platform-specific priority enforcement rules.

The driver implementation will attempt to skew hardware resource allocation
in favor of the higher-priority task.
Therefore, higher-priority work may retain similar latency and throughput
characteristics even if the system is congested with lower priority work.

The global priority level of a queue shall take precedence over the
per-process queue priority
(`VkDeviceQueueCreateInfo`::`pQueuePriorities`).

Abuse of this feature may result in starving the rest of the system from
hardware resources.
Therefore, the driver implementation may deny requests to acquire a priority
above the default priority ([VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT](VkQueueGlobalPriority.html)) if
the caller does not have sufficient privileges.
In this scenario [VK_ERROR_NOT_PERMITTED_EXT](VkResult.html) is returned.

The driver implementation may fail the queue allocation request if resources
required to complete the operation have been exhausted (either by the same
process or a different process).
In this scenario [VK_ERROR_INITIALIZATION_FAILED](VkResult.html) is returned.

* 
Extending [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html):

[VkDeviceQueueGlobalPriorityCreateInfoKHR](VkDeviceQueueGlobalPriorityCreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceGlobalPriorityQueryFeaturesKHR](VkPhysicalDeviceGlobalPriorityQueryFeatures.html)

Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

* 
[VkQueueFamilyGlobalPriorityPropertiesKHR](VkQueueFamilyGlobalPriorityProperties.html)

* 
[VkQueueGlobalPriorityKHR](VkQueueGlobalPriority.html)

* 
`VK_KHR_GLOBAL_PRIORITY_EXTENSION_NAME`

* 
`VK_KHR_GLOBAL_PRIORITY_SPEC_VERSION`

* 
[VK_MAX_GLOBAL_PRIORITY_SIZE_KHR](VK_MAX_GLOBAL_PRIORITY_SIZE.html)

* 
Extending [VkQueueGlobalPriority](VkQueueGlobalPriority.html):

[VK_QUEUE_GLOBAL_PRIORITY_HIGH_KHR](VkQueueGlobalPriority.html)

* 
[VK_QUEUE_GLOBAL_PRIORITY_LOW_KHR](VkQueueGlobalPriority.html)

* 
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_KHR](VkQueueGlobalPriority.html)

* 
[VK_QUEUE_GLOBAL_PRIORITY_REALTIME_KHR](VkQueueGlobalPriority.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_NOT_PERMITTED_KHR](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES_KHR](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

1) Can we additionally query whether a caller is permitted to acquire a
specific global queue priority in this extension?

**RESOLVED**: No.
Whether a caller has enough privilege goes with the OS, and the Vulkan
driver cannot really guarantee that the privilege will not change in between
this query and the actual queue creation call.

2) If more than 1 queue using global priority is requested, is there a good
way to know which queue is failing the device creation?

**RESOLVED**: No.
There is not a good way at this moment, and it is also not quite actionable
for the applications to know that because the information may not be
accurate.
Queue creation can fail because of runtime constraints like insufficient
privilege or lack of resource, and the failure is not necessarily tied to
that particular queue configuration requested.

* 
Revision 1, 2021-10-22 (Tobias Hector)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_global_priority).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
