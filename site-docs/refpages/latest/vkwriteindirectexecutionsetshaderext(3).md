# VkWriteIndirectExecutionSetShaderEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkWriteIndirectExecutionSetShaderEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkWriteIndirectExecutionSetShaderEXT - Struct specifying shader object update information for an indirect execution set

The `VkWriteIndirectExecutionSetShaderEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands with VK_EXT_shader_object
typedef struct VkWriteIndirectExecutionSetShaderEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           index;
    VkShaderEXT        shader;
} VkWriteIndirectExecutionSetShaderEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`index` is the element of the set to update

* 
`shader` is the shader to store in the indirect execution set

Shaders need not be stored in the Indirect Execution Set according to their
stage.
The only restriction for shader indices within a set is that the value of
the index **must** be less than the maximum number of shaders in the set.

Valid Usage

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-index-11031) VUID-VkWriteIndirectExecutionSetShaderEXT-index-11031

`index` **must** be less than
`VkIndirectExecutionSetShaderInfoEXT`::`maxShaderCount`

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-shader-11032) VUID-VkWriteIndirectExecutionSetShaderEXT-shader-11032

`shader` **must** have been created with
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-pInitialShaders-11033) VUID-VkWriteIndirectExecutionSetShaderEXT-pInitialShaders-11033

A shader created with the same [VkShaderStageFlagBits](VkShaderStageFlagBits.html) **must** have
been passed in the
`VkIndirectExecutionSetShaderInfoEXT`::`pInitialShaders` array

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-index-11034) VUID-VkWriteIndirectExecutionSetShaderEXT-index-11034

`index` **must** not be in use by submitted command buffers

Valid Usage (Implicit)

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-sType-sType) VUID-VkWriteIndirectExecutionSetShaderEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_SHADER_EXT](VkStructureType.html)

* 
[](#VUID-VkWriteIndirectExecutionSetShaderEXT-shader-parameter) VUID-VkWriteIndirectExecutionSetShaderEXT-shader-parameter

 `shader` **must** be a valid [VkShaderEXT](VkShaderEXT.html) handle

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkShaderEXT](VkShaderEXT.html), [VkStructureType](VkStructureType.html), [vkUpdateIndirectExecutionSetShaderEXT](vkUpdateIndirectExecutionSetShaderEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkWriteIndirectExecutionSetShaderEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
