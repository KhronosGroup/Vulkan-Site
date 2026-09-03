# vkCmdSetDiscardRectangleEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDiscardRectangleEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDiscardRectangleEXT - Set discard rectangles dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the discard rectangles,
call:

// Provided by VK_EXT_discard_rectangles
void vkCmdSetDiscardRectangleEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstDiscardRectangle,
    uint32_t                                    discardRectangleCount,
    const VkRect2D*                             pDiscardRectangles);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`firstDiscardRectangle` is the index of the first discard rectangle
whose state is updated by the command.

* 
`discardRectangleCount` is the number of discard rectangles whose
state are updated by the command.

* 
`pDiscardRectangles` is a pointer to an array of [VkRect2D](VkRect2D.html)
structures specifying discard rectangles.

The discard rectangle taken from element i of `pDiscardRectangles`
replace the current state for the discard rectangle at index
`firstDiscardRectangle` +  i, for i in [0,
`discardRectangleCount`).

This command sets the discard rectangles for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html)::`pDiscardRectangles`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-firstDiscardRectangle-00585) VUID-vkCmdSetDiscardRectangleEXT-firstDiscardRectangle-00585

The sum of `firstDiscardRectangle` and `discardRectangleCount`
**must** be less than or equal to
[VkPhysicalDeviceDiscardRectanglePropertiesEXT](VkPhysicalDeviceDiscardRectanglePropertiesEXT.html)::`maxDiscardRectangles`

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-x-00587) VUID-vkCmdSetDiscardRectangleEXT-x-00587

The `x` and `y` member of `offset` in each [VkRect2D](VkRect2D.html)
element of `pDiscardRectangles` **must** be greater than or equal to
`0`

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-offset-00588) VUID-vkCmdSetDiscardRectangleEXT-offset-00588

Evaluation of (`offset.x` +  `extent.width`) in each
[VkRect2D](VkRect2D.html) element of `pDiscardRectangles` **must** not cause a
signed integer addition overflow

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-offset-00589) VUID-vkCmdSetDiscardRectangleEXT-offset-00589

Evaluation of (`offset.y` +  `extent.height`) in each
[VkRect2D](VkRect2D.html) element of `pDiscardRectangles` **must** not cause a
signed integer addition overflow

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-viewportScissor2D-04788) VUID-vkCmdSetDiscardRectangleEXT-viewportScissor2D-04788

If this command is recorded in a secondary command buffer with
[VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html)::`viewportScissor2D`
enabled, then this function **must** not be called

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-commandBuffer-parameter) VUID-vkCmdSetDiscardRectangleEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-pDiscardRectangles-parameter) VUID-vkCmdSetDiscardRectangleEXT-pDiscardRectangles-parameter

 `pDiscardRectangles` **must** be a valid pointer to an array of `discardRectangleCount` [VkRect2D](VkRect2D.html) structures

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-commandBuffer-recording) VUID-vkCmdSetDiscardRectangleEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-commandBuffer-cmdpool) VUID-vkCmdSetDiscardRectangleEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-videocoding) VUID-vkCmdSetDiscardRectangleEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetDiscardRectangleEXT-discardRectangleCount-arraylength) VUID-vkCmdSetDiscardRectangleEXT-discardRectangleCount-arraylength

 `discardRectangleCount` **must** be greater than `0`

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

vkCmdSetDiscardRectangleEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRect2D](VkRect2D.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetDiscardRectangleEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
