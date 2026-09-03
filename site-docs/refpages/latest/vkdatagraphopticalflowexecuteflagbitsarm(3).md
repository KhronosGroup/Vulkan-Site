# VkDataGraphOpticalFlowExecuteFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphOpticalFlowExecuteFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphOpticalFlowExecuteFlagBitsARM - Bits specifying flags for a optical flow vector calculation

Bits which **can** be set in
[VkDataGraphPipelineOpticalFlowDispatchInfoARM](VkDataGraphPipelineOpticalFlowDispatchInfoARM.html)::`flags`,
controlling optical flow execution, are:

// Provided by VK_ARM_data_graph_optical_flow
typedef enum VkDataGraphOpticalFlowExecuteFlagBitsARM {
    VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_DISABLE_TEMPORAL_HINTS_BIT_ARM = 0x00000001,
    VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_INPUT_UNCHANGED_BIT_ARM = 0x00000002,
    VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_REFERENCE_UNCHANGED_BIT_ARM = 0x00000004,
    VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_INPUT_IS_PREVIOUS_REFERENCE_BIT_ARM = 0x00000008,
    VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_REFERENCE_IS_PREVIOUS_INPUT_BIT_ARM = 0x00000010,
} VkDataGraphOpticalFlowExecuteFlagBitsARM;

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_DISABLE_TEMPORAL_HINTS_BIT_ARM](#)
specifies that temporal hints from previously generated flow vector map
are not used.
If temporal hints are enabled, the optical flow vector map from previous
[vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html) calls in the same graph pipeline session
**may** be automatically used as hints for the current
[vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html) call, to take advantage of temporal
correlation in a video sequence.
Temporal hints should be disabled if there is a-priori knowledge of no
temporal correlation (e.g. a scene change, independent successive image
pairs).

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_INPUT_UNCHANGED_BIT_ARM](#)
specifies that the contents of the input image are the same as in the
previously executed [vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html) call in the same
graph pipeline session.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_REFERENCE_UNCHANGED_BIT_ARM](#)
specifies that the contents of the reference image are the same as in
the previously executed [vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html) call in the same
graph pipeline session.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_INPUT_IS_PREVIOUS_REFERENCE_BIT_ARM](#)
specifies that the contents of the input image are the same as the
contents of the reference image in the previously executed
[vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html) call in the same graph pipeline session.

* 
[VK_DATA_GRAPH_OPTICAL_FLOW_EXECUTE_REFERENCE_IS_PREVIOUS_INPUT_BIT_ARM](#)
specifies that the contents of the reference image are the same as the
contents of the input image in the previously executed
[vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html) call in the same graph pipeline session.

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowExecuteFlagsARM](VkDataGraphOpticalFlowExecuteFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowExecuteFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
