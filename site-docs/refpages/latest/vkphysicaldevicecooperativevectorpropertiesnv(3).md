# VkPhysicalDeviceCooperativeVectorPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCooperativeVectorPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCooperativeVectorPropertiesNV - Structure describing cooperative vector properties supported by an implementation

The `VkPhysicalDeviceCooperativeVectorPropertiesNV` structure is defined
as:

// Provided by VK_NV_cooperative_vector
typedef struct VkPhysicalDeviceCooperativeVectorPropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkShaderStageFlags    cooperativeVectorSupportedStages;
    VkBool32              cooperativeVectorTrainingFloat16Accumulation;
    VkBool32              cooperativeVectorTrainingFloat32Accumulation;
    uint32_t              maxCooperativeVectorComponents;
} VkPhysicalDeviceCooperativeVectorPropertiesNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeVectorSupportedStages` is a bitfield of
[VkShaderStageFlagBits](VkShaderStageFlagBits.html) describing the shader stages that
cooperative vector instructions are supported in.
`cooperativeVectorSupportedStages` will have the
[VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) bit set if any of the physical
device’s queues support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html).

* 

`cooperativeVectorTrainingFloat16Accumulation` is [VK_TRUE](VK_TRUE.html) if
the implementation supports cooperative vector training functions
accumulating 16-bit floating-point results.

* 

`cooperativeVectorTrainingFloat32Accumulation` is [VK_TRUE](VK_TRUE.html) if
the implementation supports cooperative vector training functions
accumulating 32-bit floating-point results.

* 

`maxCooperativeVectorComponents` indicates the maximum number of
components that **can** be in a cooperative vector.

If the `VkPhysicalDeviceCooperativeVectorPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeVectorPropertiesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeVectorPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_VECTOR_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_cooperative_vector](VK_NV_cooperative_vector.html), `VkBool32`, [VkShaderStageFlags](VkShaderStageFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceCooperativeVectorPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
