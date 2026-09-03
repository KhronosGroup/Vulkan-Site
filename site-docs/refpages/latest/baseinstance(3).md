# BaseInstance(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/BaseInstance.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

BaseInstance - First instance being rendered

`BaseInstance`

Decorating a variable with the `BaseInstance` built-in will make that
variable contain the integer value corresponding to the first instance that
was passed to the command that invoked the current vertex shader invocation.
`BaseInstance` is the `firstInstance` parameter to a *direct drawing
command* or the `firstInstance` member of a structure consumed by an
*indirect drawing command*.

Valid Usage

* 
[](#VUID-BaseInstance-BaseInstance-04181) VUID-BaseInstance-BaseInstance-04181

The `BaseInstance` decoration **must** be used only within the
`Vertex` `Execution` `Model`

* 
[](#VUID-BaseInstance-BaseInstance-04182) VUID-BaseInstance-BaseInstance-04182

The variable decorated with `BaseInstance` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-BaseInstance-BaseInstance-04183) VUID-BaseInstance-BaseInstance-04183

The variable decorated with `BaseInstance` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
