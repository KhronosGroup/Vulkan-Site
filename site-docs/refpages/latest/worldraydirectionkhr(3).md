# WorldRayDirectionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WorldRayDirectionKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WorldRayDirectionKHR - Ray direction in world space

`WorldRayDirectionKHR`

A variable decorated with the `WorldRayDirectionKHR` decoration will
specify the direction of the ray being processed, in world space.
The value is the parameter passed into the [pipeline trace ray](../../../../spec/latest/appendices/glossary.html#glossary-pipeline-trace-ray) instruction.

Valid Usage

* 
[](#VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04428) VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04428

The `WorldRayDirectionKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04429) VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04429

The variable decorated with `WorldRayDirectionKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04430) VUID-WorldRayDirectionKHR-WorldRayDirectionKHR-04430

The variable decorated with `WorldRayDirectionKHR` **must** be declared
as a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
