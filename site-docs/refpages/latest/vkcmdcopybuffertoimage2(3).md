# vkCmdCopyBufferToImage2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyBufferToImage2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyBufferToImage2 - Copy data from a buffer into an image

To copy data from a buffer object to an image object, call:

// Provided by VK_VERSION_1_3
void vkCmdCopyBufferToImage2(
    VkCommandBuffer                             commandBuffer,
    const VkCopyBufferToImageInfo2*             pCopyBufferToImageInfo);

// Provided by VK_KHR_copy_commands2
// Equivalent to vkCmdCopyBufferToImage2
void vkCmdCopyBufferToImage2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyBufferToImageInfo2*             pCopyBufferToImageInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyBufferToImageInfo` is a pointer to a
[VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html) structure describing the copy parameters.

This command is functionally identical to [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html), but
includes extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-01828) VUID-vkCmdCopyBufferToImage2-commandBuffer-01828

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-01829) VUID-vkCmdCopyBufferToImage2-commandBuffer-01829

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-01830) VUID-vkCmdCopyBufferToImage2-commandBuffer-01830

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-07737) VUID-vkCmdCopyBufferToImage2-commandBuffer-07737

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), the
`bufferOffset` member of any element of `pCopyBufferToImageInfo->pRegions` **must** be a
multiple of `4`

* 
[](#VUID-vkCmdCopyBufferToImage2-imageOffset-07738) VUID-vkCmdCopyBufferToImage2-imageOffset-07738

The `imageOffset` and `imageExtent` members of each element of
`pCopyBufferToImageInfo->pRegions` **must** respect the image transfer granularity requirements
of `commandBuffer`’s command pool’s queue family, as described in
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-07739) VUID-vkCmdCopyBufferToImage2-commandBuffer-07739

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html),
and the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled,
for each element of `pCopyBufferToImageInfo->pRegions`, the `aspectMask` member of
`imageSubresource` **must** not be [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-11778) VUID-vkCmdCopyBufferToImage2-commandBuffer-11778

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pCopyBufferToImageInfo->pRegions` the `aspectMask` member of
`imageSubresource` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-11779) VUID-vkCmdCopyBufferToImage2-commandBuffer-11779

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pCopyBufferToImageInfo->pRegions` the `aspectMask` member of `imageSubresource` is
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-11780) VUID-vkCmdCopyBufferToImage2-commandBuffer-11780

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pCopyBufferToImageInfo->pRegions` the `aspectMask` member of
`imageSubresource` is [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-11781) VUID-vkCmdCopyBufferToImage2-commandBuffer-11781

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pCopyBufferToImageInfo->pRegions` the `aspectMask` member of `imageSubresource` is
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-parameter) VUID-vkCmdCopyBufferToImage2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyBufferToImage2-pCopyBufferToImageInfo-parameter) VUID-vkCmdCopyBufferToImage2-pCopyBufferToImageInfo-parameter

 `pCopyBufferToImageInfo` **must** be a valid pointer to a valid [VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html) structure

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-recording) VUID-vkCmdCopyBufferToImage2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyBufferToImage2-commandBuffer-cmdpool) VUID-vkCmdCopyBufferToImage2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyBufferToImage2-renderpass) VUID-vkCmdCopyBufferToImage2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyBufferToImage2-suspended) VUID-vkCmdCopyBufferToImage2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyBufferToImage2-videocoding) VUID-vkCmdCopyBufferToImage2-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdCopyBufferToImage2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyBufferToImage2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
