# vkGetPipelineIndirectMemoryRequirementsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPipelineIndirectMemoryRequirementsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPipelineIndirectMemoryRequirementsNV - Get the memory requirements for the compute indirect pipeline

To determine the memory requirements for a compute pipeline’s metadata,
call:

// Provided by VK_NV_device_generated_commands_compute
void vkGetPipelineIndirectMemoryRequirementsNV(
    VkDevice                                    device,
    const VkComputePipelineCreateInfo*          pCreateInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pCreateInfo` is a [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html) structure
specifying the creation parameters of the compute pipeline whose memory
requirements are being queried.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html)
structure in which the requested pipeline’s memory requirements are
returned.

If `pCreateInfo->pNext` chain includes a pointer to a
[VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html) structure, then the contents of
that structure are ignored.

Valid Usage

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-deviceGeneratedComputePipelines-09082) VUID-vkGetPipelineIndirectMemoryRequirementsNV-deviceGeneratedComputePipelines-09082

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-09083) VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-09083

`pCreateInfo->flags` **must** include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-device-parameter) VUID-vkGetPipelineIndirectMemoryRequirementsNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-parameter) VUID-vkGetPipelineIndirectMemoryRequirementsNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html) structure

* 
[](#VUID-vkGetPipelineIndirectMemoryRequirementsNV-pMemoryRequirements-parameter) VUID-vkGetPipelineIndirectMemoryRequirementsNV-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](VkMemoryRequirements2.html) structure

[VK_NV_device_generated_commands_compute](VK_NV_device_generated_commands_compute.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkDevice](VkDevice.html), [VkMemoryRequirements2](VkMemoryRequirements2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#vkGetPipelineIndirectMemoryRequirementsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
