# vkCmdBeginRendering(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginRendering.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginRendering - Begin a dynamic render pass instance

To begin a render pass instance, call:

// Provided by VK_VERSION_1_3
void vkCmdBeginRendering(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInfo*                      pRenderingInfo);

// Provided by VK_KHR_dynamic_rendering
// Equivalent to vkCmdBeginRendering
void vkCmdBeginRenderingKHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderingInfo*                      pRenderingInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderingInfo` is a pointer to a [VkRenderingInfo](VkRenderingInfo.html) structure
specifying details of the render pass instance to begin.

After beginning a render pass instance, the command buffer is ready to
record [draw commands](../../../../spec/latest/chapters/drawing.html#drawing).

If `pRenderingInfo->flags` includes [VK_RENDERING_RESUMING_BIT](VkRenderingFlagBits.html) then
this render pass is resumed from a render pass instance that has been
suspended earlier in [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

If there is an instance of [VkTileMemorySizeInfoQCOM](VkTileMemorySizeInfoQCOM.html) included in the
`pNext` chain of [VkRenderingInfo](VkRenderingInfo.html), the structure is ignored.

Valid Usage

* 
[](#VUID-vkCmdBeginRendering-dynamicRendering-06446) VUID-vkCmdBeginRendering-dynamicRendering-06446

The [`dynamicRendering`](../../../../spec/latest/chapters/features.html#features-dynamicRendering) feature **must**
be enabled

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-06068) VUID-vkCmdBeginRendering-commandBuffer-06068

If `commandBuffer` is a secondary command buffer,
and the [`nestedCommandBuffer`](../../../../spec/latest/chapters/features.html#features-nestedCommandBuffer)
feature is not enabled,
`pRenderingInfo->flags` **must** not include
[VK_RENDERING_CONTENTS_SECONDARY_COMMAND_BUFFERS_BIT](VkRenderingFlagBits.html)

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-10914) VUID-vkCmdBeginRendering-commandBuffer-10914

If `commandBuffer` is a secondary command buffer,
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](VkCommandBufferUsageFlagBits.html) **must** not have
been set in [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)::`flags` when
`commandBuffer` began

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09588) VUID-vkCmdBeginRendering-pRenderingInfo-09588

If `pRenderingInfo->pDepthAttachment` is not `NULL` and
`pRenderingInfo->pDepthAttachment→imageView` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), when
`pRenderingInfo->pDepthAttachment→imageView` is accessed it **must**
be in the layout specified by
`pRenderingInfo->pDepthAttachment→imageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09589) VUID-vkCmdBeginRendering-pRenderingInfo-09589

If `pRenderingInfo->pDepthAttachment` is not `NULL`,
`pRenderingInfo->pDepthAttachment→imageView` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pRenderingInfo->pDepthAttachment→imageResolveMode` is not
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), and
`pRenderingInfo->pDepthAttachment→resolveImageView` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pRenderingInfo->pDepthAttachment→resolveImageView` **must** be in the
layout specified by
`pRenderingInfo->pDepthAttachment→resolveImageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09590) VUID-vkCmdBeginRendering-pRenderingInfo-09590

If `pRenderingInfo->pStencilAttachment` is not `NULL` and
`pRenderingInfo->pStencilAttachment→imageView` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), when
`pRenderingInfo->pStencilAttachment→imageView` is accessed it **must**
be in the layout specified by
`pRenderingInfo->pStencilAttachment→imageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09591) VUID-vkCmdBeginRendering-pRenderingInfo-09591

If `pRenderingInfo->pStencilAttachment` is not `NULL`,
`pRenderingInfo->pStencilAttachment→imageView` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pRenderingInfo->pStencilAttachment→imageResolveMode` is not
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), and
`pRenderingInfo->pStencilAttachment→resolveImageView` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pRenderingInfo->pStencilAttachment→resolveImageView` **must** be in
the layout specified by
`pRenderingInfo->pStencilAttachment→resolveImageLayout`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09592) VUID-vkCmdBeginRendering-pRenderingInfo-09592

For each element of `pRenderingInfo->pColorAttachments`, if
`imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), when that image view is
accessed it **must** be in the layout specified by the `imageLayout`
member of that same element of `pRenderingInfo->pColorAttachments`

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-09593) VUID-vkCmdBeginRendering-pRenderingInfo-09593

For each element of `pRenderingInfo->pColorAttachments`, if
either `imageResolveMode` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), or
`imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and `resolveMode` is not
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), and `resolveImageView` is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), `resolveImageView` **must** be in the layout
specified by `resolveImageLayout`

* 
[](#VUID-vkCmdBeginRendering-flags-10641) VUID-vkCmdBeginRendering-flags-10641

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) is included in
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`,
`commandBuffer` **must** not have been recorded with
[VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html)

* 
[](#VUID-vkCmdBeginRendering-flags-10642) VUID-vkCmdBeginRendering-flags-10642

[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags` **must** not
include [VK_TILE_SHADING_RENDER_PASS_PER_TILE_EXECUTION_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html)

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-11750) VUID-vkCmdBeginRendering-pRenderingInfo-11750

If `pRenderingInfo->flags` contains
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](VkRenderingFlagBits.html),
[`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) **must** be enabled

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-11751) VUID-vkCmdBeginRendering-pRenderingInfo-11751

If `pRenderingInfo->flags` does not contain
[VK_RENDERING_LOCAL_READ_CONCURRENT_ACCESS_CONTROL_BIT_KHR](VkRenderingFlagBits.html),
attachments **must** not specify
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html)

* 
[](#VUID-vkCmdBeginRendering-imageView-12276) VUID-vkCmdBeginRendering-imageView-12276

If [VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html)::`imageView`
is not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html), when `imageView` is accessed
it **must** be in the layout specified by
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html)::`imageLayout`

* 
[](#VUID-vkCmdBeginRendering-imageView-12277) VUID-vkCmdBeginRendering-imageView-12277

If
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html)::`imageView`
is not equal to [VK_NULL_HANDLE](VK_NULL_HANDLE.html), when `imageView` is accessed
it **must** be in the layout specified by
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html)::`imageLayout`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-parameter) VUID-vkCmdBeginRendering-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginRendering-pRenderingInfo-parameter) VUID-vkCmdBeginRendering-pRenderingInfo-parameter

 `pRenderingInfo` **must** be a valid pointer to a valid [VkRenderingInfo](VkRenderingInfo.html) structure

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-recording) VUID-vkCmdBeginRendering-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginRendering-commandBuffer-cmdpool) VUID-vkCmdBeginRendering-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginRendering-renderpass) VUID-vkCmdBeginRendering-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBeginRendering-suspended) VUID-vkCmdBeginRendering-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginRendering-videocoding) VUID-vkCmdBeginRendering-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State |

Conditional Rendering

vkCmdBeginRendering is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRenderingInfo](VkRenderingInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRendering).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
