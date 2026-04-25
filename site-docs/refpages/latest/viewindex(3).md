# ViewIndex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ViewIndex.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ViewIndex - View index of a shader invocation

`ViewIndex`

The `ViewIndex` decoration **can** be applied to a shader input which will
be filled with the index of the view that is being processed by the current
shader invocation.

If multiview is enabled in the render pass, this value will be the index of
one of the bits set in the view mask of the subpass the pipeline is compiled
against.
If multiview is not enabled in the render pass, this value will be zero.

Valid Usage

* 
[](#VUID-ViewIndex-ViewIndex-04401) VUID-ViewIndex-ViewIndex-04401

The `ViewIndex` decoration **must** be used only within the
`MeshEXT`, `Vertex`, `Geometry`, `TessellationControl`,
`TessellationEvaluation` or `Fragment` `Execution` `Model`

* 
[](#VUID-ViewIndex-ViewIndex-04402) VUID-ViewIndex-ViewIndex-04402

The variable decorated with `ViewIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-ViewIndex-ViewIndex-04403) VUID-ViewIndex-ViewIndex-04403

The variable decorated with `ViewIndex` **must** be declared as a scalar
32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
