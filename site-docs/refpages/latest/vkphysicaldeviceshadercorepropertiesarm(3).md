# VkPhysicalDeviceShaderCorePropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderCorePropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderCorePropertiesARM - Structure describing shader core properties that can be supported by an implementation

The `VkPhysicalDeviceShaderCorePropertiesARM` structure is defined as:

// Provided by VK_ARM_shader_core_properties
typedef struct VkPhysicalDeviceShaderCorePropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           pixelRate;
    uint32_t           texelRate;
    uint32_t           fmaRate;
} VkPhysicalDeviceShaderCorePropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pixelRate` is an unsigned integer value indicating the maximum
number of pixels output per clock per shader core.

* 
`texelRate` is an unsigned integer value indicating the maximum
number of texels per clock per shader core.

* 
`fmaRate` is an unsigned integer value indicating the maximum number
of single-precision fused multiply-add operations per clock per shader
core.

If a throughput rate cannot be determined on the physical device, the value
`0` will be returned for that rate.

If the `VkPhysicalDeviceShaderCorePropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCorePropertiesARM-sType-sType) VUID-VkPhysicalDeviceShaderCorePropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_shader_core_properties](VK_ARM_shader_core_properties.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderCorePropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
