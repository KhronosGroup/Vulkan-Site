# PointCoord(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PointCoord.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PointCoord - Fragment coordinates in screen-space within a point primitive

`PointCoord`

Decorating a variable with the `PointCoord` built-in decoration will make
that variable contain the coordinate of the current fragment within the
point being rasterized, normalized to the size of the point with origin in
the upper left corner of the point, as described in
[Basic Point Rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-points-basic).
If the primitive the fragment shader invocation belongs to is not a point,
then the variable decorated with `PointCoord` contains poison.

|  | Depending on how the point is rasterized, `PointCoord` **may** never reach
| --- | --- |
(0,0) or (1,1). |

Valid Usage

* 
[](#VUID-PointCoord-PointCoord-04311) VUID-PointCoord-PointCoord-04311

The `PointCoord` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-PointCoord-PointCoord-04312) VUID-PointCoord-PointCoord-04312

The variable decorated with `PointCoord` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-PointCoord-PointCoord-04313) VUID-PointCoord-PointCoord-04313

The variable decorated with `PointCoord` **must** be declared as a
two-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
