# VK_VERSION_1_4(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VERSION_1_4.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [New Macros](#_new_macros)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VERSION_1_4 - Vulkan version 1.4

Vulkan Version 1.4 [promoted](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html)

* 

[VK_KHR_global_priority](VK_KHR_global_priority.html)

* 

[VK_KHR_index_type_uint8](VK_KHR_index_type_uint8.html)

* 

[VK_KHR_line_rasterization](VK_KHR_line_rasterization.html)

* 

[VK_KHR_load_store_op_none](VK_KHR_load_store_op_none.html)

* 

[VK_KHR_maintenance5](VK_KHR_maintenance5.html)

* 

[VK_KHR_maintenance6](VK_KHR_maintenance6.html)

* 

[VK_KHR_map_memory2](VK_KHR_map_memory2.html)

* 

[VK_KHR_push_descriptor](VK_KHR_push_descriptor.html)

* 

[VK_KHR_shader_expect_assume](VK_KHR_shader_expect_assume.html)

* 

[VK_KHR_shader_float_controls2](VK_KHR_shader_float_controls2.html)

* 

[VK_KHR_shader_subgroup_rotate](VK_KHR_shader_subgroup_rotate.html)

* 

[VK_KHR_vertex_attribute_divisor](VK_KHR_vertex_attribute_divisor.html)

* 

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html)

* 

[VK_EXT_pipeline_protected_access](VK_EXT_pipeline_protected_access.html)

* 

[VK_EXT_pipeline_robustness](VK_EXT_pipeline_robustness.html)

All differences in behavior between these extensions and the corresponding
Vulkan 1.4 functionality are summarized below.

Differences Relative to `VK_KHR_dynamic_rendering_local_read`

If the [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html) extension is not
supported, Vulkan 1.4 implementations **must** support local read only for
storage resources and single sampled color attachments.

Support for reading depth/stencil attachments and multi-sampled attachments
are respectively gated behind the new boolean
`dynamicRenderingLocalReadDepthStencilAttachments` and
`dynamicRenderingLocalReadMultisampledAttachments` properties.

* 
If `dynamicRenderingLocalReadDepthStencilAttachments` is
[VK_FALSE](VK_FALSE.html), implementations do not support depth/stencil attachment
access within dynamic rendering.

* 
If `dynamicRenderingLocalReadMultisampledAttachments` is
[VK_FALSE](VK_FALSE.html), implementations do not support multisampled attachment
access within dynamic rendering.

* 
If both properties are [VK_TRUE](VK_TRUE.html), the full functionality of the
extension is supported.

Differences Relative to `VK_EXT_host_image_copy`

If the [VK_EXT_host_image_copy](VK_EXT_host_image_copy.html) extension is not supported, support for
it is optional in Vulkan 1.4.

* 
An implementation that has a [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) queue must support either:

the [`hostImageCopy`](../../../../spec/latest/chapters/features.html#features-hostImageCopy) feature; or

* 
an additional queue that supports [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html).

Differences Relative to `VK_KHR_push_descriptor`

[VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) did not include a feature bit, so a new
feature bit has been added to [VkPhysicalDeviceVulkan14Features](VkPhysicalDeviceVulkan14Features.html) to gate
its functionality: [`pushDescriptor`](../../../../spec/latest/chapters/features.html#features-pushDescriptor).
Enabling this new feature has the same effect as enabling the extension.

Differences Relative to `VK_EXT_pipeline_protected_access`

[VK_EXT_pipeline_protected_access](VK_EXT_pipeline_protected_access.html) is only useful when the
[`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is supported.
As the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is
optional in core Vulkan, the [`pipelineProtectedAccess`](../../../../spec/latest/chapters/features.html#features-pipelineProtectedAccess) feature is only required when the
[`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is supported.

Differences Relative to `VK_KHR_line_rasterization`

The [`bresenhamLines`](../../../../spec/latest/chapters/features.html#features-bresenhamLines) feature is required,
rather than just any one of the line style features.

Differences Relative to `VK_KHR_shader_subgroup_rotate`

The
[`shaderSubgroupRotateClustered`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupRotateClustered)
feature is required in addition to [`shaderSubgroupRotate`](../../../../spec/latest/chapters/features.html#features-shaderSubgroupRotate).

Additional Vulkan 1.4 Feature Support

In addition to the promoted extensions described above, Vulkan 1.4 added
required support for:

* 
All queues supporting [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or
[VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) **must** also advertise
[VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html).

* 
Clustered subgroup operations **must** be advertised in Vulkan 1.4 via
setting both [VK_SUBGROUP_FEATURE_CLUSTERED_BIT](VkSubgroupFeatureFlagBits.html) and
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](VkSubgroupFeatureFlagBits.html) (as an interaction with
the promoted [VK_KHR_shader_subgroup_rotate](VK_KHR_shader_subgroup_rotate.html) functionality) in
[`supportedOperations`](../../../../spec/latest/chapters/devsandqueues.html#limits-subgroupSupportedOperations).

* 
The following features that were optional in earlier versions:

[`fullDrawIndexUint32`](../../../../spec/latest/chapters/features.html#features-fullDrawIndexUint32)

* 
[`imageCubeArray`](../../../../spec/latest/chapters/features.html#features-imageCubeArray)

* 
[`independentBlend`](../../../../spec/latest/chapters/features.html#features-independentBlend)

* 
[`sampleRateShading`](../../../../spec/latest/chapters/features.html#features-sampleRateShading)

* 
[`drawIndirectFirstInstance`](../../../../spec/latest/chapters/features.html#features-drawIndirectFirstInstance)

* 
[`depthClamp`](../../../../spec/latest/chapters/features.html#features-depthClamp)

* 
[`depthBiasClamp`](../../../../spec/latest/chapters/features.html#features-depthBiasClamp)

* 
[`samplerAnisotropy`](../../../../spec/latest/chapters/features.html#features-samplerAnisotropy)

* 
[`fragmentStoresAndAtomics`](../../../../spec/latest/chapters/features.html#features-fragmentStoresAndAtomics)

* 
[`shaderStorageImageExtendedFormats`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageExtendedFormats)

* 
[`shaderUniformBufferArrayDynamicIndexing`](../../../../spec/latest/chapters/features.html#features-shaderUniformBufferArrayDynamicIndexing)

* 
[`shaderSampledImageArrayDynamicIndexing`](../../../../spec/latest/chapters/features.html#features-shaderSampledImageArrayDynamicIndexing)

* 
[`shaderStorageBufferArrayDynamicIndexing`](../../../../spec/latest/chapters/features.html#features-shaderStorageBufferArrayDynamicIndexing)

* 
[`shaderStorageImageArrayDynamicIndexing`](../../../../spec/latest/chapters/features.html#features-shaderStorageImageArrayDynamicIndexing)

* 
[`shaderImageGatherExtended`](../../../../spec/latest/chapters/features.html#features-shaderImageGatherExtended)

* 
[`shaderInt16`](../../../../spec/latest/chapters/features.html#features-shaderInt16)

* 
[`largePoints`](../../../../spec/latest/chapters/features.html#features-largePoints)

* 
[`samplerYcbcrConversion`](../../../../spec/latest/chapters/features.html#features-samplerYcbcrConversion)

* 
[`storageBuffer16BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer16BitAccess)

* 
[`variablePointers`](../../../../spec/latest/chapters/features.html#features-variablePointers)

* 
[`variablePointersStorageBuffer`](../../../../spec/latest/chapters/features.html#features-variablePointersStorageBuffer)

* 
[`samplerMirrorClampToEdge`](../../../../spec/latest/chapters/features.html#features-samplerMirrorClampToEdge)

* 
[`scalarBlockLayout`](../../../../spec/latest/chapters/features.html#features-scalarBlockLayout)

* 
[`shaderUniformTexelBufferArrayDynamicIndexing`](../../../../spec/latest/chapters/features.html#features-shaderUniformTexelBufferArrayDynamicIndexing)

* 
[`shaderStorageTexelBufferArrayDynamicIndexing`](../../../../spec/latest/chapters/features.html#features-shaderStorageTexelBufferArrayDynamicIndexing)

* 
[`shaderInt8`](../../../../spec/latest/chapters/features.html#features-shaderInt8)

* 
[`storageBuffer8BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer8BitAccess)

Updated Vulkan 1.4 Limit Support

Vulkan 1.4 also requires support for the following updated limits:

* 
[`maxImageDimension1D`](../../../../spec/latest/chapters/limits.html#limits-maxImageDimension1D) is increased from 4096 to 8192

* 
[`maxImageDimension2D`](../../../../spec/latest/chapters/limits.html#limits-maxImageDimension2D) is increased from 4096 to 8192

* 
[`maxImageDimension3D`](../../../../spec/latest/chapters/limits.html#limits-maxImageDimension3D) is increased from 256 to 512

* 
[`maxImageDimensionCube`](../../../../spec/latest/chapters/limits.html#limits-maxImageDimensionCube) is increased from 4096 to 8192

* 
[`maxImageArrayLayers`](../../../../spec/latest/chapters/limits.html#limits-maxImageArrayLayers) is increased from 256 to 2048

* 
[`maxUniformBufferRange`](../../../../spec/latest/chapters/limits.html#limits-maxUniformBufferRange) is increased from 16384 to 65536

* 
[`maxPushConstantsSize`](../../../../spec/latest/chapters/limits.html#limits-maxPushConstantsSize) is increased from 128 to 256

* 
[`bufferImageGranularity`](../../../../spec/latest/chapters/limits.html#limits-bufferImageGranularity) is decreased from 131072 to 4096

* 
[`maxBoundDescriptorSets`](../../../../spec/latest/chapters/limits.html#limits-maxBoundDescriptorSets) is increased from 4 to 7

* 
[`maxPerStageDescriptorUniformBuffers`](../../../../spec/latest/chapters/limits.html#limits-maxPerStageDescriptorUniformBuffers) is increased from 12 to 15

* 
[`maxPerStageResources`](../../../../spec/latest/chapters/limits.html#limits-maxPerStageResources) is increased from 128 to 200

* 
[`maxDescriptorSetUniformBuffers`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetUniformBuffers) is increased from 72 to 90

* 
[`maxDescriptorSetStorageBuffers`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetStorageBuffers) is increased from 24 to 96

* 
[`maxDescriptorSetStorageImages`](../../../../spec/latest/chapters/limits.html#limits-maxDescriptorSetStorageImages) is increased from 24 to 144

* 
[`maxFragmentCombinedOutputResources`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentCombinedOutputResources) is increased from 4 to 16

* 
[`maxComputeWorkGroupInvocations`](../../../../spec/latest/chapters/limits.html#limits-maxComputeWorkGroupInvocations) is increased from 128 to 256

* 
[`maxComputeWorkGroupSize`](../../../../spec/latest/chapters/limits.html#limits-maxComputeWorkGroupSize) is increased from (128,128,64) to (256,256,64)

* 
[`shaderSignedZeroInfNanPreserveFloat16`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat16) is changed from unspecified to [VK_TRUE](VK_TRUE.html)

* 
[`shaderSignedZeroInfNanPreserveFloat32`](../../../../spec/latest/chapters/devsandqueues.html#limits-shaderSignedZeroInfNanPreserveFloat32) is changed from unspecified to [VK_TRUE](VK_TRUE.html)

* 
[`subTexelPrecisionBits`](../../../../spec/latest/chapters/limits.html#limits-subTexelPrecisionBits) is increased from 4 to 8

* 
[`mipmapPrecisionBits`](../../../../spec/latest/chapters/limits.html#limits-mipmapPrecisionBits) is increased from 4 to 6

* 
[`maxSamplerLodBias`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerLodBias) is increased from 2 to 14

* 
[`maxViewportDimensions`](../../../../spec/latest/chapters/limits.html#limits-maxViewportDimensions) is increased from (4096,4096) to (7680,7680)

* 
[`viewportBoundsRange`](../../../../spec/latest/chapters/limits.html#limits-viewportboundsrange) is increased from (-8192,8191) to (-15360,15359)

* 
[`maxFramebufferWidth`](../../../../spec/latest/chapters/limits.html#limits-maxFramebufferWidth) is increased from 4096 to 7680

* 
[`maxFramebufferHeight`](../../../../spec/latest/chapters/limits.html#limits-maxFramebufferHeight) is increased from 4096 to 7680

* 
[`maxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxColorAttachments) is increased from 7 to 8

* 
[`timestampComputeAndGraphics`](../../../../spec/latest/chapters/limits.html#limits-timestampComputeAndGraphics) is changed from unspecified to [VK_TRUE](VK_TRUE.html)

* 
[`pointSizeRange`](../../../../spec/latest/chapters/limits.html#limits-pointSizeRange) is increased from (1.0,64.0 - ULP) to (1.0,256.0 - `pointSizeGranularity`)

* 
[`pointSizeGranularity`](../../../../spec/latest/chapters/limits.html#limits-pointSizeGranularity) is decreased from 1.0 to 0.125

* 
[`lineWidthGranularity`](../../../../spec/latest/chapters/limits.html#limits-lineWidthGranularity) is decreased from 1.0 to 0.5

* 
[`maxPushDescriptors`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxPushDescriptors) is increased from 16 to 32

* 
[`standardSampleLocations`](../../../../spec/latest/chapters/limits.html#limits-standardSampleLocations) is changed from unspecified to [VK_TRUE](VK_TRUE.html)

* 
[VK_API_VERSION_1_4](VK_API_VERSION_1_4.html)

* 
[vkCmdBindDescriptorSets2](vkCmdBindDescriptorSets2.html)

* 
[vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html)

* 
[vkCmdPushConstants2](vkCmdPushConstants2.html)

* 
[vkCmdPushDescriptorSet](vkCmdPushDescriptorSet.html)

* 
[vkCmdPushDescriptorSet2](vkCmdPushDescriptorSet2.html)

* 
[vkCmdPushDescriptorSetWithTemplate](vkCmdPushDescriptorSetWithTemplate.html)

* 
[vkCmdPushDescriptorSetWithTemplate2](vkCmdPushDescriptorSetWithTemplate2.html)

* 
[vkCmdSetLineStipple](vkCmdSetLineStipple.html)

* 
[vkCmdSetRenderingAttachmentLocations](vkCmdSetRenderingAttachmentLocations.html)

* 
[vkCmdSetRenderingInputAttachmentIndices](vkCmdSetRenderingInputAttachmentIndices.html)

* 
[vkCopyImageToImage](vkCopyImageToImage.html)

* 
[vkCopyImageToMemory](vkCopyImageToMemory.html)

* 
[vkCopyMemoryToImage](vkCopyMemoryToImage.html)

* 
[vkGetDeviceImageSubresourceLayout](vkGetDeviceImageSubresourceLayout.html)

* 
[vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html)

* 
[vkGetRenderingAreaGranularity](vkGetRenderingAreaGranularity.html)

* 
[vkMapMemory2](vkMapMemory2.html)

* 
[vkTransitionImageLayout](vkTransitionImageLayout.html)

* 
[vkUnmapMemory2](vkUnmapMemory2.html)

* 
[VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html)

* 
[VkCopyImageToImageInfo](VkCopyImageToImageInfo.html)

* 
[VkCopyImageToMemoryInfo](VkCopyImageToMemoryInfo.html)

* 
[VkCopyMemoryToImageInfo](VkCopyMemoryToImageInfo.html)

* 
[VkDeviceImageSubresourceInfo](VkDeviceImageSubresourceInfo.html)

* 
[VkHostImageLayoutTransitionInfo](VkHostImageLayoutTransitionInfo.html)

* 
[VkImageSubresource2](VkImageSubresource2.html)

* 
[VkImageToMemoryCopy](VkImageToMemoryCopy.html)

* 
[VkMemoryMapInfo](VkMemoryMapInfo.html)

* 
[VkMemoryToImageCopy](VkMemoryToImageCopy.html)

* 
[VkMemoryUnmapInfo](VkMemoryUnmapInfo.html)

* 
[VkPushConstantsInfo](VkPushConstantsInfo.html)

* 
[VkPushDescriptorSetInfo](VkPushDescriptorSetInfo.html)

* 
[VkPushDescriptorSetWithTemplateInfo](VkPushDescriptorSetWithTemplateInfo.html)

* 
[VkRenderingAreaInfo](VkRenderingAreaInfo.html)

* 
[VkSubresourceLayout2](VkSubresourceLayout2.html)

* 
[VkVertexInputBindingDivisorDescription](VkVertexInputBindingDivisorDescription.html)

* 
Extending [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html), [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html):

[VkBindMemoryStatus](VkBindMemoryStatus.html)

Extending [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html), [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html), [VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html):

* 
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)

Extending [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html):

* 
[VkPipelineCreateFlags2CreateInfo](VkPipelineCreateFlags2CreateInfo.html)

Extending [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html):

* 
[VkDeviceQueueGlobalPriorityCreateInfo](VkDeviceQueueGlobalPriorityCreateInfo.html)

Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

* 
[VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html)

* 
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html)

Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html):

* 
[VkPipelineRobustnessCreateInfo](VkPipelineRobustnessCreateInfo.html)

Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

* 
[VkHostImageCopyDevicePerformanceQuery](VkHostImageCopyDevicePerformanceQuery.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDynamicRenderingLocalReadFeatures](VkPhysicalDeviceDynamicRenderingLocalReadFeatures.html)

* 
[VkPhysicalDeviceGlobalPriorityQueryFeatures](VkPhysicalDeviceGlobalPriorityQueryFeatures.html)

* 
[VkPhysicalDeviceHostImageCopyFeatures](VkPhysicalDeviceHostImageCopyFeatures.html)

* 
[VkPhysicalDeviceIndexTypeUint8Features](VkPhysicalDeviceIndexTypeUint8Features.html)

* 
[VkPhysicalDeviceLineRasterizationFeatures](VkPhysicalDeviceLineRasterizationFeatures.html)

* 
[VkPhysicalDeviceMaintenance5Features](VkPhysicalDeviceMaintenance5Features.html)

* 
[VkPhysicalDeviceMaintenance6Features](VkPhysicalDeviceMaintenance6Features.html)

* 
[VkPhysicalDevicePipelineProtectedAccessFeatures](VkPhysicalDevicePipelineProtectedAccessFeatures.html)

* 
[VkPhysicalDevicePipelineRobustnessFeatures](VkPhysicalDevicePipelineRobustnessFeatures.html)

* 
[VkPhysicalDeviceShaderExpectAssumeFeatures](VkPhysicalDeviceShaderExpectAssumeFeatures.html)

* 
[VkPhysicalDeviceShaderFloatControls2Features](VkPhysicalDeviceShaderFloatControls2Features.html)

* 
[VkPhysicalDeviceShaderSubgroupRotateFeatures](VkPhysicalDeviceShaderSubgroupRotateFeatures.html)

* 
[VkPhysicalDeviceVertexAttributeDivisorFeatures](VkPhysicalDeviceVertexAttributeDivisorFeatures.html)

* 
[VkPhysicalDeviceVulkan14Features](VkPhysicalDeviceVulkan14Features.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceHostImageCopyProperties](VkPhysicalDeviceHostImageCopyProperties.html)

* 
[VkPhysicalDeviceLineRasterizationProperties](VkPhysicalDeviceLineRasterizationProperties.html)

* 
[VkPhysicalDeviceMaintenance5Properties](VkPhysicalDeviceMaintenance5Properties.html)

* 
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)

* 
[VkPhysicalDevicePipelineRobustnessProperties](VkPhysicalDevicePipelineRobustnessProperties.html)

* 
[VkPhysicalDevicePushDescriptorProperties](VkPhysicalDevicePushDescriptorProperties.html)

* 
[VkPhysicalDeviceVertexAttributeDivisorProperties](VkPhysicalDeviceVertexAttributeDivisorProperties.html)

* 
[VkPhysicalDeviceVulkan14Properties](VkPhysicalDeviceVulkan14Properties.html)

Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

* 
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html)

Extending [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html):

* 
[VkPipelineVertexInputDivisorStateCreateInfo](VkPipelineVertexInputDivisorStateCreateInfo.html)

Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

* 
[VkQueueFamilyGlobalPriorityProperties](VkQueueFamilyGlobalPriorityProperties.html)

Extending [VkSubresourceLayout2](VkSubresourceLayout2.html):

* 
[VkSubresourceHostMemcpySize](VkSubresourceHostMemcpySize.html)

* 
[VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html)

* 
[VkHostImageCopyFlagBits](VkHostImageCopyFlagBits.html)

* 
[VkLineRasterizationMode](VkLineRasterizationMode.html)

* 
[VkMemoryUnmapFlagBits](VkMemoryUnmapFlagBits.html)

* 
[VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html)

* 
[VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html)

* 
[VkPipelineRobustnessImageBehavior](VkPipelineRobustnessImageBehavior.html)

* 
[VkQueueGlobalPriority](VkQueueGlobalPriority.html)

* 
[VkBufferUsageFlags2](VkBufferUsageFlags2.html)

* 
[VkHostImageCopyFlags](VkHostImageCopyFlags.html)

* 
[VkMemoryUnmapFlags](VkMemoryUnmapFlags.html)

* 
[VkPipelineCreateFlags2](VkPipelineCreateFlags2.html)

* 
[VK_MAX_GLOBAL_PRIORITY_SIZE](VK_MAX_GLOBAL_PRIORITY_SIZE.html)

* 
Extending [VkAttachmentLoadOp](VkAttachmentLoadOp.html):

[VK_ATTACHMENT_LOAD_OP_NONE](VkAttachmentLoadOp.html)

Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

* 
[VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits2.html)

Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkDescriptorUpdateTemplateType](VkDescriptorUpdateTemplateType.html):

* 
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](VkDescriptorUpdateTemplateType.html)

Extending [VkDynamicState](VkDynamicState.html):

* 
[VK_DYNAMIC_STATE_LINE_STIPPLE](VkDynamicState.html)

Extending [VkFormat](VkFormat.html):

* 
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](VkFormat.html)

* 
[VK_FORMAT_A8_UNORM](VkFormat.html)

Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

* 
[VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT](VkFormatFeatureFlagBits2.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

Extending [VkImageUsageFlagBits](VkImageUsageFlagBits.html):

* 
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html)

Extending [VkIndexType](VkIndexType.html):

* 
[VK_INDEX_TYPE_UINT8](VkIndexType.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](VkPipelineCreateFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_NOT_PERMITTED](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_SETS_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_IMAGE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_MEMORY_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_TO_MEMORY_COPY](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_MAP_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_TO_IMAGE_COPY](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_LOCAL_READ_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROTECTED_ACCESS_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EXPECT_ASSUME_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT_CONTROLS_2_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_AREA_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2](VkStructureType.html)

Extending [VkSubgroupFeatureFlagBits](VkSubgroupFeatureFlagBits.html):

* 
[VK_SUBGROUP_FEATURE_ROTATE_BIT](VkSubgroupFeatureFlagBits.html)

* 
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](VkSubgroupFeatureFlagBits.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/versions.html#versions-1.4).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
