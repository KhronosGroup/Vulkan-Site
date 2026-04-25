# VkBufferMemoryBarrier2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferMemoryBarrier2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferMemoryBarrier2 - Structure specifying a buffer memory barrier

The `VkBufferMemoryBarrier2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkBufferMemoryBarrier2 {
    VkStructureType          sType;
    const void*              pNext;
    VkPipelineStageFlags2    srcStageMask;
    VkAccessFlags2           srcAccessMask;
    VkPipelineStageFlags2    dstStageMask;
    VkAccessFlags2           dstAccessMask;
    uint32_t                 srcQueueFamilyIndex;
    uint32_t                 dstQueueFamilyIndex;
    VkBuffer                 buffer;
    VkDeviceSize             offset;
    VkDeviceSize             size;
} VkBufferMemoryBarrier2;

// Provided by VK_KHR_synchronization2
// Equivalent to VkBufferMemoryBarrier2
typedef VkBufferMemoryBarrier2 VkBufferMemoryBarrier2KHR;

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

* 
`srcQueueFamilyIndex` is the source queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`dstQueueFamilyIndex` is the destination queue family for a
[queue family ownership transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).

* 
`buffer` is a handle to the buffer whose backing memory is affected
by the barrier.

* 
`offset` is an offset in bytes into the backing memory for
`buffer`; this is relative to the base offset as bound to the buffer
(see [vkBindBufferMemory](vkBindBufferMemory.html)).

* 
`size` is a size in bytes of the affected area of backing memory for
`buffer`, or [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) to use the range from `offset`
to the end of the buffer.

This structure defines a [memory dependency](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-memory) limited to a range of a buffer, and **can** define a
[queue family ownership transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) for that range.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) and
[access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by the
source stage mask and the source access mask.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
the destination stage mask and the destination access mask.

Both [access scopes](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) are
limited to only memory accesses to `buffer` in the range defined by
`offset` and `size`.

If `buffer` was created with [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and
`srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, this
memory barrier defines a [queue family ownership transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).
When executed on a queue in the family identified by
`srcQueueFamilyIndex`, this barrier defines a
[queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release)
for the specified buffer range, and
if [VkDependencyInfoKHR](VkDependencyInfo.html)::`dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the second synchronization scope does not apply to this operation.
When executed on a queue in the family identified by
`dstQueueFamilyIndex`, this barrier defines a
[queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire)
for the specified buffer range, and
if [VkDependencyInfoKHR](VkDependencyInfo.html)::`dependencyFlags` did not include
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the first synchronization scope does not apply to this operation.

A [queue family ownership transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) is also defined if the values are not equal, and either is one
of the special queue family values reserved for external memory ownership
transfers, as described in [Queue Family Ownership Transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).
A [queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release) is defined when `dstQueueFamilyIndex` is one of those
values, and a [queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire) is defined when `srcQueueFamilyIndex` is one of
those values.

Valid Usage

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03929) VUID-VkBufferMemoryBarrier2-srcStageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03930) VUID-VkBufferMemoryBarrier2-srcStageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03931) VUID-VkBufferMemoryBarrier2-srcStageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03932) VUID-VkBufferMemoryBarrier2-srcStageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03933) VUID-VkBufferMemoryBarrier2-srcStageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03934) VUID-VkBufferMemoryBarrier2-srcStageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03935) VUID-VkBufferMemoryBarrier2-srcStageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-07316) VUID-VkBufferMemoryBarrier2-srcStageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-04957) VUID-VkBufferMemoryBarrier2-srcStageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-04995) VUID-VkBufferMemoryBarrier2-srcStageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-07946) VUID-VkBufferMemoryBarrier2-srcStageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-10751) VUID-VkBufferMemoryBarrier2-srcStageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-10752) VUID-VkBufferMemoryBarrier2-srcStageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-10753) VUID-VkBufferMemoryBarrier2-srcStageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03900) VUID-VkBufferMemoryBarrier2-srcAccessMask-03900

If `srcAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03901) VUID-VkBufferMemoryBarrier2-srcAccessMask-03901

If `srcAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03902) VUID-VkBufferMemoryBarrier2-srcAccessMask-03902

If `srcAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03903) VUID-VkBufferMemoryBarrier2-srcAccessMask-03903

If `srcAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03904) VUID-VkBufferMemoryBarrier2-srcAccessMask-03904

If `srcAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03905) VUID-VkBufferMemoryBarrier2-srcAccessMask-03905

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03906) VUID-VkBufferMemoryBarrier2-srcAccessMask-03906

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03907) VUID-VkBufferMemoryBarrier2-srcAccessMask-03907

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07454) VUID-VkBufferMemoryBarrier2-srcAccessMask-07454

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03909) VUID-VkBufferMemoryBarrier2-srcAccessMask-03909

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03910) VUID-VkBufferMemoryBarrier2-srcAccessMask-03910

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03911) VUID-VkBufferMemoryBarrier2-srcAccessMask-03911

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03912) VUID-VkBufferMemoryBarrier2-srcAccessMask-03912

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03913) VUID-VkBufferMemoryBarrier2-srcAccessMask-03913

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03914) VUID-VkBufferMemoryBarrier2-srcAccessMask-03914

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
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03915) VUID-VkBufferMemoryBarrier2-srcAccessMask-03915

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
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03916) VUID-VkBufferMemoryBarrier2-srcAccessMask-03916

If `srcAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03917) VUID-VkBufferMemoryBarrier2-srcAccessMask-03917

If `srcAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03918) VUID-VkBufferMemoryBarrier2-srcAccessMask-03918

If `srcAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03919) VUID-VkBufferMemoryBarrier2-srcAccessMask-03919

If `srcAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03920) VUID-VkBufferMemoryBarrier2-srcAccessMask-03920

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04747) VUID-VkBufferMemoryBarrier2-srcAccessMask-04747

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03922) VUID-VkBufferMemoryBarrier2-srcAccessMask-03922

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03923) VUID-VkBufferMemoryBarrier2-srcAccessMask-03923

If `srcAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04994) VUID-VkBufferMemoryBarrier2-srcAccessMask-04994

If `srcAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03924) VUID-VkBufferMemoryBarrier2-srcAccessMask-03924

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03925) VUID-VkBufferMemoryBarrier2-srcAccessMask-03925

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03926) VUID-VkBufferMemoryBarrier2-srcAccessMask-03926

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03927) VUID-VkBufferMemoryBarrier2-srcAccessMask-03927

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-03928) VUID-VkBufferMemoryBarrier2-srcAccessMask-03928

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-06256) VUID-VkBufferMemoryBarrier2-srcAccessMask-06256

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
`srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07272) VUID-VkBufferMemoryBarrier2-srcAccessMask-07272

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04858) VUID-VkBufferMemoryBarrier2-srcAccessMask-04858

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04859) VUID-VkBufferMemoryBarrier2-srcAccessMask-04859

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04860) VUID-VkBufferMemoryBarrier2-srcAccessMask-04860

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-04861) VUID-VkBufferMemoryBarrier2-srcAccessMask-04861

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07455) VUID-VkBufferMemoryBarrier2-srcAccessMask-07455

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07456) VUID-VkBufferMemoryBarrier2-srcAccessMask-07456

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07457) VUID-VkBufferMemoryBarrier2-srcAccessMask-07457

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-07458) VUID-VkBufferMemoryBarrier2-srcAccessMask-07458

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-08118) VUID-VkBufferMemoryBarrier2-srcAccessMask-08118

If `srcAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-10670) VUID-VkBufferMemoryBarrier2-srcAccessMask-10670

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-10671) VUID-VkBufferMemoryBarrier2-srcAccessMask-10671

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-11771) VUID-VkBufferMemoryBarrier2-srcAccessMask-11771

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-11772) VUID-VkBufferMemoryBarrier2-srcAccessMask-11772

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-11294) VUID-VkBufferMemoryBarrier2-srcAccessMask-11294

If `srcAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03929) VUID-VkBufferMemoryBarrier2-dstStageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03930) VUID-VkBufferMemoryBarrier2-dstStageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03931) VUID-VkBufferMemoryBarrier2-dstStageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03932) VUID-VkBufferMemoryBarrier2-dstStageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03933) VUID-VkBufferMemoryBarrier2-dstStageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03934) VUID-VkBufferMemoryBarrier2-dstStageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-03935) VUID-VkBufferMemoryBarrier2-dstStageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-07316) VUID-VkBufferMemoryBarrier2-dstStageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-04957) VUID-VkBufferMemoryBarrier2-dstStageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-04995) VUID-VkBufferMemoryBarrier2-dstStageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-07946) VUID-VkBufferMemoryBarrier2-dstStageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-10751) VUID-VkBufferMemoryBarrier2-dstStageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-10752) VUID-VkBufferMemoryBarrier2-dstStageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-10753) VUID-VkBufferMemoryBarrier2-dstStageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03900) VUID-VkBufferMemoryBarrier2-dstAccessMask-03900

If `dstAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03901) VUID-VkBufferMemoryBarrier2-dstAccessMask-03901

If `dstAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03902) VUID-VkBufferMemoryBarrier2-dstAccessMask-03902

If `dstAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03903) VUID-VkBufferMemoryBarrier2-dstAccessMask-03903

If `dstAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03904) VUID-VkBufferMemoryBarrier2-dstAccessMask-03904

If `dstAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03905) VUID-VkBufferMemoryBarrier2-dstAccessMask-03905

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03906) VUID-VkBufferMemoryBarrier2-dstAccessMask-03906

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03907) VUID-VkBufferMemoryBarrier2-dstAccessMask-03907

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07454) VUID-VkBufferMemoryBarrier2-dstAccessMask-07454

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03909) VUID-VkBufferMemoryBarrier2-dstAccessMask-03909

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03910) VUID-VkBufferMemoryBarrier2-dstAccessMask-03910

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03911) VUID-VkBufferMemoryBarrier2-dstAccessMask-03911

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03912) VUID-VkBufferMemoryBarrier2-dstAccessMask-03912

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03913) VUID-VkBufferMemoryBarrier2-dstAccessMask-03913

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03914) VUID-VkBufferMemoryBarrier2-dstAccessMask-03914

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
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03915) VUID-VkBufferMemoryBarrier2-dstAccessMask-03915

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
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03916) VUID-VkBufferMemoryBarrier2-dstAccessMask-03916

If `dstAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03917) VUID-VkBufferMemoryBarrier2-dstAccessMask-03917

If `dstAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03918) VUID-VkBufferMemoryBarrier2-dstAccessMask-03918

If `dstAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03919) VUID-VkBufferMemoryBarrier2-dstAccessMask-03919

If `dstAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03920) VUID-VkBufferMemoryBarrier2-dstAccessMask-03920

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04747) VUID-VkBufferMemoryBarrier2-dstAccessMask-04747

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03922) VUID-VkBufferMemoryBarrier2-dstAccessMask-03922

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03923) VUID-VkBufferMemoryBarrier2-dstAccessMask-03923

If `dstAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04994) VUID-VkBufferMemoryBarrier2-dstAccessMask-04994

If `dstAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03924) VUID-VkBufferMemoryBarrier2-dstAccessMask-03924

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03925) VUID-VkBufferMemoryBarrier2-dstAccessMask-03925

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03926) VUID-VkBufferMemoryBarrier2-dstAccessMask-03926

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03927) VUID-VkBufferMemoryBarrier2-dstAccessMask-03927

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-03928) VUID-VkBufferMemoryBarrier2-dstAccessMask-03928

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-06256) VUID-VkBufferMemoryBarrier2-dstAccessMask-06256

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
`dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07272) VUID-VkBufferMemoryBarrier2-dstAccessMask-07272

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04858) VUID-VkBufferMemoryBarrier2-dstAccessMask-04858

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04859) VUID-VkBufferMemoryBarrier2-dstAccessMask-04859

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04860) VUID-VkBufferMemoryBarrier2-dstAccessMask-04860

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-04861) VUID-VkBufferMemoryBarrier2-dstAccessMask-04861

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07455) VUID-VkBufferMemoryBarrier2-dstAccessMask-07455

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07456) VUID-VkBufferMemoryBarrier2-dstAccessMask-07456

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07457) VUID-VkBufferMemoryBarrier2-dstAccessMask-07457

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-07458) VUID-VkBufferMemoryBarrier2-dstAccessMask-07458

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-08118) VUID-VkBufferMemoryBarrier2-dstAccessMask-08118

If `dstAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-10670) VUID-VkBufferMemoryBarrier2-dstAccessMask-10670

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-10671) VUID-VkBufferMemoryBarrier2-dstAccessMask-10671

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-11771) VUID-VkBufferMemoryBarrier2-dstAccessMask-11771

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-11772) VUID-VkBufferMemoryBarrier2-dstAccessMask-11772

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-11294) VUID-VkBufferMemoryBarrier2-dstAccessMask-11294

If `dstAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkBufferMemoryBarrier2-offset-01187) VUID-VkBufferMemoryBarrier2-offset-01187

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-VkBufferMemoryBarrier2-size-01188) VUID-VkBufferMemoryBarrier2-size-01188

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
greater than `0`

* 
[](#VUID-VkBufferMemoryBarrier2-size-01189) VUID-VkBufferMemoryBarrier2-size-01189

If `size` is not equal to [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html), `size` **must** be
less than or equal to than the size of `buffer` minus `offset`

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-01931) VUID-VkBufferMemoryBarrier2-buffer-01931

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-09095) VUID-VkBufferMemoryBarrier2-buffer-09095

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `srcQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-09096) VUID-VkBufferMemoryBarrier2-buffer-09096

If `buffer` was created with a sharing mode of
[VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` are not equal, `dstQueueFamilyIndex` **must**
be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkBufferMemoryBarrier2-None-09097) VUID-VkBufferMemoryBarrier2-None-09097

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkBufferMemoryBarrier2-None-09098) VUID-VkBufferMemoryBarrier2-None-09098

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcQueueFamilyIndex-09099) VUID-VkBufferMemoryBarrier2-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkBufferMemoryBarrier2-dstQueueFamilyIndex-09100) VUID-VkBufferMemoryBarrier2-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-03851) VUID-VkBufferMemoryBarrier2-srcStageMask-03851

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

Valid Usage (Implicit)

* 
[](#VUID-VkBufferMemoryBarrier2-sType-sType) VUID-VkBufferMemoryBarrier2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2](VkStructureType.html)

* 
[](#VUID-VkBufferMemoryBarrier2-pNext-pNext) VUID-VkBufferMemoryBarrier2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalMemoryAcquireUnmodifiedEXT](VkExternalMemoryAcquireUnmodifiedEXT.html) or [VkMemoryBarrierAccessFlags3KHR](VkMemoryBarrierAccessFlags3KHR.html)

* 
[](#VUID-VkBufferMemoryBarrier2-sType-unique) VUID-VkBufferMemoryBarrier2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBufferMemoryBarrier2-srcStageMask-parameter) VUID-VkBufferMemoryBarrier2-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkBufferMemoryBarrier2-srcAccessMask-parameter) VUID-VkBufferMemoryBarrier2-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

* 
[](#VUID-VkBufferMemoryBarrier2-dstStageMask-parameter) VUID-VkBufferMemoryBarrier2-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkBufferMemoryBarrier2-dstAccessMask-parameter) VUID-VkBufferMemoryBarrier2-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

* 
[](#VUID-VkBufferMemoryBarrier2-buffer-parameter) VUID-VkBufferMemoryBarrier2-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkAccessFlags2](VkAccessFlags2.html), [VkBuffer](VkBuffer.html), [VkDependencyInfo](VkDependencyInfo.html), `VkDeviceSize`, [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkBufferMemoryBarrier2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
