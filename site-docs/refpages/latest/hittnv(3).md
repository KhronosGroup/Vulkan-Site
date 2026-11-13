# HitTNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitTNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitTNV - T value of a ray intersection

`HitTNV`

A variable decorated with the `HitTNV` decoration is equivalent to a
variable decorated with the `RayTmaxKHR` decoration.

Valid Usage

* 
[](#VUID-HitTNV-HitTNV-04245) VUID-HitTNV-HitTNV-04245

The `HitTNV` decoration **must** be used only within the `AnyHitNV`
or `ClosestHitNV` `Execution` `Model`

* 
[](#VUID-HitTNV-HitTNV-04246) VUID-HitTNV-HitTNV-04246

The variable decorated with `HitTNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-HitTNV-HitTNV-04247) VUID-HitTNV-HitTNV-04247

The variable decorated with `HitTNV` **must** be declared as a scalar
32-bit floating-point value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
