# VkDataGraphPipelineConstantARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineConstantARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineConstantARM - Structure specifying parameters of a data graph pipeline constant

The `VkDataGraphPipelineConstantARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineConstantARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           id;
    const void*        pConstantData;
} VkDataGraphPipelineConstantARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is a pointer to a structure extending this structure.

* 
`id` is the unique identifier of the graph constant this structure
describes.

* 
`pConstantData` is a pointer to the data for this graph constant.

The size and layout of the data pointed to by `pConstantData` is
specified by a specific structure in the `pNext` chain for each type of
graph constant.

For graph constants of tensor type, the layout of the data is specified by a
[VkTensorDescriptionARM](VkTensorDescriptionARM.html) structure.
The data **must** be laid out according to the following members of this
structure:

* 
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`tiling`

* 
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`format`

* 
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`dimensionCount`

* 
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`

* 
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pStrides`

The presence of a
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)
structure in the `pNext` chain has no impact on the expected layout of
the data pointed to by `pConstantData`.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09775) VUID-VkDataGraphPipelineConstantARM-pNext-09775

If the `pNext` chain of this structure includes one or more
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)
structures then it **must** also include a [VkTensorDescriptionARM](VkTensorDescriptionARM.html)
structure

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09776) VUID-VkDataGraphPipelineConstantARM-pNext-09776

If the `pNext` chain of this structure includes one or more
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)
structures then, for each structure,
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)::`dimension`
**must** be less than [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`dimensionCount`

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09777) VUID-VkDataGraphPipelineConstantARM-pNext-09777

If the `pNext` chain of this structure includes a
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)
structure then, for each structure,
[VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`pDimensions`[[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)::`dimension`]
**must** be a multiple of
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)::`groupSize`

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09870) VUID-VkDataGraphPipelineConstantARM-pNext-09870

If the `pNext` chain of this structure includes multiple
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)
structures then no two structures **may** have their
[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)::`dimension`
member set to the same value

* 
[](#VUID-VkDataGraphPipelineConstantARM-id-09850) VUID-VkDataGraphPipelineConstantARM-id-09850

If the `pNext` chain of this structure includes a
[VkTensorDescriptionARM](VkTensorDescriptionARM.html) structure, then its `usage` member
**must** contain [VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](VkTensorUsageFlagBitsARM.html)

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-09917) VUID-VkDataGraphPipelineConstantARM-pNext-09917

If the `pNext` chain of this structure includes a
[VkTensorDescriptionARM](VkTensorDescriptionARM.html) structure, then its `tiling` member
**must** be [VK_TENSOR_TILING_LINEAR_ARM](VkTensorTilingARM.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineConstantARM-sType-sType) VUID-VkDataGraphPipelineConstantARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineConstantARM-pNext-pNext) VUID-VkDataGraphPipelineConstantARM-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html) or [VkTensorDescriptionARM](VkTensorDescriptionARM.html)

* 
[](#VUID-VkDataGraphPipelineConstantARM-sType-unique) VUID-VkDataGraphPipelineConstantARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)

* 
[](#VUID-VkDataGraphPipelineConstantARM-pConstantData-parameter) VUID-VkDataGraphPipelineConstantARM-pConstantData-parameter

 `pConstantData` **must** be a pointer value

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineConstantARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
