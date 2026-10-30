# VkPipelineCache(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCache.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCache - Opaque handle to a pipeline cache object

Pipeline cache objects allow the result of pipeline construction to be
reused between pipelines and between runs of an application.
Reuse between pipelines is achieved by passing the same pipeline cache
object when creating multiple related pipelines.
Reuse across runs of an application is achieved by retrieving pipeline cache
contents in one run of an application, saving the contents, and using them
to preinitialize a pipeline cache on a subsequent run.
The contents of the pipeline cache objects are managed by the
implementation.
Applications **can** manage the host memory consumed by a pipeline cache object
and control the amount of data retrieved from a pipeline cache object.

Pipeline cache objects are represented by `VkPipelineCache` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipelineCache)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [vkCreateComputePipelines](vkCreateComputePipelines.html), [vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html), [vkCreateExecutionGraphPipelinesAMDX](vkCreateExecutionGraphPipelinesAMDX.html), [vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html), [vkCreatePipelineCache](vkCreatePipelineCache.html), [vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html), [vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html), [vkDestroyPipelineCache](vkDestroyPipelineCache.html), [vkGetPipelineCacheData](vkGetPipelineCacheData.html), [vkMergePipelineCaches](vkMergePipelineCaches.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCache).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
