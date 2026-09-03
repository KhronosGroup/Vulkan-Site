# vkCreateDataGraphPipelinesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateDataGraphPipelinesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateDataGraphPipelinesARM - Create data graph pipeline objects

To create data graph pipelines, call:

// Provided by VK_ARM_data_graph
VkResult vkCreateDataGraphPipelinesARM(
    VkDevice                                    device,
    VkDeferredOperationKHR                      deferredOperation,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkDataGraphPipelineCreateInfoARM*     pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the data graph
pipelines.

* 
`deferredOperation` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or the handle of a valid
[VkDeferredOperationKHR](VkDeferredOperationKHR.html) [    request deferral](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations-requesting) object for this command.

* 
`pipelineCache` is either [VK_NULL_HANDLE](VK_NULL_HANDLE.html), indicating that
pipeline caching is disabled; or the handle of a valid
[pipeline cache](../../../../spec/latest/chapters/pipelines.html#pipelines-cache) object, in which case use of that
cache is enabled for the duration of the command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array of [VkPipeline](VkPipeline.html) handles in
which the resulting data graph pipelines objects are returned.

The implementation will create a pipeline in each element of
`pPipelines` from the corresponding element of `pCreateInfos`.
If the creation of any pipeline fails, that pipeline will be set to
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).

Valid Usage

* 
[](#VUID-vkCreateDataGraphPipelinesARM-dataGraph-09760) VUID-vkCreateDataGraphPipelinesARM-dataGraph-09760

The [`dataGraph`](../../../../spec/latest/chapters/features.html#features-dataGraph) feature **must** be enabled

* 
[](#VUID-vkCreateDataGraphPipelinesARM-device-09927) VUID-vkCreateDataGraphPipelinesARM-device-09927

`device` **must** support at least one queue family with the
[VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html) capability

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09761) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09761

`deferredOperation` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09916) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-09916

If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `flags`
member of elements of `pCreateInfos` **must** not include
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pNext-09928) VUID-vkCreateDataGraphPipelinesARM-pNext-09928

If at least one of the [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html) includes a
[VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html) structure in its
`pNext` chain then `pipelineCache` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pipelineCache-09762) VUID-vkCreateDataGraphPipelinesARM-pipelineCache-09762

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html), host access
to `pipelineCache` **must** be
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDataGraphPipelinesARM-device-parameter) VUID-vkCreateDataGraphPipelinesARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parameter) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parameter

 If `deferredOperation` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `deferredOperation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parameter) VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineCache` **must** be a valid [VkPipelineCache](VkPipelineCache.html) handle

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pCreateInfos-parameter) VUID-vkCreateDataGraphPipelinesARM-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html) structures

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pAllocator-parameter) VUID-vkCreateDataGraphPipelinesARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pPipelines-parameter) VUID-vkCreateDataGraphPipelinesARM-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](VkPipeline.html) handles

* 
[](#VUID-vkCreateDataGraphPipelinesARM-device-queuecount) VUID-vkCreateDataGraphPipelinesARM-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkCreateDataGraphPipelinesARM-createInfoCount-arraylength) VUID-vkCreateDataGraphPipelinesARM-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parent) VUID-vkCreateDataGraphPipelinesARM-deferredOperation-parent

 If `deferredOperation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parent) VUID-vkCreateDataGraphPipelinesARM-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html), [VkPipelineCache](VkPipelineCache.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkCreateDataGraphPipelinesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
