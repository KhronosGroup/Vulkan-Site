# ClipDistancePerViewNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ClipDistancePerViewNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ClipDistancePerViewNV - Application-specified clip distances per view

`ClipDistancePerViewNV`

Decorating a variable with the `ClipDistancePerViewNV` built-in
decoration will make that variable contain the per-view clip distances.
The per-view clip distances have the same semantics as `ClipDistance`.

Valid Usage

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04192) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04192

The `ClipDistancePerViewNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04193) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04193

The variable decorated with `ClipDistancePerViewNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04194) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04194

The variable decorated with `ClipDistancePerViewNV` **must** also be
decorated with the `PerViewNV` decoration

* 
[](#VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04195) VUID-ClipDistancePerViewNV-ClipDistancePerViewNV-04195

The variable decorated with `ClipDistancePerViewNV` **must** be declared
as a two-dimensional array of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
