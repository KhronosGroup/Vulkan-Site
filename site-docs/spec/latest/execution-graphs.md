# Execution Graphs

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/executiongraphs.html

## Table of Contents

- [Pipeline Creation](#_pipeline_creation)
- [Initializing Scratch Memory](#_initializing_scratch_memory)
- [Initializing_Scratch_Memory](#_initializing_scratch_memory)
- [Dispatching a Graph](#_dispatching_a_graph)
- [Dispatching_a_Graph](#_dispatching_a_graph)
- [Shader Enqueue](#_shader_enqueue)
- [Compute Nodes](#_compute_nodes)
- [Mesh Nodes](#executiongraphs-meshnodes)

## Content

*Execution graphs* provide a way for applications to dispatch multiple
operations dynamically from a single initial command on the host.
To achieve this, a new execution graph pipeline is provided, that links
together multiple shaders or pipelines which each describe one or more
operations that can be dispatched within the execution graph.
Each linked pipeline or shader describes an *execution node* within the
graph, which **can** be dispatched dynamically from another shader within the
same graph.
This allows applications to describe much richer execution topologies at a
finer granularity than would typically be possible with API commands alone.

To create execution graph pipelines, call:

// Provided by VK_AMDX_shader_enqueue
VkResult vkCreateExecutionGraphPipelinesAMDX(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkExecutionGraphPipelineCreateInfoAMDX* pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the execution graph
pipelines.

* 
`pipelineCache` is either [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), indicating that
pipeline caching is disabled; or the handle of a valid
[pipeline cache](pipelines.html#pipelines-cache) object, in which case use of that
cache is enabled for the duration of the command.
The implementation **must** not access this object outside of the duration
of this command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkExecutionGraphPipelineCreateInfoAMDX](#VkExecutionGraphPipelineCreateInfoAMDX) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array of [VkPipeline](pipelines.html#VkPipeline) handles in
which the resulting execution graph pipeline objects are returned.

Pipelines are created and returned as described for [Multiple Pipeline Creation](pipelines.html#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-shaderEnqueue-09124) VUID-vkCreateExecutionGraphPipelinesAMDX-shaderEnqueue-09124

The [`shaderEnqueue`](features.html#features-shaderEnqueue) feature **must** be
enabled

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09125) VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09125

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](pipelines.html#VkPipelineCreateFlagBits) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09126) VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09126

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](pipelines.html#VkPipelineCreateFlagBits) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](pipelines.html#VkPipelineCreateFlagBits) flag set

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-09127) VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-09127

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](pipelines.html#VkPipelineCacheCreateFlagBits), host access
to `pipelineCache` **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09616) VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09616

If [VkPipelineBinaryInfoKHR](pipelines.html#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09617) VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](pipelines.html#VkPipelineCreateFlags2CreateInfoKHR) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits2KHR) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09620) VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09620

If [VkPipelineBinaryInfoKHR](pipelines.html#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](pipelines.html#VkPipelineCreationFeedbackFlagBitsEXT)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09621) VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09621

If [VkPipelineBinaryInfoKHR](pipelines.html#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](pipelines.html#VkPipelineCreationFeedbackFlagBitsEXT) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09622) VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09622

If [VkPipelineBinaryInfoKHR](pipelines.html#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11414) VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)))
[VkSampler](samplers.html#VkSampler) objects currently created on the device

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11429) VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-device-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineCache` **must** be a valid [VkPipelineCache](pipelines.html#VkPipelineCache) handle

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkExecutionGraphPipelineCreateInfoAMDX](#VkExecutionGraphPipelineCreateInfoAMDX) structures

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pAllocator-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pPipelines-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](pipelines.html#VkPipeline) handles

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-createInfoCount-arraylength) VUID-vkCreateExecutionGraphPipelinesAMDX-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parent) VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkExecutionGraphPipelineCreateInfoAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkExecutionGraphPipelineCreateInfoAMDX {
    VkStructureType                           sType;
    const void*                               pNext;
    VkPipelineCreateFlags                     flags;
    uint32_t                                  stageCount;
    const VkPipelineShaderStageCreateInfo*    pStages;
    const VkPipelineLibraryCreateInfoKHR*     pLibraryInfo;
    VkPipelineLayout                          layout;
    VkPipeline                                basePipelineHandle;
    int32_t                                   basePipelineIndex;
} VkExecutionGraphPipelineCreateInfoAMDX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](pipelines.html#VkPipelineCreateFlagBits) specifying
how the pipeline will be generated.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array of `stageCount`
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo) structures describing the set of
the shader stages to be included in the execution graph pipeline.

* 
`pLibraryInfo` is a pointer to a
[VkPipelineLibraryCreateInfoKHR](pipelines.html#VkPipelineLibraryCreateInfoKHR) structure defining pipeline
libraries to include.

* 
`layout` is the description of binding locations used by both the
pipeline and descriptor sets used with the pipeline.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`basePipelineHandle` is a pipeline to derive from

* 
`basePipelineIndex` is an index into the `pCreateInfos`
parameter to use as a pipeline to derive from

The parameters `basePipelineHandle` and `basePipelineIndex` are
described in more detail in [Pipeline Derivatives](pipelines.html#pipelines-pipeline-derivatives).

Each shader stage provided when creating an execution graph pipeline
(including those in libraries) is associated with a name and an index,
determined by the inclusion or omission of a
[VkPipelineShaderStageNodeCreateInfoAMDX](#VkPipelineShaderStageNodeCreateInfoAMDX) structure in its `pNext`
chain.
For any graphics pipeline libraries, only the name and index of the vertex
or mesh shader stage is linked directly to the graph as a node - other
shader stages in the pipeline will be executed after those shader stages as
normal.
Task shaders cannot be included in a graphics pipeline used for a draw node.

In addition to the shader name and index, an internal “node index” is also
generated for each node, which can be queried with
[vkGetExecutionGraphPipelineNodeIndexAMDX](#vkGetExecutionGraphPipelineNodeIndexAMDX), and is used exclusively for
initial dispatch of an execution graph.

Valid Usage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09497) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](pipelines.html#VkPipelineCreateFlags2CreateInfo) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](pipelines.html#VkPipelineCreateFlagBits) values

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07984) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](pipelines.html#VkPipelineCreateFlagBits)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid execution graph `VkPipeline` handle

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07985) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](pipelines.html#VkPipelineCreateFlagBits)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07986) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](pipelines.html#VkPipelineCreateFlagBits)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07987) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-10069) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07988) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07988

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07990) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07990

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptors.html#VkDescriptorType),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07991) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07991

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-10391) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-10391

If a [resource variables](interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11798) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11798

If [shader64BitIndexing](features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineCreationCacheControl-02878) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](pipelines.html#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineProtectedAccess-07368) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](pipelines.html#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07369) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](pipelines.html#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11311) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](pipelines.html#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR), `layout` **must**
be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11312) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](pipelines.html#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR), all shader variables
in the [shader resource interface](interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::pMappings

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03365) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03365

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03366) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03366

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03367) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03367

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03368) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03368

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03369) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03369

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03370) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03370

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03576) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03576

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-04945) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-04945

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09007) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09007

If the [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](features.html#features-deviceGeneratedComputePipelines)
feature is not enabled,
`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09008) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09008

If `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](pipelines.html#VkPipelineCreateFlagBits), then the `pNext`
chain **must** include a pointer to a valid instance of
[VkComputePipelineIndirectBufferInfoNV](pipelines.html#VkComputePipelineIndirectBufferInfoNV) specifying the address where
the pipeline’s metadata will be saved

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11007) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11007

If `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-stage-09128) VUID-VkExecutionGraphPipelineCreateInfoAMDX-stage-09128

The `stage` member of any element of `pStages` **must** be
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-09129) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-09129

The shader code for the entry point identified by each element of
`pStages` and the rest of the state identified by this structure
**must** adhere to the pipeline linking rules described in the
[Shader Interfaces](interfaces.html#interfaces) chapter

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09130) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09130

If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** be
[consistent](descriptorsets.html#descriptors-pipelinelayout-consistency) with the layout of
the shaders specified in `pStages`

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-09131) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-09131

If `pLibraryInfo` is not `NULL` and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), each element of `pLibraryInfo->pLibraries`
**must** have been created with a `layout` that is compatible with the
`layout` in this pipeline

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09132) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09132

If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the number of resources in
`layout` accessible to each shader stage that is used by the
pipeline **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageResources`

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-09133) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-09133

If `pLibraryInfo` is not `NULL`, each element of
`pLibraryInfo->pLibraries` **must** be either a compute pipeline, an
execution graph pipeline, or a graphics pipeline

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-10181) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-10181

If `pLibraryInfo` is not `NULL`, each element of
`pLibraryInfo->pLibraries` that is a compute pipeline or a graphics
pipeline **must** have been created with
[VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](pipelines.html#VkPipelineCreateFlagBits2KHR) set

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-shaderMeshEnqueue-10182) VUID-VkExecutionGraphPipelineCreateInfoAMDX-shaderMeshEnqueue-10182

If the [`shaderMeshEnqueue`](features.html#features-shaderMeshEnqueue) feature is
not enabled, and `pLibraryInfo->pLibraries` is not `NULL`,
`pLibraryInfo->pLibraries` **must** not contain any graphics pipelines

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-10183) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-10183

Any element of `pLibraryInfo->pLibraries` identifying a graphics
pipeline **must** have been created with
[all possible state subsets](pipelines.html#pipelines-graphics-subsets-complete)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09134) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09134

There **must** be no two nodes in the pipeline that share both the same
shader name and index, as specified by
[VkPipelineShaderStageNodeCreateInfoAMDX](#VkPipelineShaderStageNodeCreateInfoAMDX)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09135) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09135

There **must** be no two nodes in the pipeline that share the same shader
name and have input payload declarations with different sizes

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09136) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09136

There **must** be no two nodes in the pipeline that share the same name but
have different execution models

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-CoalescedInputCountAMDX-09137) VUID-VkExecutionGraphPipelineCreateInfoAMDX-CoalescedInputCountAMDX-09137

There **must** be no two nodes in the pipeline that share the same name
where one includes `CoalescedInputCountAMDX` and the other does not

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-StaticNumWorkgroupsAMDX-09138) VUID-VkExecutionGraphPipelineCreateInfoAMDX-StaticNumWorkgroupsAMDX-09138

There **must** be no two nodes in the pipeline that share the same name
where one includes `StaticNumWorkgroupsAMDX` and the other does not

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-PayloadNodeNameAMDX-09139) VUID-VkExecutionGraphPipelineCreateInfoAMDX-PayloadNodeNameAMDX-09139

If an output payload declared in any shader in the pipeline has a
`PayloadNodeNameAMDX` decoration with a `Node` `Name` that
matches the shader name of any other node in the graph, the size of the
output payload **must** match the size of the input payload in the matching
node

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-10184) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-10184

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits), and an output payload declared
in any shader in the pipeline does not have a
`PayloadNodeSparseArrayAMDX` decoration, there **must** be a node in the
graph corresponding to every index from 0 to its
`PayloadNodeArraySizeAMDX` decoration

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-12334) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-12334

`flags` **must** not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](pipelines.html#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11271) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11271

If [VkPipelineCreateFlags2CreateInfoKHR](pipelines.html#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11272) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11272

If [VkPipelineCreateFlags2CreateInfoKHR](pipelines.html#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR), all
libraries linked to this pipeline **must** also not have that flag set

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-11363) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-11363

If [VkPipelineCreateFlags2CreateInfoKHR](pipelines.html#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR),
`layout` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-sType) VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_CREATE_INFO_AMDX](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pNext-pNext) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineCompilerControlCreateInfoAMD](pipelines.html#VkPipelineCompilerControlCreateInfoAMD) or [VkPipelineCreationFeedbackCreateInfo](pipelines.html#VkPipelineCreationFeedbackCreateInfo)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-unique) VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-parameter) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-parameter

 If `stageCount` is not `0`, and `pStages` is not `NULL`, `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo) structures

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-parameter) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-parameter

 If `pLibraryInfo` is not `NULL`, `pLibraryInfo` **must** be a valid pointer to a valid [VkPipelineLibraryCreateInfoKHR](pipelines.html#VkPipelineLibraryCreateInfoKHR) structure

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-parameter) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-commonparent) VUID-VkExecutionGraphPipelineCreateInfoAMDX-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

[VK_SHADER_INDEX_UNUSED_AMDX](#VK_SHADER_INDEX_UNUSED_AMDX) is a special shader index used to indicate
that the created node does not override the index.
In this case, the shader index is determined through other means.
It is defined as:

#define VK_SHADER_INDEX_UNUSED_AMDX       (~0U)

The `VkPipelineShaderStageNodeCreateInfoAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkPipelineShaderStageNodeCreateInfoAMDX {
      VkStructureType    sType;
    const void*          pNext;
    const char*          pName;
    uint32_t             index;
} VkPipelineShaderStageNodeCreateInfoAMDX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pName` is the shader name to use when creating a node in an
execution graph.
If `pName` is `NULL`, the name of the entry point specified in
SPIR-V is used as the shader name.

* 
`index` is the shader index to use when creating a node in an
execution graph.
If `index` is [VK_SHADER_INDEX_UNUSED_AMDX](#VK_SHADER_INDEX_UNUSED_AMDX) then the original
index is used, either as specified by the `ShaderIndexAMDX` execution
mode, or `0` if that too is not specified.

When included in the `pNext` chain of a
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo) structure, this structure specifies
the shader name and shader index of a node when creating an execution graph
pipeline.
If this structure is omitted, the shader name is set to the name of the
entry point in SPIR-V and the shader index is set to `0`.

When dispatching a node from another shader, the name is fixed at pipeline
creation, but the index **can** be set dynamically.
By associating multiple shaders with the same name but different indexes,
applications can dynamically select different nodes to execute.
Applications **must** ensure each node has a unique name and index.

|  | Shaders with the same name **must** be of the same type - e.g. a compute and
| --- | --- |
graphics shader, or even two compute shaders where one is coalescing and the
other is not, cannot share the same name. |

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineShaderStageNodeCreateInfoAMDX-sType-sType) VUID-VkPipelineShaderStageNodeCreateInfoAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_NODE_CREATE_INFO_AMDX](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineShaderStageNodeCreateInfoAMDX-pName-parameter) VUID-VkPipelineShaderStageNodeCreateInfoAMDX-pName-parameter

 If `pName` is not `NULL`, `pName` **must** be a null-terminated UTF-8 string

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo)

To query the internal node index for a particular node in an execution
graph, call:

// Provided by VK_AMDX_shader_enqueue
VkResult vkGetExecutionGraphPipelineNodeIndexAMDX(
    VkDevice                                    device,
    VkPipeline                                  executionGraph,
    const VkPipelineShaderStageNodeCreateInfoAMDX* pNodeInfo,
    uint32_t*                                   pNodeIndex);

* 
`device` is the logical device that `executionGraph` was created
on.

* 
`executionGraph` is the execution graph pipeline to query the
internal node index for.

* 
`pNodeInfo` is a pointer to a
[VkPipelineShaderStageNodeCreateInfoAMDX](#VkPipelineShaderStageNodeCreateInfoAMDX) structure identifying the
name and index of the node to query.

* 
`pNodeIndex` is the returned internal node index of the identified
node.

Once this function returns, the contents of `pNodeIndex` contain the
internal node index of the identified node.

Valid Usage

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09140) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09140

`pNodeInfo->pName` **must** not be `NULL`

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09141) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-09141

`pNodeInfo->index` **must** not be [VK_SHADER_INDEX_UNUSED_AMDX](#VK_SHADER_INDEX_UNUSED_AMDX)

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-09142) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-09142

There **must** be a node in `executionGraph` with a shader name and
index equal to `pNodeInfo->pName` and `pNodeInfo->index`

Valid Usage (Implicit)

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-device-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parameter

 `executionGraph` **must** be a valid [VkPipeline](pipelines.html#VkPipeline) handle

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeInfo-parameter

 `pNodeInfo` **must** be a valid pointer to a valid [VkPipelineShaderStageNodeCreateInfoAMDX](#VkPipelineShaderStageNodeCreateInfoAMDX) structure

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeIndex-parameter) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-pNodeIndex-parameter

 `pNodeIndex` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parent) VUID-vkGetExecutionGraphPipelineNodeIndexAMDX-executionGraph-parent

 `executionGraph` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Implementations **may** need scratch memory to manage dispatch queues or
similar when executing a pipeline graph, and this is explicitly managed by
the application.

To query the scratch space required to dispatch an execution graph, call:

// Provided by VK_AMDX_shader_enqueue
VkResult vkGetExecutionGraphPipelineScratchSizeAMDX(
    VkDevice                                    device,
    VkPipeline                                  executionGraph,
    VkExecutionGraphPipelineScratchSizeAMDX*    pSizeInfo);

* 
`device` is the logical device that `executionGraph` was created
on.

* 
`executionGraph` is the execution graph pipeline to query the
scratch space for.

* 
`pSizeInfo` is a pointer to a
[VkExecutionGraphPipelineScratchSizeAMDX](#VkExecutionGraphPipelineScratchSizeAMDX) structure that will
contain the required scratch size.

After this function returns, information about the scratch space required
will be returned in `pSizeInfo`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-device-parameter) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parameter) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parameter

 `executionGraph` **must** be a valid [VkPipeline](pipelines.html#VkPipeline) handle

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-pSizeInfo-parameter) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkExecutionGraphPipelineScratchSizeAMDX](#VkExecutionGraphPipelineScratchSizeAMDX) structure

* 
[](#VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parent) VUID-vkGetExecutionGraphPipelineScratchSizeAMDX-executionGraph-parent

 `executionGraph` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkExecutionGraphPipelineScratchSizeAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkExecutionGraphPipelineScratchSizeAMDX {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       minSize;
    VkDeviceSize       maxSize;
    VkDeviceSize       sizeGranularity;
} VkExecutionGraphPipelineScratchSizeAMDX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minSize` indicates the minimum scratch space required for
dispatching the queried execution graph.

* 
`maxSize` indicates the maximum scratch space that can be used for
dispatching the queried execution graph.

* 
`sizeGranularity` indicates the granularity at which the scratch
space can be increased from `minSize`.

Applications **can** use any amount of scratch memory greater than
`minSize` for dispatching a graph, however only the values equal to
`minSize` + an integer multiple of `sizeGranularity` will be used.
Greater values **may** result in higher performance, up to `maxSize` which
indicates the most memory that an implementation can use effectively.

Valid Usage (Implicit)

* 
[](#VUID-VkExecutionGraphPipelineScratchSizeAMDX-sType-sType) VUID-VkExecutionGraphPipelineScratchSizeAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_SCRATCH_SIZE_AMDX](fundamentals.html#VkStructureType)

To initialize scratch memory for a particular execution graph, call:

// Provided by VK_AMDX_shader_enqueue
void vkCmdInitializeGraphScratchMemoryAMDX(
    VkCommandBuffer                             commandBuffer,
    VkPipeline                                  executionGraph,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`executionGraph` is the execution graph pipeline to initialize the
scratch memory for.

* 
`scratch` is the address of scratch memory to be initialized.

* 
`scratchSize` is a range in bytes of scratch memory to be
initialized.

This command **must** be called before using `scratch` to dispatch the
bound execution graph pipeline.

Execution of this command **may** modify any memory locations in the range
[`scratch`,`scratch` + `scratchSize`).
Accesses to this memory range are performed in the
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) pipeline stage with the
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](synchronization.html#VkAccessFlagBits2KHR) and
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](synchronization.html#VkAccessFlagBits2KHR) access flags.

If any portion of `scratch` is modified by any command other than
[vkCmdDispatchGraphAMDX](#vkCmdDispatchGraphAMDX), [vkCmdDispatchGraphIndirectAMDX](#vkCmdDispatchGraphIndirectAMDX),
[vkCmdDispatchGraphIndirectCountAMDX](#vkCmdDispatchGraphIndirectCountAMDX), or
[vkCmdInitializeGraphScratchMemoryAMDX](#vkCmdInitializeGraphScratchMemoryAMDX) with the same execution graph,
it **must** be reinitialized for the execution graph again before dispatching
against it.

Valid Usage

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-10185) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-10185

`scratch` **must** be the device address of an allocated memory range
at least as large as `scratchSize`

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratchSize-10186) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratchSize-10186

`scratchSize` **must** be greater than or equal to
[VkExecutionGraphPipelineScratchSizeAMDX](#VkExecutionGraphPipelineScratchSizeAMDX)::`minSize` returned by
[vkGetExecutionGraphPipelineScratchSizeAMDX](#vkGetExecutionGraphPipelineScratchSizeAMDX) for the bound execution
graph pipeline

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-09144) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-09144

`scratch` **must** be a multiple of 64

Valid Usage (Implicit)

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-parameter) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-executionGraph-parameter) VUID-vkCmdInitializeGraphScratchMemoryAMDX-executionGraph-parameter

 `executionGraph` **must** be a valid [VkPipeline](pipelines.html#VkPipeline) handle

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-parameter) VUID-vkCmdInitializeGraphScratchMemoryAMDX-scratch-parameter

 `scratch` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-recording) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-cmdpool) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-suspended) VUID-vkCmdInitializeGraphScratchMemoryAMDX-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-videocoding) VUID-vkCmdInitializeGraphScratchMemoryAMDX-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-bufferlevel) VUID-vkCmdInitializeGraphScratchMemoryAMDX-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

* 
[](#VUID-vkCmdInitializeGraphScratchMemoryAMDX-commonparent) VUID-vkCmdInitializeGraphScratchMemoryAMDX-commonparent

 Both of `commandBuffer`, and `executionGraph` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdInitializeGraphScratchMemoryAMDX is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Initial dispatch of an execution graph is done from the host in the same way
as any other command, and **can** be used in a similar way to compute dispatch
commands, with indirect variants available.

To record an execution graph dispatch, call:

// Provided by VK_AMDX_shader_enqueue
void vkCmdDispatchGraphAMDX(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize,
    const VkDispatchGraphCountInfoAMDX*         pCountInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`scratch` is the address of scratch memory to be used.

* 
`scratchSize` is a range in bytes of scratch memory to be used.

* 
`pCountInfo` is a host pointer to a
[VkDispatchGraphCountInfoAMDX](#VkDispatchGraphCountInfoAMDX) structure defining the nodes which
will be initially executed.

When this command is executed, the nodes specified in `pCountInfo` are
executed.
Nodes executed as part of this command are not implicitly synchronized in
any way against each other once they are dispatched.
There are no rasterization order guarantees between separately dispatched
graphics nodes, though individual primitives within a single dispatch do
adhere to rasterization order.
Draw calls executed before or after the execution graph also execute
relative to each graphics node with respect to rasterization order.

For this command, all device/host pointers in substructures are treated as
host pointers and read only during host execution of this command.
Once this command returns, no reference to the original pointers is
retained.

Execution of this command **may** modify any memory locations in the range
[`scratch`,`scratch` + `scratchSize`).
Accesses to this memory range are performed in the
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) pipeline stage with the
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](synchronization.html#VkAccessFlagBits2KHR) and
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](synchronization.html#VkAccessFlagBits2KHR) access flags.

This command [captures command buffer state](#executiongraphs-meshnodes-statecapture) for mesh nodes similarly to draw commands.

Valid Usage

* 
[](#VUID-vkCmdDispatchGraphAMDX-magFilter-04553) VUID-vkCmdDispatchGraphAMDX-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-magFilter-09598) VUID-vkCmdDispatchGraphAMDX-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-mipmapMode-04770) VUID-vkCmdDispatchGraphAMDX-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-mipmapMode-09599) VUID-vkCmdDispatchGraphAMDX-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-unnormalizedCoordinates-09635) VUID-vkCmdDispatchGraphAMDX-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08609) VUID-vkCmdDispatchGraphAMDX-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08610) VUID-vkCmdDispatchGraphAMDX-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08611) VUID-vkCmdDispatchGraphAMDX-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-06479) VUID-vkCmdDispatchGraphAMDX-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-02691) VUID-vkCmdDispatchGraphAMDX-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-07888) VUID-vkCmdDispatchGraphAMDX-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-02692) VUID-vkCmdDispatchGraphAMDX-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-02693) VUID-vkCmdDispatchGraphAMDX-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchGraphAMDX-filterCubic-02694) VUID-vkCmdDispatchGraphAMDX-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchGraphAMDX-filterCubicMinmax-02695) VUID-vkCmdDispatchGraphAMDX-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchGraphAMDX-cubicRangeClamp-09212) VUID-vkCmdDispatchGraphAMDX-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatchGraphAMDX-reductionMode-09213) VUID-vkCmdDispatchGraphAMDX-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatchGraphAMDX-selectableCubicWeights-09214) VUID-vkCmdDispatchGraphAMDX-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatchGraphAMDX-flags-02696) VUID-vkCmdDispatchGraphAMDX-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07027) VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07028) VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07029) VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07030) VUID-vkCmdDispatchGraphAMDX-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08600) VUID-vkCmdDispatchGraphAMDX-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08601) VUID-vkCmdDispatchGraphAMDX-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-10068) VUID-vkCmdDispatchGraphAMDX-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchGraphAMDX-maintenance4-08602) VUID-vkCmdDispatchGraphAMDX-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08114) VUID-vkCmdDispatchGraphAMDX-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-imageLayout-00344) VUID-vkCmdDispatchGraphAMDX-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08115) VUID-vkCmdDispatchGraphAMDX-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08116) VUID-vkCmdDispatchGraphAMDX-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08604) VUID-vkCmdDispatchGraphAMDX-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08117) VUID-vkCmdDispatchGraphAMDX-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08119) VUID-vkCmdDispatchGraphAMDX-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08605) VUID-vkCmdDispatchGraphAMDX-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08606) VUID-vkCmdDispatchGraphAMDX-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08608) VUID-vkCmdDispatchGraphAMDX-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchGraphAMDX-uniformBuffers-06935) VUID-vkCmdDispatchGraphAMDX-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08612) VUID-vkCmdDispatchGraphAMDX-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphAMDX-storageBuffers-06936) VUID-vkCmdDispatchGraphAMDX-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-08613) VUID-vkCmdDispatchGraphAMDX-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphAMDX-commandBuffer-02707) VUID-vkCmdDispatchGraphAMDX-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchGraphAMDX-viewType-07752) VUID-vkCmdDispatchGraphAMDX-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchGraphAMDX-format-07753) VUID-vkCmdDispatchGraphAMDX-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageWrite-08795) VUID-vkCmdDispatchGraphAMDX-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageWrite-08796) VUID-vkCmdDispatchGraphAMDX-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageWrite-04469) VUID-vkCmdDispatchGraphAMDX-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchGraphAMDX-SampledType-04470) VUID-vkCmdDispatchGraphAMDX-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchGraphAMDX-SampledType-04471) VUID-vkCmdDispatchGraphAMDX-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchGraphAMDX-SampledType-04472) VUID-vkCmdDispatchGraphAMDX-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchGraphAMDX-SampledType-04473) VUID-vkCmdDispatchGraphAMDX-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchGraphAMDX-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchGraphAMDX-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchGraphAMDX-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchGraphAMDX-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchGraphAMDX-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchGraphAMDX-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchGraphAMDX-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-07288) VUID-vkCmdDispatchGraphAMDX-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-09600) VUID-vkCmdDispatchGraphAMDX-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphAMDX-commandBuffer-10746) VUID-vkCmdDispatchGraphAMDX-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-10678) VUID-vkCmdDispatchGraphAMDX-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-10679) VUID-vkCmdDispatchGraphAMDX-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatchGraphAMDX-pDescription-09900) VUID-vkCmdDispatchGraphAMDX-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatchGraphAMDX-dimensionCount-09905) VUID-vkCmdDispatchGraphAMDX-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatchGraphAMDX-OpTypeTensorARM-09906) VUID-vkCmdDispatchGraphAMDX-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11297) VUID-vkCmdDispatchGraphAMDX-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11298) VUID-vkCmdDispatchGraphAMDX-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11299) VUID-vkCmdDispatchGraphAMDX-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11397) VUID-vkCmdDispatchGraphAMDX-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11300) VUID-vkCmdDispatchGraphAMDX-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11301) VUID-vkCmdDispatchGraphAMDX-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11302) VUID-vkCmdDispatchGraphAMDX-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11304) VUID-vkCmdDispatchGraphAMDX-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11305) VUID-vkCmdDispatchGraphAMDX-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11306) VUID-vkCmdDispatchGraphAMDX-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11308) VUID-vkCmdDispatchGraphAMDX-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11309) VUID-vkCmdDispatchGraphAMDX-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11372) VUID-vkCmdDispatchGraphAMDX-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11373) VUID-vkCmdDispatchGraphAMDX-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11374) VUID-vkCmdDispatchGraphAMDX-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatchGraphAMDX-pBindInfo-11375) VUID-vkCmdDispatchGraphAMDX-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11376) VUID-vkCmdDispatchGraphAMDX-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11398) VUID-vkCmdDispatchGraphAMDX-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11437) VUID-vkCmdDispatchGraphAMDX-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11438) VUID-vkCmdDispatchGraphAMDX-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11441) VUID-vkCmdDispatchGraphAMDX-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11439) VUID-vkCmdDispatchGraphAMDX-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11442) VUID-vkCmdDispatchGraphAMDX-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-11485) VUID-vkCmdDispatchGraphAMDX-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatchGraphAMDX-index-11450) VUID-vkCmdDispatchGraphAMDX-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchGraphAMDX-protectedNoFault-11455) VUID-vkCmdDispatchGraphAMDX-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchGraphAMDX-protectedNoFault-11456) VUID-vkCmdDispatchGraphAMDX-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchGraphAMDX-commandBuffer-09181) VUID-vkCmdDispatchGraphAMDX-commandBuffer-09181

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdDispatchGraphAMDX-commandBuffer-09182) VUID-vkCmdDispatchGraphAMDX-commandBuffer-09182

`commandBuffer` **must** be a primary command buffer

* 
[](#VUID-vkCmdDispatchGraphAMDX-scratch-10192) VUID-vkCmdDispatchGraphAMDX-scratch-10192

`scratch` **must** be the device address of an allocated memory range
at least as large as `scratchSize`

* 
[](#VUID-vkCmdDispatchGraphAMDX-scratchSize-10193) VUID-vkCmdDispatchGraphAMDX-scratchSize-10193

`scratchSize` **must** be greater than or equal to
[VkExecutionGraphPipelineScratchSizeAMDX](#VkExecutionGraphPipelineScratchSizeAMDX)::`minSize` returned by
[vkGetExecutionGraphPipelineScratchSizeAMDX](#vkGetExecutionGraphPipelineScratchSizeAMDX) for the bound execution
graph pipeline

* 
[](#VUID-vkCmdDispatchGraphAMDX-scratch-09184) VUID-vkCmdDispatchGraphAMDX-scratch-09184

`scratch` **must** be a device address within a [VkBuffer](resources.html#VkBuffer) created
with the [VK_BUFFER_USAGE_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](resources.html#VkBufferUsageFlagBits)
or [VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](resources.html#VkBufferUsageFlagBits2KHR)
usage flags set

* 
[](#VUID-vkCmdDispatchGraphAMDX-scratch-10194) VUID-vkCmdDispatchGraphAMDX-scratch-10194

The device memory range [`scratch`,`scratch`

`scratchSize`] **must** have been initialized with
[vkCmdInitializeGraphScratchMemoryAMDX](#vkCmdInitializeGraphScratchMemoryAMDX) using the bound execution
graph pipeline, and not modified after that by anything other than
another execution graph dispatch command

* 
[](#VUID-vkCmdDispatchGraphAMDX-maxComputeWorkGroupCount-09186) VUID-vkCmdDispatchGraphAMDX-maxComputeWorkGroupCount-09186

Execution of this command **must** not cause a node to be dispatched with a
larger number of workgroups than that specified by either a
`MaxNumWorkgroupsAMDX` decoration in the dispatched node or
[`maxComputeWorkGroupCount`](limits.html#limits-maxComputeWorkGroupCount)

* 
[](#VUID-vkCmdDispatchGraphAMDX-maxExecutionGraphShaderPayloadCount-09187) VUID-vkCmdDispatchGraphAMDX-maxExecutionGraphShaderPayloadCount-09187

Execution of this command **must** not cause any shader to initialize more
than [    `maxExecutionGraphShaderPayloadCount`](limits.html#limits-maxExecutionGraphShaderPayloadCount) output payloads

* 
[](#VUID-vkCmdDispatchGraphAMDX-NodeMaxPayloadsAMDX-09188) VUID-vkCmdDispatchGraphAMDX-NodeMaxPayloadsAMDX-09188

Execution of this command **must** not cause any shader that declares
`NodeMaxPayloadsAMDX` to initialize more output payloads than
specified by the max number of payloads for that decoration.
This requirement applies to each `NodeMaxPayloadsAMDX` decoration
separately

* 
[](#VUID-vkCmdDispatchGraphAMDX-None-10195) VUID-vkCmdDispatchGraphAMDX-None-10195

   If the bound execution graph pipeline includes draw nodes, this command
   **must** be called within a render pass instance that is
compatible with the graphics pipeline used to create each of those nodes

* 
[](#VUID-vkCmdDispatchGraphAMDX-pCountInfo-09145) VUID-vkCmdDispatchGraphAMDX-pCountInfo-09145

`pCountInfo->infos` **must** be a host pointer to a memory allocation
at least as large as the product of `count` and `stride`

* 
[](#VUID-vkCmdDispatchGraphAMDX-infos-09146) VUID-vkCmdDispatchGraphAMDX-infos-09146

Host memory locations at indexes in the range [`infos`, `infos`
+ (`count`*`stride`)), at a granularity of `stride` **must**
contain valid [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structures in the first 24
bytes

* 
[](#VUID-vkCmdDispatchGraphAMDX-pCountInfo-09147) VUID-vkCmdDispatchGraphAMDX-pCountInfo-09147

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, `payloads` **must** be a host pointer to a
memory allocation at least as large as the product of `payloadCount`
and `payloadStride`

* 
[](#VUID-vkCmdDispatchGraphAMDX-pCountInfo-09148) VUID-vkCmdDispatchGraphAMDX-pCountInfo-09148

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, `nodeIndex` **must** be a valid node index in
the bound execution graph pipeline, as returned by
[vkGetExecutionGraphPipelineNodeIndexAMDX](#vkGetExecutionGraphPipelineNodeIndexAMDX)

* 
[](#VUID-vkCmdDispatchGraphAMDX-pCountInfo-09149) VUID-vkCmdDispatchGraphAMDX-pCountInfo-09149

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, host memory locations at indexes in the range
[`payloads`, `payloads` + (`payloadCount` *
`payloadStride`)), at a granularity of `payloadStride` **must**
contain a payload matching the size of the input payload expected by the
node in `nodeIndex` in the first bytes

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchGraphAMDX-commandBuffer-parameter) VUID-vkCmdDispatchGraphAMDX-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchGraphAMDX-scratch-parameter) VUID-vkCmdDispatchGraphAMDX-scratch-parameter

 `scratch` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDispatchGraphAMDX-pCountInfo-parameter) VUID-vkCmdDispatchGraphAMDX-pCountInfo-parameter

 `pCountInfo` **must** be a valid pointer to a valid [VkDispatchGraphCountInfoAMDX](#VkDispatchGraphCountInfoAMDX) structure

* 
[](#VUID-vkCmdDispatchGraphAMDX-commandBuffer-recording) VUID-vkCmdDispatchGraphAMDX-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchGraphAMDX-commandBuffer-cmdpool) VUID-vkCmdDispatchGraphAMDX-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchGraphAMDX-suspended) VUID-vkCmdDispatchGraphAMDX-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchGraphAMDX-videocoding) VUID-vkCmdDispatchGraphAMDX-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDispatchGraphAMDX-bufferlevel) VUID-vkCmdDispatchGraphAMDX-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDispatchGraphAMDX is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record an execution graph dispatch with node and payload parameters read
on device, call:

// Provided by VK_AMDX_shader_enqueue
void vkCmdDispatchGraphIndirectAMDX(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize,
    const VkDispatchGraphCountInfoAMDX*         pCountInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`scratch` is the address of scratch memory to be used.

* 
`scratchSize` is a range in bytes of scratch memory to be used.

* 
`pCountInfo` is a host pointer to a
[VkDispatchGraphCountInfoAMDX](#VkDispatchGraphCountInfoAMDX) structure defining the nodes which
will be initially executed.

When this command is executed, the nodes specified in `pCountInfo` are
executed.
Nodes executed as part of this command are not implicitly synchronized in
any way against each other once they are dispatched.
There are no rasterization order guarantees between separately dispatched
graphics nodes, though individual primitives within a single dispatch do
adhere to rasterization order.
Draw calls executed before or after the execution graph also execute
relative to each graphics node with respect to rasterization order.

For this command, all device/host pointers in substructures are treated as
device pointers and read during device execution of this command.
The allocation and contents of these pointers only needs to be valid during
device execution.
All of these addresses will be read in the
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) pipeline stage with the
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](synchronization.html#VkAccessFlagBits2KHR) access flag.

Execution of this command **may** modify any memory locations in the range
[`scratch`,`scratch` + `scratchSize`).
Accesses to this memory range are performed in the
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) pipeline stage with the
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](synchronization.html#VkAccessFlagBits2KHR) and
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](synchronization.html#VkAccessFlagBits2KHR) access flags.

This command [captures command buffer state](#executiongraphs-meshnodes-statecapture) for mesh nodes similarly to draw commands.

Valid Usage

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-magFilter-04553) VUID-vkCmdDispatchGraphIndirectAMDX-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-magFilter-09598) VUID-vkCmdDispatchGraphIndirectAMDX-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-mipmapMode-04770) VUID-vkCmdDispatchGraphIndirectAMDX-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-mipmapMode-09599) VUID-vkCmdDispatchGraphIndirectAMDX-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-unnormalizedCoordinates-09635) VUID-vkCmdDispatchGraphIndirectAMDX-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08609) VUID-vkCmdDispatchGraphIndirectAMDX-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08610) VUID-vkCmdDispatchGraphIndirectAMDX-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08611) VUID-vkCmdDispatchGraphIndirectAMDX-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-06479) VUID-vkCmdDispatchGraphIndirectAMDX-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-02691) VUID-vkCmdDispatchGraphIndirectAMDX-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-07888) VUID-vkCmdDispatchGraphIndirectAMDX-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-02692) VUID-vkCmdDispatchGraphIndirectAMDX-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-02693) VUID-vkCmdDispatchGraphIndirectAMDX-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-filterCubic-02694) VUID-vkCmdDispatchGraphIndirectAMDX-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-filterCubicMinmax-02695) VUID-vkCmdDispatchGraphIndirectAMDX-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-cubicRangeClamp-09212) VUID-vkCmdDispatchGraphIndirectAMDX-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-reductionMode-09213) VUID-vkCmdDispatchGraphIndirectAMDX-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-selectableCubicWeights-09214) VUID-vkCmdDispatchGraphIndirectAMDX-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-flags-02696) VUID-vkCmdDispatchGraphIndirectAMDX-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07027) VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07028) VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07029) VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07030) VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08600) VUID-vkCmdDispatchGraphIndirectAMDX-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08601) VUID-vkCmdDispatchGraphIndirectAMDX-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-10068) VUID-vkCmdDispatchGraphIndirectAMDX-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-maintenance4-08602) VUID-vkCmdDispatchGraphIndirectAMDX-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08114) VUID-vkCmdDispatchGraphIndirectAMDX-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-imageLayout-00344) VUID-vkCmdDispatchGraphIndirectAMDX-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08115) VUID-vkCmdDispatchGraphIndirectAMDX-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08116) VUID-vkCmdDispatchGraphIndirectAMDX-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08604) VUID-vkCmdDispatchGraphIndirectAMDX-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08117) VUID-vkCmdDispatchGraphIndirectAMDX-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08119) VUID-vkCmdDispatchGraphIndirectAMDX-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08605) VUID-vkCmdDispatchGraphIndirectAMDX-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08606) VUID-vkCmdDispatchGraphIndirectAMDX-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08608) VUID-vkCmdDispatchGraphIndirectAMDX-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-uniformBuffers-06935) VUID-vkCmdDispatchGraphIndirectAMDX-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08612) VUID-vkCmdDispatchGraphIndirectAMDX-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-storageBuffers-06936) VUID-vkCmdDispatchGraphIndirectAMDX-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-08613) VUID-vkCmdDispatchGraphIndirectAMDX-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-02707) VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-viewType-07752) VUID-vkCmdDispatchGraphIndirectAMDX-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-format-07753) VUID-vkCmdDispatchGraphIndirectAMDX-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageWrite-08795) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageWrite-08796) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageWrite-04469) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04470) VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04471) VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04472) VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04473) VUID-vkCmdDispatchGraphIndirectAMDX-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchGraphIndirectAMDX-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchGraphIndirectAMDX-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchGraphIndirectAMDX-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-07288) VUID-vkCmdDispatchGraphIndirectAMDX-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-09600) VUID-vkCmdDispatchGraphIndirectAMDX-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-10746) VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-10678) VUID-vkCmdDispatchGraphIndirectAMDX-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-10679) VUID-vkCmdDispatchGraphIndirectAMDX-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pDescription-09900) VUID-vkCmdDispatchGraphIndirectAMDX-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-dimensionCount-09905) VUID-vkCmdDispatchGraphIndirectAMDX-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeTensorARM-09906) VUID-vkCmdDispatchGraphIndirectAMDX-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11297) VUID-vkCmdDispatchGraphIndirectAMDX-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11298) VUID-vkCmdDispatchGraphIndirectAMDX-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11299) VUID-vkCmdDispatchGraphIndirectAMDX-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11397) VUID-vkCmdDispatchGraphIndirectAMDX-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11300) VUID-vkCmdDispatchGraphIndirectAMDX-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11301) VUID-vkCmdDispatchGraphIndirectAMDX-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11302) VUID-vkCmdDispatchGraphIndirectAMDX-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11304) VUID-vkCmdDispatchGraphIndirectAMDX-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11305) VUID-vkCmdDispatchGraphIndirectAMDX-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11306) VUID-vkCmdDispatchGraphIndirectAMDX-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11308) VUID-vkCmdDispatchGraphIndirectAMDX-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11309) VUID-vkCmdDispatchGraphIndirectAMDX-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11372) VUID-vkCmdDispatchGraphIndirectAMDX-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11373) VUID-vkCmdDispatchGraphIndirectAMDX-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11374) VUID-vkCmdDispatchGraphIndirectAMDX-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pBindInfo-11375) VUID-vkCmdDispatchGraphIndirectAMDX-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11376) VUID-vkCmdDispatchGraphIndirectAMDX-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11398) VUID-vkCmdDispatchGraphIndirectAMDX-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11437) VUID-vkCmdDispatchGraphIndirectAMDX-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11438) VUID-vkCmdDispatchGraphIndirectAMDX-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11441) VUID-vkCmdDispatchGraphIndirectAMDX-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11439) VUID-vkCmdDispatchGraphIndirectAMDX-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11442) VUID-vkCmdDispatchGraphIndirectAMDX-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-11485) VUID-vkCmdDispatchGraphIndirectAMDX-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-index-11450) VUID-vkCmdDispatchGraphIndirectAMDX-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-protectedNoFault-11455) VUID-vkCmdDispatchGraphIndirectAMDX-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-protectedNoFault-11456) VUID-vkCmdDispatchGraphIndirectAMDX-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-09181) VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-09181

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-09182) VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-09182

`commandBuffer` **must** be a primary command buffer

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-scratch-10192) VUID-vkCmdDispatchGraphIndirectAMDX-scratch-10192

`scratch` **must** be the device address of an allocated memory range
at least as large as `scratchSize`

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-scratchSize-10193) VUID-vkCmdDispatchGraphIndirectAMDX-scratchSize-10193

`scratchSize` **must** be greater than or equal to
[VkExecutionGraphPipelineScratchSizeAMDX](#VkExecutionGraphPipelineScratchSizeAMDX)::`minSize` returned by
[vkGetExecutionGraphPipelineScratchSizeAMDX](#vkGetExecutionGraphPipelineScratchSizeAMDX) for the bound execution
graph pipeline

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-scratch-09184) VUID-vkCmdDispatchGraphIndirectAMDX-scratch-09184

`scratch` **must** be a device address within a [VkBuffer](resources.html#VkBuffer) created
with the [VK_BUFFER_USAGE_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](resources.html#VkBufferUsageFlagBits)
or [VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](resources.html#VkBufferUsageFlagBits2KHR)
usage flags set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-scratch-10194) VUID-vkCmdDispatchGraphIndirectAMDX-scratch-10194

The device memory range [`scratch`,`scratch`

`scratchSize`] **must** have been initialized with
[vkCmdInitializeGraphScratchMemoryAMDX](#vkCmdInitializeGraphScratchMemoryAMDX) using the bound execution
graph pipeline, and not modified after that by anything other than
another execution graph dispatch command

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-maxComputeWorkGroupCount-09186) VUID-vkCmdDispatchGraphIndirectAMDX-maxComputeWorkGroupCount-09186

Execution of this command **must** not cause a node to be dispatched with a
larger number of workgroups than that specified by either a
`MaxNumWorkgroupsAMDX` decoration in the dispatched node or
[`maxComputeWorkGroupCount`](limits.html#limits-maxComputeWorkGroupCount)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-maxExecutionGraphShaderPayloadCount-09187) VUID-vkCmdDispatchGraphIndirectAMDX-maxExecutionGraphShaderPayloadCount-09187

Execution of this command **must** not cause any shader to initialize more
than [    `maxExecutionGraphShaderPayloadCount`](limits.html#limits-maxExecutionGraphShaderPayloadCount) output payloads

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-NodeMaxPayloadsAMDX-09188) VUID-vkCmdDispatchGraphIndirectAMDX-NodeMaxPayloadsAMDX-09188

Execution of this command **must** not cause any shader that declares
`NodeMaxPayloadsAMDX` to initialize more output payloads than
specified by the max number of payloads for that decoration.
This requirement applies to each `NodeMaxPayloadsAMDX` decoration
separately

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-None-10195) VUID-vkCmdDispatchGraphIndirectAMDX-None-10195

   If the bound execution graph pipeline includes draw nodes, this command
   **must** be called within a render pass instance that is
compatible with the graphics pipeline used to create each of those nodes

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09150) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09150

`pCountInfo->infos` **must** be a device pointer to a memory allocation
at least as large as the product of `count` and `stride` when
this command is executed on the device

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09151) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09151

`pCountInfo->infos` **must** be a device address within a
[VkBuffer](resources.html#VkBuffer) created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09152) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09152

`pCountInfo->infos` **must** be a multiple of
[    `executionGraphDispatchAddressAlignment`](limits.html#limits-executionGraphDispatchAddressAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-infos-09153) VUID-vkCmdDispatchGraphIndirectAMDX-infos-09153

Device memory locations at indexes in the range [`infos`,
`infos` + (`count`*`stride`)), at a granularity of
`stride` **must** contain valid [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX)
structures in the first 24 bytes when this command is executed on the
device

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09154) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09154

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, `payloads` **must** be a device pointer to a
memory allocation at least as large as the product of `payloadCount`
and `payloadStride` when this command is executed on the device

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09155) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09155

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, `payloads` **must** be a device address within
a [VkBuffer](resources.html#VkBuffer) created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09156) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09156

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, `payloads` **must** be a multiple of
[    `executionGraphDispatchAddressAlignment`](limits.html#limits-executionGraphDispatchAddressAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09157) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09157

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, `nodeIndex` **must** be a valid node index in
the bound execution graph pipeline, as returned by
[vkGetExecutionGraphPipelineNodeIndexAMDX](#vkGetExecutionGraphPipelineNodeIndexAMDX) when this command is
executed on the device

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09158) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-09158

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`pCountInfo->infos`, device memory locations at indexes in the range
[`payloads`, `payloads` + (`payloadCount` *
`payloadStride`)), at a granularity of `payloadStride` **must**
contain a payload matching the size of the input payload expected by the
node in `nodeIndex` in the first bytes when this command is executed
on the device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-parameter) VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-scratch-parameter) VUID-vkCmdDispatchGraphIndirectAMDX-scratch-parameter

 `scratch` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-parameter) VUID-vkCmdDispatchGraphIndirectAMDX-pCountInfo-parameter

 `pCountInfo` **must** be a valid pointer to a valid [VkDispatchGraphCountInfoAMDX](#VkDispatchGraphCountInfoAMDX) structure

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-recording) VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-cmdpool) VUID-vkCmdDispatchGraphIndirectAMDX-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-suspended) VUID-vkCmdDispatchGraphIndirectAMDX-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-videocoding) VUID-vkCmdDispatchGraphIndirectAMDX-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDispatchGraphIndirectAMDX-bufferlevel) VUID-vkCmdDispatchGraphIndirectAMDX-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDispatchGraphIndirectAMDX is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To record an execution graph dispatch with all parameters read on device,
call:

// Provided by VK_AMDX_shader_enqueue
void vkCmdDispatchGraphIndirectCountAMDX(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize,
    VkDeviceAddress                             countInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`scratch` is the address of scratch memory to be used.

* 
`scratchSize` is a range in bytes of scratch memory to be used.

* 
`countInfo` is a device address of a
[VkDispatchGraphCountInfoAMDX](#VkDispatchGraphCountInfoAMDX) structure defining the nodes which
will be initially executed.

When this command is executed, the nodes specified in `countInfo` are
executed.
Nodes executed as part of this command are not implicitly synchronized in
any way against each other once they are dispatched.

For this command, all pointers in substructures are treated as device
pointers and read during device execution of this command.
The allocation and contents of these pointers only needs to be valid during
device execution.
All of these addresses will be read in the
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) pipeline stage with the
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](synchronization.html#VkAccessFlagBits2KHR) access flag.

Execution of this command **may** modify any memory locations in the range
[`scratch`,`scratch` + `scratchSize`).
Accesses to this memory range are performed in the
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) pipeline stage with the
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT](synchronization.html#VkAccessFlagBits2KHR) and
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT](synchronization.html#VkAccessFlagBits2KHR) access flags.

Valid Usage

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-magFilter-04553) VUID-vkCmdDispatchGraphIndirectCountAMDX-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-magFilter-09598) VUID-vkCmdDispatchGraphIndirectCountAMDX-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-mipmapMode-04770) VUID-vkCmdDispatchGraphIndirectCountAMDX-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-mipmapMode-09599) VUID-vkCmdDispatchGraphIndirectCountAMDX-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-unnormalizedCoordinates-09635) VUID-vkCmdDispatchGraphIndirectCountAMDX-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08609) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08610) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08611) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-06479) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-02691) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-07888) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-02692) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-02693) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-filterCubic-02694) VUID-vkCmdDispatchGraphIndirectCountAMDX-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-filterCubicMinmax-02695) VUID-vkCmdDispatchGraphIndirectCountAMDX-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-cubicRangeClamp-09212) VUID-vkCmdDispatchGraphIndirectCountAMDX-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-reductionMode-09213) VUID-vkCmdDispatchGraphIndirectCountAMDX-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-selectableCubicWeights-09214) VUID-vkCmdDispatchGraphIndirectCountAMDX-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-flags-02696) VUID-vkCmdDispatchGraphIndirectCountAMDX-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07027) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07028) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07029) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07030) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08600) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08600

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a set *n*, a descriptor set **must** have been bound to *n*
at the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
compatible for set *n*, with the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create
the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)
, as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08601) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08601

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) array used to create the current
[VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10068) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-maintenance4-08602) VUID-vkCmdDispatchGraphIndirectCountAMDX-maintenance4-08602

If a [a bound shader](shaders.html#shaders-binding)
was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) without the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline without the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set
for the same pipeline bind point, with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is
[compatible for push constants](descriptorsets.html#descriptors-compatibility) with the
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) used to create the current [VkPipeline](pipelines.html#VkPipeline)
or the [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) and [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) arrays
used to create the current [VkShaderEXT](shaders.html#VkShaderEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08114) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-imageLayout-00344) VUID-vkCmdDispatchGraphIndirectCountAMDX-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08115) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08116) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08604) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08117) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08119) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08605) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08606) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08608) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-uniformBuffers-06935) VUID-vkCmdDispatchGraphIndirectCountAMDX-uniformBuffers-06935

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08612) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-storageBuffers-06936) VUID-vkCmdDispatchGraphIndirectCountAMDX-storageBuffers-06936

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer,
and that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the buffer as specified in the descriptor set bound to the
same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08613) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-02707) VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-viewType-07752) VUID-vkCmdDispatchGraphIndirectCountAMDX-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-format-07753) VUID-vkCmdDispatchGraphIndirectCountAMDX-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageWrite-08795) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageWrite-08796) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageWrite-04469) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04470) VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04471) VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04472) VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04473) VUID-vkCmdDispatchGraphIndirectCountAMDX-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-sparseImageInt64Atomics-04474) VUID-vkCmdDispatchGraphIndirectCountAMDX-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-sparseImageInt64Atomics-04475) VUID-vkCmdDispatchGraphIndirectCountAMDX-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06971) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06972) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBoxFilterQCOM-06973) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06977) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06978) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageSampleWeightedQCOM-06978

If any command other than `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** not
have been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchWindow-09215) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchWindow-09216) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchWindow-09217) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-07288) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-09600) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-10746) VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10678) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10679) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-pDescription-09900) VUID-vkCmdDispatchGraphIndirectCountAMDX-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-dimensionCount-09905) VUID-vkCmdDispatchGraphIndirectCountAMDX-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeTensorARM-09906) VUID-vkCmdDispatchGraphIndirectCountAMDX-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11297) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11297

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a `OpTypeStruct` decorated with `Block` or
`BufferBlock` using that mapping, the calculated offset for the
resource heap **must** be a multiple of [    `bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11298) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11298

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeImage` or `OpTypeSampledImage` using
that mapping, the calculated offset for the resource heap **must** be
a multiple of [    `imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11299) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11299

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeSampler` or `OpTypeSampledImage` using
that mapping, the calculated offset for the sampler heap **must** be
a multiple of [    `samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11397) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11397

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses an `OpTypeTensorARM` using that mapping, the
calculated offset for the resource heap **must** be a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11300) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11301) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11301

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11302) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11304) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11305) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11306) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11308) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11309) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11372) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11372

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a uniform buffer or uniform texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`uniformBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified via [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11373) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11373

If any stage of the [VkPipeline](pipelines.html#VkPipeline) object bound to the pipeline bind
point used by this command accesses a storage buffer or storage texel
buffer through a descriptor in the bound resource heap,
that stage was created without enabling either
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) for
`storageBuffers`,
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
and the [`robustBufferAccess`](features.html#features-robustBufferAccess)
feature is not enabled, that stage **must** not access values outside of
the range of the descriptor specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
when the descriptor was written

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11374) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11374

If
the [`robustBufferAccess2`](features.html#features-robustBufferAccess2) feature
is not enabled,
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding to
the pipeline bind point used by this command accesses a uniform buffer,
uniform texel buffer, storage buffer, or storage texel buffer, that
shader **must** not access values outside of the range of the buffer as
specified by [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) when the descriptor was
written

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-pBindInfo-11375) VUID-vkCmdDispatchGraphIndirectCountAMDX-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11376) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11398) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11398

If a [bound shader](shaders.html#shaders-binding) was created with a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the access **must** not be
[out of bounds](shaders.html#shaders-execution-memory-access-bounds)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11437) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11437

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a resource using that mapping, the buffer from which the
address in push data was queried **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11438) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11441) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11439) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11442) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11485) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-11485

    If a pipeline is bound to the pipeline bind point used by this command,
    or shader is bound to a shader stage used by this command,
    and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
    accesses an acceleration structure using that mapping, the address that
    the acceleration structure is mapped to **must** be an acceleration
    structure
    address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
    [vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)
or
    handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
    [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-index-11450) VUID-vkCmdDispatchGraphIndirectCountAMDX-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-protectedNoFault-11455) VUID-vkCmdDispatchGraphIndirectCountAMDX-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-protectedNoFault-11456) VUID-vkCmdDispatchGraphIndirectCountAMDX-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-09181) VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-09181

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-09182) VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-09182

`commandBuffer` **must** be a primary command buffer

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-10192) VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-10192

`scratch` **must** be the device address of an allocated memory range
at least as large as `scratchSize`

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-scratchSize-10193) VUID-vkCmdDispatchGraphIndirectCountAMDX-scratchSize-10193

`scratchSize` **must** be greater than or equal to
[VkExecutionGraphPipelineScratchSizeAMDX](#VkExecutionGraphPipelineScratchSizeAMDX)::`minSize` returned by
[vkGetExecutionGraphPipelineScratchSizeAMDX](#vkGetExecutionGraphPipelineScratchSizeAMDX) for the bound execution
graph pipeline

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-09184) VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-09184

`scratch` **must** be a device address within a [VkBuffer](resources.html#VkBuffer) created
with the [VK_BUFFER_USAGE_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](resources.html#VkBufferUsageFlagBits)
or [VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](resources.html#VkBufferUsageFlagBits2KHR)
usage flags set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-10194) VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-10194

The device memory range [`scratch`,`scratch`

`scratchSize`] **must** have been initialized with
[vkCmdInitializeGraphScratchMemoryAMDX](#vkCmdInitializeGraphScratchMemoryAMDX) using the bound execution
graph pipeline, and not modified after that by anything other than
another execution graph dispatch command

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-maxComputeWorkGroupCount-09186) VUID-vkCmdDispatchGraphIndirectCountAMDX-maxComputeWorkGroupCount-09186

Execution of this command **must** not cause a node to be dispatched with a
larger number of workgroups than that specified by either a
`MaxNumWorkgroupsAMDX` decoration in the dispatched node or
[`maxComputeWorkGroupCount`](limits.html#limits-maxComputeWorkGroupCount)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-maxExecutionGraphShaderPayloadCount-09187) VUID-vkCmdDispatchGraphIndirectCountAMDX-maxExecutionGraphShaderPayloadCount-09187

Execution of this command **must** not cause any shader to initialize more
than [    `maxExecutionGraphShaderPayloadCount`](limits.html#limits-maxExecutionGraphShaderPayloadCount) output payloads

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-NodeMaxPayloadsAMDX-09188) VUID-vkCmdDispatchGraphIndirectCountAMDX-NodeMaxPayloadsAMDX-09188

Execution of this command **must** not cause any shader that declares
`NodeMaxPayloadsAMDX` to initialize more output payloads than
specified by the max number of payloads for that decoration.
This requirement applies to each `NodeMaxPayloadsAMDX` decoration
separately

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10195) VUID-vkCmdDispatchGraphIndirectCountAMDX-None-10195

   If the bound execution graph pipeline includes draw nodes, this command
   **must** be called within a render pass instance that is
compatible with the graphics pipeline used to create each of those nodes

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09159) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09159

`countInfo` **must** be a device pointer to a memory allocation
containing a valid [VkDispatchGraphCountInfoAMDX](#VkDispatchGraphCountInfoAMDX) structure when
this command is executed on the device

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09160) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09160

`countInfo` **must** be a device address within a [VkBuffer](resources.html#VkBuffer)
created with the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag
set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09161) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09161

`countInfo` **must** be a multiple of
[    `executionGraphDispatchAddressAlignment`](limits.html#limits-executionGraphDispatchAddressAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09162) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09162

`countInfo->infos` **must** be a device pointer to a memory allocation
at least as large as the product of `count` and `stride` when
this command is executed on the device

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09163) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09163

`countInfo->infos` **must** be a device address within a [VkBuffer](resources.html#VkBuffer)
created with the [VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag
set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09164) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09164

`countInfo->infos` **must** be a multiple of
[    `executionGraphDispatchAddressAlignment`](limits.html#limits-executionGraphDispatchAddressAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-infos-09165) VUID-vkCmdDispatchGraphIndirectCountAMDX-infos-09165

Device memory locations at indexes in the range [`infos`,
`infos` + (`count`*`stride`)), at a granularity of
`stride` **must** contain valid [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX)
structures in the first 24 bytes when this command is executed on the
device

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09166) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09166

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`countInfo->infos`, `payloads` **must** be a device pointer to a
memory allocation at least as large as the product of `payloadCount`
and `payloadStride` when this command is executed on the device

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09167) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09167

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`countInfo->infos`, `payloads` **must** be a device address within
a [VkBuffer](resources.html#VkBuffer) created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09168) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09168

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`countInfo->infos`, `payloads` **must** be a multiple of
[    `executionGraphDispatchAddressAlignment`](limits.html#limits-executionGraphDispatchAddressAlignment)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09169) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09169

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`countInfo->infos`, `nodeIndex` **must** be a valid node index in
the bound execution graph pipeline, as returned by
[vkGetExecutionGraphPipelineNodeIndexAMDX](#vkGetExecutionGraphPipelineNodeIndexAMDX) when this command is
executed on the device

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09170) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-09170

For each [VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structure in
`countInfo->infos`, device memory locations at indexes in the range
[`payloads`, `payloads` + (`payloadCount` *
`payloadStride`)), at a granularity of `payloadStride` **must**
contain a payload matching the size of the input payload expected by the
node in `nodeIndex` in the first bytes when this command is executed
on the device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-parameter) VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-parameter) VUID-vkCmdDispatchGraphIndirectCountAMDX-scratch-parameter

 `scratch` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-parameter) VUID-vkCmdDispatchGraphIndirectCountAMDX-countInfo-parameter

 `countInfo` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-recording) VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-cmdpool) VUID-vkCmdDispatchGraphIndirectCountAMDX-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-suspended) VUID-vkCmdDispatchGraphIndirectCountAMDX-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-videocoding) VUID-vkCmdDispatchGraphIndirectCountAMDX-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDispatchGraphIndirectCountAMDX-bufferlevel) VUID-vkCmdDispatchGraphIndirectCountAMDX-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdDispatchGraphIndirectCountAMDX is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDeviceOrHostAddressConstAMDX` union is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef union VkDeviceOrHostAddressConstAMDX {
    VkDeviceAddress    deviceAddress;
    const void*        hostAddress;
} VkDeviceOrHostAddressConstAMDX;

* 
`deviceAddress` is a buffer device address as returned by the
[vkGetBufferDeviceAddressKHR](resources.html#vkGetBufferDeviceAddressKHR) command.

* 
`hostAddress` is a const host memory address.

The `VkDispatchGraphCountInfoAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkDispatchGraphCountInfoAMDX {
    uint32_t                          count;
    VkDeviceOrHostAddressConstAMDX    infos;
    uint64_t                          stride;
} VkDispatchGraphCountInfoAMDX;

* 
`count` is the number of dispatches to perform.

* 
`infos` is the device or host address of a flat array of
[VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structures

* 
`stride` is the byte stride between successive
[VkDispatchGraphInfoAMDX](#VkDispatchGraphInfoAMDX) structures in `infos`

Whether `infos` is consumed as a device or host pointer is defined by
the command this structure is used in.

The `VkDispatchGraphInfoAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkDispatchGraphInfoAMDX {
    uint32_t                          nodeIndex;
    uint32_t                          payloadCount;
    VkDeviceOrHostAddressConstAMDX    payloads;
    uint64_t                          payloadStride;
} VkDispatchGraphInfoAMDX;

* 
`nodeIndex` is the index of a node in an execution graph to be
dispatched.

* 
`payloadCount` is the number of payloads to dispatch for the
specified node.

* 
`payloads` is a device or host address pointer to a flat array of
payloads with size equal to the product of `payloadCount` and
`payloadStride`

* 
`payloadStride` is the byte stride between successive payloads in
`payloads`

Whether `payloads` is consumed as a device or host pointer is defined by
the command this structure is used in.

Valid Usage

* 
[](#VUID-VkDispatchGraphInfoAMDX-payloadCount-09171) VUID-VkDispatchGraphInfoAMDX-payloadCount-09171

`payloadCount` **must** be no greater than
[    `maxExecutionGraphShaderPayloadCount`](limits.html#limits-maxExecutionGraphShaderPayloadCount)

Compute shaders in an execution graph **can** use the
`OpInitializeNodePayloadsAMDX` to initialize nodes for dispatch.
Any node payload initialized in this way will be enqueued for dispatch once
the shader is done writing to the payload.
As compilers **may** be conservative when making this determination, shaders
**can** further call `OpFinalizeNodePayloadsAMDX` to guarantee that the
payload is no longer being written.

The `Node` `Name` operand of the `PayloadNodeNameAMDX` decoration
on a payload identifies the shader name of the node to be enqueued, and the
`Shader` `Index` operand of `OpInitializeNodePayloadsAMDX`
identifies the shader index.
A node identified in this way is dispatched as described in the following
sections.

Compute shaders added as nodes to an execution graph are executed
differently based on the presence or absence of the
`StaticNumWorkgroupsAMDX` or `CoalescingAMDX` execution modes.

Dispatching a compute shader node that does not declare either the
`StaticNumWorkgroupsAMDX` or `CoalescingAMDX` execution mode will
execute a number of workgroups in each dimension specified by the first 12
bytes of the payload, interpreted as a [VkDispatchIndirectCommand](dispatch.html#VkDispatchIndirectCommand).
The same payload will be broadcast to each workgroup in the same dispatch.
Additional values in the payload are have no effect on execution.

Dispatching a compute shader node with the `StaticNumWorkgroupsAMDX`
execution mode will execute workgroups in each dimension according to the
`x`, `y`, and `z` `size` operands to the
`StaticNumWorkgroupsAMDX` execution mode.
The same payload will be broadcast to each workgroup in the same dispatch.
Any values in the payload have no effect on execution.

Dispatching a compute shader node with the `CoalescingAMDX` execution
mode will enqueue a single invocation for execution.
Implementations **may** combine multiple such dispatches into the same
workgroup, up to the size of the workgroup.
The number of invocations coalesced into a given workgroup in this way **can**
be queried via the [`CoalescedInputCountAMDX`](interfaces.html#interfaces-builtin-variables-coalescedinputcountamd) built-in.
Any values in the payload have no effect on execution.

Graphics pipelines added as nodes to an execution graph are executed in a
manner similar to a [vkCmdDrawMeshTasksIndirectEXT](drawing.html#vkCmdDrawMeshTasksIndirectEXT), using the same
payloads as compute shaders, but capturing some state from the command
buffer.

When an execution graph dispatch is recorded into a command buffer, it
captures the following dynamic state for use with draw nodes:

* 
[VK_DYNAMIC_STATE_VIEWPORT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_SCISSOR](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_LINE_WIDTH](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_BIAS](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](pipelines.html#VkDynamicState)

Other state is not captured, and graphics pipelines **must** not be created
with other dynamic states when used as a library in an execution graph
pipeline.
