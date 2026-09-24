# HitIsSphereNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitIsSphereNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitIsSphereNV - Indicates if a sphere primitive was hit

`HitIsSphereNV`

A variable decorated with the `HitIsSphereNV` decoration will contain a
non-zero value if the current ray hit a sphere primitive or zero otherwise.

Valid Usage

* 
[](#VUID-HitIsSphereNV-HitIsSphereNV-10513) VUID-HitIsSphereNV-HitIsSphereNV-10513

The `HitIsSphereNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitIsSphereNV-HitIsSphereNV-10514) VUID-HitIsSphereNV-HitIsSphereNV-10514

The variable decorated with `HitIsSphereNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-HitIsSphereNV-HitIsSphereNV-10515) VUID-HitIsSphereNV-HitIsSphereNV-10515

The variable decorated with `HitIsSphereNV` **must** be declared as a
boolean value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
