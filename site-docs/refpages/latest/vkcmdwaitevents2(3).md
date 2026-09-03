# vkCmdWaitEvents2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWaitEvents2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWaitEvents2 - Wait for one or more events

To wait for one or more events to enter the signaled state on a device,
call:

// Provided by VK_VERSION_1_3
void vkCmdWaitEvents2(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    eventCount,
    const VkEvent*                              pEvents,
    const VkDependencyInfo*                     pDependencyInfos);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdWaitEvents2
void vkCmdWaitEvents2KHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    eventCount,
    const VkEvent*                              pEvents,
    const VkDependencyInfo*                     pDependencyInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`eventCount` is the length of the `pEvents` array.

* 
`pEvents` is a pointer to an array of `eventCount` events to
wait on.

* 
`pDependencyInfos` is a pointer to an array of `eventCount`
[VkDependencyInfo](VkDependencyInfo.html) structures, defining the second
[synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes).

When `vkCmdWaitEvents2` is submitted to a queue, it inserts memory
dependencies according to the elements of `pDependencyInfos` and each
corresponding element of `pEvents`.
`vkCmdWaitEvents2` **must** not be used to wait on event signal operations
occurring on other queues, or signal operations executed by
[vkCmdSetEvent](vkCmdSetEvent.html).

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) and
[access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) of each memory
dependency defined by any element i of `pDependencyInfos` are
applied to operations that occurred earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) than the last event
signal operation on element i of `pEvents`.

Signal operations for an event at index i are only included if:

* 
The event was signaled by a [vkCmdSetEvent2](vkCmdSetEvent2.html) command that occurred
earlier in [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) with a
`dependencyInfo` parameter exactly equal to the element of
`pDependencyInfos` at index i ; or

* 
The event was created without [VK_EVENT_CREATE_DEVICE_ONLY_BIT](VkEventCreateFlagBits.html), and
the first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
defined by the element of `pDependencyInfos` at index i only
includes host operations ([VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) of each
memory dependency defined by any element i of `pDependencyInfos`
are applied to operations that occurred later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) than
`vkCmdWaitEvents2`.

|  | [vkCmdWaitEvents2](#) is used with [vkCmdSetEvent2](vkCmdSetEvent2.html) to define a memory
| --- | --- |
dependency between two sets of action commands, roughly in the same way as
pipeline barriers, but split into two commands such that work between the
two **may** execute unhindered. |

|  | Applications should be careful to avoid race conditions when using events.
| --- | --- |
There is no direct ordering guarantee between `vkCmdSetEvent2` and
[vkCmdResetEvent2](vkCmdResetEvent2.html), [vkCmdResetEvent](vkCmdResetEvent.html), or [vkCmdSetEvent](vkCmdSetEvent.html).
Another execution dependency (e.g. a pipeline barrier or semaphore with
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)) is needed to prevent such a race
condition. |

Valid Usage

* 
[](#VUID-vkCmdWaitEvents2-image-09373) VUID-vkCmdWaitEvents2-image-09373

If `vkCmdWaitEvents2` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-vkCmdWaitEvents2-image-09374) VUID-vkCmdWaitEvents2-image-09374

If `vkCmdWaitEvents2` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat`
value

* 
[](#VUID-vkCmdWaitEvents2-oldLayout-01181) VUID-vkCmdWaitEvents2-oldLayout-01181

If `vkCmdWaitEvents2` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents2-srcQueueFamilyIndex-01182) VUID-vkCmdWaitEvents2-srcQueueFamilyIndex-01182

If `vkCmdWaitEvents2` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents2-synchronization2-03836) VUID-vkCmdWaitEvents2-synchronization2-03836

The [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03837) VUID-vkCmdWaitEvents2-pEvents-03837

Members of `pEvents` **must** not have been signaled by
[vkCmdSetEvent](vkCmdSetEvent.html)

* 
[](#VUID-vkCmdWaitEvents2-pEvents-10788) VUID-vkCmdWaitEvents2-pEvents-10788

For each element i of `pEvents`,
if the `dependencyFlags` member of the ith element of
`pDependencyInfos` does not include
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html), and
if that event is signaled by [vkCmdSetEvent2](vkCmdSetEvent2.html), that command’s
`dependencyInfo` parameter **must** be exactly equal to the ith
element of `pDependencyInfos`

* 
[](#VUID-vkCmdWaitEvents2-pEvents-10789) VUID-vkCmdWaitEvents2-pEvents-10789

For each element i of `pEvents`, if the `dependencyFlags`
member of the ith element of `pDependencyInfos` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html), that event **must** be
signaled by [vkCmdSetEvent2](vkCmdSetEvent2.html) with
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents2-pEvents-10790) VUID-vkCmdWaitEvents2-pEvents-10790

For each element i of `pEvents`, if the `dependencyFlags`
member of the ith element of `pDependencyInfos` includes
[VK_DEPENDENCY_ASYMMETRIC_EVENT_BIT_KHR](VkDependencyFlagBits.html), the union of
`srcStageMask` members of all elements of `pMemoryBarriers`,
`pBufferMemoryBarriers`, and `pImageMemoryBarriers` of the
ith element of `pDependencyInfos` **must** equal
`pDependencyInfos->pMemoryBarriers`[0].`srcStageMask` in the
[vkCmdSetEvent2](vkCmdSetEvent2.html) command

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03839) VUID-vkCmdWaitEvents2-pEvents-03839

For each element i of `pEvents`, if that event is signaled by
[vkSetEvent](vkSetEvent.html), barriers in the ith element of
`pDependencyInfos` **must** include only host operations in their first
[synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03840) VUID-vkCmdWaitEvents2-pEvents-03840

For each element i of `pEvents`, if barriers in the
ith element of `pDependencyInfos` include only host
operations, the ith element of `pEvents` **must** be signaled
before [vkCmdWaitEvents2](#) is executed

* 
[](#VUID-vkCmdWaitEvents2-pEvents-03841) VUID-vkCmdWaitEvents2-pEvents-03841

For each element i of `pEvents`, if barriers in the
ith element of `pDependencyInfos` do not include host
operations, the ith element of `pEvents` **must** be signaled
by a corresponding [vkCmdSetEvent2](vkCmdSetEvent2.html) that occurred earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order)

* 
[](#VUID-vkCmdWaitEvents2-srcStageMask-03842) VUID-vkCmdWaitEvents2-srcStageMask-03842

The `srcStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfos` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdWaitEvents2-dstStageMask-03843) VUID-vkCmdWaitEvents2-dstStageMask-03843

The `dstStageMask` member of any element of the
`pMemoryBarriers`, `pBufferMemoryBarriers`, or
`pImageMemoryBarriers` members of `pDependencyInfos` **must** only
include pipeline stages valid for the queue family that was used to
create the command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdWaitEvents2-dependencyFlags-10394) VUID-vkCmdWaitEvents2-dependencyFlags-10394

The `dependencyFlags` member of any element of `pDependencyInfo`
**must** not include any of the following bits:

[VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html)

* 
[VK_DEPENDENCY_DEVICE_GROUP_BIT](VkDependencyFlagBits.html)

* 
[VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[VK_DEPENDENCY_FEEDBACK_LOOP_BIT_EXT](VkDependencyFlagBits.html)

[](#VUID-vkCmdWaitEvents2-maintenance8-10205) VUID-vkCmdWaitEvents2-maintenance8-10205

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is not
enabled, the `dependencyFlags` members of any element of
`pDependencyInfos` **must** not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html)

[](#VUID-vkCmdWaitEvents2-dependencyFlags-03844) VUID-vkCmdWaitEvents2-dependencyFlags-03844

If this command is called inside a render pass instance, the
`srcStageMask` member of any element of the `pMemoryBarriers`,
`pBufferMemoryBarriers`, or `pImageMemoryBarriers` members of
`pDependencyInfos` **must** not include
[VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

[](#VUID-vkCmdWaitEvents2-commandBuffer-03846) VUID-vkCmdWaitEvents2-commandBuffer-03846

`commandBuffer`’s current device mask **must** include exactly one
physical device

[](#VUID-vkCmdWaitEvents2-None-10654) VUID-vkCmdWaitEvents2-None-10654

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWaitEvents2-commandBuffer-parameter) VUID-vkCmdWaitEvents2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWaitEvents2-pEvents-parameter) VUID-vkCmdWaitEvents2-pEvents-parameter

 `pEvents` **must** be a valid pointer to an array of `eventCount` valid [VkEvent](VkEvent.html) handles

* 
[](#VUID-vkCmdWaitEvents2-pDependencyInfos-parameter) VUID-vkCmdWaitEvents2-pDependencyInfos-parameter

 `pDependencyInfos` **must** be a valid pointer to an array of `eventCount` valid [VkDependencyInfo](VkDependencyInfo.html) structures

* 
[](#VUID-vkCmdWaitEvents2-commandBuffer-recording) VUID-vkCmdWaitEvents2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWaitEvents2-commandBuffer-cmdpool) VUID-vkCmdWaitEvents2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWaitEvents2-suspended) VUID-vkCmdWaitEvents2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWaitEvents2-eventCount-arraylength) VUID-vkCmdWaitEvents2-eventCount-arraylength

 `eventCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWaitEvents2-commonparent) VUID-vkCmdWaitEvents2-commonparent

 Both of `commandBuffer`, and the elements of `pEvents` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdWaitEvents2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDependencyInfo](VkDependencyInfo.html), [VkEvent](VkEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdWaitEvents2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
