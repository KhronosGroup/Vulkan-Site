# VkProvokingVertexModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkProvokingVertexModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkProvokingVertexModeEXT - Specify which vertex in a primitive is the provoking vertex

Possible values of
[VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html)::`provokingVertexMode`
are:

// Provided by VK_EXT_provoking_vertex
typedef enum VkProvokingVertexModeEXT {
    VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT = 0,
    VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT = 1,
} VkProvokingVertexModeEXT;

* 
[VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](#) specifies that the
provoking vertex is the first non-adjacency vertex in the list of
vertices used by a primitive.

* 
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](#) specifies that the
provoking vertex is the last non-adjacency vertex in the list of
vertices used by a primitive.

These modes are described more precisely in
[Primitive Topologies](../../../../spec/latest/chapters/drawing.html#drawing-primitive-topologies).

[VK_EXT_provoking_vertex](VK_EXT_provoking_vertex.html), [VkPipelineRasterizationProvokingVertexStateCreateInfoEXT](VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html), [vkCmdSetProvokingVertexModeEXT](vkCmdSetProvokingVertexModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkProvokingVertexModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
