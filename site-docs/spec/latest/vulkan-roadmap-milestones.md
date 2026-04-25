# Vulkan Roadmap Milestones

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/appendices/roadmap.html

## Table of Contents

- [Roadmap 2022](#roadmap-2022)
- [Required API Versions](#_required_api_versions)
- [Required_API_Versions](#_required_api_versions)
- [Required Features](#_required_features)
- [Required Limits](#_required_limits)
- [Required Extensions](#_required_extensions)
- [Roadmap 2024](#roadmap-2024)
- [Required Milestones](#_required_milestones)
- [Required Features](#_required_features_2)
- [Required Limits](#_required_limits_2)
- [Required Extensions](#_required_extensions_2)
- [Roadmap 2026](#roadmap-2026)
- [Required Milestones](#_required_milestones_2)
- [Required Versions](#_required_versions)
- [Required Features](#_required_features_3)
- [Required Limits](#_required_limits_3)
- [Required Extensions](#_required_extensions_3)

## Content

Roadmap milestones are intended to be supported by mid-to-high-end
smartphones, tablets, laptops, consoles, and desktop devices.

Each milestone indicates support for a set of extensions, features, limits,
and formats across these devices, and should be supported by all such new
hardware shipping by the end of the target year or shortly thereafter.

The Roadmap 2022 milestone is intended to be supported by newer
mid-to-high-end devices shipping in 2022 or shortly thereafter across
mainstream smartphone, tablet, laptop, console, and desktop devices.

This milestone requires Vulkan 1.3.

The following core optional features are required to be supported:

* 
Vulkan 1.0 Optional Features

[`fullDrawIndexUint32`](../chapters/features.html#features-fullDrawIndexUint32)

* 
[`imageCubeArray`](../chapters/features.html#features-imageCubeArray)

* 
[`independentBlend`](../chapters/features.html#features-independentBlend)

* 
[`sampleRateShading`](../chapters/features.html#features-sampleRateShading)

* 
[`drawIndirectFirstInstance`](../chapters/features.html#features-drawIndirectFirstInstance)

* 
[`depthClamp`](../chapters/features.html#features-depthClamp)

* 
[`depthBiasClamp`](../chapters/features.html#features-depthBiasClamp)

* 
[`samplerAnisotropy`](../chapters/features.html#features-samplerAnisotropy)

* 
[`occlusionQueryPrecise`](../chapters/features.html#features-occlusionQueryPrecise)

* 
[`fragmentStoresAndAtomics`](../chapters/features.html#features-fragmentStoresAndAtomics)

* 
[     `shaderStorageImageExtendedFormats`](../chapters/features.html#features-shaderStorageImageExtendedFormats)

* 
[     `shaderUniformBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderUniformBufferArrayDynamicIndexing)

* 
[     `shaderSampledImageArrayDynamicIndexing`](../chapters/features.html#features-shaderSampledImageArrayDynamicIndexing)

* 
[     `shaderStorageBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageBufferArrayDynamicIndexing)

* 
[     `shaderStorageImageArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageImageArrayDynamicIndexing)

Vulkan 1.1 Optional Features

* 
[`samplerYcbcrConversion`](../chapters/features.html#features-samplerYcbcrConversion)

Vulkan 1.2 Optional Features

* 
[`samplerMirrorClampToEdge`](../chapters/features.html#features-samplerMirrorClampToEdge)

* 
[`descriptorIndexing`](../chapters/features.html#features-descriptorIndexing)

* 
[     `shaderUniformTexelBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderUniformTexelBufferArrayDynamicIndexing)

* 
[     `shaderStorageTexelBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageTexelBufferArrayDynamicIndexing)

* 
[     `shaderUniformBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderUniformBufferArrayNonUniformIndexing)

* 
[     `shaderSampledImageArrayNonUniformIndexing`](../chapters/features.html#features-shaderSampledImageArrayNonUniformIndexing)

* 
[     `shaderStorageBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderStorageBufferArrayNonUniformIndexing)

* 
[     `shaderStorageImageArrayNonUniformIndexing`](../chapters/features.html#features-shaderStorageImageArrayNonUniformIndexing)

* 
[     `shaderUniformTexelBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderUniformTexelBufferArrayNonUniformIndexing)

* 
[     `shaderStorageTexelBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderStorageTexelBufferArrayNonUniformIndexing)

* 
[     `descriptorBindingSampledImageUpdateAfterBind`](../chapters/features.html#features-descriptorBindingSampledImageUpdateAfterBind)

* 
[     `descriptorBindingStorageImageUpdateAfterBind`](../chapters/features.html#features-descriptorBindingStorageImageUpdateAfterBind)

* 
[     `descriptorBindingStorageBufferUpdateAfterBind`](../chapters/features.html#features-descriptorBindingStorageBufferUpdateAfterBind)

* 
[     `descriptorBindingUniformTexelBufferUpdateAfterBind`](../chapters/features.html#features-descriptorBindingUniformTexelBufferUpdateAfterBind)

* 
[     `descriptorBindingStorageTexelBufferUpdateAfterBind`](../chapters/features.html#features-descriptorBindingStorageTexelBufferUpdateAfterBind)

* 
[     `descriptorBindingUpdateUnusedWhilePending`](../chapters/features.html#features-descriptorBindingUpdateUnusedWhilePending)

* 
[     `descriptorBindingPartiallyBound`](../chapters/features.html#features-descriptorBindingPartiallyBound)

* 
[     `descriptorBindingVariableDescriptorCount`](../chapters/features.html#features-descriptorBindingVariableDescriptorCount)

* 
[`runtimeDescriptorArray`](../chapters/features.html#features-runtimeDescriptorArray)

* 
[`scalarBlockLayout`](../chapters/features.html#features-scalarBlockLayout)

The following core increased limits are **required**

| Limit Name | Unsupported Limit | Core Limit | Milestone Limit | Limit Type1 |
| --- | --- | --- | --- | --- |
| `maxImageDimension1D` | - | 4096 | 8192 | min |
| `maxImageDimension2D` | - | 4096 | 8192 | min |
| `maxImageDimensionCube` | - | 4096 | 8192 | min |
| `maxImageArrayLayers` | - | 256 | 2048 | min |
| `maxUniformBufferRange` | - | 16384 | 65536 | min |
| `bufferImageGranularity` | - | 131072 | 4096 | max |
| `maxPerStageDescriptorSamplers` | - | 16 | 64 | min |
| `maxPerStageDescriptorUniformBuffers` | - | 12 | 15 | min |
| `maxPerStageDescriptorStorageBuffers` | - | 4 | 30 | min |
| `maxPerStageDescriptorSampledImages` | - | 16 | 200 | min |
| `maxPerStageDescriptorStorageImages` | - | 4 | 16 | min |
| `maxPerStageResources` | - | 128 | 200 | min |
| `maxDescriptorSetSamplers` | - | 96 | 576 | min, *n* × PerStage |
| `maxDescriptorSetUniformBuffers` | - | 72 | 90 | min, *n* × PerStage |
| `maxDescriptorSetStorageBuffers` | - | 24 | 96 | min, *n* × PerStage |
| `maxDescriptorSetSampledImages` | - | 96 | 1800 | min, *n* × PerStage |
| `maxDescriptorSetStorageImages` | - | 24 | 144 | min, *n* × PerStage |
| `maxFragmentCombinedOutputResources` | - | 4 | 16 | min |
| `maxComputeWorkGroupInvocations` | - | 128 | 256 | min |
| `maxComputeWorkGroupSize` | - | (128,128,64) | (256,256,64) | min |
| `subTexelPrecisionBits` | - | 4 | 8 | min |
| `mipmapPrecisionBits` | - | 4 | 6 | min |
| `maxSamplerLodBias` | - | 2 | 14 | min |
| `pointSizeGranularity` | 0.0 | 1.0 | 0.125 | max, fixed point increment |
| `lineWidthGranularity` | 0.0 | 1.0 | 0.5 | max, fixed point increment |
| `standardSampleLocations` | - | - | [VK_TRUE](../chapters/fundamentals.html#VK_TRUE) | implementation-dependent |
| `maxColorAttachments` | - | 4 | 7 | min |

| Limit Name | Unsupported Limit | Core Limit | Milestone Limit | Limit Type1 |
| --- | --- | --- | --- | --- |
| `subgroupSize` | - | 1/4 | 4 | implementation-dependent |
| `subgroupSupportedStages` | - | [VK_SHADER_STAGE_COMPUTE_BIT](../chapters/pipelines.html#VkShaderStageFlagBits) | [VK_SHADER_STAGE_COMPUTE_BIT](../chapters/pipelines.html#VkShaderStageFlagBits)

                                                   [VK_SHADER_STAGE_FRAGMENT_BIT](../chapters/pipelines.html#VkShaderStageFlagBits) | implementation-dependent |
| `subgroupSupportedOperations` | - | [VK_SUBGROUP_FEATURE_BASIC_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits) | [VK_SUBGROUP_FEATURE_BASIC_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

                                                   [VK_SUBGROUP_FEATURE_VOTE_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

                                                   [VK_SUBGROUP_FEATURE_ARITHMETIC_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

                                                   [VK_SUBGROUP_FEATURE_BALLOT_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

                                                   [VK_SUBGROUP_FEATURE_SHUFFLE_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

                                                   [VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

                                                   [VK_SUBGROUP_FEATURE_QUAD_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits) | implementation-dependent |

| Limit Name | Unsupported Limit | Core Limit | Milestone Limit | Limit Type1 |
| --- | --- | --- | --- | --- |
| `shaderSignedZeroInfNanPreserveFloat16` | - | - | [VK_TRUE](../chapters/fundamentals.html#VK_TRUE) | implementation-dependent |
| `shaderSignedZeroInfNanPreserveFloat32` | - | - | [VK_TRUE](../chapters/fundamentals.html#VK_TRUE) | implementation-dependent |
| `maxPerStageDescriptorUpdateAfterBindInputAttachments` | 0 | 4 | 7 | min |

| Limit Name | Unsupported Limit | Core Limit | Milestone Limit | Limit Type1 |
| --- | --- | --- | --- | --- |
| `maxSubgroupSize` | - | - | 4 | min |

The following extensions are **required**

[VK_KHR_global_priority](extensions.html#VK_KHR_global_priority)

The Roadmap 2024 milestone is intended to be supported by newer
mid-to-high-end devices shipping in 2024 or shortly thereafter across
mainstream smartphone, tablet, laptop, console, and desktop devices.

Two of the core aims of this roadmap profile are to enable developers to
rely on a number of important rasterization and shader features have been
available for a long time, but until now have not enjoyed wide support.

Shader features required include smaller types
([8/16-bit integers](../chapters/features.html#features-shaderInt8) and
[16-bit floats](../chapters/features.html#features-shaderFloat16)), reconvergence guarantees for
subgroup ops ([VK_KHR_shader_maximal_reconvergence](extensions.html#VK_KHR_shader_maximal_reconvergence) and
[VK_KHR_shader_quad_control](extensions.html#VK_KHR_shader_quad_control)), and more consistent floating-point
handling ([VK_KHR_shader_float_controls2](extensions.html#VK_KHR_shader_float_controls2) and
[round-to-nearest-even for 32-/16-bit floats](../chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat32)).
Rasterization features include requiring support for multi-draw indirect,
shader draw parameters, 8-bit indices, better line rasterization
definitions, and local reads when using dynamic rendering.
A few other features have been added opportunistically, in lieu of shipping
a Vulkan 1.4 in the same time frame, such as [push descriptors](extensions.html#VK_KHR_push_descriptor) and the various minor improvements included in
[VK_KHR_maintenance5](extensions.html#VK_KHR_maintenance5).

This milestone requires the Roadmap 2022 profile.

The following core optional features are required to be supported:

* 
Vulkan 1.0 Optional Features

[`multiDrawIndirect`](../chapters/features.html#features-multiDrawIndirect)

* 
[`shaderImageGatherExtended`](../chapters/features.html#features-shaderImageGatherExtended)

* 
[`shaderInt16`](../chapters/features.html#features-shaderInt16)

Vulkan 1.1 Optional Features

* 
[`shaderDrawParameters`](../chapters/features.html#features-shaderDrawParameters)

* 
[`storageBuffer16BitAccess`](../chapters/features.html#features-storageBuffer16BitAccess)

Vulkan 1.2 Optional Features

* 
[`shaderInt8`](../chapters/features.html#features-shaderInt8)

* 
[`shaderFloat16`](../chapters/features.html#features-shaderFloat16)

* 
[`storageBuffer8BitAccess`](../chapters/features.html#features-storageBuffer8BitAccess)

The following core increased limits are **required**

| Limit Name | Unsupported Limit | Core Limit | Profile Limit | Limit Type1 |
| --- | --- | --- | --- | --- |
| `maxBoundDescriptorSets` | - | 4 | 7 | min |
| `maxColorAttachments` | - | 4 | 8 | min |
| `timestampComputeAndGraphics` | - | FALSE | TRUE | Boolean |

| Limit Name | Unsupported Limit | Core Limit | Profile Limit | Limit Type1 |
| --- | --- | --- | --- | --- |
| `shaderRoundingModeRTEFloat16` | - | FALSE | TRUE | Boolean |
| `shaderRoundingModeRTEFloat32` | - | FALSE | TRUE | Boolean |

The following extensions are **required**

* 
[VK_KHR_dynamic_rendering_local_read](extensions.html#VK_KHR_dynamic_rendering_local_read)

* 
[VK_KHR_load_store_op_none](extensions.html#VK_KHR_load_store_op_none)

* 
[VK_KHR_shader_quad_control](extensions.html#VK_KHR_shader_quad_control)

* 
[VK_KHR_shader_maximal_reconvergence](extensions.html#VK_KHR_shader_maximal_reconvergence)

* 
[VK_KHR_shader_subgroup_uniform_control_flow](extensions.html#VK_KHR_shader_subgroup_uniform_control_flow)

* 
[VK_KHR_shader_subgroup_rotate](extensions.html#VK_KHR_shader_subgroup_rotate)

* 
[VK_KHR_shader_float_controls2](extensions.html#VK_KHR_shader_float_controls2)

* 
[VK_KHR_shader_expect_assume](extensions.html#VK_KHR_shader_expect_assume)

* 
[VK_KHR_line_rasterization](extensions.html#VK_KHR_line_rasterization)

* 
[VK_KHR_vertex_attribute_divisor](extensions.html#VK_KHR_vertex_attribute_divisor)

* 
[VK_KHR_index_type_uint8](extensions.html#VK_KHR_index_type_uint8)

* 
[VK_KHR_map_memory2](extensions.html#VK_KHR_map_memory2)

* 
[VK_KHR_maintenance5](extensions.html#VK_KHR_maintenance5)

* 
[VK_KHR_push_descriptor](extensions.html#VK_KHR_push_descriptor)

The Roadmap 2026 milestone is intended to be supported by newer
mid-to-high-end devices shipping in 2026 or shortly thereafter across
mainstream smartphone, tablet, laptop, console, and desktop devices.

This milestone raises the baseline feature support of Vulkan implementations
as with prior milestones.
In addition, this milestone makes guarantees about swapchain and presentation
support for implementations.

Highlights of this roadmap include support for the following extensions:

* 
[VK_KHR_fragment_shading_rate](extensions.html#VK_KHR_fragment_shading_rate)

* 
[VK_KHR_shader_clock](extensions.html#VK_KHR_shader_clock)

* 
[VK_KHR_compute_shader_derivatives](extensions.html#VK_KHR_compute_shader_derivatives)

* 
[VK_KHR_cooperative_matrix](extensions.html#VK_KHR_cooperative_matrix)

* 
[VK_KHR_surface](extensions.html#VK_KHR_surface) and [VK_KHR_swapchain](extensions.html#VK_KHR_swapchain)

* 
[VK_KHR_present_mode_fifo_latest_ready](extensions.html#VK_KHR_present_mode_fifo_latest_ready)

* 
[VK_KHR_present_id2](extensions.html#VK_KHR_present_id2) and [VK_KHR_present_wait2](extensions.html#VK_KHR_present_wait2)

Several other extensions and limits are also required by this milestone as
indicated below.

This requires the Roadmap 2024 milestone.

Vulkan 1.4 is required by this milestone.

The following core optional features are required to be supported:

* 
Vulkan 1.4 Optional Features

[`hostImageCopy`](../chapters/features.html#features-hostImageCopy)

[VK_KHR_robustness2](extensions.html#VK_KHR_robustness2) Features

* 
[`robustBufferAccess2`](../chapters/features.html#features-robustBufferAccess2)

* 
[`robustImageAccess2`](../chapters/features.html#features-robustImageAccess2)

* 
[`nullDescriptor`](../chapters/features.html#features-nullDescriptor)

The following core increased limits are **required**

| Limit Name | Core | 2026 | Limit Type1 |
| --- | --- | --- | --- |
| `maxPerStageDescriptorUniformBuffers` | 15 | 200 | min |
| `maxPerStageDescriptorStorageBuffers` | 4 | 200 | min |
| `maxPerStageDescriptorInputAttachments` | 4 | 8 | min |
| `maxDescriptorSetStorageBuffers` | 96 | 1800 | min |
| `maxDescriptorSetUniformBuffers` | 96 | 1800 | min |
| `maxDescriptorSetInputAttachments` | 4 | 8 | min |
| `maxVertexOutputComponents` | 64 | 124 | min |
| `maxTessellationControlPerVertexInputComponents` | 64 | 128 | min |
| `maxTessellationControlPerVertexOutputComponents` | 64 | 128 | min |
| `maxTessellationControlTotalOutputComponents` | 2048 | 4096 | min |
| `maxTessellationEvaluationInputComponents` | 64 | 128 | min |
| `maxTessellationEvaluationOutputComponents` | 64 | 128 | min |
| `maxGeometryOutputComponents` | 64 | 128 | min |
| `maxFragmentInputComponents` | 64 | 112 | min |
| `maxFragmentOutputAttachments` | 4 | 8 | min |
| `maxComputeSharedMemorySize` | 16384 | 32768 | min |
| `subPixelPrecisionBits` | 4 | 8 | min |
| `maxViewportDimensions.width` | 7680 | 8192 | min |
| `maxViewportDimensions.height` | 7680 | 8192 | min |
| `maxFramebufferWidth` | 7680 | 8192 | min |
| `maxFramebufferHeight` | 7680 | 8192 | min |

The following extensions are **required**

* 
[VK_KHR_robustness2](extensions.html#VK_KHR_robustness2)

* 
[VK_KHR_pipeline_binary](extensions.html#VK_KHR_pipeline_binary)

* 
[VK_KHR_fragment_shading_rate](extensions.html#VK_KHR_fragment_shading_rate)

* 
[VK_KHR_shader_clock](extensions.html#VK_KHR_shader_clock)

* 
[VK_KHR_workgroup_memory_explicit_layout](extensions.html#VK_KHR_workgroup_memory_explicit_layout)

* 
[VK_KHR_compute_shader_derivatives](extensions.html#VK_KHR_compute_shader_derivatives)

* 
[VK_KHR_maintenance7](extensions.html#VK_KHR_maintenance7)

* 
[VK_KHR_maintenance8](extensions.html#VK_KHR_maintenance8)

* 
[VK_KHR_maintenance9](extensions.html#VK_KHR_maintenance9)

* 
[VK_KHR_depth_clamp_zero_one](extensions.html#VK_KHR_depth_clamp_zero_one)

* 
[VK_KHR_copy_memory_indirect](extensions.html#VK_KHR_copy_memory_indirect)

* 
[VK_KHR_shader_untyped_pointers](extensions.html#VK_KHR_shader_untyped_pointers)

* 
[VK_KHR_surface](extensions.html#VK_KHR_surface)

* 
[VK_KHR_swapchain](extensions.html#VK_KHR_swapchain)

* 
[VK_KHR_present_mode_fifo_latest_ready](extensions.html#VK_KHR_present_mode_fifo_latest_ready)

* 
[VK_KHR_present_id2](extensions.html#VK_KHR_present_id2)

* 
[VK_KHR_present_wait2](extensions.html#VK_KHR_present_wait2)

* 
[VK_KHR_surface_maintenance1](extensions.html#VK_KHR_surface_maintenance1)

* 
[VK_KHR_swapchain_maintenance1](extensions.html#VK_KHR_swapchain_maintenance1)

* 
[VK_KHR_cooperative_matrix](extensions.html#VK_KHR_cooperative_matrix)
