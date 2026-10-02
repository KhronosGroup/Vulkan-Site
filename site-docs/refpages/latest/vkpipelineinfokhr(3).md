# VkPipelineInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineInfoKHR - Structure describing a pipeline

The `VkPipelineInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         pipeline;
} VkPipelineInfoKHR;

// Provided by VK_EXT_pipeline_properties
// Equivalent to VkPipelineInfoKHR
typedef VkPipelineInfoKHR VkPipelineInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` is a `VkPipeline` handle.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineInfoKHR-sType-sType) VUID-VkPipelineInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineInfoKHR-pNext-pNext) VUID-VkPipelineInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineInfoKHR-pipeline-parameter) VUID-VkPipelineInfoKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

[VK_EXT_pipeline_properties](VK_EXT_pipeline_properties.html), [VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html), [vkGetPipelineExecutablePropertiesKHR](vkGetPipelineExecutablePropertiesKHR.html), [vkGetPipelinePropertiesEXT](vkGetPipelinePropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
