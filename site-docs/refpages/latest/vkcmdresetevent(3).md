# vkCmdResetEvent(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdResetEvent.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdResetEvent - Reset an event object to non-signaled state

To set the state of an event to unsignaled from a device, call:

|  | This functionality is superseded by [vkCmdResetEvent2](../../../../spec/latest/chapters/synchronization.html#vkCmdResetEvent2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdResetEvent(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags                        stageMask);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be unsignaled.

* 
`stageMask` is a bitmask of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) specifying
the [source stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) used to
determine when the `event` is unsignaled.

`vkCmdResetEvent` behaves identically to [vkCmdResetEvent2](vkCmdResetEvent2.html).

Valid Usage

* 
[](#VUID-vkCmdResetEvent-stageMask-04090) VUID-vkCmdResetEvent-stageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-04091) VUID-vkCmdResetEvent-stageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-04092) VUID-vkCmdResetEvent-stageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-04093) VUID-vkCmdResetEvent-stageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-04094) VUID-vkCmdResetEvent-stageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-04095) VUID-vkCmdResetEvent-stageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-04096) VUID-vkCmdResetEvent-stageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-07318) VUID-vkCmdResetEvent-stageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-03937) VUID-vkCmdResetEvent-stageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `stageMask` **must** not be `0`

* 
[](#VUID-vkCmdResetEvent-stageMask-07949) VUID-vkCmdResetEvent-stageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-10754) VUID-vkCmdResetEvent-stageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-stageMask-06458) VUID-vkCmdResetEvent-stageMask-06458

Any pipeline stage included in `stageMask` **must** be supported by the
capabilities of the queue family specified by the `queueFamilyIndex`
member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html) structure that was used to
create the `VkCommandPool` that `commandBuffer` was allocated
from, as specified in the [    table of supported pipeline stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdResetEvent-stageMask-01153) VUID-vkCmdResetEvent-stageMask-01153

`stageMask` **must** not include [VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdResetEvent-event-03834) VUID-vkCmdResetEvent-event-03834

There **must** be an execution dependency between `vkCmdResetEvent` and
the execution of any [vkCmdWaitEvents](vkCmdWaitEvents.html) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent-event-03835) VUID-vkCmdResetEvent-event-03835

There **must** be an execution dependency between `vkCmdResetEvent` and
the execution of any [vkCmdWaitEvents2](vkCmdWaitEvents2.html) that includes `event` in
its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent-commandBuffer-01157) VUID-vkCmdResetEvent-commandBuffer-01157

`commandBuffer`’s current device mask **must** include exactly one
physical device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResetEvent-commandBuffer-parameter) VUID-vkCmdResetEvent-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdResetEvent-event-parameter) VUID-vkCmdResetEvent-event-parameter

 `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkCmdResetEvent-stageMask-parameter) VUID-vkCmdResetEvent-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-vkCmdResetEvent-commandBuffer-recording) VUID-vkCmdResetEvent-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResetEvent-commandBuffer-cmdpool) VUID-vkCmdResetEvent-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdResetEvent-renderpass) VUID-vkCmdResetEvent-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdResetEvent-suspended) VUID-vkCmdResetEvent-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdResetEvent-commonparent) VUID-vkCmdResetEvent-commonparent

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

vkCmdResetEvent is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkEvent](VkEvent.html), [VkPipelineStageFlags](VkPipelineStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdResetEvent).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
