# VkIndirectCommandsExecutionSetTokenEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectCommandsExecutionSetTokenEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectCommandsExecutionSetTokenEXT - Structure specifying input data for a single execution set command token

The `VkIndirectCommandsExecutionSetTokenEXT` structure specifies the
input data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_EXECUTION_SET_EXT](VkIndirectCommandsTokenTypeEXT.html)
token.

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectCommandsExecutionSetTokenEXT {
    VkIndirectExecutionSetInfoTypeEXT    type;
    VkShaderStageFlags                   shaderStages;
} VkIndirectCommandsExecutionSetTokenEXT;

* 
`type` describes the type of indirect execution set in use.

* 
`shaderStages` specifies the shaders that will be changed by this
token.

Valid Usage

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-11137) VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-11137

Each bit in `shaderStages` **must** be supported by
[](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStagesPipelineBinding`
or [](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStagesShaderBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStagesShaderBinding`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-type-parameter) VUID-VkIndirectCommandsExecutionSetTokenEXT-type-parameter

 `type` **must** be a valid [VkIndirectExecutionSetInfoTypeEXT](VkIndirectExecutionSetInfoTypeEXT.html) value

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-parameter) VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-parameter

 `shaderStages` **must** be a valid combination of [VkShaderStageFlagBits](VkShaderStageFlagBits.html) values

* 
[](#VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-requiredbitmask) VUID-VkIndirectCommandsExecutionSetTokenEXT-shaderStages-requiredbitmask

 `shaderStages` **must** not be `0`

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsTokenDataEXT](VkIndirectCommandsTokenDataEXT.html), [VkIndirectExecutionSetInfoTypeEXT](VkIndirectExecutionSetInfoTypeEXT.html), [VkShaderStageFlags](VkShaderStageFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsExecutionSetTokenEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
