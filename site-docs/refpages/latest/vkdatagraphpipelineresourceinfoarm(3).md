# VkDataGraphPipelineResourceInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineResourceInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineResourceInfoARM - Structure specifying parameters of a data graph pipeline resource

The `VkDataGraphPipelineResourceInfoARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineResourceInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           descriptorSet;
    uint32_t           binding;
    uint32_t           arrayElement;
} VkDataGraphPipelineResourceInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorSet` is the descriptor set number of the resource being
described.

* 
`binding` is the binding number of the resource being described.

* 
`arrayElement` is the element in the resource array if
`descriptorSet` and `binding` identifies an array of resources
or `0` otherwise.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-descriptorSet-09851) VUID-VkDataGraphPipelineResourceInfoARM-descriptorSet-09851

If the `pNext` chain of this structure includes a
[VkTensorDescriptionARM](VkTensorDescriptionARM.html) structure, then its `usage` **must**
contain [VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](VkTensorUsageFlagBitsARM.html)

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-descriptorSet-09962) VUID-VkDataGraphPipelineResourceInfoARM-descriptorSet-09962

If `descriptorSet` and `binding` identify an image resource or
an array of image resources, then a
[VkDataGraphPipelineResourceInfoImageLayoutARM](VkDataGraphPipelineResourceInfoImageLayoutARM.html) structure **must** be
included in the `pNext` chain
, unless the [`unifiedImageLayouts`](../../../../spec/latest/chapters/features.html#features-unifiedImageLayouts)
feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-sType-sType) VUID-VkDataGraphPipelineResourceInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_RESOURCE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-pNext-pNext) VUID-VkDataGraphPipelineResourceInfoARM-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphPipelineResourceInfoImageLayoutARM](VkDataGraphPipelineResourceInfoImageLayoutARM.html) or [VkTensorDescriptionARM](VkTensorDescriptionARM.html)

* 
[](#VUID-VkDataGraphPipelineResourceInfoARM-sType-unique) VUID-VkDataGraphPipelineResourceInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineResourceInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
