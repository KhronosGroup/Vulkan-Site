# vkCmdCopyImage2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyImage2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyImage2 - Copy data between images

To copy data between image objects, call:

// Provided by VK_VERSION_1_3
void vkCmdCopyImage2(
    VkCommandBuffer                             commandBuffer,
    const VkCopyImageInfo2*                     pCopyImageInfo);

// Provided by VK_KHR_copy_commands2
// Equivalent to vkCmdCopyImage2
void vkCmdCopyImage2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyImageInfo2*                     pCopyImageInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pCopyImageInfo` is a pointer to a [VkCopyImageInfo2](VkCopyImageInfo2.html) structure
describing the copy parameters.

This command is functionally identical to [vkCmdCopyImage](vkCmdCopyImage.html), but includes
extensible sub-structures that include `sType` and `pNext`
parameters, allowing them to be more easily extended.

Valid Usage

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-01825) VUID-vkCmdCopyImage2-commandBuffer-01825

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-01826) VUID-vkCmdCopyImage2-commandBuffer-01826

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-01827) VUID-vkCmdCopyImage2-commandBuffer-01827

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-10217) VUID-vkCmdCopyImage2-commandBuffer-10217

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html),
and the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled,
for each element of `pCopyImageInfo->pRegions`, where the `aspectMask` member of
`srcSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html), the
`aspectMask` of `dstSubresource` **must** not be
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11782) VUID-vkCmdCopyImage2-commandBuffer-11782

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pCopyImageInfo->pRegions` the `aspectMask` member of
`srcSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `dstSubresource` is
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11783) VUID-vkCmdCopyImage2-commandBuffer-11783

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pCopyImageInfo->pRegions` the `aspectMask` member of `srcSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`dstSubresource` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11784) VUID-vkCmdCopyImage2-commandBuffer-11784

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pCopyImageInfo->pRegions` the `aspectMask` member of
`srcSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `dstSubresource` is
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11785) VUID-vkCmdCopyImage2-commandBuffer-11785

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pCopyImageInfo->pRegions` the `aspectMask` member of `srcSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`dstSubresource` is [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-10218) VUID-vkCmdCopyImage2-commandBuffer-10218

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html),
and the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled,
for each element of `pCopyImageInfo->pRegions`, where the `aspectMask` member of
`dstSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) then the
`aspectMask` of `srcSubresource` **must** not be
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11786) VUID-vkCmdCopyImage2-commandBuffer-11786

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pCopyImageInfo->pRegions` the `aspectMask` member of
`dstSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `srcSubresource` is
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11787) VUID-vkCmdCopyImage2-commandBuffer-11787

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pCopyImageInfo->pRegions` the `aspectMask` member of `dstSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`srcSubresource` is [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_DEPTH_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11788) VUID-vkCmdCopyImage2-commandBuffer-11788

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) but does support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html),
and in any element of `pCopyImageInfo->pRegions` the `aspectMask` member of
`dstSubresource` is [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the
`aspectMask` of `srcSubresource` is
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_COMPUTE_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-11789) VUID-vkCmdCopyImage2-commandBuffer-11789

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) and [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), but does
support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), and in any element of
`pCopyImageInfo->pRegions` the `aspectMask` member of `dstSubresource` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) and the `aspectMask` of
`srcSubresource` is [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain
[VK_FORMAT_FEATURE_2_STENCIL_COPY_ON_TRANSFER_QUEUE_BIT_KHR](VkFormatFeatureFlagBits2.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-parameter) VUID-vkCmdCopyImage2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyImage2-pCopyImageInfo-parameter) VUID-vkCmdCopyImage2-pCopyImageInfo-parameter

 `pCopyImageInfo` **must** be a valid pointer to a valid [VkCopyImageInfo2](VkCopyImageInfo2.html) structure

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-recording) VUID-vkCmdCopyImage2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyImage2-commandBuffer-cmdpool) VUID-vkCmdCopyImage2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyImage2-renderpass) VUID-vkCmdCopyImage2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyImage2-suspended) VUID-vkCmdCopyImage2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyImage2-videocoding) VUID-vkCmdCopyImage2-videocoding

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

vkCmdCopyImage2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyImageInfo2](VkCopyImageInfo2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyImage2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
