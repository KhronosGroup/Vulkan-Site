# VkPhysicalDeviceMemoryBudgetPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMemoryBudgetPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMemoryBudgetPropertiesEXT - Structure specifying physical device memory budget and usage

If the `VkPhysicalDeviceMemoryBudgetPropertiesEXT` structure is included
in the `pNext` chain of [VkPhysicalDeviceMemoryProperties2](VkPhysicalDeviceMemoryProperties2.html), it is
filled with the current memory budgets and usages.

The `VkPhysicalDeviceMemoryBudgetPropertiesEXT` structure is defined as:

// Provided by VK_EXT_memory_budget
typedef struct VkPhysicalDeviceMemoryBudgetPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       heapBudget[VK_MAX_MEMORY_HEAPS];
    VkDeviceSize       heapUsage[VK_MAX_MEMORY_HEAPS];
} VkPhysicalDeviceMemoryBudgetPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`heapBudget` is an array of [VK_MAX_MEMORY_HEAPS](VK_MAX_MEMORY_HEAPS.html)
`VkDeviceSize` values in which memory budgets are returned, with
one element for each memory heap.
A heap’s budget is a rough estimate of how much memory the process **can**
allocate from that heap before allocations **may** fail or cause
performance degradation.
The budget includes any currently allocated device memory.

* 
`heapUsage` is an array of [VK_MAX_MEMORY_HEAPS](VK_MAX_MEMORY_HEAPS.html)
`VkDeviceSize` values in which memory usages are returned, with
one element for each memory heap.
A heap’s usage is an estimate of how much memory the process is
currently using in that heap.

The values returned in this structure are not invariant.
The `heapBudget` and `heapUsage` values **must** be zero for array
elements greater than or equal to
[VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)::`memoryHeapCount`.
The `heapBudget` value **must** be non-zero for array elements less than
[VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)::`memoryHeapCount`.
The `heapBudget` value **must** be less than or equal to
[VkMemoryHeap](VkMemoryHeap.html)::`size` for each heap.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryBudgetPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMemoryBudgetPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_BUDGET_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceMemoryProperties2](VkPhysicalDeviceMemoryProperties2.html)

[VK_EXT_memory_budget](VK_EXT_memory_budget.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkPhysicalDeviceMemoryBudgetPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
