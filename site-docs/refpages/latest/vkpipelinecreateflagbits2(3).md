# VkPipelineCreateFlagBits2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCreateFlagBits2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCreateFlagBits2 - Bitmask controlling how a pipeline is created

Bits which **can** be set in
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)::`flags`, specifying how a
pipeline is created, are:

// Provided by VK_VERSION_1_4
// Flag bits for VkPipelineCreateFlagBits2
typedef VkFlags64 VkPipelineCreateFlagBits2;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DISABLE_OPTIMIZATION_BIT = 0x00000001ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_ALLOW_DERIVATIVES_BIT = 0x00000002ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DERIVATIVE_BIT = 0x00000004ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_VIEW_INDEX_FROM_DEVICE_INDEX_BIT = 0x00000008ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DISPATCH_BASE_BIT = 0x00000010ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT = 0x00000100ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT = 0x00000200ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT = 0x08000000ULL;
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT = 0x40000000ULL;
// Provided by VK_AMDX_shader_enqueue with VK_KHR_maintenance5 or VK_VERSION_1_4
#ifdef VK_ENABLE_BETA_EXTENSIONS
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX = 0x100000000ULL;
#endif
// Provided by VK_EXT_descriptor_heap
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT = 0x1000000000ULL;
// Provided by VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_BUILT_IN_PRIMITIVES_BIT_KHR = 0x00001000ULL;
// Provided by VK_NV_ray_tracing_linear_swept_spheres
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_SPHERES_AND_LINEAR_SWEPT_SPHERES_BIT_NV = 0x200000000ULL;
// Provided by VK_EXT_legacy_dithering with (VK_KHR_dynamic_rendering or VK_VERSION_1_3) and (VK_KHR_maintenance5 or VK_VERSION_1_4)
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT = 0x400000000ULL;
// Provided by VK_KHR_maintenance5
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DISABLE_OPTIMIZATION_BIT_KHR = 0x00000001ULL;
// Provided by VK_KHR_maintenance5
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_ALLOW_DERIVATIVES_BIT_KHR = 0x00000002ULL;
// Provided by VK_KHR_maintenance5
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DERIVATIVE_BIT_KHR = 0x00000004ULL;
// Provided by VK_KHR_maintenance5
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_VIEW_INDEX_FROM_DEVICE_INDEX_BIT_KHR = 0x00000008ULL;
// Provided by VK_KHR_maintenance5
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DISPATCH_BASE_BIT_KHR = 0x00000010ULL;
// Provided by VK_KHR_maintenance5 with VK_NV_ray_tracing
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DEFER_COMPILE_BIT_NV = 0x00000020ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_pipeline_executable_properties
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_CAPTURE_STATISTICS_BIT_KHR = 0x00000040ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_pipeline_executable_properties
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_maintenance5 with VK_VERSION_1_3 or VK_EXT_pipeline_creation_cache_control
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_maintenance5 with VK_VERSION_1_3 or VK_EXT_pipeline_creation_cache_control
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT_KHR = 0x00000200ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_graphics_pipeline_library
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT = 0x00000400ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_graphics_pipeline_library
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT = 0x00800000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_pipeline_library
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR = 0x00000800ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_AABBS_BIT_KHR = 0x00002000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR = 0x00010000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR = 0x00020000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR = 0x00080000ULL;
// Provided by VK_KHR_maintenance5 with VK_NV_device_generated_commands
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_NV = 0x00040000ULL;
// Provided by VK_KHR_maintenance5 with VK_NV_ray_tracing_motion_blur
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_MOTION_BIT_NV = 0x00100000ULL;
// Provided by VK_KHR_maintenance5 with (VK_KHR_dynamic_rendering or VK_VERSION_1_3) and VK_KHR_fragment_shading_rate
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x00200000ULL;
// Provided by VK_KHR_maintenance5 with (VK_KHR_dynamic_rendering or VK_VERSION_1_3) and VK_EXT_fragment_density_map
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT = 0x00400000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_opacity_micromap
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT = 0x01000000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_attachment_feedback_loop_layout
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT = 0x02000000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_attachment_feedback_loop_layout
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT = 0x04000000ULL;
// Provided by VK_KHR_maintenance5 with VK_VERSION_1_4 or VK_EXT_pipeline_protected_access
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT = 0x08000000ULL;
// Provided by VK_KHR_maintenance5 with VK_VERSION_1_4 or VK_EXT_pipeline_protected_access
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT = 0x40000000ULL;
// Provided by VK_KHR_maintenance5 with VK_NV_displacement_micromap
#ifdef VK_ENABLE_BETA_EXTENSIONS
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV = 0x10000000ULL;
#endif
// Provided by VK_KHR_maintenance5 with VK_EXT_descriptor_buffer
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT = 0x20000000ULL;
// Provided by VK_KHR_maintenance5 with VK_ARM_pipeline_opacity_micromap, VK_ARM_pipeline_opacity_micromap
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM = 0x2000000000ULL;
// Provided by VK_KHR_maintenance5 with VK_ARM_shader_instrumentation, VK_ARM_shader_instrumentation
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_INSTRUMENT_SHADERS_BIT_ARM = 0x8000000000ULL;
// Provided by VK_KHR_pipeline_binary
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR = 0x80000000ULL;
// Provided by VK_EXT_device_generated_commands
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT = 0x4000000000ULL;
// Provided by VK_VALVE_fragment_density_map_layered
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE = 0x10000000000ULL;
// Provided by VK_EXT_shader_64bit_indexing
static const VkPipelineCreateFlagBits2 VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT = 0x80000000000ULL;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPipelineCreateFlagBits2
typedef VkPipelineCreateFlagBits2 VkPipelineCreateFlagBits2KHR;

* 
[VK_PIPELINE_CREATE_2_DISABLE_OPTIMIZATION_BIT](#) specifies that the
created pipeline will not be optimized.
Using this flag **may** reduce the time taken to create the pipeline.

* 
[VK_PIPELINE_CREATE_2_ALLOW_DERIVATIVES_BIT](#) specifies that the
pipeline to be created is allowed to be the parent of a pipeline that
will be created in a subsequent pipeline creation call.

* 
[VK_PIPELINE_CREATE_2_DERIVATIVE_BIT](#) specifies that the pipeline to
be created will be a child of a previously created parent pipeline.

* 
[VK_PIPELINE_CREATE_2_VIEW_INDEX_FROM_DEVICE_INDEX_BIT](#) specifies
that any shader input variables decorated as `ViewIndex` will be
assigned values as if they were decorated as `DeviceIndex`.

* 
[VK_PIPELINE_CREATE_2_DISPATCH_BASE_BIT](#) specifies that a compute
pipeline **can** be used with [vkCmdDispatchBase](vkCmdDispatchBase.html) with a non-zero base
workgroup.

* 
[VK_PIPELINE_CREATE_2_DEFER_COMPILE_BIT_NV](#) specifies that a
pipeline is created with all shaders in the deferred state.
Before using the pipeline the application **must** call
[vkCompileDeferredNV](vkCompileDeferredNV.html) exactly once on each shader in the pipeline
before using the pipeline.

* 
[VK_PIPELINE_CREATE_2_CAPTURE_STATISTICS_BIT_KHR](#) specifies that the
shader compiler should capture statistics for the pipeline executables
produced by the compile process which **can** later be retrieved by calling
[vkGetPipelineExecutableStatisticsKHR](vkGetPipelineExecutableStatisticsKHR.html).
Enabling this flag **must** not affect the final compiled pipeline but **may**
disable pipeline caching or otherwise affect pipeline creation time.

* 
[VK_PIPELINE_CREATE_2_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#)
specifies that the shader compiler should capture the internal
representations of pipeline executables produced by the compile process
which **can** later be retrieved by calling
[vkGetPipelineExecutableInternalRepresentationsKHR](vkGetPipelineExecutableInternalRepresentationsKHR.html).
Enabling this flag **must** not affect the final compiled pipeline but **may**
disable pipeline caching or otherwise affect pipeline creation time.
When capturing IR from pipelines created with pipeline libraries, there
is no guarantee that IR from libraries **can** be retrieved from the linked
pipeline.
Applications **should** retrieve IR from each library, and any linked
pipelines, separately.

* 
[VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR](#) specifies that the pipeline
    **cannot** be used directly, and instead defines a *pipeline library* that
    **can** be combined with other pipelines using the
    [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) structure.
    This is available in
ray tracing
and
graphics
    pipelines.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#)
specifies that an any-hit shader will always be present when an any-hit
shader would be executed.
A NULL any-hit shader is an any-hit shader which is effectively
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#)
specifies that a closest hit shader will always be present when a
closest hit shader would be executed.
A NULL closest hit shader is a closest hit shader which is effectively
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#)
specifies that a miss shader will always be present when a miss shader
would be executed.
A NULL miss shader is a miss shader which is effectively
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#)
specifies that an intersection shader will always be present when an
intersection shader would be executed.
A NULL intersection shader is an intersection shader which is
effectively [VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group
consisting entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#) specifies
that all built-in primitives
including triangles, spheres, and LSS primitives
will be skipped during traversal using [    pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_BUILT_IN_PRIMITIVES_BIT_KHR](#)
is an alias for
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#).

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_AABBS_BIT_KHR](#) specifies that
AABB primitives will be skipped during traversal using
[pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#)
specifies that the shader group handles **can** be saved and reused on a
subsequent run (e.g. for trace capture and replay).

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_SPHERES_AND_LINEAR_SWEPT_SPHERES_BIT_NV](#)
specifies that the pipeline is allowed to use spheres or linear swept
spheres as a geometry type in the acceleration structures.
Using this flag **may** affect performance.

* 
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_NV](#) specifies that the
pipeline can be used in combination with [Device-Generated Commands](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](#) specifies that the
pipeline **can** be used in a `VkIndirectExecutionSetEXT`.

* 
[VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#)
specifies that pipeline creation will fail if a compile is required for
creation of a valid [VkPipeline](VkPipeline.html) object;
[VK_PIPELINE_COMPILE_REQUIRED](VkResult.html) will be returned by pipeline
creation, and the [VkPipeline](VkPipeline.html) will be [VK_NULL_HANDLE](VK_NULL_HANDLE.html).

* 
When creating multiple pipelines,
[VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT](#) specifies that
control will be returned to the application if any individual pipeline
returns a result which is not [VK_SUCCESS](VkResult.html) rather than continuing to
create additional pipelines.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_MOTION_BIT_NV](#) specifies
that the pipeline is allowed to use `OpTraceRayMotionNV`.

* 
[VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#)
specifies that the pipeline will be used with a fragment shading rate
attachment.

* 
[VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#)
specifies that the pipeline will be used with a fragment density map
attachment.

* 
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#)
specifies that the pipeline **can** be used with layered fragment density
maps.

* 
[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#) specifies that
pipeline libraries being linked into this library **should** have link time
optimizations applied.
If this bit is omitted, implementations **should** instead perform linking
as rapidly as possible.

* 
[VK_PIPELINE_CREATE_2_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#)
specifies that pipeline libraries should retain any information
necessary to later perform an optimal link with
[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#).

* 
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](#) specifies that a
pipeline will be used with [descriptor buffers](../../../../spec/latest/chapters/descriptorbuffers.html#descriptorbuffers),
rather than [descriptor sets](../../../../spec/latest/chapters/descriptors.html#descriptors).

* 
[VK_PIPELINE_CREATE_2_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#)
specifies that the pipeline **may** be used with an attachment
[feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) including color attachments.

* 
[VK_PIPELINE_CREATE_2_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#)
specifies that the pipeline **may** be used with an attachment
[feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) including depth-stencil
attachments.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#)
specifies that the ray tracing pipeline **can** be used with acceleration
structures which reference an opacity micromap array.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#)
specifies that the ray tracing pipeline **can** be used with acceleration
structures which reference a displacement micromap array.

* 
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT](#) specifies that the
pipeline **must** not be bound to a protected command buffer.

* 
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT](#) specifies that the
pipeline **must** not be bound to an unprotected command buffer.

* 
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#) specifies that
`VkPipelineBinaryKHR` objects **can** be created from the pipeline.
If [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#) is used,
implementations **should** not store pipeline data to an internal cache, if
such a cache exists as stated by
[`pipelineBinaryInternalCache`](../../../../spec/latest/chapters/limits.html#limits-pipelineBinaryInternalCache).
If
[`pipelineBinaryPrefersInternalCache`](../../../../spec/latest/chapters/limits.html#limits-pipelineBinaryPrefersInternalCache)
is [VK_TRUE](VK_TRUE.html), applications **should** not use
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#).

* 
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](#) specifies
that the pipeline will be used in a render pass that is begun with
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](VkRenderingFlagBits.html).

* 
[VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](#) specifies that the
pipeline will be used in an [execution graph](../../../../spec/latest/chapters/executiongraphs.html#executiongraphs)

* 
[VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM](#) specifies
that the pipeline **must** not be used with acceleration structures which
reference an opacity micromap array.

* 
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](#) specifies that the
pipeline enables [64-bit indexing](../../../../spec/latest/appendices/spirvenv.html#spirvenv-64bindexing).

* 
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#) specifies that the
pipeline will use descriptor heap mappings instead of descriptor set
layouts.

* 
[VK_PIPELINE_CREATE_2_INSTRUMENT_SHADERS_BIT_ARM](#) specifies that the
shaders in the pipeline will be instrumented.

It is valid to set both [VK_PIPELINE_CREATE_2_ALLOW_DERIVATIVES_BIT](#) and
[VK_PIPELINE_CREATE_2_DERIVATIVE_BIT](#).
This allows a pipeline to be both a parent and possibly a child in a
pipeline hierarchy.
See [Pipeline Derivatives](../../../../spec/latest/chapters/pipelines.html#pipelines-pipeline-derivatives) for more
information.

When an implementation is looking up a pipeline in a [pipeline cache](../../../../spec/latest/chapters/pipelines.html#pipelines-cache), if that pipeline is being created using linked libraries,
implementations **should** always return an equivalent pipeline created with
[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#) if available,
whether or not that bit was specified.

|  | Using [VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#) (or not)
| --- | --- |
when linking pipeline libraries is intended as a performance tradeoff
between host and device.
If the bit is omitted, linking should be faster and produce a pipeline more
rapidly, but performance of the pipeline on the target device may be
reduced.
If the bit is included, linking may be slower but should produce a pipeline
with device performance comparable to a monolithically created pipeline.
Using both options can allow latency-sensitive applications to generate a
suboptimal but usable pipeline quickly, and then perform an optimal link in
the background, substituting the result for the suboptimally linked pipeline
as soon as it is available. |

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineCreateFlags2](VkPipelineCreateFlags2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreateFlagBits2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
