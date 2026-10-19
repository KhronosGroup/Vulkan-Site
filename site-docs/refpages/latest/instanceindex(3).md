# InstanceIndex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/InstanceIndex.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

InstanceIndex - Index of an instance

`InstanceIndex`

Decorating a variable in a vertex shader with the `InstanceIndex`
built-in decoration will make that variable contain the index of the
instance that is being processed by the current vertex shader invocation.
`InstanceIndex` begins at the `firstInstance` parameter to
[vkCmdDraw](vkCmdDraw.html) or [vkCmdDrawIndexed](vkCmdDrawIndexed.html) or at the `firstInstance`
member of a structure consumed by [vkCmdDrawIndirect](vkCmdDrawIndirect.html) or
[vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html).

Valid Usage

* 
[](#VUID-InstanceIndex-InstanceIndex-04263) VUID-InstanceIndex-InstanceIndex-04263

The `InstanceIndex` decoration **must** be used only within the
`Vertex` `Execution` `Model`

* 
[](#VUID-InstanceIndex-InstanceIndex-04264) VUID-InstanceIndex-InstanceIndex-04264

The variable decorated with `InstanceIndex` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-InstanceIndex-InstanceIndex-04265) VUID-InstanceIndex-InstanceIndex-04265

The variable decorated with `InstanceIndex` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
