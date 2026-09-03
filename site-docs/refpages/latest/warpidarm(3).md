# WarpIDARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WarpIDARM.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WarpIDARM - Warp ID within a core of a shader invocation

`WarpIDARM`

Decorating a variable with the `WarpIDARM` built-in decoration will make
that variable contain the ID of the warp on a core on which the current
shader invocation is running.
This variable is in the range [0, `WarpMaxIDARM`].

Valid Usage

* 
[](#VUID-WarpIDARM-WarpIDARM-07603) VUID-WarpIDARM-WarpIDARM-07603

The variable decorated with `WarpIDARM` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-WarpIDARM-WarpIDARM-07604) VUID-WarpIDARM-WarpIDARM-07604

The variable decorated with `WarpIDARM` **must** be declared as a scalar
32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
