# VK_VERSION_1_1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VERSION_1_1.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [New Macros](#_new_macros)
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

VK_VERSION_1_1 - Vulkan version 1.1

Vulkan Version 1.1 [promoted](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) a
number of key extensions into the core API:

* 

[VK_KHR_16bit_storage](VK_KHR_16bit_storage.html)

* 

[VK_KHR_bind_memory2](VK_KHR_bind_memory2.html)

* 

[VK_KHR_dedicated_allocation](VK_KHR_dedicated_allocation.html)

* 

[VK_KHR_descriptor_update_template](VK_KHR_descriptor_update_template.html)

* 

[VK_KHR_device_group](VK_KHR_device_group.html)

* 

[VK_KHR_device_group_creation](VK_KHR_device_group_creation.html)

* 

[VK_KHR_external_fence](VK_KHR_external_fence.html)

* 

[VK_KHR_external_fence_capabilities](VK_KHR_external_fence_capabilities.html)

* 

[VK_KHR_external_memory](VK_KHR_external_memory.html)

* 

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html)

* 

[VK_KHR_external_semaphore](VK_KHR_external_semaphore.html)

* 

[VK_KHR_external_semaphore_capabilities](VK_KHR_external_semaphore_capabilities.html)

* 

[VK_KHR_get_memory_requirements2](VK_KHR_get_memory_requirements2.html)

* 

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

* 

[VK_KHR_maintenance1](VK_KHR_maintenance1.html)

* 

[VK_KHR_maintenance2](VK_KHR_maintenance2.html)

* 

[VK_KHR_maintenance3](VK_KHR_maintenance3.html)

* 

[VK_KHR_multiview](VK_KHR_multiview.html)

* 

[VK_KHR_relaxed_block_layout](VK_KHR_relaxed_block_layout.html)

* 

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)

* 

[VK_KHR_shader_draw_parameters](VK_KHR_shader_draw_parameters.html)

* 

[VK_KHR_storage_buffer_storage_class](VK_KHR_storage_buffer_storage_class.html)

* 

[VK_KHR_variable_pointers](VK_KHR_variable_pointers.html)

All differences in behavior between these extensions and the corresponding
Vulkan 1.1 functionality are summarized below.

Differences Relative to `VK_KHR_16bit_storage`

If the `[VK_KHR_16bit_storage](VK_KHR_16bit_storage.html)` extension is not supported, support for
the [`storageBuffer16BitAccess`](../../../../spec/latest/chapters/features.html#features-storageBuffer16BitAccess)
feature is optional.
Support for this feature is defined by
[VkPhysicalDevice16BitStorageFeatures](VkPhysicalDevice16BitStorageFeatures.html)::`storageBuffer16BitAccess`
or [VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html)::`storageBuffer16BitAccess`
when queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_sampler_ycbcr_conversion`

If the `[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html)` extension is not supported,
support for the [`samplerYcbcrConversion`](../../../../spec/latest/chapters/features.html#features-samplerYcbcrConversion) feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceSamplerYcbcrConversionFeatures](VkPhysicalDeviceSamplerYcbcrConversionFeatures.html)::`samplerYcbcrConversion`
or [VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html)::`samplerYcbcrConversion`
when queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_shader_draw_parameters`

If the `[VK_KHR_shader_draw_parameters](VK_KHR_shader_draw_parameters.html)` extension is not supported,
support for the
[`SPV_KHR_shader_draw_parameters`](https://github.khronos.org/SPIRV-Registry/extensions/KHR/SPV_KHR_shader_draw_parameters.html)
SPIR-V extension is optional.
Support for this feature is defined by
[VkPhysicalDeviceShaderDrawParametersFeatures](VkPhysicalDeviceShaderDrawParametersFeatures.html)::`shaderDrawParameters`
or [VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html)::`shaderDrawParameters`
when queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

Differences Relative to `VK_KHR_variable_pointers`

If the `[VK_KHR_variable_pointers](VK_KHR_variable_pointers.html)` extension is not supported, support
for the [`variablePointersStorageBuffer`](../../../../spec/latest/chapters/features.html#features-variablePointersStorageBuffer) feature is optional.
Support for this feature is defined by
[VkPhysicalDeviceVariablePointersFeatures](VkPhysicalDeviceVariablePointersFeatures.html)::`variablePointersStorageBuffer`
or
[VkPhysicalDeviceVulkan11Features](VkPhysicalDeviceVulkan11Features.html)::`variablePointersStorageBuffer`
when queried via [vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html).

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
The [group operations](../../../../spec/latest/chapters/shaders.html#shaders-group-operations) and
[subgroup scope](../../../../spec/latest/chapters/shaders.html#shaders-scope-subgroup).

* 
The [protected memory](../../../../spec/latest/chapters/memory.html#memory-protected-memory) feature.

* 
A new command to enumerate the instance version:
[vkEnumerateInstanceVersion](vkEnumerateInstanceVersion.html).

* 
The [VkPhysicalDeviceShaderDrawParametersFeatures](VkPhysicalDeviceShaderDrawParametersFeatures.html) feature query
structure (where the `[VK_KHR_shader_draw_parameters](VK_KHR_shader_draw_parameters.html)` extension did
not have one).

* 
[VK_API_VERSION_1_1](VK_API_VERSION_1_1.html)

* 
[VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html)

* 
[VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html)

* 
[vkBindBufferMemory2](vkBindBufferMemory2.html)

* 
[vkBindImageMemory2](vkBindImageMemory2.html)

* 
[vkCmdDispatchBase](vkCmdDispatchBase.html)

* 
[vkCmdSetDeviceMask](vkCmdSetDeviceMask.html)

* 
[vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html)

* 
[vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html)

* 
[vkDestroyDescriptorUpdateTemplate](vkDestroyDescriptorUpdateTemplate.html)

* 
[vkDestroySamplerYcbcrConversion](vkDestroySamplerYcbcrConversion.html)

* 
[vkEnumerateInstanceVersion](vkEnumerateInstanceVersion.html)

* 
[vkEnumeratePhysicalDeviceGroups](vkEnumeratePhysicalDeviceGroups.html)

* 
[vkGetBufferMemoryRequirements2](vkGetBufferMemoryRequirements2.html)

* 
[vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html)

* 
[vkGetDeviceGroupPeerMemoryFeatures](vkGetDeviceGroupPeerMemoryFeatures.html)

* 
[vkGetDeviceQueue2](vkGetDeviceQueue2.html)

* 
[vkGetImageMemoryRequirements2](vkGetImageMemoryRequirements2.html)

* 
[vkGetImageSparseMemoryRequirements2](vkGetImageSparseMemoryRequirements2.html)

* 
[vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html)

* 
[vkGetPhysicalDeviceExternalFenceProperties](vkGetPhysicalDeviceExternalFenceProperties.html)

* 
[vkGetPhysicalDeviceExternalSemaphoreProperties](vkGetPhysicalDeviceExternalSemaphoreProperties.html)

* 
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html)

* 
[vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html)

* 
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)

* 
[vkGetPhysicalDeviceMemoryProperties2](vkGetPhysicalDeviceMemoryProperties2.html)

* 
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html)

* 
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html)

* 
[vkGetPhysicalDeviceSparseImageFormatProperties2](vkGetPhysicalDeviceSparseImageFormatProperties2.html)

* 
[vkTrimCommandPool](vkTrimCommandPool.html)

* 
[vkUpdateDescriptorSetWithTemplate](vkUpdateDescriptorSetWithTemplate.html)

* 
[VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html)

* 
[VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)

* 
[VkBufferMemoryRequirementsInfo2](VkBufferMemoryRequirementsInfo2.html)

* 
[VkDescriptorSetLayoutSupport](VkDescriptorSetLayoutSupport.html)

* 
[VkDescriptorUpdateTemplateCreateInfo](VkDescriptorUpdateTemplateCreateInfo.html)

* 
[VkDescriptorUpdateTemplateEntry](VkDescriptorUpdateTemplateEntry.html)

* 
[VkDeviceQueueInfo2](VkDeviceQueueInfo2.html)

* 
[VkExternalBufferProperties](VkExternalBufferProperties.html)

* 
[VkExternalFenceProperties](VkExternalFenceProperties.html)

* 
[VkExternalMemoryProperties](VkExternalMemoryProperties.html)

* 
[VkExternalSemaphoreProperties](VkExternalSemaphoreProperties.html)

* 
[VkFormatProperties2](VkFormatProperties2.html)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

* 
[VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html)

* 
[VkImageSparseMemoryRequirementsInfo2](VkImageSparseMemoryRequirementsInfo2.html)

* 
[VkInputAttachmentAspectReference](VkInputAttachmentAspectReference.html)

* 
[VkMemoryRequirements2](VkMemoryRequirements2.html)

* 
[VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html)

* 
[VkPhysicalDeviceExternalFenceInfo](VkPhysicalDeviceExternalFenceInfo.html)

* 
[VkPhysicalDeviceExternalSemaphoreInfo](VkPhysicalDeviceExternalSemaphoreInfo.html)

* 
[VkPhysicalDeviceGroupProperties](VkPhysicalDeviceGroupProperties.html)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

* 
[VkPhysicalDeviceMemoryProperties2](VkPhysicalDeviceMemoryProperties2.html)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

* 
[VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

* 
[VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html)

* 
[VkSparseImageFormatProperties2](VkSparseImageFormatProperties2.html)

* 
[VkSparseImageMemoryRequirements2](VkSparseImageMemoryRequirements2.html)

* 
Extending [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html):

[VkBindBufferMemoryDeviceGroupInfo](VkBindBufferMemoryDeviceGroupInfo.html)

Extending [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html):

* 
[VkBindImageMemoryDeviceGroupInfo](VkBindImageMemoryDeviceGroupInfo.html)

* 
[VkBindImagePlaneMemoryInfo](VkBindImagePlaneMemoryInfo.html)

Extending [VkBindSparseInfo](VkBindSparseInfo.html):

* 
[VkDeviceGroupBindSparseInfo](VkDeviceGroupBindSparseInfo.html)

Extending [VkBufferCreateInfo](VkBufferCreateInfo.html):

* 
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)

Extending [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html):

* 
[VkDeviceGroupCommandBufferBeginInfo](VkDeviceGroupCommandBufferBeginInfo.html)

Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkDeviceGroupDeviceCreateInfo](VkDeviceGroupDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

Extending [VkFenceCreateInfo](VkFenceCreateInfo.html):

* 
[VkExportFenceCreateInfo](VkExportFenceCreateInfo.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html):

* 
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)

Extending [VkImageFormatProperties2](VkImageFormatProperties2.html):

* 
[VkExternalImageFormatProperties](VkExternalImageFormatProperties.html)

* 
[VkSamplerYcbcrConversionImageFormatProperties](VkSamplerYcbcrConversionImageFormatProperties.html)

Extending [VkImageMemoryRequirementsInfo2](VkImageMemoryRequirementsInfo2.html):

* 
[VkImagePlaneMemoryRequirementsInfo](VkImagePlaneMemoryRequirementsInfo.html)

Extending [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

* 
[VkImageViewUsageCreateInfo](VkImageViewUsageCreateInfo.html)

Extending [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html):

* 
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)

* 
[VkMemoryAllocateFlagsInfo](VkMemoryAllocateFlagsInfo.html)

* 
[VkMemoryDedicatedAllocateInfo](VkMemoryDedicatedAllocateInfo.html)

Extending [VkMemoryRequirements2](VkMemoryRequirements2.html):

* 
[VkMemoryDedicatedRequirements](VkMemoryDedicatedRequirements.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevice16BitStorageFeatures](VkPhysicalDevice16BitStorageFeatures.html)

* 
[VkPhysicalDeviceMultiviewFeatures](VkPhysicalDeviceMultiviewFeatures.html)

* 
[VkPhysicalDeviceProtectedMemoryFeatures](VkPhysicalDeviceProtectedMemoryFeatures.html)

* 
[VkPhysicalDeviceSamplerYcbcrConversionFeatures](VkPhysicalDeviceSamplerYcbcrConversionFeatures.html)

* 
[VkPhysicalDeviceShaderDrawParameterFeatures](VkPhysicalDeviceShaderDrawParametersFeatures.html)

* 
[VkPhysicalDeviceShaderDrawParametersFeatures](VkPhysicalDeviceShaderDrawParametersFeatures.html)

* 
[VkPhysicalDeviceVariablePointerFeatures](VkPhysicalDeviceVariablePointersFeatures.html)

* 
[VkPhysicalDeviceVariablePointersFeatures](VkPhysicalDeviceVariablePointersFeatures.html)

Extending [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

* 
[VkPhysicalDeviceExternalImageFormatInfo](VkPhysicalDeviceExternalImageFormatInfo.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html)

* 
[VkPhysicalDeviceMaintenance3Properties](VkPhysicalDeviceMaintenance3Properties.html)

* 
[VkPhysicalDeviceMultiviewProperties](VkPhysicalDeviceMultiviewProperties.html)

* 
[VkPhysicalDevicePointClippingProperties](VkPhysicalDevicePointClippingProperties.html)

* 
[VkPhysicalDeviceProtectedMemoryProperties](VkPhysicalDeviceProtectedMemoryProperties.html)

* 
[VkPhysicalDeviceSubgroupProperties](VkPhysicalDeviceSubgroupProperties.html)

Extending [VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html):

* 
[VkPipelineTessellationDomainOriginStateCreateInfo](VkPipelineTessellationDomainOriginStateCreateInfo.html)

Extending [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkRenderingInfo](VkRenderingInfo.html):

* 
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html)

Extending [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html):

* 
[VkRenderPassInputAttachmentAspectCreateInfo](VkRenderPassInputAttachmentAspectCreateInfo.html)

* 
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)

Extending [VkSamplerCreateInfo](VkSamplerCreateInfo.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

* 
[VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html)

Extending [VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html):

* 
[VkExportSemaphoreCreateInfo](VkExportSemaphoreCreateInfo.html)

Extending [VkSubmitInfo](VkSubmitInfo.html):

* 
[VkDeviceGroupSubmitInfo](VkDeviceGroupSubmitInfo.html)

* 
[VkProtectedSubmitInfo](VkProtectedSubmitInfo.html)

* 
[VkChromaLocation](VkChromaLocation.html)

* 
[VkDescriptorUpdateTemplateType](VkDescriptorUpdateTemplateType.html)

* 
[VkDeviceQueueCreateFlagBits](VkDeviceQueueCreateFlagBits.html)

* 
[VkExternalFenceFeatureFlagBits](VkExternalFenceFeatureFlagBits.html)

* 
[VkExternalFenceHandleTypeFlagBits](VkExternalFenceHandleTypeFlagBits.html)

* 
[VkExternalMemoryFeatureFlagBits](VkExternalMemoryFeatureFlagBits.html)

* 
[VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html)

* 
[VkExternalSemaphoreFeatureFlagBits](VkExternalSemaphoreFeatureFlagBits.html)

* 
[VkExternalSemaphoreHandleTypeFlagBits](VkExternalSemaphoreHandleTypeFlagBits.html)

* 
[VkFenceImportFlagBits](VkFenceImportFlagBits.html)

* 
[VkMemoryAllocateFlagBits](VkMemoryAllocateFlagBits.html)

* 
[VkPeerMemoryFeatureFlagBits](VkPeerMemoryFeatureFlagBits.html)

* 
[VkPointClippingBehavior](VkPointClippingBehavior.html)

* 
[VkSamplerYcbcrModelConversion](VkSamplerYcbcrModelConversion.html)

* 
[VkSamplerYcbcrRange](VkSamplerYcbcrRange.html)

* 
[VkSemaphoreImportFlagBits](VkSemaphoreImportFlagBits.html)

* 
[VkSubgroupFeatureFlagBits](VkSubgroupFeatureFlagBits.html)

* 
[VkTessellationDomainOrigin](VkTessellationDomainOrigin.html)

* 
[VkCommandPoolTrimFlags](VkCommandPoolTrimFlags.html)

* 
[VkDescriptorUpdateTemplateCreateFlags](VkDescriptorUpdateTemplateCreateFlags.html)

* 
[VkExternalFenceFeatureFlags](VkExternalFenceFeatureFlags.html)

* 
[VkExternalFenceHandleTypeFlags](VkExternalFenceHandleTypeFlags.html)

* 
[VkExternalMemoryFeatureFlags](VkExternalMemoryFeatureFlags.html)

* 
[VkExternalMemoryHandleTypeFlags](VkExternalMemoryHandleTypeFlags.html)

* 
[VkExternalSemaphoreFeatureFlags](VkExternalSemaphoreFeatureFlags.html)

* 
[VkExternalSemaphoreHandleTypeFlags](VkExternalSemaphoreHandleTypeFlags.html)

* 
[VkFenceImportFlags](VkFenceImportFlags.html)

* 
[VkMemoryAllocateFlags](VkMemoryAllocateFlags.html)

* 
[VkPeerMemoryFeatureFlags](VkPeerMemoryFeatureFlags.html)

* 
[VkSemaphoreImportFlags](VkSemaphoreImportFlags.html)

* 
[VkSubgroupFeatureFlags](VkSubgroupFeatureFlags.html)

* 
[VK_LUID_SIZE](VK_LUID_SIZE.html)

* 
[VK_MAX_DEVICE_GROUP_SIZE](VK_MAX_DEVICE_GROUP_SIZE.html)

* 
[VK_QUEUE_FAMILY_EXTERNAL](VK_QUEUE_FAMILY_EXTERNAL.html)

* 
Extending [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html):

[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

Extending [VkCommandPoolCreateFlagBits](VkCommandPoolCreateFlagBits.html):

* 
[VK_COMMAND_POOL_CREATE_PROTECTED_BIT](VkCommandPoolCreateFlagBits.html)

Extending [VkDependencyFlagBits](VkDependencyFlagBits.html):

* 
[VK_DEPENDENCY_DEVICE_GROUP_BIT](VkDependencyFlagBits.html)

* 
[VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

Extending [VkDeviceQueueCreateFlagBits](VkDeviceQueueCreateFlagBits.html):

* 
[VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](VkDeviceQueueCreateFlagBits.html)

Extending [VkFormat](VkFormat.html):

* 
[VK_FORMAT_B10X6G10X6R10X6G10X6_422_UNORM_4PACK16](VkFormat.html)

* 
[VK_FORMAT_B12X4G12X4R12X4G12X4_422_UNORM_4PACK16](VkFormat.html)

* 
[VK_FORMAT_B16G16R16G16_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_B8G8R8G8_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_G10X6B10X6G10X6R10X6_422_UNORM_4PACK16](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_420_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6R10X6_2PLANE_422_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_420_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_422_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G10X6_B10X6_R10X6_3PLANE_444_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4B12X4G12X4R12X4_422_UNORM_4PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_420_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4R12X4_2PLANE_422_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_420_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_422_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G12X4_B12X4_R12X4_3PLANE_444_UNORM_3PACK16](VkFormat.html)

* 
[VK_FORMAT_G16B16G16R16_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_G16_B16R16_2PLANE_420_UNORM](VkFormat.html)

* 
[VK_FORMAT_G16_B16R16_2PLANE_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_420_UNORM](VkFormat.html)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_G16_B16_R16_3PLANE_444_UNORM](VkFormat.html)

* 
[VK_FORMAT_G8B8G8R8_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](VkFormat.html)

* 
[VK_FORMAT_G8_B8R8_2PLANE_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_420_UNORM](VkFormat.html)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_422_UNORM](VkFormat.html)

* 
[VK_FORMAT_G8_B8_R8_3PLANE_444_UNORM](VkFormat.html)

* 
[VK_FORMAT_R10X6G10X6B10X6A10X6_UNORM_4PACK16](VkFormat.html)

* 
[VK_FORMAT_R10X6G10X6_UNORM_2PACK16](VkFormat.html)

* 
[VK_FORMAT_R10X6_UNORM_PACK16](VkFormat.html)

* 
[VK_FORMAT_R12X4G12X4B12X4A12X4_UNORM_4PACK16](VkFormat.html)

* 
[VK_FORMAT_R12X4G12X4_UNORM_2PACK16](VkFormat.html)

* 
[VK_FORMAT_R12X4_UNORM_PACK16](VkFormat.html)

Extending [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html):

* 
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_DISJOINT_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_TRANSFER_DST_BIT](VkFormatFeatureFlagBits.html)

* 
[VK_FORMAT_FEATURE_TRANSFER_SRC_BIT](VkFormatFeatureFlagBits.html)

Extending [VkImageAspectFlagBits](VkImageAspectFlagBits.html):

* 
[VK_IMAGE_ASPECT_PLANE_0_BIT](VkImageAspectFlagBits.html)

* 
[VK_IMAGE_ASPECT_PLANE_1_BIT](VkImageAspectFlagBits.html)

* 
[VK_IMAGE_ASPECT_PLANE_2_BIT](VkImageAspectFlagBits.html)

Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

* 
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](VkImageCreateFlagBits.html)

* 
[VK_IMAGE_CREATE_ALIAS_BIT](VkImageCreateFlagBits.html)

* 
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html)

* 
[VK_IMAGE_CREATE_DISJOINT_BIT](VkImageCreateFlagBits.html)

* 
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](VkImageCreateFlagBits.html)

* 
[VK_IMAGE_CREATE_PROTECTED_BIT](VkImageCreateFlagBits.html)

* 
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](VkImageCreateFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

Extending [VkMemoryHeapFlagBits](VkMemoryHeapFlagBits.html):

* 
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](VkMemoryHeapFlagBits.html)

Extending [VkMemoryPropertyFlagBits](VkMemoryPropertyFlagBits.html):

* 
[VK_MEMORY_PROPERTY_PROTECTED_BIT](VkMemoryPropertyFlagBits.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE](VkObjectType.html)

* 
[VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION](VkObjectType.html)

Extending [VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html):

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_DISPATCH_BASE_BIT](VkPipelineCreateFlagBits.html)

* 
[VK_PIPELINE_CREATE_VIEW_INDEX_FROM_DEVICE_INDEX_BIT](VkPipelineCreateFlagBits.html)

Extending [VkQueueFlagBits](VkQueueFlagBits.html):

* 
[VK_QUEUE_PROTECTED_BIT](VkQueueFlagBits.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](VkResult.html)

* 
[VK_ERROR_OUT_OF_POOL_MEMORY](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_RENDER_PASS_BEGIN_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_GROUP_SUBMIT_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_QUEUE_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_FENCE_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FENCE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_POINT_CLIPPING_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETERS_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETER_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTER_FEATURES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_DOMAIN_ORIGIN_STATE_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PROTECTED_SUBMIT_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_MULTIVIEW_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2](VkStructureType.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VK_VERSION_1_4](VK_VERSION_1_4.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/versions.html#versions-1.1).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
