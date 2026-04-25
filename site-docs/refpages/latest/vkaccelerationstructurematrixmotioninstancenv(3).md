# VkAccelerationStructureMatrixMotionInstanceNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureMatrixMotionInstanceNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureMatrixMotionInstanceNV - Structure specifying a single acceleration structure matrix motion instance for building into an acceleration structure geometry

An acceleration structure matrix motion instance is defined by the
structure:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureMatrixMotionInstanceNV {
    VkTransformMatrixKHR          transformT0;
    VkTransformMatrixKHR          transformT1;
    uint32_t                      instanceCustomIndex:24;
    uint32_t                      mask:8;
    uint32_t                      instanceShaderBindingTableRecordOffset:24;
    VkGeometryInstanceFlagsKHR    flags:8;
    uint64_t                      accelerationStructureReference;
} VkAccelerationStructureMatrixMotionInstanceNV;

* 
`transformT0` is a [VkTransformMatrixKHR](VkTransformMatrixKHR.html) structure describing a
transformation to be applied to the acceleration structure at time 0.

* 
`transformT1` is a [VkTransformMatrixKHR](VkTransformMatrixKHR.html) structure describing a
transformation to be applied to the acceleration structure at time 1.

* 
`instanceCustomIndex` is a 24-bit application-specified index value
accessible to ray shaders in the `InstanceCustomIndexKHR` built-in.

* 
`mask` is an 8-bit visibility mask for the geometry.
The instance **may** only be hit if `Cull Mask & instance.mask != 0`

* 
`instanceShaderBindingTableRecordOffset` is a 24-bit offset used in
calculating the hit shader binding table index.

* 
`flags` is an 8-bit mask of [VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html)
values to apply to this instance.

* 
`accelerationStructureReference` is either:

a device address containing the value obtained from
[vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html)
or
[vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html)
     (used by device operations which reference acceleration structures) or,

* 
a [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) object (used by host operations
which reference acceleration structures).

The C language specification does not define the ordering of bit-fields, but
in practice, this structure produces the correct layout with existing
compilers.
The intended bit pattern is for the following:

* 
`instanceCustomIndex` and `mask` occupy the same memory as if a
single `uint32_t` was specified in their place

`instanceCustomIndex` occupies the 24 least significant bits of
that memory

* 
`mask` occupies the 8 most significant bits of that memory

`instanceShaderBindingTableRecordOffset` and `flags` occupy the
same memory as if a single `uint32_t` was specified in their place

* 
`instanceShaderBindingTableRecordOffset` occupies the 24 least
significant bits of that memory

* 
`flags` occupies the 8 most significant bits of that memory

If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values according to the correct bit
pattern.

The transform for a matrix motion instance at a point in time is derived by
component-wise linear interpolation of the two transforms.
That is, for a `time` in [0,1] the resulting transform is

`transformT0` × (1 - `time`) + 
`transformT1` × `time`

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMatrixMotionInstanceNV-flags-parameter) VUID-VkAccelerationStructureMatrixMotionInstanceNV-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html) values

[VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html), [VkAccelerationStructureMotionInstanceDataNV](VkAccelerationStructureMotionInstanceDataNV.html), [VkGeometryInstanceFlagsKHR](VkGeometryInstanceFlagsKHR.html), [VkTransformMatrixKHR](VkTransformMatrixKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureMatrixMotionInstanceNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
