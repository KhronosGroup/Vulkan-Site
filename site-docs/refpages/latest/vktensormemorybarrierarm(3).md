# VkTensorMemoryBarrierARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorMemoryBarrierARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorMemoryBarrierARM - Structure specifying a tensor memory barrier

The `VkTensorMemoryBarrierARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorMemoryBarrierARM {
    VkStructureType          sType;
    const void*              pNext;
    VkPipelineStageFlags2    srcStageMask;
    VkAccessFlags2           srcAccessMask;
    VkPipelineStageFlags2    dstStageMask;
    VkAccessFlags2           dstAccessMask;
    uint32_t                 srcQueueFamilyIndex;
    uint32_t                 dstQueueFamilyIndex;
    VkTensorARM              tensor;
} VkTensorMemoryBarrierARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcStageMask` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline
stages to be included in the [    first synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes).

* 
`srcAccessMask` is a [VkAccessFlags2](VkAccessFlags2.html) mask of access flags to be
included in the [first    access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes).

* 
`dstStageMask` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline
stages to be included in the [    second synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes).

* 
`dstAccessMask` is a [VkAccessFlags2](VkAccessFlags2.html) mask of access flags to be
included in the [second    access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes).

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`tensor` is a handle to the tensor whose backing memory is affected
by the barrier.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) and
[access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by
`srcStageMask` and `srcAccessMask`.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
`dstStageMask` and `dstAccessMask`.

Both [access scopes](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) are
limited to only memory accesses to `tensor`.

If `tensor` was created with [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and
`srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, this
memory barrier defines a [queue family transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).
When executed on a queue in the family identified by
`srcQueueFamilyIndex`, this barrier defines a
[queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release)
for the specified tensor, and the second synchronization and access scopes
do not synchronize operations on that queue.
When executed on a queue in the family identified by
`dstQueueFamilyIndex`, this barrier defines a
[queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire)
for the specified tensor, and the first synchronization and access scopes do
not synchronize operations on that queue.

A [queue family transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) is
also defined if the values are not equal, and either is one of the special
queue family values reserved for external memory ownership transfers, as
described in [Queue Family Ownership Transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).
A [queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release) is defined when `dstQueueFamilyIndex` is one of those
values, and a [queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire) is defined when `srcQueueFamilyIndex` is one of
those values.

Valid Usage

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09755) VUID-VkTensorMemoryBarrierARM-tensor-09755

If `tensor` was created with a sharing mode of
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** both be [VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09756) VUID-VkTensorMemoryBarrierARM-tensor-09756

If `tensor` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** both be either
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html), or a valid queue family (see
[Queue Family Properties](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-queueprops))

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09757) VUID-VkTensorMemoryBarrierARM-tensor-09757

If `tensor` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not [VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html), at
least one of them **must** be the same as the family of the queue that will
execute this barrier

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-09758) VUID-VkTensorMemoryBarrierARM-tensor-09758

If `tensor` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](VkDeviceMemory.html) object

Valid Usage (Implicit)

* 
[](#VUID-VkTensorMemoryBarrierARM-sType-sType) VUID-VkTensorMemoryBarrierARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_MEMORY_BARRIER_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorMemoryBarrierARM-srcStageMask-parameter) VUID-VkTensorMemoryBarrierARM-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkTensorMemoryBarrierARM-srcAccessMask-parameter) VUID-VkTensorMemoryBarrierARM-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

* 
[](#VUID-VkTensorMemoryBarrierARM-dstStageMask-parameter) VUID-VkTensorMemoryBarrierARM-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkTensorMemoryBarrierARM-dstAccessMask-parameter) VUID-VkTensorMemoryBarrierARM-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

* 
[](#VUID-VkTensorMemoryBarrierARM-tensor-parameter) VUID-VkTensorMemoryBarrierARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDependencyInfo](VkDependencyInfo.html)

[VK_ARM_tensors](VK_ARM_tensors.html), [VkAccessFlags2](VkAccessFlags2.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html), [VkTensorDependencyInfoARM](VkTensorDependencyInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkTensorMemoryBarrierARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
