# vkCmdPipelineBarrier2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPipelineBarrier2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPipelineBarrier2 - Insert a memory dependency

To record a pipeline barrier, call:

// Provided by VK_VERSION_1_3
void vkCmdPipelineBarrier2(
    VkCommandBuffer                             commandBuffer,
    const VkDependencyInfo*                     pDependencyInfo);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdPipelineBarrier2
void vkCmdPipelineBarrier2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkDependencyInfo*                     pDependencyInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pDependencyInfo` is a pointer to a [VkDependencyInfo](VkDependencyInfo.html) structure
defining the scopes of this operation.

When [vkCmdPipelineBarrier2](#) is submitted to a queue, it defines memory
dependencies between commands that were submitted to the same queue before
it, and those submitted to the same queue after it.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes) and
[access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) of each memory
dependency defined by `pDependencyInfo` are applied to operations that
occurred earlier in [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) of each
memory dependency defined by `pDependencyInfo` are applied to operations
that occurred later in [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

If `vkCmdPipelineBarrier2` is recorded within a render pass instance,
the synchronization scopes are limited to a subset of operations within the
same subpass or render pass instance.

Valid Usage

* 
[](#VUID-vkCmdPipelineBarrier2-None-07889) VUID-vkCmdPipelineBarrier2-None-07889

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, the render pass **must** have been created with
at least one subpass dependency that expresses a dependency from the
current subpass to itself, does not include
[VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html) if this command does not,
does not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html) if this command does
not,
and has [synchronization scopes](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
and [access scopes](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) that
are all supersets of the scopes defined in this command

* 
[](#VUID-vkCmdPipelineBarrier2-bufferMemoryBarrierCount-01178) VUID-vkCmdPipelineBarrier2-bufferMemoryBarrierCount-01178

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, it **must** not include any buffer memory
barriers

* 
[](#VUID-vkCmdPipelineBarrier2-image-04073) VUID-vkCmdPipelineBarrier2-image-04073

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, the `image` member of any image memory
barrier included in this command **must** be an attachment used in the
current subpass both as an input attachment, and as either a color,
color resolve,
or depth/stencil attachment

* 
[](#VUID-vkCmdPipelineBarrier2-None-07890) VUID-vkCmdPipelineBarrier2-None-07890

If `vkCmdPipelineBarrier2` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions),
destination stage masks of all memory barriers **must** only include
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions)

* 
[](#VUID-vkCmdPipelineBarrier2-dependencyFlags-07891) VUID-vkCmdPipelineBarrier2-dependencyFlags-07891

If `vkCmdPipelineBarrier2` is called within a render pass instance, and the
source stage masks of any memory barriers include
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions), then
`dependencyFlags` **must** include [VK_DEPENDENCY_BY_REGION_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier2-None-07892) VUID-vkCmdPipelineBarrier2-None-07892

If `vkCmdPipelineBarrier2` is called within a render pass instance, the source
and destination stage masks of any memory barriers **must** only include
graphics pipeline stages

* 
[](#VUID-vkCmdPipelineBarrier2-dependencyFlags-01186) VUID-vkCmdPipelineBarrier2-dependencyFlags-01186

If `vkCmdPipelineBarrier2` is called outside of a render pass instance, the
dependency flags **must** not include [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier2-None-07893) VUID-vkCmdPipelineBarrier2-None-07893

If `vkCmdPipelineBarrier2` is called inside a render pass instance, and there is
more than one view in the current subpass, dependency flags **must**
include [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-vkCmdPipelineBarrier2-None-09553) VUID-vkCmdPipelineBarrier2-None-09553

    
    If
    none of the [    `shaderTileImageColorReadAccess`](../../../../spec/latest/chapters/features.html#features-shaderTileImageColorReadAccess),
    [    `shaderTileImageStencilReadAccess`](../../../../spec/latest/chapters/features.html#features-shaderTileImageStencilReadAccess), or
    [    `shaderTileImageDepthReadAccess`](../../../../spec/latest/chapters/features.html#features-shaderTileImageDepthReadAccess) features are enabled,
and
    the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
    `vkCmdPipelineBarrier2` **must** not be called within a render pass instance
    started with [vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[](#VUID-vkCmdPipelineBarrier2-None-09554) VUID-vkCmdPipelineBarrier2-None-09554

If
the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), there **must** be no buffer or image memory
barriers specified by this command

* 
[](#VUID-vkCmdPipelineBarrier2-None-09586) VUID-vkCmdPipelineBarrier2-None-09586

If
the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, and
`vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), memory barriers specified by this command
**must** only include [VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html),
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html),
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits2.html), or
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits2.html) in their access
masks

* 
[](#VUID-vkCmdPipelineBarrier2-image-09555) VUID-vkCmdPipelineBarrier2-image-09555

If `vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), and the `image` member of any image
memory barrier is used as an attachment in the current render pass
instance, it **must** be in the [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)
or [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) layout

* 
[](#VUID-vkCmdPipelineBarrier2-srcStageMask-09556) VUID-vkCmdPipelineBarrier2-srcStageMask-09556

If `vkCmdPipelineBarrier2` is called within a render pass instance started with
[vkCmdBeginRendering](vkCmdBeginRendering.html), this command **must** only specify
[framebuffer-space stages](../../../../spec/latest/chapters/synchronization.html#synchronization-framebuffer-regions) in
`srcStageMask` and `dstStageMask`

* 
[](#VUID-vkCmdPipelineBarrier2-image-09373) VUID-vkCmdPipelineBarrier2-image-09373

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, the corresponding color
attachment **must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-vkCmdPipelineBarrier2-image-09374) VUID-vkCmdPipelineBarrier2-image-09374

If `vkCmdPipelineBarrier2` is called within a render pass instance using a
[VkRenderPass](VkRenderPass.html) object, and the `image` member of any image
memory barrier is a color resolve attachment, it **must** have been created
with a non-zero [VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat`
value

* 
[](#VUID-vkCmdPipelineBarrier2-oldLayout-01181) VUID-vkCmdPipelineBarrier2-oldLayout-01181

If `vkCmdPipelineBarrier2` is called within a render pass instance, the
`oldLayout` and `newLayout` members of any image memory barrier
included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-01182) VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-01182

If `vkCmdPipelineBarrier2` is called within a render pass instance, the
`srcQueueFamilyIndex` and `dstQueueFamilyIndex` members of any
memory barrier included in this command **must** be equal

* 
[](#VUID-vkCmdPipelineBarrier2-synchronization2-03848) VUID-vkCmdPipelineBarrier2-synchronization2-03848

The [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdPipelineBarrier2-srcStageMask-09673) VUID-vkCmdPipelineBarrier2-srcStageMask-09673

The `srcStageMask` member of any element of the
`pMemoryBarriers` member of `pDependencyInfo` **must** only include
pipeline stages valid for the queue family that was used to create the
command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-dstStageMask-09674) VUID-vkCmdPipelineBarrier2-dstStageMask-09674

The `dstStageMask` member of any element of the
`pMemoryBarriers` member of `pDependencyInfo` **must** only include
pipeline stages valid for the queue family that was used to create the
command pool that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-srcStageMask-09675) VUID-vkCmdPipelineBarrier2-srcStageMask-09675

If a buffer or image memory barrier does not specify an
[acquire operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-acquire),
or if it does but `pDependencyInfo->dependencyFlags` includes
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the respective `srcStageMask` member of the element of the
`pBufferMemoryBarriers` or `pImageMemoryBarriers` members of
`pDependencyInfo` **must** only include pipeline stages valid for the
queue family that was used to create the command pool that
`commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-dstStageMask-09676) VUID-vkCmdPipelineBarrier2-dstStageMask-09676

If a buffer or image memory barrier does not specify an
[release operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers-release),
or if it does but `pDependencyInfo->dependencyFlags` includes
[VK_DEPENDENCY_QUEUE_FAMILY_OWNERSHIP_TRANSFER_USE_ALL_STAGES_BIT_KHR](VkDependencyFlagBits.html),
the respective `dstStageMask` member of the element of the
`pBufferMemoryBarriers` or `pImageMemoryBarriers` members of
`pDependencyInfo` **must** only include pipeline stages valid for the
queue family that was used to create the command pool that
`commandBuffer` was allocated from

* 
[](#VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-10387) VUID-vkCmdPipelineBarrier2-srcQueueFamilyIndex-10387

If a buffer or image memory barrier specifies a
[queue family ownership transfer    operation](../../../../spec/latest/chapters/synchronization.html#synchronization-queue-transfers), either the `srcQueueFamilyIndex` or
`dstQueueFamilyIndex` member of the element of the
`pBufferMemoryBarriers` or `pImageMemoryBarriers` members of
`pDependencyInfo` and the queue family index that was used to create
the command pool that `commandBuffer` was allocated from **must** be
equal

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPipelineBarrier2-commandBuffer-parameter) VUID-vkCmdPipelineBarrier2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPipelineBarrier2-pDependencyInfo-parameter) VUID-vkCmdPipelineBarrier2-pDependencyInfo-parameter

 `pDependencyInfo` **must** be a valid pointer to a valid [VkDependencyInfo](VkDependencyInfo.html) structure

* 
[](#VUID-vkCmdPipelineBarrier2-commandBuffer-recording) VUID-vkCmdPipelineBarrier2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPipelineBarrier2-commandBuffer-cmdpool) VUID-vkCmdPipelineBarrier2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPipelineBarrier2-suspended) VUID-vkCmdPipelineBarrier2-suspended

 This command **must** not be called between suspended render pass instances

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Synchronization |

Conditional Rendering

vkCmdPipelineBarrier2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDependencyInfo](VkDependencyInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkCmdPipelineBarrier2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
