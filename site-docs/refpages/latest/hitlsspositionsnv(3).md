# HitLSSPositionsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitLSSPositionsNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitLSSPositionsNV - Contains the position of the hit LSS primitive

`HitLSSPositionsNV`

A variable decorated with the `HitLSSPositionsNV` decoration will contain
the position of the LSS primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitLSSPositionsNV-HitLSSPositionsNV-10525) VUID-HitLSSPositionsNV-HitLSSPositionsNV-10525

The `HitLSSPositionsNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitLSSPositionsNV-HitLSSPositionsNV-10526) VUID-HitLSSPositionsNV-HitLSSPositionsNV-10526

The variable decorated with `HitLSSPositionsNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HitLSSPositionsNV-HitLSSPositionsNV-10527) VUID-HitLSSPositionsNV-HitLSSPositionsNV-10527

The variable decorated with `HitLSSPositionsNV` **must** be declared as
an array of size two, containing three-component vector of 32-bit
floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
