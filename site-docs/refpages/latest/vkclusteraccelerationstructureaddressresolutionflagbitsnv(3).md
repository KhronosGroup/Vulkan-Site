# VkClusterAccelerationStructureAddressResolutionFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureAddressResolutionFlagBitsNV - Bitmask specifying address resolution flags in cluster acceleration structure

Bits which **can** be set in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`,
specifying how the device address in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html) are interpreted, are:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureAddressResolutionFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_NONE_NV = 0,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV = 0x00000001,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV = 0x00000002,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV = 0x00000004,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_SIZES_ARRAY_BIT_NV = 0x00000008,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV = 0x00000010,
    VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV = 0x00000020,
} VkClusterAccelerationStructureAddressResolutionFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_NONE_NV](#)
specifies that no address resolution flags are provided.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](#)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstImplicitData`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](#)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](#)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstAddressesArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_SIZES_ARRAY_BIT_NV](#)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstSizesArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV](#)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`srcInfosArray`.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV](#)
specifies another level of indirection when reading
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`srcInfosCount`.

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureAddressResolutionFlagsNV](VkClusterAccelerationStructureAddressResolutionFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureAddressResolutionFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
