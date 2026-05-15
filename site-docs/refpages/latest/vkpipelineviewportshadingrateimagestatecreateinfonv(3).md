# VkPipelineViewportShadingRateImageStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportShadingRateImageStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportShadingRateImageStateCreateInfoNV - Structure specifying parameters controlling shading rate image usage

If the `pNext` chain of [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) includes
a `VkPipelineViewportShadingRateImageStateCreateInfoNV` structure, then
that structure includes parameters controlling the shading rate.

The `VkPipelineViewportShadingRateImageStateCreateInfoNV` structure is
defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkPipelineViewportShadingRateImageStateCreateInfoNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkBool32                         shadingRateImageEnable;
    uint32_t                         viewportCount;
    const VkShadingRatePaletteNV*    pShadingRatePalettes;
} VkPipelineViewportShadingRateImageStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shadingRateImageEnable` specifies whether shading rate image and
palettes are used during rasterization.

* 
`viewportCount` specifies the number of per-viewport palettes used
to translate values stored in shading rate images.

* 
`pShadingRatePalettes` is a pointer to an array of
[VkShadingRatePaletteNV](VkShadingRatePaletteNV.html) structures defining the palette for each
viewport.
If the shading rate palette state is dynamic, this member is ignored.

If this structure is not present, `shadingRateImageEnable` is considered
to be [VK_FALSE](VK_FALSE.html), and the shading rate image and palettes are not used.

Valid Usage

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02054) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02054

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `0` or `1`

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02055) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-viewportCount-02055

`viewportCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewports`

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-shadingRateImageEnable-02056) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-shadingRateImageEnable-02056

If `shadingRateImageEnable` is [VK_TRUE](VK_TRUE.html), `viewportCount`
**must** be greater or equal to the `viewportCount` member of
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportShadingRateImageStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_SHADING_RATE_IMAGE_STATE_CREATE_INFO_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), `VkBool32`, [VkShadingRatePaletteNV](VkShadingRatePaletteNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineViewportShadingRateImageStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
