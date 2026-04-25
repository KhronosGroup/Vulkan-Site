# VkIndirectExecutionSetPipelineInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectExecutionSetPipelineInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectExecutionSetPipelineInfoEXT - Struct specifying parameters of a newly created indirect execution set containing only pipelines

The `VkIndirectExecutionSetPipelineInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetPipelineInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkPipeline         initialPipeline;
    uint32_t           maxPipelineCount;
} VkIndirectExecutionSetPipelineInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`initialPipeline` is the initial pipeline for the set.
This pipeline will be automatically added to the set at index `0`.

* 
`maxPipelineCount` is the maximum number of pipelines stored in the
set.

The characteristics of `initialPipeline` will be used to validate all
pipelines added to the set even if they are removed from the set or
destroyed.

When an Indirect Execution Set created with pipelines is used,
`initialPipeline` constitutes the initial shader state.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11015) VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11015

If [](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStagesPipelineBinding`
does not contain [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html), the
[VkPipelineBindPoint](VkPipelineBindPoint.html) of `initialPipeline` **must** not be
[VK_PIPELINE_BIND_POINT_COMPUTE](VkPipelineBindPoint.html)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11016) VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11016

If [](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStagesPipelineBinding`
does not contain [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html), the
[VkPipelineBindPoint](VkPipelineBindPoint.html) of `initialPipeline` **must** not be
[VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11017) VUID-VkIndirectExecutionSetPipelineInfoEXT-supportedIndirectCommandsShaderStagesPipelineBinding-11017

If [](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStagesPipelineBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStagesPipelineBinding`
does not contain ray tracing stages, the [VkPipelineBindPoint](VkPipelineBindPoint.html) of
`initialPipeline` **must** not be
[VK_PIPELINE_BIND_POINT_RAY_TRACING_KHR](VkPipelineBindPoint.html)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-maxPipelineCount-11018) VUID-VkIndirectExecutionSetPipelineInfoEXT-maxPipelineCount-11018

`maxPipelineCount` **must** be between `1` and
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT`::`maxIndirectPipelineCount`

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11019) VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11019

`initialPipeline` **must** not use descriptors of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11153) VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-11153

`initialPipeline` **must** have been created with
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](VkPipelineCreateFlagBits2.html)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-sType-sType) VUID-VkIndirectExecutionSetPipelineInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_PIPELINE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-parameter) VUID-VkIndirectExecutionSetPipelineInfoEXT-initialPipeline-parameter

 `initialPipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectExecutionSetInfoEXT](VkIndirectExecutionSetInfoEXT.html), [VkPipeline](VkPipeline.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectExecutionSetPipelineInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
