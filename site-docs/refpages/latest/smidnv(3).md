# SMIDNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SMIDNV.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SMIDNV - SM ID on which a shader invocation is running

`SMIDNV`

Decorating a variable with the `SMIDNV` built-in decoration will make
that variable contain the ID of the SM on which the current shader
invocation is running.
This variable is in the range [0, `SMCountNV`-1].

Valid Usage

* 
[](#VUID-SMIDNV-SMIDNV-04365) VUID-SMIDNV-SMIDNV-04365

The variable decorated with `SMIDNV` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-SMIDNV-SMIDNV-04366) VUID-SMIDNV-SMIDNV-04366

The variable decorated with `SMIDNV` **must** be declared as a scalar
32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
