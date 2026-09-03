# VkMultiDrawIndexedInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMultiDrawIndexedInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMultiDrawIndexedInfoEXT - Structure specifying a multi-draw command

The `VkMultiDrawIndexedInfoEXT` structure is defined as:

// Provided by VK_EXT_multi_draw
typedef struct VkMultiDrawIndexedInfoEXT {
    uint32_t    firstIndex;
    uint32_t    indexCount;
    int32_t     vertexOffset;
} VkMultiDrawIndexedInfoEXT;

* 
`firstIndex` is the first index to draw.

* 
`indexCount` is the number of vertices to draw.

* 
`vertexOffset` is the value added to the vertex index before
indexing into the vertex buffer for indexed multidraws.

The `firstIndex`, `indexCount`, and `vertexOffset` members of
`VkMultiDrawIndexedInfoEXT` have the same meaning as the
`firstIndex`, `indexCount`, and `vertexOffset` parameters,
respectively, of [vkCmdDrawIndexed](vkCmdDrawIndexed.html).

[VK_EXT_multi_draw](VK_EXT_multi_draw.html), [vkCmdDrawMultiIndexedEXT](vkCmdDrawMultiIndexedEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkMultiDrawIndexedInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
