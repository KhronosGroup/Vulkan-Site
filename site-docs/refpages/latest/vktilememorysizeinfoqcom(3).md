# VkTileMemorySizeInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTileMemorySizeInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTileMemorySizeInfoQCOM - Structure describing tile memory size in use in a render pass instance

The tile properties queried using [VK_QCOM_tile_properties](VK_QCOM_tile_properties.html) depend on
the size of the reserved tile memory by the application.
This size **can** be specified by the following structure to
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)
, or [VkRenderingInfo](VkRenderingInfo.html)
to specify the reserved tile memory size for the render pass object.

For dynamic render passes, this structure **can** be attached to the
`pNext` member of [VkRenderingInfo](VkRenderingInfo.html) passed to
[vkGetDynamicRenderingTilePropertiesQCOM](vkGetDynamicRenderingTilePropertiesQCOM.html).

The `VkTileMemorySizeInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_memory_heap with VK_QCOM_tile_properties
typedef struct VkTileMemorySizeInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       size;
} VkTileMemorySizeInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`size` is the size in bytes of tile memory used by the render pass
or preserved for later use.

The returned tile properties are invalid if the `size` is not equal to
the [bound tile memory’s](../../../../spec/latest/chapters/memory.html#memory-bind-tile-memory) allocation size when
the render pass is executed.

If this structure is not provided, the `size` of the reserved region
defaults to `0`.

|  | Tile memory is reserved for application use by binding tile memory objects
| --- | --- |
to the command buffer.

The size provided by this command is informational only for use when
evaluating tile properties.
If the application does not need to query the tile properties, then this
size **can** be safely omitted. |

Valid Usage

* 
[](#VUID-VkTileMemorySizeInfoQCOM-size-10729) VUID-VkTileMemorySizeInfoQCOM-size-10729

`size` must be less than or equal to the largest size memory heap
with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property

Valid Usage (Implicit)

* 
[](#VUID-VkTileMemorySizeInfoQCOM-sType-sType) VUID-VkTileMemorySizeInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_MEMORY_SIZE_INFO_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)

* 
[VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_QCOM_tile_memory_heap](VK_QCOM_tile_memory_heap.html), [VK_QCOM_tile_properties](VK_QCOM_tile_properties.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkTileMemorySizeInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
