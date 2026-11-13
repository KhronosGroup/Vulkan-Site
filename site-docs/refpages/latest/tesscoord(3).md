# TessCoord(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/TessCoord.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

TessCoord - Barycentric coordinate of a tessellated vertex within a patch

`TessCoord`

Decorating a variable with the `TessCoord` built-in decoration will make
that variable contain the three-dimensional (u,v,w) barycentric
coordinate of the tessellated vertex within the patch.
u, v, and w are in the range [0,1] and vary linearly
across the primitive being subdivided.
For the tessellation modes of `Quads` or `IsoLines`, the third
component is always zero.

Valid Usage

* 
[](#VUID-TessCoord-TessCoord-04387) VUID-TessCoord-TessCoord-04387

The `TessCoord` decoration **must** be used only within the
`TessellationEvaluation` `Execution` `Model`

* 
[](#VUID-TessCoord-TessCoord-04388) VUID-TessCoord-TessCoord-04388

The variable decorated with `TessCoord` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-TessCoord-TessCoord-04389) VUID-TessCoord-TessCoord-04389

The variable decorated with `TessCoord` **must** be declared as a
three-component vector of 32-bit floating-point values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
