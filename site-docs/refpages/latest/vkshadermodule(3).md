# VkShaderModule(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderModule.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderModule - Opaque handle to a shader module object

*Shader modules* contain *shader code* and one or more entry points.
Shaders are selected from a shader module by specifying an entry point as
part of [pipeline](../../../../spec/latest/chapters/pipelines.html#pipelines) creation.
The stages of a pipeline **can** use shaders that come from different modules.
The shader code defining a shader module **must** be in the SPIR-V format, as
described by the [Vulkan Environment for SPIR-V](../../../../spec/latest/appendices/spirvenv.html#spirvenv) appendix.

Shader modules are represented by `VkShaderModule` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkShaderModule)

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [vkCreateShaderModule](vkCreateShaderModule.html), [vkDestroyShaderModule](vkDestroyShaderModule.html), [vkGetShaderModuleIdentifierEXT](vkGetShaderModuleIdentifierEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderModule).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
