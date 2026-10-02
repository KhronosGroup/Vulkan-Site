# VkPipelineBinaryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryKHR - Opaque handle to a pipeline binary object

Pipeline binary objects allow the result of pipeline construction to be
reused between pipelines and between runs of an application.
Reuse is achieved by extracting pipeline binaries from a [VkPipeline](VkPipeline.html)
object, associating them with a corresponding [VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html)
and then adding a [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html) to the `pNext` chain of
any `Vk*PipelineCreateInfo` when creating a pipeline.
Pipeline binaries can be reused between runs by extracting
`VkPipelineBinaryDataKHR` from `VkPipelineBinaryKHR` objects, saving
the contents, and then using them to create a `VkPipelineBinaryKHR`
object on subsequent runs.

When creating a pipeline that includes [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html) in the
`pNext` chain, or has the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) flag set, the use of
[VkPipelineCache](VkPipelineCache.html) objects is not allowed.

Pipeline binary objects are represented by `VkPipelineBinaryKHR`
handles:

// Provided by VK_KHR_pipeline_binary
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipelineBinaryKHR)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipelineBinaryDataInfoKHR](VkPipelineBinaryDataInfoKHR.html), [VkPipelineBinaryHandlesInfoKHR](VkPipelineBinaryHandlesInfoKHR.html), [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html), [vkDestroyPipelineBinaryKHR](vkDestroyPipelineBinaryKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
