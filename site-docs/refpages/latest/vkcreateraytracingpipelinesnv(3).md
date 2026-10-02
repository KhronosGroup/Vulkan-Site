# vkCreateRayTracingPipelinesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCreateRayTracingPipelinesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCreateRayTracingPipelinesNV - Creates a new ray tracing pipeline object

To create ray tracing pipelines, call:

// Provided by VK_NV_ray_tracing
VkResult vkCreateRayTracingPipelinesNV(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    uint32_t                                    createInfoCount,
    const VkRayTracingPipelineCreateInfoNV*     pCreateInfos,
    const VkAllocationCallbacks*                pAllocator,
    VkPipeline*                                 pPipelines);

* 
`device` is the logical device that creates the ray tracing
pipelines.

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
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html) structures.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

* 
`pPipelines` is a pointer to an array in which the resulting ray
tracing pipeline objects are returned.

Pipelines are created and returned as described for [Multiple Pipeline Creation](../../../../spec/latest/chapters/pipelines.html#pipelines-multiple).

Valid Usage

* 
[](#VUID-vkCreateRayTracingPipelinesNV-device-09677) VUID-vkCreateRayTracingPipelinesNV-device-09677

`device` **must** support at least one queue family with the
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) capability

* 
[](#VUID-vkCreateRayTracingPipelinesNV-flags-03415) VUID-vkCreateRayTracingPipelinesNV-flags-03415

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html) flag, and the
`basePipelineIndex` member of that same element is not `-1`,
`basePipelineIndex` **must** be less than the index into
`pCreateInfos` that corresponds to that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-flags-03416) VUID-vkCreateRayTracingPipelinesNV-flags-03416

If the `flags` member of any element of `pCreateInfos` contains
the [VK_PIPELINE_CREATE_DERIVATIVE_BIT](VkPipelineCreateFlagBits.html) flag, the base pipeline
**must** have been created with the
[VK_PIPELINE_CREATE_ALLOW_DERIVATIVES_BIT](VkPipelineCreateFlagBits.html) flag set

* 
[](#VUID-vkCreateRayTracingPipelinesNV-flags-03816) VUID-vkCreateRayTracingPipelinesNV-flags-03816

`flags` **must** not contain the
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](VkPipelineCreateFlagBits.html) flag

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pipelineCache-02903) VUID-vkCreateRayTracingPipelinesNV-pipelineCache-02903

If `pipelineCache` was created with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html), host access
to `pipelineCache` **must** be
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pNext-09616) VUID-vkCreateRayTracingPipelinesNV-pNext-09616

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`, `pipelineCache` **must** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pNext-09617) VUID-vkCreateRayTracingPipelinesNV-pNext-09617

If a [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html) structure with the
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) flag set is included in
the `pNext` chain of any element of `pCreateInfos`,
`pipelineCache` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-binaryCount-09620) VUID-vkCreateRayTracingPipelinesNV-binaryCount-09620

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_APPLICATION_PIPELINE_CACHE_HIT_BIT](VkPipelineCreationFeedbackFlagBits.html)
**must** not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-binaryCount-09621) VUID-vkCreateRayTracingPipelinesNV-binaryCount-09621

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATION_FEEDBACK_BASE_PIPELINE_ACCELERATION_BIT](VkPipelineCreationFeedbackFlagBits.html) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-binaryCount-09622) VUID-vkCreateRayTracingPipelinesNV-binaryCount-09622

If [VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` is not `0` for any
element of `pCreateInfos`,
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_EXT](VkPipelineCreateFlagBits.html) **must**
not be set in the `flags` of that element

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11414) VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11414

If any element of `pCreateInfos` sets
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) and includes embedded
sampler mappings, there **must** be less than
([`maxSamplerAllocationCount`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerAllocationCount)
-  ([    `minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
[`samplerDescriptorSize`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorSize)))
[VkSampler](VkSampler.html) objects currently created on the device

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11429) VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-11429

    If any element of `pCreateInfos` sets
    [VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](VkPipelineCreateFlagBits2.html) and includes embedded
    sampler mappings, this command **must** not cause the total number of
    unique embedded samplers in pipelines
and shaders
    on this device to exceed [    `maxDescriptorHeapEmbeddedSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorHeapEmbeddedSamplers)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pNext-10150) VUID-vkCreateRayTracingPipelinesNV-pNext-10150

If a [VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html) structure is included in
the `pNext` chain of any element of `pCreateInfos`,
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html) flag **must** not be set

Valid Usage (Implicit)

* 
[](#VUID-vkCreateRayTracingPipelinesNV-device-parameter) VUID-vkCreateRayTracingPipelinesNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parameter) VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parameter

 If `pipelineCache` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipelineCache` **must** be a valid [VkPipelineCache](VkPipelineCache.html) handle

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-parameter) VUID-vkCreateRayTracingPipelinesNV-pCreateInfos-parameter

 `pCreateInfos` **must** be a valid pointer to an array of `createInfoCount` valid [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html) structures

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pAllocator-parameter) VUID-vkCreateRayTracingPipelinesNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pPipelines-parameter) VUID-vkCreateRayTracingPipelinesNV-pPipelines-parameter

 `pPipelines` **must** be a valid pointer to an array of `createInfoCount` [VkPipeline](VkPipeline.html) handles

* 
[](#VUID-vkCreateRayTracingPipelinesNV-createInfoCount-arraylength) VUID-vkCreateRayTracingPipelinesNV-createInfoCount-arraylength

 `createInfoCount` **must** be greater than `0`

* 
[](#VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parent) VUID-vkCreateRayTracingPipelinesNV-pipelineCache-parent

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

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html), [VkPipelineCache](VkPipelineCache.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCreateRayTracingPipelinesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
