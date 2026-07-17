# VkDataGraphPipelineResourceInfoImageLayoutARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineResourceInfoImageLayoutARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineResourceInfoImageLayoutARM - Structure specifying parameters of a graph pipeline image resource

The `VkDataGraphPipelineResourceInfoImageLayoutARM` structure is defined
as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkDataGraphPipelineResourceInfoImageLayoutARM {
    VkStructureType    sType;
    const void*        pNext;
    VkImageLayout      layout;
} VkDataGraphPipelineResourceInfoImageLayoutARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`layout` specifies the layout that the image subresource accessible
from the view provided as a graph pipeline resource **must** be in at the
time where the graph pipeline being created is dispatched.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineResourceInfoImageLayoutARM-sType-sType) VUID-VkDataGraphPipelineResourceInfoImageLayoutARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_RESOURCE_INFO_IMAGE_LAYOUT_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineResourceInfoImageLayoutARM-layout-parameter) VUID-VkDataGraphPipelineResourceInfoImageLayoutARM-layout-parameter

 `layout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html)

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkImageLayout](VkImageLayout.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineResourceInfoImageLayoutARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
