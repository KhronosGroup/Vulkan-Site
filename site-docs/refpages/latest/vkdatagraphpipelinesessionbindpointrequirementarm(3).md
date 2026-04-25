# VkDataGraphPipelineSessionBindPointRequirementARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionBindPointRequirementARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionBindPointRequirementARM - Structure specifying the requirements of a bind point of a data graph pipeline session

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionBindPointRequirementARM {
    VkStructureType                               sType;
    void*                                         pNext;
    VkDataGraphPipelineSessionBindPointARM        bindPoint;
    VkDataGraphPipelineSessionBindPointTypeARM    bindPointType;
    uint32_t                                      numObjects;
} VkDataGraphPipelineSessionBindPointRequirementARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`bindPoint` is a [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html)
specifying the data graph pipeline session bind point being required.

* 
`bindPointType` is a
[VkDataGraphPipelineSessionBindPointTypeARM](VkDataGraphPipelineSessionBindPointTypeARM.html) specifying the type of
object required for `bindPoint`.

* 
`numObjects` is the number of objects required for `bindPoint`.

Implementations **must** always return 1 for `numObjects` if
`bindPoint` is one of the following bind points:

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_TRANSIENT_ARM](VkDataGraphPipelineSessionBindPointARM.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementARM-sType-sType) VUID-VkDataGraphPipelineSessionBindPointRequirementARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENT_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineSessionBindPointRequirementARM-pNext-pNext) VUID-VkDataGraphPipelineSessionBindPointRequirementARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html), [VkDataGraphPipelineSessionBindPointTypeARM](VkDataGraphPipelineSessionBindPointTypeARM.html), [VkStructureType](VkStructureType.html), [vkGetDataGraphPipelineSessionBindPointRequirementsARM](vkGetDataGraphPipelineSessionBindPointRequirementsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionBindPointRequirementARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
