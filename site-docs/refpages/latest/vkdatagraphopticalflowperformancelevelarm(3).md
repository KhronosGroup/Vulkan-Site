# VkDataGraphOpticalFlowPerformanceLevelARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphOpticalFlowPerformanceLevelARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphOpticalFlowPerformanceLevelARM - Optical flow performance level types

Optical flow exposes performance levels which the user can choose based on
the desired performance and quality requirement.
The optical flow performance level types are defined with the following:

// Provided by VK_ARM_data_graph_optical_flow
typedef enum VkDataGraphOpticalFlowPerformanceLevelARM {
    VK_DATA_GRAPH_OPTICAL_FLOW_PERFORMANCE_LEVEL_UNKNOWN_ARM = 0,
    VK_DATA_GRAPH_OPTICAL_FLOW_PERFORMANCE_LEVEL_SLOW_ARM = 1,
    VK_DATA_GRAPH_OPTICAL_FLOW_PERFORMANCE_LEVEL_MEDIUM_ARM = 2,
    VK_DATA_GRAPH_OPTICAL_FLOW_PERFORMANCE_LEVEL_FAST_ARM = 3,
} VkDataGraphOpticalFlowPerformanceLevelARM;

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_PERFORMANCE_LEVEL_SLOW_ARM](#) is a level
with slower performance but higher quality.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_PERFORMANCE_LEVEL_MEDIUM_ARM](#) is a level
with medium performance and medium quality.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_PERFORMANCE_LEVEL_FAST_ARM](#) is a preset
with higher performance but lower quality.

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowPerformanceLevelARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
