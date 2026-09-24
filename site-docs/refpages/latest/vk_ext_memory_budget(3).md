# VK_EXT_memory_budget(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_memory_budget.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_memory_budget](#VK_EXT_memory_budget)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_memory_budget - device extension

**Name String**

`VK_EXT_memory_budget`

**Extension Type**

Device extension

**Registered Extension Number**

238

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_memory_budget] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_memory_budget extension*)

**Last Modified Date**

2018-10-08

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Jeff Juliano, NVIDIA

While running a Vulkan application, other processes on the machine might
also be attempting to use the same device memory, which can pose problems.
This extension adds support for querying the amount of memory used and the
total memory budget for a memory heap.
The values returned by this query are implementation-dependent and can
depend on a variety of factors including operating system and system load.

The [VkPhysicalDeviceMemoryBudgetPropertiesEXT](VkPhysicalDeviceMemoryBudgetPropertiesEXT.html)::`heapBudget` values
can be used as a guideline for how much total memory from each heap the
**current process** can use at any given time, before allocations may start
failing or causing performance degradation.
The values may change based on other activity in the system that is outside
the scope and control of the Vulkan implementation.

The [VkPhysicalDeviceMemoryBudgetPropertiesEXT](VkPhysicalDeviceMemoryBudgetPropertiesEXT.html)::`heapUsage` will
display the **current process** estimated heap usage.

With this information, the idea is for an application at some interval (once
per frame, per few seconds, etc) to query `heapBudget` and
`heapUsage`.
From here the application can notice if it is over budget and decide how it
wants to handle the memory situation (free it, move to host memory, changing
mipmap levels, etc).
This extension is designed to be used in concert with
`[VK_EXT_memory_priority](VK_EXT_memory_priority.html)` to help with this part of memory management.

* 
Extending [VkPhysicalDeviceMemoryProperties2](VkPhysicalDeviceMemoryProperties2.html):

[VkPhysicalDeviceMemoryBudgetPropertiesEXT](VkPhysicalDeviceMemoryBudgetPropertiesEXT.html)

* 
`VK_EXT_MEMORY_BUDGET_EXTENSION_NAME`

* 
`VK_EXT_MEMORY_BUDGET_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_BUDGET_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 1, 2018-10-08 (Jeff Bolz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_memory_budget).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
