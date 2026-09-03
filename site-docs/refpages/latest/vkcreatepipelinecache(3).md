# vkCreatePipelineCache(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreatePipelineCache.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreatePipelineCache - Creates a new pipeline cache

To create pipeline cache objects, call:

// Provided by VK_VERSION_1_0
VkResult vkCreatePipelineCache(
    VkDevice                                    device,
    const VkPipelineCacheCreateInfo*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPipelineCache*                            pPipelineCache);

* 
`device` is the logical device that creates the pipeline cache
object.

* 
`pCreateInfo` is a pointer to a [VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)
structure containing initial parameters for the pipeline cache object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pPipelineCache` is a pointer to a [VkPipelineCache](VkPipelineCache.html) handle in
which the resulting pipeline cache object is returned.

|  | Applications **can** track and manage the total host memory size of a pipeline
| --- | --- |
cache object using the `pAllocator`.
Applications **can** limit the amount of data retrieved from a pipeline cache
object in `vkGetPipelineCacheData`.
Implementations **should** not internally limit the total number of entries
added to a pipeline cache object or the total host memory consumed. |

Once created, a pipeline cache **can** be passed to the
[vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html)
[vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html),
[vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html),
[vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html),
and [vkCreateComputePipelines](vkCreateComputePipelines.html) commands.
If the pipeline cache passed into these commands is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the implementation will query it for possible reuse
opportunities and update it with new content.
The use of the pipeline cache object in these commands is internally
synchronized, and the same pipeline cache object **can** be used in multiple
threads simultaneously.

If `flags` of `pCreateInfo` includes
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html), all commands
that modify the returned pipeline cache object **must** be
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior).

|  | Implementations **should** make every effort to limit any critical sections to
| --- | --- |
the actual accesses to the cache, which is expected to be significantly
shorter than the duration of the `vkCreate*Pipelines` commands. |

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePipelineCache-device-parameter) VUID-vkCreatePipelineCache-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreatePipelineCache-pCreateInfo-parameter) VUID-vkCreatePipelineCache-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html) structure

* 
[](#VUID-vkCreatePipelineCache-pAllocator-parameter) VUID-vkCreatePipelineCache-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreatePipelineCache-pPipelineCache-parameter) VUID-vkCreatePipelineCache-pPipelineCache-parameter

 `pPipelineCache` **must** be a valid pointer to a [VkPipelineCache](VkPipelineCache.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

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

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipelineCache](VkPipelineCache.html), [VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCreatePipelineCache).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
