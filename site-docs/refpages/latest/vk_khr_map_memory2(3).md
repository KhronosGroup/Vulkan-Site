# VK_KHR_map_memory2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_map_memory2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_map_memory2](#VK_KHR_map_memory2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_map_memory2 - device extension

**Name String**

`VK_KHR_map_memory2`

**Extension Type**

Device extension

**Registered Extension Number**

272

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Faith Ekstrand [gfxstrand](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_map_memory2] @gfxstrand%0A*Here describe the issue or question you have about the VK_KHR_map_memory2 extension*)

**Extension Proposal**

[VK_KHR_map_memory2](../../../../features/latest/features/proposals/VK_KHR_map_memory2.html)

**Last Modified Date**

2023-03-14

**Interactions and External Dependencies**

* 
None

**Contributors**

* 
Faith Ekstrand, Collabora

* 
Tobias Hector, AMD

This extension provides extensible versions of the Vulkan memory map and
unmap commands.
The new commands are functionally identical to the core commands, except
that their parameters are specified using extensible structures that can be
used to pass extension-specific information.

* 
[vkMapMemory2KHR](vkMapMemory2.html)

* 
[vkUnmapMemory2KHR](vkUnmapMemory2.html)

* 
[VkMemoryMapInfoKHR](VkMemoryMapInfo.html)

* 
[VkMemoryUnmapInfoKHR](VkMemoryUnmapInfo.html)

* 
[VkMemoryUnmapFlagBitsKHR](VkMemoryUnmapFlagBits.html)

* 
[VkMemoryUnmapFlagsKHR](VkMemoryUnmapFlags.html)

* 
`VK_KHR_MAP_MEMORY_2_EXTENSION_NAME`

* 
`VK_KHR_MAP_MEMORY_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_MEMORY_MAP_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO_KHR](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 0, 2022-08-03 (Faith Ekstrand)

Internal revisions

Revision 1, 2023-03-14

* 
Public release

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_map_memory2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
