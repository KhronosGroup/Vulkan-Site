# MeshViewIndicesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/MeshViewIndicesNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

MeshViewIndicesNV - Indices of views processed by a mesh or task shader

`MeshViewIndicesNV`

Decorating a variable with the `MeshViewIndicesNV` built-in decoration
will make that variable contain the mesh view indices.
The mesh view indices is an array of values where each element holds the
view number of one of the views being processed by the current mesh or task
shader invocations.
The values of array elements with indices greater than or equal to
`MeshViewCountNV` are poison.
If the value of `MeshViewIndicesNV`[i] is j, then any outputs
decorated with `PerViewNV` will take on the value of array element
i when processing primitives for view index j.

Valid Usage

* 
[](#VUID-MeshViewIndicesNV-MeshViewIndicesNV-04290) VUID-MeshViewIndicesNV-MeshViewIndicesNV-04290

The `MeshViewIndicesNV` decoration **must** be used only within the
`MeshNV` or `TaskNV` `Execution` `Model`

* 
[](#VUID-MeshViewIndicesNV-MeshViewIndicesNV-04291) VUID-MeshViewIndicesNV-MeshViewIndicesNV-04291

The variable decorated with `MeshViewIndicesNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-MeshViewIndicesNV-MeshViewIndicesNV-04292) VUID-MeshViewIndicesNV-MeshViewIndicesNV-04292

The variable decorated with `MeshViewIndicesNV` **must** be declared as
an array of scalar 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
