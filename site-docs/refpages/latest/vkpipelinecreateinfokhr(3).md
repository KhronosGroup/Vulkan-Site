# VkPipelineCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCreateInfoKHR - Structure specifying a pipeline createinfo chain

The `VkPipelineCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineCreateInfoKHR {
    VkStructureType    sType;
    void*              pNext;
} VkPipelineCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is a pointer to a structure extending this structure.

Valid Usage

* 
[](#VUID-VkPipelineCreateInfoKHR-pNext-09604) VUID-VkPipelineCreateInfoKHR-pNext-09604

    `pNext` **must** be pointer to a valid instance of
    [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html),
[VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html),
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html),
    or [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCreateInfoKHR-sType-sType) VUID-VkPipelineCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CREATE_INFO_KHR](VkStructureType.html)

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html), [VkStructureType](VkStructureType.html), [vkGetPipelineKeyKHR](vkGetPipelineKeyKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
