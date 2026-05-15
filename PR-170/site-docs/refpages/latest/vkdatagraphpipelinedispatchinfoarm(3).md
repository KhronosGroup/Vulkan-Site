# VkDataGraphPipelineDispatchInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineDispatchInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineDispatchInfoARM - Structure specifying parameters of a data graph pipeline dispatch

The [VkDataGraphPipelineDispatchInfoARM](#) structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineDispatchInfoARM {
    VkStructureType                        sType;
    void*                                  pNext;
    VkDataGraphPipelineDispatchFlagsARM    flags;
} VkDataGraphPipelineDispatchInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDataGraphPipelineDispatchFlagBitsARM](VkDataGraphPipelineDispatchFlagBitsARM.html)
describing additional parameters of the dispatch.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineDispatchInfoARM-sType-sType) VUID-VkDataGraphPipelineDispatchInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_DISPATCH_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineDispatchInfoARM-pNext-pNext) VUID-VkDataGraphPipelineDispatchInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineDispatchInfoARM-flags-zerobitmask) VUID-VkDataGraphPipelineDispatchInfoARM-flags-zerobitmask

 `flags` **must** be `0`

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineDispatchFlagsARM](VkDataGraphPipelineDispatchFlagsARM.html), [VkStructureType](VkStructureType.html), [vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineDispatchInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
