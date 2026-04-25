# vkCmdSetLogicOpEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetLogicOpEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetLogicOpEXT - Select which logical operation to apply for blend state dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the logical operation to
apply for blend state, call:

// Provided by VK_EXT_extended_dynamic_state2, VK_EXT_shader_object
void vkCmdSetLogicOpEXT(
    VkCommandBuffer                             commandBuffer,
    VkLogicOp                                   logicOp);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`logicOp` specifies the logical operation to apply for blend state.

This command sets the logical operation for blend state for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)::`logicOp` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLogicOpEXT-None-09422) VUID-vkCmdSetLogicOpEXT-None-09422

At least one of the following **must** be true:

The [`extendedDynamicState2LogicOp`](#features-extendedDynamicState2LogicOp) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLogicOpEXT-commandBuffer-parameter) VUID-vkCmdSetLogicOpEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetLogicOpEXT-logicOp-parameter) VUID-vkCmdSetLogicOpEXT-logicOp-parameter

 `logicOp` **must** be a valid [VkLogicOp](VkLogicOp.html) value

* 
[](#VUID-vkCmdSetLogicOpEXT-commandBuffer-recording) VUID-vkCmdSetLogicOpEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLogicOpEXT-commandBuffer-cmdpool) VUID-vkCmdSetLogicOpEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetLogicOpEXT-videocoding) VUID-vkCmdSetLogicOpEXT-videocoding

 This command **must** only be called outside of a video coding scope

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

vkCmdSetLogicOpEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state2](VK_EXT_extended_dynamic_state2.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkLogicOp](VkLogicOp.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#vkCmdSetLogicOpEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
