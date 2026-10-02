# vkDestroySamplerYcbcrConversion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroySamplerYcbcrConversion.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroySamplerYcbcrConversion - Destroy a created Y′CBCR conversion

To destroy a sampler Y′CBCR conversion, call:

// Provided by VK_VERSION_1_1
void vkDestroySamplerYcbcrConversion(
    VkDevice                                    device,
    VkSamplerYcbcrConversion                    ycbcrConversion,
    const VkAllocationCallbacks*                pAllocator);

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to vkDestroySamplerYcbcrConversion
void vkDestroySamplerYcbcrConversionKHR(
    VkDevice                                    device,
    VkSamplerYcbcrConversion                    ycbcrConversion,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the Y′CBCR conversion.

* 
`ycbcrConversion` is the conversion to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySamplerYcbcrConversion-device-parameter) VUID-vkDestroySamplerYcbcrConversion-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parameter) VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parameter

 If `ycbcrConversion` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `ycbcrConversion` **must** be a valid [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html) handle

* 
[](#VUID-vkDestroySamplerYcbcrConversion-pAllocator-parameter) VUID-vkDestroySamplerYcbcrConversion-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parent) VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parent

 If `ycbcrConversion` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `ycbcrConversion` **must** be externally synchronized

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#vkDestroySamplerYcbcrConversion).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
