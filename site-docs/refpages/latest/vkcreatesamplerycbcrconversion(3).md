# vkCreateSamplerYcbcrConversion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateSamplerYcbcrConversion.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateSamplerYcbcrConversion - Create a new Y′CBCR conversion

To create a [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html), call:

// Provided by VK_VERSION_1_1
VkResult vkCreateSamplerYcbcrConversion(
    VkDevice                                    device,
    const VkSamplerYcbcrConversionCreateInfo*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSamplerYcbcrConversion*                   pYcbcrConversion);

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to vkCreateSamplerYcbcrConversion
VkResult vkCreateSamplerYcbcrConversionKHR(
    VkDevice                                    device,
    const VkSamplerYcbcrConversionCreateInfo*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSamplerYcbcrConversion*                   pYcbcrConversion);

* 
`device` is the logical device that creates the sampler Y′CBCR
conversion.

* 
`pCreateInfo` is a pointer to a
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html) structure specifying the
requested sampler Y′CBCR conversion.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pYcbcrConversion` is a pointer to a [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html)
handle in which the resulting sampler Y′CBCR conversion is returned.

The interpretation of the configured sampler Y′CBCR conversion is described
in more detail in [the description of sampler Y′CBCR conversion](../../../../spec/latest/chapters/textures.html#textures-sampler-YCbCr-conversion) in the [Image Operations](../../../../spec/latest/chapters/textures.html#textures) chapter.

Valid Usage

* 
[](#VUID-vkCreateSamplerYcbcrConversion-None-01648) VUID-vkCreateSamplerYcbcrConversion-None-01648

The [`samplerYcbcrConversion`](../../../../spec/latest/chapters/features.html#features-samplerYcbcrConversion)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSamplerYcbcrConversion-device-parameter) VUID-vkCreateSamplerYcbcrConversion-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateSamplerYcbcrConversion-pCreateInfo-parameter) VUID-vkCreateSamplerYcbcrConversion-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html) structure

* 
[](#VUID-vkCreateSamplerYcbcrConversion-pAllocator-parameter) VUID-vkCreateSamplerYcbcrConversion-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateSamplerYcbcrConversion-pYcbcrConversion-parameter) VUID-vkCreateSamplerYcbcrConversion-pYcbcrConversion-parameter

 `pYcbcrConversion` **must** be a valid pointer to a [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html), [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#vkCreateSamplerYcbcrConversion).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
