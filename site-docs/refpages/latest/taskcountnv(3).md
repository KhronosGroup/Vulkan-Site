# TaskCountNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/TaskCountNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

TaskCountNV - Number of mesh shader workgroups that will be generated

`TaskCountNV`

Decorating a variable with the `TaskCountNV` decoration will make that
variable contain the task count.
The task count specifies the number of subsequent mesh shader workgroups
that get generated upon completion of the task shader.

Valid Usage

* 
[](#VUID-TaskCountNV-TaskCountNV-04384) VUID-TaskCountNV-TaskCountNV-04384

The `TaskCountNV` decoration **must** be used only within the
`TaskNV` `Execution` `Model`

* 
[](#VUID-TaskCountNV-TaskCountNV-04385) VUID-TaskCountNV-TaskCountNV-04385

The variable decorated with `TaskCountNV` **must** be declared using the
`Output` `Storage` `Class`

* 
[](#VUID-TaskCountNV-TaskCountNV-04386) VUID-TaskCountNV-TaskCountNV-04386

The variable decorated with `TaskCountNV` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
