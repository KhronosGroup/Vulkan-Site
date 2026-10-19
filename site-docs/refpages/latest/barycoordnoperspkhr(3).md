# BaryCoordNoPerspKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordNoPerspKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordNoPerspKHR - Barycentric coordinates of a fragment in screen-space

`BaryCoordNoPerspKHR`

The `BaryCoordNoPerspKHR` decoration **can** be used to decorate a fragment
shader input variable.
This variable will contain a three-component floating-point vector with
barycentric weights that indicate the location of the fragment relative to
the screen-space locations of vertices of its primitive, obtained using
linear interpolation.

Valid Usage

* 
[](#VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04160) VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04160

The `BaryCoordNoPerspKHR` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04161) VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04161

The variable decorated with `BaryCoordNoPerspKHR` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04162) VUID-BaryCoordNoPerspKHR-BaryCoordNoPerspKHR-04162

The variable decorated with `BaryCoordNoPerspKHR` **must** be declared
as a three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
