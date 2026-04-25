# VkAccelerationStructureMotionInstanceDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureMotionInstanceDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureMotionInstanceDataNV - Union specifying an acceleration structure motion instance data for building into an acceleration structure geometry

Acceleration structure motion instance is defined by the union:

// Provided by VK_NV_ray_tracing_motion_blur
typedef union VkAccelerationStructureMotionInstanceDataNV {
    VkAccelerationStructureInstanceKHR               staticInstance;
    VkAccelerationStructureMatrixMotionInstanceNV    matrixMotionInstance;
    VkAccelerationStructureSRTMotionInstanceNV       srtMotionInstance;
} VkAccelerationStructureMotionInstanceDataNV;

* 
`staticInstance` is a [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)
structure containing data for a static instance.

* 
`matrixMotionInstance` is a
[VkAccelerationStructureMatrixMotionInstanceNV](VkAccelerationStructureMatrixMotionInstanceNV.html) structure containing
data for a matrix motion instance.

* 
`srtMotionInstance` is a
[VkAccelerationStructureSRTMotionInstanceNV](VkAccelerationStructureSRTMotionInstanceNV.html) structure containing
data for an SRT motion instance.

[VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html), [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html), [VkAccelerationStructureMatrixMotionInstanceNV](VkAccelerationStructureMatrixMotionInstanceNV.html), [VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html), [VkAccelerationStructureSRTMotionInstanceNV](VkAccelerationStructureSRTMotionInstanceNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureMotionInstanceDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
