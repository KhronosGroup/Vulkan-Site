# VkConservativeRasterizationModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkConservativeRasterizationModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkConservativeRasterizationModeEXT - Specify the conservative rasterization mode

Possible values of
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html)::`conservativeRasterizationMode`,
specifying the conservative rasterization mode are:

// Provided by VK_EXT_conservative_rasterization
typedef enum VkConservativeRasterizationModeEXT {
    VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT = 0,
    VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT = 1,
    VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT = 2,
} VkConservativeRasterizationModeEXT;

* 
[VK_CONSERVATIVE_RASTERIZATION_MODE_DISABLED_EXT](#) specifies that
conservative rasterization is disabled and rasterization proceeds as
normal.

* 
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](#) specifies that
conservative rasterization is enabled in overestimation mode.

* 
[VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](#) specifies
that conservative rasterization is enabled in underestimation mode.

[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html), [VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html), [vkCmdSetConservativeRasterizationModeEXT](vkCmdSetConservativeRasterizationModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkConservativeRasterizationModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
