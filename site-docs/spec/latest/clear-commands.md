# Clear Commands

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/clears.html

## Table of Contents

- [Clearing Images Outside a Render Pass Instance](#clears-outside)
- [Clearing_Images_Outside_a_Render_Pass_Instance](#clears-outside)
- [Clearing Images Inside a Render Pass Instance](#clears-inside)
- [Clearing_Images_Inside_a_Render_Pass_Instance](#clears-inside)
- [Clear Values](#clears-values)
- [Filling Memory](#clears-filling-memory)
- [Updating Memory](#clears-updating-memory)
- [Filling Buffers](#clears-filling-buffers)
- [Updating Buffers](#clears-updating-buffers)

## Content

Color and depth/stencil images **can** be cleared outside a render pass
instance using [vkCmdClearColorImage](#vkCmdClearColorImage) or
[vkCmdClearDepthStencilImage](#vkCmdClearDepthStencilImage), respectively.
These commands are only allowed outside of a render pass instance.

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
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout).

* 
`pColor` is a pointer to a [VkClearColorValue](#VkClearColorValue) structure
containing the values that the image subresource ranges will be cleared
to (see [Clear Values](#clears-values) below).

* 
`rangeCount` is the number of image subresource range structures in
`pRanges`.

* 
`pRanges` is a pointer to an array of [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)
structures describing a range of mipmap levels, array layers, and
aspects to be cleared, as described in [Image    Views](resources.html#resources-image-views).

Each specified range in `pRanges` is cleared to the value specified by
`pColor`.

Valid Usage

* 
[](#VUID-vkCmdClearColorImage-image-01993) VUID-vkCmdClearColorImage-image-01993

The [format features](resources.html#resources-image-format-features) of `image`
**must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdClearColorImage-image-00002) VUID-vkCmdClearColorImage-image-00002

`image` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdClearColorImage-image-01545) VUID-vkCmdClearColorImage-image-01545

`image` **must** not use any of the
[formats that require a    sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion)

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
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[](#VUID-vkCmdClearColorImage-aspectMask-02498) VUID-vkCmdClearColorImage-aspectMask-02498

The [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`aspectMask` members of the
elements of the `pRanges` array **must** each only include
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-vkCmdClearColorImage-baseMipLevel-01470) VUID-vkCmdClearColorImage-baseMipLevel-01470

The [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` members of the
elements of the `pRanges` array **must** each be less than the
`mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-vkCmdClearColorImage-pRanges-01692) VUID-vkCmdClearColorImage-pRanges-01692

For each [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) element of `pRanges`, if the
`levelCount` member is not [VK_REMAINING_MIP_LEVELS](resources.html#VK_REMAINING_MIP_LEVELS), then
`baseMipLevel` +  `levelCount` **must** be less than or
equal to the `mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when
`image` was created

* 
[](#VUID-vkCmdClearColorImage-baseArrayLayer-01472) VUID-vkCmdClearColorImage-baseArrayLayer-01472

The [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseArrayLayer` members of the
elements of the `pRanges` array **must** each be less than the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-vkCmdClearColorImage-pRanges-01693) VUID-vkCmdClearColorImage-pRanges-01693

For each [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) element of `pRanges`, if the
`layerCount` member is not [VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), then
`baseArrayLayer` +  `layerCount` **must** be less than or
equal to the `arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when
`image` was created

* 
[](#VUID-vkCmdClearColorImage-image-00007) VUID-vkCmdClearColorImage-image-00007

`image` **must** not have a compressed or depth/stencil format

* 
[](#VUID-vkCmdClearColorImage-pColor-04961) VUID-vkCmdClearColorImage-pColor-04961

`pColor` **must** be a valid pointer to a [VkClearColorValue](#VkClearColorValue) union

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-01805) VUID-vkCmdClearColorImage-commandBuffer-01805

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`image` **must** not be a protected image

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-01806) VUID-vkCmdClearColorImage-commandBuffer-01806

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
**must** not be an unprotected image

* 
[](#VUID-vkCmdClearColorImage-image-09678) VUID-vkCmdClearColorImage-image-09678

If `image`’s format has components other than R and G, it **must** not
have a 64-bit component width

Valid Usage (Implicit)

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-parameter) VUID-vkCmdClearColorImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdClearColorImage-image-parameter) VUID-vkCmdClearColorImage-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-vkCmdClearColorImage-imageLayout-parameter) VUID-vkCmdClearColorImage-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-vkCmdClearColorImage-pRanges-parameter) VUID-vkCmdClearColorImage-pRanges-parameter

 `pRanges` **must** be a valid pointer to an array of `rangeCount` valid [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) structures

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-recording) VUID-vkCmdClearColorImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdClearColorImage-commandBuffer-cmdpool) VUID-vkCmdClearColorImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

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

 Both of `commandBuffer`, and `image` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdClearColorImage is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

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
ranges to be cleared, and **must** be [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout).

* 
`pDepthStencil` is a pointer to a [VkClearDepthStencilValue](#VkClearDepthStencilValue)
structure containing the values that the depth and stencil image
subresource ranges will be cleared to (see [Clear Values](#clears-values) below).

* 
`rangeCount` is the number of image subresource range structures in
`pRanges`.

* 
`pRanges` is a pointer to an array of [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)
structures describing a range of mipmap levels, array layers, and
aspects to be cleared, as described in [Image    Views](resources.html#resources-image-views).

Valid Usage

* 
[](#VUID-vkCmdClearDepthStencilImage-image-01994) VUID-vkCmdClearDepthStencilImage-image-01994

The [format features](resources.html#resources-image-format-features) of `image`
**must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-02658) VUID-vkCmdClearDepthStencilImage-pRanges-02658

If the `aspect` member of any element of `pRanges` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits), and `image` was created with
[separate stencil usage](resources.html#VkImageStencilUsageCreateInfo), it must have
been created with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-02659) VUID-vkCmdClearDepthStencilImage-pRanges-02659

If the `aspect` member of any element of `pRanges` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits),
and `image` was not created with
[separate stencil usage](resources.html#VkImageStencilUsageCreateInfo),
the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) usage flag **must** have been set
in the [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage` used to create `image`

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-02660) VUID-vkCmdClearDepthStencilImage-pRanges-02660

If the `aspect` member of any element of `pRanges` includes
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits), `image` **must** have been created
with the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) usage flag set

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
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[](#VUID-vkCmdClearDepthStencilImage-aspectMask-02824) VUID-vkCmdClearDepthStencilImage-aspectMask-02824

The [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`aspectMask` member of each
element of the `pRanges` array **must** not include bits other than
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or [VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-vkCmdClearDepthStencilImage-image-02825) VUID-vkCmdClearDepthStencilImage-image-02825

If the `image`’s format does not have a stencil component, then the
[VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`aspectMask` member of each element
of the `pRanges` array **must** not include the
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits) bit

* 
[](#VUID-vkCmdClearDepthStencilImage-image-02826) VUID-vkCmdClearDepthStencilImage-image-02826

If the `image`’s format does not have a depth component, then the
[VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`aspectMask` member of each element
of the `pRanges` array **must** not include the
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) bit

* 
[](#VUID-vkCmdClearDepthStencilImage-baseMipLevel-01474) VUID-vkCmdClearDepthStencilImage-baseMipLevel-01474

The [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` members of the
elements of the `pRanges` array **must** each be less than the
`mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-01694) VUID-vkCmdClearDepthStencilImage-pRanges-01694

For each [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) element of `pRanges`, if the
`levelCount` member is not [VK_REMAINING_MIP_LEVELS](resources.html#VK_REMAINING_MIP_LEVELS), then
`baseMipLevel` +  `levelCount` **must** be less than or
equal to the `mipLevels` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when
`image` was created

* 
[](#VUID-vkCmdClearDepthStencilImage-baseArrayLayer-01476) VUID-vkCmdClearDepthStencilImage-baseArrayLayer-01476

The [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseArrayLayer` members of the
elements of the `pRanges` array **must** each be less than the
`arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image`
was created

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-01695) VUID-vkCmdClearDepthStencilImage-pRanges-01695

For each [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) element of `pRanges`, if the
`layerCount` member is not [VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS), then
`baseArrayLayer` +  `layerCount` **must** be less than or
equal to the `arrayLayers` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo) when
`image` was created

* 
[](#VUID-vkCmdClearDepthStencilImage-image-00014) VUID-vkCmdClearDepthStencilImage-image-00014

`image` **must** have a depth/stencil format

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-01807) VUID-vkCmdClearDepthStencilImage-commandBuffer-01807

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`image` **must** not be a protected image

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-01808) VUID-vkCmdClearDepthStencilImage-commandBuffer-01808

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`image` **must** not be an unprotected image

Valid Usage (Implicit)

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-parameter) VUID-vkCmdClearDepthStencilImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdClearDepthStencilImage-image-parameter) VUID-vkCmdClearDepthStencilImage-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-vkCmdClearDepthStencilImage-imageLayout-parameter) VUID-vkCmdClearDepthStencilImage-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

* 
[](#VUID-vkCmdClearDepthStencilImage-pDepthStencil-parameter) VUID-vkCmdClearDepthStencilImage-pDepthStencil-parameter

 `pDepthStencil` **must** be a valid pointer to a valid [VkClearDepthStencilValue](#VkClearDepthStencilValue) structure

* 
[](#VUID-vkCmdClearDepthStencilImage-pRanges-parameter) VUID-vkCmdClearDepthStencilImage-pRanges-parameter

 `pRanges` **must** be a valid pointer to an array of `rangeCount` valid [VkImageSubresourceRange](resources.html#VkImageSubresourceRange) structures

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-recording) VUID-vkCmdClearDepthStencilImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdClearDepthStencilImage-commandBuffer-cmdpool) VUID-vkCmdClearDepthStencilImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

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

 Both of `commandBuffer`, and `image` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdClearDepthStencilImage is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Clears outside render pass instances are treated as transfer operations for
the purposes of memory barriers.

To clear one or more regions of color and depth/stencil attachments inside a
render pass instance, call:

// Provided by VK_VERSION_1_0
void vkCmdClearAttachments(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    attachmentCount,
    const VkClearAttachment*                    pAttachments,
    uint32_t                                    rectCount,
    const VkClearRect*                          pRects);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`attachmentCount` is the number of entries in the `pAttachments`
array.

* 
`pAttachments` is a pointer to an array of [VkClearAttachment](#VkClearAttachment)
structures defining the attachments to clear and the clear values to
use.

* 
`rectCount` is the number of entries in the `pRects` array.

* 
`pRects` is a pointer to an array of [VkClearRect](#VkClearRect) structures
defining regions to clear for every attachment in `pAttachments`.

If the render pass has a [fragment density map attachment](renderpass.html#renderpass-fragmentdensitymapattachment), clears follow the
[operations of fragment density maps](fragmentdensitymapops.html#fragmentdensitymapops) as if each
clear region was a primitive which generates fragments.
The clear color is applied to all pixels inside each fragment’s area
regardless if the pixels lie outside of the clear region.
Clears **may** have a different set of supported fragment areas than draws.

Unlike other [clear commands](#clears), [vkCmdClearAttachments](#vkCmdClearAttachments) is not a
transfer command.
It performs its operations in [rasterization order](primsrast.html#primsrast-order).
For color attachments, the operations are executed as color attachment
writes, by the [VK_PIPELINE_STAGE_COLOR_ATTACHMENT_OUTPUT_BIT](synchronization.html#VkPipelineStageFlagBits) stage.
For depth/stencil attachments, the operations are executed as
[depth writes](fragops.html#fragops-depth) and [stencil writes](fragops.html#fragops-stencil) by
the [VK_PIPELINE_STAGE_EARLY_FRAGMENT_TESTS_BIT](synchronization.html#VkPipelineStageFlagBits) and
[VK_PIPELINE_STAGE_LATE_FRAGMENT_TESTS_BIT](synchronization.html#VkPipelineStageFlagBits) stages.

`vkCmdClearAttachments` is not affected by the bound pipeline state.

|  | It is generally preferable to clear attachments by using the
| --- | --- |
[VK_ATTACHMENT_LOAD_OP_CLEAR](renderpass.html#VkAttachmentLoadOp) load operation at the start of rendering,
as it is more efficient on some implementations. |

If any attachment’s `aspectMask` to be cleared is not backed by an image
view, the clear has no effect on that aspect.

If an attachment being cleared refers to an image view created with an
`aspectMask` equal to one of [VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits),
[VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits) or [VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits), it
is considered to be [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits) for purposes of this
command, and **must** be cleared with the [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)
aspect as specified by [image view creation](resources.html#image-views-plane-promotion).

Valid Usage

* 
[](#VUID-vkCmdClearAttachments-aspectMask-07884) VUID-vkCmdClearAttachments-aspectMask-07884

If
the current render pass instance does not use dynamic rendering, and
the `aspectMask` member of any element of `pAttachments`
contains [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits), the current subpass instance’s
depth-stencil attachment **must** be either [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) or
the attachment `format` **must** contain a depth component

* 
[](#VUID-vkCmdClearAttachments-aspectMask-07885) VUID-vkCmdClearAttachments-aspectMask-07885

If
the current render pass instance does not use dynamic rendering, and
the `aspectMask` member of any element of `pAttachments`
contains [VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits), the current subpass
instance’s depth-stencil attachment **must** be either
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) or the attachment `format` **must** contain
a stencil component

* 
[](#VUID-vkCmdClearAttachments-aspectMask-07271) VUID-vkCmdClearAttachments-aspectMask-07271

If the `aspectMask` member of any element of `pAttachments`
contains [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits), the `colorAttachment`
**must** be a valid color attachment index in the current render pass
instance

* 
[](#VUID-vkCmdClearAttachments-rect-02682) VUID-vkCmdClearAttachments-rect-02682

The `rect` member of each element of `pRects` **must** have an
`extent.width` greater than `0`

* 
[](#VUID-vkCmdClearAttachments-rect-02683) VUID-vkCmdClearAttachments-rect-02683

The `rect` member of each element of `pRects` **must** have an
`extent.height` greater than `0`

* 
[](#VUID-vkCmdClearAttachments-pRects-00016) VUID-vkCmdClearAttachments-pRects-00016

The rectangular region specified by each element of `pRects` **must**
be contained within the render area of the current render pass instance

* 
[](#VUID-vkCmdClearAttachments-pRects-06937) VUID-vkCmdClearAttachments-pRects-06937

The layers specified by each element of `pRects` **must** be contained
within every attachment that `pAttachments` refers to, i.e. for each
element of `pRects`, [VkClearRect](#VkClearRect)::`baseArrayLayer` + 
[VkClearRect](#VkClearRect)::`layerCount` **must** be less than or equal to the
number of layers rendered to in the current render pass instance

* 
[](#VUID-vkCmdClearAttachments-layerCount-01934) VUID-vkCmdClearAttachments-layerCount-01934

The `layerCount` member of each element of `pRects` **must** not be
`0`

* 
[](#VUID-vkCmdClearAttachments-commandBuffer-02504) VUID-vkCmdClearAttachments-commandBuffer-02504

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
each attachment to be cleared **must** not be a protected image

* 
[](#VUID-vkCmdClearAttachments-commandBuffer-02505) VUID-vkCmdClearAttachments-commandBuffer-02505

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
each attachment to be cleared **must** not be an unprotected image

* 
[](#VUID-vkCmdClearAttachments-baseArrayLayer-00018) VUID-vkCmdClearAttachments-baseArrayLayer-00018

If the render pass instance this is recorded in uses multiview, then
`baseArrayLayer` **must** be zero and `layerCount` **must** be one

* 
[](#VUID-vkCmdClearAttachments-colorAttachment-09503) VUID-vkCmdClearAttachments-colorAttachment-09503

The `colorAttachment` member of each element of `pAttachments`
**must** not identify a color attachment that is currently mapped to
[VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED) in `commandBuffer` via
[VkRenderingAttachmentLocationInfo](interfaces.html#VkRenderingAttachmentLocationInfo)

* 
[](#VUID-vkCmdClearAttachments-aspectMask-09298) VUID-vkCmdClearAttachments-aspectMask-09298

If the subpass this is recorded in performs an external format resolve,
the `aspectMask` member of any element of `pAttachments` **must**
not include `VK_IMAGE_ASPECT_PLANE*_i_*BIT` for any index *i*

* 
[](#VUID-vkCmdClearAttachments-None-09679) VUID-vkCmdClearAttachments-None-09679

If the attachment format has components other than R and G, it **must** not
have a 64-bit component width

* 
[](#VUID-vkCmdClearAttachments-None-10616) VUID-vkCmdClearAttachments-None-10616

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdClearAttachments-commandBuffer-parameter) VUID-vkCmdClearAttachments-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdClearAttachments-pAttachments-parameter) VUID-vkCmdClearAttachments-pAttachments-parameter

 `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkClearAttachment](#VkClearAttachment) structures

* 
[](#VUID-vkCmdClearAttachments-pRects-parameter) VUID-vkCmdClearAttachments-pRects-parameter

 `pRects` **must** be a valid pointer to an array of `rectCount` [VkClearRect](#VkClearRect) structures

* 
[](#VUID-vkCmdClearAttachments-commandBuffer-recording) VUID-vkCmdClearAttachments-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdClearAttachments-commandBuffer-cmdpool) VUID-vkCmdClearAttachments-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdClearAttachments-renderpass) VUID-vkCmdClearAttachments-renderpass

 This command **must** only be called inside of a render pass instance

* 
[](#VUID-vkCmdClearAttachments-suspended) VUID-vkCmdClearAttachments-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdClearAttachments-videocoding) VUID-vkCmdClearAttachments-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdClearAttachments-attachmentCount-arraylength) VUID-vkCmdClearAttachments-attachmentCount-arraylength

 `attachmentCount` **must** be greater than `0`

* 
[](#VUID-vkCmdClearAttachments-rectCount-arraylength) VUID-vkCmdClearAttachments-rectCount-arraylength

 `rectCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Inside | Outside | VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdClearAttachments is affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkClearRect` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkClearRect {
    VkRect2D    rect;
    uint32_t    baseArrayLayer;
    uint32_t    layerCount;
} VkClearRect;

* 
`rect` is the two-dimensional region to be cleared.

* 
`baseArrayLayer` is the first layer to be cleared.

* 
`layerCount` is the number of layers to clear.

The layers [`baseArrayLayer`, `baseArrayLayer` + 
`layerCount`) counting from the base layer of the attachment image view
are cleared.

The `VkClearAttachment` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkClearAttachment {
    VkImageAspectFlags    aspectMask;
    uint32_t              colorAttachment;
    VkClearValue          clearValue;
} VkClearAttachment;

* 
`aspectMask` is a mask selecting the color, depth and/or stencil
aspects of the attachment to be cleared.

* 
`colorAttachment` is only meaningful if
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits) is set in `aspectMask`, in which
case it is an index into the bound color attachments.

* 
`clearValue` is the color or depth/stencil value to clear the
attachment to, as described in [Clear Values](#clears-values) below.

Valid Usage

* 
[](#VUID-VkClearAttachment-aspectMask-00019) VUID-VkClearAttachment-aspectMask-00019

If `aspectMask` includes [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits), it **must**
not include [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkClearAttachment-aspectMask-00020) VUID-VkClearAttachment-aspectMask-00020

`aspectMask` **must** not include [VK_IMAGE_ASPECT_METADATA_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkClearAttachment-aspectMask-02246) VUID-VkClearAttachment-aspectMask-02246

`aspectMask` **must** not include
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for any index *i*

Valid Usage (Implicit)

* 
[](#VUID-VkClearAttachment-aspectMask-parameter) VUID-VkClearAttachment-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits) values

* 
[](#VUID-VkClearAttachment-aspectMask-requiredbitmask) VUID-VkClearAttachment-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

The `VkClearColorValue` structure is defined as:

// Provided by VK_VERSION_1_0
typedef union VkClearColorValue {
    float       float32[4];
    int32_t     int32[4];
    uint32_t    uint32[4];
} VkClearColorValue;

* 
`float32` are the color clear values when the format of the image or
attachment is one of the [numeric formats](formats.html#formats-numericformat) with
a numeric type that is floating-point.
Floating-point values are automatically converted to the format of the
image, with the clear value being treated as linear if the image is
sRGB.

* 
`int32` are the color clear values when the format of the image or
attachment has a numeric type that is signed integer (`SINT`).
Signed integer values are converted to the format of the image by
casting to the smaller type (with negative 32-bit values mapping to
negative values in the smaller type).
If the integer clear value is not representable in the target type (e.g.
would overflow in conversion to that type), the clear value is
**undefined**.

* 
`uint32` are the color clear values when the format of the image or
attachment has a numeric type that is unsigned integer (`UINT`).
Unsigned integer values are converted to the format of the image by
casting to the integer type with fewer bits.

The four array elements of the clear color map to R, G, B, and A components
of image formats, in order.

If the image has more than one sample, the same value is written to all
samples for any pixels being cleared.

If the image or attachment format has a 64-bit component width, the first 2
array elements of each of the arrays above are reinterpreted as a single
64-bit element for the R component.
The next 2 array elements are used in the same way for the G component.
In other words, the union behaves as if it had the following additional
members:

double float64[2];
int64_t int64[2];
uint64_t uint64[2];

The `VkClearDepthStencilValue` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkClearDepthStencilValue {
    float       depth;
    uint32_t    stencil;
} VkClearDepthStencilValue;

* 
`depth` is the clear value for the depth aspect of the depth/stencil
attachment.
It is a floating-point value which is automatically converted to the
attachment’s format.

* 
`stencil` is the clear value for the stencil aspect of the
depth/stencil attachment.
It is a 32-bit integer value which is converted to the attachment’s
format by taking the appropriate number of LSBs.

Valid Usage

* 
[](#VUID-VkClearDepthStencilValue-depth-00022) VUID-VkClearDepthStencilValue-depth-00022

Unless the `[VK_EXT_depth_range_unrestricted](../appendices/extensions.html#VK_EXT_depth_range_unrestricted)` extension is enabled
`depth` **must** be between `0.0` and `1.0`, inclusive

The `VkClearValue` union is defined as:

// Provided by VK_VERSION_1_0
typedef union VkClearValue {
    VkClearColorValue           color;
    VkClearDepthStencilValue    depthStencil;
} VkClearValue;

* 
`color` specifies the color image clear values to use when clearing
a color image or attachment.

* 
`depthStencil` specifies the depth and stencil clear values to use
when clearing a depth/stencil image or attachment.

This union is used where part of the API requires either color or
depth/stencil clear values, depending on the attachment, and defines the
initial clear values in the [VkRenderPassBeginInfo](renderpass.html#VkRenderPassBeginInfo) structure.

To fill a memory range with a fixed 4-byte bit pattern, call:

// Provided by VK_KHR_device_address_commands
void vkCmdFillMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkDeviceAddressRangeKHR*              pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    uint32_t                                    data);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDstRange` is a pointer to the [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
selecting the memory range to be filled.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining the
copy flags for the destination address range.

* 
`data` is the 4-byte word written repeatedly to the destination
range to fill `size` bytes of data.

|  | The bit pattern of `data` is determined by the host endianness.
| --- | --- |
For example, an unsigned integer value of `1` will result in a different bit
pattern on a little endian machine compared to a big endian machine. |

Valid Usage

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13097) VUID-vkCmdFillMemoryKHR-pDstRange-13097

If the range specified by `pDstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13098) VUID-vkCmdFillMemoryKHR-pDstRange-13098

If the buffer from which the range specified by `pDstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13099) VUID-vkCmdFillMemoryKHR-pDstRange-13099

If the buffer from which the range specified by `pDstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-dstFlags-13100) VUID-vkCmdFillMemoryKHR-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13122) VUID-vkCmdFillMemoryKHR-pDstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13123) VUID-vkCmdFillMemoryKHR-pDstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-dstFlags-13101) VUID-vkCmdFillMemoryKHR-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13124) VUID-vkCmdFillMemoryKHR-pDstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13125) VUID-vkCmdFillMemoryKHR-pDstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-dstRange-13000) VUID-vkCmdFillMemoryKHR-dstRange-13000

The buffer from which `dstRange` was queried **must** have been created
with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) usage flag

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13001) VUID-vkCmdFillMemoryKHR-pDstRange-13001

`pDstRange->address` **must** be a multiple of 4

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-13002) VUID-vkCmdFillMemoryKHR-pDstRange-13002

`pDstRange->size` **must** be a multiple of 4

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-13003) VUID-vkCmdFillMemoryKHR-commandBuffer-13003

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-13004) VUID-vkCmdFillMemoryKHR-commandBuffer-13004

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include [VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-parameter) VUID-vkCmdFillMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdFillMemoryKHR-pDstRange-parameter) VUID-vkCmdFillMemoryKHR-pDstRange-parameter

 `pDstRange` **must** be a valid pointer to a valid [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) structure

* 
[](#VUID-vkCmdFillMemoryKHR-dstFlags-parameter) VUID-vkCmdFillMemoryKHR-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-recording) VUID-vkCmdFillMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdFillMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdFillMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdFillMemoryKHR-renderpass) VUID-vkCmdFillMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdFillMemoryKHR-suspended) VUID-vkCmdFillMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdFillMemoryKHR-videocoding) VUID-vkCmdFillMemoryKHR-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdFillMemoryKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To update device memory inline in a command buffer, call:

// Provided by VK_KHR_device_address_commands
void vkCmdUpdateMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkDeviceAddressRangeKHR*              pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    VkDeviceSize                                dataSize,
    const void*                                 pData);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pDstRange` is a pointer to the [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
selecting the memory range to be updated.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining the
copy flags for the destination address range.

* 
`dataSize` is the number of bytes to update, and **must** be a multiple
of 4.

* 
`pData` is a pointer to the source data for the buffer update, and
**must** be at least `dataSize` bytes in size.

The source data is copied from `pData` to the command buffer when the
command is called, and then copied to `dstRange` when the command is
executed on a device.

|  | Due to the data being copied into command buffers, [memory range copies](copies.html#copies-memory-ranges) are recommended for larger data transfers, to avoid
| --- | --- |
excessive memory consumption. |

Valid Usage

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13097) VUID-vkCmdUpdateMemoryKHR-pDstRange-13097

If the range specified by `pDstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13098) VUID-vkCmdUpdateMemoryKHR-pDstRange-13098

If the buffer from which the range specified by `pDstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13099) VUID-vkCmdUpdateMemoryKHR-pDstRange-13099

If the buffer from which the range specified by `pDstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstFlags-13100) VUID-vkCmdUpdateMemoryKHR-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13122) VUID-vkCmdUpdateMemoryKHR-pDstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13123) VUID-vkCmdUpdateMemoryKHR-pDstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstFlags-13101) VUID-vkCmdUpdateMemoryKHR-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13124) VUID-vkCmdUpdateMemoryKHR-pDstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13125) VUID-vkCmdUpdateMemoryKHR-pDstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstRange-13005) VUID-vkCmdUpdateMemoryKHR-dstRange-13005

The buffer from which `dstRange` was queried **must** have been created
with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) usage flag

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13006) VUID-vkCmdUpdateMemoryKHR-pDstRange-13006

`pDstRange->address` **must** be a multiple of 4

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-13007) VUID-vkCmdUpdateMemoryKHR-pDstRange-13007

`pDstRange->size` **must** be less than or equal to 65536

* 
[](#VUID-vkCmdUpdateMemoryKHR-dataSize-13008) VUID-vkCmdUpdateMemoryKHR-dataSize-13008

`dataSize` **must** be less than or equal to `pDstRange->size`

* 
[](#VUID-vkCmdUpdateMemoryKHR-dataSize-13009) VUID-vkCmdUpdateMemoryKHR-dataSize-13009

`dataSize` **must** be a multiple of 4

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-13010) VUID-vkCmdUpdateMemoryKHR-commandBuffer-13010

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-13011) VUID-vkCmdUpdateMemoryKHR-commandBuffer-13011

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include [VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-parameter) VUID-vkCmdUpdateMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdUpdateMemoryKHR-pDstRange-parameter) VUID-vkCmdUpdateMemoryKHR-pDstRange-parameter

 `pDstRange` **must** be a valid pointer to a valid [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) structure

* 
[](#VUID-vkCmdUpdateMemoryKHR-dstFlags-parameter) VUID-vkCmdUpdateMemoryKHR-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

* 
[](#VUID-vkCmdUpdateMemoryKHR-pData-parameter) VUID-vkCmdUpdateMemoryKHR-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-recording) VUID-vkCmdUpdateMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdUpdateMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdUpdateMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdUpdateMemoryKHR-renderpass) VUID-vkCmdUpdateMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdUpdateMemoryKHR-suspended) VUID-vkCmdUpdateMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdUpdateMemoryKHR-videocoding) VUID-vkCmdUpdateMemoryKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdUpdateMemoryKHR-dataSize-arraylength) VUID-vkCmdUpdateMemoryKHR-dataSize-arraylength

 `dataSize` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdUpdateMemoryKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To clear buffer data, call:

// Provided by VK_VERSION_1_0
void vkCmdFillBuffer(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    dstBuffer,
    VkDeviceSize                                dstOffset,
    VkDeviceSize                                size,
    uint32_t                                    data);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`dstBuffer` is the buffer to be filled.

* 
`dstOffset` is the byte offset into the buffer at which to start
filling, and **must** be a multiple of 4.

* 
`size` is the number of bytes to fill, and **must** be either a
multiple of 4, or [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) to fill the range from
`offset` to the end of the buffer.
If [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) is used and the remaining size of the buffer is
not a multiple of 4, then the nearest smaller multiple is used.

* 
`data` is the 4-byte word written repeatedly to the buffer to fill
`size` bytes of data.
The data word is written to memory according to the host endianness.

`vkCmdFillBuffer` is treated as a “transfer” operation for the
purposes of synchronization barriers.
It is only compatible with buffers created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) usage flag set.

Valid Usage

* 
[](#VUID-vkCmdFillBuffer-dstOffset-00024) VUID-vkCmdFillBuffer-dstOffset-00024

`dstOffset` **must** be less than the size of `dstBuffer`

* 
[](#VUID-vkCmdFillBuffer-dstOffset-00025) VUID-vkCmdFillBuffer-dstOffset-00025

`dstOffset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdFillBuffer-size-00026) VUID-vkCmdFillBuffer-size-00026

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be
greater than `0`

* 
[](#VUID-vkCmdFillBuffer-size-00027) VUID-vkCmdFillBuffer-size-00027

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be
less than or equal to the size of `dstBuffer` minus `dstOffset`

* 
[](#VUID-vkCmdFillBuffer-size-00028) VUID-vkCmdFillBuffer-size-00028

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be a
multiple of `4`

* 
[](#VUID-vkCmdFillBuffer-dstBuffer-00029) VUID-vkCmdFillBuffer-dstBuffer-00029

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdFillBuffer-apiVersion-07894) VUID-vkCmdFillBuffer-apiVersion-07894

If the [VK_KHR_maintenance1](../appendices/extensions.html#VK_KHR_maintenance1) extension is not enabled and
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
1.1, the
[VkCommandPool](cmdbuffers.html#VkCommandPool) that `commandBuffer` was allocated from **must**
support graphics or compute operations

* 
[](#VUID-vkCmdFillBuffer-dstBuffer-00031) VUID-vkCmdFillBuffer-dstBuffer-00031

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](memory.html#VkDeviceMemory) object

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-01811) VUID-vkCmdFillBuffer-commandBuffer-01811

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-01812) VUID-vkCmdFillBuffer-commandBuffer-01812

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be an unprotected buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-parameter) VUID-vkCmdFillBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdFillBuffer-dstBuffer-parameter) VUID-vkCmdFillBuffer-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-recording) VUID-vkCmdFillBuffer-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdFillBuffer-commandBuffer-cmdpool) VUID-vkCmdFillBuffer-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdFillBuffer-renderpass) VUID-vkCmdFillBuffer-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdFillBuffer-suspended) VUID-vkCmdFillBuffer-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdFillBuffer-videocoding) VUID-vkCmdFillBuffer-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdFillBuffer-commonparent) VUID-vkCmdFillBuffer-commonparent

 Both of `commandBuffer`, and `dstBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdFillBuffer is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To update buffer data inline in a command buffer, call:

// Provided by VK_VERSION_1_0
void vkCmdUpdateBuffer(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    dstBuffer,
    VkDeviceSize                                dstOffset,
    VkDeviceSize                                dataSize,
    const void*                                 pData);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`dstBuffer` is a handle to the buffer to be updated.

* 
`dstOffset` is the byte offset into the buffer to start updating,
and **must** be a multiple of 4.

* 
`dataSize` is the number of bytes to update, and **must** be a multiple
of 4.

* 
`pData` is a pointer to the source data for the buffer update, and
**must** be at least `dataSize` bytes in size.

`dataSize` **must** be less than or equal to 65536 bytes.
For larger updates, applications **can** use buffer to buffer
[copies](copies.html#copies-buffers).

|  | Buffer updates performed with `vkCmdUpdateBuffer` first copy the data
| --- | --- |
into command buffer memory when the command is recorded (which requires
additional storage and may incur an additional allocation), and then copy
the data from the command buffer into `dstBuffer` when the command is
executed on a device.

The additional cost of this functionality compared to [buffer to buffer copies](copies.html#copies-buffers) means it should only be used for very small
amounts of data, and is why it is limited to at most 65536 bytes.
Applications **can** work around this restriction by issuing multiple
`vkCmdUpdateBuffer` commands to different ranges of the same buffer, but
doing so is not recommended. |

The source data is copied from `pData` to the command buffer when the
command is called.

`vkCmdUpdateBuffer` is only allowed outside of a render pass.
This command is treated as a “transfer” operation for the purposes of
synchronization barriers.
The [VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) **must** be specified in `usage`
of [VkBufferCreateInfo](resources.html#VkBufferCreateInfo) in order for the buffer to be compatible with
`vkCmdUpdateBuffer`.

Valid Usage

* 
[](#VUID-vkCmdUpdateBuffer-dstOffset-00032) VUID-vkCmdUpdateBuffer-dstOffset-00032

`dstOffset` **must** be less than the size of `dstBuffer`

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-00033) VUID-vkCmdUpdateBuffer-dataSize-00033

`dataSize` **must** be less than or equal to the size of
`dstBuffer` minus `dstOffset`

* 
[](#VUID-vkCmdUpdateBuffer-dstBuffer-00034) VUID-vkCmdUpdateBuffer-dstBuffer-00034

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdUpdateBuffer-dstBuffer-00035) VUID-vkCmdUpdateBuffer-dstBuffer-00035

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdUpdateBuffer-dstOffset-00036) VUID-vkCmdUpdateBuffer-dstOffset-00036

`dstOffset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-00037) VUID-vkCmdUpdateBuffer-dataSize-00037

`dataSize` **must** be less than or equal to `65536`

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-00038) VUID-vkCmdUpdateBuffer-dataSize-00038

`dataSize` **must** be a multiple of `4`

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-01813) VUID-vkCmdUpdateBuffer-commandBuffer-01813

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be a protected buffer

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-01814) VUID-vkCmdUpdateBuffer-commandBuffer-01814

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstBuffer` **must** not be an unprotected buffer

Valid Usage (Implicit)

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-parameter) VUID-vkCmdUpdateBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdUpdateBuffer-dstBuffer-parameter) VUID-vkCmdUpdateBuffer-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdUpdateBuffer-pData-parameter) VUID-vkCmdUpdateBuffer-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-recording) VUID-vkCmdUpdateBuffer-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdUpdateBuffer-commandBuffer-cmdpool) VUID-vkCmdUpdateBuffer-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdUpdateBuffer-renderpass) VUID-vkCmdUpdateBuffer-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdUpdateBuffer-suspended) VUID-vkCmdUpdateBuffer-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdUpdateBuffer-videocoding) VUID-vkCmdUpdateBuffer-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdUpdateBuffer-dataSize-arraylength) VUID-vkCmdUpdateBuffer-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkCmdUpdateBuffer-commonparent) VUID-vkCmdUpdateBuffer-commonparent

 Both of `commandBuffer`, and `dstBuffer` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdUpdateBuffer is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

|  | The `pData` parameter was of type `uint32_t*` instead of `void*`
| --- | --- |
prior to version 1.0.19 of the Specification and [VK_HEADER_VERSION](../appendices/boilerplate.html#VK_HEADER_VERSION) 19
of the [Vulkan Header Files](../appendices/boilerplate.html#boilerplate-headers).
This was a historical anomaly, as the source data may be of other types. |
