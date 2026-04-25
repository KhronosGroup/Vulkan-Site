# vkCmdCopyMemoryToImageIndirectNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMemoryToImageIndirectNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMemoryToImageIndirectNV - Copy data from a memory region to an image object

To copy data from a memory region to an image object by specifying copy
parameters in memory, call:

// Provided by VK_NV_copy_memory_indirect
void vkCmdCopyMemoryToImageIndirectNV(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             copyBufferAddress,
    uint32_t                                    copyCount,
    uint32_t                                    stride,
    VkImage                                     dstImage,
    VkImageLayout                               dstImageLayout,
    const VkImageSubresourceLayers*             pImageSubresources);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`copyBufferAddress` is the address specifying the copy parameters
which are laid out in memory as an array of
[VkCopyMemoryToImageIndirectCommandNV](VkCopyMemoryToImageIndirectCommandKHR.html) structures.

* 
`copyCount` is the number of copies to execute, and **can** be zero.

* 
`stride` is the byte stride between successive sets of copy
parameters.

* 
`dstImage` is the destination image.

* 
`dstImageLayout` is the layout of the destination image subresources
for the copy.

* 
`pImageSubresources` is a pointer to an array of `copyCount`
[VkImageSubresourceLayers](VkImageSubresourceLayers.html) structures, specifying the image
subresources of the destination image data for the copy operation.

Each region in `copyBufferAddress` is copied from the source memory
region to an image region in the destination image.
If the destination image is of type [VK_IMAGE_TYPE_3D](VkImageType.html), the starting
slice and number of slices to copy are specified in
`pImageSubresources->baseArrayLayer` and
`pImageSubresources->layerCount` respectively.

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-None-07660) VUID-vkCmdCopyMemoryToImageIndirectNV-None-07660

The [`indirectCopy`](../../../../spec/latest/chapters/features.html#features-indirectCopy) feature **must** be
enabled

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-offset-07676) VUID-vkCmdCopyMemoryToImageIndirectNV-offset-07676

`copyBufferAddress` **must** be 4 byte aligned

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-stride-07677) VUID-vkCmdCopyMemoryToImageIndirectNV-stride-07677

`stride` **must** be a multiple of `4` and **must** be greater than or
equal to sizeof([VkCopyMemoryToImageIndirectCommandNV](VkCopyMemoryToImageIndirectCommandKHR.html))

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-10956) VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-10956

The [VkCommandPool](VkCommandPool.html) that `commandBuffer` was allocated from
**must** support at least one of the queue types specified in
[VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR](VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR.html)::`supportedQueues`

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07661) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07661

`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-aspectMask-07662) VUID-vkCmdCopyMemoryToImageIndirectNV-aspectMask-07662

The `aspectMask` member for every subresource in
`pImageSubresources` **must** only have a single bit set

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-aspectMask-12287) VUID-vkCmdCopyMemoryToImageIndirectNV-aspectMask-12287

The `aspectMask` member for every subresource in
`pImageSubresources` **must** specify an aspect present in
`dstImage`

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07664) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07664

`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07665) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07665

If `dstImage` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07973) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07973

`dstImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImageLayout-07667) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImageLayout-07667

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` at the time this command is executed on a
`VkDevice`

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImageLayout-07669) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImageLayout-07669

`dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
or [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-mipLevel-07670) VUID-vkCmdCopyMemoryToImageIndirectNV-mipLevel-07670

The specified `mipLevel` of each region in `pImageSubresources`
**must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12288) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12288

If `dstImage` is not of type [VK_IMAGE_TYPE_3D](VkImageType.html), and the
specified `layerCount` of each region in `pImageSubresources` is
not [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), the specified `baseArrayLayer`
+  `layerCount` of each region in `pImageSubresources` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12289) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12289

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), and the specified
`layerCount` of each region in `pImageSubresources` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), for each destination region,
(`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount`) **must** be less than or equal to the
depth of the specified subresource

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12290) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12290

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), and the specified
`layerCount` of each region in `pImageSubresources` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), for each destination region, if
(`imageSubresource.baseArrayLayer` + 
`imageSubresource.layerCount`) does not equal the depth of the
specified subresource, `imageSubresource.layerCount` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12291) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12291

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
destination region, `imageSubresource.baseArrayLayer` **must** be a
multiple of the [texel block extent    depth](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) of the [VkFormat](VkFormat.html) of `dstImage`

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12292) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-12292

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), for each
destination region, `imageSubresource.baseArrayLayer` **must** be less
than or equal to the depth of the specified subresource

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07673) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-07673

`dstImage` **must** not have been created with `flags` containing
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-07674) VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-07674

If the queue family used to create the [VkCommandPool](VkCommandPool.html) which
`commandBuffer` was allocated from does not support
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), for each region, the `aspectMask`
member of `pImageSubresources` **must** not be
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-10974) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-10974

The format features of `dstImage` **must** contain
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-copyBufferAddress-10975) VUID-vkCmdCopyMemoryToImageIndirectNV-copyBufferAddress-10975

Any of the source or destination memory regions specified in
`copyBufferAddress` **must** not overlap with any of the specified
destination memory regions at the time this command is executed on
device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-parameter) VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-copyBufferAddress-parameter) VUID-vkCmdCopyMemoryToImageIndirectNV-copyBufferAddress-parameter

 `copyBufferAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-parameter) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-dstImageLayout-parameter) VUID-vkCmdCopyMemoryToImageIndirectNV-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-pImageSubresources-parameter) VUID-vkCmdCopyMemoryToImageIndirectNV-pImageSubresources-parameter

 `pImageSubresources` **must** be a valid pointer to an array of `copyCount` valid [VkImageSubresourceLayers](VkImageSubresourceLayers.html) structures

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-recording) VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryToImageIndirectNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-renderpass) VUID-vkCmdCopyMemoryToImageIndirectNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-suspended) VUID-vkCmdCopyMemoryToImageIndirectNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-videocoding) VUID-vkCmdCopyMemoryToImageIndirectNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-copyCount-arraylength) VUID-vkCmdCopyMemoryToImageIndirectNV-copyCount-arraylength

 `copyCount` **must** be greater than `0`

* 
[](#VUID-vkCmdCopyMemoryToImageIndirectNV-commonparent) VUID-vkCmdCopyMemoryToImageIndirectNV-commonparent

 Both of `commandBuffer`, and `dstImage` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdCopyMemoryToImageIndirectNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_copy_memory_indirect](VK_NV_copy_memory_indirect.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceAddress`, [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageSubresourceLayers](VkImageSubresourceLayers.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdCopyMemoryToImageIndirectNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
