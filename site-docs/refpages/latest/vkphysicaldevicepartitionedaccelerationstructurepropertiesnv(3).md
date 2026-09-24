# VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV - Structure describing properties supported by a partitioned acceleration structure implementation

The `VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV`
structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPartitionCount;
} VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxPartitionCount` indicates the
maximum number of partitions allowed in a partitioned acceleration
structure.

If the `VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV-sType-sType) VUID-VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
