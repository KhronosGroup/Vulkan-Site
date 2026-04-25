# vkWriteAccelerationStructuresPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWriteAccelerationStructuresPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWriteAccelerationStructuresPropertiesKHR - Query acceleration structure meta-data on the host

To query acceleration structure size parameters on the host, call:

// Provided by VK_KHR_acceleration_structure
VkResult vkWriteAccelerationStructuresPropertiesKHR(
    VkDevice                                    device,
    uint32_t                                    accelerationStructureCount,
    const VkAccelerationStructureKHR*           pAccelerationStructures,
    VkQueryType                                 queryType,
    size_t                                      dataSize,
    void*                                       pData,
    size_t                                      stride);

* 
`device` is the device which owns the acceleration structures in
`pAccelerationStructures`.

* 
`accelerationStructureCount` is the count of acceleration structures
for which to query the property.

* 
`pAccelerationStructures` is a pointer to an array of existing
previously built acceleration structures.

* 
`queryType` is a [VkQueryType](VkQueryType.html) value specifying the property to
be queried.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

* 
`stride` is the stride in bytes between results for individual
queries within `pData`.

This command fulfills the same task as
[vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html) but is executed by the
host.

Valid Usage

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureHostCommands-03585) VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureHostCommands-03585

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructureHostCommands`](../../../../spec/latest/chapters/features.html#features-accelerationStructureHostCommands)
feature **must** be enabled

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964

All acceleration structures in `pAccelerationStructures` **must** have
been built prior to the execution of this command

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431) VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431

All acceleration structures in `pAccelerationStructures` **must** have
been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) if
`queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06742) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06742

`queryType` **must** be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](VkQueryType.html),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html), or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03448) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03448

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html), then
`stride` **must** be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03449) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03449

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html), then
`pData` **must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03450) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03450

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html), then
`stride` **must** be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03451) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-03451

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html), then
`pData` **must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06731) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06731

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](VkQueryType.html), then `stride`
**must** be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06732) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06732

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](VkQueryType.html), then `pData`
**must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06733) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06733

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html),
then `stride` **must** be a multiple of the size of
`VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06734) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-06734

If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html),
then `pData` **must** point to a `VkDeviceSize`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-03452) VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-03452

`dataSize` **must** be greater than or equal to
`accelerationStructureCount`*`stride`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03733) VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03733

Each element of `pAccelerationStructures` **must** be bound to
host-visible device memory

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-11592) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-11592

Each acceleration structure in `pAccelerationStructures` **must** have
been created with [vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03784) VUID-vkWriteAccelerationStructuresPropertiesKHR-buffer-03784

Each element of `pAccelerationStructures` **must** be bound to memory
that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-device-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handles

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](VkQueryType.html) value

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pData-parameter) VUID-vkWriteAccelerationStructuresPropertiesKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength) VUID-vkWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-arraylength) VUID-vkWriteAccelerationStructuresPropertiesKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parent) VUID-vkWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parent

 Each element of `pAccelerationStructures` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkDevice](VkDevice.html), [VkQueryType](VkQueryType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkWriteAccelerationStructuresPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
