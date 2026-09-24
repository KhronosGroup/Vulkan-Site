# VkIndirectExecutionSetShaderLayoutInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectExecutionSetShaderLayoutInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectExecutionSetShaderLayoutInfoEXT - Struct specifying descriptor layout parameters of a newly created indirect execution set containing only shader objects

The `VkIndirectExecutionSetShaderLayoutInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetShaderLayoutInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    uint32_t                        setLayoutCount;
    const VkDescriptorSetLayout*    pSetLayouts;
} VkIndirectExecutionSetShaderLayoutInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`setLayoutCount` is the number of members in the `pSetLayouts`
array

* 
`pSetLayouts` is a pointer to an array containing
[VkDescriptorSetLayout](VkDescriptorSetLayout.html) objects used by the shader stage.
The implementation **must** not access these objects outside of the
duration of the command this structure is passed to.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-11024) VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-11024

All members of `pSetLayouts` **must** not contain descriptors of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html)

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-sType-sType) VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_LAYOUT_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-parameter) VUID-VkIndirectExecutionSetShaderLayoutInfoEXT-pSetLayouts-parameter

 If `setLayoutCount` is not `0`, `pSetLayouts` **must** be a valid pointer to an array of `setLayoutCount` valid or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkDescriptorSetLayout](VkDescriptorSetLayout.html) handles

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkIndirectExecutionSetShaderInfoEXT](VkIndirectExecutionSetShaderInfoEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectExecutionSetShaderLayoutInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
