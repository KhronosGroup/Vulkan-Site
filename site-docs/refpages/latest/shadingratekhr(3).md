# ShadingRateKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ShadingRateKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ShadingRateKHR - Shading rate of a fragment

`ShadingRateKHR`

Decorating a variable with the `ShadingRateKHR` built-in decoration will
make that variable contain the [fragment shading rate](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate) for the current fragment invocation.

Valid Usage

* 
[](#VUID-ShadingRateKHR-ShadingRateKHR-04490) VUID-ShadingRateKHR-ShadingRateKHR-04490

The `ShadingRateKHR` decoration **must** be used only within the
`Fragment` `Execution` `Model`

* 
[](#VUID-ShadingRateKHR-ShadingRateKHR-04491) VUID-ShadingRateKHR-ShadingRateKHR-04491

The variable decorated with `ShadingRateKHR` **must** be declared using
the `Input` `Storage` `Class`

* 
[](#VUID-ShadingRateKHR-ShadingRateKHR-04492) VUID-ShadingRateKHR-ShadingRateKHR-04492

The variable decorated with `ShadingRateKHR` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
