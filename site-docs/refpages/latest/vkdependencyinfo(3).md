# VkDependencyInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDependencyInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDependencyInfo - Structure specifying dependency information for a synchronization command

The `VkDependencyInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkDependencyInfo {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDependencyFlags                dependencyFlags;
    uint32_t                         memoryBarrierCount;
    const VkMemoryBarrier2*          pMemoryBarriers;
    uint32_t                         bufferMemoryBarrierCount;
    const VkBufferMemoryBarrier2*    pBufferMemoryBarriers;
    uint32_t                         imageMemoryBarrierCount;
    const VkImageMemoryBarrier2*     pImageMemoryBarriers;
} VkDependencyInfo;

// Provided by VK_KHR_synchronization2
// Equivalent to VkDependencyInfo
typedef VkDependencyInfo VkDependencyInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dependencyFlags` is a bitmask of [VkDependencyFlagBits](VkDependencyFlagBits.html)
specifying how execution and memory dependencies are formed.

* 
`memoryBarrierCount` is the length of the `pMemoryBarriers`
array.

* 
`pMemoryBarriers` is a pointer to an array of [VkMemoryBarrier2](VkMemoryBarrier2.html)
structures defining memory dependencies between any memory accesses.

* 
`bufferMemoryBarrierCount` is the length of the
`pBufferMemoryBarriers` array.

* 
`pBufferMemoryBarriers` is a pointer to an array of
[VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html) structures defining memory dependencies
between buffer ranges.

* 
`imageMemoryBarrierCount` is the length of the
`pImageMemoryBarriers` array.

* 
`pImageMemoryBarriers` is a pointer to an array of
[VkImageMemoryBarrier2](VkImageMemoryBarrier2.html) structures defining memory dependencies
between image subresources.

This structure defines a set of [memory dependencies](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-memory), as well as [queue family ownership transfer operations](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) and
[image layout transitions](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions).

Each member of `pMemoryBarriers`, `pBufferMemoryBarriers`, and
`pImageMemoryBarriers` defines a separate
[memory dependency](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-memory).

Valid Usage

* 
[](#VUID-VkDependencyInfo-pMemoryBarriers-10605) VUID-VkDependencyInfo-pMemoryBarriers-10605

For each element of `pMemoryBarriers`, the `sType` value of each
structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDependencyInfo-pMemoryBarriers-10606) VUID-VkDependencyInfo-pMemoryBarriers-10606

    For each element of `pMemoryBarriers`, `pNext` **must** be
either
    `NULL`
    or a pointer to a valid instance of [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html)

* 
[](#VUID-VkDependencyInfo-pNext-09754) VUID-VkDependencyInfo-pNext-09754

If a [VkTensorDependencyInfoARM](VkTensorDependencyInfoARM.html) structure is included in the
`pNext` chain, a [VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html) structure **must** not
be included in the `pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-VkDependencyInfo-sType-sType) VUID-VkDependencyInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEPENDENCY_INFO](VkStructureType.html)

* 
[](#VUID-VkDependencyInfo-pNext-pNext) VUID-VkDependencyInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkMemoryRangeBarriersInfoKHR](VkMemoryRangeBarriersInfoKHR.html), [VkTensorDependencyInfoARM](VkTensorDependencyInfoARM.html), or [VkTensorMemoryBarrierARM](VkTensorMemoryBarrierARM.html)

* 
[](#VUID-VkDependencyInfo-sType-unique) VUID-VkDependencyInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDependencyInfo-dependencyFlags-parameter) VUID-VkDependencyInfo-dependencyFlags-parameter

 `dependencyFlags` **must** be a valid combination of [VkDependencyFlagBits](VkDependencyFlagBits.html) values

* 
[](#VUID-VkDependencyInfo-pMemoryBarriers-parameter) VUID-VkDependencyInfo-pMemoryBarriers-parameter

 If `memoryBarrierCount` is not `0`, `pMemoryBarriers` **must** be a valid pointer to an array of `memoryBarrierCount` valid [VkMemoryBarrier2](VkMemoryBarrier2.html) structures

* 
[](#VUID-VkDependencyInfo-pBufferMemoryBarriers-parameter) VUID-VkDependencyInfo-pBufferMemoryBarriers-parameter

 If `bufferMemoryBarrierCount` is not `0`, `pBufferMemoryBarriers` **must** be a valid pointer to an array of `bufferMemoryBarrierCount` valid [VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html) structures

* 
[](#VUID-VkDependencyInfo-pImageMemoryBarriers-parameter) VUID-VkDependencyInfo-pImageMemoryBarriers-parameter

 If `imageMemoryBarrierCount` is not `0`, `pImageMemoryBarriers` **must** be a valid pointer to an array of `imageMemoryBarrierCount` valid [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html) structures

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html), [VkDependencyFlags](VkDependencyFlags.html), [VkImageMemoryBarrier2](VkImageMemoryBarrier2.html), [VkMemoryBarrier2](VkMemoryBarrier2.html), [VkStructureType](VkStructureType.html), [vkCmdPipelineBarrier2](vkCmdPipelineBarrier2.html), [vkCmdPipelineBarrier2](vkCmdPipelineBarrier2.html), [vkCmdSetEvent2](vkCmdSetEvent2.html), [vkCmdSetEvent2](vkCmdSetEvent2.html), [vkCmdWaitEvents2](vkCmdWaitEvents2.html), [vkCmdWaitEvents2](vkCmdWaitEvents2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkDependencyInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
