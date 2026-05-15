# vkGetRayTracingShaderGroupStackSizeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetRayTracingShaderGroupStackSizeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetRayTracingShaderGroupStackSizeKHR - Query ray tracing pipeline shader group shader stack size

To query the pipeline stack size of shaders in a shader group in the ray
tracing pipeline, call:

// Provided by VK_KHR_ray_tracing_pipeline
VkDeviceSize vkGetRayTracingShaderGroupStackSizeKHR(
    VkDevice                                    device,
    VkPipeline                                  pipeline,
    uint32_t                                    group,
    VkShaderGroupShaderKHR                      groupShader);

* 
`device` is the logical device containing the ray tracing pipeline.

* 
`pipeline` is the ray tracing pipeline object containing the shaders
groups.

* 
`group` is the index of the shader group to query.

* 
`groupShader` is the type of shader from the group to query.

The return value is the ray tracing pipeline stack size in bytes for the
specified shader as called from the specified shader group.

Valid Usage

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-04622) VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-04622

`pipeline` **must** be a ray tracing pipeline

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-group-03608) VUID-vkGetRayTracingShaderGroupStackSizeKHR-group-03608

The value of `group` **must** be less than the number of shader groups
in `pipeline`

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-03609) VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-03609

The shader identified by `groupShader` in `group` **must** not be
[VK_SHADER_UNUSED_KHR](VK_SHADER_UNUSED_KHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-device-parameter) VUID-vkGetRayTracingShaderGroupStackSizeKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parameter) VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-parameter) VUID-vkGetRayTracingShaderGroupStackSizeKHR-groupShader-parameter

 `groupShader` **must** be a valid [VkShaderGroupShaderKHR](VkShaderGroupShaderKHR.html) value

* 
[](#VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parent) VUID-vkGetRayTracingShaderGroupStackSizeKHR-pipeline-parent

 `pipeline` **must** have been created, allocated, or retrieved from `device`

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VkDevice](VkDevice.html), [VkPipeline](VkPipeline.html), [VkShaderGroupShaderKHR](VkShaderGroupShaderKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetRayTracingShaderGroupStackSizeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
