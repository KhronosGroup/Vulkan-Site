# VkPipelineShaderStageModuleIdentifierCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineShaderStageModuleIdentifierCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineShaderStageModuleIdentifierCreateInfoEXT - Structure specifying an identifier for a shader module

An identifier **can** be provided instead of shader code in an attempt to
compile pipelines without providing complete SPIR-V to the implementation.

The `VkPipelineShaderStageModuleIdentifierCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_shader_module_identifier
typedef struct VkPipelineShaderStageModuleIdentifierCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           identifierSize;
    const uint8_t*     pIdentifier;
} VkPipelineShaderStageModuleIdentifierCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`identifierSize` is the size, in bytes, of the buffer pointed to by
`pIdentifier`.

* 
`pIdentifier` is a pointer to a buffer of opaque data specifying an
identifier.

Any identifier **can** be used.
If the pipeline being created with identifier requires compilation to
complete the pipeline creation call, pipeline compilation **must** fail as
defined by [VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html).

`pIdentifier` and `identifierSize` **can** be obtained from an
[VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html) queried earlier.

Valid Usage

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06850) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06850

If this structure is included in a `pNext` chain and
`identifierSize` is not equal to 0, the
[`shaderModuleIdentifier`](../../../../spec/latest/chapters/features.html#features-shaderModuleIdentifier)
feature **must** be enabled

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06851) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pNext-06851

If this structure is included in a `pNext` chain of
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) and `identifierSize` is not
equal to 0, the pipeline **must** be created with the
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html) flag set

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-identifierSize-06852) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-identifierSize-06852

`identifierSize` **must** be less-or-equal to
[VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT](VK_MAX_SHADER_MODULE_IDENTIFIER_SIZE_EXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-sType-sType) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_MODULE_IDENTIFIER_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pIdentifier-parameter) VUID-VkPipelineShaderStageModuleIdentifierCreateInfoEXT-pIdentifier-parameter

 If `identifierSize` is not `0`, `pIdentifier` **must** be a valid pointer to an array of `identifierSize` `uint8_t` values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

[VK_EXT_shader_module_identifier](VK_EXT_shader_module_identifier.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineShaderStageModuleIdentifierCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
