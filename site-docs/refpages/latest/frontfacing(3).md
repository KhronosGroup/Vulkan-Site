# FrontFacing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/FrontFacing.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

FrontFacing - Front face determination of a fragment

`FrontFacing`

Decorating a variable with the `FrontFacing` built-in decoration will
make that variable contain whether the fragment is front or back facing.
This variable is non-zero if the current fragment is considered to be part
of a [front-facing](../../../../spec/latest/chapters/primsrast.html#primsrast-polygons-basic) polygon primitive or of a
non-polygon primitive and is zero if the fragment is considered to be part
of a back-facing polygon primitive.

Valid Usage

* 
[](#VUID-FrontFacing-FrontFacing-04229) VUID-FrontFacing-FrontFacing-04229

The `FrontFacing` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-FrontFacing-FrontFacing-04230) VUID-FrontFacing-FrontFacing-04230

The variable decorated with `FrontFacing` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-FrontFacing-FrontFacing-04231) VUID-FrontFacing-FrontFacing-04231

The variable decorated with `FrontFacing` **must** be declared as a
boolean value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
