# VkFragmentShadingRateTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFragmentShadingRateTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFragmentShadingRateTypeNV - Enumeration with fragment shading rate types

The [VkFragmentShadingRateTypeNV](#) enumerated type specifies whether a
graphics pipeline gets its pipeline fragment shading rates and combiners
from the [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html) structure
or the [VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html) structure.

// Provided by VK_NV_fragment_shading_rate_enums
typedef enum VkFragmentShadingRateTypeNV {
    VK_FRAGMENT_SHADING_RATE_TYPE_FRAGMENT_SIZE_NV = 0,
    VK_FRAGMENT_SHADING_RATE_TYPE_ENUMS_NV = 1,
} VkFragmentShadingRateTypeNV;

* 
[VK_FRAGMENT_SHADING_RATE_TYPE_FRAGMENT_SIZE_NV](#) specifies that a
graphics pipeline should obtain its pipeline fragment shading rate and
shading rate combiner state from the
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html) structure and that
any state specified by the
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html) structure
should be ignored.

* 
[VK_FRAGMENT_SHADING_RATE_TYPE_ENUMS_NV](#) specifies that a graphics
pipeline should obtain its pipeline fragment shading rate and shading
rate combiner state from the
[VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html) structure and
that any state specified by the
[VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html) structure should
be ignored.

[VK_NV_fragment_shading_rate_enums](VK_NV_fragment_shading_rate_enums.html), [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkFragmentShadingRateTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
