# vkCmdCuLaunchKernelNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCuLaunchKernelNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCuLaunchKernelNVX - Stub description of vkCmdCuLaunchKernelNVX

There is currently no specification language written for this command.
This section acts only as placeholder and to avoid dead links in the
specification and reference pages.

// Provided by VK_NVX_binary_import
void vkCmdCuLaunchKernelNVX(
    VkCommandBuffer                             commandBuffer,
    const VkCuLaunchInfoNVX*                    pLaunchInfo);

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCuLaunchKernelNVX-commandBuffer-parameter) VUID-vkCmdCuLaunchKernelNVX-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCuLaunchKernelNVX-pLaunchInfo-parameter) VUID-vkCmdCuLaunchKernelNVX-pLaunchInfo-parameter

 `pLaunchInfo` **must** be a valid pointer to a valid [VkCuLaunchInfoNVX](VkCuLaunchInfoNVX.html) structure

* 
[](#VUID-vkCmdCuLaunchKernelNVX-commandBuffer-recording) VUID-vkCmdCuLaunchKernelNVX-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCuLaunchKernelNVX-commandBuffer-cmdpool) VUID-vkCmdCuLaunchKernelNVX-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCuLaunchKernelNVX-suspended) VUID-vkCmdCuLaunchKernelNVX-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCuLaunchKernelNVX-videocoding) VUID-vkCmdCuLaunchKernelNVX-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdCuLaunchKernelNVX is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NVX_binary_import](VK_NVX_binary_import.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCuLaunchInfoNVX](VkCuLaunchInfoNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#vkCmdCuLaunchKernelNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
