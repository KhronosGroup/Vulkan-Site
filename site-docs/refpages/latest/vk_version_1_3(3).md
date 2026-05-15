# VK_VERSION_1_3(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VERSION_1_3.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [New Macros](#_new_macros)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VERSION_1_3 - Vulkan version 1.3

Vulkan Version 1.3 [promoted](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_copy_commands2](VK_KHR_copy_commands2.html)

* 

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)

* 

[VK_KHR_format_feature_flags2](VK_KHR_format_feature_flags2.html)

* 

[VK_KHR_maintenance4](VK_KHR_maintenance4.html)

* 

[VK_KHR_shader_integer_dot_product](VK_KHR_shader_integer_dot_product.html)

* 

[VK_KHR_shader_non_semantic_info](VK_KHR_shader_non_semantic_info.html)

* 

[VK_KHR_shader_terminate_invocation](VK_KHR_shader_terminate_invocation.html)

* 

[VK_KHR_synchronization2](VK_KHR_synchronization2.html)

* 

[VK_KHR_zero_initialize_workgroup_memory](VK_KHR_zero_initialize_workgroup_memory.html)

* 

[VK_EXT_4444_formats](VK_EXT_4444_formats.html)

* 

[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html)

* 

[VK_EXT_extended_dynamic_state2](VK_EXT_extended_dynamic_state2.html)

* 

[VK_EXT_image_robustness](VK_EXT_image_robustness.html)

* 

[VK_EXT_inline_uniform_block](VK_EXT_inline_uniform_block.html)

* 

[VK_EXT_pipeline_creation_cache_control](VK_EXT_pipeline_creation_cache_control.html)

* 

[VK_EXT_pipeline_creation_feedback](VK_EXT_pipeline_creation_feedback.html)

* 

[VK_EXT_private_data](VK_EXT_private_data.html)

* 

[VK_EXT_shader_demote_to_helper_invocation](VK_EXT_shader_demote_to_helper_invocation.html)

* 

[VK_EXT_subgroup_size_control](VK_EXT_subgroup_size_control.html)

* 

[VK_EXT_texel_buffer_alignment](VK_EXT_texel_buffer_alignment.html)

* 

[VK_EXT_texture_compression_astc_hdr](VK_EXT_texture_compression_astc_hdr.html)

* 

[VK_EXT_tooling_info](VK_EXT_tooling_info.html)

* 

[VK_EXT_ycbcr_2plane_444_formats](VK_EXT_ycbcr_2plane_444_formats.html)

All differences in behavior between these extensions and the corresponding
Vulkan 1.3 functionality are summarized below.

Differences Relative to `VK_EXT_4444_formats`

If the `[VK_EXT_4444_formats](VK_EXT_4444_formats.html)` extension is not supported, support for
all formats defined by it are optional in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html) structure
corresponding to the [VkPhysicalDevice4444FormatsFeaturesEXT](VkPhysicalDevice4444FormatsFeaturesEXT.html) structure.

Differences Relative to `VK_EXT_extended_dynamic_state`

All dynamic state enumerants and commands defined by
`[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html)` are required in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html) structure
corresponding to the [VkPhysicalDeviceExtendedDynamicStateFeaturesEXT](VkPhysicalDeviceExtendedDynamicStateFeaturesEXT.html)
structure.

Differences Relative to `VK_EXT_extended_dynamic_state2`

The optional dynamic state enumerants and commands defined by
`[VK_EXT_extended_dynamic_state2](VK_EXT_extended_dynamic_state2.html)` for patch control points and logic
op are not promoted in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html) structure
corresponding to the [VkPhysicalDeviceExtendedDynamicState2FeaturesEXT](VkPhysicalDeviceExtendedDynamicState2FeaturesEXT.html)
structure.

Differences Relative to `VK_EXT_texel_buffer_alignment`

The more specific alignment requirements defined by
[VkPhysicalDeviceTexelBufferAlignmentProperties](VkPhysicalDeviceTexelBufferAlignmentProperties.html) are required in Vulkan
1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html) structure
corresponding to the [VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT](VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT.html)
structure.
The `texelBufferAlignment` feature is enabled if using a Vulkan 1.3
instance.

Differences Relative to `VK_EXT_texture_compression_astc_hdr`

If the `[VK_EXT_texture_compression_astc_hdr](VK_EXT_texture_compression_astc_hdr.html)` extension is not
supported, support for all formats defined by it are optional in Vulkan 1.3.
The [`textureCompressionASTC_HDR`](../../../../spec/latest/chapters/features.html#features-textureCompressionASTC_HDR) member of
[VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html) indicates whether a Vulkan 1.3
implementation supports these formats.

Differences Relative to `VK_EXT_ycbcr_2plane_444_formats`

If the `[VK_EXT_ycbcr_2plane_444_formats](VK_EXT_ycbcr_2plane_444_formats.html)` extension is not supported,
support for all formats defined by it are optional in Vulkan 1.3.
There are no members in the [VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html) structure
corresponding to the [VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT](VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT.html)
structure.

Additional Vulkan 1.3 Feature Support

In addition to the promoted extensions described above, Vulkan 1.3 added
required support for:

* 
SPIR-V version 1.6

SPIR-V 1.6 deprecates (but does not remove) the `WorkgroupSize`
decoration.

The [`bufferDeviceAddress`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddress) feature
which indicates support for accessing memory in shaders as storage
buffers via [vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html).

The [`vulkanMemoryModel`](../../../../spec/latest/chapters/features.html#features-vulkanMemoryModel) and
[    `vulkanMemoryModelDeviceScope`](../../../../spec/latest/chapters/features.html#features-vulkanMemoryModelDeviceScope) features, which indicate support
for the corresponding Vulkan Memory Model capabilities.

The [    `maxInlineUniformTotalSize`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxInlineUniformTotalSize) limit is added to provide the total
size of all inline uniform block bindings in a pipeline layout.

* 
[VK_API_VERSION_1_3](VK_API_VERSION_1_3.html)

* 
`VkFlags64`

* 
[VkPrivateDataSlot](VkPrivateDataSlot.html)

* 
[vkCmdBeginRendering](vkCmdBeginRendering.html)

* 
[vkCmdBindVertexBuffers2](vkCmdBindVertexBuffers2.html)

* 
[vkCmdBlitImage2](vkCmdBlitImage2.html)

* 
[vkCmdCopyBuffer2](vkCmdCopyBuffer2.html)

* 
[vkCmdCopyBufferToImage2](vkCmdCopyBufferToImage2.html)

* 
[vkCmdCopyImage2](vkCmdCopyImage2.html)

* 
[vkCmdCopyImageToBuffer2](vkCmdCopyImageToBuffer2.html)

* 
[vkCmdEndRendering](vkCmdEndRendering.html)

* 
[vkCmdPipelineBarrier2](vkCmdPipelineBarrier2.html)

* 
[vkCmdResetEvent2](vkCmdResetEvent2.html)

* 
[vkCmdResolveImage2](vkCmdResolveImage2.html)

* 
[vkCmdSetCullMode](vkCmdSetCullMode.html)

* 
[vkCmdSetDepthBiasEnable](vkCmdSetDepthBiasEnable.html)

* 
[vkCmdSetDepthBoundsTestEnable](vkCmdSetDepthBoundsTestEnable.html)

* 
[vkCmdSetDepthCompareOp](vkCmdSetDepthCompareOp.html)

* 
[vkCmdSetDepthTestEnable](vkCmdSetDepthTestEnable.html)

* 
[vkCmdSetDepthWriteEnable](vkCmdSetDepthWriteEnable.html)

* 
[vkCmdSetEvent2](vkCmdSetEvent2.html)

* 
[vkCmdSetFrontFace](vkCmdSetFrontFace.html)

* 
[vkCmdSetPrimitiveRestartEnable](vkCmdSetPrimitiveRestartEnable.html)

* 
[vkCmdSetPrimitiveTopology](vkCmdSetPrimitiveTopology.html)

* 
[vkCmdSetRasterizerDiscardEnable](vkCmdSetRasterizerDiscardEnable.html)

* 
[vkCmdSetScissorWithCount](vkCmdSetScissorWithCount.html)

* 
[vkCmdSetStencilOp](vkCmdSetStencilOp.html)

* 
[vkCmdSetStencilTestEnable](vkCmdSetStencilTestEnable.html)

* 
[vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

* 
[vkCmdWaitEvents2](vkCmdWaitEvents2.html)

* 
[vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html)

* 
[vkCreatePrivateDataSlot](vkCreatePrivateDataSlot.html)

* 
[vkDestroyPrivateDataSlot](vkDestroyPrivateDataSlot.html)

* 
[vkGetDeviceBufferMemoryRequirements](vkGetDeviceBufferMemoryRequirements.html)

* 
[vkGetDeviceImageMemoryRequirements](vkGetDeviceImageMemoryRequirements.html)

* 
[vkGetDeviceImageSparseMemoryRequirements](vkGetDeviceImageSparseMemoryRequirements.html)

* 
[vkGetPhysicalDeviceToolProperties](vkGetPhysicalDeviceToolProperties.html)

* 
[vkGetPrivateData](vkGetPrivateData.html)

* 
[vkQueueSubmit2](vkQueueSubmit2.html)

* 
[vkSetPrivateData](vkSetPrivateData.html)

* 
[VkBlitImageInfo2](VkBlitImageInfo2.html)

* 
[VkBufferCopy2](VkBufferCopy2.html)

* 
[VkBufferImageCopy2](VkBufferImageCopy2.html)

* 
[VkBufferMemoryBarrier2](VkBufferMemoryBarrier2.html)

* 
[VkCommandBufferSubmitInfo](VkCommandBufferSubmitInfo.html)

* 
[VkCopyBufferInfo2](VkCopyBufferInfo2.html)

* 
[VkCopyBufferToImageInfo2](VkCopyBufferToImageInfo2.html)

* 
[VkCopyImageInfo2](VkCopyImageInfo2.html)

* 
[VkCopyImageToBufferInfo2](VkCopyImageToBufferInfo2.html)

* 
[VkDependencyInfo](VkDependencyInfo.html)

* 
[VkDeviceBufferMemoryRequirements](VkDeviceBufferMemoryRequirements.html)

* 
[VkDeviceImageMemoryRequirements](VkDeviceImageMemoryRequirements.html)

* 
[VkImageBlit2](VkImageBlit2.html)

* 
[VkImageCopy2](VkImageCopy2.html)

* 
[VkImageMemoryBarrier2](VkImageMemoryBarrier2.html)

* 
[VkImageResolve2](VkImageResolve2.html)

* 
[VkPhysicalDeviceToolProperties](VkPhysicalDeviceToolProperties.html)

* 
[VkPipelineCreationFeedback](VkPipelineCreationFeedback.html)

* 
[VkPrivateDataSlotCreateInfo](VkPrivateDataSlotCreateInfo.html)

* 
[VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)

* 
[VkRenderingInfo](VkRenderingInfo.html)

* 
[VkResolveImageInfo2](VkResolveImageInfo2.html)

* 
[VkSemaphoreSubmitInfo](VkSemaphoreSubmitInfo.html)

* 
[VkSubmitInfo2](VkSubmitInfo2.html)

* 
Extending [VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html):

[VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html)

Extending [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html):

* 
[VkDescriptorPoolInlineUniformBlockCreateInfo](VkDescriptorPoolInlineUniformBlockCreateInfo.html)

Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkDevicePrivateDataCreateInfo](VkDevicePrivateDataCreateInfo.html)

Extending [VkFormatProperties2](VkFormatProperties2.html):

* 
[VkFormatProperties3](VkFormatProperties3.html)

Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

* 
[VkPipelineRenderingCreateInfo](VkPipelineRenderingCreateInfo.html)

Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html), [VkExecutionGraphPipelineCreateInfoAMDX](VkExecutionGraphPipelineCreateInfoAMDX.html), [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html):

* 
[VkPipelineCreationFeedbackCreateInfo](VkPipelineCreationFeedbackCreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDynamicRenderingFeatures](VkPhysicalDeviceDynamicRenderingFeatures.html)

* 
[VkPhysicalDeviceImageRobustnessFeatures](VkPhysicalDeviceImageRobustnessFeatures.html)

* 
[VkPhysicalDeviceInlineUniformBlockFeatures](VkPhysicalDeviceInlineUniformBlockFeatures.html)

* 
[VkPhysicalDeviceMaintenance4Features](VkPhysicalDeviceMaintenance4Features.html)

* 
[VkPhysicalDevicePipelineCreationCacheControlFeatures](VkPhysicalDevicePipelineCreationCacheControlFeatures.html)

* 
[VkPhysicalDevicePrivateDataFeatures](VkPhysicalDevicePrivateDataFeatures.html)

* 
[VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures](VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures.html)

* 
[VkPhysicalDeviceShaderIntegerDotProductFeatures](VkPhysicalDeviceShaderIntegerDotProductFeatures.html)

* 
[VkPhysicalDeviceShaderTerminateInvocationFeatures](VkPhysicalDeviceShaderTerminateInvocationFeatures.html)

* 
[VkPhysicalDeviceSubgroupSizeControlFeatures](VkPhysicalDeviceSubgroupSizeControlFeatures.html)

* 
[VkPhysicalDeviceSynchronization2Features](VkPhysicalDeviceSynchronization2Features.html)

* 
[VkPhysicalDeviceTextureCompressionASTCHDRFeatures](VkPhysicalDeviceTextureCompressionASTCHDRFeatures.html)

* 
[VkPhysicalDeviceVulkan13Features](VkPhysicalDeviceVulkan13Features.html)

* 
[VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures](VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceInlineUniformBlockProperties](VkPhysicalDeviceInlineUniformBlockProperties.html)

* 
[VkPhysicalDeviceMaintenance4Properties](VkPhysicalDeviceMaintenance4Properties.html)

* 
[VkPhysicalDeviceShaderIntegerDotProductProperties](VkPhysicalDeviceShaderIntegerDotProductProperties.html)

* 
[VkPhysicalDeviceSubgroupSizeControlProperties](VkPhysicalDeviceSubgroupSizeControlProperties.html)

* 
[VkPhysicalDeviceTexelBufferAlignmentProperties](VkPhysicalDeviceTexelBufferAlignmentProperties.html)

* 
[VkPhysicalDeviceVulkan13Properties](VkPhysicalDeviceVulkan13Properties.html)

Extending [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html):

* 
[VkPipelineShaderStageRequiredSubgroupSizeCreateInfo](VkPipelineShaderStageRequiredSubgroupSizeCreateInfo.html)

Extending [VkSubpassDependency2](VkSubpassDependency2.html):

* 
[VkMemoryBarrier2](VkMemoryBarrier2.html)

Extending [VkWriteDescriptorSet](VkWriteDescriptorSet.html):

* 
[VkWriteDescriptorSetInlineUniformBlock](VkWriteDescriptorSetInlineUniformBlock.html)

* 
[VkAccessFlagBits2](VkAccessFlagBits2.html)

* 
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html)

* 
[VkPipelineCreationFeedbackFlagBits](VkPipelineCreationFeedbackFlagBits.html)

* 
[VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html)

* 
[VkRenderingFlagBits](VkRenderingFlagBits.html)

* 
[VkSubmitFlagBits](VkSubmitFlagBits.html)

* 
[VkToolPurposeFlagBits](VkToolPurposeFlagBits.html)

* 
[VkAccessFlags2](VkAccessFlags2.html)

* 
[VkFormatFeatureFlags2](VkFormatFeatureFlags2.html)

* 
[VkPipelineCreationFeedbackFlags](VkPipelineCreationFeedbackFlags.html)

* 
[VkPipelineStageFlags2](VkPipelineStageFlags2.html)

* 
[VkPrivateDataSlotCreateFlags](VkPrivateDataSlotCreateFlags.html)

* 
[VkRenderingFlags](VkRenderingFlags.html)

* 
[VkSubmitFlags](VkSubmitFlags.html)

* 
[VkToolPurposeFlags](VkToolPurposeFlags.html)

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_NONE](VkAccessFlagBits.html)

Extending [VkAttachmentStoreOp](VkAttachmentStoreOp.html):

* 
[VK_ATTACHMENT_STORE_OP_NONE](VkAttachmentStoreOp.html)

Extending [VkDescriptorType](VkDescriptorType.html):

* 
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

Extending [VkDynamicState](VkDynamicState.html):

* 
[VK_DYNAMIC_STATE_CULL_MODE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_BIAS_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_COMPARE_OP](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_TEST_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DEPTH_WRITE_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_FRONT_FACE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_RESTART_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_PRIMITIVE_TOPOLOGY](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_RASTERIZER_DISCARD_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_STENCIL_TEST_ENABLE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_VERTEX_INPUT_BINDING_STRIDE](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT](VkDynamicState.html)

Extending [VkEventCreateFlagBits](VkEventCreateFlagBits.html):

* 
[VK_EVENT_CREATE_DEVICE_ONLY_BIT](VkEventCreateFlagBits.html)

Extending [VkFormat](VkFormat.html):

* 
[VK_FORMAT_A4B4G4R4_UNORM_PACK16](VkFormat.html)

* 
[VK_FORMAT_A4R4G4B4_UNORM_PACK16](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x10_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_10x8_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x10_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_12x12_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_4x4_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x4_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_5x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_6x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x5_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x6_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_ASTC_8x8_SFLOAT_BLOCK](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](VkFormat.html)

* 
[VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](VkFormat.html)

Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_FILTER_CUBIC_BIT](VkFormatFeatureFlagBits2.html)

Extending [VkImageAspectFlagBits](VkImageAspectFlagBits.html):

* 
[VK_IMAGE_ASPECT_NONE](VkImageAspectFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](VkImageLayout.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_PRIVATE_DATA_SLOT](VkObjectType.html)

Extending [VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html):

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_EARLY_RETURN_ON_FAILURE_BIT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT](VkPipelineCreateFlagBits.html)

Extending [VkPipelineShaderStageCreateFlagBits](VkPipelineShaderStageCreateFlagBits.html):

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT](VkPipelineShaderStageCreateFlagBits.html)

* 
[VK_PIPELINE_SHADER_STAGE_CREATE_REQUIRE_FULL_SUBGROUPS_BIT](VkPipelineShaderStageCreateFlagBits.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_NONE](VkPipelineStageFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_PIPELINE_COMPILE_REQUIRED](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BLIT_IMAGE_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_COPY_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_IMAGE_COPY_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_BUFFER_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_BUFFER_TO_IMAGE_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COPY_IMAGE_TO_BUFFER_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEPENDENCY_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_BLIT_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_COPY_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_RESOLVE_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_BARRIER_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DEMOTE_TO_HELPER_INVOCATION_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TERMINATE_INVOCATION_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SYNCHRONIZATION_2_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RESOLVE_IMAGE_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBMIT_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK](VkStructureType.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VK_VERSION_1_4](VK_VERSION_1_4.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/versions.html#versions-1.3).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
