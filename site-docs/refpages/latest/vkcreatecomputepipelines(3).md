# vkCreateComputePipelines(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateComputePipelines.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateComputePipelines - Creates a new compute pipeline object

To create compute pipelines, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateComputePipelines(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkComputePipelineCreateInfo*          pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the compute pipelines.

* 
`pipelineCache` is
either [VK_NULL_HANDLE](VK_NULL_HANDLE.html), indicating that pipeline caching is
disabled, or to enable caching,
the handle of a valid [VkPipelineCache](VkPipelineCache.html) object.
The implementation **must** not access this object outside of the duration
of this command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array of [VkPipeline](VkPipeline.html) handles in
which the resulting compute pipeline objects are returned.

Pipelines are created and returned as described for [Multiple Pipeline Creation](../../../../spec/latest/chapters/pipelines.html#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateComputePipelines-device-09661) VUID-vkCreateComputePipelines-device-09661

`device` **must** support at least one queue family with the
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) capability

* 
[](#VUID-vkCreateComputePipelines-flags-00695) VUID-vkCreateComputePipelines-flags-00695

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateComputePipelines-flags-00696) VUID-vkCreateComputePipelines-flags-00696

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](VkPipelineCreateFlagBits.html) flag set

* 
[](#VUID-vkCreateComputePipelines-pipelineCache-02873) VUID-vkCreateComputePipelines-pipelineCache-02873

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html), host access
to `pipelineCache` **must** be
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateComputePipelines-pNext-09616) VUID-vkCreateComputePipelines-pNext-09616

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateComputePipelines-pNext-09617) VUID-vkCreateComputePipelines-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateComputePipelines-binaryCount-09620) VUID-vkCreateComputePipelines-binaryCount-09620

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](VkPipelineCreationFeedbackFlagBits.html)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateComputePipelines-binaryCount-09621) VUID-vkCreateComputePipelines-binaryCount-09621

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](VkPipelineCreationFeedbackFlagBits.html) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateComputePipelines-binaryCount-09622) VUID-vkCreateComputePipelines-binaryCount-09622

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](VkPipelineCreateFlagBits.html) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateComputePipelines-pCreateInfos-11414) VUID-vkCreateComputePipelines-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorSize)))
[VkSampler](VkSampler.html) objects currently created on the device

* 
[](#VUID-vkCreateComputePipelines-pCreateInfos-11429) VUID-vkCreateComputePipelines-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateComputePipelines-device-parameter) VUID-vkCreateComputePipelines-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateComputePipelines-pipelineCache-parameter) VUID-vkCreateComputePipelines-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineCache` **must** be a valid [VkPipelineCache](VkPipelineCache.html) handle

* 
[](#VUID-vkCreateComputePipelines-pCreateInfos-parameter) VUID-vkCreateComputePipelines-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html) structures

* 
[](#VUID-vkCreateComputePipelines-pAllocator-parameter) VUID-vkCreateComputePipelines-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateComputePipelines-pPipelines-parameter) VUID-vkCreateComputePipelines-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](VkPipeline.html) handles

* 
[](#VUID-vkCreateComputePipelines-createInfoCount-arraylength) VUID-vkCreateComputePipelines-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateComputePipelines-pipelineCache-parent) VUID-vkCreateComputePipelines-pipelineCache-parent

 If `pipelineCache` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_SHADER_NV](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html), [VkPipelineCache](VkPipelineCache.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCreateComputePipelines).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
