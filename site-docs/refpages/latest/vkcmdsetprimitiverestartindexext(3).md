# vkCmdSetPrimitiveRestartIndexEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetPrimitiveRestartIndexEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetPrimitiveRestartIndexEXT - Set primitive assembly restart index dynamically for a command buffer

To [dynamically control](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) which special vertex
index value is treated as restarting the assembly of primitives, call:

// Provided by VK_EXT_primitive_restart_index
void vkCmdSetPrimitiveRestartIndexEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    primitiveRestartIndex);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`primitiveRestartIndex` controls which special vertex index value is
treated as restarting the assembly of primitives.
This overrides the default values specified in
[VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html)::`primitiveRestartEnable`.

This command sets a custom primitive restart index for subsequent drawing
commands.
Binding an index buffer invalidates the custom index value.

Valid Usage

* 
[](#VUID-vkCmdSetPrimitiveRestartIndexEXT-primitiveRestartIndex-12395) VUID-vkCmdSetPrimitiveRestartIndexEXT-primitiveRestartIndex-12395

The [`primitiveRestartIndex`](../../../../spec/latest/chapters/features.html#features-primitiveRestartIndex)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPrimitiveRestartIndexEXT-commandBuffer-parameter) VUID-vkCmdSetPrimitiveRestartIndexEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetPrimitiveRestartIndexEXT-commandBuffer-recording) VUID-vkCmdSetPrimitiveRestartIndexEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPrimitiveRestartIndexEXT-commandBuffer-cmdpool) VUID-vkCmdSetPrimitiveRestartIndexEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetPrimitiveRestartIndexEXT-videocoding) VUID-vkCmdSetPrimitiveRestartIndexEXT-videocoding

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

vkCmdSetPrimitiveRestartIndexEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_primitive_restart_index](VK_EXT_primitive_restart_index.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdSetPrimitiveRestartIndexEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
