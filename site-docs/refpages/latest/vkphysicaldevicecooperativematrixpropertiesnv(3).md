# VkPhysicalDeviceCooperativeMatrixPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCooperativeMatrixPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCooperativeMatrixPropertiesNV - Structure describing cooperative matrix properties supported by an implementation

The `VkPhysicalDeviceCooperativeMatrixPropertiesNV` structure is defined
as:

// Provided by VK_NV_cooperative_matrix
typedef struct VkPhysicalDeviceCooperativeMatrixPropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkShaderStageFlags    cooperativeMatrixSupportedStages;
} VkPhysicalDeviceCooperativeMatrixPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixSupportedStages` is a bitfield of
[VkShaderStageFlagBits](VkShaderStageFlagBits.html) describing the shader stages that
cooperative matrix instructions are supported in.
`cooperativeMatrixSupportedStages` will have the
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) bit set if any of the physical
device’s queues support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html).

If the `VkPhysicalDeviceCooperativeMatrixPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixPropertiesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_cooperative_matrix](VK_NV_cooperative_matrix.html), [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceCooperativeMatrixPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
