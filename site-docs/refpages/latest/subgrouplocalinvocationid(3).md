# SubgroupLocalInvocationId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SubgroupLocalInvocationId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SubgroupLocalInvocationId - ID of the invocation within a subgroup

`SubgroupLocalInvocationId`

Decorating a variable with the `SubgroupLocalInvocationId` builtin
decoration will make that variable contain the index of the invocation
within the subgroup.
This variable is in range [0,`SubgroupSize`-1].

|  | There is no direct relationship between `SubgroupLocalInvocationId` and
| --- | --- |
`LocalInvocationId` or `LocalInvocationIndex`.
If the shader was created with [full subgroups](../../../../spec/latest/chapters/shaders.html#shaders-full-subgroups),
applications can compute their own local invocation index to serve the same
purpose:

index = `SubgroupLocalInvocationId` + `SubgroupId` ×
`SubgroupSize`

If full subgroups are not enabled, some subgroups may be dispatched with
inactive invocations that do not correspond to a local workgroup invocation,
making the value of index unreliable. |

Valid Usage

* 
[](#VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04380) VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04380

The variable decorated with `SubgroupLocalInvocationId` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04381) VUID-SubgroupLocalInvocationId-SubgroupLocalInvocationId-04381

The variable decorated with `SubgroupLocalInvocationId` **must** be
declared as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
