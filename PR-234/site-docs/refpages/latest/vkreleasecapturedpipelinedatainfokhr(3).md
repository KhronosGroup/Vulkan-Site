# VkReleaseCapturedPipelineDataInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkReleaseCapturedPipelineDataInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [Valid Usage](#undefined)
- [Valid Usage (Implicit)](#undefined)
- [Valid_Usage_(Implicit)](#undefined)
- [Host Synchronization](#undefined)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkReleaseCapturedPipelineDataInfoKHR - Structure specifying a pipeline whose captured data is to be released

The `VkReleaseCapturedPipelineDataInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkReleaseCapturedPipelineDataInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkPipeline         pipeline;
} VkReleaseCapturedPipelineDataInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` is the handle of the pipeline object to release the data
from.

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09613) VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09613

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09618) VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-09618

`pipeline` **must** not have been used in a previous call to
`vkReleaseCapturedPipelineDataKHR`

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-sType-sType) VUID-VkReleaseCapturedPipelineDataInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RELEASE_CAPTURED_PIPELINE_DATA_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pNext-pNext) VUID-VkReleaseCapturedPipelineDataInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-parameter) VUID-VkReleaseCapturedPipelineDataInfoKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
Host access to `pipeline` **must** be externally synchronized

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html), [vkReleaseCapturedPipelineDataKHR](vkReleaseCapturedPipelineDataKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkReleaseCapturedPipelineDataInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
