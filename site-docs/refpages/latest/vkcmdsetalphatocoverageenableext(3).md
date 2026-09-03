# vkCmdSetAlphaToCoverageEnableEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetAlphaToCoverageEnableEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetAlphaToCoverageEnableEXT - Specify the alpha to coverage enable state dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`alphaToCoverageEnable` state, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetAlphaToCoverageEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    alphaToCoverageEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`alphaToCoverageEnable` specifies the `alphaToCoverageEnable`
state.

This command sets the `alphaToCoverageEnable` state for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`alphaToCoverageEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetAlphaToCoverageEnableEXT-None-09423) VUID-vkCmdSetAlphaToCoverageEnableEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3AlphaToCoverageEnable`](#features-extendedDynamicState3AlphaToCoverageEnable) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetAlphaToCoverageEnableEXT-commandBuffer-parameter) VUID-vkCmdSetAlphaToCoverageEnableEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetAlphaToCoverageEnableEXT-commandBuffer-recording) VUID-vkCmdSetAlphaToCoverageEnableEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetAlphaToCoverageEnableEXT-commandBuffer-cmdpool) VUID-vkCmdSetAlphaToCoverageEnableEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetAlphaToCoverageEnableEXT-videocoding) VUID-vkCmdSetAlphaToCoverageEnableEXT-videocoding

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

vkCmdSetAlphaToCoverageEnableEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetAlphaToCoverageEnableEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
