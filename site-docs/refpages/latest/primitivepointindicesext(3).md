# PrimitivePointIndicesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PrimitivePointIndicesEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PrimitivePointIndicesEXT - Indices of point primitives in a mesh shader

`PrimitivePointIndicesEXT`

Decorating a variable with the `PrimitivePointIndicesEXT` decoration will
make that variable contain the output array of vertex index values for point
primitives.

Valid Usage

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07041) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07041

The `PrimitivePointIndicesEXT` decoration **must** be used only within
the `MeshEXT` `Execution` `Model`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07042) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07042

The `PrimitivePointIndicesEXT` decoration **must** be used with the
`OutputPoints` `Execution` `Mode`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07043) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07043

The variable decorated with `PrimitivePointIndicesEXT` **must** be
declared using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07044) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07044

The variable decorated with `PrimitivePointIndicesEXT` **must** be
declared as an array of scalar 32-bit integer values

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07045) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07045

The index to access the array decorated with
`PrimitivePointIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Primitive Count” operand
of `OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-12335) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-12335

All index values written to the array decorated with
`PrimitivePointIndicesEXT` **must** be in the range [0, N-1],
where N is the value specified by the “Vertex Count” operand of
`OpSetMeshOutputsEXT`

* 
[](#VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07046) VUID-PrimitivePointIndicesEXT-PrimitivePointIndicesEXT-07046

The size of the array decorated with `PrimitivePointIndicesEXT` **must**
match the value specified by `OutputPrimitivesEXT`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
