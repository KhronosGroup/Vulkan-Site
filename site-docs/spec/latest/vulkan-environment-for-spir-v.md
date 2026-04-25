# Vulkan Environment for SPIR-V

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/appendices/spirvenv.html

## Table of Contents

- [Versions and Formats](#_versions_and_formats)
- [Versions_and_Formats](#_versions_and_formats)
- [Capabilities](#spirvenv-capabilities)
- [SPIR-V Extensions](#spirvenv-extensions)
- [Validation Rules Within a Module](#spirvenv-module-validation)
- [Validation_Rules_Within_a_Module](#spirvenv-module-validation)
- [Standalone SPIR-V Validation](#spirvenv-module-validation-standalone)
- [Standalone_SPIR-V_Validation](#spirvenv-module-validation-standalone)
- [Runtime SPIR-V Validation](#spirvenv-module-validation-runtime)
- [Runtime_SPIR-V_Validation](#spirvenv-module-validation-runtime)
- [Precision and Operation of SPIR-V Instructions](#spirvenv-precision-operation)
- [Precision_and_Operation_of_SPIR-V_Instructions](#spirvenv-precision-operation)
- [Evaluation of Expressions](#spirvenv-evaluation-expressions)
- [Evaluation_of_Expressions](#spirvenv-evaluation-expressions)
- [Precision of Individual Operations](#spirvenv-op-prec)
- [Precision_of_Individual_Operations](#spirvenv-op-prec)
- [Buffer Indexing Calculations](#spirvenv-buffer-indexing)
- [Buffer_Indexing_Calculations](#spirvenv-buffer-indexing)
- [64-Bit Indexing](#spirvenv-64bindexing)
- [Signedness of SPIR-V Image Accesses](#spirvenv-image-signedness)
- [Signedness_of_SPIR-V_Image_Accesses](#spirvenv-image-signedness)
- [Image Format and Type Matching](#spirvenv-format-type-matching)
- [Image_Format_and_Type_Matching](#spirvenv-format-type-matching)
- [Compatibility Between SPIR-V Image Dimensions and Vulkan ImageView Types](#spirvenv-image-dimensions)
- [Compatibility_Between_SPIR-V_Image_Dimensions_and_Vulkan_ImageView_Types](#spirvenv-image-dimensions)
- [Compatibility Between SPIR-V Image Formats and Vulkan Formats](#spirvenv-image-formats)
- [Compatibility_Between_SPIR-V_Image_Formats_and_Vulkan_Formats](#spirvenv-image-formats)
- [Ray Query Precision and Operation](#spirenv-ray-query-precision-operation)
- [Ray_Query_Precision_and_Operation](#spirenv-ray-query-precision-operation)
- [Compatibility Between SPIR-V Tensor Element Types And Vulkan Formats](#spirvenv-tensor-formats)
- [Compatibility_Between_SPIR-V_Tensor_Element_Types_And_Vulkan_Formats](#spirvenv-tensor-formats)

## Content

Shaders for Vulkan are defined by the [Khronos SPIR-V Specification](../chapters/introduction.html#spirv-spec) as well as the [Khronos SPIR-V Extended Instructions for GLSL](../chapters/introduction.html#spirv-extended) Specification.
This appendix defines additional SPIR-V requirements applying to Vulkan
shaders.

A Vulkan 1.4 implementation **must** support the 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, and 1.6 versions of
SPIR-V and the 1.0 version of the SPIR-V Extended Instructions for GLSL.

A SPIR-V module
passed into [vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule)
is interpreted as a series of 32-bit words in host endianness, with literal
strings packed as described in section 2.2 of the SPIR-V Specification.
The first few words of the SPIR-V module **must** be a magic number and a
SPIR-V version number, as described in section 2.3 of the SPIR-V
Specification.

The [table below](#spirvenv-capabilities-table) lists the set of SPIR-V
capabilities that **may** be supported in Vulkan implementations.
The application **must** not use any of these capabilities in SPIR-V passed to
[vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule) unless one of the following conditions is met for
the [VkDevice](../chapters/devsandqueues.html#VkDevice) specified in the `device` parameter of
[vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule):

* 
The corresponding field in the table is blank.

* 
Any corresponding Vulkan feature is enabled.

* 
Any corresponding Vulkan extension is enabled.

* 
Any corresponding Vulkan property is supported.

* 
The corresponding core version is supported (as returned by
[VkPhysicalDeviceProperties](../chapters/devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion`).

| SPIR-V `OpCapability`

                  Vulkan feature, extension, or core version |
| --- |
| `Matrix`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `Shader`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `InputAttachment`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `Sampled1D`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `Image1D`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `SampledBuffer`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `ImageBuffer`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `ImageQuery`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `DerivativeControl`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `Geometry`

                [`VkPhysicalDeviceFeatures`::`geometryShader`](../chapters/features.html#features-geometryShader) |
| `Tessellation`

                [`VkPhysicalDeviceFeatures`::`tessellationShader`](../chapters/features.html#features-tessellationShader) |
| `Float64`

                [`VkPhysicalDeviceFeatures`::`shaderFloat64`](../chapters/features.html#features-shaderFloat64) |
| `Int64`

                [`VkPhysicalDeviceFeatures`::`shaderInt64`](../chapters/features.html#features-shaderInt64) |
| `Int64Atomics`

                [`VkPhysicalDeviceVulkan12Features`::`shaderBufferInt64Atomics`](../chapters/features.html#features-shaderBufferInt64Atomics)

                [`VkPhysicalDeviceVulkan12Features`::`shaderSharedInt64Atomics`](../chapters/features.html#features-shaderSharedInt64Atomics)

                [`VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT`::`shaderImageInt64Atomics`](../chapters/features.html#features-shaderImageInt64Atomics) |
| `AtomicFloat16AddEXT`

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderBufferFloat16AtomicAdd`](../chapters/features.html#features-shaderBufferFloat16AtomicAdd)

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderSharedFloat16AtomicAdd`](../chapters/features.html#features-shaderSharedFloat16AtomicAdd) |
| `AtomicFloat32AddEXT`

                [`VkPhysicalDeviceShaderAtomicFloatFeaturesEXT`::`shaderBufferFloat32AtomicAdd`](../chapters/features.html#features-shaderBufferFloat32AtomicAdd)

                [`VkPhysicalDeviceShaderAtomicFloatFeaturesEXT`::`shaderSharedFloat32AtomicAdd`](../chapters/features.html#features-shaderSharedFloat32AtomicAdd)

                [`VkPhysicalDeviceShaderAtomicFloatFeaturesEXT`::`shaderImageFloat32AtomicAdd`](../chapters/features.html#features-shaderImageFloat32AtomicAdd) |
| `AtomicFloat64AddEXT`

                [`VkPhysicalDeviceShaderAtomicFloatFeaturesEXT`::`shaderBufferFloat64AtomicAdd`](../chapters/features.html#features-shaderBufferFloat64AtomicAdd)

                [`VkPhysicalDeviceShaderAtomicFloatFeaturesEXT`::`shaderSharedFloat64AtomicAdd`](../chapters/features.html#features-shaderSharedFloat64AtomicAdd) |
| `AtomicFloat16MinMaxEXT`

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderBufferFloat16AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax)

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderSharedFloat16AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat16AtomicMinMax) |
| `AtomicFloat32MinMaxEXT`

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderBufferFloat32AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat32AtomicMinMax)

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderSharedFloat32AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat32AtomicMinMax)

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderImageFloat32AtomicMinMax`](../chapters/features.html#features-shaderImageFloat32AtomicMinMax) |
| `AtomicFloat64MinMaxEXT`

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderBufferFloat64AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat64AtomicMinMax)

                [`VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT`::`shaderSharedFloat64AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat64AtomicMinMax) |
| `AtomicFloat16VectorNV`

                [`VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV`::`shaderFloat16VectorAtomics`](../chapters/features.html#features-shaderFloat16VectorAtomics) |
| `Int64ImageEXT`

                [`VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT`::`shaderImageInt64Atomics`](../chapters/features.html#features-shaderImageInt64Atomics) |
| `Int16`

                [`VkPhysicalDeviceFeatures`::`shaderInt16`](../chapters/features.html#features-shaderInt16) |
| `TessellationPointSize`

                [`VkPhysicalDeviceFeatures`::`shaderTessellationAndGeometryPointSize`](../chapters/features.html#features-shaderTessellationAndGeometryPointSize) |
| `GeometryPointSize`

                [`VkPhysicalDeviceFeatures`::`shaderTessellationAndGeometryPointSize`](../chapters/features.html#features-shaderTessellationAndGeometryPointSize) |
| `ImageGatherExtended`

                [`VkPhysicalDeviceFeatures`::`shaderImageGatherExtended`](../chapters/features.html#features-shaderImageGatherExtended) |
| `StorageImageMultisample`

                [`VkPhysicalDeviceFeatures`::`shaderStorageImageMultisample`](../chapters/features.html#features-shaderStorageImageMultisample) |
| `UniformBufferArrayDynamicIndexing`

                [`VkPhysicalDeviceFeatures`::`shaderUniformBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderUniformBufferArrayDynamicIndexing) |
| `SampledImageArrayDynamicIndexing`

                [`VkPhysicalDeviceFeatures`::`shaderSampledImageArrayDynamicIndexing`](../chapters/features.html#features-shaderSampledImageArrayDynamicIndexing) |
| `StorageBufferArrayDynamicIndexing`

                [`VkPhysicalDeviceFeatures`::`shaderStorageBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageBufferArrayDynamicIndexing) |
| `StorageImageArrayDynamicIndexing`

                [`VkPhysicalDeviceFeatures`::`shaderStorageImageArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageImageArrayDynamicIndexing) |
| `ClipDistance`

                [`VkPhysicalDeviceFeatures`::`shaderClipDistance`](../chapters/features.html#features-shaderClipDistance) |
| `CullDistance`

                [`VkPhysicalDeviceFeatures`::`shaderCullDistance`](../chapters/features.html#features-shaderCullDistance) |
| `ImageCubeArray`

                [`VkPhysicalDeviceFeatures`::`imageCubeArray`](../chapters/features.html#features-imageCubeArray) |
| `SampleRateShading`

                [`VkPhysicalDeviceFeatures`::`sampleRateShading`](../chapters/features.html#features-sampleRateShading) |
| `SparseResidency`

                [`VkPhysicalDeviceFeatures`::`shaderResourceResidency`](../chapters/features.html#features-shaderResourceResidency) |
| `MinLod`

                [`VkPhysicalDeviceFeatures`::`shaderResourceMinLod`](../chapters/features.html#features-shaderResourceMinLod) |
| `SampledCubeArray`

                [`VkPhysicalDeviceFeatures`::`imageCubeArray`](../chapters/features.html#features-imageCubeArray) |
| `ImageMSArray`

                [`VkPhysicalDeviceFeatures`::`shaderStorageImageMultisample`](../chapters/features.html#features-shaderStorageImageMultisample) |
| `StorageImageExtendedFormats`

                [VK_VERSION_1_0](versions.html#versions-1.0) |
| `InterpolationFunction`

                [`VkPhysicalDeviceFeatures`::`sampleRateShading`](../chapters/features.html#features-sampleRateShading) |
| `StorageImageReadWithoutFormat`

                [`VkPhysicalDeviceFeatures`::`shaderStorageImageReadWithoutFormat`](../chapters/features.html#features-shaderStorageImageReadWithoutFormat)

                [VK_VERSION_1_3](versions.html#versions-1.3)

                `[VK_KHR_format_feature_flags2](extensions.html#VK_KHR_format_feature_flags2)` |
| `StorageImageWriteWithoutFormat`

                [`VkPhysicalDeviceFeatures`::`shaderStorageImageWriteWithoutFormat`](../chapters/features.html#features-shaderStorageImageWriteWithoutFormat)

                [VK_VERSION_1_3](versions.html#versions-1.3)

                `[VK_KHR_format_feature_flags2](extensions.html#VK_KHR_format_feature_flags2)` |
| `MultiViewport`

                [`VkPhysicalDeviceFeatures`::`multiViewport`](../chapters/features.html#features-multiViewport) |
| `DrawParameters`

                [`VkPhysicalDeviceVulkan11Features`::`shaderDrawParameters`](../chapters/features.html#features-shaderDrawParameters)

                [`VkPhysicalDeviceShaderDrawParametersFeatures`::`shaderDrawParameters`](../chapters/features.html#features-shaderDrawParameters)

                `[VK_KHR_shader_draw_parameters](extensions.html#VK_KHR_shader_draw_parameters)` |
| `MultiView`

                [`VkPhysicalDeviceVulkan11Features`::`multiview`](../chapters/features.html#features-multiview)

                [`VkPhysicalDeviceMultiviewFeatures`::`multiview`](../chapters/features.html#features-multiview) |
| `DeviceGroup`

                [VK_VERSION_1_1](versions.html#versions-1.1)

                `[VK_KHR_device_group](extensions.html#VK_KHR_device_group)` |
| `VariablePointersStorageBuffer`

                [`VkPhysicalDeviceVulkan11Features`::`variablePointersStorageBuffer`](../chapters/features.html#features-variablePointersStorageBuffer)

                [`VkPhysicalDeviceVariablePointersFeatures`::`variablePointersStorageBuffer`](../chapters/features.html#features-variablePointersStorageBuffer) |
| `VariablePointers`

                [`VkPhysicalDeviceVulkan11Features`::`variablePointers`](../chapters/features.html#features-variablePointers)

                [`VkPhysicalDeviceVariablePointersFeatures`::`variablePointers`](../chapters/features.html#features-variablePointers) |
| `ShaderClockKHR`

                `[VK_KHR_shader_clock](extensions.html#VK_KHR_shader_clock)` |
| `StencilExportEXT`

                `[VK_EXT_shader_stencil_export](extensions.html#VK_EXT_shader_stencil_export)` |
| `SubgroupBallotKHR`

                `[VK_EXT_shader_subgroup_ballot](extensions.html#VK_EXT_shader_subgroup_ballot)` |
| `SubgroupVoteKHR`

                `[VK_EXT_shader_subgroup_vote](extensions.html#VK_EXT_shader_subgroup_vote)` |
| `ImageReadWriteLodAMD`

                `[VK_AMD_shader_image_load_store_lod](extensions.html#VK_AMD_shader_image_load_store_lod)` |
| `ImageGatherBiasLodAMD`

                `[VK_AMD_texture_gather_bias_lod](extensions.html#VK_AMD_texture_gather_bias_lod)` |
| `FragmentMaskAMD`

                `[VK_AMD_shader_fragment_mask](extensions.html#VK_AMD_shader_fragment_mask)` |
| `SampleMaskOverrideCoverageNV`

                `[VK_NV_sample_mask_override_coverage](extensions.html#VK_NV_sample_mask_override_coverage)` |
| `GeometryShaderPassthroughNV`

                `[VK_NV_geometry_shader_passthrough](extensions.html#VK_NV_geometry_shader_passthrough)` |
| `ShaderViewportIndex`

                [`VkPhysicalDeviceVulkan12Features`::`shaderOutputViewportIndex`](../chapters/features.html#features-shaderOutputViewportIndex) |
| `ShaderLayer`

                [`VkPhysicalDeviceVulkan12Features`::`shaderOutputLayer`](../chapters/features.html#features-shaderOutputLayer) |
| `ShaderViewportIndexLayerEXT`

                `[VK_EXT_shader_viewport_index_layer](extensions.html#VK_EXT_shader_viewport_index_layer)`

                `[VK_NV_viewport_array2](extensions.html#VK_NV_viewport_array2)` |
| `ShaderViewportMaskNV`

                `[VK_NV_viewport_array2](extensions.html#VK_NV_viewport_array2)` |
| `PerViewAttributesNV`

                `[VK_NVX_multiview_per_view_attributes](extensions.html#VK_NVX_multiview_per_view_attributes)` |
| `StorageBuffer16BitAccess`

                [`VkPhysicalDeviceVulkan11Features`::`storageBuffer16BitAccess`](../chapters/features.html#features-storageBuffer16BitAccess)

                [`VkPhysicalDevice16BitStorageFeatures`::`storageBuffer16BitAccess`](../chapters/features.html#features-storageBuffer16BitAccess) |
| `UniformAndStorageBuffer16BitAccess`

                [`VkPhysicalDeviceVulkan11Features`::`uniformAndStorageBuffer16BitAccess`](../chapters/features.html#features-uniformAndStorageBuffer16BitAccess)

                [`VkPhysicalDevice16BitStorageFeatures`::`uniformAndStorageBuffer16BitAccess`](../chapters/features.html#features-uniformAndStorageBuffer16BitAccess) |
| `StoragePushConstant16`

                [`VkPhysicalDeviceVulkan11Features`::`storagePushConstant16`](../chapters/features.html#features-storagePushConstant16)

                [`VkPhysicalDevice16BitStorageFeatures`::`storagePushConstant16`](../chapters/features.html#features-storagePushConstant16) |
| `StorageInputOutput16`

                [`VkPhysicalDeviceVulkan11Features`::`storageInputOutput16`](../chapters/features.html#features-storageInputOutput16)

                [`VkPhysicalDevice16BitStorageFeatures`::`storageInputOutput16`](../chapters/features.html#features-storageInputOutput16) |
| `GroupNonUniform`

                [VK_SUBGROUP_FEATURE_BASIC_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformVote`

                [VK_SUBGROUP_FEATURE_VOTE_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformArithmetic`

                [VK_SUBGROUP_FEATURE_ARITHMETIC_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformBallot`

                [VK_SUBGROUP_FEATURE_BALLOT_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformShuffle`

                [VK_SUBGROUP_FEATURE_SHUFFLE_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformShuffleRelative`

                [VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformClustered`

                [VK_SUBGROUP_FEATURE_CLUSTERED_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformQuad`

                [VK_SUBGROUP_FEATURE_QUAD_BIT](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `GroupNonUniformPartitionedEXT`

                [`VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT`::`shaderSubgroupPartitioned`](../chapters/features.html#features-shaderSubgroupPartitioned)

                [VK_SUBGROUP_FEATURE_PARTITIONED_BIT_NV](../chapters/devsandqueues.html#limits-subgroupSupportedOperations) |
| `SampleMaskPostDepthCoverage`

                `[VK_EXT_post_depth_coverage](extensions.html#VK_EXT_post_depth_coverage)` |
| `ShaderNonUniform`

                [VK_VERSION_1_2](versions.html#versions-1.2)

                `[VK_EXT_descriptor_indexing](extensions.html#VK_EXT_descriptor_indexing)` |
| `RuntimeDescriptorArray`

                [`VkPhysicalDeviceVulkan12Features`::`runtimeDescriptorArray`](../chapters/features.html#features-runtimeDescriptorArray) |
| `InputAttachmentArrayDynamicIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderInputAttachmentArrayDynamicIndexing`](../chapters/features.html#features-shaderInputAttachmentArrayDynamicIndexing) |
| `UniformTexelBufferArrayDynamicIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderUniformTexelBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderUniformTexelBufferArrayDynamicIndexing) |
| `StorageTexelBufferArrayDynamicIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderStorageTexelBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageTexelBufferArrayDynamicIndexing) |
| `UniformBufferArrayNonUniformIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderUniformBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderUniformBufferArrayNonUniformIndexing) |
| `SampledImageArrayNonUniformIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderSampledImageArrayNonUniformIndexing`](../chapters/features.html#features-shaderSampledImageArrayNonUniformIndexing) |
| `StorageBufferArrayNonUniformIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderStorageBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderStorageBufferArrayNonUniformIndexing) |
| `StorageImageArrayNonUniformIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderStorageImageArrayNonUniformIndexing`](../chapters/features.html#features-shaderStorageImageArrayNonUniformIndexing) |
| `InputAttachmentArrayNonUniformIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderInputAttachmentArrayNonUniformIndexing`](../chapters/features.html#features-shaderInputAttachmentArrayNonUniformIndexing) |
| `UniformTexelBufferArrayNonUniformIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderUniformTexelBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderUniformTexelBufferArrayNonUniformIndexing) |
| `StorageTexelBufferArrayNonUniformIndexing`

                [`VkPhysicalDeviceVulkan12Features`::`shaderStorageTexelBufferArrayNonUniformIndexing`](../chapters/features.html#features-shaderStorageTexelBufferArrayNonUniformIndexing) |
| `FragmentFullyCoveredEXT`

                `[VK_EXT_conservative_rasterization](extensions.html#VK_EXT_conservative_rasterization)` |
| `Float16`

                [`VkPhysicalDeviceVulkan12Features`::`shaderFloat16`](../chapters/features.html#features-shaderFloat16)

                `[VK_AMD_gpu_shader_half_float](extensions.html#VK_AMD_gpu_shader_half_float)` |
| `Int8`

                [`VkPhysicalDeviceVulkan12Features`::`shaderInt8`](../chapters/features.html#features-shaderInt8) |
| `StorageBuffer8BitAccess`

                [`VkPhysicalDeviceVulkan12Features`::`storageBuffer8BitAccess`](../chapters/features.html#features-storageBuffer8BitAccess) |
| `UniformAndStorageBuffer8BitAccess`

                [`VkPhysicalDeviceVulkan12Features`::`uniformAndStorageBuffer8BitAccess`](../chapters/features.html#features-uniformAndStorageBuffer8BitAccess) |
| `StoragePushConstant8`

                [`VkPhysicalDeviceVulkan12Features`::`storagePushConstant8`](../chapters/features.html#features-storagePushConstant8) |
| `VulkanMemoryModel`

                [`VkPhysicalDeviceVulkan12Features`::`vulkanMemoryModel`](../chapters/features.html#features-vulkanMemoryModel) |
| `VulkanMemoryModelDeviceScope`

                [`VkPhysicalDeviceVulkan12Features`::`vulkanMemoryModelDeviceScope`](../chapters/features.html#features-vulkanMemoryModelDeviceScope) |
| `DenormPreserve`

                [`VkPhysicalDeviceVulkan12Properties`::`shaderDenormPreserveFloat16`](../chapters/devsandqueues.html#limits-shaderDenormPreserveFloat16)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderDenormPreserveFloat32`](../chapters/devsandqueues.html#limits-shaderDenormPreserveFloat32)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderDenormPreserveFloat64`](../chapters/devsandqueues.html#limits-shaderDenormPreserveFloat64) |
| `DenormFlushToZero`

                [`VkPhysicalDeviceVulkan12Properties`::`shaderDenormFlushToZeroFloat16`](../chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat16)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderDenormFlushToZeroFloat32`](../chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat32)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderDenormFlushToZeroFloat64`](../chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat64) |
| `SignedZeroInfNanPreserve`

                [`VkPhysicalDeviceVulkan12Properties`::`shaderSignedZeroInfNanPreserveFloat16`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderSignedZeroInfNanPreserveFloat32`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderSignedZeroInfNanPreserveFloat64`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat64) |
| `RoundingModeRTE`

                [`VkPhysicalDeviceVulkan12Properties`::`shaderRoundingModeRTEFloat16`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat16)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderRoundingModeRTEFloat32`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat32)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderRoundingModeRTEFloat64`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat64) |
| `RoundingModeRTZ`

                [`VkPhysicalDeviceVulkan12Properties`::`shaderRoundingModeRTZFloat16`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat16)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderRoundingModeRTZFloat32`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat32)

                [`VkPhysicalDeviceVulkan12Properties`::`shaderRoundingModeRTZFloat64`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat64) |
| `ComputeDerivativeGroupQuadsKHR`

                [`VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR`::`computeDerivativeGroupQuads`](../chapters/features.html#features-computeDerivativeGroupQuads)

                [`VkPhysicalDeviceComputeShaderDerivativesFeaturesNV`::`computeDerivativeGroupQuads`](../chapters/features.html#features-computeDerivativeGroupQuads) |
| `ComputeDerivativeGroupLinearKHR`

                [`VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR`::`computeDerivativeGroupLinear`](../chapters/features.html#features-computeDerivativeGroupLinear)

                [`VkPhysicalDeviceComputeShaderDerivativesFeaturesNV`::`computeDerivativeGroupLinear`](../chapters/features.html#features-computeDerivativeGroupLinear) |
| `ImageFootprintNV`

                [`VkPhysicalDeviceShaderImageFootprintFeaturesNV`::`imageFootprint`](../chapters/features.html#features-imageFootprint) |
| `MeshShadingNV`

                `[VK_NV_mesh_shader](extensions.html#VK_NV_mesh_shader)` |
| `RayTracingKHR`

                [`VkPhysicalDeviceRayTracingPipelineFeaturesKHR`::`rayTracingPipeline`](../chapters/features.html#features-rayTracingPipeline) |
| `RayQueryKHR`

                [`VkPhysicalDeviceRayQueryFeaturesKHR`::`rayQuery`](../chapters/features.html#features-rayQuery) |
| `RayTraversalPrimitiveCullingKHR`

                [`VkPhysicalDeviceRayTracingPipelineFeaturesKHR`::`rayTraversalPrimitiveCulling`](../chapters/features.html#features-rayTraversalPrimitiveCulling)

                [`VkPhysicalDeviceRayQueryFeaturesKHR`::`rayQuery`](../chapters/features.html#features-rayQuery) |
| `RayCullMaskKHR`

                [`VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR`::`rayTracingMaintenance1`](../chapters/features.html#features-rayTracingMaintenance1) |
| `RayTracingNV`

                `[VK_NV_ray_tracing](extensions.html#VK_NV_ray_tracing)` |
| `RayTracingMotionBlurNV`

                [`VkPhysicalDeviceRayTracingMotionBlurFeaturesNV`::`rayTracingMotionBlur`](../chapters/features.html#features-rayTracingMotionBlur) |
| `TransformFeedback`

                [`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`transformFeedback`](../chapters/features.html#features-transformFeedback) |
| `GeometryStreams`

                [`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`geometryStreams`](../chapters/features.html#features-geometryStreams) |
| `FragmentDensityEXT`

                [`VkPhysicalDeviceFragmentDensityMapFeaturesEXT`::`fragmentDensityMap`](../chapters/features.html#features-fragmentDensityMap)

                [`VkPhysicalDeviceShadingRateImageFeaturesNV`::`shadingRateImage`](../chapters/features.html#features-shadingRateImage) |
| `PhysicalStorageBufferAddresses`

                [`VkPhysicalDeviceVulkan12Features`::`bufferDeviceAddress`](../chapters/features.html#features-bufferDeviceAddress)

                [`VkPhysicalDeviceBufferDeviceAddressFeaturesEXT`::`bufferDeviceAddress`](../chapters/features.html#features-bufferDeviceAddressEXT) |
| `CooperativeMatrixNV`

                [`VkPhysicalDeviceCooperativeMatrixFeaturesNV`::`cooperativeMatrix`](../chapters/features.html#features-cooperativeMatrixNV) |
| `IntegerFunctions2INTEL`

                [`VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL`::`shaderIntegerFunctions2`](../chapters/features.html#features-shaderIntegerFunctions2) |
| `ShaderSMBuiltinsNV`

                [`VkPhysicalDeviceShaderSMBuiltinsFeaturesNV`::`shaderSMBuiltins`](../chapters/features.html#features-shaderSMBuiltins) |
| `FragmentShaderSampleInterlockEXT`

                [`VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT`::`fragmentShaderSampleInterlock`](../chapters/features.html#features-fragmentShaderSampleInterlock) |
| `FragmentShaderPixelInterlockEXT`

                [`VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT`::`fragmentShaderPixelInterlock`](../chapters/features.html#features-fragmentShaderPixelInterlock) |
| `FragmentShaderShadingRateInterlockEXT`

                [`VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT`::`fragmentShaderShadingRateInterlock`](../chapters/features.html#features-fragmentShaderShadingRateInterlock)

                [`VkPhysicalDeviceShadingRateImageFeaturesNV`::`shadingRateImage`](../chapters/features.html#features-shadingRateImage) |
| `DemoteToHelperInvocation`

                [`VkPhysicalDeviceVulkan13Features`::`shaderDemoteToHelperInvocation`](../chapters/features.html#features-shaderDemoteToHelperInvocation)

                [`VkPhysicalDeviceShaderDemoteToHelperInvocationFeaturesEXT`::`shaderDemoteToHelperInvocation`](../chapters/features.html#features-shaderDemoteToHelperInvocation) |
| `FragmentShadingRateKHR`

                [`VkPhysicalDeviceFragmentShadingRateFeaturesKHR`::`pipelineFragmentShadingRate`](../chapters/features.html#features-pipelineFragmentShadingRate)

                [`VkPhysicalDeviceFragmentShadingRateFeaturesKHR`::`primitiveFragmentShadingRate`](../chapters/features.html#features-primitiveFragmentShadingRate)

                [`VkPhysicalDeviceFragmentShadingRateFeaturesKHR`::`attachmentFragmentShadingRate`](../chapters/features.html#features-attachmentFragmentShadingRate) |
| `WorkgroupMemoryExplicitLayoutKHR`

                [`VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR`::`workgroupMemoryExplicitLayout`](../chapters/features.html#features-workgroupMemoryExplicitLayout) |
| `WorkgroupMemoryExplicitLayout8BitAccessKHR`

                [`VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR`::`workgroupMemoryExplicitLayout8BitAccess`](../chapters/features.html#features-workgroupMemoryExplicitLayout8BitAccess) |
| `WorkgroupMemoryExplicitLayout16BitAccessKHR`

                [`VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR`::`workgroupMemoryExplicitLayout16BitAccess`](../chapters/features.html#features-workgroupMemoryExplicitLayout16BitAccess) |
| `DotProductInputAll`

                [`VkPhysicalDeviceVulkan13Features`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct)

                [`VkPhysicalDeviceShaderIntegerDotProductFeaturesKHR`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct) |
| `DotProductInput4x8Bit`

                [`VkPhysicalDeviceVulkan13Features`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct)

                [`VkPhysicalDeviceShaderIntegerDotProductFeaturesKHR`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct) |
| `DotProductInput4x8BitPacked`

                [`VkPhysicalDeviceVulkan13Features`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct)

                [`VkPhysicalDeviceShaderIntegerDotProductFeaturesKHR`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct) |
| `DotProduct`

                [`VkPhysicalDeviceVulkan13Features`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct)

                [`VkPhysicalDeviceShaderIntegerDotProductFeaturesKHR`::`shaderIntegerDotProduct`](../chapters/features.html#features-shaderIntegerDotProduct) |
| `FragmentBarycentricKHR`

                [`VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR`::`fragmentShaderBarycentric`](../chapters/features.html#features-fragmentShaderBarycentric)

                [`VkPhysicalDeviceFragmentShaderBarycentricFeaturesNV`::`fragmentShaderBarycentric`](../chapters/features.html#features-fragmentShaderBarycentric) |
| `TextureSampleWeightedQCOM`

                [`VkPhysicalDeviceImageProcessingFeaturesQCOM`::`textureSampleWeighted`](../chapters/features.html#features-textureSampleWeighted) |
| `TextureBoxFilterQCOM`

                [`VkPhysicalDeviceImageProcessingFeaturesQCOM`::`textureBoxFilter`](../chapters/features.html#features-textureBoxFilter) |
| `TextureBlockMatchQCOM`

                [`VkPhysicalDeviceImageProcessingFeaturesQCOM`::`textureBlockMatch`](../chapters/features.html#features-textureBlockMatch) |
| `TextureBlockMatch2QCOM`

                [`VkPhysicalDeviceImageProcessing2FeaturesQCOM`::`textureBlockMatch2`](../chapters/features.html#features-textureBlockMatch2) |
| `MeshShadingEXT`

                `[VK_EXT_mesh_shader](extensions.html#VK_EXT_mesh_shader)` |
| `RayTracingOpacityMicromapEXT`

                `[VK_EXT_opacity_micromap](extensions.html#VK_EXT_opacity_micromap)` |
| `CoreBuiltinsARM`

                [`VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM`::`shaderCoreBuiltins`](../chapters/features.html#features-shaderCoreBuiltins) |
| `ShaderInvocationReorderNV`

                `[VK_NV_ray_tracing_invocation_reorder](extensions.html#VK_NV_ray_tracing_invocation_reorder)` |
| `ClusterCullingShadingHUAWEI`

                [`VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI`::`clustercullingShader`](../chapters/features.html#features-clustercullingShader) |
| `RayTracingPositionFetchKHR`

                [`VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR`::`rayTracingPositionFetch`](../chapters/features.html#features-rayTracingPositionFetch) |
| `RayQueryPositionFetchKHR`

                [`VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR`::`rayTracingPositionFetch`](../chapters/features.html#features-rayTracingPositionFetch) |
| `TileImageColorReadAccessEXT`

                [`VkPhysicalDeviceShaderTileImageFeaturesEXT`::`shaderTileImageColorReadAccess`](../chapters/features.html#features-shaderTileImageColorReadAccess) |
| `TileImageDepthReadAccessEXT`

                [`VkPhysicalDeviceShaderTileImageFeaturesEXT`::`shaderTileImageDepthReadAccess`](../chapters/features.html#features-shaderTileImageDepthReadAccess) |
| `TileImageStencilReadAccessEXT`

                [`VkPhysicalDeviceShaderTileImageFeaturesEXT`::`shaderTileImageStencilReadAccess`](../chapters/features.html#features-shaderTileImageStencilReadAccess) |
| `CooperativeMatrixKHR`

                [`VkPhysicalDeviceCooperativeMatrixFeaturesKHR`::`cooperativeMatrix`](../chapters/features.html#features-cooperativeMatrix) |
| `CooperativeMatrixConversionQCOM`

                [`VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM`::`cooperativeMatrixConversion`](../chapters/features.html#features-cooperativeMatrixConversion) |
| `ShaderEnqueueAMDX`

                [`VkPhysicalDeviceShaderEnqueueFeaturesAMDX`::`shaderEnqueue`](../chapters/features.html#features-shaderEnqueue) |
| `GroupNonUniformRotateKHR`

                [`VkPhysicalDeviceVulkan14Features`::`shaderSubgroupRotate`](../chapters/features.html#features-shaderSubgroupRotate)

                [`VkPhysicalDeviceShaderSubgroupRotateFeatures`::`shaderSubgroupRotate`](../chapters/features.html#features-shaderSubgroupRotate) |
| `ExpectAssumeKHR`

                [`VkPhysicalDeviceVulkan14Features`::`shaderExpectAssume`](../chapters/features.html#features-shaderExpectAssume)

                [`VkPhysicalDeviceShaderExpectAssumeFeatures`::`shaderExpectAssume`](../chapters/features.html#features-shaderExpectAssume) |
| `FloatControls2`

                [`VkPhysicalDeviceVulkan14Features`::`shaderFloatControls2`](../chapters/features.html#features-shaderFloatControls2)

                [`VkPhysicalDeviceShaderFloatControls2Features`::`shaderFloatControls2`](../chapters/features.html#features-shaderFloatControls2) |
| `QuadControlKHR`

                [`VkPhysicalDeviceShaderQuadControlFeaturesKHR`::`shaderQuadControl`](../chapters/features.html#features-shaderQuadControl) |
| `BFloat16TypeKHR`

                [`VkPhysicalDeviceShaderBfloat16FeaturesKHR`::`shaderBFloat16Type`](../chapters/features.html#features-shaderBFloat16Type) |
| `BFloat16DotProductKHR`

                [`VkPhysicalDeviceShaderBfloat16FeaturesKHR`::`shaderBFloat16DotProduct`](../chapters/features.html#features-shaderBFloat16DotProduct) |
| `BFloat16CooperativeMatrixKHR`

                [`VkPhysicalDeviceShaderBfloat16FeaturesKHR`::`shaderBFloat16CooperativeMatrix`](../chapters/features.html#features-shaderBFloat16CooperativeMatrix) |
| `RawAccessChainsNV`

                [`VkPhysicalDeviceRawAccessChainsFeaturesNV`::`shaderRawAccessChains`](../chapters/features.html#features-shaderRawAccessChains) |
| `ReplicatedCompositesEXT`

                [`VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT`::`shaderReplicatedComposites`](../chapters/features.html#features-shaderReplicatedComposites) |
| `TensorAddressingNV`

                [`VkPhysicalDeviceCooperativeMatrix2FeaturesNV`::`cooperativeMatrixTensorAddressing`](../chapters/features.html#features-cooperativeMatrixTensorAddressing) |
| `CooperativeMatrixReductionsNV`

                [`VkPhysicalDeviceCooperativeMatrix2FeaturesNV`::`cooperativeMatrixReductions`](../chapters/features.html#features-cooperativeMatrixReductions) |
| `CooperativeMatrixConversionsNV`

                [`VkPhysicalDeviceCooperativeMatrix2FeaturesNV`::`cooperativeMatrixConversions`](../chapters/features.html#features-cooperativeMatrixConversions) |
| `CooperativeMatrixPerElementOperationsNV`

                [`VkPhysicalDeviceCooperativeMatrix2FeaturesNV`::`cooperativeMatrixPerElementOperations`](../chapters/features.html#features-cooperativeMatrixPerElementOperations) |
| `CooperativeMatrixTensorAddressingNV`

                [`VkPhysicalDeviceCooperativeMatrix2FeaturesNV`::`cooperativeMatrixTensorAddressing`](../chapters/features.html#features-cooperativeMatrixTensorAddressing) |
| `CooperativeMatrixBlockLoadsNV`

                [`VkPhysicalDeviceCooperativeMatrix2FeaturesNV`::`cooperativeMatrixBlockLoads`](../chapters/features.html#features-cooperativeMatrixBlockLoads) |
| `RayTracingSpheresGeometryNV`

                [`VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV`::`spheres`](../chapters/features.html#features-spheres) |
| `RayTracingLinearSweptSpheresGeometryNV`

                [`VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV`::`linearSweptSpheres`](../chapters/features.html#features-linearSweptSpheres) |
| `RayTracingClusterAccelerationStructureNV`

                [`VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`::`clusterAccelerationStructure`](../chapters/features.html#features-clusterAccelerationStructure) |
| `CooperativeVectorNV`

                [`VkPhysicalDeviceCooperativeVectorFeaturesNV`::`cooperativeVector`](../chapters/features.html#features-cooperativeVector) |
| `CooperativeVectorTrainingNV`

                [`VkPhysicalDeviceCooperativeVectorFeaturesNV`::`cooperativeVectorTraining`](../chapters/features.html#features-cooperativeVectorTraining) |
| `PushConstantBanksNV`

                [`VkPhysicalDevicePushConstantBankFeaturesNV`::`pushConstantBank`](../chapters/features.html#features-pushConstantBank) |
| `ShaderInvocationReorderEXT`

                `[VK_EXT_ray_tracing_invocation_reorder](extensions.html#VK_EXT_ray_tracing_invocation_reorder)` |
| `TileShadingQCOM`

                [`VkPhysicalDeviceTileShadingFeaturesQCOM`::`tileShading`](../chapters/features.html#features-tileShading) |
| `TensorsARM`

                [`VkPhysicalDeviceTensorFeaturesARM`::`shaderTensorAccess`](../chapters/features.html#features-shaderTensorAccess) |
| `StorageTensorArrayDynamicIndexingARM`

                [`VkPhysicalDeviceTensorFeaturesARM`::`shaderStorageTensorArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageTensorArrayDynamicIndexing) |
| `StorageTensorArrayNonUniformIndexingARM`

                [`VkPhysicalDeviceTensorFeaturesARM`::`shaderStorageTensorArrayNonUniformIndexing`](../chapters/features.html#features-shaderStorageTensorArrayNonUniformIndexing) |
| `Float8EXT`

                [`VkPhysicalDeviceShaderFloat8FeaturesEXT`::`shaderFloat8`](../chapters/features.html#features-shaderFloat8) |
| `Float8CooperativeMatrixEXT`

                [`VkPhysicalDeviceShaderFloat8FeaturesEXT`::`shaderFloat8CooperativeMatrix`](../chapters/features.html#features-shaderFloat8CooperativeMatrix) |
| `GraphARM`

                [`VkPhysicalDeviceDataGraphFeaturesARM`::`dataGraph`](../chapters/features.html#features-dataGraph) |
| `UntypedPointersKHR`

                [`VkPhysicalDeviceShaderUntypedPointersFeaturesKHR`::`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers) |
| `FMAKHR`

                [`VkPhysicalDeviceShaderFmaFeaturesKHR`::`shaderFmaFloat16`](../chapters/features.html#features-shaderFmaFloat16)

                [`VkPhysicalDeviceShaderFmaFeaturesKHR`::`shaderFmaFloat32`](../chapters/features.html#features-shaderFmaFloat32)

                [`VkPhysicalDeviceShaderFmaFeaturesKHR`::`shaderFmaFloat64`](../chapters/features.html#features-shaderFmaFloat64) |
| `Shader64BitIndexingEXT`

                [`VkPhysicalDeviceShader64BitIndexingFeaturesEXT`::`shader64BitIndexing`](../chapters/features.html#features-shader64BitIndexing) |
| `LongVectorEXT`

                [`VkPhysicalDeviceShaderLongVectorFeaturesEXT`::`longVector`](../chapters/features.html#features-longVector) |
| `DescriptorHeapEXT`

                [`VkPhysicalDeviceDescriptorHeapFeaturesEXT`::`descriptorHeap`](../chapters/features.html#features-descriptorHeap) |
| `DotProductFloat16AccFloat32VALVE`

                [`VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE`::`shaderMixedFloatDotProductFloat16AccFloat32`](../chapters/features.html#features-shaderMixedFloatDotProductFloat16AccFloat32) |
| `DotProductFloat16AccFloat16VALVE`

                [`VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE`::`shaderMixedFloatDotProductFloat16AccFloat16`](../chapters/features.html#features-shaderMixedFloatDotProductFloat16AccFloat16) |
| `DotProductBFloat16AccVALVE`

                [`VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE`::`shaderMixedFloatDotProductBFloat16Acc`](../chapters/features.html#features-shaderMixedFloatDotProductBFloat16Acc) |
| `DotProductFloat8AccFloat32VALVE`

                [`VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE`::`shaderMixedFloatDotProductFloat8AccFloat32`](../chapters/features.html#features-shaderMixedFloatDotProductFloat8AccFloat32) |
| `ConstantDataKHR`

                [`VkPhysicalDeviceShaderConstantDataFeaturesKHR`::`shaderConstantData`](../chapters/features.html#features-shaderConstantData) |
| `AbortKHR`

                [`VkPhysicalDeviceShaderAbortFeaturesKHR`::`shaderAbort`](../chapters/features.html#features-shaderAbort) |

The application **must** not pass a SPIR-V module containing any of the
following to [vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule):

* 
any `OpCapability` not listed above,

* 
an unsupported capability, or

* 
a capability which corresponds to a Vulkan feature or extension which
has not been enabled.

The [following table](#spirvenv-extensions-table) lists SPIR-V extensions
that implementations **may** support.
The application **must** not pass a SPIR-V module to [vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule)
that uses the following SPIR-V extensions unless one of the following
conditions is met for the [VkDevice](../chapters/devsandqueues.html#VkDevice) specified in the `device`
parameter of [vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule):

* 
Any corresponding Vulkan extension is enabled.

* 
The corresponding core version is supported (as returned by
[VkPhysicalDeviceProperties](../chapters/devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion`).

| SPIR-V `OpExtension`

                  Vulkan extension or core version |
| --- |
| `SPV_KHR_variable_pointers`

                [VK_VERSION_1_1](versions.html#versions-1.1)

                `[VK_KHR_variable_pointers](extensions.html#VK_KHR_variable_pointers)` |
| `SPV_AMD_shader_explicit_vertex_parameter`

                `[VK_AMD_shader_explicit_vertex_parameter](extensions.html#VK_AMD_shader_explicit_vertex_parameter)` |
| `SPV_AMD_gcn_shader`

                `[VK_AMD_gcn_shader](extensions.html#VK_AMD_gcn_shader)` |
| `SPV_AMD_gpu_shader_half_float`

                `[VK_AMD_gpu_shader_half_float](extensions.html#VK_AMD_gpu_shader_half_float)` |
| `SPV_AMD_gpu_shader_int16`

                `[VK_AMD_gpu_shader_int16](extensions.html#VK_AMD_gpu_shader_int16)` |
| `SPV_AMD_shader_ballot`

                `[VK_AMD_shader_ballot](extensions.html#VK_AMD_shader_ballot)` |
| `SPV_AMD_shader_fragment_mask`

                `[VK_AMD_shader_fragment_mask](extensions.html#VK_AMD_shader_fragment_mask)` |
| `SPV_AMD_shader_image_load_store_lod`

                `[VK_AMD_shader_image_load_store_lod](extensions.html#VK_AMD_shader_image_load_store_lod)` |
| `SPV_AMD_shader_trinary_minmax`

                `[VK_AMD_shader_trinary_minmax](extensions.html#VK_AMD_shader_trinary_minmax)` |
| `SPV_AMD_texture_gather_bias_lod`

                `[VK_AMD_texture_gather_bias_lod](extensions.html#VK_AMD_texture_gather_bias_lod)` |
| `SPV_AMD_shader_early_and_late_fragment_tests`

                `[VK_AMD_shader_early_and_late_fragment_tests](extensions.html#VK_AMD_shader_early_and_late_fragment_tests)` |
| `SPV_KHR_shader_draw_parameters`

                [VK_VERSION_1_1](versions.html#versions-1.1)

                `[VK_KHR_shader_draw_parameters](extensions.html#VK_KHR_shader_draw_parameters)` |
| `SPV_KHR_8bit_storage`

                [VK_VERSION_1_2](versions.html#versions-1.2)

                `[VK_KHR_8bit_storage](extensions.html#VK_KHR_8bit_storage)` |
| `SPV_KHR_16bit_storage`

                [VK_VERSION_1_1](versions.html#versions-1.1)

                `[VK_KHR_16bit_storage](extensions.html#VK_KHR_16bit_storage)` |
| `SPV_KHR_shader_clock`

                `[VK_KHR_shader_clock](extensions.html#VK_KHR_shader_clock)` |
| `SPV_KHR_float_controls`

                [VK_VERSION_1_2](versions.html#versions-1.2)

                `[VK_KHR_shader_float_controls](extensions.html#VK_KHR_shader_float_controls)` |
| `SPV_KHR_storage_buffer_storage_class`

                [VK_VERSION_1_1](versions.html#versions-1.1)

                `[VK_KHR_storage_buffer_storage_class](extensions.html#VK_KHR_storage_buffer_storage_class)` |
| `SPV_KHR_post_depth_coverage`

                `[VK_EXT_post_depth_coverage](extensions.html#VK_EXT_post_depth_coverage)` |
| `SPV_EXT_shader_stencil_export`

                `[VK_EXT_shader_stencil_export](extensions.html#VK_EXT_shader_stencil_export)` |
| `SPV_KHR_shader_ballot`

                `[VK_EXT_shader_subgroup_ballot](extensions.html#VK_EXT_shader_subgroup_ballot)` |
| `SPV_KHR_subgroup_vote`

                `[VK_EXT_shader_subgroup_vote](extensions.html#VK_EXT_shader_subgroup_vote)` |
| `SPV_NV_sample_mask_override_coverage`

                `[VK_NV_sample_mask_override_coverage](extensions.html#VK_NV_sample_mask_override_coverage)` |
| `SPV_NV_geometry_shader_passthrough`

                `[VK_NV_geometry_shader_passthrough](extensions.html#VK_NV_geometry_shader_passthrough)` |
| `SPV_NV_mesh_shader`

                `[VK_NV_mesh_shader](extensions.html#VK_NV_mesh_shader)` |
| `SPV_NV_viewport_array2`

                `[VK_NV_viewport_array2](extensions.html#VK_NV_viewport_array2)` |
| `SPV_NV_shader_subgroup_partitioned`

                `[VK_NV_shader_subgroup_partitioned](extensions.html#VK_NV_shader_subgroup_partitioned)`

                `[VK_EXT_shader_subgroup_partitioned](extensions.html#VK_EXT_shader_subgroup_partitioned)` |
| `SPV_EXT_shader_subgroup_partitioned`

                `[VK_EXT_shader_subgroup_partitioned](extensions.html#VK_EXT_shader_subgroup_partitioned)` |
| `SPV_NV_shader_invocation_reorder`

                `[VK_NV_ray_tracing_invocation_reorder](extensions.html#VK_NV_ray_tracing_invocation_reorder)` |
| `SPV_EXT_shader_viewport_index_layer`

                [VK_VERSION_1_2](versions.html#versions-1.2)

                `[VK_EXT_shader_viewport_index_layer](extensions.html#VK_EXT_shader_viewport_index_layer)` |
| `SPV_NVX_multiview_per_view_attributes`

                `[VK_NVX_multiview_per_view_attributes](extensions.html#VK_NVX_multiview_per_view_attributes)` |
| `SPV_EXT_descriptor_indexing`

                [VK_VERSION_1_2](versions.html#versions-1.2)

                `[VK_EXT_descriptor_indexing](extensions.html#VK_EXT_descriptor_indexing)` |
| `SPV_KHR_vulkan_memory_model`

                [VK_VERSION_1_2](versions.html#versions-1.2)

                `[VK_KHR_vulkan_memory_model](extensions.html#VK_KHR_vulkan_memory_model)` |
| `SPV_NV_compute_shader_derivatives`

                `[VK_NV_compute_shader_derivatives](extensions.html#VK_NV_compute_shader_derivatives)` |
| `SPV_NV_fragment_shader_barycentric`

                `[VK_NV_fragment_shader_barycentric](extensions.html#VK_NV_fragment_shader_barycentric)` |
| `SPV_NV_shader_image_footprint`

                `[VK_NV_shader_image_footprint](extensions.html#VK_NV_shader_image_footprint)` |
| `SPV_NV_shading_rate`

                `[VK_NV_shading_rate_image](extensions.html#VK_NV_shading_rate_image)` |
| `SPV_NV_ray_tracing`

                `[VK_NV_ray_tracing](extensions.html#VK_NV_ray_tracing)` |
| `SPV_KHR_ray_tracing`

                `[VK_KHR_ray_tracing_pipeline](extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `SPV_KHR_ray_query`

                `[VK_KHR_ray_query](extensions.html#VK_KHR_ray_query)` |
| `SPV_KHR_ray_cull_mask`

                `[VK_KHR_ray_tracing_maintenance1](extensions.html#VK_KHR_ray_tracing_maintenance1)` |
| `SPV_GOOGLE_hlsl_functionality1`

                `[VK_GOOGLE_hlsl_functionality1](extensions.html#VK_GOOGLE_hlsl_functionality1)` |
| `SPV_GOOGLE_user_type`

                `[VK_GOOGLE_user_type](extensions.html#VK_GOOGLE_user_type)` |
| `SPV_GOOGLE_decorate_string`

                `[VK_GOOGLE_decorate_string](extensions.html#VK_GOOGLE_decorate_string)` |
| `SPV_EXT_fragment_invocation_density`

                `[VK_EXT_fragment_density_map](extensions.html#VK_EXT_fragment_density_map)` |
| `SPV_KHR_physical_storage_buffer`

                [VK_VERSION_1_2](versions.html#versions-1.2)

                `[VK_KHR_buffer_device_address](extensions.html#VK_KHR_buffer_device_address)` |
| `SPV_EXT_physical_storage_buffer`

                `[VK_EXT_buffer_device_address](extensions.html#VK_EXT_buffer_device_address)` |
| `SPV_NV_cooperative_matrix`

                `[VK_NV_cooperative_matrix](extensions.html#VK_NV_cooperative_matrix)` |
| `SPV_NV_shader_sm_builtins`

                `[VK_NV_shader_sm_builtins](extensions.html#VK_NV_shader_sm_builtins)` |
| `SPV_EXT_fragment_shader_interlock`

                `[VK_EXT_fragment_shader_interlock](extensions.html#VK_EXT_fragment_shader_interlock)` |
| `SPV_EXT_demote_to_helper_invocation`

                [VK_VERSION_1_3](versions.html#versions-1.3)

                `[VK_EXT_shader_demote_to_helper_invocation](extensions.html#VK_EXT_shader_demote_to_helper_invocation)` |
| `SPV_KHR_fragment_shading_rate`

                `[VK_KHR_fragment_shading_rate](extensions.html#VK_KHR_fragment_shading_rate)` |
| `SPV_KHR_non_semantic_info`

                [VK_VERSION_1_3](versions.html#versions-1.3)

                `[VK_KHR_shader_non_semantic_info](extensions.html#VK_KHR_shader_non_semantic_info)` |
| `SPV_EXT_shader_image_int64`

                `[VK_EXT_shader_image_atomic_int64](extensions.html#VK_EXT_shader_image_atomic_int64)` |
| `SPV_KHR_terminate_invocation`

                [VK_VERSION_1_3](versions.html#versions-1.3)

                `[VK_KHR_shader_terminate_invocation](extensions.html#VK_KHR_shader_terminate_invocation)` |
| `SPV_KHR_multiview`

                [VK_VERSION_1_1](versions.html#versions-1.1)

                `[VK_KHR_multiview](extensions.html#VK_KHR_multiview)` |
| `SPV_KHR_workgroup_memory_explicit_layout`

                `[VK_KHR_workgroup_memory_explicit_layout](extensions.html#VK_KHR_workgroup_memory_explicit_layout)` |
| `SPV_EXT_shader_atomic_float_add`

                `[VK_EXT_shader_atomic_float](extensions.html#VK_EXT_shader_atomic_float)` |
| `SPV_KHR_fragment_shader_barycentric`

                `[VK_KHR_fragment_shader_barycentric](extensions.html#VK_KHR_fragment_shader_barycentric)` |
| `SPV_KHR_subgroup_uniform_control_flow`

                `[VK_KHR_shader_subgroup_uniform_control_flow](extensions.html#VK_KHR_shader_subgroup_uniform_control_flow)` |
| `SPV_EXT_shader_atomic_float_min_max`

                `[VK_EXT_shader_atomic_float2](extensions.html#VK_EXT_shader_atomic_float2)` |
| `SPV_EXT_shader_atomic_float16_add`

                `[VK_EXT_shader_atomic_float2](extensions.html#VK_EXT_shader_atomic_float2)` |
| `SPV_NV_shader_atomic_fp16_vector`

                `[VK_NV_shader_atomic_float16_vector](extensions.html#VK_NV_shader_atomic_float16_vector)` |
| `SPV_EXT_fragment_fully_covered`

                `[VK_EXT_conservative_rasterization](extensions.html#VK_EXT_conservative_rasterization)` |
| `SPV_KHR_integer_dot_product`

                [VK_VERSION_1_3](versions.html#versions-1.3)

                `[VK_KHR_shader_integer_dot_product](extensions.html#VK_KHR_shader_integer_dot_product)` |
| `SPV_INTEL_shader_integer_functions2`

                `[VK_INTEL_shader_integer_functions2](extensions.html#VK_INTEL_shader_integer_functions2)` |
| `SPV_KHR_device_group`

                [VK_VERSION_1_1](versions.html#versions-1.1)

                `[VK_KHR_device_group](extensions.html#VK_KHR_device_group)` |
| `SPV_QCOM_image_processing`

                `[VK_QCOM_image_processing](extensions.html#VK_QCOM_image_processing)` |
| `SPV_QCOM_image_processing2`

                `[VK_QCOM_image_processing2](extensions.html#VK_QCOM_image_processing2)` |
| `SPV_QCOM_cooperative_matrix_conversion`

                `[VK_QCOM_cooperative_matrix_conversion](extensions.html#VK_QCOM_cooperative_matrix_conversion)` |
| `SPV_EXT_mesh_shader`

                `[VK_EXT_mesh_shader](extensions.html#VK_EXT_mesh_shader)` |
| `SPV_KHR_ray_tracing_position_fetch`

                `[VK_KHR_ray_tracing_position_fetch](extensions.html#VK_KHR_ray_tracing_position_fetch)` |
| `SPV_EXT_shader_tile_image`

                `[VK_EXT_shader_tile_image](extensions.html#VK_EXT_shader_tile_image)` |
| `SPV_EXT_opacity_micromap`

                `[VK_EXT_opacity_micromap](extensions.html#VK_EXT_opacity_micromap)` |
| `SPV_KHR_cooperative_matrix`

                `[VK_KHR_cooperative_matrix](extensions.html#VK_KHR_cooperative_matrix)` |
| `SPV_ARM_core_builtins`

                `[VK_ARM_shader_core_builtins](extensions.html#VK_ARM_shader_core_builtins)` |
| `SPV_HUAWEI_cluster_culling_shader`

                `[VK_HUAWEI_cluster_culling_shader](extensions.html#VK_HUAWEI_cluster_culling_shader)` |
| `SPV_HUAWEI_subpass_shading`

                `[VK_HUAWEI_subpass_shading](extensions.html#VK_HUAWEI_subpass_shading)` |
| `SPV_NV_ray_tracing_motion_blur`

                `[VK_NV_ray_tracing_motion_blur](extensions.html#VK_NV_ray_tracing_motion_blur)` |
| `SPV_KHR_maximal_reconvergence`

                `[VK_KHR_shader_maximal_reconvergence](extensions.html#VK_KHR_shader_maximal_reconvergence)` |
| `SPV_KHR_subgroup_rotate`

                [VK_VERSION_1_4](versions.html#versions-1.4)

                `[VK_KHR_shader_subgroup_rotate](extensions.html#VK_KHR_shader_subgroup_rotate)` |
| `SPV_KHR_expect_assume`

                [VK_VERSION_1_4](versions.html#versions-1.4)

                `[VK_KHR_shader_expect_assume](extensions.html#VK_KHR_shader_expect_assume)` |
| `SPV_KHR_float_controls2`

                [VK_VERSION_1_4](versions.html#versions-1.4)

                `[VK_KHR_shader_float_controls2](extensions.html#VK_KHR_shader_float_controls2)` |
| `SPV_KHR_fma`

                `[VK_KHR_shader_fma](extensions.html#VK_KHR_shader_fma)` |
| `SPV_KHR_quad_control`

                `[VK_KHR_shader_quad_control](extensions.html#VK_KHR_shader_quad_control)` |
| `SPV_KHR_bfloat16`

                `[VK_KHR_shader_bfloat16](extensions.html#VK_KHR_shader_bfloat16)` |
| `SPV_NV_raw_access_chains`

                `[VK_NV_raw_access_chains](extensions.html#VK_NV_raw_access_chains)` |
| `SPV_KHR_compute_shader_derivatives`

                `[VK_KHR_compute_shader_derivatives](extensions.html#VK_KHR_compute_shader_derivatives)` |
| `SPV_EXT_replicated_composites`

                `[VK_EXT_shader_replicated_composites](extensions.html#VK_EXT_shader_replicated_composites)` |
| `SPV_KHR_relaxed_extended_instruction`

                `[VK_KHR_shader_relaxed_extended_instruction](extensions.html#VK_KHR_shader_relaxed_extended_instruction)` |
| `SPV_NV_cooperative_matrix2`

                `[VK_NV_cooperative_matrix2](extensions.html#VK_NV_cooperative_matrix2)` |
| `SPV_NV_tensor_addressing`

                `[VK_NV_cooperative_matrix2](extensions.html#VK_NV_cooperative_matrix2)` |
| `SPV_NV_linear_swept_spheres`

                `[VK_NV_ray_tracing_linear_swept_spheres](extensions.html#VK_NV_ray_tracing_linear_swept_spheres)` |
| `SPV_NV_cluster_acceleration_structure`

                `[VK_NV_cluster_acceleration_structure](extensions.html#VK_NV_cluster_acceleration_structure)` |
| `SPV_NV_cooperative_vector`

                `[VK_NV_cooperative_vector](extensions.html#VK_NV_cooperative_vector)` |
| `SPV_NV_push_constant_bank`

                `[VK_NV_push_constant_bank](extensions.html#VK_NV_push_constant_bank)` |
| `SPV_EXT_shader_invocation_reorder`

                `[VK_EXT_ray_tracing_invocation_reorder](extensions.html#VK_EXT_ray_tracing_invocation_reorder)` |
| `SPV_QCOM_tile_shading`

                `[VK_QCOM_tile_shading](extensions.html#VK_QCOM_tile_shading)` |
| `SPV_ARM_tensors`

                `[VK_ARM_tensors](extensions.html#VK_ARM_tensors)` |
| `SPV_EXT_float8`

                `[VK_EXT_shader_float8](extensions.html#VK_EXT_shader_float8)` |
| `SPV_ARM_graph`

                `[VK_ARM_data_graph](extensions.html#VK_ARM_data_graph)` |
| `SPV_KHR_untyped_pointers`

                `[VK_KHR_shader_untyped_pointers](extensions.html#VK_KHR_shader_untyped_pointers)` |
| `SPV_EXT_shader_64bit_indexing`

                `[VK_EXT_shader_64bit_indexing](extensions.html#VK_EXT_shader_64bit_indexing)` |
| `SPV_EXT_long_vector`

                `[VK_EXT_shader_long_vector](extensions.html#VK_EXT_shader_long_vector)` |
| `SPV_EXT_descriptor_heap`

                `[VK_EXT_descriptor_heap](extensions.html#VK_EXT_descriptor_heap)` |
| `SPV_VALVE_mixed_float_dot_product`

                `[VK_VALVE_shader_mixed_float_dot_product](extensions.html#VK_VALVE_shader_mixed_float_dot_product)` |
| `SPV_KHR_abort`

                `[VK_KHR_shader_abort](extensions.html#VK_KHR_shader_abort)` |
| `SPV_KHR_constant_data`

                `[VK_KHR_shader_constant_data](extensions.html#VK_KHR_shader_constant_data)` |

A SPIR-V module passed to [vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule) **must** conform to the
following rules:

The following rules **can** be validated with only the SPIR-V module itself.
They do not depend on knowledge of the implementation and its capabilities
or knowledge of runtime information, such as enabled features.

Valid Usage

* 
[](#VUID-StandaloneSpirv-None-04633) VUID-StandaloneSpirv-None-04633

Every entry point **must** have no return value and accept no arguments

* 
[](#VUID-StandaloneSpirv-None-04634) VUID-StandaloneSpirv-None-04634

The static function-call graph for an entry point **must** not contain
cycles; that is, static recursion is not allowed

* 
[](#VUID-StandaloneSpirv-None-04635) VUID-StandaloneSpirv-None-04635

The `Logical` or `PhysicalStorageBuffer64` addressing model **must**
be selected

* 
[](#VUID-StandaloneSpirv-None-04636) VUID-StandaloneSpirv-None-04636

`Scope` for execution **must** be limited to `Workgroup` or
`Subgroup`

* 
[](#VUID-StandaloneSpirv-Scope-12243) VUID-StandaloneSpirv-Scope-12243

The `Scope` operand of `OpTypeCooperativeMatrixKHR` **must** be
limited to `Workgroup` or `Subgroup`

* 
[](#VUID-StandaloneSpirv-None-04637) VUID-StandaloneSpirv-None-04637

If the `Scope` for execution is `Workgroup`, then it **must** only be
used in the task, mesh, tessellation control, or compute
`Execution` `Model`

* 
[](#VUID-StandaloneSpirv-None-04638) VUID-StandaloneSpirv-None-04638

`Scope` for memory **must** be limited to `Device`, `QueueFamily`,
`Workgroup`, `ShaderCallKHR`, `Subgroup`, or `Invocation`

* 
[](#VUID-StandaloneSpirv-ExecutionModel-07320) VUID-StandaloneSpirv-ExecutionModel-07320

If the `Execution` `Model` is `TessellationControl`, and the
`MemoryModel` is `GLSL450`, the `Scope` for memory **must** not be
`Workgroup`

* 
[](#VUID-StandaloneSpirv-None-07321) VUID-StandaloneSpirv-None-07321

If the `Scope` for memory is `Workgroup`, then it **must** only be
used in the task, mesh, tessellation control, or compute
`Execution` `Model`

* 
[](#VUID-StandaloneSpirv-None-04640) VUID-StandaloneSpirv-None-04640

If the `Scope` for memory is `ShaderCallKHR`, then it **must** only
be used in ray generation, intersection, closest hit, any-hit, miss, and
callable `Execution` `Model`

* 
[](#VUID-StandaloneSpirv-None-04641) VUID-StandaloneSpirv-None-04641

If the `Scope` for memory is `Invocation`, then
`MemorySemantics` **must** use `Relaxed` memory order

* 
[](#VUID-StandaloneSpirv-None-04642) VUID-StandaloneSpirv-None-04642

`Scope` for [group operations](../chapters/shaders.html#shaders-group-operations) **must** be
limited to `Subgroup`

* 
[](#VUID-StandaloneSpirv-SubgroupVoteKHR-07951) VUID-StandaloneSpirv-SubgroupVoteKHR-07951

If none of the `SubgroupVoteKHR`, `GroupNonUniform`, or
`SubgroupBallotKHR` capabilities are declared, `Scope` for memory
**must** not be `Subgroup`

* 
[](#VUID-StandaloneSpirv-None-04643) VUID-StandaloneSpirv-None-04643

`Storage` `Class` **must** be limited to `UniformConstant`, `Input`,
`Uniform`, `Output`, `Workgroup`, `Private`, `Function`,
`PushConstant`, `Image`, `StorageBuffer`, `RayPayloadKHR`,
`IncomingRayPayloadKHR`, `HitAttributeKHR`, `CallableDataKHR`,
`IncomingCallableDataKHR`, `ShaderRecordBufferKHR`,
`PhysicalStorageBuffer`, or `TileImageEXT`

* 
[](#VUID-StandaloneSpirv-None-04644) VUID-StandaloneSpirv-None-04644

If the `Storage` `Class` is `Output`, then it **must** not be used in the
`GlCompute`, `RayGenerationKHR`, `IntersectionKHR`,
`AnyHitKHR`, `ClosestHitKHR`, `MissKHR`, or `CallableKHR`
`Execution` `Model`

* 
[](#VUID-StandaloneSpirv-None-04645) VUID-StandaloneSpirv-None-04645

If the `Storage` `Class` is `Workgroup`, then it **must** only be used in
the task, mesh, or compute `Execution` `Model`

* 
[](#VUID-StandaloneSpirv-None-08720) VUID-StandaloneSpirv-None-08720

If the `Storage` `Class` is `TileImageEXT`, then it **must** only be used
in the fragment execution model

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10865) VUID-StandaloneSpirv-MemorySemantics-10865

`MemorySemantics` **must** have at most one non-relaxed memory order bit
set (`Acquire`, `Release`, or `AcquireRelease`)

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10866) VUID-StandaloneSpirv-MemorySemantics-10866

`MemorySemantics` with `SequentiallyConsistent` memory order **must**
not be used in the Vulkan API

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10867) VUID-StandaloneSpirv-MemorySemantics-10867

`MemorySemantics` **must** not use `Acquire` or `AcquireRelease`
memory order with `OpAtomicStore`

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10868) VUID-StandaloneSpirv-MemorySemantics-10868

`MemorySemantics` **must** not use `Release` or `AcquireRelease`
memory order with `OpAtomicLoad`

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10869) VUID-StandaloneSpirv-MemorySemantics-10869

`MemorySemantics` **must** not use `Relaxed` memory order with
`OpMemoryBarrier`

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10870) VUID-StandaloneSpirv-MemorySemantics-10870

`MemorySemantics` with a non-relaxed memory order (`Acquire`,
`Release`, or `AcquireRelease`) **must** have at least one
Vulkan-supported storage class semantics bit set (`UniformMemory`,
`WorkgroupMemory`, `ImageMemory`, or `OutputMemory`)

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10871) VUID-StandaloneSpirv-MemorySemantics-10871

`MemorySemantics` with at least one Vulkan-supported storage class
semantics bit set (`UniformMemory`, `WorkgroupMemory`,
`ImageMemory`, or `OutputMemory`) **must** use a non-relaxed memory
order (`Acquire`, `Release`, or `AcquireRelease`)

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10872) VUID-StandaloneSpirv-MemorySemantics-10872

`MemorySemantics` with `MakeAvailable` bit set **must** use
`Release` or `AcquireRelease` memory order

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10873) VUID-StandaloneSpirv-MemorySemantics-10873

`MemorySemantics` with `MakeVisible` bit set **must** use
`Acquire` or `AcquireRelease` memory order

* 
[](#VUID-StandaloneSpirv-MemorySemantics-10874) VUID-StandaloneSpirv-MemorySemantics-10874

`MemorySemantics` with `Volatile` bit set **must** not be used with
barrier instructions (`OpControlBarrier` or `OpMemoryBarrier`)

* 
[](#VUID-StandaloneSpirv-UnequalMemorySemantics-10875) VUID-StandaloneSpirv-UnequalMemorySemantics-10875

`UnequalMemorySemantics` of `OpAtomicCompareExchange` **must** not
use `Release` or `AcquireRelease` memory order

* 
[](#VUID-StandaloneSpirv-UnequalMemorySemantics-10876) VUID-StandaloneSpirv-UnequalMemorySemantics-10876

`UnequalMemorySemantics` of `OpAtomicCompareExchange` **must** not
use a stronger memory order than the corresponding
`EqualMemorySemantics`

* 
[](#VUID-StandaloneSpirv-UnequalMemorySemantics-10877) VUID-StandaloneSpirv-UnequalMemorySemantics-10877

`UnequalMemorySemantics` of `OpAtomicCompareExchange` **must** not
have any Vulkan-supported storage class semantics bit set
(`UniformMemory`, `WorkgroupMemory`, `ImageMemory`, or
`OutputMemory`) unless this bit is also set in the corresponding
`EqualMemorySemantics`

* 
[](#VUID-StandaloneSpirv-UnequalMemorySemantics-10878) VUID-StandaloneSpirv-UnequalMemorySemantics-10878

`UnequalMemorySemantics` of `OpAtomicCompareExchange` **must** not
have `MakeVisible` bit set unless this bit is also set in the
corresponding `EqualMemorySemantics`

* 
[](#VUID-StandaloneSpirv-UnequalMemorySemantics-10879) VUID-StandaloneSpirv-UnequalMemorySemantics-10879

`UnequalMemorySemantics` of `OpAtomicCompareExchange` **must** have
`Volatile` bit set if and only if this bit is also set in the
corresponding `EqualMemorySemantics`

* 
[](#VUID-StandaloneSpirv-OpVariable-04651) VUID-StandaloneSpirv-OpVariable-04651

Any variable with an `Initializer` operand **must** have `Output`,
`Private`, `Function`, or `Workgroup` as its `Storage` `Class`
operand

* 
[](#VUID-StandaloneSpirv-OpVariable-04734) VUID-StandaloneSpirv-OpVariable-04734

Any variable with an `Initializer` operand and `Workgroup` as its
`Storage` `Class` operand **must** use `OpConstantNull` as the initializer

* 
[](#VUID-StandaloneSpirv-OpReadClockKHR-04652) VUID-StandaloneSpirv-OpReadClockKHR-04652

`Scope` for `OpReadClockKHR` **must** be limited to `Subgroup` or
`Device`

* 
[](#VUID-StandaloneSpirv-OriginLowerLeft-04653) VUID-StandaloneSpirv-OriginLowerLeft-04653

The `OriginLowerLeft` `Execution` `Mode` **must** not be used; fragment
entry points **must** declare `OriginUpperLeft`

* 
[](#VUID-StandaloneSpirv-PixelCenterInteger-04654) VUID-StandaloneSpirv-PixelCenterInteger-04654

The `PixelCenterInteger` `Execution` `Mode` **must** not be used (pixels
are always centered at half-integer coordinates)

* 
[](#VUID-StandaloneSpirv-UniformConstant-04655) VUID-StandaloneSpirv-UniformConstant-04655

Any variable in the `UniformConstant` `Storage` `Class` **must** be typed
as either `OpTypeImage`, `OpTypeSampler`, `OpTypeSampledImage`,
`OpTypeAccelerationStructureKHR`, `OpTypeTensorARM` or an array of
one of these types

* 
[](#VUID-StandaloneSpirv-Uniform-06807) VUID-StandaloneSpirv-Uniform-06807

Any variable in the `Uniform` or `StorageBuffer` `Storage` `Class`
**must** be typed as `OpTypeStruct` or an array of this type

* 
[](#VUID-StandaloneSpirv-PushConstant-06808) VUID-StandaloneSpirv-PushConstant-06808

Any variable in the `PushConstant` `Storage` `Class` **must** be typed as
`OpTypeStruct`

* 
[](#VUID-StandaloneSpirv-OpTypeImage-04656) VUID-StandaloneSpirv-OpTypeImage-04656

`OpTypeImage` **must** declare a scalar 32-bit float, 64-bit integer, or
32-bit integer type for the “Sampled Type” (`RelaxedPrecision` **can**
be applied to a sampling instruction and to the variable holding the
result of a sampling instruction)

* 
[](#VUID-StandaloneSpirv-OpTypeImage-04657) VUID-StandaloneSpirv-OpTypeImage-04657

`OpTypeImage` **must** have a “Sampled” operand of 1 (sampled image)
or 2 (storage image)

* 
[](#VUID-StandaloneSpirv-OpTypeSampledImage-06671) VUID-StandaloneSpirv-OpTypeSampledImage-06671

`OpTypeSampledImage` **must** have a `OpTypeImage` with a “Sampled”
operand of 1 (sampled image)

* 
[](#VUID-StandaloneSpirv-Image-04965) VUID-StandaloneSpirv-Image-04965

The [SPIR-V Type](#spirv-type) of the `Image` `Format` operand of
an `OpTypeImage` **must** match the `Sampled` `Type`, as defined
in [Image Format and Type Matching](#spirvenv-format-type-matching)

* 
[](#VUID-StandaloneSpirv-OpImageTexelPointer-04658) VUID-StandaloneSpirv-OpImageTexelPointer-04658

If an `OpImageTexelPointer` is used in an atomic operation, the image
type of the `image` parameter to `OpImageTexelPointer` **must** have
an image format of `R64i`, `R64ui`, `R32f`, `R32i`, or
`R32ui`

* 
[](#VUID-StandaloneSpirv-OpUntypedImageTexelPointerEXT-11416) VUID-StandaloneSpirv-OpUntypedImageTexelPointerEXT-11416

If an `OpUntypedImageTexelPointerEXT` instruction is used in an
atomic operation, the image type operand **must** have an image format of
`R64i`, `R64ui`, `R32f`, `R32i`, or `R32ui`

* 
[](#VUID-StandaloneSpirv-OpImageQuerySizeLod-04659) VUID-StandaloneSpirv-OpImageQuerySizeLod-04659

`OpImageQuerySizeLod`, `OpImageQueryLod`, and
`OpImageQueryLevels` **must** only consume an “Image” operand whose
type has its “Sampled” operand set to 1

* 
[](#VUID-StandaloneSpirv-OpTypeImage-09638) VUID-StandaloneSpirv-OpTypeImage-09638

An `OpTypeImage` **must** not have a “Dim” operand of `Rect`

* 
[](#VUID-StandaloneSpirv-OpTypeImage-06214) VUID-StandaloneSpirv-OpTypeImage-06214

An `OpTypeImage` with a “Dim” operand of `SubpassData` **must**
have an “Arrayed” operand of 0 (non-arrayed) and a “Sampled” operand
of 2 (storage image)

* 
[](#VUID-StandaloneSpirv-SubpassData-04660) VUID-StandaloneSpirv-SubpassData-04660

The (u,v) coordinates used for a `SubpassData` **must** be the
 of a constant vector (0,0)

* 
[](#VUID-StandaloneSpirv-OpTypeImage-06924) VUID-StandaloneSpirv-OpTypeImage-06924

Objects of types `OpTypeImage`, `OpTypeSampler`,
`OpTypeSampledImage`, `OpTypeAccelerationStructureKHR`,
`OpTypeTensorARM`, and arrays of these types **must** not be stored to
or modified

* 
[](#VUID-StandaloneSpirv-Uniform-06925) VUID-StandaloneSpirv-Uniform-06925

Any variable in the `Uniform` `Storage` `Class` decorated as `Block`
**must** not be stored to or modified

* 
[](#VUID-StandaloneSpirv-Offset-04865) VUID-StandaloneSpirv-Offset-04865

Any image instruction which uses an `Offset`, `ConstOffset`, or
`ConstOffsets` image operand, **must** only consume a “Sampled Image”
operand whose type has its “Sampled” operand set to 1

* 
[](#VUID-StandaloneSpirv-OpImageGather-04664) VUID-StandaloneSpirv-OpImageGather-04664

The “Component” operand of `OpImageGather`, and
`OpImageSparseGather` **must** be the  of a constant instruction

* 
[](#VUID-StandaloneSpirv-OpImage-04777) VUID-StandaloneSpirv-OpImage-04777

`OpImage*Dref*` instructions **must** not consume an image whose `Dim`
is 3D

* 
[](#VUID-StandaloneSpirv-None-04667) VUID-StandaloneSpirv-None-04667

If the `DescriptorHeapEXT` capability is not declared, structure
types **must** not contain opaque types

* 
[](#VUID-StandaloneSpirv-DescriptorHeapEXT-11482) VUID-StandaloneSpirv-DescriptorHeapEXT-11482

If the `DescriptorHeapEXT` capability is declared, structure types
**must** not contain opaque types other than descriptors

* 
[](#VUID-StandaloneSpirv-BuiltIn-04668) VUID-StandaloneSpirv-BuiltIn-04668

Any `BuiltIn` decoration not listed in
[Built-In Variables](../chapters/interfaces.html#interfaces-builtin-variables) **must** not be used

* 
[](#VUID-StandaloneSpirv-OpEntryPoint-09658) VUID-StandaloneSpirv-OpEntryPoint-09658

For a given `OpEntryPoint`, any `BuiltIn` decoration **must** not be
used more than once by the `Input` interface

* 
[](#VUID-StandaloneSpirv-OpEntryPoint-09659) VUID-StandaloneSpirv-OpEntryPoint-09659

For a given `OpEntryPoint`, any `BuiltIn` decoration **must** not be
used more than once by the `Output` interface

* 
[](#VUID-StandaloneSpirv-Location-06672) VUID-StandaloneSpirv-Location-06672

The `Location` or `Component` decorations **must** only be used with
the `Input`, `Output`, `RayPayloadKHR`,
`IncomingRayPayloadKHR`, `HitAttributeKHR`,
`HitObjectAttributeNV`, `CallableDataKHR`,
`IncomingCallableDataKHR`, or `ShaderRecordBufferKHR` storage
classes

* 
[](#VUID-StandaloneSpirv-Location-04915) VUID-StandaloneSpirv-Location-04915

The `Location` or `Component` decorations **must** not be used with
`BuiltIn`

* 
[](#VUID-StandaloneSpirv-Location-04916) VUID-StandaloneSpirv-Location-04916

The `Location` decorations **must** be used on
[user-defined variables](../chapters/interfaces.html#interfaces-iointerfaces-user)

* 
[](#VUID-StandaloneSpirv-Location-04917) VUID-StandaloneSpirv-Location-04917

If a [user-defined variable](../chapters/interfaces.html#interfaces-iointerfaces-user) is not a
pointer to a `Block` decorated `OpTypeStruct`, then the variable
**must** have a `Location` decoration

* 
[](#VUID-StandaloneSpirv-Location-04918) VUID-StandaloneSpirv-Location-04918

If a [user-defined variable](../chapters/interfaces.html#interfaces-iointerfaces-user) has a
`Location` decoration, and the variable is a pointer to a
`OpTypeStruct`, then the members of that structure **must** not have
`Location` decorations

* 
[](#VUID-StandaloneSpirv-Location-04919) VUID-StandaloneSpirv-Location-04919

If a [user-defined variable](../chapters/interfaces.html#interfaces-iointerfaces-user) does not
have a `Location` decoration, and the variable is a pointer to a
`Block` decorated `OpTypeStruct`, then each member of the struct
**must** have a `Location` decoration

* 
[](#VUID-StandaloneSpirv-Component-04920) VUID-StandaloneSpirv-Component-04920

The `Component` decoration value **must** not be greater than 3

* 
[](#VUID-StandaloneSpirv-Component-04921) VUID-StandaloneSpirv-Component-04921

If the `Component` decoration is used on a variable that has a vector
type with a `Component` `Type` with a `Width` that is less than
or equal to 32, the sum of its `Component` `Count` and the
`Component` decoration value **must** be less than or equal to 4

* 
[](#VUID-StandaloneSpirv-Component-04922) VUID-StandaloneSpirv-Component-04922

If the `Component` decoration is used on a variable that has a vector
type with a `Component` `Type` with a `Width` that is equal to
64, the sum of two times its `Component` `Count` and the
`Component` decoration value **must** be less than or equal to 4

* 
[](#VUID-StandaloneSpirv-Component-04923) VUID-StandaloneSpirv-Component-04923

The `Component` decorations value **must** not be 1 or 3 for scalar or
two-component 64-bit data types

* 
[](#VUID-StandaloneSpirv-Component-07703) VUID-StandaloneSpirv-Component-07703

The `Component` decorations **must** not be used for a 64-bit vector
type with more than two components

* 
[](#VUID-StandaloneSpirv-Component-10583) VUID-StandaloneSpirv-Component-10583

The `Component` decorations **must** not be used with any type that is
not a scalar, vector, array of scalars or vectors, or an array of arrays
of scalars or vectors

* 
[](#VUID-StandaloneSpirv-Execution-10584) VUID-StandaloneSpirv-Execution-10584

If the `Execution` `Model` of an entry point is not
`TessellationControl` or `Geometry`, its interface definition
**must** not include any variables in the `Input` storage class
decorated with `Component` that are arrays of arrays of scalars or
vectors

* 
[](#VUID-StandaloneSpirv-Execution-10585) VUID-StandaloneSpirv-Execution-10585

If the `Execution` `Model` of an entry point is not `MeshNV`,
its interface definition **must** not include any variables in the
`Output` storage class decorated with `Component` that are arrays
of arrays of scalars or vectors

* 
[](#VUID-StandaloneSpirv-Output-10586) VUID-StandaloneSpirv-Output-10586

Variables in the `Output` storage class in the `Vertex`,
`TessellationControl`, `TessellationEvaluation`, or `Geometry`
execution model **must** not have overlapping `Component` and
`Location` decorations as defined by
[Location and Component Assignment](../chapters/interfaces.html#interfaces-iointerfaces-locations)

* 
[](#VUID-StandaloneSpirv-Output-10587) VUID-StandaloneSpirv-Output-10587

Variables in the `Output` storage class in the `Fragment`
execution model **must** not have both identical `Index` decorations and
overlapping `Component` and `Location` decorations as defined by
[Location and Component Assignment](../chapters/interfaces.html#interfaces-iointerfaces-locations)

* 
[](#VUID-StandaloneSpirv-Input-10588) VUID-StandaloneSpirv-Input-10588

Variables in the `Input` storage class in the
`TessellationControl`, `TessellationEvaluation`, `Geometry`, or
`Fragment` execution model **must** not have overlapping `Component`
and `Location` decorations as defined by
[Location and Component Assignment](../chapters/interfaces.html#interfaces-iointerfaces-locations)

* 
[](#VUID-StandaloneSpirv-Input-10604) VUID-StandaloneSpirv-Input-10604

Any variable in the `Input` storage class in the `Fragment`
execution model **must** not have an assigned `Location` shared with
another variable with different decorations for `PerVertexKHR`,
`Flat`, `NoPerspective`, `Sample`, or `Centroid`

* 
[](#VUID-StandaloneSpirv-Input-09557) VUID-StandaloneSpirv-Input-09557

The pointers of any `Input` or `Output`
[Interface user-defined variables](../chapters/interfaces.html#interfaces-iointerfaces-user) **must**
not contain any `PhysicalStorageBuffer` `Storage` `Class` pointers

* 
[](#VUID-StandaloneSpirv-None-10684) VUID-StandaloneSpirv-None-10684

All variables **must** have valid explicit layout decorations
[as described in Shader    Interfaces](../chapters/interfaces.html#interfaces-explicit-layout-decorations)

* 
[](#VUID-StandaloneSpirv-GLSLShared-04669) VUID-StandaloneSpirv-GLSLShared-04669

The `GLSLShared` and `GLSLPacked` decorations **must** not be used

* 
[](#VUID-StandaloneSpirv-TessLevelInner-10880) VUID-StandaloneSpirv-TessLevelInner-10880

Any variable decorated with `TessLevelInner` or `TessLevelOuter`
**must** also be decorated with `Patch`

* 
[](#VUID-StandaloneSpirv-Flat-04670) VUID-StandaloneSpirv-Flat-04670

The `Flat`, `NoPerspective`, `Sample`, and `Centroid`
decorations **must** only be used on variables with the `Output` or
`Input` `Storage` `Class`

* 
[](#VUID-StandaloneSpirv-Flat-06201) VUID-StandaloneSpirv-Flat-06201

The `Flat`, `NoPerspective`, `Sample`, and `Centroid`
decorations **must** not be used on variables with the `Output` storage
class in a fragment shader

* 
[](#VUID-StandaloneSpirv-Flat-06202) VUID-StandaloneSpirv-Flat-06202

The `Flat`, `NoPerspective`, `Sample`, and `Centroid`
decorations **must** not be used on variables with the `Input` storage
class in a vertex shader

* 
[](#VUID-StandaloneSpirv-PerVertexKHR-06777) VUID-StandaloneSpirv-PerVertexKHR-06777

The `PerVertexKHR` decoration **must** only be used on variables with
the `Input` `Storage` `Class` in a fragment shader

* 
[](#VUID-StandaloneSpirv-Flat-04744) VUID-StandaloneSpirv-Flat-04744

Any variable with integer or double-precision floating-point type and
with `Input` `Storage` `Class` in a fragment shader, **must** be decorated
`Flat`

* 
[](#VUID-StandaloneSpirv-ViewportRelativeNV-04672) VUID-StandaloneSpirv-ViewportRelativeNV-04672

The `ViewportRelativeNV` decoration **must** only be used on a variable
decorated with `Layer` in the vertex, tessellation evaluation, or
geometry shader stages

* 
[](#VUID-StandaloneSpirv-ViewportRelativeNV-04673) VUID-StandaloneSpirv-ViewportRelativeNV-04673

The `ViewportRelativeNV` decoration **must** not be used unless a
variable decorated with one of `ViewportIndex` or `ViewportMaskNV`
is also statically used by the same `OpEntryPoint`

* 
[](#VUID-StandaloneSpirv-ViewportMaskNV-04674) VUID-StandaloneSpirv-ViewportMaskNV-04674

The `ViewportMaskNV` and `ViewportIndex` decorations **must** not
both be statically used by one or more `OpEntryPoint`’s that form the
[pre-rasterization shader    stages](../chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization) of a graphics pipeline

* 
[](#VUID-StandaloneSpirv-FPRoundingMode-04675) VUID-StandaloneSpirv-FPRoundingMode-04675

Rounding modes other than round-to-nearest-even and round-towards-zero
**must** not be used for the `FPRoundingMode` decoration

* 
[](#VUID-StandaloneSpirv-Invariant-04677) VUID-StandaloneSpirv-Invariant-04677

Variables decorated with `Invariant` and variables with structure
types that have any members decorated with `Invariant` **must** be in
the `Output` or `Input` `Storage` `Class`, `Invariant` used on an
`Input` `Storage` `Class` variable or structure member has no effect

* 
[](#VUID-StandaloneSpirv-VulkanMemoryModel-04678) VUID-StandaloneSpirv-VulkanMemoryModel-04678

 If the `VulkanMemoryModel` capability
is not declared, the `Volatile` decoration **must** be used on any
variable declaration that includes one of the `SMIDNV`,
`WarpIDNV`, `SubgroupSize`, `SubgroupLocalInvocationId`,
`SubgroupEqMask`, `SubgroupGeMask`, `SubgroupGtMask`,
`SubgroupLeMask`, or `SubgroupLtMask` `BuiltIn` decorations
when used in the ray generation, closest hit, miss, intersection, or
callable shaders, or with the `RayTmaxKHR` `Builtin` decoration
when used in an intersection shader

* 
[](#VUID-StandaloneSpirv-VulkanMemoryModel-04679) VUID-StandaloneSpirv-VulkanMemoryModel-04679

If the `VulkanMemoryModel` capability is declared, the `OpLoad`
instruction **must** use `MemorySemantics` with the `Volatile` flag
when it accesses into any variable that includes one of the `SMIDNV`,
`WarpIDNV`, `SubgroupSize`, `SubgroupLocalInvocationId`,
`SubgroupEqMask`, `SubgroupGeMask`, `SubgroupGtMask`,
`SubgroupLeMask`, or `SubgroupLtMask` `BuiltIn` decorations
when used in the ray generation, closest hit, miss, intersection, or
callable shaders, or with the `RayTmaxKHR` `Builtin` decoration
when used in an intersection shader

* 
[](#VUID-StandaloneSpirv-OpTypeRuntimeArray-04680) VUID-StandaloneSpirv-OpTypeRuntimeArray-04680

`OpTypeRuntimeArray` **must** only be instantiated by a variable as:

the last member of a `Block`-decorated `OpTypeStruct` in
`StorageBuffer` or `PhysicalStorageBuffer` storage `Storage` `Class`

* 
`BufferBlock`-decorated `OpTypeStruct` in the `Uniform`
storage `Storage` `Class`

* 
the last member of a `Block`-decorated `OpTypeStruct` in the
`Uniform` storage `Storage` `Class`

* 
the outermost dimension of an arrayed variable in the
`StorageBuffer`, `Uniform`, or `UniformConstant` storage
`Storage` `Class`

* 
the `NodePayloadAMDX` storage `Storage` `Class` when the
`CoalescingAMDX` `Execution` `Mode` is specified

[](#VUID-StandaloneSpirv-OpArrayLength-11805) VUID-StandaloneSpirv-OpArrayLength-11805

`OpArrayLength` and `OpUntypedArrayLengthKHR` **must** not be used
with an `OpTypeRuntimeArray` that is the last member of a
`Block`-decorated `OpTypeStruct` in the `Uniform` storage
`Storage` `Class`

[](#VUID-StandaloneSpirv-Function-04681) VUID-StandaloneSpirv-Function-04681

A type *T* that is an array sized with a specialization constant **must**
neither be, nor be contained in, the type *T2* of a variable *V*, unless
either: a) *T* is equal to *T2*, b) *V* is declared in the
`Function`, or `Private` `Storage` `Class`, c) *V* is a non-Block
variable in the `Workgroup` `Storage` `Class`, or d) *V* is an interface
variable with an additional level of arrayness,
[as described in interface    matching](../chapters/interfaces.html#interfaces-iointerfaces-matching), and *T* is the member type of the array type *T2*

[](#VUID-StandaloneSpirv-Function-12294) VUID-StandaloneSpirv-Function-12294

A type *T* that is a vector sized with a specialization constant **must**
neither be, nor be contained in, the type *T2* of a variable *V*, unless
either: a) *T* is equal to *T2*, b) *V* is declared in the
`Function`, or `Private` `Storage` `Class`, c) *V* is a non-Block
variable in the `Workgroup` `Storage` `Class`, or d) *V* is an interface
variable with an additional level of arrayness,
[as described in interface    matching](../chapters/interfaces.html#interfaces-iointerfaces-matching), and *T* is the member type of the array type *T2*

[](#VUID-StandaloneSpirv-OpControlBarrier-04682) VUID-StandaloneSpirv-OpControlBarrier-04682

If `OpControlBarrier` is used in ray generation, intersection,
any-hit, closest hit, miss, fragment, vertex, tessellation evaluation,
or geometry shaders, the execution Scope **must** be `Subgroup`

[](#VUID-StandaloneSpirv-None-10685) VUID-StandaloneSpirv-None-10685

Either a `TileShadingRateQCOM`, `LocalSize`, or `LocalSizeId`
`Execution` `Mode`, or an object decorated with the `WorkgroupSize`
decoration **must** be specified for each entry point with a task, mesh, or
compute `Execution` `Model`

[](#VUID-StandaloneSpirv-DerivativeGroupQuadsNV-04684) VUID-StandaloneSpirv-DerivativeGroupQuadsNV-04684

For compute shaders using the `DerivativeGroupQuadsNV` execution
mode, the first two dimensions of the local workgroup size **must** be a
multiple of two

[](#VUID-StandaloneSpirv-DerivativeGroupLinearNV-04778) VUID-StandaloneSpirv-DerivativeGroupLinearNV-04778

For compute shaders using the `DerivativeGroupLinearNV` execution
mode, the product of the dimensions of the local workgroup size **must** be
a multiple of four

[](#VUID-StandaloneSpirv-DerivativeGroupQuadsKHR-10151) VUID-StandaloneSpirv-DerivativeGroupQuadsKHR-10151

For compute, mesh, or task shaders using the
`DerivativeGroupQuadsKHR` execution mode, the first two dimensions of
the local workgroup size **must** be a multiple of two

[](#VUID-StandaloneSpirv-DerivativeGroupLinearKHR-10152) VUID-StandaloneSpirv-DerivativeGroupLinearKHR-10152

For compute, mesh, or task shaders using the
`DerivativeGroupLinearKHR` execution mode, the product of the
dimensions of the local workgroup size **must** be a multiple of four

[](#VUID-StandaloneSpirv-OpGroupNonUniformBallotBitCount-04685) VUID-StandaloneSpirv-OpGroupNonUniformBallotBitCount-04685

If `OpGroupNonUniformBallotBitCount` is used, the group operation
**must** be limited to `Reduce`, `InclusiveScan`, or
`ExclusiveScan`

[](#VUID-StandaloneSpirv-None-04686) VUID-StandaloneSpirv-None-04686

The *Pointer* operand of all atomic instructions **must** have a
`Storage` `Class` limited to `Uniform`, `Workgroup`, `Image`,
`StorageBuffer`, `PhysicalStorageBuffer`, or
`TaskPayloadWorkgroupEXT`

[](#VUID-StandaloneSpirv-Offset-04687) VUID-StandaloneSpirv-Offset-04687

Output variables or block members decorated with `Offset` that have a
64-bit type, or a composite type containing a 64-bit type, **must** specify
an `Offset` value aligned to a 8 byte boundary

[](#VUID-StandaloneSpirv-Offset-04689) VUID-StandaloneSpirv-Offset-04689

The size of any output block containing any member decorated with
`Offset` that is a 64-bit type **must** be a multiple of 8

[](#VUID-StandaloneSpirv-Offset-04690) VUID-StandaloneSpirv-Offset-04690

The first member of an output block specifying a `Offset` decoration
**must** specify a `Offset` value that is aligned to an 8 byte boundary
if that block contains any member decorated with `Offset` and is a
64-bit type

[](#VUID-StandaloneSpirv-Offset-04691) VUID-StandaloneSpirv-Offset-04691

Output variables or block members decorated with `Offset` that have a
32-bit type, or a composite type contains a 32-bit type, **must** specify
an `Offset` value aligned to a 4 byte boundary

[](#VUID-StandaloneSpirv-Offset-04692) VUID-StandaloneSpirv-Offset-04692

Output variables, blocks, or block members decorated with `Offset`
**must** only contain base types that have components that are either
32-bit or 64-bit in size

[](#VUID-StandaloneSpirv-Offset-04716) VUID-StandaloneSpirv-Offset-04716

Only variables or block members in the output interface decorated with
`Offset` **can** be captured for transform feedback, and those variables
or block members **must** also be decorated with `XfbBuffer` and
`XfbStride`, or inherit `XfbBuffer` and `XfbStride` decorations
from a block containing them

[](#VUID-StandaloneSpirv-XfbBuffer-04693) VUID-StandaloneSpirv-XfbBuffer-04693

All variables or block members in the output interface of the entry
point being compiled decorated with a specific `XfbBuffer` value
**must** all be decorated with identical `XfbStride` values

[](#VUID-StandaloneSpirv-Stream-04694) VUID-StandaloneSpirv-Stream-04694

If any variables or block members in the output interface of the entry
point being compiled are decorated with `Stream`, then all variables
belonging to the same `XfbBuffer` **must** specify the same `Stream`
value

[](#VUID-StandaloneSpirv-XfbBuffer-04696) VUID-StandaloneSpirv-XfbBuffer-04696

For any two variables or block members in the output interface of the
entry point being compiled with the same `XfbBuffer` value, the
ranges determined by the `Offset` decoration and the size of the type
**must** not overlap

[](#VUID-StandaloneSpirv-XfbBuffer-04697) VUID-StandaloneSpirv-XfbBuffer-04697

All block members in the output interface of the entry point being
compiled that are in the same block and have a declared or inherited
`XfbBuffer` decoration **must** specify the same `XfbBuffer` value

[](#VUID-StandaloneSpirv-RayPayloadKHR-04698) VUID-StandaloneSpirv-RayPayloadKHR-04698

`RayPayloadKHR` `Storage` `Class` **must** only be used in ray generation,
closest hit or miss shaders

[](#VUID-StandaloneSpirv-IncomingRayPayloadKHR-04699) VUID-StandaloneSpirv-IncomingRayPayloadKHR-04699

`IncomingRayPayloadKHR` `Storage` `Class` **must** only be used in closest
hit, any-hit, or miss shaders

[](#VUID-StandaloneSpirv-IncomingRayPayloadKHR-04700) VUID-StandaloneSpirv-IncomingRayPayloadKHR-04700

There **must** be at most one variable with the `IncomingRayPayloadKHR`
`Storage` `Class` in the input interface of an entry point

[](#VUID-StandaloneSpirv-HitAttributeKHR-04701) VUID-StandaloneSpirv-HitAttributeKHR-04701

`HitAttributeKHR` `Storage` `Class` **must** only be used in intersection,
any-hit, or closest hit shaders

[](#VUID-StandaloneSpirv-HitAttributeKHR-04702) VUID-StandaloneSpirv-HitAttributeKHR-04702

There **must** be at most one variable with the `HitAttributeKHR`
`Storage` `Class` in the input interface of an entry point

[](#VUID-StandaloneSpirv-HitAttributeKHR-04703) VUID-StandaloneSpirv-HitAttributeKHR-04703

A variable with `HitAttributeKHR` `Storage` `Class` **must** only be
written to in an intersection shader

[](#VUID-StandaloneSpirv-CallableDataKHR-04704) VUID-StandaloneSpirv-CallableDataKHR-04704

`CallableDataKHR` `Storage` `Class` **must** only be used in ray
generation, closest hit, miss, and callable shaders

[](#VUID-StandaloneSpirv-IncomingCallableDataKHR-04705) VUID-StandaloneSpirv-IncomingCallableDataKHR-04705

`IncomingCallableDataKHR` `Storage` `Class` **must** only be used in
callable shaders

[](#VUID-StandaloneSpirv-IncomingCallableDataKHR-04706) VUID-StandaloneSpirv-IncomingCallableDataKHR-04706

There **must** be at most one variable with the
`IncomingCallableDataKHR` `Storage` `Class` in the input interface of an
entry point

[](#VUID-StandaloneSpirv-ShaderRecordBufferKHR-07119) VUID-StandaloneSpirv-ShaderRecordBufferKHR-07119

`ShaderRecordBufferKHR` `Storage` `Class` **must** only be used in ray
generation, intersection, any-hit, closest hit, callable, or miss
shaders

[](#VUID-StandaloneSpirv-Base-07650) VUID-StandaloneSpirv-Base-07650

The `Base` operand of `OpPtrAccessChain` or
`OpUntypedPtrAccessChainKHR` **must** have a storage class of
`Workgroup`, `StorageBuffer`, or `PhysicalStorageBuffer`

[](#VUID-StandaloneSpirv-Base-07651) VUID-StandaloneSpirv-Base-07651

If the `Base` operand of `OpPtrAccessChain` or
`OpUntypedPtrAccessChainKHR` has a `Workgroup` `Storage` `Class`,
then the `VariablePointers` capability **must** be declared

[](#VUID-StandaloneSpirv-Base-07652) VUID-StandaloneSpirv-Base-07652

If the `Base` operand of `OpPtrAccessChain` or
`OpUntypedPtrAccessChainKHR` has a `StorageBuffer` `Storage` `Class`,
then the `VariablePointers` or `VariablePointersStorageBuffer`
capability **must** be declared

[](#VUID-StandaloneSpirv-OpUntypedVariableKHR-11167) VUID-StandaloneSpirv-OpUntypedVariableKHR-11167

Any `OpUntypedVariableKHR` with a `Storage` `Class` other than
`UniformConstant` **must** have a `Data` `Type` operand specified

[](#VUID-StandaloneSpirv-OpUntypedVariableKHR-11347) VUID-StandaloneSpirv-OpUntypedVariableKHR-11347

Any `OpUntypedVariableKHR` in the `UniformConstant` storage class
without a `Data` `Type` **must** be decorated with
`SamplerHeapEXT` or `ResourceHeapEXT`

[](#VUID-StandaloneSpirv-PhysicalStorageBuffer64-04708) VUID-StandaloneSpirv-PhysicalStorageBuffer64-04708

If the `PhysicalStorageBuffer64` addressing model is enabled, all
instructions that support memory access operands and that use a physical
pointer **must** include the `Aligned` operand

[](#VUID-StandaloneSpirv-PhysicalStorageBuffer64-04709) VUID-StandaloneSpirv-PhysicalStorageBuffer64-04709

If the `PhysicalStorageBuffer64` addressing model is enabled, any
access chain instruction that accesses into a `RowMajor` matrix **must**
only be used as the `Pointer` operand to `OpLoad` or `OpStore`

[](#VUID-StandaloneSpirv-PhysicalStorageBuffer64-04710) VUID-StandaloneSpirv-PhysicalStorageBuffer64-04710

If the `PhysicalStorageBuffer64` addressing model is enabled,
`OpConvertUToPtr` and `OpConvertPtrToU` **must** use an integer type
whose `Width` is 64

[](#VUID-StandaloneSpirv-PhysicalStorageBuffer64-06314) VUID-StandaloneSpirv-PhysicalStorageBuffer64-06314

If the `PhysicalStorageBuffer64` addressing model is enabled any load
or store through a physical pointer type **must** have an `Aligned`
operand which is a multiple of the size of the largest scalar type in
the pointed-to type

[](#VUID-StandaloneSpirv-OpTypeForwardPointer-04711) VUID-StandaloneSpirv-OpTypeForwardPointer-04711

`OpTypeForwardPointer` **must** have a `Storage` `Class` of
`PhysicalStorageBuffer`

[](#VUID-StandaloneSpirv-OpVariable-06673) VUID-StandaloneSpirv-OpVariable-06673

There **must** be at most one variable in the `PushConstant`
`Storage` `Class` listed in the `Interface` for each `OpEntryPoint`
unless the `PushConstantBanksNV` capability is declared

[](#VUID-StandaloneSpirv-OpEntryPoint-06674) VUID-StandaloneSpirv-OpEntryPoint-06674

Each `OpEntryPoint` **must** statically use at most one variable in the
`PushConstant` `Storage` `Class` unless the `PushConstantBanksNV`
capability is declared

[](#VUID-StandaloneSpirv-OpEntryPoint-08721) VUID-StandaloneSpirv-OpEntryPoint-08721

Each `OpEntryPoint` **must** not have more than one `Input` variable
assigned the same `Component` word inside a `Location` slot,
either explicitly or implicitly

[](#VUID-StandaloneSpirv-OpEntryPoint-08722) VUID-StandaloneSpirv-OpEntryPoint-08722

Each `OpEntryPoint` **must** not have more than one `Output` variable
assigned the same `Component` word inside a `Location` slot,
either explicitly or implicitly

[](#VUID-StandaloneSpirv-Result-04780) VUID-StandaloneSpirv-Result-04780

The `Result` `Type` operand of any `OpImageRead` or
`OpImageSparseRead` instruction **must** be a vector of four components

[](#VUID-StandaloneSpirv-PushConstant-06675) VUID-StandaloneSpirv-PushConstant-06675

Any variable in the `PushConstant` or `StorageBuffer` storage
class **must** be decorated as `Block`

[](#VUID-StandaloneSpirv-Uniform-06676) VUID-StandaloneSpirv-Uniform-06676

Any variable in the `Uniform` `Storage` `Class` **must** be decorated as
`Block` or `BufferBlock`

[](#VUID-StandaloneSpirv-UniformConstant-06677) VUID-StandaloneSpirv-UniformConstant-06677

Any variable in the `UniformConstant`, `StorageBuffer`, or
`Uniform` `Storage` `Class` **must** be decorated with `DescriptorSet`,
`Binding`, or `BuiltIn` with `SamplerHeapEXT` or
`ResourceHeapEXT`

[](#VUID-StandaloneSpirv-InputAttachmentIndex-06678) VUID-StandaloneSpirv-InputAttachmentIndex-06678

Variables decorated with `InputAttachmentIndex` **must** be in the
`UniformConstant` `Storage` `Class`

[](#VUID-StandaloneSpirv-DescriptorSet-06491) VUID-StandaloneSpirv-DescriptorSet-06491

If a variable is decorated by `DescriptorSet` or `Binding`, the
`Storage` `Class` **must** correspond to an entry in
[Shader Resource and    Storage Class Correspondence](../chapters/interfaces.html#interfaces-resources-storage-class-correspondence)

[](#VUID-StandaloneSpirv-Input-06778) VUID-StandaloneSpirv-Input-06778

Variables with a `Storage` `Class` of `Input` in a fragment shader stage
that are decorated with `PerVertexKHR` **must** be declared as arrays

[](#VUID-StandaloneSpirv-MeshEXT-07102) VUID-StandaloneSpirv-MeshEXT-07102

The module **must** not contain both an entry point that uses the
`TaskEXT` or `MeshEXT` `Execution` `Model` and an entry point that
uses the `TaskNV` or `MeshNV` `Execution` `Model`

[](#VUID-StandaloneSpirv-MeshEXT-07106) VUID-StandaloneSpirv-MeshEXT-07106

In mesh shaders using the `MeshEXT` `Execution` `Model`
`OpSetMeshOutputsEXT` **must** be called before any outputs are written

[](#VUID-StandaloneSpirv-MeshEXT-07107) VUID-StandaloneSpirv-MeshEXT-07107

In mesh shaders using the `MeshEXT` `Execution` `Model` all variables
declared in the `Output` `Storage` `Class` **must** not be read

[](#VUID-StandaloneSpirv-MeshEXT-07108) VUID-StandaloneSpirv-MeshEXT-07108

In mesh shaders using the `MeshEXT` `Execution` `Model` for
`OpSetMeshOutputsEXT` instructions, the “Vertex Count” and
“Primitive Count” operands **must** not depend on `ViewIndex`

[](#VUID-StandaloneSpirv-MeshEXT-07109) VUID-StandaloneSpirv-MeshEXT-07109

In mesh shaders using the `MeshEXT` `Execution` `Model` variables
decorated with `PrimitivePointIndicesEXT`,
`PrimitiveLineIndicesEXT`, or `PrimitiveTriangleIndicesEXT`
declared as an array **must** not be accessed by indices that depend on
`ViewIndex`

[](#VUID-StandaloneSpirv-MeshEXT-07110) VUID-StandaloneSpirv-MeshEXT-07110

In mesh shaders using the `MeshEXT` `Execution` `Model` any values
stored in variables decorated with `PrimitivePointIndicesEXT`,
`PrimitiveLineIndicesEXT`, or `PrimitiveTriangleIndicesEXT` **must**
not depend on `ViewIndex`

[](#VUID-StandaloneSpirv-MeshEXT-07111) VUID-StandaloneSpirv-MeshEXT-07111

In mesh shaders using the `MeshEXT` `Execution` `Model` variables in
workgroup or private `Storage` `Class` declared as or containing a
composite type **must** not be accessed by indices that depend on
`ViewIndex`

[](#VUID-StandaloneSpirv-MeshEXT-07330) VUID-StandaloneSpirv-MeshEXT-07330

In mesh shaders using the `MeshEXT` `Execution` `Model` the
`OutputVertices` `Execution` `Mode` **must** be greater than 0

[](#VUID-StandaloneSpirv-MeshEXT-07331) VUID-StandaloneSpirv-MeshEXT-07331

In mesh shaders using the `MeshEXT` `Execution` `Model` the
`OutputPrimitivesEXT` `Execution` `Mode` **must** be greater than 0

[](#VUID-StandaloneSpirv-Input-07290) VUID-StandaloneSpirv-Input-07290

Variables with a `Storage` `Class` of `Input` or `Output` and a type
of `OpTypeBool` **must** be decorated with the `BuiltIn` decoration

[](#VUID-StandaloneSpirv-TileImageEXT-08723) VUID-StandaloneSpirv-TileImageEXT-08723

The tile image variable declarations **must** obey the constraints on the
`TileImageEXT` `Storage` `Class` and the `Location` decoration
described in [Fragment Tile Image    Interface](../chapters/interfaces.html#interfaces-fragmenttileimage)

[](#VUID-StandaloneSpirv-None-08724) VUID-StandaloneSpirv-None-08724

The `TileImageEXT` `Storage` `Class` **must** only be used for declaring
tile image variables

[](#VUID-StandaloneSpirv-Pointer-08973) VUID-StandaloneSpirv-Pointer-08973

The `Storage` `Class` of the `Pointer` operand to
`OpCooperativeMatrixLoadKHR` or `OpCooperativeMatrixStoreKHR`
**must** be limited to `Workgroup`, `StorageBuffer`, or
`PhysicalStorageBuffer`

[](#VUID-StandaloneSpirv-OpTypeFloat-10370) VUID-StandaloneSpirv-OpTypeFloat-10370

Variables with a type of `OpTypeFloat` and an encoding of
`BFloat16KHR` **must** not be declared with a `Storage` `Class` of
`Input` or `Output`

[](#VUID-StandaloneSpirv-UniformBufferArrayDynamicIndexing-10127) VUID-StandaloneSpirv-UniformBufferArrayDynamicIndexing-10127

If the `UniformBufferArrayDynamicIndexing` capability is not
declared, and an instruction accesses memory through a uniform buffer,
the uniform buffer through which that memory is accessed **must** be
determined by [constant integral    expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-StandaloneSpirv-SampledImageArrayDynamicIndexing-10128) VUID-StandaloneSpirv-SampledImageArrayDynamicIndexing-10128

If the `SampledImageArrayDynamicIndexing` capability is not declared,
and an instruction accesses memory through a sampled image or sampler,
the sampled image or sampler through which that memory is accessed **must**
be determined by [constant    integral expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-StandaloneSpirv-StorageBufferArrayDynamicIndexing-10129) VUID-StandaloneSpirv-StorageBufferArrayDynamicIndexing-10129

If the `StorageBufferArrayDynamicIndexing` capability is not
declared, and an instruction accesses memory through a storage buffer,
the storage buffer through which that memory is accessed **must** be
determined by [constant integral    expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-StandaloneSpirv-StorageImageArrayDynamicIndexing-10130) VUID-StandaloneSpirv-StorageImageArrayDynamicIndexing-10130

If the `StorageImageArrayDynamicIndexing` capability is not declared,
and an instruction accesses memory through a storage image, the storage
image through which that memory is accessed **must** be determined by
[constant integral expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-StandaloneSpirv-InputAttachmentArrayDynamicIndexing-10131) VUID-StandaloneSpirv-InputAttachmentArrayDynamicIndexing-10131

If the `InputAttachmentArrayDynamicIndexing` capability is not
declared, and an instruction accesses memory through an input
attachment, the input attachment through which that memory is accessed
**must** be determined by [constant    integral expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-StandaloneSpirv-UniformTexelBufferArrayDynamicIndexing-10132) VUID-StandaloneSpirv-UniformTexelBufferArrayDynamicIndexing-10132

If the `UniformTexelBufferArrayDynamicIndexing` capability is not
declared, and an instruction accesses memory through a uniform texel
buffer, the uniform texel buffer through which that memory is accessed
**must** be determined by [constant    integral expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-StandaloneSpirv-StorageTexelBufferArrayDynamicIndexing-10133) VUID-StandaloneSpirv-StorageTexelBufferArrayDynamicIndexing-10133

If the `StorageTexelBufferArrayDynamicIndexing` capability is not
declared, and an instruction accesses memory through a storage texel
buffer, the storage texel buffer through which that memory is accessed
**must** be determined by [constant    integral expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-StandaloneSpirv-TileShadingQCOM-10686) VUID-StandaloneSpirv-TileShadingQCOM-10686

`TileShadingQCOM` capability **must** not be enabled in any stage other
than compute or fragment

[](#VUID-StandaloneSpirv-Execution-10687) VUID-StandaloneSpirv-Execution-10687

`Execution` `Mode` `NonCoherentTileAttachmentReadQCOM` **must**
not be used in any stage other than fragment

[](#VUID-StandaloneSpirv-Execution-10688) VUID-StandaloneSpirv-Execution-10688

`Execution` `Mode` `TileShadingRateQCOM` **must** not be used in
any stage other than compute

[](#VUID-StandaloneSpirv-TileAttachmentQCOM-10689) VUID-StandaloneSpirv-TileAttachmentQCOM-10689

If the `TileAttachmentQCOM` `Storage` `Class` is used, the
`TileShadingQCOM` capability **must** be enabled

[](#VUID-StandaloneSpirv-NonCoherentTileAttachmentReadQCOM-10690) VUID-StandaloneSpirv-NonCoherentTileAttachmentReadQCOM-10690

If the `NonCoherentTileAttachmentReadQCOM` `Execution` `Mode`
is used, the `TileShadingQCOM` capability **must** be enabled

[](#VUID-StandaloneSpirv-TileShadingRateQCOM-10691) VUID-StandaloneSpirv-TileShadingRateQCOM-10691

If the `TileShadingRateQCOM` `Execution` `Mode` is used, the
`TileShadingQCOM` capability **must** be enabled

[](#VUID-StandaloneSpirv-TileShadingRateQCOM-10692) VUID-StandaloneSpirv-TileShadingRateQCOM-10692

If the `TileShadingRateQCOM` `Execution` `Mode` is used,
`LocalSize` and `LocalSizeId` `Execution` `Mode` **must** not be
specified

[](#VUID-StandaloneSpirv-OpTypeImage-10693) VUID-StandaloneSpirv-OpTypeImage-10693

`OpTypeImage` variables in the `TileAttachmentQCOM` `Storage`
`Class` **must** have `Dim` equal to `2D`

[](#VUID-StandaloneSpirv-OpTypeImage-10694) VUID-StandaloneSpirv-OpTypeImage-10694

`OpTypeImage` variables in the `TileAttachmentQCOM` `Storage`
`Class` **must** `Sampled` equal to `1` or `2`

[](#VUID-StandaloneSpirv-TileAttachmentQCOM-10695) VUID-StandaloneSpirv-TileAttachmentQCOM-10695

Any variable in the `TileAttachmentQCOM` `Storage` `Class`
**must** be decorated with `DescriptorSet` and `Binding`

[](#VUID-StandaloneSpirv-TileAttachmentQCOM-10696) VUID-StandaloneSpirv-TileAttachmentQCOM-10696

Any variable in the `TileAttachmentQCOM` `Storage` `Class`
**must** not be decorated with `Component` decoration

[](#VUID-StandaloneSpirv-TileAttachmentQCOM-10697) VUID-StandaloneSpirv-TileAttachmentQCOM-10697

An OpTypeImage variables in the `TileAttachmentQCOM` `Storage`
`Class` **must** not be consumed by an `OpImageQuery*` instruction

[](#VUID-StandaloneSpirv-OpTypeFloat-10823) VUID-StandaloneSpirv-OpTypeFloat-10823

Variables with a type of `OpTypeFloat` and an encoding of
`Float8E4M3EXT` or `Float8E5M2EXT` **must** not be declared with a
`Storage` `Class` of `Input` or `Output`

[](#VUID-StandaloneSpirv-OpGraphInputARM-09931) VUID-StandaloneSpirv-OpGraphInputARM-09931

The `InputIndex` and `ElementIndex` operands to
`OpGraphInputARM` **must** be the  of a constant instruction

[](#VUID-StandaloneSpirv-OpGraphSetOutputARM-09932) VUID-StandaloneSpirv-OpGraphSetOutputARM-09932

The `OutputIndex` and `ElementIndex` operands to
`OpGraphSetOutputARM` **must** be the  of a constant instruction

[](#VUID-StandaloneSpirv-Result-11336) VUID-StandaloneSpirv-Result-11336

If the `Result` `Type` operand of `OpLoad` is
`OpTypeSampler`, `Pointer` **must** be derived from a variable
decorated with `Binding` and `DescriptorSet`, or decorated with
`BuiltIn` and `SamplerHeapEXT`

[](#VUID-StandaloneSpirv-Result-11337) VUID-StandaloneSpirv-Result-11337

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
`Pointer` **must** be derived from a variable decorated with
`Binding` and `DescriptorSet`, or decorated with `BuiltIn` and
`ResourceHeapEXT`

[](#VUID-StandaloneSpirv-Result-11339) VUID-StandaloneSpirv-Result-11339

If the `Result` `Type` operand of `OpLoad` is
`OpTypeAccelerationStructureKHR`, and `Pointer` is not in the
`Private` or `Function` `Storage` `Class`, `Pointer` **must** be
derived from a variable decorated with `Binding` and
`DescriptorSet`, or decorated with `BuiltIn` and
`ResourceHeapEXT`

[](#VUID-StandaloneSpirv-Result-11346) VUID-StandaloneSpirv-Result-11346

The `Result` `Type` operand of `OpBufferPointerEXT` **must** have
a `Type` operand that is [explicitly    laid out](../chapters/interfaces.html#interfaces-resources-layout)

[](#VUID-StandaloneSpirv-OpTypeUntypedPointerKHR-11417) VUID-StandaloneSpirv-OpTypeUntypedPointerKHR-11417

The `Storage` `Class` of `OpTypeUntypedPointerKHR` **must** be `Image`,
`UniformConstant`,`Workgroup`, `StorageBuffer`, `Uniform`,
`PushConstant`, or `PhysicalStorageBuffer`

[](#VUID-StandaloneSpirv-None-12295) VUID-StandaloneSpirv-None-12295

If the `LongVectorEXT` capability is not declared, the `Component`
`Count` of any vector type **must** be less than or equal to `4` and
greater than `1`

[](#VUID-StandaloneSpirv-Type-12297) VUID-StandaloneSpirv-Type-12297

Any pointer type whose `Type` parameter is a vector type with more
than four components (or an aggregate containing such a type) **must** have
`Storage` `Class` of `Function`, `Private`, `Uniform`,
`Workgroup`, `StorageBuffer`, `PhysicalStorageBuffer`,
`PushConstant`, or `ShaderRecordBufferKHR`

The following rules **must** be validated at runtime.
These rules depend on knowledge of the implementation and its capabilities
and knowledge of runtime information, such as enabled features.

Valid Usage

* 
[](#VUID-RuntimeSpirv-vulkanMemoryModel-06265) VUID-RuntimeSpirv-vulkanMemoryModel-06265

If the [`vulkanMemoryModel`](../chapters/features.html#features-vulkanMemoryModel) feature
is enabled and the [    `vulkanMemoryModelDeviceScope`](../chapters/features.html#features-vulkanMemoryModelDeviceScope) feature is not enabled, `Device`
memory scope **must** not be used

* 
[](#VUID-RuntimeSpirv-vulkanMemoryModel-06266) VUID-RuntimeSpirv-vulkanMemoryModel-06266

If the [`vulkanMemoryModel`](../chapters/features.html#features-vulkanMemoryModel) feature
is not enabled, `QueueFamily` memory scope **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderSubgroupClock-06267) VUID-RuntimeSpirv-shaderSubgroupClock-06267

If the [`shaderSubgroupClock`](../chapters/features.html#features-shaderSubgroupClock)
feature is not enabled, the `Subgroup` scope **must** not be used for
`OpReadClockKHR`

* 
[](#VUID-RuntimeSpirv-shaderDeviceClock-06268) VUID-RuntimeSpirv-shaderDeviceClock-06268

If the [`shaderDeviceClock`](../chapters/features.html#features-shaderDeviceClock) feature
is not enabled, the `Device` scope **must** not be used for
`OpReadClockKHR`

* 
[](#VUID-RuntimeSpirv-shaderRelaxedExtendedInstruction-10773) VUID-RuntimeSpirv-shaderRelaxedExtendedInstruction-10773

If the [    `shaderRelaxedExtendedInstruction`](../chapters/features.html#features-shaderRelaxedExtendedInstruction) feature is not enabled, the
`OpExtInstWithForwardRefsKHR` **must** not be used

* 
[](#VUID-RuntimeSpirv-None-09558) VUID-RuntimeSpirv-None-09558

If the [    `dynamicRenderingLocalRead`](../chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled, any
variable created with a “Type” of `OpTypeImage` that has a “Dim”
operand of `SubpassData` **must** be decorated with
`InputAttachmentIndex`

* 
[](#VUID-RuntimeSpirv-OpTypeImage-09644) VUID-RuntimeSpirv-OpTypeImage-09644

Any variable declared as an `OpTypeArray` where the `Element`
`Type` is an `OpTypeImage` with a “Dim” operand of
`SubpassData` **must** be decorated with `InputAttachmentIndex`

* 
[](#VUID-RuntimeSpirv-apiVersion-07954) VUID-RuntimeSpirv-apiVersion-07954

If [VkPhysicalDeviceProperties](../chapters/devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than
Vulkan 1.3, the [VK_KHR_format_feature_flags2](extensions.html#VK_KHR_format_feature_flags2) extension is not
supported, and the [    `shaderStorageImageWriteWithoutFormat`](../chapters/features.html#features-shaderStorageImageWriteWithoutFormat) feature is not enabled, any
variable created with a “Type” of `OpTypeImage` that has a
“Sampled” operand of 2 and an “Image Format” operand of `Unknown`
**must** be decorated with `NonWritable`

* 
[](#VUID-RuntimeSpirv-apiVersion-07955) VUID-RuntimeSpirv-apiVersion-07955

If [VkPhysicalDeviceProperties](../chapters/devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than
Vulkan 1.3, the [VK_KHR_format_feature_flags2](extensions.html#VK_KHR_format_feature_flags2) extension is not
supported, and the [    `shaderStorageImageReadWithoutFormat`](../chapters/features.html#features-shaderStorageImageReadWithoutFormat) feature is not enabled, any
variable created with a “Type” of `OpTypeImage` that has a
“Sampled” operand of 2 and an “Image Format” operand of `Unknown`
**must** be decorated with `NonReadable`

* 
[](#VUID-RuntimeSpirv-OpImageWrite-07112) VUID-RuntimeSpirv-OpImageWrite-07112

`OpImageWrite` to any `Image` whose `Image` `Format` is not
`Unknown` **must** have the `Texel` operand contain at least as many
components as the corresponding [VkFormat](../chapters/formats.html#VkFormat) as given in the
[SPIR-V Image Format compatibility table](#spirvenv-image-formats)

* 
[](#VUID-RuntimeSpirv-Location-06272) VUID-RuntimeSpirv-Location-06272

The sum of `Location` and the number of locations the variable it
decorates consumes **must** be less than or equal to the value for the
matching `Execution` `Model` defined in [Shader Input and Output Locations](../chapters/interfaces.html#interfaces-iointerfaces-limits)

* 
[](#VUID-RuntimeSpirv-Location-06428) VUID-RuntimeSpirv-Location-06428

The maximum number of storage buffers, storage images, and output
`Location` decorated color attachments written to in the
`Fragment` `Execution` `Model` **must** be less than or equal to
[    `maxFragmentCombinedOutputResources`](../chapters/limits.html#limits-maxFragmentCombinedOutputResources)

* 
[](#VUID-RuntimeSpirv-UniformBufferArrayNonUniformIndexing-10134) VUID-RuntimeSpirv-UniformBufferArrayNonUniformIndexing-10134

If the `UniformBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform buffer,
the uniform buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-SampledImageArrayNonUniformIndexing-10135) VUID-RuntimeSpirv-SampledImageArrayNonUniformIndexing-10135

If the `SampledImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a sampled image or
sampler, the sampled image or sampler through which that memory is
accessed **must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-StorageBufferArrayNonUniformIndexing-10136) VUID-RuntimeSpirv-StorageBufferArrayNonUniformIndexing-10136

If the `StorageBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage buffer,
the storage buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-StorageImageArrayNonUniformIndexing-10137) VUID-RuntimeSpirv-StorageImageArrayNonUniformIndexing-10137

If the `StorageImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage image,
the storage image through which that memory is accessed **must** be
dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-InputAttachmentArrayNonUniformIndexing-10138) VUID-RuntimeSpirv-InputAttachmentArrayNonUniformIndexing-10138

If the `InputAttachmentArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through an input
attachment, the input attachment through which that memory is accessed
**must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-UniformTexelBufferArrayNonUniformIndexing-10139) VUID-RuntimeSpirv-UniformTexelBufferArrayNonUniformIndexing-10139

If the `UniformTexelBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform texel
buffer, the uniform texel buffer through which that memory is accessed
**must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-StorageTexelBufferArrayNonUniformIndexing-10140) VUID-RuntimeSpirv-StorageTexelBufferArrayNonUniformIndexing-10140

If the `StorageTexelBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage texel
buffer, the storage texel buffer through which that memory is accessed
**must** be dynamically uniform within the invocation group
or subgroup

* 
[](#VUID-RuntimeSpirv-subgroupSize-10141) VUID-RuntimeSpirv-subgroupSize-10141

If the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `UniformBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform buffer,
the uniform buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10142) VUID-RuntimeSpirv-subgroupSize-10142

If the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `SampledImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a sampled image or
sampler, the sampled image or sampler through which that memory is
accessed **must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10143) VUID-RuntimeSpirv-subgroupSize-10143

If the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `StorageBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage buffer,
the storage buffer through which that memory is accessed **must** be
dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10144) VUID-RuntimeSpirv-subgroupSize-10144

If the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `StorageImageArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a storage image,
the storage image through which that memory is accessed **must** be
dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10145) VUID-RuntimeSpirv-subgroupSize-10145

If the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `InputAttachmentArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through an input
attachment, the input attachment through which that memory is accessed
**must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10146) VUID-RuntimeSpirv-subgroupSize-10146

If the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `UniformTexelBufferArrayNonUniformIndexing` capability is not
declared, and an instruction accesses memory through a uniform texel
buffer, the uniform texel buffer through which that memory is accessed
**must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-subgroupSize-10147) VUID-RuntimeSpirv-subgroupSize-10147

If the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is
1, the `StorageTexelBufferArrayNonUniformIndexing` capability is not
is not declared, and an instruction accesses memory through a storage
texel buffer, the storage texel buffer through which that memory is
accessed **must** be dynamically uniform within the invocation group

* 
[](#VUID-RuntimeSpirv-None-04745) VUID-RuntimeSpirv-None-04745

All block members in a variable with a `Storage` `Class` of
`PushConstant` declared as an array **must** only be accessed by
dynamically uniform indices

* 
[](#VUID-RuntimeSpirv-None-10148) VUID-RuntimeSpirv-None-10148

If an instruction accesses memory through any resource,
the [effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is 1,
the `DescriptorHeapEXT` capability is not declared,
and the resource through which that memory is accessed is not uniform
within the invocation group, then the operand corresponding to that
resource (e.g. the pointer or sampled image operand) **must** be decorated
with `NonUniform`

* 
[](#VUID-RuntimeSpirv-subgroupSize-10149) VUID-RuntimeSpirv-subgroupSize-10149

If an instruction accesses memory through any resource, the
[effective subgroup size](../chapters/interfaces.html#interfaces-builtin-variables-sgs) is greater
than 1,
the `DescriptorHeapEXT` capability is not declared,
and the resource through which that memory is accessed is not uniform
within the invocation group, and not uniform within the subgroup, then
the operand corresponding to that resource (e.g. the pointer or sampled
image operand) **must** be decorated with `NonUniform`

* 
[](#VUID-RuntimeSpirv-None-06275) VUID-RuntimeSpirv-None-06275

[    `shaderSubgroupExtendedTypes`](../chapters/features.html#features-shaderSubgroupExtendedTypes) **must** be enabled for
[group operations](../chapters/shaders.html#shaders-group-operations) to use 8-bit integer,
16-bit integer, 64-bit integer, 16-bit floating-point, and vectors of
these types

* 
[](#VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06276) VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06276

If [    `subgroupBroadcastDynamicId`](../chapters/features.html#features-subgroupBroadcastDynamicId) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE), and the shader
module version is 1.5 or higher, the “Index” for
`OpGroupNonUniformQuadBroadcast` **must** be dynamically uniform within
the derivative group.
Otherwise, “Index” **must** be a constant

* 
[](#VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06277) VUID-RuntimeSpirv-subgroupBroadcastDynamicId-06277

If [    `subgroupBroadcastDynamicId`](../chapters/features.html#features-subgroupBroadcastDynamicId) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE), and the shader
module version is 1.5 or higher, the “Id” for
`OpGroupNonUniformBroadcast` **must** be dynamically uniform within the
subgroup.
Otherwise, “Id” **must** be a constant

* 
[](#VUID-RuntimeSpirv-None-06278) VUID-RuntimeSpirv-None-06278

[`shaderBufferInt64Atomics`](../chapters/features.html#features-shaderBufferInt64Atomics)
**must** be enabled for 64-bit integer atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `StorageBuffer` or `Uniform`

* 
[](#VUID-RuntimeSpirv-None-06279) VUID-RuntimeSpirv-None-06279

[`shaderSharedInt64Atomics`](../chapters/features.html#features-shaderSharedInt64Atomics)
**must** be enabled for 64-bit integer atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `Workgroup`

* 
[](#VUID-RuntimeSpirv-None-06284) VUID-RuntimeSpirv-None-06284

[    `shaderBufferFloat32Atomics`](../chapters/features.html#features-shaderBufferFloat32Atomics), or
[    `shaderBufferFloat32AtomicAdd`](../chapters/features.html#features-shaderBufferFloat32AtomicAdd), or
[    `shaderBufferFloat64Atomics`](../chapters/features.html#features-shaderBufferFloat64Atomics), or
[    `shaderBufferFloat64AtomicAdd`](../chapters/features.html#features-shaderBufferFloat64AtomicAdd),
or [    `shaderBufferFloat16Atomics`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderBufferFloat16AtomicAdd`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderBufferFloat16AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderBufferFloat32AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat32AtomicMinMax), or
[    `shaderBufferFloat64AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat64AtomicMinMax),
or [    `shaderFloat16VectorAtomics`](../chapters/features.html#features-shaderFloat16VectorAtomics)
**must** be enabled for floating-point atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `StorageBuffer`

* 
[](#VUID-RuntimeSpirv-None-06285) VUID-RuntimeSpirv-None-06285

[    `shaderSharedFloat32Atomics`](../chapters/features.html#features-shaderSharedFloat32Atomics), or
[    `shaderSharedFloat32AtomicAdd`](../chapters/features.html#features-shaderSharedFloat32AtomicAdd), or
[    `shaderSharedFloat64Atomics`](../chapters/features.html#features-shaderSharedFloat64Atomics), or
[    `shaderSharedFloat64AtomicAdd`](../chapters/features.html#features-shaderSharedFloat64AtomicAdd),
or [    `shaderSharedFloat16Atomics`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat16AtomicAdd`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat16AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat32AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat32AtomicMinMax), or
[    `shaderSharedFloat64AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat64AtomicMinMax),
or [    `shaderFloat16VectorAtomics`](../chapters/features.html#features-shaderFloat16VectorAtomics),
**must** be enabled for floating-point atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `Workgroup`

* 
[](#VUID-RuntimeSpirv-None-06286) VUID-RuntimeSpirv-None-06286

[`shaderImageFloat32Atomics`](../chapters/features.html#features-shaderImageFloat32Atomics),
or [    `shaderImageFloat32AtomicAdd`](../chapters/features.html#features-shaderImageFloat32AtomicAdd),
or [    `shaderImageFloat32AtomicMinMax`](../chapters/features.html#features-shaderImageFloat32AtomicMinMax),
**must** be enabled for 32-bit floating-point atomic operations to be
supported on a *Pointer* with a `Storage` `Class` of `Image`

* 
[](#VUID-RuntimeSpirv-None-06287) VUID-RuntimeSpirv-None-06287

[`sparseImageFloat32Atomics`](../chapters/features.html#features-sparseImageFloat32Atomics),
or [    `sparseImageFloat32AtomicAdd`](../chapters/features.html#features-sparseImageFloat32AtomicAdd),
or [    `sparseImageFloat32AtomicMinMax`](../chapters/features.html#features-sparseImageFloat32AtomicMinMax),
**must** be enabled for 32-bit floating-point atomics to be supported on
sparse images

* 
[](#VUID-RuntimeSpirv-None-06288) VUID-RuntimeSpirv-None-06288

[`shaderImageInt64Atomics`](../chapters/features.html#features-shaderImageInt64Atomics)
**must** be enabled for 64-bit integer atomic operations to be supported on
a *Pointer* with a `Storage` `Class` of `Image`

* 
[](#VUID-RuntimeSpirv-denormBehaviorIndependence-06289) VUID-RuntimeSpirv-denormBehaviorIndependence-06289

If [    `denormBehaviorIndependence`](../chapters/devsandqueues.html#features-denormBehaviorIndependence) is
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY](../chapters/limits.html#VkShaderFloatControlsIndependenceKHR), then the entry
point **must** use the same denormals `Execution` `Mode` for both 16-bit and
64-bit floating-point types

* 
[](#VUID-RuntimeSpirv-denormBehaviorIndependence-06290) VUID-RuntimeSpirv-denormBehaviorIndependence-06290

If [    `denormBehaviorIndependence`](../chapters/devsandqueues.html#features-denormBehaviorIndependence) is
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE](../chapters/limits.html#VkShaderFloatControlsIndependenceKHR), then the entry point
**must** use the same denormals `Execution` `Mode` for all floating-point
types

* 
[](#VUID-RuntimeSpirv-roundingModeIndependence-06291) VUID-RuntimeSpirv-roundingModeIndependence-06291

If [`roundingModeIndependence`](../chapters/devsandqueues.html#features-roundingModeIndependence)
is [VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY](../chapters/limits.html#VkShaderFloatControlsIndependenceKHR), then the
entry point **must** use the same rounding `Execution` `Mode` for both 16-bit
and 64-bit floating-point types

* 
[](#VUID-RuntimeSpirv-roundingModeIndependence-06292) VUID-RuntimeSpirv-roundingModeIndependence-06292

If [`roundingModeIndependence`](../chapters/devsandqueues.html#features-roundingModeIndependence)
is [VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE](../chapters/limits.html#VkShaderFloatControlsIndependenceKHR), then the entry
point **must** use the same rounding `Execution` `Mode` for all floating-point
types

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-06293) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-06293

If [    `shaderSignedZeroInfNanPreserveFloat16`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`SignedZeroInfNanPreserve` for 16-bit floating-point type **must** not
be used

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-06294) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-06294

If [    `shaderSignedZeroInfNanPreserveFloat32`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`SignedZeroInfNanPreserve` for 32-bit floating-point type **must** not
be used

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-06295) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-06295

If [    `shaderSignedZeroInfNanPreserveFloat64`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat64) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`SignedZeroInfNanPreserve` for 64-bit floating-point type **must** not
be used

* 
[](#VUID-RuntimeSpirv-shaderDenormPreserveFloat16-06296) VUID-RuntimeSpirv-shaderDenormPreserveFloat16-06296

If [    `shaderDenormPreserveFloat16`](../chapters/devsandqueues.html#limits-shaderDenormPreserveFloat16) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`DenormPreserve` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormPreserveFloat32-06297) VUID-RuntimeSpirv-shaderDenormPreserveFloat32-06297

If [    `shaderDenormPreserveFloat32`](../chapters/devsandqueues.html#limits-shaderDenormPreserveFloat32) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`DenormPreserve` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormPreserveFloat64-06298) VUID-RuntimeSpirv-shaderDenormPreserveFloat64-06298

If [    `shaderDenormPreserveFloat64`](../chapters/devsandqueues.html#limits-shaderDenormPreserveFloat64) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`DenormPreserve` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat16-06299) VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat16-06299

If [    `shaderDenormFlushToZeroFloat16`](../chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat16) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`DenormFlushToZero` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat32-06300) VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat32-06300

If [    `shaderDenormFlushToZeroFloat32`](../chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat32) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`DenormFlushToZero` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat64-06301) VUID-RuntimeSpirv-shaderDenormFlushToZeroFloat64-06301

If [    `shaderDenormFlushToZeroFloat64`](../chapters/devsandqueues.html#limits-shaderDenormFlushToZeroFloat64) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`DenormFlushToZero` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTEFloat16-06302) VUID-RuntimeSpirv-shaderRoundingModeRTEFloat16-06302

If [    `shaderRoundingModeRTEFloat16`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat16) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`RoundingModeRTE` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTEFloat32-06303) VUID-RuntimeSpirv-shaderRoundingModeRTEFloat32-06303

If [    `shaderRoundingModeRTEFloat32`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat32) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`RoundingModeRTE` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTEFloat64-06304) VUID-RuntimeSpirv-shaderRoundingModeRTEFloat64-06304

If [    `shaderRoundingModeRTEFloat64`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTEFloat64) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`RoundingModeRTE` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTZFloat16-06305) VUID-RuntimeSpirv-shaderRoundingModeRTZFloat16-06305

If [    `shaderRoundingModeRTZFloat16`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat16) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`RoundingModeRTZ` for 16-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTZFloat32-06306) VUID-RuntimeSpirv-shaderRoundingModeRTZFloat32-06306

If [    `shaderRoundingModeRTZFloat32`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat32) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`RoundingModeRTZ` for 32-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderRoundingModeRTZFloat64-06307) VUID-RuntimeSpirv-shaderRoundingModeRTZFloat64-06307

If [    `shaderRoundingModeRTZFloat64`](../chapters/devsandqueues.html#limits-shaderRoundingModeRTZFloat64) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
`RoundingModeRTZ` for 64-bit floating-point type **must** not be used

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09559) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09559

If [    `shaderSignedZeroInfNanPreserveFloat16`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE) then any
`FPFastMathDefault` execution mode with a type of 16-bit float **must**
include the `NSZ`, `NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09560) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat16-09560

If [    `shaderSignedZeroInfNanPreserveFloat16`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE) then any
`FPFastMathMode` decoration on an instruction with result type or any
operand type that includes a 16-bit float **must** include the `NSZ`,
`NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09561) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09561

If [    `shaderSignedZeroInfNanPreserveFloat32`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE) then any
`FPFastMathDefault` execution mode with a type of 32-bit float **must**
include the `NSZ`, `NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09562) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat32-09562

If [    `shaderSignedZeroInfNanPreserveFloat32`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE) then any
`FPFastMathMode` decoration on an instruction with result type or any
operand type that includes a 32-bit float **must** include the `NSZ`,
`NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09563) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09563

If [    `shaderSignedZeroInfNanPreserveFloat64`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat64) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE) then any
`FPFastMathDefault` execution mode with a type of 64-bit float **must**
include the `NSZ`, `NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09564) VUID-RuntimeSpirv-shaderSignedZeroInfNanPreserveFloat64-09564

If [    `shaderSignedZeroInfNanPreserveFloat64`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat64) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE) then any
`FPFastMathMode` decoration on an instruction with result type or any
operand type that includes a 64-bit float **must** include the `NSZ`,
`NotInf`, and `NotNaN` flags

* 
[](#VUID-RuntimeSpirv-shaderFmaFloat16-10977) VUID-RuntimeSpirv-shaderFmaFloat16-10977

[`shaderFmaFloat16`](../chapters/features.html#features-shaderFmaFloat16) **must** be enabled
for `OpFmaKHR` to be supported with a result type that includes a
16-bit float

* 
[](#VUID-RuntimeSpirv-shaderFmaFloat32-10978) VUID-RuntimeSpirv-shaderFmaFloat32-10978

[`shaderFmaFloat32`](../chapters/features.html#features-shaderFmaFloat32) **must** be enabled
for `OpFmaKHR` to be supported with a result type that includes a
32-bit float

* 
[](#VUID-RuntimeSpirv-shaderFmaFloat64-10979) VUID-RuntimeSpirv-shaderFmaFloat64-10979

[`shaderFmaFloat64`](../chapters/features.html#features-shaderFmaFloat64) **must** be enabled
for `OpFmaKHR` to be supported with a result type that includes a
64-bit float

* 
[](#VUID-RuntimeSpirv-Offset-06308) VUID-RuntimeSpirv-Offset-06308

The `Offset` plus size of the type of each variable, in the output
interface of the entry point being compiled, decorated with
`XfbBuffer` **must** not be greater than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`maxTransformFeedbackBufferDataSize`

* 
[](#VUID-RuntimeSpirv-XfbBuffer-06309) VUID-RuntimeSpirv-XfbBuffer-06309

For any given `XfbBuffer` value, define the buffer data size to be
smallest number of bytes such that, for all outputs decorated with the
same `XfbBuffer` value, the size of the output interface variable
plus the `Offset` is less than or equal to the buffer data size.
For a given `Stream`, the sum of all the buffer data sizes for all
buffers writing to that stream the **must** not exceed
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`maxTransformFeedbackStreamDataSize`

* 
[](#VUID-RuntimeSpirv-OpEmitStreamVertex-06310) VUID-RuntimeSpirv-OpEmitStreamVertex-06310

The Stream value to `OpEmitStreamVertex` and
`OpEndStreamPrimitive` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`maxTransformFeedbackStreams`

* 
[](#VUID-RuntimeSpirv-transformFeedbackStreamsLinesTriangles-06311) VUID-RuntimeSpirv-transformFeedbackStreamsLinesTriangles-06311

If the geometry shader emits to more than one vertex stream and
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`transformFeedbackStreamsLinesTriangles`
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then `Execution` `Mode` **must** be `OutputPoints`

* 
[](#VUID-RuntimeSpirv-Stream-06312) VUID-RuntimeSpirv-Stream-06312

The stream number value to `Stream` **must** be less than
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`maxTransformFeedbackStreams`

* 
[](#VUID-RuntimeSpirv-XfbStride-06313) VUID-RuntimeSpirv-XfbStride-06313

The XFB Stride value to `XfbStride` **must** be less than or equal to
[VkPhysicalDeviceTransformFeedbackPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT)::`maxTransformFeedbackBufferDataStride`

* 
[](#VUID-RuntimeSpirv-PhysicalStorageBuffer64-06315) VUID-RuntimeSpirv-PhysicalStorageBuffer64-06315

If the `PhysicalStorageBuffer64` addressing model is enabled the
pointer value of a memory access instruction **must** be at least as
aligned as specified by the `Aligned` memory access operand

* 
[](#VUID-RuntimeSpirv-PhysicalStorageBuffer64-11819) VUID-RuntimeSpirv-PhysicalStorageBuffer64-11819

If the `PhysicalStorageBuffer64` addressing model is enabled the
pointer value of a memory access instruction in the
`PhysicalStorageBuffer` `Storage` `Class` **must** reference a buffer
created with the [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](../chapters/resources.html#VkBufferUsageFlagBits) usage
flag set

* 
[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06316) VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06316

For `OpTypeCooperativeMatrixNV`, the component type, scope, number of
rows, and number of columns **must** match one of the matrices in any of
the supported [VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)

* 
[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixMulAddNV-10059) VUID-RuntimeSpirv-OpTypeCooperativeMatrixMulAddNV-10059

For `OpTypeCooperativeMatrixMulAddNV`, the operands **must** match a
supported [VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV), such that:

The type of `A` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`KSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`AType`.

* 
The type of `B` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`KSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`NSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`BType`.

* 
The type of `C` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`NSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`CType`.

* 
The type of `Result` **must** have `Rows` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`NSize`, and
`ComponentType` match
[VkCooperativeMatrixPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixPropertiesNV)::`DType`.

* 
The scope of all cooperative matrix operands **must** be
[VkScopeNV](../chapters/shaders.html#VkScopeNV)::[VK_SCOPE_SUBGROUP_NV](../chapters/shaders.html#VkScopeNV).

* 
If `ComponentType` of `A`, `B`, `C`, or `Result` is a
signed integral type, the `Signedness` operand of the `OpTypeInt`
must be 1.

* 
If `ComponentType` of `A`, `B`, `C`, or `Result` is an
unsigned integral type, the `Signedness` operand of the
`OpTypeInt` must be 0

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06322) VUID-RuntimeSpirv-OpTypeCooperativeMatrixNV-06322

`OpTypeCooperativeMatrixNV` and `OpCooperativeMatrix*`
instructions **must** not be used in shader stages not included in
[VkPhysicalDeviceCooperativeMatrixPropertiesNV](../chapters/limits.html#VkPhysicalDeviceCooperativeMatrixPropertiesNV)::`cooperativeMatrixSupportedStages`

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10163) VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10163

For `OpTypeCooperativeMatrixKHR`,
if the [    `cooperativeMatrixFlexibleDimensions`](../chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is not enabled,
the component type, scope, number of rows, and number of columns **must**
match one of the matrices in any of the supported
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR), where

* 
for `Use` of `MatrixA`, the number of rows must match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`MSize` and the number of
columns must match [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`KSize`
and the type **must** match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`AType`

* 
for `Use` of `MatrixB`, the number of rows must match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`KSize` and the number of
columns must match [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`NSize`
and the type **must** match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`BType`

* 
for `Use` of `MatrixAccumulator`, the number of rows must match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`MSize` and the number of
columns must match [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`NSize`
and the type **must** match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`CType` or
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`ResultType`

[](#VUID-RuntimeSpirv-OpCooperativeMatrixMulAddKHR-10060) VUID-RuntimeSpirv-OpCooperativeMatrixMulAddKHR-10060

For `OpCooperativeMatrixMulAddKHR`,
if the [    `cooperativeMatrixFlexibleDimensions`](../chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is not enabled,
the operands **must** match a supported
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR), such that:

* 
The type of `A` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`KSize`, `Use` be
`MatrixAKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`AType`.

* 
The type of `B` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`KSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`NSize`, `Use` be
`MatrixBKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`BType`.

* 
The type of `C` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`NSize`, `Use` be
`MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`CType`.

* 
The type of `Result` **must** have `Rows` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`MSize`, `Columns` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`NSize`, `Use` be
`MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`ResultType`.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`AType` is a
signed integer type, `MatrixASignedComponents` **must** be used.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`BType` is a
signed integer type, `MatrixBSignedComponents` **must** be used.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`CType` is a
signed integer type, `MatrixCSignedComponents` **must** be used.

* 
If and only if [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`ResultType`
is a signed integer type, `MatrixResultSignedComponents` **must** be
used.

* 
If and only if
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`saturatingAccumulation` is
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE), `SaturatingAccumulationKHR` **must** be used.

* 
If and only if
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`saturatingAccumulation` is
[VK_FALSE](../chapters/fundamentals.html#VK_FALSE), `SaturatingAccumulationKHR` **must** not be used.

* 
The scope of all cooperative matrix operands **must** match
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`scope`.

[](#VUID-RuntimeSpirv-NSize-12352) VUID-RuntimeSpirv-NSize-12352

For `OpExtractSubArrayQCOM`, the length of the `Source` `Array`
operand **must** match the
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`NSize` of one of the
matrices in any of the supported [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)

[](#VUID-RuntimeSpirv-KSize-12353) VUID-RuntimeSpirv-KSize-12353

For `OpExtractSubArrayQCOM`, the length of the `Result` `Type`
operand **must** match the
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)::`KSize` of one of the
matrices in any of the supported [VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR)

[](#VUID-RuntimeSpirv-OpExtractSubArrayQCOM-12354) VUID-RuntimeSpirv-OpExtractSubArrayQCOM-12354

For `OpExtractSubArrayQCOM`, the `Start` `Index` operand **must**
be a multiple of the length of the `Result` `Type` operand

[](#VUID-RuntimeSpirv-cooperativeMatrixWorkgroupScope-10164) VUID-RuntimeSpirv-cooperativeMatrixWorkgroupScope-10164

If the [    `cooperativeMatrixWorkgroupScope`](../chapters/features.html#features-cooperativeMatrixWorkgroupScope) feature is not enabled, the
scope of all `OpTypeCooperativeMatrixKHR` **must** not be
[VkScopeKHR](../chapters/shaders.html#VkScopeKHR)::[VK_SCOPE_WORKGROUP_KHR](../chapters/shaders.html#VkScopeNV)

[](#VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10165) VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10165

For `OpTypeCooperativeMatrixKHR`, if the
[    `cooperativeMatrixFlexibleDimensions`](../chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is enabled, the
component type, scope, number of rows, and number of columns **must** match
either one of the matrices in one of the supported
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR) as described above, or one of the
supported [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV), where

* 
for `MatrixA`, the number of rows must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`MGranularity`
and the number of columns must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`KGranularity`
and the type **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`AType`

* 
for `MatrixB`, the number of rows must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`KGranularity`
and the number of columns must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`NGranularity`
and the type **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`BType`

* 
for `MatrixAccumulator`, the number of rows must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`MGranularity`
and the number of columns must be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`NGranularity`
and the type **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`CType` or
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`ResultType`

* 
if the scope is [VK_SCOPE_WORKGROUP_KHR](../chapters/shaders.html#VkScopeNV), the number of invocations
in the local workgroup **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`workgroupInvocations`

[](#VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10166) VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensions-10166

For `OpCooperativeMatrixMulAddKHR`, if the
[    `cooperativeMatrixFlexibleDimensions`](../chapters/features.html#features-cooperativeMatrixFlexibleDimensions) feature is enabled, the
operands **must** match either one of the supported
[VkCooperativeMatrixPropertiesKHR](../chapters/shaders.html#VkCooperativeMatrixPropertiesKHR) as described above, or one of the
supported [VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV), such
that:

* 
The type of `A` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`MGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`KGranularity`,
`Use` be `MatrixAKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`AType`.

* 
The type of `B` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`KGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`NGranularity`,
`Use` be `MatrixBKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`BType`.

* 
The type of `C` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`MGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`NGranularity`,
`Use` be `MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`CType`.

* 
The type of `Result` **must** have `Rows` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`MGranularity`,
`Columns` be a multiple of
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`NGranularity`,
`Use` be `MatrixAccumulatorKHR`, and `ComponentType` match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`ResultType`.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`AType` is
a signed integer type, `MatrixASignedComponents` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`BType` is
a signed integer type, `MatrixBSignedComponents` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`CType` is
a signed integer type, `MatrixCSignedComponents` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`ResultType`
is a signed integer type, `MatrixResultSignedComponents` **must** be
used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`saturatingAccumulation`
is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE), `SaturatingAccumulationKHR` **must** be used.

* 
If and only if
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`saturatingAccumulation`
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), `SaturatingAccumulationKHR` **must** not be used.

* 
The scope of all cooperative matrix operands **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`scope`.

* 
If the scope is [VK_SCOPE_WORKGROUP_KHR](../chapters/shaders.html#VkScopeNV), the number of invocations
in the local workgroup **must** match
[VkCooperativeMatrixFlexibleDimensionsPropertiesNV](../chapters/shaders.html#VkCooperativeMatrixFlexibleDimensionsPropertiesNV)::`workgroupInvocations`

[](#VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensionsMaxDimension-10167) VUID-RuntimeSpirv-cooperativeMatrixFlexibleDimensionsMaxDimension-10167

All `OpTypeCooperativeMatrixKHR` dimensions **must** be less than or
equal to
[`cooperativeMatrixFlexibleDimensionsMaxDimension`](../chapters/limits.html#limits-cooperativeMatrixFlexibleDimensionsMaxDimension)

[](#VUID-RuntimeSpirv-maxComputeSharedMemorySize-10168) VUID-RuntimeSpirv-maxComputeSharedMemorySize-10168

If the module uses `OpTypeCooperativeMatrixKHR` with `Scope` equal
to `Workgroup`, the sum of size in bytes for variables and
[padding](../chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in
the `GLCompute` `Execution` `Model` **must** be less than or equal to
[`maxComputeSharedMemorySize`](../chapters/limits.html#limits-maxComputeSharedMemorySize)
minus
[`cooperativeMatrixWorkgroupScopeReservedSharedMemory`](../chapters/limits.html#limits-cooperativeMatrixWorkgroupScopeReservedSharedMemory)

[](#VUID-RuntimeSpirv-cooperativeMatrixSupportedStages-08985) VUID-RuntimeSpirv-cooperativeMatrixSupportedStages-08985

`OpTypeCooperativeMatrixKHR` and `OpCooperativeMatrix*`
instructions **must** not be used in shader stages not included in
[VkPhysicalDeviceCooperativeMatrixPropertiesKHR](../chapters/limits.html#VkPhysicalDeviceCooperativeMatrixPropertiesKHR)::`cooperativeMatrixSupportedStages`

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10770) VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10770

Any pipeline containing a shader with `OpTypeCooperativeMatrixKHR` or
`OpCooperativeMatrix*KHR` instructions **must** be created with the
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](../chapters/pipelines.html#VkPipelineShaderStageCreateFlagBits) flag or
the shader module must be version 1.6 or greater

[](#VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10771) VUID-RuntimeSpirv-OpTypeCooperativeMatrixKHR-10771

Any shader object containing `OpTypeCooperativeMatrixKHR` or
`OpCooperativeMatrix*KHR` instructions **must** be created with the
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](../chapters/shaders.html#VkShaderCreateFlagBitsEXT) flag or the shader
module must be version 1.6 or greater

[](#VUID-RuntimeSpirv-OpCooperativeMatrix-12379) VUID-RuntimeSpirv-OpCooperativeMatrix-12379

If any `OpCooperativeMatrix*` instructions accesses a descriptor, it
**must** not be a null descriptor

[](#VUID-RuntimeSpirv-OpCooperativeMatrixLoadNV-06324) VUID-RuntimeSpirv-OpCooperativeMatrixLoadNV-06324

For `OpCooperativeMatrixLoadNV` and `OpCooperativeMatrixStoreNV`
instructions, the `Pointer` and `Stride` operands **must** be aligned
to at least the lesser of 16 bytes or the natural alignment of a row or
column (depending on `ColumnMajor`) of the matrix (where the natural
alignment is the number of columns/rows multiplied by the component
size)

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10089) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10089

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV`, the following **must** be satisfied
by the same entry in the [VkCooperativeVectorPropertiesNV](../chapters/shaders.html#VkCooperativeVectorPropertiesNV) array
returned by [vkGetPhysicalDeviceCooperativeVectorPropertiesNV](../chapters/shaders.html#vkGetPhysicalDeviceCooperativeVectorPropertiesNV):

* 
The component type of `Input` **must** match
[VkCooperativeVectorPropertiesNV](../chapters/shaders.html#VkCooperativeVectorPropertiesNV)::`inputType`

* 
The `InputInterpretation` **must** match
[VkCooperativeVectorPropertiesNV](../chapters/shaders.html#VkCooperativeVectorPropertiesNV)::`inputInterpretation`

* 
The `MatrixInterpretation` **must** match
[VkCooperativeVectorPropertiesNV](../chapters/shaders.html#VkCooperativeVectorPropertiesNV)::`matrixInterpretation`

* 
For `OpCooperativeVectorMatrixMulAddNV`, the `BiasInterpretation`
**must** match
[VkCooperativeVectorPropertiesNV](../chapters/shaders.html#VkCooperativeVectorPropertiesNV)::`biasInterpretation`

* 
The `Result` `Type` **must** match
[VkCooperativeVectorPropertiesNV](../chapters/shaders.html#VkCooperativeVectorPropertiesNV)::`resultType`

* 
If `Transpose` is true,
[VkCooperativeVectorPropertiesNV](../chapters/shaders.html#VkCooperativeVectorPropertiesNV)::`transpose` **must** be
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10090) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10090

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV`, if `MatrixInterpretation` is
either [VK_COMPONENT_TYPE_FLOAT_E4M3_NV](../chapters/shaders.html#VkComponentTypeNV) or
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](../chapters/shaders.html#VkComponentTypeNV) then `MemoryLayout` **must** be
either [VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_INFERENCING_OPTIMAL_NV](../chapters/shaders.html#VkCooperativeVectorMatrixLayoutNV)
or [VK_COOPERATIVE_VECTOR_MATRIX_LAYOUT_TRAINING_OPTIMAL_NV](../chapters/shaders.html#VkCooperativeVectorMatrixLayoutNV)

[](#VUID-RuntimeSpirv-cooperativeVectorSupportedStages-10091) VUID-RuntimeSpirv-cooperativeVectorSupportedStages-10091

`OpTypeCooperativeVectorNV` and `OpCooperativeVector*`
instructions **must** not be used in shader stages not included in
[VkPhysicalDeviceCooperativeVectorPropertiesNV](../chapters/limits.html#VkPhysicalDeviceCooperativeVectorPropertiesNV)::`cooperativeVectorSupportedStages`

[](#VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10092) VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10092

For `OpCooperativeVectorReduceSumAccumulateNV`:

* 
The component type of `V` **must** be either 16- or 32-bit
floating-point

* 
If the component type of `V` is 16-bit floating-point,
[     `cooperativeVectorTrainingFloat16Accumulation`](../chapters/limits.html#limits-cooperativeVectorTrainingFloat16Accumulation) **must** be supported

* 
If the component type of `V` is 32-bit floating-point,
[     `cooperativeVectorTrainingFloat32Accumulation`](../chapters/limits.html#limits-cooperativeVectorTrainingFloat32Accumulation) **must** be supported

* 
The pointer’s storage class **must** be `StorageBuffer` or
`PhysicalStorageBuffer`

[](#VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10093) VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10093

For `OpCooperativeVectorOuterProductAccumulateNV`:

* 
`MatrixInterpretation` must be [VK_COMPONENT_TYPE_FLOAT16_KHR](../chapters/shaders.html#VkComponentTypeNV)
or [VK_COMPONENT_TYPE_FLOAT32_KHR](../chapters/shaders.html#VkComponentTypeNV)

* 
If `MatrixInterpretation` is [VK_COMPONENT_TYPE_FLOAT16_KHR](../chapters/shaders.html#VkComponentTypeNV),
[     `cooperativeVectorTrainingFloat16Accumulation`](../chapters/limits.html#limits-cooperativeVectorTrainingFloat16Accumulation) **must** be supported

* 
If `MatrixInterpretation` is [VK_COMPONENT_TYPE_FLOAT32_KHR](../chapters/shaders.html#VkComponentTypeNV),
[     `cooperativeVectorTrainingFloat32Accumulation`](../chapters/limits.html#limits-cooperativeVectorTrainingFloat32Accumulation) **must** be supported

* 
The component types of `A` and `B` **must** be 16-bit floating-point

* 
The matrix layout **must** be training-optimal

* 
The pointer’s storage class **must** be `StorageBuffer` or
`PhysicalStorageBuffer`

[](#VUID-RuntimeSpirv-maxCooperativeVectorComponents-10094) VUID-RuntimeSpirv-maxCooperativeVectorComponents-10094

`OpTypeCooperativeVector` instructions **must** have `Component`
`Count` less than or equal to
[    `maxCooperativeVectorComponents`](../chapters/limits.html#limits-maxCooperativeVectorComponents)

[](#VUID-RuntimeSpirv-OpTypeCooperativeVector-10095) VUID-RuntimeSpirv-OpTypeCooperativeVector-10095

`OpTypeCooperativeVector` instructions **must** have `Component`
`Type` that is any supported type reported by
[vkGetPhysicalDeviceCooperativeVectorPropertiesNV](../chapters/shaders.html#vkGetPhysicalDeviceCooperativeVectorPropertiesNV)

[](#VUID-RuntimeSpirv-MeshNV-07113) VUID-RuntimeSpirv-MeshNV-07113

For mesh shaders using the `MeshNV` `Execution` `Model` the
`OutputVertices` `OpExecutionMode` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesNV](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshOutputVertices`

[](#VUID-RuntimeSpirv-MeshNV-07114) VUID-RuntimeSpirv-MeshNV-07114

For mesh shaders using the `MeshNV` `Execution` `Model` the
`OutputPrimitivesNV` `OpExecutionMode` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesNV](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshOutputPrimitives`

[](#VUID-RuntimeSpirv-MeshEXT-07115) VUID-RuntimeSpirv-MeshEXT-07115

For mesh shaders using the `MeshEXT` `Execution` `Model` the
`OutputVertices` `OpExecutionMode` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputVertices`

[](#VUID-RuntimeSpirv-MeshEXT-07332) VUID-RuntimeSpirv-MeshEXT-07332

For mesh shaders using the `MeshEXT` `Execution` `Model` the “Vertex
Count” operand of `OpSetMeshOutputsEXT` **must** be less than or equal
to `OutputVertices` `OpExecutionMode`

[](#VUID-RuntimeSpirv-MeshEXT-07116) VUID-RuntimeSpirv-MeshEXT-07116

For mesh shaders using the `MeshEXT` `Execution` `Model` the
`OutputPrimitivesEXT` `OpExecutionMode` **must** be less than or
equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputPrimitives`

[](#VUID-RuntimeSpirv-MeshEXT-07333) VUID-RuntimeSpirv-MeshEXT-07333

For mesh shaders using the `MeshEXT` `Execution` `Model` the “Primitive
Count” operand of `OpSetMeshOutputsEXT` **must** be less than or equal
to `OutputPrimitivesEXT` `OpExecutionMode`

[](#VUID-RuntimeSpirv-MeshEXT-12333) VUID-RuntimeSpirv-MeshEXT-12333

For mesh shaders using the `MeshEXT` `Execution` `Model` the index into
the array of any variable decorated with the `PerPrimitiveEXT`
decoration **must** be less than the “Primitive Count” operand of
`OpSetMeshOutputsEXT`

[](#VUID-RuntimeSpirv-TaskEXT-07117) VUID-RuntimeSpirv-TaskEXT-07117

In task shaders using the `TaskEXT` `Execution` `Model`
`OpEmitMeshTasksEXT` **must** be called exactly once under dynamically
uniform conditions

[](#VUID-RuntimeSpirv-MeshEXT-07118) VUID-RuntimeSpirv-MeshEXT-07118

In mesh shaders using the `MeshEXT` `Execution` `Model`
`OpSetMeshOutputsEXT` **must** be called at most once under dynamically
uniform conditions

[](#VUID-RuntimeSpirv-TaskEXT-07291) VUID-RuntimeSpirv-TaskEXT-07291

In task shaders using the `TaskEXT` `Execution` `Model` the `x` size
in `LocalSize` or `LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupSize`[0]

[](#VUID-RuntimeSpirv-TaskEXT-07292) VUID-RuntimeSpirv-TaskEXT-07292

In task shaders using the `TaskEXT` `Execution` `Model` the `y` size
in `LocalSize` or `LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupSize`[1]

[](#VUID-RuntimeSpirv-TaskEXT-07293) VUID-RuntimeSpirv-TaskEXT-07293

In task shaders using the `TaskEXT` `Execution` `Model` the `z` size
in `LocalSize` or `LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupSize`[2]

[](#VUID-RuntimeSpirv-TaskEXT-07294) VUID-RuntimeSpirv-TaskEXT-07294

In task shaders using the `TaskEXT` `Execution` `Model` the product of
`x` size, `y` size, and `z` size in `LocalSize` or
`LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupInvocations`

[](#VUID-RuntimeSpirv-MeshEXT-07295) VUID-RuntimeSpirv-MeshEXT-07295

For mesh shaders using the `MeshEXT` `Execution` `Model` the `x`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupSize`[0]

[](#VUID-RuntimeSpirv-MeshEXT-07296) VUID-RuntimeSpirv-MeshEXT-07296

For mesh shaders using the `MeshEXT` `Execution` `Model` the `y`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupSize`[1]

[](#VUID-RuntimeSpirv-MeshEXT-07297) VUID-RuntimeSpirv-MeshEXT-07297

For mesh shaders using the `MeshEXT` `Execution` `Model` the `z`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupSize`[2]

[](#VUID-RuntimeSpirv-MeshEXT-07298) VUID-RuntimeSpirv-MeshEXT-07298

For mesh shaders using the `MeshEXT` `Execution` `Model` the product of
`x` size, `y` size, and `z` size in `LocalSize` or
`LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupInvocations`

[](#VUID-RuntimeSpirv-TaskEXT-07299) VUID-RuntimeSpirv-TaskEXT-07299

In task shaders using the `TaskEXT` `Execution` `Model` the value of the
“Group Count X” operand of `OpEmitMeshTasksEXT` **must** be less than
or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupCount`[0]

[](#VUID-RuntimeSpirv-TaskEXT-07300) VUID-RuntimeSpirv-TaskEXT-07300

In task shaders using the `TaskEXT` `Execution` `Model` the value of the
“Group Count Y” operand of `OpEmitMeshTasksEXT` **must** be less than
or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupCount`[1]

[](#VUID-RuntimeSpirv-TaskEXT-07301) VUID-RuntimeSpirv-TaskEXT-07301

In task shaders using the `TaskEXT` `Execution` `Model` the value of the
“Group Count Z” operand of `OpEmitMeshTasksEXT` **must** be less than
or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupCount`[2]

[](#VUID-RuntimeSpirv-TaskEXT-07302) VUID-RuntimeSpirv-TaskEXT-07302

In task shaders using the `TaskEXT` `Execution` `Model` the product of
the “Group Count” operands of `OpEmitMeshTasksEXT` **must** be less
than or equal to
[VkPhysicalDeviceMeshShaderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupTotalCount`

[](#VUID-RuntimeSpirv-maxMeshSharedMemorySize-08754) VUID-RuntimeSpirv-maxMeshSharedMemorySize-08754

The sum of size in bytes for variables and [    padding](../chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in the `MeshEXT`
`Execution` `Model` **must** be less than or equal to
[`maxMeshSharedMemorySize`](../chapters/limits.html#limits-maxMeshSharedMemorySize)

[](#VUID-RuntimeSpirv-maxMeshPayloadAndSharedMemorySize-08755) VUID-RuntimeSpirv-maxMeshPayloadAndSharedMemorySize-08755

The sum of size in bytes for variables and [    padding](../chapters/shaders.html#workgroup-padding) in the `TaskPayloadWorkgroupEXT` or `Workgroup`
`Storage` `Class` in the `MeshEXT` `Execution` `Model` **must** be less than
or equal to [    `maxMeshPayloadAndSharedMemorySize`](../chapters/limits.html#limits-maxMeshPayloadAndSharedMemorySize)

[](#VUID-RuntimeSpirv-maxMeshOutputMemorySize-08756) VUID-RuntimeSpirv-maxMeshOutputMemorySize-08756

The sum of size in bytes for variables in the `Output` `Storage` `Class`
in the `MeshEXT` `Execution` `Model` **must** be less than or equal to
[`maxMeshOutputMemorySize`](../chapters/limits.html#limits-maxMeshOutputMemorySize)
according to the formula in [Mesh Shader Output](../chapters/VK_NV_mesh_shader/mesh.html#mesh-output)

[](#VUID-RuntimeSpirv-maxMeshPayloadAndOutputMemorySize-08757) VUID-RuntimeSpirv-maxMeshPayloadAndOutputMemorySize-08757

The sum of size in bytes for variables and in the
`TaskPayloadWorkgroupEXT` or `Output` `Storage` `Class` in the
`MeshEXT` `Execution` `Model` **must** be less than or equal to
[    `maxMeshPayloadAndOutputMemorySize`](../chapters/limits.html#limits-maxMeshPayloadAndOutputMemorySize) according to the formula in
[Mesh Shader Output](../chapters/VK_NV_mesh_shader/mesh.html#mesh-output)

[](#VUID-RuntimeSpirv-maxTaskPayloadSize-08758) VUID-RuntimeSpirv-maxTaskPayloadSize-08758

The sum of size in bytes for variables and in the
`TaskPayloadWorkgroupEXT` `Storage` `Class` in the `TaskEXT`
`Execution` `Model` **must** be less than or equal to
[`maxTaskPayloadSize`](../chapters/limits.html#limits-maxTaskPayloadSize)

[](#VUID-RuntimeSpirv-maxTaskSharedMemorySize-08759) VUID-RuntimeSpirv-maxTaskSharedMemorySize-08759

The sum of size in bytes for variables and [    padding](../chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in the `TaskEXT`
`Execution` `Model` **must** be less than or equal to
[`maxTaskSharedMemorySize`](../chapters/limits.html#limits-maxTaskSharedMemorySize)

[](#VUID-RuntimeSpirv-maxTaskPayloadAndSharedMemorySize-08760) VUID-RuntimeSpirv-maxTaskPayloadAndSharedMemorySize-08760

The sum of size in bytes for variables and [    padding](../chapters/shaders.html#workgroup-padding) in the `TaskPayloadWorkgroupEXT` or `Workgroup`
`Storage` `Class` in the `TaskEXT` `Execution` `Model` **must** be less than
or equal to [    `maxTaskPayloadAndSharedMemorySize`](../chapters/limits.html#limits-maxTaskPayloadAndSharedMemorySize)

[](#VUID-RuntimeSpirv-MeshEXT-12380) VUID-RuntimeSpirv-MeshEXT-12380

If the `MeshEXT` `Execution` `Model` dynamically accesses a variable
with the `TaskPayloadWorkgroupEXT` `Storage` `Class`, there must be a
matching `TaskPayloadWorkgroupEXT` `Storage` `Class` variable in the
`TaskEXT` `Execution` `Model` passed as an argument to
`OpEmitMeshTasksEXT`

[](#VUID-RuntimeSpirv-OpCooperativeMatrixLoadKHR-08986) VUID-RuntimeSpirv-OpCooperativeMatrixLoadKHR-08986

For `OpCooperativeMatrixLoadKHR` and `OpCooperativeMatrixStoreKHR`
instructions, the `Pointer` and `Stride` operands **must** be aligned
to at least the lesser of 16 bytes or the natural alignment of a row or
column (depending on `ColumnMajor`) of the matrix (where the natural
alignment is the number of columns/rows multiplied by the component
size)

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10096) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10096

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV` instructions using non-optimal
layouts, the `Stride` operand **must** be aligned to 16 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10097) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulNV-10097

For `OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV` instructions, the `Matrix` and
`MatrixOffset` **must** be aligned to 64 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-10098) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-10098

For `OpCooperativeVectorMatrixMulAddNV` instructions, the `Bias`
and `BiasOffset` **must** be aligned to 16 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-10099) VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-10099

For `OpCooperativeVectorLoadNV` and `OpCooperativeVectorStoreNV`
instructions, the `Pointer` and `Offset` **must** be aligned to 16
bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10100) VUID-RuntimeSpirv-OpCooperativeVectorReduceSumAccumulateNV-10100

For `OpCooperativeVectorReduceSumAccumulateNV` instructions, the
`Pointer` and `Offset` **must** be aligned to 16 bytes

[](#VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10101) VUID-RuntimeSpirv-OpCooperativeVectorOuterProductAccumulateNV-10101

For `OpCooperativeVectorOuterProductAccumulateNV` instructions, the
`Pointer` and `Offset` **must** be aligned to 64 bytes

[](#VUID-RuntimeSpirv-shaderSampleRateInterpolationFunctions-06325) VUID-RuntimeSpirv-shaderSampleRateInterpolationFunctions-06325

If the `[VK_KHR_portability_subset](extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](../chapters/features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`shaderSampleRateInterpolationFunctions`
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then `GLSL.std.450` fragment interpolation functions
are not supported by the implementation and `OpCapability` **must** not
be `InterpolationFunction`

[](#VUID-RuntimeSpirv-tessellationShader-06326) VUID-RuntimeSpirv-tessellationShader-06326

If the [`tessellationShader`](../chapters/features.html#features-tessellationShader) feature
is enabled, and the `[VK_KHR_portability_subset](extensions.html#VK_KHR_portability_subset)` extension is
enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](../chapters/features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`tessellationIsolines`
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then `OpExecutionMode` **must** not be `IsoLines`

[](#VUID-RuntimeSpirv-tessellationShader-06327) VUID-RuntimeSpirv-tessellationShader-06327

If the [`tessellationShader`](../chapters/features.html#features-tessellationShader) feature
is enabled, and the `[VK_KHR_portability_subset](extensions.html#VK_KHR_portability_subset)` extension is
enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](../chapters/features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`tessellationPointMode`
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then `OpExecutionMode` **must** not be `PointMode`

[](#VUID-RuntimeSpirv-storageBuffer8BitAccess-06328) VUID-RuntimeSpirv-storageBuffer8BitAccess-06328

If [`storageBuffer8BitAccess`](../chapters/features.html#features-storageBuffer8BitAccess)
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then objects containing an 8-bit integer element
**must** not have `Storage` `Class` of `StorageBuffer`,
`ShaderRecordBufferKHR`, or `PhysicalStorageBuffer`
unless [`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if [     `storageBuffer16BitAccess`](../chapters/features.html#features-storageBuffer16BitAccess) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE).

[](#VUID-RuntimeSpirv-uniformAndStorageBuffer8BitAccess-06329) VUID-RuntimeSpirv-uniformAndStorageBuffer8BitAccess-06329

If [    `uniformAndStorageBuffer8BitAccess`](../chapters/features.html#features-uniformAndStorageBuffer8BitAccess) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
objects in the `Uniform` `Storage` `Class` with the `Block`
decoration **must** not have an 8-bit integer member
unless [`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if [     `uniformAndStorageBuffer16BitAccess`](../chapters/features.html#features-uniformAndStorageBuffer16BitAccess) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE).

[](#VUID-RuntimeSpirv-storagePushConstant8-06330) VUID-RuntimeSpirv-storagePushConstant8-06330

If [`storagePushConstant8`](../chapters/features.html#features-storagePushConstant8) is
[VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then objects containing an 8-bit integer element **must**
not have `Storage` `Class` of `PushConstant`
unless [`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if [     `storagePushConstant16`](../chapters/features.html#features-storagePushConstant16) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE).

[](#VUID-RuntimeSpirv-workgroupMemoryExplicitLayout8BitAccess-10756) VUID-RuntimeSpirv-workgroupMemoryExplicitLayout8BitAccess-10756

If [    `workgroupMemoryExplicitLayout8BitAccess`](../chapters/features.html#features-workgroupMemoryExplicitLayout8BitAccess) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
objects in the `Workgroup` `Storage` `Class` with the `Block`
decoration **must** not have an 8-bit integer element
unless [`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers)
is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE) and they are accessed in:

* 
32-bit multiples, or

* 
16-bit multiples if
[     `workgroupMemoryExplicitLayout16BitAccess`](../chapters/features.html#features-workgroupMemoryExplicitLayout16BitAccess) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-storageBuffer16BitAccess-11161) VUID-RuntimeSpirv-storageBuffer16BitAccess-11161

If [`storageBuffer16BitAccess`](../chapters/features.html#features-storageBuffer16BitAccess)
is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then objects containing 16-bit integer or 16-bit
floating-point elements **must** not have `Storage` `Class` of
`StorageBuffer`, `ShaderRecordBufferKHR`, or
`PhysicalStorageBuffer`
unless:

* 
[`storageBuffer8BitAccess`](../chapters/features.html#features-storageBuffer8BitAccess) is
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE), or

* 
the elements are accessed in 32-bit multiples if
[`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE).

[](#VUID-RuntimeSpirv-uniformAndStorageBuffer16BitAccess-06332) VUID-RuntimeSpirv-uniformAndStorageBuffer16BitAccess-06332

If [    `uniformAndStorageBuffer16BitAccess`](../chapters/features.html#features-uniformAndStorageBuffer16BitAccess) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
objects in the `Uniform` `Storage` `Class` with the `Block`
decoration **must** not have 16-bit integer or 16-bit floating-point
members
unless:

* 
[     `uniformAndStorageBuffer8BitAccess`](../chapters/features.html#features-uniformAndStorageBuffer8BitAccess) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE), or

* 
members are accessed in 32-bit multiples and
[`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-storagePushConstant16-06333) VUID-RuntimeSpirv-storagePushConstant16-06333

If [`storagePushConstant16`](../chapters/features.html#features-storagePushConstant16) is
[VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then objects containing 16-bit integer or 16-bit
floating-point elements **must** not have `Storage` `Class` of
`PushConstant`
unless:

* 
[`StoragePushConstant8`](../chapters/features.html#features-storagePushConstant8) is
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE), or

* 
elements are accessed in 32-bit multiples if
[`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-storageInputOutput16-11162) VUID-RuntimeSpirv-storageInputOutput16-11162

If [`storageInputOutput16`](../chapters/features.html#features-storageInputOutput16) is
[VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then objects containing 16-bit integer or 16-bit
floating-point elements **must** not have storage class of **Input** or
**Output**

[](#VUID-RuntimeSpirv-None-10980) VUID-RuntimeSpirv-None-10980

Objects containing 8-bit integer or 8-bit floating-point elements **must**
not have storage class of **Input** or **Output**

[](#VUID-RuntimeSpirv-workgroupMemoryExplicitLayout16BitAccess-10757) VUID-RuntimeSpirv-workgroupMemoryExplicitLayout16BitAccess-10757

If [    `workgroupMemoryExplicitLayout16BitAccess`](../chapters/features.html#features-workgroupMemoryExplicitLayout16BitAccess) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
objects in the `Workgroup` `Storage` `Class` with the `Block`
decoration **must** not have an 16-bit integer or 16-bit floating-point
elements
unless:

* 
[     `workgroupMemoryExplicitLayout8BitAccess`](../chapters/features.html#features-workgroupMemoryExplicitLayout8BitAccess) is [VK_TRUE](../chapters/fundamentals.html#VK_TRUE), or

* 
elements are accessed in 32-bit multiples if
[`shaderUntypedPointers`](../chapters/features.html#features-shaderUntypedPointers) is
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-None-06337) VUID-RuntimeSpirv-None-06337

[    `shaderBufferFloat16Atomics`](../chapters/features.html#features-shaderBufferFloat16Atomics), or
[    `shaderBufferFloat16AtomicAdd`](../chapters/features.html#features-shaderBufferFloat16AtomicAdd), or
[    `shaderBufferFloat16AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat16AtomicMinMax), or
[    `shaderSharedFloat16Atomics`](../chapters/features.html#features-shaderSharedFloat16Atomics), or
[    `shaderSharedFloat16AtomicAdd`](../chapters/features.html#features-shaderSharedFloat16AtomicAdd), or
[    `shaderSharedFloat16AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat16AtomicMinMax) **must** be enabled for 16-bit
floating-point atomic operations

[](#VUID-RuntimeSpirv-None-06338) VUID-RuntimeSpirv-None-06338

[    `shaderBufferFloat32Atomics`](../chapters/features.html#features-shaderBufferFloat32Atomics), or
[    `shaderBufferFloat32AtomicAdd`](../chapters/features.html#features-shaderBufferFloat32AtomicAdd), or
[    `shaderSharedFloat32Atomics`](../chapters/features.html#features-shaderSharedFloat32Atomics), or
[    `shaderSharedFloat32AtomicAdd`](../chapters/features.html#features-shaderSharedFloat32AtomicAdd), or
[`shaderImageFloat32Atomics`](../chapters/features.html#features-shaderImageFloat32Atomics),
or [    `shaderImageFloat32AtomicAdd`](../chapters/features.html#features-shaderImageFloat32AtomicAdd) or
[    `shaderBufferFloat32AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat32AtomicMinMax), or
[    `shaderSharedFloat32AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat32AtomicMinMax), or
[    `shaderImageFloat32AtomicMinMax`](../chapters/features.html#features-shaderImageFloat32AtomicMinMax) **must** be enabled for 32-bit
floating-point atomic operations

[](#VUID-RuntimeSpirv-None-06339) VUID-RuntimeSpirv-None-06339

[    `shaderBufferFloat64Atomics`](../chapters/features.html#features-shaderBufferFloat64Atomics), or
[    `shaderBufferFloat64AtomicAdd`](../chapters/features.html#features-shaderBufferFloat64AtomicAdd), or
[    `shaderSharedFloat64Atomics`](../chapters/features.html#features-shaderSharedFloat64Atomics), or
[    `shaderSharedFloat64AtomicAdd`](../chapters/features.html#features-shaderSharedFloat64AtomicAdd), or
[    `shaderBufferFloat64AtomicMinMax`](../chapters/features.html#features-shaderBufferFloat64AtomicMinMax), or
[    `shaderSharedFloat64AtomicMinMax`](../chapters/features.html#features-shaderSharedFloat64AtomicMinMax), **must** be enabled for 64-bit
floating-point atomic operations

[](#VUID-RuntimeSpirv-shaderFloat16VectorAtomics-09581) VUID-RuntimeSpirv-shaderFloat16VectorAtomics-09581

[`shaderFloat16VectorAtomics`](../chapters/features.html#features-shaderFloat16VectorAtomics),
**must** be enabled for 16-bit floating-point, 2- and 4-component vector
atomic operations to be supported

[](#VUID-RuntimeSpirv-NonWritable-06340) VUID-RuntimeSpirv-NonWritable-06340

    If the [    `fragmentStoresAndAtomics`](../chapters/features.html#features-fragmentStoresAndAtomics) feature is not enabled, then all
    storage image, storage texel buffer,
storage tensor,
    and storage buffer variables in the fragment stage **must** be decorated
    with the `NonWritable` decoration

[](#VUID-RuntimeSpirv-NonWritable-06341) VUID-RuntimeSpirv-NonWritable-06341

    If the [    `vertexPipelineStoresAndAtomics`](../chapters/features.html#features-vertexPipelineStoresAndAtomics) feature is not enabled, then all
    storage image, storage texel buffer,
storage tensor,
    and storage buffer variables in the vertex, tessellation, and geometry
    stages **must** be decorated with the `NonWritable` decoration

[](#VUID-RuntimeSpirv-None-06342) VUID-RuntimeSpirv-None-06342

If [    `subgroupQuadOperationsInAllStages`](../chapters/devsandqueues.html#limits-subgroupQuadOperationsInAllStages) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then
[quad subgroup operations](../chapters/limits.html#features-subgroup-quad) **must** not be used
except for in fragment and compute stages

[](#VUID-RuntimeSpirv-None-06343) VUID-RuntimeSpirv-None-06343

[Group operations](../chapters/shaders.html#shaders-group-operations) with
[subgroup scope](../chapters/shaders.html#shaders-scope-subgroup) **must** not be used if the
shader stage is not in [    `subgroupSupportedStages`](../chapters/devsandqueues.html#limits-subgroupSupportedStages)

[](#VUID-RuntimeSpirv-Offset-06344) VUID-RuntimeSpirv-Offset-06344

The first element of the `Offset` operand of `InterpolateAtOffset`
**must** be greater than or equal to:

fragwidth × [    `minInterpolationOffset`](../chapters/limits.html#limits-minInterpolationOffset)

where fragwidth is the width of the current fragment in pixels

[](#VUID-RuntimeSpirv-Offset-06345) VUID-RuntimeSpirv-Offset-06345

The first element of the `Offset` operand of `InterpolateAtOffset`
**must** be less than or equal to

fragwidth × ([    `maxInterpolationOffset`](../chapters/limits.html#limits-maxInterpolationOffset) +  ULP ) - ULP

where fragwidth is the width of the current fragment in pixels
and ULP = 1 / 2^[    `subPixelInterpolationOffsetBits`](../chapters/limits.html#limits-subPixelInterpolationOffsetBits)^

[](#VUID-RuntimeSpirv-Offset-06346) VUID-RuntimeSpirv-Offset-06346

The second element of the `Offset` operand of
`InterpolateAtOffset` **must** be greater than or equal to

fragheight × [    `minInterpolationOffset`](../chapters/limits.html#limits-minInterpolationOffset)

where fragheight is the height of the current fragment in pixels

[](#VUID-RuntimeSpirv-Offset-06347) VUID-RuntimeSpirv-Offset-06347

The second element of the `Offset` operand of
`InterpolateAtOffset` **must** be less than or equal to

fragheight × ([    `maxInterpolationOffset`](../chapters/limits.html#limits-maxInterpolationOffset) +  ULP ) - ULP

where fragheight is the height of the current fragment in pixels
and ULP = 1 / 2^[    `subPixelInterpolationOffsetBits`](../chapters/limits.html#limits-subPixelInterpolationOffsetBits)^

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06348) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06348

For `OpRayQueryInitializeKHR` instructions, all components of the
`RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06349) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06349

For `OpRayQueryInitializeKHR` instructions, the `RayTmin` and
`RayTmax` operands **must** be non-negative floating-point values

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06350) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06350

For `OpRayQueryInitializeKHR` instructions, the `RayTmin` operand
**must** be less than or equal to the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06351) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06351

For `OpRayQueryInitializeKHR` instructions, `RayOrigin`,
`RayDirection`, `RayTmin`, and `RayTmax` operands **must** not
contain NaNs

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06352) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06352

For `OpRayQueryInitializeKHR` instructions, `Acceleration`
`Structure` **must** be an acceleration structure built as a
[top-level acceleration structure](../chapters/accelstructures.html#acceleration-structure-top-level)

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06889) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06889

For `OpRayQueryInitializeKHR` instructions, the `Rayflags` operand
**must** not contain both `SkipTrianglesKHR` and `SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06890) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06890

For `OpRayQueryInitializeKHR` instructions, the `Rayflags` operand
**must** not contain more than one of `SkipTrianglesKHR`,
`CullBackFacingTrianglesKHR`, and `CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06891) VUID-RuntimeSpirv-OpRayQueryInitializeKHR-06891

For `OpRayQueryInitializeKHR` instructions, the `Rayflags` operand
**must** not contain more than one of `OpaqueKHR`, `NoOpaqueKHR`,
`CullOpaqueKHR`, and `CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06353) VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06353

For `OpRayQueryGenerateIntersectionKHR` instructions, `Hit` `T`
**must** satisfy the condition `RayTmin` ≤ `Hit` `T`
≤ `RayTmax`, where `RayTmin` is equal to the value returned
by `OpRayQueryGetRayTMinKHR` with the same ray query object, and
`RayTmax` is equal to the value of `OpRayQueryGetIntersectionTKHR`
for the current committed intersection with the same ray query object

[](#VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06354) VUID-RuntimeSpirv-OpRayQueryGenerateIntersectionKHR-06354

For `OpRayQueryGenerateIntersectionKHR` instructions,
`Acceleration` `Structure` **must** not be built with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in `flags`

[](#VUID-RuntimeSpirv-flags-08761) VUID-RuntimeSpirv-flags-08761

For `OpRayQueryGetIntersectionTriangleVertexPositionsKHR`
instructions, `Acceleration` `Structure` **must** have been built
with [VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in
`flags`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06355) VUID-RuntimeSpirv-OpTraceRayKHR-06355

For `OpTraceRayKHR` instructions, all components of the
`RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06356) VUID-RuntimeSpirv-OpTraceRayKHR-06356

For `OpTraceRayKHR` instructions, the `RayTmin` and `RayTmax`
operands **must** be non-negative floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06552) VUID-RuntimeSpirv-OpTraceRayKHR-06552

For `OpTraceRayKHR` instructions, the `Rayflags` operand **must** not
contain both `SkipTrianglesKHR` and `SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06892) VUID-RuntimeSpirv-OpTraceRayKHR-06892

For `OpTraceRayKHR` instructions, the `Rayflags` operand **must** not
contain more than one of `SkipTrianglesKHR`,
`CullBackFacingTrianglesKHR`, and `CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06893) VUID-RuntimeSpirv-OpTraceRayKHR-06893

For `OpTraceRayKHR` instructions, the `Rayflags` operand **must** not
contain more than one of `OpaqueKHR`, `NoOpaqueKHR`,
`CullOpaqueKHR`, and `CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06553) VUID-RuntimeSpirv-OpTraceRayKHR-06553

For `OpTraceRayKHR` instructions, if the `Rayflags` operand
contains `SkipTrianglesKHR`, the pipeline **must** not have been created
with [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06554) VUID-RuntimeSpirv-OpTraceRayKHR-06554

For `OpTraceRayKHR` instructions, if the `Rayflags` operand
contains `SkipAABBsKHR`, the pipeline **must** not have been created
with [VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06357) VUID-RuntimeSpirv-OpTraceRayKHR-06357

For `OpTraceRayKHR` instructions, the `RayTmin` operand **must** be
less than or equal to the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06358) VUID-RuntimeSpirv-OpTraceRayKHR-06358

For `OpTraceRayKHR` instructions, `RayOrigin`, `RayDirection`,
`RayTmin`, and `RayTmax` operands **must** not contain NaNs

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06359) VUID-RuntimeSpirv-OpTraceRayKHR-06359

For `OpTraceRayKHR` instructions, `Acceleration` `Structure`
**must** be an acceleration structure built as a
[top-level acceleration structure](../chapters/accelstructures.html#acceleration-structure-top-level)

[](#VUID-RuntimeSpirv-OpReportIntersectionKHR-06998) VUID-RuntimeSpirv-OpReportIntersectionKHR-06998

The value of the “Hit Kind” operand of `OpReportIntersectionKHR`
**must** be in the range [0,127]

[](#VUID-RuntimeSpirv-OpTraceRayKHR-11855) VUID-RuntimeSpirv-OpTraceRayKHR-11855

    For modules which contain `OpTraceRayKHR`
or `OpTraceRayMotionNV`
    instructions that declare a variable in the `RayPayloadKHR`
    `Storage` `Class`, all shaders which may be invoked as part of that *shader
    call* **must** declare an identical variable in the
    `IncomingRayPayloadKHR` `Storage` `Class`

[](#VUID-RuntimeSpirv-OpTraceRayKHR-06360) VUID-RuntimeSpirv-OpTraceRayKHR-06360

For `OpTraceRayKHR` instructions, if `Acceleration` `Structure`
was built with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in
`flags`, the pipeline **must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06361) VUID-RuntimeSpirv-OpTraceRayMotionNV-06361

For `OpTraceRayMotionNV` instructions, all components of the
`RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06362) VUID-RuntimeSpirv-OpTraceRayMotionNV-06362

For `OpTraceRayMotionNV` instructions, the `RayTmin` and
`RayTmax` operands **must** be non-negative floating-point values

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06363) VUID-RuntimeSpirv-OpTraceRayMotionNV-06363

For `OpTraceRayMotionNV` instructions, the `RayTmin` operand **must**
be less than or equal to the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06364) VUID-RuntimeSpirv-OpTraceRayMotionNV-06364

For `OpTraceRayMotionNV` instructions, `RayOrigin`,
`RayDirection`, `RayTmin`, and `RayTmax` operands **must** not
contain NaNs

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06365) VUID-RuntimeSpirv-OpTraceRayMotionNV-06365

For `OpTraceRayMotionNV` instructions, `Acceleration`
`Structure` **must** be an acceleration structure built as a
[top-level acceleration structure](../chapters/accelstructures.html#acceleration-structure-top-level)
with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in `flags`

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06366) VUID-RuntimeSpirv-OpTraceRayMotionNV-06366

For `OpTraceRayMotionNV` instructions the `time` operand **must** be
between 0.0 and 1.0

[](#VUID-RuntimeSpirv-OpTraceRayMotionNV-06367) VUID-RuntimeSpirv-OpTraceRayMotionNV-06367

For `OpTraceRayMotionNV` instructions the pipeline **must** have been
created with [VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](../chapters/pipelines.html#VkPipelineCreateFlagBits)
set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07704) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07704

For `OpHitObjectTraceRayMotionNV` instructions, if `Acceleration`
`Structure` was built with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in `flags`, the
pipeline **must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07705) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07705

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, all components of the `RayOrigin` and `RayDirection`
operands **must** be finite floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07706) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07706

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `RayTmin` and `RayTmax` operands **must** be
non-negative floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07707) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07707

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `RayTmin` operand **must** be less than or equal to
the `RayTmax` operand

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07708) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07708

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, `RayOrigin`, `RayDirection`, `RayTmin`, and
`RayTmax` operands **must** not contain NaNs

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07709) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07709

For `OpHitObjectTraceRayMotionNV` instructions, `Acceleration`
`Structure` **must** be an acceleration structure built as a
[top-level acceleration structure](../chapters/accelstructures.html#acceleration-structure-top-level)
with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in `flags`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07710) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07710

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions the `time` operand **must** be between 0.0 and 1.0

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07711) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionNV-07711

For `OpHitObjectTraceRayMotionNV` instructions the pipeline **must**
have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07712) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07712

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `Rayflags` operand **must** not contain both
`SkipTrianglesKHR` and `SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07713) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07713

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `Rayflags` operand **must** not contain more than one
of `SkipTrianglesKHR`, `CullBackFacingTrianglesKHR`, and
`CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07714) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07714

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, the `Rayflags` operand **must** not contain more than one
of `OpaqueKHR`, `NoOpaqueKHR`, `CullOpaqueKHR`, and
`CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07715) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07715

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, if the `Rayflags` operand contains
`SkipTrianglesKHR`, the pipeline **must** not have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07716) VUID-RuntimeSpirv-OpHitObjectTraceRayNV-07716

For `OpHitObjectTraceRayNV` and `OpHitObjectTraceRayMotionNV`
instructions, if the `Rayflags` operand contains `SkipAABBsKHR`,
the pipeline **must** not have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-flags-11875) VUID-RuntimeSpirv-flags-11875

For `OpHitObjectTraceRayMotionEXT` and
`OpHitObjectTraceMotionReorderExecuteEXT` instructions, if
`Acceleration` `Structure` was built with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in `flags`, the
pipeline **must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-flags-11876) VUID-RuntimeSpirv-flags-11876

For `OpHitObjectTraceRayMotionEXT` and
`OpHitObjectTraceMotionReorderExecuteEXT` instructions,
`Acceleration` `Structure` **must** be an acceleration structure
built as a [top-level acceleration    structure](../chapters/accelstructures.html#acceleration-structure-top-level) with [VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](../chapters/resources.html#VkBuildAccelerationStructureFlagBitsNV) in
`flags`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayMotionEXT-11877) VUID-RuntimeSpirv-OpHitObjectTraceRayMotionEXT-11877

For `OpHitObjectTraceRayMotionEXT` and
`OpHitObjectTraceMotionReorderExecuteEXT` instructions, the pipeline
**must** have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_ALLOW_MOTION_BIT_NV](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11878) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11878

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, all components
of the `RayOrigin` and `RayDirection` operands **must** be finite
floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11879) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11879

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`RayTmin` and `RayTmax` operands **must** be non-negative
floating-point values

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11880) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11880

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`RayTmin` operand **must** be less than or equal to the `RayTmax`
operand

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11881) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11881

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, `RayOrigin`,
`RayDirection`, `RayTmin`, and `RayTmax` operands **must** not
contain NaNs

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11882) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11882

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions the `time`
operand **must** be between 0.0 and 1.0

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11883) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11883

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`Rayflags` operand **must** not contain both `SkipTrianglesKHR` and
`SkipAABBsKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11884) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11884

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`Rayflags` operand **must** not contain more than one of
`SkipTrianglesKHR`, `CullBackFacingTrianglesKHR`, and
`CullFrontFacingTrianglesKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11885) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11885

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, the
`Rayflags` operand **must** not contain more than one of `OpaqueKHR`,
`NoOpaqueKHR`, `CullOpaqueKHR`, and `CullNoOpaqueKHR`

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11886) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11886

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, if the
`Rayflags` operand contains `SkipTrianglesKHR`, the pipeline **must**
not have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_AABBS_BIT_KHR](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11887) VUID-RuntimeSpirv-OpHitObjectTraceRayEXT-11887

For `OpHitObjectTraceRayEXT`,
`OpHitObjectTraceRayMotionEXT`,
`OpHitObjectTraceMotionReorderExecuteEXT`
and `OpHitObjectTraceReorderExecuteEXT` instructions, if the
`Rayflags` operand contains `SkipAABBsKHR`, the pipeline **must** not
have been created with
[VK_PIPELINE_CREATE_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](../chapters/pipelines.html#VkPipelineCreateFlagBits) set

[](#VUID-RuntimeSpirv-x-06429) VUID-RuntimeSpirv-x-06429

In compute shaders using the `GLCompute` `Execution` `Model` the `x`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to [VkPhysicalDeviceLimits](../chapters/limits.html#VkPhysicalDeviceLimits)::`maxComputeWorkGroupSize`[0]

[](#VUID-RuntimeSpirv-y-06430) VUID-RuntimeSpirv-y-06430

In compute shaders using the `GLCompute` `Execution` `Model` the `y`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to [VkPhysicalDeviceLimits](../chapters/limits.html#VkPhysicalDeviceLimits)::`maxComputeWorkGroupSize`[1]

[](#VUID-RuntimeSpirv-z-06431) VUID-RuntimeSpirv-z-06431

In compute shaders using the `GLCompute` `Execution` `Model` the `z`
size in `LocalSize` or `LocalSizeId` **must** be less than or equal
to [VkPhysicalDeviceLimits](../chapters/limits.html#VkPhysicalDeviceLimits)::`maxComputeWorkGroupSize`[2]

[](#VUID-RuntimeSpirv-x-06432) VUID-RuntimeSpirv-x-06432

In compute shaders using the `GLCompute` `Execution` `Model` the product
of `x` size, `y` size, and `z` size in `LocalSize` or
`LocalSizeId` **must** be less than or equal to
[VkPhysicalDeviceLimits](../chapters/limits.html#VkPhysicalDeviceLimits)::`maxComputeWorkGroupInvocations`

[](#VUID-RuntimeSpirv-LocalSizeId-06434) VUID-RuntimeSpirv-LocalSizeId-06434

If `Execution` `Mode` `LocalSizeId` is used, [    `maintenance4`](../chapters/features.html#features-maintenance4) **must** be enabled

[](#VUID-RuntimeSpirv-maintenance4-06817) VUID-RuntimeSpirv-maintenance4-06817

If the [`maintenance4`](../chapters/features.html#features-maintenance4) feature is not
enabled, any vector type output interface variables **must** not have a
higher `Component` `Count` than a matching vector type input
interface variable

[](#VUID-RuntimeSpirv-OpEntryPoint-08743) VUID-RuntimeSpirv-OpEntryPoint-08743

Any [user-defined variables](../chapters/interfaces.html#interfaces-iointerfaces-user) shared
between the `OpEntryPoint` of two shader stages, and declared with
`Input` as its `Storage` `Class` for the subsequent shader stage, **must**
have all `Location` slots and `Component` words declared in the
preceding shader stage’s `OpEntryPoint` with `Output` as the
`Storage` `Class`

[](#VUID-RuntimeSpirv-OpEntryPoint-07754) VUID-RuntimeSpirv-OpEntryPoint-07754

Any [user-defined variables](../chapters/interfaces.html#interfaces-iointerfaces-user) between the
`OpEntryPoint` of two shader stages **must** have the same type and
width for each `Component`

[](#VUID-RuntimeSpirv-OpVariable-08746) VUID-RuntimeSpirv-OpVariable-08746

Any variable, `Block`-decorated `OpTypeStruct`, or
`Block`-decorated `OpTypeStruct` members shared between the
`OpEntryPoint` of two shader stages **must** have matching decorations
as defined in [interface matching](../chapters/interfaces.html#interfaces-iointerfaces-matching)

[](#VUID-RuntimeSpirv-Workgroup-06530) VUID-RuntimeSpirv-Workgroup-06530

The sum of size in bytes for variables and [    padding](../chapters/shaders.html#workgroup-padding) in the `Workgroup` `Storage` `Class` in the `GLCompute`
`Execution` `Model` **must** be less than or equal to
[`maxComputeSharedMemorySize`](../chapters/limits.html#limits-maxComputeSharedMemorySize)

[](#VUID-RuntimeSpirv-shaderZeroInitializeWorkgroupMemory-06372) VUID-RuntimeSpirv-shaderZeroInitializeWorkgroupMemory-06372

If the [    `shaderZeroInitializeWorkgroupMemory`](../chapters/features.html#features-shaderZeroInitializeWorkgroupMemory) feature is not enabled, any
variable with `Workgroup` as its `Storage` `Class` **must** not have an
`Initializer` operand

[](#VUID-RuntimeSpirv-Offset-10213) VUID-RuntimeSpirv-Offset-10213

If the [`maintenance8`](../chapters/features.html#features-maintenance8) feature is not
enabled, image
operand `Offset` **must** only be used with `OpImage*Gather`
instructions

[](#VUID-RuntimeSpirv-Size-11165) VUID-RuntimeSpirv-Size-11165

The `Size` operand of `OpCopyMemorySized` **must** be a multiple of 4

* 
If 16-bit storage is enabled for the storage classes of both the
`Target` and `Source` operands the `Size` operand may instead
be a multiple of 2

* 
If 8-bit storage is enabled for the storage classes of both the
`Target` and `Source` operands the `Size` operand may instead
be any value

[](#VUID-RuntimeSpirv-OpTypeUntypedPointerKHR-11166) VUID-RuntimeSpirv-OpTypeUntypedPointerKHR-11166

Any memory access made using an `OpTypeUntypedPointerKHR` must have
an alignment that satisfies [Offset and    Stride Assignment](../chapters/interfaces.html#interfaces-resources-layout)

[](#VUID-RuntimeSpirv-OpImage-06376) VUID-RuntimeSpirv-OpImage-06376

If an `OpImage*Gather` operation has an image operand of `Offset`,
`ConstOffset`, or `ConstOffsets` the offset value **must** be greater
than or equal to [    `minTexelGatherOffset`](../chapters/limits.html#limits-minTexelGatherOffset)

[](#VUID-RuntimeSpirv-OpImage-06377) VUID-RuntimeSpirv-OpImage-06377

If an `OpImage*Gather` operation has an image operand of `Offset`,
`ConstOffset`, or `ConstOffsets` the offset value **must** be less
than or equal to [    `maxTexelGatherOffset`](../chapters/limits.html#limits-maxTexelGatherOffset)

[](#VUID-RuntimeSpirv-OpImageSample-06435) VUID-RuntimeSpirv-OpImageSample-06435

    If an `OpImageSample*` or `OpImageFetch*` operation has an image
    operand of
`Offset` or
    `ConstOffset` then the offset value **must** be greater than or equal to
    [`minTexelOffset`](../chapters/limits.html#limits-minTexelOffset)

[](#VUID-RuntimeSpirv-OpImageSample-06436) VUID-RuntimeSpirv-OpImageSample-06436

    If an `OpImageSample*` or `OpImageFetch*` operation has an image
    operand of
`Offset` or
    `ConstOffset` then the offset value **must** be less than or equal to
    [`maxTexelOffset`](../chapters/limits.html#limits-maxTexelOffset)

[](#VUID-RuntimeSpirv-samples-08725) VUID-RuntimeSpirv-samples-08725

If an `OpTypeImage` has an `MS` operand 0, its bound image **must**
have been created with [VkImageCreateInfo](../chapters/resources.html#VkImageCreateInfo)::`samples` as
[VK_SAMPLE_COUNT_1_BIT](../chapters/limits.html#VkSampleCountFlagBits)

[](#VUID-RuntimeSpirv-samples-08726) VUID-RuntimeSpirv-samples-08726

If an `OpTypeImage` has an `MS` operand 1, its bound image **must**
not have been created with [VkImageCreateInfo](../chapters/resources.html#VkImageCreateInfo)::`samples` as
[VK_SAMPLE_COUNT_1_BIT](../chapters/limits.html#VkSampleCountFlagBits)

[](#VUID-RuntimeSpirv-SampleRateShading-06378) VUID-RuntimeSpirv-SampleRateShading-06378

If the subpass description contains
[VK_SUBPASS_DESCRIPTION_FRAGMENT_REGION_BIT_EXT](../chapters/renderpass.html#VkSubpassDescriptionFlagBits), then the SPIR-V
fragment shader Capability `SampleRateShading` **must** not be enabled

[](#VUID-RuntimeSpirv-SubgroupUniformControlFlowKHR-06379) VUID-RuntimeSpirv-SubgroupUniformControlFlowKHR-06379

The `Execution` `Mode` `SubgroupUniformControlFlowKHR` **must** not be
applied to an entry point unless the
[    `shaderSubgroupUniformControlFlow`](../chapters/features.html#features-shaderSubgroupUniformControlFlow) feature is enabled, the
corresponding shader stage bit is set in
[`subgroupSupportedStages`](../chapters/devsandqueues.html#limits-subgroupSupportedStages), and
the entry point does not execute any [*invocation    repack instructions*](../chapters/raytracing.html#ray-tracing-repack)

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06767) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06767

If the [    `shaderEarlyAndLateFragmentTests`](../chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`EarlyAndLateFragmentTestsEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06768) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06768

If the [    `shaderEarlyAndLateFragmentTests`](../chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefUnchangedFrontEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06769) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06769

If the [    `shaderEarlyAndLateFragmentTests`](../chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefUnchangedBackEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06770) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06770

If the [    `shaderEarlyAndLateFragmentTests`](../chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefGreaterFrontEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06771) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06771

If the [    `shaderEarlyAndLateFragmentTests`](../chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefGreaterBackEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06772) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06772

If the [    `shaderEarlyAndLateFragmentTests`](../chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefLessFrontEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06773) VUID-RuntimeSpirv-shaderEarlyAndLateFragmentTests-06773

If the [    `shaderEarlyAndLateFragmentTests`](../chapters/features.html#features-shaderEarlyAndLateFragmentTests) feature is not enabled, the
`StencilRefLessBackEXT` `Execution` `Mode` **must** not be used

[](#VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06979) VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06979

If an `OpImageSampleWeightedQCOM` operation is used, then the
`Texture` `Sampled` `Image` and `Weight` `Image`
parameters **must** both be *dynamically uniform* for the quad

[](#VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06980) VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06980

If an `OpImageSampleWeightedQCOM` operation is used, then the
`Weight` `Image` parameter **must** be of `Storage` `Class`
`UniformConstant` and type `OpTypeImage` with `Depth`=0,
`Dim`=`2D`, `Arrayed`=1, `MS`=0, and `Sampled`=1

[](#VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06981) VUID-RuntimeSpirv-OpImageSampleWeightedQCOM-06981

If an `OpImageSampleWeightedQCOM` operation is used, then the
`Weight` `Image` parameter **must** be decorated with
`WeightTextureQCOM`

[](#VUID-RuntimeSpirv-OpImageBlockMatchSADQCOM-06982) VUID-RuntimeSpirv-OpImageBlockMatchSADQCOM-06982

If an `OpImageBlockMatchSADQCOM` or `OpImageBlockMatchSSDQCOM`
operation is used, then the `target` `sampled` `image`,
`reference` `sampled` `image`, and `Block` `Size`
parameters **must** both be *dynamically uniform* for the quad

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06983) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06983

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** be of storage
class `UniformConstant` and type `OpTypeImage` with `Depth`=0,
`Dim`=`2D`, `Arrayed`=0, `MS`=0, and `Sampled`=1

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06984) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06984

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then the `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** be decorated
with `BlockMatchTextureQCOM`

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06985) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06985

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** have been
created using an identical sampler object

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06986) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06986

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** have been
created with a sampler object with `unnormalizedCoordinates` equal
to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06987) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06987

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `target` `sampled` `image` and
`reference` `sampled` `image` parameters **must** have been
created with a sampler object with `unnormalizedCoordinates` equal
to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06988) VUID-RuntimeSpirv-OpImageBlockMatchSSDQCOM-06988

If an `OpImageBlockMatchSSDQCOM` or `OpImageBlockMatchSADQCOM`
operation is used, then `Block` `Size` less than or equal to
[`maxBlockMatchRegion`](../chapters/devsandqueues.html#limits-blockmatch-maxblocksize)

[](#VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06989) VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06989

If an `OpImageBoxFilterQCOM` operation is used, then `Box`
`Size.y` **must** be equal to or greater than 1.0 and less than or equal
to [    `maxBoxFilterBlockSize`](../chapters/devsandqueues.html#limits-boxfilter-maxblocksize).`height`

[](#VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06990) VUID-RuntimeSpirv-OpImageBoxFilterQCOM-06990

If an `OpImageBoxFilterQCOM` operation is used, then `Sampled`
`Texture` `Image` and `Box` `Size` parameters **must** be
*dynamically uniform*

[](#VUID-RuntimeSpirv-OpEntryPoint-08727) VUID-RuntimeSpirv-OpEntryPoint-08727

Each `OpEntryPoint` **must** not have more than one variable decorated
with `InputAttachmentIndex` per image aspect of the attachment image
bound to it, either explicitly or implicitly as described by
[input attachment interface](../chapters/interfaces.html#interfaces-inputattachment)

[](#VUID-RuntimeSpirv-minSampleShading-08731) VUID-RuntimeSpirv-minSampleShading-08731

If [sample shading](../chapters/primsrast.html#primsrast-sampleshading) is enabled and
`minSampleShading` is 1.0, the `sample` operand of any
`OpColorAttachmentReadEXT`, `OpDepthAttachmentReadEXT`, or
`OpStencilAttachmentReadEXT` operation **must** evaluate to the value of
the [coverage index](../chapters/primsrast.html#primsrast-multisampling-coverage-mask) for any
given fragment invocation

[](#VUID-RuntimeSpirv-minSampleShading-08732) VUID-RuntimeSpirv-minSampleShading-08732

If [sample shading](../chapters/primsrast.html#primsrast-sampleshading) is enabled and any of the
`OpColorAttachmentReadEXT`, `OpDepthAttachmentReadEXT`, or
`OpStencilAttachmentReadEXT` operations are used, then
`minSampleShading` **must** be 1.0

[](#VUID-RuntimeSpirv-MeshEXT-09218) VUID-RuntimeSpirv-MeshEXT-09218

In mesh shaders using the `MeshEXT` or `MeshNV` `Execution` `Model`
and the `OutputPoints` `Execution` `Mode`,
if the [`maintenance5`](../chapters/features.html#features-maintenance5) feature is not
enabled, and
if the number of output points is greater than 0, a `PointSize`
decorated variable **must** be written to for each output point

[](#VUID-RuntimeSpirv-maintenance5-09190) VUID-RuntimeSpirv-maintenance5-09190

If the [`maintenance5`](../chapters/features.html#features-maintenance5) feature is enabled
and a `PointSize` decorated variable is written to, all execution
paths **must** write to a `PointSize` decorated variable

[](#VUID-RuntimeSpirv-maintenance5-10934) VUID-RuntimeSpirv-maintenance5-10934

If the [`maintenance5`](../chapters/features.html#features-maintenance5) feature is enabled
and a `PointSize` decorated variable is written to for any output
vertex in the `Geometry` `Execution` `Model`, all execution paths for
all output vertices **must** write to a `PointSize` decorated variable

[](#VUID-RuntimeSpirv-ShaderEnqueueAMDX-09191) VUID-RuntimeSpirv-ShaderEnqueueAMDX-09191

The `ShaderEnqueueAMDX` capability **must** only be used in shaders with
the `GLCompute`
or `MeshEXT`
execution model

[](#VUID-RuntimeSpirv-NodePayloadAMDX-09192) VUID-RuntimeSpirv-NodePayloadAMDX-09192

Variables in the `NodePayloadAMDX` storage class **must** only be
declared in the `GLCompute`
or `MeshEXT`
execution model

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09193) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09193

Variables declared in the `NodePayloadAMDX` storage class **must** not
be larger than the [    `maxExecutionGraphShaderPayloadSize`](../chapters/limits.html#limits-maxExecutionGraphShaderPayloadSize) limit

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09194) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09194

Variables declared in the `NodeOutputPayloadAMDX` storage class **must**
not be larger than the [    `maxExecutionGraphShaderPayloadSize`](../chapters/limits.html#limits-maxExecutionGraphShaderPayloadSize) limit

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09195) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadSize-09195

For a given entry point, the sum of the size of any variable in the
`NodePayloadAMDX` storage class, and the combined size of all
statically initialized variables in the `NodeOutputPayloadAMDX`
storage class **must** not be greater than
[    `maxExecutionGraphShaderPayloadSize`](../chapters/limits.html#limits-maxExecutionGraphShaderPayloadSize)

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadCount-09196) VUID-RuntimeSpirv-maxExecutionGraphShaderPayloadCount-09196

Shaders **must** not statically initialize more than
[    `maxExecutionGraphShaderPayloadCount`](../chapters/limits.html#limits-maxExecutionGraphShaderPayloadCount) variables in the
`NodeOutputPayloadAMDX` storage class

[](#VUID-RuntimeSpirv-maxExecutionGraphShaderOutputNodes-09197) VUID-RuntimeSpirv-maxExecutionGraphShaderOutputNodes-09197

Shaders **must** not include more than
[    `maxExecutionGraphShaderOutputNodes`](../chapters/limits.html#limits-maxExecutionGraphShaderOutputNodes) instances of
`OpInitializeNodePayloadsAMDX`

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09219) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09219

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then the
`target` `sampled` `image`, `reference` `sampled`
`image`, and `Block` `Size` parameters **must** both be
*dynamically uniform* for the quad

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09220) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09220

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** be of storage class `UniformConstant` and type
`OpTypeImage` with `Depth`=0, `Dim`=`2D`, `Arrayed`=0,
`MS`=0, and `Sampled`=1

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09221) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09221

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then the
`target` `sampled` `image` and `reference` `sampled`
`image` parameters **must** be decorated with `BlockMatchTextureQCOM`

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09222) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09222

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** have been created using an identical sampler object

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09223) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09223

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** have been created with a sampler object with
`unnormalizedCoordinates` equal to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-OpImageBlockMatchWindow-09224) VUID-RuntimeSpirv-OpImageBlockMatchWindow-09224

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `target`
`sampled` `image` and `reference` `sampled` `image`
parameters **must** have been created with sampler object with
`unnormalizedCoordinates` equal to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

[](#VUID-RuntimeSpirv-maxBlockMatchRegion-09225) VUID-RuntimeSpirv-maxBlockMatchRegion-09225

If a `OpImageBlockMatchWindow*QCOM` or
`OpImageBlockMatchGather*QCOM` operation is used, then `Block`
`Size` less than or equal to [    `maxBlockMatchRegion`](../chapters/devsandqueues.html#limits-blockmatch-maxblocksize)

[](#VUID-RuntimeSpirv-pNext-09226) VUID-RuntimeSpirv-pNext-09226

If a `OpImageBlockMatchWindow*QCOM` operation is used, then
`target` `sampled` `image` **must** have been created using
asampler object that included
[VkSamplerBlockMatchWindowCreateInfoQCOM](../chapters/samplers.html#VkSamplerBlockMatchWindowCreateInfoQCOM) in the `pNext` chain

[](#VUID-RuntimeSpirv-MaximallyReconvergesKHR-09565) VUID-RuntimeSpirv-MaximallyReconvergesKHR-09565

The execution mode `MaximallyReconvergesKHR` **must** not be applied to
an entry point unless the entry point does not execute any
[*invocation repack instructions*](../chapters/raytracing.html#ray-tracing-repack)

[](#VUID-RuntimeSpirv-shaderSubgroupRotateClustered-09566) VUID-RuntimeSpirv-shaderSubgroupRotateClustered-09566

If [    `shaderSubgroupRotateClustered`](../chapters/features.html#features-shaderSubgroupRotateClustered) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), then the
`ClusterSize` operand to `OpGroupNonUniformRotateKHR` **must** not be
used

[](#VUID-RuntimeSpirv-protectedNoFault-09645) VUID-RuntimeSpirv-protectedNoFault-09645

If [`protectedNoFault`](../chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
the `Storage` `Class` of the `PhysicalStorageBuffer` **must** not be used
if the buffer being accessed is [protected](../chapters/memory.html#memory-protected-memory)

[](#VUID-RuntimeSpirv-meshAndTaskShaderDerivatives-10153) VUID-RuntimeSpirv-meshAndTaskShaderDerivatives-10153

If [    `meshAndTaskShaderDerivatives`](../chapters/limits.html#limits-meshAndTaskShaderDerivatives) is [VK_FALSE](../chapters/fundamentals.html#VK_FALSE), the
`DerivativeGroupLinearKHR` and `DerivativeGroupQuadsKHR` execution
modes **must** not be used in the `MeshEXT`, `MeshNV`, `TaskEXT`,
or `TaskNV` `Execution` `Model`

[](#VUID-RuntimeSpirv-TileShadingQCOM-10698) VUID-RuntimeSpirv-TileShadingQCOM-10698

`TileShadingQCOM` capability **must** not be declared in the compute
stage unless the [tileShading](../chapters/features.html#features-tileShading) feature is enabled

[](#VUID-RuntimeSpirv-TileShadingQCOM-10699) VUID-RuntimeSpirv-TileShadingQCOM-10699

The `TileShadingQCOM` capability **must** not be declared in the
fragment stage unless the
[tileShadingFragmentStage](../chapters/features.html#features-tileShadingFragmentStage) feature
is enabled

[](#VUID-RuntimeSpirv-TileShadingQCOM-10700) VUID-RuntimeSpirv-TileShadingQCOM-10700

A shader that enables SPIR-V capability `TileShadingQCOM` **must** not
be invoked outside a [tile shading render    pass](../chapters/renderpass.html#renderpass-tile-shading)

[](#VUID-RuntimeSpirv-TileShadingQCOM-10701) VUID-RuntimeSpirv-TileShadingQCOM-10701

A compute shader that enables SPIR-V capability `TileShadingQCOM`
**must** only be invoked inside those portions of a command buffer where
[per-tile execution model](../chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

[](#VUID-RuntimeSpirv-x-10702) VUID-RuntimeSpirv-x-10702

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
the `x` size in `TileShadingRateQCOM` **must** be less than or equal
to [VkPhysicalDeviceTileShadingPropertiesQCOM](../chapters/limits.html#VkPhysicalDeviceTileShadingPropertiesQCOM).maxTileShadingRate.x

[](#VUID-RuntimeSpirv-y-10703) VUID-RuntimeSpirv-y-10703

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
the `y` size in `TileShadingRateQCOM` **must** be less than or equal
to [VkPhysicalDeviceTileShadingPropertiesQCOM](../chapters/limits.html#VkPhysicalDeviceTileShadingPropertiesQCOM).maxTileShadingRate.y

[](#VUID-RuntimeSpirv-z-10704) VUID-RuntimeSpirv-z-10704

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
the `z` size in `TileShadingRateQCOM` **must** be less than or equal
to [VkTilePropertiesQCOM](../chapters/renderpass.html#VkTilePropertiesQCOM).tileSize.z

[](#VUID-RuntimeSpirv-tileSize-10705) VUID-RuntimeSpirv-tileSize-10705

In compute shaders that enables SPIR-V capability `TileShadingQCOM`,
[VkTilePropertiesQCOM](../chapters/renderpass.html#VkTilePropertiesQCOM).tileSize.z %
`TileShadingRateQCOM`::`z` **must** equal `0`

[](#VUID-RuntimeSpirv-OpImage-10706) VUID-RuntimeSpirv-OpImage-10706

An `OpImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be consumed by `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
unless the [tileShadingAtomicOps](../chapters/features.html#features-tileShadingFragmentStage)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeImage-10707) VUID-RuntimeSpirv-OpTypeImage-10707

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the color attachment of the
current subpass instance unless the
[tileShadingColorAttachments](../chapters/features.html#features-tileShadingColorAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeImage-10708) VUID-RuntimeSpirv-OpTypeImage-10708

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the depth aspect of the
depth/stencil attachment of the current subpass instance unless the
[tileShadingDepthAttachments](../chapters/features.html#features-tileShadingDepthAttachments)

[](#VUID-RuntimeSpirv-OpTypeImage-10709) VUID-RuntimeSpirv-OpTypeImage-10709

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the stencil aspect of the
depth/stencil attachment of the current subpass instance unless the
[tileShadingStencilAttachments](../chapters/features.html#features-tileShadingStencilAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeImage-10710) VUID-RuntimeSpirv-OpTypeImage-10710

An `OpTypeImage` with `Storage` `Class` `TileAttachmentQCOM`
**must** not be backed by a view equivalent to the input attachment of the
current subpass instance unless the
[tileShadingInputAttachments](../chapters/features.html#features-tileShadingInputAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-OpTypeSampledImage-10711) VUID-RuntimeSpirv-OpTypeSampledImage-10711

An `OpTypeSampledImage` with `Storage` `Class`
`TileAttachmentQCOM` **must** not be backed by a view equivalent to an
attachment of the current subpass instance unless the
[tileShadingSampledAttachments](../chapters/features.html#features-tileShadingSampledAttachments)
feature is enabled

[](#VUID-RuntimeSpirv-tileShadingImageProcessing-10712) VUID-RuntimeSpirv-tileShadingImageProcessing-10712

If an `OpTypeSampledImage` with `Storage` `Class`
`TileAttachmentQCOM` is consumed by any argument of the following
operations,
[`tileShadingImageProcessing`](../chapters/features.html#features-tileShadingImageProcessing)
**must** be enabled:

* 
`OpImageSampleWeightedQCOM`

* 
`OpImageBoxFilterQCOM`

* 
`OpImageBlockMatch*QCOM`

[](#VUID-RuntimeSpirv-Coordinate-10713) VUID-RuntimeSpirv-Coordinate-10713

The `Coordinate` operand of any `OpImageRead`,
`OpImageSparseRead`, `OpImageWrite`,
`OpUntypedImageTexelPointerEXT`
or `OpImageTexelPointer` instruction that consumes an
`OpTypeImage` with an image `Storage` `Class`
`TileAttachmentQCOM` **must** not result in any texels accessed outside
the boundaries of the current tile, computed as described in
[Tile Attachments](../chapters/renderpass.html#renderpass-tile-shading-offset-validation)

[](#VUID-RuntimeSpirv-Coordinate-10714) VUID-RuntimeSpirv-Coordinate-10714

The `Coordinate` operand(s) of any of the following instructions that
consumes an `OpTypeSampledImage` with an image of `Storage`
`Class` `TileAttachmentQCOM` **must** not result in any texels
accessed outside boundaries of the current tile, computed as described
in [Tile Attachments](../chapters/renderpass.html#renderpass-tile-shading-offset-validation):

* 
`OpImageSample*`

* 
`OpImageSparseSample*`

* 
`OpImageFetch`

* 
`OpImageSparseFetch`

* 
`OpImage*Gather`

* 
`OpImageSparse*Gather`

* 
`OpImageSampleWeightedQCOM`

* 
`OpImageBoxFilterQCOM`

* 
`OpImageBlockMatch*QCOM`

[](#VUID-RuntimeSpirv-OpTypeSampler-12203) VUID-RuntimeSpirv-OpTypeSampler-12203

If a variable with type `OpTypeSampler` is declared in the
[Shader Resource Interface](../chapters/interfaces.html#interfaces-resources), it **must** not be
backed by a [sampler](../chapters/samplers.html#samplers) that requires
[sampler Y′CBCR conversion](../chapters/samplers.html#samplers-YCbCr-conversion)

[](#VUID-RuntimeSpirv-OpTypeImage-12204) VUID-RuntimeSpirv-OpTypeImage-12204

If a variable with type `OpTypeImage` is declared in the
[Shader Resource Interface](../chapters/interfaces.html#interfaces-resources), it **must** not be
backed by an [image view](../chapters/resources.html#resources-image-views) that requires
[sampler Y′CBCR conversion](../chapters/samplers.html#samplers-YCbCr-conversion)

[](#VUID-RuntimeSpirv-None-12205) VUID-RuntimeSpirv-None-12205

If an [image view](../chapters/resources.html#resources-image-views) or [sampler](../chapters/samplers.html#samplers) that
requires [sampler Y′CBCR conversion](../chapters/samplers.html#samplers-YCbCr-conversion) is
accessed in a shader, it **must** be determined by
[constant integral expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-RuntimeSpirv-OpTypeSampledImage-12206) VUID-RuntimeSpirv-OpTypeSampledImage-12206

If an `OpTypeSampledImage` variable backed by an
[image view](../chapters/resources.html#resources-image-views) and [sampler](../chapters/samplers.html#samplers) that
require [sampler Y′CBCR conversion](../chapters/samplers.html#samplers-YCbCr-conversion) is
statically used in a shader, it **must** only be used with
`OpImageSample*`, `OpImageSparseSample*`, or `OpImage`
instructions

[](#VUID-RuntimeSpirv-OpTypeImage-12207) VUID-RuntimeSpirv-OpTypeImage-12207

If a `OpTypeImage` variable backed by an [    image view](../chapters/resources.html#resources-image-views) that requires [sampler Y′CBCR    conversion](../chapters/samplers.html#samplers-YCbCr-conversion) is statically used in a shader, it **must** only be used with
`OpImageQueryLevels` or `OpImageQuerySizeLod` instructions

[](#VUID-RuntimeSpirv-ConstOffset-10718) VUID-RuntimeSpirv-ConstOffset-10718

If an `OpTypeSampledImage` variable backed by an
[image view](../chapters/resources.html#resources-image-views) and [sampler](../chapters/samplers.html#samplers) that
require [sampler Y′CBCR conversion](../chapters/samplers.html#samplers-YCbCr-conversion) is
statically used in a shader with a sampling instruction, it **must** not
use the `ConstOffset` or `Offset` operands

[](#VUID-RuntimeSpirv-OpTypeSampledImage-12208) VUID-RuntimeSpirv-OpTypeSampledImage-12208

If an `OpTypeSampledImage` variable backed by an
[image view](../chapters/resources.html#resources-image-views) and [sampler](../chapters/samplers.html#samplers) that
require [sampler Y′CBCR conversion](../chapters/samplers.html#samplers-YCbCr-conversion) is
statically used in a shader, the image view and sampler **must** have been
created with an *identically defined* [VkSamplerYcbcrConversion](../chapters/samplers.html#VkSamplerYcbcrConversion) set
via [VkSamplerYcbcrConversionInfo](../chapters/samplers.html#VkSamplerYcbcrConversionInfo)

[](#VUID-RuntimeSpirv-shaderUniformBufferUnsizedArray-11806) VUID-RuntimeSpirv-shaderUniformBufferUnsizedArray-11806

If the [    `shaderUniformBufferUnsizedArray`](../chapters/features.html#features-shaderUniformBufferUnsizedArray) feature is not enabled,
`OpTypeRuntimeArray` **must** not be used for the last member of a
`Block`-decorated `OpTypeStruct` in the `Uniform` storage
`Storage` `Class`

[](#VUID-RuntimeSpirv-shaderTensorSupportedStages-09901) VUID-RuntimeSpirv-shaderTensorSupportedStages-09901

`OpTypeTensorARM`, `OpTensorReadARM`, `OpTensorWriteARM`, or
`OpTensorQuerySizeARM` **must** not be used in shader stages not in
[`shaderTensorSupportedStages`](../chapters/limits.html#limits-shaderTensorSupportedStages)

[](#VUID-RuntimeSpirv-OpTypeTensorARM-09902) VUID-RuntimeSpirv-OpTypeTensorARM-09902

`OpTypeTensorARM` with a `Shape` **must** not be used in shader
stages

[](#VUID-RuntimeSpirv-OpTypeTensorARM-09907) VUID-RuntimeSpirv-OpTypeTensorARM-09907

`OpTypeTensorARM` without a `Rank` **must** not be used in shader
stages

[](#VUID-RuntimeSpirv-maxTensorShaderAccessArrayLength-09903) VUID-RuntimeSpirv-maxTensorShaderAccessArrayLength-09903

The length of an array returned by `OpTensorReadARM` or passed as the
`Object` operand to `OpTensorWriteARM` **must** be less than or equal
to [    `maxTensorShaderAccessArrayLength`](../chapters/limits.html#limits-maxTensorShaderAccessArrayLength)

[](#VUID-RuntimeSpirv-maxTensorShaderAccessSize-09904) VUID-RuntimeSpirv-maxTensorShaderAccessSize-09904

The total size of the data (number of tensor elements × size of an
element) read or written by one `OpTensorReadARM`, or
`OpTensorWriteARM` instruction, respectively, **must** be less than or
equal to [    `maxTensorShaderAccessSize`](../chapters/limits.html#limits-maxTensorShaderAccessSize)

[](#VUID-RuntimeSpirv-None-10824) VUID-RuntimeSpirv-None-10824

If the [`maintenance9`](../chapters/features.html#features-maintenance9) feature is not
enabled, the
`Base` operand of any `OpBitCount`, `OpBitReverse`,
`OpBitFieldInsert`, `OpBitFieldSExtract`, or
`OpBitFieldUExtract` instruction **must** be a 32-bit integer scalar or
a vector of 32-bit integers

[](#VUID-RuntimeSpirv-GraphARM-09922) VUID-RuntimeSpirv-GraphARM-09922

The `GraphARM` capability **must** not be declared in modules used to
create a shader stage

[](#VUID-RuntimeSpirv-pNext-09919) VUID-RuntimeSpirv-pNext-09919

For each [data graph pipeline](../chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineShaderModuleCreateInfoARM) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM), the
`OpGraph` that is used by the `OpGraphEntryPointARM` the pipeline
is being created for **must** have an `OpTypeGraphARM` that only uses
`OpTypeTensorARM` with `Shape` present

[](#VUID-RuntimeSpirv-pNext-09920) VUID-RuntimeSpirv-pNext-09920

For each [data graph pipeline](../chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineShaderModuleCreateInfoARM) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM), all the
`OpGraphConstantARM` with `OpTypeTensorARM` type used by the
`OpGraph` that is used by the `OpGraphEntryPointARM` the pipeline
is being created for **must** have an `OpTypeTensorARM` with `Shape`
present

[](#VUID-RuntimeSpirv-pNext-09921) VUID-RuntimeSpirv-pNext-09921

For each [data graph pipeline](../chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineShaderModuleCreateInfoARM) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM), one and
only one [VkDataGraphPipelineConstantARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineConstantARM) structure that satisfies
all the following constraints **must** be present in
[VkDataGraphPipelineShaderModuleCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineShaderModuleCreateInfoARM)::`pConstants` for
each `OpGraphConstantARM` used by the `OpGraph` that has a
`OpTypeTensorARM` type and is used by the `OpGraphEntryPointARM`
the pipeline is being created for:

* 
its `id` member **must** match the `GraphConstantID` of the
`OpGraphConstantARM`

* 
its `pNext` chain **must** include a [VkTensorDescriptionARM](../chapters/resources.html#VkTensorDescriptionARM)
structure

whose `dimensionCount` is equal to the `Rank` of the
`OpTypeTensorARM` of the `OpGraphConstantARM`

* 
whose `pDimensions` array elements are individually and in order
equal to the elements of the array that defines the `Shape` of the
`OpTypeTensorARM` of the `OpGraphConstantARM`

* 
whose `format` [is compatible](#spirvenv-tensor-formats) with the
`ElementType` of the `OpTypeTensorARM` of the
`OpGraphConstantARM`

[](#VUID-RuntimeSpirv-pNext-09923) VUID-RuntimeSpirv-pNext-09923

For each [data graph pipeline](../chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines) created with a
[VkDataGraphPipelineShaderModuleCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineShaderModuleCreateInfoARM) structure included in
the `pNext` chain of [VkDataGraphPipelineCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM), one and
only one [VkDataGraphPipelineResourceInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineResourceInfoARM) structure that
satisfies all the following constraints **must** be present in
[VkDataGraphPipelineCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM)::`pResourceInfos` for each
`OpVariable` with a `OpTypeTensorARM` type that is part of the
`Interface` of the `OpGraphEntryPointARM` the pipeline is being
created for:

* 
its `descriptorSet` member **must** match the `DescriptorSet`
decoration applied to the `OpVariable`

* 
its `binding` member **must** match the `Binding` decoration
applied to the `OpVariable`

* 
its `arrayElement` member **must** be zero

* 
its `pNext` chain **must** include a [VkTensorDescriptionARM](../chapters/resources.html#VkTensorDescriptionARM)
structure

whose `dimensionCount` is equal to the `Rank` of the
`OpTypeTensorARM` of the `OpVariable` or its elements

* 
whose `pDimensions` array elements are individually and in order
equal to the elements of the array that defines the `Shape` of the
`OpTypeTensorARM` of the `OpVariable` or its elements

* 
whose `format` [is compatible](#spirvenv-tensor-formats) with the
`ElementType` of the `OpTypeTensorARM` of the `OpVariable`

[](#VUID-RuntimeSpirv-maxShaderBindingTableRecordIndex-11888) VUID-RuntimeSpirv-maxShaderBindingTableRecordIndex-11888

The SBT Index passed in to
`OpHitObjectSetShaderBindingTableRecordIndexEXT` **must** be less than
or equal to
[VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT](../chapters/limits.html#VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT)::`maxShaderBindingTableRecordIndex`

[](#VUID-RuntimeSpirv-None-10834) VUID-RuntimeSpirv-None-10834

[Buffer indexing calculations](#spirvenv-buffer-indexing) **must** not wrap
32 bits
if the pipeline or shader was not created with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](../chapters/pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](../chapters/shaders.html#VkShaderCreateFlagBitsEXT) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpArrayLength-11807) VUID-RuntimeSpirv-OpArrayLength-11807

`OpArrayLength`
and `OpUntypedArrayLengthKHR`
result type **must** be a 32-bit integer type
if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](../chapters/pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](../chapters/shaders.html#VkShaderCreateFlagBitsEXT) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpConstantSizeOfEXT-11475) VUID-RuntimeSpirv-OpConstantSizeOfEXT-11475

The result type of `OpConstantSizeOfEXT` **must** not be a 64-bit
integer type if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](../chapters/pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](../chapters/shaders.html#VkShaderCreateFlagBitsEXT) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-11808) VUID-RuntimeSpirv-OpCooperativeVectorMatrixMulAddNV-11808

`OpCooperativeVectorMatrixMulAddNV` and
`OpCooperativeVectorMatrixMulNV` `MatrixOffset` and
`BiasOffset` parameters **must** be 32-bit integer types
if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](../chapters/pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](../chapters/shaders.html#VkShaderCreateFlagBitsEXT) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-11809) VUID-RuntimeSpirv-OpCooperativeVectorLoadNV-11809

`OpCooperativeVectorLoadNV`, `OpCooperativeVectorStoreNV`,
`OpCooperativeVectorOuterProductAccumulateNV`, and
`OpCooperativeVectorReduceSumAccumulateNV` `Offset` parameters
**must** be 32-bit integer types
if the pipeline or shader was not compiled with the
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](../chapters/pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](../chapters/shaders.html#VkShaderCreateFlagBitsEXT) flags and the entry point
does not set the `Shader64BitIndexingEXT` execution mode

[](#VUID-RuntimeSpirv-longVector-12296) VUID-RuntimeSpirv-longVector-12296

If the [`longVector`](../chapters/features.html#features-longVector) feature is enabled, the
`Component` `Count` of any vector type **must** be less than or equal
to [`maxVectorComponents`](../chapters/limits.html#limits-maxVectorComponents)

[](#VUID-RuntimeSpirv-samplerDescriptorAlignment-11348) VUID-RuntimeSpirv-samplerDescriptorAlignment-11348

If the `Result` `Type` operand of `OpLoad` is
`OpTypeSampler`, and `Pointer` is derived from a variable
decorated with `SamplerHeapEXT`, it **must** be at an offset from the
base that is a multiple of [    `samplerDescriptorAlignment`](../chapters/limits.html#limits-samplerDescriptorAlignment)

[](#VUID-RuntimeSpirv-imageDescriptorAlignment-11349) VUID-RuntimeSpirv-imageDescriptorAlignment-11349

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, it **must** be at an offset from the base that is a
multiple of [    `imageDescriptorAlignment`](../chapters/limits.html#limits-imageDescriptorAlignment)

[](#VUID-RuntimeSpirv-imageDescriptorAlignment-11383) VUID-RuntimeSpirv-imageDescriptorAlignment-11383

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, it **must**
be at an offset from the base that is a multiple of
[`imageDescriptorAlignment`](../chapters/limits.html#limits-imageDescriptorAlignment)

[](#VUID-RuntimeSpirv-Result-11350) VUID-RuntimeSpirv-Result-11350

If the `Result` `Type` operand of `OpLoad` is
`OpTypeAccelerationStructureKHR` and `Pointer` is derived from a
variable decorated with `ResourceHeapEXT`, it **must** be at an offset
from the base that is a multiple of [    `bufferDescriptorAlignment`](../chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-bufferDescriptorAlignment-11384) VUID-RuntimeSpirv-bufferDescriptorAlignment-11384

The `Buffer` operand of `OpBufferPointerEXT` **must** be at an offset
from the base of the `ResourceHeapEXT` that is a multiple of
[`bufferDescriptorAlignment`](../chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-tensorDescriptorAlignment-11481) VUID-RuntimeSpirv-tensorDescriptorAlignment-11481

If the `Result` `Type` operand of `OpLoad` is
`OpTypeTensorARM` and `Pointer` is derived from a variable
decorated with `ResourceHeapEXT`, it **must** be at an offset from the
base that is a multiple of [    `tensorDescriptorAlignment`](../chapters/limits.html#limits-tensorDescriptorAlignment)

[](#VUID-RuntimeSpirv-samplerDescriptorAlignment-11476) VUID-RuntimeSpirv-samplerDescriptorAlignment-11476

If a `OpTypeSampler` member of a struct is decorated with `Offset`
or `OffsetIdEXT`, the `Byte` `Offset` value must be a multiple
of
[`samplerDescriptorAlignment`](../chapters/limits.html#limits-samplerDescriptorAlignment)

[](#VUID-RuntimeSpirv-imageDescriptorAlignment-11477) VUID-RuntimeSpirv-imageDescriptorAlignment-11477

If a `OpTypeImage` member of a struct is decorated with `Offset`
or `OffsetIdEXT`, the `Byte` `Offset` value must be a multiple
of [`imageDescriptorAlignment`](../chapters/limits.html#limits-imageDescriptorAlignment)

[](#VUID-RuntimeSpirv-bufferDescriptorAlignment-11478) VUID-RuntimeSpirv-bufferDescriptorAlignment-11478

If a `OpTypeBufferEXT` member of a struct is decorated with
`Offset` or `OffsetIdEXT`, the `Byte` `Offset` value must be
a multiple of
[`bufferDescriptorAlignment`](../chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-bufferDescriptorAlignment-11479) VUID-RuntimeSpirv-bufferDescriptorAlignment-11479

If a `OpTypeAccelerationStructureKHR` member of a struct is decorated
with `Offset` or `OffsetIdEXT`, the `Byte` `Offset` value
must be a multiple of [    `bufferDescriptorAlignment`](../chapters/limits.html#limits-bufferDescriptorAlignment)

[](#VUID-RuntimeSpirv-tensorDescriptorAlignment-11480) VUID-RuntimeSpirv-tensorDescriptorAlignment-11480

If a `OpTypeTensorARM` member of a struct is decorated with
`Offset` or `OffsetIdEXT`, the `Byte` `Offset` value must be
a multiple of [    `tensorDescriptorAlignment`](../chapters/limits.html#limits-tensorDescriptorAlignment)

[](#VUID-RuntimeSpirv-DescriptorSet-11385) VUID-RuntimeSpirv-DescriptorSet-11385

If an instruction accesses memory through any resource with a
`DescriptorSet` and `Binding` that are [    mapped](../chapters/descriptorheaps.html#descriptorheaps-bindings) using [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT), the resource
through which that memory is accessed **must** be determined by
[constant integral expressions](glossary.html#glossary-constant-integral-expression)

[](#VUID-RuntimeSpirv-source-11387) VUID-RuntimeSpirv-source-11387

All possible values of a variable pointer to a resource that are not
`OpConstantNull` **must** either all be pointers to resources with
`DescriptorSet` and `Binding` decorations with the same
[mapping types](../chapters/descriptorheaps.html#descriptorheaps-bindings) as specified by
[VkDescriptorSetAndBindingMappingEXT](../chapters/descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT)::`source`, or all be
pointers to resources without `DescriptorSet` and `Binding`
decorations

[](#VUID-RuntimeSpirv-DescriptorSet-11388) VUID-RuntimeSpirv-DescriptorSet-11388

All possible values of a variable pointer to a resource **must** not be
resources with a `DescriptorSet` and `Binding` that are
[mapped](../chapters/descriptorheaps.html#descriptorheaps-bindings) using
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](../chapters/descriptorheaps.html#VkDescriptorMappingSourceEXT)

[](#VUID-RuntimeSpirv-Result-11340) VUID-RuntimeSpirv-Result-11340

If the `Result` `Type` operand of `OpLoad` is
`OpTypeSampler`, and `Pointer` is derived from a variable
decorated with `SamplerHeapEXT`, it **must** correspond to loading a
descriptor matching one of the descriptor types listed in
[Heap Resource Type    Correspondence](../chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for `OpTypeSampler`

[](#VUID-RuntimeSpirv-Result-11341) VUID-RuntimeSpirv-Result-11341

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, it **must** correspond to loading a descriptor
matching one of the descriptor types listed in
[Heap Resource Type    Correspondence](../chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for `OpTypeImage`

[](#VUID-RuntimeSpirv-Result-11342) VUID-RuntimeSpirv-Result-11342

The `Buffer` operand of `OpBufferPointerEXT` **must** correspond to
accessing a descriptor matching one of the descriptor types listed in
[Heap Resource Type    Correspondence](../chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for `OpTypePointer`

[](#VUID-RuntimeSpirv-Result-11343) VUID-RuntimeSpirv-Result-11343

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, the `Image` `Format` and `Sampled`
`Type` of that `OpTypeImage` **must** correspond to a descriptor with
a [VkFormat](../chapters/formats.html#VkFormat) that matches as described by [    Compatibility Between SPIR-V Image Formats and Vulkan Formats](#spirvenv-image-formats) and
[Image Format and Type Matching](#spirvenv-format-type-matching)
Between SPIR-V Image Formats and Vulkan Formats>>

[](#VUID-RuntimeSpirv-Result-11345) VUID-RuntimeSpirv-Result-11345

If the `Result` `Type` operand of `OpLoad` is `OpTypeImage`,
and `Pointer` is derived from a variable decorated with
`ResourceHeapEXT`, the operands of that `OpTypeImage` **must**
correspond to a descriptor with operands that match as described by
[Heap Image    Operand Correspondence](../chapters/interfaces.html#interfaces-resources-heap-image-operand-correspondence) and
[Heap Image View    Type Dimensionality](../chapters/interfaces.html#interfaces-resources-heap-image-dim-correspondence)

[](#VUID-RuntimeSpirv-Image-11379) VUID-RuntimeSpirv-Image-11379

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, it **must**
correspond to accessing a descriptor matching one of the descriptor
types listed in [Heap    Resource Type Correspondence](../chapters/interfaces.html#interfaces-resources-heap-type-correspondence) for the `OpTypeImage` pointed to

[](#VUID-RuntimeSpirv-Image-11380) VUID-RuntimeSpirv-Image-11380

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, the
`Image` `Format` and `Sampled` `Type` of the
`OpTypeImage` pointed to **must** correspond to a descriptor with a
[VkFormat](../chapters/formats.html#VkFormat) that matches as described by [    Compatibility Between SPIR-V Image Formats and Vulkan Formats](#spirvenv-image-formats) and
[Image Format and Type Matching](#spirvenv-format-type-matching)

[](#VUID-RuntimeSpirv-Image-11382) VUID-RuntimeSpirv-Image-11382

If the `Image` operand of `OpImageTexelPointer`
or `OpUntypedImageTexelPointerEXT`
is derived from a variable decorated with `ResourceHeapEXT`, the
operands of that `OpTypeImage` **must** correspond to a descriptor with
operands that match as described by
[Heap Image    Operand Correspondence](../chapters/interfaces.html#interfaces-resources-heap-image-operand-correspondence) and
[Heap Image View    Type Dimensionality](../chapters/interfaces.html#interfaces-resources-heap-image-dim-correspondence)

The following rules apply to operations on all floating-point values:

* 
Positive and negative infinities and positive and negative zeros are
generated as dictated by [IEEE 754](../chapters/introduction.html#ieee-754) for the specified
encoding, but subject to the precisions allowed by each operation for a
given encoding, as specified in [Precision of    Individual Operations](#spirvenv-op-prec).

* 
Signaling NaNs are not required to be generated and exceptions
are never raised.
Signaling NaN **may** be converted to quiet NaNs values by
any floating-point instruction.

* 
The set of operations `OpPhi`, `OpSelect`, `OpFunctionCall`,
`OpReturnValue`, `OpVectorExtractDynamic`,
`OpVectorInsertDynamic`, `OpVectorShuffle`,
`OpCompositeConstruct`, `OpCompositeExtract`,
`OpCompositeInsert`, `OpTranspose`, `OpCopyObject`,
`OpCopyLogical`, `OpCopyMemory`,
`OpGroupNonUniformBroadcast`, `OpGroupNonUniformBroadcastFirst`,
`OpGroupNonUniformShuffle`, `OpGroupNonUniformShuffleXor`,
`OpGroupNonUniformShuffleUp`, `OpGroupNonUniformShuffleDown`,
`OpGroupNonUniformQuadBroadcast`, `OpGroupNonUniformQuadSwap`,
`OpSubgroupReadInvocationKHR`, `OpSubgroupFirstInvocationKHR`,
`OpGroupNonUniformRotateKHR`,
`OpCooperativeMatrixLoadKHR`, `OpCooperativeMatrixStoreKHR`,
`OpCooperativeMatrixLoadNV`, `OpCooperativeMatrixStoreNV`,
`OpCooperativeMatrixLoadTensorNV`,
`OpCooperativeMatrixStoreTensorNV`,
`OpAtomicLoad`, `OpAtomicStore`, `OpAtomicExchange`,
`OpStore`, and `OpLoad` are referred to as *bit-preserving
operations*.

* 
The floating-point environment used for an instruction can be determined
as follows:

If the SPIR-V specifies it explicitly using the `FPFastMath`
decoration or `FPFastMathDefault` `Execution` `Mode` then that is used.

* 
If the environment is not specified in the SPIR-V then it is determined
as follows:

If the operation is not decorated `NoContraction` then the flags
`AllowContract`, `AllowReassoc`, `AllowRecip`, and
`AllowTransform` are assumed.

* 
If any of the following conditions are true then the flags `NSZ`,
`NotInf`, and `NotNaN` are assumed:

The entry point does not use the `Execution` `Mode`
`SignedZeroInfNanPreserve` with a bit-width corresponding to one
of the operands or to the result type.

* 
The operation is not a bit-preserving operation and is not one of
       `OpFConvert`, `OpFNegate`, `OpFAdd`, `OpFSub`,
       `OpFMul`, `OpFDiv`, `OpIsNan`, `OpIsInf`,
       `OpVectorTimesScalar`, `OpMatrixTimesScalar`,
       `OpVectorTimesMatrix`, `OpMatrixTimesVector`,
       `OpMatrixTimesMatrix`, `OpOuterProduct`, `OpDot`,
       `OpFOrdEqual`, `OpFUnordEqual`, `OpFOrdNotEqual`,
       `OpFUnordNotEqual`, `OpFOrdLessThan`, `OpFUnordLessThan`,
       `OpFOrdGreaterThan`, `OpFUnordGreaterThan`,
       `OpFOrdLessThanEqual`, `OpFUnordLessThanEqual`,
       `OpFOrdGreaterThanEqual`, `OpFUnordGreaterThanEqual`,
       `OpGroupNonUniformAllEqual`,
`OpSubgroupAllEqualKHR`,
       `OpGroupNonUniformFMin`, `OpGroupNonUniformFMax`,
       `OpAtomicCompareExchange`, `OpAtomicCompareExchangeWeak`,
       `OpDPdx`, `OpDPdy`, `OpFwidth`, `OpDPdxFine`,
       `OpDPdyFine`, `OpFwidthFine`, `OpDPdxCoarse`,
       `OpDPdyCoarse`, or `OpFwidthCoarse`.

* 
The operation is an `OpLoad` from the `Input` `Storage` `Class` in
the fragment shader stage.

All bit-preserving operations and the following instructions **must** not
flush denormalized values: `OpConstant`, `OpConstantComposite`,
`OpSpecConstant`, `OpSpecConstantComposite`, and `OpBitcast`.

Denormalized values are supported.

* 
By default any denormalized floating-point value input into a shader or
potentially generated by any instruction (except those listed above) or
any extended instructions for GLSL in a shader **may** be flushed to zero.

* 
Denormalized floating-point values whose type use the
`Float8E4M3EXT` or `Float8E5M2EXT` FP Encoding **must** be preserved
during conversions to IEEE 754 binary 16 floating-point values.

* 
If the entry point is declared with the `DenormFlushToZero`
`Execution` `Mode` then for the affected instructions the denormalized
result **must** be flushed to zero and the denormalized operands **may** be
flushed to zero.
Denormalized values obtained via unpacking an integer into a vector of
values with smaller bit width and interpreting those values as
floating-point numbers **must** be flushed to zero.

* 
When denormal values are being flushed, the result of an operation **may**
be considered denormal whenever the infinitely precise result is
non-zero and of smaller magnitude than the smallest normal value, even
if rounding would otherwise give a normal result.

* 
The following core SPIR-V instructions **must** respect the
     `DenormFlushToZero` `Execution` `Mode`: `OpSpecConstantOp` (with
     opcode `OpFConvert`), `OpFConvert`, `OpFNegate`, `OpFAdd`,
     `OpFSub`, `OpFMul`,
`OpFmaKHR`,
     `OpFDiv`, `OpFRem`, `OpFMod`, `OpVectorTimesScalar`,
     `OpMatrixTimesScalar`, `OpVectorTimesMatrix`,
     `OpMatrixTimesVector`, `OpMatrixTimesMatrix`,
     `OpOuterProduct`, `OpDot`, `OpGroupNonUniformFMin`,
     `OpGroupNonUniformFMax`,
`OpAtomicFAddEXT`,
`OpAtomicFMinEXT`,
`OpAtomicFMaxEXT`,
     `OpDPdx`, `OpDPdy`, `OpFwidth`, `OpDPdxFine`,
     `OpDPdyFine` `OpFwidthFine`, `OpDPdxCoarse`,
     `OpDPdyCoarse`, `OpFwidthCoarse`; and the following extended
     instructions for GLSL: `Round`, `RoundEven`, `Trunc`,
     `FAbs`, `Floor`, `Ceil`, `Fract`, `Radians`,
     `Degrees`, `Sin`, `Cos`, `Tan`, `Asin`, `Acos`,
     `Atan`, `Sinh`, `Cosh`, `Tanh`, `Asinh`, `Acosh`,
     `Atanh`, `Atan2`, `Pow`, `Exp`, `Log`, `Exp2`,
     `Log2`, `Sqrt`, `InverseSqrt`, `Determinant`,
     `MatrixInverse`, `Modf`, `ModfStruct`, `FMin`, `FMax`,
     `FClamp`, `FMix`, `Step`, `SmoothStep`, `Fma`,
     `UnpackHalf2x16`, `Length`, `Distance`, `Cross`,
     `Normalize`, `FaceForward`, `Reflect`, `Refract`,
     `NMin`, `NMax`, and `NClamp`.

* 
The following core SPIR-V instructions **must** respect the
     `DenormPreserve` `Execution` `Mode` for floating-point values with an
     [IEEE 754](../chapters/introduction.html#ieee-754) encoding: `OpSpecConstantOp`, `OpFConvert`,
     `OpFNegate`, `OpFAdd`, `OpFSub`, `OpFMul`,
`OpFmaKHR`,
     `OpVectorTimesScalar`, `OpMatrixTimesScalar`,
     `OpVectorTimesMatrix`, `OpMatrixTimesVector`,
     `OpMatrixTimesMatrix`, `OpOuterProduct`, `OpDot`,
     `OpFOrdEqual`, `OpFUnordEqual`, `OpFOrdNotEqual`,
     `OpFUnordNotEqual`, `OpFOrdLessThan`, `OpFUnordLessThan`,
     `OpFOrdGreaterThan`, `OpFUnordGreaterThan`,
     `OpFOrdLessThanEqual`, `OpFUnordLessThanEqual`,
     `OpFOrdGreaterThanEqual`, `OpFUnordGreaterThanEqual`,
     `OpSubgroupAllEqualKHR`,
     `OpGroupNonUniformAllEqual`, `OpGroupNonUniformFMin`,
     `OpGroupNonUniformFMax`, `OpAtomicCompareExchange`,
     `OpAtomicCompareExchangeWeak`,
`OpAtomicFAddEXT`,
`OpAtomicFMinEXT`,
`OpAtomicFMaxEXT`,
     `OpDPdx`, `OpDPdy`, `OpFwidth`, `OpDPdxFine`,
     `OpDPdyFine` `OpFwidthFine`, `OpDPdxCoarse`,
     `OpDPdyCoarse`, `OpFwidthCoarse`; and the following extended
     instructions for GLSL: `FAbs`, `FSign`, `Radians`,
     `Degrees`, `FMin`, `FMax`, `FClamp`, `FMix`, `Fma`,
     `PackHalf2x16`, `PackDouble2x32`, `UnpackHalf2x16`,
     `UnpackDouble2x32`, `NMin`, `NMax`, and `NClamp`.

The precision of double-precision instructions is at least that of single
precision.

The precision of individual operations is defined in
[Precision of Individual Operations](#spirvenv-op-prec).
Subject to the constraints below, however, implementations **may** reorder or
combine operations, resulting in expressions exhibiting different precisions
than might be expected from the constituent operations.

Implementations **may** rearrange floating-point operations using any of the
mathematical properties governing the expressions in precise arithmetic,
even where the floating- point operations do not share these properties.
This includes, but is not limited to associativity and distributivity, and
**may** involve a different number of rounding steps than would occur if the
operations were not rearranged.
In shaders that use the `SignedZeroInfNanPreserve` `Execution` `Mode` the
values **must** be preserved if they are generated after any rearrangement but
the `Execution` `Mode` does not change which rearrangements are valid.
This rearrangement **can** be prevented for particular operations by using the
`NoContraction` decoration.

|  | For example, in the absence of the `NoContraction` decoration
| --- | --- |
implementations are allowed to implement a + b - a and \({a
\times b}\over{a}\) as b.
The `SignedZeroInfNanPreserve` does not prevent these transformations,
even though they may overflow to infinity or NaN when evaluated in
floating-point.

If the `NoContraction` decoration is applied then operations may not be
rearranged, so, for example, a + a - a must account for possible
overflow to infinity.
If infinities are not preserved then the expression may be replaced with
a despite the `NoContraction` decoration, since the replacement is
exact when overflow does not occur.
If both `NoContraction` and `SignedZeroInfNanPreserve` are used then
the result must be infinity for sufficiently large a. |

The precision of individual operations is defined either in terms of
rounding (correctly rounded), as an error bound in ULP, or as inherited from
a formula as follows:

Correct Result
Operations that are described as returning the “correct result” will
return the infinitely precise result which, due to the nature of the
operation, will not need rounding.

Correctly Rounded
Operations described as “correctly rounded” will return the infinitely
precise result, x, rounded so as to be representable in
floating-point.
If the entry point is declared with the `RoundingModeRTE` or the
`RoundingModeRTZ` `Execution` `Mode` then this is done according to
[IEEE 754](../chapters/introduction.html#ieee-754) “roundTiesToEven” or “roundTowardZero” rounding
directions, respectively.
These execution modes do not affect operations on floating-point values with
the following encodings:

* 
`BFloat16KHR`

* 
`Float8E4M3EXT`

* 
`Float8E5M2EXT`

Otherwise, they are rounded with
[implementation-defined rounding mode](#spirvenv-correctly-rounded-impl-defined).

Correctly Rounded with Implementation-Defined Rounding Mode
Operations described as “correctly rounded with implementation-defined
rounding mode” will return the infinitely precise result, x, rounded
so as to be representable in floating-point.
If x is exactly representable then x will be returned.
Otherwise, either the floating-point value closest to and no less than
x or the value closest to and no greater than x will be
returned.
Which value is chosen is implementation-defined.

ULP
Where an error bound of n ULP (units in the last place) is given, for
an operation with infinitely precise result x the value returned **must** be
in the range [x - n × ulp(x), x +  n × ulp(x)].
The function ulp(x) is defined as follows:

If there exist non-equal, finite floating-point numbers a and
b such that a ≤ x ≤ b then ulp(x) is the minimum
possible distance between such numbers, \(ulp(x) =
\mathrm{min}_{a,b} | b - a |\).
If such numbers do not exist then ulp(x) is defined to be the
difference between the two non-equal, finite floating-point numbers
nearest to x.

Where the range of allowed return values includes any value of magnitude
larger than that of the largest representable finite floating-point number,
operations **may**, additionally, return either an infinity of the appropriate
sign or the finite number with the largest magnitude of the appropriate
sign.
If the infinitely precise result of the operation is not mathematically
defined then the value returned is poison.

Inherited From …​
Where an operation’s precision is described as being inherited from a
formula, the result returned **must** be at least as accurate as the result of
computing an approximation to x using a formula equivalent to the
given formula applied to the supplied inputs.
Specifically, the formula given may be transformed using the mathematical
associativity, commutativity, and distributivity of the operators involved
to yield an equivalent formula.
The SPIR-V precision rules, when applied to each such formula and the given
input values, define a range of permitted values.
If NaN is one of the permitted values then the operation may return
any result, otherwise let the largest permitted value in any of the ranges
be Fmax and the smallest be Fmin.
The operation **must** return a value in the range [x - E, x +  E]
where \(E = \mathrm{max} \left( | x - F_{\mathrm{min}} |, | x -
F_{\mathrm{max}} | \right) \).
If the entry point is declared with the `DenormPreserve` `Execution` `Mode`,
then denormals **must** be preserved throughout the formula.
Otherwise, any intermediate denormal value(s) while evaluating the formula
**may** be flushed to zero.
If the entry point is declared with the `DenormFlushToZero` execution
mode, then denormal final results **must** be flushed to zero.

The precision of all instructions on float values with the `BFloat16KHR`
encoding is required to be
[correctly rounded with implementation defined rounding mode](#spirvenv-correctly-rounded-impl-defined).

For IEEE754 half- (16 bit) and single- (32 bit) precision instructions,
precisions are **required** to be at least as follows:

| Instruction | Single precision, unless decorated with RelaxedPrecision | Half precision |
| --- | --- | --- |
| `OpFNegate` | Correct result. |
| `OpFAdd` | Correctly rounded. |
| `OpFSub` | Correctly rounded. |
| `OpFMul`, `OpVectorTimesScalar`, `OpMatrixTimesScalar` | Correctly rounded. |
| `OpMatrixTimesVector` | Inherited from   . |
| `OpVectorTimesMatrix` | Inherited from   . |
| `OpMatrixTimesMatrix` | Inherited from   . |
| `OpOuterProduct` | Correctly rounded. |
| `OpFmaKHR` | Correctly rounded. |
| `OpDot`(x, y) | Inherited from   . |
| `OpIsNan`, `OpIsInf` | Correct result. |
| `OpFOrdEqual`, `OpFUnordEqual` | Correct result. |
| `OpFOrdNotEqual`, `OpFUnordNotEqual` | Correct result. |
| `OpFOrdLessThan`, `OpFUnordLessThan` | Correct result. |
| `OpFOrdGreaterThan`, `OpFUnordGreaterThan` | Correct result. |
| `OpFOrdLessThanEqual`, `OpFUnordLessThanEqual` | Correct result. |
| `OpFOrdGreaterThanEqual`, `OpFUnordGreaterThanEqual` | Correct result. |
| `OpSubgroupAllEqualKHR` | Correct result. |
| `OpGroupNonUniformAllEqual` | Correct result. |
| `OpGroupNonUniformFMin`, `OpGroupNonUniformFMax` | Correct result. |
| `OpFDiv`(x,y) | 2.5 ULP for \|y\| = 0 or \|y\| in the range [2-126, 2126]. | 2.5 ULP for \|y\| = 0 or \|y\| in the range [2-14, 214]. |
| `OpFRem`(x,y) | Inherited from x - y × trunc(x/y). |
| `OpFMod`(x,y) | Inherited from x - y × floor(x/y). |
| `OpQuantizeToF16` | Correctly rounded with implementation defined rounding mode. |
| conversions between types | Correctly rounded. |
| `OpAtomicCompareExchange`, `OpAtomicCompareExchangeWeak` | Correct result. |
| `OpAtomicFAddEXT` | Return value correct result, value in memory correctly rounded. |
| `OpAtomicFMinEXT`, `OpAtomicFMaxEXT` | Correct result. |
| `OpDPdx`, `OpDPdy`, `OpFwidth` | Correctly rounded. |
| `OpDPdxCoarse`, `OpDPdyCoarse`, `OpFwidthCoarse` | Correctly rounded. |
| `OpDPdxFine`, `OpDPdyFine`, `OpFwidthFine` | Correctly rounded. |

|  | The `OpFRem` and `OpFMod` instructions use cheap approximations of
| --- | --- |
remainder, and the error can be large due to the discontinuity in trunc()
and floor().
This can produce mathematically unexpected results in some cases, such as
FMod(x,x) computing x rather than 0, and can also cause the result to have a
different sign than the infinitely precise result. |

| Instruction | Single precision, unless decorated with RelaxedPrecision | Half precision |
| --- | --- | --- |
| `fma`() | Inherited from `OpFMul` followed by `OpFAdd`. |
| `exp`(x),  `exp2`(x) | ULP. | ULP. |
| `log`(),  `log2`() | 3 ULP outside the range   . Absolute error    inside the range   . | 3 ULP outside the range   . Absolute error    inside the range   . |
| `pow`(x, y) | Inherited from `exp2`(y × `log2`(x)). |
| `sqrt`() | Inherited from 1.0 / `inversesqrt`(). |
| `inversesqrt`() | 2 ULP. |
| `radians`(x) | Inherited from   , where    is a correctly rounded approximation to   . |
| `degrees`(x) | Inherited from   , where    is a correctly rounded approximation to   . |
| `sin`() | Absolute error    inside the range   . | Absolute error    inside the range   . |
| `cos`() | Absolute error    inside the range   . | Absolute error    inside the range   . |
| `tan`() | Inherited from   . |
| `asin`(x) | Inherited from   . |
| `acos`(x) | Inherited from   . |
| `atan`(), `atan2`() | 4096 ULP | 5 ULP. |
| `sinh`(x) | Inherited from   . |
| `cosh`(x) | Inherited from   . |
| `tanh`() | Inherited from   . |
| `asinh`(x) | Inherited from   . |
| `acosh`(x) | Inherited from   . |
| `atanh`(x) | Inherited from   . |
| `frexp`() | Correct result. |
| `ldexp`() | Correctly rounded. |
| `length`(x) | Inherited from   . |
| `distance`(x, y) | Inherited from   . |
| `cross`() | Inherited from `OpFSub`(`OpFMul`, `OpFMul`). |
| `normalize`(x) | Inherited from   . |
| `faceforward`(N, I, NRef) | Inherited from `dot`(NRef, I) . |
| `reflect`(x, y) | Inherited from x - 2.0 × `dot`(y, x) × y. |
| `refract`(I, N, eta) | Inherited from k , where k = 1 - eta × eta × (1.0 - `dot`(N, I) × `dot`(N, I)). |
| `round` | Correctly rounded. |
| `roundEven` | Correctly rounded. |
| `trunc` | Correctly rounded. |
| `fabs` | Correct result. |
| `fsign` | Correct result. |
| `floor` | Correctly rounded. |
| `ceil` | Correctly rounded. |
| `fract` | Correctly rounded. |
| `modf` | Correctly rounded. |
| `fmin` | Correct result. |
| `fmax` | Correct result. |
| `fclamp` | Correct result. |
| `fmix`(x, y, a) | Inherited from   . |
| `step` | Correctly rounded. |
| `smoothStep`(edge0, edge1, x) | Inherited from   ,
where   . |
| `nmin` | Correct result. |
| `nmax` | Correct result. |
| `nclamp` | Correct result. |
| `packHalf2x16` | Correctly rounded with implementation defined rounding mode. |

GLSL.std.450 extended instructions specifically defined in terms of the
above instructions inherit the above errors.
GLSL.std.450 extended instructions not listed above and not defined in terms
of the above have implementation-defined precision.

If the [`maintenance8`](../chapters/features.html#features-maintenance8) feature is not enabled
and if
either operand to `OpSRem` and `OpSMod` instructions is negative the
result is poison.

|  | While the `OpSRem` and `OpSMod` instructions are supported by the
| --- | --- |
Vulkan environment,
If the [`maintenance8`](../chapters/features.html#features-maintenance8) feature is not enabled,
they require non-negative values and thus do not enable additional
functionality beyond what `OpUMod` provides. |

`OpCooperativeMatrixMulAddNV` performs its operations in an
implementation-dependent order and internal precision.

`OpCooperativeMatrixMulAddKHR` performs its operations in an
implementation-dependent order and internal precision.

`OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorMatrixMulAddNV` perform their operations in an
implementation-dependent order and internal precision.

When `inputType` is [VK_COMPONENT_TYPE_FLOAT16_KHR](../chapters/shaders.html#VkComponentTypeNV) and
`inputInterpretation` is a lower-precision floating-point type (e.g.
[VK_COMPONENT_TYPE_FLOAT_E4M3_NV](../chapters/shaders.html#VkComponentTypeNV) or
[VK_COMPONENT_TYPE_FLOAT_E5M2_NV](../chapters/shaders.html#VkComponentTypeNV)), the input vector **should** be
converted to the lower-precision type before performing the matrix-vector
multiply, but **may** keep the full 16 bits of precision.

Pipelines and shaders **may** be compiled to use 32-bit integer arithmetic to
compute byte offsets (e.g. based on `OpAccessChain` instructions) within
a
physical storage buffer or
buffer, limiting the accessible range to 4GB.
For physical storage buffers, the base address is a 64-bit value and the
implicit base plus offset calculation uses 64-bit addition.

|  | Note that `OpAccessChain` indices are always treated as signed, so a
| --- | --- |
32-bit index can only address 2GB if the `ArrayStride` is 1. |

The offset calculations that have the 4GB limit include:

* 
`OpAccessChain` and `OpPtrAccessChain` - the total offset summed
over all indices multiplied by strides, including spanning multiple
access chain instructions that lead to a given memory access.

* 
`OpCooperativeMatrixLoadNV` and `OpCooperativeMatrixStoreNV`
instructions computing an offset based on element, row, and stride
parameters.

* 
`OpCooperativeMatrixLoadKHR` and `OpCooperativeMatrixStoreKHR`
instructions computing an offset based on element, row, and stride
parameters.

* 
`OpCooperativeMatrixLoadTensorNV` and
`OpCooperativeMatrixStoreTensorNV` instructions computing an offset
based on tensor layout state.

* 
`OpCooperativeVectorMatrixMulAddNV`,
`OpCooperativeVectorMatrixMulNV` and
`OpCooperativeVectorOuterProductAccumulateNV` instructions computing
an offset based on offset, row, and stride parameters.

The application **can** enable 64-bit indexing either by setting the flags
[VK_PIPELINE_CREATE_2_64_BIT_INDEXING_BIT_EXT](../chapters/pipelines.html#VkPipelineCreateFlagBits2KHR) or
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](../chapters/shaders.html#VkShaderCreateFlagBitsEXT) or by setting the
`Execution` `Mode` `Shader64BitIndexingEXT` on the entry point,
which will cause the implementation to use 64 bits of range for those
addressing calculations.

If 64-bit indexing is enabled, the calculation of index multiplied by
`ArrayStride` for a runtime-sized array when evaluating an access chain
in `StorageBuffer` or `PhysicalStorageBuffer` will have 64 bits of
range.
Similarly, the `Element` times `ArrayStride` calculation for
`OpPtrAccessChain`
and `OpUntypedPtrAccessChainKHR`
will have 64 bits of range.

|  | The size of a structure type or sized array type in a storage buffer is
| --- | --- |
still limited to 32 bits for various practical reasons, such as that Offset
and ArrayStride decorations use 32-bit literals.
Only runtime-sized arrays can access beyond the 32-bit limit. |

|  | Enabling 64-bit indexing may incur a runtime cost. |
| --- | --- |

If 64-bit indexing is enabled, `OpArrayLength`
and `OpUntypedArrayLengthKHR`
**can** have a 64-bit result type.

If 64-bit indexing is enabled, the row/col times stride calculations in
`OpCooperativeMatrixLoadNV`, `OpCooperativeMatrixStoreNV`,
`OpCooperativeMatrixLoadKHR`, and `OpCooperativeMatrixStoreKHR`
are changed to have 64 bits of range.
i.e. `Pointer[row*(uint64_t)Stride]` and `Pointer[col*(uint64_t)Stride]`.
The stride itself is still limited to 32 bits.

If 64-bit indexing is enabled, the coordinate times stride calculations in
tensorCoordToLinear used by `OpCooperativeMatrixLoadTensorNV` and
`OpCooperativeMatrixStoreTensorNV` in the `SPV_NV_cooperative_matrix2`
extension are changed to have 64 bits of range for the result:

uint64_t tensorCoordToLinear(tensorLayoutNV t, Coord blockCoord)
{
    uint64_t index = 0;

    for (uint32_t dim = 0; dim 

The matrixCoordToTensorElement and matrixCoordToTensorElementWithView
functions are also changed to return that 64-bit result.

If 64-bit indexing is enabled, the offset parameters to
`OpCooperativeVectorLoadNV`, `OpCooperativeVectorStoreNV`,
`OpCooperativeVectorMatrixMulNV`, `OpCooperativeVectorMatrixMulAddNV`,
`OpCooperativeVectorOuterProductAccumulateNV`, and
`OpCooperativeVectorReduceSumAccumulateNV` **can** be 64-bit integers.

SPIR-V associates a signedness with all integer image accesses.
This is required in certain parts of the SPIR-V and the Vulkan image access
pipeline to ensure defined results.
The signedness is determined from a combination of the access instruction’s
`Image` `Operands` and the underlying image’s `Sampled` `Type`
as follows:

If the instruction’s `Image` `Operands` contains the
`SignExtend` operand then the access is signed.

If the instruction’s `Image` `Operands` contains the
`ZeroExtend` operand then the access is unsigned.

Otherwise, the image accesses signedness matches that of the
`Sampled` `Type` of the `OpTypeImage` being accessed.

When specifying the `Image` `Format` of an `OpTypeImage`, the
converted bit width and type, as shown in the table below, **must** match the
`Sampled` `Type`.
The signedness **must** match the [signedness of any access](#spirvenv-image-signedness) to the image.

|  | Formatted accesses are always converted from a shader readable type to the
| --- | --- |
resource’s format or vice versa via [Texel Decode](../chapters/images.html#images-texel-decode) for reads and
[Texel Encode](../chapters/images.html#images-texel-encode) for writes.
As such, the bit width and format below do not necessarily match 1:1 with
what might be expected for some formats. |

For a given `Image` `Format`, the `Sampled` `Type` **must** be the
type described in the *Type* column of the below table, with its
`Literal` `Width` set to that in the *Bit Width* column.
Every access that is made to the image **must** have a signedness equal to that
in the *Signedness* column (where applicable).

| Image Format | Type-Declaration instructions | Bit Width | Signedness |
| --- | --- | --- | --- |
| `Unknown` | Any | Any | Any |
| `Rgba32f` | `OpTypeFloat` | 32 | N/A |
| `Rg32f` |
| `R32f` |
| `Rgba16f` |
| `Rg16f` |
| `R16f` |
| `Rgba16` |
| `Rg16` |
| `R16` |
| `Rgba16Snorm` |
| `Rg16Snorm` |
| `R16Snorm` |
| `Rgb10A2` |
| `R11fG11fB10f` |
| `Rgba8` |
| `Rg8` |
| `R8` |
| `Rgba8Snorm` |
| `Rg8Snorm` |
| `R8Snorm` |
| `Rgba32i` | `OpTypeInt` | 32 | 1 |
| `Rg32i` |
| `R32i` |
| `Rgba16i` |
| `Rg16i` |
| `R16i` |
| `Rgba8i` |
| `Rg8i` |
| `R8i` |
| `Rgba32ui` | 0 |
| `Rg32ui` |
| `R32ui` |
| `Rgba16ui` |
| `Rg16ui` |
| `R16ui` |
| `Rgb10a2ui` |
| `Rgba8ui` |
| `Rg8ui` |
| `R8ui` |
| `R64i` | `OpTypeInt` | 64 | 1 |
| `R64ui` | 0 |

The *SPIR-V Type* is defined by an instruction in SPIR-V, declared with the
Type-Declaration Instruction, Bit Width, and Signedness from above.

SPIR-V `Image` `Dim` values are compatible with [VkImageView](../chapters/resources.html#VkImageView)
`viewType` values as defined below:

| SPIR-V Image Dim | Compatible Vulkan ImageView viewTypes |
| --- | --- |
| 1D | [VK_IMAGE_VIEW_TYPE_1D](../chapters/resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_1D_ARRAY](../chapters/resources.html#VkImageViewType) |
| 2D | [VK_IMAGE_VIEW_TYPE_2D](../chapters/resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_2D_ARRAY](../chapters/resources.html#VkImageViewType) |
| 3D | [VK_IMAGE_VIEW_TYPE_3D](../chapters/resources.html#VkImageViewType) |
| Cube | [VK_IMAGE_VIEW_TYPE_CUBE](../chapters/resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](../chapters/resources.html#VkImageViewType) |

SPIR-V `Image` `Format` values are compatible with [VkFormat](../chapters/formats.html#VkFormat)
values as defined below:

| SPIR-V Image Format | Compatible Vulkan Format |
| --- | --- |
| `Unknown` | Any |
| `R8` | [VK_FORMAT_R8_UNORM](../chapters/formats.html#VkFormat) |
| `R8Snorm` | [VK_FORMAT_R8_SNORM](../chapters/formats.html#VkFormat) |
| `R8ui` | [VK_FORMAT_R8_UINT](../chapters/formats.html#VkFormat) |
| `R8i` | [VK_FORMAT_R8_SINT](../chapters/formats.html#VkFormat) |
| `Rg8` | [VK_FORMAT_R8G8_UNORM](../chapters/formats.html#VkFormat) |
| `Rg8Snorm` | [VK_FORMAT_R8G8_SNORM](../chapters/formats.html#VkFormat) |
| `Rg8ui` | [VK_FORMAT_R8G8_UINT](../chapters/formats.html#VkFormat) |
| `Rg8i` | [VK_FORMAT_R8G8_SINT](../chapters/formats.html#VkFormat) |
| `Rgba8` | [VK_FORMAT_R8G8B8A8_UNORM](../chapters/formats.html#VkFormat) |
| `Rgba8Snorm` | [VK_FORMAT_R8G8B8A8_SNORM](../chapters/formats.html#VkFormat) |
| `Rgba8ui` | [VK_FORMAT_R8G8B8A8_UINT](../chapters/formats.html#VkFormat) |
| `Rgba8i` | [VK_FORMAT_R8G8B8A8_SINT](../chapters/formats.html#VkFormat) |
| `Rgb10A2` | [VK_FORMAT_A2B10G10R10_UNORM_PACK32](../chapters/formats.html#VkFormat) |
| `Rgb10a2ui` | [VK_FORMAT_A2B10G10R10_UINT_PACK32](../chapters/formats.html#VkFormat) |
| `R16` | [VK_FORMAT_R16_UNORM](../chapters/formats.html#VkFormat) |
| `R16Snorm` | [VK_FORMAT_R16_SNORM](../chapters/formats.html#VkFormat) |
| `R16ui` | [VK_FORMAT_R16_UINT](../chapters/formats.html#VkFormat) |
| `R16i` | [VK_FORMAT_R16_SINT](../chapters/formats.html#VkFormat) |
| `R16f` | [VK_FORMAT_R16_SFLOAT](../chapters/formats.html#VkFormat) |
| `Rg16` | [VK_FORMAT_R16G16_UNORM](../chapters/formats.html#VkFormat) |
| `Rg16Snorm` | [VK_FORMAT_R16G16_SNORM](../chapters/formats.html#VkFormat) |
| `Rg16ui` | [VK_FORMAT_R16G16_UINT](../chapters/formats.html#VkFormat) |
| `Rg16i` | [VK_FORMAT_R16G16_SINT](../chapters/formats.html#VkFormat) |
| `Rg16f` | [VK_FORMAT_R16G16_SFLOAT](../chapters/formats.html#VkFormat) |
| `Rgba16` | [VK_FORMAT_R16G16B16A16_UNORM](../chapters/formats.html#VkFormat) |
| `Rgba16Snorm` | [VK_FORMAT_R16G16B16A16_SNORM](../chapters/formats.html#VkFormat) |
| `Rgba16ui` | [VK_FORMAT_R16G16B16A16_UINT](../chapters/formats.html#VkFormat) |
| `Rgba16i` | [VK_FORMAT_R16G16B16A16_SINT](../chapters/formats.html#VkFormat) |
| `Rgba16f` | [VK_FORMAT_R16G16B16A16_SFLOAT](../chapters/formats.html#VkFormat) |
| `R32ui` | [VK_FORMAT_R32_UINT](../chapters/formats.html#VkFormat) |
| `R32i` | [VK_FORMAT_R32_SINT](../chapters/formats.html#VkFormat) |
| `R32f` | [VK_FORMAT_R32_SFLOAT](../chapters/formats.html#VkFormat) |
| `Rg32ui` | [VK_FORMAT_R32G32_UINT](../chapters/formats.html#VkFormat) |
| `Rg32i` | [VK_FORMAT_R32G32_SINT](../chapters/formats.html#VkFormat) |
| `Rg32f` | [VK_FORMAT_R32G32_SFLOAT](../chapters/formats.html#VkFormat) |
| `Rgba32ui` | [VK_FORMAT_R32G32B32A32_UINT](../chapters/formats.html#VkFormat) |
| `Rgba32i` | [VK_FORMAT_R32G32B32A32_SINT](../chapters/formats.html#VkFormat) |
| `Rgba32f` | [VK_FORMAT_R32G32B32A32_SFLOAT](../chapters/formats.html#VkFormat) |
| `R64ui` | [VK_FORMAT_R64_UINT](../chapters/formats.html#VkFormat) |
| `R64i` | [VK_FORMAT_R64_SINT](../chapters/formats.html#VkFormat) |
| `R11fG11fB10f` | [VK_FORMAT_B10G11R11_UFLOAT_PACK32](../chapters/formats.html#VkFormat) |

The values returned by
`OpRayQueryGetIntersectionTriangleVertexPositionsKHR` are transformed by
the geometry transform, which is performed at standard
[floating-point](../chapters/fundamentals.html#fundamentals-floating-point) precision, but without a
specifically defined order of floating-point operations to perform the
matrix multiplication.

SPIR-V Tensor `Element` `Type` values are compatible with
[VkFormat](../chapters/formats.html#VkFormat) values as defined below:

| SPIR-V Tensor Element Type | Compatible Vulkan Formats |
| --- | --- |
| `OpTypeBool` | [VK_FORMAT_R8_BOOL_ARM](../chapters/formats.html#VkFormat) |
| `OpTypeFloat 8 Float8E4M3EXT` | [VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E4M3_ARM](../chapters/formats.html#VkFormat) |
| `OpTypeFloat 8 Float8E5M2EXT` | [VK_FORMAT_R8_SFLOAT_FPENCODING_FLOAT8E5M2_ARM](../chapters/formats.html#VkFormat) |
| `OpTypeFloat 16` | [VK_FORMAT_R16_SFLOAT](../chapters/formats.html#VkFormat) |
| `OpTypeFloat 16 BFloat16KHR` | [VK_FORMAT_R16_SFLOAT_FPENCODING_BFLOAT16_ARM](../chapters/formats.html#VkFormat) |
| `OpTypeFloat 32` | [VK_FORMAT_R32_SFLOAT](../chapters/formats.html#VkFormat) |
| `OpTypeFloat 64` | [VK_FORMAT_R64_SFLOAT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 8 0` | [VK_FORMAT_R8_UINT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 8 1` | [VK_FORMAT_R8_SINT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 16 0` | [VK_FORMAT_R16_UINT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 16 1` | [VK_FORMAT_R16_SINT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 32 0` | [VK_FORMAT_R32_UINT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 32 1` | [VK_FORMAT_R32_SINT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 64 0` | [VK_FORMAT_R64_UINT](../chapters/formats.html#VkFormat) |
| `OpTypeInt 64 1` | [VK_FORMAT_R64_SINT](../chapters/formats.html#VkFormat) |
