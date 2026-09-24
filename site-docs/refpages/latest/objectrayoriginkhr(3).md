# ObjectRayOriginKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ObjectRayOriginKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ObjectRayOriginKHR - Ray origin in object space

`ObjectRayOriginKHR`

A variable decorated with the `ObjectRayOriginKHR` decoration will
specify the origin of the ray being processed, in object space.

Valid Usage

* 
[](#VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04302) VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04302

The `ObjectRayOriginKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04303) VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04303

The variable decorated with `ObjectRayOriginKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04304) VUID-ObjectRayOriginKHR-ObjectRayOriginKHR-04304

The variable decorated with `ObjectRayOriginKHR` **must** be declared as
a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
