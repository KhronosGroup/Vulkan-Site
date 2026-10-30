# WorldToObjectKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WorldToObjectKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WorldToObjectKHR - Transformation matrix from world to object space

`WorldToObjectKHR`

A variable decorated with the `WorldToObjectKHR` decoration will contain
the current world-to-object transformation matrix, which is determined by
the instance of the current intersection.

Valid Usage

* 
[](#VUID-WorldToObjectKHR-WorldToObjectKHR-04434) VUID-WorldToObjectKHR-WorldToObjectKHR-04434

The `WorldToObjectKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-WorldToObjectKHR-WorldToObjectKHR-04435) VUID-WorldToObjectKHR-WorldToObjectKHR-04435

The variable decorated with `WorldToObjectKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-WorldToObjectKHR-WorldToObjectKHR-04436) VUID-WorldToObjectKHR-WorldToObjectKHR-04436

The variable decorated with `WorldToObjectKHR` **must** be declared as a
matrix with four columns of three-component vectors of 32-bit
floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
