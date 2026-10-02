# VK_QCOM_tile_memory_heap(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_tile_memory_heap.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_tile_memory_heap](#VK_QCOM_tile_memory_heap)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Issues](#_issues)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_tile_memory_heap - device extension

**Name String**

`VK_QCOM_tile_memory_heap`

**Extension Type**

Device extension

**Registered Extension Number**

548

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

     [VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html)

     and

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_QCOM_tile_properties

**Contact**

* 
Patrick Boyle [pboyleQCOM](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_tile_memory_heap] @pboyleQCOM%0A*Here describe the issue or question you have about the VK_QCOM_tile_memory_heap extension*)

**Extension Proposal**

[VK_QCOM_tile_memory_heap](../../../../features/latest/features/proposals/VK_QCOM_tile_memory_heap.html)

**Last Modified Date**

2025-05-05

**Interactions and External Dependencies**

* 
Interacts with `[VK_QCOM_tile_properties](VK_QCOM_tile_properties.html)`

* 
Interacts with `[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html)`

**Contributors**

* 
Patrick Boyle, Qualcomm Technologies, Inc.

* 
Matthew Netsch, Qualcomm Technologies, Inc.

* 
Srihari Babu Alla, Qualcomm Technologies, Inc.

* 
Kevin Matlage, Qualcomm Technologies, Inc.

This extension adds a new memory heap which allows applications to allocate
and manage tile memory.
A tile memory heap is denoted by the new
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property.
Memory contents within this heap behave differently than other heaps and
only persist its memory contents within a command buffer submission batch
boundary.
This boundary may be extended to a queue submit boundary by querying
`queueSubmitBoundary` in the new
`VkPhysicalDeviceTileMemoryHeapPropertiesQCOM` structure.

Tile memory from this heap can be bound to VkImages or VkBuffers.
The following new usage flags [VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](VkImageUsageFlagBits.html),
[VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](VkBufferUsageFlagBits.html),
[VK_BUFFER_USAGE_2_TILE_MEMORY_BIT_QCOM](VkBufferUsageFlagBits2.html) were added for this.
A new extended structure is added to get memory requirements for tile memory
`VkTileMemoryRequirementsQCOM`.

A new command is added to bind tile memory to a command buffer in order to
access and persist tile memory contents while executing commands
[vkCmdBindTileMemoryQCOM](vkCmdBindTileMemoryQCOM.html).

This extension can be used in combination with
[VK_QCOM_tile_properties](VK_QCOM_tile_properties.html) with the new structure
[VkTileMemorySizeInfoQCOM](VkTileMemorySizeInfoQCOM.html).

None.

* 
[vkCmdBindTileMemoryQCOM](vkCmdBindTileMemoryQCOM.html)

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkTileMemoryBindInfoQCOM](VkTileMemoryBindInfoQCOM.html)

Extending [VkMemoryRequirements2](VkMemoryRequirements2.html):

* 
[VkTileMemoryRequirementsQCOM](VkTileMemoryRequirementsQCOM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceTileMemoryHeapFeaturesQCOM](VkPhysicalDeviceTileMemoryHeapFeaturesQCOM.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceTileMemoryHeapPropertiesQCOM](VkPhysicalDeviceTileMemoryHeapPropertiesQCOM.html)

If [VK_QCOM_tile_properties](VK_QCOM_tile_properties.html) is supported:

* 
Extending [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkRenderingInfo](VkRenderingInfo.html):

[VkTileMemorySizeInfoQCOM](VkTileMemorySizeInfoQCOM.html)

* 
`VK_QCOM_TILE_MEMORY_HEAP_EXTENSION_NAME`

* 
`VK_QCOM_TILE_MEMORY_HEAP_SPEC_VERSION`

* 
Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

[VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](VkBufferUsageFlagBits.html)

Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

* 
[VK_BUFFER_USAGE_2_TILE_MEMORY_BIT_QCOM](VkBufferUsageFlagBits2.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](VkImageUsageFlagBits.html)

Extending [VkMemoryHeapFlagBits](VkMemoryHeapFlagBits.html):

* 
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_MEMORY_HEAP_FEATURES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_MEMORY_HEAP_PROPERTIES_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TILE_MEMORY_BIND_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TILE_MEMORY_REQUIREMENTS_QCOM](VkStructureType.html)

If [VK_QCOM_tile_properties](VK_QCOM_tile_properties.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_TILE_MEMORY_SIZE_INFO_QCOM](VkStructureType.html)

* 
Revision 1, 2025-03-26 (Patrick Boyle)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_tile_memory_heap).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
