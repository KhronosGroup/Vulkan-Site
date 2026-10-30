# VkPipelineLibraryCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineLibraryCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineLibraryCreateInfoKHR - Structure specifying pipeline libraries to use when creating a pipeline

The `VkPipelineLibraryCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_library
typedef struct VkPipelineLibraryCreateInfoKHR {
    VkStructureType      sType;
    const void*          pNext;
    uint32_t             libraryCount;
    const VkPipeline*    pLibraries;
} VkPipelineLibraryCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`libraryCount` is the number of pipeline libraries in
`pLibraries`.

* 
`pLibraries` is a pointer to an array of [VkPipeline](VkPipeline.html) structures
specifying pipeline libraries to use when creating a pipeline.

Valid Usage

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-03381) VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-03381

Each element of `pLibraries` **must** have been created with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-06855) VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-06855

If any library in `pLibraries` was created with a shader stage with
[VkPipelineShaderStageModuleIdentifierCreateInfoEXT](VkPipelineShaderStageModuleIdentifierCreateInfoEXT.html) and
`identifierSize` not equal to 0, the pipeline **must** be created with
the [VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) flag
set

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-sType-sType) VUID-VkPipelineLibraryCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_LIBRARY_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-parameter) VUID-VkPipelineLibraryCreateInfoKHR-pLibraries-parameter

 If `libraryCount` is not `0`, `pLibraries` **must** be a valid pointer to an array of `libraryCount` valid [VkPipeline](VkPipeline.html) handles

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

[VK_KHR_pipeline_library](VK_KHR_pipeline_library.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html), [VkPipeline](VkPipeline.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineLibraryCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
