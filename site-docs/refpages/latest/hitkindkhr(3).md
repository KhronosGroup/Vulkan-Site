# HitKindKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitKindKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitKindKHR - Kind of hit that triggered an any-hit or closest hit ray shader

`HitKindKHR`

A variable decorated with the `HitKindKHR` decoration will describe the
intersection that triggered the execution of the current shader.
The values are determined by the intersection shader.
For user-defined intersection shaders this is the value that was passed to
the “Hit Kind” operand of `OpReportIntersectionKHR`.
For triangle intersection candidates, this will be one of
`HitKindFrontFacingTriangleKHR` or `HitKindBackFacingTriangleKHR`.

Valid Usage

* 
[](#VUID-HitKindKHR-HitKindKHR-04242) VUID-HitKindKHR-HitKindKHR-04242

The `HitKindKHR` decoration **must** be used only within the
`AnyHitKHR` or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitKindKHR-HitKindKHR-04243) VUID-HitKindKHR-HitKindKHR-04243

The variable decorated with `HitKindKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-HitKindKHR-HitKindKHR-04244) VUID-HitKindKHR-HitKindKHR-04244

The variable decorated with `HitKindKHR` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
