# VkDebugReportObjectTypeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDebugReportObjectTypeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDebugReportObjectTypeEXT - Specify the type of an object handle

Possible values passed to the `objectType` parameter of the callback
function specified by
[VkDebugReportCallbackCreateInfoEXT](VkDebugReportCallbackCreateInfoEXT.html)::`pfnCallback`, specifying the
type of object handle being reported, are:

// Provided by VK_EXT_debug_marker, VK_EXT_debug_report
typedef enum VkDebugReportObjectTypeEXT {
    VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT = 0,
    VK_DEBUG_REPORT_OBJECT_TYPE_INSTANCE_EXT = 1,
    VK_DEBUG_REPORT_OBJECT_TYPE_PHYSICAL_DEVICE_EXT = 2,
    VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_EXT = 3,
    VK_DEBUG_REPORT_OBJECT_TYPE_QUEUE_EXT = 4,
    VK_DEBUG_REPORT_OBJECT_TYPE_SEMAPHORE_EXT = 5,
    VK_DEBUG_REPORT_OBJECT_TYPE_COMMAND_BUFFER_EXT = 6,
    VK_DEBUG_REPORT_OBJECT_TYPE_FENCE_EXT = 7,
    VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_MEMORY_EXT = 8,
    VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_EXT = 9,
    VK_DEBUG_REPORT_OBJECT_TYPE_IMAGE_EXT = 10,
    VK_DEBUG_REPORT_OBJECT_TYPE_EVENT_EXT = 11,
    VK_DEBUG_REPORT_OBJECT_TYPE_QUERY_POOL_EXT = 12,
    VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_VIEW_EXT = 13,
    VK_DEBUG_REPORT_OBJECT_TYPE_IMAGE_VIEW_EXT = 14,
    VK_DEBUG_REPORT_OBJECT_TYPE_SHADER_MODULE_EXT = 15,
    VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_CACHE_EXT = 16,
    VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_LAYOUT_EXT = 17,
    VK_DEBUG_REPORT_OBJECT_TYPE_RENDER_PASS_EXT = 18,
    VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_EXT = 19,
    VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_SET_LAYOUT_EXT = 20,
    VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_EXT = 21,
    VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_POOL_EXT = 22,
    VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_SET_EXT = 23,
    VK_DEBUG_REPORT_OBJECT_TYPE_FRAMEBUFFER_EXT = 24,
    VK_DEBUG_REPORT_OBJECT_TYPE_COMMAND_POOL_EXT = 25,
    VK_DEBUG_REPORT_OBJECT_TYPE_SURFACE_KHR_EXT = 26,
    VK_DEBUG_REPORT_OBJECT_TYPE_SWAPCHAIN_KHR_EXT = 27,
    VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT_EXT = 28,
    VK_DEBUG_REPORT_OBJECT_TYPE_DISPLAY_KHR_EXT = 29,
    VK_DEBUG_REPORT_OBJECT_TYPE_DISPLAY_MODE_KHR_EXT = 30,
    VK_DEBUG_REPORT_OBJECT_TYPE_VALIDATION_CACHE_EXT_EXT = 33,
  // Provided by VK_VERSION_1_1 with VK_EXT_debug_report, VK_KHR_sampler_ycbcr_conversion with VK_EXT_debug_report
    VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_EXT = 1000156000,
  // Provided by VK_VERSION_1_1 with VK_EXT_debug_report
    VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_EXT = 1000085000,
  // Provided by VK_EXT_debug_report with VK_NVX_binary_import
    VK_DEBUG_REPORT_OBJECT_TYPE_CU_MODULE_NVX_EXT = 1000029000,
  // Provided by VK_EXT_debug_report with VK_NVX_binary_import
    VK_DEBUG_REPORT_OBJECT_TYPE_CU_FUNCTION_NVX_EXT = 1000029001,
  // Provided by VK_KHR_acceleration_structure with VK_EXT_debug_report
    VK_DEBUG_REPORT_OBJECT_TYPE_ACCELERATION_STRUCTURE_KHR_EXT = 1000150000,
  // Provided by VK_EXT_debug_report with VK_NV_ray_tracing
    VK_DEBUG_REPORT_OBJECT_TYPE_ACCELERATION_STRUCTURE_NV_EXT = 1000165000,
  // Provided by VK_EXT_debug_report with VK_NV_cuda_kernel_launch
    VK_DEBUG_REPORT_OBJECT_TYPE_CUDA_MODULE_NV_EXT = 1000307000,
  // Provided by VK_EXT_debug_report with VK_NV_cuda_kernel_launch
    VK_DEBUG_REPORT_OBJECT_TYPE_CUDA_FUNCTION_NV_EXT = 1000307001,
  // Provided by VK_EXT_debug_report with VK_FUCHSIA_buffer_collection
    VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_COLLECTION_FUCHSIA_EXT = 1000366000,
  // VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_EXT is a legacy alias
    VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_EXT = VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT_EXT,
  // VK_DEBUG_REPORT_OBJECT_TYPE_VALIDATION_CACHE_EXT is a legacy alias
    VK_DEBUG_REPORT_OBJECT_TYPE_VALIDATION_CACHE_EXT = VK_DEBUG_REPORT_OBJECT_TYPE_VALIDATION_CACHE_EXT_EXT,
  // Provided by VK_KHR_descriptor_update_template with VK_EXT_debug_report
    VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_KHR_EXT = VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_EXT,
  // Provided by VK_KHR_sampler_ycbcr_conversion with VK_EXT_debug_report
    VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_KHR_EXT = VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION_EXT,
} VkDebugReportObjectTypeEXT;

| [VkDebugReportObjectTypeEXT](#) | Vulkan Handle Type |
| --- | --- |
| [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](#) | Unknown/Undefined Handle |
| [VK_DEBUG_REPORT_OBJECT_TYPE_INSTANCE_EXT](#) | [VkInstance](VkInstance.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PHYSICAL_DEVICE_EXT](#) | [VkPhysicalDevice](VkPhysicalDevice.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_EXT](#) | [VkDevice](VkDevice.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_QUEUE_EXT](#) | [VkQueue](VkQueue.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SEMAPHORE_EXT](#) | [VkSemaphore](VkSemaphore.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_COMMAND_BUFFER_EXT](#) | [VkCommandBuffer](VkCommandBuffer.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_FENCE_EXT](#) | [VkFence](VkFence.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_MEMORY_EXT](#) | [VkDeviceMemory](VkDeviceMemory.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_EXT](#) | [VkBuffer](VkBuffer.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_IMAGE_EXT](#) | [VkImage](VkImage.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_EVENT_EXT](#) | [VkEvent](VkEvent.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_QUERY_POOL_EXT](#) | [VkQueryPool](VkQueryPool.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_VIEW_EXT](#) | [VkBufferView](VkBufferView.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_IMAGE_VIEW_EXT](#) | [VkImageView](VkImageView.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SHADER_MODULE_EXT](#) | [VkShaderModule](VkShaderModule.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_CACHE_EXT](#) | [VkPipelineCache](VkPipelineCache.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_LAYOUT_EXT](#) | [VkPipelineLayout](VkPipelineLayout.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_RENDER_PASS_EXT](#) | [VkRenderPass](VkRenderPass.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_EXT](#) | [VkPipeline](VkPipeline.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_SET_LAYOUT_EXT](#) | [VkDescriptorSetLayout](VkDescriptorSetLayout.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_EXT](#) | [VkSampler](VkSampler.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_POOL_EXT](#) | [VkDescriptorPool](VkDescriptorPool.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_SET_EXT](#) | [VkDescriptorSet](VkDescriptorSet.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_FRAMEBUFFER_EXT](#) | [VkFramebuffer](VkFramebuffer.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_COMMAND_POOL_EXT](#) | [VkCommandPool](VkCommandPool.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SURFACE_KHR_EXT](#) | [VkSurfaceKHR](VkSurfaceKHR.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SWAPCHAIN_KHR_EXT](#) | [VkSwapchainKHR](VkSwapchainKHR.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT_EXT](#) | [VkDebugReportCallbackEXT](VkDebugReportCallbackEXT.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DISPLAY_KHR_EXT](#) | [VkDisplayKHR](VkDisplayKHR.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DISPLAY_MODE_KHR_EXT](#) | [VkDisplayModeKHR](VkDisplayModeKHR.html) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_EXT](#) | [VkDescriptorUpdateTemplate](VkDescriptorUpdateTemplate.html) |

|  | The primary expected use of [VK_ERROR_VALIDATION_FAILED_EXT](VkResult.html) is for
| --- | --- |
validation layer testing to prevent invalid commands from reaching the ICD.
It is not expected that an application would see this error code during
normal use of the validation layers.
If an application returns [VK_TRUE](VK_TRUE.html) in
[VkDebugUtilsMessengerCallbackDataEXT](VkDebugUtilsMessengerCallbackDataEXT.html), the validation layers will
return this error code instead of passing the command down the dispatch
chain. |

[PFN_vkDebugReportCallbackEXT](PFN_vkDebugReportCallbackEXT.html), [VK_EXT_debug_marker](VK_EXT_debug_marker.html), [VK_EXT_debug_report](VK_EXT_debug_report.html), [VkDebugMarkerObjectNameInfoEXT](VkDebugMarkerObjectNameInfoEXT.html), [VkDebugMarkerObjectTagInfoEXT](VkDebugMarkerObjectTagInfoEXT.html), [vkDebugReportMessageEXT](vkDebugReportMessageEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkDebugReportObjectTypeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
