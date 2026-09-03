# VkStridedDeviceAddressNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkStridedDeviceAddressNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkStridedDeviceAddressNV - Structure specifying a device addresses with a stride

The [VkStridedDeviceAddressNV](#) structure is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkStridedDeviceAddressNV {
    VkDeviceAddress    startAddress;
    VkDeviceSize       strideInBytes;
} VkStridedDeviceAddressNV;

* 
`startAddress` is the device address (as returned by the
[vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html) command) at which the region starts, or
zero if the region is unused.

* 
`strideInBytes` is the byte stride between consecutive elements.
Only the bottom 32 bits are used.
The field is 64 bits to ensure consistent alignment across all
containing structures.

Valid Usage (Implicit)

* 
[](#VUID-VkStridedDeviceAddressNV-startAddress-parameter) VUID-VkStridedDeviceAddressNV-startAddress-parameter

 `startAddress` **must** be a valid `VkDeviceAddress` value

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkBuildPartitionedAccelerationStructureIndirectCommandNV](VkBuildPartitionedAccelerationStructureIndirectCommandNV.html), [VkClusterAccelerationStructureInstantiateClusterInfoNV](VkClusterAccelerationStructureInstantiateClusterInfoNV.html), `VkDeviceAddress`, `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkStridedDeviceAddressNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
