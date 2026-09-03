# ObjectRayDirectionKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ObjectRayDirectionKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ObjectRayDirectionKHR - Ray direction in object space

`ObjectRayDirectionKHR`

A variable decorated with the `ObjectRayDirectionKHR` decoration will
specify the direction of the ray being processed, in object space.

Valid Usage

* 
[](#VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04299) VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04299

The `ObjectRayDirectionKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04300) VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04300

The variable decorated with `ObjectRayDirectionKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04301) VUID-ObjectRayDirectionKHR-ObjectRayDirectionKHR-04301

The variable decorated with `ObjectRayDirectionKHR` **must** be declared
as a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
