# VkFragmentShadingRateCombinerOpKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFragmentShadingRateCombinerOpKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFragmentShadingRateCombinerOpKHR - Control how fragment shading rates are combined

The equation used for each combiner operation is defined by
[VkFragmentShadingRateCombinerOpKHR](#):

// Provided by VK_KHR_fragment_shading_rate
typedef enum VkFragmentShadingRateCombinerOpKHR {
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR = 0,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR = 1,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MIN_KHR = 2,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MAX_KHR = 3,
    VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR = 4,
} VkFragmentShadingRateCombinerOpKHR;

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](#) specifies a combiner
operation of combine(Axy,Bxy) = Axy.

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](#) specifies a
combiner operation of combine(Axy,Bxy) = Bxy.

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MIN_KHR](#) specifies a combiner
operation of combine(Axy,Bxy) = min(Axy,Bxy).

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MAX_KHR](#) specifies a combiner
operation of combine(Axy,Bxy) = max(Axy,Bxy).

* 
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](#) specifies a combiner
operation of combine(Axy,Bxy) = Axy*Bxy.

where combine(Axy,Bxy) is the combine operation, and Axy
and Bxy are the inputs to the operation.

If [`fragmentShadingRateStrictMultiplyCombiner`](../../../../spec/latest/chapters/limits.html#limits-fragmentShadingRateStrictMultiplyCombiner) is [VK_FALSE](VK_FALSE.html), using
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](#) with values of 1 for both
A and B in the same dimension results in the value 2 being produced for that
dimension.
See the definition of [`fragmentShadingRateStrictMultiplyCombiner`](../../../../spec/latest/chapters/limits.html#limits-fragmentShadingRateStrictMultiplyCombiner) for more information.

These operations are performed in a component-wise fashion.

[VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html), [VkPipelineFragmentShadingRateEnumStateCreateInfoNV](VkPipelineFragmentShadingRateEnumStateCreateInfoNV.html), [VkPipelineFragmentShadingRateStateCreateInfoKHR](VkPipelineFragmentShadingRateStateCreateInfoKHR.html), [vkCmdSetFragmentShadingRateEnumNV](vkCmdSetFragmentShadingRateEnumNV.html), [vkCmdSetFragmentShadingRateKHR](vkCmdSetFragmentShadingRateKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkFragmentShadingRateCombinerOpKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
