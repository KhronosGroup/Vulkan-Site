# VkDataGraphPipelineCompilerControlCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineCompilerControlCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineCompilerControlCreateInfoARM - Structure specifying compiler control parameters of a newly created data graph pipeline

The `VkDataGraphPipelineCompilerControlCreateInfoARM` structure is
defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineCompilerControlCreateInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pVendorOptions;
} VkDataGraphPipelineCompilerControlCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pVendorOptions` is a null-terminated UTF-8 string specifying
implementation-specific options that affect the creation of a data graph
pipeline.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_COMPILER_CONTROL_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-pVendorOptions-parameter) VUID-VkDataGraphPipelineCompilerControlCreateInfoARM-pVendorOptions-parameter

 `pVendorOptions` **must** be a null-terminated UTF-8 string

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCompilerControlCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
