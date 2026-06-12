# VkNeuralAcceleratorStatisticsModeARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkNeuralAcceleratorStatisticsModeARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkNeuralAcceleratorStatisticsModeARM - Enum specifying the mode of operation for neural accelerator statistics

The available values for [VkNeuralAcceleratorStatisticsModeARM](#) are:

// Provided by VK_ARM_data_graph_neural_accelerator_statistics
typedef enum VkNeuralAcceleratorStatisticsModeARM {
    VK_NEURAL_ACCELERATOR_STATISTICS_MODE_DISABLED_ARM = 0,
    VK_NEURAL_ACCELERATOR_STATISTICS_MODE_STATISTICS0_ARM = 1,
    VK_NEURAL_ACCELERATOR_STATISTICS_MODE_STATISTICS1_ARM = 2,
} VkNeuralAcceleratorStatisticsModeARM;

* 
[VK_NEURAL_ACCELERATOR_STATISTICS_MODE_DISABLED_ARM](#) specifies that
neural accelerator statistics are disabled.

* 
[VK_NEURAL_ACCELERATOR_STATISTICS_MODE_STATISTICS0_ARM](#) specifies
the `statistics0` mode of operation.

* 
[VK_NEURAL_ACCELERATOR_STATISTICS_MODE_STATISTICS1_ARM](#) specifies
the `statistics1` mode of operation.

[VK_ARM_data_graph_neural_accelerator_statistics](VK_ARM_data_graph_neural_accelerator_statistics.html), [VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM](VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkNeuralAcceleratorStatisticsModeARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
