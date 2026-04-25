# vkGetRayTracingShaderGroupHandlesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetRayTracingShaderGroupHandlesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetRayTracingShaderGroupHandlesKHR - Query ray tracing pipeline shader group handles

To query the opaque handles of shaders in the ray tracing pipeline, call:

// Provided by VK_KHR_ray_tracing_pipeline
VkResult vkGetRayTracingShaderGroupHandlesKHR(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    firstGroup,
    uint32_t                                    groupCount,
    size_t                                      dataSize,
    void*                                       pData);

// Provided by VK_NV_ray_tracing
// Equivalent to vkGetRayTracingShaderGroupHandlesKHR
VkResult vkGetRayTracingShaderGroupHandlesNV(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    firstGroup,
    uint32_t                                    groupCount,
    size_t                                      dataSize,
    void*                                       pData);

* 
`device` is the logical device containing the ray tracing pipeline.

* 
`pipeline` is the ray tracing pipeline object containing the
shaders.

* 
`firstGroup` is the index of the first group to retrieve a handle
    for from the
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)::`pGroups`
or
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pGroups`
    array.

* 
`groupCount` is the number of shader handles to retrieve.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

On success, an array of `groupCount` shader handles will be written to
`pData`, with each element being of size
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)::`shaderGroupHandleSize`.
The first handle written corresponds to the group identified by
`firstGroup`, with subsequent handles corresponding to consecutive
shader groups in the order they appear in the
[VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html)::`pGroups`
or
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pGroups`
array.

If `pipeline` was created with [VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)
and the [pipelineLibraryGroupHandles](../../../../spec/latest/chapters/features.html#features-pipelineLibraryGroupHandles)
feature is enabled applications **can** query group handles from that pipeline,
even if the pipeline is a library and is never bound to a command buffer.
These group handles remain bitwise identical for any `pipeline` which
references the pipeline library.
Group indices are assigned as-if the pipeline was created without
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html).

Valid Usage

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-04619) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-04619

`pipeline` **must** be a ray tracing pipeline

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-04050) VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-04050

`firstGroup` **must** be less than the number of shader groups in
`pipeline`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-02419) VUID-vkGetRayTracingShaderGroupHandlesKHR-firstGroup-02419

The sum of `firstGroup` and `groupCount` **must** be less than or
equal to the number of shader groups in `pipeline`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-02420) VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-02420

`dataSize` **must** be at least
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)::`shaderGroupHandleSize` ×
`groupCount`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-07828) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-07828

If the
[pipelineLibraryGroupHandles](../../../../spec/latest/chapters/features.html#features-pipelineLibraryGroupHandles)
feature is not enabled,
`pipeline` **must** not have been created with
[VK_PIPELINE_CREATE_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-device-parameter) VUID-vkGetRayTracingShaderGroupHandlesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parameter) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pData-parameter) VUID-vkGetRayTracingShaderGroupHandlesKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-arraylength) VUID-vkGetRayTracingShaderGroupHandlesKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parent) VUID-vkGetRayTracingShaderGroupHandlesKHR-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

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

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetRayTracingShaderGroupHandlesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
