# vkCmdSetColorBlendEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetColorBlendEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetColorBlendEnableEXT - Specify the `blendEnable` for each attachment dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) `blendEnable`, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetColorBlendEnableEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkBool32*                             pColorBlendEnables);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the color blending
enable applies.

* 
`attachmentCount` the number of color blending enables in the
`pColorBlendEnables` array.

* 
`pColorBlendEnables` an array of booleans to indicate whether color
blending is enabled for the corresponding attachment.

This command sets the color blending enable of the specified color
attachments for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)::`blendEnable` values used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-None-09423) VUID-vkCmdSetColorBlendEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorBlendEnable`](#features-extendedDynamicState3ColorBlendEnable) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-parameter) VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-pColorBlendEnables-parameter) VUID-vkCmdSetColorBlendEnableEXT-pColorBlendEnables-parameter

 `pColorBlendEnables` **must** be a valid pointer to an array of `attachmentCount` `VkBool32` values

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-recording) VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorBlendEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-videocoding) VUID-vkCmdSetColorBlendEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorBlendEnableEXT-attachmentCount-arraylength) VUID-vkCmdSetColorBlendEnableEXT-attachmentCount-arraylength

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

vkCmdSetColorBlendEnableEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkCmdSetColorBlendEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
