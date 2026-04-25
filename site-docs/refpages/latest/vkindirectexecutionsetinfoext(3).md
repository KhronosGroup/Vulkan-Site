# VkIndirectExecutionSetInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectExecutionSetInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectExecutionSetInfoEXT - Union specifying parameters of a newly created indirect execution set

The `VkIndirectExecutionSetInfoEXT` union is defined as:

// Provided by VK_EXT_device_generated_commands
typedef union VkIndirectExecutionSetInfoEXT {
    const VkIndirectExecutionSetPipelineInfoEXT*    pPipelineInfo;
    const VkIndirectExecutionSetShaderInfoEXT*      pShaderInfo;
} VkIndirectExecutionSetInfoEXT;

* 
`pPipelineInfo` is a pointer to a
[VkIndirectExecutionSetPipelineInfoEXT](VkIndirectExecutionSetPipelineInfoEXT.html) structure containing
pipeline layout information for the set.

* 
`pShaderInfo` is a pointer to a
[VkIndirectExecutionSetShaderInfoEXT](VkIndirectExecutionSetShaderInfoEXT.html) structure containing shader
object layout information for the set.

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectExecutionSetCreateInfoEXT](VkIndirectExecutionSetCreateInfoEXT.html), [VkIndirectExecutionSetPipelineInfoEXT](VkIndirectExecutionSetPipelineInfoEXT.html), [VkIndirectExecutionSetShaderInfoEXT](VkIndirectExecutionSetShaderInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectExecutionSetInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
