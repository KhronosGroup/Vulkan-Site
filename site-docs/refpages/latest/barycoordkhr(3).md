# BaryCoordKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaryCoordKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaryCoordKHR - Barycentric coordinates of a fragment

`BaryCoordKHR`

The `BaryCoordKHR` decoration **can** be used to decorate a fragment shader
input variable.
This variable will contain a three-component floating-point vector with
barycentric weights that indicate the location of the fragment relative to
the screen-space locations of vertices of its primitive, obtained using
perspective interpolation.

Valid Usage

* 
[](#VUID-BaryCoordKHR-BaryCoordKHR-04154) VUID-BaryCoordKHR-BaryCoordKHR-04154

The `BaryCoordKHR` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-BaryCoordKHR-BaryCoordKHR-04155) VUID-BaryCoordKHR-BaryCoordKHR-04155

The variable decorated with `BaryCoordKHR` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-BaryCoordKHR-BaryCoordKHR-04156) VUID-BaryCoordKHR-BaryCoordKHR-04156

The variable decorated with `BaryCoordKHR` **must** be declared as a
three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
