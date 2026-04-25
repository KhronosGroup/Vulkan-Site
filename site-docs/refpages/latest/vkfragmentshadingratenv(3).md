# VkFragmentShadingRateNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFragmentShadingRateNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFragmentShadingRateNV - Enumeration with fragment shading rates

If the [`fragmentShadingRateEnums`](../../../../spec/latest/chapters/features.html#features-fragmentShadingRateEnums)
feature is enabled, fragment shading rates may be specified using the
[VkFragmentShadingRateNV](#) enumerated type defined as:

// Provided by VK_NV_fragment_shading_rate_enums
typedef enum VkFragmentShadingRateNV {
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV = 0,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_1X2_PIXELS_NV = 1,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X1_PIXELS_NV = 4,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X2_PIXELS_NV = 5,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X4_PIXELS_NV = 6,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X2_PIXELS_NV = 9,
    VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X4_PIXELS_NV = 10,
    VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV = 11,
    VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV = 12,
    VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV = 13,
    VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV = 14,
    VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV = 15,
} VkFragmentShadingRateNV;

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_PIXEL_NV](#) specifies a
fragment size of 1x1 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_1X2_PIXELS_NV](#) specifies
a fragment size of 1x2 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X1_PIXELS_NV](#) specifies
a fragment size of 2x1 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X2_PIXELS_NV](#) specifies
a fragment size of 2x2 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_2X4_PIXELS_NV](#) specifies
a fragment size of 2x4 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X2_PIXELS_NV](#) specifies
a fragment size of 4x2 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_1_INVOCATION_PER_4X4_PIXELS_NV](#) specifies
a fragment size of 4x4 pixels.

* 
[VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV](#) specifies a
fragment size of 1x1 pixels, with two fragment shader invocations per
fragment.

* 
[VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV](#) specifies a
fragment size of 1x1 pixels, with four fragment shader invocations per
fragment.

* 
[VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV](#) specifies a
fragment size of 1x1 pixels, with eight fragment shader invocations per
fragment.

* 
[VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV](#) specifies a
fragment size of 1x1 pixels, with sixteen fragment shader invocations
per fragment.

* 
[VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#) specifies that any
portions of a primitive that use that shading rate should be discarded
without invoking any fragment shader.

To use the shading rates
[VK_FRAGMENT_SHADING_RATE_2_INVOCATIONS_PER_PIXEL_NV](#),
[VK_FRAGMENT_SHADING_RATE_4_INVOCATIONS_PER_PIXEL_NV](#),
[VK_FRAGMENT_SHADING_RATE_8_INVOCATIONS_PER_PIXEL_NV](#), and
[VK_FRAGMENT_SHADING_RATE_16_INVOCATIONS_PER_PIXEL_NV](#) as a pipeline,
primitive, or attachment shading rate, the
[`supersampleFragmentShadingRates`](../../../../spec/latest/chapters/features.html#features-supersampleFragmentShadingRates) feature **must** be enabled.
To use the shading rate [VK_FRAGMENT_SHADING_RATE_NO_INVOCATIONS_NV](#) as
a pipeline, primitive, or attachment shading rate, the
[`noInvocationFragmentShadingRates`](../../../../spec/latest/chapters/features.html#features-noInvocationFragmentShadingRates) feature **must** be enabled.

[VK_NV_fragment_shading_rate_enums](VK_NV_fragment_shading_rate_enums.html), [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html), [vkCmdSetFragmentShadingRateEnumNV](vkCmdSetFragmentShadingRateEnumNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkFragmentShadingRateNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
