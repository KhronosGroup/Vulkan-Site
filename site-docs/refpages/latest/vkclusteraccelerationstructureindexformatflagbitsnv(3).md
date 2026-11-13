# VkClusterAccelerationStructureIndexFormatFlagBitsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClusterAccelerationStructureIndexFormatFlagBitsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClusterAccelerationStructureIndexFormatFlagBitsNV - Bits specifying the index type in the index buffer

Bits that **can** be set in
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)::`indexType`,
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)::`opacityMicromapIndexType`,
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html)::`indexType`
and
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html)::`opacityMicromapIndexType`
specifying the index type is one of:

// Provided by VK_NV_cluster_acceleration_structure
typedef enum VkClusterAccelerationStructureIndexFormatFlagBitsNV {
    VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_8BIT_NV = 0x00000001,
    VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_16BIT_NV = 0x00000002,
    VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_32BIT_NV = 0x00000004,
} VkClusterAccelerationStructureIndexFormatFlagBitsNV;

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_8BIT_NV](#) specifies
that 8-bit indices will be used.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_16BIT_NV](#) specifies
that 16-bit indices will be used.

* 
[VK_CLUSTER_ACCELERATION_STRUCTURE_INDEX_FORMAT_32BIT_NV](#) specifies
that 32-bit indices will be used.

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureIndexFormatFlagsNV](VkClusterAccelerationStructureIndexFormatFlagsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkClusterAccelerationStructureIndexFormatFlagBitsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
