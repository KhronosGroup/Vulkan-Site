# InstanceCountHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/InstanceCountHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

InstanceCountHUAWEI - cluster culling shader output variable

`InstanceCountHUAWEI`

The `InstanceCountHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this variable will contain an integer value
that specifies the number of instance to draw in a cluster.

Valid Usage

* 
[](#VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07807) VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07807

The `InstanceCountHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07808) VUID-InstanceCountHUAWEI-InstanceCountHUAWEI-07808

The variable decorated with `InstanceCountHUAWEI` **must** be declared
as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
