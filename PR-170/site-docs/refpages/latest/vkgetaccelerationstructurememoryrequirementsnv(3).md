# vkGetAccelerationStructureMemoryRequirementsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetAccelerationStructureMemoryRequirementsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetAccelerationStructureMemoryRequirementsNV - Get acceleration structure memory requirements

An acceleration structure has memory requirements for the structure object
itself, scratch space for the build, and scratch space for the update.

Scratch space is allocated as a `VkBuffer`, so for
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)
and
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)
the `pMemoryRequirements->alignment` and
`pMemoryRequirements->memoryTypeBits` values returned by this call **must**
be filled with zero, and **should** be ignored by the application.

To query the memory requirements, call:

// Provided by VK_NV_ray_tracing
void vkGetAccelerationStructureMemoryRequirementsNV(
    VkDevice                                    device,
    const VkAccelerationStructureMemoryRequirementsInfoNV* pInfo,
    VkMemoryRequirements2KHR*                   pMemoryRequirements);

* 
`device` is the logical device on which the acceleration structure
was created.

* 
`pInfo` is a pointer to a
[VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html) structure
specifying the acceleration structure to get memory requirements for.

* 
`pMemoryRequirements` is a pointer to a
[VkMemoryRequirements2KHR](VkMemoryRequirements2.html) structure in which the requested
acceleration structure memory requirements are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureMemoryRequirementsNV-device-parameter) VUID-vkGetAccelerationStructureMemoryRequirementsNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetAccelerationStructureMemoryRequirementsNV-pInfo-parameter) VUID-vkGetAccelerationStructureMemoryRequirementsNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html) structure

* 
[](#VUID-vkGetAccelerationStructureMemoryRequirementsNV-pMemoryRequirements-parameter) VUID-vkGetAccelerationStructureMemoryRequirementsNV-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2KHR](VkMemoryRequirements2.html) structure

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html), [VkDevice](VkDevice.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetAccelerationStructureMemoryRequirementsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
