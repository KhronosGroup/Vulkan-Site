# vkGetShaderModuleIdentifierEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetShaderModuleIdentifierEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetShaderModuleIdentifierEXT - Query a unique identifier for a shader module

Shader modules have unique identifiers associated with them.
To query an implementation provided identifier, call:

// Provided by VK_EXT_shader_module_identifier
void vkGetShaderModuleIdentifierEXT(
    VkDevice                                    device,
    VkShaderModule                              shaderModule,
    VkShaderModuleIdentifierEXT*                pIdentifier);

* 
`device` is the logical device that created the shader module.

* 
`shaderModule` is the handle of the shader module.

* 
`pIdentifier` is a pointer to the returned
[VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html).

The identifier returned by the implementation **must** only depend on
`shaderIdentifierAlgorithmUUID` and information provided in the
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) which created `shaderModule`.
The implementation **may** return equal identifiers for two different
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structures if the difference does not affect
pipeline compilation.
Identifiers are only meaningful on different [VkDevice](VkDevice.html) objects if the
device the identifier was queried from had the same
[`shaderModuleIdentifierAlgorithmUUID`](../../../../spec/latest/chapters/limits.html#limits-shaderModuleIdentifierAlgorithmUUID) as the device consuming the
identifier.

Valid Usage

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-shaderModuleIdentifier-06884) VUID-vkGetShaderModuleIdentifierEXT-shaderModuleIdentifier-06884

[`shaderModuleIdentifier`](../../../../spec/latest/chapters/features.html#features-shaderModuleIdentifier)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-device-parameter) VUID-vkGetShaderModuleIdentifierEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parameter) VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parameter

 `shaderModule` **must** be a valid [VkShaderModule](VkShaderModule.html) handle

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-pIdentifier-parameter) VUID-vkGetShaderModuleIdentifierEXT-pIdentifier-parameter

 `pIdentifier` **must** be a valid pointer to a [VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html) structure

* 
[](#VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parent) VUID-vkGetShaderModuleIdentifierEXT-shaderModule-parent

 `shaderModule` **must** have been created, allocated, or retrieved from `device`

[VK_EXT_shader_module_identifier](VK_EXT_shader_module_identifier.html), [VkDevice](VkDevice.html), [VkShaderModule](VkShaderModule.html), [VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetShaderModuleIdentifierEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
