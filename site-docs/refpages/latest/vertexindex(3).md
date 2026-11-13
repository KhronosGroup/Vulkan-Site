# VertexIndex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VertexIndex.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VertexIndex - Vertex index of a shader invocation

`VertexIndex`

Decorating a variable with the `VertexIndex` built-in decoration will
make that variable contain the index of the vertex that is being processed
by the current vertex shader invocation.
For non-indexed draws, this variable begins at the `firstVertex`
parameter to [vkCmdDraw](vkCmdDraw.html) or the `firstVertex` member of a structure
consumed by [vkCmdDrawIndirect](vkCmdDrawIndirect.html) and increments by one for each vertex in
the draw.
For indexed draws, its value is the content of the index buffer for the
vertex plus the `vertexOffset` parameter to [vkCmdDrawIndexed](vkCmdDrawIndexed.html) or
the `vertexOffset` member of the structure consumed by
[vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html).

|  | `VertexIndex` starts at the same starting value for each instance. |
| --- | --- |

Valid Usage

* 
[](#VUID-VertexIndex-VertexIndex-04398) VUID-VertexIndex-VertexIndex-04398

The `VertexIndex` decoration **must** be used only within the
`Vertex` `Execution` `Model`

* 
[](#VUID-VertexIndex-VertexIndex-04399) VUID-VertexIndex-VertexIndex-04399

The variable decorated with `VertexIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-VertexIndex-VertexIndex-04400) VUID-VertexIndex-VertexIndex-04400

The variable decorated with `VertexIndex` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
