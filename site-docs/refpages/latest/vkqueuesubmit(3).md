# vkQueueSubmit(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkQueueSubmit.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkQueueSubmit - Submits a sequence of semaphores or command buffers to a queue

To submit command buffers to a queue, call:

|  | This functionality is superseded by [vkQueueSubmit2](../../../../spec/latest/chapters/cmdbuffers.html#vkQueueSubmit2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkQueueSubmit(
    VkQueue                                     queue,
    uint32_t                                    submitCount,
    const VkSubmitInfo*                         pSubmits,
    VkFence                                     fence);

* 
`queue` is the queue that the command buffers will be submitted to.

* 
`submitCount` is the number of elements in the `pSubmits` array.

* 
`pSubmits` is a pointer to an array of [VkSubmitInfo](VkSubmitInfo.html)
structures, each specifying a command buffer submission batch.
Command buffers and semaphores specified in this array **may** be accessed
at any point until the [queue operations](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission)
they define complete execution on the device.

* 
`fence` is an **optional** handle to a fence to be signaled once all
submitted command buffers have completed execution.
If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it defines a
[fence signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-fences-signaling).
If it is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **may** be accessed at any
point until this command completes on the device.

`vkQueueSubmit` is a [queue submission command](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission), with each batch defined by an element of `pSubmits`.
Batches begin execution in the order they appear in `pSubmits`, but **may**
complete out of order.

The order that batches appear in `pSubmits` is used to determine
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order), and thus all the
[implicit ordering guarantees](../../../../spec/latest/chapters/synchronization.html#synchronization-implicit) that respect it.
Other than these implicit ordering guarantees and any [explicit synchronization primitives](../../../../spec/latest/chapters/synchronization.html#synchronization), these batches **may** overlap or
otherwise execute out of order.

Fence operations submitted with [vkQueueSubmit](#) have additional ordering
constraints compared to other submission commands, with dependencies
involving previous and subsequent queue operations.
Information about these additional constraints can be found in the
[fence](../../../../spec/latest/chapters/synchronization.html#synchronization-fences) sections of [the synchronization chapter](../../../../spec/latest/chapters/synchronization.html#synchronization).

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) of
each [semaphore signal operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling)
defined by this command includes every command in the same batch that the
signal operation is defined in, and all commands that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-waiting) defined
by this command includes every command in the same batch that the wait
operation is defined in, and all commands that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
The scope is limited by the `pWaitDstStageMask` for each batch, as
described in [VkSubmitInfo](VkSubmitInfo.html).

If any command buffer submitted to this queue is in the
[executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle), it is moved to the
[pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).
Once execution of all submissions of a command buffer complete, it moves
from the [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle), back to the
[executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).
If a command buffer was recorded with the
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](VkCommandBufferUsageFlagBits.html) flag, it instead moves to
the [invalid state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

If `vkQueueSubmit` fails, it **may** return
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html) or [VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html).
If it does, the implementation **must** ensure that the state and contents of
any resources or synchronization primitives referenced by the submitted
command buffers and any semaphores referenced by `pSubmits` is
unaffected by the call or its failure.
If `vkQueueSubmit` fails in such a way that the implementation is unable
to make that guarantee, the implementation **must** return
[VK_ERROR_DEVICE_LOST](VkResult.html).
See [Lost Device](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-lost-device).

Valid Usage

* 
[](#VUID-vkQueueSubmit-fence-00063) VUID-vkQueueSubmit-fence-00063

If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** be
unsignaled

* 
[](#VUID-vkQueueSubmit-fence-00064) VUID-vkQueueSubmit-fence-00064

If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00065) VUID-vkQueueSubmit-pCommandBuffers-00065

Any calls to [vkCmdSetEvent](vkCmdSetEvent.html), [vkCmdResetEvent](vkCmdResetEvent.html) or
[vkCmdWaitEvents](vkCmdWaitEvents.html) that have been recorded into any of the command
buffer elements of the `pCommandBuffers` member of any element of
`pSubmits`, **must** not reference any [VkEvent](VkEvent.html) that is referenced
by any of those commands in a command buffer that has been submitted to
another queue and is still in the *pending state*

* 
[](#VUID-vkQueueSubmit-pWaitDstStageMask-00066) VUID-vkQueueSubmit-pWaitDstStageMask-00066

Any stage flag included in any element of the `pWaitDstStageMask`
member of any element of `pSubmits` **must** be a pipeline stage
supported by one of the capabilities of `queue`, as specified in the
[table of supported pipeline    stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkQueueSubmit-pSignalSemaphores-00067) VUID-vkQueueSubmit-pSignalSemaphores-00067

Each binary semaphore element of the `pSignalSemaphores` member of
any element of `pSubmits` **must** be unsignaled when the semaphore
signal operation it defines is executed on the device

* 
[](#VUID-vkQueueSubmit-pWaitSemaphores-00068) VUID-vkQueueSubmit-pWaitSemaphores-00068

When a semaphore wait operation referring to a binary semaphore defined
by any element of the `pWaitSemaphores` member of any element of
`pSubmits` executes on `queue`, there **must** be no other queues
waiting on the same semaphore

* 
[](#VUID-vkQueueSubmit-pWaitSemaphores-03238) VUID-vkQueueSubmit-pWaitSemaphores-03238

All elements of the `pWaitSemaphores` member of all elements of
`pSubmits`
created with a [VkSemaphoreType](VkSemaphoreType.html) of [VK_SEMAPHORE_TYPE_BINARY](VkSemaphoreType.html)
**must** reference a semaphore signal operation that has been submitted for
execution and any [semaphore    signal operations](../../../../spec/latest/chapters/synchronization.html#synchronization-semaphores-signaling) on which it depends **must** have also been submitted
for execution

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00070) VUID-vkQueueSubmit-pCommandBuffers-00070

Each element of the `pCommandBuffers` member of each element of
`pSubmits` **must** be in the [pending or    executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00071) VUID-vkQueueSubmit-pCommandBuffers-00071

If any element of the `pCommandBuffers` member of any element of
`pSubmits` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html), it **must** not be in
the [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00072) VUID-vkQueueSubmit-pCommandBuffers-00072

Any [secondary command buffers recorded](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-secondary)
into any element of the `pCommandBuffers` member of any element of
`pSubmits` **must** be in the [pending or    executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00073) VUID-vkQueueSubmit-pCommandBuffers-00073

If any [secondary command buffers recorded](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-secondary)
into any element of the `pCommandBuffers` member of any element of
`pSubmits` was not recorded with the
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html), it **must** not be in
the [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-00074) VUID-vkQueueSubmit-pCommandBuffers-00074

Each element of the `pCommandBuffers` member of each element of
`pSubmits` **must** have been allocated from a `VkCommandPool` that
was created for the same queue family `queue` belongs to

* 
[](#VUID-vkQueueSubmit-pSubmits-02207) VUID-vkQueueSubmit-pSubmits-02207

If any element of `pSubmits->pCommandBuffers` includes a
[Queue Family Ownership    Transfer Acquire Operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire), there **must** exist a previously submitted
[Queue Family Ownership    Transfer Release Operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release) on a queue in the queue family identified
by the acquire operation, with parameters matching the acquire operation
as defined in the definition of such
[acquire operations](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire), and
which happens-before the acquire operation

* 
[](#VUID-vkQueueSubmit-pSubmits-10911) VUID-vkQueueSubmit-pSubmits-10911

If any element of `pSubmits->pCommandBuffers` includes a
[Queue Family Ownership    Transfer Acquire Operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire), the affected resource **must** not be
modified in any way between the last matching release operation and the
acquire operation

* 
[](#VUID-vkQueueSubmit-pCommandBuffers-03220) VUID-vkQueueSubmit-pCommandBuffers-03220

If a command recorded into any element of `pCommandBuffers` was a
[vkCmdBeginQuery](vkCmdBeginQuery.html) whose `queryPool` was created with a
`queryType` of [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), the
[profiling lock](../../../../spec/latest/chapters/queries.html#profiling-lock) **must** have been held continuously on
the `VkDevice` that `queue` was retrieved from, throughout
recording of those command buffers

* 
[](#VUID-vkQueueSubmit-pSubmits-02808) VUID-vkQueueSubmit-pSubmits-02808

Any resource created with [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html) that is read
by an operation specified by `pSubmits` **must** not be owned by any
queue family other than the one which `queue` belongs to, at the
time it is executed

* 
[](#VUID-vkQueueSubmit-pSubmits-04626) VUID-vkQueueSubmit-pSubmits-04626

Any resource created with [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html) that is
accessed by an operation specified by `pSubmits` **must** have included
the queue family of `queue` at resource creation time

* 
[](#VUID-vkQueueSubmit-queue-06448) VUID-vkQueueSubmit-queue-06448

If `queue` was not created with
[VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](VkDeviceQueueCreateFlagBits.html), there **must** be no element of
`pSubmits` that includes a [VkProtectedSubmitInfo](VkProtectedSubmitInfo.html) structure in
its `pNext` chain with `protectedSubmit` equal to [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-vkQueueSubmit-queue-parameter) VUID-vkQueueSubmit-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkQueueSubmit-pSubmits-parameter) VUID-vkQueueSubmit-pSubmits-parameter

 If `submitCount` is not `0`, `pSubmits` **must** be a valid pointer to an array of `submitCount` valid [VkSubmitInfo](VkSubmitInfo.html) structures

* 
[](#VUID-vkQueueSubmit-fence-parameter) VUID-vkQueueSubmit-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `fence` **must** be a valid [VkFence](VkFence.html) handle

* 
[](#VUID-vkQueueSubmit-commonparent) VUID-vkQueueSubmit-commonparent

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
| - | - | - | Any | - |

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkFence](VkFence.html), [VkQueue](VkQueue.html), [VkSubmitInfo](VkSubmitInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkQueueSubmit).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
