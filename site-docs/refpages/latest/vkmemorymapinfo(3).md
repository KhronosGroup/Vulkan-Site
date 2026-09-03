# VkMemoryMapInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryMapInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryMapInfo - Structure containing parameters of a memory map operation

The `VkMemoryMapInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkMemoryMapInfo {
    VkStructureType     sType;
    const void*         pNext;
    VkMemoryMapFlags    flags;
    VkDeviceMemory      memory;
    VkDeviceSize        offset;
    VkDeviceSize        size;
} VkMemoryMapInfo;

// Provided by VK_KHR_map_memory2
// Equivalent to VkMemoryMapInfo
typedef VkMemoryMapInfo VkMemoryMapInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkMemoryMapFlagBits](VkMemoryMapFlagBits.html) specifying
additional parameters of the memory map operation.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object to be mapped.

* 
`offset` is a zero-based byte offset from the beginning of the
memory object.

* 
`size` is the size of the memory range to map, or
[VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) to map from `offset` to the end of the
allocation.

Valid Usage

* 
[](#VUID-VkMemoryMapInfo-memory-07958) VUID-VkMemoryMapInfo-memory-07958

`memory` **must** not be currently host mapped

* 
[](#VUID-VkMemoryMapInfo-offset-07959) VUID-VkMemoryMapInfo-offset-07959

`offset` **must** be less than the size of `memory`

* 
[](#VUID-VkMemoryMapInfo-size-07960) VUID-VkMemoryMapInfo-size-07960

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
greater than `0`

* 
[](#VUID-VkMemoryMapInfo-size-07961) VUID-VkMemoryMapInfo-size-07961

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
less than or equal to the size of the `memory` minus `offset`

* 
[](#VUID-VkMemoryMapInfo-memory-07962) VUID-VkMemoryMapInfo-memory-07962

`memory` **must** have been created with a memory type that reports
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](VkMemoryPropertyFlagBits.html)

* 
[](#VUID-VkMemoryMapInfo-memory-07963) VUID-VkMemoryMapInfo-memory-07963

`memory` **must** not have been allocated with multiple instances

* 
[](#VUID-VkMemoryMapInfo-flags-09569) VUID-VkMemoryMapInfo-flags-09569

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags`, the
[`memoryMapPlaced`](../../../../spec/latest/chapters/features.html#features-memoryMapPlaced) feature **must** be
enabled

* 
[](#VUID-VkMemoryMapInfo-flags-09570) VUID-VkMemoryMapInfo-flags-09570

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags`, the
`pNext` chain **must** include a [VkMemoryMapPlacedInfoEXT](VkMemoryMapPlacedInfoEXT.html)
structure and `VkMemoryMapPlacedInfoEXT`::`pPlacedAddress` **must**
not be `NULL`

* 
[](#VUID-VkMemoryMapInfo-flags-09571) VUID-VkMemoryMapInfo-flags-09571

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags` and the
[`memoryMapRangePlaced`](../../../../spec/latest/chapters/features.html#features-memoryMapRangePlaced) feature is
not enabled, `offset` **must** be zero

* 
[](#VUID-VkMemoryMapInfo-flags-09572) VUID-VkMemoryMapInfo-flags-09572

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags` and the
[`memoryMapRangePlaced`](../../../../spec/latest/chapters/features.html#features-memoryMapRangePlaced) feature is
not enabled, `size` **must** be [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) or
`VkMemoryAllocateInfo`::`allocationSize`

* 
[](#VUID-VkMemoryMapInfo-flags-09573) VUID-VkMemoryMapInfo-flags-09573

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags` and the
[`memoryMapRangePlaced`](../../../../spec/latest/chapters/features.html#features-memoryMapRangePlaced) feature is
enabled, `offset` **must** be aligned to an integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapInfo-flags-09574) VUID-VkMemoryMapInfo-flags-09574

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags` and
`size` is not [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be aligned to an
integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapInfo-flags-09651) VUID-VkMemoryMapInfo-flags-09651

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags` and
`size` is [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html),
`VkMemoryAllocateInfo`::`allocationSize` **must** be aligned to an
integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapInfo-flags-09575) VUID-VkMemoryMapInfo-flags-09575

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in `flags`, the memory
object **must** not have been imported from a handle type of
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryMapInfo-sType-sType) VUID-VkMemoryMapInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_MAP_INFO](VkStructureType.html)

* 
[](#VUID-VkMemoryMapInfo-pNext-pNext) VUID-VkMemoryMapInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkMemoryMapPlacedInfoEXT](VkMemoryMapPlacedInfoEXT.html)

* 
[](#VUID-VkMemoryMapInfo-sType-unique) VUID-VkMemoryMapInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkMemoryMapInfo-flags-parameter) VUID-VkMemoryMapInfo-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryMapFlagBits](VkMemoryMapFlagBits.html) values

* 
[](#VUID-VkMemoryMapInfo-memory-parameter) VUID-VkMemoryMapInfo-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

[VK_KHR_map_memory2](VK_KHR_map_memory2.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkMemoryMapFlags](VkMemoryMapFlags.html), [VkStructureType](VkStructureType.html), [vkMapMemory2](vkMapMemory2.html), [vkMapMemory2](vkMapMemory2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryMapInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
