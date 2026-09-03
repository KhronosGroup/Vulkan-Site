# BaryCoordPullModelAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordPullModelAMD.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordPullModelAMD - Inverse barycentric coordinates of a fragment center

`BaryCoordPullModelAMD`

The `BaryCoordPullModelAMD` decoration **can** be used to decorate a
fragment shader input variable.
This variable will contain (1/W, 1/I, 1/J) evaluated at the fragment center
and **can** be used to calculate gradients and then interpolate I, J, and W at
any desired sample location.

Valid Usage

* 
[](#VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04169) VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04169

The `BaryCoordPullModelAMD` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04170) VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04170

The variable decorated with `BaryCoordPullModelAMD` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04171) VUID-BaryCoordPullModelAMD-BaryCoordPullModelAMD-04171

The variable decorated with `BaryCoordPullModelAMD` **must** be declared
as a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
