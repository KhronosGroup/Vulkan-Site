# VkIndirectExecutionSetEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectExecutionSetEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectExecutionSetEXT - Opaque handle to an indirect execution set object

Indirect Execution Sets contain sets of pipelines
or shader objects
which can be bound individually.

// Provided by VK_EXT_device_generated_commands
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkIndirectExecutionSetEXT)

Indirect Execution Sets allow the device to bind different shaders and
pipeline states using [Device-Generated Commands](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#device-generated-commands).

[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html), [VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html), [VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html), [vkCreateIndirectExecutionSetEXT](vkCreateIndirectExecutionSetEXT.html), [vkDestroyIndirectExecutionSetEXT](vkDestroyIndirectExecutionSetEXT.html), [vkUpdateIndirectExecutionSetPipelineEXT](vkUpdateIndirectExecutionSetPipelineEXT.html), [vkUpdateIndirectExecutionSetShaderEXT](vkUpdateIndirectExecutionSetShaderEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectExecutionSetEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
