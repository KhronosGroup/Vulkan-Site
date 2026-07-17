# WarpMaxIDARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WarpMaxIDARM.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WarpMaxIDARM - Max ID for a warp on the core running a shader invocation

`WarpMaxIDARM`

Decorating a variable with the `WarpMaxIDARM` built-in decoration will
make that variable contain the maximum warp ID for the core on which the
current invocation is running.

Valid Usage

* 
[](#VUID-WarpMaxIDARM-WarpMaxIDARM-07601) VUID-WarpMaxIDARM-WarpMaxIDARM-07601

The variable decorated with `WarpMaxIDARM` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-WarpMaxIDARM-WarpMaxIDARM-07602) VUID-WarpMaxIDARM-WarpMaxIDARM-07602

The variable decorated with `WarpMaxIDARM` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
