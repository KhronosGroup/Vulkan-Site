# VkDataGraphPipelineNodeTypeARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineNodeTypeARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineNodeTypeARM - Enumeration describing the type of a data graph pipeline node

Possible values of [VkDataGraphPipelineNodeTypeARM](#), specifying the type
of a data graph pipeline node, are:

// Provided by VK_ARM_data_graph_optical_flow
typedef enum VkDataGraphPipelineNodeTypeARM {
  // Provided by VK_ARM_data_graph_optical_flow
    VK_DATA_GRAPH_PIPELINE_NODE_TYPE_OPTICAL_FLOW_ARM = 1000631000,
} VkDataGraphPipelineNodeTypeARM;

* 
[VK_DATA_GRAPH_PIPELINE_NODE_TYPE_OPTICAL_FLOW_ARM](#) corresponds to
an [optical flow node](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-operations-opticalflow).

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphPipelineSingleNodeCreateInfoARM](VkDataGraphPipelineSingleNodeCreateInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineNodeTypeARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
