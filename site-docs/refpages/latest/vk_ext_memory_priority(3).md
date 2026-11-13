# VK_EXT_memory_priority(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_memory_priority.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_memory_priority](#VK_EXT_memory_priority)
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

VK_EXT_memory_priority - device extension

**Name String**

`VK_EXT_memory_priority`

**Extension Type**

Device extension

**Registered Extension Number**

239

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
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_memory_priority] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_memory_priority extension*)

**Last Modified Date**

2018-10-08

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Jeff Juliano, NVIDIA

This extension adds a `priority` value specified at memory allocation
time.
On some systems with both device-local and non-device-local memory heaps,
the implementation may transparently move memory from one heap to another
when a heap becomes full (for example, when the total memory used across all
processes exceeds the size of the heap).
In such a case, this priority value may be used to determine which
allocations are more likely to remain in device-local memory.

* 
Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

[VkMemoryPriorityAllocateInfoEXT](VkMemoryPriorityAllocateInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceMemoryPriorityFeaturesEXT](VkPhysicalDeviceMemoryPriorityFeaturesEXT.html)

* 
`VK_EXT_MEMORY_PRIORITY_EXTENSION_NAME`

* 
`VK_EXT_MEMORY_PRIORITY_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_MEMORY_PRIORITY_ALLOCATE_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PRIORITY_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2018-10-08 (Jeff Bolz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_memory_priority).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
