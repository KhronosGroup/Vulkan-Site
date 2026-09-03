# VkDataGraphPipelineSingleNodeConnectionARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSingleNodeConnectionARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSingleNodeConnectionARM - Structure describing a single connection between a data graph node and the pipeline layout of a graph pipeline

The `VkDataGraphPipelineSingleNodeConnectionARM` structure is defined
as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkDataGraphPipelineSingleNodeConnectionARM {
    VkStructureType                             sType;
    void*                                       pNext;
    uint32_t                                    set;
    uint32_t                                    binding;
    VkDataGraphPipelineNodeConnectionTypeARM    connection;
} VkDataGraphPipelineSingleNodeConnectionARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`set` is the descriptor set number of the graph pipeline layout
resource to be connected to this connection point.

* 
`binding` is the binding number of the graph pipeline layout
resource to be connected to this connection point.

* 
`connection` is a [VkDataGraphPipelineNodeConnectionTypeARM](VkDataGraphPipelineNodeConnectionTypeARM.html)
specifying the connection point to link to a graph pipeline layout
resource.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSingleNodeConnectionARM-sType-sType) VUID-VkDataGraphPipelineSingleNodeConnectionARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SINGLE_NODE_CONNECTION_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineSingleNodeConnectionARM-pNext-pNext) VUID-VkDataGraphPipelineSingleNodeConnectionARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineSingleNodeConnectionARM-connection-parameter) VUID-VkDataGraphPipelineSingleNodeConnectionARM-connection-parameter

 `connection` **must** be a valid [VkDataGraphPipelineNodeConnectionTypeARM](VkDataGraphPipelineNodeConnectionTypeARM.html) value

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphPipelineNodeConnectionTypeARM](VkDataGraphPipelineNodeConnectionTypeARM.html), [VkDataGraphPipelineSingleNodeCreateInfoARM](VkDataGraphPipelineSingleNodeCreateInfoARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSingleNodeConnectionARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
