# VkShaderModuleCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderModuleCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderModuleCreateInfo - Structure specifying parameters of a newly created shader module

The `VkShaderModuleCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkShaderModuleCreateInfo {
    VkStructureType              sType;
    const void*                  pNext;
    VkShaderModuleCreateFlags    flags;
    size_t                       codeSize;
    const uint32_t*              pCode;
} VkShaderModuleCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`codeSize` is the size, in bytes, of the code pointed to by
`pCode`.

* 
`pCode` is a pointer to code that is used to create the shader
module.
The type and format of the code is determined from the content of the
memory addressed by `pCode`.

Valid Usage

* 
[](#VUID-VkShaderModuleCreateInfo-codeSize-08735) VUID-VkShaderModuleCreateInfo-codeSize-08735

If pCode is a pointer to SPIR-V code, `codeSize` **must** be a multiple of 4

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08736) VUID-VkShaderModuleCreateInfo-pCode-08736

If pCode is a pointer to SPIR-V code, `pCode` **must** point to valid SPIR-V code,
formatted and packed as described by the [Khronos SPIR-V     Specification](../../../../spec/latest/chapters/introduction.html#spirv-spec)

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08737) VUID-VkShaderModuleCreateInfo-pCode-08737

If pCode is a pointer to SPIR-V code, `pCode` **must** adhere to the validation rules
described by the [Validation Rules within a     Module](../../../../spec/latest/appendices/spirvenv.html#spirvenv-module-validation) section of the [SPIR-V Environment](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities)
appendix

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08738) VUID-VkShaderModuleCreateInfo-pCode-08738

If pCode is a pointer to SPIR-V code, `pCode` **must** declare the `Shader` capability
for SPIR-V code

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08739) VUID-VkShaderModuleCreateInfo-pCode-08739

If pCode is a pointer to SPIR-V code, `pCode` **must** not declare any capability that is
not supported by the API, as described by the
[Capabilities](../../../../spec/latest/appendices/spirvenv.html#spirvenv-module-validation) section of the
[SPIR-V Environment](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities) appendix

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08740) VUID-VkShaderModuleCreateInfo-pCode-08740

If pCode is a pointer to SPIR-V code, and `pCode` declares any of the capabilities
listed in the [SPIR-V Environment](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table)
appendix, one of the corresponding requirements **must** be satisfied

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08741) VUID-VkShaderModuleCreateInfo-pCode-08741

If pCode is a pointer to SPIR-V code, `pCode` **must** not declare any SPIR-V extension
that is not supported by the API, as described by the
[Extension](../../../../spec/latest/appendices/spirvenv.html#spirvenv-extensions) section of the
[SPIR-V Environment](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities) appendix

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-08742) VUID-VkShaderModuleCreateInfo-pCode-08742

If pCode is a pointer to SPIR-V code, and `pCode` declares any of the SPIR-V extensions
listed in the [SPIR-V Environment](../../../../spec/latest/appendices/spirvenv.html#spirvenv-extensions-table)
appendix, one of the corresponding requirements **must** be satisfied

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-07912) VUID-VkShaderModuleCreateInfo-pCode-07912

If the [VK_NV_glsl_shader](VK_NV_glsl_shader.html) extension is not enabled, `pCode`
**must** be a pointer to SPIR-V code

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-01379) VUID-VkShaderModuleCreateInfo-pCode-01379

If `pCode` is a pointer to GLSL code, it **must** be valid GLSL code
written to the `GL_KHR_vulkan_glsl` GLSL extension specification

* 
[](#VUID-VkShaderModuleCreateInfo-codeSize-01085) VUID-VkShaderModuleCreateInfo-codeSize-01085

`codeSize` **must** be greater than 0

Valid Usage (Implicit)

* 
[](#VUID-VkShaderModuleCreateInfo-sType-sType) VUID-VkShaderModuleCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkShaderModuleCreateInfo-flags-zerobitmask) VUID-VkShaderModuleCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkShaderModuleCreateInfo-pCode-parameter) VUID-VkShaderModuleCreateInfo-pCode-parameter

 `pCode` **must** be a valid pointer to an array of    `uint32_t` values

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkShaderModuleCreateFlags](VkShaderModuleCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreateShaderModule](vkCreateShaderModule.html), [vkGetShaderModuleCreateInfoIdentifierEXT](vkGetShaderModuleCreateInfoIdentifierEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderModuleCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
