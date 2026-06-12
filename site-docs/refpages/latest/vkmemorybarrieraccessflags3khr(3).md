# VkMemoryBarrierAccessFlags3KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryBarrierAccessFlags3KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryBarrierAccessFlags3KHR - Structure specifying additional access flags

The `VkMemoryBarrierAccessFlags3KHR` structure is defined as:

// Provided by VK_KHR_maintenance8
typedef struct VkMemoryBarrierAccessFlags3KHR {
    VkStructureType      sType;
    const void*          pNext;
    VkAccessFlags3KHR    srcAccessMask3;
    VkAccessFlags3KHR    dstAccessMask3;
} VkMemoryBarrierAccessFlags3KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask3` is a [VkAccessFlags3KHR](VkAccessFlags3KHR.html) mask of access flags
to be included in the [    first access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes).

* 
`dstAccessMask3` is a [VkAccessFlags3KHR](VkAccessFlags3KHR.html) mask of access flags
to be included in the [    second access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryBarrierAccessFlags3KHR-sType-sType) VUID-VkMemoryBarrierAccessFlags3KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_BARRIER_ACCESS_FLAGS_3_KHR](VkStructureType.html)

* 
[](#VUID-VkMemoryBarrierAccessFlags3KHR-srcAccessMask3-parameter) VUID-VkMemoryBarrierAccessFlags3KHR-srcAccessMask3-parameter

 `srcAccessMask3` **must** be a valid combination of [VkAccessFlagBits3KHR](VkAccessFlagBits3KHR.html) values

* 
[](#VUID-VkMemoryBarrierAccessFlags3KHR-dstAccessMask3-parameter) VUID-VkMemoryBarrierAccessFlags3KHR-dstAccessMask3-parameter

 `dstAccessMask3` **must** be a valid combination of [VkAccessFlagBits3KHR](VkAccessFlagBits3KHR.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html)

* 
[VkImageMemoryBarrier2](VkImageMemoryBarrier2.html)

* 
[VkMemoryRangeBarriersInfoKHR](VkMemoryRangeBarriersInfoKHR.html)

* 
[VkSubpassDependency2](VkSubpassDependency2.html)

[VK_KHR_maintenance8](VK_KHR_maintenance8.html), [VkAccessFlags3KHR](VkAccessFlags3KHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkMemoryBarrierAccessFlags3KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
