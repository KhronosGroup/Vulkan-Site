# Ray Tracing

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/raytracing.html

## Table of Contents

- [Shader Call Instructions](#ray-tracing-shader-call)
- [Shader_Call_Instructions](#ray-tracing-shader-call)
- [Ray Tracing Commands](#ray-tracing-commands)
- [Ray_Tracing_Commands](#ray-tracing-commands)
- [Shader Binding Table](#shader-binding-table)
- [Shader_Binding_Table](#shader-binding-table)
- [Indexing Rules](#shader-binding-table-indexing-rules)
- [Ray Generation Shaders](#_ray_generation_shaders)
- [Ray_Generation_Shaders](#_ray_generation_shaders)
- [Hit Shaders](#shader-binding-table-hit-shader-indexing)
- [Miss Shaders](#_miss_shaders)
- [Callable Shaders](#_callable_shaders)
- [Ray Tracing Pipeline Stack](#ray-tracing-pipeline-stack)
- [Ray_Tracing_Pipeline_Stack](#ray-tracing-pipeline-stack)
- [Ray Tracing Capture Replay](#ray-tracing-capture-replay)
- [Ray_Tracing_Capture_Replay](#ray-tracing-capture-replay)
- [Ray Tracing Validation](#ray-tracing-validation)
- [Ray_Tracing_Validation](#ray-tracing-validation)

## Content

Ray tracing uses a separate rendering pipeline from both the graphics and
compute pipelines (see [Ray Tracing Pipeline](pipelines.html#pipelines-ray-tracing)).

![ray tracing execution](../_images/ray_tracing_execution.svg)

Figure 1. Ray tracing pipeline execution

Caption

Interaction between the different shader stages in the ray tracing pipeline

Within the ray tracing pipeline, a [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instruction **can** be called to perform a [ray traversal](raytraversal.html#ray-traversal) that invokes the various ray tracing shader stages during its
execution.
The relationship between the ray tracing pipeline object and the geometries
present in the acceleration structure traversed is passed into the ray
tracing command in a [VkBuffer](resources.html#VkBuffer) object known as a *shader binding
table*.
`OpExecuteCallableKHR` can also be used in ray tracing pipelines to
invoke a [callable shader](shaders.html#shaders-callable).

During execution, control alternates between scheduling and other
operations.
The scheduling functionality is implementation-specific and is responsible
for workload execution.
The shader stages are programmable.
[*Traversal*](raytraversal.html#ray-traversal), which refers to the process of traversing
acceleration structures to find potential intersections of rays with
geometry, is fixed function.

The programmable portions of the pipeline are exposed in a single-ray
programming model, with each invocation handling one ray at a time.
Memory operations **can** be synchronized using standard memory barriers.
The `Workgroup` scope and variables with a storage class of
`Workgroup` **must** not be used in the ray tracing pipeline.

A *shader call* is an instruction which **may** cause execution to continue
elsewhere by creating one or more invocations that execute a different
shader stage.

The following table lists all shader call instructions and which stages each
one **can** directly call.

| Instruction | Intersection | Any-Hit | Closest Hit | Miss | Callable |
| --- | --- | --- | --- | --- | --- |
| `OpTraceRayKHR` | X | X | X | X |  |
| `OpTraceRayMotionNV` | X | X | X | X |  |
| `OpReportIntersectionKHR` |  | X |  |  |  |
| `OpExecuteCallableKHR` |  |  |  |  | X |
| `OpHitObjectTraceRayNV` | X | X |  |  |  |
| `OpHitObjectTraceRayMotionNV` | X | X |  |  |  |
| `OpHitObjectExecuteShaderNV` |  |  | X | X |  |
| `OpHitObjectExecuteShaderEXT` |  |  | X | X |  |
| `OpHitObjectTraceRayEXT` | X | X |  |  |  |
| `OpHitObjectReorderExecuteShaderEXT` |  |  | X | X |  |
| `OpHitObjectTraceReorderExecuteEXT` | X | X | X | X |  |
| `OpHitObjectTraceRayMotionEXT` | X | X |  |  |  |
| `OpHitObjectTraceMotionReorderExecuteEXT` | X | X | X | X |  |

The invocations created by shader call instructions are grouped into
subgroups by the implementation.
Those subgroups **may** be unrelated to the subgroup of the parent invocation.

*Pipeline trace ray instructions* **can** be used recursively; invoked shaders
**can** themselves execute pipeline trace ray instructions, to a maximum depth
defined by the
[`maxRecursionDepth`](limits.html#limits-maxRecursionDepth) or
[`maxRayRecursionDepth`](limits.html#limits-maxRayRecursionDepth) limit.

Shaders directly invoked from the API always have a recursion depth of 0;
each shader executed by a pipeline trace ray instruction has a recursion
depth one higher than the recursion depth of the shader which invoked it.
Applications **must** not invoke a shader with a recursion depth greater than
the value of
`maxRecursionDepth` or
`maxPipelineRayRecursionDepth` specified in the pipeline.

There is no explicit recursion limit for other shader call instructions
which may recurse (e.g. `OpExecuteCallableKHR`) but there is an upper
bound determined by the [stack size](#ray-tracing-pipeline-stack).

An *invocation repack instruction* is a ray tracing instruction where the
implementation **may** change the set of invocations that are executing.
When a repack instruction is encountered, the invocation is suspended and a
new invocation begins and executes the instruction.
After executing the repack instruction (which **may** result in other ray
tracing shader stages executing) the new invocation ends and the original
invocation is resumed, but it **may** be resumed in a different subgroup or at
a different `SubgroupLocalInvocationId` within the same subgroup.
When a subset of invocations in a subgroup execute the invocation repack
instruction, those that do not execute it remain in the same subgroup at the
same `SubgroupLocalInvocationId`.

The `OpTraceRayKHR`,
`OpTraceRayMotionNV`,
`OpReorderThreadWithHintNV`, `OpReorderThreadWithHitObjectNV`,
`OpReorderThreadWithHintEXT`, `OpReorderThreadWithHitObjectEXT`,
`OpHitObjectTraceRayEXT`, `OpHitObjectReorderExecuteShaderEXT`,
`OpHitObjectTraceReorderExecuteEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`,
`OpReportIntersectionKHR`, and `OpExecuteCallableKHR` instructions are
invocation repack instructions.

The invocations that are executing before a shader call instruction, after
the instruction, or are created by the instruction, are
[shader-call-related](../appendices/memorymodel.html#shader-call-related).

If the implementation changes the composition of subgroups, the values of
`SubgroupSize`, `SubgroupLocalInvocationId`,
`SMIDNV`, `WarpIDNV`,
and builtin variables that are derived from them (`SubgroupEqMask`,
`SubgroupGeMask`, `SubgroupGtMask`, `SubgroupLeMask`,
`SubgroupLtMask`) **must** be changed accordingly by the invocation repack
instruction.
The application **must** use [`Volatile` semantics](../appendices/spirvenv.html#builtin-volatile-semantics) on these `BuiltIn` variables when used in the ray generation,
closest hit, miss, intersection, and callable shaders.
Similarly, the application **must** use `Volatile` semantics on any
`RayTmaxKHR` decorated `Builtin` used in an intersection shader.

|  | [Subgroup operations](shaders.html#shaders-group-operations) are permitted in the
| --- | --- |
programmable ray tracing shader stages.
However, shader call instructions place a bound on where results of subgroup
instructions or subgroup-scoped instructions that execute the dynamic
instance of that instruction are potentially valid.
For example, care **must** be taken when using the result of a ballot operation
that was computed before an invocation repack instruction, after that repack
instruction.
The ballot **may** be incorrect as the set of invocations could have changed.

While the `SubgroupSize` built-in is required to be declared
`Volatile`, its value will never change unless
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits) is set
on pipeline creation, as without that bit set, its value is required to
match that of [VkPhysicalDeviceSubgroupProperties](limits.html#VkPhysicalDeviceSubgroupProperties)::`subgroupSize`.

For clock operations, the value of a `Subgroup` scoped
`OpReadClockKHR` read before the dynamic instance of a repack instruction
**should** not be compared to the result of that clock instruction after the
repack instruction. |

When a ray tracing shader executes a dynamic instance of an invocation
repack instruction which results in another ray tracing shader being
invoked, their instructions are related by
[shader-call-order](../appendices/memorymodel.html#shader-call-order).

For ray tracing invocations that are
[shader-call-related](../appendices/memorymodel.html#shader-call-related):

* 
[memory operations](../appendices/memorymodel.html#memory-model-memory-operation) on
    `StorageBuffer`, `Image`, and `ShaderRecordBufferKHR` storage
    classes **can** be synchronized using the
`ShaderCallKHR`
    scope.

* 
the `CallableDataKHR`, `IncomingCallableDataKHR`,
`RayPayloadKHR`, `HitAttributeKHR`, and `IncomingRayPayloadKHR`
storage classes are [system-synchronized](../appendices/memorymodel.html#memory-model-shader-io) and
no application availability and visibility operations are required.

* 
memory operations within a single invocation before and after the shader
call instruction are ordered by
[program-order](../appendices/memorymodel.html#memory-model-program-order) and do not require explicit
synchronization.

*Ray tracing commands* provoke work in the ray tracing pipeline.
Ray tracing commands are recorded into a command buffer and when executed by
a queue will produce work that executes according to the bound ray tracing
pipeline.
A ray tracing pipeline **must** be bound to a command buffer before any ray
tracing commands are recorded in that command buffer.

To dispatch ray tracing use:

// Provided by VK_KHR_ray_tracing_pipeline
void vkCmdTraceRaysKHR(
    VkCommandBuffer                             commandBuffer,
    const VkStridedDeviceAddressRegionKHR*      pRaygenShaderBindingTable,
    const VkStridedDeviceAddressRegionKHR*      pMissShaderBindingTable,
    const VkStridedDeviceAddressRegionKHR*      pHitShaderBindingTable,
    const VkStridedDeviceAddressRegionKHR*      pCallableShaderBindingTable,
    uint32_t                                    width,
    uint32_t                                    height,
    uint32_t                                    depth);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pRaygenShaderBindingTable` is a
[VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) that holds the shader binding
table data for the ray generation shader stage.

* 
`pMissShaderBindingTable` is a [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR)
that holds the shader binding table data for the miss shader stage.

* 
`pHitShaderBindingTable` is a [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR)
that holds the shader binding table data for the hit shader stage.

* 
`pCallableShaderBindingTable` is a
[VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) that holds the shader binding
table data for the callable shader stage.

* 
`width` is the width of the ray trace query dimensions.

* 
`height` is height of the ray trace query dimensions.

* 
`depth` is depth of the ray trace query dimensions.

When the command is executed, a ray generation group of `width`
× `height` × `depth` rays is assembled.

Valid Usage

* 
[](#VUID-vkCmdTraceRaysKHR-magFilter-04553) VUID-vkCmdTraceRaysKHR-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-magFilter-09598) VUID-vkCmdTraceRaysKHR-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-mipmapMode-04770) VUID-vkCmdTraceRaysKHR-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-mipmapMode-09599) VUID-vkCmdTraceRaysKHR-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-unnormalizedCoordinates-09635) VUID-vkCmdTraceRaysKHR-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdTraceRaysKHR-None-08609) VUID-vkCmdTraceRaysKHR-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysKHR-None-08610) VUID-vkCmdTraceRaysKHR-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdTraceRaysKHR-None-08611) VUID-vkCmdTraceRaysKHR-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdTraceRaysKHR-None-06479) VUID-vkCmdTraceRaysKHR-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-None-02691) VUID-vkCmdTraceRaysKHR-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-None-07888) VUID-vkCmdTraceRaysKHR-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-None-02692) VUID-vkCmdTraceRaysKHR-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-None-02693) VUID-vkCmdTraceRaysKHR-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysKHR-filterCubic-02694) VUID-vkCmdTraceRaysKHR-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysKHR-filterCubicMinmax-02695) VUID-vkCmdTraceRaysKHR-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysKHR-cubicRangeClamp-09212) VUID-vkCmdTraceRaysKHR-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdTraceRaysKHR-reductionMode-09213) VUID-vkCmdTraceRaysKHR-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdTraceRaysKHR-selectableCubicWeights-09214) VUID-vkCmdTraceRaysKHR-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdTraceRaysKHR-flags-02696) VUID-vkCmdTraceRaysKHR-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdTraceRaysKHR-OpTypeImage-07027) VUID-vkCmdTraceRaysKHR-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpTypeImage-07028) VUID-vkCmdTraceRaysKHR-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpTypeImage-07029) VUID-vkCmdTraceRaysKHR-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpTypeImage-07030) VUID-vkCmdTraceRaysKHR-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-None-08600) VUID-vkCmdTraceRaysKHR-None-08600

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
[](#VUID-vkCmdTraceRaysKHR-None-08601) VUID-vkCmdTraceRaysKHR-None-08601

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
[](#VUID-vkCmdTraceRaysKHR-None-10068) VUID-vkCmdTraceRaysKHR-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdTraceRaysKHR-maintenance4-08602) VUID-vkCmdTraceRaysKHR-maintenance4-08602

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
[](#VUID-vkCmdTraceRaysKHR-None-08114) VUID-vkCmdTraceRaysKHR-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-imageLayout-00344) VUID-vkCmdTraceRaysKHR-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdTraceRaysKHR-None-08115) VUID-vkCmdTraceRaysKHR-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-None-08116) VUID-vkCmdTraceRaysKHR-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-None-08604) VUID-vkCmdTraceRaysKHR-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdTraceRaysKHR-None-08117) VUID-vkCmdTraceRaysKHR-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-None-08119) VUID-vkCmdTraceRaysKHR-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysKHR-None-08605) VUID-vkCmdTraceRaysKHR-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysKHR-None-08606) VUID-vkCmdTraceRaysKHR-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdTraceRaysKHR-None-08608) VUID-vkCmdTraceRaysKHR-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdTraceRaysKHR-uniformBuffers-06935) VUID-vkCmdTraceRaysKHR-uniformBuffers-06935

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
[](#VUID-vkCmdTraceRaysKHR-None-08612) VUID-vkCmdTraceRaysKHR-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysKHR-storageBuffers-06936) VUID-vkCmdTraceRaysKHR-storageBuffers-06936

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
[](#VUID-vkCmdTraceRaysKHR-None-08613) VUID-vkCmdTraceRaysKHR-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysKHR-commandBuffer-02707) VUID-vkCmdTraceRaysKHR-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdTraceRaysKHR-viewType-07752) VUID-vkCmdTraceRaysKHR-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdTraceRaysKHR-format-07753) VUID-vkCmdTraceRaysKHR-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageWrite-08795) VUID-vkCmdTraceRaysKHR-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageWrite-08796) VUID-vkCmdTraceRaysKHR-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageWrite-04469) VUID-vkCmdTraceRaysKHR-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdTraceRaysKHR-SampledType-04470) VUID-vkCmdTraceRaysKHR-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdTraceRaysKHR-SampledType-04471) VUID-vkCmdTraceRaysKHR-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysKHR-SampledType-04472) VUID-vkCmdTraceRaysKHR-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdTraceRaysKHR-SampledType-04473) VUID-vkCmdTraceRaysKHR-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysKHR-sparseImageInt64Atomics-04474) VUID-vkCmdTraceRaysKHR-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdTraceRaysKHR-sparseImageInt64Atomics-04475) VUID-vkCmdTraceRaysKHR-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06971) VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06972) VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageBoxFilterQCOM-06973) VUID-vkCmdTraceRaysKHR-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdTraceRaysKHR-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdTraceRaysKHR-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdTraceRaysKHR-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06977) VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06978) VUID-vkCmdTraceRaysKHR-OpImageSampleWeightedQCOM-06978

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
[](#VUID-vkCmdTraceRaysKHR-OpImageBlockMatchWindow-09215) VUID-vkCmdTraceRaysKHR-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageBlockMatchWindow-09216) VUID-vkCmdTraceRaysKHR-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdTraceRaysKHR-OpImageBlockMatchWindow-09217) VUID-vkCmdTraceRaysKHR-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysKHR-None-07288) VUID-vkCmdTraceRaysKHR-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdTraceRaysKHR-None-09600) VUID-vkCmdTraceRaysKHR-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdTraceRaysKHR-commandBuffer-10746) VUID-vkCmdTraceRaysKHR-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdTraceRaysKHR-None-10678) VUID-vkCmdTraceRaysKHR-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdTraceRaysKHR-None-10679) VUID-vkCmdTraceRaysKHR-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdTraceRaysKHR-pDescription-09900) VUID-vkCmdTraceRaysKHR-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdTraceRaysKHR-dimensionCount-09905) VUID-vkCmdTraceRaysKHR-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdTraceRaysKHR-OpTypeTensorARM-09906) VUID-vkCmdTraceRaysKHR-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdTraceRaysKHR-None-11297) VUID-vkCmdTraceRaysKHR-None-11297

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
[](#VUID-vkCmdTraceRaysKHR-None-11298) VUID-vkCmdTraceRaysKHR-None-11298

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
[](#VUID-vkCmdTraceRaysKHR-None-11299) VUID-vkCmdTraceRaysKHR-None-11299

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
[](#VUID-vkCmdTraceRaysKHR-None-11397) VUID-vkCmdTraceRaysKHR-None-11397

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
[](#VUID-vkCmdTraceRaysKHR-None-11300) VUID-vkCmdTraceRaysKHR-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdTraceRaysKHR-None-11301) VUID-vkCmdTraceRaysKHR-None-11301

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
[](#VUID-vkCmdTraceRaysKHR-None-11302) VUID-vkCmdTraceRaysKHR-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysKHR-None-11304) VUID-vkCmdTraceRaysKHR-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdTraceRaysKHR-None-11305) VUID-vkCmdTraceRaysKHR-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdTraceRaysKHR-None-11306) VUID-vkCmdTraceRaysKHR-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysKHR-None-11308) VUID-vkCmdTraceRaysKHR-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdTraceRaysKHR-None-11309) VUID-vkCmdTraceRaysKHR-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdTraceRaysKHR-None-11372) VUID-vkCmdTraceRaysKHR-None-11372

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
[](#VUID-vkCmdTraceRaysKHR-None-11373) VUID-vkCmdTraceRaysKHR-None-11373

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
[](#VUID-vkCmdTraceRaysKHR-None-11374) VUID-vkCmdTraceRaysKHR-None-11374

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
[](#VUID-vkCmdTraceRaysKHR-pBindInfo-11375) VUID-vkCmdTraceRaysKHR-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdTraceRaysKHR-None-11376) VUID-vkCmdTraceRaysKHR-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdTraceRaysKHR-None-11398) VUID-vkCmdTraceRaysKHR-None-11398

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
[](#VUID-vkCmdTraceRaysKHR-None-11437) VUID-vkCmdTraceRaysKHR-None-11437

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
[](#VUID-vkCmdTraceRaysKHR-None-11438) VUID-vkCmdTraceRaysKHR-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysKHR-None-11441) VUID-vkCmdTraceRaysKHR-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysKHR-None-11439) VUID-vkCmdTraceRaysKHR-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysKHR-None-11442) VUID-vkCmdTraceRaysKHR-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysKHR-None-11485) VUID-vkCmdTraceRaysKHR-None-11485

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
[](#VUID-vkCmdTraceRaysKHR-index-11450) VUID-vkCmdTraceRaysKHR-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdTraceRaysKHR-protectedNoFault-11455) VUID-vkCmdTraceRaysKHR-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysKHR-protectedNoFault-11456) VUID-vkCmdTraceRaysKHR-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysKHR-None-03429) VUID-vkCmdTraceRaysKHR-None-03429

Any shader group handle referenced by this call **must** have been queried
from the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysKHR-None-09458) VUID-vkCmdTraceRaysKHR-None-09458

If the bound ray tracing pipeline state was created with the
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](pipelines.html#VkDynamicState) dynamic state
enabled then [vkCmdSetRayTracingPipelineStackSizeKHR](pipelines.html#vkCmdSetRayTracingPipelineStackSizeKHR) **must** have
been called in the current command buffer prior to this trace command

* 
[](#VUID-vkCmdTraceRaysKHR-None-11319) VUID-vkCmdTraceRaysKHR-None-11319

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the value
of the address at the expected location in shader record data **must** be a
valid address

* 
[](#VUID-vkCmdTraceRaysKHR-maxPipelineRayRecursionDepth-03679) VUID-vkCmdTraceRaysKHR-maxPipelineRayRecursionDepth-03679

This command **must** not cause a shader call instruction to be executed
from a shader invocation with a [recursion    depth](#ray-tracing-recursion-depth) greater than the value of `maxPipelineRayRecursionDepth`
used to create the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysKHR-commandBuffer-03635) VUID-vkCmdTraceRaysKHR-commandBuffer-03635

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdTraceRaysKHR-size-04023) VUID-vkCmdTraceRaysKHR-size-04023

The `size` member of `pRayGenShaderBindingTable` **must** be equal
to its `stride` member

* 
[](#VUID-vkCmdTraceRaysKHR-pRayGenShaderBindingTable-03681) VUID-vkCmdTraceRaysKHR-pRayGenShaderBindingTable-03681

`pRayGenShaderBindingTable->deviceAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysKHR-pRayGenShaderBindingTable-03682) VUID-vkCmdTraceRaysKHR-pRayGenShaderBindingTable-03682

`pRayGenShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysKHR-pMissShaderBindingTable-03684) VUID-vkCmdTraceRaysKHR-pMissShaderBindingTable-03684

`pMissShaderBindingTable->deviceAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysKHR-pMissShaderBindingTable-03685) VUID-vkCmdTraceRaysKHR-pMissShaderBindingTable-03685

`pMissShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysKHR-stride-03686) VUID-vkCmdTraceRaysKHR-stride-03686

`pMissShaderBindingTable->stride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-vkCmdTraceRaysKHR-stride-04029) VUID-vkCmdTraceRaysKHR-stride-04029

`pMissShaderBindingTable->stride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-03688) VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-03688

`pHitShaderBindingTable->deviceAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-03689) VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-03689

`pHitShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysKHR-stride-03690) VUID-vkCmdTraceRaysKHR-stride-03690

`pHitShaderBindingTable->stride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-vkCmdTraceRaysKHR-stride-04035) VUID-vkCmdTraceRaysKHR-stride-04035

`pHitShaderBindingTable->stride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysKHR-pCallableShaderBindingTable-03692) VUID-vkCmdTraceRaysKHR-pCallableShaderBindingTable-03692

`pCallableShaderBindingTable->deviceAddress` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysKHR-pCallableShaderBindingTable-03693) VUID-vkCmdTraceRaysKHR-pCallableShaderBindingTable-03693

`pCallableShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysKHR-stride-03694) VUID-vkCmdTraceRaysKHR-stride-03694

`pCallableShaderBindingTable->stride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-vkCmdTraceRaysKHR-stride-04041) VUID-vkCmdTraceRaysKHR-stride-04041

`pCallableShaderBindingTable->stride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysKHR-flags-03511) VUID-vkCmdTraceRaysKHR-flags-03511

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits), the
entries in the table identified by `pMissShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute a miss shader
**must** not be zero

* 
[](#VUID-vkCmdTraceRaysKHR-flags-03512) VUID-vkCmdTraceRaysKHR-flags-03512

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `pHitShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute an any-hit
shader **must** not be zero

* 
[](#VUID-vkCmdTraceRaysKHR-flags-03513) VUID-vkCmdTraceRaysKHR-flags-03513

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `pHitShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute a closest hit
shader **must** not be zero

* 
[](#VUID-vkCmdTraceRaysKHR-flags-03514) VUID-vkCmdTraceRaysKHR-flags-03514

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `pHitShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute an intersection
shader **must** not be zero

* 
[](#VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-04735) VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-04735

Any non-zero hit shader group entries in the table identified by
`pHitShaderBindingTable->deviceAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV) **must**
have been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](pipelines.html#VkRayTracingShaderGroupTypeNV)

* 
[](#VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-04736) VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-04736

Any non-zero hit shader group entries in the table identified by
`pHitShaderBindingTable->deviceAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV) **must** have
been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](pipelines.html#VkRayTracingShaderGroupTypeNV)

* 
[](#VUID-vkCmdTraceRaysKHR-width-03638) VUID-vkCmdTraceRaysKHR-width-03638

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[0]

* 
[](#VUID-vkCmdTraceRaysKHR-height-03639) VUID-vkCmdTraceRaysKHR-height-03639

`height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[1]

* 
[](#VUID-vkCmdTraceRaysKHR-depth-03640) VUID-vkCmdTraceRaysKHR-depth-03640

`depth` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[2]

* 
[](#VUID-vkCmdTraceRaysKHR-width-03641) VUID-vkCmdTraceRaysKHR-width-03641

`width` × `height` × `depth` **must** be less
than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxRayDispatchInvocationCount`

* 
[](#VUID-vkCmdTraceRaysKHR-allowClusterAccelerationStructure-10578) VUID-vkCmdTraceRaysKHR-allowClusterAccelerationStructure-10578

If the traced geometry contains a cluster acceleration structure, then
[VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](pipelines.html#VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV)::`allowClusterAccelerationStructure`
**must** have been set for that pipeline

Valid Usage (Implicit)

* 
[](#VUID-vkCmdTraceRaysKHR-commandBuffer-parameter) VUID-vkCmdTraceRaysKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdTraceRaysKHR-pRaygenShaderBindingTable-parameter) VUID-vkCmdTraceRaysKHR-pRaygenShaderBindingTable-parameter

 `pRaygenShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysKHR-pMissShaderBindingTable-parameter) VUID-vkCmdTraceRaysKHR-pMissShaderBindingTable-parameter

 `pMissShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-parameter) VUID-vkCmdTraceRaysKHR-pHitShaderBindingTable-parameter

 `pHitShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysKHR-pCallableShaderBindingTable-parameter) VUID-vkCmdTraceRaysKHR-pCallableShaderBindingTable-parameter

 `pCallableShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysKHR-commandBuffer-recording) VUID-vkCmdTraceRaysKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdTraceRaysKHR-commandBuffer-cmdpool) VUID-vkCmdTraceRaysKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdTraceRaysKHR-renderpass) VUID-vkCmdTraceRaysKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdTraceRaysKHR-suspended) VUID-vkCmdTraceRaysKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdTraceRaysKHR-videocoding) VUID-vkCmdTraceRaysKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdTraceRaysKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

When invocation mask image usage is enabled in the bound ray tracing
pipeline, the pipeline uses an invocation mask image specified by the
command:

// Provided by VK_HUAWEI_invocation_mask
void vkCmdBindInvocationMaskHUAWEI(
    VkCommandBuffer                             commandBuffer,
    VkImageView                                 imageView,
    VkImageLayout                               imageLayout);

* 
`commandBuffer` is the command buffer into which the command will be
recorded

* 
`imageView` is an image view handle specifying the invocation mask
image `imageView` **may** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), which is equivalent
to specifying a view of an image filled with ones value.

* 
`imageLayout` is the layout that the image subresources accessible
from `imageView` will be in when the invocation mask image is
accessed

Valid Usage

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-None-04976) VUID-vkCmdBindInvocationMaskHUAWEI-None-04976

The [`invocationMask`](features.html#features-invocationMask) feature **must** be
enabled

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04977) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04977

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** be a valid
[VkImageView](resources.html#VkImageView) handle of type [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04978) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04978

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have a format
of [VK_FORMAT_R8_UINT](formats.html#VkFormat)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04979) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04979

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have been
created with the [VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI](resources.html#VkImageUsageFlagBits) usage
flag set

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04980) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04980

If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageLayout` **must**
be [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-width-04981) VUID-vkCmdBindInvocationMaskHUAWEI-width-04981

Thread mask image resolution **must** match the `width` and
`height` in [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-None-04982) VUID-vkCmdBindInvocationMaskHUAWEI-None-04982

Each element in the invocation mask image **must** have the value `0` or
`1`.
The value 1 means the invocation is active

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-depth-04983) VUID-vkCmdBindInvocationMaskHUAWEI-depth-04983

`depth` in [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR) **must** be 1

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-parameter) VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-parameter) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageLayout-parameter) VUID-vkCmdBindInvocationMaskHUAWEI-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-recording) VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-cmdpool) VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-renderpass) VUID-vkCmdBindInvocationMaskHUAWEI-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-videocoding) VUID-vkCmdBindInvocationMaskHUAWEI-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commonparent) VUID-vkCmdBindInvocationMaskHUAWEI-commonparent

 Both of `commandBuffer`, and `imageView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | State |

Conditional Rendering

vkCmdBindInvocationMaskHUAWEI is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To dispatch ray tracing, with some parameters sourced on the device, use:

// Provided by VK_KHR_ray_tracing_pipeline
void vkCmdTraceRaysIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    const VkStridedDeviceAddressRegionKHR*      pRaygenShaderBindingTable,
    const VkStridedDeviceAddressRegionKHR*      pMissShaderBindingTable,
    const VkStridedDeviceAddressRegionKHR*      pHitShaderBindingTable,
    const VkStridedDeviceAddressRegionKHR*      pCallableShaderBindingTable,
    VkDeviceAddress                             indirectDeviceAddress);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pRaygenShaderBindingTable` is a
[VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) that holds the shader binding
table data for the ray generation shader stage.

* 
`pMissShaderBindingTable` is a [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR)
that holds the shader binding table data for the miss shader stage.

* 
`pHitShaderBindingTable` is a [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR)
that holds the shader binding table data for the hit shader stage.

* 
`pCallableShaderBindingTable` is a
[VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) that holds the shader binding
table data for the callable shader stage.

* 
`indirectDeviceAddress` is a buffer device address which is a
pointer to a [VkTraceRaysIndirectCommandKHR](#VkTraceRaysIndirectCommandKHR) structure containing
the trace ray parameters.

`vkCmdTraceRaysIndirectKHR` behaves similarly to [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR)
except that the ray trace query dimensions are read by the device from
`indirectDeviceAddress` during execution.

Valid Usage

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-magFilter-04553) VUID-vkCmdTraceRaysIndirectKHR-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-magFilter-09598) VUID-vkCmdTraceRaysIndirectKHR-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-mipmapMode-04770) VUID-vkCmdTraceRaysIndirectKHR-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-mipmapMode-09599) VUID-vkCmdTraceRaysIndirectKHR-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-unnormalizedCoordinates-09635) VUID-vkCmdTraceRaysIndirectKHR-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08609) VUID-vkCmdTraceRaysIndirectKHR-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08610) VUID-vkCmdTraceRaysIndirectKHR-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08611) VUID-vkCmdTraceRaysIndirectKHR-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-06479) VUID-vkCmdTraceRaysIndirectKHR-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-02691) VUID-vkCmdTraceRaysIndirectKHR-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-07888) VUID-vkCmdTraceRaysIndirectKHR-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-02692) VUID-vkCmdTraceRaysIndirectKHR-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-02693) VUID-vkCmdTraceRaysIndirectKHR-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-filterCubic-02694) VUID-vkCmdTraceRaysIndirectKHR-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-filterCubicMinmax-02695) VUID-vkCmdTraceRaysIndirectKHR-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-cubicRangeClamp-09212) VUID-vkCmdTraceRaysIndirectKHR-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-reductionMode-09213) VUID-vkCmdTraceRaysIndirectKHR-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-selectableCubicWeights-09214) VUID-vkCmdTraceRaysIndirectKHR-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-flags-02696) VUID-vkCmdTraceRaysIndirectKHR-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07027) VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07028) VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07029) VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07030) VUID-vkCmdTraceRaysIndirectKHR-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08600) VUID-vkCmdTraceRaysIndirectKHR-None-08600

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08601) VUID-vkCmdTraceRaysIndirectKHR-None-08601

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-10068) VUID-vkCmdTraceRaysIndirectKHR-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-maintenance4-08602) VUID-vkCmdTraceRaysIndirectKHR-maintenance4-08602

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08114) VUID-vkCmdTraceRaysIndirectKHR-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-imageLayout-00344) VUID-vkCmdTraceRaysIndirectKHR-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08115) VUID-vkCmdTraceRaysIndirectKHR-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08116) VUID-vkCmdTraceRaysIndirectKHR-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08604) VUID-vkCmdTraceRaysIndirectKHR-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08117) VUID-vkCmdTraceRaysIndirectKHR-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08119) VUID-vkCmdTraceRaysIndirectKHR-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08605) VUID-vkCmdTraceRaysIndirectKHR-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08606) VUID-vkCmdTraceRaysIndirectKHR-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08608) VUID-vkCmdTraceRaysIndirectKHR-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-uniformBuffers-06935) VUID-vkCmdTraceRaysIndirectKHR-uniformBuffers-06935

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08612) VUID-vkCmdTraceRaysIndirectKHR-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-storageBuffers-06936) VUID-vkCmdTraceRaysIndirectKHR-storageBuffers-06936

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-08613) VUID-vkCmdTraceRaysIndirectKHR-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-02707) VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-viewType-07752) VUID-vkCmdTraceRaysIndirectKHR-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-format-07753) VUID-vkCmdTraceRaysIndirectKHR-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageWrite-08795) VUID-vkCmdTraceRaysIndirectKHR-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageWrite-08796) VUID-vkCmdTraceRaysIndirectKHR-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageWrite-04469) VUID-vkCmdTraceRaysIndirectKHR-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-SampledType-04470) VUID-vkCmdTraceRaysIndirectKHR-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-SampledType-04471) VUID-vkCmdTraceRaysIndirectKHR-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-SampledType-04472) VUID-vkCmdTraceRaysIndirectKHR-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-SampledType-04473) VUID-vkCmdTraceRaysIndirectKHR-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-sparseImageInt64Atomics-04474) VUID-vkCmdTraceRaysIndirectKHR-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-sparseImageInt64Atomics-04475) VUID-vkCmdTraceRaysIndirectKHR-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06971) VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06972) VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageBoxFilterQCOM-06973) VUID-vkCmdTraceRaysIndirectKHR-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06977) VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06978) VUID-vkCmdTraceRaysIndirectKHR-OpImageSampleWeightedQCOM-06978

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
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchWindow-09215) VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchWindow-09216) VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchWindow-09217) VUID-vkCmdTraceRaysIndirectKHR-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-07288) VUID-vkCmdTraceRaysIndirectKHR-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-09600) VUID-vkCmdTraceRaysIndirectKHR-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-10746) VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-10678) VUID-vkCmdTraceRaysIndirectKHR-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-10679) VUID-vkCmdTraceRaysIndirectKHR-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pDescription-09900) VUID-vkCmdTraceRaysIndirectKHR-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-dimensionCount-09905) VUID-vkCmdTraceRaysIndirectKHR-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-OpTypeTensorARM-09906) VUID-vkCmdTraceRaysIndirectKHR-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11297) VUID-vkCmdTraceRaysIndirectKHR-None-11297

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11298) VUID-vkCmdTraceRaysIndirectKHR-None-11298

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11299) VUID-vkCmdTraceRaysIndirectKHR-None-11299

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11397) VUID-vkCmdTraceRaysIndirectKHR-None-11397

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11300) VUID-vkCmdTraceRaysIndirectKHR-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11301) VUID-vkCmdTraceRaysIndirectKHR-None-11301

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11302) VUID-vkCmdTraceRaysIndirectKHR-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11304) VUID-vkCmdTraceRaysIndirectKHR-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11305) VUID-vkCmdTraceRaysIndirectKHR-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11306) VUID-vkCmdTraceRaysIndirectKHR-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11308) VUID-vkCmdTraceRaysIndirectKHR-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11309) VUID-vkCmdTraceRaysIndirectKHR-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11372) VUID-vkCmdTraceRaysIndirectKHR-None-11372

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11373) VUID-vkCmdTraceRaysIndirectKHR-None-11373

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11374) VUID-vkCmdTraceRaysIndirectKHR-None-11374

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
[](#VUID-vkCmdTraceRaysIndirectKHR-pBindInfo-11375) VUID-vkCmdTraceRaysIndirectKHR-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11376) VUID-vkCmdTraceRaysIndirectKHR-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11398) VUID-vkCmdTraceRaysIndirectKHR-None-11398

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11437) VUID-vkCmdTraceRaysIndirectKHR-None-11437

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
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11438) VUID-vkCmdTraceRaysIndirectKHR-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11441) VUID-vkCmdTraceRaysIndirectKHR-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11439) VUID-vkCmdTraceRaysIndirectKHR-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11442) VUID-vkCmdTraceRaysIndirectKHR-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11485) VUID-vkCmdTraceRaysIndirectKHR-None-11485

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
[](#VUID-vkCmdTraceRaysIndirectKHR-index-11450) VUID-vkCmdTraceRaysIndirectKHR-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-protectedNoFault-11455) VUID-vkCmdTraceRaysIndirectKHR-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-protectedNoFault-11456) VUID-vkCmdTraceRaysIndirectKHR-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-03429) VUID-vkCmdTraceRaysIndirectKHR-None-03429

Any shader group handle referenced by this call **must** have been queried
from the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-09458) VUID-vkCmdTraceRaysIndirectKHR-None-09458

If the bound ray tracing pipeline state was created with the
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](pipelines.html#VkDynamicState) dynamic state
enabled then [vkCmdSetRayTracingPipelineStackSizeKHR](pipelines.html#vkCmdSetRayTracingPipelineStackSizeKHR) **must** have
been called in the current command buffer prior to this trace command

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-None-11319) VUID-vkCmdTraceRaysIndirectKHR-None-11319

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the value
of the address at the expected location in shader record data **must** be a
valid address

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-maxPipelineRayRecursionDepth-03679) VUID-vkCmdTraceRaysIndirectKHR-maxPipelineRayRecursionDepth-03679

This command **must** not cause a shader call instruction to be executed
from a shader invocation with a [recursion    depth](#ray-tracing-recursion-depth) greater than the value of `maxPipelineRayRecursionDepth`
used to create the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-03635) VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-03635

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-size-04023) VUID-vkCmdTraceRaysIndirectKHR-size-04023

The `size` member of `pRayGenShaderBindingTable` **must** be equal
to its `stride` member

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pRayGenShaderBindingTable-03681) VUID-vkCmdTraceRaysIndirectKHR-pRayGenShaderBindingTable-03681

`pRayGenShaderBindingTable->deviceAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pRayGenShaderBindingTable-03682) VUID-vkCmdTraceRaysIndirectKHR-pRayGenShaderBindingTable-03682

`pRayGenShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pMissShaderBindingTable-03684) VUID-vkCmdTraceRaysIndirectKHR-pMissShaderBindingTable-03684

`pMissShaderBindingTable->deviceAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pMissShaderBindingTable-03685) VUID-vkCmdTraceRaysIndirectKHR-pMissShaderBindingTable-03685

`pMissShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-stride-03686) VUID-vkCmdTraceRaysIndirectKHR-stride-03686

`pMissShaderBindingTable->stride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-stride-04029) VUID-vkCmdTraceRaysIndirectKHR-stride-04029

`pMissShaderBindingTable->stride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-03688) VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-03688

`pHitShaderBindingTable->deviceAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-03689) VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-03689

`pHitShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-stride-03690) VUID-vkCmdTraceRaysIndirectKHR-stride-03690

`pHitShaderBindingTable->stride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-stride-04035) VUID-vkCmdTraceRaysIndirectKHR-stride-04035

`pHitShaderBindingTable->stride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pCallableShaderBindingTable-03692) VUID-vkCmdTraceRaysIndirectKHR-pCallableShaderBindingTable-03692

`pCallableShaderBindingTable->deviceAddress` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pCallableShaderBindingTable-03693) VUID-vkCmdTraceRaysIndirectKHR-pCallableShaderBindingTable-03693

`pCallableShaderBindingTable->deviceAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-stride-03694) VUID-vkCmdTraceRaysIndirectKHR-stride-03694

`pCallableShaderBindingTable->stride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-stride-04041) VUID-vkCmdTraceRaysIndirectKHR-stride-04041

`pCallableShaderBindingTable->stride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-flags-03511) VUID-vkCmdTraceRaysIndirectKHR-flags-03511

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits), the
entries in the table identified by `pMissShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute a miss shader
**must** not be zero

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-flags-03512) VUID-vkCmdTraceRaysIndirectKHR-flags-03512

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `pHitShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute an any-hit
shader **must** not be zero

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-flags-03513) VUID-vkCmdTraceRaysIndirectKHR-flags-03513

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `pHitShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute a closest hit
shader **must** not be zero

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-flags-03514) VUID-vkCmdTraceRaysIndirectKHR-flags-03514

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `pHitShaderBindingTable->deviceAddress`
accessed as a result of this command in order to execute an intersection
shader **must** not be zero

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-04735) VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-04735

Any non-zero hit shader group entries in the table identified by
`pHitShaderBindingTable->deviceAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV) **must**
have been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](pipelines.html#VkRayTracingShaderGroupTypeNV)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-04736) VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-04736

Any non-zero hit shader group entries in the table identified by
`pHitShaderBindingTable->deviceAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV) **must** have
been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](pipelines.html#VkRayTracingShaderGroupTypeNV)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-03633) VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-03633

`indirectDeviceAddress` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-03634) VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-03634

`indirectDeviceAddress` **must** be a multiple of `4`

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-03636) VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-03636

All device addresses between `indirectDeviceAddress` and
`indirectDeviceAddress` +  `sizeof`(`VkTraceRaysIndirectCommandKHR`) -
1 **must** be in the buffer device address range of the same buffer

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-rayTracingPipelineTraceRaysIndirect-03637) VUID-vkCmdTraceRaysIndirectKHR-rayTracingPipelineTraceRaysIndirect-03637

The [`rayTracingPipelineTraceRaysIndirect`](#features-rayTracingPipelineTraceRaysIndirect) feature **must** be enabled

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-rayTracingMotionBlurPipelineTraceRaysIndirect-04951) VUID-vkCmdTraceRaysIndirectKHR-rayTracingMotionBlurPipelineTraceRaysIndirect-04951

If the bound ray tracing pipeline was created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](pipelines.html#VkPipelineCreateFlagBits)
`VkPhysicalDeviceRayTracingMotionBlurFeaturesNV`::`rayTracingMotionBlurPipelineTraceRaysIndirect`
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-parameter) VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pRaygenShaderBindingTable-parameter) VUID-vkCmdTraceRaysIndirectKHR-pRaygenShaderBindingTable-parameter

 `pRaygenShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pMissShaderBindingTable-parameter) VUID-vkCmdTraceRaysIndirectKHR-pMissShaderBindingTable-parameter

 `pMissShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-parameter) VUID-vkCmdTraceRaysIndirectKHR-pHitShaderBindingTable-parameter

 `pHitShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-pCallableShaderBindingTable-parameter) VUID-vkCmdTraceRaysIndirectKHR-pCallableShaderBindingTable-parameter

 `pCallableShaderBindingTable` **must** be a valid pointer to a valid [VkStridedDeviceAddressRegionKHR](resources.html#VkStridedDeviceAddressRegionKHR) structure

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-parameter) VUID-vkCmdTraceRaysIndirectKHR-indirectDeviceAddress-parameter

 `indirectDeviceAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-recording) VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-cmdpool) VUID-vkCmdTraceRaysIndirectKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-renderpass) VUID-vkCmdTraceRaysIndirectKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-suspended) VUID-vkCmdTraceRaysIndirectKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdTraceRaysIndirectKHR-videocoding) VUID-vkCmdTraceRaysIndirectKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdTraceRaysIndirectKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkTraceRaysIndirectCommandKHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkTraceRaysIndirectCommandKHR {
    uint32_t    width;
    uint32_t    height;
    uint32_t    depth;
} VkTraceRaysIndirectCommandKHR;

* 
`width` is the width of the ray trace query dimensions.

* 
`height` is height of the ray trace query dimensions.

* 
`depth` is depth of the ray trace query dimensions.

The members of `VkTraceRaysIndirectCommandKHR` have the same meaning as
the similarly named parameters of [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR).

Valid Usage

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-width-03638) VUID-VkTraceRaysIndirectCommandKHR-width-03638

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[0]

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-height-03639) VUID-VkTraceRaysIndirectCommandKHR-height-03639

`height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[1]

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-depth-03640) VUID-VkTraceRaysIndirectCommandKHR-depth-03640

`depth` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[2]

* 
[](#VUID-VkTraceRaysIndirectCommandKHR-width-03641) VUID-VkTraceRaysIndirectCommandKHR-width-03641

`width` × `height` × `depth` **must** be less
than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxRayDispatchInvocationCount`

To dispatch ray tracing, with some parameters sourced on the device, use:

// Provided by VK_KHR_ray_tracing_maintenance1 with VK_KHR_ray_tracing_pipeline
void vkCmdTraceRaysIndirect2KHR(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             indirectDeviceAddress);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`indirectDeviceAddress` is a buffer device address which is a
pointer to a [VkTraceRaysIndirectCommand2KHR](#VkTraceRaysIndirectCommand2KHR) structure containing
the trace ray parameters.

`vkCmdTraceRaysIndirect2KHR` behaves similarly to
[vkCmdTraceRaysIndirectKHR](#vkCmdTraceRaysIndirectKHR) except that shader binding table parameters
as well as dispatch dimensions are read by the device from
`indirectDeviceAddress` during execution.

Valid Usage

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-magFilter-04553) VUID-vkCmdTraceRaysIndirect2KHR-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-magFilter-09598) VUID-vkCmdTraceRaysIndirect2KHR-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-mipmapMode-04770) VUID-vkCmdTraceRaysIndirect2KHR-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-mipmapMode-09599) VUID-vkCmdTraceRaysIndirect2KHR-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-unnormalizedCoordinates-09635) VUID-vkCmdTraceRaysIndirect2KHR-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08609) VUID-vkCmdTraceRaysIndirect2KHR-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08610) VUID-vkCmdTraceRaysIndirect2KHR-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08611) VUID-vkCmdTraceRaysIndirect2KHR-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-06479) VUID-vkCmdTraceRaysIndirect2KHR-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-02691) VUID-vkCmdTraceRaysIndirect2KHR-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-07888) VUID-vkCmdTraceRaysIndirect2KHR-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-02692) VUID-vkCmdTraceRaysIndirect2KHR-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-02693) VUID-vkCmdTraceRaysIndirect2KHR-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-filterCubic-02694) VUID-vkCmdTraceRaysIndirect2KHR-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-filterCubicMinmax-02695) VUID-vkCmdTraceRaysIndirect2KHR-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-cubicRangeClamp-09212) VUID-vkCmdTraceRaysIndirect2KHR-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-reductionMode-09213) VUID-vkCmdTraceRaysIndirect2KHR-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-selectableCubicWeights-09214) VUID-vkCmdTraceRaysIndirect2KHR-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-flags-02696) VUID-vkCmdTraceRaysIndirect2KHR-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07027) VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07028) VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07029) VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07030) VUID-vkCmdTraceRaysIndirect2KHR-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08600) VUID-vkCmdTraceRaysIndirect2KHR-None-08600

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08601) VUID-vkCmdTraceRaysIndirect2KHR-None-08601

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-10068) VUID-vkCmdTraceRaysIndirect2KHR-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-maintenance4-08602) VUID-vkCmdTraceRaysIndirect2KHR-maintenance4-08602

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08114) VUID-vkCmdTraceRaysIndirect2KHR-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-imageLayout-00344) VUID-vkCmdTraceRaysIndirect2KHR-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08115) VUID-vkCmdTraceRaysIndirect2KHR-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08116) VUID-vkCmdTraceRaysIndirect2KHR-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08604) VUID-vkCmdTraceRaysIndirect2KHR-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08117) VUID-vkCmdTraceRaysIndirect2KHR-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08119) VUID-vkCmdTraceRaysIndirect2KHR-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08605) VUID-vkCmdTraceRaysIndirect2KHR-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08606) VUID-vkCmdTraceRaysIndirect2KHR-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08608) VUID-vkCmdTraceRaysIndirect2KHR-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-uniformBuffers-06935) VUID-vkCmdTraceRaysIndirect2KHR-uniformBuffers-06935

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08612) VUID-vkCmdTraceRaysIndirect2KHR-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-storageBuffers-06936) VUID-vkCmdTraceRaysIndirect2KHR-storageBuffers-06936

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-08613) VUID-vkCmdTraceRaysIndirect2KHR-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-02707) VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-viewType-07752) VUID-vkCmdTraceRaysIndirect2KHR-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-format-07753) VUID-vkCmdTraceRaysIndirect2KHR-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageWrite-08795) VUID-vkCmdTraceRaysIndirect2KHR-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageWrite-08796) VUID-vkCmdTraceRaysIndirect2KHR-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageWrite-04469) VUID-vkCmdTraceRaysIndirect2KHR-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04470) VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04471) VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04472) VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04473) VUID-vkCmdTraceRaysIndirect2KHR-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-sparseImageInt64Atomics-04474) VUID-vkCmdTraceRaysIndirect2KHR-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-sparseImageInt64Atomics-04475) VUID-vkCmdTraceRaysIndirect2KHR-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06971) VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06972) VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageBoxFilterQCOM-06973) VUID-vkCmdTraceRaysIndirect2KHR-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06977) VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06978) VUID-vkCmdTraceRaysIndirect2KHR-OpImageSampleWeightedQCOM-06978

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchWindow-09215) VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchWindow-09216) VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchWindow-09217) VUID-vkCmdTraceRaysIndirect2KHR-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-07288) VUID-vkCmdTraceRaysIndirect2KHR-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-09600) VUID-vkCmdTraceRaysIndirect2KHR-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-10746) VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-10678) VUID-vkCmdTraceRaysIndirect2KHR-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-10679) VUID-vkCmdTraceRaysIndirect2KHR-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-pDescription-09900) VUID-vkCmdTraceRaysIndirect2KHR-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-dimensionCount-09905) VUID-vkCmdTraceRaysIndirect2KHR-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-OpTypeTensorARM-09906) VUID-vkCmdTraceRaysIndirect2KHR-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11297) VUID-vkCmdTraceRaysIndirect2KHR-None-11297

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11298) VUID-vkCmdTraceRaysIndirect2KHR-None-11298

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11299) VUID-vkCmdTraceRaysIndirect2KHR-None-11299

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11397) VUID-vkCmdTraceRaysIndirect2KHR-None-11397

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11300) VUID-vkCmdTraceRaysIndirect2KHR-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11301) VUID-vkCmdTraceRaysIndirect2KHR-None-11301

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11302) VUID-vkCmdTraceRaysIndirect2KHR-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11304) VUID-vkCmdTraceRaysIndirect2KHR-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11305) VUID-vkCmdTraceRaysIndirect2KHR-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11306) VUID-vkCmdTraceRaysIndirect2KHR-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11308) VUID-vkCmdTraceRaysIndirect2KHR-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11309) VUID-vkCmdTraceRaysIndirect2KHR-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11372) VUID-vkCmdTraceRaysIndirect2KHR-None-11372

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11373) VUID-vkCmdTraceRaysIndirect2KHR-None-11373

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11374) VUID-vkCmdTraceRaysIndirect2KHR-None-11374

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-pBindInfo-11375) VUID-vkCmdTraceRaysIndirect2KHR-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11376) VUID-vkCmdTraceRaysIndirect2KHR-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11398) VUID-vkCmdTraceRaysIndirect2KHR-None-11398

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11437) VUID-vkCmdTraceRaysIndirect2KHR-None-11437

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11438) VUID-vkCmdTraceRaysIndirect2KHR-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11441) VUID-vkCmdTraceRaysIndirect2KHR-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11439) VUID-vkCmdTraceRaysIndirect2KHR-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11442) VUID-vkCmdTraceRaysIndirect2KHR-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11485) VUID-vkCmdTraceRaysIndirect2KHR-None-11485

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
[](#VUID-vkCmdTraceRaysIndirect2KHR-index-11450) VUID-vkCmdTraceRaysIndirect2KHR-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-protectedNoFault-11455) VUID-vkCmdTraceRaysIndirect2KHR-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-protectedNoFault-11456) VUID-vkCmdTraceRaysIndirect2KHR-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-03429) VUID-vkCmdTraceRaysIndirect2KHR-None-03429

Any shader group handle referenced by this call **must** have been queried
from the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-09458) VUID-vkCmdTraceRaysIndirect2KHR-None-09458

If the bound ray tracing pipeline state was created with the
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](pipelines.html#VkDynamicState) dynamic state
enabled then [vkCmdSetRayTracingPipelineStackSizeKHR](pipelines.html#vkCmdSetRayTracingPipelineStackSizeKHR) **must** have
been called in the current command buffer prior to this trace command

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-None-11319) VUID-vkCmdTraceRaysIndirect2KHR-None-11319

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the value
of the address at the expected location in shader record data **must** be a
valid address

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-maxPipelineRayRecursionDepth-03679) VUID-vkCmdTraceRaysIndirect2KHR-maxPipelineRayRecursionDepth-03679

This command **must** not cause a shader call instruction to be executed
from a shader invocation with a [recursion    depth](#ray-tracing-recursion-depth) greater than the value of `maxPipelineRayRecursionDepth`
used to create the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-03635) VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-03635

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-03633) VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-03633

`indirectDeviceAddress` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-03634) VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-03634

`indirectDeviceAddress` **must** be a multiple of `4`

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-03636) VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-03636

All device addresses between `indirectDeviceAddress` and
`indirectDeviceAddress` +  `sizeof`(`VkTraceRaysIndirectCommand2KHR`) -
1 **must** be in the buffer device address range of the same buffer

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-rayTracingPipelineTraceRaysIndirect2-03637) VUID-vkCmdTraceRaysIndirect2KHR-rayTracingPipelineTraceRaysIndirect2-03637

The [`rayTracingPipelineTraceRaysIndirect2`](#features-rayTracingPipelineTraceRaysIndirect2) feature **must** be enabled

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-rayTracingMotionBlurPipelineTraceRaysIndirect-04951) VUID-vkCmdTraceRaysIndirect2KHR-rayTracingMotionBlurPipelineTraceRaysIndirect-04951

If the bound ray tracing pipeline was created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](pipelines.html#VkPipelineCreateFlagBits)
`VkPhysicalDeviceRayTracingMotionBlurFeaturesNV`::`rayTracingMotionBlurPipelineTraceRaysIndirect`
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-parameter) VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-parameter) VUID-vkCmdTraceRaysIndirect2KHR-indirectDeviceAddress-parameter

 `indirectDeviceAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-recording) VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-cmdpool) VUID-vkCmdTraceRaysIndirect2KHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-renderpass) VUID-vkCmdTraceRaysIndirect2KHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-suspended) VUID-vkCmdTraceRaysIndirect2KHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdTraceRaysIndirect2KHR-videocoding) VUID-vkCmdTraceRaysIndirect2KHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdTraceRaysIndirect2KHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkTraceRaysIndirectCommand2KHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_maintenance1 with VK_KHR_ray_tracing_pipeline
typedef struct VkTraceRaysIndirectCommand2KHR {
    VkDeviceAddress    raygenShaderRecordAddress;
    VkDeviceSize       raygenShaderRecordSize;
    VkDeviceAddress    missShaderBindingTableAddress;
    VkDeviceSize       missShaderBindingTableSize;
    VkDeviceSize       missShaderBindingTableStride;
    VkDeviceAddress    hitShaderBindingTableAddress;
    VkDeviceSize       hitShaderBindingTableSize;
    VkDeviceSize       hitShaderBindingTableStride;
    VkDeviceAddress    callableShaderBindingTableAddress;
    VkDeviceSize       callableShaderBindingTableSize;
    VkDeviceSize       callableShaderBindingTableStride;
    uint32_t           width;
    uint32_t           height;
    uint32_t           depth;
} VkTraceRaysIndirectCommand2KHR;

* 
`raygenShaderRecordAddress` is a `VkDeviceAddress` of the ray
generation shader binding table record used by this command.

* 
`raygenShaderRecordSize` is a `VkDeviceSize` number of bytes
corresponding to the ray generation shader binding table record at base
address `raygenShaderRecordAddress`.

* 
`missShaderBindingTableAddress` is a `VkDeviceAddress` of the
first record in the miss shader binding table used by this command.

* 
`missShaderBindingTableSize` is a `VkDeviceSize` number of
bytes corresponding to the total size of the miss shader binding table
at `missShaderBindingTableAddress` that may be accessed by this
command.

* 
`missShaderBindingTableStride` is a `VkDeviceSize` number of
bytes between records of the miss shader binding table.

* 
`hitShaderBindingTableAddress` is a `VkDeviceAddress` of the
first record in the hit shader binding table used by this command.

* 
`hitShaderBindingTableSize` is a `VkDeviceSize` number of
bytes corresponding to the total size of the hit shader binding table at
`hitShaderBindingTableAddress` that may be accessed by this command.

* 
`hitShaderBindingTableStride` is a `VkDeviceSize` number of
bytes between records of the hit shader binding table.

* 
`callableShaderBindingTableAddress` is a `VkDeviceAddress` of
the first record in the callable shader binding table used by this
command.

* 
`callableShaderBindingTableSize` is a `VkDeviceSize` number
of bytes corresponding to the total size of the callable shader binding
table at `callableShaderBindingTableAddress` that may be accessed by
this command.

* 
`callableShaderBindingTableStride` is a `VkDeviceSize` number
of bytes between records of the callable shader binding table.

* 
`width` is the width of the ray trace query dimensions.

* 
`height` is height of the ray trace query dimensions.

* 
`depth` is depth of the ray trace query dimensions.

The members of `VkTraceRaysIndirectCommand2KHR` have the same meaning as
the similarly named parameters of [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR).

Indirect shader binding table buffer parameters **must** satisfy the same
memory alignment and binding requirements as their counterparts in
[vkCmdTraceRaysIndirectKHR](#vkCmdTraceRaysIndirectKHR) and [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR).

Valid Usage

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03681) VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03681

`raygenShaderRecordAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03682) VUID-VkTraceRaysIndirectCommand2KHR-pRayGenShaderBindingTable-03682

`raygenShaderRecordAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03684) VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03684

`missShaderBindingTableAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03685) VUID-VkTraceRaysIndirectCommand2KHR-pMissShaderBindingTable-03685

`missShaderBindingTableAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-03686) VUID-VkTraceRaysIndirectCommand2KHR-stride-03686

`missShaderBindingTableStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-04029) VUID-VkTraceRaysIndirectCommand2KHR-stride-04029

`missShaderBindingTableStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03688) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03688

`hitShaderBindingTableAddress` **must** be a device address allocated to
the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03689) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-03689

`hitShaderBindingTableAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-03690) VUID-VkTraceRaysIndirectCommand2KHR-stride-03690

`hitShaderBindingTableStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-04035) VUID-VkTraceRaysIndirectCommand2KHR-stride-04035

`hitShaderBindingTableStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03692) VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03692

`callableShaderBindingTableAddress` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03693) VUID-VkTraceRaysIndirectCommand2KHR-pCallableShaderBindingTable-03693

`callableShaderBindingTableAddress` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupBaseAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-03694) VUID-VkTraceRaysIndirectCommand2KHR-stride-03694

`callableShaderBindingTableStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`shaderGroupHandleAlignment`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-stride-04041) VUID-VkTraceRaysIndirectCommand2KHR-stride-04041

`callableShaderBindingTableStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxShaderGroupStride`

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03511) VUID-VkTraceRaysIndirectCommand2KHR-flags-03511

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits), the
entries in the table identified by `missShaderBindingTableAddress`
accessed as a result of this command in order to execute a miss shader
**must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03512) VUID-VkTraceRaysIndirectCommand2KHR-flags-03512

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `hitShaderBindingTableAddress`
accessed as a result of this command in order to execute an any-hit
shader **must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03513) VUID-VkTraceRaysIndirectCommand2KHR-flags-03513

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `hitShaderBindingTableAddress`
accessed as a result of this command in order to execute a closest hit
shader **must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-flags-03514) VUID-VkTraceRaysIndirectCommand2KHR-flags-03514

If the bound ray tracing pipeline was created with `flags` that
included
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits),
entries in the table identified by `hitShaderBindingTableAddress`
accessed as a result of this command in order to execute an intersection
shader **must** not be zero

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04735) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04735

Any non-zero hit shader group entries in the table identified by
`hitShaderBindingTableAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_TRIANGLES_KHR](resources.html#VkGeometryTypeNV) **must**
have been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](pipelines.html#VkRayTracingShaderGroupTypeNV)

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04736) VUID-VkTraceRaysIndirectCommand2KHR-pHitShaderBindingTable-04736

Any non-zero hit shader group entries in the table identified by
`hitShaderBindingTableAddress` accessed by this call from a geometry
with a `geometryType` of [VK_GEOMETRY_TYPE_AABBS_KHR](resources.html#VkGeometryTypeNV) **must** have
been created with
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](pipelines.html#VkRayTracingShaderGroupTypeNV)

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-width-03638) VUID-VkTraceRaysIndirectCommand2KHR-width-03638

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[0]

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-height-03639) VUID-VkTraceRaysIndirectCommand2KHR-height-03639

`height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[1]

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-depth-03640) VUID-VkTraceRaysIndirectCommand2KHR-depth-03640

`depth` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]
× `VkPhysicalDeviceLimits`::`maxComputeWorkGroupSize`[2]

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-width-03641) VUID-VkTraceRaysIndirectCommand2KHR-width-03641

`width` × `height` × `depth` **must** be less
than or equal to
`VkPhysicalDeviceRayTracingPipelinePropertiesKHR`::`maxRayDispatchInvocationCount`

Valid Usage (Implicit)

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-raygenShaderRecordAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-raygenShaderRecordAddress-parameter

 `raygenShaderRecordAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-missShaderBindingTableAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-missShaderBindingTableAddress-parameter

 `missShaderBindingTableAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-hitShaderBindingTableAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-hitShaderBindingTableAddress-parameter

 `hitShaderBindingTableAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkTraceRaysIndirectCommand2KHR-callableShaderBindingTableAddress-parameter) VUID-VkTraceRaysIndirectCommand2KHR-callableShaderBindingTableAddress-parameter

 `callableShaderBindingTableAddress` **must** be a valid `VkDeviceAddress` value

To dispatch ray tracing for the `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)` extension use:

// Provided by VK_NV_ray_tracing
void vkCmdTraceRaysNV(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    raygenShaderBindingTableBuffer,
    VkDeviceSize                                raygenShaderBindingOffset,
    VkBuffer                                    missShaderBindingTableBuffer,
    VkDeviceSize                                missShaderBindingOffset,
    VkDeviceSize                                missShaderBindingStride,
    VkBuffer                                    hitShaderBindingTableBuffer,
    VkDeviceSize                                hitShaderBindingOffset,
    VkDeviceSize                                hitShaderBindingStride,
    VkBuffer                                    callableShaderBindingTableBuffer,
    VkDeviceSize                                callableShaderBindingOffset,
    VkDeviceSize                                callableShaderBindingStride,
    uint32_t                                    width,
    uint32_t                                    height,
    uint32_t                                    depth);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`raygenShaderBindingTableBuffer` is the buffer object that holds the
shader binding table data for the ray generation shader stage.

* 
`raygenShaderBindingOffset` is the offset in bytes (relative to
`raygenShaderBindingTableBuffer`) of the ray generation shader being
used for the trace.

* 
`missShaderBindingTableBuffer` is the buffer object that holds the
shader binding table data for the miss shader stage.

* 
`missShaderBindingOffset` is the offset in bytes (relative to
`missShaderBindingTableBuffer`) of the miss shader being used for
the trace.

* 
`missShaderBindingStride` is the size in bytes of each shader
binding table record in `missShaderBindingTableBuffer`.

* 
`hitShaderBindingTableBuffer` is the buffer object that holds the
shader binding table data for the hit shader stages.

* 
`hitShaderBindingOffset` is the offset in bytes (relative to
`hitShaderBindingTableBuffer`) of the hit shader group being used
for the trace.

* 
`hitShaderBindingStride` is the size in bytes of each shader binding
table record in `hitShaderBindingTableBuffer`.

* 
`callableShaderBindingTableBuffer` is the buffer object that holds
the shader binding table data for the callable shader stage.

* 
`callableShaderBindingOffset` is the offset in bytes (relative to
`callableShaderBindingTableBuffer`) of the callable shader being
used for the trace.

* 
`callableShaderBindingStride` is the size in bytes of each shader
binding table record in `callableShaderBindingTableBuffer`.

* 
`width` is the width of the ray trace query dimensions.

* 
`height` is height of the ray trace query dimensions.

* 
`depth` is depth of the ray trace query dimensions.

When the command is executed, a ray generation group of `width`
× `height` × `depth` rays is assembled.

Valid Usage

* 
[](#VUID-vkCmdTraceRaysNV-magFilter-04553) VUID-vkCmdTraceRaysNV-magFilter-04553

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-magFilter-09598) VUID-vkCmdTraceRaysNV-magFilter-09598

If a [VkSampler](samplers.html#VkSampler) created with `magFilter` or `minFilter`
equal to [VK_FILTER_LINEAR](samplers.html#VkFilter) and `reductionMode` equal to either
[VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-mipmapMode-04770) VUID-vkCmdTraceRaysNV-mipmapMode-04770

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT),
and `compareEnable` equal to [VK_FALSE](fundamentals.html#VK_FALSE) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-mipmapMode-09599) VUID-vkCmdTraceRaysNV-mipmapMode-09599

If a [VkSampler](samplers.html#VkSampler) created with `mipmapMode` equal to
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) and `reductionMode` equal to
either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) is used to sample a
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-unnormalizedCoordinates-09635) VUID-vkCmdTraceRaysNV-unnormalizedCoordinates-09635

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `levelCount` and `layerCount`
**must** be 1

* 
[](#VUID-vkCmdTraceRaysNV-None-08609) VUID-vkCmdTraceRaysNV-None-08609

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the image view’s `viewType` **must** be
[VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysNV-None-08610) VUID-vkCmdTraceRaysNV-None-08610

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions with
`ImplicitLod`, `Dref` or `Proj` in their name

* 
[](#VUID-vkCmdTraceRaysNV-None-08611) VUID-vkCmdTraceRaysNV-None-08611

If a [VkSampler](samplers.html#VkSampler) created with `unnormalizedCoordinates` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) is used to sample a [VkImageView](resources.html#VkImageView) as a result of this
command, then the sampler **must** not be used with any of the SPIR-V
`OpImageSample*` or `OpImageSparseSample*` instructions that includes a
LOD bias or any offset values

* 
[](#VUID-vkCmdTraceRaysNV-None-06479) VUID-vkCmdTraceRaysNV-None-06479

If a [VkImageView](resources.html#VkImageView) is sampled with
[depth comparison](textures.html#textures-depth-compare-operation), the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-None-02691) VUID-vkCmdTraceRaysNV-None-02691

If a [VkImageView](resources.html#VkImageView) is accessed using atomic operations as a result
of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-None-07888) VUID-vkCmdTraceRaysNV-None-07888

If a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor is
accessed using atomic operations as a result of this command, then the
storage texel buffer’s [format    features](resources.html#resources-buffer-view-format-features) **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-None-02692) VUID-vkCmdTraceRaysNV-None-02692

If a [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-None-02693) VUID-vkCmdTraceRaysNV-None-02693

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
any [VkImageView](resources.html#VkImageView) is sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command, it **must** not have a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_3D](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE](resources.html#VkImageViewType), or
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType)

* 
[](#VUID-vkCmdTraceRaysNV-filterCubic-02694) VUID-vkCmdTraceRaysNV-filterCubic-02694

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a
result of this command **must** have a [VkImageViewType](resources.html#VkImageViewType) and format
that supports cubic filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubic`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysNV-filterCubicMinmax-02695) VUID-vkCmdTraceRaysNV-filterCubicMinmax-02695

Any [VkImageView](resources.html#VkImageView) being sampled with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) with
a reduction mode of either [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT) as a result of this command **must**
have a [VkImageViewType](resources.html#VkImageViewType) and format that supports cubic filtering
together with minmax filtering, as specified by
[VkFilterCubicImageViewImageFormatPropertiesEXT](capabilities.html#VkFilterCubicImageViewImageFormatPropertiesEXT)::`filterCubicMinmax`
returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[](#VUID-vkCmdTraceRaysNV-cubicRangeClamp-09212) VUID-vkCmdTraceRaysNV-cubicRangeClamp-09212

If the [`cubicRangeClamp`](features.html#features-cubicRangeClamp) feature is
not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** not have a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)

* 
[](#VUID-vkCmdTraceRaysNV-reductionMode-09213) VUID-vkCmdTraceRaysNV-reductionMode-09213

Any [VkImageView](resources.html#VkImageView) being sampled with a
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` equal to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT) as a
result of this command **must** sample with [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)

* 
[](#VUID-vkCmdTraceRaysNV-selectableCubicWeights-09214) VUID-vkCmdTraceRaysNV-selectableCubicWeights-09214

If the [`selectableCubicWeights`](features.html#features-selectableCubicWeights)
feature is not enabled, then any [VkImageView](resources.html#VkImageView) being sampled with
[VK_FILTER_CUBIC_EXT](samplers.html#VkFilter) as a result of this command **must** have
[VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights` equal to
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)

* 
[](#VUID-vkCmdTraceRaysNV-flags-02696) VUID-vkCmdTraceRaysNV-flags-02696

Any [VkImage](resources.html#VkImage) created with a [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits) sampled as a
result of this command **must** only be sampled using a
[VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode)

* 
[](#VUID-vkCmdTraceRaysNV-OpTypeImage-07027) VUID-vkCmdTraceRaysNV-OpTypeImage-07027

For any [VkImageView](resources.html#VkImageView) being written as a storage image where the
image format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpTypeImage-07028) VUID-vkCmdTraceRaysNV-OpTypeImage-07028

For any [VkImageView](resources.html#VkImageView) being read as a storage image where the image
format field of the `OpTypeImage` is `Unknown`, the view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpTypeImage-07029) VUID-vkCmdTraceRaysNV-OpTypeImage-07029

For any [VkBufferView](resources.html#VkBufferView) being written as a storage texel buffer where
the image format field of the `OpTypeImage` is `Unknown`, the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpTypeImage-07030) VUID-vkCmdTraceRaysNV-OpTypeImage-07030

Any [VkBufferView](resources.html#VkBufferView) being read as a storage texel buffer where the
image format field of the `OpTypeImage` is `Unknown` then the
view’s [buffer features](formats.html#VkFormatProperties3) **must** contain
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-None-08600) VUID-vkCmdTraceRaysNV-None-08600

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
[](#VUID-vkCmdTraceRaysNV-None-08601) VUID-vkCmdTraceRaysNV-None-08601

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
[](#VUID-vkCmdTraceRaysNV-None-10068) VUID-vkCmdTraceRaysNV-None-10068

For each array of resources that is used by [a bound    shader](shaders.html#shaders-binding), the indices used to access members of the array **must** be less
than the descriptor count for the identified binding in the descriptor
sets used by this command

* 
[](#VUID-vkCmdTraceRaysNV-maintenance4-08602) VUID-vkCmdTraceRaysNV-maintenance4-08602

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
[](#VUID-vkCmdTraceRaysNV-None-08114) VUID-vkCmdTraceRaysNV-None-08114

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), **must** be valid if they are accessed as
described by [descriptor validity](descriptorsets.html#descriptor-validity) by
the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind point used by this
command and the bound [VkPipeline](pipelines.html#VkPipeline) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-imageLayout-00344) VUID-vkCmdTraceRaysNV-imageLayout-00344

If an image descriptor is accessed by a shader, the [VkImageLayout](resources.html#VkImageLayout)
**must** match the subresource accessible from the [VkImageView](resources.html#VkImageView) as
defined by the [image layout    matching rules](resources.html#resources-image-layouts-matching-rule)

* 
[](#VUID-vkCmdTraceRaysNV-None-08115) VUID-vkCmdTraceRaysNV-None-08115

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), the bound
[VkPipeline](pipelines.html#VkPipeline) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-None-08116) VUID-vkCmdTraceRaysNV-None-08116

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline bind
point used by this command and the bound [VkPipeline](pipelines.html#VkPipeline) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-None-08604) VUID-vkCmdTraceRaysNV-None-08604

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT), **must** be valid if they are
dynamically used by any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command

* 
[](#VUID-vkCmdTraceRaysNV-None-08117) VUID-vkCmdTraceRaysNV-None-08117

If the descriptors used by the [VkPipeline](pipelines.html#VkPipeline) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT),
the bound [VkPipeline](pipelines.html#VkPipeline) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-None-08119) VUID-vkCmdTraceRaysNV-None-08119

If a descriptor is dynamically used with a [VkPipeline](pipelines.html#VkPipeline) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysNV-None-08605) VUID-vkCmdTraceRaysNV-None-08605

If a descriptor is dynamically used with a [VkShaderEXT](shaders.html#VkShaderEXT) created
with a `VkDescriptorSetLayout` that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits), the
descriptor memory **must** be resident

* 
[](#VUID-vkCmdTraceRaysNV-None-08606) VUID-vkCmdTraceRaysNV-None-08606

If the [`shaderObject`](features.html#features-shaderObject) feature is not
enabled, a
valid pipeline **must** be bound to the pipeline bind point used by this
command

* 
[](#VUID-vkCmdTraceRaysNV-None-08608) VUID-vkCmdTraceRaysNV-None-08608

If a pipeline is bound to the pipeline bind point used by this command,
there
**must** not have been any calls to dynamic state setting commands for any
state specified statically in the [VkPipeline](pipelines.html#VkPipeline) object bound to the
pipeline bind point used by this command, since that pipeline was bound

* 
[](#VUID-vkCmdTraceRaysNV-uniformBuffers-06935) VUID-vkCmdTraceRaysNV-uniformBuffers-06935

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
[](#VUID-vkCmdTraceRaysNV-None-08612) VUID-vkCmdTraceRaysNV-None-08612

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a uniform
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysNV-storageBuffers-06936) VUID-vkCmdTraceRaysNV-storageBuffers-06936

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
[](#VUID-vkCmdTraceRaysNV-None-08613) VUID-vkCmdTraceRaysNV-None-08613

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is not enabled, and any [VkShaderEXT](shaders.html#VkShaderEXT) bound to a stage corresponding
to the pipeline bind point used by this command accesses a storage
buffer, it **must** not access values outside of the range of the buffer as
specified in the descriptor set bound to the same pipeline bind point

* 
[](#VUID-vkCmdTraceRaysNV-commandBuffer-02707) VUID-vkCmdTraceRaysNV-commandBuffer-02707

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by [bound shaders](shaders.html#shaders-binding) **must** not be
a protected resource

* 
[](#VUID-vkCmdTraceRaysNV-viewType-07752) VUID-vkCmdTraceRaysNV-viewType-07752

If a [VkImageView](resources.html#VkImageView) is accessed as a result of this command, then the
image view’s `viewType` **must** match the `Dim` operand of the
`OpTypeImage` as described in [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](../appendices/spirvenv.html#spirvenv-image-dimensions)

* 
[](#VUID-vkCmdTraceRaysNV-format-07753) VUID-vkCmdTraceRaysNV-format-07753

If a [VkImageView](resources.html#VkImageView) or [VkBufferView](resources.html#VkBufferView) is accessed as a result of
this command, then the [numeric type](formats.html#formats-numericformat) of the
view’s `format` and the `Sampled` `Type` operand of the
`OpTypeImage` **must** match

* 
[](#VUID-vkCmdTraceRaysNV-OpImageWrite-08795) VUID-vkCmdTraceRaysNV-OpImageWrite-08795

If a [VkImageView](resources.html#VkImageView)
created with a format other than [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
at least as many components as the image view’s format

* 
[](#VUID-vkCmdTraceRaysNV-OpImageWrite-08796) VUID-vkCmdTraceRaysNV-OpImageWrite-08796

If a [VkImageView](resources.html#VkImageView) created with the format [VK_FORMAT_A8_UNORM](formats.html#VkFormat)
is accessed using `OpImageWrite` as a result of this command, then
the `Type` of the `Texel` operand of that instruction **must** have
four components

* 
[](#VUID-vkCmdTraceRaysNV-OpImageWrite-04469) VUID-vkCmdTraceRaysNV-OpImageWrite-04469

If a [VkBufferView](resources.html#VkBufferView) is accessed using `OpImageWrite` as a result
of this command, then the `Type` of the `Texel` operand of that
instruction **must** have at least as many components as the buffer view’s
format

* 
[](#VUID-vkCmdTraceRaysNV-SampledType-04470) VUID-vkCmdTraceRaysNV-SampledType-04470

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit component
width is accessed as a result of this command, the `SampledType` of
the `OpTypeImage` operand of that instruction **must** have a `Width`
of 64

* 
[](#VUID-vkCmdTraceRaysNV-SampledType-04471) VUID-vkCmdTraceRaysNV-SampledType-04471

If a [VkImageView](resources.html#VkImageView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysNV-SampledType-04472) VUID-vkCmdTraceRaysNV-SampledType-04472

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a 64-bit
component width is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 64

* 
[](#VUID-vkCmdTraceRaysNV-SampledType-04473) VUID-vkCmdTraceRaysNV-SampledType-04473

If a [VkBufferView](resources.html#VkBufferView) with a [VkFormat](formats.html#VkFormat) that has a component width
less than 64-bit is accessed as a result of this command, the
`SampledType` of the `OpTypeImage` operand of that instruction
**must** have a `Width` of 32

* 
[](#VUID-vkCmdTraceRaysNV-sparseImageInt64Atomics-04474) VUID-vkCmdTraceRaysNV-sparseImageInt64Atomics-04474

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkImage](resources.html#VkImage)
objects created with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag
**must** not be accessed by atomic instructions through an `OpTypeImage`
with a `SampledType` with a `Width` of 64 by this command

* 
[](#VUID-vkCmdTraceRaysNV-sparseImageInt64Atomics-04475) VUID-vkCmdTraceRaysNV-sparseImageInt64Atomics-04475

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is not enabled, [VkBuffer](resources.html#VkBuffer)
objects created with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits)
flag **must** not be accessed by atomic instructions through an
`OpTypeImage` with a `SampledType` with a `Width` of 64 by this
command

* 
[](#VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06971) VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06971

If `OpImageSampleWeightedQCOM` is used to sample a [VkImageView](resources.html#VkImageView)
as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06972) VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06972

If `OpImageSampleWeightedQCOM` uses a [VkImageView](resources.html#VkImageView) as a sample
weight image as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageBoxFilterQCOM-06973) VUID-vkCmdTraceRaysNV-OpImageBoxFilterQCOM-06973

If `OpImageBoxFilterQCOM` is used to sample a [VkImageView](resources.html#VkImageView) as a
result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageBlockMatchSSDQCOM-06974) VUID-vkCmdTraceRaysNV-OpImageBlockMatchSSDQCOM-06974

If `OpImageBlockMatchSSDQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageBlockMatchSADQCOM-06975) VUID-vkCmdTraceRaysNV-OpImageBlockMatchSADQCOM-06975

If `OpImageBlockMatchSADQCOM` is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageBlockMatchSADQCOM-06976) VUID-vkCmdTraceRaysNV-OpImageBlockMatchSADQCOM-06976

If `OpImageBlockMatchSADQCOM` or OpImageBlockMatchSSDQCOM is used to
read from a reference image as result of this command, then the
specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06977) VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06977

If `OpImageSampleWeightedQCOM`, `OpImageBoxFilterQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM` uses a
[VkSampler](samplers.html#VkSampler) as a result of this command, then the sampler **must** have
been created with [VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](samplers.html#VkSamplerCreateFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06978) VUID-vkCmdTraceRaysNV-OpImageSampleWeightedQCOM-06978

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
[](#VUID-vkCmdTraceRaysNV-OpImageBlockMatchWindow-09215) VUID-vkCmdTraceRaysNV-OpImageBlockMatchWindow-09215

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
[format features](resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-vkCmdTraceRaysNV-OpImageBlockMatchWindow-09216) VUID-vkCmdTraceRaysNV-OpImageBlockMatchWindow-09216

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` instruction is used to read from an
[VkImageView](resources.html#VkImageView) as a result of this command, then the image view’s
format **must** be a single-component format

* 
[](#VUID-vkCmdTraceRaysNV-OpImageBlockMatchWindow-09217) VUID-vkCmdTraceRaysNV-OpImageBlockMatchWindow-09217

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` read from a reference image as result
of this command, then the specified reference coordinates **must** not fail
[integer texel coordinate    validation](textures.html#textures-integer-coordinate-validation)

* 
[](#VUID-vkCmdTraceRaysNV-None-07288) VUID-vkCmdTraceRaysNV-None-07288

Any shader invocation executed by this command **must**
[terminate](shaders.html#shaders-termination)

* 
[](#VUID-vkCmdTraceRaysNV-None-09600) VUID-vkCmdTraceRaysNV-None-09600

If a descriptor with type equal to any of
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) is accessed as a result of
this command, all image subresources identified by that descriptor **must**
be in the image layout identified when the descriptor was written

* 
[](#VUID-vkCmdTraceRaysNV-commandBuffer-10746) VUID-vkCmdTraceRaysNV-commandBuffer-10746

The `VkDeviceMemory` object allocated from a `VkMemoryHeap` with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property that is bound to
a resource accessed as a result of this command **must** be the active
bound [bound tile memory object](memory.html#memory-bind-tile-memory) in
`commandBuffer`

* 
[](#VUID-vkCmdTraceRaysNV-None-10678) VUID-vkCmdTraceRaysNV-None-10678

If this command is recorded inside a [tile    shading render pass](renderpass.html#renderpass-tile-shading) instance, the stages corresponding to the pipeline
bind point used by this command **must** only include
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
and/or [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdTraceRaysNV-None-10679) VUID-vkCmdTraceRaysNV-None-10679

If this command is recorded where
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled, there **must** be no access to any image while the image was be
transitioned to the
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) layout

* 
[](#VUID-vkCmdTraceRaysNV-pDescription-09900) VUID-vkCmdTraceRaysNV-pDescription-09900

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](resources.html#VkTensorARM) object
**must** have been created with the [VK_TENSOR_USAGE_SHADER_BIT_ARM](resources.html#VkTensorUsageFlagBitsARM)
usage flag set

* 
[](#VUID-vkCmdTraceRaysNV-dimensionCount-09905) VUID-vkCmdTraceRaysNV-dimensionCount-09905

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the `Rank` of the `OpTypeTensorARM`
of the tensor resource variable **must** be equal to the
`dimensionCount` provided via
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription` when creating the
underlying [VkTensorARM](resources.html#VkTensorARM) object

* 
[](#VUID-vkCmdTraceRaysNV-OpTypeTensorARM-09906) VUID-vkCmdTraceRaysNV-OpTypeTensorARM-09906

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor is accessed as a
result of this command, then the element type of the
`OpTypeTensorARM` of the tensor resource variable **must** be
[compatible](../appendices/spirvenv.html#spirvenv-tensor-formats) with the [VkFormat](formats.html#VkFormat) of the
[VkTensorViewARM](resources.html#VkTensorViewARM) used for the access

* 
[](#VUID-vkCmdTraceRaysNV-None-11297) VUID-vkCmdTraceRaysNV-None-11297

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
[](#VUID-vkCmdTraceRaysNV-None-11298) VUID-vkCmdTraceRaysNV-None-11298

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
[](#VUID-vkCmdTraceRaysNV-None-11299) VUID-vkCmdTraceRaysNV-None-11299

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
[](#VUID-vkCmdTraceRaysNV-None-11397) VUID-vkCmdTraceRaysNV-None-11397

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
[](#VUID-vkCmdTraceRaysNV-None-11300) VUID-vkCmdTraceRaysNV-None-11300

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a
shader accesses a resource using that mapping, the value of the address
at the expected location in push data **must** be a multiple of 4

* 
[](#VUID-vkCmdTraceRaysNV-None-11301) VUID-vkCmdTraceRaysNV-None-11301

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
[](#VUID-vkCmdTraceRaysNV-None-11302) VUID-vkCmdTraceRaysNV-None-11302

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and
a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysNV-None-11304) VUID-vkCmdTraceRaysNV-None-11304

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a multiple of 8

* 
[](#VUID-vkCmdTraceRaysNV-None-11305) VUID-vkCmdTraceRaysNV-None-11305

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address at the expected location in push data **must** be a valid
`VkDeviceAddress` backed by physical memory at every offset
specified by each mapping

* 
[](#VUID-vkCmdTraceRaysNV-None-11306) VUID-vkCmdTraceRaysNV-None-11306

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and a shader accesses a resource using that mapping, the value of the
address pointed to by the address in push data **must** be a valid
`VkDeviceAddress`

* 
[](#VUID-vkCmdTraceRaysNV-None-11308) VUID-vkCmdTraceRaysNV-None-11308

For each [descriptor heap](descriptorheaps.html#descriptorheaps) that is statically used by
[a bound shader](shaders.html#shaders-binding), either directly or via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), a valid descriptor heap
**must** be bound

* 
[](#VUID-vkCmdTraceRaysNV-None-11309) VUID-vkCmdTraceRaysNV-None-11309

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, execution of
this command **must** not result in any descriptor read accessing data
outside of the user range of the respective heap bound by
`vkCmdBind*HeapEXT` commands

* 
[](#VUID-vkCmdTraceRaysNV-None-11372) VUID-vkCmdTraceRaysNV-None-11372

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
[](#VUID-vkCmdTraceRaysNV-None-11373) VUID-vkCmdTraceRaysNV-None-11373

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
[](#VUID-vkCmdTraceRaysNV-None-11374) VUID-vkCmdTraceRaysNV-None-11374

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
[](#VUID-vkCmdTraceRaysNV-pBindInfo-11375) VUID-vkCmdTraceRaysNV-pBindInfo-11375

If any [bound shader](shaders.html#shaders-binding) uses an embedded sampler via a
[descriptor mapping](descriptorheaps.html#descriptorheaps-bindings), the value of
`pBindInfo->reservedRangeSize` set for [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)
**must** be greater than or equal to
[    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)

* 
[](#VUID-vkCmdTraceRaysNV-None-11376) VUID-vkCmdTraceRaysNV-None-11376

If a [bound shader](shaders.html#shaders-binding) was created
as a [VkShaderEXT](shaders.html#VkShaderEXT) with the
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT) flag or
as part of a pipeline with the
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR) flag, and that shader
statically uses a push constant value, that value **must** have been set by
[vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
[](#VUID-vkCmdTraceRaysNV-None-11398) VUID-vkCmdTraceRaysNV-None-11398

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
[](#VUID-vkCmdTraceRaysNV-None-11437) VUID-vkCmdTraceRaysNV-None-11437

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
[](#VUID-vkCmdTraceRaysNV-None-11438) VUID-vkCmdTraceRaysNV-None-11438

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysNV-None-11441) VUID-vkCmdTraceRaysNV-None-11441

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a uniform buffer using that mapping, the address that the
uniform buffer is mapped to **must** be aligned to
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysNV-None-11439) VUID-vkCmdTraceRaysNV-None-11439

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** have been queried from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdTraceRaysNV-None-11442) VUID-vkCmdTraceRaysNV-None-11442

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), and a shader
accesses a storage buffer using that mapping, the address that the
storage buffer is mapped to **must** be aligned to
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-vkCmdTraceRaysNV-None-11485) VUID-vkCmdTraceRaysNV-None-11485

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
[](#VUID-vkCmdTraceRaysNV-index-11450) VUID-vkCmdTraceRaysNV-index-11450

If a shader uses a sampler descriptor to sample an image as a result of
this command, and that sampler descriptor uses a custom border color
with an index defined by
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT), the value of
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must**
have been registered before this command was recorded, and still be
registered during the sampling operation, with an identically defined
color

* 
[](#VUID-vkCmdTraceRaysNV-protectedNoFault-11455) VUID-vkCmdTraceRaysNV-protectedNoFault-11455

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the address
that the resource is mapped to **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysNV-protectedNoFault-11456) VUID-vkCmdTraceRaysNV-protectedNoFault-11456

If [`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
a pipeline is bound to the pipeline bind point used by this command,
or a shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
the address of the indirect memory **must** have been queried from a buffer
created without the [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits) create flag set

* 
[](#VUID-vkCmdTraceRaysNV-None-03429) VUID-vkCmdTraceRaysNV-None-03429

Any shader group handle referenced by this call **must** have been queried
from the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysNV-None-09458) VUID-vkCmdTraceRaysNV-None-09458

If the bound ray tracing pipeline state was created with the
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](pipelines.html#VkDynamicState) dynamic state
enabled then [vkCmdSetRayTracingPipelineStackSizeKHR](pipelines.html#vkCmdSetRayTracingPipelineStackSizeKHR) **must** have
been called in the current command buffer prior to this trace command

* 
[](#VUID-vkCmdTraceRaysNV-None-11319) VUID-vkCmdTraceRaysNV-None-11319

If a pipeline is bound to the pipeline bind point used by this command,
or shader is bound to a shader stage used by this command,
and it was created with a [descriptor    mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the value
of the address at the expected location in shader record data **must** be a
valid address

* 
[](#VUID-vkCmdTraceRaysNV-commandBuffer-04624) VUID-vkCmdTraceRaysNV-commandBuffer-04624

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdTraceRaysNV-maxRecursionDepth-03625) VUID-vkCmdTraceRaysNV-maxRecursionDepth-03625

This command **must** not cause a pipeline trace ray instruction to be
executed from a shader invocation with a [    recursion depth](#ray-tracing-recursion-depth) greater than the value of `maxRecursionDepth` used
to create the bound ray tracing pipeline

* 
[](#VUID-vkCmdTraceRaysNV-raygenShaderBindingTableBuffer-04042) VUID-vkCmdTraceRaysNV-raygenShaderBindingTableBuffer-04042

If `raygenShaderBindingTableBuffer` is non-sparse then it **must** be
bound completely and contiguously to a single `VkDeviceMemory`
object

* 
[](#VUID-vkCmdTraceRaysNV-raygenShaderBindingOffset-02455) VUID-vkCmdTraceRaysNV-raygenShaderBindingOffset-02455

`raygenShaderBindingOffset` **must** be less than the size of
`raygenShaderBindingTableBuffer`

* 
[](#VUID-vkCmdTraceRaysNV-raygenShaderBindingOffset-02456) VUID-vkCmdTraceRaysNV-raygenShaderBindingOffset-02456

`raygenShaderBindingOffset` **must** be a multiple of
`VkPhysicalDeviceRayTracingPropertiesNV`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysNV-missShaderBindingTableBuffer-04043) VUID-vkCmdTraceRaysNV-missShaderBindingTableBuffer-04043

If `missShaderBindingTableBuffer` is non-sparse then it **must** be
bound completely and contiguously to a single `VkDeviceMemory`
object

* 
[](#VUID-vkCmdTraceRaysNV-missShaderBindingOffset-02457) VUID-vkCmdTraceRaysNV-missShaderBindingOffset-02457

`missShaderBindingOffset` **must** be less than the size of
`missShaderBindingTableBuffer`

* 
[](#VUID-vkCmdTraceRaysNV-missShaderBindingOffset-02458) VUID-vkCmdTraceRaysNV-missShaderBindingOffset-02458

`missShaderBindingOffset` **must** be a multiple of
`VkPhysicalDeviceRayTracingPropertiesNV`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysNV-hitShaderBindingTableBuffer-04044) VUID-vkCmdTraceRaysNV-hitShaderBindingTableBuffer-04044

If `hitShaderBindingTableBuffer` is non-sparse then it **must** be
bound completely and contiguously to a single `VkDeviceMemory`
object

* 
[](#VUID-vkCmdTraceRaysNV-hitShaderBindingOffset-02459) VUID-vkCmdTraceRaysNV-hitShaderBindingOffset-02459

`hitShaderBindingOffset` **must** be less than the size of
`hitShaderBindingTableBuffer`

* 
[](#VUID-vkCmdTraceRaysNV-hitShaderBindingOffset-02460) VUID-vkCmdTraceRaysNV-hitShaderBindingOffset-02460

`hitShaderBindingOffset` **must** be a multiple of
`VkPhysicalDeviceRayTracingPropertiesNV`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysNV-callableShaderBindingTableBuffer-04045) VUID-vkCmdTraceRaysNV-callableShaderBindingTableBuffer-04045

If `callableShaderBindingTableBuffer` is non-sparse then it **must** be
bound completely and contiguously to a single `VkDeviceMemory`
object

* 
[](#VUID-vkCmdTraceRaysNV-callableShaderBindingOffset-02461) VUID-vkCmdTraceRaysNV-callableShaderBindingOffset-02461

`callableShaderBindingOffset` **must** be less than the size of
`callableShaderBindingTableBuffer`

* 
[](#VUID-vkCmdTraceRaysNV-callableShaderBindingOffset-02462) VUID-vkCmdTraceRaysNV-callableShaderBindingOffset-02462

`callableShaderBindingOffset` **must** be a multiple of
`VkPhysicalDeviceRayTracingPropertiesNV`::`shaderGroupBaseAlignment`

* 
[](#VUID-vkCmdTraceRaysNV-missShaderBindingStride-02463) VUID-vkCmdTraceRaysNV-missShaderBindingStride-02463

`missShaderBindingStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPropertiesNV`::`shaderGroupHandleSize`

* 
[](#VUID-vkCmdTraceRaysNV-hitShaderBindingStride-02464) VUID-vkCmdTraceRaysNV-hitShaderBindingStride-02464

`hitShaderBindingStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPropertiesNV`::`shaderGroupHandleSize`

* 
[](#VUID-vkCmdTraceRaysNV-callableShaderBindingStride-02465) VUID-vkCmdTraceRaysNV-callableShaderBindingStride-02465

`callableShaderBindingStride` **must** be a multiple of
`VkPhysicalDeviceRayTracingPropertiesNV`::`shaderGroupHandleSize`

* 
[](#VUID-vkCmdTraceRaysNV-missShaderBindingStride-02466) VUID-vkCmdTraceRaysNV-missShaderBindingStride-02466

`missShaderBindingStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPropertiesNV`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysNV-hitShaderBindingStride-02467) VUID-vkCmdTraceRaysNV-hitShaderBindingStride-02467

`hitShaderBindingStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPropertiesNV`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysNV-callableShaderBindingStride-02468) VUID-vkCmdTraceRaysNV-callableShaderBindingStride-02468

`callableShaderBindingStride` **must** be less than or equal to
`VkPhysicalDeviceRayTracingPropertiesNV`::`maxShaderGroupStride`

* 
[](#VUID-vkCmdTraceRaysNV-width-02469) VUID-vkCmdTraceRaysNV-width-02469

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[0]

* 
[](#VUID-vkCmdTraceRaysNV-height-02470) VUID-vkCmdTraceRaysNV-height-02470

`height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[1]

* 
[](#VUID-vkCmdTraceRaysNV-depth-02471) VUID-vkCmdTraceRaysNV-depth-02471

`depth` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxComputeWorkGroupCount`[2]

* 
[](#VUID-vkCmdTraceRaysNV-allowClusterAccelerationStructure-10577) VUID-vkCmdTraceRaysNV-allowClusterAccelerationStructure-10577

If the traced geometry contains a cluster acceleration structure, then
[VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](pipelines.html#VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV)::`allowClusterAccelerationStructure`
**must** have been set for that pipeline

Valid Usage (Implicit)

* 
[](#VUID-vkCmdTraceRaysNV-commandBuffer-parameter) VUID-vkCmdTraceRaysNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdTraceRaysNV-raygenShaderBindingTableBuffer-parameter) VUID-vkCmdTraceRaysNV-raygenShaderBindingTableBuffer-parameter

 `raygenShaderBindingTableBuffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdTraceRaysNV-missShaderBindingTableBuffer-parameter) VUID-vkCmdTraceRaysNV-missShaderBindingTableBuffer-parameter

 If `missShaderBindingTableBuffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `missShaderBindingTableBuffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdTraceRaysNV-hitShaderBindingTableBuffer-parameter) VUID-vkCmdTraceRaysNV-hitShaderBindingTableBuffer-parameter

 If `hitShaderBindingTableBuffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `hitShaderBindingTableBuffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdTraceRaysNV-callableShaderBindingTableBuffer-parameter) VUID-vkCmdTraceRaysNV-callableShaderBindingTableBuffer-parameter

 If `callableShaderBindingTableBuffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `callableShaderBindingTableBuffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdTraceRaysNV-commandBuffer-recording) VUID-vkCmdTraceRaysNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdTraceRaysNV-commandBuffer-cmdpool) VUID-vkCmdTraceRaysNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdTraceRaysNV-renderpass) VUID-vkCmdTraceRaysNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdTraceRaysNV-suspended) VUID-vkCmdTraceRaysNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdTraceRaysNV-videocoding) VUID-vkCmdTraceRaysNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdTraceRaysNV-commonparent) VUID-vkCmdTraceRaysNV-commonparent

 Each of `callableShaderBindingTableBuffer`, `commandBuffer`, `hitShaderBindingTableBuffer`, `missShaderBindingTableBuffer`, and `raygenShaderBindingTableBuffer` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdTraceRaysNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

A *shader binding table* is a resource which establishes the relationship
between the ray tracing pipeline and the acceleration structures that were
built for the ray tracing pipeline.
It indicates the shaders that operate on each geometry in an acceleration
structure.
In addition, it contains the resources accessed by each shader, including
indices of textures, buffer device addresses, and constants.
The application allocates and manages *shader binding tables* as
[VkBuffer](resources.html#VkBuffer) objects.

Each entry in the shader binding table consists of
`shaderGroupHandleSize` bytes of data, either as queried by
[vkGetRayTracingShaderGroupHandlesKHR](pipelines.html#vkGetRayTracingShaderGroupHandlesKHR) to refer to those specified
shaders, or all zeros to refer to a zero shader group.
A zero shader group behaves as though it is a shader group consisting
entirely of [VK_SHADER_UNUSED_KHR](pipelines.html#VK_SHADER_UNUSED_KHR).
The remainder of the data specified by the stride is application-visible
data that can be referenced by a `ShaderRecordBufferKHR` block in the
shader.

The shader binding tables to use in a ray tracing pipeline are passed to the
[vkCmdTraceRaysNV](#vkCmdTraceRaysNV)
,
[vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR), or [vkCmdTraceRaysIndirectKHR](#vkCmdTraceRaysIndirectKHR)
commands.
Shader binding tables are read-only in shaders that are executing on the ray
tracing pipeline.

Shader variables identified with the `ShaderRecordBufferKHR` storage
class are used to access the provided shader binding table.
Such variables **must** be:

* 
typed as `OpTypeStruct`, or an array of this type,

* 
identified with a `Block` decoration, and

* 
laid out explicitly using the `Offset`, `ArrayStride`, and
`MatrixStride` decorations as specified in
[Offset and Stride Assignment](interfaces.html#interfaces-resources-layout).

The `Offset` decoration for any member of a `Block`-decorated variable
in the `ShaderRecordBufferKHR` storage class **must** not cause the space
required for that variable to extend outside the range [0,
`maxStorageBufferRange`).

Accesses to the shader binding table from ray tracing pipelines **must** be
[synchronized](synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)
[pipeline stage](synchronization.html#synchronization-pipeline-stages) and an
[access type](synchronization.html#synchronization-access-types) of
[VK_ACCESS_SHADER_READ_BIT](synchronization.html#VkAccessFlagBits).

|  | Because different shader record buffers can be associated with the same
| --- | --- |
shader, a shader variable with `ShaderRecordBufferKHR` storage class will
not be dynamically uniform if different invocations of the same shader can
reference different data in the shader record buffer, such as if the same
shader occurs twice in the shader binding table with a different shader
record buffer.
In this case,
if the `DescriptorHeapEXT` capability is not declared,
when indexing resources based on values in the `ShaderRecordBufferKHR`
storage class, the index should be decorated as `NonUniform`. |

In order to execute the correct shaders and access the correct resources
during a ray tracing dispatch, the implementation **must** be able to locate
shader binding table entries at various stages of execution.
This is accomplished by defining a set of indexing rules that compute shader
binding table record positions relative to the buffer’s base address in
memory.
The application **must** organize the contents of the shader binding table’s
memory in a way that application of the indexing rules will lead to correct
records.

Only one ray generation shader is executed per ray tracing dispatch.

For [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR), the location of the ray generation shader is
specified by the `pRaygenShaderBindingTable->deviceAddress` parameter — there is no indexing.
All data accessed **must** be less than `pRaygenShaderBindingTable->size`
bytes from `deviceAddress`.
`pRaygenShaderBindingTable->stride` is unused, and **must** be equal to
`pRaygenShaderBindingTable->size`.

For [vkCmdTraceRaysNV](#vkCmdTraceRaysNV), the location of the ray generation shader is
specified by the `raygenShaderBindingTableBuffer` and
`raygenShaderBindingOffset` parameters — there is no indexing.

The base for the computation of intersection, any-hit, and closest hit
shader locations is the `instanceShaderBindingTableRecordOffset` value
stored with each instance of a top-level acceleration structure
([VkAccelerationStructureInstanceKHR](accelstructures.html#VkAccelerationStructureInstanceKHR)).
This value determines the beginning of the shader binding table records for
a given instance.

In the following rule, `geometryIndex` refers to the
[geometry index](accelstructures.html#acceleration-structure-geometry-index) of the intersected
geometry within the instance.

The `sbtRecordOffset` and `sbtRecordStride` values are passed in as
parameters to
`traceNV`()
 or
`traceRayEXT`()
calls made in the shaders.
See Section 8.19 (Ray Tracing Functions) of the OpenGL Shading Language
Specification for more details.
In SPIR-V, these correspond to the `SBTOffset` and `SBTStride`
parameters to the [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray)
instructions.

The result of this computation is then added to
`pHitShaderBindingTable->deviceAddress`, a device address passed to
[vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR)
, or
`hitShaderBindingOffset`, a base offset passed to [vkCmdTraceRaysNV](#vkCmdTraceRaysNV)
.

For [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR), the complete rule to compute a hit shader
binding table record address in the `pHitShaderBindingTable` is:

`pHitShaderBindingTable->deviceAddress` + 
`pHitShaderBindingTable->stride` × (
`instanceShaderBindingTableRecordOffset` + 
`geometryIndex` × `sbtRecordStride` + 
`sbtRecordOffset` )

All data accessed **must** be less than `pHitShaderBindingTable->size`
bytes from the base address.

For [vkCmdTraceRaysNV](#vkCmdTraceRaysNV), the offset and stride come from direct
parameters, so the full rule to compute a hit shader binding table record
address in the `hitShaderBindingTableBuffer` is:

`hitShaderBindingOffset` + 
`hitShaderBindingStride` × (
`instanceShaderBindingTableRecordOffset` + 
`geometryIndex` × `sbtRecordStride` + 
`sbtRecordOffset` )

A miss shader is executed whenever a ray query fails to find an intersection
for the given scene geometry.
Multiple miss shaders **may** be executed throughout a ray tracing dispatch.

The base for the computation of miss shader locations is
`pMissShaderBindingTable->deviceAddress`, a device address passed into
[vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR)
, or
`missShaderBindingOffset`, a base offset passed into
[vkCmdTraceRaysNV](#vkCmdTraceRaysNV)
.

The `missIndex` value is passed in as a parameter to
`traceNV`()
 or
`traceRayEXT`()
calls made in the shaders.
See Section 8.19 (Ray Tracing Functions) of the OpenGL Shading Language
Specification for more details.
In SPIR-V, this corresponds to the `MissIndex` parameter to the
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

For [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR), the complete rule to compute a miss shader
binding table record address in the `pMissShaderBindingTable` is:

`pMissShaderBindingTable->deviceAddress` + 
`pMissShaderBindingTable->stride` × `missIndex`

All data accessed **must** be less than `pMissShaderBindingTable->size`
bytes from the base address.

For [vkCmdTraceRaysNV](#vkCmdTraceRaysNV), the offset and stride come from direct
parameters, so the full rule to compute a miss shader binding table record
address in the `missShaderBindingTableBuffer` is:

`missShaderBindingOffset` + 
`missShaderBindingStride` × `missIndex`

A callable shader is executed when requested by a ray tracing shader.
Multiple callable shaders **may** be executed throughout a ray tracing
dispatch.

The base for the computation of callable shader locations is
`pCallableShaderBindingTable->deviceAddress`, a device address passed
into [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR)
, or
`callableShaderBindingOffset`, a base offset passed into
[vkCmdTraceRaysNV](#vkCmdTraceRaysNV)
.

The `sbtRecordIndex` value is passed in as a parameter to
`executeCallableNV`()
 or
`executeCallableEXT`()
calls made in the shaders.
See Section 8.19 (Ray Tracing Functions) of the OpenGL Shading Language
Specification for more details.
In SPIR-V, this corresponds to the `SBTIndex` parameter to the
`OpExecuteCallableNV`
 or
`OpExecuteCallableKHR`
instruction.

For [vkCmdTraceRaysKHR](#vkCmdTraceRaysKHR), the complete rule to compute a callable shader
binding table record address in the `pCallableShaderBindingTable` is:

`pCallableShaderBindingTable->deviceAddress` + 
`pCallableShaderBindingTable->stride` ×
`sbtRecordIndex`

All data accessed **must** be less than `pCallableShaderBindingTable->size`
bytes from the base address.

For [vkCmdTraceRaysNV](#vkCmdTraceRaysNV), the offset and stride come from direct
parameters, so the full rule to compute a callable shader binding table
record address in the `callableShaderBindingTableBuffer` is:

`callableShaderBindingOffset` + 
`callableShaderBindingStride` × `sbtRecordIndex`

Ray tracing pipelines have a potentially large set of shaders which **may** be
invoked in various call chain combinations to perform ray tracing.
To store parameters for a given shader execution, an implementation **may** use
a stack of data in memory.
This stack **must** be sized to the sum of the stack sizes of all shaders in
any call chain executed by the application.

If the stack size is not set explicitly, the stack size for a pipeline is:

rayGenStackMax +  min(1,
`maxPipelineRayRecursionDepth`) ×
max(closestHitStackMax, missStackMax, intersectionStackMax
+  anyHitStackMax) +  max(0,
`maxPipelineRayRecursionDepth`-1) ×
max(closestHitStackMax, missStackMax) +  2 ×
callableStackMax

where rayGenStackMax, closestHitStackMax, missStackMax,
anyHitStackMax, intersectionStackMax, and callableStackMax
are the maximum stack values queried by the respective shader stages for any
shaders in any shader groups defined by the pipeline.

This stack size is potentially significant, so an application **may** want to
provide a more accurate stack size after pipeline compilation.
The value that the application provides is the maximum value of the sum of
all shaders in a call chain across all possible call chains, taking into
account any application specific knowledge about the properties of the call
chains.

|  | For example, if an application has two types of closest hit and miss shaders
| --- | --- |
that it can use but the first level of rays will only use the first kind
(possibly reflection) and the second level will only use the second kind
(occlusion or shadow ray, for example) then the application can compute the
stack size by something similar to:

`rayGenStack` +  max(`closestHit1Stack`,
`miss1Stack`) +  max(`closestHit2Stack`,
`miss2Stack`)

This is guaranteed to be no larger than the default stack size computation
which assumes that both call levels may be the larger of the two. |

In a similar way to
[bufferDeviceAddressCaptureReplay](features.html#features-bufferDeviceAddressCaptureReplay),
the [`rayTracingPipelineShaderGroupHandleCaptureReplay`](features.html#features-rayTracingPipelineShaderGroupHandleCaptureReplay) feature allows the
querying of opaque data which **can** be used in a future replay.

During the capture phase, capture/replay tools are expected to query opaque
data for shader group handle replay using
[vkGetRayTracingCaptureReplayShaderGroupHandlesKHR](pipelines.html#vkGetRayTracingCaptureReplayShaderGroupHandlesKHR).

Providing the opaque data during replay, using
[VkRayTracingShaderGroupCreateInfoKHR](pipelines.html#VkRayTracingShaderGroupCreateInfoKHR)::`pShaderGroupCaptureReplayHandle`
at pipeline creation time, causes the implementation to generate identical
shader group handles to those in the capture phase, allowing capture/replay
tools to reuse previously recorded shader binding table buffer contents or
to obtain the same handles by calling
[vkGetRayTracingCaptureReplayShaderGroupHandlesKHR](pipelines.html#vkGetRayTracingCaptureReplayShaderGroupHandlesKHR) again.

Ray tracing validation **can** help root cause application issues and improve
performance.
Unlike existing validation layers, ray tracing validation performs checks at
an implementation level, which helps identify potential problems that **may**
not be caught by the layer.

By enabling the [ray tracing validation](features.html#features-rayTracingValidation)
feature, warnings and errors **can** be delivered straight from a ray tracing
implementation to the application through a [messenger callback](debugging.html#debugging-debug-messengers) registered with the implementation, where they **can** be
processed through existing application-side debugging or logging systems.
