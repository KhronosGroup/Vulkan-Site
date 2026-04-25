# PrimitiveLineIndicesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PrimitiveLineIndicesEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PrimitiveLineIndicesEXT - Indices of line primitives in a mesh shader

`PrimitiveLineIndicesEXT`

Decorating a variable with the `PrimitiveLineIndicesEXT` decoration will
make that variable contain the output array of vertex index values for line
primitives.

Valid Usage

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07047) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07047

The `PrimitiveLineIndicesEXT` decoration **must** be used only within
the `MeshEXT` `Execution` `Model`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07048) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07048

The `PrimitiveLineIndicesEXT` decoration **must** be used with the
`OutputLinesEXT` `Execution` `Mode`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07049) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07049

The variable decorated with `PrimitiveLineIndicesEXT` **must** be
declared using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07050) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07050

The variable decorated with `PrimitiveLineIndicesEXT` **must** be
declared as an array of two component vector 32-bit integer values

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07051) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07051

The index to access the array decorated with
`PrimitiveLineIndicesEXT` **must** be in the range [0, N-1], where
N is the value specified by the “Primitive Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-12336) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-12336

All index values written to the array decorated with
`PrimitiveLineIndicesEXT` **must** be in the range [0, N-1], where
N is the value specified by the “Vertex Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07052) VUID-PrimitiveLineIndicesEXT-PrimitiveLineIndicesEXT-07052

The size of the array decorated with `PrimitiveLineIndicesEXT` **must**
match the value specified by `OutputPrimitivesEXT`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
