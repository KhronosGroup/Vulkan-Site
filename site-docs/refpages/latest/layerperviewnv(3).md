# LayerPerViewNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/LayerPerViewNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

LayerPerViewNV - Layer index per view for layered rendering

`LayerPerViewNV`

Decorating a variable with the `LayerPerViewNV` built-in decoration will
make that variable contain the per-view layer information.
The per-view layer has the same semantics as `Layer`, for each view.

Valid Usage

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04277) VUID-LayerPerViewNV-LayerPerViewNV-04277

The `LayerPerViewNV` decoration **must** be used only within the
`MeshNV` `Execution` `Model`

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04278) VUID-LayerPerViewNV-LayerPerViewNV-04278

The variable decorated with `LayerPerViewNV` **must** be declared using
the `Output` `Storage` `Class`

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04279) VUID-LayerPerViewNV-LayerPerViewNV-04279

The variable decorated with `LayerPerViewNV` **must** also be decorated
with the `PerViewNV` decoration

* 
[](#VUID-LayerPerViewNV-LayerPerViewNV-04280) VUID-LayerPerViewNV-LayerPerViewNV-04280

The variable decorated with `LayerPerViewNV` **must** be declared as an
array of scalar 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
