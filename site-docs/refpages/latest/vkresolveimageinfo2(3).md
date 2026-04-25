# VkResolveImageInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResolveImageInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResolveImageInfo2 - Structure specifying parameters of resolve image command

The `VkResolveImageInfo2` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkResolveImageInfo2 {
    VkStructureType           sType;
    const void*               pNext;
    VkImage                   srcImage;
    VkImageLayout             srcImageLayout;
    VkImage                   dstImage;
    VkImageLayout             dstImageLayout;
    uint32_t                  regionCount;
    const VkImageResolve2*    pRegions;
} VkResolveImageInfo2;

// Provided by VK_KHR_copy_commands2
// Equivalent to VkResolveImageInfo2
typedef VkResolveImageInfo2 VkResolveImageInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

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
`pRegions` is a pointer to an array of [VkImageResolve2](VkImageResolve2.html)
structures specifying the regions to resolve.

If the source format is a floating-point or normalized type, the resolve
mode is chosen as implementation-dependent behavior, unless
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html) is included in the `pNext` chain, in
which case it is defined by
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`resolveMode`.
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
If [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html) is included in the `pNext` chain,
this default behavior **can** be overridden with
[VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html) or
[VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html) flags.

If the source format is an integer type, a single sample’s value is selected
for each pixel, unless [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html) is included in the
`pNext` chain, in which case it is defined by
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`resolveMode` or
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`stencilResolveMode` depending on which
aspect is being resolved.

Valid Usage

* 
[](#VUID-VkResolveImageInfo2-pRegions-00255) VUID-VkResolveImageInfo2-pRegions-00255

The union of all source regions, and the union of all destination
regions, specified by the elements of `pRegions`, **must** not overlap
in memory

* 
[](#VUID-VkResolveImageInfo2-srcImage-00256) VUID-VkResolveImageInfo2-srcImage-00256

If `srcImage` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkResolveImageInfo2-srcImage-00257) VUID-VkResolveImageInfo2-srcImage-00257

`srcImage` **must** have a sample count equal to any valid sample count
value other than [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-dstImage-00258) VUID-VkResolveImageInfo2-dstImage-00258

If `dstImage` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkResolveImageInfo2-dstImage-00259) VUID-VkResolveImageInfo2-dstImage-00259

`dstImage` **must** have a sample count equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcImageLayout-00260) VUID-VkResolveImageInfo2-srcImageLayout-00260

`srcImageLayout` **must** specify the layout of the image subresources
of `srcImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-VkResolveImageInfo2-srcImageLayout-01400) VUID-VkResolveImageInfo2-srcImageLayout-01400

`srcImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkResolveImageInfo2-dstImageLayout-00262) VUID-VkResolveImageInfo2-dstImageLayout-00262

`dstImageLayout` **must** specify the layout of the image subresources
of `dstImage` specified in `pRegions` at the time this command
is executed on a `VkDevice`

* 
[](#VUID-VkResolveImageInfo2-dstImageLayout-01401) VUID-VkResolveImageInfo2-dstImageLayout-01401

`dstImageLayout` **must** be
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](VkImageLayout.html),
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkResolveImageInfo2-maintenance10-11799) VUID-VkResolveImageInfo2-maintenance10-11799

If the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is
enabled, the [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-dstImage-02003) VUID-VkResolveImageInfo2-dstImage-02003

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)
if the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled

* 
[](#VUID-VkResolveImageInfo2-linearColorAttachment-06519) VUID-VkResolveImageInfo2-linearColorAttachment-06519

If the [`linearColorAttachment`](../../../../spec/latest/chapters/features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html), the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of `dstImage`
**must** contain [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

* 
[](#VUID-VkResolveImageInfo2-srcImage-01386) VUID-VkResolveImageInfo2-srcImage-01386

`srcImage` and `dstImage` **must** have been created with the same
image format

* 
[](#VUID-VkResolveImageInfo2-srcSubresource-01709) VUID-VkResolveImageInfo2-srcSubresource-01709

The `srcSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkResolveImageInfo2-dstSubresource-01710) VUID-VkResolveImageInfo2-dstSubresource-01710

The `dstSubresource.mipLevel` member of each element of
`pRegions` **must** be less than the `mipLevels` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkResolveImageInfo2-srcSubresource-01711) VUID-VkResolveImageInfo2-srcSubresource-01711

If `srcSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`srcSubresource.baseArrayLayer` + 
`srcSubresource.layerCount` of each element of `pRegions` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `srcImage` was created

* 
[](#VUID-VkResolveImageInfo2-dstSubresource-01712) VUID-VkResolveImageInfo2-dstSubresource-01712

If `dstSubresource.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
`dstSubresource.baseArrayLayer` + 
`dstSubresource.layerCount` of each element of `pRegions` **must**
be less than or equal to the `arrayLayers` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `dstImage` was created

* 
[](#VUID-VkResolveImageInfo2-dstImage-02546) VUID-VkResolveImageInfo2-dstImage-02546

`dstImage` and `srcImage` **must** not have been created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcImage-04446) VUID-VkResolveImageInfo2-srcImage-04446

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `srcSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkResolveImageInfo2-srcImage-04447) VUID-VkResolveImageInfo2-srcImage-04447

If `dstImage` is of type [VK_IMAGE_TYPE_3D](VkImageType.html), then for each
element of `pRegions`, `dstSubresource.baseArrayLayer` **must** be
`0` and `dstSubresource.layerCount` **must** be `1`

* 
[](#VUID-VkResolveImageInfo2-srcOffset-00269) VUID-VkResolveImageInfo2-srcOffset-00269

For each element of `pRegions`, `srcOffset.x` and
(`extent.width` +  `srcOffset.x`) **must** both be
greater than or equal to `0` and less than or equal to the width of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-VkResolveImageInfo2-srcOffset-00270) VUID-VkResolveImageInfo2-srcOffset-00270

For each element of `pRegions`, `srcOffset.y` and
(`extent.height` +  `srcOffset.y`) **must** both be
greater than or equal to `0` and less than or equal to the height of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-VkResolveImageInfo2-srcImage-00271) VUID-VkResolveImageInfo2-srcImage-00271

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `srcOffset.y` **must** be `0` and
`extent.height` **must** be `1`

* 
[](#VUID-VkResolveImageInfo2-srcOffset-00272) VUID-VkResolveImageInfo2-srcOffset-00272

For each element of `pRegions`, `srcOffset.z` and
(`extent.depth` +  `srcOffset.z`) **must** both be
greater than or equal to `0` and less than or equal to the depth of the
specified `srcSubresource` of `srcImage`

* 
[](#VUID-VkResolveImageInfo2-srcImage-00273) VUID-VkResolveImageInfo2-srcImage-00273

If `srcImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`srcOffset.z` **must** be `0` and `extent.depth` **must** be `1`

* 
[](#VUID-VkResolveImageInfo2-dstOffset-00274) VUID-VkResolveImageInfo2-dstOffset-00274

For each element of `pRegions`, `dstOffset.x` and
(`extent.width` +  `dstOffset.x`) **must** both be
greater than or equal to `0` and less than or equal to the width of the
specified `dstSubresource` of `dstImage`

* 
[](#VUID-VkResolveImageInfo2-dstOffset-00275) VUID-VkResolveImageInfo2-dstOffset-00275

For each element of `pRegions`, `dstOffset.y` and
(`extent.height` +  `dstOffset.y`) **must** both be
greater than or equal to `0` and less than or equal to the height of the
specified `dstSubresource` of `dstImage`

* 
[](#VUID-VkResolveImageInfo2-dstImage-00276) VUID-VkResolveImageInfo2-dstImage-00276

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html), then for each
element of `pRegions`, `dstOffset.y` **must** be `0` and
`extent.height` **must** be `1`

* 
[](#VUID-VkResolveImageInfo2-dstOffset-00277) VUID-VkResolveImageInfo2-dstOffset-00277

For each element of `pRegions`, `dstOffset.z` and
(`extent.depth` +  `dstOffset.z`) **must** both be
greater than or equal to `0` and less than or equal to the depth of the
specified `dstSubresource` of `dstImage`

* 
[](#VUID-VkResolveImageInfo2-dstImage-00278) VUID-VkResolveImageInfo2-dstImage-00278

If `dstImage` is of type [VK_IMAGE_TYPE_1D](VkImageType.html) or
[VK_IMAGE_TYPE_2D](VkImageType.html), then for each element of `pRegions`,
`dstOffset.z` **must** be `0` and `extent.depth` **must** be `1`

* 
[](#VUID-VkResolveImageInfo2-srcImage-06762) VUID-VkResolveImageInfo2-srcImage-06762

`srcImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkResolveImageInfo2-srcImage-06763) VUID-VkResolveImageInfo2-srcImage-06763

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`srcImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-dstImage-06764) VUID-VkResolveImageInfo2-dstImage-06764

`dstImage` **must** have been created with the
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkResolveImageInfo2-dstImage-06765) VUID-VkResolveImageInfo2-dstImage-06765

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-format-features) of
`dstImage` **must** contain [VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcSubresource-11800) VUID-VkResolveImageInfo2-srcSubresource-11800

`srcSubresource.aspectMask` for each element in `pRegions` **must**
not specify an aspect which is not part of the image format of
`srcImage`

* 
[](#VUID-VkResolveImageInfo2-dstSubresource-11801) VUID-VkResolveImageInfo2-dstSubresource-11801

`dstSubresource.aspectMask` for each element in `pRegions` **must**
not specify an aspect which is not part of the image format of
`dstImage`

* 
[](#VUID-VkResolveImageInfo2-srcSubresource-11802) VUID-VkResolveImageInfo2-srcSubresource-11802

`srcSubresource.aspectMask` **must** equal
`dstSubresource.aspectMask` for each element in `pRegions`

* 
[](#VUID-VkResolveImageInfo2-pNext-10982) VUID-VkResolveImageInfo2-pNext-10982

If [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html) is included in the `pNext` chain,
`flags` includes
[VK_RESOLVE_IMAGE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html) or
[VK_RESOLVE_IMAGE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkResolveImageFlagBitsKHR.html), then the format
of `srcImage` and `dstImage` **must** use sRGB encoding

* 
[](#VUID-VkResolveImageInfo2-srcImage-10983) VUID-VkResolveImageInfo2-srcImage-10983

If `srcImage` has a color format and [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)
is included in the `pNext` chain, its `resolveMode` **must** not be
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcImage-10984) VUID-VkResolveImageInfo2-srcImage-10984

If `srcImage` has a non-integer color format, and
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html) is included in the `pNext` chain,
its `resolveMode` **must** be [VK_RESOLVE_MODE_AVERAGE_BIT](VkResolveModeFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcImage-10985) VUID-VkResolveImageInfo2-srcImage-10985

If `srcImage` has an integer color format, and
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html) is included in the `pNext` chain,
its `resolveMode` **must** be [VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](VkResolveModeFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcImage-10986) VUID-VkResolveImageInfo2-srcImage-10986

If `srcImage` has a depth-stencil format,
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html) **must** be included in the `pNext`
chain

* 
[](#VUID-VkResolveImageInfo2-srcImage-10987) VUID-VkResolveImageInfo2-srcImage-10987

If `srcImage` has a depth-stencil format, and a depth aspect is
referenced by `pRegions`,
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`resolveMode` **must** not be
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcImage-10988) VUID-VkResolveImageInfo2-srcImage-10988

If `srcImage` has a depth-stencil format, and a stencil aspect is
referenced by `pRegions`,
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`stencilResolveMode` **must** not be
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

* 
[](#VUID-VkResolveImageInfo2-srcImage-10989) VUID-VkResolveImageInfo2-srcImage-10989

If `srcImage` has a depth-stencil format, and a depth aspect is
referenced by `pRegions`,
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`resolveMode` **must** be one of the
bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedDepthResolveModes`

* 
[](#VUID-VkResolveImageInfo2-srcImage-10990) VUID-VkResolveImageInfo2-srcImage-10990

If `srcImage` has a depth-stencil format, and a stencil aspect is
referenced by `pRegions`,
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`stencilResolveMode` **must** be one
of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedStencilResolveModes`

* 
[](#VUID-VkResolveImageInfo2-srcImage-10991) VUID-VkResolveImageInfo2-srcImage-10991

If `srcImage` has a depth-stencil format, and both a depth aspect
and stencil aspect is referenced by `pRegions`, and
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`indepdendentResolve`
is [VK_FALSE](VK_FALSE.html), [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`resolveMode`
**must** be equal to
[VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)::`stencilResolveMode`

* 
[](#VUID-VkResolveImageInfo2-srcImage-10992) VUID-VkResolveImageInfo2-srcImage-10992

If `srcImage` has a depth-stencil format containing both a depth
aspect and stencil aspect, and
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`indepdendentResolveNone`
is [VK_FALSE](VK_FALSE.html), every element of `pRegions` **must** contain both
depth and stencil aspects

Valid Usage (Implicit)

* 
[](#VUID-VkResolveImageInfo2-sType-sType) VUID-VkResolveImageInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RESOLVE_IMAGE_INFO_2](VkStructureType.html)

* 
[](#VUID-VkResolveImageInfo2-pNext-pNext) VUID-VkResolveImageInfo2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkResolveImageModeInfoKHR](VkResolveImageModeInfoKHR.html)

* 
[](#VUID-VkResolveImageInfo2-sType-unique) VUID-VkResolveImageInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkResolveImageInfo2-srcImage-parameter) VUID-VkResolveImageInfo2-srcImage-parameter

 `srcImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkResolveImageInfo2-srcImageLayout-parameter) VUID-VkResolveImageInfo2-srcImageLayout-parameter

 `srcImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkResolveImageInfo2-dstImage-parameter) VUID-VkResolveImageInfo2-dstImage-parameter

 `dstImage` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkResolveImageInfo2-dstImageLayout-parameter) VUID-VkResolveImageInfo2-dstImageLayout-parameter

 `dstImageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkResolveImageInfo2-pRegions-parameter) VUID-VkResolveImageInfo2-pRegions-parameter

 `pRegions` **must** be a valid pointer to an array of `regionCount` valid [VkImageResolve2](VkImageResolve2.html) structures

* 
[](#VUID-VkResolveImageInfo2-regionCount-arraylength) VUID-VkResolveImageInfo2-regionCount-arraylength

 `regionCount` **must** be greater than `0`

* 
[](#VUID-VkResolveImageInfo2-commonparent) VUID-VkResolveImageInfo2-commonparent

 Both of `dstImage`, and `srcImage` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkImage](VkImage.html), [VkImageLayout](VkImageLayout.html), [VkImageResolve2](VkImageResolve2.html), [VkStructureType](VkStructureType.html), [vkCmdResolveImage2](vkCmdResolveImage2.html), [vkCmdResolveImage2](vkCmdResolveImage2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkResolveImageInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
