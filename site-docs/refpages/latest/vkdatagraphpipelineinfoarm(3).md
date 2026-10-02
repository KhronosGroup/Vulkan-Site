# VkDataGraphPipelineInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineInfoARM - Structure describing a data graph pipeline

The `VkDataGraphPipelineInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         dataGraphPipeline;
} VkDataGraphPipelineInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dataGraphPipeline` is a [VkPipeline](VkPipeline.html) handle.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-09803) VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-09803

`dataGraphPipeline` **must** have been created with
[vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineInfoARM-sType-sType) VUID-VkDataGraphPipelineInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineInfoARM-pNext-pNext) VUID-VkDataGraphPipelineInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-parameter) VUID-VkDataGraphPipelineInfoARM-dataGraphPipeline-parameter

 `dataGraphPipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html), [vkGetDataGraphPipelineAvailablePropertiesARM](vkGetDataGraphPipelineAvailablePropertiesARM.html), [vkGetDataGraphPipelinePropertiesARM](vkGetDataGraphPipelinePropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
