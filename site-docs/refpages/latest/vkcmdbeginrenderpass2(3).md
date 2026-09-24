# vkCmdBeginRenderPass2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginRenderPass2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginRenderPass2 - Begin a new render pass

To begin a render pass, call:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
void vkCmdBeginRenderPass2(
    VkCommandBuffer                             commandBuffer,
    const VkRenderPassBeginInfo*                pRenderPassBegin,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo);

// Provided by VK_KHR_create_renderpass2
// Equivalent to vkCmdBeginRenderPass2
void vkCmdBeginRenderPass2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkRenderPassBeginInfo*                pRenderPassBegin,
    const VkSubpassBeginInfo*                   pSubpassBeginInfo);

* 
`commandBuffer` is the command buffer in which to record the
command.

* 
`pRenderPassBegin` is a pointer to a [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)
structure specifying the render pass to begin an instance of, and the
framebuffer the instance uses.
After recording this command, the render pass and framebuffer **may** be
accessed at any point that `commandBuffer` is in the recording or
pending state until it is reset.

* 
`pSubpassBeginInfo` is a pointer to a [VkSubpassBeginInfo](VkSubpassBeginInfo.html)
structure containing information about the subpass which is about to
begin rendering.

After beginning a render pass instance, the command buffer is ready to
record the commands for the first subpass of that render pass.

Valid Usage

* 
[](#VUID-vkCmdBeginRenderPass2-framebuffer-02779) VUID-vkCmdBeginRenderPass2-framebuffer-02779

Both the `framebuffer` and `renderPass` members of
`pRenderPassBegin` **must** have been created on the same
[VkDevice](VkDevice.html) that `commandBuffer` was allocated on

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03094) VUID-vkCmdBeginRenderPass2-initialLayout-03094

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03096) VUID-vkCmdBeginRenderPass2-initialLayout-03096

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-02844) VUID-vkCmdBeginRenderPass2-initialLayout-02844

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
[](#VUID-vkCmdBeginRenderPass2-stencilInitialLayout-02845) VUID-vkCmdBeginRenderPass2-stencilInitialLayout-02845

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03097) VUID-vkCmdBeginRenderPass2-initialLayout-03097

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03098) VUID-vkCmdBeginRenderPass2-initialLayout-03098

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03099) VUID-vkCmdBeginRenderPass2-initialLayout-03099

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-03100) VUID-vkCmdBeginRenderPass2-initialLayout-03100

If the `initialLayout` member of any of the
`VkAttachmentDescription` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is not [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html), then each
such `initialLayout` **must** be equal to the current layout of the
corresponding attachment image subresource of the framebuffer specified
in the `framebuffer` member of `pRenderPassBegin`

* 
[](#VUID-vkCmdBeginRenderPass2-srcStageMask-06453) VUID-vkCmdBeginRenderPass2-srcStageMask-06453

The `srcStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass2-dstStageMask-06454) VUID-vkCmdBeginRenderPass2-dstStageMask-06454

The `dstStageMask` members of any element of the `pDependencies`
member of [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) used to create `renderPass`
**must** be supported by the capabilities of the queue family identified by
the `queueFamilyIndex` member of the [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)
used to create the command pool which `commandBuffer` was allocated
from

* 
[](#VUID-vkCmdBeginRenderPass2-framebuffer-02533) VUID-vkCmdBeginRenderPass2-framebuffer-02533

For any attachment in `framebuffer` that is used by `renderPass`
and is bound to memory locations that are also bound to another
attachment used by `renderPass`, and if at least one of those uses
causes either attachment to be written to, both attachments **must** have
had the [VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](VkAttachmentDescriptionFlagBits.html) set

* 
[](#VUID-vkCmdBeginRenderPass2-framebuffer-09046) VUID-vkCmdBeginRenderPass2-framebuffer-09046

If any attachments specified in `framebuffer` are used by
`renderPass` and are bound to overlapping memory locations, there
**must** be only one that is used as a color attachment, depth/stencil, or
resolve attachment in any subpass

* 
[](#VUID-vkCmdBeginRenderPass2-initialLayout-07002) VUID-vkCmdBeginRenderPass2-initialLayout-07002

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-07003) VUID-vkCmdBeginRenderPass2-initialLayout-07003

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
[](#VUID-vkCmdBeginRenderPass2-initialLayout-09538) VUID-vkCmdBeginRenderPass2-initialLayout-09538

If any of the `initialLayout` or `finalLayout` member of the
`VkAttachmentDescription` structures or the `layout` member of
the `VkAttachmentReference` structures specified when creating the
render pass specified in the `renderPass` member of
`pRenderPassBegin` is [VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)
then the corresponding attachment image view of the framebuffer
specified in the `framebuffer` member of `pRenderPassBegin`
**must** have been created with either the [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html)
usage flag set, or both the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)
and either of the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flags set

* 
[](#VUID-vkCmdBeginRenderPass2-flags-10652) VUID-vkCmdBeginRenderPass2-flags-10652

If [VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) was included in the
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags` used to create
the `renderPass`, `commandBuffer` **must** not have been recorded
with [VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](VkCommandBufferUsageFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginRenderPass2-commandBuffer-parameter) VUID-vkCmdBeginRenderPass2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginRenderPass2-pRenderPassBegin-parameter) VUID-vkCmdBeginRenderPass2-pRenderPassBegin-parameter

 `pRenderPassBegin` **must** be a valid pointer to a valid [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html) structure

* 
[](#VUID-vkCmdBeginRenderPass2-pSubpassBeginInfo-parameter) VUID-vkCmdBeginRenderPass2-pSubpassBeginInfo-parameter

 `pSubpassBeginInfo` **must** be a valid pointer to a valid [VkSubpassBeginInfo](VkSubpassBeginInfo.html) structure

* 
[](#VUID-vkCmdBeginRenderPass2-commandBuffer-recording) VUID-vkCmdBeginRenderPass2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginRenderPass2-commandBuffer-cmdpool) VUID-vkCmdBeginRenderPass2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginRenderPass2-renderpass) VUID-vkCmdBeginRenderPass2-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBeginRenderPass2-suspended) VUID-vkCmdBeginRenderPass2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginRenderPass2-videocoding) VUID-vkCmdBeginRenderPass2-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginRenderPass2-bufferlevel) VUID-vkCmdBeginRenderPass2-bufferlevel

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

vkCmdBeginRenderPass2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkCommandBuffer](VkCommandBuffer.html), [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkSubpassBeginInfo](VkSubpassBeginInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
