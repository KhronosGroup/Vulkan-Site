# VkGeometryFlagBitsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeometryFlagBitsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeometryFlagBitsKHR - Bitmask specifying additional parameters for a geometry

Bits specifying additional parameters for geometries in acceleration
structure builds, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkGeometryFlagBitsKHR {
    VK_GEOMETRY_OPAQUE_BIT_KHR = 0x00000001,
    VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_KHR = 0x00000002,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_OPAQUE_BIT_NV = VK_GEOMETRY_OPAQUE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_NV = VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_KHR,
} VkGeometryFlagBitsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryFlagBitsKHR
typedef VkGeometryFlagBitsKHR VkGeometryFlagBitsNV;

* 
[VK_GEOMETRY_OPAQUE_BIT_KHR](#) specifies that this geometry does not
invoke the any-hit shaders even if present in a hit group.

* 
[VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_KHR](#) specifies that
the implementation **must** only call the any-hit shader a single time for
each primitive in this geometry.
If this bit is absent an implementation **may** invoke the any-hit shader
more than once for this geometry.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkGeometryFlagsKHR](VkGeometryFlagsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkGeometryFlagBitsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
