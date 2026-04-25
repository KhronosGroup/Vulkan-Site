# VkBufferUsageFlagBits2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferUsageFlagBits2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferUsageFlagBits2 - Bitmask controlling how a pipeline is created

Bits which **can** be set in [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)::`usage`,
specifying usage behavior of a buffer, are:

// Provided by VK_VERSION_1_4
// Flag bits for VkBufferUsageFlagBits2
typedef VkFlags64 VkBufferUsageFlagBits2;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_SRC_BIT = 0x00000001ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_DST_BIT = 0x00000002ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT = 0x00000004ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT = 0x00000008ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT = 0x00000010ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT = 0x00000020ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDEX_BUFFER_BIT = 0x00000040ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VERTEX_BUFFER_BIT = 0x00000080ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT = 0x00000100ULL;
// Provided by VK_VERSION_1_4
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT = 0x00020000ULL;
// Provided by VK_AMDX_shader_enqueue with VK_KHR_maintenance5 or VK_VERSION_1_4
#ifdef VK_ENABLE_BETA_EXTENSIONS
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX = 0x02000000ULL;
#endif
// Provided by VK_EXT_descriptor_heap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT = 0x10000000ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_SRC_BIT_KHR = 0x00000001ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_DST_BIT_KHR = 0x00000002ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT_KHR = 0x00000004ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT_KHR = 0x00000008ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT_KHR = 0x00000010ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT_KHR = 0x00000020ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDEX_BUFFER_BIT_KHR = 0x00000040ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VERTEX_BUFFER_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_conditional_rendering
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_CONDITIONAL_RENDERING_BIT_EXT = 0x00000200ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SHADER_BINDING_TABLE_BIT_KHR = 0x00000400ULL;
// Provided by VK_KHR_maintenance5 with VK_NV_ray_tracing
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_RAY_TRACING_BIT_NV = 0x00000400ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_transform_feedback
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT = 0x00000800ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_transform_feedback
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT = 0x00001000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_decode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR = 0x00002000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_decode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_DECODE_DST_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_encode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_encode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR = 0x00010000ULL;
// Provided by VK_KHR_maintenance5 with VK_VERSION_1_2 or VK_KHR_buffer_device_address or VK_EXT_buffer_device_address
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT_KHR = 0x00020000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR = 0x00080000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR = 0x00100000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_descriptor_buffer
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT = 0x00200000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_descriptor_buffer
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT = 0x00400000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_descriptor_buffer
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT = 0x04000000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_opacity_micromap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT = 0x00800000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_opacity_micromap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_MICROMAP_STORAGE_BIT_EXT = 0x01000000ULL;
// Provided by VK_AMDX_dense_geometry_format
#ifdef VK_ENABLE_BETA_EXTENSIONS
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_COMPRESSED_DATA_DGF1_BIT_AMDX = 0x200000000ULL;
#endif
// Provided by VK_ARM_data_graph
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM = 0x20000000ULL;
// Provided by VK_QCOM_tile_memory_heap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TILE_MEMORY_BIT_QCOM = 0x08000000ULL;
// Provided by VK_EXT_memory_decompression
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT = 0x100000000ULL;
// Provided by VK_EXT_device_generated_commands
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_PREPROCESS_BUFFER_BIT_EXT = 0x80000000ULL;

// Provided by VK_KHR_maintenance5
// Equivalent to VkBufferUsageFlagBits2
typedef VkBufferUsageFlagBits2 VkBufferUsageFlagBits2KHR;

* 
[VK_BUFFER_USAGE_2_TRANSFER_SRC_BIT](#) specifies that the buffer **can**
be used as the source of a *transfer command* (see the definition of
[](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-transfer)[VK_PIPELINE_STAGE_TRANSFER_BIT](VkPipelineStageFlagBits.html)).

* 
[VK_BUFFER_USAGE_2_TRANSFER_DST_BIT](#) specifies that the buffer **can**
be used as the destination of a transfer command.

* 
[VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT](#) specifies that the
buffer **can** be used to create a `VkBufferView` suitable for
occupying a `VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html).

* 
[VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT](#) specifies that the
buffer **can** be used to create a `VkBufferView` suitable for
occupying a `VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html).

* 
[VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT](#) specifies that the buffer
**can** be used in a `VkDescriptorBufferInfo` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html).

* 
[VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT](#) specifies that the buffer
**can** be used in a `VkDescriptorBufferInfo` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html).

* 
[VK_BUFFER_USAGE_2_INDEX_BUFFER_BIT](#) specifies that the buffer is
    suitable for passing as the `buffer` parameter to
[vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html) and
    [vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html).

* 
[VK_BUFFER_USAGE_2_VERTEX_BUFFER_BIT](#) specifies that the buffer is
suitable for passing as an element of the `pBuffers` array to
[vkCmdBindVertexBuffers](vkCmdBindVertexBuffers.html).

* 
[VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT](#) specifies that the buffer is
suitable for passing as the `buffer` parameter to
[vkCmdDrawIndirect](vkCmdDrawIndirect.html), [vkCmdDrawIndexedIndirect](vkCmdDrawIndexedIndirect.html),
[vkCmdDrawMeshTasksIndirectNV](vkCmdDrawMeshTasksIndirectNV.html),
[vkCmdDrawMeshTasksIndirectCountNV](vkCmdDrawMeshTasksIndirectCountNV.html),
`vkCmdDrawMeshTasksIndirectEXT`,
`vkCmdDrawMeshTasksIndirectCountEXT`,
[vkCmdDrawClusterIndirectHUAWEI](vkCmdDrawClusterIndirectHUAWEI.html),
or [vkCmdDispatchIndirect](vkCmdDispatchIndirect.html).
It is also suitable for passing as the `buffer` member of
`VkIndirectCommandsStreamNV`, or `sequencesCountBuffer` or
`sequencesIndexBuffer` or `preprocessedBuffer` member of
`VkGeneratedCommandsInfoNV`.
It is also suitable for passing as the underlying buffer of either the
`preprocessAddress` or `sequenceCountAddress` members of
`VkGeneratedCommandsInfoEXT`.

* 
[VK_BUFFER_USAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#) specifies that the
buffer is suitable for passing as the `buffer` parameter to
[vkCmdBeginConditionalRenderingEXT](vkCmdBeginConditionalRenderingEXT.html).

* 
[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](#) specifies that
the buffer is suitable for using for binding as a transform feedback
buffer with
[vkCmdBindTransformFeedbackBuffers2EXT](vkCmdBindTransformFeedbackBuffers2EXT.html) or
[vkCmdBindTransformFeedbackBuffersEXT](vkCmdBindTransformFeedbackBuffersEXT.html).

* 
[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](#)
specifies that the buffer is suitable for using as a counter buffer with
[vkCmdBeginTransformFeedback2EXT](vkCmdBeginTransformFeedback2EXT.html),
[vkCmdEndTransformFeedback2EXT](vkCmdEndTransformFeedback2EXT.html),
[vkCmdBeginTransformFeedbackEXT](vkCmdBeginTransformFeedbackEXT.html), and
[vkCmdEndTransformFeedbackEXT](vkCmdEndTransformFeedbackEXT.html).

* 
[VK_BUFFER_USAGE_2_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](#) specifies that
the buffer is suitable to contain sampler and combined image sampler
descriptors when bound as a descriptor buffer.
Buffers containing combined image sampler descriptors **must** also specify
[VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#).

* 
[VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#) specifies
that the buffer is suitable to contain resource descriptors when bound
as a descriptor buffer.

* 
[VK_BUFFER_USAGE_2_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](#)
specifies that the buffer, when bound, **can** be used by the
implementation to support push descriptors when using descriptor
buffers.

* 
[VK_BUFFER_USAGE_2_TILE_MEMORY_BIT_QCOM](#) specifies that the buffer
**can** be bound to `VkDeviceMemory` allocated from a
[VkMemoryHeap](VkMemoryHeap.html) with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html)
property.

* 
[VK_BUFFER_USAGE_2_RAY_TRACING_BIT_NV](#) specifies that the buffer is
suitable for use in [vkCmdTraceRaysNV](vkCmdTraceRaysNV.html).

* 
[VK_BUFFER_USAGE_2_SHADER_BINDING_TABLE_BIT_KHR](#) specifies that the
buffer is suitable for use as a [Shader Binding    Table](../../../../spec/latest/chapters/raytracing.html#shader-binding-table).

* 
[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](#)
specifies that the buffer is suitable for use as a read-only input to an
[acceleration structure build](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-building).

* 
[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](#) specifies
that the buffer is suitable for storage space for a
[VkAccelerationStructureKHR](VkAccelerationStructureKHR.html).

* 
[VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT](#) specifies that the
buffer **can** be used to retrieve a buffer device address via
[vkGetBufferDeviceAddress](vkGetBufferDeviceAddress.html) and use that address to access the
buffer’s memory from a shader.

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](#) specifies that the
buffer **can** be used as the source video bitstream buffer in a
[video decode operation](../../../../spec/latest/chapters/videocoding.html#video-decode-operations).

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_DST_BIT_KHR](#) is reserved for future
use.

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](#) specifies that the
buffer **can** be used as the destination video bitstream buffer in a
[video encode operation](../../../../spec/latest/chapters/videocoding.html#video-encode-operations).

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR](#) is reserved for future
use.

* 
[VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](#) specifies that
the buffer **can** be used for as scratch memory for
[execution graph dispatch](../../../../spec/latest/chapters/executiongraphs.html#executiongraphs).

* 
[VK_BUFFER_USAGE_2_PREPROCESS_BUFFER_BIT_EXT](#) specifies that the
buffer **can** be used as a preprocess buffer for
[Device-Generated Commands](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_BUFFER_USAGE_2_COMPRESSED_DATA_DGF1_BIT_AMDX](#) specifies that the
buffer is suitable as storage space for [Dense    Geometry Format](../../../../spec/latest/chapters/VK_AMDX_dense_geometry_format/dense_geometry_format.html#dense-geometry-format) data.

* 
[VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM](#) specifies
that the buffer is suitable to contain resource descriptors when bound
as a descriptor buffer in command buffers allocated from a command pool
that **can** target foreign [data graph    processing engines](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-processing-engines).

* 
[VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#) specifies that the
buffer **can** be used as a destination buffer in [    memory decompression](../../../../spec/latest/chapters/memory_decompression.html#memory-decompression).

* 
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#) specifies that the
buffer **can** be used as a [descriptor heap](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps).

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkBufferUsageFlags2](VkBufferUsageFlags2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferUsageFlagBits2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
