# VkComputePipelineIndirectBufferInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkComputePipelineIndirectBufferInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkComputePipelineIndirectBufferInfoNV - Structure describing the device address where pipeline’s metadata will be saved

The `VkComputePipelineIndirectBufferInfoNV` structure is defined as:

// Provided by VK_NV_device_generated_commands_compute
typedef struct VkComputePipelineIndirectBufferInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceAddress    deviceAddress;
    VkDeviceSize       size;
    VkDeviceAddress    pipelineDeviceAddressCaptureReplay;
} VkComputePipelineIndirectBufferInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceAddress` is the address where the pipeline’s metadata will be
stored.

* 
`size` is the size of pipeline’s metadata that was queried using
[vkGetPipelineIndirectMemoryRequirementsNV](vkGetPipelineIndirectMemoryRequirementsNV.html).

* 
`pipelineDeviceAddressCaptureReplay` is the device address where
pipeline’s metadata was originally saved and can now be used to
re-populate `deviceAddress` for replay.

If `pipelineDeviceAddressCaptureReplay` is zero, no specific address is
requested.
If `pipelineDeviceAddressCaptureReplay` is not zero, then it **must** be an
address retrieved from an identically created pipeline on the same
implementation.
The pipeline metadata **must** also be placed on an identically created buffer
and at the same offset using the [vkCmdUpdatePipelineIndirectBufferNV](vkCmdUpdatePipelineIndirectBufferNV.html)
command.

Valid Usage

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceGeneratedComputePipelines-09009) VUID-VkComputePipelineIndirectBufferInfoNV-deviceGeneratedComputePipelines-09009

The [    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputePipelines`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-flags-09010) VUID-VkComputePipelineIndirectBufferInfoNV-flags-09010

The pipeline creation flags in
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)::`flags` **must** include
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09011) VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09011

`deviceAddress` **must** be aligned to the
[VkMemoryRequirements2](VkMemoryRequirements2.html)::`memoryRequirements.alignment`, as
returned by [vkGetPipelineIndirectMemoryRequirementsNV](vkGetPipelineIndirectMemoryRequirementsNV.html)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09012) VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-09012

`deviceAddress` **must** have been allocated from a buffer that was
created with both the [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) and
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flags set

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-size-09013) VUID-VkComputePipelineIndirectBufferInfoNV-size-09013

`size` **must** be greater than or equal to the
[VkMemoryRequirements2](VkMemoryRequirements2.html)::`memoryRequirements.size`, as returned
by [vkGetPipelineIndirectMemoryRequirementsNV](vkGetPipelineIndirectMemoryRequirementsNV.html)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09014) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09014

If `pipelineDeviceAddressCaptureReplay` is non-zero then the
[    `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`::`deviceGeneratedComputeCaptureReplay`](../../../../spec/latest/chapters/features.html#features-deviceGeneratedComputePipelines)
feature **must** be enabled

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09015) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09015

If `pipelineDeviceAddressCaptureReplay` is non-zero then that
address **must** have been allocated with flag
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html) set

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09016) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09016

If `pipelineDeviceAddressCaptureReplay` is non-zero, the
`pipeline` **must** have been recreated for replay

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09017) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-09017

`pipelineDeviceAddressCaptureReplay` **must** satisfy the
`alignment` and `size` requirements similar to
`deviceAddress`

Valid Usage (Implicit)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-sType-sType) VUID-VkComputePipelineIndirectBufferInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_INDIRECT_BUFFER_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-parameter) VUID-VkComputePipelineIndirectBufferInfoNV-deviceAddress-parameter

 `deviceAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-parameter) VUID-VkComputePipelineIndirectBufferInfoNV-pipelineDeviceAddressCaptureReplay-parameter

 If `pipelineDeviceAddressCaptureReplay` is not `0`, `pipelineDeviceAddressCaptureReplay` **must** be a valid `VkDeviceAddress` value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

[VK_NV_device_generated_commands_compute](VK_NV_device_generated_commands_compute.html), `VkDeviceAddress`, `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkComputePipelineIndirectBufferInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
