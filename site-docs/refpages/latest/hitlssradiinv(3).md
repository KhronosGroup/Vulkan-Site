# HitLSSRadiiNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitLSSRadiiNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitLSSRadiiNV - Contains the radii of the hit LSS primitive

`HitLSSRadiiNV`

A variable decorated with the `HitLSSRadiiNV` decoration will contain the
radii of LSS primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitLSSRadiiNV-HitLSSRadiiNV-10528) VUID-HitLSSRadiiNV-HitLSSRadiiNV-10528

The `HitLSSRadiiNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitLSSRadiiNV-HitLSSRadiiNV-10529) VUID-HitLSSRadiiNV-HitLSSRadiiNV-10529

The variable decorated with `HitLSSRadiiNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-HitLSSRadiiNV-HitLSSRadiiNV-10530) VUID-HitLSSRadiiNV-HitLSSRadiiNV-10530

The variable decorated with `HitLSSRadiiNV` **must** be declared as an
array of size two, containing 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
