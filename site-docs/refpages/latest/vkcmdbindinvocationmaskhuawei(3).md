# vkCmdBindInvocationMaskHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindInvocationMaskHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindInvocationMaskHUAWEI - Bind an invocation mask image on a command buffer

When invocation mask image usage is enabled in the bound ray tracing
pipeline, the pipeline uses an invocation mask image specified by the
command:

// Provided by VK_HUAWEI_invocation_mask
void vkCmdBindInvocationMaskHUAWEI(
    VkCommandBuffer                             commandBuffer,
    VkImageView                                 imageView,
    VkImageLayout                               imageLayout);

* 
`commandBuffer` is the command buffer into which the command will be
recorded

* 
`imageView` is an image view handle specifying the invocation mask
image `imageView` **may** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html), which is equivalent
to specifying a view of an image filled with ones value.

* 
`imageLayout` is the layout that the image subresources accessible
from `imageView` will be in when the invocation mask image is
accessed

Valid Usage

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-None-04976) VUID-vkCmdBindInvocationMaskHUAWEI-None-04976

The [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature **must** be
enabled

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04977) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04977

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** be a valid
[VkImageView](VkImageView.html) handle of type [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04978) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04978

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have a format
of [VK_FORMAT_R8_UINT](VkFormat.html)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04979) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04979

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have been
created with the [VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04980) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-04980

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageLayout` **must**
be [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-width-04981) VUID-vkCmdBindInvocationMaskHUAWEI-width-04981

Thread mask image resolution **must** match the `width` and
`height` in [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-None-04982) VUID-vkCmdBindInvocationMaskHUAWEI-None-04982

Each element in the invocation mask image **must** have the value `0` or
`1`.
The value 1 means the invocation is active

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-depth-04983) VUID-vkCmdBindInvocationMaskHUAWEI-depth-04983

`depth` in [vkCmdTraceRaysKHR](vkCmdTraceRaysKHR.html) **must** be 1

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-parameter) VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageView-parameter) VUID-vkCmdBindInvocationMaskHUAWEI-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-imageLayout-parameter) VUID-vkCmdBindInvocationMaskHUAWEI-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-recording) VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-cmdpool) VUID-vkCmdBindInvocationMaskHUAWEI-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-renderpass) VUID-vkCmdBindInvocationMaskHUAWEI-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-videocoding) VUID-vkCmdBindInvocationMaskHUAWEI-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindInvocationMaskHUAWEI-commonparent) VUID-vkCmdBindInvocationMaskHUAWEI-commonparent

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | State |

Conditional Rendering

vkCmdBindInvocationMaskHUAWEI is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_HUAWEI_invocation_mask](VK_HUAWEI_invocation_mask.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImageLayout](VkImageLayout.html), [VkImageView](VkImageView.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/raytracing.html#vkCmdBindInvocationMaskHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
