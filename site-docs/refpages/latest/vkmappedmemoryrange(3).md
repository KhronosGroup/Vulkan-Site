# VkMappedMemoryRange(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMappedMemoryRange.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMappedMemoryRange - Structure specifying a mapped memory range

The `VkMappedMemoryRange` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMappedMemoryRange {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
    VkDeviceSize       offset;
    VkDeviceSize       size;
} VkMappedMemoryRange;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object to which this range belongs.

* 
`offset` is the zero-based byte offset from the beginning of the
memory object.

* 
`size` is either the size of range, or [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) to affect
the range from `offset` to the end of the current mapping of the
allocation.

Valid Usage

* 
[](#VUID-VkMappedMemoryRange-memory-00684) VUID-VkMappedMemoryRange-memory-00684

`memory` **must** be currently host mapped

* 
[](#VUID-VkMappedMemoryRange-size-00685) VUID-VkMappedMemoryRange-size-00685

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `offset` and
`size` **must** specify a range contained within the currently mapped
range of `memory`

* 
[](#VUID-VkMappedMemoryRange-size-00686) VUID-VkMappedMemoryRange-size-00686

If `size` is equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `offset` **must** be
within the currently mapped range of `memory`

* 
[](#VUID-VkMappedMemoryRange-offset-00687) VUID-VkMappedMemoryRange-offset-00687

`offset` **must** be a multiple of
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`nonCoherentAtomSize`

* 
[](#VUID-VkMappedMemoryRange-size-01389) VUID-VkMappedMemoryRange-size-01389

If `size` is equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), the end of the current
mapping of `memory` **must** either be a multiple of
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`nonCoherentAtomSize` bytes from the
beginning of the memory object, or be equal to the end of the memory
object

* 
[](#VUID-VkMappedMemoryRange-size-01390) VUID-VkMappedMemoryRange-size-01390

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must**
either be a multiple of
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`nonCoherentAtomSize`, or `offset`
plus `size` **must** equal the size of `memory`

Valid Usage (Implicit)

* 
[](#VUID-VkMappedMemoryRange-sType-sType) VUID-VkMappedMemoryRange-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MAPPED_MEMORY_RANGE](VkStructureType.html)

* 
[](#VUID-VkMappedMemoryRange-pNext-pNext) VUID-VkMappedMemoryRange-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMappedMemoryRange-memory-parameter) VUID-VkMappedMemoryRange-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkFlushMappedMemoryRanges](vkFlushMappedMemoryRanges.html), [vkInvalidateMappedMemoryRanges](vkInvalidateMappedMemoryRanges.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMappedMemoryRange).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
