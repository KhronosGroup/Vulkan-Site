# vkGetPipelineIndirectDeviceAddressNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPipelineIndirectDeviceAddressNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPipelineIndirectDeviceAddressNV - Get pipeline’s 64-bit device address

To query a compute pipeline’s 64-bit device address, call:

// Provided by VK_NV_device_generated_commands_compute
VkDeviceAddress vkGetPipelineIndirectDeviceAddressNV(
    VkDevice                                    device,
    const VkPipelineIndirectDeviceAddressInfoNV* pInfo);

* 
`device` is the logical device on which the pipeline was created.

* 
`pInfo` is a pointer to a
[VkPipelineIndirectDeviceAddressInfoNV](VkPipelineIndirectDeviceAddressInfoNV.html) structure specifying the
pipeline to retrieve the address for.

Valid Usage

* 
[](#VUID-vkGetPipelineIndirectDeviceAddressNV-deviceGeneratedComputePipelines-09078) VUID-vkGetPipelineIndirectDeviceAddressNV-deviceGeneratedComputePipelines-09078

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineIndirectDeviceAddressNV-device-parameter) VUID-vkGetPipelineIndirectDeviceAddressNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPipelineIndirectDeviceAddressNV-pInfo-parameter) VUID-vkGetPipelineIndirectDeviceAddressNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkPipelineIndirectDeviceAddressInfoNV](VkPipelineIndirectDeviceAddressInfoNV.html) structure

[VK_NV_device_generated_commands_compute](VK_NV_device_generated_commands_compute.html), [VkDevice](VkDevice.html), [VkPipelineIndirectDeviceAddressInfoNV](VkPipelineIndirectDeviceAddressInfoNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkGetPipelineIndirectDeviceAddressNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
