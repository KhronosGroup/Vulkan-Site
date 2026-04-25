# VK_QCOM_image_processing

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_QCOM_image_processing.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. SPIR-V Built-in Functions](#_spir_v_built_in_functions)
- [3.1._SPIR-V_Built-in_Functions](#_spir_v_built_in_functions)
- [3.2. High Level Language Exposure](#_high_level_language_exposure)
- [3.2._High_Level_Language_Exposure](#_high_level_language_exposure)
- [3.3. Features and Properties](#_features_and_properties)
- [3.3._Features_and_Properties](#_features_and_properties)
- [3.4. VkSampler compatibility](#_vksampler_compatibility)
- [3.4._VkSampler_compatibility](#_vksampler_compatibility)
- [3.5. VkImage compatibility](#_vkimage_compatibility)
- [3.5._VkImage_compatibility](#_vkimage_compatibility)
- [3.6. Descriptor Types](#_descriptor_types)
- [3.6._Descriptor_Types](#_descriptor_types)
- [3.7. VkFormat Support](#_vkformat_support)
- [3.7._VkFormat_Support](#_vkformat_support)
- [3.8. Weight Image Sampling](#_weight_image_sampling)
- [3.8._Weight_Image_Sampling](#_weight_image_sampling)
- [3.8.1. Sub-texel weighting](#_sub_texel_weighting)
- [3.8.1._Sub-texel_weighting](#_sub_texel_weighting)
- [3.8.2. Weight Image View Type](#_weight_image_view_type)
- [3.8.2._Weight_Image_View_Type](#_weight_image_view_type)
- [3.8.3. Non-Separable Weight Encoding](#_non_separable_weight_encoding)
- [3.8.3._Non-Separable_Weight_Encoding](#_non_separable_weight_encoding)
- [3.8.4. Separable Weight Encoding](#_separable_weight_encoding)
- [3.8.4._Separable_Weight_Encoding](#_separable_weight_encoding)
- [3.9. Box Filter Sampling](#_box_filter_sampling)
- [3.9._Box_Filter_Sampling](#_box_filter_sampling)
- [3.10. Block Matching Sampling](#_block_matching_sampling)
- [3.10._Block_Matching_Sampling](#_block_matching_sampling)
- [4. Expected Features and limits](#_expected_features_and_limits)
- [4._Expected_Features_and_limits](#_expected_features_and_limits)
- [5. Issues](#_issues)
- [5.1. Should this be one extension or 3 extensions?](#_should_this_be_one_extension_or_3_extensions)
- [5.1._Should_this_be_one_extension_or_3_extensions?](#_should_this_be_one_extension_or_3_extensions)
- [5.2. How does this interact with descriptor indexing ?](#_how_does_this_interact_with_descriptor_indexing)
- [5.2._How_does_this_interact_with_descriptor_indexing_?](#_how_does_this_interact_with_descriptor_indexing)
- [5.3._How_does_this_extension_interact_with_EXT_robustness2_?](#_how_does_this_extension_interact_with_ext_robustness2)
- [5.4. How does this interact with push descriptors ?](#_how_does_this_interact_with_push_descriptors)
- [5.4._How_does_this_interact_with_push_descriptors_?](#_how_does_this_interact_with_push_descriptors)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V Built-in Functions](#_spir_v_built_in_functions)
[3.2. High Level Language Exposure](#_high_level_language_exposure)
[3.3. Features and Properties](#_features_and_properties)
[3.4. VkSampler compatibility](#_vksampler_compatibility)
[3.5. VkImage compatibility](#_vkimage_compatibility)
[3.6. Descriptor Types](#_descriptor_types)
[3.7. VkFormat Support](#_vkformat_support)
[3.8. Weight Image Sampling](#_weight_image_sampling)
[3.9. Box Filter Sampling](#_box_filter_sampling)
[3.10. Block Matching Sampling](#_block_matching_sampling)

[4. Expected Features and limits](#_expected_features_and_limits)
[5. Issues](#_issues)

[5.1. Should this be one extension or 3 extensions?](#_should_this_be_one_extension_or_3_extensions)
[5.2. How does this interact with descriptor indexing ?](#_how_does_this_interact_with_descriptor_indexing)
[5.3. How does this extension interact with EXT_robustness2 ?](#_how_does_this_extension_interact_with_ext_robustness2)
[5.4. How does this interact with push descriptors ?](#_how_does_this_interact_with_push_descriptors)

This document proposes a new extension that adds shader built-in functions and
descriptor types for image processing.

GPUs commonly process images for a wide range of use cases.  These include enhancement
of externally sourced images (i.e., camera image enhancement),  post processing of GPU-rendered
game content, image scaling, and image analysis (i.e., motion vector generation).  For common use cases,
the existing texture built-ins combined with bilinear/bicubic filtering work well.  In other cases,
higher-order filtering kernels or advanced image algorithms are required.

While such algorithms could be implemented in shader code generically using existing texture
built-in functions, it requires many round-trips between the texture unit and shader unit.
The latest Adreno GPUs have dedicated HW shader instructions for such image processing tasks,
enabling advanced functionality with simplified shader code.   For some use cases, significant
performance and power savings are possible using dedicated texture sampling instructions.

Adreno GPUs have native support for multiple image processing instructions:

* 
High-order (up to 64x64 kernel) filters with application-supplied weights, and sub-texel phasing support

* 
High-order (up to 64x64) box filtering with HW-computed weights, and fractional box sizes

* 
Block Matching (up to 64x64) pixel regions across images

These capabilities are currently not exposed in Vulkan.  Exposing these instructions would
provide a significant increase in functionality beyond current SPIR-V texture built-ins.
Adreno GPUs exposing this extension perform the above algorithms fully inside the texture
unit, saving shader instructions cycles, memory bandwidth, and shader register space.

The extension exposes support for 3 new SPIR-V instructions:

* 
`OpImageWeightedSampleQCOM`: This instruction performs a weighted texture sampling
operation involving two images: the *sampled image* and the *weight image*.  An MxN region of texels in the
*sampled image* are convolved with an MxN set of scalar weights provided in the *weight image*.  Large filter
sizes up to 64x64 taps enable important use cases like edge-detection, feature extraction,
and anti-aliasing.

`Sub-pixel Weighting`:  Frequently the texture coordinates will not align with a texel center in the *sampled image*, and in such cases the kernel weights can be adjusted to reflect the sub-texel sample location.  Sub-texel weighting is supported, where the texel is subdivided into PxP sub-texels, called "phases", with unique weights per-phase.  Adreno GPUs support up to 32x32 phases.

* 
`Separable-filters`: Many common 2D image filtering kernels can be expressed as a mathematically equivalent 1D separable kernel.  Separable filters offer significant performance/power savings over their non-separable equivalent.  This instruction supports both separable and non-separable filtering kernels.

`OpImageBoxFilterQCOM`: This instruction performs weighted average of the texels within a screen-aligned box.  The operation is similar to bi-linear filtering, except the region of texels is not limited to 2x2. The instruction includes a `BoxSize` parameter, with fractional box sizes up to [64.0, 64.0].  Similar to bi-linear filtering, the implementation computes a weighted average for all texels covered by the box, with the weight for each texel proportional covered area. Large box sizes up to 64x64 enable important use cases like bulk mipmap generation and high quality single-pass image down-scaling with arbitrary scaling ratios (e.g. thumbnail generation).

`opImageBlockMatchSAD` and `opImageBlockMatchSSD`: These instructions perform a block matching operation involving two images: the *target image* and *reference image*.   The instruction takes two sets of integer texture coordinates, and an integer `BlockSize` parameter.  An MxN region of texels in the *target image* is compared with an MxN region in the *reference image*.  The instruction returns a per-component error metric describing the difference between the two regions.  The SAD returns the sum of the absolute errors and SSD returns the sum of the squared differences.

Each of the image processing instructions operate only on 2D images.  The instructions
do not-support sampling of mipmap, multi-plane, multi-layer, multi-sampled, or depth/stencil
images.  The new instructions can be used in any shader stage.

Exposing this functionality in Vulkan makes use of a corresponding SPIR-V extension, and the built-ins
will be exposed in high-level languages (e.g., GLSL) via related extensions.

| **OpImageSampleWeightedQCOM**
| --- | --- | --- | --- | --- | --- | --- |

Weighted sample operation

*Result Type* is the type of the result of weighted sample operation

*Texture Sampled Image* must be an object whose type is OpTypeSampledImage. The MS operand of the
underlying OpTypeImage must be 0.

*Coordinate* must be a vector of floating-point type, whose vector size is 2.

*Weight Image* must be an object whose type is OpTypeSampledImage. If the object is an interface object,
it must be decorated with WeightTextureQCOM. Otherwise, a texture object which is used to construct the object
must be decorated with WeightTextureQCOM.  The MS operand of the
underlying OpTypeImage must be 0. | Capability:

**TextureSampleWeightedQCOM** |
| 6 | 4480 | *Result Type* | Result | *Texture Sampled Image* | *Coordinate* | *Weight Image* |

| **OpImageBoxFilterQCOM**
| --- | --- | --- | --- | --- | --- | --- |

Image box filter operation.

*Result Type* is the type of the result of image box filter operation

*Texture Sampled Image* must be an object whose type is OpTypeSampledImage. The MS operand of the
underlying OpTypeImage must be 0.

*Coordinate* must be a vector of floating-point type, whose vector size is 2.

*Box Size* must be a vector of floating-point type, whose vector size is 2 and signedness is 0. | Capability:

**TextureBoxFilterQCOM** |
| 6 | 4481 | *Result Type* | Result | *Texture Sampled Image* | *Coordinate* | *Box Size* |

| **OpImageBlockMatchSADQCOM**
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Image block match operation with sum of absolute differences.

*Result Type* is the type of the result of image block match sum of absolute differences

*Target Sampled Image* must be an object whose type is OpTypeSampledImage.
If the object is an interface object, it must be decorated with BlockMatchTextureQCOM.
Otherwise, a texture object which is used to construct the object must be decorated with BlockMatchTextureQCOM.
The MS operand of the underlying OpTypeImage must be 0.

*Target Coordinate* must be a vector of integer type, whose vector size is 2 and signedness is 0.

*Reference Sampled Image* must be an object whose type is OpTypeSampledImage.
If the object is an interface object, it must be decorated with BlockMatchTextureQCOM.
Otherwise, a texture object which is used to construct the object must be decorated with BlockMatchTextureQCOM.
The MS operand of the underlying OpTypeImage must be 0.

*Reference Coordinate* must be a vector of integer type, whose vector size is 2 and signedness is 0.

*Block Size* must be a vector of integer type, whose vector size is 2 and signedness is 0. | Capability:

**TextureBlockMatchQCOM** |
| 8 | 4483 | *Result Type* | Result | *Target Sampled Image* | *Target Coordinate* | *Reference Sampled Image* | *Reference Coordinate* | *Block Size* |

| **OpImageBlockMatchSSDQCOM**
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Image block match operation with sum of square differences.

*Result Type* is the type of the result of image block match sum of square differences

*Target Sampled Image* must be an object whose type is OpTypeSampledImage.
If the object is an interface object, it must be decorated with BlockMatchTextureQCOM.
Otherwise, a texture object which is used to construct the object must be decorated with BlockMatchTextureQCOM.
The MS operand of the underlying OpTypeImage must be 0.

*Target Coordinate* must be a vector of integer type, whose vector size is 2 and signedness is 0.

*Reference Sampled Image* must be an object whose type is OpTypeSampledImage.
If the object is an interface object, it must be decorated with BlockMatchTextureQCOM.
Otherwise, a texture object which is used to construct the object must be decorated with BlockMatchTextureQCOM.
The MS operand of the underlying OpTypeImage must be 0.

*Reference Coordinate* must be a vector of integer type, whose vector size is 2 and signedness is 0.

*Block Size* must be a vector of integer type, whose vector size is 2 and signedness is 0. | Capability:

**TextureBlockMatchQCOM** |
| 8 | 4482 | *Result Type* | Result | *Target Sampled Image* | *Target Coordinate* | *Reference Sampled Image* | *Reference Coordinate* | *Block Size* |

The extension adds two new SPIR-V decorations

| Decoration | Extra Operands | Enabling Capabilities |
| --- | --- | --- |
| 4487 | **WeightTextureQCOM**

Apply to a texture used as 'Weight Image' in OpImageSampleWeightedQCOM.  Behavior is defined by the runtime environment. |  | **TextureSampleWeightedQCOM** |
| 4488 | **BlockMatchTextureQCOM**

Apply to textures used as 'Target Sampled Image' and 'Reference Sampled Image' in OpImageBlockMatchSSDQCOM/OpImageBlockMatchSADQCOM.

Behavior is defined by the runtime environment. |  | **TextureBlockMatchQCOM** |

This functionality is gated behind 3 SPIR-V capabilities:

| Capability | Implicitly declares |
| --- | --- |
| 4484 | **TextureSampleWeightedQCOM**

Add weighted sample operation. |  |
| 4485 | **TextureBoxFilterQCOM**

Add box filter operation. |  |
| 4486 | **TextureBlockMatchQCOM**

Add block matching operation (sum of absolute/square differences). |  |

The following summarizes how the built-ins are exposed in GLSL:

    +------------------------------------+--------------------------------------------+
    | Syntax                             | Description                                |
    +------------------------------------+--------------------------------------------+
    |   vec4 textureWeightedQCOM(        | weighted sample operation multiplies       |
    |       sampler2D tex,               | a 2D kernel of filter weights with a       |
    |       vec2      P,                 | corresponding region of sampled texels and |
    |       sampler2DArray weight)       | sums the results to produce the output     |
    |                                    | value.                                     |
    +------------------------------------+--------------------------------------------+
    |   vec4 textureBoxFilterQCOM(       | Linear operation taking average of pixels  |
    |       sampler2D tex,               | within the spatial region described by     |
    |       vec2      P,                 | boxSize.  The box is centered at coordinate|
    |       vec2      boxSize)           | P and has width and height of boxSize.x    |
    |                                    | and boxSize.y.                             |
    +------------------------------------+--------------------------------------------+
    |   vec4 textureBlockMatchSADQCOM(   | Block matching operation measures the      |
    |       sampler2D target             | correlation (or similarity) of the target  |
    |       uvec2     targetCoord,       | block and reference block.  TargetCoord    |
    |       sampler2D reference,         | and refCoord specify the bottom-left corner|
    |       uvec2     refCoord,          | of the block in target and reference       |
    |       uvec2     blockSize)         | images. The error metric is the Sum of     |
    |                                    | Absolute Differences (SAD).                |
    +------------------------------------+--------------------------------------------+
    |   vec4 textureBlockMatchSSDQCOM(   | Block matching operation measures the      |
    |       sampler2D target             | correlation (or similarity) of the target  |
    |       uvec2     targetCoord,       | block and reference block.  TargetCoord    |
    |       sampler2D reference,         | and refCoord specify the bottom-left corner|
    |       uvec2     refCoord,          | of the block in target and reference       |
    |       uvec2     blockSize)         | images. The error metric is the Sum of     |
    |                                    | Square Differences (SSD).                  |
    +------------------------------------+--------------------------------------------+

Support for weighted sampling, box filtering, and block matching operations are
indicated by feature bits in a structure that extends
[VkPhysicalDeviceFeatures2](https://docs.vulkan.org/spec/latest/chapters/features.html#VkPhysicalDeviceFeatures2).

typedef struct VkPhysicalDeviceImageProcessingFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureSampleWeighted;
    VkBool32           textureBoxFilter;
    VkBool32           textureBlockMatch;
} VkPhysicalDeviceImageProcessingFeaturesQCOM;

`textureSampleWeighted` indicates that the implementation supports SPIR-V modules
declaring the `TextureSampleWeightedQCOM` capability.
`textureBoxFilter` indicates that the implementation supports SPIR-V modules
declaring the `TextureBoxFilterQCOM` capability.
`textureBlockMatch` indicates that the implementation supports SPIR-V modules
declaring the TextureBlockMatchQCOM capability.

Implementation-specific properties are exposed in a structure that extends
[VkPhysicalDeviceProperties2](https://docs.vulkan.org/spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceProperties2).

typedef struct VkPhysicalDeviceImageProcessingPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxWeightFilterPhases;
    VkExtent2D         maxWeightFilterDimension;
    VkExtent2D         maxBlockMatchRegion;
    VkExtent2D         maxBoxFilterBlockSize;
} VkPhysicalDeviceImageProcessingPropertiesQCOM;

`maxWeightFilterPhases` is the maximum number of sub-pixel phases supported for `OpImageSampleWeightedQCOM`.
`maxWeightFilterDimension` is the largest supported filter size (width and height) for `OpImageSampleWeightedQCOM`.
`maxBlockMatchRegion` is the largest supported region size (width and height) for `OpImageBlockMatchSSDQCOM` and `OpImageBlockMatchSADQCOM`.
`maxBoxFilterBlockSize` is the largest supported BoxSize (width and height) for `OpImageBoxFilterQCOM`.

VkSampler objects created for use with the built-ins added with this extension
must be created with `VK_SAMPLER_CREATE_IMAGE_PROCESSING_BIT_QCOM`.
Such samplers must not be used with the other existing `OpImage*` built-ins
unrelated to this extension.  In practice, this means an application must create
dedicated VkSamplers for use with this extension.

The `OpImageSampleWeightedQCOM` and `OpImageSampleBoxFilterQCOM` built-ins
support samplers with `unnormalizedCoordinates` equal to `VK_TRUE` or
`VK_FALSE`.
The `OpImageBlockMatchSADQCOM` and `OpImageBlockMatchSSDQCOM` require
a sampler with `unnormalizedCoordinates` equal to `VK_TRUE`.

All built-ins added with this extension support samplers with `addressModeU`
and `addressModeV` equal to
`VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE` or `VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER`.
If `VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER` is used, the `borderColor` must be
opaque black.

All built-ins added with this extension support samplers with all
[VkSamplerReductionModes](https://docs.vulkan.org/spec/latest/chapters/samplers.html#VkSamplerReductionMode).

The other
[VkSamplerCreateInfo](https://docs.vulkan.org/spec/latest/chapters/samplers.html#VkSamplerCreateInfo) parameters
must be set to a default values but generally have no effect on the built-ins.

When creating a VkImage for compatibility with the new built-ins, the driver needs
additional usage flags.  VkImages must be created with
`VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM` when used as a *weight image* with
`OpImageSampleWeightedQCOM`.  VkImages must be created with
`VK_IMAGE_USAGE_SAMPLE_BLOCK_MATCH_BIT_QCOM` when used as a
*reference image* or *target image* with `OpImageBlockMatchSADQCOM`
or `OpImageBlockMatchSSDQCOM`.

This extension adds two new descriptor Types:

VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM
VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM

`VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM` specifies a 2D image array descriptor
for a *weight image* can be used with OpImageSampleWeightedQCOM.  The corresponding
VkImageView must have been created with `VkImageViewSampleWeightCreateInfoQCOM` in the
pNext chain.

`VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM` specifies a 2D image descriptor for the
*reference image* or *target image* that can be used with `OpImageBlockMatchSADQCOM`
or `OpImageBlockMatchSSDQCOM`.

Implementations will advertise format support for this extension
through the `linearTilingFeatures` or `optimalTilingFeatures` of
[VkFormatProperties3](https://docs.vulkan.org/spec/latest/chapters/formats.html#VkFormatProperties3)

VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM
VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM
VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM
VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM

The SPIR-V `OpImageSampleWeightedQCOM` instruction takes two image parameters: the *weight image* which holds weight values, and the *sampled image* which holds the texels being sampled.

* 
`VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM` specifies that the format is supported as a *weight image* with `OpImageSampleWeightedQCOM`.

* 
`VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM` specifies that the format is supported as a *sampled image* with `OpImageSampleWeightedQCOM`.

The SPIR-V `OpImageBlockMatchSADQCOM` and `OpImageBlockMatchSADQCOM`  instructions take two image parameters: the *target image* and the *reference image*.

* 
`VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM` specifies that the format is supported as a *target image* or *reference image* with both `OpImageBlockMatchSADQCOM` and `OpImageBlockMatchSADQCOM`.

The SPIR-V `OpImageBoxFilterQCOM`  instruction takes one image parameter, the *sampled image*.

* 
`VK_FORMAT_FEATURE_2_BOX_FILTER_SAMPLED_BIT_QCOM` specifies that the format is supported as *sampled image* with `OpImageBoxFilterQCOM`.

The SPIR-V `OpImageSampleWeightedQCOM` instruction takes 3 operands: *sampled image*,
*weight image*, and texture coordinates.  The instruction computes a weighted average
of an MxN region of texels in the *sampled image*, using a set of MxN weights in the
*weight image*.

To create a VkImageView for the *weight image*, the
[VkImageViewCreateInfo](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImageViewCreateInfo) structure
is extended to provide weight filter parameters.

typedef struct VkImageViewSampleWeightCreateInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    VkOffset2D         filterCenter;
    VkExtent2D         filterSize;
    uint32_t           numPhases;
} VkImageViewSampleWeightCreateInfoQCOM;

The texture coordinates provided to `OpImageSampleWeightedQCOM`,
combined with the `filterCenter` and `filterSize` selects a
region of texels in the *sampled texture*:

// let (u,v) be 2D unnormalized coordinates passed to `OpImageSampleWeightedQCOM`.
// The lower-left-texel of the region has integer texel coordinates (i0,j0):
i0 =  floor(u) - filterCenter.x
j0 =  floor(v) - filterCenter.y

// the upper-right texel of the region has integer coordinates (imax,jmax)
imax = i0 + filterSize.width - 1
jmax = j0 + filterSize.height - 1

If the sampler `reductionMode` is `VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE` then the
value of each texel in the region is multiplied by the associated value from the *weight
texure*, and the resulting weighted average is summed for each component across all texels
in the region.  Note that since the weight values are application-defined,
their sum may be greater than 1.0 or less than 0.0, therefore the
filter output for UNORM format may be greater than 1.0 or less than 0.0.

If the sampler `reductionMode` is VK_SAMPLER_REDUCTION_MODE_MIN or VK_SAMPLER_REDUCTION_MODE_MAX,
a component-wise minimum or maximum is computed, for all texels in the region with non-zero
weights.

The *weight image* can optionally provide sub-texel weights.  This feature
is enabled by setting `numPhases` to a value greater than
1.  In this case, *weight image* specifies `numPhases` unique sets of
`filterSize`.`width` x `filterSize`.`height` weights for each phase.

The texels in the *sampled image* are is subdivided
both horizontally and vertically in to an NxN grid of sub-texel regions,
or "phases".
The number of horizontal and vertical subdivisions must be equal,
must be a power-of-two.  `numPhases` is the product
of the horizontal and vertical phase counts.

For example, `numPhases` equal to 4 means that texel is divided into
two vertical phases and two horizontal phases, and that the weight texture
defines 4 sets of weights, each with a width and height as specified by
`filterSize`.  The texture coordinate sub-texel location will determine
which set of weights is used.
The maximum supported values for `numPhases` and `filterSize` is specified by
`VkPhysicalDeviceImageProcessingPropertiesQCOM` `maxWeightFilterPhases` and
`maxWeightFilterDimension` respectively.

The `OpImageSampleWeightedQCOM` *weight image* created with
`VkImageViewSampleWeightCreateInfoQCOM` must have a `viewType` of
either `VK_IMAGE_VIEW_TYPE_1D_ARRAY` which indicates separable
weight encoding, or `VK_IMAGE_VIEW_TYPE_2D_ARRAY` which indicates
non-separable weight encoding as described below.

The view type (1D array or 2D array) is the sole indication whether
the weights are separable or non-separable — there is no other API state nor any
shader change to designate separable versus non-separable weight image.

For a non-separable weight filtering, the view will be type
VK_IMAGE_VIEW_TYPE_2D_ARRAY.  Each layer of the 2D array
corresponds to one phase of the filter.  The view’s
`VkImageSubresourceRange::layerCount` must be equal to
`VkImageViewSampleWeightCreateInfoQCOM::numPhases`. The phases
are stored as layers in the 2D array, in horizontal phase major
order,  left-to-right and top-to-bottom. Expressed as a formula,
the layer index for each filter phase is computed as:

layerIndex(horizPhase,vertPhase,horizPhaseCount) = (vertPhase * horizPhaseCount) + horizPhase

For each layer, the weights are specified by the value in texels [0, 0] to
[`filterSize.width`-1, `filterSize.height`-1].
While is valid for the view’s VkImage to have width/height larger than `filterSize`,
image texels with integer coordinates greater than or equal to `filterSize`
are ignored by weight sampling.  Image property query instructions `OpImageQuerySize`,
`OpImageQuerySizeLod`, `OpImageQueryLevels`, and `OpImageQuerySamples` return undefined
values for a weight image descriptor.

For a separable weight filtering, the view will be type VK_IMAGE_VIEW_TYPE_1D_ARRAY.
Horizontal weights for all phases are packed in layer '0' and the vertical weights for
all phases are packed in layer '1'.  Within each layer, the weights are arranged into
groups of 4.  For each group, the weights are ordered by phase. Expressed as a
formula, the 1D texel offset for all weights and phases within each layer is computed as:

// Let horizontal weights have a weightIndex of [0, filterSize.width - 1]
// Let vertical weights have a weightIndex of [0, filterSize.height - 1]
// Let phaseCount be the number of phases in either the vertical or horizontal direction.

texelOffset(phaseIndex,weightIndex,phaseCount) = (phaseCount * 4 * (weightIndex / 4)) + (phaseIndex * 4) + (weightIndex % 4)

The SPIR-V `OpImageBoxFilterQCOM` instruction takes 3 operands: *sampled image*,
*box size*, and texture coordinates.  Note that *box size* specifies a floating-point
width and height in texels.  The instruction computes a weighted average of all texels
in the *sampled image* that are covered (either partially or fully) by a box with
the specified size and centered at the specified texture coordinates.

For each texel covered by the box, a weight value is computed by the implementation.
The weight is proportional to the area of the texel covered.  Those texels that are
fully covered by the box receive a weight of 1.0.  Those texels that are partially
covered by the box receive a weight proportional to the covered area.  For example,
a texel that has one quarter of its area covered by the box will receive a
weight of 0.25.

If the sampler `reductionMode` is `VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE` then the
value of each covered texel is multiplied by the weight, and the resulting weighted
average is summed for each component across all covered texels.  The resulting sum
is then divided by the *box size* area.

If the sampler `reductionMode` is VK_SAMPLER_REDUCTION_MODE_MIN or VK_SAMPLER_REDUCTION_MODE_MAX,
a component-wise minimum or maximum is computed, for all texels covered by the box,
including texels that are partially covered.

The SPIR-V `OpImageBlockMatchSADQCOM` and `OpImageBlockMatchSSDQCOM` instructions
each takes 5 operands: *target image*, *target coordinates*, *reference image*,
*reference coordinates*, and *block size*.  Each instruction computes an error
metric, that describes whether a block of texels in the *target image* matches
a corresponding block of texels in the *reference image*.  The error metric
is computed per-component.  `OpImageBlockMatchSADQCOM` computes "Sum Of Absolute
Difference" and `OpImageBlockMatchSSDQCOM` computes "Sum of Squared Difference",
but otherwise both instructions are similar.

Both *target coordinates* and *reference coordinates* are integer texel coordinates
of the lower-left texel of the block to be matched in the *target image* and
*reference image* respectively.
The *block size* provides the height and width in integer texels of the regions to
be matched and must be greater than 0 or *result* will contain an *undefined value*.

Note that the coordinates and *block size* may result in a region that extends
beyond the bounds of *target image* or *reference image*.  For *target image*,
this is valid and the  sampler `addressModeU` and `addressModeV` will determine
the value of such texels.   For *reference image* case this will result in undefined
values returned.  The application must guarantee that the *reference region
does not extend beyond the bounds of _reference image*.

For each texel in the regions, a difference value is computed by subtracting the
target value from the reference value.  `OpImageBlockMatchSADQCOM` computes the
absolute value of the difference; this is the *texel error*.  `OpImageBlockMatchSSDQCOM`
computes the square of the difference; this is the *texel error squared*.

If the sampler `reductionMode` is `VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE` then the
*texel error* or texel_error_squared for each texel in the region is summed for each
component across all texels.

If the sampler `reductionMode` is VK_SAMPLER_REDUCTION_MODE_MIN or VK_SAMPLER_REDUCTION_MODE_MAX,
a component-wise minimum or maximum is computed, for all texels in the region.
`OpImageBlockMatchSADQCOM` returns the minimum or maximum *texel error* across
all texels.    `OpImageBlockMatchSSDQCOM` returns the minimum or maximum *texel error*
squared.   Note that `OpImageBlockMatchSSDQCOM` does not return the minimum or maximum
of *texel error squared*.

Below are the properties, features, and formats that are expected to be advertised by a Adreno drivers supporting this extension:

Features supported in VkPhysicalDeviceImageProcessingFeaturesQCOM:

    textureSampleWeighted   = TRUE
    textureBoxFilter        = TRUE
    textureBlockMatch       = TRUE

Properties reported in VkPhysicalDeviceImageProcessingPropertiesQCOM

    maxWeightFilterPhases       = 1024
    maxWeightFilterDimension    = 64
    maxBlockMatchRegion         = 64
    maxBoxFilterBlockSize       = 64

Formats supported by *sampled image* parameter to `OpImageSampleWeightedQCOM` and `OpImageBoxFilterQCOM`

    VK_FORMAT_R8_UNORM
    VK_FORMAT_R8_SNORM
    VK_FORMAT_R8G8_UNORM
    VK_FORMAT_R8G8B8A8_UNORM
    VK_FORMAT_R8G8B8A8_SNORM
    VK_FORMAT_A8B8G8R8_UNORM_PACK32
    VK_FORMAT_A8B8G8R8_SNORM_PACK32
    VK_FORMAT_A2B10G10R10_UNORM_PACK32
    VK_FORMAT_R16_SFLOAT
    VK_FORMAT_R16G16_SFLOAT
    VK_FORMAT_R16G16B16A16_SFLOAT
    VK_FORMAT_B10G11R11_UFLOAT_PACK32
    VK_FORMAT_E5B9G9R9_UFLOAT_PACK32
    VK_FORMAT_BC1_RGB_UNORM_BLOCK
    VK_FORMAT_BC1_RGB_SRGB_BLOCK
    VK_FORMAT_BC1_RGBA_UNORM_BLOCK
    VK_FORMAT_BC1_RGBA_SRGB_BLOCK
    VK_FORMAT_BC2_SRGB_BLOCK
    VK_FORMAT_BC3_UNORM_BLOCK
    VK_FORMAT_BC3_SRGB_BLOCK
    VK_FORMAT_BC4_UNORM_BLOCK
    VK_FORMAT_BC4_SNORM_BLOCK
    VK_FORMAT_BC5_UNORM_BLOCK
    VK_FORMAT_BC5_SNORM_BLOCK
    VK_FORMAT_BC6H_UFLOAT_BLOCK
    VK_FORMAT_BC6H_SFLOAT_BLOCK
    VK_FORMAT_BC7_UNORM_BLOCK
    VK_FORMAT_BC7_SRGB_BLOCK
    VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK
    VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK
    VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK
    VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK
    VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK
    VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK
    VK_FORMAT_EAC_R11_UNORM_BLOCK
    VK_FORMAT_EAC_R11_SNORM_BLOCK
    VK_FORMAT_EAC_R11G11_UNORM_BLOCK
    VK_FORMAT_EAC_R11G11_SNORM_BLOCK
    VK_FORMAT_ASTC_4x4_UNORM_BLOCK
    VK_FORMAT_ASTC_4x4_SRGB_BLOCK
    VK_FORMAT_ASTC_5x4_UNORM_BLOCK
    VK_FORMAT_ASTC_5x4_SRGB_BLOCK
    VK_FORMAT_ASTC_5x5_UNORM_BLOCK
    VK_FORMAT_ASTC_5x5_SRGB_BLOCK
    VK_FORMAT_ASTC_6x5_UNORM_BLOCK
    VK_FORMAT_ASTC_6x5_SRGB_BLOCK
    VK_FORMAT_ASTC_6x6_UNORM_BLOCK
    VK_FORMAT_ASTC_6x6_SRGB_BLOCK
    VK_FORMAT_ASTC_8x5_UNORM_BLOCK
    VK_FORMAT_ASTC_8x5_SRGB_BLOCK
    VK_FORMAT_ASTC_8x6_SRGB_BLOCK
    VK_FORMAT_ASTC_8x8_UNORM_BLOCK
    VK_FORMAT_ASTC_8x8_SRGB_BLOCK
    VK_FORMAT_ASTC_10x5_UNORM_BLOCK
    VK_FORMAT_ASTC_10x5_SRGB_BLOCK
    VK_FORMAT_ASTC_10x6_UNORM_BLOCK
    VK_FORMAT_ASTC_10x6_SRGB_BLOCK
    VK_FORMAT_ASTC_10x8_UNORM_BLOCK
    VK_FORMAT_ASTC_10x8_SRGB_BLOCK
    VK_FORMAT_ASTC_10x10_UNORM_BLOCK
    VK_FORMAT_ASTC_10x10_SRGB_BLOCK
    VK_FORMAT_ASTC_12x10_UNORM_BLOCK
    VK_FORMAT_ASTC_12x10_SRGB_BLOCK
    VK_FORMAT_ASTC_12x12_UNORM_BLOCK
    VK_FORMAT_ASTC_12x12_SRGB_BLOCK
    VK_FORMAT_G8B8G8R8_422_UNORM
    VK_FORMAT_B8G8R8G8_422_UNORM
    VK_FORMAT_A4B4G4R4_UNORM_PACK16
    VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK
    VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK
    VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK
    VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK
    VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK
    VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK
    VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK
    VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK
    VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK
    VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK
    VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK
    VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK
    VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK
    VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK

Formats supported by *weight image* parameter to `OpImageSampleWeightedQCOM`

    VK_FORMAT_R8_UNORM
    VK_FORMAT_R16_SFLOAT

Formats supported by *target image* or *reference image* parameter to `OpImageBlockMatchSADQCOM` and `OpImageBlockMatchSSDQCOM`

    VK_FORMAT_R8_UNORM
    VK_FORMAT_R8G8_UNORM
    VK_FORMAT_R8G8B8_UNORM
    VK_FORMAT_R8G8B8A8_UNORM
    VK_FORMAT_A8B8G8R8_UNORM_PACK32
    VK_FORMAT_A2B10G10R10_UNORM_PACK32
    VK_FORMAT_G8B8G8R8_422_UNORM
    VK_FORMAT_B8G8R8G8_422_UNORM

For simplicity, and since we expect this extension supported only for Adreno GPUs, we propose one extension with 3 feature bits.  The associated SPIR-V extension will have 3 capabilities.  The associated GLSL extension will have 3 extension strings.

The new built-ins added by this extension support descriptor arrays and
dynamic indexing, but only if the index is dynamically uniform.  The "update-after-bind"
functionality is fully supported.  Non-uniform dynamic indexing is not supported.  There are no
feature bits for an implementation to advertise support for dynamic indexing with the
shader built-ins added in this extension.

The new descriptor types for sample weight image and block match image count against
the maxPerStageDescriptor[UpdateAfterBind]SampledImages and
maxDescriptorSetUpdate[AfterBind]SampledImages limits.
bind"

These instructions do not support nullDescriptor feature of robustness2.  If any descriptor accessed by these
instructions is not bound, undefined results will occur.

The descriptors added by this extension can be updated using vkCmdPushDescriptors
