# VkDataGraphPipelineNodeConnectionTypeARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineNodeConnectionTypeARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineNodeConnectionTypeARM - Connection points for a fixed-function data graph node

Possible values of [VkDataGraphPipelineNodeConnectionTypeARM](#),
specifying the connection points of a data graph pipeline node, are:

// Provided by VK_ARM_data_graph_optical_flow
typedef enum VkDataGraphPipelineNodeConnectionTypeARM {
  // Provided by VK_ARM_data_graph_optical_flow
    VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_INPUT_ARM = 1000631000,
  // Provided by VK_ARM_data_graph_optical_flow
    VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_REFERENCE_ARM = 1000631001,
  // Provided by VK_ARM_data_graph_optical_flow
    VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_HINT_ARM = 1000631002,
  // Provided by VK_ARM_data_graph_optical_flow
    VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_FLOW_VECTOR_ARM = 1000631003,
  // Provided by VK_ARM_data_graph_optical_flow
    VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_COST_ARM = 1000631004,
} VkDataGraphPipelineNodeConnectionTypeARM;

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_INPUT_ARM](#)
specifies the connection point for the input image of an optical flow
node.

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_REFERENCE_ARM](#)
specifies the connection point for the input reference image of an
optical flow node.

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_HINT_ARM](#)
specifies the connection point for the optional external hint flow
vector map of an optical flow node.

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_FLOW_VECTOR_ARM](#)
specifies the connection point for the output flow vector map of an
optical flow node.

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_COST_ARM](#)
specifies the connection point for the optional output cost map of an
optical flow node.

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphPipelineSingleNodeConnectionARM](VkDataGraphPipelineSingleNodeConnectionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineNodeConnectionTypeARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
