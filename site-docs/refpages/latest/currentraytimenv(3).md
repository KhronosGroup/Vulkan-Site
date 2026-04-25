# CurrentRayTimeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CurrentRayTimeNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CurrentRayTimeNV - Time value of a ray intersection

`CurrentRayTimeNV`

A variable decorated with the `CurrentRayTimeNV` decoration contains the
time value passed in to `OpTraceRayMotionNV` which called this shader.

Valid Usage

* 
[](#VUID-CurrentRayTimeNV-CurrentRayTimeNV-04942) VUID-CurrentRayTimeNV-CurrentRayTimeNV-04942

The `CurrentRayTimeNV` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-CurrentRayTimeNV-CurrentRayTimeNV-04943) VUID-CurrentRayTimeNV-CurrentRayTimeNV-04943

The variable decorated with `CurrentRayTimeNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-CurrentRayTimeNV-CurrentRayTimeNV-04944) VUID-CurrentRayTimeNV-CurrentRayTimeNV-04944

The variable decorated with `CurrentRayTimeNV` **must** be declared as a
scalar 32-bit floating-point value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
