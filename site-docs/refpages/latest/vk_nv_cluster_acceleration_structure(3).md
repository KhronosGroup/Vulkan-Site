# VK_NV_cluster_acceleration_structure(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_cluster_acceleration_structure.html

## Table of Contents

- [Name](#_name)
- [VK_NV_cluster_acceleration_structure](#VK_NV_cluster_acceleration_structure)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New or Modified Built-In Variables](#_new_or_modified_built_in_variables)
- [New_or_Modified_Built-In_Variables](#_new_or_modified_built_in_variables)
- [New SPIR-V Capability](#_new_spir_v_capability)
- [New_SPIR-V_Capability](#_new_spir_v_capability)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_cluster_acceleration_structure - device extension

**Name String**

`VK_NV_cluster_acceleration_structure`

**Extension Type**

Device extension

**Registered Extension Number**

570

**Revision**

4

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)

**API Interactions**

* 
Interacts with VK_EXT_opacity_micromap

* 
Interacts with VK_KHR_ray_tracing_pipeline

**SPIR-V Dependencies**

* 
[SPV_NV_cluster_acceleration_structure](https://github.khronos.org/SPIRV-Registry/extensions/NV/SPV_NV_cluster_acceleration_structure.html)

**Contact**

* 
Vikram Kushwaha [vkushwaha](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_cluster_acceleration_structure] @vkushwaha%0A*Here describe the issue or question you have about the VK_NV_cluster_acceleration_structure extension*)

**Extension Proposal**

[VK_NV_cluster_acceleration_structure](../../../../features/latest/features/proposals/VK_NV_cluster_acceleration_structure.html)

**Last Modified Date**

2024-09-09

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

Acceleration structure build times can become a bottleneck in ray tracing
applications dealing with extensive dynamic geometry.
This extension addresses the problem by enabling applications to construct
bottom-level acceleration structures (BLAS) from pre-generated acceleration
structures based on clusters of triangles (CLAS), leading to significant
improvements in build times.

It provides a host-side query function to fetch the requirements and a
versatile multi-indirect call for managing cluster geometry.
This call enables applications to generate cluster geometry, construct
Cluster BLAS from CLAS lists, and move or copy CLAS and BLAS.
By sourcing inputs from device memory and processing multiple elements
simultaneously, the call reduces the host-side costs associated with
traditional acceleration structure functions.

This extension adds support for the following SPIR-V extension in Vulkan:

* 
`SPV_NV_cluster_acceleration_structure`

* 
[vkCmdBuildClusterAccelerationStructureIndirectNV](vkCmdBuildClusterAccelerationStructureIndirectNV.html)

* 
[vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html)

* 
[VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV.html)

* 
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)

* 
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html)

* 
[VkClusterAccelerationStructureClustersBottomLevelInputNV](VkClusterAccelerationStructureClustersBottomLevelInputNV.html)

* 
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)

* 
[VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV](VkClusterAccelerationStructureGeometryIndexAndGeometryFlagsNV.html)

* 
[VkClusterAccelerationStructureGetTemplateIndicesInfoNV](VkClusterAccelerationStructureGetTemplateIndicesInfoNV.html)

* 
[VkClusterAccelerationStructureInputInfoNV](VkClusterAccelerationStructureInputInfoNV.html)

* 
[VkClusterAccelerationStructureInstantiateClusterInfoNV](VkClusterAccelerationStructureInstantiateClusterInfoNV.html)

* 
[VkClusterAccelerationStructureMoveObjectsInfoNV](VkClusterAccelerationStructureMoveObjectsInfoNV.html)

* 
[VkClusterAccelerationStructureMoveObjectsInputNV](VkClusterAccelerationStructureMoveObjectsInputNV.html)

* 
[VkClusterAccelerationStructureTriangleClusterInputNV](VkClusterAccelerationStructureTriangleClusterInputNV.html)

* 
[VkStridedDeviceAddressNV](VkStridedDeviceAddressNV.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceClusterAccelerationStructureFeaturesNV](VkPhysicalDeviceClusterAccelerationStructureFeaturesNV.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)

If [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html) is supported:

* 
Extending [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html):

[VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV.html)

* 
[VkClusterAccelerationStructureOpInputNV](VkClusterAccelerationStructureOpInputNV.html)

* 
[VkClusterAccelerationStructureAddressResolutionFlagBitsNV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html)

* 
[VkClusterAccelerationStructureClusterFlagBitsNV](VkClusterAccelerationStructureClusterFlagBitsNV.html)

* 
[VkClusterAccelerationStructureGeometryFlagBitsNV](VkClusterAccelerationStructureGeometryFlagBitsNV.html)

* 
[VkClusterAccelerationStructureIndexFormatFlagBitsNV](VkClusterAccelerationStructureIndexFormatFlagBitsNV.html)

* 
[VkClusterAccelerationStructureOpModeNV](VkClusterAccelerationStructureOpModeNV.html)

* 
[VkClusterAccelerationStructureOpTypeNV](VkClusterAccelerationStructureOpTypeNV.html)

* 
[VkClusterAccelerationStructureTypeNV](VkClusterAccelerationStructureTypeNV.html)

* 
[VkClusterAccelerationStructureAddressResolutionFlagsNV](VkClusterAccelerationStructureAddressResolutionFlagsNV.html)

* 
[VkClusterAccelerationStructureClusterFlagsNV](VkClusterAccelerationStructureClusterFlagsNV.html)

* 
[VkClusterAccelerationStructureGeometryFlagsNV](VkClusterAccelerationStructureGeometryFlagsNV.html)

* 
[VkClusterAccelerationStructureIndexFormatFlagsNV](VkClusterAccelerationStructureIndexFormatFlagsNV.html)

* 
`VK_NV_CLUSTER_ACCELERATION_STRUCTURE_EXTENSION_NAME`

* 
`VK_NV_CLUSTER_ACCELERATION_STRUCTURE_SPEC_VERSION`

* 
Extending [VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html):

[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_CLUSTERS_BOTTOM_LEVEL_INPUT_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_COMMANDS_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_INPUT_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_MOVE_OBJECTS_INPUT_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_TRIANGLE_CLUSTER_INPUT_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_ACCELERATION_STRUCTURE_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_ACCELERATION_STRUCTURE_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CLUSTER_ACCELERATION_STRUCTURE_CREATE_INFO_NV](VkStructureType.html)

If [VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html) is supported:

* 
Extending [VkOpacityMicromapSpecialIndexEXT](VkOpacityMicromapSpecialIndexEXT.html):

[VK_OPACITY_MICROMAP_SPECIAL_INDEX_CLUSTER_GEOMETRY_DISABLE_OPACITY_MICROMAP_NV](VkOpacityMicromapSpecialIndexEXT.html)

* 
[`ClusterIDNV`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-clusteridnv)

* 
[    `RayTracingClusterAccelerationStructureNV`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-RayTracingClusterAccelerationStructureNV)

* 
Revision 4, 2025-07-16 (Vikram Kushwaha)

Adding build flag to enable OMM in cluster acceleration structure

Revision 3, 2025-06-18 (Vikram Kushwaha)

* 
Adding a OpType to get template’s index data

Revision 2, 2024-09-09 (Vikram Kushwaha)

* 
Changes to some structures causing incompatibility with Revision 1

Revision 1, 2024-08-29 (Vikram Kushwaha)

* 
Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_cluster_acceleration_structure).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
