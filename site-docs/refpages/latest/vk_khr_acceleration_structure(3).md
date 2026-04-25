# VK_KHR_acceleration_structure(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_acceleration_structure.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_acceleration_structure](#VK_KHR_acceleration_structure)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Unions](#_new_unions)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_acceleration_structure - device extension

**Name String**

`VK_KHR_acceleration_structure`

**Extension Type**

Device extension

**Registered Extension Number**

151

**Revision**

13

**Ratification Status**

Ratified

**Extension and Version Dependencies**

         [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

         and

         [VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html)

         and

         [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

     or

     [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2)

and

[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html)

**API Interactions**

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_EXT_debug_report

* 
Interacts with VK_KHR_format_feature_flags2

**Contact**

* 
Daniel Koch [dgkoch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_acceleration_structure] @dgkoch%0A*Here describe the issue or question you have about the VK_KHR_acceleration_structure extension*)

**Last Modified Date**

2021-09-30

**Contributors**

* 
Samuel Bourasseau, Adobe

* 
Matthäus Chajdas, AMD

* 
Greg Grebe, AMD

* 
Nicolai Hähnle, AMD

* 
Tobias Hector, AMD

* 
Dave Oldcorn, AMD

* 
Skyler Saleh, AMD

* 
Mathieu Robart, Arm

* 
Marius Bjorge, Arm

* 
Tom Olson, Arm

* 
Sebastian Tafuri, EA

* 
Henrik Rydgard, Embark

* 
Juan Cañada, Epic Games

* 
Patrick Kelly, Epic Games

* 
Yuriy O’Donnell, Epic Games

* 
Michael Doggett, Facebook/Oculus

* 
Ricardo Garcia, Igalia

* 
Andrew Garrard, Imagination

* 
Don Scorgie, Imagination

* 
Dae Kim, Imagination

* 
Joshua Barczak, Intel

* 
Slawek Grajewski, Intel

* 
Jeff Bolz, NVIDIA

* 
Pascal Gautron, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Ashwin Lele, NVIDIA

* 
Robert Stepinski, NVIDIA

* 
Martin Stich, NVIDIA

* 
Nuno Subtil, NVIDIA

* 
Eric Werness, NVIDIA

* 
Jon Leech, Khronos

* 
Jeroen van Schijndel, OTOY

* 
Juul Joosten, OTOY

* 
Alex Bourd, Qualcomm

* 
Roman Larionov, Qualcomm

* 
David McAllister, Qualcomm

* 
Lewis Gordon, Samsung

* 
Ralph Potter, Samsung

* 
Jasper Bekkers, Traverse Research

* 
Jesse Barker, Unity

* 
Baldur Karlsson, Valve

In order to be efficient, rendering techniques such as ray tracing need a
quick way to identify which primitives may be intersected by a ray
traversing the geometries.
Acceleration structures are the most common way to represent the geometry
spatially sorted, in order to quickly identify such potential intersections.

This extension adds new functionalities:

* 
Acceleration structure objects and build commands

* 
Structures to describe geometry inputs to acceleration structure builds

* 
Acceleration structure copy commands

* 
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html)

* 
[vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html)

* 
[vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html)

* 
[vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html)

* 
[vkCmdCopyAccelerationStructureKHR](vkCmdCopyAccelerationStructureKHR.html)

* 
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html)

* 
[vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html)

* 
[vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html)

* 
[vkCopyAccelerationStructureKHR](vkCopyAccelerationStructureKHR.html)

* 
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html)

* 
[vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html)

* 
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html)

* 
[vkDestroyAccelerationStructureKHR](vkDestroyAccelerationStructureKHR.html)

* 
[vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html)

* 
[vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html)

* 
[vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html)

* 
[vkWriteAccelerationStructuresPropertiesKHR](vkWriteAccelerationStructuresPropertiesKHR.html)

* 
[VkAabbPositionsKHR](VkAabbPositionsKHR.html)

* 
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html)

* 
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html)

* 
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html)

* 
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html)

* 
[VkAccelerationStructureDeviceAddressInfoKHR](VkAccelerationStructureDeviceAddressInfoKHR.html)

* 
[VkAccelerationStructureGeometryAabbsDataKHR](VkAccelerationStructureGeometryAabbsDataKHR.html)

* 
[VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html)

* 
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html)

* 
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)

* 
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)

* 
[VkAccelerationStructureVersionInfoKHR](VkAccelerationStructureVersionInfoKHR.html)

* 
[VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html)

* 
[VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html)

* 
[VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html)

* 
[VkTransformMatrixKHR](VkTransformMatrixKHR.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceAccelerationStructureFeaturesKHR](VkPhysicalDeviceAccelerationStructureFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)

Extending [VkWriteDescriptorSet](VkWriteDescriptorSet.html):

* 
[VkWriteDescriptorSetAccelerationStructureKHR](VkWriteDescriptorSetAccelerationStructureKHR.html)

* 
[VkAccelerationStructureGeometryDataKHR](VkAccelerationStructureGeometryDataKHR.html)

* 
[VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html)

* 
[VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html)

* 
[VkAccelerationStructureBuildTypeKHR](VkAccelerationStructureBuildTypeKHR.html)

* 
[VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html)

* 
[VkAccelerationStructureCreateFlagBitsKHR](VkAccelerationStructureCreateFlagBitsKHR.html)

* 
[VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html)

* 
[VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html)

* 
[VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html)

* 
[VkGeometryFlagBitsKHR](VkGeometryFlagBitsKHR.html)

* 
[VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html)

* 
[VkGeometryTypeKHR](VkGeometryTypeKHR.html)

* 
[VkAccelerationStructureCreateFlagsKHR](VkAccelerationStructureCreateFlagsKHR.html)

* 
[VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html)

* 
[VkGeometryFlagsKHR](VkGeometryFlagsKHR.html)

* 
[VkGeometryInstanceFlagsKHR](VkGeometryInstanceFlagsKHR.html)

* 
`VK_KHR_ACCELERATION_STRUCTURE_EXTENSION_NAME`

* 
`VK_KHR_ACCELERATION_STRUCTURE_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html)

* 
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits.html)

Extending [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html):

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html)

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html)

Extending [VkDescriptorType](VkDescriptorType.html):

* 
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits.html)

Extending [VkIndexType](VkIndexType.html):

* 
[VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_KHR](VkObjectType.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)

Extending [VkQueryType](VkQueryType.html):

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html)

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_GEOMETRY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_SIZES_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DEVICE_ADDRESS_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_AABBS_DATA_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_INSTANCES_DATA_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_TRIANGLES_DATA_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_VERSION_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_TO_MEMORY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_MEMORY_TO_ACCELERATION_STRUCTURE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ACCELERATION_STRUCTURE_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ACCELERATION_STRUCTURE_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_KHR](VkStructureType.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkDebugReportObjectTypeEXT](VkDebugReportObjectTypeEXT.html):

[VK_DEBUG_REPORT_OBJECT_TYPE_ACCELERATION_STRUCTURE_KHR_EXT](VkDebugReportObjectTypeEXT.html)

If [VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) is supported:

* 
Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

[VK_FORMAT_FEATURE_2_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits2.html)

(1) How does this extension differ from VK_NV_ray_tracing?

**DISCUSSION**:

The following is a summary of the main functional differences between
VK_KHR_acceleration_structure and VK_NV_ray_tracing:

* 
added acceleration structure serialization / deserialization
([VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html),
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html),
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html),
[vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html))

* 
document [inactive primitives and    instances](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims)

* 
added [VkPhysicalDeviceAccelerationStructureFeaturesKHR](VkPhysicalDeviceAccelerationStructureFeaturesKHR.html) structure

* 
added indirect and batched acceleration structure builds
([vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html))

* 
added [host acceleration structure](../../../../spec/latest/chapters/accelstructures.html#host-acceleration-structure)
commands

* 
reworked geometry structures so they could be better shared between
device, host, and indirect builds

* 
explicitly made [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) use device addresses

* 
added acceleration structure compatibility check function
([vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html))

* 
add parameter for requesting memory requirements for host and/or device
build

* 
added format feature for acceleration structure build vertex formats
([VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits.html))

(2) Can you give a more detailed comparison of differences and similarities
between VK_NV_ray_tracing and VK_KHR_acceleration_structure?

**DISCUSSION**:

The following is a more detailed comparison of which commands, structures,
and enums are aliased, changed, or removed.

* 
Aliased functionality — enums, structures, and commands that are
considered equivalent:

[VkGeometryTypeNV](VkGeometryTypeKHR.html) ↔ [VkGeometryTypeKHR](VkGeometryTypeKHR.html)

* 
[VkAccelerationStructureTypeNV](VkAccelerationStructureTypeKHR.html) ↔
[VkAccelerationStructureTypeKHR](VkAccelerationStructureTypeKHR.html)

* 
[VkCopyAccelerationStructureModeNV](VkCopyAccelerationStructureModeKHR.html) ↔
[VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html)

* 
[VkGeometryFlagsNV](VkGeometryFlagsKHR.html) ↔ [VkGeometryFlagsKHR](VkGeometryFlagsKHR.html)

* 
[VkGeometryFlagBitsNV](VkGeometryFlagBitsKHR.html) ↔ [VkGeometryFlagBitsKHR](VkGeometryFlagBitsKHR.html)

* 
[VkGeometryInstanceFlagsNV](VkGeometryInstanceFlagsKHR.html) ↔ [VkGeometryInstanceFlagsKHR](VkGeometryInstanceFlagsKHR.html)

* 
[VkGeometryInstanceFlagBitsNV](VkGeometryInstanceFlagBitsKHR.html) ↔
[VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html)

* 
[VkBuildAccelerationStructureFlagsNV](VkBuildAccelerationStructureFlagsKHR.html) ↔
[VkBuildAccelerationStructureFlagsKHR](VkBuildAccelerationStructureFlagsKHR.html)

* 
[VkBuildAccelerationStructureFlagBitsNV](VkBuildAccelerationStructureFlagBitsKHR.html) ↔
[VkBuildAccelerationStructureFlagBitsKHR](VkBuildAccelerationStructureFlagBitsKHR.html)

* 
[VkTransformMatrixNV](VkTransformMatrixKHR.html) ↔ [VkTransformMatrixKHR](VkTransformMatrixKHR.html) (added to
VK_NV_ray_tracing for descriptive purposes)

* 
[VkAabbPositionsNV](VkAabbPositionsKHR.html) ↔ [VkAabbPositionsKHR](VkAabbPositionsKHR.html) (added to
VK_NV_ray_tracing for descriptive purposes)

* 
[VkAccelerationStructureInstanceNV](VkAccelerationStructureInstanceKHR.html) ↔
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html) (added to VK_NV_ray_tracing
for descriptive purposes)

Changed enums, structures, and commands:

* 
renamed [VK_GEOMETRY_INSTANCE_TRIANGLE_CULL_DISABLE_BIT_NV](VkGeometryInstanceFlagBitsKHR.html) →
[VK_GEOMETRY_INSTANCE_TRIANGLE_FACING_CULL_DISABLE_BIT_KHR](VkGeometryInstanceFlagBitsKHR.html) in
[VkGeometryInstanceFlagBitsKHR](VkGeometryInstanceFlagBitsKHR.html)

* 
[VkGeometryTrianglesNV](VkGeometryTrianglesNV.html) →
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) (device or host
address instead of buffer+offset)

* 
[VkGeometryAABBNV](VkGeometryAABBNV.html) →
[VkAccelerationStructureGeometryAabbsDataKHR](VkAccelerationStructureGeometryAabbsDataKHR.html) (device or host
address instead of buffer+offset)

* 
[VkGeometryDataNV](VkGeometryDataNV.html) → [VkAccelerationStructureGeometryDataKHR](VkAccelerationStructureGeometryDataKHR.html)
(union of triangle/aabbs/instances)

* 
[VkGeometryNV](VkGeometryNV.html) → [VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) (changed
type of geometry)

* 
[VkAccelerationStructureCreateInfoNV](VkAccelerationStructureCreateInfoNV.html) →
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) (reshuffle geometry
layout/information)

* 
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html) →
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html) (for
acceleration structure properties, renamed `maxTriangleCount` to
`maxPrimitiveCount`, added per stage and update after bind limits)
and [VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html) (for ray
tracing pipeline properties)

* 
[VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html) (deleted -
replaced by allocating on top of [VkBuffer](VkBuffer.html))

* 
[VkWriteDescriptorSetAccelerationStructureNV](VkWriteDescriptorSetAccelerationStructureNV.html) →
[VkWriteDescriptorSetAccelerationStructureKHR](VkWriteDescriptorSetAccelerationStructureKHR.html) (different
acceleration structure type)

* 
[vkCreateAccelerationStructureNV](vkCreateAccelerationStructureNV.html) →
[vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html) (device address, different
geometry layout/information)

* 
[vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html) (deleted -
replaced by allocating on top of [VkBuffer](VkBuffer.html))

* 
[vkCmdBuildAccelerationStructureNV](vkCmdBuildAccelerationStructureNV.html) →
[vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html) (params moved to structs,
layout differences)

* 
[vkCmdCopyAccelerationStructureNV](vkCmdCopyAccelerationStructureNV.html) →
[vkCmdCopyAccelerationStructureKHR](vkCmdCopyAccelerationStructureKHR.html) (params to struct, extendable)

* 
[vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html) →
[vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html) (device address
instead of handle)

* 
[VkAccelerationStructureMemoryRequirementsTypeNV](VkAccelerationStructureMemoryRequirementsTypeNV.html) → size queries
for scratch space moved to
[vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html)

* 
[vkDestroyAccelerationStructureNV](vkDestroyAccelerationStructureNV.html) →
[vkDestroyAccelerationStructureKHR](vkDestroyAccelerationStructureKHR.html) (different acceleration
structure types)

* 
[vkCmdWriteAccelerationStructuresPropertiesNV](vkCmdWriteAccelerationStructuresPropertiesNV.html) →
[vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html) (different
acceleration structure types)

Added enums, structures, and commands:

* 
[VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) to [VkGeometryTypeKHR](VkGeometryTypeKHR.html) enum

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html),
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](VkCopyAccelerationStructureModeKHR.html) to
[VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) enum

* 
[VkPhysicalDeviceAccelerationStructureFeaturesKHR](VkPhysicalDeviceAccelerationStructureFeaturesKHR.html) structure

* 
[VkAccelerationStructureBuildTypeKHR](VkAccelerationStructureBuildTypeKHR.html) enum

* 
[VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html) enum

* 
[VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html) and [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html)
unions

* 
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) struct

* 
[VkAccelerationStructureGeometryInstancesDataKHR](VkAccelerationStructureGeometryInstancesDataKHR.html) struct

* 
[VkAccelerationStructureDeviceAddressInfoKHR](VkAccelerationStructureDeviceAddressInfoKHR.html) struct

* 
[VkAccelerationStructureVersionInfoKHR](VkAccelerationStructureVersionInfoKHR.html) struct

* 
[VkStridedDeviceAddressRegionKHR](VkStridedDeviceAddressRegionKHR.html) struct

* 
[VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html) struct

* 
[VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html) struct

* 
[VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html) struct

* 
[vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html) command (host build)

* 
[vkCopyAccelerationStructureKHR](vkCopyAccelerationStructureKHR.html) command (host copy)

* 
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html) (host serialize)

* 
[vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html) (host deserialize)

* 
[vkWriteAccelerationStructuresPropertiesKHR](vkWriteAccelerationStructuresPropertiesKHR.html) (host properties)

* 
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html) (device serialize)

* 
[vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html) (device deserialize)

* 
[vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html) (serialization)

(3) What are the changes between the public provisional (VK_KHR_ray_tracing
v8) release and the internal provisional (VK_KHR_ray_tracing v9) release?

* 
added `geometryFlags` to
`VkAccelerationStructureCreateGeometryTypeInfoKHR` (later reworked
to obsolete this)

* 
added `minAccelerationStructureScratchOffsetAlignment` property to
VkPhysicalDeviceRayTracingPropertiesKHR

* 
fix naming and return enum from
[vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html)

renamed `VkAccelerationStructureVersionKHR` to
[VkAccelerationStructureVersionInfoKHR](VkAccelerationStructureVersionInfoKHR.html)

* 
renamed `VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_VERSION_KHR` to
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_VERSION_INFO_KHR](VkStructureType.html)

* 
removed `VK_ERROR_INCOMPATIBLE_VERSION_KHR`

* 
added [VkAccelerationStructureCompatibilityKHR](VkAccelerationStructureCompatibilityKHR.html) enum

* 
remove return value from
[vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html) and added return
enum parameter

Require Vulkan 1.1

added creation time capture and replay flags

* 
added [VkAccelerationStructureCreateFlagBitsKHR](VkAccelerationStructureCreateFlagBitsKHR.html) and
[VkAccelerationStructureCreateFlagsKHR](VkAccelerationStructureCreateFlagsKHR.html)

* 
renamed the `flags` member of
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) to `buildFlags` (later
removed) and added the `createFlags` member

change [vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html) to use buffer
device address for indirect parameter

make `[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html)` an interaction instead of
a required extension (later went back on this)

renamed `VkAccelerationStructureBuildOffsetInfoKHR` to
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html)

* 
renamed the `ppOffsetInfos` parameter of
[vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html) to `ppBuildRangeInfos`

Re-unify geometry description between build and create

* 
remove `VkAccelerationStructureCreateGeometryTypeInfoKHR` and
`VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_GEOMETRY_TYPE_INFO_KHR`

* 
added `VkAccelerationStructureCreateSizeInfoKHR` structure (later
removed)

* 
change type of the `pGeometryInfos` member of
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) from
`VkAccelerationStructureCreateGeometryTypeInfoKHR` to
[VkAccelerationStructureGeometryKHR](VkAccelerationStructureGeometryKHR.html) (later removed)

* 
added `pCreateSizeInfos` member to
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) (later removed)

Fix ppGeometries ambiguity, add pGeometries

* 
remove `geometryArrayOfPointers` member of
VkAccelerationStructureBuildGeometryInfoKHR

* 
disambiguate two meanings of `ppGeometries` by explicitly adding
`pGeometries` to the
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure and require
one of them be `NULL`

added [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) support for
acceleration structures

changed the `update` member of
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) from a bool to the
`mode` [VkBuildAccelerationStructureModeKHR](VkBuildAccelerationStructureModeKHR.html) enum which allows
future extensibility in update types

Clarify deferred host ops for pipeline creation

* 
[VkDeferredOperationKHR](VkDeferredOperationKHR.html) is now a top-level parameter for
[vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html),
[vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html),
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html),
[vkCopyAccelerationStructureKHR](vkCopyAccelerationStructureKHR.html), and
[vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html)

* 
removed `VkDeferredOperationInfoKHR` structure

* 
change deferred host creation/return parameter behavior such that the
implementation can modify such parameters until the deferred host
operation completes

* 
`[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html)` is required again

Change acceleration structure build to always be sized

* 
de-alias [VkAccelerationStructureMemoryRequirementsTypeNV](VkAccelerationStructureMemoryRequirementsTypeNV.html) and
`VkAccelerationStructureMemoryRequirementsTypeKHR`, and remove
`VkAccelerationStructureMemoryRequirementsTypeKHR`

* 
add [vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html) command and
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure and
[VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_SIZES_INFO_KHR](VkStructureType.html)
enum to query sizes for acceleration structures and scratch storage

* 
move size queries for scratch space to
[vkGetAccelerationStructureBuildSizesKHR](vkGetAccelerationStructureBuildSizesKHR.html)

* 
remove `compactedSize`, `buildFlags`, `maxGeometryCount`,
`pGeometryInfos`, `pCreateSizeInfos` members of
[VkAccelerationStructureCreateInfoKHR](VkAccelerationStructureCreateInfoKHR.html) and add the `size`
member

* 
add `maxVertex` member to
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html) structure

* 
remove `VkAccelerationStructureCreateSizeInfoKHR` structure

(4) What are the changes between the internal provisional
(VK_KHR_ray_tracing v9) release and the final (VK_KHR_acceleration_structure
v11) release?

* 
refactor VK_KHR_ray_tracing into 3 extensions, enabling implementation
flexibility and decoupling ray query support from ray pipelines:

`[VK_KHR_acceleration_structure](#)` (for acceleration structure
operations)

* 
`[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` (for ray tracing pipeline and
shader stages)

* 
`[VK_KHR_ray_query](VK_KHR_ray_query.html)` (for ray queries in existing shader stages)

clarify buffer usage flags for ray tracing

* 
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html) is left alone in
`[VK_NV_ray_tracing](VK_NV_ray_tracing.html)` (required on `scratch` and
`instanceData`)

* 
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits.html) is added as an alias
of [VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html) in
`[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` and is required on shader binding
table buffers

* 
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)
is added in `[VK_KHR_acceleration_structure](#)` for all vertex,
index, transform, aabb, and instance buffer data referenced by device
build commands

* 
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) is used for `scratchData`

add max primitive counts (`ppMaxPrimitiveCounts`) to
[vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html)

Allocate acceleration structures from `VkBuffers` and add a mode to
constrain the device address

* 
de-alias `VkBindAccelerationStructureMemoryInfoNV` and
`vkBindAccelerationStructureMemoryNV`, and remove
`VkBindAccelerationStructureMemoryInfoKHR`,
`VkAccelerationStructureMemoryRequirementsInfoKHR`, and
`vkGetAccelerationStructureMemoryRequirementsKHR`

* 
acceleration structures now take a [VkBuffer](VkBuffer.html) and offset at
creation time for memory placement

* 
add a new [VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits.html)
buffer usage for such buffers

* 
add a new [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html) acceleration
structure type for layering

move [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html) to main enum instead of being
added via extension

make build commands more consistent - all now build multiple
acceleration structures and are named plurally
([vkCmdBuildAccelerationStructuresIndirectKHR](vkCmdBuildAccelerationStructuresIndirectKHR.html),
[vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html),
[vkBuildAccelerationStructuresKHR](vkBuildAccelerationStructuresKHR.html))

add interactions with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) for
acceleration structures, including a new feature
(`descriptorBindingAccelerationStructureUpdateAfterBind`) and 3 new
properties (`maxPerStageDescriptorAccelerationStructures`,
`maxPerStageDescriptorUpdateAfterBindAccelerationStructures`,
`maxDescriptorSetUpdateAfterBindAccelerationStructures`)

extension is no longer provisional

define synchronization requirements for builds, traces, and copies

define synchronization requirements for AS build inputs and indirect
build buffer

(5) What is [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](VkAccelerationStructureTypeKHR.html) for?

**RESOLVED**: It is primarily intended for API layering.
In DXR, the acceleration structure is basically just a buffer in a special
layout, and you do not know at creation time whether it will be used as a
top or bottom level acceleration structure.
We thus added a generic acceleration structure type whose type is unknown at
creation time, but is specified at build time instead.
Applications which are written directly for Vulkan should not use it.

* 
Revision 1, 2019-12-05 (Members of the Vulkan Ray Tracing TSG)

Internal revisions (forked from VK_NV_ray_tracing)

Revision 2, 2019-12-20 (Daniel Koch, Eric Werness)

* 
Add const version of DeviceOrHostAddress (!3515)

* 
Add VU to clarify that only handles in the current pipeline are valid
(!3518)

* 
Restore some missing VUs and add in-place update language (#1902,
!3522)

* 
rename VkAccelerationStructureInstanceKHR member from
accelerationStructure to accelerationStructureReference to better match
its type (!3523)

* 
Allow VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS for pipeline creation if
shader group handles cannot be reused (!3523)

* 
update documentation for the VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS
error code and add missing documentation for new return codes from
VK_KHR_deferred_host_operations (!3523)

* 
list new query types for VK_KHR_ray_tracing (!3523)

* 
Fix VU statements for VkAccelerationStructureGeometryKHR referring to
correct union members and update to use more current wording (!3523)

Revision 3, 2020-01-10 (Daniel Koch, Jon Leech, Christoph Kubisch)

* 
Fix 'instance of' and 'that/which contains/defines' markup issues
(!3528)

* 
factor out VK_KHR_pipeline_library as stand-alone extension (!3540)

* 
Resolve Vulkan-hpp issues (!3543)

add missing require for VkGeometryInstanceFlagsKHR

* 
de-alias VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_NV since
the KHR structure is no longer equivalent

* 
add len to pDataSize attribute for
vkWriteAccelerationStructuresPropertiesKHR

Revision 4, 2020-01-23 (Daniel Koch, Eric Werness)

* 
Improve vkWriteAccelerationStructuresPropertiesKHR, add return value
and VUs (#1947)

* 
Clarify language to allow multiple raygen shaders (#1959)

* 
Various editorial feedback (!3556)

* 
Add language to help deal with looped self-intersecting fans (#1901)

* 
Change vkCmdTraceRays{,Indirect}KHR args to pointers (!3559)

* 
Add scratch address validation language (#1941, !3551)

* 
Fix definition and add hierarchy information for shader call scope
(#1977, !3571)

Revision 5, 2020-02-04 (Eric Werness, Jeff Bolz, Daniel Koch)

* 
remove vestigial accelerationStructureUUID (!3582)

* 
update definition of repack instructions and improve memory model
interactions (#1910, #1913, !3584)

* 
Fix wrong sType for VkPhysicalDeviceRayTracingFeaturesKHR (#1988)

* 
Use provisional SPIR-V capabilities (#1987)

* 
require rayTraversalPrimitiveCulling if rayQuery is supported (#1927)

* 
Miss shaders do not have object parameters (!3592)

* 
Fix missing required types in XML (!3592)

* 
clarify matching conditions for update (!3592)

* 
add goal that host and device builds be similar (!3592)

* 
clarify that `maxPrimitiveCount` limit should apply to triangles
and AABBs (!3592)

* 
Require alignment for instance arrayOfPointers (!3592)

* 
Zero is a valid value for instance flags (!3592)

* 
Add some alignment VUs that got lost in refactoring (!3592)

* 
Recommend TMin epsilon rather than culling (!3592)

* 
Get angle from dot product not cross product (!3592)

* 
Clarify that AH can access the payload and attributes (!3592)

* 
Match DXR behavior for inactive primitive definition (!3592)

* 
Use a more generic term than degenerate for inactive to avoid confusion
(!3592)

Revision 6, 2020-02-20 (Daniel Koch)

* 
fix some dangling NV references (#1996)

* 
rename VkCmdTraceRaysIndirectCommandKHR to
VkTraceRaysIndirectCommandKHR (!3607)

* 
update contributor list (!3611)

* 
use uint64_t instead of VkAccelerationStructureReferenceKHR in
VkAccelerationStructureInstanceKHR (#2004)

Revision 7, 2020-02-28 (Tobias Hector)

* 
remove HitTKHR SPIR-V builtin (spirv/spirv-extensions#7)

Revision 8, 2020-03-06 (Tobias Hector, Dae Kim, Daniel Koch, Jeff Bolz,
Eric Werness)

* 
explicitly state that Tmax is updated when new closest intersection is
accepted (#2020,!3536)

* 
Made references to min and max t values consistent (!3644)

* 
finish enumerating differences relative to VK_NV_ray_tracing in issues
(1) and (2) (#1974,!3642)

* 
fix formatting in some math equations (!3642)

* 
Restrict the Hit Kind operand of `OpReportIntersectionKHR` to 7-bits
(spirv/spirv-extensions#8,!3646)

* 
Say ray tracing '**should**' be watertight (#2008,!3631)

* 
Clarify memory requirements for ray tracing buffers (#2005,!3649)

* 
Add callable size limits (#1997,!3652)

Revision 9, 2020-04-15 (Eric Werness, Daniel Koch, Tobias Hector, Joshua
Barczak)

* 
Add geometry flags to acceleration structure creation (!3672)

* 
add build scratch memory alignment
(minAccelerationStructureScratchOffsetAlignment) (#2065,!3725)

* 
fix naming and return enum from
vkGetDeviceAccelerationStructureCompatibilityKHR (#2051,!3726)

* 
require SPIR-V 1.4 (#2096,!3777)

* 
added creation time capture/replay flags (#2104,!3774)

* 
require Vulkan 1.1 (#2133,!3806)

* 
use device addresses instead of VkBuffers for ray tracing commands
(#2074,!3815)

* 
add interactions with Vulkan 1.2 and VK_KHR_vulkan_memory_model
(#2133,!3830)

* 
make VK_KHR_pipeline_library an interaction instead of required
(#2045,#2108,!3830)

* 
make VK_KHR_deferred_host_operations an interaction instead of required
(#2045,!3830)

* 
removed maxCallableSize and added explicit stack size management for
ray pipelines (#1997,!3817,!3772,!3844)

* 
improved documentation for VkAccelerationStructureVersionInfoKHR
(#2135,3835)

* 
rename VkAccelerationStructureBuildOffsetInfoKHR to
VkAccelerationStructureBuildRangeInfoKHR (#2058,!3754)

* 
Re-unify geometry description between build and create (!3754)

* 
Fix ppGeometries ambiguity, add pGeometries (#2032,!3811)

* 
add interactions with VK_EXT_robustness2 and allow nullDescriptor
support for acceleration structures (#1920,!3848)

* 
added future extensibility for AS updates (#2114,!3849)

* 
Fix VU for dispatchrays and add a limit on the size of the full grid
(#2160,!3851)

* 
Add shaderGroupHandleAlignment property (#2180,!3875)

* 
Clarify deferred host ops for pipeline creation (#2067,!3813)

* 
Change acceleration structure build to always be sized
(#2131,#2197,#2198,!3854,!3883,!3880)

Revision 10, 2020-07-03 (Mathieu Robart, Daniel Koch, Eric Werness,
Tobias Hector)

* 
Decomposition of the specification, from VK_KHR_ray_tracing to
VK_KHR_acceleration_structure (#1918,!3912)

* 
clarify buffer usage flags for ray tracing (#2181,!3939)

* 
add max primitive counts to build indirect command (#2233,!3944)

* 
Allocate acceleration structures from VkBuffers and add a mode to
constrain the device address (#2131,!3936)

* 
Move VK_GEOMETRY_TYPE_INSTANCES_KHR to main enum (#2243,!3952)

* 
make build commands more consistent (#2247,!3958)

* 
add interactions with UPDATE_AFTER_BIND (#2128,!3986)

* 
correct and expand build command VUs (!4020)

* 
fix copy command VUs (!4018)

* 
added various alignment requirements (#2229,!3943)

* 
fix valid usage for arrays of geometryCount items (#2198,!4010)

* 
define what is allowed to change on RTAS updates and relevant VUs
(#2177,!3961)

Revision 11, 2020-11-12 (Eric Werness, Josh Barczak, Daniel Koch, Tobias
Hector)

* 
de-alias NV and KHR acceleration structure types and associated
commands (#2271,!4035)

* 
specify alignment for host copy commands (#2273,!4037)

* 
document
[VK_FORMAT_FEATURE_ACCELERATION_STRUCTURE_VERTEX_BUFFER_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
specify that acceleration structures are non-linear (#2289,!4068)

* 
add several missing VUs for strides, vertexFormat, and indexType
(#2315,!4069)

* 
restore VUs for VkAccelerationStructureBuildGeometryInfoKHR
(#2337,!4098)

* 
ban multi-instance memory for host operations (#2324,!4102)

* 
allow dstAccelerationStructure to be null for
vkGetAccelerationStructureBuildSizesKHR (#2330,!4111)

* 
more build VU cleanup (#2138,#4130)

* 
specify host endianness for AS serialization (#2261,!4136)

* 
add invertible transform matrix VU (#1710,!4140)

* 
require geometryCount to be 1 for TLAS builds (!4145)

* 
improved validity conditions for build addresses (#4142)

* 
add single statement SPIR-V VUs, build limit VUs (!4158)

* 
document limits for vertex and aabb strides (#2390,!4184)

* 
specify that
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html) applies to
AS copies (#2382,#4173)

* 
define sync for AS build inputs and indirect buffer (#2407,!4208)

Revision 12, 2021-08-06 (Samuel Bourasseau)

* 
rename VK_GEOMETRY_INSTANCE_TRIANGLE_FRONT_COUNTERCLOCKWISE_BIT_KHR to
VK_GEOMETRY_INSTANCE_TRIANGLE_FLIP_FACING_BIT_KHR (keep previous as
alias).

* 
Clarify description and add note.

Revision 13, 2021-09-30 (Jon Leech)

* 
Add interaction with `[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)` to `vk.xml`

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_acceleration_structure).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
