# VertexCountHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VertexCountHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VertexCountHUAWEI - cluster culling shader output variable

`VertexCountHUAWEI`

The `VertexCountHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this non-indexed mode specific variable will
contain an integer value that specifies the number of vertices in a cluster
to draw.

Valid Usage

* 
[](#VUID-VertexCountHUAWEI-VertexCountHUAWEI-07809) VUID-VertexCountHUAWEI-VertexCountHUAWEI-07809

The `VertexCountHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-VertexCountHUAWEI-VertexCountHUAWEI-07810) VUID-VertexCountHUAWEI-VertexCountHUAWEI-07810

The variable decorated with `VertexCountHUAWEI` **must** be declared as
a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
