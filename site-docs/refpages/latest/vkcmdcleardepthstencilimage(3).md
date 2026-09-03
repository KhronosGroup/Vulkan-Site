# vkCmdClearDepthStencilImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdClearDepthStencilImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdClearDepthStencilImage - Fill regions of a combined depth/stencil image

To clear one or more subranges of a depth/stencil image, call:

// Provided by VK_VERSION_1_0
void vkCmdClearDepthStencilImage(
    VkCommandBuffer                             commandBuffer,
    VkImage                                     image,
    VkImageLayout                               imageLayout,
    const VkClearDepthStencilValue*             pDepthStencil,
    uint32_t                                    rangeCount,
    const VkImageSubresourceRange*              pRanges);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`image` is the image to be cleared.

* 
`imageLayout` specifies the current layout of the image subresource
ranges to be cleared, and **must** be [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html).

* 
`pDepthStencil` is a pointer to a [VkClearDepthStencilValue](VkClearDepthStencilValue.html)
structure containing the values that the depth and stencil image
subresource ranges will be cleared to (see [Clear Values](../../../../spec/latest/chapters/clears.html#clears-values) below).

* 
`rangeCount` is the number of image subresource range structures in
`pRanges`.

* 
`pRanges` is a pointer to an array of [VkImageSubresourceRange](VkImageSubresourceRange.html)
structures describing a range of mipmap levels, array layers, and
aspects to be cleared, as described in [Image    Views](../../../../spec/latest/chapters/resources.html#resources-image-views).

Valid Usage

* 
[](#VUID-vkCmdClearDepthStencilImage-image-01994) VUID-vkCmdClearDepthStencilImage-image-01994

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `image`
**must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-02658) VUID-vkCmdClearDepthStencilImage-pRanges-02658

If the `aspect` member of any element of `pRanges` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), and `image` was created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo), it must have
been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag
set

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-02659) VUID-vkCmdClearDepthStencilImage-pRanges-02659

If the `aspect` member of any element of `pRanges` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html),
and `image` was not created with
[separate stencil usage](../../../../spec/latest/chapters/resources.html#VkImageStencilUsageCreateInfo),
the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag **must** have been set
in the [VkImageCreateInfo](VkImageCreateInfo.html)::`usage` used to create `image`

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-02660) VUID-vkCmdClearDepthStencilImage-pRanges-02660

If the `aspect` member of any element of `pRanges` includes
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), `image` **must** have been created
with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdClearDepthStencilImage-image-00010) VUID-vkCmdClearDepthStencilImage-image-00010

If `image` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdClearDepthStencilImage-imageLayout-00011) VUID-vkCmdClearDepthStencilImage-imageLayout-00011

`imageLayout` **must** specify the layout of the image subresource
ranges of `image` specified in `pRanges` at the time this
command is executed on a `VkDevice`

* 
[](#VUID-vkCmdClearDepthStencilImage-imageLayout-00012) VUID-vkCmdClearDepthStencilImage-imageLayout-00012

`imageLayout` **must** be either of
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdClearDepthStencilImage-aspectMask-02824) VUID-vkCmdClearDepthStencilImage-aspectMask-02824

The [VkImageSubresourceRange](VkImageSubresourceRange.html)::`aspectMask` member of each
element of the `pRanges` array **must** not include bits other than
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdClearDepthStencilImage-image-02825) VUID-vkCmdClearDepthStencilImage-image-02825

If the `image`’s format does not have a stencil component, then the
[VkImageSubresourceRange](VkImageSubresourceRange.html)::`aspectMask` member of each element
of the `pRanges` array **must** not include the
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) bit

* 
[](#VUID-vkCmdClearDepthStencilImage-image-02826) VUID-vkCmdClearDepthStencilImage-image-02826

If the `image`’s format does not have a depth component, then the
[VkImageSubresourceRange](VkImageSubresourceRange.html)::`aspectMask` member of each element
of the `pRanges` array **must** not include the
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) bit

* 
[](#VUID-vkCmdClearDepthStencilImage-baseMipLevel-01474) VUID-vkCmdClearDepthStencilImage-baseMipLevel-01474

The [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseMipLevel` members of the
elements of the `pRanges` array **must** each be less than the
`mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-01694) VUID-vkCmdClearDepthStencilImage-pRanges-01694

For each [VkImageSubresourceRange](VkImageSubresourceRange.html) element of `pRanges`, if the
`levelCount` member is not [VK_REMAINING_MIP_LEVELS](VK_REMAINING_MIP_LEVELS.html), then
`baseMipLevel` +  `levelCount` **must** be less than or
equal to the `mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when
`image` was created

* 
[](#VUID-vkCmdClearDepthStencilImage-baseArrayLayer-01476) VUID-vkCmdClearDepthStencilImage-baseArrayLayer-01476

The [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseArrayLayer` members of the
elements of the `pRanges` array **must** each be less than the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-01695) VUID-vkCmdClearDepthStencilImage-pRanges-01695

For each [VkImageSubresourceRange](VkImageSubresourceRange.html) element of `pRanges`, if the
`layerCount` member is not [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), then
`baseArrayLayer` +  `layerCount` **must** be less than or
equal to the `arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when
`image` was created

* 
[](#VUID-vkCmdClearDepthStencilImage-image-00014) VUID-vkCmdClearDepthStencilImage-image-00014

`image` **must** have a depth/stencil format

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-01807) VUID-vkCmdClearDepthStencilImage-commandBuffer-01807

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`image` **must** not be a protected image

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-01808) VUID-vkCmdClearDepthStencilImage-commandBuffer-01808

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`image` **must** not be an unprotected image

Valid Usage (Implicit)

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-parameter) VUID-vkCmdClearDepthStencilImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdClearDepthStencilImage-image-parameter) VUID-vkCmdClearDepthStencilImage-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdClearDepthStencilImage-imageLayout-parameter) VUID-vkCmdClearDepthStencilImage-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdClearDepthStencilImage-pDepthStencil-parameter) VUID-vkCmdClearDepthStencilImage-pDepthStencil-parameter

 `pDepthStencil` **must** be a valid pointer to a valid [VkClearDepthStencilValue](VkClearDepthStencilValue.html) structure

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-parameter) VUID-vkCmdClearDepthStencilImage-pRanges-parameter

 `pRanges` **must** be a valid pointer to an array of `rangeCount` valid [VkImageSubresourceRange](VkImageSubresourceRange.html) structures

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-recording) VUID-vkCmdClearDepthStencilImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-cmdpool) VUID-vkCmdClearDepthStencilImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdClearDepthStencilImage-renderpass) VUID-vkCmdClearDepthStencilImage-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdClearDepthStencilImage-suspended) VUID-vkCmdClearDepthStencilImage-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdClearDepthStencilImage-videocoding) VUID-vkCmdClearDepthStencilImage-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdClearDepthStencilImage-rangeCount-arraylength) VUID-vkCmdClearDepthStencilImage-rangeCount-arraylength

 `rangeCount` **must** be greater than `0`

* 
[](#VUID-vkCmdClearDepthStencilImage-commonparent) VUID-vkCmdClearDepthStencilImage-commonparent

 Both of `commandBuffer`, and `image` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdClearDepthStencilImage is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkClearDepthStencilValue](VkClearDepthStencilValue.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageSubresourceRange](VkImageSubresourceRange.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#vkCmdClearDepthStencilImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
