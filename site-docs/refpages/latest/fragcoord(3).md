# FragCoord(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FragCoord.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FragCoord - Coordinates of the fragment

`FragCoord`

Decorating a variable with the `FragCoord` built-in decoration will make
that variable contain the coordinates (x,y,z,1/w) of the fragment
being processed.

The (x,y) values are the framebuffer coordinates (xf,yf) of
the fragment.

When [Sample Shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is enabled, the x and
y components of `FragCoord` reflect the location of one of the
samples corresponding to the shader invocation.

Otherwise, the x and y components of `FragCoord` reflect the
location of the center of the fragment.

The z component of `FragCoord` is the interpolated depth value of
the primitive.

The w component is the interpolated   .

The `Centroid` interpolation decoration is ignored, but allowed, on
`FragCoord`.

Valid Usage

* 
[](#VUID-FragCoord-FragCoord-04210) VUID-FragCoord-FragCoord-04210

The `FragCoord` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragCoord-FragCoord-04211) VUID-FragCoord-FragCoord-04211

The variable decorated with `FragCoord` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-FragCoord-FragCoord-04212) VUID-FragCoord-FragCoord-04212

The variable decorated with `FragCoord` **must** be declared as a
four-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
