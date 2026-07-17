# vkCmdBuildClusterAccelerationStructureIndirectNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBuildClusterAccelerationStructureIndirectNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBuildClusterAccelerationStructureIndirectNV - Build or move cluster acceleration structures

To build or move a cluster acceleration structure or a cluster acceleration
structure template call:

// Provided by VK_NV_cluster_acceleration_structure
void vkCmdBuildClusterAccelerationStructureIndirectNV(
    VkCommandBuffer                             commandBuffer,
    const VkClusterAccelerationStructureCommandsInfoNV* pCommandInfos);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pCommandInfos` is a pointer to a
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html) structure containing
parameters required for building or moving the cluster acceleration
structure.

Similar to [vkCmdBuildAccelerationStructuresKHR](vkCmdBuildAccelerationStructuresKHR.html), this command **may**
initiate multiple acceleration structures builds and there is no ordering or
synchronization implied between any of the individual acceleration structure
builds.
Accesses to the acceleration structure scratch memory as identified by the
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData` **must**
be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
([VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) |
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html)).

Accesses to each
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstImplicitData`,
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstAddressesArray`
and [VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstSizesArray`
**must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html).

Accesses to memory with input data as identified by any used values of
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`srcInfosArray` and
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`srcInfosCount`
**must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits.html).

Valid Usage

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-clusterAccelerationStructure-10443) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-clusterAccelerationStructure-10443

The [    `VkPhysicalDeviceClusterAccelerationStructureFeaturesNV`::`clusterAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-clusterAccelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pNext-10444) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pNext-10444

The `pNext` chain of the bound ray tracing pipeline **must** include a
[VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV](VkRayTracingPipelineClusterAccelerationStructureCreateInfoNV.html)
structure

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10445) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10445

`pCommandInfos->input.maxAccelerationStructureCount` **must** be less
than or equal to the value used in
`pInfo->maxAccelerationStructureCount` in
[vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html) to determine the
memory requirements for the build operation

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12300) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12300

The scratch memory of the cluster acceleration structure specified in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be larger than or equal to the scratch size queried with
[vkGetClusterAccelerationStructureBuildSizesNV](vkGetClusterAccelerationStructureBuildSizesNV.html)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12301) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-scratchData-12301

The scratch address of the cluster acceleration structure specified in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`,
or the address indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be aligned based on the cluster acceleration structure type and
its alignment properties as queried with
[VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](VkPhysicalDeviceClusterAccelerationStructurePropertiesNV.html)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10448) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10448

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_MOVE_OBJECTS_NV](VkClusterAccelerationStructureOpTypeNV.html),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureMoveObjectsInfoNV](VkClusterAccelerationStructureMoveObjectsInfoNV.html) structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10449) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10449

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_CLUSTERS_BOTTOM_LEVEL_NV](VkClusterAccelerationStructureOpTypeNV.html),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV](VkClusterAccelerationStructureBuildClustersBottomLevelInfoNV.html)
structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10450) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10450

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureBuildTriangleClusterInfoNV](VkClusterAccelerationStructureBuildTriangleClusterInfoNV.html)
structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10451) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10451

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_BUILD_TRIANGLE_CLUSTER_TEMPLATE_NV](VkClusterAccelerationStructureOpTypeNV.html),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV.html)
structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10452) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10452

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_INSTANTIATE_TRIANGLE_CLUSTER_NV](VkClusterAccelerationStructureOpTypeNV.html),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureInstantiateClusterInfoNV](VkClusterAccelerationStructureInstantiateClusterInfoNV.html) structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10832) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10832

If `pCommandInfos->input.opType` is
[VK_CLUSTER_ACCELERATION_STRUCTURE_OP_TYPE_GET_CLUSTER_TEMPLATE_INDICES_NV](VkClusterAccelerationStructureOpTypeNV.html),
`pCommandInfos->srcInfosArray` **must** be an array of
[VkClusterAccelerationStructureGetTemplateIndicesInfoNV](VkClusterAccelerationStructureGetTemplateIndicesInfoNV.html) structures

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10453) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10453

The value in `pCommandInfos->srcInfosCount` **must** be less than or
equal to `pCommandInfos->input.maxAccelerationStructureCount`

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10454) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-10454

The number of inputs specified in `pCommandInfos->srcInfosArray`
**must** be greater than or equal to `pCommandInfos->srcInfosCount`

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstAddressesArray-12302) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstAddressesArray-12302

The memory regions specified in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstAddressesArray`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** not overlap with each other or with
`pCommandInfos->scratchData`, or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstImplicitData-12303) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-dstImplicitData-12303

The memory region specified in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstImplicitData`,
or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
for multiple acceleration structure builds **must** not overlap with
`pCommandInfos->scratchData`, or the memory indirectly referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12304) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12304

`pCommandInfos->scratchData`, or the address indirectly referenced
in [VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`scratchData`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SCRATCH_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a device address allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12305) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12305

`pCommandInfos->srcInfosArray`, or the address indirectly referenced
in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`srcInfosArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a device address range allocated to the application from a
buffer created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12306) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12306

`pCommandInfos->srcInfosCount`, or the address indirectly referenced
in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`srcInfosCount`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_SRC_INFOS_COUNT_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a device address allocated to the application from a buffer
created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12307) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12307

`pCommandInfos->dstAddressesArray`, or the address indirectly
referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstAddressesArray`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_ADDRESS_ARRAY_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a device address range allocated to the application from a
buffer created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag
set

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12308) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-12308

`pCommandInfos->dstImplicitData`, or the address indirectly
referenced in
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`dstImplicitData`
when
[VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html)::`addressResolutionFlags`
contains
[VK_CLUSTER_ACCELERATION_STRUCTURE_ADDRESS_RESOLUTION_INDIRECTED_DST_IMPLICIT_DATA_BIT_NV](VkClusterAccelerationStructureAddressResolutionFlagBitsNV.html),
**must** be a device address allocated to the application from a buffer
created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag
set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-parameter) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-parameter) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-pCommandInfos-parameter

 `pCommandInfos` **must** be a valid pointer to a valid [VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html) structure

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-recording) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-cmdpool) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-renderpass) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-suspended) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-videocoding) VUID-vkCmdBuildClusterAccelerationStructureIndirectNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdBuildClusterAccelerationStructureIndirectNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_cluster_acceleration_structure](VK_NV_cluster_acceleration_structure.html), [VkClusterAccelerationStructureCommandsInfoNV](VkClusterAccelerationStructureCommandsInfoNV.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdBuildClusterAccelerationStructureIndirectNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
