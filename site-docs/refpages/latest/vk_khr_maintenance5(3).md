# VK_KHR_maintenance5(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance5.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance5](#VK_KHR_maintenance5)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance5 - device extension

**Name String**

`VK_KHR_maintenance5`

**Extension Type**

Device extension

**Registered Extension Number**

471

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

     and

     [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)

or

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

**API Interactions**

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_VERSION_1_4

* 
Interacts with VK_ARM_pipeline_opacity_micromap

* 
Interacts with VK_ARM_shader_instrumentation

* 
Interacts with VK_EXT_attachment_feedback_loop_layout

* 
Interacts with VK_EXT_buffer_device_address

* 
Interacts with VK_EXT_conditional_rendering

* 
Interacts with VK_EXT_descriptor_buffer

* 
Interacts with VK_EXT_fragment_density_map

* 
Interacts with VK_EXT_graphics_pipeline_library

* 
Interacts with VK_EXT_opacity_micromap

* 
Interacts with VK_EXT_pipeline_creation_cache_control

* 
Interacts with VK_EXT_pipeline_protected_access

* 
Interacts with VK_EXT_transform_feedback

* 
Interacts with VK_KHR_acceleration_structure

* 
Interacts with VK_KHR_buffer_device_address

* 
Interacts with VK_KHR_dynamic_rendering

* 
Interacts with VK_KHR_fragment_shading_rate

* 
Interacts with VK_KHR_pipeline_executable_properties

* 
Interacts with VK_KHR_pipeline_library

* 
Interacts with VK_KHR_ray_tracing_pipeline

* 
Interacts with VK_KHR_video_decode_queue

* 
Interacts with VK_KHR_video_encode_queue

* 
Interacts with VK_NV_device_generated_commands

* 
Interacts with VK_NV_displacement_micromap

* 
Interacts with VK_NV_ray_tracing

* 
Interacts with VK_NV_ray_tracing_motion_blur

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Stu Smith [stu-s](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance5] @stu-s%0A*Here describe the issue or question you have about the VK_KHR_maintenance5 extension*)

**Extension Proposal**

[VK_KHR_maintenance5](../../../../features/latest/features/proposals/VK_KHR_maintenance5.html)

**Last Modified Date**

2023-05-02

**Interactions and External Dependencies**
**Contributors**

* 
Stu Smith, AMD

* 
Tobias Hector, AMD

* 
Shahbaz Youssefi, Google

* 
Slawomir Cygan, Intel

* 
Lionel Landwerlin, Intel

* 
James Fitzpatrick, Imagination Technologies

* 
Andrew Garrard, Imagination Technologies

* 
Ralph Potter, Samsung

* 
Pan Gao, Huawei

* 
Jan-Harald Fredriksen, ARM

* 
Jon Leech, Khronos

* 
Mike Blumenkrantz, Valve

`VK_KHR_maintenance5` adds a collection of minor features, none of which
would warrant an entire extension of their own.

The new features are as follows:

* 
A new [VK_FORMAT_A1B5G5R5_UNORM_PACK16_KHR](VkFormat.html) format

* 
A new [VK_FORMAT_A8_UNORM_KHR](VkFormat.html) format

* 
A property to indicate that multisample coverage operations are
performed after sample counting in EarlyFragmentTests mode

* 
Relax VkBufferView creation requirements by allowing subsets of the
associated VkBuffer usage using `VkBufferUsageFlags2CreateInfoKHR`

* 
A new command [vkCmdBindIndexBuffer2KHR](vkCmdBindIndexBuffer2.html), allowing a range of memory
to be bound as an index buffer

* 
[vkGetDeviceProcAddr](vkGetDeviceProcAddr.html) must return `NULL` for supported core
functions beyond the version requested by the application.

* 
A property to indicate that the sample mask test is performed after
sample counting in EarlyFragmentTests mode

* 
`vkCmdBindVertexBuffers2` now supports using `VK_WHOLE_SIZE` in the
`pSizes` parameter.

* 
A default size of 1.0 is used if `PointSize` is not written

* 
Shader modules are deprecated - applications can now pass
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) as a chained structure to pipeline
creation via [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html)

* 
A function [vkGetRenderingAreaGranularityKHR](vkGetRenderingAreaGranularity.html) to query the optimal
render area for a dynamic rendering instance.

* 
A property to indicate that depth/stencil texturing operations with
[VK_COMPONENT_SWIZZLE_ONE](VkComponentSwizzle.html) have defined behavior

* 
Add [vkGetImageSubresourceLayout2KHR](vkGetImageSubresourceLayout2.html) and a new function
[vkGetDeviceImageSubresourceLayoutKHR](vkGetDeviceImageSubresourceLayout.html) to allow the application to
query the image memory layout without having to create an image object
and query it.

* 
Allow [VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html) as the `layerCount` member of
[VkImageSubresourceLayers](VkImageSubresourceLayers.html)

* 
Adds stronger guarantees for propagation of [VK_ERROR_DEVICE_LOST](VkResult.html)
return values

* 
A property to indicate whether `PointSize` controls the final
rasterization of polygons if [polygon mode](../../../../spec/latest/chapters/primsrast.html#primsrast-polygonmode) is
[VK_POLYGON_MODE_POINT](VkPolygonMode.html)

* 
Two properties to indicate the non-strict line rasterization algorithm
used

* 
Two new flags words [VkPipelineCreateFlagBits2KHR](VkPipelineCreateFlagBits2.html) and
[VkBufferUsageFlagBits2KHR](VkBufferUsageFlagBits2.html)

* 
Physical-device-level functions can now be called with any value in the
valid range for a type beyond the defined enumerants, such that
applications can avoid checking individual features, extensions, or
versions before querying supported properties of a particular enumerant.

* 
Clarification that copies between images of any type are allowed,
treating 1D images as 2D images with a height of 1.

* 
[vkCmdBindIndexBuffer2KHR](vkCmdBindIndexBuffer2.html)

* 
[vkGetDeviceImageSubresourceLayoutKHR](vkGetDeviceImageSubresourceLayout.html)

* 
[vkGetImageSubresourceLayout2KHR](vkGetImageSubresourceLayout2.html)

* 
[vkGetRenderingAreaGranularityKHR](vkGetRenderingAreaGranularity.html)

* 
[VkDeviceImageSubresourceInfoKHR](VkDeviceImageSubresourceInfo.html)

* 
[VkImageSubresource2KHR](VkImageSubresource2.html)

* 
[VkRenderingAreaInfoKHR](VkRenderingAreaInfo.html)

* 
[VkSubresourceLayout2KHR](VkSubresourceLayout2.html)

* 
Extending [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html), [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html), [VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html):

[VkBufferUsageFlags2CreateInfoKHR](VkBufferUsageFlags2CreateInfo.html)

Extending [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html):

* 
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceMaintenance5FeaturesKHR](VkPhysicalDeviceMaintenance5Features.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceMaintenance5PropertiesKHR](VkPhysicalDeviceMaintenance5Properties.html)

* 
[VkBufferUsageFlagBits2KHR](VkBufferUsageFlagBits2.html)

* 
[VkPipelineCreateFlagBits2KHR](VkPipelineCreateFlagBits2.html)

* 
[VkBufferUsageFlags2KHR](VkBufferUsageFlags2.html)

* 
[VkPipelineCreateFlags2KHR](VkPipelineCreateFlags2.html)

* 
`VK_KHR_MAINTENANCE_5_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_5_SPEC_VERSION`

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_INDEX_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_TRANSFER_DST_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_TRANSFER_SRC_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_VERTEX_BUFFER_BIT_KHR](VkBufferUsageFlagBits2.html)

Extending [VkFormat](VkFormat.html):

* 
[VK_FORMAT_A1B5G5R5_UNORM_PACK16_KHR](VkFormat.html)

* 
[VK_FORMAT_A8_UNORM_KHR](VkFormat.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_ALLOW_DERIVATIVES_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_DERIVATIVE_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_DISABLE_OPTIMIZATION_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_DISPATCH_BASE_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_VIEW_INDEX_FROM_DEVICE_INDEX_BIT_KHR](VkPipelineCreateFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDERING_AREA_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2_KHR](VkStructureType.html)

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) and [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html) or [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) and [VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineCreateFlagBits2.html)

If [VK_ARM_pipeline_opacity_micromap](VK_ARM_pipeline_opacity_micromap.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_DISALLOW_OPACITY_MICROMAP_BIT_ARM](VkPipelineCreateFlagBits2.html)

If [VK_ARM_shader_instrumentation](VK_ARM_shader_instrumentation.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_INSTRUMENT_SHADERS_BIT_ARM](VkPipelineCreateFlagBits2.html)

Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

* 
[VK_SHADER_CREATE_INSTRUMENT_SHADER_BIT_ARM](VkShaderCreateFlagBitsEXT.html)

If [VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_COLOR_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_DEPTH_STENCIL_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkBufferUsageFlagBits2.html)

If [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_EXT_graphics_pipeline_library](VK_EXT_graphics_pipeline_library.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_MICROMAP_STORAGE_BIT_EXT](VkBufferUsageFlagBits2.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits2.html)

If [VK_KHR_pipeline_executable_properties](VK_KHR_pipeline_executable_properties.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_CAPTURE_INTERNAL_REPRESENTATIONS_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_CAPTURE_STATISTICS_BIT_KHR](VkPipelineCreateFlagBits2.html)

If [VK_KHR_pipeline_library](VK_KHR_pipeline_library.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR](VkPipelineCreateFlagBits2.html)

If [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_SHADER_BINDING_TABLE_BIT_KHR](VkBufferUsageFlagBits2.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_ANY_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_CLOSEST_HIT_SHADERS_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_INTERSECTION_SHADERS_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_NO_NULL_MISS_SHADERS_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SHADER_GROUP_HANDLE_CAPTURE_REPLAY_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_AABBS_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_SKIP_TRIANGLES_BIT_KHR](VkPipelineCreateFlagBits2.html)

If [VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_VIDEO_DECODE_DST_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](VkBufferUsageFlagBits2.html)

If [VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR](VkBufferUsageFlagBits2.html)

If [VK_NV_device_generated_commands](VK_NV_device_generated_commands.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_NV](VkPipelineCreateFlagBits2.html)

If [VK_NV_displacement_micromap](VK_NV_displacement_micromap.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_RAY_TRACING_DISPLACEMENT_MICROMAP_BIT_NV](VkPipelineCreateFlagBits2.html)

If [VK_NV_ray_tracing](VK_NV_ray_tracing.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits2.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_DEFER_COMPILE_BIT_NV](VkPipelineCreateFlagBits2.html)

If [VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits2.html)

If [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) or [VK_KHR_buffer_device_address](VK_KHR_buffer_device_address.html) or [VK_EXT_buffer_device_address](VK_EXT_buffer_device_address.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT_KHR](VkBufferUsageFlagBits2.html)

If [Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3) or [VK_EXT_pipeline_creation_cache_control](VK_EXT_pipeline_creation_cache_control.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_EARLY_RETURN_ON_FAILURE_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_FAIL_ON_PIPELINE_COMPILE_REQUIRED_BIT_KHR](VkPipelineCreateFlagBits2.html)

If [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) or [VK_EXT_pipeline_protected_access](VK_EXT_pipeline_protected_access.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_NO_PROTECTED_ACCESS_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_PROTECTED_ACCESS_ONLY_BIT_EXT](VkPipelineCreateFlagBits2.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2022-12-12 (Stu Smith)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance5).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
