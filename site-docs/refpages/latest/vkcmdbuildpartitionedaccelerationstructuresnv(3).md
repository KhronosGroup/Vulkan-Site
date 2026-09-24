# vkCmdBuildPartitionedAccelerationStructuresNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBuildPartitionedAccelerationStructuresNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBuildPartitionedAccelerationStructuresNV - Command for building a PTLAS

To build a partitioned top level acceleration structure, call:

// Provided by VK_NV_partitioned_acceleration_structure
void vkCmdBuildPartitionedAccelerationStructuresNV(
    VkCommandBuffer                             commandBuffer,
    const VkBuildPartitionedAccelerationStructureInfoNV* pBuildInfo);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`pBuildInfo` is a pointer to a
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html) structure containing
parameters required for building a PTLAS.

Accesses to the acceleration structure scratch memory as identified by the
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`scratchData` **must**
be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
([VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) |
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html)).

Accesses to each
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`srcAccelerationStructureData`
and
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`dstAccelerationStructureData`
**must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html), as appropriate.

Accesses to memory with input data as identified by any used values of
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`srcInfos` and
[VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html)::`srcInfosCount`
**must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_INDIRECT_COMMAND_READ_BIT](VkAccessFlagBits.html).

Valid Usage

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-partitionedAccelerationStructure-10536) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-partitionedAccelerationStructure-10536

The [    `VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV`::`partitionedAccelerationStructure`](../../../../spec/latest/chapters/features.html#features-partitionedAccelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10537) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10537

The count specified in `pBuildInfo->input.instanceCount` for the
build operation **must** not exceed the value provided in
`pInfo->instanceCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10538) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10538

The count specified in
`pBuildInfo->input.maxInstancePerPartitionCount` for the build
operation **must** not exceed the value provided in
`pInfo->maxInstancePerPartitionCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10539) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10539

The count specified in `pBuildInfo->input.partitionCount` for the
build operation **must** not exceed the value provided in
`pInfo->partitionCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10540) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10540

The count specified in
`pBuildInfo->input.maxInstanceInGlobalPartitionCount` for the build
operation **must** not exceed the value provided in
`pInfo->maxInstanceInGlobalPartitionCount` when calling
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html) to determine
the memory size

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10541) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10541

The scratch memory for the partitioned acceleration structure build
specified in `pBuildInfo->scratchData` **must** be larger than or equal
to the scratch size queried with
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10542) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10542

`pBuildInfo->scratchData` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10543) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10543

The destination memory of the partitioned acceleration structure build
specified in `pBuildInfo->dstAccelerationStructureData` **must** be
larger than or equal to the size queried with
[vkGetPartitionedAccelerationStructuresBuildSizesNV](vkGetPartitionedAccelerationStructuresBuildSizesNV.html)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10544) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10544

`pBuildInfo->srcAccelerationStructureData` **must** be aligned to `256`
bytes

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10545) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10545

`pBuildInfo->dstAccelerationStructureData` **must** be aligned to `256`
bytes

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10546) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10546

The number of inputs specified in `pBuildInfo->srcInfos` **must** be
greater than or equal to `pBuildInfo->srcInfosCount`

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10547) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10547

The memory region containing the acceleration structure at address
`pBuildInfo->srcAccelerationStructureData` **must** not overlap with
scratch memory region at address `pBuildInfo->scratchData`

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10548) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10548

The memory region containing the acceleration structure at address
`pBuildInfo->dstAccelerationStructureData` **must** not overlap with
scratch memory region at address `pBuildInfo->scratchData`

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10549) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10549

If the source and destination acceleration structures are not the same,
the memory regions containing the acceleration structures at addresses
`pBuildInfo->srcAccelerationStructureData` and
`pBuildInfo->dstAccelerationStructureData` **must** not overlap with
each other

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10550) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10550

`pBuildInfo->scratchData` **must** be a device address allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10551) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10551

`pBuildInfo->srcInfos` and `pBuildInfo->srcInfosCount` **must** be
device addresses allocated to the application from buffers created with
the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](VkBufferUsageFlagBits.html)
usage flag set

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10552) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-10552

`pBuildInfo->srcAccelerationStructureData` and
`pBuildInfo->dstAccelerationStructureData` **must** be a device
addresses allocated to the application from buffers created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](VkBufferUsageFlagBits.html) usage flag
set

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-parameter) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-parameter) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-pBuildInfo-parameter

 `pBuildInfo` **must** be a valid pointer to a valid [VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html) structure

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-recording) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-cmdpool) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-renderpass) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-suspended) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildPartitionedAccelerationStructuresNV-videocoding) VUID-vkCmdBuildPartitionedAccelerationStructuresNV-videocoding

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

vkCmdBuildPartitionedAccelerationStructuresNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_partitioned_acceleration_structure](VK_NV_partitioned_acceleration_structure.html), [VkBuildPartitionedAccelerationStructureInfoNV](VkBuildPartitionedAccelerationStructureInfoNV.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdBuildPartitionedAccelerationStructuresNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
