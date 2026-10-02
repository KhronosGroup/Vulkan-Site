# VkTileShadingRenderPassFlagBitsQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTileShadingRenderPassFlagBitsQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTileShadingRenderPassFlagBitsQCOM - Bitmask specifying flags for tile shading

Bits which **can** be set in
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags` describing
additional properties of the render pass are:

// Provided by VK_QCOM_tile_shading
typedef enum VkTileShadingRenderPassFlagBitsQCOM {
    VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM = 0x00000001,
    VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM = 0x00000002,
} VkTileShadingRenderPassFlagBitsQCOM;

* 
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](#) specifies that the
render pass has tile shading enabled.

* 
[VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](#) specifies
that the secondary command buffer will be executed within a
[per-tile execution block](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model).

[VK_QCOM_tile_shading](VK_QCOM_tile_shading.html), [VkTileShadingRenderPassFlagsQCOM](VkTileShadingRenderPassFlagsQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkTileShadingRenderPassFlagBitsQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
