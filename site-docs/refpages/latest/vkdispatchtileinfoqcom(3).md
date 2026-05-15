# VkDispatchTileInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDispatchTileInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDispatchTileInfoQCOM - Structure specifying dispatch tile info

The `VkDispatchTileInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkDispatchTileInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
} VkDispatchTileInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkDispatchTileInfoQCOM-sType-sType) VUID-VkDispatchTileInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPATCH_TILE_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkDispatchTileInfoQCOM-pNext-pNext) VUID-VkDispatchTileInfoQCOM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkStructureType](VkStructureType.html), [vkCmdDispatchTileQCOM](vkCmdDispatchTileQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#VkDispatchTileInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
