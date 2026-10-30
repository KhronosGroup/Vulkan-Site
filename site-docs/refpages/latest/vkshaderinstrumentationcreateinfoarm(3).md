# VkShaderInstrumentationCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderInstrumentationCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderInstrumentationCreateInfoARM - Structure specifying parameters of a newly created shader instrumentation

The `VkShaderInstrumentationCreateInfoARM` structure is defined as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkShaderInstrumentationCreateInfoARM {
    VkStructureType    sType;
    void*              pNext;
} VkShaderInstrumentationCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkShaderInstrumentationCreateInfoARM-sType-sType) VUID-VkShaderInstrumentationCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkShaderInstrumentationCreateInfoARM-pNext-pNext) VUID-VkShaderInstrumentationCreateInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkStructureType](VkStructureType.html), [vkCreateShaderInstrumentationARM](vkCreateShaderInstrumentationARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderInstrumentationCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
