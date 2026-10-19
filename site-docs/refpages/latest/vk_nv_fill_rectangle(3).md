# VK_NV_fill_rectangle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_fill_rectangle.html

## Table of Contents

- [Name](#_name)
- [VK_NV_fill_rectangle](#VK_NV_fill_rectangle)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_fill_rectangle - device extension

**Name String**

`VK_NV_fill_rectangle`

**Extension Type**

Device extension

**Registered Extension Number**

154

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_fill_rectangle] @jeffbolznv%0A*Here describe the issue or question you have about the VK_NV_fill_rectangle extension*)

**Last Modified Date**

2017-05-22

**Contributors**

* 
Jeff Bolz, NVIDIA

This extension adds a new [VkPolygonMode](VkPolygonMode.html) `enum` where a triangle is
rasterized by computing and filling its axis-aligned screen-space bounding
box, disregarding the actual triangle edges.
This can be useful for drawing a rectangle without being split into two
triangles with an internal edge.
It is also useful to minimize the number of primitives that need to be
drawn, particularly for a user interface.

* 
`VK_NV_FILL_RECTANGLE_EXTENSION_NAME`

* 
`VK_NV_FILL_RECTANGLE_SPEC_VERSION`

* 
Extending [VkPolygonMode](VkPolygonMode.html):

[VK_POLYGON_MODE_FILL_RECTANGLE_NV](VkPolygonMode.html)

* 
Revision 1, 2017-05-22 (Jeff Bolz)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_fill_rectangle).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
