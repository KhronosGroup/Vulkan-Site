# vkCmdPipelineBarrier(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPipelineBarrier.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPipelineBarrier - Insert a memory dependency

To record a pipeline barrier, call:

|  | This functionality is superseded by [vkCmdPipelineBarrier2](../../../../spec/latest/chapters/synchronization.html#vkCmdPipelineBarrier2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdPipelineBarrier(
    VkCommandBuffer                             commandBuffer,
    VkPipelineStageFlags                        srcStageMask,
    VkPipelineStageFlags                        dstStageMask,
    VkDependencyFlags                           dependencyFlags,
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
`srcStageMask` is a bitmask of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)
specifying the [source stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks).

* 
`dstStageMask` is a bitmask of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)
specifying the [destination    stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks).

* 
`dependencyFlags` is a bitmask of [VkDependencyFlagBits](VkDependencyFlagBits.html)
specifying how execution and memory dependencies are formed.

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

`vkCmdPipelineBarrier` operates almost identically to
[vkCmdPipelineBarrier2](vkCmdPipelineBarrier2.html), except that the scopes and barriers are defined
as direct parameters rather than being defined by a [VkDependencyInfo](VkDependencyInfo.html).

When [vkCmdPipelineBarrier](#) is submitted to a queue, it defines a memory
dependency between commands that were submitted to the same queue before it,
and those submitted to the same queue after it.

If [vkCmdPipelineBarrier](#) was recorded outside a render pass instance,
the first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
If [vkCmdPipelineBarrier](#) was recorded inside a render pass instance,
the first synchronization scope includes only commands that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) within the same
subpass.
In either case, the first synchronization scope is limited to operations on
the pipeline stages determined by the
[source stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks) specified by
`srcStageMask`.

If [vkCmdPipelineBarrier](#) was recorded outside a render pass instance,
the second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
If [vkCmdPipelineBarrier](#) was recorded inside a render pass instance,
the second synchronization scope includes only commands that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) within the same
subpass.
In either case, the second synchronization scope is limited to operations on
the pipeline stages determined by the
[destination stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks) specified
by `dstStageMask`.

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

If `dependencyFlags` includes [VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html), then
any dependency between [framebuffer-space](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions) pipeline stages is
[framebuffer-local](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions) - otherwise it is
[framebuffer-global](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions).

Valid Usage

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04090) VUID-vkCmdPipelineBarrier-srcStageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04091) VUID-vkCmdPipelineBarrier-srcStageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04092) VUID-vkCmdPipelineBarrier-srcStageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04093) VUID-vkCmdPipelineBarrier-srcStageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04094) VUID-vkCmdPipelineBarrier-srcStageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04095) VUID-vkCmdPipelineBarrier-srcStageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-04096) VUID-vkCmdPipelineBarrier-srcStageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-07318) VUID-vkCmdPipelineBarrier-srcStageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-03937) VUID-vkCmdPipelineBarrier-srcStageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `srcStageMask` **must** not be `0`

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-07949) VUID-vkCmdPipelineBarrier-srcStageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-10754) VUID-vkCmdPipelineBarrier-srcStageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcAccessMask-06257) VUID-vkCmdPipelineBarrier-srcAccessMask-06257

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
a memory barrier `srcAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04090) VUID-vkCmdPipelineBarrier-dstStageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04091) VUID-vkCmdPipelineBarrier-dstStageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04092) VUID-vkCmdPipelineBarrier-dstStageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04093) VUID-vkCmdPipelineBarrier-dstStageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04094) VUID-vkCmdPipelineBarrier-dstStageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04095) VUID-vkCmdPipelineBarrier-dstStageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-04096) VUID-vkCmdPipelineBarrier-dstStageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-07318) VUID-vkCmdPipelineBarrier-dstStageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-03937) VUID-vkCmdPipelineBarrier-dstStageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `dstStageMask` **must** not be `0`

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-07949) VUID-vkCmdPipelineBarrier-dstStageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-10754) VUID-vkCmdPipelineBarrier-dstStageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-dstAccessMask-06257) VUID-vkCmdPipelineBarrier-dstAccessMask-06257

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
a memory barrier `dstAccessMask` includes
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-srcAccessMask-02815) VUID-vkCmdPipelineBarrier-srcAccessMask-02815

The `srcAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `srcStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-dstAccessMask-02816) VUID-vkCmdPipelineBarrier-dstAccessMask-02816

The `dstAccessMask` member of each element of `pMemoryBarriers`
**must** only include access flags that are supported by one or more of the
pipeline stages in `dstStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02817) VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02817

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02818) VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-02818

For each element of `pBufferMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02819) VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02819

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `srcQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `srcAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`srcStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02820) VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-02820

For each element of `pImageMemoryBarriers`, if its
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members are
equal, or if its `dstQueueFamilyIndex` is the queue family index
that was used to create the command pool that `commandBuffer` was
allocated from, then its `dstAccessMask` member **must** only contain
access flags that are supported by one or more of the pipeline stages in
`dstStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-vkCmdPipelineBarrier-image-09373) VUID-vkCmdPipelineBarrier-image-09373

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-vkCmdPipelineBarrier-image-09374) VUID-vkCmdPipelineBarrier-image-09374

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat`
value

* 
[](#VUID-vkCmdPipelineBarrier-oldLayout-01181) VUID-vkCmdPipelineBarrier-oldLayout-01181

If `vkCmdPipelineBarrier` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-01182) VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-01182

If `vkCmdPipelineBarrier` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-None-07889) VUID-vkCmdPipelineBarrier-None-07889

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, the render pass **must** have been created with
at least one subpass dependency that expresses a dependency from the
current subpass to itself, does not include
[VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html) if this command does not,
does not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html) if this command does
not,
and has [synchronization scopes](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scopes](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) that
are all supersets of the scopes defined in this command

* 
[](#VUID-vkCmdPipelineBarrier-bufferMemoryBarrierCount-01178) VUID-vkCmdPipelineBarrier-bufferMemoryBarrierCount-01178

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, it **must** not include any buffer memory
barriers

* 
[](#VUID-vkCmdPipelineBarrier-image-04073) VUID-vkCmdPipelineBarrier-image-04073

If `vkCmdPipelineBarrier` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, the `image` member of any image memory
barrier included in this command **must** be an attachment used in the
current subpass both as an input attachment, and as either a color,
color resolve,
or depth/stencil attachment

* 
[](#VUID-vkCmdPipelineBarrier-None-07890) VUID-vkCmdPipelineBarrier-None-07890

If `vkCmdPipelineBarrier` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions),
destination stage masks of all memory barriers **must** only include
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions)

* 
[](#VUID-vkCmdPipelineBarrier-dependencyFlags-07891) VUID-vkCmdPipelineBarrier-dependencyFlags-07891

If `vkCmdPipelineBarrier` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions), then
`dependencyFlags` **must** include [VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-None-07892) VUID-vkCmdPipelineBarrier-None-07892

If `vkCmdPipelineBarrier` is called within a render pass instance, the source
and destination stage masks of any memory barriers **must** only include
graphics pipeline stages

* 
[](#VUID-vkCmdPipelineBarrier-dependencyFlags-01186) VUID-vkCmdPipelineBarrier-dependencyFlags-01186

If `vkCmdPipelineBarrier` is called outside of a render pass instance, the
dependency flags **must** not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-None-07893) VUID-vkCmdPipelineBarrier-None-07893

If `vkCmdPipelineBarrier` is called inside a render pass instance, and there is
more than one view in the current subpass, dependency flags **must**
include [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier-None-09553) VUID-vkCmdPipelineBarrier-None-09553

    
    If
    none of the [    `shaderTileImageColorReadAccess`](../../../../spec/latest/chapters/features.html#features-shaderTileImageColorReadAccess),
    [    `shaderTileImageStencilReadAccess`](../../../../spec/latest/chapters/features.html#features-shaderTileImageStencilReadAccess), or
    [    `shaderTileImageDepthReadAccess`](../../../../spec/latest/chapters/features.html#features-shaderTileImageDepthReadAccess) features are enabled,
and
    the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
    `vkCmdPipelineBarrier` **must** not be called within a render pass instance
    started with [vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[](#VUID-vkCmdPipelineBarrier-None-09554) VUID-vkCmdPipelineBarrier-None-09554

If
the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), there **must** be no buffer or image memory
barriers specified by this command

* 
[](#VUID-vkCmdPipelineBarrier-None-09586) VUID-vkCmdPipelineBarrier-None-09586

If
the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), memory barriers specified by this command
**must** only include [VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), or
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html) in their access
masks

* 
[](#VUID-vkCmdPipelineBarrier-image-09555) VUID-vkCmdPipelineBarrier-image-09555

If `vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), and the `image` member of any image
memory barrier is used as an attachment in the current render pass
instance, it **must** be in the [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)
or [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-09556) VUID-vkCmdPipelineBarrier-srcStageMask-09556

If `vkCmdPipelineBarrier` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), this command **must** only specify
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions) in
`srcStageMask` and `dstStageMask`

* 
[](#VUID-vkCmdPipelineBarrier-oldLayout-10758) VUID-vkCmdPipelineBarrier-oldLayout-10758

If called within a render pass instance using a [VkRenderPass](VkRenderPass.html)
object, the `oldLayout` member of any image memory barrier included
in this command **must** be equal to the layout that the corresponding
attachment uses during the subpass

* 
[](#VUID-vkCmdPipelineBarrier-oldLayout-10759) VUID-vkCmdPipelineBarrier-oldLayout-10759

If called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), the `oldLayout` member of any image
memory barrier included in this command **must** be equal to the layout
that the corresponding attachment uses during the render pass instance

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-06461) VUID-vkCmdPipelineBarrier-srcStageMask-06461

Any pipeline stage included in `srcStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-06462) VUID-vkCmdPipelineBarrier-dstStageMask-06462

Any pipeline stage included in `dstStageMask` **must** be supported by
the capabilities of the queue family specified by the
`queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
structure that was used to create the `VkCommandPool` that
`commandBuffer` was allocated from, as specified in the
[table of supported pipeline    stages](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-supported)

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-09633) VUID-vkCmdPipelineBarrier-srcStageMask-09633

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html), for each element of
`pImageMemoryBarriers`, `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-09634) VUID-vkCmdPipelineBarrier-srcStageMask-09634

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_HOST_BIT](VkPipelineStageFlagBits.html), for each element of
`pBufferMemoryBarriers`, `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-10388) VUID-vkCmdPipelineBarrier-srcQueueFamilyIndex-10388

If a buffer or image memory barrier specifies a
[queue family ownership transfer    operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers), either the `srcQueueFamilyIndex` or
`dstQueueFamilyIndex` member and the queue family index that was
used to create the command pool that `commandBuffer` was allocated
from **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier-maintenance8-10206) VUID-vkCmdPipelineBarrier-maintenance8-10206

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is not
enabled, `dependencyFlags` **must** not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPipelineBarrier-commandBuffer-parameter) VUID-vkCmdPipelineBarrier-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPipelineBarrier-srcStageMask-parameter) VUID-vkCmdPipelineBarrier-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-vkCmdPipelineBarrier-dstStageMask-parameter) VUID-vkCmdPipelineBarrier-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-vkCmdPipelineBarrier-dependencyFlags-parameter) VUID-vkCmdPipelineBarrier-dependencyFlags-parameter

 `dependencyFlags` **must** be a valid combination of [VkDependencyFlagBits](VkDependencyFlagBits.html) values

* 
[](#VUID-vkCmdPipelineBarrier-pMemoryBarriers-parameter) VUID-vkCmdPipelineBarrier-pMemoryBarriers-parameter

 If `memoryBarrierCount` is not `0`, `pMemoryBarriers` **must** be a valid pointer to an array of `memoryBarrierCount` valid [VkMemoryBarrier](VkMemoryBarrier.html) structures

* 
[](#VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-parameter) VUID-vkCmdPipelineBarrier-pBufferMemoryBarriers-parameter

 If `bufferMemoryBarrierCount` is not `0`, `pBufferMemoryBarriers` **must** be a valid pointer to an array of `bufferMemoryBarrierCount` valid [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html) structures

* 
[](#VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-parameter) VUID-vkCmdPipelineBarrier-pImageMemoryBarriers-parameter

 If `imageMemoryBarrierCount` is not `0`, `pImageMemoryBarriers` **must** be a valid pointer to an array of `imageMemoryBarrierCount` valid [VkImageMemoryBarrier](VkImageMemoryBarrier.html) structures

* 
[](#VUID-vkCmdPipelineBarrier-commandBuffer-recording) VUID-vkCmdPipelineBarrier-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPipelineBarrier-commandBuffer-cmdpool) VUID-vkCmdPipelineBarrier-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPipelineBarrier-suspended) VUID-vkCmdPipelineBarrier-suspended

 This command **must** not be called between suspended render pass instances

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

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdPipelineBarrier is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBufferMemoryBarrier](VkBufferMemoryBarrier.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDependencyFlags](VkDependencyFlags.html), [VkImageMemoryBarrier](VkImageMemoryBarrier.html), [VkMemoryBarrier](VkMemoryBarrier.html), [VkPipelineStageFlags](VkPipelineStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdPipelineBarrier).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
