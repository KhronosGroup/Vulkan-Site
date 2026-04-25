# VkBindPipelineIndirectCommandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBindPipelineIndirectCommandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBindPipelineIndirectCommandNV - Structure specifying input data for the compute pipeline dispatch token

The `VkBindPipelineIndirectCommandNV` structure specifies the input data
for the [VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html) token.

// Provided by VK_NV_device_generated_commands_compute
typedef struct VkBindPipelineIndirectCommandNV {
    VkDeviceAddress    pipelineAddress;
} VkBindPipelineIndirectCommandNV;

* 
`pipelineAddress` specifies the pipeline address of the compute
pipeline that will be used in device generated rendering.

Valid Usage

* 
[](#VUID-VkBindPipelineIndirectCommandNV-deviceGeneratedComputePipelines-09091) VUID-VkBindPipelineIndirectCommandNV-deviceGeneratedComputePipelines-09091

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-VkBindPipelineIndirectCommandNV-None-09092) VUID-VkBindPipelineIndirectCommandNV-None-09092

The referenced pipeline **must** have been created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkBindPipelineIndirectCommandNV-None-09093) VUID-VkBindPipelineIndirectCommandNV-None-09093

The referenced pipeline **must** have been updated with
[vkCmdUpdatePipelineIndirectBufferNV](vkCmdUpdatePipelineIndirectBufferNV.html)

* 
[](#VUID-VkBindPipelineIndirectCommandNV-None-09094) VUID-VkBindPipelineIndirectCommandNV-None-09094

The referenced pipeline’s address **must** have been queried with
[vkGetPipelineIndirectDeviceAddressNV](vkGetPipelineIndirectDeviceAddressNV.html)

Valid Usage (Implicit)

* 
[](#VUID-VkBindPipelineIndirectCommandNV-pipelineAddress-parameter) VUID-VkBindPipelineIndirectCommandNV-pipelineAddress-parameter

 `pipelineAddress` **must** be a valid `VkDeviceAddress` value

[VK_NV_device_generated_commands_compute](VK_NV_device_generated_commands_compute.html), `VkDeviceAddress`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkBindPipelineIndirectCommandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
