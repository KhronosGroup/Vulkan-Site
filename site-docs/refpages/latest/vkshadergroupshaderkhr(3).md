# VkShaderGroupShaderKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderGroupShaderKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderGroupShaderKHR - Shader group shaders

Possible values of `groupShader` in
[vkGetRayTracingShaderGroupStackSizeKHR](vkGetRayTracingShaderGroupStackSizeKHR.html) are:

// Provided by VK_KHR_ray_tracing_pipeline
typedef enum VkShaderGroupShaderKHR {
    VK_SHADER_GROUP_SHADER_GENERAL_KHR = 0,
    VK_SHADER_GROUP_SHADER_CLOSEST_HIT_KHR = 1,
    VK_SHADER_GROUP_SHADER_ANY_HIT_KHR = 2,
    VK_SHADER_GROUP_SHADER_INTERSECTION_KHR = 3,
} VkShaderGroupShaderKHR;

* 
[VK_SHADER_GROUP_SHADER_GENERAL_KHR](#) uses the shader specified in
the group with
[VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html)::`generalShader`

* 
[VK_SHADER_GROUP_SHADER_CLOSEST_HIT_KHR](#) uses the shader specified
in the group with
[VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html)::`closestHitShader`

* 
[VK_SHADER_GROUP_SHADER_ANY_HIT_KHR](#) uses the shader specified in
the group with
[VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html)::`anyHitShader`

* 
[VK_SHADER_GROUP_SHADER_INTERSECTION_KHR](#) uses the shader specified
in the group with
[VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html)::`intersectionShader`

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [vkGetRayTracingShaderGroupStackSizeKHR](vkGetRayTracingShaderGroupStackSizeKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkShaderGroupShaderKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
