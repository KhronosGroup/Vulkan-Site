# VkMemoryMapPlacedInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryMapPlacedInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryMapPlacedInfoEXT - Structure containing memory map placement parameters

If [VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html) is set in
`VkMemoryMapInfo`::`flags` and the `pNext` chain of
[VkMemoryMapInfo](VkMemoryMapInfo.html) includes a `VkMemoryMapPlacedInfoEXT` structure,
then that structure specifies the placement address of the memory map.
The implementation will place the memory map at the specified address,
replacing any existing maps in the specified memory range.
Replacing memory maps in this way does not implicitly unmap Vulkan memory
objects.
Instead, the application **must** ensure no other Vulkan memory objects are
mapped anywhere in the specified virtual address range.
If successful, `ppData` will be set to the same value as
`VkMemoryMapPlacedInfoEXT`::`pPlacedAddress` and `vkMapMemory2`
will return [VK_SUCCESS](VkResult.html).
If it cannot place the map at the requested address for any reason, the
memory object is left unmapped and `vkMapMemory2` will return
[VK_ERROR_MEMORY_MAP_FAILED](VkResult.html).

The `VkMemoryMapPlacedInfoEXT` structure is defined as:

// Provided by VK_EXT_map_memory_placed
typedef struct VkMemoryMapPlacedInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    void*              pPlacedAddress;
} VkMemoryMapPlacedInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pPlacedAddress` is the virtual address at which to place the
address.
If `VkMemoryMapInfo`::`flags` does not contain
[VK_MEMORY_MAP_PLACED_BIT_EXT](VkMemoryMapFlagBits.html), this value is ignored.

Valid Usage

* 
[](#VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09577) VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09577

`pPlacedAddress` **must** be aligned to an integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09578) VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09578

The address range specified by `pPlacedAddress` and
`VkMemoryMapInfo`::`size` **must** not overlap any existing Vulkan
memory object mapping

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryMapPlacedInfoEXT-sType-sType) VUID-VkMemoryMapPlacedInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_MAP_PLACED_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryMapInfo](VkMemoryMapInfo.html)

[VK_EXT_map_memory_placed](VK_EXT_map_memory_placed.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryMapPlacedInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
