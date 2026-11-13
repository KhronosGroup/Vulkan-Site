# Position(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/Position.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

Position - Vertex position

`Position`

Decorating a variable with the `Position` built-in decoration will make
that variable contain the position of the current vertex.
In the last [pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), the value of the variable decorated with `Position` is
used in subsequent primitive assembly, clipping, and rasterization
operations.

|  | When `Position` decorates a variable in the `Input` `Storage` `Class`, it
| --- | --- |
contains the data written to the output variable decorated with
`Position` from the previous shader stage. |

Valid Usage

* 
[](#VUID-Position-Position-04318) VUID-Position-Position-04318

The `Position` decoration **must** be used only within the `MeshEXT`,
`MeshNV`, `Vertex`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-Position-Position-04319) VUID-Position-Position-04319

The variable decorated with `Position` within the `MeshEXT`,
`MeshNV`, or `Vertex` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-Position-Position-04320) VUID-Position-Position-04320

The variable decorated with `Position` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared using a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-Position-Position-04321) VUID-Position-Position-04321

The variable decorated with `Position` **must** be declared as a
four-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
