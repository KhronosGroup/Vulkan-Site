# VkTileMemoryBindInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTileMemoryBindInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTileMemoryBindInfoQCOM - Structure specifying tile memory to bind

The `VkTileMemoryBindInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_memory_heap
typedef struct VkTileMemoryBindInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkTileMemoryBindInfoQCOM;

* 
`memory` is the tile memory object to be bound.

`memory` is used to bind this memory object to tile memory for all
subsequent commands in the `commandBuffer`.
Tile memory contents for ranges in the heap outside the bound `memory`
are discarded and become **undefined** for the [active *tile memory scope*](../../../../spec/latest/chapters/memory.html#memory-tile-heaps) if an action command is executed.

For secondary command buffers executing within a render pass instance, the
active bound tile memory object is provided with this structure included in
the `pNext` chain of `VkCommandBufferInheritanceInfo`.

If this structure was not specified since recording started for
`commandBuffer`, no tile memory is bound to the command buffer and all
contents become **undefined** for the *tile memory scope* if an action command
is executed.

Valid Usage

* 
[](#VUID-VkTileMemoryBindInfoQCOM-memory-10726) VUID-VkTileMemoryBindInfoQCOM-memory-10726

`memory` **must** have been allocated from a [VkMemoryHeap](VkMemoryHeap.html) with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property

Valid Usage (Implicit)

* 
[](#VUID-VkTileMemoryBindInfoQCOM-sType-sType) VUID-VkTileMemoryBindInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_MEMORY_BIND_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkTileMemoryBindInfoQCOM-memory-parameter) VUID-VkTileMemoryBindInfoQCOM-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

[VK_QCOM_tile_memory_heap](VK_QCOM_tile_memory_heap.html), [VkDeviceMemory](VkDeviceMemory.html), [VkStructureType](VkStructureType.html), [vkCmdBindTileMemoryQCOM](vkCmdBindTileMemoryQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkTileMemoryBindInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
