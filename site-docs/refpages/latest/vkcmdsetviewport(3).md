# vkCmdSetViewport(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetViewport.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetViewport - Set the viewport dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the viewport transformation
parameters, call:

// Provided by VK_VERSION_1_0
void vkCmdSetViewport(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstViewport,
    uint32_t                                    viewportCount,
    const VkViewport*                           pViewports);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstViewport` is the index of the first viewport whose parameters
are updated by the command.

* 
`viewportCount` is the number of viewports whose parameters are
updated by the command.

* 
`pViewports` is a pointer to an array of [VkViewport](VkViewport.html) structures
specifying viewport parameters.

This command sets the viewport transformation parameters state for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_VIEWPORT](VkDynamicState.html)
set in [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
`VkPipelineViewportStateCreateInfo`::`pViewports` values used to
create the currently active pipeline.

The viewport parameters taken from element i of `pViewports`
replace the current state for the viewport index `firstViewport`
+  i, for i in [0, `viewportCount`).

Valid Usage

* 
[](#VUID-vkCmdSetViewport-firstViewport-01223) VUID-vkCmdSetViewport-firstViewport-01223

The sum of `firstViewport` and `viewportCount` **must** be between
`1` and `VkPhysicalDeviceLimits`::`maxViewports`, inclusive

* 
[](#VUID-vkCmdSetViewport-firstViewport-01224) VUID-vkCmdSetViewport-firstViewport-01224

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `firstViewport` **must** be `0`

* 
[](#VUID-vkCmdSetViewport-viewportCount-01225) VUID-vkCmdSetViewport-viewportCount-01225

If the [`multiViewport`](../../../../spec/latest/chapters/features.html#features-multiViewport) feature is not
enabled, `viewportCount` **must** be `1`

* 
[](#VUID-vkCmdSetViewport-commandBuffer-04821) VUID-vkCmdSetViewport-commandBuffer-04821

`commandBuffer` **must** not have
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)::`viewportScissor2D`
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetViewport-commandBuffer-parameter) VUID-vkCmdSetViewport-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetViewport-pViewports-parameter) VUID-vkCmdSetViewport-pViewports-parameter

 `pViewports` **must** be a valid pointer to an array of `viewportCount` valid [VkViewport](VkViewport.html) structures

* 
[](#VUID-vkCmdSetViewport-commandBuffer-recording) VUID-vkCmdSetViewport-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetViewport-commandBuffer-cmdpool) VUID-vkCmdSetViewport-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetViewport-videocoding) VUID-vkCmdSetViewport-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetViewport-viewportCount-arraylength) VUID-vkCmdSetViewport-viewportCount-arraylength

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

vkCmdSetViewport is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkViewport](VkViewport.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#vkCmdSetViewport).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
