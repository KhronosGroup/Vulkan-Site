# VkDataGraphOpticalFlowCreateFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphOpticalFlowCreateFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphOpticalFlowCreateFlagBitsARM - Bits specifying flags for newly created optical flow data graph node

Bits which **can** be set in
[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)::`flags`, controlling
optical flow pipeline operations, are:

// Provided by VK_ARM_data_graph_optical_flow
typedef enum VkDataGraphOpticalFlowCreateFlagBitsARM {
    VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_HINT_BIT_ARM = 0x00000001,
    VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_COST_BIT_ARM = 0x00000002,
    VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_RESERVED_30_BIT_ARM = 0x40000000,
} VkDataGraphOpticalFlowCreateFlagBitsARM;

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_HINT_BIT_ARM](#) specifies
that a [VkImageView](VkImageView.html) with external flow vector map will be used as
hints in performing the motion search and **must** be connected to
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_HINT_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html).

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_CREATE_ENABLE_COST_BIT_ARM](#) specifies
that the cost for the forward flow is generated in a [VkImageView](VkImageView.html)
which **must** be connected to
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_COST_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html).
The cost is the confidence level of the flow vector for each grid in the
image.
The cost implies how (in)accurate the flow vector is.
Higher cost value implies the flow vector to be less accurate and
vice-versa.

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowCreateFlagsARM](VkDataGraphOpticalFlowCreateFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowCreateFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
