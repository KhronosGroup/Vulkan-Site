# VK_VERSION_1_2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VERSION_1_2.html

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

VK_VERSION_1_2 - Vulkan version 1.2

Vulkan Version 1.2 [promoted](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_8bit_storage](VK_KHR_8bit_storage.html)

* 

[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)

* 

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html)

* 

[VK_KHR_depth_stencil_resolve](VK_KHR_depth_stencil_resolve.html)

* 

[VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html)

* 

[VK_KHR_driver_properties](VK_KHR_driver_properties.html)

* 

[VK_KHR_image_format_list](VK_KHR_image_format_list.html)

* 

[VK_KHR_imageless_framebuffer](VK_KHR_imageless_framebuffer.html)

* 

[VK_KHR_sampler_mirror_clamp_to_edge](VK_KHR_sampler_mirror_clamp_to_edge.html)

* 

[VK_KHR_separate_depth_stencil_layouts](VK_KHR_separate_depth_stencil_layouts.html)

* 

[VK_KHR_shader_atomic_int64](VK_KHR_shader_atomic_int64.html)

* 

[VK_KHR_shader_float16_int8](VK_KHR_shader_float16_int8.html)

* 

[VK_KHR_shader_float_controls](VK_KHR_shader_float_controls.html)

* 

[VK_KHR_shader_subgroup_extended_types](VK_KHR_shader_subgroup_extended_types.html)

* 

[VK_KHR_spirv_1_4](VK_KHR_spirv_1_4.html)

* 

[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html)

* 

[VK_KHR_uniform_buffer_standard_layout](VK_KHR_uniform_buffer_standard_layout.html)

* 

[VK_KHR_vulkan_memory_model](VK_KHR_vulkan_memory_model.html)

* 

[VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html)

* 

[VK_EXT_host_query_reset](VK_EXT_host_query_reset.html)

* 

[VK_EXT_sampler_filter_minmax](VK_EXT_sampler_filter_minmax.html)

* 

[VK_EXT_scalar_block_layout](VK_EXT_scalar_block_layout.html)

* 

[VK_EXT_separate_stencil_usage](VK_EXT_separate_stencil_usage.html)

* 

[VK_EXT_shader_viewport_index_layer](VK_EXT_shader_viewport_index_layer.html)

All differences in behavior between these extensions and the corresponding
Vulkan 1.2 functionality are summarized below.

Differences Relative to `VK_KHR_8bit_storage`

If the `[VK_KHR_8bit_storage](VK_KHR_8bit_storage.html)` extension is not supported, support for
the SPIR-V [`storageBuffer8BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer8BitAccess) capability in shader modules is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`storageBuffer8BitAccess` when
queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_draw_indirect_count`

If the `[VK_KHR_draw_indirect_count](VK_KHR_draw_indirect_count.html)` extension is not supported,
support for the commands [vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html) and
[vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html) is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`drawIndirectCount` when queried
via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_sampler_mirror_clamp_to_edge`

If the `[VK_KHR_sampler_mirror_clamp_to_edge](VK_KHR_sampler_mirror_clamp_to_edge.html)` extension is not
supported, support for the [VkSamplerAddressMode](VkSamplerAddressMode.html)
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html) is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`samplerMirrorClampToEdge` when
queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_EXT_descriptor_indexing`

If the `[VK_EXT_descriptor_indexing](VK_EXT_descriptor_indexing.html)` extension is not supported,
support for the [`descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`descriptorIndexing` when
queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_EXT_scalar_block_layout`

If the `[VK_EXT_scalar_block_layout](VK_EXT_scalar_block_layout.html)` extension is not supported,
support for the [`scalarBlockLayout`](../../../../spec/latest/chapters/features.html#features-scalarBlockLayout)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`scalarBlockLayout` when queried
via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_EXT_shader_viewport_index_layer`

The `ShaderViewportIndexLayerEXT` SPIR-V capability was replaced with the
`ShaderViewportIndex` and `ShaderLayer` capabilities.
Declaring both is equivalent to declaring `ShaderViewportIndexLayerEXT`.
If the `[VK_EXT_shader_viewport_index_layer](VK_EXT_shader_viewport_index_layer.html)` extension is not
supported, support for the `ShaderViewportIndexLayerEXT` SPIR-V
capability is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`shaderOutputViewportIndex` and
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`shaderOutputLayer` when queried
via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_buffer_device_address`

If the `[VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html)` extension is not supported,
support for the [`bufferDeviceAddress`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddress)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`bufferDeviceAddress` when
queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_shader_atomic_int64`

If the `[VK_KHR_shader_atomic_int64](VK_KHR_shader_atomic_int64.html)` extension is not supported,
support for the [`shaderBufferInt64Atomics`](../../../../spec/latest/chapters/features.html#features-shaderBufferInt64Atomics) feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`shaderBufferInt64Atomics` when
queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_shader_float16_int8`

If the `[VK_KHR_shader_float16_int8](VK_KHR_shader_float16_int8.html)` extension is not supported,
support for the [`shaderFloat16`](../../../../spec/latest/chapters/features.html#features-shaderFloat16) and
[`shaderInt8`](../../../../spec/latest/chapters/features.html#features-shaderInt8) features is optional.
Support for these features are defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`shaderFloat16` and
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`shaderInt8` when queried via
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_vulkan_memory_model`

If the `[VK_KHR_vulkan_memory_model](VK_KHR_vulkan_memory_model.html)` extension is not supported,
support for the [`vulkanMemoryModel`](../../../../spec/latest/chapters/features.html#features-vulkanMemoryModel)
feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)::`vulkanMemoryModel` when queried
via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Additional Vulkan 1.2 Feature Support

In addition to the promoted extensions described above, Vulkan 1.2 added
support for:

* 
SPIR-V version 1.4.

* 
SPIR-V version 1.5.

* 
The [    `samplerMirrorClampToEdge`](../../../../spec/latest/chapters/features.html#features-samplerMirrorClampToEdge) feature which indicates whether the
implementation supports the
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html) sampler address mode.

* 
The [    `ShaderNonUniform`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderNonUniform) capability in SPIR-V version 1.5.

* 
The [    `shaderOutputViewportIndex`](../../../../spec/latest/chapters/features.html#features-shaderOutputViewportIndex) feature which indicates that the
[    `ShaderViewportIndex`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderViewportIndex) capability can be used.

* 
The [`shaderOutputLayer`](../../../../spec/latest/chapters/features.html#features-shaderOutputLayer) feature
which indicates that the [    `ShaderLayer`](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-ShaderLayer) capability can be used.

* 
The [    `subgroupBroadcastDynamicId`](../../../../spec/latest/chapters/features.html#features-subgroupBroadcastDynamicId) feature which allows the “Id”
operand of `OpGroupNonUniformBroadcast` to be dynamically uniform
within a subgroup, and the “Index” operand of
`OpGroupNonUniformQuadBroadcast` to be dynamically uniform within a
derivative group, in shader modules of version 1.5 or higher.

* 
The [`drawIndirectCount`](../../../../spec/latest/chapters/features.html#features-drawIndirectCount) feature
which indicates whether the [vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html) and
[vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html) functions can be used.

* 
The [`descriptorIndexing`](../../../../spec/latest/chapters/features.html#features-descriptorIndexing) feature
which indicates the implementation supports the minimum number of
descriptor indexing features as defined in the [    Feature Requirements](../../../../spec/latest/chapters/features.html#features-requirements) section.

* 
The [`samplerFilterMinmax`](../../../../spec/latest/chapters/features.html#features-samplerFilterMinmax) feature
which indicates whether the implementation supports the minimum number
of image formats that support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](VkFormatFeatureFlagBits.html) feature bit as
defined by the
[    `filterMinmaxSingleComponentFormats`](../../../../spec/latest/chapters/limits.html#limits-filterMinmaxSingleComponentFormats-minimum-requirements) property minimum
requirements.

* 
The [    `framebufferIntegerColorSampleCounts`](../../../../spec/latest/chapters/devsandqueues.html#limits-framebufferIntegerColorSampleCounts) limit which indicates the
color sample counts that are supported for all framebuffer color
attachments with integer formats.

* 
[VK_API_VERSION_1_2](VK_API_VERSION_1_2.html)

* 
[vkCmdBeginRenderPass2](vkCmdBeginRenderPass2.html)

* 
[vkCmdDrawIndexedIndirectCount](vkCmdDrawIndexedIndirectCount.html)

* 
[vkCmdDrawIndirectCount](vkCmdDrawIndirectCount.html)

* 
[vkCmdEndRenderPass2](vkCmdEndRenderPass2.html)

* 
[vkCmdNextSubpass2](vkCmdNextSubpass2.html)

* 
[vkCreateRenderPass2](vkCreateRenderPass2.html)

* 
[vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html)

* 
[vkGetBufferOpaqueCaptureAddress](vkGetBufferOpaqueCaptureAddress.html)

* 
[vkGetDeviceMemoryOpaqueCaptureAddress](vkGetDeviceMemoryOpaqueCaptureAddress.html)

* 
[vkGetSemaphoreCounterValue](vkGetSemaphoreCounterValue.html)

* 
[vkResetQueryPool](vkResetQueryPool.html)

* 
[vkSignalSemaphore](vkSignalSemaphore.html)

* 
[vkWaitSemaphores](vkWaitSemaphores.html)

* 
[VkAttachmentDescription2](VkAttachmentDescription2.html)

* 
[VkAttachmentReference2](VkAttachmentReference2.html)

* 
[VkBufferDeviceAddressInfo](VkBufferDeviceAddressInfo.html)

* 
[VkConformanceVersion](VkConformanceVersion.html)

* 
[VkDeviceMemoryOpaqueCaptureAddressInfo](VkDeviceMemoryOpaqueCaptureAddressInfo.html)

* 
[VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html)

* 
[VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)

* 
[VkSemaphoreSignalInfo](VkSemaphoreSignalInfo.html)

* 
[VkSemaphoreWaitInfo](VkSemaphoreWaitInfo.html)

* 
[VkSubpassBeginInfo](VkSubpassBeginInfo.html)

* 
[VkSubpassDependency2](VkSubpassDependency2.html)

* 
[VkSubpassDescription2](VkSubpassDescription2.html)

* 
[VkSubpassEndInfo](VkSubpassEndInfo.html)

* 
Extending [VkAttachmentDescription2](VkAttachmentDescription2.html):

[VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html)

Extending [VkAttachmentReference2](VkAttachmentReference2.html):

* 
[VkAttachmentReferenceStencilLayout](VkAttachmentReferenceStencilLayout.html)

Extending [VkBufferCreateInfo](VkBufferCreateInfo.html):

* 
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html)

Extending [VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html):

* 
[VkDescriptorSetVariableDescriptorCountAllocateInfo](VkDescriptorSetVariableDescriptorCountAllocateInfo.html)

Extending [VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html):

* 
[VkDescriptorSetLayoutBindingFlagsCreateInfo](VkDescriptorSetLayoutBindingFlagsCreateInfo.html)

Extending [VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html):

* 
[VkDescriptorSetVariableDescriptorCountLayoutSupport](VkDescriptorSetVariableDescriptorCountLayoutSupport.html)

Extending [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html):

* 
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

* 
[VkImageStencilUsageCreateInfo](VkImageStencilUsageCreateInfo.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

* 
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkMemoryOpaqueCaptureAddressAllocateInfo](VkMemoryOpaqueCaptureAddressAllocateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevice8BitStorageFeatures](VkPhysicalDevice8BitStorageFeatures.html)

* 
[VkPhysicalDeviceBufferDeviceAddressFeatures](VkPhysicalDeviceBufferDeviceAddressFeatures.html)

* 
[VkPhysicalDeviceDescriptorIndexingFeatures](VkPhysicalDeviceDescriptorIndexingFeatures.html)

* 
[VkPhysicalDeviceHostQueryResetFeatures](VkPhysicalDeviceHostQueryResetFeatures.html)

* 
[VkPhysicalDeviceImagelessFramebufferFeatures](VkPhysicalDeviceImagelessFramebufferFeatures.html)

* 
[VkPhysicalDeviceScalarBlockLayoutFeatures](VkPhysicalDeviceScalarBlockLayoutFeatures.html)

* 
[VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures](VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures.html)

* 
[VkPhysicalDeviceShaderAtomicInt64Features](VkPhysicalDeviceShaderAtomicInt64Features.html)

* 
[VkPhysicalDeviceShaderFloat16Int8Features](VkPhysicalDeviceShaderFloat16Int8Features.html)

* 
[VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures](VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures.html)

* 
[VkPhysicalDeviceTimelineSemaphoreFeatures](VkPhysicalDeviceTimelineSemaphoreFeatures.html)

* 
[VkPhysicalDeviceUniformBufferStandardLayoutFeatures](VkPhysicalDeviceUniformBufferStandardLayoutFeatures.html)

* 
[VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html)

* 
[VkPhysicalDeviceVulkan12Features](VkPhysicalDeviceVulkan12Features.html)

* 
[VkPhysicalDeviceVulkanMemoryModelFeatures](VkPhysicalDeviceVulkanMemoryModelFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)

* 
[VkPhysicalDeviceDescriptorIndexingProperties](VkPhysicalDeviceDescriptorIndexingProperties.html)

* 
[VkPhysicalDeviceDriverProperties](VkPhysicalDeviceDriverProperties.html)

* 
[VkPhysicalDeviceFloatControlsProperties](VkPhysicalDeviceFloatControlsProperties.html)

* 
[VkPhysicalDeviceSamplerFilterMinmaxProperties](VkPhysicalDeviceSamplerFilterMinmaxProperties.html)

* 
[VkPhysicalDeviceTimelineSemaphoreProperties](VkPhysicalDeviceTimelineSemaphoreProperties.html)

* 
[VkPhysicalDeviceVulkan11Properties](VkPhysicalDeviceVulkan11Properties.html)

* 
[VkPhysicalDeviceVulkan12Properties](VkPhysicalDeviceVulkan12Properties.html)

Extending [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html):

* 
[VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html):

* 
[VkSamplerReductionModeCreateInfo](VkSamplerReductionModeCreateInfo.html)

Extending [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html), [VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html):

* 
[VkSemaphoreTypeCreateInfo](VkSemaphoreTypeCreateInfo.html)

Extending [VkSubmitInfo](VkSubmitInfo.html), [VkBindSparseInfo](VkBindSparseInfo.html):

* 
[VkTimelineSemaphoreSubmitInfo](VkTimelineSemaphoreSubmitInfo.html)

Extending [VkSubpassDescription2](VkSubpassDescription2.html):

* 
[VkSubpassDescriptionDepthStencilResolve](VkSubpassDescriptionDepthStencilResolve.html)

* 
[VkDescriptorBindingFlagBits](VkDescriptorBindingFlagBits.html)

* 
[VkDriverId](VkDriverId.html)

* 
[VkResolveModeFlagBits](VkResolveModeFlagBits.html)

* 
[VkSamplerReductionMode](VkSamplerReductionMode.html)

* 
[VkSemaphoreType](VkSemaphoreType.html)

* 
[VkSemaphoreWaitFlagBits](VkSemaphoreWaitFlagBits.html)

* 
[VkShaderFloatControlsIndependence](VkShaderFloatControlsIndependence.html)

* 
[VkDescriptorBindingFlags](VkDescriptorBindingFlags.html)

* 
[VkResolveModeFlags](VkResolveModeFlags.html)

* 
[VkSemaphoreWaitFlags](VkSemaphoreWaitFlags.html)

* 
[VK_MAX_DRIVER_INFO_SIZE](VK_MAX_DRIVER_INFO_SIZE.html)

* 
[VK_MAX_DRIVER_NAME_SIZE](VK_MAX_DRIVER_NAME_SIZE.html)

* 
Extending [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html):

[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html)

Extending [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html):

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html)

Extending [VkDescriptorPoolCreateFlagBits](VkDescriptorPoolCreateFlagBits.html):

* 
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](VkDescriptorPoolCreateFlagBits.html)

Extending [VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html):

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](VkFormatFeatureFlagBits.html)

Extending [VkFramebufferCreateFlagBits](VkFramebufferCreateFlagBits.html):

* 
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

Extending [VkMemoryAllocateFlagBits](VkMemoryAllocateFlagBits.html):

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](VkMemoryAllocateFlagBits.html)

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkMemoryAllocateFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_FRAGMENTATION](VkResult.html)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html)

Extending [VkSamplerAddressMode](VkSamplerAddressMode.html):

* 
[VK_SAMPLER_ADDRESS_MODE_MIRROR_CLAMP_TO_EDGE](VkSamplerAddressMode.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_8BIT_STORAGE_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_QUERY_RESET_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGELESS_FRAMEBUFFER_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_FILTER_MINMAX_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCALAR_BLOCK_LAYOUT_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SEPARATE_DEPTH_STENCIL_LAYOUTS_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_INT64_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFORM_BUFFER_STANDARD_LAYOUT_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_MEMORY_MODEL_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_END_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO](VkStructureType.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VK_VERSION_1_4](VK_VERSION_1_4.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/versions.html#versions-1.2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
