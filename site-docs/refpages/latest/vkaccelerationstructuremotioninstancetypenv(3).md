# VkAccelerationStructureMotionInstanceTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureMotionInstanceTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureMotionInstanceTypeNV - Enum specifying a type of acceleration structure motion instance data for building into an acceleration structure geometry

The [VkAccelerationStructureMotionInstanceTypeNV](#) enumeration is defined
as:

// Provided by VK_NV_ray_tracing_motion_blur
typedef enum VkAccelerationStructureMotionInstanceTypeNV {
    VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_STATIC_NV = 0,
    VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_MATRIX_MOTION_NV = 1,
    VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_SRT_MOTION_NV = 2,
} VkAccelerationStructureMotionInstanceTypeNV;

* 
[VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_STATIC_NV](#) specifies
that the instance is a static instance with no instance motion.

* 
[VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_MATRIX_MOTION_NV](#)
specifies that the instance is a motion instance with motion specified
by interpolation between two matrices.

* 
[VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_SRT_MOTION_NV](#)
specifies that the instance is a motion instance with motion specified
by interpolation in the SRT decomposition.

[VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html), [VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureMotionInstanceTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
