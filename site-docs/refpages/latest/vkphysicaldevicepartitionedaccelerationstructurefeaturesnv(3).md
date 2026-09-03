# VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV - Structure describing the ray tracing partitioned top level acceleration structure feature supported by an implementation

The `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`
structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           partitionedAccelerationStructure;
} VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`partitionedAccelerationStructure` indicates whether the
implementation supports the ability to generate top level partitioned
acceleration structures.

If the `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV-sType-sType) VUID-VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_FEATURES_NV](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
