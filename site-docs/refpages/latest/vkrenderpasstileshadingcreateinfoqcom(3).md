# VkRenderPassTileShadingCreateInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassTileShadingCreateInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassTileShadingCreateInfoQCOM - Structure specifying, tile shading information for a render pass object.

To enable tile shading for a render pass object, add a
[VkRenderPassTileShadingCreateInfoQCOM](#) to the `pNext` chain of
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)
or [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)
.
To enable tile shading for a dynamic render pass, add a
[VkRenderPassTileShadingCreateInfoQCOM](#) to the `pNext` chain of
[VkRenderingInfo](VkRenderingInfo.html).
To execute a secondary command buffer within a render pass, add a
[VkRenderPassTileShadingCreateInfoQCOM](#) to the `pNext` chain of
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) when the secondary command buffer is
recorded.

The `VkRenderPassTileShadingCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkRenderPassTileShadingCreateInfoQCOM {
    VkStructureType                     sType;
    const void*                         pNext;
    VkTileShadingRenderPassFlagsQCOM    flags;
    VkExtent2D                          tileApronSize;
} VkRenderPassTileShadingCreateInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkTileShadingRenderPassFlagBitsQCOM](VkTileShadingRenderPassFlagBitsQCOM.html).

* 
`tileApronSize` is a [VkExtent2D](VkExtent2D.html) describing the is size of the
[tiling apron](../../../../spec/latest/chapters/renderpass.html#renderpass-tile-shading-aprons) in each dimension.

If this structure is not present, the render pass will have `flags` set
to `0` and `tileApronSize` is set to `(0,0)`.

Valid Usage

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShading-10658) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShading-10658

If the [`tileShading`](../../../../spec/latest/chapters/features.html#features-tileShading) feature is not
enabled, [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be
included in `flags`

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10659) VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10659

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) is not included in
`flags` or the [`tileShadingApron`](../../../../spec/latest/chapters/features.html#features-tileShadingApron)
feature is not enabled, `tileApronSize` **must** be `(0,0)`

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10660) VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-10660

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) is not included in
`flags`, or neither the
[tileShadingPerTileDispatch](../../../../spec/latest/chapters/features.html#features-tileShadingPerTileDispatch) and
[tileShadingPerTileDraw](../../../../spec/latest/chapters/features.html#features-tileShadingPerTileDraw) features are
enabled, `flags` **must** not include
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShadingAnisotropicApron-10661) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileShadingAnisotropicApron-10661

If the [    `tileShadingAnisotropicApron`](../../../../spec/latest/chapters/features.html#features-tileShadingAnisotropicApron) feature is not enabled,
`tileApronSize.x` and **must** be equal to `tileApronSize.y`

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10662) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10662

`tileApronSize.x` **must** be less than or equal to
[`maxApronSize`](../../../../spec/latest/chapters/limits.html#limits-maxApronSize)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10663) VUID-VkRenderPassTileShadingCreateInfoQCOM-tileApronSize-10663

`tileApronSize.y` **must** be less than or equal to
[`maxApronSize`](../../../../spec/latest/chapters/limits.html#limits-maxApronSize)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-sType-sType) VUID-VkRenderPassTileShadingCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_TILE_SHADING_CREATE_INFO_QCOM](VkStructureType.html)

* 
[](#VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-parameter) VUID-VkRenderPassTileShadingCreateInfoQCOM-flags-parameter

 `flags` **must** be a valid combination of [VkTileShadingRenderPassFlagBitsQCOM](VkTileShadingRenderPassFlagBitsQCOM.html) values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)

* 
[VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html), [VkTileShadingRenderPassFlagsQCOM](VkTileShadingRenderPassFlagsQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassTileShadingCreateInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
