# VK_SHADER_UNUSED_KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_SHADER_UNUSED_KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_SHADER_UNUSED_KHR - Sentinel for an unused shader index

[VK_SHADER_UNUSED_KHR](#) is a special shader index used to indicate that a
ray generation, miss, or callable shader member is not used.

#define VK_SHADER_UNUSED_KHR              (~0U)

#define VK_SHADER_UNUSED_NV               VK_SHADER_UNUSED_KHR

[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VK_SHADER_UNUSED_KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
