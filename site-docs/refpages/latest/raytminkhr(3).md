# RayTminKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/RayTminKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

RayTminKHR - Minimum T value of a ray

`RayTminKHR`

A variable decorated with the `RayTminKHR` decoration will contain the
parametric tmin value of the ray being processed.
The value is independent of the space in which the ray origin and direction
exist.
The value is the parameter passed into the [pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

The tmin value remains constant for the duration of the ray query.

Valid Usage

* 
[](#VUID-RayTminKHR-RayTminKHR-04351) VUID-RayTminKHR-RayTminKHR-04351

The `RayTminKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-RayTminKHR-RayTminKHR-04352) VUID-RayTminKHR-RayTminKHR-04352

The variable decorated with `RayTminKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-RayTminKHR-RayTminKHR-04353) VUID-RayTminKHR-RayTminKHR-04353

The variable decorated with `RayTminKHR` **must** be declared as a
scalar 32-bit floating-point value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
