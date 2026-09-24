# VkMemoryRangeBarriersInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryRangeBarriersInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryRangeBarriersInfoKHR - Structure specifying memory range barriers

The `VkMemoryRangeBarriersInfoKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkMemoryRangeBarriersInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    uint32_t                          memoryRangeBarrierCount;
    const VkMemoryRangeBarrierKHR*    pMemoryRangeBarriers;
} VkMemoryRangeBarriersInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryRangeBarrierCount` is the length of the
`pMemoryRangeBarriers` array

* 
`pMemoryRangeBarriers` is a pointer to an array of
[VkMemoryRangeBarrierKHR](VkMemoryRangeBarrierKHR.html) structures defining memory dependencies
between accesses to specified memory ranges.

When this structure is included in the `pNext` chain of
[VkDependencyInfo](VkDependencyInfo.html), it defines a set of
[memory dependencies](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-memory), as well as
[queue family ownership transfer operations](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers), for a specified set of memory ranges.

If this structure is not included in the `pNext` chain of
[VkDependencyInfo](VkDependencyInfo.html), it is equivalent to specifying it with a
`memoryRangeBarrierCount` of 0.

Each member of `pMemoryRangeBarriers` defines a separate
[memory dependency](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-memory).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryRangeBarriersInfoKHR-sType-sType) VUID-VkMemoryRangeBarriersInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIERS_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkMemoryRangeBarriersInfoKHR-pMemoryRangeBarriers-parameter) VUID-VkMemoryRangeBarriersInfoKHR-pMemoryRangeBarriers-parameter

 If `memoryRangeBarrierCount` is not `0`, `pMemoryRangeBarriers` **must** be a valid pointer to an array of `memoryRangeBarrierCount` valid [VkMemoryRangeBarrierKHR](VkMemoryRangeBarrierKHR.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDependencyInfo](VkDependencyInfo.html)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkMemoryRangeBarrierKHR](VkMemoryRangeBarrierKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkMemoryRangeBarriersInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
