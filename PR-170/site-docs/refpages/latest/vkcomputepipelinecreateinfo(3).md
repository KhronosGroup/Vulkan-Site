# VkComputePipelineCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkComputePipelineCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkComputePipelineCreateInfo - Structure specifying parameters of a newly created compute pipeline

The `VkComputePipelineCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkComputePipelineCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkPipelineCreateFlags              flags;
    VkPipelineShaderStageCreateInfo    stage;
    VkPipelineLayout                   layout;
    VkPipeline                         basePipelineHandle;
    int32_t                            basePipelineIndex;
} VkComputePipelineCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) specifying
how the pipeline will be generated.

* 
`stage` is a [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structure
describing the compute shader.

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
[](#VUID-VkComputePipelineCreateInfo-None-09497) VUID-VkComputePipelineCreateInfo-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html) values

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07984) VUID-VkComputePipelineCreateInfo-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid compute `VkPipeline` handle

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07985) VUID-VkComputePipelineCreateInfo-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07986) VUID-VkComputePipelineCreateInfo-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07987) VUID-VkComputePipelineCreateInfo-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkComputePipelineCreateInfo-layout-10069) VUID-VkComputePipelineCreateInfo-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07988) VUID-VkComputePipelineCreateInfo-layout-07988

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07990) VUID-VkComputePipelineCreateInfo-layout-07990

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](VkDescriptorType.html),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07991) VUID-VkComputePipelineCreateInfo-layout-07991

If a [resource variable](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkComputePipelineCreateInfo-None-10391) VUID-VkComputePipelineCreateInfo-None-10391

If a [resource variables](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11798) VUID-VkComputePipelineCreateInfo-flags-11798

If [shader64BitIndexing](../../../../spec/latest/chapters/features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkComputePipelineCreateInfo-pipelineCreationCacheControl-02878) VUID-VkComputePipelineCreateInfo-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](../../../../spec/latest/chapters/features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-pipelineProtectedAccess-07368) VUID-VkComputePipelineCreateInfo-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07369) VUID-VkComputePipelineCreateInfo-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11311) VUID-VkComputePipelineCreateInfo-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), `layout` **must**
be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11312) VUID-VkComputePipelineCreateInfo-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html), all shader variables
in the [shader resource interface](../../../../spec/latest/chapters/interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html)::pMappings

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03365) VUID-VkComputePipelineCreateInfo-flags-03365

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03366) VUID-VkComputePipelineCreateInfo-flags-03366

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03367) VUID-VkComputePipelineCreateInfo-flags-03367

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03368) VUID-VkComputePipelineCreateInfo-flags-03368

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03369) VUID-VkComputePipelineCreateInfo-flags-03369

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03370) VUID-VkComputePipelineCreateInfo-flags-03370

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03576) VUID-VkComputePipelineCreateInfo-flags-03576

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-04945) VUID-VkComputePipelineCreateInfo-flags-04945

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-09007) VUID-VkComputePipelineCreateInfo-flags-09007

If the [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature is not enabled,
`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-09008) VUID-VkComputePipelineCreateInfo-flags-09008

If `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html), then the `pNext`
chain **must** include a pointer to a valid instance of
[VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html) specifying the address where
the pipeline’s metadata will be saved

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11007) VUID-VkComputePipelineCreateInfo-flags-11007

If `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-VkComputePipelineCreateInfo-stage-00701) VUID-VkComputePipelineCreateInfo-stage-00701

The `stage` member of `stage` **must** be
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-stage-00702) VUID-VkComputePipelineCreateInfo-stage-00702

The shader code for the entry point identified by `stage` and the
rest of the state identified by this structure **must** adhere to the
pipeline linking rules described in the [Shader Interfaces](../../../../spec/latest/chapters/interfaces.html#interfaces)
chapter

* 
[](#VUID-VkComputePipelineCreateInfo-layout-01687) VUID-VkComputePipelineCreateInfo-layout-01687

If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the number of resources in
`layout` accessible to the compute shader stage **must** be less than
or equal to `VkPhysicalDeviceLimits`::`maxPerStageResources`

* 
[](#VUID-VkComputePipelineCreateInfo-shaderEnqueue-09177) VUID-VkComputePipelineCreateInfo-shaderEnqueue-09177

If the [`shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) feature is not
enabled,
`flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-09178) VUID-VkComputePipelineCreateInfo-flags-09178

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html), the shader specified by
`stage` **must** not declare the `ShaderEnqueueAMDX` capability

* 
[](#VUID-VkComputePipelineCreateInfo-pipelineStageCreationFeedbackCount-06566) VUID-VkComputePipelineCreateInfo-pipelineStageCreationFeedbackCount-06566

If
[VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be `1`

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07367) VUID-VkComputePipelineCreateInfo-flags-07367

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07996) VUID-VkComputePipelineCreateInfo-flags-07996

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineCreateInfo-None-11367) VUID-VkComputePipelineCreateInfo-None-11367

If [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html),
`layout` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkComputePipelineCreateInfo-sType-sType) VUID-VkComputePipelineCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkComputePipelineCreateInfo-pNext-pNext) VUID-VkComputePipelineCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html), [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html), [VkPipelineCompilerControlCreateInfoAMD](VkPipelineCompilerControlCreateInfoAMD.html), [VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html), [VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html), [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html), or [VkSubpassShadingPipelineCreateInfoHUAWEI](VkSubpassShadingPipelineCreateInfoHUAWEI.html)

* 
[](#VUID-VkComputePipelineCreateInfo-sType-unique) VUID-VkComputePipelineCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkComputePipelineCreateInfo-stage-parameter) VUID-VkComputePipelineCreateInfo-stage-parameter

 `stage` **must** be a valid [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structure

* 
[](#VUID-VkComputePipelineCreateInfo-layout-parameter) VUID-VkComputePipelineCreateInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-VkComputePipelineCreateInfo-commonparent) VUID-VkComputePipelineCreateInfo-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipeline](VkPipeline.html), [VkPipelineCreateFlags](VkPipelineCreateFlags.html), [VkPipelineLayout](VkPipelineLayout.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkStructureType](VkStructureType.html), [vkCreateComputePipelines](vkCreateComputePipelines.html), [vkGetPipelineIndirectMemoryRequirementsNV](vkGetPipelineIndirectMemoryRequirementsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkComputePipelineCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
