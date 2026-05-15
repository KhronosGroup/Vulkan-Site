# BaryCoordNoPerspCentroidAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordNoPerspCentroidAMD.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordNoPerspCentroidAMD - Barycentric coordinates of a fragment centroid in screen-space

`BaryCoordNoPerspCentroidAMD`

The `BaryCoordNoPerspCentroidAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain the (I,J) pair of the barycentric coordinates
corresponding to the fragment evaluated using linear interpolation at the
centroid.
The K coordinate of the barycentric coordinates **can** be derived given the
identity I +  J +  K = 1.0.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04163) VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04163

The `BaryCoordNoPerspCentroidAMD` decoration **must** be used only
within the `Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04164) VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04164

The variable decorated with `BaryCoordNoPerspCentroidAMD` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04165) VUID-BaryCoordNoPerspCentroidAMD-BaryCoordNoPerspCentroidAMD-04165

The variable decorated with `BaryCoordNoPerspCentroidAMD` **must** be
declared as a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
