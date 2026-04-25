# VkAllocationCallbacks(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAllocationCallbacks.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAllocationCallbacks - Structure containing callback function pointers for memory allocation

Allocators are provided by the application as a pointer to a
`VkAllocationCallbacks` structure:

// Provided by VK_VERSION_1_0
typedef struct VkAllocationCallbacks {
    void*                                   pUserData;
    PFN_vkAllocationFunction                pfnAllocation;
    PFN_vkReallocationFunction              pfnReallocation;
    PFN_vkFreeFunction                      pfnFree;
    PFN_vkInternalAllocationNotification    pfnInternalAllocation;
    PFN_vkInternalFreeNotification          pfnInternalFree;
} VkAllocationCallbacks;

* 
`pUserData` is NULL or an application-defined user data pointer to
be interpreted by the implementation of the callbacks.
When any of the callbacks in `VkAllocationCallbacks` are called, the
Vulkan implementation will pass this value as the first parameter to the
callback.
This value **can** vary each time an allocator is passed into a command,
even when the same object takes an allocator in multiple commands.

* 
`pfnAllocation` is a [PFN_vkAllocationFunction](PFN_vkAllocationFunction.html) pointer to an
application-defined memory allocation function.

* 
`pfnReallocation` is a [PFN_vkReallocationFunction](PFN_vkReallocationFunction.html) pointer to
an application-defined memory reallocation function.

* 
`pfnFree` is a [PFN_vkFreeFunction](PFN_vkFreeFunction.html) pointer to an
application-defined memory free function.

* 
`pfnInternalAllocation` is a
[PFN_vkInternalAllocationNotification](PFN_vkInternalAllocationNotification.html) pointer to an
application-defined function that is called by the implementation when
the implementation makes internal allocations.

* 
`pfnInternalFree` is a [PFN_vkInternalFreeNotification](PFN_vkInternalFreeNotification.html) pointer
to an application-defined function that is called by the implementation
when the implementation frees internal allocations.

Valid Usage

* 
[](#VUID-VkAllocationCallbacks-pfnAllocation-00632) VUID-VkAllocationCallbacks-pfnAllocation-00632

`pfnAllocation` **must** be a valid pointer to a valid
application-defined [PFN_vkAllocationFunction](PFN_vkAllocationFunction.html)

* 
[](#VUID-VkAllocationCallbacks-pfnReallocation-00633) VUID-VkAllocationCallbacks-pfnReallocation-00633

`pfnReallocation` **must** be a valid pointer to a valid
application-defined [PFN_vkReallocationFunction](PFN_vkReallocationFunction.html)

* 
[](#VUID-VkAllocationCallbacks-pfnFree-00634) VUID-VkAllocationCallbacks-pfnFree-00634

`pfnFree` **must** be a valid pointer to a valid application-defined
[PFN_vkFreeFunction](PFN_vkFreeFunction.html)

* 
[](#VUID-VkAllocationCallbacks-pfnInternalAllocation-00635) VUID-VkAllocationCallbacks-pfnInternalAllocation-00635

If either of `pfnInternalAllocation` or `pfnInternalFree` is not
`NULL`, both **must** be valid callbacks

[PFN_vkAllocationFunction](PFN_vkAllocationFunction.html), [PFN_vkFreeFunction](PFN_vkFreeFunction.html), [PFN_vkInternalAllocationNotification](PFN_vkInternalAllocationNotification.html), [PFN_vkInternalFreeNotification](PFN_vkInternalFreeNotification.html), [PFN_vkReallocationFunction](PFN_vkReallocationFunction.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [vkAllocateMemory](vkAllocateMemory.html), [vkCreateAccelerationStructure2KHR](vkCreateAccelerationStructure2KHR.html), [vkCreateAccelerationStructureKHR](vkCreateAccelerationStructureKHR.html), [vkCreateAccelerationStructureNV](vkCreateAccelerationStructureNV.html), [vkCreateAndroidSurfaceKHR](vkCreateAndroidSurfaceKHR.html), [vkCreateBuffer](vkCreateBuffer.html), [vkCreateBufferCollectionFUCHSIA](vkCreateBufferCollectionFUCHSIA.html), [vkCreateBufferView](vkCreateBufferView.html), [vkCreateCommandPool](vkCreateCommandPool.html), [vkCreateComputePipelines](vkCreateComputePipelines.html), [vkCreateCuFunctionNVX](vkCreateCuFunctionNVX.html), [vkCreateCuModuleNVX](vkCreateCuModuleNVX.html), [vkCreateCudaFunctionNV](vkCreateCudaFunctionNV.html), [vkCreateCudaModuleNV](vkCreateCudaModuleNV.html), [vkCreateDataGraphPipelineSessionARM](vkCreateDataGraphPipelineSessionARM.html), [vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html), [vkCreateDebugReportCallbackEXT](vkCreateDebugReportCallbackEXT.html), [vkCreateDebugUtilsMessengerEXT](vkCreateDebugUtilsMessengerEXT.html), [vkCreateDeferredOperationKHR](vkCreateDeferredOperationKHR.html), [vkCreateDescriptorPool](vkCreateDescriptorPool.html), [vkCreateDescriptorSetLayout](vkCreateDescriptorSetLayout.html), [vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html), [vkCreateDescriptorUpdateTemplate](vkCreateDescriptorUpdateTemplate.html), [vkCreateDevice](vkCreateDevice.html), [vkCreateDirectFBSurfaceEXT](vkCreateDirectFBSurfaceEXT.html), [vkCreateDisplayModeKHR](vkCreateDisplayModeKHR.html), [vkCreateDisplayPlaneSurfaceKHR](vkCreateDisplayPlaneSurfaceKHR.html), [vkCreateEvent](vkCreateEvent.html), [vkCreateExecutionGraphPipelinesAMDX](vkCreateExecutionGraphPipelinesAMDX.html), [vkCreateExternalComputeQueueNV](vkCreateExternalComputeQueueNV.html), [vkCreateFence](vkCreateFence.html), [vkCreateFramebuffer](vkCreateFramebuffer.html), [vkCreateGraphicsPipelines](vkCreateGraphicsPipelines.html), [vkCreateHeadlessSurfaceEXT](vkCreateHeadlessSurfaceEXT.html), [vkCreateIOSSurfaceMVK](vkCreateIOSSurfaceMVK.html), [vkCreateImage](vkCreateImage.html), [vkCreateImagePipeSurfaceFUCHSIA](vkCreateImagePipeSurfaceFUCHSIA.html), [vkCreateImageView](vkCreateImageView.html), [vkCreateIndirectCommandsLayoutEXT](vkCreateIndirectCommandsLayoutEXT.html), [vkCreateIndirectCommandsLayoutNV](vkCreateIndirectCommandsLayoutNV.html), [vkCreateIndirectExecutionSetEXT](vkCreateIndirectExecutionSetEXT.html), [vkCreateInstance](vkCreateInstance.html), [vkCreateMacOSSurfaceMVK](vkCreateMacOSSurfaceMVK.html), [vkCreateMetalSurfaceEXT](vkCreateMetalSurfaceEXT.html), [vkCreateMicromapEXT](vkCreateMicromapEXT.html), [vkCreateOpticalFlowSessionNV](vkCreateOpticalFlowSessionNV.html), [vkCreatePipelineBinariesKHR](vkCreatePipelineBinariesKHR.html), [vkCreatePipelineCache](vkCreatePipelineCache.html), [vkCreatePipelineLayout](vkCreatePipelineLayout.html), [vkCreatePrivateDataSlot](vkCreatePrivateDataSlot.html), [vkCreatePrivateDataSlot](vkCreatePrivateDataSlot.html), [vkCreateQueryPool](vkCreateQueryPool.html), [vkCreateRayTracingPipelinesKHR](vkCreateRayTracingPipelinesKHR.html), [vkCreateRayTracingPipelinesNV](vkCreateRayTracingPipelinesNV.html), [vkCreateRenderPass](vkCreateRenderPass.html), [vkCreateRenderPass2](vkCreateRenderPass2.html), [vkCreateRenderPass2](vkCreateRenderPass2.html), [vkCreateSampler](vkCreateSampler.html), [vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html), [vkCreateSamplerYcbcrConversion](vkCreateSamplerYcbcrConversion.html), [vkCreateScreenSurfaceQNX](vkCreateScreenSurfaceQNX.html), [vkCreateSemaphore](vkCreateSemaphore.html), [vkCreateShaderInstrumentationARM](vkCreateShaderInstrumentationARM.html), [vkCreateShaderModule](vkCreateShaderModule.html), [vkCreateShadersEXT](vkCreateShadersEXT.html), [vkCreateSharedSwapchainsKHR](vkCreateSharedSwapchainsKHR.html), [vkCreateStreamDescriptorSurfaceGGP](vkCreateStreamDescriptorSurfaceGGP.html), [vkCreateSurfaceOHOS](vkCreateSurfaceOHOS.html), [vkCreateSwapchainKHR](vkCreateSwapchainKHR.html), [vkCreateTensorARM](vkCreateTensorARM.html), [vkCreateTensorViewARM](vkCreateTensorViewARM.html), [vkCreateUbmSurfaceSEC](vkCreateUbmSurfaceSEC.html), [vkCreateValidationCacheEXT](vkCreateValidationCacheEXT.html), [vkCreateViSurfaceNN](vkCreateViSurfaceNN.html), [vkCreateVideoSessionKHR](vkCreateVideoSessionKHR.html), [vkCreateVideoSessionParametersKHR](vkCreateVideoSessionParametersKHR.html), [vkCreateWaylandSurfaceKHR](vkCreateWaylandSurfaceKHR.html), [vkCreateWin32SurfaceKHR](vkCreateWin32SurfaceKHR.html), [vkCreateXcbSurfaceKHR](vkCreateXcbSurfaceKHR.html), [vkCreateXlibSurfaceKHR](vkCreateXlibSurfaceKHR.html), [vkDestroyAccelerationStructureKHR](vkDestroyAccelerationStructureKHR.html), [vkDestroyAccelerationStructureNV](vkDestroyAccelerationStructureNV.html), [vkDestroyBuffer](vkDestroyBuffer.html), [vkDestroyBufferCollectionFUCHSIA](vkDestroyBufferCollectionFUCHSIA.html), [vkDestroyBufferView](vkDestroyBufferView.html), [vkDestroyCommandPool](vkDestroyCommandPool.html), [vkDestroyCuFunctionNVX](vkDestroyCuFunctionNVX.html), [vkDestroyCuModuleNVX](vkDestroyCuModuleNVX.html), [vkDestroyCudaFunctionNV](vkDestroyCudaFunctionNV.html), [vkDestroyCudaModuleNV](vkDestroyCudaModuleNV.html), [vkDestroyDataGraphPipelineSessionARM](vkDestroyDataGraphPipelineSessionARM.html), [vkDestroyDebugReportCallbackEXT](vkDestroyDebugReportCallbackEXT.html), [vkDestroyDebugUtilsMessengerEXT](vkDestroyDebugUtilsMessengerEXT.html), [vkDestroyDeferredOperationKHR](vkDestroyDeferredOperationKHR.html), [vkDestroyDescriptorPool](vkDestroyDescriptorPool.html), [vkDestroyDescriptorSetLayout](vkDestroyDescriptorSetLayout.html), [vkDestroyDescriptorUpdateTemplate](vkDestroyDescriptorUpdateTemplate.html), [vkDestroyDescriptorUpdateTemplate](vkDestroyDescriptorUpdateTemplate.html), [vkDestroyDevice](vkDestroyDevice.html), [vkDestroyEvent](vkDestroyEvent.html), [vkDestroyExternalComputeQueueNV](vkDestroyExternalComputeQueueNV.html), [vkDestroyFence](vkDestroyFence.html), [vkDestroyFramebuffer](vkDestroyFramebuffer.html), [vkDestroyImage](vkDestroyImage.html), [vkDestroyImageView](vkDestroyImageView.html), [vkDestroyIndirectCommandsLayoutEXT](vkDestroyIndirectCommandsLayoutEXT.html), [vkDestroyIndirectCommandsLayoutNV](vkDestroyIndirectCommandsLayoutNV.html), [vkDestroyIndirectExecutionSetEXT](vkDestroyIndirectExecutionSetEXT.html), [vkDestroyInstance](vkDestroyInstance.html), [vkDestroyMicromapEXT](vkDestroyMicromapEXT.html), [vkDestroyOpticalFlowSessionNV](vkDestroyOpticalFlowSessionNV.html), [vkDestroyPipeline](vkDestroyPipeline.html), [vkDestroyPipelineBinaryKHR](vkDestroyPipelineBinaryKHR.html), [vkDestroyPipelineCache](vkDestroyPipelineCache.html), [vkDestroyPipelineLayout](vkDestroyPipelineLayout.html), [vkDestroyPrivateDataSlot](vkDestroyPrivateDataSlot.html), [vkDestroyPrivateDataSlot](vkDestroyPrivateDataSlot.html), [vkDestroyQueryPool](vkDestroyQueryPool.html), [vkDestroyRenderPass](vkDestroyRenderPass.html), [vkDestroySampler](vkDestroySampler.html), [vkDestroySamplerYcbcrConversion](vkDestroySamplerYcbcrConversion.html), [vkDestroySamplerYcbcrConversion](vkDestroySamplerYcbcrConversion.html), [vkDestroySemaphore](vkDestroySemaphore.html), [vkDestroyShaderEXT](vkDestroyShaderEXT.html), [vkDestroyShaderInstrumentationARM](vkDestroyShaderInstrumentationARM.html), [vkDestroyShaderModule](vkDestroyShaderModule.html), [vkDestroySurfaceKHR](vkDestroySurfaceKHR.html), [vkDestroySwapchainKHR](vkDestroySwapchainKHR.html), [vkDestroyTensorARM](vkDestroyTensorARM.html), [vkDestroyTensorViewARM](vkDestroyTensorViewARM.html), [vkDestroyValidationCacheEXT](vkDestroyValidationCacheEXT.html), [vkDestroyVideoSessionKHR](vkDestroyVideoSessionKHR.html), [vkDestroyVideoSessionParametersKHR](vkDestroyVideoSessionParametersKHR.html), [vkFreeMemory](vkFreeMemory.html), [vkRegisterDeviceEventEXT](vkRegisterDeviceEventEXT.html), [vkRegisterDisplayEventEXT](vkRegisterDisplayEventEXT.html), [vkReleaseCapturedPipelineDataKHR](vkReleaseCapturedPipelineDataKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#VkAllocationCallbacks).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
