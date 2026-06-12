# VkRayTracingShaderGroupTypeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingShaderGroupTypeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingShaderGroupTypeKHR - Shader group types

The [VkRayTracingShaderGroupTypeKHR](#) enumeration is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef enum VkRayTracingShaderGroupTypeKHR {
    VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR = 0,
    VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR = 1,
    VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR = 2,
  // Provided by VK_NV_ray_tracing
    VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV = VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR,
  // Provided by VK_NV_ray_tracing
    VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV = VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR,
  // Provided by VK_NV_ray_tracing
    VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV = VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR,
} VkRayTracingShaderGroupTypeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkRayTracingShaderGroupTypeKHR
typedef VkRayTracingShaderGroupTypeKHR VkRayTracingShaderGroupTypeNV;

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_KHR](#) specifies that a
shader group with a single [VK_SHADER_STAGE_RAYGEN_BIT_KHR](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_MISS_BIT_KHR](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_CALLABLE_BIT_KHR](VkShaderStageFlagBits.html) shader in it.

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_KHR](#) specifies
that a shader group that only hits triangles and **must** not contain an
intersection shader, only closest hit and any-hit shaders.

* 
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_KHR](#)
specifies that a shader group that only intersects with custom geometry
and **must** contain an intersection shader and **may** contain closest hit
and any-hit shaders.

|  | For current group types, the hit group type could be inferred from the
| --- | --- |
presence or absence of the intersection shader, but we provide the type
explicitly for future hit groups that do not have that property. |

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkRayTracingShaderGroupCreateInfoKHR](VkRayTracingShaderGroupCreateInfoKHR.html), [VkRayTracingShaderGroupCreateInfoNV](VkRayTracingShaderGroupCreateInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkRayTracingShaderGroupTypeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
