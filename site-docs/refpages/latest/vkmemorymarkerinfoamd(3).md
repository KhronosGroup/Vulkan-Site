# VkMemoryMarkerInfoAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMemoryMarkerInfoAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMemoryMarkerInfoAMD - Memory marker write info

`VkMemoryMarkerInfoAMD` is defined as:

// Provided by VK_KHR_device_address_commands with VK_AMD_buffer_marker
typedef struct VkMemoryMarkerInfoAMD {
    VkStructureType             sType;
    const void*                 pNext;
    VkPipelineStageFlags2KHR    stage;
    VkDeviceAddressRangeKHR     dstRange;
    VkAddressCommandFlagsKHR    dstFlags;
    uint32_t                    marker;
} VkMemoryMarkerInfoAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stage` specifies the pipeline stage whose completion triggers the
marker write.

* 
`dstRange` is the [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) where the marker
will be written.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining the
copy flags for the destination address range.

* 
`marker` is the 32-bit value of the marker.

Valid Usage

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13097) VUID-VkMemoryMarkerInfoAMD-dstRange-13097

If the range specified by `dstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13098) VUID-VkMemoryMarkerInfoAMD-dstRange-13098

If the buffer from which the range specified by `dstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13099) VUID-VkMemoryMarkerInfoAMD-dstRange-13099

If the buffer from which the range specified by `dstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstFlags-13100) VUID-VkMemoryMarkerInfoAMD-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13122) VUID-VkMemoryMarkerInfoAMD-dstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13123) VUID-VkMemoryMarkerInfoAMD-dstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstFlags-13101) VUID-VkMemoryMarkerInfoAMD-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13124) VUID-VkMemoryMarkerInfoAMD-dstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13125) VUID-VkMemoryMarkerInfoAMD-dstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `dstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-03929) VUID-VkMemoryMarkerInfoAMD-stage-03929

If the [`geometryShader`](../../../../spec/latest/chapters/features.html#features-geometryShader) feature is not
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-03930) VUID-VkMemoryMarkerInfoAMD-stage-03930

If the [`tessellationShader`](../../../../spec/latest/chapters/features.html#features-tessellationShader) feature
is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](VkPipelineStageFlagBits2.html) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-03931) VUID-VkMemoryMarkerInfoAMD-stage-03931

If the [`conditionalRendering`](../../../../spec/latest/chapters/features.html#features-conditionalRendering)
feature is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-03932) VUID-VkMemoryMarkerInfoAMD-stage-03932

If the [`fragmentDensityMap`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMap) feature
is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-03933) VUID-VkMemoryMarkerInfoAMD-stage-03933

If the [`transformFeedback`](../../../../spec/latest/chapters/features.html#features-transformFeedback) feature
is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-03934) VUID-VkMemoryMarkerInfoAMD-stage-03934

If the [`meshShader`](../../../../spec/latest/chapters/features.html#features-meshShader) feature is not enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-03935) VUID-VkMemoryMarkerInfoAMD-stage-03935

If the [`taskShader`](../../../../spec/latest/chapters/features.html#features-taskShader) feature is not enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-07316) VUID-VkMemoryMarkerInfoAMD-stage-07316

If neither of the [`shadingRateImage`](../../../../spec/latest/chapters/features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) features are enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-04957) VUID-VkMemoryMarkerInfoAMD-stage-04957

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is not
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-04995) VUID-VkMemoryMarkerInfoAMD-stage-04995

If the [`invocationMask`](../../../../spec/latest/chapters/features.html#features-invocationMask) feature is not
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-07946) VUID-VkMemoryMarkerInfoAMD-stage-07946

If neither the [VK_NV_ray_tracing](VK_NV_ray_tracing.html) extension or the
[`rayTracingPipeline`](../../../../spec/latest/chapters/features.html#features-rayTracingPipeline) feature are
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-10751) VUID-VkMemoryMarkerInfoAMD-stage-10751

If the [`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-10752) VUID-VkMemoryMarkerInfoAMD-stage-10752

If the [`rayTracingMaintenance1`](../../../../spec/latest/chapters/features.html#features-rayTracingMaintenance1)
feature is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-10753) VUID-VkMemoryMarkerInfoAMD-stage-10753

If the [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature is not enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-13038) VUID-VkMemoryMarkerInfoAMD-stage-13038

`stage` **must** include only a single pipeline stage

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13039) VUID-VkMemoryMarkerInfoAMD-dstRange-13039

The buffer from which `dstRange` was queried **must** have been created
with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13040) VUID-VkMemoryMarkerInfoAMD-dstRange-13040

`dstRange.address` **must** be a multiple of 4

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstRange-13041) VUID-VkMemoryMarkerInfoAMD-dstRange-13041

`dstRange.size` **must** be greater than or equal to 4

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryMarkerInfoAMD-sType-sType) VUID-VkMemoryMarkerInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_MARKER_INFO_AMD](VkStructureType.html)

* 
[](#VUID-VkMemoryMarkerInfoAMD-pNext-pNext) VUID-VkMemoryMarkerInfoAMD-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-parameter) VUID-VkMemoryMarkerInfoAMD-stage-parameter

 `stage` **must** be a valid combination of [VkPipelineStageFlagBits2KHR](VkPipelineStageFlagBits2.html) values

* 
[](#VUID-VkMemoryMarkerInfoAMD-stage-requiredbitmask) VUID-VkMemoryMarkerInfoAMD-stage-requiredbitmask

 `stage` **must** not be `0`

* 
[](#VUID-VkMemoryMarkerInfoAMD-dstFlags-parameter) VUID-VkMemoryMarkerInfoAMD-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

[VK_AMD_buffer_marker](VK_AMD_buffer_marker.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkPipelineStageFlags2](VkPipelineStageFlags2.html), [VkStructureType](VkStructureType.html), [vkCmdWriteMarkerToMemoryAMD](vkCmdWriteMarkerToMemoryAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#VkMemoryMarkerInfoAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
