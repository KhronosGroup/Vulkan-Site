# LocalInvocationIndex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/LocalInvocationIndex.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

LocalInvocationIndex - Linear local invocation index

`LocalInvocationIndex`

Decorating a variable with the `LocalInvocationIndex` built-in decoration
will make that variable contain a one-dimensional representation of
`LocalInvocationId`.
This is computed as:

LocalInvocationIndex =
    LocalInvocationId.z * WorkgroupSize.x * WorkgroupSize.y +
    LocalInvocationId.y * WorkgroupSize.x +
    LocalInvocationId.x;

Valid Usage

* 
[](#VUID-LocalInvocationIndex-LocalInvocationIndex-04284) VUID-LocalInvocationIndex-LocalInvocationIndex-04284

The `LocalInvocationIndex` decoration **must** be used only within the
`GLCompute`, `MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV`
`Execution` `Model`

* 
[](#VUID-LocalInvocationIndex-LocalInvocationIndex-04285) VUID-LocalInvocationIndex-LocalInvocationIndex-04285

The variable decorated with `LocalInvocationIndex` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-LocalInvocationIndex-LocalInvocationIndex-04286) VUID-LocalInvocationIndex-LocalInvocationIndex-04286

The variable decorated with `LocalInvocationIndex` **must** be declared
as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
