# VkPerTileEndInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerTileEndInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerTileEndInfoQCOM - Structure specifying per-tile end information

The `VkPerTileEndInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPerTileEndInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
} VkPerTileEndInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkPerTileEndInfoQCOM-sType-sType) VUID-VkPerTileEndInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PER_TILE_END_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkPerTileEndInfoQCOM-pNext-pNext) VUID-VkPerTileEndInfoQCOM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkStructureType](VkStructureType.html), [vkCmdEndPerTileExecutionQCOM](vkCmdEndPerTileExecutionQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkPerTileEndInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
