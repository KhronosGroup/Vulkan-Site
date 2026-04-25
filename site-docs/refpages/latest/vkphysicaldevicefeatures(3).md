# VkPhysicalDeviceFeatures(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFeatures.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFeatures - Structure describing the fine-grained features that can be supported by an implementation

The `VkPhysicalDeviceFeatures` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPhysicalDeviceFeatures {
    VkBool32    robustBufferAccess;
    VkBool32    fullDrawIndexUint32;
    VkBool32    imageCubeArray;
    VkBool32    independentBlend;
    VkBool32    geometryShader;
    VkBool32    tessellationShader;
    VkBool32    sampleRateShading;
    VkBool32    dualSrcBlend;
    VkBool32    logicOp;
    VkBool32    multiDrawIndirect;
    VkBool32    drawIndirectFirstInstance;
    VkBool32    depthClamp;
    VkBool32    depthBiasClamp;
    VkBool32    fillModeNonSolid;
    VkBool32    depthBounds;
    VkBool32    wideLines;
    VkBool32    largePoints;
    VkBool32    alphaToOne;
    VkBool32    multiViewport;
    VkBool32    samplerAnisotropy;
    VkBool32    textureCompressionETC2;
    VkBool32    textureCompressionASTC_LDR;
    VkBool32    textureCompressionBC;
    VkBool32    occlusionQueryPrecise;
    VkBool32    pipelineStatisticsQuery;
    VkBool32    vertexPipelineStoresAndAtomics;
    VkBool32    fragmentStoresAndAtomics;
    VkBool32    shaderTessellationAndGeometryPointSize;
    VkBool32    shaderImageGatherExtended;
    VkBool32    shaderStorageImageExtendedFormats;
    VkBool32    shaderStorageImageMultisample;
    VkBool32    shaderStorageImageReadWithoutFormat;
    VkBool32    shaderStorageImageWriteWithoutFormat;
    VkBool32    shaderUniformBufferArrayDynamicIndexing;
    VkBool32    shaderSampledImageArrayDynamicIndexing;
    VkBool32    shaderStorageBufferArrayDynamicIndexing;
    VkBool32    shaderStorageImageArrayDynamicIndexing;
    VkBool32    shaderClipDistance;
    VkBool32    shaderCullDistance;
    VkBool32    shaderFloat64;
    VkBool32    shaderInt64;
    VkBool32    shaderInt16;
    VkBool32    shaderResourceResidency;
    VkBool32    shaderResourceMinLod;
    VkBool32    sparseBinding;
    VkBool32    sparseResidencyBuffer;
    VkBool32    sparseResidencyImage2D;
    VkBool32    sparseResidencyImage3D;
    VkBool32    sparseResidency2Samples;
    VkBool32    sparseResidency4Samples;
    VkBool32    sparseResidency8Samples;
    VkBool32    sparseResidency16Samples;
    VkBool32    sparseResidencyAliased;
    VkBool32    variableMultisampleRate;
    VkBool32    inheritedQueries;
} VkPhysicalDeviceFeatures;

This structure describes the following features:

* 
 `robustBufferAccess` enables
[Robust Buffer Access](../../../../spec/latest/chapters/shaders.html#shaders-robust-buffer-access) guarantees for shader buffer accesses.

* 
 `fullDrawIndexUint32` specifies the
full 32-bit range of indices is supported for indexed draw calls when
using a [VkIndexType](VkIndexType.html) of [VK_INDEX_TYPE_UINT32](VkIndexType.html).
`maxDrawIndexedIndexValue` is the maximum index value that **may** be
used (aside from the primitive restart index, which is always 232-1
when the [VkIndexType](VkIndexType.html) is [VK_INDEX_TYPE_UINT32](VkIndexType.html)).
If this feature is supported, `maxDrawIndexedIndexValue` **must** be
232-1; otherwise it **must** be no smaller than 224-1.
See [`maxDrawIndexedIndexValue`](../../../../spec/latest/chapters/limits.html#limits-maxDrawIndexedIndexValue).

* 
 `imageCubeArray` specifies whether image
views with a [VkImageViewType](VkImageViewType.html) of
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](VkImageViewType.html) **can** be created, and that the
corresponding `SampledCubeArray` and `ImageCubeArray` SPIR-V
capabilities **can** be used in shader code.

* 
 `independentBlend` specifies whether
the `VkPipelineColorBlendAttachmentState` settings are controlled
independently per-attachment.
If this feature is not enabled, the
`VkPipelineColorBlendAttachmentState` settings for all color
attachments **must** be identical.
Otherwise, a different `VkPipelineColorBlendAttachmentState` **can** be
provided for each bound color attachment.

* 
 `geometryShader` specifies whether
geometry shaders are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_GEOMETRY_BIT](VkShaderStageFlagBits.html)
and [VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits.html) enum values **must** not be
used.
This also specifies whether shader modules **can** declare the
`Geometry` capability.

* 
 `tessellationShader` specifies
whether tessellation control and evaluation shaders are supported.
If this feature is not enabled, the
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](VkShaderStageFlagBits.html),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](VkShaderStageFlagBits.html),
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits.html),
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits.html), and
[VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_STATE_CREATE_INFO](VkStructureType.html) enum
values **must** not be used.
This also specifies whether shader modules **can** declare the
`Tessellation` capability.

* 
 `sampleRateShading` specifies whether
[Sample Shading](../../../../spec/latest/chapters/primsrast.html#primsrast-sampleshading) and multisample interpolation
are supported.
If this feature is not enabled, the `sampleShadingEnable` member of
the [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure **must** be
[VK_FALSE](VK_FALSE.html) and the `minSampleShading` member is ignored.
This also specifies whether shader modules **can** declare the
`SampleRateShading` capability.

* 
 `dualSrcBlend` specifies whether blend
operations which take two sources are supported.
If this feature is not enabled, the [VK_BLEND_FACTOR_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](VkBlendFactor.html),
[VK_BLEND_FACTOR_SRC1_ALPHA](VkBlendFactor.html), and
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](VkBlendFactor.html) enum values **must** not be used
as source or destination blending factors.
See [Dual-Source Blending](../../../../spec/latest/chapters/framebuffer.html#framebuffer-dsb).

* 
 `logicOp` specifies whether logic operations
are supported.
If this feature is not enabled, the `logicOpEnable` member of the
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html) structure **must** be
[VK_FALSE](VK_FALSE.html), and the `logicOp` member is ignored.

* 
 `multiDrawIndirect` specifies whether
multiple draw indirect is supported.
If this feature is not enabled, the `drawCount` parameter to the
[vkCmdDrawIndirect](vkCmdDrawIndirect.html) and [vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html) commands
**must** be 0 or 1.
The `maxDrawIndirectCount` member of the
`VkPhysicalDeviceLimits` structure **must** also be 1 if this feature
is not supported.
See [`maxDrawIndirectCount`](../../../../spec/latest/chapters/limits.html#limits-maxDrawIndirectCount).

* 
 `drawIndirectFirstInstance`
specifies whether indirect drawing calls support the `firstInstance`
parameter.
If this feature is not enabled, the `firstInstance` member of all
`VkDrawIndirectCommand` and `VkDrawIndexedIndirectCommand`
structures that are provided to the [vkCmdDrawIndirect](vkCmdDrawIndirect.html) and
[vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html) commands **must** be 0.

* 
 `depthClamp` specifies whether depth
clamping is supported.
If this feature is not enabled, the `depthClampEnable` member of the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) structure **must** be
[VK_FALSE](VK_FALSE.html).
Otherwise, setting `depthClampEnable` to [VK_TRUE](VK_TRUE.html) will enable
depth clamping.

* 
 `depthBiasClamp` specifies whether depth
bias clamping is supported.
If this feature is not enabled, the `depthBiasClamp` member of the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) structure **must** be 0.0
unless the [VK_DYNAMIC_STATE_DEPTH_BIAS](VkDynamicState.html) dynamic state is enabled,
in which case the `depthBiasClamp` parameter to
[vkCmdSetDepthBias](vkCmdSetDepthBias.html) **must** be 0.0.

* 
 `fillModeNonSolid` specifies whether
point and wireframe fill modes are supported.
If this feature is not enabled, the [VK_POLYGON_MODE_POINT](VkPolygonMode.html) and
[VK_POLYGON_MODE_LINE](VkPolygonMode.html) enum values **must** not be used.

* 
 `depthBounds` specifies whether depth
bounds tests are supported.
If this feature is not enabled, the `depthBoundsTestEnable` member
of the [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure **must** be
[VK_FALSE](VK_FALSE.html) unless the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html) dynamic state is
enabled, in which case the `depthBoundsTestEnable` parameter to
[vkCmdSetDepthBoundsTestEnable](vkCmdSetDepthBoundsTestEnable.html) **must** be [VK_FALSE](VK_FALSE.html).
When `depthBoundsTestEnable` is [VK_FALSE](VK_FALSE.html), the
`minDepthBounds` and `maxDepthBounds` members of the
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html) structure are ignored.

* 
 `wideLines` specifies whether lines with
width other than 1.0 are supported.
If this feature is not enabled, the `lineWidth` member of the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) structure **must** be 1.0
unless the [VK_DYNAMIC_STATE_LINE_WIDTH](VkDynamicState.html) dynamic state is enabled,
in which case the `lineWidth` parameter to [vkCmdSetLineWidth](vkCmdSetLineWidth.html)
**must** be 1.0.
When this feature is supported, the range and granularity of supported
line widths are indicated by the `lineWidthRange` and
`lineWidthGranularity` members of the `VkPhysicalDeviceLimits`
structure, respectively.

* 
 `largePoints` specifies whether points with
size greater than 1.0 are supported.
If this feature is not enabled, only a point size of 1.0 written by a
shader is supported.
The range and granularity of supported point sizes are indicated by the
`pointSizeRange` and `pointSizeGranularity` members of the
`VkPhysicalDeviceLimits` structure, respectively.

* 
 `alphaToOne` specifies whether the
implementation is able to replace the alpha value of the fragment shader
color output in the [Multisample Coverage](../../../../spec/latest/chapters/fragops.html#fragops-covg) fragment
operation.
If this feature is not enabled, then the `alphaToOneEnable` member
of the [VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html) structure **must** be
[VK_FALSE](VK_FALSE.html).
Otherwise setting `alphaToOneEnable` to [VK_TRUE](VK_TRUE.html) will enable
alpha-to-one behavior.

* 
 `multiViewport` specifies whether more
than one viewport is supported.
If this feature is not enabled:

The `viewportCount` and `scissorCount` members of the
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) structure **must** be 1.

* 
The `firstViewport` and `viewportCount` parameters to the
[vkCmdSetViewport](vkCmdSetViewport.html) command **must** be 0 and 1, respectively.

* 
The `firstScissor` and `scissorCount` parameters to the
[vkCmdSetScissor](vkCmdSetScissor.html) command **must** be 0 and 1, respectively.

* 
The `exclusiveScissorCount` member of the
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](VkPipelineViewportExclusiveScissorStateCreateInfoNV.html) structure
**must** be 0 or 1.

* 
The `firstExclusiveScissor` and `exclusiveScissorCount`
parameters to the [vkCmdSetExclusiveScissorNV](vkCmdSetExclusiveScissorNV.html) command **must** be 0
and 1, respectively.

 `samplerAnisotropy` specifies whether
anisotropic filtering is supported.
If this feature is not enabled, the `anisotropyEnable` member of the
[VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure **must** be [VK_FALSE](VK_FALSE.html).

 `textureCompressionETC2`
specifies whether all of the ETC2 and EAC compressed texture formats are
supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) features **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_EAC_R11_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_EAC_R11_SNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_EAC_R11G11_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_EAC_R11G11_SNORM_BLOCK](VkFormat.html)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) and
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html) **can** be used to check for
supported properties of individual formats as normal.

* 
 `textureCompressionASTC_LDR`
specifies whether all of the ASTC LDR compressed texture formats are
supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) features **must**
be supported in `optimalTilingFeatures` for the following formats:

[VK_FORMAT_ASTC_4x4_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x5_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x5_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x6_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x6_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x8_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x8_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x5_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x5_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x6_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x6_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x8_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x8_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x10_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x10_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x10_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x10_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x12_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x12_SRGB_BLOCK](VkFormat.html)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) and
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html) **can** be used to check for
supported properties of individual formats as normal.

 `textureCompressionBC` specifies
whether all of the BC compressed texture formats are supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](VkFormatFeatureFlagBits.html) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](VkFormatFeatureFlagBits.html) features **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_BC1_RGB_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC1_RGB_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC1_RGBA_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC1_RGBA_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC2_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC2_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC3_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC3_SRGB_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC4_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC4_SNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC5_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC5_SNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC6H_UFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC6H_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC7_UNORM_BLOCK](VkFormat.html)

* 
[VK_FORMAT_BC7_SRGB_BLOCK](VkFormat.html)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) and
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html) **can** be used to check for
supported properties of individual formats as normal.

 `occlusionQueryPrecise` specifies
whether occlusion queries returning actual sample counts are supported.
Occlusion queries are created in a `VkQueryPool` by specifying the
`queryType` of [VK_QUERY_TYPE_OCCLUSION](VkQueryType.html) in the
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) structure which is passed to
[vkCreateQueryPool](vkCreateQueryPool.html).
If this feature is enabled, queries of this type **can** enable
[VK_QUERY_CONTROL_PRECISE_BIT](VkQueryControlFlagBits.html) in the `flags` parameter to
[vkCmdBeginQuery](vkCmdBeginQuery.html).
If this feature is not supported, the implementation supports only
boolean occlusion queries.
When any samples are passed, boolean queries will return a non-zero
result value, otherwise a result value of zero is returned.
When this feature is enabled and [VK_QUERY_CONTROL_PRECISE_BIT](VkQueryControlFlagBits.html) is
set, occlusion queries will report the actual number of samples passed.

 `pipelineStatisticsQuery`
specifies whether the pipeline statistics queries are supported.
If this feature is not enabled, queries of type
[VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html) **cannot** be created, and none of
the [VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html) bits **can** be set in the
`pipelineStatistics` member of the [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)
structure.

`vertexPipelineStoresAndAtomics` specifies whether storage buffers
and images support stores and atomic operations in the vertex,
tessellation, and geometry shader stages.
If this feature is not enabled, all storage image, storage texel buffer,
and storage buffer variables used by these stages in shader modules
**must** be decorated with the `NonWritable` decoration (or the
`readonly` memory qualifier in GLSL).

 `fragmentStoresAndAtomics`
specifies whether storage buffers and images support stores and atomic
operations in the fragment shader stage.
If this feature is not enabled, all storage image, storage texel buffer,
and storage buffer variables used by the fragment stage in shader
modules **must** be decorated with the `NonWritable` decoration (or the
`readonly` memory qualifier in GLSL).

`shaderTessellationAndGeometryPointSize` specifies whether the
`PointSize` built-in decoration is available in the tessellation
control, tessellation evaluation, and geometry shader stages.
If this feature is not enabled, members decorated with the
`PointSize` built-in decoration **must** not be read from or written to
and all points written from a tessellation or geometry shader will have
a size of 1.0.
This also specifies whether shader modules **can** declare the
`TessellationPointSize` capability for tessellation control and
evaluation shaders, or if the shader modules **can** declare the
`GeometryPointSize` capability for geometry shaders.
An implementation supporting this feature **must** also support one or both
of the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) or
[`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) features.

 `shaderImageGatherExtended`
specifies whether the extended set of image gather instructions are
available in shader code.
If this feature is not enabled, the `OpImage*Gather` instructions do
not support the `Offset` and `ConstOffsets` operands.
This also specifies whether shader modules **can** declare the
`ImageGatherExtended` capability.

`shaderStorageImageExtendedFormats` specifies whether all the
“storage image extended formats” below are supported; if this feature
is supported, then the [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](VkFormatFeatureFlagBits.html) **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_R16G16_SFLOAT](VkFormat.html)

* 
[VK_FORMAT_B10G11R11_UFLOAT_PACK32](VkFormat.html)

* 
[VK_FORMAT_R16_SFLOAT](VkFormat.html)

* 
[VK_FORMAT_R16G16B16A16_UNORM](VkFormat.html)

* 
[VK_FORMAT_A2B10G10R10_UNORM_PACK32](VkFormat.html)

* 
[VK_FORMAT_R16G16_UNORM](VkFormat.html)

* 
[VK_FORMAT_R8G8_UNORM](VkFormat.html)

* 
[VK_FORMAT_R16_UNORM](VkFormat.html)

* 
[VK_FORMAT_R8_UNORM](VkFormat.html)

* 
[VK_FORMAT_R16G16B16A16_SNORM](VkFormat.html)

* 
[VK_FORMAT_R16G16_SNORM](VkFormat.html)

* 
[VK_FORMAT_R8G8_SNORM](VkFormat.html)

* 
[VK_FORMAT_R16_SNORM](VkFormat.html)

* 
[VK_FORMAT_R8_SNORM](VkFormat.html)

* 
[VK_FORMAT_R16G16_SINT](VkFormat.html)

* 
[VK_FORMAT_R8G8_SINT](VkFormat.html)

* 
[VK_FORMAT_R16_SINT](VkFormat.html)

* 
[VK_FORMAT_R8_SINT](VkFormat.html)

* 
[VK_FORMAT_A2B10G10R10_UINT_PACK32](VkFormat.html)

* 
[VK_FORMAT_R16G16_UINT](VkFormat.html)

* 
[VK_FORMAT_R8G8_UINT](VkFormat.html)

* 
[VK_FORMAT_R16_UINT](VkFormat.html)

* 
[VK_FORMAT_R8_UINT](VkFormat.html)

|  | `shaderStorageImageExtendedFormats` feature only adds a guarantee of
| --- | --- |
format support, which is specified for the whole physical device.
Therefore enabling or disabling the feature via [vkCreateDevice](vkCreateDevice.html) has no
practical effect.

To query for additional properties, or if the feature is not supported,
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html) and
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html) **can** be used to check for
supported properties of individual formats, as usual rules allow.

[VK_FORMAT_R32G32_UINT](VkFormat.html), [VK_FORMAT_R32G32_SINT](VkFormat.html), and
[VK_FORMAT_R32G32_SFLOAT](VkFormat.html) from `StorageImageExtendedFormats` SPIR-V
capability, are already covered by core Vulkan
[mandatory format support](../../../../spec/latest/chapters/formats.html#formats-mandatory-features-32bit). |

`shaderStorageImageMultisample` specifies whether multisampled
storage images are supported.
If this feature is not enabled, images that are created with the
[VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html) usage flag set **must** be created with
`samples` equal to [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html).
This also specifies whether shader modules **can** declare the
`StorageImageMultisample` and `ImageMSArray` capabilities.

`shaderStorageImageReadWithoutFormat` specifies whether storage
images and storage texel buffers require a format qualifier to be
specified when reading.
`shaderStorageImageReadWithoutFormat` applies only to formats listed
in the [storage without format](../../../../spec/latest/chapters/formats.html#formats-without-shader-storage-format)
list.

`shaderStorageImageWriteWithoutFormat` specifies whether storage
images and storage texel buffers require a format qualifier to be
specified when writing.
`shaderStorageImageWriteWithoutFormat` applies only to formats
listed in the [storage without    format](../../../../spec/latest/chapters/formats.html#formats-without-shader-storage-format) list.

`shaderUniformBufferArrayDynamicIndexing` specifies whether arrays
of uniform buffers **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also specifies whether shader modules **can** declare the
`UniformBufferArrayDynamicIndexing` capability.

`shaderSampledImageArrayDynamicIndexing` specifies whether arrays of
samplers or sampled images **can** be indexed by integer expressions that
are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) **must** be indexed only by constant
integral expressions when aggregated into arrays in shader code.
This also specifies whether shader modules **can** declare the
`SampledImageArrayDynamicIndexing` capability.

`shaderStorageBufferArrayDynamicIndexing` specifies whether arrays
of storage buffers **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also specifies whether shader modules **can** declare the
`StorageBufferArrayDynamicIndexing` capability.

`shaderStorageImageArrayDynamicIndexing` specifies whether arrays of
storage images **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) **must** be indexed only by constant
integral expressions when aggregated into arrays in shader code.
This also specifies whether shader modules **can** declare the
`StorageImageArrayDynamicIndexing` capability.

 `shaderClipDistance` specifies
whether clip distances are supported in shader code.
If this feature is not enabled, any members decorated with the
`ClipDistance` built-in decoration **must** not be read from or written
to in shader modules.
This also specifies whether shader modules **can** declare the
`ClipDistance` capability.

 `shaderCullDistance` specifies
whether cull distances are supported in shader code.
If this feature is not enabled, any members decorated with the
`CullDistance` built-in decoration **must** not be read from or written
to in shader modules.
This also specifies whether shader modules **can** declare the
`CullDistance` capability.

 `shaderFloat64` specifies whether 64-bit
floats (doubles) are supported in shader code.
If this feature is not enabled, 64-bit floating-point types **must** not be
used in shader code.
This also specifies whether shader modules **can** declare the `Float64`
capability.
Declaring and using 64-bit floats is enabled for all storage classes
that SPIR-V allows with the `Float64` capability.

 `shaderInt64` specifies whether 64-bit
integers (signed and unsigned) are supported in shader code.
If this feature is not enabled, 64-bit integer types **must** not be used
in shader code.
This also specifies whether shader modules **can** declare the `Int64`
capability.
Declaring and using 64-bit integers is enabled for all storage classes
that SPIR-V allows with the `Int64` capability.

 `shaderInt16` specifies whether 16-bit
integers (signed and unsigned) are supported in shader code.
If this feature is not enabled, 16-bit integer types **must** not be used
in shader code.
This also specifies whether shader modules **can** declare the `Int16`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Int16` SPIR-V capability: Declaring and using 16-bit
integers in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

 `shaderResourceResidency`
specifies whether image operations that return resource residency
information are supported in shader code.
If this feature is not enabled, the `OpImageSparse*` instructions
**must** not be used in shader code.
This also specifies whether shader modules **can** declare the
`SparseResidency` capability.
The feature requires at least one of the `sparseResidency*` features
to be supported.

 `shaderResourceMinLod` specifies
whether image operations specifying the minimum resource LOD are
supported in shader code.
If this feature is not enabled, the `MinLod` image operand **must** not
be used in shader code.
This also specifies whether shader modules **can** declare the `MinLod`
capability.

 `sparseBinding` specifies whether
resource memory **can** be managed at opaque sparse block level instead of
at the object level.
If this feature is not enabled, resource memory **must** be bound only on a
per-object basis using the [vkBindBufferMemory](vkBindBufferMemory.html) and
[vkBindImageMemory](vkBindImageMemory.html) commands.
In this case, buffers and images **must** not be created with
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html) and
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](VkImageCreateFlagBits.html) set in the `flags` member
of the [VkBufferCreateInfo](VkBufferCreateInfo.html) and [VkImageCreateInfo](VkImageCreateInfo.html) structures,
respectively.
Otherwise resource memory **can** be managed as described in
[Sparse Resource Features](../../../../spec/latest/chapters/sparsemem.html#sparsememory-sparseresourcefeatures).

 `sparseResidencyBuffer` specifies
whether the device **can** access partially resident buffers.
If this feature is not enabled, buffers **must** not be created with
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html) set in the `flags`
member of the [VkBufferCreateInfo](VkBufferCreateInfo.html) structure.

 `sparseResidencyImage2D`
specifies whether the device **can** access partially resident 2D images
with 1 sample per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](VkImageType.html) and `samples` set to
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) set in the `flags` member
of the [VkImageCreateInfo](VkImageCreateInfo.html) structure.

 `sparseResidencyImage3D`
specifies whether the device **can** access partially resident 3D images.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_3D](VkImageType.html) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) set in the `flags` member
of the [VkImageCreateInfo](VkImageCreateInfo.html) structure.

 `sparseResidency2Samples`
specifies whether the physical device **can** access partially resident 2D
images with 2 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](VkImageType.html) and `samples` set to
[VK_SAMPLE_COUNT_2_BIT](VkSampleCountFlagBits.html) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) set in the `flags` member
of the [VkImageCreateInfo](VkImageCreateInfo.html) structure.

 `sparseResidency4Samples`
specifies whether the physical device **can** access partially resident 2D
images with 4 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](VkImageType.html) and `samples` set to
[VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) set in the `flags` member
of the [VkImageCreateInfo](VkImageCreateInfo.html) structure.

 `sparseResidency8Samples`
specifies whether the physical device **can** access partially resident 2D
images with 8 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](VkImageType.html) and `samples` set to
[VK_SAMPLE_COUNT_8_BIT](VkSampleCountFlagBits.html) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) set in the `flags` member
of the [VkImageCreateInfo](VkImageCreateInfo.html) structure.

 `sparseResidency16Samples`
specifies whether the physical device **can** access partially resident 2D
images with 16 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](VkImageType.html) and `samples` set to
[VK_SAMPLE_COUNT_16_BIT](VkSampleCountFlagBits.html) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](VkImageCreateFlagBits.html) set in the `flags` member
of the [VkImageCreateInfo](VkImageCreateInfo.html) structure.

 `sparseResidencyAliased`
specifies whether the physical device **can** correctly access data aliased
into multiple locations.
If this feature is not enabled, the
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](VkBufferCreateFlagBits.html) and
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](VkImageCreateFlagBits.html) enum values **must** not be used
in `flags` members of the [VkBufferCreateInfo](VkBufferCreateInfo.html) and
[VkImageCreateInfo](VkImageCreateInfo.html) structures, respectively.

 `variableMultisampleRate`
specifies whether all pipelines that will be bound to a command buffer
during a [subpass which uses no attachments](../../../../spec/latest/chapters/renderpass.html#renderpass-noattachments)
**must** have the same value for
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`rasterizationSamples`.
If set to [VK_TRUE](VK_TRUE.html), the implementation supports variable
multisample rates in a subpass which uses no attachments.
If set to [VK_FALSE](VK_FALSE.html), then all pipelines bound in such a subpass
**must** have the same multisample rate.
This has no effect in situations where a subpass uses any attachments.

 `inheritedQueries` specifies whether a
secondary command buffer **may** be executed while a query is active.

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkDeviceCreateInfo](VkDeviceCreateInfo.html), [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [vkGetPhysicalDeviceFeatures](vkGetPhysicalDeviceFeatures.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceFeatures).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
