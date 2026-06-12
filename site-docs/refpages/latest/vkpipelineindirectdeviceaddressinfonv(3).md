# VkPipelineIndirectDeviceAddressInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineIndirectDeviceAddressInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineIndirectDeviceAddressInfoNV - Structure specifying the pipeline to query an address for

The `VkPipelineIndirectDeviceAddressInfoNV` structure is defined as:

// Provided by VK_NV_device_generated_commands_compute
typedef struct VkPipelineIndirectDeviceAddressInfoNV {
    VkStructureType        sType;
    const void*            pNext;
    VkPipelineBindPoint    pipelineBindPoint;
    VkPipeline             pipeline;
} VkPipelineIndirectDeviceAddressInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) value specifying
the type of pipeline whose device address is being queried.

* 
`pipeline` specifies the pipeline whose device address is being
queried.

Valid Usage

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-09079) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-09079

The provided `pipelineBindPoint` **must** be of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html)

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09080) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09080

`pipeline` **must** have been created with flag
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits.html) set

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09081) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-09081

`pipeline` **must** have been created with a
[VkComputePipelineIndirectBufferInfoNV](VkComputePipelineIndirectBufferInfoNV.html) structure specifying a valid
address where its metadata will be saved

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-sType-sType) VUID-VkPipelineIndirectDeviceAddressInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_INDIRECT_DEVICE_ADDRESS_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pNext-pNext) VUID-VkPipelineIndirectDeviceAddressInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-parameter) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-parameter) VUID-VkPipelineIndirectDeviceAddressInfoNV-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

[VK_NV_device_generated_commands_compute](VK_NV_device_generated_commands_compute.html), [VkPipeline](VkPipeline.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkStructureType](VkStructureType.html), [vkGetPipelineIndirectDeviceAddressNV](vkGetPipelineIndirectDeviceAddressNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkPipelineIndirectDeviceAddressInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
