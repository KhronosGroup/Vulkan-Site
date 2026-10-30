# ClipDistance(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ClipDistance.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ClipDistance - Application-specified clip distances

`ClipDistance`

Decorating a variable with the `ClipDistance` built-in decoration will
make that variable contain the mechanism for controlling user clipping.
`ClipDistance` is an array such that the ith element of the array
specifies the clip distance for plane i.
A clip distance of 0 means the vertex is on the plane, a positive distance
means the vertex is inside the clip half-space, and a negative distance
means the vertex is outside the clip half-space.

|  | The array variable decorated with `ClipDistance` is explicitly sized by
| --- | --- |
the shader. |

|  | In the last [pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization), these values will be linearly interpolated across the
| --- | --- |
primitive and the portion of the primitive with interpolated distances less
than 0 will be considered outside the clip volume.
If `ClipDistance` is then used by a fragment shader, `ClipDistance`
contains these linearly interpolated values. |

Valid Usage

* 
[](#VUID-ClipDistance-ClipDistance-04187) VUID-ClipDistance-ClipDistance-04187

The `ClipDistance` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `Vertex`, `Fragment`,
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model`

* 
[](#VUID-ClipDistance-ClipDistance-04188) VUID-ClipDistance-ClipDistance-04188

The variable decorated with `ClipDistance` within the `MeshEXT`,
`MeshNV`, or `Vertex` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-ClipDistance-ClipDistance-04189) VUID-ClipDistance-ClipDistance-04189

The variable decorated with `ClipDistance` within the `Fragment`
`Execution` `Model` **must** be declared using the `Input` `Storage` `Class`

* 
[](#VUID-ClipDistance-ClipDistance-04190) VUID-ClipDistance-ClipDistance-04190

The variable decorated with `ClipDistance` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared in a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-ClipDistance-ClipDistance-04191) VUID-ClipDistance-ClipDistance-04191

The variable decorated with `ClipDistance` **must** be declared as an
array of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
