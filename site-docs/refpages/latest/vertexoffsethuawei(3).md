# VertexOffsetHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VertexOffsetHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VertexOffsetHUAWEI - cluster culling shader output variable

`VertexOffsetHUAWEI`

The `VertexOffsetHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this indexed mode specific variable will
contain an integer value that specifies an offset value added to the vertex
index of a cluster before indexing into the vertex buffer.

Valid Usage

* 
[](#VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07811) VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07811

The `VertexOffsetHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07812) VUID-VertexOffsetHUAWEI-VertexOffsetHUAWEI-07812

The variable decorated with `VertexOffsetHUAWEI` **must** be declared as
a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
