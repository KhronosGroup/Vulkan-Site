# VkWriteDescriptorSetAccelerationStructureKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWriteDescriptorSetAccelerationStructureKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWriteDescriptorSetAccelerationStructureKHR - Structure specifying acceleration structure descriptor information

The `VkWriteDescriptorSetAccelerationStructureKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkWriteDescriptorSetAccelerationStructureKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    uint32_t                             accelerationStructureCount;
    const VkAccelerationStructureKHR*    pAccelerationStructures;
} VkWriteDescriptorSetAccelerationStructureKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructureCount` is the number of elements in
`pAccelerationStructures`.

* 
`pAccelerationStructures` is a pointer to an array of
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) structures specifying the acceleration
structures to update.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03579) VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03579

Each acceleration structure in `pAccelerationStructures` **must** have
been created with a `type` of
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03580) VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03580

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, each element of `pAccelerationStructures` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-sType-sType) VUID-VkWriteDescriptorSetAccelerationStructureKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_KHR](VkStructureType.html)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-parameter) VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handles

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-accelerationStructureCount-arraylength) VUID-VkWriteDescriptorSetAccelerationStructureKHR-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](VkWriteDescriptorSet.html)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkWriteDescriptorSetAccelerationStructureKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
