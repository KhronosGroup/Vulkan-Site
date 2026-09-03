# vkCmdSetRayTracingPipelineStackSizeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetRayTracingPipelineStackSizeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetRayTracingPipelineStackSizeKHR - Set the stack size dynamically for a ray tracing pipeline

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the stack size for a ray
tracing pipeline, call:

// Provided by VK_KHR_ray_tracing_pipeline
void vkCmdSetRayTracingPipelineStackSizeKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    pipelineStackSize);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pipelineStackSize` is the stack size to use for subsequent ray
tracing trace commands.

This command sets the stack size for subsequent ray tracing commands when
the ray tracing pipeline is created with
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, the stack size is computed as described in
[Ray Tracing Pipeline Stack](../../../../spec/latest/chapters/raytracing.html#ray-tracing-pipeline-stack).

Valid Usage

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-pipelineStackSize-03610) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-pipelineStackSize-03610

`pipelineStackSize` **must** be large enough for any dynamic execution
through the shaders in the ray tracing pipeline used by a subsequent
trace call

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-parameter) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-recording) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-cmdpool) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-renderpass) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-videocoding) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | State |

Conditional Rendering

vkCmdSetRayTracingPipelineStackSizeKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCmdSetRayTracingPipelineStackSizeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
