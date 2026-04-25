# VkMemoryBarrier2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryBarrier2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryBarrier2 - Structure specifying a global memory barrier

The `VkMemoryBarrier2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkMemoryBarrier2 {
    VkStructureType          sType;
    const void*              pNext;
    VkPipelineStageFlags2    srcStageMask;
    VkAccessFlags2           srcAccessMask;
    VkPipelineStageFlags2    dstStageMask;
    VkAccessFlags2           dstAccessMask;
} VkMemoryBarrier2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkMemoryBarrier2
typedef VkMemoryBarrier2 VkMemoryBarrier2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcStageMask` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline
stages to be included in the [    first synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes).

* 
`srcAccessMask` is a [VkAccessFlags2](VkAccessFlags2.html) mask of access flags to be
included in the [first    access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes).

* 
`dstStageMask` is a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask of pipeline
stages to be included in the [    second synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes).

* 
`dstAccessMask` is a [VkAccessFlags2](VkAccessFlags2.html) mask of access flags to be
included in the [second    access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes).

This structure defines a [memory dependency](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-memory) affecting all device memory.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) and
[access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by the
source stage mask and source access mask.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
destination stage mask and destination access mask.

Valid Usage

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03929) VUID-VkMemoryBarrier2-srcStageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03930) VUID-VkMemoryBarrier2-srcStageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03931) VUID-VkMemoryBarrier2-srcStageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03932) VUID-VkMemoryBarrier2-srcStageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03933) VUID-VkMemoryBarrier2-srcStageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03934) VUID-VkMemoryBarrier2-srcStageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-03935) VUID-VkMemoryBarrier2-srcStageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-07316) VUID-VkMemoryBarrier2-srcStageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-04957) VUID-VkMemoryBarrier2-srcStageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-04995) VUID-VkMemoryBarrier2-srcStageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-07946) VUID-VkMemoryBarrier2-srcStageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-10751) VUID-VkMemoryBarrier2-srcStageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-10752) VUID-VkMemoryBarrier2-srcStageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-10753) VUID-VkMemoryBarrier2-srcStageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03900) VUID-VkMemoryBarrier2-srcAccessMask-03900

If `srcAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03901) VUID-VkMemoryBarrier2-srcAccessMask-03901

If `srcAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03902) VUID-VkMemoryBarrier2-srcAccessMask-03902

If `srcAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03903) VUID-VkMemoryBarrier2-srcAccessMask-03903

If `srcAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03904) VUID-VkMemoryBarrier2-srcAccessMask-03904

If `srcAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03905) VUID-VkMemoryBarrier2-srcAccessMask-03905

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03906) VUID-VkMemoryBarrier2-srcAccessMask-03906

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03907) VUID-VkMemoryBarrier2-srcAccessMask-03907

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07454) VUID-VkMemoryBarrier2-srcAccessMask-07454

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03909) VUID-VkMemoryBarrier2-srcAccessMask-03909

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03910) VUID-VkMemoryBarrier2-srcAccessMask-03910

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03911) VUID-VkMemoryBarrier2-srcAccessMask-03911

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03912) VUID-VkMemoryBarrier2-srcAccessMask-03912

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03913) VUID-VkMemoryBarrier2-srcAccessMask-03913

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03914) VUID-VkMemoryBarrier2-srcAccessMask-03914

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_BLIT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](VkPipelineStageFlagBits2.html),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03915) VUID-VkMemoryBarrier2-srcAccessMask-03915

If `srcAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_BLIT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](VkPipelineStageFlagBits2.html),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03916) VUID-VkMemoryBarrier2-srcAccessMask-03916

If `srcAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03917) VUID-VkMemoryBarrier2-srcAccessMask-03917

If `srcAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03918) VUID-VkMemoryBarrier2-srcAccessMask-03918

If `srcAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03919) VUID-VkMemoryBarrier2-srcAccessMask-03919

If `srcAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03920) VUID-VkMemoryBarrier2-srcAccessMask-03920

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04747) VUID-VkMemoryBarrier2-srcAccessMask-04747

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03922) VUID-VkMemoryBarrier2-srcAccessMask-03922

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03923) VUID-VkMemoryBarrier2-srcAccessMask-03923

If `srcAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04994) VUID-VkMemoryBarrier2-srcAccessMask-04994

If `srcAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03924) VUID-VkMemoryBarrier2-srcAccessMask-03924

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03925) VUID-VkMemoryBarrier2-srcAccessMask-03925

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03926) VUID-VkMemoryBarrier2-srcAccessMask-03926

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03927) VUID-VkMemoryBarrier2-srcAccessMask-03927

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-03928) VUID-VkMemoryBarrier2-srcAccessMask-03928

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-06256) VUID-VkMemoryBarrier2-srcAccessMask-06256

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
`srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07272) VUID-VkMemoryBarrier2-srcAccessMask-07272

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04858) VUID-VkMemoryBarrier2-srcAccessMask-04858

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04859) VUID-VkMemoryBarrier2-srcAccessMask-04859

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04860) VUID-VkMemoryBarrier2-srcAccessMask-04860

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-04861) VUID-VkMemoryBarrier2-srcAccessMask-04861

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07455) VUID-VkMemoryBarrier2-srcAccessMask-07455

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07456) VUID-VkMemoryBarrier2-srcAccessMask-07456

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07457) VUID-VkMemoryBarrier2-srcAccessMask-07457

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-07458) VUID-VkMemoryBarrier2-srcAccessMask-07458

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-08118) VUID-VkMemoryBarrier2-srcAccessMask-08118

If `srcAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-10670) VUID-VkMemoryBarrier2-srcAccessMask-10670

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-10671) VUID-VkMemoryBarrier2-srcAccessMask-10671

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-11771) VUID-VkMemoryBarrier2-srcAccessMask-11771

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-11772) VUID-VkMemoryBarrier2-srcAccessMask-11772

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-11294) VUID-VkMemoryBarrier2-srcAccessMask-11294

If `srcAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03929) VUID-VkMemoryBarrier2-dstStageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03930) VUID-VkMemoryBarrier2-dstStageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03931) VUID-VkMemoryBarrier2-dstStageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03932) VUID-VkMemoryBarrier2-dstStageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03933) VUID-VkMemoryBarrier2-dstStageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03934) VUID-VkMemoryBarrier2-dstStageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-03935) VUID-VkMemoryBarrier2-dstStageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-07316) VUID-VkMemoryBarrier2-dstStageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-04957) VUID-VkMemoryBarrier2-dstStageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-04995) VUID-VkMemoryBarrier2-dstStageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-07946) VUID-VkMemoryBarrier2-dstStageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-10751) VUID-VkMemoryBarrier2-dstStageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-10752) VUID-VkMemoryBarrier2-dstStageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-10753) VUID-VkMemoryBarrier2-dstStageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03900) VUID-VkMemoryBarrier2-dstAccessMask-03900

If `dstAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03901) VUID-VkMemoryBarrier2-dstAccessMask-03901

If `dstAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03902) VUID-VkMemoryBarrier2-dstAccessMask-03902

If `dstAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03903) VUID-VkMemoryBarrier2-dstAccessMask-03903

If `dstAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03904) VUID-VkMemoryBarrier2-dstAccessMask-03904

If `dstAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03905) VUID-VkMemoryBarrier2-dstAccessMask-03905

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03906) VUID-VkMemoryBarrier2-dstAccessMask-03906

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03907) VUID-VkMemoryBarrier2-dstAccessMask-03907

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07454) VUID-VkMemoryBarrier2-dstAccessMask-07454

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03909) VUID-VkMemoryBarrier2-dstAccessMask-03909

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03910) VUID-VkMemoryBarrier2-dstAccessMask-03910

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03911) VUID-VkMemoryBarrier2-dstAccessMask-03911

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03912) VUID-VkMemoryBarrier2-dstAccessMask-03912

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03913) VUID-VkMemoryBarrier2-dstAccessMask-03913

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03914) VUID-VkMemoryBarrier2-dstAccessMask-03914

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_BLIT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](VkPipelineStageFlagBits2.html),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03915) VUID-VkMemoryBarrier2-dstAccessMask-03915

If `dstAccessMask` includes [VK_ACCESS_2_TRANSFER_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_COPY_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_BLIT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_CLEAR_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](VkPipelineStageFlagBits2.html),
or [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03916) VUID-VkMemoryBarrier2-dstAccessMask-03916

If `dstAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03917) VUID-VkMemoryBarrier2-dstAccessMask-03917

If `dstAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03918) VUID-VkMemoryBarrier2-dstAccessMask-03918

If `dstAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03919) VUID-VkMemoryBarrier2-dstAccessMask-03919

If `dstAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03920) VUID-VkMemoryBarrier2-dstAccessMask-03920

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04747) VUID-VkMemoryBarrier2-dstAccessMask-04747

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03922) VUID-VkMemoryBarrier2-dstAccessMask-03922

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03923) VUID-VkMemoryBarrier2-dstAccessMask-03923

If `dstAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04994) VUID-VkMemoryBarrier2-dstAccessMask-04994

If `dstAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03924) VUID-VkMemoryBarrier2-dstAccessMask-03924

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03925) VUID-VkMemoryBarrier2-dstAccessMask-03925

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03926) VUID-VkMemoryBarrier2-dstAccessMask-03926

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03927) VUID-VkMemoryBarrier2-dstAccessMask-03927

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-03928) VUID-VkMemoryBarrier2-dstAccessMask-03928

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-06256) VUID-VkMemoryBarrier2-dstAccessMask-06256

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
`dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07272) VUID-VkMemoryBarrier2-dstAccessMask-07272

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04858) VUID-VkMemoryBarrier2-dstAccessMask-04858

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04859) VUID-VkMemoryBarrier2-dstAccessMask-04859

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04860) VUID-VkMemoryBarrier2-dstAccessMask-04860

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-04861) VUID-VkMemoryBarrier2-dstAccessMask-04861

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07455) VUID-VkMemoryBarrier2-dstAccessMask-07455

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07456) VUID-VkMemoryBarrier2-dstAccessMask-07456

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07457) VUID-VkMemoryBarrier2-dstAccessMask-07457

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-07458) VUID-VkMemoryBarrier2-dstAccessMask-07458

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-08118) VUID-VkMemoryBarrier2-dstAccessMask-08118

If `dstAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-10670) VUID-VkMemoryBarrier2-dstAccessMask-10670

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-10671) VUID-VkMemoryBarrier2-dstAccessMask-10671

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-11771) VUID-VkMemoryBarrier2-dstAccessMask-11771

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-11772) VUID-VkMemoryBarrier2-dstAccessMask-11772

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-11294) VUID-VkMemoryBarrier2-dstAccessMask-11294

If `dstAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryBarrier2-sType-sType) VUID-VkMemoryBarrier2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_BARRIER_2](VkStructureType.html)

* 
[](#VUID-VkMemoryBarrier2-srcStageMask-parameter) VUID-VkMemoryBarrier2-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkMemoryBarrier2-srcAccessMask-parameter) VUID-VkMemoryBarrier2-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

* 
[](#VUID-VkMemoryBarrier2-dstStageMask-parameter) VUID-VkMemoryBarrier2-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkMemoryBarrier2-dstAccessMask-parameter) VUID-VkMemoryBarrier2-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDependency2](VkSubpassDependency2.html)

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkAccessFlags2](VkAccessFlags2.html), [VkDependencyInfo](VkDependencyInfo.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkMemoryBarrier2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
