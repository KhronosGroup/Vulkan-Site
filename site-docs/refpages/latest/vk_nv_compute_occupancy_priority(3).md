# VK_NV_compute_occupancy_priority(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_compute_occupancy_priority.html

## Table of Contents

- [Name](#_name)
- [VK_NV_compute_occupancy_priority](#VK_NV_compute_occupancy_priority)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_compute_occupancy_priority - device extension

**Name String**

`VK_NV_compute_occupancy_priority`

**Extension Type**

Device extension

**Registered Extension Number**

646

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Chris Lentini [clentini](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_compute_occupancy_priority] @clentini%0A*Here describe the issue or question you have about the VK_NV_compute_occupancy_priority extension*)

**Extension Proposal**

[VK_NV_compute_occupancy_priority](../../../../features/latest/features/proposals/VK_NV_compute_occupancy_priority.html)

**Last Modified Date**

2025-12-01

**Contributors**

* 
Chris Lentini, NVIDIA

* 
Eric Werness, NVIDIA

* 
Lionel Duc, NVIDIA

* 
Peter Deayton, NVIDIA

This extension provides applications with control over how their compute
workloads utilize GPU compute resources, specifically allowing
prioritization relative to other simultaneously executing workloads.
Applications can specify the priority with which compute workloads should
occupy GPU compute resources, allowing for a fine-grained distinction
between workloads that may want to execute at a background priority over a
long period of time versus workloads with harder latency requirements.

The extension introduces a new command
[vkCmdSetComputeOccupancyPriorityNV](vkCmdSetComputeOccupancyPriorityNV.html) that allows applications to set the
occupancy priority for subsequent compute dispatches.
The occupancy priority affects how compute workloads utilize GPU compute
resources relative to other simultaneously executing workloads.

The occupancy priority is stateful on a command buffer.
All commands listed in the [Dispatching Commands](../../../../spec/latest/chapters/dispatch.html#dispatch) chapter issued
subsequent to a [vkCmdSetComputeOccupancyPriorityNV](vkCmdSetComputeOccupancyPriorityNV.html) call will be
executed with the specified priority parameters until another
[vkCmdSetComputeOccupancyPriorityNV](vkCmdSetComputeOccupancyPriorityNV.html) call is made.

For convenience, three named occupancy priority values are defined:

* 
**VK_COMPUTE_OCCUPANCY_PRIORITY_LOW_NV** - a constant value that can be
used for
[VkComputeOccupancyPriorityParametersNV](VkComputeOccupancyPriorityParametersNV.html)::`occupancyPriority` to
specify a low priority level.

* 
**VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV** - a constant value that can
be used for
[VkComputeOccupancyPriorityParametersNV](VkComputeOccupancyPriorityParametersNV.html)::`occupancyPriority` to
specify a normal priority level.
This represents the default priority level.

* 
**VK_COMPUTE_OCCUPANCY_PRIORITY_HIGH_NV** - a constant value that can be
used for
[VkComputeOccupancyPriorityParametersNV](VkComputeOccupancyPriorityParametersNV.html)::`occupancyPriority` to
specify a high priority level.

All command buffers (primary and secondary) start with a priority level
equal to the VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV value.
The priority state is not inherited by secondary command buffers - each
command buffer maintains its own independent priority state.

* 
[vkCmdSetComputeOccupancyPriorityNV](vkCmdSetComputeOccupancyPriorityNV.html)

* 
[VkComputeOccupancyPriorityParametersNV](VkComputeOccupancyPriorityParametersNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV](VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV.html)

* 
[VK_COMPUTE_OCCUPANCY_PRIORITY_HIGH_NV](VK_COMPUTE_OCCUPANCY_PRIORITY_HIGH_NV.html)

* 
[VK_COMPUTE_OCCUPANCY_PRIORITY_LOW_NV](VK_COMPUTE_OCCUPANCY_PRIORITY_LOW_NV.html)

* 
[VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV](VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV.html)

* 
`VK_NV_COMPUTE_OCCUPANCY_PRIORITY_EXTENSION_NAME`

* 
`VK_NV_COMPUTE_OCCUPANCY_PRIORITY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_COMPUTE_OCCUPANCY_PRIORITY_PARAMETERS_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_OCCUPANCY_PRIORITY_FEATURES_NV](VkStructureType.html)

|  | The extension only allows specification of occupancy priority for compute
| --- | --- |
workloads, however, the priorities will also impact the prioritization of
compute workloads relative to simultaneously executing graphics workloads.
In such a scenario, the graphics workload may be thought of as executing at
VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV priority, and so a simultaneously
executing compute workload with VK_COMPUTE_OCCUPANCY_PRIORITY_HIGH_NV
occupancy priority will preferentially utilize available compute resources. |

|  | Workloads specified with a higher priority may begin execution after
| --- | --- |
workloads specified with a lower priority, at which point they may find GPU
compute resources already occupied.
So, while they will from that point forward preferentially occupy available
compute resources, they may not ramp up to full occupancy until the already
present lower priority work has reached a point where it can relinquish
compute resources. |

None.

* 
Revision 1, 2025-08-06 (Chris Lentini)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_compute_occupancy_priority).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
