# FragmentSizeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FragmentSizeNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FragmentSizeNV - Size of the screen-space area covered by the fragment

`FragmentSizeNV`

Decorating a variable with the `FragmentSizeNV` built-in decoration will
make that variable contain the width and height of the fragment.

Valid Usage

* 
[](#VUID-FragmentSizeNV-FragmentSizeNV-04226) VUID-FragmentSizeNV-FragmentSizeNV-04226

The `FragmentSizeNV` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FragmentSizeNV-FragmentSizeNV-04227) VUID-FragmentSizeNV-FragmentSizeNV-04227

The variable decorated with `FragmentSizeNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-FragmentSizeNV-FragmentSizeNV-04228) VUID-FragmentSizeNV-FragmentSizeNV-04228

The variable decorated with `FragmentSizeNV` **must** be declared as a
two-component vector of 32-bit integer values

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
