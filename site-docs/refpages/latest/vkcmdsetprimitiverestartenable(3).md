# vkCmdSetPrimitiveRestartEnable(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetPrimitiveRestartEnable.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetPrimitiveRestartEnable - Set primitive assembly restart state dynamically for a command buffer

To [dynamically control](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) whether a special vertex
index value is treated as restarting the assembly of primitives, call:

// Provided by VK_VERSION_1_3
void vkCmdSetPrimitiveRestartEnable(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    primitiveRestartEnable);

// Provided by VK_EXT_extended_dynamic_state2, VK_EXT_shader_object
// Equivalent to vkCmdSetPrimitiveRestartEnable
void vkCmdSetPrimitiveRestartEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    primitiveRestartEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`primitiveRestartEnable` controls whether a special vertex index
value is treated as restarting the assembly of primitives.
It behaves in the same way as
`VkPipelineInputAssemblyStateCreateInfo`::`primitiveRestartEnable`

This command sets the primitive restart enable for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html)::`primitiveRestartEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetPrimitiveRestartEnable-None-08970) VUID-vkCmdSetPrimitiveRestartEnable-None-08970

At least one of the following **must** be true:

the [`extendedDynamicState2`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState2)
feature is enabled

* 
the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
the [VkInstance](VkInstance.html) parent of `commandBuffer` is greater than or
equal to Version 1.3

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPrimitiveRestartEnable-commandBuffer-parameter) VUID-vkCmdSetPrimitiveRestartEnable-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetPrimitiveRestartEnable-commandBuffer-recording) VUID-vkCmdSetPrimitiveRestartEnable-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPrimitiveRestartEnable-commandBuffer-cmdpool) VUID-vkCmdSetPrimitiveRestartEnable-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetPrimitiveRestartEnable-videocoding) VUID-vkCmdSetPrimitiveRestartEnable-videocoding

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

vkCmdSetPrimitiveRestartEnable is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state2](VK_EXT_extended_dynamic_state2.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdSetPrimitiveRestartEnable).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
