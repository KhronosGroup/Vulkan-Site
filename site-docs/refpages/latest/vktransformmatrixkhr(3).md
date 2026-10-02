# VkTransformMatrixKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTransformMatrixKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTransformMatrixKHR - Structure specifying a 3x4 affine transformation matrix

The `VkTransformMatrixKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkTransformMatrixKHR {
    float    matrix[3][4];
} VkTransformMatrixKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkTransformMatrixKHR
typedef VkTransformMatrixKHR VkTransformMatrixNV;

* 
`matrix` is a 3x4 row-major affine transformation matrix.

Valid Usage

* 
[](#VUID-VkTransformMatrixKHR-matrix-03799) VUID-VkTransformMatrixKHR-matrix-03799

The first three columns of `matrix` **must** define an invertible 3x3
matrix

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html), [VkAccelerationStructureMatrixMotionInstanceNV](VkAccelerationStructureMatrixMotionInstanceNV.html), [VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkTransformMatrixKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
