# vkQueueBindSparse(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueBindSparse.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueBindSparse - Bind device memory to a sparse resource object

To submit sparse binding operations to a queue, call:

// Provided by VK_VERSION_1_0
VkResult vkQueueBindSparse(
    VkQueue                                     queue,
    uint32_t                                    bindInfoCount,
    const VkBindSparseInfo*                     pBindInfo,
    VkFence                                     fence);

* 
`queue` is the queue that the sparse binding operations will be
submitted to.

* 
`bindInfoCount` is the number of elements in the `pBindInfo`
array.

* 
`pBindInfo` is a pointer to an array of [VkBindSparseInfo](VkBindSparseInfo.html)
structures, each specifying a sparse binding submission batch.

* 
`fence` is an **optional** handle to a fence to be signaled.
If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it defines a
[fence signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-signaling).

`vkQueueBindSparse` is a [queue submission command](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission), with each batch defined by an element of `pBindInfo` as a
[VkBindSparseInfo](VkBindSparseInfo.html) structure.
Batches begin execution in the order they appear in `pBindInfo`, but
**may** complete out of order.

Within a batch, a given range of a resource **must** not be bound more than
once.
Across batches, if a range is to be bound to one allocation and offset and
then to another allocation and offset, then the application **must** guarantee
(usually using semaphores) that the binding operations are executed in the
correct order, as well as to order binding operations against the execution
of command buffer submissions.

As no operation to [vkQueueBindSparse](#) causes any pipeline stage to
access memory, synchronization primitives used in this command effectively
only define execution dependencies.

Additional information about fence and semaphore operation is described in
[the synchronization chapter](../../../../spec/latest/chapters/synchronization.html#synchronization).

Valid Usage

* 
[](#VUID-vkQueueBindSparse-fence-01113) VUID-vkQueueBindSparse-fence-01113

If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** be
unsignaled

* 
[](#VUID-vkQueueBindSparse-fence-01114) VUID-vkQueueBindSparse-fence-01114

If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-vkQueueBindSparse-pSignalSemaphores-01115) VUID-vkQueueBindSparse-pSignalSemaphores-01115

Each element of the `pSignalSemaphores` member of each element of
`pBindInfo` **must** be unsignaled when the semaphore signal operation
it defines is executed on the device

* 
[](#VUID-vkQueueBindSparse-pWaitSemaphores-01116) VUID-vkQueueBindSparse-pWaitSemaphores-01116

When a semaphore wait operation referring to a binary semaphore defined
by any element of the `pWaitSemaphores` member of any element of
`pBindInfo` executes on `queue`, there **must** be no other queues
waiting on the same semaphore

* 
[](#VUID-vkQueueBindSparse-pWaitSemaphores-03245) VUID-vkQueueBindSparse-pWaitSemaphores-03245

All elements of the `pWaitSemaphores` member of all elements of
`pBindInfo` referring to a semaphore
created with a [VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html)
**must** reference a semaphore signal operation that has been submitted for
execution and any [semaphore    signal operations](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) on which it depends **must** have also been submitted
for execution

Valid Usage (Implicit)

* 
[](#VUID-vkQueueBindSparse-queue-parameter) VUID-vkQueueBindSparse-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkQueueBindSparse-pBindInfo-parameter) VUID-vkQueueBindSparse-pBindInfo-parameter

 If `bindInfoCount` is not `0`, `pBindInfo` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindSparseInfo](VkBindSparseInfo.html) structures

* 
[](#VUID-vkQueueBindSparse-fence-parameter) VUID-vkQueueBindSparse-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-vkQueueBindSparse-queuetype) VUID-vkQueueBindSparse-queuetype

 The `queue` **must** support [VK_QUEUE_SPARSE_BINDING_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkQueueBindSparse-commonparent) VUID-vkQueueBindSparse-commonparent

 Both of `fence`, and `queue` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html)

* 
Host access to `fence` **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | VK_QUEUE_SPARSE_BINDING_BIT | - |

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBindSparseInfo](VkBindSparseInfo.html), [VkFence](VkFence.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#vkQueueBindSparse).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
