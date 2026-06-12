# PatchVertices(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/PatchVertices.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

PatchVertices - Number of vertices in an input patch

`PatchVertices`

Decorating a variable with the `PatchVertices` built-in decoration will
make that variable contain the number of vertices in the input patch being
processed by the shader.
In a Tessellation Control Shader, this is the same as the
name:patchControlPoints member of
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html).
In a Tessellation Evaluation Shader, `PatchVertices` is equal to the
tessellation control output patch size.
When the same shader is used in different pipelines where the patch sizes
are configured differently, the value of the `PatchVertices` variable
will also differ.

Valid Usage

* 
[](#VUID-PatchVertices-PatchVertices-04308) VUID-PatchVertices-PatchVertices-04308

The `PatchVertices` decoration **must** be used only within the
`TessellationControl` or `TessellationEvaluation` `Execution` `Model`

* 
[](#VUID-PatchVertices-PatchVertices-04309) VUID-PatchVertices-PatchVertices-04309

The variable decorated with `PatchVertices` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-PatchVertices-PatchVertices-04310) VUID-PatchVertices-PatchVertices-04310

The variable decorated with `PatchVertices` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
