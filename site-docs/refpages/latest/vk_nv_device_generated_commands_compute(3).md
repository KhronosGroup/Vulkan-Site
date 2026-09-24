# VK_NV_device_generated_commands_compute(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_device_generated_commands_compute.html

## Table of Contents

- [Name](#_name)
- [VK_NV_device_generated_commands_compute](#VK_NV_device_generated_commands_compute)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_device_generated_commands_compute - device extension

**Name String**

`VK_NV_device_generated_commands_compute`

**Extension Type**

Device extension

**Registered Extension Number**

429

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html)

**Contact**

* 
Vikram Kushwaha [vkushwaha-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_device_generated_commands_compute] @vkushwaha-nv%0A*Here describe the issue or question you have about the VK_NV_device_generated_commands_compute extension*)

**Last Modified Date**

2023-07-21

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Jeff Bolz, NVIDIA

* 
Christoph Kubisch, NVIDIA

* 
Piers Daniell, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Hans-Kristian Arntzen, Valve

* 
Mike Blumenkrantz, VALVE

This extension allows the device to generate commands for binding compute
pipelines, setting push constants and launching compute dispatches.

* 
[vkCmdUpdatePipelineIndirectBufferNV](vkCmdUpdatePipelineIndirectBufferNV.html)

* 
[vkGetPipelineIndirectDeviceAddressNV](vkGetPipelineIndirectDeviceAddressNV.html)

* 
[vkGetPipelineIndirectMemoryRequirementsNV](vkGetPipelineIndirectMemoryRequirementsNV.html)

* 
[VkBindPipelineIndirectCommandNV](VkBindPipelineIndirectCommandNV.html)

* 
[VkPipelineIndirectDeviceAddressInfoNV](VkPipelineIndirectDeviceAddressInfoNV.html)

* 
Extending [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html):

[VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV](VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV.html)

* 
`VK_NV_DEVICE_GENERATED_COMMANDS_COMPUTE_EXTENSION_NAME`

* 
`VK_NV_DEVICE_GENERATED_COMMANDS_COMPUTE_SPEC_VERSION`

* 
Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

[VK_DESCRIPTOR_SET_LAYOUT_CREATE_INDIRECT_BINDABLE_BIT_NV](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkIndirectCommandsTokenTypeNV](VkIndirectCommandsTokenTypeNV.html):

* 
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_DISPATCH_NV](VkIndirectCommandsTokenTypeNV.html)

* 
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_INDIRECT_BUFFER_INFO_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_COMPUTE_FEATURES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_INDIRECT_DEVICE_ADDRESS_INFO_NV](VkStructureType.html)

* 
Revision 2, 2023-07-21 (Vikram Kushwaha)

Rename vkCmdUpdatePipelineIndirectBuffer to
vkCmdUpdatePipelineIndirectBufferNV

Revision 1, 2023-06-09 (Vikram Kushwaha)

* 
First Revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_device_generated_commands_compute).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
