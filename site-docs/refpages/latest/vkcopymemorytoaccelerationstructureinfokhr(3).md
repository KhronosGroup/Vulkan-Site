# VkCopyMemoryToAccelerationStructureInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyMemoryToAccelerationStructureInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyMemoryToAccelerationStructureInfoKHR - Parameters for deserializing an acceleration structure

The `VkCopyMemoryToAccelerationStructureInfoKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkCopyMemoryToAccelerationStructureInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceOrHostAddressConstKHR         src;
    VkAccelerationStructureKHR            dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyMemoryToAccelerationStructureInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the device or host address of memory containing the source
data for the copy.

* 
`dst` is the target acceleration structure for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value
specifying additional operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-src-04960) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-src-04960

The source memory pointed to by `src` **must** contain data previously
serialized using [vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html),
potentially modified to relocate acceleration structure references as
described in that command

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-03413) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-03413

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pInfo-03414) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pInfo-03414

The data in `src` **must** have a format compatible with the
destination physical device as returned by
[vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-03746) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-03746

`dst` **must** have been created with a `size` greater than or
equal to that used to serialize the data in `src`

Valid Usage (Implicit)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-sType-sType) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_MEMORY_TO_ACCELERATION_STRUCTURE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pNext-pNext) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-parameter) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-parameter) VUID-VkCopyMemoryToAccelerationStructureInfoKHR-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), [VkStructureType](VkStructureType.html), [vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html), [vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkCopyMemoryToAccelerationStructureInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
