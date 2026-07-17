# CullMaskKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CullMaskKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CullMaskKHR - OpTrace specified ray cull mask

`CullMaskKHR`

A variable decorated with the `CullMaskKHR` decoration will specify the
cull mask of the ray being processed.
The value is given by the `Cull Mask` parameter passed into one of the
`OpTrace*` instructions.

Valid Usage

* 
[](#VUID-CullMaskKHR-CullMaskKHR-06735) VUID-CullMaskKHR-CullMaskKHR-06735

The `CullMaskKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, `ClosestHitKHR`, or
`MissKHR` `Execution` `Model`

* 
[](#VUID-CullMaskKHR-CullMaskKHR-06736) VUID-CullMaskKHR-CullMaskKHR-06736

The variable decorated with `CullMaskKHR` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-CullMaskKHR-CullMaskKHR-06737) VUID-CullMaskKHR-CullMaskKHR-06737

The variable decorated with `CullMaskKHR` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
