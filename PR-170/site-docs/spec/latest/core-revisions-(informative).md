# Core Revisions (Informative)

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/appendices/versions.html

## Table of Contents

- [Vulkan Version 1.4](#versions-1.4)
- [Vulkan_Version_1.4](#versions-1.4)
- [New Macros](#_new_macros)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Vulkan Version 1.3](#versions-1.3)
- [Vulkan_Version_1.3](#versions-1.3)
- [New Macros](#_new_macros_2)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands_2)
- [New Structures](#_new_structures_2)
- [New Enums](#_new_enums_2)
- [New Bitmasks](#_new_bitmasks_2)
- [New Enum Constants](#_new_enum_constants_2)
- [New_Enum_Constants](#_new_enum_constants_2)
- [Vulkan Version 1.2](#versions-1.2)
- [Vulkan_Version_1.2](#versions-1.2)
- [New Macros](#_new_macros_3)
- [New Commands](#_new_commands_3)
- [New Structures](#_new_structures_3)
- [New Enums](#_new_enums_3)
- [New Bitmasks](#_new_bitmasks_3)
- [New Enum Constants](#_new_enum_constants_3)
- [New_Enum_Constants](#_new_enum_constants_3)
- [Vulkan Version 1.1](#versions-1.1)
- [Vulkan_Version_1.1](#versions-1.1)
- [New Macros](#_new_macros_4)
- [New Object Types](#_new_object_types_2)
- [New_Object_Types](#_new_object_types_2)
- [New Commands](#_new_commands_4)
- [New Structures](#_new_structures_4)
- [New Enums](#_new_enums_4)
- [New Bitmasks](#_new_bitmasks_4)
- [New Enum Constants](#_new_enum_constants_4)
- [New_Enum_Constants](#_new_enum_constants_4)
- [Vulkan Version 1.0](#versions-1.0)
- [Vulkan_Version_1.0](#versions-1.0)
- [New Macros](#_new_macros_5)
- [New Base Types](#_new_base_types_2)
- [New_Base_Types](#_new_base_types_2)
- [New Object Types](#_new_object_types_3)
- [New_Object_Types](#_new_object_types_3)
- [New Commands](#_new_commands_5)
- [New Structures](#_new_structures_5)
- [New Unions](#_new_unions)
- [New Function Pointers](#_new_function_pointers)
- [New_Function_Pointers](#_new_function_pointers)
- [New Enums](#_new_enums_5)
- [New Bitmasks](#_new_bitmasks_5)
- [New Headers](#_new_headers)
- [New Enum Constants](#_new_enum_constants_5)
- [New_Enum_Constants](#_new_enum_constants_5)

## Content

New minor versions of the Vulkan API are defined periodically by the Khronos
Vulkan Working Group.
These consist of some amount of additional functionality added to the core
API, potentially including both new functionality and functionality
[promoted](../chapters/extensions.html#extendingvulkan-compatibility-promotion) from extensions.

It is possible to build the specification for earlier versions, but to aid
readability of the latest versions, this appendix gives an overview of the
changes as compared to earlier versions.

Vulkan Version 1.4 [promoted](../chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_dynamic_rendering_local_read](extensions.html#VK_KHR_dynamic_rendering_local_read)

* 

[VK_KHR_global_priority](extensions.html#VK_KHR_global_priority)

* 

[VK_KHR_index_type_uint8](extensions.html#VK_KHR_index_type_uint8)

* 

[VK_KHR_line_rasterization](extensions.html#VK_KHR_line_rasterization)

* 

[VK_KHR_load_store_op_none](extensions.html#VK_KHR_load_store_op_none)

* 

[VK_KHR_maintenance5](extensions.html#VK_KHR_maintenance5)

* 

[VK_KHR_maintenance6](extensions.html#VK_KHR_maintenance6)

* 

[VK_KHR_map_memory2](extensions.html#VK_KHR_map_memory2)

* 

[VK_KHR_push_descriptor](extensions.html#VK_KHR_push_descriptor)

* 

[VK_KHR_shader_expect_assume](extensions.html#VK_KHR_shader_expect_assume)

* 

[VK_KHR_shader_float_controls2](extensions.html#VK_KHR_shader_float_controls2)

* 

[VK_KHR_shader_subgroup_rotate](extensions.html#VK_KHR_shader_subgroup_rotate)

* 

[VK_KHR_vertex_attribute_divisor](extensions.html#VK_KHR_vertex_attribute_divisor)

* 

[VK_EXT_host_image_copy](extensions.html#VK_EXT_host_image_copy)

* 

[VK_EXT_pipeline_protected_access](extensions.html#VK_EXT_pipeline_protected_access)

* 

[VK_EXT_pipeline_robustness](extensions.html#VK_EXT_pipeline_robustness)

All differences in behavior between these extensions and the corresponding
Vulkan 1.4 functionality are summarized below.

Differences Relative to `VK_KHR_dynamic_rendering_local_read`

If the [VK_KHR_dynamic_rendering_local_read](extensions.html#VK_KHR_dynamic_rendering_local_read) extension is not
supported, Vulkan 1.4 implementations **must** support local read only for
storage resources and single sampled color attachments.

Support for reading depth/stencil attachments and multi-sampled attachments
are respectively gated behind the new boolean
`dynamicRenderingLocalReadDepthStencilAttachments` and
`dynamicRenderingLocalReadMultisampledAttachments` properties.

* 
If `dynamicRenderingLocalReadDepthStencilAttachments` is
[VK_FALSE](../chapters/fundamentals.html#VK_FALSE), implementations do not support depth/stencil attachment
access within dynamic rendering.

* 
If `dynamicRenderingLocalReadMultisampledAttachments` is
[VK_FALSE](../chapters/fundamentals.html#VK_FALSE), implementations do not support multisampled attachment
access within dynamic rendering.

* 
If both properties are [VK_TRUE](../chapters/fundamentals.html#VK_TRUE), the full functionality of the
extension is supported.

Differences Relative to `VK_EXT_host_image_copy`

If the [VK_EXT_host_image_copy](extensions.html#VK_EXT_host_image_copy) extension is not supported, support for
it is optional in Vulkan 1.4.

* 
An implementation that has a [VK_QUEUE_GRAPHICS_BIT](../chapters/devsandqueues.html#VkQueueFlagBits) queue must support either:

the [`hostImageCopy`](../chapters/features.html#features-hostImageCopy) feature; or

* 
an additional queue that supports [VK_QUEUE_TRANSFER_BIT](../chapters/devsandqueues.html#VkQueueFlagBits).

Differences Relative to `VK_KHR_push_descriptor`

[VK_KHR_push_descriptor](extensions.html#VK_KHR_push_descriptor) did not include a feature bit, so a new
feature bit has been added to [VkPhysicalDeviceVulkan14Features](../chapters/features.html#VkPhysicalDeviceVulkan14Features) to gate
its functionality: [`pushDescriptor`](../chapters/features.html#features-pushDescriptor).
Enabling this new feature has the same effect as enabling the extension.

Differences Relative to `VK_EXT_pipeline_protected_access`

[VK_EXT_pipeline_protected_access](extensions.html#VK_EXT_pipeline_protected_access) is only useful when the
[`protectedMemory`](../chapters/features.html#features-protectedMemory) feature is supported.
As the [`protectedMemory`](../chapters/features.html#features-protectedMemory) feature is
optional in core Vulkan, the [`pipelineProtectedAccess`](../chapters/features.html#features-pipelineProtectedAccess) feature is only required when the
[`protectedMemory`](../chapters/features.html#features-protectedMemory) feature is supported.

Differences Relative to `VK_KHR_line_rasterization`

The [`bresenhamLines`](../chapters/features.html#features-bresenhamLines) feature is required,
rather than just any one of the line style features.

Differences Relative to `VK_KHR_shader_subgroup_rotate`

The
[`shaderSubgroupRotateClustered`](../chapters/features.html#features-shaderSubgroupRotateClustered)
feature is required in addition to [`shaderSubgroupRotate`](../chapters/features.html#features-shaderSubgroupRotate).

Additional Vulkan 1.4 Feature Support

In addition to the promoted extensions described above, Vulkan 1.4 added
required support for:

* 
All queues supporting [VK_QUEUE_GRAPHICS_BIT](../chapters/devsandqueues.html#VkQueueFlagBits) or
[VK_QUEUE_COMPUTE_BIT](../chapters/devsandqueues.html#VkQueueFlagBits) **must** also advertise
[VK_QUEUE_TRANSFER_BIT](../chapters/devsandqueues.html#VkQueueFlagBits).

* 
Clustered subgroup operations **must** be advertised in Vulkan 1.4 via
setting both [VK_SUBGROUP_FEATURE_CLUSTERED_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits) and
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits) (as an interaction with
the promoted [VK_KHR_shader_subgroup_rotate](extensions.html#VK_KHR_shader_subgroup_rotate) functionality) in
[`supportedOperations`](../chapters/devsandqueues.html#limits-subgroupSupportedOperations).

* 
The following features that were optional in earlier versions:

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
[`fragmentStoresAndAtomics`](../chapters/features.html#features-fragmentStoresAndAtomics)

* 
[`shaderStorageImageExtendedFormats`](../chapters/features.html#features-shaderStorageImageExtendedFormats)

* 
[`shaderUniformBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderUniformBufferArrayDynamicIndexing)

* 
[`shaderSampledImageArrayDynamicIndexing`](../chapters/features.html#features-shaderSampledImageArrayDynamicIndexing)

* 
[`shaderStorageBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageBufferArrayDynamicIndexing)

* 
[`shaderStorageImageArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageImageArrayDynamicIndexing)

* 
[`shaderImageGatherExtended`](../chapters/features.html#features-shaderImageGatherExtended)

* 
[`shaderInt16`](../chapters/features.html#features-shaderInt16)

* 
[`largePoints`](../chapters/features.html#features-largePoints)

* 
[`samplerYcbcrConversion`](../chapters/features.html#features-samplerYcbcrConversion)

* 
[`storageBuffer16BitAccess`](../chapters/features.html#features-storageBuffer16BitAccess)

* 
[`variablePointers`](../chapters/features.html#features-variablePointers)

* 
[`variablePointersStorageBuffer`](../chapters/features.html#features-variablePointersStorageBuffer)

* 
[`samplerMirrorClampToEdge`](../chapters/features.html#features-samplerMirrorClampToEdge)

* 
[`scalarBlockLayout`](../chapters/features.html#features-scalarBlockLayout)

* 
[`shaderUniformTexelBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderUniformTexelBufferArrayDynamicIndexing)

* 
[`shaderStorageTexelBufferArrayDynamicIndexing`](../chapters/features.html#features-shaderStorageTexelBufferArrayDynamicIndexing)

* 
[`shaderInt8`](../chapters/features.html#features-shaderInt8)

* 
[`storageBuffer8BitAccess`](../chapters/features.html#features-storageBuffer8BitAccess)

Updated Vulkan 1.4 Limit Support

Vulkan 1.4 also requires support for the following updated limits:

* 
[`maxImageDimension1D`](../chapters/limits.html#limits-maxImageDimension1D) is increased from 4096 to 8192

* 
[`maxImageDimension2D`](../chapters/limits.html#limits-maxImageDimension2D) is increased from 4096 to 8192

* 
[`maxImageDimension3D`](../chapters/limits.html#limits-maxImageDimension3D) is increased from 256 to 512

* 
[`maxImageDimensionCube`](../chapters/limits.html#limits-maxImageDimensionCube) is increased from 4096 to 8192

* 
[`maxImageArrayLayers`](../chapters/limits.html#limits-maxImageArrayLayers) is increased from 256 to 2048

* 
[`maxUniformBufferRange`](../chapters/limits.html#limits-maxUniformBufferRange) is increased from 16384 to 65536

* 
[`maxPushConstantsSize`](../chapters/limits.html#limits-maxPushConstantsSize) is increased from 128 to 256

* 
[`bufferImageGranularity`](../chapters/limits.html#limits-bufferImageGranularity) is decreased from 131072 to 4096

* 
[`maxBoundDescriptorSets`](../chapters/limits.html#limits-maxBoundDescriptorSets) is increased from 4 to 7

* 
[`maxPerStageDescriptorUniformBuffers`](../chapters/limits.html#limits-maxPerStageDescriptorUniformBuffers) is increased from 12 to 15

* 
[`maxPerStageResources`](../chapters/limits.html#limits-maxPerStageResources) is increased from 128 to 200

* 
[`maxDescriptorSetUniformBuffers`](../chapters/limits.html#limits-maxDescriptorSetUniformBuffers) is increased from 72 to 90

* 
[`maxDescriptorSetStorageBuffers`](../chapters/limits.html#limits-maxDescriptorSetStorageBuffers) is increased from 24 to 96

* 
[`maxDescriptorSetStorageImages`](../chapters/limits.html#limits-maxDescriptorSetStorageImages) is increased from 24 to 144

* 
[`maxFragmentCombinedOutputResources`](../chapters/limits.html#limits-maxFragmentCombinedOutputResources) is increased from 4 to 16

* 
[`maxComputeWorkGroupInvocations`](../chapters/limits.html#limits-maxComputeWorkGroupInvocations) is increased from 128 to 256

* 
[`maxComputeWorkGroupSize`](../chapters/limits.html#limits-maxComputeWorkGroupSize) is increased from (128,128,64) to (256,256,64)

* 
[`shaderSignedZeroInfNanPreserveFloat16`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is changed from unspecified to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

* 
[`shaderSignedZeroInfNanPreserveFloat32`](../chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is changed from unspecified to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

* 
[`subTexelPrecisionBits`](../chapters/limits.html#limits-subTexelPrecisionBits) is increased from 4 to 8

* 
[`mipmapPrecisionBits`](../chapters/limits.html#limits-mipmapPrecisionBits) is increased from 4 to 6

* 
[`maxSamplerLodBias`](../chapters/limits.html#limits-maxSamplerLodBias) is increased from 2 to 14

* 
[`maxViewportDimensions`](../chapters/limits.html#limits-maxViewportDimensions) is increased from (4096,4096) to (7680,7680)

* 
[`viewportBoundsRange`](../chapters/limits.html#limits-viewportboundsrange) is increased from (-8192,8191) to (-15360,15359)

* 
[`maxFramebufferWidth`](../chapters/limits.html#limits-maxFramebufferWidth) is increased from 4096 to 7680

* 
[`maxFramebufferHeight`](../chapters/limits.html#limits-maxFramebufferHeight) is increased from 4096 to 7680

* 
[`maxColorAttachments`](../chapters/limits.html#limits-maxColorAttachments) is increased from 7 to 8

* 
[`timestampComputeAndGraphics`](../chapters/limits.html#limits-timestampComputeAndGraphics) is changed from unspecified to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

* 
[`pointSizeRange`](../chapters/limits.html#limits-pointSizeRange) is increased from (1.0,64.0 - ULP) to (1.0,256.0 - `pointSizeGranularity`)

* 
[`pointSizeGranularity`](../chapters/limits.html#limits-pointSizeGranularity) is decreased from 1.0 to 0.125

* 
[`lineWidthGranularity`](../chapters/limits.html#limits-lineWidthGranularity) is decreased from 1.0 to 0.5

* 
[`maxPushDescriptors`](../chapters/devsandqueues.html#limits-maxPushDescriptors) is increased from 16 to 32

* 
[`standardSampleLocations`](../chapters/limits.html#limits-standardSampleLocations) is changed from unspecified to [VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

* 
[VK_API_VERSION_1_4](../chapters/extensions.html#VK_API_VERSION_1_4)

* 
[vkCmdBindDescriptorSets2](../chapters/descriptorsets.html#vkCmdBindDescriptorSets2)

* 
[vkCmdBindIndexBuffer2](../chapters/drawing.html#vkCmdBindIndexBuffer2)

* 
[vkCmdPushConstants2](../chapters/descriptorsets.html#vkCmdPushConstants2)

* 
[vkCmdPushDescriptorSet](../chapters/descriptorsets.html#vkCmdPushDescriptorSet)

* 
[vkCmdPushDescriptorSet2](../chapters/descriptorsets.html#vkCmdPushDescriptorSet2)

* 
[vkCmdPushDescriptorSetWithTemplate](../chapters/descriptorsets.html#vkCmdPushDescriptorSetWithTemplate)

* 
[vkCmdPushDescriptorSetWithTemplate2](../chapters/descriptorsets.html#vkCmdPushDescriptorSetWithTemplate2)

* 
[vkCmdSetLineStipple](../chapters/primsrast.html#vkCmdSetLineStipple)

* 
[vkCmdSetRenderingAttachmentLocations](../chapters/interfaces.html#vkCmdSetRenderingAttachmentLocations)

* 
[vkCmdSetRenderingInputAttachmentIndices](../chapters/interfaces.html#vkCmdSetRenderingInputAttachmentIndices)

* 
[vkCopyImageToImage](../chapters/copies.html#vkCopyImageToImage)

* 
[vkCopyImageToMemory](../chapters/copies.html#vkCopyImageToMemory)

* 
[vkCopyMemoryToImage](../chapters/copies.html#vkCopyMemoryToImage)

* 
[vkGetDeviceImageSubresourceLayout](../chapters/resources.html#vkGetDeviceImageSubresourceLayout)

* 
[vkGetImageSubresourceLayout2](../chapters/resources.html#vkGetImageSubresourceLayout2)

* 
[vkGetRenderingAreaGranularity](../chapters/renderpass.html#vkGetRenderingAreaGranularity)

* 
[vkMapMemory2](../chapters/memory.html#vkMapMemory2)

* 
[vkTransitionImageLayout](../chapters/synchronization.html#vkTransitionImageLayout)

* 
[vkUnmapMemory2](../chapters/memory.html#vkUnmapMemory2)

* 
[VkBindDescriptorSetsInfo](../chapters/descriptorsets.html#VkBindDescriptorSetsInfo)

* 
[VkCopyImageToImageInfo](../chapters/copies.html#VkCopyImageToImageInfo)

* 
[VkCopyImageToMemoryInfo](../chapters/copies.html#VkCopyImageToMemoryInfo)

* 
[VkCopyMemoryToImageInfo](../chapters/copies.html#VkCopyMemoryToImageInfo)

* 
[VkDeviceImageSubresourceInfo](../chapters/resources.html#VkDeviceImageSubresourceInfo)

* 
[VkHostImageLayoutTransitionInfo](../chapters/synchronization.html#VkHostImageLayoutTransitionInfo)

* 
[VkImageSubresource2](../chapters/resources.html#VkImageSubresource2)

* 
[VkImageToMemoryCopy](../chapters/copies.html#VkImageToMemoryCopy)

* 
[VkMemoryMapInfo](../chapters/memory.html#VkMemoryMapInfo)

* 
[VkMemoryToImageCopy](../chapters/copies.html#VkMemoryToImageCopy)

* 
[VkMemoryUnmapInfo](../chapters/memory.html#VkMemoryUnmapInfo)

* 
[VkPushConstantsInfo](../chapters/descriptorsets.html#VkPushConstantsInfo)

* 
[VkPushDescriptorSetInfo](../chapters/descriptorsets.html#VkPushDescriptorSetInfo)

* 
[VkPushDescriptorSetWithTemplateInfo](../chapters/descriptorsets.html#VkPushDescriptorSetWithTemplateInfo)

* 
[VkRenderingAreaInfo](../chapters/renderpass.html#VkRenderingAreaInfo)

* 
[VkSubresourceLayout2](../chapters/resources.html#VkSubresourceLayout2)

* 
[VkVertexInputBindingDivisorDescription](../chapters/fxvertex.html#VkVertexInputBindingDivisorDescription)

* 
Extending [VkBindBufferMemoryInfo](../chapters/resources.html#VkBindBufferMemoryInfo), [VkBindImageMemoryInfo](../chapters/resources.html#VkBindImageMemoryInfo):

[VkBindMemoryStatus](../chapters/resources.html#VkBindMemoryStatus)

Extending [VkBufferViewCreateInfo](../chapters/resources.html#VkBufferViewCreateInfo), [VkBufferCreateInfo](../chapters/resources.html#VkBufferCreateInfo), [VkPhysicalDeviceExternalBufferInfo](../chapters/capabilities.html#VkPhysicalDeviceExternalBufferInfo), [VkDescriptorBufferBindingInfoEXT](../chapters/descriptorsets.html#VkDescriptorBufferBindingInfoEXT):

* 
[VkBufferUsageFlags2CreateInfo](../chapters/resources.html#VkBufferUsageFlags2CreateInfo)

Extending [VkComputePipelineCreateInfo](../chapters/pipelines.html#VkComputePipelineCreateInfo), [VkGraphicsPipelineCreateInfo](../chapters/pipelines.html#VkGraphicsPipelineCreateInfo), [VkRayTracingPipelineCreateInfoNV](../chapters/pipelines.html#VkRayTracingPipelineCreateInfoNV), [VkRayTracingPipelineCreateInfoKHR](../chapters/pipelines.html#VkRayTracingPipelineCreateInfoKHR):

* 
[VkPipelineCreateFlags2CreateInfo](../chapters/pipelines.html#VkPipelineCreateFlags2CreateInfo)

Extending [VkDeviceQueueCreateInfo](../chapters/devsandqueues.html#VkDeviceQueueCreateInfo):

* 
[VkDeviceQueueGlobalPriorityCreateInfo](../chapters/devsandqueues.html#VkDeviceQueueGlobalPriorityCreateInfo)

Extending [VkGraphicsPipelineCreateInfo](../chapters/pipelines.html#VkGraphicsPipelineCreateInfo), [VkCommandBufferInheritanceInfo](../chapters/cmdbuffers.html#VkCommandBufferInheritanceInfo):

* 
[VkRenderingAttachmentLocationInfo](../chapters/interfaces.html#VkRenderingAttachmentLocationInfo)

* 
[VkRenderingInputAttachmentIndexInfo](../chapters/interfaces.html#VkRenderingInputAttachmentIndexInfo)

Extending [VkGraphicsPipelineCreateInfo](../chapters/pipelines.html#VkGraphicsPipelineCreateInfo), [VkComputePipelineCreateInfo](../chapters/pipelines.html#VkComputePipelineCreateInfo), [VkPipelineShaderStageCreateInfo](../chapters/pipelines.html#VkPipelineShaderStageCreateInfo), [VkRayTracingPipelineCreateInfoKHR](../chapters/pipelines.html#VkRayTracingPipelineCreateInfoKHR):

* 
[VkPipelineRobustnessCreateInfo](../chapters/pipelines.html#VkPipelineRobustnessCreateInfo)

Extending [VkImageFormatProperties2](../chapters/capabilities.html#VkImageFormatProperties2):

* 
[VkHostImageCopyDevicePerformanceQuery](../chapters/capabilities.html#VkHostImageCopyDevicePerformanceQuery)

Extending [VkPhysicalDeviceFeatures2](../chapters/features.html#VkPhysicalDeviceFeatures2), [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo):

* 
[VkPhysicalDeviceDynamicRenderingLocalReadFeatures](../chapters/features.html#VkPhysicalDeviceDynamicRenderingLocalReadFeatures)

* 
[VkPhysicalDeviceGlobalPriorityQueryFeatures](../chapters/features.html#VkPhysicalDeviceGlobalPriorityQueryFeatures)

* 
[VkPhysicalDeviceHostImageCopyFeatures](../chapters/features.html#VkPhysicalDeviceHostImageCopyFeatures)

* 
[VkPhysicalDeviceIndexTypeUint8Features](../chapters/features.html#VkPhysicalDeviceIndexTypeUint8Features)

* 
[VkPhysicalDeviceLineRasterizationFeatures](../chapters/features.html#VkPhysicalDeviceLineRasterizationFeatures)

* 
[VkPhysicalDeviceMaintenance5Features](../chapters/features.html#VkPhysicalDeviceMaintenance5Features)

* 
[VkPhysicalDeviceMaintenance6Features](../chapters/features.html#VkPhysicalDeviceMaintenance6Features)

* 
[VkPhysicalDevicePipelineProtectedAccessFeatures](../chapters/features.html#VkPhysicalDevicePipelineProtectedAccessFeatures)

* 
[VkPhysicalDevicePipelineRobustnessFeatures](../chapters/features.html#VkPhysicalDevicePipelineRobustnessFeatures)

* 
[VkPhysicalDeviceShaderExpectAssumeFeatures](../chapters/features.html#VkPhysicalDeviceShaderExpectAssumeFeatures)

* 
[VkPhysicalDeviceShaderFloatControls2Features](../chapters/features.html#VkPhysicalDeviceShaderFloatControls2Features)

* 
[VkPhysicalDeviceShaderSubgroupRotateFeatures](../chapters/features.html#VkPhysicalDeviceShaderSubgroupRotateFeatures)

* 
[VkPhysicalDeviceVertexAttributeDivisorFeatures](../chapters/features.html#VkPhysicalDeviceVertexAttributeDivisorFeatures)

* 
[VkPhysicalDeviceVulkan14Features](../chapters/features.html#VkPhysicalDeviceVulkan14Features)

Extending [VkPhysicalDeviceProperties2](../chapters/devsandqueues.html#VkPhysicalDeviceProperties2):

* 
[VkPhysicalDeviceHostImageCopyProperties](../chapters/limits.html#VkPhysicalDeviceHostImageCopyProperties)

* 
[VkPhysicalDeviceLineRasterizationProperties](../chapters/limits.html#VkPhysicalDeviceLineRasterizationProperties)

* 
[VkPhysicalDeviceMaintenance5Properties](../chapters/limits.html#VkPhysicalDeviceMaintenance5Properties)

* 
[VkPhysicalDeviceMaintenance6Properties](../chapters/limits.html#VkPhysicalDeviceMaintenance6Properties)

* 
[VkPhysicalDevicePipelineRobustnessProperties](../chapters/limits.html#VkPhysicalDevicePipelineRobustnessProperties)

* 
[VkPhysicalDevicePushDescriptorProperties](../chapters/limits.html#VkPhysicalDevicePushDescriptorProperties)

* 
[VkPhysicalDeviceVertexAttributeDivisorProperties](../chapters/limits.html#VkPhysicalDeviceVertexAttributeDivisorProperties)

* 
[VkPhysicalDeviceVulkan14Properties](../chapters/devsandqueues.html#VkPhysicalDeviceVulkan14Properties)

Extending [VkPipelineRasterizationStateCreateInfo](../chapters/primsrast.html#VkPipelineRasterizationStateCreateInfo):

* 
[VkPipelineRasterizationLineStateCreateInfo](../chapters/primsrast.html#VkPipelineRasterizationLineStateCreateInfo)

Extending [VkPipelineVertexInputStateCreateInfo](../chapters/fxvertex.html#VkPipelineVertexInputStateCreateInfo):

* 
[VkPipelineVertexInputDivisorStateCreateInfo](../chapters/fxvertex.html#VkPipelineVertexInputDivisorStateCreateInfo)

Extending [VkQueueFamilyProperties2](../chapters/devsandqueues.html#VkQueueFamilyProperties2):

* 
[VkQueueFamilyGlobalPriorityProperties](../chapters/devsandqueues.html#VkQueueFamilyGlobalPriorityProperties)

Extending [VkSubresourceLayout2](../chapters/resources.html#VkSubresourceLayout2):

* 
[VkSubresourceHostMemcpySize](../chapters/resources.html#VkSubresourceHostMemcpySize)

* 
[VkBufferUsageFlagBits2](../chapters/resources.html#VkBufferUsageFlagBits2)

* 
[VkHostImageCopyFlagBits](../chapters/copies.html#VkHostImageCopyFlagBits)

* 
[VkLineRasterizationMode](../chapters/primsrast.html#VkLineRasterizationMode)

* 
[VkMemoryUnmapFlagBits](../chapters/memory.html#VkMemoryUnmapFlagBits)

* 
[VkPipelineCreateFlagBits2](../chapters/pipelines.html#VkPipelineCreateFlagBits2)

* 
[VkPipelineRobustnessBufferBehavior](../chapters/pipelines.html#VkPipelineRobustnessBufferBehavior)

* 
[VkPipelineRobustnessImageBehavior](../chapters/pipelines.html#VkPipelineRobustnessImageBehavior)

* 
[VkQueueGlobalPriority](../chapters/devsandqueues.html#VkQueueGlobalPriority)

* 
[VkBufferUsageFlags2](../chapters/resources.html#VkBufferUsageFlags2)

* 
[VkHostImageCopyFlags](../chapters/copies.html#VkHostImageCopyFlags)

* 
[VkMemoryUnmapFlags](../chapters/memory.html#VkMemoryUnmapFlags)

* 
[VkPipelineCreateFlags2](../chapters/pipelines.html#VkPipelineCreateFlags2)

* 
[VK_MAX_GLOBAL_PRIORITY_SIZE](../chapters/devsandqueues.html#VK_MAX_GLOBAL_PRIORITY_SIZE)

* 
Extending [VkAttachmentLoadOp](../chapters/renderpass.html#VkAttachmentLoadOp):

[VK_ATTACHMENT_LOAD_OP_NONE](../chapters/renderpass.html#VkAttachmentLoadOp)

Extending [VkBufferUsageFlagBits2](../chapters/resources.html#VkBufferUsageFlagBits2):

* 
[VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT](../chapters/resources.html#VkBufferUsageFlagBits2KHR)

Extending [VkDescriptorSetLayoutCreateFlagBits](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits):

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)

Extending [VkDescriptorUpdateTemplateType](../chapters/descriptorsets.html#VkDescriptorUpdateTemplateType):

* 
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](../chapters/descriptorsets.html#VkDescriptorUpdateTemplateTypeKHR)

Extending [VkDynamicState](../chapters/pipelines.html#VkDynamicState):

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE](../chapters/pipelines.html#VkDynamicState)

Extending [VkFormat](../chapters/formats.html#VkFormat):

* 
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_A8_UNORM](../chapters/formats.html#VkFormat)

Extending [VkFormatFeatureFlagBits2](../chapters/formats.html#VkFormatFeatureFlagBits2):

* 
[VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT](../chapters/formats.html#VkFormatFeatureFlagBits2KHR)

Extending [VkImageLayout](../chapters/resources.html#VkImageLayout):

* 
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](../chapters/resources.html#VkImageLayout)

Extending [VkImageUsageFlagBits](../chapters/resources.html#VkImageUsageFlagBits):

* 
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](../chapters/resources.html#VkImageUsageFlagBits)

Extending [VkIndexType](../chapters/drawing.html#VkIndexType):

* 
[VK_INDEX_TYPE_UINT8](../chapters/drawing.html#VkIndexType)

Extending [VkPipelineCreateFlagBits](../chapters/pipelines.html#VkPipelineCreateFlagBits):

* 
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](../chapters/pipelines.html#VkPipelineCreateFlagBits)

* 
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](../chapters/pipelines.html#VkPipelineCreateFlagBits)

Extending [VkResult](../chapters/fundamentals.html#VkResult):

* 
[VK_ERROR_NOT_PERMITTED](../chapters/fundamentals.html#VkResult)

Extending [VkStructureType](../chapters/fundamentals.html#VkStructureType):

* 
[VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_SETS_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_IMAGE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_MEMORY_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_TO_MEMORY_COPY](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_MAP_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_TO_IMAGE_COPY](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_LOCAL_READ_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROTECTED_ACCESS_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EXPECT_ASSUME_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT_CONTROLS_2_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDERING_AREA_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2](../chapters/fundamentals.html#VkStructureType)

Extending [VkSubgroupFeatureFlagBits](../chapters/limits.html#VkSubgroupFeatureFlagBits):

* 
[VK_SUBGROUP_FEATURE_ROTATE_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

* 
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](../chapters/limits.html#VkSubgroupFeatureFlagBits)

Vulkan Version 1.3 [promoted](../chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_copy_commands2](extensions.html#VK_KHR_copy_commands2)

* 

[VK_KHR_dynamic_rendering](extensions.html#VK_KHR_dynamic_rendering)

* 

[VK_KHR_format_feature_flags2](extensions.html#VK_KHR_format_feature_flags2)

* 

[VK_KHR_maintenance4](extensions.html#VK_KHR_maintenance4)

* 

[VK_KHR_shader_integer_dot_product](extensions.html#VK_KHR_shader_integer_dot_product)

* 

[VK_KHR_shader_non_semantic_info](extensions.html#VK_KHR_shader_non_semantic_info)

* 

[VK_KHR_shader_terminate_invocation](extensions.html#VK_KHR_shader_terminate_invocation)

* 

[VK_KHR_synchronization2](extensions.html#VK_KHR_synchronization2)

* 

[VK_KHR_zero_initialize_workgroup_memory](extensions.html#VK_KHR_zero_initialize_workgroup_memory)

* 

[VK_EXT_4444_formats](extensions.html#VK_EXT_4444_formats)

* 

[VK_EXT_extended_dynamic_state](extensions.html#VK_EXT_extended_dynamic_state)

* 

[VK_EXT_extended_dynamic_state2](extensions.html#VK_EXT_extended_dynamic_state2)

* 

[VK_EXT_image_robustness](extensions.html#VK_EXT_image_robustness)

* 

[VK_EXT_inline_uniform_block](extensions.html#VK_EXT_inline_uniform_block)

* 

[VK_EXT_pipeline_creation_cache_control](extensions.html#VK_EXT_pipeline_creation_cache_control)

* 

[VK_EXT_pipeline_creation_feedback](extensions.html#VK_EXT_pipeline_creation_feedback)

* 

[VK_EXT_private_data](extensions.html#VK_EXT_private_data)

* 

[VK_EXT_shader_demote_to_helper_invocation](extensions.html#VK_EXT_shader_demote_to_helper_invocation)

* 

[VK_EXT_subgroup_size_control](extensions.html#VK_EXT_subgroup_size_control)

* 

[VK_EXT_texel_buffer_alignment](extensions.html#VK_EXT_texel_buffer_alignment)

* 

[VK_EXT_texture_compression_astc_hdr](extensions.html#VK_EXT_texture_compression_astc_hdr)

* 

[VK_EXT_tooling_info](extensions.html#VK_EXT_tooling_info)

* 

[VK_EXT_ycbcr_2plane_444_formats](extensions.html#VK_EXT_ycbcr_2plane_444_formats)

All differences in behavior between these extensions and the corresponding
Vulkan 1.3 functionality are summarized below.

Differences Relative to `VK_EXT_4444_formats`

If the `[VK_EXT_4444_formats](extensions.html#VK_EXT_4444_formats)` extension is not supported, support for
all formats defined by it are optional in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](../chapters/features.html#VkPhysicalDeviceVulkan13Features) structure
corresponding to the [VkPhysicalDevice4444FormatsFeaturesEXT](../chapters/features.html#VkPhysicalDevice4444FormatsFeaturesEXT) structure.

Differences Relative to `VK_EXT_extended_dynamic_state`

All dynamic state enumerants and commands defined by
`[VK_EXT_extended_dynamic_state](extensions.html#VK_EXT_extended_dynamic_state)` are required in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](../chapters/features.html#VkPhysicalDeviceVulkan13Features) structure
corresponding to the [VkPhysicalDeviceExtendedDynamicStateFeaturesEXT](../chapters/features.html#VkPhysicalDeviceExtendedDynamicStateFeaturesEXT)
structure.

Differences Relative to `VK_EXT_extended_dynamic_state2`

The optional dynamic state enumerants and commands defined by
`[VK_EXT_extended_dynamic_state2](extensions.html#VK_EXT_extended_dynamic_state2)` for patch control points and logic
op are not promoted in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](../chapters/features.html#VkPhysicalDeviceVulkan13Features) structure
corresponding to the [VkPhysicalDeviceExtendedDynamicState2FeaturesEXT](../chapters/features.html#VkPhysicalDeviceExtendedDynamicState2FeaturesEXT)
structure.

Differences Relative to `VK_EXT_texel_buffer_alignment`

The more specific alignment requirements defined by
[VkPhysicalDeviceTexelBufferAlignmentProperties](../chapters/limits.html#VkPhysicalDeviceTexelBufferAlignmentProperties) are required in Vulkan
1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](../chapters/features.html#VkPhysicalDeviceVulkan13Features) structure
corresponding to the [VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT](../chapters/features.html#VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT)
structure.
The `texelBufferAlignment` feature is enabled if using a Vulkan 1.3
instance.

Differences Relative to `VK_EXT_texture_compression_astc_hdr`

If the `[VK_EXT_texture_compression_astc_hdr](extensions.html#VK_EXT_texture_compression_astc_hdr)` extension is not
supported, support for all formats defined by it are optional in Vulkan 1.3.
The [`textureCompressionASTC_HDR`](../chapters/features.html#features-textureCompressionASTC_HDR) member of
[VkPhysicalDeviceVulkan13Features](../chapters/features.html#VkPhysicalDeviceVulkan13Features) indicates whether a Vulkan 1.3
implementation supports these formats.

Differences Relative to `VK_EXT_ycbcr_2plane_444_formats`

If the `[VK_EXT_ycbcr_2plane_444_formats](extensions.html#VK_EXT_ycbcr_2plane_444_formats)` extension is not supported,
support for all formats defined by it are optional in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](../chapters/features.html#VkPhysicalDeviceVulkan13Features) structure
corresponding to the [VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT](../chapters/features.html#VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT)
structure.

Additional Vulkan 1.3 Feature Support

In addition to the promoted extensions described above, Vulkan 1.3 added
required support for:

* 
SPIR-V version 1.6

SPIR-V 1.6 deprecates (but does not remove) the `WorkgroupSize`
decoration.

The [`bufferDeviceAddress`](../chapters/features.html#features-bufferDeviceAddress) feature
which indicates support for accessing memory in shaders as storage
buffers via [vkGetBufferDeviceAddress](../chapters/resources.html#vkGetBufferDeviceAddress).

The [`vulkanMemoryModel`](../chapters/features.html#features-vulkanMemoryModel) and
[    `vulkanMemoryModelDeviceScope`](../chapters/features.html#features-vulkanMemoryModelDeviceScope) features, which indicate support
for the corresponding Vulkan Memory Model capabilities.

The [    `maxInlineUniformTotalSize`](../chapters/devsandqueues.html#limits-maxInlineUniformTotalSize) limit is added to provide the total
size of all inline uniform block bindings in a pipeline layout.

* 
[VK_API_VERSION_1_3](../chapters/extensions.html#VK_API_VERSION_1_3)

* 
`VkFlags64`

* 
[VkPrivateDataSlot](../chapters/private_data.html#VkPrivateDataSlot)

* 
[vkCmdBeginRendering](../chapters/renderpass.html#vkCmdBeginRendering)

* 
[vkCmdBindVertexBuffers2](../chapters/fxvertex.html#vkCmdBindVertexBuffers2)

* 
[vkCmdBlitImage2](../chapters/copies.html#vkCmdBlitImage2)

* 
[vkCmdCopyBuffer2](../chapters/copies.html#vkCmdCopyBuffer2)

* 
[vkCmdCopyBufferToImage2](../chapters/copies.html#vkCmdCopyBufferToImage2)

* 
[vkCmdCopyImage2](../chapters/copies.html#vkCmdCopyImage2)

* 
[vkCmdCopyImageToBuffer2](../chapters/copies.html#vkCmdCopyImageToBuffer2)

* 
[vkCmdEndRendering](../chapters/renderpass.html#vkCmdEndRendering)

* 
[vkCmdPipelineBarrier2](../chapters/synchronization.html#vkCmdPipelineBarrier2)

* 
[vkCmdResetEvent2](../chapters/synchronization.html#vkCmdResetEvent2)

* 
[vkCmdResolveImage2](../chapters/copies.html#vkCmdResolveImage2)

* 
[vkCmdSetCullMode](../chapters/primsrast.html#vkCmdSetCullMode)

* 
[vkCmdSetDepthBiasEnable](../chapters/primsrast.html#vkCmdSetDepthBiasEnable)

* 
[vkCmdSetDepthBoundsTestEnable](../chapters/fragops.html#vkCmdSetDepthBoundsTestEnable)

* 
[vkCmdSetDepthCompareOp](../chapters/fragops.html#vkCmdSetDepthCompareOp)

* 
[vkCmdSetDepthTestEnable](../chapters/fragops.html#vkCmdSetDepthTestEnable)

* 
[vkCmdSetDepthWriteEnable](../chapters/fragops.html#vkCmdSetDepthWriteEnable)

* 
[vkCmdSetEvent2](../chapters/synchronization.html#vkCmdSetEvent2)

* 
[vkCmdSetFrontFace](../chapters/primsrast.html#vkCmdSetFrontFace)

* 
[vkCmdSetPrimitiveRestartEnable](../chapters/drawing.html#vkCmdSetPrimitiveRestartEnable)

* 
[vkCmdSetPrimitiveTopology](../chapters/drawing.html#vkCmdSetPrimitiveTopology)

* 
[vkCmdSetRasterizerDiscardEnable](../chapters/primsrast.html#vkCmdSetRasterizerDiscardEnable)

* 
[vkCmdSetScissorWithCount](../chapters/vertexpostproc.html#vkCmdSetScissorWithCount)

* 
[vkCmdSetStencilOp](../chapters/fragops.html#vkCmdSetStencilOp)

* 
[vkCmdSetStencilTestEnable](../chapters/fragops.html#vkCmdSetStencilTestEnable)

* 
[vkCmdSetViewportWithCount](../chapters/vertexpostproc.html#vkCmdSetViewportWithCount)

* 
[vkCmdWaitEvents2](../chapters/synchronization.html#vkCmdWaitEvents2)

* 
[vkCmdWriteTimestamp2](../chapters/queries.html#vkCmdWriteTimestamp2)

* 
[vkCreatePrivateDataSlot](../chapters/private_data.html#vkCreatePrivateDataSlot)

* 
[vkDestroyPrivateDataSlot](../chapters/private_data.html#vkDestroyPrivateDataSlot)

* 
[vkGetDeviceBufferMemoryRequirements](../chapters/resources.html#vkGetDeviceBufferMemoryRequirements)

* 
[vkGetDeviceImageMemoryRequirements](../chapters/resources.html#vkGetDeviceImageMemoryRequirements)

* 
[vkGetDeviceImageSparseMemoryRequirements](../chapters/sparsemem.html#vkGetDeviceImageSparseMemoryRequirements)

* 
[vkGetPhysicalDeviceToolProperties](../chapters/debugging.html#vkGetPhysicalDeviceToolProperties)

* 
[vkGetPrivateData](../chapters/private_data.html#vkGetPrivateData)

* 
[vkQueueSubmit2](../chapters/cmdbuffers.html#vkQueueSubmit2)

* 
[vkSetPrivateData](../chapters/private_data.html#vkSetPrivateData)

* 
[VkBlitImageInfo2](../chapters/copies.html#VkBlitImageInfo2)

* 
[VkBufferCopy2](../chapters/copies.html#VkBufferCopy2)

* 
[VkBufferImageCopy2](../chapters/copies.html#VkBufferImageCopy2)

* 
[VkBufferMemoryBarrier2](../chapters/synchronization.html#VkBufferMemoryBarrier2)

* 
[VkCommandBufferSubmitInfo](../chapters/cmdbuffers.html#VkCommandBufferSubmitInfo)

* 
[VkCopyBufferInfo2](../chapters/copies.html#VkCopyBufferInfo2)

* 
[VkCopyBufferToImageInfo2](../chapters/copies.html#VkCopyBufferToImageInfo2)

* 
[VkCopyImageInfo2](../chapters/copies.html#VkCopyImageInfo2)

* 
[VkCopyImageToBufferInfo2](../chapters/copies.html#VkCopyImageToBufferInfo2)

* 
[VkDependencyInfo](../chapters/synchronization.html#VkDependencyInfo)

* 
[VkDeviceBufferMemoryRequirements](../chapters/resources.html#VkDeviceBufferMemoryRequirements)

* 
[VkDeviceImageMemoryRequirements](../chapters/resources.html#VkDeviceImageMemoryRequirements)

* 
[VkImageBlit2](../chapters/copies.html#VkImageBlit2)

* 
[VkImageCopy2](../chapters/copies.html#VkImageCopy2)

* 
[VkImageMemoryBarrier2](../chapters/synchronization.html#VkImageMemoryBarrier2)

* 
[VkImageResolve2](../chapters/copies.html#VkImageResolve2)

* 
[VkPhysicalDeviceToolProperties](../chapters/debugging.html#VkPhysicalDeviceToolProperties)

* 
[VkPipelineCreationFeedback](../chapters/pipelines.html#VkPipelineCreationFeedback)

* 
[VkPrivateDataSlotCreateInfo](../chapters/private_data.html#VkPrivateDataSlotCreateInfo)

* 
[VkRenderingAttachmentInfo](../chapters/renderpass.html#VkRenderingAttachmentInfo)

* 
[VkRenderingInfo](../chapters/renderpass.html#VkRenderingInfo)

* 
[VkResolveImageInfo2](../chapters/copies.html#VkResolveImageInfo2)

* 
[VkSemaphoreSubmitInfo](../chapters/cmdbuffers.html#VkSemaphoreSubmitInfo)

* 
[VkSubmitInfo2](../chapters/cmdbuffers.html#VkSubmitInfo2)

* 
Extending [VkCommandBufferInheritanceInfo](../chapters/cmdbuffers.html#VkCommandBufferInheritanceInfo):

[VkCommandBufferInheritanceRenderingInfo](../chapters/cmdbuffers.html#VkCommandBufferInheritanceRenderingInfo)

Extending [VkDescriptorPoolCreateInfo](../chapters/descriptorsets.html#VkDescriptorPoolCreateInfo):

* 
[VkDescriptorPoolInlineUniformBlockCreateInfo](../chapters/descriptorsets.html#VkDescriptorPoolInlineUniformBlockCreateInfo)

Extending [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo):

* 
[VkDevicePrivateDataCreateInfo](../chapters/devsandqueues.html#VkDevicePrivateDataCreateInfo)

Extending [VkFormatProperties2](../chapters/formats.html#VkFormatProperties2):

* 
[VkFormatProperties3](../chapters/formats.html#VkFormatProperties3)

Extending [VkGraphicsPipelineCreateInfo](../chapters/pipelines.html#VkGraphicsPipelineCreateInfo):

* 
[VkPipelineRenderingCreateInfo](../chapters/pipelines.html#VkPipelineRenderingCreateInfo)

Extending [VkGraphicsPipelineCreateInfo](../chapters/pipelines.html#VkGraphicsPipelineCreateInfo), [VkComputePipelineCreateInfo](../chapters/pipelines.html#VkComputePipelineCreateInfo), [VkRayTracingPipelineCreateInfoNV](../chapters/pipelines.html#VkRayTracingPipelineCreateInfoNV), [VkRayTracingPipelineCreateInfoKHR](../chapters/pipelines.html#VkRayTracingPipelineCreateInfoKHR), [VkExecutionGraphPipelineCreateInfoAMDX](../chapters/executiongraphs.html#VkExecutionGraphPipelineCreateInfoAMDX), [VkDataGraphPipelineCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM):

* 
[VkPipelineCreationFeedbackCreateInfo](../chapters/pipelines.html#VkPipelineCreationFeedbackCreateInfo)

Extending [VkPhysicalDeviceFeatures2](../chapters/features.html#VkPhysicalDeviceFeatures2), [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo):

* 
[VkPhysicalDeviceDynamicRenderingFeatures](../chapters/features.html#VkPhysicalDeviceDynamicRenderingFeatures)

* 
[VkPhysicalDeviceImageRobustnessFeatures](../chapters/features.html#VkPhysicalDeviceImageRobustnessFeatures)

* 
[VkPhysicalDeviceInlineUniformBlockFeatures](../chapters/features.html#VkPhysicalDeviceInlineUniformBlockFeatures)

* 
[VkPhysicalDeviceMaintenance4Features](../chapters/features.html#VkPhysicalDeviceMaintenance4Features)

* 
[VkPhysicalDevicePipelineCreationCacheControlFeatures](../chapters/features.html#VkPhysicalDevicePipelineCreationCacheControlFeatures)

* 
[VkPhysicalDevicePrivateDataFeatures](../chapters/features.html#VkPhysicalDevicePrivateDataFeatures)

* 
[VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures](../chapters/features.html#VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures)

* 
[VkPhysicalDeviceShaderIntegerDotProductFeatures](../chapters/features.html#VkPhysicalDeviceShaderIntegerDotProductFeatures)

* 
[VkPhysicalDeviceShaderTerminateInvocationFeatures](../chapters/features.html#VkPhysicalDeviceShaderTerminateInvocationFeatures)

* 
[VkPhysicalDeviceSubgroupSizeControlFeatures](../chapters/features.html#VkPhysicalDeviceSubgroupSizeControlFeatures)

* 
[VkPhysicalDeviceSynchronization2Features](../chapters/features.html#VkPhysicalDeviceSynchronization2Features)

* 
[VkPhysicalDeviceTextureCompressionASTCHDRFeatures](../chapters/features.html#VkPhysicalDeviceTextureCompressionASTCHDRFeatures)

* 
[VkPhysicalDeviceVulkan13Features](../chapters/features.html#VkPhysicalDeviceVulkan13Features)

* 
[VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures](../chapters/features.html#VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures)

Extending [VkPhysicalDeviceProperties2](../chapters/devsandqueues.html#VkPhysicalDeviceProperties2):

* 
[VkPhysicalDeviceInlineUniformBlockProperties](../chapters/limits.html#VkPhysicalDeviceInlineUniformBlockProperties)

* 
[VkPhysicalDeviceMaintenance4Properties](../chapters/limits.html#VkPhysicalDeviceMaintenance4Properties)

* 
[VkPhysicalDeviceShaderIntegerDotProductProperties](../chapters/devsandqueues.html#VkPhysicalDeviceShaderIntegerDotProductProperties)

* 
[VkPhysicalDeviceSubgroupSizeControlProperties](../chapters/limits.html#VkPhysicalDeviceSubgroupSizeControlProperties)

* 
[VkPhysicalDeviceTexelBufferAlignmentProperties](../chapters/limits.html#VkPhysicalDeviceTexelBufferAlignmentProperties)

* 
[VkPhysicalDeviceVulkan13Properties](../chapters/devsandqueues.html#VkPhysicalDeviceVulkan13Properties)

Extending [VkPipelineShaderStageCreateInfo](../chapters/pipelines.html#VkPipelineShaderStageCreateInfo), [VkShaderCreateInfoEXT](../chapters/shaders.html#VkShaderCreateInfoEXT):

* 
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](../chapters/pipelines.html#VkPipelineShaderStageRequiredSubgroupSizeCreateInfo)

Extending [VkSubpassDependency2](../chapters/renderpass.html#VkSubpassDependency2):

* 
[VkMemoryBarrier2](../chapters/synchronization.html#VkMemoryBarrier2)

Extending [VkWriteDescriptorSet](../chapters/descriptorsets.html#VkWriteDescriptorSet):

* 
[VkWriteDescriptorSetInlineUniformBlock](../chapters/descriptorsets.html#VkWriteDescriptorSetInlineUniformBlock)

* 
[VkAccessFlagBits2](../chapters/synchronization.html#VkAccessFlagBits2)

* 
[VkFormatFeatureFlagBits2](../chapters/formats.html#VkFormatFeatureFlagBits2)

* 
[VkPipelineCreationFeedbackFlagBits](../chapters/pipelines.html#VkPipelineCreationFeedbackFlagBits)

* 
[VkPipelineStageFlagBits2](../chapters/synchronization.html#VkPipelineStageFlagBits2)

* 
[VkRenderingFlagBits](../chapters/renderpass.html#VkRenderingFlagBits)

* 
[VkSubmitFlagBits](../chapters/cmdbuffers.html#VkSubmitFlagBits)

* 
[VkToolPurposeFlagBits](../chapters/debugging.html#VkToolPurposeFlagBits)

* 
[VkAccessFlags2](../chapters/synchronization.html#VkAccessFlags2)

* 
[VkFormatFeatureFlags2](../chapters/formats.html#VkFormatFeatureFlags2)

* 
[VkPipelineCreationFeedbackFlags](../chapters/pipelines.html#VkPipelineCreationFeedbackFlags)

* 
[VkPipelineStageFlags2](../chapters/synchronization.html#VkPipelineStageFlags2)

* 
[VkPrivateDataSlotCreateFlags](../chapters/private_data.html#VkPrivateDataSlotCreateFlags)

* 
[VkRenderingFlags](../chapters/renderpass.html#VkRenderingFlags)

* 
[VkSubmitFlags](../chapters/cmdbuffers.html#VkSubmitFlags)

* 
[VkToolPurposeFlags](../chapters/debugging.html#VkToolPurposeFlags)

* 
Extending [VkAccessFlagBits](../chapters/synchronization.html#VkAccessFlagBits):

[VK_ACCESS_NONE](../chapters/synchronization.html#VkAccessFlagBits)

Extending [VkAttachmentStoreOp](../chapters/renderpass.html#VkAttachmentStoreOp):

* 
[VK_ATTACHMENT_STORE_OP_NONE](../chapters/renderpass.html#VkAttachmentStoreOp)

Extending [VkDescriptorType](../chapters/descriptorsets.html#VkDescriptorType):

* 
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](../chapters/descriptorsets.html#VkDescriptorType)

Extending [VkDynamicState](../chapters/pipelines.html#VkDynamicState):

* 
[VK_DYNAMIC_STATE_CULL_MODE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_FRONT_FACE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_STENCIL_OP](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](../chapters/pipelines.html#VkDynamicState)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](../chapters/pipelines.html#VkDynamicState)

Extending [VkEventCreateFlagBits](../chapters/synchronization.html#VkEventCreateFlagBits):

* 
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](../chapters/synchronization.html#VkEventCreateFlagBits)

Extending [VkFormat](../chapters/formats.html#VkFormat):

* 
[VK_FORMAT_A4B4G4R4_UNORM_PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_A4R4G4B4_UNORM_PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](../chapters/formats.html#VkFormat)

Extending [VkFormatFeatureFlagBits2](../chapters/formats.html#VkFormatFeatureFlagBits2):

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_CUBIC_BIT](../chapters/formats.html#VkFormatFeatureFlagBits2KHR)

Extending [VkImageAspectFlagBits](../chapters/resources.html#VkImageAspectFlagBits):

* 
[VK_IMAGE_ASPECT_NONE](../chapters/resources.html#VkImageAspectFlagBits)

Extending [VkImageLayout](../chapters/resources.html#VkImageLayout):

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](../chapters/resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](../chapters/resources.html#VkImageLayout)

Extending [VkObjectType](../chapters/debugging.html#VkObjectType):

* 
[VK_OBJECT_TYPE_PRIVATE_DATA_SLOT](../chapters/debugging.html#VkObjectType)

Extending [VkPipelineCacheCreateFlagBits](../chapters/pipelines.html#VkPipelineCacheCreateFlagBits):

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](../chapters/pipelines.html#VkPipelineCacheCreateFlagBits)

Extending [VkPipelineCreateFlagBits](../chapters/pipelines.html#VkPipelineCreateFlagBits):

* 
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](../chapters/pipelines.html#VkPipelineCreateFlagBits)

* 
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](../chapters/pipelines.html#VkPipelineCreateFlagBits)

Extending [VkPipelineShaderStageCreateFlagBits](../chapters/pipelines.html#VkPipelineShaderStageCreateFlagBits):

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](../chapters/pipelines.html#VkPipelineShaderStageCreateFlagBits)

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](../chapters/pipelines.html#VkPipelineShaderStageCreateFlagBits)

Extending [VkPipelineStageFlagBits](../chapters/synchronization.html#VkPipelineStageFlagBits):

* 
[VK_PIPELINE_STAGE_NONE](../chapters/synchronization.html#VkPipelineStageFlagBits)

Extending [VkResult](../chapters/fundamentals.html#VkResult):

* 
[VK_PIPELINE_COMPILE_REQUIRED](../chapters/fundamentals.html#VkResult)

Extending [VkStructureType](../chapters/fundamentals.html#VkStructureType):

* 
[VK_STRUCTURE_TYPE_BLIT_IMAGE_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BUFFER_COPY_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BUFFER_IMAGE_COPY_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COPY_BUFFER_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COPY_BUFFER_TO_IMAGE_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_BUFFER_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEPENDENCY_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_BLIT_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_COPY_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_RESOLVE_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_BARRIER_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DEMOTE_TO_HELPER_INVOCATION_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TERMINATE_INVOCATION_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SYNCHRONIZATION_2_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDERING_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RESOLVE_IMAGE_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBMIT_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK](../chapters/fundamentals.html#VkStructureType)

Vulkan Version 1.2 [promoted](../chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_8bit_storage](extensions.html#VK_KHR_8bit_storage)

* 

[VK_KHR_buffer_device_address](extensions.html#VK_KHR_buffer_device_address)

* 

[VK_KHR_create_renderpass2](extensions.html#VK_KHR_create_renderpass2)

* 

[VK_KHR_depth_stencil_resolve](extensions.html#VK_KHR_depth_stencil_resolve)

* 

[VK_KHR_draw_indirect_count](extensions.html#VK_KHR_draw_indirect_count)

* 

[VK_KHR_driver_properties](extensions.html#VK_KHR_driver_properties)

* 

[VK_KHR_image_format_list](extensions.html#VK_KHR_image_format_list)

* 

[VK_KHR_imageless_framebuffer](extensions.html#VK_KHR_imageless_framebuffer)

* 

[VK_KHR_sampler_mirror_clamp_to_edge](extensions.html#VK_KHR_sampler_mirror_clamp_to_edge)

* 

[VK_KHR_separate_depth_stencil_layouts](extensions.html#VK_KHR_separate_depth_stencil_layouts)

* 

[VK_KHR_shader_atomic_int64](extensions.html#VK_KHR_shader_atomic_int64)

* 

[VK_KHR_shader_float16_int8](extensions.html#VK_KHR_shader_float16_int8)

* 

[VK_KHR_shader_float_controls](extensions.html#VK_KHR_shader_float_controls)

* 

[VK_KHR_shader_subgroup_extended_types](extensions.html#VK_KHR_shader_subgroup_extended_types)

* 

[VK_KHR_spirv_1_4](extensions.html#VK_KHR_spirv_1_4)

* 

[VK_KHR_timeline_semaphore](extensions.html#VK_KHR_timeline_semaphore)

* 

[VK_KHR_uniform_buffer_standard_layout](extensions.html#VK_KHR_uniform_buffer_standard_layout)

* 

[VK_KHR_vulkan_memory_model](extensions.html#VK_KHR_vulkan_memory_model)

* 

[VK_EXT_descriptor_indexing](extensions.html#VK_EXT_descriptor_indexing)

* 

[VK_EXT_host_query_reset](extensions.html#VK_EXT_host_query_reset)

* 

[VK_EXT_sampler_filter_minmax](extensions.html#VK_EXT_sampler_filter_minmax)

* 

[VK_EXT_scalar_block_layout](extensions.html#VK_EXT_scalar_block_layout)

* 

[VK_EXT_separate_stencil_usage](extensions.html#VK_EXT_separate_stencil_usage)

* 

[VK_EXT_shader_viewport_index_layer](extensions.html#VK_EXT_shader_viewport_index_layer)

All differences in behavior between these extensions and the corresponding
Vulkan 1.2 functionality are summarized below.

Differences Relative to `VK_KHR_8bit_storage`

If the `[VK_KHR_8bit_storage](extensions.html#VK_KHR_8bit_storage)` extension is not supported, support for
the SPIR-V [`storageBuffer8BitAccess`](../chapters/features.html#features-storageBuffer8BitAccess) capability in shader modules is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`storageBuffer8BitAccess` when
queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_draw_indirect_count`

If the `[VK_KHR_draw_indirect_count](extensions.html#VK_KHR_draw_indirect_count)` extension is not supported,
support for the commands [vkCmdDrawIndirectCount](../chapters/drawing.html#vkCmdDrawIndirectCount) and
[vkCmdDrawIndexedIndirectCount](../chapters/drawing.html#vkCmdDrawIndexedIndirectCount) is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`drawIndirectCount` when queried
via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_sampler_mirror_clamp_to_edge`

If the `[VK_KHR_sampler_mirror_clamp_to_edge](extensions.html#VK_KHR_sampler_mirror_clamp_to_edge)` extension is not
supported, support for the [VkSamplerAddressMode](../chapters/samplers.html#VkSamplerAddressMode)
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](../chapters/samplers.html#VkSamplerAddressMode) is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`samplerMirrorClampToEdge` when
queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_EXT_descriptor_indexing`

If the `[VK_EXT_descriptor_indexing](extensions.html#VK_EXT_descriptor_indexing)` extension is not supported,
support for the [`descriptorIndexing`](../chapters/features.html#features-descriptorIndexing)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`descriptorIndexing` when
queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_EXT_scalar_block_layout`

If the `[VK_EXT_scalar_block_layout](extensions.html#VK_EXT_scalar_block_layout)` extension is not supported,
support for the [`scalarBlockLayout`](../chapters/features.html#features-scalarBlockLayout)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`scalarBlockLayout` when queried
via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_EXT_shader_viewport_index_layer`

The `ShaderViewportIndexLayerEXT` SPIR-V capability was replaced with the
`ShaderViewportIndex` and `ShaderLayer` capabilities.
Declaring both is equivalent to declaring `ShaderViewportIndexLayerEXT`.
If the `[VK_EXT_shader_viewport_index_layer](extensions.html#VK_EXT_shader_viewport_index_layer)` extension is not
supported, support for the `ShaderViewportIndexLayerEXT` SPIR-V
capability is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`shaderOutputViewportIndex` and
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`shaderOutputLayer` when queried
via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_buffer_device_address`

If the `[VK_KHR_buffer_device_address](extensions.html#VK_KHR_buffer_device_address)` extension is not supported,
support for the [`bufferDeviceAddress`](../chapters/features.html#features-bufferDeviceAddress)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`bufferDeviceAddress` when
queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_shader_atomic_int64`

If the `[VK_KHR_shader_atomic_int64](extensions.html#VK_KHR_shader_atomic_int64)` extension is not supported,
support for the [`shaderBufferInt64Atomics`](../chapters/features.html#features-shaderBufferInt64Atomics) feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`shaderBufferInt64Atomics` when
queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_shader_float16_int8`

If the `[VK_KHR_shader_float16_int8](extensions.html#VK_KHR_shader_float16_int8)` extension is not supported,
support for the [`shaderFloat16`](../chapters/features.html#features-shaderFloat16) and
[`shaderInt8`](../chapters/features.html#features-shaderInt8) features is optional.
Support for these features are defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`shaderFloat16` and
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`shaderInt8` when queried via
[vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_vulkan_memory_model`

If the `[VK_KHR_vulkan_memory_model](extensions.html#VK_KHR_vulkan_memory_model)` extension is not supported,
support for the [`vulkanMemoryModel`](../chapters/features.html#features-vulkanMemoryModel)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)::`vulkanMemoryModel` when queried
via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Additional Vulkan 1.2 Feature Support

In addition to the promoted extensions described above, Vulkan 1.2 added
support for:

* 
SPIR-V version 1.4.

* 
SPIR-V version 1.5.

* 
The [    `samplerMirrorClampToEdge`](../chapters/features.html#features-samplerMirrorClampToEdge) feature which indicates whether the
implementation supports the
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](../chapters/samplers.html#VkSamplerAddressMode) sampler address mode.

* 
The [    `ShaderNonUniform`](spirvenv.html#spirvenv-capabilities-table-ShaderNonUniform) capability in SPIR-V version 1.5.

* 
The [    `shaderOutputViewportIndex`](../chapters/features.html#features-shaderOutputViewportIndex) feature which indicates that the
[    `ShaderViewportIndex`](spirvenv.html#spirvenv-capabilities-table-ShaderViewportIndex) capability can be used.

* 
The [`shaderOutputLayer`](../chapters/features.html#features-shaderOutputLayer) feature
which indicates that the [    `ShaderLayer`](spirvenv.html#spirvenv-capabilities-table-ShaderLayer) capability can be used.

* 
The [    `subgroupBroadcastDynamicId`](../chapters/features.html#features-subgroupBroadcastDynamicId) feature which allows the “Id”
operand of `OpGroupNonUniformBroadcast` to be dynamically uniform
within a subgroup, and the “Index” operand of
`OpGroupNonUniformQuadBroadcast` to be dynamically uniform within a
derivative group, in shader modules of version 1.5 or higher.

* 
The [`drawIndirectCount`](../chapters/features.html#features-drawIndirectCount) feature
which indicates whether the [vkCmdDrawIndirectCount](../chapters/drawing.html#vkCmdDrawIndirectCount) and
[vkCmdDrawIndexedIndirectCount](../chapters/drawing.html#vkCmdDrawIndexedIndirectCount) functions can be used.

* 
The [`descriptorIndexing`](../chapters/features.html#features-descriptorIndexing) feature
which indicates the implementation supports the minimum number of
descriptor indexing features as defined in the [    Feature Requirements](../chapters/features.html#features-requirements) section.

* 
The [`samplerFilterMinmax`](../chapters/features.html#features-samplerFilterMinmax) feature
which indicates whether the implementation supports the minimum number
of image formats that support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](../chapters/formats.html#VkFormatFeatureFlagBits) feature bit as
defined by the
[    `filterMinmaxSingleComponentFormats`](../chapters/limits.html#limits-filterMinmaxSingleComponentFormats-minimum-requirements) property minimum
requirements.

* 
The [    `framebufferIntegerColorSampleCounts`](../chapters/devsandqueues.html#limits-framebufferIntegerColorSampleCounts) limit which indicates the
color sample counts that are supported for all framebuffer color
attachments with integer formats.

* 
[VK_API_VERSION_1_2](../chapters/extensions.html#VK_API_VERSION_1_2)

* 
[vkCmdBeginRenderPass2](../chapters/renderpass.html#vkCmdBeginRenderPass2)

* 
[vkCmdDrawIndexedIndirectCount](../chapters/drawing.html#vkCmdDrawIndexedIndirectCount)

* 
[vkCmdDrawIndirectCount](../chapters/drawing.html#vkCmdDrawIndirectCount)

* 
[vkCmdEndRenderPass2](../chapters/renderpass.html#vkCmdEndRenderPass2)

* 
[vkCmdNextSubpass2](../chapters/renderpass.html#vkCmdNextSubpass2)

* 
[vkCreateRenderPass2](../chapters/renderpass.html#vkCreateRenderPass2)

* 
[vkGetBufferDeviceAddress](../chapters/resources.html#vkGetBufferDeviceAddress)

* 
[vkGetBufferOpaqueCaptureAddress](../chapters/resources.html#vkGetBufferOpaqueCaptureAddress)

* 
[vkGetDeviceMemoryOpaqueCaptureAddress](../chapters/memory.html#vkGetDeviceMemoryOpaqueCaptureAddress)

* 
[vkGetSemaphoreCounterValue](../chapters/synchronization.html#vkGetSemaphoreCounterValue)

* 
[vkResetQueryPool](../chapters/queries.html#vkResetQueryPool)

* 
[vkSignalSemaphore](../chapters/synchronization.html#vkSignalSemaphore)

* 
[vkWaitSemaphores](../chapters/synchronization.html#vkWaitSemaphores)

* 
[VkAttachmentDescription2](../chapters/renderpass.html#VkAttachmentDescription2)

* 
[VkAttachmentReference2](../chapters/renderpass.html#VkAttachmentReference2)

* 
[VkBufferDeviceAddressInfo](../chapters/resources.html#VkBufferDeviceAddressInfo)

* 
[VkConformanceVersion](../chapters/devsandqueues.html#VkConformanceVersion)

* 
[VkDeviceMemoryOpaqueCaptureAddressInfo](../chapters/memory.html#VkDeviceMemoryOpaqueCaptureAddressInfo)

* 
[VkFramebufferAttachmentImageInfo](../chapters/renderpass.html#VkFramebufferAttachmentImageInfo)

* 
[VkRenderPassCreateInfo2](../chapters/renderpass.html#VkRenderPassCreateInfo2)

* 
[VkSemaphoreSignalInfo](../chapters/synchronization.html#VkSemaphoreSignalInfo)

* 
[VkSemaphoreWaitInfo](../chapters/synchronization.html#VkSemaphoreWaitInfo)

* 
[VkSubpassBeginInfo](../chapters/renderpass.html#VkSubpassBeginInfo)

* 
[VkSubpassDependency2](../chapters/renderpass.html#VkSubpassDependency2)

* 
[VkSubpassDescription2](../chapters/renderpass.html#VkSubpassDescription2)

* 
[VkSubpassEndInfo](../chapters/renderpass.html#VkSubpassEndInfo)

* 
Extending [VkAttachmentDescription2](../chapters/renderpass.html#VkAttachmentDescription2):

[VkAttachmentDescriptionStencilLayout](../chapters/renderpass.html#VkAttachmentDescriptionStencilLayout)

Extending [VkAttachmentReference2](../chapters/renderpass.html#VkAttachmentReference2):

* 
[VkAttachmentReferenceStencilLayout](../chapters/renderpass.html#VkAttachmentReferenceStencilLayout)

Extending [VkBufferCreateInfo](../chapters/resources.html#VkBufferCreateInfo):

* 
[VkBufferOpaqueCaptureAddressCreateInfo](../chapters/resources.html#VkBufferOpaqueCaptureAddressCreateInfo)

Extending [VkDescriptorSetAllocateInfo](../chapters/descriptorsets.html#VkDescriptorSetAllocateInfo):

* 
[VkDescriptorSetVariableDescriptorCountAllocateInfo](../chapters/descriptorsets.html#VkDescriptorSetVariableDescriptorCountAllocateInfo)

Extending [VkDescriptorSetLayoutCreateInfo](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateInfo):

* 
[VkDescriptorSetLayoutBindingFlagsCreateInfo](../chapters/descriptorsets.html#VkDescriptorSetLayoutBindingFlagsCreateInfo)

Extending [VkDescriptorSetLayoutSupport](../chapters/descriptorsets.html#VkDescriptorSetLayoutSupport):

* 
[VkDescriptorSetVariableDescriptorCountLayoutSupport](../chapters/descriptorsets.html#VkDescriptorSetVariableDescriptorCountLayoutSupport)

Extending [VkFramebufferCreateInfo](../chapters/renderpass.html#VkFramebufferCreateInfo):

* 
[VkFramebufferAttachmentsCreateInfo](../chapters/renderpass.html#VkFramebufferAttachmentsCreateInfo)

Extending [VkImageCreateInfo](../chapters/resources.html#VkImageCreateInfo), [VkPhysicalDeviceImageFormatInfo2](../chapters/capabilities.html#VkPhysicalDeviceImageFormatInfo2):

* 
[VkImageStencilUsageCreateInfo](../chapters/resources.html#VkImageStencilUsageCreateInfo)

Extending [VkImageCreateInfo](../chapters/resources.html#VkImageCreateInfo), [VkSwapchainCreateInfoKHR](../chapters/VK_KHR_surface/wsi.html#VkSwapchainCreateInfoKHR), [VkPhysicalDeviceImageFormatInfo2](../chapters/capabilities.html#VkPhysicalDeviceImageFormatInfo2):

* 
[VkImageFormatListCreateInfo](../chapters/resources.html#VkImageFormatListCreateInfo)

Extending [VkMemoryAllocateInfo](../chapters/memory.html#VkMemoryAllocateInfo):

* 
[VkMemoryOpaqueCaptureAddressAllocateInfo](../chapters/memory.html#VkMemoryOpaqueCaptureAddressAllocateInfo)

Extending [VkPhysicalDeviceFeatures2](../chapters/features.html#VkPhysicalDeviceFeatures2), [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo):

* 
[VkPhysicalDevice8BitStorageFeatures](../chapters/features.html#VkPhysicalDevice8BitStorageFeatures)

* 
[VkPhysicalDeviceBufferDeviceAddressFeatures](../chapters/features.html#VkPhysicalDeviceBufferDeviceAddressFeatures)

* 
[VkPhysicalDeviceDescriptorIndexingFeatures](../chapters/features.html#VkPhysicalDeviceDescriptorIndexingFeatures)

* 
[VkPhysicalDeviceHostQueryResetFeatures](../chapters/features.html#VkPhysicalDeviceHostQueryResetFeatures)

* 
[VkPhysicalDeviceImagelessFramebufferFeatures](../chapters/features.html#VkPhysicalDeviceImagelessFramebufferFeatures)

* 
[VkPhysicalDeviceScalarBlockLayoutFeatures](../chapters/features.html#VkPhysicalDeviceScalarBlockLayoutFeatures)

* 
[VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures](../chapters/features.html#VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures)

* 
[VkPhysicalDeviceShaderAtomicInt64Features](../chapters/features.html#VkPhysicalDeviceShaderAtomicInt64Features)

* 
[VkPhysicalDeviceShaderFloat16Int8Features](../chapters/features.html#VkPhysicalDeviceShaderFloat16Int8Features)

* 
[VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures](../chapters/features.html#VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures)

* 
[VkPhysicalDeviceTimelineSemaphoreFeatures](../chapters/features.html#VkPhysicalDeviceTimelineSemaphoreFeatures)

* 
[VkPhysicalDeviceUniformBufferStandardLayoutFeatures](../chapters/features.html#VkPhysicalDeviceUniformBufferStandardLayoutFeatures)

* 
[VkPhysicalDeviceVulkan11Features](../chapters/features.html#VkPhysicalDeviceVulkan11Features)

* 
[VkPhysicalDeviceVulkan12Features](../chapters/features.html#VkPhysicalDeviceVulkan12Features)

* 
[VkPhysicalDeviceVulkanMemoryModelFeatures](../chapters/features.html#VkPhysicalDeviceVulkanMemoryModelFeatures)

Extending [VkPhysicalDeviceProperties2](../chapters/devsandqueues.html#VkPhysicalDeviceProperties2):

* 
[VkPhysicalDeviceDepthStencilResolveProperties](../chapters/limits.html#VkPhysicalDeviceDepthStencilResolveProperties)

* 
[VkPhysicalDeviceDescriptorIndexingProperties](../chapters/limits.html#VkPhysicalDeviceDescriptorIndexingProperties)

* 
[VkPhysicalDeviceDriverProperties](../chapters/devsandqueues.html#VkPhysicalDeviceDriverProperties)

* 
[VkPhysicalDeviceFloatControlsProperties](../chapters/limits.html#VkPhysicalDeviceFloatControlsProperties)

* 
[VkPhysicalDeviceSamplerFilterMinmaxProperties](../chapters/limits.html#VkPhysicalDeviceSamplerFilterMinmaxProperties)

* 
[VkPhysicalDeviceTimelineSemaphoreProperties](../chapters/limits.html#VkPhysicalDeviceTimelineSemaphoreProperties)

* 
[VkPhysicalDeviceVulkan11Properties](../chapters/devsandqueues.html#VkPhysicalDeviceVulkan11Properties)

* 
[VkPhysicalDeviceVulkan12Properties](../chapters/devsandqueues.html#VkPhysicalDeviceVulkan12Properties)

Extending [VkRenderPassBeginInfo](../chapters/renderpass.html#VkRenderPassBeginInfo):

* 
[VkRenderPassAttachmentBeginInfo](../chapters/renderpass.html#VkRenderPassAttachmentBeginInfo)

Extending [VkSamplerCreateInfo](../chapters/samplers.html#VkSamplerCreateInfo):

* 
[VkSamplerReductionModeCreateInfo](../chapters/samplers.html#VkSamplerReductionModeCreateInfo)

Extending [VkSemaphoreCreateInfo](../chapters/synchronization.html#VkSemaphoreCreateInfo), [VkPhysicalDeviceExternalSemaphoreInfo](../chapters/capabilities.html#VkPhysicalDeviceExternalSemaphoreInfo):

* 
[VkSemaphoreTypeCreateInfo](../chapters/synchronization.html#VkSemaphoreTypeCreateInfo)

Extending [VkSubmitInfo](../chapters/cmdbuffers.html#VkSubmitInfo), [VkBindSparseInfo](../chapters/sparsemem.html#VkBindSparseInfo):

* 
[VkTimelineSemaphoreSubmitInfo](../chapters/cmdbuffers.html#VkTimelineSemaphoreSubmitInfo)

Extending [VkSubpassDescription2](../chapters/renderpass.html#VkSubpassDescription2):

* 
[VkSubpassDescriptionDepthStencilResolve](../chapters/renderpass.html#VkSubpassDescriptionDepthStencilResolve)

* 
[VkDescriptorBindingFlagBits](../chapters/descriptorsets.html#VkDescriptorBindingFlagBits)

* 
[VkDriverId](../chapters/devsandqueues.html#VkDriverId)

* 
[VkResolveModeFlagBits](../chapters/renderpass.html#VkResolveModeFlagBits)

* 
[VkSamplerReductionMode](../chapters/samplers.html#VkSamplerReductionMode)

* 
[VkSemaphoreType](../chapters/synchronization.html#VkSemaphoreType)

* 
[VkSemaphoreWaitFlagBits](../chapters/synchronization.html#VkSemaphoreWaitFlagBits)

* 
[VkShaderFloatControlsIndependence](../chapters/limits.html#VkShaderFloatControlsIndependence)

* 
[VkDescriptorBindingFlags](../chapters/descriptorsets.html#VkDescriptorBindingFlags)

* 
[VkResolveModeFlags](../chapters/renderpass.html#VkResolveModeFlags)

* 
[VkSemaphoreWaitFlags](../chapters/synchronization.html#VkSemaphoreWaitFlags)

* 
[VK_MAX_DRIVER_INFO_SIZE](../chapters/devsandqueues.html#VK_MAX_DRIVER_INFO_SIZE)

* 
[VK_MAX_DRIVER_NAME_SIZE](../chapters/devsandqueues.html#VK_MAX_DRIVER_NAME_SIZE)

* 
Extending [VkBufferCreateFlagBits](../chapters/resources.html#VkBufferCreateFlagBits):

[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](../chapters/resources.html#VkBufferCreateFlagBits)

Extending [VkBufferUsageFlagBits](../chapters/resources.html#VkBufferUsageFlagBits):

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](../chapters/resources.html#VkBufferUsageFlagBits)

Extending [VkDescriptorPoolCreateFlagBits](../chapters/descriptorsets.html#VkDescriptorPoolCreateFlagBits):

* 
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](../chapters/descriptorsets.html#VkDescriptorPoolCreateFlagBits)

Extending [VkDescriptorSetLayoutCreateFlagBits](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits):

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)

Extending [VkFormatFeatureFlagBits](../chapters/formats.html#VkFormatFeatureFlagBits):

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

Extending [VkFramebufferCreateFlagBits](../chapters/renderpass.html#VkFramebufferCreateFlagBits):

* 
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](../chapters/renderpass.html#VkFramebufferCreateFlagBits)

Extending [VkImageLayout](../chapters/resources.html#VkImageLayout):

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](../chapters/resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](../chapters/resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](../chapters/resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](../chapters/resources.html#VkImageLayout)

Extending [VkMemoryAllocateFlagBits](../chapters/memory.html#VkMemoryAllocateFlagBits):

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](../chapters/memory.html#VkMemoryAllocateFlagBitsKHR)

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](../chapters/memory.html#VkMemoryAllocateFlagBitsKHR)

Extending [VkResult](../chapters/fundamentals.html#VkResult):

* 
[VK_ERROR_FRAGMENTATION](../chapters/fundamentals.html#VkResult)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](../chapters/fundamentals.html#VkResult)

Extending [VkSamplerAddressMode](../chapters/samplers.html#VkSamplerAddressMode):

* 
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](../chapters/samplers.html#VkSamplerAddressMode)

Extending [VkStructureType](../chapters/fundamentals.html#VkStructureType):

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_8BIT_STORAGE_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_QUERY_RESET_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGELESS_FRAMEBUFFER_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_FILTER_MINMAX_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCALAR_BLOCK_LAYOUT_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SEPARATE_DEPTH_STENCIL_LAYOUTS_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_INT64_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFORM_BUFFER_STANDARD_LAYOUT_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_MEMORY_MODEL_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SUBPASS_END_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO](../chapters/fundamentals.html#VkStructureType)

Vulkan Version 1.1 [promoted](../chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_16bit_storage](extensions.html#VK_KHR_16bit_storage)

* 

[VK_KHR_bind_memory2](extensions.html#VK_KHR_bind_memory2)

* 

[VK_KHR_dedicated_allocation](extensions.html#VK_KHR_dedicated_allocation)

* 

[VK_KHR_descriptor_update_template](extensions.html#VK_KHR_descriptor_update_template)

* 

[VK_KHR_device_group](extensions.html#VK_KHR_device_group)

* 

[VK_KHR_device_group_creation](extensions.html#VK_KHR_device_group_creation)

* 

[VK_KHR_external_fence](extensions.html#VK_KHR_external_fence)

* 

[VK_KHR_external_fence_capabilities](extensions.html#VK_KHR_external_fence_capabilities)

* 

[VK_KHR_external_memory](extensions.html#VK_KHR_external_memory)

* 

[VK_KHR_external_memory_capabilities](extensions.html#VK_KHR_external_memory_capabilities)

* 

[VK_KHR_external_semaphore](extensions.html#VK_KHR_external_semaphore)

* 

[VK_KHR_external_semaphore_capabilities](extensions.html#VK_KHR_external_semaphore_capabilities)

* 

[VK_KHR_get_memory_requirements2](extensions.html#VK_KHR_get_memory_requirements2)

* 

[VK_KHR_get_physical_device_properties2](extensions.html#VK_KHR_get_physical_device_properties2)

* 

[VK_KHR_maintenance1](extensions.html#VK_KHR_maintenance1)

* 

[VK_KHR_maintenance2](extensions.html#VK_KHR_maintenance2)

* 

[VK_KHR_maintenance3](extensions.html#VK_KHR_maintenance3)

* 

[VK_KHR_multiview](extensions.html#VK_KHR_multiview)

* 

[VK_KHR_relaxed_block_layout](extensions.html#VK_KHR_relaxed_block_layout)

* 

[VK_KHR_sampler_ycbcr_conversion](extensions.html#VK_KHR_sampler_ycbcr_conversion)

* 

[VK_KHR_shader_draw_parameters](extensions.html#VK_KHR_shader_draw_parameters)

* 

[VK_KHR_storage_buffer_storage_class](extensions.html#VK_KHR_storage_buffer_storage_class)

* 

[VK_KHR_variable_pointers](extensions.html#VK_KHR_variable_pointers)

All differences in behavior between these extensions and the corresponding
Vulkan 1.1 functionality are summarized below.

Differences Relative to `VK_KHR_16bit_storage`

If the `[VK_KHR_16bit_storage](extensions.html#VK_KHR_16bit_storage)` extension is not supported, support for
the [`storageBuffer16BitAccess`](../chapters/features.html#features-storageBuffer16BitAccess)
feature is optional.
Support for this feature is defined by
[VkPhysicalDevice16BitStorageFeatures](../chapters/features.html#VkPhysicalDevice16BitStorageFeatures)::`storageBuffer16BitAccess`
or [VkPhysicalDeviceVulkan11Features](../chapters/features.html#VkPhysicalDeviceVulkan11Features)::`storageBuffer16BitAccess`
when queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_sampler_ycbcr_conversion`

If the `[VK_KHR_sampler_ycbcr_conversion](extensions.html#VK_KHR_sampler_ycbcr_conversion)` extension is not supported,
support for the [`samplerYcbcrConversion`](../chapters/features.html#features-samplerYcbcrConversion) feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceSamplerYcbcrConversionFeatures](../chapters/features.html#VkPhysicalDeviceSamplerYcbcrConversionFeatures)::`samplerYcbcrConversion`
or [VkPhysicalDeviceVulkan11Features](../chapters/features.html#VkPhysicalDeviceVulkan11Features)::`samplerYcbcrConversion`
when queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_shader_draw_parameters`

If the `[VK_KHR_shader_draw_parameters](extensions.html#VK_KHR_shader_draw_parameters)` extension is not supported,
support for the
[`SPV_KHR_shader_draw_parameters`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_shader_draw_parameters.html)
SPIR-V extension is optional.
Support for this feature is defined by
[VkPhysicalDeviceShaderDrawParametersFeatures](../chapters/features.html#VkPhysicalDeviceShaderDrawParametersFeatures)::`shaderDrawParameters`
or [VkPhysicalDeviceVulkan11Features](../chapters/features.html#VkPhysicalDeviceVulkan11Features)::`shaderDrawParameters`
when queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Differences Relative to `VK_KHR_variable_pointers`

If the `[VK_KHR_variable_pointers](extensions.html#VK_KHR_variable_pointers)` extension is not supported, support
for the [`variablePointersStorageBuffer`](../chapters/features.html#features-variablePointersStorageBuffer) feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVariablePointersFeatures](../chapters/features.html#VkPhysicalDeviceVariablePointersFeatures)::`variablePointersStorageBuffer`
or
[VkPhysicalDeviceVulkan11Features](../chapters/features.html#VkPhysicalDeviceVulkan11Features)::`variablePointersStorageBuffer`
when queried via [vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2).

Additional Vulkan 1.1 Feature Support

In addition to the promoted extensions described above, Vulkan 1.1 added
support for:

* 
SPIR-V version 1.1

* 
SPIR-V version 1.2

* 
SPIR-V version 1.3

* 
The [group operations](../chapters/shaders.html#shaders-group-operations) and
[subgroup scope](../chapters/shaders.html#shaders-scope-subgroup).

* 
The [protected memory](../chapters/memory.html#memory-protected-memory) feature.

* 
A new command to enumerate the instance version:
[vkEnumerateInstanceVersion](../chapters/initialization.html#vkEnumerateInstanceVersion).

* 
The [VkPhysicalDeviceShaderDrawParametersFeatures](../chapters/features.html#VkPhysicalDeviceShaderDrawParametersFeatures) feature query
structure (where the `[VK_KHR_shader_draw_parameters](extensions.html#VK_KHR_shader_draw_parameters)` extension did
not have one).

* 
[VK_API_VERSION_1_1](../chapters/extensions.html#VK_API_VERSION_1_1)

* 
[VkDescriptorUpdateTemplate](../chapters/descriptorsets.html#VkDescriptorUpdateTemplate)

* 
[VkSamplerYcbcrConversion](../chapters/samplers.html#VkSamplerYcbcrConversion)

* 
[vkBindBufferMemory2](../chapters/resources.html#vkBindBufferMemory2)

* 
[vkBindImageMemory2](../chapters/resources.html#vkBindImageMemory2)

* 
[vkCmdDispatchBase](../chapters/dispatch.html#vkCmdDispatchBase)

* 
[vkCmdSetDeviceMask](../chapters/cmdbuffers.html#vkCmdSetDeviceMask)

* 
[vkCreateDescriptorUpdateTemplate](../chapters/descriptorsets.html#vkCreateDescriptorUpdateTemplate)

* 
[vkCreateSamplerYcbcrConversion](../chapters/samplers.html#vkCreateSamplerYcbcrConversion)

* 
[vkDestroyDescriptorUpdateTemplate](../chapters/descriptorsets.html#vkDestroyDescriptorUpdateTemplate)

* 
[vkDestroySamplerYcbcrConversion](../chapters/samplers.html#vkDestroySamplerYcbcrConversion)

* 
[vkEnumerateInstanceVersion](../chapters/initialization.html#vkEnumerateInstanceVersion)

* 
[vkEnumeratePhysicalDeviceGroups](../chapters/devsandqueues.html#vkEnumeratePhysicalDeviceGroups)

* 
[vkGetBufferMemoryRequirements2](../chapters/resources.html#vkGetBufferMemoryRequirements2)

* 
[vkGetDescriptorSetLayoutSupport](../chapters/descriptorsets.html#vkGetDescriptorSetLayoutSupport)

* 
[vkGetDeviceGroupPeerMemoryFeatures](../chapters/memory.html#vkGetDeviceGroupPeerMemoryFeatures)

* 
[vkGetDeviceQueue2](../chapters/devsandqueues.html#vkGetDeviceQueue2)

* 
[vkGetImageMemoryRequirements2](../chapters/resources.html#vkGetImageMemoryRequirements2)

* 
[vkGetImageSparseMemoryRequirements2](../chapters/sparsemem.html#vkGetImageSparseMemoryRequirements2)

* 
[vkGetPhysicalDeviceExternalBufferProperties](../chapters/capabilities.html#vkGetPhysicalDeviceExternalBufferProperties)

* 
[vkGetPhysicalDeviceExternalFenceProperties](../chapters/capabilities.html#vkGetPhysicalDeviceExternalFenceProperties)

* 
[vkGetPhysicalDeviceExternalSemaphoreProperties](../chapters/capabilities.html#vkGetPhysicalDeviceExternalSemaphoreProperties)

* 
[vkGetPhysicalDeviceFeatures2](../chapters/features.html#vkGetPhysicalDeviceFeatures2)

* 
[vkGetPhysicalDeviceFormatProperties2](../chapters/formats.html#vkGetPhysicalDeviceFormatProperties2)

* 
[vkGetPhysicalDeviceImageFormatProperties2](../chapters/capabilities.html#vkGetPhysicalDeviceImageFormatProperties2)

* 
[vkGetPhysicalDeviceMemoryProperties2](../chapters/memory.html#vkGetPhysicalDeviceMemoryProperties2)

* 
[vkGetPhysicalDeviceProperties2](../chapters/devsandqueues.html#vkGetPhysicalDeviceProperties2)

* 
[vkGetPhysicalDeviceQueueFamilyProperties2](../chapters/devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2)

* 
[vkGetPhysicalDeviceSparseImageFormatProperties2](../chapters/sparsemem.html#vkGetPhysicalDeviceSparseImageFormatProperties2)

* 
[vkTrimCommandPool](../chapters/cmdbuffers.html#vkTrimCommandPool)

* 
[vkUpdateDescriptorSetWithTemplate](../chapters/descriptorsets.html#vkUpdateDescriptorSetWithTemplate)

* 
[VkBindBufferMemoryInfo](../chapters/resources.html#VkBindBufferMemoryInfo)

* 
[VkBindImageMemoryInfo](../chapters/resources.html#VkBindImageMemoryInfo)

* 
[VkBufferMemoryRequirementsInfo2](../chapters/resources.html#VkBufferMemoryRequirementsInfo2)

* 
[VkDescriptorSetLayoutSupport](../chapters/descriptorsets.html#VkDescriptorSetLayoutSupport)

* 
[VkDescriptorUpdateTemplateCreateInfo](../chapters/descriptorsets.html#VkDescriptorUpdateTemplateCreateInfo)

* 
[VkDescriptorUpdateTemplateEntry](../chapters/descriptorsets.html#VkDescriptorUpdateTemplateEntry)

* 
[VkDeviceQueueInfo2](../chapters/devsandqueues.html#VkDeviceQueueInfo2)

* 
[VkExternalBufferProperties](../chapters/capabilities.html#VkExternalBufferProperties)

* 
[VkExternalFenceProperties](../chapters/capabilities.html#VkExternalFenceProperties)

* 
[VkExternalMemoryProperties](../chapters/capabilities.html#VkExternalMemoryProperties)

* 
[VkExternalSemaphoreProperties](../chapters/capabilities.html#VkExternalSemaphoreProperties)

* 
[VkFormatProperties2](../chapters/formats.html#VkFormatProperties2)

* 
[VkImageFormatProperties2](../chapters/capabilities.html#VkImageFormatProperties2)

* 
[VkImageMemoryRequirementsInfo2](../chapters/resources.html#VkImageMemoryRequirementsInfo2)

* 
[VkImageSparseMemoryRequirementsInfo2](../chapters/sparsemem.html#VkImageSparseMemoryRequirementsInfo2)

* 
[VkInputAttachmentAspectReference](../chapters/renderpass.html#VkInputAttachmentAspectReference)

* 
[VkMemoryRequirements2](../chapters/resources.html#VkMemoryRequirements2)

* 
[VkPhysicalDeviceExternalBufferInfo](../chapters/capabilities.html#VkPhysicalDeviceExternalBufferInfo)

* 
[VkPhysicalDeviceExternalFenceInfo](../chapters/capabilities.html#VkPhysicalDeviceExternalFenceInfo)

* 
[VkPhysicalDeviceExternalSemaphoreInfo](../chapters/capabilities.html#VkPhysicalDeviceExternalSemaphoreInfo)

* 
[VkPhysicalDeviceGroupProperties](../chapters/devsandqueues.html#VkPhysicalDeviceGroupProperties)

* 
[VkPhysicalDeviceImageFormatInfo2](../chapters/capabilities.html#VkPhysicalDeviceImageFormatInfo2)

* 
[VkPhysicalDeviceMemoryProperties2](../chapters/memory.html#VkPhysicalDeviceMemoryProperties2)

* 
[VkPhysicalDeviceProperties2](../chapters/devsandqueues.html#VkPhysicalDeviceProperties2)

* 
[VkPhysicalDeviceSparseImageFormatInfo2](../chapters/sparsemem.html#VkPhysicalDeviceSparseImageFormatInfo2)

* 
[VkQueueFamilyProperties2](../chapters/devsandqueues.html#VkQueueFamilyProperties2)

* 
[VkSamplerYcbcrConversionCreateInfo](../chapters/samplers.html#VkSamplerYcbcrConversionCreateInfo)

* 
[VkSparseImageFormatProperties2](../chapters/sparsemem.html#VkSparseImageFormatProperties2)

* 
[VkSparseImageMemoryRequirements2](../chapters/sparsemem.html#VkSparseImageMemoryRequirements2)

* 
Extending [VkBindBufferMemoryInfo](../chapters/resources.html#VkBindBufferMemoryInfo):

[VkBindBufferMemoryDeviceGroupInfo](../chapters/resources.html#VkBindBufferMemoryDeviceGroupInfo)

Extending [VkBindImageMemoryInfo](../chapters/resources.html#VkBindImageMemoryInfo):

* 
[VkBindImageMemoryDeviceGroupInfo](../chapters/resources.html#VkBindImageMemoryDeviceGroupInfo)

* 
[VkBindImagePlaneMemoryInfo](../chapters/resources.html#VkBindImagePlaneMemoryInfo)

Extending [VkBindSparseInfo](../chapters/sparsemem.html#VkBindSparseInfo):

* 
[VkDeviceGroupBindSparseInfo](../chapters/sparsemem.html#VkDeviceGroupBindSparseInfo)

Extending [VkBufferCreateInfo](../chapters/resources.html#VkBufferCreateInfo):

* 
[VkExternalMemoryBufferCreateInfo](../chapters/resources.html#VkExternalMemoryBufferCreateInfo)

Extending [VkCommandBufferBeginInfo](../chapters/cmdbuffers.html#VkCommandBufferBeginInfo):

* 
[VkDeviceGroupCommandBufferBeginInfo](../chapters/cmdbuffers.html#VkDeviceGroupCommandBufferBeginInfo)

Extending [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo):

* 
[VkDeviceGroupDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceGroupDeviceCreateInfo)

* 
[VkPhysicalDeviceFeatures2](../chapters/features.html#VkPhysicalDeviceFeatures2)

Extending [VkFenceCreateInfo](../chapters/synchronization.html#VkFenceCreateInfo):

* 
[VkExportFenceCreateInfo](../chapters/synchronization.html#VkExportFenceCreateInfo)

Extending [VkImageCreateInfo](../chapters/resources.html#VkImageCreateInfo):

* 
[VkExternalMemoryImageCreateInfo](../chapters/resources.html#VkExternalMemoryImageCreateInfo)

Extending [VkImageFormatProperties2](../chapters/capabilities.html#VkImageFormatProperties2):

* 
[VkExternalImageFormatProperties](../chapters/capabilities.html#VkExternalImageFormatProperties)

* 
[VkSamplerYcbcrConversionImageFormatProperties](../chapters/capabilities.html#VkSamplerYcbcrConversionImageFormatProperties)

Extending [VkImageMemoryRequirementsInfo2](../chapters/resources.html#VkImageMemoryRequirementsInfo2):

* 
[VkImagePlaneMemoryRequirementsInfo](../chapters/resources.html#VkImagePlaneMemoryRequirementsInfo)

Extending [VkImageViewCreateInfo](../chapters/resources.html#VkImageViewCreateInfo):

* 
[VkImageViewUsageCreateInfo](../chapters/resources.html#VkImageViewUsageCreateInfo)

Extending [VkMemoryAllocateInfo](../chapters/memory.html#VkMemoryAllocateInfo):

* 
[VkExportMemoryAllocateInfo](../chapters/memory.html#VkExportMemoryAllocateInfo)

* 
[VkMemoryAllocateFlagsInfo](../chapters/memory.html#VkMemoryAllocateFlagsInfo)

* 
[VkMemoryDedicatedAllocateInfo](../chapters/memory.html#VkMemoryDedicatedAllocateInfo)

Extending [VkMemoryRequirements2](../chapters/resources.html#VkMemoryRequirements2):

* 
[VkMemoryDedicatedRequirements](../chapters/resources.html#VkMemoryDedicatedRequirements)

Extending [VkPhysicalDeviceFeatures2](../chapters/features.html#VkPhysicalDeviceFeatures2), [VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo):

* 
[VkPhysicalDevice16BitStorageFeatures](../chapters/features.html#VkPhysicalDevice16BitStorageFeatures)

* 
[VkPhysicalDeviceMultiviewFeatures](../chapters/features.html#VkPhysicalDeviceMultiviewFeatures)

* 
[VkPhysicalDeviceProtectedMemoryFeatures](../chapters/features.html#VkPhysicalDeviceProtectedMemoryFeatures)

* 
[VkPhysicalDeviceSamplerYcbcrConversionFeatures](../chapters/features.html#VkPhysicalDeviceSamplerYcbcrConversionFeatures)

* 
[VkPhysicalDeviceShaderDrawParameterFeatures](../chapters/features.html#VkPhysicalDeviceShaderDrawParameterFeatures)

* 
[VkPhysicalDeviceShaderDrawParametersFeatures](../chapters/features.html#VkPhysicalDeviceShaderDrawParametersFeatures)

* 
[VkPhysicalDeviceVariablePointerFeatures](../chapters/features.html#VkPhysicalDeviceVariablePointerFeatures)

* 
[VkPhysicalDeviceVariablePointersFeatures](../chapters/features.html#VkPhysicalDeviceVariablePointersFeatures)

Extending [VkPhysicalDeviceImageFormatInfo2](../chapters/capabilities.html#VkPhysicalDeviceImageFormatInfo2):

* 
[VkPhysicalDeviceExternalImageFormatInfo](../chapters/capabilities.html#VkPhysicalDeviceExternalImageFormatInfo)

Extending [VkPhysicalDeviceProperties2](../chapters/devsandqueues.html#VkPhysicalDeviceProperties2):

* 
[VkPhysicalDeviceIDProperties](../chapters/devsandqueues.html#VkPhysicalDeviceIDProperties)

* 
[VkPhysicalDeviceMaintenance3Properties](../chapters/limits.html#VkPhysicalDeviceMaintenance3Properties)

* 
[VkPhysicalDeviceMultiviewProperties](../chapters/limits.html#VkPhysicalDeviceMultiviewProperties)

* 
[VkPhysicalDevicePointClippingProperties](../chapters/limits.html#VkPhysicalDevicePointClippingProperties)

* 
[VkPhysicalDeviceProtectedMemoryProperties](../chapters/limits.html#VkPhysicalDeviceProtectedMemoryProperties)

* 
[VkPhysicalDeviceSubgroupProperties](../chapters/limits.html#VkPhysicalDeviceSubgroupProperties)

Extending [VkPipelineTessellationStateCreateInfo](../chapters/tessellation.html#VkPipelineTessellationStateCreateInfo):

* 
[VkPipelineTessellationDomainOriginStateCreateInfo](../chapters/tessellation.html#VkPipelineTessellationDomainOriginStateCreateInfo)

Extending [VkRenderPassBeginInfo](../chapters/renderpass.html#VkRenderPassBeginInfo), [VkRenderingInfo](../chapters/renderpass.html#VkRenderingInfo):

* 
[VkDeviceGroupRenderPassBeginInfo](../chapters/renderpass.html#VkDeviceGroupRenderPassBeginInfo)

Extending [VkRenderPassCreateInfo](../chapters/renderpass.html#VkRenderPassCreateInfo):

* 
[VkRenderPassInputAttachmentAspectCreateInfo](../chapters/renderpass.html#VkRenderPassInputAttachmentAspectCreateInfo)

* 
[VkRenderPassMultiviewCreateInfo](../chapters/renderpass.html#VkRenderPassMultiviewCreateInfo)

Extending [VkSamplerCreateInfo](../chapters/samplers.html#VkSamplerCreateInfo), [VkImageViewCreateInfo](../chapters/resources.html#VkImageViewCreateInfo):

* 
[VkSamplerYcbcrConversionInfo](../chapters/samplers.html#VkSamplerYcbcrConversionInfo)

Extending [VkSemaphoreCreateInfo](../chapters/synchronization.html#VkSemaphoreCreateInfo):

* 
[VkExportSemaphoreCreateInfo](../chapters/synchronization.html#VkExportSemaphoreCreateInfo)

Extending [VkSubmitInfo](../chapters/cmdbuffers.html#VkSubmitInfo):

* 
[VkDeviceGroupSubmitInfo](../chapters/cmdbuffers.html#VkDeviceGroupSubmitInfo)

* 
[VkProtectedSubmitInfo](../chapters/cmdbuffers.html#VkProtectedSubmitInfo)

* 
[VkChromaLocation](../chapters/samplers.html#VkChromaLocation)

* 
[VkDescriptorUpdateTemplateType](../chapters/descriptorsets.html#VkDescriptorUpdateTemplateType)

* 
[VkDeviceQueueCreateFlagBits](../chapters/devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
[VkExternalFenceFeatureFlagBits](../chapters/capabilities.html#VkExternalFenceFeatureFlagBits)

* 
[VkExternalFenceHandleTypeFlagBits](../chapters/capabilities.html#VkExternalFenceHandleTypeFlagBits)

* 
[VkExternalMemoryFeatureFlagBits](../chapters/capabilities.html#VkExternalMemoryFeatureFlagBits)

* 
[VkExternalMemoryHandleTypeFlagBits](../chapters/capabilities.html#VkExternalMemoryHandleTypeFlagBits)

* 
[VkExternalSemaphoreFeatureFlagBits](../chapters/capabilities.html#VkExternalSemaphoreFeatureFlagBits)

* 
[VkExternalSemaphoreHandleTypeFlagBits](../chapters/capabilities.html#VkExternalSemaphoreHandleTypeFlagBits)

* 
[VkFenceImportFlagBits](../chapters/synchronization.html#VkFenceImportFlagBits)

* 
[VkMemoryAllocateFlagBits](../chapters/memory.html#VkMemoryAllocateFlagBits)

* 
[VkPeerMemoryFeatureFlagBits](../chapters/memory.html#VkPeerMemoryFeatureFlagBits)

* 
[VkPointClippingBehavior](../chapters/vertexpostproc.html#VkPointClippingBehavior)

* 
[VkSamplerYcbcrModelConversion](../chapters/samplers.html#VkSamplerYcbcrModelConversion)

* 
[VkSamplerYcbcrRange](../chapters/samplers.html#VkSamplerYcbcrRange)

* 
[VkSemaphoreImportFlagBits](../chapters/synchronization.html#VkSemaphoreImportFlagBits)

* 
[VkSubgroupFeatureFlagBits](../chapters/limits.html#VkSubgroupFeatureFlagBits)

* 
[VkTessellationDomainOrigin](../chapters/tessellation.html#VkTessellationDomainOrigin)

* 
[VkCommandPoolTrimFlags](../chapters/cmdbuffers.html#VkCommandPoolTrimFlags)

* 
[VkDescriptorUpdateTemplateCreateFlags](../chapters/descriptorsets.html#VkDescriptorUpdateTemplateCreateFlags)

* 
[VkExternalFenceFeatureFlags](../chapters/capabilities.html#VkExternalFenceFeatureFlags)

* 
[VkExternalFenceHandleTypeFlags](../chapters/capabilities.html#VkExternalFenceHandleTypeFlags)

* 
[VkExternalMemoryFeatureFlags](../chapters/capabilities.html#VkExternalMemoryFeatureFlags)

* 
[VkExternalMemoryHandleTypeFlags](../chapters/capabilities.html#VkExternalMemoryHandleTypeFlags)

* 
[VkExternalSemaphoreFeatureFlags](../chapters/capabilities.html#VkExternalSemaphoreFeatureFlags)

* 
[VkExternalSemaphoreHandleTypeFlags](../chapters/capabilities.html#VkExternalSemaphoreHandleTypeFlags)

* 
[VkFenceImportFlags](../chapters/synchronization.html#VkFenceImportFlags)

* 
[VkMemoryAllocateFlags](../chapters/memory.html#VkMemoryAllocateFlags)

* 
[VkPeerMemoryFeatureFlags](../chapters/memory.html#VkPeerMemoryFeatureFlags)

* 
[VkSemaphoreImportFlags](../chapters/synchronization.html#VkSemaphoreImportFlags)

* 
[VkSubgroupFeatureFlags](../chapters/limits.html#VkSubgroupFeatureFlags)

* 
[VK_LUID_SIZE](../chapters/devsandqueues.html#VK_LUID_SIZE)

* 
[VK_MAX_DEVICE_GROUP_SIZE](../chapters/devsandqueues.html#VK_MAX_DEVICE_GROUP_SIZE)

* 
[VK_QUEUE_FAMILY_EXTERNAL](../chapters/synchronization.html#VK_QUEUE_FAMILY_EXTERNAL)

* 
Extending [VkBufferCreateFlagBits](../chapters/resources.html#VkBufferCreateFlagBits):

[VK_BUFFER_CREATE_PROTECTED_BIT](../chapters/resources.html#VkBufferCreateFlagBits)

Extending [VkCommandPoolCreateFlagBits](../chapters/cmdbuffers.html#VkCommandPoolCreateFlagBits):

* 
[VK_COMMAND_POOL_CREATE_PROTECTED_BIT](../chapters/cmdbuffers.html#VkCommandPoolCreateFlagBits)

Extending [VkDependencyFlagBits](../chapters/synchronization.html#VkDependencyFlagBits):

* 
[VK_DEPENDENCY_DEVICE_GROUP_BIT](../chapters/synchronization.html#VkDependencyFlagBits)

* 
[VK_DEPENDENCY_VIEW_LOCAL_BIT](../chapters/synchronization.html#VkDependencyFlagBits)

Extending [VkDeviceQueueCreateFlagBits](../chapters/devsandqueues.html#VkDeviceQueueCreateFlagBits):

* 
[VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](../chapters/devsandqueues.html#VkDeviceQueueCreateFlagBits)

Extending [VkFormat](../chapters/formats.html#VkFormat):

* 
[VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_B16G16R16G16_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_B8G8R8G8_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G16B16G16R16_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G16_B16R16_2PLANE_420_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G16_B16R16_2PLANE_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G8B8G8R8_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G8_B8R8_2PLANE_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_R10X6G10X6_UNORM_2PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_R10X6_UNORM_PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_R12X4G12X4_UNORM_2PACK16](../chapters/formats.html#VkFormat)

* 
[VK_FORMAT_R12X4_UNORM_PACK16](../chapters/formats.html#VkFormat)

Extending [VkFormatFeatureFlagBits](../chapters/formats.html#VkFormatFeatureFlagBits):

* 
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_DISJOINT_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](../chapters/formats.html#VkFormatFeatureFlagBits)

Extending [VkImageAspectFlagBits](../chapters/resources.html#VkImageAspectFlagBits):

* 
[VK_IMAGE_ASPECT_PLANE_0_BIT](../chapters/resources.html#VkImageAspectFlagBits)

* 
[VK_IMAGE_ASPECT_PLANE_1_BIT](../chapters/resources.html#VkImageAspectFlagBits)

* 
[VK_IMAGE_ASPECT_PLANE_2_BIT](../chapters/resources.html#VkImageAspectFlagBits)

Extending [VkImageCreateFlagBits](../chapters/resources.html#VkImageCreateFlagBits):

* 
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](../chapters/resources.html#VkImageCreateFlagBits)

* 
[VK_IMAGE_CREATE_ALIAS_BIT](../chapters/resources.html#VkImageCreateFlagBits)

* 
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](../chapters/resources.html#VkImageCreateFlagBits)

* 
[VK_IMAGE_CREATE_DISJOINT_BIT](../chapters/resources.html#VkImageCreateFlagBits)

* 
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](../chapters/resources.html#VkImageCreateFlagBits)

* 
[VK_IMAGE_CREATE_PROTECTED_BIT](../chapters/resources.html#VkImageCreateFlagBits)

* 
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](../chapters/resources.html#VkImageCreateFlagBits)

Extending [VkImageLayout](../chapters/resources.html#VkImageLayout):

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](../chapters/resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](../chapters/resources.html#VkImageLayout)

Extending [VkMemoryHeapFlagBits](../chapters/memory.html#VkMemoryHeapFlagBits):

* 
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](../chapters/memory.html#VkMemoryHeapFlagBits)

Extending [VkMemoryPropertyFlagBits](../chapters/memory.html#VkMemoryPropertyFlagBits):

* 
[VK_MEMORY_PROPERTY_PROTECTED_BIT](../chapters/memory.html#VkMemoryPropertyFlagBits)

Extending [VkObjectType](../chapters/debugging.html#VkObjectType):

* 
[VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE](../chapters/debugging.html#VkObjectType)

* 
[VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION](../chapters/debugging.html#VkObjectType)

Extending [VkPipelineCreateFlagBits](../chapters/pipelines.html#VkPipelineCreateFlagBits):

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE](../chapters/pipelines.html#VkPipelineCreateFlagBits)

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](../chapters/pipelines.html#VkPipelineCreateFlagBits)

* 
[VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT](../chapters/pipelines.html#VkPipelineCreateFlagBits)

Extending [VkQueueFlagBits](../chapters/devsandqueues.html#VkQueueFlagBits):

* 
[VK_QUEUE_PROTECTED_BIT](../chapters/devsandqueues.html#VkQueueFlagBits)

Extending [VkResult](../chapters/fundamentals.html#VkResult):

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](../chapters/fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_POOL_MEMORY](../chapters/fundamentals.html#VkResult)

Extending [VkStructureType](../chapters/fundamentals.html#VkStructureType):

* 
[VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_RENDER_PASS_BEGIN_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_SUBMIT_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_DEVICE_QUEUE_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_FENCE_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FENCE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_POINT_CLIPPING_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETERS_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETER_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTER_FEATURES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_DOMAIN_ORIGIN_STATE_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_PROTECTED_SUBMIT_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_MULTIVIEW_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2](../chapters/fundamentals.html#VkStructureType)

* 
[VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2](../chapters/fundamentals.html#VkStructureType)

Vulkan Version 1.0 was the initial release of the Vulkan API.

* 
[VK_API_VERSION](boilerplate.html#VK_API_VERSION)

* 
[VK_API_VERSION_1_0](../chapters/extensions.html#VK_API_VERSION_1_0)

* 
[VK_API_VERSION_MAJOR](../chapters/extensions.html#VK_API_VERSION_MAJOR)

* 
[VK_API_VERSION_MINOR](../chapters/extensions.html#VK_API_VERSION_MINOR)

* 
[VK_API_VERSION_PATCH](../chapters/extensions.html#VK_API_VERSION_PATCH)

* 
[VK_API_VERSION_VARIANT](../chapters/extensions.html#VK_API_VERSION_VARIANT)

* 
[VK_DEFINE_HANDLE](boilerplate.html#VK_DEFINE_HANDLE)

* 
[VK_DEFINE_NON_DISPATCHABLE_HANDLE](boilerplate.html#VK_DEFINE_NON_DISPATCHABLE_HANDLE)

* 
[VK_HEADER_VERSION](boilerplate.html#VK_HEADER_VERSION)

* 
[VK_HEADER_VERSION_COMPLETE](boilerplate.html#VK_HEADER_VERSION_COMPLETE)

* 
[VK_MAKE_API_VERSION](../chapters/extensions.html#VK_MAKE_API_VERSION)

* 
[VK_MAKE_VERSION](../chapters/extensions.html#VK_MAKE_VERSION)

* 
[VK_NULL_HANDLE](boilerplate.html#VK_NULL_HANDLE)

* 
[VK_USE_64_BIT_PTR_DEFINES](boilerplate.html#VK_USE_64_BIT_PTR_DEFINES)

* 
[VK_VERSION_MAJOR](../chapters/extensions.html#VK_VERSION_MAJOR)

* 
[VK_VERSION_MINOR](../chapters/extensions.html#VK_VERSION_MINOR)

* 
[VK_VERSION_PATCH](../chapters/extensions.html#VK_VERSION_PATCH)

* 
`VkBool32`

* 
`VkDeviceAddress`

* 
`VkDeviceSize`

* 
`VkFlags`

* 
`VkSampleMask`

* 
[VkBuffer](../chapters/resources.html#VkBuffer)

* 
[VkBufferView](../chapters/resources.html#VkBufferView)

* 
[VkCommandBuffer](../chapters/cmdbuffers.html#VkCommandBuffer)

* 
[VkCommandPool](../chapters/cmdbuffers.html#VkCommandPool)

* 
[VkDescriptorPool](../chapters/descriptorsets.html#VkDescriptorPool)

* 
[VkDescriptorSet](../chapters/descriptorsets.html#VkDescriptorSet)

* 
[VkDescriptorSetLayout](../chapters/descriptorsets.html#VkDescriptorSetLayout)

* 
[VkDevice](../chapters/devsandqueues.html#VkDevice)

* 
[VkDeviceMemory](../chapters/memory.html#VkDeviceMemory)

* 
[VkEvent](../chapters/synchronization.html#VkEvent)

* 
[VkFence](../chapters/synchronization.html#VkFence)

* 
[VkFramebuffer](../chapters/renderpass.html#VkFramebuffer)

* 
[VkImage](../chapters/resources.html#VkImage)

* 
[VkImageView](../chapters/resources.html#VkImageView)

* 
[VkInstance](../chapters/initialization.html#VkInstance)

* 
[VkPhysicalDevice](../chapters/devsandqueues.html#VkPhysicalDevice)

* 
[VkPipeline](../chapters/pipelines.html#VkPipeline)

* 
[VkPipelineCache](../chapters/pipelines.html#VkPipelineCache)

* 
[VkPipelineLayout](../chapters/descriptorsets.html#VkPipelineLayout)

* 
[VkQueryPool](../chapters/queries.html#VkQueryPool)

* 
[VkQueue](../chapters/devsandqueues.html#VkQueue)

* 
[VkRenderPass](../chapters/renderpass.html#VkRenderPass)

* 
[VkSampler](../chapters/samplers.html#VkSampler)

* 
[VkSemaphore](../chapters/synchronization.html#VkSemaphore)

* 
[VkShaderModule](../chapters/shaders.html#VkShaderModule)

* 
[vkAllocateCommandBuffers](../chapters/cmdbuffers.html#vkAllocateCommandBuffers)

* 
[vkAllocateDescriptorSets](../chapters/descriptorsets.html#vkAllocateDescriptorSets)

* 
[vkAllocateMemory](../chapters/memory.html#vkAllocateMemory)

* 
[vkBeginCommandBuffer](../chapters/cmdbuffers.html#vkBeginCommandBuffer)

* 
[vkBindBufferMemory](../chapters/resources.html#vkBindBufferMemory)

* 
[vkBindImageMemory](../chapters/resources.html#vkBindImageMemory)

* 
[vkCmdBeginQuery](../chapters/queries.html#vkCmdBeginQuery)

* 
[vkCmdBeginRenderPass](../chapters/renderpass.html#vkCmdBeginRenderPass)

* 
[vkCmdBindDescriptorSets](../chapters/descriptorsets.html#vkCmdBindDescriptorSets)

* 
[vkCmdBindIndexBuffer](../chapters/drawing.html#vkCmdBindIndexBuffer)

* 
[vkCmdBindPipeline](../chapters/pipelines.html#vkCmdBindPipeline)

* 
[vkCmdBindVertexBuffers](../chapters/fxvertex.html#vkCmdBindVertexBuffers)

* 
[vkCmdBlitImage](../chapters/copies.html#vkCmdBlitImage)

* 
[vkCmdClearAttachments](../chapters/clears.html#vkCmdClearAttachments)

* 
[vkCmdClearColorImage](../chapters/clears.html#vkCmdClearColorImage)

* 
[vkCmdClearDepthStencilImage](../chapters/clears.html#vkCmdClearDepthStencilImage)

* 
[vkCmdCopyBuffer](../chapters/copies.html#vkCmdCopyBuffer)

* 
[vkCmdCopyBufferToImage](../chapters/copies.html#vkCmdCopyBufferToImage)

* 
[vkCmdCopyImage](../chapters/copies.html#vkCmdCopyImage)

* 
[vkCmdCopyImageToBuffer](../chapters/copies.html#vkCmdCopyImageToBuffer)

* 
[vkCmdCopyQueryPoolResults](../chapters/queries.html#vkCmdCopyQueryPoolResults)

* 
[vkCmdDispatch](../chapters/dispatch.html#vkCmdDispatch)

* 
[vkCmdDispatchIndirect](../chapters/dispatch.html#vkCmdDispatchIndirect)

* 
[vkCmdDraw](../chapters/drawing.html#vkCmdDraw)

* 
[vkCmdDrawIndexed](../chapters/drawing.html#vkCmdDrawIndexed)

* 
[vkCmdDrawIndexedIndirect](../chapters/drawing.html#vkCmdDrawIndexedIndirect)

* 
[vkCmdDrawIndirect](../chapters/drawing.html#vkCmdDrawIndirect)

* 
[vkCmdEndQuery](../chapters/queries.html#vkCmdEndQuery)

* 
[vkCmdEndRenderPass](../chapters/renderpass.html#vkCmdEndRenderPass)

* 
[vkCmdExecuteCommands](../chapters/cmdbuffers.html#vkCmdExecuteCommands)

* 
[vkCmdFillBuffer](../chapters/clears.html#vkCmdFillBuffer)

* 
[vkCmdNextSubpass](../chapters/renderpass.html#vkCmdNextSubpass)

* 
[vkCmdPipelineBarrier](../chapters/synchronization.html#vkCmdPipelineBarrier)

* 
[vkCmdPushConstants](../chapters/descriptorsets.html#vkCmdPushConstants)

* 
[vkCmdResetEvent](../chapters/synchronization.html#vkCmdResetEvent)

* 
[vkCmdResetQueryPool](../chapters/queries.html#vkCmdResetQueryPool)

* 
[vkCmdResolveImage](../chapters/copies.html#vkCmdResolveImage)

* 
[vkCmdSetBlendConstants](../chapters/framebuffer.html#vkCmdSetBlendConstants)

* 
[vkCmdSetDepthBias](../chapters/primsrast.html#vkCmdSetDepthBias)

* 
[vkCmdSetDepthBounds](../chapters/fragops.html#vkCmdSetDepthBounds)

* 
[vkCmdSetEvent](../chapters/synchronization.html#vkCmdSetEvent)

* 
[vkCmdSetLineWidth](../chapters/primsrast.html#vkCmdSetLineWidth)

* 
[vkCmdSetScissor](../chapters/fragops.html#vkCmdSetScissor)

* 
[vkCmdSetStencilCompareMask](../chapters/fragops.html#vkCmdSetStencilCompareMask)

* 
[vkCmdSetStencilReference](../chapters/fragops.html#vkCmdSetStencilReference)

* 
[vkCmdSetStencilWriteMask](../chapters/fragops.html#vkCmdSetStencilWriteMask)

* 
[vkCmdSetViewport](../chapters/vertexpostproc.html#vkCmdSetViewport)

* 
[vkCmdUpdateBuffer](../chapters/clears.html#vkCmdUpdateBuffer)

* 
[vkCmdWaitEvents](../chapters/synchronization.html#vkCmdWaitEvents)

* 
[vkCmdWriteTimestamp](../chapters/queries.html#vkCmdWriteTimestamp)

* 
[vkCreateBuffer](../chapters/resources.html#vkCreateBuffer)

* 
[vkCreateBufferView](../chapters/resources.html#vkCreateBufferView)

* 
[vkCreateCommandPool](../chapters/cmdbuffers.html#vkCreateCommandPool)

* 
[vkCreateComputePipelines](../chapters/pipelines.html#vkCreateComputePipelines)

* 
[vkCreateDescriptorPool](../chapters/descriptorsets.html#vkCreateDescriptorPool)

* 
[vkCreateDescriptorSetLayout](../chapters/descriptorsets.html#vkCreateDescriptorSetLayout)

* 
[vkCreateDevice](../chapters/devsandqueues.html#vkCreateDevice)

* 
[vkCreateEvent](../chapters/synchronization.html#vkCreateEvent)

* 
[vkCreateFence](../chapters/synchronization.html#vkCreateFence)

* 
[vkCreateFramebuffer](../chapters/renderpass.html#vkCreateFramebuffer)

* 
[vkCreateGraphicsPipelines](../chapters/pipelines.html#vkCreateGraphicsPipelines)

* 
[vkCreateImage](../chapters/resources.html#vkCreateImage)

* 
[vkCreateImageView](../chapters/resources.html#vkCreateImageView)

* 
[vkCreateInstance](../chapters/initialization.html#vkCreateInstance)

* 
[vkCreatePipelineCache](../chapters/pipelines.html#vkCreatePipelineCache)

* 
[vkCreatePipelineLayout](../chapters/descriptorsets.html#vkCreatePipelineLayout)

* 
[vkCreateQueryPool](../chapters/queries.html#vkCreateQueryPool)

* 
[vkCreateRenderPass](../chapters/renderpass.html#vkCreateRenderPass)

* 
[vkCreateSampler](../chapters/samplers.html#vkCreateSampler)

* 
[vkCreateSemaphore](../chapters/synchronization.html#vkCreateSemaphore)

* 
[vkCreateShaderModule](../chapters/shaders.html#vkCreateShaderModule)

* 
[vkDestroyBuffer](../chapters/resources.html#vkDestroyBuffer)

* 
[vkDestroyBufferView](../chapters/resources.html#vkDestroyBufferView)

* 
[vkDestroyCommandPool](../chapters/cmdbuffers.html#vkDestroyCommandPool)

* 
[vkDestroyDescriptorPool](../chapters/descriptorsets.html#vkDestroyDescriptorPool)

* 
[vkDestroyDescriptorSetLayout](../chapters/descriptorsets.html#vkDestroyDescriptorSetLayout)

* 
[vkDestroyDevice](../chapters/devsandqueues.html#vkDestroyDevice)

* 
[vkDestroyEvent](../chapters/synchronization.html#vkDestroyEvent)

* 
[vkDestroyFence](../chapters/synchronization.html#vkDestroyFence)

* 
[vkDestroyFramebuffer](../chapters/renderpass.html#vkDestroyFramebuffer)

* 
[vkDestroyImage](../chapters/resources.html#vkDestroyImage)

* 
[vkDestroyImageView](../chapters/resources.html#vkDestroyImageView)

* 
[vkDestroyInstance](../chapters/initialization.html#vkDestroyInstance)

* 
[vkDestroyPipeline](../chapters/pipelines.html#vkDestroyPipeline)

* 
[vkDestroyPipelineCache](../chapters/pipelines.html#vkDestroyPipelineCache)

* 
[vkDestroyPipelineLayout](../chapters/descriptorsets.html#vkDestroyPipelineLayout)

* 
[vkDestroyQueryPool](../chapters/queries.html#vkDestroyQueryPool)

* 
[vkDestroyRenderPass](../chapters/renderpass.html#vkDestroyRenderPass)

* 
[vkDestroySampler](../chapters/samplers.html#vkDestroySampler)

* 
[vkDestroySemaphore](../chapters/synchronization.html#vkDestroySemaphore)

* 
[vkDestroyShaderModule](../chapters/shaders.html#vkDestroyShaderModule)

* 
[vkDeviceWaitIdle](../chapters/synchronization.html#vkDeviceWaitIdle)

* 
[vkEndCommandBuffer](../chapters/cmdbuffers.html#vkEndCommandBuffer)

* 
[vkEnumerateDeviceExtensionProperties](../chapters/extensions.html#vkEnumerateDeviceExtensionProperties)

* 
[vkEnumerateDeviceLayerProperties](../chapters/extensions.html#vkEnumerateDeviceLayerProperties)

* 
[vkEnumerateInstanceExtensionProperties](../chapters/extensions.html#vkEnumerateInstanceExtensionProperties)

* 
[vkEnumerateInstanceLayerProperties](../chapters/extensions.html#vkEnumerateInstanceLayerProperties)

* 
[vkEnumeratePhysicalDevices](../chapters/devsandqueues.html#vkEnumeratePhysicalDevices)

* 
[vkFlushMappedMemoryRanges](../chapters/memory.html#vkFlushMappedMemoryRanges)

* 
[vkFreeCommandBuffers](../chapters/cmdbuffers.html#vkFreeCommandBuffers)

* 
[vkFreeDescriptorSets](../chapters/descriptorsets.html#vkFreeDescriptorSets)

* 
[vkFreeMemory](../chapters/memory.html#vkFreeMemory)

* 
[vkGetBufferMemoryRequirements](../chapters/resources.html#vkGetBufferMemoryRequirements)

* 
[vkGetDeviceMemoryCommitment](../chapters/memory.html#vkGetDeviceMemoryCommitment)

* 
[vkGetDeviceProcAddr](../chapters/initialization.html#vkGetDeviceProcAddr)

* 
[vkGetDeviceQueue](../chapters/devsandqueues.html#vkGetDeviceQueue)

* 
[vkGetEventStatus](../chapters/synchronization.html#vkGetEventStatus)

* 
[vkGetFenceStatus](../chapters/synchronization.html#vkGetFenceStatus)

* 
[vkGetImageMemoryRequirements](../chapters/resources.html#vkGetImageMemoryRequirements)

* 
[vkGetImageSparseMemoryRequirements](../chapters/sparsemem.html#vkGetImageSparseMemoryRequirements)

* 
[vkGetImageSubresourceLayout](../chapters/resources.html#vkGetImageSubresourceLayout)

* 
[vkGetInstanceProcAddr](../chapters/initialization.html#vkGetInstanceProcAddr)

* 
[vkGetPhysicalDeviceFeatures](../chapters/features.html#vkGetPhysicalDeviceFeatures)

* 
[vkGetPhysicalDeviceFormatProperties](../chapters/formats.html#vkGetPhysicalDeviceFormatProperties)

* 
[vkGetPhysicalDeviceImageFormatProperties](../chapters/capabilities.html#vkGetPhysicalDeviceImageFormatProperties)

* 
[vkGetPhysicalDeviceMemoryProperties](../chapters/memory.html#vkGetPhysicalDeviceMemoryProperties)

* 
[vkGetPhysicalDeviceProperties](../chapters/devsandqueues.html#vkGetPhysicalDeviceProperties)

* 
[vkGetPhysicalDeviceQueueFamilyProperties](../chapters/devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties)

* 
[vkGetPhysicalDeviceSparseImageFormatProperties](../chapters/sparsemem.html#vkGetPhysicalDeviceSparseImageFormatProperties)

* 
[vkGetPipelineCacheData](../chapters/pipelines.html#vkGetPipelineCacheData)

* 
[vkGetQueryPoolResults](../chapters/queries.html#vkGetQueryPoolResults)

* 
[vkGetRenderAreaGranularity](../chapters/renderpass.html#vkGetRenderAreaGranularity)

* 
[vkInvalidateMappedMemoryRanges](../chapters/memory.html#vkInvalidateMappedMemoryRanges)

* 
[vkMapMemory](../chapters/memory.html#vkMapMemory)

* 
[vkMergePipelineCaches](../chapters/pipelines.html#vkMergePipelineCaches)

* 
[vkQueueBindSparse](../chapters/sparsemem.html#vkQueueBindSparse)

* 
[vkQueueSubmit](../chapters/cmdbuffers.html#vkQueueSubmit)

* 
[vkQueueWaitIdle](../chapters/synchronization.html#vkQueueWaitIdle)

* 
[vkResetCommandBuffer](../chapters/cmdbuffers.html#vkResetCommandBuffer)

* 
[vkResetCommandPool](../chapters/cmdbuffers.html#vkResetCommandPool)

* 
[vkResetDescriptorPool](../chapters/descriptorsets.html#vkResetDescriptorPool)

* 
[vkResetEvent](../chapters/synchronization.html#vkResetEvent)

* 
[vkResetFences](../chapters/synchronization.html#vkResetFences)

* 
[vkSetEvent](../chapters/synchronization.html#vkSetEvent)

* 
[vkUnmapMemory](../chapters/memory.html#vkUnmapMemory)

* 
[vkUpdateDescriptorSets](../chapters/descriptorsets.html#vkUpdateDescriptorSets)

* 
[vkWaitForFences](../chapters/synchronization.html#vkWaitForFences)

* 
[VkAllocationCallbacks](../chapters/memory.html#VkAllocationCallbacks)

* 
[VkApplicationInfo](../chapters/initialization.html#VkApplicationInfo)

* 
[VkAttachmentDescription](../chapters/renderpass.html#VkAttachmentDescription)

* 
[VkAttachmentReference](../chapters/renderpass.html#VkAttachmentReference)

* 
[VkBaseInStructure](../chapters/fundamentals.html#VkBaseInStructure)

* 
[VkBaseOutStructure](../chapters/fundamentals.html#VkBaseOutStructure)

* 
[VkBindSparseInfo](../chapters/sparsemem.html#VkBindSparseInfo)

* 
[VkBufferCopy](../chapters/copies.html#VkBufferCopy)

* 
[VkBufferCreateInfo](../chapters/resources.html#VkBufferCreateInfo)

* 
[VkBufferImageCopy](../chapters/copies.html#VkBufferImageCopy)

* 
[VkBufferMemoryBarrier](../chapters/synchronization.html#VkBufferMemoryBarrier)

* 
[VkBufferViewCreateInfo](../chapters/resources.html#VkBufferViewCreateInfo)

* 
[VkClearAttachment](../chapters/clears.html#VkClearAttachment)

* 
[VkClearDepthStencilValue](../chapters/clears.html#VkClearDepthStencilValue)

* 
[VkClearRect](../chapters/clears.html#VkClearRect)

* 
[VkCommandBufferAllocateInfo](../chapters/cmdbuffers.html#VkCommandBufferAllocateInfo)

* 
[VkCommandBufferBeginInfo](../chapters/cmdbuffers.html#VkCommandBufferBeginInfo)

* 
[VkCommandBufferInheritanceInfo](../chapters/cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkCommandPoolCreateInfo](../chapters/cmdbuffers.html#VkCommandPoolCreateInfo)

* 
[VkComponentMapping](../chapters/resources.html#VkComponentMapping)

* 
[VkComputePipelineCreateInfo](../chapters/pipelines.html#VkComputePipelineCreateInfo)

* 
[VkCopyDescriptorSet](../chapters/descriptorsets.html#VkCopyDescriptorSet)

* 
[VkDescriptorBufferInfo](../chapters/descriptorsets.html#VkDescriptorBufferInfo)

* 
[VkDescriptorImageInfo](../chapters/descriptorsets.html#VkDescriptorImageInfo)

* 
[VkDescriptorPoolCreateInfo](../chapters/descriptorsets.html#VkDescriptorPoolCreateInfo)

* 
[VkDescriptorPoolSize](../chapters/descriptorsets.html#VkDescriptorPoolSize)

* 
[VkDescriptorSetAllocateInfo](../chapters/descriptorsets.html#VkDescriptorSetAllocateInfo)

* 
[VkDescriptorSetLayoutBinding](../chapters/descriptorsets.html#VkDescriptorSetLayoutBinding)

* 
[VkDescriptorSetLayoutCreateInfo](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateInfo)

* 
[VkDeviceCreateInfo](../chapters/devsandqueues.html#VkDeviceCreateInfo)

* 
[VkDeviceQueueCreateInfo](../chapters/devsandqueues.html#VkDeviceQueueCreateInfo)

* 
[VkDispatchIndirectCommand](../chapters/dispatch.html#VkDispatchIndirectCommand)

* 
[VkDrawIndexedIndirectCommand](../chapters/drawing.html#VkDrawIndexedIndirectCommand)

* 
[VkDrawIndirectCommand](../chapters/drawing.html#VkDrawIndirectCommand)

* 
[VkEventCreateInfo](../chapters/synchronization.html#VkEventCreateInfo)

* 
[VkExtensionProperties](../chapters/extensions.html#VkExtensionProperties)

* 
[VkExtent2D](../chapters/fundamentals.html#VkExtent2D)

* 
[VkExtent3D](../chapters/fundamentals.html#VkExtent3D)

* 
[VkFenceCreateInfo](../chapters/synchronization.html#VkFenceCreateInfo)

* 
[VkFormatProperties](../chapters/formats.html#VkFormatProperties)

* 
[VkFramebufferCreateInfo](../chapters/renderpass.html#VkFramebufferCreateInfo)

* 
[VkGraphicsPipelineCreateInfo](../chapters/pipelines.html#VkGraphicsPipelineCreateInfo)

* 
[VkImageBlit](../chapters/copies.html#VkImageBlit)

* 
[VkImageCopy](../chapters/copies.html#VkImageCopy)

* 
[VkImageCreateInfo](../chapters/resources.html#VkImageCreateInfo)

* 
[VkImageFormatProperties](../chapters/capabilities.html#VkImageFormatProperties)

* 
[VkImageMemoryBarrier](../chapters/synchronization.html#VkImageMemoryBarrier)

* 
[VkImageResolve](../chapters/copies.html#VkImageResolve)

* 
[VkImageSubresource](../chapters/resources.html#VkImageSubresource)

* 
[VkImageSubresourceLayers](../chapters/copies.html#VkImageSubresourceLayers)

* 
[VkImageSubresourceRange](../chapters/resources.html#VkImageSubresourceRange)

* 
[VkImageViewCreateInfo](../chapters/resources.html#VkImageViewCreateInfo)

* 
[VkInstanceCreateInfo](../chapters/initialization.html#VkInstanceCreateInfo)

* 
[VkLayerProperties](../chapters/extensions.html#VkLayerProperties)

* 
[VkMappedMemoryRange](../chapters/memory.html#VkMappedMemoryRange)

* 
[VkMemoryAllocateInfo](../chapters/memory.html#VkMemoryAllocateInfo)

* 
[VkMemoryBarrier](../chapters/synchronization.html#VkMemoryBarrier)

* 
[VkMemoryHeap](../chapters/memory.html#VkMemoryHeap)

* 
[VkMemoryRequirements](../chapters/resources.html#VkMemoryRequirements)

* 
[VkMemoryType](../chapters/memory.html#VkMemoryType)

* 
[VkOffset2D](../chapters/fundamentals.html#VkOffset2D)

* 
[VkOffset3D](../chapters/fundamentals.html#VkOffset3D)

* 
[VkPhysicalDeviceFeatures](../chapters/features.html#VkPhysicalDeviceFeatures)

* 
[VkPhysicalDeviceLimits](../chapters/limits.html#VkPhysicalDeviceLimits)

* 
[VkPhysicalDeviceMemoryProperties](../chapters/memory.html#VkPhysicalDeviceMemoryProperties)

* 
[VkPhysicalDeviceProperties](../chapters/devsandqueues.html#VkPhysicalDeviceProperties)

* 
[VkPhysicalDeviceSparseProperties](../chapters/sparsemem.html#VkPhysicalDeviceSparseProperties)

* 
[VkPipelineCacheCreateInfo](../chapters/pipelines.html#VkPipelineCacheCreateInfo)

* 
[VkPipelineCacheHeaderVersionOne](../chapters/pipelines.html#VkPipelineCacheHeaderVersionOne)

* 
[VkPipelineColorBlendAttachmentState](../chapters/framebuffer.html#VkPipelineColorBlendAttachmentState)

* 
[VkPipelineColorBlendStateCreateInfo](../chapters/framebuffer.html#VkPipelineColorBlendStateCreateInfo)

* 
[VkPipelineDepthStencilStateCreateInfo](../chapters/fragops.html#VkPipelineDepthStencilStateCreateInfo)

* 
[VkPipelineDynamicStateCreateInfo](../chapters/pipelines.html#VkPipelineDynamicStateCreateInfo)

* 
[VkPipelineInputAssemblyStateCreateInfo](../chapters/drawing.html#VkPipelineInputAssemblyStateCreateInfo)

* 
[VkPipelineMultisampleStateCreateInfo](../chapters/primsrast.html#VkPipelineMultisampleStateCreateInfo)

* 
[VkPipelineRasterizationStateCreateInfo](../chapters/primsrast.html#VkPipelineRasterizationStateCreateInfo)

* 
[VkPipelineShaderStageCreateInfo](../chapters/pipelines.html#VkPipelineShaderStageCreateInfo)

* 
[VkPipelineTessellationStateCreateInfo](../chapters/tessellation.html#VkPipelineTessellationStateCreateInfo)

* 
[VkPipelineVertexInputStateCreateInfo](../chapters/fxvertex.html#VkPipelineVertexInputStateCreateInfo)

* 
[VkPipelineViewportStateCreateInfo](../chapters/vertexpostproc.html#VkPipelineViewportStateCreateInfo)

* 
[VkPushConstantRange](../chapters/descriptorsets.html#VkPushConstantRange)

* 
[VkQueryPoolCreateInfo](../chapters/queries.html#VkQueryPoolCreateInfo)

* 
[VkQueueFamilyProperties](../chapters/devsandqueues.html#VkQueueFamilyProperties)

* 
[VkRect2D](../chapters/fundamentals.html#VkRect2D)

* 
[VkRenderPassBeginInfo](../chapters/renderpass.html#VkRenderPassBeginInfo)

* 
[VkRenderPassCreateInfo](../chapters/renderpass.html#VkRenderPassCreateInfo)

* 
[VkSamplerCreateInfo](../chapters/samplers.html#VkSamplerCreateInfo)

* 
[VkSemaphoreCreateInfo](../chapters/synchronization.html#VkSemaphoreCreateInfo)

* 
[VkSparseBufferMemoryBindInfo](../chapters/sparsemem.html#VkSparseBufferMemoryBindInfo)

* 
[VkSparseImageFormatProperties](../chapters/sparsemem.html#VkSparseImageFormatProperties)

* 
[VkSparseImageMemoryBind](../chapters/sparsemem.html#VkSparseImageMemoryBind)

* 
[VkSparseImageMemoryBindInfo](../chapters/sparsemem.html#VkSparseImageMemoryBindInfo)

* 
[VkSparseImageMemoryRequirements](../chapters/sparsemem.html#VkSparseImageMemoryRequirements)

* 
[VkSparseImageOpaqueMemoryBindInfo](../chapters/sparsemem.html#VkSparseImageOpaqueMemoryBindInfo)

* 
[VkSparseMemoryBind](../chapters/sparsemem.html#VkSparseMemoryBind)

* 
[VkSpecializationInfo](../chapters/pipelines.html#VkSpecializationInfo)

* 
[VkSpecializationMapEntry](../chapters/pipelines.html#VkSpecializationMapEntry)

* 
[VkStencilOpState](../chapters/fragops.html#VkStencilOpState)

* 
[VkSubmitInfo](../chapters/cmdbuffers.html#VkSubmitInfo)

* 
[VkSubpassDependency](../chapters/renderpass.html#VkSubpassDependency)

* 
[VkSubpassDescription](../chapters/renderpass.html#VkSubpassDescription)

* 
[VkSubresourceLayout](../chapters/resources.html#VkSubresourceLayout)

* 
[VkVertexInputAttributeDescription](../chapters/fxvertex.html#VkVertexInputAttributeDescription)

* 
[VkVertexInputBindingDescription](../chapters/fxvertex.html#VkVertexInputBindingDescription)

* 
[VkViewport](../chapters/vertexpostproc.html#VkViewport)

* 
[VkWriteDescriptorSet](../chapters/descriptorsets.html#VkWriteDescriptorSet)

* 
Extending [VkBindDescriptorSetsInfo](../chapters/descriptorsets.html#VkBindDescriptorSetsInfo), [VkPushConstantsInfo](../chapters/descriptorsets.html#VkPushConstantsInfo), [VkPushDescriptorSetInfo](../chapters/descriptorsets.html#VkPushDescriptorSetInfo), [VkPushDescriptorSetWithTemplateInfo](../chapters/descriptorsets.html#VkPushDescriptorSetWithTemplateInfo), [VkSetDescriptorBufferOffsetsInfoEXT](../chapters/descriptorsets.html#VkSetDescriptorBufferOffsetsInfoEXT), [VkBindDescriptorBufferEmbeddedSamplersInfoEXT](../chapters/descriptorsets.html#VkBindDescriptorBufferEmbeddedSamplersInfoEXT), [VkIndirectCommandsLayoutCreateInfoEXT](../chapters/device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoEXT):

[VkPipelineLayoutCreateInfo](../chapters/descriptorsets.html#VkPipelineLayoutCreateInfo)

Extending [VkPipelineShaderStageCreateInfo](../chapters/pipelines.html#VkPipelineShaderStageCreateInfo), [VkDataGraphPipelineCreateInfoARM](../chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineCreateInfoARM):

* 
[VkShaderModuleCreateInfo](../chapters/shaders.html#VkShaderModuleCreateInfo)

* 
[VkClearColorValue](../chapters/clears.html#VkClearColorValue)

* 
[VkClearValue](../chapters/clears.html#VkClearValue)

* 
[PFN_vkAllocationFunction](../chapters/memory.html#PFN_vkAllocationFunction)

* 
[PFN_vkFreeFunction](../chapters/memory.html#PFN_vkFreeFunction)

* 
[PFN_vkInternalAllocationNotification](../chapters/memory.html#PFN_vkInternalAllocationNotification)

* 
[PFN_vkInternalFreeNotification](../chapters/memory.html#PFN_vkInternalFreeNotification)

* 
[PFN_vkReallocationFunction](../chapters/memory.html#PFN_vkReallocationFunction)

* 
[PFN_vkVoidFunction](../chapters/initialization.html#PFN_vkVoidFunction)

* 
[VkAccessFlagBits](../chapters/synchronization.html#VkAccessFlagBits)

* 
[VkAttachmentDescriptionFlagBits](../chapters/renderpass.html#VkAttachmentDescriptionFlagBits)

* 
[VkAttachmentLoadOp](../chapters/renderpass.html#VkAttachmentLoadOp)

* 
[VkAttachmentStoreOp](../chapters/renderpass.html#VkAttachmentStoreOp)

* 
[VkBlendFactor](../chapters/framebuffer.html#VkBlendFactor)

* 
[VkBlendOp](../chapters/framebuffer.html#VkBlendOp)

* 
[VkBorderColor](../chapters/samplers.html#VkBorderColor)

* 
[VkBufferCreateFlagBits](../chapters/resources.html#VkBufferCreateFlagBits)

* 
[VkBufferUsageFlagBits](../chapters/resources.html#VkBufferUsageFlagBits)

* 
[VkColorComponentFlagBits](../chapters/framebuffer.html#VkColorComponentFlagBits)

* 
[VkCommandBufferLevel](../chapters/cmdbuffers.html#VkCommandBufferLevel)

* 
[VkCommandBufferResetFlagBits](../chapters/cmdbuffers.html#VkCommandBufferResetFlagBits)

* 
[VkCommandBufferUsageFlagBits](../chapters/cmdbuffers.html#VkCommandBufferUsageFlagBits)

* 
[VkCommandPoolCreateFlagBits](../chapters/cmdbuffers.html#VkCommandPoolCreateFlagBits)

* 
[VkCommandPoolResetFlagBits](../chapters/cmdbuffers.html#VkCommandPoolResetFlagBits)

* 
[VkCompareOp](../chapters/samplers.html#VkCompareOp)

* 
[VkComponentSwizzle](../chapters/resources.html#VkComponentSwizzle)

* 
[VkCullModeFlagBits](../chapters/primsrast.html#VkCullModeFlagBits)

* 
[VkDependencyFlagBits](../chapters/synchronization.html#VkDependencyFlagBits)

* 
[VkDescriptorPoolCreateFlagBits](../chapters/descriptorsets.html#VkDescriptorPoolCreateFlagBits)

* 
[VkDescriptorSetLayoutCreateFlagBits](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)

* 
[VkDescriptorType](../chapters/descriptorsets.html#VkDescriptorType)

* 
[VkDynamicState](../chapters/pipelines.html#VkDynamicState)

* 
[VkEventCreateFlagBits](../chapters/synchronization.html#VkEventCreateFlagBits)

* 
[VkFenceCreateFlagBits](../chapters/synchronization.html#VkFenceCreateFlagBits)

* 
[VkFilter](../chapters/samplers.html#VkFilter)

* 
[VkFormat](../chapters/formats.html#VkFormat)

* 
[VkFormatFeatureFlagBits](../chapters/formats.html#VkFormatFeatureFlagBits)

* 
[VkFramebufferCreateFlagBits](../chapters/renderpass.html#VkFramebufferCreateFlagBits)

* 
[VkFrontFace](../chapters/primsrast.html#VkFrontFace)

* 
[VkImageAspectFlagBits](../chapters/resources.html#VkImageAspectFlagBits)

* 
[VkImageCreateFlagBits](../chapters/resources.html#VkImageCreateFlagBits)

* 
[VkImageLayout](../chapters/resources.html#VkImageLayout)

* 
[VkImageTiling](../chapters/resources.html#VkImageTiling)

* 
[VkImageType](../chapters/resources.html#VkImageType)

* 
[VkImageUsageFlagBits](../chapters/resources.html#VkImageUsageFlagBits)

* 
[VkImageViewCreateFlagBits](../chapters/resources.html#VkImageViewCreateFlagBits)

* 
[VkImageViewType](../chapters/resources.html#VkImageViewType)

* 
[VkIndexType](../chapters/drawing.html#VkIndexType)

* 
[VkInstanceCreateFlagBits](../chapters/initialization.html#VkInstanceCreateFlagBits)

* 
[VkInternalAllocationType](../chapters/memory.html#VkInternalAllocationType)

* 
[VkLogicOp](../chapters/framebuffer.html#VkLogicOp)

* 
[VkMemoryHeapFlagBits](../chapters/memory.html#VkMemoryHeapFlagBits)

* 
[VkMemoryMapFlagBits](../chapters/memory.html#VkMemoryMapFlagBits)

* 
[VkMemoryPropertyFlagBits](../chapters/memory.html#VkMemoryPropertyFlagBits)

* 
[VkObjectType](../chapters/debugging.html#VkObjectType)

* 
[VkPhysicalDeviceType](../chapters/devsandqueues.html#VkPhysicalDeviceType)

* 
[VkPipelineBindPoint](../chapters/pipelines.html#VkPipelineBindPoint)

* 
[VkPipelineCacheCreateFlagBits](../chapters/pipelines.html#VkPipelineCacheCreateFlagBits)

* 
[VkPipelineCacheHeaderVersion](../chapters/pipelines.html#VkPipelineCacheHeaderVersion)

* 
[VkPipelineColorBlendStateCreateFlagBits](../chapters/framebuffer.html#VkPipelineColorBlendStateCreateFlagBits)

* 
[VkPipelineCreateFlagBits](../chapters/pipelines.html#VkPipelineCreateFlagBits)

* 
[VkPipelineDepthStencilStateCreateFlagBits](../chapters/fragops.html#VkPipelineDepthStencilStateCreateFlagBits)

* 
[VkPipelineLayoutCreateFlagBits](../chapters/descriptorsets.html#VkPipelineLayoutCreateFlagBits)

* 
[VkPipelineShaderStageCreateFlagBits](../chapters/pipelines.html#VkPipelineShaderStageCreateFlagBits)

* 
[VkPipelineStageFlagBits](../chapters/synchronization.html#VkPipelineStageFlagBits)

* 
[VkPolygonMode](../chapters/primsrast.html#VkPolygonMode)

* 
[VkPrimitiveTopology](../chapters/drawing.html#VkPrimitiveTopology)

* 
[VkQueryControlFlagBits](../chapters/queries.html#VkQueryControlFlagBits)

* 
[VkQueryPipelineStatisticFlagBits](../chapters/queries.html#VkQueryPipelineStatisticFlagBits)

* 
[VkQueryPoolCreateFlagBits](../chapters/queries.html#VkQueryPoolCreateFlagBits)

* 
[VkQueryResultFlagBits](../chapters/queries.html#VkQueryResultFlagBits)

* 
[VkQueryType](../chapters/queries.html#VkQueryType)

* 
[VkQueueFlagBits](../chapters/devsandqueues.html#VkQueueFlagBits)

* 
[VkRenderPassCreateFlagBits](../chapters/renderpass.html#VkRenderPassCreateFlagBits)

* 
[VkResult](../chapters/fundamentals.html#VkResult)

* 
[VkSampleCountFlagBits](../chapters/limits.html#VkSampleCountFlagBits)

* 
[VkSamplerAddressMode](../chapters/samplers.html#VkSamplerAddressMode)

* 
[VkSamplerCreateFlagBits](../chapters/samplers.html#VkSamplerCreateFlagBits)

* 
[VkSamplerMipmapMode](../chapters/samplers.html#VkSamplerMipmapMode)

* 
[VkShaderStageFlagBits](../chapters/pipelines.html#VkShaderStageFlagBits)

* 
[VkSharingMode](../chapters/resources.html#VkSharingMode)

* 
[VkSparseImageFormatFlagBits](../chapters/sparsemem.html#VkSparseImageFormatFlagBits)

* 
[VkSparseMemoryBindFlagBits](../chapters/sparsemem.html#VkSparseMemoryBindFlagBits)

* 
[VkStencilFaceFlagBits](../chapters/fragops.html#VkStencilFaceFlagBits)

* 
[VkStencilOp](../chapters/fragops.html#VkStencilOp)

* 
[VkStructureType](../chapters/fundamentals.html#VkStructureType)

* 
[VkSubpassContents](../chapters/renderpass.html#VkSubpassContents)

* 
[VkSubpassDescriptionFlagBits](../chapters/renderpass.html#VkSubpassDescriptionFlagBits)

* 
[VkSystemAllocationScope](../chapters/memory.html#VkSystemAllocationScope)

* 
[VkVendorId](../chapters/devsandqueues.html#VkVendorId)

* 
[VkVertexInputRate](../chapters/fxvertex.html#VkVertexInputRate)

* 
[VkAccessFlags](../chapters/synchronization.html#VkAccessFlags)

* 
[VkAttachmentDescriptionFlags](../chapters/renderpass.html#VkAttachmentDescriptionFlags)

* 
[VkBufferCreateFlags](../chapters/resources.html#VkBufferCreateFlags)

* 
[VkBufferUsageFlags](../chapters/resources.html#VkBufferUsageFlags)

* 
[VkBufferViewCreateFlags](../chapters/resources.html#VkBufferViewCreateFlags)

* 
[VkColorComponentFlags](../chapters/framebuffer.html#VkColorComponentFlags)

* 
[VkCommandBufferResetFlags](../chapters/cmdbuffers.html#VkCommandBufferResetFlags)

* 
[VkCommandBufferUsageFlags](../chapters/cmdbuffers.html#VkCommandBufferUsageFlags)

* 
[VkCommandPoolCreateFlags](../chapters/cmdbuffers.html#VkCommandPoolCreateFlags)

* 
[VkCommandPoolResetFlags](../chapters/cmdbuffers.html#VkCommandPoolResetFlags)

* 
[VkCullModeFlags](../chapters/primsrast.html#VkCullModeFlags)

* 
[VkDependencyFlags](../chapters/synchronization.html#VkDependencyFlags)

* 
[VkDescriptorPoolCreateFlags](../chapters/descriptorsets.html#VkDescriptorPoolCreateFlags)

* 
[VkDescriptorPoolResetFlags](../chapters/descriptorsets.html#VkDescriptorPoolResetFlags)

* 
[VkDescriptorSetLayoutCreateFlags](../chapters/descriptorsets.html#VkDescriptorSetLayoutCreateFlags)

* 
[VkDeviceCreateFlags](../chapters/devsandqueues.html#VkDeviceCreateFlags)

* 
[VkDeviceQueueCreateFlags](../chapters/devsandqueues.html#VkDeviceQueueCreateFlags)

* 
[VkEventCreateFlags](../chapters/synchronization.html#VkEventCreateFlags)

* 
[VkFenceCreateFlags](../chapters/synchronization.html#VkFenceCreateFlags)

* 
[VkFormatFeatureFlags](../chapters/formats.html#VkFormatFeatureFlags)

* 
[VkFramebufferCreateFlags](../chapters/renderpass.html#VkFramebufferCreateFlags)

* 
[VkImageAspectFlags](../chapters/resources.html#VkImageAspectFlags)

* 
[VkImageCreateFlags](../chapters/resources.html#VkImageCreateFlags)

* 
[VkImageUsageFlags](../chapters/resources.html#VkImageUsageFlags)

* 
[VkImageViewCreateFlags](../chapters/resources.html#VkImageViewCreateFlags)

* 
[VkInstanceCreateFlags](../chapters/initialization.html#VkInstanceCreateFlags)

* 
[VkMemoryHeapFlags](../chapters/memory.html#VkMemoryHeapFlags)

* 
[VkMemoryMapFlags](../chapters/memory.html#VkMemoryMapFlags)

* 
[VkMemoryPropertyFlags](../chapters/memory.html#VkMemoryPropertyFlags)

* 
[VkPipelineCacheCreateFlags](../chapters/pipelines.html#VkPipelineCacheCreateFlags)

* 
[VkPipelineColorBlendStateCreateFlags](../chapters/framebuffer.html#VkPipelineColorBlendStateCreateFlags)

* 
[VkPipelineCreateFlags](../chapters/pipelines.html#VkPipelineCreateFlags)

* 
[VkPipelineDepthStencilStateCreateFlags](../chapters/fragops.html#VkPipelineDepthStencilStateCreateFlags)

* 
[VkPipelineDynamicStateCreateFlags](../chapters/pipelines.html#VkPipelineDynamicStateCreateFlags)

* 
[VkPipelineInputAssemblyStateCreateFlags](../chapters/drawing.html#VkPipelineInputAssemblyStateCreateFlags)

* 
[VkPipelineLayoutCreateFlags](../chapters/descriptorsets.html#VkPipelineLayoutCreateFlags)

* 
[VkPipelineMultisampleStateCreateFlags](../chapters/primsrast.html#VkPipelineMultisampleStateCreateFlags)

* 
[VkPipelineRasterizationStateCreateFlags](../chapters/primsrast.html#VkPipelineRasterizationStateCreateFlags)

* 
[VkPipelineShaderStageCreateFlags](../chapters/pipelines.html#VkPipelineShaderStageCreateFlags)

* 
[VkPipelineStageFlags](../chapters/synchronization.html#VkPipelineStageFlags)

* 
[VkPipelineTessellationStateCreateFlags](../chapters/tessellation.html#VkPipelineTessellationStateCreateFlags)

* 
[VkPipelineVertexInputStateCreateFlags](../chapters/fxvertex.html#VkPipelineVertexInputStateCreateFlags)

* 
[VkPipelineViewportStateCreateFlags](../chapters/vertexpostproc.html#VkPipelineViewportStateCreateFlags)

* 
[VkQueryControlFlags](../chapters/queries.html#VkQueryControlFlags)

* 
[VkQueryPipelineStatisticFlags](../chapters/queries.html#VkQueryPipelineStatisticFlags)

* 
[VkQueryPoolCreateFlags](../chapters/queries.html#VkQueryPoolCreateFlags)

* 
[VkQueryResultFlags](../chapters/queries.html#VkQueryResultFlags)

* 
[VkQueueFlags](../chapters/devsandqueues.html#VkQueueFlags)

* 
[VkRenderPassCreateFlags](../chapters/renderpass.html#VkRenderPassCreateFlags)

* 
[VkSampleCountFlags](../chapters/limits.html#VkSampleCountFlags)

* 
[VkSamplerCreateFlags](../chapters/samplers.html#VkSamplerCreateFlags)

* 
[VkSemaphoreCreateFlags](../chapters/synchronization.html#VkSemaphoreCreateFlags)

* 
[VkShaderModuleCreateFlags](../chapters/shaders.html#VkShaderModuleCreateFlags)

* 
[VkShaderStageFlags](../chapters/pipelines.html#VkShaderStageFlags)

* 
[VkSparseImageFormatFlags](../chapters/sparsemem.html#VkSparseImageFormatFlags)

* 
[VkSparseMemoryBindFlags](../chapters/sparsemem.html#VkSparseMemoryBindFlags)

* 
[VkStencilFaceFlags](../chapters/fragops.html#VkStencilFaceFlags)

* 
[VkSubpassDescriptionFlags](../chapters/renderpass.html#VkSubpassDescriptionFlags)

* 
`vk_platform`

* 
[VK_ATTACHMENT_UNUSED](../chapters/renderpass.html#VK_ATTACHMENT_UNUSED)

* 
[VK_FALSE](../chapters/fundamentals.html#VK_FALSE)

* 
[VK_LOD_CLAMP_NONE](../chapters/samplers.html#VK_LOD_CLAMP_NONE)

* 
[VK_MAX_DESCRIPTION_SIZE](../chapters/extensions.html#VK_MAX_DESCRIPTION_SIZE)

* 
[VK_MAX_EXTENSION_NAME_SIZE](../chapters/extensions.html#VK_MAX_EXTENSION_NAME_SIZE)

* 
[VK_MAX_MEMORY_HEAPS](../chapters/memory.html#VK_MAX_MEMORY_HEAPS)

* 
[VK_MAX_MEMORY_TYPES](../chapters/memory.html#VK_MAX_MEMORY_TYPES)

* 
[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](../chapters/devsandqueues.html#VK_MAX_PHYSICAL_DEVICE_NAME_SIZE)

* 
[VK_QUEUE_FAMILY_IGNORED](../chapters/synchronization.html#VK_QUEUE_FAMILY_IGNORED)

* 
[VK_REMAINING_ARRAY_LAYERS](../chapters/resources.html#VK_REMAINING_ARRAY_LAYERS)

* 
[VK_REMAINING_MIP_LEVELS](../chapters/resources.html#VK_REMAINING_MIP_LEVELS)

* 
[VK_SUBPASS_EXTERNAL](../chapters/renderpass.html#VK_SUBPASS_EXTERNAL)

* 
[VK_TRUE](../chapters/fundamentals.html#VK_TRUE)

* 
[VK_UUID_SIZE](../chapters/devsandqueues.html#VK_UUID_SIZE)

* 
[VK_WHOLE_SIZE](../chapters/synchronization.html#VK_WHOLE_SIZE)

* 
Extending [VkResult](../chapters/fundamentals.html#VkResult):

[VK_ERROR_VALIDATION_FAILED](../chapters/fundamentals.html#VkResult)
