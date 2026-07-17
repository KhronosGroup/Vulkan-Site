# VkRayTracingPipelineCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingPipelineCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingPipelineCreateInfoNV - Structure specifying parameters of a newly created ray tracing pipeline

The `VkRayTracingPipelineCreateInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkRayTracingPipelineCreateInfoNV {
    VkStructureType                               sType;
    const void*                                   pNext;
    VkPipelineCreateFlags                         flags;
    uint32_t                                      stageCount;
    const VkPipelineShaderStageCreateInfo*        pStages;
    uint32_t                                      groupCount;
    const VkRayTracingShaderGroupCreateInfoNV*    pGroups;
    uint32_t                                      maxRecursionDepth;
    VkPipelineLayout                              layout;
    VkPipeline                                    basePipelineHandle;
    int32_t                                       basePipelineIndex;
} VkRayTracingPipelineCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) specifying
how the pipeline will be generated.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array of
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures specifying the set of
the shader stages to be included in the ray tracing pipeline.

* 
`groupCount` is the number of entries in the `pGroups` array.

* 
`pGroups` is a pointer to an array of
[VkRayTracingShaderGroupCreateInfoNV](VkRayTracingShaderGroupCreateInfoNV.html) structures describing the set
of the shader stages to be included in each shader group in the ray
tracing pipeline.

* 
`maxRecursionDepth` is the [maximum    recursion depth](../../../../spec/latest/chapters/raytracing.html#ray-tracing-recursion-depth) of shaders executed by this pipeline.

* 
`layout` is the description of binding locations used by both the
    pipeline and descriptor sets used with the pipeline.
    If
    [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is greater than or
    equal to Vulkan 1.3
or
    [VK_KHR_maintenance4](VK_KHR_maintenance4.html) is enabled
    `layout` **must** not be accessed by the implementation outside of the
    duration of the command this structure is passed to.

* 
`basePipelineHandle` is a pipeline to derive from.

* 
`basePipelineIndex` is an index into the `pCreateInfos`
parameter to use as a pipeline to derive from.

The parameters `basePipelineHandle` and `basePipelineIndex` are
described in more detail in [Pipeline Derivatives](../../../../spec/latest/chapters/pipelines.html#pipelines-pipeline-derivatives).

If the `pNext` chain includes a [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)
structure, [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)::`flags` from that
structure is used instead of `flags` from this structure.

Valid Usage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-None-09497) VUID-VkRayTracingPipelineCreateInfoNV-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) values

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07984) VUID-VkRayTracingPipelineCreateInfoNV-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid ray tracing `VkPipeline` handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07985) VUID-VkRayTracingPipelineCreateInfoNV-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07986) VUID-VkRayTracingPipelineCreateInfoNV-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07987) VUID-VkRayTracingPipelineCreateInfoNV-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-10069) VUID-VkRayTracingPipelineCreateInfoNV-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07988) VUID-VkRayTracingPipelineCreateInfoNV-layout-07988

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07990) VUID-VkRayTracingPipelineCreateInfoNV-layout-07990

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07991) VUID-VkRayTracingPipelineCreateInfoNV-layout-07991

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-None-10391) VUID-VkRayTracingPipelineCreateInfoNV-None-10391

If a [resource variables](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11798) VUID-VkRayTracingPipelineCreateInfoNV-flags-11798

If [shader64BitIndexing](../../../../spec/latest/chapters/features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pipelineCreationCacheControl-02878) VUID-VkRayTracingPipelineCreateInfoNV-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](../../../../spec/latest/chapters/features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pipelineProtectedAccess-07368) VUID-VkRayTracingPipelineCreateInfoNV-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07369) VUID-VkRayTracingPipelineCreateInfoNV-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11311) VUID-VkRayTracingPipelineCreateInfoNV-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), `layout` **must**
be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11312) VUID-VkRayTracingPipelineCreateInfoNV-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all shader variables
in the [shader resource interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html)::pMappings

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pStages-03426) VUID-VkRayTracingPipelineCreateInfoNV-pStages-03426

The shader code for the entry points identified by `pStages`, and
the rest of the state identified by this structure **must** adhere to the
pipeline linking rules described in the [Shader Interfaces](../../../../spec/latest/chapters/interfaces.html#interfaces)
chapter

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-03428) VUID-VkRayTracingPipelineCreateInfoNV-layout-03428

The number of resources in `layout` accessible to each shader stage
that is used by the pipeline **must** be less than or equal to
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxPerStageResources`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-02904) VUID-VkRayTracingPipelineCreateInfoNV-flags-02904

`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-12341) VUID-VkRayTracingPipelineCreateInfoNV-flags-12341

`flags` **must** not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-stage-06232) VUID-VkRayTracingPipelineCreateInfoNV-stage-06232

The `stage` member of at least one element of `pStages` **must** be
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](VkShaderStageFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03456) VUID-VkRayTracingPipelineCreateInfoNV-flags-03456

`flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-maxRecursionDepth-03457) VUID-VkRayTracingPipelineCreateInfoNV-maxRecursionDepth-03457

`maxRecursionDepth` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`maxRecursionDepth`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03458) VUID-VkRayTracingPipelineCreateInfoNV-flags-03458

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03459) VUID-VkRayTracingPipelineCreateInfoNV-flags-03459

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03460) VUID-VkRayTracingPipelineCreateInfoNV-flags-03460

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03461) VUID-VkRayTracingPipelineCreateInfoNV-flags-03461

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03462) VUID-VkRayTracingPipelineCreateInfoNV-flags-03462

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03463) VUID-VkRayTracingPipelineCreateInfoNV-flags-03463

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03588) VUID-VkRayTracingPipelineCreateInfoNV-flags-03588

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-04948) VUID-VkRayTracingPipelineCreateInfoNV-flags-04948

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-02957) VUID-VkRayTracingPipelineCreateInfoNV-flags-02957

`flags` **must** not include both
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) at the
same time

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pipelineStageCreationFeedbackCount-06651) VUID-VkRayTracingPipelineCreateInfoNV-pipelineStageCreationFeedbackCount-06651

If
[VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be equal to `stageCount`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-stage-06898) VUID-VkRayTracingPipelineCreateInfoNV-stage-06898

The `stage` value in all `pStages` elements **must** be one of
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_MISS_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](VkShaderStageFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07402) VUID-VkRayTracingPipelineCreateInfoNV-flags-07402

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07998) VUID-VkRayTracingPipelineCreateInfoNV-flags-07998

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11008) VUID-VkRayTracingPipelineCreateInfoNV-flags-11008

`flags` **must** not include
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-None-11368) VUID-VkRayTracingPipelineCreateInfoNV-None-11368

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
`layout` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-sType-sType) VUID-VkRayTracingPipelineCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pNext-pNext) VUID-VkRayTracingPipelineCreateInfoNV-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html) or [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-sType-unique) VUID-VkRayTracingPipelineCreateInfoNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pStages-parameter) VUID-VkRayTracingPipelineCreateInfoNV-pStages-parameter

 `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pGroups-parameter) VUID-VkRayTracingPipelineCreateInfoNV-pGroups-parameter

 `pGroups` **must** be a valid pointer to an array of `groupCount` valid [VkRayTracingShaderGroupCreateInfoNV](VkRayTracingShaderGroupCreateInfoNV.html) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-parameter) VUID-VkRayTracingPipelineCreateInfoNV-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-stageCount-arraylength) VUID-VkRayTracingPipelineCreateInfoNV-stageCount-arraylength

 `stageCount` **must** be greater than `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-groupCount-arraylength) VUID-VkRayTracingPipelineCreateInfoNV-groupCount-arraylength

 `groupCount` **must** be greater than `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-commonparent) VUID-VkRayTracingPipelineCreateInfoNV-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkPipeline](VkPipeline.html), [VkPipelineCreateFlags](VkPipelineCreateFlags.html), [VkPipelineLayout](VkPipelineLayout.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkRayTracingShaderGroupCreateInfoNV](VkRayTracingShaderGroupCreateInfoNV.html), [VkStructureType](VkStructureType.html), [vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkRayTracingPipelineCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
