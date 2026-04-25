# Shaders

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/shaders.html

## Table of Contents

- [Shader Objects](#shaders-objects)
- [Shader Object Creation](#shaders-objects-creation)
- [Shader_Object_Creation](#shaders-objects-creation)
- [Binary Shader Code](#shaders-objects-binary-code)
- [Binary_Shader_Code](#shaders-objects-binary-code)
- [Binary Shader Compatibility](#shaders-objects-binary-compatibility)
- [Binary_Shader_Compatibility](#shaders-objects-binary-compatibility)
- [Binding Shader Objects](#shaders-objects-binding)
- [Binding_Shader_Objects](#shaders-objects-binding)
- [Setting State](#shaders-objects-state)
- [Interaction With Pipelines](#shaders-objects-pipeline-interaction)
- [Interaction_With_Pipelines](#shaders-objects-pipeline-interaction)
- [Shader Object Destruction](#shaders-objects-destruction)
- [Shader_Object_Destruction](#shaders-objects-destruction)
- [Shader Modules](#shader-modules)
- [Shader Module Identifiers](#shaders-identifiers)
- [Shader_Module_Identifiers](#shaders-identifiers)
- [Binding Shaders](#shaders-binding)
- [Shader Execution](#shaders-execution)
- [Shader Termination](#shaders-termination)
- [Shader Out-of-Bounds Memory Access](#shaders-execution-memory-access-bounds)
- [Shader_Out-of-Bounds_Memory_Access](#shaders-execution-memory-access-bounds)
- [Robust Buffer Access](#shaders-robust-buffer-access)
- [Robust_Buffer_Access](#shaders-robust-buffer-access)
- [Robust Buffer Access 2](#shaders-robust-buffer-access2)
- [Robust_Buffer_Access_2](#shaders-robust-buffer-access2)
- [Image Sampling](#_image_sampling)
- [Robust Image Access](#shaders-robust-image-access)
- [Robust_Image_Access](#shaders-robust-image-access)
- [Robust Image Access 2](#shaders-robust-image-access2)
- [Robust_Image_Access_2](#shaders-robust-image-access2)
- [Shader Memory Access Ordering](#shaders-execution-memory-ordering)
- [Shader_Memory_Access_Ordering](#shaders-execution-memory-ordering)
- [Shader Inputs and Outputs](#shaders-inputs)
- [Shader_Inputs_and_Outputs](#shaders-inputs)
- [Task Shaders](#shaders-task)
- [Task Shader Execution](#_task_shader_execution)
- [Task_Shader_Execution](#_task_shader_execution)
- [Mesh Shaders](#shaders-mesh)
- [Mesh Shader Execution](#_mesh_shader_execution)
- [Mesh_Shader_Execution](#_mesh_shader_execution)
- [Cluster Culling Shaders](#shaders-cluster-culling)
- [Cluster_Culling_Shaders](#shaders-cluster-culling)
- [Cluster Culling Shader Execution](#_cluster_culling_shader_execution)
- [Cluster_Culling_Shader_Execution](#_cluster_culling_shader_execution)
- [Vertex Shaders](#shaders-vertex)
- [Vertex Shader Execution](#shaders-vertex-execution)
- [Vertex_Shader_Execution](#shaders-vertex-execution)
- [Tessellation Control Shaders](#shaders-tessellation-control)
- [Tessellation_Control_Shaders](#shaders-tessellation-control)
- [Tessellation Control Shader Execution](#shaders-tessellation-control-execution)
- [Tessellation_Control_Shader_Execution](#shaders-tessellation-control-execution)
- [Tessellation Evaluation Shaders](#shaders-tessellation-evaluation)
- [Tessellation_Evaluation_Shaders](#shaders-tessellation-evaluation)
- [Tessellation Evaluation Shader Execution](#shaders-tessellation-evaluation-execution)
- [Tessellation_Evaluation_Shader_Execution](#shaders-tessellation-evaluation-execution)
- [Geometry Shaders](#shaders-geometry)
- [Geometry Shader Execution](#shaders-geometry-execution)
- [Geometry_Shader_Execution](#shaders-geometry-execution)
- [Fragment Shaders](#shaders-fragment)
- [Compute Shaders](#shaders-compute)
- [Ray Generation Shaders](#shaders-ray-generation)
- [Ray_Generation_Shaders](#shaders-ray-generation)
- [Ray Generation Shader Execution](#shaders-ray-generation-execution)
- [Ray_Generation_Shader_Execution](#shaders-ray-generation-execution)
- [Intersection Shaders](#shaders-intersection)
- [Intersection Shader Execution](#shaders-intersection-execution)
- [Intersection_Shader_Execution](#shaders-intersection-execution)
- [Any-Hit Shaders](#shaders-any-hit)
- [Any-Hit Shader Execution](#shaders-any-hit-execution)
- [Any-Hit_Shader_Execution](#shaders-any-hit-execution)
- [Closest Hit Shaders](#shaders-closest-hit)
- [Closest_Hit_Shaders](#shaders-closest-hit)
- [Closest Hit Shader Execution](#shaders-closest-hit-execution)
- [Closest_Hit_Shader_Execution](#shaders-closest-hit-execution)
- [Miss Shaders](#shaders-miss)
- [Miss Shader Execution](#shaders-miss-execution)
- [Miss_Shader_Execution](#shaders-miss-execution)
- [Callable Shaders](#shaders-callable)
- [Callable Shader Execution](#shaders-callable-execution)
- [Callable_Shader_Execution](#shaders-callable-execution)
- [Interpolation Decorations](#shaders-interpolation-decorations)
- [Push Constant Decorations](#shaders-pushconstant-decorations)
- [Push_Constant_Decorations](#shaders-pushconstant-decorations)
- [Static Use](#shaders-staticuse)
- [Scope](#shaders-scope)
- [Cross Device](#shaders-scope-cross-device)
- [Device](#shaders-scope-device)
- [Queue Family](#shaders-scope-queue-family)
- [Command](#shaders-scope-command)
- [Primitive](#shaders-scope-primitive)
- [Shader Call](#shaders-scope-shadercall)
- [Workgroup](#shaders-scope-workgroup)
- [Subgroup](#shaders-scope-subgroup)
- [Quad](#shaders-scope-quad)
- [Fragment Interlock](#shaders-scope-fragment-interlock)
- [Invocation](#shaders-scope-invocation)
- [Group Operations](#shaders-group-operations)
- [Basic Group Operations](#shaders-group-operations-basic)
- [Basic_Group_Operations](#shaders-group-operations-basic)
- [Vote Group Operations](#shaders-group-operations-vote)
- [Vote_Group_Operations](#shaders-group-operations-vote)
- [Arithmetic Group Operations](#shaders-group-operations-arithmetic)
- [Arithmetic_Group_Operations](#shaders-group-operations-arithmetic)
- [Ballot Group Operations](#shaders-group-operations-ballot)
- [Ballot_Group_Operations](#shaders-group-operations-ballot)
- [Shuffle Group Operations](#shaders-group-operations-shuffle)
- [Shuffle_Group_Operations](#shaders-group-operations-shuffle)
- [Shuffle Relative Group Operations](#shaders-group-operations-shuffle-relative)
- [Shuffle_Relative_Group_Operations](#shaders-group-operations-shuffle-relative)
- [Clustered Group Operations](#shaders-group-operations-clustered)
- [Clustered_Group_Operations](#shaders-group-operations-clustered)
- [Rotate Group Operations](#shaders-group-operations-rotate)
- [Rotate_Group_Operations](#shaders-group-operations-rotate)
- [Quad Group Operations](#shaders-quad-operations)
- [Quad_Group_Operations](#shaders-quad-operations)
- [Derivative Operations](#shaders-derivative-operations)
- [Helper Invocations](#shaders-helper-invocations)
- [Cooperative Matrices](#cooperative-matrices)
- [Cooperative Vectors](#_cooperative_vectors)
- [Validation Cache](#shaders-validation-cache)
- [CUDA Modules](#cuda-modules)
- [Creating a CUDA Module](#cuda-modules-creation)
- [Creating_a_CUDA_Module](#cuda-modules-creation)
- [Creating a CUDA Function Handle](#cuda-function-creation)
- [Creating_a_CUDA_Function_Handle](#cuda-function-creation)
- [Destroying a CUDA Function](#cuda-function-destruction)
- [Destroying_a_CUDA_Function](#cuda-function-destruction)
- [Destroying a CUDA Module](#cuda-modules-destruction)
- [Destroying_a_CUDA_Module](#cuda-modules-destruction)
- [Reading back CUDA Module Cache](#cuda-modules-getcache)
- [Reading_back_CUDA_Module_Cache](#cuda-modules-getcache)
- [Limitations](#cuda-modules-limitations)
- [Shader Instrumentation](#shaders-instrumentation)
- [Shader Instrumentation Metrics](#shaders-instrumentation-metric-enumeration)
- [Shader_Instrumentation_Metrics](#shaders-instrumentation-metric-enumeration)
- [Shader Instrumentation Objects](#shaders-instrumentation-objects)
- [Shader_Instrumentation_Objects](#shaders-instrumentation-objects)
- [Shader Instrumentation Capture](#_shader_instrumentation_capture)
- [Shader_Instrumentation_Capture](#_shader_instrumentation_capture)
- [Shader Instrumentation Retrieval](#_shader_instrumentation_retrieval)
- [Shader_Instrumentation_Retrieval](#_shader_instrumentation_retrieval)
- [Shader Instrumentation Clearing](#_shader_instrumentation_clearing)
- [Shader_Instrumentation_Clearing](#_shader_instrumentation_clearing)

## Content

A shader specifies programmable operations that execute for each
vertex, control point, tessellated vertex, primitive, fragment, or
workgroup in the corresponding stage(s) of the
graphics and
compute pipelines.

Graphics pipelines include vertex shader execution as a result of
[primitive assembly](drawing.html#drawing), followed, if enabled, by tessellation
control and evaluation shaders operating on [patches](drawing.html#drawing-patch-lists),
geometry shaders, if enabled, operating on primitives, and fragment shaders,
if present, operating on fragments generated by [Rasterization](primsrast.html#primsrast).
In this specification, vertex, tessellation control, tessellation evaluation
and geometry shaders are collectively referred to as
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization)s and occur in the logical pipeline before rasterization.
The fragment shader occurs logically after rasterization.

Only the compute shader stage is included in a compute pipeline.
Compute shaders operate on compute invocations in a workgroup.

Shaders **can** read from input variables, and read from and write to output
variables.
Input and output variables **can** be used to transfer data between shader
stages, or to allow the shader to interact with values that exist in the
execution environment.
Similarly, the execution environment provides constants describing
capabilities.

Shader variables are associated with execution environment-provided inputs
and outputs using *built-in* decorations in the shader.
The available decorations for each stage are documented in the following
subsections.

Shaders **may** be compiled and linked into pipeline objects as described in
[Pipelines](pipelines.html#pipelines) chapter, or if the [`shaderObject`](features.html#features-shaderObject) feature is enabled they **may** be compiled into
individual per-stage *shader objects* which **can** be bound on a command
buffer independently from one another.
Unlike pipelines, shader objects are not intrinsically tied to any specific
set of state.
Instead, state is specified dynamically in the command buffer.

Each shader object represents a single compiled shader stage, which **may**
**optionally** be linked with one or more other stages.

Shader objects are represented by `VkShaderEXT` handles:

// Provided by VK_EXT_shader_object
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkShaderEXT)

Shader objects **may** be created from shader code provided as SPIR-V, or in an
opaque, implementation-defined binary format specific to the physical
device.

To create one or more shader objects, call:

// Provided by VK_EXT_shader_object
VkResult vkCreateShadersEXT(
    VkDevice                                    device,
    uint32_t                                    createInfoCount,
    const VkShaderCreateInfoEXT*                pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkShaderEXT*                                pShaders);

* 
`device` is the logical device that creates the shader objects.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pShaders` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkShaderCreateInfoEXT](#VkShaderCreateInfoEXT) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pShaders` is a pointer to an array of [VkShaderEXT](#VkShaderEXT) handles in
which the resulting shader objects are returned.

When this function returns, whether or not it succeeds, it is guaranteed
that every element of `pShaders` will have been overwritten by either
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a valid `VkShaderEXT` handle.

This means that whenever shader creation fails, the application **can**
determine which shader the returned error pertains to by locating the first
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) element in `pShaders`.
It also means that an application **can** reliably clean up from a failed call
by iterating over the `pShaders` array and destroying every element that
is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).

Valid Usage

* 
[](#VUID-vkCreateShadersEXT-stage-09670) VUID-vkCreateShadersEXT-stage-09670

If the `stage` member of any element of `pCreateInfos` is
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits), `device` **must** support at least
one queue family with the [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateShadersEXT-stage-09671) VUID-vkCreateShadersEXT-stage-09671

If the `stage` member of any element of `pCreateInfos` is
[VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits), `device` **must** support at least
one queue family with the [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capability

* 
[](#VUID-vkCreateShadersEXT-None-08400) VUID-vkCreateShadersEXT-None-08400

The [`shaderObject`](features.html#features-shaderObject) feature **must** be
enabled

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08402) VUID-vkCreateShadersEXT-pCreateInfos-08402

If the `flags` member of any element of `pCreateInfos` includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), the `flags` member of all
other elements of `pCreateInfos` whose `stage` is
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) **must** also include
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08403) VUID-vkCreateShadersEXT-pCreateInfos-08403

If the `flags` member of any element of `pCreateInfos` includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), the `flags` member of all
other elements of `pCreateInfos` whose `stage` is
[VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits) or [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits)
**must** also include [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08404) VUID-vkCreateShadersEXT-pCreateInfos-08404

If the `flags` member of any element of `pCreateInfos` whose
`stage` is [VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits) includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), there **must** be no member of
`pCreateInfos` whose `flags` member includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT) and whose `stage` is any
of [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08405) VUID-vkCreateShadersEXT-pCreateInfos-08405

If there is any element of `pCreateInfos` whose `stage` is
[VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits) and whose `flags` member includes
both [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT) and
[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](#VkShaderCreateFlagBitsEXT), there **must** be no element
of `pCreateInfos` whose `stage` is
[VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits) and whose `flags` member includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08409) VUID-vkCreateShadersEXT-pCreateInfos-08409

For each element of `pCreateInfos` whose `flags` member includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), if there is any other element
of `pCreateInfos` whose `stage` is logically later than the
`stage` of the former and whose `flags` member also includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), the `nextStage` of the
former **must** be equal to the `stage` of the element with the
logically earliest `stage` following the `stage` of the former
whose `flags` member also includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08410) VUID-vkCreateShadersEXT-pCreateInfos-08410

The `stage` member of each element of `pCreateInfos` whose
`flags` member includes [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT)
**must** be unique

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08411) VUID-vkCreateShadersEXT-pCreateInfos-08411

The `codeType` member of all elements of `pCreateInfos` whose
`flags` member includes [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT)
**must** be the same

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-12224) VUID-vkCreateShadersEXT-pCreateInfos-12224

If `pCreateInfos` contains elements with both
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits), both elements'
`flags` include [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), both
elements' `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), at
least one **must** contain an `OpExecutionMode` instruction specifying
the orientation of triangles generated by the tessellator

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-12225) VUID-vkCreateShadersEXT-pCreateInfos-12225

If `pCreateInfos` contains elements with both
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits), both elements'
`flags` include [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), both
elements' `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), at
least one **must** contain an `OpExecutionMode` instruction specifying
the spacing of segments on the edges of tessellated primitives

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08867) VUID-vkCreateShadersEXT-pCreateInfos-08867

If `pCreateInfos` contains elements with both
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits), both elements'
`flags` include [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), both
elements' `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
both stages contains an `OpExecutionMode` instruction specifying the
type of subdivision, they **must** be the same

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08868) VUID-vkCreateShadersEXT-pCreateInfos-08868

If `pCreateInfos` contains elements with both
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits), both elements'
`flags` include [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), both
elements' `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
both stages contains an `OpExecutionMode` instruction specifying the
orientation of triangles, they **must** be the same

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08870) VUID-vkCreateShadersEXT-pCreateInfos-08870

If `pCreateInfos` contains elements with both
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits), both elements'
`flags` include [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), both
elements' `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
both stages contains an `OpExecutionMode` instruction specifying the
spacing of segments on the edges of tessellated primitives, they **must**
be the same

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-08871) VUID-vkCreateShadersEXT-pCreateInfos-08871

If `pCreateInfos` contains elements with both
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits), both elements'
`flags` include [VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT), both
elements' `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
both stages contains an `OpExecutionMode` instruction specifying the
output patch size, they **must** be the same

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-09632) VUID-vkCreateShadersEXT-pCreateInfos-09632

If `pCreateInfos` contains a [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits) with
`codeType` of [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT) and
[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](#VkShaderCreateFlagBitsEXT) is not set, then the mesh
shader’s entry point **must** not declare a variable with a `DrawIndex`
`BuiltIn` decoration

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-11413) VUID-vkCreateShadersEXT-pCreateInfos-11413

If any element of `pCreateInfos` sets
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)))
[VkSampler](samplers.html#VkSampler) objects currently created on the device

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-11428) VUID-vkCreateShadersEXT-pCreateInfos-11428

If any element of `pCreateInfos` sets
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT) and includes embedded
sampler mappings, this command **must** not cause the total number of
unique embedded samplers in pipelines and shaders on this device to
exceed [    `maxDescriptorHeapEmbeddedSamplers`](limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

* 
[](#VUID-vkCreateShadersEXT-flags-11472) VUID-vkCreateShadersEXT-flags-11472

If the `flags` member of any element of `pCreateInfos` includes
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT) and
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT), the `flags` member
of all other elements of `pCreateInfos` whose `stage` is
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits),
or [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) **must** also include
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateShadersEXT-device-parameter) VUID-vkCreateShadersEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateShadersEXT-pCreateInfos-parameter) VUID-vkCreateShadersEXT-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkShaderCreateInfoEXT](#VkShaderCreateInfoEXT) structures

* 
[](#VUID-vkCreateShadersEXT-pAllocator-parameter) VUID-vkCreateShadersEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateShadersEXT-pShaders-parameter) VUID-vkCreateShadersEXT-pShaders-parameter

 `pShaders` **must** be a valid pointer to an array of `createInfoCount` [VkShaderEXT](#VkShaderEXT) handles

* 
[](#VUID-vkCreateShadersEXT-createInfoCount-arraylength) VUID-vkCreateShadersEXT-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPATIBLE_SHADER_BINARY_EXT](fundamentals.html#VkResult)

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

The `VkShaderCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_shader_object
typedef struct VkShaderCreateInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    VkShaderCreateFlagsEXT          flags;
    VkShaderStageFlagBits           stage;
    VkShaderStageFlags              nextStage;
    VkShaderCodeTypeEXT             codeType;
    size_t                          codeSize;
    const void*                     pCode;
    const char*                     pName;
    uint32_t                        setLayoutCount;
    const VkDescriptorSetLayout*    pSetLayouts;
    uint32_t                        pushConstantRangeCount;
    const VkPushConstantRange*      pPushConstantRanges;
    const VkSpecializationInfo*     pSpecializationInfo;
} VkShaderCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkShaderCreateFlagBitsEXT](#VkShaderCreateFlagBitsEXT) describing
additional parameters of the shader.

* 
`stage` is a [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) value specifying a single
shader stage.

* 
`nextStage` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
which stages **can** be used as a logically next bound stage when drawing
with the shader bound.
A value of zero indicates this shader stage **must** be the last one.

* 
`codeType` is a [VkShaderCodeTypeEXT](#VkShaderCodeTypeEXT) value specifying the type
of the shader code pointed to be `pCode`.

* 
`codeSize` is the size in bytes of the shader code pointed to be
`pCode`.

* 
`pCode` is a pointer to the shader code to use to create the shader.

* 
`pName` is a pointer to a null-terminated UTF-8 string specifying
the entry point name of the shader for this stage.

* 
`setLayoutCount` is the number of descriptor set layouts pointed to
by `pSetLayouts`.

* 
`pSetLayouts` is a pointer to an array of
[VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) objects used by the shader stage.
The implementation **must** not access these objects outside of the
duration of the command this structure is passed to.

* 
`pushConstantRangeCount` is the number of push constant ranges
pointed to by `pPushConstantRanges`.

* 
`pPushConstantRanges` is a pointer to an array of
[VkPushConstantRange](descriptorsets.html#VkPushConstantRange) structures used by the shader stage.

* 
`pSpecializationInfo` is a pointer to a [VkSpecializationInfo](pipelines.html#VkSpecializationInfo)
structure, as described in
[Specialization Constants](pipelines.html#pipelines-specialization-constants), or
`NULL`.

When specifying descriptor heap mappings, only mappings corresponding to
bindings that are actually present in the SPIR-V shader affect compilation.
Mappings are ignored when `codeType` is
[VK_SHADER_CODE_TYPE_BINARY_EXT](#VkShaderCodeTypeEXT).
The resulting compiled binary from two different SPIR-V shaders which would
have identical bit patterns **must** remain identical even if the mapping
entries vary in any of the following ways:

* 
Different numbers of unused mapping structures

* 
Different binding counts for unused bindings

* 
Unused parameters in mapping structures (e.g. sampler offsets)

* 
Ignored parameters in mapping structures

* 
Different order of mapping structures, used or unused

|  | Calculating the same offset in a mapping via different parameter
| --- | --- |
values is not guaranteed to provide identical results. |

Valid Usage

* 
[](#VUID-VkShaderCreateInfoEXT-codeSize-08735) VUID-VkShaderCreateInfoEXT-codeSize-08735

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `codeSize` **must** be a multiple of 4

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08736) VUID-VkShaderCreateInfoEXT-pCode-08736

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `pCode` **must** point to valid SPIR-V code,
formatted and packed as described by the [Khronos SPIR-V     Specification](introduction.html#spirv-spec)

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08737) VUID-VkShaderCreateInfoEXT-pCode-08737

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `pCode` **must** adhere to the validation rules
described by the [Validation Rules within a     Module](../appendices/spirvenv.html#spirvenv-module-validation) section of the [SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities)
appendix

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08738) VUID-VkShaderCreateInfoEXT-pCode-08738

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `pCode` **must** declare the `Shader` capability
for SPIR-V code

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08739) VUID-VkShaderCreateInfoEXT-pCode-08739

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `pCode` **must** not declare any capability that is
not supported by the API, as described by the
[Capabilities](../appendices/spirvenv.html#spirvenv-module-validation) section of the
[SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities) appendix

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08740) VUID-VkShaderCreateInfoEXT-pCode-08740

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and `pCode` declares any of the capabilities
listed in the [SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities-table)
appendix, one of the corresponding requirements **must** be satisfied

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08741) VUID-VkShaderCreateInfoEXT-pCode-08741

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `pCode` **must** not declare any SPIR-V extension
that is not supported by the API, as described by the
[Extension](../appendices/spirvenv.html#spirvenv-extensions) section of the
[SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities) appendix

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08742) VUID-VkShaderCreateInfoEXT-pCode-08742

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and `pCode` declares any of the SPIR-V extensions
listed in the [SPIR-V Environment](../appendices/spirvenv.html#spirvenv-extensions-table)
appendix, one of the corresponding requirements **must** be satisfied

* 
[](#VUID-VkShaderCreateInfoEXT-descriptorHeap-11314) VUID-VkShaderCreateInfoEXT-descriptorHeap-11314

If the [`descriptorHeap`](features.html#features-descriptorHeap) feature is not
enabled,
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::`mappingCount`
**must** be 0

* 
[](#VUID-VkShaderCreateInfoEXT-pNext-11315) VUID-VkShaderCreateInfoEXT-pNext-11315

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the mapped
resource in the shader **must** be a variable with a structure type
decorated with `Block` in the `Uniform` `Storage` `Class`

* 
[](#VUID-VkShaderCreateInfoEXT-pNext-11316) VUID-VkShaderCreateInfoEXT-pNext-11316

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the mapped structure
**must** not be larger than the sum of `pushDataOffset` used in the
mapping and [`maxPushDataSize`](limits.html#limits-maxPushDataSize)

* 
[](#VUID-VkShaderCreateInfoEXT-pNext-11317) VUID-VkShaderCreateInfoEXT-pNext-11317

If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the sum of
mapped structure size and `shaderRecordDataOffset` used in the
mapping **must** not be larger than
[`maxShaderGroupStride`](limits.html#limits-maxShaderGroupStride)

* 
[](#VUID-VkShaderCreateInfoEXT-pNext-11318) VUID-VkShaderCreateInfoEXT-pNext-11318

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

[](#VUID-VkShaderCreateInfoEXT-pNext-11378) VUID-VkShaderCreateInfoEXT-pNext-11378

    If the `pNext` chain specifies a [    descriptor mapping](descriptorheaps.html#descriptorheaps-bindings) using
    [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    [VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT),
    or [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT), the
    `OpArrayLength`
or `OpUntypedArrayLengthKHR`
    instruction **must** not be used on that resource

[](#VUID-VkShaderCreateInfoEXT-pNext-11399) VUID-VkShaderCreateInfoEXT-pNext-11399

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
[](#VUID-VkShaderCreateInfoEXT-flags-08412) VUID-VkShaderCreateInfoEXT-flags-08412

If `stage` is not [VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits), `flags` **must** not include
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08486) VUID-VkShaderCreateInfoEXT-flags-08486

If `stage` is not [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits), `flags`
**must** not include
[VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08487) VUID-VkShaderCreateInfoEXT-flags-08487

If the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not enabled,
`flags` **must** not include
[VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08488) VUID-VkShaderCreateInfoEXT-flags-08488

If `stage` is not [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits), `flags`
**must** not include
[VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08489) VUID-VkShaderCreateInfoEXT-flags-08489

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `flags` **must** not include
[VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-09404) VUID-VkShaderCreateInfoEXT-flags-09404

If `flags` includes
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](#VkShaderCreateFlagBitsEXT), the
[`subgroupSizeControl`](features.html#features-subgroupSizeControl) feature
**must** be enabled

* 
[](#VUID-VkShaderCreateInfoEXT-flags-09405) VUID-VkShaderCreateInfoEXT-flags-09405

If `flags` includes
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#VkShaderCreateFlagBitsEXT), the
[`computeFullSubgroups`](features.html#features-computeFullSubgroups) feature
**must** be enabled

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11005) VUID-VkShaderCreateInfoEXT-flags-11005

If `flags` includes
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](#VkShaderCreateFlagBitsEXT), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`::`deviceGeneratedCommands`](features.html#features-deviceGeneratedCommands)
feature **must** be enabled

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11006) VUID-VkShaderCreateInfoEXT-flags-11006

If `flags` includes
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](#VkShaderCreateFlagBitsEXT), then the identified
entry point **must** not specify `Xfb` execution mode

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08992) VUID-VkShaderCreateInfoEXT-flags-08992

If `flags` includes
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#VkShaderCreateFlagBitsEXT), `stage` **must**
be
one of [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08485) VUID-VkShaderCreateInfoEXT-flags-08485

If `stage` is not [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits), `flags`
**must** not include [VK_SHADER_CREATE_DISPATCH_BASE_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08414) VUID-VkShaderCreateInfoEXT-flags-08414

If `stage` is not [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits), `flags`
**must** not include [VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08416) VUID-VkShaderCreateInfoEXT-flags-08416

If `flags` includes both
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](#VkShaderCreateFlagBitsEXT) and
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#VkShaderCreateFlagBitsEXT), the local
workgroup size in the X dimension of the shader **must** be a multiple of
[`maxSubgroupSize`](devsandqueues.html#limits-maxSubgroupSize)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-08417) VUID-VkShaderCreateInfoEXT-flags-08417

If `flags` includes
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#VkShaderCreateFlagBitsEXT) but not
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](#VkShaderCreateFlagBitsEXT) and no
[VkShaderRequiredSubgroupSizeCreateInfoEXT](pipelines.html#VkShaderRequiredSubgroupSizeCreateInfoEXT) structure is included in
the `pNext` chain, the local workgroup size in the X dimension of
the shader **must** be a multiple of
[`subgroupSize`](devsandqueues.html#limits-subgroupSize)

* 
[](#VUID-VkShaderCreateInfoEXT-stage-08418) VUID-VkShaderCreateInfoEXT-stage-08418

`stage` **must** not be [VK_SHADER_STAGE_ALL_GRAPHICS](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_ALL](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-stage-08419) VUID-VkShaderCreateInfoEXT-stage-08419

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `stage` **must** not be
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-stage-08420) VUID-VkShaderCreateInfoEXT-stage-08420

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `stage` **must** not be [VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-stage-08421) VUID-VkShaderCreateInfoEXT-stage-08421

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`stage` **must** not be [VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-stage-08422) VUID-VkShaderCreateInfoEXT-stage-08422

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`stage` **must** not be [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-stage-08425) VUID-VkShaderCreateInfoEXT-stage-08425

`stage` **must** not be
[VK_SHADER_STAGE_SUBPASS_SHADING_BIT_HUAWEI](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-stage-08426) VUID-VkShaderCreateInfoEXT-stage-08426

`stage` **must** not be
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08427) VUID-VkShaderCreateInfoEXT-nextStage-08427

If `stage` is [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), `nextStage`
**must** not include any bits other than
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), and
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08428) VUID-VkShaderCreateInfoEXT-nextStage-08428

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `nextStage` **must** not include
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08429) VUID-VkShaderCreateInfoEXT-nextStage-08429

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `nextStage` **must** not include
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08430) VUID-VkShaderCreateInfoEXT-nextStage-08430

If `stage` is [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
`nextStage` **must** not include any bits other than
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08431) VUID-VkShaderCreateInfoEXT-nextStage-08431

If `stage` is [VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
`nextStage` **must** not include any bits other than
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08433) VUID-VkShaderCreateInfoEXT-nextStage-08433

If `stage` is [VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), `nextStage`
**must** not include any bits other than [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08434) VUID-VkShaderCreateInfoEXT-nextStage-08434

If `stage` is [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits), `nextStage` **must** be 0

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08435) VUID-VkShaderCreateInfoEXT-nextStage-08435

If `stage` is [VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits), `nextStage`
**must** not include any bits other than [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-08436) VUID-VkShaderCreateInfoEXT-nextStage-08436

If `stage` is [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits), `nextStage`
**must** not include any bits other than [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkShaderCreateInfoEXT-pName-08440) VUID-VkShaderCreateInfoEXT-pName-08440

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `pName`
**must** be the name of an `OpEntryPoint` in `pCode` with an
execution model that matches `stage`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08492) VUID-VkShaderCreateInfoEXT-pCode-08492

If `codeType` is [VK_SHADER_CODE_TYPE_BINARY_EXT](#VkShaderCodeTypeEXT), `pCode`
**must** be aligned to `16` bytes

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08493) VUID-VkShaderCreateInfoEXT-pCode-08493

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), `pCode`
**must** be aligned to `4` bytes

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08448) VUID-VkShaderCreateInfoEXT-pCode-08448

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and the
identified entry point includes any variable in its interface that is
declared with the `ClipDistance` `BuiltIn` decoration, that
variable **must** not have an array size greater than
`VkPhysicalDeviceLimits`::`maxClipDistances`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08449) VUID-VkShaderCreateInfoEXT-pCode-08449

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and the
identified entry point includes any variable in its interface that is
declared with the `CullDistance` `BuiltIn` decoration, that
variable **must** not have an array size greater than
`VkPhysicalDeviceLimits`::`maxCullDistances`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08450) VUID-VkShaderCreateInfoEXT-pCode-08450

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and the
identified entry point includes variables in its interface that are
declared with the `ClipDistance` `BuiltIn` decoration and
variables in its interface that are declared with the `CullDistance`
`BuiltIn` decoration, those variables **must** not have array sizes
which sum to more than
`VkPhysicalDeviceLimits`::`maxCombinedClipAndCullDistances`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08451) VUID-VkShaderCreateInfoEXT-pCode-08451

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and the
identified entry point includes any variable in its interface that is
declared with the `SampleMask` `BuiltIn` decoration, that variable
**must** not have an array size greater than
`VkPhysicalDeviceLimits`::`maxSampleMaskWords`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08453) VUID-VkShaderCreateInfoEXT-pCode-08453

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits), and the identified
entry point has an `OpExecutionMode` instruction specifying a patch
size with `OutputVertices`, the patch size **must** be greater than `0`
and less than or equal to
`VkPhysicalDeviceLimits`::`maxTessellationPatchSize`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08454) VUID-VkShaderCreateInfoEXT-pCode-08454

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is [VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), the identified entry
point **must** have an `OpExecutionMode` instruction specifying a
maximum output vertex count that is greater than `0` and less than or
equal to `VkPhysicalDeviceLimits`::`maxGeometryOutputVertices`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08455) VUID-VkShaderCreateInfoEXT-pCode-08455

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is [VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), the identified entry
point **must** have an `OpExecutionMode` instruction specifying an
invocation count that is greater than `0` and less than or equal to
`VkPhysicalDeviceLimits`::`maxGeometryShaderInvocations`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08456) VUID-VkShaderCreateInfoEXT-pCode-08456

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is a
[pre-rasterization shader    stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization), and the identified entry point writes to `Layer` for any
primitive, it **must** write the same value to `Layer` for all vertices
of a given primitive

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08457) VUID-VkShaderCreateInfoEXT-pCode-08457

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is a
[pre-rasterization shader    stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization), and the identified entry point writes to `ViewportIndex` for
any primitive, it **must** write the same value to `ViewportIndex` for
all vertices of a given primitive

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08459) VUID-VkShaderCreateInfoEXT-pCode-08459

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits), and the identified
entry point writes to `FragDepth` in any execution path, all
execution paths that are not exclusive to helper invocations **must**
either discard the fragment, or write or initialize the value of
`FragDepth`

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-08460) VUID-VkShaderCreateInfoEXT-pCode-08460

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), the shader
code in `pCode` **must** be valid as described by the
[Khronos SPIR-V Specification](introduction.html#spirv-spec) after applying the
specializations provided in `pSpecializationInfo`, if any, and then
converting all specialization constants into fixed constants

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-08872) VUID-VkShaderCreateInfoEXT-codeType-08872

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is [VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
`pCode` **must** contain an `OpExecutionMode` instruction specifying
the type of subdivision

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-12226) VUID-VkShaderCreateInfoEXT-codeType-12226

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), and
`stage` is [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
`pCode` **must** contain an `OpExecutionMode` instruction specifying
the output patch size

* 
[](#VUID-VkShaderCreateInfoEXT-pPushConstantRanges-10063) VUID-VkShaderCreateInfoEXT-pPushConstantRanges-10063

Any two elements of `pPushConstantRanges` **must** not include the same
stage in `stageFlags`

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-10064) VUID-VkShaderCreateInfoEXT-codeType-10064

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT),
`flags` does not include
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT)
and if a push constant block is declared in a shader, then an element of
`pPushConstantRanges->stageFlags` **must** match `stage`

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-10065) VUID-VkShaderCreateInfoEXT-codeType-10065

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT),
`flags` does not include
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT)
and if a push constant block is declared in a shader, the block must be
contained inside the element of `pPushConstantRanges` that matches
the stage

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-10383) VUID-VkShaderCreateInfoEXT-codeType-10383

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT),
`flags` does not include
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT)
and a [resource variable](interfaces.html#interfaces-resources) is declared in a
shader, the corresponding descriptor set in `pSetLayouts` **must**
match the shader stage

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-10384) VUID-VkShaderCreateInfoEXT-codeType-10384

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT),
`flags` does not include
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT)
and a [resource variable](interfaces.html#interfaces-resources) is declared in a
shader,
and the descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptors.html#VkDescriptorType),
the corresponding descriptor set in `pSetLayouts` **must** match the
descriptor type

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-10385) VUID-VkShaderCreateInfoEXT-codeType-10385

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT),
`flags` does not include
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT)
and a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
as an array, the corresponding descriptor set in `pSetLayouts` **must**
match the descriptor count

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-10386) VUID-VkShaderCreateInfoEXT-codeType-10386

If `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT),
`flags` does not include
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT)
and a [resource variable](interfaces.html#interfaces-resources) is declared in a shader
as an array of descriptors, then the descriptor type of that variable
**must** not be [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType)

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11758) VUID-VkShaderCreateInfoEXT-flags-11758

If [shader64BitIndexing](features.html#features-shader64BitIndexing) feature is not
enabled, `flags` **must** not contain
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](#VkShaderCreateFlagBitsEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-setLayoutCount-12257) VUID-VkShaderCreateInfoEXT-setLayoutCount-12257

`setLayoutCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxBoundDescriptorSets`

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11290) VUID-VkShaderCreateInfoEXT-flags-11290

If `flags` includes [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT),
`setLayoutCount` **must** be 0

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11291) VUID-VkShaderCreateInfoEXT-flags-11291

If `flags` includes [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT),
`pSetLayouts` **must** be `NULL`

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11370) VUID-VkShaderCreateInfoEXT-flags-11370

If `flags` includes [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT),
`pushConstantRangeCount` **must** be 0

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11371) VUID-VkShaderCreateInfoEXT-flags-11371

If `flags` includes [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT),
`pPushConstantRanges` **must** be `NULL`

* 
[](#VUID-VkShaderCreateInfoEXT-flags-11292) VUID-VkShaderCreateInfoEXT-flags-11292

If `flags` includes [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT),
and `codeType` is [VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT), all shader
variables in the [shader resource interface](interfaces.html#interfaces-resources) with
a `DescriptorSet` and `Binding` decoration **must** have a mapping
declared in
[VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT)::pMappings

Valid Usage (Implicit)

* 
[](#VUID-VkShaderCreateInfoEXT-sType-sType) VUID-VkShaderCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkShaderCreateInfoEXT-pNext-pNext) VUID-VkShaderCreateInfoEXT-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkCustomResolveCreateInfoEXT](pipelines.html#VkCustomResolveCreateInfoEXT), [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](pipelines.html#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo), [VkShaderDescriptorSetAndBindingMappingInfoEXT](descriptorheaps.html#VkShaderDescriptorSetAndBindingMappingInfoEXT), or [VkValidationFeaturesEXT](initialization.html#VkValidationFeaturesEXT)

* 
[](#VUID-VkShaderCreateInfoEXT-sType-unique) VUID-VkShaderCreateInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkShaderCreateInfoEXT-flags-parameter) VUID-VkShaderCreateInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkShaderCreateFlagBitsEXT](#VkShaderCreateFlagBitsEXT) values

* 
[](#VUID-VkShaderCreateInfoEXT-stage-parameter) VUID-VkShaderCreateInfoEXT-stage-parameter

 `stage` **must** be a valid [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) value

* 
[](#VUID-VkShaderCreateInfoEXT-nextStage-parameter) VUID-VkShaderCreateInfoEXT-nextStage-parameter

 `nextStage` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkShaderCreateInfoEXT-codeType-parameter) VUID-VkShaderCreateInfoEXT-codeType-parameter

 `codeType` **must** be a valid [VkShaderCodeTypeEXT](#VkShaderCodeTypeEXT) value

* 
[](#VUID-VkShaderCreateInfoEXT-pCode-parameter) VUID-VkShaderCreateInfoEXT-pCode-parameter

 `pCode` **must** be a valid pointer to an array of `codeSize` bytes

* 
[](#VUID-VkShaderCreateInfoEXT-pName-parameter) VUID-VkShaderCreateInfoEXT-pName-parameter

 If `pName` is not `NULL`, `pName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkShaderCreateInfoEXT-pSetLayouts-parameter) VUID-VkShaderCreateInfoEXT-pSetLayouts-parameter

 If `setLayoutCount` is not `0`, and `pSetLayouts` is not `NULL`, `pSetLayouts` **must** be a valid pointer to an array of `setLayoutCount` valid [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) handles

* 
[](#VUID-VkShaderCreateInfoEXT-pPushConstantRanges-parameter) VUID-VkShaderCreateInfoEXT-pPushConstantRanges-parameter

 If `pushConstantRangeCount` is not `0`, and `pPushConstantRanges` is not `NULL`, `pPushConstantRanges` **must** be a valid pointer to an array of `pushConstantRangeCount` valid [VkPushConstantRange](descriptorsets.html#VkPushConstantRange) structures

* 
[](#VUID-VkShaderCreateInfoEXT-pSpecializationInfo-parameter) VUID-VkShaderCreateInfoEXT-pSpecializationInfo-parameter

 If `pSpecializationInfo` is not `NULL`, `pSpecializationInfo` **must** be a valid pointer to a valid [VkSpecializationInfo](pipelines.html#VkSpecializationInfo) structure

* 
[](#VUID-VkShaderCreateInfoEXT-codeSize-arraylength) VUID-VkShaderCreateInfoEXT-codeSize-arraylength

 `codeSize` **must** be greater than `0`

// Provided by VK_EXT_shader_object
typedef VkFlags VkShaderCreateFlagsEXT;

`VkShaderCreateFlagsEXT` is a bitmask type for setting a mask of zero or
more [VkShaderCreateFlagBitsEXT](#VkShaderCreateFlagBitsEXT).

Possible values of the `flags` member of [VkShaderCreateInfoEXT](#VkShaderCreateInfoEXT)
specifying how a shader object is created, are:

// Provided by VK_EXT_shader_object
typedef enum VkShaderCreateFlagBitsEXT {
    VK_SHADER_CREATE_LINK_STAGE_BIT_EXT = 0x00000001,
  // Provided by VK_EXT_descriptor_heap with VK_EXT_shader_object
    VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT = 0x00000400,
  // Provided by VK_KHR_maintenance5 with VK_ARM_shader_instrumentation, VK_EXT_shader_object with VK_ARM_shader_instrumentation
    VK_SHADER_CREATE_INSTRUMENT_SHADER_BIT_ARM = 0x00000800,
  // Provided by VK_EXT_shader_object with VK_EXT_subgroup_size_control or VK_VERSION_1_3
    VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT = 0x00000002,
  // Provided by VK_EXT_shader_object with VK_EXT_subgroup_size_control or VK_VERSION_1_3
    VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT = 0x00000004,
  // Provided by VK_EXT_shader_object with VK_EXT_mesh_shader or VK_NV_mesh_shader
    VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT = 0x00000008,
  // Provided by VK_EXT_shader_object with VK_KHR_device_group or VK_VERSION_1_1
    VK_SHADER_CREATE_DISPATCH_BASE_BIT_EXT = 0x00000010,
  // Provided by VK_KHR_fragment_shading_rate with VK_EXT_shader_object
    VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT = 0x00000020,
  // Provided by VK_EXT_fragment_density_map with VK_EXT_shader_object
    VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_device_generated_commands
    VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_shader_64bit_indexing
    VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT = 0x00008000,
} VkShaderCreateFlagBitsEXT;

* 
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies that a shader is
linked to all other shaders created in the same [vkCreateShadersEXT](#vkCreateShadersEXT)
call whose [VkShaderCreateInfoEXT](#VkShaderCreateInfoEXT) structures' `flags` include
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#VkShaderCreateFlagBitsEXT).

* 
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies
    that the [`SubgroupSize`](interfaces.html#interfaces-builtin-variables-sgs) **may**
    vary in a
task, mesh, or
    compute shader.

* 
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies that the
    subgroup sizes **must** be launched with all invocations active in a
task, mesh, or
    compute shader.

* 
[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies that a mesh
shader **must** only be used without a task shader.
Otherwise, the mesh shader **must** only be used with a task shader.

* 
[VK_SHADER_CREATE_DISPATCH_BASE_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies that a compute
shader **can** be used with [vkCmdDispatchBase](dispatch.html#vkCmdDispatchBase) with a non-zero base
workgroup.

* 
[VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT)
specifies that a fragment shader **can** be used with a fragment shading
rate attachment.

* 
[VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies
that a fragment shader **can** be used with a fragment density map
attachment.

* 
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies that the
shader **can** be used in combination with [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies that the shader
enables [64-bit indexing](../appendices/spirvenv.html#spirvenv-64bindexing).

* 
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#VkShaderCreateFlagBitsEXT) specifies that the shader
will use descriptor heap mappings instead of descriptor set layouts.

|  | The behavior of
| --- | --- |
[VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT)
and
[VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#VkShaderCreateFlagBitsEXT)
differs subtly from the behavior of
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](pipelines.html#VkPipelineCreateFlagBits)
and
[VK_PIPELINE_CREATE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits)
in that the shader bit allows, but does not require the shader to be used
with that type of attachment.
This means that the application need not create multiple shaders when it
does not know in advance whether the shader will be used with or without the
attachment type, or when it needs the same shader to be compatible with
usage both with and without.
This **may** come at some performance cost on some implementations, so
applications **should** still only set bits that are actually necessary. |

Shader objects **can** be created using different types of shader code.
Possible values of [VkShaderCreateInfoEXT](#VkShaderCreateInfoEXT)::`codeType`, are:

// Provided by VK_EXT_shader_object
typedef enum VkShaderCodeTypeEXT {
    VK_SHADER_CODE_TYPE_BINARY_EXT = 0,
    VK_SHADER_CODE_TYPE_SPIRV_EXT = 1,
} VkShaderCodeTypeEXT;

* 
[VK_SHADER_CODE_TYPE_BINARY_EXT](#VkShaderCodeTypeEXT) specifies shader code in an opaque,
implementation-defined binary format specific to the physical device.

* 
[VK_SHADER_CODE_TYPE_SPIRV_EXT](#VkShaderCodeTypeEXT) specifies shader code in SPIR-V
format.

Binary shader code **can** be retrieved from a shader object using the command:

// Provided by VK_EXT_shader_object
VkResult vkGetShaderBinaryDataEXT(
    VkDevice                                    device,
    VkShaderEXT                                 shader,
    size_t*                                     pDataSize,
    void*                                       pData);

* 
`device` is the logical device that shader object was created from.

* 
`shader` is the shader object to retrieve binary shader code from.

* 
`pDataSize` is a pointer to a `size_t` value related to the size
of the binary shader code, as described below.

* 
`pData` is either `NULL` or a pointer to a buffer.

If `pData` is `NULL`, then the size of the binary shader code of the
shader object, in bytes, is returned in `pDataSize`.
Otherwise, `pDataSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pData`, and on
return the variable is overwritten with the amount of data actually written
to `pData`.
If `pDataSize` is less than the size of the binary shader code, nothing
is written to `pData`, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead
of [VK_SUCCESS](fundamentals.html#VkResult).

|  | The behavior of this command when `pDataSize` is too small differs from
| --- | --- |
how some other getter-type commands work in Vulkan.
Because shader binary data is only usable in its entirety, it would never be
useful for the implementation to return partial data.
Because of this, nothing is written to `pData` unless `pDataSize` is
large enough to fit the data in its entirety.

This behavior is not consistent with the behavior described in
[Opaque Binary Data Results](fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pDataSize`,
the query returns a [VK_INCOMPLETE](fundamentals.html#VkResult) success status instead of a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](fundamentals.html#VkResult) error status. |

Binary shader code retrieved using `vkGetShaderBinaryDataEXT` **can** be
passed to a subsequent call to [vkCreateShadersEXT](#vkCreateShadersEXT) on a compatible
physical device by specifying [VK_SHADER_CODE_TYPE_BINARY_EXT](#VkShaderCodeTypeEXT) in the
`codeType` member of `VkShaderCreateInfoEXT`.

The shader code returned by repeated calls to this function with the same
`VkShaderEXT` is guaranteed to be invariant for the lifetime of the
`VkShaderEXT` object.

Valid Usage

* 
[](#VUID-vkGetShaderBinaryDataEXT-None-08461) VUID-vkGetShaderBinaryDataEXT-None-08461

The [`shaderObject`](features.html#features-shaderObject) feature **must** be
enabled

* 
[](#VUID-vkGetShaderBinaryDataEXT-None-08499) VUID-vkGetShaderBinaryDataEXT-None-08499

If `pData` is not `NULL`, it **must** be aligned to `16` bytes

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderBinaryDataEXT-device-parameter) VUID-vkGetShaderBinaryDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetShaderBinaryDataEXT-shader-parameter) VUID-vkGetShaderBinaryDataEXT-shader-parameter

 `shader` **must** be a valid [VkShaderEXT](#VkShaderEXT) handle

* 
[](#VUID-vkGetShaderBinaryDataEXT-pDataSize-parameter) VUID-vkGetShaderBinaryDataEXT-pDataSize-parameter

 `pDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetShaderBinaryDataEXT-pData-parameter) VUID-vkGetShaderBinaryDataEXT-pData-parameter

 If the value referenced by `pDataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pDataSize` bytes

* 
[](#VUID-vkGetShaderBinaryDataEXT-shader-parent) VUID-vkGetShaderBinaryDataEXT-shader-parent

 `shader` **must** have been created, allocated, or retrieved from `device`

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

Binary shader compatibility means that binary shader code returned from a
call to [vkGetShaderBinaryDataEXT](#vkGetShaderBinaryDataEXT) **can** be passed to a later call to
[vkCreateShadersEXT](#vkCreateShadersEXT), potentially on a different logical and/or physical
device, and that this will result in the successful creation of a shader
object functionally equivalent to the shader object that the code was
originally queried from.

Binary shader code queried from [vkGetShaderBinaryDataEXT](#vkGetShaderBinaryDataEXT) is not
guaranteed to be compatible across all devices, but implementations are
required to provide some compatibility guarantees.
Applications **may** determine binary shader compatibility using either (or
both) of two mechanisms.

Guaranteed compatibility of shader binaries is expressed through a
combination of the `shaderBinaryUUID` and `shaderBinaryVersion`
members of the [VkPhysicalDeviceShaderObjectPropertiesEXT](limits.html#VkPhysicalDeviceShaderObjectPropertiesEXT) structure
queried from a physical device.
Binary shaders retrieved from a physical device with a certain
`shaderBinaryUUID` are guaranteed to be compatible with all other
physical devices reporting the same `shaderBinaryUUID` and the same or
higher `shaderBinaryVersion`.

Whenever a new version of an implementation incorporates any changes that
affect the output of [vkGetShaderBinaryDataEXT](#vkGetShaderBinaryDataEXT), the implementation
**should** either increment `shaderBinaryVersion` if binary shader code
retrieved from older versions remains compatible with the new
implementation, or else replace `shaderBinaryUUID` with a new value if
backward compatibility has been broken.
Binary shader code queried from a device with a matching
`shaderBinaryUUID` and lower `shaderBinaryVersion` relative to the
device on which [vkCreateShadersEXT](#vkCreateShadersEXT) is being called **may** be suboptimal
for the new device in ways that do not change shader functionality, but it
is still guaranteed to be usable to successfully create the shader
object(s).

|  | Implementations are encouraged to share `shaderBinaryUUID` between
| --- | --- |
devices and driver versions to the maximum extent their hardware naturally
allows, and are **strongly** discouraged from ever changing the
`shaderBinaryUUID` for the same hardware except unless absolutely
necessary. |

In addition to the shader compatibility guarantees described above, it is
valid for an application to call [vkCreateShadersEXT](#vkCreateShadersEXT) with binary shader
code created on a device with a different or unknown `shaderBinaryUUID`
and/or higher `shaderBinaryVersion`.
In this case, the implementation **may** use any unspecified means of its
choosing to determine whether the provided binary shader code is usable.
If it is, [vkCreateShadersEXT](#vkCreateShadersEXT) **must** return [VK_SUCCESS](fundamentals.html#VkResult), and the
created shader object is guaranteed to be valid.
Otherwise, in the absence of some error, [vkCreateShadersEXT](#vkCreateShadersEXT) **must**
return [VK_INCOMPATIBLE_SHADER_BINARY_EXT](fundamentals.html#VkResult) to indicate that the provided
binary shader code is not compatible with the device.

Once shader objects have been created, they **can** be bound to the command
buffer using the command:

// Provided by VK_EXT_shader_object
void vkCmdBindShadersEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    stageCount,
    const VkShaderStageFlagBits*                pStages,
    const VkShaderEXT*                          pShaders);

* 
`commandBuffer` is the command buffer that the shader object will be
bound to.

* 
`stageCount` is the length of the `pStages` and `pShaders`
arrays.

* 
`pStages` is a pointer to an array of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits)
values specifying one stage per array index that is affected by the
corresponding value in the `pShaders` array.

* 
`pShaders` is a pointer to an array of `VkShaderEXT` handles
and/or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) values describing the shader binding
operations to be performed on each stage in `pStages`.

When binding linked shaders, an application **may** bind them in any
combination of one or more calls to `vkCmdBindShadersEXT` (i.e., shaders
that were created linked together do not need to be bound in the same
`vkCmdBindShadersEXT` call).

Any shader object bound to a particular stage **may** be unbound by setting its
value in `pShaders` to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).
If `pShaders` is `NULL`, `vkCmdBindShadersEXT` behaves as if
`pShaders` was an array of `stageCount` [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) values
(i.e., any shaders bound to the stages specified in `pStages` are
unbound).

Valid Usage

* 
[](#VUID-vkCmdBindShadersEXT-None-08462) VUID-vkCmdBindShadersEXT-None-08462

The [`shaderObject`](features.html#features-shaderObject) feature **must** be
enabled

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08463) VUID-vkCmdBindShadersEXT-pStages-08463

Every element of `pStages` **must** be unique

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08464) VUID-vkCmdBindShadersEXT-pStages-08464

`pStages` **must** not contain [VK_SHADER_STAGE_ALL_GRAPHICS](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_ALL](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08465) VUID-vkCmdBindShadersEXT-pStages-08465

`pStages` **must** not contain [VK_SHADER_STAGE_RAYGEN_BIT_KHR](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_MISS_BIT_KHR](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](pipelines.html#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08467) VUID-vkCmdBindShadersEXT-pStages-08467

`pStages` **must** not contain
[VK_SHADER_STAGE_SUBPASS_SHADING_BIT_HUAWEI](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdBindShadersEXT-pStages-08468) VUID-vkCmdBindShadersEXT-pStages-08468

`pStages` **must** not contain
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08469) VUID-vkCmdBindShadersEXT-pShaders-08469

For each element of `pStages`, if `pShaders` is not `NULL`, and
the element of the `pShaders` array with the same index is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it **must** have been created with a `stage`
equal to the corresponding element of `pStages`

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08470) VUID-vkCmdBindShadersEXT-pShaders-08470

If `pStages` contains both [VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), and `pShaders` is not `NULL`, and
the same index in `pShaders` as [VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits)
in `pStages` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the same index in
`pShaders` as [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) in `pStages`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08471) VUID-vkCmdBindShadersEXT-pShaders-08471

If `pStages` contains both [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits) and
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), and `pShaders` is not `NULL`, and
the same index in `pShaders` as [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits)
in `pStages` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the same index in
`pShaders` as [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) in `pStages`
**must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08476) VUID-vkCmdBindShadersEXT-pShaders-08476

If `pStages` contains [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits), the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08477) VUID-vkCmdBindShadersEXT-pShaders-08477

If `pStages` contains [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), or
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits), the `VkCommandPool` that
`commandBuffer` was allocated from **must** support graphics operations

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-08478) VUID-vkCmdBindShadersEXT-pShaders-08478

If `pStages` contains [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits) or
[VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits), the `VkCommandPool` that
`commandBuffer` was allocated from **must** support graphics operations

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindShadersEXT-commandBuffer-parameter) VUID-vkCmdBindShadersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindShadersEXT-pStages-parameter) VUID-vkCmdBindShadersEXT-pStages-parameter

 `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-vkCmdBindShadersEXT-pShaders-parameter) VUID-vkCmdBindShadersEXT-pShaders-parameter

 If `pShaders` is not `NULL`, `pShaders` **must** be a valid pointer to an array of `stageCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkShaderEXT](#VkShaderEXT) handles

* 
[](#VUID-vkCmdBindShadersEXT-commandBuffer-recording) VUID-vkCmdBindShadersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindShadersEXT-commandBuffer-cmdpool) VUID-vkCmdBindShadersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindShadersEXT-videocoding) VUID-vkCmdBindShadersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindShadersEXT-stageCount-arraylength) VUID-vkCmdBindShadersEXT-stageCount-arraylength

 `stageCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindShadersEXT-commonparent) VUID-vkCmdBindShadersEXT-commonparent

 Both of `commandBuffer`, and the elements of `pShaders` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

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

vkCmdBindShadersEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Whenever shader objects are used to issue drawing commands, the appropriate
[dynamic state](pipelines.html#pipelines-dynamic-state) setting commands **must** have been
called to set the relevant state in the command buffer prior to drawing:

* 
[vkCmdSetViewportWithCount](vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[vkCmdSetScissorWithCount](vertexpostproc.html#vkCmdSetScissorWithCount)

* 
[vkCmdSetRasterizerDiscardEnable](primsrast.html#vkCmdSetRasterizerDiscardEnable)

If a shader is bound to the [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) stage, the
following commands **must** have been called in the command buffer prior to
drawing:

* 
[vkCmdSetVertexInputEXT](fxvertex.html#vkCmdSetVertexInputEXT)

* 
[vkCmdSetPrimitiveTopology](drawing.html#vkCmdSetPrimitiveTopology)

* 
[vkCmdSetPrimitiveRestartEnable](drawing.html#vkCmdSetPrimitiveRestartEnable)

If a shader is bound to the [VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits)
stage, the following command **must** have been called in the command buffer
prior to drawing:

* 
[vkCmdSetPatchControlPointsEXT](#vkCmdSetPatchControlPointsEXT), if `primitiveTopology` is
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](drawing.html#VkPrimitiveTopology)

If a shader is bound to the
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits) stage, the following
command **must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetTessellationDomainOriginEXT](tessellation.html#vkCmdSetTessellationDomainOriginEXT)

If `rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following commands
**must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetRasterizationSamplesEXT](primsrast.html#vkCmdSetRasterizationSamplesEXT)

* 
[vkCmdSetSampleMaskEXT](fragops.html#vkCmdSetSampleMaskEXT)

* 
[vkCmdSetAlphaToCoverageEnableEXT](fragops.html#vkCmdSetAlphaToCoverageEnableEXT)

* 
[vkCmdSetAlphaToOneEnableEXT](fragops.html#vkCmdSetAlphaToOneEnableEXT), if the [    alphaToOne](features.html#features-alphaToOne) feature is enabled

* 
[vkCmdSetPolygonModeEXT](primsrast.html#vkCmdSetPolygonModeEXT)

* 
[vkCmdSetLineWidth](primsrast.html#vkCmdSetLineWidth), if the [    effective rasterization input topology](drawing.html#drawing-rasterization-input-topology) is in line
[topology class](drawing.html#drawing-primitive-topology-class)

* 
[vkCmdSetCullMode](primsrast.html#vkCmdSetCullMode)

* 
[vkCmdSetFrontFace](primsrast.html#vkCmdSetFrontFace)

* 
[vkCmdSetDepthTestEnable](fragops.html#vkCmdSetDepthTestEnable)

* 
[vkCmdSetDepthWriteEnable](fragops.html#vkCmdSetDepthWriteEnable), if `depthTestEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetDepthCompareOp](fragops.html#vkCmdSetDepthCompareOp), if `depthTestEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetDepthBoundsTestEnable](fragops.html#vkCmdSetDepthBoundsTestEnable), if the [    depthBounds](features.html#features-depthBounds) feature is enabled

* 
[vkCmdSetDepthBounds](fragops.html#vkCmdSetDepthBounds), if `depthBoundsTestEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetDepthBiasEnable](primsrast.html#vkCmdSetDepthBiasEnable)

* 
[vkCmdSetDepthBias](primsrast.html#vkCmdSetDepthBias) or [vkCmdSetDepthBias2EXT](primsrast.html#vkCmdSetDepthBias2EXT),
if `depthBiasEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetDepthClampEnableEXT](vertexpostproc.html#vkCmdSetDepthClampEnableEXT), if the [    depthClamp](features.html#features-depthClamp) feature is enabled

* 
[vkCmdSetStencilTestEnable](fragops.html#vkCmdSetStencilTestEnable)

* 
[vkCmdSetStencilOp](fragops.html#vkCmdSetStencilOp), if `stencilTestEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetStencilCompareMask](fragops.html#vkCmdSetStencilCompareMask), if `stencilTestEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetStencilWriteMask](fragops.html#vkCmdSetStencilWriteMask), if `stencilTestEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetStencilReference](fragops.html#vkCmdSetStencilReference), if `stencilTestEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

If a shader is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) stage, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following commands
**must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetLogicOpEnableEXT](framebuffer.html#vkCmdSetLogicOpEnableEXT), if the [    `logicOp`](features.html#features-logicOp) feature is enabled

* 
[vkCmdSetLogicOpEXT](framebuffer.html#vkCmdSetLogicOpEXT), if `logicOpEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetColorBlendEnableEXT](framebuffer.html#vkCmdSetColorBlendEnableEXT) and [vkCmdSetColorWriteMaskEXT](framebuffer.html#vkCmdSetColorWriteMaskEXT),
if color attachments are bound, with values set for every color
attachment in the render pass instance active at draw time

* 
[vkCmdSetColorBlendEquationEXT](framebuffer.html#vkCmdSetColorBlendEquationEXT) or
[vkCmdSetColorBlendAdvancedEXT](framebuffer.html#vkCmdSetColorBlendAdvancedEXT),
if color attachments are bound, for every attachment whose index in
`pColorBlendEnables` is a pointer to a value of [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetBlendConstants](framebuffer.html#vkCmdSetBlendConstants), if any index in `pColorBlendEnables`
is [VK_TRUE](fundamentals.html#VK_TRUE), and the same index in `pColorBlendEquations` is a
`VkColorBlendEquationEXT` structure with any [VkBlendFactor](framebuffer.html#VkBlendFactor)
member with a value of [VK_BLEND_FACTOR_CONSTANT_COLOR](framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR](framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_CONSTANT_ALPHA](framebuffer.html#VkBlendFactor), or
[VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](framebuffer.html#VkBlendFactor)

If the [`pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following command **must**
have been called in the command buffer prior to drawing:

* 
[vkCmdSetFragmentShadingRateKHR](primsrast.html#vkCmdSetFragmentShadingRateKHR)

If the [`geometryStreams`](features.html#features-geometryStreams) feature is
enabled, and a shader is bound to the [VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits)
stage, the following command **must** have been called in the command buffer
prior to drawing:

* 
[vkCmdSetRasterizationStreamEXT](primsrast.html#vkCmdSetRasterizationStreamEXT)

If the `[VK_EXT_discard_rectangles](../appendices/extensions.html#VK_EXT_discard_rectangles)` extension is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following commands
**must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetDiscardRectangleEnableEXT](fragops.html#vkCmdSetDiscardRectangleEnableEXT)

* 
[vkCmdSetDiscardRectangleModeEXT](fragops.html#vkCmdSetDiscardRectangleModeEXT), if `discardRectangleEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[vkCmdSetDiscardRectangleEXT](fragops.html#vkCmdSetDiscardRectangleEXT), if `discardRectangleEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

If the `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following commands
**must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetConservativeRasterizationModeEXT](primsrast.html#vkCmdSetConservativeRasterizationModeEXT)

* 
[vkCmdSetExtraPrimitiveOverestimationSizeEXT](primsrast.html#vkCmdSetExtraPrimitiveOverestimationSizeEXT), if
`conservativeRasterizationMode` is
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](primsrast.html#VkConservativeRasterizationModeEXT)

If the [`depthClipEnable`](features.html#features-depthClipEnable) feature is
enabled, the following command **must** have been called in the command buffer
prior to drawing:

* 
[vkCmdSetDepthClipEnableEXT](vertexpostproc.html#vkCmdSetDepthClipEnableEXT)

If the `[VK_EXT_sample_locations](../appendices/extensions.html#VK_EXT_sample_locations)` extension is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following commands
**must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetSampleLocationsEnableEXT](primsrast.html#vkCmdSetSampleLocationsEnableEXT)

* 
[vkCmdSetSampleLocationsEXT](primsrast.html#vkCmdSetSampleLocationsEXT), if `sampleLocationsEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

If the `[VK_EXT_provoking_vertex](../appendices/extensions.html#VK_EXT_provoking_vertex)` extension is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), and a shader is bound to
the [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) stage, the following command **must** have
been called in the command buffer prior to drawing:

* 
[vkCmdSetProvokingVertexModeEXT](vertexpostproc.html#vkCmdSetProvokingVertexModeEXT)

If any of the [`stippledRectangularLines`](features.html#features-stippledRectangularLines), [`stippledBresenhamLines`](features.html#features-stippledBresenhamLines), or [`stippledSmoothLines`](features.html#features-stippledSmoothLines) features are enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), and if the
[effective rasterization input topology](drawing.html#drawing-rasterization-input-topology) is in line [topology class](drawing.html#drawing-primitive-topology-class),
the following commands **must** have been called in the command buffer prior to
drawing:

* 
[vkCmdSetLineRasterizationModeEXT](primsrast.html#vkCmdSetLineRasterizationModeEXT)

* 
[vkCmdSetLineStippleEnableEXT](primsrast.html#vkCmdSetLineStippleEnableEXT)

* 
[vkCmdSetLineStipple](primsrast.html#vkCmdSetLineStipple), if `stippledLineEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

If the [`depthClipControl`](features.html#features-depthClipControl) feature is
enabled, the following command **must** have been called in the command buffer
prior to drawing:

* 
[vkCmdSetDepthClipNegativeOneToOneEXT](vertexpostproc.html#vkCmdSetDepthClipNegativeOneToOneEXT)

If the [`colorWriteEnable`](features.html#features-colorWriteEnable) feature is
enabled, and a shader is bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)
stage, and `rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following
command **must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetColorWriteEnableEXT](framebuffer.html#vkCmdSetColorWriteEnableEXT), with values set for every color
attachment in the render pass instance active at draw time

If the [attachmentFeedbackLoopDynamicState](features.html#features-attachmentFeedbackLoopDynamicState) feature is enabled, and a shader is
bound to the [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) stage, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following command **must**
have been called in the command buffer prior to drawing:

* 
[vkCmdSetAttachmentFeedbackLoopEnableEXT](renderpass.html#vkCmdSetAttachmentFeedbackLoopEnableEXT)

If the `[VK_NV_clip_space_w_scaling](../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension is enabled, the
following commands **must** have been called in the command buffer prior to
drawing:

* 
[vkCmdSetViewportWScalingEnableNV](vertexpostproc.html#vkCmdSetViewportWScalingEnableNV)

* 
[vkCmdSetViewportWScalingNV](vertexpostproc.html#vkCmdSetViewportWScalingNV), if `viewportWScalingEnable` is
[VK_TRUE](fundamentals.html#VK_TRUE)

If the [depthClamp](features.html#features-depthClamp) and [`depthClampControl`](features.html#features-depthClampControl) features are enabled, and `depthClampEnable`
is [VK_TRUE](fundamentals.html#VK_TRUE), the following command **must** have been called in the
command buffer prior to drawing:

* 
[vkCmdSetDepthClampRangeEXT](fragops.html#vkCmdSetDepthClampRangeEXT)

If the `[VK_NV_viewport_swizzle](../appendices/extensions.html#VK_NV_viewport_swizzle)` extension is enabled, the following
command **must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetViewportSwizzleNV](vertexpostproc.html#vkCmdSetViewportSwizzleNV)

If the `[VK_NV_fragment_coverage_to_color](../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following commands
**must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetCoverageToColorEnableNV](fragops.html#vkCmdSetCoverageToColorEnableNV)

* 
[vkCmdSetCoverageToColorLocationNV](fragops.html#vkCmdSetCoverageToColorLocationNV), if `coverageToColorEnable`
is [VK_TRUE](fundamentals.html#VK_TRUE)

If the `[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following commands
**must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetCoverageModulationModeNV](fragops.html#vkCmdSetCoverageModulationModeNV)

* 
[vkCmdSetCoverageModulationTableEnableNV](fragops.html#vkCmdSetCoverageModulationTableEnableNV), if
`coverageModulationMode` is not
[VK_COVERAGE_MODULATION_MODE_NONE_NV](fragops.html#VkCoverageModulationModeNV)

* 
[vkCmdSetCoverageModulationTableNV](fragops.html#vkCmdSetCoverageModulationTableNV), if
`coverageModulationTableEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

If the [`coverageReductionMode`](features.html#features-coverageReductionMode)
feature is enabled, and `rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the
following command **must** have been called in the command buffer prior to
drawing:

* 
[vkCmdSetCoverageReductionModeNV](fragops.html#vkCmdSetCoverageReductionModeNV)

If the [`representativeFragmentTest`](features.html#features-representativeFragmentTest) feature is enabled, and
`rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following command **must**
have been called in the command buffer prior to drawing:

* 
[vkCmdSetRepresentativeFragmentTestEnableNV](fragops.html#vkCmdSetRepresentativeFragmentTestEnableNV)

If the [`shadingRateImage`](features.html#features-shadingRateImage) feature is
enabled, and `rasterizerDiscardEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the following
commands **must** have been called in the command buffer prior to drawing:

* 
[vkCmdSetCoarseSampleOrderNV](primsrast.html#vkCmdSetCoarseSampleOrderNV)

* 
[vkCmdSetShadingRateImageEnableNV](primsrast.html#vkCmdSetShadingRateImageEnableNV)

* 
[vkCmdSetViewportShadingRatePaletteNV](primsrast.html#vkCmdSetViewportShadingRatePaletteNV), if
`shadingRateImageEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

If the [`exclusiveScissor`](features.html#features-exclusiveScissor) feature is
enabled, the following commands **must** have been called in the command buffer
prior to drawing:

* 
[vkCmdSetExclusiveScissorEnableNV](fragops.html#vkCmdSetExclusiveScissorEnableNV)

* 
[vkCmdSetExclusiveScissorNV](fragops.html#vkCmdSetExclusiveScissorNV), if any value in
`pExclusiveScissorEnables` is [VK_TRUE](fundamentals.html#VK_TRUE)

State **can** be set either at any time before or after shader objects are
bound, but all required state **must** be set prior to issuing drawing
commands.

If the [`commandBufferInheritance`](features.html#features-commandBufferInheritance)
feature is enabled, graphics and compute state is inherited from the
previously executed command buffer in the queue.
Any valid state inherited in this way does not need to be set again in the
current command buffer.

Calling [vkCmdBindShadersEXT](#vkCmdBindShadersEXT) causes the pipeline bind points
[corresponding to each stage](#shaders-binding) in `pStages` to be
disturbed, meaning that any [pipelines](pipelines.html#pipelines) that had previously
been bound to those pipeline bind points are no longer bound.

If [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) is disturbed (i.e., if
`pStages` contains any graphics stage), any graphics pipeline state that
the previously bound pipeline did not specify as [dynamic](pipelines.html#pipelines-dynamic-state) becomes **undefined**, and **must** be set in the command buffer before
issuing drawing commands using shader objects.

Calls to [vkCmdBindPipeline](pipelines.html#vkCmdBindPipeline) likewise disturb the shader stage(s)
corresponding to `pipelineBindPoint`, meaning that any shaders that had
previously been bound to any of those stages are no longer bound, even if
the pipeline was created without shaders for some of those stages.

To destroy a shader object, call:

// Provided by VK_EXT_shader_object
void vkDestroyShaderEXT(
    VkDevice                                    device,
    VkShaderEXT                                 shader,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader object.

* 
`shader` is the handle of the shader object to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Destroying a shader object used by one or more command buffers in the
[recording or executable state](cmdbuffers.html#commandbuffers-lifecycle) causes those
command buffers to move into the *invalid state*.

Valid Usage

* 
[](#VUID-vkDestroyShaderEXT-None-08481) VUID-vkDestroyShaderEXT-None-08481

The [`shaderObject`](features.html#features-shaderObject) feature **must** be
enabled

* 
[](#VUID-vkDestroyShaderEXT-shader-08482) VUID-vkDestroyShaderEXT-shader-08482

All submitted commands that refer to `shader` **must** have completed
execution

* 
[](#VUID-vkDestroyShaderEXT-pAllocator-08483) VUID-vkDestroyShaderEXT-pAllocator-08483

If `VkAllocationCallbacks` were provided when `shader` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyShaderEXT-pAllocator-08484) VUID-vkDestroyShaderEXT-pAllocator-08484

If no `VkAllocationCallbacks` were provided when `shader` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyShaderEXT-device-parameter) VUID-vkDestroyShaderEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyShaderEXT-shader-parameter) VUID-vkDestroyShaderEXT-shader-parameter

 If `shader` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `shader` **must** be a valid [VkShaderEXT](#VkShaderEXT) handle

* 
[](#VUID-vkDestroyShaderEXT-pAllocator-parameter) VUID-vkDestroyShaderEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyShaderEXT-shader-parent) VUID-vkDestroyShaderEXT-shader-parent

 If `shader` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `shader` **must** be externally synchronized

*Shader modules* contain *shader code* and one or more entry points.
Shaders are selected from a shader module by specifying an entry point as
part of [pipeline](pipelines.html#pipelines) creation.
The stages of a pipeline **can** use shaders that come from different modules.
The shader code defining a shader module **must** be in the SPIR-V format, as
described by the [Vulkan Environment for SPIR-V](../appendices/spirvenv.html#spirvenv) appendix.

Shader modules are represented by `VkShaderModule` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkShaderModule)

To create a shader module, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateShaderModule(
    VkDevice                                    device,
    const VkShaderModuleCreateInfo*             pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkShaderModule*                             pShaderModule);

* 
`device` is the logical device that creates the shader module.

* 
`pCreateInfo` is a pointer to a [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo)
structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pShaderModule` is a pointer to a [VkShaderModule](#VkShaderModule) handle in
which the resulting shader module object is returned.

Once a shader module has been created, any entry points it contains **can** be
used in pipeline shader stages as described in [Compute Pipelines](pipelines.html#pipelines-compute)
and [Graphics Pipelines](pipelines.html#pipelines-graphics)
.

|  | If
| --- | --- |
the [`maintenance5`](features.html#features-maintenance5) feature
is enabled, shader module creation can be omitted entirely.
Instead, applications should provide the [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo)
structure directly in to pipeline creation by chaining it to
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo).
This avoids the overhead of creating and managing an additional object. |

Valid Usage

* 
[](#VUID-vkCreateShaderModule-pCreateInfo-06904) VUID-vkCreateShaderModule-pCreateInfo-06904

If `pCreateInfo` is not `NULL`, `pCreateInfo->pNext` **must** be
`NULL`
or a pointer to a valid instance of

[VkShaderModuleValidationCacheCreateInfoEXT](#VkShaderModuleValidationCacheCreateInfoEXT)

* 
[VkValidationFeaturesEXT](initialization.html#VkValidationFeaturesEXT)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateShaderModule-device-parameter) VUID-vkCreateShaderModule-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateShaderModule-pCreateInfo-parameter) VUID-vkCreateShaderModule-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) structure

* 
[](#VUID-vkCreateShaderModule-pAllocator-parameter) VUID-vkCreateShaderModule-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateShaderModule-pShaderModule-parameter) VUID-vkCreateShaderModule-pShaderModule-parameter

 `pShaderModule` **must** be a valid pointer to a [VkShaderModule](#VkShaderModule) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

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

The `VkShaderModuleCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkShaderModuleCreateInfo {
    VkStructureType              sType;
    const void*                  pNext;
    VkShaderModuleCreateFlags    flags;
    size_t                       codeSize;
    const uint32_t*              pCode;
} VkShaderModuleCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`codeSize` is the size, in bytes, of the code pointed to by
`pCode`.

* 
`pCode` is a pointer to code that is used to create the shader
module.
The type and format of the code is determined from the content of the
memory addressed by `pCode`.

Valid Usage

* 
[](#VUID-VkShaderModuleCreateInfo-codeSize-08735) VUID-VkShaderModuleCreateInfo-codeSize-08735

If pCode is a pointer to SPIR-V code, `codeSize` **must** be a multiple of 4

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08736) VUID-VkShaderModuleCreateInfo-pCode-08736

If pCode is a pointer to SPIR-V code, `pCode` **must** point to valid SPIR-V code,
formatted and packed as described by the [Khronos SPIR-V     Specification](introduction.html#spirv-spec)

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08737) VUID-VkShaderModuleCreateInfo-pCode-08737

If pCode is a pointer to SPIR-V code, `pCode` **must** adhere to the validation rules
described by the [Validation Rules within a     Module](../appendices/spirvenv.html#spirvenv-module-validation) section of the [SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities)
appendix

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08738) VUID-VkShaderModuleCreateInfo-pCode-08738

If pCode is a pointer to SPIR-V code, `pCode` **must** declare the `Shader` capability
for SPIR-V code

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08739) VUID-VkShaderModuleCreateInfo-pCode-08739

If pCode is a pointer to SPIR-V code, `pCode` **must** not declare any capability that is
not supported by the API, as described by the
[Capabilities](../appendices/spirvenv.html#spirvenv-module-validation) section of the
[SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities) appendix

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08740) VUID-VkShaderModuleCreateInfo-pCode-08740

If pCode is a pointer to SPIR-V code, and `pCode` declares any of the capabilities
listed in the [SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities-table)
appendix, one of the corresponding requirements **must** be satisfied

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08741) VUID-VkShaderModuleCreateInfo-pCode-08741

If pCode is a pointer to SPIR-V code, `pCode` **must** not declare any SPIR-V extension
that is not supported by the API, as described by the
[Extension](../appendices/spirvenv.html#spirvenv-extensions) section of the
[SPIR-V Environment](../appendices/spirvenv.html#spirvenv-capabilities) appendix

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08742) VUID-VkShaderModuleCreateInfo-pCode-08742

If pCode is a pointer to SPIR-V code, and `pCode` declares any of the SPIR-V extensions
listed in the [SPIR-V Environment](../appendices/spirvenv.html#spirvenv-extensions-table)
appendix, one of the corresponding requirements **must** be satisfied

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-07912) VUID-VkShaderModuleCreateInfo-pCode-07912

If the [VK_NV_glsl_shader](../appendices/extensions.html#VK_NV_glsl_shader) extension is not enabled, `pCode`
**must** be a pointer to SPIR-V code

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-01379) VUID-VkShaderModuleCreateInfo-pCode-01379

If `pCode` is a pointer to GLSL code, it **must** be valid GLSL code
written to the `GL_KHR_vulkan_glsl` GLSL extension specification

* 
[](#VUID-VkShaderModuleCreateInfo-codeSize-01085) VUID-VkShaderModuleCreateInfo-codeSize-01085

`codeSize` **must** be greater than 0

Valid Usage (Implicit)

* 
[](#VUID-VkShaderModuleCreateInfo-sType-sType) VUID-VkShaderModuleCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkShaderModuleCreateInfo-flags-zerobitmask) VUID-VkShaderModuleCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-parameter) VUID-VkShaderModuleCreateInfo-pCode-parameter

 `pCode` **must** be a valid pointer to an array of    `uint32_t` values

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM)

* 
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo)

// Provided by VK_VERSION_1_0
typedef VkFlags VkShaderModuleCreateFlags;

`VkShaderModuleCreateFlags` is a bitmask type for setting a mask, but is
currently reserved for future use.

To use a [VkValidationCacheEXT](#VkValidationCacheEXT) to cache shader validation results, add
a [VkShaderModuleValidationCacheCreateInfoEXT](#VkShaderModuleValidationCacheCreateInfoEXT) structure to the
`pNext` chain of the [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) structure,
specifying the cache object to use.

The `VkShaderModuleValidationCacheCreateInfoEXT` structure is defined
as:

// Provided by VK_EXT_validation_cache
typedef struct VkShaderModuleValidationCacheCreateInfoEXT {
    VkStructureType         sType;
    const void*             pNext;
    VkValidationCacheEXT    validationCache;
} VkShaderModuleValidationCacheCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`validationCache` is the validation cache object from which the
results of prior validation attempts will be written, and to which new
validation results for this [VkShaderModule](#VkShaderModule) will be written (if not
already present).
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderModuleValidationCacheCreateInfoEXT-sType-sType) VUID-VkShaderModuleValidationCacheCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_MODULE_VALIDATION_CACHE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkShaderModuleValidationCacheCreateInfoEXT-validationCache-parameter) VUID-VkShaderModuleValidationCacheCreateInfoEXT-validationCache-parameter

 `validationCache` **must** be a valid [VkValidationCacheEXT](#VkValidationCacheEXT) handle

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo)

* 
[VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo)

To destroy a shader module, call:

// Provided by VK_VERSION_1_0
void vkDestroyShaderModule(
    VkDevice                                    device,
    VkShaderModule                              shaderModule,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader module.

* 
`shaderModule` is the handle of the shader module to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

A shader module **can** be destroyed while pipelines created using its shaders
are still in use.

Valid Usage

* 
[](#VUID-vkDestroyShaderModule-shaderModule-01092) VUID-vkDestroyShaderModule-shaderModule-01092

If `VkAllocationCallbacks` were provided when `shaderModule` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyShaderModule-shaderModule-01093) VUID-vkDestroyShaderModule-shaderModule-01093

If no `VkAllocationCallbacks` were provided when `shaderModule`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyShaderModule-device-parameter) VUID-vkDestroyShaderModule-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyShaderModule-shaderModule-parameter) VUID-vkDestroyShaderModule-shaderModule-parameter

 If `shaderModule` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `shaderModule` **must** be a valid [VkShaderModule](#VkShaderModule) handle

* 
[](#VUID-vkDestroyShaderModule-pAllocator-parameter) VUID-vkDestroyShaderModule-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyShaderModule-shaderModule-parent) VUID-vkDestroyShaderModule-shaderModule-parent

 If `shaderModule` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `shaderModule` **must** be externally synchronized

Shader modules have unique identifiers associated with them.
To query an implementation provided identifier, call:

// Provided by VK_EXT_shader_module_identifier
void vkGetShaderModuleIdentifierEXT(
    VkDevice                                    device,
    VkShaderModule                              shaderModule,
    VkShaderModuleIdentifierEXT*                pIdentifier);

* 
`device` is the logical device that created the shader module.

* 
`shaderModule` is the handle of the shader module.

* 
`pIdentifier` is a pointer to the returned
[VkShaderModuleIdentifierEXT](#VkShaderModuleIdentifierEXT).

The identifier returned by the implementation **must** only depend on
`shaderIdentifierAlgorithmUUID` and information provided in the
[VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) which created `shaderModule`.
The implementation **may** return equal identifiers for two different
[VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) structures if the difference does not affect
pipeline compilation.
Identifiers are only meaningful on different [VkDevice](devsandqueues.html#VkDevice) objects if the
device the identifier was queried from had the same
[`shaderModuleIdentifierAlgorithmUUID`](limits.html#limits-shaderModuleIdentifierAlgorithmUUID) as the device consuming the
identifier.

Valid Usage

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-shaderModuleIdentifier-06884) VUID-vkGetShaderModuleIdentifierEXT-shaderModuleIdentifier-06884

[`shaderModuleIdentifier`](features.html#features-shaderModuleIdentifier)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-device-parameter) VUID-vkGetShaderModuleIdentifierEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parameter) VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parameter

 `shaderModule` **must** be a valid [VkShaderModule](#VkShaderModule) handle

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-pIdentifier-parameter) VUID-vkGetShaderModuleIdentifierEXT-pIdentifier-parameter

 `pIdentifier` **must** be a valid pointer to a [VkShaderModuleIdentifierEXT](#VkShaderModuleIdentifierEXT) structure

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parent) VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parent

 `shaderModule` **must** have been created, allocated, or retrieved from `device`

[VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) structures have unique identifiers associated
with them.
To query an implementation provided identifier, call:

// Provided by VK_EXT_shader_module_identifier
void vkGetShaderModuleCreateInfoIdentifierEXT(
    VkDevice                                    device,
    const VkShaderModuleCreateInfo*             pCreateInfo,
    VkShaderModuleIdentifierEXT*                pIdentifier);

* 
`device` is the logical device that **can** create a
[VkShaderModule](#VkShaderModule) from `pCreateInfo`.

* 
`pCreateInfo` is a pointer to a [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo)
structure.

* 
`pIdentifier` is a pointer to the returned
[VkShaderModuleIdentifierEXT](#VkShaderModuleIdentifierEXT).

The identifier returned by implementation **must** only depend on
`shaderIdentifierAlgorithmUUID` and information provided in the
[VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo).
The implementation **may** return equal identifiers for two different
[VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) structures if the difference does not affect
pipeline compilation.
Identifiers are only meaningful on different [VkDevice](devsandqueues.html#VkDevice) objects if the
device the identifier was queried from had the same
[`shaderModuleIdentifierAlgorithmUUID`](limits.html#limits-shaderModuleIdentifierAlgorithmUUID) as the device consuming the
identifier.

The identifier returned by the implementation in
[vkGetShaderModuleCreateInfoIdentifierEXT](#vkGetShaderModuleCreateInfoIdentifierEXT) **must** be equal to the
identifier returned by [vkGetShaderModuleIdentifierEXT](#vkGetShaderModuleIdentifierEXT) given equivalent
definitions of [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) and any chained `pNext`
structures.

Valid Usage

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-shaderModuleIdentifier-06885) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-shaderModuleIdentifier-06885

[`shaderModuleIdentifier`](features.html#features-shaderModuleIdentifier)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-device-parameter) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pCreateInfo-parameter) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) structure

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pIdentifier-parameter) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pIdentifier-parameter

 `pIdentifier` **must** be a valid pointer to a [VkShaderModuleIdentifierEXT](#VkShaderModuleIdentifierEXT) structure

[VkShaderModuleIdentifierEXT](#VkShaderModuleIdentifierEXT) represents a shader module identifier
returned by the implementation.

// Provided by VK_EXT_shader_module_identifier
typedef struct VkShaderModuleIdentifierEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           identifierSize;
    uint8_t            identifier[VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT];
} VkShaderModuleIdentifierEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`identifierSize` is the size, in bytes, of valid data returned in
`identifier`.

* 
`identifier` is a buffer of opaque data specifying an identifier.

Any returned values beyond the first `identifierSize` bytes are
**undefined**.
Implementations **must** return an `identifierSize` greater than 0, and
less-or-equal to [VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT](#VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT).

Two identifiers are considered equal if `identifierSize` is equal and
the first `identifierSize` bytes of `identifier` compare equal.

Implementations **may** return a different `identifierSize` for different
modules.
Implementations **should** ensure that `identifierSize` is large enough to
uniquely define a shader module.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderModuleIdentifierEXT-sType-sType) VUID-VkShaderModuleIdentifierEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_MODULE_IDENTIFIER_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkShaderModuleIdentifierEXT-pNext-pNext) VUID-VkShaderModuleIdentifierEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT](#VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT) is the length in bytes of a
shader module identifier, as returned in
[VkShaderModuleIdentifierEXT](#VkShaderModuleIdentifierEXT)::`identifierSize`.

#define VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT 32U

Before a shader can be used it **must** be first bound to the command buffer.

Calling [vkCmdBindPipeline](pipelines.html#vkCmdBindPipeline) binds all stages corresponding to the
[VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint).
Calling [vkCmdBindShadersEXT](#vkCmdBindShadersEXT) binds all stages in `pStages`

The following table describes the relationship between shader stages and
pipeline bind points:

| Shader stage | Pipeline bind point | behavior controlled |
| --- | --- | --- |
| * 
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits) | [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) | all [drawing commands](drawing.html#drawing) |
| * 
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_PIPELINE_BIND_POINT_COMPUTE](pipelines.html#VkPipelineBindPoint) | all [dispatch commands](dispatch.html#dispatch) |
| * 
[VK_SHADER_STAGE_ANY_HIT_BIT_KHR](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_CLOSEST_HIT_BIT_KHR](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_INTERSECTION_BIT_KHR](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_MISS_BIT_KHR](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_RAYGEN_BIT_KHR](pipelines.html#VkShaderStageFlagBits) | [VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](pipelines.html#VkPipelineBindPoint) | [vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV)
[vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR) and [vkCmdTraceRaysIndirectKHR](raytracing.html#vkCmdTraceRaysIndirectKHR) |
| * 
[VK_SHADER_STAGE_SUBPASS_SHADING_BIT_HUAWEI](pipelines.html#VkShaderStageFlagBits)

* 
[VK_SHADER_STAGE_CLUSTER_CULLING_BIT_HUAWEI](pipelines.html#VkShaderStageFlagBits) | [VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](pipelines.html#VkPipelineBindPoint) | [vkCmdSubpassShadingHUAWEI](dispatch.html#vkCmdSubpassShadingHUAWEI) |
| * 
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_PIPELINE_BIND_POINT_EXECUTION_GRAPH_AMDX](pipelines.html#VkPipelineBindPoint) | all [execution graph commands](executiongraphs.html#executiongraphs) |

At each stage of the pipeline, multiple invocations of a shader **may** execute
simultaneously.
Further, invocations of a single shader produced as the result of different
commands **may** execute simultaneously.
The relative execution order of invocations of the same shader type is
**undefined**.
Shader invocations **may** complete in a different order than that in which the
primitives they originated from were drawn or dispatched by the application.
However, fragment shader outputs are written to attachments in
[rasterization order](primsrast.html#primsrast-order).

The relative execution order of invocations of different shader types is
largely **undefined**.
However, when invoking a shader whose inputs are generated from a previous
pipeline stage, the shader invocations from the previous stage are
guaranteed to have executed far enough to generate input values for all
required inputs.

A shader invocation that is *terminated* has finished executing
instructions.

Executing `OpReturn` in the entry point, or executing
`OpTerminateInvocation` in any function will terminate an invocation.
Implementations **may** also terminate a shader invocation when `OpKill` is
executed in any function; otherwise it becomes a
[helper invocation](#shaders-helper-invocations).

In addition to the above conditions, [helper invocations](#shaders-helper-invocations) **may** be terminated when all non-helper invocations in the same
[derivative group](#shaders-derivative-operations) either terminate or
become [helper invocations](#shaders-helper-invocations).

A shader stage for a given command completes execution when all invocations
for that stage have terminated.

|  | Depending on the implementation, `OpKill` will be functionally equivalent
| --- | --- |
to either `OpTerminateInvocation` or `OpDemoteToHelperInvocation`.
To obtain the most predictable behavior, shader authors should use
`OpTerminateInvocation` or `OpDemoteToHelperInvocation` rather than
`OpKill` wherever possible. |

Shader accesses to memory are not automatically bounds checked by the
implementation.
Applications **must** not execute operations that would access out of bounds
memory locations unless some form of bounds checking is enabled.
An access is considered out of bounds if any part of the access is outside
of any specified memory range, whether that is the array length specified in
a shader or a range specified in the API (e.g. descriptor size).

|  | External tooling such as the Vulkan Validation Layers can be used to help
| --- | --- |
validate that accesses are not out of bounds. |

An access **can** be independently out of bounds for each range that applies;
if one is bounds checked and the others are not, behavior is still
**undefined**.

|  | For example, given the following shader declaration
| --- | --- |

// Buffer type
struct MySSBO {
    uint32_t data[2];
};

accessing `data` at an index greater than 1 is **undefined** behavior, whether
the underlying buffer is bigger than that or not. |

Vulkan provides functionality that enables automatic bounds checking in some
cases, as outlined below.

|  | Automatic bounds checking can be used to ensure that accesses outside of
| --- | --- |
certain bounds have predictable results, acting as a safety net for
untrusted code, or simply as a way for applications to avoid their own
bounds checks.
While there may be a performance cost for enabling these features, they
should not be slower than an application performing equivalent checks.
Automatic checks do not necessarily account for all possible bounds - e.g.
[Robust Buffer Access](#shaders-robust-buffer-access) will not prevent **undefined** behavior in the
buffer access example in the prior note. |

Robust buffer access **can** be enabled by
specifying [VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT)
in [VkPipelineRobustnessCreateInfo](pipelines.html#VkPipelineRobustnessCreateInfo), or specifying
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) and enabling the
the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature.

When robust buffer access is enabled, access to a buffer via a descriptor is
bounds checked against the range specified for the
descriptor, and access to vertex input data is bounds checked against the
bound vertex buffer range.
Reads from a vertex input **may** instead be bounds checked against a range
rounded down to the nearest multiple of the stride of its binding.

|  | The range of a descriptor is not necessarily equivalent to the size of the
| --- | --- |
underlying resource; applications may suballocate descriptors from larger
buffers, for instance.
The APIs specifying the descriptor range vary between resource types and
descriptor interfaces, but for example include the ranges specified by
[VkDescriptorBufferInfo](descriptorsets.html#VkDescriptorBufferInfo) or [VkBufferViewCreateInfo](resources.html#VkBufferViewCreateInfo). |

If any vertex input read is outside of the checked range, all other vertex
input reads through the same binding in the same shader invocation **may**
behave as if they were outside of the checked range.

If any access to a uniform, storage, uniform texel, or storage texel buffer
is outside of the checked range, any access of the same type (write,
read-modify-write, or read) to the same buffer that is less than 16 bytes
away from the first access **may** behave as if it is also outside of the
checked range.

Any non-atomic access to a uniform, storage, uniform texel, or storage texel
buffer wider than 32-bits **may** be treated as multiple 32-bit accesses that
are separately bounds checked.

Writes to a storage or storage texel buffer outside of the checked range
will either be discarded, or modify values within the memory range(s) bound
to the underlying buffer (including outside of the checked range).
They will not modify any other memory.

|  | Non-atomic writes outside of the checked range **can** lead to data races, as
| --- | --- |
the application has no control over where the data will be written. |

Atomic read-modify-write operations to a storage or storage texel buffer
outside of the checked range will behave the same as a write outside of the
checked range, but will return an **undefined** value.

Reading a uniform, storage, uniform texel, or storage texel buffer outside
of the checked range will return one of the following values:

* 
Values from anywhere within the memory range(s) bound to the underlying
buffer object, which **may** include bytes beyond the size of the buffer
itself.

* 
Zero values

* 
For 4-component vectors, a value of (0,0,0,x), where x is
any of

0, 1, or the maximum positive integer value for integer components

* 
0.0 or 1.0 for floating-point components

The value of the last store to the same out-of-bounds location in the
same shader invocation.

* 
Using
the `Volatile`/`VolatileTexel` memory/image operand, the
`Volatile` memory semantic, or
the `Volatile` decoration to load the value will prevent prior stored
values from being returned.

|  | Getting the value of the previous store is possible as implementations are
| --- | --- |
free to optimize multiple accesses in the general case.
There are several ways this **can** be prevented, but using volatile loads is
by far the simplest. |

Reads from a vertex input outside of the checked range will produce one of
the following values:

* 
Values from anywhere within the memory range(s) bound to the underlying
buffer object, which **may** include bytes beyond the size of the buffer
itself, converted via [input extraction](fxvertex.html#fxvertex-input-extraction).

* 
Zero values, converted via [input    extraction](fxvertex.html#fxvertex-input-extraction).

* 
Zero values

* 
For 4-component vectors, a value of (0,0,0,x), where x is
any of

0, 1, or the maximum positive integer value for integer components

* 
0.0 or 1.0 for floating-point components

Accesses via `OpCooperativeMatrixLoadNV` and
`OpCooperativeMatrixStoreNV` are only bounds checked in the above manner
if the [`VkPhysicalDeviceCooperativeMatrixFeaturesNV`::`cooperativeMatrixRobustBufferAccess`](features.html#features-cooperativeMatrixRobustBufferAccessNV)
feature is enabled.

Accesses via `OpCooperativeMatrixLoadKHR` and
`OpCooperativeMatrixStoreKHR` are only bounds checked in the above manner
if the [`VkPhysicalDeviceCooperativeMatrixFeaturesKHR`::`cooperativeMatrixRobustBufferAccess`](features.html#features-cooperativeMatrixRobustBufferAccess)
feature is enabled.

Accesses using `OpCooperativeVector*` instructions are not
bounds-checked.

Robust buffer access 2 **can** be enabled by
specifying
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) in
[VkPipelineRobustnessCreateInfo](pipelines.html#VkPipelineRobustnessCreateInfo), or specifying
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT](pipelines.html#VkPipelineRobustnessBufferBehaviorEXT) and enabling the
the [`robustBufferAccess2`](features.html#features-robustBufferAccess) feature.

When robust buffer access 2 is enabled, access to a buffer via a descriptor
is bounds checked against the range specified for the descriptor, and access
to vertex input data is bounds checked against the bound vertex buffer
range, similarly to [Robust Buffer Access](#shaders-robust-buffer-access), but with tighter
bounds on the results.

Accesses to a uniform buffer **may** instead be bounds checked against a range
rounded up to [`robustUniformBufferAccessSizeAlignment`](limits.html#limits-robustUniformBufferAccessSizeAlignment).
Accesses inside the aligned range **may** behave as if they are in bounds, even
if they are outside of the unaligned descriptor range, and access memory
accordingly.
The same is true for accesses to a storage buffer, using the
[`robustStorageBufferAccessSizeAlignment`](limits.html#limits-robustStorageBufferAccessSizeAlignment) limit instead.

|  | To avoid unexpected data races between neighboring descriptor ranges,
| --- | --- |
applications may wish to ensure suballocated ranges of buffers are aligned
to these limits. |

Any access to a uniform, storage, uniform texel, or storage texel buffer
wider than 32-bits **may** be treated as multiple 32-bit accesses that are
separately bounds checked.

|  | Accesses to null descriptors are not considered out-of-bounds and have
| --- | --- |
separate behavior controlled by the [`nullDescriptor`](features.html#features-nullDescriptor) feature. |

Writes to a storage or storage texel buffer outside of the checked range
will not modify any memory.

Atomic read-modify-write operations to a storage or storage texel buffer
outside of the checked range will behave the same as a write outside of the
checked range, but will return an **undefined** value.

Reads from a uniform or storage buffer outside of the checked range will
return zero values.
If a value was previously written to the same out of bounds location in the
same shader invocation, that value **may** be returned instead; using
the `Volatile`/`VolatileTexel` memory/image operand, the `Volatile`
memory semantic, or
the `Volatile` decoration to load the value will prevent prior stored
values from being returned.

Reading a uniform texel or storage texel buffer outside of the checked range
will produce zero values, but [component substitution](images.html#images-component-substitution) will still be applied based on the buffer view’s format, with
the resulting value returned to the shader.
If a value was previously written to the same out of bounds location in the
same shader invocation, that value **may** be returned instead; using
the `Volatile`/`VolatileTexel` memory/image operand, the `Volatile`
memory semantic, or
the `Volatile` decoration to load the value will prevent prior stored
values from being returned.

Reads from a vertex input outside of the checked range will produce zero
values, but [input extraction](fxvertex.html#fxvertex-input-extraction) will still be
applied, filling missing G, B, or A components with (0,0,1).

Accesses via `OpCooperativeMatrixLoadNV` and
`OpCooperativeMatrixStoreNV` are only bounds checked in the above manner
if the [`VkPhysicalDeviceCooperativeMatrixFeaturesNV`::`cooperativeMatrixRobustBufferAccess`](features.html#features-cooperativeMatrixRobustBufferAccessNV)
feature is enabled.

Accesses via `OpCooperativeMatrixLoadKHR` and
`OpCooperativeMatrixStoreKHR` are only bounds checked in the above manner
if the [`VkPhysicalDeviceCooperativeMatrixFeaturesKHR`::`cooperativeMatrixRobustBufferAccess`](features.html#features-cooperativeMatrixRobustBufferAccess)
feature is enabled.

Accesses using `OpCooperativeVector*` instructions are not
bounds-checked.

Sampling operations on an image descriptor are always well-defined when
coordinates exceeding the dimensions specified for the descriptor are
accessed, as described in the [Wrapping Operation](textures.html#textures-wrapping-operation) section.

Robust image access **can** be enabled by
specifying [VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS](pipelines.html#VkPipelineRobustnessImageBehaviorEXT)
in [VkPipelineRobustnessCreateInfo](pipelines.html#VkPipelineRobustnessCreateInfo), or specifying
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT](pipelines.html#VkPipelineRobustnessImageBehaviorEXT) and enabling the
the [`robustImageAccess`](features.html#features-robustImageAccess) feature.

If robust image access is enabled, accesses to image descriptors are bounds
checked against the image view dimensions specified for the descriptor.

Writes or atomic read-modify-write operations to a storage image outside of
the checked dimensions will not modify any memory.

Reads, atomic read-modify-write operations, or fetches from images outside
of the checked dimensions will return zero values, with (0,0,1) or
(0,0,0) values [inserted for missing G, B, or A components](images.html#images-component-substitution) based on the format.

If a value was previously written to the same out of bounds location in the
same shader invocation, that value **may** be returned instead; using
the `VolatileTexel` image operand, the `Volatile` memory semantic, or
the `Volatile` decoration to load the value will prevent prior stored
values from being returned.

|  | This is largely identical to [Robust Image Access](#shaders-robust-image-access); the only
| --- | --- |
difference being that the alpha channel must be replaced with 1, rather than
1 or 0, for out of bounds texel access. |

Robust image access 2 **can** be enabled by
specifying [VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2](pipelines.html#VkPipelineRobustnessImageBehaviorEXT)
in [VkPipelineRobustnessCreateInfo](pipelines.html#VkPipelineRobustnessCreateInfo), or specifying
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT](pipelines.html#VkPipelineRobustnessImageBehaviorEXT) and enabling the
the [`robustImageAccess2`](features.html#features-robustImageAccess2) feature.

If robust image access 2 is enabled, accesses to image descriptors are
bounds checked against the image view dimensions specified for the
descriptor.

Writes or atomic read-modify-write operations to a storage image outside of
the checked dimensions will not modify any memory.

Reads, atomic read-modify-write operations, or fetches from images outside
of the checked dimensions will return zero values, with (0,0,1) values
[inserted for missing G, B, or A components](images.html#images-component-substitution)
based on the format.

If a value was previously written to the same out of bounds location in the
same shader invocation, that value **may** be returned instead; using
the `VolatileTexel` image operand, the `Volatile` memory semantic, or
the `Volatile` decoration to load the value will prevent prior stored
values from being returned.

The order in which image or buffer memory is read or written by shaders is
largely **undefined**.
For some shader types (vertex, tessellation evaluation, and in some cases,
fragment), even the number of shader invocations that **may** perform loads and
stores is **undefined**.

In particular, the following rules apply:

* 
[Vertex](#shaders-vertex-execution) and
[tessellation evaluation](#shaders-tessellation-evaluation-execution)
shaders will be invoked at least once for each unique vertex, as defined
in those sections.

* 
[Fragment](fragops.html#fragops-shader) shaders will be invoked zero or more times,
as defined in that section.

* 
The relative execution order of invocations of the same shader type is
**undefined**.
A store issued by a shader when working on primitive B might complete
prior to a store for primitive A, even if primitive A is specified prior
to primitive B. This applies even to fragment shaders; while fragment
shader outputs are always written to the framebuffer in
[rasterization order](primsrast.html#primsrast-order), stores executed by fragment
shader invocations are not.

* 
The relative execution order of invocations of different shader types is
largely **undefined**.

|  | The above limitations on shader invocation order make some forms of
| --- | --- |
synchronization between shader invocations within a single set of primitives
unimplementable.
For example, having one invocation poll memory written by another invocation
assumes that the other invocation has been launched and will complete its
writes in finite time. |

The [Memory Model](../appendices/memorymodel.html#memory-model) appendix defines the terminology and rules
for how to correctly communicate between shader invocations, such as when a
write is [Visible-To](../appendices/memorymodel.html#memory-model-visible-to) a read, and what constitutes
a [Data Race](../appendices/memorymodel.html#memory-model-access-data-race).
Applications **must** not cause a data race.

Data is passed into and out of shaders using variables with input or output
storage class, respectively.
User-defined inputs and outputs are connected between stages by matching
their `Location` decorations.
Additionally, data **can** be provided by or communicated to special functions
provided by the execution environment using `BuiltIn` decorations.

In many cases, the same `BuiltIn` decoration **can** be used in multiple
shader stages with similar meaning.
The specific behavior of variables decorated as `BuiltIn` is documented
in the following sections.

Task shaders operate in conjunction with the mesh shaders to produce a
collection of primitives that will be processed by subsequent stages of the
graphics pipeline.
Its primary purpose is to create a variable amount of subsequent mesh shader
invocations.

Task shaders are invoked via the execution of the
[programmable mesh shading](drawing.html#drawing-mesh-shading) pipeline.

The task shader has no fixed-function inputs other than variables
identifying the specific workgroup and invocation.
In the `TaskNV` `Execution` `Model` the number of mesh shader workgroups to
create is specified via a `TaskCountNV` decorated output variable.
In the `TaskEXT` `Execution` `Model` the number of mesh shader workgroups to
create is specified via the `OpEmitMeshTasksEXT` instruction.

The task shader can write additional outputs to task memory, which can be
read by all of the mesh shader workgroups it created.

Task workloads are formed from groups of work items called workgroups and
processed by the task shader in the current graphics pipeline.
A workgroup is a collection of shader invocations that execute the same
shader, potentially in parallel.
Task shaders execute in *global workgroups* which are divided into a number
of *local workgroups* with a size that **can** be set by assigning a value to
the `LocalSize`
or `LocalSizeId`
execution mode or via an object decorated by the `WorkgroupSize`
decoration.
An invocation within a local workgroup **can** share data with other members of
the local workgroup through shared variables and issue memory and control
flow barriers to synchronize with other members of the local workgroup.
If the subpass includes multiple views in its view mask, a Task shader using
`TaskEXT` `Execution` `Model` **may** be invoked separately for each view.

Mesh shaders operate in workgroups to produce a collection of primitives
that will be processed by subsequent stages of the graphics pipeline.
Each workgroup emits zero or more output primitives and the group of
vertices and their associated data required for each output primitive.

Mesh shaders are invoked via the execution of the
[programmable mesh shading](drawing.html#drawing-mesh-shading) pipeline.

The only inputs available to the mesh shader are variables identifying the
specific workgroup and invocation and, if applicable, any outputs written to
task memory by the task shader that spawned the mesh shader’s workgroup.
The mesh shader can operate without a task shader as well.

The invocations of the mesh shader workgroup write an output mesh,
comprising a set of primitives with per-primitive attributes, a set of
vertices with per-vertex attributes, and an array of indices identifying the
mesh vertices that belong to each primitive.
The primitives of this mesh are then processed by subsequent graphics
pipeline stages, where the outputs of the mesh shader form an interface with
the fragment shader.

Mesh workloads are formed from groups of work items called workgroups and
processed by the mesh shader in the current graphics pipeline.
A workgroup is a collection of shader invocations that execute the same
shader, potentially in parallel.
Mesh shaders execute in *global workgroups* which are divided into a number
of *local workgroups* with a size that **can** be set by assigning a value to
the `LocalSize`
or `LocalSizeId`
execution mode or via an object decorated by the `WorkgroupSize`
decoration.
An invocation within a local workgroup **can** share data with other members of
the local workgroup through shared variables and issue memory and control
flow barriers to synchronize with other members of the local workgroup.

The *global workgroups* may be generated explicitly via the API, or
implicitly through the task shader’s work creation mechanism.
If the subpass includes multiple views in its view mask, a Mesh shader using
`MeshEXT` `Execution` `Model` **may** be invoked separately for each view.

Cluster Culling shaders are invoked via the execution of the
[Programmable Cluster Culling Shading](drawing.html#drawing-cluster-culling-shading)
pipeline.

The only inputs available to the cluster culling shader are variables
identifying the specific workgroup and invocation.

Cluster Culling shaders operate in workgroups to perform cluster-based
culling and produce zero or more cluster drawing command that will be
processed by subsequent stages of the graphics pipeline.

The Cluster Drawing Command (CDC) is very similar to the MDI command,
invocations in workgroup can emit zero of more CDC to draw zero or more
visible cluster.

Cluster Culling workloads are formed from groups of work items called
workgroups and processed by the cluster culling shader in the current
graphics pipeline.
A workgroup is a collection of shader invocations that execute the same
shader, potentially in parallel.
Cluster Culling shaders execute in *global workgroups* which are divided
into a number of *local workgroups* with a size that **can** be set by
assigning a value to the `LocalSize`
or `LocalSizeId`
execution mode or via an object decorated by the `WorkgroupSize`
decoration.
An invocation within a local workgroup **can** share data with other members of
the local workgroup through shared variables and issue memory and control
flow barriers to synchronize with other members of the local workgroup.

Each vertex shader invocation operates on one vertex and its associated
[vertex attribute](fxvertex.html#fxvertex-attrib) data, and outputs one vertex and
associated data.
Graphics pipelines using primitive shading **must** include a vertex shader,
and the vertex shader stage is always the first shader stage in the graphics
pipeline.

A vertex shader **must** be executed at least once for each vertex specified by
a drawing command.
If the subpass includes multiple views in its view mask, the shader **may** be
invoked separately for each view.
During execution, the shader is presented with the index of the vertex and
instance for which it has been invoked.
Input variables declared in the vertex shader are filled by the
implementation with the values of vertex attributes associated with the
invocation being executed.

If the same vertex is specified multiple times in a drawing command (e.g. by
including the same index value multiple times in an index buffer) the
implementation **may** reuse the results of vertex shading if it can statically
determine that the vertex shader invocations will produce identical results.

|  | It is implementation-dependent when and if results of vertex shading are
| --- | --- |
reused, and thus how many times the vertex shader will be executed.
This is true also if the vertex shader contains stores or atomic operations
(see [`vertexPipelineStoresAndAtomics`](features.html#features-vertexPipelineStoresAndAtomics)). |

The tessellation control shader is used to read an input patch provided by
the application and to produce an output patch.
Each tessellation control shader invocation operates on an input patch
(after all control points in the patch are processed by a vertex shader) and
its associated data, and outputs a single control point of the output patch
and its associated data, and **can** also output additional per-patch data.
The input patch is sized according to the `patchControlPoints` member of
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo), as part of input assembly.

The input patch can also be dynamically sized with `patchControlPoints`
parameter of [vkCmdSetPatchControlPointsEXT](#vkCmdSetPatchControlPointsEXT).

To [dynamically set](pipelines.html#pipelines-dynamic-state) the number of control points
per patch, call:

// Provided by VK_EXT_extended_dynamic_state2, VK_EXT_shader_object
void vkCmdSetPatchControlPointsEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    patchControlPoints);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`patchControlPoints` specifies the number of control points per
patch.

This command sets the number of control points per patch for subsequent
drawing commands
when drawing using [shader objects](#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](pipelines.html#VkDynamicState) set in
[VkPipelineDynamicStateCreateInfo](pipelines.html#VkPipelineDynamicStateCreateInfo)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo)::`patchControlPoints` value
used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-None-09422) VUID-vkCmdSetPatchControlPointsEXT-None-09422

At least one of the following **must** be true:

The [`extendedDynamicState2PatchControlPoints`](#features-extendedDynamicState2PatchControlPoints) feature is
enabled

* 
The [`shaderObject`](features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetPatchControlPointsEXT-patchControlPoints-04874) VUID-vkCmdSetPatchControlPointsEXT-patchControlPoints-04874

`patchControlPoints` **must** be greater than zero and less than or
equal to `VkPhysicalDeviceLimits`::`maxTessellationPatchSize`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-parameter) VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-recording) VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-cmdpool) VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-videocoding) VUID-vkCmdSetPatchControlPointsEXT-videocoding

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

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetPatchControlPointsEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The size of the output patch is controlled by the `OpExecutionMode`
`OutputVertices` specified in the tessellation control or tessellation
evaluation shaders, which **must** be specified in at least one of the shaders.
The size of the input and output patches **must** each be greater than zero and
less than or equal to
`VkPhysicalDeviceLimits`::`maxTessellationPatchSize`.

A tessellation control shader is invoked at least once for each *output*
vertex in a patch.
If the subpass includes multiple views in its view mask, the shader **may** be
invoked separately for each view.

Inputs to the tessellation control shader are generated by the vertex
shader.
Each invocation of the tessellation control shader **can** read the attributes
of any incoming vertices and their associated data.
The invocations corresponding to a given patch execute logically in
parallel, with **undefined** relative execution order.
However, the `OpControlBarrier` instruction **can** be used to provide
limited control of the execution order by synchronizing invocations within a
patch, effectively dividing tessellation control shader execution into a set
of phases.
Tessellation control shaders will read **undefined** values if one invocation
reads a per-vertex or per-patch output written by another invocation at any
point during the same phase, or if two invocations attempt to write
different values to the same per-patch output in a single phase.

The Tessellation Evaluation Shader operates on an input patch of control
points and their associated data, and a single input barycentric coordinate
indicating the invocation’s relative position within the subdivided patch,
and outputs a single vertex and its associated data.

A tessellation evaluation shader is invoked at least once for each unique
vertex generated by the tessellator.
If the subpass includes multiple views in its view mask, the shader **may** be
invoked separately for each view.

The geometry shader operates on a group of vertices and their associated
data assembled from a single input primitive, and emits zero or more output
primitives and the group of vertices and their associated data required for
each output primitive.

A geometry shader is invoked at least once for each primitive produced by
the tessellation stages, or at least once for each primitive generated by
[primitive assembly](drawing.html#drawing) when tessellation is not in use.
A shader can request that the geometry shader runs multiple
[instances](geometry.html#geometry-invocations).
A geometry shader is invoked at least once for each instance.
If the subpass includes multiple views in its view mask, the shader **may** be
invoked separately for each view.

Fragment shaders are invoked as a [fragment operation](fragops.html#fragops-shader) in
a graphics pipeline.
Each fragment shader invocation operates on a single fragment and its
associated data.
With few exceptions, fragment shaders do not have access to any data
associated with other fragments and are considered to execute in isolation
of fragment shader invocations associated with other fragments.

Compute shaders are invoked via [dispatching commands](dispatch.html#dispatch).
In general, they have access to similar resources as shader stages executing
as part of a graphics pipeline.

Compute workloads are formed from groups of work items called workgroups and
processed by the compute shader in the current compute pipeline.
A workgroup is a collection of shader invocations that execute the same
shader, potentially in parallel.
Compute shaders execute in *global workgroups* which are divided into a
number of *local workgroups* with a size that **can** be set by assigning a
value to the `LocalSize`
or `LocalSizeId`
execution mode or via an object decorated by the `WorkgroupSize`
decoration.
An invocation within a local workgroup **can** share data with other members of
the local workgroup through shared variables and issue memory and control
flow barriers to synchronize with other members of the local workgroup.

A ray generation shader is similar to a compute shader.
Its main purpose is to execute ray tracing queries using
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions (such as
`OpTraceRayKHR`) and process the results.

One ray generation shader is executed per ray tracing dispatch.
Its location in the shader binding table (see [Shader Binding Table](raytracing.html#shader-binding-table) for details) is passed directly into
[vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR) using the `pRaygenShaderBindingTable` parameter
or
[vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV) using the `raygenShaderBindingTableBuffer` and
`raygenShaderBindingOffset` parameters
.

Intersection shaders enable the implementation of arbitrary, application
defined geometric primitives.
An intersection shader for a primitive is executed whenever its axis-aligned
bounding box is hit by a ray.

Like other ray tracing shader domains, an intersection shader operates on a
single ray at a time.
It also operates on a single primitive at a time.
It is therefore the purpose of an intersection shader to compute the
ray-primitive intersections and report them.
To report an intersection, the shader calls the `OpReportIntersectionKHR`
instruction.

An intersection shader communicates with any-hit and closest shaders by
generating attribute values that they **can** read.
Intersection shaders **cannot** read or modify the ray payload.

The order in which intersections are found along a ray, and therefore the
order in which intersection shaders are executed, is unspecified.

The intersection shader of the closest AABB which intersects the ray is
guaranteed to be executed at some point during traversal, unless the ray is
forcibly terminated.

The any-hit shader is executed after the intersection shader reports an
intersection that lies within the current [tmin,tmax] of the ray.
The main use of any-hit shaders is to programmatically decide whether or not
an intersection will be accepted.
The intersection will be accepted unless the shader calls the
`OpIgnoreIntersectionKHR` instruction.
Any-hit shaders have read-only access to the attributes generated by the
corresponding intersection shader, and **can** read or modify the ray payload.

The order in which intersections are found along a ray, and therefore the
order in which any-hit shaders are executed, is unspecified.

The any-hit shader of the closest hit is guaranteed to be executed at some
point during traversal, unless the ray is forcibly terminated.

Closest hit shaders have read-only access to the attributes generated by the
corresponding intersection shader, and **can** read or modify the ray payload.
They also have access to a number of system-generated values.
Closest hit shaders **can** call [pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions to recursively trace rays.

Exactly one closest hit shader is executed when traversal is finished and an
intersection has been found and accepted.

Miss shaders **can** access the ray payload and **can** trace new rays through the
[pipeline trace ray](../appendices/glossary.html#glossary-pipeline-trace-ray) instructions, but
**cannot** access attributes since they are not associated with an
intersection.

A miss shader is executed instead of a closest hit shader if no intersection
was found during traversal.

Callable shaders **can** access a callable payload that works similarly to ray
payloads to do subroutine work.

A callable shader is executed by calling `OpExecuteCallableKHR` from an
allowed shader stage.

Variables in the `Input` storage class in a fragment shader’s interface
are interpolated from the values specified by the primitive being
rasterized.

|  | Interpolation decorations can be present on input and output variables in
| --- | --- |
pre-rasterization shaders but have no effect on the interpolation performed. |

An undecorated input variable will be interpolated with perspective-correct
interpolation according to the primitive type being rasterized.
[Lines](primsrast.html#line_perspective_interpolation) and
[polygons](primsrast.html#triangle_perspective_interpolation) are interpolated in the same
way as the primitive’s clip coordinates.
If the `NoPerspective` decoration is present, linear interpolation is
instead used for [lines](primsrast.html#line_linear_interpolation) and
[polygons](primsrast.html#triangle_linear_interpolation).
For points, as there is only a single vertex, input values are never
interpolated and instead take the value written for the single vertex.

If the `Flat` decoration is present on an input variable, the value is
not interpolated, and instead takes its value directly from the
[provoking vertex](vertexpostproc.html#vertexpostproc-flatshading).
Fragment shader inputs that are signed or unsigned integers, integer
vectors, or any double-precision floating-point type **must** be decorated with
`Flat`.

Interpolation of input variables is performed at an implementation-defined
position within the fragment area being shaded.
The position is further constrained as follows:

* 
If the `Centroid` decoration is used, the interpolation position used
for the variable **must** also fall within the bounds of the primitive
being rasterized.

* 
If the `Sample` decoration is used, the interpolation position used
for the variable **must** be at the position of the sample being shaded by
the current fragment shader invocation.

* 
If a sample count of 1 is used,
and the
[`sampleLocationSampleCounts`](limits.html#limits-sampleLocationSampleCounts)
limit includes [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), the interpolation position
**must** be at the position of the sample being shaded by the current
fragment shader invocation.

* 
If a sample count of 1 is used and [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) is not
advertised in the
[`sampleLocationSampleCounts`](limits.html#limits-sampleLocationSampleCounts)
limit,
the interpolation position **must** be at the center of the fragment area.

|  | As `Centroid` constrains the interpolation position to lie within the
| --- | --- |
covered area of the primitive, using it may cause the position to differ
between neighboring fragments when it otherwise would not.
Derivatives calculated based on these differing locations can produce
inconsistent results compared to undecorated inputs.
Thus using `Centroid` with input variables used in derivative
calculations is not recommended. |

If the `PerVertexKHR` decoration is present on an input variable, the
value is not interpolated, and instead values from all input vertices are
available in an array.
Each index of the array corresponds to one of the vertices of the primitive
that produced the fragment.

If the `CustomInterpAMD` decoration is present on an input variable, the
value **cannot** be accessed directly; instead the extended instruction
`InterpolateAtVertexAMD` **must** be used to obtain values from the input
vertices.

Variables in the `PushConstant` storage class **can** be decorated with
additional parameters to control their placement and behavior within push
constant banks.

The `BankNV` decoration specifies which hardware push constant bank a
variable or block should be placed in.
When present on a push constant variable or block, it indicates the hardware
bank index to use for accessing the push constant data.
When BankNV is absent, it behaves as if the value is 0.

The `MemberOffsetNV` decoration specifies an additional offset within a
push constant bank for push constant variables or blocks.
This decoration allows control over the placement of push constants within
the specified bank, enabling more efficient memory layout and access
patterns.
When MemberOffsetNV is absent, it behaves as if the value is 0.

A SPIR-V module declares a global object in memory using the `OpVariable`
or `OpUntypedVariableKHR`
instruction, which results in a pointer `x` to that object.
A specific entry point in a SPIR-V module is said to *statically use* that
object if that entry point’s call tree contains a function containing a
instruction with `x` as an `id` operand.
A shader entry point also *statically uses* any variables explicitly
declared in its interface.

A *scope* describes a set of shader invocations, where each such set is a
*scope instance*.
Each invocation belongs to one or more scope instances, but belongs to no
more than one scope instance for each scope.

The operations available between invocations in a given scope instance vary,
with smaller scopes generally able to perform more operations, and with
greater efficiency.

All invocations executed in a Vulkan instance fall into a single *cross
device scope instance*.

Whilst the `CrossDevice` scope is defined in SPIR-V, it is disallowed in
Vulkan.
API [synchronization](synchronization.html#synchronization) commands **can** be used to
communicate between devices.

All invocations executed on a single device form a *device scope instance*.

If the [`vulkanMemoryModel`](features.html#features-vulkanMemoryModel) and
[`vulkanMemoryModelDeviceScope`](features.html#features-vulkanMemoryModelDeviceScope) features are enabled, this scope is
represented in SPIR-V by the `Device` `Scope`, which **can** be used as a
`Memory` `Scope` for barrier and atomic operations.

If both the [`shaderDeviceClock`](features.html#features-shaderDeviceClock) and
[`vulkanMemoryModelDeviceScope`](features.html#features-vulkanMemoryModelDeviceScope) features are enabled, using the
`Device` `Scope` with the `OpReadClockKHR` instruction will read
from a clock that is consistent across invocations in the same device scope
instance.

There is no method to synchronize the execution of these invocations within
SPIR-V, and this **can** only be done with API synchronization primitives.

Invocations executing on different devices in a device group operate in
separate device scope instances.

Invocations executed by queues in a given queue family form a *queue family
scope instance*.

This scope is identified in SPIR-V as the
`QueueFamily` `Scope` if the [`vulkanMemoryModel`](features.html#features-vulkanMemoryModel) feature is enabled, or if not, the
`Device` `Scope`, which **can** be used as a `Memory` `Scope` for
barrier and atomic operations.

If the [`shaderDeviceClock`](features.html#features-shaderDeviceClock) feature is
enabled,
but the [`vulkanMemoryModelDeviceScope`](features.html#features-vulkanMemoryModelDeviceScope) feature is not enabled,
using the `Device` `Scope` with the `OpReadClockKHR` instruction
will read from a clock that is consistent across invocations in the same
queue family scope instance.

There is no method to synchronize the execution of these invocations within
SPIR-V, and this **can** only be done with API synchronization primitives.

Each invocation in a queue family scope instance **must** be in the same
[device scope instance](#shaders-scope-device).

Any shader invocations executed as the result of a single command such as
[vkCmdDispatch](dispatch.html#vkCmdDispatch)
or [vkCmdDraw](drawing.html#vkCmdDraw)
form a *command scope instance*.
For indirect drawing commands with `drawCount` greater than one,
invocations from separate draws are in separate command scope instances.
For ray tracing shaders, an invocation group is an implementation-dependent
subset of the set of shader invocations of a given shader stage which are
produced by a single trace rays command.

There is no specific `Scope` for communication across invocations in a
command scope instance.
As this has a clear boundary at the API level, coordination here **can** be
performed in the API, rather than in SPIR-V.

Each invocation in a command scope instance **must** be in the same
[queue-family scope instance](#shaders-scope-queue-family).

For shaders without defined [workgroups](#shaders-scope-workgroup), this
set of invocations forms an *invocation group* as defined in the
[SPIR-V specification](introduction.html#spirv-spec).

Any fragment shader invocations executed as the result of rasterization of a
single primitive form a *primitive scope instance*.

There is no specific `Scope` for communication across invocations in a
primitive scope instance.

Any generated [helper invocations](#shaders-helper-invocations) are
included in this scope instance.

Each invocation in a primitive scope instance **must** be in the same
[command scope instance](#shaders-scope-command).

Any input variables decorated with `Flat` are uniform within a primitive
scope instance.

Any [shader-call-related](../appendices/memorymodel.html#shader-call-related) invocations that are
executed in one or more ray tracing execution models form a *shader call
scope instance*.

The `ShaderCallKHR` `Scope` can be used as `Memory` `Scope` for
barrier and atomic operations.

Each invocation in a shader call scope instance **must** be in the same
[queue family scope instance](#shaders-scope-queue-family).

A *local workgroup* is a set of invocations that can synchronize and share
data with each other using memory in the `Workgroup` storage class.

The `Workgroup` `Scope` can be used as both an `Execution`
`Scope` and `Memory` `Scope` for barrier and atomic operations.

Each invocation in a local workgroup **must** be in the same
[command scope instance](#shaders-scope-command).

Only
task, mesh, and
compute shaders have defined workgroups - other shader types **cannot** use
workgroup functionality.
For shaders that have defined workgroups, this set of invocations forms an
*invocation group* as defined in the [SPIR-V specification](introduction.html#spirv-spec).

When variables declared with the `Workgroup` storage class are explicitly
laid out (hence they are also decorated with `Block`), the amount of
storage consumed is the size of the largest Block variable, not counting any
padding at the end.
The amount of storage consumed by the
non-Block
variables declared with the `Workgroup` storage class is
implementation-dependent.
However, the amount of storage consumed may not exceed the largest block
size that would be obtained if all active
non-Block
variables declared with `Workgroup` storage class were assigned offsets
in an arbitrary order by successively taking the smallest valid offset
according to the [Standard Storage Buffer Layout](interfaces.html#interfaces-resources-standard-layout) rules, and with `Boolean` values considered as 32-bit
integer values for the purpose of this calculation.
(This is equivalent to using the GLSL std430 layout rules.)

A *subgroup* (see the subsection “Control Flow” of section 2 of the SPIR-V
1.3 Revision 1 specification) is a set of invocations that can synchronize
and share data with each other efficiently.

The `Subgroup` `Scope` can be used as both an `Execution`
`Scope` and `Memory` `Scope` for barrier and atomic operations.
Other [subgroup features](limits.html#VkSubgroupFeatureFlagBits) allow the use of
[group operations](#shaders-group-operations) with subgroup scope.

If the [`shaderSubgroupClock`](features.html#features-shaderSubgroupClock) feature
is enabled, using the `Subgroup` `Scope` with the `OpReadClockKHR`
instruction will read from a clock that is consistent across invocations in
the same subgroup.

For [shaders that have defined workgroups](#shaders-scope-workgroup), each
invocation in a subgroup **must** be in the same [local workgroup](#shaders-scope-workgroup).

In other shader stages, each invocation in a subgroup **must** be in the same
[device scope instance](#shaders-scope-device).

Only [shader stages that support subgroup operations](devsandqueues.html#limits-subgroupSupportedStages) have defined subgroups.

|  | Subgroups are not guaranteed to be a subset of a single command in
| --- | --- |
[shaders that do not have defined workgroups](#shaders-scope-workgroup).
Values that are guaranteed to be uniform for a given command or sub command
may then not be uniform for the subgroup, and vice versa.
As such, applications must take care when dealing with mixed uniformity.

A somewhat common example of this would something like trying to optimize
access to per-draw data using subgroup operations:

buffer { uint draw_data[]; };

flat in int vDrawID; // Passed through from vertex shader

void main()
{
    uint local_draw_data = subgroupBroadcastFirst(draw_data[local_draw_data]);
}

This can be done in an attempt to optimize the shader to only perform the
loads once per subgroup.
However, if the implementation packs multiple draws into a single subgroup,
invocations from draws with a different drawID are now receiving data from
the wrong invocation.
Applications should rely on implementations to do this kind of optimization
automatically where the implementation can, rather than trying to force it. |

A *quad scope instance* is formed of four shader invocations.

In a fragment shader, each invocation in a quad scope instance is formed of
invocations in neighboring framebuffer locations (xi, yi), where:

* 
i is the index of the invocation within the scope instance.

* 
w and h are the number of pixels the fragment covers in the
x and y axes.

* 
w and h are identical for all participating invocations.

* 
(x0) = (x1 - w) = (x2) = (x3 - w)

* 
(y0) = (y1) = (y2 - h) = (y3 - h)

* 
Each invocation has the same layer and sample indices.

In a
mesh, task, or
compute shader, if the `DerivativeGroupQuadsKHR` execution mode is
specified, each invocation in a quad scope instance is formed of invocations
with adjacent local invocation IDs (xi, yi), where:

* 
i is the index of the invocation within the quad scope instance.

* 
(x0) = (x1 - 1) = (x2) = (x3 - 1)

* 
(y0) = (y1) = (y2 - 1) = (y3 - 1)

* 
x0 and y0 are integer multiples of 2.

* 
Each invocation has the same z coordinate.

In a
mesh, task, or
compute shader, if the `DerivativeGroupLinearKHR` execution mode is
specified, each invocation in a quad scope instance is formed of invocations
with adjacent local invocation indices (li), where:

* 
i is the index of the invocation within the quad scope instance.

* 
(l0) = (l1 - 1) = (l2 - 2) = (l3 - 3)

* 
l0 is an integer multiple of 4.

In all shaders, each invocation in a quad scope instance is formed of
invocations in adjacent subgroup invocation indices (si), where:

* 
i is the index of the invocation within the quad scope instance.

* 
(s0) = (s1 - 1) = (s2 - 2) = (s3 - 3)

* 
s0 is an integer multiple of 4.

Each invocation in a quad scope instance **must** be in the same
[subgroup](#shaders-scope-subgroup).

In a fragment shader, each invocation in a quad scope instance **must** be in
the same [primitive scope instance](#shaders-scope-primitive).

Fragment
, mesh, task,
and compute
shaders have defined quad scope instances.
If the [`quadOperationsInAllStages`](devsandqueues.html#limits-subgroupQuadOperationsInAllStages) limit is supported, any
[shader stages that support subgroup operations](devsandqueues.html#limits-subgroupSupportedStages) also have defined quad scope instances.

A *fragment interlock scope instance* is formed of fragment shader
invocations based on their framebuffer locations (x,y,layer,sample),
executed by commands inside a single [subpass](renderpass.html#renderpass).

The specific set of invocations included varies based on the execution mode
as follows:

* 
If the `SampleInterlockOrderedEXT` or
`SampleInterlockUnorderedEXT` execution modes are used, only
invocations with identical framebuffer locations
(x,y,layer,sample) are included.

* 
If the `PixelInterlockOrderedEXT` or `PixelInterlockUnorderedEXT`
execution modes are used, fragments with different sample ids are also
included.

* 
If the `ShadingRateInterlockOrderedEXT` or
    `ShadingRateInterlockUnorderedEXT` execution modes are used,
    fragments from neighboring framebuffer locations are also included.
    The
[shading rate image](primsrast.html#primsrast-shading-rate-image)
or
[fragment shading rate](primsrast.html#primsrast-fragment-shading-rate)
    determines these fragments.

Only fragment shaders with one of the above execution modes have defined
fragment interlock scope instances.

There is no specific `Scope` value for communication across invocations
in a fragment interlock scope instance.
However, this is implicitly used as a memory scope by
`OpBeginInvocationInterlockEXT` and `OpEndInvocationInterlockEXT`.

Each invocation in a fragment interlock scope instance **must** be in the same
[queue family scope instance](#shaders-scope-queue-family).

The smallest *scope* is a single invocation; this is represented by the
`Invocation` `Scope` in SPIR-V.

Fragment shader invocations **must** be in a [primitive scope instance](#shaders-scope-primitive).

Invocations in [fragment shaders that have a defined fragment interlock scope](#shaders-scope-fragment-interlock) **must** be in a
[fragment interlock scope instance](#shaders-scope-fragment-interlock).

Invocations in [shaders that have defined workgroups](#shaders-scope-workgroup) **must** be in a [local workgroup](#shaders-scope-workgroup).

Invocations in [shaders that have a defined subgroup scope](#shaders-scope-subgroup) **must** be in a [subgroup](#shaders-scope-subgroup).

Invocations in [shaders that have a defined quad scope](#shaders-scope-quad) **must** be in a [quad scope instance](#shaders-scope-quad).

All invocations in all stages **must** be in a [command scope instance](#shaders-scope-command).

*Group operations* are executed by multiple invocations within a
[scope instance](#shaders-scope); with each invocation involved in
calculating the result.
This provides a mechanism for efficient communication between invocations in
a particular scope instance.

Group operations all take a `Scope` defining the desired
[scope instance](#shaders-scope) to operate within.
Only the `Subgroup` scope **can** be used for these operations; the
[`subgroupSupportedOperations`](devsandqueues.html#limits-subgroupSupportedOperations)
limit defines which types of operation **can** be used.

Basic group operations include the use of `OpGroupNonUniformElect`,
`OpControlBarrier`, `OpMemoryBarrier`, and atomic operations.

`OpGroupNonUniformElect` **can** be used to choose a single invocation to
perform a task for the whole group.
Only the invocation with the lowest id in the group will return `true`.

The [Memory Model](../appendices/memorymodel.html#memory-model) appendix defines the operation of barriers
and atomics.

The vote group operations allow invocations within a group to compare values
across a group.
The types of votes enabled are:

* 
Do all active group invocations agree that an expression is true?

* 
Do any active group invocations evaluate an expression to true?

* 
Do all active group invocations have the same value of an expression?

|  | These operations are useful in combination with control flow in that they
| --- | --- |
allow for developers to check whether conditions match across the group and
choose potentially faster code-paths in these cases. |

The arithmetic group operations allow invocations to perform scans and
reductions across a group.
The operators supported are add, mul, min, max, and, or, xor.

For reductions, every invocation in a group will obtain the cumulative
result of these operators applied to all values in the group.
For exclusive scans, each invocation in a group will obtain the cumulative
result of these operators applied to all values in invocations with a lower
index in the group.
Inclusive scans are identical to exclusive scans, except the cumulative
result includes the operator applied to the value in the current invocation.

The order in which these operators are applied is implementation-dependent.

The ballot group operations allow invocations to perform more complex votes
across the group.
The ballot functionality allows all invocations within a group to provide a
boolean value and get as a result what each invocation provided as their
boolean value.
The broadcast functionality allows values to be broadcast from an invocation
to all other invocations within the group.

The shuffle group operations allow invocations to read values from other
invocations within a group.

The shuffle relative group operations allow invocations to read values from
other invocations within the group relative to the current invocation in the
group.
The relative operations supported allow data to be shifted up and down
through the invocations within a group.

The clustered group operations allow invocations to perform an operation
among partitions of a group, such that the operation is only performed
within the group invocations within a partition.
The partitions for clustered group operations are consecutive power-of-two
size groups of invocations and the cluster size **must** be known at pipeline
creation time.
The operations supported are add, mul, min, max, and, or, xor.

The rotate group operations allow invocations to read values from other
invocations within the group relative to the current invocation and modulo
the size of the group.
Clustered rotate group operations perform the same operation within
individual partitions of a group.

The partitions for clustered rotate group operations are consecutive
power-of-two size groups of invocations and the cluster size **must** be known
at pipeline creation time.

Quad group operations (`OpGroupNonUniformQuad*`) are a specialized type
of [group operations](#shaders-group-operations) that only operate on
[quad scope instances](#shaders-scope-quad).
Whilst these instructions do include a `Scope` parameter, this scope is
always overridden; only the [quad scope instance](#shaders-scope-quad) is
included in its execution scope.

Fragment shaders that statically execute either
`OpGroupNonUniformQuadBroadcast` or `OpGroupNonUniformQuadSwap` **must**
launch sufficient invocations to ensure their correct operation; additional
[helper invocations](#shaders-helper-invocations) are launched for
framebuffer locations not covered by rasterized fragments if necessary.

The index used to select participating invocations is i, as described
for a [quad scope instance](#shaders-scope-quad), defined as the *quad
index* in the [SPIR-V specification](introduction.html#spirv-spec).

For `OpGroupNonUniformQuadBroadcast` this value is equal to `Index`.
For `OpGroupNonUniformQuadSwap`, it is equal to the implicit `Index`
used by each participating invocation.

Derivative operations calculate the partial derivative for an expression
P as a function of an invocation’s x and y coordinates.

Derivative operations operate on a set of invocations known as a *derivative
group* as defined in the [SPIR-V specification](introduction.html#spirv-spec).

A derivative group in a fragment shader is equivalent to the
[quad scope instance](#shaders-scope-quad) if the `QuadDerivativesKHR`
execution mode is specified, otherwise it is equivalent to the
[primitive scope instance](#shaders-scope-primitive).
A derivative group in a
mesh, task, or
compute shader is equivalent to the [quad scope instance](#shaders-scope-quad).

Derivatives are calculated assuming that P is piecewise linear and
continuous within the derivative group.

The following control-flow restrictions apply to derivative operations:

* 
If the `QuadDerivativesKHR` execution mode is specified, dynamic
instances of any derivative operations **must** be executed in control flow
that is uniform within the current [quad scope    instance](#shaders-scope-quad).

* 
If the `QuadDerivativesKHR` execution mode is not specified:

dynamic instances of explicit derivative instructions (`OpDPdx*`,
`OpDPdy*`, and `OpFwidth*`) **must** be executed in control flow
that is uniform within a derivative group.

* 
dynamic instances of implicit derivative operations **can** be executed in
control flow that is not uniform within the derivative group, but
results are **undefined**.

Fragment shaders that statically execute derivative operations **must** launch
sufficient invocations to ensure their correct operation; additional
[helper invocations](#shaders-helper-invocations) are launched for
framebuffer locations not covered by rasterized fragments if necessary.

|  | In a
| --- | --- |
mesh, task, or
compute shader, it is the application’s responsibility to ensure that
sufficient invocations are launched. |

Derivative operations calculate their results as the difference between the
result of P across invocations in the quad.
For fine derivative operations (`OpDPdxFine` and `OpDPdyFine`), the
values of DPdx(Pi) are calculated as

DPdx(P0) = DPdx(P1) = P1 - P0

DPdx(P2) = DPdx(P3) = P3 - P2

and the values of DPdy(Pi) are calculated as

DPdy(P0) = DPdy(P2) = P2 - P0

DPdy(P1) = DPdy(P3) = P3 - P1

where i is the index of each invocation as described in
[Quad](#shaders-scope-quad).

Coarse derivative operations (`OpDPdxCoarse` and `OpDPdyCoarse`),
calculate their results in roughly the same manner, but **may** only calculate
two values instead of four (one for each of DPdx and DPdy),
reusing the same result no matter the originating invocation.
If an implementation does this, it **should** use the fine derivative
calculations described for P0.

|  | Derivative values are calculated between fragments rather than pixels.
| --- | --- |
If the fragment shader invocations involved in the calculation cover
multiple pixels, these operations cover a wider area, resulting in larger
derivative values.
This in turn will result in a coarser LOD being selected for image sampling
operations using derivatives.

Applications may want to account for this when using multi-pixel fragments;
if pixel derivatives are desired, applications should use explicit
derivative operations and divide the results by the size of the fragment in
each dimension as follows:

DPdx(Pn)' = DPdx(Pn) / w

DPdy(Pn)' = DPdy(Pn) / h

where w and h are the size of the fragments in the quad, and
DPdx(Pn)' and DPdy(Pn)' are the pixel derivatives. |

The results for `OpDPdx` and `OpDPdy` **may** be calculated as either
fine or coarse derivatives, with implementations favoring the most efficient
approach.
Implementations **must** choose coarse or fine consistently between the two.

Executing `OpFwidthFine`, `OpFwidthCoarse`, or `OpFwidth` is
equivalent to executing the corresponding `OpDPdx*` and `OpDPdy*`
instructions, taking the absolute value of the results, and summing them.

Executing an `OpImage*Sample*ImplicitLod` instruction is equivalent to
executing `OpDPdx`(`Coordinate`) and `OpDPdy`(`Coordinate`), and
passing the results as the `Grad` operands `dx` and `dy`.

|  | It is expected that using the `ImplicitLod` variants of sampling
| --- | --- |
functions will be substantially more efficient than using the
`ExplicitLod` variants with explicitly generated derivatives. |

When performing [derivative](#shaders-derivative-operations)
or [quad group](#shaders-quad-operations)
operations in a fragment shader, additional invocations **may** be spawned in
order to ensure correct results.
These additional invocations are known as *helper invocations* and **can** be
identified by a non-zero value in the `HelperInvocation` built-in.
Stores and atomics performed by helper invocations **must** not have any effect
on memory except for the `Function`, `Private` and `Output` storage
classes, and values returned by atomic instructions in helper invocations
are **undefined**.

|  | While storage to `Output` storage class has an effect even in helper
| --- | --- |
invocations, it does not mean that helper invocations have an effect on the
framebuffer.
`Output` variables in fragment shaders can be read from as well, and they
behave more like `Private` variables for the duration of the shader
invocation. |

If the `MaximallyReconvergesKHR` execution mode is applied to the entry
point, helper invocations **must** remain active for all instructions for the
lifetime of the quad scope instance they are a part of.
If the `MaximallyReconvergesKHR` execution mode is not applied to the
entry point, helper
invocations **may** be considered inactive for [group operations](#shaders-group-operations) other than [derivative](#shaders-derivative-operations)
and [quad group](#shaders-quad-operations) operations.
All invocations in a quad scope instance **may** become permanently inactive at
any point once the only remaining invocations in that quad scope instance
are helper invocations.

A *cooperative matrix* type is a SPIR-V type where the storage for and
computations performed on the matrix are spread across the invocations in a
scope instance.
These types give the implementation freedom in how to optimize matrix
multiplies.

SPIR-V defines the types and instructions, but does not specify rules about
what sizes/combinations are valid, and it is expected that different
implementations **may** support different sizes.

To enumerate the supported cooperative matrix types and operations, call:

// Provided by VK_KHR_cooperative_matrix
VkResult vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkCooperativeMatrixPropertiesKHR*           pProperties);

* 
`physicalDevice` is the physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative matrix properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeMatrixPropertiesKHR](#VkCooperativeMatrixPropertiesKHR) structures.

If `pProperties` is `NULL`, then the number of cooperative matrix
properties available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of cooperative matrix
properties available, at most `pPropertyCount` structures will be
written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available cooperative matrix
properties were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeMatrixPropertiesKHR](#VkCooperativeMatrixPropertiesKHR) structures

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

To enumerate additional supported cooperative matrix types and operations,
call:

// Provided by VK_NV_cooperative_matrix2
VkResult vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkCooperativeMatrixFlexibleDimensionsPropertiesNV* pProperties);

* 
`physicalDevice` is the physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative matrix properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](#VkCooperativeMatrixFlexibleDimensionsPropertiesNV) structures.

If `pProperties` is `NULL`, then the number of flexible dimensions
properties available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number flexible dimensions
properties available, at most `pPropertyCount` structures will be
written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available flexible dimensions
properties were returned.

If the
[`cooperativeMatrixFlexibleDimensions`](features.html#features-cooperativeMatrixFlexibleDimensions)
feature is not supported, the implementation **must** advertise zero
properties.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixFlexibleDimensionsPropertiesNV-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](#VkCooperativeMatrixFlexibleDimensionsPropertiesNV) structures

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

To enumerate the supported cooperative matrix types and operations, call:

// Provided by VK_NV_cooperative_matrix
VkResult vkGetPhysicalDeviceCooperativeMatrixPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkCooperativeMatrixPropertiesNV*            pProperties);

* 
`physicalDevice` is the physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative matrix properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeMatrixPropertiesNV](#VkCooperativeMatrixPropertiesNV) structures.

If `pProperties` is `NULL`, then the number of cooperative matrix
properties available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of cooperative matrix
properties available, at most `pPropertyCount` structures will be
written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available cooperative matrix
properties were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeMatrixPropertiesNV-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeMatrixPropertiesNV](#VkCooperativeMatrixPropertiesNV) structures

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

Each
[VkCooperativeMatrixPropertiesKHR](#VkCooperativeMatrixPropertiesKHR)
or
[VkCooperativeMatrixPropertiesNV](#VkCooperativeMatrixPropertiesNV)
structure describes a single supported combination of types for a matrix
multiply/add operation (
`OpCooperativeMatrixMulAddKHR`
or
`OpCooperativeMatrixMulAddNV`
).
The multiply **can** be described in terms of the following variables and types
(in SPIR-V pseudocode):

    %A is of type OpTypeCooperativeMatrixKHR %AType %scope %MSize %KSize %MatrixAKHR
    %B is of type OpTypeCooperativeMatrixKHR %BType %scope %KSize %NSize %MatrixBKHR
    %C is of type OpTypeCooperativeMatrixKHR %CType %scope %MSize %NSize %MatrixAccumulatorKHR
    %Result is of type OpTypeCooperativeMatrixKHR %ResultType %scope %MSize %NSize %MatrixAccumulatorKHR

    %Result = %A * %B + %C // using OpCooperativeMatrixMulAddKHR

    %A is of type OpTypeCooperativeMatrixNV %AType %scope %MSize %KSize
    %B is of type OpTypeCooperativeMatrixNV %BType %scope %KSize %NSize
    %C is of type OpTypeCooperativeMatrixNV %CType %scope %MSize %NSize
    %D is of type OpTypeCooperativeMatrixNV %DType %scope %MSize %NSize

    %D = %A * %B + %C // using OpCooperativeMatrixMulAddNV

A matrix multiply with these dimensions is known as an *MxNxK* matrix
multiply.

The `VkCooperativeMatrixPropertiesKHR` structure is defined as:

// Provided by VK_KHR_cooperative_matrix
typedef struct VkCooperativeMatrixPropertiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              MSize;
    uint32_t              NSize;
    uint32_t              KSize;
    VkComponentTypeKHR    AType;
    VkComponentTypeKHR    BType;
    VkComponentTypeKHR    CType;
    VkComponentTypeKHR    ResultType;
    VkBool32              saturatingAccumulation;
    VkScopeKHR            scope;
} VkCooperativeMatrixPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`MSize` is the number of rows in matrices `A`, `C`, and
`Result`.

* 
`KSize` is the number of columns in matrix `A` and rows in matrix
`B`.

* 
`NSize` is the number of columns in matrices `B`, `C`,
`Result`.

* 
`AType` is the component type of matrix `A`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`BType` is the component type of matrix `B`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`CType` is the component type of matrix `C`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`ResultType` is the component type of matrix `Result`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`saturatingAccumulation` indicates whether the
`SaturatingAccumulation` operand to `OpCooperativeMatrixMulAddKHR`
**must** be present or not.
If it is [VK_TRUE](fundamentals.html#VK_TRUE), the `SaturatingAccumulation` operand **must** be
present.
If it is [VK_FALSE](fundamentals.html#VK_FALSE), the `SaturatingAccumulation` operand **must**
not be present.

* 
`scope` is the scope of all the matrix types, of type
[VkScopeKHR](#VkScopeKHR).

If some types are preferred over other types (e.g. for performance), they
**should** appear earlier in the list enumerated by
[vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR](#vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR).

At least one entry in the list **must** have power of two values for all of
`MSize`, `KSize`, and `NSize`.

If the
[`cooperativeMatrixWorkgroupScope`](features.html#features-cooperativeMatrixWorkgroupScope)
feature is not supported,
`scope` **must** be [VK_SCOPE_SUBGROUP_KHR](#VkScopeNV).

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeMatrixPropertiesKHR-sType-sType) VUID-VkCooperativeMatrixPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCooperativeMatrixPropertiesKHR-pNext-pNext) VUID-VkCooperativeMatrixPropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

The `VkCooperativeMatrixFlexibleDimensionsPropertiesNV` structure is
defined as:

// Provided by VK_NV_cooperative_matrix2
typedef struct VkCooperativeMatrixFlexibleDimensionsPropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              MGranularity;
    uint32_t              NGranularity;
    uint32_t              KGranularity;
    VkComponentTypeKHR    AType;
    VkComponentTypeKHR    BType;
    VkComponentTypeKHR    CType;
    VkComponentTypeKHR    ResultType;
    VkBool32              saturatingAccumulation;
    VkScopeKHR            scope;
    uint32_t              workgroupInvocations;
} VkCooperativeMatrixFlexibleDimensionsPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`MGranularity` is the granularity of the number of rows in matrices
`A`, `C`, and `Result`.
The rows **must** be an integer multiple of this value.

* 
`KGranularity` is the granularity of columns in matrix `A` and
rows in matrix `B`.
The columns/rows **must** be an integer multiple of this value.

* 
`NGranularity` is the granularity of columns in matrices `B`,
`C`, `Result`.
The columns **must** be an integer multiple of this value.

* 
`AType` is the component type of matrix `A`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`BType` is the component type of matrix `B`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`CType` is the component type of matrix `C`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`ResultType` is the component type of matrix `Result`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`saturatingAccumulation` indicates whether the
`SaturatingAccumulation` operand to `OpCooperativeMatrixMulAddKHR`
**must** be present or not.
If it is [VK_TRUE](fundamentals.html#VK_TRUE), the `SaturatingAccumulation` operand **must** be
present.
If it is [VK_FALSE](fundamentals.html#VK_FALSE), the `SaturatingAccumulation` operand **must**
not be present.

* 
`scope` is the scope of all the matrix types, of type
[VkScopeKHR](#VkScopeKHR).

* 
`workgroupInvocations` is the number of invocations in the local
workgroup when this combination of values is supported.

Rather than explicitly enumerating a list of supported sizes,
`VkCooperativeMatrixFlexibleDimensionsPropertiesNV` advertises size
granularities, where the matrix **must** be a multiple of the advertised size.
The M and K granularities apply to rows and columns of matrices with
`Use` of `MatrixA`, K, and N apply to rows and columns of matrices
with `Use` of `MatrixB`, M, and N apply to rows and columns of
matrices with `Use` of `MatrixAccumulator`.

For a given type combination, if multiple workgroup sizes are supported
there **may** be multiple
`VkCooperativeMatrixFlexibleDimensionsPropertiesNV` structures with
different granularities.

All granularity values **must** be powers of two.

|  | Different A/B types may require different granularities but share the same
| --- | --- |
accumulator type.
In such a case, the supported granularity for a matrix with the accumulator
type would be the smallest advertised granularity. |

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeMatrixFlexibleDimensionsPropertiesNV-sType-sType) VUID-VkCooperativeMatrixFlexibleDimensionsPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_FLEXIBLE_DIMENSIONS_PROPERTIES_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCooperativeMatrixFlexibleDimensionsPropertiesNV-pNext-pNext) VUID-VkCooperativeMatrixFlexibleDimensionsPropertiesNV-pNext-pNext

 `pNext` **must** be `NULL`

The `VkCooperativeMatrixPropertiesNV` structure is defined as:

// Provided by VK_NV_cooperative_matrix
typedef struct VkCooperativeMatrixPropertiesNV {
    VkStructureType      sType;
    void*                pNext;
    uint32_t             MSize;
    uint32_t             NSize;
    uint32_t             KSize;
    VkComponentTypeNV    AType;
    VkComponentTypeNV    BType;
    VkComponentTypeNV    CType;
    VkComponentTypeNV    DType;
    VkScopeNV            scope;
} VkCooperativeMatrixPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`MSize` is the number of rows in matrices A, C, and D.

* 
`KSize` is the number of columns in matrix A and rows in matrix B.

* 
`NSize` is the number of columns in matrices B, C, D.

* 
`AType` is the component type of matrix A, of type
[VkComponentTypeNV](#VkComponentTypeNV).

* 
`BType` is the component type of matrix B, of type
[VkComponentTypeNV](#VkComponentTypeNV).

* 
`CType` is the component type of matrix C, of type
[VkComponentTypeNV](#VkComponentTypeNV).

* 
`DType` is the component type of matrix D, of type
[VkComponentTypeNV](#VkComponentTypeNV).

* 
`scope` is the scope of all the matrix types, of type
[VkScopeNV](#VkScopeNV).

If some types are preferred over other types (e.g. for performance), they
**should** appear earlier in the list enumerated by
[vkGetPhysicalDeviceCooperativeMatrixPropertiesNV](#vkGetPhysicalDeviceCooperativeMatrixPropertiesNV).

At least one entry in the list **must** have power of two values for all of
`MSize`, `KSize`, and `NSize`.

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeMatrixPropertiesNV-sType-sType) VUID-VkCooperativeMatrixPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCooperativeMatrixPropertiesNV-pNext-pNext) VUID-VkCooperativeMatrixPropertiesNV-pNext-pNext

 `pNext` **must** be `NULL`

Possible values for [VkScopeKHR](#VkScopeKHR) include:

// Provided by VK_KHR_cooperative_matrix
typedef enum VkScopeKHR {
    VK_SCOPE_DEVICE_KHR = 1,
    VK_SCOPE_WORKGROUP_KHR = 2,
    VK_SCOPE_SUBGROUP_KHR = 3,
    VK_SCOPE_QUEUE_FAMILY_KHR = 5,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_DEVICE_NV = VK_SCOPE_DEVICE_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_WORKGROUP_NV = VK_SCOPE_WORKGROUP_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_SUBGROUP_NV = VK_SCOPE_SUBGROUP_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_SCOPE_QUEUE_FAMILY_NV = VK_SCOPE_QUEUE_FAMILY_KHR,
} VkScopeKHR;

// Provided by VK_NV_cooperative_matrix
// Equivalent to VkScopeKHR
typedef VkScopeKHR VkScopeNV;

* 
[VK_SCOPE_DEVICE_KHR](#VkScopeNV) corresponds to SPIR-V `Device` scope.

* 
[VK_SCOPE_WORKGROUP_KHR](#VkScopeNV) corresponds to SPIR-V `Workgroup` scope.

* 
[VK_SCOPE_SUBGROUP_KHR](#VkScopeNV) corresponds to SPIR-V `Subgroup` scope.

* 
[VK_SCOPE_QUEUE_FAMILY_KHR](#VkScopeNV) corresponds to SPIR-V `QueueFamily`
scope.

All enum values match the corresponding SPIR-V value.

Possible values for [VkComponentTypeKHR](#VkComponentTypeKHR) include:

// Provided by VK_KHR_cooperative_matrix, VK_NV_cooperative_vector
typedef enum VkComponentTypeKHR {
    VK_COMPONENT_TYPE_FLOAT16_KHR = 0,
    VK_COMPONENT_TYPE_FLOAT32_KHR = 1,
    VK_COMPONENT_TYPE_FLOAT64_KHR = 2,
    VK_COMPONENT_TYPE_SINT8_KHR = 3,
    VK_COMPONENT_TYPE_SINT16_KHR = 4,
    VK_COMPONENT_TYPE_SINT32_KHR = 5,
    VK_COMPONENT_TYPE_SINT64_KHR = 6,
    VK_COMPONENT_TYPE_UINT8_KHR = 7,
    VK_COMPONENT_TYPE_UINT16_KHR = 8,
    VK_COMPONENT_TYPE_UINT32_KHR = 9,
    VK_COMPONENT_TYPE_UINT64_KHR = 10,
  // Provided by VK_KHR_cooperative_matrix with VK_KHR_shader_bfloat16
    VK_COMPONENT_TYPE_BFLOAT16_KHR = 1000141000,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_SINT8_PACKED_NV = 1000491000,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_UINT8_PACKED_NV = 1000491001,
  // Provided by VK_KHR_cooperative_matrix with VK_EXT_shader_float8
    VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT = 1000491002,
  // Provided by VK_KHR_cooperative_matrix with VK_EXT_shader_float8
    VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT = 1000491003,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_FLOAT16_NV = VK_COMPONENT_TYPE_FLOAT16_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_FLOAT32_NV = VK_COMPONENT_TYPE_FLOAT32_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_FLOAT64_NV = VK_COMPONENT_TYPE_FLOAT64_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT8_NV = VK_COMPONENT_TYPE_SINT8_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT16_NV = VK_COMPONENT_TYPE_SINT16_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT32_NV = VK_COMPONENT_TYPE_SINT32_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_SINT64_NV = VK_COMPONENT_TYPE_SINT64_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT8_NV = VK_COMPONENT_TYPE_UINT8_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT16_NV = VK_COMPONENT_TYPE_UINT16_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT32_NV = VK_COMPONENT_TYPE_UINT32_KHR,
  // Provided by VK_NV_cooperative_matrix
    VK_COMPONENT_TYPE_UINT64_NV = VK_COMPONENT_TYPE_UINT64_KHR,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_FLOAT_E4M3_NV = VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT,
  // Provided by VK_NV_cooperative_vector
    VK_COMPONENT_TYPE_FLOAT_E5M2_NV = VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT,
} VkComponentTypeKHR;

// Provided by VK_NV_cooperative_matrix
// Equivalent to VkComponentTypeKHR
typedef VkComponentTypeKHR VkComponentTypeNV;

* 
[VK_COMPONENT_TYPE_FLOAT16_KHR](#VkComponentTypeNV) corresponds to SPIR-V
`OpTypeFloat` 16.

* 
[VK_COMPONENT_TYPE_FLOAT32_KHR](#VkComponentTypeNV) corresponds to SPIR-V
`OpTypeFloat` 32.

* 
[VK_COMPONENT_TYPE_FLOAT64_KHR](#VkComponentTypeNV) corresponds to SPIR-V
`OpTypeFloat` 64.

* 
[VK_COMPONENT_TYPE_SINT8_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt` 8
0/1.

* 
[VK_COMPONENT_TYPE_SINT16_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt`
16 0/1.

* 
[VK_COMPONENT_TYPE_SINT32_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt`
32 0/1.

* 
[VK_COMPONENT_TYPE_SINT64_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt`
64 0/1.

* 
[VK_COMPONENT_TYPE_UINT8_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt` 8
0/1.

* 
[VK_COMPONENT_TYPE_UINT16_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt`
16 0/1.

* 
[VK_COMPONENT_TYPE_UINT32_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt`
32 0/1.

* 
[VK_COMPONENT_TYPE_UINT64_KHR](#VkComponentTypeNV) corresponds to SPIR-V `OpTypeInt`
64 0/1.

* 
[VK_COMPONENT_TYPE_BFLOAT16_KHR](#VkComponentTypeNV) corresponds to SPIR-V
`OpTypeFloat` 16 BFloat16KHR.

* 
[VK_COMPONENT_TYPE_SINT8_PACKED_NV](#VkComponentTypeNV) corresponds to four 8-bit signed
integers packed in a 32-bit unsigned integer.

* 
[VK_COMPONENT_TYPE_UINT8_PACKED_NV](#VkComponentTypeNV) corresponds to four 8-bit
unsigned integers packed in a 32-bit unsigned integer.

* 
[VK_COMPONENT_TYPE_FLOAT_E4M3_NV](#VkComponentTypeNV) corresponds to a floating-point
type with a sign bit in the most significant bit, followed by four
exponent bits, followed by three mantissa bits.

* 
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](#VkComponentTypeNV) corresponds to a floating-point
type with a sign bit in the most significant bit, followed by five
exponent bits, followed by two mantissa bits.

* 
[VK_COMPONENT_TYPE_FLOAT8_E4M3_EXT](#VkComponentTypeNV) corresponds to SPIR-V
`OpTypeFloat` 8 Float8E4M3EXT.

* 
[VK_COMPONENT_TYPE_FLOAT8_E5M2_EXT](#VkComponentTypeNV) corresponds to SPIR-V
`OpTypeFloat` 8 Float8E5M2EXT.

A *cooperative vector* type is a SPIR-V vector type optimized for the
evaluation of small neural networks.

SPIR-V defines the types and instructions, but does not specify rules about
what combinations of types are valid, and it is expected that different
implementations **may** support different combinations.

To enumerate the supported cooperative vector type combinations, call:

// Provided by VK_NV_cooperative_vector
VkResult vkGetPhysicalDeviceCooperativeVectorPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkCooperativeVectorPropertiesNV*            pProperties);

* 
`physicalDevice` is the physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
cooperative vector properties available or queried.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkCooperativeVectorPropertiesNV](#VkCooperativeVectorPropertiesNV) structures.

If `pProperties` is `NULL`, then the number of cooperative vector
properties available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the user to
the number of elements in the `pProperties` array, and on return the
variable is overwritten with the number of structures actually written to
`pProperties`.
If `pPropertyCount` is less than the number of cooperative vector
properties available, at most `pPropertyCount` structures will be
written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available cooperative vector
properties were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pProperties-parameter) VUID-vkGetPhysicalDeviceCooperativeVectorPropertiesNV-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkCooperativeVectorPropertiesNV](#VkCooperativeVectorPropertiesNV) structures

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

Each `VkCooperativeVectorPropertiesNV` structure describes a single
supported combination of types for a matrix-vector multiply (or
multiply-add) operation (`OpCooperativeVectorMatrixMulNV` or
`OpCooperativeVectorMatrixMulAddNV`).

The `VkCooperativeVectorPropertiesNV` structure is defined as:

// Provided by VK_NV_cooperative_vector
typedef struct VkCooperativeVectorPropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkComponentTypeKHR    inputType;
    VkComponentTypeKHR    inputInterpretation;
    VkComponentTypeKHR    matrixInterpretation;
    VkComponentTypeKHR    biasInterpretation;
    VkComponentTypeKHR    resultType;
    VkBool32              transpose;
} VkCooperativeVectorPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`inputType` is the component type of vector `Input`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`inputInterpretation` is the value of `InputInterpretation`, of
type [VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`matrixInterpretation` is the value of `MatrixInterpretation`, of
type [VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`biasInterpretation` is the value of `BiasInterpretation`, of
type [VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`resultType` is the component type of `Result` `Type`, of type
[VkComponentTypeKHR](#VkComponentTypeKHR).

* 
`transpose` is a boolean indicating whether opaque layout matrices
with this combination of input and output types supports transposition.

[VK_COMPONENT_TYPE_SINT8_PACKED_NV](#VkComponentTypeNV) and
[VK_COMPONENT_TYPE_UINT8_PACKED_NV](#VkComponentTypeNV) **must** not be used for members other
than `inputInterpretation`.

The following combinations **must** be supported (each row is a required
combination):

| inputType | inputInterpretation | matrixInterpretation | biasInterpretation | resultType |
| --- | --- | --- | --- | --- |
| FLOAT16 | FLOAT16 | FLOAT16 | FLOAT16 | FLOAT16 |
| UINT32 | SINT8_PACKED | SINT8 | SINT32 | SINT32 |
| SINT8 | SINT8 | SINT8 | SINT32 | SINT32 |
| FLOAT32 | SINT8 | SINT8 | SINT32 | SINT32 |
| FLOAT16 | FLOAT_E4M3 | FLOAT_E4M3 | FLOAT16 | FLOAT16 |
| FLOAT16 | FLOAT_E5M2 | FLOAT_E5M2 | FLOAT16 | FLOAT16 |

Valid Usage (Implicit)

* 
[](#VUID-VkCooperativeVectorPropertiesNV-sType-sType) VUID-VkCooperativeVectorPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COOPERATIVE_VECTOR_PROPERTIES_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCooperativeVectorPropertiesNV-pNext-pNext) VUID-VkCooperativeVectorPropertiesNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCooperativeVectorPropertiesNV-inputType-parameter) VUID-VkCooperativeVectorPropertiesNV-inputType-parameter

 `inputType` **must** be a valid [VkComponentTypeKHR](#VkComponentTypeKHR) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-inputInterpretation-parameter) VUID-VkCooperativeVectorPropertiesNV-inputInterpretation-parameter

 `inputInterpretation` **must** be a valid [VkComponentTypeKHR](#VkComponentTypeKHR) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-matrixInterpretation-parameter) VUID-VkCooperativeVectorPropertiesNV-matrixInterpretation-parameter

 `matrixInterpretation` **must** be a valid [VkComponentTypeKHR](#VkComponentTypeKHR) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-biasInterpretation-parameter) VUID-VkCooperativeVectorPropertiesNV-biasInterpretation-parameter

 `biasInterpretation` **must** be a valid [VkComponentTypeKHR](#VkComponentTypeKHR) value

* 
[](#VUID-VkCooperativeVectorPropertiesNV-resultType-parameter) VUID-VkCooperativeVectorPropertiesNV-resultType-parameter

 `resultType` **must** be a valid [VkComponentTypeKHR](#VkComponentTypeKHR) value

To query the size of a cooperative vector matrix, or to convert a matrix to
another layout and type, call:

// Provided by VK_NV_cooperative_vector
VkResult vkConvertCooperativeVectorMatrixNV(
    VkDevice                                    device,
    const VkConvertCooperativeVectorMatrixInfoNV* pInfo);

* 
`device` is the device.

* 
`pInfo` is a pointer to a
[VkConvertCooperativeVectorMatrixInfoNV](#VkConvertCooperativeVectorMatrixInfoNV) structure containing
information about the layout conversion.

If `pInfo->dstData` is `NULL`, then the number of bytes required to
store the converted matrix is returned in `pDstSize`.
Otherwise, `pInfo->pDstSize` **must** point to a variable set by the user
to the number of bytes in `pInfo->dstData`, and on return the variable
is overwritten with the number of bytes actually written to
`pInfo->dstData`.
`pInfo->srcData` **can** be `NULL` when `pInfo->dstData` is `NULL`.
If `pInfo->pDstSize` is less than the number of bytes required to store
the converted matrix, no bytes will be written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will
be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to indicate that not enough space
was provided.

Valid Usage

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10073) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10073

If `pInfo->srcData.hostAddress` is `NULL`, then
`pInfo->dstData.hostAddress` **must** be `NULL`

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10074) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10074

If `pInfo->srcData.hostAddress` is not `NULL`, then
`pInfo->srcSize` **must** be large enough to contain the source matrix,
based either on the standard matrix layout or based on the size filled
out by this command

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10075) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10075

If `pInfo->dstData.hostAddress` is not `NULL`, then the value
pointed to by `pInfo->pDstSize` **must** be large enough to contain the
destination matrix, based either on the standard matrix layout or based
on the size filled out by this command

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10076) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-10076

If `pInfo->dstData.hostAddress` is not `NULL`, the source and
destination memory ranges **must** not overlap

Valid Usage (Implicit)

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-device-parameter) VUID-vkConvertCooperativeVectorMatrixNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkConvertCooperativeVectorMatrixNV-pInfo-parameter) VUID-vkConvertCooperativeVectorMatrixNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkConvertCooperativeVectorMatrixInfoNV](#VkConvertCooperativeVectorMatrixInfoNV) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Each `VkConvertCooperativeVectorMatrixInfoNV` structure describes a
request to convert the layout and type of a cooperative vector matrix.

The `VkConvertCooperativeVectorMatrixInfoNV` structure is defined as:

// Provided by VK_NV_cooperative_vector
typedef struct VkConvertCooperativeVectorMatrixInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    size_t                               srcSize;
    VkDeviceOrHostAddressConstKHR        srcData;
    size_t*                              pDstSize;
    VkDeviceOrHostAddressKHR             dstData;
    VkComponentTypeKHR                   srcComponentType;
    VkComponentTypeKHR                   dstComponentType;
    uint32_t                             numRows;
    uint32_t                             numColumns;
    VkCooperativeVectorMatrixLayoutNV    srcLayout;
    size_t                               srcStride;
    VkCooperativeVectorMatrixLayoutNV    dstLayout;
    size_t                               dstStride;
} VkConvertCooperativeVectorMatrixInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcSize` is the length in bytes of `srcData`.

* 
`srcData` is either `NULL` or a pointer to the source data in the
source layout.

* 
`pDstSize` is a pointer to an integer related to the number of bytes
required or requested to convert.

* 
`dstData` is either `NULL` or a pointer to the destination data in
the destination layout.

* 
`srcComponentType` is the type of a source matrix element.

* 
`dstComponentType` is the type of a destination matrix element.

* 
`numRows` is the number of rows in the matrix.

* 
`numColumns` is the number of columns in the matrix.

* 
`srcLayout` is the layout of the source matrix.

* 
`srcStride` is the number of bytes between a consecutive row or
column (depending on `srcLayout`) of the source matrix, if it is
row-major or column-major.

* 
`dstLayout` is the layout the matrix is converted to.

* 
`dstStride` is the number of bytes between a consecutive row or
column (depending on `dstLayout`) of destination matrix, if it is
row-major or column-major.

When called from [vkCmdConvertCooperativeVectorMatrixNV](#vkCmdConvertCooperativeVectorMatrixNV), the
`deviceAddress` members of `srcData` and `dstData` are used.
When called from [vkConvertCooperativeVectorMatrixNV](#vkConvertCooperativeVectorMatrixNV), the
`hostAddress` members of `srcData` and `dstData` are used.

For each of the source and destination matrix, if the layout is not either
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_ROW_MAJOR_NV](#VkCooperativeVectorMatrixLayoutNV) or
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_COLUMN_MAJOR_NV](#VkCooperativeVectorMatrixLayoutNV), then the
corresponding stride parameter is ignored.

The size of the destination is only a function of the destination layout
information, and does not depend on the source layout information.

Conversion **can** be used to convert between
[VK_COMPONENT_TYPE_FLOAT32_KHR](#VkComponentTypeNV) or [VK_COMPONENT_TYPE_FLOAT16_KHR](#VkComponentTypeNV)
and any supported lower-precision floating-point type.
In this case, the conversion uses round-to-nearest-even rounding.

Valid Usage

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-10077) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-10077

If `srcLayout` is row-major or column-major, then `srcStride`
**must** be greater than the length of a row/column, and a multiple of the
element size

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-10078) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-10078

If `dstLayout` is row-major or column-major, then `dstStride`
**must** be greater than the length of a row/column, and a multiple of the
element size

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10079) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10079

If `srcComponentType` is not a supported
[VkCooperativeVectorPropertiesNV](#VkCooperativeVectorPropertiesNV)::`matrixInterpretation` value
as reported by [vkGetPhysicalDeviceCooperativeVectorPropertiesNV](#vkGetPhysicalDeviceCooperativeVectorPropertiesNV),
then `srcComponentType` **must** be [VK_COMPONENT_TYPE_FLOAT32_KHR](#VkComponentTypeNV)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10080) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10080

If `dstComponentType` is not a supported
[VkCooperativeVectorPropertiesNV](#VkCooperativeVectorPropertiesNV)::`matrixInterpretation` value
as reported by [vkGetPhysicalDeviceCooperativeVectorPropertiesNV](#vkGetPhysicalDeviceCooperativeVectorPropertiesNV),
then `dstComponentType` **must** be [VK_COMPONENT_TYPE_FLOAT32_KHR](#VkComponentTypeNV)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10081) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-10081

If `srcComponentType` and `dstComponentType` are not equal, then
one **must** be [VK_COMPONENT_TYPE_FLOAT32_KHR](#VkComponentTypeNV) or
[VK_COMPONENT_TYPE_FLOAT16_KHR](#VkComponentTypeNV) and the other **must** be a
lower-precision floating-point type

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10082) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-10082

If `dstComponentType` is [VK_COMPONENT_TYPE_FLOAT_E4M3_NV](#VkComponentTypeNV) or
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](#VkComponentTypeNV), then `dstLayout` **must** be
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV](#VkCooperativeVectorMatrixLayoutNV) or
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV](#VkCooperativeVectorMatrixLayoutNV)

Valid Usage (Implicit)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-sType-sType) VUID-VkConvertCooperativeVectorMatrixInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CONVERT_COOPERATIVE_VECTOR_MATRIX_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-pNext-pNext) VUID-VkConvertCooperativeVectorMatrixInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcData-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcData-parameter

 `srcData` **must** be a valid [VkDeviceOrHostAddressConstKHR](accelstructures.html#VkDeviceOrHostAddressConstKHR) union

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-pDstSize-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-pDstSize-parameter

 `pDstSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstData-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstData-parameter

 `dstData` **must** be a valid [VkDeviceOrHostAddressKHR](accelstructures.html#VkDeviceOrHostAddressKHR) union

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcComponentType-parameter

 `srcComponentType` **must** be a valid [VkComponentTypeKHR](#VkComponentTypeKHR) value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstComponentType-parameter

 `dstComponentType` **must** be a valid [VkComponentTypeKHR](#VkComponentTypeKHR) value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-srcLayout-parameter

 `srcLayout` **must** be a valid [VkCooperativeVectorMatrixLayoutNV](#VkCooperativeVectorMatrixLayoutNV) value

* 
[](#VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-parameter) VUID-VkConvertCooperativeVectorMatrixInfoNV-dstLayout-parameter

 `dstLayout` **must** be a valid [VkCooperativeVectorMatrixLayoutNV](#VkCooperativeVectorMatrixLayoutNV) value

Possible values for [VkCooperativeVectorMatrixLayoutNV](#VkCooperativeVectorMatrixLayoutNV) include:

// Provided by VK_NV_cooperative_vector
typedef enum VkCooperativeVectorMatrixLayoutNV {
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_ROW_MAJOR_NV = 0,
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_COLUMN_MAJOR_NV = 1,
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV = 2,
    VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV = 3,
} VkCooperativeVectorMatrixLayoutNV;

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_ROW_MAJOR_NV](#VkCooperativeVectorMatrixLayoutNV) corresponds to
SPIR-V `RowMajorNV` layout.

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_COLUMN_MAJOR_NV](#VkCooperativeVectorMatrixLayoutNV) corresponds to
SPIR-V `ColumnMajorNV` layout.

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV](#VkCooperativeVectorMatrixLayoutNV)
corresponds to SPIR-V `InferencingOptimalNV` layout.

* 
[VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV](#VkCooperativeVectorMatrixLayoutNV)
corresponds to SPIR-V `TrainingOptimalNV` layout.

All enum values match the corresponding SPIR-V value.

Row-major layout has elements of each row stored consecutively in memory,
with a controllable stride from the start of one row to the start of the
next row.
Column-major layout has elements of each column stored consecutively in
memory, with a controllable stride from the start of one column to the start
of the next column.
Inferencing-optimal and Training-optimal layouts are
implementation-dependent, and the application **can** convert a matrix to those
layouts using [vkConvertCooperativeVectorMatrixNV](#vkConvertCooperativeVectorMatrixNV) or
[vkCmdConvertCooperativeVectorMatrixNV](#vkCmdConvertCooperativeVectorMatrixNV).
Training-optimal layout with [VK_COMPONENT_TYPE_FLOAT16_KHR](#VkComponentTypeNV) or
[VK_COMPONENT_TYPE_FLOAT32_KHR](#VkComponentTypeNV) type has the additional guarantee that
the application **can** reinterpret the data as an array of elements and
perform element-wise operations on the data, and finite values in any
padding elements do not affect the result of a matrix-vector multiply
(inf/NaN values **may** still cause NaN values in the result).

To convert a matrix to another layout and type, call:

// Provided by VK_NV_cooperative_vector
void vkCmdConvertCooperativeVectorMatrixNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    infoCount,
    const VkConvertCooperativeVectorMatrixInfoNV* pInfos);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`infoCount` is the number of layout conversions to perform.

* 
`pInfos` is a pointer to an array of
[VkConvertCooperativeVectorMatrixInfoNV](#VkConvertCooperativeVectorMatrixInfoNV) structures containing
information about the layout conversion.

This command does the same conversions as
[vkConvertCooperativeVectorMatrixNV](#vkConvertCooperativeVectorMatrixNV), but executes on the device.
One conversion is performed for each of the `infoCount` elements of
`pInfos`.

This command’s execution is synchronized using
[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](synchronization.html#VkPipelineStageFlagBits2KHR).

Valid Usage

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10083) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10083

For each element of `pInfo`, `srcData.deviceAddress` **must** be a
valid `VkDeviceAddress`

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10895) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10895

For each element of `pInfo`, `dstData.deviceAddress` **must** be a
valid `VkDeviceAddress`

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10084) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10084

For each element of `pInfo`, `srcData.deviceAddress` **must** be 64
byte aligned

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10085) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10085

For each element of `pInfo`, `dstData.deviceAddress` **must** be 64
byte aligned

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10086) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10086

For each element of `pInfo`, `srcSize` **must** be large enough to
contain the source matrix, based either on the standard matrix layout or
based on the size filled out by [vkConvertCooperativeVectorMatrixNV](#vkConvertCooperativeVectorMatrixNV)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10087) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfo-10087

For each element of `pInfo`, the value pointed to by `pDstSize`
**must** be large enough to contain the destination matrix, based either on
the standard matrix layout or based on the size filled out by
[vkConvertCooperativeVectorMatrixNV](#vkConvertCooperativeVectorMatrixNV)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-None-10088) VUID-vkCmdConvertCooperativeVectorMatrixNV-None-10088

Memory accessed by the sources and destinations of all of the
conversions **must** not overlap

Valid Usage (Implicit)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-parameter) VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfos-parameter) VUID-vkCmdConvertCooperativeVectorMatrixNV-pInfos-parameter

 `pInfos` **must** be a valid pointer to an array of `infoCount` valid [VkConvertCooperativeVectorMatrixInfoNV](#VkConvertCooperativeVectorMatrixInfoNV) structures

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-recording) VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-cmdpool) VUID-vkCmdConvertCooperativeVectorMatrixNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-renderpass) VUID-vkCmdConvertCooperativeVectorMatrixNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-suspended) VUID-vkCmdConvertCooperativeVectorMatrixNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-videocoding) VUID-vkCmdConvertCooperativeVectorMatrixNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdConvertCooperativeVectorMatrixNV-infoCount-arraylength) VUID-vkCmdConvertCooperativeVectorMatrixNV-infoCount-arraylength

 `infoCount` **must** be greater than `0`

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

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdConvertCooperativeVectorMatrixNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Validation cache objects allow the result of internal validation to be
reused, both within a single application run and between multiple runs.
Reuse within a single run is achieved by passing the same validation cache
object when creating supported Vulkan objects.
Reuse across runs of an application is achieved by retrieving validation
cache contents in one run of an application, saving the contents, and using
them to preinitialize a validation cache on a subsequent run.
The contents of the validation cache objects are managed by the validation
layers.
Applications **can** manage the host memory consumed by a validation cache
object and control the amount of data retrieved from a validation cache
object.

Validation cache objects are represented by `VkValidationCacheEXT`
handles:

// Provided by VK_EXT_validation_cache
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkValidationCacheEXT)

To create validation cache objects, call:

// Provided by VK_EXT_validation_cache
VkResult vkCreateValidationCacheEXT(
    VkDevice                                    device,
    const VkValidationCacheCreateInfoEXT*       pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkValidationCacheEXT*                       pValidationCache);

* 
`device` is the logical device that creates the validation cache
object.

* 
`pCreateInfo` is a pointer to a [VkValidationCacheCreateInfoEXT](#VkValidationCacheCreateInfoEXT)
structure containing the initial parameters for the validation cache
object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pValidationCache` is a pointer to a [VkValidationCacheEXT](#VkValidationCacheEXT)
handle in which the resulting validation cache object is returned.

|  | Applications **can** track and manage the total host memory size of a
| --- | --- |
validation cache object using the `pAllocator`.
Applications **can** limit the amount of data retrieved from a validation cache
object in `vkGetValidationCacheDataEXT`.
Implementations **should** not internally limit the total number of entries
added to a validation cache object or the total host memory consumed. |

Once created, a validation cache **can** be passed to the
`vkCreateShaderModule` command by adding this object to the
[VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo) structure’s `pNext` chain.
If a [VkShaderModuleValidationCacheCreateInfoEXT](#VkShaderModuleValidationCacheCreateInfoEXT) object is included in
the [VkShaderModuleCreateInfo](#VkShaderModuleCreateInfo)::`pNext` chain, and its
`validationCache` field is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the implementation
will query it for possible reuse opportunities and update it with new
content.
The use of the validation cache object in these commands is internally
synchronized, and the same validation cache object **can** be used in multiple
threads simultaneously.

|  | Implementations **should** make every effort to limit any critical sections to
| --- | --- |
the actual accesses to the cache, which is expected to be significantly
shorter than the duration of the `vkCreateShaderModule` command. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreateValidationCacheEXT-device-parameter) VUID-vkCreateValidationCacheEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateValidationCacheEXT-pCreateInfo-parameter) VUID-vkCreateValidationCacheEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkValidationCacheCreateInfoEXT](#VkValidationCacheCreateInfoEXT) structure

* 
[](#VUID-vkCreateValidationCacheEXT-pAllocator-parameter) VUID-vkCreateValidationCacheEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateValidationCacheEXT-pValidationCache-parameter) VUID-vkCreateValidationCacheEXT-pValidationCache-parameter

 `pValidationCache` **must** be a valid pointer to a [VkValidationCacheEXT](#VkValidationCacheEXT) handle

* 
[](#VUID-vkCreateValidationCacheEXT-device-queuecount) VUID-vkCreateValidationCacheEXT-device-queuecount

 The device **must** have been created with at least `1` queue

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

The `VkValidationCacheCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_validation_cache
typedef struct VkValidationCacheCreateInfoEXT {
    VkStructureType                    sType;
    const void*                        pNext;
    VkValidationCacheCreateFlagsEXT    flags;
    size_t                             initialDataSize;
    const void*                        pInitialData;
} VkValidationCacheCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`initialDataSize` is the number of bytes in `pInitialData`.
If `initialDataSize` is zero, the validation cache will initially be
empty.

* 
`pInitialData` is a pointer to previously retrieved validation cache
data.
If the validation cache data is incompatible (as defined below) with the
device, the validation cache will be initially empty.
If `initialDataSize` is zero, `pInitialData` is ignored.

Valid Usage

* 
[](#VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01534) VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01534

If `initialDataSize` is not `0`, it **must** be equal to the size of
`pInitialData`, as returned by `vkGetValidationCacheDataEXT`
when `pInitialData` was originally retrieved

* 
[](#VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01535) VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01535

If `initialDataSize` is not `0`, `pInitialData` **must** have been
retrieved from a previous call to `vkGetValidationCacheDataEXT`

Valid Usage (Implicit)

* 
[](#VUID-VkValidationCacheCreateInfoEXT-sType-sType) VUID-VkValidationCacheCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VALIDATION_CACHE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkValidationCacheCreateInfoEXT-pNext-pNext) VUID-VkValidationCacheCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkValidationCacheCreateInfoEXT-flags-zerobitmask) VUID-VkValidationCacheCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkValidationCacheCreateInfoEXT-pInitialData-parameter) VUID-VkValidationCacheCreateInfoEXT-pInitialData-parameter

 If `initialDataSize` is not `0`, `pInitialData` **must** be a valid pointer to an array of `initialDataSize` bytes

// Provided by VK_EXT_validation_cache
typedef VkFlags VkValidationCacheCreateFlagsEXT;

`VkValidationCacheCreateFlagsEXT` is a bitmask type for setting a mask,
but is currently reserved for future use.

Validation cache objects **can** be merged using the command:

// Provided by VK_EXT_validation_cache
VkResult vkMergeValidationCachesEXT(
    VkDevice                                    device,
    VkValidationCacheEXT                        dstCache,
    uint32_t                                    srcCacheCount,
    const VkValidationCacheEXT*                 pSrcCaches);

* 
`device` is the logical device that owns the validation cache
objects.

* 
`dstCache` is the handle of the validation cache to merge results
into.

* 
`srcCacheCount` is the length of the `pSrcCaches` array.

* 
`pSrcCaches` is a pointer to an array of validation cache handles,
which will be merged into `dstCache`.
The previous contents of `dstCache` are included after the merge.

|  | The details of the merge operation are implementation-dependent, but
| --- | --- |
implementations **should** merge the contents of the specified validation
caches and prune duplicate entries. |

Valid Usage

* 
[](#VUID-vkMergeValidationCachesEXT-dstCache-01536) VUID-vkMergeValidationCachesEXT-dstCache-01536

`dstCache` **must** not appear in the list of source caches

Valid Usage (Implicit)

* 
[](#VUID-vkMergeValidationCachesEXT-device-parameter) VUID-vkMergeValidationCachesEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkMergeValidationCachesEXT-dstCache-parameter) VUID-vkMergeValidationCachesEXT-dstCache-parameter

 `dstCache` **must** be a valid [VkValidationCacheEXT](#VkValidationCacheEXT) handle

* 
[](#VUID-vkMergeValidationCachesEXT-pSrcCaches-parameter) VUID-vkMergeValidationCachesEXT-pSrcCaches-parameter

 `pSrcCaches` **must** be a valid pointer to an array of `srcCacheCount` valid [VkValidationCacheEXT](#VkValidationCacheEXT) handles

* 
[](#VUID-vkMergeValidationCachesEXT-srcCacheCount-arraylength) VUID-vkMergeValidationCachesEXT-srcCacheCount-arraylength

 `srcCacheCount` **must** be greater than `0`

* 
[](#VUID-vkMergeValidationCachesEXT-dstCache-parent) VUID-vkMergeValidationCachesEXT-dstCache-parent

 `dstCache` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkMergeValidationCachesEXT-pSrcCaches-parent) VUID-vkMergeValidationCachesEXT-pSrcCaches-parent

 Each element of `pSrcCaches` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `dstCache` **must** be externally synchronized

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

Data **can** be retrieved from a validation cache object using the command:

// Provided by VK_EXT_validation_cache
VkResult vkGetValidationCacheDataEXT(
    VkDevice                                    device,
    VkValidationCacheEXT                        validationCache,
    size_t*                                     pDataSize,
    void*                                       pData);

* 
`device` is the logical device that owns the validation cache.

* 
`validationCache` is the validation cache to retrieve data from.

* 
`pDataSize` is a pointer to a value related to the amount of data in
the validation cache, as described below.

* 
`pData` is either `NULL` or a pointer to a buffer.

If `pData` is `NULL`, then the maximum size of the data that **can** be
retrieved from the validation cache, in bytes, is returned in
`pDataSize`.
Otherwise, `pDataSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pData`, and on
return the variable is overwritten with the amount of data actually written
to `pData`.
If `pDataSize` is less than the maximum size that **can** be retrieved by
the validation cache, at most `pDataSize` bytes will be written to
`pData`, and `vkGetValidationCacheDataEXT` will return
[VK_INCOMPLETE](fundamentals.html#VkResult) instead of [VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all of
the validation cache was returned.

Any data written to `pData` is valid and **can** be provided as the
`pInitialData` member of the [VkValidationCacheCreateInfoEXT](#VkValidationCacheCreateInfoEXT)
structure passed to `vkCreateValidationCacheEXT`.

Two calls to `vkGetValidationCacheDataEXT` with the same parameters
**must** retrieve the same data unless a command that modifies the contents of
the cache is called between them.

Applications **can** store the data retrieved from the validation cache, and
use these data, possibly in a future run of the application, to populate new
validation cache objects.
The results of validation, however, **may** depend on the vendor ID, device ID,
driver version, and other details of the device.
To enable applications to detect when previously retrieved data is
incompatible with the device, the initial bytes written to `pData` **must**
be a header consisting of the following members:

| Offset | Size | Meaning |
| --- | --- | --- |
| 0 | 4 | length in bytes of the entire validation cache header
                             written as a stream of bytes, with the least
                             significant byte first |
| 4 | 4 | a [VkValidationCacheHeaderVersionEXT](#VkValidationCacheHeaderVersionEXT) value
                             written as a stream of bytes, with the least
                             significant byte first |
| 8 | [VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) | a layer commit ID expressed as a UUID, which uniquely
                             identifies the version of the validation layers used
                             to generate these validation results |

The first four bytes encode the length of the entire validation cache
header, in bytes.
This value includes all fields in the header including the validation cache
version field and the size of the length field.

The next four bytes encode the validation cache version, as described for
[VkValidationCacheHeaderVersionEXT](#VkValidationCacheHeaderVersionEXT).
A consumer of the validation cache **should** use the cache version to
interpret the remainder of the cache header.

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

Valid Usage (Implicit)

* 
[](#VUID-vkGetValidationCacheDataEXT-device-parameter) VUID-vkGetValidationCacheDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetValidationCacheDataEXT-validationCache-parameter) VUID-vkGetValidationCacheDataEXT-validationCache-parameter

 `validationCache` **must** be a valid [VkValidationCacheEXT](#VkValidationCacheEXT) handle

* 
[](#VUID-vkGetValidationCacheDataEXT-pDataSize-parameter) VUID-vkGetValidationCacheDataEXT-pDataSize-parameter

 `pDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetValidationCacheDataEXT-pData-parameter) VUID-vkGetValidationCacheDataEXT-pData-parameter

 If the value referenced by `pDataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pDataSize` bytes

* 
[](#VUID-vkGetValidationCacheDataEXT-validationCache-parent) VUID-vkGetValidationCacheDataEXT-validationCache-parent

 `validationCache` **must** have been created, allocated, or retrieved from `device`

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

Possible values of the second group of four bytes in the header returned by
[vkGetValidationCacheDataEXT](#vkGetValidationCacheDataEXT), encoding the validation cache version,
are:

// Provided by VK_EXT_validation_cache
typedef enum VkValidationCacheHeaderVersionEXT {
    VK_VALIDATION_CACHE_HEADER_VERSION_ONE_EXT = 1,
} VkValidationCacheHeaderVersionEXT;

* 
[VK_VALIDATION_CACHE_HEADER_VERSION_ONE_EXT](#VkValidationCacheHeaderVersionEXT) specifies version one
of the validation cache.

To destroy a validation cache, call:

// Provided by VK_EXT_validation_cache
void vkDestroyValidationCacheEXT(
    VkDevice                                    device,
    VkValidationCacheEXT                        validationCache,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the validation cache
object.

* 
`validationCache` is the handle of the validation cache to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-01537) VUID-vkDestroyValidationCacheEXT-validationCache-01537

If `VkAllocationCallbacks` were provided when `validationCache`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-01538) VUID-vkDestroyValidationCacheEXT-validationCache-01538

If no `VkAllocationCallbacks` were provided when
`validationCache` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyValidationCacheEXT-device-parameter) VUID-vkDestroyValidationCacheEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-parameter) VUID-vkDestroyValidationCacheEXT-validationCache-parameter

 If `validationCache` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `validationCache` **must** be a valid [VkValidationCacheEXT](#VkValidationCacheEXT) handle

* 
[](#VUID-vkDestroyValidationCacheEXT-pAllocator-parameter) VUID-vkDestroyValidationCacheEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyValidationCacheEXT-validationCache-parent) VUID-vkDestroyValidationCacheEXT-validationCache-parent

 If `validationCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `validationCache` **must** be externally synchronized

CUDA modules **must** contain some kernel code and **must** expose at least one
function entry point.

CUDA modules are represented by `VkCudaModuleNV` handles:

// Provided by VK_NV_cuda_kernel_launch
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkCudaModuleNV)

To create a CUDA module, call:

// Provided by VK_NV_cuda_kernel_launch
VkResult vkCreateCudaModuleNV(
    VkDevice                                    device,
    const VkCudaModuleCreateInfoNV*             pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCudaModuleNV*                             pModule);

* 
`device` is the logical device that creates the shader module.

* 
`pCreateInfo` is a pointer to a [VkCudaModuleCreateInfoNV](#VkCudaModuleCreateInfoNV)
structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pModule` is a pointer to a [VkCudaModuleNV](#VkCudaModuleNV) handle in which the
resulting CUDA module object is returned.

Once a CUDA module has been created, the application **may** create the
function entry point, which **must** refer to one function in the module.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCudaModuleNV-device-parameter) VUID-vkCreateCudaModuleNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateCudaModuleNV-pCreateInfo-parameter) VUID-vkCreateCudaModuleNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCudaModuleCreateInfoNV](#VkCudaModuleCreateInfoNV) structure

* 
[](#VUID-vkCreateCudaModuleNV-pAllocator-parameter) VUID-vkCreateCudaModuleNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateCudaModuleNV-pModule-parameter) VUID-vkCreateCudaModuleNV-pModule-parameter

 `pModule` **must** be a valid pointer to a [VkCudaModuleNV](#VkCudaModuleNV) handle

* 
[](#VUID-vkCreateCudaModuleNV-device-queuecount) VUID-vkCreateCudaModuleNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkCudaModuleCreateInfoNV` structure is defined as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkCudaModuleCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    size_t             dataSize;
    const void*        pData;
} VkCudaModuleCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` **may** be `NULL` or **may** be a pointer to a structure extending
this structure.

* 
`dataSize` is the length of the `pData` array.

* 
`pData` is a pointer to CUDA code

Valid Usage

* 
[](#VUID-VkCudaModuleCreateInfoNV-dataSize-09413) VUID-VkCudaModuleCreateInfoNV-dataSize-09413

`dataSize` **must** be the total size in bytes of the PTX files or
binary cache passed to `pData`

Valid Usage (Implicit)

* 
[](#VUID-VkCudaModuleCreateInfoNV-sType-sType) VUID-VkCudaModuleCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUDA_MODULE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCudaModuleCreateInfoNV-pNext-pNext) VUID-VkCudaModuleCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCudaModuleCreateInfoNV-pData-parameter) VUID-VkCudaModuleCreateInfoNV-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-VkCudaModuleCreateInfoNV-dataSize-arraylength) VUID-VkCudaModuleCreateInfoNV-dataSize-arraylength

 `dataSize` **must** be greater than `0`

CUDA functions are represented by `VkCudaFunctionNV` handles.
Handles to `*global*` functions **may** then be used to issue a kernel launch
(i.e. dispatch) from a commandbuffer.
See [Dispatching Command for CUDA PTX kernel](dispatch.html#cudadispatch).

// Provided by VK_NV_cuda_kernel_launch
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkCudaFunctionNV)

To create a CUDA function, call:

// Provided by VK_NV_cuda_kernel_launch
VkResult vkCreateCudaFunctionNV(
    VkDevice                                    device,
    const VkCudaFunctionCreateInfoNV*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkCudaFunctionNV*                           pFunction);

* 
`device` is the logical device that creates the shader module.

* 
`pCreateInfo` is a pointer to a [VkCudaFunctionCreateInfoNV](#VkCudaFunctionCreateInfoNV)
structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pFunction` is a pointer to a [VkCudaFunctionNV](#VkCudaFunctionNV) handle in which
the resulting CUDA function object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateCudaFunctionNV-device-parameter) VUID-vkCreateCudaFunctionNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateCudaFunctionNV-pCreateInfo-parameter) VUID-vkCreateCudaFunctionNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkCudaFunctionCreateInfoNV](#VkCudaFunctionCreateInfoNV) structure

* 
[](#VUID-vkCreateCudaFunctionNV-pAllocator-parameter) VUID-vkCreateCudaFunctionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateCudaFunctionNV-pFunction-parameter) VUID-vkCreateCudaFunctionNV-pFunction-parameter

 `pFunction` **must** be a valid pointer to a [VkCudaFunctionNV](#VkCudaFunctionNV) handle

* 
[](#VUID-vkCreateCudaFunctionNV-device-queuecount) VUID-vkCreateCudaFunctionNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkCudaFunctionCreateInfoNV` structure is defined as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkCudaFunctionCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkCudaModuleNV     module;
    const char*        pName;
} VkCudaFunctionCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`module` is the CUDA [VkCudaModuleNV](#VkCudaModuleNV) module in which the
function resides.

* 
`pName` is a null-terminated UTF-8 string containing the name of the
shader entry point for this stage.

Valid Usage (Implicit)

* 
[](#VUID-VkCudaFunctionCreateInfoNV-sType-sType) VUID-VkCudaFunctionCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CUDA_FUNCTION_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCudaFunctionCreateInfoNV-pNext-pNext) VUID-VkCudaFunctionCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCudaFunctionCreateInfoNV-module-parameter) VUID-VkCudaFunctionCreateInfoNV-module-parameter

 `module` **must** be a valid [VkCudaModuleNV](#VkCudaModuleNV) handle

* 
[](#VUID-VkCudaFunctionCreateInfoNV-pName-parameter) VUID-VkCudaFunctionCreateInfoNV-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

To destroy a CUDA function handle, call:

// Provided by VK_NV_cuda_kernel_launch
void vkDestroyCudaFunctionNV(
    VkDevice                                    device,
    VkCudaFunctionNV                            function,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the Function.

* 
`function` is the handle of the CUDA function to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCudaFunctionNV-device-parameter) VUID-vkDestroyCudaFunctionNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyCudaFunctionNV-function-parameter) VUID-vkDestroyCudaFunctionNV-function-parameter

 `function` **must** be a valid [VkCudaFunctionNV](#VkCudaFunctionNV) handle

* 
[](#VUID-vkDestroyCudaFunctionNV-pAllocator-parameter) VUID-vkDestroyCudaFunctionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyCudaFunctionNV-function-parent) VUID-vkDestroyCudaFunctionNV-function-parent

 `function` **must** have been created, allocated, or retrieved from `device`

To destroy a CUDA shader module, call:

// Provided by VK_NV_cuda_kernel_launch
void vkDestroyCudaModuleNV(
    VkDevice                                    device,
    VkCudaModuleNV                              module,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader module.

* 
`module` is the handle of the CUDA module to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCudaModuleNV-device-parameter) VUID-vkDestroyCudaModuleNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyCudaModuleNV-module-parameter) VUID-vkDestroyCudaModuleNV-module-parameter

 `module` **must** be a valid [VkCudaModuleNV](#VkCudaModuleNV) handle

* 
[](#VUID-vkDestroyCudaModuleNV-pAllocator-parameter) VUID-vkDestroyCudaModuleNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyCudaModuleNV-module-parent) VUID-vkDestroyCudaModuleNV-module-parent

 `module` **must** have been created, allocated, or retrieved from `device`

After uploading the PTX kernel code, the module compiles the code to
generate a binary cache with all the necessary information for the device to
execute it.
It is possible to read back this cache for later use, such as accelerating
the initialization of further executions.

To get the CUDA module cache call:

// Provided by VK_NV_cuda_kernel_launch
VkResult vkGetCudaModuleCacheNV(
    VkDevice                                    device,
    VkCudaModuleNV                              module,
    size_t*                                     pCacheSize,
    void*                                       pCacheData);

* 
`device` is the logical device that destroys the Function.

* 
`module` is the CUDA module.

* 
`pCacheSize` is a pointer containing the amount of bytes to be
copied in `pCacheData`

* 
`pCacheData` is a pointer to a buffer in which to copy the binary
cache

If `pCacheData` is `NULL`, then the size of the binary cache, in bytes,
is returned in `pCacheSize`.
Otherwise, `pCacheSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pCacheData`, and on
return the variable is overwritten with the amount of data actually written
to `pCacheData`.
If `pCacheSize` is less than the size of the binary shader code, nothing
is written to `pCacheData`, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned
instead of [VK_SUCCESS](fundamentals.html#VkResult).

The returned cache **may** then be used later for further initialization of the
CUDA module, by sending this cache *instead* of the PTX code when using
[vkCreateCudaModuleNV](#vkCreateCudaModuleNV).

|  | Using the binary cache instead of the original PTX code **should**
| --- | --- |
significantly speed up initialization of the CUDA module, given that the
whole compilation and validation will not be necessary.

As with [VkPipelineCache](pipelines.html#VkPipelineCache), the binary cache depends on the specific
implementation.
The application **must** assume the cache upload might fail in many
circumstances and thus **may** have to get ready for falling back to the
original PTX code if necessary.
Most often, the cache **may** succeed if the same device driver and
architecture is used between the cache generation from PTX and the use of
this cache.
In the event of a new driver version or if using a different device
architecture, this cache **may** become invalid. |

|  | This query does not behave consistently with the behavior described in
| --- | --- |
[Opaque Binary Data Results](fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pDataSize`,
the query returns a [VK_INCOMPLETE](fundamentals.html#VkResult) success status instead of a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](fundamentals.html#VkResult) error status. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetCudaModuleCacheNV-device-parameter) VUID-vkGetCudaModuleCacheNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetCudaModuleCacheNV-module-parameter) VUID-vkGetCudaModuleCacheNV-module-parameter

 `module` **must** be a valid [VkCudaModuleNV](#VkCudaModuleNV) handle

* 
[](#VUID-vkGetCudaModuleCacheNV-pCacheSize-parameter) VUID-vkGetCudaModuleCacheNV-pCacheSize-parameter

 `pCacheSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetCudaModuleCacheNV-pCacheData-parameter) VUID-vkGetCudaModuleCacheNV-pCacheData-parameter

 If the value referenced by `pCacheSize` is not `0`, and `pCacheData` is not `NULL`, `pCacheData` **must** be a valid pointer to an array of `pCacheSize` bytes

* 
[](#VUID-vkGetCudaModuleCacheNV-module-parent) VUID-vkGetCudaModuleCacheNV-module-parent

 `module` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

CUDA and Vulkan do not use the device in the same configuration.
The following limitations **must** be taken into account:

* 
It is not possible to read or write global parameters from Vulkan.
The only way to share resources or send values to the PTX kernel is to
pass them as arguments of the function.
See [Resources sharing between CUDA    Kernel and Vulkan](dispatch.html#cudadispatch_sharing_resources) for more details.

* 
No calls to functions external to the module PTX are supported.

* 
Vulkan disables some shader/kernel exceptions, which could break CUDA
kernels relying on exceptions.

* 
CUDA kernels submitted to Vulkan are limited to the amount of shared
memory, which can be queried from the physical capabilities.
It may be less than what CUDA can offer.

* 
CUDA instruction-level preemption (CILP) does not work.

* 
CUDA Unified Memory will not work in this extension.

* 
CUDA Dynamic parallelism is not supported.

* 
`vk*DispatchIndirect` is not available.

Shaders **can** be instrumented to provide a runtime shader cost analysis.

Shader instrumentation is enabled for a pipeline when
[VK_PIPELINE_CREATE_2_INSTRUMENT_SHADERS_BIT_ARM](pipelines.html#VkPipelineCreateFlagBits2KHR) is included in
[VkPipelineCreateFlags2CreateInfoKHR](pipelines.html#VkPipelineCreateFlags2CreateInfoKHR)::`flags`.

Shader instrumentation is enabled for a shader object when
[VK_SHADER_CREATE_INSTRUMENT_SHADER_BIT_ARM](#VkShaderCreateFlagBitsEXT) is included in
[VkShaderCreateInfoEXT](#VkShaderCreateInfoEXT)::`flags`.

|  | Shader instrumentation will incur a runtime performance cost.
| --- | --- |
Applications or tools are only expected to enable shader instrumentation
during development, for performance profiling or debugging purposes, and to
leave it disabled in production use of the applications. |

To enumerate the available shader instrumentation metrics, call:

// Provided by VK_ARM_shader_instrumentation
VkResult vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pDescriptionCount,
    VkShaderInstrumentationMetricDescriptionARM* pDescriptions);

* 
`physicalDevice` is the physical device.

* 
`pDescriptionCount` is a pointer to an integer related to the number
of shader instrumentation metrics available or queried.

* 
`pDescriptions` is either `NULL` or a pointer to an array of
[VkShaderInstrumentationMetricDescriptionARM](#VkShaderInstrumentationMetricDescriptionARM) structures.

If `pDescriptions` is `NULL`, then the number of shader instrumentation
metrics available is returned in `pDescriptionCount`.
Otherwise, `pDescriptionCount` **must** point to a variable set by the
application to the number of elements in the `pDescriptions` array, and
on return the variable is overwritten with the number of structures actually
written to `pDescriptions`.
If `pDescriptionCount` is less than the number shader instrumentation
metrics available, at most `pDescriptionCount` structures will be
written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available shader
instrumentation metrics were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-physicalDevice-parameter) VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptionCount-parameter) VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptionCount-parameter

 `pDescriptionCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptions-parameter) VUID-vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM-pDescriptions-parameter

 If the value referenced by `pDescriptionCount` is not `0`, and `pDescriptions` is not `NULL`, `pDescriptions` **must** be a valid pointer to an array of `pDescriptionCount` [VkShaderInstrumentationMetricDescriptionARM](#VkShaderInstrumentationMetricDescriptionARM) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

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

The `VkShaderInstrumentationMetricDescriptionARM` structure is defined
as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkShaderInstrumentationMetricDescriptionARM {
    VkStructureType    sType;
    void*              pNext;
    char               name[VK_MAX_DESCRIPTION_SIZE];
    char               description[VK_MAX_DESCRIPTION_SIZE];
} VkShaderInstrumentationMetricDescriptionARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`name` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a short human
readable name for this shader instrumentation metric.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a human readable
description for this shader instrumentation metric.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-sType-sType) VUID-VkShaderInstrumentationMetricDescriptionARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_METRIC_DESCRIPTION_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-pNext-pNext) VUID-VkShaderInstrumentationMetricDescriptionARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-name-parameter) VUID-VkShaderInstrumentationMetricDescriptionARM-name-parameter

 `name` **must** be a null-terminated UTF-8 string whose length is less than or equal to [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE)

* 
[](#VUID-VkShaderInstrumentationMetricDescriptionARM-description-parameter) VUID-VkShaderInstrumentationMetricDescriptionARM-description-parameter

 `description` **must** be a null-terminated UTF-8 string whose length is less than or equal to [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE)

Shader instrumentation metrics are captured via instrumentation objects.

Shader instrumentation objects are represented by
`VkShaderInstrumentationARM` handles:

// Provided by VK_ARM_shader_instrumentation
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkShaderInstrumentationARM)

To create a shader instrumentation object, call:

// Provided by VK_ARM_shader_instrumentation
VkResult vkCreateShaderInstrumentationARM(
    VkDevice                                    device,
    const VkShaderInstrumentationCreateInfoARM* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkShaderInstrumentationARM*                 pInstrumentation);

* 
`device` is the logical device that creates the shader
instrumentation object.

* 
`pCreateInfo` is a pointer to a
[VkShaderInstrumentationCreateInfoARM](#VkShaderInstrumentationCreateInfoARM) structure containing
information about how the shader instrumentation object is to be
created.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pInstrumentation` is a pointer to a handle in which the resulting
shader instrumentation object is returned.

Valid Usage

Valid Usage (Implicit)

* 
[](#VUID-vkCreateShaderInstrumentationARM-device-parameter) VUID-vkCreateShaderInstrumentationARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateShaderInstrumentationARM-pCreateInfo-parameter) VUID-vkCreateShaderInstrumentationARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkShaderInstrumentationCreateInfoARM](#VkShaderInstrumentationCreateInfoARM) structure

* 
[](#VUID-vkCreateShaderInstrumentationARM-pAllocator-parameter) VUID-vkCreateShaderInstrumentationARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateShaderInstrumentationARM-pInstrumentation-parameter) VUID-vkCreateShaderInstrumentationARM-pInstrumentation-parameter

 `pInstrumentation` **must** be a valid pointer to a [VkShaderInstrumentationARM](#VkShaderInstrumentationARM) handle

* 
[](#VUID-vkCreateShaderInstrumentationARM-device-queuecount) VUID-vkCreateShaderInstrumentationARM-device-queuecount

 The device **must** have been created with at least `1` queue

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

The `VkShaderInstrumentationCreateInfoARM` structure is defined as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkShaderInstrumentationCreateInfoARM {
    VkStructureType    sType;
    void*              pNext;
} VkShaderInstrumentationCreateInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderInstrumentationCreateInfoARM-sType-sType) VUID-VkShaderInstrumentationCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_CREATE_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkShaderInstrumentationCreateInfoARM-pNext-pNext) VUID-VkShaderInstrumentationCreateInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

To destroy a shader instrumentation object, call:

// Provided by VK_ARM_shader_instrumentation
void vkDestroyShaderInstrumentationARM(
    VkDevice                                    device,
    VkShaderInstrumentationARM                  instrumentation,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the shader
instrumentation.

* 
`instrumentation` is the handle of the shader instrumentation to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyShaderInstrumentationARM-instrumentation-12374) VUID-vkDestroyShaderInstrumentationARM-instrumentation-12374

All submitted commands that refer to `instrumentation` **must** have
completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyShaderInstrumentationARM-device-parameter) VUID-vkDestroyShaderInstrumentationARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyShaderInstrumentationARM-instrumentation-parameter) VUID-vkDestroyShaderInstrumentationARM-instrumentation-parameter

 If `instrumentation` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `instrumentation` **must** be a valid [VkShaderInstrumentationARM](#VkShaderInstrumentationARM) handle

* 
[](#VUID-vkDestroyShaderInstrumentationARM-pAllocator-parameter) VUID-vkDestroyShaderInstrumentationARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyShaderInstrumentationARM-instrumentation-parent) VUID-vkDestroyShaderInstrumentationARM-instrumentation-parent

 If `instrumentation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `instrumentation` **must** be externally synchronized

To begin shader instrumentation, call:

// Provided by VK_ARM_shader_instrumentation
void vkCmdBeginShaderInstrumentationARM(
    VkCommandBuffer                             commandBuffer,
    VkShaderInstrumentationARM                  instrumentation);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`instrumentation` is the handle of the shader instrumentation object
that will capture the metrics.

After beginning shader instrumentation, shader instrumentation is considered
*active* within the command buffer it was called in until shader
instrumentation is ended.

The shader instrumentation object has an implicit result index where the
per-shader metrics will be written.
The result index is set to 0 when the object is created by calling
`vkCreateShaderInstrumentationARM`, and incremented by `1` for each
draw, dispatch, and ray tracing command recorded while the shader
instrumentation object is active.

The result index is also incremented by `1` when
[vkCmdExecuteGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdExecuteGeneratedCommandsEXT) is recorded.

While shader instrumentation is active, instrumented shaders write to the
instrumentation object.
These writes **must** be synchronized using the instrumented shader’s stage
with access mask [VK_ACCESS_2_SHADER_WRITE_BIT](synchronization.html#VkAccessFlagBits2KHR).
If no instrumentation object is bound, writes are discarded.

If a command buffer is submitted multiple times, the shader instrumented
metrics for all submissions will be aggregated in the instrumentation
object, unless the metrics are [cleared](#shaders-instrumentation-clear)
between submissions.

Valid Usage

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12375) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12375

This command **must** not be recorded while shader instrumentation is
active within `commandBuffer`

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12376) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-12376

`commandBuffer` **must** not be a protected command buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-parameter) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-instrumentation-parameter) VUID-vkCmdBeginShaderInstrumentationARM-instrumentation-parameter

 `instrumentation` **must** be a valid [VkShaderInstrumentationARM](#VkShaderInstrumentationARM) handle

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-recording) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-cmdpool) VUID-vkCmdBeginShaderInstrumentationARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-suspended) VUID-vkCmdBeginShaderInstrumentationARM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-videocoding) VUID-vkCmdBeginShaderInstrumentationARM-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginShaderInstrumentationARM-commonparent) VUID-vkCmdBeginShaderInstrumentationARM-commonparent

 Both of `commandBuffer`, and `instrumentation` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to `instrumentation` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdBeginShaderInstrumentationARM is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To end shader instrumentation, call:

// Provided by VK_ARM_shader_instrumentation
void vkCmdEndShaderInstrumentationARM(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

Once recorded, shader instrumentation is no longer considered *active*
within the command buffer.

Valid Usage

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12377) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12377

Shader instrumentation **must** be active within `commandBuffer`

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12378) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12378

`commandBuffer` **must** not be a protected command buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-parameter) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-recording) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-cmdpool) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-suspended) VUID-vkCmdEndShaderInstrumentationARM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-videocoding) VUID-vkCmdEndShaderInstrumentationARM-videocoding

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

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndShaderInstrumentationARM is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Data **can** be retrieved from an instrumentation object in units of metric
blocks.
The size of each metric block in bytes is
`sizeof`([VkShaderInstrumentationMetricDataHeaderARM](#VkShaderInstrumentationMetricDataHeaderARM)) + 
`sizeof`(uint64_t) ×
`VkPhysicalDeviceShaderInstrumentationPropertiesARM`::`numMetrics`.

To retrieve metric blocks from an instrumentation object, call:

// Provided by VK_ARM_shader_instrumentation
VkResult vkGetShaderInstrumentationValuesARM(
    VkDevice                                    device,
    VkShaderInstrumentationARM                  instrumentation,
    uint32_t*                                   pMetricBlockCount,
    void*                                       pMetricValues,
    VkShaderInstrumentationValuesFlagsARM       flags);

* 
`device` is the logical device that was used to capture shader
instrumentation data.

* 
`instrumentation` is the shader instrumentation object to retrieve
values from

* 
`pMetricBlockCount` is a pointer to an integer related to the number
of metric blocks available or queried.

* 
`pMetricValues` is either `NULL` or a pointer to an
application-allocated buffer where the results will be written.

* 
`flags` is reserved for future use.

If `pMetricValues` is `NULL`, then the number of metric blocks available
is returned in `pMetricBlockCount`.
Otherwise, `pMetricBlockCount` **must** point to a variable set by the
application to the number of elements in the `pMetricValues` array, and
on return the variable is overwritten with the number of metric blocks
actually written to `pMetricValues`.
If `pMetricBlockCount` is less than the number of metric blocks
available, at most `pMetricBlockCount` elements will be written, and
[VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to
indicate that not all the available metric blocks were returned.

Metrics are written to `pMetricValues` as a tightly packed array of
metric blocks, where each block consists of a
`VkShaderInstrumentationMetricDataHeaderARM` header followed by
`VkPhysicalDeviceShaderInstrumentationPropertiesARM`::`numMetrics`
unsigned 64-bit values.
The order of the metrics matches the order in which they are enumerated by
[vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM](#vkEnumeratePhysicalDeviceShaderInstrumentationMetricsARM).

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-device-parameter) VUID-vkGetShaderInstrumentationValuesARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parameter) VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parameter

 `instrumentation` **must** be a valid [VkShaderInstrumentationARM](#VkShaderInstrumentationARM) handle

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-pMetricBlockCount-parameter) VUID-vkGetShaderInstrumentationValuesARM-pMetricBlockCount-parameter

 `pMetricBlockCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-pMetricValues-parameter) VUID-vkGetShaderInstrumentationValuesARM-pMetricValues-parameter

 `pMetricValues` **must** be a pointer value

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-flags-zerobitmask) VUID-vkGetShaderInstrumentationValuesARM-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parent) VUID-vkGetShaderInstrumentationValuesARM-instrumentation-parent

 `instrumentation` **must** have been created, allocated, or retrieved from `device`

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

// Provided by VK_ARM_shader_instrumentation
typedef VkFlags VkShaderInstrumentationValuesFlagsARM;

`VkShaderInstrumentationValuesFlagsARM` is a bitmask type for parameters
to the retrieval, but is currently reserved for future use.

The shader instrumentation metrics block header is defined as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkShaderInstrumentationMetricDataHeaderARM {
    uint32_t              resultIndex;
    uint32_t              resultSubIndex;
    VkShaderStageFlags    stages;
    uint32_t              basicBlockIndex;
} VkShaderInstrumentationMetricDataHeaderARM;

* 
`resultIndex` is the result index of the metric block, as captured
when the command was recorded.

* 
`resultSubIndex` is a secondary index with the result index,
explained further below.

* 
`stages` is a bitfield of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) describing the
shader stages that the metric block is for.

* 
`basicBlockIndex` is the index of the basic block within the shader
that the metric block is for.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-parameter) VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-parameter

 `stages` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-requiredbitmask) VUID-VkShaderInstrumentationMetricDataHeaderARM-stages-requiredbitmask

 `stages` **must** not be `0`

The `resultIndex` is the index captured during command buffer recording,
and identifies the draw, dispatch, or ray tracing command that the metrics
are captured for.

Metrics are returned in ascending order of `resultIndex` values.
Metrics with the same value of `resultIndex` are returned in ascending
order of `resultSubIndex` values.
Metrics with the same value of `resultIndex` and `resultSubIndex`
are grouped by the value of `stages`.
Metrics with the same value of `resultIndex`, `resultSubIndex`, and
`stages` are returned in ascending order of `basicBlockIndex`
values.

All metrics for commands that record multiple draws (such as indirect
drawing commands with `drawCount` greater than one), dispatches,
or involve groups of shaders (such as ray tracing pipelines),
are returned using the same `resultIndex`.

Implementations **may** use a non-zero `resultSubIndex` to report more
fine-grained metrics (such as per draw) for such commands, or aggregate all
metrics for the command using `resultSubIndex` zero.

Metrics for commands recorded while multiview is enabled are returned as
aggregated values across all views.

Implementations **may** aggregate metrics for multiple shader stages.
The value of `stages` describes which shader stages have been
aggregated.

`basicBlockIndex` describes the index of the basic block of the shader
that metrics are captured for.
If
`VkPhysicalDeviceShaderInstrumentationPropertiesARM`::`perBasicBlockGranularity`
is [VK_FALSE](fundamentals.html#VK_FALSE), results are aggregated for the entire shader and reported
as basic block zero.

To clear the value of all metric blocks in an instrumentation object to
zero, call:

// Provided by VK_ARM_shader_instrumentation
void vkClearShaderInstrumentationMetricsARM(
    VkDevice                                    device,
    VkShaderInstrumentationARM                  instrumentation);

* 
`device` is the logical device that owns the shader instrumentation
object.

* 
`instrumentation` is the shader instrumentation object to clear.

Valid Usage (Implicit)

* 
[](#VUID-vkClearShaderInstrumentationMetricsARM-device-parameter) VUID-vkClearShaderInstrumentationMetricsARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parameter) VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parameter

 `instrumentation` **must** be a valid [VkShaderInstrumentationARM](#VkShaderInstrumentationARM) handle

* 
[](#VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parent) VUID-vkClearShaderInstrumentationMetricsARM-instrumentation-parent

 `instrumentation` **must** have been created, allocated, or retrieved from `device`
