# FragStencilRefEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FragStencilRefEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FragStencilRefEXT - Application-specified stencil reference value used in stencil tests

`FragStencilRefEXT`

Decorating a variable with the `FragStencilRefEXT` built-in decoration
will make that variable contain the new stencil reference value for all
samples covered by the fragment.
This value will be used as the stencil reference value used in stencil
testing.

To write to `FragStencilRefEXT`, a shader **must** declare the
`StencilRefReplacingEXT` execution mode.
If a shader declares the `StencilRefReplacingEXT` execution mode and
there is an execution path through the shader that does not set
`FragStencilRefEXT`, then the fragment’s stencil reference value is
**undefined** for executions of the shader that take that path.

Only the least significant **s** bits of the integer value of the variable
decorated with `FragStencilRefEXT` are considered for stencil testing,
where **s** is the number of bits in the stencil framebuffer attachment, and
higher order bits are discarded.

See [fragment shader stencil reference replacement](../../../../spec/latest/chapters/fragops.html#fragops-shader-stencilrefreplacement) for more details.

Valid Usage

* 
[](#VUID-FragStencilRefEXT-FragStencilRefEXT-04223) VUID-FragStencilRefEXT-FragStencilRefEXT-04223

The `FragStencilRefEXT` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragStencilRefEXT-FragStencilRefEXT-04224) VUID-FragStencilRefEXT-FragStencilRefEXT-04224

The variable decorated with `FragStencilRefEXT` **must** be declared
using the `Output` `Storage` `Class`

* 
[](#VUID-FragStencilRefEXT-FragStencilRefEXT-04225) VUID-FragStencilRefEXT-FragStencilRefEXT-04225

The variable decorated with `FragStencilRefEXT` **must** be declared as
a scalar integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
