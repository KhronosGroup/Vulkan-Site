# LocalInvocationId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/LocalInvocationId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

LocalInvocationId - Local invocation ID

`LocalInvocationId`

Decorating a variable with the `LocalInvocationId` built-in decoration
will make that variable contain the location of the current
cluster culling,
task, mesh, or
compute shader invocation within the local workgroup.
Each component ranges from zero through to the size of the workgroup in that
dimension minus one.

|  | If the size of the workgroup in a particular dimension is one, then the
| --- | --- |
`LocalInvocationId` in that dimension will be zero.
If the workgroup is effectively two-dimensional, then
`LocalInvocationId.z` will be zero.
If the workgroup is effectively one-dimensional, then both
`LocalInvocationId.y` and `LocalInvocationId.z` will be zero. |

Valid Usage

* 
[](#VUID-LocalInvocationId-LocalInvocationId-04281) VUID-LocalInvocationId-LocalInvocationId-04281

The `LocalInvocationId` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-LocalInvocationId-LocalInvocationId-04282) VUID-LocalInvocationId-LocalInvocationId-04282

The variable decorated with `LocalInvocationId` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-LocalInvocationId-LocalInvocationId-04283) VUID-LocalInvocationId-LocalInvocationId-04283

The variable decorated with `LocalInvocationId` **must** be declared as
a three-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
