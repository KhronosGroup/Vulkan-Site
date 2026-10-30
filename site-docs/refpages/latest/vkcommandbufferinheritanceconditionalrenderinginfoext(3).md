# VkCommandBufferInheritanceConditionalRenderingInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferInheritanceConditionalRenderingInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferInheritanceConditionalRenderingInfoEXT - Structure specifying command buffer inheritance information

If the `pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) includes a
`VkCommandBufferInheritanceConditionalRenderingInfoEXT` structure, then
that structure controls whether a command buffer **can** be executed while
conditional rendering is [active](../../../../spec/latest/chapters/drawing.html#active-conditional-rendering) in the
primary command buffer.

The `VkCommandBufferInheritanceConditionalRenderingInfoEXT` structure is
defined as:

// Provided by VK_EXT_conditional_rendering
typedef struct VkCommandBufferInheritanceConditionalRenderingInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           conditionalRenderingEnable;
} VkCommandBufferInheritanceConditionalRenderingInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`conditionalRenderingEnable` specifies whether the command buffer
**can** be executed while conditional rendering is active in the primary
command buffer.
If this is [VK_TRUE](VK_TRUE.html), then this command buffer **can** be executed
whether the primary command buffer has active conditional rendering or
not.
If this is [VK_FALSE](VK_FALSE.html), then the primary command buffer **must** not
have conditional rendering active.

If this structure is not present, the behavior is as if
`conditionalRenderingEnable` is [VK_FALSE](VK_FALSE.html).

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-conditionalRenderingEnable-01977) VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-conditionalRenderingEnable-01977

If the [    `inheritedConditionalRendering`](../../../../spec/latest/chapters/features.html#features-inheritedConditionalRendering) feature is not enabled,
`conditionalRenderingEnable` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-sType-sType) VUID-VkCommandBufferInheritanceConditionalRenderingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_CONDITIONAL_RENDERING_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

[VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceConditionalRenderingInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
