# vkCmdSetViewportWithCount(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetViewportWithCount.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetViewportWithCount - Set the viewport count and viewports dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the viewport count and
viewports, call:

// Provided by VK_VERSION_1_3
void vkCmdSetViewportWithCount(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    viewportCount,
    const VkViewport*                           pViewports);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetViewportWithCount
void vkCmdSetViewportWithCountEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    viewportCount,
    const VkViewport*                           pViewports);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`viewportCount` specifies the viewport count.

* 
`pViewports` specifies the viewports to use for drawing.

This command sets the viewport count and viewports state for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the corresponding
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)::`viewportCount` and
`pViewports` values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetViewportWithCount-None-08971) VUID-vkCmdSetViewportWithCount-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
the [VkInstance](VkInstance.html) parent of `commandBuffer` is greater than or
equal to Version 1.3

[](#VUID-vkCmdSetViewportWithCount-viewportCount-03394) VUID-vkCmdSetViewportWithCount-viewportCount-03394

`viewportCount` **must** be between `1` and
`VkPhysicalDeviceLimits`::`maxViewports`, inclusive

[](#VUID-vkCmdSetViewportWithCount-viewportCount-03395) VUID-vkCmdSetViewportWithCount-viewportCount-03395

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `1`

[](#VUID-vkCmdSetViewportWithCount-commandBuffer-04819) VUID-vkCmdSetViewportWithCount-commandBuffer-04819

`commandBuffer` **must** not have
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)::`viewportScissor2D`
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewportWithCount-commandBuffer-parameter) VUID-vkCmdSetViewportWithCount-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetViewportWithCount-pViewports-parameter) VUID-vkCmdSetViewportWithCount-pViewports-parameter

 `pViewports` **must** be a valid pointer to an array of `viewportCount` valid [VkViewport](VkViewport.html) structures

* 
[](#VUID-vkCmdSetViewportWithCount-commandBuffer-recording) VUID-vkCmdSetViewportWithCount-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewportWithCount-commandBuffer-cmdpool) VUID-vkCmdSetViewportWithCount-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetViewportWithCount-videocoding) VUID-vkCmdSetViewportWithCount-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewportWithCount-viewportCount-arraylength) VUID-vkCmdSetViewportWithCount-viewportCount-arraylength

 `viewportCount` **must** be greater than `0`

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

vkCmdSetViewportWithCount is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkViewport](VkViewport.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetViewportWithCount).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
