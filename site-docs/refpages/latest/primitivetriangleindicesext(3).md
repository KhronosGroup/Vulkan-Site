# PrimitiveTriangleIndicesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PrimitiveTriangleIndicesEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PrimitiveTriangleIndicesEXT - Indices of triangle primitives in a mesh shader

`PrimitiveTriangleIndicesEXT`

Decorating a variable with the `PrimitiveTriangleIndicesEXT` decoration
will make that variable contain the output array of vertex index values for
triangle primitives.

Valid Usage

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07053) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07053

The `PrimitiveTriangleIndicesEXT` decoration **must** be used only
within the `MeshEXT` `Execution` `Model`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07054) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07054

The `PrimitiveTriangleIndicesEXT` decoration **must** be used with the
`OutputTrianglesEXT` `Execution` `Mode`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07055) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07055

The variable decorated with `PrimitiveTriangleIndicesEXT` **must** be
declared using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07056) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07056

The variable decorated with `PrimitiveTriangleIndicesEXT` **must** be
declared as an array of three component vector 32-bit integer values

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07057) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07057

The index to access the array decorated with
`PrimitiveTriangleIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Primitive Count” operand
of `OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-12337) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-12337

All index values written to the array decorated with
`PrimitiveTriangleIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Vertex Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07058) VUID-PrimitiveTriangleIndicesEXT-PrimitiveTriangleIndicesEXT-07058

The size of the array decorated with `PrimitiveTriangleIndicesEXT`
**must** match the value specified by `OutputPrimitivesEXT`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
