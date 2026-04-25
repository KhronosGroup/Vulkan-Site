# Vulkan Release Summary

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/vulkan_release_summary.html

## Table of Contents

- [Vulkan 1.1](#_vulkan_1_1)
- [Vulkan 1.2](#_vulkan_1_2)
- [Vulkan 1.3](#_vulkan_1_3)
- [Vulkan 1.4](#_vulkan_1_4)

## Content

Each minor release version of Vulkan [promoted](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) a different set of extension to core. This means that it’s no longer necessary to enable an extensions to use it’s functionality if the application requests at least that Vulkan version (given that the version is supported by the implementation).

The following summary contains a list of the extensions added to the respective core versions and why they were added. This list is taken from the [Vulkan spec](https://docs.vulkan.org/spec/latest/appendices/versions.html), but links jump to the various spots in the Vulkan Guide

|  | [Vulkan Spec Section](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.1) |
| --- | --- |

Vulkan 1.1 was released on March 7, 2018

Besides the listed extensions below, Vulkan 1.1 introduced the [subgroups](subgroups.html#subgroups), [protected memory](protected.html#protected), and the ability to query the instance version.

* 
[VK_KHR_16bit_storage](extensions/shader_features.html#VK_KHR_16bit_storage)

* 
[VK_KHR_bind_memory2](extensions/cleanup.html#pnext-expansions)

* 
[VK_KHR_dedicated_allocation](extensions/cleanup.html#VK_KHR_dedicated_allocation)

* 
[VK_KHR_descriptor_update_template](extensions/VK_KHR_descriptor_update_template.html#VK_KHR_descriptor_update_template)

* 
[VK_KHR_device_group](extensions/device_groups.html#device-groups)

* 
[VK_KHR_device_group_creation](extensions/device_groups.html#device-groups)

* 
[VK_KHR_external_fence](extensions/external.html#external-memory)

* 
[VK_KHR_external_fence_capabilities](extensions/external.html#external-memory)

* 
[VK_KHR_external_memory](extensions/external.html#external-memory)

* 
[VK_KHR_external_memory_capabilities](extensions/external.html#external-memory)

* 
[VK_KHR_external_semaphore](extensions/external.html#external-memory)

* 
[VK_KHR_external_semaphore_capabilities](extensions/external.html#external-memory)

* 
[VK_KHR_get_memory_requirements2](extensions/cleanup.html#pnext-expansions)

* 
[VK_KHR_get_physical_device_properties2](extensions/cleanup.html#pnext-expansions)

* 
[VK_KHR_maintenance1](extensions/cleanup.html#maintenance-extensions)

* 
[VK_KHR_maintenance2](extensions/cleanup.html#maintenance-extensions)

* 
[VK_KHR_maintenance3](extensions/cleanup.html#maintenance-extensions)

* 
[VK_KHR_multiview](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_multiview.html#_description)

* 
[VK_KHR_relaxed_block_layout](shader_memory_layout.html#VK_KHR_relaxed_block_layout)

* 
[VK_KHR_sampler_ycbcr_conversion](extensions/VK_KHR_sampler_ycbcr_conversion.html#VK_KHR_sampler_ycbcr_conversion)

* 
[VK_KHR_shader_draw_parameters](extensions/shader_features.html#VK_KHR_shader_draw_parameters)

* 
[VK_KHR_storage_buffer_storage_class](extensions/shader_features.html#VK_KHR_storage_buffer_storage_class)

* 
[VK_KHR_variable_pointers](extensions/shader_features.html#VK_KHR_variable_pointers)

|  | [Vulkan Spec Section](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.2) |
| --- | --- |

Vulkan 1.2 was released on January 15, 2020

* 
[VK_KHR_8bit_storage](extensions/shader_features.html#VK_KHR_8bit_storage)

* 
[VK_KHR_buffer_device_address](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_buffer_device_address.html#_description)

* 
[VK_KHR_create_renderpass2](extensions/cleanup.html#pnext-expansions)

* 
[VK_KHR_depth_stencil_resolve](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_depth_stencil_resolve.html#_description)

* 
[VK_KHR_draw_indirect_count](extensions/VK_KHR_draw_indirect_count.html#VK_KHR_draw_indirect_count)

* 
[VK_KHR_driver_properties](extensions/cleanup.html#VK_KHR_driver_properties)

* 
[VK_KHR_image_format_list](extensions/VK_KHR_image_format_list.html#VK_KHR_image_format_list)

* 
[VK_KHR_imageless_framebuffer](extensions/VK_KHR_imageless_framebuffer.html#VK_KHR_imageless_framebuffer)

* 
[VK_KHR_sampler_mirror_clamp_to_edge](extensions/cleanup.html#VK_KHR_sampler_mirror_clamp_to_edge)

* 
[VK_KHR_separate_depth_stencil_layouts](extensions/cleanup.html#VK_KHR_separate_depth_stencil_layouts)

* 
[VK_KHR_shader_atomic_int64](atomics.html#VK_KHR_shader_atomic_int64)

* 
[VK_KHR_shader_float16_int8](extensions/shader_features.html#VK_KHR_shader_float16_int8)

* 
[VK_KHR_shader_float_controls](extensions/shader_features.html#VK_KHR_shader_float_controls)

* 
[VK_KHR_shader_subgroup_extended_types](subgroups.html#VK_KHR_shader_subgroup_extended_types)

* 
[VK_KHR_spirv_1_4](extensions/shader_features.html#VK_KHR_spirv_1_4)

* 
[VK_KHR_timeline_semaphore](https://www.khronos.org/blog/vulkan-timeline-semaphores)

* 
[VK_KHR_uniform_buffer_standard_layout](shader_memory_layout.html#VK_KHR_uniform_buffer_standard_layout)

* 
[VK_KHR_vulkan_memory_model](extensions/shader_features.html#VK_KHR_vulkan_memory_model)

* 
[VK_EXT_descriptor_indexing](extensions/VK_EXT_descriptor_indexing.html#VK_EXT_descriptor_indexing)

* 
[VK_EXT_host_query_reset](extensions/cleanup.html#VK_EXT_host_query_reset)

* 
[VK_EXT_sampler_filter_minmax](extensions/cleanup.html#VK_EXT_sampler_filter_minmax)

* 
[VK_EXT_scalar_block_layout](shader_memory_layout.html#VK_EXT_scalar_block_layout)

* 
[VK_EXT_separate_stencil_usage](extensions/cleanup.html#VK_EXT_separate_stencil_usage)

* 
[VK_EXT_shader_viewport_index_layer](extensions/shader_features.html#VK_EXT_shader_viewport_index_layer)

|  | [Vulkan Spec Section](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.3) |
| --- | --- |

Vulkan 1.3 was released on January 25, 2022

* 
[VK_KHR_copy_commands2](extensions/cleanup.html#pnext-expansions)

* 
[VK_KHR_dynamic_rendering](https://www.khronos.org/blog/streamlining-render-passes)

* 
[VK_KHR_format_feature_flags2](extensions/cleanup.html#VK_KHR_format_feature_flags2)

* 
[VK_KHR_maintenance4](extensions/cleanup.html#VK_KHR_maintenance4)

* 
[VK_KHR_shader_integer_dot_product](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_shader_integer_dot_product.html#_description)

* 
[VK_KHR_shader_non_semantic_info](extensions/shader_features.html#VK_KHR_shader_non_semantic_info)

* 
[VK_KHR_shader_terminate_invocation](extensions/shader_features.html#VK_KHR_shader_terminate_invocation)

* 
[VK_KHR_synchronization2](extensions/VK_KHR_synchronization2.html)

* 
[VK_KHR_zero_initialize_workgroup_memory](extensions/shader_features.html#VK_KHR_zero_initialize_workgroup_memory)

* 
[VK_EXT_4444_formats](extensions/cleanup.html#VK_EXT_4444_formats-and-VK_EXT_ycbcr_2plane_444_formats)

* 
[VK_EXT_extended_dynamic_state](dynamic_state.html#states-that-are-dynamic)

* 
[VK_EXT_extended_dynamic_state2](dynamic_state.html#states-that-are-dynamic)

* 
[VK_EXT_inline_uniform_block](extensions/VK_EXT_inline_uniform_block.html#VK_EXT_inline_uniform_block)

* 
[VK_EXT_pipeline_creation_cache_control](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_creation_cache_control.html#_description)

* 
[VK_EXT_pipeline_creation_feedback](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_creation_feedback.html#_description)

* 
[VK_EXT_private_data](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_private_data.html#_description)

* 
[VK_EXT_shader_demote_to_helper_invocation](extensions/shader_features.html#VK_EXT_shader_demote_to_helper_invocation)

* 
[VK_EXT_subgroup_size_control](subgroups.html#VK_EXT_subgroup_size_control)

* 
[VK_EXT_texel_buffer_alignment](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_texel_buffer_alignment.html#_description)

* 
[VK_EXT_texture_compression_astc_hdr](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_texture_compression_astc_hdr.html#_description)

* 
[VK_EXT_tooling_info](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_tooling_info.html#_description)

* 
[VK_EXT_ycbcr_2plane_444_formats](extensions/cleanup.html#VK_EXT_4444_formats-and-VK_EXT_ycbcr_2plane_444_formats)

|  | [Vulkan Spec Section](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.4) |
| --- | --- |

Vulkan 1.4 was released on December 3, 2024

* 
[VK_KHR_dynamic_rendering_local_read](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_dynamic_rendering_local_read.html#_description)

* 
[VK_KHR_global_priority](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_global_priority.html#_description)

* 
[VK_KHR_index_type_uint8](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_index_type_uint8.html#_description)

* 
[VK_KHR_line_rasterization](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_line_rasterization.html#_description)

* 
[VK_KHR_load_store_op_none](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_load_store_op_none.html#_description)

* 
[VK_KHR_maintenance5](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_maintenance5.html#_description)

* 
[VK_KHR_maintenance6](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_maintenance6.html#_description)

* 
[VK_KHR_map_memory2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_map_memory2.html#_description)

* 
[VK_KHR_push_descriptor](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_push_descriptor.html#_description)

* 
[VK_KHR_shader_expect_assume](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_shader_expect_assume.html#_description)

* 
[VK_KHR_shader_float_controls2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_shader_float_controls2.html#_description)

* 
[VK_KHR_shader_subgroup_rotate](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_shader_subgroup_rotate.html#_description)

* 
[VK_KHR_vertex_attribute_divisor](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_vertex_attribute_divisor.html#_description)

* 
[VK_EXT_host_image_copy](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_host_image_copy.html#_description)

* 
[VK_EXT_pipeline_protected_access](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_protected_access.html#_description)

* 
[VK_EXT_pipeline_robustness](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_robustness.html#_description)
