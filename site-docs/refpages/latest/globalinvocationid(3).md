# GlobalInvocationId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/GlobalInvocationId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

GlobalInvocationId - Global invocation ID

`GlobalInvocationId`

Decorating a variable with the `GlobalInvocationId` built-in decoration
will make that variable contain the location of the current invocation
within the global workgroup.
Each component is equal to the index of the local workgroup multiplied by
the size of the local workgroup plus `LocalInvocationId`.

Valid Usage

* 
[](#VUID-GlobalInvocationId-GlobalInvocationId-04236) VUID-GlobalInvocationId-GlobalInvocationId-04236

The `GlobalInvocationId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-GlobalInvocationId-GlobalInvocationId-04237) VUID-GlobalInvocationId-GlobalInvocationId-04237

The variable decorated with `GlobalInvocationId` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-GlobalInvocationId-GlobalInvocationId-04238) VUID-GlobalInvocationId-GlobalInvocationId-04238

The variable decorated with `GlobalInvocationId` **must** be declared as
a three-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
