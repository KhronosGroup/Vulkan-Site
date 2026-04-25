# Required_Limits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/Required_Limits.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

Required_Limits - Vulkan required limit tables

The following table specifies the **required** minimum/maximum for all Vulkan
graphics implementations.
Where a limit corresponds to a fine-grained device feature which is
**optional**, the feature name is listed with two **required** limits, one when
the feature is supported and one when it is not supported.
If an implementation supports a feature, the limits reported are the same
whether or not the feature is enabled.

| Type | Limit | Feature |
| --- | --- | --- |
| `uint32_t` | `maxImageDimension1D` | - |
| `uint32_t` | `maxImageDimension2D` | - |
| `uint32_t` | `maxImageDimension3D` | - |
| `uint32_t` | `maxImageDimensionCube` | - |
| `uint32_t` | `maxImageArrayLayers` | - |
| `uint32_t` | `maxTexelBufferElements` | - |
| `uint32_t` | `maxUniformBufferRange` | - |
| `uint32_t` | `maxStorageBufferRange` | - |
| `uint32_t` | `maxPushConstantsSize` | - |
| `uint32_t` | `maxMemoryAllocationCount` | - |
| `uint32_t` | `maxSamplerAllocationCount` | - |
| `VkDeviceSize` | `bufferImageGranularity` | - |
| `VkDeviceSize` | `sparseAddressSpaceSize` | `sparseBinding` |
| `uint32_t` | `maxBoundDescriptorSets` | - |
| `uint32_t` | `maxPerStageDescriptorSamplers` | - |
| `uint32_t` | `maxPerStageDescriptorUniformBuffers` | - |
| `uint32_t` | `maxPerStageDescriptorStorageBuffers` | - |
| `uint32_t` | `maxPerStageDescriptorSampledImages` | - |
| `uint32_t` | `maxPerStageDescriptorStorageImages` | - |
| `uint32_t` | `maxPerStageDescriptorInputAttachments` | - |
| `uint32_t` | `maxPerStageResources` | - |
| `uint32_t` | `maxDescriptorSetSamplers` | - |
| `uint32_t` | `maxDescriptorSetUniformBuffers` | - |
| `uint32_t` | `maxDescriptorSetUniformBuffersDynamic` | - |
| `uint32_t` | `maxDescriptorSetStorageBuffers` | - |
| `uint32_t` | `maxDescriptorSetStorageBuffersDynamic` | - |
| `uint32_t` | `maxDescriptorSetSampledImages` | - |
| `uint32_t` | `maxDescriptorSetStorageImages` | - |
| `uint32_t` | `maxDescriptorSetInputAttachments` | - |
| `uint32_t` | `maxVertexInputAttributes` | - |
| `uint32_t` | `maxVertexInputBindings` | - |
| `uint32_t` | `maxVertexInputAttributeOffset` | - |
| `uint32_t` | `maxVertexInputBindingStride` | - |
| `uint32_t` | `maxVertexOutputComponents` | - |
| `uint32_t` | `maxTessellationGenerationLevel` | `tessellationShader` |
| `uint32_t` | `maxTessellationPatchSize` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlPerVertexInputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlPerVertexOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlPerPatchOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlTotalOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationEvaluationInputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationEvaluationOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxGeometryShaderInvocations` | `geometryShader` |
| `uint32_t` | `maxGeometryInputComponents` | `geometryShader` |
| `uint32_t` | `maxGeometryOutputComponents` | `geometryShader` |
| `uint32_t` | `maxGeometryOutputVertices` | `geometryShader` |
| `uint32_t` | `maxGeometryTotalOutputComponents` | `geometryShader` |
| `uint32_t` | `maxFragmentInputComponents` | - |
| `uint32_t` | `maxFragmentOutputAttachments` | - |
| `uint32_t` | `maxFragmentDualSrcAttachments` | `dualSrcBlend` |
| `uint32_t` | `maxFragmentCombinedOutputResources` | - |
| `uint32_t` | `maxComputeSharedMemorySize` | - |
| 3 × `uint32_t` | `maxComputeWorkGroupCount` | - |
| `uint32_t` | `maxComputeWorkGroupInvocations` | - |
| 3 × `uint32_t` | `maxComputeWorkGroupSize` | - |
| `uint32_t` | `subPixelPrecisionBits` | - |
| `uint32_t` | `subTexelPrecisionBits` | - |
| `uint32_t` | `mipmapPrecisionBits` | - |
| `uint32_t` | `maxDrawIndexedIndexValue` | `fullDrawIndexUint32` |
| `uint32_t` | `maxDrawIndirectCount` | `multiDrawIndirect` |
| `float` | `maxSamplerLodBias` | - |
| `float` | `maxSamplerAnisotropy` | `samplerAnisotropy` |
| `uint32_t` | `maxViewports` | `multiViewport` |
| 2 × `uint32_t` | `maxViewportDimensions` | - |
| 2 × `float` | `viewportBoundsRange` | - |
| `uint32_t` | `viewportSubPixelBits` | - |
| `size_t` | `minMemoryMapAlignment` | - |
| `VkDeviceSize` | `minTexelBufferOffsetAlignment` | - |
| `VkDeviceSize` | `minUniformBufferOffsetAlignment` | - |
| `VkDeviceSize` | `minStorageBufferOffsetAlignment` | - |
| `int32_t` | `minTexelOffset` | - |
| `uint32_t` | `maxTexelOffset` | - |
| `int32_t` | `minTexelGatherOffset` | `shaderImageGatherExtended` |
| `uint32_t` | `maxTexelGatherOffset` | `shaderImageGatherExtended` |
| `float` | `minInterpolationOffset` | `sampleRateShading` |
| `float` | `maxInterpolationOffset` | `sampleRateShading` |
| `uint32_t` | `subPixelInterpolationOffsetBits` | `sampleRateShading` |
| `uint32_t` | `maxFramebufferWidth` | - |
| `uint32_t` | `maxFramebufferHeight` | - |
| `uint32_t` | `maxFramebufferLayers` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `framebufferColorSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `framebufferIntegerColorSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `framebufferDepthSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `framebufferStencilSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `framebufferNoAttachmentsSampleCounts` | - |
| `uint32_t` | `maxColorAttachments` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `sampledImageColorSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `sampledImageIntegerSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `sampledImageDepthSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `sampledImageStencilSampleCounts` | - |
| [VkSampleCountFlags](VkSampleCountFlags.html) | `storageImageSampleCounts` | `shaderStorageImageMultisample` |
| `uint32_t` | `maxSampleMaskWords` | - |
| `VkBool32` | `timestampComputeAndGraphics` | - |
| `float` | `timestampPeriod` | - |
| `uint32_t` | `maxClipDistances` | `shaderClipDistance` |
| `uint32_t` | `maxCullDistances` | `shaderCullDistance` |
| `uint32_t` | `maxCombinedClipAndCullDistances` | `shaderCullDistance` |
| `uint32_t` | `discreteQueuePriorities` | - |
| 2 × `float` | `pointSizeRange` | `largePoints` |
| 2 × `float` | `lineWidthRange` | `wideLines` |
| `float` | `pointSizeGranularity` | `largePoints` |
| `float` | `lineWidthGranularity` | `wideLines` |
| `VkBool32` | `strictLines` | - |
| `VkBool32` | `standardSampleLocations` | - |
| `VkDeviceSize` | `optimalBufferCopyOffsetAlignment` | - |
| `VkDeviceSize` | `optimalBufferCopyRowPitchAlignment` | - |
| `VkDeviceSize` | `nonCoherentAtomSize` | - |
| `uint32_t` | `maxDiscardRectangles` | `[VK_EXT_discard_rectangles](VK_EXT_discard_rectangles.html)` |
| `VkBool32` | `filterMinmaxSingleComponentFormats` | `[samplerFilterMinmax`](../../../../spec/latest/chapters/features.html#features-samplerFilterMinmax)
`[VK_EXT_sampler_filter_minmax](VK_EXT_sampler_filter_minmax.html)` |
| `VkBool32` | `filterMinmaxImageComponentMapping` | `[samplerFilterMinmax`](../../../../spec/latest/chapters/features.html#features-samplerFilterMinmax)
`[VK_EXT_sampler_filter_minmax](VK_EXT_sampler_filter_minmax.html)` |
| `VkDeviceSize` | `maxBufferSize` | `[maintenance4`](../../../../spec/latest/chapters/features.html#features-maintenance4) |
| `float` | `primitiveOverestimationSize` | `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` |
| `VkBool32` | `maxExtraPrimitiveOverestimationSize` | `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` |
| `float` | `extraPrimitiveOverestimationSizeGranularity` | `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` |
| `VkBool32` | `degenerateTriangleRasterized` | `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` |
| `float` | `degenerateLinesRasterized` | `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` |
| `VkBool32` | `fullyCoveredFragmentShaderInputVariable` | `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` |
| `VkBool32` | `conservativeRasterizationPostDepthCoverage` | `[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html)` |
| `uint32_t` | `maxUpdateAfterBindDescriptorsInAllPools` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `VkBool32` | `shaderUniformBufferArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderSampledImageArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderStorageBufferArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderStorageImageArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderInputAttachmentArrayNonUniformIndexingNative` | - |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindSamplers` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindUniformBuffers` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindStorageBuffers` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindSampledImages` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindStorageImages` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindInputAttachments` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageUpdateAfterBindResources` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindSamplers` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindUniformBuffers` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindStorageBuffers` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindSampledImages` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindStorageImages` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindInputAttachments` | `[descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) |
| `uint32_t` | `maxInlineUniformBlockSize` | `[inlineUniformBlock`](../../../../spec/latest/chapters/features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxPerStageDescriptorInlineUniformBlocks` | `[inlineUniformBlock`](../../../../spec/latest/chapters/features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks` | `[inlineUniformBlock`](../../../../spec/latest/chapters/features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxDescriptorSetInlineUniformBlocks` | `[inlineUniformBlock`](../../../../spec/latest/chapters/features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindInlineUniformBlocks` | `[inlineUniformBlock`](../../../../spec/latest/chapters/features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxInlineUniformTotalSize` | `[inlineUniformBlock`](../../../../spec/latest/chapters/features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxVertexAttribDivisor` | Vulkan 1.4, [VK_KHR_vertex_attribute_divisor](VK_KHR_vertex_attribute_divisor.html), [VK_EXT_vertex_attribute_divisor](VK_EXT_vertex_attribute_divisor.html) |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxDrawMeshTasksCount` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskWorkGroupInvocations` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskWorkGroupSize` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskTotalMemorySize` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskOutputCount` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshWorkGroupInvocations` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshWorkGroupSize` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshTotalMemorySize` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshOutputVertices` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshOutputPrimitives` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshMultiviewViewCount` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`meshOutputPerVertexGranularity` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`meshOutputPerPrimitiveGranularity` | `[VK_NV_mesh_shader](VK_NV_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupTotalCount` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupCount` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupInvocations` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupSize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskPayloadSize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskSharedMemorySize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskPayloadAndSharedMemorySize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupTotalCount` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupCount` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupInvocations` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupSize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshSharedMemorySize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshPayloadAndSharedMemorySize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputMemorySize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshPayloadAndOutputMemorySize` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputComponents` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputVertices` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputPrimitives` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputLayers` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshMultiviewViewCount` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`meshOutputPerVertexGranularity` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`meshOutputPerPrimitiveGranularity` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxPreferredTaskWorkGroupInvocations` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxPreferredMeshWorkGroupInvocations` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersLocalInvocationVertexOutput` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersLocalInvocationPrimitiveOutput` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersCompactVertexOutput` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersCompactPrimitiveOutput` | `[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html)` |
| `uint32_t` | `maxTransformFeedbackStreams` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `uint32_t` | `maxTransformFeedbackBuffers` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `VkDeviceSize` | `maxTransformFeedbackBufferSize` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `uint32_t` | `maxTransformFeedbackStreamDataSize` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `uint32_t` | `maxTransformFeedbackBufferDataSize` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `uint32_t` | `maxTransformFeedbackBufferDataStride` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `VkBool32` | `transformFeedbackQueries` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `VkBool32` | `transformFeedbackStreamsLinesTriangles` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `VkBool32` | `transformFeedbackRasterizationStreamSelect` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| `VkBool32` | `transformFeedbackDraw` | `[VK_EXT_transform_feedback](VK_EXT_transform_feedback.html)` |
| [VkExtent2D](VkExtent2D.html) | `minFragmentDensityTexelSize` | `[fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) |
| [VkExtent2D](VkExtent2D.html) | `maxFragmentDensityTexelSize` | `[fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) |
| `VkBool32` | `fragmentDensityInvocations` | `[fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) |
| `VkBool32` | `subsampledLoads` | `[VK_EXT_fragment_density_map2](VK_EXT_fragment_density_map2.html)` |
| `VkBool32` | `subsampledCoarseReconstructionEarlyAccess` | `[VK_EXT_fragment_density_map2](VK_EXT_fragment_density_map2.html)` |
| `uint32_t` | `maxSubsampledArrayLayers` | `[VK_EXT_fragment_density_map2](VK_EXT_fragment_density_map2.html)` |
| `uint32_t` | `maxDescriptorSetSubsampledSamplers` | `[VK_EXT_fragment_density_map2](VK_EXT_fragment_density_map2.html)` |
| [VkExtent2D](VkExtent2D.html) | `fragmentDensityOffsetGranularity` | `[fragmentDensityMapOffset`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapOffset) |
| `uint32_t` | `maxFragmentDensityMapLayers` | `[fragmentDensityMapLayered`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapLayered) |
| `uint32_t` | `maxGeometryCount` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`, `[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` |
| `uint32_t` | `maxInstanceCount` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`, `[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` |
| `uint32_t` | `maxVerticesPerCluster` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `maxTrianglesPerCluster` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterScratchByteAlignment` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterByteAlignment` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterTemplateByteAlignment` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterBottomLevelByteAlignment` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterTemplateBoundsByteAlignment` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `maxClusterGeometryIndex` | `[clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `shaderGroupHandleSize` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`, `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `maxShaderGroupStride` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`, `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `shaderGroupBaseAlignment` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`, `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `maxRecursionDepth` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)` |
| `uint32_t` | `maxTriangleCount` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)` |
| `uint32_t` | `maxPerStageDescriptorAccelerationStructures` | `[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindAccelerationStructures` | `[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` |
| `uint32_t` | `maxDescriptorSetAccelerationStructures` | `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`, `[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindAccelerationStructures` | `[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` |
| `uint32_t` | `minAccelerationStructureScratchOffsetAlignment` | `[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html)` |
| `uint32_t` | `maxRayRecursionDepth` | `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `shaderGroupHandleCaptureReplaySize` | `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `maxRayDispatchInvocationCount` | `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `shaderGroupHandleAlignment` | `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `maxRayHitAttributeSize` | `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)` |
| `uint32_t` | `maxPartitionCount` | `[partitionedAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-partitionedAccelerationStructure) |
| `uint64_t` | `maxTimelineSemaphoreValueDifference` | `[timelineSemaphore`](../../../../spec/latest/chapters/features.html#features-timelineSemaphore) |
| `uint32_t` | `lineSubPixelPrecisionBits` | Vulkan 1.4, [VK_KHR_line_rasterization](VK_KHR_line_rasterization.html), [VK_EXT_line_rasterization](VK_EXT_line_rasterization.html) |
| `uint32_t` | `maxCustomBorderColorSamplers` | `[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html)` |
| `VkDeviceSize` | `robustStorageBufferAccessSizeAlignment` | `[VK_EXT_robustness2](VK_EXT_robustness2.html)`, `[VK_KHR_robustness2](VK_KHR_robustness2.html)` |
| `VkDeviceSize` | `robustUniformBufferAccessSizeAlignment` | `[VK_EXT_robustness2](VK_EXT_robustness2.html)`, `[VK_KHR_robustness2](VK_KHR_robustness2.html)` |
| 2 × `uint32_t` | `minFragmentShadingRateAttachmentTexelSize` | `[attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) |
| 2 × `uint32_t` | `maxFragmentShadingRateAttachmentTexelSize` | `[attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) |
| `uint32_t` | `maxFragmentShadingRateAttachmentTexelSizeAspectRatio` | `[attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) |
| `VkBool32` | `primitiveFragmentShadingRateWithMultipleViewports` | `[primitiveFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-primitiveFragmentShadingRate) |
| `VkBool32` | `layeredShadingRateAttachments` | `[attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateNonTrivialCombinerOps` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| 2 × `uint32_t` | `maxFragmentSize` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `uint32_t` | `maxFragmentSizeAspectRatio` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `uint32_t` | `maxFragmentShadingRateCoverageSamples` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| [VkSampleCountFlagBits](VkSampleCountFlagBits.html) | `maxFragmentShadingRateRasterizationSamples` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithShaderDepthStencilWrites` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithSampleMask` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithShaderSampleMask` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithConservativeRasterization` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithFragmentShaderInterlock` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithCustomSampleLocations` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateStrictMultiplyCombiner` | `[pipelineFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-pipelineFragmentShadingRate) |
| [VkSampleCountFlagBits](VkSampleCountFlagBits.html) | `maxFragmentShadingRateInvocationCount` | `[supersampleFragmentShadingRates`](../../../../spec/latest/chapters/features.html#features-supersampleFragmentShadingRates) |
| `VkBool32` | `combinedImageSamplerDescriptorSingleArray` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkBool32` | `bufferlessPushDescriptors` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkBool32` | `allowSamplerImageViewPostSubmitCreation` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `descriptorBufferOffsetAlignment` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxDescriptorBufferBindings` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxResourceDescriptorBufferBindings` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxSamplerDescriptorBufferBindings` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxEmbeddedImmutableSamplerBindings` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxEmbeddedImmutableSamplers` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `bufferCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `imageCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `imageViewCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `samplerCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `accelerationStructureCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `samplerDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `combinedImageSamplerDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `sampledImageDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `storageImageDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `uniformTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustUniformTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `storageTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustStorageTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `uniformBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustUniformBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `storageBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustStorageBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `inputAttachmentDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `accelerationStructureDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `maxSamplerDescriptorBufferRange` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `maxResourceDescriptorBufferRange` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `samplerDescriptorBufferAddressSpaceSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `resourceDescriptorBufferAddressSpaceSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `descriptorBufferAddressSpaceSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `combinedImageSamplerDensityMapDescriptorSize` | `[VK_EXT_descriptor_buffer](../../../../spec/latest/appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxSubpassShadingWorkgroupSizeAspectRatio` | `[subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) |
| `VkBool32` | `graphicsPipelineLibraryFastLinking` | `[graphicsPipelineLibrary`](../../../../spec/latest/chapters/features.html#features-graphicsPipelineLibrary) |
| `VkBool32` | `graphicsPipelineLibraryIndependentInterpolationDecoration` | `[graphicsPipelineLibrary`](../../../../spec/latest/chapters/features.html#features-graphicsPipelineLibrary) |
| `VkBool32` | `triStripVertexOrderIndependentOfProvokingVertex` | - |
| `uint32_t` | `maxWeightFilterPhases` | `[textureSampleWeighted`](../../../../spec/latest/chapters/features.html#features-textureSampleWeighted) |
| 2 × `uint32_t` | `maxWeightFilterDimension` | `[textureSampleWeighted`](../../../../spec/latest/chapters/features.html#features-textureSampleWeighted) |
| 2 × `uint32_t` | `maxBlockMatchRegion` | `[textureBlockMatch`](../../../../spec/latest/chapters/features.html#features-textureBlockMatch) |
| 2 × `uint32_t` | `maxBoxFilterBlockSize` | `[textureBoxFilter`](../../../../spec/latest/chapters/features.html#features-textureBoxFilter) |
| `VkBool32` | `dynamicPrimitiveTopologyUnrestricted` | `[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html)` |
| `uint32_t` | `maxOpacity2StateSubdivisionLevel` | `[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)` |
| `uint32_t` | `maxOpacity4StateSubdivisionLevel` | `[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html)` |
| `uint64_t` | `maxDecompressionIndirectCount` | `[VK_NV_memory_decompression](VK_NV_memory_decompression.html)`, `[VK_EXT_memory_decompression](VK_EXT_memory_decompression.html)` |
| 3 × `uint32_t` | `maxWorkGroupCount` | `[VK_HUAWEI_cluster_culling_shader](VK_HUAWEI_cluster_culling_shader.html)` |
| 3 × `uint32_t` | `maxWorkGroupSize` | `[VK_HUAWEI_cluster_culling_shader](VK_HUAWEI_cluster_culling_shader.html)` |
| `uint32_t` | `maxOutputClusterCount` | `[VK_HUAWEI_cluster_culling_shader](VK_HUAWEI_cluster_culling_shader.html)` |
| `VkDeviceSize` | `indirectBufferOffsetAlignment` | `[VK_HUAWEI_cluster_culling_shader](VK_HUAWEI_cluster_culling_shader.html)` |
| `uint32_t` | `maxExecutionGraphDepth` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphShaderOutputNodes` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphShaderPayloadSize` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphShaderPayloadCount` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| `uint32_t` | `executionGraphDispatchAddressAlignment` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphVertexBufferBindings` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| 3 × `uint32_t` | `maxExecutionGraphWorkgroupCount` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphWorkgroups` | `[shaderEnqueue`](../../../../spec/latest/chapters/features.html#features-shaderEnqueue) |
| `uint32_t` | `maxIndirectShaderObjectCount` | `[shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) |
| `VkDeviceSize` | `extendedSparseAddressSpaceSize` | `sparseBinding`, `[extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) |
| `uint32_t` | `supportedImageAlignmentMask` | `[imageAlignmentControl`](../../../../spec/latest/chapters/features.html#features-imageAlignmentControl) |
| `VkBool32` | `separateDepthStencilAttachmentAccess` | [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetTotalUniformBuffersDynamic` | `[maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetTotalStorageBuffersDynamic` | `[maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetTotalBuffersDynamic` | `[maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic` | `[maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic` | `[maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindTotalBuffersDynamic` | `[maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) |
| `uint32_t` | `cooperativeMatrixWorkgroupScopeMaxWorkgroupSize` | `[cooperativeMatrixWorkgroupScope`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixWorkgroupScope) |
| `uint32_t` | `cooperativeMatrixFlexibleDimensionsMaxDimension` | `[cooperativeMatrixFlexibleDimensions`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixFlexibleDimensions) |
| `uint32_t` | `cooperativeMatrixWorkgroupScopeReservedSharedMemory` | `[cooperativeMatrixWorkgroupScope`](../../../../spec/latest/chapters/features.html#features-cooperativeMatrixWorkgroupScope) |
| `VkBool32` | `shaderSignedZeroInfNanPreserveFloat16` | `[shaderFloat16`](../../../../spec/latest/chapters/features.html#features-shaderFloat16) |
| `VkBool32` | `cooperativeVectorTrainingFloat16Accumulation` | - |
| `VkBool32` | `cooperativeVectorTrainingFloat32Accumulation` | - |
| `uint32_t` | `maxApronSize` | `[tileShadingApron`](../../../../spec/latest/chapters/features.html#features-tileShadingApron) |
| `VkBool32` | `preferNonCoherent` | `[tileShading`](../../../../spec/latest/chapters/features.html#features-tileShading) |
| 2 × `uint32_t` | `tileGranularity` | `[tileShading`](../../../../spec/latest/chapters/features.html#features-tileShading) |
| 2 × `uint32_t` | `maxTileShadingRate` | `[tileShadingDispatchTile`](../../../../spec/latest/chapters/features.html#features-tileShadingDispatchTile) |
| `uint32_t` | `maxShaderBindingTableRecordIndex` | `[VK_EXT_ray_tracing_invocation_reorder](VK_EXT_ray_tracing_invocation_reorder.html)` |
| `VkBool32` | `resolveSrgbFormatAppliesTransferFunction` | `[maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) |
| `VkBool32` | `resolveSrgbFormatSupportsTransferFunctionControl` | `[maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) |
| `VkDeviceSize` | `samplerHeapAlignment` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `resourceHeapAlignment` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `maxSamplerHeapSize` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `maxResourceHeapSize` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `minSamplerHeapReservedRange` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `minSamplerHeapReservedRangeWithEmbedded` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `minResourceHeapReservedRange` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `samplerDescriptorSize` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `imageDescriptorSize` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `bufferDescriptorSize` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `samplerDescriptorAlignment` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `imageDescriptorAlignment` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `bufferDescriptorAlignment` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `VkDeviceSize` | `maxPushDataSize` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `size_t` | `imageCaptureReplayOpaqueDataSize` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `uint32_t` | `maxDescriptorHeapEmbeddedSamplers` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `uint32_t` | `samplerYcbcrConversionCount` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `uint32_t` | `sparseDescriptorHeaps` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `uint32_t` | `protectedDescriptorHeaps` | [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) |
| `uint32_t` | `numMetrics` | [`shaderInstrumentation`](../../../../spec/latest/chapters/features.html#features-shaderInstrumentation) |
| `VkBool32` | `perBasicBlockGranularity` | [`shaderInstrumentation`](../../../../spec/latest/chapters/features.html#features-shaderInstrumentation) |

| Limit | Unsupported Limit | Supported Limit | Limit Type1 |
| --- | --- | --- | --- |
| `maxImageDimension1D` | - | 4096 (Vulkan Core)

                                                   8192 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxImageDimension2D` | - | 4096 (Vulkan Core)

                                                   8192 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxImageDimension3D` | - | 256 (Vulkan Core)

                                                   512 (Vulkan 1.4) | min |
| `maxImageDimensionCube` | - | 4096 (Vulkan Core)

                                                   8192 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxImageArrayLayers` | - | 256 (Vulkan Core)

                                                   2048 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxTexelBufferElements` | - | 65536 | min |
| `maxUniformBufferRange` | - | 16384 (Vulkan Core)

                                                   65536 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxStorageBufferRange` | - | 227 | min |
| `maxPushConstantsSize` | - | 128 (Vulkan Core)

                                                   256 (Vulkan 1.4) | min |
| `maxMemoryAllocationCount` | - | 4096 | min |
| `maxSamplerAllocationCount` | - | 4000 | min |
| `bufferImageGranularity` | - | 131072 (Vulkan Core)

                                                   4096 (Vulkan Roadmap 2022, Vulkan 1.4) | max |
| `sparseAddressSpaceSize` | 0 | 231 | min |
| `maxBoundDescriptorSets` | - | 4 (Vulkan Core)

                                                   7 (Vulkan Roadmap 2024, Vulkan 1.4) | min |
| `maxPerStageDescriptorSamplers` | - | 16 (Vulkan Core)

                                                   64 (Vulkan Roadmap 2022) | min |
| `maxPerStageDescriptorUniformBuffers` | - | 12 (Vulkan Core)

                                                   15 (Vulkan Roadmap 2022, Vulkan 1.4)

                                                   200 (Vulkan Roadmap 2026) | min |
| `maxPerStageDescriptorStorageBuffers` | - | 4 (Vulkan Core)

                                                   30 (Vulkan Roadmap 2022)

                                                   200 (Vulkan Roadmap 2026) | min |
| `maxPerStageDescriptorSampledImages` | - | 16 (Vulkan Core)

                                                   200 (Vulkan Roadmap 2022) | min |
| `maxPerStageDescriptorStorageImages` | - | 4 (Vulkan Core)

                                                   144 (Vulkan Roadmap 2022) | min |
| `maxPerStageDescriptorInputAttachments` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `maxPerStageResources` | - | 128 2 (Vulkan Core)

                                                   200 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxDescriptorSetSamplers` | - | 96 8 (Vulkan Core)

                                                   576 (Vulkan Roadmap 2022) | min, *n* × PerStage |
| `maxDescriptorSetUniformBuffers` | - | 72 8 (Vulkan Core)

                                                   90 (Vulkan Roadmap 2022, Vulkan 1.4)

                                                   1800 (Vulkan Roadmap 2026) | min, *n* × PerStage |
| `maxDescriptorSetUniformBuffersDynamic` | - | 8 | min |
| `maxDescriptorSetStorageBuffers` | - | 24 8 (Vulkan Core)

                                                   96 (Vulkan Roadmap 2022, Vulkan 1.4)

                                                   1800 (Vulkan Roadmap 2026) | min, *n* × PerStage |
| `maxDescriptorSetStorageBuffersDynamic` | - | 4 | min |
| `maxDescriptorSetTotalUniformBuffersDynamic` | - | `maxDescriptorSetUniformBuffersDynamic` | min |
| `maxDescriptorSetTotalStorageBuffersDynamic` | - | `maxDescriptorSetStorageBuffersDynamic` | min |
| `maxDescriptorSetTotalBuffersDynamic` | - | `maxDescriptorSetUniformBuffersDynamic` +  `maxDescriptorSetStorageBuffersDynamic` | min |
| `maxDescriptorSetSampledImages` | - | 96 8 (Vulkan Core)

                                                   1800 (Vulkan Roadmap 2022) | min, *n* × PerStage |
| `maxDescriptorSetStorageImages` | - | 24 8 (Vulkan Core)

                                                   144 (Vulkan Roadmap 2022, Vulkan 1.4) | min, *n* × PerStage |
| `maxDescriptorSetInputAttachments` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `maxVertexInputAttributes` | - | 16 | min |
| `maxVertexInputBindings` | - | 16 10 | min |
| `maxVertexInputAttributeOffset` | - | 2047 | min |
| `maxVertexInputBindingStride` | - | 2048 | min |
| `maxVertexOutputComponents` | - | 64

                                                   124 (Vulkan Roadmap 2026) | min |
| `maxTessellationGenerationLevel` | 0 | 64 | min |
| `maxTessellationPatchSize` | 0 | 32 | min |
| `maxTessellationControlPerVertexInputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxTessellationControlPerVertexOutputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxTessellationControlPerPatchOutputComponents` | 0 | 120 | min |
| `maxTessellationControlTotalOutputComponents` | 0 | 2048

                                                              4096 (Vulkan Roadmap 2026) | min |
| `maxTessellationEvaluationInputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxTessellationEvaluationOutputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxGeometryShaderInvocations` | 0 | 32 | min |
| `maxGeometryInputComponents` | 0 | 64 | min |
| `maxGeometryOutputComponents` | 0 | 64

                                                   128 (Vulkan Roadmap 2026) | min |
| `maxGeometryOutputVertices` | 0 | 256 | min |
| `maxGeometryTotalOutputComponents` | 0 | 1024 | min |
| `maxFragmentInputComponents` | - | 64

                                                   112 (Vulkan Roadmap 2026) | min |
| `maxFragmentOutputAttachments` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `maxFragmentDualSrcAttachments` | 0 | 1 | min |
| `maxFragmentCombinedOutputResources` | - | 4 (Vulkan Core)

                                                   16 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxComputeSharedMemorySize` | - | 16384

                                                   32768 (Vulkan Roadmap 2026) | min |
| `maxComputeWorkGroupCount` | - | (65535,65535,65535) | min |
| `maxComputeWorkGroupInvocations` | - | 128 (Vulkan Core)

                                                   256 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxComputeWorkGroupSize` | - | (128,128,64) (Vulkan Core)

                                                   (256,256,64) (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `subgroupSize` | - | 1/4 (Vulkan Core)

                                                   4 (Vulkan Roadmap 2022) | min |
| `subgroupSupportedStages` | - | [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) (Vulkan Core)

                                                   [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) \|

                                                   [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html) (Vulkan Roadmap 2022) | bitfield |
| `subgroupSupportedOperations` | - | [VK_SUBGROUP_FEATURE_BASIC_BIT](VkSubgroupFeatureFlagBits.html) (Vulkan Core)

                                                   [VK_SUBGROUP_FEATURE_BASIC_BIT](VkSubgroupFeatureFlagBits.html) \|

                                                   [VK_SUBGROUP_FEATURE_VOTE_BIT](VkSubgroupFeatureFlagBits.html) \|

                                                   [VK_SUBGROUP_FEATURE_ARITHMETIC_BIT](VkSubgroupFeatureFlagBits.html) \|

                                                   [VK_SUBGROUP_FEATURE_BALLOT_BIT](VkSubgroupFeatureFlagBits.html) \|

                                                   [VK_SUBGROUP_FEATURE_SHUFFLE_BIT](VkSubgroupFeatureFlagBits.html) \|

                                                   [VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT](VkSubgroupFeatureFlagBits.html) \|

                                                   [VK_SUBGROUP_FEATURE_QUAD_BIT](VkSubgroupFeatureFlagBits.html) (Vulkan Roadmap 2022) | bitfield |
| `shaderSignedZeroInfNanPreserveFloat16` | - | - (Vulkan Core)

                                                    [VK_TRUE](VK_TRUE.html) (Vulkan Roadmap 2022, Vulkan 1.4) | Boolean |
| `shaderSignedZeroInfNanPreserveFloat32` | - | - (Vulkan Core)

                                                    [VK_TRUE](VK_TRUE.html) (Vulkan Roadmap 2022, Vulkan 1.4) | Boolean |
| `shaderRoundingModeRTEFloat16` | - | [VK_FALSE](VK_FALSE.html) (Vulkan Core)

                                                    [VK_TRUE](VK_TRUE.html) (Vulkan Roadmap 2024) | Boolean |
| `shaderRoundingModeRTEFloat32` | - | [VK_FALSE](VK_FALSE.html) (Vulkan Core)

                                                    [VK_TRUE](VK_TRUE.html) (Vulkan Roadmap 2024) | Boolean |
| `maxSubgroupSize` | - | - (Vulkan Core)

                                                   4 (Vulkan Roadmap 2022) | min |
| `subPixelPrecisionBits` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `subTexelPrecisionBits` | - | 4 (Vulkan Core)

                                                   8 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `mipmapPrecisionBits` | - | 4 (Vulkan Core)

                                                   6 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxDrawIndexedIndexValue` | 224-1 | 232-1 | min |
| `maxDrawIndirectCount` | 1 | 216-1 | min |
| `maxSamplerLodBias` | - | 2 (Vulkan Core)

                                                   14 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxSamplerAnisotropy` | 1 | 16 | min |
| `maxViewports` | 1 | 16 | min |
| `maxViewportDimensions` 3 | - | (4096,4096) (Vulkan Core)

                                                   (7680,7680) (Vulkan 1.4)

                                                   (8192,8192) (Vulkan Roadmap 2026) | min |
| `viewportBoundsRange` 4 | - | (-8192,8191) (Vulkan Core)

                                                   (-15360,15359) (Vulkan 1.4) | (max,min) |
| `viewportSubPixelBits` | - | 0 | min |
| `minMemoryMapAlignment` | - | 64 | min |
| `minTexelBufferOffsetAlignment` | - | 256 | max |
| `minUniformBufferOffsetAlignment` | - | 256 | max |
| `minStorageBufferOffsetAlignment` | - | 256 | max |
| `minTexelOffset` | - | -8 | max |
| `maxTexelOffset` | - | 7 | min |
| `minTexelGatherOffset` | 0 | -8 | max |
| `maxTexelGatherOffset` | 0 | 7 | min |
| `minInterpolationOffset` | 0.0 | -0.5 5 | max |
| `maxInterpolationOffset` | 0.0 | 0.5 - (1 ULP) 5 | min |
| `subPixelInterpolationOffsetBits` | 0 | 4 5 | min |
| `maxFramebufferWidth` | - | 4096 (Vulkan Core)

                                                   7680 (Vulkan 1.4)

                                                   8192 (Vulkan Roadmap 2026) | min |
| `maxFramebufferHeight` | - | 4096 (Vulkan Core)

                                                   7680 (Vulkan 1.4)

                                                   8192 (Vulkan Roadmap 2026) | min |
| `maxFramebufferLayers` | - | 256 | min |
| `framebufferColorSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `framebufferIntegerColorSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)) | min |
| `framebufferDepthSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `framebufferStencilSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `framebufferNoAttachmentsSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `maxColorAttachments` | - | 4 (Vulkan Core)

                                                   7 (Vulkan Roadmap 2022)

                                                   8 (Vulkan Roadmap 2024, Vulkan 1.4) | min |
| `sampledImageColorSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `sampledImageIntegerSampleCounts` | - | [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) | min |
| `sampledImageDepthSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `sampledImageStencilSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `storageImageSampleCounts` | [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) | ([VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) \| [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html)) | min |
| `maxSampleMaskWords` | - | 1 | min |
| `timestampComputeAndGraphics` | - | - (Vulkan Core)

                                                   [VK_TRUE](VK_TRUE.html) (Vulkan Roadmap 2024, Vulkan 1.4) | Boolean |
| `timestampPeriod` | - | - | duration |
| `maxClipDistances` | 0 | 8 | min |
| `maxCullDistances` | 0 | 8 | min |
| `maxCombinedClipAndCullDistances` | 0 | 8 | min |
| `discreteQueuePriorities` | - | 2 | min |
| `pointSizeRange` | (1.0,1.0) | (1.0,64.0 - ULP) 6 (Vulkan Core)

                                                           (1.0,256.0 - `pointSizeGranularity`) (Vulkan 1.4) | (max,min) |
| `lineWidthRange` | (1.0,1.0) | (1.0,8.0 - ULP) 7 | (max,min) |
| `pointSizeGranularity` | 0.0 | 1.0 6 (Vulkan Core)

                                                      0.125 (Vulkan Roadmap 2022, Vulkan 1.4) | max, fixed point increment |
| `lineWidthGranularity` | 0.0 | 1.0 7 (Vulkan Core)

                                                      0.5 (Vulkan Roadmap 2022, Vulkan 1.4) | max, fixed point increment |
| `strictLines` | - | - | implementation-dependent |
| `standardSampleLocations` | - | - (Vulkan Core)

                                                   [VK_TRUE](VK_TRUE.html) (Vulkan Roadmap 2022, Vulkan 1.4) | Boolean |
| `optimalBufferCopyOffsetAlignment` | - | - | recommendation |
| `optimalBufferCopyRowPitchAlignment` | - | - | recommendation |
| `nonCoherentAtomSize` | - | 256 | max |
| `maxPushDescriptors` | - | 32 | min |
| `maxMultiviewViewCount` | - | 6 | min |
| `maxMultiviewInstanceIndex` | - | 227-1 | min |
| `maxDiscardRectangles` | 0 | 4 | min |
| `sampleLocationSampleCounts` | - | [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html) | min |
| `maxSampleLocationGridSize` | - | (1,1) | min |
| `sampleLocationCoordinateRange` | - | (0.0, 0.9375) | (max,min) |
| `sampleLocationSubPixelBits` | - | 4 | min |
| `variableSampleLocations` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `nativeUnalignedPerformance` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `minImportedHostPointerAlignment` | - | 65536 | max |
| `perViewPositionAllComponents` | - | - | implementation-dependent |
| `filterMinmaxSingleComponentFormats` | - | - | implementation-dependent |
| `filterMinmaxImageComponentMapping` | - | - | implementation-dependent |
| `advancedBlendMaxColorAttachments` | - | 1 | min |
| `advancedBlendIndependentBlend` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `advancedBlendNonPremultipliedSrcColor` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `advancedBlendNonPremultipliedDstColor` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `advancedBlendCorrelatedOverlap` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `advancedBlendAllOperations` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `maxPerSetDescriptors` | - | 1024 | min |
| `maxMemoryAllocationSize` | - | 230 | min |
| `maxBufferSize` | - | 230 | min |
| `primitiveOverestimationSize` | - | 0.0 | min |
| `maxExtraPrimitiveOverestimationSize` | - | 0.0 | min |
| `extraPrimitiveOverestimationSizeGranularity` | - | 0.0 | min |
| `primitiveUnderestimation` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `conservativePointAndLineRasterization` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `degenerateTrianglesRasterized` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `degenerateLinesRasterized` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fullyCoveredFragmentShaderInputVariable` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `conservativeRasterizationPostDepthCoverage` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `maxUpdateAfterBindDescriptorsInAllPools` | 0 | 500000 | min |
| `shaderUniformBufferArrayNonUniformIndexingNative` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `shaderSampledImageArrayNonUniformIndexingNative` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `shaderStorageBufferArrayNonUniformIndexingNative` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `shaderStorageImageArrayNonUniformIndexingNative` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `shaderInputAttachmentArrayNonUniformIndexingNative` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `maxPerStageDescriptorUpdateAfterBindSamplers` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindUniformBuffers` | 0 9 | 12 9 | min |
| `maxPerStageDescriptorUpdateAfterBindStorageBuffers` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindSampledImages` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindStorageImages` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindInputAttachments` | 0 9 | 4 9 (Vulkan Core)

                                                                     7 (Vulkan Roadmap 2022) | min |
| `maxPerStageUpdateAfterBindResources` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindSamplers` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindUniformBuffers` | 0 9 | 72 8 9 | min, *n* × PerStage |
| `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` | 0 9 | 8 9 | min |
| `maxDescriptorSetUpdateAfterBindStorageBuffers` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | 0 9 | 4 9 | min |
| `maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic` | 0 9 | `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` | min |
| `maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic` | 0 9 | `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | min |
| `maxDescriptorSetUpdateAfterBindTotalBuffersDynamic` | 0 9 | `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` +  `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | min |
| `maxDescriptorSetUpdateAfterBindSampledImages` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindStorageImages` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindInputAttachments` | 0 9 | 4 9 | min |
| `maxInlineUniformBlockSize` | - | 256 | min |
| `maxPerStageDescriptorInlineUniformBlocks` | - | 4 | min |
| `maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks` | - | 4 | min |
| `maxDescriptorSetInlineUniformBlocks` | - | 4 | min |
| `maxDescriptorSetUpdateAfterBindInlineUniformBlocks` | - | 4 | min |
| `maxInlineUniformTotalSize` | - | 256 | min |
| `maxVertexAttribDivisor` | - | 216-1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxDrawMeshTasksCount` | - | 216-1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskWorkGroupInvocations` | - | 32 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskWorkGroupSize` | - | (32,1,1) | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskTotalMemorySize` | - | 16384 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxTaskOutputCount` | - | 216-1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshWorkGroupInvocations` | - | 32 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshWorkGroupSize` | - | (32,1,1) | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshTotalMemorySize` | - | 16384 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshOutputVertices` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshOutputPrimitives` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`maxMeshMultiviewViewCount` | - | 1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`meshOutputPerVertexGranularity` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesNV](VkPhysicalDeviceMeshShaderPropertiesNV.html)::`meshOutputPerPrimitiveGranularity` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupTotalCount` | - | 2^22 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupCount` | - | (65535,65535,65535) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupInvocations` | - | 128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskWorkGroupSize` | - | (128,128,128) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskPayloadSize` | - | 16384 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskSharedMemorySize` | - | 32768 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxTaskPayloadAndSharedMemorySize` | - | 32768 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupTotalCount` | - | 2^22 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupCount` | - | (65535,65535,65535) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupInvocations` | - | 128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshWorkGroupSize` | - | (128,128,128) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshSharedMemorySize` | - | 28672 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshPayloadAndSharedMemorySize` | - | 28672 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputMemorySize` | - | 32768 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshPayloadAndOutputMemorySize` | - | 48128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputComponents` | - | 128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputVertices` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputPrimitives` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshOutputLayers` | - | 8 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxMeshMultiviewViewCount` | - | 1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`meshOutputPerVertexGranularity` | 0 | 32 | max |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`meshOutputPerPrimitiveGranularity` | 0 | 32 | max |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxPreferredTaskWorkGroupInvocations` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`maxPreferredMeshWorkGroupInvocations` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersLocalInvocationVertexOutput` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersLocalInvocationPrimitiveOutput` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersCompactVertexOutput` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](VkPhysicalDeviceMeshShaderPropertiesEXT.html)::`prefersCompactPrimitiveOutput` | - | - | implementation-dependent |
| `maxTransformFeedbackStreams` | - | 1 | min |
| `maxTransformFeedbackBuffers` | - | 1 | min |
| `maxTransformFeedbackBufferSize` | - | 227 | min |
| `maxTransformFeedbackStreamDataSize` | - | 512 | min |
| `maxTransformFeedbackBufferDataSize` | - | 512 | min |
| `maxTransformFeedbackBufferDataStride` | - | 512 | min |
| `transformFeedbackQueries` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `transformFeedbackStreamsLinesTriangles` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `transformFeedbackRasterizationStreamSelect` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `transformFeedbackDraw` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `minFragmentDensityTexelSize` | - | (1,1) | min |
| `maxFragmentDensityTexelSize` | - | (1,1) | min |
| `fragmentDensityInvocations` | - | - | implementation-dependent |
| `subsampledLoads` | [VK_TRUE](VK_TRUE.html) | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `subsampledCoarseReconstructionEarlyAccess` | [VK_FALSE](VK_FALSE.html) | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `maxSubsampledArrayLayers` | 2 | 2 | min |
| `maxDescriptorSetSubsampledSamplers` | 1 | 1 | min |
| `fragmentDensityOffsetGranularity` | - | (1024,1024) | max |
| `maxFragmentDensityMapLayers` | - | (2) | max |
| [VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`shaderGroupHandleSize` | - | 16 | min |
| [VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`maxRecursionDepth` | - | 31 | min |
| [VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)::`shaderGroupHandleSize` | - | 32 | exact |
| [VkPhysicalDeviceRayTracingPipelinePropertiesKHR](VkPhysicalDeviceRayTracingPipelinePropertiesKHR.html)::`maxRayRecursionDepth` | - | 1 | min |
| `maxShaderGroupStride` | - | 4096 | min |
| `shaderGroupBaseAlignment` | - | 64 | max |
| `maxGeometryCount` | - | 224-1 | min |
| `maxInstanceCount` | - | 224-1 | min |
| `maxTriangleCount` | - | 229-1 | min |
| `maxPrimitiveCount` | - | 229-1 | min |
| `maxPerStageDescriptorAccelerationStructures` | - | 16 | min |
| `maxPerStageDescriptorUpdateAfterBindAccelerationStructures` | - | 500000 9 | min |
| `maxVerticesPerCluster` | - | 256 | min |
| `maxTrianglesPerCluster` | - | 256 | min |
| `clusterScratchByteAlignment` | - | 256 | max |
| `clusterByteAlignment` | - | 128 | max |
| `clusterTemplateByteAlignment` | - | 32 | max |
| `clusterBottomLevelByteAlignment` | - | 256 | max |
| `clusterTemplateBoundsByteAlignment` | - | 32 | max |
| `maxClusterGeometryIndex` | - | 224-1 | min |
| `maxDescriptorSetAccelerationStructures` | - | 16 | min |
| `maxDescriptorSetUpdateAfterBindAccelerationStructures` | - | 500000 9 | min |
| `minAccelerationStructureScratchOffsetAlignment` | - | 256 | max |
| `shaderGroupHandleCaptureReplaySize` | - | 64 | max |
| `maxRayDispatchInvocationCount` | - | 230 | min |
| `shaderGroupHandleAlignment` | - | 32 | max |
| `maxRayHitAttributeSize` | - | 32 | min |
| `maxPartitionCount` | - | 224-1 | min |
| `maxTimelineSemaphoreValueDifference` | - | 231-1 | min |
| `lineSubPixelPrecisionBits` | - | 4 | min |
| `maxGraphicsShaderGroupCount` | - | 212 | min |
| `maxIndirectCommandsStreamCount` +  (for NV extension) | - | 212 | min |
| `maxIndirectCommandsStreamStride` | - | 2048 | min |
| `minIndirectCommandsBufferOffsetAlignment` | - | 256 | max |
| `minSequencesCountBufferOffsetAlignment` | - | 256 | max |
| `minSequencesIndexBufferOffsetAlignment` | - | 256 | max |
| `maxIndirectSequenceCount` | - | 220 | min |
| `maxIndirectCommandsTokenCount` | - | 16 | min |
| `maxIndirectCommandsTokenOffset` | - | 2047 | min |
| `maxIndirectPipelineCount` | - | 212 | min |
| `deviceGeneratedCommandsTransformFeedback` | - | false | implementation-dependent |
| `deviceGeneratedCommandsMultiDrawIndirectCount` | - | false | implementation-dependent |
| `maxIndirectShaderObjectCount` | 0 | 212 | implementation-dependent |
| `maxIndirectCommandsIndirectStride` | - | 2048 | min |
| `supportedIndirectCommandsInputModes` | - | [VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT](VkIndirectCommandsInputModeFlagBitsEXT.html) | min |
| `supportedIndirectCommandsShaderStages` | - | ([VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) \| [VK_SHADER_STAGE_VERTEX_BIT](VkShaderStageFlagBits.html) \| [VK_SHADER_STAGE_FRAGMENT_BIT](VkShaderStageFlagBits.html)) | min |
| `supportedIndirectCommandsShaderStagesPipelineBinding` | - | 0 | min |
| `supportedIndirectCommandsShaderStagesShaderBinding` | - | 0 | min |
| `maxCustomBorderColorSamplers` | - | 32 | min |
| `robustStorageBufferAccessSizeAlignment` | - | 4 | max |
| `robustUniformBufferAccessSizeAlignment` | - | 256 | max |
| `minFragmentShadingRateAttachmentTexelSize` | (0,0) | (32,32) | max |
| `maxFragmentShadingRateAttachmentTexelSize` | (0,0) | (8,8) | min |
| `maxFragmentShadingRateAttachmentTexelSizeAspectRatio` | 0 | 1 | min |
| `primitiveFragmentShadingRateWithMultipleViewports` | [VK_FALSE](VK_FALSE.html) | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `layeredShadingRateAttachments` | [VK_FALSE](VK_FALSE.html) | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fragmentShadingRateNonTrivialCombinerOps` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `maxFragmentSize` | - | (2,2) | min |
| `maxFragmentSizeAspectRatio` | - | 2 | min |
| `maxFragmentShadingRateCoverageSamples` | - | 16 | min |
| `maxFragmentShadingRateRasterizationSamples` | - | [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html) | min |
| `fragmentShadingRateWithShaderDepthStencilWrites` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fragmentShadingRateWithSampleMask` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fragmentShadingRateWithShaderSampleMask` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fragmentShadingRateWithConservativeRasterization` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fragmentShadingRateWithFragmentShaderInterlock` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fragmentShadingRateWithCustomSampleLocations` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `fragmentShadingRateStrictMultiplyCombiner` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `maxFragmentShadingRateInvocationCount` | - | [VK_SAMPLE_COUNT_4_BIT](VkSampleCountFlagBits.html) | min |
| `combinedImageSamplerDescriptorSingleArray` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `bufferlessPushDescriptors` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `allowSamplerImageViewPostSubmitCreation` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `descriptorBufferOffsetAlignment` | - | 256 | max |
| `maxDescriptorBufferBindings` | - | 3 | min |
| `maxResourceDescriptorBufferBindings` | - | 1 | min |
| `maxSamplerDescriptorBufferBindings` | - | 1 | min |
| `maxEmbeddedImmutableSamplerBindings` | - | 1 | min |
| `maxEmbeddedImmutableSamplers` | - | 2032 | min |
| `bufferCaptureReplayDescriptorDataSize` | - | 64 | max |
| `imageCaptureReplayDescriptorDataSize` | - | 64 | max |
| `imageViewCaptureReplayDescriptorDataSize` | - | 64 | max |
| `samplerCaptureReplayDescriptorDataSize` | - | 64 | max |
| `accelerationStructureCaptureReplayDescriptorDataSize` | - | 64 | max |
| `samplerDescriptorSize` | - | 256 | max |
| `combinedImageSamplerDescriptorSize` | - | 256 | max |
| `sampledImageDescriptorSize` | - | 256 | max |
| `storageImageDescriptorSize` | - | 256 | max |
| `uniformTexelBufferDescriptorSize` | - | 256 | max |
| `robustUniformTexelBufferDescriptorSize` | - | 256 | max |
| `storageTexelBufferDescriptorSize` | - | 256 | max |
| `robustStorageTexelBufferDescriptorSize` | - | 256 | max |
| `uniformBufferDescriptorSize` | - | 256 | max |
| `robustUniformBufferDescriptorSize` | - | 256 | max |
| `storageBufferDescriptorSize` | - | 256 | max |
| `robustStorageBufferDescriptorSize` | - | 256 | max |
| `inputAttachmentDescriptorSize` | - | 256 | max |
| `accelerationStructureDescriptorSize` | - | 256 | max |
| `maxSamplerDescriptorBufferRange` | - | 211 × `samplerDescriptorSize` | min |
| `maxResourceDescriptorBufferRange` | - | (220 - 215) × `maxResourceDescriptorSize` 12 | min |
| `samplerDescriptorBufferAddressSpaceSize` | - | 227 | min |
| `resourceDescriptorBufferAddressSpaceSize` | - | 227 | min |
| `descriptorBufferAddressSpaceSize` | - | 227 | min |
| `combinedImageSamplerDensityMapDescriptorSize` | - | 256 | max |
| `maxSubpassShadingWorkgroupSizeAspectRatio` | 0 | 1 | min |
| `maxMultiDrawCount` | - | 1024 | min |
| `maxCommandBufferNestingLevel` | - | 1 | min |
| `graphicsPipelineLibraryFastLinking` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `graphicsPipelineLibraryIndependentInterpolationDecoration` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `triStripVertexOrderIndependentOfProvokingVertex` | - | [VK_FALSE](VK_FALSE.html) | implementation-dependent |
| `maxWeightFilterPhases` | - | 1024 | min |
| `maxWeightFilterDimension` | - | (64,64) | min |
| `maxBlockMatchRegion` | - | (64,64) | min |
| `maxBoxFilterBlockSize` | - | (64,64) | min |
| `dynamicPrimitiveTopologyUnrestricted` | - | - | implementation-dependent |
| `maxOpacity2StateSubdivisionLevel` | - | 3 | min |
| `maxOpacity4StateSubdivisionLevel` | - | 3 | min |
| `maxDecompressionIndirectCount` | 1 | 216-1 | min |
| `maxWorkGroupCount` | - | (65536,1,1) | min |
| `maxWorkGroupSize` | - | (32,1,1) | min |
| `maxOutputClusterCount` | - | 1024 | min |
| `indirectBufferOffsetAlignment` | - | - | implementation-dependent |
| `maxExecutionGraphDepth` | - | 32 | min |
| `maxExecutionGraphShaderOutputNodes` | - | 256 | min |
| `maxExecutionGraphShaderPayloadSize` | - | 32768 | min |
| `maxExecutionGraphShaderPayloadCount` | - | 256 | min |
| `executionGraphDispatchAddressAlignment` | - | 4 | max |
| `maxExecutionGraphVertexBufferBindings` | - | 1024 | min |
| `maxExecutionGraphWorkgroupCount` | - | (65535,65535,65535) | min |
| `maxExecutionGraphWorkgroups` | - | 224-1 | min |
| `extendedSparseAddressSpaceSize` | 0 | `sparseAddressSpaceSize` | min |
| `renderPassStripeGranularity` | - | (64,64) | max |
| `maxRenderPassStripes` | - | 32 | min |
| `minPlacedMemoryMapAlignment` | - | 65536 | max |
| `supportedImageAlignmentMask` | - | 1 | min |
| `separateDepthStencilAttachmentAccess` | [VK_FALSE](VK_FALSE.html) | - | implementation-dependent |
| `cooperativeMatrixWorkgroupScopeMaxWorkgroupSize` | - | subgroupSize × 2 | min |
| `cooperativeMatrixFlexibleDimensionsMaxDimension` | - | 256 | min |
| `cooperativeMatrixWorkgroupScopeReservedSharedMemory` | - | `maxComputeSharedMemorySize` / 2 | max |
| `maxCooperativeVectorComponents` | - | 128 | min |
| `maxVectorComponents` | - | 1024 | min |
| `maxApronSize` | - | 1 | min |
| `preferNonCoherent` | - | - | implementation-dependent |
| `tileGranularity` | - | (16,16) | min |
| `maxTileShadingRate` | - | (8,8) | min |
| `maxTensorDimensionCount` | - | 4 | min |
| `maxTensorElements` | - | 65536 | min |
| `maxPerDimensionTensorElements` | - | 65536 | min |
| `maxTensorStride` | - | 65536 | min |
| `maxTensorSize` | - | 65536 | min |
| `maxTensorShaderAccessArrayLength` | - | 4 | min |
| `maxTensorShaderAccessSize` | - | 4 | min |
| `maxDescriptorSetStorageTensors` | - | 16 | min |
| `maxPerStageDescriptorSetStorageTensors` | - | 16 | min |
| `maxDescriptorSetUpdateAfterBindStorageTensors` | 0 | 500000 | min |
| `maxPerStageDescriptorUpdateAfterBindStorageTensors` | 0 | 500000 | min |
| `shaderTensorSupportedStages` | - | [VK_SHADER_STAGE_COMPUTE_BIT](VkShaderStageFlagBits.html) | bitfield |
| `maxShaderBindingTableRecordIndex` | - | 228-1 | min |
| `resolveSrgbFormatAppliesTransferFunction` | - | - | implementation-dependent |
| `resolveSrgbFormatSupportsTransferFunctionControl` | [VK_FALSE](VK_FALSE.html) | [VK_FALSE](VK_FALSE.html) | min |
| `samplerHeapAlignment` | - | 65536 | max |
| `resourceHeapAlignment` | - | 65536 | max |
| `maxSamplerHeapSize` | - | max(

                                                    4000 × `samplerDescriptorSize`
                                                    + `minSamplerHeapReservedRange`,

                                                    2048 × `samplerDescriptorSize`
                                                    + `minSamplerHeapReservedRangeWithEmbedded`) | min |
| `maxResourceHeapSize` | - | (220 - 215) × max(`imageDescriptorSize`,
                                                    `bufferDescriptorSize`)
                                                    + `minResourceHeapReservedRange` | min |
| `minSamplerHeapReservedRange` | - | 96 × `samplerDescriptorSize` | max |
| `minSamplerHeapReservedRangeWithEmbedded` | - | 2048 × `samplerDescriptorSize` | max |
| `minResourceHeapReservedRange` | - | 215 × max(`imageDescriptorSize`,
                                                       `bufferDescriptorSize`) | max |
| `samplerDescriptorSize` | - | 32 | max |
| `imageDescriptorSize` | - | 64 | max |
| `bufferDescriptorSize` | - | 128 | max |
| `samplerDescriptorAlignment` | - | 32 | max |
| `imageDescriptorAlignment` | - | 64 | max |
| `bufferDescriptorAlignment` | - | 128 | max |
| `maxPushDataSize` | - | 256 | min |
| `maxDescriptorHeapEmbeddedSamplers` | - | 2032 | min |
| `samplerYcbcrConversionCount` | - | 3 | max |
| `imageCaptureReplayOpaqueDataSize` | - | - | implementation-dependent |
| `numMetrics` | - | 1 | min |
| `perBasicBlockGranularity` | - | VK_FALSE | max |

1

The **Limit Type** column specifies the limit is either the minimum limit
all implementations **must** support, the maximum limit all implementations
**must** support, or the exact value all implementations **must** support.
For bitmasks a minimum limit is the least bits all implementations **must**
set, but they **may** have additional bits set beyond this minimum.

2

The `maxPerStageResources` **must** be at least the smallest of the
following:

* 
the sum of the `maxPerStageDescriptorUniformBuffers`,
`maxPerStageDescriptorStorageBuffers`,
`maxPerStageDescriptorSampledImages`,
`maxPerStageDescriptorStorageImages`,
`maxPerStageDescriptorInputAttachments`, `maxColorAttachments`
limits, or

* 
128.

It **may** not be possible to reach this limit in every stage.

3

See [`maxViewportDimensions`](../../../../spec/latest/chapters/limits.html#limits-maxViewportDimensions) for
the **required** relationship to other limits.

4

See [`viewportBoundsRange`](../../../../spec/latest/chapters/limits.html#limits-viewportboundsrange) for the
**required** relationship to other limits.

5

The values `minInterpolationOffset` and `maxInterpolationOffset`
describe the closed interval of supported interpolation offsets:
[`minInterpolationOffset`, `maxInterpolationOffset`].
The ULP is determined by `subPixelInterpolationOffsetBits`.
If `subPixelInterpolationOffsetBits` is 4, this provides increments
of (1/24) = 0.0625, and thus the range of supported interpolation
offsets would be [-0.5, 0.4375].

6

The point size ULP is determined by `pointSizeGranularity`.
If the `pointSizeGranularity` is 0.125, the range of supported point
sizes **must** be at least [1.0, 63.875].

7

The line width ULP is determined by `lineWidthGranularity`.
If the `lineWidthGranularity` is 0.0625, the range of supported line
widths **must** be at least [1.0, 7.9375].

8

The minimum `maxDescriptorSet*` limit is *n* times the corresponding
*specification* minimum `maxPerStageDescriptor*` limit, where *n* is
the number of shader stages supported by the [VkPhysicalDevice](VkPhysicalDevice.html).
If all shader stages are supported, *n* = 6 (vertex, tessellation
control, tessellation evaluation, geometry, fragment, compute).

9

The `UpdateAfterBind` descriptor limits **must** each be greater than
or equal to the corresponding `non`-UpdateAfterBind limit.

10

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, the
required minimum value of `maxVertexInputBindings` is `8`.

12

`maxResourceDescriptorSize` is defined as the maximum value of
`storageImageDescriptorSize`, `sampledImageDescriptorSize`,
`robustUniformTexelBufferDescriptorSize`,
`robustStorageTexelBufferDescriptorSize`,
`robustUniformBufferDescriptorSize`,
`robustStorageBufferDescriptorSize`,
`inputAttachmentDescriptorSize`, and
`accelerationStructureDescriptorSize`.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#limits-minmax).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
