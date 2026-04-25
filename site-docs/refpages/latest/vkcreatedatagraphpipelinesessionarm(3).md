# vkCreateDataGraphPipelineSessionARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDataGraphPipelineSessionARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDataGraphPipelineSessionARM - Create a data graph pipeline session

To create a data graph pipeline session, call

// Provided by VK_ARM_data_graph
VkResult vkCreateDataGraphPipelineSessionARM(
    VkDevice                                    device,
    const VkDataGraphPipelineSessionCreateInfoARM* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDataGraphPipelineSessionARM*              pSession);

* 
`device` is the logical device that creates the data graph pipeline
session.

* 
`pCreateInfo` is a pointer to a
[VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html) structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pSession` is a pointer to a [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html)
handle in which the resulting data graph pipeline session object is
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-device-parameter) VUID-vkCreateDataGraphPipelineSessionARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-pCreateInfo-parameter) VUID-vkCreateDataGraphPipelineSessionARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html) structure

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-pAllocator-parameter) VUID-vkCreateDataGraphPipelineSessionARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-pSession-parameter) VUID-vkCreateDataGraphPipelineSessionARM-pSession-parameter

 `pSession` **must** be a valid pointer to a [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) handle

* 
[](#VUID-vkCreateDataGraphPipelineSessionARM-device-queuecount) VUID-vkCreateDataGraphPipelineSessionARM-device-queuecount

 The device **must** have been created with at least `1` queue

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

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html), [VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkCreateDataGraphPipelineSessionARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
