# Mesh Shading

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_NV_mesh_shader/mesh.html

## Table of Contents

- [Task Shader Input](#mesh-task-input)
- [Task_Shader_Input](#mesh-task-input)
- [Task Shader Output](#mesh-task-output)
- [Task_Shader_Output](#mesh-task-output)
- [Mesh Generation](#mesh-generation)
- [Mesh Shader Input](#mesh-input)
- [Mesh_Shader_Input](#mesh-input)
- [Mesh Shader Output](#mesh-output)
- [Mesh_Shader_Output](#mesh-output)
- [Mesh Shader Per-View Outputs](#mesh-output-perview)
- [Mesh_Shader_Per-View_Outputs](#mesh-output-perview)
- [Mesh Shader Primitive Ordering](#mesh-ordering)
- [Mesh_Shader_Primitive_Ordering](#mesh-ordering)

## Content

[Task](../shaders.html#shaders-task) and [mesh shaders](../shaders.html#shaders-mesh) operate in
workgroups to produce a collection of primitives that will be processed by
subsequent stages of the graphics pipeline.

Work on the mesh pipeline is initiated by the application
[drawing](../drawing.html#drawing-mesh-shading) a set of mesh tasks organized in global
workgroups.
If the optional task shader is active, each workgroup triggers the execution
of task shader invocations that will create a new set of mesh workgroups
upon completion.
Each of these created workgroups, or each of the original workgroups if no
task shader is present, triggers the execution of mesh shader invocations.

Each mesh shader workgroup emits zero or more output primitives along with
the group of vertices and their associated data required for each output
primitive.

For every workgroup issued via the drawing commands a group of task shader
invocations is executed.
There are no inputs other than the builtin workgroup identifiers.

The task shader can emit zero or more mesh workgroups to be generated.
Shaders using the `TaskNV` `Execution` `Model` can do so using the
[built-in variable](../interfaces.html#interfaces-builtin-variables) `TaskCountNV`.
This value **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesNV`::`maxTaskOutputCount`.
Shaders using the `TaskEXT` `Execution` `Model` can do so using the
`OpEmitMeshTasksEXT` instruction.
The `groupCountX`, `groupCountY` and `groupCountZ` arguments passed
to this instruction **must** be less than or equal to the respective dimension
within
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshWorkGroupCount`.
The product of these arguments **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshWorkGroupTotalCount`.

The task shader can also pass user-defined data to all mesh shader
invocations that it creates.
Shaders using the `TaskNV` `Execution` `Model` can do so by writing to
output variables that are decorated with `PerTaskNV`.
They are available as inputs in mesh shaders.
Shaders using the `TaskEXT` `Execution` `Model` can do so by writing to a
payload variable with `TaskPayloadWorkgroupEXT` storage class that is
passed to the `OpEmitMeshTasksEXT` instruction.

If a task shader exists, the mesh assembler creates a variable amount of
mesh workgroups depending on each task’s output.
If there is no task shader, the drawing commands emit the mesh shader
invocations directly.

The only inputs available to the mesh shader are variables identifying the
specific workgroup and invocation and, if applicable,
any outputs written as `PerTaskNV`
or
the payload variable passed to the `OpEmitMeshTasksEXT` instruction
by the task shader that spawned the mesh shader’s workgroup.
The mesh shader can operate without a task shader as well.

A mesh shader generates primitives in one of three output modes: points,
lines, or triangles.
For shaders using the `MeshNV` `Execution` `Model` the primitive mode is
specified in the shader using an `OpExecutionMode` instruction with the
`OutputPoints`, `OutputLinesNV`, or `OutputTrianglesNV` modes,
respectively.
For shaders using the `MeshEXT` `Execution` `Model` the primitive mode is
specified in the shader using an `OpExecutionMode` instruction with the
`OutputPoints`, `OutputLinesEXT`, or `OutputTrianglesEXT` modes,
respectively.
Each mesh shader **must** include exactly one output primitive mode.

For shaders using the `MeshNV` `Execution` `Model` the maximum output vertex
count is specified as a literal in the shader using an `OpExecutionMode`
instruction with the mode set to `OutputVertices` and **must** be less than
or equal to
`VkPhysicalDeviceMeshShaderPropertiesNV`::`maxMeshOutputVertices`.
For shaders using the `MeshEXT` `Execution` `Model` the maximum output
vertex count is specified as a literal in the shader using an
`OpExecutionMode` instruction with the mode set to `OutputVertices`
and **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshOutputVertices`.

For shaders using the `MeshNV` `Execution` `Model` the maximum output
primitive count is specified as a literal in the shader using an
`OpExecutionMode` instruction with the mode set to
`OutputPrimitivesNV` and **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesNV`::`maxMeshOutputPrimitives`.
For shaders using the `MeshEXT` `Execution` `Model` the maximum output
primitive count is specified as a literal in the shader using an
`OpExecutionMode` instruction with the mode set to
`OutputPrimitivesEXT`, and **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesEXT`::`maxMeshOutputPrimitives`.

For shaders using the `MeshNV` `Execution` `Model` the number of primitives
output by the mesh shader is provided via writing to the
[built-in variable](../interfaces.html#interfaces-builtin-variables) `PrimitiveCountNV` and
**must** be less than or equal to the maximum output primitive count specified
in the shader.
A variable decorated with `PrimitiveIndicesNV` is an output array of
local index values into the vertex output arrays from which primitives are
assembled according to the output primitive type.
For shaders using the `MeshEXT` `Execution` `Model` the number of vertices
and primitives output by the mesh shader is provided via calling the
`OpSetMeshOutputsEXT` instruction.
The `vertexCount` argument **must** be less than or equal to the maximum
output vertex count specified in the shader.
The `primitiveCount` argument **must** be less than or equal to the maximum
output primitive count specified in the shader.

Depending on the output primitive mode an appropriately-decorated variable
is the output array of local index values into the vertex output arrays from
which primitives are assembled according to the output primitive type:

* 
`OutputPoints` uses the `PrimitivePointIndicesEXT` decoration.

* 
`OutputLinesEXT` uses the `PrimitiveLineIndicesEXT` decoration.

* 
`OutputTrianglesEXT` uses the `PrimitiveTriangleIndicesEXT`
decoration.

These resulting primitives are then further processed as described in
[Rasterization](../primsrast.html#primsrast).

With the exception of primitive indices, all output built-ins and custom
attributes count towards the total storage size occupied by output variables
in mesh shaders.
This size can be calculated as follows, taking into account the fact that
the number of effective scalar attributes is 4 times the number of effective
locations used according to the [location assignment rules](../interfaces.html#interfaces-iointerfaces-locations).
Let    be the number of views,    be the number of
effective scalar per-vertex attributes not dependent on `ViewIndex`,
   be the number of effective scalar per-vertex attributes
dependent on `ViewIndex`,    be the maximum number of
vertices specified by the `OutputVertices` `Execution` `Mode`,
   be `meshOutputPerVertexGranularity`,    be
the number of effective scalar per-primitive attributes not dependent on
`ViewIndex`,    be the number of effective scalar
per-primitive attributes dependent on `ViewIndex`,    be the
maximum number of primitives specified by the `OutputPrimitivesEXT`
`Execution` `Mode` and    be
`meshOutputPerPrimitiveGranularity`:

  

  

The mesh shader outputs decorated with the `PositionPerViewNV`,
`ClipDistancePerViewNV`, `CullDistancePerViewNV`, `LayerPerViewNV`,
and `ViewportMaskPerViewNV` built-in decorations are the per-view
versions of the single-view variables with equivalent names (that is
`Position`, `ClipDistance`, `CullDistance`, `Layer`, and
`ViewportMaskNV`, respectively).
If a shader statically assigns a value to any element of a per-view array it
**must** not statically assign a value to the equivalent single-view variable.

Each of these outputs is considered arrayed, with separate values for each
view.
The view number is used to index the first dimension of these arrays.

The second dimension of the `ClipDistancePerViewNV`, and
`CullDistancePerViewNV` arrays have the same requirements as the
`ClipDistance`, and `CullDistance` arrays.

If a mesh shader output is *per-view*, the corresponding fragment shader
input is taken from the element of the per-view output array that
corresponds to the view that is currently being processed by the fragment
shader.

These *per-view* outputs are available only in shaders using the `MeshNV`
`Execution` `Model`.
They are not available in shaders using the `MeshEXT` `Execution` `Model`.

Following guarantees are provided for the relative ordering of primitives
produced by a mesh shader, as they pertain to [primitive order](../drawing.html#drawing-primitive-order).

* 
When a task shader is used, mesh workgroups spawned from lower tasks
will be ordered prior those workgroups from subsequent tasks.

* 
All output primitives generated from a given mesh workgroup are passed
to subsequent pipeline stages before any output primitives generated
from subsequent input workgroups.

* 
All output primitives within a mesh workgroup, will be generated in the
ordering provided by the builtin primitive indexbuffer (from low address
to high address).
