# VkIndirectExecutionSetShaderInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndirectExecutionSetShaderInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndirectExecutionSetShaderInfoEXT - Struct specifying parameters of a newly created indirect execution set containing only shader objects

The `VkIndirectExecutionSetShaderInfoEXT` structure is defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkIndirectExecutionSetShaderInfoEXT {
    VkStructureType                                     sType;
    const void*                                         pNext;
    uint32_t                                            shaderCount;
    const VkShaderEXT*                                  pInitialShaders;
    const VkIndirectExecutionSetShaderLayoutInfoEXT*    pSetLayoutInfos;
    uint32_t                                            maxShaderCount;
    uint32_t                                            pushConstantRangeCount;
    const VkPushConstantRange*                          pPushConstantRanges;
} VkIndirectExecutionSetShaderInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderCount` is the number of members in the `pInitialShaders`
and `pSetLayoutInfos` arrays.

* 
`pInitialShaders` is a pointer to an array containing a
[VkShaderEXT](VkShaderEXT.html) object for each shader stage that will be used in the
set.
These shaders will be automatically added to the set beginning at index
`0`.

* 
`pSetLayoutInfos` is NULL or a pointer to an array containing a
[VkIndirectExecutionSetShaderLayoutInfoEXT](VkIndirectExecutionSetShaderLayoutInfoEXT.html) used by each
corresponding `pInitialShaders` shader stage in the set.

* 
`maxShaderCount` is the maximum number of shader objects stored in
the set.

* 
`pushConstantRangeCount` is the number of members in the
`pPushConstantRanges` array.

* 
`pPushConstantRanges` is a pointer to the array of
[VkPushConstantRange](VkPushConstantRange.html) ranges used by all shaders in the set.

The characteristics of `pInitialShaders` will be used to validate all
shaders added to the set even if they are removed from the set or destroyed.

When an Indirect Execution Set created with shader objects is used,
`pInitialShaders` constitutes the initial shader state.

If `pSetLayoutInfos` is `NULL`, the descriptor layout parameters are
inherited from the shader object.

Valid Usage

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11020) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11020

All members of `pInitialShaders` **must** have a `stage` supported
by [](../../../../spec/latest/chapters/limits.html#limits-supportedIndirectCommandsShaderStagesShaderBinding)[VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT.html)::`supportedIndirectCommandsShaderStagesShaderBinding`

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11021) VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11021

`maxShaderCount` **must** not be zero

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11022) VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11022

`maxShaderCount` **must** be less than or equal to
`VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT`::`maxIndirectShaderObjectCount`

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11036) VUID-VkIndirectExecutionSetShaderInfoEXT-maxShaderCount-11036

`maxShaderCount` **must** be greater than or equal to `shaderCount`

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-stage-11023) VUID-VkIndirectExecutionSetShaderInfoEXT-stage-11023

The `stage` of each element in the `pInitialShaders` array **must**
be unique

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11154) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11154

Each member of `pInitialShaders` **must** have been created with
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-10929) VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-10929

If `pSetLayoutInfos` is not `NULL`, the descriptor layout values
specified **must** be compatible with the descriptor set layouts defined at
the creation of the shader object

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11321) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11321

If any element of `pInitialShaders` was created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html), all elements of
`pInitialShaders` **must** have been created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11322) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11322

If any element of `pInitialShaders` was created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html), all elements of
`pInitialShaders` **must** have been created without
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11323) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-11323

If elements of `pInitialShaders` were created with
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](VkShaderCreateFlagBitsEXT.html), `pSetLayoutInfos`
**must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-sType-sType) VUID-VkIndirectExecutionSetShaderInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-parameter) VUID-VkIndirectExecutionSetShaderInfoEXT-pInitialShaders-parameter

 `pInitialShaders` **must** be a valid pointer to an array of `shaderCount` valid [VkShaderEXT](VkShaderEXT.html) handles

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-parameter) VUID-VkIndirectExecutionSetShaderInfoEXT-pSetLayoutInfos-parameter

 If `pSetLayoutInfos` is not `NULL`, `pSetLayoutInfos` **must** be a valid pointer to an array of `shaderCount` valid [VkIndirectExecutionSetShaderLayoutInfoEXT](VkIndirectExecutionSetShaderLayoutInfoEXT.html) structures

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-pPushConstantRanges-parameter) VUID-VkIndirectExecutionSetShaderInfoEXT-pPushConstantRanges-parameter

 If `pushConstantRangeCount` is not `0`, `pPushConstantRanges` **must** be a valid pointer to an array of `pushConstantRangeCount` valid [VkPushConstantRange](VkPushConstantRange.html) structures

* 
[](#VUID-VkIndirectExecutionSetShaderInfoEXT-shaderCount-arraylength) VUID-VkIndirectExecutionSetShaderInfoEXT-shaderCount-arraylength

 `shaderCount` **must** be greater than `0`

[VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html), [VkIndirectExecutionSetInfoEXT](VkIndirectExecutionSetInfoEXT.html), [VkIndirectExecutionSetShaderLayoutInfoEXT](VkIndirectExecutionSetShaderLayoutInfoEXT.html), [VkPushConstantRange](VkPushConstantRange.html), [VkShaderEXT](VkShaderEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#VkIndirectExecutionSetShaderInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
