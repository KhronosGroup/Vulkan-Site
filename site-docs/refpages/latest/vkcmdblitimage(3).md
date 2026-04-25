# vkCmdBlitImage(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBlitImage.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBlitImage - Copy regions of an image, potentially performing format conversion,

To copy regions of a source image into a destination image, potentially
performing format conversion, arbitrary scaling, and filtering, call:

// Provided by VK_VERSION_1_0
void vkCmdBlitImage(
    VkCommandBuffer                             commandBuffer,
    VkImage                                     srcImage,
    VkImageLayout                               srcImageLayout,
    VkImage                                     dstImage,
    VkImageLayout                               dstImageLayout,
    uint32_t                                    regionCount,
    const VkImageBlit*                          pRegions,
    VkFilter                                    filter);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`srcImage` is the source image.

* 
`srcImageLayout` is the layout of the source image subresources for
the blit.

* 
`dstImage` is the destination image.

* 
`dstImageLayout` is the layout of the destination image subresources
for the blit.

* 
`regionCount` is the number of regions to blit.

* 
`pRegions` is a pointer to an array of [VkImageBlit](VkImageBlit.html) structures
specifying the regions to blit.

* 
`filter` is a [VkFilter](VkFilter.html) specifying the filter to apply if the
blits require scaling.

`vkCmdBlitImage` **must** not be used for multisampled source or
destination images.
Use [vkCmdResolveImage](vkCmdResolveImage.html) for this purpose.

As the sizes of the source and destination extents **can** differ in any
dimension, texels in the source extent are scaled and filtered to the
destination extent.
Scaling occurs via the following operations:

* 
For each destination texel, the integer coordinate of that texel is
converted to an unnormalized texture coordinate, using the effective
inverse of the equations described in
[unnormalized to integer    conversion](../../../../spec/latest/chapters/textures.html#textures-unnormalized-to-integer):

ubase = i +  ½

vbase = j +  ½

wbase = k +  ½

* 
These base coordinates are then offset by the first destination offset:

uoffset = ubase - xdst0

voffset = vbase - ydst0

woffset = wbase - zdst0

aoffset = a - `baseArrayCount`dst

* 
The scale is determined from the source and destination regions, and
applied to the offset coordinates:

scaleu = (xsrc1 - xsrc0) / (xdst1 - xdst0)

scalev = (ysrc1 - ysrc0) / (ydst1 - ydst0)

scalew = (zsrc1 - zsrc0) / (zdst1 - zdst0)

uscaled = uoffset × scaleu

vscaled = voffset × scalev

wscaled = woffset × scalew

* 
Finally the source offset is added to the scaled coordinates, to
determine the final unnormalized coordinates used to sample from
`srcImage`:

u = uscaled +  xsrc0

v = vscaled +  ysrc0

w = wscaled +  zsrc0

q = `mipLevel`

a = aoffset +  `baseArrayCount`src

These coordinates are used to sample from the source image, as described in
[Image Operations chapter](../../../../spec/latest/chapters/textures.html#textures), with the filter mode equal to that
of `filter`, a mipmap mode of [VK_SAMPLER_MIPMAP_MODE_NEAREST](VkSamplerMipmapMode.html) and
an address mode of [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html).
Implementations **must** clamp at the edge of the source image, and **may**
additionally clamp to the edge of the source region.

|  | Due to allowable rounding errors in the generation of the source texture
| --- | --- |
coordinates, it is not always possible to guarantee exactly which source
texels will be sampled for a given blit.
As rounding errors are implementation-dependent, the exact results of a
blitting operation are also implementation-dependent. |

Blits are done layer by layer starting with the `baseArrayLayer` member
of `srcSubresource` for the source and `dstSubresource` for the
destination.
`layerCount` layers are blitted to the destination image.

When blitting 3D textures, slices in the destination region bounded by
`dstOffsets`[0].z and `dstOffsets`[1].z are sampled from slices in
the source region bounded by `srcOffsets`[0].z and
`srcOffsets`[1].z.
If the `filter` parameter is [VK_FILTER_LINEAR](VkFilter.html) then the value
sampled from the source image is taken by doing linear filtering using the
interpolated **z** coordinate represented by **w** in the previous equations.
If the `filter` parameter is [VK_FILTER_NEAREST](VkFilter.html) then the value
sampled from the source image is taken from the single nearest slice, with
an implementation-dependent arithmetic rounding mode.

The following filtering and conversion rules apply:

* 
Integer formats **can** only be converted to other integer formats with the
same signedness.

* 
No format conversion is supported between depth/stencil images.
The formats **must** match.

* 
Format conversions on unorm, snorm, scaled and packed float formats of
the copied aspect of the image are performed by first converting the
pixels to float values.

* 
For sRGB source formats, nonlinear RGB values are converted to linear
representation prior to filtering.

* 
After filtering, the float values are first clamped and then cast to the
destination image format.
In case of sRGB destination format, linear RGB values are converted to
nonlinear representation before writing the pixel to the image.

Signed and unsigned integers are converted by first clamping to the
representable range of the destination format, then casting the value.

Valid Usage

* 
[](#VUID-vkCmdBlitImage-commandBuffer-01834) VUID-vkCmdBlitImage-commandBuffer-01834

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`srcImage` **must** not be a protected image

* 
[](#VUID-vkCmdBlitImage-commandBuffer-01835) VUID-vkCmdBlitImage-commandBuffer-01835

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be a protected image

* 
[](#VUID-vkCmdBlitImage-commandBuffer-01836) VUID-vkCmdBlitImage-commandBuffer-01836

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstImage` **must** not be an unprotected image

* 
[](#VUID-vkCmdBlitImage-pRegions-00217) VUID-vkCmdBlitImage-pRegions-00217

The union of all destination regions, specified by the elements of
`pRegions`, **must** not overlap in memory with any texel that **may** be
sampled during the blit operation

* 
[](#VUID-vkCmdBlitImage-srcImage-01999) VUID-vkCmdBlitImage-srcImage-01999

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`srcImage` **must** contain [VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdBlitImage-srcImage-06421) VUID-vkCmdBlitImage-srcImage-06421

`srcImage` **must** not use a
[format that requires a    sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)

* 
[](#VUID-vkCmdBlitImage-srcImage-00219) VUID-vkCmdBlitImage-srcImage-00219

`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBlitImage-srcImage-00220) VUID-vkCmdBlitImage-srcImage-00220

If `srcImage` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdBlitImage-srcImageLayout-00221) VUID-vkCmdBlitImage-srcImageLayout-00221

`srcImageLayout` **must** specify the layout of the image subresources
of `srcImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdBlitImage-srcImageLayout-01398) VUID-vkCmdBlitImage-srcImageLayout-01398

`srcImageLayout` **must** be [VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdBlitImage-srcImage-09459) VUID-vkCmdBlitImage-srcImage-09459

If `srcImage` and `dstImage` are the same, and an elements of
`pRegions` contains the `srcSubresource` and
`dstSubresource` with matching `mipLevel` and overlapping array
layers, then the `srcImageLayout` and `dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)
or [VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html)

* 
[](#VUID-vkCmdBlitImage-dstImage-02000) VUID-vkCmdBlitImage-dstImage-02000

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain [VK_FORMAT_FEATURE_BLIT_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdBlitImage-dstImage-06422) VUID-vkCmdBlitImage-dstImage-06422

`dstImage` **must** not use a
[format that requires a    sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)

* 
[](#VUID-vkCmdBlitImage-dstImage-00224) VUID-vkCmdBlitImage-dstImage-00224

`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBlitImage-dstImage-00225) VUID-vkCmdBlitImage-dstImage-00225

If `dstImage` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdBlitImage-dstImageLayout-00226) VUID-vkCmdBlitImage-dstImageLayout-00226

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-vkCmdBlitImage-dstImageLayout-01399) VUID-vkCmdBlitImage-dstImageLayout-01399

`dstImageLayout` **must** be [VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-vkCmdBlitImage-srcImage-00229) VUID-vkCmdBlitImage-srcImage-00229

If either of `srcImage` or `dstImage` was created with a signed
integer [VkFormat](VkFormat.html), the other **must** also have been created with a
signed integer [VkFormat](VkFormat.html)

* 
[](#VUID-vkCmdBlitImage-srcImage-00230) VUID-vkCmdBlitImage-srcImage-00230

If either of `srcImage` or `dstImage` was created with an
unsigned integer [VkFormat](VkFormat.html), the other **must** also have been created
with an unsigned integer [VkFormat](VkFormat.html)

* 
[](#VUID-vkCmdBlitImage-srcImage-00231) VUID-vkCmdBlitImage-srcImage-00231

If either of `srcImage` or `dstImage` was created with a
depth/stencil format, the other **must** have exactly the same format

* 
[](#VUID-vkCmdBlitImage-srcImage-00232) VUID-vkCmdBlitImage-srcImage-00232

If `srcImage` was created with a depth/stencil format, `filter`
**must** be [VK_FILTER_NEAREST](VkFilter.html)

* 
[](#VUID-vkCmdBlitImage-srcImage-00233) VUID-vkCmdBlitImage-srcImage-00233

`srcImage` **must** have been created with a `samples` value of
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdBlitImage-dstImage-00234) VUID-vkCmdBlitImage-dstImage-00234

`dstImage` **must** have been created with a `samples` value of
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-vkCmdBlitImage-filter-02001) VUID-vkCmdBlitImage-filter-02001

If `filter` is [VK_FILTER_LINEAR](VkFilter.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdBlitImage-filter-02002) VUID-vkCmdBlitImage-filter-02002

If `filter` is [VK_FILTER_CUBIC_EXT](VkFilter.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `srcImage`
**must** contain [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_CUBIC_BIT_EXT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-vkCmdBlitImage-filter-00237) VUID-vkCmdBlitImage-filter-00237

If `filter` is [VK_FILTER_CUBIC_EXT](VkFilter.html), `srcImage` **must** be of
type [VK_IMAGE_TYPE_2D](VkImageType.html)

* 
[](#VUID-vkCmdBlitImage-srcSubresource-01705) VUID-vkCmdBlitImage-srcSubresource-01705

The `srcSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdBlitImage-dstSubresource-01706) VUID-vkCmdBlitImage-dstSubresource-01706

The `dstSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdBlitImage-srcSubresource-01707) VUID-vkCmdBlitImage-srcSubresource-01707

If `srcSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`srcSubresource.baseArrayLayer` + 
`srcSubresource.layerCount` of each element of `pRegions` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-vkCmdBlitImage-dstSubresource-01708) VUID-vkCmdBlitImage-dstSubresource-01708

If `dstSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`dstSubresource.baseArrayLayer` + 
`dstSubresource.layerCount` of each element of `pRegions` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-vkCmdBlitImage-dstImage-02545) VUID-vkCmdBlitImage-dstImage-02545

`dstImage` and `srcImage` **must** not have been created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-vkCmdBlitImage-maintenance8-10207) VUID-vkCmdBlitImage-maintenance8-10207

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is enabled
and `srcImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `srcSubresource.baseArrayLayer` **must** be
`0`, and `srcSubresource.layerCount` and
`dstSubresource.layerCount` **must** each be `1`

* 
[](#VUID-vkCmdBlitImage-maintenance8-10208) VUID-vkCmdBlitImage-maintenance8-10208

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is enabled
and `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `dstSubresource.baseArrayLayer` **must** be
`0`, and `srcSubresource.layerCount` and
`dstSubresource.layerCount` **must** each be `1`

* 
[](#VUID-vkCmdBlitImage-maintenance8-10579) VUID-vkCmdBlitImage-maintenance8-10579

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is enabled,
`dstImage` is [VK_IMAGE_TYPE_3D](VkImageType.html), and `srcImage` is not of
type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each element of `pRegions`,
the absolute difference of the `z` member of each member of
`dstOffsets` **must** equal `srcSubresource.layerCount`

* 
[](#VUID-vkCmdBlitImage-maintenance8-10580) VUID-vkCmdBlitImage-maintenance8-10580

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is enabled,
`srcImage` is [VK_IMAGE_TYPE_3D](VkImageType.html), and `dstImage` is not of
type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each element of `pRegions`,
the absolute difference of the `z` member of each member of
`srcOffsets` **must** equal `dstSubresource.layerCount`

* 
[](#VUID-vkCmdBlitImage-srcImage-00240) VUID-vkCmdBlitImage-srcImage-00240

    If
the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is not enabled and
    either `srcImage` or `dstImage` is of type
    [VK_IMAGE_TYPE_3D](VkImageType.html), then for each element of `pRegions`,
    `srcSubresource.baseArrayLayer` and
    `dstSubresource.baseArrayLayer` **must** each be `0`, and
    `srcSubresource.layerCount` and `dstSubresource.layerCount`
    **must** each be `1`

* 
[](#VUID-vkCmdBlitImage-aspectMask-00241) VUID-vkCmdBlitImage-aspectMask-00241

For each element of `pRegions`, `srcSubresource.aspectMask`
**must** specify aspects present in `srcImage`

* 
[](#VUID-vkCmdBlitImage-aspectMask-00242) VUID-vkCmdBlitImage-aspectMask-00242

For each element of `pRegions`, `dstSubresource.aspectMask`
**must** specify aspects present in `dstImage`

* 
[](#VUID-vkCmdBlitImage-srcOffset-00243) VUID-vkCmdBlitImage-srcOffset-00243

For each element of `pRegions`, `srcOffsets`[0].x and
`srcOffsets`[1].x **must** both be greater than or equal to `0` and
less than or equal to the width of the specified `srcSubresource` of
`srcImage`

* 
[](#VUID-vkCmdBlitImage-srcOffset-00244) VUID-vkCmdBlitImage-srcOffset-00244

For each element of `pRegions`, `srcOffsets`[0].y and
`srcOffsets`[1].y **must** both be greater than or equal to `0` and
less than or equal to the height of the specified `srcSubresource`
of `srcImage`

* 
[](#VUID-vkCmdBlitImage-srcImage-00245) VUID-vkCmdBlitImage-srcImage-00245

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `srcOffsets`[0].y **must** be `0` and
`srcOffsets`[1].y **must** be `1`

* 
[](#VUID-vkCmdBlitImage-srcOffset-00246) VUID-vkCmdBlitImage-srcOffset-00246

For each element of `pRegions`, `srcOffsets`[0].z and
`srcOffsets`[1].z **must** both be greater than or equal to `0` and
less than or equal to the depth of the specified `srcSubresource` of
`srcImage`

* 
[](#VUID-vkCmdBlitImage-srcImage-00247) VUID-vkCmdBlitImage-srcImage-00247

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`srcOffsets`[0].z **must** be `0` and `srcOffsets`[1].z **must** be
`1`

* 
[](#VUID-vkCmdBlitImage-dstOffset-00248) VUID-vkCmdBlitImage-dstOffset-00248

For each element of `pRegions`, `dstOffsets`[0].x and
`dstOffsets`[1].x **must** both be greater than or equal to `0` and
less than or equal to the width of the specified `dstSubresource` of
`dstImage`

* 
[](#VUID-vkCmdBlitImage-dstOffset-00249) VUID-vkCmdBlitImage-dstOffset-00249

For each element of `pRegions`, `dstOffsets`[0].y and
`dstOffsets`[1].y **must** both be greater than or equal to `0` and
less than or equal to the height of the specified `dstSubresource`
of `dstImage`

* 
[](#VUID-vkCmdBlitImage-dstImage-00250) VUID-vkCmdBlitImage-dstImage-00250

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `dstOffsets`[0].y **must** be `0` and
`dstOffsets`[1].y **must** be `1`

* 
[](#VUID-vkCmdBlitImage-dstOffset-00251) VUID-vkCmdBlitImage-dstOffset-00251

For each element of `pRegions`, `dstOffsets`[0].z and
`dstOffsets`[1].z **must** both be greater than or equal to `0` and
less than or equal to the depth of the specified `dstSubresource` of
`dstImage`

* 
[](#VUID-vkCmdBlitImage-dstImage-00252) VUID-vkCmdBlitImage-dstImage-00252

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`dstOffsets`[0].z **must** be `0` and `dstOffsets`[1].z **must** be
`1`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBlitImage-commandBuffer-parameter) VUID-vkCmdBlitImage-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBlitImage-srcImage-parameter) VUID-vkCmdBlitImage-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdBlitImage-srcImageLayout-parameter) VUID-vkCmdBlitImage-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdBlitImage-dstImage-parameter) VUID-vkCmdBlitImage-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-vkCmdBlitImage-dstImageLayout-parameter) VUID-vkCmdBlitImage-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-vkCmdBlitImage-pRegions-parameter) VUID-vkCmdBlitImage-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkImageBlit](VkImageBlit.html) structures

* 
[](#VUID-vkCmdBlitImage-filter-parameter) VUID-vkCmdBlitImage-filter-parameter

 `filter` **must** be a valid [VkFilter](VkFilter.html) value

* 
[](#VUID-vkCmdBlitImage-commandBuffer-recording) VUID-vkCmdBlitImage-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBlitImage-commandBuffer-cmdpool) VUID-vkCmdBlitImage-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBlitImage-renderpass) VUID-vkCmdBlitImage-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBlitImage-suspended) VUID-vkCmdBlitImage-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBlitImage-videocoding) VUID-vkCmdBlitImage-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBlitImage-regionCount-arraylength) VUID-vkCmdBlitImage-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBlitImage-commonparent) VUID-vkCmdBlitImage-commonparent

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

vkCmdBlitImage is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkFilter](VkFilter.html), [VkImage](VkImage.html), [VkImageBlit](VkImageBlit.html), [VkImageLayout](VkImageLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdBlitImage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
