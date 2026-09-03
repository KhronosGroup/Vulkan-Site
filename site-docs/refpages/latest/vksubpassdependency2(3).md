# VkSubpassDependency2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassDependency2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassDependency2 - Structure specifying a subpass dependency

The `VkSubpassDependency2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassDependency2 {
    VkStructureType         sType;
    const void*             pNext;
    uint32_t                srcSubpass;
    uint32_t                dstSubpass;
    VkPipelineStageFlags    srcStageMask;
    VkPipelineStageFlags    dstStageMask;
    VkAccessFlags           srcAccessMask;
    VkAccessFlags           dstAccessMask;
    VkDependencyFlags       dependencyFlags;
    int32_t                 viewOffset;
} VkSubpassDependency2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkSubpassDependency2
typedef VkSubpassDependency2 VkSubpassDependency2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcSubpass` is the subpass index of the first subpass in the
dependency, or [VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html).

* 
`dstSubpass` is the subpass index of the second subpass in the
dependency, or [VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html).

* 
`srcStageMask` is a bitmask of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)
specifying the [source stage    mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks).
If set to [VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html), it is equivalent to
setting it to [VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits.html).

* 
`dstStageMask` is a bitmask of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)
specifying the [destination    stage mask](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-masks) If set to [VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html), it is
equivalent to setting it to [VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits.html).

* 
`srcAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[source access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

* 
`dstAccessMask` is a bitmask of [VkAccessFlagBits](VkAccessFlagBits.html) specifying a
[destination access mask](../../../../spec/latest/chapters/synchronization.html#synchronization-access-masks).

* 
`dependencyFlags` is a bitmask of [VkDependencyFlagBits](VkDependencyFlagBits.html).

* 
`viewOffset` controls which views in the source subpass the views in
the destination subpass depend on.

Parameters defined by this structure with the same name as those in
[VkSubpassDependency](VkSubpassDependency.html) have the identical effect to those parameters.

`viewOffset` has the same effect for the described subpass dependency as
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewOffsets` has on each
corresponding subpass dependency.

If a [VkMemoryBarrier2](VkMemoryBarrier2.html) is included in the `pNext` chain,
`srcStageMask`, `dstStageMask`, `srcAccessMask`, and
`dstAccessMask` parameters are ignored.
The synchronization and access scopes instead are defined by the parameters
of [VkMemoryBarrier2](VkMemoryBarrier2.html).
If either `srcStageMask` or `dstStageMask` are set to
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html), it is equivalent to setting
[VK_PIPELINE_STAGE_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits.html).

Valid Usage

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04090) VUID-VkSubpassDependency2-srcStageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04091) VUID-VkSubpassDependency2-srcStageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04092) VUID-VkSubpassDependency2-srcStageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04093) VUID-VkSubpassDependency2-srcStageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04094) VUID-VkSubpassDependency2-srcStageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04095) VUID-VkSubpassDependency2-srcStageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-04096) VUID-VkSubpassDependency2-srcStageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-07318) VUID-VkSubpassDependency2-srcStageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-03937) VUID-VkSubpassDependency2-srcStageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `srcStageMask` **must** not be `0`

* 
[](#VUID-VkSubpassDependency2-srcStageMask-07949) VUID-VkSubpassDependency2-srcStageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcStageMask-10754) VUID-VkSubpassDependency2-srcStageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04090) VUID-VkSubpassDependency2-dstStageMask-04090

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04091) VUID-VkSubpassDependency2-dstStageMask-04091

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04092) VUID-VkSubpassDependency2-dstStageMask-04092

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04093) VUID-VkSubpassDependency2-dstStageMask-04093

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04094) VUID-VkSubpassDependency2-dstStageMask-04094

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04095) VUID-VkSubpassDependency2-dstStageMask-04095

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-04096) VUID-VkSubpassDependency2-dstStageMask-04096

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-07318) VUID-VkSubpassDependency2-dstStageMask-07318

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-03937) VUID-VkSubpassDependency2-dstStageMask-03937

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `dstStageMask` **must** not be `0`

* 
[](#VUID-VkSubpassDependency2-dstStageMask-07949) VUID-VkSubpassDependency2-dstStageMask-07949

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-dstStageMask-10754) VUID-VkSubpassDependency2-dstStageMask-10754

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-srcSubpass-03084) VUID-VkSubpassDependency2-srcSubpass-03084

`srcSubpass` **must** be less than or equal to `dstSubpass`, unless
one of them is [VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html), to avoid cyclic dependencies
and ensure a valid execution order

* 
[](#VUID-VkSubpassDependency2-srcSubpass-03085) VUID-VkSubpassDependency2-srcSubpass-03085

`srcSubpass` and `dstSubpass` **must** not both be equal to
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html)

* 
[](#VUID-VkSubpassDependency2-srcSubpass-06810) VUID-VkSubpassDependency2-srcSubpass-06810

If `srcSubpass` is equal to `dstSubpass` and `srcStageMask`
includes a [framebuffer-space    stage](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions), `dstStageMask` **must** only contain
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions)

* 
[](#VUID-VkSubpassDependency2-srcAccessMask-03088) VUID-VkSubpassDependency2-srcAccessMask-03088

Any access flag included in `srcAccessMask` **must** be supported by
one of the pipeline stages in `srcStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-VkSubpassDependency2-dstAccessMask-03089) VUID-VkSubpassDependency2-dstAccessMask-03089

Any access flag included in `dstAccessMask` **must** be supported by
one of the pipeline stages in `dstStageMask`, as specified in the
[table of supported access    types](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types-supported)

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-03090) VUID-VkSubpassDependency2-dependencyFlags-03090

If `dependencyFlags` includes [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html),
`srcSubpass` **must** not be equal to [VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html)

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-03091) VUID-VkSubpassDependency2-dependencyFlags-03091

If `dependencyFlags` includes [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html),
`dstSubpass` **must** not be equal to [VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html)

* 
[](#VUID-VkSubpassDependency2-srcSubpass-02245) VUID-VkSubpassDependency2-srcSubpass-02245

If `srcSubpass` equals `dstSubpass`, and `srcStageMask` and
`dstStageMask` both include a
[framebuffer-space stage](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions), then
`dependencyFlags` **must** include [VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-VkSubpassDependency2-viewOffset-02530) VUID-VkSubpassDependency2-viewOffset-02530

If `viewOffset` is not equal to `0`, `srcSubpass` **must** not be
equal to `dstSubpass`

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-03092) VUID-VkSubpassDependency2-dependencyFlags-03092

If `dependencyFlags` does not include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html), `viewOffset` **must** be `0`

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-10204) VUID-VkSubpassDependency2-dependencyFlags-10204

`dependencyFlags` **must** not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDependency2-sType-sType) VUID-VkSubpassDependency2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2](VkStructureType.html)

* 
[](#VUID-VkSubpassDependency2-pNext-pNext) VUID-VkSubpassDependency2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkMemoryBarrier2](VkMemoryBarrier2.html) or [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html)

* 
[](#VUID-VkSubpassDependency2-sType-unique) VUID-VkSubpassDependency2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSubpassDependency2-srcStageMask-parameter) VUID-VkSubpassDependency2-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-VkSubpassDependency2-dstStageMask-parameter) VUID-VkSubpassDependency2-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) values

* 
[](#VUID-VkSubpassDependency2-srcAccessMask-parameter) VUID-VkSubpassDependency2-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits](VkAccessFlagBits.html) values

* 
[](#VUID-VkSubpassDependency2-dstAccessMask-parameter) VUID-VkSubpassDependency2-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits](VkAccessFlagBits.html) values

* 
[](#VUID-VkSubpassDependency2-dependencyFlags-parameter) VUID-VkSubpassDependency2-dependencyFlags-parameter

 `dependencyFlags` **must** be a valid combination of [VkDependencyFlagBits](VkDependencyFlagBits.html) values

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkAccessFlags](VkAccessFlags.html), [VkDependencyFlags](VkDependencyFlags.html), [VkPipelineStageFlags](VkPipelineStageFlags.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassDependency2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
