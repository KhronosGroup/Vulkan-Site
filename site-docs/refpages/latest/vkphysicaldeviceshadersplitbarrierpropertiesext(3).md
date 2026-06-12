# VkPhysicalDeviceShaderSplitBarrierPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderSplitBarrierPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderSplitBarrierPropertiesEXT - Structure describing split barrier properties supported by an implementation

The `VkPhysicalDeviceShaderSplitBarrierPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_shader_split_barrier
typedef struct VkPhysicalDeviceShaderSplitBarrierPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           splitBarrierReservedSharedMemory;
} VkPhysicalDeviceShaderSplitBarrierPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`splitBarrierReservedSharedMemory` is the number of bytes of shared
memory reserved for the implementation when the module executes
`OpControlBarrierArriveEXT` or `OpControlBarrierWaitEXT`
instructions

If the `VkPhysicalDeviceShaderSplitBarrierPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSplitBarrierPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderSplitBarrierPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SPLIT_BARRIER_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_shader_split_barrier](VK_EXT_shader_split_barrier.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderSplitBarrierPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
