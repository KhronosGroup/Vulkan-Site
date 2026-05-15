# Debugging

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/debugging.html

## Table of Contents

- [Debug Utilities](#debugging-debug-utils)
- [Object Debug Annotation](#debugging-object-debug-annotation)
- [Object_Debug_Annotation](#debugging-object-debug-annotation)
- [Object Naming](#debugging-object-naming)
- [Object Data Association](#debugging-object-data-association)
- [Object_Data_Association](#debugging-object-data-association)
- [Queue Labels](#debugging-queue-labels)
- [Command Buffer Labels](#debugging-command-buffer-labels)
- [Command_Buffer_Labels](#debugging-command-buffer-labels)
- [Debug Messengers](#debugging-debug-messengers)
- [Debug Markers](#debugging-debug-markers)
- [Object Annotation](#debugging-object-annotation)
- [Command Buffer Markers](#debugging-command-buffer-markers)
- [Command_Buffer_Markers](#debugging-command-buffer-markers)
- [Debug Report Callbacks](#debugging-debug-report-callbacks)
- [Debug_Report_Callbacks](#debugging-debug-report-callbacks)
- [Device Loss Debugging](#_device_loss_debugging)
- [Device_Loss_Debugging](#_device_loss_debugging)
- [Device Diagnostic Checkpoints](#device-diagnostic-checkpoints)
- [Device_Diagnostic_Checkpoints](#device-diagnostic-checkpoints)
- [Device Fault Diagnosis](#_device_fault_diagnosis)
- [Device_Fault_Diagnosis](#_device_fault_diagnosis)
- [Vendor Binary Crash Dumps](#vendor-binary-crash-dumps)
- [Vendor_Binary_Crash_Dumps](#vendor-binary-crash-dumps)
- [Active Tooling Information](#debugging-tooling-info)
- [Active_Tooling_Information](#debugging-tooling-info)
- [Frame Boundary](#_frame_boundary)

## Content

To aid developers in tracking down errors in the application’s use of
Vulkan, particularly in combination with an external debugger or profiler,
*debugging extensions* may be available.

The [VkObjectType](#VkObjectType) enumeration defines values, each of which corresponds
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

| [VkObjectType](#VkObjectType) | Vulkan Handle Type |
| --- | --- |
| [VK_OBJECT_TYPE_UNKNOWN](#VkObjectType) | Unknown/Undefined Handle |
| [VK_OBJECT_TYPE_INSTANCE](#VkObjectType) | [VkInstance](initialization.html#VkInstance) |
| [VK_OBJECT_TYPE_PHYSICAL_DEVICE](#VkObjectType) | [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) |
| [VK_OBJECT_TYPE_DEVICE](#VkObjectType) | [VkDevice](devsandqueues.html#VkDevice) |
| [VK_OBJECT_TYPE_QUEUE](#VkObjectType) | [VkQueue](devsandqueues.html#VkQueue) |
| [VK_OBJECT_TYPE_SEMAPHORE](#VkObjectType) | [VkSemaphore](synchronization.html#VkSemaphore) |
| [VK_OBJECT_TYPE_COMMAND_BUFFER](#VkObjectType) | [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) |
| [VK_OBJECT_TYPE_FENCE](#VkObjectType) | [VkFence](synchronization.html#VkFence) |
| [VK_OBJECT_TYPE_DEVICE_MEMORY](#VkObjectType) | [VkDeviceMemory](memory.html#VkDeviceMemory) |
| [VK_OBJECT_TYPE_BUFFER](#VkObjectType) | [VkBuffer](resources.html#VkBuffer) |
| [VK_OBJECT_TYPE_IMAGE](#VkObjectType) | [VkImage](resources.html#VkImage) |
| [VK_OBJECT_TYPE_EVENT](#VkObjectType) | [VkEvent](synchronization.html#VkEvent) |
| [VK_OBJECT_TYPE_QUERY_POOL](#VkObjectType) | [VkQueryPool](queries.html#VkQueryPool) |
| [VK_OBJECT_TYPE_BUFFER_VIEW](#VkObjectType) | [VkBufferView](resources.html#VkBufferView) |
| [VK_OBJECT_TYPE_IMAGE_VIEW](#VkObjectType) | [VkImageView](resources.html#VkImageView) |
| [VK_OBJECT_TYPE_SHADER_MODULE](#VkObjectType) | [VkShaderModule](shaders.html#VkShaderModule) |
| [VK_OBJECT_TYPE_PIPELINE_CACHE](#VkObjectType) | [VkPipelineCache](pipelines.html#VkPipelineCache) |
| [VK_OBJECT_TYPE_PIPELINE_LAYOUT](#VkObjectType) | [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) |
| [VK_OBJECT_TYPE_RENDER_PASS](#VkObjectType) | [VkRenderPass](renderpass.html#VkRenderPass) |
| [VK_OBJECT_TYPE_PIPELINE](#VkObjectType) | [VkPipeline](pipelines.html#VkPipeline) |
| [VK_OBJECT_TYPE_DESCRIPTOR_SET_LAYOUT](#VkObjectType) | [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) |
| [VK_OBJECT_TYPE_SAMPLER](#VkObjectType) | [VkSampler](samplers.html#VkSampler) |
| [VK_OBJECT_TYPE_DESCRIPTOR_POOL](#VkObjectType) | [VkDescriptorPool](descriptorsets.html#VkDescriptorPool) |
| [VK_OBJECT_TYPE_DESCRIPTOR_SET](#VkObjectType) | [VkDescriptorSet](descriptorsets.html#VkDescriptorSet) |
| [VK_OBJECT_TYPE_FRAMEBUFFER](#VkObjectType) | [VkFramebuffer](renderpass.html#VkFramebuffer) |
| [VK_OBJECT_TYPE_COMMAND_POOL](#VkObjectType) | [VkCommandPool](cmdbuffers.html#VkCommandPool) |
| [VK_OBJECT_TYPE_SAMPLER_YCBCR_CONVERSION](#VkObjectType) | [VkSamplerYcbcrConversion](samplers.html#VkSamplerYcbcrConversion) |
| [VK_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE](#VkObjectType) | [VkDescriptorUpdateTemplate](descriptorsets.html#VkDescriptorUpdateTemplate) |
| [VK_OBJECT_TYPE_PRIVATE_DATA_SLOT](#VkObjectType) | [VkPrivateDataSlot](private_data.html#VkPrivateDataSlot) |
| [VK_OBJECT_TYPE_SURFACE_KHR](#VkObjectType) | [VkSurfaceKHR](VK_KHR_surface/wsi.html#VkSurfaceKHR) |
| [VK_OBJECT_TYPE_SWAPCHAIN_KHR](#VkObjectType) | [VkSwapchainKHR](VK_KHR_surface/wsi.html#VkSwapchainKHR) |
| [VK_OBJECT_TYPE_DISPLAY_KHR](#VkObjectType) | [VkDisplayKHR](VK_KHR_surface/wsi.html#VkDisplayKHR) |
| [VK_OBJECT_TYPE_DISPLAY_MODE_KHR](#VkObjectType) | [VkDisplayModeKHR](VK_KHR_surface/wsi.html#VkDisplayModeKHR) |
| [VK_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT](#VkObjectType) | [VkDebugReportCallbackEXT](#VkDebugReportCallbackEXT) |
| [VK_OBJECT_TYPE_VIDEO_SESSION_KHR](#VkObjectType) | [VkVideoSessionKHR](videocoding.html#VkVideoSessionKHR) |
| [VK_OBJECT_TYPE_VIDEO_SESSION_PARAMETERS_KHR](#VkObjectType) | [VkVideoSessionParametersKHR](videocoding.html#VkVideoSessionParametersKHR) |
| [VK_OBJECT_TYPE_DEBUG_UTILS_MESSENGER_EXT](#VkObjectType) | [VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT) |
| [VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_KHR](#VkObjectType) | [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) |
| [VK_OBJECT_TYPE_VALIDATION_CACHE_EXT](#VkObjectType) | [VkValidationCacheEXT](shaders.html#VkValidationCacheEXT) |
| [VK_OBJECT_TYPE_ACCELERATION_STRUCTURE_NV](#VkObjectType) | [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) |
| [VK_OBJECT_TYPE_PERFORMANCE_CONFIGURATION_INTEL](#VkObjectType) | [VkPerformanceConfigurationINTEL](queries.html#VkPerformanceConfigurationINTEL) |
| [VK_OBJECT_TYPE_DEFERRED_OPERATION_KHR](#VkObjectType) | [VkDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#VkDeferredOperationKHR) |
| [VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_NV](#VkObjectType) | [VkIndirectCommandsLayoutNV](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutNV) |
| [VK_OBJECT_TYPE_INDIRECT_COMMANDS_LAYOUT_EXT](#VkObjectType) | [VkIndirectCommandsLayoutEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutEXT) |
| [VK_OBJECT_TYPE_INDIRECT_EXECUTION_SET_EXT](#VkObjectType) | [VkIndirectExecutionSetEXT](device_generated_commands/generatedcommands.html#VkIndirectExecutionSetEXT) |
| [VK_OBJECT_TYPE_BUFFER_COLLECTION_FUCHSIA](#VkObjectType) | [VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA) |
| [VK_OBJECT_TYPE_MICROMAP_EXT](#VkObjectType) | [VkMicromapEXT](resources.html#VkMicromapEXT) |
| [VK_OBJECT_TYPE_OPTICAL_FLOW_SESSION_NV](#VkObjectType) | [VkOpticalFlowSessionNV](VK_NV_optical_flow/optical_flow.html#VkOpticalFlowSessionNV) |
| [VK_OBJECT_TYPE_SHADER_EXT](#VkObjectType) | [VkShaderEXT](shaders.html#VkShaderEXT) |
| [VK_OBJECT_TYPE_TENSOR_ARM](#VkObjectType) | [VkTensorARM](resources.html#VkTensorARM) |
| [VK_OBJECT_TYPE_TENSOR_VIEW_ARM](#VkObjectType) | [VkTensorViewARM](resources.html#VkTensorViewARM) |
| [VK_OBJECT_TYPE_DATA_GRAPH_PIPELINE_SESSION_ARM](#VkObjectType) | [VkDataGraphPipelineSessionARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionARM) |

If this Specification was generated with any such extensions included, they
will be described in the remainder of this chapter.

Vulkan provides flexible debugging utilities for debugging an application.

The [Object Debug Annotation](#debugging-object-debug-annotation) section
describes how to associate either a name or binary data with a specific
Vulkan object.

The [Queue Labels](#debugging-queue-labels) section describes how to
annotate and group the work submitted to a queue.

The [Command Buffer Labels](#debugging-command-buffer-labels) section
describes how to associate logical elements of the scene with commands in a
[VkCommandBuffer](cmdbuffers.html#VkCommandBuffer).

The [Debug Messengers](#debugging-debug-messengers) section describes how to
create debug messenger objects associated with an application supplied
callback to capture debug messages from a variety of Vulkan components.

It can be useful for an application to provide its own content relative to a
specific Vulkan object.

The following commands allow application developers to associate
application-defined information with Vulkan objects.
These commands are device-level commands but they **may** reference
instance-level objects (such as [VkInstance](initialization.html#VkInstance)) and physical device-level
objects (such as [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice)) with a few restrictions:

* 
The data for the corresponding object **may** still be available after the
[VkDevice](devsandqueues.html#VkDevice) used in the corresponding API call to set it is
destroyed, but access to this data is not guaranteed and should be
avoided.

* 
Subsequent calls to change the data of the same object across multiple
`VkDevice` objects, **may** result in the data being changed to the
most recent version for all `VkDevice` objects and not just the
`VkDevice` used in the most recent API call.

An object can be given an application-defined name by calling:

// Provided by VK_EXT_debug_utils
VkResult vkSetDebugUtilsObjectNameEXT(
    VkDevice                                    device,
    const VkDebugUtilsObjectNameInfoEXT*        pNameInfo);

* 
`device` is the device that is associated with the named object
passed in via `objectHandle`.

* 
`pNameInfo` is a pointer to a [VkDebugUtilsObjectNameInfoEXT](#VkDebugUtilsObjectNameInfoEXT)
structure specifying parameters of the name to set on the object.

Valid Usage

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02587) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02587

`pNameInfo->objectType` **must** not be [VK_OBJECT_TYPE_UNKNOWN](#VkObjectType)

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02588) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-02588

`pNameInfo->objectHandle` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07872) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07872

If `pNameInfo->objectHandle` is the valid handle of an
instance-level object, the [VkDevice](devsandqueues.html#VkDevice) identified by `device`
**must** be a descendent of the same [VkInstance](initialization.html#VkInstance) as the object
identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07873) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07873

If `pNameInfo->objectHandle` is the valid handle of a
physical-device-level object, the [VkDevice](devsandqueues.html#VkDevice) identified by
`device` **must** be a descendant of the same [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) as
the object identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07874) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-07874

If `pNameInfo->objectHandle` is the valid handle of a device-level
object, that object **must** be a descendent of the [VkDevice](devsandqueues.html#VkDevice)
identified by `device`

Valid Usage (Implicit)

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-device-parameter) VUID-vkSetDebugUtilsObjectNameEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-parameter) VUID-vkSetDebugUtilsObjectNameEXT-pNameInfo-parameter

 `pNameInfo` **must** be a valid pointer to a valid [VkDebugUtilsObjectNameInfoEXT](#VkDebugUtilsObjectNameInfoEXT) structure

Host Synchronization

* 
Host access to `pNameInfo->objectHandle` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDebugUtilsObjectNameInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsObjectNameInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkObjectType       objectType;
    uint64_t           objectHandle;
    const char*        pObjectName;
} VkDebugUtilsObjectNameInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkObjectType](#VkObjectType) specifying the type of the
object to be named.

* 
`objectHandle` is the object to be named.

* 
`pObjectName` is either `NULL` or a null-terminated UTF-8 string
specifying the name to apply to `objectHandle`.

Applications **may** change the name associated with an object simply by
calling `vkSetDebugUtilsObjectNameEXT` again with a new string.
If `pObjectName` is either `NULL` or an empty string, then any
previously set name is removed.

The [`graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary)
feature allows the specification of pipelines without the creation of
[VkShaderModule](shaders.html#VkShaderModule) objects beforehand.
In order to continue to allow naming these shaders independently,
`VkDebugUtilsObjectNameInfoEXT` **can** be included in the `pNext`
chain of [VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo), which associates a static
name with that particular shader.

This structure **can** be included in the `pNext` chain of
[VkResourceDescriptorInfoEXT](descriptorheaps.html#VkResourceDescriptorInfoEXT) or [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) to label a
descriptor or embedded sampler.
This structure **may** be ignored when included in the `pNext` chain of
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) when creating a sampler object.
The label **must** remain valid while the descriptor is valid; it **may** be
discarded if it becomes invalid.

Valid Usage

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02589) VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02589

If `objectType` is [VK_OBJECT_TYPE_UNKNOWN](#VkObjectType), `objectHandle`
**must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02590) VUID-VkDebugUtilsObjectNameInfoEXT-objectType-02590

If `objectType` is not [VK_OBJECT_TYPE_UNKNOWN](#VkObjectType),
`objectHandle` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a valid Vulkan
handle of the type associated with `objectType` as defined in the
[`VkObjectType` and Vulkan Handle    Relationship](#debugging-object-types) table

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-sType-sType) VUID-VkDebugUtilsObjectNameInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_OBJECT_NAME_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-objectType-parameter) VUID-VkDebugUtilsObjectNameInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](#VkObjectType) value

* 
[](#VUID-VkDebugUtilsObjectNameInfoEXT-pObjectName-parameter) VUID-VkDebugUtilsObjectNameInfoEXT-pObjectName-parameter

 If `pObjectName` is not `NULL`, `pObjectName` **must** be a null-terminated UTF-8 string

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo)

* 
[VkResourceDescriptorInfoEXT](descriptorheaps.html#VkResourceDescriptorInfoEXT)

* 
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)

In addition to setting a name for an object, debugging and validation layers
**may** have uses for additional binary data on a per-object basis that have no
other place in the Vulkan API.

For example, a `VkShaderModule` could have additional debugging data
attached to it to aid in offline shader tracing.

Additional data can be attached to an object by calling
`vkSetDebugUtilsObjectTagEXT` as defined below.

// Provided by VK_EXT_debug_utils
VkResult vkSetDebugUtilsObjectTagEXT(
    VkDevice                                    device,
    const VkDebugUtilsObjectTagInfoEXT*         pTagInfo);

* 
`device` is the device that created the object.

* 
`pTagInfo` is a pointer to a [VkDebugUtilsObjectTagInfoEXT](#VkDebugUtilsObjectTagInfoEXT)
structure specifying parameters of the tag to attach to the object.

Valid Usage

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07875) VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07875

If `pNameInfo->objectHandle` is the valid handle of an
instance-level object, the [VkDevice](devsandqueues.html#VkDevice) identified by `device`
**must** be a descendent of the same [VkInstance](initialization.html#VkInstance) as the object
identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07876) VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07876

If `pNameInfo->objectHandle` is the valid handle of a
physical-device-level object, the [VkDevice](devsandqueues.html#VkDevice) identified by
`device` **must** be a descendant of the same [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) as
the object identified by `pNameInfo->objectHandle`

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07877) VUID-vkSetDebugUtilsObjectTagEXT-pNameInfo-07877

If `pNameInfo->objectHandle` is the valid handle of a device-level
object, that object **must** be a descendent of the [VkDevice](devsandqueues.html#VkDevice)
identified by `device`

Valid Usage (Implicit)

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-device-parameter) VUID-vkSetDebugUtilsObjectTagEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetDebugUtilsObjectTagEXT-pTagInfo-parameter) VUID-vkSetDebugUtilsObjectTagEXT-pTagInfo-parameter

 `pTagInfo` **must** be a valid pointer to a valid [VkDebugUtilsObjectTagInfoEXT](#VkDebugUtilsObjectTagInfoEXT) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDebugUtilsObjectTagInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsObjectTagInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkObjectType       objectType;
    uint64_t           objectHandle;
    uint64_t           tagName;
    size_t             tagSize;
    const void*        pTag;
} VkDebugUtilsObjectTagInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkObjectType](#VkObjectType) specifying the type of the
object to be named.

* 
`objectHandle` is the object to be tagged.

* 
`tagName` is a numerical identifier of the tag.

* 
`tagSize` is the number of bytes of data to attach to the object.

* 
`pTag` is a pointer to an array of `tagSize` bytes containing
the data to be associated with the object.

The `tagName` parameter gives a name or identifier to the type of data
being tagged.
This can be used by debugging layers to easily filter for only data that can
be used by that implementation.

Valid Usage

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-objectType-01908) VUID-VkDebugUtilsObjectTagInfoEXT-objectType-01908

`objectType` **must** not be [VK_OBJECT_TYPE_UNKNOWN](#VkObjectType)

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-objectHandle-01910) VUID-VkDebugUtilsObjectTagInfoEXT-objectHandle-01910

`objectHandle` **must** be a valid Vulkan handle of the type associated
with `objectType` as defined in the [    `VkObjectType` and Vulkan Handle Relationship](#debugging-object-types) table

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-sType-sType) VUID-VkDebugUtilsObjectTagInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_OBJECT_TAG_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-pNext-pNext) VUID-VkDebugUtilsObjectTagInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-objectType-parameter) VUID-VkDebugUtilsObjectTagInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](#VkObjectType) value

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-pTag-parameter) VUID-VkDebugUtilsObjectTagInfoEXT-pTag-parameter

 `pTag` **must** be a valid pointer to an array of `tagSize` bytes

* 
[](#VUID-VkDebugUtilsObjectTagInfoEXT-tagSize-arraylength) VUID-VkDebugUtilsObjectTagInfoEXT-tagSize-arraylength

 `tagSize` **must** be greater than `0`

Host Synchronization

* 
Host access to `objectHandle` **must** be externally synchronized

All Vulkan work is submitted using queues.
It is possible for an application to use multiple queues, each containing
multiple command buffers, when performing work.
It can be useful to identify which queue, or even where in a queue,
something has occurred.

To begin identifying a region using a debug label inside a queue, you may
use the [vkQueueBeginDebugUtilsLabelEXT](#vkQueueBeginDebugUtilsLabelEXT) command.

Then, when the region of interest has passed, you may end the label region
using [vkQueueEndDebugUtilsLabelEXT](#vkQueueEndDebugUtilsLabelEXT).

Additionally, a single debug label may be inserted at any time using
[vkQueueInsertDebugUtilsLabelEXT](#vkQueueInsertDebugUtilsLabelEXT).

A queue debug label region is opened by calling:

// Provided by VK_EXT_debug_utils
void vkQueueBeginDebugUtilsLabelEXT(
    VkQueue                                     queue,
    const VkDebugUtilsLabelEXT*                 pLabelInfo);

* 
`queue` is the queue in which to start a debug label region.

* 
`pLabelInfo` is a pointer to a [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure
specifying parameters of the label region to open.

Valid Usage (Implicit)

* 
[](#VUID-vkQueueBeginDebugUtilsLabelEXT-queue-parameter) VUID-vkQueueBeginDebugUtilsLabelEXT-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueueBeginDebugUtilsLabelEXT-pLabelInfo-parameter) VUID-vkQueueBeginDebugUtilsLabelEXT-pLabelInfo-parameter

 `pLabelInfo` **must** be a valid pointer to a valid [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

The `VkDebugUtilsLabelEXT` structure is defined as:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsLabelEXT {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pLabelName;
    float              color[4];
} VkDebugUtilsLabelEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pLabelName` is a pointer to a null-terminated UTF-8 string
containing the name of the label.

* 
`color` is an optional RGBA color value that can be associated with
the label.
A particular implementation **may** choose to ignore this color value.
The values contain RGBA values in order, in the range 0.0 to 1.0.
If all elements in `color` are 0.0, then it is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsLabelEXT-sType-sType) VUID-VkDebugUtilsLabelEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_LABEL_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugUtilsLabelEXT-pNext-pNext) VUID-VkDebugUtilsLabelEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugUtilsLabelEXT-pLabelName-parameter) VUID-VkDebugUtilsLabelEXT-pLabelName-parameter

 `pLabelName` **must** be a null-terminated UTF-8 string

A queue debug label region is closed by calling:

// Provided by VK_EXT_debug_utils
void vkQueueEndDebugUtilsLabelEXT(
    VkQueue                                     queue);

* 
`queue` is the queue in which a debug label region should be closed.

The calls to [vkQueueBeginDebugUtilsLabelEXT](#vkQueueBeginDebugUtilsLabelEXT) and
[vkQueueEndDebugUtilsLabelEXT](#vkQueueEndDebugUtilsLabelEXT) **must** be matched and balanced.

Valid Usage

* 
[](#VUID-vkQueueEndDebugUtilsLabelEXT-None-01911) VUID-vkQueueEndDebugUtilsLabelEXT-None-01911

There **must** be an outstanding `vkQueueBeginDebugUtilsLabelEXT`
command prior to the `vkQueueEndDebugUtilsLabelEXT` on the queue

Valid Usage (Implicit)

* 
[](#VUID-vkQueueEndDebugUtilsLabelEXT-queue-parameter) VUID-vkQueueEndDebugUtilsLabelEXT-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

A single label can be inserted into a queue by calling:

// Provided by VK_EXT_debug_utils
void vkQueueInsertDebugUtilsLabelEXT(
    VkQueue                                     queue,
    const VkDebugUtilsLabelEXT*                 pLabelInfo);

* 
`queue` is the queue into which a debug label will be inserted.

* 
`pLabelInfo` is a pointer to a [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure
specifying parameters of the label to insert.

Valid Usage (Implicit)

* 
[](#VUID-vkQueueInsertDebugUtilsLabelEXT-queue-parameter) VUID-vkQueueInsertDebugUtilsLabelEXT-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueueInsertDebugUtilsLabelEXT-pLabelInfo-parameter) VUID-vkQueueInsertDebugUtilsLabelEXT-pLabelInfo-parameter

 `pLabelInfo` **must** be a valid pointer to a valid [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

Typical Vulkan applications will submit many command buffers in each frame,
with each command buffer containing a large number of individual commands.
Being able to logically annotate regions of command buffers that belong
together as well as hierarchically subdivide the frame is important to a
developer’s ability to navigate the commands viewed holistically.

To identify the beginning of a debug label region in a command buffer,
[vkCmdBeginDebugUtilsLabelEXT](#vkCmdBeginDebugUtilsLabelEXT) **can** be used as defined below.

To indicate the end of a debug label region in a command buffer,
[vkCmdEndDebugUtilsLabelEXT](#vkCmdEndDebugUtilsLabelEXT) **can** be used.

To insert a single command buffer debug label inside of a command buffer,
[vkCmdInsertDebugUtilsLabelEXT](#vkCmdInsertDebugUtilsLabelEXT) **can** be used as defined below.

A command buffer debug label region can be opened by calling:

// Provided by VK_EXT_debug_utils
void vkCmdBeginDebugUtilsLabelEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDebugUtilsLabelEXT*                 pLabelInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pLabelInfo` is a pointer to a [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure
specifying parameters of the label region to open.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-parameter) VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-pLabelInfo-parameter) VUID-vkCmdBeginDebugUtilsLabelEXT-pLabelInfo-parameter

 `pLabelInfo` **must** be a valid pointer to a valid [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-recording) VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-cmdpool) VUID-vkCmdBeginDebugUtilsLabelEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | State |

Conditional Rendering

vkCmdBeginDebugUtilsLabelEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

A command buffer label region can be closed by calling:

// Provided by VK_EXT_debug_utils
void vkCmdEndDebugUtilsLabelEXT(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

An application **may** open a debug label region in one command buffer and
close it in another, or otherwise split debug label regions across multiple
command buffers or multiple queue submissions.
When viewed from the linear series of submissions to a single queue, the
calls to [vkCmdBeginDebugUtilsLabelEXT](#vkCmdBeginDebugUtilsLabelEXT) and
[vkCmdEndDebugUtilsLabelEXT](#vkCmdEndDebugUtilsLabelEXT) **must** be matched and balanced.

There **can** be problems reporting command buffer debug labels during the
recording process because command buffers **may** be recorded out of sequence
with the resulting execution order.
Since the recording order **may** be different, a solitary command buffer **may**
have an inconsistent view of the debug label regions by itself.
Therefore, if an issue occurs during the recording of a command buffer, and
the environment requires returning debug labels, the implementation **may**
return only those labels it is aware of.
This is true even if the implementation is aware of only the debug labels
within the command buffer being actively recorded.

Valid Usage

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01912) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01912

There **must** be an outstanding `vkCmdBeginDebugUtilsLabelEXT` command
prior to the `vkCmdEndDebugUtilsLabelEXT` on the queue that
`commandBuffer` is submitted to

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01913) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-01913

If `commandBuffer` is a secondary command buffer, there **must** be an
outstanding `vkCmdBeginDebugUtilsLabelEXT` command recorded to
`commandBuffer` that has not previously been ended by a call to
`vkCmdEndDebugUtilsLabelEXT`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-parameter) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-recording) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-cmdpool) VUID-vkCmdEndDebugUtilsLabelEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | State |

Conditional Rendering

vkCmdEndDebugUtilsLabelEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

A single debug label can be inserted into a command buffer by calling:

// Provided by VK_EXT_debug_utils
void vkCmdInsertDebugUtilsLabelEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDebugUtilsLabelEXT*                 pLabelInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pLabelInfo` is a pointer to a [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure
specifying parameters of the label to insert.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdInsertDebugUtilsLabelEXT-commandBuffer-parameter) VUID-vkCmdInsertDebugUtilsLabelEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdInsertDebugUtilsLabelEXT-pLabelInfo-parameter) VUID-vkCmdInsertDebugUtilsLabelEXT-pLabelInfo-parameter

 `pLabelInfo` **must** be a valid pointer to a valid [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structure

* 
[](#VUID-vkCmdInsertDebugUtilsLabelEXT-commandBuffer-recording) VUID-vkCmdInsertDebugUtilsLabelEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdInsertDebugUtilsLabelEXT-commandBuffer-cmdpool) VUID-vkCmdInsertDebugUtilsLabelEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | State |

Conditional Rendering

vkCmdInsertDebugUtilsLabelEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Vulkan allows an application to register multiple callbacks with any Vulkan
component wishing to report debug information.
Some callbacks may log the information to a file, others may cause a debug
break point or other application-defined behavior.
A primary producer of callback messages are the validation layers.
An application **can** register callbacks even when no validation layers are
enabled, but they will only be called for the Vulkan loader and, if
implemented, other layer and driver events.

A `VkDebugUtilsMessengerEXT` is a messenger object which handles passing
along debug messages to a provided debug callback.

// Provided by VK_EXT_debug_utils
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDebugUtilsMessengerEXT)

The debug messenger will provide detailed feedback on the application’s use
of Vulkan when events of interest occur.
When an event of interest does occur, the debug messenger will submit a
debug message to the debug callback that was provided during its creation.
Additionally, the debug messenger is responsible with filtering out debug
messages that the callback is not interested in and will only provide
desired debug messages.

A debug messenger triggers a debug callback with a debug message when an
event of interest occurs.
To create a debug messenger which will trigger a debug callback, call:

// Provided by VK_EXT_debug_utils
VkResult vkCreateDebugUtilsMessengerEXT(
    VkInstance                                  instance,
    const VkDebugUtilsMessengerCreateInfoEXT*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDebugUtilsMessengerEXT*                   pMessenger);

* 
`instance` is the instance the messenger will be used with.

* 
`pCreateInfo` is a pointer to a
[VkDebugUtilsMessengerCreateInfoEXT](#VkDebugUtilsMessengerCreateInfoEXT) structure containing the
callback pointer, as well as defining conditions under which this
messenger will trigger the callback.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pMessenger` is a pointer to a [VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT) handle
in which the created object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-instance-parameter) VUID-vkCreateDebugUtilsMessengerEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-pCreateInfo-parameter) VUID-vkCreateDebugUtilsMessengerEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDebugUtilsMessengerCreateInfoEXT](#VkDebugUtilsMessengerCreateInfoEXT) structure

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-pAllocator-parameter) VUID-vkCreateDebugUtilsMessengerEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDebugUtilsMessengerEXT-pMessenger-parameter) VUID-vkCreateDebugUtilsMessengerEXT-pMessenger-parameter

 `pMessenger` **must** be a valid pointer to a [VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The application **must** ensure that [vkCreateDebugUtilsMessengerEXT](#vkCreateDebugUtilsMessengerEXT) is
not executed in parallel with any Vulkan command that is also called with
`instance` or child of `instance` as the dispatchable argument.

The definition of `VkDebugUtilsMessengerCreateInfoEXT` is:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsMessengerCreateInfoEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkDebugUtilsMessengerCreateFlagsEXT     flags;
    VkDebugUtilsMessageSeverityFlagsEXT     messageSeverity;
    VkDebugUtilsMessageTypeFlagsEXT         messageType;
    PFN_vkDebugUtilsMessengerCallbackEXT    pfnUserCallback;
    void*                                   pUserData;
} VkDebugUtilsMessengerCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is `0` and is reserved for future use.

* 
`messageSeverity` is a bitmask of
[VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) specifying which severity
of event(s) will cause this callback to be called.

* 
`messageType` is a bitmask of
[VkDebugUtilsMessageTypeFlagBitsEXT](#VkDebugUtilsMessageTypeFlagBitsEXT) specifying which type of
event(s) will cause this callback to be called.

* 
`pfnUserCallback` is the application callback function to call.

* 
`pUserData` is NULL or an application-defined user data pointer to
be passed to the callback.

For each `VkDebugUtilsMessengerEXT` that is created the
`VkDebugUtilsMessengerCreateInfoEXT`::`messageSeverity` and
`VkDebugUtilsMessengerCreateInfoEXT`::`messageType` determine when
that `VkDebugUtilsMessengerCreateInfoEXT`::`pfnUserCallback` is
called.
The process to determine if the user’s `pfnUserCallback` is triggered
when an event occurs is as follows:

The implementation will perform a bitwise AND of the event’s
[VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) with the
`messageSeverity` provided during creation of the
[VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT) object.

If the value is 0, the message is skipped.

The implementation will perform bitwise AND of the event’s
[VkDebugUtilsMessageTypeFlagBitsEXT](#VkDebugUtilsMessageTypeFlagBitsEXT) with the `messageType`
provided during the creation of the [VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT)
object.

If the value is 0, the message is skipped.

The callback will trigger a debug message for the current event

The callback will come directly from the component that detected the event,
unless some other layer intercepts the calls for its own purposes (filter
them in a different way, log to a system error log, etc.).

An application **can** receive multiple callbacks if multiple
`VkDebugUtilsMessengerEXT` objects are created.
A callback will always be executed in the same thread as the originating
Vulkan call.

A callback **can** be called from multiple threads simultaneously (if the
application is making Vulkan calls from multiple threads).

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-sType-sType) VUID-VkDebugUtilsMessengerCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-flags-zerobitmask) VUID-VkDebugUtilsMessengerCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-parameter) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-parameter

 `messageSeverity` **must** be a valid combination of [VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) values

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-requiredbitmask) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageSeverity-requiredbitmask

 `messageSeverity` **must** not be `0`

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-parameter) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-parameter

 `messageType` **must** be a valid combination of [VkDebugUtilsMessageTypeFlagBitsEXT](#VkDebugUtilsMessageTypeFlagBitsEXT) values

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-requiredbitmask) VUID-VkDebugUtilsMessengerCreateInfoEXT-messageType-requiredbitmask

 `messageType` **must** not be `0`

* 
[](#VUID-VkDebugUtilsMessengerCreateInfoEXT-pfnUserCallback-parameter) VUID-VkDebugUtilsMessengerCreateInfoEXT-pfnUserCallback-parameter

 `pfnUserCallback` **must** be a valid [PFN_vkDebugUtilsMessengerCallbackEXT](#PFN_vkDebugUtilsMessengerCallbackEXT) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo)

// Provided by VK_EXT_debug_utils
typedef VkFlags VkDebugUtilsMessengerCreateFlagsEXT;

`VkDebugUtilsMessengerCreateFlagsEXT` is a bitmask type for setting a
mask, but is currently reserved for future use.

Bits which **can** be set in
[VkDebugUtilsMessengerCreateInfoEXT](#VkDebugUtilsMessengerCreateInfoEXT)::`messageSeverity`, specifying
event severities which cause a debug messenger to call the callback, are:

// Provided by VK_EXT_debug_utils
typedef enum VkDebugUtilsMessageSeverityFlagBitsEXT {
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT = 0x00000001,
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT = 0x00000010,
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT = 0x00000100,
    VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT = 0x00001000,
} VkDebugUtilsMessageSeverityFlagBitsEXT;

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) specifies the most
verbose output indicating all diagnostic messages from the Vulkan
loader, layers, and drivers should be captured.

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) specifies an
informational message such as resource details that may be handy when
debugging an application.

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) specifies use of
Vulkan that **may** expose an application bug.
Such cases may not be immediately harmful, such as a fragment shader
outputting to a location with no attachment.
Other cases **may** point to behavior that is almost certainly bad when
unintended such as using an image whose memory has not been filled.
In general if you see a warning but you know that the behavior is
intended/desired, then simply ignore the warning.

* 
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) specifies that the
application has violated a valid usage condition of the specification.

|  | The values of [VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) are sorted based
| --- | --- |
on severity.
The higher the flag value, the more severe the message.
This allows for simple boolean operation comparisons when looking at
[VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) values.

For example:

    if (messageSeverity >= VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT) {
        // Do something for warnings and errors
    }

In addition, space has been left between the enums to allow for later
addition of new severities in between the existing values. |

// Provided by VK_EXT_debug_utils
typedef VkFlags VkDebugUtilsMessageSeverityFlagsEXT;

`VkDebugUtilsMessageSeverityFlagsEXT` is a bitmask type for setting a
mask of zero or more [VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT).

Bits which **can** be set in
[VkDebugUtilsMessengerCreateInfoEXT](#VkDebugUtilsMessengerCreateInfoEXT)::`messageType`, specifying
event types which cause a debug messenger to call the callback, are:

// Provided by VK_EXT_debug_utils
typedef enum VkDebugUtilsMessageTypeFlagBitsEXT {
    VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT = 0x00000001,
    VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT = 0x00000002,
    VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT = 0x00000004,
  // Provided by VK_EXT_device_address_binding_report
    VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT = 0x00000008,
} VkDebugUtilsMessageTypeFlagBitsEXT;

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT](#VkDebugUtilsMessageTypeFlagBitsEXT) specifies that some
general event has occurred.
This is typically a non-specification, non-performance event.

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT](#VkDebugUtilsMessageTypeFlagBitsEXT) specifies that
something has occurred during validation against the Vulkan
specification that may indicate invalid behavior.

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT](#VkDebugUtilsMessageTypeFlagBitsEXT) specifies a
potentially non-optimal use of Vulkan, e.g. using
[vkCmdClearColorImage](clears.html#vkCmdClearColorImage) when setting
[VkAttachmentDescription](renderpass.html#VkAttachmentDescription)::`loadOp` to
[VK_ATTACHMENT_LOAD_OP_CLEAR](renderpass.html#VkAttachmentLoadOp) would have worked.

* 
[VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT](#VkDebugUtilsMessageTypeFlagBitsEXT)
specifies that the implementation has modified the set of GPU-visible
virtual addresses associated with a Vulkan object.

// Provided by VK_EXT_debug_utils
typedef VkFlags VkDebugUtilsMessageTypeFlagsEXT;

`VkDebugUtilsMessageTypeFlagsEXT` is a bitmask type for setting a mask
of zero or more [VkDebugUtilsMessageTypeFlagBitsEXT](#VkDebugUtilsMessageTypeFlagBitsEXT).

The prototype for the
[VkDebugUtilsMessengerCreateInfoEXT](#VkDebugUtilsMessengerCreateInfoEXT)::`pfnUserCallback` function
implemented by the application is:

// Provided by VK_EXT_debug_utils
typedef VkBool32 (*PFN_vkDebugUtilsMessengerCallbackEXT)(
    VkDebugUtilsMessageSeverityFlagBitsEXT      messageSeverity,
    VkDebugUtilsMessageTypeFlagsEXT             messageTypes,
    const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData,
    void*                                       pUserData);

* 
`messageSeverity` specifies the
[VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) that triggered this
callback.

* 
`messageTypes` is a bitmask of
[VkDebugUtilsMessageTypeFlagBitsEXT](#VkDebugUtilsMessageTypeFlagBitsEXT) specifying which type of
event(s) triggered this callback.

* 
`pCallbackData` contains all the callback related data in the
[VkDebugUtilsMessengerCallbackDataEXT](#VkDebugUtilsMessengerCallbackDataEXT) structure.

* 
`pUserData` is the application-defined user data pointer, equal to
the value of [VkDebugUtilsMessengerCreateInfoEXT](#VkDebugUtilsMessengerCreateInfoEXT)::`pUserData`
specified when the [VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT) object was created.

The callback returns a `VkBool32`, which is interpreted in a
layer-specified manner.
The application **should** always return [VK_FALSE](fundamentals.html#VK_FALSE).
The [VK_TRUE](fundamentals.html#VK_TRUE) value is reserved for use in layer development.

Valid Usage

* 
[](#VUID-PFN_vkDebugUtilsMessengerCallbackEXT-None-04769) VUID-PFN_vkDebugUtilsMessengerCallbackEXT-None-04769

The callback **must** not make calls to any Vulkan commands

The definition of `VkDebugUtilsMessengerCallbackDataEXT` is:

// Provided by VK_EXT_debug_utils
typedef struct VkDebugUtilsMessengerCallbackDataEXT {
    VkStructureType                              sType;
    const void*                                  pNext;
    VkDebugUtilsMessengerCallbackDataFlagsEXT    flags;
    const char*                                  pMessageIdName;
    int32_t                                      messageIdNumber;
    const char*                                  pMessage;
    uint32_t                                     queueLabelCount;
    const VkDebugUtilsLabelEXT*                  pQueueLabels;
    uint32_t                                     cmdBufLabelCount;
    const VkDebugUtilsLabelEXT*                  pCmdBufLabels;
    uint32_t                                     objectCount;
    const VkDebugUtilsObjectNameInfoEXT*         pObjects;
} VkDebugUtilsMessengerCallbackDataEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is `0` and is reserved for future use.

* 
`pMessageIdName` is `NULL` or a null-terminated UTF-8 string that
identifies the particular message ID that is associated with the
provided message.
If the message corresponds to a validation layer message, then this
string will be the VUID.

* 
`messageIdNumber` is the ID number of the triggering message.
If the message corresponds to a validation layer message, then this
number is an internal hash of the VUID.

* 
`pMessage` is
`NULL` if `messageTypes` is equal to
[VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT](#VkDebugUtilsMessageTypeFlagBitsEXT), or
a null-terminated UTF-8 string detailing the trigger conditions.
If the message corresponds to a validation layer message, then this will
contain the main message with the specification text and link.

* 
`queueLabelCount` is a count of items contained in the
`pQueueLabels` array.

* 
`pQueueLabels` is `NULL` or a pointer to an array of
[VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) active in the current `VkQueue` at the
time the callback was triggered.
Refer to [Queue Labels](#debugging-queue-labels) for more information.

* 
`cmdBufLabelCount` is a count of items contained in the
`pCmdBufLabels` array.

* 
`pCmdBufLabels` is `NULL` or a pointer to an array of
[VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) active in the current `VkCommandBuffer`
at the time the callback was triggered.
Refer to [Command Buffer Labels](#debugging-command-buffer-labels) for
more information.

* 
`objectCount` is a count of items contained in the `pObjects`
array.

* 
`pObjects` is a pointer to an array of
[VkDebugUtilsObjectNameInfoEXT](#VkDebugUtilsObjectNameInfoEXT) objects related to the detected
issue.
The array is roughly in order of importance, but the 0th element is
always guaranteed to be the most important object for this message.

|  | This structure should only be considered valid during the lifetime of the
| --- | --- |
triggered callback. |

Since adding queue and command buffer labels behaves like pushing and
popping onto a stack, the order of both `pQueueLabels` and
`pCmdBufLabels` is based on the order the labels were defined.
The result is that the first label in either `pQueueLabels` or
`pCmdBufLabels` will be the first defined (and therefore the oldest)
while the last label in each list will be the most recent.

|  | `pQueueLabels` will only be non-`NULL` if one of the objects in
| --- | --- |
`pObjects` can be related directly to a defined `VkQueue` which has
had one or more labels associated with it.

Likewise, `pCmdBufLabels` will only be non-`NULL` if one of the objects
in `pObjects` can be related directly to a defined `VkCommandBuffer`
which has had one or more labels associated with it.
Additionally, while command buffer labels allow for beginning and ending
across different command buffers, the debug messaging framework **cannot**
guarantee that labels in `pCmdBufLables` will contain those defined
outside of the associated command buffer.
This is partially due to the fact that the association of one command buffer
with another may not have been defined at the time the debug message is
triggered. |

Valid Usage (Implicit)

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-sType) VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CALLBACK_DATA_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pNext-pNext) VUID-VkDebugUtilsMessengerCallbackDataEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDeviceAddressBindingCallbackDataEXT](#VkDeviceAddressBindingCallbackDataEXT)

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-unique) VUID-VkDebugUtilsMessengerCallbackDataEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-flags-zerobitmask) VUID-VkDebugUtilsMessengerCallbackDataEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessageIdName-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessageIdName-parameter

 If `pMessageIdName` is not `NULL`, `pMessageIdName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessage-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pMessage-parameter

 If `pMessage` is not `NULL`, `pMessage` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pQueueLabels-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pQueueLabels-parameter

 If `queueLabelCount` is not `0`, `pQueueLabels` **must** be a valid pointer to an array of `queueLabelCount` valid [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structures

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pCmdBufLabels-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pCmdBufLabels-parameter

 If `cmdBufLabelCount` is not `0`, `pCmdBufLabels` **must** be a valid pointer to an array of `cmdBufLabelCount` valid [VkDebugUtilsLabelEXT](#VkDebugUtilsLabelEXT) structures

* 
[](#VUID-VkDebugUtilsMessengerCallbackDataEXT-pObjects-parameter) VUID-VkDebugUtilsMessengerCallbackDataEXT-pObjects-parameter

 If `objectCount` is not `0`, `pObjects` **must** be a valid pointer to an array of `objectCount` valid [VkDebugUtilsObjectNameInfoEXT](#VkDebugUtilsObjectNameInfoEXT) structures

// Provided by VK_EXT_debug_utils
typedef VkFlags VkDebugUtilsMessengerCallbackDataFlagsEXT;

`VkDebugUtilsMessengerCallbackDataFlagsEXT` is a bitmask type for
setting a mask, but is currently reserved for future use.

The definition of `VkDeviceAddressBindingCallbackDataEXT` is:

// Provided by VK_EXT_device_address_binding_report
typedef struct VkDeviceAddressBindingCallbackDataEXT {
    VkStructureType                   sType;
    void*                             pNext;
    VkDeviceAddressBindingFlagsEXT    flags;
    VkDeviceAddress                   baseAddress;
    VkDeviceSize                      size;
    VkDeviceAddressBindingTypeEXT     bindingType;
} VkDeviceAddressBindingCallbackDataEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDeviceAddressBindingFlagBitsEXT](#VkDeviceAddressBindingFlagBitsEXT)
specifying additional information about the binding event that caused
the callback to be called.

* 
`baseAddress` is a GPU-accessible virtual address identifying the
start of a region of the virtual address space associated with a Vulkan
object, as identified by the `pObjects` member of
[VkDebugUtilsMessengerCallbackDataEXT](#VkDebugUtilsMessengerCallbackDataEXT).

* 
`size` is the size in bytes of a region of GPU-accessible virtual
address space.

* 
`bindingType` is a [VkDeviceAddressBindingTypeEXT](#VkDeviceAddressBindingTypeEXT) specifying
the type of binding event that caused the callback to be called.

If the [`reportAddressBinding`](features.html#features-reportAddressBinding) feature
is enabled and the implementation binds or unbinds a region of virtual
address space associated with a Vulkan object, the implementation **must**
submit a debug message with the following properties:

* 
`messageSeverity` equal to
[VK_DEBUG_UTILS_MESSAGE_SEVERITY_INFO_BIT_EXT](#VkDebugUtilsMessageSeverityFlagBitsEXT)

* 
`messageTypes` equal to
[VK_DEBUG_UTILS_MESSAGE_TYPE_DEVICE_ADDRESS_BINDING_BIT_EXT](#VkDebugUtilsMessageTypeFlagBitsEXT)

* 
`VkDebugUtilsMessengerCallbackDataEXT`::`pObjects` **must**
identify the associated Vulkan object

* 
`VkDeviceAddressBindingCallbackDataEXT` **must** be included in the
`pNext` chain of `VkDebugUtilsMessengerCallbackDataEXT`

These debug messages **must** be emitted both for GPU virtual address space
regions that are explicitly bound to a Vulkan object via the
`vkBind`*Memory/`vkBind`*Memory2 functions, and for those that are
implicitly generated via memory allocation or importing external memory.

An implementation **may** report binding events associated with a Vulkan object
via `VkDebugUtilsMessengerEXT` prior to the object becoming visible to
an application via other Vulkan commands.
For example, object creation functions **may** report binding events that occur
during an objects creation.
In such cases, `VkDeviceAddressBindingCallbackDataEXT`::`flags`
**must** include [VK_DEVICE_ADDRESS_BINDING_INTERNAL_OBJECT_BIT_EXT](#VkDeviceAddressBindingFlagBitsEXT).

Object handles reported in this manner are not
[valid object handles](fundamentals.html#fundamentals-validusage-handles), and **must** not be
used as an input parameter to any Vulkan command.

Any valid object handle returned by an object creation function **must** match
the handle specified via any previously reported binding events associated
with the object’s creation.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-sType-sType) VUID-VkDeviceAddressBindingCallbackDataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_ADDRESS_BINDING_CALLBACK_DATA_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-flags-parameter) VUID-VkDeviceAddressBindingCallbackDataEXT-flags-parameter

 `flags` **must** be a valid combination of [VkDeviceAddressBindingFlagBitsEXT](#VkDeviceAddressBindingFlagBitsEXT) values

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-baseAddress-parameter) VUID-VkDeviceAddressBindingCallbackDataEXT-baseAddress-parameter

 `baseAddress` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkDeviceAddressBindingCallbackDataEXT-bindingType-parameter) VUID-VkDeviceAddressBindingCallbackDataEXT-bindingType-parameter

 `bindingType` **must** be a valid [VkDeviceAddressBindingTypeEXT](#VkDeviceAddressBindingTypeEXT) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDebugUtilsMessengerCallbackDataEXT](#VkDebugUtilsMessengerCallbackDataEXT)

Bits which **can** be set in
[VkDeviceAddressBindingCallbackDataEXT](#VkDeviceAddressBindingCallbackDataEXT)::`flags` specifying
additional information about a binding event are:

// Provided by VK_EXT_device_address_binding_report
typedef enum VkDeviceAddressBindingFlagBitsEXT {
    VK_DEVICE_ADDRESS_BINDING_INTERNAL_OBJECT_BIT_EXT = 0x00000001,
} VkDeviceAddressBindingFlagBitsEXT;

* 
[VK_DEVICE_ADDRESS_BINDING_INTERNAL_OBJECT_BIT_EXT](#VkDeviceAddressBindingFlagBitsEXT) specifies that
[VkDeviceAddressBindingCallbackDataEXT](#VkDeviceAddressBindingCallbackDataEXT) describes a Vulkan object
that has not been made visible to the application via a Vulkan command.

// Provided by VK_EXT_device_address_binding_report
typedef VkFlags VkDeviceAddressBindingFlagsEXT;

[VkDeviceAddressBindingFlagsEXT](#VkDeviceAddressBindingFlagsEXT) is a bitmask type for setting a mask of
zero or more [VkDeviceAddressBindingFlagBitsEXT](#VkDeviceAddressBindingFlagBitsEXT).

The [VkDeviceAddressBindingTypeEXT](#VkDeviceAddressBindingTypeEXT) enum is defined as:

// Provided by VK_EXT_device_address_binding_report
typedef enum VkDeviceAddressBindingTypeEXT {
    VK_DEVICE_ADDRESS_BINDING_TYPE_BIND_EXT = 0,
    VK_DEVICE_ADDRESS_BINDING_TYPE_UNBIND_EXT = 1,
} VkDeviceAddressBindingTypeEXT;

* 
[VK_DEVICE_ADDRESS_BINDING_TYPE_BIND_EXT](#VkDeviceAddressBindingTypeEXT) specifies that a new
GPU-accessible virtual address range has been bound.

* 
[VK_DEVICE_ADDRESS_BINDING_TYPE_UNBIND_EXT](#VkDeviceAddressBindingTypeEXT) specifies that a
GPU-accessible virtual address range has been unbound.

To intentionally submit a debug message, call:

// Provided by VK_EXT_debug_utils
void vkSubmitDebugUtilsMessageEXT(
    VkInstance                                  instance,
    VkDebugUtilsMessageSeverityFlagBitsEXT      messageSeverity,
    VkDebugUtilsMessageTypeFlagsEXT             messageTypes,
    const VkDebugUtilsMessengerCallbackDataEXT* pCallbackData);

* 
`instance` is the debug stream’s [VkInstance](initialization.html#VkInstance).

* 
`messageSeverity` is a [VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT)
value specifying the severity of this event/message.

* 
`messageTypes` is a bitmask of
[VkDebugUtilsMessageTypeFlagBitsEXT](#VkDebugUtilsMessageTypeFlagBitsEXT) specifying which type of
event(s) to identify with this message.

* 
`pCallbackData` contains all the callback related data in the
[VkDebugUtilsMessengerCallbackDataEXT](#VkDebugUtilsMessengerCallbackDataEXT) structure.

The call will propagate through the layers and generate callback(s) as
indicated by the message’s flags.
The parameters are passed on to the callback in addition to the
`pUserData` value that was defined at the time the messenger was
registered.

Valid Usage

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-objectType-02591) VUID-vkSubmitDebugUtilsMessageEXT-objectType-02591

The `objectType` member of each element of
`pCallbackData->pObjects` **must** not be [VK_OBJECT_TYPE_UNKNOWN](#VkObjectType)

Valid Usage (Implicit)

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-instance-parameter) VUID-vkSubmitDebugUtilsMessageEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-messageSeverity-parameter) VUID-vkSubmitDebugUtilsMessageEXT-messageSeverity-parameter

 `messageSeverity` **must** be a valid [VkDebugUtilsMessageSeverityFlagBitsEXT](#VkDebugUtilsMessageSeverityFlagBitsEXT) value

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-parameter) VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-parameter

 `messageTypes` **must** be a valid combination of [VkDebugUtilsMessageTypeFlagBitsEXT](#VkDebugUtilsMessageTypeFlagBitsEXT) values

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-requiredbitmask) VUID-vkSubmitDebugUtilsMessageEXT-messageTypes-requiredbitmask

 `messageTypes` **must** not be `0`

* 
[](#VUID-vkSubmitDebugUtilsMessageEXT-pCallbackData-parameter) VUID-vkSubmitDebugUtilsMessageEXT-pCallbackData-parameter

 `pCallbackData` **must** be a valid pointer to a valid [VkDebugUtilsMessengerCallbackDataEXT](#VkDebugUtilsMessengerCallbackDataEXT) structure

To destroy a `VkDebugUtilsMessengerEXT` object, call:

// Provided by VK_EXT_debug_utils
void vkDestroyDebugUtilsMessengerEXT(
    VkInstance                                  instance,
    VkDebugUtilsMessengerEXT                    messenger,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the instance where the callback was created.

* 
`messenger` is the [VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT) object to destroy.
`messenger` is an externally synchronized object and **must** not be
used on more than one thread at a time.
This means that `vkDestroyDebugUtilsMessengerEXT` **must** not be
called when a callback is active.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01915) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01915

If `VkAllocationCallbacks` were provided when `messenger` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01916) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-01916

If no `VkAllocationCallbacks` were provided when `messenger` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-instance-parameter) VUID-vkDestroyDebugUtilsMessengerEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parameter) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parameter

 If `messenger` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `messenger` **must** be a valid [VkDebugUtilsMessengerEXT](#VkDebugUtilsMessengerEXT) handle

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-pAllocator-parameter) VUID-vkDestroyDebugUtilsMessengerEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parent) VUID-vkDestroyDebugUtilsMessengerEXT-messenger-parent

 If `messenger` is a valid handle, it **must** have been created, allocated, or retrieved from `instance`

Host Synchronization

* 
Host access to `messenger` **must** be externally synchronized

The application **must** ensure that [vkDestroyDebugUtilsMessengerEXT](#vkDestroyDebugUtilsMessengerEXT) is
not executed in parallel with any Vulkan command that is also called with
`instance` or child of `instance` as the dispatchable argument.

Debug markers provide a flexible way for debugging and validation layers to
receive annotation and debug information.

The [Object Annotation](#debugging-object-annotation) section describes how
to associate a name or binary data with a Vulkan object.

The [Command Buffer Markers](#debugging-command-buffer-markers) section
describes how to associate logical elements of the scene with commands in
the command buffer.

The commands in this section allow application developers to associate
application-defined information with Vulkan objects at will.

An object can be given an application-defined name by calling:

// Provided by VK_EXT_debug_marker
VkResult vkDebugMarkerSetObjectNameEXT(
    VkDevice                                    device,
    const VkDebugMarkerObjectNameInfoEXT*       pNameInfo);

* 
`device` is the device that created the object.

* 
`pNameInfo` is a pointer to a [VkDebugMarkerObjectNameInfoEXT](#VkDebugMarkerObjectNameInfoEXT)
structure specifying the parameters of the name to set on the object.

Valid Usage (Implicit)

* 
[](#VUID-vkDebugMarkerSetObjectNameEXT-device-parameter) VUID-vkDebugMarkerSetObjectNameEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDebugMarkerSetObjectNameEXT-pNameInfo-parameter) VUID-vkDebugMarkerSetObjectNameEXT-pNameInfo-parameter

 `pNameInfo` **must** be a valid pointer to a valid [VkDebugMarkerObjectNameInfoEXT](#VkDebugMarkerObjectNameInfoEXT) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDebugMarkerObjectNameInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_marker
typedef struct VkDebugMarkerObjectNameInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkDebugReportObjectTypeEXT    objectType;
    uint64_t                      object;
    const char*                   pObjectName;
} VkDebugMarkerObjectNameInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) specifying the
type of the object to be named.

* 
`object` is the object to be named.

* 
`pObjectName` is a null-terminated UTF-8 string specifying the name
to apply to `object`.

Applications **may** change the name associated with an object simply by
calling `vkDebugMarkerSetObjectNameEXT` again with a new string.
To remove a previously set name, `pObjectName` **should** be an empty
string.

Valid Usage

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-objectType-01490) VUID-VkDebugMarkerObjectNameInfoEXT-objectType-01490

`objectType` **must** not be
[VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](#VkDebugReportObjectTypeEXT)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-object-01491) VUID-VkDebugMarkerObjectNameInfoEXT-object-01491

`object` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-object-01492) VUID-VkDebugMarkerObjectNameInfoEXT-object-01492

`object` **must** be a Vulkan object of the type associated with
`objectType` as defined in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](#debug-report-object-types)

Valid Usage (Implicit)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-sType-sType) VUID-VkDebugMarkerObjectNameInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_NAME_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-pNext-pNext) VUID-VkDebugMarkerObjectNameInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-objectType-parameter) VUID-VkDebugMarkerObjectNameInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) value

* 
[](#VUID-VkDebugMarkerObjectNameInfoEXT-pObjectName-parameter) VUID-VkDebugMarkerObjectNameInfoEXT-pObjectName-parameter

 `pObjectName` **must** be a null-terminated UTF-8 string

Host Synchronization

* 
Host access to `object` **must** be externally synchronized

In addition to setting a name for an object, debugging and validation layers
may have uses for additional binary data on a per-object basis that has no
other place in the Vulkan API.
For example, a `VkShaderModule` could have additional debugging data
attached to it to aid in offline shader tracing.
To attach data to an object, call:

// Provided by VK_EXT_debug_marker
VkResult vkDebugMarkerSetObjectTagEXT(
    VkDevice                                    device,
    const VkDebugMarkerObjectTagInfoEXT*        pTagInfo);

* 
`device` is the device that created the object.

* 
`pTagInfo` is a pointer to a [VkDebugMarkerObjectTagInfoEXT](#VkDebugMarkerObjectTagInfoEXT)
structure specifying the parameters of the tag to attach to the object.

Valid Usage (Implicit)

* 
[](#VUID-vkDebugMarkerSetObjectTagEXT-device-parameter) VUID-vkDebugMarkerSetObjectTagEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDebugMarkerSetObjectTagEXT-pTagInfo-parameter) VUID-vkDebugMarkerSetObjectTagEXT-pTagInfo-parameter

 `pTagInfo` **must** be a valid pointer to a valid [VkDebugMarkerObjectTagInfoEXT](#VkDebugMarkerObjectTagInfoEXT) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDebugMarkerObjectTagInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_marker
typedef struct VkDebugMarkerObjectTagInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkDebugReportObjectTypeEXT    objectType;
    uint64_t                      object;
    uint64_t                      tagName;
    size_t                        tagSize;
    const void*                   pTag;
} VkDebugMarkerObjectTagInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) specifying the
type of the object to be named.

* 
`object` is the object to be tagged.

* 
`tagName` is a numerical identifier of the tag.

* 
`tagSize` is the number of bytes of data to attach to the object.

* 
`pTag` is a pointer to an array of `tagSize` bytes containing
the data to be associated with the object.

The `tagName` parameter gives a name or identifier to the type of data
being tagged.
This can be used by debugging layers to easily filter for only data that can
be used by that implementation.

Valid Usage

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-objectType-01493) VUID-VkDebugMarkerObjectTagInfoEXT-objectType-01493

`objectType` **must** not be
[VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](#VkDebugReportObjectTypeEXT)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-object-01494) VUID-VkDebugMarkerObjectTagInfoEXT-object-01494

`object` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-object-01495) VUID-VkDebugMarkerObjectTagInfoEXT-object-01495

`object` **must** be a Vulkan object of the type associated with
`objectType` as defined in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](#debug-report-object-types)

Valid Usage (Implicit)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-sType-sType) VUID-VkDebugMarkerObjectTagInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_TAG_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-pNext-pNext) VUID-VkDebugMarkerObjectTagInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-objectType-parameter) VUID-VkDebugMarkerObjectTagInfoEXT-objectType-parameter

 `objectType` **must** be a valid [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) value

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-pTag-parameter) VUID-VkDebugMarkerObjectTagInfoEXT-pTag-parameter

 `pTag` **must** be a valid pointer to an array of `tagSize` bytes

* 
[](#VUID-VkDebugMarkerObjectTagInfoEXT-tagSize-arraylength) VUID-VkDebugMarkerObjectTagInfoEXT-tagSize-arraylength

 `tagSize` **must** be greater than `0`

Host Synchronization

* 
Host access to `object` **must** be externally synchronized

Typical Vulkan applications will submit many command buffers in each frame,
with each command buffer containing a large number of individual commands.
Being able to logically annotate regions of command buffers that belong
together as well as hierarchically subdivide the frame is important to a
developer’s ability to navigate the commands viewed holistically.

The marker commands `vkCmdDebugMarkerBeginEXT` and
`vkCmdDebugMarkerEndEXT` define regions of a series of commands that are
grouped together, and they can be nested to create a hierarchy.
The `vkCmdDebugMarkerInsertEXT` command allows insertion of a single
label within a command buffer.

A marker region can be opened by calling:

// Provided by VK_EXT_debug_marker
void vkCmdDebugMarkerBeginEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDebugMarkerMarkerInfoEXT*           pMarkerInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pMarkerInfo` is a pointer to a [VkDebugMarkerMarkerInfoEXT](#VkDebugMarkerMarkerInfoEXT)
structure specifying the parameters of the marker region to open.

Valid Usage

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-None-10614) VUID-vkCmdDebugMarkerBeginEXT-None-10614

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-parameter) VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-pMarkerInfo-parameter) VUID-vkCmdDebugMarkerBeginEXT-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkDebugMarkerMarkerInfoEXT](#VkDebugMarkerMarkerInfoEXT) structure

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-recording) VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-cmdpool) VUID-vkCmdDebugMarkerBeginEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | State |

Conditional Rendering

vkCmdDebugMarkerBeginEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkDebugMarkerMarkerInfoEXT` structure is defined as:

// Provided by VK_EXT_debug_marker
typedef struct VkDebugMarkerMarkerInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pMarkerName;
    float              color[4];
} VkDebugMarkerMarkerInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pMarkerName` is a pointer to a null-terminated UTF-8 string
containing the name of the marker.

* 
`color` is an **optional** RGBA color value that can be associated with
the marker.
A particular implementation **may** choose to ignore this color value.
The values contain RGBA values in order, in the range 0.0 to 1.0.
If all elements in `color` are 0.0, then it is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkDebugMarkerMarkerInfoEXT-sType-sType) VUID-VkDebugMarkerMarkerInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_MARKER_MARKER_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugMarkerMarkerInfoEXT-pNext-pNext) VUID-VkDebugMarkerMarkerInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDebugMarkerMarkerInfoEXT-pMarkerName-parameter) VUID-VkDebugMarkerMarkerInfoEXT-pMarkerName-parameter

 `pMarkerName` **must** be a null-terminated UTF-8 string

A marker region can be closed by calling:

// Provided by VK_EXT_debug_marker
void vkCmdDebugMarkerEndEXT(
    VkCommandBuffer                             commandBuffer);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

An application **may** open a marker region in one command buffer and close it
in another, or otherwise split marker regions across multiple command
buffers or multiple queue submissions.
When viewed from the linear series of submissions to a single queue, the
calls to `vkCmdDebugMarkerBeginEXT` and `vkCmdDebugMarkerEndEXT`
**must** be matched and balanced.

Valid Usage

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01239) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01239

There **must** be an outstanding [vkCmdDebugMarkerBeginEXT](#vkCmdDebugMarkerBeginEXT) command
prior to the `vkCmdDebugMarkerEndEXT` on the queue that
`commandBuffer` is submitted to

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01240) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-01240

If `commandBuffer` is a secondary command buffer, there **must** be an
outstanding [vkCmdDebugMarkerBeginEXT](#vkCmdDebugMarkerBeginEXT) command recorded to
`commandBuffer` that has not previously been ended by a call to
[vkCmdDebugMarkerEndEXT](#vkCmdDebugMarkerEndEXT)

* 
[](#VUID-vkCmdDebugMarkerEndEXT-None-10615) VUID-vkCmdDebugMarkerEndEXT-None-10615

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-parameter) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-recording) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDebugMarkerEndEXT-commandBuffer-cmdpool) VUID-vkCmdDebugMarkerEndEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | State |

Conditional Rendering

vkCmdDebugMarkerEndEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

A single marker label can be inserted into a command buffer by calling:

// Provided by VK_EXT_debug_marker
void vkCmdDebugMarkerInsertEXT(
    VkCommandBuffer                             commandBuffer,
    const VkDebugMarkerMarkerInfoEXT*           pMarkerInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pMarkerInfo` is a pointer to a [VkDebugMarkerMarkerInfoEXT](#VkDebugMarkerMarkerInfoEXT)
structure specifying the parameters of the marker to insert.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-parameter) VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-pMarkerInfo-parameter) VUID-vkCmdDebugMarkerInsertEXT-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkDebugMarkerMarkerInfoEXT](#VkDebugMarkerMarkerInfoEXT) structure

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-recording) VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-cmdpool) VUID-vkCmdDebugMarkerInsertEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | State |

Conditional Rendering

vkCmdDebugMarkerInsertEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Debug report callbacks are represented by `VkDebugReportCallbackEXT`
handles:

// Provided by VK_EXT_debug_report
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDebugReportCallbackEXT)

Debug report callbacks give more detailed feedback on the application’s use
of Vulkan when events of interest occur.

To register a debug report callback, an application uses
[vkCreateDebugReportCallbackEXT](#vkCreateDebugReportCallbackEXT).

// Provided by VK_EXT_debug_report
VkResult vkCreateDebugReportCallbackEXT(
    VkInstance                                  instance,
    const VkDebugReportCallbackCreateInfoEXT*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDebugReportCallbackEXT*                   pCallback);

* 
`instance` is the instance the callback will be logged on.

* 
`pCreateInfo` is a pointer to a
[VkDebugReportCallbackCreateInfoEXT](#VkDebugReportCallbackCreateInfoEXT) structure defining the
conditions under which this callback will be called.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pCallback` is a pointer to a [VkDebugReportCallbackEXT](#VkDebugReportCallbackEXT) handle
in which the created object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDebugReportCallbackEXT-instance-parameter) VUID-vkCreateDebugReportCallbackEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkCreateDebugReportCallbackEXT-pCreateInfo-parameter) VUID-vkCreateDebugReportCallbackEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDebugReportCallbackCreateInfoEXT](#VkDebugReportCallbackCreateInfoEXT) structure

* 
[](#VUID-vkCreateDebugReportCallbackEXT-pAllocator-parameter) VUID-vkCreateDebugReportCallbackEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDebugReportCallbackEXT-pCallback-parameter) VUID-vkCreateDebugReportCallbackEXT-pCallback-parameter

 `pCallback` **must** be a valid pointer to a [VkDebugReportCallbackEXT](#VkDebugReportCallbackEXT) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The definition of [VkDebugReportCallbackCreateInfoEXT](#VkDebugReportCallbackCreateInfoEXT) is:

// Provided by VK_EXT_debug_report
typedef struct VkDebugReportCallbackCreateInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDebugReportFlagsEXT           flags;
    PFN_vkDebugReportCallbackEXT    pfnCallback;
    void*                           pUserData;
} VkDebugReportCallbackCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDebugReportFlagBitsEXT](#VkDebugReportFlagBitsEXT) specifying
which event(s) will cause this callback to be called.

* 
`pfnCallback` is the application callback function to call.

* 
`pUserData` is NULL or an application-defined user data pointer to
be passed to the callback.

For each `VkDebugReportCallbackEXT` that is created the
`VkDebugReportCallbackCreateInfoEXT`::`flags` determine when that
`VkDebugReportCallbackCreateInfoEXT`::`pfnCallback` is called.
When an event happens, the implementation will do a bitwise AND of the
event’s [VkDebugReportFlagBitsEXT](#VkDebugReportFlagBitsEXT) flags to each
`VkDebugReportCallbackEXT` object’s flags.
For each non-zero result the corresponding callback will be called.
The callback will come directly from the component that detected the event,
unless some other layer intercepts the calls for its own purposes (filter
them in a different way, log to a system error log, etc.).

An application **may** receive multiple callbacks if multiple
`VkDebugReportCallbackEXT` objects were created.
A callback will always be executed in the same thread as the originating
Vulkan call.

A callback may be called from multiple threads simultaneously (if the
application is making Vulkan calls from multiple threads).

Valid Usage (Implicit)

* 
[](#VUID-VkDebugReportCallbackCreateInfoEXT-sType-sType) VUID-VkDebugReportCallbackCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDebugReportCallbackCreateInfoEXT-flags-parameter) VUID-VkDebugReportCallbackCreateInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkDebugReportFlagBitsEXT](#VkDebugReportFlagBitsEXT) values

* 
[](#VUID-VkDebugReportCallbackCreateInfoEXT-pfnCallback-parameter) VUID-VkDebugReportCallbackCreateInfoEXT-pfnCallback-parameter

 `pfnCallback` **must** be a valid [PFN_vkDebugReportCallbackEXT](#PFN_vkDebugReportCallbackEXT) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo)

Bits which **can** be set in
[VkDebugReportCallbackCreateInfoEXT](#VkDebugReportCallbackCreateInfoEXT)::`flags`, specifying events
which cause a debug report, are:

// Provided by VK_EXT_debug_report
typedef enum VkDebugReportFlagBitsEXT {
    VK_DEBUG_REPORT_INFORMATION_BIT_EXT = 0x00000001,
    VK_DEBUG_REPORT_WARNING_BIT_EXT = 0x00000002,
    VK_DEBUG_REPORT_PERFORMANCE_WARNING_BIT_EXT = 0x00000004,
    VK_DEBUG_REPORT_ERROR_BIT_EXT = 0x00000008,
    VK_DEBUG_REPORT_DEBUG_BIT_EXT = 0x00000010,
} VkDebugReportFlagBitsEXT;

* 
[VK_DEBUG_REPORT_ERROR_BIT_EXT](#VkDebugReportFlagBitsEXT) specifies that the application has
violated a valid usage condition of the specification.

* 
[VK_DEBUG_REPORT_WARNING_BIT_EXT](#VkDebugReportFlagBitsEXT) specifies use of Vulkan that **may**
expose an application bug.
Such cases may not be immediately harmful, such as a fragment shader
outputting to a location with no attachment.
Other cases **may** point to behavior that is almost certainly bad when
unintended such as using an image whose memory has not been filled.
In general if you see a warning but you know that the behavior is
intended/desired, then simply ignore the warning.

* 
[VK_DEBUG_REPORT_PERFORMANCE_WARNING_BIT_EXT](#VkDebugReportFlagBitsEXT) specifies a
potentially non-optimal use of Vulkan, e.g. using
[vkCmdClearColorImage](clears.html#vkCmdClearColorImage) when setting
[VkAttachmentDescription](renderpass.html#VkAttachmentDescription)::`loadOp` to
[VK_ATTACHMENT_LOAD_OP_CLEAR](renderpass.html#VkAttachmentLoadOp) would have worked.

* 
[VK_DEBUG_REPORT_INFORMATION_BIT_EXT](#VkDebugReportFlagBitsEXT) specifies an informational
message such as resource details that may be handy when debugging an
application.

* 
[VK_DEBUG_REPORT_DEBUG_BIT_EXT](#VkDebugReportFlagBitsEXT) specifies diagnostic information
from the implementation and layers.

// Provided by VK_EXT_debug_report
typedef VkFlags VkDebugReportFlagsEXT;

`VkDebugReportFlagsEXT` is a bitmask type for setting a mask of zero or
more [VkDebugReportFlagBitsEXT](#VkDebugReportFlagBitsEXT).

The prototype for the
[VkDebugReportCallbackCreateInfoEXT](#VkDebugReportCallbackCreateInfoEXT)::`pfnCallback` function
implemented by the application is:

// Provided by VK_EXT_debug_report
typedef VkBool32 (*PFN_vkDebugReportCallbackEXT)(
    VkDebugReportFlagsEXT                       flags,
    VkDebugReportObjectTypeEXT                  objectType,
    uint64_t                                    object,
    size_t                                      location,
    int32_t                                     messageCode,
    const char*                                 pLayerPrefix,
    const char*                                 pMessage,
    void*                                       pUserData);

* 
`flags` specifies the [VkDebugReportFlagBitsEXT](#VkDebugReportFlagBitsEXT) that triggered
this callback.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) value specifying
the type of object being used or created at the time the event was
triggered.

* 
`object` is the object where the issue was detected.
If `objectType` is [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](#VkDebugReportObjectTypeEXT),
`object` is **undefined**.

* 
`location` is a component (layer, driver, loader) defined value
specifying the *location* of the trigger.
This is an **optional** value.

* 
`messageCode` is a layer-defined value indicating what test
triggered this callback.

* 
`pLayerPrefix` is a null-terminated UTF-8 string that is an
abbreviation of the name of the component making the callback.
`pLayerPrefix` is only valid for the duration of the callback.

* 
`pMessage` is a null-terminated UTF-8 string detailing the trigger
conditions.
`pMessage` is only valid for the duration of the callback.

* 
`pUserData` is the application-defined user data pointer, equal to
the value of [VkDebugReportCallbackCreateInfoEXT](#VkDebugReportCallbackCreateInfoEXT)::`pUserData`
specified when the [VkDebugReportCallbackEXT](#VkDebugReportCallbackEXT) object was created.

The callback **must** not call `vkDestroyDebugReportCallbackEXT`.

The callback returns a `VkBool32`, which is interpreted in a
layer-specified manner.
The application **should** always return [VK_FALSE](fundamentals.html#VK_FALSE).
The [VK_TRUE](fundamentals.html#VK_TRUE) value is reserved for use in layer development.

`object` **must** be a Vulkan object or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).
If `objectType` is not [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](#VkDebugReportObjectTypeEXT) and
`object` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `object` **must** be a Vulkan
object of the corresponding type associated with `objectType` as defined
in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](#debug-report-object-types).

Possible values passed to the `objectType` parameter of the callback
function specified by
[VkDebugReportCallbackCreateInfoEXT](#VkDebugReportCallbackCreateInfoEXT)::`pfnCallback`, specifying the
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

| [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) | Vulkan Handle Type |
| --- | --- |
| [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](#VkDebugReportObjectTypeEXT) | Unknown/Undefined Handle |
| [VK_DEBUG_REPORT_OBJECT_TYPE_INSTANCE_EXT](#VkDebugReportObjectTypeEXT) | [VkInstance](initialization.html#VkInstance) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PHYSICAL_DEVICE_EXT](#VkDebugReportObjectTypeEXT) | [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_EXT](#VkDebugReportObjectTypeEXT) | [VkDevice](devsandqueues.html#VkDevice) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_QUEUE_EXT](#VkDebugReportObjectTypeEXT) | [VkQueue](devsandqueues.html#VkQueue) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SEMAPHORE_EXT](#VkDebugReportObjectTypeEXT) | [VkSemaphore](synchronization.html#VkSemaphore) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_COMMAND_BUFFER_EXT](#VkDebugReportObjectTypeEXT) | [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_FENCE_EXT](#VkDebugReportObjectTypeEXT) | [VkFence](synchronization.html#VkFence) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DEVICE_MEMORY_EXT](#VkDebugReportObjectTypeEXT) | [VkDeviceMemory](memory.html#VkDeviceMemory) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_EXT](#VkDebugReportObjectTypeEXT) | [VkBuffer](resources.html#VkBuffer) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_IMAGE_EXT](#VkDebugReportObjectTypeEXT) | [VkImage](resources.html#VkImage) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_EVENT_EXT](#VkDebugReportObjectTypeEXT) | [VkEvent](synchronization.html#VkEvent) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_QUERY_POOL_EXT](#VkDebugReportObjectTypeEXT) | [VkQueryPool](queries.html#VkQueryPool) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_BUFFER_VIEW_EXT](#VkDebugReportObjectTypeEXT) | [VkBufferView](resources.html#VkBufferView) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_IMAGE_VIEW_EXT](#VkDebugReportObjectTypeEXT) | [VkImageView](resources.html#VkImageView) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SHADER_MODULE_EXT](#VkDebugReportObjectTypeEXT) | [VkShaderModule](shaders.html#VkShaderModule) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_CACHE_EXT](#VkDebugReportObjectTypeEXT) | [VkPipelineCache](pipelines.html#VkPipelineCache) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_LAYOUT_EXT](#VkDebugReportObjectTypeEXT) | [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_RENDER_PASS_EXT](#VkDebugReportObjectTypeEXT) | [VkRenderPass](renderpass.html#VkRenderPass) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_PIPELINE_EXT](#VkDebugReportObjectTypeEXT) | [VkPipeline](pipelines.html#VkPipeline) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_SET_LAYOUT_EXT](#VkDebugReportObjectTypeEXT) | [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SAMPLER_EXT](#VkDebugReportObjectTypeEXT) | [VkSampler](samplers.html#VkSampler) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_POOL_EXT](#VkDebugReportObjectTypeEXT) | [VkDescriptorPool](descriptorsets.html#VkDescriptorPool) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_SET_EXT](#VkDebugReportObjectTypeEXT) | [VkDescriptorSet](descriptorsets.html#VkDescriptorSet) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_FRAMEBUFFER_EXT](#VkDebugReportObjectTypeEXT) | [VkFramebuffer](renderpass.html#VkFramebuffer) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_COMMAND_POOL_EXT](#VkDebugReportObjectTypeEXT) | [VkCommandPool](cmdbuffers.html#VkCommandPool) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SURFACE_KHR_EXT](#VkDebugReportObjectTypeEXT) | [VkSurfaceKHR](VK_KHR_surface/wsi.html#VkSurfaceKHR) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_SWAPCHAIN_KHR_EXT](#VkDebugReportObjectTypeEXT) | [VkSwapchainKHR](VK_KHR_surface/wsi.html#VkSwapchainKHR) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DEBUG_REPORT_CALLBACK_EXT_EXT](#VkDebugReportObjectTypeEXT) | [VkDebugReportCallbackEXT](#VkDebugReportCallbackEXT) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DISPLAY_KHR_EXT](#VkDebugReportObjectTypeEXT) | [VkDisplayKHR](VK_KHR_surface/wsi.html#VkDisplayKHR) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DISPLAY_MODE_KHR_EXT](#VkDebugReportObjectTypeEXT) | [VkDisplayModeKHR](VK_KHR_surface/wsi.html#VkDisplayModeKHR) |
| [VK_DEBUG_REPORT_OBJECT_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_EXT](#VkDebugReportObjectTypeEXT) | [VkDescriptorUpdateTemplate](descriptorsets.html#VkDescriptorUpdateTemplate) |

|  | The primary expected use of [VK_ERROR_VALIDATION_FAILED_EXT](fundamentals.html#VkResult) is for
| --- | --- |
validation layer testing to prevent invalid commands from reaching the ICD.
It is not expected that an application would see this error code during
normal use of the validation layers.
If an application returns [VK_TRUE](fundamentals.html#VK_TRUE) in
[VkDebugUtilsMessengerCallbackDataEXT](#VkDebugUtilsMessengerCallbackDataEXT), the validation layers will
return this error code instead of passing the command down the dispatch
chain. |

To inject its own messages into the debug stream, call:

// Provided by VK_EXT_debug_report
void vkDebugReportMessageEXT(
    VkInstance                                  instance,
    VkDebugReportFlagsEXT                       flags,
    VkDebugReportObjectTypeEXT                  objectType,
    uint64_t                                    object,
    size_t                                      location,
    int32_t                                     messageCode,
    const char*                                 pLayerPrefix,
    const char*                                 pMessage);

* 
`instance` is the debug stream’s [VkInstance](initialization.html#VkInstance).

* 
`flags` specifies the [VkDebugReportFlagBitsEXT](#VkDebugReportFlagBitsEXT) classification
of this event/message.

* 
`objectType` is a [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) specifying the
type of object being used or created at the time the event was
triggered.

* 
`object` is the object where the issue was detected.
`object` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) if there is no object
associated with the event.

* 
`location` is an application-defined value.

* 
`messageCode` is an application-defined value.

* 
`pLayerPrefix` is the abbreviation of the component making this
event/message.

* 
`pMessage` is a null-terminated UTF-8 string detailing the trigger
conditions.

The call will propagate through the layers and generate callback(s) as
indicated by the message’s flags.
The parameters are passed on to the callback in addition to the
`pUserData` value that was defined at the time the callback was
registered.

Valid Usage

* 
[](#VUID-vkDebugReportMessageEXT-object-01241) VUID-vkDebugReportMessageEXT-object-01241

`object` **must** be a Vulkan object or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkDebugReportMessageEXT-objectType-01498) VUID-vkDebugReportMessageEXT-objectType-01498

If `objectType` is not [VK_DEBUG_REPORT_OBJECT_TYPE_UNKNOWN_EXT](#VkDebugReportObjectTypeEXT)
and `object` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `object` **must** be a
Vulkan object of the corresponding type associated with `objectType`
as defined in [VkDebugReportObjectTypeEXT and Vulkan Handle Relationship](#debug-report-object-types)

Valid Usage (Implicit)

* 
[](#VUID-vkDebugReportMessageEXT-instance-parameter) VUID-vkDebugReportMessageEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkDebugReportMessageEXT-flags-parameter) VUID-vkDebugReportMessageEXT-flags-parameter

 `flags` **must** be a valid combination of [VkDebugReportFlagBitsEXT](#VkDebugReportFlagBitsEXT) values

* 
[](#VUID-vkDebugReportMessageEXT-flags-requiredbitmask) VUID-vkDebugReportMessageEXT-flags-requiredbitmask

 `flags` **must** not be `0`

* 
[](#VUID-vkDebugReportMessageEXT-objectType-parameter) VUID-vkDebugReportMessageEXT-objectType-parameter

 `objectType` **must** be a valid [VkDebugReportObjectTypeEXT](#VkDebugReportObjectTypeEXT) value

* 
[](#VUID-vkDebugReportMessageEXT-pLayerPrefix-parameter) VUID-vkDebugReportMessageEXT-pLayerPrefix-parameter

 `pLayerPrefix` **must** be a null-terminated UTF-8 string

* 
[](#VUID-vkDebugReportMessageEXT-pMessage-parameter) VUID-vkDebugReportMessageEXT-pMessage-parameter

 `pMessage` **must** be a null-terminated UTF-8 string

To destroy a `VkDebugReportCallbackEXT` object, call:

// Provided by VK_EXT_debug_report
void vkDestroyDebugReportCallbackEXT(
    VkInstance                                  instance,
    VkDebugReportCallbackEXT                    callback,
    const VkAllocationCallbacks*                pAllocator);

* 
`instance` is the instance where the callback was created.

* 
`callback` is the [VkDebugReportCallbackEXT](#VkDebugReportCallbackEXT) object to destroy.
`callback` is an externally synchronized object and **must** not be
used on more than one thread at a time.
This means that `vkDestroyDebugReportCallbackEXT` **must** not be
called when a callback is active.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-instance-01242) VUID-vkDestroyDebugReportCallbackEXT-instance-01242

If `VkAllocationCallbacks` were provided when `callback` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-instance-01243) VUID-vkDestroyDebugReportCallbackEXT-instance-01243

If no `VkAllocationCallbacks` were provided when `callback` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-instance-parameter) VUID-vkDestroyDebugReportCallbackEXT-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-callback-parameter) VUID-vkDestroyDebugReportCallbackEXT-callback-parameter

 If `callback` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `callback` **must** be a valid [VkDebugReportCallbackEXT](#VkDebugReportCallbackEXT) handle

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-pAllocator-parameter) VUID-vkDestroyDebugReportCallbackEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyDebugReportCallbackEXT-callback-parent) VUID-vkDestroyDebugReportCallbackEXT-callback-parent

 If `callback` is a valid handle, it **must** have been created, allocated, or retrieved from `instance`

Host Synchronization

* 
Host access to `callback` **must** be externally synchronized

Device execution progress **can** be tracked for the purposes of debugging a
device loss by annotating the command stream with application-defined
diagnostic checkpoints.

Device diagnostic checkpoints are inserted into the command stream by
calling [vkCmdSetCheckpointNV](#vkCmdSetCheckpointNV).

// Provided by VK_NV_device_diagnostic_checkpoints
void vkCmdSetCheckpointNV(
    VkCommandBuffer                             commandBuffer,
    const void*                                 pCheckpointMarker);

* 
`commandBuffer` is the command buffer that will receive the marker

* 
`pCheckpointMarker` is an opaque application-provided value that
will be associated with the checkpoint.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetCheckpointNV-commandBuffer-parameter) VUID-vkCmdSetCheckpointNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetCheckpointNV-commandBuffer-recording) VUID-vkCmdSetCheckpointNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetCheckpointNV-commandBuffer-cmdpool) VUID-vkCmdSetCheckpointNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetCheckpointNV-suspended) VUID-vkCmdSetCheckpointNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetCheckpointNV-videocoding) VUID-vkCmdSetCheckpointNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdSetCheckpointNV is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Note that `pCheckpointMarker` is treated as an opaque value.
It does not need to be a valid pointer and will not be dereferenced by the
implementation.

If the device encounters an error during execution, the implementation will
return a [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) error to the application at some point
during host execution.
When this happens, the application **can** call
[vkGetQueueCheckpointData2NV](#vkGetQueueCheckpointData2NV) to retrieve information on the most recent
diagnostic checkpoints that were executed by the device.

// Provided by VK_NV_device_diagnostic_checkpoints with VK_VERSION_1_3 or VK_KHR_synchronization2
void vkGetQueueCheckpointData2NV(
    VkQueue                                     queue,
    uint32_t*                                   pCheckpointDataCount,
    VkCheckpointData2NV*                        pCheckpointData);

* 
`queue` is the [VkQueue](devsandqueues.html#VkQueue) object the caller would like to
retrieve checkpoint data for

* 
`pCheckpointDataCount` is a pointer to an integer related to the
number of checkpoint markers available or queried, as described below.

* 
`pCheckpointData` is either `NULL` or a pointer to an array of
`VkCheckpointData2NV` structures.

If `pCheckpointData` is `NULL`, then the number of checkpoint markers
available is returned in `pCheckpointDataCount`.
Otherwise, `pCheckpointDataCount` **must** point to a variable set by the
application to the number of elements in the `pCheckpointData` array,
and on return the variable is overwritten with the number of structures
actually written to `pCheckpointData`.

If `pCheckpointDataCount` is less than the number of checkpoint markers
available, at most `pCheckpointDataCount` structures will be written.

Valid Usage

* 
[](#VUID-vkGetQueueCheckpointData2NV-queue-03892) VUID-vkGetQueueCheckpointData2NV-queue-03892

The device that `queue` belongs to **must** be in the lost state

Valid Usage (Implicit)

* 
[](#VUID-vkGetQueueCheckpointData2NV-queue-parameter) VUID-vkGetQueueCheckpointData2NV-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkGetQueueCheckpointData2NV-pCheckpointDataCount-parameter) VUID-vkGetQueueCheckpointData2NV-pCheckpointDataCount-parameter

 `pCheckpointDataCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetQueueCheckpointData2NV-pCheckpointData-parameter) VUID-vkGetQueueCheckpointData2NV-pCheckpointData-parameter

 If the value referenced by `pCheckpointDataCount` is not `0`, and `pCheckpointData` is not `NULL`, `pCheckpointData` **must** be a valid pointer to an array of `pCheckpointDataCount` [VkCheckpointData2NV](#VkCheckpointData2NV) structures

The [VkCheckpointData2NV](#VkCheckpointData2NV) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints with VK_VERSION_1_3 or VK_KHR_synchronization2
typedef struct VkCheckpointData2NV {
    VkStructureType          sType;
    void*                    pNext;
    VkPipelineStageFlags2    stage;
    void*                    pCheckpointMarker;
} VkCheckpointData2NV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stage` indicates a single pipeline stage which the checkpoint
marker data refers to.

* 
`pCheckpointMarker` contains the value of the last checkpoint marker
executed in the stage that `stage` refers to.

Valid Usage (Implicit)

* 
[](#VUID-VkCheckpointData2NV-sType-sType) VUID-VkCheckpointData2NV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CHECKPOINT_DATA_2_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCheckpointData2NV-pNext-pNext) VUID-VkCheckpointData2NV-pNext-pNext

 `pNext` **must** be `NULL`

The stages at which a checkpoint marker **can** be executed are
implementation-defined and **can** be queried by calling
[vkGetPhysicalDeviceQueueFamilyProperties2](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2).

If the device encounters an error during execution, the implementation will
return a [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) error to the application at a certain
point during host execution.
When this happens, the application **can** call
[vkGetQueueCheckpointDataNV](#vkGetQueueCheckpointDataNV) to retrieve information on the most recent
diagnostic checkpoints that were executed by the device.

// Provided by VK_NV_device_diagnostic_checkpoints
void vkGetQueueCheckpointDataNV(
    VkQueue                                     queue,
    uint32_t*                                   pCheckpointDataCount,
    VkCheckpointDataNV*                         pCheckpointData);

* 
`queue` is the [VkQueue](devsandqueues.html#VkQueue) object the caller would like to
retrieve checkpoint data for

* 
`pCheckpointDataCount` is a pointer to an integer related to the
number of checkpoint markers available or queried, as described below.

* 
`pCheckpointData` is either `NULL` or a pointer to an array of
`VkCheckpointDataNV` structures.

If `pCheckpointData` is `NULL`, then the number of checkpoint markers
available is returned in `pCheckpointDataCount`.

Otherwise, `pCheckpointDataCount` **must** point to a variable set by the
application to the number of elements in the `pCheckpointData` array,
and on return the variable is overwritten with the number of structures
actually written to `pCheckpointData`.

If `pCheckpointDataCount` is less than the number of checkpoint markers
available, at most `pCheckpointDataCount` structures will be written.

Valid Usage

* 
[](#VUID-vkGetQueueCheckpointDataNV-queue-02025) VUID-vkGetQueueCheckpointDataNV-queue-02025

The device that `queue` belongs to **must** be in the lost state

Valid Usage (Implicit)

* 
[](#VUID-vkGetQueueCheckpointDataNV-queue-parameter) VUID-vkGetQueueCheckpointDataNV-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkGetQueueCheckpointDataNV-pCheckpointDataCount-parameter) VUID-vkGetQueueCheckpointDataNV-pCheckpointDataCount-parameter

 `pCheckpointDataCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetQueueCheckpointDataNV-pCheckpointData-parameter) VUID-vkGetQueueCheckpointDataNV-pCheckpointData-parameter

 If the value referenced by `pCheckpointDataCount` is not `0`, and `pCheckpointData` is not `NULL`, `pCheckpointData` **must** be a valid pointer to an array of `pCheckpointDataCount` [VkCheckpointDataNV](#VkCheckpointDataNV) structures

The [VkCheckpointDataNV](#VkCheckpointDataNV) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints
typedef struct VkCheckpointDataNV {
    VkStructureType            sType;
    void*                      pNext;
    VkPipelineStageFlagBits    stage;
    void*                      pCheckpointMarker;
} VkCheckpointDataNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stage` is a [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) value specifying which
pipeline stage the checkpoint marker data refers to.

* 
`pCheckpointMarker` contains the value of the last checkpoint marker
executed in the stage that `stage` refers to.

The stages at which a checkpoint marker **can** be executed are
implementation-defined and **can** be queried by calling
[vkGetPhysicalDeviceQueueFamilyProperties2](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2).

Valid Usage (Implicit)

* 
[](#VUID-VkCheckpointDataNV-sType-sType) VUID-VkCheckpointDataNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_CHECKPOINT_DATA_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCheckpointDataNV-pNext-pNext) VUID-VkCheckpointDataNV-pNext-pNext

 `pNext` **must** be `NULL`

To retrieve diagnostic information about faults that **may** have caused device
loss, call:

// Provided by VK_EXT_device_fault
VkResult vkGetDeviceFaultInfoEXT(
    VkDevice                                    device,
    VkDeviceFaultCountsEXT*                     pFaultCounts,
    VkDeviceFaultInfoEXT*                       pFaultInfo);

* 
`device` is the logical device from which to query the diagnostic
fault information.

* 
`pFaultCounts` is a pointer to a [VkDeviceFaultCountsEXT](#VkDeviceFaultCountsEXT)
structure in which counts for structures describing additional fault
information are returned.

* 
`pFaultInfo` is `NULL` or a pointer to a [VkDeviceFaultInfoEXT](#VkDeviceFaultInfoEXT)
structure in which fault information is returned.

If `pFaultInfo` is `NULL`, then the counts of corresponding additional
fault information structures available are returned in the
`addressInfoCount` and `vendorInfoCount` members of
`pFaultCounts`.
Additionally, the size of any vendor-specific binary crash dump is returned
in the `vendorBinarySize` member of `pFaultCounts`.

If `pFaultInfo` is not `NULL`, `pFaultCounts` **must** point to a
[VkDeviceFaultCountsEXT](#VkDeviceFaultCountsEXT) structure with each structure count or size
member (`addressInfoCount`, `vendorInfoCount`,
`vendorBinarySize`) set by the application to the number of elements in
the corresponding output array member of `pFaultInfo`
(`pAddressInfos` and `pVendorInfos`), or to the size of the output
buffer in bytes (`pVendorBinaryData`).
On return, each structure count member is overwritten with the number of
structures actually written to the corresponding output array member of
`pFaultInfo`.
Similarly, `vendorBinarySize` is overwritten with the number of bytes
actually written to the `pVendorBinaryData` member of `pFaultInfo`.

If the [vendor-specific crash dumps](features.html#features-deviceFaultVendorBinary)
feature is not enabled, then implementations **must** set
`pFaultCounts`->vendorBinarySize to zero and **must** not modify
`pFaultInfo`->pVendorBinaryData.

If any `pFaultCounts` structure count member is less than the number of
corresponding fault properties available, at most structure count
(`addressInfoCount`, `vendorInfoCount`) elements will be written to
the associated `pFaultInfo` output array.
Similarly, if `vendorBinarySize` is less than the size in bytes of the
available crash dump data, at most `vendorBinarySize` elements will be
written to `pVendorBinaryData`.

If `pFaultInfo` is `NULL`, then subsequent calls to
[vkGetDeviceFaultInfoEXT](#vkGetDeviceFaultInfoEXT) for the same `device` **must** return
identical values in the `addressInfoCount`, `vendorInfoCount` and
`vendorBinarySize` members of `pFaultCounts`.

If `pFaultInfo` is not `NULL`, then subsequent calls to
[vkGetDeviceFaultInfoEXT](#vkGetDeviceFaultInfoEXT) for the same `device` **must** return
identical values in the output members of `pFaultInfo`
(`pAddressInfos`, `pVendorInfos`, `pVendorBinaryData`), up to
the limits described by the structure count and buffer size members of
`pFaultCounts` (`addressInfoCount`, `vendorInfoCount`,
`vendorBinarySize`).
If the sizes of the output members of `pFaultInfo` increase for a
subsequent call to [vkGetDeviceFaultInfoEXT](#vkGetDeviceFaultInfoEXT), then supplementary
information **may** be returned in the additional available space.

If any `pFaultCounts` structure count member is smaller than the number
of corresponding fault properties available, or if
`pFaultCounts`->vendorBinarySize is smaller than the size in bytes of
the generated binary crash dump data, [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned
instead of [VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available
properties were returned.

If `pFaultCounts`->vendorBinarySize is less than what is necessary to
store the [binary crash dump header](#vendor-binary-crash-dumps), nothing
will be written to `pFaultInfo`->pVendorBinaryData and zero will be
written to `pFaultCounts`->vendorBinarySize.

Valid Usage

* 
[](#VUID-vkGetDeviceFaultInfoEXT-device-07336) VUID-vkGetDeviceFaultInfoEXT-device-07336

`device` **must** be in the *lost* state

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07337) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07337

If the value referenced by `pFaultCounts->addressInfoCount` is not
`0`, and `pFaultInfo->pAddressInfos` is not `NULL`,
`pFaultInfo->pAddressInfos` **must** be a valid pointer to an array of
`pFaultCounts->addressInfoCount` [VkDeviceFaultAddressInfoEXT](#VkDeviceFaultAddressInfoEXT)
structures

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07338) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07338

If the value referenced by `pFaultCounts->vendorInfoCount` is not
`0`, and `pFaultInfo->pVendorInfos` is not `NULL`,
`pFaultInfo->pVendorInfos` **must** be a valid pointer to an array of
`pFaultCounts->vendorInfoCount` [VkDeviceFaultVendorInfoEXT](#VkDeviceFaultVendorInfoEXT)
structures

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07339) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-07339

If the value referenced by `pFaultCounts->vendorBinarySize` is not
`0`, and `pFaultInfo->pVendorBinaryData` is not `NULL`,
`pFaultInfo->pVendorBinaryData` **must** be a valid pointer to an array
of `pFaultCounts->vendorBinarySize` bytes

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceFaultInfoEXT-device-parameter) VUID-vkGetDeviceFaultInfoEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-parameter) VUID-vkGetDeviceFaultInfoEXT-pFaultCounts-parameter

 `pFaultCounts` **must** be a valid pointer to a [VkDeviceFaultCountsEXT](#VkDeviceFaultCountsEXT) structure

* 
[](#VUID-vkGetDeviceFaultInfoEXT-pFaultInfo-parameter) VUID-vkGetDeviceFaultInfoEXT-pFaultInfo-parameter

 If `pFaultInfo` is not `NULL`, `pFaultInfo` **must** be a valid pointer to a [VkDeviceFaultInfoEXT](#VkDeviceFaultInfoEXT) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDeviceFaultCountsEXT` structure is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkDeviceFaultCountsEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           addressInfoCount;
    uint32_t           vendorInfoCount;
    VkDeviceSize       vendorBinarySize;
} VkDeviceFaultCountsEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`addressInfoCount` is the number of
[VkDeviceFaultAddressInfoEXT](#VkDeviceFaultAddressInfoEXT) structures describing either memory
accesses which **may** have caused a page fault, or the addresses of active
instructions at the time of the fault.

* 
`vendorInfoCount` is the number of [VkDeviceFaultVendorInfoEXT](#VkDeviceFaultVendorInfoEXT)
structures describing vendor-specific fault information.

* 
`vendorBinarySize` is the size in bytes of a vendor-specific binary
crash dump, which may provide additional information when imported into
external tools.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultCountsEXT-sType-sType) VUID-VkDeviceFaultCountsEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_FAULT_COUNTS_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceFaultCountsEXT-pNext-pNext) VUID-VkDeviceFaultCountsEXT-pNext-pNext

 `pNext` **must** be `NULL`

The `VkDeviceFaultInfoEXT` structure is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkDeviceFaultInfoEXT {
    VkStructureType                 sType;
    void*                           pNext;
    char                            description[VK_MAX_DESCRIPTION_SIZE];
    VkDeviceFaultAddressInfoEXT*    pAddressInfos;
    VkDeviceFaultVendorInfoEXT*     pVendorInfos;
    void*                           pVendorBinaryData;
} VkDeviceFaultInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a human readable
description of the fault.

* 
`pAddressInfos` is `NULL` or a pointer to an array of
[VkDeviceFaultAddressInfoEXT](#VkDeviceFaultAddressInfoEXT) structures describing either memory
accesses which **may** have caused a page fault, or describing active
instruction pointers at the time of the fault.
If not `NULL`, each element of `pAddressInfos` describes the a
bounded region of GPU virtual address space containing either the GPU
virtual address accessed, or the value of an active instruction pointer.

* 
`pVendorInfos` is `NULL` or a pointer to an array of
[VkDeviceFaultVendorInfoEXT](#VkDeviceFaultVendorInfoEXT) structures describing vendor-specific
fault information.

* 
`pVendorBinaryData` is `NULL` or a pointer to `vendorBinarySize`
number of bytes of data, which will be populated with a vendor-specific
binary crash dump, as described in [Vendor    Binary Crash Dumps](#vendor-binary-crash-dumps).

An implementation **should** populate as many members of
[VkDeviceFaultInfoEXT](#VkDeviceFaultInfoEXT) as possible, given the information available at
the time of the fault and the constraints of the implementation itself.

Due to hardware limitations, `pAddressInfos` describes ranges of GPU
virtual address space, rather than precise addresses.
The precise memory address accessed or the precise value of the instruction
pointer **must** lie within the region described.

|  | Each element of `pAddressInfos` describes either:
| --- | --- |

* 
A memory access which may have triggered a page fault and may have
contributed to device loss

* 
The value of an active instruction pointer at the time a fault occurred.
This value may be indicative of the active pipeline or shader at the
time of device loss

Comparison of the GPU virtual addresses described by `pAddressInfos` to
GPU virtual address ranges reported by the
`[VK_EXT_device_address_binding_report](../appendices/extensions.html#VK_EXT_device_address_binding_report)` extension may allow
applications to correlate between these addresses and Vulkan objects.
Applications should be aware that these addresses may also correspond to
resources internal to an implementation, which will not be reported via the
`[VK_EXT_device_address_binding_report](../appendices/extensions.html#VK_EXT_device_address_binding_report)` extension. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultInfoEXT-sType-sType) VUID-VkDeviceFaultInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceFaultInfoEXT-pNext-pNext) VUID-VkDeviceFaultInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

The `VkDeviceFaultAddressInfoEXT` structure is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkDeviceFaultAddressInfoEXT {
    VkDeviceFaultAddressTypeEXT    addressType;
    VkDeviceAddress                reportedAddress;
    VkDeviceSize                   addressPrecision;
} VkDeviceFaultAddressInfoEXT;

* 
`addressType` is either the type of memory operation that triggered
a page fault, or the type of association between an instruction pointer
and a fault.

* 
`reportedAddress` is the GPU virtual address recorded by the device.

* 
`addressPrecision` is a power of two value that specifies how
precisely the device can report the address.

The combination of `reportedAddress` and `addressPrecision` allow
the possible range of addresses to be calculated, such that:

lower_address = (pInfo->reportedAddress & ~(pInfo->addressPrecision-1))
upper_address = (pInfo->reportedAddress |  (pInfo->addressPrecision-1))

|  | It is valid for the `reportedAddress` to contain a more precise address
| --- | --- |
than indicated by `addressPrecision`.
In this case, the value of `reportedAddress` should be treated as an
additional hint as to the value of the address that triggered the page
fault, or to the value of an instruction pointer. |

Possible values of [VkDeviceFaultAddressInfoEXT](#VkDeviceFaultAddressInfoEXT)::`addressType` are:

// Provided by VK_EXT_device_fault
typedef enum VkDeviceFaultAddressTypeEXT {
    VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_EXT = 0,
    VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_EXT = 1,
    VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_EXT = 2,
    VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_EXT = 3,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_EXT = 4,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_EXT = 5,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_EXT = 6,
} VkDeviceFaultAddressTypeEXT;

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_EXT](#VkDeviceFaultAddressTypeEXT) specifies that
[VkDeviceFaultAddressInfoEXT](#VkDeviceFaultAddressInfoEXT) does not describe a page fault, or an
instruction address.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_EXT](#VkDeviceFaultAddressTypeEXT) specifies that
[VkDeviceFaultAddressInfoEXT](#VkDeviceFaultAddressInfoEXT) describes a page fault triggered by an
invalid read operation.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_EXT](#VkDeviceFaultAddressTypeEXT) specifies that
[VkDeviceFaultAddressInfoEXT](#VkDeviceFaultAddressInfoEXT) describes a page fault triggered by an
invalid write operation.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_EXT](#VkDeviceFaultAddressTypeEXT) describes a page
fault triggered by an attempt to execute non-executable memory.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_EXT](#VkDeviceFaultAddressTypeEXT)
specifies an instruction pointer value at the time the fault occurred.
This may or may not be related to a fault.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_EXT](#VkDeviceFaultAddressTypeEXT)
specifies an instruction pointer value associated with an invalid
instruction fault.

* 
[VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_EXT](#VkDeviceFaultAddressTypeEXT)
specifies an instruction pointer value associated with a fault.

|  | The instruction pointer values recorded may not identify the specific
| --- | --- |
instruction(s) that triggered the fault.
The relationship between the instruction pointer reported and triggering
instruction will be vendor-specific. |

The `VkDeviceFaultVendorInfoEXT` structure is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkDeviceFaultVendorInfoEXT {
    char        description[VK_MAX_DESCRIPTION_SIZE];
    uint64_t    vendorFaultCode;
    uint64_t    vendorFaultData;
} VkDeviceFaultVendorInfoEXT;

* 
`description` is an array of [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE) `char`
containing a null-terminated UTF-8 string which is a human readable
description of the fault.

* 
`vendorFaultCode` is the vendor-specific fault code for this fault.

* 
`vendorFaultData` is the vendor-specific fault data associated with
this fault.

Applications **can** store the vendor-specific binary crash dump data retrieved
by calling [vkGetDeviceFaultInfoEXT](#vkGetDeviceFaultInfoEXT) for later analysis using external
tools.

However, the format of this data **may** depend on the vendor ID, device ID,
driver version, and other details of the device.
To enable external applications to identify the original device from which a
crash dump was generated, the initial bytes written to
`VkDeviceFaultInfoEXT`::`pVendorBinaryData` **must** begin with a valid
crash dump header.

Version one of the crash dump header is defined as:

// Provided by VK_EXT_device_fault
typedef struct VkDeviceFaultVendorBinaryHeaderVersionOneEXT {
    uint32_t                                     headerSize;
    VkDeviceFaultVendorBinaryHeaderVersionEXT    headerVersion;
    uint32_t                                     vendorID;
    uint32_t                                     deviceID;
    uint32_t                                     driverVersion;
    uint8_t                                      pipelineCacheUUID[VK_UUID_SIZE];
    uint32_t                                     applicationNameOffset;
    uint32_t                                     applicationVersion;
    uint32_t                                     engineNameOffset;
    uint32_t                                     engineVersion;
    uint32_t                                     apiVersion;
} VkDeviceFaultVendorBinaryHeaderVersionOneEXT;

* 
`headerSize` is the length in bytes of the crash dump header.

* 
`headerVersion` is a [VkDeviceFaultVendorBinaryHeaderVersionEXT](#VkDeviceFaultVendorBinaryHeaderVersionEXT)
enum value specifying the version of the header.
A consumer of the crash dump **should** use the header version to interpret
the remainder of the header.
`headerVersion` **must** be written as exactly 4 bytes.

* 
`vendorID` is the `VkPhysicalDeviceProperties`::`vendorID`
of the implementation.

* 
`deviceID` is the `VkPhysicalDeviceProperties`::`deviceID`
of the implementation.

* 
`driverVersion` is the
`VkPhysicalDeviceProperties`::`driverVersion` of the
implementation.

* 
`pipelineCacheUUID` is an array of [VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) `uint8_t`
values matching the
`VkPhysicalDeviceProperties`::`pipelineCacheUUID` property of
the implementation.

* 
`applicationNameOffset` is zero, or an offset from the base address
of the crash dump header to a null-terminated UTF-8 string containing
the name of the application.
If `applicationNameOffset` is non-zero, this string **must** match the
application name specified via
[VkApplicationInfo](initialization.html#VkApplicationInfo)::`pApplicationName` during instance
creation.

* 
`applicationVersion` **must** be zero or the value specified by
[VkApplicationInfo](initialization.html#VkApplicationInfo)::`applicationVersion` during instance
creation.

* 
`engineNameOffset` is zero, or an offset from the base address of
the crash dump header to a null-terminated UTF-8 string containing the
name of the engine (if any) used to create the application.
If `engineNameOffset` is non-zero, this string **must** match the
engine name specified via [VkApplicationInfo](initialization.html#VkApplicationInfo)::`pEngineName`
during instance creation.

* 
`engineVersion` **must** be zero or the value specified by
[VkApplicationInfo](initialization.html#VkApplicationInfo)::`engineVersion` during instance creation.

* 
`apiVersion` **must** be zero or the value specified by
[VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` during instance creation.

Unlike most structures declared by the Vulkan API, all fields of this
structure are written with the least significant byte first, regardless of
host byte-order.

The C language specification does not define the packing of structure
members.
This layout assumes tight structure member packing, with members laid out in
the order listed in the structure, and the intended size of the structure is
56 bytes.
If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values at the correct offsets.

Valid Usage

* 
[](#VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerSize-07340) VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerSize-07340

`headerSize` **must** be 56

* 
[](#VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerVersion-07341) VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerVersion-07341

`headerVersion` **must** be
[VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_EXT](#VkDeviceFaultVendorBinaryHeaderVersionEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerVersion-parameter) VUID-VkDeviceFaultVendorBinaryHeaderVersionOneEXT-headerVersion-parameter

 `headerVersion` **must** be a valid [VkDeviceFaultVendorBinaryHeaderVersionEXT](#VkDeviceFaultVendorBinaryHeaderVersionEXT) value

Possible values of the `headerVersion` value of the crash dump header
are:

// Provided by VK_EXT_device_fault
typedef enum VkDeviceFaultVendorBinaryHeaderVersionEXT {
    VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_EXT = 1,
} VkDeviceFaultVendorBinaryHeaderVersionEXT;

* 
[VK_DEVICE_FAULT_VENDOR_BINARY_HEADER_VERSION_ONE_EXT](#VkDeviceFaultVendorBinaryHeaderVersionEXT) specifies
version one of the binary crash dump header.

Information about tools providing debugging, profiling, or similar services,
active for a given physical device, can be obtained by calling:

// Provided by VK_VERSION_1_3
VkResult vkGetPhysicalDeviceToolProperties(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pToolCount,
    VkPhysicalDeviceToolProperties*             pToolProperties);

// Provided by VK_EXT_tooling_info
// Equivalent to vkGetPhysicalDeviceToolProperties
VkResult vkGetPhysicalDeviceToolPropertiesEXT(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pToolCount,
    VkPhysicalDeviceToolProperties*             pToolProperties);

* 
`physicalDevice` is the handle to the physical device to query for
active tools.

* 
`pToolCount` is a pointer to an integer describing the number of
tools active on `physicalDevice`.

* 
`pToolProperties` is either `NULL` or a pointer to an array of
[VkPhysicalDeviceToolProperties](#VkPhysicalDeviceToolProperties) structures.

If `pToolProperties` is `NULL`, then the number of tools currently
active on `physicalDevice` is returned in `pToolCount`.
Otherwise, `pToolCount` **must** point to a variable set by the application
to the number of elements in the `pToolProperties` array, and on return
the variable is overwritten with the number of structures actually written
to `pToolProperties`.
If `pToolCount` is less than the number of currently active tools, at
most `pToolCount` structures will be written.

The count and properties of active tools **may** change in response to events
outside the scope of the specification.
An application **should** assume these properties might change at any given
time.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceToolProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceToolProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceToolProperties-pToolCount-parameter) VUID-vkGetPhysicalDeviceToolProperties-pToolCount-parameter

 `pToolCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceToolProperties-pToolProperties-parameter) VUID-vkGetPhysicalDeviceToolProperties-pToolProperties-parameter

 If the value referenced by `pToolCount` is not `0`, and `pToolProperties` is not `NULL`, `pToolProperties` **must** be a valid pointer to an array of `pToolCount` [VkPhysicalDeviceToolProperties](#VkPhysicalDeviceToolProperties) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The [VkPhysicalDeviceToolProperties](#VkPhysicalDeviceToolProperties) structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceToolProperties {
    VkStructureType       sType;
    void*                 pNext;
    char                  name[VK_MAX_EXTENSION_NAME_SIZE];
    char                  version[VK_MAX_EXTENSION_NAME_SIZE];
    VkToolPurposeFlags    purposes;
    char                  description[VK_MAX_DESCRIPTION_SIZE];
    char                  layer[VK_MAX_EXTENSION_NAME_SIZE];
} VkPhysicalDeviceToolProperties;

// Provided by VK_EXT_tooling_info
// Equivalent to VkPhysicalDeviceToolProperties
typedef VkPhysicalDeviceToolProperties VkPhysicalDeviceToolPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`name` is a null-terminated UTF-8 string containing the name of the
tool.

* 
`version` is a null-terminated UTF-8 string containing the version
of the tool.

* 
`purposes` is a bitmask of [VkToolPurposeFlagBits](#VkToolPurposeFlagBits) which is
populated with purposes supported by the tool.

* 
`description` is a null-terminated UTF-8 string containing a
description of the tool.

* 
`layer` is a null-terminated UTF-8 string containing the name of the
layer implementing the tool, if the tool is implemented in a layer -
otherwise it **may** be an empty string.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceToolProperties-sType-sType) VUID-VkPhysicalDeviceToolProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceToolProperties-pNext-pNext) VUID-VkPhysicalDeviceToolProperties-pNext-pNext

 `pNext` **must** be `NULL`

Bits which **can** be set in
[VkPhysicalDeviceToolProperties](#VkPhysicalDeviceToolProperties)::`purposes`, specifying the
purposes of an active tool, are:

// Provided by VK_VERSION_1_3
typedef enum VkToolPurposeFlagBits {
    VK_TOOL_PURPOSE_VALIDATION_BIT = 0x00000001,
    VK_TOOL_PURPOSE_PROFILING_BIT = 0x00000002,
    VK_TOOL_PURPOSE_TRACING_BIT = 0x00000004,
    VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT = 0x00000008,
    VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT = 0x00000010,
  // Provided by VK_EXT_debug_report with VK_EXT_tooling_info, VK_EXT_debug_utils with VK_EXT_tooling_info
    VK_TOOL_PURPOSE_DEBUG_REPORTING_BIT_EXT = 0x00000020,
  // Provided by VK_EXT_debug_marker with VK_EXT_tooling_info, VK_EXT_debug_utils with VK_EXT_tooling_info
    VK_TOOL_PURPOSE_DEBUG_MARKERS_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_VALIDATION_BIT_EXT = VK_TOOL_PURPOSE_VALIDATION_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_PROFILING_BIT_EXT = VK_TOOL_PURPOSE_PROFILING_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_TRACING_BIT_EXT = VK_TOOL_PURPOSE_TRACING_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT_EXT = VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT,
  // Provided by VK_EXT_tooling_info
    VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT_EXT = VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT,
} VkToolPurposeFlagBits;

// Provided by VK_EXT_tooling_info
// Equivalent to VkToolPurposeFlagBits
typedef VkToolPurposeFlagBits VkToolPurposeFlagBitsEXT;

* 
[VK_TOOL_PURPOSE_VALIDATION_BIT](#VkToolPurposeFlagBitsEXT) specifies that the tool provides
validation of API usage.

* 
[VK_TOOL_PURPOSE_PROFILING_BIT](#VkToolPurposeFlagBitsEXT) specifies that the tool provides
profiling of API usage.

* 
[VK_TOOL_PURPOSE_TRACING_BIT](#VkToolPurposeFlagBitsEXT) specifies that the tool is capturing
data about the application’s API usage, including anything from simple
logging to capturing data for later replay.

* 
[VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT](#VkToolPurposeFlagBitsEXT) specifies that the tool
provides additional API features/extensions on top of the underlying
implementation.

* 
[VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT](#VkToolPurposeFlagBitsEXT) specifies that the tool
modifies the API features/limits/extensions presented to the
application.

* 
[VK_TOOL_PURPOSE_DEBUG_REPORTING_BIT_EXT](#VkToolPurposeFlagBitsEXT) specifies that the tool
reports additional information to the application via callbacks
specified by
[vkCreateDebugReportCallbackEXT](#vkCreateDebugReportCallbackEXT)
or
[vkCreateDebugUtilsMessengerEXT](#vkCreateDebugUtilsMessengerEXT)

* 
[VK_TOOL_PURPOSE_DEBUG_MARKERS_BIT_EXT](#VkToolPurposeFlagBitsEXT) specifies that the tool
consumes
[debug markers](#debugging-debug-markers)
or
[object debug annotation](#debugging-object-debug-annotation),
[queue labels](#debugging-queue-labels), or
[command buffer labels](#debugging-command-buffer-labels)

// Provided by VK_VERSION_1_3
typedef VkFlags VkToolPurposeFlags;

// Provided by VK_EXT_tooling_info
// Equivalent to VkToolPurposeFlags
typedef VkToolPurposeFlags VkToolPurposeFlagsEXT;

[VkToolPurposeFlags](#VkToolPurposeFlags) is a bitmask type for setting a mask of zero or
more [VkToolPurposeFlagBits](#VkToolPurposeFlagBits).

The `VkFrameBoundaryEXT` structure is defined as:

// Provided by VK_EXT_frame_boundary
typedef struct VkFrameBoundaryEXT {
    VkStructureType            sType;
    const void*                pNext;
    VkFrameBoundaryFlagsEXT    flags;
    uint64_t                   frameID;
    uint32_t                   imageCount;
    const VkImage*             pImages;
    uint32_t                   bufferCount;
    const VkBuffer*            pBuffers;
    uint64_t                   tagName;
    size_t                     tagSize;
    const void*                pTag;
} VkFrameBoundaryEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkFrameBoundaryFlagBitsEXT](#VkFrameBoundaryFlagBitsEXT) that can
flag the last submission of a frame identifier.

* 
`frameID` is the frame identifier.

* 
`imageCount` is the number of images that store frame results.

* 
`pImages` is a pointer to an array of VkImage objects with
imageCount entries.

* 
`bufferCount` is the number of buffers the store the frame results.

* 
`pBuffers` is a pointer to an array of VkBuffer objects with
bufferCount entries.

* 
`tagName` is a numerical identifier for tag data.

* 
`tagSize` is the number of bytes of tag data.

* 
`pTag` is a pointer to an array of `tagSize` bytes containing
tag data.

The application **can** associate frame boundary information to a queue
submission call by adding a `VkFrameBoundaryEXT` structure to the
`pNext` chain of [queue submission](devsandqueues.html#devsandqueues-submission),
[VkPresentInfoKHR](VK_KHR_surface/wsi.html#VkPresentInfoKHR),
or [VkBindSparseInfo](sparsemem.html#VkBindSparseInfo).

|  | The frame identifier is used to associate one or more queue submissions to a
| --- | --- |
frame.
It is meant to be unique within a frame lifetime, i.e. it is possible
(though not recommended) to reuse frame identifiers, as long as any two
frames that may have overlapping queue submissions (as in the example above)
use different frame identifiers.

Since the concept of frame is application-dependent, there is no way to
validate the use of frame identifier.
It is good practice to use a monotonically increasing counter as the frame
identifier and not reuse identifiers between frames. |

The `pImages` and `pBuffers` arrays contain a list of images and
buffers which store the “end result” of the frame.
As the concept of frame is application-dependent, not all frames **may**
produce their results in images or buffers, yet this is a sufficiently
common case to be handled by `VkFrameBoundaryEXT`.
Note that no extra information, such as image layout is being provided,
since the images are meant to be used by tools which would already be
tracking this required information.
Having the possibility of passing a list of end-result images makes
`VkFrameBoundaryEXT` as expressive as [vkQueuePresentKHR](VK_KHR_surface/wsi.html#vkQueuePresentKHR), which is
often the default frame boundary delimiter.

The application **can** also associate arbitrary extra information via tag data
using `tagName`, `tagSize` and `pTag`.
This extra information is typically tool-specific.

Valid Usage (Implicit)

* 
[](#VUID-VkFrameBoundaryEXT-sType-sType) VUID-VkFrameBoundaryEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAME_BOUNDARY_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFrameBoundaryEXT-flags-parameter) VUID-VkFrameBoundaryEXT-flags-parameter

 `flags` **must** be a valid combination of [VkFrameBoundaryFlagBitsEXT](#VkFrameBoundaryFlagBitsEXT) values

* 
[](#VUID-VkFrameBoundaryEXT-pImages-parameter) VUID-VkFrameBoundaryEXT-pImages-parameter

 If `imageCount` is not `0`, and `pImages` is not `NULL`, `pImages` **must** be a valid pointer to an array of `imageCount` valid [VkImage](resources.html#VkImage) handles

* 
[](#VUID-VkFrameBoundaryEXT-pBuffers-parameter) VUID-VkFrameBoundaryEXT-pBuffers-parameter

 If `bufferCount` is not `0`, and `pBuffers` is not `NULL`, `pBuffers` **must** be a valid pointer to an array of `bufferCount` valid [VkBuffer](resources.html#VkBuffer) handles

* 
[](#VUID-VkFrameBoundaryEXT-pTag-parameter) VUID-VkFrameBoundaryEXT-pTag-parameter

 If `tagSize` is not `0`, and `pTag` is not `NULL`, `pTag` **must** be a valid pointer to an array of `tagSize` bytes

* 
[](#VUID-VkFrameBoundaryEXT-commonparent) VUID-VkFrameBoundaryEXT-commonparent

 Both of the elements of `pBuffers`, and the elements of `pImages` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](sparsemem.html#VkBindSparseInfo)

* 
[VkPresentInfoKHR](VK_KHR_surface/wsi.html#VkPresentInfoKHR)

* 
[VkSubmitInfo](cmdbuffers.html#VkSubmitInfo)

* 
[VkSubmitInfo2](cmdbuffers.html#VkSubmitInfo2)

The bit which **can** be set in [VkFrameBoundaryEXT](#VkFrameBoundaryEXT)::`flags` is:

// Provided by VK_EXT_frame_boundary
typedef enum VkFrameBoundaryFlagBitsEXT {
    VK_FRAME_BOUNDARY_FRAME_END_BIT_EXT = 0x00000001,
} VkFrameBoundaryFlagBitsEXT;

* 
[VK_FRAME_BOUNDARY_FRAME_END_BIT_EXT](#VkFrameBoundaryFlagBitsEXT) specifies that this queue
submission is the last one for this frame, i.e. once this queue
submission has terminated, then the work for this frame is completed.

Note that in the presence of timeline semaphores, the last queue submission
might not be the last one to be submitted, as timeline semaphores allow for
wait-before-signal submissions.
In the context of frame boundary, the queue submission that should be done
flagged as the last one is the one that is meant to be executed last, even
if it **may** not be the last one to be submitted.

// Provided by VK_EXT_frame_boundary
typedef VkFlags VkFrameBoundaryFlagsEXT;

[VkFrameBoundaryFlagsEXT](#VkFrameBoundaryFlagsEXT) is a bitmask type for setting a mask of zero
or more [VkFrameBoundaryFlagBitsEXT](#VkFrameBoundaryFlagBitsEXT).

The `VkFrameBoundaryTensorsARM` structure is defined as:

// Provided by VK_EXT_frame_boundary with VK_ARM_tensors
typedef struct VkFrameBoundaryTensorsARM {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              tensorCount;
    const VkTensorARM*    pTensors;
} VkFrameBoundaryTensorsARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorCount` is the number of tensors that store frame results.

* 
`pTensors` is a pointer to an array of [VkTensorARM](resources.html#VkTensorARM) objects
with tensorCount entries.

Valid Usage (Implicit)

* 
[](#VUID-VkFrameBoundaryTensorsARM-sType-sType) VUID-VkFrameBoundaryTensorsARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAME_BOUNDARY_TENSORS_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkFrameBoundaryTensorsARM-pTensors-parameter) VUID-VkFrameBoundaryTensorsARM-pTensors-parameter

 `pTensors` **must** be a valid pointer to an array of `tensorCount` valid [VkTensorARM](resources.html#VkTensorARM) handles

* 
[](#VUID-VkFrameBoundaryTensorsARM-tensorCount-arraylength) VUID-VkFrameBoundaryTensorsARM-tensorCount-arraylength

 `tensorCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](sparsemem.html#VkBindSparseInfo)

* 
[VkPresentInfoKHR](VK_KHR_surface/wsi.html#VkPresentInfoKHR)

* 
[VkSubmitInfo](cmdbuffers.html#VkSubmitInfo)

* 
[VkSubmitInfo2](cmdbuffers.html#VkSubmitInfo2)
