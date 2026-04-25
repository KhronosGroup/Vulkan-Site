# VkMemoryUnmapInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryUnmapInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryUnmapInfo - Structure containing parameters of a memory unmap operation

The `VkMemoryUnmapInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkMemoryUnmapInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkMemoryUnmapFlags    flags;
    VkDeviceMemory        memory;
} VkMemoryUnmapInfo;

// Provided by VK_KHR_map_memory2
// Equivalent to VkMemoryUnmapInfo
typedef VkMemoryUnmapInfo VkMemoryUnmapInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkMemoryUnmapFlagBits](VkMemoryUnmapFlagBits.html) specifying
additional parameters of the memory map operation.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object to be unmapped.

Valid Usage

* 
[](#VUID-VkMemoryUnmapInfo-memory-07964) VUID-VkMemoryUnmapInfo-memory-07964

`memory` **must** be currently host mapped

* 
[](#VUID-VkMemoryUnmapInfo-flags-09579) VUID-VkMemoryUnmapInfo-flags-09579

If [VK_MEMORY_UNMAP_RESERVE_BIT_EXT](VkMemoryUnmapFlagBits.html) is set in `flags`, the
[`memoryUnmapReserve`](../../../../spec/latest/chapters/features.html#features-memoryUnmapReserve) **must** be
enabled

* 
[](#VUID-VkMemoryUnmapInfo-flags-09580) VUID-VkMemoryUnmapInfo-flags-09580

If [VK_MEMORY_UNMAP_RESERVE_BIT_EXT](VkMemoryUnmapFlagBits.html) is set in `flags`, the
memory object **must** not have been imported from a handle type of
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](VkExternalMemoryHandleTypeFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryUnmapInfo-sType-sType) VUID-VkMemoryUnmapInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO](VkStructureType.html)

* 
[](#VUID-VkMemoryUnmapInfo-pNext-pNext) VUID-VkMemoryUnmapInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryUnmapInfo-flags-parameter) VUID-VkMemoryUnmapInfo-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryUnmapFlagBits](VkMemoryUnmapFlagBits.html) values

* 
[](#VUID-VkMemoryUnmapInfo-memory-parameter) VUID-VkMemoryUnmapInfo-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

[VK_KHR_map_memory2](VK_KHR_map_memory2.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkDeviceMemory](VkDeviceMemory.html), [VkMemoryUnmapFlags](VkMemoryUnmapFlags.html), [VkStructureType](VkStructureType.html), [vkUnmapMemory2](vkUnmapMemory2.html), [vkUnmapMemory2](vkUnmapMemory2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryUnmapInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
