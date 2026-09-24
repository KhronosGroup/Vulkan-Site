# BaryCoordNoPerspSampleAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordNoPerspSampleAMD.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordNoPerspSampleAMD - Barycentric coordinates of a sample center in screen-space

`BaryCoordNoPerspSampleAMD`

The `BaryCoordNoPerspSampleAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using linear interpolation at each
covered sample.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04166) VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04166

The `BaryCoordNoPerspSampleAMD` decoration **must** be used only within
the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04167) VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04167

The variable decorated with `BaryCoordNoPerspSampleAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04168) VUID-BaryCoordNoPerspSampleAMD-BaryCoordNoPerspSampleAMD-04168

The variable decorated with `BaryCoordNoPerspSampleAMD` **must** be
declared as a two-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
