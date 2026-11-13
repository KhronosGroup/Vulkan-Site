# HitTriangleVertexPositionsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/HitTriangleVertexPositionsKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

HitTriangleVertexPositionsKHR - Vertices of an intersected triangle

`HitTriangleVertexPositionsKHR`

A variable decorated with the `HitTriangleVertexPositionsKHR` decoration
will specify the object space vertices of the triangle at the current
intersection in application-provided order.
The positions returned are transformed by the geometry transform, which is
performed at standard [floating-point](../../../../spec/latest/chapters/fundamentals.html#fundamentals-floating-point)
precision, but without a specifically defined order of floating-point
operations to perform the matrix multiplication.

Valid Usage

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08747) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08747

The `HitTriangleVertexPositionsKHR` decoration **must** be used only
within the `AnyHitKHR` or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08748) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08748

The variable decorated with `HitTriangleVertexPositionsKHR` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08749) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08749

The variable decorated with `HitTriangleVertexPositionsKHR` **must** be
declared as an array of three vectors of three 32-bit float values

* 
[](#VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08750) VUID-HitTriangleVertexPositionsKHR-HitTriangleVertexPositionsKHR-08750

The variable decorated with `HitTriangleVertexPositionsKHR` **must** be
used only if the value of `HitKindKHR` is
`HitKindFrontFacingTriangleKHR` or `HitKindBackFacingTriangleKHR`

* 
[](#VUID-HitTriangleVertexPositionsKHR-None-08751) VUID-HitTriangleVertexPositionsKHR-None-08751

The acceleration structure corresponding to the current intersection
**must** have been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html)

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
