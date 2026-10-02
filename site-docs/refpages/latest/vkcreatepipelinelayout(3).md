# vkCreatePipelineLayout(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreatePipelineLayout.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreatePipelineLayout - Creates a new pipeline layout object

To create a pipeline layout, call:

// Provided by VK_VERSION_1_0
VkResult vkCreatePipelineLayout(
    VkDevice                                    device,
    const VkPipelineLayoutCreateInfo*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPipelineLayout*                           pPipelineLayout);

* 
`device` is the logical device that creates the pipeline layout.

* 
`pCreateInfo` is a pointer to a [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)
structure specifying the state of the pipeline layout object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pPipelineLayout` is a pointer to a [VkPipelineLayout](VkPipelineLayout.html) handle in
which the resulting pipeline layout object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePipelineLayout-device-parameter) VUID-vkCreatePipelineLayout-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreatePipelineLayout-pCreateInfo-parameter) VUID-vkCreatePipelineLayout-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html) structure

* 
[](#VUID-vkCreatePipelineLayout-pAllocator-parameter) VUID-vkCreatePipelineLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreatePipelineLayout-pPipelineLayout-parameter) VUID-vkCreatePipelineLayout-pPipelineLayout-parameter

 `pPipelineLayout` **must** be a valid pointer to a [VkPipelineLayout](VkPipelineLayout.html) handle

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipelineLayout](VkPipelineLayout.html), [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCreatePipelineLayout).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
