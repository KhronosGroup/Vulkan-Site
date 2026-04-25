# vkCmdSetEvent2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetEvent2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetEvent2 - Set an event object to signaled state

To signal an event from a device, call:

// Provided by VK_VERSION_1_3
void vkCmdSetEvent2(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    const VkDependencyInfo*                     pDependencyInfo);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdSetEvent2
void vkCmdSetEvent2KHR(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    const VkDependencyInfo*                     pDependencyInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be signaled.

* 
`pDependencyInfo` is a pointer to a [VkDependencyInfo](VkDependencyInfo.html) structure
defining the first scopes of this operation.

When [vkCmdSetEvent2](#) is submitted to a queue, it defines the first half
of memory dependencies defined by `pDependencyInfo`, as well as an event
signal operation which sets the event to the signaled state.
A memory dependency is defined between the event signal operation and
commands that occur earlier in submission order.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) and
[access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) are defined by
the union of all the memory dependencies defined by `pDependencyInfo`,
and are applied to all operations that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
[Queue family ownership transfers](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) and
[image layout transitions](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions)
defined by `pDependencyInfo` are also included in the first scopes.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes only the event signal operation, and any
[queue family ownership transfers](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) and
[image layout transitions](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions)
defined by `pDependencyInfo`.

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes)
includes only [queue family ownership transfers](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) and [image layout transitions](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions).

If [VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html) is not set in
`pDependencyInfo->dependencyFlags`, future
[vkCmdWaitEvents2](vkCmdWaitEvents2.html) commands rely on all values of each element in
`pDependencyInfo` matching exactly with those used to signal the
corresponding event.
If [VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html) is set, `vkCmdSetEvent2`
**must** only include the [source stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks) of the first synchronization scope in
`pDependencyInfo->pMemoryBarriers`[0].`srcStageMask`.
[vkCmdWaitEvents](vkCmdWaitEvents.html) **must** not be used to wait on the result of a signal
operation defined by `vkCmdSetEvent2`.

|  | The extra information provided by [vkCmdSetEvent2](#) compared to
| --- | --- |
[vkCmdSetEvent](vkCmdSetEvent.html) allows implementations to more efficiently schedule the
operations required to satisfy the requested dependencies.
With [vkCmdSetEvent](vkCmdSetEvent.html), the full dependency information is not known until
[vkCmdWaitEvents](vkCmdWaitEvents.html) is recorded, forcing implementations to insert the
required operations at that point and not before. |

If `event` is already in the signaled state when [vkCmdSetEvent2](#) is
executed on the device, then [vkCmdSetEvent2](#) has no effect, no event
signal operation occurs, and no dependency is generated.

Valid Usage

* 
[](#VUID-vkCmdSetEvent2-synchronization2-03824) VUID-vkCmdSetEvent2-synchronization2-03824

The [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-03825) VUID-vkCmdSetEvent2-dependencyFlags-03825

    The `dependencyFlags` member of `pDependencyInfo` **must** be `0`
or [VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdSetEvent2-srcStageMask-09391) VUID-vkCmdSetEvent2-srcStageMask-09391

The `srcStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** not
include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdSetEvent2-dstStageMask-09392) VUID-vkCmdSetEvent2-dstStageMask-09392

The `dstStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** not
include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-03826) VUID-vkCmdSetEvent2-commandBuffer-03826

The current device mask of `commandBuffer` **must** include exactly one
physical device

* 
[](#VUID-vkCmdSetEvent2-srcStageMask-03827) VUID-vkCmdSetEvent2-srcStageMask-03827

The `srcStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdSetEvent2-dstStageMask-03828) VUID-vkCmdSetEvent2-dstStageMask-03828

The `dstStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfo` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-10785) VUID-vkCmdSetEvent2-dependencyFlags-10785

If the `dependencyFlags` member of `pDependencyInfo` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html), the
`bufferMemoryBarrierCount` and `imageMemoryBarrierCount` members
of `pDependencyInfo` **must** be `0`

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-10786) VUID-vkCmdSetEvent2-dependencyFlags-10786

If the `dependencyFlags` member of `pDependencyInfo` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html), the
`memoryBarrierCount` member of `pDependencyInfo` **must** be `1`

* 
[](#VUID-vkCmdSetEvent2-dependencyFlags-10787) VUID-vkCmdSetEvent2-dependencyFlags-10787

If the `dependencyFlags` member of `pDependencyInfo` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html), the `srcAccessMask`,
`dstStageMask`, and `dstAccessMask` members of
`pDependencyInfo->pMemoryBarriers`[0] **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-parameter) VUID-vkCmdSetEvent2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetEvent2-event-parameter) VUID-vkCmdSetEvent2-event-parameter

 `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkCmdSetEvent2-pDependencyInfo-parameter) VUID-vkCmdSetEvent2-pDependencyInfo-parameter

 `pDependencyInfo` **must** be a valid pointer to a valid [VkDependencyInfo](VkDependencyInfo.html) structure

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-recording) VUID-vkCmdSetEvent2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetEvent2-commandBuffer-cmdpool) VUID-vkCmdSetEvent2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetEvent2-renderpass) VUID-vkCmdSetEvent2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdSetEvent2-suspended) VUID-vkCmdSetEvent2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetEvent2-commonparent) VUID-vkCmdSetEvent2-commonparent

 Both of `commandBuffer`, and `event` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdSetEvent2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDependencyInfo](VkDependencyInfo.html), [VkEvent](VkEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdSetEvent2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
