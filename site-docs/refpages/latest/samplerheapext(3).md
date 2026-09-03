# SamplerHeapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/SamplerHeapEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

SamplerHeapEXT - Pointer to the sampler heap

`SamplerHeapEXT`

Decorating a variable with the `SamplerHeapEXT` built-in decoration will
back it with the contents of the sampler heap bound by
[vkCmdBindSamplerHeapEXT](vkCmdBindSamplerHeapEXT.html).

Valid Usage

* 
[](#VUID-SamplerHeapEXT-SamplerHeapEXT-11239) VUID-SamplerHeapEXT-SamplerHeapEXT-11239

The variable decorated with `SamplerHeapEXT` **must** be declared using
the `UniformConstant` `Storage` `Class`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#SamplerHeapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
