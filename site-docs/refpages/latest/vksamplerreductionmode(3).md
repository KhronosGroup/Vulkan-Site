# VkSamplerReductionMode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerReductionMode.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerReductionMode - Specify reduction mode for texture filtering

Reduction modes are specified by [VkSamplerReductionMode](#), which takes
values:

// Provided by VK_VERSION_1_2
typedef enum VkSamplerReductionMode {
    VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE = 0,
    VK_SAMPLER_REDUCTION_MODE_MIN = 1,
    VK_SAMPLER_REDUCTION_MODE_MAX = 2,
  // Provided by VK_QCOM_filter_cubic_clamp
    VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM = 1000521000,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_EXT = VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_SAMPLER_REDUCTION_MODE_MIN_EXT = VK_SAMPLER_REDUCTION_MODE_MIN,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_SAMPLER_REDUCTION_MODE_MAX_EXT = VK_SAMPLER_REDUCTION_MODE_MAX,
} VkSamplerReductionMode;

// Provided by VK_EXT_sampler_filter_minmax
// Equivalent to VkSamplerReductionMode
typedef VkSamplerReductionMode VkSamplerReductionModeEXT;

* 
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#) specifies that texel
values are combined by computing a weighted average of values in the
footprint, using weights as specified in
[the image operations chapter](../../../../spec/latest/chapters/textures.html#textures-unnormalized-to-integer).

* 
[VK_SAMPLER_REDUCTION_MODE_MIN](#) specifies that texel values are
combined by taking the component-wise minimum of values in the footprint
with non-zero weights.

* 
[VK_SAMPLER_REDUCTION_MODE_MAX](#) specifies that texel values are
combined by taking the component-wise maximum of values in the footprint
with non-zero weights.

* 
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](#)
specifies values are combined as described by
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#), followed by a
[texel range clamp](../../../../spec/latest/chapters/textures.html#textures-texel-range-clamp).

[VK_EXT_sampler_filter_minmax](VK_EXT_sampler_filter_minmax.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerReductionMode).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
