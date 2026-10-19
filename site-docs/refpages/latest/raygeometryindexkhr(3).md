# RayGeometryIndexKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/RayGeometryIndexKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

RayGeometryIndexKHR - Geometry index in a ray shader

`RayGeometryIndexKHR`

A variable decorated with the `RayGeometryIndexKHR` decoration will
contain the [geometry index](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-geometry-index) for
the acceleration structure geometry currently being shaded.

Valid Usage

* 
[](#VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04345) VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04345

The `RayGeometryIndexKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04346) VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04346

The variable decorated with `RayGeometryIndexKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04347) VUID-RayGeometryIndexKHR-RayGeometryIndexKHR-04347

The variable decorated with `RayGeometryIndexKHR` **must** be declared
as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
