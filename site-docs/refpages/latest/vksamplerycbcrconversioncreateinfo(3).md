# VkSamplerYcbcrConversionCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerYcbcrConversionCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerYcbcrConversionCreateInfo - Structure specifying the parameters of the newly created conversion

The `VkSamplerYcbcrConversionCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkSamplerYcbcrConversionCreateInfo {
    VkStructureType                  sType;
    const void*                      pNext;
    VkFormat                         format;
    VkSamplerYcbcrModelConversion    ycbcrModel;
    VkSamplerYcbcrRange              ycbcrRange;
    VkComponentMapping               components;
    VkChromaLocation                 xChromaOffset;
    VkChromaLocation                 yChromaOffset;
    VkFilter                         chromaFilter;
    VkBool32                         forceExplicitReconstruction;
} VkSamplerYcbcrConversionCreateInfo;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrConversionCreateInfo
typedef VkSamplerYcbcrConversionCreateInfo VkSamplerYcbcrConversionCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the format of the image from which color information
will be retrieved.

* 
`ycbcrModel` describes the color matrix for conversion between color
models.

* 
`ycbcrRange` describes whether the encoded values have headroom and
foot room, or whether the encoding uses the full numerical range.

* 
`components` applies a *swizzle* based on [VkComponentSwizzle](VkComponentSwizzle.html)
enums prior to range expansion and color model conversion.

* 
`xChromaOffset` describes the
[sample location](../../../../spec/latest/chapters/textures.html#textures-chroma-reconstruction) associated with
downsampled chroma components in the x dimension.
`xChromaOffset` has no effect for formats in which chroma components
are not downsampled horizontally.

* 
`yChromaOffset` describes the
[sample location](../../../../spec/latest/chapters/textures.html#textures-chroma-reconstruction) associated with
downsampled chroma components in the y dimension.
`yChromaOffset` has no effect for formats in which the chroma
components are not downsampled vertically.

* 
`chromaFilter` is the filter for chroma reconstruction.

* 
`forceExplicitReconstruction` **can** be used to ensure that
reconstruction is done explicitly, if supported.

|  | Setting `forceExplicitReconstruction` to [VK_TRUE](VK_TRUE.html) **may** have a
| --- | --- |
performance penalty on implementations where explicit reconstruction is not
the default mode of operation.

If `format` supports
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](VkFormatFeatureFlagBits.html)
the `forceExplicitReconstruction` value behaves as if it were
[VK_TRUE](VK_TRUE.html). |

If the `pNext` chain includes a [VkExternalFormatANDROID](VkExternalFormatANDROID.html) structure
with non-zero `externalFormat` member, the sampler Y′CBCR conversion
object represents an *external format conversion*, and `format` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html).
Such conversions **must** only be used to sample image views with a matching
[external format](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-external-formats).
When creating an external format conversion, the value of `components`
is ignored.

Valid Usage

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-01904) VUID-VkSamplerYcbcrConversionCreateInfo-format-01904

If an external format conversion is being created, `format` **must** be
[VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-04061) VUID-VkSamplerYcbcrConversionCreateInfo-format-04061

If an external format conversion is not being created,
`format` **must** represent unsigned normalized values (i.e. the format
**must** be a `UNORM` format)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-01650) VUID-VkSamplerYcbcrConversionCreateInfo-format-01650

The [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) of the
sampler Y′CBCR conversion **must** support
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01651) VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01651

If the [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html), `xChromaOffset`
and `yChromaOffset` **must** not be
[VK_CHROMA_LOCATION_COSITED_EVEN](VkChromaLocation.html) if the corresponding components
are [downsampled](../../../../spec/latest/chapters/textures.html#textures-chroma-reconstruction)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01652) VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01652

If the [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html), `xChromaOffset`
and `yChromaOffset` **must** not be [VK_CHROMA_LOCATION_MIDPOINT](VkChromaLocation.html)
if the corresponding components are [    downsampled](../../../../spec/latest/chapters/textures.html#textures-chroma-reconstruction)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02581) VUID-VkSamplerYcbcrConversionCreateInfo-components-02581

If the format has a `_422` or `_420` suffix, then
`components.g` **must** be the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02582) VUID-VkSamplerYcbcrConversionCreateInfo-components-02582

If the format has a `_422` or `_420` suffix, then
`components.a` **must** be the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings),
[VK_COMPONENT_SWIZZLE_ONE](VkComponentSwizzle.html), or [VK_COMPONENT_SWIZZLE_ZERO](VkComponentSwizzle.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02583) VUID-VkSamplerYcbcrConversionCreateInfo-components-02583

If the format has a `_422` or `_420` suffix, then
`components.r` **must** be the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings) or
[VK_COMPONENT_SWIZZLE_B](VkComponentSwizzle.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02584) VUID-VkSamplerYcbcrConversionCreateInfo-components-02584

If the format has a `_422` or `_420` suffix, then
`components.b` **must** be the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings) or
[VK_COMPONENT_SWIZZLE_R](VkComponentSwizzle.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02585) VUID-VkSamplerYcbcrConversionCreateInfo-components-02585

If the format has a `_422` or `_420` suffix, and if either
`components.r` or `components.b` is the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings), both
values **must** be the identity swizzle

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-01655) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-01655

If `ycbcrModel` is not
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](VkSamplerYcbcrModelConversion.html), then
`components.r`, `components.g`, and `components.b` **must**
correspond to components of the `format`; that is,
`components.r`, `components.g`, and `components.b` **must** not
be [VK_COMPONENT_SWIZZLE_ZERO](VkComponentSwizzle.html) or [VK_COMPONENT_SWIZZLE_ONE](VkComponentSwizzle.html),
and **must** not correspond to a component containing zero or one as a
consequence of [component substitution](../../../../spec/latest/chapters/images.html#images-component-substitution)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-02748) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-02748

If `ycbcrRange` is [VK_SAMPLER_YCBCR_RANGE_ITU_NARROW](VkSamplerYcbcrRange.html), then the
R, G, and B components obtained by applying the `component` swizzle
to `format` **must** each have a bit-depth greater than or equal to 8

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-forceExplicitReconstruction-01656) VUID-VkSamplerYcbcrConversionCreateInfo-forceExplicitReconstruction-01656

If the [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](VkFormatFeatureFlagBits.html)
`forceExplicitReconstruction` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-01657) VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-01657

If the [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](VkFormatFeatureFlagBits.html),
`chromaFilter` **must** not be [VK_FILTER_LINEAR](VkFilter.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09207) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09207

If the `pNext` chain includes a
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html) structure, and
if the [`ycbcrDegamma`](../../../../spec/latest/chapters/features.html#features-ycbcrDegamma) feature is not
enabled, then
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html)::`enableYDegamma`
**must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09208) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09208

If the `pNext` chain includes a
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html) structure, and
if the [`ycbcrDegamma`](../../../../spec/latest/chapters/features.html#features-ycbcrDegamma) feature is not
enabled, then
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html)::`enableCbCrDegamma`
**must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09209) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09209

If the `pNext` chain includes a
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html) structure,
`format` **must** be a format with 8-bit R, G, and B components

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-sType-sType) VUID-VkSamplerYcbcrConversionCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-pNext) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalFormatANDROID](VkExternalFormatANDROID.html), [VkExternalFormatOHOS](VkExternalFormatOHOS.html), [VkExternalFormatQNX](VkExternalFormatQNX.html), or [VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM.html)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-sType-unique) VUID-VkSamplerYcbcrConversionCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-parameter

 `ycbcrModel` **must** be a valid [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-parameter

 `ycbcrRange` **must** be a valid [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-components-parameter

 `components` **must** be a valid [VkComponentMapping](VkComponentMapping.html) structure

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-parameter

 `xChromaOffset` **must** be a valid [VkChromaLocation](VkChromaLocation.html) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-yChromaOffset-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-yChromaOffset-parameter

 `yChromaOffset` **must** be a valid [VkChromaLocation](VkChromaLocation.html) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-parameter

 `chromaFilter` **must** be a valid [VkFilter](VkFilter.html) value

If `chromaFilter` is [VK_FILTER_NEAREST](VkFilter.html), chroma samples are
reconstructed to luma component resolution using nearest-neighbour sampling.
Otherwise, chroma samples are reconstructed using interpolation.
More details can be found in [the description of sampler Y′CBCR conversion](../../../../spec/latest/chapters/textures.html#textures-sampler-YCbCr-conversion) in the [Image Operations](../../../../spec/latest/chapters/textures.html#textures) chapter.

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkChromaLocation](VkChromaLocation.html), [VkComponentMapping](VkComponentMapping.html), [VkFilter](VkFilter.html), [VkFormat](VkFormat.html), [VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html), [VkSamplerYcbcrRange](VkSamplerYcbcrRange.html), [VkStructureType](VkStructureType.html), [vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html), [vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerYcbcrConversionCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
