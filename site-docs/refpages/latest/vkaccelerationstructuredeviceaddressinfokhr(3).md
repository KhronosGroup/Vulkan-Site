# VkAccelerationStructureDeviceAddressInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureDeviceAddressInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureDeviceAddressInfoKHR - Structure specifying the acceleration structure to query an address for

The `VkAccelerationStructureDeviceAddressInfoKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureDeviceAddressInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    VkAccelerationStructureKHR    accelerationStructure;
} VkAccelerationStructureDeviceAddressInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructure` specifies the acceleration structure whose
address is being queried.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureDeviceAddressInfoKHR-sType-sType) VUID-VkAccelerationStructureDeviceAddressInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DEVICE_ADDRESS_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureDeviceAddressInfoKHR-pNext-pNext) VUID-VkAccelerationStructureDeviceAddressInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureDeviceAddressInfoKHR-accelerationStructure-parameter) VUID-VkAccelerationStructureDeviceAddressInfoKHR-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkStructureType](VkStructureType.html), [vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureDeviceAddressInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
