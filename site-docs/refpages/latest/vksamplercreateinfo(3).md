# VkSamplerCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerCreateInfo - Structure specifying parameters of a newly created sampler

The `VkSamplerCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSamplerCreateInfo {
    VkStructureType         sType;
    const void*             pNext;
    VkSamplerCreateFlags    flags;
    VkFilter                magFilter;
    VkFilter                minFilter;
    VkSamplerMipmapMode     mipmapMode;
    VkSamplerAddressMode    addressModeU;
    VkSamplerAddressMode    addressModeV;
    VkSamplerAddressMode    addressModeW;
    float                   mipLodBias;
    VkBool32                anisotropyEnable;
    float                   maxAnisotropy;
    VkBool32                compareEnable;
    VkCompareOp             compareOp;
    float                   minLod;
    float                   maxLod;
    VkBorderColor           borderColor;
    VkBool32                unnormalizedCoordinates;
} VkSamplerCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSamplerCreateFlagBits](VkSamplerCreateFlagBits.html) describing
additional parameters of the sampler.

* 
`magFilter` is a [VkFilter](VkFilter.html) value specifying the magnification
filter to apply to lookups.

* 
`minFilter` is a [VkFilter](VkFilter.html) value specifying the minification
filter to apply to lookups.

* 
`mipmapMode` is a [VkSamplerMipmapMode](VkSamplerMipmapMode.html) value specifying the
mipmap filter to apply to lookups.

* 
`addressModeU` is a [VkSamplerAddressMode](VkSamplerAddressMode.html) value specifying the
[wrapping operation](../../../../spec/latest/chapters/textures.html#textures-wrapping-operation) used when the i
coordinate used to sample the image would be out of bounds.

* 
`addressModeV` is a [VkSamplerAddressMode](VkSamplerAddressMode.html) value specifying the
[wrapping operation](../../../../spec/latest/chapters/textures.html#textures-wrapping-operation) used when the j
coordinate used to sample the image would be out of bounds.

* 
`addressModeW` is a [VkSamplerAddressMode](VkSamplerAddressMode.html) value specifying the
[wrapping operation](../../../../spec/latest/chapters/textures.html#textures-wrapping-operation) used when the k
coordinate used to sample the image would be out of bounds.
If `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), `addressModeW` is
ignored.

* 
 `mipLodBias` is the bias to be added to
mipmap LOD calculation and bias provided by image sampling functions in
SPIR-V, as described in the [LOD    Operation](../../../../spec/latest/chapters/textures.html#textures-level-of-detail-operation) section.

* 
 `anisotropyEnable` is [VK_TRUE](VK_TRUE.html) to
enable anisotropic filtering, as described in the
[Texel Anisotropic Filtering](../../../../spec/latest/chapters/textures.html#textures-texel-anisotropic-filtering)
section, or [VK_FALSE](VK_FALSE.html) otherwise.

* 
`maxAnisotropy` is the anisotropy value clamp used by the sampler
when `anisotropyEnable` is [VK_TRUE](VK_TRUE.html).
If `anisotropyEnable` is [VK_FALSE](VK_FALSE.html), `maxAnisotropy` is
ignored.

* 
`compareEnable` is [VK_TRUE](VK_TRUE.html) to enable comparison against a
reference value during lookups, or [VK_FALSE](VK_FALSE.html) otherwise.

Note: Some implementations will default to shader state if this member
does not match.

`compareOp` is a [VkCompareOp](VkCompareOp.html) value specifying the comparison
operator to apply to fetched data before filtering as described in the
[Depth Compare Operation](../../../../spec/latest/chapters/textures.html#textures-depth-compare-operation) section.

`minLod` is used to clamp the [    minimum of the computed LOD value](../../../../spec/latest/chapters/textures.html#textures-level-of-detail-operation).

`maxLod` is used to clamp the [    maximum of the computed LOD value](../../../../spec/latest/chapters/textures.html#textures-level-of-detail-operation).
To avoid clamping the maximum value, set `maxLod` to the constant
[VK_LOD_CLAMP_NONE](VK_LOD_CLAMP_NONE.html).

`borderColor` is a [VkBorderColor](VkBorderColor.html) value specifying the
predefined border color to use.

 `unnormalizedCoordinates`
controls whether to use unnormalized or normalized texel coordinates to
address texels of the image.
When `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), the range of the
image coordinates used to lookup the texel is in the range of zero to
the image size in each dimension.
When `unnormalizedCoordinates` is [VK_FALSE](VK_FALSE.html), the range of image
coordinates is zero to one.

When `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), images the sampler is
used with in the shader have the following requirements:

* 
The `viewType` **must** be either [VK_IMAGE_VIEW_TYPE_1D](VkImageViewType.html) or
[VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html).

* 
The image view **must** have a single layer and a single mip level.

When `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), image built-in
functions in the shader that use the sampler have the following
requirements:

* 
The functions **must** not use projection.

* 
The functions **must** not use offsets.

|  | Mapping of OpenGL to Vulkan Filter Modes
| --- | --- |

`magFilter` values of [VK_FILTER_NEAREST](VkFilter.html) and [VK_FILTER_LINEAR](VkFilter.html)
directly correspond to `GL_NEAREST` and `GL_LINEAR` magnification
filters.
`minFilter` and `mipmapMode` combine to correspond to the similarly
named OpenGL minification filter of `GL_minFilter_MIPMAP_mipmapMode`
(e.g. `minFilter` of [VK_FILTER_LINEAR](VkFilter.html) and `mipmapMode` of
[VK_SAMPLER_MIPMAP_MODE_NEAREST](VkSamplerMipmapMode.html) correspond to
`GL_LINEAR_MIPMAP_NEAREST`).

There are no Vulkan filter modes that directly correspond to OpenGL
minification filters of `GL_LINEAR` or `GL_NEAREST`, but they **can** be
emulated using [VK_SAMPLER_MIPMAP_MODE_NEAREST](VkSamplerMipmapMode.html), `minLod` = 0, and
`maxLod` = 0.25, and using `minFilter` = [VK_FILTER_LINEAR](VkFilter.html) or
`minFilter` = [VK_FILTER_NEAREST](VkFilter.html), respectively.

Note that using a `maxLod` of zero would cause
[magnification](../../../../spec/latest/chapters/textures.html#textures-texel-filtering) to always be performed, and the
`magFilter` to always be used.
This is valid, just not an exact match for OpenGL behavior.
Clamping the maximum LOD to 0.25 allows the λ value to be
non-zero and minification to be performed, while still always rounding down
to the base level.
If the `minFilter` and `magFilter` are equal, then using a
`maxLod` of zero also works. |

The maximum number of sampler objects which **can** be simultaneously created
on a device is implementation-dependent and specified by the
[`maxSamplerAllocationCount`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerAllocationCount) member
of the [VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html) structure.

|  | For historical reasons, if `maxSamplerAllocationCount` is exceeded, some
| --- | --- |
implementations may return [VK_ERROR_TOO_MANY_OBJECTS](VkResult.html).
Exceeding this limit will result in **undefined** behavior, and an application
should not rely on the use of the returned error code in order to identify
when the limit is reached. |

Since [VkSampler](VkSampler.html) is a non-dispatchable handle type, implementations
**may** return the same handle for sampler state vectors that are identical.
In such cases, all such objects would only count once against the
`maxSamplerAllocationCount` limit.

When this structure is used to write a descriptor via
[vkWriteSamplerDescriptorsEXT](vkWriteSamplerDescriptorsEXT.html), applications **can** give the descriptor a
debug name in a similar way to naming an object, via the
[VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure.
However, as there is no actual object, [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html)
**must** be passed via the `pNext` chain of this structure, with a
`objectType` of [VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html) and a `objectHandle` of
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).
The name is attached to the unique set of descriptor bits written by the
implementation, and writing the same bits again with new debug info **may**
rename the original descriptor.

|  | Implementations are not prevented from returning the same bits for different
| --- | --- |
descriptors.
This can result in multiple different samplers mapping to the same name. |

[VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html) **can** also be chained in the same
way when defining an embedded sampler via
[VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html), naming the embedded sampler.

Valid Usage

* 
[](#VUID-VkSamplerCreateInfo-mipLodBias-01069) VUID-VkSamplerCreateInfo-mipLodBias-01069

The absolute value of `mipLodBias` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxSamplerLodBias`

* 
[](#VUID-VkSamplerCreateInfo-samplerMipLodBias-04467) VUID-VkSamplerCreateInfo-samplerMipLodBias-04467

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`samplerMipLodBias`
is [VK_FALSE](VK_FALSE.html), `mipLodBias` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-maxLod-01973) VUID-VkSamplerCreateInfo-maxLod-01973

`maxLod` **must** be greater than or equal to `minLod`

* 
[](#VUID-VkSamplerCreateInfo-anisotropyEnable-01070) VUID-VkSamplerCreateInfo-anisotropyEnable-01070

If the [`samplerAnisotropy`](../../../../spec/latest/chapters/features.html#features-samplerAnisotropy) feature
is not enabled, `anisotropyEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-anisotropyEnable-01071) VUID-VkSamplerCreateInfo-anisotropyEnable-01071

If `anisotropyEnable` is [VK_TRUE](VK_TRUE.html), `maxAnisotropy` **must** be
between `1.0` and
`VkPhysicalDeviceLimits`::`maxSamplerAnisotropy`, inclusive

* 
[](#VUID-VkSamplerCreateInfo-minFilter-01645) VUID-VkSamplerCreateInfo-minFilter-01645

If [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is enabled
and the [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](VkFormatFeatureFlagBits.html),
`minFilter` and `magFilter` **must** be equal to the sampler
Y′CBCR conversion’s `chromaFilter`

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01072) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01072

If `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), `minFilter` and
`magFilter` **must** be equal

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01073) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01073

If `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), `mipmapMode`
**must** be [VK_SAMPLER_MIPMAP_MODE_NEAREST](VkSamplerMipmapMode.html)

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01074) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01074

If `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), `minLod` and
`maxLod` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01075) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01075

If `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), `addressModeU`
and `addressModeV` **must** each be either
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html) or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](VkSamplerAddressMode.html)

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01076) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01076

If `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html),
`anisotropyEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01077) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01077

If `unnormalizedCoordinates` is [VK_TRUE](VK_TRUE.html), `compareEnable`
**must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-01078) VUID-VkSamplerCreateInfo-addressModeU-01078

If any of `addressModeU`, `addressModeV` or `addressModeW`
are [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](VkSamplerAddressMode.html), `borderColor`
**must** be a valid [VkBorderColor](VkBorderColor.html) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-01646) VUID-VkSamplerCreateInfo-addressModeU-01646

If [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is enabled,
`addressModeU`, `addressModeV`, and `addressModeW` **must** be
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html), `anisotropyEnable`
**must** be [VK_FALSE](VK_FALSE.html), and `unnormalizedCoordinates` **must** be
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-None-01647) VUID-VkSamplerCreateInfo-None-01647

If [sampler Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion) is enabled
and the `pNext` chain includes a
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html) structure, then the sampler
reduction mode **must** be [VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html)

* 
[](#VUID-VkSamplerCreateInfo-pNext-06726) VUID-VkSamplerCreateInfo-pNext-06726

If the [`samplerFilterMinmax`](../../../../spec/latest/chapters/features.html#features-samplerFilterMinmax)
feature is not enabled and the `pNext` chain includes a
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html) structure, then the sampler
reduction mode **must** be [VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html)

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-01079) VUID-VkSamplerCreateInfo-addressModeU-01079

If the [    `samplerMirrorClampToEdge`](../../../../spec/latest/chapters/features.html#features-samplerMirrorClampToEdge) feature is not enabled, and if the
`[VK_KHR_sampler_mirror_clamp_to_edge](VK_KHR_sampler_mirror_clamp_to_edge.html)` extension is not enabled,
`addressModeU`, `addressModeV` and `addressModeW` **must** not
be [VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html)

* 
[](#VUID-VkSamplerCreateInfo-compareEnable-01080) VUID-VkSamplerCreateInfo-compareEnable-01080

If `compareEnable` is [VK_TRUE](VK_TRUE.html), `compareOp` **must** be a
valid [VkCompareOp](VkCompareOp.html) value

* 
[](#VUID-VkSamplerCreateInfo-magFilter-01081) VUID-VkSamplerCreateInfo-magFilter-01081

If either `magFilter` or `minFilter` is
[VK_FILTER_CUBIC_EXT](VkFilter.html), `anisotropyEnable` **must** be
[VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-magFilter-07911) VUID-VkSamplerCreateInfo-magFilter-07911

If
the [VK_EXT_filter_cubic](VK_EXT_filter_cubic.html) extension is not enabled and
either `magFilter` or `minFilter` is [VK_FILTER_CUBIC_IMG](VkFilter.html),
the `reductionMode` member of [VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html)
**must** be [VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html)

* 
[](#VUID-VkSamplerCreateInfo-compareEnable-01423) VUID-VkSamplerCreateInfo-compareEnable-01423

If `compareEnable` is [VK_TRUE](VK_TRUE.html), the `reductionMode` member
of [VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html) **must** be
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](VkSamplerReductionMode.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-02574) VUID-VkSamplerCreateInfo-flags-02574

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html), then
`minFilter` and `magFilter` **must** be equal

* 
[](#VUID-VkSamplerCreateInfo-flags-02575) VUID-VkSamplerCreateInfo-flags-02575

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html), then
`mipmapMode` **must** be [VK_SAMPLER_MIPMAP_MODE_NEAREST](VkSamplerMipmapMode.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-02576) VUID-VkSamplerCreateInfo-flags-02576

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html), then
`minLod` and `maxLod` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-flags-02577) VUID-VkSamplerCreateInfo-flags-02577

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html), then
`addressModeU` and `addressModeV` **must** each be either
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html) or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](VkSamplerAddressMode.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-02578) VUID-VkSamplerCreateInfo-flags-02578

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html), then
`anisotropyEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-02579) VUID-VkSamplerCreateInfo-flags-02579

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html), then
`compareEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-02580) VUID-VkSamplerCreateInfo-flags-02580

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html), then
`unnormalizedCoordinates` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-nonSeamlessCubeMap-06788) VUID-VkSamplerCreateInfo-nonSeamlessCubeMap-06788

If the [`nonSeamlessCubeMap`](../../../../spec/latest/chapters/features.html#features-nonSeamlessCubeMap) feature
is not enabled, `flags` **must** not include
[VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT](VkSamplerCreateFlagBits.html)

* 
[](#VUID-VkSamplerCreateInfo-borderColor-04011) VUID-VkSamplerCreateInfo-borderColor-04011

If `borderColor` is one of [VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html), then a
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html) **must** be included in the
`pNext` chain

* 
[](#VUID-VkSamplerCreateInfo-customBorderColors-04085) VUID-VkSamplerCreateInfo-customBorderColors-04085

If the [`customBorderColors`](../../../../spec/latest/chapters/features.html#features-customBorderColors) feature
is not enabled, `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html)

* 
[](#VUID-VkSamplerCreateInfo-borderColor-04442) VUID-VkSamplerCreateInfo-borderColor-04442

If `borderColor` is one of [VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html), and
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html)::`format` is not
[VK_FORMAT_UNDEFINED](VkFormat.html),
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html)::`customBorderColor`
**must** be within the range of values representable in `format`

* 
[](#VUID-VkSamplerCreateInfo-None-04012) VUID-VkSamplerCreateInfo-None-04012

The maximum number of samplers with custom border colors which **can** be
simultaneously created on a device is implementation-dependent and
specified by the [    `maxCustomBorderColorSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxCustomBorderColorSamplers) member of the
[VkPhysicalDeviceCustomBorderColorPropertiesEXT](VkPhysicalDeviceCustomBorderColorPropertiesEXT.html) structure

* 
[](#VUID-VkSamplerCreateInfo-flags-08110) VUID-VkSamplerCreateInfo-flags-08110

If `flags` includes
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkSamplerCreateFlagBits.html), the
[    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkSamplerCreateInfo-pNext-08111) VUID-VkSamplerCreateInfo-pNext-08111

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure, `flags`
**must** contain
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkSamplerCreateFlagBits.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-06964) VUID-VkSamplerCreateInfo-flags-06964

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html), then `minFilter`
and `magFilter` **must** be [VK_FILTER_NEAREST](VkFilter.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-06965) VUID-VkSamplerCreateInfo-flags-06965

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html), then `mipmapMode`
**must** be [VK_SAMPLER_MIPMAP_MODE_NEAREST](VkSamplerMipmapMode.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-06966) VUID-VkSamplerCreateInfo-flags-06966

[If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html), then `minLod` and
`maxLod` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-flags-06967) VUID-VkSamplerCreateInfo-flags-06967

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html), then
`addressModeU` and `addressModeV` **must** each be either
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](VkSamplerAddressMode.html) or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](VkSamplerAddressMode.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-06968) VUID-VkSamplerCreateInfo-flags-06968

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html), and if
`addressModeU` or `addressModeV` is
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](VkSamplerAddressMode.html), then `borderColor`
**must** be [VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](VkBorderColor.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-06969) VUID-VkSamplerCreateInfo-flags-06969

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html), then
`anisotropyEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkSamplerCreateInfo-flags-06970) VUID-VkSamplerCreateInfo-flags-06970

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](VkSamplerCreateFlagBits.html), then
`compareEnable` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCreateInfo-sType-sType) VUID-VkSamplerCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkSamplerCreateInfo-pNext-pNext) VUID-VkSamplerCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html), [VkSamplerBlockMatchWindowCreateInfoQCOM](VkSamplerBlockMatchWindowCreateInfoQCOM.html), [VkSamplerBorderColorComponentMappingCreateInfoEXT](VkSamplerBorderColorComponentMappingCreateInfoEXT.html), [VkSamplerCubicWeightsCreateInfoQCOM](VkSamplerCubicWeightsCreateInfoQCOM.html), [VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html), [VkSamplerCustomBorderColorIndexCreateInfoEXT](VkSamplerCustomBorderColorIndexCreateInfoEXT.html), [VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html), or [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html)

* 
[](#VUID-VkSamplerCreateInfo-sType-unique) VUID-VkSamplerCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSamplerCreateInfo-flags-parameter) VUID-VkSamplerCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkSamplerCreateFlagBits](VkSamplerCreateFlagBits.html) values

* 
[](#VUID-VkSamplerCreateInfo-magFilter-parameter) VUID-VkSamplerCreateInfo-magFilter-parameter

 `magFilter` **must** be a valid [VkFilter](VkFilter.html) value

* 
[](#VUID-VkSamplerCreateInfo-minFilter-parameter) VUID-VkSamplerCreateInfo-minFilter-parameter

 `minFilter` **must** be a valid [VkFilter](VkFilter.html) value

* 
[](#VUID-VkSamplerCreateInfo-mipmapMode-parameter) VUID-VkSamplerCreateInfo-mipmapMode-parameter

 `mipmapMode` **must** be a valid [VkSamplerMipmapMode](VkSamplerMipmapMode.html) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-parameter) VUID-VkSamplerCreateInfo-addressModeU-parameter

 `addressModeU` **must** be a valid [VkSamplerAddressMode](VkSamplerAddressMode.html) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeV-parameter) VUID-VkSamplerCreateInfo-addressModeV-parameter

 `addressModeV` **must** be a valid [VkSamplerAddressMode](VkSamplerAddressMode.html) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeW-parameter) VUID-VkSamplerCreateInfo-addressModeW-parameter

 `addressModeW` **must** be a valid [VkSamplerAddressMode](VkSamplerAddressMode.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkBorderColor](VkBorderColor.html), [VkCompareOp](VkCompareOp.html), [VkDescriptorMappingSourceConstantOffsetEXT](VkDescriptorMappingSourceConstantOffsetEXT.html), [VkDescriptorMappingSourceIndirectIndexArrayEXT](VkDescriptorMappingSourceIndirectIndexArrayEXT.html), [VkDescriptorMappingSourceIndirectIndexEXT](VkDescriptorMappingSourceIndirectIndexEXT.html), [VkDescriptorMappingSourcePushIndexEXT](VkDescriptorMappingSourcePushIndexEXT.html), [VkDescriptorMappingSourceShaderRecordIndexEXT](VkDescriptorMappingSourceShaderRecordIndexEXT.html), [VkFilter](VkFilter.html), [VkSamplerAddressMode](VkSamplerAddressMode.html), [VkSamplerCreateFlags](VkSamplerCreateFlags.html), [VkSamplerMipmapMode](VkSamplerMipmapMode.html), [VkStructureType](VkStructureType.html), [vkCreateSampler](vkCreateSampler.html), [vkWriteSamplerDescriptorsEXT](vkWriteSamplerDescriptorsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
