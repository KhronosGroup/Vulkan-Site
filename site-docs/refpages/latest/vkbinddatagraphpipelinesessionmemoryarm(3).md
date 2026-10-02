# vkBindDataGraphPipelineSessionMemoryARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkBindDataGraphPipelineSessionMemoryARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkBindDataGraphPipelineSessionMemoryARM - Bind device memory to a data graph pipeline session object

To attach memory to a data graph pipeline session object, call:

// Provided by VK_ARM_data_graph
VkResult vkBindDataGraphPipelineSessionMemoryARM(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindDataGraphPipelineSessionMemoryInfoARM* pBindInfos);

* 
`device` is the logical device that owns the data graph pipeline
session and memory.

* 
`bindInfoCount` is the length of the `pBindInfos` array.

* 
`pBindInfos` is a pointer to an array of
[VkBindDataGraphPipelineSessionMemoryInfoARM](VkBindDataGraphPipelineSessionMemoryInfoARM.html) structures describing
graph pipeline sessions and memory to bind.

Valid Usage (Implicit)

* 
[](#VUID-vkBindDataGraphPipelineSessionMemoryARM-device-parameter) VUID-vkBindDataGraphPipelineSessionMemoryARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkBindDataGraphPipelineSessionMemoryARM-pBindInfos-parameter) VUID-vkBindDataGraphPipelineSessionMemoryARM-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindDataGraphPipelineSessionMemoryInfoARM](VkBindDataGraphPipelineSessionMemoryInfoARM.html) structures

* 
[](#VUID-vkBindDataGraphPipelineSessionMemoryARM-bindInfoCount-arraylength) VUID-vkBindDataGraphPipelineSessionMemoryARM-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

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

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkBindDataGraphPipelineSessionMemoryInfoARM](VkBindDataGraphPipelineSessionMemoryInfoARM.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkBindDataGraphPipelineSessionMemoryARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
