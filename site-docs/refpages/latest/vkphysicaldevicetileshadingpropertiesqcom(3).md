# VkPhysicalDeviceTileShadingPropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceTileShadingPropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceTileShadingPropertiesQCOM - Structure describing properties supported by VK_QCOM_tile_shading

The `VkPhysicalDeviceTileShadingPropertiesQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPhysicalDeviceTileShadingPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxApronSize;
    VkBool32           preferNonCoherent;
    VkExtent2D         tileGranularity;
    VkExtent2D         maxTileShadingRate;
} VkPhysicalDeviceTileShadingPropertiesQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxApronSize` is the maximum value
supported which can be specified for
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`apronSize` or
`width` and `height`.

* 
 `preferNonCoherent` indicates that the
implementation prefers tile attachments declared in shaders with the
`NonCoherentTileAttachmentReadQCOM` decoration.
Use of the decoration **may** offer performance or power advantages.

* 
 `tileGranularity` provides a guarantee on
the granularity of each tile.
Each tile will have dimensions that are a multiple of this granularity
in width and height.

* 
 `maxTileShadingRate` is the maximum
value of `TileShadingRateQCOM` and **must** be a power of 2.

If the `VkPhysicalDeviceTileShadingPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTileShadingPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceTileShadingPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_PROPERTIES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), `VkBool32`, [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceTileShadingPropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
