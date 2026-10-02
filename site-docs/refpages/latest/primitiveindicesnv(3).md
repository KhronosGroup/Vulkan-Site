# PrimitiveIndicesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PrimitiveIndicesNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PrimitiveIndicesNV - Indices of primitives in a mesh shader

`PrimitiveIndicesNV`

Decorating a variable with the `PrimitiveIndicesNV` decoration will make
that variable contain the output array of vertex index values.
Depending on the output primitive type declared using the execution mode,
the indices are split into groups of one (`OutputPoints`), two
(`OutputLinesNV`), or three (`OutputTrianglesNV`) indices and each
group generates a primitive.

Valid Usage

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04338) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04338

The `PrimitiveIndicesNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04339) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04339

The variable decorated with `PrimitiveIndicesNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04340) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04340

The variable decorated with `PrimitiveIndicesNV` **must** be declared as
an array of scalar 32-bit integer values

* 
[](#VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04341) VUID-PrimitiveIndicesNV-PrimitiveIndicesNV-04341

All index values of the array decorated with `PrimitiveIndicesNV`
**must** be in the range [0, N-1], where N is the value
specified by the `OutputVertices` `Execution` `Mode`

* 
[](#VUID-PrimitiveIndicesNV-OutputPoints-04342) VUID-PrimitiveIndicesNV-OutputPoints-04342

If the `Execution` `Mode` is `OutputPoints`, then the array decorated
with `PrimitiveIndicesNV` **must** be the size of the value specified by
`OutputPrimitivesNV`

* 
[](#VUID-PrimitiveIndicesNV-OutputLinesNV-04343) VUID-PrimitiveIndicesNV-OutputLinesNV-04343

If the `Execution` `Mode` is `OutputLinesNV`, then the array decorated
with `PrimitiveIndicesNV` **must** be the size of two times the value
specified by `OutputPrimitivesNV`

* 
[](#VUID-PrimitiveIndicesNV-OutputTrianglesNV-04344) VUID-PrimitiveIndicesNV-OutputTrianglesNV-04344

If the `Execution` `Mode` is `OutputTrianglesNV`, then the array
decorated with `PrimitiveIndicesNV` **must** be the size of three times
the value specified by `OutputPrimitivesNV`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
