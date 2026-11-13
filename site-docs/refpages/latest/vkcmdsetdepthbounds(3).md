# vkCmdSetDepthBounds(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthBounds.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthBounds - Set depth bounds range dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the depth bounds range,
call:

// Provided by VK_VERSION_1_0
void vkCmdSetDepthBounds(
    VkCommandBuffer                             commandBuffer,
    float                                       minDepthBounds,
    float                                       maxDepthBounds);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`minDepthBounds` is the minimum depth bound.

* 
`maxDepthBounds` is the maximum depth bound.

This command sets the depth bounds range for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_BOUNDS](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)::`minDepthBounds` and
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)::`maxDepthBounds` values
used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDepthBounds-minDepthBounds-00600) VUID-vkCmdSetDepthBounds-minDepthBounds-00600

If the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not enabled
`minDepthBounds` **must** be between `0.0` and `1.0`, inclusive

* 
[](#VUID-vkCmdSetDepthBounds-maxDepthBounds-00601) VUID-vkCmdSetDepthBounds-maxDepthBounds-00601

If the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not enabled
`maxDepthBounds` **must** be between `0.0` and `1.0`, inclusive

* 
[](#VUID-vkCmdSetDepthBounds-minDepthBounds-10912) VUID-vkCmdSetDepthBounds-minDepthBounds-10912

`minDepthBounds` **must** be less than or equal to `maxDepthBounds`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthBounds-commandBuffer-parameter) VUID-vkCmdSetDepthBounds-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthBounds-commandBuffer-recording) VUID-vkCmdSetDepthBounds-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthBounds-commandBuffer-cmdpool) VUID-vkCmdSetDepthBounds-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthBounds-videocoding) VUID-vkCmdSetDepthBounds-videocoding

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

vkCmdSetDepthBounds is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetDepthBounds).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
