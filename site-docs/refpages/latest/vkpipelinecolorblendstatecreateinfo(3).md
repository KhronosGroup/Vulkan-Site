# VkPipelineColorBlendStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineColorBlendStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineColorBlendStateCreateInfo - Structure specifying parameters of a newly created pipeline color blend state

The `VkPipelineColorBlendStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineColorBlendStateCreateInfo {
    VkStructureType                               sType;
    const void*                                   pNext;
    VkPipelineColorBlendStateCreateFlags          flags;
    VkBool32                                      logicOpEnable;
    VkLogicOp                                     logicOp;
    uint32_t                                      attachmentCount;
    const VkPipelineColorBlendAttachmentState*    pAttachments;
    float                                         blendConstants[4];
} VkPipelineColorBlendStateCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkPipelineColorBlendStateCreateFlagBits](VkPipelineColorBlendStateCreateFlagBits.html) specifying additional
color blending information.

* 
`logicOpEnable` controls whether to apply [    Logical Operations](../../../../spec/latest/chapters/framebuffer.html#framebuffer-logicop).

* 
`logicOp` selects which logical operation to apply.

* 
`attachmentCount` is the number of
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html) elements in
`pAttachments`.
It is ignored if the pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html) dynamic states set, and
either [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html) set or the
[advancedBlendCoherentOperations](../../../../spec/latest/chapters/features.html#features-advancedBlendCoherentOperations)
feature is not enabled.

* 
`pAttachments` is a pointer to an array of
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html) structures defining blend
state for each color attachment.
It is ignored if the pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html), and
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html) dynamic states set, and
either [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html) set or the
[advancedBlendCoherentOperations](../../../../spec/latest/chapters/features.html#features-advancedBlendCoherentOperations)
feature is not enabled.

* 
`blendConstants` is a pointer to an array of four values used as the
R, G, B, and A components of the blend constant that are used in
blending, depending on the [blend factor](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blendfactors).

Valid Usage

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-00605) VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-00605

If the [`independentBlend`](../../../../spec/latest/chapters/features.html#features-independentBlend) feature is
not enabled, all elements of `pAttachments` **must** be identical

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00606) VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00606

If the [`logicOp`](../../../../spec/latest/chapters/features.html#features-logicOp) feature is not enabled,
`logicOpEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00607) VUID-VkPipelineColorBlendStateCreateInfo-logicOpEnable-00607

If `logicOpEnable` is [VK_TRUE](VK_TRUE.html), `logicOp` **must** be a valid
[VkLogicOp](VkLogicOp.html) value

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-rasterizationOrderColorAttachmentAccess-06465) VUID-VkPipelineColorBlendStateCreateInfo-rasterizationOrderColorAttachmentAccess-06465

If the [    `rasterizationOrderColorAttachmentAccess`](../../../../spec/latest/chapters/features.html#features-rasterizationOrderColorAttachmentAccess) feature is not enabled,
`flags` **must** not include
[VK_PIPELINE_COLOR_BLEND_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_BIT_EXT](VkPipelineColorBlendStateCreateFlagBits.html)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-07353) VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-07353

If `attachmentCount` is not `0`
, and any of [VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html),
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html), or
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html) are not set,
`pAttachments` **must** be a valid pointer to an array of
`attachmentCount` valid [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)
structures

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-sType-sType) VUID-VkPipelineColorBlendStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pNext-pNext) VUID-VkPipelineColorBlendStateCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html) or [VkPipelineColorWriteCreateInfoEXT](VkPipelineColorWriteCreateInfoEXT.html)

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-sType-unique) VUID-VkPipelineColorBlendStateCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-flags-parameter) VUID-VkPipelineColorBlendStateCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineColorBlendStateCreateFlagBits](VkPipelineColorBlendStateCreateFlagBits.html) values

* 
[](#VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-parameter) VUID-VkPipelineColorBlendStateCreateInfo-pAttachments-parameter

 If `attachmentCount` is not `0`, and `pAttachments` is not `NULL`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html) structures

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkLogicOp](VkLogicOp.html), [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html), [VkPipelineColorBlendStateCreateFlags](VkPipelineColorBlendStateCreateFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkPipelineColorBlendStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
