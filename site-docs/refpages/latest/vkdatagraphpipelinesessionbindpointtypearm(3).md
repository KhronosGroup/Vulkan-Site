# VkDataGraphPipelineSessionBindPointTypeARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionBindPointTypeARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionBindPointTypeARM - Enumeration describing the type of bind points of a data graph pipeline session

Possible values of [VkDataGraphPipelineSessionBindPointTypeARM](#),
specifying the type of a bind point of a data graph pipeline session, are:

// Provided by VK_ARM_data_graph
typedef enum VkDataGraphPipelineSessionBindPointTypeARM {
    VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM = 0,
} VkDataGraphPipelineSessionBindPointTypeARM;

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TYPE_MEMORY_ARM](#)
corresponds to a memory allocation.

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionBindPointTypeARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
