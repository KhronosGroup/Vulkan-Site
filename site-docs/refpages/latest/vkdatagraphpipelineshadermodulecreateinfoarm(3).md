# VkDataGraphPipelineShaderModuleCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineShaderModuleCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineShaderModuleCreateInfoARM - Structure specifying shader module parameters of a newly created data graph pipeline

The `VkDataGraphPipelineShaderModuleCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineShaderModuleCreateInfoARM {
    VkStructureType                          sType;
    const void*                              pNext;
    VkShaderModule                           module;
    const char*                              pName;
    const VkSpecializationInfo*              pSpecializationInfo;
    uint32_t                                 constantCount;
    const VkDataGraphPipelineConstantARM*    pConstants;
} VkDataGraphPipelineShaderModuleCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`module` is optionally a [VkShaderModule](VkShaderModule.html) object containing the
description of the graph.

* 
`pName` is a pointer to a null-terminated UTF-8 string specifying
the graph entry point name for this pipeline.

* 
`pSpecializationInfo` is a pointer to a [VkSpecializationInfo](VkSpecializationInfo.html)
structure as described in
[Specialization Constants](../../../../spec/latest/chapters/pipelines.html#pipelines-specialization-constants), or
`NULL`.

* 
`constantCount` is the length of the `pConstants` array.

* 
`pConstants` is a pointer to an array of
[VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html) structures.

If `module` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline’s graph is defined
by `module`.
If `module` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the pipeline’s graph is defined by
the chained [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html).

Valid Usage

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-dataGraphSpecializationConstants-09849) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-dataGraphSpecializationConstants-09849

If the [    `dataGraphSpecializationConstants`](../../../../spec/latest/chapters/features.html#features-dataGraphSpecializationConstants) feature is not enabled then
`pSpecializationInfo` **must** be `NULL` and `module` **must** not
contain any `OpSpec*` instructions

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-09872) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-09872

`pName` **must** be the name of an `OpGraphEntryPointARM` in
`module`

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09873) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09873

If the `pNext` chain includes a [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)
structure, then `module` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09874) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pNext-09874

If the `pNext` chain does not include a
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structure, then `module` **must** be a
valid [VkShaderModule](VkShaderModule.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SHADER_MODULE_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-module-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-module-parameter

 If `module` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `module` **must** be a valid [VkShaderModule](VkShaderModule.html) handle

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pName-parameter

 `pName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pSpecializationInfo-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pSpecializationInfo-parameter

 If `pSpecializationInfo` is not `NULL`, `pSpecializationInfo` **must** be a valid pointer to a valid [VkSpecializationInfo](VkSpecializationInfo.html) structure

* 
[](#VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pConstants-parameter) VUID-VkDataGraphPipelineShaderModuleCreateInfoARM-pConstants-parameter

 If `constantCount` is not `0`, and `pConstants` is not `NULL`, `pConstants` **must** be a valid pointer to an array of `constantCount` valid [VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html), [VkShaderModule](VkShaderModule.html), [VkSpecializationInfo](VkSpecializationInfo.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineShaderModuleCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
