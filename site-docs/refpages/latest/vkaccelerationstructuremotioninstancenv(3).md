# VkAccelerationStructureMotionInstanceNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureMotionInstanceNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureMotionInstanceNV - Structure specifying a single acceleration structure motion instance for building into an acceleration structure geometry

*Acceleration structure motion instances* **can** be built into top-level
acceleration structures.
Each acceleration structure instance is a separate entry in the top-level
acceleration structure which includes all the geometry of a bottom-level
acceleration structure at a transformed location including a type of motion
and parameters to determine the motion of the instance over time.

An acceleration structure motion instance is defined by the structure:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureMotionInstanceNV {
    VkAccelerationStructureMotionInstanceTypeNV     type;
    VkAccelerationStructureMotionInstanceFlagsNV    flags;
    VkAccelerationStructureMotionInstanceDataNV     data;
} VkAccelerationStructureMotionInstanceNV;

* 
`type` is a [VkAccelerationStructureMotionInstanceTypeNV](VkAccelerationStructureMotionInstanceTypeNV.html)
enumerant identifying which type of motion instance this is and which
type of the union is valid.

* 
`flags` is currently unused, but is required to keep natural
alignment of `data`.

* 
`data` is a [VkAccelerationStructureMotionInstanceDataNV](VkAccelerationStructureMotionInstanceDataNV.html)
containing motion instance data for this instance.

|  | If writing this other than with a standard C compiler, note that the final
| --- | --- |
structure should be 152 bytes in size. |

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-type-parameter) VUID-VkAccelerationStructureMotionInstanceNV-type-parameter

 `type` **must** be a valid [VkAccelerationStructureMotionInstanceTypeNV](VkAccelerationStructureMotionInstanceTypeNV.html) value

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-flags-zerobitmask) VUID-VkAccelerationStructureMotionInstanceNV-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-staticInstance-parameter) VUID-VkAccelerationStructureMotionInstanceNV-staticInstance-parameter

 If `type` is [VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_STATIC_NV](VkAccelerationStructureMotionInstanceTypeNV.html), the `staticInstance` member of `data` **must** be a valid [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html) structure

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-matrixMotionInstance-parameter) VUID-VkAccelerationStructureMotionInstanceNV-matrixMotionInstance-parameter

 If `type` is [VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_MATRIX_MOTION_NV](VkAccelerationStructureMotionInstanceTypeNV.html), the `matrixMotionInstance` member of `data` **must** be a valid [VkAccelerationStructureMatrixMotionInstanceNV](VkAccelerationStructureMatrixMotionInstanceNV.html) structure

* 
[](#VUID-VkAccelerationStructureMotionInstanceNV-srtMotionInstance-parameter) VUID-VkAccelerationStructureMotionInstanceNV-srtMotionInstance-parameter

 If `type` is [VK_ACCELERATION_STRUCTURE_MOTION_INSTANCE_TYPE_SRT_MOTION_NV](VkAccelerationStructureMotionInstanceTypeNV.html), the `srtMotionInstance` member of `data` **must** be a valid [VkAccelerationStructureSRTMotionInstanceNV](VkAccelerationStructureSRTMotionInstanceNV.html) structure

[VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html), [VkAccelerationStructureMotionInstanceDataNV](VkAccelerationStructureMotionInstanceDataNV.html), [VkAccelerationStructureMotionInstanceFlagsNV](VkAccelerationStructureMotionInstanceFlagsNV.html), [VkAccelerationStructureMotionInstanceTypeNV](VkAccelerationStructureMotionInstanceTypeNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureMotionInstanceNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
