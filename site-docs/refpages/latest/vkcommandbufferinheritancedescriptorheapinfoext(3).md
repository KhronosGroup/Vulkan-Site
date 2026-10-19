# VkCommandBufferInheritanceDescriptorHeapInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferInheritanceDescriptorHeapInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferInheritanceDescriptorHeapInfoEXT - Structure specifying command buffer inheritance information

If the `pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes a
`VkCommandBufferInheritanceDescriptorHeapInfoEXT` structure, then that
structure indicates that the secondary will use the same descriptor heaps as
the primary command buffer.

The `VkCommandBufferInheritanceDescriptorHeapInfoEXT` structure is
defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkCommandBufferInheritanceDescriptorHeapInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    const VkBindHeapInfoEXT*    pSamplerHeapBindInfo;
    const VkBindHeapInfoEXT*    pResourceHeapBindInfo;
} VkCommandBufferInheritanceDescriptorHeapInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pSamplerHeapBindInfo` specifies the [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) of the
sampler heap bound using [vkCmdBindSamplerHeapEXT](vkCmdBindSamplerHeapEXT.html) in the primary.
If this is `NULL`, it indicates that no sampler heap is bound.

* 
`pResourceHeapBindInfo` specifies the [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) of the
resource heap bound using [vkCmdBindResourceHeapEXT](vkCmdBindResourceHeapEXT.html) in the primary.
If this is `NULL`, it indicates that no resource heap is bound.

If this structure is not present, the behavior is as if
`pSamplerHeapBindInfo` and `pResourceHeapBindInfo` were both `NULL`.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11200) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11200

If the [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature is not
enabled, `pSamplerHeapBindInfo` **must** be `NULL`

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11201) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-descriptorHeap-11201

If the [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature is not
enabled, `pResourceHeapBindInfo` **must** be `NULL`

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-11470) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-11470

If `pSamplerHeapBindInfo` is not `NULL`,
`pSamplerHeapBindInfo->heapRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-11471) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-11471

If `pResourceHeapBindInfo` is not `NULL`,
`pResourceHeapBindInfo->heapRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-sType-sType) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_DESCRIPTOR_HEAP_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-parameter) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pSamplerHeapBindInfo-parameter

 If `pSamplerHeapBindInfo` is not `NULL`, `pSamplerHeapBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) structure

* 
[](#VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-parameter) VUID-VkCommandBufferInheritanceDescriptorHeapInfoEXT-pResourceHeapBindInfo-parameter

 If `pResourceHeapBindInfo` is not `NULL`, `pResourceHeapBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
