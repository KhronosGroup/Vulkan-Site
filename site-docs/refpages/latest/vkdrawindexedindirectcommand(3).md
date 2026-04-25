# VkDrawIndexedIndirectCommand(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrawIndexedIndirectCommand.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrawIndexedIndirectCommand - Structure specifying an indexed indirect drawing command

The `VkDrawIndexedIndirectCommand` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDrawIndexedIndirectCommand {
    uint32_t    indexCount;
    uint32_t    instanceCount;
    uint32_t    firstIndex;
    int32_t     vertexOffset;
    uint32_t    firstInstance;
} VkDrawIndexedIndirectCommand;

* 
`indexCount` is the number of vertices to draw.

* 
`instanceCount` is the number of instances to draw.

* 
`firstIndex` is the base index within the index buffer.

* 
`vertexOffset` is the value added to the vertex index before
indexing into the vertex buffer.

* 
`firstInstance` is the instance ID of the first instance to draw.

The members of `VkDrawIndexedIndirectCommand` have the same meaning as
the similarly named parameters of [vkCmdDrawIndexed](vkCmdDrawIndexed.html).

Valid Usage

* 
[](#VUID-VkDrawIndexedIndirectCommand-pNext-09461) VUID-VkDrawIndexedIndirectCommand-pNext-09461

If the bound graphics pipeline state was created with
[VkPipelineVertexInputDivisorStateCreateInfo](VkPipelineVertexInputDivisorStateCreateInfo.html) in the `pNext`
chain of [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)::`pVertexInputState`,
any member of
[VkPipelineVertexInputDivisorStateCreateInfo](VkPipelineVertexInputDivisorStateCreateInfo.html)::`pVertexBindingDivisors`
has a value other than `1` in `divisor`, and
[VkPhysicalDeviceVertexAttributeDivisorProperties](VkPhysicalDeviceVertexAttributeDivisorProperties.html)::`supportsNonZeroFirstInstance`
is [VK_FALSE](VK_FALSE.html), then `firstInstance` **must** be `0`

* 
[](#VUID-VkDrawIndexedIndirectCommand-None-09462) VUID-VkDrawIndexedIndirectCommand-None-09462

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
[](#VUID-VkDrawIndexedIndirectCommand-robustBufferAccess2-08798) VUID-VkDrawIndexedIndirectCommand-robustBufferAccess2-08798

If the [`robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2)
feature is not enabled, (`indexSize` × (`firstIndex`
+  `indexCount`)) **must** be less than or equal to the size of
the [bound index buffer range](../../../../spec/latest/chapters/drawing.html#index-buffer-range), with `indexSize`
being based on the type specified by `indexType`, and the other
parameters sourced from this command

* 
[](#VUID-VkDrawIndexedIndirectCommand-firstInstance-00554) VUID-VkDrawIndexedIndirectCommand-firstInstance-00554

If the [    `drawIndirectFirstInstance`](../../../../spec/latest/chapters/features.html#features-drawIndirectFirstInstance) feature is not enabled,
`firstInstance` **must** be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkDrawIndexedIndirectCommand).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
