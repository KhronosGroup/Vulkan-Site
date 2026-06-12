# CullDistancePerViewNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CullDistancePerViewNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CullDistancePerViewNV - Application-specified cull distances per view

`CullDistancePerViewNV`

Decorating a variable with the `CullDistancePerViewNV` built-in
decoration will make that variable contain the per-view cull distances.
The per-view cull distances have the same semantics as `CullDistance`.

Valid Usage

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04201) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04201

The `CullDistancePerViewNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04202) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04202

The variable decorated with `CullDistancePerViewNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04203) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04203

The variable decorated with `CullDistancePerViewNV` **must** also be
decorated with the `PerViewNV` decoration

* 
[](#VUID-CullDistancePerViewNV-CullDistancePerViewNV-04204) VUID-CullDistancePerViewNV-CullDistancePerViewNV-04204

The variable decorated with `CullDistancePerViewNV` **must** be declared
as a two-dimensional array of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
