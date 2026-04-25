# VkAccelerationStructureTypeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureTypeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureTypeKHR - Type of acceleration structure

Values which **can** be set in
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)::`type`
or
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`type`
specifying the type of acceleration structure, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkAccelerationStructureTypeKHR {
    VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR = 0,
    VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR = 1,
    VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR = 2,
  // Provided by VK_NV_ray_tracing
    VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_NV = VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR,
  // Provided by VK_NV_ray_tracing
    VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV = VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR,
} VkAccelerationStructureTypeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkAccelerationStructureTypeKHR
typedef VkAccelerationStructureTypeKHR VkAccelerationStructureTypeNV;

* 
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](#) is a top-level
acceleration structure containing instance data referring to
bottom-level acceleration structures.

* 
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](#) is a bottom-level
acceleration structure containing the AABBs or geometry to be
intersected.

* 
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#) is an acceleration
structure whose type is determined at build time used for special
circumstances.
In these cases, the acceleration structure type is not known at creation
time, but **must** be specified at build time as either top or bottom.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html), [VkAccelerationStructureCreateInfo2KHR](VkAccelerationStructureCreateInfo2KHR.html), [VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html), [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureTypeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
