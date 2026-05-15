# vkReleaseCapturedPipelineDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkReleaseCapturedPipelineDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkReleaseCapturedPipelineDataKHR - Release captured pipeline binary data

To release pipeline resources captured with
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html), call:

// Provided by VK_KHR_pipeline_binary
VkResult vkReleaseCapturedPipelineDataKHR(
    VkDevice                                    device,
    const VkReleaseCapturedPipelineDataInfoKHR* pInfo,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that created the pipeline object.

* 
`pInfo` is a pointer to a [VkReleaseCapturedPipelineDataInfoKHR](VkReleaseCapturedPipelineDataInfoKHR.html)
structure which describes the pipeline to release the data from.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

The implementation **may** free any resources captured as a result of creating
the pipeline with [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) and put
the pipeline into a state as if
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) had not been provided at
pipeline creation time.

|  | Any resources captured as a result of creating the pipeline with
| --- | --- |
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) are implicitly freed by
[vkDestroyPipeline](vkDestroyPipeline.html). |

Valid Usage

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09611) VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09611

If `VkAllocationCallbacks` were provided when `pipeline` was
created, a compatible set of callbacks **must** be provided in
`pAllocator`

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09612) VUID-vkReleaseCapturedPipelineDataKHR-pipeline-09612

If no [VkAllocationCallbacks](VkAllocationCallbacks.html) were provided when `pipeline` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-device-parameter) VUID-vkReleaseCapturedPipelineDataKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pInfo-parameter) VUID-vkReleaseCapturedPipelineDataKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkReleaseCapturedPipelineDataInfoKHR](VkReleaseCapturedPipelineDataInfoKHR.html) structure

* 
[](#VUID-vkReleaseCapturedPipelineDataKHR-pAllocator-parameter) VUID-vkReleaseCapturedPipelineDataKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkReleaseCapturedPipelineDataInfoKHR](VkReleaseCapturedPipelineDataInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkReleaseCapturedPipelineDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
