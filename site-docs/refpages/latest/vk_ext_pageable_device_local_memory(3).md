# VK_EXT_pageable_device_local_memory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pageable_device_local_memory.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pageable_device_local_memory](#VK_EXT_pageable_device_local_memory)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pageable_device_local_memory - device extension

**Name String**

`VK_EXT_pageable_device_local_memory`

**Extension Type**

Device extension

**Registered Extension Number**

413

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_memory_priority](VK_EXT_memory_priority.html)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_pageable_device_local_memory] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_pageable_device_local_memory extension*)

**Last Modified Date**

2021-08-24

**Contributors**

* 
Hans-Kristian Arntzen, Valve

* 
Axel Gneiting, id Software

* 
Billy Khan, id Software

* 
Daniel Koch, NVIDIA

* 
Chris Lentini, NVIDIA

* 
Joshua Schnarr, NVIDIA

* 
Stu Smith, AMD

Vulkan is frequently implemented on multi-user and multi-process operating
systems where the device-local memory can be shared by more than one
process.
On such systems the size of the device-local memory available to the
application may not be the full size of the memory heap at all times.
In order for these operating systems to support multiple applications the
device-local memory is virtualized and paging is used to move memory between
device-local and host-local memory heaps, transparent to the application.

The current Vulkan specification does not expose this behavior well and may
cause applications to make suboptimal memory choices when allocating memory.
For example, in a system with multiple applications running, the application
may think that device-local memory is full and revert to making
performance-sensitive allocations from host-local memory.
In reality the memory heap might not have been full, it just appeared to be
at the time memory consumption was queried, and a device-local allocation
would have succeeded.
A well designed operating system that implements pageable device-local
memory will try to have all memory allocations for the foreground
application paged into device-local memory, and paged out for other
applications as needed when not in use.

When this extension is exposed by the Vulkan implementation it indicates to
the application that the operating system implements pageable device-local
memory and the application should adjust its memory allocation strategy
accordingly.
The extension also exposes a new [vkSetDeviceMemoryPriorityEXT](vkSetDeviceMemoryPriorityEXT.html) function
to allow the application to dynamically adjust the priority of existing
memory allocations based on its current needs.
This will help the operating system page out lower priority memory
allocations before higher priority allocations when needed.
It will also help the operating system decide which memory allocations to
page back into device-local memory first.

To take best advantage of pageable device-local memory the application must
create the Vulkan device with the
[VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT](VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT.html)::`pageableDeviceLocalMemory`
feature enabled.
When enabled the Vulkan implementation will allow device-local memory
allocations to be paged in and out by the operating system, and **may** not
return VK_ERROR_OUT_OF_DEVICE_MEMORY even if device-local memory appears to
be full, but will instead page this, or other allocations, out to make room.
The Vulkan implementation will also ensure that host-local memory
allocations will never be promoted to device-local memory by the operating
system, or consume device-local memory.

* 
[vkSetDeviceMemoryPriorityEXT](vkSetDeviceMemoryPriorityEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT](VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT.html)

* 
`VK_EXT_PAGEABLE_DEVICE_LOCAL_MEMORY_EXTENSION_NAME`

* 
`VK_EXT_PAGEABLE_DEVICE_LOCAL_MEMORY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PAGEABLE_DEVICE_LOCAL_MEMORY_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2021-08-24 (Piers Daniell)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pageable_device_local_memory).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
