# RayTmaxKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/RayTmaxKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

RayTmaxKHR - Maximum T value of a ray

`RayTmaxKHR`

A variable decorated with the `RayTmaxKHR` decoration will contain the
parametric tmax value of the ray being processed.
The value is independent of the space in which the ray origin and direction
exist.
The value is initialized to the parameter passed into the
[pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

The tmax value changes throughout the lifetime of the ray that
produced the intersection.
In the closest hit shader, the value reflects the closest distance to the
intersected primitive.
In the any-hit shader, it reflects the distance to the primitive currently
being intersected.
In the intersection shader, it reflects the distance to the closest
primitive intersected so far or the initial value.
The value can change in the intersection shader after calling
`OpReportIntersectionKHR` if the corresponding any-hit shader does not
ignore the intersection.
In a miss shader, the value is identical to the parameter passed into the
[pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

Valid Usage

* 
[](#VUID-RayTmaxKHR-RayTmaxKHR-04348) VUID-RayTmaxKHR-RayTmaxKHR-04348

The `RayTmaxKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-RayTmaxKHR-RayTmaxKHR-04349) VUID-RayTmaxKHR-RayTmaxKHR-04349

The variable decorated with `RayTmaxKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-RayTmaxKHR-RayTmaxKHR-04350) VUID-RayTmaxKHR-RayTmaxKHR-04350

The variable decorated with `RayTmaxKHR` **must** be declared as a
scalar 32-bit floating-point value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
