# VK_KHR_extended_flags(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_extended_flags.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_extended_flags](#VK_KHR_extended_flags)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_extended_flags - device extension

**Name String**

`VK_KHR_extended_flags`

**Extension Type**

Device extension

**Registered Extension Number**

669

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_VERSION_1_0

* 
Interacts with VK_VERSION_1_2

* 
Interacts with VK_VERSION_1_3

* 
Interacts with VK_VERSION_1_4

* 
Interacts with VK_ARM_pipeline_opacity_micromap

* 
Interacts with VK_ARM_tensors

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
Interacts with VK_EXT_fragment_density_map_offset

* 
Interacts with VK_EXT_graphics_pipeline_library

* 
Interacts with VK_EXT_image_2d_view_of_3d

* 
Interacts with VK_EXT_multisampled_render_to_single_sampled

* 
Interacts with VK_EXT_opacity_micromap

* 
Interacts with VK_EXT_pipeline_creation_cache_control

* 
Interacts with VK_EXT_sample_locations

* 
Interacts with VK_EXT_separate_stencil_usage

* 
Interacts with VK_EXT_transform_feedback

* 
Interacts with VK_HUAWEI_invocation_mask

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
Interacts with VK_KHR_shared_presentable_image

* 
Interacts with VK_KHR_video_decode_queue

* 
Interacts with VK_KHR_video_encode_quantization_map

* 
Interacts with VK_KHR_video_encode_queue

* 
Interacts with VK_KHR_video_maintenance1

* 
Interacts with VK_NV_corner_sampled_image

* 
Interacts with VK_NV_device_generated_commands

* 
Interacts with VK_NV_displacement_micromap

* 
Interacts with VK_NV_ray_tracing

* 
Interacts with VK_NV_ray_tracing_motion_blur

* 
Interacts with VK_QCOM_image_processing

* 
Interacts with VK_QCOM_tile_memory_heap

**Contact**

* 
Jon Leech [oddhack](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_extended_flags] @oddhack%0A*Here describe the issue or question you have about the VK_KHR_extended_flags extension*)

**Extension Proposal**

[VK_KHR_extended_flags](../../../../features/latest/features/proposals/VK_KHR_extended_flags.html)

**Last Modified Date**

2025-12-17

**IP Status**

No known IP claims.

**Contributors**

* 
Andreas Süßenbach, NVIDIA

* 
Daniel Koch, NVIDIA

* 
Daniel Rakos, RasterGrid

* 
Jon Leech, Independent

* 
Matthew Netsch, QUALCOMM

* 
Noah Fredriks, AMD

* 
Spencer Fricke, LunarG

* 
Ting Wei, ARM

* 
Žiga Markuš, LunarG

This extension adds a new [VkFormatFeatureFlagBits4KHR](VkFormatFeatureFlagBits4KHR.html) format feature
flag type, supporting up to 64 additional flags beyond those defined by
[VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html); and a new [VkFormatProperties4KHR](VkFormatProperties4KHR.html)
structure to extend [VkFormatProperties2](VkFormatProperties2.html).
The new structure does not replace format feature flag bits specified by
existing commands and structures, unlike [VkFormatProperties3](VkFormatProperties3.html).
Instead, it adds new flags to the existing APIs.
Initially, no new format flag bits are defined.

This extension also adds a new [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html) image create
flag type, supporting up to 32 additional flags, and a new
[VkImageCreateFlags2CreateInfoKHR](VkImageCreateFlags2CreateInfoKHR.html) structure to extend
[VkImageCreateInfo](VkImageCreateInfo.html) and other commands that specify image create flag
bits.
The new structure duplicates image create flag bits specified by existing
commands and structures, while also adding up to 32 new flags.
All the existing [VkImageCreateFlagBits](VkImageCreateFlagBits.html) are given corresponding
[VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html) bits with the same meaning.
Initially, no new image create flag bits are defined.

This extension also adds a new [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) image usage
flag type, supporting up to 32 additional flags, and a new
[VkImageUsageFlags2CreateInfoKHR](VkImageUsageFlags2CreateInfoKHR.html) structure to extend
[VkImageCreateInfo](VkImageCreateInfo.html) and other commands that specify image usage flag
bits.
The new structure duplicates image usage flag bits specified by existing
commands and structures, while also adding up to 32 new flags.
All the existing [VkImageUsageFlagBits](VkImageUsageFlagBits.html) are given corresponding
[VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html) bits with the same meaning.
Initially, no new image usage flag bits are defined.

The extension is infrastructure used because the API is running out of
available bits in the [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html) and
[VkImageUsageFlagBits](VkImageUsageFlagBits.html) types, and will soon thereafter run out of bits
in [VkImageCreateFlagBits](VkImageCreateFlagBits.html).

Finally, this extension adds all the same 64-bit flag types first introduced
by [VK_KHR_maintenance5](VK_KHR_maintenance5.html).
This will allow API variants like Vulkan SC to support the extended flags
without requiring other, unrelated functionality of
[VK_KHR_maintenance5](VK_KHR_maintenance5.html).

* 
Extending [VkBufferViewCreateInfo](VkBufferViewCreateInfo.html), [VkBufferCreateInfo](VkBufferCreateInfo.html), [VkPhysicalDeviceExternalBufferInfo](VkPhysicalDeviceExternalBufferInfo.html), [VkDescriptorBufferBindingInfoEXT](VkDescriptorBufferBindingInfoEXT.html):

[VkBufferUsageFlags2CreateInfoKHR](VkBufferUsageFlags2CreateInfo.html)

Extending [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkRayTracingPipelineCreateInfoNV](VkRayTracingPipelineCreateInfoNV.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html):

* 
[VkPipelineCreateFlags2CreateInfoKHR](VkPipelineCreateFlags2CreateInfo.html)

Extending [VkFormatProperties2](VkFormatProperties2.html):

* 
[VkFormatProperties4KHR](VkFormatProperties4KHR.html)

Extending [VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html), [VkPhysicalDeviceVideoFormatInfoKHR](VkPhysicalDeviceVideoFormatInfoKHR.html), [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html), [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html):

* 
[VkImageUsageFlags2CreateInfoKHR](VkImageUsageFlags2CreateInfoKHR.html)

Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkFramebufferAttachmentImageInfo](VkFramebufferAttachmentImageInfo.html), [VkVideoFormatPropertiesKHR](VkVideoFormatPropertiesKHR.html):

* 
[VkImageCreateFlags2CreateInfoKHR](VkImageCreateFlags2CreateInfoKHR.html)

Extending [VkImageViewCreateInfo](VkImageViewCreateInfo.html):

* 
[VkImageViewUsage2CreateInfoKHR](VkImageViewUsage2CreateInfoKHR.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceExtendedFlagsFeaturesKHR](VkPhysicalDeviceExtendedFlagsFeaturesKHR.html)

If [VK_KHR_shared_presentable_image](VK_KHR_shared_presentable_image.html) is supported:

* 
Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

[VkSharedPresentSurfaceCapabilities2KHR](VkSharedPresentSurfaceCapabilities2KHR.html)

If [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) or [VK_EXT_separate_stencil_usage](VK_EXT_separate_stencil_usage.html) is supported:

* 
Extending [VkImageCreateInfo](VkImageCreateInfo.html), [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html):

[VkImageStencilUsage2CreateInfoKHR](VkImageStencilUsage2CreateInfoKHR.html)

* 
[VkBufferUsageFlagBits2KHR](VkBufferUsageFlagBits2.html)

* 
[VkFormatFeatureFlagBits4KHR](VkFormatFeatureFlagBits4KHR.html)

* 
[VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html)

* 
[VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html)

* 
[VkPipelineCreateFlagBits2KHR](VkPipelineCreateFlagBits2.html)

* 
[VkBufferUsageFlags2KHR](VkBufferUsageFlags2.html)

* 
[VkFormatFeatureFlags4KHR](VkFormatFeatureFlags4KHR.html)

* 
[VkImageCreateFlags2KHR](VkImageCreateFlags2KHR.html)

* 
[VkImageUsageFlags2KHR](VkImageUsageFlags2KHR.html)

* 
[VkPipelineCreateFlags2KHR](VkPipelineCreateFlags2.html)

* 
`VK_KHR_EXTENDED_FLAGS_EXTENSION_NAME`

* 
`VK_KHR_EXTENDED_FLAGS_SPEC_VERSION`

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
[VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_4_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_CREATE_FLAGS_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_USAGE_FLAGS_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_2_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_FLAGS_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO_KHR](VkStructureType.html)

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

If [VK_ARM_tensors](VK_ARM_tensors.html) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_TENSOR_ALIASING_BIT_ARM](VkImageUsageFlagBits2KHR.html)

If [VK_EXT_attachment_feedback_loop_layout](VK_EXT_attachment_feedback_loop_layout.html) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](VkImageUsageFlagBits2KHR.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
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

Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

* 
[VK_IMAGE_CREATE_2_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits2KHR.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits2KHR.html)

Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

* 
[VK_IMAGE_USAGE_2_FRAGMENT_DENSITY_MAP_BIT_EXT](VkImageUsageFlagBits2KHR.html)

If [VK_EXT_fragment_density_map_offset](VK_EXT_fragment_density_map_offset.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits2KHR.html)

If [VK_EXT_graphics_pipeline_library](VK_EXT_graphics_pipeline_library.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_LINK_TIME_OPTIMIZATION_BIT_EXT](VkPipelineCreateFlagBits2.html)

* 
[VK_PIPELINE_CREATE_2_RETAIN_LINK_TIME_OPTIMIZATION_INFO_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_EXT_image_2d_view_of_3d](VK_EXT_image_2d_view_of_3d.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_2D_VIEW_COMPATIBLE_BIT_EXT](VkImageCreateFlagBits2KHR.html)

If [VK_EXT_multisampled_render_to_single_sampled](VK_EXT_multisampled_render_to_single_sampled.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](VkImageCreateFlagBits2KHR.html)

If [VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_MICROMAP_STORAGE_BIT_EXT](VkBufferUsageFlagBits2.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_RAY_TRACING_OPACITY_MICROMAP_BIT_EXT](VkPipelineCreateFlagBits2.html)

If [VK_EXT_sample_locations](VK_EXT_sample_locations.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](VkImageCreateFlagBits2KHR.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](VkBufferUsageFlagBits2.html)

If [VK_HUAWEI_invocation_mask](VK_HUAWEI_invocation_mask.html) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkImageUsageFlagBits2KHR.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits2.html)

If [VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits2KHR.html)

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

If [VK_KHR_shared_presentable_image](VK_KHR_shared_presentable_image.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SHARED_PRESENT_SURFACE_CAPABILITIES_2_KHR](VkStructureType.html)

If [VK_KHR_video_decode_queue](VK_KHR_video_decode_queue.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_VIDEO_DECODE_DST_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](VkBufferUsageFlagBits2.html)

Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

* 
[VK_IMAGE_USAGE_2_VIDEO_DECODE_DPB_BIT_KHR](VkImageUsageFlagBits2KHR.html)

* 
[VK_IMAGE_USAGE_2_VIDEO_DECODE_DST_BIT_KHR](VkImageUsageFlagBits2KHR.html)

* 
[VK_IMAGE_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](VkImageUsageFlagBits2KHR.html)

If [VK_KHR_video_encode_quantization_map](VK_KHR_video_encode_quantization_map.html) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](VkImageUsageFlagBits2KHR.html)

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](VkImageUsageFlagBits2KHR.html)

If [VK_KHR_video_encode_queue](VK_KHR_video_encode_queue.html) is supported:

* 
Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

[VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR](VkBufferUsageFlagBits2.html)

Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_DPB_BIT_KHR](VkImageUsageFlagBits2KHR.html)

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](VkImageUsageFlagBits2KHR.html)

* 
[VK_IMAGE_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR](VkImageUsageFlagBits2KHR.html)

If [VK_KHR_video_maintenance1](VK_KHR_video_maintenance1.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkImageCreateFlagBits2KHR.html)

If [VK_NV_corner_sampled_image](VK_NV_corner_sampled_image.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_CORNER_SAMPLED_BIT_NV](VkImageCreateFlagBits2KHR.html)

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
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_DEFER_COMPILE_BIT_NV](VkPipelineCreateFlagBits2.html)

If [VK_NV_ray_tracing_motion_blur](VK_NV_ray_tracing_motion_blur.html) is supported:

* 
Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

[VK_PIPELINE_CREATE_2_RAY_TRACING_ALLOW_MOTION_BIT_NV](VkPipelineCreateFlagBits2.html)

If [VK_QCOM_image_processing](VK_QCOM_image_processing.html) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_SAMPLE_BLOCK_MATCH_BIT_QCOM](VkImageUsageFlagBits2KHR.html)

* 
[VK_IMAGE_USAGE_2_SAMPLE_WEIGHT_BIT_QCOM](VkImageUsageFlagBits2KHR.html)

If [VK_QCOM_tile_memory_heap](VK_QCOM_tile_memory_heap.html) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_TILE_MEMORY_BIT_QCOM](VkImageUsageFlagBits2KHR.html)

If [Vulkan Version 1.0](../../../../spec/latest/appendices/versions.html#versions-1.0) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_2D_ARRAY_COMPATIBLE_BIT_KHR](VkImageCreateFlagBits2KHR.html)

* 
[VK_IMAGE_CREATE_2_ALIAS_BIT_KHR](VkImageCreateFlagBits2KHR.html)

* 
[VK_IMAGE_CREATE_2_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT_KHR](VkImageCreateFlagBits2KHR.html)

* 
[VK_IMAGE_CREATE_2_DISJOINT_BIT_KHR](VkImageCreateFlagBits2KHR.html)

* 
[VK_IMAGE_CREATE_2_EXTENDED_USAGE_BIT_KHR](VkImageCreateFlagBits2KHR.html)

* 
[VK_IMAGE_CREATE_2_PROTECTED_BIT_KHR](VkImageCreateFlagBits2KHR.html)

* 
[VK_IMAGE_CREATE_2_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR](VkImageCreateFlagBits2KHR.html)

If [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2) or [VK_EXT_separate_stencil_usage](VK_EXT_separate_stencil_usage.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_2_CREATE_INFO_KHR](VkStructureType.html)

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

If [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) is supported:

* 
Extending [VkImageUsageFlagBits2KHR](VkImageUsageFlagBits2KHR.html):

[VK_IMAGE_USAGE_2_HOST_TRANSFER_BIT_KHR](VkImageUsageFlagBits2KHR.html)

* 
Revision 0.1, 2025-12-17 (Jon Leech)

Initial draft

Revision 0.2, 2026-01-19 (Jon Leech)

* 
Add VkImageCreateFlags2KHR and import 64-bit flags types from
VK_KHR_maintenance5.

Revision 0.3, 2026-02-14 (Jon Leech)

* 
Add a feature structure.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_extended_flags).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
