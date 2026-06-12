# VkPipelineExecutableInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineExecutableInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineExecutableInfoKHR - Structure describing a pipeline executable to query for associated statistics or internal representations

The `VkPipelineExecutableInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPipelineExecutableInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         pipeline;
    uint32_t           executableIndex;
} VkPipelineExecutableInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` is the pipeline to query.

* 
`executableIndex` is the index of the pipeline executable to query
in the array of executable properties returned by
[vkGetPipelineExecutablePropertiesKHR](vkGetPipelineExecutablePropertiesKHR.html).

Valid Usage

* 
[](#VUID-VkPipelineExecutableInfoKHR-executableIndex-03275) VUID-VkPipelineExecutableInfoKHR-executableIndex-03275

`executableIndex` **must** be less than the number of pipeline
executables associated with `pipeline` as returned in the
`pExecutableCount` parameter of
`vkGetPipelineExecutablePropertiesKHR`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineExecutableInfoKHR-sType-sType) VUID-VkPipelineExecutableInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineExecutableInfoKHR-pNext-pNext) VUID-VkPipelineExecutableInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineExecutableInfoKHR-pipeline-parameter) VUID-VkPipelineExecutableInfoKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

[VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html), [vkGetPipelineExecutableInternalRepresentationsKHR](vkGetPipelineExecutableInternalRepresentationsKHR.html), [vkGetPipelineExecutableStatisticsKHR](vkGetPipelineExecutableStatisticsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineExecutableInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
