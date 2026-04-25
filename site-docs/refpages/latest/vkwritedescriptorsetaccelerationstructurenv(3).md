# VkWriteDescriptorSetAccelerationStructureNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWriteDescriptorSetAccelerationStructureNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWriteDescriptorSetAccelerationStructureNV - Structure specifying acceleration structure descriptor information

The `VkWriteDescriptorSetAccelerationStructureNV` structure is defined
as:

// Provided by VK_NV_ray_tracing
typedef struct VkWriteDescriptorSetAccelerationStructureNV {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            accelerationStructureCount;
    const VkAccelerationStructureNV*    pAccelerationStructures;
} VkWriteDescriptorSetAccelerationStructureNV;

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
[VkAccelerationStructureNV](VkAccelerationStructureNV.html) structures specifying the acceleration
structures to update.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03748) VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03748

Each acceleration structure in `pAccelerationStructures` **must** have
been created with [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](VkAccelerationStructureTypeKHR.html)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03749) VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03749

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, each member of `pAccelerationStructures` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-sType-sType) VUID-VkWriteDescriptorSetAccelerationStructureNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_NV](VkStructureType.html)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-parameter) VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handles

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-accelerationStructureCount-arraylength) VUID-VkWriteDescriptorSetAccelerationStructureNV-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](VkWriteDescriptorSet.html)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkWriteDescriptorSetAccelerationStructureNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
