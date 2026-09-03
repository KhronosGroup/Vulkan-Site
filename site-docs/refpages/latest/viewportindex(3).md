# ViewportIndex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ViewportIndex.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ViewportIndex - Viewport index used

`ViewportIndex`

Decorating a variable with the `ViewportIndex` built-in decoration will
make that variable contain the index of the viewport.

In a
mesh,
vertex, tessellation evaluation, or
geometry shader, the variable decorated with `ViewportIndex` can be
written to with the viewport index to which the primitive produced by that
shader will be directed.

The selected viewport index is used to select the
viewport transform, scissor rectangle, and exclusive
scissor rectangle.

The last active
*[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization)* (in pipeline order) controls the `ViewportIndex` that is used.
Outputs in previous shader stages are not used, even if the last stage fails
to write the `ViewportIndex`.

If the last active
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface does not include a variable decorated
with `ViewportIndex`
, and if the [multiviewPerViewViewports](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is not enabled,
then the first viewport is used.
If a [pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface includes a variable decorated with
`ViewportIndex`, it **must** write the same value to `ViewportIndex` for
all output vertices of a given primitive.

In a fragment shader, the variable decorated with `ViewportIndex`
contains the viewport index of the primitive that the fragment invocation
belongs to.

If the [`multiviewPerViewViewports`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewViewports) feature is enabled, and if the last active
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) shader entry point’s interface does not include a variable decorated
with `ViewportIndex`, then the value of `ViewIndex` is used as an
index to select the viewport transform and scissor rectangle, and the value
of `ViewportIndex` in the fragment shader is poison.

Valid Usage

* 
[](#VUID-ViewportIndex-ViewportIndex-04404) VUID-ViewportIndex-ViewportIndex-04404

The `ViewportIndex` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `Vertex`, `TessellationEvaluation`,
`Geometry`, or `Fragment` `Execution` `Model`

* 
[](#VUID-ViewportIndex-ViewportIndex-04405) VUID-ViewportIndex-ViewportIndex-04405

If the [    `shaderOutputViewportIndex`](../../../../spec/latest/chapters/features.html#features-shaderOutputViewportIndex) feature is not enabled then the
`ViewportIndex` decoration **must** be used only within the
`Geometry` or `Fragment` `Execution` `Model`

* 
[](#VUID-ViewportIndex-ViewportIndex-04406) VUID-ViewportIndex-ViewportIndex-04406

The variable decorated with `ViewportIndex` within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** be declared using the `Output` `Storage` `Class`

* 
[](#VUID-ViewportIndex-ViewportIndex-04407) VUID-ViewportIndex-ViewportIndex-04407

The variable decorated with `ViewportIndex` within the `Fragment`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-ViewportIndex-ViewportIndex-04408) VUID-ViewportIndex-ViewportIndex-04408

The variable decorated with `ViewportIndex` **must** be declared as a
scalar 32-bit integer value for all supported execution models except
`MeshEXT`

* 
[](#VUID-ViewportIndex-ViewportIndex-07060) VUID-ViewportIndex-ViewportIndex-07060

The variable decorated with `ViewportIndex` within the `MeshEXT`
`Execution` `Model` **must** also be decorated with the `PerPrimitiveEXT`
decoration

* 
[](#VUID-ViewportIndex-ViewportIndex-10601) VUID-ViewportIndex-ViewportIndex-10601

`ViewportIndex` within the `MeshEXT` `Execution` `Model` **must**
decorate a scalar 32-bit integer member of a structure decorated as
`Block`, or decorate a variable of type `OpTypeArray` of scalar
32-bit integer values

* 
[](#VUID-ViewportIndex-ViewportIndex-10602) VUID-ViewportIndex-ViewportIndex-10602

If `ViewportIndex` is declared as an array of 32-bit integer values,
within the `MeshEXT` `Execution` `Model`, size of the array **must** match
the value specified by `OutputPrimitivesEXT`

* 
[](#VUID-ViewportIndex-ViewportIndex-10603) VUID-ViewportIndex-ViewportIndex-10603

If `ViewportIndex` decorates a member of a structure, the variable
declaration of the containing `Block` type **must** have an array size
that matches the value specified by `OutputPrimitivesEXT`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
