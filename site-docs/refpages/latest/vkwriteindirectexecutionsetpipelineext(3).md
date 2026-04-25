# VkWriteIndirectExecutionSetPipelineEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWriteIndirectExecutionSetPipelineEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWriteIndirectExecutionSetPipelineEXT - Struct specifying pipeline update information for an indirect execution set

The `VkWriteIndirectExecutionSetPipelineEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkWriteIndirectExecutionSetPipelineEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           index;
    VkPipeline         pipeline;
} VkWriteIndirectExecutionSetPipelineEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`index` is the element of the set to update

* 
`pipeline` is the pipeline to store in the indirect execution set

Valid Usage

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11026) VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11026

`index` **must** be less than the value of
`VkIndirectExecutionSetPipelineInfoEXT`::`maxPipelineCount` used
to create the set

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11027) VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11027

`pipeline` **must** have been created with
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11029) VUID-VkWriteIndirectExecutionSetPipelineEXT-index-11029

`index` **must** not be referenced by submitted command buffers

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11030) VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-11030

The shader stages contained in `pipeline` **must** be supported by
[](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStagesPipelineBinding`

Valid Usage (Implicit)

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-sType-sType) VUID-VkWriteIndirectExecutionSetPipelineEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_PIPELINE_EXT](VkStructureType.html)

* 
[](#VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-parameter) VUID-VkWriteIndirectExecutionSetPipelineEXT-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html), [vkUpdateIndirectExecutionSetPipelineEXT](vkUpdateIndirectExecutionSetPipelineEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkWriteIndirectExecutionSetPipelineEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
