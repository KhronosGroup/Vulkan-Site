# MeshViewCountNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/MeshViewCountNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

MeshViewCountNV - Number of views processed by a mesh or task shader

`MeshViewCountNV`

Decorating a variable with the `MeshViewCountNV` built-in decoration will
make that variable contain the number of views processed by the current mesh
or task shader invocations.

Valid Usage

* 
[](#VUID-MeshViewCountNV-MeshViewCountNV-04287) VUID-MeshViewCountNV-MeshViewCountNV-04287

The `MeshViewCountNV` decoration **must** be used only within the
`MeshNV` or `TaskNV` `Execution` `Model`

* 
[](#VUID-MeshViewCountNV-MeshViewCountNV-04288) VUID-MeshViewCountNV-MeshViewCountNV-04288

The variable decorated with `MeshViewCountNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-MeshViewCountNV-MeshViewCountNV-04289) VUID-MeshViewCountNV-MeshViewCountNV-04289

The variable decorated with `MeshViewCountNV` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
