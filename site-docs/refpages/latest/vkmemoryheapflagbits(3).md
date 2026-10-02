# VkMemoryHeapFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryHeapFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryHeapFlagBits - Bitmask specifying attribute flags for a heap

Bits which **may** be set in [VkMemoryHeap](VkMemoryHeap.html)::`flags`, indicating
attribute flags for the heap, are:

// Provided by VK_VERSION_1_0
typedef enum VkMemoryHeapFlagBits {
    VK_MEMORY_HEAP_DEVICE_LOCAL_BIT = 0x00000001,
  // Provided by VK_VERSION_1_1
    VK_MEMORY_HEAP_MULTI_INSTANCE_BIT = 0x00000002,
  // Provided by VK_QCOM_tile_memory_heap
    VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM = 0x00000008,
  // Provided by VK_KHR_device_group_creation
    VK_MEMORY_HEAP_MULTI_INSTANCE_BIT_KHR = VK_MEMORY_HEAP_MULTI_INSTANCE_BIT,
} VkMemoryHeapFlagBits;

* 
[VK_MEMORY_HEAP_DEVICE_LOCAL_BIT](#) specifies that the heap
corresponds to device-local memory.
Device-local memory **may** have different performance characteristics than
host-local memory, and **may** support different memory property flags.

* 
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](#) specifies that in a logical
device representing more than one physical device, there is a
per-physical device instance of the heap memory.
By default, an allocation from such a heap will be replicated to each
physical device’s instance of the heap.

* 
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](#) bit specifies that the heap
corresponds to tile memory.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkMemoryHeapFlags](VkMemoryHeapFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryHeapFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
