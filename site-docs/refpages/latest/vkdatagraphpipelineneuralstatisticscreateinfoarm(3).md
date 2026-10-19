# VkDataGraphPipelineNeuralStatisticsCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineNeuralStatisticsCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineNeuralStatisticsCreateInfoARM - Structure specifying neural statistics parameters of a newly created graph pipeline

The `VkDataGraphPipelineNeuralStatisticsCreateInfoARM` structure is
defined as:

// Provided by VK_ARM_data_graph_neural_accelerator_statistics
typedef struct VkDataGraphPipelineNeuralStatisticsCreateInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           allowNeuralStatistics;
} VkDataGraphPipelineNeuralStatisticsCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allowNeuralStatistics` specifies whether sessions for the newly
created pipeline **may** enable neural statistics reporting.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineNeuralStatisticsCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineNeuralStatisticsCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_NEURAL_STATISTICS_CREATE_INFO_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

[VK_ARM_data_graph_neural_accelerator_statistics](VK_ARM_data_graph_neural_accelerator_statistics.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineNeuralStatisticsCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
