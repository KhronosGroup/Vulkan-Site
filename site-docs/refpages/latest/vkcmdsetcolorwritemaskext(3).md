# vkCmdSetColorWriteMaskEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetColorWriteMaskEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetColorWriteMaskEXT - Specify the color write masks for each attachment dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the color write masks, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetColorWriteMaskEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkColorComponentFlags*                pColorWriteMasks);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the color write masks
apply to.

* 
`attachmentCount` the number of [VkColorComponentFlags](VkColorComponentFlags.html) values
in the `pColorWriteMasks` array.

* 
`pColorWriteMasks` an array of [VkColorComponentFlags](VkColorComponentFlags.html) values
that specify the color write masks of the corresponding attachments.

This command sets the color write masks of the specified attachments for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`colorWriteMask` values used
to create the currently active pipeline.

|  | Formats with bits that are shared between components specified by
| --- | --- |
[VkColorComponentFlagBits](VkColorComponentFlagBits.html), such as
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](VkFormat.html), cannot have their channels
individually masked by this functionality; either all components that share
bits have to be enabled, or none of them. |

Valid Usage

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-None-09423) VUID-vkCmdSetColorWriteMaskEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorWriteMask`](#features-extendedDynamicState3ColorWriteMask) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-parameter) VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-pColorWriteMasks-parameter) VUID-vkCmdSetColorWriteMaskEXT-pColorWriteMasks-parameter

 `pColorWriteMasks` **must** be a valid pointer to an array of `attachmentCount` valid combinations of [VkColorComponentFlagBits](VkColorComponentFlagBits.html) values

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-recording) VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorWriteMaskEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-videocoding) VUID-vkCmdSetColorWriteMaskEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorWriteMaskEXT-attachmentCount-arraylength) VUID-vkCmdSetColorWriteMaskEXT-attachmentCount-arraylength

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

vkCmdSetColorWriteMaskEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkColorComponentFlags](VkColorComponentFlags.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkCmdSetColorWriteMaskEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
