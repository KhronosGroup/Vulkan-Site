# VK_EXT_global_priority(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_global_priority.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_global_priority](#VK_EXT_global_priority)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_global_priority - device extension

**Name String**

`VK_EXT_global_priority`

**Extension Type**

Device extension

**Registered Extension Number**

175

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[VK_KHR_global_priority](VK_KHR_global_priority.html)
extension

Which in turn was *promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Andres Rodriguez [lostgoat](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_global_priority] @lostgoat%0A*Here describe the issue or question you have about the VK_EXT_global_priority extension*)

**Last Modified Date**

2017-10-06

**IP Status**

No known IP claims.

**Contributors**

* 
Andres Rodriguez, Valve

* 
Pierre-Loup Griffais, Valve

* 
Dan Ginsburg, Valve

* 
Mitch Singer, AMD

In Vulkan, users can specify device-scope queue priorities.
In some cases it may be useful to extend this concept to a system-wide
scope.
This extension provides a mechanism for callers to set their system-wide
priority.
The default queue priority is [VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT](VkQueueGlobalPriority.html).

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

[VkDeviceQueueGlobalPriorityCreateInfoEXT](VkDeviceQueueGlobalPriorityCreateInfo.html)

* 
[VkQueueGlobalPriorityEXT](VkQueueGlobalPriority.html)

* 
`VK_EXT_GLOBAL_PRIORITY_EXTENSION_NAME`

* 
`VK_EXT_GLOBAL_PRIORITY_SPEC_VERSION`

* 
Extending [VkQueueGlobalPriority](VkQueueGlobalPriority.html):

[VK_QUEUE_GLOBAL_PRIORITY_HIGH_EXT](VkQueueGlobalPriority.html)

* 
[VK_QUEUE_GLOBAL_PRIORITY_LOW_EXT](VkQueueGlobalPriority.html)

* 
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT](VkQueueGlobalPriority.html)

* 
[VK_QUEUE_GLOBAL_PRIORITY_REALTIME_EXT](VkQueueGlobalPriority.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_NOT_PERMITTED_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 2, 2017-11-03 (Andres Rodriguez)

Fixed VkQueueGlobalPriorityEXT missing _EXT suffix

Revision 1, 2017-10-06 (Andres Rodriguez)

* 
First version.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_global_priority).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
