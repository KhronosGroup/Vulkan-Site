# PrimitiveCountNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PrimitiveCountNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PrimitiveCountNV - Number of primitives output by a mesh shader

`PrimitiveCountNV`

Decorating a variable with the `PrimitiveCountNV` decoration will make
that variable contain the primitive count.
The primitive count specifies the number of primitives in the output mesh
produced by the mesh shader that will be processed by subsequent pipeline
stages.

Valid Usage

* 
[](#VUID-PrimitiveCountNV-PrimitiveCountNV-04327) VUID-PrimitiveCountNV-PrimitiveCountNV-04327

The `PrimitiveCountNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-PrimitiveCountNV-PrimitiveCountNV-04328) VUID-PrimitiveCountNV-PrimitiveCountNV-04328

The variable decorated with `PrimitiveCountNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-PrimitiveCountNV-PrimitiveCountNV-04329) VUID-PrimitiveCountNV-PrimitiveCountNV-04329

The variable decorated with `PrimitiveCountNV` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
