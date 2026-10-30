# SamplePosition(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SamplePosition.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SamplePosition - Position of a shaded sample

`SamplePosition`

Decorating a variable with the `SamplePosition` built-in decoration will
make that variable contain the sub-pixel position of the sample being
shaded.
The top left of the pixel is considered to be at coordinate (0,0) and
the bottom right of the pixel is considered to be at coordinate (1,1).

If the render pass has a fragment density map attachment, the variable will
instead contain the sub-fragment position of the sample being shaded.
The top left of the fragment is considered to be at coordinate (0,0)
and the bottom right of the fragment is considered to be at coordinate
(1,1) for any fragment area.

If a fragment shader entry point’s interface includes an input variable
decorated with `SamplePosition`, [Sample Shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is considered enabled with a `minSampleShading` value of 1.0.

If the current pipeline uses [custom sample locations](../../../../spec/latest/chapters/primsrast.html#primsrast-samplelocations) the value of any variable decorated with the `SamplePosition`
built-in decoration is poison.

Valid Usage

* 
[](#VUID-SamplePosition-SamplePosition-04360) VUID-SamplePosition-SamplePosition-04360

The `SamplePosition` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-SamplePosition-SamplePosition-04361) VUID-SamplePosition-SamplePosition-04361

The variable decorated with `SamplePosition` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-SamplePosition-SamplePosition-04362) VUID-SamplePosition-SamplePosition-04362

The variable decorated with `SamplePosition` **must** be declared as a
two-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
