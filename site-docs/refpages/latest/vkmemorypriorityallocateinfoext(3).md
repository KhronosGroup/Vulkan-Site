# VkMemoryPriorityAllocateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryPriorityAllocateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryPriorityAllocateInfoEXT - Specify a memory allocation priority

If the `pNext` chain includes a `VkMemoryPriorityAllocateInfoEXT`
structure, then that structure includes a priority for the memory.

The `VkMemoryPriorityAllocateInfoEXT` structure is defined as:

// Provided by VK_EXT_memory_priority
typedef struct VkMemoryPriorityAllocateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    float              priority;
} VkMemoryPriorityAllocateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`priority` is a floating-point value between `0` and `1`, indicating
the priority of the allocation relative to other memory allocations.
Larger values are higher priority.
The granularity of the priorities is implementation-dependent.

Memory allocations with higher priority **may** be more likely to stay in
device-local memory when the system is under memory pressure.

If this structure is not included, it is as if the `priority` value were
`0.5`.

Valid Usage

* 
[](#VUID-VkMemoryPriorityAllocateInfoEXT-priority-02602) VUID-VkMemoryPriorityAllocateInfoEXT-priority-02602

`priority` **must** be between `0` and `1`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryPriorityAllocateInfoEXT-sType-sType) VUID-VkMemoryPriorityAllocateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_PRIORITY_ALLOCATE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

[VK_EXT_memory_priority](VK_EXT_memory_priority.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkMemoryPriorityAllocateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
