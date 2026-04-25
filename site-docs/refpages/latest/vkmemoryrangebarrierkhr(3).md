# VkMemoryRangeBarrierKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryRangeBarrierKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryRangeBarrierKHR - Structure specifying a memory range barrier

The `VkMemoryRangeBarrierKHR` structure is defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkMemoryRangeBarrierKHR {
    VkStructureType             sType;
    const void*                 pNext;
    VkPipelineStageFlags2       srcStageMask;
    VkAccessFlags2              srcAccessMask;
    VkPipelineStageFlags2       dstStageMask;
    VkAccessFlags2              dstAccessMask;
    uint32_t                    srcQueueFamilyIndex;
    uint32_t                    dstQueueFamilyIndex;
    VkDeviceAddressRangeKHR     addressRange;
    VkAddressCommandFlagsKHR    addressFlags;
} VkMemoryRangeBarrierKHR;

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
`addressRange` is a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) structure
specifying the address range affected by the barrier.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining
the flags for the address range.

This structure defines a [memory dependency](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-memory) limited to an address range, and **can** define a
[queue family ownership transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) for that range.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) and
[access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described by
this structure include only operations and memory accesses specified by
`srcStageMask` and `srcAccessMask`.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) described
by this structure include only operations and memory accesses specified by
`dstStageMask` and `dstAccessMask`.

Both [access scopes](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) are
limited to only memory accesses to memory in `addressRange`.

If the buffer from which `address` was queried was created with a
sharing mode of [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and
`srcQueueFamilyIndex` is not equal to `dstQueueFamilyIndex`, this
memory range barrier defines a [queue family ownership transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).
When executed on a queue in the family identified by
`srcQueueFamilyIndex`, this barrier defines a
[queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release)
for the specified address range, and the second synchronization scope does
not apply to this operation.
When executed on a queue in the family identified by
`dstQueueFamilyIndex`, this barrier defines a
[queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire)
for the specified address range, and the first synchronization scope does
not apply to this operation.

A [queue family ownership transfer operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers) is also defined if the values are not equal, and either is one
of the special queue family values reserved for external memory ownership
transfers, as described in [Queue Family Ownership Transfer](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers).
A [queue family release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release) is defined when `dstQueueFamilyIndex` is one of those
values, and a [queue family acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire) is defined when `srcQueueFamilyIndex` is one of
those values.

Valid Usage

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13097) VUID-VkMemoryRangeBarrierKHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13098) VUID-VkMemoryRangeBarrierKHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13099) VUID-VkMemoryRangeBarrierKHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressFlags-13100) VUID-VkMemoryRangeBarrierKHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13122) VUID-VkMemoryRangeBarrierKHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13123) VUID-VkMemoryRangeBarrierKHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressFlags-13101) VUID-VkMemoryRangeBarrierKHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13124) VUID-VkMemoryRangeBarrierKHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressRange-13125) VUID-VkMemoryRangeBarrierKHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03929) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03930) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03931) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03932) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03933) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03934) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-03935) VUID-VkMemoryRangeBarrierKHR-srcStageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-07316) VUID-VkMemoryRangeBarrierKHR-srcStageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-04957) VUID-VkMemoryRangeBarrierKHR-srcStageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-04995) VUID-VkMemoryRangeBarrierKHR-srcStageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-07946) VUID-VkMemoryRangeBarrierKHR-srcStageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-10751) VUID-VkMemoryRangeBarrierKHR-srcStageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-10752) VUID-VkMemoryRangeBarrierKHR-srcStageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-10753) VUID-VkMemoryRangeBarrierKHR-srcStageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`srcStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03900) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03900

If `srcAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03901) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03901

If `srcAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03902) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03902

If `srcAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03903) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03903

If `srcAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03904) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03904

If `srcAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03905) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03905

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03906) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03906

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03907) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03907

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07454) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07454

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03909) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03909

If `srcAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03910) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03910

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03911) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03911

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03912) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03912

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03913) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03913

If `srcAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03914) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03914

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
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03915) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03915

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
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03916) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03916

If `srcAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03917) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03917

If `srcAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](VkAccessFlagBits2.html),
`srcStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03918) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03918

If `srcAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03919) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03919

If `srcAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03920) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03920

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04747) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04747

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03922) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03922

If `srcAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03923) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03923

If `srcAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04994) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04994

If `srcAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03924) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03924

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03925) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03925

If `srcAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03926) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03926

If `srcAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03927) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03927

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03928) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-03928

If `srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-06256) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-06256

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
`srcAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07272) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07272

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04858) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04858

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04859) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04859

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04860) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04860

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04861) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-04861

If `srcAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07455) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07455

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07456) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07456

If `srcAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07457) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07457

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07458) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-07458

If `srcAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-08118) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-08118

If `srcAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10670) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10670

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10671) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-10671

If `srcAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11771) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11771

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11772) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11772

If `srcAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`srcStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11294) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-11294

If `srcAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html), `srcStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03929) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03930) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03931) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03932) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03933) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03934) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-03935) VUID-VkMemoryRangeBarrierKHR-dstStageMask-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-07316) VUID-VkMemoryRangeBarrierKHR-dstStageMask-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-04957) VUID-VkMemoryRangeBarrierKHR-dstStageMask-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-04995) VUID-VkMemoryRangeBarrierKHR-dstStageMask-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-07946) VUID-VkMemoryRangeBarrierKHR-dstStageMask-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-10751) VUID-VkMemoryRangeBarrierKHR-dstStageMask-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-10752) VUID-VkMemoryRangeBarrierKHR-dstStageMask-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-10753) VUID-VkMemoryRangeBarrierKHR-dstStageMask-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`dstStageMask` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03900) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03900

If `dstAccessMask` includes
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03901) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03901

If `dstAccessMask` includes [VK_ACCESS_2_INDEX_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03902) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03902

If `dstAccessMask` includes
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03903) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03903

If `dstAccessMask` includes
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03904) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03904

If `dstAccessMask` includes [VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03905) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03905

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03906) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03906

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03907) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03907

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07454) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07454

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html),
or one of the `VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03909) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03909

If `dstAccessMask` includes [VK_ACCESS_2_SHADER_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03910) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03910

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03911) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03911

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03912) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03912

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03913) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03913

If `dstAccessMask` includes
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03914) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03914

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
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03915) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03915

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
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03916) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03916

If `dstAccessMask` includes [VK_ACCESS_2_HOST_READ_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03917) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03917

If `dstAccessMask` includes [VK_ACCESS_2_HOST_WRITE_BIT](VkAccessFlagBits2.html),
`dstStageMask` **must** include [VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03918) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03918

If `dstAccessMask` includes
[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03919) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03919

If `dstAccessMask` includes
[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03920) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03920

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04747) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04747

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03922) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03922

If `dstAccessMask` includes
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03923) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03923

If `dstAccessMask` includes
[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04994) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04994

If `dstAccessMask` includes
[VK_ACCESS_2_INVOCATION_MASK_READ_BIT_HUAWEI](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03924) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03924

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03925) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03925

If `dstAccessMask` includes
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03926) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03926

If `dstAccessMask` includes
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](VkPipelineStageFlagBits2.html)
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html), or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03927) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03927

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03928) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-03928

If `dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-06256) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-06256

If
the [`rayQuery`](../../../../spec/latest/chapters/features.html#features-rayQuery) feature is not enabled and
`dstAccessMask` includes
[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** not include any of the
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages
except [VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07272) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07272

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04858) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04858

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_READ_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04859) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04859

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_DECODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04860) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04860

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_READ_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04861) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-04861

If `dstAccessMask` includes
[VK_ACCESS_2_VIDEO_ENCODE_WRITE_BIT_KHR](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07455) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07455

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_READ_BIT_NV](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07456) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07456

If `dstAccessMask` includes
[VK_ACCESS_2_OPTICAL_FLOW_WRITE_BIT_NV](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07457) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07457

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07458) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-07458

If `dstAccessMask` includes
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask` **must**
include [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-08118) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-08118

If `dstAccessMask` includes
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10670) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10670

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_READ_BIT_QCOM](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10671) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-10671

If `dstAccessMask` includes
[VK_ACCESS_2_SHADER_TILE_ATTACHMENT_WRITE_BIT_QCOM](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11771) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11771

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_READ_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11772) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11772

If `dstAccessMask` includes
[VK_ACCESS_2_MEMORY_DECOMPRESSION_WRITE_BIT_EXT](VkAccessFlagBits2.html),
`dstStageMask` **must** include
[VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11294) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-11294

If `dstAccessMask` includes
[VK_ACCESS_2_SAMPLER_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_RESOURCE_HEAP_READ_BIT_EXT](VkAccessFlagBits2.html), `dstStageMask`
**must** include [VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](VkPipelineStageFlagBits2.html),
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](VkPipelineStageFlagBits2.html), or one of
`VK_PIPELINE_STAGE_*_SHADER_BIT` stages

* 
[](#VUID-VkMemoryRangeBarrierKHR-None-09097) VUID-VkMemoryRangeBarrierKHR-None-09097

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-None-09098) VUID-VkMemoryRangeBarrierKHR-None-09098

    
If
    the [VK_KHR_external_memory](VK_KHR_external_memory.html) extension is not enabled,
and
    the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
    the [VkInstance](VkInstance.html) is not greater than or equal to Version 1.1,
    `dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcQueueFamilyIndex-09099) VUID-VkMemoryRangeBarrierKHR-srcQueueFamilyIndex-09099

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`srcQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstQueueFamilyIndex-09100) VUID-VkMemoryRangeBarrierKHR-dstQueueFamilyIndex-09100

If the [VK_EXT_queue_family_foreign](VK_EXT_queue_family_foreign.html) extension is not enabled
`dstQueueFamilyIndex` **must** not be [VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-address-13087) VUID-VkMemoryRangeBarrierKHR-address-13087

If the buffer from which `address` was queried was created with a
sharing mode of [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` are not equal,
`srcQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkMemoryRangeBarrierKHR-address-13088) VUID-VkMemoryRangeBarrierKHR-address-13088

If the buffer from which `address` was queried was created with a
sharing mode of [VK_SHARING_MODE_EXCLUSIVE](VkSharingMode.html), and
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` are not equal,
`dstQueueFamilyIndex` **must** be
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html),
[VK_QUEUE_FAMILY_FOREIGN_EXT](VK_QUEUE_FAMILY_FOREIGN_EXT.html),
or
a valid queue family

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-13089) VUID-VkMemoryRangeBarrierKHR-srcStageMask-13089

If either `srcStageMask` or `dstStageMask` includes
[VK_PIPELINE_STAGE_2_HOST_BIT](VkPipelineStageFlagBits2.html), `srcQueueFamilyIndex` and
`dstQueueFamilyIndex` **must** be equal

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryRangeBarrierKHR-sType-sType) VUID-VkMemoryRangeBarrierKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIER_KHR](VkStructureType.html)

* 
[](#VUID-VkMemoryRangeBarrierKHR-pNext-pNext) VUID-VkMemoryRangeBarrierKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcStageMask-parameter) VUID-VkMemoryRangeBarrierKHR-srcStageMask-parameter

 `srcStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-srcAccessMask-parameter) VUID-VkMemoryRangeBarrierKHR-srcAccessMask-parameter

 `srcAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstStageMask-parameter) VUID-VkMemoryRangeBarrierKHR-dstStageMask-parameter

 `dstStageMask` **must** be a valid combination of [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-dstAccessMask-parameter) VUID-VkMemoryRangeBarrierKHR-dstAccessMask-parameter

 `dstAccessMask` **must** be a valid combination of [VkAccessFlagBits2](VkAccessFlagBits2.html) values

* 
[](#VUID-VkMemoryRangeBarrierKHR-addressFlags-parameter) VUID-VkMemoryRangeBarrierKHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAccessFlags2](VkAccessFlags2.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkMemoryRangeBarriersInfoKHR](VkMemoryRangeBarriersInfoKHR.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkMemoryRangeBarrierKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
