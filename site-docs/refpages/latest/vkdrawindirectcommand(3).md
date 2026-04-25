# VkDrawIndirectCommand(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrawIndirectCommand.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrawIndirectCommand - Structure specifying an indirect drawing command

The `VkDrawIndirectCommand` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDrawIndirectCommand {
    uint32_t    vertexCount;
    uint32_t    instanceCount;
    uint32_t    firstVertex;
    uint32_t    firstInstance;
} VkDrawIndirectCommand;

* 
`vertexCount` is the number of vertices to draw.

* 
`instanceCount` is the number of instances to draw.

* 
`firstVertex` is the index of the first vertex to draw.

* 
`firstInstance` is the instance ID of the first instance to draw.

The members of `VkDrawIndirectCommand` have the same meaning as the
similarly named parameters of [vkCmdDraw](vkCmdDraw.html).

Valid Usage

* 
[](#VUID-VkDrawIndirectCommand-pNext-09461) VUID-VkDrawIndirectCommand-pNext-09461

If the bound graphics pipeline state was created with
[VkPipelineVertexInputDivisorStateCreateInfo](VkPipelineVertexInputDivisorStateCreateInfo.html) in the `pNext`
chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pVertexInputState`,
any member of
[VkPipelineVertexInputDivisorStateCreateInfo](VkPipelineVertexInputDivisorStateCreateInfo.html)::`pVertexBindingDivisors`
has a value other than `1` in `divisor`, and
[VkPhysicalDeviceVertexAttributeDivisorProperties](VkPhysicalDeviceVertexAttributeDivisorProperties.html)::`supportsNonZeroFirstInstance`
is [VK_FALSE](VK_FALSE.html), then `firstInstance` **must** be `0`

* 
[](#VUID-VkDrawIndirectCommand-None-09462) VUID-VkDrawIndirectCommand-None-09462

If
[shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects) are used for drawing or
the bound graphics pipeline state was created with the
[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](VkDynamicState.html) dynamic state enabled, any
member of the `pVertexBindingDescriptions` parameter to the
[vkCmdSetVertexInputEXT](vkCmdSetVertexInputEXT.html) call that sets this dynamic state has a
value other than `1` in `divisor`, and
[VkPhysicalDeviceVertexAttributeDivisorProperties](VkPhysicalDeviceVertexAttributeDivisorProperties.html)::`supportsNonZeroFirstInstance`
is [VK_FALSE](VK_FALSE.html), then `firstInstance` **must** be `0`

* 
[](#VUID-VkDrawIndirectCommand-firstInstance-00501) VUID-VkDrawIndirectCommand-firstInstance-00501

If the [    `drawIndirectFirstInstance`](../../../../spec/latest/chapters/features.html#features-drawIndirectFirstInstance) feature is not enabled,
`firstInstance` **must** be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [vkCmdDrawIndirect](vkCmdDrawIndirect.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkDrawIndirectCommand).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
