# VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM - Structure describing shader core builtins properties supported by an implementation

The `VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM` structure is
defined as:

// Provided by VK_ARM_shader_core_builtins
typedef struct VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           shaderCoreMask;
    uint32_t           shaderCoreCount;
    uint32_t           shaderWarpsPerCore;
} VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderCoreMask` is a bitfield where each
bit set represents the presence of a shader core whose ID is the bit
position.
The highest ID for any shader core on the device is the position of the
most significant bit set.

* 
 `shaderCoreCount` is the number of shader
cores on the device.

* 
 `shaderWarpsPerCore` is the maximum
number of simultaneously executing warps on a shader core.

If the `VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM-sType-sType) VUID-VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_BUILTINS_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_shader_core_builtins](VK_ARM_shader_core_builtins.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
