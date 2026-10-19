# VK_KHR_synchronization2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_synchronization2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_synchronization2](#VK_KHR_synchronization2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_synchronization2 - device extension

**Name String**

`VK_KHR_synchronization2`

**Extension Type**

Device extension

**Registered Extension Number**

315

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
Interacts with VK_EXT_blend_operation_advanced

* 
Interacts with VK_EXT_conditional_rendering

* 
Interacts with VK_EXT_device_generated_commands

* 
Interacts with VK_EXT_fragment_density_map

* 
Interacts with VK_EXT_mesh_shader

* 
Interacts with VK_EXT_transform_feedback

* 
Interacts with VK_KHR_acceleration_structure

* 
Interacts with VK_KHR_fragment_shading_rate

* 
Interacts with VK_KHR_ray_tracing_pipeline

* 
Interacts with VK_NV_device_generated_commands

* 
Interacts with VK_NV_mesh_shader

* 
Interacts with VK_NV_ray_tracing

* 
Interacts with VK_NV_shading_rate_image

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_synchronization2] @tobski%0A*Here describe the issue or question you have about the VK_KHR_synchronization2 extension*)

**Last Modified Date**

2020-12-03

**Interactions and External Dependencies**

* 
Interacts with `[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html)`

**Contributors**

* 
Tobias Hector

This extension modifies the original core synchronization APIs to simplify
the interface and improve usability of these APIs.
It also adds new pipeline stage and access flag types that extend into the
64-bit range, as we have run out within the 32-bit range.
The new flags are identical to the old values within the 32-bit range, with
new stages and bits beyond that.

Pipeline stages and access flags are now specified together in memory
barrier structures, making the connection between the two more obvious.
Additionally, scoping the pipeline stages into the barrier structs allows
the use of the `MEMORY_READ` and `MEMORY_WRITE` flags without
sacrificing precision.
The per-stage access flags should be used to disambiguate specific accesses
in a given stage or set of stages - for instance, between uniform reads and
sampling operations.

Layout transitions have been simplified as well; rather than requiring a
different set of layouts for depth/stencil/color attachments, there are
generic [VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) and
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html) layouts which are contextually
applied based on the image format.
For example, for a depth format image,
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html) is equivalent to
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html).
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html) also functionally replaces
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html).

Events are now more efficient, because they include memory dependency
information when you set them on the device.
Previously, this information was only known when waiting on an event, so the
dependencies could not be satisfied until the wait occurred.
That sometimes meant stalling the pipeline when the wait occurred.
The new API provides enough information for implementations to satisfy these
dependencies in parallel with other tasks.

Queue submission has been changed to wrap command buffers and semaphores in
extensible structures, which incorporate changes from Vulkan 1.1,
`[VK_KHR_device_group](VK_KHR_device_group.html)`, and `[VK_KHR_timeline_semaphore](VK_KHR_timeline_semaphore.html)`.
This also adds a pipeline stage to the semaphore signal operation, mirroring
the existing pipeline stage specification for wait operations.

Other miscellaneous changes include:

* 
Events can now be specified as interacting only with the device,
allowing more efficient access to the underlying object.

* 
Image memory barriers that do not perform an image layout transition can
be specified by setting `oldLayout` equal to `newLayout`.

E.g. the old and new layout can both be set to
[VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html), without discarding data in the image.

Queue family ownership transfer parameters are simplified in some cases.

Extensions with commands or functions with a [VkPipelineStageFlags](VkPipelineStageFlags.html)
or [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) parameter have had those APIs replaced
with equivalents using [VkPipelineStageFlags2KHR](VkPipelineStageFlags2.html).

The new event and barrier interfaces are now more extensible for future
changes.

Relevant pipeline stage masks can now be specified as empty with the new
[VK_PIPELINE_STAGE_NONE_KHR](VkPipelineStageFlagBits.html) and [VK_PIPELINE_STAGE_2_NONE_KHR](VkPipelineStageFlagBits2.html)
values.

[VkMemoryBarrier2KHR](VkMemoryBarrier2.html) can be chained to [VkSubpassDependency2](VkSubpassDependency2.html),
overriding the original 32-bit stage and access masks.

* 
`VkFlags64`

* 
[vkCmdPipelineBarrier2KHR](vkCmdPipelineBarrier2.html)

* 
[vkCmdResetEvent2KHR](vkCmdResetEvent2.html)

* 
[vkCmdSetEvent2KHR](vkCmdSetEvent2.html)

* 
[vkCmdWaitEvents2KHR](vkCmdWaitEvents2.html)

* 
[vkCmdWriteTimestamp2KHR](vkCmdWriteTimestamp2.html)

* 
[vkQueueSubmit2KHR](vkQueueSubmit2.html)

* 
[VkBufferMemoryBarrier2KHR](VkBufferMemoryBarrier2.html)

* 
[VkCommandBufferSubmitInfoKHR](VkCommandBufferSubmitInfo.html)

* 
[VkDependencyInfoKHR](VkDependencyInfo.html)

* 
[VkImageMemoryBarrier2KHR](VkImageMemoryBarrier2.html)

* 
[VkSemaphoreSubmitInfoKHR](VkSemaphoreSubmitInfo.html)

* 
[VkSubmitInfo2KHR](VkSubmitInfo2.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceSynchronization2FeaturesKHR](VkPhysicalDeviceSynchronization2Features.html)

Extending [VkSubpassDependency2](VkSubpassDependency2.html):

* 
[VkMemoryBarrier2KHR](VkMemoryBarrier2.html)

* 
[VkAccessFlagBits2KHR](VkAccessFlagBits2.html)

* 
[VkPipelineStageFlagBits2KHR](VkPipelineStageFlagBits2.html)

* 
[VkSubmitFlagBitsKHR](VkSubmitFlagBits.html)

* 
[VkAccessFlags2KHR](VkAccessFlags2.html)

* 
[VkPipelineStageFlags2KHR](VkPipelineStageFlags2.html)

* 
[VkSubmitFlagsKHR](VkSubmitFlags.html)

* 
`VK_KHR_SYNCHRONIZATION_2_EXTENSION_NAME`

* 
`VK_KHR_SYNCHRONIZATION_2_SPEC_VERSION`

* 
Extending [VkAccessFlagBits](VkAccessFlagBits.html):

[VK_ACCESS_NONE_KHR](VkAccessFlagBits.html)

Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

* 
[VK_ACCESS_2_COLOR_ATTACHMENT_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_COLOR_ATTACHMENT_WRITE_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_HOST_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_HOST_WRITE_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_INDEX_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_INDIRECT_COMMAND_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_INPUT_ATTACHMENT_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_MEMORY_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_MEMORY_WRITE_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_NONE_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_SHADER_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_SHADER_SAMPLED_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_SHADER_STORAGE_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_SHADER_STORAGE_WRITE_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_SHADER_WRITE_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_TRANSFER_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_TRANSFER_WRITE_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_UNIFORM_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_VERTEX_ATTRIBUTE_READ_BIT_KHR](VkAccessFlagBits2.html)

Extending [VkEventCreateFlagBits](VkEventCreateFlagBits.html):

* 
[VK_EVENT_CREATE_DEVICE_ONLY_BIT_KHR](VkEventCreateFlagBits.html)

Extending [VkImageLayout](VkImageLayout.html):

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

Extending [VkPipelineStageFlagBits](VkPipelineStageFlagBits.html):

* 
[VK_PIPELINE_STAGE_NONE_KHR](VkPipelineStageFlagBits.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_BLIT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_CLEAR_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_HOST_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_NONE_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_RESOLVE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_TRANSFER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_MEMORY_BARRIER_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SYNCHRONIZATION_2_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBMIT_INFO_2_KHR](VkStructureType.html)

Extending [VkSubmitFlagBits](VkSubmitFlagBits.html):

* 
[VK_SUBMIT_PROTECTED_BIT_KHR](VkSubmitFlagBits.html)

If [VK_EXT_blend_operation_advanced](VK_EXT_blend_operation_advanced.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_COLOR_ATTACHMENT_READ_NONCOHERENT_BIT_EXT](VkAccessFlagBits2.html)

If [VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_CONDITIONAL_RENDERING_READ_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

If [VK_EXT_device_generated_commands](VK_EXT_device_generated_commands.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_EXT](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

If [VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_FRAGMENT_DENSITY_MAP_READ_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

If [VK_EXT_mesh_shader](VK_EXT_mesh_shader.html) is supported:

* 
Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

If [VK_EXT_transform_feedback](VK_EXT_transform_feedback.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_READ_BIT_EXT](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_TRANSFORM_FEEDBACK_COUNTER_WRITE_BIT_EXT](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_TRANSFORM_FEEDBACK_WRITE_BIT_EXT](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

If [VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

If [VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

If [VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html) is supported:

* 
Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

If [VK_NV_device_generated_commands](VK_NV_device_generated_commands.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_COMMAND_PREPROCESS_READ_BIT_NV](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_COMMAND_PREPROCESS_WRITE_BIT_NV](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](VkPipelineStageFlagBits2.html)

If [VK_NV_mesh_shader](VK_NV_mesh_shader.html) is supported:

* 
Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_NV](VkPipelineStageFlagBits2.html)

If [VK_NV_ray_tracing](VK_NV_ray_tracing.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_ACCELERATION_STRUCTURE_READ_BIT_NV](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_ACCELERATION_STRUCTURE_WRITE_BIT_NV](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_NV](VkPipelineStageFlagBits2.html)

* 
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_NV](VkPipelineStageFlagBits2.html)

If [VK_NV_shading_rate_image](VK_NV_shading_rate_image.html) is supported:

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_SHADING_RATE_IMAGE_READ_BIT_NV](VkAccessFlagBits2.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV](VkPipelineStageFlagBits2.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the KHR
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

See
[https://github.com/KhronosGroup/Vulkan-Docs/wiki/Synchronization-Examples](https://github.com/KhronosGroup/Vulkan-Docs/wiki/Synchronization-Examples)

* 
Revision 1, 2020-12-03 (Tobias Hector)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_synchronization2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
