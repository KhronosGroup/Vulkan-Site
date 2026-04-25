# VkMultiDrawInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMultiDrawInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMultiDrawInfoEXT - Structure specifying a multi-draw command

The `VkMultiDrawInfoEXT` structure is defined as:

// Provided by VK_EXT_multi_draw
typedef struct VkMultiDrawInfoEXT {
    uint32_t    firstVertex;
    uint32_t    vertexCount;
} VkMultiDrawInfoEXT;

* 
`firstVertex` is the first vertex to draw.

* 
`vertexCount` is the number of vertices to draw.

The members of `VkMultiDrawInfoEXT` have the same meaning as the
`firstVertex` and `vertexCount` parameters in [vkCmdDraw](vkCmdDraw.html).

[VK_EXT_multi_draw](VK_EXT_multi_draw.html), [vkCmdDrawMultiEXT](vkCmdDrawMultiEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkMultiDrawInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
