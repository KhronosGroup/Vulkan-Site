# Samplers

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/samplers.html

## Table of Contents

- [Sampler Y′CBCR Conversion](#samplers-YCbCr-conversion)
- [Sampler_Y′CBCR_Conversion](#samplers-YCbCr-conversion)
- [Custom Border Colors](#_custom_border_colors)
- [Custom_Border_Colors](#_custom_border_colors)
- [Custom Border Color Registration](#_custom_border_color_registration)
- [Custom_Border_Color_Registration](#_custom_border_color_registration)
- [Sampler block matching](#_sampler_block_matching)
- [Sampler_block_matching](#_sampler_block_matching)

## Content

`VkSampler` objects represent the state of an image sampler which is
used by the implementation to read image data and apply filtering and other
transformations for the shader.

Samplers are represented by `VkSampler` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSampler)

To create a sampler object, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateSampler(
    VkDevice                                    device,
    const VkSamplerCreateInfo*                  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSampler*                                  pSampler);

* 
`device` is the logical device that creates the sampler.

* 
`pCreateInfo` is a pointer to a [VkSamplerCreateInfo](#VkSamplerCreateInfo) structure
specifying the state of the sampler object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pSampler` is a pointer to a [VkSampler](#VkSampler) handle in which the
resulting sampler object is returned.

Valid Usage

* 
[](#VUID-vkCreateSampler-device-09668) VUID-vkCreateSampler-device-09668

`device` **must** support at least one queue family with one of the
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capabilities

* 
[](#VUID-vkCreateSampler-maxSamplerAllocationCount-04110) VUID-vkCreateSampler-maxSamplerAllocationCount-04110

There **must** be less than
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxSamplerAllocationCount`
[VkSampler](#VkSampler) objects currently created on the device

* 
[](#VUID-vkCreateSampler-maxSamplerAllocationCount-11412) VUID-vkCreateSampler-maxSamplerAllocationCount-11412

    If there are any pipelines
or shaders
    with embedded samplers currently created on the device, there **must** be
    less than
    ([`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount)
    -  ([    `minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) /
    [`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)))
    [VkSampler](#VkSampler) objects currently created on the device

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSampler-device-parameter) VUID-vkCreateSampler-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateSampler-pCreateInfo-parameter) VUID-vkCreateSampler-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSamplerCreateInfo](#VkSamplerCreateInfo) structure

* 
[](#VUID-vkCreateSampler-pAllocator-parameter) VUID-vkCreateSampler-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateSampler-pSampler-parameter) VUID-vkCreateSampler-pSampler-parameter

 `pSampler` **must** be a valid pointer to a [VkSampler](#VkSampler) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSamplerCreateFlagBits](#VkSamplerCreateFlagBits) describing
additional parameters of the sampler.

* 
`magFilter` is a [VkFilter](#VkFilter) value specifying the magnification
filter to apply to lookups.

* 
`minFilter` is a [VkFilter](#VkFilter) value specifying the minification
filter to apply to lookups.

* 
`mipmapMode` is a [VkSamplerMipmapMode](#VkSamplerMipmapMode) value specifying the
mipmap filter to apply to lookups.

* 
`addressModeU` is a [VkSamplerAddressMode](#VkSamplerAddressMode) value specifying the
[wrapping operation](textures.html#textures-wrapping-operation) used when the i
coordinate used to sample the image would be out of bounds.

* 
`addressModeV` is a [VkSamplerAddressMode](#VkSamplerAddressMode) value specifying the
[wrapping operation](textures.html#textures-wrapping-operation) used when the j
coordinate used to sample the image would be out of bounds.

* 
`addressModeW` is a [VkSamplerAddressMode](#VkSamplerAddressMode) value specifying the
[wrapping operation](textures.html#textures-wrapping-operation) used when the k
coordinate used to sample the image would be out of bounds.
If `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), `addressModeW` is
ignored.

* 
 `mipLodBias` is the bias to be added to
mipmap LOD calculation and bias provided by image sampling functions in
SPIR-V, as described in the [LOD    Operation](textures.html#textures-level-of-detail-operation) section.

* 
 `anisotropyEnable` is [VK_TRUE](fundamentals.html#VK_TRUE) to
enable anisotropic filtering, as described in the
[Texel Anisotropic Filtering](textures.html#textures-texel-anisotropic-filtering)
section, or [VK_FALSE](fundamentals.html#VK_FALSE) otherwise.

* 
`maxAnisotropy` is the anisotropy value clamp used by the sampler
when `anisotropyEnable` is [VK_TRUE](fundamentals.html#VK_TRUE).
If `anisotropyEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), `maxAnisotropy` is
ignored.

* 
`compareEnable` is [VK_TRUE](fundamentals.html#VK_TRUE) to enable comparison against a
reference value during lookups, or [VK_FALSE](fundamentals.html#VK_FALSE) otherwise.

Note: Some implementations will default to shader state if this member
does not match.

`compareOp` is a [VkCompareOp](#VkCompareOp) value specifying the comparison
operator to apply to fetched data before filtering as described in the
[Depth Compare Operation](textures.html#textures-depth-compare-operation) section.

`minLod` is used to clamp the [    minimum of the computed LOD value](textures.html#textures-level-of-detail-operation).

`maxLod` is used to clamp the [    maximum of the computed LOD value](textures.html#textures-level-of-detail-operation).
To avoid clamping the maximum value, set `maxLod` to the constant
[VK_LOD_CLAMP_NONE](#VK_LOD_CLAMP_NONE).

`borderColor` is a [VkBorderColor](#VkBorderColor) value specifying the
predefined border color to use.

 `unnormalizedCoordinates`
controls whether to use unnormalized or normalized texel coordinates to
address texels of the image.
When `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), the range of the
image coordinates used to lookup the texel is in the range of zero to
the image size in each dimension.
When `unnormalizedCoordinates` is [VK_FALSE](fundamentals.html#VK_FALSE), the range of image
coordinates is zero to one.

When `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), images the sampler is
used with in the shader have the following requirements:

* 
The `viewType` **must** be either [VK_IMAGE_VIEW_TYPE_1D](resources.html#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType).

* 
The image view **must** have a single layer and a single mip level.

When `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), image built-in
functions in the shader that use the sampler have the following
requirements:

* 
The functions **must** not use projection.

* 
The functions **must** not use offsets.

|  | Mapping of OpenGL to Vulkan Filter Modes
| --- | --- |

`magFilter` values of [VK_FILTER_NEAREST](#VkFilter) and [VK_FILTER_LINEAR](#VkFilter)
directly correspond to `GL_NEAREST` and `GL_LINEAR` magnification
filters.
`minFilter` and `mipmapMode` combine to correspond to the similarly
named OpenGL minification filter of `GL_minFilter_MIPMAP_mipmapMode`
(e.g. `minFilter` of [VK_FILTER_LINEAR](#VkFilter) and `mipmapMode` of
[VK_SAMPLER_MIPMAP_MODE_NEAREST](#VkSamplerMipmapMode) correspond to
`GL_LINEAR_MIPMAP_NEAREST`).

There are no Vulkan filter modes that directly correspond to OpenGL
minification filters of `GL_LINEAR` or `GL_NEAREST`, but they **can** be
emulated using [VK_SAMPLER_MIPMAP_MODE_NEAREST](#VkSamplerMipmapMode), `minLod` = 0, and
`maxLod` = 0.25, and using `minFilter` = [VK_FILTER_LINEAR](#VkFilter) or
`minFilter` = [VK_FILTER_NEAREST](#VkFilter), respectively.

Note that using a `maxLod` of zero would cause
[magnification](textures.html#textures-texel-filtering) to always be performed, and the
`magFilter` to always be used.
This is valid, just not an exact match for OpenGL behavior.
Clamping the maximum LOD to 0.25 allows the λ value to be
non-zero and minification to be performed, while still always rounding down
to the base level.
If the `minFilter` and `magFilter` are equal, then using a
`maxLod` of zero also works. |

The maximum number of sampler objects which **can** be simultaneously created
on a device is implementation-dependent and specified by the
[`maxSamplerAllocationCount`](limits.html#limits-maxSamplerAllocationCount) member
of the [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits) structure.

|  | For historical reasons, if `maxSamplerAllocationCount` is exceeded, some
| --- | --- |
implementations may return [VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult).
Exceeding this limit will result in **undefined** behavior, and an application
should not rely on the use of the returned error code in order to identify
when the limit is reached. |

Since [VkSampler](#VkSampler) is a non-dispatchable handle type, implementations
**may** return the same handle for sampler state vectors that are identical.
In such cases, all such objects would only count once against the
`maxSamplerAllocationCount` limit.

When this structure is used to write a descriptor via
[vkWriteSamplerDescriptorsEXT](descriptorheaps.html#vkWriteSamplerDescriptorsEXT), applications **can** give the descriptor a
debug name in a similar way to naming an object, via the
[VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure.
However, as there is no actual object, [VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT)
**must** be passed via the `pNext` chain of this structure, with a
`objectType` of [VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType) and a `objectHandle` of
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).
The name is attached to the unique set of descriptor bits written by the
implementation, and writing the same bits again with new debug info **may**
rename the original descriptor.

|  | Implementations are not prevented from returning the same bits for different
| --- | --- |
descriptors.
This can result in multiple different samplers mapping to the same name. |

[VkDescriptorSetAndBindingMappingEXT](descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT) **can** also be chained in the same
way when defining an embedded sampler via
[VkDescriptorSetAndBindingMappingEXT](descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT), naming the embedded sampler.

Valid Usage

* 
[](#VUID-VkSamplerCreateInfo-mipLodBias-01069) VUID-VkSamplerCreateInfo-mipLodBias-01069

The absolute value of `mipLodBias` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxSamplerLodBias`

* 
[](#VUID-VkSamplerCreateInfo-samplerMipLodBias-04467) VUID-VkSamplerCreateInfo-samplerMipLodBias-04467

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`samplerMipLodBias`
is [VK_FALSE](fundamentals.html#VK_FALSE), `mipLodBias` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-maxLod-01973) VUID-VkSamplerCreateInfo-maxLod-01973

`maxLod` **must** be greater than or equal to `minLod`

* 
[](#VUID-VkSamplerCreateInfo-anisotropyEnable-01070) VUID-VkSamplerCreateInfo-anisotropyEnable-01070

If the [`samplerAnisotropy`](features.html#features-samplerAnisotropy) feature
is not enabled, `anisotropyEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-anisotropyEnable-01071) VUID-VkSamplerCreateInfo-anisotropyEnable-01071

If `anisotropyEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), `maxAnisotropy` **must** be
between `1.0` and
`VkPhysicalDeviceLimits`::`maxSamplerAnisotropy`, inclusive

* 
[](#VUID-VkSamplerCreateInfo-minFilter-01645) VUID-VkSamplerCreateInfo-minFilter-01645

If [sampler Y′CBCR conversion](#samplers-YCbCr-conversion) is enabled
and the [potential format features](formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](formats.html#VkFormatFeatureFlagBits),
`minFilter` and `magFilter` **must** be equal to the sampler
Y′CBCR conversion’s `chromaFilter`

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01072) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01072

If `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), `minFilter` and
`magFilter` **must** be equal

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01073) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01073

If `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), `mipmapMode`
**must** be [VK_SAMPLER_MIPMAP_MODE_NEAREST](#VkSamplerMipmapMode)

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01074) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01074

If `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), `minLod` and
`maxLod` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01075) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01075

If `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), `addressModeU`
and `addressModeV` **must** each be either
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](#VkSamplerAddressMode) or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](#VkSamplerAddressMode)

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01076) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01076

If `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE),
`anisotropyEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01077) VUID-VkSamplerCreateInfo-unnormalizedCoordinates-01077

If `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE), `compareEnable`
**must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-01078) VUID-VkSamplerCreateInfo-addressModeU-01078

If any of `addressModeU`, `addressModeV` or `addressModeW`
are [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](#VkSamplerAddressMode), `borderColor`
**must** be a valid [VkBorderColor](#VkBorderColor) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-01646) VUID-VkSamplerCreateInfo-addressModeU-01646

If [sampler Y′CBCR conversion](#samplers-YCbCr-conversion) is enabled,
`addressModeU`, `addressModeV`, and `addressModeW` **must** be
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](#VkSamplerAddressMode), `anisotropyEnable`
**must** be [VK_FALSE](fundamentals.html#VK_FALSE), and `unnormalizedCoordinates` **must** be
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-None-01647) VUID-VkSamplerCreateInfo-None-01647

If [sampler Y′CBCR conversion](#samplers-YCbCr-conversion) is enabled
and the `pNext` chain includes a
[VkSamplerReductionModeCreateInfo](#VkSamplerReductionModeCreateInfo) structure, then the sampler
reduction mode **must** be [VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#VkSamplerReductionModeEXT)

* 
[](#VUID-VkSamplerCreateInfo-pNext-06726) VUID-VkSamplerCreateInfo-pNext-06726

If the [`samplerFilterMinmax`](features.html#features-samplerFilterMinmax)
feature is not enabled and the `pNext` chain includes a
[VkSamplerReductionModeCreateInfo](#VkSamplerReductionModeCreateInfo) structure, then the sampler
reduction mode **must** be [VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#VkSamplerReductionModeEXT)

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-01079) VUID-VkSamplerCreateInfo-addressModeU-01079

If the [    `samplerMirrorClampToEdge`](features.html#features-samplerMirrorClampToEdge) feature is not enabled, and if the
`[VK_KHR_sampler_mirror_clamp_to_edge](../appendices/extensions.html#VK_KHR_sampler_mirror_clamp_to_edge)` extension is not enabled,
`addressModeU`, `addressModeV` and `addressModeW` **must** not
be [VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](#VkSamplerAddressMode)

* 
[](#VUID-VkSamplerCreateInfo-compareEnable-01080) VUID-VkSamplerCreateInfo-compareEnable-01080

If `compareEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), `compareOp` **must** be a
valid [VkCompareOp](#VkCompareOp) value

* 
[](#VUID-VkSamplerCreateInfo-magFilter-01081) VUID-VkSamplerCreateInfo-magFilter-01081

If either `magFilter` or `minFilter` is
[VK_FILTER_CUBIC_EXT](#VkFilter), `anisotropyEnable` **must** be
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-magFilter-07911) VUID-VkSamplerCreateInfo-magFilter-07911

If
the [VK_EXT_filter_cubic](../appendices/extensions.html#VK_EXT_filter_cubic) extension is not enabled and
either `magFilter` or `minFilter` is [VK_FILTER_CUBIC_IMG](#VkFilter),
the `reductionMode` member of [VkSamplerReductionModeCreateInfo](#VkSamplerReductionModeCreateInfo)
**must** be [VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#VkSamplerReductionModeEXT)

* 
[](#VUID-VkSamplerCreateInfo-compareEnable-01423) VUID-VkSamplerCreateInfo-compareEnable-01423

If `compareEnable` is [VK_TRUE](fundamentals.html#VK_TRUE), the `reductionMode` member
of [VkSamplerReductionModeCreateInfo](#VkSamplerReductionModeCreateInfo) **must** be
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#VkSamplerReductionModeEXT)

* 
[](#VUID-VkSamplerCreateInfo-flags-02574) VUID-VkSamplerCreateInfo-flags-02574

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits), then
`minFilter` and `magFilter` **must** be equal

* 
[](#VUID-VkSamplerCreateInfo-flags-02575) VUID-VkSamplerCreateInfo-flags-02575

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits), then
`mipmapMode` **must** be [VK_SAMPLER_MIPMAP_MODE_NEAREST](#VkSamplerMipmapMode)

* 
[](#VUID-VkSamplerCreateInfo-flags-02576) VUID-VkSamplerCreateInfo-flags-02576

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits), then
`minLod` and `maxLod` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-flags-02577) VUID-VkSamplerCreateInfo-flags-02577

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits), then
`addressModeU` and `addressModeV` **must** each be either
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](#VkSamplerAddressMode) or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](#VkSamplerAddressMode)

* 
[](#VUID-VkSamplerCreateInfo-flags-02578) VUID-VkSamplerCreateInfo-flags-02578

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits), then
`anisotropyEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-flags-02579) VUID-VkSamplerCreateInfo-flags-02579

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits), then
`compareEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-flags-02580) VUID-VkSamplerCreateInfo-flags-02580

If `flags` includes [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits), then
`unnormalizedCoordinates` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-nonSeamlessCubeMap-06788) VUID-VkSamplerCreateInfo-nonSeamlessCubeMap-06788

If the [`nonSeamlessCubeMap`](features.html#features-nonSeamlessCubeMap) feature
is not enabled, `flags` **must** not include
[VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT](#VkSamplerCreateFlagBits)

* 
[](#VUID-VkSamplerCreateInfo-borderColor-04011) VUID-VkSamplerCreateInfo-borderColor-04011

If `borderColor` is one of [VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor), then a
[VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT) **must** be included in the
`pNext` chain

* 
[](#VUID-VkSamplerCreateInfo-customBorderColors-04085) VUID-VkSamplerCreateInfo-customBorderColors-04085

If the [`customBorderColors`](features.html#features-customBorderColors) feature
is not enabled, `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor)

* 
[](#VUID-VkSamplerCreateInfo-borderColor-04442) VUID-VkSamplerCreateInfo-borderColor-04442

If `borderColor` is one of [VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor), and
[VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT)::`format` is not
[VK_FORMAT_UNDEFINED](formats.html#VkFormat),
[VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT)::`customBorderColor`
**must** be within the range of values representable in `format`

* 
[](#VUID-VkSamplerCreateInfo-None-04012) VUID-VkSamplerCreateInfo-None-04012

The maximum number of samplers with custom border colors which **can** be
simultaneously created on a device is implementation-dependent and
specified by the [    `maxCustomBorderColorSamplers`](limits.html#limits-maxCustomBorderColorSamplers) member of the
[VkPhysicalDeviceCustomBorderColorPropertiesEXT](limits.html#VkPhysicalDeviceCustomBorderColorPropertiesEXT) structure

* 
[](#VUID-VkSamplerCreateInfo-flags-08110) VUID-VkSamplerCreateInfo-flags-08110

If `flags` includes
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkSamplerCreateFlagBits), the
[    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkSamplerCreateInfo-pNext-08111) VUID-VkSamplerCreateInfo-pNext-08111

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure, `flags`
**must** contain
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkSamplerCreateFlagBits)

* 
[](#VUID-VkSamplerCreateInfo-flags-06964) VUID-VkSamplerCreateInfo-flags-06964

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits), then `minFilter`
and `magFilter` **must** be [VK_FILTER_NEAREST](#VkFilter)

* 
[](#VUID-VkSamplerCreateInfo-flags-06965) VUID-VkSamplerCreateInfo-flags-06965

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits), then `mipmapMode`
**must** be [VK_SAMPLER_MIPMAP_MODE_NEAREST](#VkSamplerMipmapMode)

* 
[](#VUID-VkSamplerCreateInfo-flags-06966) VUID-VkSamplerCreateInfo-flags-06966

[If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits), then `minLod` and
`maxLod` **must** be zero

* 
[](#VUID-VkSamplerCreateInfo-flags-06967) VUID-VkSamplerCreateInfo-flags-06967

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits), then
`addressModeU` and `addressModeV` **must** each be either
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](#VkSamplerAddressMode) or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](#VkSamplerAddressMode)

* 
[](#VUID-VkSamplerCreateInfo-flags-06968) VUID-VkSamplerCreateInfo-flags-06968

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits), and if
`addressModeU` or `addressModeV` is
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](#VkSamplerAddressMode), then `borderColor`
**must** be [VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](#VkBorderColor)

* 
[](#VUID-VkSamplerCreateInfo-flags-06969) VUID-VkSamplerCreateInfo-flags-06969

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits), then
`anisotropyEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerCreateInfo-flags-06970) VUID-VkSamplerCreateInfo-flags-06970

If `flags` includes
[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits), then
`compareEnable` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCreateInfo-sType-sType) VUID-VkSamplerCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerCreateInfo-pNext-pNext) VUID-VkSamplerCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT), [VkSamplerBlockMatchWindowCreateInfoQCOM](#VkSamplerBlockMatchWindowCreateInfoQCOM), [VkSamplerBorderColorComponentMappingCreateInfoEXT](#VkSamplerBorderColorComponentMappingCreateInfoEXT), [VkSamplerCubicWeightsCreateInfoQCOM](#VkSamplerCubicWeightsCreateInfoQCOM), [VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT), [VkSamplerCustomBorderColorIndexCreateInfoEXT](#VkSamplerCustomBorderColorIndexCreateInfoEXT), [VkSamplerReductionModeCreateInfo](#VkSamplerReductionModeCreateInfo), or [VkSamplerYcbcrConversionInfo](#VkSamplerYcbcrConversionInfo)

* 
[](#VUID-VkSamplerCreateInfo-sType-unique) VUID-VkSamplerCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSamplerCreateInfo-flags-parameter) VUID-VkSamplerCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkSamplerCreateFlagBits](#VkSamplerCreateFlagBits) values

* 
[](#VUID-VkSamplerCreateInfo-magFilter-parameter) VUID-VkSamplerCreateInfo-magFilter-parameter

 `magFilter` **must** be a valid [VkFilter](#VkFilter) value

* 
[](#VUID-VkSamplerCreateInfo-minFilter-parameter) VUID-VkSamplerCreateInfo-minFilter-parameter

 `minFilter` **must** be a valid [VkFilter](#VkFilter) value

* 
[](#VUID-VkSamplerCreateInfo-mipmapMode-parameter) VUID-VkSamplerCreateInfo-mipmapMode-parameter

 `mipmapMode` **must** be a valid [VkSamplerMipmapMode](#VkSamplerMipmapMode) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeU-parameter) VUID-VkSamplerCreateInfo-addressModeU-parameter

 `addressModeU` **must** be a valid [VkSamplerAddressMode](#VkSamplerAddressMode) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeV-parameter) VUID-VkSamplerCreateInfo-addressModeV-parameter

 `addressModeV` **must** be a valid [VkSamplerAddressMode](#VkSamplerAddressMode) value

* 
[](#VUID-VkSamplerCreateInfo-addressModeW-parameter) VUID-VkSamplerCreateInfo-addressModeW-parameter

 `addressModeW` **must** be a valid [VkSamplerAddressMode](#VkSamplerAddressMode) value

[VK_LOD_CLAMP_NONE](#VK_LOD_CLAMP_NONE) is a special constant value used for
[VkSamplerCreateInfo](#VkSamplerCreateInfo)::`maxLod` to indicate that maximum LOD
clamping should not be performed.

#define VK_LOD_CLAMP_NONE                 1000.0F

Bits which **can** be set in [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`flags`, specifying
additional parameters of a sampler, are:

// Provided by VK_VERSION_1_0
typedef enum VkSamplerCreateFlagBits {
  // Provided by VK_EXT_fragment_density_map
    VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT = 0x00000001,
  // Provided by VK_EXT_fragment_density_map
    VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT = 0x00000002,
  // Provided by VK_EXT_descriptor_buffer
    VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = 0x00000008,
  // Provided by VK_EXT_non_seamless_cube_map
    VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT = 0x00000004,
  // Provided by VK_QCOM_image_processing
    VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM = 0x00000010,
} VkSamplerCreateFlagBits;

* 
 [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](#VkSamplerCreateFlagBits)
specifies that the sampler will read from an image created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits).

* 
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](#VkSamplerCreateFlagBits)
specifies that the implementation **may** use approximations when
reconstructing a full color value for texture access from a subsampled
image.

* 
[VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT](#VkSamplerCreateFlagBits) specifies that
[cube map edge handling](textures.html#textures-cubemapedge) is not performed.

* 

[VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM](#VkSamplerCreateFlagBits) specifies that the
sampler will read from images using only `OpImageSampleWeightedQCOM`,
`OpImageBoxFilterQCOM`,
`OpImageBlockMatchGatherSSDQCOM`,
`OpImageBlockMatchGatherSADQCOM`,
`OpImageBlockMatchWindowSSDQCOM`,
`OpImageBlockMatchWindowSADQCOM`,
`OpImageBlockMatchSSDQCOM`, or `OpImageBlockMatchSADQCOM`.

|  | The approximations used when
| --- | --- |
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](#VkSamplerCreateFlagBits) is
specified are implementation defined.
Some implementations **may** interpolate between fragment density levels in a
subsampled image.
In that case, this bit **may** be used to decide whether the interpolation
factors are calculated per fragment or at a coarser granularity. |

* 
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkSamplerCreateFlagBits)
specifies that the sampler **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) for more detail.

// Provided by VK_VERSION_1_0
typedef VkFlags VkSamplerCreateFlags;

`VkSamplerCreateFlags` is a bitmask type for setting a mask of zero or
more [VkSamplerCreateFlagBits](#VkSamplerCreateFlagBits).

The `VkSamplerReductionModeCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkSamplerReductionModeCreateInfo {
    VkStructureType           sType;
    const void*               pNext;
    VkSamplerReductionMode    reductionMode;
} VkSamplerReductionModeCreateInfo;

// Provided by VK_EXT_sampler_filter_minmax
// Equivalent to VkSamplerReductionModeCreateInfo
typedef VkSamplerReductionModeCreateInfo VkSamplerReductionModeCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`reductionMode` is a [VkSamplerReductionMode](#VkSamplerReductionMode) value controlling
how texture filtering combines texel values.

If the `pNext` chain of [VkSamplerCreateInfo](#VkSamplerCreateInfo) includes a
`VkSamplerReductionModeCreateInfo` structure, then that structure
includes a mode controlling how texture filtering combines texel values.

If this structure is not present, `reductionMode` is considered to be
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#VkSamplerReductionModeEXT).

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerReductionModeCreateInfo-sType-sType) VUID-VkSamplerReductionModeCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerReductionModeCreateInfo-reductionMode-parameter) VUID-VkSamplerReductionModeCreateInfo-reductionMode-parameter

 `reductionMode` **must** be a valid [VkSamplerReductionMode](#VkSamplerReductionMode) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](#VkSamplerCreateInfo)

Reduction modes are specified by [VkSamplerReductionMode](#VkSamplerReductionMode), which takes
values:

// Provided by VK_VERSION_1_2
typedef enum VkSamplerReductionMode {
    VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE = 0,
    VK_SAMPLER_REDUCTION_MODE_MIN = 1,
    VK_SAMPLER_REDUCTION_MODE_MAX = 2,
  // Provided by VK_QCOM_filter_cubic_clamp
    VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM = 1000521000,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_EXT = VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_SAMPLER_REDUCTION_MODE_MIN_EXT = VK_SAMPLER_REDUCTION_MODE_MIN,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_SAMPLER_REDUCTION_MODE_MAX_EXT = VK_SAMPLER_REDUCTION_MODE_MAX,
} VkSamplerReductionMode;

// Provided by VK_EXT_sampler_filter_minmax
// Equivalent to VkSamplerReductionMode
typedef VkSamplerReductionMode VkSamplerReductionModeEXT;

* 
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#VkSamplerReductionModeEXT) specifies that texel
values are combined by computing a weighted average of values in the
footprint, using weights as specified in
[the image operations chapter](textures.html#textures-unnormalized-to-integer).

* 
[VK_SAMPLER_REDUCTION_MODE_MIN](#VkSamplerReductionModeEXT) specifies that texel values are
combined by taking the component-wise minimum of values in the footprint
with non-zero weights.

* 
[VK_SAMPLER_REDUCTION_MODE_MAX](#VkSamplerReductionModeEXT) specifies that texel values are
combined by taking the component-wise maximum of values in the footprint
with non-zero weights.

* 
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](#VkSamplerReductionModeEXT)
specifies values are combined as described by
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](#VkSamplerReductionModeEXT), followed by a
[texel range clamp](textures.html#textures-texel-range-clamp).

The `VkSamplerCubicWeightsCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_filter_cubic_weights
typedef struct VkSamplerCubicWeightsCreateInfoQCOM {
    VkStructureType             sType;
    const void*                 pNext;
    VkCubicFilterWeightsQCOM    cubicWeights;
} VkSamplerCubicWeightsCreateInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`cubicWeights` is a [VkCubicFilterWeightsQCOM](#VkCubicFilterWeightsQCOM) value controlling
which cubic weights are used.

If the `pNext` chain of [VkSamplerCreateInfo](#VkSamplerCreateInfo) includes a
`VkSamplerCubicWeightsCreateInfoQCOM` structure, then that structure
specifies which cubic weights are used.

If that structure is not present, `cubicWeights` is considered to be
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](#VkCubicFilterWeightsQCOM).

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCubicWeightsCreateInfoQCOM-sType-sType) VUID-VkSamplerCubicWeightsCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CUBIC_WEIGHTS_CREATE_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerCubicWeightsCreateInfoQCOM-cubicWeights-parameter) VUID-VkSamplerCubicWeightsCreateInfoQCOM-cubicWeights-parameter

 `cubicWeights` **must** be a valid [VkCubicFilterWeightsQCOM](#VkCubicFilterWeightsQCOM) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](#VkSamplerCreateInfo)

Possible values of the
[VkSamplerCubicWeightsCreateInfoQCOM](#VkSamplerCubicWeightsCreateInfoQCOM)::`cubicWeights`, specifying
cubic weights used in [Texel Cubic Filtering](textures.html#textures-texel-cubic-filtering) are:

// Provided by VK_QCOM_filter_cubic_weights
typedef enum VkCubicFilterWeightsQCOM {
    VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM = 0,
    VK_CUBIC_FILTER_WEIGHTS_ZERO_TANGENT_CARDINAL_QCOM = 1,
    VK_CUBIC_FILTER_WEIGHTS_B_SPLINE_QCOM = 2,
    VK_CUBIC_FILTER_WEIGHTS_MITCHELL_NETRAVALI_QCOM = 3,
} VkCubicFilterWeightsQCOM;

* 
[VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](#VkCubicFilterWeightsQCOM) specifies Catmull-Rom
weights.

* 
[VK_CUBIC_FILTER_WEIGHTS_ZERO_TANGENT_CARDINAL_QCOM](#VkCubicFilterWeightsQCOM) specifies Zero
Tangent Cardinal weights.

* 
[VK_CUBIC_FILTER_WEIGHTS_B_SPLINE_QCOM](#VkCubicFilterWeightsQCOM) specifies B-Spline weights.

* 
[VK_CUBIC_FILTER_WEIGHTS_MITCHELL_NETRAVALI_QCOM](#VkCubicFilterWeightsQCOM) specifies
Mitchell-Netravali weights.

Possible values of the [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`magFilter` and
`minFilter` parameters, specifying filters used for texture lookups,
are:

// Provided by VK_VERSION_1_0
typedef enum VkFilter {
    VK_FILTER_NEAREST = 0,
    VK_FILTER_LINEAR = 1,
  // Provided by VK_EXT_filter_cubic
    VK_FILTER_CUBIC_EXT = 1000015000,
  // Provided by VK_IMG_filter_cubic
    VK_FILTER_CUBIC_IMG = VK_FILTER_CUBIC_EXT,
} VkFilter;

* 
[VK_FILTER_NEAREST](#VkFilter) specifies nearest filtering.

* 
[VK_FILTER_LINEAR](#VkFilter) specifies linear filtering.

* 
[VK_FILTER_CUBIC_EXT](#VkFilter) specifies cubic filtering.

These filters are described in detail in [Texel Filtering](textures.html#textures-texel-filtering).

Possible values of the [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`mipmapMode`,
specifying the mipmap mode used for texture lookups, are:

// Provided by VK_VERSION_1_0
typedef enum VkSamplerMipmapMode {
    VK_SAMPLER_MIPMAP_MODE_NEAREST = 0,
    VK_SAMPLER_MIPMAP_MODE_LINEAR = 1,
} VkSamplerMipmapMode;

* 
[VK_SAMPLER_MIPMAP_MODE_NEAREST](#VkSamplerMipmapMode) specifies nearest filtering.

* 
[VK_SAMPLER_MIPMAP_MODE_LINEAR](#VkSamplerMipmapMode) specifies linear filtering.

These modes are described in detail in [Texel Filtering](textures.html#textures-texel-filtering).

Possible values of the [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`addressMode*`
parameters, corresponding to different [wrapping operations](textures.html#textures-wrapping-operation) used during sampling, are:

// Provided by VK_VERSION_1_0
typedef enum VkSamplerAddressMode {
    VK_SAMPLER_ADDRESS_MODE_REPEAT = 0,
    VK_SAMPLER_ADDRESS_MODE_MIRRORED_REPEAT = 1,
    VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE = 2,
    VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER = 3,
  // Provided by VK_VERSION_1_2, VK_KHR_sampler_mirror_clamp_to_edge
    VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE = 4,
  // Provided by VK_KHR_sampler_mirror_clamp_to_edge
  // VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE_KHR is a legacy alias
    VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE_KHR = VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE,
} VkSamplerAddressMode;

* 
[VK_SAMPLER_ADDRESS_MODE_REPEAT](#VkSamplerAddressMode) specifies that the repeat wrap mode
will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_MIRRORED_REPEAT](#VkSamplerAddressMode) specifies that the
mirrored repeat wrap mode will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](#VkSamplerAddressMode) specifies that the clamp to
edge wrap mode will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](#VkSamplerAddressMode) specifies that the clamp
to border wrap mode will be used.

* 
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](#VkSamplerAddressMode) specifies that the
    mirror clamp to edge wrap mode will be used.
    This is only valid if
the [`samplerMirrorClampToEdge`](features.html#features-samplerMirrorClampToEdge) feature is enabled, or if
    the `[VK_KHR_sampler_mirror_clamp_to_edge](../appendices/extensions.html#VK_KHR_sampler_mirror_clamp_to_edge)` extension is enabled.

*Comparison operators* compare a *reference* and a *test* value, and return
a true (“passed”) or false (“failed”) value depending on the comparison
operator chosen.
The supported operators are:

// Provided by VK_VERSION_1_0
typedef enum VkCompareOp {
    VK_COMPARE_OP_NEVER = 0,
    VK_COMPARE_OP_LESS = 1,
    VK_COMPARE_OP_EQUAL = 2,
    VK_COMPARE_OP_LESS_OR_EQUAL = 3,
    VK_COMPARE_OP_GREATER = 4,
    VK_COMPARE_OP_NOT_EQUAL = 5,
    VK_COMPARE_OP_GREATER_OR_EQUAL = 6,
    VK_COMPARE_OP_ALWAYS = 7,
} VkCompareOp;

* 
[VK_COMPARE_OP_NEVER](#VkCompareOp) specifies that the comparison always evaluates
false.

* 
[VK_COMPARE_OP_LESS](#VkCompareOp) specifies that the comparison evaluates
*reference* .

* 
[VK_COMPARE_OP_EQUAL](#VkCompareOp) specifies that the comparison evaluates
*reference* = *test*.

* 
[VK_COMPARE_OP_LESS_OR_EQUAL](#VkCompareOp) specifies that the comparison
evaluates *reference* ≤ *test*.

* 
[VK_COMPARE_OP_GREATER](#VkCompareOp) specifies that the comparison evaluates
*reference* > *test*.

* 
[VK_COMPARE_OP_NOT_EQUAL](#VkCompareOp) specifies that the comparison evaluates
*reference* ≠ *test*.

* 
[VK_COMPARE_OP_GREATER_OR_EQUAL](#VkCompareOp) specifies that the comparison
evaluates *reference* ≥ *test*.

* 
[VK_COMPARE_OP_ALWAYS](#VkCompareOp) specifies that the comparison always
evaluates true.

Comparison operators are used for:

* 
The [Depth Compare Operation](textures.html#textures-depth-compare-operation)
operator for a sampler, specified by
[VkSamplerCreateInfo](#VkSamplerCreateInfo)::`compareOp`.

* 
The stencil comparison operator for the [stencil    test](fragops.html#fragops-stencil), specified by
[vkCmdSetStencilOp](fragops.html#vkCmdSetStencilOp)::`compareOp` or
    [VkStencilOpState](fragops.html#VkStencilOpState)::`compareOp`.

* 
The [Depth Comparison](fragops.html#fragops-depth-comparison) operator for the
    [depth test](fragops.html#fragops-depth), specified by
[vkCmdSetDepthCompareOp](fragops.html#vkCmdSetDepthCompareOp)::`depthCompareOp` or
    [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo)::`depthCompareOp`.

Each such use describes how the *reference* and *test* values for that
comparison are determined.

Possible values of [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`borderColor`, specifying
the border color used for texture lookups, are:

// Provided by VK_VERSION_1_0
typedef enum VkBorderColor {
    VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK = 0,
    VK_BORDER_COLOR_INT_TRANSPARENT_BLACK = 1,
    VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK = 2,
    VK_BORDER_COLOR_INT_OPAQUE_BLACK = 3,
    VK_BORDER_COLOR_FLOAT_OPAQUE_WHITE = 4,
    VK_BORDER_COLOR_INT_OPAQUE_WHITE = 5,
  // Provided by VK_EXT_custom_border_color
    VK_BORDER_COLOR_FLOAT_CUSTOM_EXT = 1000287003,
  // Provided by VK_EXT_custom_border_color
    VK_BORDER_COLOR_INT_CUSTOM_EXT = 1000287004,
} VkBorderColor;

* 
[VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](#VkBorderColor) specifies a transparent,
floating-point format, black color.

* 
[VK_BORDER_COLOR_INT_TRANSPARENT_BLACK](#VkBorderColor) specifies a transparent,
integer format, black color.

* 
[VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](#VkBorderColor) specifies an opaque,
floating-point format, black color.

* 
[VK_BORDER_COLOR_INT_OPAQUE_BLACK](#VkBorderColor) specifies an opaque, integer
format, black color.

* 
[VK_BORDER_COLOR_FLOAT_OPAQUE_WHITE](#VkBorderColor) specifies an opaque,
floating-point format, white color.

* 
[VK_BORDER_COLOR_INT_OPAQUE_WHITE](#VkBorderColor) specifies an opaque, integer
format, white color.

* 
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#VkBorderColor) specifies that a
[VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT) structure is included in
the [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`pNext` chain containing the color
data in floating-point format.

* 
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor) specifies that a
[VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT) structure is included in
the [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`pNext` chain containing the color
data in integer format.

These colors are described in detail in [Border Replacement](textures.html#textures-border-replacement).

To destroy a sampler, call:

// Provided by VK_VERSION_1_0
void vkDestroySampler(
    VkDevice                                    device,
    VkSampler                                   sampler,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the sampler.

* 
`sampler` is the sampler to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroySampler-sampler-01082) VUID-vkDestroySampler-sampler-01082

All submitted commands that refer to `sampler` **must** have completed
execution

* 
[](#VUID-vkDestroySampler-sampler-01083) VUID-vkDestroySampler-sampler-01083

If `VkAllocationCallbacks` were provided when `sampler` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroySampler-sampler-01084) VUID-vkDestroySampler-sampler-01084

If no `VkAllocationCallbacks` were provided when `sampler` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySampler-device-parameter) VUID-vkDestroySampler-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroySampler-sampler-parameter) VUID-vkDestroySampler-sampler-parameter

 If `sampler` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `sampler` **must** be a valid [VkSampler](#VkSampler) handle

* 
[](#VUID-vkDestroySampler-pAllocator-parameter) VUID-vkDestroySampler-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroySampler-sampler-parent) VUID-vkDestroySampler-sampler-parent

 If `sampler` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `sampler` **must** be externally synchronized

To create a sampler with Y′CBCR conversion enabled, add a
[VkSamplerYcbcrConversionInfo](#VkSamplerYcbcrConversionInfo) structure to the `pNext` chain of the
[VkSamplerCreateInfo](#VkSamplerCreateInfo) structure.
To create a sampler Y′CBCR conversion, the
[`samplerYcbcrConversion`](features.html#features-samplerYcbcrConversion) feature
**must** be enabled.
Conversion **must** be fixed at pipeline creation time, through use of
a combined [embedded sampler and image mapping](descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT) if using descriptor heaps, or
a combined image sampler with an immutable sampler in
`VkDescriptorSetLayoutBinding`.

A [VkSamplerYcbcrConversionInfo](#VkSamplerYcbcrConversionInfo) **must** be provided for samplers to be
used with image views that access [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits) if the
format is one of the [formats that require a sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion)
, or if the image view has an
[external format](memory.html#memory-external-android-hardware-buffer-external-formats)
.

The `VkSamplerYcbcrConversionInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkSamplerYcbcrConversionInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkSamplerYcbcrConversion    conversion;
} VkSamplerYcbcrConversionInfo;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrConversionInfo
typedef VkSamplerYcbcrConversionInfo VkSamplerYcbcrConversionInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`conversion` is a [VkSamplerYcbcrConversion](#VkSamplerYcbcrConversion) handle created with
[vkCreateSamplerYcbcrConversion](#vkCreateSamplerYcbcrConversion).

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionInfo-sType-sType) VUID-VkSamplerYcbcrConversionInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerYcbcrConversionInfo-conversion-parameter) VUID-VkSamplerYcbcrConversionInfo-conversion-parameter

 `conversion` **must** be a valid [VkSamplerYcbcrConversion](#VkSamplerYcbcrConversion) handle

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)

* 
[VkSamplerCreateInfo](#VkSamplerCreateInfo)

A sampler Y′CBCR conversion is an opaque representation of a
device-specific sampler Y′CBCR conversion description, represented as a
`VkSamplerYcbcrConversion` handle:

// Provided by VK_VERSION_1_1
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkSamplerYcbcrConversion)

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrConversion
typedef VkSamplerYcbcrConversion VkSamplerYcbcrConversionKHR;

To create a [VkSamplerYcbcrConversion](#VkSamplerYcbcrConversion), call:

// Provided by VK_VERSION_1_1
VkResult vkCreateSamplerYcbcrConversion(
    VkDevice                                    device,
    const VkSamplerYcbcrConversionCreateInfo*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSamplerYcbcrConversion*                   pYcbcrConversion);

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to vkCreateSamplerYcbcrConversion
VkResult vkCreateSamplerYcbcrConversionKHR(
    VkDevice                                    device,
    const VkSamplerYcbcrConversionCreateInfo*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkSamplerYcbcrConversion*                   pYcbcrConversion);

* 
`device` is the logical device that creates the sampler Y′CBCR
conversion.

* 
`pCreateInfo` is a pointer to a
[VkSamplerYcbcrConversionCreateInfo](#VkSamplerYcbcrConversionCreateInfo) structure specifying the
requested sampler Y′CBCR conversion.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pYcbcrConversion` is a pointer to a [VkSamplerYcbcrConversion](#VkSamplerYcbcrConversion)
handle in which the resulting sampler Y′CBCR conversion is returned.

The interpretation of the configured sampler Y′CBCR conversion is described
in more detail in [the description of sampler Y′CBCR conversion](textures.html#textures-sampler-YCbCr-conversion) in the [Image Operations](textures.html#textures) chapter.

Valid Usage

* 
[](#VUID-vkCreateSamplerYcbcrConversion-None-01648) VUID-vkCreateSamplerYcbcrConversion-None-01648

The [`samplerYcbcrConversion`](features.html#features-samplerYcbcrConversion)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateSamplerYcbcrConversion-device-parameter) VUID-vkCreateSamplerYcbcrConversion-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateSamplerYcbcrConversion-pCreateInfo-parameter) VUID-vkCreateSamplerYcbcrConversion-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkSamplerYcbcrConversionCreateInfo](#VkSamplerYcbcrConversionCreateInfo) structure

* 
[](#VUID-vkCreateSamplerYcbcrConversion-pAllocator-parameter) VUID-vkCreateSamplerYcbcrConversion-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateSamplerYcbcrConversion-pYcbcrConversion-parameter) VUID-vkCreateSamplerYcbcrConversion-pYcbcrConversion-parameter

 `pYcbcrConversion` **must** be a valid pointer to a [VkSamplerYcbcrConversion](#VkSamplerYcbcrConversion) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

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
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

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
`components` applies a *swizzle* based on [VkComponentSwizzle](resources.html#VkComponentSwizzle)
enums prior to range expansion and color model conversion.

* 
`xChromaOffset` describes the
[sample location](textures.html#textures-chroma-reconstruction) associated with
downsampled chroma components in the x dimension.
`xChromaOffset` has no effect for formats in which chroma components
are not downsampled horizontally.

* 
`yChromaOffset` describes the
[sample location](textures.html#textures-chroma-reconstruction) associated with
downsampled chroma components in the y dimension.
`yChromaOffset` has no effect for formats in which the chroma
components are not downsampled vertically.

* 
`chromaFilter` is the filter for chroma reconstruction.

* 
`forceExplicitReconstruction` **can** be used to ensure that
reconstruction is done explicitly, if supported.

|  | Setting `forceExplicitReconstruction` to [VK_TRUE](fundamentals.html#VK_TRUE) **may** have a
| --- | --- |
performance penalty on implementations where explicit reconstruction is not
the default mode of operation.

If `format` supports
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](formats.html#VkFormatFeatureFlagBits)
the `forceExplicitReconstruction` value behaves as if it were
[VK_TRUE](fundamentals.html#VK_TRUE). |

If the `pNext` chain includes a [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID) structure
with non-zero `externalFormat` member, the sampler Y′CBCR conversion
object represents an *external format conversion*, and `format` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat).
Such conversions **must** only be used to sample image views with a matching
[external format](memory.html#memory-external-android-hardware-buffer-external-formats).
When creating an external format conversion, the value of `components`
is ignored.

Valid Usage

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-01904) VUID-VkSamplerYcbcrConversionCreateInfo-format-01904

If an external format conversion is being created, `format` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-04061) VUID-VkSamplerYcbcrConversionCreateInfo-format-04061

If an external format conversion is not being created,
`format` **must** represent unsigned normalized values (i.e. the format
**must** be a `UNORM` format)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-01650) VUID-VkSamplerYcbcrConversionCreateInfo-format-01650

The [potential format features](formats.html#potential-format-features) of the
sampler Y′CBCR conversion **must** support
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01651) VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01651

If the [potential format features](formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits), `xChromaOffset`
and `yChromaOffset` **must** not be
[VK_CHROMA_LOCATION_COSITED_EVEN](#VkChromaLocationKHR) if the corresponding components
are [downsampled](textures.html#textures-chroma-reconstruction)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01652) VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-01652

If the [potential format features](formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits), `xChromaOffset`
and `yChromaOffset` **must** not be [VK_CHROMA_LOCATION_MIDPOINT](#VkChromaLocationKHR)
if the corresponding components are [    downsampled](textures.html#textures-chroma-reconstruction)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02581) VUID-VkSamplerYcbcrConversionCreateInfo-components-02581

If the format has a `_422` or `_420` suffix, then
`components.g` **must** be the
[identity swizzle](resources.html#resources-image-views-identity-mappings)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02582) VUID-VkSamplerYcbcrConversionCreateInfo-components-02582

If the format has a `_422` or `_420` suffix, then
`components.a` **must** be the
[identity swizzle](resources.html#resources-image-views-identity-mappings),
[VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle), or [VK_COMPONENT_SWIZZLE_ZERO](resources.html#VkComponentSwizzle)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02583) VUID-VkSamplerYcbcrConversionCreateInfo-components-02583

If the format has a `_422` or `_420` suffix, then
`components.r` **must** be the
[identity swizzle](resources.html#resources-image-views-identity-mappings) or
[VK_COMPONENT_SWIZZLE_B](resources.html#VkComponentSwizzle)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02584) VUID-VkSamplerYcbcrConversionCreateInfo-components-02584

If the format has a `_422` or `_420` suffix, then
`components.b` **must** be the
[identity swizzle](resources.html#resources-image-views-identity-mappings) or
[VK_COMPONENT_SWIZZLE_R](resources.html#VkComponentSwizzle)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-02585) VUID-VkSamplerYcbcrConversionCreateInfo-components-02585

If the format has a `_422` or `_420` suffix, and if either
`components.r` or `components.b` is the
[identity swizzle](resources.html#resources-image-views-identity-mappings), both
values **must** be the identity swizzle

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-01655) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-01655

If `ycbcrModel` is not
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](#VkSamplerYcbcrModelConversionKHR), then
`components.r`, `components.g`, and `components.b` **must**
correspond to components of the `format`; that is,
`components.r`, `components.g`, and `components.b` **must** not
be [VK_COMPONENT_SWIZZLE_ZERO](resources.html#VkComponentSwizzle) or [VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle),
and **must** not correspond to a component containing zero or one as a
consequence of [component substitution](images.html#images-component-substitution)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-02748) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-02748

If `ycbcrRange` is [VK_SAMPLER_YCBCR_RANGE_ITU_NARROW](#VkSamplerYcbcrRangeKHR), then the
R, G, and B components obtained by applying the `component` swizzle
to `format` **must** each have a bit-depth greater than or equal to 8

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-forceExplicitReconstruction-01656) VUID-VkSamplerYcbcrConversionCreateInfo-forceExplicitReconstruction-01656

If the [potential format features](formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](formats.html#VkFormatFeatureFlagBits)
`forceExplicitReconstruction` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-01657) VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-01657

If the [potential format features](formats.html#potential-format-features) of the
sampler Y′CBCR conversion do not support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](formats.html#VkFormatFeatureFlagBits),
`chromaFilter` **must** not be [VK_FILTER_LINEAR](#VkFilter)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09207) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09207

If the `pNext` chain includes a
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM) structure, and
if the [`ycbcrDegamma`](features.html#features-ycbcrDegamma) feature is not
enabled, then
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM)::`enableYDegamma`
**must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09208) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09208

If the `pNext` chain includes a
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM) structure, and
if the [`ycbcrDegamma`](features.html#features-ycbcrDegamma) feature is not
enabled, then
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM)::`enableCbCrDegamma`
**must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09209) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-09209

If the `pNext` chain includes a
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM) structure,
`format` **must** be a format with 8-bit R, G, and B components

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-sType-sType) VUID-VkSamplerYcbcrConversionCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-pNext-pNext) VUID-VkSamplerYcbcrConversionCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID), [VkExternalFormatOHOS](resources.html#VkExternalFormatOHOS), [VkExternalFormatQNX](resources.html#VkExternalFormatQNX), or [VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM)

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-sType-unique) VUID-VkSamplerYcbcrConversionCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-format-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrModel-parameter

 `ycbcrModel` **must** be a valid [VkSamplerYcbcrModelConversion](#VkSamplerYcbcrModelConversion) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-ycbcrRange-parameter

 `ycbcrRange` **must** be a valid [VkSamplerYcbcrRange](#VkSamplerYcbcrRange) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-components-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-components-parameter

 `components` **must** be a valid [VkComponentMapping](resources.html#VkComponentMapping) structure

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-xChromaOffset-parameter

 `xChromaOffset` **must** be a valid [VkChromaLocation](#VkChromaLocation) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-yChromaOffset-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-yChromaOffset-parameter

 `yChromaOffset` **must** be a valid [VkChromaLocation](#VkChromaLocation) value

* 
[](#VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-parameter) VUID-VkSamplerYcbcrConversionCreateInfo-chromaFilter-parameter

 `chromaFilter` **must** be a valid [VkFilter](#VkFilter) value

If `chromaFilter` is [VK_FILTER_NEAREST](#VkFilter), chroma samples are
reconstructed to luma component resolution using nearest-neighbour sampling.
Otherwise, chroma samples are reconstructed using interpolation.
More details can be found in [the description of sampler Y′CBCR conversion](textures.html#textures-sampler-YCbCr-conversion) in the [Image Operations](textures.html#textures) chapter.

[VkSamplerYcbcrModelConversion](#VkSamplerYcbcrModelConversion) defines the conversion from the source
color model to the shader color model.
Possible values are:

// Provided by VK_VERSION_1_1
typedef enum VkSamplerYcbcrModelConversion {
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY = 0,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY = 1,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709 = 2,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601 = 3,
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020 = 4,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020_KHR = VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020,
} VkSamplerYcbcrModelConversion;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrModelConversion
typedef VkSamplerYcbcrModelConversion VkSamplerYcbcrModelConversionKHR;

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](#VkSamplerYcbcrModelConversionKHR) specifies that the
input values to the conversion are unmodified.

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY](#VkSamplerYcbcrModelConversionKHR) specifies no
model conversion but the inputs are range expanded as for Y′CBCR.

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709](#VkSamplerYcbcrModelConversionKHR) specifies the color
model conversion from Y′CBCR to R′G′B′ defined in BT.709 and
described in the “BT.709 Y′CBCR conversion” section of the
[Khronos Data Format Specification](introduction.html#data-format).

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601](#VkSamplerYcbcrModelConversionKHR) specifies the color
model conversion from Y′CBCR to R′G′B′ defined in BT.601 and
described in the “BT.601 Y′CBCR conversion” section of the
[Khronos Data Format Specification](introduction.html#data-format).

* 
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020](#VkSamplerYcbcrModelConversionKHR) specifies the color
model conversion from Y′CBCR to R′G′B′ defined in BT.2020 and
described in the “BT.2020 Y′CBCR conversion” section of the
[Khronos Data Format Specification](introduction.html#data-format).

In the `VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_*` color models, for the
input to the sampler Y′CBCR range expansion and model conversion:

* 
the Y (Y′ luma) component corresponds to the G component of an RGB
image.

* 
the CB (CB or “U” blue color difference) component corresponds to
the B component of an RGB image.

* 
the CR (CR or “V” red color difference) component corresponds to the
R component of an RGB image.

* 
the alpha component, if present, is not modified by color model
conversion.

These rules reflect the mapping of components after the component swizzle
operation (controlled by
[VkSamplerYcbcrConversionCreateInfo](#VkSamplerYcbcrConversionCreateInfo)::`components`).

|  | For example, an “YUVA” 32-bit format comprising four 8-bit components can
| --- | --- |
be implemented as [VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat) with a component mapping:

* 
`components.a` = [VK_COMPONENT_SWIZZLE_IDENTITY](resources.html#VkComponentSwizzle)

* 
`components.r` = [VK_COMPONENT_SWIZZLE_B](resources.html#VkComponentSwizzle)

* 
`components.g` = [VK_COMPONENT_SWIZZLE_R](resources.html#VkComponentSwizzle)

* 
`components.b` = [VK_COMPONENT_SWIZZLE_G](resources.html#VkComponentSwizzle) |

The [VkSamplerYcbcrRange](#VkSamplerYcbcrRange) enum describes whether color components are
encoded using the full range of numerical values or whether values are
reserved for headroom and foot room.
[VkSamplerYcbcrRange](#VkSamplerYcbcrRange) is defined as:

// Provided by VK_VERSION_1_1
typedef enum VkSamplerYcbcrRange {
    VK_SAMPLER_YCBCR_RANGE_ITU_FULL = 0,
    VK_SAMPLER_YCBCR_RANGE_ITU_NARROW = 1,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_RANGE_ITU_FULL_KHR = VK_SAMPLER_YCBCR_RANGE_ITU_FULL,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_SAMPLER_YCBCR_RANGE_ITU_NARROW_KHR = VK_SAMPLER_YCBCR_RANGE_ITU_NARROW,
} VkSamplerYcbcrRange;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrRange
typedef VkSamplerYcbcrRange VkSamplerYcbcrRangeKHR;

* 
[VK_SAMPLER_YCBCR_RANGE_ITU_FULL](#VkSamplerYcbcrRangeKHR) specifies that the full range of
the encoded values are valid and interpreted according to the ITU “full
range” quantization rules.

* 
[VK_SAMPLER_YCBCR_RANGE_ITU_NARROW](#VkSamplerYcbcrRangeKHR) specifies that headroom and foot
room are reserved in the numerical range of encoded values, and the
remaining values are expanded according to the ITU “narrow range”
quantization rules.

The formulae for these conversions is described in the
[Sampler Y′CBCR Range Expansion](textures.html#textures-sampler-YCbCr-conversion-rangeexpand) section of the [Image Operations](textures.html#textures) chapter.

No range modification takes place if `ycbcrModel` is
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](#VkSamplerYcbcrModelConversionKHR); the `ycbcrRange`
field of [VkSamplerYcbcrConversionCreateInfo](#VkSamplerYcbcrConversionCreateInfo) is ignored in this case.

The [VkChromaLocation](#VkChromaLocation) enum defines the location of downsampled chroma
component samples relative to the luma samples, and is defined as:

// Provided by VK_VERSION_1_1
typedef enum VkChromaLocation {
    VK_CHROMA_LOCATION_COSITED_EVEN = 0,
    VK_CHROMA_LOCATION_MIDPOINT = 1,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_CHROMA_LOCATION_COSITED_EVEN_KHR = VK_CHROMA_LOCATION_COSITED_EVEN,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_CHROMA_LOCATION_MIDPOINT_KHR = VK_CHROMA_LOCATION_MIDPOINT,
} VkChromaLocation;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkChromaLocation
typedef VkChromaLocation VkChromaLocationKHR;

* 
[VK_CHROMA_LOCATION_COSITED_EVEN](#VkChromaLocationKHR) specifies that downsampled chroma
samples are aligned with luma samples with even coordinates.

* 
[VK_CHROMA_LOCATION_MIDPOINT](#VkChromaLocationKHR) specifies that downsampled chroma
samples are located half way between each even luma sample and the
nearest higher odd luma sample.

Applications **can** enable sRGB to linear conversion for the R, G, and B
components of a Y′CBCR image during [sampling](textures.html#textures-YCbCr-degamma) by
including `VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM` structure
in the `pNext` chain of [VkSamplerYcbcrConversionCreateInfo](#VkSamplerYcbcrConversionCreateInfo).

The `VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM` structure is
defined as:

// Provided by VK_QCOM_ycbcr_degamma
typedef struct VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           enableYDegamma;
    VkBool32           enableCbCrDegamma;
} VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`enableYDegamma` indicates [sRGB to    linear](textures.html#textures-YCbCr-degamma) conversion is enabled for the G component.

* 
`enableCbCrDegamma` indicates [sRGB to    linear](textures.html#textures-YCbCr-degamma) conversion is enabled for the R and B components.

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM-sType-sType) VUID-VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_YCBCR_DEGAMMA_CREATE_INFO_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerYcbcrConversionCreateInfo](#VkSamplerYcbcrConversionCreateInfo)

To destroy a sampler Y′CBCR conversion, call:

// Provided by VK_VERSION_1_1
void vkDestroySamplerYcbcrConversion(
    VkDevice                                    device,
    VkSamplerYcbcrConversion                    ycbcrConversion,
    const VkAllocationCallbacks*                pAllocator);

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to vkDestroySamplerYcbcrConversion
void vkDestroySamplerYcbcrConversionKHR(
    VkDevice                                    device,
    VkSamplerYcbcrConversion                    ycbcrConversion,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the Y′CBCR conversion.

* 
`ycbcrConversion` is the conversion to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroySamplerYcbcrConversion-device-parameter) VUID-vkDestroySamplerYcbcrConversion-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parameter) VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parameter

 If `ycbcrConversion` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `ycbcrConversion` **must** be a valid [VkSamplerYcbcrConversion](#VkSamplerYcbcrConversion) handle

* 
[](#VUID-vkDestroySamplerYcbcrConversion-pAllocator-parameter) VUID-vkDestroySamplerYcbcrConversion-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parent) VUID-vkDestroySamplerYcbcrConversion-ycbcrConversion-parent

 If `ycbcrConversion` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `ycbcrConversion` **must** be externally synchronized

In addition to the predefined border color values, applications **can** provide
a custom border color value by including the
`VkSamplerCustomBorderColorCreateInfoEXT` structure in the
[VkSamplerCreateInfo](#VkSamplerCreateInfo)::`pNext` chain.

The `VkSamplerCustomBorderColorCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_custom_border_color
typedef struct VkSamplerCustomBorderColorCreateInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    VkClearColorValue    customBorderColor;
    VkFormat             format;
} VkSamplerCustomBorderColorCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`customBorderColor` is a [VkClearColorValue](clears.html#VkClearColorValue) representing the
desired custom sampler border color.

* 
`format` is a [VkFormat](formats.html#VkFormat) representing the format of the sampled
image view(s).
This field may be [VK_FORMAT_UNDEFINED](formats.html#VkFormat) if the
[    `customBorderColorWithoutFormat`](features.html#features-customBorderColorWithoutFormat) feature is enabled.

|  | If `format` is a depth/stencil format, the aspect is determined by the
| --- | --- |
value of [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`borderColor`.
If [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`borderColor` is
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#VkBorderColor), the depth aspect is considered.
If [VkSamplerCreateInfo](#VkSamplerCreateInfo)::`borderColor` is
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor), the stencil aspect is considered.

If `format` is [VK_FORMAT_UNDEFINED](formats.html#VkFormat), the
[VkSamplerCreateInfo](#VkSamplerCreateInfo)::`borderColor` is
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor), and the sampler is used with an image
with a stencil format, then the implementation **must** source the custom
border color from either the first or second components of
[VkSamplerCreateInfo](#VkSamplerCreateInfo)::`borderColor` and **should** source it from the
first component. |

Valid Usage

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-07605) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-07605

If `format` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat) and `format` is not
a depth/stencil format then the
[VkSamplerCreateInfo](#VkSamplerCreateInfo)::`borderColor` type **must** match the
sampled type of the provided `format`, as shown in the *SPIR-V Type*
column of the [Interpretation of Numeric Format](formats.html#formats-numericformat) table

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04014) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04014

If the [    `customBorderColorWithoutFormat`](features.html#features-customBorderColorWithoutFormat) feature is not enabled then
`format` **must** not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04015) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04015

If the sampler is used to sample an image view of
[VK_FORMAT_B4G4R4A4_UNORM_PACK16](formats.html#VkFormat),
[VK_FORMAT_B5G6R5_UNORM_PACK16](formats.html#VkFormat),
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](formats.html#VkFormat),
or [VK_FORMAT_B5G5R5A1_UNORM_PACK16](formats.html#VkFormat) format then `format` **must**
not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-sType-sType) VUID-VkSamplerCustomBorderColorCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-parameter) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](#VkSamplerCreateInfo)

If the sampler is created with [VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](#VkBorderColor),
[VK_BORDER_COLOR_INT_OPAQUE_BLACK](#VkBorderColor),
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#VkBorderColor), or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor) `borderColor`, and that sampler
will be combined with an image view that does not have an
[identity swizzle](resources.html#resources-image-views-identity-mappings), and
[VkPhysicalDeviceBorderColorSwizzleFeaturesEXT](features.html#VkPhysicalDeviceBorderColorSwizzleFeaturesEXT)::`borderColorSwizzleFromImage`
is not enabled, then it is necessary to specify the component mapping of the
border color, by including the
`VkSamplerBorderColorComponentMappingCreateInfoEXT` structure in the
[VkSamplerCreateInfo](#VkSamplerCreateInfo)::`pNext` chain, to get defined results.

The `VkSamplerBorderColorComponentMappingCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_border_color_swizzle
typedef struct VkSamplerBorderColorComponentMappingCreateInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkComponentMapping    components;
    VkBool32              srgb;
} VkSamplerBorderColorComponentMappingCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`components` is a [VkComponentMapping](resources.html#VkComponentMapping) structure specifying a
remapping of the border color components.

* 
`srgb` indicates that the sampler will be combined with an image
view that has an image format which is sRGB encoded.

The [VkComponentMapping](resources.html#VkComponentMapping) `components` member describes a remapping
from components of the border color to components of the vector returned by
shader image instructions when the border color is used.

Valid Usage

* 
[](#VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-borderColorSwizzle-06437) VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-borderColorSwizzle-06437

The [`borderColorSwizzle`](features.html#features-borderColorSwizzle) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-sType-sType) VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_BORDER_COLOR_COMPONENT_MAPPING_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-components-parameter) VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-components-parameter

 `components` **must** be a valid [VkComponentMapping](resources.html#VkComponentMapping) structure

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](#VkSamplerCreateInfo)

When using descriptor heaps, it is possible to create a sampler descriptor
without creating a sampler object.
Without this object, implementations using a fixed palette of border colors
have no way to know which custom border colors are active or not.

In order to use custom border colors with descriptor heaps, border colors
**must** instead be registered with the implementation and unregistered when
they are no longer in use, and the registered index provided when writing
the sampler descriptor.

To register a custom border color, call:

// Provided by VK_EXT_custom_border_color with VK_EXT_descriptor_heap
VkResult vkRegisterCustomBorderColorEXT(
    VkDevice                                    device,
    const VkSamplerCustomBorderColorCreateInfoEXT* pBorderColor,
    VkBool32                                    requestIndex,
    uint32_t*                                   pIndex);

* 
`device` is the logical device where the border color is registered.

* 
`pBorderColor` is a pointer to a
[VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT) structure specifying the
custom border color value to register.

* 
`requestIndex` is a Boolean value indicating if a specific index is
requested or not.

* 
`pIndex` is a pointer to a `uint32_t` index value that will be
written by the command upon success.

If `requestIndex` is [VK_TRUE](fundamentals.html#VK_TRUE), the value present in `pIndex`
when passed to the command is a requested index, and rather than returning a
new index, the implementation will attempt to register that index, leaving
the value intact.
If the implementation is unable to register a requested index,
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult) will be returned.
If an index has not been registered (either explicitly or implicitly by
creating a sampler object), or if it has been subsequently unregistered, the
implementation **must** register that index successfully.

If `requestIndex` is [VK_FALSE](fundamentals.html#VK_FALSE), the value stored in `pIndex` is
ignored, and a new index will be returned if the implementation is able to
register a new index.
If the implementation is unable to register a new index,
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult) will be returned.

If an index is successfully registered, it **can** be used when writing a
sampler descriptor or creating a sampler object to use with the custom
border color, via [VkSamplerCustomBorderColorIndexCreateInfoEXT](#VkSamplerCustomBorderColorIndexCreateInfoEXT).

|  | The type of border color is not specified by this command
| --- | --- |
([VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#VkBorderColor) vs.
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#VkBorderColor)); the data will be interpreted at the
point the border color is sampled with an actual sampler.
Implementations are expected to store the data as raw bytes if they do not
need the format to be specified. |

Valid Usage

* 
[](#VUID-vkRegisterCustomBorderColorEXT-requestIndex-11287) VUID-vkRegisterCustomBorderColorEXT-requestIndex-11287

If `requestIndex` is [VK_TRUE](fundamentals.html#VK_TRUE), the value stored in `pIndex`
**must** be less than [    maxCustomBorderColorSamplers](limits.html#limits-maxCustomBorderColorSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkRegisterCustomBorderColorEXT-device-parameter) VUID-vkRegisterCustomBorderColorEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkRegisterCustomBorderColorEXT-pBorderColor-parameter) VUID-vkRegisterCustomBorderColorEXT-pBorderColor-parameter

 `pBorderColor` **must** be a valid pointer to a valid [VkSamplerCustomBorderColorCreateInfoEXT](#VkSamplerCustomBorderColorCreateInfoEXT) structure

* 
[](#VUID-vkRegisterCustomBorderColorEXT-pIndex-parameter) VUID-vkRegisterCustomBorderColorEXT-pIndex-parameter

 `pIndex` **must** be a valid pointer to a `uint32_t` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To unregister a custom border color, call:

// Provided by VK_EXT_custom_border_color with VK_EXT_descriptor_heap
void vkUnregisterCustomBorderColorEXT(
    VkDevice                                    device,
    uint32_t                                    index);

* 
`device` is the logical device where the border color is registered.

* 
`index` is the `uint32_t` index value to unregister.

Valid Usage

* 
[](#VUID-vkUnregisterCustomBorderColorEXT-index-11288) VUID-vkUnregisterCustomBorderColorEXT-index-11288

`index` **must** be less than [    `maxCustomBorderColorSamplers`](limits.html#limits-maxCustomBorderColorSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkUnregisterCustomBorderColorEXT-device-parameter) VUID-vkUnregisterCustomBorderColorEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

The `VkSamplerCustomBorderColorIndexCreateInfoEXT` structure is defined
as:

// Provided by VK_EXT_custom_border_color with VK_EXT_descriptor_heap
typedef struct VkSamplerCustomBorderColorIndexCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           index;
} VkSamplerCustomBorderColorIndexCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`index` is the `uint32_t` index value to use with the sampler

If this structure is included in the `pNext` chain of
[VkSamplerCreateInfo](#VkSamplerCreateInfo), the value of `index` will be used for the
custom border color registration.
`index` does not need to be registered at the point that a sampler
object is created or a sampler descriptor is written; as long as it is
registered when any use of the sampler is recorded to a command, and remains
registered while the sampler is in use.
The color registered with the index and the color specified in the sampler
**must** be identically defined.

If this structure is not provided when creating a sampler object with a
custom border color, it is equivalent to registering a new custom border
color by calling [vkRegisterCustomBorderColorEXT](#vkRegisterCustomBorderColorEXT) with that custom
border color value, and using that value as `index` in this structure.
This implicit registration will be implicitly unregistered when the sampler
is destroyed.

If this structure is not provided when creating a sampler object without a
custom border color, it is equivalent to setting `index` to 0.

Valid Usage

* 
[](#VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-index-11289) VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-index-11289

`index` **must** be less than [    `maxCustomBorderColorSamplers`](limits.html#limits-maxCustomBorderColorSamplers)

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-sType-sType) VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_INDEX_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](#VkSamplerCreateInfo)

The `VkSamplerBlockMatchWindowCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_image_processing2
typedef struct VkSamplerBlockMatchWindowCreateInfoQCOM {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExtent2D                           windowExtent;
    VkBlockMatchWindowCompareModeQCOM    windowCompareMode;
} VkSamplerBlockMatchWindowCreateInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`windowExtent` is a [VkExtent2D](fundamentals.html#VkExtent2D) specifying a the width and
height of the block match window.

* 
`windowCompareMode` is a [VkBlockMatchWindowCompareModeQCOM](#VkBlockMatchWindowCompareModeQCOM)
specifying the compare mode.

Valid Usage

* 
[](#VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-WindowExtent-09210) VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-WindowExtent-09210

`WindowExtent` **must** not be larger than
[VkPhysicalDeviceImageProcessing2PropertiesQCOM](devsandqueues.html#VkPhysicalDeviceImageProcessing2PropertiesQCOM)::`maxBlockMatchWindow`

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-sType-sType) VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_BLOCK_MATCH_WINDOW_CREATE_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-windowCompareMode-parameter) VUID-VkSamplerBlockMatchWindowCreateInfoQCOM-windowCompareMode-parameter

 `windowCompareMode` **must** be a valid [VkBlockMatchWindowCompareModeQCOM](#VkBlockMatchWindowCompareModeQCOM) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](#VkSamplerCreateInfo)

The [VkBlockMatchWindowCompareModeQCOM](#VkBlockMatchWindowCompareModeQCOM) enum describes how block match
values within the window are compared.
[VkBlockMatchWindowCompareModeQCOM](#VkBlockMatchWindowCompareModeQCOM) is defined as:

// Provided by VK_QCOM_image_processing2
typedef enum VkBlockMatchWindowCompareModeQCOM {
    VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MIN_QCOM = 0,
    VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MAX_QCOM = 1,
} VkBlockMatchWindowCompareModeQCOM;

* 
[VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MIN_QCOM](#VkBlockMatchWindowCompareModeQCOM) specifies that
windowed block match operations return the minimum error within the
window.

* 
[VK_BLOCK_MATCH_WINDOW_COMPARE_MODE_MAX_QCOM](#VkBlockMatchWindowCompareModeQCOM) specifies that
windowed block match operations return the maximum error within the
window.
