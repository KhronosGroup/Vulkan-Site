# NumWorkgroups(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/NumWorkgroups.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

NumWorkgroups - Number of workgroups in a dispatch

`NumWorkgroups`

Decorating a variable with the `NumWorkgroups` built-in decoration will
make that variable contain the number of local workgroups that are part of
the dispatch that the invocation belongs to.
Each component is equal to the values of the workgroup count parameters
passed into the dispatching commands.

Valid Usage

* 
[](#VUID-NumWorkgroups-NumWorkgroups-04296) VUID-NumWorkgroups-NumWorkgroups-04296

The `NumWorkgroups` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, or `TaskEXT` `Execution` `Model`

* 
[](#VUID-NumWorkgroups-NumWorkgroups-04297) VUID-NumWorkgroups-NumWorkgroups-04297

The variable decorated with `NumWorkgroups` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-NumWorkgroups-NumWorkgroups-04298) VUID-NumWorkgroups-NumWorkgroups-04298

The variable decorated with `NumWorkgroups` **must** be declared as a
three-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
