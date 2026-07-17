# vkCmdSetEvent(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetEvent.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetEvent - Set an event object to signaled state

To set the state of an event to signaled from a device, call:

|  | This functionality is superseded by [vkCmdSetEvent2](../../../../spec/latest/chapters/synchronization.html#vkCmdSetEvent2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdSetEvent(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags                        stageMask);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be signaled.

* 
`stageMask` specifies the [source    stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) used to determine the first
[synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes).

`vkCmdSetEvent` behaves identically to [vkCmdSetEvent2](vkCmdSetEvent2.html), except that
it does not define an access scope, and **must** only be used with
[vkCmdWaitEvents](vkCmdWaitEvents.html), not [vkCmdWaitEvents2](vkCmdWaitEvents2.html).

Valid Usage

* 
[](#VUID-vkCmdSetEvent-stageMask-04090) VUID-vkCmdSetEvent-stageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-04091) VUID-vkCmdSetEvent-stageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-04092) VUID-vkCmdSetEvent-stageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-04093) VUID-vkCmdSetEvent-stageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-04094) VUID-vkCmdSetEvent-stageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-04095) VUID-vkCmdSetEvent-stageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-04096) VUID-vkCmdSetEvent-stageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-07318) VUID-vkCmdSetEvent-stageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-03937) VUID-vkCmdSetEvent-stageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `stageMask` **must** not be `0`

* 
[](#VUID-vkCmdSetEvent-stageMask-07949) VUID-vkCmdSetEvent-stageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-10754) VUID-vkCmdSetEvent-stageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-stageMask-06457) VUID-vkCmdSetEvent-stageMask-06457

Any pipeline stage included in `stageMask` **must** be supported by the
capabilities of the queue family specified by the `queueFamilyIndex`
member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html) structure that was used to
create the `VkCommandPool` that `commandBuffer` was allocated
from, as specified in the [    table of supported pipeline stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdSetEvent-stageMask-01149) VUID-vkCmdSetEvent-stageMask-01149

`stageMask` **must** not include [VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdSetEvent-commandBuffer-01152) VUID-vkCmdSetEvent-commandBuffer-01152

The current device mask of `commandBuffer` **must** include exactly one
physical device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetEvent-commandBuffer-parameter) VUID-vkCmdSetEvent-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetEvent-event-parameter) VUID-vkCmdSetEvent-event-parameter

 `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkCmdSetEvent-stageMask-parameter) VUID-vkCmdSetEvent-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-vkCmdSetEvent-commandBuffer-recording) VUID-vkCmdSetEvent-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetEvent-commandBuffer-cmdpool) VUID-vkCmdSetEvent-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetEvent-renderpass) VUID-vkCmdSetEvent-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdSetEvent-suspended) VUID-vkCmdSetEvent-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetEvent-commonparent) VUID-vkCmdSetEvent-commonparent

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

vkCmdSetEvent is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkEvent](VkEvent.html), [VkPipelineStageFlags](VkPipelineStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdSetEvent).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
