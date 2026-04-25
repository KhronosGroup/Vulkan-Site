# VkPipelineCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCreateFlagBits - Bitmask controlling how a pipeline is created

Bits which **can** be set in

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`flags`

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)::`flags`

* 
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)::`flags`

* 
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`flags`

specify how a pipeline is created, and are:

|  | This functionality is superseded by [VkPipelineCreateFlagBits2](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreateFlagBits2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-flagbits) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkPipelineCreateFlagBits {
    VK_PIPELINE_CREATE_DISABLE_OPTIMIZATION_BIT = 0x00000001,
    VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT = 0x00000002,
    VK_PIPELINE_CREATE_DERIVATIVE_BIT = 0x00000004,
  // Provided by VK_VERSION_1_1
    VK_PIPELINE_CREATE_DISPATCH_BASE_BIT = 0x00000010,
  // Provided by VK_VERSION_1_1
    VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT = 0x00000008,
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT = 0x00000100,
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT = 0x00000200,
  // Provided by VK_VERSION_1_4
    VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT = 0x08000000,
  // Provided by VK_VERSION_1_4
    VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT = 0x40000000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR = 0x00004000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR = 0x00008000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR = 0x00010000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR = 0x00020000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR = 0x00001000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR = 0x00002000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR = 0x00080000,
  // Provided by VK_NV_ray_tracing
    VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV = 0x00000020,
  // Provided by VK_EXT_fragment_density_map with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT = 0x00400000,
  // Provided by VK_KHR_fragment_shading_rate with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x00200000,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_PIPELINE_CREATE_CAPTURE_STATISTICS_BIT_KHR = 0x00000040,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR = 0x00000080,
  // Provided by VK_NV_device_generated_commands
    VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV = 0x00040000,
  // Provided by VK_KHR_pipeline_library
    VK_PIPELINE_CREATE_LIBRARY_BIT_KHR = 0x00000800,
  // Provided by VK_EXT_descriptor_buffer
    VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT = 0x20000000,
  // Provided by VK_EXT_graphics_pipeline_library
    VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT = 0x00800000,
  // Provided by VK_EXT_graphics_pipeline_library
    VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT = 0x00000400,
  // Provided by VK_NV_ray_tracing_motion_blur
    VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV = 0x00100000,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT = 0x02000000,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT = 0x04000000,
  // Provided by VK_EXT_opacity_micromap
    VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT = 0x01000000,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV = 0x10000000,
#endif
  // Provided by VK_VERSION_1_1
  // VK_PIPELINE_CREATE_DISPATCH_BASE is a legacy alias
    VK_PIPELINE_CREATE_DISPATCH_BASE = VK_PIPELINE_CREATE_DISPATCH_BASE_BIT,
  // Provided by VK_KHR_device_group
    VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT_KHR = VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT,
  // Provided by VK_KHR_device_group
    VK_PIPELINE_CREATE_DISPATCH_BASE_BIT_KHR = VK_PIPELINE_CREATE_DISPATCH_BASE_BIT,
  // Provided by VK_KHR_device_group
  // VK_PIPELINE_CREATE_DISPATCH_BASE_KHR is a legacy alias
    VK_PIPELINE_CREATE_DISPATCH_BASE_KHR = VK_PIPELINE_CREATE_DISPATCH_BASE_BIT,
  // Provided by VK_EXT_fragment_density_map with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
  // VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT is a legacy alias
    VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT = VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT,
  // Provided by VK_KHR_fragment_shading_rate with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
  // VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR is a legacy alias
    VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT = VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT_EXT = VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT,
  // Provided by VK_EXT_pipeline_protected_access
    VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT_EXT = VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT,
  // Provided by VK_EXT_pipeline_protected_access
    VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT_EXT = VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT,
} VkPipelineCreateFlagBits;

* 
[VK_PIPELINE_CREATE_DISABLE_OPTIMIZATION_BIT](#) specifies that the
created pipeline will not be optimized.
Using this flag **may** reduce the time taken to create the pipeline.

* 
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#) specifies that the
pipeline to be created is allowed to be the parent of a pipeline that
will be created in a subsequent pipeline creation call.

* 
[VK_PIPELINE_CREATE_DERIVATIVE_BIT](#) specifies that the pipeline to
be created will be a child of a previously created parent pipeline.

* 
[VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT](#) specifies that
any shader input variables decorated as `ViewIndex` will be assigned
values as if they were decorated as `DeviceIndex`.

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](#) specifies that a compute
pipeline **can** be used with [vkCmdDispatchBase](vkCmdDispatchBase.html) with a non-zero base
workgroup.

* 
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](#) specifies that a pipeline
is created with all shaders in the deferred state.
Before using the pipeline the application **must** call
[vkCompileDeferredNV](vkCompileDeferredNV.html) exactly once on each shader in the pipeline
before using the pipeline.

* 
[VK_PIPELINE_CREATE_CAPTURE_STATISTICS_BIT_KHR](#) specifies that the
shader compiler should capture statistics for the pipeline executables
produced by the compile process which **can** later be retrieved by calling
[vkGetPipelineExecutableStatisticsKHR](vkGetPipelineExecutableStatisticsKHR.html).
Enabling this flag **must** not affect the final compiled pipeline but **may**
disable pipeline caching or otherwise affect pipeline creation time.

* 
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#)
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
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#) specifies that the pipeline
    **cannot** be used directly, and instead defines a *pipeline library* that
    **can** be combined with other pipelines using the
    [VkPipelineLibraryCreateInfoKHR](VkPipelineLibraryCreateInfoKHR.html) structure.
    This is available in
ray tracing
and
graphics
    pipelines.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#)
specifies that an any-hit shader will always be present when an any-hit
shader would be executed.
A NULL any-hit shader is an any-hit shader which is effectively
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#)
specifies that a closest hit shader will always be present when a
closest hit shader would be executed.
A NULL closest hit shader is a closest hit shader which is effectively
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#)
specifies that a miss shader will always be present when a miss shader
would be executed.
A NULL miss shader is a miss shader which is effectively
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#)
specifies that an intersection shader will always be present when an
intersection shader would be executed.
A NULL intersection shader is an intersection shader which is
effectively [VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html), such as from a shader group
consisting entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#) specifies
that
sphere, LSS and
triangle primitives will be skipped during traversal using
[pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#) specifies that
AABB primitives will be skipped during traversal using
[pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#)
specifies that the shader group handles **can** be saved and reused on a
subsequent run (e.g. for trace capture and replay).

* 
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#) specifies that the
pipeline **can** be used in combination with [Device-Generated Commands](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#) specifies
that pipeline creation will fail if a compile is required for creation
of a valid [VkPipeline](VkPipeline.html) object; [VK_PIPELINE_COMPILE_REQUIRED](VkResult.html)
will be returned by pipeline creation, and the [VkPipeline](VkPipeline.html) will be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).

* 
When creating multiple pipelines,
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#) specifies that
control will be returned to the application if any individual pipeline
returns a result which is not [VK_SUCCESS](VkResult.html) rather than continuing to
create additional pipelines.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](#) specifies that
the pipeline is allowed to use `OpTraceRayMotionNV`.

* 
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#)
specifies that the pipeline will be used with a fragment shading rate
attachment and dynamic rendering.

* 
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#)
specifies that the pipeline will be used with a fragment density map
attachment and dynamic rendering.

* 
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#) specifies that
pipeline libraries being linked into this library **should** have link time
optimizations applied.
If this bit is omitted, implementations **should** instead perform linking
as rapidly as possible.

* 
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#)
specifies that pipeline libraries should retain any information
necessary to later perform an optimal link with
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#).

* 
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#) specifies that a
pipeline will be used with [descriptor buffers](../../../../spec/latest/chapters/descriptorsets.html#descriptorbuffers),
rather than [descriptor sets](../../../../spec/latest/chapters/descriptorsets.html#descriptors).

* 
[VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#)
specifies that the pipeline **may** be used with an attachment
[feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) including color attachments.
It is ignored if
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](VkDynamicState.html) is set in
`pDynamicStates`.

* 
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#)
specifies that the pipeline **may** be used with an attachment
[feedback loop](../../../../spec/latest/chapters/renderpass.html#renderpass-feedbackloop) including depth-stencil
attachments.
It is ignored if
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](VkDynamicState.html) is set in
`pDynamicStates`.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#) specifies
that the ray tracing pipeline **can** be used with acceleration structures
which reference an opacity micromap array.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#)
specifies that the ray tracing pipeline **can** be used with acceleration
structures which reference a displacement micromap array.

* 
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#) specifies that the
pipeline **must** not be bound to a protected command buffer.

* 
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#) specifies that the
pipeline **must** not be bound to an unprotected command buffer.

It is valid to set both [VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#) and
[VK_PIPELINE_CREATE_DERIVATIVE_BIT](#).
This allows a pipeline to be both a parent and possibly a child in a
pipeline hierarchy.
See [Pipeline Derivatives](../../../../spec/latest/chapters/pipelines.html#pipelines-pipeline-derivatives) for more
information.

When an implementation is looking up a pipeline in a [pipeline cache](../../../../spec/latest/chapters/pipelines.html#pipelines-cache), if that pipeline is being created using linked libraries,
implementations **should** always return an equivalent pipeline created with
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#) if available,
whether or not that bit was specified.

|  | Using [VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#) (or not) when
| --- | --- |
linking pipeline libraries is intended as a performance tradeoff between
host and device.
If the bit is omitted, linking should be faster and produce a pipeline more
rapidly, but performance of the pipeline on the target device may be
reduced.
If the bit is included, linking may be slower but should produce a pipeline
with device performance comparable to a monolithically created pipeline.
Using both options can allow latency-sensitive applications to generate a
suboptimal but usable pipeline quickly, and then perform an optimal link in
the background, substituting the result for the suboptimally linked pipeline
as soon as it is available. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineCreateFlags](VkPipelineCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
