# VkObjectType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkObjectType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkObjectType - Specify an enumeration to track object handle types

The [VkObjectType](#) enumeration defines values, each of which corresponds
to a specific Vulkan handle type.
These values **can** be used to associate debug information with a particular
type of object through one or more extensions.

// Provided by VK_VERSION_1_0
typedef enum VkObjectType {
    VK_OBJECT_TYPE_UNKNOWN = 0,
    VK_OBJECT_TYPE_INSTANCE = 1,
    VK_OBJECT_TYPE_PHYSICAL_DEVICE = 2,
    VK_OBJECT_TYPE_DEVICE = 3,
    VK_OBJECT_TYPE_QUEUE = 4,
    VK_OBJECT_TYPE_SEMAPHORE = 5,
    VK_OBJECT_TYPE_COMMAND_BUFFER = 6,
    VK_OBJECT_TYPE_FENCE = 7,
    VK_OBJECT_TYPE_DEVICE_MEMORY = 8,
    VK_OBJECT_TYPE_BUFFER = 9,
    VK_OBJECT_TYPE_IMAGE = 10,
    VK_OBJECT_TYPE_EVENT = 11,
    VK_OBJECT_TYPE_QUERY_POOL = 12,
    VK_OBJECT_TYPE_BUFFER_VIEW = 13,
    VK_OBJECT_TYPE_IMAGE_VIEW = 14,
    VK_OBJECT_TYPE_SHADER_MODULE = 15,
    VK_OBJECT_TYPE_PIPELINE_CACHE = 16,
    VK_OBJECT_TYPE_PIPELINE_LAYOUT = 17,
    VK_OBJECT_TYPE_RENDER_PASS = 18,
    VK_OBJECT_TYPE_PIPELINE = 19,
    VK_OBJECT_TYPE_DESCRIPTOR_SET_LAYOUT = 20,
    VK_OBJECT_TYPE_SAMPLER = 21,
    VK_OBJECT_TYPE_DESCRIPTOR_POOL = 22,
    VK_OBJECT_TYPE_DESCRIPTOR_SET = 23,
    VK_OBJECT_TYPE_FRAMEBUFFER = 24,
    VK_OBJECT_TYPE_COMMAND_POOL = 25,
  // Provided by VK_VERSION_1_1
    VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE = 1000085000,
  // Provided by VK_VERSION_1_1
    VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION = 1000156000,
  // Provided by VK_VERSION_1_3
    VK_OBJECT_TYPE_PRIVATE_DATA_SLOT = 1000295000,
  // Provided by VK_KHR_surface
    VK_OBJECT_TYPE_SURFACE_KHR = 1000000000,
  // Provided by VK_KHR_swapchain
    VK_OBJECT_TYPE_SWAPCHAIN_KHR = 1000001000,
  // Provided by VK_KHR_display
    VK_OBJECT_TYPE_DISPLAY_KHR = 1000002000,
  // Provided by VK_KHR_display
    VK_OBJECT_TYPE_DISPLAY_MODE_KHR = 1000002001,
  // Provided by VK_EXT_debug_report
    VK_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT = 1000011000,
  // Provided by VK_KHR_video_queue
    VK_OBJECT_TYPE_VIDEO_SESSION_KHR = 1000023000,
  // Provided by VK_KHR_video_queue
    VK_OBJECT_TYPE_VIDEO_SESSION_PARAMETERS_KHR = 1000023001,
  // Provided by VK_NVX_binary_import
    VK_OBJECT_TYPE_CU_MODULE_NVX = 1000029000,
  // Provided by VK_NVX_binary_import
    VK_OBJECT_TYPE_CU_FUNCTION_NVX = 1000029001,
  // Provided by VK_EXT_debug_utils
    VK_OBJECT_TYPE_DEBUG_UTILS_MESSENGER_EXT = 1000128000,
  // Provided by VK_KHR_acceleration_structure
    VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_KHR = 1000150000,
  // Provided by VK_EXT_validation_cache
    VK_OBJECT_TYPE_VALIDATION_CACHE_EXT = 1000160000,
  // Provided by VK_NV_ray_tracing
    VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_NV = 1000165000,
  // Provided by VK_INTEL_performance_query
    VK_OBJECT_TYPE_PERFORMANCE_CONFIGURATION_INTEL = 1000210000,
  // Provided by VK_KHR_deferred_host_operations
    VK_OBJECT_TYPE_DEFERRED_OPERATION_KHR = 1000268000,
  // Provided by VK_NV_device_generated_commands
    VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_NV = 1000277000,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_cuda_kernel_launch
    VK_OBJECT_TYPE_CUDA_MODULE_NV = 1000307000,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_cuda_kernel_launch
    VK_OBJECT_TYPE_CUDA_FUNCTION_NV = 1000307001,
#endif
  // Provided by VK_FUCHSIA_buffer_collection
    VK_OBJECT_TYPE_BUFFER_COLLECTION_FUCHSIA = 1000366000,
  // Provided by VK_EXT_opacity_micromap
    VK_OBJECT_TYPE_MICROMAP_EXT = 1000396000,
  // Provided by VK_ARM_tensors
    VK_OBJECT_TYPE_TENSOR_ARM = 1000460000,
  // Provided by VK_ARM_tensors
    VK_OBJECT_TYPE_TENSOR_VIEW_ARM = 1000460001,
  // Provided by VK_NV_optical_flow
    VK_OBJECT_TYPE_OPTICAL_FLOW_SESSION_NV = 1000464000,
  // Provided by VK_EXT_shader_object
    VK_OBJECT_TYPE_SHADER_EXT = 1000482000,
  // Provided by VK_KHR_pipeline_binary
    VK_OBJECT_TYPE_PIPELINE_BINARY_KHR = 1000483000,
  // Provided by VK_ARM_data_graph
    VK_OBJECT_TYPE_DATA_GRAPH_PIPELINE_SESSION_ARM = 1000507000,
  // Provided by VK_NV_external_compute_queue
    VK_OBJECT_TYPE_EXTERNAL_COMPUTE_QUEUE_NV = 1000556000,
  // Provided by VK_EXT_device_generated_commands
    VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_EXT = 1000572000,
  // Provided by VK_EXT_device_generated_commands
    VK_OBJECT_TYPE_INDIRECT_EXECUTION_SET_EXT = 1000572001,
  // Provided by VK_ARM_shader_instrumentation
    VK_OBJECT_TYPE_SHADER_INSTRUMENTATION_ARM = 1000607000,
  // Provided by VK_KHR_descriptor_update_template
    VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_KHR = VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_KHR = VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION,
  // Provided by VK_EXT_private_data
    VK_OBJECT_TYPE_PRIVATE_DATA_SLOT_EXT = VK_OBJECT_TYPE_PRIVATE_DATA_SLOT,
} VkObjectType;

| [VkObjectType](#) | Vulkan Handle Type |
| --- | --- |
| [VK_OBJECT_TYPE_UNKNOWN](#) | Unknown/Undefined Handle |
| [VK_OBJECT_TYPE_INSTANCE](#) | [VkInstance](VkInstance.html) |
| [VK_OBJECT_TYPE_PHYSICAL_DEVICE](#) | [VkPhysicalDevice](VkPhysicalDevice.html) |
| [VK_OBJECT_TYPE_DEVICE](#) | [VkDevice](VkDevice.html) |
| [VK_OBJECT_TYPE_QUEUE](#) | [VkQueue](VkQueue.html) |
| [VK_OBJECT_TYPE_SEMAPHORE](#) | [VkSemaphore](VkSemaphore.html) |
| [VK_OBJECT_TYPE_COMMAND_BUFFER](#) | [VkCommandBuffer](VkCommandBuffer.html) |
| [VK_OBJECT_TYPE_FENCE](#) | [VkFence](VkFence.html) |
| [VK_OBJECT_TYPE_DEVICE_MEMORY](#) | [VkDeviceMemory](VkDeviceMemory.html) |
| [VK_OBJECT_TYPE_BUFFER](#) | [VkBuffer](VkBuffer.html) |
| [VK_OBJECT_TYPE_IMAGE](#) | [VkImage](VkImage.html) |
| [VK_OBJECT_TYPE_EVENT](#) | [VkEvent](VkEvent.html) |
| [VK_OBJECT_TYPE_QUERY_POOL](#) | [VkQueryPool](VkQueryPool.html) |
| [VK_OBJECT_TYPE_BUFFER_VIEW](#) | [VkBufferView](VkBufferView.html) |
| [VK_OBJECT_TYPE_IMAGE_VIEW](#) | [VkImageView](VkImageView.html) |
| [VK_OBJECT_TYPE_SHADER_MODULE](#) | [VkShaderModule](VkShaderModule.html) |
| [VK_OBJECT_TYPE_PIPELINE_CACHE](#) | [VkPipelineCache](VkPipelineCache.html) |
| [VK_OBJECT_TYPE_PIPELINE_LAYOUT](#) | [VkPipelineLayout](VkPipelineLayout.html) |
| [VK_OBJECT_TYPE_RENDER_PASS](#) | [VkRenderPass](VkRenderPass.html) |
| [VK_OBJECT_TYPE_PIPELINE](#) | [VkPipeline](VkPipeline.html) |
| [VK_OBJECT_TYPE_DESCRIPTOR_SET_LAYOUT](#) | [VkDescriptorSetLayout](VkDescriptorSetLayout.html) |
| [VK_OBJECT_TYPE_SAMPLER](#) | [VkSampler](VkSampler.html) |
| [VK_OBJECT_TYPE_DESCRIPTOR_POOL](#) | [VkDescriptorPool](VkDescriptorPool.html) |
| [VK_OBJECT_TYPE_DESCRIPTOR_SET](#) | [VkDescriptorSet](VkDescriptorSet.html) |
| [VK_OBJECT_TYPE_FRAMEBUFFER](#) | [VkFramebuffer](VkFramebuffer.html) |
| [VK_OBJECT_TYPE_COMMAND_POOL](#) | [VkCommandPool](VkCommandPool.html) |
| [VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION](#) | [VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html) |
| [VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE](#) | [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html) |
| [VK_OBJECT_TYPE_PRIVATE_DATA_SLOT](#) | [VkPrivateDataSlot](VkPrivateDataSlot.html) |
| [VK_OBJECT_TYPE_SURFACE_KHR](#) | [VkSurfaceKHR](VkSurfaceKHR.html) |
| [VK_OBJECT_TYPE_SWAPCHAIN_KHR](#) | [VkSwapchainKHR](VkSwapchainKHR.html) |
| [VK_OBJECT_TYPE_DISPLAY_KHR](#) | [VkDisplayKHR](VkDisplayKHR.html) |
| [VK_OBJECT_TYPE_DISPLAY_MODE_KHR](#) | [VkDisplayModeKHR](VkDisplayModeKHR.html) |
| [VK_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT](#) | [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html) |
| [VK_OBJECT_TYPE_VIDEO_SESSION_KHR](#) | [VkVideoSessionKHR](VkVideoSessionKHR.html) |
| [VK_OBJECT_TYPE_VIDEO_SESSION_PARAMETERS_KHR](#) | [VkVideoSessionParametersKHR](VkVideoSessionParametersKHR.html) |
| [VK_OBJECT_TYPE_DEBUG_UTILS_MESSENGER_EXT](#) | [VkDebugUtilsMessengerEXT](VkDebugUtilsMessengerEXT.html) |
| [VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_KHR](#) | [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) |
| [VK_OBJECT_TYPE_VALIDATION_CACHE_EXT](#) | [VkValidationCacheEXT](VkValidationCacheEXT.html) |
| [VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_NV](#) | [VkAccelerationStructureNV](VkAccelerationStructureNV.html) |
| [VK_OBJECT_TYPE_PERFORMANCE_CONFIGURATION_INTEL](#) | [VkPerformanceConfigurationINTEL](VkPerformanceConfigurationINTEL.html) |
| [VK_OBJECT_TYPE_DEFERRED_OPERATION_KHR](#) | [VkDeferredOperationKHR](VkDeferredOperationKHR.html) |
| [VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_NV](#) | [VkIndirectCommandsLayoutNV](VkIndirectCommandsLayoutNV.html) |
| [VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_EXT](#) | [VkIndirectCommandsLayoutEXT](VkIndirectCommandsLayoutEXT.html) |
| [VK_OBJECT_TYPE_INDIRECT_EXECUTION_SET_EXT](#) | [VkIndirectExecutionSetEXT](VkIndirectExecutionSetEXT.html) |
| [VK_OBJECT_TYPE_BUFFER_COLLECTION_FUCHSIA](#) | [VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html) |
| [VK_OBJECT_TYPE_MICROMAP_EXT](#) | [VkMicromapEXT](VkMicromapEXT.html) |
| [VK_OBJECT_TYPE_OPTICAL_FLOW_SESSION_NV](#) | [VkOpticalFlowSessionNV](VkOpticalFlowSessionNV.html) |
| [VK_OBJECT_TYPE_SHADER_EXT](#) | [VkShaderEXT](VkShaderEXT.html) |
| [VK_OBJECT_TYPE_TENSOR_ARM](#) | [VkTensorARM](VkTensorARM.html) |
| [VK_OBJECT_TYPE_TENSOR_VIEW_ARM](#) | [VkTensorViewARM](VkTensorViewARM.html) |
| [VK_OBJECT_TYPE_DATA_GRAPH_PIPELINE_SESSION_ARM](#) | [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html), [VkDebugUtilsObjectTagInfoEXT](VkDebugUtilsObjectTagInfoEXT.html), [VkDeviceMemoryReportCallbackDataEXT](VkDeviceMemoryReportCallbackDataEXT.html), [vkGetPrivateData](vkGetPrivateData.html), [vkGetPrivateData](vkGetPrivateData.html), [vkSetPrivateData](vkSetPrivateData.html), [vkSetPrivateData](vkSetPrivateData.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkObjectType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
