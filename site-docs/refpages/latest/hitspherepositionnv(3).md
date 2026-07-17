# HitSpherePositionNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitSpherePositionNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitSpherePositionNV - Contains the position of the hit sphere

`HitSpherePositionNV`

A variable decorated with the `HitSpherePositionNV` decoration will
contain the position of sphere primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitSpherePositionNV-HitSpherePositionNV-10519) VUID-HitSpherePositionNV-HitSpherePositionNV-10519

The `HitSpherePositionNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitSpherePositionNV-HitSpherePositionNV-10520) VUID-HitSpherePositionNV-HitSpherePositionNV-10520

The variable decorated with `HitSpherePositionNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HitSpherePositionNV-HitSpherePositionNV-10521) VUID-HitSpherePositionNV-HitSpherePositionNV-10521

The variable decorated with `HitSpherePositionNV` **must** be declared
as a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
