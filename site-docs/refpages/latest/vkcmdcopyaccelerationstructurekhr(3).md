# vkCmdCopyAccelerationStructureKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyAccelerationStructureKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyAccelerationStructureKHR - Copy an acceleration structure

To copy an acceleration structure call:

// Provided by VK_KHR_acceleration_structure
void vkCmdCopyAccelerationStructureKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyAccelerationStructureInfoKHR*   pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a [VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html)
structure defining the copy operation.

This command copies the `pInfo->src` acceleration structure to the
`pInfo->dst` acceleration structure in the manner specified by
`pInfo->mode`.

Accesses to `pInfo->src` and `pInfo->dst` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages), and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html) as appropriate.

Valid Usage

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-accelerationStructure-08925) VUID-vkCmdCopyAccelerationStructureKHR-accelerationStructure-08925

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-src-11633) VUID-vkCmdCopyAccelerationStructureKHR-src-11633

The source acceleration structure `pInfo->src` **must** have been
constructed prior to the execution of this command on the device

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-parameter) VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-pInfo-parameter) VUID-vkCmdCopyAccelerationStructureKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html) structure

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-recording) VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-cmdpool) VUID-vkCmdCopyAccelerationStructureKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-renderpass) VUID-vkCmdCopyAccelerationStructureKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-suspended) VUID-vkCmdCopyAccelerationStructureKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyAccelerationStructureKHR-videocoding) VUID-vkCmdCopyAccelerationStructureKHR-videocoding

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

vkCmdCopyAccelerationStructureKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyAccelerationStructureInfoKHR](VkCopyAccelerationStructureInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdCopyAccelerationStructureKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
