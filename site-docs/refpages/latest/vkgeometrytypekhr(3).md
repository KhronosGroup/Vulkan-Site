# VkGeometryTypeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeometryTypeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeometryTypeKHR - Enum specifying which type of geometry is provided

Geometry types are specified by [VkGeometryTypeKHR](#), which takes values:

// Provided by VK_KHR_acceleration_structure
typedef enum VkGeometryTypeKHR {
    VK_GEOMETRY_TYPE_TRIANGLES_KHR = 0,
    VK_GEOMETRY_TYPE_AABBS_KHR = 1,
    VK_GEOMETRY_TYPE_INSTANCES_KHR = 2,
  // Provided by VK_NV_ray_tracing_linear_swept_spheres
    VK_GEOMETRY_TYPE_SPHERES_NV = 1000429004,
  // Provided by VK_NV_ray_tracing_linear_swept_spheres
    VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV = 1000429005,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_dense_geometry_format
    VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX = 1000478000,
#endif
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_TYPE_TRIANGLES_NV = VK_GEOMETRY_TYPE_TRIANGLES_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_TYPE_AABBS_NV = VK_GEOMETRY_TYPE_AABBS_KHR,
} VkGeometryTypeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryTypeKHR
typedef VkGeometryTypeKHR VkGeometryTypeNV;

* 
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](#) specifies a geometry type
consisting of [triangles](../../../../spec/latest/chapters/accelstructures.html#ray-tracing-triangle-primitive).

* 
[VK_GEOMETRY_TYPE_AABBS_KHR](#) specifies a geometry type consisting of
[axis-aligned bounding boxes](../../../../spec/latest/chapters/accelstructures.html#aabb-primitive).

* 
[VK_GEOMETRY_TYPE_INSTANCES_KHR](#) specifies a geometry type
consisting of acceleration structure instances.

* 
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](#) specifies a
geometry type consisting of triangles from compressed data.

* 
[VK_GEOMETRY_TYPE_SPHERES_NV](#) specifies a geometry type consisting
of [spheres](../../../../spec/latest/chapters/accelstructures.html#sphere-primitive).

* 
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](#) specifies a geometry type
consisting of [linear swept spheres](../../../../spec/latest/chapters/accelstructures.html#linear-swept-sphere-primitive).

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html), [VkGeometryNV](VkGeometryNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkGeometryTypeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
