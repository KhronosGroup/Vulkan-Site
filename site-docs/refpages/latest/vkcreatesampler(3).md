# vkCreateSampler(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateSampler.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateSampler - Create a new sampler object

To create a sampler object, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateSampler(
    VkDevice                                    device,
    const VkSamplerCreateInfo*                  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSampler*                                  pSampler);

* 
`device` is the logical device that creates the sampler.

* 
`pCreateInfo` is a pointer to a [VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure
specifying the state of the sampler object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pSampler` is a pointer to a [VkSampler](VkSampler.html) handle in which the
resulting sampler object is returned.

Valid Usage

* 
[](#VUID-vkCreateSampler-device-09668) VUID-vkCreateSampler-device-09668

`device` **must** support at least one queue family with one of the
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) capabilities

* 
[](#VUID-vkCreateSampler-maxSamplerAllocationCount-04110) VUID-vkCreateSampler-maxSamplerAllocationCount-04110

There **must** be less than
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxSamplerAllocationCount`
[VkSampler](VkSampler.html) objects currently created on the device

* 
[](#VUID-vkCreateSampler-maxSamplerAllocationCount-11412) VUID-vkCreateSampler-maxSamplerAllocationCount-11412

    If there are any pipelines
or shaders
    with embedded samplers currently created on the device, there **must** be
    less than
    ([`maxSamplerAllocationCount`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerAllocationCount)
    -  ([    `minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
    [`samplerDescriptorSize`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorSize)))
    [VkSampler](VkSampler.html) objects currently created on the device

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSampler-device-parameter) VUID-vkCreateSampler-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateSampler-pCreateInfo-parameter) VUID-vkCreateSampler-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure

* 
[](#VUID-vkCreateSampler-pAllocator-parameter) VUID-vkCreateSampler-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateSampler-pSampler-parameter) VUID-vkCreateSampler-pSampler-parameter

 `pSampler` **must** be a valid pointer to a [VkSampler](VkSampler.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkSampler](VkSampler.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#vkCreateSampler).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
