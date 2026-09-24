# vkGetGeneratedCommandsMemoryRequirementsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetGeneratedCommandsMemoryRequirementsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetGeneratedCommandsMemoryRequirementsNV - Retrieve the buffer allocation requirements for generated commands

With `[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html)`, to retrieve the memory size
and alignment requirements of a particular execution state call:

// Provided by VK_NV_device_generated_commands
void vkGetGeneratedCommandsMemoryRequirementsNV(
    VkDevice                                    device,
    const VkGeneratedCommandsMemoryRequirementsInfoNV* pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pInfo` is a pointer to a
[VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html) structure containing
parameters required for the memory requirements query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-deviceGeneratedCommands-02906) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-deviceGeneratedCommands-02906

The [    `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCommandsNV)
feature **must** be enabled

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-09074) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-09074

If `pInfo->pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedCompute`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedCompute)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-device-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html) structure

* 
[](#VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pMemoryRequirements-parameter) VUID-vkGetGeneratedCommandsMemoryRequirementsNV-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkDevice](VkDevice.html), [VkGeneratedCommandsMemoryRequirementsInfoNV](VkGeneratedCommandsMemoryRequirementsInfoNV.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkGetGeneratedCommandsMemoryRequirementsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
