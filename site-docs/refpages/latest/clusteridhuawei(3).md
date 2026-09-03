# ClusterIDHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ClusterIDHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ClusterIDHUAWEI - cluster culling shader output variable

`ClusterIDHUAWEI`

The `ClusterIDHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this variable will contain an integer value
that specifies the id of cluster being rendered by this drawing command.
When Cluster Culling Shader enable, `ClusterIDHUAWEI` will replace
gl_DrawID pass to vertex shader for cluster-related information fetching.

Valid Usage

* 
[](#VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07797) VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07797

The `ClusterIDHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07798) VUID-ClusterIDHUAWEI-ClusterIDHUAWEI-07798

The variable decorated with `ClusterIDHUAWEI` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
