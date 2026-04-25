# PointSize(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PointSize.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PointSize - Size of a point primitive

`PointSize`

Decorating a variable with the `PointSize` built-in decoration will make
that variable contain the size of point primitives
or the final rasterization of polygons if [polygon mode](../../../../spec/latest/chapters/primsrast.html#primsrast-polygonmode) is [VK_POLYGON_MODE_POINT](VkPolygonMode.html) when
`VkPhysicalDeviceMaintenance5Properties`::`polygonModePointSize` is
set to [VK_TRUE](VK_TRUE.html)
.
The value written to the variable decorated with `PointSize` by the last
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) in the pipeline is used as the framebuffer-space size of points
produced by rasterization.
If the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is enabled and
a value is not written to a variable decorated with `PointSize`, a value
of 1.0 is used as the size of points.

|  | When `PointSize` decorates a variable in the `Input` `Storage` `Class`,
| --- | --- |
it contains the data written to the output variable decorated with
`PointSize` from the previous shader stage. |

Valid Usage

* 
[](#VUID-PointSize-PointSize-04314) VUID-PointSize-PointSize-04314

The `PointSize` decoration **must** be used only within the
`MeshEXT`, `MeshNV`, `Vertex`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-PointSize-PointSize-04315) VUID-PointSize-PointSize-04315

The variable decorated with `PointSize` within the `MeshEXT`,
`MeshNV`, or `Vertex` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-PointSize-PointSize-04316) VUID-PointSize-PointSize-04316

The variable decorated with `PointSize` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared using a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-PointSize-PointSize-04317) VUID-PointSize-PointSize-04317

The variable decorated with `PointSize` **must** be declared as a scalar
32-bit floating-point value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
