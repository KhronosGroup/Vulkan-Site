# VkBindSparseInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindSparseInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindSparseInfo - Structure specifying a sparse binding operation

The `VkBindSparseInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBindSparseInfo {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    waitSemaphoreCount;
    const VkSemaphore*                          pWaitSemaphores;
    uint32_t                                    bufferBindCount;
    const VkSparseBufferMemoryBindInfo*         pBufferBinds;
    uint32_t                                    imageOpaqueBindCount;
    const VkSparseImageOpaqueMemoryBindInfo*    pImageOpaqueBinds;
    uint32_t                                    imageBindCount;
    const VkSparseImageMemoryBindInfo*          pImageBinds;
    uint32_t                                    signalSemaphoreCount;
    const VkSemaphore*                          pSignalSemaphores;
} VkBindSparseInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreCount` is the number of semaphores upon which to wait
before executing the sparse binding operations for the batch.

* 
`pWaitSemaphores` is a pointer to an array of semaphores upon which
to wait on before the sparse binding operations for this batch begin
execution.
If semaphores to wait on are provided, they define a
[semaphore wait operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting).

* 
`bufferBindCount` is the number of sparse buffer bindings to perform
in the batch.

* 
`pBufferBinds` is a pointer to an array of
[VkSparseBufferMemoryBindInfo](VkSparseBufferMemoryBindInfo.html) structures.

* 
`imageOpaqueBindCount` is the number of opaque sparse image bindings
to perform.

* 
`pImageOpaqueBinds` is a pointer to an array of
[VkSparseImageOpaqueMemoryBindInfo](VkSparseImageOpaqueMemoryBindInfo.html) structures, indicating opaque
sparse image bindings to perform.

* 
`imageBindCount` is the number of sparse image bindings to perform.

* 
`pImageBinds` is a pointer to an array of
[VkSparseImageMemoryBindInfo](VkSparseImageMemoryBindInfo.html) structures, indicating sparse image
bindings to perform.

* 
`signalSemaphoreCount` is the number of semaphores to be signaled
once the sparse binding operations specified by the structure have
completed execution.

* 
`pSignalSemaphores` is a pointer to an array of semaphores which
will be signaled when the sparse binding operations for this batch have
completed execution.
If semaphores to be signaled are provided, they define a
[semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling).

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) of
each [semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling)
defined by this structure includes all sparse binding operations defined by
this structure.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting) defined
by this structure includes all sparse binding operations defined by this
structure.

Valid Usage

* 
[](#VUID-VkBindSparseInfo-pWaitSemaphores-03246) VUID-VkBindSparseInfo-pWaitSemaphores-03246

If any element of `pWaitSemaphores` or `pSignalSemaphores` was
created with a [VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html)
then the `pNext` chain **must** include a
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html) structure

* 
[](#VUID-VkBindSparseInfo-pNext-03247) VUID-VkBindSparseInfo-pNext-03247

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html) structure and any element of
`pWaitSemaphores` was created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) then its `waitSemaphoreValueCount`
member **must** equal `waitSemaphoreCount`

* 
[](#VUID-VkBindSparseInfo-pNext-03248) VUID-VkBindSparseInfo-pNext-03248

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html) structure and any element of
`pSignalSemaphores` was created with a [VkSemaphoreType](VkSemaphoreType.html) of
[VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) then its
`signalSemaphoreValueCount` member **must** equal
`signalSemaphoreCount`

* 
[](#VUID-VkBindSparseInfo-pSignalSemaphores-03249) VUID-VkBindSparseInfo-pSignalSemaphores-03249

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)::`pSignalSemaphoreValues` **must**
have a value greater than the current value of the semaphore when the
[semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) is
executed

* 
[](#VUID-VkBindSparseInfo-pWaitSemaphores-03250) VUID-VkBindSparseInfo-pWaitSemaphores-03250

For each element of `pWaitSemaphores` created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)::`pWaitSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or from the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkBindSparseInfo-pSignalSemaphores-03251) VUID-VkBindSparseInfo-pSignalSemaphores-03251

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_TIMELINE](VkSemaphoreType.html) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)::`pSignalSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or from the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkBindSparseInfo-pNext-09753) VUID-VkBindSparseInfo-pNext-09753

If the `pNext` chain of this structure includes a
[VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html) structure then it **must** also include a
[VkFrameBoundaryEXT](VkFrameBoundaryEXT.html) structure

Valid Usage (Implicit)

* 
[](#VUID-VkBindSparseInfo-sType-sType) VUID-VkBindSparseInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_SPARSE_INFO](VkStructureType.html)

* 
[](#VUID-VkBindSparseInfo-pNext-pNext) VUID-VkBindSparseInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupBindSparseInfo](VkDeviceGroupBindSparseInfo.html), [VkFrameBoundaryEXT](VkFrameBoundaryEXT.html), [VkFrameBoundaryTensorsARM](VkFrameBoundaryTensorsARM.html), or [VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)

* 
[](#VUID-VkBindSparseInfo-sType-unique) VUID-VkBindSparseInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindSparseInfo-pWaitSemaphores-parameter) VUID-VkBindSparseInfo-pWaitSemaphores-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitSemaphores` **must** be a valid pointer to an array of `waitSemaphoreCount` valid [VkSemaphore](VkSemaphore.html) handles

* 
[](#VUID-VkBindSparseInfo-pBufferBinds-parameter) VUID-VkBindSparseInfo-pBufferBinds-parameter

 If `bufferBindCount` is not `0`, `pBufferBinds` **must** be a valid pointer to an array of `bufferBindCount` valid [VkSparseBufferMemoryBindInfo](VkSparseBufferMemoryBindInfo.html) structures

* 
[](#VUID-VkBindSparseInfo-pImageOpaqueBinds-parameter) VUID-VkBindSparseInfo-pImageOpaqueBinds-parameter

 If `imageOpaqueBindCount` is not `0`, `pImageOpaqueBinds` **must** be a valid pointer to an array of `imageOpaqueBindCount` valid [VkSparseImageOpaqueMemoryBindInfo](VkSparseImageOpaqueMemoryBindInfo.html) structures

* 
[](#VUID-VkBindSparseInfo-pImageBinds-parameter) VUID-VkBindSparseInfo-pImageBinds-parameter

 If `imageBindCount` is not `0`, `pImageBinds` **must** be a valid pointer to an array of `imageBindCount` valid [VkSparseImageMemoryBindInfo](VkSparseImageMemoryBindInfo.html) structures

* 
[](#VUID-VkBindSparseInfo-pSignalSemaphores-parameter) VUID-VkBindSparseInfo-pSignalSemaphores-parameter

 If `signalSemaphoreCount` is not `0`, `pSignalSemaphores` **must** be a valid pointer to an array of `signalSemaphoreCount` valid [VkSemaphore](VkSemaphore.html) handles

* 
[](#VUID-VkBindSparseInfo-commonparent) VUID-VkBindSparseInfo-commonparent

 Both of the elements of `pSignalSemaphores`, and the elements of `pWaitSemaphores` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSemaphore](VkSemaphore.html), [VkSparseBufferMemoryBindInfo](VkSparseBufferMemoryBindInfo.html), [VkSparseImageMemoryBindInfo](VkSparseImageMemoryBindInfo.html), [VkSparseImageOpaqueMemoryBindInfo](VkSparseImageOpaqueMemoryBindInfo.html), [VkStructureType](VkStructureType.html), [vkQueueBindSparse](vkQueueBindSparse.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkBindSparseInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
