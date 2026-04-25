# vkCmdResolveImage2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdResolveImage2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdResolveImage2 - Resolve regions of an image

To resolve a multisample image to a non-multisample image, call:

// Provided by VK_VERSION_1_3
void vkCmdResolveImage2(
    VkCommandBuffer                             commandBuffer,
    const VkResolveImageInfo2*                  pResolveImageInfo);

// Provided by VK_KHR_copy_commands2
// Equivalent to vkCmdResolveImage2
void vkCmdResolveImage2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkResolveImageInfo2*                  pResolveImageInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pResolveImageInfo` is a pointer to a [VkResolveImageInfo2](VkResolveImageInfo2.html)
structure describing the resolve parameters.

This command is functionally identical to [vkCmdResolveImage](vkCmdResolveImage.html), but
includes extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage

* 
[](#VUID-vkCmdResolveImage2-commandBuffer-01837) VUID-vkCmdResolveImage2-commandBuffer-01837

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcImage` **must** not be a protected image

* 
[](#VUID-vkCmdResolveImage2-commandBuffer-01838) VUID-vkCmdResolveImage2-commandBuffer-01838

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdResolveImage2-commandBuffer-01839) VUID-vkCmdResolveImage2-commandBuffer-01839

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResolveImage2-commandBuffer-parameter) VUID-vkCmdResolveImage2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdResolveImage2-pResolveImageInfo-parameter) VUID-vkCmdResolveImage2-pResolveImageInfo-parameter

 `pResolveImageInfo` **must** be a valid pointer to a valid [VkResolveImageInfo2](VkResolveImageInfo2.html) structure

* 
[](#VUID-vkCmdResolveImage2-commandBuffer-recording) VUID-vkCmdResolveImage2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResolveImage2-commandBuffer-cmdpool) VUID-vkCmdResolveImage2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdResolveImage2-renderpass) VUID-vkCmdResolveImage2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdResolveImage2-suspended) VUID-vkCmdResolveImage2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdResolveImage2-videocoding) VUID-vkCmdResolveImage2-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdResolveImage2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkResolveImageInfo2](VkResolveImageInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdResolveImage2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
