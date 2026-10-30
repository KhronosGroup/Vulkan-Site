# vkCmdBuildAccelerationStructureNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBuildAccelerationStructureNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBuildAccelerationStructureNV - Build an acceleration structure

To build an acceleration structure for the `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`
extension call:

// Provided by VK_NV_ray_tracing
void vkCmdBuildAccelerationStructureNV(
    VkCommandBuffer                             commandBuffer,
    const VkAccelerationStructureInfoNV*        pInfo,
    VkBuffer                                    instanceData,
    VkDeviceSize                                instanceOffset,
    VkBool32                                    update,
    VkAccelerationStructureNV                   dst,
    VkAccelerationStructureNV                   src,
    VkBuffer                                    scratch,
    VkDeviceSize                                scratchOffset);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` contains the shared information for the acceleration
structure’s structure.

* 
`instanceData` is the buffer containing an array of
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html) structures defining
acceleration structures.
This parameter **must** be `NULL` for bottom level acceleration structures.

* 
`instanceOffset` is the offset in bytes (relative to the start of
`instanceData`) at which the instance data is located.

* 
`update` specifies whether to update the `dst` acceleration
structure with the data in `src`.

* 
`dst` is a pointer to the target acceleration structure for the
build.

* 
`src` is a pointer to an existing acceleration structure that is to
be used to update the `dst` acceleration structure.

* 
`scratch` is the [VkBuffer](VkBuffer.html) that will be used as scratch memory
for the build.

* 
`scratchOffset` is the offset in bytes relative to the start of
`scratch` that will be used as a scratch memory.

Accesses to `dst`, `src`, and `scratch` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html).

Valid Usage

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-geometryCount-02241) VUID-vkCmdBuildAccelerationStructureNV-geometryCount-02241

`geometryCount` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](VkPhysicalDeviceRayTracingPropertiesNV.html)::`maxGeometryCount`

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-dst-02488) VUID-vkCmdBuildAccelerationStructureNV-dst-02488

`dst` **must** have been created with compatible
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html) where
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`type` and
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`flags` are identical,
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`instanceCount` and
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`geometryCount` for `dst`
are greater than or equal to the build size and each geometry in
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`pGeometries` for `dst` has
greater than or equal to the number of vertices, indices, and AABBs

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02489) VUID-vkCmdBuildAccelerationStructureNV-update-02489

If `update` is [VK_TRUE](VK_TRUE.html), `src` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02490) VUID-vkCmdBuildAccelerationStructureNV-update-02490

If `update` is [VK_TRUE](VK_TRUE.html), `src` **must** have previously been
constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_NV](VkBuildAccelerationStructureFlagBitsKHR.html) set in
[VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html)::`flags` in the original build

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02491) VUID-vkCmdBuildAccelerationStructureNV-update-02491

If `update` is [VK_FALSE](VK_FALSE.html), the `size` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html) with
[VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html)::`accelerationStructure`
set to `dst` and
[VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html)::`type` set to
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)
**must** be less than or equal to the size of `scratch` minus
`scratchOffset`

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-02492) VUID-vkCmdBuildAccelerationStructureNV-update-02492

If `update` is [VK_TRUE](VK_TRUE.html), the `size` member of the
[VkMemoryRequirements](VkMemoryRequirements.html) structure returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](vkGetAccelerationStructureMemoryRequirementsNV.html) with
[VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html)::`accelerationStructure`
set to `dst` and
[VkAccelerationStructureMemoryRequirementsInfoNV](VkAccelerationStructureMemoryRequirementsInfoNV.html)::`type` set to
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](VkAccelerationStructureMemoryRequirementsTypeNV.html)
**must** be less than or equal to the size of `scratch` minus
`scratchOffset`

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-scratch-03522) VUID-vkCmdBuildAccelerationStructureNV-scratch-03522

`scratch` **must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-instanceData-03523) VUID-vkCmdBuildAccelerationStructureNV-instanceData-03523

If `instanceData` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `instanceData`
**must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-accelerationStructureReference-12264) VUID-vkCmdBuildAccelerationStructureNV-accelerationStructureReference-12264

Each
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)::`accelerationStructureReference`
value in `instanceData` **must** be a value obtained from
[vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html) for a bottom level acceleration
structure

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-03524) VUID-vkCmdBuildAccelerationStructureNV-update-03524

If `update` is [VK_TRUE](VK_TRUE.html), then objects that were previously
active **must** not be made inactive as per
[Inactive Primitives and Instances](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-03525) VUID-vkCmdBuildAccelerationStructureNV-update-03525

If `update` is [VK_TRUE](VK_TRUE.html), then objects that were previously
inactive **must** not be made active as per
[Inactive Primitives and Instances](../../../../spec/latest/chapters/accelstructures.html#acceleration-structure-inactive-prims)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-update-03526) VUID-vkCmdBuildAccelerationStructureNV-update-03526

If `update` is [VK_TRUE](VK_TRUE.html), the `src` and `dst` objects
**must** either be the same object or not have any
[memory aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-dst-07787) VUID-vkCmdBuildAccelerationStructureNV-dst-07787

`dst` **must** be bound completely and contiguously to a single
`VkDeviceMemory` object via
[vkBindAccelerationStructureMemoryNV](vkBindAccelerationStructureMemoryNV.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-parameter) VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-pInfo-parameter) VUID-vkCmdBuildAccelerationStructureNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html) structure

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-instanceData-parameter) VUID-vkCmdBuildAccelerationStructureNV-instanceData-parameter

 If `instanceData` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `instanceData` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-dst-parameter) VUID-vkCmdBuildAccelerationStructureNV-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-src-parameter) VUID-vkCmdBuildAccelerationStructureNV-src-parameter

 If `src` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `src` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-scratch-parameter) VUID-vkCmdBuildAccelerationStructureNV-scratch-parameter

 `scratch` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-recording) VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-cmdpool) VUID-vkCmdBuildAccelerationStructureNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-renderpass) VUID-vkCmdBuildAccelerationStructureNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-suspended) VUID-vkCmdBuildAccelerationStructureNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-videocoding) VUID-vkCmdBuildAccelerationStructureNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBuildAccelerationStructureNV-commonparent) VUID-vkCmdBuildAccelerationStructureNV-commonparent

 Each of `commandBuffer`, `dst`, `instanceData`, `scratch`, and `src` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdBuildAccelerationStructureNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureInfoNV](VkAccelerationStructureInfoNV.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), `VkBool32`, [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdBuildAccelerationStructureNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
