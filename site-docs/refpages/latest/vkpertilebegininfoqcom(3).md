# VkPerTileBeginInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPerTileBeginInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPerTileBeginInfoQCOM - Structure specifying per-tile begin information

The `VkPerTileBeginInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPerTileBeginInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
} VkPerTileBeginInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkPerTileBeginInfoQCOM-sType-sType) VUID-VkPerTileBeginInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PER_TILE_BEGIN_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkPerTileBeginInfoQCOM-pNext-pNext) VUID-VkPerTileBeginInfoQCOM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkStructureType](VkStructureType.html), [vkCmdBeginPerTileExecutionQCOM](vkCmdBeginPerTileExecutionQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkPerTileBeginInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
