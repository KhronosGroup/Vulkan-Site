# VkRayTracingPipelineCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingPipelineCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingPipelineCreateInfoKHR - Structure specifying parameters of a newly created ray tracing pipeline

The `VkRayTracingPipelineCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkRayTracingPipelineCreateInfoKHR {
    VkStructureType                                      sType;
    const void*                                          pNext;
    VkPipelineCreateFlags                                flags;
    uint32_t                                             stageCount;
    const VkPipelineShaderStageCreateInfo*               pStages;
    uint32_t                                             groupCount;
    const VkRayTracingShaderGroupCreateInfoKHR*          pGroups;
    uint32_t                                             maxPipelineRayRecursionDepth;
    const VkPipelineLibraryCreateInfoKHR*                pLibraryInfo;
    const VkRayTracingPipelineInterfaceCreateInfoKHR*    pLibraryInterface;
    const VkPipelineDynamicStateCreateInfo*              pDynamicState;
    VkPipelineLayout                                     layout;
    VkPipeline                                           basePipelineHandle;
    int32_t                                              basePipelineIndex;
} VkRayTracingPipelineCreateInfoKHR;

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
`pStages` is a pointer to an array of `stageCount`
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures describing the set of
the shader stages to be included in the ray tracing pipeline.

* 
`groupCount` is the number of entries in the `pGroups` array.

* 
`pGroups` is a pointer to an array of `groupCount`
[VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html) structures describing the set
of the shader stages to be included in each shader group in the ray
tracing pipeline.

* 
`maxPipelineRayRecursionDepth` is the [    maximum recursion depth](../../../../spec/latest/chapters/raytracing.html#ray-tracing-recursion-depth) of shaders executed by this pipeline.

* 
`pLibraryInfo` is a pointer to a
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) structure defining pipeline
libraries to include.

* 
`pLibraryInterface` is a pointer to a
[VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html) structure defining
additional information when using pipeline libraries.

* 
`pDynamicState` is a pointer to a
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html) structure, and is used to
indicate which properties of the pipeline state object are dynamic and
**can** be changed independently of the pipeline state.
This **can** be `NULL`, which means no state in the pipeline is considered
dynamic.

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

When [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html) is specified, this pipeline
defines a *pipeline library* which **cannot** be bound as a ray tracing
pipeline directly.
Instead, pipeline libraries define common shaders and shader groups which
**can** be included in future pipeline creation.

If pipeline libraries are included in `pLibraryInfo`, shaders defined in
those libraries are treated as if they were defined as additional entries in
`pStages`, appended in the order they appear in the `pLibraries`
array and in the `pStages` array when those libraries were defined.

When referencing shader groups in order to obtain a shader group handle,
groups defined in those libraries are treated as if they were defined as
additional entries in `pGroups`, appended in the order they appear in
the `pLibraries` array and in the `pGroups` array when those
libraries were defined.
The shaders these groups reference are set when the pipeline library is
created, referencing those specified in the pipeline library, not in the
pipeline that includes it.

The default stack size for a pipeline if
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](VkDynamicState.html) is not provided
is computed as described in [Ray Tracing Pipeline Stack](../../../../spec/latest/chapters/raytracing.html#ray-tracing-pipeline-stack).

If the `pNext` chain includes a [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)
structure, [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)::`flags` from that
structure is used instead of `flags` from this structure.

If the `pNext` chain includes a
[VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV.html)
structure, then that structure controls whether cluster acceleration
structures are allowed in this ray tracing pipeline.

Valid Usage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-None-09497) VUID-VkRayTracingPipelineCreateInfoKHR-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) values

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07984) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid ray tracing `VkPipeline` handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07985) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07986) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07987) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-10069) VUID-VkRayTracingPipelineCreateInfoKHR-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07988) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07988

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07990) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07990

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07991) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07991

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-None-10391) VUID-VkRayTracingPipelineCreateInfoKHR-None-10391

If a [resource variables](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11798) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11798

If [shader64BitIndexing](../../../../spec/latest/chapters/features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pipelineCreationCacheControl-02878) VUID-VkRayTracingPipelineCreateInfoKHR-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](../../../../spec/latest/chapters/features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pipelineProtectedAccess-07368) VUID-VkRayTracingPipelineCreateInfoKHR-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07369) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11311) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), `layout` **must**
be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11312) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all shader variables
in the [shader resource interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html)::pMappings

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pStages-03426) VUID-VkRayTracingPipelineCreateInfoKHR-pStages-03426

The shader code for the entry points identified by `pStages`, and
the rest of the state identified by this structure **must** adhere to the
pipeline linking rules described in the [Shader Interfaces](../../../../spec/latest/chapters/interfaces.html#interfaces)
chapter

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-03428) VUID-VkRayTracingPipelineCreateInfoKHR-layout-03428

The number of resources in `layout` accessible to each shader stage
that is used by the pipeline **must** be less than or equal to
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxPerStageResources`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-02904) VUID-VkRayTracingPipelineCreateInfoKHR-flags-02904

`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-12341) VUID-VkRayTracingPipelineCreateInfoKHR-flags-12341

`flags` **must** not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-stage-03425) VUID-VkRayTracingPipelineCreateInfoKHR-stage-03425

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html), the `stage` member of at
least one element of `pStages`, including those implicitly added by
`pLibraryInfo`, **must** be [VK_SHADER_STAGE_RAYGEN_BIT_KHR](VkShaderStageFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-maxPipelineRayRecursionDepth-03589) VUID-VkRayTracingPipelineCreateInfoKHR-maxPipelineRayRecursionDepth-03589

`maxPipelineRayRecursionDepth` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)::`maxRayRecursionDepth`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03465) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03465

If `flags` includes [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html),
`pLibraryInterface` **must** not be `NULL`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03590) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03590

If `pLibraryInfo` is not `NULL` and its `libraryCount` member is
greater than `0`, `pLibraryInterface` **must** not be `NULL`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraries-03591) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraries-03591

Each element of `pLibraryInfo->pLibraries` **must** have been created
with the value of `maxPipelineRayRecursionDepth` equal to that in
this pipeline

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03592) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03592

If `pLibraryInfo` is not `NULL` and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), each element of `pLibraryInfo->pLibraries`
**must** have been created with a `layout` that is compatible with the
`layout` in this pipeline

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03593) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03593

If `pLibraryInfo` is not `NULL`, each element of its
`pLibraries` member **must** have been created with values of the
`maxPipelineRayPayloadSize` and `maxPipelineRayHitAttributeSize`
members of `pLibraryInterface` equal to those in this pipeline

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03594) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03594

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04718) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04718

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html), each element of
`pLibraryInfo->pLibraries` **must** have been created with the
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html) bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04719) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04719

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html) bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04720) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04720

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html) bit
set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04721) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04721

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04722) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04722

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04723) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04723

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03595) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03595

If the `[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html)` extension is not enabled,
`pLibraryInfo` and `pLibraryInterface` **must** be `NULL`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03470) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03470

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
for each element of `pGroups` with a `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](VkRayTracingShaderGroupTypeKHR.html) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](VkRayTracingShaderGroupTypeKHR.html), the
`anyHitShader` of that element **must** not be
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03471) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03471

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html),
for each element of `pGroups` with a `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](VkRayTracingShaderGroupTypeKHR.html) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](VkRayTracingShaderGroupTypeKHR.html), the
`closestHitShader` of that element **must** not be
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03596) VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03596

If the [    `rayTraversalPrimitiveCulling`](../../../../spec/latest/chapters/features.html#features-rayTraversalPrimitiveCulling) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03597) VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03597

If the [    `rayTraversalPrimitiveCulling`](../../../../spec/latest/chapters/features.html#features-rayTraversalPrimitiveCulling) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-06546) VUID-VkRayTracingPipelineCreateInfoKHR-flags-06546

`flags` **must** not include both
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03598) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03598

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html),
[    `rayTracingPipelineShaderGroupHandleCaptureReplay`](../../../../spec/latest/chapters/features.html#features-rayTracingPipelineShaderGroupHandleCaptureReplay) **must** be
enabled

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplay-03599) VUID-VkRayTracingPipelineCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplay-03599

If
[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](VkPhysicalDeviceRayTracingPipelineFeaturesKHR.html)::`rayTracingPipelineShaderGroupHandleCaptureReplay`
is [VK_TRUE](VK_TRUE.html) and the `pShaderGroupCaptureReplayHandle` member of
any element of `pGroups` is not `NULL`, `flags` **must** include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-07999) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-07999

If `pLibraryInfo` is `NULL` or its `libraryCount` is `0`,
`stageCount` **must** not be `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-08700) VUID-VkRayTracingPipelineCreateInfoKHR-flags-08700

If `flags` does not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)
and either `pLibraryInfo` is `NULL` or its `libraryCount` is
`0`, `groupCount` **must** not be `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicStates-03602) VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicStates-03602

Any element of the `pDynamicStates` member of `pDynamicState`
**must** be [VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](VkDynamicState.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pipelineStageCreationFeedbackCount-06652) VUID-VkRayTracingPipelineCreateInfoKHR-pipelineStageCreationFeedbackCount-06652

If
[VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be equal to `stageCount`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-stage-06899) VUID-VkRayTracingPipelineCreateInfoKHR-stage-06899

The `stage` value in all `pStages` elements **must** be one of
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_MISS_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](VkShaderStageFlagBits.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07403) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07403

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits.html), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits.html) bit
set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-08701) VUID-VkRayTracingPipelineCreateInfoKHR-flags-08701

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](VkPipelineCreateFlagBits.html), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](VkPipelineCreateFlagBits.html)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-10392) VUID-VkRayTracingPipelineCreateInfoKHR-flags-10392

If the `pNext` chain includes a
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html) structure, `flags` **must** not
include both
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits2.html) and
[VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11275) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11275

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11276) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11276

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all
libraries linked to this pipeline **must** also not have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-12361) VUID-VkRayTracingPipelineCreateInfoKHR-flags-12361

If `flags` includes
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-12362) VUID-VkRayTracingPipelineCreateInfoKHR-flags-12362

If `flags` does not include
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html), all libraries linked
to this pipeline **must** also not have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-None-11369) VUID-VkRayTracingPipelineCreateInfoKHR-None-11369

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
`layout` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-sType-sType) VUID-VkRayTracingPipelineCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pNext-pNext) VUID-VkRayTracingPipelineCreateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html), [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html), [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html), [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html), or [VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV.html)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-sType-unique) VUID-VkRayTracingPipelineCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pStages-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pStages-parameter

 If `stageCount` is not `0`, `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pGroups-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pGroups-parameter

 If `groupCount` is not `0`, `pGroups` **must** be a valid pointer to an array of `groupCount` valid [VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-parameter

 If `pLibraryInfo` is not `NULL`, `pLibraryInfo` **must** be a valid pointer to a valid [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) structure

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInterface-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInterface-parameter

 If `pLibraryInterface` is not `NULL`, `pLibraryInterface` **must** be a valid pointer to a valid [VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html) structure

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicState-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicState-parameter

 If `pDynamicState` is not `NULL`, `pDynamicState` **must** be a valid pointer to a valid [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html) structure

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-commonparent) VUID-VkRayTracingPipelineCreateInfoKHR-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VkPipeline](VkPipeline.html), [VkPipelineCreateFlags](VkPipelineCreateFlags.html), [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html), [VkPipelineLayout](VkPipelineLayout.html), [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkRayTracingPipelineInterfaceCreateInfoKHR](VkRayTracingPipelineInterfaceCreateInfoKHR.html), [VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html), [VkStructureType](VkStructureType.html), [vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkRayTracingPipelineCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
