# HitSphereRadiusNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitSphereRadiusNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitSphereRadiusNV - Contains the radius of the hit sphere

`HitSphereRadiusNV`

A variable decorated with the `HitSphereRadiusNV` decoration will contain
the radius of sphere primitive intersected by current ray.

Valid Usage

* 
[](#VUID-HitSphereRadiusNV-HitSphereRadiusNV-10522) VUID-HitSphereRadiusNV-HitSphereRadiusNV-10522

The `HitSphereRadiusNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitSphereRadiusNV-HitSphereRadiusNV-10523) VUID-HitSphereRadiusNV-HitSphereRadiusNV-10523

The variable decorated with `HitSphereRadiusNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-HitSphereRadiusNV-HitSphereRadiusNV-10524) VUID-HitSphereRadiusNV-HitSphereRadiusNV-10524

The variable decorated with `HitSphereRadiusNV` **must** be declared as
a scalar 32-bit floating-point value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
