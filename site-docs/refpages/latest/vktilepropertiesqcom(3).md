# VkTilePropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTilePropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTilePropertiesQCOM - Structure holding available tile properties

The `VkTilePropertiesQCOM` structure is defined as:

// Provided by VK_QCOM_tile_properties
typedef struct VkTilePropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkExtent3D         tileSize;
    VkExtent2D         apronSize;
    VkOffset2D         origin;
} VkTilePropertiesQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tileSize` is the dimensions of a tile, with width and height
describing the width and height of a tile in pixels, and depth
corresponding to the number of slices the tile spans.

* 
`apronSize` is the dimension of the
[apron](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-aprons).

* 
`origin` is the top-left corner of the first tile in attachment
space.

All tiles will be tightly packed around the first tile, with edges being
multiples of tile width and/or height from the origin.

The `tileSize` is guaranteed to be a multiple of
[`tileGranularity`](../../../../spec/latest/chapters/limits.html#limits-tileGranularity).

Valid Usage (Implicit)

* 
[](#VUID-VkTilePropertiesQCOM-sType-sType) VUID-VkTilePropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_PROPERTIES_QCOM](VkStructureType.html)

* 
[](#VUID-VkTilePropertiesQCOM-pNext-pNext) VUID-VkTilePropertiesQCOM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_QCOM_tile_properties](VK_QCOM_tile_properties.html), [VkExtent2D](VkExtent2D.html), [VkExtent3D](VkExtent3D.html), [VkOffset2D](VkOffset2D.html), [VkStructureType](VkStructureType.html), [vkGetDynamicRenderingTilePropertiesQCOM](vkGetDynamicRenderingTilePropertiesQCOM.html), [vkGetFramebufferTilePropertiesQCOM](vkGetFramebufferTilePropertiesQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkTilePropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
