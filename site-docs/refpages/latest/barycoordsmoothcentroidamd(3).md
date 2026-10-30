# BaryCoordSmoothCentroidAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordSmoothCentroidAMD.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordSmoothCentroidAMD - Barycentric coordinates of a fragment centroid

`BaryCoordSmoothCentroidAMD`

The `BaryCoordSmoothCentroidAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using perspective interpolation at
the centroid.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04175) VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04175

The `BaryCoordSmoothCentroidAMD` decoration **must** be used only within
the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04176) VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04176

The variable decorated with `BaryCoordSmoothCentroidAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04177) VUID-BaryCoordSmoothCentroidAMD-BaryCoordSmoothCentroidAMD-04177

The variable decorated with `BaryCoordSmoothCentroidAMD` **must** be
declared as a two-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
