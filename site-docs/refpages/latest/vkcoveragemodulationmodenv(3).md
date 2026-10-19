# VkCoverageModulationModeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCoverageModulationModeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCoverageModulationModeNV - Specify the coverage modulation mode

Possible values of
[VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html)::`coverageModulationMode`,
specifying which color components are modulated, are:

// Provided by VK_NV_framebuffer_mixed_samples
typedef enum VkCoverageModulationModeNV {
    VK_COVERAGE_MODULATION_MODE_NONE_NV = 0,
    VK_COVERAGE_MODULATION_MODE_RGB_NV = 1,
    VK_COVERAGE_MODULATION_MODE_ALPHA_NV = 2,
    VK_COVERAGE_MODULATION_MODE_RGBA_NV = 3,
} VkCoverageModulationModeNV;

* 
[VK_COVERAGE_MODULATION_MODE_NONE_NV](#) specifies that no components
are multiplied by the modulation factor.

* 
[VK_COVERAGE_MODULATION_MODE_RGB_NV](#) specifies that the red, green,
and blue components are multiplied by the modulation factor.

* 
[VK_COVERAGE_MODULATION_MODE_ALPHA_NV](#) specifies that the alpha
component is multiplied by the modulation factor.

* 
[VK_COVERAGE_MODULATION_MODE_RGBA_NV](#) specifies that all components
are multiplied by the modulation factor.

[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html), [VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html), [vkCmdSetCoverageModulationModeNV](vkCmdSetCoverageModulationModeNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkCoverageModulationModeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
