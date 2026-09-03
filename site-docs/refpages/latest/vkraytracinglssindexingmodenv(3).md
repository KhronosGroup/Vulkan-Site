# VkRayTracingLssIndexingModeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingLssIndexingModeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingLssIndexingModeNV - LSS indexing mode

Chaining LSS primitives **can** be achieved by specifying an index buffer in
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexData`
and setting
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`indexingMode`
to one of [VkRayTracingLssIndexingModeNV](#) values:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef enum VkRayTracingLssIndexingModeNV {
    VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV = 0,
    VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV = 1,
} VkRayTracingLssIndexingModeNV;

* 
[VK_RAY_TRACING_LSS_INDEXING_MODE_LIST_NV](#) specifies that a list of
indices is provided where each consecutive pair of indices define a LSS
primitive.

* 
[VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV](#) specifies a
successive implicit indexing format, in which each LSS primitive is
defined by two successive positions and radii, (k, k + 1), where
k is a single index provided in the index buffer.
In this indexing scheme, there is a 1:1 mapping between the index buffer
and primitive index within the geometry.

[VK_NV_ray_tracing_linear_swept_spheres](VK_NV_ray_tracing_linear_swept_spheres.html), [VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkRayTracingLssIndexingModeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
