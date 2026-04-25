# VkGeneratedCommandsMemoryRequirementsInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeneratedCommandsMemoryRequirementsInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeneratedCommandsMemoryRequirementsInfoNV - Structure specifying parameters for the reservation of preprocess buffer space

// Provided by VK_NV_device_generated_commands
typedef struct VkGeneratedCommandsMemoryRequirementsInfoNV {
    VkStructureType               sType;
    const void*                   pNext;
    VkPipelineBindPoint           pipelineBindPoint;
    VkPipeline                    pipeline;
    VkIndirectCommandsLayoutNV    indirectCommandsLayout;
    uint32_t                      maxSequencesCount;
} VkGeneratedCommandsMemoryRequirementsInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineBindPoint` is the [VkPipelineBindPoint](VkPipelineBindPoint.html) of the
`pipeline` that this buffer memory is intended to be used with
during the execution.

* 
`pipeline` is the [VkPipeline](VkPipeline.html) that this buffer memory is
intended to be used with during the execution.

* 
`indirectCommandsLayout` is the [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html)
that this buffer memory is intended to be used with.

* 
`maxSequencesCount` is the maximum number of sequences that this
buffer memory in combination with the other state provided **can** be used
with.

Valid Usage

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-maxSequencesCount-02907) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-maxSequencesCount-02907

`maxSequencesCount` **must** be less or equal to
[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV.html)::`maxIndirectSequenceCount`

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09075) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09075

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html), then `pipeline` **must** be a
valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09076) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09076

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), and the
`indirectCommandsLayout` was not created with a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html) token, then the
`pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09077) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-09077

If `pipelineBindPoint` is of type
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html), and the
`indirectCommandsLayout` contains a
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PIPELINE_NV](VkIndirectCommandsTokenTypeNV.html) token, then the
`pipeline` **must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-sType-sType) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pNext-pNext) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipeline-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-indirectCommandsLayout-parameter) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-indirectCommandsLayout-parameter

 `indirectCommandsLayout` **must** be a valid [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html) handle

* 
[](#VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-commonparent) VUID-VkGeneratedCommandsMemoryRequirementsInfoNV-commonparent

 Both of `indirectCommandsLayout`, and `pipeline` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html), [VkPipeline](VkPipeline.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkStructureType](VkStructureType.html), [vkGetGeneratedCommandsMemoryRequirementsNV](vkGetGeneratedCommandsMemoryRequirementsNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkGeneratedCommandsMemoryRequirementsInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
