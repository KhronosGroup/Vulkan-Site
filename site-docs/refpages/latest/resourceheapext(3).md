# ResourceHeapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/ResourceHeapEXT.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

ResourceHeapEXT - Pointer to the resource heap

`ResourceHeapEXT`

Decorating a variable with the `ResourceHeapEXT` built-in decoration will
back it with the contents of the resource heap bound by
[vkCmdBindResourceHeapEXT](vkCmdBindResourceHeapEXT.html).

Valid Usage

* 
[](#VUID-ResourceHeapEXT-ResourceHeapEXT-11241) VUID-ResourceHeapEXT-ResourceHeapEXT-11241

The variable decorated with `ResourceHeapEXT` **must** be declared using
the `UniformConstant` `Storage` `Class`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#ResourceHeapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
