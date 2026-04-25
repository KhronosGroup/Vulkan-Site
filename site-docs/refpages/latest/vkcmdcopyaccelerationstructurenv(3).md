# vkCmdCopyAccelerationStructureNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyAccelerationStructureNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyAccelerationStructureNV - Copy an acceleration structure

To copy an acceleration structure for the `[VK_NV_ray_tracing](VK_NV_ray_tracing.html)`
extension call:

// Provided by VK_NV_ray_tracing
void vkCmdCopyAccelerationStructureNV(
    VkCommandBuffer                             commandBuffer,
    VkAccelerationStructureNV                   dst,
    VkAccelerationStructureNV                   src,
    VkCopyAccelerationStructureModeKHR          mode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`dst` is the target acceleration structure for the copy.

* 
`src` is the source acceleration structure for the copy.

* 
`mode` is a [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value
specifying additional operations to perform during the copy.

Accesses to `src` and `dst` **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) or the
[VK_PIPELINE_STAGE_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](VkPipelineStageFlagBits.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages), and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_ACCELERATION_STRUCTURE_READ_BIT_KHR](VkAccessFlagBits.html) or
[VK_ACCESS_ACCELERATION_STRUCTURE_WRITE_BIT_KHR](VkAccessFlagBits.html) as appropriate.

Valid Usage

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-mode-03410) VUID-vkCmdCopyAccelerationStructureNV-mode-03410

`mode` **must** be
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](VkCopyAccelerationStructureModeKHR.html) or
[VK_COPY_ACCELERATION_STRUCTURE_MODE_CLONE_KHR](VkCopyAccelerationStructureModeKHR.html)

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-src-04963) VUID-vkCmdCopyAccelerationStructureNV-src-04963

The source acceleration structure `src` **must** have been constructed
prior to the execution of this command

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-src-03411) VUID-vkCmdCopyAccelerationStructureNV-src-03411

If `mode` is [VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](VkCopyAccelerationStructureModeKHR.html),
`src` **must** have been constructed with
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](VkBuildAccelerationStructureFlagBitsKHR.html) in the
build

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-buffer-03718) VUID-vkCmdCopyAccelerationStructureNV-buffer-03718

The range of `src` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-buffer-03719) VUID-vkCmdCopyAccelerationStructureNV-buffer-03719

The range of `dst` accessed by this command **must** be fully backed by
physical memory

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-dst-07791) VUID-vkCmdCopyAccelerationStructureNV-dst-07791

The range of memory backing `dst` that is accessed by this command
**must** not overlap the memory backing `src` that is accessed by this
command

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-parameter) VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-dst-parameter) VUID-vkCmdCopyAccelerationStructureNV-dst-parameter

 `dst` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-src-parameter) VUID-vkCmdCopyAccelerationStructureNV-src-parameter

 `src` **must** be a valid [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-mode-parameter) VUID-vkCmdCopyAccelerationStructureNV-mode-parameter

 `mode` **must** be a valid [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html) value

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-recording) VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-cmdpool) VUID-vkCmdCopyAccelerationStructureNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-renderpass) VUID-vkCmdCopyAccelerationStructureNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-suspended) VUID-vkCmdCopyAccelerationStructureNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-videocoding) VUID-vkCmdCopyAccelerationStructureNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyAccelerationStructureNV-commonparent) VUID-vkCmdCopyAccelerationStructureNV-commonparent

 Each of `commandBuffer`, `dst`, and `src` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdCopyAccelerationStructureNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_ray_tracing](VK_NV_ray_tracing.html), [VkAccelerationStructureNV](VkAccelerationStructureNV.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyAccelerationStructureModeKHR](VkCopyAccelerationStructureModeKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/accelstructures.html#vkCmdCopyAccelerationStructureNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
