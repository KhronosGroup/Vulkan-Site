# vkCmdCopyMemoryToAccelerationStructureKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMemoryToAccelerationStructureKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMemoryToAccelerationStructureKHR - Copy device memory to an acceleration structure

To copy device memory to an acceleration structure call:

// Provided by VK_KHR_acceleration_structure
void vkCmdCopyMemoryToAccelerationStructureKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryToAccelerationStructureInfoKHR* pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a
[VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html) structure defining the
copy operation.

Accesses to `pInfo->dst` **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages), and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html).
Accesses to the buffer indicated by `pInfo->src.deviceAddress` **must** be
synchronized with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages), and an access type of
[VK_ACCESS_TRANSFER_READ_BIT](VkAccessFlagBits.html).

This command can accept acceleration structures produced by either
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html) or
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html).

The structure provided as input to deserialize is as described in
[vkCmdCopyAccelerationStructureToMemoryKHR](vkCmdCopyAccelerationStructureToMemoryKHR.html), with any acceleration
structure handles filled in with the newly-queried handles to bottom level
acceleration structures created before deserialization.
These do not need to be built at deserialize time, but **must** be created.

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-accelerationStructure-08927) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-accelerationStructure-08927

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03742) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03742

`pInfo->src.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03743) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-03743

`pInfo->src.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-buffer-03745) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-buffer-03745

`pInfo->dst` **must** be bound to device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-parameter) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-parameter) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html) structure

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-recording) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-renderpass) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-suspended) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryToAccelerationStructureKHR-videocoding) VUID-vkCmdCopyMemoryToAccelerationStructureKHR-videocoding

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

vkCmdCopyMemoryToAccelerationStructureKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyMemoryToAccelerationStructureInfoKHR](VkCopyMemoryToAccelerationStructureInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdCopyMemoryToAccelerationStructureKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
