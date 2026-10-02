# VK_QCOM_image_processing3

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_QCOM_image_processing3.html

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
- [3.3. VkImage compatibility](#_vkimage_compatibility)
- [3.3._VkImage_compatibility](#_vkimage_compatibility)
- [3.4. VkFormat support](#_vkformat_support)
- [3.4._VkFormat_support](#_vkformat_support)
- [3.5. Features](#_features)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V Built-in Functions](#_spir_v_built_in_functions)
[3.2. High Level Language Exposure](#_high_level_language_exposure)
[3.3. VkImage compatibility](#_vkimage_compatibility)
[3.4. VkFormat support](#_vkformat_support)
[3.5. Features](#_features)

This document proposes a new extension that adds shader built-in functions
for additional image processing operations.

Popular image processing applications such as super resolution upscaling and
contrast-adaptive sharpening often rely on texture gather operations,
typically involving 12-tap and 5-tap gather operations respectively.

There are also usages for a linear 4-tap gather operation, such as kernels
that require vectorized loads, and improving cache locality for linear access.

The latest Adreno™ GPUs feature dedicated HW shader instructions optimized
for these specific gather patterns, enabling significant performance and power
efficiency improvements compared to existing implementations.

Additionally, the [VK_QCOM_image_processing2](../../../../refpages/latest/refpages/source/VK_QCOM_image_processing2.html)
extension added extended block matching operations
`OpImageBlockMatchWindow*QCOM` and `OpImageBlockMatchGather*QCOM`
without adding a new format feature flag. This limits exposing formats for block matching
operations to the common set with those provided by
[VK_QCOM_image_processing](../../../../refpages/latest/refpages/source/VK_QCOM_image_processing.html).

Existing texture gather operations such as:

* 
SPIR-V: `OpImageGather` with `ConstOffsets` image operand

* 
GLSL: `textureGatherOffsets`

already support arbitrary offset patterns via constant arrays. However, these mechanisms do not
guarantee alignment with hardware-accelerated gather patterns, which can lead to suboptimal performance.
While implementations could enumerate supported offset patterns and allow applications to match
them dynamically, this approach introduces complexity:

* 
Applications must restructure shaders to match enumerated patterns.

* 
Algorithms tightly coupled to specific gather patterns may require multiple shader variants.

* 
Runtime pattern matching adds overhead and reduces clarity.

Further, we have restrictions specific to these patterns, such as no support for cube map sampling,
which applications may inadvertently trigger emulated paths and degrade performance. Ideally,
any such restrictions would be made invalid usage to achieve more consistent performance.

Instead, we propose introducing new SPIR-V instructions that directly encode specific,
hardware-accelerated gather patterns.

With regards to format feature flags, a new format feature flag for `OpImageBlockMatchWindow*QCOM`
and `OpImageBlockMatchGather*QCOM` would break backwards compatibility for apps that implement
`VK_QCOM_image_processing2` when new formats are exposed with
`VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM`. Therefore, a new super-set format feature flag
will need to be introduced for `OpImageBlockMatchSSDQCOM` and `OpImageBlockMatchSADQCOM` instead,
despite the fact that `VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM` was originally introduced
specifically for them.

The extension exposes support for a new SPIR-V instruction.

| **OpImageGatherQCOM**
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Gathers the requested component values from the four texels
which are specified with the *Mode* operand.
*Result Type* must be a vector of four components of *floating-point type* or
*integer type*. Its components must be the same as *Sampled Type* of the underlying **OpTypeImage**
(unless that underlying *Sampled Type* is **OpTypeVoid**). It has one component per gathered texel.
*Sampled Image* must be an object whose type is **OpTypeSampledImage**. Its **OpTypeImage** must
have a *Dim* of **2D** or **Rect**.  The *MS* operand of the underlying **OpTypeImage** must be 0.
*Coordinate* must be a vector of *floating-point type*. It contains (*u*, *v* [, *array layer*])
as needed by the definition of *Sampled Image*.
*Component* is the component number gathered from all four texels. It must be a 32-bit *integer type*
scalar. Behavior is undefined if its value is not 0, 1, 2 or 3.
*Mode* specifies four texels from which the component values are gathered. It must be a 32-bit *integer type*
scalar constant. Behavior is undefined if its value is not 0, 1, 2 or 3.
Image Operands encodes what operands follow, as per Image Operands. | [Capability](#Capability):

**ImageGatherLinearQCOM**, **ImageGatherExtendedModesQCOM** |
| 7 + variable | 4545 | ** *Result Type* | *[' Result' ](#ResultId)* | ** *Sampled Image* | ** *Coordinate* | ** *Component* | ** *Mode* | Optional *[Image Operands](#Image_Operands)* | Optional **, **, …​ |

This functionality includes the following SPIR-V capability:

| Capability | Implicitly declares |
| --- | --- |
| 4543 | **ImageGatherLinearQCOM**

Add the extended Image Gather instruction along with the Gather4x1QCOM mode |  |
| 4544 | **ImageGatherExtendedModesQCOM**

Add the extended Image Gather instruction along with the GatherDQCOM, GatherH2QCOM, and GatherV2QCOM modes |  |

The following summarizes how the built-ins are exposed in GLSL:

    -------------------------------------------------------------------------------------------------
    | gvec4 textureGather4x1QCOM(gsampler2D sampler,    |                                           |
    |   vec2 P [, int comp])                            | If specified, the value of comp must      |
    | gvec4 textureGather4x1QCOM(gsampler2DArray        | be a constant integer expression with     |
    |   sampler, vec3 P [, int comp])                   | a value of 0, 1, 2, or 3, identifying     |
    ----------------------------------------------------| the x, y, z, or w post-swizzled           |
    | gvec4 textureGatherV2QCOM(gsampler2D sampler,     | component of the four-component vector    |
    |   vec2 P [, int comp])                            | lookup result for each texel,             |
    | gvec4 textureGatherV2QCOM(gsampler2DArray         | respectively. If comp is not specified,   |
    |   sampler, vec3 P [, int comp])                   | it is treated as 0, selecting the x       |
    ----------------------------------------------------| component of each texel to generate the   |
    | gvec4 textureGatherH2QCOM(gsampler2D sampler,     | result.                                   |
    |   vec2 P [, int comp])                            |                                           |
    | gvec4 textureGatherH2QCOM(gsampler2DArray         |                                           |
    |   sampler, vec3 P [, int comp])                   |                                           |
    ----------------------------------------------------|                                           |
    | gvec4 textureGatherDQCOM(gsampler2D sampler,      |                                           |
    |   vec2 P [, int comp])                            |                                           |
    | gvec4 textureGatherDQCOM(gsampler2DArray sampler, |                                           |
    |   vec3 P [, int comp])                            |                                           |
    -------------------------------------------------------------------------------------------------
    | gvec4 textureGather4x1OffsetQCOM(gsampler2D       |                                           |
    |   sampler, vec2 P, ivec2 offset [, int comp])     | Perform a texture gather operation as in  |
    | gvec4 textureGather4x1OffsetQCOM(gsampler2DArray  | textureGather*QCOM by offset as described |
    |   sampler, vec3 P, ivec2 offset [, int comp])     | in textureOffset except that the offset   |
    ----------------------------------------------------| can be variable (non constant) and the    |
    | gvec4 textureGatherV2OffsetQCOM(gsampler2D        | implementation-dependent minimum and      |
    |   sampler, vec2 P, ivec2 offset [, int comp])     | maximum offset values are given by        |
    | gvec4 textureGatherV2OffsetQCOM(gsampler2DArray   | MIN_PROGRAM_TEXTURE_GATHER_OFFSET and     |
    |   sampler, vec3 P, ivec2 offset [, int comp])     | MAX_PROGRAM_TEXTURE_GATHER_OFFSET,        |
    ----------------------------------------------------| respectively.                             |
    | gvec4 textureGatherH2OffsetQCOM(gsampler2D        |                                           |
    |   sampler, vec2 P, ivec2 offset [, int comp])     |                                           |
    | gvec4 textureGatherH2OffsetQCOM(gsampler2DArray   |                                           |
    |   sampler, vec3 P, ivec2 offset [, int comp])     |                                           |
    ----------------------------------------------------|                                           |
    | gvec4 textureGatherDOffsetQCOM(gsampler2D         |                                           |
    |   sampler, vec2 P, ivec2 offset [, int comp])     |                                           |
    | gvec4 textureGatherDOffsetQCOM(gsampler2DArray    |                                           |
    |   sampler, vec3 P, ivec2 offset [, int comp])     |                                           |
    -------------------------------------------------------------------------------------------------

In general, the compatibility rules for images supporting the SPIR-V `OpImageGatherQCOM`
are the same as the rules for `OpImageGather`, with the exception that the following
are not supported:

* 
Cube Map views

* 
`ConstOffsets` operand

* 
Shadow depth comparison, eg. `OpImageDrefGather`

* 
Sparse residency check, eg. `OpImageSparseGather`

This extension adds the following feature flag:

static const VkFormatFeatureFlagBits2 VK_FORMAT_FEATURE_2_BLOCK_MATCHING_SXD_BIT_QCOM = 0x100000000000ULL;

* 
VK_FORMAT_FEATURE_2_BLOCK_MATCHING_SXD_BIT_QCOM - Formats with this feature are supported
with `OpImageBlockMatchSSDQCOM` and `OpImageBlockMatchSADQCOM`. Every format that has the
`VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM` feature flag must have this feature flag set
by the implementation.

Applications should use `VK_FORMAT_FEATURE_2_BLOCK_MATCHING_SXD_BIT_QCOM` where
available when they wish to query the full format support for
`OpImageBlockMatchSSDQCOM` and `OpImageBlockMatchSADQCOM` operations.

The formats exposed with `VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM` are
still compatible with `OpImageBlockMatchSSDQCOM` and
`OpImageBlockMatchSADQCOM` operations, but the set is limited to the
formats also compatible with `OpImageBlockMatchWindow*QCOM` and
`OpImageBlockMatchGather*QCOM`.

Support is indicated by the feature in a structure that extends
[VkPhysicalDeviceFeatures2](../../../../refpages/latest/refpages/source/VkPhysicalDeviceFeatures2.html)..

typedef struct VkPhysicalDeviceImageProcessing3FeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageGatherLinear;
    VkBool32           imageGatherExtendedModes;
    VkBool32           blockMatchExtendedClampToEdge;
} VkPhysicalDeviceImageProcessing3FeaturesQCOM;

* 
`imageGatherLinear` indicates that the implementation supports SPIR-V modules
declaring the `ImageGatherLinearQCOM` capability.

* 
`imageGatherExtendedModes` indicates that the implementation supports SPIR-V modules
declaring the `ImageGatherExtendedModesQCOM` capability.

* 
`blockMatchExtendedClampToEdge` indicates that the implementation supports
`VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE` for both input images of all block match
operations
