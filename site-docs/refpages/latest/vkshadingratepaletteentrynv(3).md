# VkShadingRatePaletteEntryNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShadingRatePaletteEntryNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShadingRatePaletteEntryNV - Shading rate image palette entry types

The supported shading rate image palette entries are defined by
[VkShadingRatePaletteEntryNV](#):

// Provided by VK_NV_shading_rate_image
typedef enum VkShadingRatePaletteEntryNV {
    VK_SHADING_RATE_PALETTE_ENTRY_NO_INVOCATIONS_NV = 0,
    VK_SHADING_RATE_PALETTE_ENTRY_16_INVOCATIONS_PER_PIXEL_NV = 1,
    VK_SHADING_RATE_PALETTE_ENTRY_8_INVOCATIONS_PER_PIXEL_NV = 2,
    VK_SHADING_RATE_PALETTE_ENTRY_4_INVOCATIONS_PER_PIXEL_NV = 3,
    VK_SHADING_RATE_PALETTE_ENTRY_2_INVOCATIONS_PER_PIXEL_NV = 4,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_PIXEL_NV = 5,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X1_PIXELS_NV = 6,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_1X2_PIXELS_NV = 7,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X2_PIXELS_NV = 8,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X2_PIXELS_NV = 9,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X4_PIXELS_NV = 10,
    VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X4_PIXELS_NV = 11,
} VkShadingRatePaletteEntryNV;

The following table indicates the width and height (in pixels) of each
fragment generated using the indicated shading rate, as well as the maximum
number of fragment shader invocations launched for each fragment.
When processing regions of a primitive that have a shading rate of
[VK_SHADING_RATE_PALETTE_ENTRY_NO_INVOCATIONS_NV](#), no fragments will be
generated in that region.

| Shading Rate | Width | Height | Invocations |
| --- | --- | --- | --- |
| [VK_SHADING_RATE_PALETTE_ENTRY_NO_INVOCATIONS_NV](#) | 0 | 0 | 0 |
| [VK_SHADING_RATE_PALETTE_ENTRY_16_INVOCATIONS_PER_PIXEL_NV](#) | 1 | 1 | 16 |
| [VK_SHADING_RATE_PALETTE_ENTRY_8_INVOCATIONS_PER_PIXEL_NV](#) | 1 | 1 | 8 |
| [VK_SHADING_RATE_PALETTE_ENTRY_4_INVOCATIONS_PER_PIXEL_NV](#) | 1 | 1 | 4 |
| [VK_SHADING_RATE_PALETTE_ENTRY_2_INVOCATIONS_PER_PIXEL_NV](#) | 1 | 1 | 2 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_PIXEL_NV](#) | 1 | 1 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X1_PIXELS_NV](#) | 2 | 1 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_1X2_PIXELS_NV](#) | 1 | 2 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X2_PIXELS_NV](#) | 2 | 2 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X2_PIXELS_NV](#) | 4 | 2 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_2X4_PIXELS_NV](#) | 2 | 4 | 1 |
| [VK_SHADING_RATE_PALETTE_ENTRY_1_INVOCATION_PER_4X4_PIXELS_NV](#) | 4 | 4 | 1 |

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html), [VkShadingRatePaletteNV](VkShadingRatePaletteNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkShadingRatePaletteEntryNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
