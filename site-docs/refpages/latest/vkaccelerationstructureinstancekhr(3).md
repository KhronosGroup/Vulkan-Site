# VkAccelerationStructureInstanceKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureInstanceKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureInstanceKHR - Structure specifying a single acceleration structure instance for building into an acceleration structure geometry

*Acceleration structure instances* **can** be built into top-level acceleration
structures.
Each acceleration structure instance is a separate entry in the top-level
acceleration structure which includes all the geometry of a bottom-level
acceleration structure at a transformed location.
Multiple instances **can** point to the same bottom level acceleration
structure.

An acceleration structure instance is defined by the structure:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureInstanceKHR {
    VkTransformMatrixKHR          transform;
    uint32_t                      instanceCustomIndex:24;
    uint32_t                      mask:8;
    uint32_t                      instanceShaderBindingTableRecordOffset:24;
    VkGeometryInstanceFlagsKHR    flags:8;
    uint64_t                      accelerationStructureReference;
} VkAccelerationStructureInstanceKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkAccelerationStructureInstanceKHR
typedef VkAccelerationStructureInstanceKHR VkAccelerationStructureInstanceNV;

* 
`transform` is a [VkTransformMatrixKHR](VkTransformMatrixKHR.html) structure describing a
transformation to be applied to the acceleration structure.

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
`accelerationStructureReference` is
either
    :

a device address containing the value obtained from
[vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html)
or
[vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html)
     for a bottom level acceleration structure (used by device operations
     which reference acceleration structures)
or,

* 
a device address containing a bottom level cluster acceleration
structure built using
[vkCmdBuildClusterAccelerationStructureIndirectNV](vkCmdBuildClusterAccelerationStructureIndirectNV.html)

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

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureInstanceKHR-flags-parameter) VUID-VkAccelerationStructureInstanceKHR-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html) values

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureMotionInstanceDataNV](VkAccelerationStructureMotionInstanceDataNV.html), [VkGeometryInstanceFlagsKHR](VkGeometryInstanceFlagsKHR.html), [VkTransformMatrixKHR](VkTransformMatrixKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureInstanceKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
