# vkCmdWriteBufferMarkerAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWriteBufferMarkerAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWriteBufferMarkerAMD - Execute a pipelined write of a marker value into a buffer

To write a 32-bit marker value into a buffer as a pipelined operation, call:

// Provided by VK_AMD_buffer_marker
void vkCmdWriteBufferMarkerAMD(
    VkCommandBuffer                             commandBuffer,
    VkPipelineStageFlagBits                     pipelineStage,
    VkBuffer                                    dstBuffer,
    VkDeviceSize                                dstOffset,
    uint32_t                                    marker);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pipelineStage` is a [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) value specifying
the pipeline stage whose completion triggers the marker write.

* 
`dstBuffer` is the buffer where the marker will be written to.

* 
`dstOffset` is the byte offset into the buffer where the marker will
be written to.

* 
`marker` is the 32-bit value of the marker.

When `vkCmdWriteBufferMarkerAMD` is submitted to a queue, it defines an
execution dependency between prior operations and writing the marker value,
as well as a memory dependency from earlier [buffer marker write commands](../../../../spec/latest/chapters/copies.html#copies-buffer-markers).

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes operations performed by operations that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) in the pipeline stage
identified by `pipelineStage`.
It additionally includes other [buffer marker write commands](../../../../spec/latest/chapters/copies.html#copies-buffer-markers) that occur earlier in [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) that specified either the same `pipelineStage` or a
stage that is [logically earlier](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes only the buffer marker write.

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes)
includes only accesses performed by other [buffer marker write commands](../../../../spec/latest/chapters/copies.html#copies-buffer-markers).

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
empty.

The access scope for buffer marker writes falls under the
[VK_ACCESS_TRANSFER_WRITE_BIT](VkAccessFlagBits.html) flag, and is performed by either
`pipelineStage` or [VK_PIPELINE_STAGE_TRANSFER_BIT](VkPipelineStageFlagBits.html).
[Synchronization commands](../../../../spec/latest/chapters/synchronization.html#synchronization) should specify this access
flag and both pipeline stages when defining dependencies with this command.

|  | Similar to `vkCmdWriteTimestamp`, if an implementation is unable to
| --- | --- |
write a marker at any specific pipeline stage, it **may** instead do so at any
logically later stage. |

|  | Implementations **may** only support a limited number of pipelined marker write
| --- | --- |
operations in flight at a given time, thus excessive number of marker write
operations **may** degrade command execution performance. |

Valid Usage

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04074) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04074

`pipelineStage` **must** be a
[valid stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported) for the queue
family that was used to create the command pool that `commandBuffer`
was allocated from

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04075) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04075

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04076) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04076

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04077) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04077

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04078) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04078

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04079) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04079

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04080) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-04080

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-07077) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-07077

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-shadingRateImage-07314) VUID-vkCmdWriteBufferMarkerAMD-shadingRateImage-07314

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-synchronization2-06489) VUID-vkCmdWriteBufferMarkerAMD-synchronization2-06489

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_NONE](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-rayTracingPipeline-07943) VUID-vkCmdWriteBufferMarkerAMD-rayTracingPipeline-07943

If neither of the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-dstOffset-01798) VUID-vkCmdWriteBufferMarkerAMD-dstOffset-01798

`dstOffset` **must** be less than or equal to the size of
`dstBuffer` minus `4`

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-dstBuffer-01799) VUID-vkCmdWriteBufferMarkerAMD-dstBuffer-01799

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-dstBuffer-01800) VUID-vkCmdWriteBufferMarkerAMD-dstBuffer-01800

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-dstOffset-01801) VUID-vkCmdWriteBufferMarkerAMD-dstOffset-01801

`dstOffset` **must** be a multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-commandBuffer-parameter) VUID-vkCmdWriteBufferMarkerAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-parameter) VUID-vkCmdWriteBufferMarkerAMD-pipelineStage-parameter

 If `pipelineStage` is not `0`, `pipelineStage` **must** be a valid [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) value

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-dstBuffer-parameter) VUID-vkCmdWriteBufferMarkerAMD-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-commandBuffer-recording) VUID-vkCmdWriteBufferMarkerAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-commandBuffer-cmdpool) VUID-vkCmdWriteBufferMarkerAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-suspended) VUID-vkCmdWriteBufferMarkerAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-videocoding) VUID-vkCmdWriteBufferMarkerAMD-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdWriteBufferMarkerAMD-commonparent) VUID-vkCmdWriteBufferMarkerAMD-commonparent

 Both of `commandBuffer`, and `dstBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdWriteBufferMarkerAMD is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_AMD_buffer_marker](VK_AMD_buffer_marker.html), [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`, [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdWriteBufferMarkerAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
