# VkCopyAccelerationStructureModeKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCopyAccelerationStructureModeKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCopyAccelerationStructureModeKHR - Acceleration structure copy mode

Possible values of `mode` specifying additional operations to perform
during the copy, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkCopyAccelerationStructureModeKHR {
    VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR = 0,
    VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR = 1,
  // Provided by VK_KHR_acceleration_structure
    VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR = 2,
  // Provided by VK_KHR_acceleration_structure
    VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR = 3,
  // Provided by VK_NV_ray_tracing
    VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_NV = VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR,
  // Provided by VK_NV_ray_tracing
    VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_NV = VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR,
} VkCopyAccelerationStructureModeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkCopyAccelerationStructureModeKHR
typedef VkCopyAccelerationStructureModeKHR VkCopyAccelerationStructureModeNV;

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR](#) creates a direct
copy of the acceleration structure specified in `src` into the one
specified by `dst`.
The `dst` acceleration structure **must** have been created with the
same parameters as `src`.
If `src` contains references to other acceleration structures,
`dst` will reference the same acceleration structures.

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](#) creates a more
    compact version of an acceleration structure `src` into `dst`.
    The acceleration structure `dst` **must** have been created with a size
    at least as large as that returned by
[vkCmdWriteAccelerationStructuresPropertiesNV](vkCmdWriteAccelerationStructuresPropertiesNV.html)
,
    [vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html), or
    [vkWriteAccelerationStructuresPropertiesKHR](vkWriteAccelerationStructuresPropertiesKHR.html)
    after the build of the acceleration structure specified by `src`.
    If `src` contains references to other acceleration structures,
    `dst` will reference the same acceleration structures.

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](#) serializes the
acceleration structure to a semi-opaque format which can be reloaded on
a compatible implementation.

* 
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](#) deserializes
the semi-opaque serialization format in the buffer to the acceleration
structure.

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html), [VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html), [VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html), [vkCmdCopyAccelerationStructureNV](vkCmdCopyAccelerationStructureNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#VkCopyAccelerationStructureModeKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
