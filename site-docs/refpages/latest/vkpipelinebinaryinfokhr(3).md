# VkPipelineBinaryInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryInfoKHR - Structure specifying pipeline binaries to use during pipeline creation

The `VkPipelineBinaryInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    uint32_t                      binaryCount;
    const VkPipelineBinaryKHR*    pPipelineBinaries;
} VkPipelineBinaryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`binaryCount` is the number of elements in the
`pPipelineBinaries` array.

* 
`pPipelineBinaries` is a pointer to an array of
[VkPipelineBinaryKHR](VkPipelineBinaryKHR.html) handles.

If a `VkPipelineBinaryInfoKHR` structure with a `binaryCount`
greater than 0 is included in the `pNext` chain of any
`Vk*PipelineCreateInfo` structure when creating a pipeline,
implementations **must** use the data in `pPipelineBinaries` instead of
recalculating it.
Any shader module identifiers, shader modules, or chained
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structures declared in
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) instances, are ignored.
Any [VkShaderDescriptorSetAndBindingMappingInfoEXT](VkShaderDescriptorSetAndBindingMappingInfoEXT.html) in the `pNext`
chains of [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) instances are ignored.

If this structure is not included in the `pNext` chain, it is equivalent
to specifying this structure with a `binaryCount` of `0`.

Valid Usage

* 
[](#VUID-VkPipelineBinaryInfoKHR-binaryCount-09603) VUID-VkPipelineBinaryInfoKHR-binaryCount-09603

`binaryCount` and the order of the elements in
`pPipelineBinaries` **must** exactly match that returned by
[vkCreatePipelineBinariesKHR](vkCreatePipelineBinariesKHR.html) for the matching
`Vk*PipelineCreateInfo` structure and its `pNext` chain,
ignoring the presence of the `VkPipelineBinaryInfoKHR` structure,
the presence of the [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html)
flag, and absence of any shader module identifiers, shader modules, or
`VkShaderModuleCreateInfo` structures, for the same
[global pipeline key](../../../../spec/latest/chapters/pipelines.html#global-pipeline-key), from either:

[VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html)::`pPipelineCreateInfo`, or

* 
[VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html)::`pipeline`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryInfoKHR-sType-sType) VUID-VkPipelineBinaryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineBinaryInfoKHR-pPipelineBinaries-parameter) VUID-VkPipelineBinaryInfoKHR-pPipelineBinaries-parameter

 If `binaryCount` is not `0`, `pPipelineBinaries` **must** be a valid pointer to an array of `binaryCount` valid [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html) handles

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
