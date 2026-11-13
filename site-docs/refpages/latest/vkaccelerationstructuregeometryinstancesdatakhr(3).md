# VkAccelerationStructureGeometryInstancesDataKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureGeometryInstancesDataKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureGeometryInstancesDataKHR - Structure specifying a geometry consisting of instances of other acceleration structures

The `VkAccelerationStructureGeometryInstancesDataKHR` structure is
defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureGeometryInstancesDataKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkBool32                         arrayOfPointers;
    VkDeviceOrHostAddressConstKHR    data;
} VkAccelerationStructureGeometryInstancesDataKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`arrayOfPointers` specifies whether `data` is used as an array
of addresses or just an array.

* 
`data` is either the address of an array of device or host addresses
referencing individual [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)
structures
or packed motion instance information as described in
[motion instances](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-motion-instances)
if `arrayOfPointers` is [VK_TRUE](VK_TRUE.html), or the address of an array of
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)
or [VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html)
structures.
Addresses and [VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html) structures are
tightly packed.
[VkAccelerationStructureMotionInstanceNV](VkAccelerationStructureMotionInstanceNV.html) structures have a stride
of 160 bytes.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureGeometryInstancesDataKHR-sType-sType) VUID-VkAccelerationStructureGeometryInstancesDataKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_INSTANCES_DATA_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureGeometryInstancesDataKHR-pNext-pNext) VUID-VkAccelerationStructureGeometryInstancesDataKHR-pNext-pNext

 `pNext` **must** be `NULL`

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureGeometryDataKHR](VkAccelerationStructureGeometryDataKHR.html), `VkBool32`, [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureGeometryInstancesDataKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
