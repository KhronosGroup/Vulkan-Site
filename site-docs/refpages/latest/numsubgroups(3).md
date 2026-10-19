# NumSubgroups(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/NumSubgroups.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

NumSubgroups - Number of subgroups in a workgroup

`NumSubgroups`

Decorating a variable with the `NumSubgroups` built-in decoration will
make that variable contain the number of subgroups in the local workgroup.

Valid Usage

* 
[](#VUID-NumSubgroups-NumSubgroups-04293) VUID-NumSubgroups-NumSubgroups-04293

The `NumSubgroups` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-NumSubgroups-NumSubgroups-04294) VUID-NumSubgroups-NumSubgroups-04294

The variable decorated with `NumSubgroups` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-NumSubgroups-NumSubgroups-04295) VUID-NumSubgroups-NumSubgroups-04295

The variable decorated with `NumSubgroups` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
