# VkAccelerationStructureVersionInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureVersionInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureVersionInfoKHR - Acceleration structure version information

The `VkAccelerationStructureVersionInfoKHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureVersionInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    const uint8_t*     pVersionData;
} VkAccelerationStructureVersionInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pVersionData` is a pointer to the version header of an acceleration
structure as defined in [vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html)

|  | `pVersionData` is a *pointer* to an array of 2×[VK_UUID_SIZE](VK_UUID_SIZE.html)
| --- | --- |
`uint8_t` values instead of two [VK_UUID_SIZE](VK_UUID_SIZE.html) arrays as the expected
use case for this member is to be pointed at the header of a previously
serialized acceleration structure (via
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html) or
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html)) that is loaded in memory.
Using arrays would necessitate extra memory copies of the UUIDs. |

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureVersionInfoKHR-sType-sType) VUID-VkAccelerationStructureVersionInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_VERSION_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureVersionInfoKHR-pNext-pNext) VUID-VkAccelerationStructureVersionInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureVersionInfoKHR-pVersionData-parameter) VUID-VkAccelerationStructureVersionInfoKHR-pVersionData-parameter

 `pVersionData` **must** be a valid pointer to an array of    `uint8_t` values

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkStructureType](VkStructureType.html), [vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkAccelerationStructureVersionInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
