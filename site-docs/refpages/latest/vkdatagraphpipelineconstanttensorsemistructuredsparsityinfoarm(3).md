# VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM - Structure specifying semi-structured sparsity parameters of a tensor data graph pipeline constant

The `VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM`
structure is defined as:

// Provided by VK_ARM_data_graph with VK_ARM_tensors
typedef struct VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           dimension;
    uint32_t           zeroCount;
    uint32_t           groupSize;
} VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dimension` is the dimension of the tensor along which its data is
sparse.

* 
`zeroCount` is the number of tensor elements that **must** be zero in
every group of `groupSize` elements.

* 
`groupSize` is the number of tensor elements in a group.

|  | This extension does not provide applications with a way of knowing which
| --- | --- |
combinations of `dimension`, `zeroCount`, and `groupSize` an
implementation **can** take advantage of.
Providing sparsity information for a graph constant is always valid and
recommended, regardless of the specific combinations an implementation **can**
take advantage of.
When they **can** not take advantage of the sparsity information,
implementations will ignore it and treat the data as dense. |

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM-sType-sType) VUID-VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_TENSOR_SEMI_STRUCTURED_SPARSITY_INFO_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VK_ARM_tensors](VK_ARM_tensors.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
