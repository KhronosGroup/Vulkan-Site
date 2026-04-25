# VK_EXT_mesh_shader

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_mesh_shader.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. New Shaders](#new-shaders)
- [3.1._New_Shaders](#new-shaders)
- [3.1.1. Mesh Shaders](#mesh-shaders)
- [3.1.1._Mesh_Shaders](#mesh-shaders)
- [3.1.2. Task Shaders](#task-shaders)
- [3.1.2._Task_Shaders](#task-shaders)
- [3.1.3. Rasterization Order](#_rasterization_order)
- [3.1.3._Rasterization_Order](#_rasterization_order)
- [3.2. API Changes](#_api_changes)
- [3.2._API_Changes](#_api_changes)
- [3.2.1. Graphics Pipeline Creation](#_graphics_pipeline_creation)
- [3.2.1._Graphics_Pipeline_Creation](#_graphics_pipeline_creation)
- [3.2.2. Synchronization](#_synchronization)
- [3.2.3. Queries](#_queries)
- [3.2.4. Draw Calls](#_draw_calls)
- [3.2.4._Draw_Calls](#_draw_calls)
- [3.2.5. Properties](#properties)
- [3.2.6. Features](#_features)
- [3.3. SPIR-V Changes](#_spir_v_changes)
- [3.3._SPIR-V_Changes](#_spir_v_changes)
- [3.4. GLSL Changes](#_glsl_changes)
- [3.4._GLSL_Changes](#_glsl_changes)
- [3.5. HLSL Changes](#_hlsl_changes)
- [3.5._HLSL_Changes](#_hlsl_changes)
- [4. Issues](#_issues)
- [4.1. What are the differences to VK_NV_mesh_shader?](#_what_are_the_differences_to_vk_nv_mesh_shader)
- [4.1._What_are_the_differences_to_VK_NV_mesh_shader?](#_what_are_the_differences_to_vk_nv_mesh_shader)
- [4.2. What are the differences to DirectX® 12’s Mesh shaders?](#_what_are_the_differences_to_directx_12s_mesh_shaders)
- [4.2._What_are_the_differences_to_DirectX®_12’s_Mesh_shaders?](#_what_are_the_differences_to_directx_12s_mesh_shaders)
- [4.3. Can there be more than one output payload in a task shader?](#_can_there_be_more_than_one_output_payload_in_a_task_shader)
- [4.3._Can_there_be_more_than_one_output_payload_in_a_task_shader?](#_can_there_be_more_than_one_output_payload_in_a_task_shader)
- [4.4. Should developers port everything to mesh shading?](#_should_developers_port_everything_to_mesh_shading)
- [4.4._Should_developers_port_everything_to_mesh_shading?](#_should_developers_port_everything_to_mesh_shading)
- [4.5. Does vertex input interface state interact with task/mesh shaders?](#_does_vertex_input_interface_state_interact_with_taskmesh_shaders)
- [4.5._Does_vertex_input_interface_state_interact_with_task/mesh_shaders?](#_does_vertex_input_interface_state_interact_with_taskmesh_shaders)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. New Shaders](#new-shaders)
[3.2. API Changes](#_api_changes)
[3.3. SPIR-V Changes](#_spir_v_changes)
[3.4. GLSL Changes](#_glsl_changes)
[3.5. HLSL Changes](#_hlsl_changes)

[4. Issues](#_issues)

[4.1. What are the differences to VK_NV_mesh_shader?](#_what_are_the_differences_to_vk_nv_mesh_shader)
[4.2. What are the differences to DirectX® 12’s Mesh shaders?](#_what_are_the_differences_to_directx_12s_mesh_shaders)
[4.3. Can there be more than one output payload in a task shader?](#_can_there_be_more_than_one_output_payload_in_a_task_shader)
[4.4. Should developers port everything to mesh shading?](#_should_developers_port_everything_to_mesh_shading)
[4.5. Does vertex input interface state interact with task/mesh shaders?](#_does_vertex_input_interface_state_interact_with_taskmesh_shaders)

This extension provides a new mechanism allowing applications to generate collections of geometric primitives via programmable mesh shading.

The rasterization pipeline for Vulkan is fairly fixed - a fixed input stage assembles vertex data for the vertex shader, data optionally passes through tessellation and geometry stages, then fixed vertex processing passes the resulting primitives to the rasterizer.
As rendering engines get increasingly complex, the fixed nature of this pipeline has become a bottleneck; many developers are augmenting their rasterization pipelines with compute shaders to make them more flexible.
Using compute shaders comes at a cost though - data has to be piped via global memory, and once there it still has to be optimized for an implementation’s vertex caches or face performance penalties.
With compute shaders processing geometry, the role of the vertex shader is also somewhat redundant - transformations could be performed just as easily in compute shaders, and the vertex shader serves merely as a way to get at the fixed rasterization interface.

This proposal aims to find a way to make the geometry pipeline more flexible, removing the unnecessary cost of an extra shader.

Making the geometry pipeline more flexible requires rethinking how data is transmitted from buffers to device memory; ideally a solution should allow applications to flexibly modify the set of geometry as a whole in the way developers are currently using compute shaders, and how they may use them in future (e.g. culling, grouping, decompression), without compromising on efficiency. Some considered ways to do this include:

Giving vertex shaders defined grouping, and enabling communication via subgroup operations

Skipping the vertex shader and using geometry or tessellation shaders at the start of the pipeline

Use compute shaders in place of pre-rasterization shader stages

While a defined grouping in the vertex shaders would give applications the ability to manipulate sets of vertices, there is very limited ability to cull or remove vertices or primitives within a group, and the groups would be limited by the size of subgroups on the GPU without significant modifications.
Similarly, applications would be largely constrained by fixed input assembly requiring a 1:1 ratio of indices to input vertices, meaning things like decompressing meshes or acting at any granularity other than vertices would be infeasible.
Changing the vertex stage to accommodate this extra flexibility would require significant changes to how the stage works, which could likely better be accommodated by other existing stages.

Skipping vertex shading and jumping straight to geometry or tessellation stages would provide a level of flexibility that could be interesting - both have access to geometric data at a granularity other than vertices, and are able to remove or add geometric detail before rasterization.
The main issues with these stages is that they are still rather fixed in terms of inputs, output topology, and the granularity they operate at - they are also historically not very efficient across platforms, and removing the vertex shader from the front of the pipeline would not do much to help that.

The last clear option is to effectively use compute shaders in place of existing rasterization stages, enabling applications to more easily port existing compute shaders to this new extension with all the flexibility intact.
The main difficulty with this is simply defining the interface between the shader and the rasterizer, as existing compute shaders simply write out to buffers, whereas rasterization hardware is highly specialized, and may need to be fed in a particular manner.

This extension opts for something close to option 3, by replacing all pre-rasterization shaders in the graphics pipeline with two new stages that operate like compute shaders but with output that can be consumed by the rasterizer.

This proposal adds two new shader stages, which can be used in place of the existing pre-rasterization shader stages; [Mesh Shaders](#mesh-shaders) and [Task Shaders](#task-shaders).

Mesh shaders are a new compute-like shader stage that has a primary aim of generating a set of primitives to the rasterizer, which are passed via its new output interface.
For the most part, these map well to compute shaders - they are dispatched in workgroups and have access to shared memory, workgroup barriers, and local IDs, allowing for a lot of flexibility in how they are executed.

Unlike vertex shaders, they do not use the vertex input interface, and geometry and indices **must** be generated by the shader or read from buffers with no requirement for applications to provide the data in a particular way.
As such, this allows applications to read or generate data however they need to, removing the need to prepare data before launching the graphics pipeline.
This allows items such as decompression or decryption of data to be performed within the graphics pipeline directly, avoiding the bandwidth cost typically associated with compute shaders.

Another key part of mesh shaders is that the number of primitives that a given workgroup can emit is dynamic - there are limits to how much can be emitted, which is advertised by the implementation, but applications can freely emit fewer primitives than the maximum.
This allows things like modifying the LOD at a fine granularity without the use of tessellation.
Vertex outputs are written via the `Output` storage class and using standard built-ins like `Position` and `PointSize`, but are written as arrays in the same way as a tessellation control shader’s outputs.
Additionally, the mesh shader outputs indices per primitive according to the output primitive type (points, lines, or triangles). Indices are emitted as a separate array in a similar fashion to vertex outputs.
Mesh shader output topologies are lists only - there is no support for triangle or line strips or triangle fans; data in these formats must be unpacked by the shader.
Other user data can be emitted at per-vertex or per-primitive rates alongside these built-ins.
Mesh shaders must specify the actual number of primitives and vertices being emitted before writing them, via the `OpSetMeshOutputsEXT` instruction.
Subsequent fragment shaders can retrieve input data at both rates, tied to the vertices and primitive being rasterized.

Mesh shaders can be dispatched from the API like a compute shader would be, or launched via [Task Shaders](#task-shaders).

Task shaders are an optional shader stage that executes ahead of mesh shaders. A task shader is dispatched like a compute shader, and indirectly dispatches mesh shader workgroups.
This shader is another compute-like stage that is executed in workgroups and has all the other features of compute shaders as well, with the addition of access to a dedicated instruction to launch mesh shaders.

The primary function of task shaders is to dispatch mesh shaders via `OpEmitMeshTasksEXT`, which takes as input a number of mesh shader groups to emit, and a payload variable that will be visible to all mesh shader invocations launched by this instruction.
This instruction is executed once per workgroup rather than per-invocation, and the payload itself is in a workgroup-wide storage class, similar to shared memory.
Once this instruction is called, the workgroup is terminated immediately, and the mesh shaders are launched.

Task shaders can be used for functionality like coarse culling of entire meshlets or dynamically generating more or less geometry depending on the LOD required.
This is notionally similar to the purpose of tessellation shaders, but without the constraint of fixed functionality, and with greater flexibility in how primitives are executed.
Applications can use task shaders to determine the number of launched mesh shader workgroups at whatever input granularity they want, and however they see fit.

As task and mesh shaders change how primitives are dispatched, a subsequent modification of rasterization order is made.
Within a mesh shader workgroup, primitives are rasterized in the order in which they are defined in the output index array.
A group of mesh shader workgroups either launched directly by the API, indirectly by the API,
or indirectly from a single task shader workgroup will rasterize their outputs in sequential order based on their flattened workgroup index,
equal to *x* + *y* * *width* + *z* * *width* * *height*, where *x*, *y*, and *z* refer to the components of the `WorkgroupId` built-in.
*width* and *height* are equal to `NumWorkgroups` for their respective dimensions.
When using task shaders, there is a similar sequential order based on the flattened workgroup index for the task shader dispatch.
Mesh workgroups launched from a later task workgroup rasterize their output after the ones launched by an earlier task workgroup.

Graphics pipelines can now be created using mesh and task shaders in place of vertex, tessellation, and geometry shaders.
This can be achieved by omitting existing pre-rasterization shaders and including a mesh shader stage, and optionally a task shader stage.
When present, a graphics pipeline is complete without the inclusion of the [vertex input state subset](https://www.khronos.org/registry/vulkan/specs/latest/html/vkspec.html#pipeline-graphics-subsets-vertex-input), as this state does not participate in mesh pipelines.
No other modifications to graphics pipelines are necessary.
Two new shader stages are added to the API to describe the new shader stages:

VK_SHADER_STAGE_TASK_BIT = 0x40,
VK_SHADER_STAGE_MESH_BIT = 0x80,

Note that `VK_SHADER_STAGE_ALL_GRAPHICS_BIT` was defined as a mask of existing bits during Vulkan 1.0 development, and thus cannot include these new bits; modifying it would break compatibility.

New pipeline stages are added for synchronization of these new stages:

VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT = 0x80000,
VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT = 0x100000,

static const VkPipelineStageFlagBits2KHR VK_PIPELINE_STAGE_TASK_SHADER_BIT_2_EXT = 0x00080000ULL;
static const VkPipelineStageFlagBits2KHR VK_PIPELINE_STAGE_MESH_SHADER_BIT_2_EXT = 0x00100000ULL;

These new pipeline stages interact similarly to compute shaders, with all the same access types and operations.
They are also logically ordered before fragment shading, but have no logical ordering compared to existing pre-rasterization shader stages.
The `VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT` stage added by [VK_KHR_synchronization2](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_synchronization2) includes these new shader stages, and can be used identically.

Pipeline statistics queries are updated with new bits to count mesh and task shader invocations, in a similar manner to how other shader invocations are counted:

VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT = 0x800,
VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT = 0x1000,

An additional standalone query counting the number of mesh primitives generated is added:

VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT = 1000328000,

An active query of this type will generate a count of every individual primitive emitted from any mesh shader workgroup that is not culled by fixed function culling.

Three new draw calls are added to the API to dispatch mesh pipelines:

VKAPI_ATTR void VKAPI_CALL vkCmdDrawMeshTasksEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    groupCountX,
    uint32_t                                    groupCountY,
    uint32_t                                    groupCountZ);

VKAPI_ATTR void VKAPI_CALL vkCmdDrawMeshTasksIndirectEXT(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    buffer,
    VkDeviceSize                                offset,
    uint32_t                                    drawCount,
    uint32_t                                    stride);

VKAPI_ATTR void VKAPI_CALL vkCmdDrawMeshTasksIndirectCountEXT(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    buffer,
    VkDeviceSize                                offset,
    VkBuffer                                    countBuffer,
    VkDeviceSize                                countBufferOffset,
    uint32_t                                    maxDrawCount,
    uint32_t                                    stride);

typedef struct VkDrawMeshTasksIndirectCommandEXT {
    uint32_t    x;
    uint32_t    y;
    uint32_t    z;
} VkDrawMeshTasksIndirectCommandEXT;

`vkCmdDrawMeshTasksEXT` is the simplest as it functions the same as [vkCmdDispatch](https://docs.vulkan.org/spec/latest/chapters/dispatch.html#vkCmdDispatch), but dispatches the mesh or task shader in a graphics pipeline with the specified workgroup counts, rather than a compute shader.

`vkCmdDrawMeshTasksIndirectEXT` functions similarly to [vkCmdDispatchIndirect](https://docs.vulkan.org/spec/latest/chapters/dispatch.html#vkCmdDispatchIndirect), but with the draw count functionality from other draw commands.
Multiple draws are dispatched according to the `drawCount` parameter, with data in buffer being consumed as a strided array of `VkDrawMeshTasksIndirectCommandEXT` structures, with stride equal to `stride`.
Each element of this array defines a separate draw call’s workgroup counts in each dimension, and dispatches mesh or task shaders for the current pipeline accordingly.

`vkCmdDrawMeshTasksIndirectCountEXT` functions as `vkCmdDrawMeshTasksIndirectEXT`, but takes its draw count from the device as well.
The draw count is read from `countBuffer` at an offset of `countBufferOffset`, and must be lower than `maxDrawCount`.

Several new properties are added to the API - some dictating hard limits, and others indicating performance considerations:

typedef struct VkPhysicalDeviceMeshShaderPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxTaskWorkGroupTotalCount;
    uint32_t           maxTaskWorkGroupCount[3];
    uint32_t           maxTaskWorkGroupInvocations;
    uint32_t           maxTaskWorkGroupSize[3];
    uint32_t           maxTaskPayloadSize;
    uint32_t           maxTaskSharedMemorySize;
    uint32_t           maxTaskPayloadAndSharedMemorySize;
    uint32_t           maxMeshWorkGroupTotalCount;
    uint32_t           maxMeshWorkGroupCount[3];
    uint32_t           maxMeshWorkGroupInvocations;
    uint32_t           maxMeshWorkGroupSize[3];
    uint32_t           maxMeshSharedMemorySize;
    uint32_t           maxMeshPayloadAndSharedMemorySize;
    uint32_t           maxMeshOutputMemorySize;
    uint32_t           maxMeshPayloadAndOutputMemorySize;
    uint32_t           maxMeshOutputComponents;
    uint32_t           maxMeshOutputVertices;
    uint32_t           maxMeshOutputPrimitives;
    uint32_t           maxMeshOutputLayers;
    uint32_t           maxMeshMultiviewViewCount;
    uint32_t           meshOutputPerVertexGranularity;
    uint32_t           meshOutputPerPrimitiveGranularity;
    uint32_t           maxPreferredTaskWorkGroupInvocations;
    uint32_t           maxPreferredMeshWorkGroupInvocations;
    VkBool32           prefersLocalInvocationVertexOutput;
    VkBool32           prefersLocalInvocationPrimitiveOutput;
    VkBool32           prefersCompactVertexOutput;
    VkBool32           prefersCompactPrimitiveOutput;
} VkPhysicalDeviceMeshShaderPropertiesEXT;

The following limits affect task shader execution:

* 
`maxTaskWorkGroupTotalCount` indicates the total number of workgroups that can be launched for a task shader.

* 
`maxTaskWorkGroupCount` indicates the number of workgroups that can be launched for a task shader in each given dimension.

* 
`maxTaskWorkGroupInvocations` indicates the total number of invocations that can be launched for a task shader in a single workgroup.

* 
`maxTaskWorkGroupSize` indicates the maximum number of invocations for a task shader in each dimension for a single workgroup.

* 
`maxTaskPayloadSize` indicates the maximum total size of task shader output payloads.

* 
`maxTaskSharedMemorySize` indicates the maximum total size of task shader shared memory variables.

* 
`maxTaskPayloadAndSharedMemorySize` indicates the maximum total combined size of task shader output payloads and shared memory variables.

Similar limits affect task shader execution:

* 
`maxMeshWorkGroupTotalCount` indicates the total number of workgroups that can be launched for a mesh shader.

* 
`maxMeshWorkGroupCount` indicates the number of workgroups that can be launched for a mesh shader in each given dimension.

* 
`maxMeshWorkGroupInvocations` indicates the total number of invocations that can be launched for a mesh shader in a single workgroup.

* 
`maxMeshWorkGroupSize` indicates the maximum number of invocations for a mesh shader in each dimension for a single workgroup.

* 
`maxMeshSharedMemorySize` indicates the maximum total size of mesh shader shared memory variables.

* 
`maxMeshPayloadAndSharedMemorySize` indicates the maximum total combined size of mesh shader input payloads and shared memory variables.

* 
`maxMeshSharedMemorySize` indicates the maximum total size of mesh shader output variables.

* 
`maxMeshPayloadAndOutputMemorySize` indicates the maximum total combined size of mesh shader input payloads and output variables.

* 
`maxMeshOutputComponents` is the maximum number of components of mesh shader output variables.

* 
`maxMeshOutputVertices` is the maximum number of vertices a mesh shader can emit.

* 
`maxMeshOutputPrimitives` is the maximum number of primitives a mesh shader can emit.

* 
`maxMeshOutputLayers` is the maximum number of layers that a mesh shader can render to.

* 
`maxMeshMultiviewViewCount` is the maximum number of views that a mesh shader can render to.

When considering the above properties, the number of mesh shader outputs a shader uses are rounded up to implementation-defined numbers defined by the following properties:

* 
`meshOutputPerVertexGranularity` is the alignment of each per-vertex mesh shader output.

* 
`meshOutputPerPrimitiveGranularity` is the alignment of each per-primitive mesh shader output.

The following properties are implementation preferences.
Violating these limits will not result in validation errors, but it is strongly recommended that applications adhere to them in order to maximize performance on each implementation.

* 
`maxPreferredTaskWorkGroupInvocations` indicates the maximum preferred number of task shader invocations in a single workgroup.

* 
`maxPreferredMeshWorkGroupInvocations` indicates the maximum preferred number of mesh shader invocations in a single workgroup.

* 
If `prefersLocalInvocationVertexOutput` is `VK_TRUE`, the implementation will perform best when each invocation writes to an array index in the per-vertex output matching `LocalInvocationIndex`.

* 
If `prefersLocalInvocationPrimitiveOutput` is `VK_TRUE`, the implementation will perform best when each invocation writes to an array index in the per-primitive output matching `LocalInvocationIndex`.

* 
If `prefersCompactVertexOutput` is `VK_TRUE`, the implementation will perform best if there are no unused vertices in the output array.

* 
If `prefersCompactPrimitiveOutput` is `VK_TRUE`, the implementation will perform best if there are no unused primitives in the output array.

Note that even if some of the above values are false, the implementation can still perform just as well whether or not the corresponding preferences are followed. It is recommended to follow these preferences unless the performance cost of doing so outweighs the gains of hitting the optimal paths in the implementation.

A few new features are introduced by this extension:

typedef struct VkPhysicalDeviceMeshShaderFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           taskShader;
    VkBool32           meshShader;
    VkBool32           multiviewMeshShader;
    VkBool32           primitiveFragmentShadingRateMeshShader;
    VkBool32           meshShaderQueries;
} VkPhysicalDeviceMeshShaderFeaturesEXT;

* 
`taskShader` indicates support for task shaders and associated features - if not enabled, only mesh shaders can be used.

* 
`meshShader` indicates support for mesh shaders and associated features - if not enabled, none of the features in this extension can be used.

* 
`multiviewMeshShader` indicates support for the use of multi-view with mesh shaders.

* 
`primitiveFragmentShadingRateMeshShader` indicates whether the per-primitive fragment shading rate can be written by mesh shaders when fragment shading rates are supported.

* 
`meshShaderQueries` indicates support for the new queries added by this extension.

One new capability is added gating all of the new functionality:

MeshShadingEXT

Two new execution models are added, corresponding to the two [New Shaders](#new-shaders) added by this extension:

TaskEXT
MeshEXT

Task shader output/mesh shader input payloads are declared in a new storage class:

TaskPayloadWorkgroupEXT

Variables in this storage class are accessible by all invocations in a workgroup in a task shader, and is broadcast to all invocations in workgroups dispatched by the same task shader workgroup where it is read-only.

In task shaders, `TaskPayloadWorkgroupEXT` is a hybrid of `Output` and `Workgroup` storage classes. It supports all usual operations `Workgroup` supports, with the caveats of:

No explicit memory layout support with `VK_KHR_workgroup_memory_explicit_layout`

Can be declared independently of `Workgroup`, meaning local scratch workgroup memory can still be used with `VK_KHR_workgroup_memory_explicit_layout`

Has two separate limits for size, `maxTaskPayloadSize` for its size in isolation, and `maxTaskPayloadAndSharedMemorySize` for the combined size

Mesh shaders declare the type of primitive being output by way of three execution modes, two of which are introduced by this extension:

OutputPoints
OutputLinesEXT
OutputTrianglesEXT

Mesh shaders declare the maximum number of vertex and primitives the shader will ever emit for the invocation group by way of two execution modes, one of which is introduced by this extension:

OutputVertices
OutputPrimitivesEXT

A new decoration is added to for mesh shader outputs/fragment shader inputs to indicate per-primitive data rather than per-vertex data:

PerPrimitiveEXT

New per-primitive built-ins are added:

PrimitivePointIndicesEXT
PrimitiveLineIndicesEXT
PrimitiveTriangleIndicesEXT
CullPrimitiveEXT

Each of the `Primitive*IndicesEXT` built-ins is used when the corresponding execution mode is specified, declared as scalars or vectors with a number of components equal to the number of vertices in the primitive type.
`CullPrimitiveEXT` is a per-primitive boolean value indicating to the implementation that its corresponding primitive must not be rasterized and is instead discarded with no further processing once emitted.

A new instruction is added to task shaders to launch mesh shader workgroups:

| **OpEmitMeshTasksEXT**
| --- | --- | --- | --- | --- | --- |

Defines the grid size of subsequent mesh shader workgroups to generate
upon completion of the task shader workgroup.

'Group Count X Y Z' must each be a 32-bit unsigned integer value.
They configure the number of local workgroups in each respective dimensions
for the launch of child mesh tasks. See Vulkan API specification for more detail.

'Payload' is an optional pointer to the payload structure to pass to the generated mesh shader invocations.
'Payload' must be the result of an **OpVariable** with a storage class of **TaskPayloadWorkgroupEXT**.

The arguments are taken from the first invocation in each workgroup.
Any invocation must execute this instruction exactly once and under uniform
control flow.
This instruction also serves as an **OpControlBarrier** instruction, and also
performs and adheres to the description and semantics of an **OpControlBarrier**
instruction with the 'Execution' and 'Memory' operands set to **Workgroup** and
the 'Semantics' operand set to a combination of **WorkgroupMemory** and
**AcquireRelease**.
Ceases all further processing: Only instructions executed before
**OpEmitMeshTasksEXT** have observable side effects.

This instruction must be the last instruction in a block.

This instruction is only valid in the **TaskEXT** Execution Model. | Capability:

**MeshShadingEXT** |
| 4 + variable | 5294 | ''

'Group Count X' | ''

'Group Count Y' | ''

'Group Count Z' | Optional

''

'Payload' |

A new mesh shader instruction is added to set the number of actual primitives and vertices that a mesh shader writes, avoiding unnecessary allocations or processing by the implementation:

| **OpSetMeshOutputsEXT**
| --- | --- | --- | --- |

Sets the actual output size of the primitives and vertices that the mesh shader
workgroup will emit upon completion.

'Vertex Count' must be a 32-bit unsigned integer value.
It defines the array size of per-vertex outputs.

'Primitive Count' must a 32-bit unsigned integer value.
It defines the array size of per-primitive outputs.

The arguments are taken from the first invocation in each workgroup.
Any invocation must execute this instruction no more than once and under
uniform control flow.
There must not be any control flow path to an output write that is not preceded
by this instruction.

This instruction is only valid in the **MeshEXT** Execution Model. | Capability:

**MeshShadingEXT** |
| 3 | 5295 | ''

'Vertex Count' | ''

'Primitive Count' |

This instruction must be called before writing to mesh shader outputs.

Mesh shaders defined in GLSL the same as compute shaders, with the addition of access to shader outputs normally available in vertex shaders and the following new features:

out uint  gl_PrimitivePointIndicesEXT[];
out uvec2 gl_PrimitiveLineIndicesEXT[];
out uvec3 gl_PrimitiveTriangleIndicesEXT[];

These built-ins correspond to the identically named SPIR-V constructs, and are written in the same way.
Applications should access only the index output corresponding to the primitive type declared by the following layout qualifiers:

points
lines
triangles

Each layout qualifier is declared as `layout() out;`.

A new auxiliary storage qualifier can be added to interface variables to indicate that they are per-primitive rate:

perprimitiveEXT

New write-only output blocks are defined for built-in output values from mesh shaders:

out gl_MeshPerVertexEXT {
  vec4  gl_Position;
  float gl_PointSize;
  float gl_ClipDistance[];
  float gl_CullDistance[];
} gl_MeshVerticesEXT[];

perprimitiveEXT out gl_MeshPerPrimitiveEXT {
  int  gl_PrimitiveID;
  int  gl_Layer;
  int  gl_ViewportIndex;
  bool gl_CullPrimitiveEXT;
  int  gl_PrimitiveShadingRateEXT;
} gl_MeshPrimitivesEXT[];

Note that some existing outputs that previously were associated by provoking vertices are now directly declared as per-primitive variables.

Finally a new mesh-shader function is added:

void SetMeshOutputsEXT(uint vertexCount,
                       uint primitiveCount)

This function maps exactly to the `OpSetMeshOutputsEXT` instruction - setting the number of valid vertices and primitives that are output by the mesh shader workgroup.

Task shader payloads can be declared in task and mesh shaders using the new `taskPayloadSharedEXT` storage qualifier as follows:

taskPayloadSharedEXT MyPayloadStruct {
    ...
} payload;

Finally a new function corresponding to `OpEmitMeshTasksEXT` is added to launch mesh workgroups:

void EmitMeshTasksEXT(uint groupCountX,
                      uint groupCountY,
                      uint groupCountZ)

The HLSL specification for mesh shaders is defined by Microsoft® here: [https://microsoft.github.io/DirectX-Specs/d3d/MeshShader.html](https://microsoft.github.io/DirectX-Specs/d3d/MeshShader.html).

Everything in that specification should work directly as described, with the exception of linking per-primitive interface variables between pixel and mesh shaders.
Microsoft defined the fragment/mesh interface to effectively be fixed up at link time - making no distinction between per-vertex and per-primitive variables in the pixel shader.
This works okay with monolithic pipeline construction, but with the addition of things like [VK_EXT_graphics_pipeline_library](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_graphics_pipeline_library), modifying this at link time would cause undesirable slowdown.
As a result, the Vulkan version of this feature requires the `[[vk::perprimitive]]` attribute on pixel shader inputs in order to generate a match with mesh shader outputs denoted with the `primitives` qualifier.

Mapping to SPIR-V is largely performed identically to any other shader for both mesh and task shaders, with most new functionality mapping 1:1.
One outlier is in index generation - the primitive index outputs are denoted by a variable in the function signature preceded by `out indices …​`.
The HLSL compiler should map this variable to the appropriate built-in value based on the selected `outputtopology` qualifier.

Another outlier is the groupshared task payload. In HLSL this is declared as groupshared, but must be declared in the `TaskPayloadWorkgroupEXT` storage class in SPIR-V.
The call to `DispatchMesh()` can inform the compiler which groupshared variable to promote to `TaskPayloadWorkgroupEXT`.

The following changes have been made to the API:

* 
Drawing mesh tasks can now be done with a three-dimensional number of workgroups, rather than just one-dimensional.

* 
There are new device queries for the number of mesh primitives generated, and the number of shader invocations for the new shader stages.

* 
A new command token is added when interacting with VK_NV_device_generated_commands, as mesh shaders from each extension are incompatible.

* 
New optional features have been added for interactions with multiview, primitive fragment shading rate specification, and the new queries.

* 
Support for the taskShader feature has been made mandatory.

* 
Several more device properties are expressed to enable application developers to use mesh shaders optimally across vendors (see [Properties](#properties) for details of how these are expressed and used).

Note that the SPIR-V and GLSL expression of these extensions have changed, details of which are outlined in those extensions.
These changes aim to make the extension more portable across multiple vendors, and increase compatibility with the similar feature in Microsoft® DirectX®.

From the shader side, declaring mesh or amplification shaders in HLSL will have no meaningful differences - HLSL code written for DirectX should also work fine in Vulkan, with all the expected limits and features available.
One difference is present in pixel shaders though - any user-declared attributes with the "primitive" keyword in the mesh shader will need to be declared in the fragment shader with the `[[vk::perprimitive]]` attribute to facilitate linking.
This makes it so that the shader can be compiled without modifying the input interface, which is particularly important for interactions with extensions like [VK_EXT_graphics_pipeline_library](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_graphics_pipeline_library).

Some amount of massaging by the HLSL compiler will be required to the shader interfaces as DirectX does linking by name rather than location between mesh and pixel shaders, but the requirement to use `[[vk::perprimitive]]` allows the different attributes to continue using locations in Vulkan.

The only notable difference on the API side is that Vulkan provides additional device properties that allow developers to tune their shaders to different vendors' fast paths, should they wish to.
Details of how these are expressed are detailed [here](#properties).

There can only be one output payload per task shader; one declaration in HLSL or GLSL, and only one in the interface declaration for SPIR-V.
More would have no effect anyway, as only one payload can be emitted for mesh shader consumption.

Mesh shaders are not necessarily a performance win compared to the existing pipeline - their purpose is to offer greater flexibility at decent performance, but this flexibility may come at a cost, and that cost is likely platform dependent.
What task and mesh shading offer is a way to perform novel techniques efficiently compared to the hoops developers would previously have to jump through.
Task and mesh shaders are a tool that should be used when it makes sense to do so - if a developer has a novel technique that would be easier to implement using task and mesh shaders, then they are likely the appropriate tool.
Moving from an existing optimized pipeline without this consideration may lead to decreased performance.

No, topology information is specified within the mesh shader, and data must be read or generated these shader stages programmatically.
