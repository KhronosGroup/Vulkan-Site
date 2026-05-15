# VK_NV_external_compute_queue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_external_compute_queue.html

## Table of Contents

- [Name](#_name)
- [VK_NV_external_compute_queue](#VK_NV_external_compute_queue)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_external_compute_queue - device extension

**Name String**

`VK_NV_external_compute_queue`

**Extension Type**

Device extension

**Registered Extension Number**

557

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Chris Lentini [clentini](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_external_compute_queue] @clentini%0A*Here describe the issue or question you have about the VK_NV_external_compute_queue extension*)

**Extension Proposal**

[VK_NV_external_compute_queue](../../../../features/latest/features/proposals/VK_NV_external_compute_queue.html)

**Last Modified Date**

2025-03-24

**Contributors**

* 
Chris Lentini, NVIDIA

* 
Eric Werness, NVIDIA

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Liam Middlebrook, NVIDIA

* 
Lionel Duc, NVIDIA

This extension gives applications the ability to join compatible external
compute APIs to a `VkDevice`.
In this way, the extension allows an application to achieve simultaneous
execution between work submitted from these compatible external APIs and
work that has been submitted through the Vulkan API.

At device creation time, an application **must** supply a
[VkExternalComputeQueueDeviceCreateInfoNV](VkExternalComputeQueueDeviceCreateInfoNV.html).
This communicates to the implementation the maximum number of external
queues that the application **can** create at once.
This information **may** be used by the implementation to aid in decisions made
during device creation.

After device creation, the function [vkCreateExternalComputeQueueNV](vkCreateExternalComputeQueueNV.html) is
used by an application to create a new `VkExternalComputeQueueNV`
object.
The `VkExternalComputeQueueNV` object holds information and reserves
resources necessary for a compatible external API to be able to join a
`VkDevice`.
This information can be queried through the
[vkGetExternalComputeQueueDataNV](vkGetExternalComputeQueueDataNV.html) function, returning an opaque blob of
data which can be passed to compatible external APIs.
The application **must** finally call [vkDestroyExternalComputeQueueNV](vkDestroyExternalComputeQueueNV.html)
when it is done in order to release the reserved resources.

This extension introduces a new properties structure,
[VkPhysicalDeviceExternalComputeQueuePropertiesNV](VkPhysicalDeviceExternalComputeQueuePropertiesNV.html), which can be queried
through [vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html).
The structure provides information on functional limits to the extension as
well as a way of querying the size of the application allocated memory which
**must** be passed to the [vkGetExternalComputeQueueDataNV](vkGetExternalComputeQueueDataNV.html) function.

When creating a `VkExternalComputeQueueNV` through
[vkCreateExternalComputeQueueNV](vkCreateExternalComputeQueueNV.html), the
[VkExternalComputeQueueCreateInfoNV](VkExternalComputeQueueCreateInfoNV.html) structure requires an application
to supply a `VkQueue` to aid in external compute queue creation.
The supplied `VkQueue` is a strong scheduling hint about which queue it
expects to submit graphics workloads to and with which it expects
simultaneous execution of compute workloads submitted through the external
API.

* 
[VkExternalComputeQueueNV](VkExternalComputeQueueNV.html)

* 
[vkCreateExternalComputeQueueNV](vkCreateExternalComputeQueueNV.html)

* 
[vkDestroyExternalComputeQueueNV](vkDestroyExternalComputeQueueNV.html)

* 
[vkGetExternalComputeQueueDataNV](vkGetExternalComputeQueueDataNV.html)

* 
[VkExternalComputeQueueCreateInfoNV](VkExternalComputeQueueCreateInfoNV.html)

* 
[VkExternalComputeQueueDataParamsNV](VkExternalComputeQueueDataParamsNV.html)

* 
Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkExternalComputeQueueDeviceCreateInfoNV](VkExternalComputeQueueDeviceCreateInfoNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceExternalComputeQueuePropertiesNV](VkPhysicalDeviceExternalComputeQueuePropertiesNV.html)

* 
`VK_NV_EXTERNAL_COMPUTE_QUEUE_EXTENSION_NAME`

* 
`VK_NV_EXTERNAL_COMPUTE_QUEUE_SPEC_VERSION`

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_EXTERNAL_COMPUTE_QUEUE_NV](VkObjectType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DATA_PARAMS_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DEVICE_CREATE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_COMPUTE_QUEUE_PROPERTIES_NV](VkStructureType.html)

|  | While the external queue is now a part of a `VkDevice`, idling the
| --- | --- |
device through [vkDeviceWaitIdle](vkDeviceWaitIdle.html) does not wait for the external queue.
Draining the work on an external queue **must** be done through its own
external API.
External queues **must** be idled before destroying the associated
`VkDevice`. |

|  | In general, synchronization and resource sharing between the external API
| --- | --- |
and Vulkan must still be accomplished via existing cross-API interop
mechanisms. |

* 
Revision 1, 2024-05-20 (Chris Lentini)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_external_compute_queue).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
