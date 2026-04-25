# vkCmdWriteAccelerationStructuresPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWriteAccelerationStructuresPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWriteAccelerationStructuresPropertiesNV - Write acceleration structure result parameters to query results.

To query acceleration structure size parameters for the
`[VK_NV_ray_tracing](VK_NV_ray_tracing.html)` extension call:

// Provided by VK_NV_ray_tracing
void vkCmdWriteAccelerationStructuresPropertiesNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    accelerationStructureCount,
    const VkAccelerationStructureNV*            pAccelerationStructures,
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
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html).

Valid Usage

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03755) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03755

`queryPool` **must** have been created with a `queryType` matching
`queryType`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03756) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-03756

The queries identified by `queryPool` and `firstQuery` **must** be
*unavailable*

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructure-03757) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructure-03757

`accelerationStructure` **must** be bound completely and contiguously
to a single `VkDeviceMemory` object via
[vkBindAccelerationStructureMemoryNV](vkBindAccelerationStructureMemoryNV.html)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-04958) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-04958

All acceleration structures in `pAccelerationStructures` **must** have
been built prior to the execution of this command

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-06215) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-06215

All acceleration structures in `pAccelerationStructures` **must** have
been built with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) if
`queryType` is
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](VkQueryType.html)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-06216) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-06216

`queryType` **must** be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](VkQueryType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handles

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](VkQueryType.html) value

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-parameter) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-recording) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-cmdpool) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-renderpass) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-suspended) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-videocoding) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructureCount-arraylength) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commonparent) VUID-vkCmdWriteAccelerationStructuresPropertiesNV-commonparent

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

vkCmdWriteAccelerationStructuresPropertiesNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkCommandBuffer](VkCommandBuffer.html), [VkQueryPool](VkQueryPool.html), [VkQueryType](VkQueryType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
