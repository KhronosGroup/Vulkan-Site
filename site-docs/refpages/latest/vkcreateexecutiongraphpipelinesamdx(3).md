# vkCreateExecutionGraphPipelinesAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateExecutionGraphPipelinesAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateExecutionGraphPipelinesAMDX - Creates a new execution graph pipeline object

To create execution graph pipelines, call:

// Provided by VK_AMDX_shader_enqueue
VkResult vkCreateExecutionGraphPipelinesAMDX(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkExecutionGraphPipelineCreateInfoAMDX* pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the execution graph
pipelines.

* 
`pipelineCache` is either [VK_NULL_HANDLE](VK_NULL_HANDLE.html), indicating that
pipeline caching is disabled; or the handle of a valid
[pipeline cache](../../../../spec/latest/chapters/pipelines.html#pipelines-cache) object, in which case use of that
cache is enabled for the duration of the command.
The implementation **must** not access this object outside of the duration
of this command.

* 
`createInfoCount` is the length of the `pCreateInfos` and
`pPipelines` arrays.

* 
`pCreateInfos` is a pointer to an array of
[VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array of [VkPipeline](VkPipeline.html) handles in
which the resulting execution graph pipeline objects are returned.

Pipelines are created and returned as described for [Multiple Pipeline Creation](../../../../spec/latest/chapters/pipelines.html#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-shaderEnqueue-09124) VUID-vkCreateExecutionGraphPipelinesAMDX-shaderEnqueue-09124

The [`shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) feature **must** be
enabled

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09125) VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09125

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09126) VUID-vkCreateExecutionGraphPipelinesAMDX-flags-09126

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](VkPipelineCreateFlagBits.html) flag set

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-09127) VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-09127

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html), host access
to `pipelineCache` **must** be
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09616) VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09616

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09617) VUID-vkCreateExecutionGraphPipelinesAMDX-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09620) VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09620

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](VkPipelineCreationFeedbackFlagBits.html)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09621) VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09621

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](VkPipelineCreationFeedbackFlagBits.html) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09622) VUID-vkCreateExecutionGraphPipelinesAMDX-binaryCount-09622

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](VkPipelineCreateFlagBits.html) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11414) VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorSize)))
[VkSampler](VkSampler.html) objects currently created on the device

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11429) VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-device-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineCache` **must** be a valid [VkPipelineCache](VkPipelineCache.html) handle

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html) structures

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pAllocator-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pPipelines-parameter) VUID-vkCreateExecutionGraphPipelinesAMDX-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](VkPipeline.html) handles

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-createInfoCount-arraylength) VUID-vkCreateExecutionGraphPipelinesAMDX-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parent) VUID-vkCreateExecutionGraphPipelinesAMDX-pipelineCache-parent

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

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html), [VkPipeline](VkPipeline.html), [VkPipelineCache](VkPipelineCache.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#vkCreateExecutionGraphPipelinesAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
