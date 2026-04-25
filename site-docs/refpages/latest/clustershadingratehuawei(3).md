# ClusterShadingRateHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ClusterShadingRateHUAWEI.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ClusterShadingRateHUAWEI - cluster culling shader output variable

`ClusterShadingRateHUAWEI`

The `ClusterShadingRateHUAWEI` decoration can be used to decorate a
cluster culling shader output variable.
This variable will contain an integer value specifying the shading rate of a
rendering cluster.

Valid Usage

* 
[](#VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09448) VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09448

The `ClusterShadingRateHUAWEI` decoration **must** be used only within
the `ClusterCullingHUAWEI` `Execution` `Model`

* 
[](#VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09449) VUID-ClusterShadingRateHUAWEI-ClusterShadingRateHUAWEI-09449

The variable decorated with `ClusterShadingRateHUAWEI` **must** be
declared as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
