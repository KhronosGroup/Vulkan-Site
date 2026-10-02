# vkCmdNextSubpass(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdNextSubpass.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdNextSubpass - Transition to the next subpass of a render pass

To transition to the next subpass in the render pass instance after
recording the commands for a subpass, call:

|  | This functionality is superseded by [vkCmdNextSubpass2](../../../../spec/latest/chapters/renderpass.html#vkCmdNextSubpass2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdNextSubpass(
    VkCommandBuffer                             commandBuffer,
    VkSubpassContents                           contents);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`contents` specifies how the commands in the next subpass will be
provided, in the same fashion as the corresponding parameter of
[vkCmdBeginRenderPass](vkCmdBeginRenderPass.html).

The subpass index for a render pass begins at zero when
`vkCmdBeginRenderPass` is recorded, and increments each time
`vkCmdNextSubpass` is recorded.

After transitioning to the next subpass, the application **can** record the
commands for that subpass.

Valid Usage

* 
[](#VUID-vkCmdNextSubpass-None-00909) VUID-vkCmdNextSubpass-None-00909

The current subpass index **must** be less than the number of subpasses in
the render pass minus one

* 
[](#VUID-vkCmdNextSubpass-None-02349) VUID-vkCmdNextSubpass-None-02349

This command **must** not be recorded when transform feedback is active

Valid Usage (Implicit)

* 
[](#VUID-vkCmdNextSubpass-commandBuffer-parameter) VUID-vkCmdNextSubpass-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdNextSubpass-contents-parameter) VUID-vkCmdNextSubpass-contents-parameter

 `contents` **must** be a valid [VkSubpassContents](VkSubpassContents.html) value

* 
[](#VUID-vkCmdNextSubpass-commandBuffer-recording) VUID-vkCmdNextSubpass-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdNextSubpass-commandBuffer-cmdpool) VUID-vkCmdNextSubpass-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdNextSubpass-renderpass) VUID-vkCmdNextSubpass-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdNextSubpass-suspended) VUID-vkCmdNextSubpass-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdNextSubpass-videocoding) VUID-vkCmdNextSubpass-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdNextSubpass-bufferlevel) VUID-vkCmdNextSubpass-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdNextSubpass is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkSubpassContents](VkSubpassContents.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdNextSubpass).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
