# VkImageViewCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewCreateInfo - Structure specifying parameters of a newly created image view

The `VkImageViewCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageViewCreateInfo {
    VkStructureType            sType;
    const void*                pNext;
    VkImageViewCreateFlags     flags;
    VkImage                    image;
    VkImageViewType            viewType;
    VkFormat                   format;
    VkComponentMapping         components;
    VkImageSubresourceRange    subresourceRange;
} VkImageViewCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageViewCreateFlagBits](VkImageViewCreateFlagBits.html) specifying
additional parameters of the image view.

* 
`image` is a [VkImage](VkImage.html) on which the view will be created.

* 
`viewType` is a [VkImageViewType](VkImageViewType.html) value specifying the type of
the image view.

* 
`format` is a [VkFormat](VkFormat.html) specifying the format and type used to
interpret texel blocks of the image.

* 
`components` is a [VkComponentMapping](VkComponentMapping.html) structure specifying a
remapping of color components (or of depth or stencil components after
they have been converted into color components).

* 
`subresourceRange` is a [VkImageSubresourceRange](VkImageSubresourceRange.html) structure
selecting the set of mipmap levels and array layers to be accessible to
the view.

Some of the `image` creation parameters are inherited by the view.
In particular, image view creation inherits the implicit parameter
`usage` specifying the allowed usages of the image view that, by
default, takes the value of the corresponding `usage` parameter
specified in [VkImageCreateInfo](VkImageCreateInfo.html) at image creation time.
The implicit `usage` **can** be overridden by adding a
[VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html) structure to the `pNext` chain, but the
view usage **must** be a subset of the image usage.
If `image` has a depth-stencil format and was created with a
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure included in the `pNext`
chain of [VkImageCreateInfo](VkImageCreateInfo.html), the usage is calculated based on the
`subresource.aspectMask` provided:

* 
If `aspectMask` includes only [VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), the
implicit `usage` is equal to
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html)::`stencilUsage`.

* 
If `aspectMask` includes only [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html), the
implicit `usage` is equal to [VkImageCreateInfo](VkImageCreateInfo.html)::`usage`.

* 
If both aspects are included in `aspectMask`, the implicit
`usage` is equal to the intersection of
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage` and
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html)::`stencilUsage`.

If `image` is a 3D image, its Z range **can** be restricted to a subset by
adding a [VkImageViewSlicedCreateInfoEXT](VkImageViewSlicedCreateInfoEXT.html) to the `pNext` chain.

If `image`’s format is [multi-planar](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and
`aspectMask` is one of [VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html),
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html), or [VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html), the
*view format* is the [compatible format for the plane](../../../../spec/latest/chapters/formats.html#formats-compatible-planes).
Otherwise the
*view format* is the `format` used to create `image`.

If `image` was created with the [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html)
flag, `format` **can** be set to a [format that is compatible](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes) with the *view format*.
If the image was not created with [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html),
`format` **must** equal the *view format*.

When creating a single-plane view of a [multi-planar image](../../../../spec/latest/chapters/formats.html#formats-multiplanar), `width` and `height` **must** be derived from the multi-planar
image’s dimensions in the manner listed for
[plane compatibility](../../../../spec/latest/chapters/formats.html#formats-compatible-planes) for the plane.

Views of compatible formats will have the same mapping between texel
coordinates and memory locations irrespective of the `format`, with only
the interpretation of the bit pattern changing.

If `image` was created with a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), and the image view’s `aspectMask` is one of
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html), [VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html), the view’s aspect mask is considered to
be equivalent to [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) when used as a framebuffer
attachment.

|  | Values intended to be used with one view format **may** not be exactly
| --- | --- |
preserved when written or read through a different format.
For example, an integer value that happens to have the bit pattern of a
floating-point denorm or NaN **may** be flushed or canonicalized when written
or read through a view with a floating-point format.
Similarly, a value written through a signed normalized format that has a bit
pattern exactly equal to -2b **may** be changed to -2b +  1
as described in [Conversion from Normalized Fixed-Point to Floating-Point](../../../../spec/latest/chapters/fundamentals.html#fundamentals-fixedfpconv). |

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) flag, `format`
**must** be *compatible* with the image’s format as described above; or **must**
be an uncompressed format, in which case it **must** be
[*size-compatible*](../../../../spec/latest/chapters/formats.html#formats-size-compatibility) with the image’s format.
In this case, the resulting image view’s texel dimensions equal the
dimensions of the selected mip level divided by the compressed texel block
size and rounded up.

The [VkComponentMapping](VkComponentMapping.html) `components` member describes a remapping
from components of the image to components of the vector returned by shader
image instructions.
This remapping **must** be the identity swizzle for
any `VkImageView` used with a combined image sampler that enables
[sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion),
input attachment descriptors, framebuffer attachments,
and
storage image descriptors.

Image views with [formats that require YCBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion)
or [external formats](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats)
**must** be created with a [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html) structure in the
`pNext` chain to be used with sampling.
Any image view created with a [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html) structure
in the `pNext` chain **must** only be sampled using a sampler with an
identically defined [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html).
When used in a [video coding](../../../../spec/latest/chapters/videocoding.html#video-coding) operation, the specified
[sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) has no effect.

| Image View Type | Compatible Image Types |
| --- | --- |
| [VK_IMAGE_VIEW_TYPE_1D](VkImageViewType.html) | [VK_IMAGE_TYPE_1D](VkImageType.html) |
| [VK_IMAGE_VIEW_TYPE_1D_ARRAY](VkImageViewType.html) | [VK_IMAGE_TYPE_1D](VkImageType.html) |
| [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) | [VK_IMAGE_TYPE_2D](VkImageType.html)
, [VK_IMAGE_TYPE_3D](VkImageType.html) |
| [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html) | [VK_IMAGE_TYPE_2D](VkImageType.html)
, [VK_IMAGE_TYPE_3D](VkImageType.html) |
| [VK_IMAGE_VIEW_TYPE_CUBE](VkImageViewType.html) | [VK_IMAGE_TYPE_2D](VkImageType.html) |
| [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html) | [VK_IMAGE_TYPE_2D](VkImageType.html) |
| [VK_IMAGE_VIEW_TYPE_3D](VkImageViewType.html) | [VK_IMAGE_TYPE_3D](VkImageType.html) |

Valid Usage

* 
[](#VUID-VkImageViewCreateInfo-image-01003) VUID-VkImageViewCreateInfo-image-01003

If `image` was not created with
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html) then `viewType` **must** not
be [VK_IMAGE_VIEW_TYPE_CUBE](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html)

* 
[](#VUID-VkImageViewCreateInfo-viewType-01004) VUID-VkImageViewCreateInfo-viewType-01004

If the [`imageCubeArray`](../../../../spec/latest/chapters/features.html#features-imageCubeArray) feature is not
enabled, `viewType` **must** not be [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html)

* 
[](#VUID-VkImageViewCreateInfo-image-06723) VUID-VkImageViewCreateInfo-image-06723

If `image` was created with [VK_IMAGE_TYPE_3D](VkImageType.html) but without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set then `viewType`
**must** not be [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

* 
[](#VUID-VkImageViewCreateInfo-image-06728) VUID-VkImageViewCreateInfo-image-06728

If `image` was created with [VK_IMAGE_TYPE_3D](VkImageType.html) but without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) or
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html) set, then
`viewType` **must** not be [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html)

* 
[](#VUID-VkImageViewCreateInfo-image-04970) VUID-VkImageViewCreateInfo-image-04970

If `image` was created with [VK_IMAGE_TYPE_3D](VkImageType.html) and
`viewType` is [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html) then `subresourceRange.levelCount`
**must** be 1

* 
[](#VUID-VkImageViewCreateInfo-image-04972) VUID-VkImageViewCreateInfo-image-04972

If `image` was created with a `samples` value not equal to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) then `viewType` **must** be either
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

* 
[](#VUID-VkImageViewCreateInfo-image-04441) VUID-VkImageViewCreateInfo-image-04441

`image` **must** have been created with a `usage` value containing
at least one of the following:

[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_SAMPLE_BLOCK_MATCH_BIT_QCOM](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html)

[](#VUID-VkImageViewCreateInfo-None-02273) VUID-VkImageViewCreateInfo-None-02273

The [format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) of the
resultant image view **must** contain at least one bit

[](#VUID-VkImageViewCreateInfo-usage-02274) VUID-VkImageViewCreateInfo-usage-02274

If `usage` contains [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), then the
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) of the
resultant image view **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-usage-02275) VUID-VkImageViewCreateInfo-usage-02275

If `usage` contains [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html), then the image
view’s [format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must**
contain [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-usage-08931) VUID-VkImageViewCreateInfo-usage-08931

If `usage` contains [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html), then
the image view’s [format    features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

[](#VUID-VkImageViewCreateInfo-usage-02277) VUID-VkImageViewCreateInfo-usage-02277

If `usage` contains
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html), then the image view’s
[format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-image-08333) VUID-VkImageViewCreateInfo-image-08333

If `usage` contains [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html),
then the image view’s [format    features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-image-08334) VUID-VkImageViewCreateInfo-image-08334

If `usage` contains [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html),
then the image view’s [format    features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-image-08335) VUID-VkImageViewCreateInfo-image-08335

`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkImageUsageFlagBits.html)

[](#VUID-VkImageViewCreateInfo-image-08336) VUID-VkImageViewCreateInfo-image-08336

If `usage` contains [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html),
then the image view’s [format    features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-image-08337) VUID-VkImageViewCreateInfo-image-08337

If `usage` contains [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html),
then the image view’s [format    features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-image-08338) VUID-VkImageViewCreateInfo-image-08338

`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkImageUsageFlagBits.html)

[](#VUID-VkImageViewCreateInfo-usage-10259) VUID-VkImageViewCreateInfo-usage-10259

If `usage` contains
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html), then
the image view’s [format    features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkFormatFeatureFlagBits2.html)

[](#VUID-VkImageViewCreateInfo-usage-10260) VUID-VkImageViewCreateInfo-usage-10260

If `usage` contains
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html), then the image
view’s [format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must**
contain [VK_FORMAT_FEATURE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkFormatFeatureFlagBits2.html)

[](#VUID-VkImageViewCreateInfo-usage-08932) VUID-VkImageViewCreateInfo-usage-08932

If `usage` contains [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html),
and any of the following is true:

* 
the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is not enabled

* 
the [     `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_FALSE](VK_FALSE.html)

* 
`image` was created with an
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` value of 0

then the image view’s [format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features) **must** contain at least one of
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)
    or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

[](#VUID-VkImageViewCreateInfo-subresourceRange-01478) VUID-VkImageViewCreateInfo-subresourceRange-01478

`subresourceRange.baseMipLevel` **must** be less than the
`mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

[](#VUID-VkImageViewCreateInfo-subresourceRange-01718) VUID-VkImageViewCreateInfo-subresourceRange-01718

If `subresourceRange.levelCount` is not
[VK_REMAINING_MIP_LEVELS](VK_REMAINING_MIP_LEVELS.html), `subresourceRange.baseMipLevel`
+  `subresourceRange.levelCount` **must** be less than or equal to
the `mipLevels` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when
`image` was created

[](#VUID-VkImageViewCreateInfo-image-02571) VUID-VkImageViewCreateInfo-image-02571

If `image` was created with the
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html) usage flag set,
`subresourceRange.levelCount` **must** be `1`

[](#VUID-VkImageViewCreateInfo-image-06724) VUID-VkImageViewCreateInfo-image-06724

If `image` is not a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) or
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html) set, or `viewType`
is not [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html),
`subresourceRange.baseArrayLayer` **must** be less than the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

[](#VUID-VkImageViewCreateInfo-subresourceRange-06725) VUID-VkImageViewCreateInfo-subresourceRange-06725

If `subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), `image` is not a 3D image created
with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) or
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits.html) set, or `viewType`
is not [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html),
`subresourceRange.layerCount` **must** be non-zero and
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
`arrayLayers` specified in [VkImageCreateInfo](VkImageCreateInfo.html) when `image`
was created

[](#VUID-VkImageViewCreateInfo-image-02724) VUID-VkImageViewCreateInfo-image-02724

If `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set, and `viewType` is
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html),
`subresourceRange.baseArrayLayer` **must** be less than the depth
computed from `baseMipLevel` and `extent.depth` specified in
[VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created, according to the
formula defined in [Image Mip Level    Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

[](#VUID-VkImageViewCreateInfo-subresourceRange-02725) VUID-VkImageViewCreateInfo-subresourceRange-02725

If `subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set, and `viewType` is
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html),
`subresourceRange.layerCount` **must** be non-zero and
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
depth computed from `baseMipLevel` and `extent.depth` specified
in [VkImageCreateInfo](VkImageCreateInfo.html) when `image` was created, according to
the formula defined in [Image Mip    Level Sizing](../../../../spec/latest/chapters/resources.html#resources-image-mip-level-sizing)

[](#VUID-VkImageViewCreateInfo-image-01761) VUID-VkImageViewCreateInfo-image-01761

If `image` was created with the
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) flag,
but without the [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html)
flag,
and if the `format` of the `image` is not a
[multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar),
`format` **must** be compatible with the `format` used to create
`image`, as defined in [Format    Compatibility Classes](../../../../spec/latest/chapters/formats.html#formats-compatibility-classes)

[](#VUID-VkImageViewCreateInfo-image-01583) VUID-VkImageViewCreateInfo-image-01583

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) flag, `format`
**must** be compatible with, or **must** be an uncompressed format that is
[size-compatible](../../../../spec/latest/chapters/formats.html#formats-size-compatibility) with, the `format`
used to create `image`

[](#VUID-VkImageViewCreateInfo-image-07072) VUID-VkImageViewCreateInfo-image-07072

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) flag and
`format` is a non-compressed format, the `levelCount` member of
`subresourceRange` **must** be `1`

[](#VUID-VkImageViewCreateInfo-image-09487) VUID-VkImageViewCreateInfo-image-09487

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) flag,
the
`VkPhysicalDeviceMaintenance6Properties`::`blockTexelViewCompatibleMultipleLayers`
property is not [VK_TRUE](VK_TRUE.html),
and `format` is a non-compressed format, then the `layerCount`
member of `subresourceRange` **must** be `1`

[](#VUID-VkImageViewCreateInfo-pNext-01585) VUID-VkImageViewCreateInfo-pNext-01585

If a [VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html) structure was included in the
`pNext` chain of the [VkImageCreateInfo](VkImageCreateInfo.html) structure used when
creating `image` and
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount` is not zero
then `format` **must** be one of the formats in
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`pViewFormats`

[](#VUID-VkImageViewCreateInfo-image-01586) VUID-VkImageViewCreateInfo-image-01586

If `image` was created with the
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) flag, if the `format` of
the `image` is a [multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar), and
if `subresourceRange.aspectMask` is one of the
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bits, then
`format` **must** be compatible with the [VkFormat](VkFormat.html) for the plane
of the `image` `format` indicated by
`subresourceRange.aspectMask`, as defined in
[Compatible Formats of Planes of Multi-Planar Formats](../../../../spec/latest/chapters/formats.html#formats-compatible-planes)

[](#VUID-VkImageViewCreateInfo-subresourceRange-07818) VUID-VkImageViewCreateInfo-subresourceRange-07818

`subresourceRange.aspectMask` **must** only have at most 1 valid
[multi-planar aspect mask](../../../../spec/latest/chapters/formats.html#formats-multiplanar-image-aspect) bit

[](#VUID-VkImageViewCreateInfo-image-12397) VUID-VkImageViewCreateInfo-image-12397

If `image` was not created with the
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](VkImageCreateFlagBits.html) flag `format` **must** be
identical to the `format` used to create `image`

[](#VUID-VkImageViewCreateInfo-format-12398) VUID-VkImageViewCreateInfo-format-12398

If the `format` of the `image` is a [    multi-planar format](../../../../spec/latest/chapters/formats.html#formats-multiplanar) and `subresourceRange.aspectMask` is
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html), `format` **must** be identical to the
`format` used to create `image`

[](#VUID-VkImageViewCreateInfo-format-06415) VUID-VkImageViewCreateInfo-format-06415

If the image view’s format [    requires a sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) and `usage` contains
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), then the `pNext` chain **must**
include a [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html) structure with a conversion
value other than [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-VkImageViewCreateInfo-format-04714) VUID-VkImageViewCreateInfo-format-04714

If `format` has a `_422` or `_420` suffix then `image`
**must** have been created with a width that is a multiple of 2

[](#VUID-VkImageViewCreateInfo-format-04715) VUID-VkImageViewCreateInfo-format-04715

If `format` has a `_420` suffix then `image` **must** have been
created with a height that is a multiple of 2

[](#VUID-VkImageViewCreateInfo-pNext-01970) VUID-VkImageViewCreateInfo-pNext-01970

If the `pNext` chain includes a [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html)
structure with a `conversion` value other than [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
all members of `components` **must** have the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-pNext-06658) VUID-VkImageViewCreateInfo-pNext-06658

If the `pNext` chain includes a [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html)
structure with a `conversion` value other than [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`format` **must** be the same used in
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)::`format`

[](#VUID-VkImageViewCreateInfo-image-01020) VUID-VkImageViewCreateInfo-image-01020

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

[](#VUID-VkImageViewCreateInfo-subResourceRange-01021) VUID-VkImageViewCreateInfo-subResourceRange-01021

`viewType` **must** be compatible with the type of `image` as shown
in the [view type compatibility    table](../../../../spec/latest/chapters/resources.html#resources-image-views-compatibility)

[](#VUID-VkImageViewCreateInfo-image-02399) VUID-VkImageViewCreateInfo-image-02399

If `image` has an
[Android    external format](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats), `format` **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-VkImageViewCreateInfo-image-02400) VUID-VkImageViewCreateInfo-image-02400

If `image` has an
[Android    external format](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats), the `pNext` chain **must** include a
[VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html) structure with a `conversion`
object created with the same external format as `image`

[](#VUID-VkImageViewCreateInfo-image-02401) VUID-VkImageViewCreateInfo-image-02401

If `image` has an
[Android    external format](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats), all members of `components` **must** be the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-image-08957) VUID-VkImageViewCreateInfo-image-08957

If `image` has an
[QNX Screen external    format](../../../../spec/latest/chapters/memory.html#memory-external-screen-buffer-external-formats), `format` **must** be [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-VkImageViewCreateInfo-image-08958) VUID-VkImageViewCreateInfo-image-08958

If `image` has an
[QNX Screen external    format](../../../../spec/latest/chapters/memory.html#memory-external-screen-buffer-external-formats), the `pNext` chain **must** include a
[VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html) structure with a `conversion`
object created with the same external format as `image`

[](#VUID-VkImageViewCreateInfo-image-08959) VUID-VkImageViewCreateInfo-image-08959

If `image` has an
[QNX Screen external    format](../../../../spec/latest/chapters/memory.html#memory-external-screen-buffer-external-formats), all members of `components` **must** be the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-image-02086) VUID-VkImageViewCreateInfo-image-02086

If `image` was created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html) usage flag
set, `viewType` **must** be [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

[](#VUID-VkImageViewCreateInfo-image-02087) VUID-VkImageViewCreateInfo-image-02087

If the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage) feature is
enabled, and `image` was created with the
[VK_IMAGE_USAGE_SHADING_RATE_IMAGE_BIT_NV](VkImageUsageFlagBits.html) usage flag set,
`format` **must** be [VK_FORMAT_R8_UINT](VkFormat.html)

[](#VUID-VkImageViewCreateInfo-attachmentFragmentShadingRate-12386) VUID-VkImageViewCreateInfo-attachmentFragmentShadingRate-12386

If the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is not enabled, the
`usage` for the image view **must** not contain
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html)

[](#VUID-VkImageViewCreateInfo-usage-04550) VUID-VkImageViewCreateInfo-usage-04550

If the `usage` for the image view includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html), then the
image view’s [format features](../../../../spec/latest/chapters/resources.html#resources-image-view-format-features)
**must** contain
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkFormatFeatureFlagBits.html)

[](#VUID-VkImageViewCreateInfo-usage-04551) VUID-VkImageViewCreateInfo-usage-04551

If the `usage` for the image view includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html), and
[    `layeredShadingRateAttachments`](../../../../spec/latest/chapters/limits.html#limits-layeredShadingRateAttachments) is [VK_FALSE](VK_FALSE.html),
`subresourceRange.layerCount` **must** be `1`

[](#VUID-VkImageViewCreateInfo-flags-02572) VUID-VkImageViewCreateInfo-flags-02572

If the [    `fragmentDensityMapDynamic`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapDynamic) feature is not enabled, `flags`
**must** not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](VkImageViewCreateFlagBits.html)

[](#VUID-VkImageViewCreateInfo-flags-03567) VUID-VkImageViewCreateInfo-flags-03567

If the [    `fragmentDensityMapDeferred`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapDeferred) feature is not enabled, `flags`
**must** not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](VkImageViewCreateFlagBits.html)

[](#VUID-VkImageViewCreateInfo-flags-03568) VUID-VkImageViewCreateInfo-flags-03568

If `flags` contains
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](VkImageViewCreateFlagBits.html),
`flags` **must** not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](VkImageViewCreateFlagBits.html)

[](#VUID-VkImageViewCreateInfo-image-03569) VUID-VkImageViewCreateInfo-image-03569

If `image` was created with `flags` containing
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html) and the
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flag set,
`subresourceRange.layerCount` **must** be less than or equal to
[    `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`maxSubsampledArrayLayers`](../../../../spec/latest/chapters/limits.html#limits-maxSubsampledArrayLayers)

[](#VUID-VkImageViewCreateInfo-invocationMask-04993) VUID-VkImageViewCreateInfo-invocationMask-04993

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is
enabled, and `image` was created with the
[VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI](VkImageUsageFlagBits.html) usage flag set,
`format` **must** be [VK_FORMAT_R8_UINT](VkFormat.html)

[](#VUID-VkImageViewCreateInfo-flags-04116) VUID-VkImageViewCreateInfo-flags-04116

If `flags` does not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](VkImageViewCreateFlagBits.html), and
`image` was created with the
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits.html) usage flag set, its
`flags` **must** not contain any of
[VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html)

[](#VUID-VkImageViewCreateInfo-pNext-02662) VUID-VkImageViewCreateInfo-pNext-02662

If the `pNext` chain includes a [VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html)
structure, and `image` was not created with a
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure included in the
`pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html), its `usage` member
**must** not include any bits that were not set in the `usage` member
of the [VkImageCreateInfo](VkImageCreateInfo.html) structure used to create `image`

[](#VUID-VkImageViewCreateInfo-pNext-02663) VUID-VkImageViewCreateInfo-pNext-02663

If the `pNext` chain includes a [VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html)
structure, `image` was created with a
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure included in the
`pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html), and
`subresourceRange.aspectMask` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), the `usage` member of the
[VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html) structure **must** not include any bits
that were not set in the `usage` member of the
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure used to create `image`

[](#VUID-VkImageViewCreateInfo-pNext-02664) VUID-VkImageViewCreateInfo-pNext-02664

If the `pNext` chain includes a [VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html)
structure, `image` was created with a
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html) structure included in the
`pNext` chain of [VkImageCreateInfo](VkImageCreateInfo.html), and
`subresourceRange.aspectMask` includes bits other than
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html), the `usage` member of the
[VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html) structure **must** not include any bits
that were not set in the `usage` member of the
[VkImageCreateInfo](VkImageCreateInfo.html) structure used to create `image`

[](#VUID-VkImageViewCreateInfo-imageViewType-04973) VUID-VkImageViewCreateInfo-imageViewType-04973

If `viewType` is [VK_IMAGE_VIEW_TYPE_1D](VkImageViewType.html),
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html), or [VK_IMAGE_VIEW_TYPE_3D](VkImageViewType.html); and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), then `subresourceRange.layerCount`
**must** be 1

[](#VUID-VkImageViewCreateInfo-imageViewType-04974) VUID-VkImageViewCreateInfo-imageViewType-04974

If `viewType` is [VK_IMAGE_VIEW_TYPE_1D](VkImageViewType.html),
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html), or [VK_IMAGE_VIEW_TYPE_3D](VkImageViewType.html); and
`subresourceRange.layerCount` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
then the remaining number of layers **must** be 1

[](#VUID-VkImageViewCreateInfo-viewType-02960) VUID-VkImageViewCreateInfo-viewType-02960

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE](VkImageViewType.html) and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), `subresourceRange.layerCount` **must**
be `6`

[](#VUID-VkImageViewCreateInfo-viewType-02961) VUID-VkImageViewCreateInfo-viewType-02961

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html) and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html), `subresourceRange.layerCount` **must**
be a multiple of `6`

[](#VUID-VkImageViewCreateInfo-viewType-02962) VUID-VkImageViewCreateInfo-viewType-02962

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE](VkImageViewType.html) and
`subresourceRange.layerCount` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
the remaining number of layers **must** be `6`

[](#VUID-VkImageViewCreateInfo-viewType-02963) VUID-VkImageViewCreateInfo-viewType-02963

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html) and
`subresourceRange.layerCount` is [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html),
the remaining number of layers **must** be a multiple of `6`

[](#VUID-VkImageViewCreateInfo-imageViewFormatSwizzle-04465) VUID-VkImageViewCreateInfo-imageViewFormatSwizzle-04465

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`imageViewFormatSwizzle`
is [VK_FALSE](VK_FALSE.html), all elements of `components` **must** have the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-imageViewFormatReinterpretation-04466) VUID-VkImageViewCreateInfo-imageViewFormatReinterpretation-04466

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`imageViewFormatReinterpretation`
is [VK_FALSE](VK_FALSE.html), the [VkFormat](VkFormat.html) in `format` **must** not contain
a different number of components, or a different number of bits in each
component, than the format of the `VkImage` in `image`

[](#VUID-VkImageViewCreateInfo-image-04817) VUID-VkImageViewCreateInfo-image-04817

If `image` was created with the
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits.html) usage flag set,
[VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits.html), then the `viewType`
**must** be [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

[](#VUID-VkImageViewCreateInfo-image-04818) VUID-VkImageViewCreateInfo-image-04818

If `image` was created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkImageUsageFlagBits.html) usage flag set,
[VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits.html), or
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits.html), then the `viewType`
**must** be [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

[](#VUID-VkImageViewCreateInfo-image-10261) VUID-VkImageViewCreateInfo-image-10261

If `image` was created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits.html) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits.html) usage flags set,
then `viewType` **must** be [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

[](#VUID-VkImageViewCreateInfo-flags-08106) VUID-VkImageViewCreateInfo-flags-08106

If `flags` includes
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageViewCreateFlagBits.html), the
[    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

[](#VUID-VkImageViewCreateInfo-pNext-08107) VUID-VkImageViewCreateInfo-pNext-08107

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure, `flags`
**must** contain
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageViewCreateFlagBits.html)

[](#VUID-VkImageViewCreateInfo-pNext-06787) VUID-VkImageViewCreateInfo-pNext-06787

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](VkExportMetalObjectTypeFlagBitsEXT.html)

[](#VUID-VkImageViewCreateInfo-pNext-06944) VUID-VkImageViewCreateInfo-pNext-06944

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure, then
[`textureSampleWeighted`](../../../../spec/latest/chapters/features.html#features-textureSampleWeighted) feature
**must** be enabled

[](#VUID-VkImageViewCreateInfo-pNext-06945) VUID-VkImageViewCreateInfo-pNext-06945

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure, then `image`
**must** have been created with the
[VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM](VkImageUsageFlagBits.html) usage flag set

[](#VUID-VkImageViewCreateInfo-pNext-06946) VUID-VkImageViewCreateInfo-pNext-06946

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure, then
`components` **must** be [VK_COMPONENT_SWIZZLE_IDENTITY](VkComponentSwizzle.html) for all
components

[](#VUID-VkImageViewCreateInfo-pNext-06947) VUID-VkImageViewCreateInfo-pNext-06947

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure, then
`subresourceRange.aspectMask` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html)

[](#VUID-VkImageViewCreateInfo-pNext-06948) VUID-VkImageViewCreateInfo-pNext-06948

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure, then
`subresourceRange.levelCount` **must** be `1`

[](#VUID-VkImageViewCreateInfo-pNext-06949) VUID-VkImageViewCreateInfo-pNext-06949

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure, then
`viewType` **must** be [VK_IMAGE_VIEW_TYPE_1D_ARRAY](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html)

[](#VUID-VkImageViewCreateInfo-pNext-06950) VUID-VkImageViewCreateInfo-pNext-06950

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure and if
`viewType` is [VK_IMAGE_VIEW_TYPE_1D_ARRAY](VkImageViewType.html), then `image`
**must** have been created with `imageType` [VK_IMAGE_TYPE_1D](VkImageType.html)

[](#VUID-VkImageViewCreateInfo-pNext-06951) VUID-VkImageViewCreateInfo-pNext-06951

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_1D_ARRAY](VkImageViewType.html), then
`subresourceRange.layerCount` **must** be equal to `2`

[](#VUID-VkImageViewCreateInfo-pNext-06952) VUID-VkImageViewCreateInfo-pNext-06952

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_1D_ARRAY](VkImageViewType.html), then `image` **must** have been
created with `width` equal to or greater than \((numPhases
\times \mathbin{max}\left(
\mathbin{align}\left(filterSize.width,4\right),
filterSize.height\right))\)

[](#VUID-VkImageViewCreateInfo-pNext-06953) VUID-VkImageViewCreateInfo-pNext-06953

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure and if
`viewType` is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html), then `image`
**must** have been created with `imageType` [VK_IMAGE_TYPE_2D](VkImageType.html)

[](#VUID-VkImageViewCreateInfo-pNext-06954) VUID-VkImageViewCreateInfo-pNext-06954

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html), then
`subresourceRange.layerCount` **must** be equal or greater than
numPhases

[](#VUID-VkImageViewCreateInfo-pNext-06955) VUID-VkImageViewCreateInfo-pNext-06955

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html), then `image` **must** have been
created with `width` equal to or greater than `filterSize.width`

[](#VUID-VkImageViewCreateInfo-pNext-06956) VUID-VkImageViewCreateInfo-pNext-06956

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](VkImageViewType.html), then `image` **must** have been
created with `height` equal to or greater than
`filterSize.height`

[](#VUID-VkImageViewCreateInfo-pNext-06957) VUID-VkImageViewCreateInfo-pNext-06957

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html) structure then
[VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html)::`filterSize.height`
**must** be less than or equal to [    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterDimension.height`](../../../../spec/latest/chapters/devsandqueues.html#limits-weightfilter-maxdimension)

[](#VUID-VkImageViewCreateInfo-subresourceRange-09594) VUID-VkImageViewCreateInfo-subresourceRange-09594

`subresourceRange.aspectMask` **must** be valid for the `format`
the `image` was created with

[](#VUID-VkImageViewCreateInfo-None-12280) VUID-VkImageViewCreateInfo-None-12280

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](../../../../spec/latest/chapters/features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](VkFormat.html),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](VkFormat.html),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](VkFormat.html), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](VkFormat.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewCreateInfo-sType-sType) VUID-VkImageViewCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkImageViewCreateInfo-pNext-pNext) VUID-VkImageViewCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html), [VkImageViewASTCDecodeModeEXT](VkImageViewASTCDecodeModeEXT.html), [VkImageViewMinLodCreateInfoEXT](VkImageViewMinLodCreateInfoEXT.html), [VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html), [VkImageViewSlicedCreateInfoEXT](VkImageViewSlicedCreateInfoEXT.html), [VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html), or [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html)

* 
[](#VUID-VkImageViewCreateInfo-sType-unique) VUID-VkImageViewCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](VkExportMetalObjectCreateInfoEXT.html)

* 
[](#VUID-VkImageViewCreateInfo-flags-parameter) VUID-VkImageViewCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkImageViewCreateFlagBits](VkImageViewCreateFlagBits.html) values

* 
[](#VUID-VkImageViewCreateInfo-image-parameter) VUID-VkImageViewCreateInfo-image-parameter

 `image` **must** be a valid [VkImage](VkImage.html) handle

* 
[](#VUID-VkImageViewCreateInfo-viewType-parameter) VUID-VkImageViewCreateInfo-viewType-parameter

 `viewType` **must** be a valid [VkImageViewType](VkImageViewType.html) value

* 
[](#VUID-VkImageViewCreateInfo-format-parameter) VUID-VkImageViewCreateInfo-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkImageViewCreateInfo-components-parameter) VUID-VkImageViewCreateInfo-components-parameter

 `components` **must** be a valid [VkComponentMapping](VkComponentMapping.html) structure

* 
[](#VUID-VkImageViewCreateInfo-subresourceRange-parameter) VUID-VkImageViewCreateInfo-subresourceRange-parameter

 `subresourceRange` **must** be a valid [VkImageSubresourceRange](VkImageSubresourceRange.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkComponentMapping](VkComponentMapping.html), [VkFormat](VkFormat.html), [VkImage](VkImage.html), [VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html), [VkImageSubresourceRange](VkImageSubresourceRange.html), [VkImageViewCreateFlags](VkImageViewCreateFlags.html), [VkImageViewType](VkImageViewType.html), [VkStructureType](VkStructureType.html), [vkCreateImageView](vkCreateImageView.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
