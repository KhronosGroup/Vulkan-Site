# BaryCoordNoPerspAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordNoPerspAMD.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordNoPerspAMD - Barycentric coordinates of a fragment center in screen-space

`BaryCoordNoPerspAMD`

The `BaryCoordNoPerspAMD` decoration **can** be used to decorate a fragment
shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using linear interpolation at the
fragment’s center.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04157) VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04157

The `BaryCoordNoPerspAMD` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04158) VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04158

The variable decorated with `BaryCoordNoPerspAMD` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04159) VUID-BaryCoordNoPerspAMD-BaryCoordNoPerspAMD-04159

The variable decorated with `BaryCoordNoPerspAMD` **must** be declared
as a two-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
