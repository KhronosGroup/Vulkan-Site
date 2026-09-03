# vkCreateDescriptorSetLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDescriptorSetLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDescriptorSetLayout - Create a new descriptor set layout

To create descriptor set layout objects, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateDescriptorSetLayout(
    VkDevice                                    device,
    const VkDescriptorSetLayoutCreateInfo*      pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorSetLayout*                      pSetLayout);

* 
`device` is the logical device that creates the descriptor set
layout.

* 
`pCreateInfo` is a pointer to a
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) structure specifying the state of
the descriptor set layout object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pSetLayout` is a pointer to a [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle in
which the resulting descriptor set layout object is returned.

Valid Usage

* 
[](#VUID-vkCreateDescriptorSetLayout-support-09582) VUID-vkCreateDescriptorSetLayout-support-09582

If the descriptor layout exceeds the limits reported through the
[physical device limits](../../../../spec/latest/chapters/limits.html#limits), then
[vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html) **must** have returned
[VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html) with `support` equal to
[VK_TRUE](VK_TRUE.html) for `pCreateInfo`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDescriptorSetLayout-device-parameter) VUID-vkCreateDescriptorSetLayout-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateDescriptorSetLayout-pCreateInfo-parameter) VUID-vkCreateDescriptorSetLayout-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html) structure

* 
[](#VUID-vkCreateDescriptorSetLayout-pAllocator-parameter) VUID-vkCreateDescriptorSetLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDescriptorSetLayout-pSetLayout-parameter) VUID-vkCreateDescriptorSetLayout-pSetLayout-parameter

 `pSetLayout` **must** be a valid pointer to a [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handle

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCreateDescriptorSetLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
