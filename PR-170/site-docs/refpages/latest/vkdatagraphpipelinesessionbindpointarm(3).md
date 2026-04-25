# VkDataGraphPipelineSessionBindPointARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionBindPointARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionBindPointARM - Enumeration describing the bind points of a data graph pipeline session

Possible values of [VkDataGraphPipelineSessionBindPointARM](#), specifying
the bind point of a data graph pipeline session, are:

// Provided by VK_ARM_data_graph
typedef enum VkDataGraphPipelineSessionBindPointARM {
    VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TRANSIENT_ARM = 0,
} VkDataGraphPipelineSessionBindPointARM;

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TRANSIENT_ARM](#)
corresponds to the transient data produced and consumed during one
dispatch of a data graph pipeline in a data graph pipeline session.
This transient data is never reused by subsequent dispatches and can
safely be clobbered once a [vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html) command
completes execution.

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkBindDataGraphPipelineSessionMemoryInfoARM](VkBindDataGraphPipelineSessionMemoryInfoARM.html), [VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html), [VkDataGraphPipelineSessionMemoryRequirementsInfoARM](VkDataGraphPipelineSessionMemoryRequirementsInfoARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionBindPointARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
