# vkCmdBlitImage2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBlitImage2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBlitImage2 - Copy regions of an image, potentially performing format conversion,

To copy regions of a source image into a destination image, potentially
performing format conversion, arbitrary scaling, and filtering, call:

// Provided by VK_VERSION_1_3
void vkCmdBlitImage2(
    VkCommandBuffer                             commandBuffer,
    const VkBlitImageInfo2*                     pBlitImageInfo);

// Provided by VK_KHR_copy_commands2
// Equivalent to vkCmdBlitImage2
void vkCmdBlitImage2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkBlitImageInfo2*                     pBlitImageInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pBlitImageInfo` is a pointer to a [VkBlitImageInfo2](VkBlitImageInfo2.html) structure
describing the blit parameters.

This command is functionally identical to [vkCmdBlitImage](vkCmdBlitImage.html), but includes
extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage

* 
[](#VUID-vkCmdBlitImage2-commandBuffer-01834) VUID-vkCmdBlitImage2-commandBuffer-01834

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcImage` **must** not be a protected image

* 
[](#VUID-vkCmdBlitImage2-commandBuffer-01835) VUID-vkCmdBlitImage2-commandBuffer-01835

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdBlitImage2-commandBuffer-01836) VUID-vkCmdBlitImage2-commandBuffer-01836

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBlitImage2-commandBuffer-parameter) VUID-vkCmdBlitImage2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBlitImage2-pBlitImageInfo-parameter) VUID-vkCmdBlitImage2-pBlitImageInfo-parameter

 `pBlitImageInfo` **must** be a valid pointer to a valid [VkBlitImageInfo2](VkBlitImageInfo2.html) structure

* 
[](#VUID-vkCmdBlitImage2-commandBuffer-recording) VUID-vkCmdBlitImage2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBlitImage2-commandBuffer-cmdpool) VUID-vkCmdBlitImage2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBlitImage2-renderpass) VUID-vkCmdBlitImage2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBlitImage2-suspended) VUID-vkCmdBlitImage2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBlitImage2-videocoding) VUID-vkCmdBlitImage2-videocoding

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

vkCmdBlitImage2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkBlitImageInfo2](VkBlitImageInfo2.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdBlitImage2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
