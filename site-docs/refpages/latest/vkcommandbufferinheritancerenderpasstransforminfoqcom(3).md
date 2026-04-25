# VkCommandBufferInheritanceRenderPassTransformInfoQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferInheritanceRenderPassTransformInfoQCOM - Structure describing transformed render pass parameters command buffer

To begin recording a secondary command buffer compatible with execution
inside a render pass using [render pass transform](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-renderpass-transform), add the
[VkCommandBufferInheritanceRenderPassTransformInfoQCOM](#) to the
`pNext` chain of [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html) structure passed
to the [vkBeginCommandBuffer](vkBeginCommandBuffer.html) command specifying the parameters for
transformed rasterization.

The `VkCommandBufferInheritanceRenderPassTransformInfoQCOM` structure is
defined as:

// Provided by VK_QCOM_render_pass_transform
typedef struct VkCommandBufferInheritanceRenderPassTransformInfoQCOM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSurfaceTransformFlagBitsKHR    transform;
    VkRect2D                         renderArea;
} VkCommandBufferInheritanceRenderPassTransformInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`transform` is a [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html) value
describing the transform to be applied to the render pass.

* 
`renderArea` is the render area that is affected by the command
buffer.

When the secondary is recorded to execute within a render pass instance
using [vkCmdExecuteCommands](vkCmdExecuteCommands.html), the render pass transform parameters of
the secondary command buffer **must** be consistent with the render pass
transform parameters specified for the render pass instance.
In particular, the `transform` and `renderArea` for command buffer
**must** be identical to the `transform` and `renderArea` of the render
pass instance.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-transform-02864) VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-transform-02864

`transform` **must** be [VK_SURFACE_TRANSFORM_IDENTITY_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
[VK_SURFACE_TRANSFORM_ROTATE_90_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html),
[VK_SURFACE_TRANSFORM_ROTATE_180_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html), or
[VK_SURFACE_TRANSFORM_ROTATE_270_BIT_KHR](VkSurfaceTransformFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-sType-sType) VUID-VkCommandBufferInheritanceRenderPassTransformInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDER_PASS_TRANSFORM_INFO_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

[VK_QCOM_render_pass_transform](VK_QCOM_render_pass_transform.html), [VkRect2D](VkRect2D.html), [VkStructureType](VkStructureType.html), [VkSurfaceTransformFlagBitsKHR](VkSurfaceTransformFlagBitsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceRenderPassTransformInfoQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
