# VkIndirectExecutionSetInfoTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectExecutionSetInfoTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectExecutionSetInfoTypeEXT - Enum specifying allowed usage of an indirect execution set

Values which **can** be set in
[VkIndirectExecutionSetCreateInfoEXT](VkIndirectExecutionSetCreateInfoEXT.html)::`type`, specifying contents
of an indirect execution set, are:

// Provided by VK_EXT_device_generated_commands
typedef enum VkIndirectExecutionSetInfoTypeEXT {
    VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT = 0,
    VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT = 1,
} VkIndirectExecutionSetInfoTypeEXT;

* 
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_PIPELINES_EXT](#) specifies that
the indirect execution set contains [VkPipeline](VkPipeline.html) objects.

* 
[VK_INDIRECT_EXECUTION_SET_INFO_TYPE_SHADER_OBJECTS_EXT](#) specifies
that the indirect execution set contains [VkShaderEXT](VkShaderEXT.html) objects.

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectCommandsExecutionSetTokenEXT](VkIndirectCommandsExecutionSetTokenEXT.html), [VkIndirectExecutionSetCreateInfoEXT](VkIndirectExecutionSetCreateInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectExecutionSetInfoTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
