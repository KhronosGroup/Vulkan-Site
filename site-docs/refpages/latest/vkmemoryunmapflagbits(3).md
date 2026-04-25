# VkMemoryUnmapFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryUnmapFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryUnmapFlagBits - Bitmask specifying additional parameters of a memory unmap

Bits which **can** be set in [VkMemoryUnmapInfo](VkMemoryUnmapInfo.html)::`flags`, specifying
additional properties of a memory unmap, are:

// Provided by VK_VERSION_1_4
typedef enum VkMemoryUnmapFlagBits {
  // Provided by VK_EXT_map_memory_placed
    VK_MEMORY_UNMAP_RESERVE_BIT_EXT = 0x00000001,
} VkMemoryUnmapFlagBits;

// Provided by VK_KHR_map_memory2
// Equivalent to VkMemoryUnmapFlagBits
typedef VkMemoryUnmapFlagBits VkMemoryUnmapFlagBitsKHR;

* 
[VK_MEMORY_UNMAP_RESERVE_BIT_EXT](#) requests that virtual address
range currently occupied by the memory map remain reserved after the
[vkUnmapMemory2](vkUnmapMemory2.html) call completes.
Future system memory map operations or calls to [vkMapMemory](vkMapMemory.html) or
[vkMapMemory2](vkMapMemory2.html) will not return addresses in that range unless the
range has since been unreserved by the client or the mapping is
explicitly placed in that range by calling [vkMapMemory2](vkMapMemory2.html) with
[VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html), or doing the system memory map
equivalent.
When [VK_MEMORY_UNMAP_RESERVE_BIT_EXT](#) is set, the memory unmap
operation **may** fail, in which case the memory object will remain host
mapped and [vkUnmapMemory2](vkUnmapMemory2.html) will return
[VK_ERROR_MEMORY_MAP_FAILED](VkResult.html).

[VK_KHR_map_memory2](VK_KHR_map_memory2.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkMemoryUnmapFlags](VkMemoryUnmapFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryUnmapFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
