# VkPhysicalDeviceShaderInstrumentationPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderInstrumentationPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderInstrumentationPropertiesARM - Structure describing shader instrumentation properties for a physical device

The `VkPhysicalDeviceShaderInstrumentationPropertiesARM` structure is
defined as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkPhysicalDeviceShaderInstrumentationPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           numMetrics;
    VkBool32           perBasicBlockGranularity;
} VkPhysicalDeviceShaderInstrumentationPropertiesARM;

The members of the `VkPhysicalDeviceShaderInstrumentationPropertiesARM`
structure describe the following:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`numMetrics` is the number of shader instrumentation metrics
supported.

* 
`perBasicBlockGranularity` is a boolean value indicating whether
shader instrumentation metrics are returned per basic block.
If this is [VK_FALSE](VK_FALSE.html), then all metrics for the shader are reported
as basic block index `0`.

If the `VkPhysicalDeviceShaderInstrumentationPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderInstrumentationPropertiesARM-sType-sType) VUID-VkPhysicalDeviceShaderInstrumentationPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INSTRUMENTATION_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderInstrumentationPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
