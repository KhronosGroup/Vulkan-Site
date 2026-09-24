# VkTileMemoryRequirementsQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTileMemoryRequirementsQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTileMemoryRequirementsQCOM - Structure specifying tile memory requirements

To determine the tile memory allocation requirements of a buffer or image
resource, add a `VkTileMemoryRequirementsQCOM` structure to the
`pNext` chain of the `VkMemoryRequirements2` structure passed as the
`pMemoryRequirements` parameter of [vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html)
or [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html), respectively.
The `VkTileMemoryRequirementsQCOM` structure is defined as:

// Provided by VK_QCOM_tile_memory_heap
typedef struct VkTileMemoryRequirementsQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       size;
    VkDeviceSize       alignment;
} VkTileMemoryRequirementsQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`size` is the size, in bytes, of the tile memory allocation required
for the resource.

* 
`alignment` is the alignment, in bytes, of the offset within the
tile memory allocation required for the resource.

The `size` and `alignment` **must** be used when the resource is bound
to a [VkDeviceMemory](VkDeviceMemory.html) object that was allocated from a
[VkMemoryType](VkMemoryType.html) that has a `heapIndex` that corresponds to a
[VkMemoryHeap](VkMemoryHeap.html) with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html)
property.

If the resource cannot be bound to tile memory, then `size` and
`alignment` is filled with zero by the implementation.

Valid Usage (Implicit)

* 
[](#VUID-VkTileMemoryRequirementsQCOM-sType-sType) VUID-VkTileMemoryRequirementsQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_MEMORY_REQUIREMENTS_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryRequirements2](VkMemoryRequirements2.html)

[VK_QCOM_tile_memory_heap](VK_QCOM_tile_memory_heap.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTileMemoryRequirementsQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
