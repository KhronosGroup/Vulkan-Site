# BaryCoordSmoothAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordSmoothAMD.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordSmoothAMD - Barycentric coordinates of a fragment center

`BaryCoordSmoothAMD`

The `BaryCoordSmoothAMD` decoration **can** be used to decorate a fragment
shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using perspective interpolation at
the fragment’s center.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04172) VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04172

The `BaryCoordSmoothAMD` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04173) VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04173

The variable decorated with `BaryCoordSmoothAMD` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04174) VUID-BaryCoordSmoothAMD-BaryCoordSmoothAMD-04174

The variable decorated with `BaryCoordSmoothAMD` **must** be declared as
a two-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
