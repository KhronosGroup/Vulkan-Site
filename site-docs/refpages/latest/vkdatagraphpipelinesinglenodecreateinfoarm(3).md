# VkDataGraphPipelineSingleNodeCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSingleNodeCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSingleNodeCreateInfoARM - Structure specifying parameters of a newly-created single fixed-function node graph pipeline

The `VkDataGraphPipelineSingleNodeCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkDataGraphPipelineSingleNodeCreateInfoARM {
    VkStructureType                                      sType;
    void*                                                pNext;
    VkDataGraphPipelineNodeTypeARM                       nodeType;
    uint32_t                                             connectionCount;
    const VkDataGraphPipelineSingleNodeConnectionARM*    pConnections;
} VkDataGraphPipelineSingleNodeCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`nodeType` is a [VkDataGraphPipelineNodeTypeARM](VkDataGraphPipelineNodeTypeARM.html) describing the
type of this node.

* 
`connectionCount` is the length of the `pConnections` array.

* 
`pConnections` is a pointer to an array of `connectionCount`
[VkDataGraphPipelineSingleNodeConnectionARM](VkDataGraphPipelineSingleNodeConnectionARM.html) structures.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-09963) VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-09963

If `nodeType` is
[VK_DATA_GRAPH_PIPELINE_NODE_TYPE_OPTICAL_FLOW_ARM](VkDataGraphPipelineNodeTypeARM.html), then a
[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html) structure **must** be
included in the `pNext` chain of this structure

* 
[](#VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-09978) VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-09978

If `nodeType` is
[VK_DATA_GRAPH_PIPELINE_NODE_TYPE_OPTICAL_FLOW_ARM](VkDataGraphPipelineNodeTypeARM.html), then one and
only [VkDataGraphPipelineSingleNodeConnectionARM](VkDataGraphPipelineSingleNodeConnectionARM.html) structure **must** be
present in the `pConnections` array for each of the following values
of its `connection` member:

[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_INPUT_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_REFERENCE_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_FLOW_VECTOR_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

[](#VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-09979) VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-09979

If `nodeType` is
[VK_DATA_GRAPH_PIPELINE_NODE_TYPE_OPTICAL_FLOW_ARM](VkDataGraphPipelineNodeTypeARM.html) and
[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)::`hintGridSize` is
not 0, then one and only
[VkDataGraphPipelineSingleNodeConnectionARM](VkDataGraphPipelineSingleNodeConnectionARM.html) structure whose
`connection` member is
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_HINT_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)
**must** be present in the `pConnections` array

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SINGLE_NODE_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-parameter) VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-nodeType-parameter

 `nodeType` **must** be a valid [VkDataGraphPipelineNodeTypeARM](VkDataGraphPipelineNodeTypeARM.html) value

* 
[](#VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-pConnections-parameter) VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-pConnections-parameter

 `pConnections` **must** be a valid pointer to an array of `connectionCount` valid [VkDataGraphPipelineSingleNodeConnectionARM](VkDataGraphPipelineSingleNodeConnectionARM.html) structures

* 
[](#VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-connectionCount-arraylength) VUID-VkDataGraphPipelineSingleNodeCreateInfoARM-connectionCount-arraylength

 `connectionCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphPipelineNodeTypeARM](VkDataGraphPipelineNodeTypeARM.html), [VkDataGraphPipelineSingleNodeConnectionARM](VkDataGraphPipelineSingleNodeConnectionARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSingleNodeCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
