# VkPhysicalDeviceTileMemoryHeapPropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTileMemoryHeapPropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTileMemoryHeapPropertiesQCOM - Structure describing tile memory heap properties that can be supported by an implementation

The `VkPhysicalDeviceTileMemoryHeapPropertiesQCOM` structure is defined
as:

// Provided by VK_QCOM_tile_memory_heap
typedef struct VkPhysicalDeviceTileMemoryHeapPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           queueSubmitBoundary;
    VkBool32           tileBufferTransfers;
} VkPhysicalDeviceTileMemoryHeapPropertiesQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `queueSubmitBoundary` is a boolean
describing if tile memory becomes **undefined** at a queue submit boundary
instead of the default command buffer submission batch boundary.

* 
 `tileBufferTransfers` is a boolean
describing if buffers bound to tile memory support transfer operations.

If the `VkPhysicalDeviceTileMemoryHeapPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTileMemoryHeapPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceTileMemoryHeapPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_MEMORY_HEAP_PROPERTIES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_QCOM_tile_memory_heap](VK_QCOM_tile_memory_heap.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceTileMemoryHeapPropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
