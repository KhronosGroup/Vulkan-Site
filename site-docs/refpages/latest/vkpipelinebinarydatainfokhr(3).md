# VkPipelineBinaryDataInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryDataInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryDataInfoKHR - Structure specifying a pipeline binary to retrieve binary data from

The `VkPipelineBinaryDataInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryDataInfoKHR {
    VkStructureType        sType;
    void*                  pNext;
    VkPipelineBinaryKHR    pipelineBinary;
} VkPipelineBinaryDataInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBinary` is the pipeline binary to get data from.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryDataInfoKHR-sType-sType) VUID-VkPipelineBinaryDataInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_DATA_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineBinaryDataInfoKHR-pNext-pNext) VUID-VkPipelineBinaryDataInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryDataInfoKHR-pipelineBinary-parameter) VUID-VkPipelineBinaryDataInfoKHR-pipelineBinary-parameter

 `pipelineBinary` **must** be a valid [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html) handle

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html), [VkStructureType](VkStructureType.html), [vkGetPipelineBinaryDataKHR](vkGetPipelineBinaryDataKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryDataInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
