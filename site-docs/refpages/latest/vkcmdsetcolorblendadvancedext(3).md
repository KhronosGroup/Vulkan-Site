# vkCmdSetColorBlendAdvancedEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetColorBlendAdvancedEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetColorBlendAdvancedEXT - Specify the advanced color blend state dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the advanced blend state,
call:

// Provided by VK_EXT_blend_operation_advanced with VK_EXT_extended_dynamic_state3, VK_EXT_blend_operation_advanced with VK_EXT_shader_object
void vkCmdSetColorBlendAdvancedEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstAttachment,
    uint32_t                                    attachmentCount,
    const VkColorBlendAdvancedEXT*              pColorBlendAdvanced);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstAttachment` the first color attachment the advanced blend
parameters apply to.

* 
`attachmentCount` the number of [VkColorBlendAdvancedEXT](VkColorBlendAdvancedEXT.html)
elements in the `pColorBlendAdvanced` array.

* 
`pColorBlendAdvanced` an array of [VkColorBlendAdvancedEXT](VkColorBlendAdvancedEXT.html)
structs that specify the advanced color blend parameters for the
corresponding attachments.

This command sets the advanced blend operation parameters of the specified
attachments for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`srcPremultiplied`,
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`dstPremultiplied`,
and [VkPipelineColorBlendAdvancedStateCreateInfoEXT](VkPipelineColorBlendAdvancedStateCreateInfoEXT.html)::`blendOverlap`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-None-09423) VUID-vkCmdSetColorBlendAdvancedEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ColorBlendAdvanced`](#features-extendedDynamicState3ColorBlendAdvanced) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-parameter) VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-pColorBlendAdvanced-parameter) VUID-vkCmdSetColorBlendAdvancedEXT-pColorBlendAdvanced-parameter

 `pColorBlendAdvanced` **must** be a valid pointer to an array of `attachmentCount` valid [VkColorBlendAdvancedEXT](VkColorBlendAdvancedEXT.html) structures

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-recording) VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-cmdpool) VUID-vkCmdSetColorBlendAdvancedEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-videocoding) VUID-vkCmdSetColorBlendAdvancedEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetColorBlendAdvancedEXT-attachmentCount-arraylength) VUID-vkCmdSetColorBlendAdvancedEXT-attachmentCount-arraylength

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

vkCmdSetColorBlendAdvancedEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html), [VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkColorBlendAdvancedEXT](VkColorBlendAdvancedEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkCmdSetColorBlendAdvancedEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
