# VkMemoryRequirements2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryRequirements2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryRequirements2 - Structure specifying memory requirements

The `VkMemoryRequirements2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryRequirements2 {
    VkStructureType         sType;
    void*                   pNext;
    VkMemoryRequirements    memoryRequirements;
} VkMemoryRequirements2;

// Provided by VK_KHR_get_memory_requirements2, VK_NV_ray_tracing with VK_KHR_get_memory_requirements2 or VK_VERSION_1_1
// Equivalent to VkMemoryRequirements2
typedef VkMemoryRequirements2 VkMemoryRequirements2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryRequirements` is a [VkMemoryRequirements](VkMemoryRequirements.html) structure
describing the memory requirements of the resource.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryRequirements2-sType-sType) VUID-VkMemoryRequirements2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2](VkStructureType.html)

* 
[](#VUID-VkMemoryRequirements2-pNext-pNext) VUID-VkMemoryRequirements2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkMemoryDedicatedRequirements](VkMemoryDedicatedRequirements.html) or [VkTileMemoryRequirementsQCOM](VkTileMemoryRequirementsQCOM.html)

* 
[](#VUID-VkMemoryRequirements2-sType-unique) VUID-VkMemoryRequirements2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html), [VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkMemoryRequirements](VkMemoryRequirements.html), [VkStructureType](VkStructureType.html), [vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html), [vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html), [vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html), [vkGetDataGraphPipelineSessionMemoryRequirementsARM](vkGetDataGraphPipelineSessionMemoryRequirementsARM.html), [vkGetDeviceBufferMemoryRequirements](vkGetDeviceBufferMemoryRequirements.html), [vkGetDeviceBufferMemoryRequirements](vkGetDeviceBufferMemoryRequirements.html), [vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html), [vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html), [vkGetDeviceTensorMemoryRequirementsARM](vkGetDeviceTensorMemoryRequirementsARM.html), [vkGetGeneratedCommandsMemoryRequirementsEXT](vkGetGeneratedCommandsMemoryRequirementsEXT.html), [vkGetGeneratedCommandsMemoryRequirementsNV](vkGetGeneratedCommandsMemoryRequirementsNV.html), [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html), [vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html), [vkGetPipelineIndirectMemoryRequirementsNV](vkGetPipelineIndirectMemoryRequirementsNV.html), [vkGetTensorMemoryRequirementsARM](vkGetTensorMemoryRequirementsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkMemoryRequirements2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
