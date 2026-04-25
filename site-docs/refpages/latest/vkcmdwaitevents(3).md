# vkCmdWaitEvents(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWaitEvents.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWaitEvents - Wait for one or more events and insert a set of memory

To wait for one or more events to enter the signaled state on a device,
call:

|  | This functionality is superseded by [vkCmdWaitEvents2](../../../../spec/latest/chapters/synchronization.html#vkCmdWaitEvents2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdWaitEvents(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    eventCount,
    const VkEvent*                              pEvents,
    VkPipelineStageFlags                        srcStageMask,
    VkPipelineStageFlags                        dstStageMask,
    uint32_t                                    memoryBarrierCount,
    const VkMemoryBarrier*                      pMemoryBarriers,
    uint32_t                                    bufferMemoryBarrierCount,
    const VkBufferMemoryBarrier*                pBufferMemoryBarriers,
    uint32_t                                    imageMemoryBarrierCount,
    const VkImageMemoryBarrier*                 pImageMemoryBarriers);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`eventCount` is the length of the `pEvents` array.

* 
`pEvents` is a pointer to an array of event object handles to wait
on.

* 
`srcStageMask` is a bitmask of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)
specifying the [source stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages).

* 
`dstStageMask` is a bitmask of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)
specifying the [destination stage    mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages).

* 
`memoryBarrierCount` is the length of the `pMemoryBarriers`
array.

* 
`pMemoryBarriers` is a pointer to an array of [VkMemoryBarrier](VkMemoryBarrier.html)
structures.

* 
`bufferMemoryBarrierCount` is the length of the
`pBufferMemoryBarriers` array.

* 
`pBufferMemoryBarriers` is a pointer to an array of
[VkBufferMemoryBarrier](VkBufferMemoryBarrier.html) structures.

* 
`imageMemoryBarrierCount` is the length of the
`pImageMemoryBarriers` array.

* 
`pImageMemoryBarriers` is a pointer to an array of
[VkImageMemoryBarrier](VkImageMemoryBarrier.html) structures.

`vkCmdWaitEvents` is largely similar to [vkCmdWaitEvents2](vkCmdWaitEvents2.html), but **can**
only wait on signal operations defined by [vkCmdSetEvent](vkCmdSetEvent.html).
As [vkCmdSetEvent](vkCmdSetEvent.html) does not define any access scopes,
`vkCmdWaitEvents` defines the first access scope for each event signal
operation in addition to its own access scopes.

|  | Since [vkCmdSetEvent](vkCmdSetEvent.html) does not have any dependency information beyond a
| --- | --- |
stage mask, implementations do not have the same opportunity to perform
[availability and visibility operations](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-available-and-visible) or [image layout transitions](../../../../spec/latest/chapters/synchronization.html#synchronization-image-layout-transitions) in advance as they do with [vkCmdSetEvent2](vkCmdSetEvent2.html) and
[vkCmdWaitEvents2](vkCmdWaitEvents2.html). |

When `vkCmdWaitEvents` is submitted to a queue, it defines a memory
dependency between prior event signal operations on the same queue or the
host, and subsequent commands.
`vkCmdWaitEvents` **must** not be used to wait on event signal operations
occurring on other queues.

The first synchronization scope only includes event signal operations that
operate on members of `pEvents`, and the operations that happened-before
the event signal operations.
Event signal operations performed by [vkCmdSetEvent](vkCmdSetEvent.html) that occur earlier
in [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) are included in the
first synchronization scope, if the [logically latest](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-order) pipeline stage in their `stageMask` parameter is
[logically earlier](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-order) than or equal
to the [logically latest](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-order) pipeline
stage in `srcStageMask`.
Event signal operations performed by [vkSetEvent](vkSetEvent.html) are only included in
the first synchronization scope if [VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html) is
included in `srcStageMask`.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
The second synchronization scope is limited to operations on the pipeline
stages determined by the [destination stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks) specified by `dstStageMask`.

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[source stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks) specified by
`srcStageMask`.
Within that, the first access scope only includes the first access scopes
defined by elements of the `pMemoryBarriers`,
`pBufferMemoryBarriers` and `pImageMemoryBarriers` arrays, which
each define a set of [memory barriers](../../../../spec/latest/chapters/synchronization.html#synchronization-memory-barriers).
If no memory barriers are specified, then the first access scope includes no
accesses.

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
limited to accesses in the pipeline stages determined by the
[destination stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks) specified
by `dstStageMask`.
Within that, the second access scope only includes the second access scopes
defined by elements of the `pMemoryBarriers`,
`pBufferMemoryBarriers` and `pImageMemoryBarriers` arrays, which
each define a set of [memory barriers](../../../../spec/latest/chapters/synchronization.html#synchronization-memory-barriers).
If no memory barriers are specified, then the second access scope includes
no accesses.

Valid Usage

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04090) VUID-vkCmdWaitEvents-srcStageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04091) VUID-vkCmdWaitEvents-srcStageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04092) VUID-vkCmdWaitEvents-srcStageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04093) VUID-vkCmdWaitEvents-srcStageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04094) VUID-vkCmdWaitEvents-srcStageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04095) VUID-vkCmdWaitEvents-srcStageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-04096) VUID-vkCmdWaitEvents-srcStageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-07318) VUID-vkCmdWaitEvents-srcStageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-03937) VUID-vkCmdWaitEvents-srcStageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `srcStageMask` **must** not be `0`

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-07949) VUID-vkCmdWaitEvents-srcStageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-10754) VUID-vkCmdWaitEvents-srcStageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcAccessMask-06257) VUID-vkCmdWaitEvents-srcAccessMask-06257

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
a memory barrier `srcAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04090) VUID-vkCmdWaitEvents-dstStageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04091) VUID-vkCmdWaitEvents-dstStageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04092) VUID-vkCmdWaitEvents-dstStageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04093) VUID-vkCmdWaitEvents-dstStageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04094) VUID-vkCmdWaitEvents-dstStageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04095) VUID-vkCmdWaitEvents-dstStageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-04096) VUID-vkCmdWaitEvents-dstStageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-07318) VUID-vkCmdWaitEvents-dstStageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-03937) VUID-vkCmdWaitEvents-dstStageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `dstStageMask` **must** not be `0`

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-07949) VUID-vkCmdWaitEvents-dstStageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-10754) VUID-vkCmdWaitEvents-dstStageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-dstAccessMask-06257) VUID-vkCmdWaitEvents-dstAccessMask-06257

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
a memory barrier `dstAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcAccessMask-02815) VUID-vkCmdWaitEvents-srcAccessMask-02815

The `srcAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `srcStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-dstAccessMask-02816) VUID-vkCmdWaitEvents-dstAccessMask-02816

The `dstAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `dstStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02817) VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02817

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02818) VUID-vkCmdWaitEvents-pBufferMemoryBarriers-02818

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pImageMemoryBarriers-02819) VUID-vkCmdWaitEvents-pImageMemoryBarriers-02819

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-pImageMemoryBarriers-02820) VUID-vkCmdWaitEvents-pImageMemoryBarriers-02820

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdWaitEvents-image-09373) VUID-vkCmdWaitEvents-image-09373

If `vkCmdWaitEvents` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-vkCmdWaitEvents-image-09374) VUID-vkCmdWaitEvents-image-09374

If `vkCmdWaitEvents` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat`
value

* 
[](#VUID-vkCmdWaitEvents-oldLayout-01181) VUID-vkCmdWaitEvents-oldLayout-01181

If `vkCmdWaitEvents` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents-srcQueueFamilyIndex-01182) VUID-vkCmdWaitEvents-srcQueueFamilyIndex-01182

If `vkCmdWaitEvents` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-06459) VUID-vkCmdWaitEvents-srcStageMask-06459

Any pipeline stage included in `srcStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-06460) VUID-vkCmdWaitEvents-dstStageMask-06460

Any pipeline stage included in `dstStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-01158) VUID-vkCmdWaitEvents-srcStageMask-01158

`srcStageMask` **must** be the bitwise OR of the `stageMask`
parameter used in previous calls to `vkCmdSetEvent` with any of the
elements of `pEvents` and [VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html) if any of
the elements of `pEvents` was set using `vkSetEvent`

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-07308) VUID-vkCmdWaitEvents-srcStageMask-07308

If this command is called inside a render pass instance,
`srcStageMask` **must** not include [VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdWaitEvents-srcQueueFamilyIndex-02803) VUID-vkCmdWaitEvents-srcQueueFamilyIndex-02803

The `srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of
any element of `pBufferMemoryBarriers` or `pImageMemoryBarriers`
**must** be equal

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-01167) VUID-vkCmdWaitEvents-commandBuffer-01167

`commandBuffer`’s current device mask **must** include exactly one
physical device

* 
[](#VUID-vkCmdWaitEvents-pEvents-03847) VUID-vkCmdWaitEvents-pEvents-03847

Elements of `pEvents` **must** not have been signaled by
[vkCmdSetEvent2](vkCmdSetEvent2.html)

* 
[](#VUID-vkCmdWaitEvents-None-10655) VUID-vkCmdWaitEvents-None-10655

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-parameter) VUID-vkCmdWaitEvents-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWaitEvents-pEvents-parameter) VUID-vkCmdWaitEvents-pEvents-parameter

 `pEvents` **must** be a valid pointer to an array of `eventCount` valid [VkEvent](VkEvent.html) handles

* 
[](#VUID-vkCmdWaitEvents-srcStageMask-parameter) VUID-vkCmdWaitEvents-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-vkCmdWaitEvents-dstStageMask-parameter) VUID-vkCmdWaitEvents-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-vkCmdWaitEvents-pMemoryBarriers-parameter) VUID-vkCmdWaitEvents-pMemoryBarriers-parameter

 If `memoryBarrierCount` is not `0`, `pMemoryBarriers` **must** be a valid pointer to an array of `memoryBarrierCount` valid [VkMemoryBarrier](VkMemoryBarrier.html) structures

* 
[](#VUID-vkCmdWaitEvents-pBufferMemoryBarriers-parameter) VUID-vkCmdWaitEvents-pBufferMemoryBarriers-parameter

 If `bufferMemoryBarrierCount` is not `0`, `pBufferMemoryBarriers` **must** be a valid pointer to an array of `bufferMemoryBarrierCount` valid [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html) structures

* 
[](#VUID-vkCmdWaitEvents-pImageMemoryBarriers-parameter) VUID-vkCmdWaitEvents-pImageMemoryBarriers-parameter

 If `imageMemoryBarrierCount` is not `0`, `pImageMemoryBarriers` **must** be a valid pointer to an array of `imageMemoryBarrierCount` valid [VkImageMemoryBarrier](VkImageMemoryBarrier.html) structures

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-recording) VUID-vkCmdWaitEvents-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWaitEvents-commandBuffer-cmdpool) VUID-vkCmdWaitEvents-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWaitEvents-suspended) VUID-vkCmdWaitEvents-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWaitEvents-eventCount-arraylength) VUID-vkCmdWaitEvents-eventCount-arraylength

 `eventCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWaitEvents-commonparent) VUID-vkCmdWaitEvents-commonparent

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

vkCmdWaitEvents is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html), [VkCommandBuffer](VkCommandBuffer.html), [VkEvent](VkEvent.html), [VkImageMemoryBarrier](VkImageMemoryBarrier.html), [VkMemoryBarrier](VkMemoryBarrier.html), [VkPipelineStageFlags](VkPipelineStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdWaitEvents).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
