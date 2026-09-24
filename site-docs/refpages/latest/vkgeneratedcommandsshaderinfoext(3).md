# VkGeneratedCommandsShaderInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGeneratedCommandsShaderInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGeneratedCommandsShaderInfoEXT - Structure specifying shader objects for use with indirect command preprocessing

// Provided by VK_EXT_device_generated_commands
typedef struct VkGeneratedCommandsShaderInfoEXT {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              shaderCount;
    const VkShaderEXT*    pShaders;
} VkGeneratedCommandsShaderInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderCount` is the size of the `pShaders` array.

* 
`pShaders` is a pointer to an array of shader objects.

Valid Usage

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-11127) VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-11127

`pShaders` **must** not contain more than one shader object for a given
[VkShaderStageFlagBits](VkShaderStageFlagBits.html) stage

Valid Usage (Implicit)

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-sType-sType) VUID-VkGeneratedCommandsShaderInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GENERATED_COMMANDS_SHADER_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-parameter) VUID-VkGeneratedCommandsShaderInfoEXT-pShaders-parameter

 `pShaders` **must** be a valid pointer to an array of `shaderCount` valid [VkShaderEXT](VkShaderEXT.html) handles

* 
[](#VUID-VkGeneratedCommandsShaderInfoEXT-shaderCount-arraylength) VUID-VkGeneratedCommandsShaderInfoEXT-shaderCount-arraylength

 `shaderCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkGeneratedCommandsInfoEXT](VkGeneratedCommandsInfoEXT.html)

* 
[VkGeneratedCommandsMemoryRequirementsInfoEXT](VkGeneratedCommandsMemoryRequirementsInfoEXT.html)

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkShaderEXT](VkShaderEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkGeneratedCommandsShaderInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
