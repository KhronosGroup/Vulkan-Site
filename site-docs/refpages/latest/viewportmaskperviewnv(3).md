# ViewportMaskPerViewNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ViewportMaskPerViewNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ViewportMaskPerViewNV - Mask of viewports broadcast to per view

`ViewportMaskPerViewNV`

Decorating a variable with the `ViewportMaskPerViewNV` built-in
decoration will make that variable contain the mask of viewports primitives
are broadcast to, for each view.

The value written to an element of `ViewportMaskPerViewNV` in the last
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is a bitmask indicating which viewports the primitive will be
directed to.
The primitive will be broadcast to the viewport corresponding to each
non-zero bit of the bitmask, and that viewport index is used to select the
viewport transform, scissor rectangle, and exclusive
scissor rectangle, for each view.
The same values **must** be written to all vertices in a given primitive, or
else the set of viewports used for that primitive is **undefined**.

Elements of the array correspond to views in a multiview subpass, and those
elements corresponding to views in the view mask of the subpass the shader
is compiled against will be used as the viewport mask value for those views.
`ViewportMaskPerViewNV` output in an earlier
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is not available as an input in the subsequent
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).

Although `ViewportMaskNV` is an array, `ViewportMaskPerViewNV` is not
a two-dimensional array.
Instead, `ViewportMaskPerViewNV` is limited to 32 viewports.

Valid Usage

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04412) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04412

The `ViewportMaskPerViewNV` decoration **must** be used only within the
`Vertex`, `MeshNV`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04413) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04413

The variable decorated with `ViewportMaskPerViewNV` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04414) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04414

The variable decorated with `ViewportMaskPerViewNV` **must** be declared
as an array of 32-bit integer values

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04415) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04415

The array decorated with `ViewportMaskPerViewNV` **must** be a size less
than or equal to 32

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04416) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04416

The array decorated with `ViewportMaskPerViewNV` **must** be a size
greater than the maximum view in the subpass’s view mask

* 
[](#VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04417) VUID-ViewportMaskPerViewNV-ViewportMaskPerViewNV-04417

The array variable decorated with `ViewportMaskPerViewNV` **must** only
be indexed by a constant or specialization constant

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
