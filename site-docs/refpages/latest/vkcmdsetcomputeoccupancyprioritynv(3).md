# vkCmdSetComputeOccupancyPriorityNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetComputeOccupancyPriorityNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetComputeOccupancyPriorityNV - Set the compute occupancy priority for subsequent compute dispatches

To set the compute occupancy priority for subsequent compute dispatches,
call:

// Provided by VK_NV_compute_occupancy_priority
void vkCmdSetComputeOccupancyPriorityNV(
    VkCommandBuffer                             commandBuffer,
    const VkComputeOccupancyPriorityParametersNV* pParameters);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pParameters` is a pointer to a
[VkComputeOccupancyPriorityParametersNV](VkComputeOccupancyPriorityParametersNV.html) structure specifying the
occupancy priority parameters.

The occupancy priority affects how compute workloads utilize GPU compute
resources relative to other simultaneously executing workloads.
The priority is stateful on a command buffer.
All compute dispatch commands issued subsequent to a
[vkCmdSetComputeOccupancyPriorityNV](#) call will be executed with the
specified priority parameters until another
[vkCmdSetComputeOccupancyPriorityNV](#) call is made.

All command buffers (primary and secondary) start with a priority level
equal to the [VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV](VK_COMPUTE_OCCUPANCY_PRIORITY_NORMAL_NV.html) value.
The priority state is not inherited by secondary command buffers - each
command buffer maintains its own independent priority state.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-parameter) VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-pParameters-parameter) VUID-vkCmdSetComputeOccupancyPriorityNV-pParameters-parameter

 `pParameters` **must** be a valid pointer to a valid [VkComputeOccupancyPriorityParametersNV](VkComputeOccupancyPriorityParametersNV.html) structure

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-recording) VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-cmdpool) VUID-vkCmdSetComputeOccupancyPriorityNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetComputeOccupancyPriorityNV-videocoding) VUID-vkCmdSetComputeOccupancyPriorityNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT | State |

Conditional Rendering

vkCmdSetComputeOccupancyPriorityNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_compute_occupancy_priority](VK_NV_compute_occupancy_priority.html), [VkCommandBuffer](VkCommandBuffer.html), [VkComputeOccupancyPriorityParametersNV](VkComputeOccupancyPriorityParametersNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/dispatch.html#vkCmdSetComputeOccupancyPriorityNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
