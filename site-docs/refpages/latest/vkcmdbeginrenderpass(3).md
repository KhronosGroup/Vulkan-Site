# vkCmdBeginRenderPass(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginRenderPass.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginRenderPass - Begin a new render pass

To begin a render pass instance, call:

|  | This functionality is superseded by [vkCmdBeginRenderPass2](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdBeginRenderPass(
    VkCommandBuffer                             commandBuffer,
    const VkRenderPassBeginInfo*                pRenderPassBegin,
    VkSubpassContents                           contents);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderPassBegin` is a pointer to a [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)
structure specifying the render pass to begin an instance of, and the
framebuffer the instance uses.

* 
`contents` is a [VkSubpassContents](VkSubpassContents.html) value specifying how the
commands in the first subpass will be provided.

After beginning a render pass instance, the command buffer is ready to
record the commands for the first subpass of that render pass.

Valid Usage

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00895) VUID-vkCmdBeginRenderPass-initialLayout-00895

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-01758) VUID-vkCmdBeginRenderPass-initialLayout-01758

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-02842) VUID-vkCmdBeginRenderPass-initialLayout-02842

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then the corresponding
attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass-stencilInitialLayout-02843) VUID-vkCmdBeginRenderPass-stencilInitialLayout-02843

If any of the `stencilInitialLayout` or `stencilFinalLayout`
member of the `VkAttachmentDescriptionStencilLayout` structures or
the `stencilLayout` member of the
`VkAttachmentReferenceStencilLayout` structures specified when
creating the render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) then the corresponding
attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage
flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00897) VUID-vkCmdBeginRenderPass-initialLayout-00897

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00898) VUID-vkCmdBeginRenderPass-initialLayout-00898

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00899) VUID-vkCmdBeginRenderPass-initialLayout-00899

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-00900) VUID-vkCmdBeginRenderPass-initialLayout-00900

If the `initialLayout` member of any of the
`VkAttachmentDescription` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is not [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html), then each
such `initialLayout` **must** be equal to the current layout of the
corresponding attachment image subresource of the framebuffer specified
in the `framebuffer` member of `pRenderPassBegin`

* 
[](#VUID-vkCmdBeginRenderPass-srcStageMask-06451) VUID-vkCmdBeginRenderPass-srcStageMask-06451

The `srcStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass-dstStageMask-06452) VUID-vkCmdBeginRenderPass-dstStageMask-06452

The `dstStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass-framebuffer-02532) VUID-vkCmdBeginRenderPass-framebuffer-02532

For any attachment in `framebuffer` that is used by `renderPass`
and is bound to memory locations that are also bound to another
attachment used by `renderPass`, and if at least one of those uses
causes either attachment to be written to, both attachments **must** have
had the [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](VkAttachmentDescriptionFlagBits.html) set

* 
[](#VUID-vkCmdBeginRenderPass-framebuffer-09045) VUID-vkCmdBeginRenderPass-framebuffer-09045

If any attachments specified in `framebuffer` are used by
`renderPass` and are bound to overlapping memory locations, there
**must** be only one that is used as a color attachment, depth/stencil, or
resolve attachment in any subpass

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-07000) VUID-vkCmdBeginRenderPass-initialLayout-07000

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with either the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set, and
either the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-07001) VUID-vkCmdBeginRenderPass-initialLayout-07001

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html) then the
corresponding attachment image view of the framebuffer specified in the
`framebuffer` member of `pRenderPassBegin` **must** have been
created with the [VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkImageUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBeginRenderPass-initialLayout-09537) VUID-vkCmdBeginRenderPass-initialLayout-09537

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html)
usage flag set, or both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)
and either of [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass-contents-09640) VUID-vkCmdBeginRenderPass-contents-09640

If `contents` is
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](VkSubpassContents.html), then
at least one of the following features **must** be enabled:

[`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7)

* 
[`nestedCommandBuffer`](../../../../spec/latest/chapters/features.html#features-nestedCommandBuffer)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginRenderPass-commandBuffer-parameter) VUID-vkCmdBeginRenderPass-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginRenderPass-pRenderPassBegin-parameter) VUID-vkCmdBeginRenderPass-pRenderPassBegin-parameter

 `pRenderPassBegin` **must** be a valid pointer to a valid [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html) structure

* 
[](#VUID-vkCmdBeginRenderPass-contents-parameter) VUID-vkCmdBeginRenderPass-contents-parameter

 `contents` **must** be a valid [VkSubpassContents](VkSubpassContents.html) value

* 
[](#VUID-vkCmdBeginRenderPass-commandBuffer-recording) VUID-vkCmdBeginRenderPass-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginRenderPass-commandBuffer-cmdpool) VUID-vkCmdBeginRenderPass-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginRenderPass-renderpass) VUID-vkCmdBeginRenderPass-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBeginRenderPass-suspended) VUID-vkCmdBeginRenderPass-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginRenderPass-videocoding) VUID-vkCmdBeginRenderPass-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginRenderPass-bufferlevel) VUID-vkCmdBeginRenderPass-bufferlevel

 `commandBuffer` **must** be a primary `VkCommandBuffer`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary | Outside | Outside | VK_QUEUE_GRAPHICS_BIT | Action

State

Synchronization |

Conditional Rendering

vkCmdBeginRenderPass is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkSubpassContents](VkSubpassContents.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
