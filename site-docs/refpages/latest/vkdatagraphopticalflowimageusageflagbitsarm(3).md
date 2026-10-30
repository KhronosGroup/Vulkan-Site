# VkDataGraphOpticalFlowImageUsageFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphOpticalFlowImageUsageFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphOpticalFlowImageUsageFlagBitsARM - Bits specifying image usage for optical flow operations

Bits which **can** be set in
[VkDataGraphOpticalFlowImageFormatInfoARM](VkDataGraphOpticalFlowImageFormatInfoARM.html)::`usage`, controlling
optical flow usage, are:

// Provided by VK_ARM_data_graph_optical_flow
typedef enum VkDataGraphOpticalFlowImageUsageFlagBitsARM {
    VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_UNKNOWN_ARM = 0,
    VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_INPUT_BIT_ARM = 0x00000001,
    VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_OUTPUT_BIT_ARM = 0x00000002,
    VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_HINT_BIT_ARM = 0x00000004,
    VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_COST_BIT_ARM = 0x00000008,
} VkDataGraphOpticalFlowImageUsageFlagBitsARM;

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_INPUT_BIT_ARM](#) specifies
that the image **can** be used as input or reference image for an optical
flow operation.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_OUTPUT_BIT_ARM](#) specifies
that the image **can** be used as output flow vector map for an optical
flow operation.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_HINT_BIT_ARM](#) specifies that
the image **can** be used as hint flow vector map for an optical flow
operation.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_IMAGE_USAGE_COST_BIT_ARM](#) specifies that
the image **can** be used as output cost map for an optical flow operation.

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowImageUsageFlagsARM](VkDataGraphOpticalFlowImageUsageFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowImageUsageFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
