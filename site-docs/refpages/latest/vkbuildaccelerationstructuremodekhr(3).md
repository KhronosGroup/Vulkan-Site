# VkBuildAccelerationStructureModeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBuildAccelerationStructureModeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBuildAccelerationStructureModeKHR - Enum specifying the type of build operation to perform

The [VkBuildAccelerationStructureModeKHR](#) enumeration is defined as:

// Provided by VK_KHR_acceleration_structure
typedef enum VkBuildAccelerationStructureModeKHR {
    VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR = 0,
    VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR = 1,
} VkBuildAccelerationStructureModeKHR;

* 
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](#) specifies that the
destination acceleration structure will be built using the specified
geometries.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](#) specifies that the
destination acceleration structure will be built using data in a source
acceleration structure, updated by the specified geometries.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkBuildAccelerationStructureModeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
