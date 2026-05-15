# vkCmdClearColorImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdClearColorImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdClearColorImage - Clear regions of a color image

To clear one or more subranges of a color image, call:

// Provided by VK_VERSION_1_0
void vkCmdClearColorImage(
    VkCommandBuffer                             commandBuffer,
    VkImage                                     image,
    VkImageLayout                               imageLayout,
    const VkClearColorValue*                    pColor,
    uint32_t                                    rangeCount,
    const VkImageSubresourceRange*              pRanges);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`image` is the image to be cleared.

* 
`imageLayout` specifies the current layout of the image subresource
ranges to be cleared, and **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html).

* 
`pColor` is a pointer to a [VkClearColorValue](VkClearColorValue.html) structure
containing the values that the image subresource ranges will be cleared
to (see [Clear Values](../../../../spec/latest/chapters/clears.html#clears-values) below).

* 
`rangeCount` is the number of image subresource range structures in
`pRanges`.

* 
`pRanges` is a pointer to an array of [VkImageSubresourceRange](VkImageSubresourceRange.html)
structures describing a range of mipmap levels, array layers, and
aspects to be cleared, as described in [Image    Views](../../../../spec/latest/chapters/resources.html#resources-image-views).

Each specified range in `pRanges` is cleared to the value specified by
`pColor`.

Valid Usage

* 
[](#VUID-vkCmdClearColorImage-image-01993) VUID-vkCmdClearColorImage-image-01993

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `image`
**must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdClearColorImage-image-00002) VUID-vkCmdClearColorImage-image-00002

`image` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdClearColorImage-image-01545) VUID-vkCmdClearColorImage-image-01545

`image` **must** not use any of the
[formats that require a    sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)

* 
[](#VUID-vkCmdClearColorImage-image-00003) VUID-vkCmdClearColorImage-image-00003

If `image` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdClearColorImage-imageLayout-00004) VUID-vkCmdClearColorImage-imageLayout-00004

`imageLayout` **must** specify the layout of the image subresource
ranges of `image` specified in `pRanges` at the time this
command is executed on a `VkDevice`

* 
[](#VUID-vkCmdClearColorImage-imageLayout-01394) VUID-vkCmdClearColorImage-imageLayout-01394

`imageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdClearColorImage-aspectMask-02498) VUID-vkCmdClearColorImage-aspectMask-02498

The [VkImageSubresourceRange](VkImageSubresourceRange.html)::`aspectMask` members of the
elements of the `pRanges` array **must** each only include
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdClearColorImage-baseMipLevel-01470) VUID-vkCmdClearColorImage-baseMipLevel-01470

The [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseMipLevel` members of the
elements of the `pRanges` array **must** each be less than the
`mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-vkCmdClearColorImage-pRanges-01692) VUID-vkCmdClearColorImage-pRanges-01692

For each [VkImageSubresourceRange](VkImageSubresourceRange.html) element of `pRanges`, if the
`levelCount` member is not [VK_REMAINING_MIP_LEVELS](VK_REMAINING_MIP_LEVELS.html), then
`baseMipLevel` +  `levelCount` **must** be less than or
equal to the `mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when
`image` was created

* 
[](#VUID-vkCmdClearColorImage-baseArrayLayer-01472) VUID-vkCmdClearColorImage-baseArrayLayer-01472

The [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseArrayLayer` members of the
elements of the `pRanges` array **must** each be less than the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

* 
[](#VUID-vkCmdClearColorImage-pRanges-01693) VUID-vkCmdClearColorImage-pRanges-01693

For each [VkImageSubresourceRange](VkImageSubresourceRange.html) element of `pRanges`, if the
`layerCount` member is not [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), then
`baseArrayLayer` +  `layerCount` **must** be less than or
equal to the `arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when
`image` was created

* 
[](#VUID-vkCmdClearColorImage-image-00007) VUID-vkCmdClearColorImage-image-00007

`image` **must** not have a compressed or depth/stencil format

* 
[](#VUID-vkCmdClearColorImage-pColor-04961) VUID-vkCmdClearColorImage-pColor-04961

`pColor` **must** be a valid pointer to a [VkClearColorValue](VkClearColorValue.html) union

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-01805) VUID-vkCmdClearColorImage-commandBuffer-01805

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`image` **must** not be a protected image

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-01806) VUID-vkCmdClearColorImage-commandBuffer-01806

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
**must** not be an unprotected image

* 
[](#VUID-vkCmdClearColorImage-image-09678) VUID-vkCmdClearColorImage-image-09678

If `image`’s format has components other than R and G, it **must** not
have a 64-bit component width

Valid Usage (Implicit)

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-parameter) VUID-vkCmdClearColorImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdClearColorImage-image-parameter) VUID-vkCmdClearColorImage-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdClearColorImage-imageLayout-parameter) VUID-vkCmdClearColorImage-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdClearColorImage-pRanges-parameter) VUID-vkCmdClearColorImage-pRanges-parameter

 `pRanges` **must** be a valid pointer to an array of `rangeCount` valid [VkImageSubresourceRange](VkImageSubresourceRange.html) structures

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-recording) VUID-vkCmdClearColorImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-cmdpool) VUID-vkCmdClearColorImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdClearColorImage-renderpass) VUID-vkCmdClearColorImage-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdClearColorImage-suspended) VUID-vkCmdClearColorImage-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdClearColorImage-videocoding) VUID-vkCmdClearColorImage-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdClearColorImage-rangeCount-arraylength) VUID-vkCmdClearColorImage-rangeCount-arraylength

 `rangeCount` **must** be greater than `0`

* 
[](#VUID-vkCmdClearColorImage-commonparent) VUID-vkCmdClearColorImage-commonparent

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdClearColorImage is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkClearColorValue](VkClearColorValue.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageSubresourceRange](VkImageSubresourceRange.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#vkCmdClearColorImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
