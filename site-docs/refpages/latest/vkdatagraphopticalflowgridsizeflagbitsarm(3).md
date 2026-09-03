# VkDataGraphOpticalFlowGridSizeFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphOpticalFlowGridSizeFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphOpticalFlowGridSizeFlagBitsARM - Bits specifying grid sizes for optical flow operations

Optical flow vectors are generated block-wise, one vector for each block of
NxN pixels (referred to as grid).
Bits which **can** be set in
[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)::`outputGridSize` and
[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)::`hintGridSize`, or
which are returned in
[VkQueueFamilyDataGraphOpticalFlowPropertiesARM](VkQueueFamilyDataGraphOpticalFlowPropertiesARM.html)::`supportedOutputGridSizes`
and
[VkQueueFamilyDataGraphOpticalFlowPropertiesARM](VkQueueFamilyDataGraphOpticalFlowPropertiesARM.html)::`supportedHintGridSizes`
controlling optical flow grid sizes, are:

// Provided by VK_ARM_data_graph_optical_flow
typedef enum VkDataGraphOpticalFlowGridSizeFlagBitsARM {
    VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_UNKNOWN_ARM = 0,
    VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_1X1_BIT_ARM = 0x00000001,
    VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_2X2_BIT_ARM = 0x00000002,
    VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_4X4_BIT_ARM = 0x00000004,
    VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_8X8_BIT_ARM = 0x00000008,
} VkDataGraphOpticalFlowGridSizeFlagBitsARM;

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_1X1_BIT_ARM](#) specifies that
grid is 1x1 pixel.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_2X2_BIT_ARM](#) specifies that
grid is 2x2 pixel.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_4X4_BIT_ARM](#) specifies that
grid is 4x4 pixel.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_GRID_SIZE_8X8_BIT_ARM](#) specifies that
grid is 8x8 pixel.

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowGridSizeFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
