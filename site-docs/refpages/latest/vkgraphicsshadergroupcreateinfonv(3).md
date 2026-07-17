# VkGraphicsShaderGroupCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkGraphicsShaderGroupCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkGraphicsShaderGroupCreateInfoNV - Structure specifying override parameters for each shader group

The `VkGraphicsShaderGroupCreateInfoNV` structure provides the state
overrides for each shader group.
Each shader group behaves like a pipeline that was created from its state as
well as the remaining parent’s state.
It is defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkGraphicsShaderGroupCreateInfoNV {
    VkStructureType                                 sType;
    const void*                                     pNext;
    uint32_t                                        stageCount;
    const VkPipelineShaderStageCreateInfo*          pStages;
    const VkPipelineVertexInputStateCreateInfo*     pVertexInputState;
    const VkPipelineTessellationStateCreateInfo*    pTessellationState;
} VkGraphicsShaderGroupCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageCount` is the number of entries in the `pStages` array.

* 
`pStages` is a pointer to an array
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures specifying the set of
the shader stages to be included in this shader group.

* 
`pVertexInputState` is a pointer to a
[VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html) structure.

* 
`pTessellationState` is a pointer to a
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html) structure, and is ignored if
the shader group does not include a tessellation control shader stage
and tessellation evaluation shader stage.

Valid Usage

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-02888) VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-02888

For `stageCount`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`stageCount` apply

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-02889) VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-02889

For `pStages`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pStages` apply

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pVertexInputState-02890) VUID-VkGraphicsShaderGroupCreateInfoNV-pVertexInputState-02890

For `pVertexInputState`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pVertexInputState` apply

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pTessellationState-02891) VUID-VkGraphicsShaderGroupCreateInfoNV-pTessellationState-02891

For `pTessellationState`, the same restrictions as in
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pTessellationState` apply

Valid Usage (Implicit)

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-sType-sType) VUID-VkGraphicsShaderGroupCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GRAPHICS_SHADER_GROUP_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pNext-pNext) VUID-VkGraphicsShaderGroupCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-parameter) VUID-VkGraphicsShaderGroupCreateInfoNV-pStages-parameter

 `pStages` **must** be a valid pointer to an array of `stageCount` valid [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html) structures

* 
[](#VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-arraylength) VUID-VkGraphicsShaderGroupCreateInfoNV-stageCount-arraylength

 `stageCount` **must** be greater than `0`

[VK_NV_device_generated_commands](VK_NV_device_generated_commands.html), [VkGraphicsPipelineShaderGroupsCreateInfoNV](VkGraphicsPipelineShaderGroupsCreateInfoNV.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html), [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkGraphicsShaderGroupCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
