# vkCreateDescriptorPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDescriptorPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDescriptorPool - Creates a descriptor pool object

To create a descriptor pool object, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateDescriptorPool(
    VkDevice                                    device,
    const VkDescriptorPoolCreateInfo*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorPool*                           pDescriptorPool);

* 
`device` is the logical device that creates the descriptor pool.

* 
`pCreateInfo` is a pointer to a [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)
structure specifying the state of the descriptor pool object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pDescriptorPool` is a pointer to a [VkDescriptorPool](VkDescriptorPool.html) handle in
which the resulting descriptor pool object is returned.

The created descriptor pool is returned in `pDescriptorPool`.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDescriptorPool-device-parameter) VUID-vkCreateDescriptorPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateDescriptorPool-pCreateInfo-parameter) VUID-vkCreateDescriptorPool-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html) structure

* 
[](#VUID-vkCreateDescriptorPool-pAllocator-parameter) VUID-vkCreateDescriptorPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDescriptorPool-pDescriptorPool-parameter) VUID-vkCreateDescriptorPool-pDescriptorPool-parameter

 `pDescriptorPool` **must** be a valid pointer to a [VkDescriptorPool](VkDescriptorPool.html) handle

* 
[](#VUID-vkCreateDescriptorPool-device-queuecount) VUID-vkCreateDescriptorPool-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FRAGMENTATION_EXT](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDescriptorPool](VkDescriptorPool.html), [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCreateDescriptorPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
