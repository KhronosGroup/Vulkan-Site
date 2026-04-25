# FirstIndexHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FirstIndexHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FirstIndexHUAWEI - cluster culling shader output variable

`FirstIndexHUAWEI`

The `FirstIndexHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this indexed mode specific variable will
contain an integer value that specifies the base index within the index
buffer corresponding to a cluster.

Valid Usage

* 
[](#VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07799) VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07799

The `FirstIndexHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07800) VUID-FirstIndexHUAWEI-FirstIndexHUAWEI-07800

The variable decorated with `FirstIndexHUAWEI` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
