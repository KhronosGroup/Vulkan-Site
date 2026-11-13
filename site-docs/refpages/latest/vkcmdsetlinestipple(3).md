# vkCmdSetLineStipple(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetLineStipple.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetLineStipple - Set line stipple dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the line stipple state,
call:

// Provided by VK_VERSION_1_4
void vkCmdSetLineStipple(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    lineStippleFactor,
    uint16_t                                    lineStipplePattern);

// Provided by VK_KHR_line_rasterization
// Equivalent to vkCmdSetLineStipple
void vkCmdSetLineStippleKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    lineStippleFactor,
    uint16_t                                    lineStipplePattern);

// Provided by VK_EXT_line_rasterization
// Equivalent to vkCmdSetLineStipple
void vkCmdSetLineStippleEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    lineStippleFactor,
    uint16_t                                    lineStipplePattern);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`lineStippleFactor` is the repeat factor used in stippled line
rasterization.

* 
`lineStipplePattern` is the bit pattern used in stippled line
rasterization.

This command sets the line stipple state for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_LINE_STIPPLE](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html)::`lineStippleFactor`
and
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html)::`lineStipplePattern`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetLineStipple-lineStippleFactor-02776) VUID-vkCmdSetLineStipple-lineStippleFactor-02776

`lineStippleFactor` **must** be in the range [1,256]

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetLineStipple-commandBuffer-parameter) VUID-vkCmdSetLineStipple-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetLineStipple-commandBuffer-recording) VUID-vkCmdSetLineStipple-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetLineStipple-commandBuffer-cmdpool) VUID-vkCmdSetLineStipple-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetLineStipple-videocoding) VUID-vkCmdSetLineStipple-videocoding

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

vkCmdSetLineStipple is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_line_rasterization](VK_EXT_line_rasterization.html), [VK_KHR_line_rasterization](VK_KHR_line_rasterization.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetLineStipple).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
