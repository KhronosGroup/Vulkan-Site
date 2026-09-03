# vkCmdResolveImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdResolveImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdResolveImage - Resolve regions of an image

To resolve a multisample color image to a non-multisample color image, call:

// Provided by VK_VERSION_1_0
void vkCmdResolveImage(
    VkCommandBuffer                             commandBuffer,
    VkImage                                     srcImage,
    VkImageLayout                               srcImageLayout,
    VkImage                                     dstImage,
    VkImageLayout                               dstImageLayout,
    uint32_t                                    regionCount,
    const VkImageResolve*                       pRegions);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`srcImage` is the source image.

* 
`srcImageLayout` is the layout of the source image subresources for
the resolve.

* 
`dstImage` is the destination image.

* 
`dstImageLayout` is the layout of the destination image subresources
for the resolve.

* 
`regionCount` is the number of regions to resolve.

* 
`pRegions` is a pointer to an array of [VkImageResolve](VkImageResolve.html)
structures specifying the regions to resolve.

During the resolve the samples corresponding to each pixel location in the
source are converted to a single sample before being written to the
destination.

If the source format is a floating-point or normalized type, the resolve
mode is chosen as implementation-dependent behavior.
If the resolve mode requires to calculate the result from multiple samples,
such as by computing an average or weighted average of the samples, the
values for each pixel are resolved with implementation-defined numerical
precision.

If the [numeric format](../../../../spec/latest/chapters/formats.html#formats-numericformat) of `srcImage` uses sRGB
encoding and the resolve mode requires the implementation to convert the
samples to floating-point to perform the calculations, the implementation
**should** convert samples from nonlinear to linear before resolving the
samples as described in the “sRGB EOTF” section of the
[Khronos Data Format Specification](../../../../spec/latest/chapters/introduction.html#data-format).
In this case, the implementation **must** convert the linear averaged value to
nonlinear before writing the resolved result to `dstImage`.
If the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is enabled,
whether a nonlinear to linear conversion happens for sRGB encoded resolve is
controlled by
[`resolveSrgbFormatAppliesTransferFunction`](../../../../spec/latest/chapters/limits.html#limits-resolveSrgbFormatAppliesTransferFunction).

If the source format is an integer type, a single sample’s value is selected
for each pixel.

`srcOffset` and `dstOffset` select the initial `x`, `y`, and
`z` offsets in texels of the sub-regions of the source and destination
image data.
`extent` is the size in texels of the source image to resolve in
`width`, `height` and `depth`.
Each element of `pRegions` **must** be a region that is contained within
its corresponding image.

Resolves are done layer by layer starting with `baseArrayLayer` member
of `srcSubresource` for the source and `dstSubresource` for the
destination.
`layerCount` layers are resolved to the destination image.

Valid Usage

* 
[](#VUID-vkCmdResolveImage-commandBuffer-01837) VUID-vkCmdResolveImage-commandBuffer-01837

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcImage` **must** not be a protected image

* 
[](#VUID-vkCmdResolveImage-commandBuffer-01838) VUID-vkCmdResolveImage-commandBuffer-01838

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdResolveImage-commandBuffer-01839) VUID-vkCmdResolveImage-commandBuffer-01839

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

* 
[](#VUID-vkCmdResolveImage-pRegions-00255) VUID-vkCmdResolveImage-pRegions-00255

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-vkCmdResolveImage-srcImage-00256) VUID-vkCmdResolveImage-srcImage-00256

If `srcImage` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdResolveImage-srcImage-00257) VUID-vkCmdResolveImage-srcImage-00257

`srcImage` **must** have a sample count equal to any valid sample count
value other than [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdResolveImage-dstImage-00258) VUID-vkCmdResolveImage-dstImage-00258

If `dstImage` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdResolveImage-dstImage-00259) VUID-vkCmdResolveImage-dstImage-00259

`dstImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdResolveImage-srcImageLayout-00260) VUID-vkCmdResolveImage-srcImageLayout-00260

`srcImageLayout` **must** specify the layout of the image subresources
of `srcImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdResolveImage-srcImageLayout-01400) VUID-vkCmdResolveImage-srcImageLayout-01400

`srcImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdResolveImage-dstImageLayout-00262) VUID-vkCmdResolveImage-dstImageLayout-00262

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdResolveImage-dstImageLayout-01401) VUID-vkCmdResolveImage-dstImageLayout-01401

`dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdResolveImage-maintenance10-11799) VUID-vkCmdResolveImage-maintenance10-11799

If the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is
enabled, the [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdResolveImage-dstImage-02003) VUID-vkCmdResolveImage-dstImage-02003

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)
if the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled

* 
[](#VUID-vkCmdResolveImage-linearColorAttachment-06519) VUID-vkCmdResolveImage-linearColorAttachment-06519

If the [`linearColorAttachment`](../../../../spec/latest/chapters/features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html), the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-vkCmdResolveImage-srcImage-01386) VUID-vkCmdResolveImage-srcImage-01386

`srcImage` and `dstImage` **must** have been created with the same
image format

* 
[](#VUID-vkCmdResolveImage-srcSubresource-01709) VUID-vkCmdResolveImage-srcSubresource-01709

The `srcSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdResolveImage-dstSubresource-01710) VUID-vkCmdResolveImage-dstSubresource-01710

The `dstSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdResolveImage-srcSubresource-01711) VUID-vkCmdResolveImage-srcSubresource-01711

If `srcSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`srcSubresource.baseArrayLayer` + 
`srcSubresource.layerCount` of each element of `pRegions` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdResolveImage-dstSubresource-01712) VUID-vkCmdResolveImage-dstSubresource-01712

If `dstSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`dstSubresource.baseArrayLayer` + 
`dstSubresource.layerCount` of each element of `pRegions` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdResolveImage-dstImage-02546) VUID-vkCmdResolveImage-dstImage-02546

`dstImage` and `srcImage` **must** not have been created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-vkCmdResolveImage-srcImage-04446) VUID-vkCmdResolveImage-srcImage-04446

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `srcSubresource.layerCount` **must** be `1`

* 
[](#VUID-vkCmdResolveImage-srcImage-04447) VUID-vkCmdResolveImage-srcImage-04447

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `dstSubresource.baseArrayLayer` **must** be
`0` and `dstSubresource.layerCount` **must** be `1`

* 
[](#VUID-vkCmdResolveImage-srcOffset-00269) VUID-vkCmdResolveImage-srcOffset-00269

For each element of `pRegions`, `srcOffset.x` and
(`extent.width` +  `srcOffset.x`) **must** both be
greater than or equal to `0` and less than or equal to the width of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-vkCmdResolveImage-srcOffset-00270) VUID-vkCmdResolveImage-srcOffset-00270

For each element of `pRegions`, `srcOffset.y` and
(`extent.height` +  `srcOffset.y`) **must** both be
greater than or equal to `0` and less than or equal to the height of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-vkCmdResolveImage-srcImage-00271) VUID-vkCmdResolveImage-srcImage-00271

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `srcOffset.y` **must** be `0` and
`extent.height` **must** be `1`

* 
[](#VUID-vkCmdResolveImage-srcOffset-00272) VUID-vkCmdResolveImage-srcOffset-00272

For each element of `pRegions`, `srcOffset.z` and
(`extent.depth` +  `srcOffset.z`) **must** both be
greater than or equal to `0` and less than or equal to the depth of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-vkCmdResolveImage-srcImage-00273) VUID-vkCmdResolveImage-srcImage-00273

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`srcOffset.z` **must** be `0` and `extent.depth` **must** be `1`

* 
[](#VUID-vkCmdResolveImage-dstOffset-00274) VUID-vkCmdResolveImage-dstOffset-00274

For each element of `pRegions`, `dstOffset.x` and
(`extent.width` +  `dstOffset.x`) **must** both be
greater than or equal to `0` and less than or equal to the width of the
specified `dstSubresource` of `dstImage`

* 
[](#VUID-vkCmdResolveImage-dstOffset-00275) VUID-vkCmdResolveImage-dstOffset-00275

For each element of `pRegions`, `dstOffset.y` and
(`extent.height` +  `dstOffset.y`) **must** both be
greater than or equal to `0` and less than or equal to the height of the
specified `dstSubresource` of `dstImage`

* 
[](#VUID-vkCmdResolveImage-dstImage-00276) VUID-vkCmdResolveImage-dstImage-00276

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `dstOffset.y` **must** be `0` and
`extent.height` **must** be `1`

* 
[](#VUID-vkCmdResolveImage-dstOffset-00277) VUID-vkCmdResolveImage-dstOffset-00277

For each element of `pRegions`, `dstOffset.z` and
(`extent.depth` +  `dstOffset.z`) **must** both be
greater than or equal to `0` and less than or equal to the depth of the
specified `dstSubresource` of `dstImage`

* 
[](#VUID-vkCmdResolveImage-dstImage-00278) VUID-vkCmdResolveImage-dstImage-00278

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`dstOffset.z` **must** be `0` and `extent.depth` **must** be `1`

* 
[](#VUID-vkCmdResolveImage-srcImage-06762) VUID-vkCmdResolveImage-srcImage-06762

`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdResolveImage-srcImage-06763) VUID-vkCmdResolveImage-srcImage-06763

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`srcImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdResolveImage-dstImage-06764) VUID-vkCmdResolveImage-dstImage-06764

`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdResolveImage-dstImage-06765) VUID-vkCmdResolveImage-dstImage-06765

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdResolveImage-srcSubresource-11800) VUID-vkCmdResolveImage-srcSubresource-11800

`srcSubresource.aspectMask` for each element in `pRegions` **must**
not specify an aspect which is not part of the image format of
`srcImage`

* 
[](#VUID-vkCmdResolveImage-dstSubresource-11801) VUID-vkCmdResolveImage-dstSubresource-11801

`dstSubresource.aspectMask` for each element in `pRegions` **must**
not specify an aspect which is not part of the image format of
`dstImage`

* 
[](#VUID-vkCmdResolveImage-srcSubresource-11802) VUID-vkCmdResolveImage-srcSubresource-11802

`srcSubresource.aspectMask` **must** equal
`dstSubresource.aspectMask` for each element in `pRegions`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResolveImage-commandBuffer-parameter) VUID-vkCmdResolveImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdResolveImage-srcImage-parameter) VUID-vkCmdResolveImage-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdResolveImage-srcImageLayout-parameter) VUID-vkCmdResolveImage-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdResolveImage-dstImage-parameter) VUID-vkCmdResolveImage-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdResolveImage-dstImageLayout-parameter) VUID-vkCmdResolveImage-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdResolveImage-pRegions-parameter) VUID-vkCmdResolveImage-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkImageResolve](VkImageResolve.html) structures

* 
[](#VUID-vkCmdResolveImage-commandBuffer-recording) VUID-vkCmdResolveImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResolveImage-commandBuffer-cmdpool) VUID-vkCmdResolveImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdResolveImage-renderpass) VUID-vkCmdResolveImage-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdResolveImage-suspended) VUID-vkCmdResolveImage-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdResolveImage-videocoding) VUID-vkCmdResolveImage-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdResolveImage-regionCount-arraylength) VUID-vkCmdResolveImage-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-vkCmdResolveImage-commonparent) VUID-vkCmdResolveImage-commonparent

 Each of `commandBuffer`, `dstImage`, and `srcImage` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdResolveImage is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageResolve](VkImageResolve.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdResolveImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
