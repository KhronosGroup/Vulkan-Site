# VkRayTracingLssPrimitiveEndCapsModeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRayTracingLssPrimitiveEndCapsModeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRayTracingLssPrimitiveEndCapsModeNV - LSS endcaps mode

The default behavior with endcaps in a LSS chain is that both endcaps will
be enabled for all beginning and end points.
To change the LSS chain’s endcaps mode use
[VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)::`endCapsMode`.
The possible values for `endCapsMode` are:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef enum VkRayTracingLssPrimitiveEndCapsModeNV {
    VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_NONE_NV = 0,
    VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_CHAINED_NV = 1,
} VkRayTracingLssPrimitiveEndCapsModeNV;

* 
[VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_NONE_NV](#) disables all
endcaps and the chain boundaries have no influence.

* 
[VK_RAY_TRACING_LSS_PRIMITIVE_END_CAPS_MODE_CHAINED_NV](#) specifies
that when [VK_RAY_TRACING_LSS_INDEXING_MODE_SUCCESSIVE_NV](VkRayTracingLssIndexingModeNV.html) is used
as indexing mode for the LSS primitive, the first primitive in each
chain will have both endcaps enabled, and every following primitive in
the chain only has endcaps at the trailing position enabled.

[VK_NV_ray_tracing_linear_swept_spheres](VK_NV_ray_tracing_linear_swept_spheres.html), [VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkRayTracingLssPrimitiveEndCapsModeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
