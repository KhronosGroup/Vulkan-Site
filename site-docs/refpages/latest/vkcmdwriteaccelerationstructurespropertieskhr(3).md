# vkCmdWriteAccelerationStructuresPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWriteAccelerationStructuresPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWriteAccelerationStructuresPropertiesKHR - Write acceleration structure result parameters to query results.

To query acceleration structure size parameters call:

// Provided by VK_KHR_acceleration_structure
void vkCmdWriteAccelerationStructuresPropertiesKHR(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    accelerationStructureCount,
    const VkAccelerationStructureKHR*           pAccelerationStructures,
    VkQueryType                                 queryType,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`accelerationStructureCount` is the count of acceleration structures
for which to query the property.

* 
`pAccelerationStructures` is a pointer to an array of existing
previously built acceleration structures.

* 
`queryType` is a [VkQueryType](VkQueryType.html) value specifying the type of
queries managed by the pool.

* 
`queryPool` is the query pool that will manage the results of the
query.

* 
`firstQuery` is the first query index within the query pool that
will contain the `accelerationStructureCount` number of results.

Accesses to any of the acceleration structures listed in
`pAccelerationStructures` **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages), and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html).

* 
If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html), then the
value written out is the number of bytes required by a compacted
acceleration structure.

* 
If `queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html), then
the value written out is the number of bytes required by a serialized
acceleration structure.

Valid Usage

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructure-08924) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructure-08924

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02493) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02493

`queryPool` **must** have been created with a `queryType` matching
`queryType`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02494) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-02494

The queries identified by `queryPool` and `firstQuery` **must** be
*unavailable*

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-buffer-03736) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-buffer-03736

Each element of `pAccelerationStructures` **must** be bound to device
memory

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-query-04880) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-query-04880

The sum of `firstQuery` plus `accelerationStructureCount` **must**
be less than or equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-04964

All acceleration structures in `pAccelerationStructures` **must** have
been built prior to the execution of this command

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructures-03431

All acceleration structures in `pAccelerationStructures` **must** have
been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) if
`queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-06742) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-06742

`queryType` **must** be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](VkQueryType.html),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html),
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html), or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) handles

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](VkQueryType.html) value

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-recording) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-cmdpool) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-renderpass) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-suspended) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-videocoding) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commonparent) VUID-vkCmdWriteAccelerationStructuresPropertiesKHR-commonparent

 Each of `commandBuffer`, `queryPool`, and the elements of `pAccelerationStructures` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdWriteAccelerationStructuresPropertiesKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html), [VkCommandBuffer](VkCommandBuffer.html), [VkQueryPool](VkQueryPool.html), [VkQueryType](VkQueryType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
