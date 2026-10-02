# WorldRayOriginKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WorldRayOriginKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WorldRayOriginKHR - Ray origin in world space

`WorldRayOriginKHR`

A variable decorated with the `WorldRayOriginKHR` decoration will specify
the origin of the ray being processed, in world space.
The value is the parameter passed into the [pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

Valid Usage

* 
[](#VUID-WorldRayOriginKHR-WorldRayOriginKHR-04431) VUID-WorldRayOriginKHR-WorldRayOriginKHR-04431

The `WorldRayOriginKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-WorldRayOriginKHR-WorldRayOriginKHR-04432) VUID-WorldRayOriginKHR-WorldRayOriginKHR-04432

The variable decorated with `WorldRayOriginKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-WorldRayOriginKHR-WorldRayOriginKHR-04433) VUID-WorldRayOriginKHR-WorldRayOriginKHR-04433

The variable decorated with `WorldRayOriginKHR` **must** be declared as
a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
