# Geometry Shading

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/geometry.html

## Table of Contents

- [Geometry Shader Input Primitives](#geometry-input)
- [Geometry_Shader_Input_Primitives](#geometry-input)
- [Geometry Shader Output Primitives](#geometry-output)
- [Geometry_Shader_Output_Primitives](#geometry-output)
- [Multiple Invocations of Geometry Shaders](#geometry-invocations)
- [Multiple_Invocations_of_Geometry_Shaders](#geometry-invocations)
- [Geometry Shader Primitive Ordering](#geometry-ordering)
- [Geometry_Shader_Primitive_Ordering](#geometry-ordering)
- [Geometry Shader Passthrough](#geometry-passthrough)
- [Geometry_Shader_Passthrough](#geometry-passthrough)
- [PassthroughNV Decoration](#geometry-passthrough-passthrough)
- [Passthrough Interface Matching](#geometry-passthrough-interface)
- [Passthrough_Interface_Matching](#geometry-passthrough-interface)

## Content

The geometry shader operates on a group of vertices and their associated
data assembled from a single input primitive, and emits zero or more output
primitives and the group of vertices and their associated data required for
each output primitive.
Geometry shading is enabled when a geometry shader is included in the
pipeline.

Each geometry shader invocation has access to all vertices in the primitive
(and their associated data), which are presented to the shader as an array
of inputs.

The input primitive type expected by the geometry shader is specified with
an `OpExecutionMode` instruction in the geometry shader, and **must** match
the incoming primitive type specified by either the pipeline’s
[primitive topology](drawing.html#drawing-primitive-topologies) if tessellation is
inactive, or the [tessellation mode](tessellation.html#tessellation) if tessellation is
active, as follows:

* 
An input primitive type of `InputPoints` **must** only be used with a
pipeline topology of [VK_PRIMITIVE_TOPOLOGY_POINT_LIST](drawing.html#VkPrimitiveTopology), or with a
tessellation shader specifying `PointMode`.
The input arrays always contain one element, as described by the
[point list topology](drawing.html#drawing-point-lists) or
[tessellation in point mode](tessellation.html#tessellation-point-mode).

* 
An input primitive type of `InputLines` **must** only be used with a
pipeline topology of [VK_PRIMITIVE_TOPOLOGY_LINE_LIST](drawing.html#VkPrimitiveTopology) or
[VK_PRIMITIVE_TOPOLOGY_LINE_STRIP](drawing.html#VkPrimitiveTopology), or with a tessellation shader
specifying `IsoLines` that does not specify `PointMode`.
The input arrays always contain two elements, as described by the
[line list topology](drawing.html#drawing-line-lists) or [    line strip topology](drawing.html#drawing-line-strips), or by [    isoline tessellation](tessellation.html#tessellation-isoline-tessellation).

* 
An input primitive type of `InputLinesAdjacency` **must** only be used
when tessellation is inactive, with a pipeline topology of
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) or
[VK_PRIMITIVE_TOPOLOGY_LINE_STRIP_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology).
The input arrays always contain four elements, as described by the
[line list with adjacency topology](drawing.html#drawing-line-lists-with-adjacency)
or [line strip with adjacency    topology](drawing.html#drawing-line-strips-with-adjacency).

* 
An input primitive type of `Triangles` **must** only be used with a
pipeline topology of [VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST](drawing.html#VkPrimitiveTopology),
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP](drawing.html#VkPrimitiveTopology), or
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_FAN](drawing.html#VkPrimitiveTopology); or with a tessellation shader
specifying `Quads` or `Triangles` that does not specify
`PointMode`.
The input arrays always contain three elements, as described by the
[triangle list topology](drawing.html#drawing-triangle-lists),
[triangle strip topology](drawing.html#drawing-triangle-strips), or
[triangle fan topology](drawing.html#drawing-triangle-fans), or by
[triangle](tessellation.html#tessellation-triangle-tessellation) or
[quad tessellation](tessellation.html#tessellation-quad-tessellation).
Vertices **may** be in a different absolute order than specified by the
topology, but **must** adhere to the specified winding order.

* 
An input primitive type of `InputTrianglesAdjacency` **must** only be
used when tessellation is inactive, with a pipeline topology of
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) or
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_STRIP_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology).
The input arrays always contain six elements, as described by the
[triangle list with adjacency    topology](drawing.html#drawing-triangle-lists-with-adjacency) or [triangle strip    with adjacency topology](drawing.html#drawing-triangle-strips-with-adjacency).
Vertices **may** be in a different absolute order than specified by the
topology, but **must** adhere to the specified winding order, and the
vertices making up the main primitive **must** still occur at the first,
third, and fifth index.

A geometry shader generates primitives in one of three output modes: points,
line strips, or triangle strips.
The primitive mode is specified in the shader using an `OpExecutionMode`
instruction with the `OutputPoints`, `OutputLineStrip` or
`OutputTriangleStrip` modes, respectively.
Each geometry shader **must** include exactly one output primitive mode.

The vertices output by the geometry shader are assembled into points, lines,
or triangles based on the output primitive type and the resulting primitives
are then further processed as described in [Rasterization](primsrast.html#primsrast).
If the number of vertices emitted by the geometry shader is not sufficient
to produce a single primitive, vertices corresponding to incomplete
primitives are not processed by subsequent pipeline stages.
The number of vertices output by the geometry shader is limited to a maximum
count specified in the shader.

The maximum output vertex count is specified in the shader using an
`OpExecutionMode` instruction with the mode set to `OutputVertices`
and the maximum number of vertices that will be produced by the geometry
shader specified as a literal.
Each geometry shader **must** specify a maximum output vertex count.

Geometry shaders **can** be invoked more than one time for each input
primitive.
This is known as *geometry shader instancing* and is requested by including
an `OpExecutionMode` instruction with `mode` specified as
`Invocations` and the number of invocations specified as an integer
literal.

In this mode, the geometry shader will execute at least n times for
each input primitive, where n is the number of invocations specified
in the `OpExecutionMode` instruction.
The instance number is available to each invocation as a built-in input
using `InvocationId`.

Limited guarantees are provided for the relative ordering of primitives
produced by a geometry shader, as they pertain to [primitive order](drawing.html#drawing-primitive-order).

* 
For instanced geometry shaders, the output primitives generated from
each input primitive are passed to subsequent pipeline stages using the
invocation number to order the primitives, from least to greatest.

* 
All output primitives generated from a given input primitive are passed
to subsequent pipeline stages before any output primitives generated
from subsequent input primitives.

A geometry shader that uses the `PassthroughNV` decoration on a variable
in its input interface is considered a *passthrough geometry shader*.
Output primitives in a passthrough geometry shader **must** have the same
topology as the input primitive and are not produced by emitting vertices.
The vertices of the output primitive have two different types of attributes,
per-vertex and per-primitive.
Geometry shader input variables with `PassthroughNV` decoration are
considered to produce per-vertex outputs, where values for each output
vertex are copied from the corresponding input vertex.
Any built-in or user-defined geometry shader outputs are considered
per-primitive in a passthrough geometry shader, where a single output value
is copied to all output vertices.

The remainder of this section details the usage of the `PassthroughNV`
decoration and modifications to the interface matching rules when using
passthrough geometry shaders.

Decorating a geometry shader input variable with the `PassthroughNV`
decoration indicates that values of this input are copied through to the
corresponding vertex of the output primitive.
Input variables and block members which do not have the `PassthroughNV`
decoration are consumed by the geometry shader without being passed through
to subsequent stages.

The `PassthroughNV` decoration **must** only be used within a geometry
shader.

Any variable decorated with `PassthroughNV` **must** be declared using the
`Input` storage class.

The `PassthroughNV` decoration **must** not be used with any of:

* 
an input primitive type other than `InputPoints`, `InputLines`, or
`Triangles`, as specified by the mode for `OpExecutionMode`.

* 
an invocation count other than one, as specified by the `Invocations`
mode for `OpExecutionMode`.

* 
an `OpEntryPoint` which statically uses the `OpEmitVertex` or
`OpEndPrimitive` instructions.

* 
a variable decorated with the `InvocationId` built-in decoration.

* 
a variable decorated with the `PrimitiveId` built-in decoration that
is declared using the `Input` storage class.

When a passthrough geometry shader is in use, the
[Interface Matching](interfaces.html#interfaces-iointerfaces-matching) rules involving the
geometry shader input and output interfaces operate as described in this
section.

For the purposes of matching passthrough geometry shader inputs with outputs
of the previous pipeline stages, the `PassthroughNV` decoration is
ignored.

For the purposes of matching the outputs of the geometry shader with
subsequent pipeline stages, each input variable with the `PassthroughNV`
decoration is considered to add an equivalent output variable with the same
type, decoration (other than `PassthroughNV`), number, and declaration
order on the output interface.
The output variable declaration corresponding to an input variable decorated
with `PassthroughNV` will be identical to the input declaration, except
that the outermost array dimension of such variables is removed.
The output block declaration corresponding to an input block decorated with
`PassthroughNV` or having members decorated with `PassthroughNV` will
be identical to the input declaration, except that the outermost array
dimension of such declaration is removed.

If an input block is decorated with `PassthroughNV`, the equivalent
output block contains all the members of the input block.
Otherwise, the equivalent output block contains only those input block
members decorated with `PassthroughNV`.
All members of the corresponding output block are assigned `Location` and
`Component` decorations identical to those assigned to the corresponding
input block members.

Output variables and blocks generated from inputs decorated with
`PassthroughNV` will only exist for the purposes of interface matching;
these declarations are not available to geometry shader code or listed in
the module interface.

For the purposes of component counting, passthrough geometry shaders count
all statically used input variable components declared with the
`PassthroughNV` decoration as output components as well, since their
values will be copied to the output primitive produced by the geometry
shader.
