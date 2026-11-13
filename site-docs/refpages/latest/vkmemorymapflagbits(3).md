# VkMemoryMapFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryMapFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryMapFlagBits - Bitmask specifying additional parameters of a memory map

Bits which **can** be set in [vkMapMemory](vkMapMemory.html)::`flags` and
[VkMemoryMapInfo](VkMemoryMapInfo.html)::`flags`, specifying additional properties of a
memory map, are:

// Provided by VK_VERSION_1_0
typedef enum VkMemoryMapFlagBits {
  // Provided by VK_EXT_map_memory_placed
    VK_MEMORY_MAP_PLACED_BIT_EXT = 0x00000001,
} VkMemoryMapFlagBits;

* 
[VK_MEMORY_MAP_PLACED_BIT_EXT](#) requests that the implementation
place the memory map at the virtual address specified by the application
via [VkMemoryMapPlacedInfoEXT](VkMemoryMapPlacedInfoEXT.html)::`pPlacedAddress`, replacing any
existing mapping at that address.
This flag **must** not be used with [vkMapMemory](vkMapMemory.html) as there is no way to
specify the placement address.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkMemoryMapFlags](VkMemoryMapFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryMapFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
