# vkCmdSetRenderingInputAttachmentIndices(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetRenderingInputAttachmentIndices.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetRenderingInputAttachmentIndices - Set input attachment index mappings for a command buffer

To set the input attachment index mappings during dynamic rendering, call:

// Provided by VK_VERSION_1_4
void vkCmdSetRenderingInputAttachmentIndices(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInputAttachmentIndexInfo*  pInputAttachmentIndexInfo);

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to vkCmdSetRenderingInputAttachmentIndices
void vkCmdSetRenderingInputAttachmentIndicesKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInputAttachmentIndexInfo*  pInputAttachmentIndexInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInputAttachmentIndexInfo` is a
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html) structure indicating the new
mappings.

This command sets the input attachment index mappings for subsequent drawing
commands, and **must** match the mappings provided to the bound pipeline,
if one is bound,
which **can** be set by chaining [VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html) to
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html).

Until this command is called, mappings in the command buffer state are
treated as each color attachment specified in [vkCmdBeginRendering](vkCmdBeginRendering.html)
mapping to subpass inputs with a `InputAttachmentIndex` equal to its
index in [VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments`, and depth/stencil
attachments mapping to input attachments without these decorations.
This state is reset whenever [vkCmdBeginRendering](vkCmdBeginRendering.html) is called.

Valid Usage

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-dynamicRenderingLocalRead-09516) VUID-vkCmdSetRenderingInputAttachmentIndices-dynamicRenderingLocalRead-09516

[`dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead)
**must** be enabled

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-09517) VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-09517

`pInputAttachmentIndexInfo->colorAttachmentCount` **must** be equal to
the value of [VkRenderingInfo](VkRenderingInfo.html)::`colorAttachmentCount` used to
begin the current render pass instance

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-09518) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-09518

The current render pass instance **must** have been started or resumed by
[vkCmdBeginRendering](vkCmdBeginRendering.html) in this `commandBuffer`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-parameter) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-parameter) VUID-vkCmdSetRenderingInputAttachmentIndices-pInputAttachmentIndexInfo-parameter

 `pInputAttachmentIndexInfo` **must** be a valid pointer to a valid [VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html) structure

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-recording) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-cmdpool) VUID-vkCmdSetRenderingInputAttachmentIndices-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-renderpass) VUID-vkCmdSetRenderingInputAttachmentIndices-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdSetRenderingInputAttachmentIndices-videocoding) VUID-vkCmdSetRenderingInputAttachmentIndices-videocoding

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

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetRenderingInputAttachmentIndices is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/interfaces.html#vkCmdSetRenderingInputAttachmentIndices).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
