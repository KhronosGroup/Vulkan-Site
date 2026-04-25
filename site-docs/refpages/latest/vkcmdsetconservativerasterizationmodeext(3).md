# vkCmdSetConservativeRasterizationModeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetConservativeRasterizationModeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetConservativeRasterizationModeEXT - Specify the conservative rasterization mode dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`conservativeRasterizationMode`, call:

// Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3, VK_EXT_conservative_rasterization with VK_EXT_shader_object
void vkCmdSetConservativeRasterizationModeEXT(
    VkCommandBuffer                             commandBuffer,
    VkConservativeRasterizationModeEXT          conservativeRasterizationMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`conservativeRasterizationMode` specifies the
`conservativeRasterizationMode` state.

This command sets the `conservativeRasterizationMode` state for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html)::`conservativeRasterizationMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-None-09423) VUID-vkCmdSetConservativeRasterizationModeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ConservativeRasterizationMode`](#features-extendedDynamicState3ConservativeRasterizationMode) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-parameter) VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-conservativeRasterizationMode-parameter) VUID-vkCmdSetConservativeRasterizationModeEXT-conservativeRasterizationMode-parameter

 `conservativeRasterizationMode` **must** be a valid [VkConservativeRasterizationModeEXT](VkConservativeRasterizationModeEXT.html) value

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-recording) VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-cmdpool) VUID-vkCmdSetConservativeRasterizationModeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetConservativeRasterizationModeEXT-videocoding) VUID-vkCmdSetConservativeRasterizationModeEXT-videocoding

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

vkCmdSetConservativeRasterizationModeEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html), [VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkConservativeRasterizationModeEXT](VkConservativeRasterizationModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetConservativeRasterizationModeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
