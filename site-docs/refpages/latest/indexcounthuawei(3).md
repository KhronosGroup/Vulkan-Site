# IndexCountHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/IndexCountHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

IndexCountHUAWEI - cluster culling shader output variable

`IndexCountHUAWEI`

The `IndexCountHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this indexed mode specific variable will
contain an integer value that specifies the number of indexed vertices in a
cluster to draw.

Valid Usage

* 
[](#VUID-IndexCountHUAWEI-IndexCountHUAWEI-07805) VUID-IndexCountHUAWEI-IndexCountHUAWEI-07805

The `IndexCountHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-IndexCountHUAWEI-IndexCountHUAWEI-07806) VUID-IndexCountHUAWEI-IndexCountHUAWEI-07806

The variable decorated with `IndexCountHUAWEI` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
