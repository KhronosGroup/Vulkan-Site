# VkBindShaderGroupIndirectCommandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindShaderGroupIndirectCommandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindShaderGroupIndirectCommandNV - Structure specifying input data for a single shader group command token

The `VkBindShaderGroupIndirectCommandNV` structure specifies the input
data for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_SHADER_GROUP_NV](VkIndirectCommandsTokenTypeNV.html) token.

// Provided by VK_NV_device_generated_commands
typedef struct VkBindShaderGroupIndirectCommandNV {
    uint32_t    groupIndex;
} VkBindShaderGroupIndirectCommandNV;

* 
`groupIndex` specifies which shader group of the current bound
graphics pipeline is used.

Valid Usage

* 
[](#VUID-VkBindShaderGroupIndirectCommandNV-None-02944) VUID-VkBindShaderGroupIndirectCommandNV-None-02944

The current bound graphics pipeline, as well as the pipelines it may
reference, **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkBindShaderGroupIndirectCommandNV-index-02945) VUID-VkBindShaderGroupIndirectCommandNV-index-02945

The `index` **must** be within range of the accessible shader groups of
the current bound graphics pipeline.
See [vkCmdBindPipelineShaderGroupNV](vkCmdBindPipelineShaderGroupNV.html) for further details

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkBindShaderGroupIndirectCommandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
