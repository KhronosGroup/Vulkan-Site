# vkCmdCopyAccelerationStructureToMemoryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyAccelerationStructureToMemoryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyAccelerationStructureToMemoryKHR - Copy an acceleration structure to device memory

To copy an acceleration structure to device memory call:

// Provided by VK_KHR_acceleration_structure
void vkCmdCopyAccelerationStructureToMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyAccelerationStructureToMemoryInfoKHR* pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a
[VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html) structure defining the
copy operation.

Accesses to `pInfo->src` **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages), and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html).
Accesses to the buffer indicated by `pInfo->dst.deviceAddress` **must** be
synchronized with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages), and an access type of
[VK_ACCESS_TRANSFER_WRITE_BIT](VkAccessFlagBits.html).

This command produces the same results as
[vkCopyAccelerationStructureToMemoryKHR](vkCopyAccelerationStructureToMemoryKHR.html), but writes its result to a
device address, and is executed on the device rather than the host.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToAccelerationStructureKHR](vkCmdCopyMemoryToAccelerationStructureKHR.html) or
[vkCopyMemoryToAccelerationStructureKHR](vkCopyMemoryToAccelerationStructureKHR.html).

The defined header structure for the serialized data consists of:

* 
[VK_UUID_SIZE](VK_UUID_SIZE.html) bytes of data matching
`VkPhysicalDeviceIDProperties`::`driverUUID`

* 
[VK_UUID_SIZE](VK_UUID_SIZE.html) bytes of data identifying the compatibility for
comparison using [vkGetDeviceAccelerationStructureCompatibilityKHR](vkGetDeviceAccelerationStructureCompatibilityKHR.html)

* 
A 64-bit integer of the total size matching the value queried using
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html)

* 
A 64-bit integer of the deserialized size to be passed in to
`VkAccelerationStructureCreateInfoKHR`::`size`

* 
A 64-bit integer of the count of the number of acceleration structure
handles following.
This value matches the value queried using
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html).
This will be zero for a bottom-level acceleration structure.
For top-level acceleration structures this number is
implementation-dependent; the number of and ordering of the handles may
not match the instance descriptions which were used to build the
acceleration structure.

The corresponding handles matching the values returned by
[vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html)
or
[vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html)
are tightly packed in the buffer following the count.
The application is expected to store a mapping between those handles and the
original application-generated bottom-level acceleration structures to
provide when deserializing.
The serialized data is written to the buffer (or read from the buffer)
according to the host endianness.

Valid Usage

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-accelerationStructure-08926) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-accelerationStructure-08926

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03739) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03739

`pInfo->dst.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03740) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-03740

`pInfo->dst.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-None-03559) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-None-03559

`pInfo->src` **must** be bound to device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-parameter) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-parameter) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html) structure

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-recording) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-renderpass) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-suspended) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyAccelerationStructureToMemoryKHR-videocoding) VUID-vkCmdCopyAccelerationStructureToMemoryKHR-videocoding

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

vkCmdCopyAccelerationStructureToMemoryKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyAccelerationStructureToMemoryInfoKHR](VkCopyAccelerationStructureToMemoryInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdCopyAccelerationStructureToMemoryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
