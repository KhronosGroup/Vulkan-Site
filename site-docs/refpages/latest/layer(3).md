# Layer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/Layer.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

Layer - Layer index for layered rendering

`Layer`

Decorating a variable with the `Layer` built-in decoration will make that
variable contain the select layer of a multi-layer framebuffer attachment.

In a
mesh,
vertex, tessellation evaluation, or
geometry shader, any variable decorated with `Layer` can be written with
the framebuffer layer index to which the primitive produced by that shader
will be directed.

The last active
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) (in pipeline order) controls the `Layer` that is used.
Outputs in previous shader stages are not used, even if the last stage fails
to write the `Layer`.

If the last active
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface does not include a variable decorated
with `Layer`, then the first layer is used.
If a [pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface includes a variable decorated with
`Layer`, it **must** write the same value to `Layer` for all output
vertices of a given primitive.
If the `Layer` value is less than 0 or greater than or equal to the
number of layers in the framebuffer, then primitives **may** still be
rasterized, fragment shaders **may** be executed, and the framebuffer values
for all layers are **undefined**.
In a mesh shader this also applies when the `Layer` value is greater than
or equal to the `maxMeshOutputLayers` limit.

If a variable with the `Layer` decoration is also decorated with
`ViewportRelativeNV`, then the `ViewportIndex` is added to the layer
that is used for rendering and that is made available in the fragment
shader.

If the shader writes to a variable decorated `ViewportMaskNV`, then the
layer selected has a different value for each viewport a primitive is
rendered to.

In a fragment shader, a variable decorated with `Layer` contains the
layer index of the primitive that the fragment invocation belongs to.

Valid Usage

* 
[](#VUID-Layer-Layer-04272) VUID-Layer-Layer-04272

The `Layer` decoration **must** be used only within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationEvaluation`, `Geometry`, or
`Fragment` `Execution` `Model`

* 
[](#VUID-Layer-Layer-04273) VUID-Layer-Layer-04273

If the [`shaderOutputLayer`](../../../../spec/latest/chapters/features.html#features-shaderOutputLayer) feature
is not enabled then the `Layer` decoration **must** be used only within
the `Geometry` or `Fragment` `Execution` `Model`

* 
[](#VUID-Layer-Layer-04274) VUID-Layer-Layer-04274

The variable decorated with `Layer` within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** be declared using the `Output` `Storage` `Class`

* 
[](#VUID-Layer-Layer-04275) VUID-Layer-Layer-04275

The variable decorated with `Layer` within the `Fragment`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-Layer-Layer-04276) VUID-Layer-Layer-04276

The variable decorated with `Layer` **must** be declared as a scalar
32-bit integer value for all supported execution models except
`MeshEXT`

* 
[](#VUID-Layer-Layer-07039) VUID-Layer-Layer-07039

The variable decorated with `Layer` within the `MeshEXT`
`Execution` `Model` **must** also be decorated with the `PerPrimitiveEXT`
decoration

* 
[](#VUID-Layer-Layer-10592) VUID-Layer-Layer-10592

`Layer` within the `MeshEXT` `Execution` `Model` **must** decorate a
scalar 32-bit integer member of a structure decorated as `Block`, or
decorate a variable of type `OpTypeArray` of scalar 32-bit integer
values

* 
[](#VUID-Layer-Layer-10593) VUID-Layer-Layer-10593

If `Layer` is declared as an array of 32-bit integer values, within
the `MeshEXT` `Execution` `Model`, size of the array **must** match the
value specified by `OutputPrimitivesEXT`

* 
[](#VUID-Layer-Layer-10594) VUID-Layer-Layer-10594

If `Layer` decorates a member of a structure, the variable
declaration of the containing `Block` type **must** have an array size
that matches the value specified by `OutputPrimitivesEXT`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
