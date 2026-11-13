# vkCompileDeferredNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCompileDeferredNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCompileDeferredNV - Deferred compilation of shaders

To compile a deferred shader in a pipeline call:

// Provided by VK_NV_ray_tracing
VkResult vkCompileDeferredNV(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    shader);

* 
`device` is the logical device containing the ray tracing pipeline.

* 
`pipeline` is the ray tracing pipeline object containing the
shaders.

* 
`shader` is the index of the shader to compile.

Valid Usage

* 
[](#VUID-vkCompileDeferredNV-pipeline-04621) VUID-vkCompileDeferredNV-pipeline-04621

`pipeline` **must** be a ray tracing pipeline

* 
[](#VUID-vkCompileDeferredNV-pipeline-02237) VUID-vkCompileDeferredNV-pipeline-02237

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_DEFER_COMPILE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCompileDeferredNV-shader-02238) VUID-vkCompileDeferredNV-shader-02238

`shader` **must** not have been called as a deferred compile before

Valid Usage (Implicit)

* 
[](#VUID-vkCompileDeferredNV-device-parameter) VUID-vkCompileDeferredNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkCompileDeferredNV-pipeline-parameter) VUID-vkCompileDeferredNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkCompileDeferredNV-pipeline-parent) VUID-vkCompileDeferredNV-pipeline-parent

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

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkCompileDeferredNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
