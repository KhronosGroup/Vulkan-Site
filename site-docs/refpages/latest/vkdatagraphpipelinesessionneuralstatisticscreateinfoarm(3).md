# VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM - Structure specifying neural statistics parameters of a newly created data graph pipeline session

// Provided by VK_ARM_data_graph_neural_accelerator_statistics
typedef struct VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM {
    VkStructureType                         sType;
    const void*                             pNext;
    VkNeuralAcceleratorStatisticsModeARM    mode;
} VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mode` is a [VkNeuralAcceleratorStatisticsModeARM](VkNeuralAcceleratorStatisticsModeARM.html) specifying
the neural statistics mode for the session being created.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_NEURAL_STATISTICS_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM-mode-parameter) VUID-VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM-mode-parameter

 `mode` **must** be a valid [VkNeuralAcceleratorStatisticsModeARM](VkNeuralAcceleratorStatisticsModeARM.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html)

[VK_ARM_data_graph_neural_accelerator_statistics](VK_ARM_data_graph_neural_accelerator_statistics.html), [VkNeuralAcceleratorStatisticsModeARM](VkNeuralAcceleratorStatisticsModeARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
