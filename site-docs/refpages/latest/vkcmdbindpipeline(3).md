# vkCmdBindPipeline(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindPipeline.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindPipeline - Bind a pipeline object to a command buffer

Once a pipeline has been created, it **can** be bound to the command buffer
using the command:

// Provided by VK_VERSION_1_0
void vkCmdBindPipeline(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipeline                                  pipeline);

* 
`commandBuffer` is the command buffer that the pipeline will be
bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) value specifying
to which bind point the pipeline is bound.
Binding one does not disturb the others.

* 
`pipeline` is the pipeline to be bound.

Once bound, a pipeline binding affects subsequent commands that interact
with the given pipeline type in the command buffer until a different
pipeline of the same type is bound to the bind
point, or until the pipeline bind point is disturbed by binding a
[shader object](../../../../spec/latest/chapters/shaders.html#shaders-objects) as described in
[Interaction with Pipelines](../../../../spec/latest/chapters/shaders.html#shaders-objects-pipeline-interaction).
Commands that do not interact with the [given pipeline](../../../../spec/latest/chapters/shaders.html#shaders-binding)
type **must** not be affected by the pipeline state.

Valid Usage

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00777) VUID-vkCmdBindPipeline-pipelineBindPoint-00777

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00778) VUID-vkCmdBindPipeline-pipelineBindPoint-00778

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00779) VUID-vkCmdBindPipeline-pipelineBindPoint-00779

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html),
`pipeline` **must** be a compute pipeline

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00780) VUID-vkCmdBindPipeline-pipelineBindPoint-00780

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html),
`pipeline` **must** be a graphics pipeline

* 
[](#VUID-vkCmdBindPipeline-pipeline-00781) VUID-vkCmdBindPipeline-pipeline-00781

If the [    `variableMultisampleRate`](../../../../spec/latest/chapters/features.html#features-variableMultisampleRate) feature is not supported, `pipeline`
is a graphics pipeline, the current subpass [    uses no attachments](../../../../spec/latest/chapters/renderpass.html#renderpass-noattachments), and this is not the first call to this function
with a graphics pipeline after transitioning to the current subpass,
then the sample count specified by this pipeline **must** match that set in
the previous pipeline

* 
[](#VUID-vkCmdBindPipeline-variableSampleLocations-01525) VUID-vkCmdBindPipeline-variableSampleLocations-01525

If
[VkPhysicalDeviceSampleLocationsPropertiesEXT](VkPhysicalDeviceSampleLocationsPropertiesEXT.html)::`variableSampleLocations`
is [VK_FALSE](VK_FALSE.html), and `pipeline` is a graphics pipeline created
with a `renderPass` that is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and with a
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html) structure having its
`sampleLocationsEnable` member set to [VK_TRUE](VK_TRUE.html) but without
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](VkDynamicState.html) enabled then the current
render pass instance **must** have been begun by specifying a
[VkRenderPassSampleLocationsBeginInfoEXT](VkRenderPassSampleLocationsBeginInfoEXT.html) structure whose
`pPostSubpassSampleLocations` member contains an element with a
`subpassIndex` matching the current subpass index and the
`sampleLocationsInfo` member of that element **must** match the
`sampleLocationsInfo` specified in
[VkPipelineSampleLocationsStateCreateInfoEXT](VkPipelineSampleLocationsStateCreateInfoEXT.html) when the pipeline was
created

* 
[](#VUID-vkCmdBindPipeline-None-02323) VUID-vkCmdBindPipeline-None-02323

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-02391) VUID-vkCmdBindPipeline-pipelineBindPoint-02391

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](VkPipelineBindPoint.html), the `VkCommandPool`
that `commandBuffer` was allocated from **must** support compute
operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-02392) VUID-vkCmdBindPipeline-pipelineBindPoint-02392

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](VkPipelineBindPoint.html), `pipeline` **must** be a
ray tracing pipeline

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-06721) VUID-vkCmdBindPipeline-pipelineBindPoint-06721

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](VkPipelineBindPoint.html), `commandBuffer` **must**
not be a protected command buffer

* 
[](#VUID-vkCmdBindPipeline-pipelineProtectedAccess-07408) VUID-vkCmdBindPipeline-pipelineProtectedAccess-07408

If the [    `pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is enabled, and
`commandBuffer` is a protected command buffer, `pipeline` **must**
have been created without
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdBindPipeline-pipelineProtectedAccess-07409) VUID-vkCmdBindPipeline-pipelineProtectedAccess-07409

If the [    `pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is enabled, and
`commandBuffer` is not a protected command buffer, `pipeline`
**must** have been created without
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdBindPipeline-pipeline-03382) VUID-vkCmdBindPipeline-pipeline-03382

`pipeline` **must** not have been created with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html) set

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-04808) VUID-vkCmdBindPipeline-commandBuffer-04808

If `commandBuffer` is a secondary command buffer with
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)::`viewportScissor2D`
enabled and `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html), then the `pipeline` **must**
have been created with [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) or
[VK_DYNAMIC_STATE_VIEWPORT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html) or
[VK_DYNAMIC_STATE_SCISSOR](VkDynamicState.html) enabled

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-04809) VUID-vkCmdBindPipeline-commandBuffer-04809

If `commandBuffer` is a secondary command buffer with
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)::`viewportScissor2D`
enabled and `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html) and `pipeline` was created
with [VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html) structure and
its `discardRectangleCount` member is not `0`, or the pipeline was
created with [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html)
enabled, then the pipeline **must** have been created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html) enabled

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-04881) VUID-vkCmdBindPipeline-pipelineBindPoint-04881

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html) and
the [    `provokingVertexModePerPipeline`](../../../../spec/latest/chapters/limits.html#limits-provokingVertexModePerPipeline) limit is [VK_FALSE](VK_FALSE.html), then
pipeline’s
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html)::`provokingVertexMode`
**must** be the same as that of any other pipelines previously bound to
this bind point within the current render pass instance, including any
pipeline already bound when beginning the render pass instance

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-04949) VUID-vkCmdBindPipeline-pipelineBindPoint-04949

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](VkPipelineBindPoint.html), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-04950) VUID-vkCmdBindPipeline-pipelineBindPoint-04950

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](VkPipelineBindPoint.html), `pipeline`
**must** be a subpass shading pipeline

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-09910) VUID-vkCmdBindPipeline-pipelineBindPoint-09910

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM](VkPipelineBindPoint.html), the `VkCommandPool`
that `commandBuffer` was allocated from **must** have been created for
a queue family that supports [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html)

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-09911) VUID-vkCmdBindPipeline-pipelineBindPoint-09911

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM](VkPipelineBindPoint.html), `pipeline` **must** be a
[data graph pipeline](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines)

* 
[](#VUID-vkCmdBindPipeline-pipeline-09912) VUID-vkCmdBindPipeline-pipeline-09912

If `pipeline` is a [data graph pipeline](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) and the
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html) structure used to create it had a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure in its
`pNext` chain that specified any foreign data processing engines,
then the command pool from which `commandBuffer` was allocated **must**
have been created with a [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html) structure that
had a [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure
specifying a superset of the foreign data graph processing engines
specified at pipeline creation time in its `pNext` chain

* 
[](#VUID-vkCmdBindPipeline-pipeline-09913) VUID-vkCmdBindPipeline-pipeline-09913

If `pipeline` is a [data graph pipeline](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) and the
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html) structure used to create it did
not have a [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure in
its `pNext` chain, then the command pool from which
`commandBuffer` was allocated **must** not have been created with a
[VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html) that had a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure in its
`pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-parameter) VUID-vkCmdBindPipeline-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-parameter) VUID-vkCmdBindPipeline-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-vkCmdBindPipeline-pipeline-parameter) VUID-vkCmdBindPipeline-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-recording) VUID-vkCmdBindPipeline-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-cmdpool) VUID-vkCmdBindPipeline-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindPipeline-videocoding) VUID-vkCmdBindPipeline-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindPipeline-commonparent) VUID-vkCmdBindPipeline-commonparent

 Both of `commandBuffer`, and `pipeline` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindPipeline is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipeline](VkPipeline.html), [VkPipelineBindPoint](VkPipelineBindPoint.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCmdBindPipeline).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
