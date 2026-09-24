# FirstInstanceHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FirstInstanceHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FirstInstanceHUAWEI - cluster culling shader output variable

`FirstInstanceHUAWEI`

The `FirstInstanceHUAWEI` decoration can be used to decorate a cluster
culling shader output variable,this variable will contain an integer value
that specifies the instance ID of the first instance to draw.

Valid Usage

* 
[](#VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07801) VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07801

The `FirstInstanceHUAWEI` decoration **must** be used only within the
`ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07802) VUID-FirstInstanceHUAWEI-FirstInstanceHUAWEI-07802

The variable decorated with `FirstInstanceHUAWEI` **must** be declared
as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
