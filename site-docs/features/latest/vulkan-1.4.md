# Vulkan 1.4

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_VERSION_1_4.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. Roadmap 2022](#_roadmap_2022)
- [3.1._Roadmap_2022](#_roadmap_2022)
- [3.2. Roadmap 2024](#_roadmap_2024)
- [3.2._Roadmap_2024](#_roadmap_2024)
- [3.3. Additional Functionality](#_additional_functionality)
- [3.3._Additional_Functionality](#_additional_functionality)
- [3.4. Streaming Transfers](#_streaming_transfers)
- [3.4._Streaming_Transfers](#_streaming_transfers)
- [3.5. New Features Structure](#_new_features_structure)
- [3.5._New_Features_Structure](#_new_features_structure)
- [3.6. New Properties Structure](#_new_properties_structure)
- [3.6._New_Properties_Structure](#_new_properties_structure)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. Roadmap 2022](#_roadmap_2022)
[3.2. Roadmap 2024](#_roadmap_2024)
[3.3. Additional Functionality](#_additional_functionality)
[3.4. Streaming Transfers](#_streaming_transfers)
[3.5. New Features Structure](#_new_features_structure)
[3.6. New Properties Structure](#_new_properties_structure)

This proposal describes the contents of version 1.4 of the Vulkan API Specification.

Previous minor versions of Vulkan have included a small subset of the functionality that all vendors agreed to support at the time the specification was written, with no specific planning as to what the contents would be.
As a result, while core versions have included a handful of useful features, several very useful features in the API have languished without inclusion for a long time, reducing adoption rates and increasing fragmentation in the industry.

This version aims to be the first (hopefully of many) where a different approach is taken - planning in advance to define a more compelling core version.

A number of approaches were considered as to how to handle Vulkan 1.4:

Business as usual - include whatever features were supported widely and implement whatever else is left

Define a "core roadmap" that sits in parallel with the immersive graphics roadmap

Define core versions based primarily as subsets of the immersive graphics roadmap

Option (1) potentially could have worked along the same lines as option (3), but more organically - rather than defining the roadmap directly, we would rely on vendors trickling features into their full hardware catalog over time.
Ultimately though, as the working group always goes through and votes on which features are in or out, this would not really save any effort and would likely result in features not making the cut just because one or two vendors did not include a particular feature in their own roadmaps.

Option (2) was initially considered on the basis that embedded devices may in some instances require specific features that would not make sense on immersive parts, thus a separate roadmap was a somewhat attractive option.
After consideration however, the set of features was nearly zero, and was more closely tied to platforms rather than specific markets.
Maintaining an entirely separate roadmap would have been a lot of extra effort to likely end up producing the same result as option (3).

Option (3) has the benefit of reusing the already defined roadmap, allowing these two key products of the working group (roadmap milestones and core versions) to complement each other, rather than competing for resources.
By doing so, validation, spec writing, testing, and implementation of a new core version will require minimal effort, while standardizing an already largely vetted set of features into a new core version.

This proposal defines a Vulkan 1.4 along the lines of Option (3), using the Vulkan 2022 and Vulkan 2024 roadmaps as a starting point.

This version is primarily based on features present in Roadmap 2022 and Roadmap 2024, with features omitted if they cannot be reasonably implemented on all currently supported hardware across all vendors.
Features omitted in this version are still candidates for inclusion in future versions of the specification.

The following features from Roadmap 2022 are required in this version:

* 
Vulkan 1.0 Optional Features

[`fullDrawIndexUint32`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-fullDrawIndexUint32)

* 
[`imageCubeArray`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-imageCubeArray)

* 
[`independentBlend`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-independentBlend)

* 
[`sampleRateShading`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-sampleRateShading)

* 
[`drawIndirectFirstInstance`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-drawIndirectFirstInstance)

* 
[`depthClamp`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-depthClamp)

* 
[`depthBiasClamp`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-depthBiasClamp)

* 
[`samplerAnisotropy`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-samplerAnisotropy)

* 
[`fragmentStoresAndAtomics`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-fragmentStoresAndAtomics)

* 
[`shaderStorageImageExtendedFormats`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderStorageImageExtendedFormats)

* 
[`shaderUniformBufferArrayDynamicIndexing`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderUniformBufferArrayDynamicIndexing)

* 
[`shaderSampledImageArrayDynamicIndexing`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderSampledImageArrayDynamicIndexing)

* 
[`shaderStorageBufferArrayDynamicIndexing`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderStorageBufferArrayDynamicIndexing)

* 
[`shaderStorageImageArrayDynamicIndexing`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderStorageImageArrayDynamicIndexing)

Vulkan 1.1 Optional Features

* 
[`samplerYcbcrConversion`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-samplerYcbcrConversion)

Vulkan 1.2 Optional Features

* 
[`samplerMirrorClampToEdge`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-samplerMirrorClampToEdge)

* 
[`scalarBlockLayout`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-scalarBlockLayout)

* 
[`shaderUniformTexelBufferArrayDynamicIndexing`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderUniformTexelBufferArrayDynamicIndexing)

* 
[`shaderStorageTexelBufferArrayDynamicIndexing`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderStorageTexelBufferArrayDynamicIndexing)

The following limits from Roadmap 2022 are required in this version:

| Limit Name | Required Value | Limit Type |
| --- | --- | --- |
| `maxImageDimension1D` | 8192 | min |
| `maxImageDimension2D` | 8192 | min |
| `maxImageDimensionCube` | 8192 | min |
| `maxImageArrayLayers` | 2048 | min |
| `maxUniformBufferRange` | 65536 | min |
| `bufferImageGranularity` | 4096 | max |
| `maxPerStageDescriptorUniformBuffers` | 15 | min |
| `maxPerStageResources` | 200 | min |
| `maxDescriptorSetUniformBuffers` | 90 | min, *n* × PerStage |
| `maxDescriptorSetStorageBuffers` | 96 | min, *n* × PerStage |
| `maxDescriptorSetStorageImages` | 144 | min, *n* × PerStage |
| `maxFragmentCombinedOutputResources` | 16 | min |
| `maxComputeWorkGroupInvocations` | 256 | min |
| `maxComputeWorkGroupSize` | (256,256,64) | min |
| `subTexelPrecisionBits` | 8 | min |
| `mipmapPrecisionBits` | 6 | min |
| `maxSamplerLodBias` | 14 | min |
| `pointSizeGranularity` | 0.125 | max, fixed point increment |
| `lineWidthGranularity` | 0.5 | max, fixed point increment |
| `standardSampleLocations` | `VK_TRUE` | Boolean |
| `maxColorAttachments` | 8 | min |

|  | maxColorAttachments is bumped to 8 in line with Roadmap 2024, as opposed to the 7 required by Roadmap 2022. |
| --- | --- |

| Limit Name | Required Value | Limit Type |
| --- | --- | --- |
| `subgroupSupportedStages` | `VK_SHADER_STAGE_COMPUTE_BIT`

                                              `VK_SHADER_STAGE_FRAGMENT_BIT` | flags |
| `subgroupSupportedOperations` | `VK_SUBGROUP_FEATURE_BASIC_BIT`

                                              `VK_SUBGROUP_FEATURE_VOTE_BIT`

                                              `VK_SUBGROUP_FEATURE_ARITHMETIC_BIT`

                                              `VK_SUBGROUP_FEATURE_BALLOT_BIT`

                                              `VK_SUBGROUP_FEATURE_SHUFFLE_BIT`

                                              `VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT`

                                              `VK_SUBGROUP_FEATURE_QUAD_BIT` * | flags |

*`VK_SUBGROUP_FEATURE_QUAD_BIT` is only supported if the advertised subgroup size is 4 or higher.

|  | Vulkan 1.4 does not require a supported subgroup size of greater than 1, but if a vendor does have a meaningful subgroup size, all of the above features will be supported. |
| --- | --- |

| Limit Name | Required Value | Limit Type |
| --- | --- | --- |
| `shaderSignedZeroInfNanPreserveFloat16` | `VK_TRUE`* | Boolean |
| `shaderSignedZeroInfNanPreserveFloat32` | `VK_TRUE` | Boolean |

*`shaderSignedZeroInfNanPreserveFloat16` is only supported if the `shaderFloat16` feature is supported.

The [`VK_KHR_global_priority`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_global_priority) extension is promoted in its entirety to Vulkan 1.4.

The following features from Roadmap 2024 are required in Vulkan 1.4:

* 
Vulkan 1.0 Optional Features

[`shaderImageGatherExtended`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderImageGatherExtended)

* 
[`shaderInt16`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderInt16)

Vulkan 1.1 Optional Features

* 
[`storageBuffer16BitAccess`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-storageBuffer16BitAccess)

Vulkan 1.2 Optional Features

* 
[`shaderInt8`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-shaderInt8)

* 
[`storageBuffer8BitAccess`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-storageBuffer8BitAccess)

The following limits from Roadmap 2024 are now required in Vulkan 1.4:

| Limit Name | Required Value | Limit Type |
| --- | --- | --- |
| `maxBoundDescriptorSets` | 7 | min |
| `maxColorAttachments` | 8 | min |
| `timestampComputeAndGraphics` | `VK_TRUE` | Boolean |

The following extensions are promoted in their entirety to Vulkan 1.4:

* 
[`VK_KHR_load_store_op_none`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_load_store_op_none)

* 
[`VK_KHR_shader_subgroup_rotate`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_shader_subgroup_rotate)

* 
[`VK_KHR_shader_float_controls2`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_shader_float_controls2)

* 
[`VK_KHR_shader_expect_assume`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_shader_expect_assume)

* 
[`VK_KHR_line_rasterization`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_line_rasterization)

* 
[`VK_KHR_vertex_attribute_divisor`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_vertex_attribute_divisor)

* 
[`VK_KHR_index_type_uint8`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_index_type_uint8)

* 
[`VK_KHR_map_memory2`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_map_memory2)

* 
[`VK_KHR_maintenance5`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_maintenance5)

* 
[`VK_KHR_push_descriptor`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_push_descriptor)

Additionally, [`VK_KHR_dynamic_rendering_local_read`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_dynamic_rendering_local_read) is partially promoted; implementations must support local read for storage resources and single sampled color attachments.
Support for reading depth/stencil attachments and multi-sampled attachments are gated behind the new Boolean `dynamicRenderingLocalReadDepthStencilAttachments` and `dynamicRenderingLocalReadMultisampledAttachments` properties.
If `dynamicRenderingLocalReadDepthStencilAttachments` and `dynamicRenderingLocalReadMultisampledAttachments` are `VK_TRUE`, the full functionality of the extension is present.
If `dynamicRenderingLocalReadDepthStencilAttachments` is `VK_FALSE`, implementations do not support depth/stencil attachment access within dynamic rendering.
If `dynamicRenderingLocalReadMultisampledAttachments` is `VK_FALSE`, implementations do not support multisampled attachment access within dynamic rendering.

|  | Applications can work around the lack of depth stencil support by allocating an additional color attachment and writing depth/stencil values into it. |
| --- | --- |

While it is intended that there are as few additional features beyond the roadmap as possible - ideally limited to maintenance extensions - for the first version there are a number of additional required features.
These are a mixture of items included in the Android 15 feature requirements, the Android Baseline 2022 profile, and a few items based on feedback that were missed during development of roadmap 2024.

The following additional features are required to be supported in Vulkan 1.4:

* 
[`largePoints`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-largePoints)

* 
[`variablePointers`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-variablePointers)

* 
[`variablePointersStorageBuffer`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-variablePointersStorageBuffer)

* 
[`bresenhamLines`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-bresenhamLines)

The following additional limits are required in Vulkan 1.4:

| Limit Name | Required Value | Limit Type |
| --- | --- | --- |
| `maxImageDimension3D` | 512 | min |
| `pointSizeRange[1]` | 256 - `pointSizeGranularity` | min |
| `maxPushConstantsSize` | 256 | min |
| `maxViewportDimensions` | (7680,7680) | min |
| `viewportBoundsRange` | (-15360,15359) | (max,min) |
| `maxFramebufferWidth` | 7680 | min |
| `maxFramebufferHeight` | 7680 | min |

The following additional extensions are promoted in their entirety to Vulkan 1.4:

* 
[`VK_KHR_maintenance6`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_maintenance6)

* 
[`VK_EXT_pipeline_protected_access`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_pipeline_protected_access)

* 
[`VK_EXT_pipeline_robustness`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_pipeline_robustness)

Clustered subgroup operations must also be advertised in Vulkan 1.4 via setting both `VK_SUBGROUP_FEATURE_CLUSTERED_BIT` and `VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT` (as an interaction with the newly-promoted [`VK_KHR_shader_subgroup_rotate`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_shader_subgroup_rotate) extension) in `subgroupSupportedOperations`.

One of the gnarlier problems without a clear solution in earlier versions of Vulkan has been streaming large quantities of data to the device while simultaneously rendering.
In OpenGL and other APIs, copy functions taking in host pointers allowed implementations a lot of leeway on where and how the transfer was performed, allowing implementations to use host copies, a dedicated transfer queue, or other solutions as they saw fit to ensure rendering could keep going at full speed.

Vendors are free to expose a dedicated transfer queue if they have one, and more recently [`VK_EXT_host_image_copy`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_host_image_copy) has enabled drivers to advertise host copies as an option if they do not have a separate transfer queue.
Either of these paths will result in a way to provide applications a method to stream data between host and device without interrupting rendering.

Vulkan 1.4 imposes a few new requirements in order to ensure applications have a viable path for streaming on all Vulkan 1.4 implementations:

* 
[`VK_EXT_host_image_copy`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_host_image_copy) is promoted to core, but supporting its functionality is optional

* 
An implementation must support either:

the [`hostImageCopy`](https://docs.vulkan.org/spec/latest/chapters/features.html#features-hostImageCopy) feature; or

* 
an additional queue that supports `VK_QUEUE_TRANSFER_BIT`.

All queues supporting `VK_QUEUE_GRAPHICS_BIT` or `VK_QUEUE_COMPUTE_BIT` must also advertise `VK_QUEUE_TRANSFER_BIT`.

Applications should use whichever option is available when streaming in large quantities of data, choosing the most suitable for their use case if both are available.
Applications should avoid performing large transfers on the same queue that they are either rendering with or executing other high priority workloads on.

A new feature structure is added which includes the features of all of the extensions promoted into core:

typedef struct VkPhysicalDeviceVulkan14Features {
    VkStructureType     sType;
    void*               pNext;
    VkBool32            globalPriorityQuery;
    VkBool32            shaderSubgroupRotate;
    VkBool32            shaderSubgroupRotateClustered;
    VkBool32            shaderFloatControls2;
    VkBool32            shaderExpectAssume;
    VkBool32            rectangularLines;
    VkBool32            bresenhamLines;
    VkBool32            smoothLines;
    VkBool32            stippledRectangularLines;
    VkBool32            stippledBresenhamLines;
    VkBool32            stippledSmoothLines;
    VkBool32            vertexAttributeInstanceRateDivisor;
    VkBool32            vertexAttributeInstanceRateZeroDivisor;
    VkBool32            indexTypeUint8;
    VkBool32            dynamicRenderingLocalRead;
    VkBool32            maintenance5;
    VkBool32            maintenance6;
    VkBool32            pipelineProtectedAccess;
    VkBool32            pipelineRobustness;
    VkBool32            hostImageCopy;
    VkBool32            pushDescriptor;
} VkPhysicalDeviceVulkan14Features;

All features have the same meaning and requirements as their counterparts in the extensions they were promoted from, with the following exceptions:

* 
`bresenhamLines` and `shaderSubgroupRotateClustered` are additionally required

* 
`pushDescriptor`, which is added as an additional feature for the functionality of [`VK_KHR_push_descriptor`](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_push_descriptor) and is required

* 
`pipelineProtectedAccess`, which is required only when the `protectedMemory` feature is supported

A new properties structure is added which includes the properties all of the extensions promoted into core:

typedef struct VkPhysicalDeviceVulkan14Properties {
    VkStructureType                         sType;
    void*                                   pNext;
    // VK_KHR_line_rasterization
    uint32_t                                lineSubPixelPrecisionBits;
    // VK_KHR_vertex_attribute_divisor
    uint32_t                                maxVertexAttribDivisor;
    VkBool32                                supportsNonZeroFirstInstance;
    // VK_KHR_push_descriptor
    uint32_t                                maxPushDescriptors;
    // VK_KHR_dynamic_rendering_local_read
    VkBool32                                dynamicRenderingLocalReadDepthStencilAttachments;
    VkBool32                                dynamicRenderingLocalReadMultisampledAttachments;
    // VK_KHR_maintenance5
    VkBool32                                earlyFragmentMultisampleCoverageAfterSampleCounting;
    VkBool32                                earlyFragmentSampleMaskTestBeforeSampleCounting;
    VkBool32                                depthStencilSwizzleOneSupport;
    VkBool32                                polygonModePointSize;
    VkBool32                                nonStrictSinglePixelWideLinesUseParallelogram;
    VkBool32                                nonStrictWideLinesUseParallelogram;
    // VK_KHR_maintenance6
    VkBool32                                blockTexelViewCompatibleMultipleLayers;
    uint32_t                                maxCombinedImageSamplerDescriptorCount;
    VkBool32                                fragmentShadingRateClampCombinerInputs;
    // VK_EXT_pipeline_robustness
    VkPipelineRobustnessBufferBehavior      defaultRobustnessStorageBuffers;
    VkPipelineRobustnessBufferBehavior      defaultRobustnessUniformBuffers;
    VkPipelineRobustnessBufferBehavior      defaultRobustnessVertexInputs;
    VkPipelineRobustnessImageBehavior       defaultRobustnessImages;
    // VK_EXT_host_image_copy
    uint32_t                                copySrcLayoutCount;
    VkImageLayout*                          pCopySrcLayouts;
    uint32_t                                copyDstLayoutCount;
    VkImageLayout*                          pCopyDstLayouts;
    uint8_t                                 optimalTilingLayoutUUID[VK_UUID_SIZE];
    VkBool32                                identicalMemoryTypeRequirements;
} VkPhysicalDeviceVulkan14Properties;

All properties have the same meaning and required limits as their counterparts in the extensions they were promoted from, with the exception of the newly added `dynamicRenderingLocalReadDepthStencilAttachments` and `dynamicRenderingLocalReadMultisampledAttachments` limits, which are optional and gate support for local reads of depth/stencil attachments and multisampled attachments in dynamic rendering.
