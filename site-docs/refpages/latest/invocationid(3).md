# InvocationId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/InvocationId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

InvocationId - Invocation ID in a geometry or tessellation control shader

`InvocationId`

Decorating a variable with the `InvocationId` built-in decoration will
make that variable contain the index of the current shader invocation in a
geometry shader, or the index of the output patch vertex in a tessellation
control shader.

In a geometry shader, the index of the current shader invocation ranges from
zero to the number of [instances](../../../../spec/latest/chapters/geometry.html#geometry-invocations) declared in the
shader minus one.
If the instance count of the geometry shader is one or is not specified,
then `InvocationId` will be zero.

Valid Usage

* 
[](#VUID-InvocationId-InvocationId-04257) VUID-InvocationId-InvocationId-04257

The `InvocationId` decoration **must** be used only within the
`TessellationControl` or `Geometry` `Execution` `Model`

* 
[](#VUID-InvocationId-InvocationId-04258) VUID-InvocationId-InvocationId-04258

The variable decorated with `InvocationId` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-InvocationId-InvocationId-04259) VUID-InvocationId-InvocationId-04259

The variable decorated with `InvocationId` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
