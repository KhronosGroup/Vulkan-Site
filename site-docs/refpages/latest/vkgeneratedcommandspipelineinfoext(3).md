# VkGeneratedCommandsPipelineInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeneratedCommandsPipelineInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeneratedCommandsPipelineInfoEXT - Structure specifying a pipeline for use with indirect command preprocessing

// Provided by VK_EXT_device_generated_commands
typedef struct VkGeneratedCommandsPipelineInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    VkPipeline         pipeline;
} VkGeneratedCommandsPipelineInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipeline` is a valid pipeline object.

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsPipelineInfoEXT-sType-sType) VUID-VkGeneratedCommandsPipelineInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_PIPELINE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkGeneratedCommandsPipelineInfoEXT-pipeline-parameter) VUID-VkGeneratedCommandsPipelineInfoEXT-pipeline-parameter

 `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html)

* 
[VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html)

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkGeneratedCommandsPipelineInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
