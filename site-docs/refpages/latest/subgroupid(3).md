# SubgroupId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupId - Subgroup ID

`SubgroupId`

Decorating a variable with the `SubgroupId` built-in decoration will make
that variable contain the index of the subgroup within the local workgroup.
This variable is in range [0, `NumSubgroups`-1].

Valid Usage

* 
[](#VUID-SubgroupId-SubgroupId-04367) VUID-SubgroupId-SubgroupId-04367

The `SubgroupId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-SubgroupId-SubgroupId-04368) VUID-SubgroupId-SubgroupId-04368

The variable decorated with `SubgroupId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-SubgroupId-SubgroupId-04369) VUID-SubgroupId-SubgroupId-04369

The variable decorated with `SubgroupId` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
