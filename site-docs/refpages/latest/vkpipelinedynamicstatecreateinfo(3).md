# VkPipelineDynamicStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineDynamicStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineDynamicStateCreateInfo - Structure specifying parameters of a newly created pipeline dynamic state

The `VkPipelineDynamicStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineDynamicStateCreateInfo {
    VkStructureType                      sType;
    const void*                          pNext;
    VkPipelineDynamicStateCreateFlags    flags;
    uint32_t                             dynamicStateCount;
    const VkDynamicState*                pDynamicStates;
} VkPipelineDynamicStateCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`dynamicStateCount` is the number of elements in the
`pDynamicStates` array.

* 
`pDynamicStates` is a pointer to an array of [VkDynamicState](VkDynamicState.html)
values specifying which pieces of pipeline state will use the values
from dynamic state commands rather than from pipeline state creation
information.

Valid Usage

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-01442) VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-01442

Each element of `pDynamicStates` **must** be unique

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-sType-sType) VUID-VkPipelineDynamicStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_DYNAMIC_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-pNext-pNext) VUID-VkPipelineDynamicStateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-flags-zerobitmask) VUID-VkPipelineDynamicStateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-parameter) VUID-VkPipelineDynamicStateCreateInfo-pDynamicStates-parameter

 If `dynamicStateCount` is not `0`, `pDynamicStates` **must** be a valid pointer to an array of `dynamicStateCount` valid [VkDynamicState](VkDynamicState.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDynamicState](VkDynamicState.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkPipelineDynamicStateCreateFlags](VkPipelineDynamicStateCreateFlags.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineDynamicStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
