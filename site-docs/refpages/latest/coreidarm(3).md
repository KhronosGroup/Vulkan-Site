# CoreIDARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CoreIDARM.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CoreIDARM - Core ID on which a shader invocation is running

`CoreIDARM`

Decorating a variable with the `CoreIDARM` built-in decoration will make
that variable contain the ID of the core on which the current shader
invocation is running.
This variable is in the range [0, `CoreMaxIDARM`].

Valid Usage

* 
[](#VUID-CoreIDARM-CoreIDARM-07599) VUID-CoreIDARM-CoreIDARM-07599

The variable decorated with `CoreIDARM` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-CoreIDARM-CoreIDARM-07600) VUID-CoreIDARM-CoreIDARM-07600

The variable decorated with `CoreIDARM` **must** be declared as a scalar
32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
