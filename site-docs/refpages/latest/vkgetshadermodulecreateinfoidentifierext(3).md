# vkGetShaderModuleCreateInfoIdentifierEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetShaderModuleCreateInfoIdentifierEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetShaderModuleCreateInfoIdentifierEXT - Query a unique identifier for a shader module create info

[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structures have unique identifiers associated
with them.
To query an implementation provided identifier, call:

// Provided by VK_EXT_shader_module_identifier
void vkGetShaderModuleCreateInfoIdentifierEXT(
    VkDevice                                    device,
    const VkShaderModuleCreateInfo*             pCreateInfo,
    VkShaderModuleIdentifierEXT*                pIdentifier);

* 
`device` is the logical device that **can** create a
[VkShaderModule](VkShaderModule.html) from `pCreateInfo`.

* 
`pCreateInfo` is a pointer to a [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)
structure.

* 
`pIdentifier` is a pointer to the returned
[VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html).

The identifier returned by implementation **must** only depend on
`shaderIdentifierAlgorithmUUID` and information provided in the
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html).
The implementation **may** return equal identifiers for two different
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structures if the difference does not affect
pipeline compilation.
Identifiers are only meaningful on different [VkDevice](VkDevice.html) objects if the
device the identifier was queried from had the same
[`shaderModuleIdentifierAlgorithmUUID`](../../../../spec/latest/chapters/limits.html#limits-shaderModuleIdentifierAlgorithmUUID) as the device consuming the
identifier.

The identifier returned by the implementation in
[vkGetShaderModuleCreateInfoIdentifierEXT](#) **must** be equal to the
identifier returned by [vkGetShaderModuleIdentifierEXT](vkGetShaderModuleIdentifierEXT.html) given equivalent
definitions of [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) and any chained `pNext`
structures.

Valid Usage

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-shaderModuleIdentifier-06885) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-shaderModuleIdentifier-06885

[`shaderModuleIdentifier`](../../../../spec/latest/chapters/features.html#features-shaderModuleIdentifier)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-device-parameter) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pCreateInfo-parameter) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) structure

* 
[](#VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pIdentifier-parameter) VUID-vkGetShaderModuleCreateInfoIdentifierEXT-pIdentifier-parameter

 `pIdentifier` **must** be a valid pointer to a [VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html) structure

[VK_EXT_shader_module_identifier](VK_EXT_shader_module_identifier.html), [VkDevice](VkDevice.html), [VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html), [VkShaderModuleIdentifierEXT](VkShaderModuleIdentifierEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkGetShaderModuleCreateInfoIdentifierEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
