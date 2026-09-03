# DrawIndex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/DrawIndex.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

DrawIndex - Index of the current draw

`DrawIndex`

Decorating a variable with the `DrawIndex` built-in will make that
variable contain the integer value corresponding to the zero-based index of
the draw that invoked the current
task, mesh, or
vertex shader invocation.
For *indirect drawing commands*, `DrawIndex` begins at zero and
increments by one for each draw executed.
The number of draws is given by the `drawCount` parameter.
For *direct drawing commands*,
if [vkCmdDrawMultiEXT](vkCmdDrawMultiEXT.html) or [vkCmdDrawMultiIndexedEXT](vkCmdDrawMultiIndexedEXT.html) is used, this
variable contains the integer value corresponding to the zero-based index of
the draw.
Otherwise
`DrawIndex` is always zero.
`DrawIndex` is dynamically uniform.

When task or mesh shaders are used, only the first active stage will have
proper access to the variable.
The value read by other stages is poison.

Valid Usage

* 
[](#VUID-DrawIndex-DrawIndex-04207) VUID-DrawIndex-DrawIndex-04207

The `DrawIndex` decoration **must** be used only within the `Vertex`,
`MeshEXT`, `TaskEXT`, `MeshNV`, or `TaskNV` `Execution` `Model`

* 
[](#VUID-DrawIndex-DrawIndex-04208) VUID-DrawIndex-DrawIndex-04208

The variable decorated with `DrawIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-DrawIndex-DrawIndex-04209) VUID-DrawIndex-DrawIndex-04209

The variable decorated with `DrawIndex` **must** be declared as a scalar
32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
