# vkCmdNextSubpass2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdNextSubpass2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdNextSubpass2 - Transition to the next subpass of a render pass

To transition to the next subpass in the render pass instance after
recording the commands for a subpass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
void vkCmdNextSubpass2(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCmdNextSubpass2
void vkCmdNextSubpass2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo,
    const VkSubpassEndInfo*                     pSubpassEndInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pSubpassBeginInfo` is a pointer to a [VkSubpassBeginInfo](VkSubpassBeginInfo.html)
structure containing information about the subpass which is about to
begin rendering.

* 
`pSubpassEndInfo` is a pointer to a [VkSubpassEndInfo](VkSubpassEndInfo.html) structure
containing information about how the previous subpass will be ended.

`vkCmdNextSubpass2` is semantically identical to [vkCmdNextSubpass](vkCmdNextSubpass.html),
except that it is extensible, and that `contents` is provided as part of
an extensible structure instead of as a flat parameter.

Valid Usage

* 
[](#VUID-vkCmdNextSubpass2-None-03102) VUID-vkCmdNextSubpass2-None-03102

The current subpass index **must** be less than the number of subpasses in
the render pass minus one

* 
[](#VUID-vkCmdNextSubpass2-None-02350) VUID-vkCmdNextSubpass2-None-02350

This command **must** not be recorded when transform feedback is active

Valid Usage (Implicit)

* 
[](#VUID-vkCmdNextSubpass2-commandBuffer-parameter) VUID-vkCmdNextSubpass2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdNextSubpass2-pSubpassBeginInfo-parameter) VUID-vkCmdNextSubpass2-pSubpassBeginInfo-parameter

 `pSubpassBeginInfo` **must** be a valid pointer to a valid [VkSubpassBeginInfo](VkSubpassBeginInfo.html) structure

* 
[](#VUID-vkCmdNextSubpass2-pSubpassEndInfo-parameter) VUID-vkCmdNextSubpass2-pSubpassEndInfo-parameter

 `pSubpassEndInfo` **must** be a valid pointer to a valid [VkSubpassEndInfo](VkSubpassEndInfo.html) structure

* 
[](#VUID-vkCmdNextSubpass2-commandBuffer-recording) VUID-vkCmdNextSubpass2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdNextSubpass2-commandBuffer-cmdpool) VUID-vkCmdNextSubpass2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdNextSubpass2-renderpass) VUID-vkCmdNextSubpass2-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdNextSubpass2-suspended) VUID-vkCmdNextSubpass2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdNextSubpass2-videocoding) VUID-vkCmdNextSubpass2-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdNextSubpass2-bufferlevel) VUID-vkCmdNextSubpass2-bufferlevel

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

vkCmdNextSubpass2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkCommandBuffer](VkCommandBuffer.html), [VkSubpassBeginInfo](VkSubpassBeginInfo.html), [VkSubpassEndInfo](VkSubpassEndInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdNextSubpass2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
