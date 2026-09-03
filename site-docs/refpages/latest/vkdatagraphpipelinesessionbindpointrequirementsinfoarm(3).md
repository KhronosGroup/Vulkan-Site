# VkDataGraphPipelineSessionBindPointRequirementsInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionBindPointRequirementsInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionBindPointRequirementsInfoARM - Structure specifying info to query the bind point requirements of a data graph pipeline session

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionBindPointRequirementsInfoARM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDataGraphPipelineSessionARM    session;
} VkDataGraphPipelineSessionBindPointRequirementsInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`session` is a [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) specifying the
data graph pipeline session whose bind point requirements are being
queried.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-sType-sType) VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENTS_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-pNext-pNext) VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-session-parameter) VUID-VkDataGraphPipelineSessionBindPointRequirementsInfoARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) handle

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html), [VkStructureType](VkStructureType.html), [vkGetDataGraphPipelineSessionBindPointRequirementsARM](vkGetDataGraphPipelineSessionBindPointRequirementsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionBindPointRequirementsInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
