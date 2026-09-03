# VkAccelerationStructureMemoryRequirementsInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAccelerationStructureMemoryRequirementsInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAccelerationStructureMemoryRequirementsInfoNV - Structure specifying acceleration to query for memory requirements

The `VkAccelerationStructureMemoryRequirementsInfoNV` structure is
defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkAccelerationStructureMemoryRequirementsInfoNV {
    VkStructureType                                    sType;
    const void*                                        pNext;
    VkAccelerationStructureMemoryRequirementsTypeNV    type;
    VkAccelerationStructureNV                          accelerationStructure;
} VkAccelerationStructureMemoryRequirementsInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` selects the type of memory requirement being queried.
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)
returns the memory requirements for the object itself.
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)
returns the memory requirements for the scratch memory when doing a
build.
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)
returns the memory requirements for the scratch memory when doing an
update.

* 
`accelerationStructure` is the acceleration structure to be queried
for memory requirements.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-sType-sType) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-pNext-pNext) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-type-parameter) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-type-parameter

 `type` **must** be a valid [VkAccelerationStructureMemoryRequirementsTypeNV](VkAccelerationStructureMemoryRequirementsTypeNV.html) value

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-accelerationStructure-parameter) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureMemoryRequirementsTypeNV](VkAccelerationStructureMemoryRequirementsTypeNV.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkStructureType](VkStructureType.html), [vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkAccelerationStructureMemoryRequirementsInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
