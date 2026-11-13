# WorkgroupId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WorkgroupId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WorkgroupId - Workgroup ID of a shader

`WorkgroupId`

Decorating a variable with the `WorkgroupId` built-in decoration will
make that variable contain the global coordinate of the local workgroup that
the current invocation is a member of.
Each component is in the range [base,base +  count), where
base and count are based on the parameters passed into the
dispatching
or drawing
commands in each dimension.

Valid Usage

* 
[](#VUID-WorkgroupId-WorkgroupId-04422) VUID-WorkgroupId-WorkgroupId-04422

The `WorkgroupId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-WorkgroupId-WorkgroupId-04423) VUID-WorkgroupId-WorkgroupId-04423

The variable decorated with `WorkgroupId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-WorkgroupId-WorkgroupId-04424) VUID-WorkgroupId-WorkgroupId-04424

The variable decorated with `WorkgroupId` **must** be declared as a
three-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
