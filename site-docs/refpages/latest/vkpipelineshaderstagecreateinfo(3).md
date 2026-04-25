# VkPipelineShaderStageCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineShaderStageCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineShaderStageCreateInfo - Structure specifying parameters of a newly created pipeline shader stage

The `VkPipelineShaderStageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineShaderStageCreateInfo {
    VkStructureType                     sType;
    const void*                         pNext;
    VkPipelineShaderStageCreateFlags    flags;
    VkShaderStageFlagBits               stage;
    VkShaderModule                      module;
    const char*                         pName;
    const VkSpecializationInfo*         pSpecializationInfo;
} VkPipelineShaderStageCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineShaderStageCreateFlagBits](VkPipelineShaderStageCreateFlagBits.html)
specifying how the pipeline shader stage will be generated.

* 
`stage` is a [VkShaderStageFlagBits](VkShaderStageFlagBits.html) value specifying a single
pipeline stage.

* 
`module` is
optionally
a [VkShaderModule](VkShaderModule.html) object containing the shader code for this stage.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`pName` is a pointer to a null-terminated UTF-8 string specifying
the entry point name of the shader for this stage.

* 
`pSpecializationInfo` is a pointer to a [VkSpecializationInfo](VkSpecializationInfo.html)
structure, as described in
[Specialization Constants](../../../../spec/latest/chapters/pipelines.html#pipelines-specialization-constants), or
`NULL`.

If `module` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the shader code used by the
pipeline is defined by `module`.
If `module` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the shader code is defined by the
chained [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) if present.

If the [`shaderModuleIdentifier`](../../../../spec/latest/chapters/features.html#features-shaderModuleIdentifier)
feature is enabled, applications **can** omit shader code for `stage` and
instead provide a module identifier.
This is done by including a
[VkPipelineShaderStageModuleIdentifierCreateInfoEXT](VkPipelineShaderStageModuleIdentifierCreateInfoEXT.html) structure with
`identifierSize` not equal to 0 in the `pNext` chain.
A shader stage created in this way is equivalent to one created using a
shader module with the same identifier.
The identifier allows an implementation to look up a pipeline without
consuming a valid SPIR-V module.
If a pipeline is not found, pipeline compilation is not possible and the
implementation **must** fail as specified by
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html).

When an identifier is used in lieu of a shader module, implementations **may**
fail pipeline compilation with [VK_PIPELINE_COMPILE_REQUIRED](VkResult.html) for any
reason.

|  | The rationale for the relaxed requirement on implementations to return a
| --- | --- |
pipeline with [VkPipelineShaderStageModuleIdentifierCreateInfoEXT](VkPipelineShaderStageModuleIdentifierCreateInfoEXT.html) is
that layers or tools may intercept pipeline creation calls and require the
full SPIR-V context to operate correctly.
ICDs are not expected to fail pipeline compilation if the pipeline exists in
a cache somewhere. |

Applications **can** use identifiers when creating pipelines with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html).
When creating such pipelines, [VK_SUCCESS](VkResult.html) **may** be returned, but
subsequently fail when referencing the pipeline in a
[VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) struct.
Applications **must** allow pipeline compilation to fail during link steps with
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) as it **may**
not be possible to determine if a pipeline **can** be created from identifiers
until the link step.

Valid Usage

* 
[](#VUID-VkPipelineShaderStageCreateInfo-descriptorHeap-11314) VUID-VkPipelineShaderStageCreateInfo-descriptorHeap-11314

If the [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature is not
enabled,
[VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html)::`mappingCount`
**must** be 0

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11315) VUID-VkPipelineShaderStageCreateInfo-pNext-11315

If the `pNext` chain specifies a [    descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html),
or [VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](VkDescriptorMappingSourceEXT.html), the mapped
resource in the shader **must** be a variable with a structure type
decorated with `Block` in the `Uniform` `Storage` `Class`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11316) VUID-VkPipelineShaderStageCreateInfo-pNext-11316

If the `pNext` chain specifies a [    descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](VkDescriptorMappingSourceEXT.html), the mapped structure
**must** not be larger than the sum of `pushDataOffset` used in the
mapping and [`maxPushDataSize`](../../../../spec/latest/chapters/limits.html#limits-maxPushDataSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11317) VUID-VkPipelineShaderStageCreateInfo-pNext-11317

If the `pNext` chain specifies a [    descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](VkDescriptorMappingSourceEXT.html), the sum of
mapped structure size and `shaderRecordDataOffset` used in the
mapping **must** not be larger than
[`maxShaderGroupStride`](../../../../spec/latest/chapters/limits.html#limits-maxShaderGroupStride)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11318) VUID-VkPipelineShaderStageCreateInfo-pNext-11318

If the `pNext` chain specifies a [    descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html) or
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), the mapped resource
in the shader **must** be one of:

A variable with a structure type decorated with `Block` in the
`Uniform` `Storage` `Class`

* 
A variable with a structure type decorated with `BufferBlock` in the
`Uniform` `Storage` `Class`

* 
A variable with a structure type decorated with `Block` in the
`StorageBuffer` `Storage` `Class`

* 
A `OpTypeAccelerationStructureKHR` variable

* 
A `OpTypeAccelerationStructureNV` variable

[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11378) VUID-VkPipelineShaderStageCreateInfo-pNext-11378

    If the `pNext` chain specifies a [    descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
    [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](VkDescriptorMappingSourceEXT.html), the
    `OpArrayLength`
or `OpUntypedArrayLengthKHR`
    instruction **must** not be used on that resource

[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11399) VUID-VkPipelineShaderStageCreateInfo-pNext-11399

If the `pNext` chain specifies a [    descriptor mapping](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](VkDescriptorMappingSourceEXT.html),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](VkDescriptorMappingSourceEXT.html), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](VkDescriptorMappingSourceEXT.html),
and the mapped resource declaration is an array, the
`pEmbeddedSampler` member of the corresponding mapping structure
**must** be `NULL`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00704) VUID-VkPipelineShaderStageCreateInfo-stage-00704

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `stage` **must** not be [VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00705) VUID-VkPipelineShaderStageCreateInfo-stage-00705

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `stage` **must** not be
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02091) VUID-VkPipelineShaderStageCreateInfo-stage-02091

If the [`meshShaders`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not
enabled, `stage` **must** not be [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02092) VUID-VkPipelineShaderStageCreateInfo-stage-02092

If the [`taskShaders`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not
enabled, `stage` **must** not be [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-clustercullingShader-07813) VUID-VkPipelineShaderStageCreateInfo-clustercullingShader-07813

If the [`clustercullingShader`](../../../../spec/latest/chapters/features.html#features-clustercullingShader)
feature is not enabled, `stage` **must** not be
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](VkShaderStageFlagBits.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00706) VUID-VkPipelineShaderStageCreateInfo-stage-00706

`stage` **must** not be [VK_SHADER_STAGE_ALL_GRAPHICS](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_ALL](VkShaderStageFlagBits.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pName-00707) VUID-VkPipelineShaderStageCreateInfo-pName-00707

`pName` **must** be the name of an `OpEntryPoint` in `module`
with an execution model that matches `stage`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-maxClipDistances-00708) VUID-VkPipelineShaderStageCreateInfo-maxClipDistances-00708

If the identified entry point includes any variable in its interface
that is declared with the `ClipDistance` `BuiltIn` decoration,
that variable **must** not have an array size greater than
`VkPhysicalDeviceLimits`::`maxClipDistances`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-maxCullDistances-00709) VUID-VkPipelineShaderStageCreateInfo-maxCullDistances-00709

If the identified entry point includes any variable in its interface
that is declared with the `CullDistance` `BuiltIn` decoration,
that variable **must** not have an array size greater than
`VkPhysicalDeviceLimits`::`maxCullDistances`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-maxCombinedClipAndCullDistances-00710) VUID-VkPipelineShaderStageCreateInfo-maxCombinedClipAndCullDistances-00710

If the identified entry point includes variables in its interface that
are declared with the `ClipDistance` `BuiltIn` decoration and
variables in its interface that are declared with the `CullDistance`
`BuiltIn` decoration, those variables **must** not have array sizes
which sum to more than
`VkPhysicalDeviceLimits`::`maxCombinedClipAndCullDistances`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-maxSampleMaskWords-00711) VUID-VkPipelineShaderStageCreateInfo-maxSampleMaskWords-00711

If the identified entry point includes any variable in its interface
that is declared with the `SampleMask` `BuiltIn` decoration, that
variable **must** not have an array size greater than
`VkPhysicalDeviceLimits`::`maxSampleMaskWords`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00713) VUID-VkPipelineShaderStageCreateInfo-stage-00713

If `stage` is [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html) or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html), and the identified
entry point has an `OpExecutionMode` instruction specifying a patch
size with `OutputVertices`, the patch size **must** be greater than `0`
and less than or equal to
`VkPhysicalDeviceLimits`::`maxTessellationPatchSize`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00714) VUID-VkPipelineShaderStageCreateInfo-stage-00714

If `stage` is [VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html), the identified
entry point **must** have an `OpExecutionMode` instruction specifying a
maximum output vertex count that is greater than `0` and less than or
equal to `VkPhysicalDeviceLimits`::`maxGeometryOutputVertices`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00715) VUID-VkPipelineShaderStageCreateInfo-stage-00715

If `stage` is [VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html), the identified
entry point **must** have an `OpExecutionMode` instruction specifying an
invocation count that is greater than `0` and less than or equal to
`VkPhysicalDeviceLimits`::`maxGeometryShaderInvocations`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02596) VUID-VkPipelineShaderStageCreateInfo-stage-02596

If `stage` is either [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html), and the identified entry point
writes to `Layer` for any primitive, it **must** write the same value to
`Layer` for all vertices of a given primitive

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02597) VUID-VkPipelineShaderStageCreateInfo-stage-02597

If `stage` is either [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html), and the identified entry point
writes to `ViewportIndex` for any primitive, it **must** write the same
value to `ViewportIndex` for all vertices of a given primitive

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-06685) VUID-VkPipelineShaderStageCreateInfo-stage-06685

If `stage` is [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html), and the identified
entry point writes to `FragDepth` in any execution path, all
execution paths that are not exclusive to helper invocations **must**
either discard the fragment, or write or initialize the value of
`FragDepth`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-06686) VUID-VkPipelineShaderStageCreateInfo-stage-06686

If `stage` is [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html), and the identified
entry point writes to `FragStencilRefEXT` in any execution path, all
execution paths that are not exclusive to helper invocations **must**
either discard the fragment, or write or initialize the value of
`FragStencilRefEXT`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02784) VUID-VkPipelineShaderStageCreateInfo-flags-02784

If `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)
flag set, the [    `subgroupSizeControl`](../../../../spec/latest/chapters/features.html#features-subgroupSizeControl) feature **must** be enabled

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02785) VUID-VkPipelineShaderStageCreateInfo-flags-02785

If `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) flag
set, the [`computeFullSubgroups`](../../../../spec/latest/chapters/features.html#features-computeFullSubgroups)
feature **must** be enabled

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-08988) VUID-VkPipelineShaderStageCreateInfo-flags-08988

If `flags` includes
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html),
`stage` **must** be
one of [VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02754) VUID-VkPipelineShaderStageCreateInfo-pNext-02754

If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure
is included in the `pNext` chain, `flags` **must** not have the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)
flag set

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02755) VUID-VkPipelineShaderStageCreateInfo-pNext-02755

If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure
is included in the `pNext` chain, the
[`subgroupSizeControl`](../../../../spec/latest/chapters/features.html#features-subgroupSizeControl) feature
**must** be enabled, and `stage` **must** be a valid bit specified in
[`requiredSubgroupSizeStages`](../../../../spec/latest/chapters/devsandqueues.html#limits-requiredSubgroupSizeStages)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02756) VUID-VkPipelineShaderStageCreateInfo-pNext-02756

    If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure
    is included in the `pNext` chain and `stage` is
    [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_MESH_BIT_EXT](VkShaderStageFlagBits.html), or [VK_SHADER_STAGE_TASK_BIT_EXT](VkShaderStageFlagBits.html),
    the local workgroup size of the shader **must** be less than or equal to
    the product of
    [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)::`requiredSubgroupSize`
    and [    `maxComputeWorkgroupSubgroups`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxComputeWorkgroupSubgroups)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02757) VUID-VkPipelineShaderStageCreateInfo-pNext-02757

If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure
is included in the `pNext` chain, and `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) flag
set, the local workgroup size in the X dimension of the pipeline **must**
be a multiple of
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)::`requiredSubgroupSize`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02758) VUID-VkPipelineShaderStageCreateInfo-flags-02758

If `flags` has both the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) and
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)
flags set, the local workgroup size in the X dimension of the pipeline
**must** be a multiple of [`maxSubgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxSubgroupSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02759) VUID-VkPipelineShaderStageCreateInfo-flags-02759

If `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html) flag
set and `flags` does not have the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)
flag set and no
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html) structure is
included in the `pNext` chain, the local workgroup size in the X
dimension of the pipeline **must** be a multiple of [    `subgroupSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-module-08987) VUID-VkPipelineShaderStageCreateInfo-module-08987

If `module` uses the `OpTypeCooperativeMatrixKHR` instruction
with a `Scope` equal to `Subgroup`, then the local workgroup size
in the X dimension of the pipeline **must** be a multiple of the
[effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-module-10169) VUID-VkPipelineShaderStageCreateInfo-module-10169

If `module` uses the `OpTypeCooperativeMatrixKHR` instruction
with a `Scope` equal to `Workgroup`, then the local workgroup size
in the X dimension of the pipeline **must** be a multiple of the
[effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) and the
total local workgroup size **must** be a power of two multiple of the
[effective subgroup size](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) and **must**
be less than or equal to
[cooperativeMatrixWorkgroupScopeMaxWorkgroupSize](../../../../spec/latest/chapters/limits.html#limits-cooperativeMatrixWorkgroupScopeMaxWorkgroupSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-08771) VUID-VkPipelineShaderStageCreateInfo-stage-08771

If a shader module identifier is not specified for this `stage`,
`module` **must** be a valid [VkShaderModule](VkShaderModule.html)
, or the `pNext` chain of the parent `Vk*CreateInfo` structure
**must** set [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` to a value
greater than `0`,
if none of the following features are enabled:

[`graphicsPipelineLibrary`](../../../../spec/latest/chapters/features.html#features-graphicsPipelineLibrary)

* 
[`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5)

[](#VUID-VkPipelineShaderStageCreateInfo-stage-06845) VUID-VkPipelineShaderStageCreateInfo-stage-06845

If a shader module identifier is not specified for this `stage`,
`module` **must** be a valid [VkShaderModule](VkShaderModule.html), or
there **must** be a valid [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structure in the
`pNext` chain
, or the `pNext` chain of the parent `Vk*CreateInfo` structure
**must** set [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` to a value
greater than `0`,

[](#VUID-VkPipelineShaderStageCreateInfo-stage-06844) VUID-VkPipelineShaderStageCreateInfo-stage-06844

If a shader module identifier is specified for this `stage`, the
`pNext` chain **must** not include a [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)
structure

[](#VUID-VkPipelineShaderStageCreateInfo-stage-06848) VUID-VkPipelineShaderStageCreateInfo-stage-06848

If a shader module identifier is specified for this `stage`,
`module` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-06849) VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-06849

If a shader module identifier is not specified, the
shader code used by the pipeline **must** be valid as described by the
[Khronos SPIR-V Specification](../../../../spec/latest/chapters/introduction.html#spirv-spec) after applying the
specializations provided in `pSpecializationInfo`, if any, and then
converting all specialization constants into fixed constants

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-sType-sType) VUID-VkPipelineShaderStageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-pNext) VUID-VkPipelineShaderStageCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html), [VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html), [VkPipelineShaderStageModuleIdentifierCreateInfoEXT](VkPipelineShaderStageModuleIdentifierCreateInfoEXT.html), [VkPipelineShaderStageNodeCreateInfoAMDX](VkPipelineShaderStageNodeCreateInfoAMDX.html), [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html), [VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html), [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html), or [VkShaderModuleValidationCacheCreateInfoEXT](VkShaderModuleValidationCacheCreateInfoEXT.html)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-sType-unique) VUID-VkPipelineShaderStageCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-parameter) VUID-VkPipelineShaderStageCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineShaderStageCreateFlagBits](VkPipelineShaderStageCreateFlagBits.html) values

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-parameter) VUID-VkPipelineShaderStageCreateInfo-stage-parameter

 `stage` **must** be a valid [VkShaderStageFlagBits](VkShaderStageFlagBits.html) value

* 
[](#VUID-VkPipelineShaderStageCreateInfo-module-parameter) VUID-VkPipelineShaderStageCreateInfo-module-parameter

 If `module` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `module` **must** be a valid [VkShaderModule](VkShaderModule.html) handle

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pName-parameter) VUID-VkPipelineShaderStageCreateInfo-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-parameter) VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-parameter

 If `pSpecializationInfo` is not `NULL`, `pSpecializationInfo` **must** be a valid pointer to a valid [VkSpecializationInfo](VkSpecializationInfo.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkGraphicsShaderGroupCreateInfoNV](VkGraphicsShaderGroupCreateInfoNV.html), [VkPipelineShaderStageCreateFlags](VkPipelineShaderStageCreateFlags.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkShaderModule](VkShaderModule.html), [VkShaderStageFlagBits](VkShaderStageFlagBits.html), [VkSpecializationInfo](VkSpecializationInfo.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineShaderStageCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
