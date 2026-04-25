# Pipelines

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/pipelines.html

## Table of Contents

- [Multiple Pipeline Creation](#pipelines-multiple)
- [Multiple_Pipeline_Creation](#pipelines-multiple)
- [Pipeline Creation Flags](#pipelines-creation-flags)
- [Pipeline_Creation_Flags](#pipelines-creation-flags)
- [Compute Pipelines](#pipelines-compute)
- [Graphics Pipelines](#pipelines-graphics)
- [Valid Combinations of Stages for Graphics Pipelines](#_valid_combinations_of_stages_for_graphics_pipelines)
- [Valid_Combinations_of_Stages_for_Graphics_Pipelines](#_valid_combinations_of_stages_for_graphics_pipelines)
- [Graphics Pipeline Shader Groups](#graphics-shadergroups)
- [Graphics_Pipeline_Shader_Groups](#graphics-shadergroups)
- [Ray Tracing Pipelines](#pipelines-ray-tracing)
- [Ray_Tracing_Pipelines](#pipelines-ray-tracing)
- [Ray Tracing Pipeline Enums and Types](#_ray_tracing_pipeline_enums_and_types)
- [Ray_Tracing_Pipeline_Enums_and_Types](#_ray_tracing_pipeline_enums_and_types)
- [Ray Tracing Pipeline Creation](#_ray_tracing_pipeline_creation)
- [Ray_Tracing_Pipeline_Creation](#_ray_tracing_pipeline_creation)
- [Ray Tracing Pipeline Queries and Commands](#_ray_tracing_pipeline_queries_and_commands)
- [Ray_Tracing_Pipeline_Queries_and_Commands](#_ray_tracing_pipeline_queries_and_commands)
- [Pipeline Destruction](#pipelines-destruction)
- [Pipeline Derivatives](#pipelines-pipeline-derivatives)
- [Pipeline Cache](#pipelines-cache)
- [Creating a Pipeline Cache](#pipelines-cache-create)
- [Creating_a_Pipeline_Cache](#pipelines-cache-create)
- [Merging Pipeline Caches](#pipelines-cache-merge)
- [Merging_Pipeline_Caches](#pipelines-cache-merge)
- [Retrieving Pipeline Cache Data](#pipelines-cache-retrieval)
- [Retrieving_Pipeline_Cache_Data](#pipelines-cache-retrieval)
- [Pipeline Cache Header](#pipelines-cache-header)
- [Pipeline_Cache_Header](#pipelines-cache-header)
- [Destroying a Pipeline Cache](#pipelines-cache-destroy)
- [Destroying_a_Pipeline_Cache](#pipelines-cache-destroy)
- [Pipeline Binaries](#pipelines-binaries)
- [Generating the Pipeline Key](#pipelines-binaries-generatekeys)
- [Generating_the_Pipeline_Key](#pipelines-binaries-generatekeys)
- [Creating Pipeline Binaries](#pipelines-binaries-create)
- [Creating_Pipeline_Binaries](#pipelines-binaries-create)
- [Retrieving Pipeline Binary Data](#pipelines-binaries-retrieval)
- [Retrieving_Pipeline_Binary_Data](#pipelines-binaries-retrieval)
- [Releasing Captured Pipeline Binary Data](#pipelines-binaries-release-captured)
- [Releasing_Captured_Pipeline_Binary_Data](#pipelines-binaries-release-captured)
- [Destroying Pipeline Binaries](#pipelines-binaries-destroy)
- [Destroying_Pipeline_Binaries](#pipelines-binaries-destroy)
- [Specialization Constants](#pipelines-specialization-constants)
- [Pipeline Libraries](#pipelines-library)
- [Pipeline Binding](#pipelines-binding)
- [Interaction With Shader Objects](#pipelines-shader-object-interaction)
- [Interaction_With_Shader_Objects](#pipelines-shader-object-interaction)
- [Dynamic State](#pipelines-dynamic-state)
- [Pipeline Properties and Shader Information](#pipelines-shader-information)
- [Pipeline_Properties_and_Shader_Information](#pipelines-shader-information)
- [Pipeline Compiler Control](#pipelines-compiler-control)
- [Pipeline_Compiler_Control](#pipelines-compiler-control)
- [Pipeline Creation Feedback](#pipelines-creation-feedback)
- [Pipeline_Creation_Feedback](#pipelines-creation-feedback)

## Content

The following [figure](#pipelines-block-diagram) shows a block diagram of
the Vulkan pipelines.
Some Vulkan commands specify geometric objects to be drawn or computational
work to be performed, while others specify state controlling how objects are
handled by the various pipeline stages, or control data transfer between
memory organized as images and buffers.
Commands are effectively sent through a processing pipeline, such as
a *graphics pipeline*,
a *ray tracing pipeline*,
or
a *compute pipeline*.

The graphics pipeline can be operated in two modes, as either *primitive
shading* or *mesh shading* pipeline.

**Primitive Shading**

The first stage of the [graphics pipeline](#pipelines-graphics)
([Input Assembler](drawing.html#drawing)) assembles vertices to form geometric
primitives such as points, lines, and triangles, based on a requested
primitive topology.
In the next stage ([Vertex Shader](shaders.html#shaders-vertex)) vertices **can** be
transformed, computing positions and attributes for each vertex.
If [tessellation](tessellation.html#tessellation) and/or [geometry](geometry.html#geometry) shaders are
supported, they **can** then generate multiple primitives from a single input
primitive, possibly changing the primitive topology or generating additional
attribute data in the process.

**Cluster Culling Shading**

When using the Cluster Culling Shader, a compute-like shader will perform
cluster-based culling, a set of new built-in output variables are used to
express visible cluster, in addition, a new built-in function is used to
emit these variables from the cluster culling shader to the Input Assembler
(IA) stage, then IA can use these variables to fetch vertices of visible
cluster and drive vertex shader to work.

**Mesh Shading**

When using the [*mesh shading*](VK_NV_mesh_shader/mesh.html#mesh) pipeline input primitives are not
assembled implicitly, but explicitly through the ([Mesh Shader](shaders.html#shaders-mesh)).
The work on the mesh pipeline is initiated by the application
[drawing](drawing.html#drawing-mesh-shading) a set of mesh tasks.

If an optional ([Task Shader](shaders.html#shaders-task)) is active, each task triggers
the execution of a task shader workgroup that will generate a new set of
tasks upon completion.
Each of these spawned tasks, or each of the original dispatched tasks if no
task shader is present, triggers the execution of a mesh shader workgroup
that produces an output mesh with a variable-sized number of primitives
assembled from vertices stored in the output mesh.

**Common**

The final resulting primitives are [clipped](vertexpostproc.html#vertexpostproc-clipping) to a
clip volume in preparation for the next stage, [Rasterization](primsrast.html#primsrast).
The rasterizer produces a series of *fragments* associated with a region of
the framebuffer, from a two-dimensional description of a point, line
segment, or triangle.
These fragments are processed by [fragment operations](fragops.html#fragops) to
determine whether generated values will be written to the framebuffer.
[Fragment shading](fragops.html#fragops-shader) determines the values to be written to
the framebuffer attachments.
Framebuffer operations then read and write the color and depth/stencil
attachments of the framebuffer for a given subpass of a [render pass instance](renderpass.html#renderpass).
The attachments **can** be used as input attachments in the fragment shader in
a later subpass of the same render pass.

The [compute pipeline](#pipelines-compute)
is a separate pipeline from the graphics pipeline, which
operates on one-, two-, or three-dimensional workgroups which **can** read from
and write to buffer and image memory.

This ordering is meant only as a tool for describing Vulkan, not as a strict
rule of how Vulkan is implemented, and we present it only as a means to
organize the various operations of the pipelines.
Actual ordering guarantees between pipeline stages are explained in detail
in the [synchronization chapter](synchronization.html#synchronization-pipeline-stages-order).

![pipelinemesh](../_images/pipelinemesh.svg)

Figure 1. Block diagram of the Vulkan pipeline

Each pipeline is controlled by a monolithic object created from a
description of all of the shader stages and any relevant fixed-function
stages.
[Linking](interfaces.html#interfaces) the whole pipeline together allows the optimization
of shaders based on their input/outputs and eliminates expensive draw time
state validation.

A pipeline object is bound to the current state using
[vkCmdBindPipeline](#vkCmdBindPipeline).
Any pipeline object state that is specified as [dynamic](#pipelines-dynamic-state) is not applied to the current state when the pipeline object is
bound, but is instead set by dynamic state setting commands.

If the [`commandBufferInheritance`](features.html#features-commandBufferInheritance)
feature is not enabled, then no
state, including dynamic state, is inherited from one command buffer to
another.

If the [`commandBufferInheritance`](features.html#features-commandBufferInheritance)
feature is enabled, then all graphics and compute state that is valid at the
end of the command buffer executed in a queue is inherited and valid at
beginning of the command buffer next executed in the same queue.
This applies to both primary and secondary command buffers, where a primary
command buffer submitted to a queue will inherit state from the previously
submitted command buffer to that queue, secondary command buffers will
inherit state from the primary or seconard command buffer they are executed
in, and after a seconard command buffer is executed, its state inherited by
the primary or secondary command buffer that executed it.
Command buffers executed in one queue do not inherit state from any command
buffers executed in another queue.

Compute,
ray tracing,
and
graphics
pipelines are each represented by `VkPipeline` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipeline)

Multiple pipelines **can** be created in a single call by commands such as:

* 
[vkCreateExecutionGraphPipelinesAMDX](executiongraphs.html#vkCreateExecutionGraphPipelinesAMDX),

* 
[vkCreateRayTracingPipelinesKHR](#vkCreateRayTracingPipelinesKHR),

* 
[vkCreateRayTracingPipelinesNV](#vkCreateRayTracingPipelinesNV),

* 
[vkCreateDataGraphPipelinesARM](VK_ARM_data_graph/graphs.html#vkCreateDataGraphPipelinesARM),

* 
[vkCreateGraphicsPipelines](#vkCreateGraphicsPipelines),

* 
[vkCreateComputePipelines](#vkCreateComputePipelines).

The creation commands are passed an array `pCreateInfos` of
`Vk*PipelineCreateInfo` structures specifying parameters of each
pipeline to be created, and return a corresponding array of handles in
`pPipelines`.
Each element index *i* of `pPipelines` is created based on the
corresponding element *i* of `pCreateInfos`.

Applications **can** group together similar pipelines to be created in a single
call, and implementations are encouraged to look for reuse opportunities
when creating a group.

When attempting to create many pipelines in a single command, it is possible
that creation **may** fail for a subset of them.
In this case, the corresponding elements of `pPipelines` will be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).
If creation fails for a pipeline despite valid arguments (for example, due
to out of memory errors), the [VkResult](fundamentals.html#VkResult) code returned by the pipeline
creation command will indicate why.
The implementation will attempt to create all pipelines, and only return
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) values for those that actually failed.

If creation fails for a pipeline that has the
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits) set in its
`Vk*PipelineCreateInfo`, pipelines at an index in the `pPipelines`
array greater than or equal to that of the failing pipeline will be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

If creation fails for multiple pipelines, the returned [VkResult](fundamentals.html#VkResult) **must**
be the return value of any one of the pipelines which did not succeed.
An application **can** reliably clean up from a failed call by iterating over
the `pPipelines` array and destroying every element that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

If the entire command fails and no pipelines are created, all elements of
`pPipelines` will be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

When creating a pipeline, the application **can** specify a set of flags that
control how the pipeline is created and certain aspects of its behavior and
capabilities.
These flags are specified
by chaining the [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo) structure to the
pipeline creation structure with a bitmask of
[VkPipelineCreateFlagBits2](#VkPipelineCreateFlagBits2), or
by setting the `flags` member of the pipeline creation structure to a
bitmask of [VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits).

The `VkPipelineCreateFlags2CreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineCreateFlags2CreateInfo {
    VkStructureType           sType;
    const void*               pNext;
    VkPipelineCreateFlags2    flags;
} VkPipelineCreateFlags2CreateInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPipelineCreateFlags2CreateInfo
typedef VkPipelineCreateFlags2CreateInfo VkPipelineCreateFlags2CreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits2](#VkPipelineCreateFlagBits2) specifying
how a pipeline will be generated.

If this structure is included in the `pNext` chain of a pipeline
creation structure, `flags` is used instead of the corresponding
`flags` value passed in that creation structure, allowing additional
creation flags to be specified.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCreateFlags2CreateInfo-sType-sType) VUID-VkPipelineCreateFlags2CreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineCreateFlags2CreateInfo-flags-parameter) VUID-VkPipelineCreateFlags2CreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineCreateFlagBits2](#VkPipelineCreateFlagBits2) values

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

* 
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)

* 
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)

Bits which **can** be set in
[VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)::`flags`, specifying how a
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
[VK_PIPELINE_CREATE_2_DISABLE_OPTIMIZATION_BIT](#VkPipelineCreateFlagBits2KHR) specifies that the
created pipeline will not be optimized.
Using this flag **may** reduce the time taken to create the pipeline.

* 
[VK_PIPELINE_CREATE_2_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline to be created is allowed to be the parent of a pipeline that
will be created in a subsequent pipeline creation call.

* 
[VK_PIPELINE_CREATE_2_DERIVATIVE_BIT](#VkPipelineCreateFlagBits2KHR) specifies that the pipeline to
be created will be a child of a previously created parent pipeline.

* 
[VK_PIPELINE_CREATE_2_VIEW_INDEX_FROM_DEVICE_INDEX_BIT](#VkPipelineCreateFlagBits2KHR) specifies
that any shader input variables decorated as `ViewIndex` will be
assigned values as if they were decorated as `DeviceIndex`.

* 
[VK_PIPELINE_CREATE_2_DISPATCH_BASE_BIT](#VkPipelineCreateFlagBits2KHR) specifies that a compute
pipeline **can** be used with [vkCmdDispatchBase](dispatch.html#vkCmdDispatchBase) with a non-zero base
workgroup.

* 
[VK_PIPELINE_CREATE_2_DEFER_COMPILE_BIT_NV](#VkPipelineCreateFlagBits2KHR) specifies that a
pipeline is created with all shaders in the deferred state.
Before using the pipeline the application **must** call
[vkCompileDeferredNV](#vkCompileDeferredNV) exactly once on each shader in the pipeline
before using the pipeline.

* 
[VK_PIPELINE_CREATE_2_CAPTURE_STATISTICS_BIT_KHR](#VkPipelineCreateFlagBits2KHR) specifies that the
shader compiler should capture statistics for the pipeline executables
produced by the compile process which **can** later be retrieved by calling
[vkGetPipelineExecutableStatisticsKHR](#vkGetPipelineExecutableStatisticsKHR).
Enabling this flag **must** not affect the final compiled pipeline but **may**
disable pipeline caching or otherwise affect pipeline creation time.

* 
[VK_PIPELINE_CREATE_2_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
specifies that the shader compiler should capture the internal
representations of pipeline executables produced by the compile process
which **can** later be retrieved by calling
[vkGetPipelineExecutableInternalRepresentationsKHR](#vkGetPipelineExecutableInternalRepresentationsKHR).
Enabling this flag **must** not affect the final compiled pipeline but **may**
disable pipeline caching or otherwise affect pipeline creation time.
When capturing IR from pipelines created with pipeline libraries, there
is no guarantee that IR from libraries **can** be retrieved from the linked
pipeline.
Applications **should** retrieve IR from each library, and any linked
pipelines, separately.

* 
[VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits2KHR) specifies that the pipeline
    **cannot** be used directly, and instead defines a *pipeline library* that
    **can** be combined with other pipelines using the
    [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) structure.
    This is available in
ray tracing
and
graphics
    pipelines.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
specifies that an any-hit shader will always be present when an any-hit
shader would be executed.
A NULL any-hit shader is an any-hit shader which is effectively
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
specifies that a closest hit shader will always be present when a
closest hit shader would be executed.
A NULL closest hit shader is a closest hit shader which is effectively
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
specifies that a miss shader will always be present when a miss shader
would be executed.
A NULL miss shader is a miss shader which is effectively
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
specifies that an intersection shader will always be present when an
intersection shader would be executed.
A NULL intersection shader is an intersection shader which is
effectively [VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group
consisting entirely of zeros.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits2KHR) specifies
that all built-in primitives
including triangles, spheres, and LSS primitives
will be skipped during traversal using [    pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_BUILT_IN_PRIMITIVES_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
is an alias for
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits2KHR).

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits2KHR) specifies that
AABB primitives will be skipped during traversal using
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
specifies that the shader group handles **can** be saved and reused on a
subsequent run (e.g. for trace capture and replay).

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_SPHERES_AND_LINEAR_SWEPT_SPHERES_BIT_NV](#VkPipelineCreateFlagBits2KHR)
specifies that the pipeline is allowed to use spheres or linear swept
spheres as a geometry type in the acceleration structures.
Using this flag **may** affect performance.

* 
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline can be used in combination with [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline **can** be used in a `VkIndirectExecutionSetEXT`.

* 
[VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits2KHR)
specifies that pipeline creation will fail if a compile is required for
creation of a valid [VkPipeline](#VkPipeline) object;
[VK_PIPELINE_COMPILE_REQUIRED](fundamentals.html#VkResult) will be returned by pipeline
creation, and the [VkPipeline](#VkPipeline) will be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

* 
When creating multiple pipelines,
[VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits2KHR) specifies that
control will be returned to the application if any individual pipeline
returns a result which is not [VK_SUCCESS](fundamentals.html#VkResult) rather than continuing to
create additional pipelines.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_MOTION_BIT_NV](#VkPipelineCreateFlagBits2KHR) specifies
that the pipeline is allowed to use `OpTraceRayMotionNV`.

* 
[VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
specifies that the pipeline will be used with a fragment shading rate
attachment.

* 
[VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#VkPipelineCreateFlagBits2KHR)
specifies that the pipeline will be used with a fragment density map
attachment.

* 
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkPipelineCreateFlagBits2KHR)
specifies that the pipeline **can** be used with layered fragment density
maps.

* 
[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits2KHR) specifies that
pipeline libraries being linked into this library **should** have link time
optimizations applied.
If this bit is omitted, implementations **should** instead perform linking
as rapidly as possible.

* 
[VK_PIPELINE_CREATE_2_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#VkPipelineCreateFlagBits2KHR)
specifies that pipeline libraries should retain any information
necessary to later perform an optimal link with
[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits2KHR).

* 
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](#VkPipelineCreateFlagBits2KHR) specifies that a
pipeline will be used with [descriptor buffers](descriptorsets.html#descriptorbuffers),
rather than [descriptor sets](descriptorsets.html#descriptors).

* 
[VK_PIPELINE_CREATE_2_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits2KHR)
specifies that the pipeline **may** be used with an attachment
[feedback loop](renderpass.html#renderpass-feedbackloop) including color attachments.

* 
[VK_PIPELINE_CREATE_2_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits2KHR)
specifies that the pipeline **may** be used with an attachment
[feedback loop](renderpass.html#renderpass-feedbackloop) including depth-stencil
attachments.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR)
specifies that the ray tracing pipeline **can** be used with acceleration
structures which reference an opacity micromap array.

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#VkPipelineCreateFlagBits2KHR)
specifies that the ray tracing pipeline **can** be used with acceleration
structures which reference a displacement micromap array.

* 
[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline **must** not be bound to a protected command buffer.

* 
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline **must** not be bound to an unprotected command buffer.

* 
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) specifies that
`VkPipelineBinaryKHR` objects **can** be created from the pipeline.
If [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) is used,
implementations **should** not store pipeline data to an internal cache, if
such a cache exists as stated by
[`pipelineBinaryInternalCache`](limits.html#limits-pipelineBinaryInternalCache).
If
[`pipelineBinaryPrefersInternalCache`](limits.html#limits-pipelineBinaryPrefersInternalCache)
is [VK_TRUE](fundamentals.html#VK_TRUE), applications **should** not use
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR).

* 
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](#VkPipelineCreateFlagBits2KHR) specifies
that the pipeline will be used in a render pass that is begun with
[VK_RENDERING_ENABLE_LEGACY_DITHERING_BIT_EXT](renderpass.html#VkRenderingFlagBitsKHR).

* 
[VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline will be used in an [execution graph](executiongraphs.html#executiongraphs)

* 
[VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM](#VkPipelineCreateFlagBits2KHR) specifies
that the pipeline **must** not be used with acceleration structures which
reference an opacity micromap array.

* 
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline enables [64-bit indexing](../appendices/spirvenv.html#spirvenv-64bindexing).

* 
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) specifies that the
pipeline will use descriptor heap mappings instead of descriptor set
layouts.

* 
[VK_PIPELINE_CREATE_2_INSTRUMENT_SHADERS_BIT_ARM](#VkPipelineCreateFlagBits2KHR) specifies that the
shaders in the pipeline will be instrumented.

It is valid to set both [VK_PIPELINE_CREATE_2_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits2KHR) and
[VK_PIPELINE_CREATE_2_DERIVATIVE_BIT](#VkPipelineCreateFlagBits2KHR).
This allows a pipeline to be both a parent and possibly a child in a
pipeline hierarchy.
See [Pipeline Derivatives](#pipelines-pipeline-derivatives) for more
information.

When an implementation is looking up a pipeline in a [pipeline cache](#pipelines-cache), if that pipeline is being created using linked libraries,
implementations **should** always return an equivalent pipeline created with
[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits2KHR) if available,
whether or not that bit was specified.

|  | Using [VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits2KHR) (or not)
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

// Provided by VK_VERSION_1_4
typedef VkFlags64 VkPipelineCreateFlags2;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPipelineCreateFlags2
typedef VkPipelineCreateFlags2 VkPipelineCreateFlags2KHR;

`VkPipelineCreateFlags2` is a bitmask type for setting a mask of zero or
more [VkPipelineCreateFlagBits2](#VkPipelineCreateFlagBits2).

Bits which **can** be set in

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`flags`

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)::`flags`

* 
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`flags`

* 
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`flags`

specify how a pipeline is created, and are:

|  | This functionality is superseded by [VkPipelineCreateFlagBits2](#VkPipelineCreateFlagBits2). See [Legacy Functionality](../appendices/legacy.html#legacy-flagbits) for more information. |
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
[VK_PIPELINE_CREATE_DISABLE_OPTIMIZATION_BIT](#VkPipelineCreateFlagBits) specifies that the
created pipeline will not be optimized.
Using this flag **may** reduce the time taken to create the pipeline.

* 
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits) specifies that the
pipeline to be created is allowed to be the parent of a pipeline that
will be created in a subsequent pipeline creation call.

* 
[VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) specifies that the pipeline to
be created will be a child of a previously created parent pipeline.

* 
[VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT](#VkPipelineCreateFlagBits) specifies that
any shader input variables decorated as `ViewIndex` will be assigned
values as if they were decorated as `DeviceIndex`.

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](#VkPipelineCreateFlagBits) specifies that a compute
pipeline **can** be used with [vkCmdDispatchBase](dispatch.html#vkCmdDispatchBase) with a non-zero base
workgroup.

* 
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](#VkPipelineCreateFlagBits) specifies that a pipeline
is created with all shaders in the deferred state.
Before using the pipeline the application **must** call
[vkCompileDeferredNV](#vkCompileDeferredNV) exactly once on each shader in the pipeline
before using the pipeline.

* 
[VK_PIPELINE_CREATE_CAPTURE_STATISTICS_BIT_KHR](#VkPipelineCreateFlagBits) specifies that the
shader compiler should capture statistics for the pipeline executables
produced by the compile process which **can** later be retrieved by calling
[vkGetPipelineExecutableStatisticsKHR](#vkGetPipelineExecutableStatisticsKHR).
Enabling this flag **must** not affect the final compiled pipeline but **may**
disable pipeline caching or otherwise affect pipeline creation time.

* 
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits)
specifies that the shader compiler should capture the internal
representations of pipeline executables produced by the compile process
which **can** later be retrieved by calling
[vkGetPipelineExecutableInternalRepresentationsKHR](#vkGetPipelineExecutableInternalRepresentationsKHR).
Enabling this flag **must** not affect the final compiled pipeline but **may**
disable pipeline caching or otherwise affect pipeline creation time.
When capturing IR from pipelines created with pipeline libraries, there
is no guarantee that IR from libraries **can** be retrieved from the linked
pipeline.
Applications **should** retrieve IR from each library, and any linked
pipelines, separately.

* 
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits) specifies that the pipeline
    **cannot** be used directly, and instead defines a *pipeline library* that
    **can** be combined with other pipelines using the
    [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) structure.
    This is available in
ray tracing
and
graphics
    pipelines.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)
specifies that an any-hit shader will always be present when an any-hit
shader would be executed.
A NULL any-hit shader is an any-hit shader which is effectively
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)
specifies that a closest hit shader will always be present when a
closest hit shader would be executed.
A NULL closest hit shader is a closest hit shader which is effectively
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)
specifies that a miss shader will always be present when a miss shader
would be executed.
A NULL miss shader is a miss shader which is effectively
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group consisting
entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)
specifies that an intersection shader will always be present when an
intersection shader would be executed.
A NULL intersection shader is an intersection shader which is
effectively [VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR), such as from a shader group
consisting entirely of zeros.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits) specifies
that
sphere, LSS and
triangle primitives will be skipped during traversal using
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits) specifies that
AABB primitives will be skipped during traversal using
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits)
specifies that the shader group handles **can** be saved and reused on a
subsequent run (e.g. for trace capture and replay).

* 
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits) specifies that the
pipeline **can** be used in combination with [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) specifies
that pipeline creation will fail if a compile is required for creation
of a valid [VkPipeline](#VkPipeline) object; [VK_PIPELINE_COMPILE_REQUIRED](fundamentals.html#VkResult)
will be returned by pipeline creation, and the [VkPipeline](#VkPipeline) will be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

* 
When creating multiple pipelines,
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits) specifies that
control will be returned to the application if any individual pipeline
returns a result which is not [VK_SUCCESS](fundamentals.html#VkResult) rather than continuing to
create additional pipelines.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](#VkPipelineCreateFlagBits) specifies that
the pipeline is allowed to use `OpTraceRayMotionNV`.

* 
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineCreateFlagBits)
specifies that the pipeline will be used with a fragment shading rate
attachment and dynamic rendering.

* 
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#VkPipelineCreateFlagBits)
specifies that the pipeline will be used with a fragment density map
attachment and dynamic rendering.

* 
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits) specifies that
pipeline libraries being linked into this library **should** have link time
optimizations applied.
If this bit is omitted, implementations **should** instead perform linking
as rapidly as possible.

* 
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#VkPipelineCreateFlagBits)
specifies that pipeline libraries should retain any information
necessary to later perform an optimal link with
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits).

* 
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkPipelineCreateFlagBits) specifies that a
pipeline will be used with [descriptor buffers](descriptorsets.html#descriptorbuffers),
rather than [descriptor sets](descriptorsets.html#descriptors).

* 
[VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits)
specifies that the pipeline **may** be used with an attachment
[feedback loop](renderpass.html#renderpass-feedbackloop) including color attachments.
It is ignored if
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](#VkDynamicState) is set in
`pDynamicStates`.

* 
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits)
specifies that the pipeline **may** be used with an attachment
[feedback loop](renderpass.html#renderpass-feedbackloop) including depth-stencil
attachments.
It is ignored if
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](#VkDynamicState) is set in
`pDynamicStates`.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits) specifies
that the ray tracing pipeline **can** be used with acceleration structures
which reference an opacity micromap array.

* 
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#VkPipelineCreateFlagBits)
specifies that the ray tracing pipeline **can** be used with acceleration
structures which reference a displacement micromap array.

* 
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) specifies that the
pipeline **must** not be bound to a protected command buffer.

* 
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits) specifies that the
pipeline **must** not be bound to an unprotected command buffer.

It is valid to set both [VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits).
This allows a pipeline to be both a parent and possibly a child in a
pipeline hierarchy.
See [Pipeline Derivatives](#pipelines-pipeline-derivatives) for more
information.

When an implementation is looking up a pipeline in a [pipeline cache](#pipelines-cache), if that pipeline is being created using linked libraries,
implementations **should** always return an equivalent pipeline created with
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits) if available,
whether or not that bit was specified.

|  | Using [VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits) (or not) when
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

|  | This functionality is superseded by [VkPipelineCreateFlags2](#VkPipelineCreateFlags2). See [Legacy Functionality](../appendices/legacy.html#legacy-flagbits) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineCreateFlags;

`VkPipelineCreateFlags` is a bitmask type for setting a mask of zero or
more [VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits).

Compute pipelines consist of a single static compute shader stage and the
pipeline layout.

The compute pipeline represents a compute shader and is created by calling
`vkCreateComputePipelines`
with `module` and `pName` selecting an entry point from a shader
module, where that entry point defines a valid compute shader, in the
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structure contained within the
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo) structure.

To create compute pipelines, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateComputePipelines(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkComputePipelineCreateInfo*          pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the compute pipelines.

* 
`pipelineCache` is
either [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), indicating that pipeline caching is
disabled, or to enable caching,
the handle of a valid [VkPipelineCache](#VkPipelineCache) object.
The implementation **must** not access this object outside of the duration
of this command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array of [VkPipeline](#VkPipeline) handles in
which the resulting compute pipeline objects are returned.

Pipelines are created and returned as described for [Multiple Pipeline Creation](#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateComputePipelines-device-09661) VUID-vkCreateComputePipelines-device-09661

`device` **must** support at least one queue family with the
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateComputePipelines-flags-00695) VUID-vkCreateComputePipelines-flags-00695

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateComputePipelines-flags-00696) VUID-vkCreateComputePipelines-flags-00696

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits) flag set

* 
[](#VUID-vkCreateComputePipelines-pipelineCache-02873) VUID-vkCreateComputePipelines-pipelineCache-02873

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits), host access
to `pipelineCache` **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateComputePipelines-pNext-09616) VUID-vkCreateComputePipelines-pNext-09616

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateComputePipelines-pNext-09617) VUID-vkCreateComputePipelines-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateComputePipelines-binaryCount-09620) VUID-vkCreateComputePipelines-binaryCount-09620

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#VkPipelineCreationFeedbackFlagBitsEXT)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateComputePipelines-binaryCount-09621) VUID-vkCreateComputePipelines-binaryCount-09621

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateComputePipelines-binaryCount-09622) VUID-vkCreateComputePipelines-binaryCount-09622

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](#VkPipelineCreateFlagBits) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateComputePipelines-pCreateInfos-11414) VUID-vkCreateComputePipelines-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)))
[VkSampler](samplers.html#VkSampler) objects currently created on the device

* 
[](#VUID-vkCreateComputePipelines-pCreateInfos-11429) VUID-vkCreateComputePipelines-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateComputePipelines-device-parameter) VUID-vkCreateComputePipelines-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateComputePipelines-pipelineCache-parameter) VUID-vkCreateComputePipelines-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineCache` **must** be a valid [VkPipelineCache](#VkPipelineCache) handle

* 
[](#VUID-vkCreateComputePipelines-pCreateInfos-parameter) VUID-vkCreateComputePipelines-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo) structures

* 
[](#VUID-vkCreateComputePipelines-pAllocator-parameter) VUID-vkCreateComputePipelines-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateComputePipelines-pPipelines-parameter) VUID-vkCreateComputePipelines-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](#VkPipeline) handles

* 
[](#VUID-vkCreateComputePipelines-createInfoCount-arraylength) VUID-vkCreateComputePipelines-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateComputePipelines-pipelineCache-parent) VUID-vkCreateComputePipelines-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_SHADER_NV](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) specifying
how the pipeline will be generated.

* 
`stage` is a [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structure
describing the compute shader.

* 
`layout` is the description of binding locations used by both the
    pipeline and descriptor sets used with the pipeline.
    If
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is greater than or
    equal to Vulkan 1.3
or
    [VK_KHR_maintenance4](../appendices/extensions.html#VK_KHR_maintenance4) is enabled
    `layout` **must** not be accessed by the implementation outside of the
    duration of the command this structure is passed to.

* 
`basePipelineHandle` is a pipeline to derive from.

* 
`basePipelineIndex` is an index into the `pCreateInfos`
parameter to use as a pipeline to derive from.

The parameters `basePipelineHandle` and `basePipelineIndex` are
described in more detail in [Pipeline Derivatives](#pipelines-pipeline-derivatives).

If the `pNext` chain includes a [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)
structure, [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)::`flags` from that
structure is used instead of `flags` from this structure.

Valid Usage

* 
[](#VUID-VkComputePipelineCreateInfo-None-09497) VUID-VkComputePipelineCreateInfo-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) values

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07984) VUID-VkComputePipelineCreateInfo-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid compute `VkPipeline` handle

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07985) VUID-VkComputePipelineCreateInfo-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07986) VUID-VkComputePipelineCreateInfo-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07987) VUID-VkComputePipelineCreateInfo-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkComputePipelineCreateInfo-layout-10069) VUID-VkComputePipelineCreateInfo-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07988) VUID-VkComputePipelineCreateInfo-layout-07988

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07990) VUID-VkComputePipelineCreateInfo-layout-07990

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptorsets.html#VkDescriptorType),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkComputePipelineCreateInfo-layout-07991) VUID-VkComputePipelineCreateInfo-layout-07991

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkComputePipelineCreateInfo-None-10391) VUID-VkComputePipelineCreateInfo-None-10391

If a [resource variables](interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11798) VUID-VkComputePipelineCreateInfo-flags-11798

If [shader64BitIndexing](features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkComputePipelineCreateInfo-pipelineCreationCacheControl-02878) VUID-VkComputePipelineCreateInfo-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-pipelineProtectedAccess-07368) VUID-VkComputePipelineCreateInfo-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07369) VUID-VkComputePipelineCreateInfo-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11311) VUID-VkComputePipelineCreateInfo-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), `layout` **must**
be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11312) VUID-VkComputePipelineCreateInfo-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all shader variables
in the [shader resource interface](interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::pMappings

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03365) VUID-VkComputePipelineCreateInfo-flags-03365

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03366) VUID-VkComputePipelineCreateInfo-flags-03366

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03367) VUID-VkComputePipelineCreateInfo-flags-03367

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03368) VUID-VkComputePipelineCreateInfo-flags-03368

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03369) VUID-VkComputePipelineCreateInfo-flags-03369

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03370) VUID-VkComputePipelineCreateInfo-flags-03370

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-03576) VUID-VkComputePipelineCreateInfo-flags-03576

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-04945) VUID-VkComputePipelineCreateInfo-flags-04945

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-09007) VUID-VkComputePipelineCreateInfo-flags-09007

If the [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](features.html#features-deviceGeneratedComputePipelines)
feature is not enabled,
`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-09008) VUID-VkComputePipelineCreateInfo-flags-09008

If `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits), then the `pNext`
chain **must** include a pointer to a valid instance of
[VkComputePipelineIndirectBufferInfoNV](#VkComputePipelineIndirectBufferInfoNV) specifying the address where
the pipeline’s metadata will be saved

* 
[](#VUID-VkComputePipelineCreateInfo-flags-11007) VUID-VkComputePipelineCreateInfo-flags-11007

If `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](#VkPipelineCreateFlagBits2KHR), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-VkComputePipelineCreateInfo-stage-00701) VUID-VkComputePipelineCreateInfo-stage-00701

The `stage` member of `stage` **must** be
[VK_SHADER_STAGE_COMPUTE_BIT](#VkShaderStageFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-stage-00702) VUID-VkComputePipelineCreateInfo-stage-00702

The shader code for the entry point identified by `stage` and the
rest of the state identified by this structure **must** adhere to the
pipeline linking rules described in the [Shader Interfaces](interfaces.html#interfaces)
chapter

* 
[](#VUID-VkComputePipelineCreateInfo-layout-01687) VUID-VkComputePipelineCreateInfo-layout-01687

If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the number of resources in
`layout` accessible to the compute shader stage **must** be less than
or equal to `VkPhysicalDeviceLimits`::`maxPerStageResources`

* 
[](#VUID-VkComputePipelineCreateInfo-shaderEnqueue-09177) VUID-VkComputePipelineCreateInfo-shaderEnqueue-09177

If the [`shaderEnqueue`](features.html#features-shaderEnqueue) feature is not
enabled,
`flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-09178) VUID-VkComputePipelineCreateInfo-flags-09178

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits), the shader specified by
`stage` **must** not declare the `ShaderEnqueueAMDX` capability

* 
[](#VUID-VkComputePipelineCreateInfo-pipelineStageCreationFeedbackCount-06566) VUID-VkComputePipelineCreateInfo-pipelineStageCreationFeedbackCount-06566

If
[VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be `1`

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07367) VUID-VkComputePipelineCreateInfo-flags-07367

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-flags-07996) VUID-VkComputePipelineCreateInfo-flags-07996

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineCreateInfo-None-11367) VUID-VkComputePipelineCreateInfo-None-11367

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
`layout` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkComputePipelineCreateInfo-sType-sType) VUID-VkComputePipelineCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkComputePipelineCreateInfo-pNext-pNext) VUID-VkComputePipelineCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkComputePipelineIndirectBufferInfoNV](#VkComputePipelineIndirectBufferInfoNV), [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR), [VkPipelineCompilerControlCreateInfoAMD](#VkPipelineCompilerControlCreateInfoAMD), [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo), [VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo), [VkPipelineRobustnessCreateInfo](#VkPipelineRobustnessCreateInfo), or [VkSubpassShadingPipelineCreateInfoHUAWEI](#VkSubpassShadingPipelineCreateInfoHUAWEI)

* 
[](#VUID-VkComputePipelineCreateInfo-sType-unique) VUID-VkComputePipelineCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkComputePipelineCreateInfo-stage-parameter) VUID-VkComputePipelineCreateInfo-stage-parameter

 `stage` **must** be a valid [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structure

* 
[](#VUID-VkComputePipelineCreateInfo-layout-parameter) VUID-VkComputePipelineCreateInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkComputePipelineCreateInfo-commonparent) VUID-VkComputePipelineCreateInfo-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineShaderStageCreateFlagBits](#VkPipelineShaderStageCreateFlagBits)
specifying how the pipeline shader stage will be generated.

* 
`stage` is a [VkShaderStageFlagBits](#VkShaderStageFlagBits) value specifying a single
pipeline stage.

* 
`module` is
optionally
a [VkShaderModule](shaders.html#VkShaderModule) object containing the shader code for this stage.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`pName` is a pointer to a null-terminated UTF-8 string specifying
the entry point name of the shader for this stage.

* 
`pSpecializationInfo` is a pointer to a [VkSpecializationInfo](#VkSpecializationInfo)
structure, as described in
[Specialization Constants](#pipelines-specialization-constants), or
`NULL`.

If `module` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the shader code used by the
pipeline is defined by `module`.
If `module` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the shader code is defined by the
chained [VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo) if present.

If the [`shaderModuleIdentifier`](features.html#features-shaderModuleIdentifier)
feature is enabled, applications **can** omit shader code for `stage` and
instead provide a module identifier.
This is done by including a
[VkPipelineShaderStageModuleIdentifierCreateInfoEXT](#VkPipelineShaderStageModuleIdentifierCreateInfoEXT) structure with
`identifierSize` not equal to 0 in the `pNext` chain.
A shader stage created in this way is equivalent to one created using a
shader module with the same identifier.
The identifier allows an implementation to look up a pipeline without
consuming a valid SPIR-V module.
If a pipeline is not found, pipeline compilation is not possible and the
implementation **must** fail as specified by
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits).

When an identifier is used in lieu of a shader module, implementations **may**
fail pipeline compilation with [VK_PIPELINE_COMPILE_REQUIRED](fundamentals.html#VkResult) for any
reason.

|  | The rationale for the relaxed requirement on implementations to return a
| --- | --- |
pipeline with [VkPipelineShaderStageModuleIdentifierCreateInfoEXT](#VkPipelineShaderStageModuleIdentifierCreateInfoEXT) is
that layers or tools may intercept pipeline creation calls and require the
full SPIR-V context to operate correctly.
ICDs are not expected to fail pipeline compilation if the pipeline exists in
a cache somewhere. |

Applications **can** use identifiers when creating pipelines with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits).
When creating such pipelines, [VK_SUCCESS](fundamentals.html#VkResult) **may** be returned, but
subsequently fail when referencing the pipeline in a
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) struct.
Applications **must** allow pipeline compilation to fail during link steps with
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) as it **may**
not be possible to determine if a pipeline **can** be created from identifiers
until the link step.

Valid Usage

* 
[](#VUID-VkPipelineShaderStageCreateInfo-descriptorHeap-11314) VUID-VkPipelineShaderStageCreateInfo-descriptorHeap-11314

If the [`descriptorHeap`](features.html#features-descriptorHeap) feature is not
enabled,
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::`mappingCount`
**must** be 0

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11315) VUID-VkPipelineShaderStageCreateInfo-pNext-11315

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the mapped
resource in the shader **must** be a variable with a structure type
decorated with `Block` in the `Uniform` `Storage` `Class`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11316) VUID-VkPipelineShaderStageCreateInfo-pNext-11316

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the mapped structure
**must** not be larger than the sum of `pushDataOffset` used in the
mapping and [`maxPushDataSize`](limits.html#limits-maxPushDataSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11317) VUID-VkPipelineShaderStageCreateInfo-pNext-11317

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the sum of
mapped structure size and `shaderRecordDataOffset` used in the
mapping **must** not be larger than
[`maxShaderGroupStride`](limits.html#limits-maxShaderGroupStride)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11318) VUID-VkPipelineShaderStageCreateInfo-pNext-11318

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the mapped resource
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

    If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
    [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the
    `OpArrayLength`
or `OpUntypedArrayLengthKHR`
    instruction **must** not be used on that resource

[](#VUID-VkPipelineShaderStageCreateInfo-pNext-11399) VUID-VkPipelineShaderStageCreateInfo-pNext-11399

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
and the mapped resource declaration is an array, the
`pEmbeddedSampler` member of the corresponding mapping structure
**must** be `NULL`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00704) VUID-VkPipelineShaderStageCreateInfo-stage-00704

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `stage` **must** not be [VK_SHADER_STAGE_GEOMETRY_BIT](#VkShaderStageFlagBits)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00705) VUID-VkPipelineShaderStageCreateInfo-stage-00705

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `stage` **must** not be
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](#VkShaderStageFlagBits)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02091) VUID-VkPipelineShaderStageCreateInfo-stage-02091

If the [`meshShaders`](features.html#features-meshShader) feature is not
enabled, `stage` **must** not be [VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02092) VUID-VkPipelineShaderStageCreateInfo-stage-02092

If the [`taskShaders`](features.html#features-taskShader) feature is not
enabled, `stage` **must** not be [VK_SHADER_STAGE_TASK_BIT_EXT](#VkShaderStageFlagBits)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-clustercullingShader-07813) VUID-VkPipelineShaderStageCreateInfo-clustercullingShader-07813

If the [`clustercullingShader`](features.html#features-clustercullingShader)
feature is not enabled, `stage` **must** not be
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](#VkShaderStageFlagBits)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00706) VUID-VkPipelineShaderStageCreateInfo-stage-00706

`stage` **must** not be [VK_SHADER_STAGE_ALL_GRAPHICS](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_ALL](#VkShaderStageFlagBits)

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

If `stage` is [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](#VkShaderStageFlagBits), and the identified
entry point has an `OpExecutionMode` instruction specifying a patch
size with `OutputVertices`, the patch size **must** be greater than `0`
and less than or equal to
`VkPhysicalDeviceLimits`::`maxTessellationPatchSize`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00714) VUID-VkPipelineShaderStageCreateInfo-stage-00714

If `stage` is [VK_SHADER_STAGE_GEOMETRY_BIT](#VkShaderStageFlagBits), the identified
entry point **must** have an `OpExecutionMode` instruction specifying a
maximum output vertex count that is greater than `0` and less than or
equal to `VkPhysicalDeviceLimits`::`maxGeometryOutputVertices`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-00715) VUID-VkPipelineShaderStageCreateInfo-stage-00715

If `stage` is [VK_SHADER_STAGE_GEOMETRY_BIT](#VkShaderStageFlagBits), the identified
entry point **must** have an `OpExecutionMode` instruction specifying an
invocation count that is greater than `0` and less than or equal to
`VkPhysicalDeviceLimits`::`maxGeometryShaderInvocations`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02596) VUID-VkPipelineShaderStageCreateInfo-stage-02596

If `stage` is either [VK_SHADER_STAGE_VERTEX_BIT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_GEOMETRY_BIT](#VkShaderStageFlagBits), and the identified entry point
writes to `Layer` for any primitive, it **must** write the same value to
`Layer` for all vertices of a given primitive

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-02597) VUID-VkPipelineShaderStageCreateInfo-stage-02597

If `stage` is either [VK_SHADER_STAGE_VERTEX_BIT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_GEOMETRY_BIT](#VkShaderStageFlagBits), and the identified entry point
writes to `ViewportIndex` for any primitive, it **must** write the same
value to `ViewportIndex` for all vertices of a given primitive

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-06685) VUID-VkPipelineShaderStageCreateInfo-stage-06685

If `stage` is [VK_SHADER_STAGE_FRAGMENT_BIT](#VkShaderStageFlagBits), and the identified
entry point writes to `FragDepth` in any execution path, all
execution paths that are not exclusive to helper invocations **must**
either discard the fragment, or write or initialize the value of
`FragDepth`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-06686) VUID-VkPipelineShaderStageCreateInfo-stage-06686

If `stage` is [VK_SHADER_STAGE_FRAGMENT_BIT](#VkShaderStageFlagBits), and the identified
entry point writes to `FragStencilRefEXT` in any execution path, all
execution paths that are not exclusive to helper invocations **must**
either discard the fragment, or write or initialize the value of
`FragStencilRefEXT`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02784) VUID-VkPipelineShaderStageCreateInfo-flags-02784

If `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](#VkPipelineShaderStageCreateFlagBits)
flag set, the [    `subgroupSizeControl`](features.html#features-subgroupSizeControl) feature **must** be enabled

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02785) VUID-VkPipelineShaderStageCreateInfo-flags-02785

If `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](#VkPipelineShaderStageCreateFlagBits) flag
set, the [`computeFullSubgroups`](features.html#features-computeFullSubgroups)
feature **must** be enabled

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-08988) VUID-VkPipelineShaderStageCreateInfo-flags-08988

If `flags` includes
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](#VkPipelineShaderStageCreateFlagBits),
`stage` **must** be
one of [VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TASK_BIT_EXT](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_COMPUTE_BIT](#VkShaderStageFlagBits)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02754) VUID-VkPipelineShaderStageCreateInfo-pNext-02754

If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo) structure
is included in the `pNext` chain, `flags` **must** not have the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](#VkPipelineShaderStageCreateFlagBits)
flag set

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02755) VUID-VkPipelineShaderStageCreateInfo-pNext-02755

If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo) structure
is included in the `pNext` chain, the
[`subgroupSizeControl`](features.html#features-subgroupSizeControl) feature
**must** be enabled, and `stage` **must** be a valid bit specified in
[`requiredSubgroupSizeStages`](devsandqueues.html#limits-requiredSubgroupSizeStages)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02756) VUID-VkPipelineShaderStageCreateInfo-pNext-02756

    If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo) structure
    is included in the `pNext` chain and `stage` is
    [VK_SHADER_STAGE_COMPUTE_BIT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits), or [VK_SHADER_STAGE_TASK_BIT_EXT](#VkShaderStageFlagBits),
    the local workgroup size of the shader **must** be less than or equal to
    the product of
    [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo)::`requiredSubgroupSize`
    and [    `maxComputeWorkgroupSubgroups`](devsandqueues.html#limits-maxComputeWorkgroupSubgroups)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-02757) VUID-VkPipelineShaderStageCreateInfo-pNext-02757

If a [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo) structure
is included in the `pNext` chain, and `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](#VkPipelineShaderStageCreateFlagBits) flag
set, the local workgroup size in the X dimension of the pipeline **must**
be a multiple of
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo)::`requiredSubgroupSize`

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02758) VUID-VkPipelineShaderStageCreateInfo-flags-02758

If `flags` has both the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](#VkPipelineShaderStageCreateFlagBits) and
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](#VkPipelineShaderStageCreateFlagBits)
flags set, the local workgroup size in the X dimension of the pipeline
**must** be a multiple of [`maxSubgroupSize`](devsandqueues.html#limits-maxSubgroupSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-02759) VUID-VkPipelineShaderStageCreateInfo-flags-02759

If `flags` has the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](#VkPipelineShaderStageCreateFlagBits) flag
set and `flags` does not have the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](#VkPipelineShaderStageCreateFlagBits)
flag set and no
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo) structure is
included in the `pNext` chain, the local workgroup size in the X
dimension of the pipeline **must** be a multiple of [    `subgroupSize`](devsandqueues.html#limits-subgroupSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-module-08987) VUID-VkPipelineShaderStageCreateInfo-module-08987

If `module` uses the `OpTypeCooperativeMatrixKHR` instruction
with a `Scope` equal to `Subgroup`, then the local workgroup size
in the X dimension of the pipeline **must** be a multiple of the
[effective subgroup size](interfaces.html#interfaces-builtin-variables-sgs)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-module-10169) VUID-VkPipelineShaderStageCreateInfo-module-10169

If `module` uses the `OpTypeCooperativeMatrixKHR` instruction
with a `Scope` equal to `Workgroup`, then the local workgroup size
in the X dimension of the pipeline **must** be a multiple of the
[effective subgroup size](interfaces.html#interfaces-builtin-variables-sgs) and the
total local workgroup size **must** be a power of two multiple of the
[effective subgroup size](interfaces.html#interfaces-builtin-variables-sgs) and **must**
be less than or equal to
[cooperativeMatrixWorkgroupScopeMaxWorkgroupSize](limits.html#limits-cooperativeMatrixWorkgroupScopeMaxWorkgroupSize)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-08771) VUID-VkPipelineShaderStageCreateInfo-stage-08771

If a shader module identifier is not specified for this `stage`,
`module` **must** be a valid [VkShaderModule](shaders.html#VkShaderModule)
, or the `pNext` chain of the parent `Vk*CreateInfo` structure
**must** set [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` to a value
greater than `0`,
if none of the following features are enabled:

[`graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary)

* 
[`maintenance5`](features.html#features-maintenance5)

[](#VUID-VkPipelineShaderStageCreateInfo-stage-06845) VUID-VkPipelineShaderStageCreateInfo-stage-06845

If a shader module identifier is not specified for this `stage`,
`module` **must** be a valid [VkShaderModule](shaders.html#VkShaderModule), or
there **must** be a valid [VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo) structure in the
`pNext` chain
, or the `pNext` chain of the parent `Vk*CreateInfo` structure
**must** set [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` to a value
greater than `0`,

[](#VUID-VkPipelineShaderStageCreateInfo-stage-06844) VUID-VkPipelineShaderStageCreateInfo-stage-06844

If a shader module identifier is specified for this `stage`, the
`pNext` chain **must** not include a [VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo)
structure

[](#VUID-VkPipelineShaderStageCreateInfo-stage-06848) VUID-VkPipelineShaderStageCreateInfo-stage-06848

If a shader module identifier is specified for this `stage`,
`module` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-06849) VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-06849

If a shader module identifier is not specified, the
shader code used by the pipeline **must** be valid as described by the
[Khronos SPIR-V Specification](introduction.html#spirv-spec) after applying the
specializations provided in `pSpecializationInfo`, if any, and then
converting all specialization constants into fixed constants

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-sType-sType) VUID-VkPipelineShaderStageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pNext-pNext) VUID-VkPipelineShaderStageCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT), [VkPipelineRobustnessCreateInfo](#VkPipelineRobustnessCreateInfo), [VkPipelineShaderStageModuleIdentifierCreateInfoEXT](#VkPipelineShaderStageModuleIdentifierCreateInfoEXT), [VkPipelineShaderStageNodeCreateInfoAMDX](executiongraphs.html#VkPipelineShaderStageNodeCreateInfoAMDX), [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo), [VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT), [VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo), or [VkShaderModuleValidationCacheCreateInfoEXT](shaders.html#VkShaderModuleValidationCacheCreateInfoEXT)

* 
[](#VUID-VkPipelineShaderStageCreateInfo-sType-unique) VUID-VkPipelineShaderStageCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineShaderStageCreateInfo-flags-parameter) VUID-VkPipelineShaderStageCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineShaderStageCreateFlagBits](#VkPipelineShaderStageCreateFlagBits) values

* 
[](#VUID-VkPipelineShaderStageCreateInfo-stage-parameter) VUID-VkPipelineShaderStageCreateInfo-stage-parameter

 `stage` **must** be a valid [VkShaderStageFlagBits](#VkShaderStageFlagBits) value

* 
[](#VUID-VkPipelineShaderStageCreateInfo-module-parameter) VUID-VkPipelineShaderStageCreateInfo-module-parameter

 If `module` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `module` **must** be a valid [VkShaderModule](shaders.html#VkShaderModule) handle

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pName-parameter) VUID-VkPipelineShaderStageCreateInfo-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-parameter) VUID-VkPipelineShaderStageCreateInfo-pSpecializationInfo-parameter

 If `pSpecializationInfo` is not `NULL`, `pSpecializationInfo` **must** be a valid pointer to a valid [VkSpecializationInfo](#VkSpecializationInfo) structure

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineShaderStageCreateFlags;

`VkPipelineShaderStageCreateFlags` is a bitmask type for setting a mask
of zero or more [VkPipelineShaderStageCreateFlagBits](#VkPipelineShaderStageCreateFlagBits).

Possible values of the `flags` member of
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) specifying how a pipeline shader stage
is created, are:

// Provided by VK_VERSION_1_0
typedef enum VkPipelineShaderStageCreateFlagBits {
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT = 0x00000001,
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT = 0x00000002,
  // Provided by VK_EXT_subgroup_size_control
    VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT = VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT,
  // Provided by VK_EXT_subgroup_size_control
    VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT = VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT,
} VkPipelineShaderStageCreateFlagBits;

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](#VkPipelineShaderStageCreateFlagBits)
specifies that the
[`SubgroupSize`](interfaces.html#interfaces-builtin-variables-sgs) **may** vary in the
shader stage.

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](#VkPipelineShaderStageCreateFlagBits)
    specifies that the subgroup sizes **must** be launched with all invocations
    active in the
task, mesh, or
    compute stage.

|  | If [VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](#VkPipelineShaderStageCreateFlagBits)
| --- | --- |
and [VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#VkPipelineShaderStageCreateFlagBits) are
specified and [`minSubgroupSize`](devsandqueues.html#limits-minSubgroupSize) does not
equal [`maxSubgroupSize`](devsandqueues.html#limits-maxSubgroupSize) and no
[required subgroup size](#pipelines-required-subgroup-size) is specified,
then the only way to guarantee that the 'X' dimension of the local workgroup
size is a multiple of [`SubgroupSize`](interfaces.html#interfaces-builtin-variables-sgs) is to make it a multiple of `maxSubgroupSize`.
Under these conditions, you are guaranteed full subgroups but not any
particular subgroup size. |

Bits which **can** be set by commands and structures, specifying one or more
shader stages, are:

// Provided by VK_VERSION_1_0
typedef enum VkShaderStageFlagBits {
    VK_SHADER_STAGE_VERTEX_BIT = 0x00000001,
    VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT = 0x00000002,
    VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT = 0x00000004,
    VK_SHADER_STAGE_GEOMETRY_BIT = 0x00000008,
    VK_SHADER_STAGE_FRAGMENT_BIT = 0x00000010,
    VK_SHADER_STAGE_COMPUTE_BIT = 0x00000020,
    VK_SHADER_STAGE_ALL_GRAPHICS = 0x0000001F,
    VK_SHADER_STAGE_ALL = 0x7FFFFFFF,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_SHADER_STAGE_RAYGEN_BIT_KHR = 0x00000100,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_SHADER_STAGE_ANY_HIT_BIT_KHR = 0x00000200,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR = 0x00000400,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_SHADER_STAGE_MISS_BIT_KHR = 0x00000800,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_SHADER_STAGE_INTERSECTION_BIT_KHR = 0x00001000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_SHADER_STAGE_CALLABLE_BIT_KHR = 0x00002000,
  // Provided by VK_EXT_mesh_shader
    VK_SHADER_STAGE_TASK_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_mesh_shader
    VK_SHADER_STAGE_MESH_BIT_EXT = 0x00000080,
  // Provided by VK_HUAWEI_subpass_shading
    VK_SHADER_STAGE_SUBPASS_SHADING_BIT_HUAWEI = 0x00004000,
  // Provided by VK_HUAWEI_cluster_culling_shader
    VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI = 0x00080000,
  // Provided by VK_NV_ray_tracing
    VK_SHADER_STAGE_RAYGEN_BIT_NV = VK_SHADER_STAGE_RAYGEN_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_SHADER_STAGE_ANY_HIT_BIT_NV = VK_SHADER_STAGE_ANY_HIT_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_SHADER_STAGE_CLOSEST_HIT_BIT_NV = VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_SHADER_STAGE_MISS_BIT_NV = VK_SHADER_STAGE_MISS_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_SHADER_STAGE_INTERSECTION_BIT_NV = VK_SHADER_STAGE_INTERSECTION_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_SHADER_STAGE_CALLABLE_BIT_NV = VK_SHADER_STAGE_CALLABLE_BIT_KHR,
  // Provided by VK_NV_mesh_shader
    VK_SHADER_STAGE_TASK_BIT_NV = VK_SHADER_STAGE_TASK_BIT_EXT,
  // Provided by VK_NV_mesh_shader
    VK_SHADER_STAGE_MESH_BIT_NV = VK_SHADER_STAGE_MESH_BIT_EXT,
} VkShaderStageFlagBits;

* 
[VK_SHADER_STAGE_VERTEX_BIT](#VkShaderStageFlagBits) specifies the vertex stage.

* 
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](#VkShaderStageFlagBits) specifies the
tessellation control stage.

* 
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](#VkShaderStageFlagBits) specifies the
tessellation evaluation stage.

* 
[VK_SHADER_STAGE_GEOMETRY_BIT](#VkShaderStageFlagBits) specifies the geometry stage.

* 
[VK_SHADER_STAGE_FRAGMENT_BIT](#VkShaderStageFlagBits) specifies the fragment stage.

* 
[VK_SHADER_STAGE_COMPUTE_BIT](#VkShaderStageFlagBits) specifies the compute stage.

* 
[VK_SHADER_STAGE_ALL_GRAPHICS](#VkShaderStageFlagBits) is a combination of bits used as
shorthand to specify all graphics stages defined above (excluding the
compute stage).

* 
[VK_SHADER_STAGE_ALL](#VkShaderStageFlagBits) is a combination of bits used as shorthand to
specify all shader stages supported by the device, including all
additional stages which are introduced by extensions.

* 
[VK_SHADER_STAGE_TASK_BIT_EXT](#VkShaderStageFlagBits) specifies the task stage.

* 
[VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits) specifies the mesh stage.

* 
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](#VkShaderStageFlagBits) specifies the cluster
culling stage.

* 
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](#VkShaderStageFlagBits) specifies the ray generation stage.

* 
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](#VkShaderStageFlagBits) specifies the any-hit stage.

* 
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](#VkShaderStageFlagBits) specifies the closest hit
stage.

* 
[VK_SHADER_STAGE_MISS_BIT_KHR](#VkShaderStageFlagBits) specifies the miss stage.

* 
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](#VkShaderStageFlagBits) specifies the intersection
stage.

* 
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](#VkShaderStageFlagBits) specifies the callable stage.

|  | [VK_SHADER_STAGE_ALL_GRAPHICS](#VkShaderStageFlagBits) only includes the original five graphics
| --- | --- |
stages included in Vulkan 1.0, and not any stages added by extensions.
Thus, it may not have the desired effect in all cases. |

// Provided by VK_VERSION_1_0
typedef VkFlags VkShaderStageFlags;

`VkShaderStageFlags` is a bitmask type for setting a mask of zero or
more [VkShaderStageFlagBits](#VkShaderStageFlagBits).

The `VkPipelineShaderStageRequiredSubgroupSizeCreateInfo` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineShaderStageRequiredSubgroupSizeCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           requiredSubgroupSize;
} VkPipelineShaderStageRequiredSubgroupSizeCreateInfo;

// Provided by VK_EXT_subgroup_size_control
// Equivalent to VkPipelineShaderStageRequiredSubgroupSizeCreateInfo
typedef VkPipelineShaderStageRequiredSubgroupSizeCreateInfo VkPipelineShaderStageRequiredSubgroupSizeCreateInfoEXT;

or the equiavlent

// Provided by VK_EXT_shader_object
// Equivalent to VkPipelineShaderStageRequiredSubgroupSizeCreateInfo
typedef VkPipelineShaderStageRequiredSubgroupSizeCreateInfo VkShaderRequiredSubgroupSizeCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `requiredSubgroupSize` is an
unsigned integer value specifying the required subgroup size for the
newly created pipeline shader stage.

If a `VkPipelineShaderStageRequiredSubgroupSizeCreateInfo` structure is
included in the `pNext` chain of [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo),
it specifies that the pipeline shader stage being compiled has a required
subgroup size.

If a `VkShaderRequiredSubgroupSizeCreateInfoEXT` structure is included
in the `pNext` chain of [VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT), it specifies that
the shader being compiled has a required subgroup size.

Valid Usage

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02760) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02760

`requiredSubgroupSize` **must** be a power-of-two integer

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02761) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02761

`requiredSubgroupSize` **must** be greater or equal to
[`minSubgroupSize`](devsandqueues.html#limits-minSubgroupSize)

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02762) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-requiredSubgroupSize-02762

`requiredSubgroupSize` **must** be less than or equal to
[`maxSubgroupSize`](devsandqueues.html#limits-maxSubgroupSize)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-sType-sType) VUID-VkPipelineShaderStageRequiredSubgroupSizeCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo)

* 
[VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT)

A subpass shading pipeline is a compute pipeline which **must** be called only
in a subpass of a render pass with work dimensions specified by render area
size.
The subpass shading pipeline shader is a compute shader allowed to access
input attachments specified in the calling subpass.
To create a subpass shading pipeline, call [vkCreateComputePipelines](#vkCreateComputePipelines)
with [VkSubpassShadingPipelineCreateInfoHUAWEI](#VkSubpassShadingPipelineCreateInfoHUAWEI) in the `pNext` chain
of [VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo).

The `VkSubpassShadingPipelineCreateInfoHUAWEI` structure is defined as:

// Provided by VK_HUAWEI_subpass_shading
typedef struct VkSubpassShadingPipelineCreateInfoHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkRenderPass       renderPass;
    uint32_t           subpass;
} VkSubpassShadingPipelineCreateInfoHUAWEI;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`renderPass` is a handle to a render pass object describing the
environment in which the pipeline will be used.
The pipeline **must** only be used with a render pass instance compatible
with the one provided.
See [Render Pass Compatibility](renderpass.html#renderpass-compatibility) for more
information.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`subpass` is the index of the subpass in the render pass where this
pipeline will be used.

Valid Usage

* 
[](#VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-subpass-04946) VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-subpass-04946

`subpass` **must** be created with
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](#VkPipelineBindPoint) bind point

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-sType-sType) VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_SHADING_PIPELINE_CREATE_INFO_HUAWEI](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-renderPass-parameter) VUID-VkSubpassShadingPipelineCreateInfoHUAWEI-renderPass-parameter

 `renderPass` **must** be a valid [VkRenderPass](renderpass.html#VkRenderPass) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

A subpass shading pipeline’s workgroup size is a 2D vector with number of
power-of-two in width and height.
The maximum number of width and height is implementation-dependent, and **may**
vary for different formats and sample counts of attachments in a render
pass.

To query the maximum workgroup size, call:

// Provided by VK_HUAWEI_subpass_shading
VkResult vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI(
    VkDevice                                    device,
    VkRenderPass                                renderpass,
    VkExtent2D*                                 pMaxWorkgroupSize);

* 
`device` is a handle to a local device object that was used to
create the given render pass.

* 
`renderpass` is a handle to a render pass object describing the
environment in which the pipeline will be used.
The pipeline **must** only be used with a render pass instance compatible
with the one provided.
See [Render Pass Compatibility](renderpass.html#renderpass-compatibility) for more
information.

* 
`pMaxWorkgroupSize` is a pointer to a [VkExtent2D](fundamentals.html#VkExtent2D) structure.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-device-parameter) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parameter) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parameter

 `renderpass` **must** be a valid [VkRenderPass](renderpass.html#VkRenderPass) handle

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-pMaxWorkgroupSize-parameter) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-pMaxWorkgroupSize-parameter

 `pMaxWorkgroupSize` **must** be a valid pointer to [VkExtent2D](fundamentals.html#VkExtent2D) structures

* 
[](#VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parent) VUID-vkGetDeviceSubpassShadingMaxWorkgroupSizeHUAWEI-renderpass-parent

 `renderpass` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_SURFACE_LOST_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPipelineRobustnessCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineRobustnessCreateInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkPipelineRobustnessBufferBehavior    storageBuffers;
    VkPipelineRobustnessBufferBehavior    uniformBuffers;
    VkPipelineRobustnessBufferBehavior    vertexInputs;
    VkPipelineRobustnessImageBehavior     images;
} VkPipelineRobustnessCreateInfo;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPipelineRobustnessCreateInfo
typedef VkPipelineRobustnessCreateInfo VkPipelineRobustnessCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`storageBuffers` sets the behavior of out of bounds accesses made to
resources bound as:

[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType)

`uniformBuffers` describes the behavior of out of bounds accesses
made to resources bound as:

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType)

`vertexInputs` describes the behavior of out of bounds accesses made
to vertex input attributes

`images` describes the behavior of out of bounds accesses made to
resources bound as:

* 
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType)

Resources bound as [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptorsets.html#VkDescriptorType) will have the
robustness behavior that covers its active descriptor type.

The scope of the effect of `VkPipelineRobustnessCreateInfo` depends on
which structure’s `pNext` chain it is included in.

* 
`VkGraphicsPipelineCreateInfo`,
`VkRayTracingPipelineCreateInfoKHR`,
    `VkComputePipelineCreateInfo`:

    The robustness behavior described by
    `VkPipelineRobustnessCreateInfo` applies to all accesses through
    this pipeline

* 
`VkPipelineShaderStageCreateInfo`:

The robustness behavior described by
`VkPipelineRobustnessCreateInfo` applies to all accesses emanating
from the shader code of this shader stage

If `VkPipelineRobustnessCreateInfo` is specified for both a pipeline and
a pipeline stage, the `VkPipelineRobustnessCreateInfo` specified for the
pipeline stage will take precedence.

When `VkPipelineRobustnessCreateInfo` is specified for a pipeline, it
only affects the subset of the pipeline that is specified by the create
info, as opposed to subsets linked from pipeline libraries.
For [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo), that subset is specified by
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags`.
For [VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR), that subset is specified by the
specific stages in [VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages`.

Valid Usage

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06926) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06926

If the [`pipelineRobustness`](features.html#features-pipelineRobustness) feature
is not enabled, `storageBuffers` **must** be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](#VkPipelineRobustnessBufferBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06927) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06927

If the [`pipelineRobustness`](features.html#features-pipelineRobustness) feature
is not enabled, `uniformBuffers` **must** be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](#VkPipelineRobustnessBufferBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06928) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06928

If the [`pipelineRobustness`](features.html#features-pipelineRobustness) feature
is not enabled, `vertexInputs` **must** be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](#VkPipelineRobustnessBufferBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06929) VUID-VkPipelineRobustnessCreateInfo-pipelineRobustness-06929

If the [`pipelineRobustness`](features.html#features-pipelineRobustness) feature
is not enabled, `images` **must** be
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT](#VkPipelineRobustnessImageBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustImageAccess-06930) VUID-VkPipelineRobustnessCreateInfo-robustImageAccess-06930

If the [`robustImageAccess`](features.html#features-robustImageAccess) feature
is not supported, `images` **must** not be
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS](#VkPipelineRobustnessImageBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06931) VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06931

If the [`robustBufferAccess2`](features.html#features-robustBufferAccess2)
feature is not supported, `storageBuffers` **must** not be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](#VkPipelineRobustnessBufferBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06932) VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06932

If the [`robustBufferAccess2`](features.html#features-robustBufferAccess2)
feature is not supported, `uniformBuffers` **must** not be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](#VkPipelineRobustnessBufferBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06933) VUID-VkPipelineRobustnessCreateInfo-robustBufferAccess2-06933

If the [`robustBufferAccess2`](features.html#features-robustBufferAccess2)
feature is not supported, `vertexInputs` **must** not be
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](#VkPipelineRobustnessBufferBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-robustImageAccess2-06934) VUID-VkPipelineRobustnessCreateInfo-robustImageAccess2-06934

If the [`robustImageAccess2`](features.html#features-robustImageAccess2) feature
is not supported, `images` **must** not be
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2](#VkPipelineRobustnessImageBehaviorEXT)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-storageBuffers-10636) VUID-VkPipelineRobustnessCreateInfo-storageBuffers-10636

If `storageBuffers` is
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](#VkPipelineRobustnessBufferBehaviorEXT), and
either the [    `descriptorBindingStorageBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageBufferUpdateAfterBind) feature or the
[    `descriptorBindingStorageTexelBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageTexelBufferUpdateAfterBind) feature is
enabled on the device, [    `robustBufferAccessUpdateAfterBind`](devsandqueues.html#limits-robustBufferAccessUpdateAfterBind) **must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-10637) VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-10637

If `uniformBuffers` is
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](#VkPipelineRobustnessBufferBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](#VkPipelineRobustnessBufferBehaviorEXT), and
either
the [    `descriptorBindingInlineUniformBlockUpdateAfterBind`](features.html#features-descriptorBindingInlineUniformBlockUpdateAfterBind) feature,
the [    `descriptorBindingUniformBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformBufferUpdateAfterBind) feature, or the
[    `descriptorBindingUniformTexelBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformTexelBufferUpdateAfterBind) feature is
enabled on the device, [    `robustBufferAccessUpdateAfterBind`](devsandqueues.html#limits-robustBufferAccessUpdateAfterBind) **must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-images-10638) VUID-VkPipelineRobustnessCreateInfo-images-10638

If `images` is
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS](#VkPipelineRobustnessImageBehaviorEXT) or
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2](#VkPipelineRobustnessImageBehaviorEXT), and
either the [    `descriptorBindingStorageImageUpdateAfterBind`](features.html#features-descriptorBindingStorageImageUpdateAfterBind) feature or the
[    `descriptorBindingSampledImageUpdateAfterBind`](features.html#features-descriptorBindingSampledImageUpdateAfterBind) feature is enabled
on the device, [    `robustBufferAccessUpdateAfterBind`](devsandqueues.html#limits-robustBufferAccessUpdateAfterBind) **must** be [VK_TRUE](fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-sType-sType) VUID-VkPipelineRobustnessCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineRobustnessCreateInfo-storageBuffers-parameter) VUID-VkPipelineRobustnessCreateInfo-storageBuffers-parameter

 `storageBuffers` **must** be a valid [VkPipelineRobustnessBufferBehavior](#VkPipelineRobustnessBufferBehavior) value

* 
[](#VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-parameter) VUID-VkPipelineRobustnessCreateInfo-uniformBuffers-parameter

 `uniformBuffers` **must** be a valid [VkPipelineRobustnessBufferBehavior](#VkPipelineRobustnessBufferBehavior) value

* 
[](#VUID-VkPipelineRobustnessCreateInfo-vertexInputs-parameter) VUID-VkPipelineRobustnessCreateInfo-vertexInputs-parameter

 `vertexInputs` **must** be a valid [VkPipelineRobustnessBufferBehavior](#VkPipelineRobustnessBufferBehavior) value

* 
[](#VUID-VkPipelineRobustnessCreateInfo-images-parameter) VUID-VkPipelineRobustnessCreateInfo-images-parameter

 `images` **must** be a valid [VkPipelineRobustnessImageBehavior](#VkPipelineRobustnessImageBehavior) value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

* 
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo)

* 
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)

Possible values of the `storageBuffers`, `uniformBuffers`, and
`vertexInputs` members of [VkPipelineRobustnessCreateInfo](#VkPipelineRobustnessCreateInfo) are:

// Provided by VK_VERSION_1_4
typedef enum VkPipelineRobustnessBufferBehavior {
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT = 0,
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED = 1,
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS = 2,
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2 = 3,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2_EXT = VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2,
} VkPipelineRobustnessBufferBehavior;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPipelineRobustnessBufferBehavior
typedef VkPipelineRobustnessBufferBehavior VkPipelineRobustnessBufferBehaviorEXT;

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](#VkPipelineRobustnessBufferBehaviorEXT) specifies
that [out of bounds](shaders.html#shaders-execution-memory-access-bounds) buffer
accesses follow the behavior of robust buffer access features enabled
for the device.

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED](#VkPipelineRobustnessBufferBehaviorEXT) specifies that
buffer accesses **must** not be [    out of bounds](shaders.html#shaders-execution-memory-access-bounds).

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](#VkPipelineRobustnessBufferBehaviorEXT)
specifies that buffer accesses conform to
[Robust Buffer Access](shaders.html#shaders-robust-buffer-access) guarantees.

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](#VkPipelineRobustnessBufferBehaviorEXT)
specifies that buffer accesses conform to
[Robust Buffer Access 2](shaders.html#shaders-robust-buffer-access2) guarantees.

Possible values of the `images` member of
[VkPipelineRobustnessCreateInfo](#VkPipelineRobustnessCreateInfo) are:

// Provided by VK_VERSION_1_4
typedef enum VkPipelineRobustnessImageBehavior {
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT = 0,
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED = 1,
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS = 2,
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2 = 3,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS,
  // Provided by VK_EXT_pipeline_robustness
    VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2_EXT = VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2,
} VkPipelineRobustnessImageBehavior;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPipelineRobustnessImageBehavior
typedef VkPipelineRobustnessImageBehavior VkPipelineRobustnessImageBehaviorEXT;

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT](#VkPipelineRobustnessImageBehaviorEXT) specifies
that [out of bounds](shaders.html#shaders-execution-memory-access-bounds) image
accesses follow the behavior of robust image access features enabled for
the device.

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED](#VkPipelineRobustnessImageBehaviorEXT) specifies that
image accesses **must** not be [    out of bounds](shaders.html#shaders-execution-memory-access-bounds).

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS](#VkPipelineRobustnessImageBehaviorEXT)
specifies that image accesses conform to [Robust Image Access](shaders.html#shaders-robust-image-access)
guarantees.

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2](#VkPipelineRobustnessImageBehaviorEXT)
specifies that image accesses conform to
[Robust Image Access 2](shaders.html#shaders-robust-image-access2) guarantees.

An identifier **can** be provided instead of shader code in an attempt to
compile pipelines without providing complete SPIR-V to the implementation.

The `VkPipelineShaderStageModuleIdentifierCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_shader_module_identifier
typedef struct VkPipelineShaderStageModuleIdentifierCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           identifierSize;
    const uint8_t*     pIdentifier;
} VkPipelineShaderStageModuleIdentifierCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`identifierSize` is the size, in bytes, of the buffer pointed to by
`pIdentifier`.

* 
`pIdentifier` is a pointer to a buffer of opaque data specifying an
identifier.

Any identifier **can** be used.
If the pipeline being created with identifier requires compilation to
complete the pipeline creation call, pipeline compilation **must** fail as
defined by [VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits).

`pIdentifier` and `identifierSize` **can** be obtained from an
[VkShaderModuleIdentifierEXT](shaders.html#VkShaderModuleIdentifierEXT) queried earlier.

Valid Usage

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06850) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06850

If this structure is included in a `pNext` chain and
`identifierSize` is not equal to 0, the
[`shaderModuleIdentifier`](features.html#features-shaderModuleIdentifier)
feature **must** be enabled

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06851) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06851

If this structure is included in a `pNext` chain of
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) and `identifierSize` is not
equal to 0, the pipeline **must** be created with the
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) flag set

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-identifierSize-06852) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-identifierSize-06852

`identifierSize` **must** be less-or-equal to
[VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT](shaders.html#VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-sType-sType) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_MODULE_IDENTIFIER_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pIdentifier-parameter) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pIdentifier-parameter

 If `identifierSize` is not `0`, `pIdentifier` **must** be a valid pointer to an array of `identifierSize` `uint8_t` values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo)

If a compute pipeline is going to be used in [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands) by specifying its pipeline token with
[VkBindPipelineIndirectCommandNV](device_generated_commands/generatedcommands.html#VkBindPipelineIndirectCommandNV), then that pipeline’s associated
metadata **must** be saved at a specified buffer device address for later use
in indirect command generation.
The buffer device address **must** be specified at the time of compute pipeline
creation with [VkComputePipelineIndirectBufferInfoNV](#VkComputePipelineIndirectBufferInfoNV) structure in the
`pNext` chain of [VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo).

The `VkComputePipelineIndirectBufferInfoNV` structure is defined as:

// Provided by VK_NV_device_generated_commands_compute
typedef struct VkComputePipelineIndirectBufferInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceAddress    deviceAddress;
    VkDeviceSize       size;
    VkDeviceAddress    pipelineDeviceAddressCaptureReplay;
} VkComputePipelineIndirectBufferInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceAddress` is the address where the pipeline’s metadata will be
stored.

* 
`size` is the size of pipeline’s metadata that was queried using
[vkGetPipelineIndirectMemoryRequirementsNV](device_generated_commands/generatedcommands.html#vkGetPipelineIndirectMemoryRequirementsNV).

* 
`pipelineDeviceAddressCaptureReplay` is the device address where
pipeline’s metadata was originally saved and can now be used to
re-populate `deviceAddress` for replay.

If `pipelineDeviceAddressCaptureReplay` is zero, no specific address is
requested.
If `pipelineDeviceAddressCaptureReplay` is not zero, then it **must** be an
address retrieved from an identically created pipeline on the same
implementation.
The pipeline metadata **must** also be placed on an identically created buffer
and at the same offset using the [vkCmdUpdatePipelineIndirectBufferNV](#vkCmdUpdatePipelineIndirectBufferNV)
command.

Valid Usage

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceGeneratedComputePipelines-09009) VUID-VkComputePipelineIndirectBufferInfoNV-deviceGeneratedComputePipelines-09009

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-flags-09010) VUID-VkComputePipelineIndirectBufferInfoNV-flags-09010

The pipeline creation flags in
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)::`flags` **must** include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09011) VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09011

`deviceAddress` **must** be aligned to the
[VkMemoryRequirements2](resources.html#VkMemoryRequirements2)::`memoryRequirements.alignment`, as
returned by [vkGetPipelineIndirectMemoryRequirementsNV](device_generated_commands/generatedcommands.html#vkGetPipelineIndirectMemoryRequirementsNV)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09012) VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09012

`deviceAddress` **must** have been allocated from a buffer that was
created with both the [VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) and
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flags set

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-size-09013) VUID-VkComputePipelineIndirectBufferInfoNV-size-09013

`size` **must** be greater than or equal to the
[VkMemoryRequirements2](resources.html#VkMemoryRequirements2)::`memoryRequirements.size`, as returned
by [vkGetPipelineIndirectMemoryRequirementsNV](device_generated_commands/generatedcommands.html#vkGetPipelineIndirectMemoryRequirementsNV)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09014) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09014

If `pipelineDeviceAddressCaptureReplay` is non-zero then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputeCaptureReplay`](features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09015) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09015

If `pipelineDeviceAddressCaptureReplay` is non-zero then that
address **must** have been allocated with flag
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) set

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09016) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09016

If `pipelineDeviceAddressCaptureReplay` is non-zero, the
`pipeline` **must** have been recreated for replay

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09017) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09017

`pipelineDeviceAddressCaptureReplay` **must** satisfy the
`alignment` and `size` requirements similar to
`deviceAddress`

Valid Usage (Implicit)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-sType-sType) VUID-VkComputePipelineIndirectBufferInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_INDIRECT_BUFFER_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-parameter) VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-parameter

 `deviceAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-parameter) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-parameter

 If `pipelineDeviceAddressCaptureReplay` is not `0`, `pipelineDeviceAddressCaptureReplay` **must** be a valid `VkDeviceAddress` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

To save a compute pipeline’s metadata at a device address call:

// Provided by VK_NV_device_generated_commands_compute
void vkCmdUpdatePipelineIndirectBufferNV(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipeline                                  pipeline);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](#VkPipelineBindPoint) value specifying
the type of pipeline whose metadata will be saved.

* 
`pipeline` is the pipeline whose metadata will be saved.

`vkCmdUpdatePipelineIndirectBufferNV` is only allowed outside of a
render pass.
This command is treated as a “transfer” operation for the purposes of
synchronization barriers.
The writes to the address **must** be synchronized using stages
[VK_PIPELINE_STAGE_2_COPY_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) and
[VK_PIPELINE_STAGE_COMMAND_PREPROCESS_BIT_NV](synchronization.html#VkPipelineStageFlagBits) and with access masks
[VK_ACCESS_MEMORY_WRITE_BIT](synchronization.html#VkAccessFlagBits) and
[VK_ACCESS_COMMAND_PREPROCESS_READ_BIT_NV](synchronization.html#VkAccessFlagBits) respectively before using the
results in preprocessing.

Valid Usage

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-09018) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-09018

`pipelineBindPoint` **must** be [VK_PIPELINE_BIND_POINT_COMPUTE](#VkPipelineBindPoint)

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09019) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09019

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits) flag set

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09020) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-09020

`pipeline` **must** have been created with
[VkComputePipelineIndirectBufferInfoNV](#VkComputePipelineIndirectBufferInfoNV) structure specifying a valid
address where its metadata will be saved

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-deviceGeneratedComputePipelines-09021) VUID-vkCmdUpdatePipelineIndirectBufferNV-deviceGeneratedComputePipelines-09021

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-parameter) VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-parameter) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-parameter) VUID-vkCmdUpdatePipelineIndirectBufferNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-recording) VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-cmdpool) VUID-vkCmdUpdatePipelineIndirectBufferNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-renderpass) VUID-vkCmdUpdatePipelineIndirectBufferNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-suspended) VUID-vkCmdUpdatePipelineIndirectBufferNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-videocoding) VUID-vkCmdUpdatePipelineIndirectBufferNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdUpdatePipelineIndirectBufferNV-commonparent) VUID-vkCmdUpdatePipelineIndirectBufferNV-commonparent

 Both of `commandBuffer`, and `pipeline` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdUpdatePipelineIndirectBufferNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Graphics pipelines consist of multiple shader stages, multiple
fixed-function pipeline stages, and a pipeline layout.

To create graphics pipelines, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateGraphicsPipelines(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkGraphicsPipelineCreateInfo*         pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the graphics pipelines.

* 
`pipelineCache` is
either [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), indicating that pipeline caching is
disabled, or to enable caching,
the handle of a valid [VkPipelineCache](#VkPipelineCache) object.
The implementation **must** not access this object outside of the duration
of this command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array of [VkPipeline](#VkPipeline) handles in
which the resulting graphics pipeline objects are returned.

The [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) structure includes an array of
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures for each of the desired
active shader stages, as well as creation information for all relevant
fixed-function stages, and a pipeline layout.

Pipelines are created and returned as described for [Multiple Pipeline Creation](#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateGraphicsPipelines-device-09662) VUID-vkCreateGraphicsPipelines-device-09662

`device` **must** support at least one queue family with the
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateGraphicsPipelines-flags-00720) VUID-vkCreateGraphicsPipelines-flags-00720

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateGraphicsPipelines-flags-00721) VUID-vkCreateGraphicsPipelines-flags-00721

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits) flag set

* 
[](#VUID-vkCreateGraphicsPipelines-pipelineCache-02876) VUID-vkCreateGraphicsPipelines-pipelineCache-02876

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits), host access
to `pipelineCache` **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateGraphicsPipelines-pNext-09616) VUID-vkCreateGraphicsPipelines-pNext-09616

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateGraphicsPipelines-pNext-09617) VUID-vkCreateGraphicsPipelines-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateGraphicsPipelines-binaryCount-09620) VUID-vkCreateGraphicsPipelines-binaryCount-09620

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#VkPipelineCreationFeedbackFlagBitsEXT)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateGraphicsPipelines-binaryCount-09621) VUID-vkCreateGraphicsPipelines-binaryCount-09621

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateGraphicsPipelines-binaryCount-09622) VUID-vkCreateGraphicsPipelines-binaryCount-09622

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](#VkPipelineCreateFlagBits) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateGraphicsPipelines-pCreateInfos-11414) VUID-vkCreateGraphicsPipelines-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)))
[VkSampler](samplers.html#VkSampler) objects currently created on the device

* 
[](#VUID-vkCreateGraphicsPipelines-pCreateInfos-11429) VUID-vkCreateGraphicsPipelines-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

|  | An implicit cache may be provided by the implementation or a layer.
| --- | --- |
For this reason, it is still valid to set
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) on
`flags` for any element of `pCreateInfos` while passing
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) for `pipelineCache`. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreateGraphicsPipelines-device-parameter) VUID-vkCreateGraphicsPipelines-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateGraphicsPipelines-pipelineCache-parameter) VUID-vkCreateGraphicsPipelines-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineCache` **must** be a valid [VkPipelineCache](#VkPipelineCache) handle

* 
[](#VUID-vkCreateGraphicsPipelines-pCreateInfos-parameter) VUID-vkCreateGraphicsPipelines-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) structures

* 
[](#VUID-vkCreateGraphicsPipelines-pAllocator-parameter) VUID-vkCreateGraphicsPipelines-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateGraphicsPipelines-pPipelines-parameter) VUID-vkCreateGraphicsPipelines-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](#VkPipeline) handles

* 
[](#VUID-vkCreateGraphicsPipelines-createInfoCount-arraylength) VUID-vkCreateGraphicsPipelines-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateGraphicsPipelines-pipelineCache-parent) VUID-vkCreateGraphicsPipelines-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_SHADER_NV](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkGraphicsPipelineCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkGraphicsPipelineCreateInfo {
    VkStructureType                                  sType;
    const void*                                      pNext;
    VkPipelineCreateFlags                            flags;
    uint32_t                                         stageCount;
    const VkPipelineShaderStageCreateInfo*           pStages;
    const VkPipelineVertexInputStateCreateInfo*      pVertexInputState;
    const VkPipelineInputAssemblyStateCreateInfo*    pInputAssemblyState;
    const VkPipelineTessellationStateCreateInfo*     pTessellationState;
    const VkPipelineViewportStateCreateInfo*         pViewportState;
    const VkPipelineRasterizationStateCreateInfo*    pRasterizationState;
    const VkPipelineMultisampleStateCreateInfo*      pMultisampleState;
    const VkPipelineDepthStencilStateCreateInfo*     pDepthStencilState;
    const VkPipelineColorBlendStateCreateInfo*       pColorBlendState;
    const VkPipelineDynamicStateCreateInfo*          pDynamicState;
    VkPipelineLayout                                 layout;
    VkRenderPass                                     renderPass;
    uint32_t                                         subpass;
    VkPipeline                                       basePipelineHandle;
    int32_t                                          basePipelineIndex;
} VkGraphicsPipelineCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) specifying
how the pipeline will be generated.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array of `stageCount`
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures describing the set of
the shader stages to be included in the graphics pipeline.

* 
`pVertexInputState` is a pointer to a
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo) structure.
It is ignored if the pipeline includes a mesh shader stage.
It **can** be `NULL` if the pipeline is created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](#VkDynamicState) dynamic state set.

* 
`pInputAssemblyState` is a pointer to a
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo) structure which determines
input assembly behavior for vertex shading, as described in [    Drawing Commands](drawing.html#drawing).
 If the
`[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is enabled, it **can** be
`NULL` if the pipeline is created with both
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](#VkDynamicState), and
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#VkDynamicState) dynamic states set and
[    `dynamicPrimitiveTopologyUnrestricted`](limits.html#limits-dynamicPrimitiveTopologyUnrestricted) is [VK_TRUE](fundamentals.html#VK_TRUE).
It is ignored if the pipeline includes a mesh shader stage.

* 
`pTessellationState` is a pointer to a
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo) structure defining
tessellation state used by tessellation shaders.
It **can** be `NULL` if the pipeline is created with the
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](#VkDynamicState) dynamic state set.

* 
`pViewportState` is a pointer to a
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) structure defining viewport
state used when rasterization is enabled.
 If the
`[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is enabled, it **can** be
`NULL` if the pipeline is created with both
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState) dynamic states set.

* 
`pRasterizationState` is a pointer to a
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) structure defining
rasterization state.
 If the
`[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_CULL_MODE](#VkDynamicState), [VK_DYNAMIC_STATE_FRONT_FACE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_BIAS](#VkDynamicState), and [VK_DYNAMIC_STATE_LINE_WIDTH](#VkDynamicState)
dynamic states set.

* 
`pMultisampleState` is a pointer to a
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure defining
multisample state used when rasterization is enabled.
 If the
`[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](#VkDynamicState), and
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](#VkDynamicState) dynamic states set,
and either the [alphaToOne](features.html#features-alphaToOne) feature is not
enabled or [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](#VkDynamicState) is set, in
which case
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`sampleShadingEnable` is
assumed to be [VK_FALSE](fundamentals.html#VK_FALSE).

* 
`pDepthStencilState` is a pointer to a
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure defining
depth/stencil state used when rasterization is enabled for depth or
stencil attachments accessed during rendering.
 If the
`[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_STENCIL_OP](#VkDynamicState), and
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](#VkDynamicState) dynamic states set.

* 
`pColorBlendState` is a pointer to a
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) structure defining color blend
state used when rasterization is enabled for any color attachments
accessed during rendering.
 If the
`[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is enabled, it **can** be
`NULL` if the pipeline is created with all of
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](#VkDynamicState), and
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](#VkDynamicState) dynamic states set.

* 
`pDynamicState` is a pointer to a
[VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo) structure defining which
properties of the pipeline state object are dynamic and **can** be changed
independently of the pipeline state.
This **can** be `NULL`, which means no state in the pipeline is considered
dynamic.

* 
`layout` is the description of binding locations used by both the
    pipeline and descriptor sets used with the pipeline.
    If
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is greater than or
    equal to Vulkan 1.3
or
    [VK_KHR_maintenance4](../appendices/extensions.html#VK_KHR_maintenance4) is enabled
    `layout` **must** not be accessed by the implementation outside of the
    duration of the command this structure is passed to.

* 
`renderPass` is a handle to a render pass object describing the
environment in which the pipeline will be used.
The pipeline **must** only be used with a render pass instance compatible
with the one provided.
See [Render Pass Compatibility](renderpass.html#renderpass-compatibility) for more
information.
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`subpass` is the index of the subpass in the render pass where this
pipeline will be used.

* 
`basePipelineHandle` is a pipeline to derive from.

* 
`basePipelineIndex` is an index into the `pCreateInfos`
parameter to use as a pipeline to derive from.

The parameters `basePipelineHandle` and `basePipelineIndex` are
described in more detail in [Pipeline Derivatives](#pipelines-pipeline-derivatives).

If any shader stage fails to compile,
the compile log will be reported back to the application, and
[VK_ERROR_INVALID_SHADER_NV](fundamentals.html#VkResult) will be generated.

|  | With `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)`, it is possible that many of
| --- | --- |
the `VkGraphicsPipelineCreateInfo` members above **can** be `NULL` because
all their state is dynamic and therefore ignored.
This is optional so the application **can** still use a valid pointer if it
needs to set the `pNext` or `flags` fields to specify state for
other extensions. |

The state required for a graphics pipeline is divided into
[vertex input state](#pipelines-graphics-subsets-vertex-input),
[pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), [fragment shader state](#pipelines-graphics-subsets-fragment-shader), and [fragment output state](#pipelines-graphics-subsets-fragment-output).

Vertex Input State
Vertex input state is defined by:

* 
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo)

* 
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo)

If
this pipeline specifies
[pre-rasterization state](#pipelines-graphics-subsets-pre-rasterization)
either directly or by including it as a pipeline library and its
`pStages` includes a vertex shader, this state **must** be specified to
create a [complete graphics pipeline](#pipelines-graphics-subsets-complete).

If a pipeline includes
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) in
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` either explicitly
or as a default, and either the conditions requiring this state for a
[complete graphics pipeline](#pipelines-graphics-subsets-complete) are met
or this pipeline does not specify
[pre-rasterization state](#pipelines-graphics-subsets-pre-rasterization) in
any way, that pipeline **must** specify this state directly.

Pre-Rasterization Shader State
Pre-rasterization shader state is defined by:

* 
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) entries for:

Vertex shaders

* 
Tessellation control shaders

* 
Tessellation evaluation shaders

* 
Geometry shaders

* 
Task shaders

* 
Mesh shaders

Within the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout), all descriptor sets with
pre-rasterization shader bindings if
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits) was specified.

* 
If [VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits) was not
specified, the full pipeline layout **must** be specified.

[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)

[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo)

[VkRenderPass](renderpass.html#VkRenderPass) and `subpass` parameter

The `viewMask` parameter of [VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)
(formats are ignored)

[VkPipelineDiscardRectangleStateCreateInfoEXT](fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT)

[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)

Inclusion/omission of the
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkPipelineCreateFlagBits2KHR) flag

This state **must** be specified to create a
[complete graphics pipeline](#pipelines-graphics-subsets-complete).

If either the `pNext` chain includes a
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT) structure with
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT)
included in `flags`, or it is not specified and would default to include
that value, this state **must** be specified in the pipeline.

Fragment Shader State
Fragment shader state is defined by:

* 
A [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) entry for the fragment shader

* 
Within the [VkPipelineLayout](descriptorsets.html#VkPipelineLayout), all descriptor sets with fragment
shader bindings if
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits) was specified.

If [VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits) was not
specified, the full pipeline layout **must** be specified.

[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)
if [sample shading](primsrast.html#primsrast-sampleshading) is enabled or
`renderpass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo)

[VkRenderPass](renderpass.html#VkRenderPass) and `subpass` parameter

The `viewMask` parameter of [VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)
(formats are ignored)

[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)

[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)

[VkPipelineRepresentativeFragmentTestStateCreateInfoNV](fragops.html#VkPipelineRepresentativeFragmentTestStateCreateInfoNV)

Inclusion/omission of the
[VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkPipelineCreateFlagBits)
flag

Inclusion/omission of the
[VK_PIPELINE_RASTERIZATION_STATE_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#VkPipelineCreateFlagBits)
flag

[VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo)

Inclusion/omission of the
[VK_PIPELINE_CREATE_2_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](#VkPipelineCreateFlagBits2KHR) flag

The `customResolve` parameter of [VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT).
Formats are ignored, and not including the structure behaves identically
to setting `customResolve` to [VK_FALSE](fundamentals.html#VK_FALSE), unlike in
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output).

If
a pipeline specifies
[pre-rasterization state](#pipelines-graphics-subsets-pre-rasterization)
either directly or by including it as a pipeline library and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE)
or [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState) is used,
this state **must** be specified to create a
[complete graphics pipeline](#pipelines-graphics-subsets-complete).

If a pipeline includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) in
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` either explicitly
or as a default, and either the conditions requiring this state for a
[complete graphics pipeline](#pipelines-graphics-subsets-complete) are met
or this pipeline does not specify
[pre-rasterization state](#pipelines-graphics-subsets-pre-rasterization) in
any way, that pipeline **must** specify this state directly.

Fragment Output State
Fragment output state is defined by:

* 
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo)

* 
[VkRenderPass](renderpass.html#VkRenderPass) and `subpass` parameter

* 
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)

* 
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)

* 
[VkAttachmentSampleCountInfoAMD](cmdbuffers.html#VkAttachmentSampleCountInfoAMD)

* 
[VkAttachmentSampleCountInfoNV](cmdbuffers.html#VkAttachmentSampleCountInfoNV)

* 
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)

* 
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)

* 
Inclusion/omission of the
[VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits)
flags

* 
Inclusion/omission of the
[VK_PIPELINE_CREATE_2_ENABLE_LEGACY_DITHERING_BIT_EXT](#VkPipelineCreateFlagBits2KHR) flag

* 
[VkRenderingAttachmentLocationInfo](interfaces.html#VkRenderingAttachmentLocationInfo)

If
a pipeline specifies
[pre-rasterization state](#pipelines-graphics-subsets-pre-rasterization)
either directly or by including it as a pipeline library and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE)
or [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState) is used,
this state **must** be specified to create a
[complete graphics pipeline](#pipelines-graphics-subsets-complete).

If a pipeline includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) in
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` either explicitly
or as a default, and either the conditions requiring this state for a
[complete graphics pipeline](#pipelines-graphics-subsets-complete) are met
or this pipeline does not specify
[pre-rasterization state](#pipelines-graphics-subsets-pre-rasterization) in
any way, that pipeline **must** specify this state directly.

Dynamic State
Dynamic state values set via `pDynamicState` **must** be ignored if the
state they correspond to is not otherwise statically set by one of the state
subsets used to create the pipeline.
Additionally, setting dynamic state values **must** not modify whether state in
a linked library is static or dynamic; this is set and unchangeable when the
library is created.
For example, if a pipeline only included
[pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), then any dynamic state value corresponding to depth or stencil
testing has no effect.
Any linked library that has dynamic state enabled that same dynamic state
**must** also be enabled in all the other linked libraries to which that
dynamic state applies.

Complete Graphics Pipelines
A complete graphics pipeline always includes
[pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), with other subsets included depending on that state as specified in
the above sections.

Graphics Pipeline Library Layouts
If different subsets are linked together with pipeline layouts created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), the final
effective pipeline layout is effectively the union of the linked pipeline
layouts.
When binding descriptor sets for this pipeline, the pipeline layout used
**must** be compatible with this union.
This pipeline layout **can** be overridden when linking with
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits) by providing a
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is [compatible](descriptorsets.html#descriptors-compatibility) with
this union other than
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), or when linking
without [VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits) by providing
a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that is fully
[compatible](descriptorsets.html#descriptors-compatibility) with this union.

If the `pNext` chain includes a [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)
structure, [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)::`flags` from that
structure is used instead of `flags` from this structure.

Valid Usage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-09497) VUID-VkGraphicsPipelineCreateInfo-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) values

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07984) VUID-VkGraphicsPipelineCreateInfo-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid graphics `VkPipeline` handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07985) VUID-VkGraphicsPipelineCreateInfo-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07986) VUID-VkGraphicsPipelineCreateInfo-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07987) VUID-VkGraphicsPipelineCreateInfo-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-10069) VUID-VkGraphicsPipelineCreateInfo-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07988) VUID-VkGraphicsPipelineCreateInfo-layout-07988

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07990) VUID-VkGraphicsPipelineCreateInfo-layout-07990

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptorsets.html#VkDescriptorType),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07991) VUID-VkGraphicsPipelineCreateInfo-layout-07991

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-10391) VUID-VkGraphicsPipelineCreateInfo-None-10391

If a [resource variables](interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11798) VUID-VkGraphicsPipelineCreateInfo-flags-11798

If [shader64BitIndexing](features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pipelineCreationCacheControl-02878) VUID-VkGraphicsPipelineCreateInfo-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pipelineProtectedAccess-07368) VUID-VkGraphicsPipelineCreateInfo-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07369) VUID-VkGraphicsPipelineCreateInfo-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11311) VUID-VkGraphicsPipelineCreateInfo-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), `layout` **must**
be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11312) VUID-VkGraphicsPipelineCreateInfo-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all shader variables
in the [shader resource interface](interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::pMappings

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stage-02096) VUID-VkGraphicsPipelineCreateInfo-stage-02096

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) the `stage` member of one element
of `pStages` **must** be [VK_SHADER_STAGE_VERTEX_BIT](#VkShaderStageFlagBits)
or [VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02095) VUID-VkGraphicsPipelineCreateInfo-pStages-02095

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) the geometric shader stages provided in
`pStages` **must** be either from the mesh shading pipeline
(`stage` is [VK_SHADER_STAGE_TASK_BIT_EXT](#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits)) or from the primitive shading
pipeline (`stage` is [VK_SHADER_STAGE_VERTEX_BIT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_GEOMETRY_BIT](#VkShaderStageFlagBits))

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-09631) VUID-VkGraphicsPipelineCreateInfo-pStages-09631

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` contains both
[VK_SHADER_STAGE_TASK_BIT_EXT](#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits), then the mesh shader’s entry point
**must** not declare a variable with a `DrawIndex` `BuiltIn`
decoration

* 
[](#VUID-VkGraphicsPipelineCreateInfo-TaskNV-07063) VUID-VkGraphicsPipelineCreateInfo-TaskNV-07063

The shader stages for [VK_SHADER_STAGE_TASK_BIT_EXT](#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_MESH_BIT_EXT](#VkShaderStageFlagBits) **must** use either the `TaskNV` and
`MeshNV` `Execution` `Model` or the `TaskEXT` and `MeshEXT`
`Execution` `Model`, but **must** not use both

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00729) VUID-VkGraphicsPipelineCreateInfo-pStages-00729

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a
tessellation control shader stage, it **must** include a tessellation
evaluation shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00730) VUID-VkGraphicsPipelineCreateInfo-pStages-00730

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a
tessellation evaluation shader stage, it **must** include a tessellation
control shader stage

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-09022) VUID-VkGraphicsPipelineCreateInfo-pStages-09022

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a
tessellation control shader stage,
and the `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is not enabled
or the [VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](#VkDynamicState) dynamic state is
not set,
`pTessellationState` **must** be a valid pointer to a valid
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pTessellationState-09023) VUID-VkGraphicsPipelineCreateInfo-pTessellationState-09023

If `pTessellationState` is not `NULL` it **must** be a pointer to a
valid [VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00732) VUID-VkGraphicsPipelineCreateInfo-pStages-00732

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, the shader code of at least one stage **must** contain an
`OpExecutionMode` instruction specifying the type of subdivision in
the pipeline

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00733) VUID-VkGraphicsPipelineCreateInfo-pStages-00733

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, and the shader code of both stages contain an
`OpExecutionMode` instruction specifying the type of subdivision in
the pipeline, they **must** both specify the same subdivision mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00734) VUID-VkGraphicsPipelineCreateInfo-pStages-00734

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, the shader code of at least one stage **must** contain an
`OpExecutionMode` instruction specifying the output patch size in the
pipeline

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00735) VUID-VkGraphicsPipelineCreateInfo-pStages-00735

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes tessellation
shader stages, and the shader code of both contain an
`OpExecutionMode` instruction specifying the out patch size in the
pipeline, they **must** both specify the same patch size

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-08888) VUID-VkGraphicsPipelineCreateInfo-pStages-08888

If the pipeline is being created with
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) and [vertex input    state](#pipelines-graphics-subsets-vertex-input) and `pStages` includes tessellation shader stages,
and either [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#VkDynamicState) dynamic state is
not enabled or
[`dynamicPrimitiveTopologyUnrestricted`](limits.html#limits-dynamicPrimitiveTopologyUnrestricted)
is [VK_FALSE](fundamentals.html#VK_FALSE),
the `topology` member of `pInputAssembly` **must** be
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](drawing.html#VkPrimitiveTopology)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-topology-08889) VUID-VkGraphicsPipelineCreateInfo-topology-08889

If the pipeline is being created with
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) and [vertex input    state](#pipelines-graphics-subsets-vertex-input) and the `topology` member of `pInputAssembly` is
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](drawing.html#VkPrimitiveTopology),
and either [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#VkDynamicState) dynamic state is
not enabled or
[`dynamicPrimitiveTopologyUnrestricted`](limits.html#limits-dynamicPrimitiveTopologyUnrestricted)
is [VK_FALSE](fundamentals.html#VK_FALSE),
then `pStages` **must** include tessellation shader stages

* 
[](#VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07723) VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07723

If the pipeline is being created with a `TessellationEvaluation`
`Execution` `Model`, no `Geometry` `Execution` `Model`, uses the
`PointMode` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](features.html#features-shaderTessellationAndGeometryPointSize) feature is enabled, a
`PointSize` decorated variable **must** be written to
if the [`maintenance5`](features.html#features-maintenance5) feature is not
enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-topology-08773) VUID-VkGraphicsPipelineCreateInfo-topology-08773

If the pipeline is being created with a `Vertex` `Execution` `Model` and
no `TessellationEvaluation` or `Geometry` `Execution` `Model`, and
the `topology` member of `pInputAssembly` is
[VK_PRIMITIVE_TOPOLOGY_POINT_LIST](drawing.html#VkPrimitiveTopology),
and either [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#VkDynamicState) dynamic state is
not enabled or
[`dynamicPrimitiveTopologyUnrestricted`](limits.html#limits-dynamicPrimitiveTopologyUnrestricted)
is [VK_FALSE](fundamentals.html#VK_FALSE),
a `PointSize` decorated variable **must** be written to
if the [`maintenance5`](features.html#features-maintenance5) feature is not
enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07724) VUID-VkGraphicsPipelineCreateInfo-TessellationEvaluation-07724

If the pipeline is being created with a `TessellationEvaluation`
`Execution` `Model`, no `Geometry` `Execution` `Model`, uses the
`PointMode` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](features.html#features-shaderTessellationAndGeometryPointSize) feature is not enabled, a
`PointSize` decorated variable **must** not be written to

* 
[](#VUID-VkGraphicsPipelineCreateInfo-shaderTessellationAndGeometryPointSize-08776) VUID-VkGraphicsPipelineCreateInfo-shaderTessellationAndGeometryPointSize-08776

If the pipeline is being created with a `Geometry` `Execution` `Model`,
uses the `OutputPoints` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](features.html#features-shaderTessellationAndGeometryPointSize) feature is enabled, a
`PointSize` decorated variable **must** be written to for every vertex
emitted
if the [`maintenance5`](features.html#features-maintenance5) feature is not
enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Geometry-07726) VUID-VkGraphicsPipelineCreateInfo-Geometry-07726

If the pipeline is being created with a `Geometry` `Execution` `Model`,
uses the `OutputPoints` `Execution` `Mode`, and the
[    `shaderTessellationAndGeometryPointSize`](features.html#features-shaderTessellationAndGeometryPointSize) feature is not enabled, a
`PointSize` decorated variable **must** not be written to

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00738) VUID-VkGraphicsPipelineCreateInfo-pStages-00738

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a geometry
shader stage, and does not include any tessellation shader stages, its
shader code **must** contain an `OpExecutionMode` instruction specifying
an input primitive type that is [    compatible](shaders.html#shaders-geometry-execution) with the primitive topology specified in
`pInputAssembly`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00739) VUID-VkGraphicsPipelineCreateInfo-pStages-00739

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `pStages` includes a geometry
shader stage, and also includes tessellation shader stages, its shader
code **must** contain an `OpExecutionMode` instruction specifying an
input primitive type that is [compatible](shaders.html#shaders-geometry-execution)
with the primitive topology that is output by the tessellation stages

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00740) VUID-VkGraphicsPipelineCreateInfo-pStages-00740

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
it includes both a fragment shader and a geometry shader, and the
fragment shader code reads from an input variable that is decorated with
`PrimitiveId`, then the geometry shader code **must** write to a
matching output variable, decorated with `PrimitiveId`, in all
execution paths

* 
[](#VUID-VkGraphicsPipelineCreateInfo-PrimitiveId-06264) VUID-VkGraphicsPipelineCreateInfo-PrimitiveId-06264

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), it includes a mesh shader and the
fragment shader code reads from an input variable that is decorated with
`PrimitiveId`, then the mesh shader code **must** write to a matching
output variable, decorated with `PrimitiveId`, in all execution paths

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06038) VUID-VkGraphicsPipelineCreateInfo-renderPass-06038

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the pipeline is
being created with [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) the fragment shader **must** not read from any
input attachment that is defined as [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) in
`subpass`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-00742) VUID-VkGraphicsPipelineCreateInfo-pStages-00742

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and multiple pre-rasterization shader
stages are included in `pStages`, the shader code for the entry
points identified by those `pStages` and the rest of the state
identified by this structure **must** adhere to the pipeline linking rules
described in the [Shader Interfaces](interfaces.html#interfaces) chapter

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-04889) VUID-VkGraphicsPipelineCreateInfo-None-04889

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
the fragment shader and last
[pre-rasterization shader    stage](#pipelines-graphics-subsets-pre-rasterization) and any relevant state **must** adhere to the pipeline linking
rules described in the [Shader Interfaces](interfaces.html#interfaces) chapter

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06041) VUID-VkGraphicsPipelineCreateInfo-renderPass-06041

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and the pipeline is
being created with [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), then for each color attachment in the
subpass, if the [potential format features](formats.html#potential-format-features)
of the format of the corresponding attachment description do not contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](formats.html#VkFormatFeatureFlagBits), then the
`blendEnable` member of the corresponding element of the
`pAttachments` member of `pColorBlendState` **must** be
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-07609) VUID-VkGraphicsPipelineCreateInfo-renderPass-07609

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [fragment    output interface state](#pipelines-graphics-subsets-fragment-output), the `pColorBlendState` pointer is not
`NULL`, the `attachmentCount` member of `pColorBlendState` is
not ignored, and the subpass uses color attachments, the
`attachmentCount` member of `pColorBlendState` **must** be equal to
the `colorAttachmentCount` used to create `subpass`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04130) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04130

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and `pViewportState->pViewports`
is not dynamic, then `pViewportState->pViewports` **must** be a valid
pointer to an array of `pViewportState->viewportCount` valid
`VkViewport` structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04131) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04131

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and `pViewportState->pScissors` is
not dynamic, then `pViewportState->pScissors` **must** be a valid
pointer to an array of `pViewportState->scissorCount` `VkRect2D`
structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00749) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00749

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and the [    `wideLines`](features.html#features-wideLines) feature is not enabled, and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_LINE_WIDTH](#VkDynamicState), the `lineWidth` member of
`pRasterizationState` **must** be `1.0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizerDiscardEnable-09024) VUID-VkGraphicsPipelineCreateInfo-rasterizerDiscardEnable-09024

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
the [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState) dynamic state is
enabled or
the `rasterizerDiscardEnable` member of `pRasterizationState` is
[VK_FALSE](fundamentals.html#VK_FALSE),
and [related dynamic state is not set](#pipelines-pViewportState-null),
`pViewportState` **must** be a valid pointer to a valid
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pViewportState-09025) VUID-VkGraphicsPipelineCreateInfo-pViewportState-09025

If `pViewportState` is not `NULL` it **must** be a valid pointer to a
valid [VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09026) VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09026

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output),
and the `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](#VkDynamicState), or
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](#VkDynamicState) dynamic states is
not set, or the [alphaToOne](features.html#features-alphaToOne) feature is enabled
and [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](#VkDynamicState) is not set,
`pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09027) VUID-VkGraphicsPipelineCreateInfo-pMultisampleState-09027

If `pMultisampleState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-alphaToCoverageEnable-08891) VUID-VkGraphicsPipelineCreateInfo-alphaToCoverageEnable-08891

If the pipeline is being created with
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
the
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`alphaToCoverageEnable`
is not ignored and is [VK_TRUE](fundamentals.html#VK_TRUE), then the
[Fragment Output Interface](interfaces.html#interfaces-fragmentoutput) **must** contain a
variable for the alpha `Component` word in `Location` 0 at
`Index` 0

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09028) VUID-VkGraphicsPipelineCreateInfo-renderPass-09028

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [fragment    shader state](#pipelines-graphics-subsets-fragment-shader), and `subpass` uses a depth/stencil attachment,
and [related dynamic state is not    set](#pipelines-pDepthStencilState-null),
`pDepthStencilState` **must** be a valid pointer to a valid
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09029) VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09029

If `pDepthStencilState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09030) VUID-VkGraphicsPipelineCreateInfo-renderPass-09030

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [fragment    output interface state](#pipelines-graphics-subsets-fragment-output), and `subpass` uses color attachments,
and [related dynamic state is not    set](#pipelines-pColorBlendState-null),
`pColorBlendState` **must** be a valid pointer to a valid
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00754) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-00754

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), the [    `depthBiasClamp`](features.html#features-depthBiasClamp) feature is not enabled, no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_DEPTH_BIAS](#VkDynamicState), and the `depthBiasEnable` member
of `pRasterizationState` is [VK_TRUE](fundamentals.html#VK_TRUE), the `depthBiasClamp`
member of `pRasterizationState` **must** be `0.0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-02510) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-02510

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader),
the `[VK_EXT_depth_range_unrestricted](../appendices/extensions.html#VK_EXT_depth_range_unrestricted)` extension is not enabled
and no element of the `pDynamicStates` member of `pDynamicState`
is [VK_DYNAMIC_STATE_DEPTH_BOUNDS](#VkDynamicState), and the
`depthBoundsTestEnable` member of `pDepthStencilState` is
[VK_TRUE](fundamentals.html#VK_TRUE), the `minDepthBounds` and `maxDepthBounds` members
of `pDepthStencilState` **must** be between `0.0` and `1.0`, inclusive

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-10913) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-10913

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), no element of the `pDynamicStates` member
of `pDynamicState` is [VK_DYNAMIC_STATE_DEPTH_BOUNDS](#VkDynamicState), and
`pDynamicStates` includes
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](#VkDynamicState) or
the `depthBoundsTestEnable` member of `pDepthStencilState` is
[VK_TRUE](fundamentals.html#VK_TRUE), `minDepthBounds` **must** be less than or equal to
`maxDepthBounds`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07610) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07610

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) or [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and `rasterizationSamples` and
`sampleLocationsInfo` are not dynamic, and
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
included in the `pNext` chain of `pMultisampleState` is
[VK_TRUE](fundamentals.html#VK_TRUE), `sampleLocationsInfo.sampleLocationGridSize.width`
**must** evenly divide
[VkMultisamplePropertiesEXT](limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.width`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling `rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07611) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07611

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) or [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and `rasterizationSamples` and
`sampleLocationsInfo` are not dynamic, and
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
the included in the `pNext` chain of `pMultisampleState` is
[VK_TRUE](fundamentals.html#VK_TRUE) or [VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](#VkDynamicState) is
used, `sampleLocationsInfo.sampleLocationGridSize.height` **must**
evenly divide
[VkMultisamplePropertiesEXT](limits.html#VkMultisamplePropertiesEXT)::`maxSampleLocationGridSize.height`
as returned by [vkGetPhysicalDeviceMultisamplePropertiesEXT](limits.html#vkGetPhysicalDeviceMultisamplePropertiesEXT) with a
`samples` parameter equaling `rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07612) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07612

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) or [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and `rasterizationSamples` and
`sampleLocationsInfo` are not dynamic, and
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT)::`sampleLocationsEnable`
included in the `pNext` chain of `pMultisampleState` is
[VK_TRUE](fundamentals.html#VK_TRUE) or [VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](#VkDynamicState) is
used, `sampleLocationsInfo.sampleLocationsPerPixel` **must** equal
`rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sampleLocationsEnable-01524) VUID-VkGraphicsPipelineCreateInfo-sampleLocationsEnable-01524

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), and the `sampleLocationsEnable` member of a
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT) structure included in
the `pNext` chain of `pMultisampleState` is [VK_TRUE](fundamentals.html#VK_TRUE), the
fragment shader code **must** not statically use the extended instruction
`InterpolateAtSample`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multisampledRenderToSingleSampled-06853) VUID-VkGraphicsPipelineCreateInfo-multisampledRenderToSingleSampled-06853

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and none of the
`[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension, the
`[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension, or the
[    `multisampledRenderToSingleSampled`](features.html#features-multisampledRenderToSingleSampled) feature are enabled,
`rasterizationSamples` is not dynamic, and if `subpass` uses
color and/or depth/stencil attachments, then the
`rasterizationSamples` member of `pMultisampleState` **must** be
the same as the sample count for those subpass attachments

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-01505) VUID-VkGraphicsPipelineCreateInfo-subpass-01505

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and the
`[VK_AMD_mixed_attachment_samples](../appendices/extensions.html#VK_AMD_mixed_attachment_samples)` extension is enabled,
`rasterizationSamples` is not dynamic, and if `subpass` uses
color and/or depth/stencil attachments, then the
`rasterizationSamples` member of `pMultisampleState` **must** equal
the maximum of the sample counts of those subpass attachments

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06854) VUID-VkGraphicsPipelineCreateInfo-renderPass-06854

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
`[VK_EXT_multisampled_render_to_single_sampled](../appendices/extensions.html#VK_EXT_multisampled_render_to_single_sampled)` extension is
enabled, `rasterizationSamples` is not dynamic, and `subpass`
has a [VkMultisampledRenderToSingleSampledInfoEXT](renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT) structure
included in the [VkSubpassDescription2](renderpass.html#VkSubpassDescription2)::`pNext` chain with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](fundamentals.html#VK_TRUE),
then the `rasterizationSamples` member of `pMultisampleState`
**must** be equal to
[VkMultisampledRenderToSingleSampledInfoEXT](renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT)::`rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-01411) VUID-VkGraphicsPipelineCreateInfo-subpass-01411

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), the
`[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
`rasterizationSamples` is not dynamic, and if `subpass` has a
depth/stencil attachment and depth test, stencil test, or depth bounds
test are enabled, then the `rasterizationSamples` member of
`pMultisampleState` **must** be the same as the sample count of the
depth/stencil attachment

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-01412) VUID-VkGraphicsPipelineCreateInfo-subpass-01412

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), the
`[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled,
`rasterizationSamples` is not dynamic, and if `subpass` has any
color attachments, then the `rasterizationSamples` member of
`pMultisampleState` **must** be greater than or equal to the sample
count for those subpass attachments

* 
[](#VUID-VkGraphicsPipelineCreateInfo-coverageReductionMode-02722) VUID-VkGraphicsPipelineCreateInfo-coverageReductionMode-02722

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), the [    `coverageReductionMode`](features.html#features-coverageReductionMode) feature is enabled, and
`rasterizationSamples` is not dynamic, the coverage reduction mode
specified by
[VkPipelineCoverageReductionStateCreateInfoNV](fragops.html#VkPipelineCoverageReductionStateCreateInfoNV)::`coverageReductionMode`,
the `rasterizationSamples` member of `pMultisampleState` and the
sample counts for the color and depth/stencil attachments (if the
subpass has them) **must** be a valid combination returned by
`vkGetPhysicalDeviceSupportedFramebufferMixedSamplesCombinationsNV`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-subpass-00758) VUID-VkGraphicsPipelineCreateInfo-subpass-00758

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `rasterizationSamples` is not
dynamic, and `subpass` does not use any color and/or depth/stencil
attachments, then the `rasterizationSamples` member of
`pMultisampleState` **must** follow the rules for a
[zero-attachment subpass](renderpass.html#renderpass-noattachments)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06046) VUID-VkGraphicsPipelineCreateInfo-renderPass-06046

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `subpass` **must** be
a valid subpass within `renderPass`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06047) VUID-VkGraphicsPipelineCreateInfo-renderPass-06047

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), `subpass` viewMask is not `0`, and
`multiviewTessellationShader` is not enabled, then `pStages`
**must** not include tessellation shaders

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06048) VUID-VkGraphicsPipelineCreateInfo-renderPass-06048

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), `subpass` viewMask is not `0`, and
`multiviewGeometryShader` is not enabled, then `pStages` **must**
not include a geometry shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06050) VUID-VkGraphicsPipelineCreateInfo-renderPass-06050

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the pipeline is
being created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and `subpass` viewMask is not `0`,
then all of the shaders in the pipeline **must** not include variables
decorated with the `Layer` built-in decoration in their interfaces

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-07064) VUID-VkGraphicsPipelineCreateInfo-renderPass-07064

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), `subpass` viewMask is not `0`, and
`multiviewMeshShader` is not enabled, then `pStages` **must** not
include a mesh shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-12325) VUID-VkGraphicsPipelineCreateInfo-renderPass-12325

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), `pStages` include a mesh shader,
and `subpass` viewMask is not `0`, then the index of the most
significant bit in `viewMask` **must** be less than
[`maxMeshMultiviewViewCount`](limits.html#limits-maxMeshMultiviewViewCount)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-00764) VUID-VkGraphicsPipelineCreateInfo-flags-00764

`flags` **must** not contain the
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](#VkPipelineCreateFlagBits) flag

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-01565) VUID-VkGraphicsPipelineCreateInfo-pStages-01565

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and an input attachment was referenced by an
`aspectMask` at `renderPass` creation time, the fragment shader
**must** only read from the aspects that were specified for that input
attachment

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-01688) VUID-VkGraphicsPipelineCreateInfo-layout-01688

The number of resources in `layout` accessible to each shader stage
that is used by the pipeline **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageResources`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-01715) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-01715

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](#VkDynamicState), and the
`viewportWScalingEnable` member of a
[VkPipelineViewportWScalingStateCreateInfoNV](vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV) structure, included in
the `pNext` chain of `pViewportState`, is [VK_TRUE](fundamentals.html#VK_TRUE), the
`pViewportWScalings` member of the
[VkPipelineViewportWScalingStateCreateInfoNV](vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV) **must** be a pointer to
an array of
[VkPipelineViewportWScalingStateCreateInfoNV](vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV)::`viewportCount`
valid [VkViewportWScalingNV](vertexpostproc.html#VkViewportWScalingNV) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04056) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04056

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](#VkDynamicState), and if
`pViewportState->pNext` chain includes a
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV) structure, and
if its `exclusiveScissorCount` member is not `0`, then its
`pExclusiveScissors` member **must** be a valid pointer to an array of
`exclusiveScissorCount` [VkRect2D](fundamentals.html#VkRect2D) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07854) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07854

If [VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](#VkDynamicState) is included in the
`pDynamicStates` array then the implementation **must** support at
least `specVersion` `2` of the `[VK_NV_scissor_exclusive](../appendices/extensions.html#VK_NV_scissor_exclusive)`
extension

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04057) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04057

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](#VkDynamicState), and if
`pViewportState->pNext` chain includes a
[VkPipelineViewportShadingRateImageStateCreateInfoNV](primsrast.html#VkPipelineViewportShadingRateImageStateCreateInfoNV) structure,
then its `pShadingRatePalettes` member **must** be a valid pointer to
an array of `viewportCount` valid [VkShadingRatePaletteNV](primsrast.html#VkShadingRatePaletteNV)
structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04058) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04058

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and no element of the
`pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](#VkDynamicState), and if `pNext` chain
includes a [VkPipelineDiscardRectangleStateCreateInfoEXT](fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) structure,
and if its `discardRectangleCount` member is not `0`, then its
`pDiscardRectangles` member **must** be a valid pointer to an array of
`discardRectangleCount` [VkRect2D](fundamentals.html#VkRect2D) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07855) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07855

If [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](#VkDynamicState) is included in
the `pDynamicStates` array then the implementation **must** support at
least `specVersion` `2` of the `[VK_EXT_discard_rectangles](../appendices/extensions.html#VK_EXT_discard_rectangles)`
extension

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07856) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07856

If [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](#VkDynamicState) is included in the
`pDynamicStates` array then the implementation **must** support at
least `specVersion` `2` of the `[VK_EXT_discard_rectangles](../appendices/extensions.html#VK_EXT_discard_rectangles)`
extension

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02097) VUID-VkGraphicsPipelineCreateInfo-pStages-02097

If the pipeline requires [    vertex input state](#pipelines-graphics-subsets-vertex-input), and `pVertexInputState` is not dynamic, then
`pVertexInputState` **must** be a valid pointer to a valid
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Input-07904) VUID-VkGraphicsPipelineCreateInfo-Input-07904

If
the [    `vertexAttributeRobustness`](features.html#features-vertexAttributeRobustness) feature is not enabled, and
the [`maintenance9`](features.html#features-maintenance9) feature is not
enabled, and
the pipeline is being created with
[vertex input state](#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, then all variables with the
`Input` storage class decorated with `Location` in the `Vertex`
`Execution` `Model` `OpEntryPoint` **must** contain a location in
[VkVertexInputAttributeDescription](fxvertex.html#VkVertexInputAttributeDescription)::`location`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Input-08733) VUID-VkGraphicsPipelineCreateInfo-Input-08733

If the pipeline requires [    vertex input state](#pipelines-graphics-subsets-vertex-input) and `pVertexInputState` is not dynamic, then
the numeric type associated with all `Input` variables of the
corresponding `Location` in the `Vertex` `Execution` `Model`
`OpEntryPoint` **must** be the same as
[VkVertexInputAttributeDescription](fxvertex.html#VkVertexInputAttributeDescription)::`format`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08929) VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08929

If the pipeline is being created with
[vertex input state](#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, and
[VkVertexInputAttributeDescription](fxvertex.html#VkVertexInputAttributeDescription)::`format` has a 64-bit
component, then the scalar width associated with all `Input`
variables of the corresponding `Location` in the `Vertex`
`Execution` `Model` `OpEntryPoint` **must** be 64-bit

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08930) VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-08930

If the pipeline is being created with
[vertex input state](#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, and the scalar width associated
with a `Location` decorated `Input` variable in the `Vertex`
`Execution` `Model` `OpEntryPoint` is 64-bit, then the corresponding
[VkVertexInputAttributeDescription](fxvertex.html#VkVertexInputAttributeDescription)::`format` **must** have a
64-bit component

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-09198) VUID-VkGraphicsPipelineCreateInfo-pVertexInputState-09198

If the pipeline is being created with
[vertex input state](#pipelines-graphics-subsets-vertex-input) and
`pVertexInputState` is not dynamic, and
[VkVertexInputAttributeDescription](fxvertex.html#VkVertexInputAttributeDescription)::`format` has a 64-bit
component, then all `Input` variables at the corresponding
`Location` in the `Vertex` `Execution` `Model` `OpEntryPoint`
**must** not use components that are not present in the format

* 
[](#VUID-VkGraphicsPipelineCreateInfo-dynamicPrimitiveTopologyUnrestricted-09031) VUID-VkGraphicsPipelineCreateInfo-dynamicPrimitiveTopologyUnrestricted-09031

If the pipeline requires [    vertex input state](#pipelines-graphics-subsets-vertex-input),
and [related dynamic state is not    set](#pipelines-pInputAssemblyState-null),
`pInputAssemblyState` **must** be a valid pointer to a valid
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pInputAssemblyState-09032) VUID-VkGraphicsPipelineCreateInfo-pInputAssemblyState-09032

If `pInputAssemblyState` is not `NULL` it **must** be a valid pointer
to a valid [VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02317) VUID-VkGraphicsPipelineCreateInfo-pStages-02317

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), the `Xfb` execution mode **can** be
specified by no more than one shader stage in `pStages`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-02318) VUID-VkGraphicsPipelineCreateInfo-pStages-02318

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and any shader stage in `pStages`
specifies `Xfb` execution mode it **must** be the last
[pre-rasterization shader    stage](#pipelines-graphics-subsets-pre-rasterization)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02319) VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02319

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and a
[VkPipelineRasterizationStateStreamCreateInfoEXT](primsrast.html#VkPipelineRasterizationStateStreamCreateInfoEXT)::`rasterizationStream`
value other than zero is specified, all variables in the output
interface of the entry point being compiled decorated with
`Position`, `PointSize`, `ClipDistance`, or `CullDistance`
**must** be decorated with identical `Stream` values that match the
`rasterizationStream`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02320) VUID-VkGraphicsPipelineCreateInfo-rasterizationStream-02320

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
[VkPipelineRasterizationStateStreamCreateInfoEXT](primsrast.html#VkPipelineRasterizationStateStreamCreateInfoEXT)::`rasterizationStream`
is zero, or not specified, all variables in the output interface of the
entry point being compiled decorated with `Position`, `PointSize`,
`ClipDistance`, or `CullDistance` **must** be decorated with a
`Stream` value of zero, or **must** not specify the `Stream`
decoration

* 
[](#VUID-VkGraphicsPipelineCreateInfo-geometryStreams-02321) VUID-VkGraphicsPipelineCreateInfo-geometryStreams-02321

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and the last
[pre-rasterization shader    stage](#pipelines-graphics-subsets-pre-rasterization) is a geometry shader, and that geometry shader uses the
`GeometryStreams` capability, then
`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`geometryStreams`
feature **must** be enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-02322) VUID-VkGraphicsPipelineCreateInfo-None-02322

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and there are any mesh shader stages
in the pipeline there **must** not be any shader stage in the pipeline with
a `Xfb` execution mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-lineRasterizationMode-02766) VUID-VkGraphicsPipelineCreateInfo-lineRasterizationMode-02766

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and at least one of
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output) or [fragment shader    state](#pipelines-graphics-subsets-fragment-shader), and `pMultisampleState` is not `NULL`, the
`lineRasterizationMode` member of a
[VkPipelineRasterizationLineStateCreateInfo](primsrast.html#VkPipelineRasterizationLineStateCreateInfo) structure included in
the `pNext` chain of `pRasterizationState` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](primsrast.html#VkLineRasterizationModeEXT) or
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](primsrast.html#VkLineRasterizationModeEXT), then the
`alphaToCoverageEnable`, `alphaToOneEnable`, and
`sampleShadingEnable` members of `pMultisampleState` **must** all
be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stippledLineEnable-02767) VUID-VkGraphicsPipelineCreateInfo-stippledLineEnable-02767

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), the `stippledLineEnable` member of
[VkPipelineRasterizationLineStateCreateInfo](primsrast.html#VkPipelineRasterizationLineStateCreateInfo) is [VK_TRUE](fundamentals.html#VK_TRUE), and
no element of the `pDynamicStates` member of `pDynamicState` is
[VK_DYNAMIC_STATE_LINE_STIPPLE](#VkDynamicState), then the `lineStippleFactor`
member of [VkPipelineRasterizationLineStateCreateInfo](primsrast.html#VkPipelineRasterizationLineStateCreateInfo) **must** be in
the range [1,256]

* 
[](#VUID-VkGraphicsPipelineCreateInfo-shaderMeshEnqueue-10187) VUID-VkGraphicsPipelineCreateInfo-shaderMeshEnqueue-10187

If the [`shaderMeshEnqueue`](features.html#features-shaderMeshEnqueue) feature is
not enabled, shaders specified by `pStages` **must** not declare the
`ShaderEnqueueAMDX` capability

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-10188) VUID-VkGraphicsPipelineCreateInfo-flags-10188

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits), shaders specified by
`pStages` **must** not declare the `ShaderEnqueueAMDX` capability

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-10189) VUID-VkGraphicsPipelineCreateInfo-pStages-10189

If any shader stages in `pStages` declare the `ShaderEnqueueAMDX`
capability, [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](#VkPipelineCreateFlagBits2KHR) and
[VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits2KHR) **must** be included in
`flags`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-10190) VUID-VkGraphicsPipelineCreateInfo-flags-10190

If [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](#VkPipelineCreateFlagBits2KHR) is included in
`flags`, and the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), there **must** not be a task or vertex shader specified in
`pStages`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-10191) VUID-VkGraphicsPipelineCreateInfo-flags-10191

If [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](#VkPipelineCreateFlagBits2KHR) is included in
`flags`, all elements of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` **must** have been
created with [VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03372) VUID-VkGraphicsPipelineCreateInfo-flags-03372

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03373) VUID-VkGraphicsPipelineCreateInfo-flags-03373

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03374) VUID-VkGraphicsPipelineCreateInfo-flags-03374

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03375) VUID-VkGraphicsPipelineCreateInfo-flags-03375

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03376) VUID-VkGraphicsPipelineCreateInfo-flags-03376

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03377) VUID-VkGraphicsPipelineCreateInfo-flags-03377

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-03577) VUID-VkGraphicsPipelineCreateInfo-flags-03577

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-04947) VUID-VkGraphicsPipelineCreateInfo-flags-04947

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03378) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03378

    If
    the [`extendedDynamicState`](features.html#features-extendedDynamicState)
    feature is not enabled,
and
    the minimum value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to
    create the [VkInstance](initialization.html#VkInstance) and `apiVersion` supported by the
    physical device is less than Version 1.3
    there **must** be no element of the `pDynamicStates` member of
    `pDynamicState` set to [VK_DYNAMIC_STATE_CULL_MODE](#VkDynamicState),
    [VK_DYNAMIC_STATE_FRONT_FACE](#VkDynamicState),
    [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#VkDynamicState),
    [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState),
    [VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState),
    [VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](#VkDynamicState),
    [VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](#VkDynamicState),
    [VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](#VkDynamicState),
    [VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](#VkDynamicState),
    [VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](#VkDynamicState),
    [VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](#VkDynamicState), or
    [VK_DYNAMIC_STATE_STENCIL_OP](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03379) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03379

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState) is included in the
`pDynamicStates` array then `viewportCount` **must** be zero

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03380) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03380

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState) is included in the
`pDynamicStates` array then `scissorCount` **must** be zero

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04132) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04132

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState) is included in the
`pDynamicStates` array then [VK_DYNAMIC_STATE_VIEWPORT](#VkDynamicState) **must**
not be present

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04133) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04133

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState) is included in the
`pDynamicStates` array then [VK_DYNAMIC_STATE_SCISSOR](#VkDynamicState) **must** not
be present

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07065) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07065

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and includes a mesh shader, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#VkDynamicState), or
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04868) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04868

    If
    the [`extendedDynamicState2`](features.html#features-extendedDynamicState2)
    feature is not enabled,
and
    the minimum value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` used to
    create the [VkInstance](initialization.html#VkInstance) and `apiVersion` supported by the
    physical device is less than Version 1.3
    there **must** be no element of the `pDynamicStates` member of
    `pDynamicState` set to [VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](#VkDynamicState),
    [VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](#VkDynamicState), or
    [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04869) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04869

If the [    `extendedDynamicState2LogicOp`](features.html#features-extendedDynamicState2LogicOp) feature is not enabled, there **must**
be no element of the `pDynamicStates` member of `pDynamicState`
set to [VK_DYNAMIC_STATE_LOGIC_OP_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04870) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04870

If the [    `extendedDynamicState2PatchControlPoints`](features.html#features-extendedDynamicState2PatchControlPoints) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07066) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07066

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and includes a mesh shader, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](#VkDynamicState), or
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-02877) VUID-VkGraphicsPipelineCreateInfo-flags-02877

If `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-02966) VUID-VkGraphicsPipelineCreateInfo-flags-02966

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `flags` includes
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits), then all stages **must**
not specify `Xfb` execution mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-libraryCount-06648) VUID-VkGraphicsPipelineCreateInfo-libraryCount-06648

If the pipeline is not created with a
[complete set of state](#pipelines-graphics-subsets-complete),
or [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`libraryCount` is not `0`,
[VkGraphicsPipelineShaderGroupsCreateInfoNV](#VkGraphicsPipelineShaderGroupsCreateInfoNV)::`groupCount` and
[VkGraphicsPipelineShaderGroupsCreateInfoNV](#VkGraphicsPipelineShaderGroupsCreateInfoNV)::`pipelineCount`
**must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-libraryCount-06649) VUID-VkGraphicsPipelineCreateInfo-libraryCount-06649

If the pipeline is created with a [    complete set of state](#pipelines-graphics-subsets-complete),
and [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`libraryCount` is `0`,
and the `pNext` chain includes an instance of
[VkGraphicsPipelineShaderGroupsCreateInfoNV](#VkGraphicsPipelineShaderGroupsCreateInfoNV),
[VkGraphicsPipelineShaderGroupsCreateInfoNV](#VkGraphicsPipelineShaderGroupsCreateInfoNV)::`groupCount` **must**
be greater than `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11000) VUID-VkGraphicsPipelineCreateInfo-flags-11000

If `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](#VkPipelineCreateFlagBits2KHR), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11001) VUID-VkGraphicsPipelineCreateInfo-flags-11001

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and `flags` includes
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](#VkPipelineCreateFlagBits2KHR), then all stages
**must** not specify `Xfb` execution mode

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04494) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04494

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.width`
**must** be greater than or equal to `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04495) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04495

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.height`
**must** be greater than or equal to `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04496) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04496

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.width`
**must** be a power-of-two value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04497) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04497

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.height`
**must** be a power-of-two value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04498) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04498

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.width`
**must** be less than or equal to `4`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04499) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04499

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.height`
**must** be less than or equal to `4`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04500) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04500

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and the
[    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.width`
and
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.height`
**must** both be equal to `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06567) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06567

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`combinerOps`[0]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06568) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06568

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`combinerOps`[1]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04501) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04501

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and the
[    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`combinerOps`[0]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04502) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04502

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and the
[    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`combinerOps`[1]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04503) VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04503

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and the
[    `primitiveFragmentShadingRateWithMultipleViewports`](limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)::`viewportCount` is greater
than `1`, entry points specified in `pStages` **must** not write to the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04504) VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04504

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and the
[    `primitiveFragmentShadingRateWithMultipleViewports`](limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, and entry points specified in `pStages` write to the
`ViewportIndex` built-in, they **must** not also write to the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04505) VUID-VkGraphicsPipelineCreateInfo-primitiveFragmentShadingRateWithMultipleViewports-04505

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and the
[    `primitiveFragmentShadingRateWithMultipleViewports`](limits.html#limits-primitiveFragmentShadingRateWithMultipleViewports) limit is not
supported, and entry points specified in `pStages` write to the
`ViewportMaskNV` built-in, they **must** not also write to the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04506) VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04506

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
the [    `fragmentShadingRateNonTrivialCombinerOps`](limits.html#limits-fragmentShadingRateNonTrivialCombinerOps) limit is not supported,
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, elements of
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`combinerOps`
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-06569) VUID-VkGraphicsPipelineCreateInfo-None-06569

 If the pipeline requires [     fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`shadingRateType`
**must** be a valid [VkFragmentShadingRateTypeNV](primsrast.html#VkFragmentShadingRateTypeNV) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06570) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06570

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`shadingRate`
**must** be a valid [VkFragmentShadingRateNV](primsrast.html#VkFragmentShadingRateNV) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06571) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06571

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`combinerOps`[0]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06572) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-06572

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`combinerOps`[1]
**must** be a valid [VkFragmentShadingRateCombinerOpKHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04569) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04569

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and the
[`fragmentShadingRateEnums`](features.html#features-fragmentShadingRateEnums)
feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`shadingRateType`
**must** be equal to [VK_FRAGMENT_SHADING_RATE_TYPE_FRAGMENT_SIZE_NV](primsrast.html#VkFragmentShadingRateTypeNV)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04570) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04570

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and the
[    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`shadingRate`
**must** be equal to
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV](primsrast.html#VkFragmentShadingRateNV)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04571) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04571

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and the
[    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`combinerOps`[0]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04572) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-04572

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, and the
[    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`combinerOps`[1]
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04573) VUID-VkGraphicsPipelineCreateInfo-fragmentShadingRateNonTrivialCombinerOps-04573

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), and the
[    `fragmentShadingRateNonTrivialCombinerOps`](limits.html#limits-fragmentShadingRateNonTrivialCombinerOps) limit is not supported
and [VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) is not included in
`pDynamicState->pDynamicStates`, elements of
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`combinerOps`
**must** be [VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-04574) VUID-VkGraphicsPipelineCreateInfo-None-04574

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), and the
[    `supersampleFragmentShadingRates`](features.html#features-supersampleFragmentShadingRates) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`shadingRate`
**must** not be equal to
[VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV](primsrast.html#VkFragmentShadingRateNV),
[VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV](primsrast.html#VkFragmentShadingRateNV),
[VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV](primsrast.html#VkFragmentShadingRateNV), or
[VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV](primsrast.html#VkFragmentShadingRateNV)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-04575) VUID-VkGraphicsPipelineCreateInfo-None-04575

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), and the
[    `noInvocationFragmentShadingRates`](features.html#features-noInvocationFragmentShadingRates) feature is not enabled,
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)::`shadingRate`
**must** not be equal to [VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](primsrast.html#VkFragmentShadingRateNV)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03578) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-03578

All elements of the `pDynamicStates` member of `pDynamicState`
**must** not be [VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04807) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04807

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) and the
[`vertexInputDynamicState`](features.html#features-vertexInputDynamicState)
feature is not enabled, there **must** be no element of the
`pDynamicStates` member of `pDynamicState` set to
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07067) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07067

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and includes a mesh shader, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04800) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-04800

If the [`colorWriteEnable`](features.html#features-colorWriteEnable) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-rasterizationSamples-04899) VUID-VkGraphicsPipelineCreateInfo-rasterizationSamples-04899

    If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), and
    the `[VK_QCOM_render_pass_shader_resolve](../appendices/extensions.html#VK_QCOM_render_pass_shader_resolve)` extension
or
    the [`customResolve`](features.html#features-customResolve) feature
    is enabled, `rasterizationSamples` is not dynamic, and if subpass
    has any input attachments, and if the subpass description contains
    [VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](renderpass.html#VkSubpassDescriptionFlagBits), then the sample
    count of the input attachments **must** equal `rasterizationSamples`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sampleShadingEnable-04900) VUID-VkGraphicsPipelineCreateInfo-sampleShadingEnable-04900

    If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), and
    the `[VK_QCOM_render_pass_shader_resolve](../appendices/extensions.html#VK_QCOM_render_pass_shader_resolve)` extension
or
    the [`customResolve`](features.html#features-customResolve) feature
    is enabled, and if the subpass description contains
    [VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](renderpass.html#VkSubpassDescriptionFlagBits), then
    `sampleShadingEnable` **must** be false

* 
[](#VUID-VkGraphicsPipelineCreateInfo-dynamicRendering-06576) VUID-VkGraphicsPipelineCreateInfo-dynamicRendering-06576

If the [`dynamicRendering`](features.html#features-dynamicRendering) feature is
not enabled and the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), [fragment shader    state](#pipelines-graphics-subsets-fragment-shader), or [fragment    output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multiview-06577) VUID-VkGraphicsPipelineCreateInfo-multiview-06577

If the [`multiview`](features.html#features-multiview) feature is not enabled,
the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization),
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
or [fragment output    interface state](#pipelines-graphics-subsets-fragment-output), and `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` **must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06578) VUID-VkGraphicsPipelineCreateInfo-renderPass-06578

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization),
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
or [fragment output    interface state](#pipelines-graphics-subsets-fragment-output), and `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
index of the most significant bit in
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` **must** be less than
[`maxMultiviewViewCount`](devsandqueues.html#limits-maxMultiviewViewCount)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06579) VUID-VkGraphicsPipelineCreateInfo-renderPass-06579

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount` is not
0, [VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats`
**must** be a valid pointer to an array of `colorAttachmentCount` valid
[VkFormat](formats.html#VkFormat) values

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06580) VUID-VkGraphicsPipelineCreateInfo-renderPass-06580

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), each element of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` **must**
be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06582) VUID-VkGraphicsPipelineCreateInfo-renderPass-06582

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and any element of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` is
not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), that format **must** be a format with
[potential format features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)
or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06583) VUID-VkGraphicsPipelineCreateInfo-renderPass-06583

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` **must**
be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06584) VUID-VkGraphicsPipelineCreateInfo-renderPass-06584

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` **must**
be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06585) VUID-VkGraphicsPipelineCreateInfo-renderPass-06585

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` is not
[VK_FORMAT_UNDEFINED](formats.html#VkFormat), it **must** be a format with
[potential format features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06586) VUID-VkGraphicsPipelineCreateInfo-renderPass-06586

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` is
not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it **must** be a format with
[potential format features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06587) VUID-VkGraphicsPipelineCreateInfo-renderPass-06587

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` is not
[VK_FORMAT_UNDEFINED](formats.html#VkFormat), it **must** be a format that includes a depth
component

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06588) VUID-VkGraphicsPipelineCreateInfo-renderPass-06588

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` is
not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it **must** be a format that includes a
stencil component

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06589) VUID-VkGraphicsPipelineCreateInfo-renderPass-06589

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` is not
[VK_FORMAT_UNDEFINED](formats.html#VkFormat), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` is
not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), `depthAttachmentFormat` **must** equal
`stencilAttachmentFormat`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09033) VUID-VkGraphicsPipelineCreateInfo-renderPass-09033

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [fragment    shader state](#pipelines-graphics-subsets-fragment-shader) and [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and either of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` or
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` are
not [VK_FORMAT_UNDEFINED](formats.html#VkFormat),
and the `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_STENCIL_OP](#VkDynamicState), or
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](#VkDynamicState) dynamic states are not set,
`pDepthStencilState` **must** be a valid pointer to a valid
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09034) VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09034

If `pDepthStencilState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09035) VUID-VkGraphicsPipelineCreateInfo-renderPass-09035

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the pipeline is being
created with [fragment    shader state](#pipelines-graphics-subsets-fragment-shader) but not [    fragment output interface state](#pipelines-graphics-subsets-fragment-output),
and the `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is not
enabled, or any of the [VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](#VkDynamicState),
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](#VkDynamicState),
[VK_DYNAMIC_STATE_STENCIL_OP](#VkDynamicState), or
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](#VkDynamicState) dynamic states are not set,
`pDepthStencilState` **must** be a valid pointer to a valid
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09036) VUID-VkGraphicsPipelineCreateInfo-pDepthStencilState-09036

If `pDepthStencilState` is not `NULL` it **must** be a valid pointer to
a valid [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09037) VUID-VkGraphicsPipelineCreateInfo-renderPass-09037

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [fragment    output interface state](#pipelines-graphics-subsets-fragment-output), and any element of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats` is
not [VK_FORMAT_UNDEFINED](formats.html#VkFormat),
and the `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is not
enabled, or any of the [VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](#VkDynamicState), or
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](#VkDynamicState) dynamic states are not set,
`pColorBlendState` **must** be a valid pointer to a valid
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pColorBlendState-09038) VUID-VkGraphicsPipelineCreateInfo-pColorBlendState-09038

If `pColorBlendState` is not `NULL` it **must** be a valid pointer to a
valid [VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06055) VUID-VkGraphicsPipelineCreateInfo-renderPass-06055

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pColorBlendState` is
not dynamic, and the pipeline is being created with
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `pColorBlendState->attachmentCount` **must** be equal to
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-11504) VUID-VkGraphicsPipelineCreateInfo-renderPass-11504

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), a
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) is in the pNext chain, and the
pipeline is being created with
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), [VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`
**must** be equal to
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06057) VUID-VkGraphicsPipelineCreateInfo-renderPass-06057

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization),
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` is not `0`, and the
[`multiviewTessellationShader`](features.html#features-multiview-tess) feature
is not enabled, then `pStages` **must** not include tessellation
shaders

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06058) VUID-VkGraphicsPipelineCreateInfo-renderPass-06058

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization),
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` is not `0`, and the
[`multiviewGeometryShader`](features.html#features-multiview-gs) feature is not
enabled, then `pStages` **must** not include a geometry shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06059) VUID-VkGraphicsPipelineCreateInfo-renderPass-06059

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` is not `0`, all of
the shaders in the pipeline **must** not include variables decorated with
the `Layer` built-in decoration in their interfaces

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-07720) VUID-VkGraphicsPipelineCreateInfo-renderPass-07720

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), and
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` is not `0`, and
`multiviewMeshShader` is not enabled, then `pStages` **must** not
include a mesh shader

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-12326) VUID-VkGraphicsPipelineCreateInfo-renderPass-12326

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), `pStages` include a mesh shader,
and [VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` is not `0`, then
the index of the most significant bit in `viewMask` **must** be less
than [    `maxMeshMultiviewViewCount`](limits.html#limits-maxMeshMultiviewViewCount)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06061) VUID-VkGraphicsPipelineCreateInfo-renderPass-06061

If
the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), and `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
fragment shaders in `pStages` **must** not include the
`InputAttachment` capability

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-08710) VUID-VkGraphicsPipelineCreateInfo-renderPass-08710

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and `renderPass` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), fragment shaders in `pStages` **must** not
include any of the `TileImageColorReadAccessEXT`,
`TileImageDepthReadAccessEXT`, or `TileImageStencilReadAccessEXT`
capabilities

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06062) VUID-VkGraphicsPipelineCreateInfo-renderPass-06062

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output) and `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), for each color attachment format defined by the
`pColorAttachmentFormats` member of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo), if its
[potential format features](formats.html#potential-format-features) do not contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BLEND_BIT](formats.html#VkFormatFeatureFlagBits), then the
`blendEnable` member of the corresponding element of the
`pAttachments` member of `pColorBlendState` **must** be
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06063) VUID-VkGraphicsPipelineCreateInfo-renderPass-06063

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output) and `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), if the `pNext` chain includes
[VkAttachmentSampleCountInfoAMD](cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
`VkAttachmentSampleCountInfoNV`, the `colorAttachmentCount`
member of that structure **must** be equal to the value of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06591) VUID-VkGraphicsPipelineCreateInfo-flags-06591

If `pStages` includes a fragment shader stage, and the fragment
shader declares the `EarlyFragmentTests` execution mode, the
`flags` member of [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) **must**
not include
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits)
or
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06482) VUID-VkGraphicsPipelineCreateInfo-flags-06482

If
the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and the `flags` member of
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) includes
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](framebuffer.html#VkPipelineColorBlendStateCreateFlagBits),
`renderPass` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-09526) VUID-VkGraphicsPipelineCreateInfo-None-09526

If
the [    `dynamicRenderingLocalRead`](features.html#features-dynamicRenderingLocalRead) feature is not enabled,
the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), and the `flags` member of
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) includes
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits)
or
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits),
`renderPass` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pColorAttachmentSamples-06592) VUID-VkGraphicsPipelineCreateInfo-pColorAttachmentSamples-06592

If the [fragment output    interface state](#pipelines-graphics-subsets-fragment-output), elements of the `pColorAttachmentSamples` member
of [VkAttachmentSampleCountInfoAMD](cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](cmdbuffers.html#VkAttachmentSampleCountInfoNV) **must** be valid
[VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) values

* 
[](#VUID-VkGraphicsPipelineCreateInfo-depthStencilAttachmentSamples-06593) VUID-VkGraphicsPipelineCreateInfo-depthStencilAttachmentSamples-06593

If the [fragment output    interface state](#pipelines-graphics-subsets-fragment-output) and the `depthStencilAttachmentSamples` member of
[VkAttachmentSampleCountInfoAMD](cmdbuffers.html#VkAttachmentSampleCountInfoAMD) or
[VkAttachmentSampleCountInfoNV](cmdbuffers.html#VkAttachmentSampleCountInfoNV) is not 0, it **must** be a valid
[VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09527) VUID-VkGraphicsPipelineCreateInfo-renderPass-09527

If the pipeline requires [    fragment output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and the `flags` member of
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) includes
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](framebuffer.html#VkPipelineColorBlendStateCreateFlagBits)
`subpass` **must** have been created with
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_COLOR_ACCESS_BIT_EXT](renderpass.html#VkSubpassDescriptionFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09528) VUID-VkGraphicsPipelineCreateInfo-renderPass-09528

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and the `flags` member of
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) includes
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits),
`subpass` **must** have been created with
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](renderpass.html#VkSubpassDescriptionFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09529) VUID-VkGraphicsPipelineCreateInfo-renderPass-09529

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader), `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and the `flags` member of
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) includes
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](fragops.html#VkPipelineDepthStencilStateCreateFlagBits),
`subpass` **must** have been created with
[VK_SUBPASS_DESCRIPTION_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](renderpass.html#VkSubpassDescriptionFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pipelineStageCreationFeedbackCount-06594) VUID-VkGraphicsPipelineCreateInfo-pipelineStageCreationFeedbackCount-06594

If
[VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be equal to `stageCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06595) VUID-VkGraphicsPipelineCreateInfo-renderPass-06595

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline is being
created with [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
and
[VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX)::`perViewAttributesPositionXOnly`
is [VK_TRUE](fundamentals.html#VK_TRUE) then
[VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX)::`perViewAttributes` **must**
also be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06596) VUID-VkGraphicsPipelineCreateInfo-flags-06596

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
only one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes the other flag, the value of
[VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX)::`perViewAttributes`
specified in both this pipeline and the library **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06597) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06597

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), the value of
[VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX)::`perViewAttributes`
specified in both libraries **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06598) VUID-VkGraphicsPipelineCreateInfo-flags-06598

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
only one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes the other flag, the value of
[VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX)::`perViewAttributesPositionXOnly`
specified in both this pipeline and the library **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06599) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06599

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), the value of
[VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX)::`perViewAttributesPositionXOnly`
specified in both libraries **must** be equal

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06600) VUID-VkGraphicsPipelineCreateInfo-pStages-06600

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
`pStages` **must** be a valid pointer to an array of `stageCount`
valid [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stageCount-09587) VUID-VkGraphicsPipelineCreateInfo-stageCount-09587

If the pipeline does not require
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) or [fragment shader    state](#pipelines-graphics-subsets-fragment-shader), `stageCount` **must** be zero

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-06601) VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-06601

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization),
and [related dynamic state is not    set](#pipelines-pRasterizationState-null),
`pRasterizationState` **must** be a valid pointer to a valid
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09039) VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09039

If
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and
[related dynamic state is not set](#pipelines-pMultisampleState-null),
then `pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09040) VUID-VkGraphicsPipelineCreateInfo-pRasterizationState-09040

If `pRasterizationState` is not `NULL` it **must** be a valid pointer
to a valid [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-06602) VUID-VkGraphicsPipelineCreateInfo-layout-06602

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) or
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization),
and [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
`layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-06603) VUID-VkGraphicsPipelineCreateInfo-renderPass-06603

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization),
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
or [fragment output    state](#pipelines-graphics-subsets-fragment-output),
and `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`renderPass` **must** be a valid [VkRenderPass](renderpass.html#VkRenderPass) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stageCount-09530) VUID-VkGraphicsPipelineCreateInfo-stageCount-09530

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), `stageCount` **must** be greater than
`0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-graphicsPipelineLibrary-06606) VUID-VkGraphicsPipelineCreateInfo-graphicsPipelineLibrary-06606

    If the [    `graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary) feature is not enabled,
and if
    the [`shaderMeshEnqueue`](features.html#features-shaderMeshEnqueue) feature is
    not enabled,
    `flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06608) VUID-VkGraphicsPipelineCreateInfo-flags-06608

If the [`shaderMeshEnqueue`](features.html#features-shaderMeshEnqueue) feature is
not enabled, and
the pipeline is being created with
[all possible state subsets](#pipelines-graphics-subsets-complete),
`flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06609) VUID-VkGraphicsPipelineCreateInfo-flags-06609

If `flags` includes
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits), pipeline
libraries included via [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) **must** have
been created with
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-09245) VUID-VkGraphicsPipelineCreateInfo-flags-09245

If `flags` includes
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#VkPipelineCreateFlagBits),
`flags` **must** also include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06610) VUID-VkGraphicsPipelineCreateInfo-flags-06610

If `flags` includes
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#VkPipelineCreateFlagBits),
pipeline libraries included via [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)
**must** have been created with
[VK_PIPELINE_CREATE_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06611) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06611

Any pipeline libraries included via
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` **must** not include
any [state subset](#pipelines-graphics-subsets) already defined by this
structure or defined by any other pipeline library in
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06612) VUID-VkGraphicsPipelineCreateInfo-flags-06612

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes the other flag, and `layout` was not created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), then the
`layout` used by this pipeline and the library **must** be *identically
defined*

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06613) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06613

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and the
`layout` specified by either library was not created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), then the
`layout` used by each library **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06614) VUID-VkGraphicsPipelineCreateInfo-flags-06614

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), an element
of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes the
other subset, and `layout` was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), then the
`layout` used by the library **must** also have been created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06615) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06615

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and the
`layout` specified by either library was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), then the
`layout` used by both libraries **must** have been created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06616) VUID-VkGraphicsPipelineCreateInfo-flags-06616

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), an element
of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes the
other subset, and `layout` was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), elements of
the `pSetLayouts` array which `layout` was created with that are
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined) to the element at
the same index of `pSetLayouts` used to create the library’s
`layout`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06617) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06617

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and the
`layout` specified by either library was created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), elements of
the `pSetLayouts` array which either `layout` was created with
that are not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined) to the element at
the same index of `pSetLayouts` used to create the other library’s
`layout`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06618) VUID-VkGraphicsPipelineCreateInfo-flags-06618

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes the other flag, any descriptor set layout *N* specified by
`layout` in both this pipeline and the library which include
bindings accessed by shader stages in each **must** be *identically
defined*

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06619) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06619

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), any
descriptor set layout *N* specified by `layout` in both libraries
which include bindings accessed by shader stages in each **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06620) VUID-VkGraphicsPipelineCreateInfo-flags-06620

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes the other flag, push constants specified in `layout` in
both this pipeline and the library which are available to shader stages
in each **must** be [identically defined](../appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06621) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06621

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), and
one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), push
constants specified in `layout` in both this pipeline and the
library which are available to shader stages in each **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06679) VUID-VkGraphicsPipelineCreateInfo-flags-06679

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), and
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), an element
of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes the
other subset, [VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits)
was not used, and any element of the `pSetLayouts` array when
`layout` was created and the corresponding element of the
`pSetLayouts` array used to create the library’s `layout` **must**
not both be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06681) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06681

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits) was not used,
and any element of the `pSetLayouts` array used to create each
library’s `layout` was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then the corresponding
element of the `pSetLayouts` array used to create the other
library’s `layout` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06756) VUID-VkGraphicsPipelineCreateInfo-flags-06756

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), an element
of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes the
other subset, and any element of the `pSetLayouts` array which
`layout` was created with was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then the
corresponding element of the `pSetLayouts` array used to create the
library’s `layout` **must** not have shader bindings for shaders in the
other subset

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06757) VUID-VkGraphicsPipelineCreateInfo-flags-06757

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes only
one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), an element
of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes the
other subset, and any element of the `pSetLayouts` array used to
create the library’s `layout` was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then the
corresponding element of the `pSetLayouts` array used to create this
pipeline’s `layout` **must** not have shader bindings for shaders in
the other subset

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06758) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06758

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and any
element of the `pSetLayouts` array used to create each library’s
`layout` was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then the corresponding element of
the `pSetLayouts` array used to create the other library’s
`layout` **must** not have shader bindings for shaders in the other
subset

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06682) VUID-VkGraphicsPipelineCreateInfo-flags-06682

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), and
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes both
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), `layout`
**must** have been created with no elements of the `pSetLayouts` array
set to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06683) VUID-VkGraphicsPipelineCreateInfo-flags-06683

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and `pRasterizationState->rasterizerDiscardEnable` is [VK_TRUE](fundamentals.html#VK_TRUE),
`layout` **must** have been created with no elements of the
`pSetLayouts` array set to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06684) VUID-VkGraphicsPipelineCreateInfo-flags-06684

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and an element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes one of the other flags, the value of `subpass` **must** be
equal to that used to create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06623) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06623

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes at least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and another element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes one of
the other flags, the value of `subpass` used to create each library
**must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderpass-06624) VUID-VkGraphicsPipelineCreateInfo-renderpass-06624

If `renderpass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and an element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes one of the other flags, `renderPass` **must** be compatible
with that used to create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderpass-06625) VUID-VkGraphicsPipelineCreateInfo-renderpass-06625

If `renderpass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and an element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes one of the other flags, the value of `renderPass` used to
create that library **must** also be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06626) VUID-VkGraphicsPipelineCreateInfo-flags-06626

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes at
least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes one of the other flags, and `renderPass` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the value of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` used by this
pipeline and that specified by the library **must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06627) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06627

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes at least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
another element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes one of
the other flags, and `renderPass` was [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) for both
libraries, the value of
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` set by each library
**must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06628) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06628

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes at least one of and no more than two of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and another element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes one of
the other flags, the `renderPass` objects used to create each
library **must** be compatible or all equal to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderpass-06631) VUID-VkGraphicsPipelineCreateInfo-renderpass-06631

If `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline requires
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
and the `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](#VkDynamicState), or
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](#VkDynamicState) dynamic states is
not set, or the [alphaToOne](features.html#features-alphaToOne) feature is enabled
and [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](#VkDynamicState) is not set,
then `pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-Input-06632) VUID-VkGraphicsPipelineCreateInfo-Input-06632

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) with a fragment shader that either enables
[sample shading](primsrast.html#primsrast-sampleshading) or decorates any variable in
the `Input` storage class with `Sample`,
and the `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` extension is not enabled
or any of the [VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](#VkDynamicState),
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](#VkDynamicState), or
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](#VkDynamicState) dynamic states is
not set, or the [alphaToOne](features.html#features-alphaToOne) feature is enabled
and [VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](#VkDynamicState) is not set,
then `pMultisampleState` **must** be a valid pointer to a valid
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11856) VUID-VkGraphicsPipelineCreateInfo-flags-11856

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) is included and
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` is
[VK_TRUE](fundamentals.html#VK_TRUE), and an element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), the library
**must** also include [VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) and the
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` specified by the
library **must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11857) VUID-VkGraphicsPipelineCreateInfo-flags-11857

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) is not included or
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` is
[VK_FALSE](fundamentals.html#VK_FALSE), and an element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), either the
library **must** not include [VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) or the
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` specified by the
library **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-customResolve-11858) VUID-VkGraphicsPipelineCreateInfo-customResolve-11858

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) includes either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) is included and
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` is
[VK_TRUE](fundamentals.html#VK_TRUE), and another element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), the other
library **must** also include [VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) and the
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` specified by the
library **must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-customResolve-11859) VUID-VkGraphicsPipelineCreateInfo-customResolve-11859

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) includes either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) is not included or
[VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` is
[VK_FALSE](fundamentals.html#VK_FALSE), and another element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` also includes
either
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), either the
other library **must** not include [VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT) or
the [VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT)::`customResolve` specified by
the library **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06633) VUID-VkGraphicsPipelineCreateInfo-flags-06633

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) with a
`pMultisampleState` that was not `NULL`, and an element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
`pMultisampleState` **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06634) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06634

If an element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) with a
`pMultisampleState` that was not `NULL`, and if
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
`pMultisampleState` **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06635) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06635

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) with a
`pMultisampleState` that was not `NULL`, and if a different element
of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` was created
with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
the `pMultisampleState` used to create each library **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06636) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06636

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
a value of `pMultisampleState->sampleShadingEnable` equal
[VK_TRUE](fundamentals.html#VK_TRUE), and if a different element of
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), the
`pMultisampleState` used to create each library **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06637) VUID-VkGraphicsPipelineCreateInfo-flags-06637

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
`pMultisampleState->sampleShadingEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), and an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` was
created with [VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
`pMultisampleState` **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-09567) VUID-VkGraphicsPipelineCreateInfo-pLibraries-09567

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
was created with
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
a value of `pMultisampleState->sampleShadingEnable` equal
[VK_TRUE](fundamentals.html#VK_TRUE), and if
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
`pMultisampleState` **must** be
[identically defined](../appendices/glossary.html#glossary-identically-defined) to that used to
create the library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06638) VUID-VkGraphicsPipelineCreateInfo-flags-06638

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
only one of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and an
element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes the other flag, values specified in
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR) for both this
pipeline and that library **must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06639) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06639

If one element of [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`
includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) and
another element includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), values
specified in [VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR) for
both this pipeline and that library **must** be identical

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06640) VUID-VkGraphicsPipelineCreateInfo-flags-06640

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
`pStages` **must** be a valid pointer to an array of `stageCount`
valid [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06642) VUID-VkGraphicsPipelineCreateInfo-flags-06642

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), `layout`
**must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06643) VUID-VkGraphicsPipelineCreateInfo-flags-06643

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `renderPass` **must**
be a valid [VkRenderPass](renderpass.html#VkRenderPass) handle

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06644) VUID-VkGraphicsPipelineCreateInfo-flags-06644

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) or
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
`stageCount` **must** be greater than `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06645) VUID-VkGraphicsPipelineCreateInfo-flags-06645

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` is
non-zero, if `flags` includes
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits), any
libraries **must** have also been created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06646) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06646

If [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes more
than one library, and any library was created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits), all
libraries **must** have also been created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pLibraries-06647) VUID-VkGraphicsPipelineCreateInfo-pLibraries-06647

If [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries` includes at
least one library,
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` is non-zero,
and any library was created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits),
`flags` **must** include
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-07826) VUID-VkGraphicsPipelineCreateInfo-None-07826

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
the pipeline includes a [complete    set of state](#pipelines-graphics-subsets-complete), and there are no libraries included in
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR)::`pLibraries`, then
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) **must** be a valid pipeline layout

* 
[](#VUID-VkGraphicsPipelineCreateInfo-layout-07827) VUID-VkGraphicsPipelineCreateInfo-layout-07827

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
the pipeline includes a [complete    set of state](#pipelines-graphics-subsets-complete) specified entirely by libraries, and each library was
created with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) created without
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), then
`layout` **must** be [compatible](descriptorsets.html#descriptors-compatibility) with the
layouts in those libraries

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06729) VUID-VkGraphicsPipelineCreateInfo-flags-06729

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
`flags` includes
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits), the pipeline
includes a [complete set of    state](#pipelines-graphics-subsets-complete) specified entirely by libraries, and each library was created
with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), then
`layout` **must** be [compatible](descriptorsets.html#descriptors-compatibility) with the
union of the libraries' pipeline layouts other than the
inclusion/exclusion of
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-06730) VUID-VkGraphicsPipelineCreateInfo-flags-06730

If
[VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not include
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
`flags` does not include
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](#VkPipelineCreateFlagBits), the pipeline
includes a [complete set of    state](#pipelines-graphics-subsets-complete) specified entirely by libraries, and each library was created
with a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](descriptorsets.html#VkPipelineLayoutCreateFlagBits), then
`layout` **must** be [compatible](descriptorsets.html#descriptors-compatibility) with the
union of the libraries' pipeline layouts

* 
[](#VUID-VkGraphicsPipelineCreateInfo-conservativePointAndLineRasterization-08892) VUID-VkGraphicsPipelineCreateInfo-conservativePointAndLineRasterization-08892

If [    `conservativePointAndLineRasterization`](limits.html#limits-conservativePointAndLineRasterization) is not supported and the
[effective rasterization input    topology](drawing.html#drawing-rasterization-input-topology) is in line or point topology class, then
[VkPipelineRasterizationConservativeStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationConservativeStateCreateInfoEXT)::`conservativeRasterizationMode`
**must** be [VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](primsrast.html#VkConservativeRasterizationModeEXT)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06894) VUID-VkGraphicsPipelineCreateInfo-pStages-06894

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization) but not
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
elements of `pStages` **must** not have `stage` set to
[VK_SHADER_STAGE_FRAGMENT_BIT](#VkShaderStageFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06895) VUID-VkGraphicsPipelineCreateInfo-pStages-06895

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) but not
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), elements of `pStages` **must** not have `stage` set to a
shader stage which participates in pre-rasterization

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-06896) VUID-VkGraphicsPipelineCreateInfo-pStages-06896

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), all elements of `pStages` **must**
have a `stage` set to a shader stage which participates in
[fragment shader state](#pipelines-graphics-subsets-fragment-shader) or
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-stage-06897) VUID-VkGraphicsPipelineCreateInfo-stage-06897

If the pipeline requires [    fragment shader state](#pipelines-graphics-subsets-fragment-shader) and/or
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), any value of `stage` **must** not be set in more than one
element of `pStages`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3TessellationDomainOrigin-07370) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3TessellationDomainOrigin-07370

If the [    `extendedDynamicState3TessellationDomainOrigin`](features.html#features-extendedDynamicState3TessellationDomainOrigin) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClampEnable-07371) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClampEnable-07371

If the [    `extendedDynamicState3DepthClampEnable`](features.html#features-extendedDynamicState3DepthClampEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3PolygonMode-07372) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3PolygonMode-07372

If the [    `extendedDynamicState3PolygonMode`](features.html#features-extendedDynamicState3PolygonMode) feature is not enabled, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_POLYGON_MODE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationSamples-07373) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationSamples-07373

If the [    `extendedDynamicState3RasterizationSamples`](features.html#features-extendedDynamicState3RasterizationSamples) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleMask-07374) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleMask-07374

If the [    `extendedDynamicState3SampleMask`](features.html#features-extendedDynamicState3SampleMask) feature is not enabled, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToCoverageEnable-07375) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToCoverageEnable-07375

If the [    `extendedDynamicState3AlphaToCoverageEnable`](features.html#features-extendedDynamicState3AlphaToCoverageEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToOneEnable-07376) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3AlphaToOneEnable-07376

If the [    `extendedDynamicState3AlphaToOneEnable`](features.html#features-extendedDynamicState3AlphaToOneEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LogicOpEnable-07377) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LogicOpEnable-07377

If the [    `extendedDynamicState3LogicOpEnable`](features.html#features-extendedDynamicState3LogicOpEnable) feature is not enabled, there
**must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEnable-07378) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEnable-07378

If the [    `extendedDynamicState3ColorBlendEnable`](features.html#features-extendedDynamicState3ColorBlendEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEquation-07379) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendEquation-07379

If the [    `extendedDynamicState3ColorBlendEquation`](features.html#features-extendedDynamicState3ColorBlendEquation) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorWriteMask-07380) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorWriteMask-07380

If the [    `extendedDynamicState3ColorWriteMask`](features.html#features-extendedDynamicState3ColorWriteMask) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationStream-07381) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RasterizationStream-07381

If the [    `extendedDynamicState3RasterizationStream`](features.html#features-extendedDynamicState3RasterizationStream) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ConservativeRasterizationMode-07382) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ConservativeRasterizationMode-07382

If the [    `extendedDynamicState3ConservativeRasterizationMode`](features.html#features-extendedDynamicState3ConservativeRasterizationMode) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ExtraPrimitiveOverestimationSize-07383) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ExtraPrimitiveOverestimationSize-07383

If the [    `extendedDynamicState3ExtraPrimitiveOverestimationSize`](features.html#features-extendedDynamicState3ExtraPrimitiveOverestimationSize) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-09639) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-09639

If the pipeline requires [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization), `pDynamicState` includes
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](#VkDynamicState), and
`pDynamicState` does not include
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](#VkDynamicState),
`pRasterizationState` **must** include a
[VkPipelineRasterizationConservativeStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationConservativeStateCreateInfoEXT) in its
`pNext` chain

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipEnable-07384) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipEnable-07384

If the [    `extendedDynamicState3DepthClipEnable`](features.html#features-extendedDynamicState3DepthClipEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleLocationsEnable-07385) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3SampleLocationsEnable-07385

If the [    `extendedDynamicState3SampleLocationsEnable`](features.html#features-extendedDynamicState3SampleLocationsEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendAdvanced-07386) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ColorBlendAdvanced-07386

If the [    `extendedDynamicState3ColorBlendAdvanced`](features.html#features-extendedDynamicState3ColorBlendAdvanced) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ProvokingVertexMode-07387) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ProvokingVertexMode-07387

If the [    `extendedDynamicState3ProvokingVertexMode`](features.html#features-extendedDynamicState3ProvokingVertexMode) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineRasterizationMode-07388) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineRasterizationMode-07388

If the [    `extendedDynamicState3LineRasterizationMode`](features.html#features-extendedDynamicState3LineRasterizationMode) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineStippleEnable-07389) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3LineStippleEnable-07389

If the [    `extendedDynamicState3LineStippleEnable`](features.html#features-extendedDynamicState3LineStippleEnable) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipNegativeOneToOne-07390) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3DepthClipNegativeOneToOne-07390

If the [    `extendedDynamicState3DepthClipNegativeOneToOne`](features.html#features-extendedDynamicState3DepthClipNegativeOneToOne) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportWScalingEnable-07391) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportWScalingEnable-07391

If the [    `extendedDynamicState3ViewportWScalingEnable`](features.html#features-extendedDynamicState3ViewportWScalingEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportSwizzle-07392) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ViewportSwizzle-07392

If the [    `extendedDynamicState3ViewportSwizzle`](features.html#features-extendedDynamicState3ViewportSwizzle) feature is not enabled,
there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to [VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorEnable-07393) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorEnable-07393

If the [    `extendedDynamicState3CoverageToColorEnable`](features.html#features-extendedDynamicState3CoverageToColorEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorLocation-07394) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageToColorLocation-07394

If the [    `extendedDynamicState3CoverageToColorLocation`](features.html#features-extendedDynamicState3CoverageToColorLocation) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationMode-07395) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationMode-07395

If the [    `extendedDynamicState3CoverageModulationMode`](features.html#features-extendedDynamicState3CoverageModulationMode) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTableEnable-07396) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTableEnable-07396

If the [    `extendedDynamicState3CoverageModulationTableEnable`](features.html#features-extendedDynamicState3CoverageModulationTableEnable) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTable-07397) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageModulationTable-07397

If the [    `extendedDynamicState3CoverageModulationTable`](features.html#features-extendedDynamicState3CoverageModulationTable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageReductionMode-07398) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3CoverageReductionMode-07398

If the [    `extendedDynamicState3CoverageReductionMode`](features.html#features-extendedDynamicState3CoverageReductionMode) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RepresentativeFragmentTestEnable-07399) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3RepresentativeFragmentTestEnable-07399

If the [    `extendedDynamicState3RepresentativeFragmentTestEnable`](features.html#features-extendedDynamicState3RepresentativeFragmentTestEnable) feature is
not enabled, there **must** be no element of the `pDynamicStates`
member of `pDynamicState` set to
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ShadingRateImageEnable-07400) VUID-VkGraphicsPipelineCreateInfo-extendedDynamicState3ShadingRateImageEnable-07400

If the [    `extendedDynamicState3ShadingRateImageEnable`](features.html#features-extendedDynamicState3ShadingRateImageEnable) feature is not
enabled, there **must** be no element of the `pDynamicStates` member of
`pDynamicState` set to
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](#VkDynamicState)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07401) VUID-VkGraphicsPipelineCreateInfo-flags-07401

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-07997) VUID-VkGraphicsPipelineCreateInfo-flags-07997

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07730) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07730

If the [    `multiviewPerViewViewports`](features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState), then
the index of the most significant bit in each element of
[VkRenderPassMultiviewCreateInfo](renderpass.html#VkRenderPassMultiviewCreateInfo)::`pViewMasks` **must** be less
than `pViewportState->viewportCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07731) VUID-VkGraphicsPipelineCreateInfo-pDynamicStates-07731

If the [    `multiviewPerViewViewports`](features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState), then
the index of the most significant bit in each element of
[VkRenderPassMultiviewCreateInfo](renderpass.html#VkRenderPassMultiviewCreateInfo)::`pViewMasks` **must** be less
than `pViewportState->scissorCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12249) VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12249

If the [    `multiviewPerViewViewports`](features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState), then
the index of the most significant bit in
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` **must** be less than
`pViewportState->viewportCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12250) VUID-VkGraphicsPipelineCreateInfo-multiviewPerViewViewports-12250

If the [    `multiviewPerViewViewports`](features.html#features-multiviewPerViewViewports) feature is enabled, `renderpass`
is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization), and no element of the `pDynamicStates` member of
`pDynamicState` is [VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState), then
the index of the most significant bit in
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` **must** be less than
`pViewportState->scissorCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-08711) VUID-VkGraphicsPipelineCreateInfo-pStages-08711

If `pStages` includes a fragment shader stage,
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](#VkDynamicState) is not set in
[VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpDepthAttachmentReadEXT`, the `depthWriteEnable` member of
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pStages-08712) VUID-VkGraphicsPipelineCreateInfo-pStages-08712

If `pStages` includes a fragment shader stage,
[VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](#VkDynamicState) is not set in
[VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`, and the
fragment shader declares the `EarlyFragmentTests` execution mode and
uses `OpStencilAttachmentReadEXT`, the value of
[VkStencilOpState](fragops.html#VkStencilOpState)::`writeMask` for both `front` and
`back` in [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) **must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-08744) VUID-VkGraphicsPipelineCreateInfo-renderPass-08744

If `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the pipeline requires
[fragment output state](#pipelines-graphics-subsets-fragment-output) or
[fragment shader state](#pipelines-graphics-subsets-fragment-shader),
the pipeline enables [sample shading](primsrast.html#primsrast-sampleshading),
`rasterizationSamples` is not dynamic, and the `pNext` chain
includes a [VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo) structure,
`rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits)
value that is set in `imageCreateSampleCounts` (as defined in
[Image Creation Limits](resources.html#resources-image-creation-limits)) for every
element of `depthAttachmentFormat`, `stencilAttachmentFormat`
and the `pColorAttachmentFormats` array which is not
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08897) VUID-VkGraphicsPipelineCreateInfo-flags-08897

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and that state includes a vertex shader stage in `pStages`, the
pipeline **must** define [vertex    input state](#pipelines-graphics-subsets-vertex-input)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08898) VUID-VkGraphicsPipelineCreateInfo-flags-08898

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is not specified, the pipeline **must** define
[vertex input state](#pipelines-graphics-subsets-vertex-input)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08899) VUID-VkGraphicsPipelineCreateInfo-flags-08899

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits),
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and that state includes a vertex shader stage in `pStages`, the
pipeline **must** either define [    vertex input state](#pipelines-graphics-subsets-vertex-input) or include that state in a linked pipeline library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08900) VUID-VkGraphicsPipelineCreateInfo-flags-08900

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) the
pipeline **must** define [    pre-rasterization shader state](#pipelines-graphics-subsets-pre-rasterization)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08901) VUID-VkGraphicsPipelineCreateInfo-flags-08901

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits), the pipeline **must** either
define [pre-rasterization    shader state](#pipelines-graphics-subsets-pre-rasterization) or include that state in a linked pipeline library

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08903) VUID-VkGraphicsPipelineCreateInfo-flags-08903

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and that state
either includes [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState) or
has `pRasterizationState->rasterizerDiscardEnable` set to
[VK_FALSE](fundamentals.html#VK_FALSE), the pipeline **must** define
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08904) VUID-VkGraphicsPipelineCreateInfo-flags-08904

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is not specified, the pipeline **must** define
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08906) VUID-VkGraphicsPipelineCreateInfo-flags-08906

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and that state
either includes [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState) or
has `pRasterizationState->rasterizerDiscardEnable` set to
[VK_FALSE](fundamentals.html#VK_FALSE), the pipeline **must** define
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08907) VUID-VkGraphicsPipelineCreateInfo-flags-08907

If [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT)::`flags` includes
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT), and
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is not specified, the pipeline **must** define
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-08909) VUID-VkGraphicsPipelineCreateInfo-flags-08909

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits),
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization) is specified either in a library or by the inclusion of
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT),
and that state
either includes [VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState) or
has `pRasterizationState->rasterizerDiscardEnable` set to
[VK_FALSE](fundamentals.html#VK_FALSE), the pipeline **must** define
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output) and [fragment    shader state](#pipelines-graphics-subsets-fragment-shader) or include those states in linked pipeline libraries

* 
[](#VUID-VkGraphicsPipelineCreateInfo-None-09043) VUID-VkGraphicsPipelineCreateInfo-None-09043

If
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](#VkDynamicState), and
the format of any color attachment is
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](formats.html#VkFormat), the `colorWriteMask` member
of the corresponding element of `pColorBlendState->pAttachments`
**must** either include all of [VK_COLOR_COMPONENT_R_BIT](framebuffer.html#VkColorComponentFlagBits),
[VK_COLOR_COMPONENT_G_BIT](framebuffer.html#VkColorComponentFlagBits), and [VK_COLOR_COMPONENT_B_BIT](framebuffer.html#VkColorComponentFlagBits), or
none of them

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09301) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09301

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`,
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`viewMask` **must** be `0`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09304) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09304

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`, and
`rasterizationSamples` is not dynamic,
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09305) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09305

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`, and
`blendEnable` is not dynamic, the `blendEnable` member of each
element of `pColorBlendState->pAttachments` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09306) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09306

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.width`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09307) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09307

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.height`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09308) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09308

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-fragment-output) and [fragment    output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`, the last
[pre-rasterization shader    stage](#pipelines-graphics-subsets-pre-rasterization) **must** not statically use a variable with the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09309) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09309

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`,
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount` **must** be
`1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09310) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09310

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [fragment output    interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)::`externalFormat` is not `0`, the
fragment shader **must** not declare the `DepthReplacing` or
`StencilRefReplacingEXT` execution modes

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09313) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09313

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `subpass`
includes an external format resolve attachment, and
`rasterizationSamples` is not dynamic,
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`
**must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09314) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09314

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `subpass`
includes an external format resolve attachment, and `blendEnable` is
not dynamic, the `blendEnable` member of each element of
`pColorBlendState->pAttachments` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09315) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09315

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `subpass`
includes an external format resolve attachment, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.width`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09316) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09316

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `subpass`
includes an external format resolve attachment, and
`pDynamicState->pDynamicStates` does not include
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState),
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)::`fragmentSize.height`
**must** be `1`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09317) VUID-VkGraphicsPipelineCreateInfo-externalFormatResolve-09317

If the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is enabled, the pipeline requires
[pre-rasterization shader    state](#pipelines-graphics-subsets-fragment-output) and [fragment    output interface state](#pipelines-graphics-subsets-fragment-output), `renderPass` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and `subpass` includes an external format resolve attachment, the
last [pre-rasterization    shader stage](#pipelines-graphics-subsets-pre-rasterization) **must** not statically use a variable with the
`PrimitiveShadingRateKHR` built-in

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09531) VUID-VkGraphicsPipelineCreateInfo-renderPass-09531

If the pipeline is being created with
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [fragment output    state](#pipelines-graphics-subsets-fragment-output), the value of `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo) is included,
[VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo)::`colorAttachmentCount`
**must** be equal to
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09652) VUID-VkGraphicsPipelineCreateInfo-renderPass-09652

If the pipeline is being created with
[fragment shader state](#pipelines-graphics-subsets-fragment-shader)
and [fragment output    state](#pipelines-graphics-subsets-fragment-output), the value of `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and
[VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo) is not included, the fragment
shader **must** not contain any input attachments with a
`InputAttachmentIndex` greater than or equal to
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-renderPass-09532) VUID-VkGraphicsPipelineCreateInfo-renderPass-09532

If the pipeline is being created with
[fragment output state](#pipelines-graphics-subsets-fragment-output),
and the value of `renderPass` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[VkRenderingAttachmentLocationInfo](interfaces.html#VkRenderingAttachmentLocationInfo)::`colorAttachmentCount`
**must** be equal to
[VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo)::`colorAttachmentCount`

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11273) VUID-VkGraphicsPipelineCreateInfo-flags-11273

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-11274) VUID-VkGraphicsPipelineCreateInfo-flags-11274

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all
libraries linked to this pipeline **must** also not have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12355) VUID-VkGraphicsPipelineCreateInfo-flags-12355

If `flags` includes
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12356) VUID-VkGraphicsPipelineCreateInfo-flags-12356

If `flags` does not include
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also not have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12357) VUID-VkGraphicsPipelineCreateInfo-flags-12357

If `flags` includes
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12358) VUID-VkGraphicsPipelineCreateInfo-flags-12358

If `flags` does not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also not have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12359) VUID-VkGraphicsPipelineCreateInfo-flags-12359

If `flags` includes
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkGraphicsPipelineCreateInfo-flags-12360) VUID-VkGraphicsPipelineCreateInfo-flags-12360

If `flags` does not include
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also not have that flag set

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sType-sType) VUID-VkGraphicsPipelineCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pNext-pNext) VUID-VkGraphicsPipelineCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentSampleCountInfoAMD](cmdbuffers.html#VkAttachmentSampleCountInfoAMD), [VkCustomResolveCreateInfoEXT](#VkCustomResolveCreateInfoEXT), [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID), [VkExternalFormatOHOS](resources.html#VkExternalFormatOHOS), [VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT), [VkGraphicsPipelineShaderGroupsCreateInfoNV](#VkGraphicsPipelineShaderGroupsCreateInfoNV), [VkMultiviewPerViewAttributesInfoNVX](renderpass.html#VkMultiviewPerViewAttributesInfoNVX), [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR), [VkPipelineCompilerControlCreateInfoAMD](#VkPipelineCompilerControlCreateInfoAMD), [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo), [VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo), [VkPipelineDiscardRectangleStateCreateInfoEXT](fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT), [VkPipelineFragmentDensityMapLayeredCreateInfoVALVE](#VkPipelineFragmentDensityMapLayeredCreateInfoVALVE), [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV), [VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR), [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR), [VkPipelineRenderingCreateInfo](#VkPipelineRenderingCreateInfo), [VkPipelineRepresentativeFragmentTestStateCreateInfoNV](fragops.html#VkPipelineRepresentativeFragmentTestStateCreateInfoNV), [VkPipelineRobustnessCreateInfo](#VkPipelineRobustnessCreateInfo), [VkRenderingAttachmentLocationInfo](interfaces.html#VkRenderingAttachmentLocationInfo), or [VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo)

* 
[](#VUID-VkGraphicsPipelineCreateInfo-sType-unique) VUID-VkGraphicsPipelineCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkGraphicsPipelineCreateInfo-pDynamicState-parameter) VUID-VkGraphicsPipelineCreateInfo-pDynamicState-parameter

 If `pDynamicState` is not `NULL`, `pDynamicState` **must** be a valid pointer to a valid [VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo) structure

* 
[](#VUID-VkGraphicsPipelineCreateInfo-commonparent) VUID-VkGraphicsPipelineCreateInfo-commonparent

 Each of `basePipelineHandle`, `layout`, and `renderPass` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The `VkPipelineFragmentDensityMapLayeredCreateInfoVALVE` structure is
defined as:

// Provided by VK_VALVE_fragment_density_map_layered
typedef struct VkPipelineFragmentDensityMapLayeredCreateInfoVALVE {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maxFragmentDensityMapLayers;
} VkPipelineFragmentDensityMapLayeredCreateInfoVALVE;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxFragmentDensityMapLayers` is the maximum number of layers which
can be used with a fragment density map.

Valid Usage

* 
[](#VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-maxFragmentDensityMapLayers-10825) VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-maxFragmentDensityMapLayers-10825

`maxFragmentDensityMapLayers` **must** be less than or equal to
[`maxFragmentDensityMapLayers`](limits.html#limits-maxFragmentDensityMapLayers)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-sType-sType) VUID-VkPipelineFragmentDensityMapLayeredCreateInfoVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_DENSITY_MAP_LAYERED_CREATE_INFO_VALVE](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

The `VkPipelineRenderingCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineRenderingCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           viewMask;
    uint32_t           colorAttachmentCount;
    const VkFormat*    pColorAttachmentFormats;
    VkFormat           depthAttachmentFormat;
    VkFormat           stencilAttachmentFormat;
} VkPipelineRenderingCreateInfo;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkPipelineRenderingCreateInfo
typedef VkPipelineRenderingCreateInfo VkPipelineRenderingCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewMask` is a bitfield of view indices describing which views are
active during rendering.
It **must** match [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`viewMask` when rendering.

* 
`colorAttachmentCount` is the number of entries in
`pColorAttachmentFormats`

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](formats.html#VkFormat)
values defining the format of color attachments used in this pipeline.

* 
`depthAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the depth attachment used in this pipeline.

* 
`stencilAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the stencil attachment used in this pipeline.

When a pipeline is created without a [VkRenderPass](renderpass.html#VkRenderPass), if the `pNext`
chain of [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) includes this structure, it
specifies the view mask and format of attachments used for rendering.
If this structure is not specified, and the pipeline does not include a
[VkRenderPass](renderpass.html#VkRenderPass), `viewMask` and `colorAttachmentCount` are `0`,
and `depthAttachmentFormat` and `stencilAttachmentFormat` are
[VK_FORMAT_UNDEFINED](formats.html#VkFormat).
If a graphics pipeline is created with a valid [VkRenderPass](renderpass.html#VkRenderPass),
parameters of this structure are ignored.

If `depthAttachmentFormat`, `stencilAttachmentFormat`, or any
element of `pColorAttachmentFormats` is [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
indicates that the corresponding attachment is unused within the render
pass.
Valid formats indicate that an attachment **can** be used - but it is still
valid to set the attachment to `NULL` when beginning rendering.

If the render pass is going to be used with an external format resolve
attachment, a [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID) structure **must** also be included
in the `pNext` chain of [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo), defining the
external format of the resolve attachment that will be used.

Valid Usage

* 
[](#VUID-VkPipelineRenderingCreateInfo-colorAttachmentCount-09533) VUID-VkPipelineRenderingCreateInfo-colorAttachmentCount-09533

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](limits.html#limits-maxColorAttachments)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRenderingCreateInfo-sType-sType) VUID-VkPipelineRenderingCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

The `VkCustomResolveCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
typedef struct VkCustomResolveCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           customResolve;
    uint32_t           colorAttachmentCount;
    const VkFormat*    pColorAttachmentFormats;
    VkFormat           depthAttachmentFormat;
    VkFormat           stencilAttachmentFormat;
} VkCustomResolveCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`customResolve` indicates whether this pipeline will be used for a
resolve operation.

* 
`colorAttachmentCount` is the number of entries in
`pColorAttachmentFormats`.

* 
`pColorAttachmentFormats` is a pointer to an array of [VkFormat](formats.html#VkFormat)
values defining the format of color resolve attachments used in custom
resolves in the same render pass.

* 
`depthAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the depth resolve attachment used in custom resolves in the
same render pass.

* 
`stencilAttachmentFormat` is a [VkFormat](formats.html#VkFormat) value defining the
format of the stencil resolve attachment used in custom resolves in the
same render pass.

If the `pNext` chain includes this structure for one of:

* 
a [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) for a pipeline created without a
[VkRenderPass](renderpass.html#VkRenderPass)

* 
a [VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo) for a secondary command buffer
within a render pass instance begun with [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering).

it specifies the formats used in custom resolves within the same render
pass.
It also specifies that the corresponding object will be used in a render
pass which contains a custom resolve operation.

If the `pNext` chain includes this structure for a
[VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT) for a fragment shader object, it only specifies
that the fragment shader will be used in a custom resolve operation.

If a graphics pipeline is created with a valid [VkRenderPass](renderpass.html#VkRenderPass),
parameters of this structure are ignored.

If `customResolve` is [VK_FALSE](fundamentals.html#VK_FALSE), the pipeline **can** only be used
outside the custom resolve section.
If `customResolve` is [VK_TRUE](fundamentals.html#VK_TRUE), the pipeline **can** only be used
inside the custom resolve section.

When a dynamic render pass instance contains a custom resolve operation
and the [`dynamicRenderingUnusedAttachments`](features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled
, all pipelines used to draw in such render pass **must** include this
structure and have identical format information in it.
When a dynamic render pass does not contain a custom resolve operation
and the [`dynamicRenderingUnusedAttachments`](features.html#features-dynamicRenderingUnusedAttachments) feature is not enabled
, all pipelines used to draw in such render pass **must** not include this
structure.

If the [`dynamicRenderingUnusedAttachments`](features.html#features-dynamicRenderingUnusedAttachments) feature is enabled, then when this
structure is not included in the `pNext` chain for
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo), `customResolve` is [VK_FALSE](fundamentals.html#VK_FALSE),
`colorAttachmentCount` is `0`, and `depthAttachmentFormat` and
`stencilAttachmentFormat` are [VK_FORMAT_UNDEFINED](formats.html#VkFormat).

If `depthAttachmentFormat`, `stencilAttachmentFormat`, or any
element of `pColorAttachmentFormats` is [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
indicates that the corresponding attachment is unused within the resolve
portion of the render pass.
Valid formats indicate that an attachment **can** be used - but it is still
valid to set the attachment to `NULL` when beginning rendering.

When passed as a `pNext` member to a [VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT) struct
for use with fragment density maps, the `colorAttachmentCount`,
`pColorAttachmentFormats`, `depthAttachmentFormat`, and
`stencilAttachmentFormat` members of this struct are ignored.
When not passed as a `pNext` member, `customResolve` is
[VK_FALSE](fundamentals.html#VK_FALSE).

Valid Usage

* 
[](#VUID-VkCustomResolveCreateInfoEXT-colorAttachmentCount-11507) VUID-VkCustomResolveCreateInfoEXT-colorAttachmentCount-11507

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11508) VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11508

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format that includes a depth component

* 
[](#VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11509) VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11509

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format with [potential format    features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-pColorAttachmentFormats-11510) VUID-VkCustomResolveCreateInfoEXT-pColorAttachmentFormats-11510

If any element of `pColorAttachmentFormats` is not
[VK_FORMAT_UNDEFINED](formats.html#VkFormat), it **must** be a format with
[potential format features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)
, or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR) if the
[`linearColorAttachment`](features.html#features-linearColorAttachment) feature
is enabled

* 
[](#VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11511) VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11511

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format that includes a stencil aspect

* 
[](#VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11512) VUID-VkCustomResolveCreateInfoEXT-stencilAttachmentFormat-11512

If `stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), it
**must** be a format with [potential format    features](formats.html#potential-format-features) that include
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11513) VUID-VkCustomResolveCreateInfoEXT-depthAttachmentFormat-11513

If `depthAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat) and
`stencilAttachmentFormat` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat),
`depthAttachmentFormat` **must** equal `stencilAttachmentFormat`

Valid Usage (Implicit)

* 
[](#VUID-VkCustomResolveCreateInfoEXT-sType-sType) VUID-VkCustomResolveCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUSTOM_RESOLVE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

* 
[VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT)

The `VkPipelineBinaryInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    uint32_t                      binaryCount;
    const VkPipelineBinaryKHR*    pPipelineBinaries;
} VkPipelineBinaryInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`binaryCount` is the number of elements in the
`pPipelineBinaries` array.

* 
`pPipelineBinaries` is a pointer to an array of
[VkPipelineBinaryKHR](#VkPipelineBinaryKHR) handles.

If a `VkPipelineBinaryInfoKHR` structure with a `binaryCount`
greater than 0 is included in the `pNext` chain of any
`Vk*PipelineCreateInfo` structure when creating a pipeline,
implementations **must** use the data in `pPipelineBinaries` instead of
recalculating it.
Any shader module identifiers, shader modules, or chained
[VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo) structures declared in
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) instances, are ignored.
Any [VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT) in the `pNext`
chains of [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) instances are ignored.

If this structure is not included in the `pNext` chain, it is equivalent
to specifying this structure with a `binaryCount` of `0`.

Valid Usage

* 
[](#VUID-VkPipelineBinaryInfoKHR-binaryCount-09603) VUID-VkPipelineBinaryInfoKHR-binaryCount-09603

`binaryCount` and the order of the elements in
`pPipelineBinaries` **must** exactly match that returned by
[vkCreatePipelineBinariesKHR](#vkCreatePipelineBinariesKHR) for the matching
`Vk*PipelineCreateInfo` structure and its `pNext` chain,
ignoring the presence of the `VkPipelineBinaryInfoKHR` structure,
the presence of the [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR)
flag, and absence of any shader module identifiers, shader modules, or
`VkShaderModuleCreateInfo` structures, for the same
[global pipeline key](#global-pipeline-key), from either:

[VkPipelineBinaryCreateInfoKHR](#VkPipelineBinaryCreateInfoKHR)::`pPipelineCreateInfo`, or

* 
[VkPipelineBinaryCreateInfoKHR](#VkPipelineBinaryCreateInfoKHR)::`pipeline`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryInfoKHR-sType-sType) VUID-VkPipelineBinaryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineBinaryInfoKHR-pPipelineBinaries-parameter) VUID-VkPipelineBinaryInfoKHR-pPipelineBinaries-parameter

 If `binaryCount` is not `0`, `pPipelineBinaries` **must** be a valid pointer to an array of `binaryCount` valid [VkPipelineBinaryKHR](#VkPipelineBinaryKHR) handles

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

* 
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)

The `VkGraphicsPipelineLibraryCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_graphics_pipeline_library
typedef struct VkGraphicsPipelineLibraryCreateInfoEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    VkGraphicsPipelineLibraryFlagsEXT    flags;
} VkGraphicsPipelineLibraryCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkGraphicsPipelineLibraryFlagBitsEXT](#VkGraphicsPipelineLibraryFlagBitsEXT)
specifying the subsets of the graphics pipeline that are being compiled.

If a `VkGraphicsPipelineLibraryCreateInfoEXT` structure is included in
the `pNext` chain of [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo), it specifies
the [subsets of the graphics pipeline](#pipelines-graphics-subsets) being
created, excluding any subsets from linked pipeline libraries.
If the pipeline is created with pipeline libraries, state from those
libraries is aggregated with said subset.

If this structure is omitted, and either
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`flags` includes
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits) or the
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`pNext` chain includes a
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) structure with a `libraryCount`
greater than `0`, it is as if `flags` is `0`.
Otherwise if this structure is omitted, it is as if `flags` includes all
possible subsets of the graphics pipeline (i.e. a
[complete graphics pipeline](#pipelines-graphics-subsets-complete)).

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsPipelineLibraryCreateInfoEXT-sType-sType) VUID-VkGraphicsPipelineLibraryCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_LIBRARY_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-parameter) VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkGraphicsPipelineLibraryFlagBitsEXT](#VkGraphicsPipelineLibraryFlagBitsEXT) values

* 
[](#VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-requiredbitmask) VUID-VkGraphicsPipelineLibraryCreateInfoEXT-flags-requiredbitmask

 `flags` **must** not be `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

// Provided by VK_EXT_graphics_pipeline_library
typedef VkFlags VkGraphicsPipelineLibraryFlagsEXT;

`VkGraphicsPipelineLibraryFlagsEXT` is a bitmask type for setting a mask
of zero or more [VkGraphicsPipelineLibraryFlagBitsEXT](#VkGraphicsPipelineLibraryFlagBitsEXT).

Possible values of the `flags` member of
[VkGraphicsPipelineLibraryCreateInfoEXT](#VkGraphicsPipelineLibraryCreateInfoEXT), specifying the subsets of a
graphics pipeline to compile are:

// Provided by VK_EXT_graphics_pipeline_library
typedef enum VkGraphicsPipelineLibraryFlagBitsEXT {
    VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT = 0x00000001,
    VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT = 0x00000002,
    VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT = 0x00000004,
    VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT = 0x00000008,
} VkGraphicsPipelineLibraryFlagBitsEXT;

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_VERTEX_INPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT)
specifies that a pipeline will include
[vertex input interface    state](#pipelines-graphics-subsets-vertex-input).

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_PRE_RASTERIZATION_SHADERS_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT)
specifies that a pipeline will include
[pre-rasterization shader    state](#pipelines-graphics-subsets-pre-rasterization).

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_SHADER_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT) specifies
that a pipeline will include
[fragment shader state](#pipelines-graphics-subsets-fragment-shader).

* 
[VK_GRAPHICS_PIPELINE_LIBRARY_FRAGMENT_OUTPUT_INTERFACE_BIT_EXT](#VkGraphicsPipelineLibraryFlagBitsEXT)
specifies that a pipeline will include
[fragment output interface    state](#pipelines-graphics-subsets-fragment-output).

The `VkPipelineDynamicStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineDynamicStateCreateInfo {
    VkStructureType                      sType;
    const void*                          pNext;
    VkPipelineDynamicStateCreateFlags    flags;
    uint32_t                             dynamicStateCount;
    const VkDynamicState*                pDynamicStates;
} VkPipelineDynamicStateCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`dynamicStateCount` is the number of elements in the
`pDynamicStates` array.

* 
`pDynamicStates` is a pointer to an array of [VkDynamicState](#VkDynamicState)
values specifying which pieces of pipeline state will use the values
from dynamic state commands rather than from pipeline state creation
information.

Valid Usage

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-01442) VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-01442

Each element of `pDynamicStates` **must** be unique

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-sType-sType) VUID-VkPipelineDynamicStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_DYNAMIC_STATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-pNext-pNext) VUID-VkPipelineDynamicStateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-flags-zerobitmask) VUID-VkPipelineDynamicStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-parameter) VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-parameter

 If `dynamicStateCount` is not `0`, `pDynamicStates` **must** be a valid pointer to an array of `dynamicStateCount` valid [VkDynamicState](#VkDynamicState) values

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineDynamicStateCreateFlags;

`VkPipelineDynamicStateCreateFlags` is a bitmask type for setting a
mask, but is currently reserved for future use.

The source of different pieces of dynamic state is specified by the
[VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo)::`pDynamicStates` property of the
currently active pipeline, each of whose elements **must** be one of the
values:

// Provided by VK_VERSION_1_0
typedef enum VkDynamicState {
    VK_DYNAMIC_STATE_VIEWPORT = 0,
    VK_DYNAMIC_STATE_SCISSOR = 1,
    VK_DYNAMIC_STATE_LINE_WIDTH = 2,
    VK_DYNAMIC_STATE_DEPTH_BIAS = 3,
    VK_DYNAMIC_STATE_BLEND_CONSTANTS = 4,
    VK_DYNAMIC_STATE_DEPTH_BOUNDS = 5,
    VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK = 6,
    VK_DYNAMIC_STATE_STENCIL_WRITE_MASK = 7,
    VK_DYNAMIC_STATE_STENCIL_REFERENCE = 8,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_CULL_MODE = 1000267000,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_FRONT_FACE = 1000267001,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY = 1000267002,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT = 1000267003,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT = 1000267004,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE = 1000267005,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE = 1000267006,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE = 1000267007,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_COMPARE_OP = 1000267008,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE = 1000267009,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE = 1000267010,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_STENCIL_OP = 1000267011,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE = 1000377001,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE = 1000377002,
  // Provided by VK_VERSION_1_3
    VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE = 1000377004,
  // Provided by VK_VERSION_1_4
    VK_DYNAMIC_STATE_LINE_STIPPLE = 1000259000,
  // Provided by VK_NV_clip_space_w_scaling
    VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV = 1000087000,
  // Provided by VK_EXT_discard_rectangles
    VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT = 1000099000,
  // Provided by VK_EXT_discard_rectangles
    VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT = 1000099001,
  // Provided by VK_EXT_discard_rectangles
    VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT = 1000099002,
  // Provided by VK_EXT_sample_locations
    VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT = 1000143000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR = 1000347000,
  // Provided by VK_NV_shading_rate_image
    VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV = 1000164004,
  // Provided by VK_NV_shading_rate_image
    VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV = 1000164006,
  // Provided by VK_NV_scissor_exclusive
    VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV = 1000205000,
  // Provided by VK_NV_scissor_exclusive
    VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV = 1000205001,
  // Provided by VK_KHR_fragment_shading_rate
    VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR = 1000226000,
  // Provided by VK_EXT_vertex_input_dynamic_state
    VK_DYNAMIC_STATE_VERTEX_INPUT_EXT = 1000352000,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT = 1000377000,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_LOGIC_OP_EXT = 1000377003,
  // Provided by VK_EXT_color_write_enable
    VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT = 1000381000,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT = 1000455003,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_POLYGON_MODE_EXT = 1000455004,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT = 1000455005,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_SAMPLE_MASK_EXT = 1000455006,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT = 1000455007,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT = 1000455008,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT = 1000455009,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT = 1000455010,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT = 1000455011,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT = 1000455012,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_KHR_maintenance2 or VK_VERSION_1_1
    VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT = 1000455002,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_transform_feedback
    VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT = 1000455013,
  // Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT = 1000455014,
  // Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT = 1000455015,
  // Provided by VK_EXT_depth_clip_enable with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT = 1000455016,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_sample_locations
    VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT = 1000455017,
  // Provided by VK_EXT_blend_operation_advanced with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT = 1000455018,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_provoking_vertex
    VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT = 1000455019,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_line_rasterization
    VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT = 1000455020,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_EXT_line_rasterization
    VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT = 1000455021,
  // Provided by VK_EXT_depth_clip_control with VK_EXT_extended_dynamic_state3
    VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT = 1000455022,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_clip_space_w_scaling
    VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV = 1000455023,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_viewport_swizzle
    VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV = 1000455024,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_fragment_coverage_to_color
    VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV = 1000455025,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_fragment_coverage_to_color
    VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV = 1000455026,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_framebuffer_mixed_samples
    VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV = 1000455027,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_framebuffer_mixed_samples
    VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV = 1000455028,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_framebuffer_mixed_samples
    VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV = 1000455029,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_shading_rate_image
    VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV = 1000455030,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_representative_fragment_test
    VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV = 1000455031,
  // Provided by VK_EXT_extended_dynamic_state3 with VK_NV_coverage_reduction_mode
    VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV = 1000455032,
  // Provided by VK_EXT_attachment_feedback_loop_dynamic_state
    VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT = 1000524000,
  // Provided by VK_EXT_depth_clamp_control
    VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT = 1000582000,
  // Provided by VK_EXT_line_rasterization
    VK_DYNAMIC_STATE_LINE_STIPPLE_EXT = VK_DYNAMIC_STATE_LINE_STIPPLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_CULL_MODE_EXT = VK_DYNAMIC_STATE_CULL_MODE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_FRONT_FACE_EXT = VK_DYNAMIC_STATE_FRONT_FACE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY_EXT = VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT_EXT = VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT_EXT = VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE_EXT = VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_COMPARE_OP_EXT = VK_DYNAMIC_STATE_DEPTH_COMPARE_OP,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE_EXT = VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state
    VK_DYNAMIC_STATE_STENCIL_OP_EXT = VK_DYNAMIC_STATE_STENCIL_OP,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE_EXT = VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE_EXT = VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE_EXT = VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE,
  // Provided by VK_KHR_line_rasterization
    VK_DYNAMIC_STATE_LINE_STIPPLE_KHR = VK_DYNAMIC_STATE_LINE_STIPPLE,
} VkDynamicState;

* 
[VK_DYNAMIC_STATE_VIEWPORT](#VkDynamicState) specifies that the `pViewports`
state in [VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) will be ignored and
**must** be set dynamically with [vkCmdSetViewport](vertexpostproc.html#vkCmdSetViewport) before any drawing
commands.
The number of viewports used by a pipeline is still specified by the
`viewportCount` member of [VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo).

* 
[VK_DYNAMIC_STATE_SCISSOR](#VkDynamicState) specifies that the `pScissors` state
in [VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetScissor](fragops.html#vkCmdSetScissor) before any drawing commands.
The number of scissor rectangles used by a pipeline is still specified
by the `scissorCount` member of
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo).

* 
[VK_DYNAMIC_STATE_LINE_WIDTH](#VkDynamicState) specifies that the `lineWidth`
state in [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) will be ignored
and **must** be set dynamically with [vkCmdSetLineWidth](primsrast.html#vkCmdSetLineWidth) before any
drawing commands that generate line primitives for the rasterizer.

* 
[VK_DYNAMIC_STATE_DEPTH_BIAS](#VkDynamicState) specifies that
    any instance of [VkDepthBiasRepresentationInfoEXT](primsrast.html#VkDepthBiasRepresentationInfoEXT) included in the
    `pNext` chain of [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) as
    well as
    the `depthBiasConstantFactor`, `depthBiasClamp` and
    `depthBiasSlopeFactor` states in
    [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) will be ignored and **must**
    be set dynamically with [vkCmdSetDepthBias](primsrast.html#vkCmdSetDepthBias)
or [vkCmdSetDepthBias2EXT](primsrast.html#vkCmdSetDepthBias2EXT)
    before any draws are performed with [depth    bias enabled](primsrast.html#primsrast-depthbias-enable).

* 
[VK_DYNAMIC_STATE_BLEND_CONSTANTS](#VkDynamicState) specifies that the
`blendConstants` state in [VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo)
will be ignored and **must** be set dynamically with
[vkCmdSetBlendConstants](framebuffer.html#vkCmdSetBlendConstants) before any draws are performed with a
pipeline state with `VkPipelineColorBlendAttachmentState` member
`blendEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE) and any of the blend functions
using a constant blend color.

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](#VkDynamicState) specifies that the
`minDepthBounds` and `maxDepthBounds` states of
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetDepthBounds](fragops.html#vkCmdSetDepthBounds) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) member
`depthBoundsTestEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE).

* 
[VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK](#VkDynamicState) specifies that the
`compareMask` state in [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo)
for both `front` and `back` will be ignored and **must** be set
dynamically with [vkCmdSetStencilCompareMask](fragops.html#vkCmdSetStencilCompareMask) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) member
`stencilTestEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[VK_DYNAMIC_STATE_STENCIL_WRITE_MASK](#VkDynamicState) specifies that the
`writeMask` state in [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) for
both `front` and `back` will be ignored and **must** be set
dynamically with [vkCmdSetStencilWriteMask](fragops.html#vkCmdSetStencilWriteMask) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) member
`stencilTestEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[VK_DYNAMIC_STATE_STENCIL_REFERENCE](#VkDynamicState) specifies that the
`reference` state in [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) for
both `front` and `back` will be ignored and **must** be set
dynamically with [vkCmdSetStencilReference](fragops.html#vkCmdSetStencilReference) before any draws are
performed with a pipeline state with
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) member
`stencilTestEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](#VkDynamicState) specifies that the
`pViewportWScalings` state in
[VkPipelineViewportWScalingStateCreateInfoNV](vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV) will be ignored and
**must** be set dynamically with [vkCmdSetViewportWScalingNV](vertexpostproc.html#vkCmdSetViewportWScalingNV) before
any draws are performed with a pipeline state with
[VkPipelineViewportWScalingStateCreateInfoNV](vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV) member
`viewportScalingEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](#VkDynamicState) specifies that the
`pDiscardRectangles` state in
[VkPipelineDiscardRectangleStateCreateInfoEXT](fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) will be ignored and
**must** be set dynamically with [vkCmdSetDiscardRectangleEXT](fragops.html#vkCmdSetDiscardRectangleEXT) before
any draw or clear commands.

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](#VkDynamicState) specifies that the
presence of the [VkPipelineDiscardRectangleStateCreateInfoEXT](fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT)
structure in the [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) chain with a
`discardRectangleCount` greater than zero does not implicitly enable
discard rectangles and they **must** be enabled dynamically with
[vkCmdSetDiscardRectangleEnableEXT](fragops.html#vkCmdSetDiscardRectangleEnableEXT) before any draw commands.
This is available on implementations that support at least
`specVersion` `2` of the `[VK_EXT_discard_rectangles](../appendices/extensions.html#VK_EXT_discard_rectangles)`
extension.

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](#VkDynamicState) specifies that the
`discardRectangleMode` state in
[VkPipelineDiscardRectangleStateCreateInfoEXT](fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) will be ignored and
**must** be set dynamically with [vkCmdSetDiscardRectangleModeEXT](fragops.html#vkCmdSetDiscardRectangleModeEXT)
before any draw commands.
This is available on implementations that support at least
`specVersion` `2` of the `[VK_EXT_discard_rectangles](../appendices/extensions.html#VK_EXT_discard_rectangles)`
extension.

* 
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](#VkDynamicState) specifies that the
`sampleLocationsInfo` state in
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT) will be ignored and
**must** be set dynamically with [vkCmdSetSampleLocationsEXT](primsrast.html#vkCmdSetSampleLocationsEXT) before
any draw or clear commands.
Enabling custom sample locations is still indicated by the
`sampleLocationsEnable` member of
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT).

* 
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_NV](#VkDynamicState) specifies that the
`pExclusiveScissors` state in
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV) will be
ignored and **must** be set dynamically with
[vkCmdSetExclusiveScissorNV](fragops.html#vkCmdSetExclusiveScissorNV) before any drawing commands.

* 
[VK_DYNAMIC_STATE_EXCLUSIVE_SCISSOR_ENABLE_NV](#VkDynamicState) specifies that the
exclusive scissors **must** be explicitly enabled with
[vkCmdSetExclusiveScissorEnableNV](fragops.html#vkCmdSetExclusiveScissorEnableNV) and the
`exclusiveScissorCount` value in
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV) will not
implicitly enable them.
This is available on implementations that support at least
`specVersion` `2` of the `[VK_NV_scissor_exclusive](../appendices/extensions.html#VK_NV_scissor_exclusive)` extension.

* 
[VK_DYNAMIC_STATE_VIEWPORT_SHADING_RATE_PALETTE_NV](#VkDynamicState) specifies that
the `pShadingRatePalettes` state in
[VkPipelineViewportShadingRateImageStateCreateInfoNV](primsrast.html#VkPipelineViewportShadingRateImageStateCreateInfoNV) will be
ignored and **must** be set dynamically with
[vkCmdSetViewportShadingRatePaletteNV](primsrast.html#vkCmdSetViewportShadingRatePaletteNV) before any drawing commands.

* 
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](#VkDynamicState) specifies that
the coarse sample order state in
[VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](primsrast.html#VkPipelineViewportCoarseSampleOrderStateCreateInfoNV) will be
ignored and **must** be set dynamically with
[vkCmdSetCoarseSampleOrderNV](primsrast.html#vkCmdSetCoarseSampleOrderNV) before any drawing commands.

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE](#VkDynamicState) specifies that the
`lineStippleFactor` and `lineStipplePattern` state in
[VkPipelineRasterizationLineStateCreateInfo](primsrast.html#VkPipelineRasterizationLineStateCreateInfo) will be ignored and
**must** be set dynamically with [vkCmdSetLineStipple](primsrast.html#vkCmdSetLineStipple) before any draws
are performed with a pipeline state with
[VkPipelineRasterizationLineStateCreateInfo](primsrast.html#VkPipelineRasterizationLineStateCreateInfo) member
`stippledLineEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE).

* 
[VK_DYNAMIC_STATE_CULL_MODE](#VkDynamicState) specifies that the `cullMode` state
in [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) will be ignored and
**must** be set dynamically with [vkCmdSetCullMode](primsrast.html#vkCmdSetCullMode) before any drawing
commands.

* 
[VK_DYNAMIC_STATE_FRONT_FACE](#VkDynamicState) specifies that the `frontFace`
state in [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) will be ignored
and **must** be set dynamically with [vkCmdSetFrontFace](primsrast.html#vkCmdSetFrontFace) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](#VkDynamicState) specifies that the
`topology` state in [VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo)
only specifies the [topology class](drawing.html#drawing-primitive-topology-class),
and the specific topology order and adjacency **must** be set dynamically
with [vkCmdSetPrimitiveTopology](drawing.html#vkCmdSetPrimitiveTopology) before any drawing commands.

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState) specifies that the
`viewportCount` and `pViewports` state in
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) will be ignored and **must** be set
dynamically with [vkCmdSetViewportWithCount](vertexpostproc.html#vkCmdSetViewportWithCount) before any draw call.

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState) specifies that the
`scissorCount` and `pScissors` state in
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) will be ignored and **must** be set
dynamically with [vkCmdSetScissorWithCount](vertexpostproc.html#vkCmdSetScissorWithCount) before any draw call.

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](#VkDynamicState) specifies that the
`stride` state in [VkVertexInputBindingDescription](fxvertex.html#VkVertexInputBindingDescription) will be
ignored and **must** be set dynamically with [vkCmdBindVertexBuffers2](fxvertex.html#vkCmdBindVertexBuffers2)
before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](#VkDynamicState) specifies that the
`depthTestEnable` state in
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetDepthTestEnable](fragops.html#vkCmdSetDepthTestEnable) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](#VkDynamicState) specifies that the
`depthWriteEnable` state in
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetDepthWriteEnable](fragops.html#vkCmdSetDepthWriteEnable) before any draw
call.

* 
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](#VkDynamicState) specifies that the
`depthCompareOp` state in
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetDepthCompareOp](fragops.html#vkCmdSetDepthCompareOp) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](#VkDynamicState) specifies that the
`depthBoundsTestEnable` state in
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetDepthBoundsTestEnable](fragops.html#vkCmdSetDepthBoundsTestEnable) before any draw
call.

* 
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](#VkDynamicState) specifies that the
`stencilTestEnable` state in
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetStencilTestEnable](fragops.html#vkCmdSetStencilTestEnable) before any draw
call.

* 
[VK_DYNAMIC_STATE_STENCIL_OP](#VkDynamicState) specifies that the `failOp`,
`passOp`, `depthFailOp`, and `compareOp` states in
`VkPipelineDepthStencilStateCreateInfo` for both `front` and
`back` will be ignored and **must** be set dynamically with
[vkCmdSetStencilOp](fragops.html#vkCmdSetStencilOp) before any draws are performed with a pipeline
state with `VkPipelineDepthStencilStateCreateInfo` member
`stencilTestEnable` set to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](#VkDynamicState) specifies that the
`patchControlPoints` state in
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetPatchControlPointsEXT](shaders.html#vkCmdSetPatchControlPointsEXT) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](#VkDynamicState) specifies that the
`rasterizerDiscardEnable` state in
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) will be ignored and **must**
be set dynamically with [vkCmdSetRasterizerDiscardEnable](primsrast.html#vkCmdSetRasterizerDiscardEnable) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](#VkDynamicState) specifies that the
`depthBiasEnable` state in
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) will be ignored and **must**
be set dynamically with [vkCmdSetDepthBiasEnable](primsrast.html#vkCmdSetDepthBiasEnable) before any drawing
commands.

* 
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](#VkDynamicState) specifies that the `logicOp`
state in [VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) will be ignored and
**must** be set dynamically with [vkCmdSetLogicOpEXT](framebuffer.html#vkCmdSetLogicOpEXT) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](#VkDynamicState) specifies that the
`primitiveRestartEnable` state in
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo) will be ignored and **must**
be set dynamically with [vkCmdSetPrimitiveRestartEnable](drawing.html#vkCmdSetPrimitiveRestartEnable) before any
drawing commands.

* 
[VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR](#VkDynamicState) specifies that state in
[VkPipelineFragmentShadingRateStateCreateInfoKHR](primsrast.html#VkPipelineFragmentShadingRateStateCreateInfoKHR)
and [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](primsrast.html#VkPipelineFragmentShadingRateEnumStateCreateInfoNV)
will be ignored and **must** be set dynamically with
[vkCmdSetFragmentShadingRateKHR](primsrast.html#vkCmdSetFragmentShadingRateKHR)
or [vkCmdSetFragmentShadingRateEnumNV](primsrast.html#vkCmdSetFragmentShadingRateEnumNV)
before any drawing commands.

* 
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](#VkDynamicState) specifies
that the default stack size computation for the pipeline will be ignored
and **must** be set dynamically with
[vkCmdSetRayTracingPipelineStackSizeKHR](#vkCmdSetRayTracingPipelineStackSizeKHR) before any ray tracing
calls are performed.

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](#VkDynamicState) specifies that the
`pVertexInputState` state will be ignored and **must** be set
dynamically with [vkCmdSetVertexInputEXT](fxvertex.html#vkCmdSetVertexInputEXT) before any drawing
commands

* 
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](#VkDynamicState) specifies that the
`pColorWriteEnables` state in
[VkPipelineColorWriteCreateInfoEXT](framebuffer.html#VkPipelineColorWriteCreateInfoEXT) will be ignored and **must** be set
dynamically with [vkCmdSetColorWriteEnableEXT](framebuffer.html#vkCmdSetColorWriteEnableEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](#VkDynamicState) specifies that the
`domainOrigin` state in
[VkPipelineTessellationDomainOriginStateCreateInfo](tessellation.html#VkPipelineTessellationDomainOriginStateCreateInfo) will be ignored
and **must** be set dynamically with
[vkCmdSetTessellationDomainOriginEXT](tessellation.html#vkCmdSetTessellationDomainOriginEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](#VkDynamicState) specifies that the
`depthClampEnable` state in
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) will be ignored and **must**
be set dynamically with [vkCmdSetDepthClampEnableEXT](vertexpostproc.html#vkCmdSetDepthClampEnableEXT) before any
draw call.

* 
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](#VkDynamicState) specifies that the
`polygonMode` state in [VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)
will be ignored and **must** be set dynamically with
[vkCmdSetPolygonModeEXT](primsrast.html#vkCmdSetPolygonModeEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](#VkDynamicState) specifies that the
`rasterizationSamples` state in
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetRasterizationSamplesEXT](primsrast.html#vkCmdSetRasterizationSamplesEXT) before any
draw call.

* 
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](#VkDynamicState) specifies that the
`pSampleMask` state in [VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)
will be ignored and **must** be set dynamically with
[vkCmdSetSampleMaskEXT](fragops.html#vkCmdSetSampleMaskEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](#VkDynamicState) specifies that the
`alphaToCoverageEnable` state in
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetAlphaToCoverageEnableEXT](fragops.html#vkCmdSetAlphaToCoverageEnableEXT) before any
draw call.

* 
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](#VkDynamicState) specifies that the
`alphaToOneEnable` state in
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) will be ignored and **must** be
set dynamically with [vkCmdSetAlphaToOneEnableEXT](fragops.html#vkCmdSetAlphaToOneEnableEXT) before any draw
call.

* 
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](#VkDynamicState) specifies that the
`logicOpEnable` state in [VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo)
will be ignored and **must** be set dynamically with
[vkCmdSetLogicOpEnableEXT](framebuffer.html#vkCmdSetLogicOpEnableEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](#VkDynamicState) specifies that the
`blendEnable` state in [VkPipelineColorBlendAttachmentState](framebuffer.html#VkPipelineColorBlendAttachmentState)
will be ignored and **must** be set dynamically with
[vkCmdSetColorBlendEnableEXT](framebuffer.html#vkCmdSetColorBlendEnableEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](#VkDynamicState) specifies that the
`srcColorBlendFactor`, `dstColorBlendFactor`,
`colorBlendOp`, `srcAlphaBlendFactor`,
`dstAlphaBlendFactor`, and `alphaBlendOp` states in
[VkPipelineColorBlendAttachmentState](framebuffer.html#VkPipelineColorBlendAttachmentState) will be ignored and **must** be
set dynamically with [vkCmdSetColorBlendEquationEXT](framebuffer.html#vkCmdSetColorBlendEquationEXT) before any draw
call.

* 
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](#VkDynamicState) specifies that the
`colorWriteMask` state in [VkPipelineColorBlendAttachmentState](framebuffer.html#VkPipelineColorBlendAttachmentState)
will be ignored and **must** be set dynamically with
[vkCmdSetColorWriteMaskEXT](framebuffer.html#vkCmdSetColorWriteMaskEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](#VkDynamicState) specifies that the
`rasterizationStream` state in
[VkPipelineRasterizationStateStreamCreateInfoEXT](primsrast.html#VkPipelineRasterizationStateStreamCreateInfoEXT) will be ignored
and **must** be set dynamically with [vkCmdSetRasterizationStreamEXT](primsrast.html#vkCmdSetRasterizationStreamEXT)
before any draw call.

* 
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](#VkDynamicState) specifies
that the `conservativeRasterizationMode` state in
[VkPipelineRasterizationConservativeStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationConservativeStateCreateInfoEXT) will be
ignored and **must** be set dynamically with
[vkCmdSetConservativeRasterizationModeEXT](primsrast.html#vkCmdSetConservativeRasterizationModeEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](#VkDynamicState) specifies
that the `extraPrimitiveOverestimationSize` state in
[VkPipelineRasterizationConservativeStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationConservativeStateCreateInfoEXT) will be
ignored and **must** be set dynamically with
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](primsrast.html#vkCmdSetExtraPrimitiveOverestimationSizeEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](#VkDynamicState) specifies that the
`depthClipEnable` state in
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationDepthClipStateCreateInfoEXT) will be ignored
and **must** be set dynamically with [vkCmdSetDepthClipEnableEXT](vertexpostproc.html#vkCmdSetDepthClipEnableEXT)
before any draw call.

* 
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](#VkDynamicState) specifies that the
`sampleLocationsEnable` state in
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT) will be ignored and
**must** be set dynamically with [vkCmdSetSampleLocationsEnableEXT](primsrast.html#vkCmdSetSampleLocationsEnableEXT)
before any draw call.

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](#VkDynamicState) specifies that the
`colorBlendOp` state in [VkPipelineColorBlendAttachmentState](framebuffer.html#VkPipelineColorBlendAttachmentState),
and `srcPremultiplied`, `dstPremultiplied`, and
`blendOverlap` states in
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](framebuffer.html#VkPipelineColorBlendAdvancedStateCreateInfoEXT) will be ignored and
**must** be set dynamically with [vkCmdSetColorBlendAdvancedEXT](framebuffer.html#vkCmdSetColorBlendAdvancedEXT) before
any draw call.

* 
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](#VkDynamicState) specifies that the
`provokingVertexMode` state in
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](vertexpostproc.html#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT) will be
ignored and **must** be set dynamically with
[vkCmdSetProvokingVertexModeEXT](vertexpostproc.html#vkCmdSetProvokingVertexModeEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](#VkDynamicState) specifies that the
`lineRasterizationMode` state in
[VkPipelineRasterizationLineStateCreateInfo](primsrast.html#VkPipelineRasterizationLineStateCreateInfo) will be ignored and
**must** be set dynamically with [vkCmdSetLineRasterizationModeEXT](primsrast.html#vkCmdSetLineRasterizationModeEXT)
before any draw call.

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](#VkDynamicState) specifies that the
`stippledLineEnable` state in
[VkPipelineRasterizationLineStateCreateInfo](primsrast.html#VkPipelineRasterizationLineStateCreateInfo) will be ignored and
**must** be set dynamically with [vkCmdSetLineStippleEnableEXT](primsrast.html#vkCmdSetLineStippleEnableEXT) before
any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](#VkDynamicState) specifies that
the `negativeOneToOne` state in
[VkPipelineViewportDepthClipControlCreateInfoEXT](vertexpostproc.html#VkPipelineViewportDepthClipControlCreateInfoEXT) will be ignored
and **must** be set dynamically with
[vkCmdSetDepthClipNegativeOneToOneEXT](vertexpostproc.html#vkCmdSetDepthClipNegativeOneToOneEXT) before any draw call.

* 
[VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](#VkDynamicState) specifies that the
`depthClampMode` and `pDepthClampRange` state in
[VkPipelineViewportDepthClampControlCreateInfoEXT](fragops.html#VkPipelineViewportDepthClampControlCreateInfoEXT) will be ignored
and **must** be set dynamically with [vkCmdSetDepthClampRangeEXT](fragops.html#vkCmdSetDepthClampRangeEXT)
before any draw call.

* 
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](#VkDynamicState) specifies that the
`viewportWScalingEnable` state in
[VkPipelineViewportWScalingStateCreateInfoNV](vertexpostproc.html#VkPipelineViewportWScalingStateCreateInfoNV) will be ignored and
**must** be set dynamically with [vkCmdSetViewportWScalingEnableNV](vertexpostproc.html#vkCmdSetViewportWScalingEnableNV)
before any draw call.

* 
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](#VkDynamicState) specifies that the
`viewportCount`, and `pViewportSwizzles` states in
[VkPipelineViewportSwizzleStateCreateInfoNV](vertexpostproc.html#VkPipelineViewportSwizzleStateCreateInfoNV) will be ignored and
**must** be set dynamically with [vkCmdSetViewportSwizzleNV](vertexpostproc.html#vkCmdSetViewportSwizzleNV) before any
draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](#VkDynamicState) specifies that the
`coverageToColorEnable` state in
[VkPipelineCoverageToColorStateCreateInfoNV](fragops.html#VkPipelineCoverageToColorStateCreateInfoNV) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageToColorEnableNV](fragops.html#vkCmdSetCoverageToColorEnableNV)
before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](#VkDynamicState) specifies that the
`coverageToColorLocation` state in
[VkPipelineCoverageToColorStateCreateInfoNV](fragops.html#VkPipelineCoverageToColorStateCreateInfoNV) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageToColorLocationNV](fragops.html#vkCmdSetCoverageToColorLocationNV)
before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](#VkDynamicState) specifies that the
`coverageModulationMode` state in
[VkPipelineCoverageModulationStateCreateInfoNV](fragops.html#VkPipelineCoverageModulationStateCreateInfoNV) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageModulationModeNV](fragops.html#vkCmdSetCoverageModulationModeNV)
before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](#VkDynamicState) specifies
that the `coverageModulationTableEnable` state in
[VkPipelineCoverageModulationStateCreateInfoNV](fragops.html#VkPipelineCoverageModulationStateCreateInfoNV) will be ignored and
**must** be set dynamically with
[vkCmdSetCoverageModulationTableEnableNV](fragops.html#vkCmdSetCoverageModulationTableEnableNV) before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](#VkDynamicState) specifies that the
`coverageModulationTableCount`, and `pCoverageModulationTable`
states in [VkPipelineCoverageModulationStateCreateInfoNV](fragops.html#VkPipelineCoverageModulationStateCreateInfoNV) will be
ignored and **must** be set dynamically with
[vkCmdSetCoverageModulationTableNV](fragops.html#vkCmdSetCoverageModulationTableNV) before any draw call.

* 
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](#VkDynamicState) specifies that the
`shadingRateImageEnable` state in
[VkPipelineViewportShadingRateImageStateCreateInfoNV](primsrast.html#VkPipelineViewportShadingRateImageStateCreateInfoNV) will be
ignored and **must** be set dynamically with
[vkCmdSetShadingRateImageEnableNV](primsrast.html#vkCmdSetShadingRateImageEnableNV) before any draw call.

* 
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](#VkDynamicState) specifies
that the `representativeFragmentTestEnable` state in
[VkPipelineRepresentativeFragmentTestStateCreateInfoNV](fragops.html#VkPipelineRepresentativeFragmentTestStateCreateInfoNV) will be
ignored and **must** be set dynamically with
[vkCmdSetRepresentativeFragmentTestEnableNV](fragops.html#vkCmdSetRepresentativeFragmentTestEnableNV) before any draw call.

* 
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](#VkDynamicState) specifies that the
`coverageReductionMode` state in
[VkPipelineCoverageReductionStateCreateInfoNV](fragops.html#VkPipelineCoverageReductionStateCreateInfoNV) will be ignored and
**must** be set dynamically with [vkCmdSetCoverageReductionModeNV](fragops.html#vkCmdSetCoverageReductionModeNV)
before any draw call.

* 
[VK_DYNAMIC_STATE_ATTACHMENT_FEEDBACK_LOOP_ENABLE_EXT](#VkDynamicState) specifies
that the [VK_PIPELINE_CREATE_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits)
and
[VK_PIPELINE_CREATE_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkPipelineCreateFlagBits)
flags will be ignored and **must** be set dynamically with
[vkCmdSetAttachmentFeedbackLoopEnableEXT](renderpass.html#vkCmdSetAttachmentFeedbackLoopEnableEXT) before any draw call.

Primitive processing can be handled either on a per primitive basis by the
vertex, tessellation, and geometry shader stages, or on a per mesh basis
using task and mesh shader stages.
If the pipeline includes a mesh shader stage, it uses the mesh pipeline,
otherwise it uses the primitive pipeline.

If a task shader is omitted, the task shading stage is skipped.

If tessellation shader stages are omitted, the tessellation shading and
fixed-function stages of the pipeline are skipped.

If a geometry shader is omitted, the geometry shading stage is skipped.

If a fragment shader is omitted, fragment color outputs have **undefined**
values, and the fragment depth value is determined by [Fragment Operations](fragops.html#fragops) state.
This **can** be useful for depth-only rendering.

Presence of a shader stage in a pipeline is indicated by including a valid
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) with `module` and `pName`
selecting an entry point from a shader module, where that entry point is
valid for the stage specified by `stage`.

Presence of some of the fixed-function stages in the pipeline is implicitly
derived from enabled shaders and provided state.
For example, the fixed-function tessellator is always present when the
pipeline has valid Tessellation Control and Tessellation Evaluation shaders.

For example:

* 
Depth/stencil-only rendering in a subpass with no color attachments

Active Pipeline Shader Stages

Vertex Shader

Required: Fixed-Function Pipeline Stages

* 
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo)

* 
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo)

* 
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

* 
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)

* 
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)

* 
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo)

Color-only rendering in a subpass with no depth/stencil attachment

* 
Active Pipeline Shader Stages

Vertex Shader

* 
Fragment Shader

Required: Fixed-Function Pipeline Stages

* 
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo)

* 
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo)

* 
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

* 
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)

* 
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)

* 
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo)

Rendering pipeline with tessellation and geometry shaders

* 
Active Pipeline Shader Stages

Vertex Shader

* 
Tessellation Control Shader

* 
Tessellation Evaluation Shader

* 
Geometry Shader

* 
Fragment Shader

Required: Fixed-Function Pipeline Stages

* 
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo)

* 
[VkPipelineInputAssemblyStateCreateInfo](drawing.html#VkPipelineInputAssemblyStateCreateInfo)

* 
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo)

* 
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

* 
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)

* 
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)

* 
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo)

* 
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo)

Rendering pipeline with task and mesh shaders

* 
Active Pipeline Shader Stages

Task Shader

* 
Mesh Shader

* 
Fragment Shader

Required: Fixed-Function Pipeline Stages

* 
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo)

* 
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)

* 
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)

* 
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo)

* 
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo)

Graphics pipelines can contain multiple shader groups that can be bound
individually.
Each shader group behaves as if it was a pipeline using the shader group’s
state.
When the pipeline is bound by regular means, it behaves as if the state of
group `0` is active, use [vkCmdBindPipelineShaderGroupNV](#vkCmdBindPipelineShaderGroupNV) to bind an
individual shader group.

The primary purpose of shader groups is allowing the device to bind
different pipeline state using [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

The `VkGraphicsPipelineShaderGroupsCreateInfoNV` structure is defined
as:

// Provided by VK_NV_device_generated_commands
typedef struct VkGraphicsPipelineShaderGroupsCreateInfoNV {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    groupCount;
    const VkGraphicsShaderGroupCreateInfoNV*    pGroups;
    uint32_t                                    pipelineCount;
    const VkPipeline*                           pPipelines;
} VkGraphicsPipelineShaderGroupsCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`groupCount` is the number of elements in the `pGroups` array.

* 
`pGroups` is a pointer to an array of
[VkGraphicsShaderGroupCreateInfoNV](#VkGraphicsShaderGroupCreateInfoNV) structures specifying which
state of the original [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) each shader
group overrides.

* 
`pipelineCount` is the number of elements in the `pPipelines`
array.

* 
`pPipelines` is a pointer to an array of graphics `VkPipeline`
structures which are referenced within the created pipeline, including
all their shader groups.

When referencing shader groups by index, groups defined in the referenced
pipelines are treated as if they were defined as additional entries in
`pGroups`.
They are appended in the order they appear in the `pPipelines` array and
in the `pGroups` array when those pipelines were defined.

The application **must** maintain the lifetime of all such referenced pipelines
based on the pipelines that make use of them.

Valid Usage

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02879) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02879

`groupCount` **must** be at least `1` and as maximum
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxGraphicsShaderGroupCount`

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02880) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-groupCount-02880

The sum of `groupCount` including those groups added from referenced
`pPipelines` **must** also be as maximum
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV`::`maxGraphicsShaderGroupCount`

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02881) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02881

The state of the first element of `pGroups` **must** match its
equivalent within the parent’s [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02882) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02882

Each element of `pGroups` **must** in combination with the rest of the
pipeline state yield a valid state configuration

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02884) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02884

All elements of `pGroups` **must** use the same shader stage
combinations
unless any mesh shader stage is used, then either combination of task
and mesh or just mesh shader is valid

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02885) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-02885

Mesh and regular primitive shading stages cannot be mixed across
`pGroups`

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-02886) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-02886

Each element of `pPipelines` **must** have been created with identical
state to the pipeline currently created except the state that can be
overridden by [VkGraphicsShaderGroupCreateInfoNV](#VkGraphicsShaderGroupCreateInfoNV)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-deviceGeneratedCommands-02887) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-deviceGeneratedCommands-02887

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-sType-sType) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_SHADER_GROUPS_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-parameter) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pGroups-parameter

 If `groupCount` is not `0`, `pGroups` **must** be a valid pointer to an array of `groupCount` valid [VkGraphicsShaderGroupCreateInfoNV](#VkGraphicsShaderGroupCreateInfoNV) structures

* 
[](#VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-parameter) VUID-VkGraphicsPipelineShaderGroupsCreateInfoNV-pPipelines-parameter

 If `pipelineCount` is not `0`, `pPipelines` **must** be a valid pointer to an array of `pipelineCount` valid [VkPipeline](#VkPipeline) handles

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

The `VkGraphicsShaderGroupCreateInfoNV` structure provides the state
overrides for each shader group.
Each shader group behaves like a pipeline that was created from its state as
well as the remaining parent’s state.
It is defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkGraphicsShaderGroupCreateInfoNV {
    VkStructureType                                 sType;
    const void*                                     pNext;
    uint32_t                                        stageCount;
    const VkPipelineShaderStageCreateInfo*          pStages;
    const VkPipelineVertexInputStateCreateInfo*     pVertexInputState;
    const VkPipelineTessellationStateCreateInfo*    pTessellationState;
} VkGraphicsShaderGroupCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures specifying the set of
the shader stages to be included in this shader group.

* 
`pVertexInputState` is a pointer to a
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo) structure.

* 
`pTessellationState` is a pointer to a
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo) structure, and is ignored if
the shader group does not include a tessellation control shader stage
and tessellation evaluation shader stage.

Valid Usage

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-02888) VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-02888

For `stageCount`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`stageCount` apply

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-02889) VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-02889

For `pStages`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`pStages` apply

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pVertexInputState-02890) VUID-VkGraphicsShaderGroupCreateInfoNV-pVertexInputState-02890

For `pVertexInputState`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`pVertexInputState` apply

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pTessellationState-02891) VUID-VkGraphicsShaderGroupCreateInfoNV-pTessellationState-02891

For `pTessellationState`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`pTessellationState` apply

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-sType-sType) VUID-VkGraphicsShaderGroupCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_SHADER_GROUP_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pNext-pNext) VUID-VkGraphicsShaderGroupCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-parameter) VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-parameter

 `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-arraylength) VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-arraylength

 `stageCount` **must** be greater than `0`

Ray tracing pipelines consist of multiple shader stages, fixed-function
traversal stages, and a pipeline layout.

[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR) is a special shader index used to indicate that a
ray generation, miss, or callable shader member is not used.

#define VK_SHADER_UNUSED_KHR              (~0U)

#define VK_SHADER_UNUSED_NV               VK_SHADER_UNUSED_KHR

The [VkRayTracingShaderGroupTypeKHR](#VkRayTracingShaderGroupTypeKHR) enumeration is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef enum VkRayTracingShaderGroupTypeKHR {
    VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR = 0,
    VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR = 1,
    VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR = 2,
  // Provided by VK_NV_ray_tracing
    VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV = VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR,
  // Provided by VK_NV_ray_tracing
    VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV = VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR,
  // Provided by VK_NV_ray_tracing
    VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV = VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR,
} VkRayTracingShaderGroupTypeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkRayTracingShaderGroupTypeKHR
typedef VkRayTracingShaderGroupTypeKHR VkRayTracingShaderGroupTypeNV;

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR](#VkRayTracingShaderGroupTypeNV) specifies that a
shader group with a single [VK_SHADER_STAGE_RAYGEN_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MISS_BIT_KHR](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](#VkShaderStageFlagBits) shader in it.

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV) specifies
that a shader group that only hits triangles and **must** not contain an
intersection shader, only closest hit and any-hit shaders.

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV)
specifies that a shader group that only intersects with custom geometry
and **must** contain an intersection shader and **may** contain closest hit
and any-hit shaders.

|  | For current group types, the hit group type could be inferred from the
| --- | --- |
presence or absence of the intersection shader, but we provide the type
explicitly for future hit groups that do not have that property. |

To create ray tracing pipelines, call:

// Provided by VK_KHR_ray_tracing_pipeline
VkResult vkCreateRayTracingPipelinesKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkRayTracingPipelineCreateInfoKHR*    pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the ray tracing
pipelines.

* 
`deferredOperation` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or the handle of a valid
[VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) [    request deferral](VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) object for this command.

* 
`pipelineCache` is
either [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), indicating that pipeline caching is
disabled, or to enable caching,
the handle of a valid [VkPipelineCache](#VkPipelineCache) object.
The implementation **must** not access this object outside of the duration
of this command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array in which the resulting ray
tracing pipeline objects are returned.

The [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult) error is returned if the
implementation is unable to reuse the shader group handles provided in
[VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR)::`pShaderGroupCaptureReplayHandle`
when
[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](features.html#VkPhysicalDeviceRayTracingPipelineFeaturesKHR)::`rayTracingPipelineShaderGroupHandleCaptureReplay`
is enabled.

Pipelines are created and returned as described for [Multiple Pipeline Creation](#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-device-09677) VUID-vkCreateRayTracingPipelinesKHR-device-09677

`device` **must** support at least one queue family with the
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-flags-03415) VUID-vkCreateRayTracingPipelinesKHR-flags-03415

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-flags-03416) VUID-vkCreateRayTracingPipelinesKHR-flags-03416

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits) flag set

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-flags-03816) VUID-vkCreateRayTracingPipelinesKHR-flags-03816

`flags` **must** not contain the
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](#VkPipelineCreateFlagBits) flag

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pipelineCache-02903) VUID-vkCreateRayTracingPipelinesKHR-pipelineCache-02903

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits), host access
to `pipelineCache` **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-03678) VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-03678

Any previous deferred operation that was associated with
`deferredOperation` **must** be complete

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pNext-09616) VUID-vkCreateRayTracingPipelinesKHR-pNext-09616

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pNext-09617) VUID-vkCreateRayTracingPipelinesKHR-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-binaryCount-09620) VUID-vkCreateRayTracingPipelinesKHR-binaryCount-09620

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#VkPipelineCreationFeedbackFlagBitsEXT)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-binaryCount-09621) VUID-vkCreateRayTracingPipelinesKHR-binaryCount-09621

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-binaryCount-09622) VUID-vkCreateRayTracingPipelinesKHR-binaryCount-09622

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](#VkPipelineCreateFlagBits) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pCreateInfos-11414) VUID-vkCreateRayTracingPipelinesKHR-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)))
[VkSampler](samplers.html#VkSampler) objects currently created on the device

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pCreateInfos-11429) VUID-vkCreateRayTracingPipelinesKHR-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-rayTracingPipeline-03586) VUID-vkCreateRayTracingPipelinesKHR-rayTracingPipeline-03586

The [`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature
**must** be enabled

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-03587) VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-03587

If `deferredOperation` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `flags`
member of elements of `pCreateInfos` **must** not include
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-device-parameter) VUID-vkCreateRayTracingPipelinesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-parameter) VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pipelineCache-parameter) VUID-vkCreateRayTracingPipelinesKHR-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineCache` **must** be a valid [VkPipelineCache](#VkPipelineCache) handle

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pCreateInfos-parameter) VUID-vkCreateRayTracingPipelinesKHR-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR) structures

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pAllocator-parameter) VUID-vkCreateRayTracingPipelinesKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pPipelines-parameter) VUID-vkCreateRayTracingPipelinesKHR-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](#VkPipeline) handles

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-createInfoCount-arraylength) VUID-vkCreateRayTracingPipelinesKHR-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-parent) VUID-vkCreateRayTracingPipelinesKHR-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkCreateRayTracingPipelinesKHR-pipelineCache-parent) VUID-vkCreateRayTracingPipelinesKHR-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_OPERATION_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_OPERATION_NOT_DEFERRED_KHR](fundamentals.html#VkResult)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) specifying
how the pipeline will be generated.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array of `stageCount`
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures describing the set of
the shader stages to be included in the ray tracing pipeline.

* 
`groupCount` is the number of entries in the `pGroups` array.

* 
`pGroups` is a pointer to an array of `groupCount`
[VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR) structures describing the set
of the shader stages to be included in each shader group in the ray
tracing pipeline.

* 
`maxPipelineRayRecursionDepth` is the [    maximum recursion depth](raytracing.html#ray-tracing-recursion-depth) of shaders executed by this pipeline.

* 
`pLibraryInfo` is a pointer to a
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) structure defining pipeline
libraries to include.

* 
`pLibraryInterface` is a pointer to a
[VkRayTracingPipelineInterfaceCreateInfoKHR](#VkRayTracingPipelineInterfaceCreateInfoKHR) structure defining
additional information when using pipeline libraries.

* 
`pDynamicState` is a pointer to a
[VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo) structure, and is used to
indicate which properties of the pipeline state object are dynamic and
**can** be changed independently of the pipeline state.
This **can** be `NULL`, which means no state in the pipeline is considered
dynamic.

* 
`layout` is the description of binding locations used by both the
    pipeline and descriptor sets used with the pipeline.
    If
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is greater than or
    equal to Vulkan 1.3
or
    [VK_KHR_maintenance4](../appendices/extensions.html#VK_KHR_maintenance4) is enabled
    `layout` **must** not be accessed by the implementation outside of the
    duration of the command this structure is passed to.

* 
`basePipelineHandle` is a pipeline to derive from.

* 
`basePipelineIndex` is an index into the `pCreateInfos`
parameter to use as a pipeline to derive from.

The parameters `basePipelineHandle` and `basePipelineIndex` are
described in more detail in [Pipeline Derivatives](#pipelines-pipeline-derivatives).

When [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits) is specified, this pipeline
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
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](#VkDynamicState) is not provided
is computed as described in [Ray Tracing Pipeline Stack](raytracing.html#ray-tracing-pipeline-stack).

If the `pNext` chain includes a [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)
structure, [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)::`flags` from that
structure is used instead of `flags` from this structure.

If the `pNext` chain includes a
[VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](#VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV)
structure, then that structure controls whether cluster acceleration
structures are allowed in this ray tracing pipeline.

Valid Usage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-None-09497) VUID-VkRayTracingPipelineCreateInfoKHR-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) values

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07984) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid ray tracing `VkPipeline` handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07985) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07986) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07987) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-10069) VUID-VkRayTracingPipelineCreateInfoKHR-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07988) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07988

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07990) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07990

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptorsets.html#VkDescriptorType),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-07991) VUID-VkRayTracingPipelineCreateInfoKHR-layout-07991

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-None-10391) VUID-VkRayTracingPipelineCreateInfoKHR-None-10391

If a [resource variables](interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11798) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11798

If [shader64BitIndexing](features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pipelineCreationCacheControl-02878) VUID-VkRayTracingPipelineCreateInfoKHR-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pipelineProtectedAccess-07368) VUID-VkRayTracingPipelineCreateInfoKHR-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07369) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11311) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), `layout` **must**
be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11312) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all shader variables
in the [shader resource interface](interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::pMappings

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pStages-03426) VUID-VkRayTracingPipelineCreateInfoKHR-pStages-03426

The shader code for the entry points identified by `pStages`, and
the rest of the state identified by this structure **must** adhere to the
pipeline linking rules described in the [Shader Interfaces](interfaces.html#interfaces)
chapter

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-03428) VUID-VkRayTracingPipelineCreateInfoKHR-layout-03428

The number of resources in `layout` accessible to each shader stage
that is used by the pipeline **must** be less than or equal to
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxPerStageResources`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-02904) VUID-VkRayTracingPipelineCreateInfoKHR-flags-02904

`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-12341) VUID-VkRayTracingPipelineCreateInfoKHR-flags-12341

`flags` **must** not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-stage-03425) VUID-VkRayTracingPipelineCreateInfoKHR-stage-03425

If `flags` does not include
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits), the `stage` member of at
least one element of `pStages`, including those implicitly added by
`pLibraryInfo`, **must** be [VK_SHADER_STAGE_RAYGEN_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-maxPipelineRayRecursionDepth-03589) VUID-VkRayTracingPipelineCreateInfoKHR-maxPipelineRayRecursionDepth-03589

`maxPipelineRayRecursionDepth` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`maxRayRecursionDepth`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03465) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03465

If `flags` includes [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits),
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
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), each element of `pLibraryInfo->pLibraries`
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
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04718) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04718

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits), each element of
`pLibraryInfo->pLibraries` **must** have been created with the
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits) bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04719) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04719

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits) bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04720) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04720

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits) bit
set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04721) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04721

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04722) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04722

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits),
each element of `pLibraryInfo->pLibraries` **must** have been created
with the
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-04723) VUID-VkRayTracingPipelineCreateInfoKHR-flags-04723

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03595) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-03595

If the `[VK_KHR_pipeline_library](../appendices/extensions.html#VK_KHR_pipeline_library)` extension is not enabled,
`pLibraryInfo` and `pLibraryInterface` **must** be `NULL`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03470) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03470

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits),
for each element of `pGroups` with a `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV), the
`anyHitShader` of that element **must** not be
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03471) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03471

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits),
for each element of `pGroups` with a `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV), the
`closestHitShader` of that element **must** not be
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03596) VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03596

If the [    `rayTraversalPrimitiveCulling`](features.html#features-rayTraversalPrimitiveCulling) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03597) VUID-VkRayTracingPipelineCreateInfoKHR-rayTraversalPrimitiveCulling-03597

If the [    `rayTraversalPrimitiveCulling`](features.html#features-rayTraversalPrimitiveCulling) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-06546) VUID-VkRayTracingPipelineCreateInfoKHR-flags-06546

`flags` **must** not include both
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-03598) VUID-VkRayTracingPipelineCreateInfoKHR-flags-03598

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits),
[    `rayTracingPipelineShaderGroupHandleCaptureReplay`](features.html#features-rayTracingPipelineShaderGroupHandleCaptureReplay) **must** be
enabled

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplay-03599) VUID-VkRayTracingPipelineCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplay-03599

If
[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](features.html#VkPhysicalDeviceRayTracingPipelineFeaturesKHR)::`rayTracingPipelineShaderGroupHandleCaptureReplay`
is [VK_TRUE](fundamentals.html#VK_TRUE) and the `pShaderGroupCaptureReplayHandle` member of
any element of `pGroups` is not `NULL`, `flags` **must** include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-07999) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-07999

If `pLibraryInfo` is `NULL` or its `libraryCount` is `0`,
`stageCount` **must** not be `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-08700) VUID-VkRayTracingPipelineCreateInfoKHR-flags-08700

If `flags` does not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)
and either `pLibraryInfo` is `NULL` or its `libraryCount` is
`0`, `groupCount` **must** not be `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicStates-03602) VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicStates-03602

Any element of the `pDynamicStates` member of `pDynamicState`
**must** be [VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](#VkDynamicState)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pipelineStageCreationFeedbackCount-06652) VUID-VkRayTracingPipelineCreateInfoKHR-pipelineStageCreationFeedbackCount-06652

If
[VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be equal to `stageCount`

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-stage-06899) VUID-VkRayTracingPipelineCreateInfoKHR-stage-06899

The `stage` value in all `pStages` elements **must** be one of
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MISS_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-07403) VUID-VkRayTracingPipelineCreateInfoKHR-flags-07403

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits) bit
set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-08701) VUID-VkRayTracingPipelineCreateInfoKHR-flags-08701

If `flags` includes
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#VkPipelineCreateFlagBits), each
element of `pLibraryInfo->pLibraries` **must** have been created with
the [VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#VkPipelineCreateFlagBits)
bit set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-10392) VUID-VkRayTracingPipelineCreateInfoKHR-flags-10392

If the `pNext` chain includes a
[VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo) structure, `flags` **must** not
include both
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and
[VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11275) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11275

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-11276) VUID-VkRayTracingPipelineCreateInfoKHR-flags-11276

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all
libraries linked to this pipeline **must** also not have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-12361) VUID-VkRayTracingPipelineCreateInfoKHR-flags-12361

If `flags` includes
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-flags-12362) VUID-VkRayTracingPipelineCreateInfoKHR-flags-12362

If `flags` does not include
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkPipelineCreateFlagBits), all libraries linked
to this pipeline **must** also not have that flag set

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-None-11369) VUID-VkRayTracingPipelineCreateInfoKHR-None-11369

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
`layout` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-sType-sType) VUID-VkRayTracingPipelineCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pNext-pNext) VUID-VkRayTracingPipelineCreateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR), [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo), [VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo), [VkPipelineRobustnessCreateInfo](#VkPipelineRobustnessCreateInfo), or [VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](#VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV)

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-sType-unique) VUID-VkRayTracingPipelineCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pStages-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pStages-parameter

 If `stageCount` is not `0`, `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pGroups-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pGroups-parameter

 If `groupCount` is not `0`, `pGroups` **must** be a valid pointer to an array of `groupCount` valid [VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInfo-parameter

 If `pLibraryInfo` is not `NULL`, `pLibraryInfo` **must** be a valid pointer to a valid [VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR) structure

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInterface-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pLibraryInterface-parameter

 If `pLibraryInterface` is not `NULL`, `pLibraryInterface` **must** be a valid pointer to a valid [VkRayTracingPipelineInterfaceCreateInfoKHR](#VkRayTracingPipelineInterfaceCreateInfoKHR) structure

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicState-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-pDynamicState-parameter

 If `pDynamicState` is not `NULL`, `pDynamicState` **must** be a valid pointer to a valid [VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo) structure

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-layout-parameter) VUID-VkRayTracingPipelineCreateInfoKHR-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoKHR-commonparent) VUID-VkRayTracingPipelineCreateInfoKHR-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The [VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](#VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV)
structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline with VK_NV_cluster_acceleration_structure
typedef struct VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           allowClusterAccelerationStructure;
} VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allowClusterAccelerationStructure` controls if cluster acceleration
structures are allowed in the ray tracing pipeline.

If no cluster acceleration structures are present in the ray tracing
pipeline, `allowClusterAccelerationStructure` **should** not be used to
prevent traversal penalty on some implementations.

Valid Usage

* 
[](#VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-clusterAccelerationStructure-10576) VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-clusterAccelerationStructure-10576

The [    `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`::`clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-sType-sType) VUID-VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CLUSTER_ACCELERATION_STRUCTURE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)

The `VkRayTracingShaderGroupCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkRayTracingShaderGroupCreateInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkRayTracingShaderGroupTypeKHR    type;
    uint32_t                          generalShader;
    uint32_t                          closestHitShader;
    uint32_t                          anyHitShader;
    uint32_t                          intersectionShader;
    const void*                       pShaderGroupCaptureReplayHandle;
} VkRayTracingShaderGroupCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of hit group specified in this structure.

* 
`generalShader` is the index of the ray generation, miss, or
callable shader from
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR) otherwise.

* 
`closestHitShader` is the optional index of the closest hit shader
from [VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` in the group
if the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR) otherwise.

* 
`anyHitShader` is the optional index of the any-hit shader from
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR) otherwise.

* 
`intersectionShader` is the index of the intersection shader from
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR) otherwise.

* 
`pShaderGroupCaptureReplayHandle` is `NULL` or a pointer to replay
information for this shader group queried from
[vkGetRayTracingCaptureReplayShaderGroupHandlesKHR](#vkGetRayTracingCaptureReplayShaderGroupHandlesKHR), as described in
[Ray Tracing Capture Replay](raytracing.html#ray-tracing-capture-replay).
Ignored if
[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](features.html#VkPhysicalDeviceRayTracingPipelineFeaturesKHR)::`rayTracingPipelineShaderGroupHandleCaptureReplay`
is [VK_FALSE](fundamentals.html#VK_FALSE).

If the pipeline is created with [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits) and
the [pipelineLibraryGroupHandles](features.html#features-pipelineLibraryGroupHandles)
feature is enabled, `pShaderGroupCaptureReplayHandle` is inherited by
all pipelines which link against this pipeline and remains bitwise identical
for any pipeline which references this pipeline library.

Valid Usage

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03474) VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03474

If `type` is [VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR](#VkRayTracingShaderGroupTypeNV) then
`generalShader` **must** be a valid index into the list of shaders,
formed by shaders in
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` and the shaders
imported from pipeline libraries, referring to a shader of
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MISS_BIT_KHR](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03475) VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03475

If `type` is [VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR](#VkRayTracingShaderGroupTypeNV) then
`closestHitShader`, `anyHitShader`, and `intersectionShader`
**must** be [VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03476) VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03476

If `type` is
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV) then
`intersectionShader` **must** be a valid index into the list of
shaders, formed by shaders in
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` and the shaders
imported from pipeline libraries, referring to a shader of
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03477) VUID-VkRayTracingShaderGroupCreateInfoKHR-type-03477

If `type` is
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](#VkRayTracingShaderGroupTypeNV) then
`intersectionShader` **must** be [VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-closestHitShader-03478) VUID-VkRayTracingShaderGroupCreateInfoKHR-closestHitShader-03478

`closestHitShader` **must** be either [VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR) or a
valid index into the list of shaders, formed by shaders in
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` and the shaders
imported from pipeline libraries, referring to a shader of
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-anyHitShader-03479) VUID-VkRayTracingShaderGroupCreateInfoKHR-anyHitShader-03479

`anyHitShader` **must** be either [VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR) or a valid
index into the list of shaders, formed by shaders in
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages` and the shaders
imported from pipeline libraries, referring to a shader of
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03603) VUID-VkRayTracingShaderGroupCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03603

If
[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](features.html#VkPhysicalDeviceRayTracingPipelineFeaturesKHR)::`rayTracingPipelineShaderGroupHandleCaptureReplayMixed`
is [VK_FALSE](fundamentals.html#VK_FALSE) then `pShaderGroupCaptureReplayHandle` **must** not
be provided if it has not been provided on a previous call to ray
tracing pipeline creation

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03604) VUID-VkRayTracingShaderGroupCreateInfoKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03604

If
[VkPhysicalDeviceRayTracingPipelineFeaturesKHR](features.html#VkPhysicalDeviceRayTracingPipelineFeaturesKHR)::`rayTracingPipelineShaderGroupHandleCaptureReplayMixed`
is [VK_FALSE](fundamentals.html#VK_FALSE) then the caller **must** guarantee that no ray tracing
pipeline creation commands with `pShaderGroupCaptureReplayHandle`
provided execute simultaneously with ray tracing pipeline creation
commands without `pShaderGroupCaptureReplayHandle` provided

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-sType-sType) VUID-VkRayTracingShaderGroupCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_SHADER_GROUP_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-pNext-pNext) VUID-VkRayTracingShaderGroupCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoKHR-type-parameter) VUID-VkRayTracingShaderGroupCreateInfoKHR-type-parameter

 `type` **must** be a valid [VkRayTracingShaderGroupTypeKHR](#VkRayTracingShaderGroupTypeKHR) value

The `VkRayTracingPipelineInterfaceCreateInfoKHR` structure is defined
as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkRayTracingPipelineInterfaceCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maxPipelineRayPayloadSize;
    uint32_t           maxPipelineRayHitAttributeSize;
} VkRayTracingPipelineInterfaceCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxPipelineRayPayloadSize` is the maximum payload size in bytes
used by any shader in the pipeline.

* 
`maxPipelineRayHitAttributeSize` is the maximum attribute structure
size in bytes used by any shader in the pipeline.

`maxPipelineRayPayloadSize` is calculated as the maximum size of the
block (in bytes) declared in the `RayPayloadKHR` or
`IncomingRayPayloadKHR` storage classes.
`maxPipelineRayHitAttributeSize` is calculated as the maximum size of
any block (in bytes) declared in the `HitAttributeKHR`
or `HitObjectAttributeEXT`
storage class.
As variables in these storage classes do not have explicit offsets, the size
should be calculated as if each variable has a
[scalar alignment](interfaces.html#interfaces-alignment-requirements) equal to the largest
scalar alignment of any of the block’s members.

|  | There is no explicit upper limit for `maxPipelineRayPayloadSize`, but in
| --- | --- |
practice it should be kept as small as possible.
Similar to invocation local memory, it must be allocated for each shader
invocation and for devices which support many simultaneous invocations, this
storage can rapidly be exhausted, resulting in failure. |

Valid Usage

* 
[](#VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-maxPipelineRayHitAttributeSize-03605) VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-maxPipelineRayHitAttributeSize-03605

`maxPipelineRayHitAttributeSize` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`maxRayHitAttributeSize`

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-sType-sType) VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_INTERFACE_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-pNext-pNext) VUID-VkRayTracingPipelineInterfaceCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

To create ray tracing pipelines, call:

// Provided by VK_NV_ray_tracing
VkResult vkCreateRayTracingPipelinesNV(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkRayTracingPipelineCreateInfoNV*     pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the ray tracing
pipelines.

* 
`pipelineCache` is
either [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), indicating that pipeline caching is
disabled, or to enable caching,
the handle of a valid [VkPipelineCache](#VkPipelineCache) object.
The implementation **must** not access this object outside of the duration
of this command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array in which the resulting ray
tracing pipeline objects are returned.

Pipelines are created and returned as described for [Multiple Pipeline Creation](#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateRayTracingPipelinesNV-device-09677) VUID-vkCreateRayTracingPipelinesNV-device-09677

`device` **must** support at least one queue family with the
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateRayTracingPipelinesNV-flags-03415) VUID-vkCreateRayTracingPipelinesNV-flags-03415

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-flags-03416) VUID-vkCreateRayTracingPipelinesNV-flags-03416

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits) flag set

* 
[](#VUID-vkCreateRayTracingPipelinesNV-flags-03816) VUID-vkCreateRayTracingPipelinesNV-flags-03816

`flags` **must** not contain the
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](#VkPipelineCreateFlagBits) flag

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pipelineCache-02903) VUID-vkCreateRayTracingPipelinesNV-pipelineCache-02903

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits), host access
to `pipelineCache` **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pNext-09616) VUID-vkCreateRayTracingPipelinesNV-pNext-09616

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pNext-09617) VUID-vkCreateRayTracingPipelinesNV-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-binaryCount-09620) VUID-vkCreateRayTracingPipelinesNV-binaryCount-09620

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#VkPipelineCreationFeedbackFlagBitsEXT)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-binaryCount-09621) VUID-vkCreateRayTracingPipelinesNV-binaryCount-09621

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-binaryCount-09622) VUID-vkCreateRayTracingPipelinesNV-binaryCount-09622

If [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](#VkPipelineCreateFlagBits) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11414) VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)))
[VkSampler](samplers.html#VkSampler) objects currently created on the device

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11429) VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pNext-10150) VUID-vkCreateRayTracingPipelinesNV-pNext-10150

If a [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR) structure is included in
the `pNext` chain of any element of `pCreateInfos`,
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) flag **must** not be set

Valid Usage (Implicit)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-device-parameter) VUID-vkCreateRayTracingPipelinesNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parameter) VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineCache` **must** be a valid [VkPipelineCache](#VkPipelineCache) handle

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-parameter) VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV) structures

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pAllocator-parameter) VUID-vkCreateRayTracingPipelinesNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pPipelines-parameter) VUID-vkCreateRayTracingPipelinesNV-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](#VkPipeline) handles

* 
[](#VUID-vkCreateRayTracingPipelinesNV-createInfoCount-arraylength) VUID-vkCreateRayTracingPipelinesNV-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parent) VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_SHADER_NV](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) specifying
how the pipeline will be generated.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array of
[VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures specifying the set of
the shader stages to be included in the ray tracing pipeline.

* 
`groupCount` is the number of entries in the `pGroups` array.

* 
`pGroups` is a pointer to an array of
[VkRayTracingShaderGroupCreateInfoNV](#VkRayTracingShaderGroupCreateInfoNV) structures describing the set
of the shader stages to be included in each shader group in the ray
tracing pipeline.

* 
`maxRecursionDepth` is the [maximum    recursion depth](raytracing.html#ray-tracing-recursion-depth) of shaders executed by this pipeline.

* 
`layout` is the description of binding locations used by both the
    pipeline and descriptor sets used with the pipeline.
    If
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is greater than or
    equal to Vulkan 1.3
or
    [VK_KHR_maintenance4](../appendices/extensions.html#VK_KHR_maintenance4) is enabled
    `layout` **must** not be accessed by the implementation outside of the
    duration of the command this structure is passed to.

* 
`basePipelineHandle` is a pipeline to derive from.

* 
`basePipelineIndex` is an index into the `pCreateInfos`
parameter to use as a pipeline to derive from.

The parameters `basePipelineHandle` and `basePipelineIndex` are
described in more detail in [Pipeline Derivatives](#pipelines-pipeline-derivatives).

If the `pNext` chain includes a [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)
structure, [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo)::`flags` from that
structure is used instead of `flags` from this structure.

Valid Usage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-None-09497) VUID-VkRayTracingPipelineCreateInfoNV-None-09497

If the `pNext` chain does not include a
[VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo) structure,
`flags` **must** be a valid combination of
[VkPipelineCreateFlagBits](#VkPipelineCreateFlagBits) values

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07984) VUID-VkRayTracingPipelineCreateInfoNV-flags-07984

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineIndex` is -1, `basePipelineHandle` **must**
be a valid ray tracing `VkPipeline` handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07985) VUID-VkRayTracingPipelineCreateInfoNV-flags-07985

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, and `basePipelineHandle` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`basePipelineIndex` **must** be a valid index into the calling
command’s `pCreateInfos` parameter

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07986) VUID-VkRayTracingPipelineCreateInfoNV-flags-07986

If `flags` contains the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits)
flag, `basePipelineIndex` **must** be -1 or `basePipelineHandle`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07987) VUID-VkRayTracingPipelineCreateInfoNV-layout-07987

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), a push constant range in `layout` **must** match
the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-10069) VUID-VkRayTracingPipelineCreateInfoNV-layout-10069

If a push constant block is declared in a shader and `layout` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the block must be contained inside the push
constant range in `layout` that matches the stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07988) VUID-VkRayTracingPipelineCreateInfoNV-layout-07988

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the corresponding
descriptor set in `layout` **must** match the shader stage

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07990) VUID-VkRayTracingPipelineCreateInfoNV-layout-07990

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader,
`layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptorsets.html#VkDescriptorType),
the corresponding descriptor set in `layout` **must** match the
descriptor type

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-07991) VUID-VkRayTracingPipelineCreateInfoNV-layout-07991

If a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
as an array and `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
corresponding descriptor binding used to create `layout` **must** have
a `descriptorCount` that is greater than or equal to the length of
the array

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-None-10391) VUID-VkRayTracingPipelineCreateInfoNV-None-10391

If a [resource variables](interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11798) VUID-VkRayTracingPipelineCreateInfoNV-flags-11798

If [shader64BitIndexing](features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pipelineCreationCacheControl-02878) VUID-VkRayTracingPipelineCreateInfoNV-pipelineCreationCacheControl-02878

If the [    `pipelineCreationCacheControl`](features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pipelineProtectedAccess-07368) VUID-VkRayTracingPipelineCreateInfoNV-pipelineProtectedAccess-07368

If the [    `pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature is not enabled, `flags`
**must** not include [VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07369) VUID-VkRayTracingPipelineCreateInfoNV-flags-07369

`flags` **must** not include both
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11311) VUID-VkRayTracingPipelineCreateInfoNV-flags-11311

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), `layout` **must**
be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11312) VUID-VkRayTracingPipelineCreateInfoNV-flags-11312

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` includes
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR), all shader variables
in the [shader resource interface](interfaces.html#interfaces-resources) with a
`DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::pMappings

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pStages-03426) VUID-VkRayTracingPipelineCreateInfoNV-pStages-03426

The shader code for the entry points identified by `pStages`, and
the rest of the state identified by this structure **must** adhere to the
pipeline linking rules described in the [Shader Interfaces](interfaces.html#interfaces)
chapter

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-03428) VUID-VkRayTracingPipelineCreateInfoNV-layout-03428

The number of resources in `layout` accessible to each shader stage
that is used by the pipeline **must** be less than or equal to
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxPerStageResources`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-02904) VUID-VkRayTracingPipelineCreateInfoNV-flags-02904

`flags` **must** not include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-12341) VUID-VkRayTracingPipelineCreateInfoNV-flags-12341

`flags` **must** not include
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits) nor
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-stage-06232) VUID-VkRayTracingPipelineCreateInfoNV-stage-06232

The `stage` member of at least one element of `pStages` **must** be
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03456) VUID-VkRayTracingPipelineCreateInfoNV-flags-03456

`flags` **must** not include [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-maxRecursionDepth-03457) VUID-VkRayTracingPipelineCreateInfoNV-maxRecursionDepth-03457

`maxRecursionDepth` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](limits.html#VkPhysicalDeviceRayTracingPropertiesNV)::`maxRecursionDepth`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03458) VUID-VkRayTracingPipelineCreateInfoNV-flags-03458

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03459) VUID-VkRayTracingPipelineCreateInfoNV-flags-03459

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03460) VUID-VkRayTracingPipelineCreateInfoNV-flags-03460

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03461) VUID-VkRayTracingPipelineCreateInfoNV-flags-03461

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03462) VUID-VkRayTracingPipelineCreateInfoNV-flags-03462

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03463) VUID-VkRayTracingPipelineCreateInfoNV-flags-03463

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-03588) VUID-VkRayTracingPipelineCreateInfoNV-flags-03588

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-04948) VUID-VkRayTracingPipelineCreateInfoNV-flags-04948

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-02957) VUID-VkRayTracingPipelineCreateInfoNV-flags-02957

`flags` **must** not include both
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](#VkPipelineCreateFlagBits) and
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) at the
same time

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pipelineStageCreationFeedbackCount-06651) VUID-VkRayTracingPipelineCreateInfoNV-pipelineStageCreationFeedbackCount-06651

If
[VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo)::`pipelineStageCreationFeedbackCount`
is not `0`, it **must** be equal to `stageCount`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-stage-06898) VUID-VkRayTracingPipelineCreateInfoNV-stage-06898

The `stage` value in all `pStages` elements **must** be one of
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MISS_BIT_KHR](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07402) VUID-VkRayTracingPipelineCreateInfoNV-flags-07402

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-07998) VUID-VkRayTracingPipelineCreateInfoNV-flags-07998

`flags` **must** not include
[VK_PIPELINE_CREATE_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-flags-11008) VUID-VkRayTracingPipelineCreateInfoNV-flags-11008

`flags` **must** not include
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-None-11368) VUID-VkRayTracingPipelineCreateInfoNV-None-11368

If [VkPipelineCreateFlags2CreateInfoKHR](#VkPipelineCreateFlags2CreateInfoKHR)::`flags` does not
include [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkPipelineCreateFlagBits2KHR),
`layout` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-sType-sType) VUID-VkRayTracingPipelineCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pNext-pNext) VUID-VkRayTracingPipelineCreateInfoNV-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineCreateFlags2CreateInfo](#VkPipelineCreateFlags2CreateInfo) or [VkPipelineCreationFeedbackCreateInfo](#VkPipelineCreationFeedbackCreateInfo)

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-sType-unique) VUID-VkRayTracingPipelineCreateInfoNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pStages-parameter) VUID-VkRayTracingPipelineCreateInfoNV-pStages-parameter

 `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-pGroups-parameter) VUID-VkRayTracingPipelineCreateInfoNV-pGroups-parameter

 `pGroups` **must** be a valid pointer to an array of `groupCount` valid [VkRayTracingShaderGroupCreateInfoNV](#VkRayTracingShaderGroupCreateInfoNV) structures

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-layout-parameter) VUID-VkRayTracingPipelineCreateInfoNV-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-stageCount-arraylength) VUID-VkRayTracingPipelineCreateInfoNV-stageCount-arraylength

 `stageCount` **must** be greater than `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-groupCount-arraylength) VUID-VkRayTracingPipelineCreateInfoNV-groupCount-arraylength

 `groupCount` **must** be greater than `0`

* 
[](#VUID-VkRayTracingPipelineCreateInfoNV-commonparent) VUID-VkRayTracingPipelineCreateInfoNV-commonparent

 Both of `basePipelineHandle`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The `VkRayTracingShaderGroupCreateInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkRayTracingShaderGroupCreateInfoNV {
    VkStructureType                   sType;
    const void*                       pNext;
    VkRayTracingShaderGroupTypeKHR    type;
    uint32_t                          generalShader;
    uint32_t                          closestHitShader;
    uint32_t                          anyHitShader;
    uint32_t                          intersectionShader;
} VkRayTracingShaderGroupCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of hit group specified in this structure.

* 
`generalShader` is the index of the ray generation, miss, or
callable shader from
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV) otherwise.

* 
`closestHitShader` is the optional index of the closest hit shader
from [VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages` in the group
if the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV](#VkRayTracingShaderGroupTypeNV) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV) otherwise.

* 
`anyHitShader` is the optional index of the any-hit shader from
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV](#VkRayTracingShaderGroupTypeNV) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV) otherwise.

* 
`intersectionShader` is the index of the intersection shader from
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](#VkRayTracingShaderGroupTypeNV), and
[VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV) otherwise.

Valid Usage

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02413) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02413

If `type` is [VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV](#VkRayTracingShaderGroupTypeNV) then
`generalShader` **must** be a valid index into
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages` referring to a
shader of [VK_SHADER_STAGE_RAYGEN_BIT_NV](#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MISS_BIT_NV](#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_CALLABLE_BIT_NV](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02414) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02414

If `type` is [VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV](#VkRayTracingShaderGroupTypeNV) then
`closestHitShader`, `anyHitShader`, and `intersectionShader`
**must** be [VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02415) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02415

If `type` is
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](#VkRayTracingShaderGroupTypeNV) then
`intersectionShader` **must** be a valid index into
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages` referring to a
shader of [VK_SHADER_STAGE_INTERSECTION_BIT_NV](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02416) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02416

If `type` is
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV](#VkRayTracingShaderGroupTypeNV) then
`intersectionShader` **must** be [VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-closestHitShader-02417) VUID-VkRayTracingShaderGroupCreateInfoNV-closestHitShader-02417

`closestHitShader` **must** be either [VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV) or a
valid index into [VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages`
referring to a shader of [VK_SHADER_STAGE_CLOSEST_HIT_BIT_NV](#VkShaderStageFlagBits)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-anyHitShader-02418) VUID-VkRayTracingShaderGroupCreateInfoNV-anyHitShader-02418

`anyHitShader` **must** be either [VK_SHADER_UNUSED_NV](#VK_SHADER_UNUSED_NV) or a valid
index into [VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages`
referring to a shader of [VK_SHADER_STAGE_ANY_HIT_BIT_NV](#VkShaderStageFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-sType-sType) VUID-VkRayTracingShaderGroupCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_SHADER_GROUP_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-pNext-pNext) VUID-VkRayTracingShaderGroupCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-parameter) VUID-VkRayTracingShaderGroupCreateInfoNV-type-parameter

 `type` **must** be a valid [VkRayTracingShaderGroupTypeKHR](#VkRayTracingShaderGroupTypeKHR) value

To query the opaque handles of shaders in the ray tracing pipeline, call:

// Provided by VK_KHR_ray_tracing_pipeline
VkResult vkGetRayTracingShaderGroupHandlesKHR(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    firstGroup,
    uint32_t                                    groupCount,
    size_t                                      dataSize,
    void*                                       pData);

// Provided by VK_NV_ray_tracing
// Equivalent to vkGetRayTracingShaderGroupHandlesKHR
VkResult vkGetRayTracingShaderGroupHandlesNV(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    firstGroup,
    uint32_t                                    groupCount,
    size_t                                      dataSize,
    void*                                       pData);

* 
`device` is the logical device containing the ray tracing pipeline.

* 
`pipeline` is the ray tracing pipeline object containing the
shaders.

* 
`firstGroup` is the index of the first group to retrieve a handle
    for from the
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pGroups`
or
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pGroups`
    array.

* 
`groupCount` is the number of shader handles to retrieve.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

On success, an array of `groupCount` shader handles will be written to
`pData`, with each element being of size
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`shaderGroupHandleSize`.

If `pipeline` was created with [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)
and the [pipelineLibraryGroupHandles](features.html#features-pipelineLibraryGroupHandles)
feature is enabled applications **can** query group handles from that pipeline,
even if the pipeline is a library and is never bound to a command buffer.
These group handles remain bitwise identical for any `pipeline` which
references the pipeline library.
Group indices are assigned as-if the pipeline was created without
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits).

Valid Usage

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-04619) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-04619

`pipeline` **must** be a ray tracing pipeline

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-04050) VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-04050

`firstGroup` **must** be less than the number of shader groups in
`pipeline`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-02419) VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-02419

The sum of `firstGroup` and `groupCount` **must** be less than or
equal to the number of shader groups in `pipeline`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-02420) VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-02420

`dataSize` **must** be at least
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`shaderGroupHandleSize` ×
`groupCount`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-07828) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-07828

If the
[pipelineLibraryGroupHandles](features.html#features-pipelineLibraryGroupHandles)
feature is not enabled,
`pipeline` **must** not have been created with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-device-parameter) VUID-vkGetRayTracingShaderGroupHandlesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parameter) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pData-parameter) VUID-vkGetRayTracingShaderGroupHandlesKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-arraylength) VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parent) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

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

To query the opaque capture data of shader groups in a ray tracing pipeline,
call:

// Provided by VK_KHR_ray_tracing_pipeline
VkResult vkGetRayTracingCaptureReplayShaderGroupHandlesKHR(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    firstGroup,
    uint32_t                                    groupCount,
    size_t                                      dataSize,
    void*                                       pData);

* 
`device` is the logical device containing the ray tracing pipeline.

* 
`pipeline` is the ray tracing pipeline object containing the
shaders.

* 
`firstGroup` is the index of the first group to retrieve a handle
for from the [VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pGroups`
array.

* 
`groupCount` is the number of shader handles to retrieve.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

On success, an array of `groupCount` shader handles will be written to
`pData`, with each element being of size
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`shaderGroupHandleCaptureReplaySize`.

Once queried, this opaque data **can** be provided at pipeline creation time
(in a subsequent execution), using
[VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR)::`pShaderGroupCaptureReplayHandle`,
as described in [Ray Tracing Capture Replay](raytracing.html#ray-tracing-capture-replay).

If `pipeline` was created with [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)
and the [pipelineLibraryGroupHandles](features.html#features-pipelineLibraryGroupHandles)
feature is enabled applications **can** query capture replay group handles from
that pipeline.
The capture replay handle remains bitwise identical for any `pipeline`
which references the pipeline library.
Group indices are assigned as-if the pipeline was created without
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits).

Valid Usage

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-04620) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-04620

`pipeline` **must** be a ray tracing pipeline

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-firstGroup-04051) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-firstGroup-04051

`firstGroup` **must** be less than the number of shader groups in
`pipeline`

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-firstGroup-03483) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-firstGroup-03483

The sum of `firstGroup` and `groupCount` **must** be less than or
equal to the number of shader groups in `pipeline`

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-dataSize-03484) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-dataSize-03484

`dataSize` **must** be at least
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`shaderGroupHandleCaptureReplaySize`
× `groupCount`

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-rayTracingPipelineShaderGroupHandleCaptureReplay-03606) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-rayTracingPipelineShaderGroupHandleCaptureReplay-03606

`VkPhysicalDeviceRayTracingPipelineFeaturesKHR`::`rayTracingPipelineShaderGroupHandleCaptureReplay`
**must** be enabled to call this function

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-03607) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-03607

`pipeline` **must** have been created with a `flags` that included
[VK_PIPELINE_CREATE_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-07829) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-07829

If the
[pipelineLibraryGroupHandles](features.html#features-pipelineLibraryGroupHandles)
feature is not enabled,
`pipeline` **must** not have been created with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-device-parameter) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-parameter) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pData-parameter) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-dataSize-arraylength) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-parent) VUID-vkGetRayTracingCaptureReplayShaderGroupHandlesKHR-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

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

To query the pipeline stack size of shaders in a shader group in the ray
tracing pipeline, call:

// Provided by VK_KHR_ray_tracing_pipeline
VkDeviceSize vkGetRayTracingShaderGroupStackSizeKHR(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    group,
    VkShaderGroupShaderKHR                      groupShader);

* 
`device` is the logical device containing the ray tracing pipeline.

* 
`pipeline` is the ray tracing pipeline object containing the shaders
groups.

* 
`group` is the index of the shader group to query.

* 
`groupShader` is the type of shader from the group to query.

The return value is the ray tracing pipeline stack size in bytes for the
specified shader as called from the specified shader group.

Valid Usage

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-04622) VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-04622

`pipeline` **must** be a ray tracing pipeline

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-group-03608) VUID-vkGetRayTracingShaderGroupStackSizeKHR-group-03608

The value of `group` **must** be less than the number of shader groups
in `pipeline`

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-03609) VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-03609

The shader identified by `groupShader` in `group` **must** not be
[VK_SHADER_UNUSED_KHR](#VK_SHADER_UNUSED_KHR)

Valid Usage (Implicit)

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-device-parameter) VUID-vkGetRayTracingShaderGroupStackSizeKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parameter) VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-parameter) VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-parameter

 `groupShader` **must** be a valid [VkShaderGroupShaderKHR](#VkShaderGroupShaderKHR) value

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parent) VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

Possible values of `groupShader` in
[vkGetRayTracingShaderGroupStackSizeKHR](#vkGetRayTracingShaderGroupStackSizeKHR) are:

// Provided by VK_KHR_ray_tracing_pipeline
typedef enum VkShaderGroupShaderKHR {
    VK_SHADER_GROUP_SHADER_GENERAL_KHR = 0,
    VK_SHADER_GROUP_SHADER_CLOSEST_HIT_KHR = 1,
    VK_SHADER_GROUP_SHADER_ANY_HIT_KHR = 2,
    VK_SHADER_GROUP_SHADER_INTERSECTION_KHR = 3,
} VkShaderGroupShaderKHR;

* 
[VK_SHADER_GROUP_SHADER_GENERAL_KHR](#VkShaderGroupShaderKHR) uses the shader specified in
the group with
[VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR)::`generalShader`

* 
[VK_SHADER_GROUP_SHADER_CLOSEST_HIT_KHR](#VkShaderGroupShaderKHR) uses the shader specified
in the group with
[VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR)::`closestHitShader`

* 
[VK_SHADER_GROUP_SHADER_ANY_HIT_KHR](#VkShaderGroupShaderKHR) uses the shader specified in
the group with
[VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR)::`anyHitShader`

* 
[VK_SHADER_GROUP_SHADER_INTERSECTION_KHR](#VkShaderGroupShaderKHR) uses the shader specified
in the group with
[VkRayTracingShaderGroupCreateInfoKHR](#VkRayTracingShaderGroupCreateInfoKHR)::`intersectionShader`

To [dynamically set](#pipelines-dynamic-state) the stack size for a ray
tracing pipeline, call:

// Provided by VK_KHR_ray_tracing_pipeline
void vkCmdSetRayTracingPipelineStackSizeKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    pipelineStackSize);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pipelineStackSize` is the stack size to use for subsequent ray
tracing trace commands.

This command sets the stack size for subsequent ray tracing commands when
the ray tracing pipeline is created with
[VK_DYNAMIC_STATE_RAY_TRACING_PIPELINE_STACK_SIZE_KHR](#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, the stack size is computed as described in
[Ray Tracing Pipeline Stack](raytracing.html#ray-tracing-pipeline-stack).

Valid Usage

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-pipelineStackSize-03610) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-pipelineStackSize-03610

`pipelineStackSize` **must** be large enough for any dynamic execution
through the shaders in the ray tracing pipeline used by a subsequent
trace call

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-parameter) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-recording) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-cmdpool) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-renderpass) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdSetRayTracingPipelineStackSizeKHR-videocoding) VUID-vkCmdSetRayTracingPipelineStackSizeKHR-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | State |

Conditional Rendering

vkCmdSetRayTracingPipelineStackSizeKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Ray tracing pipelines **can** contain more shaders than a graphics or compute
pipeline, so to allow parallel compilation of shaders within a pipeline, an
application **can** choose to defer compilation until a later point in time.

To compile a deferred shader in a pipeline call:

// Provided by VK_NV_ray_tracing
VkResult vkCompileDeferredNV(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    shader);

* 
`device` is the logical device containing the ray tracing pipeline.

* 
`pipeline` is the ray tracing pipeline object containing the
shaders.

* 
`shader` is the index of the shader to compile.

Valid Usage

* 
[](#VUID-vkCompileDeferredNV-pipeline-04621) VUID-vkCompileDeferredNV-pipeline-04621

`pipeline` **must** be a ray tracing pipeline

* 
[](#VUID-vkCompileDeferredNV-pipeline-02237) VUID-vkCompileDeferredNV-pipeline-02237

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCompileDeferredNV-shader-02238) VUID-vkCompileDeferredNV-shader-02238

`shader` **must** not have been called as a deferred compile before

Valid Usage (Implicit)

* 
[](#VUID-vkCompileDeferredNV-device-parameter) VUID-vkCompileDeferredNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCompileDeferredNV-pipeline-parameter) VUID-vkCompileDeferredNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkCompileDeferredNV-pipeline-parent) VUID-vkCompileDeferredNV-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

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

To destroy a pipeline, call:

// Provided by VK_VERSION_1_0
void vkDestroyPipeline(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the pipeline.

* 
`pipeline` is the handle of the pipeline to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipeline-pipeline-00765) VUID-vkDestroyPipeline-pipeline-00765

All submitted commands that refer to `pipeline` **must** have completed
execution

* 
[](#VUID-vkDestroyPipeline-pipeline-00766) VUID-vkDestroyPipeline-pipeline-00766

If `VkAllocationCallbacks` were provided when `pipeline` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipeline-pipeline-00767) VUID-vkDestroyPipeline-pipeline-00767

If no `VkAllocationCallbacks` were provided when `pipeline` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipeline-device-parameter) VUID-vkDestroyPipeline-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyPipeline-pipeline-parameter) VUID-vkDestroyPipeline-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkDestroyPipeline-pAllocator-parameter) VUID-vkDestroyPipeline-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyPipeline-pipeline-parent) VUID-vkDestroyPipeline-pipeline-parent

 If `pipeline` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipeline` **must** be externally synchronized

A pipeline derivative is a child pipeline created from a parent pipeline,
where the child and parent are expected to have much commonality.

The goal of derivative pipelines is that they be cheaper to create using the
parent as a starting point, and that it be more efficient (on either host or
device) to switch/bind between children of the same parent.

A derivative pipeline is created by setting the
[VK_PIPELINE_CREATE_DERIVATIVE_BIT](#VkPipelineCreateFlagBits) flag in the
`Vk*PipelineCreateInfo` structure.
If this is set, then exactly one of `basePipelineHandle` or
`basePipelineIndex` members of the structure **must** have a valid
handle/index, and specifies the parent pipeline.
If `basePipelineHandle` is used, the parent pipeline **must** have already
been created.
If `basePipelineIndex` is used, then the parent is being created in the
same command.
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) acts as the invalid handle for
`basePipelineHandle`, and -1 is the invalid index for
`basePipelineIndex`.
If `basePipelineIndex` is used, the base pipeline **must** appear earlier
in the array.
The base pipeline **must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](#VkPipelineCreateFlagBits) flag set.

Pipeline cache objects allow the result of pipeline construction to be
reused between pipelines and between runs of an application.
Reuse between pipelines is achieved by passing the same pipeline cache
object when creating multiple related pipelines.
Reuse across runs of an application is achieved by retrieving pipeline cache
contents in one run of an application, saving the contents, and using them
to preinitialize a pipeline cache on a subsequent run.
The contents of the pipeline cache objects are managed by the
implementation.
Applications **can** manage the host memory consumed by a pipeline cache object
and control the amount of data retrieved from a pipeline cache object.

Pipeline cache objects are represented by `VkPipelineCache` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipelineCache)

To create pipeline cache objects, call:

// Provided by VK_VERSION_1_0
VkResult vkCreatePipelineCache(
    VkDevice                                    device,
    const VkPipelineCacheCreateInfo*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPipelineCache*                            pPipelineCache);

* 
`device` is the logical device that creates the pipeline cache
object.

* 
`pCreateInfo` is a pointer to a [VkPipelineCacheCreateInfo](#VkPipelineCacheCreateInfo)
structure containing initial parameters for the pipeline cache object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPipelineCache` is a pointer to a [VkPipelineCache](#VkPipelineCache) handle in
which the resulting pipeline cache object is returned.

|  | Applications **can** track and manage the total host memory size of a pipeline
| --- | --- |
cache object using the `pAllocator`.
Applications **can** limit the amount of data retrieved from a pipeline cache
object in `vkGetPipelineCacheData`.
Implementations **should** not internally limit the total number of entries
added to a pipeline cache object or the total host memory consumed. |

Once created, a pipeline cache **can** be passed to the
[vkCreateGraphicsPipelines](#vkCreateGraphicsPipelines)
[vkCreateRayTracingPipelinesKHR](#vkCreateRayTracingPipelinesKHR),
[vkCreateRayTracingPipelinesNV](#vkCreateRayTracingPipelinesNV),
[vkCreateDataGraphPipelinesARM](VK_ARM_data_graph/graphs.html#vkCreateDataGraphPipelinesARM),
and [vkCreateComputePipelines](#vkCreateComputePipelines) commands.
If the pipeline cache passed into these commands is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the implementation will query it for possible reuse
opportunities and update it with new content.
The use of the pipeline cache object in these commands is internally
synchronized, and the same pipeline cache object **can** be used in multiple
threads simultaneously.

If `flags` of `pCreateInfo` includes
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits), all commands
that modify the returned pipeline cache object **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior).

|  | Implementations **should** make every effort to limit any critical sections to
| --- | --- |
the actual accesses to the cache, which is expected to be significantly
shorter than the duration of the `vkCreate*Pipelines` commands. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePipelineCache-device-parameter) VUID-vkCreatePipelineCache-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreatePipelineCache-pCreateInfo-parameter) VUID-vkCreatePipelineCache-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPipelineCacheCreateInfo](#VkPipelineCacheCreateInfo) structure

* 
[](#VUID-vkCreatePipelineCache-pAllocator-parameter) VUID-vkCreatePipelineCache-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreatePipelineCache-pPipelineCache-parameter) VUID-vkCreatePipelineCache-pPipelineCache-parameter

 `pPipelineCache` **must** be a valid pointer to a [VkPipelineCache](#VkPipelineCache) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

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

The `VkPipelineCacheCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineCacheCreateInfo {
    VkStructureType               sType;
    const void*                   pNext;
    VkPipelineCacheCreateFlags    flags;
    size_t                        initialDataSize;
    const void*                   pInitialData;
} VkPipelineCacheCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCacheCreateFlagBits](#VkPipelineCacheCreateFlagBits)
specifying the behavior of the pipeline cache.

* 
`initialDataSize` is the number of bytes in `pInitialData`.
If `initialDataSize` is zero, the pipeline cache will initially be
empty.

* 
`pInitialData` is a pointer to previously retrieved pipeline cache
data.
If the pipeline cache data is incompatible (as defined below) with the
device, the pipeline cache will be initially empty.
If `initialDataSize` is zero, `pInitialData` is ignored.

Valid Usage

* 
[](#VUID-VkPipelineCacheCreateInfo-initialDataSize-00768) VUID-VkPipelineCacheCreateInfo-initialDataSize-00768

If `initialDataSize` is not `0`, it **must** be equal to the size of
`pInitialData`, as returned by `vkGetPipelineCacheData` when
`pInitialData` was originally retrieved

* 
[](#VUID-VkPipelineCacheCreateInfo-initialDataSize-00769) VUID-VkPipelineCacheCreateInfo-initialDataSize-00769

If `initialDataSize` is not `0`, `pInitialData` **must** have been
retrieved from a previous call to `vkGetPipelineCacheData`

* 
[](#VUID-VkPipelineCacheCreateInfo-pipelineCreationCacheControl-02892) VUID-VkPipelineCacheCreateInfo-pipelineCreationCacheControl-02892

If the [    `pipelineCreationCacheControl`](features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits)

* 
[](#VUID-VkPipelineCacheCreateInfo-maintenance8-10200) VUID-VkPipelineCacheCreateInfo-maintenance8-10200

If the [`maintenance8`](features.html#features-maintenance8) feature is not
enabled, `flags` **must** not include
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](#VkPipelineCacheCreateFlagBits)

* 
[](#VUID-VkPipelineCacheCreateInfo-flags-10201) VUID-VkPipelineCacheCreateInfo-flags-10201

If `flags` includes
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits), it **must** not
include
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](#VkPipelineCacheCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCacheCreateInfo-sType-sType) VUID-VkPipelineCacheCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CACHE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineCacheCreateInfo-pNext-pNext) VUID-VkPipelineCacheCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineCacheCreateInfo-flags-parameter) VUID-VkPipelineCacheCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineCacheCreateFlagBits](#VkPipelineCacheCreateFlagBits) values

* 
[](#VUID-VkPipelineCacheCreateInfo-pInitialData-parameter) VUID-VkPipelineCacheCreateInfo-pInitialData-parameter

 If `initialDataSize` is not `0`, `pInitialData` **must** be a valid pointer to an array of `initialDataSize` bytes

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineCacheCreateFlags;

`VkPipelineCacheCreateFlags` is a bitmask type for setting a mask of
zero or more [VkPipelineCacheCreateFlagBits](#VkPipelineCacheCreateFlagBits).

Bits which **can** be set in [VkPipelineCacheCreateInfo](#VkPipelineCacheCreateInfo)::`flags`,
specifying behavior of the pipeline cache, are:

// Provided by VK_VERSION_1_0, VK_KHR_maintenance8, VK_EXT_pipeline_creation_cache_control
typedef enum VkPipelineCacheCreateFlagBits {
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT = 0x00000001,
  // Provided by VK_KHR_maintenance8
    VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR = 0x00000008,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT_EXT = VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT,
} VkPipelineCacheCreateFlagBits;

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits) specifies
that all commands that modify the created [VkPipelineCache](#VkPipelineCache) will be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior).
When set, the implementation **may** skip any unnecessary processing needed
to support simultaneous modification from multiple threads where
allowed.

* 
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](#VkPipelineCacheCreateFlagBits)
specifies that when the created [VkPipelineCache](#VkPipelineCache) is used as the
`dstCache` parameter of [vkMergePipelineCaches](#vkMergePipelineCaches), it does not
need to be [externally synchronized](fundamentals.html#fundamentals-threadingbehavior).
This flag is mutually exclusive with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#VkPipelineCacheCreateFlagBits).

Pipeline cache objects **can** be merged using the command:

// Provided by VK_VERSION_1_0
VkResult vkMergePipelineCaches(
    VkDevice                                    device,
    VkPipelineCache                             dstCache,
    uint32_t                                    srcCacheCount,
    const VkPipelineCache*                      pSrcCaches);

* 
`device` is the logical device that owns the pipeline cache objects.

* 
`dstCache` is the handle of the pipeline cache to merge results
into.

* 
`srcCacheCount` is the length of the `pSrcCaches` array.

* 
`pSrcCaches` is a pointer to an array of pipeline cache handles,
which will be merged into `dstCache`.
The previous contents of `dstCache` are included after the merge.

|  | The details of the merge operation are implementation-dependent, but
| --- | --- |
implementations **should** merge the contents of the specified pipelines and
prune duplicate entries. |

Valid Usage

* 
[](#VUID-vkMergePipelineCaches-dstCache-00770) VUID-vkMergePipelineCaches-dstCache-00770

`dstCache` **must** not appear in the list of source caches

* 
[](#VUID-vkMergePipelineCaches-dstCache-10202) VUID-vkMergePipelineCaches-dstCache-10202

Host access to `dstCache` **must** be externally synchronized
if it was not created with
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](#VkPipelineCacheCreateFlagBits)

* 
[](#VUID-vkMergePipelineCaches-dstCache-11832) VUID-vkMergePipelineCaches-dstCache-11832

`dstCache` **must** not have been created with the `headerVersion`
member of [VkPipelineCacheCreateInfo](#VkPipelineCacheCreateInfo)::`pInitialData` equal to
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](#VkPipelineCacheHeaderVersion)

* 
[](#VUID-vkMergePipelineCaches-headerVersion-11833) VUID-vkMergePipelineCaches-headerVersion-11833

Each member of pSrcCaches **must** not have been created with the
`headerVersion` member of
[VkPipelineCacheCreateInfo](#VkPipelineCacheCreateInfo)::`pInitialData` equal to
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](#VkPipelineCacheHeaderVersion)

Valid Usage (Implicit)

* 
[](#VUID-vkMergePipelineCaches-device-parameter) VUID-vkMergePipelineCaches-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkMergePipelineCaches-dstCache-parameter) VUID-vkMergePipelineCaches-dstCache-parameter

 `dstCache` **must** be a valid [VkPipelineCache](#VkPipelineCache) handle

* 
[](#VUID-vkMergePipelineCaches-pSrcCaches-parameter) VUID-vkMergePipelineCaches-pSrcCaches-parameter

 `pSrcCaches` **must** be a valid pointer to an array of `srcCacheCount` valid [VkPipelineCache](#VkPipelineCache) handles

* 
[](#VUID-vkMergePipelineCaches-srcCacheCount-arraylength) VUID-vkMergePipelineCaches-srcCacheCount-arraylength

 `srcCacheCount` **must** be greater than `0`

* 
[](#VUID-vkMergePipelineCaches-dstCache-parent) VUID-vkMergePipelineCaches-dstCache-parent

 `dstCache` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkMergePipelineCaches-pSrcCaches-parent) VUID-vkMergePipelineCaches-pSrcCaches-parent

 Each element of `pSrcCaches` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

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

Data **can** be retrieved from a pipeline cache object using the command:

// Provided by VK_VERSION_1_0
VkResult vkGetPipelineCacheData(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    size_t*                                     pDataSize,
    void*                                       pData);

* 
`device` is the logical device that owns the pipeline cache.

* 
`pipelineCache` is the pipeline cache to retrieve data from.

* 
`pDataSize` is a pointer to a `size_t` value related to the
amount of data in the pipeline cache, as described below.

* 
`pData` is either `NULL` or a pointer to a buffer.

If `pData` is `NULL`, then the maximum size of the data that **can** be
retrieved from the pipeline cache, in bytes, is returned in `pDataSize`.
Otherwise, `pDataSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pData`, and on
return the variable is overwritten with the amount of data actually written
to `pData`.
If `pDataSize` is less than the maximum size that **can** be retrieved by
the pipeline cache, at most `pDataSize` bytes will be written to
`pData`, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all of the pipeline cache was
returned.

Any data written to `pData` is valid and **can** be provided as the
`pInitialData` member of the [VkPipelineCacheCreateInfo](#VkPipelineCacheCreateInfo) structure
passed to `vkCreatePipelineCache`.

Two calls to `vkGetPipelineCacheData` with the same parameters **must**
retrieve the same data unless a command that modifies the contents of the
cache is called between them.

The initial bytes written to `pData` **must** be a header as described in
the [Pipeline Cache Header](#pipelines-cache-header) section.

If `pDataSize` is less than what is necessary to store this header,
nothing will be written to `pData` and zero will be written to
`pDataSize`.

|  | This query does not behave consistently with the behavior described in
| --- | --- |
[Opaque Binary Data Results](fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pDataSize`,
the query returns up to the size of the passed buffer, and signals overflow
with a [VK_INCOMPLETE](fundamentals.html#VkResult) success status instead of returning a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](fundamentals.html#VkResult) error status. |

Valid Usage

* 
[](#VUID-vkGetPipelineCacheData-pipelineCache-11834) VUID-vkGetPipelineCacheData-pipelineCache-11834

`pipelineCache` **must** not have been created with the
`headerVersion` member of
[VkPipelineCacheCreateInfo](#VkPipelineCacheCreateInfo)::`pInitialData` equal to
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](#VkPipelineCacheHeaderVersion)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineCacheData-device-parameter) VUID-vkGetPipelineCacheData-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineCacheData-pipelineCache-parameter) VUID-vkGetPipelineCacheData-pipelineCache-parameter

 `pipelineCache` **must** be a valid [VkPipelineCache](#VkPipelineCache) handle

* 
[](#VUID-vkGetPipelineCacheData-pDataSize-parameter) VUID-vkGetPipelineCacheData-pDataSize-parameter

 `pDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetPipelineCacheData-pData-parameter) VUID-vkGetPipelineCacheData-pData-parameter

 If the value referenced by `pDataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pDataSize` bytes

* 
[](#VUID-vkGetPipelineCacheData-pipelineCache-parent) VUID-vkGetPipelineCacheData-pipelineCache-parent

 `pipelineCache` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

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

Applications **can** store the data retrieved from the pipeline cache, and use
these data, possibly in a future run of the application, to populate new
pipeline cache objects.
The results of pipeline compiles, however, **may** depend on the vendor ID,
device ID, driver version, and other details of the device.
To enable applications to detect when previously retrieved data is
incompatible with the device, the pipeline cache data **must** begin with a
valid pipeline cache header.

|  | Structures described in this section are not part of the Vulkan API and are
| --- | --- |
only used to describe the representation of data elements in pipeline cache
data.
Accordingly, the valid usage clauses defined for structures defined in this
section do not define valid usage conditions for APIs accepting pipeline
cache data as input, as providing invalid pipeline cache data as input to
any Vulkan API commands will result
in the provided pipeline cache data being ignored. |

Version one of the pipeline cache header is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineCacheHeaderVersionOne {
    uint32_t                        headerSize;
    VkPipelineCacheHeaderVersion    headerVersion;
    uint32_t                        vendorID;
    uint32_t                        deviceID;
    uint8_t                         pipelineCacheUUID[VK_UUID_SIZE];
} VkPipelineCacheHeaderVersionOne;

* 
`headerSize` is the length in bytes of the pipeline cache header.

* 
`headerVersion` is a [VkPipelineCacheHeaderVersion](#VkPipelineCacheHeaderVersion) value
specifying the version of the header.
A consumer of the pipeline cache **should** use the cache version to
interpret the remainder of the cache header.
`headerVersion` **must** be written as exactly 4 bytes.

* 
`vendorID` is the `VkPhysicalDeviceProperties`::`vendorID`
of the implementation.

* 
`deviceID` is the `VkPhysicalDeviceProperties`::`deviceID`
of the implementation.

* 
`pipelineCacheUUID` is the
`VkPhysicalDeviceProperties`::`pipelineCacheUUID` of the
implementation.

Unlike most structures declared by the Vulkan API, all fields of this
structure are written with the least significant byte first, regardless of
host byte-order.

The C language specification does not define the packing of structure
members.
This layout assumes tight structure member packing, with members laid out in
the order listed in the structure, and the intended size of the structure is
32 bytes.
If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values at the correct offsets.

Valid Usage

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerSize-04967) VUID-VkPipelineCacheHeaderVersionOne-headerSize-04967

`headerSize` **must** be 32

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerVersion-04968) VUID-VkPipelineCacheHeaderVersionOne-headerVersion-04968

`headerVersion` **must** be [VK_PIPELINE_CACHE_HEADER_VERSION_ONE](#VkPipelineCacheHeaderVersion)

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerSize-08990) VUID-VkPipelineCacheHeaderVersionOne-headerSize-08990

`headerSize` **must** not exceed the size of the pipeline cache

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerVersion-parameter) VUID-VkPipelineCacheHeaderVersionOne-headerVersion-parameter

 `headerVersion` **must** be a valid [VkPipelineCacheHeaderVersion](#VkPipelineCacheHeaderVersion) value

Possible values of the `headerVersion` value of the pipeline cache
header are:

// Provided by VK_VERSION_1_0
typedef enum VkPipelineCacheHeaderVersion {
    VK_PIPELINE_CACHE_HEADER_VERSION_ONE = 1,
  // Provided by VK_QCOM_data_graph_model
    VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM = 1000629000,
} VkPipelineCacheHeaderVersion;

* 
[VK_PIPELINE_CACHE_HEADER_VERSION_ONE](#VkPipelineCacheHeaderVersion) specifies version one of the
pipeline cache, described by [VkPipelineCacheHeaderVersionOne](#VkPipelineCacheHeaderVersionOne).

* 
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](#VkPipelineCacheHeaderVersion) specifies a
pipeline cache for offline built data graph models, described by
[VkPipelineCacheHeaderVersionDataGraphQCOM](#VkPipelineCacheHeaderVersionDataGraphQCOM).

The data graph pipeline cache header is defined as:

// Provided by VK_QCOM_data_graph_model
typedef struct VkPipelineCacheHeaderVersionDataGraphQCOM {
    uint32_t                         headerSize;
    VkPipelineCacheHeaderVersion     headerVersion;
    VkDataGraphModelCacheTypeQCOM    cacheType;
    uint32_t                         cacheVersion;
    uint32_t                         toolchainVersion[VK_DATA_GRAPH_MODEL_TOOLCHAIN_VERSION_LENGTH_QCOM];
} VkPipelineCacheHeaderVersionDataGraphQCOM;

* 
`headerSize` is the length in bytes of the pipeline cache header.

* 
`headerVersion` is a [VkPipelineCacheHeaderVersion](#VkPipelineCacheHeaderVersion) value
specifying the version of the header.
A consumer of the pipeline cache **should** use the cache version to
interpret the remainder of the cache header.
`headerVersion` **must** be written as exactly 4 bytes.

* 
`cacheType` is the [VkDataGraphModelCacheTypeQCOM](#VkDataGraphModelCacheTypeQCOM) type of data
graph cache encoded in the data.

* 
`cacheVersion` is the version of the encoding of the data graph
cache.

* 
`toolchainVersion` is a null-terminated UTF-8 string specifying the
version of the compiler that built the data graph cache.

The application **should** verify that the header info is compatible with the
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) passed during pipeline
creation.
Implementations **may** return [VK_PIPELINE_COMPILE_REQUIRED_EXT](fundamentals.html#VkResult) from
[vkCreateDataGraphPipelinesARM](VK_ARM_data_graph/graphs.html#vkCreateDataGraphPipelinesARM) if the cache is not compatible.

|  | This cache type is built using offline compilation, therefore Vulkan does
| --- | --- |
not define engine compatibility.
The application should refer to the offline compiler used to create the
cache for guidance on compatibility. |

Unlike most structures declared by the Vulkan API, all fields of this
structure are written with the least significant byte first, regardless of
host byte-order.

The C language specification does not define the packing of structure
members.
This layout assumes tight structure member packing, with members laid out in
the order listed in the structure, and the intended size of the structure is
28 bytes.
If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values at the correct offsets.

Valid Usage

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-None-11835) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-None-11835

The [dataGraphModel](features.html#features-dataGraphModelQCOM) feature **must** be
enabled

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11836) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11836

`headerSize` **must** be 28

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-11837) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-11837

`headerVersion` **must** be
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](#VkPipelineCacheHeaderVersion)

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11838) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11838

`headerSize` **must** not exceed the size of the pipeline cache

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-parameter) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-parameter

 `headerVersion` **must** be a valid [VkPipelineCacheHeaderVersion](#VkPipelineCacheHeaderVersion) value

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-cacheType-parameter) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-cacheType-parameter

 `cacheType` **must** be a valid [VkDataGraphModelCacheTypeQCOM](#VkDataGraphModelCacheTypeQCOM) value

The [VkDataGraphModelCacheTypeQCOM](#VkDataGraphModelCacheTypeQCOM) enumeration determines the contents
of the pipeline data graph cache.

Possible values are:

// Provided by VK_QCOM_data_graph_model
typedef enum VkDataGraphModelCacheTypeQCOM {
    VK_DATA_GRAPH_MODEL_CACHE_TYPE_GENERIC_BINARY_QCOM = 0,
} VkDataGraphModelCacheTypeQCOM;

* 
[VK_DATA_GRAPH_MODEL_CACHE_TYPE_GENERIC_BINARY_QCOM](#VkDataGraphModelCacheTypeQCOM) specifies a
general binary layout type.

[VK_DATA_GRAPH_MODEL_TOOLCHAIN_VERSION_LENGTH_QCOM](#VK_DATA_GRAPH_MODEL_TOOLCHAIN_VERSION_LENGTH_QCOM) is the length in
`char` values of an array containing the version of the compiler that
built a data graph cache, as returned in
[VkPipelineCacheHeaderVersionDataGraphQCOM](#VkPipelineCacheHeaderVersionDataGraphQCOM)::`toolchainVersion`.

#define VK_DATA_GRAPH_MODEL_TOOLCHAIN_VERSION_LENGTH_QCOM 3U

To destroy a pipeline cache, call:

// Provided by VK_VERSION_1_0
void vkDestroyPipelineCache(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the pipeline cache
object.

* 
`pipelineCache` is the handle of the pipeline cache to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-00771) VUID-vkDestroyPipelineCache-pipelineCache-00771

If `VkAllocationCallbacks` were provided when `pipelineCache`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-00772) VUID-vkDestroyPipelineCache-pipelineCache-00772

If no `VkAllocationCallbacks` were provided when `pipelineCache`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipelineCache-device-parameter) VUID-vkDestroyPipelineCache-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-parameter) VUID-vkDestroyPipelineCache-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineCache` **must** be a valid [VkPipelineCache](#VkPipelineCache) handle

* 
[](#VUID-vkDestroyPipelineCache-pAllocator-parameter) VUID-vkDestroyPipelineCache-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyPipelineCache-pipelineCache-parent) VUID-vkDestroyPipelineCache-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipelineCache` **must** be externally synchronized

Pipeline binary objects allow the result of pipeline construction to be
reused between pipelines and between runs of an application.
Reuse is achieved by extracting pipeline binaries from a [VkPipeline](#VkPipeline)
object, associating them with a corresponding [VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR)
and then adding a [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR) to the `pNext` chain of
any `Vk*PipelineCreateInfo` when creating a pipeline.
Pipeline binaries can be reused between runs by extracting
`VkPipelineBinaryDataKHR` from `VkPipelineBinaryKHR` objects, saving
the contents, and then using them to create a `VkPipelineBinaryKHR`
object on subsequent runs.

When creating a pipeline that includes [VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR) in the
`pNext` chain, or has the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) flag set, the use of
[VkPipelineCache](#VkPipelineCache) objects is not allowed.

Pipeline binary objects are represented by `VkPipelineBinaryKHR`
handles:

// Provided by VK_KHR_pipeline_binary
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipelineBinaryKHR)

To generate the key for a particular pipeline creation info, call:

// Provided by VK_KHR_pipeline_binary
VkResult vkGetPipelineKeyKHR(
    VkDevice                                    device,
    const VkPipelineCreateInfoKHR*              pPipelineCreateInfo,
    VkPipelineBinaryKeyKHR*                     pPipelineKey);

* 
`device` is the logical device that creates the pipeline object.

* 
`pPipelineCreateInfo` is `NULL` or a pointer to a
[VkPipelineCreateInfoKHR](#VkPipelineCreateInfoKHR) structure.

* 
`pPipelineKey` is a pointer to a [VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR)
structure in which the resulting key is returned.

If `pPipelineCreateInfo` is `NULL`, then the implementation **must** return
the global key that applies to all pipelines.
If the key obtained in this way changes between saving and restoring data
obtained from [vkGetPipelineBinaryDataKHR](#vkGetPipelineBinaryDataKHR) in a different
[VkDevice](devsandqueues.html#VkDevice), then the application **must** assume that the restored data is
invalid and cannot be passed to [vkCreatePipelineBinariesKHR](#vkCreatePipelineBinariesKHR).
Otherwise the application **can** assume the data is still valid.

If `pPipelineCreateInfo` is not `NULL`, the key obtained functions as a
method to compare two pipeline creation info structures.
Implementations **may** not compare parts of a pipeline creation info which
would not contribute to the final binary output.
If a shader module identifier is used instead of a shader module, the
`pPipelineKey` generated **must** be equal to the key generated when using
the shader module from which the identifier was queried.
If the content of two `pPipelineKey` are equal, pipelines created with
the two `pPipelineCreateInfo->pNext` create infos **must** produce the same
[VkPipelineBinaryKHR](#VkPipelineBinaryKHR) contents.

The pipeline key is distinct from pipeline binary key.
Pipeline binary keys **can** only be obtained after compilation.
The pipeline key is intended to optionally allow associating pipeline create
info with multiple pipeline binary keys.

Valid Usage

* 
[](#VUID-vkGetPipelineKeyKHR-pNext-09605) VUID-vkGetPipelineKeyKHR-pNext-09605

The `pNext` chain of `pPipelineCreateInfo` **must** not set
[VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` to a value greater than
`0`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineKeyKHR-device-parameter) VUID-vkGetPipelineKeyKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineKeyKHR-pPipelineCreateInfo-parameter) VUID-vkGetPipelineKeyKHR-pPipelineCreateInfo-parameter

 If `pPipelineCreateInfo` is not `NULL`, `pPipelineCreateInfo` **must** be a valid pointer to a valid [VkPipelineCreateInfoKHR](#VkPipelineCreateInfoKHR) structure

* 
[](#VUID-vkGetPipelineKeyKHR-pPipelineKey-parameter) VUID-vkGetPipelineKeyKHR-pPipelineKey-parameter

 `pPipelineKey` **must** be a valid pointer to a [VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

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

The `VkPipelineCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineCreateInfoKHR {
    VkStructureType    sType;
    void*              pNext;
} VkPipelineCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is a pointer to a structure extending this structure.

Valid Usage

* 
[](#VUID-VkPipelineCreateInfoKHR-pNext-09604) VUID-VkPipelineCreateInfoKHR-pNext-09604

    `pNext` **must** be pointer to a valid instance of
    [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo),
[VkExecutionGraphPipelineCreateInfoAMDX](executiongraphs.html#VkExecutionGraphPipelineCreateInfoAMDX),
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR),
    or [VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCreateInfoKHR-sType-sType) VUID-VkPipelineCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

The `VkPipelineBinaryKeyKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryKeyKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           keySize;
    uint8_t            key[VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR];
} VkPipelineBinaryKeyKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`keySize` is the size, in bytes, of valid data returned in
`key`.

* 
`key` is a buffer of opaque data specifying a pipeline binary key.

Any returned values beyond the first `keySize` bytes are **undefined**.
Implementations **must** return a `keySize` greater than 0, and
less-or-equal to [VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR](#VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR).

Two keys are considered equal if `keySize` is equal and the first
`keySize` bytes of `key` compare equal.

Implementations **may** return a different `keySize` for different
binaries.

Implementations **should** ensure that `keySize` is large enough to
uniquely identify a pipeline binary.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryKeyKHR-sType-sType) VUID-VkPipelineBinaryKeyKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_KEY_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineBinaryKeyKHR-pNext-pNext) VUID-VkPipelineBinaryKeyKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR](#VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR) is the length in bytes of a binary
key, as returned in [VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR)::`keySize`.

#define VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR 32U

To create pipeline binary objects, call:

// Provided by VK_KHR_pipeline_binary
VkResult vkCreatePipelineBinariesKHR(
    VkDevice                                    device,
    const VkPipelineBinaryCreateInfoKHR*        pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPipelineBinaryHandlesInfoKHR*             pBinaries);

* 
`device` is the logical device that creates the pipeline binary
objects.

* 
`pCreateInfo` is a pointer to a [VkPipelineBinaryCreateInfoKHR](#VkPipelineBinaryCreateInfoKHR)
structure that contains the data to create the pipeline binaries from.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pBinaries` is a pointer to a [VkPipelineBinaryHandlesInfoKHR](#VkPipelineBinaryHandlesInfoKHR)
structure in which the resulting pipeline binaries are returned.

The implementation will attempt to create all pipeline binaries.
If creation fails for any pipeline binary, then:

* 
The corresponding entry in the `pPipelineBinaries` output array will
be filled with [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

* 
The [VkResult](fundamentals.html#VkResult) returned by [vkCreatePipelineBinariesKHR](#vkCreatePipelineBinariesKHR) will
contain the error value for the first entry in the output array in
`pBinaries` containing [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePipelineBinariesKHR-device-parameter) VUID-vkCreatePipelineBinariesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreatePipelineBinariesKHR-pCreateInfo-parameter) VUID-vkCreatePipelineBinariesKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPipelineBinaryCreateInfoKHR](#VkPipelineBinaryCreateInfoKHR) structure

* 
[](#VUID-vkCreatePipelineBinariesKHR-pAllocator-parameter) VUID-vkCreatePipelineBinariesKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreatePipelineBinariesKHR-pBinaries-parameter) VUID-vkCreatePipelineBinariesKHR-pBinaries-parameter

 `pBinaries` **must** be a valid pointer to a [VkPipelineBinaryHandlesInfoKHR](#VkPipelineBinaryHandlesInfoKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_PIPELINE_BINARY_MISSING_KHR](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPipelineBinaryHandlesInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryHandlesInfoKHR {
    VkStructureType         sType;
    const void*             pNext;
    uint32_t                pipelineBinaryCount;
    VkPipelineBinaryKHR*    pPipelineBinaries;
} VkPipelineBinaryHandlesInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBinaryCount` is the number of binaries associated with this
pipeline or the number of entries in the `pPipelineBinaries` array.

* 
`pPipelineBinaries` is `NULL` or a pointer to an array of
[VkPipelineBinaryKHR](#VkPipelineBinaryKHR) handles in which the resulting pipeline
binaries are returned.

If `pPipelineBinaries` is `NULL`, the number of binaries that would be
created is returned in `pipelineBinaryCount`.
Otherwise, `pipelineBinaryCount` **must** be the number of entries in the
`pPipelineBinaries` array, and on return from
[vkCreatePipelineBinariesKHR](#vkCreatePipelineBinariesKHR) `pipelineBinaryCount` is overwritten
with the number of handles actually written to `pPipelineBinaries`.
If the value of `pipelineBinaryCount` is less than the number of
binaries that would have been created, at most `pipelineBinaryCount`
handles will be written to `pPipelineBinaries` and [VK_INCOMPLETE](fundamentals.html#VkResult)
will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to indicate that
`pPipelineBinaries` was not large enough to create all the binaries.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryHandlesInfoKHR-sType-sType) VUID-VkPipelineBinaryHandlesInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_HANDLES_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineBinaryHandlesInfoKHR-pNext-pNext) VUID-VkPipelineBinaryHandlesInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryHandlesInfoKHR-pPipelineBinaries-parameter) VUID-VkPipelineBinaryHandlesInfoKHR-pPipelineBinaries-parameter

 If `pipelineBinaryCount` is not `0`, and `pPipelineBinaries` is not `NULL`, `pPipelineBinaries` **must** be a valid pointer to an array of `pipelineBinaryCount` [VkPipelineBinaryKHR](#VkPipelineBinaryKHR) handles

The `VkPipelineBinaryCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryCreateInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    const VkPipelineBinaryKeysAndDataKHR*    pKeysAndDataInfo;
    VkPipeline                               pipeline;
    const VkPipelineCreateInfoKHR*           pPipelineCreateInfo;
} VkPipelineBinaryCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pKeysAndDataInfo` is `NULL` or a pointer to a
[VkPipelineBinaryKeysAndDataKHR](#VkPipelineBinaryKeysAndDataKHR) structure that contains keys and
data to create the pipeline binaries from.

* 
`pipeline` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a `VkPipeline` that
contains data to create the pipeline binaries from.

* 
`pPipelineCreateInfo` is `NULL` or a pointer to a
[VkPipelineCreateInfoKHR](#VkPipelineCreateInfoKHR) structure with the pipeline creation info.
This is used to probe the implementation’s internal cache for pipeline
binaries.

When `pPipelineCreateInfo` is not `NULL`, an implementation will attempt
to retrieve pipeline binary data from an internal cache external to the
application if
[`pipelineBinaryInternalCache`](limits.html#limits-pipelineBinaryInternalCache) is
[VK_TRUE](fundamentals.html#VK_TRUE).
Applications **can** use this to determine if a pipeline **can** be created
without compilation.
If the implementation fails to create a pipeline binary due to missing an
internal cache entry, [VK_PIPELINE_BINARY_MISSING_KHR](fundamentals.html#VkResult) is returned.
If creation succeeds, the resulting binary **can** be used to create a
pipeline.
[VK_PIPELINE_BINARY_MISSING_KHR](fundamentals.html#VkResult) **may** be returned for any reason in this
situation, even if creating a pipeline binary with the same parameters that
succeeded earlier.

If
[`pipelineBinaryPrecompiledInternalCache`](limits.html#limits-pipelineBinaryPrecompiledInternalCache)
is [VK_TRUE](fundamentals.html#VK_TRUE), the implementation **may** be able to create pipeline
binaries even when `pPipelineCreateInfo` has not been used to create
binaries before by the application.

|  | On some platforms, internal pipeline caches may be pre-populated before
| --- | --- |
running the application. |

Valid Usage

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09607) VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09607

If `pipeline` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipeline` **must** have
been created with [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09608) VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09608

If `pipeline` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
[vkReleaseCapturedPipelineDataKHR](#vkReleaseCapturedPipelineDataKHR) **must** not have been called on
`pipeline` prior to this command

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipelineBinaryInternalCache-09609) VUID-VkPipelineBinaryCreateInfoKHR-pipelineBinaryInternalCache-09609

If
[`pipelineBinaryInternalCache`](limits.html#limits-pipelineBinaryInternalCache)
is [VK_FALSE](fundamentals.html#VK_FALSE) pPipelineCreateInfo **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-device-09610) VUID-VkPipelineBinaryCreateInfoKHR-device-09610

If `device` was created with
[VkDevicePipelineBinaryInternalCacheControlKHR](devsandqueues.html#VkDevicePipelineBinaryInternalCacheControlKHR)::`disableInternalCache`
set to [VK_TRUE](fundamentals.html#VK_TRUE), `pPipelineCreateInfo` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-09619) VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-09619

One and only one of `pKeysAndDataInfo`, `pipeline`, or
`pPipelineCreateInfo` **must** be non-`NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-09606) VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-09606

If `pPipelineCreateInfo` is not `NULL`, the `pNext` chain of
`pPipelineCreateInfo` **must** not set
[VkPipelineBinaryInfoKHR](#VkPipelineBinaryInfoKHR)::`binaryCount` to a value greater than
`0`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-sType-sType) VUID-VkPipelineBinaryCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pNext-pNext) VUID-VkPipelineBinaryCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-parameter) VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-parameter

 If `pKeysAndDataInfo` is not `NULL`, `pKeysAndDataInfo` **must** be a valid pointer to a valid [VkPipelineBinaryKeysAndDataKHR](#VkPipelineBinaryKeysAndDataKHR) structure

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipeline-parameter) VUID-VkPipelineBinaryCreateInfoKHR-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-parameter) VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-parameter

 If `pPipelineCreateInfo` is not `NULL`, `pPipelineCreateInfo` **must** be a valid pointer to a valid [VkPipelineCreateInfoKHR](#VkPipelineCreateInfoKHR) structure

The `VkPipelineBinaryKeysAndDataKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryKeysAndDataKHR {
    uint32_t                          binaryCount;
    const VkPipelineBinaryKeyKHR*     pPipelineBinaryKeys;
    const VkPipelineBinaryDataKHR*    pPipelineBinaryData;
} VkPipelineBinaryKeysAndDataKHR;

* 
`binaryCount` is the size of the `pPipelineBinaryKeys` and
`pPipelineBinaryData` arrays

* 
`pPipelineBinaryKeys` is a pointer to an array of
[VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR) structures containing the pipeline binary
keys

* 
`pPipelineBinaryData` is a pointer to an array of
[VkPipelineBinaryDataKHR](#VkPipelineBinaryDataKHR) structures containing the pipeline binary
data

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryKeys-parameter) VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryKeys-parameter

 `pPipelineBinaryKeys` **must** be a valid pointer to an array of `binaryCount` valid [VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR) structures

* 
[](#VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryData-parameter) VUID-VkPipelineBinaryKeysAndDataKHR-pPipelineBinaryData-parameter

 `pPipelineBinaryData` **must** be a valid pointer to an array of `binaryCount` valid [VkPipelineBinaryDataKHR](#VkPipelineBinaryDataKHR) structures

* 
[](#VUID-VkPipelineBinaryKeysAndDataKHR-binaryCount-arraylength) VUID-VkPipelineBinaryKeysAndDataKHR-binaryCount-arraylength

 `binaryCount` **must** be greater than `0`

The `VkPipelineBinaryDataKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryDataKHR {
    size_t    dataSize;
    void*     pData;
} VkPipelineBinaryDataKHR;

* 
`dataSize` is the size of the `pData` buffer in bytes.

* 
`pData` is a pointer to a buffer of `size` bytes that contains
pipeline binary data obtained from `vkGetPipelineBinaryDataKHR`.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryDataKHR-pData-parameter) VUID-VkPipelineBinaryDataKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-VkPipelineBinaryDataKHR-dataSize-arraylength) VUID-VkPipelineBinaryDataKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

Data **can** be retrieved from a pipeline binary object using the command:

// Provided by VK_KHR_pipeline_binary
VkResult vkGetPipelineBinaryDataKHR(
    VkDevice                                    device,
    const VkPipelineBinaryDataInfoKHR*          pInfo,
    VkPipelineBinaryKeyKHR*                     pPipelineBinaryKey,
    size_t*                                     pPipelineBinaryDataSize,
    void*                                       pPipelineBinaryData);

* 
`device` is the logical device that created the pipeline binary.

* 
`pInfo` is a pointer to a [VkPipelineBinaryDataInfoKHR](#VkPipelineBinaryDataInfoKHR)
structure which describes the pipeline binary to get data from.

* 
`pPipelineBinaryKey` is a pointer to a [VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR)
structure where the key for this binary will be written.

* 
`pPipelineBinaryDataSize` is a pointer to a `size_t` value
related to the amount of data in the pipeline binary, as described
below.

* 
`pPipelineBinaryData` is either `NULL` or a pointer to a buffer.

If `pPipelineBinaryData` is `NULL`, then the size of the data, in bytes,
that is required to store the binary is returned in
`pPipelineBinaryDataSize`.
Otherwise, `pPipelineBinaryDataSize` **must** contain the size of the
buffer, in bytes, pointed to by `pPipelineBinaryData`, and on return
`pPipelineBinaryDataSize` is overwritten with the size of the data, in
bytes, that is required to store the binary.
If `pPipelineBinaryDataSize` is less than the size that is required to
store the binary, nothing is written to `pPipelineBinaryData` and
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](fundamentals.html#VkResult) will be returned, instead of
[VK_SUCCESS](fundamentals.html#VkResult).

If the call returns one of the success return codes, the pipeline binary key
is written to `pPipelineBinaryKey`, regardless of whether
`pPipelineBinaryData` is `NULL` or not.

If [pipelineBinaryCompressedData](limits.html#limits-pipelineBinaryCompressedData) is
[VK_FALSE](fundamentals.html#VK_FALSE), implementations **should** not return compressed pipeline
binary data to the application.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineBinaryDataKHR-device-parameter) VUID-vkGetPipelineBinaryDataKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pInfo-parameter) VUID-vkGetPipelineBinaryDataKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkPipelineBinaryDataInfoKHR](#VkPipelineBinaryDataInfoKHR) structure

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryKey-parameter) VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryKey-parameter

 `pPipelineBinaryKey` **must** be a valid pointer to a [VkPipelineBinaryKeyKHR](#VkPipelineBinaryKeyKHR) structure

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryDataSize-parameter) VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryDataSize-parameter

 `pPipelineBinaryDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryData-parameter) VUID-vkGetPipelineBinaryDataKHR-pPipelineBinaryData-parameter

 If the value referenced by `pPipelineBinaryDataSize` is not `0`, and `pPipelineBinaryData` is not `NULL`, `pPipelineBinaryData` **must** be a valid pointer to an array of `pPipelineBinaryDataSize` bytes

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPipelineBinaryDataInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryDataInfoKHR {
    VkStructureType        sType;
    void*                  pNext;
    VkPipelineBinaryKHR    pipelineBinary;
} VkPipelineBinaryDataInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBinary` is the pipeline binary to get data from.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryDataInfoKHR-sType-sType) VUID-VkPipelineBinaryDataInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_DATA_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineBinaryDataInfoKHR-pNext-pNext) VUID-VkPipelineBinaryDataInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryDataInfoKHR-pipelineBinary-parameter) VUID-VkPipelineBinaryDataInfoKHR-pipelineBinary-parameter

 `pipelineBinary` **must** be a valid [VkPipelineBinaryKHR](#VkPipelineBinaryKHR) handle

To release pipeline resources captured with
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR), call:

// Provided by VK_KHR_pipeline_binary
VkResult vkReleaseCapturedPipelineDataKHR(
    VkDevice                                    device,
    const VkReleaseCapturedPipelineDataInfoKHR* pInfo,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that created the pipeline object.

* 
`pInfo` is a pointer to a [VkReleaseCapturedPipelineDataInfoKHR](#VkReleaseCapturedPipelineDataInfoKHR)
structure which describes the pipeline to release the data from.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

The implementation **may** free any resources captured as a result of creating
the pipeline with [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) and put
the pipeline into a state as if
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) had not been provided at
pipeline creation time.

|  | Any resources captured as a result of creating the pipeline with
| --- | --- |
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR) are implicitly freed by
[vkDestroyPipeline](#vkDestroyPipeline). |

Valid Usage

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09611) VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09611

If `VkAllocationCallbacks` were provided when `pipeline` was
created, a compatible set of callbacks **must** be provided in
`pAllocator`

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09612) VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09612

If no [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) were provided when `pipeline` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-device-parameter) VUID-vkReleaseCapturedPipelineDataKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pInfo-parameter) VUID-vkReleaseCapturedPipelineDataKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkReleaseCapturedPipelineDataInfoKHR](#VkReleaseCapturedPipelineDataInfoKHR) structure

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pAllocator-parameter) VUID-vkReleaseCapturedPipelineDataKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkReleaseCapturedPipelineDataInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkReleaseCapturedPipelineDataInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkPipeline         pipeline;
} VkReleaseCapturedPipelineDataInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` the handle of the pipeline object to release the data
from.

Valid Usage

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09613) VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09613

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](#VkPipelineCreateFlagBits2KHR)

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09618) VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09618

`pipeline` **must** not have been used in a previous call to
`vkReleaseCapturedPipelineDataKHR`

Valid Usage (Implicit)

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-sType-sType) VUID-VkReleaseCapturedPipelineDataInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RELEASE_CAPTURED_PIPELINE_DATA_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pNext-pNext) VUID-VkReleaseCapturedPipelineDataInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-parameter) VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

Host Synchronization

* 
Host access to `pipeline` **must** be externally synchronized

To destroy a [VkPipelineBinaryKHR](#VkPipelineBinaryKHR), call:

// Provided by VK_KHR_pipeline_binary
void vkDestroyPipelineBinaryKHR(
    VkDevice                                    device,
    VkPipelineBinaryKHR                         pipelineBinary,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that created the pipeline binary
object.

* 
`pipelineBinary` is the handle of the pipeline binary object to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09614) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09614

If `VkAllocationCallbacks` were provided when `pipelineBinary`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09615) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-09615

If no [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) were provided when
`pipelineBinary` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipelineBinaryKHR-device-parameter) VUID-vkDestroyPipelineBinaryKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parameter) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parameter

 If `pipelineBinary` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineBinary` **must** be a valid [VkPipelineBinaryKHR](#VkPipelineBinaryKHR) handle

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pAllocator-parameter) VUID-vkDestroyPipelineBinaryKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parent) VUID-vkDestroyPipelineBinaryKHR-pipelineBinary-parent

 If `pipelineBinary` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipelineBinary` **must** be externally synchronized

Specialization constants are a mechanism whereby constants in a SPIR-V
module **can** have their constant value specified at the time the
`VkPipeline` is created.
This allows a SPIR-V module to have constants that **can** be modified while
executing an application that uses the Vulkan API.

|  | Specialization constants are useful to allow a compute shader to have its
| --- | --- |
local workgroup size changed at runtime by the user, for example. |

Each [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo) structure contains a
`pSpecializationInfo` member, which **can** be `NULL` to indicate no
specialization constants, or point to a `VkSpecializationInfo`
structure.

The `VkSpecializationInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSpecializationInfo {
    uint32_t                           mapEntryCount;
    const VkSpecializationMapEntry*    pMapEntries;
    size_t                             dataSize;
    const void*                        pData;
} VkSpecializationInfo;

* 
`mapEntryCount` is the number of entries in the `pMapEntries`
array.

* 
`pMapEntries` is a pointer to an array of
`VkSpecializationMapEntry` structures, which map constant IDs to
offsets in `pData`.

* 
`dataSize` is the byte size of the `pData` buffer.

* 
`pData` contains the actual constant values to specialize with.

Valid Usage

* 
[](#VUID-VkSpecializationInfo-offset-00773) VUID-VkSpecializationInfo-offset-00773

The `offset` member of each element of `pMapEntries` **must** be
less than `dataSize`

* 
[](#VUID-VkSpecializationInfo-pMapEntries-00774) VUID-VkSpecializationInfo-pMapEntries-00774

The `size` member of each element of `pMapEntries` **must** be less
than or equal to `dataSize` minus `offset`

* 
[](#VUID-VkSpecializationInfo-constantID-04911) VUID-VkSpecializationInfo-constantID-04911

The `constantID` value of each element of `pMapEntries` **must** be
unique within `pMapEntries`

Valid Usage (Implicit)

* 
[](#VUID-VkSpecializationInfo-pMapEntries-parameter) VUID-VkSpecializationInfo-pMapEntries-parameter

 If `mapEntryCount` is not `0`, `pMapEntries` **must** be a valid pointer to an array of `mapEntryCount` valid [VkSpecializationMapEntry](#VkSpecializationMapEntry) structures

* 
[](#VUID-VkSpecializationInfo-pData-parameter) VUID-VkSpecializationInfo-pData-parameter

 If `dataSize` is not `0`, `pData` **must** be a valid pointer to an array of `dataSize` bytes

The `VkSpecializationMapEntry` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSpecializationMapEntry {
    uint32_t    constantID;
    uint32_t    offset;
    size_t      size;
} VkSpecializationMapEntry;

* 
`constantID` is the ID of the specialization constant in SPIR-V.

* 
`offset` is the byte offset of the specialization constant value
within the supplied data buffer.

* 
`size` is the byte size of the specialization constant value within
the supplied data buffer.

If a `constantID` value is not a specialization constant ID used in the
shader, that map entry does not affect the behavior of the pipeline.

Valid Usage

* 
[](#VUID-VkSpecializationMapEntry-constantID-00776) VUID-VkSpecializationMapEntry-constantID-00776

For a `constantID` specialization constant declared in a shader,
`size` **must** match the byte size of the `constantID`.
If the specialization constant is of type `boolean`, `size` **must**
be the byte size of `VkBool32`

In human readable SPIR-V:

OpDecorate %x SpecId 13 ; decorate .x component of WorkgroupSize with ID 13
OpDecorate %y SpecId 42 ; decorate .y component of WorkgroupSize with ID 42
OpDecorate %z SpecId 3  ; decorate .z component of WorkgroupSize with ID 3
OpDecorate %wgsize BuiltIn WorkgroupSize ; decorate WorkgroupSize onto constant
%i32 = OpTypeInt 32 0 ; declare an unsigned 32-bit type
%uvec3 = OpTypeVector %i32 3 ; declare a 3 element vector type of unsigned 32-bit
%x = OpSpecConstant %i32 1 ; declare the .x component of WorkgroupSize
%y = OpSpecConstant %i32 1 ; declare the .y component of WorkgroupSize
%z = OpSpecConstant %i32 1 ; declare the .z component of WorkgroupSize
%wgsize = OpSpecConstantComposite %uvec3 %x %y %z ; declare WorkgroupSize

From the above we have three specialization constants, one for each of the
x, y, and z elements of the WorkgroupSize vector.

Now to specialize the above via the specialization constants mechanism:

const VkSpecializationMapEntry entries[] =
{
    {
        .constantID = 13,
        .offset = 0 * sizeof(uint32_t),
        .size = sizeof(uint32_t)
    },
    {
        .constantID = 42,
        .offset = 1 * sizeof(uint32_t),
        .size = sizeof(uint32_t)
    },
    {
        .constantID = 3,
        .offset = 2 * sizeof(uint32_t),
        .size = sizeof(uint32_t)
    }
};

const uint32_t data[] = { 16, 8, 4 }; // our workgroup size is 16x8x4

const VkSpecializationInfo info =
{
    .mapEntryCount = 3,
    .pMapEntries  = entries,
    .dataSize = 3 * sizeof(uint32_t),
    .pData = data,
};

Then when calling [vkCreateComputePipelines](#vkCreateComputePipelines), and passing the
`VkSpecializationInfo` we defined as the `pSpecializationInfo`
parameter of [VkPipelineShaderStageCreateInfo](#VkPipelineShaderStageCreateInfo), we will create a compute
pipeline with the runtime specified local workgroup size.

Another example would be that an application has a SPIR-V module that has
some platform-dependent constants they wish to use.

In human readable SPIR-V:

OpDecorate %1 SpecId 0  ; decorate our signed 32-bit integer constant
OpDecorate %2 SpecId 12 ; decorate our 32-bit floating-point constant
%i32 = OpTypeInt 32 1   ; declare a signed 32-bit type
%float = OpTypeFloat 32 ; declare a 32-bit floating-point type
%1 = OpSpecConstant %i32 -1 ; some signed 32-bit integer constant
%2 = OpSpecConstant %float 0.5 ; some 32-bit floating-point constant

From the above we have two specialization constants, one is a signed 32-bit
integer and the second is a 32-bit floating-point value.

Now to specialize the above via the specialization constants mechanism:

struct SpecializationData {
    int32_t data0;
    float data1;
};

const VkSpecializationMapEntry entries[] =
{
    {
        .constantID = 0,
        .offset = offsetof(SpecializationData, data0),
        .size = sizeof(SpecializationData::data0)
    },
    {
        .constantID = 12,
        .offset = offsetof(SpecializationData, data1),
        .size = sizeof(SpecializationData::data1)
    }
};

SpecializationData data;
data.data0 = -42;    // set the data for the 32-bit integer
data.data1 = 42.0f;  // set the data for the 32-bit floating-point

const VkSpecializationInfo info =
{
    .mapEntryCount = 2,
    .pMapEntries = entries,
    .dataSize = sizeof(data),
    .pdata = &data,
};

It is legal for a SPIR-V module with specializations to be compiled into a
pipeline where no specialization information was provided.
SPIR-V specialization constants contain default values such that if a
specialization is not provided, the default value will be used.
In the examples above, it would be valid for an application to only
specialize some of the specialization constants within the SPIR-V module,
and let the other constants use their default values encoded within the
OpSpecConstant declarations.

A pipeline library is a special pipeline that was created using the
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits) and cannot be bound, instead it
defines a set of pipeline state which can be linked into other pipelines.
For ray tracing pipelines this includes shaders and shader groups.
For graphics pipelines this includes distinct library types defined by
[VkGraphicsPipelineLibraryFlagBitsEXT](#VkGraphicsPipelineLibraryFlagBitsEXT).
The application **must** maintain the lifetime of a pipeline library based on
the pipelines that link with it.

This linkage is achieved by using the following structure within the
appropriate creation mechanisms:

The `VkPipelineLibraryCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_library
typedef struct VkPipelineLibraryCreateInfoKHR {
    VkStructureType      sType;
    const void*          pNext;
    uint32_t             libraryCount;
    const VkPipeline*    pLibraries;
} VkPipelineLibraryCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`libraryCount` is the number of pipeline libraries in
`pLibraries`.

* 
`pLibraries` is a pointer to an array of [VkPipeline](#VkPipeline) structures
specifying pipeline libraries to use when creating a pipeline.

Valid Usage

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-03381) VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-03381

Each element of `pLibraries` **must** have been created with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits)

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-06855) VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-06855

If any library in `pLibraries` was created with a shader stage with
[VkPipelineShaderStageModuleIdentifierCreateInfoEXT](#VkPipelineShaderStageModuleIdentifierCreateInfoEXT) and
`identifierSize` not equal to 0, the pipeline **must** be created with
the [VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](#VkPipelineCreateFlagBits) flag
set

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-sType-sType) VUID-VkPipelineLibraryCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_LIBRARY_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-parameter) VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-parameter

 If `libraryCount` is not `0`, `pLibraries` **must** be a valid pointer to an array of `libraryCount` valid [VkPipeline](#VkPipeline) handles

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

Pipelines created with [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits) libraries
**can** depend on other pipeline libraries in
[VkPipelineLibraryCreateInfoKHR](#VkPipelineLibraryCreateInfoKHR).

A pipeline library is considered in-use, as long as one of the linking
pipelines is in-use.
This applies recursively if a pipeline library includes other pipeline
libraries.

Once a pipeline has been created, it **can** be bound to the command buffer
using the command:

// Provided by VK_VERSION_1_0
void vkCmdBindPipeline(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipeline                                  pipeline);

* 
`commandBuffer` is the command buffer that the pipeline will be
bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](#VkPipelineBindPoint) value specifying
to which bind point the pipeline is bound.
Binding one does not disturb the others.

* 
`pipeline` is the pipeline to be bound.

Once bound, a pipeline binding affects subsequent commands that interact
with the given pipeline type in the command buffer until a different
pipeline of the same type is bound to the bind
point, or until the pipeline bind point is disturbed by binding a
[shader object](shaders.html#shaders-objects) as described in
[Interaction with Pipelines](shaders.html#shaders-objects-pipeline-interaction).
Commands that do not interact with the [given pipeline](shaders.html#shaders-binding)
type **must** not be affected by the pipeline state.

Valid Usage

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00777) VUID-vkCmdBindPipeline-pipelineBindPoint-00777

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](#VkPipelineBindPoint), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00778) VUID-vkCmdBindPipeline-pipelineBindPoint-00778

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_GRAPHICS](#VkPipelineBindPoint), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00779) VUID-vkCmdBindPipeline-pipelineBindPoint-00779

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_COMPUTE](#VkPipelineBindPoint),
`pipeline` **must** be a compute pipeline

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-00780) VUID-vkCmdBindPipeline-pipelineBindPoint-00780

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_GRAPHICS](#VkPipelineBindPoint),
`pipeline` **must** be a graphics pipeline

* 
[](#VUID-vkCmdBindPipeline-pipeline-00781) VUID-vkCmdBindPipeline-pipeline-00781

If the [    `variableMultisampleRate`](features.html#features-variableMultisampleRate) feature is not supported, `pipeline`
is a graphics pipeline, the current subpass [    uses no attachments](renderpass.html#renderpass-noattachments), and this is not the first call to this function
with a graphics pipeline after transitioning to the current subpass,
then the sample count specified by this pipeline **must** match that set in
the previous pipeline

* 
[](#VUID-vkCmdBindPipeline-variableSampleLocations-01525) VUID-vkCmdBindPipeline-variableSampleLocations-01525

If
[VkPhysicalDeviceSampleLocationsPropertiesEXT](limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT)::`variableSampleLocations`
is [VK_FALSE](fundamentals.html#VK_FALSE), and `pipeline` is a graphics pipeline created
with a `renderPass` that is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and with a
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT) structure having its
`sampleLocationsEnable` member set to [VK_TRUE](fundamentals.html#VK_TRUE) but without
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT](#VkDynamicState) enabled then the current
render pass instance **must** have been begun by specifying a
[VkRenderPassSampleLocationsBeginInfoEXT](renderpass.html#VkRenderPassSampleLocationsBeginInfoEXT) structure whose
`pPostSubpassSampleLocations` member contains an element with a
`subpassIndex` matching the current subpass index and the
`sampleLocationsInfo` member of that element **must** match the
`sampleLocationsInfo` specified in
[VkPipelineSampleLocationsStateCreateInfoEXT](primsrast.html#VkPipelineSampleLocationsStateCreateInfoEXT) when the pipeline was
created

* 
[](#VUID-vkCmdBindPipeline-None-02323) VUID-vkCmdBindPipeline-None-02323

This command **must** not be recorded when transform feedback is active

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-02391) VUID-vkCmdBindPipeline-pipelineBindPoint-02391

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](#VkPipelineBindPoint), the `VkCommandPool`
that `commandBuffer` was allocated from **must** support compute
operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-02392) VUID-vkCmdBindPipeline-pipelineBindPoint-02392

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](#VkPipelineBindPoint), `pipeline` **must** be a
ray tracing pipeline

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-06721) VUID-vkCmdBindPipeline-pipelineBindPoint-06721

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](#VkPipelineBindPoint), `commandBuffer` **must**
not be a protected command buffer

* 
[](#VUID-vkCmdBindPipeline-pipelineProtectedAccess-07408) VUID-vkCmdBindPipeline-pipelineProtectedAccess-07408

If the [    `pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature is enabled, and
`commandBuffer` is a protected command buffer, `pipeline` **must**
have been created without
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdBindPipeline-pipelineProtectedAccess-07409) VUID-vkCmdBindPipeline-pipelineProtectedAccess-07409

If the [    `pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature is enabled, and
`commandBuffer` is not a protected command buffer, `pipeline`
**must** have been created without
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](#VkPipelineCreateFlagBits)

* 
[](#VUID-vkCmdBindPipeline-pipeline-03382) VUID-vkCmdBindPipeline-pipeline-03382

`pipeline` **must** not have been created with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](#VkPipelineCreateFlagBits) set

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-04808) VUID-vkCmdBindPipeline-commandBuffer-04808

If `commandBuffer` is a secondary command buffer with
[VkCommandBufferInheritanceViewportScissorInfoNV](cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV)::`viewportScissor2D`
enabled and `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_GRAPHICS](#VkPipelineBindPoint), then the `pipeline` **must**
have been created with [VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](#VkDynamicState) or
[VK_DYNAMIC_STATE_VIEWPORT](#VkDynamicState), and
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](#VkDynamicState) or
[VK_DYNAMIC_STATE_SCISSOR](#VkDynamicState) enabled

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-04809) VUID-vkCmdBindPipeline-commandBuffer-04809

If `commandBuffer` is a secondary command buffer with
[VkCommandBufferInheritanceViewportScissorInfoNV](cmdbuffers.html#VkCommandBufferInheritanceViewportScissorInfoNV)::`viewportScissor2D`
enabled and `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_GRAPHICS](#VkPipelineBindPoint) and `pipeline` was created
with [VkPipelineDiscardRectangleStateCreateInfoEXT](fragops.html#VkPipelineDiscardRectangleStateCreateInfoEXT) structure and
its `discardRectangleCount` member is not `0`, or the pipeline was
created with [VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](#VkDynamicState)
enabled, then the pipeline **must** have been created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](#VkDynamicState) enabled

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-04881) VUID-vkCmdBindPipeline-pipelineBindPoint-04881

If `pipelineBindPoint` is [VK_PIPELINE_BIND_POINT_GRAPHICS](#VkPipelineBindPoint) and
the [    `provokingVertexModePerPipeline`](limits.html#limits-provokingVertexModePerPipeline) limit is [VK_FALSE](fundamentals.html#VK_FALSE), then
pipeline’s
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](vertexpostproc.html#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT)::`provokingVertexMode`
**must** be the same as that of any other pipelines previously bound to
this bind point within the current render pass instance, including any
pipeline already bound when beginning the render pass instance

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-04949) VUID-vkCmdBindPipeline-pipelineBindPoint-04949

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](#VkPipelineBindPoint), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-04950) VUID-vkCmdBindPipeline-pipelineBindPoint-04950

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](#VkPipelineBindPoint), `pipeline`
**must** be a subpass shading pipeline

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-09910) VUID-vkCmdBindPipeline-pipelineBindPoint-09910

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM](#VkPipelineBindPoint), the `VkCommandPool`
that `commandBuffer` was allocated from **must** have been created for
a queue family that supports [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits)

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-09911) VUID-vkCmdBindPipeline-pipelineBindPoint-09911

If `pipelineBindPoint` is
[VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM](#VkPipelineBindPoint), `pipeline` **must** be a
[data graph pipeline](VK_ARM_data_graph/graphs.html#graphs-pipelines)

* 
[](#VUID-vkCmdBindPipeline-pipeline-09912) VUID-vkCmdBindPipeline-pipeline-09912

If `pipeline` is a [data graph pipeline](VK_ARM_data_graph/graphs.html#graphs-pipelines) and the
[VkDataGraphPipelineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM) structure used to create it had a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in its
`pNext` chain that specified any foreign data processing engines,
then the command pool from which `commandBuffer` was allocated **must**
have been created with a [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure that
had a [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure
specifying a superset of the foreign data graph processing engines
specified at pipeline creation time in its `pNext` chain

* 
[](#VUID-vkCmdBindPipeline-pipeline-09913) VUID-vkCmdBindPipeline-pipeline-09913

If `pipeline` is a [data graph pipeline](VK_ARM_data_graph/graphs.html#graphs-pipelines) and the
[VkDataGraphPipelineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM) structure used to create it did
not have a [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in
its `pNext` chain, then the command pool from which
`commandBuffer` was allocated **must** not have been created with a
[VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) that had a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in its
`pNext` chain

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-parameter) VUID-vkCmdBindPipeline-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindPipeline-pipelineBindPoint-parameter) VUID-vkCmdBindPipeline-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdBindPipeline-pipeline-parameter) VUID-vkCmdBindPipeline-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-recording) VUID-vkCmdBindPipeline-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindPipeline-commandBuffer-cmdpool) VUID-vkCmdBindPipeline-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindPipeline-videocoding) VUID-vkCmdBindPipeline-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindPipeline-commonparent) VUID-vkCmdBindPipeline-commonparent

 Both of `commandBuffer`, and `pipeline` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindPipeline is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Possible values of [vkCmdBindPipeline](#vkCmdBindPipeline)::`pipelineBindPoint`,
specifying the bind point of a pipeline object, are:

// Provided by VK_VERSION_1_0
typedef enum VkPipelineBindPoint {
    VK_PIPELINE_BIND_POINT_GRAPHICS = 0,
    VK_PIPELINE_BIND_POINT_COMPUTE = 1,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_PIPELINE_BIND_POINT_EXECUTION_GRAPH_AMDX = 1000134000,
#endif
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR = 1000165000,
  // Provided by VK_HUAWEI_subpass_shading
    VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI = 1000369003,
  // Provided by VK_ARM_data_graph
    VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM = 1000507000,
  // Provided by VK_NV_ray_tracing
    VK_PIPELINE_BIND_POINT_RAY_TRACING_NV = VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR,
} VkPipelineBindPoint;

* 
[VK_PIPELINE_BIND_POINT_COMPUTE](#VkPipelineBindPoint) specifies binding as a compute
pipeline.

* 
[VK_PIPELINE_BIND_POINT_GRAPHICS](#VkPipelineBindPoint) specifies binding as a graphics
pipeline.

* 
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](#VkPipelineBindPoint) specifies binding as a ray
tracing pipeline.

* 
[VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](#VkPipelineBindPoint) specifies binding as
a subpass shading pipeline.

* 
[VK_PIPELINE_BIND_POINT_EXECUTION_GRAPH_AMDX](#VkPipelineBindPoint) specifies binding as
an [execution graph pipeline](executiongraphs.html#executiongraphs).

For pipelines that were created with the support of multiple shader groups
(see [Graphics Pipeline Shader Groups](#graphics-shadergroups)), the regular
`vkCmdBindPipeline` command will bind Shader Group `0`.
To explicitly bind a shader group use:

// Provided by VK_NV_device_generated_commands
void vkCmdBindPipelineShaderGroupNV(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipeline                                  pipeline,
    uint32_t                                    groupIndex);

* 
`commandBuffer` is the command buffer that the pipeline will be
bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](#VkPipelineBindPoint) value specifying
the bind point to which the pipeline will be bound.

* 
`pipeline` is the pipeline to be bound.

* 
`groupIndex` is the shader group to be bound.

Valid Usage

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02893) VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02893

`groupIndex` **must** be `0` or less than the effective
[VkGraphicsPipelineShaderGroupsCreateInfoNV](#VkGraphicsPipelineShaderGroupsCreateInfoNV)::`groupCount`
including the referenced pipelines

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-02894) VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-02894

The `pipelineBindPoint` **must** be
[VK_PIPELINE_BIND_POINT_GRAPHICS](#VkPipelineBindPoint)

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02895) VUID-vkCmdBindPipelineShaderGroupNV-groupIndex-02895

The same restrictions as [vkCmdBindPipeline](#vkCmdBindPipeline) apply as if the bound
pipeline was created only with the Shader Group from the
`groupIndex` information

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-deviceGeneratedCommands-02896) VUID-vkCmdBindPipelineShaderGroupNV-deviceGeneratedCommands-02896

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-parameter) VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-parameter) VUID-vkCmdBindPipelineShaderGroupNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-pipeline-parameter) VUID-vkCmdBindPipelineShaderGroupNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-recording) VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-cmdpool) VUID-vkCmdBindPipelineShaderGroupNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-videocoding) VUID-vkCmdBindPipelineShaderGroupNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindPipelineShaderGroupNV-commonparent) VUID-vkCmdBindPipelineShaderGroupNV-commonparent

 Both of `commandBuffer`, and `pipeline` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindPipelineShaderGroupNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

If the [`shaderObject`](features.html#features-shaderObject) feature is enabled,
applications **can** use both pipelines and [shader objects](shaders.html#shaders-objects)
at the same time.
The interaction between pipelines and shader objects is described in
[Interaction with Pipelines](shaders.html#shaders-objects-pipeline-interaction).

When a pipeline object is bound, any pipeline object state that is not
specified as dynamic is applied to the command buffer state.
Pipeline object state that is specified as dynamic is not applied to the
command buffer state at this time.

Instead, dynamic state **can** be modified at any time and persists for the
lifetime of the command buffer, or until modified by another dynamic state
setting command, or made invalid by binding a pipeline in which that state
is statically specified.

If the [`commandBufferInheritance`](features.html#features-commandBufferInheritance)
feature is enabled, all valid state from the previously executed command
buffer in the queue is inherited into the next command buffer executed in
the same queue.
This inherited state does not need to be set again before draw or dispatch
commands.

When a pipeline object is bound, the following applies to each state
parameter:

* 
If the state is not specified as dynamic in the new pipeline object,
then that command buffer state is overwritten by the state in the new
pipeline object.
Before any draw or dispatch call with this pipeline there **must** not have
been any calls to any of the corresponding dynamic state setting
commands after this pipeline was bound.

* 
If the state is specified as dynamic in the new pipeline object, then
that command buffer state is not disturbed.
Before any draw or dispatch call with this pipeline there **must** have
been at least one call to each of the corresponding dynamic state
setting commands.
The state-setting commands **must** be recorded after command buffer
recording was begun, or after the last command binding a pipeline object
with that state specified as static, whichever was the latter.

* 
If the state is not included (corresponding pointer in
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) was `NULL` or was ignored) in the new
pipeline object, then that command buffer state is not disturbed.
For example, mesh shading pipelines do not include vertex input state
and therefore do not disturb any such command buffer state.

Dynamic state that does not affect the result of operations **can** be left
**undefined**.

|  | For example, if blending is disabled by the pipeline object state then the
| --- | --- |
dynamic color blend constants do not need to be specified in the command
buffer, even if this state is specified as dynamic in the pipeline object. |

|  | Applications running on Vulkan implementations advertising a
| --- | --- |
[VkPhysicalDeviceDriverProperties](devsandqueues.html#VkPhysicalDeviceDriverProperties)::`conformanceVersion` less than
1.3.8.0 should be aware that rebinding the bound pipeline object may not
reapply static state. |

When a pipeline is created, its state and shaders are compiled into zero or
more device-specific executables, which are used when executing commands
against that pipeline.
To query the properties of these pipeline executables, call:

// Provided by VK_KHR_pipeline_executable_properties
VkResult vkGetPipelineExecutablePropertiesKHR(
    VkDevice                                    device,
    const VkPipelineInfoKHR*                    pPipelineInfo,
    uint32_t*                                   pExecutableCount,
    VkPipelineExecutablePropertiesKHR*          pProperties);

* 
`device` is the device that created the pipeline.

* 
`pPipelineInfo` describes the pipeline being queried.

* 
`pExecutableCount` is a pointer to an integer related to the number
of pipeline executables available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkPipelineExecutablePropertiesKHR](#VkPipelineExecutablePropertiesKHR) structures.

If `pProperties` is `NULL`, then the number of pipeline executables
associated with the pipeline is returned in `pExecutableCount`.
Otherwise, `pExecutableCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pExecutableCount` is less than the number of pipeline executables
associated with the pipeline, at most `pExecutableCount` structures will
be written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available properties were
returned.

Valid Usage

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pipelineExecutableInfo-03270) VUID-vkGetPipelineExecutablePropertiesKHR-pipelineExecutableInfo-03270

The [`pipelineExecutableInfo`](features.html#features-pipelineExecutableInfo)
feature **must** be enabled

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pipeline-03271) VUID-vkGetPipelineExecutablePropertiesKHR-pipeline-03271

The `pipeline` member of `pPipelineInfo` **must** have been created
with `device`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-device-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pPipelineInfo-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkPipelineInfoKHR](#VkPipelineInfoKHR) structure

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pExecutableCount-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-pExecutableCount-parameter

 `pExecutableCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPipelineExecutablePropertiesKHR-pProperties-parameter) VUID-vkGetPipelineExecutablePropertiesKHR-pProperties-parameter

 If the value referenced by `pExecutableCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pExecutableCount` [VkPipelineExecutablePropertiesKHR](#VkPipelineExecutablePropertiesKHR) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

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

The `VkPipelineExecutablePropertiesKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineExecutablePropertiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkShaderStageFlags    stages;
    char                  name[VK_MAX_DESCRIPTION_SIZE];
    char                  description[VK_MAX_DESCRIPTION_SIZE];
    uint32_t              subgroupSize;
} VkPipelineExecutablePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stages` is a bitmask of zero or more [VkShaderStageFlagBits](#VkShaderStageFlagBits)
indicating which shader stages (if any) were principally used as inputs
to compile this pipeline executable.

* 
`name` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a short human
readable name for this pipeline executable.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a human readable
description for this pipeline executable.

* 
`subgroupSize` is the subgroup size with which this pipeline
executable is dispatched.

Not all implementations have a 1:1 mapping between shader stages and
pipeline executables and some implementations **may** reduce a given shader
stage to fixed function hardware programming such that no pipeline
executable is available.
No guarantees are provided about the mapping between shader stages and
pipeline executables and `stages` **should** be considered a best effort
hint.
Because the application **cannot** rely on the `stages` field to provide an
exact description, `name` and `description` provide a human readable
name and description which more accurately describes the given pipeline
executable.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineExecutablePropertiesKHR-sType-sType) VUID-VkPipelineExecutablePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_PROPERTIES_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineExecutablePropertiesKHR-pNext-pNext) VUID-VkPipelineExecutablePropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

To query the pipeline properties call:

// Provided by VK_EXT_pipeline_properties
VkResult vkGetPipelinePropertiesEXT(
    VkDevice                                    device,
    const VkPipelineInfoEXT*                    pPipelineInfo,
    VkBaseOutStructure*                         pPipelineProperties);

* 
`device` is the logical device that created the pipeline.

* 
`pPipelineInfo` is a pointer to a [VkPipelineInfoEXT](#VkPipelineInfoEXT) structure
which describes the pipeline being queried.

* 
`pPipelineProperties` is a pointer to a [VkBaseOutStructure](fundamentals.html#VkBaseOutStructure)
structure in which the pipeline properties will be written.

To query a pipeline’s `pipelineIdentifier` pass a
[VkPipelinePropertiesIdentifierEXT](#VkPipelinePropertiesIdentifierEXT) structure in
`pPipelineProperties`.
Each pipeline is associated with a `pipelineIdentifier` and the
identifier is implementation specific.

Valid Usage

* 
[](#VUID-vkGetPipelinePropertiesEXT-pipeline-06738) VUID-vkGetPipelinePropertiesEXT-pipeline-06738

The `pipeline` member of `pPipelineInfo` **must** have been created
with `device`

* 
[](#VUID-vkGetPipelinePropertiesEXT-pPipelineProperties-06739) VUID-vkGetPipelinePropertiesEXT-pPipelineProperties-06739

`pPipelineProperties` **must** be a valid pointer to a
[VkPipelinePropertiesIdentifierEXT](#VkPipelinePropertiesIdentifierEXT) structure

* 
[](#VUID-vkGetPipelinePropertiesEXT-None-06766) VUID-vkGetPipelinePropertiesEXT-None-06766

The [    `pipelinePropertiesIdentifier`](features.html#features-pipelinePropertiesIdentifier) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelinePropertiesEXT-device-parameter) VUID-vkGetPipelinePropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelinePropertiesEXT-pPipelineInfo-parameter) VUID-vkGetPipelinePropertiesEXT-pPipelineInfo-parameter

 `pPipelineInfo` **must** be a valid pointer to a valid [VkPipelineInfoEXT](#VkPipelineInfoEXT) structure

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

The `VkPipelinePropertiesIdentifierEXT` structure is defined as:

// Provided by VK_EXT_pipeline_properties
typedef struct VkPipelinePropertiesIdentifierEXT {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            pipelineIdentifier[VK_UUID_SIZE];
} VkPipelinePropertiesIdentifierEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineIdentifier` is an array of [VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) `uint8_t`
values into which the pipeline identifier will be written.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelinePropertiesIdentifierEXT-sType-sType) VUID-VkPipelinePropertiesIdentifierEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_PROPERTIES_IDENTIFIER_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelinePropertiesIdentifierEXT-pNext-pNext) VUID-VkPipelinePropertiesIdentifierEXT-pNext-pNext

 `pNext` **must** be `NULL`

The `VkPipelineInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         pipeline;
} VkPipelineInfoKHR;

// Provided by VK_EXT_pipeline_properties
// Equivalent to VkPipelineInfoKHR
typedef VkPipelineInfoKHR VkPipelineInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` is a `VkPipeline` handle.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineInfoKHR-sType-sType) VUID-VkPipelineInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineInfoKHR-pNext-pNext) VUID-VkPipelineInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineInfoKHR-pipeline-parameter) VUID-VkPipelineInfoKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

Each pipeline executable **may** have a set of statistics associated with it
that are generated by the pipeline compilation process.
These statistics **may** include things such as instruction counts, amount of
spilling (if any), maximum number of simultaneous threads, or anything else
which **may** aid developers in evaluating the expected performance of a
shader.
To query the compile time statistics associated with a pipeline executable,
call:

// Provided by VK_KHR_pipeline_executable_properties
VkResult vkGetPipelineExecutableStatisticsKHR(
    VkDevice                                    device,
    const VkPipelineExecutableInfoKHR*          pExecutableInfo,
    uint32_t*                                   pStatisticCount,
    VkPipelineExecutableStatisticKHR*           pStatistics);

* 
`device` is the device that created the pipeline.

* 
`pExecutableInfo` describes the pipeline executable being queried.

* 
`pStatisticCount` is a pointer to an integer related to the number
of statistics available or queried, as described below.

* 
`pStatistics` is either `NULL` or a pointer to an array of
[VkPipelineExecutableStatisticKHR](#VkPipelineExecutableStatisticKHR) structures.

If `pStatistics` is `NULL`, then the number of statistics associated
with the pipeline executable is returned in `pStatisticCount`.
Otherwise, `pStatisticCount` **must** point to a variable set by the
application to the number of elements in the `pStatistics` array, and on
return the variable is overwritten with the number of structures actually
written to `pStatistics`.
If `pStatisticCount` is less than the number of statistics associated
with the pipeline executable, at most `pStatisticCount` structures will
be written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available statistics were
returned.

Valid Usage

* 
[](#VUID-vkGetPipelineExecutableStatisticsKHR-pipelineExecutableInfo-03272) VUID-vkGetPipelineExecutableStatisticsKHR-pipelineExecutableInfo-03272

The [`pipelineExecutableInfo`](features.html#features-pipelineExecutableInfo)
feature **must** be enabled

* 
[](#VUID-vkGetPipelineExecutableStatisticsKHR-pipeline-03273) VUID-vkGetPipelineExecutableStatisticsKHR-pipeline-03273

The `pipeline` member of `pExecutableInfo` **must** have been
created with `device`

* 
[](#VUID-vkGetPipelineExecutableStatisticsKHR-pipeline-03274) VUID-vkGetPipelineExecutableStatisticsKHR-pipeline-03274

The `pipeline` member of `pExecutableInfo` **must** have been
created with [VK_PIPELINE_CREATE_CAPTURE_STATISTICS_BIT_KHR](#VkPipelineCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineExecutableStatisticsKHR-device-parameter) VUID-vkGetPipelineExecutableStatisticsKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineExecutableStatisticsKHR-pExecutableInfo-parameter) VUID-vkGetPipelineExecutableStatisticsKHR-pExecutableInfo-parameter

 `pExecutableInfo` **must** be a valid pointer to a valid [VkPipelineExecutableInfoKHR](#VkPipelineExecutableInfoKHR) structure

* 
[](#VUID-vkGetPipelineExecutableStatisticsKHR-pStatisticCount-parameter) VUID-vkGetPipelineExecutableStatisticsKHR-pStatisticCount-parameter

 `pStatisticCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPipelineExecutableStatisticsKHR-pStatistics-parameter) VUID-vkGetPipelineExecutableStatisticsKHR-pStatistics-parameter

 If the value referenced by `pStatisticCount` is not `0`, and `pStatistics` is not `NULL`, `pStatistics` **must** be a valid pointer to an array of `pStatisticCount` [VkPipelineExecutableStatisticKHR](#VkPipelineExecutableStatisticKHR) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

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

The `VkPipelineExecutableInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineExecutableInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         pipeline;
    uint32_t           executableIndex;
} VkPipelineExecutableInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` is the pipeline to query.

* 
`executableIndex` is the index of the pipeline executable to query
in the array of executable properties returned by
[vkGetPipelineExecutablePropertiesKHR](#vkGetPipelineExecutablePropertiesKHR).

Valid Usage

* 
[](#VUID-VkPipelineExecutableInfoKHR-executableIndex-03275) VUID-VkPipelineExecutableInfoKHR-executableIndex-03275

`executableIndex` **must** be less than the number of pipeline
executables associated with `pipeline` as returned in the
`pExecutableCount` parameter of
`vkGetPipelineExecutablePropertiesKHR`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineExecutableInfoKHR-sType-sType) VUID-VkPipelineExecutableInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineExecutableInfoKHR-pNext-pNext) VUID-VkPipelineExecutableInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineExecutableInfoKHR-pipeline-parameter) VUID-VkPipelineExecutableInfoKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

The `VkPipelineExecutableStatisticKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineExecutableStatisticKHR {
    VkStructureType                           sType;
    void*                                     pNext;
    char                                      name[VK_MAX_DESCRIPTION_SIZE];
    char                                      description[VK_MAX_DESCRIPTION_SIZE];
    VkPipelineExecutableStatisticFormatKHR    format;
    VkPipelineExecutableStatisticValueKHR     value;
} VkPipelineExecutableStatisticKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`name` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a short human
readable name for this statistic.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a human readable
description for this statistic.

* 
`format` is a [VkPipelineExecutableStatisticFormatKHR](#VkPipelineExecutableStatisticFormatKHR) value
specifying the format of the data found in `value`.

* 
`value` is the value of this statistic.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineExecutableStatisticKHR-sType-sType) VUID-VkPipelineExecutableStatisticKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_STATISTIC_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineExecutableStatisticKHR-pNext-pNext) VUID-VkPipelineExecutableStatisticKHR-pNext-pNext

 `pNext` **must** be `NULL`

The [VkPipelineExecutableStatisticFormatKHR](#VkPipelineExecutableStatisticFormatKHR) enum is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef enum VkPipelineExecutableStatisticFormatKHR {
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_BOOL32_KHR = 0,
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_INT64_KHR = 1,
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_UINT64_KHR = 2,
    VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_FLOAT64_KHR = 3,
} VkPipelineExecutableStatisticFormatKHR;

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_BOOL32_KHR](#VkPipelineExecutableStatisticFormatKHR) specifies that
the statistic is returned as a 32-bit boolean value which **must** be
either [VK_TRUE](fundamentals.html#VK_TRUE) or [VK_FALSE](fundamentals.html#VK_FALSE) and **should** be read from the
`b32` field of `VkPipelineExecutableStatisticValueKHR`.

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_INT64_KHR](#VkPipelineExecutableStatisticFormatKHR) specifies that
the statistic is returned as a signed 64-bit integer and **should** be read
from the `i64` field of `VkPipelineExecutableStatisticValueKHR`.

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_UINT64_KHR](#VkPipelineExecutableStatisticFormatKHR) specifies that
the statistic is returned as an unsigned 64-bit integer and **should** be
read from the `u64` field of
`VkPipelineExecutableStatisticValueKHR`.

* 
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_FLOAT64_KHR](#VkPipelineExecutableStatisticFormatKHR) specifies that
the statistic is returned as a 64-bit floating-point value and **should**
be read from the `f64` field of
`VkPipelineExecutableStatisticValueKHR`.

The `VkPipelineExecutableStatisticValueKHR` union is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef union VkPipelineExecutableStatisticValueKHR {
    VkBool32    b32;
    int64_t     i64;
    uint64_t    u64;
    double      f64;
} VkPipelineExecutableStatisticValueKHR;

* 
`b32` is the 32-bit boolean value if the
[VkPipelineExecutableStatisticFormatKHR](#VkPipelineExecutableStatisticFormatKHR) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_BOOL32_KHR](#VkPipelineExecutableStatisticFormatKHR).

* 
`i64` is the signed 64-bit integer value if the
[VkPipelineExecutableStatisticFormatKHR](#VkPipelineExecutableStatisticFormatKHR) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_INT64_KHR](#VkPipelineExecutableStatisticFormatKHR).

* 
`u64` is the unsigned 64-bit integer value if the
[VkPipelineExecutableStatisticFormatKHR](#VkPipelineExecutableStatisticFormatKHR) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_UINT64_KHR](#VkPipelineExecutableStatisticFormatKHR).

* 
`f64` is the 64-bit floating-point value if the
[VkPipelineExecutableStatisticFormatKHR](#VkPipelineExecutableStatisticFormatKHR) is
[VK_PIPELINE_EXECUTABLE_STATISTIC_FORMAT_FLOAT64_KHR](#VkPipelineExecutableStatisticFormatKHR).

Each pipeline executable **may** have one or more text or binary internal
representations associated with it which are generated as part of the
compile process.
These **may** include the final shader assembly, a binary form of the compiled
shader, or the shader compiler’s internal representation at any number of
intermediate compile steps.
To query the internal representations associated with a pipeline executable,
call:

// Provided by VK_KHR_pipeline_executable_properties
VkResult vkGetPipelineExecutableInternalRepresentationsKHR(
    VkDevice                                    device,
    const VkPipelineExecutableInfoKHR*          pExecutableInfo,
    uint32_t*                                   pInternalRepresentationCount,
    VkPipelineExecutableInternalRepresentationKHR* pInternalRepresentations);

* 
`device` is the device that created the pipeline.

* 
`pExecutableInfo` describes the pipeline executable being queried.

* 
`pInternalRepresentationCount` is a pointer to an integer related to
the number of internal representations available or queried, as
described below.

* 
`pInternalRepresentations` is either `NULL` or a pointer to an array
of [VkPipelineExecutableInternalRepresentationKHR](#VkPipelineExecutableInternalRepresentationKHR) structures.

If `pInternalRepresentations` is `NULL`, then the number of internal
representations associated with the pipeline executable is returned in
`pInternalRepresentationCount`.
Otherwise, `pInternalRepresentationCount` **must** point to a variable set
by the application to the number of elements in the
`pInternalRepresentations` array, and on return the variable is
overwritten with the number of structures actually written to
`pInternalRepresentations`.
If `pInternalRepresentationCount` is less than the number of internal
representations associated with the pipeline executable, at most
`pInternalRepresentationCount` structures will be written, and
[VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to
indicate that not all the available representations were returned.

While the details of the internal representations remain
implementation-dependent, the implementation **should** order the internal
representations in the order in which they occur in the compiled pipeline
with the final shader assembly (if any) last.

Valid Usage

* 
[](#VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pipelineExecutableInfo-03276) VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pipelineExecutableInfo-03276

The [`pipelineExecutableInfo`](features.html#features-pipelineExecutableInfo)
feature **must** be enabled

* 
[](#VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pipeline-03277) VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pipeline-03277

The `pipeline` member of `pExecutableInfo` **must** have been
created with `device`

* 
[](#VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pipeline-03278) VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pipeline-03278

The `pipeline` member of `pExecutableInfo` **must** have been
created with
[VK_PIPELINE_CREATE_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](#VkPipelineCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineExecutableInternalRepresentationsKHR-device-parameter) VUID-vkGetPipelineExecutableInternalRepresentationsKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pExecutableInfo-parameter) VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pExecutableInfo-parameter

 `pExecutableInfo` **must** be a valid pointer to a valid [VkPipelineExecutableInfoKHR](#VkPipelineExecutableInfoKHR) structure

* 
[](#VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pInternalRepresentationCount-parameter) VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pInternalRepresentationCount-parameter

 `pInternalRepresentationCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pInternalRepresentations-parameter) VUID-vkGetPipelineExecutableInternalRepresentationsKHR-pInternalRepresentations-parameter

 If the value referenced by `pInternalRepresentationCount` is not `0`, and `pInternalRepresentations` is not `NULL`, `pInternalRepresentations` **must** be a valid pointer to an array of `pInternalRepresentationCount` [VkPipelineExecutableInternalRepresentationKHR](#VkPipelineExecutableInternalRepresentationKHR) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

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

The `VkPipelineExecutableInternalRepresentationKHR` structure is defined
as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineExecutableInternalRepresentationKHR {
    VkStructureType    sType;
    void*              pNext;
    char               name[VK_MAX_DESCRIPTION_SIZE];
    char               description[VK_MAX_DESCRIPTION_SIZE];
    VkBool32           isText;
    size_t             dataSize;
    void*              pData;
} VkPipelineExecutableInternalRepresentationKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`name` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a short human
readable name for this internal representation.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a human readable
description for this internal representation.

* 
`isText` specifies whether the returned data is text or opaque data.
If `isText` is [VK_TRUE](fundamentals.html#VK_TRUE) then the data returned in `pData`
is text and is guaranteed to be a null-terminated UTF-8 string.

* 
`dataSize` is an integer related to the size, in bytes, of the
internal representation’s data, as described below.

* 
`pData` is either `NULL` or a pointer to a block of data into which
the implementation will write the internal representation.

If `pData` is `NULL`, then the size, in bytes, of the internal
representation data is returned in `dataSize`.
Otherwise, `dataSize` **must** be the size of the buffer, in bytes, pointed
to by `pData` and on return `dataSize` is overwritten with the
number of bytes of data actually written to `pData` including any
trailing null character.
If `dataSize` is less than the size, in bytes, of the internal
representation’s data, at most `dataSize` bytes of data will be written
to `pData`, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available representation was
returned.

If `isText` is [VK_TRUE](fundamentals.html#VK_TRUE) and `pData` is not `NULL` and
`dataSize` is not zero, the last byte written to `pData` will be a
null character.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineExecutableInternalRepresentationKHR-sType-sType) VUID-VkPipelineExecutableInternalRepresentationKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_INTERNAL_REPRESENTATION_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineExecutableInternalRepresentationKHR-pNext-pNext) VUID-VkPipelineExecutableInternalRepresentationKHR-pNext-pNext

 `pNext` **must** be `NULL`

Information about a particular shader that has been compiled as part of a
pipeline object can be extracted by calling:

// Provided by VK_AMD_shader_info
VkResult vkGetShaderInfoAMD(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    VkShaderStageFlagBits                       shaderStage,
    VkShaderInfoTypeAMD                         infoType,
    size_t*                                     pInfoSize,
    void*                                       pInfo);

* 
`device` is the device that created `pipeline`.

* 
`pipeline` is the target of the query.

* 
`shaderStage` is a [VkShaderStageFlagBits](#VkShaderStageFlagBits) specifying the
particular shader within the pipeline about which information is being
queried.

* 
`infoType` describes what kind of information is being queried.

* 
`pInfoSize` is a pointer to a value related to the amount of data
the query returns, as described below.

* 
`pInfo` is either `NULL` or a pointer to a buffer.

If `pInfo` is `NULL`, then the maximum size of the information that **can**
be retrieved about the shader, in bytes, is returned in `pInfoSize`.
Otherwise, `pInfoSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pInfo`, and on
return the variable is overwritten with the amount of data actually written
to `pInfo`.
If `pInfoSize` is less than the maximum size that **can** be retrieved by
the pipeline cache, then at most `pInfoSize` bytes will be written to
`pInfo`, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned, instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all required of the pipeline cache
was returned.

Not all information is available for every shader and implementations may
not support all kinds of information for any shader.
When a certain type of information is unavailable, the function returns
[VK_ERROR_FEATURE_NOT_PRESENT](fundamentals.html#VkResult).

If information is successfully and fully queried, the function will return
[VK_SUCCESS](fundamentals.html#VkResult).

For `infoType` [VK_SHADER_INFO_TYPE_STATISTICS_AMD](#VkShaderInfoTypeAMD), a
`VkShaderStatisticsInfoAMD` structure will be written to the buffer
pointed to by `pInfo`.
This structure will be populated with statistics regarding the physical
device resources used by that shader along with other miscellaneous
information and is described in further detail below.

For `infoType` [VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD](#VkShaderInfoTypeAMD), `pInfo` is
a pointer to a null-terminated UTF-8 string containing human-readable
disassembly.
The exact formatting and contents of the disassembly string are
vendor-specific.

The formatting and contents of all other types of information, including
`infoType` [VK_SHADER_INFO_TYPE_BINARY_AMD](#VkShaderInfoTypeAMD), are left to the vendor
and are not further specified by this extension.

|  | This query does not behave consistently with the behavior described in
| --- | --- |
[Opaque Binary Data Results](fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pInfoSize`,
the query returns up to the size of the passed buffer, and signals overflow
with a [VK_INCOMPLETE](fundamentals.html#VkResult) success status instead of returning a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](fundamentals.html#VkResult) error status. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderInfoAMD-device-parameter) VUID-vkGetShaderInfoAMD-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetShaderInfoAMD-pipeline-parameter) VUID-vkGetShaderInfoAMD-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](#VkPipeline) handle

* 
[](#VUID-vkGetShaderInfoAMD-shaderStage-parameter) VUID-vkGetShaderInfoAMD-shaderStage-parameter

 `shaderStage` **must** be a valid [VkShaderStageFlagBits](#VkShaderStageFlagBits) value

* 
[](#VUID-vkGetShaderInfoAMD-infoType-parameter) VUID-vkGetShaderInfoAMD-infoType-parameter

 `infoType` **must** be a valid [VkShaderInfoTypeAMD](#VkShaderInfoTypeAMD) value

* 
[](#VUID-vkGetShaderInfoAMD-pInfoSize-parameter) VUID-vkGetShaderInfoAMD-pInfoSize-parameter

 `pInfoSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetShaderInfoAMD-pInfo-parameter) VUID-vkGetShaderInfoAMD-pInfo-parameter

 If the value referenced by `pInfoSize` is not `0`, and `pInfo` is not `NULL`, `pInfo` **must** be a valid pointer to an array of `pInfoSize` bytes

* 
[](#VUID-vkGetShaderInfoAMD-pipeline-parent) VUID-vkGetShaderInfoAMD-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FEATURE_NOT_PRESENT](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Possible values of [vkGetShaderInfoAMD](#vkGetShaderInfoAMD)::`infoType`, specifying the
information being queried from a shader, are:

// Provided by VK_AMD_shader_info
typedef enum VkShaderInfoTypeAMD {
    VK_SHADER_INFO_TYPE_STATISTICS_AMD = 0,
    VK_SHADER_INFO_TYPE_BINARY_AMD = 1,
    VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD = 2,
} VkShaderInfoTypeAMD;

* 
[VK_SHADER_INFO_TYPE_STATISTICS_AMD](#VkShaderInfoTypeAMD) specifies that device resources
used by a shader will be queried.

* 
[VK_SHADER_INFO_TYPE_BINARY_AMD](#VkShaderInfoTypeAMD) specifies that
implementation-specific information will be queried.

* 
[VK_SHADER_INFO_TYPE_DISASSEMBLY_AMD](#VkShaderInfoTypeAMD) specifies that human-readable
disassembly of a shader.

The `VkShaderStatisticsInfoAMD` structure is defined as:

// Provided by VK_AMD_shader_info
typedef struct VkShaderStatisticsInfoAMD {
    VkShaderStageFlags          shaderStageMask;
    VkShaderResourceUsageAMD    resourceUsage;
    uint32_t                    numPhysicalVgprs;
    uint32_t                    numPhysicalSgprs;
    uint32_t                    numAvailableVgprs;
    uint32_t                    numAvailableSgprs;
    uint32_t                    computeWorkGroupSize[3];
} VkShaderStatisticsInfoAMD;

* 
`shaderStageMask` are the combination of logical shader stages
contained within this shader.

* 
`resourceUsage` is a [VkShaderResourceUsageAMD](#VkShaderResourceUsageAMD) structure
describing internal physical device resources used by this shader.

* 
`numPhysicalVgprs` is the maximum number of vector instruction
general-purpose registers (VGPRs) available to the physical device.

* 
`numPhysicalSgprs` is the maximum number of scalar instruction
general-purpose registers (SGPRs) available to the physical device.

* 
`numAvailableVgprs` is the maximum limit of VGPRs made available to
the shader compiler.

* 
`numAvailableSgprs` is the maximum limit of SGPRs made available to
the shader compiler.

* 
`computeWorkGroupSize` is the local workgroup size of this shader in
{ X, Y, Z } dimensions.

Some implementations may merge multiple logical shader stages together in a
single shader.
In such cases, `shaderStageMask` will contain a bitmask of all of the
stages that are active within that shader.
Consequently, if specifying those stages as input to
[vkGetShaderInfoAMD](#vkGetShaderInfoAMD), the same output information **may** be returned for
all such shader stage queries.

The number of available VGPRs and SGPRs (`numAvailableVgprs` and
`numAvailableSgprs` respectively) are the shader-addressable subset of
physical registers that is given as a limit to the compiler for register
assignment.
These values **may** further be limited by implementations due to performance
optimizations where register pressure is a bottleneck.

The `VkShaderResourceUsageAMD` structure is defined as:

// Provided by VK_AMD_shader_info
typedef struct VkShaderResourceUsageAMD {
    uint32_t    numUsedVgprs;
    uint32_t    numUsedSgprs;
    uint32_t    ldsSizePerLocalWorkGroup;
    size_t      ldsUsageSizeInBytes;
    size_t      scratchMemUsageInBytes;
} VkShaderResourceUsageAMD;

* 
`numUsedVgprs` is the number of vector instruction general-purpose
registers used by this shader.

* 
`numUsedSgprs` is the number of scalar instruction general-purpose
registers used by this shader.

* 
`ldsSizePerLocalWorkGroup` is the maximum local data store size per
work group in bytes.

* 
`ldsUsageSizeInBytes` is the LDS usage size in bytes per work group
by this shader.

* 
`scratchMemUsageInBytes` is the scratch memory usage in bytes by
this shader.

The compilation of a pipeline **can** be tuned by adding a
`VkPipelineCompilerControlCreateInfoAMD` structure to the `pNext`
chain of [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo) or
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo).

// Provided by VK_AMD_pipeline_compiler_control
typedef struct VkPipelineCompilerControlCreateInfoAMD {
    VkStructureType                      sType;
    const void*                          pNext;
    VkPipelineCompilerControlFlagsAMD    compilerControlFlags;
} VkPipelineCompilerControlCreateInfoAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compilerControlFlags` is a bitmask of
[VkPipelineCompilerControlFlagBitsAMD](#VkPipelineCompilerControlFlagBitsAMD) affecting how the pipeline
will be compiled.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCompilerControlCreateInfoAMD-sType-sType) VUID-VkPipelineCompilerControlCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COMPILER_CONTROL_CREATE_INFO_AMD](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineCompilerControlCreateInfoAMD-compilerControlFlags-zerobitmask) VUID-VkPipelineCompilerControlCreateInfoAMD-compilerControlFlags-zerobitmask

 `compilerControlFlags` **must** be `0`

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

* 
[VkExecutionGraphPipelineCreateInfoAMDX](executiongraphs.html#VkExecutionGraphPipelineCreateInfoAMDX)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

There are currently no available flags for this extension; flags will be
added by future versions of this extension.

// Provided by VK_AMD_pipeline_compiler_control
typedef enum VkPipelineCompilerControlFlagBitsAMD {
} VkPipelineCompilerControlFlagBitsAMD;

// Provided by VK_AMD_pipeline_compiler_control
typedef VkFlags VkPipelineCompilerControlFlagsAMD;

`VkPipelineCompilerControlFlagsAMD` is a bitmask type for setting a mask
of zero or more [VkPipelineCompilerControlFlagBitsAMD](#VkPipelineCompilerControlFlagBitsAMD).

Feedback about the creation of a particular pipeline object **can** be obtained
by adding a `VkPipelineCreationFeedbackCreateInfo` structure to the
`pNext` chain of [VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo),
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR),
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV),
[VkDataGraphPipelineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM),
or [VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo).
The `VkPipelineCreationFeedbackCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineCreationFeedbackCreateInfo {
    VkStructureType                sType;
    const void*                    pNext;
    VkPipelineCreationFeedback*    pPipelineCreationFeedback;
    uint32_t                       pipelineStageCreationFeedbackCount;
    VkPipelineCreationFeedback*    pPipelineStageCreationFeedbacks;
} VkPipelineCreationFeedbackCreateInfo;

// Provided by VK_EXT_pipeline_creation_feedback
// Equivalent to VkPipelineCreationFeedbackCreateInfo
typedef VkPipelineCreationFeedbackCreateInfo VkPipelineCreationFeedbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pPipelineCreationFeedback` is a pointer to a
[VkPipelineCreationFeedback](#VkPipelineCreationFeedback) structure.

* 
`pipelineStageCreationFeedbackCount` is the number of elements in
`pPipelineStageCreationFeedbacks`.

* 
`pPipelineStageCreationFeedbacks` is a pointer to an array of
`pipelineStageCreationFeedbackCount`
[VkPipelineCreationFeedback](#VkPipelineCreationFeedback) structures.

An implementation **should** write pipeline creation feedback to
`pPipelineCreationFeedback` and **may** write pipeline stage creation
feedback to `pPipelineStageCreationFeedbacks`.
An implementation **must** set or clear the
[VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) in
[VkPipelineCreationFeedback](#VkPipelineCreationFeedback)::`flags` for
`pPipelineCreationFeedback` and every element of
`pPipelineStageCreationFeedbacks`.

|  | One common scenario for an implementation to skip per-stage feedback is when
| --- | --- |
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) is
set in `pPipelineCreationFeedback`. |

When chained to
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR),
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV),
or
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo), the `i` element of
`pPipelineStageCreationFeedbacks` corresponds to the `i` element of
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)::`pStages`,
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)::`pStages`,
or
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)::`pStages`.
When chained to [VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo), the first element of
`pPipelineStageCreationFeedbacks` corresponds to
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)::`stage`.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCreationFeedbackCreateInfo-sType-sType) VUID-VkPipelineCreationFeedbackCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineCreationFeedback-parameter) VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineCreationFeedback-parameter

 `pPipelineCreationFeedback` **must** be a valid pointer to a [VkPipelineCreationFeedback](#VkPipelineCreationFeedback) structure

* 
[](#VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineStageCreationFeedbacks-parameter) VUID-VkPipelineCreationFeedbackCreateInfo-pPipelineStageCreationFeedbacks-parameter

 If `pipelineStageCreationFeedbackCount` is not `0`, `pPipelineStageCreationFeedbacks` **must** be a valid pointer to an array of `pipelineStageCreationFeedbackCount` [VkPipelineCreationFeedback](#VkPipelineCreationFeedback) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](#VkComputePipelineCreateInfo)

* 
[VkDataGraphPipelineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM)

* 
[VkExecutionGraphPipelineCreateInfoAMDX](executiongraphs.html#VkExecutionGraphPipelineCreateInfoAMDX)

* 
[VkGraphicsPipelineCreateInfo](#VkGraphicsPipelineCreateInfo)

* 
[VkRayTracingPipelineCreateInfoKHR](#VkRayTracingPipelineCreateInfoKHR)

* 
[VkRayTracingPipelineCreateInfoNV](#VkRayTracingPipelineCreateInfoNV)

The `VkPipelineCreationFeedback` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPipelineCreationFeedback {
    VkPipelineCreationFeedbackFlags    flags;
    uint64_t                           duration;
} VkPipelineCreationFeedback;

// Provided by VK_EXT_pipeline_creation_feedback
// Equivalent to VkPipelineCreationFeedback
typedef VkPipelineCreationFeedback VkPipelineCreationFeedbackEXT;

* 
`flags` is a bitmask of [VkPipelineCreationFeedbackFlagBits](#VkPipelineCreationFeedbackFlagBits)
providing feedback about the creation of a pipeline or of a pipeline
stage.

* 
`duration` is the duration spent creating a pipeline or pipeline
stage in nanoseconds.

If the [VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) is not set in
`flags`, an implementation **must** not set any other bits in `flags`,
and the values of all other `VkPipelineCreationFeedback` data members
are **undefined**.

Possible values of the `flags` member of
[VkPipelineCreationFeedback](#VkPipelineCreationFeedback) are:

// Provided by VK_VERSION_1_3
typedef enum VkPipelineCreationFeedbackFlagBits {
    VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT = 0x00000001,
    VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT = 0x00000002,
    VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT = 0x00000004,
  // Provided by VK_EXT_pipeline_creation_feedback
    VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT_EXT = VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT,
  // Provided by VK_EXT_pipeline_creation_feedback
    VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT_EXT = VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT,
  // Provided by VK_EXT_pipeline_creation_feedback
    VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT_EXT = VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT,
} VkPipelineCreationFeedbackFlagBits;

// Provided by VK_EXT_pipeline_creation_feedback
// Equivalent to VkPipelineCreationFeedbackFlagBits
typedef VkPipelineCreationFeedbackFlagBits VkPipelineCreationFeedbackFlagBitsEXT;

* 
[VK_PIPELINE_CREATION_FEEDBACK_VALID_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) specifies that the
feedback information is valid.

* 
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#VkPipelineCreationFeedbackFlagBitsEXT)
specifies that a readily usable pipeline or pipeline stage was found in
the `pipelineCache` specified by the application in the pipeline
creation command.

An implementation **should** set the
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) bit
if it was able to avoid the large majority of pipeline or pipeline stage
creation work by using the `pipelineCache` parameter of
[vkCreateGraphicsPipelines](#vkCreateGraphicsPipelines),
[vkCreateRayTracingPipelinesKHR](#vkCreateRayTracingPipelinesKHR),
[vkCreateRayTracingPipelinesNV](#vkCreateRayTracingPipelinesNV),
[vkCreateDataGraphPipelinesARM](VK_ARM_data_graph/graphs.html#vkCreateDataGraphPipelinesARM),
or [vkCreateComputePipelines](#vkCreateComputePipelines).
When an implementation sets this bit for the entire pipeline, it **may** leave
it unset for any stage.

|  | Implementations are encouraged to provide a meaningful signal to
| --- | --- |
applications using this bit.
The intention is to communicate to the application that the pipeline or
pipeline stage was created “as fast as it gets” using the pipeline cache
provided by the application.
If an implementation uses an internal cache, it is discouraged from setting
this bit as the feedback would be unactionable. |

* 
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#VkPipelineCreationFeedbackFlagBitsEXT)
specifies that the base pipeline specified by the
`basePipelineHandle` or `basePipelineIndex` member of the
`Vk*PipelineCreateInfo` structure was used to accelerate the
creation of the pipeline.

An implementation **should** set the
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](#VkPipelineCreationFeedbackFlagBitsEXT) bit if it
was able to avoid a significant amount of work by using the base pipeline.

|  | While “significant amount of work” is subjective, implementations are
| --- | --- |
encouraged to provide a meaningful signal to applications using this bit.
For example, a 1% reduction in duration may not warrant setting this bit,
while a 50% reduction would. |

// Provided by VK_VERSION_1_3
typedef VkFlags VkPipelineCreationFeedbackFlags;

// Provided by VK_EXT_pipeline_creation_feedback
// Equivalent to VkPipelineCreationFeedbackFlags
typedef VkPipelineCreationFeedbackFlags VkPipelineCreationFeedbackFlagsEXT;

`VkPipelineCreationFeedbackFlags` is a bitmask type for providing zero
or more [VkPipelineCreationFeedbackFlagBits](#VkPipelineCreationFeedbackFlagBits).
