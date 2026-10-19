# CoreMaxIDARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CoreMaxIDARM.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CoreMaxIDARM - Max core ID that can be observed on the device running the invocation reading CoreMaxIDARM

`CoreMaxIDARM`

Decorating a variable with the `CoreMaxIDARM` built-in decoration will
make that variable contain the max ID of any shader core on the device on
which the current shader invocation is running.

Valid Usage

* 
[](#VUID-CoreMaxIDARM-CoreMaxIDARM-07597) VUID-CoreMaxIDARM-CoreMaxIDARM-07597

The variable decorated with `CoreMaxIDARM` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-CoreMaxIDARM-CoreMaxIDARM-07598) VUID-CoreMaxIDARM-CoreMaxIDARM-07598

The variable decorated with `CoreMaxIDARM` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
