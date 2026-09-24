# vkCmdSetDepthBias2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthBias2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthBias2EXT - Set depth bias factors and clamp dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the depth bias parameters,
call:

// Provided by VK_EXT_depth_bias_control
void vkCmdSetDepthBias2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkDepthBiasInfoEXT*                   pDepthBiasInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDepthBiasInfo` is a pointer to a [VkDepthBiasInfoEXT](VkDepthBiasInfoEXT.html)
structure specifying depth bias parameters.

This command is functionally identical to [vkCmdSetDepthBias](vkCmdSetDepthBias.html), but
includes extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthBias2EXT-commandBuffer-parameter) VUID-vkCmdSetDepthBias2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthBias2EXT-pDepthBiasInfo-parameter) VUID-vkCmdSetDepthBias2EXT-pDepthBiasInfo-parameter

 `pDepthBiasInfo` **must** be a valid pointer to a valid [VkDepthBiasInfoEXT](VkDepthBiasInfoEXT.html) structure

* 
[](#VUID-vkCmdSetDepthBias2EXT-commandBuffer-recording) VUID-vkCmdSetDepthBias2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthBias2EXT-commandBuffer-cmdpool) VUID-vkCmdSetDepthBias2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthBias2EXT-videocoding) VUID-vkCmdSetDepthBias2EXT-videocoding

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

vkCmdSetDepthBias2EXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_depth_bias_control](VK_EXT_depth_bias_control.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDepthBiasInfoEXT](VkDepthBiasInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetDepthBias2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
