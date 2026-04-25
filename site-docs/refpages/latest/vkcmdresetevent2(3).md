# vkCmdResetEvent2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdResetEvent2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdResetEvent2 - Reset an event object to non-signaled state

To unsignal the event from a device, call:

// Provided by VK_VERSION_1_3
void vkCmdResetEvent2(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags2                       stageMask);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdResetEvent2
void vkCmdResetEvent2KHR(
    VkCommandBuffer                             commandBuffer,
    VkEvent                                     event,
    VkPipelineStageFlags2                       stageMask);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`event` is the event that will be unsignaled.

* 
`stageMask` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline stages
used to determine the first [    synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes).

When [vkCmdResetEvent2](#) is submitted to a queue, it defines an execution
dependency on commands that were submitted before it, and defines an event
unsignal operation which resets the event to the unsignaled state.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
The synchronization scope is limited to operations by `stageMask` or
stages that are [logically earlier](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-order)
than `stageMask`.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes only the event unsignal operation.

If `event` is already in the unsignaled state when
[vkCmdResetEvent2](#) is executed on the device, then this command has no
effect, no event unsignal operation occurs, and no execution dependency is
generated.

Valid Usage

* 
[](#VUID-vkCmdResetEvent2-stageMask-03929) VUID-vkCmdResetEvent2-stageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03930) VUID-vkCmdResetEvent2-stageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03931) VUID-vkCmdResetEvent2-stageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03932) VUID-vkCmdResetEvent2-stageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03933) VUID-vkCmdResetEvent2-stageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03934) VUID-vkCmdResetEvent2-stageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-03935) VUID-vkCmdResetEvent2-stageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-07316) VUID-vkCmdResetEvent2-stageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-04957) VUID-vkCmdResetEvent2-stageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-04995) VUID-vkCmdResetEvent2-stageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-07946) VUID-vkCmdResetEvent2-stageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-10751) VUID-vkCmdResetEvent2-stageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-10752) VUID-vkCmdResetEvent2-stageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-stageMask-10753) VUID-vkCmdResetEvent2-stageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`stageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-synchronization2-03829) VUID-vkCmdResetEvent2-synchronization2-03829

The [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdResetEvent2-stageMask-03830) VUID-vkCmdResetEvent2-stageMask-03830

`stageMask` **must** not include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-vkCmdResetEvent2-event-03831) VUID-vkCmdResetEvent2-event-03831

There **must** be an execution dependency between `vkCmdResetEvent2`
and the execution of any [vkCmdWaitEvents](vkCmdWaitEvents.html) that includes `event`
in its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent2-event-03832) VUID-vkCmdResetEvent2-event-03832

There **must** be an execution dependency between `vkCmdResetEvent2`
and the execution of any [vkCmdWaitEvents2](vkCmdWaitEvents2.html) that includes
`event` in its `pEvents` parameter

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-03833) VUID-vkCmdResetEvent2-commandBuffer-03833

`commandBuffer`’s current device mask **must** include exactly one
physical device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-parameter) VUID-vkCmdResetEvent2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdResetEvent2-event-parameter) VUID-vkCmdResetEvent2-event-parameter

 `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkCmdResetEvent2-stageMask-parameter) VUID-vkCmdResetEvent2-stageMask-parameter

 `stageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-recording) VUID-vkCmdResetEvent2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResetEvent2-commandBuffer-cmdpool) VUID-vkCmdResetEvent2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdResetEvent2-renderpass) VUID-vkCmdResetEvent2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdResetEvent2-suspended) VUID-vkCmdResetEvent2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdResetEvent2-commonparent) VUID-vkCmdResetEvent2-commonparent

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

vkCmdResetEvent2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkEvent](VkEvent.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdResetEvent2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
