# ObjectToWorldKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ObjectToWorldKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ObjectToWorldKHR - Transformation matrix from object to world space

`ObjectToWorldKHR`

A variable decorated with the `ObjectToWorldKHR` decoration will contain
the current object-to-world transformation matrix, which is determined by
the instance of the current intersection.

Valid Usage

* 
[](#VUID-ObjectToWorldKHR-ObjectToWorldKHR-04305) VUID-ObjectToWorldKHR-ObjectToWorldKHR-04305

The `ObjectToWorldKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-ObjectToWorldKHR-ObjectToWorldKHR-04306) VUID-ObjectToWorldKHR-ObjectToWorldKHR-04306

The variable decorated with `ObjectToWorldKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-ObjectToWorldKHR-ObjectToWorldKHR-04307) VUID-ObjectToWorldKHR-ObjectToWorldKHR-04307

The variable decorated with `ObjectToWorldKHR` **must** be declared as a
matrix with four columns of three-component vectors of 32-bit
floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
