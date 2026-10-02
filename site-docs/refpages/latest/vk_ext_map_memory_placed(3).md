# VK_EXT_map_memory_placed(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_map_memory_placed.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_map_memory_placed](#VK_EXT_map_memory_placed)
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

VK_EXT_map_memory_placed - device extension

**Name String**

`VK_EXT_map_memory_placed`

**Extension Type**

Device extension

**Registered Extension Number**

273

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_map_memory2](VK_KHR_map_memory2.html)

or

[Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4)

**Contact**

* 
Faith Ekstrand [gfxstrand](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_map_memory_placed] @gfxstrand%0A*Here describe the issue or question you have about the VK_EXT_map_memory_placed extension*)

**Extension Proposal**

[VK_EXT_map_memory_placed](../../../../features/latest/features/proposals/VK_EXT_map_memory_placed.html)

**Last Modified Date**

2023-03-21

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Depends on apitext:VK_KHR_map_memory2

* 
Interacts with apitext:VK_EXT_external_memory_host

**Contributors**

* 
Faith Ekstrand, Collabora

* 
Tobias Hector, AMD

* 
James Jones, NVIDIA

* 
Georg Lehmann, Valve

* 
Derek Lesho, Codeweavers

This extension allows an application to request that [vkMapMemory2KHR](vkMapMemory2.html)
attempt to place the memory map at a particular virtual address.

* 
Extending [VkMemoryMapInfo](VkMemoryMapInfo.html):

[VkMemoryMapPlacedInfoEXT](VkMemoryMapPlacedInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceMapMemoryPlacedFeaturesEXT](VkPhysicalDeviceMapMemoryPlacedFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMapMemoryPlacedPropertiesEXT](VkPhysicalDeviceMapMemoryPlacedPropertiesEXT.html)

* 
`VK_EXT_MAP_MEMORY_PLACED_EXTENSION_NAME`

* 
`VK_EXT_MAP_MEMORY_PLACED_SPEC_VERSION`

* 
Extending [VkMemoryMapFlagBits](VkMemoryMapFlagBits.html):

[VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html)

Extending [VkMemoryUnmapFlagBits](VkMemoryUnmapFlagBits.html):

* 
[VK_MEMORY_UNMAP_RESERVE_BIT_EXT](VkMemoryUnmapFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_MEMORY_MAP_PLACED_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAP_MEMORY_PLACED_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAP_MEMORY_PLACED_PROPERTIES_EXT](VkStructureType.html)

* 
Revision 1, 2024-01-14 (Faith Ekstrand)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_map_memory_placed).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
