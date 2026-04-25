# Features

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/features.html

## Table of Contents

- [Feature Requirements](#features-requirements)
- [Roadmap Milestone Features](#milestone-features)
- [Roadmap_Milestone_Features](#milestone-features)
- [Roadmap 2022](#milestone-features-roadmap-2022)
- [Roadmap 2024](#milestone-features-roadmap-2024)
- [Roadmap 2026](#milestone-features-roadmap-2026)

## Content

*Features* advertise additional functionality which **can** be enabled in the
API.
If a feature is *supported* by a physical device, it **must** be *enabled* when
creating a [VkDevice](devsandqueues.html#VkDevice) in order to use its associated functionality with
that [VkDevice](devsandqueues.html#VkDevice).
If a feature is *unsupported*, that functionality **cannot** be used with that
[VkDevice](devsandqueues.html#VkDevice).

|  | Features are reported via the extensible structure
| --- | --- |
`VkPhysicalDeviceFeatures2`, which was added in the
`[VK_KHR_get_physical_device_properties2](../appendices/extensions.html#VK_KHR_get_physical_device_properties2)` extension and included in
Vulkan 1.1.
When new features are added in future Vulkan versions or extensions, each
extension **should** introduce one new feature structure, if needed.
This structure **can** be added to the `pNext` chain of the
`VkPhysicalDeviceFeatures2` structure. |

For convenience, new core versions of Vulkan **may** introduce new unified
feature structures for features promoted from extensions.
At the same time, the extension’s original feature structure (if any) is
also promoted to the core API, and is an alias of the extension’s structure.
This results in multiple names for the same feature: in the original
extension’s feature structure and the promoted structure alias, in the
unified feature structure.
When a feature was implicitly supported and enabled in the extension, but an
explicit name was added during promotion, then the extension itself acts as
an alias for the feature as listed in the table below.

All aliases of the same feature in the core API **must** be reported
consistently: either all **must** be reported as supported, or none of them.
When a promoted extension is available, any corresponding feature aliases
**must** be supported.

| Extension | Feature(s) |
| --- | --- |
| `[VK_KHR_shader_draw_parameters](../appendices/extensions.html#VK_KHR_shader_draw_parameters)` | [`shaderDrawParameters`](#features-shaderDrawParameters) |
| `[VK_KHR_draw_indirect_count](../appendices/extensions.html#VK_KHR_draw_indirect_count)` | [`drawIndirectCount`](#features-drawIndirectCount) |
| `[VK_KHR_sampler_mirror_clamp_to_edge](../appendices/extensions.html#VK_KHR_sampler_mirror_clamp_to_edge)` | [`samplerMirrorClampToEdge`](#features-samplerMirrorClampToEdge) |
| `[VK_EXT_descriptor_indexing](../appendices/extensions.html#VK_EXT_descriptor_indexing)` | [`descriptorIndexing`](#features-descriptorIndexing) |
| `[VK_EXT_sampler_filter_minmax](../appendices/extensions.html#VK_EXT_sampler_filter_minmax)` | [`samplerFilterMinmax`](#features-samplerFilterMinmax) |
| `[VK_EXT_shader_viewport_index_layer](../appendices/extensions.html#VK_EXT_shader_viewport_index_layer)` | [`shaderOutputViewportIndex`](#features-shaderOutputViewportIndex), [`shaderOutputLayer`](#features-shaderOutputLayer) |
| `[VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor)` | [`pushDescriptor`](#features-pushDescriptor) |

To query supported features, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2). See [Legacy Functionality](../appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceFeatures(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceFeatures*                   pFeatures);

* 
`physicalDevice` is the physical device from which to query the
supported features.

* 
`pFeatures` is a pointer to a [VkPhysicalDeviceFeatures](#VkPhysicalDeviceFeatures)
structure in which the physical device features are returned.
For each feature, a value of [VK_TRUE](fundamentals.html#VK_TRUE) specifies that the feature is
supported on this physical device, and [VK_FALSE](fundamentals.html#VK_FALSE) specifies that the
feature is not supported.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFeatures-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFeatures-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceFeatures-pFeatures-parameter) VUID-vkGetPhysicalDeviceFeatures-pFeatures-parameter

 `pFeatures` **must** be a valid pointer to a [VkPhysicalDeviceFeatures](#VkPhysicalDeviceFeatures) structure

Fine-grained features used by a logical device **must** be enabled at
`VkDevice` creation time.
If a feature is enabled that the physical device does not support,
`VkDevice` creation will fail and return
[VK_ERROR_FEATURE_NOT_PRESENT](fundamentals.html#VkResult).

The fine-grained features are enabled by passing a pointer to the
`VkPhysicalDeviceFeatures` structure via the `pEnabledFeatures`
member of the [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) structure that is passed into the
`vkCreateDevice` call.
If a member of `pEnabledFeatures` is [VK_TRUE](fundamentals.html#VK_TRUE) or [VK_FALSE](fundamentals.html#VK_FALSE),
then the device will be created with the indicated feature enabled or
disabled, respectively.
Features **can** also be enabled by using the [VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)
structure.

If an application wishes to enable all features supported by a device, it
**can** simply pass in the `VkPhysicalDeviceFeatures` structure that was
previously returned by `vkGetPhysicalDeviceFeatures`.
To disable an individual feature, the application **can** set the desired
member to [VK_FALSE](fundamentals.html#VK_FALSE) in the same structure.
Setting `pEnabledFeatures` to `NULL`
and not including a [VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) in the `pNext` chain
of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)
is equivalent to setting all members of the structure to [VK_FALSE](fundamentals.html#VK_FALSE).

|  | Some features, such as `robustBufferAccess`, **may** incur a runtime
| --- | --- |
performance cost.
Application writers **should** carefully consider the implications of enabling
all supported features. |

To query supported features defined by the core or extensions, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceFeatures2(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceFeatures2*                  pFeatures);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceFeatures2
void vkGetPhysicalDeviceFeatures2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceFeatures2*                  pFeatures);

* 
`physicalDevice` is the physical device from which to query the
supported features.

* 
`pFeatures` is a pointer to a [VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)
structure in which the physical device features are returned.

Each structure in `pFeatures` and its `pNext` chain contains members
corresponding to fine-grained features.
Each structure in `pFeatures` and its `pNext` chain contains
`VkBool32` members corresponding to fine-grained features.
Each such member is returned with a [VK_TRUE](fundamentals.html#VK_TRUE) value indicating that
feature is supported on this physical device, or a [VK_FALSE](fundamentals.html#VK_FALSE) value
indicating it is unsupported.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFeatures2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFeatures2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceFeatures2-pFeatures-parameter) VUID-vkGetPhysicalDeviceFeatures2-pFeatures-parameter

 `pFeatures` **must** be a valid pointer to a [VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure

The `VkPhysicalDeviceFeatures2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceFeatures2 {
    VkStructureType             sType;
    void*                       pNext;
    VkPhysicalDeviceFeatures    features;
} VkPhysicalDeviceFeatures2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceFeatures2
typedef VkPhysicalDeviceFeatures2 VkPhysicalDeviceFeatures2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`features` is a [VkPhysicalDeviceFeatures](#VkPhysicalDeviceFeatures) structure describing
the fine-grained features of the Vulkan 1.0 API.

The `pNext` chain of this structure is used to extend the structure with
features defined by extensions.
This structure **can** be used in [vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2) or **can** be
included in the `pNext` chain of a [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) structure,
in which case it controls which features are enabled in lieu of
`pEnabledFeatures`.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFeatures2-sType-sType) VUID-VkPhysicalDeviceFeatures2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

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
[Robust Buffer Access](shaders.html#shaders-robust-buffer-access) guarantees for shader buffer accesses.

* 
 `fullDrawIndexUint32` specifies the
full 32-bit range of indices is supported for indexed draw calls when
using a [VkIndexType](drawing.html#VkIndexType) of [VK_INDEX_TYPE_UINT32](drawing.html#VkIndexType).
`maxDrawIndexedIndexValue` is the maximum index value that **may** be
used (aside from the primitive restart index, which is always 232-1
when the [VkIndexType](drawing.html#VkIndexType) is [VK_INDEX_TYPE_UINT32](drawing.html#VkIndexType)).
If this feature is supported, `maxDrawIndexedIndexValue` **must** be
232-1; otherwise it **must** be no smaller than 224-1.
See [`maxDrawIndexedIndexValue`](limits.html#limits-maxDrawIndexedIndexValue).

* 
 `imageCubeArray` specifies whether image
views with a [VkImageViewType](resources.html#VkImageViewType) of
[VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType) **can** be created, and that the
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
If this feature is not enabled, the [VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits)
and [VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) enum values **must** not be
used.
This also specifies whether shader modules **can** declare the
`Geometry` capability.

* 
 `tessellationShader` specifies
whether tessellation control and evaluation shaders are supported.
If this feature is not enabled, the
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits),
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits), and
[VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_STATE_CREATE_INFO](fundamentals.html#VkStructureType) enum
values **must** not be used.
This also specifies whether shader modules **can** declare the
`Tessellation` capability.

* 
 `sampleRateShading` specifies whether
[Sample Shading](primsrast.html#primsrast-sampleshading) and multisample interpolation
are supported.
If this feature is not enabled, the `sampleShadingEnable` member of
the [VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure **must** be
[VK_FALSE](fundamentals.html#VK_FALSE) and the `minSampleShading` member is ignored.
This also specifies whether shader modules **can** declare the
`SampleRateShading` capability.

* 
 `dualSrcBlend` specifies whether blend
operations which take two sources are supported.
If this feature is not enabled, the [VK_BLEND_FACTOR_SRC1_COLOR](framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](framebuffer.html#VkBlendFactor),
[VK_BLEND_FACTOR_SRC1_ALPHA](framebuffer.html#VkBlendFactor), and
[VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](framebuffer.html#VkBlendFactor) enum values **must** not be used
as source or destination blending factors.
See [Dual-Source Blending](framebuffer.html#framebuffer-dsb).

* 
 `logicOp` specifies whether logic operations
are supported.
If this feature is not enabled, the `logicOpEnable` member of the
[VkPipelineColorBlendStateCreateInfo](framebuffer.html#VkPipelineColorBlendStateCreateInfo) structure **must** be
[VK_FALSE](fundamentals.html#VK_FALSE), and the `logicOp` member is ignored.

* 
 `multiDrawIndirect` specifies whether
multiple draw indirect is supported.
If this feature is not enabled, the `drawCount` parameter to the
[vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect) and [vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect) commands
**must** be 0 or 1.
The `maxDrawIndirectCount` member of the
`VkPhysicalDeviceLimits` structure **must** also be 1 if this feature
is not supported.
See [`maxDrawIndirectCount`](limits.html#limits-maxDrawIndirectCount).

* 
 `drawIndirectFirstInstance`
specifies whether indirect drawing calls support the `firstInstance`
parameter.
If this feature is not enabled, the `firstInstance` member of all
`VkDrawIndirectCommand` and `VkDrawIndexedIndirectCommand`
structures that are provided to the [vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect) and
[vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect) commands **must** be 0.

* 
 `depthClamp` specifies whether depth
clamping is supported.
If this feature is not enabled, the `depthClampEnable` member of the
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) structure **must** be
[VK_FALSE](fundamentals.html#VK_FALSE).
Otherwise, setting `depthClampEnable` to [VK_TRUE](fundamentals.html#VK_TRUE) will enable
depth clamping.

* 
 `depthBiasClamp` specifies whether depth
bias clamping is supported.
If this feature is not enabled, the `depthBiasClamp` member of the
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) structure **must** be 0.0
unless the [VK_DYNAMIC_STATE_DEPTH_BIAS](pipelines.html#VkDynamicState) dynamic state is enabled,
in which case the `depthBiasClamp` parameter to
[vkCmdSetDepthBias](primsrast.html#vkCmdSetDepthBias) **must** be 0.0.

* 
 `fillModeNonSolid` specifies whether
point and wireframe fill modes are supported.
If this feature is not enabled, the [VK_POLYGON_MODE_POINT](primsrast.html#VkPolygonMode) and
[VK_POLYGON_MODE_LINE](primsrast.html#VkPolygonMode) enum values **must** not be used.

* 
 `depthBounds` specifies whether depth
bounds tests are supported.
If this feature is not enabled, the `depthBoundsTestEnable` member
of the [VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure **must** be
[VK_FALSE](fundamentals.html#VK_FALSE) unless the
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](pipelines.html#VkDynamicState) dynamic state is
enabled, in which case the `depthBoundsTestEnable` parameter to
[vkCmdSetDepthBoundsTestEnable](fragops.html#vkCmdSetDepthBoundsTestEnable) **must** be [VK_FALSE](fundamentals.html#VK_FALSE).
When `depthBoundsTestEnable` is [VK_FALSE](fundamentals.html#VK_FALSE), the
`minDepthBounds` and `maxDepthBounds` members of the
[VkPipelineDepthStencilStateCreateInfo](fragops.html#VkPipelineDepthStencilStateCreateInfo) structure are ignored.

* 
 `wideLines` specifies whether lines with
width other than 1.0 are supported.
If this feature is not enabled, the `lineWidth` member of the
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) structure **must** be 1.0
unless the [VK_DYNAMIC_STATE_LINE_WIDTH](pipelines.html#VkDynamicState) dynamic state is enabled,
in which case the `lineWidth` parameter to [vkCmdSetLineWidth](primsrast.html#vkCmdSetLineWidth)
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
color output in the [Multisample Coverage](fragops.html#fragops-covg) fragment
operation.
If this feature is not enabled, then the `alphaToOneEnable` member
of the [VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo) structure **must** be
[VK_FALSE](fundamentals.html#VK_FALSE).
Otherwise setting `alphaToOneEnable` to [VK_TRUE](fundamentals.html#VK_TRUE) will enable
alpha-to-one behavior.

* 
 `multiViewport` specifies whether more
than one viewport is supported.
If this feature is not enabled:

The `viewportCount` and `scissorCount` members of the
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) structure **must** be 1.

* 
The `firstViewport` and `viewportCount` parameters to the
[vkCmdSetViewport](vertexpostproc.html#vkCmdSetViewport) command **must** be 0 and 1, respectively.

* 
The `firstScissor` and `scissorCount` parameters to the
[vkCmdSetScissor](fragops.html#vkCmdSetScissor) command **must** be 0 and 1, respectively.

* 
The `exclusiveScissorCount` member of the
[VkPipelineViewportExclusiveScissorStateCreateInfoNV](fragops.html#VkPipelineViewportExclusiveScissorStateCreateInfoNV) structure
**must** be 0 or 1.

* 
The `firstExclusiveScissor` and `exclusiveScissorCount`
parameters to the [vkCmdSetExclusiveScissorNV](fragops.html#vkCmdSetExclusiveScissorNV) command **must** be 0
and 1, respectively.

 `samplerAnisotropy` specifies whether
anisotropic filtering is supported.
If this feature is not enabled, the `anisotropyEnable` member of the
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure **must** be [VK_FALSE](fundamentals.html#VK_FALSE).

 `textureCompressionETC2`
specifies whether all of the ETC2 and EAC compressed texture formats are
supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) features **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_ETC2_R8G8B8_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A1_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A1_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A8_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ETC2_R8G8B8A8_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_EAC_R11_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_EAC_R11_SNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_EAC_R11G11_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_EAC_R11G11_SNORM_BLOCK](formats.html#VkFormat)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) and
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) **can** be used to check for
supported properties of individual formats as normal.

 `textureCompressionASTC_LDR`
specifies whether all of the ASTC LDR compressed texture formats are
supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) features **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_ASTC_4x4_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x5_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x5_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x6_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x6_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x8_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x8_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x5_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x5_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x6_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x6_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x8_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x8_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x10_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x10_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x10_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x10_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x12_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x12_SRGB_BLOCK](formats.html#VkFormat)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) and
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) **can** be used to check for
supported properties of individual formats as normal.

 `textureCompressionBC` specifies
whether all of the BC compressed texture formats are supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) features **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_BC1_RGB_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC1_RGB_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC1_RGBA_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC1_RGBA_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC2_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC2_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC3_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC3_SRGB_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC4_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC4_SNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC5_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC5_SNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC6H_UFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC6H_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC7_UNORM_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_BC7_SRGB_BLOCK](formats.html#VkFormat)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) and
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) **can** be used to check for
supported properties of individual formats as normal.

 `occlusionQueryPrecise` specifies
whether occlusion queries returning actual sample counts are supported.
Occlusion queries are created in a `VkQueryPool` by specifying the
`queryType` of [VK_QUERY_TYPE_OCCLUSION](queries.html#VkQueryType) in the
[VkQueryPoolCreateInfo](queries.html#VkQueryPoolCreateInfo) structure which is passed to
[vkCreateQueryPool](queries.html#vkCreateQueryPool).
If this feature is enabled, queries of this type **can** enable
[VK_QUERY_CONTROL_PRECISE_BIT](queries.html#VkQueryControlFlagBits) in the `flags` parameter to
[vkCmdBeginQuery](queries.html#vkCmdBeginQuery).
If this feature is not supported, the implementation supports only
boolean occlusion queries.
When any samples are passed, boolean queries will return a non-zero
result value, otherwise a result value of zero is returned.
When this feature is enabled and [VK_QUERY_CONTROL_PRECISE_BIT](queries.html#VkQueryControlFlagBits) is
set, occlusion queries will report the actual number of samples passed.

 `pipelineStatisticsQuery`
specifies whether the pipeline statistics queries are supported.
If this feature is not enabled, queries of type
[VK_QUERY_TYPE_PIPELINE_STATISTICS](queries.html#VkQueryType) **cannot** be created, and none of
the [VkQueryPipelineStatisticFlagBits](queries.html#VkQueryPipelineStatisticFlagBits) bits **can** be set in the
`pipelineStatistics` member of the [VkQueryPoolCreateInfo](queries.html#VkQueryPoolCreateInfo)
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
of the [`tessellationShader`](#features-tessellationShader) or
[`geometryShader`](#features-geometryShader) features.

 `shaderImageGatherExtended`
specifies whether the extended set of image gather instructions are
available in shader code.
If this feature is not enabled, the `OpImage*Gather` instructions do
not support the `Offset` and `ConstOffsets` operands.
This also specifies whether shader modules **can** declare the
`ImageGatherExtended` capability.

`shaderStorageImageExtendedFormats` specifies whether all the
“storage image extended formats” below are supported; if this feature
is supported, then the [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits) **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_R16G16_SFLOAT](formats.html#VkFormat)

* 
[VK_FORMAT_B10G11R11_UFLOAT_PACK32](formats.html#VkFormat)

* 
[VK_FORMAT_R16_SFLOAT](formats.html#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_UNORM_PACK32](formats.html#VkFormat)

* 
[VK_FORMAT_R16G16_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R8G8_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R8_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16G16B16A16_SNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16G16_SNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R8G8_SNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16_SNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R8_SNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16G16_SINT](formats.html#VkFormat)

* 
[VK_FORMAT_R8G8_SINT](formats.html#VkFormat)

* 
[VK_FORMAT_R16_SINT](formats.html#VkFormat)

* 
[VK_FORMAT_R8_SINT](formats.html#VkFormat)

* 
[VK_FORMAT_A2B10G10R10_UINT_PACK32](formats.html#VkFormat)

* 
[VK_FORMAT_R16G16_UINT](formats.html#VkFormat)

* 
[VK_FORMAT_R8G8_UINT](formats.html#VkFormat)

* 
[VK_FORMAT_R16_UINT](formats.html#VkFormat)

* 
[VK_FORMAT_R8_UINT](formats.html#VkFormat)

|  | `shaderStorageImageExtendedFormats` feature only adds a guarantee of
| --- | --- |
format support, which is specified for the whole physical device.
Therefore enabling or disabling the feature via [vkCreateDevice](devsandqueues.html#vkCreateDevice) has no
practical effect.

To query for additional properties, or if the feature is not supported,
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) and
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) **can** be used to check for
supported properties of individual formats, as usual rules allow.

[VK_FORMAT_R32G32_UINT](formats.html#VkFormat), [VK_FORMAT_R32G32_SINT](formats.html#VkFormat), and
[VK_FORMAT_R32G32_SFLOAT](formats.html#VkFormat) from `StorageImageExtendedFormats` SPIR-V
capability, are already covered by core Vulkan
[mandatory format support](formats.html#formats-mandatory-features-32bit). |

`shaderStorageImageMultisample` specifies whether multisampled
storage images are supported.
If this feature is not enabled, images that are created with the
[VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) usage flag set **must** be created with
`samples` equal to [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits).
This also specifies whether shader modules **can** declare the
`StorageImageMultisample` and `ImageMSArray` capabilities.

`shaderStorageImageReadWithoutFormat` specifies whether storage
images and storage texel buffers require a format qualifier to be
specified when reading.
`shaderStorageImageReadWithoutFormat` applies only to formats listed
in the [storage without format](formats.html#formats-without-shader-storage-format)
list.

`shaderStorageImageWriteWithoutFormat` specifies whether storage
images and storage texel buffers require a format qualifier to be
specified when writing.
`shaderStorageImageWriteWithoutFormat` applies only to formats
listed in the [storage without    format](formats.html#formats-without-shader-storage-format) list.

`shaderUniformBufferArrayDynamicIndexing` specifies whether arrays
of uniform buffers **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType) **must** be indexed only by
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
[VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType) **must** be indexed only by constant
integral expressions when aggregated into arrays in shader code.
This also specifies whether shader modules **can** declare the
`SampledImageArrayDynamicIndexing` capability.

`shaderStorageBufferArrayDynamicIndexing` specifies whether arrays
of storage buffers **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType) **must** be indexed only by
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
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType) **must** be indexed only by constant
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
per-object basis using the [vkBindBufferMemory](resources.html#vkBindBufferMemory) and
[vkBindImageMemory](resources.html#vkBindImageMemory) commands.
In this case, buffers and images **must** not be created with
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits) and
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits) set in the `flags` member
of the [VkBufferCreateInfo](resources.html#VkBufferCreateInfo) and [VkImageCreateInfo](resources.html#VkImageCreateInfo) structures,
respectively.
Otherwise resource memory **can** be managed as described in
[Sparse Resource Features](sparsemem.html#sparsememory-sparseresourcefeatures).

 `sparseResidencyBuffer` specifies
whether the device **can** access partially resident buffers.
If this feature is not enabled, buffers **must** not be created with
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits) set in the `flags`
member of the [VkBufferCreateInfo](resources.html#VkBufferCreateInfo) structure.

 `sparseResidencyImage2D`
specifies whether the device **can** access partially resident 2D images
with 1 sample per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) and `samples` set to
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) set in the `flags` member
of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure.

 `sparseResidencyImage3D`
specifies whether the device **can** access partially resident 3D images.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_3D](resources.html#VkImageType) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) set in the `flags` member
of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure.

 `sparseResidency2Samples`
specifies whether the physical device **can** access partially resident 2D
images with 2 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) and `samples` set to
[VK_SAMPLE_COUNT_2_BIT](limits.html#VkSampleCountFlagBits) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) set in the `flags` member
of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure.

 `sparseResidency4Samples`
specifies whether the physical device **can** access partially resident 2D
images with 4 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) and `samples` set to
[VK_SAMPLE_COUNT_4_BIT](limits.html#VkSampleCountFlagBits) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) set in the `flags` member
of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure.

 `sparseResidency8Samples`
specifies whether the physical device **can** access partially resident 2D
images with 8 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) and `samples` set to
[VK_SAMPLE_COUNT_8_BIT](limits.html#VkSampleCountFlagBits) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) set in the `flags` member
of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure.

 `sparseResidency16Samples`
specifies whether the physical device **can** access partially resident 2D
images with 16 samples per pixel.
If this feature is not enabled, images with an `imageType` of
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) and `samples` set to
[VK_SAMPLE_COUNT_16_BIT](limits.html#VkSampleCountFlagBits) **must** not be created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) set in the `flags` member
of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure.

 `sparseResidencyAliased`
specifies whether the physical device **can** correctly access data aliased
into multiple locations.
If this feature is not enabled, the
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](resources.html#VkBufferCreateFlagBits) and
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](resources.html#VkImageCreateFlagBits) enum values **must** not be used
in `flags` members of the [VkBufferCreateInfo](resources.html#VkBufferCreateInfo) and
[VkImageCreateInfo](resources.html#VkImageCreateInfo) structures, respectively.

 `variableMultisampleRate`
specifies whether all pipelines that will be bound to a command buffer
during a [subpass which uses no attachments](renderpass.html#renderpass-noattachments)
**must** have the same value for
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples`.
If set to [VK_TRUE](fundamentals.html#VK_TRUE), the implementation supports variable
multisample rates in a subpass which uses no attachments.
If set to [VK_FALSE](fundamentals.html#VK_FALSE), then all pipelines bound in such a subpass
**must** have the same multisample rate.
This has no effect in situations where a subpass uses any attachments.

 `inheritedQueries` specifies whether a
secondary command buffer **may** be executed while a query is active.

The `VkPhysicalDeviceVulkan11Features` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceVulkan11Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           storageBuffer16BitAccess;
    VkBool32           uniformAndStorageBuffer16BitAccess;
    VkBool32           storagePushConstant16;
    VkBool32           storageInputOutput16;
    VkBool32           multiview;
    VkBool32           multiviewGeometryShader;
    VkBool32           multiviewTessellationShader;
    VkBool32           variablePointersStorageBuffer;
    VkBool32           variablePointers;
    VkBool32           protectedMemory;
    VkBool32           samplerYcbcrConversion;
    VkBool32           shaderDrawParameters;
} VkPhysicalDeviceVulkan11Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

    `storageBuffer16BitAccess` specifies whether objects in the
    `StorageBuffer`,
`ShaderRecordBufferKHR`,
    or `PhysicalStorageBuffer`
    storage class with the `Block` decoration **can** have 16-bit integer
    and 16-bit floating-point members.
    If this feature is not enabled, 16-bit integer or 16-bit floating-point
    members **must** not be used in such
    objects unless [    `storageBuffer8BitAccess`](#features-storageBuffer8BitAccess) or
    [    `uniformAndStorageBuffer8BitAccess`](#features-uniformAndStorageBuffer8BitAccess) are enabled or they are
    accessed in 32-bit multiples if [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled.
    This also specifies whether shader modules **can** declare the
    `StorageBuffer16BitAccess` capability.

* 

`uniformAndStorageBuffer16BitAccess` specifies whether objects in
the `Uniform` storage class with the `Block` decoration **can** have
16-bit integer and 16-bit floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such
objects unless
[    `uniformAndStorageBuffer8BitAccess`](#features-uniformAndStorageBuffer8BitAccess) are enabled or they are
accessed in 32-bit multiples if [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`UniformAndStorageBuffer16BitAccess` capability.

* 

`storagePushConstant16` specifies whether objects in the
`PushConstant` storage class **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or floating-point members
**must** not be used in such
objects unless [    `storagePushConstant8`](#features-storagePushConstant8) are enabled or they are accessed in 32-bit
multiples if [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`StoragePushConstant16` capability.

* 

`storageInputOutput16` specifies whether objects in the `Input`
and `Output` storage classes **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such objects.
This also specifies whether shader modules **can** declare the
`StorageInputOutput16` capability.

* 
 `multiview` specifies whether
the implementation supports multiview rendering within a render pass.
If this feature is not enabled, the view mask of each subpass **must**
always be zero.

* 
 `multiviewGeometryShader`
specifies whether the implementation supports multiview rendering within
a render pass, with [geometry shaders](geometry.html#geometry).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include a geometry shader.

* 

`multiviewTessellationShader` specifies whether the implementation
supports multiview rendering within a render pass, with
[tessellation shaders](tessellation.html#tessellation).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include any tessellation
shaders.

* 

`variablePointersStorageBuffer` specifies whether the implementation
supports the SPIR-V `VariablePointersStorageBuffer` capability.
When this feature is not enabled, shader modules **must** not declare the
`SPV_KHR_variable_pointers` extension or the
`VariablePointersStorageBuffer` capability.

* 
 `variablePointers`
specifies whether the implementation supports the SPIR-V
`VariablePointers` capability.
When this feature is not enabled, shader modules **must** not declare the
`VariablePointers` capability.

* 
 `protectedMemory`
specifies whether [protected memory](memory.html#memory-protected-memory) is
supported.

* 

`samplerYcbcrConversion` specifies whether the implementation
supports [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion).
If `samplerYcbcrConversion` is [VK_FALSE](fundamentals.html#VK_FALSE), sampler Y′CBCR
conversion is not supported, and samplers using sampler Y′CBCR
conversion **must** not be used.

* 

`shaderDrawParameters` specifies whether the implementation supports
the SPIR-V `DrawParameters` capability.
When this feature is not enabled, shader modules **must** not declare the
`SPV_KHR_shader_draw_parameters` extension or the `DrawParameters`
capability.

If the `VkPhysicalDeviceVulkan11Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVulkan11Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan11Features-sType-sType) VUID-VkPhysicalDeviceVulkan11Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVulkan12Features` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceVulkan12Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           samplerMirrorClampToEdge;
    VkBool32           drawIndirectCount;
    VkBool32           storageBuffer8BitAccess;
    VkBool32           uniformAndStorageBuffer8BitAccess;
    VkBool32           storagePushConstant8;
    VkBool32           shaderBufferInt64Atomics;
    VkBool32           shaderSharedInt64Atomics;
    VkBool32           shaderFloat16;
    VkBool32           shaderInt8;
    VkBool32           descriptorIndexing;
    VkBool32           shaderInputAttachmentArrayDynamicIndexing;
    VkBool32           shaderUniformTexelBufferArrayDynamicIndexing;
    VkBool32           shaderStorageTexelBufferArrayDynamicIndexing;
    VkBool32           shaderUniformBufferArrayNonUniformIndexing;
    VkBool32           shaderSampledImageArrayNonUniformIndexing;
    VkBool32           shaderStorageBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageImageArrayNonUniformIndexing;
    VkBool32           shaderInputAttachmentArrayNonUniformIndexing;
    VkBool32           shaderUniformTexelBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageTexelBufferArrayNonUniformIndexing;
    VkBool32           descriptorBindingUniformBufferUpdateAfterBind;
    VkBool32           descriptorBindingSampledImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageBufferUpdateAfterBind;
    VkBool32           descriptorBindingUniformTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingStorageTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingUpdateUnusedWhilePending;
    VkBool32           descriptorBindingPartiallyBound;
    VkBool32           descriptorBindingVariableDescriptorCount;
    VkBool32           runtimeDescriptorArray;
    VkBool32           samplerFilterMinmax;
    VkBool32           scalarBlockLayout;
    VkBool32           imagelessFramebuffer;
    VkBool32           uniformBufferStandardLayout;
    VkBool32           shaderSubgroupExtendedTypes;
    VkBool32           separateDepthStencilLayouts;
    VkBool32           hostQueryReset;
    VkBool32           timelineSemaphore;
    VkBool32           bufferDeviceAddress;
    VkBool32           bufferDeviceAddressCaptureReplay;
    VkBool32           bufferDeviceAddressMultiDevice;
    VkBool32           vulkanMemoryModel;
    VkBool32           vulkanMemoryModelDeviceScope;
    VkBool32           vulkanMemoryModelAvailabilityVisibilityChains;
    VkBool32           shaderOutputViewportIndex;
    VkBool32           shaderOutputLayer;
    VkBool32           subgroupBroadcastDynamicId;
} VkPhysicalDeviceVulkan12Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `samplerMirrorClampToEdge`
indicates whether the implementation supports the
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode) sampler address mode.
If this feature is not enabled, the
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode) sampler address mode
**must** not be used.

* 
 `drawIndirectCount` indicates whether
the implementation supports the [vkCmdDrawIndirectCount](drawing.html#vkCmdDrawIndirectCount) and
[vkCmdDrawIndexedIndirectCount](drawing.html#vkCmdDrawIndexedIndirectCount) functions.
If this feature is not enabled, these functions **must** not be used.

* 

    `storageBuffer8BitAccess` indicates whether objects in the
    `StorageBuffer`,
`ShaderRecordBufferKHR`,
    or `PhysicalStorageBuffer`
    storage class with the `Block` decoration **can** have 8-bit integer
    members.
    If this feature is not enabled, 8-bit integer members **must** not be used
    in such
    objects unless [    `shaderUntypedPointer`](#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
    multiples or 16-bit multiples if
    [    `storageBuffer16BitAccess`](#features-storageBuffer16BitAccess) is enabled.
    This also indicates whether shader modules **can** declare the
    `StorageBuffer8BitAccess` capability.

* 

`uniformAndStorageBuffer8BitAccess` indicates whether objects in the
`Uniform` storage class with the `Block` decoration **can** have
8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects unless [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
multiples or 16-bit multiples if
[    `uniformAndStorageBuffer16BitAccess`](#features-uniformAndStorageBuffer16BitAccess) is enabled.
This also indicates whether shader modules **can** declare the
`UniformAndStorageBuffer8BitAccess` capability.

* 

`storagePushConstant8` indicates whether objects in the
`PushConstant` storage class **can** have 8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects unless [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
multiples or 16-bit multiples if
[    `storagePushConstant16`](#features-storagePushConstant16) is enabled.
This also indicates whether shader modules **can** declare the
`StoragePushConstant8` capability.

* 

`shaderBufferInt64Atomics` indicates whether shaders **can** perform
64-bit unsigned and signed integer atomic operations on buffers.

* 

`shaderSharedInt64Atomics` indicates whether shaders **can** perform
64-bit unsigned and signed integer atomic operations on shared
and payload
memory.

* 
 `shaderFloat16` indicates
whether 16-bit floats (halfs) are supported in shader code.
This also indicates whether shader modules **can** declare the `Float16`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Float16` SPIR-V capability: Declaring and using
16-bit floats in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

* 
 `shaderInt8` indicates
whether 8-bit integers (signed and unsigned) are supported in shader
code.
This also indicates whether shader modules **can** declare the `Int8`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Int8` SPIR-V capability: Declaring and using 8-bit
integers in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

* 
 `descriptorIndexing` indicates
whether the implementation supports the minimum set of descriptor
indexing features as described in the [Feature    Requirements](#features-requirements) section.
Enabling this feature when [vkCreateDevice](devsandqueues.html#vkCreateDevice) is called does not imply
the other minimum descriptor indexing features are also enabled.
Those other descriptor indexing features **must** be enabled individually
as needed by the application.

* 

`shaderInputAttachmentArrayDynamicIndexing` indicates whether arrays
of input attachments **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayDynamicIndexing` capability.

* 

`shaderUniformTexelBufferArrayDynamicIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayDynamicIndexing` capability.

* 

`shaderStorageTexelBufferArrayDynamicIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayDynamicIndexing` capability.

* 

`shaderUniformBufferArrayNonUniformIndexing` indicates whether
arrays of uniform buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformBufferArrayNonUniformIndexing` capability.

* 

`shaderSampledImageArrayNonUniformIndexing` indicates whether arrays
of samplers or sampled images **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`SampledImageArrayNonUniformIndexing` capability.

* 

`shaderStorageBufferArrayNonUniformIndexing` indicates whether
arrays of storage buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageImageArrayNonUniformIndexing` indicates whether arrays
of storage images **can** be indexed by non-uniform integer expressions in
shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageImageArrayNonUniformIndexing` capability.

* 

`shaderInputAttachmentArrayNonUniformIndexing` indicates whether
arrays of input attachments **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayNonUniformIndexing` capability.

* 

`shaderUniformTexelBufferArrayNonUniformIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageTexelBufferArrayNonUniformIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayNonUniformIndexing` capability.

* 

`descriptorBindingUniformBufferUpdateAfterBind` indicates whether
the implementation supports updating uniform buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingSampledImageUpdateAfterBind` indicates whether the
implementation supports updating sampled image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType).

* 

`descriptorBindingStorageImageUpdateAfterBind` indicates whether the
implementation supports updating storage image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType).

* 

`descriptorBindingStorageBufferUpdateAfterBind` indicates whether
the implementation supports updating storage buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingUniformTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating uniform texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingStorageTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating storage texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingUpdateUnusedWhilePending` indicates whether the
implementation supports updating descriptors while the set is in use.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be
used.

* 

`descriptorBindingPartiallyBound` indicates whether the
implementation supports statically using a descriptor set binding in
which some descriptors are not valid.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used.

* 

`descriptorBindingVariableDescriptorCount` indicates whether the
implementation supports descriptor sets with a variable-sized last
binding.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be
used.

* 

`runtimeDescriptorArray` indicates whether the implementation
supports the SPIR-V `RuntimeDescriptorArray` capability.
If this feature is not enabled, descriptors **must** not be declared in
runtime arrays.

* 
 `samplerFilterMinmax` indicates
whether the implementation supports a minimum set of required formats
supporting min/max filtering as defined by the
[    `filterMinmaxSingleComponentFormats`](limits.html#limits-filterMinmaxSingleComponentFormats-minimum-requirements) property minimum
requirements.
If this feature is not enabled, then
[VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo) **must** only use
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT).

* 
 `scalarBlockLayout`
indicates that the implementation supports the layout of resource blocks
in shaders using [scalar    alignment](interfaces.html#interfaces-alignment-requirements).

* 

`imagelessFramebuffer` indicates that the implementation supports
specifying the image view for attachments at render pass begin time via
[VkRenderPassAttachmentBeginInfo](renderpass.html#VkRenderPassAttachmentBeginInfo).

* 

`uniformBufferStandardLayout` indicates that the implementation
supports the same layouts for uniform buffers as for storage and other
kinds of buffers.
See [Standard Buffer Layout](interfaces.html#interfaces-resources-standard-layout).

* 

`shaderSubgroupExtendedTypes` is a boolean specifying whether
subgroup operations can use 8-bit integer, 16-bit integer, 64-bit
integer, 16-bit floating-point, and vectors of these types in
[group operations](shaders.html#shaders-group-operations) with
[subgroup scope](shaders.html#shaders-scope-subgroup), if the implementation
supports the types.

* 

`separateDepthStencilLayouts` indicates whether the implementation
supports a `VkImageMemoryBarrier` for a depth/stencil image with
only one of [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits) set, and whether
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) can be used.

* 
 `hostQueryReset`
indicates that the implementation supports resetting queries from the
host with [vkResetQueryPool](queries.html#vkResetQueryPool).

* 
 `timelineSemaphore`
indicates whether semaphores created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) are supported.

* 

`bufferDeviceAddress` indicates that the implementation supports
accessing buffer memory in shaders as storage buffers via an address
queried from [vkGetBufferDeviceAddress](resources.html#vkGetBufferDeviceAddress).

* 

`bufferDeviceAddressCaptureReplay` indicates that the implementation
supports saving and reusing buffer and device addresses, e.g. for trace
capture and replay.

* 

`bufferDeviceAddressMultiDevice` indicates that the implementation
supports the `bufferDeviceAddress`
, `rayTracingPipeline` and `rayQuery` features
for logical devices created with multiple physical devices.
If this feature is not supported, buffer
and acceleration structure
addresses **must** not be queried on a logical device created with more
than one physical device.

* 
 `vulkanMemoryModel`
indicates whether shader modules **can** declare the `VulkanMemoryModel`
capability.

* 

`vulkanMemoryModelDeviceScope` indicates whether the Vulkan Memory
Model can use `Device` scope synchronization.
This also indicates whether shader modules **can** declare the
`VulkanMemoryModelDeviceScope` capability.

* 

`vulkanMemoryModelAvailabilityVisibilityChains` indicates whether
the Vulkan Memory Model can use [    availability and visibility chains](../appendices/memorymodel.html#memory-model-availability-visibility) with more than one element.

* 
 `shaderOutputViewportIndex`
    indicates whether the implementation supports the
    `ShaderViewportIndex` SPIR-V capability enabling variables decorated
    with the `ViewportIndex` built-in to be exported from
mesh,
    vertex or tessellation evaluation shaders.
    If this feature is not enabled, the `ViewportIndex` built-in
    decoration **must** not be used on outputs in
mesh,
    vertex or tessellation evaluation shaders.

* 
 `shaderOutputLayer` indicates whether
    the implementation supports the `ShaderLayer` SPIR-V capability
    enabling variables decorated with the `Layer` built-in to be exported
    from
mesh,
    vertex or tessellation evaluation shaders.
    If this feature is not enabled, the `Layer` built-in decoration **must**
    not be used on outputs in
mesh,
    vertex or tessellation evaluation shaders.

* 
 If
`subgroupBroadcastDynamicId` is [VK_TRUE](fundamentals.html#VK_TRUE), the “Id” operand of
`OpGroupNonUniformBroadcast` **can** be dynamically uniform within a
subgroup, and the “Index” operand of
`OpGroupNonUniformQuadBroadcast` **can** be dynamically uniform within
the derivative group.
If it is [VK_FALSE](fundamentals.html#VK_FALSE), these operands **must** be constants.

If the `VkPhysicalDeviceVulkan12Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVulkan12Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan12Features-sType-sType) VUID-VkPhysicalDeviceVulkan12Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVulkan13Features` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceVulkan13Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustImageAccess;
    VkBool32           inlineUniformBlock;
    VkBool32           descriptorBindingInlineUniformBlockUpdateAfterBind;
    VkBool32           pipelineCreationCacheControl;
    VkBool32           privateData;
    VkBool32           shaderDemoteToHelperInvocation;
    VkBool32           shaderTerminateInvocation;
    VkBool32           subgroupSizeControl;
    VkBool32           computeFullSubgroups;
    VkBool32           synchronization2;
    VkBool32           textureCompressionASTC_HDR;
    VkBool32           shaderZeroInitializeWorkgroupMemory;
    VkBool32           dynamicRendering;
    VkBool32           shaderIntegerDotProduct;
    VkBool32           maintenance4;
} VkPhysicalDeviceVulkan13Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `robustImageAccess`
enables [Robust Image Access](shaders.html#shaders-robust-image-access) guarantees for shader image
accesses.

* 
 `inlineUniformBlock`
indicates whether the implementation supports inline uniform block
descriptors.
If this feature is not enabled,
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType) **must** not be used.

* 

`descriptorBindingInlineUniformBlockUpdateAfterBind`
indicates whether the implementation supports updating inline uniform
block descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType).

* 

`pipelineCreationCacheControl` indicates that the implementation
supports:

The following **can** be used in `Vk*PipelineCreateInfo`::`flags`:

[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](pipelines.html#VkPipelineCreateFlagBits)

* 
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](pipelines.html#VkPipelineCreateFlagBits)

The following **can** be used in
[VkPipelineCacheCreateInfo](pipelines.html#VkPipelineCacheCreateInfo)::`flags`:

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](pipelines.html#VkPipelineCacheCreateFlagBits)

 `privateData` indicates
whether the implementation supports private data.
See [Private Data](private_data.html#private-data).

`shaderDemoteToHelperInvocation` indicates whether the
implementation supports the SPIR-V `DemoteToHelperInvocationEXT`
capability.

`shaderTerminateInvocation` specifies whether the implementation
supports SPIR-V modules that use the `SPV_KHR_terminate_invocation`
extension.

`subgroupSizeControl` indicates whether the implementation supports
controlling shader subgroup sizes via the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits)
flag and the [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](pipelines.html#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo)
structure.

`computeFullSubgroups` indicates whether the implementation supports
requiring full subgroups in compute
, mesh, or task
shaders via the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits) flag.

 `synchronization2`
indicates whether the implementation supports the new set of
synchronization commands introduced in `[VK_KHR_synchronization2](../appendices/extensions.html#VK_KHR_synchronization2)`.

`textureCompressionASTC_HDR` indicates whether all of the ASTC HDR
compressed texture formats are supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) features **must**
be supported in `optimalTilingFeatures` for the following formats:

* 
[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](formats.html#VkFormat)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) and
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) **can** be used to check for
supported properties of individual formats as normal.

`shaderZeroInitializeWorkgroupMemory` specifies whether the
implementation supports initializing a variable in Workgroup storage
class.

 `dynamicRendering`
specifies that the implementation supports dynamic render pass instances
using the [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) command.

`shaderIntegerDotProduct` specifies whether shader modules **can**
declare the `DotProductInputAllKHR`, `DotProductInput4x8BitKHR`,
`DotProductInput4x8BitPackedKHR` and `DotProductKHR` capabilities.

 `maintenance4` indicates
that the implementation supports the following:

* 
The application **may** destroy a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) object
immediately after using it to create another object.

* 
`LocalSizeId` **can** be used as an alternative to `LocalSize` to
specify the local workgroup size with specialization constants.

* 
Images created with identical creation parameters will always have the
same alignment requirements.

* 
The size memory requirement of a buffer or image is never greater than
that of another buffer or image created with a greater or equal size.

* 
Push constants do not have to be initialized before they are
dynamically accessed.

* 
The interface matching rules allow a larger output vector to match with
a smaller input vector, with additional values being discarded.

If the `VkPhysicalDeviceVulkan13Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVulkan13Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan13Features-sType-sType) VUID-VkPhysicalDeviceVulkan13Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVulkan14Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVulkan14Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           globalPriorityQuery;
    VkBool32           shaderSubgroupRotate;
    VkBool32           shaderSubgroupRotateClustered;
    VkBool32           shaderFloatControls2;
    VkBool32           shaderExpectAssume;
    VkBool32           rectangularLines;
    VkBool32           bresenhamLines;
    VkBool32           smoothLines;
    VkBool32           stippledRectangularLines;
    VkBool32           stippledBresenhamLines;
    VkBool32           stippledSmoothLines;
    VkBool32           vertexAttributeInstanceRateDivisor;
    VkBool32           vertexAttributeInstanceRateZeroDivisor;
    VkBool32           indexTypeUint8;
    VkBool32           dynamicRenderingLocalRead;
    VkBool32           maintenance5;
    VkBool32           maintenance6;
    VkBool32           pipelineProtectedAccess;
    VkBool32           pipelineRobustness;
    VkBool32           hostImageCopy;
    VkBool32           pushDescriptor;
} VkPhysicalDeviceVulkan14Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`globalPriorityQuery` indicates whether the implementation supports
the ability to query global queue priorities.

* 

`shaderSubgroupRotate` specifies whether shader modules **can** declare
the `GroupNonUniformRotateKHR` capability.

* 

`shaderSubgroupRotateClustered` specifies whether shader modules
**can** use the `ClusterSize` operand to
`OpGroupNonUniformRotateKHR`.

* 

`shaderFloatControls2` specifies whether shader modules **can** declare
the `FloatControls2` capability.

* 
 `shaderExpectAssume`
specifies whether shader modules **can** declare the `ExpectAssumeKHR`
capability.

* 
 `rectangularLines`
indicates whether the implementation supports
[rectangular line rasterization](primsrast.html#primsrast-lines).

* 
 `bresenhamLines`
indicates whether the implementation supports
[Bresenham-style line rasterization](primsrast.html#primsrast-lines-bresenham).

* 
 `smoothLines` indicates
whether the implementation supports [smooth line    rasterization](primsrast.html#primsrast-lines-smooth).

* 

`stippledRectangularLines` indicates whether the implementation
supports [stippled line rasterization](primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](primsrast.html#VkLineRasterizationModeEXT) lines.

* 

`stippledBresenhamLines` indicates whether the implementation
supports [stippled line rasterization](primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](primsrast.html#VkLineRasterizationModeEXT) lines.

* 

`stippledSmoothLines` indicates whether the implementation supports
[stippled line rasterization](primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](primsrast.html#VkLineRasterizationModeEXT) lines.

* 

`vertexAttributeInstanceRateDivisor` specifies whether vertex
attribute fetching may be repeated in the case of instanced rendering.

* 

`vertexAttributeInstanceRateZeroDivisor` specifies whether a zero
value for [VkVertexInputBindingDivisorDescriptionEXT](fxvertex.html#VkVertexInputBindingDivisorDescriptionEXT)::`divisor`
is supported.

* 
 `indexTypeUint8`
    indicates that [VK_INDEX_TYPE_UINT8](drawing.html#VkIndexType) can be used with
[vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2) and
    [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer).

* 

`dynamicRenderingLocalRead` specifies that the implementation
supports local reads inside dynamic render pass instances using the
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) command.

* 
 `maintenance5` indicates
that the implementation supports the following:

The ability to expose support for the optional format
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](formats.html#VkFormat).

* 
The ability to expose support for the optional format
[VK_FORMAT_A8_UNORM](formats.html#VkFormat).

* 
A property to indicate that multisample coverage operations are
performed after sample counting in EarlyFragmentTests mode.

* 
Creating a `VkBufferView` with a subset of the associated
`VkBuffer` usage using [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo).

* 
A new function [vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2), allowing a range of memory
to be bound as an index buffer.

* 
[vkGetDeviceProcAddr](initialization.html#vkGetDeviceProcAddr) will return `NULL` for function pointers of
core functions for versions higher than the version requested by the
application.

* 
[vkCmdBindVertexBuffers2](fxvertex.html#vkCmdBindVertexBuffers2) supports using [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) in the
`pSizes` parameter.

* 
If `PointSize` is not written, a default value of `1.0` is used for
the size of points.

* 
[VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo) **can** be added as a chained structure to
pipeline creation via [VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo), rather
than having to create a shader module.

* 
A function [vkGetRenderingAreaGranularity](renderpass.html#vkGetRenderingAreaGranularity) to query the optimal
render area for a dynamic rendering instance.

* 
A property to indicate that depth/stencil texturing operations with
[VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle) have defined behavior.

* 
[vkGetDeviceImageSubresourceLayout](resources.html#vkGetDeviceImageSubresourceLayout) allows an application to
perform a [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout) query without having to
create an image.

* 
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS) as the `layerCount` member of
[VkImageSubresourceLayers](copies.html#VkImageSubresourceLayers).

* 
A property to indicate whether `PointSize` controls the final
rasterization of polygons if [polygon mode](primsrast.html#primsrast-polygonmode) is
[VK_POLYGON_MODE_POINT](primsrast.html#VkPolygonMode).

* 
Two properties to indicate the non-strict line rasterization algorithm
used.

* 
Two new flags words [VkPipelineCreateFlagBits2](pipelines.html#VkPipelineCreateFlagBits2) and
[VkBufferUsageFlagBits2](resources.html#VkBufferUsageFlagBits2).

* 
Physical-device-level functions **can** now be called with any value in
the valid range for a type beyond the defined enumerants, such that
applications can avoid checking individual features, extensions, or
versions before querying supported properties of a particular
enumerant.

* 
Copies between images of any type are allowed, with 1D images treated
as 2D images with a height of `1`.

 `maintenance6` indicates
that the implementation supports the following:

* 
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **can** be used when binding an index buffer

* 
[VkBindMemoryStatus](resources.html#VkBindMemoryStatus) **can** be included in the `pNext` chain of
the [VkBindBufferMemoryInfo](resources.html#VkBindBufferMemoryInfo) and [VkBindImageMemoryInfo](resources.html#VkBindImageMemoryInfo)
structures, enabling applications to retrieve [VkResult](fundamentals.html#VkResult) values for
individual memory binding operations.

* 
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`blockTexelViewCompatibleMultipleLayers`
property to indicate that the implementation supports creating image
views with [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) where
the `layerCount` member of `subresourceRange` is greater than
`1`.

* 
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`maxCombinedImageSamplerDescriptorCount`
property which indicates the maximum descriptor size required for any
[format that requires a     sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation.

* 
A
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`fragmentShadingRateClampCombinerInputs`
property which indicates whether the implementation clamps the inputs
to fragment shading rate combiner operations.

`pipelineProtectedAccess` indicates whether the implementation
supports specifying protected access on individual pipelines.

 `pipelineRobustness`
indicates that robustness **can** be requested on a per-pipeline-stage
granularity.

 `hostImageCopy` indicates
that the implementation supports copying from host memory to images
using the [vkCopyMemoryToImage](copies.html#vkCopyMemoryToImage) command, copying from images to host
memory using the [vkCopyImageToMemory](copies.html#vkCopyImageToMemory) command, and copying between
images using the [vkCopyImageToImage](copies.html#vkCopyImageToImage) command.

 `pushDescriptor` indicates that the
implementation supports push descriptors.

If the `VkPhysicalDeviceVulkan14Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVulkan14Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan14Features-sType-sType) VUID-VkPhysicalDeviceVulkan14Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVariablePointersFeatures` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceVariablePointersFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           variablePointersStorageBuffer;
    VkBool32           variablePointers;
} VkPhysicalDeviceVariablePointersFeatures;

// Provided by VK_VERSION_1_1
// Equivalent to VkPhysicalDeviceVariablePointersFeatures
typedef VkPhysicalDeviceVariablePointersFeatures VkPhysicalDeviceVariablePointerFeatures;

// Provided by VK_KHR_variable_pointers
// Equivalent to VkPhysicalDeviceVariablePointersFeatures
typedef VkPhysicalDeviceVariablePointersFeatures VkPhysicalDeviceVariablePointersFeaturesKHR;

// Provided by VK_KHR_variable_pointers
// Equivalent to VkPhysicalDeviceVariablePointersFeatures
typedef VkPhysicalDeviceVariablePointersFeatures VkPhysicalDeviceVariablePointerFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`variablePointersStorageBuffer` specifies whether the implementation
supports the SPIR-V `VariablePointersStorageBuffer` capability.
When this feature is not enabled, shader modules **must** not declare the
`SPV_KHR_variable_pointers` extension or the
`VariablePointersStorageBuffer` capability.

* 
 `variablePointers`
specifies whether the implementation supports the SPIR-V
`VariablePointers` capability.
When this feature is not enabled, shader modules **must** not declare the
`VariablePointers` capability.

If the `VkPhysicalDeviceVariablePointersFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVariablePointersFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceVariablePointersFeatures-variablePointers-01431) VUID-VkPhysicalDeviceVariablePointersFeatures-variablePointers-01431

If `variablePointers` is enabled then
`variablePointersStorageBuffer` **must** also be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVariablePointersFeatures-sType-sType) VUID-VkPhysicalDeviceVariablePointersFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMultiviewFeatures` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceMultiviewFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multiview;
    VkBool32           multiviewGeometryShader;
    VkBool32           multiviewTessellationShader;
} VkPhysicalDeviceMultiviewFeatures;

// Provided by VK_KHR_multiview
// Equivalent to VkPhysicalDeviceMultiviewFeatures
typedef VkPhysicalDeviceMultiviewFeatures VkPhysicalDeviceMultiviewFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `multiview` specifies whether
the implementation supports multiview rendering within a render pass.
If this feature is not enabled, the view mask of each subpass **must**
always be zero.

* 
 `multiviewGeometryShader`
specifies whether the implementation supports multiview rendering within
a render pass, with [geometry shaders](geometry.html#geometry).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include a geometry shader.

* 

`multiviewTessellationShader` specifies whether the implementation
supports multiview rendering within a render pass, with
[tessellation shaders](tessellation.html#tessellation).
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include any tessellation
shaders.

If the `VkPhysicalDeviceMultiviewFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMultiviewFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceMultiviewFeatures-multiviewGeometryShader-00580) VUID-VkPhysicalDeviceMultiviewFeatures-multiviewGeometryShader-00580

If `multiviewGeometryShader` is enabled then `multiview` **must**
also be enabled

* 
[](#VUID-VkPhysicalDeviceMultiviewFeatures-multiviewTessellationShader-00581) VUID-VkPhysicalDeviceMultiviewFeatures-multiviewTessellationShader-00581

If `multiviewTessellationShader` is enabled then `multiview`
**must** also be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewFeatures-sType-sType) VUID-VkPhysicalDeviceMultiviewFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDeviceShaderAtomicFloatFeaturesEXT](#VkPhysicalDeviceShaderAtomicFloatFeaturesEXT) structure is defined
as:

// Provided by VK_EXT_shader_atomic_float
typedef struct VkPhysicalDeviceShaderAtomicFloatFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderBufferFloat32Atomics;
    VkBool32           shaderBufferFloat32AtomicAdd;
    VkBool32           shaderBufferFloat64Atomics;
    VkBool32           shaderBufferFloat64AtomicAdd;
    VkBool32           shaderSharedFloat32Atomics;
    VkBool32           shaderSharedFloat32AtomicAdd;
    VkBool32           shaderSharedFloat64Atomics;
    VkBool32           shaderSharedFloat64AtomicAdd;
    VkBool32           shaderImageFloat32Atomics;
    VkBool32           shaderImageFloat32AtomicAdd;
    VkBool32           sparseImageFloat32Atomics;
    VkBool32           sparseImageFloat32AtomicAdd;
} VkPhysicalDeviceShaderAtomicFloatFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderBufferFloat32Atomics`
indicates whether shaders **can** perform 32-bit floating-point load,
store, and exchange atomic operations on storage buffers.

* 

`shaderBufferFloat32AtomicAdd` indicates whether shaders **can**
perform 32-bit floating-point add atomic operations on storage buffers.

* 
 `shaderBufferFloat64Atomics`
indicates whether shaders **can** perform 64-bit floating-point load,
store, and exchange atomic operations on storage buffers.

* 

`shaderBufferFloat64AtomicAdd` indicates whether shaders **can**
perform 64-bit floating-point add atomic operations on storage buffers.

* 
 `shaderSharedFloat32Atomics`
indicates whether shaders **can** perform 32-bit floating-point load,
store, and exchange atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat32AtomicAdd` indicates whether shaders **can**
perform 32-bit floating-point add atomic operations on shared
and payload
memory.

* 
 `shaderSharedFloat64Atomics`
indicates whether shaders **can** perform 64-bit floating-point load,
store, and exchange atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat64AtomicAdd` indicates whether shaders **can**
perform 64-bit floating-point add atomic operations on shared
and payload
memory.

* 
 `shaderImageFloat32Atomics`
indicates whether shaders **can** perform 32-bit floating-point load,
store, and exchange atomic image operations.

* 

`shaderImageFloat32AtomicAdd` indicates whether shaders **can** perform
32-bit floating-point add atomic image operations.

* 
 `sparseImageFloat32Atomics`
indicates whether 32-bit floating-point load, store, and exchange atomic
operations **can** be used on sparse images.

* 

`sparseImageFloat32AtomicAdd` indicates whether 32-bit
floating-point add atomic operations **can** be used on sparse images.

If the `VkPhysicalDeviceShaderAtomicFloatFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderAtomicFloatFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAtomicFloatFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderAtomicFloatFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT](#VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT) structure is defined
as:

// Provided by VK_EXT_shader_atomic_float2
typedef struct VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderBufferFloat16Atomics;
    VkBool32           shaderBufferFloat16AtomicAdd;
    VkBool32           shaderBufferFloat16AtomicMinMax;
    VkBool32           shaderBufferFloat32AtomicMinMax;
    VkBool32           shaderBufferFloat64AtomicMinMax;
    VkBool32           shaderSharedFloat16Atomics;
    VkBool32           shaderSharedFloat16AtomicAdd;
    VkBool32           shaderSharedFloat16AtomicMinMax;
    VkBool32           shaderSharedFloat32AtomicMinMax;
    VkBool32           shaderSharedFloat64AtomicMinMax;
    VkBool32           shaderImageFloat32AtomicMinMax;
    VkBool32           sparseImageFloat32AtomicMinMax;
} VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderBufferFloat16Atomics`
indicates whether shaders **can** perform 16-bit floating-point load,
store, and exchange atomic operations on storage buffers.

* 

`shaderBufferFloat16AtomicAdd` indicates whether shaders **can**
perform 16-bit floating-point add atomic operations on storage buffers.

* 

`shaderBufferFloat16AtomicMinMax` indicates whether shaders **can**
perform 16-bit floating-point min and max atomic operations on storage
buffers.

* 

`shaderBufferFloat32AtomicMinMax` indicates whether shaders **can**
perform 32-bit floating-point min and max atomic operations on storage
buffers.

* 

`shaderBufferFloat64AtomicMinMax` indicates whether shaders **can**
perform 64-bit floating-point min and max atomic operations on storage
buffers.

* 
 `shaderSharedFloat16Atomics`
indicates whether shaders **can** perform 16-bit floating-point load,
store, and exchange atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat16AtomicAdd` indicates whether shaders **can**
perform 16-bit floating-point add atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat16AtomicMinMax` indicates whether shaders **can**
perform 16-bit floating-point min and max atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat32AtomicMinMax` indicates whether shaders **can**
perform 32-bit floating-point min and max atomic operations on shared
and payload
memory.

* 

`shaderSharedFloat64AtomicMinMax` indicates whether shaders **can**
perform 64-bit floating-point min and max atomic operations on shared
and payload
memory.

* 

`shaderImageFloat32AtomicMinMax` indicates whether shaders **can**
perform 32-bit floating-point min and max atomic image operations.

* 

`sparseImageFloat32AtomicMinMax` indicates whether 32-bit
floating-point min and max atomic operations **can** be used on sparse
images.

If the `VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_2_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDeviceShaderAtomicInt64Features](#VkPhysicalDeviceShaderAtomicInt64Features) structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceShaderAtomicInt64Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderBufferInt64Atomics;
    VkBool32           shaderSharedInt64Atomics;
} VkPhysicalDeviceShaderAtomicInt64Features;

// Provided by VK_KHR_shader_atomic_int64
// Equivalent to VkPhysicalDeviceShaderAtomicInt64Features
typedef VkPhysicalDeviceShaderAtomicInt64Features VkPhysicalDeviceShaderAtomicInt64FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderBufferInt64Atomics` indicates whether shaders **can** perform
64-bit unsigned and signed integer atomic operations on buffers.

* 

`shaderSharedInt64Atomics` indicates whether shaders **can** perform
64-bit unsigned and signed integer atomic operations on shared
and payload
memory.

If the `VkPhysicalDeviceShaderAtomicInt64Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderAtomicInt64Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAtomicInt64Features-sType-sType) VUID-VkPhysicalDeviceShaderAtomicInt64Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_INT64_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT](#VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT) structure is
defined as:

// Provided by VK_EXT_shader_image_atomic_int64
typedef struct VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderImageInt64Atomics;
    VkBool32           sparseImageInt64Atomics;
} VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderImageInt64Atomics`
indicates whether shaders **can** support 64-bit unsigned and signed
integer atomic operations on images.

* 
 `sparseImageInt64Atomics`
indicates whether 64-bit integer atomics **can** be used on sparse images.

If the `VkPhysicalDeviceShaderAtomicInt64FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderAtomicInt64FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_IMAGE_ATOMIC_INT64_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDevice8BitStorageFeatures](#VkPhysicalDevice8BitStorageFeatures) structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDevice8BitStorageFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           storageBuffer8BitAccess;
    VkBool32           uniformAndStorageBuffer8BitAccess;
    VkBool32           storagePushConstant8;
} VkPhysicalDevice8BitStorageFeatures;

// Provided by VK_KHR_8bit_storage
// Equivalent to VkPhysicalDevice8BitStorageFeatures
typedef VkPhysicalDevice8BitStorageFeatures VkPhysicalDevice8BitStorageFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

    `storageBuffer8BitAccess` indicates whether objects in the
    `StorageBuffer`,
`ShaderRecordBufferKHR`,
    or `PhysicalStorageBuffer`
    storage class with the `Block` decoration **can** have 8-bit integer
    members.
    If this feature is not enabled, 8-bit integer members **must** not be used
    in such
    objects unless [    `shaderUntypedPointer`](#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
    multiples or 16-bit multiples if
    [    `storageBuffer16BitAccess`](#extension-features-storageBuffer16BitAccess) is enabled.
    This also indicates whether shader modules **can** declare the
    `StorageBuffer8BitAccess` capability.

* 

`uniformAndStorageBuffer8BitAccess` indicates whether objects in the
`Uniform` storage class with the `Block` decoration **can** have
8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects unless [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
multiples or 16-bit multiples if
[    `uniformAndStorageBuffer16BitAccess`](#extension-features-uniformAndStorageBuffer16BitAccess) is enabled.
This also indicates whether shader modules **can** declare the
`UniformAndStorageBuffer8BitAccess` capability.

* 

`storagePushConstant8` indicates whether objects in the
`PushConstant` storage class **can** have 8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects unless [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled and they are accessed in 32-bit
multiples or 16-bit multiples if
[    `storagePushConstant16`](#extension-features-storagePushConstant16) is enabled.
This also indicates whether shader modules **can** declare the
`StoragePushConstant8` capability.

If the `VkPhysicalDevice8BitStorageFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevice8BitStorageFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevice8BitStorageFeatures-sType-sType) VUID-VkPhysicalDevice8BitStorageFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_8BIT_STORAGE_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDevice16BitStorageFeatures](#VkPhysicalDevice16BitStorageFeatures) structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDevice16BitStorageFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           storageBuffer16BitAccess;
    VkBool32           uniformAndStorageBuffer16BitAccess;
    VkBool32           storagePushConstant16;
    VkBool32           storageInputOutput16;
} VkPhysicalDevice16BitStorageFeatures;

// Provided by VK_KHR_16bit_storage
// Equivalent to VkPhysicalDevice16BitStorageFeatures
typedef VkPhysicalDevice16BitStorageFeatures VkPhysicalDevice16BitStorageFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

    `storageBuffer16BitAccess` specifies whether objects in the
    `StorageBuffer`,
`ShaderRecordBufferKHR`,
    or `PhysicalStorageBuffer`
    storage class with the `Block` decoration **can** have 16-bit integer
    and 16-bit floating-point members.
    If this feature is not enabled, 16-bit integer or 16-bit floating-point
    members **must** not be used in such
    objects unless [    `storageBuffer8BitAccess`](#extension-features-storageBuffer8BitAccess) or
    [    `uniformAndStorageBuffer8BitAccess`](#extension-features-uniformAndStorageBuffer8BitAccess) are enabled or they are
    accessed in 32-bit multiples if [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled.
    This also specifies whether shader modules **can** declare the
    `StorageBuffer16BitAccess` capability.

* 

`uniformAndStorageBuffer16BitAccess` specifies whether objects in
the `Uniform` storage class with the `Block` decoration **can** have
16-bit integer and 16-bit floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such
objects unless
[    `uniformAndStorageBuffer8BitAccess`](#extension-features-uniformAndStorageBuffer8BitAccess) are enabled or they are
accessed in 32-bit multiples if [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`UniformAndStorageBuffer16BitAccess` capability.

* 

`storagePushConstant16` specifies whether objects in the
`PushConstant` storage class **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or floating-point members
**must** not be used in such
objects unless [    `storagePushConstant8`](#extension-features-storagePushConstant8) are enabled or they are accessed in 32-bit
multiples if [    `shaderUntypedPointers`](#features-shaderUntypedPointers) is enabled.
This also specifies whether shader modules **can** declare the
`StoragePushConstant16` capability.

* 

`storageInputOutput16` specifies whether objects in the `Input`
and `Output` storage classes **can** have 16-bit integer and 16-bit
floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such objects.
This also specifies whether shader modules **can** declare the
`StorageInputOutput16` capability.

If the `VkPhysicalDevice16BitStorageFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevice16BitStorageFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevice16BitStorageFeatures-sType-sType) VUID-VkPhysicalDevice16BitStorageFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderFloat16Int8Features` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceShaderFloat16Int8Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFloat16;
    VkBool32           shaderInt8;
} VkPhysicalDeviceShaderFloat16Int8Features;

// Provided by VK_KHR_shader_float16_int8
// Equivalent to VkPhysicalDeviceShaderFloat16Int8Features
typedef VkPhysicalDeviceShaderFloat16Int8Features VkPhysicalDeviceShaderFloat16Int8FeaturesKHR;

// Provided by VK_KHR_shader_float16_int8
// Equivalent to VkPhysicalDeviceShaderFloat16Int8Features
typedef VkPhysicalDeviceShaderFloat16Int8Features VkPhysicalDeviceFloat16Int8FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFloat16` indicates
whether 16-bit floats (halfs) are supported in shader code.
This also indicates whether shader modules **can** declare the `Float16`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Float16` SPIR-V capability: Declaring and using
16-bit floats in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

* 
 `shaderInt8` indicates
whether 8-bit integers (signed and unsigned) are supported in shader
code.
This also indicates whether shader modules **can** declare the `Int8`
capability.
However, this only enables a subset of the storage classes that SPIR-V
allows for the `Int8` SPIR-V capability: Declaring and using 8-bit
integers in the `Private`,
`Workgroup` (for non-Block variables),
and `Function` storage classes is enabled, while declaring them in
the interface storage classes (e.g., `UniformConstant`, `Uniform`,
`StorageBuffer`, `Input`, `Output`, and `PushConstant`) is
not enabled.

If the `VkPhysicalDeviceShaderFloat16Int8Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderFloat16Int8Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderFloat16Int8Features-sType-sType) VUID-VkPhysicalDeviceShaderFloat16Int8Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDeviceShaderClockFeaturesKHR](#VkPhysicalDeviceShaderClockFeaturesKHR) structure is defined as:

// Provided by VK_KHR_shader_clock
typedef struct VkPhysicalDeviceShaderClockFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupClock;
    VkBool32           shaderDeviceClock;
} VkPhysicalDeviceShaderClockFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderSubgroupClock` indicates
whether shaders **can** perform `Subgroup` scoped clock reads.

* 
 `shaderDeviceClock` indicates whether
shaders **can** perform `Device` scoped clock reads.

If the `VkPhysicalDeviceShaderClockFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderClockFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderClockFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderClockFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CLOCK_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSamplerYcbcrConversionFeatures` structure is
defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceSamplerYcbcrConversionFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           samplerYcbcrConversion;
} VkPhysicalDeviceSamplerYcbcrConversionFeatures;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkPhysicalDeviceSamplerYcbcrConversionFeatures
typedef VkPhysicalDeviceSamplerYcbcrConversionFeatures VkPhysicalDeviceSamplerYcbcrConversionFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`samplerYcbcrConversion` specifies whether the implementation
supports [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion).
If `samplerYcbcrConversion` is [VK_FALSE](fundamentals.html#VK_FALSE), sampler Y′CBCR
conversion is not supported, and samplers using sampler Y′CBCR
conversion **must** not be used.

If the `VkPhysicalDeviceSamplerYcbcrConversionFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSamplerYcbcrConversionFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSamplerYcbcrConversionFeatures-sType-sType) VUID-VkPhysicalDeviceSamplerYcbcrConversionFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceProtectedMemoryFeatures` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceProtectedMemoryFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           protectedMemory;
} VkPhysicalDeviceProtectedMemoryFeatures;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `protectedMemory`
specifies whether [protected memory](memory.html#memory-protected-memory) is
supported.

If the `VkPhysicalDeviceProtectedMemoryFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceProtectedMemoryFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceProtectedMemoryFeatures-sType-sType) VUID-VkPhysicalDeviceProtectedMemoryFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_blend_operation_advanced
typedef struct VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           advancedBlendCoherentOperations;
} VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`advancedBlendCoherentOperations` specifies whether blending using
[advanced blend operations](framebuffer.html#framebuffer-blend-advanced) is guaranteed
to execute atomically and in [primitive    order](drawing.html#drawing-primitive-order).
If this is [VK_TRUE](fundamentals.html#VK_TRUE),
[VK_ACCESS_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](synchronization.html#VkAccessFlagBits) is treated the
same as [VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](synchronization.html#VkAccessFlagBits), and advanced blending
needs no additional synchronization over basic blending.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then memory dependencies are required to
guarantee order between two advanced blending operations that occur on
the same sample.

If the `VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceConditionalRenderingFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_conditional_rendering
typedef struct VkPhysicalDeviceConditionalRenderingFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           conditionalRendering;
    VkBool32           inheritedConditionalRendering;
} VkPhysicalDeviceConditionalRenderingFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `conditionalRendering` specifies
whether conditional rendering is supported.

* 

`inheritedConditionalRendering` specifies whether a secondary
command buffer **can** be executed while conditional rendering is active in
the primary command buffer.

If the `VkPhysicalDeviceConditionalRenderingFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceConditionalRenderingFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceConditionalRenderingFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceConditionalRenderingFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CONDITIONAL_RENDERING_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderDrawParametersFeatures` structure is defined
as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceShaderDrawParametersFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderDrawParameters;
} VkPhysicalDeviceShaderDrawParametersFeatures;

// Provided by VK_VERSION_1_1
// Equivalent to VkPhysicalDeviceShaderDrawParametersFeatures
typedef VkPhysicalDeviceShaderDrawParametersFeatures VkPhysicalDeviceShaderDrawParameterFeatures;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderDrawParameters` specifies whether the implementation supports
the SPIR-V `DrawParameters` capability.
When this feature is not enabled, shader modules **must** not declare the
`SPV_KHR_shader_draw_parameters` extension or the `DrawParameters`
capability.

If the `VkPhysicalDeviceShaderDrawParametersFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderDrawParametersFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderDrawParametersFeatures-sType-sType) VUID-VkPhysicalDeviceShaderDrawParametersFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETERS_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMeshShaderFeaturesNV` structure is defined as:

// Provided by VK_NV_mesh_shader
typedef struct VkPhysicalDeviceMeshShaderFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           taskShader;
    VkBool32           meshShader;
} VkPhysicalDeviceMeshShaderFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `taskShader` specifies whether task
shaders are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_TASK_BIT_NV](pipelines.html#VkShaderStageFlagBits)
and [VK_PIPELINE_STAGE_TASK_SHADER_BIT_NV](synchronization.html#VkPipelineStageFlagBits) enum values **must** not be
used.

* 
 `meshShader` specifies whether mesh
shaders are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_MESH_BIT_NV](pipelines.html#VkShaderStageFlagBits)
and [VK_PIPELINE_STAGE_MESH_SHADER_BIT_NV](synchronization.html#VkPipelineStageFlagBits) enum values **must** not be
used.

If the `VkPhysicalDeviceMeshShaderFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMeshShaderFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesNV-sType-sType) VUID-VkPhysicalDeviceMeshShaderFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMeshShaderFeaturesEXT` structure is defined as:

// Provided by VK_EXT_mesh_shader
typedef struct VkPhysicalDeviceMeshShaderFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           taskShader;
    VkBool32           meshShader;
    VkBool32           multiviewMeshShader;
    VkBool32           primitiveFragmentShadingRateMeshShader;
    VkBool32           meshShaderQueries;
} VkPhysicalDeviceMeshShaderFeaturesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `taskShader` specifies whether task shaders
are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_TASK_BIT_EXT](pipelines.html#VkShaderStageFlagBits)
and [VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits) enum values **must** not be
used.

* 
 `meshShader` specifies whether mesh shaders
are supported.
If this feature is not enabled, the [VK_SHADER_STAGE_MESH_BIT_EXT](pipelines.html#VkShaderStageFlagBits)
and [VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits) enum values **must** not be
used.

* 
 `multiviewMeshShader` specifies
whether the implementation supports [    `multiview`](#features-multiview) rendering within a render pass, with mesh shaders.
If this feature is not enabled, then a pipeline compiled against a
subpass with a non-zero view mask **must** not include a mesh shader.

* 

`primitiveFragmentShadingRateMeshShader` indicates that the
implementation supports the [    primitive fragment shading rate](primsrast.html#primsrast-fragment-shading-rate-primitive) in mesh shaders.

* 
 `meshShaderQueries` indicates that
the implementation supports creating query pools using the
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](queries.html#VkQueryType) query type and
statistic queries containing the
[VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT](queries.html#VkQueryPipelineStatisticFlagBits) and
[VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT](queries.html#VkQueryPipelineStatisticFlagBits) flags

If the `VkPhysicalDeviceMeshShaderFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMeshShaderFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

The corresponding features of the `VkPhysicalDeviceMeshShaderFeaturesNV`
structure **must** match those in `VkPhysicalDeviceMeshShaderFeaturesEXT`.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-multiviewMeshShader-07032) VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-multiviewMeshShader-07032

If `multiviewMeshShader` is enabled then
`VkPhysicalDeviceMultiviewFeaturesKHR`::`multiview` **must** also
be enabled

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-primitiveFragmentShadingRateMeshShader-07033) VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-primitiveFragmentShadingRateMeshShader-07033

If `primitiveFragmentShadingRateMeshShader` is enabled then
`VkPhysicalDeviceFragmentShadingRateFeaturesKHR`::`primitiveFragmentShadingRate`
**must** also be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMeshShaderFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMemoryDecompressionFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_memory_decompression
typedef struct VkPhysicalDeviceMemoryDecompressionFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           memoryDecompression;
} VkPhysicalDeviceMemoryDecompressionFeaturesEXT;

// Provided by VK_NV_memory_decompression
// Equivalent to VkPhysicalDeviceMemoryDecompressionFeaturesEXT
typedef VkPhysicalDeviceMemoryDecompressionFeaturesEXT VkPhysicalDeviceMemoryDecompressionFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `memoryDecompression` indicates
whether memory decompression is supported.

If the `VkPhysicalDeviceMemoryDecompressionFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMemoryDecompressionFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryDecompressionFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMemoryDecompressionFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDescriptorIndexingFeatures` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDescriptorIndexingFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderInputAttachmentArrayDynamicIndexing;
    VkBool32           shaderUniformTexelBufferArrayDynamicIndexing;
    VkBool32           shaderStorageTexelBufferArrayDynamicIndexing;
    VkBool32           shaderUniformBufferArrayNonUniformIndexing;
    VkBool32           shaderSampledImageArrayNonUniformIndexing;
    VkBool32           shaderStorageBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageImageArrayNonUniformIndexing;
    VkBool32           shaderInputAttachmentArrayNonUniformIndexing;
    VkBool32           shaderUniformTexelBufferArrayNonUniformIndexing;
    VkBool32           shaderStorageTexelBufferArrayNonUniformIndexing;
    VkBool32           descriptorBindingUniformBufferUpdateAfterBind;
    VkBool32           descriptorBindingSampledImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageImageUpdateAfterBind;
    VkBool32           descriptorBindingStorageBufferUpdateAfterBind;
    VkBool32           descriptorBindingUniformTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingStorageTexelBufferUpdateAfterBind;
    VkBool32           descriptorBindingUpdateUnusedWhilePending;
    VkBool32           descriptorBindingPartiallyBound;
    VkBool32           descriptorBindingVariableDescriptorCount;
    VkBool32           runtimeDescriptorArray;
} VkPhysicalDeviceDescriptorIndexingFeatures;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkPhysicalDeviceDescriptorIndexingFeatures
typedef VkPhysicalDeviceDescriptorIndexingFeatures VkPhysicalDeviceDescriptorIndexingFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderInputAttachmentArrayDynamicIndexing` indicates whether arrays
of input attachments **can** be indexed by integer expressions that are
dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayDynamicIndexing` capability.

* 

`shaderUniformTexelBufferArrayDynamicIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayDynamicIndexing` capability.

* 

`shaderStorageTexelBufferArrayDynamicIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by integer expressions
that are dynamically uniform within
either the subgroup or
the invocation group in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** be indexed only by
constant integral expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayDynamicIndexing` capability.

* 

`shaderUniformBufferArrayNonUniformIndexing` indicates whether
arrays of uniform buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformBufferArrayNonUniformIndexing` capability.

* 

`shaderSampledImageArrayNonUniformIndexing` indicates whether arrays
of samplers or sampled images **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`SampledImageArrayNonUniformIndexing` capability.

* 

`shaderStorageBufferArrayNonUniformIndexing` indicates whether
arrays of storage buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageImageArrayNonUniformIndexing` indicates whether arrays
of storage images **can** be indexed by non-uniform integer expressions in
shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageImageArrayNonUniformIndexing` capability.

* 

`shaderInputAttachmentArrayNonUniformIndexing` indicates whether
arrays of input attachments **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`InputAttachmentArrayNonUniformIndexing` capability.

* 

`shaderUniformTexelBufferArrayNonUniformIndexing` indicates whether
arrays of uniform texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`UniformTexelBufferArrayNonUniformIndexing` capability.

* 

`shaderStorageTexelBufferArrayNonUniformIndexing` indicates whether
arrays of storage texel buffers **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) **must** not be indexed by
non-uniform integer expressions when aggregated into arrays in shader
code.
This also indicates whether shader modules **can** declare the
`StorageTexelBufferArrayNonUniformIndexing` capability.

* 

`descriptorBindingUniformBufferUpdateAfterBind` indicates whether
the implementation supports updating uniform buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingSampledImageUpdateAfterBind` indicates whether the
implementation supports updating sampled image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType).

* 

`descriptorBindingStorageImageUpdateAfterBind` indicates whether the
implementation supports updating storage image descriptors after a set
is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType).

* 

`descriptorBindingStorageBufferUpdateAfterBind` indicates whether
the implementation supports updating storage buffer descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingUniformTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating uniform texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingStorageTexelBufferUpdateAfterBind` indicates
whether the implementation supports updating storage texel buffer
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType).

* 

`descriptorBindingUpdateUnusedWhilePending` indicates whether the
implementation supports updating descriptors while the set is in use.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be
used.

* 

`descriptorBindingPartiallyBound` indicates whether the
implementation supports statically using a descriptor set binding in
which some descriptors are not valid.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used.

* 

`descriptorBindingVariableDescriptorCount` indicates whether the
implementation supports descriptor sets with a variable-sized last
binding.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be
used.

* 

`runtimeDescriptorArray` indicates whether the implementation
supports the SPIR-V `RuntimeDescriptorArray` capability.
If this feature is not enabled, descriptors **must** not be declared in
runtime arrays.

If the `VkPhysicalDeviceDescriptorIndexingFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDescriptorIndexingFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorIndexingFeatures-sType-sType) VUID-VkPhysicalDeviceDescriptorIndexingFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCopyMemoryIndirectFeaturesNV` structure is defined
as:

// Provided by VK_NV_copy_memory_indirect
typedef struct VkPhysicalDeviceCopyMemoryIndirectFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           indirectCopy;
} VkPhysicalDeviceCopyMemoryIndirectFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `indirectCopy` indicates whether
[indirect memory to memory or, memory to image    copies](copies.html#indirect-copies) are supported.

If the `VkPhysicalDeviceCopyMemoryIndirectFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCopyMemoryIndirectFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCopyMemoryIndirectFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCopyMemoryIndirectFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_copy_memory_indirect
typedef struct VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           indirectMemoryCopy;
    VkBool32           indirectMemoryToImageCopy;
} VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `indirectMemoryCopy` indicates
whether [indirect memory to memory copies](copies.html#indirect-copies) are
supported.

* 
 `indirectMemoryToImageCopy`
indicates whether [indirect memory to image copies](copies.html#indirect-copies)
are supported.

If the `VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVertexAttributeDivisorFeatures` structure is
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVertexAttributeDivisorFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vertexAttributeInstanceRateDivisor;
    VkBool32           vertexAttributeInstanceRateZeroDivisor;
} VkPhysicalDeviceVertexAttributeDivisorFeatures;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkPhysicalDeviceVertexAttributeDivisorFeatures
typedef VkPhysicalDeviceVertexAttributeDivisorFeatures VkPhysicalDeviceVertexAttributeDivisorFeaturesKHR;

// Provided by VK_EXT_vertex_attribute_divisor
// Equivalent to VkPhysicalDeviceVertexAttributeDivisorFeatures
typedef VkPhysicalDeviceVertexAttributeDivisorFeatures VkPhysicalDeviceVertexAttributeDivisorFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`vertexAttributeInstanceRateDivisor` specifies whether vertex
attribute fetching may be repeated in the case of instanced rendering.

* 

`vertexAttributeInstanceRateZeroDivisor` specifies whether a zero
value for [VkVertexInputBindingDivisorDescriptionEXT](fxvertex.html#VkVertexInputBindingDivisorDescriptionEXT)::`divisor`
is supported.

If the `VkPhysicalDeviceVertexAttributeDivisorFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVertexAttributeDivisorFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVertexAttributeDivisorFeatures-sType-sType) VUID-VkPhysicalDeviceVertexAttributeDivisorFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceASTCDecodeFeaturesEXT` structure is defined as:

// Provided by VK_EXT_astc_decode_mode
typedef struct VkPhysicalDeviceASTCDecodeFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           decodeModeSharedExponent;
} VkPhysicalDeviceASTCDecodeFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`decodeModeSharedExponent` indicates whether the implementation
supports decoding ASTC compressed formats to
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](formats.html#VkFormat) internal precision.

If the `VkPhysicalDeviceASTCDecodeFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceASTCDecodeFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceASTCDecodeFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceASTCDecodeFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ASTC_DECODE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTransformFeedbackFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_transform_feedback
typedef struct VkPhysicalDeviceTransformFeedbackFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           transformFeedback;
    VkBool32           geometryStreams;
} VkPhysicalDeviceTransformFeedbackFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `transformFeedback` indicates whether
the implementation supports transform feedback and shader modules **can**
declare the `TransformFeedback` capability.

* 
 `geometryStreams` indicates whether the
implementation supports the `GeometryStreams` SPIR-V capability.

If the `VkPhysicalDeviceTransformFeedbackFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTransformFeedbackFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTransformFeedbackFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceTransformFeedbackFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVulkanMemoryModelFeatures` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceVulkanMemoryModelFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vulkanMemoryModel;
    VkBool32           vulkanMemoryModelDeviceScope;
    VkBool32           vulkanMemoryModelAvailabilityVisibilityChains;
} VkPhysicalDeviceVulkanMemoryModelFeatures;

// Provided by VK_KHR_vulkan_memory_model
// Equivalent to VkPhysicalDeviceVulkanMemoryModelFeatures
typedef VkPhysicalDeviceVulkanMemoryModelFeatures VkPhysicalDeviceVulkanMemoryModelFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `vulkanMemoryModel`
indicates whether shader modules **can** declare the `VulkanMemoryModel`
capability.

* 

`vulkanMemoryModelDeviceScope` indicates whether the Vulkan Memory
Model can use `Device` scope synchronization.
This also indicates whether shader modules **can** declare the
`VulkanMemoryModelDeviceScope` capability.

* 

`vulkanMemoryModelAvailabilityVisibilityChains` indicates whether
the Vulkan Memory Model can use [    availability and visibility chains](../appendices/memorymodel.html#memory-model-availability-visibility) with more than one element.

If the `VkPhysicalDeviceVulkanMemoryModelFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVulkanMemoryModelFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkanMemoryModelFeatures-sType-sType) VUID-VkPhysicalDeviceVulkanMemoryModelFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_MEMORY_MODEL_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceInlineUniformBlockFeatures` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceInlineUniformBlockFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           inlineUniformBlock;
    VkBool32           descriptorBindingInlineUniformBlockUpdateAfterBind;
} VkPhysicalDeviceInlineUniformBlockFeatures;

// Provided by VK_EXT_inline_uniform_block
// Equivalent to VkPhysicalDeviceInlineUniformBlockFeatures
typedef VkPhysicalDeviceInlineUniformBlockFeatures VkPhysicalDeviceInlineUniformBlockFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `inlineUniformBlock`
indicates whether the implementation supports inline uniform block
descriptors.
If this feature is not enabled,
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType) **must** not be used.

* 

`descriptorBindingInlineUniformBlockUpdateAfterBind`
indicates whether the implementation supports updating inline uniform
block descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType).

If the `VkPhysicalDeviceInlineUniformBlockFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceInlineUniformBlockFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInlineUniformBlockFeatures-sType-sType) VUID-VkPhysicalDeviceInlineUniformBlockFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV` structure is
defined as:

// Provided by VK_NV_representative_fragment_test
typedef struct VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           representativeFragmentTest;
} VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `representativeFragmentTest`
indicates whether the implementation supports the representative
fragment test.
See [Representative Fragment Test](fragops.html#fragops-rep-frag-test).

If the `VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_REPRESENTATIVE_FRAGMENT_TEST_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExclusiveScissorFeaturesNV` structure is defined
as:

// Provided by VK_NV_scissor_exclusive
typedef struct VkPhysicalDeviceExclusiveScissorFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           exclusiveScissor;
} VkPhysicalDeviceExclusiveScissorFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `exclusiveScissor` indicates that the
implementation supports the exclusive scissor test.

See [Exclusive Scissor Test](fragops.html#fragops-exclusive-scissor) for more
information.

If the `VkPhysicalDeviceExclusiveScissorFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExclusiveScissorFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExclusiveScissorFeaturesNV-sType-sType) VUID-VkPhysicalDeviceExclusiveScissorFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXCLUSIVE_SCISSOR_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCornerSampledImageFeaturesNV` structure is defined
as:

// Provided by VK_NV_corner_sampled_image
typedef struct VkPhysicalDeviceCornerSampledImageFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cornerSampledImage;
} VkPhysicalDeviceCornerSampledImageFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `cornerSampledImage` specifies
whether images can be created with a
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags` containing
[VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits).
See [Corner-Sampled Images](resources.html#resources-images-corner-sampled).

If the `VkPhysicalDeviceCornerSampledImageFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCornerSampledImageFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCornerSampledImageFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCornerSampledImageFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CORNER_SAMPLED_IMAGE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_compute_shader_derivatives
typedef struct VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           computeDerivativeGroupQuads;
    VkBool32           computeDerivativeGroupLinear;
} VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR;

// Provided by VK_NV_compute_shader_derivatives
// Equivalent to VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR
typedef VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR VkPhysicalDeviceComputeShaderDerivativesFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`computeDerivativeGroupQuads` indicates that the implementation
supports the `ComputeDerivativeGroupQuadsKHR` SPIR-V capability.

* 

`computeDerivativeGroupLinear` indicates that the implementation
supports the `ComputeDerivativeGroupLinearKHR` SPIR-V capability.

See [Quad shader scope](shaders.html#shaders-scope-quad) for more information.

If the `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR`. structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR`., it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shader_barycentric
typedef struct VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentShaderBarycentric;
} VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR;

// Provided by VK_NV_fragment_shader_barycentric
// Equivalent to VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR
typedef VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR VkPhysicalDeviceFragmentShaderBarycentricFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentShaderBarycentric`
indicates that the implementation supports the `BaryCoordKHR` and
`BaryCoordNoPerspKHR` SPIR-V fragment shader built-ins and supports
the `PerVertexKHR` SPIR-V decoration on fragment shader input
variables.

See [Barycentric Interpolation](primsrast.html#primsrast-barycentric) for more
information.

If the `VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderImageFootprintFeaturesNV` structure is
defined as:

// Provided by VK_NV_shader_image_footprint
typedef struct VkPhysicalDeviceShaderImageFootprintFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageFootprint;
} VkPhysicalDeviceShaderImageFootprintFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `imageFootprint` specifies whether the
implementation supports the `ImageFootprintNV` SPIR-V capability.

See [Texel Footprint Evaluation](textures.html#textures-footprint) for more information.

If the `VkPhysicalDeviceShaderImageFootprintFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderImageFootprintFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderImageFootprintFeaturesNV-sType-sType) VUID-VkPhysicalDeviceShaderImageFootprintFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_IMAGE_FOOTPRINT_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShadingRateImageFeaturesNV` structure is defined
as:

// Provided by VK_NV_shading_rate_image
typedef struct VkPhysicalDeviceShadingRateImageFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shadingRateImage;
    VkBool32           shadingRateCoarseSampleOrder;
} VkPhysicalDeviceShadingRateImageFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shadingRateImage` indicates that the
implementation supports the use of a shading rate image to derive an
effective shading rate for fragment processing.
It also indicates that the implementation supports the
`ShadingRateNV` SPIR-V execution mode.

* 

`shadingRateCoarseSampleOrder` indicates that the implementation
supports an application-configurable ordering of coverage samples in
fragments larger than one pixel.

See [Shading Rate Image](primsrast.html#primsrast-shading-rate-image) for more
information.

If the `VkPhysicalDeviceShadingRateImageFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShadingRateImageFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShadingRateImageFeaturesNV-sType-sType) VUID-VkPhysicalDeviceShadingRateImageFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADING_RATE_IMAGE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentDensityMapFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_fragment_density_map
typedef struct VkPhysicalDeviceFragmentDensityMapFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentDensityMap;
    VkBool32           fragmentDensityMapDynamic;
    VkBool32           fragmentDensityMapNonSubsampledImages;
} VkPhysicalDeviceFragmentDensityMapFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentDensityMap` specifies
whether the implementation supports render passes with a fragment
density map attachment.
If this feature is not enabled and the `pNext` chain of
[VkRenderPassCreateInfo](renderpass.html#VkRenderPassCreateInfo) includes a
[VkRenderPassFragmentDensityMapCreateInfoEXT](renderpass.html#VkRenderPassFragmentDensityMapCreateInfoEXT) structure,
`fragmentDensityMapAttachment` **must** be [VK_ATTACHMENT_UNUSED](renderpass.html#VK_ATTACHMENT_UNUSED).

* 
 `fragmentDensityMapDynamic`
specifies whether the implementation supports dynamic fragment density
map image views.
If this feature is not enabled,
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](resources.html#VkImageViewCreateFlagBits) **must**
not be included in [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`flags`.

* 

`fragmentDensityMapNonSubsampledImages` specifies whether the
implementation supports regular non-subsampled image attachments with
fragment density map render passes.
If this feature is not enabled, render passes with a
[fragment density map    attachment](renderpass.html#renderpass-fragmentdensitymapattachment) **must** only have [subsampled    attachments](samplers.html#samplers-subsamplesampler) bound.

If the `VkPhysicalDeviceFragmentDensityMapFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentDensityMapFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentDensityMap2FeaturesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map2
typedef struct VkPhysicalDeviceFragmentDensityMap2FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentDensityMapDeferred;
} VkPhysicalDeviceFragmentDensityMap2FeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentDensityMapDeferred`
specifies whether the implementation supports deferred reads of fragment
density map image views.
If this feature is not enabled,
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](resources.html#VkImageViewCreateFlagBits) **must**
not be included in `VkImageViewCreateInfo`::`flags`.

If the `VkPhysicalDeviceFragmentDensityMap2FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentDensityMap2FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMap2FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMap2FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_2_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map_offset
typedef struct VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentDensityMapOffset;
} VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT;

// Provided by VK_QCOM_fragment_density_map_offset
// Equivalent to VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT
typedef VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT VkPhysicalDeviceFragmentDensityMapOffsetFeaturesQCOM;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentDensityMapOffset`
specifies whether the implementation supports
[fragment density map offsets](renderpass.html#renderpass-fragmentdensitymapoffsets)

If the `VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE` structure
is defined as:

// Provided by VK_VALVE_fragment_density_map_layered
typedef struct VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentDensityMapLayered;
} VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentDensityMapLayered`
specifies whether the implementation supports layered fragment density
maps.

If the `VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_LAYERED_FEATURES_VALVE](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceInvocationMaskFeaturesHUAWEI` structure is defined
as:

// Provided by VK_HUAWEI_invocation_mask
typedef struct VkPhysicalDeviceInvocationMaskFeaturesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           invocationMask;
} VkPhysicalDeviceInvocationMaskFeaturesHUAWEI;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `invocationMask` indicates that the
implementation supports the use of an invocation mask image to optimize
the ray dispatch.

If the `VkPhysicalDeviceInvocationMaskFeaturesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceInvocationMaskFeaturesHUAWEI`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInvocationMaskFeaturesHUAWEI-sType-sType) VUID-VkPhysicalDeviceInvocationMaskFeaturesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INVOCATION_MASK_FEATURES_HUAWEI](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceScalarBlockLayoutFeatures` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceScalarBlockLayoutFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           scalarBlockLayout;
} VkPhysicalDeviceScalarBlockLayoutFeatures;

// Provided by VK_EXT_scalar_block_layout
// Equivalent to VkPhysicalDeviceScalarBlockLayoutFeatures
typedef VkPhysicalDeviceScalarBlockLayoutFeatures VkPhysicalDeviceScalarBlockLayoutFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `scalarBlockLayout`
indicates that the implementation supports the layout of resource blocks
in shaders using [scalar    alignment](interfaces.html#interfaces-alignment-requirements).

If the `VkPhysicalDeviceScalarBlockLayoutFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceScalarBlockLayoutFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceScalarBlockLayoutFeatures-sType-sType) VUID-VkPhysicalDeviceScalarBlockLayoutFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCALAR_BLOCK_LAYOUT_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceUniformBufferStandardLayoutFeatures` structure is
defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceUniformBufferStandardLayoutFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           uniformBufferStandardLayout;
} VkPhysicalDeviceUniformBufferStandardLayoutFeatures;

// Provided by VK_KHR_uniform_buffer_standard_layout
// Equivalent to VkPhysicalDeviceUniformBufferStandardLayoutFeatures
typedef VkPhysicalDeviceUniformBufferStandardLayoutFeatures VkPhysicalDeviceUniformBufferStandardLayoutFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`uniformBufferStandardLayout` indicates that the implementation
supports the same layouts for uniform buffers as for storage and other
kinds of buffers.
See [Standard Buffer Layout](interfaces.html#interfaces-resources-standard-layout).

If the `VkPhysicalDeviceUniformBufferStandardLayoutFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceUniformBufferStandardLayoutFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceUniformBufferStandardLayoutFeatures-sType-sType) VUID-VkPhysicalDeviceUniformBufferStandardLayoutFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFORM_BUFFER_STANDARD_LAYOUT_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDepthClipEnableFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_depth_clip_enable
typedef struct VkPhysicalDeviceDepthClipEnableFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           depthClipEnable;
} VkPhysicalDeviceDepthClipEnableFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `depthClipEnable` indicates that the
implementation supports setting the depth clipping operation explicitly
via the [VkPipelineRasterizationDepthClipStateCreateInfoEXT](primsrast.html#VkPipelineRasterizationDepthClipStateCreateInfoEXT)
pipeline state.
Otherwise depth clipping is only enabled when
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo)::`depthClampEnable` is
[VK_FALSE](fundamentals.html#VK_FALSE).

If the `VkPhysicalDeviceDepthClipEnableFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDepthClipEnableFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthClipEnableFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDepthClipEnableFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLIP_ENABLE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMemoryPriorityFeaturesEXT` structure is defined as:

// Provided by VK_EXT_memory_priority
typedef struct VkPhysicalDeviceMemoryPriorityFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           memoryPriority;
} VkPhysicalDeviceMemoryPriorityFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `memoryPriority` indicates that the
implementation supports memory priorities specified at memory allocation
time via [VkMemoryPriorityAllocateInfoEXT](memory.html#VkMemoryPriorityAllocateInfoEXT).

If the `VkPhysicalDeviceMemoryPriorityFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMemoryPriorityFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryPriorityFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMemoryPriorityFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PRIORITY_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceBufferDeviceAddressFeatures` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceBufferDeviceAddressFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           bufferDeviceAddress;
    VkBool32           bufferDeviceAddressCaptureReplay;
    VkBool32           bufferDeviceAddressMultiDevice;
} VkPhysicalDeviceBufferDeviceAddressFeatures;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkPhysicalDeviceBufferDeviceAddressFeatures
typedef VkPhysicalDeviceBufferDeviceAddressFeatures VkPhysicalDeviceBufferDeviceAddressFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`bufferDeviceAddress` indicates that the implementation supports
accessing buffer memory in shaders as storage buffers via an address
queried from [vkGetBufferDeviceAddress](resources.html#vkGetBufferDeviceAddress).

* 

`bufferDeviceAddressCaptureReplay` indicates that the implementation
supports saving and reusing buffer and device addresses, e.g. for trace
capture and replay.

* 

`bufferDeviceAddressMultiDevice` indicates that the implementation
supports the `bufferDeviceAddress`
, `rayTracingPipeline` and `rayQuery` features
for logical devices created with multiple physical devices.
If this feature is not supported, buffer
and acceleration structure
addresses **must** not be queried on a logical device created with more
than one physical device.

|  | `bufferDeviceAddressMultiDevice` exists to allow certain legacy
| --- | --- |
platforms to be able to support `bufferDeviceAddress` without needing to
support shared GPU virtual addresses for multi-device configurations. |

See [vkGetBufferDeviceAddress](resources.html#vkGetBufferDeviceAddress) for more information.

If the `VkPhysicalDeviceBufferDeviceAddressFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceBufferDeviceAddressFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBufferDeviceAddressFeatures-sType-sType) VUID-VkPhysicalDeviceBufferDeviceAddressFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_buffer_device_address
typedef struct VkPhysicalDeviceBufferDeviceAddressFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           bufferDeviceAddress;
    VkBool32           bufferDeviceAddressCaptureReplay;
    VkBool32           bufferDeviceAddressMultiDevice;
} VkPhysicalDeviceBufferDeviceAddressFeaturesEXT;

// Provided by VK_EXT_buffer_device_address
// Equivalent to VkPhysicalDeviceBufferDeviceAddressFeaturesEXT
typedef VkPhysicalDeviceBufferDeviceAddressFeaturesEXT VkPhysicalDeviceBufferAddressFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `bufferDeviceAddress` indicates
that the implementation supports accessing buffer memory in shaders as
storage buffers via an address queried from
[vkGetBufferDeviceAddressEXT](resources.html#vkGetBufferDeviceAddressEXT).

* 

`bufferDeviceAddressCaptureReplay` indicates that the implementation
supports saving and reusing buffer addresses, e.g. for trace capture and
replay.

* 

`bufferDeviceAddressMultiDevice` indicates that the implementation
supports the [    `bufferDeviceAddress`](#features-bufferDeviceAddressEXT) feature for logical devices created with
multiple physical devices.
If this feature is not supported, buffer addresses **must** not be queried
on a logical device created with more than one physical device.

If the `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

|  | The `VkPhysicalDeviceBufferDeviceAddressFeaturesEXT` structure has the
| --- | --- |
same members as the `VkPhysicalDeviceBufferDeviceAddressFeatures`
structure, but the functionality indicated by the members is expressed
differently.
The features indicated by the
`VkPhysicalDeviceBufferDeviceAddressFeatures` structure requires
additional flags to be passed at memory allocation time, and the capture and
replay mechanism is built around opaque capture addresses for buffer and
memory objects. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBufferDeviceAddressFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceBufferDeviceAddressFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV`
structure is defined as:

// Provided by VK_NV_dedicated_allocation_image_aliasing
typedef struct VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dedicatedAllocationImageAliasing;
} VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`dedicatedAllocationImageAliasing` indicates that the implementation
supports aliasing of compatible image objects on a dedicated allocation.

If the `VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV-sType-sType) VUID-VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEDICATED_ALLOCATION_IMAGE_ALIASING_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImagelessFramebufferFeatures` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceImagelessFramebufferFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imagelessFramebuffer;
} VkPhysicalDeviceImagelessFramebufferFeatures;

// Provided by VK_KHR_imageless_framebuffer
// Equivalent to VkPhysicalDeviceImagelessFramebufferFeatures
typedef VkPhysicalDeviceImagelessFramebufferFeatures VkPhysicalDeviceImagelessFramebufferFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`imagelessFramebuffer` indicates that the implementation supports
specifying the image view for attachments at render pass begin time via
[VkRenderPassAttachmentBeginInfo](renderpass.html#VkRenderPassAttachmentBeginInfo).

If the `VkPhysicalDeviceImagelessFramebufferFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImagelessFramebufferFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImagelessFramebufferFeatures-sType-sType) VUID-VkPhysicalDeviceImagelessFramebufferFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGELESS_FRAMEBUFFER_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_shader_interlock
typedef struct VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentShaderSampleInterlock;
    VkBool32           fragmentShaderPixelInterlock;
    VkBool32           fragmentShaderShadingRateInterlock;
} VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`fragmentShaderSampleInterlock` indicates that the implementation
supports the `FragmentShaderSampleInterlockEXT` SPIR-V capability.

* 

`fragmentShaderPixelInterlock` indicates that the implementation
supports the `FragmentShaderPixelInterlockEXT` SPIR-V capability.

* 

`fragmentShaderShadingRateInterlock` indicates that the
implementation supports the `FragmentShaderShadingRateInterlockEXT`
SPIR-V capability.

If the `VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_INTERLOCK_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCooperativeMatrixFeaturesNV` structure is defined
as:

// Provided by VK_NV_cooperative_matrix
typedef struct VkPhysicalDeviceCooperativeMatrixFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeMatrix;
    VkBool32           cooperativeMatrixRobustBufferAccess;
} VkPhysicalDeviceCooperativeMatrixFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `cooperativeMatrix` indicates that
the implementation supports the `CooperativeMatrixNV` SPIR-V
capability.

* 

`cooperativeMatrixRobustBufferAccess` indicates that the
implementation supports implementation supports
[robust buffer access](shaders.html#shaders-robust-buffer-access) for SPIR-V
`OpCooperativeMatrixLoadNV` and `OpCooperativeMatrixStoreNV`
instructions.

If the `VkPhysicalDeviceCooperativeMatrixFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCooperativeMatrixFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCooperativeMatrixFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_cooperative_matrix
typedef struct VkPhysicalDeviceCooperativeMatrixFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeMatrix;
    VkBool32           cooperativeMatrixRobustBufferAccess;
} VkPhysicalDeviceCooperativeMatrixFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `cooperativeMatrix` indicates that
the implementation supports the `CooperativeMatrixKHR` SPIR-V
capability.

* 

`cooperativeMatrixRobustBufferAccess` indicates that the
implementation supports [robust buffer    access](shaders.html#shaders-robust-buffer-access) for SPIR-V `OpCooperativeMatrixLoadKHR` and
`OpCooperativeMatrixStoreKHR` instructions.

If the `VkPhysicalDeviceCooperativeMatrixFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCooperativeMatrixFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM` structure
is defined as:

// Provided by VK_QCOM_cooperative_matrix_conversion
typedef struct VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeMatrixConversion;
} VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixConversion` indicates that the implementation
supports the `CooperativeMatrixConversionQCOM` SPIR-V capability.

If the `VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_CONVERSION_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCooperativeMatrix2FeaturesNV` structure is defined
as:

// Provided by VK_NV_cooperative_matrix2
typedef struct VkPhysicalDeviceCooperativeMatrix2FeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeMatrixWorkgroupScope;
    VkBool32           cooperativeMatrixFlexibleDimensions;
    VkBool32           cooperativeMatrixReductions;
    VkBool32           cooperativeMatrixConversions;
    VkBool32           cooperativeMatrixPerElementOperations;
    VkBool32           cooperativeMatrixTensorAddressing;
    VkBool32           cooperativeMatrixBlockLoads;
} VkPhysicalDeviceCooperativeMatrix2FeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixWorkgroupScope` indicates that the implementation
supports workgroup scope cooperative matrices.

* 

`cooperativeMatrixFlexibleDimensions` indicates that the
implementation supports cooperative matrix sizes that are a multiple of
the granularity advertised in
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV).

* 

`cooperativeMatrixReductions` indicates that the implementation
supports the `CooperativeMatrixReductionsNV` SPIR-V capability.
This allows performing (row, column, 2x2, or all element) reductions on
matrices.

* 

`cooperativeMatrixConversions` indicates that the implementation
supports the `CooperativeMatrixConversionsNV` SPIR-V capability.
This allows converting accumulator matrices to A or B matrices.

* 

`cooperativeMatrixPerElementOperations` indicates that the
implementation supports the `CooperativeMatrixPerElementOperationsNV`
SPIR-V capability.
This allows performing element-wise operations on matrix elements using
a callback function.

* 

`cooperativeMatrixTensorAddressing` indicates that the
implementation supports the `TensorAddressingNV` and
`CooperativeMatrixTensorAddressingNV` SPIR-V capabilities.
This allows using tensor layout and tensor view types for matrix loads
and stores.

* 

`cooperativeMatrixBlockLoads` indicates that the implementation
supports the `CooperativeMatrixBlockLoadsNV` SPIR-V capability.
This allows setting block size for loads and using a callback function
to decode block elements.

If the `VkPhysicalDeviceCooperativeMatrix2FeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCooperativeMatrix2FeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrix2FeaturesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrix2FeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_2_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCooperativeVectorFeaturesNV` structure is defined
as:

// Provided by VK_NV_cooperative_vector
typedef struct VkPhysicalDeviceCooperativeVectorFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeVector;
    VkBool32           cooperativeVectorTraining;
} VkPhysicalDeviceCooperativeVectorFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `cooperativeVector` indicates that
the implementation supports the `CooperativeVectorNV` SPIR-V
capability.

* 
 `cooperativeVectorTraining`
indicates that the implementation supports the
`CooperativeVectorTrainingNV` SPIR-V capability.

If the `VkPhysicalDeviceCooperativeVectorFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCooperativeVectorFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeVectorFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeVectorFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_VECTOR_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderLongVectorFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_shader_long_vector
typedef struct VkPhysicalDeviceShaderLongVectorFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           longVector;
} VkPhysicalDeviceShaderLongVectorFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `longVector` indicates that the
implementation supports the `LongVectorEXT` SPIR-V capability.

If the `VkPhysicalDeviceShaderLongVectorFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderLongVectorFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderLongVectorFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderLongVectorFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_LONG_VECTOR_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceYcbcrImageArraysFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_ycbcr_image_arrays
typedef struct VkPhysicalDeviceYcbcrImageArraysFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           ycbcrImageArrays;
} VkPhysicalDeviceYcbcrImageArraysFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `ycbcrImageArrays` indicates that the
implementation supports creating images with a format that requires
[Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) and
has multiple array layers.

If the `VkPhysicalDeviceYcbcrImageArraysFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceYcbcrImageArraysFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceYcbcrImageArraysFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceYcbcrImageArraysFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_IMAGE_ARRAYS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures` structure is
defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupExtendedTypes;
} VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures;

// Provided by VK_KHR_shader_subgroup_extended_types
// Equivalent to VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures
typedef VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures VkPhysicalDeviceShaderSubgroupExtendedTypesFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderSubgroupExtendedTypes` is a boolean specifying whether
subgroup operations can use 8-bit integer, 16-bit integer, 64-bit
integer, 16-bit floating-point, and vectors of these types in
[group operations](shaders.html#shaders-group-operations) with
[subgroup scope](shaders.html#shaders-scope-subgroup), if the implementation
supports the types.

If the `VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures-sType-sType) VUID-VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceHostQueryResetFeatures` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceHostQueryResetFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hostQueryReset;
} VkPhysicalDeviceHostQueryResetFeatures;

// Provided by VK_EXT_host_query_reset
// Equivalent to VkPhysicalDeviceHostQueryResetFeatures
typedef VkPhysicalDeviceHostQueryResetFeatures VkPhysicalDeviceHostQueryResetFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `hostQueryReset`
indicates that the implementation supports resetting queries from the
host with [vkResetQueryPool](queries.html#vkResetQueryPool).

If the `VkPhysicalDeviceHostQueryResetFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceHostQueryResetFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceHostQueryResetFeatures-sType-sType) VUID-VkPhysicalDeviceHostQueryResetFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_QUERY_RESET_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL` structure is
defined as:

// Provided by VK_INTEL_shader_integer_functions2
typedef struct VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderIntegerFunctions2;
} VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderIntegerFunctions2`
indicates that the implementation supports the
`IntegerFunctions2INTEL` SPIR-V capability.

If the `VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTELfeatures`. structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTELfeatures`., it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL-sType-sType) VUID-VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_FUNCTIONS_2_FEATURES_INTEL](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCoverageReductionModeFeaturesNV` structure is
defined as:

// Provided by VK_NV_coverage_reduction_mode
typedef struct VkPhysicalDeviceCoverageReductionModeFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           coverageReductionMode;
} VkPhysicalDeviceCoverageReductionModeFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `coverageReductionMode` indicates
whether the implementation supports coverage reduction modes.
See [Coverage Reduction](fragops.html#fragops-coverage-reduction).

If the `VkPhysicalDeviceCoverageReductionModeFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCoverageReductionModeFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCoverageReductionModeFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCoverageReductionModeFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COVERAGE_REDUCTION_MODE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTimelineSemaphoreFeatures` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceTimelineSemaphoreFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           timelineSemaphore;
} VkPhysicalDeviceTimelineSemaphoreFeatures;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkPhysicalDeviceTimelineSemaphoreFeatures
typedef VkPhysicalDeviceTimelineSemaphoreFeatures VkPhysicalDeviceTimelineSemaphoreFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `timelineSemaphore`
indicates whether semaphores created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) are supported.

If the `VkPhysicalDeviceTimelineSemaphoreFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTimelineSemaphoreFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTimelineSemaphoreFeatures-sType-sType) VUID-VkPhysicalDeviceTimelineSemaphoreFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR` structure
is defined as:

// Provided by VK_KHR_internally_synchronized_queues
typedef struct VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           internallySynchronizedQueues;
} VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`internallySynchronizedQueues` indicates that
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits) can be used
to make queues internally synchronized.

If the `VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INTERNALLY_SYNCHRONIZED_QUEUES_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure is
defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           screenBufferImport;
} VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX;

The members of the
`VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure
describe the following features:

* 
 `screenBufferImport` indicates
whether QNX Screen buffer import functionality is supported.
If `screenBufferImport` is [VK_TRUE](fundamentals.html#VK_TRUE), [VkDeviceMemory](memory.html#VkDeviceMemory)
supports importing `_screen_buffer` from applications.
In this case, the application is responsible for the resource management
of the `_screen_buffer`.

| Features | Functionality |
| --- | --- |
| `screenBufferImport` | [VkImportScreenBufferInfoQNX](memory.html#VkImportScreenBufferInfoQNX) |
| Always supported1 | [vkGetScreenBufferPropertiesQNX](memory.html#vkGetScreenBufferPropertiesQNX), [VkScreenBufferPropertiesQNX](memory.html#VkScreenBufferPropertiesQNX), [VkScreenBufferFormatPropertiesQNX](memory.html#VkScreenBufferFormatPropertiesQNX),
[VkExternalFormatQNX](resources.html#VkExternalFormatQNX) |

1

Functionality in this row is always available.

The [Functionality supported for QNX Screen buffer features](#features-externalscreenbuffer-table) table summarizes the functionality enabled by the
`VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure.
Each entry in the body of the table summarizes the functionality that **can**
be used when the given features are supported and enabled.
This summarizes Valid Usage statements that are added elsewhere in this
specification.

If the `VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX-sType-sType) VUID-VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_SCREEN_BUFFER_FEATURES_QNX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceIndexTypeUint8Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceIndexTypeUint8Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           indexTypeUint8;
} VkPhysicalDeviceIndexTypeUint8Features;

// Provided by VK_KHR_index_type_uint8
// Equivalent to VkPhysicalDeviceIndexTypeUint8Features
typedef VkPhysicalDeviceIndexTypeUint8Features VkPhysicalDeviceIndexTypeUint8FeaturesKHR;

// Provided by VK_EXT_index_type_uint8
// Equivalent to VkPhysicalDeviceIndexTypeUint8Features
typedef VkPhysicalDeviceIndexTypeUint8Features VkPhysicalDeviceIndexTypeUint8FeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `indexTypeUint8`
    indicates that [VK_INDEX_TYPE_UINT8](drawing.html#VkIndexType) can be used with
[vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2) and
    [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer).

If the `VkPhysicalDeviceIndexTypeUint8Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceIndexTypeUint8Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceIndexTypeUint8Features-sType-sType) VUID-VkPhysicalDeviceIndexTypeUint8Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT` structure
is defined as:

// Provided by VK_EXT_primitive_topology_list_restart
typedef struct VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           primitiveTopologyListRestart;
    VkBool32           primitiveTopologyPatchListRestart;
} VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`primitiveTopologyListRestart` indicates that list type primitives,
[VK_PRIMITIVE_TOPOLOGY_POINT_LIST](drawing.html#VkPrimitiveTopology),
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST](drawing.html#VkPrimitiveTopology),
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST](drawing.html#VkPrimitiveTopology),
[VK_PRIMITIVE_TOPOLOGY_LINE_LIST_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology) and
[VK_PRIMITIVE_TOPOLOGY_TRIANGLE_LIST_WITH_ADJACENCY](drawing.html#VkPrimitiveTopology), **can** use the
primitive restart index value in index buffers.

* 

`primitiveTopologyPatchListRestart` indicates that the
[VK_PRIMITIVE_TOPOLOGY_PATCH_LIST](drawing.html#VkPrimitiveTopology) topology **can** use the primitive
restart index value in index buffers.

If the `VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVE_TOPOLOGY_LIST_RESTART_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderSMBuiltinsFeaturesNV` structure is defined
as:

// Provided by VK_NV_shader_sm_builtins
typedef struct VkPhysicalDeviceShaderSMBuiltinsFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSMBuiltins;
} VkPhysicalDeviceShaderSMBuiltinsFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderSMBuiltins` indicates whether
the implementation supports the SPIR-V `ShaderSMBuiltinsNV`
capability.

If the `VkPhysicalDeviceShaderSMBuiltinsFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderSMBuiltinsFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSMBuiltinsFeaturesNV-sType-sType) VUID-VkPhysicalDeviceShaderSMBuiltinsFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SM_BUILTINS_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures` structure is
defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           separateDepthStencilLayouts;
} VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures;

// Provided by VK_KHR_separate_depth_stencil_layouts
// Equivalent to VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures
typedef VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures VkPhysicalDeviceSeparateDepthStencilLayoutsFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`separateDepthStencilLayouts` indicates whether the implementation
supports a `VkImageMemoryBarrier` for a depth/stencil image with
only one of [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits) set, and whether
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout) can be used.

If the `VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures-sType-sType) VUID-VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SEPARATE_DEPTH_STENCIL_LAYOUTS_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR` structure
is defined as:

// Provided by VK_KHR_pipeline_executable_properties
typedef struct VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineExecutableInfo;
} VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pipelineExecutableInfo`
indicates that the implementation supports reporting properties and
statistics about the pipeline executables associated with a compiled
pipeline.

If the `VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_EXECUTABLE_PROPERTIES_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures` structure
is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderDemoteToHelperInvocation;
} VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures;

// Provided by VK_EXT_shader_demote_to_helper_invocation
// Equivalent to VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures
typedef VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures VkPhysicalDeviceShaderDemoteToHelperInvocationFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderDemoteToHelperInvocation` indicates whether the
implementation supports the SPIR-V `DemoteToHelperInvocationEXT`
capability.

If the `VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures-sType-sType) VUID-VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DEMOTE_TO_HELPER_INVOCATION_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_texel_buffer_alignment
typedef struct VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           texelBufferAlignment;
} VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `texelBufferAlignment` indicates
whether the implementation uses more specific alignment requirements
advertised in [VkPhysicalDeviceTexelBufferAlignmentProperties](limits.html#VkPhysicalDeviceTexelBufferAlignmentProperties)
rather than
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`minTexelBufferOffsetAlignment`.

If the `VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_attachment_feedback_loop_dynamic_state
typedef struct VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           attachmentFeedbackLoopDynamicState;
} VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`attachmentFeedbackLoopDynamicState` specifies whether dynamic
feedback loops are supported.

If the `VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ATTACHMENT_FEEDBACK_LOOP_DYNAMIC_STATE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_legacy_vertex_attributes
typedef struct VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           legacyVertexAttributes;
} VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `legacyVertexAttributes`
specifies whether compatibility features for vertex attributes are
supported when using dynamic vertex input state.

If the `VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_VERTEX_ATTRIBUTES_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTextureCompressionASTCHDRFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceTextureCompressionASTCHDRFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureCompressionASTC_HDR;
} VkPhysicalDeviceTextureCompressionASTCHDRFeatures;

// Provided by VK_EXT_texture_compression_astc_hdr
// Equivalent to VkPhysicalDeviceTextureCompressionASTCHDRFeatures
typedef VkPhysicalDeviceTextureCompressionASTCHDRFeatures VkPhysicalDeviceTextureCompressionASTCHDRFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`textureCompressionASTC_HDR` indicates whether all of the ASTC HDR
compressed texture formats are supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) features **must**
be supported in `optimalTilingFeatures` for the following formats:

[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](formats.html#VkFormat)

To query for additional properties, or if the feature is not enabled,
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) and
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) **can** be used to check for
supported properties of individual formats as normal.

If the `VkPhysicalDeviceTextureCompressionASTCHDRFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTextureCompressionASTCHDRFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTextureCompressionASTCHDRFeatures-sType-sType) VUID-VkPhysicalDeviceTextureCompressionASTCHDRFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_texture_compression_astc_3d
typedef struct VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureCompressionASTC_3D;
} VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `textureCompressionASTC_3D`
indicates whether all of the ASTC 3D compressed texture formats are
supported.
If this feature is enabled, then the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) features **must**
be supported in `optimalTilingFeatures` for the following formats:

[VK_FORMAT_ASTC_3x3x3_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_3x3x3_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_3x3x3_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x3x3_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x3x3_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x3x3_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4x3_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4x3_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4x3_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4x4_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4x4_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4x4_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4x4_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4x4_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4x4_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5x4_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5x4_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5x4_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5x5_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5x5_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5x5_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5x5_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5x5_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5x5_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6x5_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6x5_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6x5_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6x6_UNORM_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6x6_SRGB_BLOCK_EXT](formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6x6_SFLOAT_BLOCK_EXT](formats.html#VkFormat)

If the `VkPhysicalDeviceTextureCompressionASTC3DFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTextureCompressionASTC3DFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_3D_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceLineRasterizationFeatures` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceLineRasterizationFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rectangularLines;
    VkBool32           bresenhamLines;
    VkBool32           smoothLines;
    VkBool32           stippledRectangularLines;
    VkBool32           stippledBresenhamLines;
    VkBool32           stippledSmoothLines;
} VkPhysicalDeviceLineRasterizationFeatures;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationFeatures
typedef VkPhysicalDeviceLineRasterizationFeatures VkPhysicalDeviceLineRasterizationFeaturesKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationFeatures
typedef VkPhysicalDeviceLineRasterizationFeatures VkPhysicalDeviceLineRasterizationFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rectangularLines`
indicates whether the implementation supports
[rectangular line rasterization](primsrast.html#primsrast-lines).

* 
 `bresenhamLines`
indicates whether the implementation supports
[Bresenham-style line rasterization](primsrast.html#primsrast-lines-bresenham).

* 
 `smoothLines` indicates
whether the implementation supports [smooth line    rasterization](primsrast.html#primsrast-lines-smooth).

* 

`stippledRectangularLines` indicates whether the implementation
supports [stippled line rasterization](primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](primsrast.html#VkLineRasterizationModeEXT) lines.

* 

`stippledBresenhamLines` indicates whether the implementation
supports [stippled line rasterization](primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](primsrast.html#VkLineRasterizationModeEXT) lines.

* 

`stippledSmoothLines` indicates whether the implementation supports
[stippled line rasterization](primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](primsrast.html#VkLineRasterizationModeEXT) lines.

If the `VkPhysicalDeviceLineRasterizationFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceLineRasterizationFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLineRasterizationFeatures-sType-sType) VUID-VkPhysicalDeviceLineRasterizationFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSubgroupSizeControlFeatures` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceSubgroupSizeControlFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           subgroupSizeControl;
    VkBool32           computeFullSubgroups;
} VkPhysicalDeviceSubgroupSizeControlFeatures;

// Provided by VK_EXT_subgroup_size_control
// Equivalent to VkPhysicalDeviceSubgroupSizeControlFeatures
typedef VkPhysicalDeviceSubgroupSizeControlFeatures VkPhysicalDeviceSubgroupSizeControlFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`subgroupSizeControl` indicates whether the implementation supports
controlling shader subgroup sizes via the
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits)
flag and the [VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](pipelines.html#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo)
structure.

* 

`computeFullSubgroups` indicates whether the implementation supports
requiring full subgroups in compute
, mesh, or task
shaders via the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](pipelines.html#VkPipelineShaderStageCreateFlagBits) flag.

If the `VkPhysicalDeviceSubgroupSizeControlFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSubgroupSizeControlFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

|  | The `VkPhysicalDeviceSubgroupSizeControlFeaturesEXT` structure was added
| --- | --- |
in version 2 of the `[VK_EXT_subgroup_size_control](../appendices/extensions.html#VK_EXT_subgroup_size_control)` extension.
Version 1 implementations of this extension will not fill out the features
structure but applications may assume that both `subgroupSizeControl`
and `computeFullSubgroups` are supported if the extension is supported.
(See also the [Feature Requirements](#features-requirements) section.)
Applications are advised to add a
`VkPhysicalDeviceSubgroupSizeControlFeaturesEXT` structure to the
`pNext` chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) to enable the features
regardless of the version of the extension supported by the implementation.
If the implementation only supports version 1, it will safely ignore the
`VkPhysicalDeviceSubgroupSizeControlFeaturesEXT` structure.

Vulkan 1.3 implementations always support the features structure. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubgroupSizeControlFeatures-sType-sType) VUID-VkPhysicalDeviceSubgroupSizeControlFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCoherentMemoryFeaturesAMD` structure is defined as:

// Provided by VK_AMD_device_coherent_memory
typedef struct VkPhysicalDeviceCoherentMemoryFeaturesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceCoherentMemory;
} VkPhysicalDeviceCoherentMemoryFeaturesAMD;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceCoherentMemory` indicates
that the implementation supports [device    coherent memory](memory.html#VkMemoryPropertyFlagBits).

If the `VkPhysicalDeviceCoherentMemoryFeaturesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCoherentMemoryFeaturesAMD`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCoherentMemoryFeaturesAMD-sType-sType) VUID-VkPhysicalDeviceCoherentMemoryFeaturesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COHERENT_MEMORY_FEATURES_AMD](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceAccelerationStructureFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkPhysicalDeviceAccelerationStructureFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           accelerationStructure;
    VkBool32           accelerationStructureCaptureReplay;
    VkBool32           accelerationStructureIndirectBuild;
    VkBool32           accelerationStructureHostCommands;
    VkBool32           descriptorBindingAccelerationStructureUpdateAfterBind;
} VkPhysicalDeviceAccelerationStructureFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `accelerationStructure` indicates
whether the implementation supports the acceleration structure
functionality.
See [Acceleration Structures](accelstructures.html#acceleration-structure).

* 

`accelerationStructureCaptureReplay` indicates whether the
implementation supports saving and reusing acceleration structure device
addresses, e.g. for trace capture and replay.

* 

`accelerationStructureIndirectBuild` indicates whether the
implementation supports indirect acceleration structure build commands,
e.g. [vkCmdBuildAccelerationStructuresIndirectKHR](accelstructures.html#vkCmdBuildAccelerationStructuresIndirectKHR).

* 

`accelerationStructureHostCommands` indicates whether the
implementation supports host side acceleration structure commands, e.g.
[vkBuildAccelerationStructuresKHR](accelstructures.html#vkBuildAccelerationStructuresKHR),
[vkCopyAccelerationStructureKHR](accelstructures.html#vkCopyAccelerationStructureKHR),
[vkCopyAccelerationStructureToMemoryKHR](accelstructures.html#vkCopyAccelerationStructureToMemoryKHR),
[vkCopyMemoryToAccelerationStructureKHR](accelstructures.html#vkCopyMemoryToAccelerationStructureKHR),
[vkWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkWriteAccelerationStructuresPropertiesKHR).

* 

`descriptorBindingAccelerationStructureUpdateAfterBind` indicates
whether the implementation supports updating acceleration structure
descriptors after a set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType).

If the `VkPhysicalDeviceAccelerationStructureFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceAccelerationStructureFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAccelerationStructureFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceAccelerationStructureFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ACCELERATION_STRUCTURE_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingPipelineFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkPhysicalDeviceRayTracingPipelineFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingPipeline;
    VkBool32           rayTracingPipelineShaderGroupHandleCaptureReplay;
    VkBool32           rayTracingPipelineShaderGroupHandleCaptureReplayMixed;
    VkBool32           rayTracingPipelineTraceRaysIndirect;
    VkBool32           rayTraversalPrimitiveCulling;
} VkPhysicalDeviceRayTracingPipelineFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rayTracingPipeline` indicates
whether the implementation supports the ray tracing pipeline
functionality.
See [Ray Tracing](raytracing.html#ray-tracing).

* 

`rayTracingPipelineShaderGroupHandleCaptureReplay` indicates whether
the implementation supports saving and reusing shader group handles,
e.g. for trace capture and replay.

* 

`rayTracingPipelineShaderGroupHandleCaptureReplayMixed` indicates
whether the implementation supports reuse of shader group handles being
arbitrarily mixed with creation of non-reused shader group handles.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), all reused shader group handles **must** be
specified before any non-reused handles **may** be created.

* 

`rayTracingPipelineTraceRaysIndirect` indicates whether the
implementation supports indirect ray tracing commands, e.g.
[vkCmdTraceRaysIndirectKHR](raytracing.html#vkCmdTraceRaysIndirectKHR).

* 

`rayTraversalPrimitiveCulling` indicates whether the implementation
supports [primitive culling during ray    traversal](raytraversal.html#ray-traversal-culling-primitive).

If the `VkPhysicalDeviceRayTracingPipelineFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingPipelineFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03575) VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-rayTracingPipelineShaderGroupHandleCaptureReplayMixed-03575

If `rayTracingPipelineShaderGroupHandleCaptureReplayMixed` is
[VK_TRUE](fundamentals.html#VK_TRUE), `rayTracingPipelineShaderGroupHandleCaptureReplay`
**must** also be [VK_TRUE](fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceRayTracingPipelineFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayQueryFeaturesKHR` structure is defined as:

// Provided by VK_KHR_ray_query
typedef struct VkPhysicalDeviceRayQueryFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayQuery;
} VkPhysicalDeviceRayQueryFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rayQuery` indicates whether the
implementation supports ray query (`OpRayQueryProceedKHR`)
functionality.

If the `VkPhysicalDeviceRayQueryFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayQueryFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayQueryFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceRayQueryFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_QUERY_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR` structure is
defined as:

// Provided by VK_KHR_ray_tracing_maintenance1
typedef struct VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingMaintenance1;
    VkBool32           rayTracingPipelineTraceRaysIndirect2;
} VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rayTracingMaintenance1`
indicates that the implementation supports the following:

The `CullMaskKHR` SPIR-V builtin using the `SPV_KHR_ray_cull_mask`
SPIR-V extension.

* 
Additional acceleration structure property queries:
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](queries.html#VkQueryType)
and [VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](queries.html#VkQueryType).

* 
A new access flag [VK_ACCESS_2_SHADER_BINDING_TABLE_READ_BIT_KHR](synchronization.html#VkAccessFlagBits2KHR).

* 
A new pipeline stage flag bit
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

`rayTracingPipelineTraceRaysIndirect2` indicates whether the
implementation supports the extended indirect ray tracing command
[vkCmdTraceRaysIndirect2KHR](raytracing.html#vkCmdTraceRaysIndirect2KHR).

If the `VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_MAINTENANCE_1_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_quantization_map
typedef struct VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeQuantizationMap;
} VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeQuantizationMap`
indicates that the implementation supports
[video encode quantization maps](videocoding.html#encode-quantization-map).

|  | Support for `videoEncodeQuantizationMap` does not indicate that all
| --- | --- |
video encode profiles support quantization maps.
Support for quantization maps for any specific video encode profile is
subject to video-profile-specific capabilities. |

If the `VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUANTIZATION_MAP_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_video_encode_intra_refresh
typedef struct VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeIntraRefresh;
} VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeIntraRefresh`
specifies that the implementation supports [video    encode intra refresh](videocoding.html#encode-intra-refresh).

|  | Support for `videoEncodeIntraRefresh` does not indicate that all video
| --- | --- |
encode profiles support intra refresh.
Support for intra refresh for any specific video encode profile is subject
to video-profile-specific capabilities. |

If the `VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_INTRA_REFRESH_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE` structure is
defined as:

// Provided by VK_VALVE_video_encode_rgb_conversion
typedef struct VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeRgbConversion;
} VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeRgbConversion`
specifies that the implementation supports [video    encode RGB conversion](videocoding.html#encode-rgb-conversion).

If the `VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE-sType-sType) VUID-VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_RGB_CONVERSION_FEATURES_VALVE](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVideoMaintenance1FeaturesKHR` structure is defined
as:

// Provided by VK_KHR_video_maintenance1
typedef struct VkPhysicalDeviceVideoMaintenance1FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoMaintenance1;
} VkPhysicalDeviceVideoMaintenance1FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoMaintenance1` indicates that
the implementation supports the following:

The new buffer creation flag
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](resources.html#VkBufferCreateFlagBits).

* 
The new image creation flag
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](resources.html#VkImageCreateFlagBits).

* 
The new video session creation flag
[VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](videocoding.html#VkVideoSessionCreateFlagBitsKHR).

If the `VkPhysicalDeviceVideoMaintenance1FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVideoMaintenance1FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoMaintenance1FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoMaintenance1FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_1_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVideoMaintenance2FeaturesKHR` structure is defined
as:

// Provided by VK_KHR_video_maintenance2
typedef struct VkPhysicalDeviceVideoMaintenance2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoMaintenance2;
} VkPhysicalDeviceVideoMaintenance2FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoMaintenance2` specifies that
the implementation supports the following:

Support for issuing [video coding control](videocoding.html#video-coding-control)
commands against video decode sessions without a bound video session
parameters object.

* 
The new video session creation flag
[VK_VIDEO_SESSION_CREATE_INLINE_SESSION_PARAMETERS_BIT_KHR](videocoding.html#VkVideoSessionCreateFlagBitsKHR) for
video decode sessions.

* 
Required support for the [rate control     mode](videocoding.html#encode-rate-control-modes) [VK_VIDEO_ENCODE_RATE_CONTROL_MODE_DISABLED_BIT_KHR](videocoding.html#VkVideoEncodeRateControlModeFlagBitsKHR) for the
following video encode profiles:

[H.264 encode profiles](videocoding.html#encode-h264-profile);

* 
[H.265 encode profiles](videocoding.html#encode-h265-profile);

* 
[AV1 encode profiles](videocoding.html#encode-av1-profile).

Additional guarantees on Video Std parameters used with video encode
profiles that the implementations support without the need to
[override](videocoding.html#encode-overrides) them.

If the `VkPhysicalDeviceVideoMaintenance2FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVideoMaintenance2FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoMaintenance2FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoMaintenance2FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_2_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVideoEncodeAV1FeaturesKHR` structure is defined as:

// Provided by VK_KHR_video_encode_av1
typedef struct VkPhysicalDeviceVideoEncodeAV1FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoEncodeAV1;
} VkPhysicalDeviceVideoEncodeAV1FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoEncodeAV1` indicates that the
implementation supports [AV1 encode operations](videocoding.html#encode-av1).

If the `VkPhysicalDeviceVideoEncodeAV1FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVideoEncodeAV1FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoEncodeAV1FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoEncodeAV1FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_AV1_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVideoDecodeVP9FeaturesKHR` structure is defined as:

// Provided by VK_KHR_video_decode_vp9
typedef struct VkPhysicalDeviceVideoDecodeVP9FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           videoDecodeVP9;
} VkPhysicalDeviceVideoDecodeVP9FeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `videoDecodeVP9` specifies that the
implementation supports [VP9 decode operations](videocoding.html#decode-vp9).

If the `VkPhysicalDeviceVideoDecodeVP9FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVideoDecodeVP9FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVideoDecodeVP9FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceVideoDecodeVP9FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_DECODE_VP9_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExtendedDynamicStateFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_extended_dynamic_state
typedef struct VkPhysicalDeviceExtendedDynamicStateFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedDynamicState;
} VkPhysicalDeviceExtendedDynamicStateFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `extendedDynamicState` indicates
that the implementation supports the following dynamic states:

[VK_DYNAMIC_STATE_CULL_MODE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_FRONT_FACE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_STENCIL_OP](pipelines.html#VkDynamicState)

If the `VkPhysicalDeviceExtendedDynamicStateFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExtendedDynamicStateFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedDynamicStateFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceExtendedDynamicStateFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExtendedDynamicState2FeaturesEXT` structure is
defined as:

// Provided by VK_EXT_extended_dynamic_state2
typedef struct VkPhysicalDeviceExtendedDynamicState2FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedDynamicState2;
    VkBool32           extendedDynamicState2LogicOp;
    VkBool32           extendedDynamicState2PatchControlPoints;
} VkPhysicalDeviceExtendedDynamicState2FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `extendedDynamicState2` indicates
that the implementation supports the following dynamic states:

[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](pipelines.html#VkDynamicState)

`extendedDynamicState2LogicOp` indicates that the implementation
supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_LOGIC_OP_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState2PatchControlPoints` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](pipelines.html#VkDynamicState)

If the `VkPhysicalDeviceExtendedDynamicState2FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExtendedDynamicState2FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedDynamicState2FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceExtendedDynamicState2FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_2_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExtendedDynamicState3FeaturesEXT` structure is
defined as:

// Provided by VK_EXT_extended_dynamic_state3
typedef struct VkPhysicalDeviceExtendedDynamicState3FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedDynamicState3TessellationDomainOrigin;
    VkBool32           extendedDynamicState3DepthClampEnable;
    VkBool32           extendedDynamicState3PolygonMode;
    VkBool32           extendedDynamicState3RasterizationSamples;
    VkBool32           extendedDynamicState3SampleMask;
    VkBool32           extendedDynamicState3AlphaToCoverageEnable;
    VkBool32           extendedDynamicState3AlphaToOneEnable;
    VkBool32           extendedDynamicState3LogicOpEnable;
    VkBool32           extendedDynamicState3ColorBlendEnable;
    VkBool32           extendedDynamicState3ColorBlendEquation;
    VkBool32           extendedDynamicState3ColorWriteMask;
    VkBool32           extendedDynamicState3RasterizationStream;
    VkBool32           extendedDynamicState3ConservativeRasterizationMode;
    VkBool32           extendedDynamicState3ExtraPrimitiveOverestimationSize;
    VkBool32           extendedDynamicState3DepthClipEnable;
    VkBool32           extendedDynamicState3SampleLocationsEnable;
    VkBool32           extendedDynamicState3ColorBlendAdvanced;
    VkBool32           extendedDynamicState3ProvokingVertexMode;
    VkBool32           extendedDynamicState3LineRasterizationMode;
    VkBool32           extendedDynamicState3LineStippleEnable;
    VkBool32           extendedDynamicState3DepthClipNegativeOneToOne;
    VkBool32           extendedDynamicState3ViewportWScalingEnable;
    VkBool32           extendedDynamicState3ViewportSwizzle;
    VkBool32           extendedDynamicState3CoverageToColorEnable;
    VkBool32           extendedDynamicState3CoverageToColorLocation;
    VkBool32           extendedDynamicState3CoverageModulationMode;
    VkBool32           extendedDynamicState3CoverageModulationTableEnable;
    VkBool32           extendedDynamicState3CoverageModulationTable;
    VkBool32           extendedDynamicState3CoverageReductionMode;
    VkBool32           extendedDynamicState3RepresentativeFragmentTestEnable;
    VkBool32           extendedDynamicState3ShadingRateImageEnable;
} VkPhysicalDeviceExtendedDynamicState3FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`extendedDynamicState3TessellationDomainOrigin` indicates that the
implementation supports the following dynamic state:

[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3DepthClampEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_DEPTH_CLAMP_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3PolygonMode` indicates that the implementation
supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_POLYGON_MODE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3RasterizationSamples` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_RASTERIZATION_SAMPLES_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3SampleMask` indicates that the implementation
supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3AlphaToCoverageEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_ALPHA_TO_COVERAGE_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3AlphaToOneEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_ALPHA_TO_ONE_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3LogicOpEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ColorBlendEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ColorBlendEquation` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_EQUATION_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ColorWriteMask` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COLOR_WRITE_MASK_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3RasterizationStream` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_RASTERIZATION_STREAM_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ConservativeRasterizationMode` indicates that
the implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_CONSERVATIVE_RASTERIZATION_MODE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ExtraPrimitiveOverestimationSize` indicates
that the implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3DepthClipEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3SampleLocationsEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ColorBlendAdvanced` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COLOR_BLEND_ADVANCED_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ProvokingVertexMode` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_PROVOKING_VERTEX_MODE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3LineRasterizationMode` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_LINE_RASTERIZATION_MODE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3LineStippleEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE_ENABLE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3DepthClipNegativeOneToOne` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_DEPTH_CLIP_NEGATIVE_ONE_TO_ONE_EXT](pipelines.html#VkDynamicState)

`extendedDynamicState3ViewportWScalingEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_ENABLE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3ViewportSwizzle` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_VIEWPORT_SWIZZLE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3CoverageToColorEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3CoverageToColorLocation` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_LOCATION_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3CoverageModulationMode` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_MODE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3CoverageModulationTableEnable` indicates that
the implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_ENABLE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3CoverageModulationTable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3CoverageReductionMode` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3RepresentativeFragmentTestEnable` indicates
that the implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](pipelines.html#VkDynamicState)

`extendedDynamicState3ShadingRateImageEnable` indicates that the
implementation supports the following dynamic state:

* 
[VK_DYNAMIC_STATE_SHADING_RATE_IMAGE_ENABLE_NV](pipelines.html#VkDynamicState)

If the `VkPhysicalDeviceExtendedDynamicState3FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExtendedDynamicState3FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedDynamicState3FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceExtendedDynamicState3FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_3_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV` structure is
defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceGeneratedCommands;
} VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceGeneratedCommands`
indicates whether the implementation supports functionality to generate
commands on the device.
See [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

If the `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV` structure
is defined as:

// Provided by VK_NV_device_generated_commands_compute
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceGeneratedCompute;
    VkBool32           deviceGeneratedComputePipelines;
    VkBool32           deviceGeneratedComputeCaptureReplay;
} VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceGeneratedCompute`
indicates whether the implementation supports functionality to generate
dispatch commands and push constants for the compute pipeline on the
device.
See [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

* 

`deviceGeneratedComputePipelines` indicates whether the
implementation supports functionality to generate commands to bind
compute pipelines on the device.
See [Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

* 

`deviceGeneratedComputeCaptureReplay` indicates whether the
implementation supports functionality to capture compute pipeline
address and reuse later for replay in
[Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

If the `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_COMPUTE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceGeneratedCommands;
    VkBool32           dynamicGeneratedPipelineLayout;
} VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceGeneratedCommands`
indicates whether the implementation supports functionality to generate
commands on the device.

* 

`dynamicGeneratedPipelineLayout` indicates the implementation allows
the `pipelineLayout` member of
[VkIndirectCommandsLayoutCreateInfoEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoEXT) to be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
and [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo) **can** be chained off those
structures' `pNext` instead.

If the `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDiagnosticsConfigFeaturesNV` structure is defined
as:

// Provided by VK_NV_device_diagnostics_config
typedef struct VkPhysicalDeviceDiagnosticsConfigFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           diagnosticsConfig;
} VkPhysicalDeviceDiagnosticsConfigFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `diagnosticsConfig` indicates whether
the implementation supports the ability to configure diagnostic tools.

If the `VkPhysicalDeviceDiagnosticsConfigFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDiagnosticsConfigFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDiagnosticsConfigFeaturesNV-sType-sType) VUID-VkPhysicalDeviceDiagnosticsConfigFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DIAGNOSTICS_CONFIG_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV` structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkPhysicalDeviceClusterAccelerationStructureFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           clusterAccelerationStructure;
} VkPhysicalDeviceClusterAccelerationStructureFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`clusterAccelerationStructure` indicates whether the implementation
supports the ability to generate and trace cluster acceleration
structures.

If the `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterAccelerationStructureFeaturesNV-sType-sType) VUID-VkPhysicalDeviceClusterAccelerationStructureFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_ACCELERATION_STRUCTURE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`
structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           partitionedAccelerationStructure;
} VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`partitionedAccelerationStructure` indicates whether the
implementation supports the ability to generate top level partitioned
acceleration structures.

If the `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV-sType-sType) VUID-VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDeviceMemoryReportFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_device_memory_report
typedef struct VkPhysicalDeviceDeviceMemoryReportFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceMemoryReport;
} VkPhysicalDeviceDeviceMemoryReportFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceMemoryReport` indicates
whether the implementation supports the ability to register device
memory report callbacks.

If the `VkPhysicalDeviceDeviceMemoryReportFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDeviceMemoryReportFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceMemoryReportFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDeviceMemoryReportFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_MEMORY_REPORT_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceGlobalPriorityQueryFeatures` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceGlobalPriorityQueryFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           globalPriorityQuery;
} VkPhysicalDeviceGlobalPriorityQueryFeatures;

// Provided by VK_KHR_global_priority
// Equivalent to VkPhysicalDeviceGlobalPriorityQueryFeatures
typedef VkPhysicalDeviceGlobalPriorityQueryFeatures VkPhysicalDeviceGlobalPriorityQueryFeaturesKHR;

// Provided by VK_EXT_global_priority_query
// Equivalent to VkPhysicalDeviceGlobalPriorityQueryFeatures
typedef VkPhysicalDeviceGlobalPriorityQueryFeatures VkPhysicalDeviceGlobalPriorityQueryFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`globalPriorityQuery` indicates whether the implementation supports
the ability to query global queue priorities.

If the `VkPhysicalDeviceGlobalPriorityQueryFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceGlobalPriorityQueryFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGlobalPriorityQueryFeatures-sType-sType) VUID-VkPhysicalDeviceGlobalPriorityQueryFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePipelineCreationCacheControlFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDevicePipelineCreationCacheControlFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineCreationCacheControl;
} VkPhysicalDevicePipelineCreationCacheControlFeatures;

// Provided by VK_EXT_pipeline_creation_cache_control
// Equivalent to VkPhysicalDevicePipelineCreationCacheControlFeatures
typedef VkPhysicalDevicePipelineCreationCacheControlFeatures VkPhysicalDevicePipelineCreationCacheControlFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`pipelineCreationCacheControl` indicates that the implementation
supports:

The following **can** be used in `Vk*PipelineCreateInfo`::`flags`:

[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](pipelines.html#VkPipelineCreateFlagBits)

* 
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](pipelines.html#VkPipelineCreateFlagBits)

The following **can** be used in
[VkPipelineCacheCreateInfo](pipelines.html#VkPipelineCacheCreateInfo)::`flags`:

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](pipelines.html#VkPipelineCacheCreateFlagBits)

If the `VkPhysicalDevicePipelineCreationCacheControlFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelineCreationCacheControlFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineCreationCacheControlFeatures-sType-sType) VUID-VkPhysicalDevicePipelineCreationCacheControlFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderZeroInitializeWorkgroupMemory;
} VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures;

// Provided by VK_KHR_zero_initialize_workgroup_memory
// Equivalent to VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures
typedef VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderZeroInitializeWorkgroupMemory` specifies whether the
implementation supports initializing a variable in Workgroup storage
class.

If the `VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures-sType-sType) VUID-VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePrivateDataFeatures` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDevicePrivateDataFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           privateData;
} VkPhysicalDevicePrivateDataFeatures;

// Provided by VK_EXT_private_data
// Equivalent to VkPhysicalDevicePrivateDataFeatures
typedef VkPhysicalDevicePrivateDataFeatures VkPhysicalDevicePrivateDataFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `privateData` indicates
whether the implementation supports private data.
See [Private Data](private_data.html#private-data).

If the `VkPhysicalDevicePrivateDataFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePrivateDataFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePrivateDataFeatures-sType-sType) VUID-VkPhysicalDevicePrivateDataFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR`
structure is defined as:

// Provided by VK_KHR_shader_subgroup_uniform_control_flow
typedef struct VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupUniformControlFlow;
} VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderSubgroupUniformControlFlow` specifies whether the
implementation supports the shader execution mode
`SubgroupUniformControlFlowKHR`

If the `VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_UNIFORM_CONTROL_FLOW_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRobustness2FeaturesKHR` structure is defined as:

// Provided by VK_KHR_robustness2
typedef struct VkPhysicalDeviceRobustness2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustBufferAccess2;
    VkBool32           robustImageAccess2;
    VkBool32           nullDescriptor;
} VkPhysicalDeviceRobustness2FeaturesKHR;

// Provided by VK_EXT_robustness2
// Equivalent to VkPhysicalDeviceRobustness2FeaturesKHR
typedef VkPhysicalDeviceRobustness2FeaturesKHR VkPhysicalDeviceRobustness2FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `robustBufferAccess2` enables
[Robust Buffer Access 2](shaders.html#shaders-robust-buffer-access2) guarantees for shader buffer accesses.

* 
 `robustImageAccess2` enables
[Robust Image Access 2](shaders.html#shaders-robust-image-access2) guarantees for shader image accesses.

* 
 `nullDescriptor` indicates
whether descriptors **can** be written with a [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) resource
or view, which are considered valid to access and act as if the
descriptor were bound to nothing.

If the `VkPhysicalDeviceRobustness2FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRobustness2FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage

* 
[](#VUID-VkPhysicalDeviceRobustness2FeaturesKHR-robustBufferAccess2-04000) VUID-VkPhysicalDeviceRobustness2FeaturesKHR-robustBufferAccess2-04000

If `robustBufferAccess2` is enabled then
[`robustBufferAccess`](#features-robustBufferAccess) **must** also be
enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRobustness2FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceRobustness2FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageRobustnessFeatures` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceImageRobustnessFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustImageAccess;
} VkPhysicalDeviceImageRobustnessFeatures;

// Provided by VK_EXT_image_robustness
// Equivalent to VkPhysicalDeviceImageRobustnessFeatures
typedef VkPhysicalDeviceImageRobustnessFeatures VkPhysicalDeviceImageRobustnessFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `robustImageAccess`
enables [Robust Image Access](shaders.html#shaders-robust-image-access) guarantees for shader image
accesses.

If the `VkPhysicalDeviceImageRobustnessFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageRobustnessFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageRobustnessFeatures-sType-sType) VUID-VkPhysicalDeviceImageRobustnessFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderTerminateInvocationFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceShaderTerminateInvocationFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderTerminateInvocation;
} VkPhysicalDeviceShaderTerminateInvocationFeatures;

// Provided by VK_KHR_shader_terminate_invocation
// Equivalent to VkPhysicalDeviceShaderTerminateInvocationFeatures
typedef VkPhysicalDeviceShaderTerminateInvocationFeatures VkPhysicalDeviceShaderTerminateInvocationFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderTerminateInvocation` specifies whether the implementation
supports SPIR-V modules that use the `SPV_KHR_terminate_invocation`
extension.

If the `VkPhysicalDeviceShaderTerminateInvocationFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderTerminateInvocationFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderTerminateInvocationFeatures-sType-sType) VUID-VkPhysicalDeviceShaderTerminateInvocationFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TERMINATE_INVOCATION_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCustomBorderColorFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_custom_border_color
typedef struct VkPhysicalDeviceCustomBorderColorFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           customBorderColors;
    VkBool32           customBorderColorWithoutFormat;
} VkPhysicalDeviceCustomBorderColorFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `customBorderColors` indicates that
the implementation supports providing a `borderColor` value with one
of the following values at sampler creation time:

[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor)

* 
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)

`customBorderColorWithoutFormat` indicates that explicit formats are
not required for custom border colors and the value of the `format`
member of the [VkSamplerCustomBorderColorCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorCreateInfoEXT) structure
**may** be [VK_FORMAT_UNDEFINED](formats.html#VkFormat).
If this feature bit is not set, applications **must** provide the
[VkFormat](formats.html#VkFormat) of the image view(s) being sampled by this sampler in the
`format` member of the [VkSamplerCustomBorderColorCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorCreateInfoEXT)
structure.

If the `VkPhysicalDeviceCustomBorderColorFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCustomBorderColorFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCustomBorderColorFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceCustomBorderColorFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceBorderColorSwizzleFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_border_color_swizzle
typedef struct VkPhysicalDeviceBorderColorSwizzleFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           borderColorSwizzle;
    VkBool32           borderColorSwizzleFromImage;
} VkPhysicalDeviceBorderColorSwizzleFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `borderColorSwizzle` indicates that
defined values are returned by sampled image operations when used with a
sampler that uses a [VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](samplers.html#VkBorderColor),
[VK_BORDER_COLOR_INT_OPAQUE_BLACK](samplers.html#VkBorderColor),
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor), or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor) `borderColor` and an image view
that uses a non-[identity    component mapping](resources.html#resources-image-views-identity-mappings), when either `borderColorSwizzleFromImage` is
enabled or the [VkSamplerBorderColorComponentMappingCreateInfoEXT](samplers.html#VkSamplerBorderColorComponentMappingCreateInfoEXT)
is specified.

* 

`borderColorSwizzleFromImage` indicates that the implementation will
return the correct border color values from sampled image operations
under the conditions expressed above, without the application having to
specify the border color component mapping when creating the sampler
object.
If this feature bit is not set, applications **can** chain a
[VkSamplerBorderColorComponentMappingCreateInfoEXT](samplers.html#VkSamplerBorderColorComponentMappingCreateInfoEXT) structure when
creating samplers for use with image views that do not have an
[identity swizzle](resources.html#resources-image-views-identity-mappings) and, when
those samplers are combined with image views using the same component
mapping, sampled image operations that use opaque black or custom border
colors will return the correct border color values.

If the `VkPhysicalDeviceBorderColorSwizzleFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceBorderColorSwizzleFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBorderColorSwizzleFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceBorderColorSwizzleFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BORDER_COLOR_SWIZZLE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePortabilitySubsetFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_portability_subset
typedef struct VkPhysicalDevicePortabilitySubsetFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           constantAlphaColorBlendFactors;
    VkBool32           events;
    VkBool32           imageViewFormatReinterpretation;
    VkBool32           imageViewFormatSwizzle;
    VkBool32           imageView2DOn3DImage;
    VkBool32           multisampleArrayImage;
    VkBool32           mutableComparisonSamplers;
    VkBool32           pointPolygons;
    VkBool32           samplerMipLodBias;
    VkBool32           separateStencilMaskRef;
    VkBool32           shaderSampleRateInterpolationFunctions;
    VkBool32           tessellationIsolines;
    VkBool32           tessellationPointMode;
    VkBool32           triangleFans;
    VkBool32           vertexAttributeAccessBeyondStride;
} VkPhysicalDevicePortabilitySubsetFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`constantAlphaColorBlendFactors` indicates whether this
implementation supports constant *alpha* [Blend Factors](framebuffer.html#framebuffer-blendfactors)
used as source or destination *color* [Blending](framebuffer.html#framebuffer-blending).

* 
 `events` indicates whether this implementation
supports synchronization using [Events](synchronization.html#synchronization-events).

* 

`imageViewFormatReinterpretation` indicates whether this
implementation supports a `VkImageView` being created with a texel
format containing a different number of components, or a different
number of bits in each component, than the texel format of the
underlying `VkImage`.

* 
 `imageViewFormatSwizzle`
indicates whether this implementation supports remapping format
components using [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`components`.

* 
 `imageView2DOn3DImage` indicates
whether this implementation supports a `VkImage` being created with
the [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) flag set, permitting a
2D or 2D array image view to be created on a 3D `VkImage`.

* 
 `multisampleArrayImage` indicates
whether this implementation supports a `VkImage` being created as a
2D array with multiple samples per texel.

* 
 `mutableComparisonSamplers`
indicates whether this implementation allows descriptors with comparison
samplers to be [updated](descriptorsets.html#descriptors-sets-updates).

* 
 `pointPolygons` indicates whether this
implementation supports [Rasterization](primsrast.html#primsrast) using a *point*
[Polygon Mode](primsrast.html#primsrast-polygonmode).

* 
 `samplerMipLodBias` indicates whether
this implementation supports setting a [mipmap LOD    bias value](samplers.html#samplers-mipLodBias) when [creating a sampler](samplers.html#samplers).

* 
 `separateStencilMaskRef`
indicates whether this implementation supports separate front and back
[Stencil Test](fragops.html#fragops-stencil) reference values.

* 

`shaderSampleRateInterpolationFunctions` indicates whether this
implementation supports fragment shaders which use the
[    `InterpolationFunction`](../appendices/spirvenv.html#spirvenv-capabilities-table-InterpolationFunction) capability and the extended instructions
`InterpolateAtCentroid`, `InterpolateAtOffset`, and
`InterpolateAtSample` from the `GLSL.std.450` extended instruction set.
This member is only meaningful if the [    `sampleRateShading`](#features-sampleRateShading) feature is supported.

* 
 `tessellationIsolines` indicates
whether this implementation supports
[isoline output](tessellation.html#tessellation-isoline-tessellation) from the
[Tessellation](tessellation.html#tessellation) stage of a graphics pipeline.
This member is only meaningful if the [    `tessellationShader`](#features-tessellationShader) feature is supported.

* 
 `tessellationPointMode` indicates
whether this implementation supports [point    output](tessellation.html#tessellation-point-mode) from the [Tessellation](tessellation.html#tessellation) stage of a graphics pipeline.
This member is only meaningful if the [    `tessellationShader`](#features-tessellationShader) feature is supported.

* 
 `triangleFans` indicates whether this
implementation supports [Triangle Fans](drawing.html#drawing-triangle-fans) primitive topology.

* 

`vertexAttributeAccessBeyondStride` indicates whether this
implementation supports accessing a vertex input attribute beyond the
stride of the corresponding vertex input binding.

If the `VkPhysicalDevicePortabilitySubsetFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePortabilitySubsetFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePortabilitySubsetFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePortabilitySubsetFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePerformanceQueryFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_performance_query
typedef struct VkPhysicalDevicePerformanceQueryFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           performanceCounterQueryPools;
    VkBool32           performanceCounterMultipleQueryPools;
} VkPhysicalDevicePerformanceQueryFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`performanceCounterQueryPools` indicates whether the implementation
supports performance counter query pools.

* 

`performanceCounterMultipleQueryPools` indicates whether the
implementation supports using multiple performance query pools in a
primary command buffer and secondary command buffers executed within it.

If the `VkPhysicalDevicePerformanceQueryFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePerformanceQueryFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePerformanceQueryFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePerformanceQueryFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_QUERY_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevice4444FormatsFeaturesEXT` structure is defined as:

// Provided by VK_EXT_4444_formats
typedef struct VkPhysicalDevice4444FormatsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           formatA4R4G4B4;
    VkBool32           formatA4B4G4R4;
} VkPhysicalDevice4444FormatsFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `formatA4R4G4B4` indicates that the
implementation **must** support using a [VkFormat](formats.html#VkFormat) of
[VK_FORMAT_A4R4G4B4_UNORM_PACK16_EXT](formats.html#VkFormat) with at least the following
[VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits):

[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

 `formatA4B4G4R4` indicates that the
implementation **must** support using a [VkFormat](formats.html#VkFormat) of
[VK_FORMAT_A4B4G4R4_UNORM_PACK16_EXT](formats.html#VkFormat) with at least the following
[VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits):

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_BLIT_SRC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits)

If the `VkPhysicalDevice4444FormatsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevice4444FormatsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevice4444FormatsFeaturesEXT-sType-sType) VUID-VkPhysicalDevice4444FormatsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_4444_FORMATS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

|  | Although the formats defined by the `[VK_EXT_4444_formats](../appendices/extensions.html#VK_EXT_4444_formats)` extension
| --- | --- |
were promoted to Vulkan 1.3 as optional formats, the
[VkPhysicalDevice4444FormatsFeaturesEXT](#VkPhysicalDevice4444FormatsFeaturesEXT) structure was not promoted to
Vulkan 1.3. |

The `VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT` structure is
defined as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_mutable_descriptor_type
typedef struct VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           mutableDescriptorType;
} VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT;

// Provided by VK_VALVE_mutable_descriptor_type
// Equivalent to VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT
typedef VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT VkPhysicalDeviceMutableDescriptorTypeFeaturesVALVE;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `mutableDescriptorType` indicates
that the implementation **must** support using the [VkDescriptorType](descriptors.html#VkDescriptorType)
of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptors.html#VkDescriptorType) with at least the following
descriptor types, where any combination of the types **must** be supported:

[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType)

Additionally, `mutableDescriptorType` indicates that:

* 
Non-uniform descriptor indexing **must** be supported if all descriptor
types in a [VkMutableDescriptorTypeListEXT](descriptorsets.html#VkMutableDescriptorTypeListEXT) for
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptors.html#VkDescriptorType) have the corresponding non-uniform
indexing features enabled in
[VkPhysicalDeviceDescriptorIndexingFeatures](#VkPhysicalDeviceDescriptorIndexingFeatures).

* 
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) with
`descriptorType` of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptors.html#VkDescriptorType) relaxes
the list of required descriptor types to the descriptor types which
have the corresponding update-after-bind feature enabled in
[VkPhysicalDeviceDescriptorIndexingFeatures](#VkPhysicalDeviceDescriptorIndexingFeatures).

* 
Dynamically uniform descriptor indexing **must** be supported if all
descriptor types in a [VkMutableDescriptorTypeListEXT](descriptorsets.html#VkMutableDescriptorTypeListEXT) for
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptors.html#VkDescriptorType) have the corresponding dynamic
indexing features enabled.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) **must** be
supported.

* 
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](descriptorsets.html#VkDescriptorPoolCreateFlagBits) **must** be supported.

If the `VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MUTABLE_DESCRIPTOR_TYPE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDepthClipControlFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_depth_clip_control
typedef struct VkPhysicalDeviceDepthClipControlFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           depthClipControl;
} VkPhysicalDeviceDepthClipControlFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `depthClipControl` indicates that the
implementation supports setting
[VkPipelineViewportDepthClipControlCreateInfoEXT](vertexpostproc.html#VkPipelineViewportDepthClipControlCreateInfoEXT)::`negativeOneToOne`
to [VK_TRUE](fundamentals.html#VK_TRUE).

If the `VkPhysicalDeviceDepthClipControlFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDepthClipControlFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthClipControlFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDepthClipControlFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLIP_CONTROL_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDepthClampControlFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_depth_clamp_control
typedef struct VkPhysicalDeviceDepthClampControlFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           depthClampControl;
} VkPhysicalDeviceDepthClampControlFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `depthClampControl` indicates that
the implementation supports setting
[VkPipelineViewportDepthClampControlCreateInfoEXT](fragops.html#VkPipelineViewportDepthClampControlCreateInfoEXT)::`depthClampMode`
to [VK_DEPTH_CLAMP_MODE_USER_DEFINED_RANGE_EXT](fragops.html#VkDepthClampModeEXT).

If the `VkPhysicalDeviceDepthClampControlFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDepthClampControlFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthClampControlFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDepthClampControlFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_CONTROL_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR` structure
is defined as:

// Provided by VK_KHR_workgroup_memory_explicit_layout
typedef struct VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           workgroupMemoryExplicitLayout;
    VkBool32           workgroupMemoryExplicitLayoutScalarBlockLayout;
    VkBool32           workgroupMemoryExplicitLayout8BitAccess;
    VkBool32           workgroupMemoryExplicitLayout16BitAccess;
} VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`workgroupMemoryExplicitLayout` indicates whether the implementation
supports the SPIR-V `WorkgroupMemoryExplicitLayoutKHR` capability.

* 

`workgroupMemoryExplicitLayoutScalarBlockLayout` indicates whether
the implementation supports scalar alignment for laying out Workgroup
Blocks.

* 

`workgroupMemoryExplicitLayout8BitAccess` indicates whether objects
in the `Workgroup` storage class with the `Block` decoration **can**
have 8-bit integer members.
If this feature is not enabled, 8-bit integer members **must** not be used
in such
objects.
This also indicates whether shader modules **can** declare the
`WorkgroupMemoryExplicitLayout8BitAccessKHR` capability.

* 

`workgroupMemoryExplicitLayout16BitAccess` indicates whether objects
in the `Workgroup` storage class with the `Block` decoration **can**
have 16-bit integer and 16-bit floating-point members.
If this feature is not enabled, 16-bit integer or 16-bit floating-point
members **must** not be used in such
objects.
This also indicates whether shader modules **can** declare the
`WorkgroupMemoryExplicitLayout16BitAccessKHR` capability.

If the `VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_WORKGROUP_MEMORY_EXPLICIT_LAYOUT_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSynchronization2Features` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceSynchronization2Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           synchronization2;
} VkPhysicalDeviceSynchronization2Features;

// Provided by VK_KHR_synchronization2
// Equivalent to VkPhysicalDeviceSynchronization2Features
typedef VkPhysicalDeviceSynchronization2Features VkPhysicalDeviceSynchronization2FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `synchronization2`
indicates whether the implementation supports the new set of
synchronization commands introduced in `[VK_KHR_synchronization2](../appendices/extensions.html#VK_KHR_synchronization2)`.

If the `VkPhysicalDeviceSynchronization2Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSynchronization2Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSynchronization2Features-sType-sType) VUID-VkPhysicalDeviceSynchronization2Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SYNCHRONIZATION_2_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_vertex_input_dynamic_state
typedef struct VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vertexInputDynamicState;
} VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `vertexInputDynamicState`
indicates that the implementation supports the following dynamic states:

[VK_DYNAMIC_STATE_VERTEX_INPUT_EXT](pipelines.html#VkDynamicState)

If the `VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_INPUT_DYNAMIC_STATE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_primitives_generated_query
typedef struct VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           primitivesGeneratedQuery;
    VkBool32           primitivesGeneratedQueryWithRasterizerDiscard;
    VkBool32           primitivesGeneratedQueryWithNonZeroStreams;
} VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `primitivesGeneratedQuery`
indicates whether the implementation supports the
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](queries.html#VkQueryType) query type.

* 

`primitivesGeneratedQueryWithRasterizerDiscard` indicates whether
the implementation supports this query when
[rasterization discard](primsrast.html#primsrast-discard) is enabled.

* 

`primitivesGeneratedQueryWithNonZeroStreams` indicates whether the
implementation supports this query with a non-zero index in
[vkCmdBeginQueryIndexedEXT](queries.html#vkCmdBeginQueryIndexedEXT).

If the `VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVES_GENERATED_QUERY_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentShadingRateFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkPhysicalDeviceFragmentShadingRateFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineFragmentShadingRate;
    VkBool32           primitiveFragmentShadingRate;
    VkBool32           attachmentFragmentShadingRate;
} VkPhysicalDeviceFragmentShadingRateFeaturesKHR;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`pipelineFragmentShadingRate` indicates that the implementation
supports the [pipeline    fragment shading rate](primsrast.html#primsrast-fragment-shading-rate-pipeline).

* 

`primitiveFragmentShadingRate` indicates that the implementation
supports the [primitive    fragment shading rate](primsrast.html#primsrast-fragment-shading-rate-primitive).

* 

`attachmentFragmentShadingRate` indicates that the implementation
supports the [attachment    fragment shading rate](primsrast.html#primsrast-fragment-shading-rate-attachment).

If the `VkPhysicalDeviceFragmentShadingRateFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentShadingRateFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRateFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceLegacyDitheringFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_legacy_dithering
typedef struct VkPhysicalDeviceLegacyDitheringFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           legacyDithering;
} VkPhysicalDeviceLegacyDitheringFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `legacyDithering` indicates whether the
implementation supports [Legacy    Dithering](interfaces.html#interfaces-legacy-dithering).

If the `VkPhysicalDeviceLegacyDitheringFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceLegacyDitheringFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLegacyDitheringFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceLegacyDitheringFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_DITHERING_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV` structure is
defined as:

// Provided by VK_NV_fragment_shading_rate_enums
typedef struct VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           fragmentShadingRateEnums;
    VkBool32           supersampleFragmentShadingRates;
    VkBool32           noInvocationFragmentShadingRates;
} VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `fragmentShadingRateEnums`
indicates that the implementation supports specifying fragment shading
rates using the [VkFragmentShadingRateNV](primsrast.html#VkFragmentShadingRateNV) enumerated type.

* 

`supersampleFragmentShadingRates` indicates that the implementation
supports fragment shading rate enum values indicating more than one
invocation per fragment.

* 

`noInvocationFragmentShadingRates` indicates that the implementation
supports a fragment shading rate enum value indicating that no fragment
shaders should be invoked when that shading rate is used.

If the `VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_ENUMS_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderUntypedPointersFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_shader_untyped_pointers
typedef struct VkPhysicalDeviceShaderUntypedPointersFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderUntypedPointers;
} VkPhysicalDeviceShaderUntypedPointersFeaturesKHR;

The members of `VkPhysicalDeviceShaderUntypedPointersFeaturesKHR`
describe the following features:

* 
 `shaderUntypedPointers` specifies
whether shader modules **can** declare the `UntypedPointersKHR`
capability and untyped pointers in any
[explicitly laid out storage class](interfaces.html#interfaces-resources-layout).

If the `VkPhysicalDeviceShaderUntypedPointersFeaturesKHR` structure is
included in the `pNext` chain of [VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2), it is
filled with values indicating whether the features are supported.
`VkPhysicalDeviceShaderUntypedPointersFeaturesKHR` **can** also be included
in the `pNext` chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) to enable the features.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderUntypedPointersFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderUntypedPointersFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNTYPED_POINTERS_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceInheritedViewportScissorFeaturesNV` structure is
defined as:

// Provided by VK_NV_inherited_viewport_scissor
typedef struct VkPhysicalDeviceInheritedViewportScissorFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           inheritedViewportScissor2D;
} VkPhysicalDeviceInheritedViewportScissorFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `inheritedViewportScissor2D`
indicates whether secondary command buffers can inherit most of the
dynamic state affected by
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](pipelines.html#VkDynamicState),
[VK_DYNAMIC_STATE_VIEWPORT](pipelines.html#VkDynamicState) or [VK_DYNAMIC_STATE_SCISSOR](pipelines.html#VkDynamicState), from
a primary command buffer.

If the `VkPhysicalDeviceInheritedViewportScissorFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceInheritedViewportScissorFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInheritedViewportScissorFeaturesNV-sType-sType) VUID-VkPhysicalDeviceInheritedViewportScissorFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INHERITED_VIEWPORT_SCISSOR_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePipelineProtectedAccessFeatures` structure is
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDevicePipelineProtectedAccessFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineProtectedAccess;
} VkPhysicalDevicePipelineProtectedAccessFeatures;

// Provided by VK_EXT_pipeline_protected_access
// Equivalent to VkPhysicalDevicePipelineProtectedAccessFeatures
typedef VkPhysicalDevicePipelineProtectedAccessFeatures VkPhysicalDevicePipelineProtectedAccessFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`pipelineProtectedAccess` indicates whether the implementation
supports specifying protected access on individual pipelines.

If the `VkPhysicalDevicePipelineProtectedAccessFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelineProtectedAccessFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineProtectedAccessFeatures-sType-sType) VUID-VkPhysicalDevicePipelineProtectedAccessFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROTECTED_ACCESS_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_ycbcr_2plane_444_formats
typedef struct VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           ycbcr2plane444Formats;
} VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `ycbcr2plane444Formats` indicates
that the implementation supports querying format features for, and
using, the following 2-plane 444 Y′CBCR formats:

[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat)

* 
[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](formats.html#VkFormat)

If the `VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_2_PLANE_444_FORMATS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

|  | Although the formats defined by the `[VK_EXT_ycbcr_2plane_444_formats](../appendices/extensions.html#VK_EXT_ycbcr_2plane_444_formats)`
| --- | --- |
were promoted to Vulkan 1.3 as optional formats, the
[VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT](#VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT) structure was not
promoted to Vulkan 1.3. |

The `VkPhysicalDeviceColorWriteEnableFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_color_write_enable
typedef struct VkPhysicalDeviceColorWriteEnableFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           colorWriteEnable;
} VkPhysicalDeviceColorWriteEnableFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `colorWriteEnable` indicates that the
implementation supports the dynamic state
[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](pipelines.html#VkDynamicState).

If the `VkPhysicalDeviceColorWriteEnableFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceColorWriteEnableFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceColorWriteEnableFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceColorWriteEnableFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COLOR_WRITE_ENABLE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePipelinePropertiesFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_pipeline_properties
typedef struct VkPhysicalDevicePipelinePropertiesFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelinePropertiesIdentifier;
} VkPhysicalDevicePipelinePropertiesFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`pipelinePropertiesIdentifier` indicates that the implementation
supports querying a unique pipeline identifier.

If the `VkPhysicalDevicePipelinePropertiesFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelinePropertiesFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelinePropertiesFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePipelinePropertiesFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROPERTIES_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceProvokingVertexFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_provoking_vertex
typedef struct VkPhysicalDeviceProvokingVertexFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           provokingVertexLast;
    VkBool32           transformFeedbackPreservesProvokingVertex;
} VkPhysicalDeviceProvokingVertexFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `provokingVertexLast` indicates
whether the implementation supports the
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](vertexpostproc.html#VkProvokingVertexModeEXT)
[provoking vertex mode](vertexpostproc.html#VkProvokingVertexModeEXT) for flat shading.

* 

`transformFeedbackPreservesProvokingVertex` indicates that the order
of vertices within each primitive written by transform feedback will
preserve the provoking vertex.
This does not apply to triangle fan primitives when
[    `transformFeedbackPreservesTriangleFanProvokingVertex`](limits.html#limits-transformFeedbackPreservesTriangleFanProvokingVertex) is
[VK_FALSE](fundamentals.html#VK_FALSE).
`transformFeedbackPreservesProvokingVertex` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)
when the `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` extension is not supported.

If the `VkPhysicalDeviceProvokingVertexFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceProvokingVertexFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

When `VkPhysicalDeviceProvokingVertexFeaturesEXT` is in the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) but the [`transformFeedback`](#features-transformFeedback) feature is not enabled, the value of
`transformFeedbackPreservesProvokingVertex` is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceProvokingVertexFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceProvokingVertexFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROVOKING_VERTEX_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDescriptorBufferFeaturesEXT` structure is defined
as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkPhysicalDeviceDescriptorBufferFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           descriptorBuffer;
    VkBool32           descriptorBufferCaptureReplay;
    VkBool32           descriptorBufferImageLayoutIgnored;
    VkBool32           descriptorBufferPushDescriptors;
} VkPhysicalDeviceDescriptorBufferFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `descriptorBuffer` indicates that the
implementation supports putting shader-accessible descriptors directly
in memory.

* 

`descriptorBufferCaptureReplay` indicates that the implementation
supports capture and replay when using descriptor buffers.
If this is [VK_TRUE](fundamentals.html#VK_TRUE), all resources created with
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkBufferCreateFlagBits),
[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkImageCreateFlagBits),
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkImageViewCreateFlagBits),
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](resources.html#VkTensorCreateFlagBitsARM),
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](resources.html#VkTensorViewCreateFlagBitsARM),
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](samplers.html#VkSamplerCreateFlagBits), or
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkAccelerationStructureCreateFlagBitsKHR)
**must** be created before resources of the same types without those flags.

* 

`descriptorBufferImageLayoutIgnored` indicates that the
implementation will ignore `imageLayout` in
`VkDescriptorImageInfo` when calling [vkGetDescriptorEXT](descriptorbuffers.html#vkGetDescriptorEXT).

* 

`descriptorBufferPushDescriptors` indicates that the implementation
supports using push descriptors with descriptor buffers.

If the `VkPhysicalDeviceDescriptorBufferFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDescriptorBufferFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDescriptorBufferTensorFeaturesARM` structure is
defined as:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkPhysicalDeviceDescriptorBufferTensorFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           descriptorBufferTensorDescriptors;
} VkPhysicalDeviceDescriptorBufferTensorFeaturesARM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`descriptorBufferTensorDescriptors` indicates that the
implementation supports putthing shader-accessible tensor descriptors
directly in memory.

If the `VkPhysicalDeviceDescriptorBufferTensorFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDescriptorBufferTensorFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferTensorFeaturesARM-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferTensorFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_pageable_device_local_memory
typedef struct VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pageableDeviceLocalMemory;
} VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pageableDeviceLocalMemory`
indicates that the implementation supports pageable device-local memory
and **may** transparently move device-local memory allocations to
host-local memory to better share device-local memory with other
applications.

If the `VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PAGEABLE_DEVICE_LOCAL_MEMORY_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMultiDrawFeaturesEXT` structure is defined as:

// Provided by VK_EXT_multi_draw
typedef struct VkPhysicalDeviceMultiDrawFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multiDraw;
} VkPhysicalDeviceMultiDrawFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `multiDraw` indicates that the implementation
supports [vkCmdDrawMultiEXT](drawing.html#vkCmdDrawMultiEXT) and [vkCmdDrawMultiIndexedEXT](drawing.html#vkCmdDrawMultiIndexedEXT).

If the `VkPhysicalDeviceMultiDrawFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMultiDrawFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiDrawFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMultiDrawFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTI_DRAW_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingMotionBlurFeaturesNV` structure is
defined as:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkPhysicalDeviceRayTracingMotionBlurFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingMotionBlur;
    VkBool32           rayTracingMotionBlurPipelineTraceRaysIndirect;
} VkPhysicalDeviceRayTracingMotionBlurFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rayTracingMotionBlur` indicates
whether the implementation supports the motion blur feature.

* 

`rayTracingMotionBlurPipelineTraceRaysIndirect` indicates whether
the implementation supports indirect ray tracing commands with the
motion blur feature enabled.

If the `VkPhysicalDeviceRayTracingMotionBlurFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingMotionBlurFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingMotionBlurFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingMotionBlurFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_MOTION_BLUR_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV` structure
is defined as:

// Provided by VK_NV_ray_tracing_linear_swept_spheres
typedef struct VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           spheres;
    VkBool32           linearSweptSpheres;
} VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `spheres` indicates whether the implementation
supports sphere primitives in ray tracing.

* 
 `linearSweptSpheres` indicates
whether the implementation supports linear swept sphere primitives in
ray tracing.

If the `VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_LINEAR_SWEPT_SPHERES_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceOpacityMicromapFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkPhysicalDeviceOpacityMicromapFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           micromap;
    VkBool32           micromapCaptureReplay;
    VkBool32           micromapHostCommands;
} VkPhysicalDeviceOpacityMicromapFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `micromap` indicates whether the
implementation supports the micromap array feature.

* 
 `micromapCaptureReplay` indicates
whether the implementation supports capture and replay of addresses for
micromap arrays.

* 
 `micromapHostCommands` indicates
whether the implementation supports host side micromap array commands.

If the `VkPhysicalDeviceOpacityMicromapFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceOpacityMicromapFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceOpacityMicromapFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceOpacityMicromapFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDisplacementMicromapFeaturesNV` structure is
defined as:

// Provided by VK_NV_displacement_micromap
typedef struct VkPhysicalDeviceDisplacementMicromapFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           displacementMicromap;
} VkPhysicalDeviceDisplacementMicromapFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `displacementMicromap` indicates
whether the implementation supports the displacement micromap feature.

If the `VkPhysicalDeviceDisplacementMicromapFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDisplacementMicromapFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDisplacementMicromapFeaturesNV-sType-sType) VUID-VkPhysicalDeviceDisplacementMicromapFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISPLACEMENT_MICROMAP_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingValidationFeaturesNV` structure is
defined as:

// Provided by VK_NV_ray_tracing_validation
typedef struct VkPhysicalDeviceRayTracingValidationFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingValidation;
} VkPhysicalDeviceRayTracingValidationFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rayTracingValidation` indicates
whether the implementation supports the ray tracing validation feature.

If the `VkPhysicalDeviceRayTracingValidationFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingValidationFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingValidationFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingValidationFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_VALIDATION_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_zero_initialize_device_memory
typedef struct VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           zeroInitializeDeviceMemory;
} VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `zeroInitializeDeviceMemory`
indicates that the implementation supports zeroing memory allocations
using a user-specified flag.

If the `VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_DEVICE_MEMORY_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSubpassShadingFeaturesHUAWEI` structure is defined
as:

// Provided by VK_HUAWEI_subpass_shading
typedef struct VkPhysicalDeviceSubpassShadingFeaturesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           subpassShading;
} VkPhysicalDeviceSubpassShadingFeaturesHUAWEI;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `subpassShading` specifies whether
subpass shading is supported.

If the `VkPhysicalDeviceSubpassShadingFeaturesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSubpassShadingFeaturesHUAWEI`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubpassShadingFeaturesHUAWEI-sType-sType) VUID-VkPhysicalDeviceSubpassShadingFeaturesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_SHADING_FEATURES_HUAWEI](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExternalMemoryRDMAFeaturesNV` structure is defined
as:

// Provided by VK_NV_external_memory_rdma
typedef struct VkPhysicalDeviceExternalMemoryRDMAFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           externalMemoryRDMA;
} VkPhysicalDeviceExternalMemoryRDMAFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `externalMemoryRDMA` indicates
whether the implementation has support for the
[VK_MEMORY_PROPERTY_RDMA_CAPABLE_BIT_NV](memory.html#VkMemoryPropertyFlagBits) memory property and the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) external memory
handle type.

If the `VkPhysicalDeviceExternalMemoryRDMAFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExternalMemoryRDMAFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalMemoryRDMAFeaturesNV-sType-sType) VUID-VkPhysicalDeviceExternalMemoryRDMAFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_RDMA_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentIdFeaturesKHR` structure is defined as:

// Provided by VK_KHR_present_id
typedef struct VkPhysicalDevicePresentIdFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentId;
} VkPhysicalDevicePresentIdFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentId` indicates that the implementation
supports specifying present ID values in the `VkPresentIdKHR`
extension to the `VkPresentInfoKHR` struct.

If the `VkPhysicalDevicePresentIdFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentIdFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentIdFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePresentIdFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_ID_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentId2FeaturesKHR` structure is defined as:

// Provided by VK_KHR_present_id2
typedef struct VkPhysicalDevicePresentId2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentId2;
} VkPhysicalDevicePresentId2FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentId2` indicates that the
implementation supports specifying present ID values in the
`VkPresentId2KHR` extension to the `VkPresentInfoKHR` struct.

If the `VkPhysicalDevicePresentId2FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentId2FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentId2FeaturesKHR-sType-sType) VUID-VkPhysicalDevicePresentId2FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_ID_2_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentWaitFeaturesKHR` structure is defined as:

// Provided by VK_KHR_present_wait
typedef struct VkPhysicalDevicePresentWaitFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentWait;
} VkPhysicalDevicePresentWaitFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentWait` indicates that the
implementation supports `vkWaitForPresentKHR`.

If the `VkPhysicalDevicePresentWaitFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentWaitFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentWaitFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePresentWaitFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_WAIT_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentWait2FeaturesKHR` structure is defined as:

// Provided by VK_KHR_present_wait2
typedef struct VkPhysicalDevicePresentWait2FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentWait2;
} VkPhysicalDevicePresentWait2FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentWait2` indicates that the
implementation supports `vkWaitForPresent2KHR`.

If the `VkPhysicalDevicePresentWait2FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentWait2FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentWait2FeaturesKHR-sType-sType) VUID-VkPhysicalDevicePresentWait2FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_WAIT_2_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_unified_image_layouts
typedef struct VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           unifiedImageLayouts;
    VkBool32           unifiedImageLayoutsVideo;
} VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `unifiedImageLayouts` specifies
whether usage of [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout), where valid, incurs no
loss in efficiency.
Additionally, it indicates whether it **can** be used in place of
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout).

* 
 `unifiedImageLayoutsVideo`
specifies whether [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) can be used in place of
any of the following image layouts with no loss in efficiency.

[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](resources.html#VkImageLayout)

If the `VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFIED_IMAGE_LAYOUTS_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceHostImageCopyFeatures` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceHostImageCopyFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hostImageCopy;
} VkPhysicalDeviceHostImageCopyFeatures;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkPhysicalDeviceHostImageCopyFeatures
typedef VkPhysicalDeviceHostImageCopyFeatures VkPhysicalDeviceHostImageCopyFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `hostImageCopy` indicates
that the implementation supports copying from host memory to images
using the [vkCopyMemoryToImage](copies.html#vkCopyMemoryToImage) command, copying from images to host
memory using the [vkCopyImageToMemory](copies.html#vkCopyImageToMemory) command, and copying between
images using the [vkCopyImageToImage](copies.html#vkCopyImageToImage) command.

If the `VkPhysicalDeviceHostImageCopyFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceHostImageCopyFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceHostImageCopyFeatures-sType-sType) VUID-VkPhysicalDeviceHostImageCopyFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentTimingFeaturesEXT` structure is defined as:

// Provided by VK_EXT_present_timing
typedef struct VkPhysicalDevicePresentTimingFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentTiming;
    VkBool32           presentAtAbsoluteTime;
    VkBool32           presentAtRelativeTime;
} VkPhysicalDevicePresentTimingFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentTiming` indicates that the
implementation supports `vkGetPastPresentationTimingEXT`.

* 
 `presentAtAbsoluteTime` indicates
that the implementation supports specifying absolute target present
times.

* 
 `presentAtRelativeTime` indicates
that the implementation supports specifying relative target present
times.

If the `VkPhysicalDevicePresentTimingFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentTimingFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentTimingFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePresentTimingFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_TIMING_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentBarrierFeaturesNV` structure is defined as:

// Provided by VK_NV_present_barrier
typedef struct VkPhysicalDevicePresentBarrierFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentBarrier;
} VkPhysicalDevicePresentBarrierFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentBarrier` indicates that the
implementation supports the present barrier feature.

If the `VkPhysicalDevicePresentBarrierFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentBarrierFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentBarrierFeaturesNV-sType-sType) VUID-VkPhysicalDevicePresentBarrierFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_BARRIER_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderFmaFeaturesKHR` structure is defined as:

// Provided by VK_KHR_shader_fma
typedef struct VkPhysicalDeviceShaderFmaFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFmaFloat16;
    VkBool32           shaderFmaFloat32;
    VkBool32           shaderFmaFloat64;
} VkPhysicalDeviceShaderFmaFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFmaFloat16` indicates whether
the implementation supports `OpFmaKHR` for Float16 types in shaders.

* 
 `shaderFmaFloat32` indicates whether
the implementation supports `OpFmaKHR` for Float32 types in shaders.

* 
 `shaderFmaFloat64` indicates whether
the implementation supports `OpFmaKHR` for Float64 types in shaders.

If the `VkPhysicalDeviceShaderFmaFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderFmaFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderFmaFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderFmaFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FMA_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderIntegerDotProductFeatures` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceShaderIntegerDotProductFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderIntegerDotProduct;
} VkPhysicalDeviceShaderIntegerDotProductFeatures;

// Provided by VK_KHR_shader_integer_dot_product
// Equivalent to VkPhysicalDeviceShaderIntegerDotProductFeatures
typedef VkPhysicalDeviceShaderIntegerDotProductFeatures VkPhysicalDeviceShaderIntegerDotProductFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderIntegerDotProduct` specifies whether shader modules **can**
declare the `DotProductInputAllKHR`, `DotProductInput4x8BitKHR`,
`DotProductInput4x8BitPackedKHR` and `DotProductKHR` capabilities.

If the `VkPhysicalDeviceShaderIntegerDotProductFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderIntegerDotProductFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderIntegerDotProductFeatures-sType-sType) VUID-VkPhysicalDeviceShaderIntegerDotProductFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMaintenance4Features` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceMaintenance4Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance4;
} VkPhysicalDeviceMaintenance4Features;

// Provided by VK_KHR_maintenance4
// Equivalent to VkPhysicalDeviceMaintenance4Features
typedef VkPhysicalDeviceMaintenance4Features VkPhysicalDeviceMaintenance4FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance4` indicates
that the implementation supports the following:

The application **may** destroy a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) object
immediately after using it to create another object.

* 
`LocalSizeId` **can** be used as an alternative to `LocalSize` to
specify the local workgroup size with specialization constants.

* 
Images created with identical creation parameters will always have the
same alignment requirements.

* 
The size memory requirement of a buffer or image is never greater than
that of another buffer or image created with a greater or equal size.

* 
Push constants do not have to be initialized before they are
dynamically accessed.

* 
The interface matching rules allow a larger output vector to match with
a smaller input vector, with additional values being discarded.

If the `VkPhysicalDeviceMaintenance4Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMaintenance4Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance4Features-sType-sType) VUID-VkPhysicalDeviceMaintenance4Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMaintenance5Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance5Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance5;
} VkPhysicalDeviceMaintenance5Features;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPhysicalDeviceMaintenance5Features
typedef VkPhysicalDeviceMaintenance5Features VkPhysicalDeviceMaintenance5FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance5` indicates
that the implementation supports the following:

The ability to expose support for the optional format
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](formats.html#VkFormat).

* 
The ability to expose support for the optional format
[VK_FORMAT_A8_UNORM](formats.html#VkFormat).

* 
A property to indicate that multisample coverage operations are
performed after sample counting in EarlyFragmentTests mode.

* 
Creating a `VkBufferView` with a subset of the associated
`VkBuffer` usage using [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo).

* 
A new function [vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2), allowing a range of memory
to be bound as an index buffer.

* 
[vkGetDeviceProcAddr](initialization.html#vkGetDeviceProcAddr) will return `NULL` for function pointers of
core functions for versions higher than the version requested by the
application.

* 
[vkCmdBindVertexBuffers2](fxvertex.html#vkCmdBindVertexBuffers2) supports using [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) in the
`pSizes` parameter.

* 
If `PointSize` is not written, a default value of `1.0` is used for
the size of points.

* 
[VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo) **can** be added as a chained structure to
pipeline creation via [VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo), rather
than having to create a shader module.

* 
A function [vkGetRenderingAreaGranularity](renderpass.html#vkGetRenderingAreaGranularity) to query the optimal
render area for a dynamic rendering instance.

* 
A property to indicate that depth/stencil texturing operations with
[VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle) have defined behavior.

* 
[vkGetDeviceImageSubresourceLayout](resources.html#vkGetDeviceImageSubresourceLayout) allows an application to
perform a [vkGetImageSubresourceLayout](resources.html#vkGetImageSubresourceLayout) query without having to
create an image.

* 
[VK_REMAINING_ARRAY_LAYERS](resources.html#VK_REMAINING_ARRAY_LAYERS) as the `layerCount` member of
[VkImageSubresourceLayers](copies.html#VkImageSubresourceLayers).

* 
A property to indicate whether `PointSize` controls the final
rasterization of polygons if [polygon mode](primsrast.html#primsrast-polygonmode) is
[VK_POLYGON_MODE_POINT](primsrast.html#VkPolygonMode).

* 
Two properties to indicate the non-strict line rasterization algorithm
used.

* 
Two new flags words [VkPipelineCreateFlagBits2](pipelines.html#VkPipelineCreateFlagBits2) and
[VkBufferUsageFlagBits2](resources.html#VkBufferUsageFlagBits2).

* 
Physical-device-level functions **can** now be called with any value in
the valid range for a type beyond the defined enumerants, such that
applications can avoid checking individual features, extensions, or
versions before querying supported properties of a particular
enumerant.

* 
Copies between images of any type are allowed, with 1D images treated
as 2D images with a height of `1`.

If the `VkPhysicalDeviceMaintenance5Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMaintenance5Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance5Features-sType-sType) VUID-VkPhysicalDeviceMaintenance5Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMaintenance6Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance6Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance6;
} VkPhysicalDeviceMaintenance6Features;

// Provided by VK_KHR_maintenance6
// Equivalent to VkPhysicalDeviceMaintenance6Features
typedef VkPhysicalDeviceMaintenance6Features VkPhysicalDeviceMaintenance6FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance6` indicates
that the implementation supports the following:

[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) **can** be used when binding an index buffer

* 
[VkBindMemoryStatus](resources.html#VkBindMemoryStatus) **can** be included in the `pNext` chain of
the [VkBindBufferMemoryInfo](resources.html#VkBindBufferMemoryInfo) and [VkBindImageMemoryInfo](resources.html#VkBindImageMemoryInfo)
structures, enabling applications to retrieve [VkResult](fundamentals.html#VkResult) values for
individual memory binding operations.

* 
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`blockTexelViewCompatibleMultipleLayers`
property to indicate that the implementation supports creating image
views with [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) where
the `layerCount` member of `subresourceRange` is greater than
`1`.

* 
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`maxCombinedImageSamplerDescriptorCount`
property which indicates the maximum descriptor size required for any
[format that requires a     sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation.

* 
A
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`fragmentShadingRateClampCombinerInputs`
property which indicates whether the implementation clamps the inputs
to fragment shading rate combiner operations.

If the `VkPhysicalDeviceMaintenance6Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMaintenance6Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance6Features-sType-sType) VUID-VkPhysicalDeviceMaintenance6Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMaintenance7FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceMaintenance7FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance7;
} VkPhysicalDeviceMaintenance7FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance7` indicates that the
implementation supports the following:

The [VK_RENDERING_CONTENTS_INLINE_BIT_KHR](renderpass.html#VkRenderingFlagBitsKHR) and
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](renderpass.html#VkSubpassContents)
flags **can** be used to record commands in render pass instances both
inline and in secondary command buffers executed with
[vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands) for dynamic rendering and legacy render
passes respectively.

* 
Querying information regarding the underlying devices in environments
where the Vulkan implementation is provided through layered
implementations.
This is done by chaining
[VkPhysicalDeviceLayeredApiPropertiesListKHR](limits.html#VkPhysicalDeviceLayeredApiPropertiesListKHR) to
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2).

* 
New limits which indicate the maximum total count of dynamic uniform
buffers and dynamic storage buffers that **can** be included in a pipeline
layout.

* 
32-bit timestamp queries **must** wrap on overflow

* 
A property that indicates whether a fragment shading rate attachment
can have a size that is too small to cover a specified render area.

* 
A property that indicates support for writing to one aspect of a
depth/stencil attachment without performing a read-modify-write
operation on the other aspect

If the `VkPhysicalDeviceMaintenance7FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMaintenance7FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance7FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance7FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMaintenance8FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance8
typedef struct VkPhysicalDeviceMaintenance8FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance8;
} VkPhysicalDeviceMaintenance8FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance8` indicates that the
implementation supports the following:

Allow copies between depth/stencil and “matching” color attachments

* 
Allow `dstCache` in `vkMergePipelineCaches` to be implicitly
synchronized.

* 
Require src/dst sync scopes to work when doing queue family ownership
transfers

* 
Support `Offset` (as an alternative to `ConstOffset`) image operand in
texture sampling and fetch operations

* 
Use the SPIR-V definition of OpSRem and OpSMod, making these operations
produce well-defined results for negative operands

* 
Loosen layer restrictions when blitting from 3D images to other image
types

* 
Add space for an additional 64 access flags for use with
VkMemoryBarrier2, VkBufferMemoryBarrier2, and VkImageMemoryBarrier2

If the `VkPhysicalDeviceMaintenance8FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMaintenance8FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance8FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance8FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_8_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMaintenance9FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance9
typedef struct VkPhysicalDeviceMaintenance9FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance9;
} VkPhysicalDeviceMaintenance9FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance9` indicates that the
implementation supports the following:

The restriction that certain bitfield SPIR-V instructions only operate
on 32-bit integers is relaxed.

* 
The value returned when a vertex shader reads an unbound vertex
attribute is defined by way of the
[     `defaultVertexAttributeValue`](limits.html#limits-defaultVertexAttributeValue) property.

* 
A new
[VkQueryPoolCreateFlagBits](queries.html#VkQueryPoolCreateFlagBits)::[VK_QUERY_POOL_CREATE_RESET_BIT_KHR](queries.html#VkQueryPoolCreateFlagBits)
flag **can** be used to initialize all queries in query pool to the reset
state on creation.

* 
[vkCmdSetEvent2](synchronization.html#vkCmdSetEvent2) **may** not provide a dependency other than the event
src stage mask.

* 
The effects of image memory barriers and image layout transitions on 3D
images created with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) are
limited to only those slices specified in `VkImageSubresourceRange`

* 
A device **can** be created with no queues.
This can be used for compiling pipelines or shaders for the purpose of
filling pipeline caches.

* 
Queue family ownership transfers are no longer required for buffers and
linear images.
For optimally tiled images, a new physical device query is added to
check if resources created with [VK_SHARING_MODE_EXCLUSIVE](resources.html#VkSharingMode) **can**
automatically transfer ownership between two queue families.

* 
[`image2DViewOf3DSparse`](limits.html#limits-image2DViewOf3DSparse) enables
2D views of 3D sparse images.

If the `VkPhysicalDeviceMaintenance9FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMaintenance9FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance9FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance9FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMaintenance10FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance10
typedef struct VkPhysicalDeviceMaintenance10FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance10;
} VkPhysicalDeviceMaintenance10FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance10` indicates that the
implementation supports the following:

New image format feature bits that indicate support for copying depth
or stencil aspects using non-graphics queue families

* 
If [vkCmdSetSampleMaskEXT](fragops.html#vkCmdSetSampleMaskEXT) is called with `pSampleMask` set to
`NULL`, it is treated as if the mask has all bits set to `1`.

* 
Add [vkCmdEndRendering2KHR](renderpass.html#vkCmdEndRendering2KHR) as an extensible version of
[vkCmdEndRendering](renderpass.html#vkCmdEndRendering)

* 
Add input attachment information to dynamic rendering

* 
Require that vertex inputs follow sRGB encoding when those formats are
used, instead of being underspecified.

* 
Add a query to determine if sRGB images are resolved in nonlinear or
linear space by default

* 
Add an optional feature to allow applications to override the default
sRGB resolve behavior

* 
Add resolve mode and depth-stencil resolve support to
`vkCmdResolveImage2` to bring it in-line with render pass attachment
resolves

If the `VkPhysicalDeviceMaintenance10FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMaintenance10FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance10FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance10FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDynamicRenderingFeatures` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceDynamicRenderingFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicRendering;
} VkPhysicalDeviceDynamicRenderingFeatures;

// Provided by VK_KHR_dynamic_rendering
// Equivalent to VkPhysicalDeviceDynamicRenderingFeatures
typedef VkPhysicalDeviceDynamicRenderingFeatures VkPhysicalDeviceDynamicRenderingFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `dynamicRendering`
specifies that the implementation supports dynamic render pass instances
using the [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) command.

If the `VkPhysicalDeviceDynamicRenderingFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDynamicRenderingFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDynamicRenderingFeatures-sType-sType) VUID-VkPhysicalDeviceDynamicRenderingFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCustomResolveFeaturesEXT` structure is defined as:

// Provided by VK_EXT_custom_resolve
typedef struct VkPhysicalDeviceCustomResolveFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           customResolve;
} VkPhysicalDeviceCustomResolveFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `customResolve` specifies that the
implementation supports render pass resolves using shaders.

If the `VkPhysicalDeviceCustomResolveFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCustomResolveFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCustomResolveFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceCustomResolveFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_RESOLVE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_rgba10x6_formats
typedef struct VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           formatRgba10x6WithoutYCbCrSampler;
} VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`formatRgba10x6WithoutYCbCrSampler` indicates that
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](formats.html#VkFormat) **can** be used with a
`VkImageView` with `subresourceRange.aspectMask` equal to
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits) without a [    sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) enabled.

If the `VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RGBA10X6_FORMATS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePipelineRobustnessFeatures` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDevicePipelineRobustnessFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineRobustness;
} VkPhysicalDevicePipelineRobustnessFeatures;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPhysicalDevicePipelineRobustnessFeatures
typedef VkPhysicalDevicePipelineRobustnessFeatures VkPhysicalDevicePipelineRobustnessFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pipelineRobustness`
indicates that robustness **can** be requested on a per-pipeline-stage
granularity.

|  | Enabling the [`pipelineRobustness`](#features-pipelineRobustness)
| --- | --- |
feature may, on some platforms, incur a minor performance cost when the
[`robustBufferAccess`](#features-robustBufferAccess) feature is not
enabled, even for pipelines which do not make use of any robustness
features.
If robustness is not needed, the [`pipelineRobustness`](#features-pipelineRobustness) feature should not be enabled by an application. |

If the `VkPhysicalDevicePipelineRobustnessFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelineRobustnessFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineRobustnessFeatures-sType-sType) VUID-VkPhysicalDevicePipelineRobustnessFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageViewMinLodFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_image_view_min_lod
typedef struct VkPhysicalDeviceImageViewMinLodFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           minLod;
} VkPhysicalDeviceImageViewMinLodFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `minLod` indicates whether the implementation
supports clamping the minimum LOD value during
[Image Level(s) Selection](textures.html#textures-image-level-selection),
[Texel Gathering](textures.html#textures-gather) and
[Integer Texel Coordinate    Operations](textures.html#textures-integer-coordinate-operations) with a given [VkImageView](resources.html#VkImageView) by
[VkImageViewMinLodCreateInfoEXT](resources.html#VkImageViewMinLodCreateInfoEXT)::`minLod`.

If the `VkPhysicalDeviceImageViewMinLodFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageViewMinLodFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageViewMinLodFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceImageViewMinLodFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_VIEW_MIN_LOD_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_rasterization_order_attachment_access
typedef struct VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rasterizationOrderColorAttachmentAccess;
    VkBool32           rasterizationOrderDepthAttachmentAccess;
    VkBool32           rasterizationOrderStencilAttachmentAccess;
} VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT;

// Provided by VK_ARM_rasterization_order_attachment_access
// Equivalent to VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT
typedef VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesARM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`rasterizationOrderColorAttachmentAccess` indicates that
rasterization order access to color and input attachments is supported
by the implementation.

* 

`rasterizationOrderDepthAttachmentAccess` indicates that
rasterization order access to the depth aspect of depth/stencil and
input attachments is supported by the implementation.

* 

`rasterizationOrderStencilAttachmentAccess` indicates that
rasterization order access to the stencil aspect of depth/stencil and
input attachments is supported by the implementation.

If the `VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_subpass_merge_feedback
typedef struct VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           subpassMergeFeedback;
} VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `subpassMergeFeedback` indicates
whether the implementation supports feedback of subpass merging.

If the `VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_MERGE_FEEDBACK_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceLinearColorAttachmentFeaturesNV` structure is
defined as:

// Provided by VK_NV_linear_color_attachment
typedef struct VkPhysicalDeviceLinearColorAttachmentFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           linearColorAttachment;
} VkPhysicalDeviceLinearColorAttachmentFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `linearColorAttachment` indicates
whether the implementation supports renderable
[Linear Color Attachment](../appendices/glossary.html#glossary-linear-color-attachment)

If the `VkPhysicalDeviceLinearColorAttachmentFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceLinearColorAttachmentFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLinearColorAttachmentFeaturesNV-sType-sType) VUID-VkPhysicalDeviceLinearColorAttachmentFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINEAR_COLOR_ATTACHMENT_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT` structure
is defined as:

// Provided by VK_EXT_attachment_feedback_loop_layout
typedef struct VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           attachmentFeedbackLoopLayout;
} VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`attachmentFeedbackLoopLayout` indicates whether the implementation
supports using
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout) image layout
for images created with the
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](resources.html#VkImageUsageFlagBits) usage flag set.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ATTACHMENT_FEEDBACK_LOOP_LAYOUT_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceNestedCommandBufferFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_nested_command_buffer
typedef struct VkPhysicalDeviceNestedCommandBufferFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           nestedCommandBuffer;
    VkBool32           nestedCommandBufferRendering;
    VkBool32           nestedCommandBufferSimultaneousUse;
} VkPhysicalDeviceNestedCommandBufferFeaturesEXT;

This structure describes the following features:

* 
 `nestedCommandBuffer` indicates the
implementation supports nested command buffers, which allows [    Secondary Command Buffers](../appendices/glossary.html#glossary) to execute other [Secondary    Command Buffers](../appendices/glossary.html#glossary).

* 

`nestedCommandBufferRendering` indicates that it is valid to call
[vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands) inside a [Secondary Command    Buffer](../appendices/glossary.html#glossary) recorded with
[VK_COMMAND_BUFFER_USAGE_RENDER_PASS_CONTINUE_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits).

* 

`nestedCommandBufferSimultaneousUse` indicates that the
implementation supports nested command buffers with command buffers that
are recorded with [VK_COMMAND_BUFFER_USAGE_SIMULTANEOUS_USE_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits).

If the `VkPhysicalDeviceNestedCommandBufferFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceNestedCommandBufferFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceNestedCommandBufferFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceNestedCommandBufferFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_graphics_pipeline_library
typedef struct VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           graphicsPipelineLibrary;
} VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `graphicsPipelineLibrary`
indicates that the implementation supports [graphics    pipeline libraries](pipelines.html#pipelines-library).

If the `VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GRAPHICS_PIPELINE_LIBRARY_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePipelineBinaryFeaturesKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPhysicalDevicePipelineBinaryFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineBinaries;
} VkPhysicalDevicePipelineBinaryFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pipelineBinaries` indicates that the
implementation supports [Pipeline Binaries](pipelines.html#pipelines-binaries).

If the `VkPhysicalDevicePipelineBinaryFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelineBinaryFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineBinaryFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePipelineBinaryFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_BINARY_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_multisampled_render_to_single_sampled
typedef struct VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multisampledRenderToSingleSampled;
} VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`multisampledRenderToSingleSampled` indicates that the
implementation supports multisampled rendering to single-sampled render
pass attachments.

If the `VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImage2DViewOf3DFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_image_2d_view_of_3d
typedef struct VkPhysicalDeviceImage2DViewOf3DFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           image2DViewOf3D;
    VkBool32           sampler2DViewOf3D;
} VkPhysicalDeviceImage2DViewOf3DFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `image2DViewOf3D` indicates that the
implementation supports using a 2D view of a 3D image in a descriptor of
type [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType) if the image is created
using [VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](resources.html#VkImageCreateFlagBits).

* 
 `sampler2DViewOf3D` indicates that
the implementation supports using a 2D view of a 3D image in a
descriptor of type [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) if the image is created
using [VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](resources.html#VkImageCreateFlagBits).

If the `VkPhysicalDeviceImage2DViewOf3DFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImage2DViewOf3DFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImage2DViewOf3DFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceImage2DViewOf3DFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_2D_VIEW_OF_3D_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_image_sliced_view_of_3d
typedef struct VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageSlicedViewOf3D;
} VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT;

The members of the `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT`
structure describe the following features:

* 
 `imageSlicedViewOf3D` indicates
that the implementation supports using a sliced view of a 3D image in a
descriptor of type [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType) by using a
[VkImageViewSlicedCreateInfoEXT](resources.html#VkImageViewSlicedCreateInfoEXT) structure when creating the view.

If the `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_SLICED_VIEW_OF_3D_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageCompressionControlFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_image_compression_control
typedef struct VkPhysicalDeviceImageCompressionControlFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageCompressionControl;
} VkPhysicalDeviceImageCompressionControlFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `imageCompressionControl`
indicates that the implementation supports providing controls for image
compression at image creation time.

If the `VkPhysicalDeviceImageCompressionControlFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageCompressionControlFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageCompressionControlFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceImageCompressionControlFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_COMPRESSION_CONTROL_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_image_compression_control_swapchain
typedef struct VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageCompressionControlSwapchain;
} VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`imageCompressionControlSwapchain` indicates that the implementation
supports controlling image controls per swapchain and querying image
compression properties per surface.

If the `VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_COMPRESSION_CONTROL_SWAPCHAIN_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_ray_tracing_position_fetch
typedef struct VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingPositionFetch;
} VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rayTracingPositionFetch`
indicates that the implementation supports fetching the object space
vertex positions of a hit triangle.

If the `VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_POSITION_FETCH_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderFloatControls2Features` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceShaderFloatControls2Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFloatControls2;
} VkPhysicalDeviceShaderFloatControls2Features;

// Provided by VK_KHR_shader_float_controls2
// Equivalent to VkPhysicalDeviceShaderFloatControls2Features
typedef VkPhysicalDeviceShaderFloatControls2Features VkPhysicalDeviceShaderFloatControls2FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderFloatControls2` specifies whether shader modules **can** declare
the `FloatControls2` capability.

If the `VkPhysicalDeviceShaderFloatControls2Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderFloatControls2Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderFloatControls2Features-sType-sType) VUID-VkPhysicalDeviceShaderFloatControls2Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT_CONTROLS_2_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD`
structure is defined as:

// Provided by VK_AMD_shader_early_and_late_fragment_tests
typedef struct VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderEarlyAndLateFragmentTests;
} VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderEarlyAndLateFragmentTests` indicates whether the
implementation supports the `EarlyAndLateFragmentTestsAMD`
`Execution` `Mode`.

If the `VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD-sType-sType) VUID-VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EARLY_AND_LATE_FRAGMENT_TESTS_FEATURES_AMD](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceAntiLagFeaturesAMD` structure is defined as:

// Provided by VK_AMD_anti_lag
typedef struct VkPhysicalDeviceAntiLagFeaturesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           antiLag;
} VkPhysicalDeviceAntiLagFeaturesAMD;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `antiLag` indicates whether the implementation
supports AMD Radeon™ Anti-Lag functionality.
The `antiLag` feature only supports a single GPU and **must** not be
enabled if
[VkDeviceGroupDeviceCreateInfo](devsandqueues.html#VkDeviceGroupDeviceCreateInfo)::`physicalDeviceCount` is
greater than 1.

If the `VkPhysicalDeviceAntiLagFeaturesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceAntiLagFeaturesAMD`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAntiLagFeaturesAMD-sType-sType) VUID-VkPhysicalDeviceAntiLagFeaturesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ANTI_LAG_FEATURES_AMD](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_non_seamless_cube_map
typedef struct VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           nonSeamlessCubeMap;
} VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `nonSeamlessCubeMap` indicates that
the implementation supports
[VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT](samplers.html#VkSamplerCreateFlagBits).

If the `VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NON_SEAMLESS_CUBE_MAP_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_shader_module_identifier
typedef struct VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderModuleIdentifier;
} VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderModuleIdentifier`
indicates whether the implementation supports querying an identifier of
a [VkShaderModule](shaders.html#VkShaderModule) or [VkShaderModuleCreateInfo](shaders.html#VkShaderModuleCreateInfo) structure, and
creating pipelines from identifiers only.

If the `VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MODULE_IDENTIFIER_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTilePropertiesFeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_tile_properties
typedef struct VkPhysicalDeviceTilePropertiesFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           tileProperties;
} VkPhysicalDeviceTilePropertiesFeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `tileProperties` indicates that the
implementation supports queries for returning tile properties.

If the `VkPhysicalDeviceTilePropertiesFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTilePropertiesFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTilePropertiesFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceTilePropertiesFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_PROPERTIES_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageProcessingFeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_image_processing
typedef struct VkPhysicalDeviceImageProcessingFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureSampleWeighted;
    VkBool32           textureBoxFilter;
    VkBool32           textureBlockMatch;
} VkPhysicalDeviceImageProcessingFeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `textureSampleWeighted` indicates
that the implementation supports shader modules that declare the
`TextureSampleWeightedQCOM` capability.

* 
 `textureBoxFilter` indicates that the
implementation supports shader modules that declare the
`TextureBoxFilterQCOM` capability.

* 
 `textureBlockMatch` indicates that
the implementation supports shader modules that declare the
`TextureBlockMatchQCOM` capability.

If the `VkPhysicalDeviceImageProcessingFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageProcessingFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageProcessingFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceImageProcessingFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageProcessing2FeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_image_processing2
typedef struct VkPhysicalDeviceImageProcessing2FeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           textureBlockMatch2;
} VkPhysicalDeviceImageProcessing2FeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `textureBlockMatch2` indicates that
the implementation supports shader modules that declare the
`TextureBlockMatch2QCOM` capability.

If the `VkPhysicalDeviceImageProcessing2FeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageProcessing2FeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageProcessing2FeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceImageProcessing2FeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_2_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDepthClampZeroOneFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_depth_clamp_zero_one
typedef struct VkPhysicalDeviceDepthClampZeroOneFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           depthClampZeroOne;
} VkPhysicalDeviceDepthClampZeroOneFeaturesKHR;

// Provided by VK_EXT_depth_clamp_zero_one
// Equivalent to VkPhysicalDeviceDepthClampZeroOneFeaturesKHR
typedef VkPhysicalDeviceDepthClampZeroOneFeaturesKHR VkPhysicalDeviceDepthClampZeroOneFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `depthClampZeroOne` indicates that
the implementation supports clamping the depth to a range of `0` to `1`.

If the `VkPhysicalDeviceDepthClampZeroOneFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDepthClampZeroOneFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthClampZeroOneFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceDepthClampZeroOneFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_ZERO_ONE_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderTileImageFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_shader_tile_image
typedef struct VkPhysicalDeviceShaderTileImageFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderTileImageColorReadAccess;
    VkBool32           shaderTileImageDepthReadAccess;
    VkBool32           shaderTileImageStencilReadAccess;
} VkPhysicalDeviceShaderTileImageFeaturesEXT;

The members of the `VkPhysicalDeviceShaderTileImageFeaturesEXT`
structure describe the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderTileImageColorReadAccess` indicates that the implementation
supports the `TileImageColorReadAccessEXT` SPIR-V capability.

* 

`shaderTileImageDepthReadAccess` indicates that the implementation
supports the `TileImageDepthReadAccessEXT` SPIR-V capability.

* 

`shaderTileImageStencilReadAccess` indicates that the implementation
supports the `TileImageStencilReadAccessEXT` SPIR-V capability.

If the `VkPhysicalDeviceShaderTileImageFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderTileImageFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderTileImageFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderTileImageFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TILE_IMAGE_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDepthBiasControlFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_depth_bias_control
typedef struct VkPhysicalDeviceDepthBiasControlFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           depthBiasControl;
    VkBool32           leastRepresentableValueForceUnormRepresentation;
    VkBool32           floatRepresentation;
    VkBool32           depthBiasExact;
} VkPhysicalDeviceDepthBiasControlFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `depthBiasControl` indicates whether
the implementation supports the `vkCmdSetDepthBias2EXT` command and
the `VkDepthBiasRepresentationInfoEXT` structure.

* 

`leastRepresentableValueForceUnormRepresentation` indicates whether
the implementation supports using the
[VK_DEPTH_BIAS_REPRESENTATION_LEAST_REPRESENTABLE_VALUE_FORCE_UNORM_EXT](primsrast.html#VkDepthBiasRepresentationEXT)
depth bias representation.

* 
 `floatRepresentation` indicates
whether the implementation supports using the
[VK_DEPTH_BIAS_REPRESENTATION_FLOAT_EXT](primsrast.html#VkDepthBiasRepresentationEXT) depth bias representation.

* 
 `depthBiasExact` indicates whether the
implementation supports forcing depth bias to not be scaled to ensure a
minimum resolvable difference using
`VkDepthBiasRepresentationInfoEXT`::`depthBiasExact`.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthBiasControlFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDepthBiasControlFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_BIAS_CONTROL_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceAddressBindingReportFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_device_address_binding_report
typedef struct VkPhysicalDeviceAddressBindingReportFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           reportAddressBinding;
} VkPhysicalDeviceAddressBindingReportFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `reportAddressBinding` indicates
whether this implementation supports reporting the binding of GPU
virtual address ranges to Vulkan objects.

If the `VkPhysicalDeviceAddressBindingReportFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceAddressBindingReportFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAddressBindingReportFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceAddressBindingReportFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ADDRESS_BINDING_REPORT_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceOpticalFlowFeaturesNV` structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkPhysicalDeviceOpticalFlowFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           opticalFlow;
} VkPhysicalDeviceOpticalFlowFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `opticalFlow` indicates whether the
implementation supports optical flow.

If the `VkPhysicalDeviceOpticalFlowFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceOpticalFlowFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceOpticalFlowFeaturesNV-sType-sType) VUID-VkPhysicalDeviceOpticalFlowFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPTICAL_FLOW_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFaultFeaturesEXT` structure is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkPhysicalDeviceFaultFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceFault;
    VkBool32           deviceFaultVendorBinary;
} VkPhysicalDeviceFaultFeaturesEXT;

This structure describes the following features:

* 
 `deviceFault` indicates that the
implementation supports the reporting of device fault information.

* 
 `deviceFaultVendorBinary`
indicates that the implementation supports the generation of
vendor-specific binary crash dumps.
These may provide additional information when imported into
vendor-specific external tools.

If the `VkPhysicalDeviceFaultFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFaultFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFaultFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceFaultFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFaultFeaturesKHR` structure is defined as:

// Provided by VK_KHR_device_fault
typedef struct VkPhysicalDeviceFaultFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceFault;
    VkBool32           deviceFaultVendorBinary;
    VkBool32           deviceFaultReportMasked;
    VkBool32           deviceFaultDeviceLostOnMasked;
} VkPhysicalDeviceFaultFeaturesKHR;

This structure describes the following features:

* 
 `deviceFault` indicates that the
implementation supports the reporting of device fault information.

* 
 `deviceFaultVendorBinary`
indicates that the implementation supports the generation of
vendor-specific binary crash dumps.
These **may** provide additional information when imported into
vendor-specific external tools.

* 
 `deviceFaultReportMasked`
indicates that the implementation supports masked faults in normal
operation (ie.
automatically recovered by the driver internally without the application
receiving a [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) error) which **may** be reported via
this extension even if they did not result in a
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) condition being returned to the application.

* 

`deviceFaultDeviceLostOnMasked` indicates that the implementation
supports returning [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) for faults that would be
normally be masked.

In exceptional circumstances, some implementations **may** mask faults and
attempt to recover from an error.
In such circumstances, the device is not lost and further work can be
submitted to the device.
When such faults occur, the contents of all resources being written to at
the time of the fault are **undefined**.

If the `VkPhysicalDeviceFaultFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFaultFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFaultFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceFaultFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT` structure
is defined as:

// Provided by VK_EXT_pipeline_library_group_handles
typedef struct VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineLibraryGroupHandles;
} VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT;

This structure describes the following features:

* 

`pipelineLibraryGroupHandles` indicates whether the implementation
supports querying group handles directly from a ray tracing pipeline
library, and guarantees bitwise identical group handles for such
libraries when linked into other pipelines.

If the `VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_LIBRARY_GROUP_HANDLES_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderObjectFeaturesEXT` structure is defined as:

// Provided by VK_EXT_shader_object
typedef struct VkPhysicalDeviceShaderObjectFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderObject;
} VkPhysicalDeviceShaderObjectFeaturesEXT;

This structure describes the following feature:

* 
 `shaderObject` indicates whether the
implementation supports [shader objects](shaders.html#shaders-objects).

If the `VkPhysicalDeviceShaderObjectFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderObjectFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderObjectFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderObjectFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTensorFeaturesARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkPhysicalDeviceTensorFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           tensorNonPacked;
    VkBool32           shaderTensorAccess;
    VkBool32           shaderStorageTensorArrayDynamicIndexing;
    VkBool32           shaderStorageTensorArrayNonUniformIndexing;
    VkBool32           descriptorBindingStorageTensorUpdateAfterBind;
    VkBool32           tensors;
} VkPhysicalDeviceTensorFeaturesARM;

The members of the `VkPhysicalDeviceTensorFeaturesARM` structure
describe the following features:

* 
 `tensorNonPacked` indicates whether the
implementation supports the creation of tensors that are not packed
tensors.

* 
 `shaderTensorAccess` indicates
whether shader modules **can** declare the `TensorsARM` capability.

* 

`shaderStorageBufferArrayDynamicIndexing` indicates whether arrays
of storage tensors **can** be indexed by dynamically uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) **must** be indexed only by constant
integral expressions when aggregated into arrays in shader code.
This also indicates whether shader modules **can** declare the
`StorageTensorArrayDynamicIndexingARM` capability.

* 

`shaderStorageTensorArrayNonUniformIndexing` indicates whether
arrays of storage tensors **can** be indexed by non-uniform integer
expressions in shader code.
If this feature is not enabled, resources with a descriptor type of
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) **must** not be indexed by non-uniform
integer expressions when aggregated into arrays in shader code.
This also indicates whether shader modules **can** declare the
`StorageTensorArrayNonUniformIndexingARM` capability.

* 

`descriptorBindingStorageTensorUpdateAfterBind` indicates whether
the implementation supports updating storage tensor descriptors after a
set is bound.
If this feature is not enabled,
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) **must** not be used with
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType).

* 
 `tensors` indicates whether the implementation
supports tensor resources.

If the `VkPhysicalDeviceTensorFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTensorFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTensorFeaturesARM-sType-sType) VUID-VkPhysicalDeviceTensorFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TENSOR_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM` structure is defined
as:

// Provided by VK_ARM_shader_core_builtins
typedef struct VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderCoreBuiltins;
} VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderCoreBuiltins` indicates
whether the implementation supports the SPIR-V `CoreBuiltinsARM`
capability.

If the `VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM-sType-sType) VUID-VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_BUILTINS_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFrameBoundaryFeaturesEXT` structure is defined as:

// Provided by VK_EXT_frame_boundary
typedef struct VkPhysicalDeviceFrameBoundaryFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           frameBoundary;
} VkPhysicalDeviceFrameBoundaryFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `frameBoundary` indicates whether the
implementation supports frame boundary information.

If the `VkPhysicalDeviceFrameBoundaryFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFrameBoundaryFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFrameBoundaryFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceFrameBoundaryFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAME_BOUNDARY_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR` structure is
defined as:

// Provided by VK_KHR_swapchain_maintenance1
typedef struct VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           swapchainMaintenance1;
} VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR;

// Provided by VK_EXT_swapchain_maintenance1
// Equivalent to VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR
typedef VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR VkPhysicalDeviceSwapchainMaintenance1FeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `swapchainMaintenance1` indicates
that the implementation supports the following:

[VkSwapchainPresentFenceInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainPresentFenceInfoKHR), specifying a fence that is
signaled when the resources associated with a present operation **can** be
safely destroyed.

* 
[VkSwapchainPresentModesCreateInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainPresentModesCreateInfoKHR) and
[VkSwapchainPresentModeInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainPresentModeInfoKHR), allowing the swapchain to switch
present modes without a need for recreation.

* 
[VkSwapchainPresentScalingCreateInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainPresentScalingCreateInfoKHR), specifying the scaling
behavior of the swapchain in presence of window resizing.

* 
The [VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](VK_KHR_surface/wsi.html#VkSwapchainCreateFlagBitsKHR) flag,
allowing the implementation to defer the allocation of swapchain image
memory until first acquisition.

* 
[vkReleaseSwapchainImagesKHR](VK_KHR_surface/wsi.html#vkReleaseSwapchainImagesKHR), allowing acquired swapchain images
to be released without presenting them.

If the `VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SWAPCHAIN_MAINTENANCE_1_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_present_mode_fifo_latest_ready
typedef struct VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentModeFifoLatestReady;
} VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR;

// Provided by VK_EXT_present_mode_fifo_latest_ready
// Equivalent to VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR
typedef VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR VkPhysicalDevicePresentModeFifoLatestReadyFeaturesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentModeFifoLatestReady`
specifies whether the implementation supports the
[VK_PRESENT_MODE_FIFO_LATEST_READY_KHR](VK_KHR_surface/wsi.html#VkPresentModeKHR) present mode.

If the `VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR-sType-sType) VUID-VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_MODE_FIFO_LATEST_READY_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_dynamic_rendering_unused_attachments
typedef struct VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicRenderingUnusedAttachments;
} VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`dynamicRenderingUnusedAttachments` indicates that the
implementation supports binding graphics pipelines within a render pass
instance where any pipeline
[VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats`
element with a format other than [VK_FORMAT_UNDEFINED](formats.html#VkFormat) is allowed
with a corresponding [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments`
element with an `imageView` equal to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), or any
pipeline
[VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`pColorAttachmentFormats`
element with a [VK_FORMAT_UNDEFINED](formats.html#VkFormat) format is allowed with a
corresponding [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments` element
with a non-[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) `imageView`.
Also a [VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat`
other than [VK_FORMAT_UNDEFINED](formats.html#VkFormat) is allowed with a
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment`, or a
[VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`depthAttachmentFormat` of
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) is allowed with a non-[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment`.
Also a
[VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` other
than [VK_FORMAT_UNDEFINED](formats.html#VkFormat) is allowed with a [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment`, or a
[VkPipelineRenderingCreateInfo](pipelines.html#VkPipelineRenderingCreateInfo)::`stencilAttachmentFormat` of
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) is allowed with a non-[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment`.
Any writes to a [VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pColorAttachments`,
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pDepthAttachment`, or
[VkRenderingInfo](renderpass.html#VkRenderingInfo)::`pStencilAttachment` with
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) are discarded.

If the `VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_UNUSED_ATTACHMENTS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT` structure
is defined as:

// Provided by VK_EXT_ray_tracing_invocation_reorder
typedef struct VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingInvocationReorder;
} VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`rayTracingInvocationReorder` indicates that the implementation
supports `SPV_EXT_shader_invocation_reorder`.

If the `VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV` structure is
defined as:

// Provided by VK_NV_ray_tracing_invocation_reorder
typedef struct VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rayTracingInvocationReorder;
} VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`rayTracingInvocationReorder` indicates that the implementation
supports `SPV_NV_shader_invocation_reorder`.

If the `VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV` structure is
defined as:

// Provided by VK_NV_extended_sparse_address_space
typedef struct VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           extendedSparseAddressSpace;
} VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `extendedSparseAddressSpace`
indicates that the implementation supports allowing certain usages of
sparse memory resources to exceed
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`.
See [VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV](limits.html#VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV).

If the `VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV-sType-sType) VUID-VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM` structure is
defined as:

// Provided by VK_QCOM_multiview_per_view_viewports
typedef struct VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multiviewPerViewViewports;
} VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM;

This structure describes the following features:

* 
 `multiviewPerViewViewports`
indicates that the implementation supports multiview per-view viewports.

If the `VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_VIEWPORTS_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM` structure
is defined as:

// Provided by VK_QCOM_multiview_per_view_render_areas
typedef struct VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           multiviewPerViewRenderAreas;
} VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM;

This structure describes the following features:

* 

`multiviewPerViewRenderAreas` indicates that the implementation
supports multiview per-view render areas.

If the `VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_RENDER_AREAS_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI` structure is
defined as:

// Provided by VK_HUAWEI_cluster_culling_shader
typedef struct VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           clustercullingShader;
    VkBool32           multiviewClusterCullingShader;
} VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `clustercullingShader` specifies
whether cluster culling shader is supported.

* 

`multiviewClusterCullingShader` specifies whether multiview is
supported.

If the `VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI-sType-sType) VUID-VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_FEATURES_HUAWEI](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

To query whether a Cluster Culling Shader supports the per-cluster shading
rate feature, include a
`VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI` structure in the
`pNext` chain of the
`VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI` structure.
This structure is defined as:

// Provided by VK_HUAWEI_cluster_culling_shader
typedef struct VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           clusterShadingRate;
} VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `clusterShadingRate` specifies
whether per-cluster shading rates is supported.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI-sType-sType) VUID-VkPhysicalDeviceClusterCullingShaderVrsFeaturesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_VRS_FEATURES_HUAWEI](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI](#VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI)

The `VkPhysicalDeviceHdrVividFeaturesHUAWEI` structure is defined as:

// Provided by VK_HUAWEI_hdr_vivid
typedef struct VkPhysicalDeviceHdrVividFeaturesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hdrVivid;
} VkPhysicalDeviceHdrVividFeaturesHUAWEI;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `hdrVivid` specifies whether HDR Vivid
metadata is supported.

If the `VkPhysicalDeviceHdrVividFeaturesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceHdrVividFeaturesHUAWEI`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceHdrVividFeaturesHUAWEI-sType-sType) VUID-VkPhysicalDeviceHdrVividFeaturesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HDR_VIVID_FEATURES_HUAWEI](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderEnqueueFeaturesAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkPhysicalDeviceShaderEnqueueFeaturesAMDX {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderEnqueue;
    VkBool32           shaderMeshEnqueue;
} VkPhysicalDeviceShaderEnqueueFeaturesAMDX;

This structure describes the following feature:

* 
 `shaderEnqueue` indicates whether the
implementation supports [execution graphs](executiongraphs.html#executiongraphs).

* 
 `shaderMeshEnqueue` indicates whether
the implementation supports [mesh nodes in    execution graphs](executiongraphs.html#executiongraphs-meshnodes).

If the `VkPhysicalDeviceShaderEnqueueFeaturesAMDX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderEnqueueFeaturesAMDX`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderEnqueueFeaturesAMDX-sType-sType) VUID-VkPhysicalDeviceShaderEnqueueFeaturesAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ENQUEUE_FEATURES_AMDX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCubicClampFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_filter_cubic_clamp
typedef struct VkPhysicalDeviceCubicClampFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cubicRangeClamp;
} VkPhysicalDeviceCubicClampFeaturesQCOM;

This structure describes the following features:

* 
 `cubicRangeClamp` indicates that the
implementation supports cubic filtering in combination with a
[texel range clamp](textures.html#textures-texel-range-clamp).

If the `VkPhysicalDeviceCubicClampFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCubicClampFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCubicClampFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceCubicClampFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUBIC_CLAMP_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceYcbcrDegammaFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_ycbcr_degamma
typedef struct VkPhysicalDeviceYcbcrDegammaFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           ycbcrDegamma;
} VkPhysicalDeviceYcbcrDegammaFeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `ycbcrDegamma` indicates whether the
implementation supports [Y′CBCR degamma](textures.html#textures-YCbCr-degamma).

If the `VkPhysicalDeviceYcbcrDegammaFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceYcbcrDegammaFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceYcbcrDegammaFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceYcbcrDegammaFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_DEGAMMA_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCubicWeightsFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_filter_cubic_weights
typedef struct VkPhysicalDeviceCubicWeightsFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           selectableCubicWeights;
} VkPhysicalDeviceCubicWeightsFeaturesQCOM;

This structure describes the following feature:

* 
 `selectableCubicWeights`
indicates that the implementation supports the selection of filter cubic
weights.

If the `VkPhysicalDeviceCubicWeightsFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCubicWeightsFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCubicWeightsFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceCubicWeightsFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUBIC_WEIGHTS_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV` structure
is defined as:

// Provided by VK_NV_descriptor_pool_overallocation
typedef struct VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           descriptorPoolOverallocation;
} VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`descriptorPoolOverallocation` indicates that the implementation
allows the application to opt into descriptor pool overallocation by
creating the descriptor pool with
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](descriptorsets.html#VkDescriptorPoolCreateFlagBits) and/or
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV](descriptorsets.html#VkDescriptorPoolCreateFlagBits) flags.

If the `VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV-sType-sType) VUID-VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_POOL_OVERALLOCATION_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePerStageDescriptorSetFeaturesNV` structure is
defined as:

// Provided by VK_NV_per_stage_descriptor_set
typedef struct VkPhysicalDevicePerStageDescriptorSetFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           perStageDescriptorSet;
    VkBool32           dynamicPipelineLayout;
} VkPhysicalDevicePerStageDescriptorSetFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `perStageDescriptorSet` indicates
that the implementation allows the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) descriptor set
layout creation flag to be used so the bindings are specified per-stage
rather than across all stages.

* 
 `dynamicPipelineLayout` indicates
the implementation allows the `layout` member of
[VkBindDescriptorSetsInfo](descriptorsets.html#VkBindDescriptorSetsInfo), [VkPushConstantsInfo](descriptorsets.html#VkPushConstantsInfo),
[VkPushDescriptorSetInfo](descriptorsets.html#VkPushDescriptorSetInfo),
[VkPushDescriptorSetWithTemplateInfo](descriptorsets.html#VkPushDescriptorSetWithTemplateInfo),
[VkSetDescriptorBufferOffsetsInfoEXT](descriptorbuffers.html#VkSetDescriptorBufferOffsetsInfoEXT) and
[VkBindDescriptorBufferEmbeddedSamplersInfoEXT](descriptorbuffers.html#VkBindDescriptorBufferEmbeddedSamplersInfoEXT) to be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo) **can** be
chained off those structures' `pNext` instead.

If the `VkPhysicalDevicePerStageDescriptorSetFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePerStageDescriptorSetFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePerStageDescriptorSetFeaturesNV-sType-sType) VUID-VkPhysicalDevicePerStageDescriptorSetFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PER_STAGE_DESCRIPTOR_SET_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCudaKernelLaunchFeaturesNV` structure is defined
as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkPhysicalDeviceCudaKernelLaunchFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cudaKernelLaunchFeatures;
} VkPhysicalDeviceCudaKernelLaunchFeaturesNV;

This structure describes the following features:

* 
 `cudaKernelLaunchFeatures` is
non-zero if cuda kernel launch is supported.

If the `VkPhysicalDeviceCudaKernelLaunchFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCudaKernelLaunchFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCudaKernelLaunchFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCudaKernelLaunchFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUDA_KERNEL_LAUNCH_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_shader_maximal_reconvergence
typedef struct VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderMaximalReconvergence;
} VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderMaximalReconvergence`
specifies whether the implementation supports the shader execution mode
`MaximallyReconvergesKHR`

If the `VkPhysicalDevicePrivateDataFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePrivateDataFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MAXIMAL_RECONVERGENCE_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceExternalFormatResolveFeaturesANDROID` structure is
defined as:

// Provided by VK_ANDROID_external_format_resolve
typedef struct VkPhysicalDeviceExternalFormatResolveFeaturesANDROID {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           externalFormatResolve;
} VkPhysicalDeviceExternalFormatResolveFeaturesANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `externalFormatResolve` specifies
whether external format resolves are supported.

If the `VkPhysicalDeviceExternalFormatResolveFeaturesANDROID` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceExternalFormatResolveFeaturesANDROID`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalFormatResolveFeaturesANDROID-sType-sType) VUID-VkPhysicalDeviceExternalFormatResolveFeaturesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FORMAT_RESOLVE_FEATURES_ANDROID](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTileShadingFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPhysicalDeviceTileShadingFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           tileShading;
    VkBool32           tileShadingFragmentStage;
    VkBool32           tileShadingColorAttachments;
    VkBool32           tileShadingDepthAttachments;
    VkBool32           tileShadingStencilAttachments;
    VkBool32           tileShadingInputAttachments;
    VkBool32           tileShadingSampledAttachments;
    VkBool32           tileShadingPerTileDraw;
    VkBool32           tileShadingPerTileDispatch;
    VkBool32           tileShadingDispatchTile;
    VkBool32           tileShadingApron;
    VkBool32           tileShadingAnisotropicApron;
    VkBool32           tileShadingAtomicOps;
    VkBool32           tileShadingImageProcessing;
} VkPhysicalDeviceTileShadingFeaturesQCOM;

This structure describes the following features:

* 
 `tileShading` indicates that the
implementation supports [tile shading render    pass](renderpass.html#renderpass-tile-shading) instances.

* 
 `tileShadingFragmentStage`
indicates that the implementation supports tile shading in the fragment
stage.

* 

`tileShadingColorAttachments` indicates that the implementation
supports access to color attachments in a tile shader.

* 

`tileShadingDepthAttachments` indicates that the implementation
supports access to depth aspect of depth stencil attachments.

* 

`tileShadingStencilAttachments` indicates that the implementation
supports access to stencil aspect of depth stencil attachments.

* 

`tileShadingInputAttachments` indicates that the implementation
supports access to input attachments.

* 

`tileShadingSampledAttachments` indicates that the implementation
supports access to sampling of tile attachments.

* 
 `tileShadingPerTileDraw`
indicates that the implementation supports the recording of vkCmdDraw*
commands when [per-tile execution    model](renderpass.html#renderpass-per-tile-execution-model) is enabled.

* 
 `tileShadingPerTileDispatch`
indicates that the implementation supports the recording of
`vkCmdDispatch`* commands within those regions of a command buffer
where the [per-tile execution    model](renderpass.html#renderpass-per-tile-execution-model) is enabled.

* 
 `tileShadingDispatchTile`
indicates that the implementation supports the recording of
[vkCmdDispatchTileQCOM](dispatch.html#vkCmdDispatchTileQCOM) commands.

* 
 `tileShadingApron` indicates that the
implementation supports
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`apronSize` value other
than (0,0).
See [Tiling Aprons](renderpass.html#renderpass-tile-shading-aprons) for more
information.

* 

`tileShadingAnisotropicApron` indicates that the implementation
supports [VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`apronSize`
set to a value where `apronSize.width` differs from
`apronSize.height`.

* 
 `tileShadingAtomicOps` indicates
that the implementation supports atomic operations on
[tile attachment variables](interfaces.html#interfaces-tile-attachment).

* 
 `tileShadingImageProcessing`
indicates that the implementation supports [image    processing operations](textures.html#textures-weightimage) with tile attachments.

If the `VkPhysicalDeviceTileShadingFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTileShadingFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTileShadingFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceTileShadingFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceSchedulingControlsFeaturesARM` structure is defined
as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkPhysicalDeviceSchedulingControlsFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           schedulingControls;
} VkPhysicalDeviceSchedulingControlsFeaturesARM;

This structure describes the following features:

* 
 `schedulingControls` indicates that
the implementation supports scheduling controls.

If the `VkPhysicalDeviceSchedulingControlsFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceSchedulingControlsFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSchedulingControlsFeaturesARM-sType-sType) VUID-VkPhysicalDeviceSchedulingControlsFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG` structure is
defined as:

// Provided by VK_IMG_relaxed_line_rasterization
typedef struct VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           relaxedLineRasterization;
} VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `relaxedLineRasterization`
indicates that the implementation supports relaxed line rasterization
control.

If the `VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG-sType-sType) VUID-VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RELAXED_LINE_RASTERIZATION_FEATURES_IMG](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRenderPassStripedFeaturesARM` structure is defined
as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkPhysicalDeviceRenderPassStripedFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           renderPassStriped;
} VkPhysicalDeviceRenderPassStripedFeaturesARM;

The members of the `VkPhysicalDeviceRenderPassStripedFeaturesARM`
structure describe the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `renderPassStriped` indicates that
striped rendering is supported by the implementation.

If the `VkPhysicalDeviceRenderPassStripedFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRenderPassStripedFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRenderPassStripedFeaturesARM-sType-sType) VUID-VkPhysicalDeviceRenderPassStripedFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RENDER_PASS_STRIPED_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderSubgroupRotateFeatures` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceShaderSubgroupRotateFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupRotate;
    VkBool32           shaderSubgroupRotateClustered;
} VkPhysicalDeviceShaderSubgroupRotateFeatures;

// Provided by VK_KHR_shader_subgroup_rotate
// Equivalent to VkPhysicalDeviceShaderSubgroupRotateFeatures
typedef VkPhysicalDeviceShaderSubgroupRotateFeatures VkPhysicalDeviceShaderSubgroupRotateFeaturesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderSubgroupRotate` specifies whether shader modules **can** declare
the `GroupNonUniformRotateKHR` capability.

* 

`shaderSubgroupRotateClustered` specifies whether shader modules
**can** use the `ClusterSize` operand to
`OpGroupNonUniformRotateKHR`.

If the `VkPhysicalDeviceShaderSubgroupRotateFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderSubgroupRotateFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSubgroupRotateFeatures-sType-sType) VUID-VkPhysicalDeviceShaderSubgroupRotateFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderExpectAssumeFeatures` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceShaderExpectAssumeFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderExpectAssume;
} VkPhysicalDeviceShaderExpectAssumeFeatures;

// Provided by VK_KHR_shader_expect_assume
// Equivalent to VkPhysicalDeviceShaderExpectAssumeFeatures
typedef VkPhysicalDeviceShaderExpectAssumeFeatures VkPhysicalDeviceShaderExpectAssumeFeaturesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderExpectAssume`
specifies whether shader modules **can** declare the `ExpectAssumeKHR`
capability.

If the `VkPhysicalDeviceShaderExpectAssumeFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderExpectAssumeFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderExpectAssumeFeatures-sType-sType) VUID-VkPhysicalDeviceShaderExpectAssumeFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EXPECT_ASSUME_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDynamicRenderingLocalReadFeatures` structure is
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceDynamicRenderingLocalReadFeatures {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicRenderingLocalRead;
} VkPhysicalDeviceDynamicRenderingLocalReadFeatures;

// Provided by VK_KHR_dynamic_rendering_local_read
// Equivalent to VkPhysicalDeviceDynamicRenderingLocalReadFeatures
typedef VkPhysicalDeviceDynamicRenderingLocalReadFeatures VkPhysicalDeviceDynamicRenderingLocalReadFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`dynamicRenderingLocalRead` specifies that the implementation
supports local reads inside dynamic render pass instances using the
[vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering) command.

If the `VkPhysicalDeviceDynamicRenderingLocalReadFeatures` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDynamicRenderingLocalReadFeatures`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDynamicRenderingLocalReadFeatures-sType-sType) VUID-VkPhysicalDeviceDynamicRenderingLocalReadFeatures-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_LOCAL_READ_FEATURES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderQuadControlFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_shader_quad_control
typedef struct VkPhysicalDeviceShaderQuadControlFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderQuadControl;
} VkPhysicalDeviceShaderQuadControlFeaturesKHR;

This structure describes the following features:

* 
 `shaderQuadControl` indicates whether
the implementation supports shaders with the `QuadControlKHR`
capability.

If the `VkPhysicalDeviceShaderQuadControlFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderQuadControlFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderQuadControlFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderQuadControlFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_QUAD_CONTROL_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderBfloat16FeaturesKHR` structure is defined as:

// Provided by VK_KHR_shader_bfloat16
typedef struct VkPhysicalDeviceShaderBfloat16FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderBFloat16Type;
    VkBool32           shaderBFloat16DotProduct;
    VkBool32           shaderBFloat16CooperativeMatrix;
} VkPhysicalDeviceShaderBfloat16FeaturesKHR;

This structure describes the following features:

* 
 `shaderBFloat16Type` indicates
whether the implementation supports shaders with the
`BFloat16TypeKHR` capability.

* 
 `shaderBFloat16DotProduct`
indicates whether the implementation supports shaders with the
`BFloat16DotProductKHR` capability.

* 

`shaderBFloat16CooperativeMatrix` indicates whether the
implementation supports shaders with the
`BFloat16CooperativeMatrixKHR` capability.

If the `VkPhysicalDeviceShaderBfloat16FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderBfloat16FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderBfloat16FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderBfloat16FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_BFLOAT16_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceMapMemoryPlacedFeaturesEXT` structure is defined
as:

// Provided by VK_EXT_map_memory_placed
typedef struct VkPhysicalDeviceMapMemoryPlacedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           memoryMapPlaced;
    VkBool32           memoryMapRangePlaced;
    VkBool32           memoryUnmapReserve;
} VkPhysicalDeviceMapMemoryPlacedFeaturesEXT;

This structure describes the following features:

* 
 `memoryMapPlaced` indicates that the
implementation supports placing memory maps at application-specified
virtual addresses.

* 
 `memoryMapRangePlaced` indicates
that the implementation supports placing memory maps of a subrange of a
memory object at application-specified virtual addresses.

* 
 `memoryUnmapReserve` indicates that
the implementation supports leaving the memory range reserved when
unmapping a memory object.

If the `VkPhysicalDeviceMapMemoryPlacedFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceMapMemoryPlacedFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMapMemoryPlacedFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceMapMemoryPlacedFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAP_MEMORY_PLACED_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV](#VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV) structure is
defined as:

// Provided by VK_NV_shader_atomic_float16_vector
typedef struct VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFloat16VectorAtomics;
} VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFloat16VectorAtomics`
indicates whether shaders **can** perform 16-bit floating-point, 2- and
4-component vector atomic operations.

If the `VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV-sType-sType) VUID-VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT16_VECTOR_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The [VkPhysicalDevicePipelineOpacityMicromapFeaturesARM](#VkPhysicalDevicePipelineOpacityMicromapFeaturesARM) structure is
defined as:

// Provided by VK_ARM_pipeline_opacity_micromap
typedef struct VkPhysicalDevicePipelineOpacityMicromapFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineOpacityMicromap;
} VkPhysicalDevicePipelineOpacityMicromapFeaturesARM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pipelineOpacityMicromap`
indicates if a pipeline **can** declare if it can be used with an
acceleration structure referencing an opacity micromap, or not.

If the `VkPhysicalDevicePipelineOpacityMicromapFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePipelineOpacityMicromapFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineOpacityMicromapFeaturesARM-sType-sType) VUID-VkPhysicalDevicePipelineOpacityMicromapFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_OPACITY_MICROMAP_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceRawAccessChainsFeaturesNV` structure is defined as:

// Provided by VK_NV_raw_access_chains
typedef struct VkPhysicalDeviceRawAccessChainsFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderRawAccessChains;
} VkPhysicalDeviceRawAccessChainsFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderRawAccessChains` specifies
whether shader modules **can** declare the `RawAccessChainsNV`
capability.

If the `VkPhysicalDeviceRawAccessChainsFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceRawAccessChainsFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRawAccessChainsFeaturesNV-sType-sType) VUID-VkPhysicalDeviceRawAccessChainsFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAW_ACCESS_CHAINS_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceCommandBufferInheritanceFeaturesNV` structure is
defined as:

// Provided by VK_NV_command_buffer_inheritance
typedef struct VkPhysicalDeviceCommandBufferInheritanceFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           commandBufferInheritance;
} VkPhysicalDeviceCommandBufferInheritanceFeaturesNV;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `commandBufferInheritance`
indicates that command buffers executed in a queue inherit graphics and
compute state from the previously executed command buffer in that queue.

If the `VkPhysicalDeviceCommandBufferInheritanceFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceCommandBufferInheritanceFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCommandBufferInheritanceFeaturesNV-sType-sType) VUID-VkPhysicalDeviceCommandBufferInheritanceFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMMAND_BUFFER_INHERITANCE_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceImageAlignmentControlFeaturesMESA` structure is
defined as:

// Provided by VK_MESA_image_alignment_control
typedef struct VkPhysicalDeviceImageAlignmentControlFeaturesMESA {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           imageAlignmentControl;
} VkPhysicalDeviceImageAlignmentControlFeaturesMESA;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `imageAlignmentControl` specifies
that [VkImageAlignmentControlCreateInfoMESA](resources.html#VkImageAlignmentControlCreateInfoMESA) **can** be chained in
[VkImageCreateInfo](resources.html#VkImageCreateInfo)

If the `VkPhysicalDeviceImageAlignmentControlFeaturesMESA` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceImageAlignmentControlFeaturesMESA`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageAlignmentControlFeaturesMESA-sType-sType) VUID-VkPhysicalDeviceImageAlignmentControlFeaturesMESA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ALIGNMENT_CONTROL_FEATURES_MESA](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_shader_replicated_composites
typedef struct VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderReplicatedComposites;
} VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderReplicatedComposites`
specifies whether shader modules **can** declare the
`ReplicatedCompositesEXT` capability.

If the `VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_REPLICATED_COMPOSITES_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR`
structure is defined as:

// Provided by VK_KHR_shader_relaxed_extended_instruction
typedef struct VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderRelaxedExtendedInstruction;
} VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderRelaxedExtendedInstruction` specifies whether the
implementation supports SPIR-V modules that use the
`SPV_KHR_relaxed_extended_instruction` extension.

If the `VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_RELAXED_EXTENDED_INSTRUCTION_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX` structure is
defined as:

// Provided by VK_AMDX_dense_geometry_format
typedef struct VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           denseGeometryFormat;
} VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `denseGeometryFormat` specifies
whether the implementation supports DGF1 compressed geometry data.

If the `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX-sType-sType) VUID-VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DENSE_GEOMETRY_FORMAT_FEATURES_AMDX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_vertex_attribute_robustness
typedef struct VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           vertexAttributeRobustness;
} VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `vertexAttributeRobustness`
indicates that vertex shaders **can** read vertex attribute locations that
have no vertex attribute description and the value returned is (0,0,0,0)
or (0,0,0,1).

If the `VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_ROBUSTNESS_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceTileMemoryHeapFeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_tile_memory_heap
typedef struct VkPhysicalDeviceTileMemoryHeapFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           tileMemoryHeap;
} VkPhysicalDeviceTileMemoryHeapFeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `tileMemoryHeap` indicates whether the
implementation supports tile memory heap functionality.

If the `VkPhysicalDeviceTileMemoryHeapFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceTileMemoryHeapFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTileMemoryHeapFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceTileMemoryHeapFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_MEMORY_HEAP_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePresentMeteringFeaturesNV` structure is defined as:

// Provided by VK_NV_present_metering
typedef struct VkPhysicalDevicePresentMeteringFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           presentMetering;
} VkPhysicalDevicePresentMeteringFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `presentMetering` indicates whether the
implementation supports present metering capability.

If the `VkPhysicalDevicePresentMeteringFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePresentMeteringFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePresentMeteringFeaturesNV-sType-sType) VUID-VkPhysicalDevicePresentMeteringFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_METERING_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT`
structure is defined as:

// Provided by VK_EXT_shader_uniform_buffer_unsized_array
typedef struct VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderUniformBufferUnsizedArray;
} VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderUniformBufferUnsizedArray` indicates that the implementation
supports declaring the last member of a uniform buffer block as an
unsized array.

If the `VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNIFORM_BUFFER_UNSIZED_ARRAY_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceFormatPackFeaturesARM` structure is defined as:

// Provided by VK_ARM_format_pack
typedef struct VkPhysicalDeviceFormatPackFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           formatPack;
} VkPhysicalDeviceFormatPackFeaturesARM;

This structure describes the following feature:

* 
 `formatPack` indicates that the
implementation **must** support using a [VkFormat](formats.html#VkFormat) of
[VK_FORMAT_R10X6_UINT_PACK16_ARM](formats.html#VkFormat),
[VK_FORMAT_R10X6G10X6_UINT_2PACK16_ARM](formats.html#VkFormat),
[VK_FORMAT_R10X6G10X6B10X6A10X6_UINT_4PACK16_ARM](formats.html#VkFormat),
[VK_FORMAT_R12X4_UINT_PACK16_ARM](formats.html#VkFormat),
[VK_FORMAT_R12X4G12X4_UINT_2PACK16_ARM](formats.html#VkFormat),
[VK_FORMAT_R12X4G12X4B12X4A12X4_UINT_4PACK16_ARM](formats.html#VkFormat),
[VK_FORMAT_R14X2_UINT_PACK16_ARM](formats.html#VkFormat),
[VK_FORMAT_R14X2G14X2_UINT_2PACK16_ARM](formats.html#VkFormat), and
[VK_FORMAT_R14X2G14X2B14X2A14X2_UINT_4PACK16_ARM](formats.html#VkFormat), with at least the
following [VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits):

[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](formats.html#VkFormatFeatureFlagBits)

If the `VkPhysicalDeviceFormatPackFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceFormatPackFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFormatPackFeaturesARM-sType-sType) VUID-VkPhysicalDeviceFormatPackFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FORMAT_PACK_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_primitive_restart_index
typedef struct VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           primitiveRestartIndex;
} VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `primitiveRestartIndex` specifies
whether the index for primitive restart can be set

If the `VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT-sType-sType) VUID-VkPhysicalDevicePrimitiveRestartIndexFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVE_RESTART_INDEX_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDataGraphFeaturesARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkPhysicalDeviceDataGraphFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dataGraph;
    VkBool32           dataGraphUpdateAfterBind;
    VkBool32           dataGraphSpecializationConstants;
    VkBool32           dataGraphDescriptorBuffer;
    VkBool32           dataGraphShaderModule;
} VkPhysicalDeviceDataGraphFeaturesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `dataGraph` specifies whether data graph
pipelines **can** be used.

* 
 `dataGraphUpdateAfterBind`
specifies whether data graph pipelines **can** be created with a
[VkPipelineLayout](descriptorsets.html#VkPipelineLayout) that uses one or more [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout)
objects created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`dataGraphSpecializationConstants` specifies whether data graph
pipelines **can** be created from shader modules that use specialization
constants.

* 
 `dataGraphDescriptorBuffer`
specifies whether data graph pipelines **can** use descriptor buffers.

* 
 `dataGraphShaderModule` specifies
whether data graph pipelines **can** be created from a shader module.

If the `VkPhysicalDeviceDataGraphFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDataGraphFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDataGraphFeaturesARM-sType-sType) VUID-VkPhysicalDeviceDataGraphFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDataGraphModelFeaturesQCOM` structure is defined
as:

// Provided by VK_QCOM_data_graph_model
typedef struct VkPhysicalDeviceDataGraphModelFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dataGraphModel;
} VkPhysicalDeviceDataGraphModelFeaturesQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `dataGraphModel` specifies whether
the functionality defined by this extension is available, and guarantees
that the implementation supports a data graph queue family with at least
one of the following engine types:

[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)

If the `VkPhysicalDeviceDataGraphModelFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDataGraphModelFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDataGraphModelFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceDataGraphModelFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_MODEL_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderFloat8FeaturesEXT` structure is defined as:

// Provided by VK_EXT_shader_float8
typedef struct VkPhysicalDeviceShaderFloat8FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFloat8;
    VkBool32           shaderFloat8CooperativeMatrix;
} VkPhysicalDeviceShaderFloat8FeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFloat8` indicates whether the
implementation supports shaders with the `Float8EXT` capability.

* 

`shaderFloat8CooperativeMatrix` indicates whether the implementation
supports shaders with the `Float8CooperativeMatrixEXT` capability.

If the `VkPhysicalDeviceShaderFloat8FeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderFloat8FeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderFloat8FeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderFloat8FeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT8_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceQueuePerfHintFeaturesQCOM` structure is defined as:

// Provided by VK_QCOM_queue_perf_hint
typedef struct VkPhysicalDeviceQueuePerfHintFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           queuePerfHint;
} VkPhysicalDeviceQueuePerfHintFeaturesQCOM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `queuePerfHint` specifies whether the
implementation supports setting [queue perf    hints](devsandqueues.html#devsandqueues-perfhint).

If the `VkPhysicalDeviceQueuePerfHintFeaturesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceQueuePerfHintFeaturesQCOM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceQueuePerfHintFeaturesQCOM-sType-sType) VUID-VkPhysicalDeviceQueuePerfHintFeaturesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_PERF_HINT_FEATURES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShader64BitIndexingFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_shader_64bit_indexing
typedef struct VkPhysicalDeviceShader64BitIndexingFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shader64BitIndexing;
} VkPhysicalDeviceShader64BitIndexingFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shader64BitIndexing` indicates
    that the implementation supports [using 64-bit    address calculations](../appendices/spirvenv.html#spirvenv-64bindexing) for indexing
cooperative matrices,
cooperative vectors,
    storage buffers, and physical storage buffers.

If the `VkPhysicalDeviceShader64BitIndexingFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShader64BitIndexingFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShader64BitIndexingFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShader64BitIndexingFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_64_BIT_INDEXING_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_shader_subgroup_partitioned
typedef struct VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSubgroupPartitioned;
} VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderSubgroupPartitioned`
indicates that the implementation supports
[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](limits.html#features-subgroup-partitioned).

If the `VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_PARTITIONED_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePerformanceCountersByRegionFeaturesARM` structure
is defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkPhysicalDevicePerformanceCountersByRegionFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           performanceCountersByRegion;
} VkPhysicalDevicePerformanceCountersByRegionFeaturesARM;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`performanceCountersByRegion` specifies whether the implementation
supports capture of per region performance counters.

See [security model](../appendices/extensions.html#appendix-performance-counters-by-region-security) for
additional guarantees made by implementations that expose this feature.

If the `VkPhysicalDevicePerformanceCountersByRegionFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePerformanceCountersByRegionFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePerformanceCountersByRegionFeaturesARM-sType-sType) VUID-VkPhysicalDevicePerformanceCountersByRegionFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_COUNTERS_BY_REGION_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV` structure is
defined as:

// Provided by VK_NV_compute_occupancy_priority
typedef struct VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           computeOccupancyPriority;
} VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `computeOccupancyPriority` is
true if compute occupancy priority is supported.

If the `VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV-sType-sType) VUID-VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_OCCUPANCY_PRIORITY_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDevicePushConstantBankFeaturesNV` structure is defined
as:

// Provided by VK_NV_push_constant_bank
typedef struct VkPhysicalDevicePushConstantBankFeaturesNV {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pushConstantBank;
} VkPhysicalDevicePushConstantBankFeaturesNV;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pushConstantBank` indicates whether
push constant bank functionality is supported.

If the `VkPhysicalDevicePushConstantBankFeaturesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDevicePushConstantBankFeaturesNV`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePushConstantBankFeaturesNV-sType-sType) VUID-VkPhysicalDevicePushConstantBankFeaturesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_CONSTANT_BANK_FEATURES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDescriptorHeapFeaturesEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkPhysicalDeviceDescriptorHeapFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           descriptorHeap;
    VkBool32           descriptorHeapCaptureReplay;
} VkPhysicalDeviceDescriptorHeapFeaturesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `descriptorHeap` specifies whether
[descriptor heaps](descriptorheaps.html#descriptorheaps) **can** be used.

* 

`descriptorHeapCaptureReplay` specifies whether
[heap descriptors](descriptorheaps.html#descriptorheaps-writing) **can** be captured and
replayed.

If the `VkPhysicalDeviceDescriptorHeapFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDescriptorHeapFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorHeapFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorHeapFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_FEATURES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE` structure
is defined as:

// Provided by VK_VALVE_shader_mixed_float_dot_product
typedef struct VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderMixedFloatDotProductFloat16AccFloat32;
    VkBool32           shaderMixedFloatDotProductFloat16AccFloat16;
    VkBool32           shaderMixedFloatDotProductBFloat16Acc;
    VkBool32           shaderMixedFloatDotProductFloat8AccFloat32;
} VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`shaderMixedFloatDotProductFloat16AccFloat32` indicates whether the
implementation supports shaders with the
`DotProductFloat16AccFloat32VALVE` capability.

* 

`shaderMixedFloatDotProductFloat16AccFloat16` indicates whether the
implementation supports shaders with the
`DotProductFloat16AccFloat16VALVE` capability.

* 

`shaderMixedFloatDotProductBFloat16Acc` indicates whether the
implementation supports shaders with the `DotProductBFloat16AccVALVE`
capability.

* 

`shaderMixedFloatDotProductFloat8AccFloat32` indicates whether the
implementation supports shaders with the
`DotProductFloat8AccFloat32VALVE` capability.

If the `VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE-sType-sType) VUID-VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MIXED_FLOAT_DOT_PRODUCT_FEATURES_VALVE](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderInstrumentationFeaturesARM` structure is
defined as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkPhysicalDeviceShaderInstrumentationFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderInstrumentation;
} VkPhysicalDeviceShaderInstrumentationFeaturesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderInstrumentation` specifies
whether shader instrumentation is supported.

If the `VkPhysicalDeviceShaderInstrumentationFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderInstrumentationFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderInstrumentationFeaturesARM-sType-sType) VUID-VkPhysicalDeviceShaderInstrumentationFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INSTRUMENTATION_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR` structure is
defined as:

// Provided by VK_KHR_device_address_commands
typedef struct VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceAddressCommands;
} VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `deviceAddressCommands` specifies
whether the implementation supports commands taking a
`VkDeviceAddress` that would otherwise take a [VkBuffer](resources.html#VkBuffer)
object.

If the `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_ADDRESS_COMMANDS_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderConstantDataFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_shader_constant_data
typedef struct VkPhysicalDeviceShaderConstantDataFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderConstantData;
} VkPhysicalDeviceShaderConstantDataFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderConstantData` specifies
whether the implementation supports SPIR-V modules that use the
`VK_KHR_shader_constant_data` extension.

If the `VkPhysicalDeviceShaderConstantDataFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderConstantDataFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderConstantDataFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderConstantDataFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CONSTANT_DATA_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceShaderAbortFeaturesKHR` structure is defined as:

// Provided by VK_KHR_shader_abort
typedef struct VkPhysicalDeviceShaderAbortFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderAbort;
} VkPhysicalDeviceShaderAbortFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderAbort` specifies whether shaders
**can** declare the `AbortKHR` capability.

If the `VkPhysicalDeviceShaderAbortFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceShaderAbortFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderAbortFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderAbortFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ABORT_FEATURES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

The `VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM` structure is
defined as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dataGraphOpticalFlow;
} VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM;

This structure describes the following feature:
  * `sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.
  * `pNext` is `NULL` or a pointer to a structure extending this
    structure.
  *  `dataGraphOpticalFlow` indicates
    whether the implementation supports optical flow graph pipelines.

If the `VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM-sType-sType) VUID-VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_OPTICAL_FLOW_FEATURES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](#VkPhysicalDeviceFeatures2)

All Vulkan graphics implementations **must** support the following features:

* 
If Vulkan 1.0 is supported,
[`robustBufferAccess`](#features-robustBufferAccess) **must** be supported
if `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` is not advertised

* 
If Vulkan 1.1 is supported,
the following features **must** be supported:

[`multiview`](#features-multiview)

* 
[`storageBuffer16BitAccess`](#features-storageBuffer16BitAccess)
if [`uniformAndStorageBuffer16BitAccess`](#features-uniformAndStorageBuffer16BitAccess) is supported

* 
[`shaderDrawParameters`](#features-shaderDrawParameters)
if `[VK_KHR_shader_draw_parameters](../appendices/extensions.html#VK_KHR_shader_draw_parameters)` is supported

If Vulkan 1.2 is supported,
the following features **must** be supported:

* 
[`subgroupBroadcastDynamicId`](#features-subgroupBroadcastDynamicId)

* 
[`imagelessFramebuffer`](#features-imagelessFramebuffer)

* 
[`uniformBufferStandardLayout`](#features-uniformBufferStandardLayout)

* 
[`shaderSubgroupExtendedTypes`](#features-shaderSubgroupExtendedTypes)

* 
[`separateDepthStencilLayouts`](#features-separateDepthStencilLayouts)

* 
[`hostQueryReset`](#features-hostQueryReset)

* 
[`timelineSemaphore`](#features-timelineSemaphore)

* 
[`samplerMirrorClampToEdge`](#features-samplerMirrorClampToEdge)
if `[VK_KHR_sampler_mirror_clamp_to_edge](../appendices/extensions.html#VK_KHR_sampler_mirror_clamp_to_edge)` is supported

* 
[`drawIndirectCount`](#features-drawIndirectCount)
if `[VK_KHR_draw_indirect_count](../appendices/extensions.html#VK_KHR_draw_indirect_count)` is supported

* 
[`storageBuffer8BitAccess`](#features-storageBuffer8BitAccess)
if [`uniformAndStorageBuffer8BitAccess`](#features-uniformAndStorageBuffer8BitAccess) is supported

* 
[`shaderInt64`](#features-shaderInt64)
if [`shaderSharedInt64Atomics`](#features-shaderSharedInt64Atomics) or [`shaderBufferInt64Atomics`](#features-shaderBufferInt64Atomics) are supported

* 
[`descriptorIndexing`](#features-descriptorIndexing)
if `[VK_EXT_descriptor_indexing](../appendices/extensions.html#VK_EXT_descriptor_indexing)` is supported

* 
[`shaderSampledImageArrayDynamicIndexing`](#features-shaderSampledImageArrayDynamicIndexing)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`shaderStorageBufferArrayDynamicIndexing`](#features-shaderStorageBufferArrayDynamicIndexing)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`shaderUniformTexelBufferArrayDynamicIndexing`](#features-shaderUniformTexelBufferArrayDynamicIndexing)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`shaderStorageTexelBufferArrayDynamicIndexing`](#features-shaderStorageTexelBufferArrayDynamicIndexing)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`shaderSampledImageArrayNonUniformIndexing`](#features-shaderSampledImageArrayNonUniformIndexing)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`shaderStorageBufferArrayNonUniformIndexing`](#features-shaderStorageBufferArrayNonUniformIndexing)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`shaderUniformTexelBufferArrayNonUniformIndexing`](#features-shaderUniformTexelBufferArrayNonUniformIndexing)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`descriptorBindingSampledImageUpdateAfterBind`](#features-descriptorBindingSampledImageUpdateAfterBind)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`descriptorBindingStorageImageUpdateAfterBind`](#features-descriptorBindingStorageImageUpdateAfterBind)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`descriptorBindingStorageBufferUpdateAfterBind`](#features-descriptorBindingStorageBufferUpdateAfterBind)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`descriptorBindingUniformTexelBufferUpdateAfterBind`](#features-descriptorBindingUniformTexelBufferUpdateAfterBind)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`descriptorBindingStorageTexelBufferUpdateAfterBind`](#features-descriptorBindingStorageTexelBufferUpdateAfterBind)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`descriptorBindingUpdateUnusedWhilePending`](#features-descriptorBindingUpdateUnusedWhilePending)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`descriptorBindingPartiallyBound`](#features-descriptorBindingPartiallyBound)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`runtimeDescriptorArray`](#features-runtimeDescriptorArray)
if [`descriptorIndexing`](#features-descriptorIndexing) is supported

* 
[`shaderOutputViewportIndex`](#features-shaderOutputViewportIndex)
if `[VK_EXT_shader_viewport_index_layer](../appendices/extensions.html#VK_EXT_shader_viewport_index_layer)` is supported

* 
[`shaderOutputLayer`](#features-shaderOutputLayer)
if `[VK_EXT_shader_viewport_index_layer](../appendices/extensions.html#VK_EXT_shader_viewport_index_layer)` is supported

* 
[`samplerFilterMinmax`](#features-samplerFilterMinmax)
if `[VK_EXT_sampler_filter_minmax](../appendices/extensions.html#VK_EXT_sampler_filter_minmax)` is supported

If Vulkan 1.3 is supported,
the following features **must** be supported:

* 
[`shaderTerminateInvocation`](#features-shaderTerminateInvocation)

* 
[`shaderDemoteToHelperInvocation`](#features-shaderDemoteToHelperInvocation)

* 
[`privateData`](#features-privateData)

* 
[`pipelineCreationCacheControl`](#features-pipelineCreationCacheControl)

* 
[`synchronization2`](#features-synchronization2)

* 
[`shaderZeroInitializeWorkgroupMemory`](#features-shaderZeroInitializeWorkgroupMemory)

* 
[`robustImageAccess`](#features-robustImageAccess)

* 
[`subgroupSizeControl`](#features-subgroupSizeControl)

* 
[`computeFullSubgroups`](#features-computeFullSubgroups)

* 
[`dynamicRendering`](#features-dynamicRendering)

* 
[`shaderIntegerDotProduct`](#features-shaderIntegerDotProduct)

* 
[`maintenance4`](#features-maintenance4)

* 
[`vulkanMemoryModel`](#features-vulkanMemoryModel)

* 
[`vulkanMemoryModelDeviceScope`](#features-vulkanMemoryModelDeviceScope)

* 
[`inlineUniformBlock`](#features-inlineUniformBlock)

* 
[`bufferDeviceAddress`](#features-bufferDeviceAddress)

* 
[`descriptorBindingInlineUniformBlockUpdateAfterBind`](#features-descriptorBindingInlineUniformBlockUpdateAfterBind)
if `[VK_EXT_descriptor_indexing](../appendices/extensions.html#VK_EXT_descriptor_indexing)` or [`descriptorIndexing`](#features-descriptorIndexing) are supported

If Vulkan 1.4 is supported,
the following features **must** be supported:

* 
[`fullDrawIndexUint32`](#features-fullDrawIndexUint32)

* 
[`imageCubeArray`](#features-imageCubeArray)

* 
[`independentBlend`](#features-independentBlend)

* 
[`sampleRateShading`](#features-sampleRateShading)

* 
[`drawIndirectFirstInstance`](#features-drawIndirectFirstInstance)

* 
[`depthClamp`](#features-depthClamp)

* 
[`depthBiasClamp`](#features-depthBiasClamp)

* 
[`samplerAnisotropy`](#features-samplerAnisotropy)

* 
[`fragmentStoresAndAtomics`](#features-fragmentStoresAndAtomics)

* 
[`shaderStorageImageExtendedFormats`](#features-shaderStorageImageExtendedFormats)

* 
[`shaderUniformBufferArrayDynamicIndexing`](#features-shaderUniformBufferArrayDynamicIndexing)

* 
[`shaderSampledImageArrayDynamicIndexing`](#features-shaderSampledImageArrayDynamicIndexing)

* 
[`shaderStorageBufferArrayDynamicIndexing`](#features-shaderStorageBufferArrayDynamicIndexing)

* 
[`shaderStorageImageArrayDynamicIndexing`](#features-shaderStorageImageArrayDynamicIndexing)

* 
[`shaderImageGatherExtended`](#features-shaderImageGatherExtended)

* 
[`shaderInt16`](#features-shaderInt16)

* 
[`largePoints`](#features-largePoints)

* 
[`samplerYcbcrConversion`](#features-samplerYcbcrConversion)

* 
[`storageBuffer16BitAccess`](#features-storageBuffer16BitAccess)

* 
[`variablePointers`](#features-variablePointers)

* 
[`variablePointersStorageBuffer`](#features-variablePointersStorageBuffer)

* 
[`samplerMirrorClampToEdge`](#features-samplerMirrorClampToEdge)

* 
[`scalarBlockLayout`](#features-scalarBlockLayout)

* 
[`shaderUniformTexelBufferArrayDynamicIndexing`](#features-shaderUniformTexelBufferArrayDynamicIndexing)

* 
[`shaderStorageTexelBufferArrayDynamicIndexing`](#features-shaderStorageTexelBufferArrayDynamicIndexing)

* 
[`shaderInt8`](#features-shaderInt8)

* 
[`storageBuffer8BitAccess`](#features-storageBuffer8BitAccess)

* 
[`globalPriorityQuery`](#features-globalPriorityQuery)

* 
[`shaderSubgroupRotate`](#features-shaderSubgroupRotate)

* 
[`shaderSubgroupRotateClustered`](#features-shaderSubgroupRotateClustered)

* 
[`shaderFloatControls2`](#features-shaderFloatControls2)

* 
[`shaderExpectAssume`](#features-shaderExpectAssume)

* 
[`bresenhamLines`](#features-bresenhamLines)

* 
[`vertexAttributeInstanceRateDivisor`](#features-vertexAttributeInstanceRateDivisor)

* 
[`indexTypeUint8`](#features-indexTypeUint8)

* 
[`maintenance5`](#features-maintenance5)

* 
[`pushDescriptor`](#features-pushDescriptor)

* 
[`dynamicRenderingLocalRead`](#features-dynamicRenderingLocalRead)

* 
[`maintenance6`](#features-maintenance6)

* 
[`pipelineRobustness`](#features-pipelineRobustness)

* 
[`pipelineProtectedAccess`](#features-pipelineProtectedAccess)
if [`protectedMemory`](#features-protectedMemory) is supported

If `[VK_KHR_dynamic_rendering](../appendices/extensions.html#VK_KHR_dynamic_rendering)` is supported,
[`dynamicRendering`](#features-dynamicRendering) **must** be supported

If `[VK_KHR_multiview](../appendices/extensions.html#VK_KHR_multiview)` is supported,
[`multiview`](#features-multiview) **must** be supported

If `[VK_KHR_shader_float16_int8](../appendices/extensions.html#VK_KHR_shader_float16_int8)` is supported,
at least one of [`shaderFloat16`](#features-shaderFloat16) or [`shaderInt8`](#features-shaderInt8) **must** be supported

If `[VK_KHR_16bit_storage](../appendices/extensions.html#VK_KHR_16bit_storage)` is supported,
[`storageBuffer16BitAccess`](#features-storageBuffer16BitAccess) **must** be supported

If `[VK_KHR_imageless_framebuffer](../appendices/extensions.html#VK_KHR_imageless_framebuffer)` is supported,
[`imagelessFramebuffer`](#features-imagelessFramebuffer) **must** be supported

If `[VK_KHR_performance_query](../appendices/extensions.html#VK_KHR_performance_query)` is supported,
[`performanceCounterQueryPools`](#features-performanceCounterQueryPools) **must** be supported

If `[VK_KHR_variable_pointers](../appendices/extensions.html#VK_KHR_variable_pointers)` is supported,
[`variablePointersStorageBuffer`](#features-variablePointersStorageBuffer) **must** be supported

If `[VK_KHR_shader_bfloat16](../appendices/extensions.html#VK_KHR_shader_bfloat16)` is supported,
the following features **must** be supported:

* 
[`shaderBFloat16Type`](#features-shaderBFloat16Type)

* 
at least one of [`shaderBFloat16CooperativeMatrix`](#features-shaderBFloat16CooperativeMatrix) or [`shaderBFloat16DotProduct`](#features-shaderBFloat16DotProduct)

If `[VK_KHR_sampler_ycbcr_conversion](../appendices/extensions.html#VK_KHR_sampler_ycbcr_conversion)` is supported,
[`samplerYcbcrConversion`](#features-samplerYcbcrConversion) **must** be supported

If `[VK_KHR_shader_subgroup_extended_types](../appendices/extensions.html#VK_KHR_shader_subgroup_extended_types)` is supported,
[`shaderSubgroupExtendedTypes`](#features-shaderSubgroupExtendedTypes) **must** be supported

If `[VK_KHR_8bit_storage](../appendices/extensions.html#VK_KHR_8bit_storage)` is supported,
[`storageBuffer8BitAccess`](#features-storageBuffer8BitAccess) **must** be supported

If `[VK_KHR_shader_atomic_int64](../appendices/extensions.html#VK_KHR_shader_atomic_int64)` is supported,
[`shaderBufferInt64Atomics`](#features-shaderBufferInt64Atomics) **must** be supported

If `[VK_KHR_shader_clock](../appendices/extensions.html#VK_KHR_shader_clock)` is supported,
[`shaderSubgroupClock`](#features-shaderSubgroupClock) **must** be supported

If `[VK_KHR_global_priority](../appendices/extensions.html#VK_KHR_global_priority)` is supported,
[`globalPriorityQuery`](#features-globalPriorityQuery) **must** be supported

If `[VK_KHR_timeline_semaphore](../appendices/extensions.html#VK_KHR_timeline_semaphore)` is supported,
[`timelineSemaphore`](#features-timelineSemaphore) **must** be supported

If `[VK_KHR_vulkan_memory_model](../appendices/extensions.html#VK_KHR_vulkan_memory_model)` is supported,
[`vulkanMemoryModel`](#features-vulkanMemoryModel) **must** be supported

If `[VK_KHR_shader_terminate_invocation](../appendices/extensions.html#VK_KHR_shader_terminate_invocation)` is supported,
[`shaderTerminateInvocation`](#features-shaderTerminateInvocation) **must** be supported

If `[VK_KHR_fragment_shading_rate](../appendices/extensions.html#VK_KHR_fragment_shading_rate)` is supported,
[`pipelineFragmentShadingRate`](#features-pipelineFragmentShadingRate) **must** be supported

If `[VK_KHR_shader_constant_data](../appendices/extensions.html#VK_KHR_shader_constant_data)` is supported,
[`shaderConstantData`](#features-shaderConstantData) **must** be supported

If `[VK_KHR_dynamic_rendering_local_read](../appendices/extensions.html#VK_KHR_dynamic_rendering_local_read)` is supported,
[`dynamicRenderingLocalRead`](#features-dynamicRenderingLocalRead) **must** be supported

If `[VK_KHR_shader_abort](../appendices/extensions.html#VK_KHR_shader_abort)` is supported,
[`shaderAbort`](#features-shaderAbort) **must** be supported

If `[VK_KHR_shader_quad_control](../appendices/extensions.html#VK_KHR_shader_quad_control)` is supported,
[`shaderQuadControl`](#features-shaderQuadControl) **must** be supported

If `[VK_KHR_separate_depth_stencil_layouts](../appendices/extensions.html#VK_KHR_separate_depth_stencil_layouts)` is supported,
[`separateDepthStencilLayouts`](#features-separateDepthStencilLayouts) **must** be supported

If `[VK_KHR_present_wait](../appendices/extensions.html#VK_KHR_present_wait)` is supported,
[`presentWait`](#features-presentWait) **must** be supported

If `[VK_KHR_uniform_buffer_standard_layout](../appendices/extensions.html#VK_KHR_uniform_buffer_standard_layout)` is supported,
[`uniformBufferStandardLayout`](#features-uniformBufferStandardLayout) **must** be supported

If `[VK_KHR_buffer_device_address](../appendices/extensions.html#VK_KHR_buffer_device_address)` is supported,
[`bufferDeviceAddress`](#features-bufferDeviceAddress) **must** be supported

If `[VK_KHR_pipeline_executable_properties](../appendices/extensions.html#VK_KHR_pipeline_executable_properties)` is supported,
[`pipelineExecutableInfo`](#features-pipelineExecutableInfo) **must** be supported

If `[VK_KHR_shader_integer_dot_product](../appendices/extensions.html#VK_KHR_shader_integer_dot_product)` is supported,
[`shaderIntegerDotProduct`](#features-shaderIntegerDotProduct) **must** be supported

If `[VK_KHR_present_id](../appendices/extensions.html#VK_KHR_present_id)` is supported,
[`presentId`](#features-presentId) **must** be supported

If `[VK_KHR_synchronization2](../appendices/extensions.html#VK_KHR_synchronization2)` is supported,
[`synchronization2`](#features-synchronization2) **must** be supported

If `[VK_KHR_device_address_commands](../appendices/extensions.html#VK_KHR_device_address_commands)` is supported,
[`deviceAddressCommands`](#features-deviceAddressCommands) **must** be supported

If `[VK_KHR_fragment_shader_barycentric](../appendices/extensions.html#VK_KHR_fragment_shader_barycentric)` is supported,
[`fragmentShaderBarycentric`](#features-fragmentShaderBarycentric) **must** be supported

If `[VK_KHR_shader_subgroup_uniform_control_flow](../appendices/extensions.html#VK_KHR_shader_subgroup_uniform_control_flow)` is supported,
[`shaderSubgroupUniformControlFlow`](#features-shaderSubgroupUniformControlFlow) **must** be supported

If `[VK_KHR_zero_initialize_workgroup_memory](../appendices/extensions.html#VK_KHR_zero_initialize_workgroup_memory)` is supported,
[`shaderZeroInitializeWorkgroupMemory`](#features-shaderZeroInitializeWorkgroupMemory) **must** be supported

If `[VK_KHR_workgroup_memory_explicit_layout](../appendices/extensions.html#VK_KHR_workgroup_memory_explicit_layout)` is supported,
[`workgroupMemoryExplicitLayout`](#features-workgroupMemoryExplicitLayout) **must** be supported

If `[VK_KHR_ray_tracing_maintenance1](../appendices/extensions.html#VK_KHR_ray_tracing_maintenance1)` is supported,
[`rayTracingMaintenance1`](#features-rayTracingMaintenance1) **must** be supported

If `[VK_KHR_shader_untyped_pointers](../appendices/extensions.html#VK_KHR_shader_untyped_pointers)` is supported,
[`shaderUntypedPointers`](#features-shaderUntypedPointers) **must** be supported

If `[VK_KHR_maintenance4](../appendices/extensions.html#VK_KHR_maintenance4)` is supported,
[`maintenance4`](#features-maintenance4) **must** be supported

If `[VK_KHR_shader_subgroup_rotate](../appendices/extensions.html#VK_KHR_shader_subgroup_rotate)` is supported,
[`shaderSubgroupRotate`](#features-shaderSubgroupRotate) **must** be supported

If `[VK_KHR_shader_maximal_reconvergence](../appendices/extensions.html#VK_KHR_shader_maximal_reconvergence)` is supported,
[`shaderMaximalReconvergence`](#features-shaderMaximalReconvergence) **must** be supported

If `[VK_KHR_maintenance5](../appendices/extensions.html#VK_KHR_maintenance5)` is supported,
[`maintenance5`](#features-maintenance5) **must** be supported

If `[VK_KHR_present_id2](../appendices/extensions.html#VK_KHR_present_id2)` is supported,
[`presentId2`](#features-presentId2) **must** be supported

If `[VK_KHR_present_wait2](../appendices/extensions.html#VK_KHR_present_wait2)` is supported,
[`presentWait2`](#features-presentWait2) **must** be supported

If `[VK_KHR_ray_tracing_position_fetch](../appendices/extensions.html#VK_KHR_ray_tracing_position_fetch)` is supported,
[`rayTracingPositionFetch`](#features-rayTracingPositionFetch) **must** be supported

If `[VK_KHR_pipeline_binary](../appendices/extensions.html#VK_KHR_pipeline_binary)` is supported,
[`pipelineBinaries`](#features-pipelineBinaries) **must** be supported

If `[VK_KHR_swapchain_maintenance1](../appendices/extensions.html#VK_KHR_swapchain_maintenance1)` is supported,
[`swapchainMaintenance1`](#features-swapchainMaintenance1) **must** be supported

If `[VK_KHR_internally_synchronized_queues](../appendices/extensions.html#VK_KHR_internally_synchronized_queues)` is supported,
[`internallySynchronizedQueues`](#features-internallySynchronizedQueues) **must** be supported

If `[VK_KHR_cooperative_matrix](../appendices/extensions.html#VK_KHR_cooperative_matrix)` is supported,
[`cooperativeMatrix`](#features-cooperativeMatrix) **must** be supported

If `[VK_KHR_compute_shader_derivatives](../appendices/extensions.html#VK_KHR_compute_shader_derivatives)` is supported,
[`computeDerivativeGroupLinear`](#features-computeDerivativeGroupLinear) **must** be supported

If `[VK_KHR_video_encode_av1](../appendices/extensions.html#VK_KHR_video_encode_av1)` is supported,
[`videoEncodeAV1`](#features-videoEncodeAV1) **must** be supported

If `[VK_KHR_video_decode_vp9](../appendices/extensions.html#VK_KHR_video_decode_vp9)` is supported,
[`videoDecodeVP9`](#features-videoDecodeVP9) **must** be supported

If `[VK_KHR_video_maintenance1](../appendices/extensions.html#VK_KHR_video_maintenance1)` is supported,
[`videoMaintenance1`](#features-videoMaintenance1) **must** be supported

If `[VK_KHR_vertex_attribute_divisor](../appendices/extensions.html#VK_KHR_vertex_attribute_divisor)` is supported,
[`vertexAttributeInstanceRateDivisor`](#features-vertexAttributeInstanceRateDivisor) **must** be supported

If `[VK_KHR_unified_image_layouts](../appendices/extensions.html#VK_KHR_unified_image_layouts)` is supported,
[`unifiedImageLayouts`](#features-unifiedImageLayouts) **must** be supported

If `[VK_KHR_shader_float_controls2](../appendices/extensions.html#VK_KHR_shader_float_controls2)` is supported,
[`shaderFloatControls2`](#features-shaderFloatControls2) **must** be supported

If `[VK_KHR_index_type_uint8](../appendices/extensions.html#VK_KHR_index_type_uint8)` is supported,
[`indexTypeUint8`](#features-indexTypeUint8) **must** be supported

If `[VK_KHR_line_rasterization](../appendices/extensions.html#VK_KHR_line_rasterization)` is supported,
at least one of [`rectangularLines`](#features-rectangularLines), [`bresenhamLines`](#features-bresenhamLines), [`smoothLines`](#features-smoothLines), [`stippledRectangularLines`](#features-stippledRectangularLines), [`stippledBresenhamLines`](#features-stippledBresenhamLines), or [`stippledSmoothLines`](#features-stippledSmoothLines) **must** be supported

If `[VK_KHR_shader_expect_assume](../appendices/extensions.html#VK_KHR_shader_expect_assume)` is supported,
[`shaderExpectAssume`](#features-shaderExpectAssume) **must** be supported

If `[VK_KHR_maintenance6](../appendices/extensions.html#VK_KHR_maintenance6)` is supported,
[`maintenance6`](#features-maintenance6) **must** be supported

If `[VK_KHR_copy_memory_indirect](../appendices/extensions.html#VK_KHR_copy_memory_indirect)` is supported,
[`indirectMemoryCopy`](#features-indirectMemoryCopy) **must** be supported

If `[VK_KHR_video_encode_intra_refresh](../appendices/extensions.html#VK_KHR_video_encode_intra_refresh)` is supported,
[`videoEncodeIntraRefresh`](#features-videoEncodeIntraRefresh) **must** be supported

If `[VK_KHR_video_encode_quantization_map](../appendices/extensions.html#VK_KHR_video_encode_quantization_map)` is supported,
[`videoEncodeQuantizationMap`](#features-videoEncodeQuantizationMap) **must** be supported

If `[VK_KHR_shader_relaxed_extended_instruction](../appendices/extensions.html#VK_KHR_shader_relaxed_extended_instruction)` is supported,
[`shaderRelaxedExtendedInstruction`](#features-shaderRelaxedExtendedInstruction) **must** be supported

If `[VK_KHR_maintenance7](../appendices/extensions.html#VK_KHR_maintenance7)` is supported,
[`maintenance7`](#features-maintenance7) **must** be supported

If `[VK_KHR_device_fault](../appendices/extensions.html#VK_KHR_device_fault)` is supported,
[`deviceFault`](#features-deviceFault) **must** be supported

If `[VK_KHR_maintenance8](../appendices/extensions.html#VK_KHR_maintenance8)` is supported,
[`maintenance8`](#features-maintenance8) **must** be supported

If `[VK_KHR_shader_fma](../appendices/extensions.html#VK_KHR_shader_fma)` is supported,
[`shaderFmaFloat32`](#features-shaderFmaFloat32) **must** be supported

If `[VK_KHR_maintenance9](../appendices/extensions.html#VK_KHR_maintenance9)` is supported,
[`maintenance9`](#features-maintenance9) **must** be supported

If `[VK_KHR_video_maintenance2](../appendices/extensions.html#VK_KHR_video_maintenance2)` is supported,
[`videoMaintenance2`](#features-videoMaintenance2) **must** be supported

If `[VK_KHR_depth_clamp_zero_one](../appendices/extensions.html#VK_KHR_depth_clamp_zero_one)` is supported,
[`depthClampZeroOne`](#features-depthClampZeroOne) **must** be supported

If `[VK_KHR_robustness2](../appendices/extensions.html#VK_KHR_robustness2)` is supported,
at least one of [`robustBufferAccess2`](#features-robustBufferAccess2), [`robustImageAccess2`](#features-robustImageAccess2), or [`nullDescriptor`](#features-nullDescriptor) **must** be supported

If `[VK_KHR_present_mode_fifo_latest_ready](../appendices/extensions.html#VK_KHR_present_mode_fifo_latest_ready)` is supported,
[`presentModeFifoLatestReady`](#features-presentModeFifoLatestReady) **must** be supported

If `[VK_KHR_maintenance10](../appendices/extensions.html#VK_KHR_maintenance10)` is supported,
[`maintenance10`](#features-maintenance10) **must** be supported

If `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` is supported,
[`transformFeedback`](#features-transformFeedback) **must** be supported

If `[VK_NV_corner_sampled_image](../appendices/extensions.html#VK_NV_corner_sampled_image)` is supported,
[`cornerSampledImage`](#features-cornerSampledImage) **must** be supported

If `[VK_EXT_texture_compression_astc_hdr](../appendices/extensions.html#VK_EXT_texture_compression_astc_hdr)` is supported,
[`textureCompressionASTC_HDR`](#features-textureCompressionASTC_HDR) **must** be supported

If `[VK_EXT_pipeline_robustness](../appendices/extensions.html#VK_EXT_pipeline_robustness)` is supported,
[`pipelineRobustness`](#features-pipelineRobustness) **must** be supported

If `[VK_EXT_conditional_rendering](../appendices/extensions.html#VK_EXT_conditional_rendering)` is supported,
[`conditionalRendering`](#features-conditionalRendering) **must** be supported

If `[VK_EXT_depth_clip_enable](../appendices/extensions.html#VK_EXT_depth_clip_enable)` is supported,
[`depthClipEnable`](#features-depthClipEnable) **must** be supported

If `[VK_IMG_relaxed_line_rasterization](../appendices/extensions.html#VK_IMG_relaxed_line_rasterization)` is supported,
[`relaxedLineRasterization`](#features-relaxedLineRasterization) **must** be supported

If `[VK_AMDX_shader_enqueue](../appendices/extensions.html#VK_AMDX_shader_enqueue)` is supported,
the following features **must** be supported:

* 
[`shaderEnqueue`](#features-shaderEnqueue)

* 
[`shaderMeshEnqueue`](#features-shaderMeshEnqueue)
if `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` is supported

If `[VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap)` is supported,
[`descriptorHeap`](#features-descriptorHeap) **must** be supported

If `[VK_EXT_inline_uniform_block](../appendices/extensions.html#VK_EXT_inline_uniform_block)` is supported,
the following features **must** be supported:

* 
[`inlineUniformBlock`](#features-inlineUniformBlock)

* 
[`descriptorBindingInlineUniformBlockUpdateAfterBind`](#features-descriptorBindingInlineUniformBlockUpdateAfterBind)
if `[VK_EXT_descriptor_indexing](../appendices/extensions.html#VK_EXT_descriptor_indexing)` is supported, or
if Vulkan 1.2 and [`descriptorIndexing`](#features-descriptorIndexing) are supported

If `[VK_NV_shader_sm_builtins](../appendices/extensions.html#VK_NV_shader_sm_builtins)` is supported,
[`shaderSMBuiltins`](#features-shaderSMBuiltins) **must** be supported

If `[VK_EXT_descriptor_indexing](../appendices/extensions.html#VK_EXT_descriptor_indexing)` is supported,
the following features **must** be supported:

* 
[`shaderSampledImageArrayDynamicIndexing`](#features-shaderSampledImageArrayDynamicIndexing)

* 
[`shaderStorageBufferArrayDynamicIndexing`](#features-shaderStorageBufferArrayDynamicIndexing)

* 
[`shaderUniformTexelBufferArrayDynamicIndexing`](#features-shaderUniformTexelBufferArrayDynamicIndexing)

* 
[`shaderStorageTexelBufferArrayDynamicIndexing`](#features-shaderStorageTexelBufferArrayDynamicIndexing)

* 
[`shaderSampledImageArrayNonUniformIndexing`](#features-shaderSampledImageArrayNonUniformIndexing)

* 
[`shaderStorageBufferArrayNonUniformIndexing`](#features-shaderStorageBufferArrayNonUniformIndexing)

* 
[`shaderUniformTexelBufferArrayNonUniformIndexing`](#features-shaderUniformTexelBufferArrayNonUniformIndexing)

* 
[`descriptorBindingSampledImageUpdateAfterBind`](#features-descriptorBindingSampledImageUpdateAfterBind)

* 
[`descriptorBindingStorageImageUpdateAfterBind`](#features-descriptorBindingStorageImageUpdateAfterBind)

* 
[`descriptorBindingStorageBufferUpdateAfterBind`](#features-descriptorBindingStorageBufferUpdateAfterBind)

* 
[`descriptorBindingUniformTexelBufferUpdateAfterBind`](#features-descriptorBindingUniformTexelBufferUpdateAfterBind)

* 
[`descriptorBindingStorageTexelBufferUpdateAfterBind`](#features-descriptorBindingStorageTexelBufferUpdateAfterBind)

* 
[`descriptorBindingUpdateUnusedWhilePending`](#features-descriptorBindingUpdateUnusedWhilePending)

* 
[`descriptorBindingPartiallyBound`](#features-descriptorBindingPartiallyBound)

* 
[`runtimeDescriptorArray`](#features-runtimeDescriptorArray)

If `[VK_NV_shading_rate_image](../appendices/extensions.html#VK_NV_shading_rate_image)` is supported,
[`shadingRateImage`](#features-shadingRateImage) **must** be supported

If `[VK_NV_representative_fragment_test](../appendices/extensions.html#VK_NV_representative_fragment_test)` is supported,
[`representativeFragmentTest`](#features-representativeFragmentTest) **must** be supported

If `[VK_QCOM_cooperative_matrix_conversion](../appendices/extensions.html#VK_QCOM_cooperative_matrix_conversion)` is supported,
[`cooperativeMatrixConversion`](#features-cooperativeMatrixConversion) **must** be supported

If `[VK_EXT_vertex_attribute_divisor](../appendices/extensions.html#VK_EXT_vertex_attribute_divisor)` is supported,
[`vertexAttributeInstanceRateDivisor`](#features-vertexAttributeInstanceRateDivisor) **must** be supported

If `[VK_NV_compute_shader_derivatives](../appendices/extensions.html#VK_NV_compute_shader_derivatives)` is supported,
at least one of [`computeDerivativeGroupQuads`](#features-computeDerivativeGroupQuads) or [`computeDerivativeGroupLinear`](#features-computeDerivativeGroupLinear) **must** be supported

If `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` is supported,
[`VkPhysicalDeviceMeshShaderFeaturesNV`::`meshShader`](#features-meshShaderNV) **must** be supported

If `[VK_NV_shader_image_footprint](../appendices/extensions.html#VK_NV_shader_image_footprint)` is supported,
[`imageFootprint`](#features-imageFootprint) **must** be supported

If `[VK_NV_scissor_exclusive](../appendices/extensions.html#VK_NV_scissor_exclusive)` is supported,
[`exclusiveScissor`](#features-exclusiveScissor) **must** be supported

If `[VK_EXT_present_timing](../appendices/extensions.html#VK_EXT_present_timing)` is supported,
[`presentTiming`](#features-presentTiming) **must** be supported

If `[VK_INTEL_shader_integer_functions2](../appendices/extensions.html#VK_INTEL_shader_integer_functions2)` is supported,
[`shaderIntegerFunctions2`](#features-shaderIntegerFunctions2) **must** be supported

If `[VK_EXT_fragment_density_map](../appendices/extensions.html#VK_EXT_fragment_density_map)` is supported,
[`fragmentDensityMap`](#features-fragmentDensityMap) **must** be supported

If `[VK_EXT_scalar_block_layout](../appendices/extensions.html#VK_EXT_scalar_block_layout)` is supported,
[`scalarBlockLayout`](#features-scalarBlockLayout) **must** be supported

If `[VK_EXT_subgroup_size_control](../appendices/extensions.html#VK_EXT_subgroup_size_control)` is supported,
the following features **must** be supported:

* 
[`subgroupSizeControl`](#features-subgroupSizeControl)

* 
[`computeFullSubgroups`](#features-computeFullSubgroups)

If `[VK_AMD_device_coherent_memory](../appendices/extensions.html#VK_AMD_device_coherent_memory)` is supported,
[`deviceCoherentMemory`](#features-deviceCoherentMemory) **must** be supported

If `[VK_EXT_shader_image_atomic_int64](../appendices/extensions.html#VK_EXT_shader_image_atomic_int64)` is supported,
the following features **must** be supported:

* 
[`shaderInt64`](#features-shaderInt64)

* 
[`shaderImageInt64Atomics`](#features-shaderImageInt64Atomics)

If `[VK_EXT_memory_priority](../appendices/extensions.html#VK_EXT_memory_priority)` is supported,
[`memoryPriority`](#features-memoryPriority) **must** be supported

If `[VK_NV_dedicated_allocation_image_aliasing](../appendices/extensions.html#VK_NV_dedicated_allocation_image_aliasing)` is supported,
[`dedicatedAllocationImageAliasing`](#features-dedicatedAllocationImageAliasing) **must** be supported

If `[VK_EXT_buffer_device_address](../appendices/extensions.html#VK_EXT_buffer_device_address)` is supported,
[`VkPhysicalDeviceBufferDeviceAddressFeaturesEXT`::`bufferDeviceAddress`](#features-bufferDeviceAddressEXT) **must** be supported

If `[VK_NV_cooperative_matrix](../appendices/extensions.html#VK_NV_cooperative_matrix)` is supported,
[`VkPhysicalDeviceCooperativeMatrixFeaturesNV`::`cooperativeMatrix`](#features-cooperativeMatrixNV) **must** be supported

If `[VK_NV_coverage_reduction_mode](../appendices/extensions.html#VK_NV_coverage_reduction_mode)` is supported,
[`coverageReductionMode`](#features-coverageReductionMode) **must** be supported

If `[VK_EXT_fragment_shader_interlock](../appendices/extensions.html#VK_EXT_fragment_shader_interlock)` is supported,
at least one of [`fragmentShaderSampleInterlock`](#features-fragmentShaderSampleInterlock), [`fragmentShaderPixelInterlock`](#features-fragmentShaderPixelInterlock), or [`fragmentShaderShadingRateInterlock`](#features-fragmentShaderShadingRateInterlock) **must** be supported

If `[VK_EXT_ycbcr_image_arrays](../appendices/extensions.html#VK_EXT_ycbcr_image_arrays)` is supported,
[`ycbcrImageArrays`](#features-ycbcrImageArrays) **must** be supported

If `[VK_EXT_provoking_vertex](../appendices/extensions.html#VK_EXT_provoking_vertex)` is supported,
[`provokingVertexLast`](#features-provokingVertexLast) **must** be supported

If `[VK_EXT_line_rasterization](../appendices/extensions.html#VK_EXT_line_rasterization)` is supported,
at least one of [`rectangularLines`](#features-rectangularLines), [`bresenhamLines`](#features-bresenhamLines), [`smoothLines`](#features-smoothLines), [`stippledRectangularLines`](#features-stippledRectangularLines), [`stippledBresenhamLines`](#features-stippledBresenhamLines), or [`stippledSmoothLines`](#features-stippledSmoothLines) **must** be supported

If `[VK_EXT_shader_atomic_float](../appendices/extensions.html#VK_EXT_shader_atomic_float)` is supported,
the following features **must** be supported:

* 
at least one of [`shaderBufferFloat32Atomics`](#features-shaderBufferFloat32Atomics), [`shaderBufferFloat32AtomicAdd`](#features-shaderBufferFloat32AtomicAdd), [`shaderBufferFloat64Atomics`](#features-shaderBufferFloat64Atomics), [`shaderBufferFloat64AtomicAdd`](#features-shaderBufferFloat64AtomicAdd), [`shaderSharedFloat32Atomics`](#features-shaderSharedFloat32Atomics), [`shaderSharedFloat32AtomicAdd`](#features-shaderSharedFloat32AtomicAdd), [`shaderSharedFloat64Atomics`](#features-shaderSharedFloat64Atomics), [`shaderSharedFloat64AtomicAdd`](#features-shaderSharedFloat64AtomicAdd), [`shaderImageFloat32Atomics`](#features-shaderImageFloat32Atomics), or [`shaderImageFloat32AtomicAdd`](#features-shaderImageFloat32AtomicAdd)

* 
[`shaderImageFloat32Atomics`](#features-shaderImageFloat32Atomics)
if [`sparseImageFloat32Atomics`](#features-sparseImageFloat32Atomics) is supported

* 
[`shaderImageFloat32AtomicAdd`](#features-shaderImageFloat32AtomicAdd)
if [`sparseImageFloat32AtomicAdd`](#features-sparseImageFloat32AtomicAdd) is supported

If `[VK_EXT_host_query_reset](../appendices/extensions.html#VK_EXT_host_query_reset)` is supported,
[`hostQueryReset`](#features-hostQueryReset) **must** be supported

If `[VK_EXT_index_type_uint8](../appendices/extensions.html#VK_EXT_index_type_uint8)` is supported,
[`indexTypeUint8`](#features-indexTypeUint8) **must** be supported

If `[VK_EXT_extended_dynamic_state](../appendices/extensions.html#VK_EXT_extended_dynamic_state)` is supported,
[`extendedDynamicState`](#features-extendedDynamicState) **must** be supported

If `[VK_EXT_host_image_copy](../appendices/extensions.html#VK_EXT_host_image_copy)` is supported,
[`hostImageCopy`](#features-hostImageCopy) **must** be supported

If `[VK_EXT_map_memory_placed](../appendices/extensions.html#VK_EXT_map_memory_placed)` is supported,
[`memoryMapPlaced`](#features-memoryMapPlaced) **must** be supported

If `[VK_EXT_shader_atomic_float2](../appendices/extensions.html#VK_EXT_shader_atomic_float2)` is supported,
the following features **must** be supported:

* 
at least one of [`shaderBufferFloat16Atomics`](#features-shaderBufferFloat16Atomics), [`shaderBufferFloat16AtomicAdd`](#features-shaderBufferFloat16AtomicAdd), [`shaderBufferFloat16AtomicMinMax`](#features-shaderBufferFloat16AtomicMinMax), [`shaderBufferFloat32AtomicMinMax`](#features-shaderBufferFloat32AtomicMinMax), [`shaderBufferFloat64AtomicMinMax`](#features-shaderBufferFloat64AtomicMinMax), [`shaderSharedFloat16Atomics`](#features-shaderSharedFloat16Atomics), [`shaderSharedFloat16AtomicAdd`](#features-shaderSharedFloat16AtomicAdd), [`shaderSharedFloat16AtomicMinMax`](#features-shaderSharedFloat16AtomicMinMax), [`shaderSharedFloat32AtomicMinMax`](#features-shaderSharedFloat32AtomicMinMax), [`shaderSharedFloat64AtomicMinMax`](#features-shaderSharedFloat64AtomicMinMax), or [`shaderImageFloat32AtomicMinMax`](#features-shaderImageFloat32AtomicMinMax)

* 
[`shaderImageFloat32AtomicMinMax`](#features-shaderImageFloat32AtomicMinMax)
if [`sparseImageFloat32AtomicMinMax`](#features-sparseImageFloat32AtomicMinMax) is supported

If `[VK_EXT_swapchain_maintenance1](../appendices/extensions.html#VK_EXT_swapchain_maintenance1)` is supported,
[`swapchainMaintenance1`](#features-swapchainMaintenance1) **must** be supported

If `[VK_EXT_shader_demote_to_helper_invocation](../appendices/extensions.html#VK_EXT_shader_demote_to_helper_invocation)` is supported,
[`shaderDemoteToHelperInvocation`](#features-shaderDemoteToHelperInvocation) **must** be supported

If `[VK_NV_device_generated_commands](../appendices/extensions.html#VK_NV_device_generated_commands)` is supported,
[`VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV`::`deviceGeneratedCommands`](#features-deviceGeneratedCommandsNV) **must** be supported

If `[VK_NV_inherited_viewport_scissor](../appendices/extensions.html#VK_NV_inherited_viewport_scissor)` is supported,
[`inheritedViewportScissor2D`](#features-inheritedViewportScissor2D) **must** be supported

If `[VK_EXT_texel_buffer_alignment](../appendices/extensions.html#VK_EXT_texel_buffer_alignment)` is supported,
[`texelBufferAlignment`](#features-texelBufferAlignment) **must** be supported

If `[VK_EXT_depth_bias_control](../appendices/extensions.html#VK_EXT_depth_bias_control)` is supported,
[`depthBiasControl`](#features-depthBiasControl) **must** be supported

If `[VK_EXT_device_memory_report](../appendices/extensions.html#VK_EXT_device_memory_report)` is supported,
[`deviceMemoryReport`](#features-deviceMemoryReport) **must** be supported

If `[VK_EXT_robustness2](../appendices/extensions.html#VK_EXT_robustness2)` is supported,
at least one of [`robustBufferAccess2`](#features-robustBufferAccess2), [`robustImageAccess2`](#features-robustImageAccess2), or [`nullDescriptor`](#features-nullDescriptor) **must** be supported

If `[VK_EXT_custom_border_color](../appendices/extensions.html#VK_EXT_custom_border_color)` is supported,
[`customBorderColors`](#features-customBorderColors) **must** be supported

If `[VK_EXT_texture_compression_astc_3d](../appendices/extensions.html#VK_EXT_texture_compression_astc_3d)` is supported,
[`textureCompressionASTC_3D`](#features-textureCompressionASTC_3D) **must** be supported

If `[VK_NV_present_barrier](../appendices/extensions.html#VK_NV_present_barrier)` is supported,
[`presentBarrier`](#features-presentBarrier) **must** be supported

If `[VK_EXT_private_data](../appendices/extensions.html#VK_EXT_private_data)` is supported,
[`privateData`](#features-privateData) **must** be supported

If `[VK_EXT_pipeline_creation_cache_control](../appendices/extensions.html#VK_EXT_pipeline_creation_cache_control)` is supported,
[`pipelineCreationCacheControl`](#features-pipelineCreationCacheControl) **must** be supported

If `[VK_NV_device_diagnostics_config](../appendices/extensions.html#VK_NV_device_diagnostics_config)` is supported,
[`diagnosticsConfig`](#features-diagnosticsConfig) **must** be supported

If `[VK_QCOM_queue_perf_hint](../appendices/extensions.html#VK_QCOM_queue_perf_hint)` is supported,
[`queuePerfHint`](#features-queuePerfHint) **must** be supported

If `[VK_NV_cuda_kernel_launch](../appendices/extensions.html#VK_NV_cuda_kernel_launch)` is supported,
[`cudaKernelLaunchFeatures`](#features-cudaKernelLaunchFeatures) **must** be supported

If `[VK_QCOM_tile_shading](../appendices/extensions.html#VK_QCOM_tile_shading)` is supported,
the following features **must** be supported:

* 
[`tileShading`](#features-tileShading)

* 
[`tileShadingFragmentStage`](#features-tileShadingFragmentStage)

* 
[`tileShadingPerTileDispatch`](#features-tileShadingPerTileDispatch)

* 
[`tileShadingAtomicOps`](#features-tileShadingAtomicOps)

* 
[`tileShadingColorAttachments`](#features-tileShadingColorAttachments)

* 
[`tileShadingPerTileDraw`](#features-tileShadingPerTileDraw)

* 
[`tileShadingDepthAttachments`](#features-tileShadingDepthAttachments)

* 
[`tileShadingStencilAttachments`](#features-tileShadingStencilAttachments)

* 
[`tileShadingInputAttachments`](#features-tileShadingInputAttachments)

* 
[`tileShadingSampledAttachments`](#features-tileShadingSampledAttachments)

If `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` is supported,
[`descriptorBuffer`](#features-descriptorBuffer) **must** be supported

If `[VK_EXT_graphics_pipeline_library](../appendices/extensions.html#VK_EXT_graphics_pipeline_library)` is supported,
[`graphicsPipelineLibrary`](#features-graphicsPipelineLibrary) **must** be supported

If `[VK_AMD_shader_early_and_late_fragment_tests](../appendices/extensions.html#VK_AMD_shader_early_and_late_fragment_tests)` is supported,
[`shaderEarlyAndLateFragmentTests`](#features-shaderEarlyAndLateFragmentTests) **must** be supported

If `[VK_NV_fragment_shading_rate_enums](../appendices/extensions.html#VK_NV_fragment_shading_rate_enums)` is supported,
[`fragmentShadingRateEnums`](#features-fragmentShadingRateEnums) **must** be supported

If `[VK_NV_ray_tracing_motion_blur](../appendices/extensions.html#VK_NV_ray_tracing_motion_blur)` is supported,
[`rayTracingMotionBlur`](#features-rayTracingMotionBlur) **must** be supported

If `[VK_EXT_ycbcr_2plane_444_formats](../appendices/extensions.html#VK_EXT_ycbcr_2plane_444_formats)` is supported,
[`ycbcr2plane444Formats`](#features-ycbcr2plane444Formats) **must** be supported

If `[VK_EXT_fragment_density_map2](../appendices/extensions.html#VK_EXT_fragment_density_map2)` is supported,
[`fragmentDensityMapDeferred`](#features-fragmentDensityMapDeferred) **must** be supported

If `[VK_EXT_image_robustness](../appendices/extensions.html#VK_EXT_image_robustness)` is supported,
[`robustImageAccess`](#features-robustImageAccess) **must** be supported

If `[VK_EXT_image_compression_control](../appendices/extensions.html#VK_EXT_image_compression_control)` is supported,
[`imageCompressionControl`](#features-imageCompressionControl) **must** be supported

If `[VK_EXT_attachment_feedback_loop_layout](../appendices/extensions.html#VK_EXT_attachment_feedback_loop_layout)` is supported,
[`attachmentFeedbackLoopLayout`](#features-attachmentFeedbackLoopLayout) **must** be supported

If `[VK_EXT_4444_formats](../appendices/extensions.html#VK_EXT_4444_formats)` is supported,
[`formatA4R4G4B4`](#features-formatA4R4G4B4) **must** be supported

If `[VK_EXT_device_fault](../appendices/extensions.html#VK_EXT_device_fault)` is supported,
[`deviceFault`](#features-deviceFault) **must** be supported

If `[VK_EXT_rgba10x6_formats](../appendices/extensions.html#VK_EXT_rgba10x6_formats)` is supported,
[`formatRgba10x6WithoutYCbCrSampler`](#features-formatRgba10x6WithoutYCbCrSampler) **must** be supported

If `[VK_VALVE_mutable_descriptor_type](../appendices/extensions.html#VK_VALVE_mutable_descriptor_type)` is supported,
[`mutableDescriptorType`](#features-mutableDescriptorType) **must** be supported

If `[VK_EXT_vertex_input_dynamic_state](../appendices/extensions.html#VK_EXT_vertex_input_dynamic_state)` is supported,
[`vertexInputDynamicState`](#features-vertexInputDynamicState) **must** be supported

If `[VK_EXT_device_address_binding_report](../appendices/extensions.html#VK_EXT_device_address_binding_report)` is supported,
[`reportAddressBinding`](#features-reportAddressBinding) **must** be supported

If `[VK_EXT_depth_clip_control](../appendices/extensions.html#VK_EXT_depth_clip_control)` is supported,
[`depthClipControl`](#features-depthClipControl) **must** be supported

If `[VK_EXT_primitive_topology_list_restart](../appendices/extensions.html#VK_EXT_primitive_topology_list_restart)` is supported,
[`primitiveTopologyListRestart`](#features-primitiveTopologyListRestart) **must** be supported

If `[VK_EXT_present_mode_fifo_latest_ready](../appendices/extensions.html#VK_EXT_present_mode_fifo_latest_ready)` is supported,
[`presentModeFifoLatestReady`](#features-presentModeFifoLatestReady) **must** be supported

If `[VK_HUAWEI_subpass_shading](../appendices/extensions.html#VK_HUAWEI_subpass_shading)` is supported,
[`subpassShading`](#features-subpassShading) **must** be supported

If `[VK_HUAWEI_invocation_mask](../appendices/extensions.html#VK_HUAWEI_invocation_mask)` is supported,
[`invocationMask`](#features-invocationMask) **must** be supported

If `[VK_NV_external_memory_rdma](../appendices/extensions.html#VK_NV_external_memory_rdma)` is supported,
[`externalMemoryRDMA`](#features-externalMemoryRDMA) **must** be supported

If `[VK_EXT_pipeline_properties](../appendices/extensions.html#VK_EXT_pipeline_properties)` is supported,
[`pipelinePropertiesIdentifier`](#features-pipelinePropertiesIdentifier) **must** be supported

If `[VK_EXT_frame_boundary](../appendices/extensions.html#VK_EXT_frame_boundary)` is supported,
[`frameBoundary`](#features-frameBoundary) **must** be supported

If `[VK_EXT_multisampled_render_to_single_sampled](../appendices/extensions.html#VK_EXT_multisampled_render_to_single_sampled)` is supported,
[`multisampledRenderToSingleSampled`](#features-multisampledRenderToSingleSampled) **must** be supported

If `[VK_EXT_extended_dynamic_state2](../appendices/extensions.html#VK_EXT_extended_dynamic_state2)` is supported,
[`extendedDynamicState2`](#features-extendedDynamicState2) **must** be supported

If `[VK_EXT_color_write_enable](../appendices/extensions.html#VK_EXT_color_write_enable)` is supported,
[`colorWriteEnable`](#features-colorWriteEnable) **must** be supported

If `[VK_EXT_primitives_generated_query](../appendices/extensions.html#VK_EXT_primitives_generated_query)` is supported,
[`primitivesGeneratedQuery`](#features-primitivesGeneratedQuery) **must** be supported

If `[VK_EXT_global_priority_query](../appendices/extensions.html#VK_EXT_global_priority_query)` is supported,
[`globalPriorityQuery`](#features-globalPriorityQuery) **must** be supported

If `[VK_VALVE_video_encode_rgb_conversion](../appendices/extensions.html#VK_VALVE_video_encode_rgb_conversion)` is supported,
[`videoEncodeRgbConversion`](#features-videoEncodeRgbConversion) **must** be supported

If `[VK_EXT_image_view_min_lod](../appendices/extensions.html#VK_EXT_image_view_min_lod)` is supported,
[`minLod`](#features-minLod) **must** be supported

If `[VK_EXT_multi_draw](../appendices/extensions.html#VK_EXT_multi_draw)` is supported,
[`multiDraw`](#features-multiDraw) **must** be supported

If `[VK_EXT_image_2d_view_of_3d](../appendices/extensions.html#VK_EXT_image_2d_view_of_3d)` is supported,
[`image2DViewOf3D`](#features-image2DViewOf3D) **must** be supported

If `[VK_EXT_shader_tile_image](../appendices/extensions.html#VK_EXT_shader_tile_image)` is supported,
[`shaderTileImageColorReadAccess`](#features-shaderTileImageColorReadAccess) **must** be supported

If `[VK_EXT_opacity_micromap](../appendices/extensions.html#VK_EXT_opacity_micromap)` is supported,
[`micromap`](#features-micromap) **must** be supported

If `[VK_NV_displacement_micromap](../appendices/extensions.html#VK_NV_displacement_micromap)` is supported,
[`displacementMicromap`](#features-displacementMicromap) **must** be supported

If `[VK_HUAWEI_cluster_culling_shader](../appendices/extensions.html#VK_HUAWEI_cluster_culling_shader)` is supported,
[`clustercullingShader`](#features-clustercullingShader) **must** be supported

If `[VK_EXT_border_color_swizzle](../appendices/extensions.html#VK_EXT_border_color_swizzle)` is supported,
[`borderColorSwizzle`](#features-borderColorSwizzle) **must** be supported

If `[VK_EXT_pageable_device_local_memory](../appendices/extensions.html#VK_EXT_pageable_device_local_memory)` is supported,
[`pageableDeviceLocalMemory`](#features-pageableDeviceLocalMemory) **must** be supported

If `[VK_ARM_scheduling_controls](../appendices/extensions.html#VK_ARM_scheduling_controls)` is supported,
[`schedulingControls`](#features-schedulingControls) **must** be supported

If `[VK_EXT_image_sliced_view_of_3d](../appendices/extensions.html#VK_EXT_image_sliced_view_of_3d)` is supported,
[`imageSlicedViewOf3D`](#features-imageSlicedViewOf3D) **must** be supported

If `[VK_VALVE_descriptor_set_host_mapping](../appendices/extensions.html#VK_VALVE_descriptor_set_host_mapping)` is supported,
[`descriptorSetHostMapping`](../appendices/extensions.html#features-descriptorSetHostMapping) **must** be supported

If `[VK_EXT_depth_clamp_zero_one](../appendices/extensions.html#VK_EXT_depth_clamp_zero_one)` is supported,
[`depthClampZeroOne`](#features-depthClampZeroOne) **must** be supported

If `[VK_EXT_non_seamless_cube_map](../appendices/extensions.html#VK_EXT_non_seamless_cube_map)` is supported,
[`nonSeamlessCubeMap`](#features-nonSeamlessCubeMap) **must** be supported

If `[VK_ARM_render_pass_striped](../appendices/extensions.html#VK_ARM_render_pass_striped)` is supported,
[`renderPassStriped`](#features-renderPassStriped) **must** be supported

If `[VK_QCOM_fragment_density_map_offset](../appendices/extensions.html#VK_QCOM_fragment_density_map_offset)` is supported,
[`fragmentDensityMapOffset`](#features-fragmentDensityMapOffset) **must** be supported

If `[VK_NV_copy_memory_indirect](../appendices/extensions.html#VK_NV_copy_memory_indirect)` is supported,
[`indirectCopy`](#features-indirectCopy) **must** be supported

If `[VK_NV_memory_decompression](../appendices/extensions.html#VK_NV_memory_decompression)` is supported,
[`memoryDecompression`](#features-memoryDecompression) **must** be supported

If `[VK_NV_device_generated_commands_compute](../appendices/extensions.html#VK_NV_device_generated_commands_compute)` is supported,
[`deviceGeneratedCompute`](#features-deviceGeneratedCompute) **must** be supported

If `[VK_NV_ray_tracing_linear_swept_spheres](../appendices/extensions.html#VK_NV_ray_tracing_linear_swept_spheres)` is supported,
at least one of [`spheres`](#features-spheres) or [`linearSweptSpheres`](#features-linearSweptSpheres) **must** be supported

If `[VK_NV_linear_color_attachment](../appendices/extensions.html#VK_NV_linear_color_attachment)` is supported,
[`linearColorAttachment`](#features-linearColorAttachment) **must** be supported

If `[VK_EXT_image_compression_control_swapchain](../appendices/extensions.html#VK_EXT_image_compression_control_swapchain)` is supported,
[`imageCompressionControlSwapchain`](#features-imageCompressionControlSwapchain) **must** be supported

If `[VK_QCOM_image_processing](../appendices/extensions.html#VK_QCOM_image_processing)` is supported,
the following features **must** be supported:

* 
[`textureSampleWeighted`](#features-textureSampleWeighted)

* 
[`textureBlockMatch`](#features-textureBlockMatch)

* 
[`textureBoxFilter`](#features-textureBoxFilter)

If `[VK_EXT_nested_command_buffer](../appendices/extensions.html#VK_EXT_nested_command_buffer)` is supported,
[`nestedCommandBuffer`](#features-nestedCommandBuffer) **must** be supported

If `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` is supported,
the following features **must** be supported:

* 
[`tessellationShader`](#features-tessellationShader)
if [`extendedDynamicState3TessellationDomainOrigin`](#features-extendedDynamicState3TessellationDomainOrigin) is supported

* 
[`depthClamp`](#features-depthClamp)
if [`extendedDynamicState3DepthClampEnable`](#features-extendedDynamicState3DepthClampEnable) is supported

* 
[`fillModeNonSolid`](#features-fillModeNonSolid)
if [`extendedDynamicState3PolygonMode`](#features-extendedDynamicState3PolygonMode) is supported

* 
[`alphaToOne`](#features-alphaToOne)
if [`extendedDynamicState3AlphaToOneEnable`](#features-extendedDynamicState3AlphaToOneEnable) is supported

* 
[`logicOp`](#features-logicOp)
if [`extendedDynamicState3LogicOpEnable`](#features-extendedDynamicState3LogicOpEnable) is supported

* 
[`geometryStreams`](#features-geometryStreams)
if `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` and [`extendedDynamicState3RasterizationStream`](#features-extendedDynamicState3RasterizationStream) are supported

If `[VK_EXT_subpass_merge_feedback](../appendices/extensions.html#VK_EXT_subpass_merge_feedback)` is supported,
[`subpassMergeFeedback`](#features-subpassMergeFeedback) **must** be supported

If `[VK_ARM_tensors](../appendices/extensions.html#VK_ARM_tensors)` is supported,
[`tensors`](#features-tensors) **must** be supported

If `[VK_EXT_shader_module_identifier](../appendices/extensions.html#VK_EXT_shader_module_identifier)` is supported,
[`shaderModuleIdentifier`](#features-shaderModuleIdentifier) **must** be supported

If `[VK_NV_optical_flow](../appendices/extensions.html#VK_NV_optical_flow)` is supported,
[`opticalFlow`](#features-opticalFlow) **must** be supported

If `[VK_EXT_legacy_dithering](../appendices/extensions.html#VK_EXT_legacy_dithering)` is supported,
[`legacyDithering`](#features-legacyDithering) **must** be supported

If `[VK_EXT_pipeline_protected_access](../appendices/extensions.html#VK_EXT_pipeline_protected_access)` is supported,
[`pipelineProtectedAccess`](#features-pipelineProtectedAccess) **must** be supported

If `[VK_ANDROID_external_format_resolve](../appendices/extensions.html#VK_ANDROID_external_format_resolve)` is supported,
[`externalFormatResolve`](#features-externalFormatResolve) **must** be supported

If `[VK_AMD_anti_lag](../appendices/extensions.html#VK_AMD_anti_lag)` is supported,
[`antiLag`](#features-antiLag) **must** be supported

If `[VK_AMDX_dense_geometry_format](../appendices/extensions.html#VK_AMDX_dense_geometry_format)` is supported,
[`denseGeometryFormat`](#features-denseGeometryFormat) **must** be supported

If `[VK_EXT_shader_object](../appendices/extensions.html#VK_EXT_shader_object)` is supported,
[`shaderObject`](#features-shaderObject) **must** be supported

If `[VK_QCOM_tile_properties](../appendices/extensions.html#VK_QCOM_tile_properties)` is supported,
[`tileProperties`](#features-tileProperties) **must** be supported

If `[VK_SEC_amigo_profiling](../appendices/extensions.html#VK_SEC_amigo_profiling)` is supported,
[`amigoProfiling`](../appendices/extensions.html#features-amigoProfiling) **must** be supported

If `[VK_QCOM_multiview_per_view_viewports](../appendices/extensions.html#VK_QCOM_multiview_per_view_viewports)` is supported,
[`multiviewPerViewViewports`](#features-multiviewPerViewViewports) **must** be supported

If `[VK_NV_ray_tracing_invocation_reorder](../appendices/extensions.html#VK_NV_ray_tracing_invocation_reorder)` is supported,
[`VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV`::`rayTracingInvocationReorder`](#features-rayTracingInvocationReorderNV) **must** be supported

If `[VK_NV_cooperative_vector](../appendices/extensions.html#VK_NV_cooperative_vector)` is supported,
[`cooperativeVector`](#features-cooperativeVector) **must** be supported

If `[VK_NV_extended_sparse_address_space](../appendices/extensions.html#VK_NV_extended_sparse_address_space)` is supported,
[`extendedSparseAddressSpace`](#features-extendedSparseAddressSpace) **must** be supported

If `[VK_EXT_mutable_descriptor_type](../appendices/extensions.html#VK_EXT_mutable_descriptor_type)` is supported,
[`mutableDescriptorType`](#features-mutableDescriptorType) **must** be supported

If `[VK_EXT_legacy_vertex_attributes](../appendices/extensions.html#VK_EXT_legacy_vertex_attributes)` is supported,
[`legacyVertexAttributes`](#features-legacyVertexAttributes) **must** be supported

If `[VK_ARM_shader_core_builtins](../appendices/extensions.html#VK_ARM_shader_core_builtins)` is supported,
[`shaderCoreBuiltins`](#features-shaderCoreBuiltins) **must** be supported

If `[VK_EXT_pipeline_library_group_handles](../appendices/extensions.html#VK_EXT_pipeline_library_group_handles)` is supported,
[`pipelineLibraryGroupHandles`](#features-pipelineLibraryGroupHandles) **must** be supported

If `[VK_EXT_dynamic_rendering_unused_attachments](../appendices/extensions.html#VK_EXT_dynamic_rendering_unused_attachments)` is supported,
[`dynamicRenderingUnusedAttachments`](#features-dynamicRenderingUnusedAttachments) **must** be supported

If `[VK_ARM_data_graph](../appendices/extensions.html#VK_ARM_data_graph)` is supported,
[`dataGraph`](#features-dataGraph) **must** be supported

If `[VK_QCOM_multiview_per_view_render_areas](../appendices/extensions.html#VK_QCOM_multiview_per_view_render_areas)` is supported,
[`multiviewPerViewRenderAreas`](#features-multiviewPerViewRenderAreas) **must** be supported

If `[VK_NV_per_stage_descriptor_set](../appendices/extensions.html#VK_NV_per_stage_descriptor_set)` is supported,
[`perStageDescriptorSet`](#features-perStageDescriptorSet) **must** be supported

If `[VK_QCOM_image_processing2](../appendices/extensions.html#VK_QCOM_image_processing2)` is supported,
[`textureBlockMatch2`](#features-textureBlockMatch2) **must** be supported

If `[VK_QCOM_filter_cubic_weights](../appendices/extensions.html#VK_QCOM_filter_cubic_weights)` is supported,
[`selectableCubicWeights`](#features-selectableCubicWeights) **must** be supported

If `[VK_QCOM_ycbcr_degamma](../appendices/extensions.html#VK_QCOM_ycbcr_degamma)` is supported,
[`ycbcrDegamma`](#features-ycbcrDegamma) **must** be supported

If `[VK_QCOM_filter_cubic_clamp](../appendices/extensions.html#VK_QCOM_filter_cubic_clamp)` is supported,
[`cubicRangeClamp`](#features-cubicRangeClamp) **must** be supported

If `[VK_EXT_attachment_feedback_loop_dynamic_state](../appendices/extensions.html#VK_EXT_attachment_feedback_loop_dynamic_state)` is supported,
[`attachmentFeedbackLoopDynamicState`](#features-attachmentFeedbackLoopDynamicState) **must** be supported

If `[VK_QNX_external_memory_screen_buffer](../appendices/extensions.html#VK_QNX_external_memory_screen_buffer)` is supported,
[`screenBufferImport`](#features-screenBufferImport) **must** be supported

If `[VK_NV_descriptor_pool_overallocation](../appendices/extensions.html#VK_NV_descriptor_pool_overallocation)` is supported,
[`descriptorPoolOverallocation`](#features-descriptorPoolOverallocation) **must** be supported

If `[VK_QCOM_tile_memory_heap](../appendices/extensions.html#VK_QCOM_tile_memory_heap)` is supported,
[`tileMemoryHeap`](#features-tileMemoryHeap) **must** be supported

If `[VK_EXT_memory_decompression](../appendices/extensions.html#VK_EXT_memory_decompression)` is supported,
[`memoryDecompression`](#features-memoryDecompression) **must** be supported

If `[VK_NV_raw_access_chains](../appendices/extensions.html#VK_NV_raw_access_chains)` is supported,
[`shaderRawAccessChains`](#features-shaderRawAccessChains) **must** be supported

If `[VK_NV_command_buffer_inheritance](../appendices/extensions.html#VK_NV_command_buffer_inheritance)` is supported,
[`commandBufferInheritance`](#features-commandBufferInheritance) **must** be supported

If `[VK_NV_shader_atomic_float16_vector](../appendices/extensions.html#VK_NV_shader_atomic_float16_vector)` is supported,
[`shaderFloat16VectorAtomics`](#features-shaderFloat16VectorAtomics) **must** be supported

If `[VK_EXT_shader_replicated_composites](../appendices/extensions.html#VK_EXT_shader_replicated_composites)` is supported,
[`shaderReplicatedComposites`](#features-shaderReplicatedComposites) **must** be supported

If `[VK_EXT_shader_float8](../appendices/extensions.html#VK_EXT_shader_float8)` is supported,
[`shaderFloat8`](#features-shaderFloat8) **must** be supported

If `[VK_NV_ray_tracing_validation](../appendices/extensions.html#VK_NV_ray_tracing_validation)` is supported,
[`rayTracingValidation`](#features-rayTracingValidation) **must** be supported

If `[VK_NV_cluster_acceleration_structure](../appendices/extensions.html#VK_NV_cluster_acceleration_structure)` is supported,
[`clusterAccelerationStructure`](#features-clusterAccelerationStructure) **must** be supported

If `[VK_NV_partitioned_acceleration_structure](../appendices/extensions.html#VK_NV_partitioned_acceleration_structure)` is supported,
[`partitionedAccelerationStructure`](#features-partitionedAccelerationStructure) **must** be supported

If `[VK_EXT_device_generated_commands](../appendices/extensions.html#VK_EXT_device_generated_commands)` is supported,
[`deviceGeneratedCommands`](#features-deviceGeneratedCommands) **must** be supported

If `[VK_MESA_image_alignment_control](../appendices/extensions.html#VK_MESA_image_alignment_control)` is supported,
[`imageAlignmentControl`](#features-imageAlignmentControl) **must** be supported

If `[VK_NV_push_constant_bank](../appendices/extensions.html#VK_NV_push_constant_bank)` is supported,
[`pushConstantBank`](#features-pushConstantBank) **must** be supported

If `[VK_EXT_ray_tracing_invocation_reorder](../appendices/extensions.html#VK_EXT_ray_tracing_invocation_reorder)` is supported,
[`rayTracingInvocationReorder`](#features-rayTracingInvocationReorder) **must** be supported

If `[VK_EXT_depth_clamp_control](../appendices/extensions.html#VK_EXT_depth_clamp_control)` is supported,
[`depthClampControl`](#features-depthClampControl) **must** be supported

If `[VK_HUAWEI_hdr_vivid](../appendices/extensions.html#VK_HUAWEI_hdr_vivid)` is supported,
[`hdrVivid`](#features-hdrVivid) **must** be supported

If `[VK_NV_cooperative_matrix2](../appendices/extensions.html#VK_NV_cooperative_matrix2)` is supported,
at least one of [`cooperativeMatrixWorkgroupScope`](#features-cooperativeMatrixWorkgroupScope), [`cooperativeMatrixFlexibleDimensions`](#features-cooperativeMatrixFlexibleDimensions), [`cooperativeMatrixReductions`](#features-cooperativeMatrixReductions), [`cooperativeMatrixConversions`](#features-cooperativeMatrixConversions), [`cooperativeMatrixPerElementOperations`](#features-cooperativeMatrixPerElementOperations), [`cooperativeMatrixTensorAddressing`](#features-cooperativeMatrixTensorAddressing), or [`cooperativeMatrixBlockLoads`](#features-cooperativeMatrixBlockLoads) **must** be supported

If `[VK_ARM_pipeline_opacity_micromap](../appendices/extensions.html#VK_ARM_pipeline_opacity_micromap)` is supported,
[`pipelineOpacityMicromap`](#features-pipelineOpacityMicromap) **must** be supported

If `[VK_ARM_performance_counters_by_region](../appendices/extensions.html#VK_ARM_performance_counters_by_region)` is supported,
[`performanceCountersByRegion`](#features-performanceCountersByRegion) **must** be supported

If `[VK_ARM_shader_instrumentation](../appendices/extensions.html#VK_ARM_shader_instrumentation)` is supported,
[`shaderInstrumentation`](#features-shaderInstrumentation) **must** be supported

If `[VK_EXT_vertex_attribute_robustness](../appendices/extensions.html#VK_EXT_vertex_attribute_robustness)` is supported,
[`vertexAttributeRobustness`](#features-vertexAttributeRobustness) **must** be supported

If `[VK_ARM_format_pack](../appendices/extensions.html#VK_ARM_format_pack)` is supported,
[`formatPack`](#features-formatPack) **must** be supported

If `[VK_VALVE_fragment_density_map_layered](../appendices/extensions.html#VK_VALVE_fragment_density_map_layered)` is supported,
[`fragmentDensityMapLayered`](#features-fragmentDensityMapLayered) **must** be supported

If `[VK_NV_present_metering](../appendices/extensions.html#VK_NV_present_metering)` is supported,
[`presentMetering`](#features-presentMetering) **must** be supported

If `[VK_EXT_fragment_density_map_offset](../appendices/extensions.html#VK_EXT_fragment_density_map_offset)` is supported,
[`fragmentDensityMapOffset`](#features-fragmentDensityMapOffset) **must** be supported

If `[VK_EXT_zero_initialize_device_memory](../appendices/extensions.html#VK_EXT_zero_initialize_device_memory)` is supported,
[`zeroInitializeDeviceMemory`](#features-zeroInitializeDeviceMemory) **must** be supported

If `[VK_EXT_shader_64bit_indexing](../appendices/extensions.html#VK_EXT_shader_64bit_indexing)` is supported,
[`shader64BitIndexing`](#features-shader64BitIndexing) **must** be supported

If `[VK_EXT_custom_resolve](../appendices/extensions.html#VK_EXT_custom_resolve)` is supported,
[`customResolve`](#features-customResolve) **must** be supported

If `[VK_QCOM_data_graph_model](../appendices/extensions.html#VK_QCOM_data_graph_model)` is supported,
[`VkPhysicalDeviceDataGraphModelFeaturesQCOM`::`dataGraphModel`](#features-dataGraphModelQCOM) **must** be supported

If `[VK_ARM_data_graph_optical_flow](../appendices/extensions.html#VK_ARM_data_graph_optical_flow)` is supported,
[`dataGraphOpticalFlow`](#features-dataGraphOpticalFlow) **must** be supported

If `[VK_EXT_shader_long_vector](../appendices/extensions.html#VK_EXT_shader_long_vector)` is supported,
the following features **must** be supported:

* 
[`longVector`](#features-longVector)

* 
[`scalarBlockLayout`](#features-scalarBlockLayout)

* 
[`workgroupMemoryExplicitLayoutScalarBlockLayout`](#features-workgroupMemoryExplicitLayoutScalarBlockLayout)
if `[VK_KHR_workgroup_memory_explicit_layout](../appendices/extensions.html#VK_KHR_workgroup_memory_explicit_layout)` is supported

If `[VK_SEC_pipeline_cache_incremental_mode](../appendices/extensions.html#VK_SEC_pipeline_cache_incremental_mode)` is supported,
[`pipelineCacheIncrementalMode`](../appendices/extensions.html#features-pipelineCacheIncrementalMode) **must** be supported

If `[VK_EXT_shader_uniform_buffer_unsized_array](../appendices/extensions.html#VK_EXT_shader_uniform_buffer_unsized_array)` is supported,
[`shaderUniformBufferUnsizedArray`](#features-shaderUniformBufferUnsizedArray) **must** be supported

If `[VK_NV_compute_occupancy_priority](../appendices/extensions.html#VK_NV_compute_occupancy_priority)` is supported,
[`computeOccupancyPriority`](#features-computeOccupancyPriority) **must** be supported

If `[VK_EXT_shader_subgroup_partitioned](../appendices/extensions.html#VK_EXT_shader_subgroup_partitioned)` is supported,
[`shaderSubgroupPartitioned`](#features-shaderSubgroupPartitioned) **must** be supported

If `[VK_VALVE_shader_mixed_float_dot_product](../appendices/extensions.html#VK_VALVE_shader_mixed_float_dot_product)` is supported,
[`shaderMixedFloatDotProductFloat16AccFloat32`](#features-shaderMixedFloatDotProductFloat16AccFloat32) **must** be supported

If `[VK_EXT_primitive_restart_index](../appendices/extensions.html#VK_EXT_primitive_restart_index)` is supported,
[`primitiveRestartIndex`](#features-primitiveRestartIndex) **must** be supported

If `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` is supported,
the following features **must** be supported:

* 
[`accelerationStructure`](#features-accelerationStructure)

* 
[`bufferDeviceAddress`](#features-bufferDeviceAddress)

* 
[`descriptorBindingAccelerationStructureUpdateAfterBind`](#features-descriptorBindingAccelerationStructureUpdateAfterBind)

* 
[`descriptorIndexing`](#features-descriptorIndexing)
if Vulkan 1.2 is supported

If `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` is supported,
the following features **must** be supported:

* 
[`rayTracingPipeline`](#features-rayTracingPipeline)

* 
[`rayTracingPipelineTraceRaysIndirect`](#features-rayTracingPipelineTraceRaysIndirect)

* 
[`rayTraversalPrimitiveCulling`](#features-rayTraversalPrimitiveCulling)
if `[VK_KHR_ray_query](../appendices/extensions.html#VK_KHR_ray_query)` is supported

If `[VK_KHR_ray_query](../appendices/extensions.html#VK_KHR_ray_query)` is supported,
[`rayQuery`](#features-rayQuery) **must** be supported

If `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` is supported,
the following features **must** be supported:

* 
[`taskShader`](#features-taskShader)

* 
[`meshShader`](#features-meshShader)

* 
[`primitiveFragmentShadingRate`](#features-primitiveFragmentShadingRate)
if `[VK_KHR_fragment_shading_rate](../appendices/extensions.html#VK_KHR_fragment_shading_rate)` and [`primitiveFragmentShadingRateMeshShader`](#features-primitiveFragmentShadingRateMeshShader) are supported

`[VK_KHR_fragment_shading_rate](../appendices/extensions.html#VK_KHR_fragment_shading_rate)` if the
[    `primitiveFragmentShadingRateMeshShader`](#features-primitiveFragmentShadingRateMeshShader) feature is supported.

`[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)`, if the
[    `extendedDynamicState3RasterizationStream`](#features-extendedDynamicState3RasterizationStream) feature is supported.

`[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension, if the
[    `extendedDynamicState3ConservativeRasterizationMode`](#features-extendedDynamicState3ConservativeRasterizationMode) feature is
supported.

`[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` extension, if the
[    `extendedDynamicState3ExtraPrimitiveOverestimationSize`](#features-extendedDynamicState3ExtraPrimitiveOverestimationSize) feature is
supported.

`[VK_EXT_sample_locations](../appendices/extensions.html#VK_EXT_sample_locations)` extension, if the
[    `extendedDynamicState3SampleLocationsEnable`](#features-extendedDynamicState3SampleLocationsEnable) feature is supported.

`[VK_EXT_blend_operation_advanced](../appendices/extensions.html#VK_EXT_blend_operation_advanced)` extension, if the
[    `extendedDynamicState3ColorBlendAdvanced`](#features-extendedDynamicState3ColorBlendAdvanced) feature is supported.

`[VK_EXT_provoking_vertex](../appendices/extensions.html#VK_EXT_provoking_vertex)`, if the
[    `extendedDynamicState3ProvokingVertexMode`](#features-extendedDynamicState3ProvokingVertexMode) feature is supported.

Vulkan 1.4 or the [VK_KHR_line_rasterization](../appendices/extensions.html#VK_KHR_line_rasterization) extension or the
[VK_EXT_line_rasterization](../appendices/extensions.html#VK_EXT_line_rasterization) extension, if the
[    `extendedDynamicState3LineRasterizationMode`](#features-extendedDynamicState3LineRasterizationMode) feature is supported.

`[VK_KHR_line_rasterization](../appendices/extensions.html#VK_KHR_line_rasterization)` or `[VK_EXT_line_rasterization](../appendices/extensions.html#VK_EXT_line_rasterization)`
extension, if the [    `extendedDynamicState3LineStippleEnable`](#features-extendedDynamicState3LineStippleEnable) feature is supported.

`[VK_EXT_depth_clip_control](../appendices/extensions.html#VK_EXT_depth_clip_control)`, if the
[    `extendedDynamicState3DepthClipNegativeOneToOne`](#features-extendedDynamicState3DepthClipNegativeOneToOne) feature is
supported.

`[VK_NV_clip_space_w_scaling](../appendices/extensions.html#VK_NV_clip_space_w_scaling)` extension, if the
[    `extendedDynamicState3ViewportWScalingEnable`](#features-extendedDynamicState3ViewportWScalingEnable) feature is
supported.

`[VK_NV_viewport_swizzle](../appendices/extensions.html#VK_NV_viewport_swizzle)` extension, if the
[    `extendedDynamicState3ViewportSwizzle`](#features-extendedDynamicState3ViewportSwizzle) feature is supported.

`[VK_NV_fragment_coverage_to_color](../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension, if the
[    `extendedDynamicState3CoverageToColorEnable`](#features-extendedDynamicState3CoverageToColorEnable) feature is supported.

`[VK_NV_fragment_coverage_to_color](../appendices/extensions.html#VK_NV_fragment_coverage_to_color)` extension, if the
[    `extendedDynamicState3CoverageToColorLocation`](#features-extendedDynamicState3CoverageToColorLocation) feature is
supported.

`[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension, if the
[    `extendedDynamicState3CoverageModulationMode`](#features-extendedDynamicState3CoverageModulationMode) feature is
supported.

`[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension, if the
[    `extendedDynamicState3CoverageModulationTableEnable`](#features-extendedDynamicState3CoverageModulationTableEnable) feature is
supported.

`[VK_NV_framebuffer_mixed_samples](../appendices/extensions.html#VK_NV_framebuffer_mixed_samples)` extension, if the
[    `extendedDynamicState3CoverageModulationTable`](#features-extendedDynamicState3CoverageModulationTable) feature is
supported.

`[VK_NV_coverage_reduction_mode](../appendices/extensions.html#VK_NV_coverage_reduction_mode)`, if the
[    `extendedDynamicState3CoverageReductionMode`](#features-extendedDynamicState3CoverageReductionMode) feature is supported.

`[VK_NV_representative_fragment_test](../appendices/extensions.html#VK_NV_representative_fragment_test)`, if the
[    `extendedDynamicState3RepresentativeFragmentTestEnable`](#features-extendedDynamicState3RepresentativeFragmentTestEnable) feature is
supported.

`[VK_NV_shading_rate_image](../appendices/extensions.html#VK_NV_shading_rate_image)`, if the
[    `extendedDynamicState3ShadingRateImageEnable`](#features-extendedDynamicState3ShadingRateImageEnable) feature is
supported.

If Vulkan 1.4 is supported, at least one queue family is reported by
[vkGetPhysicalDeviceQueueFamilyProperties](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties) that includes the
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) flag, and no additional queue families are
reported that support the [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) flag, the
[`hostImageCopy`](#features-hostImageCopy) feature **must** be
supported.

All other features defined in the Specification are **optional**.

|  | Applications running on Vulkan implementations advertising a
| --- | --- |
[VkPhysicalDeviceDriverProperties](devsandqueues.html#VkPhysicalDeviceDriverProperties)::`conformanceVersion` less than
1.4.4.0 should be aware that the
[`formatRgba10x6WithoutYCbCrSampler`](#features-formatRgba10x6WithoutYCbCrSampler)
feature may not be supported despite `[VK_EXT_rgba10x6_formats](../appendices/extensions.html#VK_EXT_rgba10x6_formats)` being
advertised. |

Implementations that claim support for the [Roadmap 2022](../appendices/roadmap.html#roadmap-2022)
milestone **must** support the following features:

* 
[`fullDrawIndexUint32`](#features-fullDrawIndexUint32)

* 
[`imageCubeArray`](#features-imageCubeArray)

* 
[`independentBlend`](#features-independentBlend)

* 
[`sampleRateShading`](#features-sampleRateShading)

* 
[`drawIndirectFirstInstance`](#features-drawIndirectFirstInstance)

* 
[`depthClamp`](#features-depthClamp)

* 
[`depthBiasClamp`](#features-depthBiasClamp)

* 
[`samplerAnisotropy`](#features-samplerAnisotropy)

* 
[`occlusionQueryPrecise`](#features-occlusionQueryPrecise)

* 
[`fragmentStoresAndAtomics`](#features-fragmentStoresAndAtomics)

* 
[    `shaderStorageImageExtendedFormats`](#features-shaderStorageImageExtendedFormats)

* 
[    `shaderUniformBufferArrayDynamicIndexing`](#features-shaderUniformBufferArrayDynamicIndexing)

* 
[    `shaderSampledImageArrayDynamicIndexing`](#features-shaderSampledImageArrayDynamicIndexing)

* 
[    `shaderStorageBufferArrayDynamicIndexing`](#features-shaderStorageBufferArrayDynamicIndexing)

* 
[    `shaderStorageImageArrayDynamicIndexing`](#features-shaderStorageImageArrayDynamicIndexing)

* 
[`samplerYcbcrConversion`](#features-samplerYcbcrConversion)

* 
[`samplerMirrorClampToEdge`](#features-samplerMirrorClampToEdge)

* 
[`descriptorIndexing`](#features-descriptorIndexing)

* 
[    `shaderUniformTexelBufferArrayDynamicIndexing`](#features-shaderUniformTexelBufferArrayDynamicIndexing)

* 
[    `shaderStorageTexelBufferArrayDynamicIndexing`](#features-shaderStorageTexelBufferArrayDynamicIndexing)

* 
[    `shaderUniformBufferArrayNonUniformIndexing`](#features-shaderUniformBufferArrayNonUniformIndexing)

* 
[    `shaderSampledImageArrayNonUniformIndexing`](#features-shaderSampledImageArrayNonUniformIndexing)

* 
[    `shaderStorageBufferArrayNonUniformIndexing`](#features-shaderStorageBufferArrayNonUniformIndexing)

* 
[    `shaderStorageImageArrayNonUniformIndexing`](#features-shaderStorageImageArrayNonUniformIndexing)

* 
[    `shaderUniformTexelBufferArrayNonUniformIndexing`](#features-shaderUniformTexelBufferArrayNonUniformIndexing)

* 
[    `shaderStorageTexelBufferArrayNonUniformIndexing`](#features-shaderStorageTexelBufferArrayNonUniformIndexing)

* 
[    `descriptorBindingSampledImageUpdateAfterBind`](#features-descriptorBindingSampledImageUpdateAfterBind)

* 
[    `descriptorBindingStorageImageUpdateAfterBind`](#features-descriptorBindingStorageImageUpdateAfterBind)

* 
[    `descriptorBindingStorageBufferUpdateAfterBind`](#features-descriptorBindingStorageBufferUpdateAfterBind)

* 
[    `descriptorBindingUniformTexelBufferUpdateAfterBind`](#features-descriptorBindingUniformTexelBufferUpdateAfterBind)

* 
[    `descriptorBindingStorageTexelBufferUpdateAfterBind`](#features-descriptorBindingStorageTexelBufferUpdateAfterBind)

* 
[    `descriptorBindingUpdateUnusedWhilePending`](#features-descriptorBindingUpdateUnusedWhilePending)

* 
[    `descriptorBindingPartiallyBound`](#features-descriptorBindingPartiallyBound)

* 
[    `descriptorBindingVariableDescriptorCount`](#features-descriptorBindingVariableDescriptorCount)

* 
[`runtimeDescriptorArray`](#features-runtimeDescriptorArray)

* 
[`scalarBlockLayout`](#features-scalarBlockLayout)

Implementations that claim support for the [Roadmap 2024](../appendices/roadmap.html#roadmap-2024)
milestone **must** support the following features:

* 
[`multiDrawIndirect`](#features-multiDrawIndirect)

* 
[`shaderImageGatherExtended`](#features-shaderImageGatherExtended)

* 
[`shaderDrawParameters`](#features-shaderDrawParameters)

* 
[`shaderInt8`](#features-shaderInt8)

* 
[`shaderInt16`](#features-shaderInt16)

* 
[`shaderFloat16`](#features-shaderFloat16)

* 
[`storageBuffer16BitAccess`](#features-storageBuffer16BitAccess)

* 
[`storageBuffer8BitAccess`](#features-storageBuffer8BitAccess)

Implementations that claim support for the [Roadmap 2026](../appendices/roadmap.html#roadmap-2026)
milestone **must** support the following features:

* 
[`hostImageCopy`](#features-hostImageCopy)

* 
[`robustBufferAccess2`](#features-robustBufferAccess2)

* 
[`robustImageAccess2`](#features-robustImageAccess2)

* 
[`nullDescriptor`](#features-nullDescriptor)
