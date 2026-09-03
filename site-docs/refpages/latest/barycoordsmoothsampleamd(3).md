# BaryCoordSmoothSampleAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordSmoothSampleAMD.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordSmoothSampleAMD - Barycentric coordinates of a sample center

`BaryCoordSmoothSampleAMD`

The `BaryCoordSmoothSampleAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using perspective interpolation at
each covered sample.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04178) VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04178

The `BaryCoordSmoothSampleAMD` decoration **must** be used only within
the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04179) VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04179

The variable decorated with `BaryCoordSmoothSampleAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04180) VUID-BaryCoordSmoothSampleAMD-BaryCoordSmoothSampleAMD-04180

The variable decorated with `BaryCoordSmoothSampleAMD` **must** be
declared as a two-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
