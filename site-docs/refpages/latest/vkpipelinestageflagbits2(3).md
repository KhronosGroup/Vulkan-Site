# VkPipelineStageFlagBits2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineStageFlagBits2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineStageFlagBits2 - Pipeline stage flags for VkPipelineStageFlags2

Bits which **can** be set in a [VkPipelineStageFlags2](VkPipelineStageFlags2.html) mask, specifying
stages of execution, are:

// Provided by VK_VERSION_1_3
// Flag bits for VkPipelineStageFlagBits2
typedef VkFlags64 VkPipelineStageFlagBits2;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_NONE = 0ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT = 0x00000001ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT = 0x00000002ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT = 0x00000004ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT = 0x00000008ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT = 0x00000010ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT = 0x00000020ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT = 0x00000040ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT = 0x00000080ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT = 0x00000100ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT = 0x00000200ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT = 0x00000400ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT = 0x00000800ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT = 0x00001000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TRANSFER_BIT = 0x00001000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT = 0x00002000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_HOST_BIT = 0x00004000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT = 0x00008000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT = 0x00010000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COPY_BIT = 0x100000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RESOLVE_BIT = 0x200000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BLIT_BIT = 0x400000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CLEAR_BIT = 0x800000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT = 0x1000000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT = 0x2000000000ULL;
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT = 0x4000000000ULL;
// Provided by VK_KHR_video_decode_queue
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR = 0x04000000ULL;
// Provided by VK_KHR_video_encode_queue
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR = 0x08000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_NONE_KHR = 0ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT_KHR = 0x00000001ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT_KHR = 0x00000002ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT_KHR = 0x00000004ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT_KHR = 0x00000008ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT_KHR = 0x00000010ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT_KHR = 0x00000020ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT_KHR = 0x00000040ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT_KHR = 0x00000200ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT_KHR = 0x00000400ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT_KHR = 0x00000800ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TRANSFER_BIT_KHR = 0x00001000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT_KHR = 0x00002000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_HOST_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT_KHR = 0x00010000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COPY_BIT_KHR = 0x100000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RESOLVE_BIT_KHR = 0x200000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_BLIT_BIT_KHR = 0x400000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CLEAR_BIT_KHR = 0x800000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT_KHR = 0x1000000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT_KHR = 0x2000000000ULL;
// Provided by VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT_KHR = 0x4000000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_transform_feedback
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT = 0x01000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_conditional_rendering
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT = 0x00040000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_device_generated_commands
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV = 0x00020000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_device_generated_commands
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT = 0x00020000ULL;
// Provided by VK_KHR_fragment_shading_rate with VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x00400000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_shading_rate_image
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_SHADING_RATE_IMAGE_BIT_NV = 0x00400000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR = 0x02000000ULL;
// Provided by VK_KHR_ray_tracing_pipeline with VK_KHR_synchronization2
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR = 0x00200000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_ray_tracing
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_NV = 0x00200000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_ray_tracing
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_NV = 0x02000000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_fragment_density_map
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT = 0x00800000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_NV = 0x00080000ULL;
// Provided by VK_KHR_synchronization2 with VK_NV_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_NV = 0x00100000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT = 0x00080000ULL;
// Provided by VK_KHR_synchronization2 with VK_EXT_mesh_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT = 0x00100000ULL;
// Provided by VK_HUAWEI_subpass_shading
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI = 0x8000000000ULL;
// Provided by VK_HUAWEI_subpass_shading
// VK_PIPELINE_STAGE_2_SUBPASS_SHADING_BIT_HUAWEI is a legacy alias
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_SUBPASS_SHADING_BIT_HUAWEI = 0x8000000000ULL;
// Provided by VK_HUAWEI_invocation_mask
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI = 0x10000000000ULL;
// Provided by VK_KHR_ray_tracing_maintenance1 with VK_KHR_synchronization2 or VK_VERSION_1_3
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR = 0x10000000ULL;
// Provided by VK_EXT_opacity_micromap
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT = 0x40000000ULL;
// Provided by VK_HUAWEI_cluster_culling_shader
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI = 0x20000000000ULL;
// Provided by VK_NV_optical_flow
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV = 0x20000000ULL;
// Provided by VK_NV_cooperative_vector
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV = 0x100000000000ULL;
// Provided by VK_ARM_data_graph
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM = 0x40000000000ULL;
// Provided by VK_KHR_copy_memory_indirect
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR = 0x400000000000ULL;
// Provided by VK_EXT_memory_decompression
static const VkPipelineStageFlagBits2 VK_PIPELINE_STAGE_2_MEMORY_DECOMPRESSION_BIT_EXT = 0x200000000000ULL;

// Provided by VK_KHR_synchronization2
// Equivalent to VkPipelineStageFlagBits2
typedef VkPipelineStageFlagBits2 VkPipelineStageFlagBits2KHR;

* 
[VK_PIPELINE_STAGE_2_NONE](#) specifies no stages of execution.

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#) specifies the stage of the
pipeline where indirect command parameters are consumed.
This stage also includes reading commands written by
[vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html).
This stage also includes reading commands written by
[vkCmdPreprocessGeneratedCommandsEXT](vkCmdPreprocessGeneratedCommandsEXT.html).

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#) specifies the task shader
stage.

* 
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#) specifies the mesh shader
stage.

* 
[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#) specifies the stage of the
pipeline where index buffers are consumed.

* 
[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#) specifies the stage
of the pipeline where vertex buffers are consumed.

* 
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#) is equivalent to the logical
OR of:

[VK_PIPELINE_STAGE_2_INDEX_INPUT_BIT](#)

* 
[VK_PIPELINE_STAGE_2_VERTEX_ATTRIBUTE_INPUT_BIT](#)

[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#) specifies the vertex shader
stage.

[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#) specifies the
tessellation control shader stage.

[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#) specifies
the tessellation evaluation shader stage.

[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#) specifies the geometry
shader stage.

[VK_PIPELINE_STAGE_2_PRE_RASTERIZATION_SHADERS_BIT](#) is equivalent to
specifying all supported
[pre-rasterization shader    stages](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization):

* 
[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#)

* 
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#)

* 
[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#)

[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#) specifies the fragment
shader stage.

[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#) specifies the stage
of the pipeline where early fragment tests (depth and stencil tests
before fragment shading) are performed.
This stage also includes [render pass load    operations](../../../../spec/latest/chapters/renderpass.html#renderpass-load-operations) for framebuffer attachments with a depth/stencil format.

[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#) specifies the stage of
the pipeline where late fragment tests (depth and stencil tests after
fragment shading) are performed.
This stage also includes [render pass    store operations](../../../../spec/latest/chapters/renderpass.html#renderpass-store-operations) for framebuffer attachments with a depth/stencil
format.

[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#) specifies the
stage of the pipeline where final color values are output from the
pipeline.
This stage includes [blending](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blending),
[logic operations](../../../../spec/latest/chapters/framebuffer.html#framebuffer-logicop), render pass
[load](../../../../spec/latest/chapters/renderpass.html#renderpass-load-operations) and [    store](../../../../spec/latest/chapters/renderpass.html#renderpass-store-operations) operations for color attachments,
[render pass multisample resolve    operations](../../../../spec/latest/chapters/renderpass.html#renderpass-resolve-operations), and [vkCmdClearAttachments](vkCmdClearAttachments.html).

[VK_PIPELINE_STAGE_2_COMPUTE_SHADER_BIT](#) specifies the compute
shader stage.

[VK_PIPELINE_STAGE_2_HOST_BIT](#) specifies a pseudo-stage indicating
execution on the host of reads/writes of device memory.
This stage is not invoked by any commands recorded in a command buffer.

[VK_PIPELINE_STAGE_2_COPY_BIT](#) specifies the execution of all
[copy commands](../../../../spec/latest/chapters/copies.html#copies), including [vkCmdCopyQueryPoolResults](vkCmdCopyQueryPoolResults.html).

[VK_PIPELINE_STAGE_2_BLIT_BIT](#) specifies the execution of
[vkCmdBlitImage](vkCmdBlitImage.html).

[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#) specifies the execution of
[vkCmdResolveImage](vkCmdResolveImage.html).

[VK_PIPELINE_STAGE_2_CLEAR_BIT](#) specifies the execution of
[clear commands](../../../../spec/latest/chapters/clears.html#clears), with the exception of
[vkCmdClearAttachments](vkCmdClearAttachments.html).

[VK_PIPELINE_STAGE_2_ALL_TRANSFER_BIT](#) is equivalent to specifying
all of:

* 
[VK_PIPELINE_STAGE_2_COPY_BIT](#)

* 
[VK_PIPELINE_STAGE_2_BLIT_BIT](#)

* 
[VK_PIPELINE_STAGE_2_RESOLVE_BIT](#)

* 
[VK_PIPELINE_STAGE_2_CLEAR_BIT](#)

* 
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#)

[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](#) specifies the
execution of the ray tracing shader stages.

[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](#) specifies
the execution of [acceleration structure    commands](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure) or [acceleration structure    copy commands](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-copying).

[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](#) specifies
the execution of [acceleration    structure copy commands](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-copying).

[VK_PIPELINE_STAGE_2_ALL_GRAPHICS_BIT](#) specifies the execution of
all graphics pipeline stages, and is equivalent to the logical OR of:

* 
[VK_PIPELINE_STAGE_2_DRAW_INDIRECT_BIT](#)

* 
[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#)

* 
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](#)

* 
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](#)

* 
[VK_PIPELINE_STAGE_2_VERTEX_INPUT_BIT](#)

* 
[VK_PIPELINE_STAGE_2_VERTEX_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADER_BIT](#)

* 
[VK_PIPELINE_STAGE_2_EARLY_FRAGMENT_TESTS_BIT](#)

* 
[VK_PIPELINE_STAGE_2_LATE_FRAGMENT_TESTS_BIT](#)

* 
[VK_PIPELINE_STAGE_2_COLOR_ATTACHMENT_OUTPUT_BIT](#)

* 
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#)

* 
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#)

* 
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#)

* 
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#)

* 
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#)

* 
[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#)

[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#) specifies all operations
performed by all commands supported on the queue it is used with.

[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#) specifies the
stage of the pipeline where the predicate of conditional rendering is
consumed.

[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](#) specifies the stage
of the pipeline where vertex attribute output values are written to the
transform feedback buffers.

[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_NV](#) specifies the stage
of the pipeline where device-side generation of commands via
[vkCmdPreprocessGeneratedCommandsNV](vkCmdPreprocessGeneratedCommandsNV.html) is handled.

[VK_PIPELINE_STAGE_2_COMMAND_PREPROCESS_BIT_EXT](#) specifies the stage
of the pipeline where device-side generation of commands via
[vkCmdPreprocessGeneratedCommandsEXT](vkCmdPreprocessGeneratedCommandsEXT.html) is handled.

[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#)
    specifies the stage of the pipeline where the
    [fragment shading rate    attachment](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-attachment)
or
    [shading rate image](../../../../spec/latest/chapters/primsrast.html#primsrast-shading-rate-image)
    is read to determine the fragment shading rate for portions of a
    rasterized primitive.

[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](#) specifies the
stage of the pipeline where the fragment density map is read to
[generate the fragment areas](../../../../spec/latest/chapters/fragmentdensitymapops.html#fragmentdensitymapops).

[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](#) specifies the stage
of the pipeline where the invocation mask image is read by the
implementation to optimize the ray dispatch.

[VK_PIPELINE_STAGE_2_VIDEO_DECODE_BIT_KHR](#) specifies the execution
of [video decode operations](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).

[VK_PIPELINE_STAGE_2_VIDEO_ENCODE_BIT_KHR](#) specifies the execution
of [video encode operations](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

[VK_PIPELINE_STAGE_2_OPTICAL_FLOW_BIT_NV](#) specifies the stage of the
pipeline where [optical flow operation](../../../../spec/latest/chapters/VK_NV_optical_flow/optical_flow.html#opticalflow-operations) are
performed.

[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](#) specifies the
subpass shading shader stage.

[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](#) specifies the execution
of [micromap commands](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#micromap).

[VK_PIPELINE_STAGE_2_CLUSTER_CULLING_SHADER_BIT_HUAWEI](#) specifies
the cluster culling shader stage.

[VK_PIPELINE_STAGE_2_CONVERT_COOPERATIVE_VECTOR_MATRIX_BIT_NV](#)
specifies the execution of [vkCmdConvertCooperativeVectorMatrixNV](vkCmdConvertCooperativeVectorMatrixNV.html).

[VK_PIPELINE_STAGE_2_COPY_INDIRECT_BIT_KHR](#) specifies the stage of
the pipeline where indirect copy commands (vkCmdCopyMemoryIndirect* and
vkCmdCopyMemoryToImageIndirect*) parameters are consumed.

[VK_PIPELINE_STAGE_2_TOP_OF_PIPE_BIT](#) is equivalent to
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#) with [VkAccessFlags2](VkAccessFlags2.html) set
to `0` when specified in the second synchronization scope, but
equivalent to [VK_PIPELINE_STAGE_2_NONE](#) in the first scope.

[VK_PIPELINE_STAGE_2_BOTTOM_OF_PIPE_BIT](#) is equivalent to
[VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#) with [VkAccessFlags2](VkAccessFlags2.html) set
to `0` when specified in the first synchronization scope, but equivalent
to [VK_PIPELINE_STAGE_2_NONE](#) in the second scope.

|  | The `TOP` and `BOTTOM` pipeline stages are legacy, and applications
| --- | --- |
should prefer [VK_PIPELINE_STAGE_2_ALL_COMMANDS_BIT](#) and
[VK_PIPELINE_STAGE_2_NONE](#). |

|  | The `VkPipelineStageFlags2` bitmask goes beyond the 31 individual bit
| --- | --- |
flags allowable within a C99 enum, which is how
[VkPipelineStageFlagBits](VkPipelineStageFlagBits.html) is defined.
The first 31 values are common to both, and are interchangeable. |

[VK_KHR_synchronization2](VK_KHR_synchronization2.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#VkPipelineStageFlagBits2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
