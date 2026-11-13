# vkGetGeneratedCommandsMemoryRequirementsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetGeneratedCommandsMemoryRequirementsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetGeneratedCommandsMemoryRequirementsEXT - Retrieve the buffer allocation requirements for generated commands

With `[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html)`, to retrieve the memory size
and alignment requirements of a particular execution state call:

// Provided by VK_EXT_device_generated_commands
void vkGetGeneratedCommandsMemoryRequirementsEXT(
    VkDevice                                    device,
    const VkGeneratedCommandsMemoryRequirementsInfoEXT* pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pInfo` is a pointer to a
[VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html) structure containing
parameters required for the memory requirements query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the buffer object are
returned.

If the size returned is zero, the preprocessing step can be skipped for this
layout.

Valid Usage (Implicit)

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-device-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pInfo-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html) structure

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pMemoryRequirements-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsEXT-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkDevice](VkDevice.html), [VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkGetGeneratedCommandsMemoryRequirementsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
