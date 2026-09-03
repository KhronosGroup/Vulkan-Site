# VkPhysicalDeviceShaderCoreProperties2AMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderCoreProperties2AMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderCoreProperties2AMD - Structure describing shader core properties that can be supported by an implementation

The `VkPhysicalDeviceShaderCoreProperties2AMD` structure is defined as:

// Provided by VK_AMD_shader_core_properties2
typedef struct VkPhysicalDeviceShaderCoreProperties2AMD {
    VkStructureType                   sType;
    void*                             pNext;
    VkShaderCorePropertiesFlagsAMD    shaderCoreFeatures;
    uint32_t                          activeComputeUnitCount;
} VkPhysicalDeviceShaderCoreProperties2AMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderCoreFeatures` is a bitmask of
[VkShaderCorePropertiesFlagBitsAMD](VkShaderCorePropertiesFlagBitsAMD.html) indicating the set of features
supported by the shader core.

* 
 `activeComputeUnitCount` is an
unsigned integer value indicating the number of compute units that have
been enabled.

If the `VkPhysicalDeviceShaderCoreProperties2AMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCoreProperties2AMD-sType-sType) VUID-VkPhysicalDeviceShaderCoreProperties2AMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_2_AMD](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_AMD_shader_core_properties2](VK_AMD_shader_core_properties2.html), [VkShaderCorePropertiesFlagsAMD](VkShaderCorePropertiesFlagsAMD.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderCoreProperties2AMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
