# VkExecutionGraphPipelineCreateInfoAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExecutionGraphPipelineCreateInfoAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExecutionGraphPipelineCreateInfoAMDX - Structure specifying parameters of a newly created execution graph pipeline

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
the shader stages to be included in the execution graph pipeline.

* 
`pLibraryInfo` is a pointer to a
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) structure defining pipeline
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
described in more detail in [Pipeline Derivatives](../../../../spec/latest/chapters/pipelines.html#pipelines-pipeline-derivatives).

Each shader stage provided when creating an execution graph pipeline
(including those in libraries) is associated with a name and an index,
determined by the inclusion or omission of a
[VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html) structure in its `pNext`
chain.
For any graphics pipeline libraries, only the name and index of the vertex
or mesh shader stage is linked directly to the graph as a node - other
shader stages in the pipeline will be executed after those shader stages as
normal.
Task shaders cannot be included in a graphics pipeline used for a draw node.

In addition to the shader name and index, an internal “node index” is also
generated for each node, which can be queried with
[vkGetExecutionGraphPipelineNodeIndexAMDX](vkGetExecutionGraphPipelineNodeIndexAMDX.html), and is used exclusively for
initial dispatch of an execution graph.

Valid Usage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09497) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) values

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07984) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid execution graph `VkPipeline` handle

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07985) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07986) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07987) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-10069) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07988) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07988

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07990) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07990

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07991) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-07991

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-10391) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-10391

If a [resource variables](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11798) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11798

If [shader64BitIndexing](../../../../spec/latest/chapters/features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineCreationCacheControl-02878) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](../../../../spec/latest/chapters/features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineProtectedAccess-07368) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07369) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11311) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), `layout` **must**
be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11312) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all shader variables
in the [shader resource interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html)::pMappings

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03365) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03365

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03366) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03366

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03367) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03367

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03368) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03368

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03369) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03369

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03370) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03370

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03576) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-03576

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-04945) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-04945

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09007) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09007

If the [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature is not enabled,
`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09008) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-09008

If `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html), then the `pNext`
chain **must** include a pointer to a valid instance of
[VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html) specifying the address where
the pipeline’s metadata will be saved

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11007) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11007

If `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-stage-09128) VUID-VkExecutionGraphPipelineCreateInfoAMDX-stage-09128

The `stage` member of any element of `pStages` **must** be
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-09129) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-09129

The shader code for the entry point identified by each element of
`pStages` and the rest of the state identified by this structure
**must** adhere to the pipeline linking rules described in the
[Shader Interfaces](../../../../spec/latest/chapters/interfaces.html#interfaces) chapter

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09130) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09130

If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** be
[consistent](../../../../spec/latest/chapters/descriptorsets.html#descriptors-pipelinelayout-consistency) with the layout of
the shaders specified in `pStages`

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-09131) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-09131

If `pLibraryInfo` is not `NULL` and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), each element of `pLibraryInfo->pLibraries`
**must** have been created with a `layout` that is compatible with the
`layout` in this pipeline

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09132) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-09132

If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the number of resources in
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
[VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](VkPipelineCreateFlagBits2.html) set

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-shaderMeshEnqueue-10182) VUID-VkExecutionGraphPipelineCreateInfoAMDX-shaderMeshEnqueue-10182

If the [`shaderMeshEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderMeshEnqueue) feature is
not enabled, and `pLibraryInfo->pLibraries` is not `NULL`,
`pLibraryInfo->pLibraries` **must** not contain any graphics pipelines

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-10183) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-10183

Any element of `pLibraryInfo->pLibraries` identifying a graphics
pipeline **must** have been created with
[all possible state subsets](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-complete)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09134) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-09134

There **must** be no two nodes in the pipeline that share both the same
shader name and index, as specified by
[VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html)

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
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html), and an output payload declared
in any shader in the pipeline does not have a
`PayloadNodeSparseArrayAMDX` decoration, there **must** be a node in the
graph corresponding to every index from 0 to its
`PayloadNodeArraySizeAMDX` decoration

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-12334) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-12334

`flags` **must** not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11271) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11271

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11272) VUID-VkExecutionGraphPipelineCreateInfoAMDX-flags-11272

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all
libraries linked to this pipeline **must** also not have that flag set

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-11363) VUID-VkExecutionGraphPipelineCreateInfoAMDX-None-11363

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
`layout` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-sType) VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_CREATE_INFO_AMDX](VkStructureType.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pNext-pNext) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineCompilerControlCreateInfoAMD](VkPipelineCompilerControlCreateInfoAMD.html) or [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html)

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-unique) VUID-VkExecutionGraphPipelineCreateInfoAMDX-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-parameter) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pStages-parameter

 If `stageCount` is not `0`, and `pStages` is not `NULL`, `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-parameter) VUID-VkExecutionGraphPipelineCreateInfoAMDX-pLibraryInfo-parameter

 If `pLibraryInfo` is not `NULL`, `pLibraryInfo` **must** be a valid pointer to a valid [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) structure

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-parameter) VUID-VkExecutionGraphPipelineCreateInfoAMDX-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkExecutionGraphPipelineCreateInfoAMDX-commonparent) VUID-VkExecutionGraphPipelineCreateInfoAMDX-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkPipeline](VkPipeline.html), [VkPipelineCreateFlags](VkPipelineCreateFlags.html), [VkPipelineLayout](VkPipelineLayout.html), [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkStructureType](VkStructureType.html), [vkCreateExecutionGraphPipelinesAMDX](vkCreateExecutionGraphPipelinesAMDX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#VkExecutionGraphPipelineCreateInfoAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
