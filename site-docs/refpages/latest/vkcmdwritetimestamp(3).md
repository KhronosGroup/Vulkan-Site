# vkCmdWriteTimestamp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWriteTimestamp.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWriteTimestamp - Write a device timestamp into a query object

To request a timestamp and write the value to memory, call:

|  | This functionality is superseded by [vkCmdWriteTimestamp2](../../../../spec/latest/chapters/queries.html#vkCmdWriteTimestamp2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdWriteTimestamp(
    VkCommandBuffer                             commandBuffer,
    VkPipelineStageFlagBits                     pipelineStage,
    VkQueryPool                                 queryPool,
    uint32_t                                    query);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pipelineStage` is a [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) value, specifying
a stage of the pipeline.

* 
`queryPool` is the query pool that will manage the timestamp.

* 
`query` is the query within the query pool that will contain the
timestamp.

When `vkCmdWriteTimestamp` is submitted to a queue, it defines an
execution dependency on commands that were submitted before it, and writes a
timestamp to a query pool.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
The synchronization scope is limited to operations on the pipeline stage
specified by `pipelineStage`.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes only the timestamp write operation.

|  | Implementations may write the timestamp at any stage that is
| --- | --- |
[logically later](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-order) than `stage`. |

Any timestamp write that [happens-after](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-execution) another timestamp write in the same submission **must** not
have a lower value unless its value overflows the maximum supported integer
bit width of the query.
If
`[VK_KHR_calibrated_timestamps](VK_KHR_calibrated_timestamps.html)`
or
`[VK_EXT_calibrated_timestamps](VK_EXT_calibrated_timestamps.html)`
is enabled, this extends to timestamp writes across all submissions on the
same logical device: any timestamp write that
[happens-after](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-execution) another **must** not
have a lower value unless its value overflows the maximum supported integer
bit width of the query.
Timestamps written by this command **must** be in the
[VK_TIME_DOMAIN_DEVICE_KHR](VkTimeDomainKHR.html)
[time domain](../../../../spec/latest/chapters/synchronization.html#VkTimeDomainKHR).
If an overflow occurs, the timestamp value **must** wrap back to zero.

If `vkCmdWriteTimestamp` is called while executing a render pass
instance that has multiview enabled, the timestamp uses N consecutive
query indices in the query pool (starting at `query`) where N is
the number of bits set in the view mask of the subpass
or dynamic render pass
the command is executed in.
The resulting query values are determined by an implementation-dependent
choice of one of the following behaviors:

* 
The first query is a timestamp value and (if more than one bit is set in
the view mask) zero is written to the remaining queries.

* 
All N queries are timestamp values.

Either way, if two timestamps are written in the same subpass
or dynamic render pass
with multiview enabled, each of the N consecutive queries written for
a timestamp **must** not have a lower value than the queries with corresponding
indices written by the timestamp that happens-before unless the value
overflows the maximum supported integer bit width of the query.

Valid Usage

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04074) VUID-vkCmdWriteTimestamp-pipelineStage-04074

`pipelineStage` **must** be a
[valid stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported) for the queue
family that was used to create the command pool that `commandBuffer`
was allocated from

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04075) VUID-vkCmdWriteTimestamp-pipelineStage-04075

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04076) VUID-vkCmdWriteTimestamp-pipelineStage-04076

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04077) VUID-vkCmdWriteTimestamp-pipelineStage-04077

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04078) VUID-vkCmdWriteTimestamp-pipelineStage-04078

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04079) VUID-vkCmdWriteTimestamp-pipelineStage-04079

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04080) VUID-vkCmdWriteTimestamp-pipelineStage-04080

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-07077) VUID-vkCmdWriteTimestamp-pipelineStage-07077

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-shadingRateImage-07314) VUID-vkCmdWriteTimestamp-shadingRateImage-07314

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-synchronization2-06489) VUID-vkCmdWriteTimestamp-synchronization2-06489

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_NONE](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-rayTracingPipeline-07943) VUID-vkCmdWriteTimestamp-rayTracingPipeline-07943

If neither of the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteTimestamp-queryPool-01416) VUID-vkCmdWriteTimestamp-queryPool-01416

`queryPool` **must** have been created with a `queryType` of
[VK_QUERY_TYPE_TIMESTAMP](VkQueryType.html)

* 
[](#VUID-vkCmdWriteTimestamp-timestampValidBits-00829) VUID-vkCmdWriteTimestamp-timestampValidBits-00829

The command pool’s queue family **must** support a non-zero
`timestampValidBits`

* 
[](#VUID-vkCmdWriteTimestamp-query-04904) VUID-vkCmdWriteTimestamp-query-04904

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdWriteTimestamp-None-00830) VUID-vkCmdWriteTimestamp-None-00830

All queries used by the command **must** be *unavailable*

* 
[](#VUID-vkCmdWriteTimestamp-query-00831) VUID-vkCmdWriteTimestamp-query-00831

If `vkCmdWriteTimestamp` is called within a render pass instance,
the sum of `query` and the number of bits set in the current
subpass’s view mask **must** be less than or equal to the number of queries
in `queryPool`

* 
[](#VUID-vkCmdWriteTimestamp-None-10640) VUID-vkCmdWriteTimestamp-None-10640

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteTimestamp-commandBuffer-parameter) VUID-vkCmdWriteTimestamp-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-parameter) VUID-vkCmdWriteTimestamp-pipelineStage-parameter

 `pipelineStage` **must** be a valid [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) value

* 
[](#VUID-vkCmdWriteTimestamp-queryPool-parameter) VUID-vkCmdWriteTimestamp-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdWriteTimestamp-commandBuffer-recording) VUID-vkCmdWriteTimestamp-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteTimestamp-commandBuffer-cmdpool) VUID-vkCmdWriteTimestamp-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](VkQueueFlagBits.html), [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWriteTimestamp-suspended) VUID-vkCmdWriteTimestamp-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteTimestamp-commonparent) VUID-vkCmdWriteTimestamp-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action |

Conditional Rendering

vkCmdWriteTimestamp is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html), [VkQueryPool](VkQueryPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdWriteTimestamp).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
