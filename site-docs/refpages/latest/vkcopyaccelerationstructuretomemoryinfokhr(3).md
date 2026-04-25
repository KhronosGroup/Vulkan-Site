# VkCopyAccelerationStructureToMemoryInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyAccelerationStructureToMemoryInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyAccelerationStructureToMemoryInfoKHR - Parameters for serializing an acceleration structure

// Provided by VK_KHR_acceleration_structure
typedef struct VkCopyAccelerationStructureToMemoryInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkAccelerationStructureKHR            src;
    VkDeviceOrHostAddressKHR              dst;
    VkCopyAccelerationStructureModeKHR    mode;
} VkCopyAccelerationStructureToMemoryInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`src` is the source acceleration structure for the copy.

* 
`dst` is the device or host address of memory which is the target
for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value
specifying additional operations to perform during the copy.

Valid Usage

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-04959) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-04959

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-dst-03561) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-dst-03561

The memory pointed to by `dst` **must** be at least as large as the
serialization size of `src`, as reported by
[vkWriteAccelerationStructuresPropertiesKHR](vkWriteAccelerationStructuresPropertiesKHR.html) or
[vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html) with a query type of
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html)

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-03412) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-03412

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-sType-sType) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_TO_MEMORY_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-pNext-pNext) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-parameter) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-src-parameter

 `src` **must** be a valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handle

* 
[](#VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-parameter) VUID-VkCopyAccelerationStructureToMemoryInfoKHR-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html), [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html), [VkStructureType](VkStructureType.html), [vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html), [vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkCopyAccelerationStructureToMemoryInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
