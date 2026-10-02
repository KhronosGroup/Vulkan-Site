# VkSamplerYcbcrConversion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerYcbcrConversion.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerYcbcrConversion - Opaque handle to a device-specific sampler Y′CBCR conversion description

A sampler Y′CBCR conversion is an opaque representation of a
device-specific sampler Y′CBCR conversion description, represented as a
`VkSamplerYcbcrConversion` handle:

// Provided by VK_VERSION_1_1
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSamplerYcbcrConversion)

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrConversion
typedef VkSamplerYcbcrConversion VkSamplerYcbcrConversionKHR;

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html), [vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html), [vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html), [vkDestroySamplerYcbcrConversion](vkDestroySamplerYcbcrConversion.html), [vkDestroySamplerYcbcrConversion](vkDestroySamplerYcbcrConversion.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerYcbcrConversion).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
