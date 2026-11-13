# IncomingRayFlagsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/IncomingRayFlagsKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

IncomingRayFlagsKHR - Flags used to trace a ray

`IncomingRayFlagsKHR`

A variable with the `IncomingRayFlagsKHR` decoration will contain the ray
flags passed in to the trace call that invoked this particular shader.
Setting pipeline flags on the ray tracing pipeline **must** not cause any
corresponding flags to be set in variables with this decoration.

Valid Usage

* 
[](#VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04248) VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04248

The `IncomingRayFlagsKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04249) VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04249

The variable decorated with `IncomingRayFlagsKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04250) VUID-IncomingRayFlagsKHR-IncomingRayFlagsKHR-04250

The variable decorated with `IncomingRayFlagsKHR` **must** be declared
as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
