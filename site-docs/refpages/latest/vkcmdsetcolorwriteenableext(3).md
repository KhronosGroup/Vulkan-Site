# vkCmdSetColorWriteEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetColorWriteEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetColorWriteEnableEXT - Enable or disable writes to a color attachment dynamically for a command buffer

To [dynamically enable or disable](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) writes to a
color attachment, call:

// Provided by VK_EXT_color_write_enable
void vkCmdSetColorWriteEnableEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    attachmentCount,
    const VkBool32*                             pColorWriteEnables);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`attachmentCount` is the number of `VkBool32` elements in
`pColorWriteEnables`.

* 
`pColorWriteEnables` is a pointer to an array of per target
attachment boolean values specifying whether color writes are enabled
for the given attachment.

This command sets the color write enables for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorWriteCreateInfoEXT](VkPipelineColorWriteCreateInfoEXT.html)::`pColorWriteEnables` values
used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-None-04803) VUID-vkCmdSetColorWriteEnableEXT-None-04803

The [`colorWriteEnable`](../../../../spec/latest/chapters/features.html#features-colorWriteEnable) feature **must**
be enabled

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-06656) VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-06656

`attachmentCount` **must** be less than or equal to the
`maxColorAttachments` member of `VkPhysicalDeviceLimits`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-parameter) VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-pColorWriteEnables-parameter) VUID-vkCmdSetColorWriteEnableEXT-pColorWriteEnables-parameter

 `pColorWriteEnables` **must** be a valid pointer to an array of `attachmentCount` `VkBool32` values

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-recording) VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorWriteEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-videocoding) VUID-vkCmdSetColorWriteEnableEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-arraylength) VUID-vkCmdSetColorWriteEnableEXT-attachmentCount-arraylength

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

vkCmdSetColorWriteEnableEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_color_write_enable](VK_EXT_color_write_enable.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkCmdSetColorWriteEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
