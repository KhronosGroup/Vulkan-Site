# SampleId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SampleId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SampleId - Sample ID within a fragment

`SampleId`

Decorating a variable with the `SampleId` built-in decoration will make
that variable contain the [coverage index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) for the current fragment shader invocation.
`SampleId` ranges from zero to the number of samples in the framebuffer
minus one.
If a fragment shader entry point’s interface includes an input variable
decorated with `SampleId`, [Sample Shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) is
considered enabled with a `minSampleShading` value of 1.0.

Valid Usage

* 
[](#VUID-SampleId-SampleId-04354) VUID-SampleId-SampleId-04354

The `SampleId` decoration **must** be used only within the `Fragment`
`Execution` `Model`

* 
[](#VUID-SampleId-SampleId-04355) VUID-SampleId-SampleId-04355

The variable decorated with `SampleId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-SampleId-SampleId-04356) VUID-SampleId-SampleId-04356

The variable decorated with `SampleId` **must** be declared as a scalar
32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
