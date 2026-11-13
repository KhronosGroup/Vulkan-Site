# VkDataGraphPipelineSessionMemoryRequirementsInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionMemoryRequirementsInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionMemoryRequirementsInfoARM - Structure specifying parameters to query the memory requirements of a data graph pipeline session

The `VkDataGraphPipelineSessionMemoryRequirementsInfoARM` structure is
defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionMemoryRequirementsInfoARM {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDataGraphPipelineSessionARM             session;
    VkDataGraphPipelineSessionBindPointARM    bindPoint;
    uint32_t                                  objectIndex;
} VkDataGraphPipelineSessionMemoryRequirementsInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`session` is the data graph pipeline session to query.

* 
`bindPoint` is the bind point of a data graph pipeline session for
which memory requirements are being queried.

* 
`objectIndex` is the index of the object whose memory requirements
are being queried.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-objectIndex-09855) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-objectIndex-09855

`objectIndex` **must** be less than the number of objects returned by
[vkGetDataGraphPipelineSessionBindPointRequirementsARM](vkGetDataGraphPipelineSessionBindPointRequirementsARM.html) via
[VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html)::`numObjects`
with
[VkDataGraphPipelineSessionMemoryRequirementsInfoARM](#)::`bindPoint`
equal to `bindPoint`

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-sType-sType) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_MEMORY_REQUIREMENTS_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-pNext-pNext) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-session-parameter) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) handle

* 
[](#VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-bindPoint-parameter) VUID-VkDataGraphPipelineSessionMemoryRequirementsInfoARM-bindPoint-parameter

 `bindPoint` **must** be a valid [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html) value

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html), [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html), [VkStructureType](VkStructureType.html), [vkGetDataGraphPipelineSessionMemoryRequirementsARM](vkGetDataGraphPipelineSessionMemoryRequirementsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionMemoryRequirementsInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
