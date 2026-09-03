# VkMemoryBarrier(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryBarrier.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryBarrier - Structure specifying a global memory barrier

The `VkMemoryBarrier` structure is defined as:

|  | This functionality is superseded by [VkMemoryBarrier2](../../../../spec/latest/chapters/synchronization.html#VkMemoryBarrier2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkMemoryBarrier {
    VkStructureType    sType;
    const void*        pNext;
    VkAccessFlags      srcAccessMask;
    VkAccessFlags      dstAccessMask;
} VkMemoryBarrier;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[source access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[destination access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to access types in the [source access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks) specified by
`srcAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html) is passed
in `pNext`, `srcAccessMask3`.

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to access types in the [destination access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks) specified by
`dstAccessMask` and, if a [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html) is passed
in `pNext`, `dstAccessMask3`.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryBarrier-sType-sType) VUID-VkMemoryBarrier-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_BARRIER](VkStructureType.html)

* 
[](#VUID-VkMemoryBarrier-pNext-pNext) VUID-VkMemoryBarrier-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryBarrier-srcAccessMask-parameter) VUID-VkMemoryBarrier-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits](VkAccessFlagBits.html) values

* 
[](#VUID-VkMemoryBarrier-dstAccessMask-parameter) VUID-VkMemoryBarrier-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits](VkAccessFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccessFlags](VkAccessFlags.html), [VkStructureType](VkStructureType.html), [vkCmdPipelineBarrier](vkCmdPipelineBarrier.html), [vkCmdWaitEvents](vkCmdWaitEvents.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkMemoryBarrier).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
