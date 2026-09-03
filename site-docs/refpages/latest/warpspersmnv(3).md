# WarpsPerSMNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/WarpsPerSMNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

WarpsPerSMNV - Number of warps per SM

`WarpsPerSMNV`

Decorating a variable with the `WarpsPerSMNV` built-in decoration will
make that variable contain the maximum number of warps executing on a SM.

Valid Usage

* 
[](#VUID-WarpsPerSMNV-WarpsPerSMNV-04418) VUID-WarpsPerSMNV-WarpsPerSMNV-04418

The variable decorated with `WarpsPerSMNV` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-WarpsPerSMNV-WarpsPerSMNV-04419) VUID-WarpsPerSMNV-WarpsPerSMNV-04419

The variable decorated with `WarpsPerSMNV` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
