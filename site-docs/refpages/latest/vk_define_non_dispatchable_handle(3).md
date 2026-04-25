# VK_DEFINE_NON_DISPATCHABLE_HANDLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_DEFINE_NON_DISPATCHABLE_HANDLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_DEFINE_NON_DISPATCHABLE_HANDLE - Declare a non-dispatchable object handle

`VK_DEFINE_NON_DISPATCHABLE_HANDLE` defines a
[non-dispatchable handle](../../../../spec/latest/chapters/fundamentals.html#fundamentals-objectmodel-overview) type.

// Provided by VK_VERSION_1_0
#ifndef VK_DEFINE_NON_DISPATCHABLE_HANDLE
    #if (VK_USE_64_BIT_PTR_DEFINES==1)
        #define VK_DEFINE_NON_DISPATCHABLE_HANDLE(object) typedef struct object##_T *object;
    #else
        #define VK_DEFINE_NON_DISPATCHABLE_HANDLE(object) typedef uint64_t object;
    #endif
#endif

* 
`object` is the name of the resulting C type.

Most Vulkan handle types, such as [VkBuffer](VkBuffer.html), are non-dispatchable.

|  | The `vulkan_core.h` header allows the
| --- | --- |
[VK_DEFINE_NON_DISPATCHABLE_HANDLE](#) and [VK_NULL_HANDLE](VK_NULL_HANDLE.html) definitions
to be overridden by the application.
If [VK_DEFINE_NON_DISPATCHABLE_HANDLE](#) is already defined when
`vulkan_core.h` is compiled, the default definitions for
[VK_DEFINE_NON_DISPATCHABLE_HANDLE](#) and [VK_NULL_HANDLE](VK_NULL_HANDLE.html) are
skipped.
This allows the application to define a binary-compatible custom handle
which **may** provide more type-safety or other features needed by the
application.
Applications **must** not define handles in a way that is not binary compatible
- where binary compatibility is platform dependent. |

[VK_NULL_HANDLE](VK_NULL_HANDLE.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkBuffer](VkBuffer.html), [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html), [VkBufferView](VkBufferView.html), [VkCommandPool](VkCommandPool.html), [VkCuFunctionNVX](VkCuFunctionNVX.html), [VkCuModuleNVX](VkCuModuleNVX.html), [VkCudaFunctionNV](VkCudaFunctionNV.html), [VkCudaModuleNV](VkCudaModuleNV.html), [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html), [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html), [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDescriptorPool](VkDescriptorPool.html), [VkDescriptorSet](VkDescriptorSet.html), [VkDescriptorSetLayout](VkDescriptorSetLayout.html), [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html), [VkDeviceMemory](VkDeviceMemory.html), [VkDisplayKHR](VkDisplayKHR.html), [VkDisplayModeKHR](VkDisplayModeKHR.html), [VkEvent](VkEvent.html), [VkFence](VkFence.html), [VkFramebuffer](VkFramebuffer.html), [VkImage](VkImage.html), [VkImageView](VkImageView.html), [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html), [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html), [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html), [VkMicromapEXT](VkMicromapEXT.html), [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html), [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html), [VkPipeline](VkPipeline.html), [VkPipelineBinaryKHR](VkPipelineBinaryKHR.html), [VkPipelineCache](VkPipelineCache.html), [VkPipelineLayout](VkPipelineLayout.html), [VkPrivateDataSlot](VkPrivateDataSlot.html), [VkQueryPool](VkQueryPool.html), [VkRenderPass](VkRenderPass.html), [VkSampler](VkSampler.html), [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html), [VkSemaphore](VkSemaphore.html), [VkShaderEXT](VkShaderEXT.html), [VkShaderInstrumentationARM](VkShaderInstrumentationARM.html), [VkShaderModule](VkShaderModule.html), [VkSurfaceKHR](VkSurfaceKHR.html), [VkSwapchainKHR](VkSwapchainKHR.html), [VkTensorARM](VkTensorARM.html), [VkTensorViewARM](VkTensorViewARM.html), [VkValidationCacheEXT](VkValidationCacheEXT.html), [VkVideoSessionKHR](VkVideoSessionKHR.html), [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/boilerplate.html#VK_DEFINE_NON_DISPATCHABLE_HANDLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
