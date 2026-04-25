# VkCubicFilterWeightsQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCubicFilterWeightsQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCubicFilterWeightsQCOM - Specify cubic weights for texture filtering

Possible values of the
[VkSamplerCubicWeightsCreateInfoQCOM](VkSamplerCubicWeightsCreateInfoQCOM.html)::`cubicWeights`, specifying
cubic weights used in [Texel Cubic Filtering](../../../../spec/latest/chapters/textures.html#textures-texel-cubic-filtering) are:

// Provided by VK_QCOM_filter_cubic_weights
typedef enum VkCubicFilterWeightsQCOM {
    VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM = 0,
    VK_CUBIC_FILTER_WEIGHTS_ZERO_TANGENT_CARDINAL_QCOM = 1,
    VK_CUBIC_FILTER_WEIGHTS_B_SPLINE_QCOM = 2,
    VK_CUBIC_FILTER_WEIGHTS_MITCHELL_NETRAVALI_QCOM = 3,
} VkCubicFilterWeightsQCOM;

* 
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](#) specifies Catmull-Rom
weights.

* 
[VK_CUBIC_FILTER_WEIGHTS_ZERO_TANGENT_CARDINAL_QCOM](#) specifies Zero
Tangent Cardinal weights.

* 
[VK_CUBIC_FILTER_WEIGHTS_B_SPLINE_QCOM](#) specifies B-Spline weights.

* 
[VK_CUBIC_FILTER_WEIGHTS_MITCHELL_NETRAVALI_QCOM](#) specifies
Mitchell-Netravali weights.

[VK_QCOM_filter_cubic_weights](VK_QCOM_filter_cubic_weights.html), [VkBlitImageCubicWeightsInfoQCOM](VkBlitImageCubicWeightsInfoQCOM.html), [VkSamplerCubicWeightsCreateInfoQCOM](VkSamplerCubicWeightsCreateInfoQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkCubicFilterWeightsQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
