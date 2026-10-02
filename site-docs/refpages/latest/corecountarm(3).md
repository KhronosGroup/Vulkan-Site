# CoreCountARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/CoreCountARM.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

CoreCountARM - Number of cores on the device

`CoreCountARM`

Decorating a variable with the `CoreCountARM` built-in decoration will
make that variable contain the number of cores on the device.

Valid Usage

* 
[](#VUID-CoreCountARM-CoreCountARM-07595) VUID-CoreCountARM-CoreCountARM-07595

The variable decorated with `CoreCountARM` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-CoreCountARM-CoreCountARM-07596) VUID-CoreCountARM-CoreCountARM-07596

The variable decorated with `CoreCountARM` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
