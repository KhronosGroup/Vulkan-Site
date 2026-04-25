# PositionPerViewNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PositionPerViewNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PositionPerViewNV - Vertex position per view

`PositionPerViewNV`

Decorating a variable with the `PositionPerViewNV` built-in decoration
will make that variable contain the position of the current vertex, for each
view.

Elements of the array correspond to views in a multiview subpass, and those
elements corresponding to views in the view mask of the subpass the shader
is compiled against will be used as the position value for those views.
For the final
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) in the pipeline, values written to an output variable decorated with
`PositionPerViewNV` are used in subsequent primitive assembly, clipping,
and rasterization operations, as with `Position`.
`PositionPerViewNV` output in an earlier
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) is available as an input in the subsequent
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).

If a shader is compiled against a subpass that has the
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](VkSubpassDescriptionFlagBits.html) bit set, then
the position values for each view **must** not differ in any component other
than the X component.
If the values do differ, one will be chosen in an implementation-dependent
manner.

Valid Usage

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04322) VUID-PositionPerViewNV-PositionPerViewNV-04322

The `PositionPerViewNV` decoration **must** be used only within the
`MeshNV`, `Vertex`, `TessellationControl`,
`TessellationEvaluation`, or `Geometry` `Execution` `Model`

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04323) VUID-PositionPerViewNV-PositionPerViewNV-04323

The variable decorated with `PositionPerViewNV` within the
`Vertex`, or `MeshNV` `Execution` `Model` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04324) VUID-PositionPerViewNV-PositionPerViewNV-04324

The variable decorated with `PositionPerViewNV` within the
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
`Execution` `Model` **must** not be declared using a `Storage` `Class` other than
`Input` or `Output`

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04325) VUID-PositionPerViewNV-PositionPerViewNV-04325

The variable decorated with `PositionPerViewNV` **must** be declared as
an array of four-component vector of 32-bit floating-point values with
at least as many elements as the maximum view in the subpass’s view mask
plus one

* 
[](#VUID-PositionPerViewNV-PositionPerViewNV-04326) VUID-PositionPerViewNV-PositionPerViewNV-04326

The array variable decorated with `PositionPerViewNV` **must** only be
indexed by a constant or specialization constant

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
