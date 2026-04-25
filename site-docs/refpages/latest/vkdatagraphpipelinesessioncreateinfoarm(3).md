# VkDataGraphPipelineSessionCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionCreateInfoARM - Structure specifying parameters of a newly created data graph pipeline session

The `VkDataGraphPipelineSessionCreateInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineSessionCreateInfoARM {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkDataGraphPipelineSessionCreateFlagsARM    flags;
    VkPipeline                                  dataGraphPipeline;
} VkDataGraphPipelineSessionCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkDataGraphPipelineSessionCreateFlagBitsARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html) describing additional
parameters of the session.

* 
`dataGraphPipeline` is the [VkPipeline](VkPipeline.html) handle of the data graph
pipeline for which a session is being created.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-09781) VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-09781

`dataGraphPipeline` **must** have been obtained via a call to
[vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html)

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-protectedMemory-09782) VUID-VkDataGraphPipelineSessionCreateInfoARM-protectedMemory-09782

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is not
enabled, `flags` **must** not contain
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineSessionCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-pNext-pNext) VUID-VkDataGraphPipelineSessionCreateInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-flags-parameter) VUID-VkDataGraphPipelineSessionCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkDataGraphPipelineSessionCreateFlagBitsARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html) values

* 
[](#VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-parameter) VUID-VkDataGraphPipelineSessionCreateInfoARM-dataGraphPipeline-parameter

 `dataGraphPipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionCreateFlagsARM](VkDataGraphPipelineSessionCreateFlagsARM.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html), [vkCreateDataGraphPipelineSessionARM](vkCreateDataGraphPipelineSessionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
