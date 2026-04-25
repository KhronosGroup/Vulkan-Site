# HitIsLSSNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitIsLSSNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitIsLSSNV - Indicates if a LSS primitive was hit

`HitIsLSSNV`

A variable decorated with the `HitIsLSSNV` decoration will contain a
non-zero value if the current ray hit a LSS primitive or zero otherwise.

Valid Usage

* 
[](#VUID-HitIsLSSNV-HitIsLSSNV-10516) VUID-HitIsLSSNV-HitIsLSSNV-10516

The `HitIsLSSNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitIsLSSNV-HitIsLSSNV-10517) VUID-HitIsLSSNV-HitIsLSSNV-10517

The variable decorated with `HitIsLSSNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-HitIsLSSNV-HitIsLSSNV-10518) VUID-HitIsLSSNV-HitIsLSSNV-10518

The variable decorated with `HitIsLSSNV` **must** be declared as a
boolean value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
