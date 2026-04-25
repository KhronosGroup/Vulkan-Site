# VkRayTracingShaderGroupCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingShaderGroupCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingShaderGroupCreateInfoNV - Structure specifying shaders in a shader group

The `VkRayTracingShaderGroupCreateInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkRayTracingShaderGroupCreateInfoNV {
    VkStructureType                   sType;
    const void*                       pNext;
    VkRayTracingShaderGroupTypeKHR    type;
    uint32_t                          generalShader;
    uint32_t                          closestHitShader;
    uint32_t                          anyHitShader;
    uint32_t                          intersectionShader;
} VkRayTracingShaderGroupCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of hit group specified in this structure.

* 
`generalShader` is the index of the ray generation, miss, or
callable shader from
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV](VkRayTracingShaderGroupTypeKHR.html), and
[VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html) otherwise.

* 
`closestHitShader` is the optional index of the closest hit shader
from [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages` in the group
if the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html), and
[VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html) otherwise.

* 
`anyHitShader` is the optional index of the any-hit shader from
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html) or
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html), and
[VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html) otherwise.

* 
`intersectionShader` is the index of the intersection shader from
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages` in the group if
the shader group has `type` of
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html), and
[VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html) otherwise.

Valid Usage

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02413) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02413

If `type` is [VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV](VkRayTracingShaderGroupTypeKHR.html) then
`generalShader` **must** be a valid index into
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages` referring to a
shader of [VK_SHADER_STAGE_RAYGEN_BIT_NV](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_MISS_BIT_NV](VkShaderStageFlagBits.html), or
[VK_SHADER_STAGE_CALLABLE_BIT_NV](VkShaderStageFlagBits.html)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02414) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02414

If `type` is [VK_RAY_TRACING_SHADER_GROUP_TYPE_GENERAL_NV](VkRayTracingShaderGroupTypeKHR.html) then
`closestHitShader`, `anyHitShader`, and `intersectionShader`
**must** be [VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02415) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02415

If `type` is
[VK_RAY_TRACING_SHADER_GROUP_TYPE_PROCEDURAL_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html) then
`intersectionShader` **must** be a valid index into
[VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages` referring to a
shader of [VK_SHADER_STAGE_INTERSECTION_BIT_NV](VkShaderStageFlagBits.html)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-02416) VUID-VkRayTracingShaderGroupCreateInfoNV-type-02416

If `type` is
[VK_RAY_TRACING_SHADER_GROUP_TYPE_TRIANGLES_HIT_GROUP_NV](VkRayTracingShaderGroupTypeKHR.html) then
`intersectionShader` **must** be [VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-closestHitShader-02417) VUID-VkRayTracingShaderGroupCreateInfoNV-closestHitShader-02417

`closestHitShader` **must** be either [VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html) or a
valid index into [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages`
referring to a shader of [VK_SHADER_STAGE_CLOSEST_HIT_BIT_NV](VkShaderStageFlagBits.html)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-anyHitShader-02418) VUID-VkRayTracingShaderGroupCreateInfoNV-anyHitShader-02418

`anyHitShader` **must** be either [VK_SHADER_UNUSED_NV](VK_SHADER_UNUSED_KHR.html) or a valid
index into [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html)::`pStages`
referring to a shader of [VK_SHADER_STAGE_ANY_HIT_BIT_NV](VkShaderStageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-sType-sType) VUID-VkRayTracingShaderGroupCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RAY_TRACING_SHADER_GROUP_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-pNext-pNext) VUID-VkRayTracingShaderGroupCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkRayTracingShaderGroupCreateInfoNV-type-parameter) VUID-VkRayTracingShaderGroupCreateInfoNV-type-parameter

 `type` **must** be a valid [VkRayTracingShaderGroupTypeKHR](VkRayTracingShaderGroupTypeKHR.html) value

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkRayTracingShaderGroupTypeKHR](VkRayTracingShaderGroupTypeKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkRayTracingShaderGroupCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
