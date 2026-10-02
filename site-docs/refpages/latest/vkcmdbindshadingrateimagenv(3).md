# vkCmdBindShadingRateImageNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindShadingRateImageNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindShadingRateImageNV - Bind a shading rate image on a command buffer

When shading rate image usage is enabled in the bound pipeline, the pipeline
uses a shading rate image specified by the command:

// Provided by VK_NV_shading_rate_image
void vkCmdBindShadingRateImageNV(
    VkCommandBuffer                             commandBuffer,
    VkImageView                                 imageView,
    VkImageLayout                               imageLayout);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`imageView` is an image view handle specifying the shading rate
image.
`imageView` **may** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html), which is equivalent to
specifying a view of an image filled with zero values.

* 
`imageLayout` is the layout that the image subresources accessible
from `imageView` will be in when the shading rate image is accessed.

Valid Usage

* 
[](#VUID-vkCmdBindShadingRateImageNV-None-02058) VUID-vkCmdBindShadingRateImageNV-None-02058

The [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature **must**
be enabled

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02059) VUID-vkCmdBindShadingRateImageNV-imageView-02059

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** be a valid
[VkImageView](VkImageView.html) handle of type [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02060) VUID-vkCmdBindShadingRateImageNV-imageView-02060

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have a format
of [VK_FORMAT_R8_UINT](VkFormat.html)

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02061) VUID-vkCmdBindShadingRateImageNV-imageView-02061

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have been
created with the [VK_IMAGE_USAGE_SHADING_RATE_IMAGE_BIT_NV](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-02062) VUID-vkCmdBindShadingRateImageNV-imageView-02062

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
match the actual [VkImageLayout](VkImageLayout.html) of each subresource accessible from
`imageView` at the time the subresource is accessed

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageLayout-02063) VUID-vkCmdBindShadingRateImageNV-imageLayout-02063

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
be [VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindShadingRateImageNV-commandBuffer-parameter) VUID-vkCmdBindShadingRateImageNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageView-parameter) VUID-vkCmdBindShadingRateImageNV-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-vkCmdBindShadingRateImageNV-imageLayout-parameter) VUID-vkCmdBindShadingRateImageNV-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdBindShadingRateImageNV-commandBuffer-recording) VUID-vkCmdBindShadingRateImageNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindShadingRateImageNV-commandBuffer-cmdpool) VUID-vkCmdBindShadingRateImageNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindShadingRateImageNV-videocoding) VUID-vkCmdBindShadingRateImageNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindShadingRateImageNV-commonparent) VUID-vkCmdBindShadingRateImageNV-commonparent

 Both of `commandBuffer`, and `imageView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdBindShadingRateImageNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImageLayout](VkImageLayout.html), [VkImageView](VkImageView.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdBindShadingRateImageNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
