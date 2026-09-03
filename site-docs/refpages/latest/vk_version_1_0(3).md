# VK_VERSION_1_0(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_VERSION_1_0.html

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
- [New Unions](#_new_unions)
- [New Function Pointers](#_new_function_pointers)
- [New_Function_Pointers](#_new_function_pointers)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Headers](#_new_headers)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_VERSION_1_0 - Vulkan version 1.0

Vulkan Version 1.0 was the initial release of the Vulkan API.

* 
[VK_API_VERSION](VK_API_VERSION.html)

* 
[VK_API_VERSION_1_0](VK_API_VERSION_1_0.html)

* 
[VK_API_VERSION_MAJOR](VK_API_VERSION_MAJOR.html)

* 
[VK_API_VERSION_MINOR](VK_API_VERSION_MINOR.html)

* 
[VK_API_VERSION_PATCH](VK_API_VERSION_PATCH.html)

* 
[VK_API_VERSION_VARIANT](VK_API_VERSION_VARIANT.html)

* 
[VK_DEFINE_HANDLE](VK_DEFINE_HANDLE.html)

* 
[VK_DEFINE_NON_DISPATCHABLE_HANDLE](VK_DEFINE_NON_DISPATCHABLE_HANDLE.html)

* 
[VK_HEADER_VERSION](VK_HEADER_VERSION.html)

* 
[VK_HEADER_VERSION_COMPLETE](VK_HEADER_VERSION_COMPLETE.html)

* 
[VK_MAKE_API_VERSION](VK_MAKE_API_VERSION.html)

* 
[VK_MAKE_VERSION](VK_MAKE_VERSION.html)

* 
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[VK_USE_64_BIT_PTR_DEFINES](VK_USE_64_BIT_PTR_DEFINES.html)

* 
[VK_VERSION_MAJOR](VK_VERSION_MAJOR.html)

* 
[VK_VERSION_MINOR](VK_VERSION_MINOR.html)

* 
[VK_VERSION_PATCH](VK_VERSION_PATCH.html)

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
[VkBuffer](VkBuffer.html)

* 
[VkBufferView](VkBufferView.html)

* 
[VkCommandBuffer](VkCommandBuffer.html)

* 
[VkCommandPool](VkCommandPool.html)

* 
[VkDescriptorPool](VkDescriptorPool.html)

* 
[VkDescriptorSet](VkDescriptorSet.html)

* 
[VkDescriptorSetLayout](VkDescriptorSetLayout.html)

* 
[VkDevice](VkDevice.html)

* 
[VkDeviceMemory](VkDeviceMemory.html)

* 
[VkEvent](VkEvent.html)

* 
[VkFence](VkFence.html)

* 
[VkFramebuffer](VkFramebuffer.html)

* 
[VkImage](VkImage.html)

* 
[VkImageView](VkImageView.html)

* 
[VkInstance](VkInstance.html)

* 
[VkPhysicalDevice](VkPhysicalDevice.html)

* 
[VkPipeline](VkPipeline.html)

* 
[VkPipelineCache](VkPipelineCache.html)

* 
[VkPipelineLayout](VkPipelineLayout.html)

* 
[VkQueryPool](VkQueryPool.html)

* 
[VkQueue](VkQueue.html)

* 
[VkRenderPass](VkRenderPass.html)

* 
[VkSampler](VkSampler.html)

* 
[VkSemaphore](VkSemaphore.html)

* 
[VkShaderModule](VkShaderModule.html)

* 
[vkAllocateCommandBuffers](vkAllocateCommandBuffers.html)

* 
[vkAllocateDescriptorSets](vkAllocateDescriptorSets.html)

* 
[vkAllocateMemory](vkAllocateMemory.html)

* 
[vkBeginCommandBuffer](vkBeginCommandBuffer.html)

* 
[vkBindBufferMemory](vkBindBufferMemory.html)

* 
[vkBindImageMemory](vkBindImageMemory.html)

* 
[vkCmdBeginQuery](vkCmdBeginQuery.html)

* 
[vkCmdBeginRenderPass](vkCmdBeginRenderPass.html)

* 
[vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html)

* 
[vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html)

* 
[vkCmdBindPipeline](vkCmdBindPipeline.html)

* 
[vkCmdBindVertexBuffers](vkCmdBindVertexBuffers.html)

* 
[vkCmdBlitImage](vkCmdBlitImage.html)

* 
[vkCmdClearAttachments](vkCmdClearAttachments.html)

* 
[vkCmdClearColorImage](vkCmdClearColorImage.html)

* 
[vkCmdClearDepthStencilImage](vkCmdClearDepthStencilImage.html)

* 
[vkCmdCopyBuffer](vkCmdCopyBuffer.html)

* 
[vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html)

* 
[vkCmdCopyImage](vkCmdCopyImage.html)

* 
[vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html)

* 
[vkCmdCopyQueryPoolResults](vkCmdCopyQueryPoolResults.html)

* 
[vkCmdDispatch](vkCmdDispatch.html)

* 
[vkCmdDispatchIndirect](vkCmdDispatchIndirect.html)

* 
[vkCmdDraw](vkCmdDraw.html)

* 
[vkCmdDrawIndexed](vkCmdDrawIndexed.html)

* 
[vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html)

* 
[vkCmdDrawIndirect](vkCmdDrawIndirect.html)

* 
[vkCmdEndQuery](vkCmdEndQuery.html)

* 
[vkCmdEndRenderPass](vkCmdEndRenderPass.html)

* 
[vkCmdExecuteCommands](vkCmdExecuteCommands.html)

* 
[vkCmdFillBuffer](vkCmdFillBuffer.html)

* 
[vkCmdNextSubpass](vkCmdNextSubpass.html)

* 
[vkCmdPipelineBarrier](vkCmdPipelineBarrier.html)

* 
[vkCmdPushConstants](vkCmdPushConstants.html)

* 
[vkCmdResetEvent](vkCmdResetEvent.html)

* 
[vkCmdResetQueryPool](vkCmdResetQueryPool.html)

* 
[vkCmdResolveImage](vkCmdResolveImage.html)

* 
[vkCmdSetBlendConstants](vkCmdSetBlendConstants.html)

* 
[vkCmdSetDepthBias](vkCmdSetDepthBias.html)

* 
[vkCmdSetDepthBounds](vkCmdSetDepthBounds.html)

* 
[vkCmdSetEvent](vkCmdSetEvent.html)

* 
[vkCmdSetLineWidth](vkCmdSetLineWidth.html)

* 
[vkCmdSetScissor](vkCmdSetScissor.html)

* 
[vkCmdSetStencilCompareMask](vkCmdSetStencilCompareMask.html)

* 
[vkCmdSetStencilReference](vkCmdSetStencilReference.html)

* 
[vkCmdSetStencilWriteMask](vkCmdSetStencilWriteMask.html)

* 
[vkCmdSetViewport](vkCmdSetViewport.html)

* 
[vkCmdUpdateBuffer](vkCmdUpdateBuffer.html)

* 
[vkCmdWaitEvents](vkCmdWaitEvents.html)

* 
[vkCmdWriteTimestamp](vkCmdWriteTimestamp.html)

* 
[vkCreateBuffer](vkCreateBuffer.html)

* 
[vkCreateBufferView](vkCreateBufferView.html)

* 
[vkCreateCommandPool](vkCreateCommandPool.html)

* 
[vkCreateComputePipelines](vkCreateComputePipelines.html)

* 
[vkCreateDescriptorPool](vkCreateDescriptorPool.html)

* 
[vkCreateDescriptorSetLayout](vkCreateDescriptorSetLayout.html)

* 
[vkCreateDevice](vkCreateDevice.html)

* 
[vkCreateEvent](vkCreateEvent.html)

* 
[vkCreateFence](vkCreateFence.html)

* 
[vkCreateFramebuffer](vkCreateFramebuffer.html)

* 
[vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html)

* 
[vkCreateImage](vkCreateImage.html)

* 
[vkCreateImageView](vkCreateImageView.html)

* 
[vkCreateInstance](vkCreateInstance.html)

* 
[vkCreatePipelineCache](vkCreatePipelineCache.html)

* 
[vkCreatePipelineLayout](vkCreatePipelineLayout.html)

* 
[vkCreateQueryPool](vkCreateQueryPool.html)

* 
[vkCreateRenderPass](vkCreateRenderPass.html)

* 
[vkCreateSampler](vkCreateSampler.html)

* 
[vkCreateSemaphore](vkCreateSemaphore.html)

* 
[vkCreateShaderModule](vkCreateShaderModule.html)

* 
[vkDestroyBuffer](vkDestroyBuffer.html)

* 
[vkDestroyBufferView](vkDestroyBufferView.html)

* 
[vkDestroyCommandPool](vkDestroyCommandPool.html)

* 
[vkDestroyDescriptorPool](vkDestroyDescriptorPool.html)

* 
[vkDestroyDescriptorSetLayout](vkDestroyDescriptorSetLayout.html)

* 
[vkDestroyDevice](vkDestroyDevice.html)

* 
[vkDestroyEvent](vkDestroyEvent.html)

* 
[vkDestroyFence](vkDestroyFence.html)

* 
[vkDestroyFramebuffer](vkDestroyFramebuffer.html)

* 
[vkDestroyImage](vkDestroyImage.html)

* 
[vkDestroyImageView](vkDestroyImageView.html)

* 
[vkDestroyInstance](vkDestroyInstance.html)

* 
[vkDestroyPipeline](vkDestroyPipeline.html)

* 
[vkDestroyPipelineCache](vkDestroyPipelineCache.html)

* 
[vkDestroyPipelineLayout](vkDestroyPipelineLayout.html)

* 
[vkDestroyQueryPool](vkDestroyQueryPool.html)

* 
[vkDestroyRenderPass](vkDestroyRenderPass.html)

* 
[vkDestroySampler](vkDestroySampler.html)

* 
[vkDestroySemaphore](vkDestroySemaphore.html)

* 
[vkDestroyShaderModule](vkDestroyShaderModule.html)

* 
[vkDeviceWaitIdle](vkDeviceWaitIdle.html)

* 
[vkEndCommandBuffer](vkEndCommandBuffer.html)

* 
[vkEnumerateDeviceExtensionProperties](vkEnumerateDeviceExtensionProperties.html)

* 
[vkEnumerateDeviceLayerProperties](vkEnumerateDeviceLayerProperties.html)

* 
[vkEnumerateInstanceExtensionProperties](vkEnumerateInstanceExtensionProperties.html)

* 
[vkEnumerateInstanceLayerProperties](vkEnumerateInstanceLayerProperties.html)

* 
[vkEnumeratePhysicalDevices](vkEnumeratePhysicalDevices.html)

* 
[vkFlushMappedMemoryRanges](vkFlushMappedMemoryRanges.html)

* 
[vkFreeCommandBuffers](vkFreeCommandBuffers.html)

* 
[vkFreeDescriptorSets](vkFreeDescriptorSets.html)

* 
[vkFreeMemory](vkFreeMemory.html)

* 
[vkGetBufferMemoryRequirements](vkGetBufferMemoryRequirements.html)

* 
[vkGetDeviceMemoryCommitment](vkGetDeviceMemoryCommitment.html)

* 
[vkGetDeviceProcAddr](vkGetDeviceProcAddr.html)

* 
[vkGetDeviceQueue](vkGetDeviceQueue.html)

* 
[vkGetEventStatus](vkGetEventStatus.html)

* 
[vkGetFenceStatus](vkGetFenceStatus.html)

* 
[vkGetImageMemoryRequirements](vkGetImageMemoryRequirements.html)

* 
[vkGetImageSparseMemoryRequirements](vkGetImageSparseMemoryRequirements.html)

* 
[vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html)

* 
[vkGetInstanceProcAddr](vkGetInstanceProcAddr.html)

* 
[vkGetPhysicalDeviceFeatures](vkGetPhysicalDeviceFeatures.html)

* 
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html)

* 
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html)

* 
[vkGetPhysicalDeviceMemoryProperties](vkGetPhysicalDeviceMemoryProperties.html)

* 
[vkGetPhysicalDeviceProperties](vkGetPhysicalDeviceProperties.html)

* 
[vkGetPhysicalDeviceQueueFamilyProperties](vkGetPhysicalDeviceQueueFamilyProperties.html)

* 
[vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html)

* 
[vkGetPipelineCacheData](vkGetPipelineCacheData.html)

* 
[vkGetQueryPoolResults](vkGetQueryPoolResults.html)

* 
[vkGetRenderAreaGranularity](vkGetRenderAreaGranularity.html)

* 
[vkInvalidateMappedMemoryRanges](vkInvalidateMappedMemoryRanges.html)

* 
[vkMapMemory](vkMapMemory.html)

* 
[vkMergePipelineCaches](vkMergePipelineCaches.html)

* 
[vkQueueBindSparse](vkQueueBindSparse.html)

* 
[vkQueueSubmit](vkQueueSubmit.html)

* 
[vkQueueWaitIdle](vkQueueWaitIdle.html)

* 
[vkResetCommandBuffer](vkResetCommandBuffer.html)

* 
[vkResetCommandPool](vkResetCommandPool.html)

* 
[vkResetDescriptorPool](vkResetDescriptorPool.html)

* 
[vkResetEvent](vkResetEvent.html)

* 
[vkResetFences](vkResetFences.html)

* 
[vkSetEvent](vkSetEvent.html)

* 
[vkUnmapMemory](vkUnmapMemory.html)

* 
[vkUpdateDescriptorSets](vkUpdateDescriptorSets.html)

* 
[vkWaitForFences](vkWaitForFences.html)

* 
[VkAllocationCallbacks](VkAllocationCallbacks.html)

* 
[VkApplicationInfo](VkApplicationInfo.html)

* 
[VkAttachmentDescription](VkAttachmentDescription.html)

* 
[VkAttachmentReference](VkAttachmentReference.html)

* 
[VkBaseInStructure](VkBaseInStructure.html)

* 
[VkBaseOutStructure](VkBaseOutStructure.html)

* 
[VkBindSparseInfo](VkBindSparseInfo.html)

* 
[VkBufferCopy](VkBufferCopy.html)

* 
[VkBufferCreateInfo](VkBufferCreateInfo.html)

* 
[VkBufferImageCopy](VkBufferImageCopy.html)

* 
[VkBufferMemoryBarrier](VkBufferMemoryBarrier.html)

* 
[VkBufferViewCreateInfo](VkBufferViewCreateInfo.html)

* 
[VkClearAttachment](VkClearAttachment.html)

* 
[VkClearDepthStencilValue](VkClearDepthStencilValue.html)

* 
[VkClearRect](VkClearRect.html)

* 
[VkCommandBufferAllocateInfo](VkCommandBufferAllocateInfo.html)

* 
[VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html)

* 
[VkCommandBufferInheritanceInfo](VkCommandBufferInheritanceInfo.html)

* 
[VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html)

* 
[VkComponentMapping](VkComponentMapping.html)

* 
[VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html)

* 
[VkCopyDescriptorSet](VkCopyDescriptorSet.html)

* 
[VkDescriptorBufferInfo](VkDescriptorBufferInfo.html)

* 
[VkDescriptorImageInfo](VkDescriptorImageInfo.html)

* 
[VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html)

* 
[VkDescriptorPoolSize](VkDescriptorPoolSize.html)

* 
[VkDescriptorSetAllocateInfo](VkDescriptorSetAllocateInfo.html)

* 
[VkDescriptorSetLayoutBinding](VkDescriptorSetLayoutBinding.html)

* 
[VkDescriptorSetLayoutCreateInfo](VkDescriptorSetLayoutCreateInfo.html)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)

* 
[VkDispatchIndirectCommand](VkDispatchIndirectCommand.html)

* 
[VkDrawIndexedIndirectCommand](VkDrawIndexedIndirectCommand.html)

* 
[VkDrawIndirectCommand](VkDrawIndirectCommand.html)

* 
[VkEventCreateInfo](VkEventCreateInfo.html)

* 
[VkExtensionProperties](VkExtensionProperties.html)

* 
[VkExtent2D](VkExtent2D.html)

* 
[VkExtent3D](VkExtent3D.html)

* 
[VkFenceCreateInfo](VkFenceCreateInfo.html)

* 
[VkFormatProperties](VkFormatProperties.html)

* 
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)

* 
[VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html)

* 
[VkImageBlit](VkImageBlit.html)

* 
[VkImageCopy](VkImageCopy.html)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkImageFormatProperties](VkImageFormatProperties.html)

* 
[VkImageMemoryBarrier](VkImageMemoryBarrier.html)

* 
[VkImageResolve](VkImageResolve.html)

* 
[VkImageSubresource](VkImageSubresource.html)

* 
[VkImageSubresourceLayers](VkImageSubresourceLayers.html)

* 
[VkImageSubresourceRange](VkImageSubresourceRange.html)

* 
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)

* 
[VkInstanceCreateInfo](VkInstanceCreateInfo.html)

* 
[VkLayerProperties](VkLayerProperties.html)

* 
[VkMappedMemoryRange](VkMappedMemoryRange.html)

* 
[VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)

* 
[VkMemoryBarrier](VkMemoryBarrier.html)

* 
[VkMemoryHeap](VkMemoryHeap.html)

* 
[VkMemoryRequirements](VkMemoryRequirements.html)

* 
[VkMemoryType](VkMemoryType.html)

* 
[VkOffset2D](VkOffset2D.html)

* 
[VkOffset3D](VkOffset3D.html)

* 
[VkPhysicalDeviceFeatures](VkPhysicalDeviceFeatures.html)

* 
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)

* 
[VkPhysicalDeviceMemoryProperties](VkPhysicalDeviceMemoryProperties.html)

* 
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)

* 
[VkPhysicalDeviceSparseProperties](VkPhysicalDeviceSparseProperties.html)

* 
[VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)

* 
[VkPipelineCacheHeaderVersionOne](VkPipelineCacheHeaderVersionOne.html)

* 
[VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)

* 
[VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html)

* 
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)

* 
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)

* 
[VkPipelineInputAssemblyStateCreateInfo](VkPipelineInputAssemblyStateCreateInfo.html)

* 
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

* 
[VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

* 
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html)

* 
[VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

* 
[VkPushConstantRange](VkPushConstantRange.html)

* 
[VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html)

* 
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)

* 
[VkRect2D](VkRect2D.html)

* 
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)

* 
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

* 
[VkSemaphoreCreateInfo](VkSemaphoreCreateInfo.html)

* 
[VkSparseBufferMemoryBindInfo](VkSparseBufferMemoryBindInfo.html)

* 
[VkSparseImageFormatProperties](VkSparseImageFormatProperties.html)

* 
[VkSparseImageMemoryBind](VkSparseImageMemoryBind.html)

* 
[VkSparseImageMemoryBindInfo](VkSparseImageMemoryBindInfo.html)

* 
[VkSparseImageMemoryRequirements](VkSparseImageMemoryRequirements.html)

* 
[VkSparseImageOpaqueMemoryBindInfo](VkSparseImageOpaqueMemoryBindInfo.html)

* 
[VkSparseMemoryBind](VkSparseMemoryBind.html)

* 
[VkSpecializationInfo](VkSpecializationInfo.html)

* 
[VkSpecializationMapEntry](VkSpecializationMapEntry.html)

* 
[VkStencilOpState](VkStencilOpState.html)

* 
[VkSubmitInfo](VkSubmitInfo.html)

* 
[VkSubpassDependency](VkSubpassDependency.html)

* 
[VkSubpassDescription](VkSubpassDescription.html)

* 
[VkSubresourceLayout](VkSubresourceLayout.html)

* 
[VkVertexInputAttributeDescription](VkVertexInputAttributeDescription.html)

* 
[VkVertexInputBindingDescription](VkVertexInputBindingDescription.html)

* 
[VkViewport](VkViewport.html)

* 
[VkWriteDescriptorSet](VkWriteDescriptorSet.html)

* 
Extending [VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html), [VkPushConstantsInfo](VkPushConstantsInfo.html), [VkPushDescriptorSetInfo](VkPushDescriptorSetInfo.html), [VkPushDescriptorSetWithTemplateInfo](VkPushDescriptorSetWithTemplateInfo.html), [VkSetDescriptorBufferOffsetsInfoEXT](VkSetDescriptorBufferOffsetsInfoEXT.html), [VkBindDescriptorBufferEmbeddedSamplersInfoEXT](VkBindDescriptorBufferEmbeddedSamplersInfoEXT.html), [VkIndirectCommandsLayoutCreateInfoEXT](VkIndirectCommandsLayoutCreateInfoEXT.html):

[VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)

Extending [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html):

* 
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html)

* 
[VkClearColorValue](VkClearColorValue.html)

* 
[VkClearValue](VkClearValue.html)

* 
[PFN_vkAllocationFunction](PFN_vkAllocationFunction.html)

* 
[PFN_vkFreeFunction](PFN_vkFreeFunction.html)

* 
[PFN_vkInternalAllocationNotification](PFN_vkInternalAllocationNotification.html)

* 
[PFN_vkInternalFreeNotification](PFN_vkInternalFreeNotification.html)

* 
[PFN_vkReallocationFunction](PFN_vkReallocationFunction.html)

* 
[PFN_vkVoidFunction](PFN_vkVoidFunction.html)

* 
[VkAccessFlagBits](VkAccessFlagBits.html)

* 
[VkAttachmentDescriptionFlagBits](VkAttachmentDescriptionFlagBits.html)

* 
[VkAttachmentLoadOp](VkAttachmentLoadOp.html)

* 
[VkAttachmentStoreOp](VkAttachmentStoreOp.html)

* 
[VkBlendFactor](VkBlendFactor.html)

* 
[VkBlendOp](VkBlendOp.html)

* 
[VkBorderColor](VkBorderColor.html)

* 
[VkBufferCreateFlagBits](VkBufferCreateFlagBits.html)

* 
[VkBufferUsageFlagBits](VkBufferUsageFlagBits.html)

* 
[VkColorComponentFlagBits](VkColorComponentFlagBits.html)

* 
[VkCommandBufferLevel](VkCommandBufferLevel.html)

* 
[VkCommandBufferResetFlagBits](VkCommandBufferResetFlagBits.html)

* 
[VkCommandBufferUsageFlagBits](VkCommandBufferUsageFlagBits.html)

* 
[VkCommandPoolCreateFlagBits](VkCommandPoolCreateFlagBits.html)

* 
[VkCommandPoolResetFlagBits](VkCommandPoolResetFlagBits.html)

* 
[VkCompareOp](VkCompareOp.html)

* 
[VkComponentSwizzle](VkComponentSwizzle.html)

* 
[VkCullModeFlagBits](VkCullModeFlagBits.html)

* 
[VkDependencyFlagBits](VkDependencyFlagBits.html)

* 
[VkDescriptorPoolCreateFlagBits](VkDescriptorPoolCreateFlagBits.html)

* 
[VkDescriptorSetLayoutCreateFlagBits](VkDescriptorSetLayoutCreateFlagBits.html)

* 
[VkDescriptorType](VkDescriptorType.html)

* 
[VkDynamicState](VkDynamicState.html)

* 
[VkEventCreateFlagBits](VkEventCreateFlagBits.html)

* 
[VkFenceCreateFlagBits](VkFenceCreateFlagBits.html)

* 
[VkFilter](VkFilter.html)

* 
[VkFormat](VkFormat.html)

* 
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html)

* 
[VkFramebufferCreateFlagBits](VkFramebufferCreateFlagBits.html)

* 
[VkFrontFace](VkFrontFace.html)

* 
[VkImageAspectFlagBits](VkImageAspectFlagBits.html)

* 
[VkImageCreateFlagBits](VkImageCreateFlagBits.html)

* 
[VkImageLayout](VkImageLayout.html)

* 
[VkImageTiling](VkImageTiling.html)

* 
[VkImageType](VkImageType.html)

* 
[VkImageUsageFlagBits](VkImageUsageFlagBits.html)

* 
[VkImageViewCreateFlagBits](VkImageViewCreateFlagBits.html)

* 
[VkImageViewType](VkImageViewType.html)

* 
[VkIndexType](VkIndexType.html)

* 
[VkInstanceCreateFlagBits](VkInstanceCreateFlagBits.html)

* 
[VkInternalAllocationType](VkInternalAllocationType.html)

* 
[VkLogicOp](VkLogicOp.html)

* 
[VkMemoryHeapFlagBits](VkMemoryHeapFlagBits.html)

* 
[VkMemoryMapFlagBits](VkMemoryMapFlagBits.html)

* 
[VkMemoryPropertyFlagBits](VkMemoryPropertyFlagBits.html)

* 
[VkObjectType](VkObjectType.html)

* 
[VkPhysicalDeviceType](VkPhysicalDeviceType.html)

* 
[VkPipelineBindPoint](VkPipelineBindPoint.html)

* 
[VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html)

* 
[VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html)

* 
[VkPipelineColorBlendStateCreateFlagBits](VkPipelineColorBlendStateCreateFlagBits.html)

* 
[VkPipelineCreateFlagBits](VkPipelineCreateFlagBits.html)

* 
[VkPipelineDepthStencilStateCreateFlagBits](VkPipelineDepthStencilStateCreateFlagBits.html)

* 
[VkPipelineLayoutCreateFlagBits](VkPipelineLayoutCreateFlagBits.html)

* 
[VkPipelineShaderStageCreateFlagBits](VkPipelineShaderStageCreateFlagBits.html)

* 
[VkPipelineStageFlagBits](VkPipelineStageFlagBits.html)

* 
[VkPolygonMode](VkPolygonMode.html)

* 
[VkPrimitiveTopology](VkPrimitiveTopology.html)

* 
[VkQueryControlFlagBits](VkQueryControlFlagBits.html)

* 
[VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html)

* 
[VkQueryPoolCreateFlagBits](VkQueryPoolCreateFlagBits.html)

* 
[VkQueryResultFlagBits](VkQueryResultFlagBits.html)

* 
[VkQueryType](VkQueryType.html)

* 
[VkQueueFlagBits](VkQueueFlagBits.html)

* 
[VkRenderPassCreateFlagBits](VkRenderPassCreateFlagBits.html)

* 
[VkResult](VkResult.html)

* 
[VkSampleCountFlagBits](VkSampleCountFlagBits.html)

* 
[VkSamplerAddressMode](VkSamplerAddressMode.html)

* 
[VkSamplerCreateFlagBits](VkSamplerCreateFlagBits.html)

* 
[VkSamplerMipmapMode](VkSamplerMipmapMode.html)

* 
[VkShaderStageFlagBits](VkShaderStageFlagBits.html)

* 
[VkSharingMode](VkSharingMode.html)

* 
[VkSparseImageFormatFlagBits](VkSparseImageFormatFlagBits.html)

* 
[VkSparseMemoryBindFlagBits](VkSparseMemoryBindFlagBits.html)

* 
[VkStencilFaceFlagBits](VkStencilFaceFlagBits.html)

* 
[VkStencilOp](VkStencilOp.html)

* 
[VkStructureType](VkStructureType.html)

* 
[VkSubpassContents](VkSubpassContents.html)

* 
[VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html)

* 
[VkSystemAllocationScope](VkSystemAllocationScope.html)

* 
[VkVendorId](VkVendorId.html)

* 
[VkVertexInputRate](VkVertexInputRate.html)

* 
[VkAccessFlags](VkAccessFlags.html)

* 
[VkAttachmentDescriptionFlags](VkAttachmentDescriptionFlags.html)

* 
[VkBufferCreateFlags](VkBufferCreateFlags.html)

* 
[VkBufferUsageFlags](VkBufferUsageFlags.html)

* 
[VkBufferViewCreateFlags](VkBufferViewCreateFlags.html)

* 
[VkColorComponentFlags](VkColorComponentFlags.html)

* 
[VkCommandBufferResetFlags](VkCommandBufferResetFlags.html)

* 
[VkCommandBufferUsageFlags](VkCommandBufferUsageFlags.html)

* 
[VkCommandPoolCreateFlags](VkCommandPoolCreateFlags.html)

* 
[VkCommandPoolResetFlags](VkCommandPoolResetFlags.html)

* 
[VkCullModeFlags](VkCullModeFlags.html)

* 
[VkDependencyFlags](VkDependencyFlags.html)

* 
[VkDescriptorPoolCreateFlags](VkDescriptorPoolCreateFlags.html)

* 
[VkDescriptorPoolResetFlags](VkDescriptorPoolResetFlags.html)

* 
[VkDescriptorSetLayoutCreateFlags](VkDescriptorSetLayoutCreateFlags.html)

* 
[VkDeviceCreateFlags](VkDeviceCreateFlags.html)

* 
[VkDeviceQueueCreateFlags](VkDeviceQueueCreateFlags.html)

* 
[VkEventCreateFlags](VkEventCreateFlags.html)

* 
[VkFenceCreateFlags](VkFenceCreateFlags.html)

* 
[VkFormatFeatureFlags](VkFormatFeatureFlags.html)

* 
[VkFramebufferCreateFlags](VkFramebufferCreateFlags.html)

* 
[VkImageAspectFlags](VkImageAspectFlags.html)

* 
[VkImageCreateFlags](VkImageCreateFlags.html)

* 
[VkImageUsageFlags](VkImageUsageFlags.html)

* 
[VkImageViewCreateFlags](VkImageViewCreateFlags.html)

* 
[VkInstanceCreateFlags](VkInstanceCreateFlags.html)

* 
[VkMemoryHeapFlags](VkMemoryHeapFlags.html)

* 
[VkMemoryMapFlags](VkMemoryMapFlags.html)

* 
[VkMemoryPropertyFlags](VkMemoryPropertyFlags.html)

* 
[VkPipelineCacheCreateFlags](VkPipelineCacheCreateFlags.html)

* 
[VkPipelineColorBlendStateCreateFlags](VkPipelineColorBlendStateCreateFlags.html)

* 
[VkPipelineCreateFlags](VkPipelineCreateFlags.html)

* 
[VkPipelineDepthStencilStateCreateFlags](VkPipelineDepthStencilStateCreateFlags.html)

* 
[VkPipelineDynamicStateCreateFlags](VkPipelineDynamicStateCreateFlags.html)

* 
[VkPipelineInputAssemblyStateCreateFlags](VkPipelineInputAssemblyStateCreateFlags.html)

* 
[VkPipelineLayoutCreateFlags](VkPipelineLayoutCreateFlags.html)

* 
[VkPipelineMultisampleStateCreateFlags](VkPipelineMultisampleStateCreateFlags.html)

* 
[VkPipelineRasterizationStateCreateFlags](VkPipelineRasterizationStateCreateFlags.html)

* 
[VkPipelineShaderStageCreateFlags](VkPipelineShaderStageCreateFlags.html)

* 
[VkPipelineStageFlags](VkPipelineStageFlags.html)

* 
[VkPipelineTessellationStateCreateFlags](VkPipelineTessellationStateCreateFlags.html)

* 
[VkPipelineVertexInputStateCreateFlags](VkPipelineVertexInputStateCreateFlags.html)

* 
[VkPipelineViewportStateCreateFlags](VkPipelineViewportStateCreateFlags.html)

* 
[VkQueryControlFlags](VkQueryControlFlags.html)

* 
[VkQueryPipelineStatisticFlags](VkQueryPipelineStatisticFlags.html)

* 
[VkQueryPoolCreateFlags](VkQueryPoolCreateFlags.html)

* 
[VkQueryResultFlags](VkQueryResultFlags.html)

* 
[VkQueueFlags](VkQueueFlags.html)

* 
[VkRenderPassCreateFlags](VkRenderPassCreateFlags.html)

* 
[VkSampleCountFlags](VkSampleCountFlags.html)

* 
[VkSamplerCreateFlags](VkSamplerCreateFlags.html)

* 
[VkSemaphoreCreateFlags](VkSemaphoreCreateFlags.html)

* 
[VkShaderModuleCreateFlags](VkShaderModuleCreateFlags.html)

* 
[VkShaderStageFlags](VkShaderStageFlags.html)

* 
[VkSparseImageFormatFlags](VkSparseImageFormatFlags.html)

* 
[VkSparseMemoryBindFlags](VkSparseMemoryBindFlags.html)

* 
[VkStencilFaceFlags](VkStencilFaceFlags.html)

* 
[VkSubpassDescriptionFlags](VkSubpassDescriptionFlags.html)

* 
`vk_platform`

* 
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[VK_FALSE](VK_FALSE.html)

* 
[VK_LOD_CLAMP_NONE](VK_LOD_CLAMP_NONE.html)

* 
[VK_MAX_DESCRIPTION_SIZE](VK_MAX_DESCRIPTION_SIZE.html)

* 
[VK_MAX_EXTENSION_NAME_SIZE](VK_MAX_EXTENSION_NAME_SIZE.html)

* 
[VK_MAX_MEMORY_HEAPS](VK_MAX_MEMORY_HEAPS.html)

* 
[VK_MAX_MEMORY_TYPES](VK_MAX_MEMORY_TYPES.html)

* 
[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](VK_MAX_PHYSICAL_DEVICE_NAME_SIZE.html)

* 
[VK_QUEUE_FAMILY_IGNORED](VK_QUEUE_FAMILY_IGNORED.html)

* 
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html)

* 
[VK_REMAINING_MIP_LEVELS](VK_REMAINING_MIP_LEVELS.html)

* 
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html)

* 
[VK_TRUE](VK_TRUE.html)

* 
[VK_UUID_SIZE](VK_UUID_SIZE.html)

* 
[VK_WHOLE_SIZE](VK_WHOLE_SIZE.html)

* 
Extending [VkResult](VkResult.html):

[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_1](VK_VERSION_1_1.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VK_VERSION_1_4](VK_VERSION_1_4.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/versions.html#versions-1.0).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
