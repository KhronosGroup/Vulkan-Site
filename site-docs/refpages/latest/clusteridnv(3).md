# ClusterIDNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ClusterIDNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ClusterIDNV - Contains the triangle cluster ID of a hit triangle in cluster acceleration structure

`ClusterIDNV`

A variable decorated with the `ClusterIDNV` decoration will contain the
triangle cluster ID of a hit triangle in a cluster acceleration structure if
the current ray hit a triangle primitive or `-1` otherwise.

Valid Usage

* 
[](#VUID-ClusterIDNV-ClusterIDNV-10531) VUID-ClusterIDNV-ClusterIDNV-10531

The `ClusterIDNV` decoration **must** be used only within the
`AnyHitKHR`, or `ClosestHitKHR` `Execution` `Model`

* 
[](#VUID-ClusterIDNV-ClusterIDNV-10532) VUID-ClusterIDNV-ClusterIDNV-10532

The variable decorated with `ClusterIDNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-ClusterIDNV-ClusterIDNV-10533) VUID-ClusterIDNV-ClusterIDNV-10533

The variable decorated with `ClusterIDNV` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
