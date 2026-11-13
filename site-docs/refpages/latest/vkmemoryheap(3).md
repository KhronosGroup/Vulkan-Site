# VkMemoryHeap(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryHeap.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryHeap - Structure specifying a memory heap

The `VkMemoryHeap` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryHeap {
    VkDeviceSize         size;
    VkMemoryHeapFlags    flags;
} VkMemoryHeap;

* 
`size` is the total memory size in bytes in the heap.

* 
`flags` is a bitmask of [VkMemoryHeapFlagBits](VkMemoryHeapFlagBits.html) specifying
attribute flags for the heap.

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [VkMemoryHeapFlags](VkMemoryHeapFlags.html), [VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryHeap).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
