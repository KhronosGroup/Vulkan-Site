# vkCmdEndShaderInstrumentationARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndShaderInstrumentationARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndShaderInstrumentationARM - End shader instrumentation

To end shader instrumentation, call:

// Provided by VK_ARM_shader_instrumentation
void vkCmdEndShaderInstrumentationARM(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

Once recorded, shader instrumentation is no longer considered *active*
within the command buffer.

Valid Usage

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12377) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12377

Shader instrumentation **must** be active within `commandBuffer`

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12378) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-12378

`commandBuffer` **must** not be a protected command buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-parameter) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-recording) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-cmdpool) VUID-vkCmdEndShaderInstrumentationARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-suspended) VUID-vkCmdEndShaderInstrumentationARM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndShaderInstrumentationARM-videocoding) VUID-vkCmdEndShaderInstrumentationARM-videocoding

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

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdEndShaderInstrumentationARM is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCmdEndShaderInstrumentationARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
