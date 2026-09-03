# VK_NV_partitioned_acceleration_structure(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_partitioned_acceleration_structure.html

## Table of Contents

- [Name](#_name)
- [VK_NV_partitioned_acceleration_structure](#VK_NV_partitioned_acceleration_structure)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_partitioned_acceleration_structure - device extension

**Name String**

`VK_NV_partitioned_acceleration_structure`

**Extension Type**

Device extension

**Registered Extension Number**

571

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

**Contact**

* 
Vikram Kushwaha [vkushwaha](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_partitioned_acceleration_structure] @vkushwaha%0A*Here describe the issue or question you have about the VK_NV_partitioned_acceleration_structure extension*)

**Extension Proposal**

[VK_NV_partitioned_acceleration_structure](../../../../features/latest/features/proposals/VK_NV_partitioned_acceleration_structure.html)

**Last Modified Date**

2025-01-09

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Eric Werness, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Jan Schmid, NVIDIA

* 
Pyarelal Knowles, NVIDIA

With an increase in scene complexity and expansive game worlds, the number
of instances has surged in ray tracing over the last few years.
The current Top Level Acceleration Structure (TLAS) API necessitates a full
rebuild of the entire data structure even when only a few instances are
modified.

This extension introduces Partitioned Top Level Acceleration Structures
(PTLAS) as an alternative to the existing TLAS.
PTLAS enables the efficient reuse of previously constructed parts of the
acceleration structure, resulting in much faster build times and supporting
a higher number of instances.

* 
[vkCmdBuildPartitionedAccelerationStructuresNV](vkCmdBuildPartitionedAccelerationStructuresNV.html)

* 
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html)

* 
[VkBuildPartitionedAccelerationStructureIndirectCommandNV](VkBuildPartitionedAccelerationStructureIndirectCommandNV.html)

* 
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)

* 
[VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html)

* 
[VkPartitionedAccelerationStructureUpdateInstanceDataNV](VkPartitionedAccelerationStructureUpdateInstanceDataNV.html)

* 
[VkPartitionedAccelerationStructureWriteInstanceDataNV](VkPartitionedAccelerationStructureWriteInstanceDataNV.html)

* 
[VkPartitionedAccelerationStructureWritePartitionTranslationDataNV](VkPartitionedAccelerationStructureWritePartitionTranslationDataNV.html)

* 
Extending [VkPartitionedAccelerationStructureInstancesInputNV](VkPartitionedAccelerationStructureInstancesInputNV.html):

[VkPartitionedAccelerationStructureFlagsNV](VkPartitionedAccelerationStructureFlagsNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV](VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV](VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV.html)

Extending [VkWriteDescriptorSet](VkWriteDescriptorSet.html):

* 
[VkWriteDescriptorSetPartitionedAccelerationStructureNV](VkWriteDescriptorSetPartitionedAccelerationStructureNV.html)

* 
[VkPartitionedAccelerationStructureInstanceFlagBitsNV](VkPartitionedAccelerationStructureInstanceFlagBitsNV.html)

* 
[VkPartitionedAccelerationStructureOpTypeNV](VkPartitionedAccelerationStructureOpTypeNV.html)

* 
[VkPartitionedAccelerationStructureInstanceFlagsNV](VkPartitionedAccelerationStructureInstanceFlagsNV.html)

* 
`VK_NV_PARTITIONED_ACCELERATION_STRUCTURE_EXTENSION_NAME`

* 
`VK_NV_PARTITIONED_ACCELERATION_STRUCTURE_SPEC_VERSION`

* 
[VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV](VK_PARTITIONED_ACCELERATION_STRUCTURE_PARTITION_INDEX_GLOBAL_NV.html)

* 
Extending [VkDescriptorType](VkDescriptorType.html):

[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BUILD_PARTITIONED_ACCELERATION_STRUCTURE_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_FLAGS_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCES_INPUT_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkStructureType.html)

* 
Revision 1, 2025-01-09 (Vikram Kushwaha)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_partitioned_acceleration_structure).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
