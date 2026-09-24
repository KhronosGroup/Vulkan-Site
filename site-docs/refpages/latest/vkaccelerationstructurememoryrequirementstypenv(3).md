# VkAccelerationStructureMemoryRequirementsTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureMemoryRequirementsTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureMemoryRequirementsTypeNV - Acceleration structure memory requirement type

Possible values of `type` in
`VkAccelerationStructureMemoryRequirementsInfoNV` are:,

// Provided by VK_NV_ray_tracing
typedef enum VkAccelerationStructureMemoryRequirementsTypeNV {
    VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV = 0,
    VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV = 1,
    VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV = 2,
} VkAccelerationStructureMemoryRequirementsTypeNV;

* 
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](#)
requests the memory requirement for the `VkAccelerationStructureNV`
backing store.

* 
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](#)
requests the memory requirement for scratch space during the initial
build.

* 
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](#)
requests the memory requirement for scratch space during an update.

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureMemoryRequirementsTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
