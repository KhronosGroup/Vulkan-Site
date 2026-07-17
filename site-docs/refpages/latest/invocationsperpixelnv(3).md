# InvocationsPerPixelNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/InvocationsPerPixelNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

InvocationsPerPixelNV - Number of fragment shader invocations for the current pixel

`InvocationsPerPixelNV`

Decorating a variable with the `InvocationsPerPixelNV` built-in
decoration will make that variable contain the maximum number of fragment
shader invocations per pixel, as derived from the effective shading rate for
the fragment.
If a primitive does not fully cover a pixel, the number of fragment shader
invocations for that pixel **may** be less than the value of
`InvocationsPerPixelNV`.
If the shading rate indicates a fragment covering multiple pixels, then
`InvocationsPerPixelNV` will be one.

Valid Usage

* 
[](#VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04260) VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04260

The `InvocationsPerPixelNV` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04261) VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04261

The variable decorated with `InvocationsPerPixelNV` **must** be declared
using the `Input` `Storage` `Class`

* 
[](#VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04262) VUID-InvocationsPerPixelNV-InvocationsPerPixelNV-04262

The variable decorated with `InvocationsPerPixelNV` **must** be declared
as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
