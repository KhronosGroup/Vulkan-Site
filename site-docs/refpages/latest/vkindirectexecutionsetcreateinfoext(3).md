# VkIndirectExecutionSetCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectExecutionSetCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectExecutionSetCreateInfoEXT - Structure specifying parameters of a newly created indirect execution set

The `VkIndirectExecutionSetCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetCreateInfoEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    VkIndirectExecutionSetInfoTypeEXT    type;
    VkIndirectExecutionSetInfoEXT        info;
} VkIndirectExecutionSetCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkIndirectExecutionSetInfoTypeEXT](VkIndirectExecutionSetInfoTypeEXT.html) describing the
type of set being created and determining which field of the `info`
union will be used.

* 
`info` is a [VkIndirectExecutionSetInfoEXT](VkIndirectExecutionSetInfoEXT.html) union containing
layout information for the set.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-maxIndirectShaderObjectCount-11014) VUID-VkIndirectExecutionSetCreateInfoEXT-maxIndirectShaderObjectCount-11014

If
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT`::`maxIndirectShaderObjectCount`
is zero
or the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is not
enabled
`type` **must** not be
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](VkIndirectExecutionSetInfoTypeEXT.html)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-sType-sType) VUID-VkIndirectExecutionSetCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-type-parameter) VUID-VkIndirectExecutionSetCreateInfoEXT-type-parameter

 `type` **must** be a valid [VkIndirectExecutionSetInfoTypeEXT](VkIndirectExecutionSetInfoTypeEXT.html) value

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-pPipelineInfo-parameter) VUID-VkIndirectExecutionSetCreateInfoEXT-pPipelineInfo-parameter

 If `type` is [VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT](VkIndirectExecutionSetInfoTypeEXT.html), the `pPipelineInfo` member of `info` **must** be a valid pointer to a valid [VkIndirectExecutionSetPipelineInfoEXT](VkIndirectExecutionSetPipelineInfoEXT.html) structure

* 
[](#VUID-VkIndirectExecutionSetCreateInfoEXT-pShaderInfo-parameter) VUID-VkIndirectExecutionSetCreateInfoEXT-pShaderInfo-parameter

 If `type` is [VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](VkIndirectExecutionSetInfoTypeEXT.html), the `pShaderInfo` member of `info` **must** be a valid pointer to a valid [VkIndirectExecutionSetShaderInfoEXT](VkIndirectExecutionSetShaderInfoEXT.html) structure

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectExecutionSetInfoEXT](VkIndirectExecutionSetInfoEXT.html), [VkIndirectExecutionSetInfoTypeEXT](VkIndirectExecutionSetInfoTypeEXT.html), [VkStructureType](VkStructureType.html), [vkCreateIndirectExecutionSetEXT](vkCreateIndirectExecutionSetEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectExecutionSetCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
