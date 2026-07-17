# vkCmdSetColorBlendEquationEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetColorBlendEquationEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetColorBlendEquationEXT - Specify the blend factors and operations dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) color blend factors and
operations, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetColorBlendEquationEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkColorBlendEquationEXT*              pColorBlendEquations);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the color blend factors
and operations apply to.

* 
`attachmentCount` the number of [VkColorBlendEquationEXT](VkColorBlendEquationEXT.html)
elements in the `pColorBlendEquations` array.

* 
`pColorBlendEquations` an array of [VkColorBlendEquationEXT](VkColorBlendEquationEXT.html)
structs that specify the color blend factors and operations for the
corresponding attachments.

This command sets the color blending factors and operations of the specified
attachments for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`srcColorBlendFactor`,
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`dstColorBlendFactor`,
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`colorBlendOp`,
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`srcAlphaBlendFactor`,
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`dstAlphaBlendFactor`, and
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`alphaBlendOp` values used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-None-09423) VUID-vkCmdSetColorBlendEquationEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorBlendEquation`](#features-extendedDynamicState3ColorBlendEquation) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-parameter) VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-pColorBlendEquations-parameter) VUID-vkCmdSetColorBlendEquationEXT-pColorBlendEquations-parameter

 `pColorBlendEquations` **must** be a valid pointer to an array of `attachmentCount` valid [VkColorBlendEquationEXT](VkColorBlendEquationEXT.html) structures

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-recording) VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorBlendEquationEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-videocoding) VUID-vkCmdSetColorBlendEquationEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorBlendEquationEXT-attachmentCount-arraylength) VUID-vkCmdSetColorBlendEquationEXT-attachmentCount-arraylength

 `attachmentCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetColorBlendEquationEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkColorBlendEquationEXT](VkColorBlendEquationEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkCmdSetColorBlendEquationEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
