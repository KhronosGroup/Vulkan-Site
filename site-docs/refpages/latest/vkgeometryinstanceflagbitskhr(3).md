# VkGeometryInstanceFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeometryInstanceFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeometryInstanceFlagBitsKHR - Instance flag bits

Possible values of `flags` in the instance modifying the behavior of
that instance are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkGeometryInstanceFlagBitsKHR {
    VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR = 0x00000001,
    VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR = 0x00000002,
    VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR = 0x00000004,
    VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR = 0x00000008,
  // Provided by VK_EXT_opacity_micromap
    VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_EXT = 0x00000010,
  // Provided by VK_EXT_opacity_micromap
    VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT = 0x00000020,
    VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_KHR = VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_TRIANGLE_CULL_DISABLE_BIT_NV = VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_NV = VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_NV = VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_NV = VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR,
  // Provided by VK_EXT_opacity_micromap
  // VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_EXT is a legacy alias
    VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_EXT = VK_GEOMETRY_INSTANCE_FORCE_OPACITY_MICROMAP_2_STATE_BIT_EXT,
  // Provided by VK_EXT_opacity_micromap
  // VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_EXT is a legacy alias
    VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_EXT = VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT,
} VkGeometryInstanceFlagBitsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryInstanceFlagBitsKHR
typedef VkGeometryInstanceFlagBitsKHR VkGeometryInstanceFlagBitsNV;

* 
[VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR](#) disables
face culling for this instance.

* 
[VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR](#) specifies that
the [facing determination](../../../../spec/latest/chapters/raytraversal.html#ray-traversal-culling-face) for geometry in
this instance is inverted.
Because the facing is determined in object space, an instance transform
does not change the winding, but a geometry transform does.

* 
[VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR](#) causes this instance to
act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](VkGeometryFlagBitsKHR.html) were specified on all
geometries referenced by this instance.
This behavior **can** be overridden by the SPIR-V `NoOpaqueKHR` ray
flag.

* 
[VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR](#) causes this instance
to act as though [VK_GEOMETRY_OPAQUE_BIT_KHR](VkGeometryFlagBitsKHR.html) were not specified on
all geometries referenced by this instance.
This behavior **can** be overridden by the SPIR-V `OpaqueKHR` ray flag.

[VK_GEOMETRY_INSTANCE_FORCE_NO_OPAQUE_BIT_KHR](#) and
[VK_GEOMETRY_INSTANCE_FORCE_OPAQUE_BIT_KHR](#) **must** not be used in the
same flag.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkGeometryInstanceFlagsKHR](VkGeometryInstanceFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkGeometryInstanceFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
