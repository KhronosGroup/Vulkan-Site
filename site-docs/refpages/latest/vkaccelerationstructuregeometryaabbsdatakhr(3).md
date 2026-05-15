# VkAccelerationStructureGeometryAabbsDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometryAabbsDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometryAabbsDataKHR - Structure specifying axis-aligned bounding box geometry in a bottom-level acceleration structure

The `VkAccelerationStructureGeometryAabbsDataKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryAabbsDataKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceOrHostAddressConstKHR    data;
    VkDeviceSize                     stride;
} VkAccelerationStructureGeometryAabbsDataKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`data` is a device or host address of memory containing
[VkAabbPositionsKHR](VkAabbPositionsKHR.html) structures containing position data for each
axis-aligned bounding box in the geometry.

* 
`stride` is the stride in bytes between each entry in `data`.
The stride **must** be a multiple of `8`.

Valid Usage

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03545) VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03545

`stride` **must** be a multiple of `8`

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03820) VUID-VkAccelerationStructureGeometryAabbsDataKHR-stride-03820

`stride` **must** be less than or equal to 232-1

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-sType-sType) VUID-VkAccelerationStructureGeometryAabbsDataKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_AABBS_DATA_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureGeometryAabbsDataKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryAabbsDataKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureGeometryDataKHR](VkAccelerationStructureGeometryDataKHR.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureGeometryAabbsDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
